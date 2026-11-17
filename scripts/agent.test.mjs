import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { agent, methods } from "@agentclientprotocol/sdk";
const require = createRequire(import.meta.url);
const {
  AgentController,
  normalizeQuestion,
  questionPrompt,
  flattenModels,
  enrichQuestionMaterials,
} = require("../out/agent/controller.js");

// 创建通过真实 ACP 序列化通道通信的模型替身，避免测试消耗真实额度。
function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "luban-agent-test-"));
  const events = [];
  const prompts = [];
  const sessions = [];
  const changes = [];
  const referenceRequests = [];
  let cancel;
  const fake = agent({ name: "test-opencode", version: "2.0.32" });
  // 声明测试 Agent 的协议能力。
  fake.onRequest(methods.agent.initialize, async () => ({
    protocolVersion: 1,
    agentCapabilities: {},
    authMethods: [],
    agentInfo: { name: "OpenCode", version: "test" },
  }));
  // 每次新建返回不同 ID，便于验证题目会话隔离。
  fake.onRequest(methods.agent.session.new, async () => {
    const sessionId = `ses_test_${sessions.length}`;
    sessions.push(sessionId);
    return {
      sessionId,
      configOptions: [
        {
          id: "model",
          name: "Model",
          type: "select",
          category: "model",
          currentValue: "provider/a",
          options: [
            { value: "provider/a", name: "模型 A" },
            { value: "provider/b", name: "模型 B" },
          ],
        },
        {
          id: "mode",
          name: "Mode",
          type: "select",
          category: "mode",
          currentValue: "luban-tutor",
          options: [{ value: "luban-tutor", name: "解题" }],
        },
      ],
    };
  });
  // 保存模型切换请求，验证前端选择确实作用到 OpenCode 会话。
  fake.onRequest(methods.agent.session.setConfigOption, async ({ params }) => {
    changes.push(params);
    return { configOptions: [] };
  });
  // 使用两段增量模拟回答，另用阻塞分支验证停止流程。
  fake.onRequest(
    methods.agent.session.prompt,
    async ({ params, client: context }) => {
      prompts.push(params);
      const permission = await context.request(
        methods.client.session.requestPermission,
        {
          sessionId: params.sessionId,
          toolCall: {
            toolCallId: "shell",
            title: "shell",
            kind: "execute",
            status: "pending",
          },
          options: [{ optionId: "allow", name: "Allow", kind: "allow_once" }],
        },
      );
      assert.equal(permission.outcome.outcome, "cancelled");
      if (params.prompt[0].text.includes("等待取消")) {
        await new Promise((resolve) => {
          cancel = resolve;
        });
        return { stopReason: "cancelled" };
      }
      await context.notify(methods.client.session.update, {
        sessionId: params.sessionId,
        update: {
          sessionUpdate: "agent_message_chunk",
          content: { type: "text", text: "答案是 " },
        },
      });
      await context.notify(methods.client.session.update, {
        sessionId: params.sessionId,
        update: {
          sessionUpdate: "agent_message_chunk",
          content: { type: "text", text: "B。\n\n解析：2 + 2 = 4。" },
        },
      });
      return { stopReason: "end_turn" };
    },
  );
  // ACP 的取消是通知，测试不向其返回伪造的 RPC 响应。
  fake.onNotification(methods.agent.session.cancel, () => {
    cancel?.();
  });
  const requestStream = new TransformStream();
  const responseStream = new TransformStream();
  const fakeConnection = fake.connect({
    readable: requestStream.readable,
    writable: responseStream.writable,
  });
  const storage = new Map();
  const controller = new AgentController(
    {
      globalStorageUri: { fsPath: directory },
      globalState: {
        get: (key, fallback) => storage.get(key) ?? fallback,
        update: async (key, value) => {
          storage.set(key, value);
        },
      },
    },
    {},
    (event) => events.push(event.data),
    async (question) => {
      referenceRequests.push(question.id);
      return { answer: "B", solution: "题库参考：四。" };
    },
    async () => ({
      writable: requestStream.writable,
      readable: responseStream.readable,
    }),
  );
  // 清理本测试创建的进程连接和临时配置。
  t.after(() => {
    controller.dispose();
    fakeConnection.close();
    fs.rmSync(directory, { recursive: true, force: true });
  });
  return {
    controller,
    events,
    prompts,
    sessions,
    changes,
    referenceRequests,
    storage,
    directory,
  };
}

// 构造带有多余敏感字段的输入，确认归一化采用字段白名单。
function question(id = "1001") {
  return {
    id,
    category: "xingce",
    content: "2 + 2 = ?",
    options: ["3", "4"],
    materials: "整数运算",
    userAnswer: "A",
    cookie: "SECRET_COOKIE",
    apiKey: "SECRET_KEY",
    solution: "HIDDEN_SOLUTION",
    correctAnswer: "HIDDEN_ANSWER",
  };
}

// 向指定题目的独立会话发送一次提问。
function send(f, id, content, intent = "auto", model = "provider/b") {
  return f.controller.handle({
    command: "agent.send",
    postData: {
      question: question(id),
      threadId: `xingce:${id}`,
      requestId: crypto.randomUUID(),
      text: content,
      intent,
      model,
    },
  });
}

test("题目上下文不包含 Cookie、密钥或尚未请求的答案", () => {
  const normalized = normalizeQuestion(question());
  const serialized = JSON.stringify(normalized);
  assert.doesNotMatch(serialized, /SECRET|HIDDEN/);
  assert.match(questionPrompt(normalized), /A\. 3/);
  assert.match(questionPrompt(normalized), /用户当前选择.*A/);
  assert.equal(
    flattenModels([
      { name: "provider", options: [{ name: "A", value: "a" }] },
    ])[0].id,
    "a",
  );
});

test("题卡去重后每道子题仍获得自己的完整材料，无材料题不混入上一题材料", () => {
  const payload = {
    card: {
      children: [
        {
          children: [
            { globalId: "3_1_a", materialKeys: ["shared"] },
            { globalId: "3_1_b", materialKeys: ["shared", "extra"] },
            { globalId: "3_1_c", materialKeys: [] },
          ],
        },
      ],
    },
    questions: [
      { globalId: "3_1_a" },
      { globalId: "3_1_b" },
      { globalId: "3_1_c" },
    ],
    materials: [
      { globalId: "shared", content: "共享材料" },
      { globalId: "extra", content: "补充材料" },
    ],
  };
  const result = enrichQuestionMaterials(payload);
  assert.equal(result.questions[0].agentMaterialContent, "共享材料");
  assert.equal(
    result.questions[1].agentMaterialContent,
    "共享材料\n\n补充材料",
  );
  assert.equal(result.questions[2].agentMaterialContent, "");
  assert.equal(payload.questions[0].agentMaterialContent, undefined);
  assert.equal(
    normalizeQuestion({ id: "3_1_b", category: "xingce" }).threadId,
    "xingce:3_1_b",
  );
});

test("OpenCode 模型发现、真实 ACP 增量、意图和按题目隔离", async (t) => {
  const f = fixture(t);
  await f.controller.handle({ command: "agent.init" });
  assert.equal(f.events[0].type, "config");
  assert.equal(f.events[0].models.length, 2);
  await send(f, "1001", "只提示思路", "hint");
  assert.equal(f.referenceRequests.length, 0);
  assert.doesNotMatch(
    f.prompts[0].prompt[0].text,
    /HIDDEN|SECRET|题库参考：四/,
  );
  assert.match(f.prompts[0].prompt[0].text, /本轮只提供提示/);
  assert.equal(
    f.events
      .filter((item) => item.type === "delta")
      .map((item) => item.text)
      .join(""),
    "答案是 B。\n\n解析：2 + 2 = 4。",
  );
  await send(f, "1001", "核对答案", "check");
  assert.deepEqual(f.referenceRequests, ["1001"]);
  assert.match(f.prompts[1].prompt[0].text, /参考答案：B/);
  assert.equal(f.prompts[1].sessionId, f.prompts[0].sessionId);
  await send(f, "1002", "解析这道题", "explain");
  assert.notEqual(f.prompts[2].sessionId, f.prompts[0].sessionId);
  assert.ok(
    f.changes.every(
      (change) => change.configId === "model" && change.value === "provider/b",
    ),
  );
  await f.controller.handle({
    command: "agent.clear",
    postData: { threadId: "xingce:1001" },
  });
  await send(f, "1001", "新的思路", "hint");
  assert.notEqual(f.prompts[3].sessionId, f.prompts[0].sessionId);
  const config = JSON.parse(
    fs.readFileSync(
      path.join(f.directory, "opencode-tutor/opencode.json"),
      "utf8",
    ),
  );
  assert.equal(config.agent["luban-tutor"].permission["*"], "deny");
  assert.equal(config.agent["luban-tutor"].permission.websearch, "allow");
  assert.match(config.agent["luban-tutor"].prompt, /【回答排版规范】/);
  assert.match(f.prompts[0].prompt[0].text, /只提示时不得出现答案行/);
  assert.ok(f.prompts[0].prompt[0].text.includes(String.raw`\( ... \)`));
  assert.ok(f.prompts[0].prompt[0].text.includes(String.raw`\[ ... \]`));
  assert.doesNotMatch(JSON.stringify(f.events), /SECRET_COOKIE|SECRET_KEY/);
});

test("停止使用 ACP 通知取消，取消后仍能继续提问", async (t) => {
  const f = fixture(t);
  await f.controller.handle({ command: "agent.init" });
  const pending = send(f, "1001", "等待取消");
  for (let attempt = 0; attempt < 50 && f.prompts.length === 0; attempt += 1)
    await delay(10);
  assert.equal(f.prompts.length, 1);
  await f.controller.handle({ command: "agent.stop" });
  await pending;
  assert.equal(f.events.at(-1).type, "done");
  assert.equal(f.events.at(-1).cancelled, true);
  await send(f, "1002", "继续分析", "hint");
  assert.equal(f.events.at(-1).type, "done");
  assert.ok(
    f.events.some(
      (item) => item.type === "delta" && item.threadId === "xingce:1002",
    ),
  );
});

test("非法题目拒绝后释放前端等待状态", async (t) => {
  const f = fixture(t);
  await f.controller.handle({
    command: "agent.send",
    postData: {
      requestId: "bad",
      threadId: "xingce:1",
      question: question("evil/path"),
      text: "答案",
    },
  });
  assert.equal(f.events.at(-2).type, "error");
  assert.equal(f.events.at(-1).type, "done");
  assert.equal(f.prompts.length, 0);
});

test(
  "题库解析读取挂起时也能立即停止，服务商错误不会泄露凭据",
  { timeout: 2000 },
  async (t) => {
    const f = fixture(t);
    let markStarted;
    const started = new Promise((resolve) => {
      markStarted = resolve;
    });
    // 模拟一个永不返回的题库接口，取消不能依赖其返回。
    f.controller.getReference = async () => {
      markStarted();
      return new Promise(() => {});
    };
    const pending = send(f, "1001", "核对答案", "check");
    await started;
    await f.controller.handle({ command: "agent.stop" });
    await pending;
    assert.equal(f.events.at(-1).type, "done");
    assert.equal(f.events.at(-1).cancelled, true);
    assert.equal(f.prompts.length, 0);
    assert.doesNotMatch(
      f.controller.publicError(new Error("OpenCode provider SECRET_KEY")),
      /SECRET_KEY/,
    );
  },
);
