import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "@playwright/test";
import { root } from "./lib.mjs";

const fixtures = {
  questions: [
    {
      id: 101,
      globalId: 101,
      type: 1,
      content: "<p>一组数的平均数为 4，三个数之和是多少？</p>",
      materialIndexes: [0],
      accessories: [{ options: ["8", "12", "16", "20"] }],
    },
    {
      id: 102,
      globalId: 102,
      type: 1,
      content: "<p>上海市考练习：2 + 2 等于多少？</p>",
      materialIndexes: [0],
      agentMaterialContent: "<p>材料：本题对应的是共享材料。</p>",
      accessories: [{ options: ["3", "4", "5", "6"] }],
    },
    {
      id: 103,
      globalId: 103,
      type: 1,
      content:
        "<p>某商品打九折后多卖 50 件，收入减少 200 元。原来的销量至少是多少件？</p>",
      agentMaterialContent: "",
      accessories: [{ options: ["400", "450", "450.5", "451"] }],
    },
  ],
  materials: [{ content: "<p>材料：以下均为整数运算。</p>" }],
  combineKey: "fixture:practice",
  exerciseId: "fixture-exercise",
};

const formattedAnswer = String.raw`**答案：D．451 件**

**思路**

1. 设原价为 \(p\)、原销量为 \(n\)。打折后销量增加 50 件，按收入减少 200 元列式：

\[
pn-0.9p(n+50)=200
\]

2. 整理得到：

\[
n=450+\frac{2000}{p}>450
\]

3. 单价 \(p>0\)，销量又必须为整数，因此最少为 **451 件**。

**注意**：打折后的销量是 $n+50$；“大于 450”不包含 450。`;

const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="/agent-ui.css"><style>body{margin:0;background:#21222b;--vscode-editor-background:#21222b;--vscode-sideBar-background:#252526;--vscode-foreground:#ddd;--vscode-font-family:system-ui}</style></head>
<body><div id="loading">初始化</div><div id="root"></div><script>
// 模拟网页状态跨刷新保存，并检查分栏调整没有覆盖其他设置。
window.sent=[];let state=JSON.parse(sessionStorage.getItem("fixture-state")||'{"fixtureMarker":"preserved"}');let pending=null;
const fixture=${JSON.stringify(fixtures)};
const formattedAnswer=${JSON.stringify(formattedAnswer)};
const models=[{id:"test/deepseek",name:"DeepSeek · 测试模型"},{id:"test/glm",name:"GLM · 测试模型"}];
function reply(command,data){window.dispatchEvent(new MessageEvent("message",{data:{command,data}}));}
function event(type,data={}){reply("agent.event",{type,...data});}
window.acquireVsCodeApi=()=>({getState:()=>state,setState:s=>(sessionStorage.setItem("fixture-state",JSON.stringify(s)),state=s),postMessage(message){
  window.sent.push(message);const p=message.postData||{};
  setTimeout(()=>{
    if(message.command==="agent.init"||message.command==="agent.models")event("config",{models,model:"test/deepseek",connected:true,version:"test"});
    if(message.command==="agent.model")event("config",{models,model:p.model,connected:true,version:"test"});
    if(message.command==="pageInit"){reply("setting",{categoryId:"xingce",color:"#fff",backgroundColor:"#21222b",fontSize:14});reply("init",{menu:[],cacheResult:{},favoriteQuizLocationName:"上海市考",favoriteQuizCoursePrefixes:["xingce"]});}
    if(message.command==="history")reply("history",[{status:0,key:"fixture:practice",createdTime:1794873600000,sheet:{type:1,name:"上海行测 · 测试试卷"}}]);
    if(["getQuestion","getQuickQuestion","getRealQuestion","getSmartQuestion"].includes(message.command))reply("getQuestion",fixture);
    if(message.command==="agent.clear")event("cleared",{threadId:p.threadId});
    if(message.command==="agent.send"){
      pending=p;event("started",p);
      if(p.text.includes("长回答"))return;
      event("reference",{...p,message:"已获取粉笔题库参考解析",available:true});
      const answer=p.question.id==="103"?formattedAnswer:"**测试回答：B。**\\n\\n2 + 2 = 4。<script>window.injected=true;<"+"/script>";
      setTimeout(()=>{event("delta",{...p,text:answer.slice(0,45)});},50);
      setTimeout(()=>{event("delta",{...p,text:answer.slice(45)});event("done",p);pending=null;},150);
    }
    if(message.command==="agent.stop"&&pending){event("status",{...pending,message:"已停止生成。"});event("done",{...pending,cancelled:true});pending=null;}
  },20);
}});
</script><script src="/agent-ui.js"></script><script src="/main.js"></script></body></html>`;

// 在本机临时端口提供真实构建产物，不触及用户登录态或真实题库作答。
const server = http.createServer((request, response) => {
  const font = /^\/fonts\/([\w.-]+\.(woff2?|ttf))$/.exec(request.url);
  if (font) {
    response.setHeader("Content-Type", `font/${font[2]}`);
    response.end(fs.readFileSync(path.join(root, "out/views/fonts", font[1])));
    return;
  }
  const asset = {
    "/main.js": "main.js",
    "/agent-ui.js": "agent-ui.js",
    "/agent-ui.css": "agent-ui.css",
  }[request.url];
  if (asset) {
    response.setHeader(
      "Content-Type",
      asset.endsWith(".css") ? "text/css" : "text/javascript",
    );
    response.end(fs.readFileSync(path.join(root, "out/views", asset)));
  } else {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end(html);
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
// 字体必须来自打包产物，避免公式在离线环境下回退成错误字形。
page.on("response", (response) => {
  if (response.url().includes("/fonts/") && response.status() !== 200)
    errors.push(`公式字体加载失败：${response.status()}`);
});

try {
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  // 单独验证分隔符、代码原样显示、流式残片和不可信公式的边界。
  const mathChecks = await page.evaluate(() => {
    const render = window.LubanAgentUI.renderAnswerMarkdown;
    const inline = document.createElement("div");
    inline.innerHTML = render(String.raw`行内 \(p>0\)，以及 $n+50$。`);
    const block = document.createElement("div");
    block.innerHTML = render(String.raw`\[n=450+\frac{2000}{p}\]

$$
\sqrt{n^2+1}
$$`);
    const code = document.createElement("div");
    code.innerHTML = render("`\\(p\\)`\n\n```\n$$n$$\n```");
    const unsafe = document.createElement("div");
    unsafe.innerHTML =
      render(String.raw`<div id="attacker" style="position:fixed" onclick="alert(1)">x</div>
<img src="x" onerror="alert(1)"><script>alert(1)</script>
\(\href{javascript:alert(1)}{x}\)
\(\htmlStyle{position:fixed}{x}\)`);
    const broken = document.createElement("div");
    broken.innerHTML = render(String.raw`\(\notARealCommand{x}\)`);
    const unfinished = render(String.raw`思路：\[n=450+\frac{2000}{`);
    const currency = document.createElement("div");
    currency.innerHTML = render("价格 $200 和 $300");
    return {
      inline: inline.querySelectorAll(".katex").length,
      block: block.querySelectorAll(".katex-display").length,
      accessible: block.querySelectorAll("math").length,
      fraction: Boolean(block.querySelector(".mfrac")),
      code: code.querySelectorAll(".katex").length,
      codeText: code.querySelector("code")?.textContent,
      unsafeTags: unsafe.querySelectorAll("script,img,a[href^='javascript:']")
        .length,
      unsafeStyles: unsafe.querySelector("#attacker").hasAttribute("style"),
      unsafeEvents: unsafe.querySelector("#attacker").hasAttribute("onclick"),
      broken: broken.querySelectorAll(".la-math-fallback").length,
      unfinished: unfinished.includes("n=450"),
      currency: currency.querySelectorAll(".katex").length,
    };
  });
  assert.deepEqual(mathChecks, {
    inline: 2,
    block: 2,
    accessible: 2,
    fraction: true,
    code: 0,
    codeText: "\\(p\\)",
    unsafeTags: 0,
    unsafeStyles: false,
    unsafeEvents: false,
    broken: 1,
    unfinished: true,
    currency: 0,
  });
  const splitter = page.getByRole("separator", { name: "调整助手宽度" });
  await splitter.waitFor();
  const initialPane = await page.locator(".la-agent").boundingBox();
  assert.ok(
    Math.abs(initialPane.width - 1280 * 0.3) <= 2,
    "助手默认占三成宽度",
  );
  assert.equal(initialPane.x, 0, "助手应在左侧");
  const initialSplit = await splitter.boundingBox();
  await page.mouse.move(initialSplit.x + 3, initialSplit.y + 120);
  await page.mouse.down();
  await page.mouse.move(initialSplit.x + 163, initialSplit.y + 120, {
    steps: 8,
  });
  await page.mouse.up();
  const resizedPane = await page.locator(".la-agent").boundingBox();
  assert.ok(
    Math.abs(resizedPane.width - initialPane.width - 160) <= 2,
    "拖动分隔条必须改变助手宽度",
  );
  assert.equal(
    await page.evaluate(
      () => window.acquireVsCodeApi().getState().fixtureMarker,
    ),
    "preserved",
    "保存分栏宽度不能覆盖其他网页状态",
  );
  await page.reload();
  await splitter.waitFor();
  const restoredPane = await page.locator(".la-agent").boundingBox();
  assert.ok(
    Math.abs(restoredPane.width - resizedPane.width) <= 2,
    "刷新后应恢复调整后的分栏比例",
  );
  await splitter.focus();
  await page.keyboard.press("Home");
  assert.ok(
    Math.abs((await page.locator(".la-agent").boundingBox()).width - 260) <= 2,
    "助手最小宽度应保留输入框的可用空间",
  );
  await page.keyboard.press("End");
  assert.ok(
    (await page.locator(".la-quiz").boundingBox()).width >= 319,
    "分隔条不能挤掉题库",
  );
  const beforeKey = await page.locator(".la-agent").boundingBox();
  await page.keyboard.press("ArrowLeft");
  assert.ok(
    Math.abs(
      beforeKey.width -
        (await page.locator(".la-agent").boundingBox()).width -
        16,
    ) <= 2,
    "方向键应能微调分栏宽度",
  );
  const currentSplit = await splitter.boundingBox();
  await page.mouse.move(currentSplit.x + 3, currentSplit.y + 120);
  await page.mouse.down();
  await page.mouse.move(1280 * 0.3 + 3, currentSplit.y + 120, { steps: 8 });
  await page.mouse.up();
  assert.equal(
    await page
      .locator(".la-workspace")
      .evaluate((element) => element.classList.contains("la-resizing")),
    false,
    "松开鼠标后应恢复正常文本选择",
  );
  await page.getByRole("button", { name: "继续做题", exact: true }).click();
  await page.locator("[data-agent-question='101']").waitFor();
  await page
    .getByRole("combobox", { name: "OpenCode 模型" })
    .selectOption("test/glm");
  await page
    .getByText("上海市考练习：2 + 2 等于多少？", { exact: true })
    .click();
  await page.waitForFunction(
    () => document.querySelector(".la-question-id")?.textContent === "#102",
  );
  const current = page.locator("[data-agent-question='102']");
  await current.getByRole("radio").first().check();
  await page.waitForFunction(() =>
    document.querySelector(".la-context-answer")?.textContent.includes("A"),
  );
  assert.equal(
    await page.locator(".la-question-id").textContent(),
    "#102",
    "更新作答不能误切题目",
  );
  await page
    .getByRole("combobox", { name: "提问意图" })
    .selectOption("explain");
  await page
    .getByRole("textbox", { name: "向 OpenCode 提问" })
    .fill("解析一下这道题");
  await page.getByRole("button", { name: "发送", exact: true }).click();
  await page
    .locator(".la-markdown")
    .getByText("测试回答：B。", { exact: true })
    .waitFor();
  const sent = await page.evaluate(() =>
    window.sent.find((message) => message.command === "agent.send"),
  );
  assert.equal(sent.postData.question.id, "102");
  assert.equal(sent.postData.question.userAnswer, "A");
  assert.equal(
    sent.postData.question.materials,
    "材料：本题对应的是共享材料。",
  );
  assert.equal(sent.postData.intent, "explain");
  assert.equal(sent.postData.model, "test/glm");
  assert.doesNotMatch(
    JSON.stringify(sent.postData),
    /cookie|apiKey|correctAnswer|solution/,
  );
  assert.equal(
    await page.evaluate(() => window.injected),
    undefined,
    "Markdown 不可执行脚本",
  );

  await page
    .locator("[data-agent-question='101'] .question-item")
    .click({ position: { x: 12, y: 12 } });
  assert.equal(await page.locator(".la-question-id").textContent(), "#101");
  assert.equal(
    await page.locator(".la-message").count(),
    0,
    "不同题目不能串会话",
  );
  await page
    .getByRole("textbox", { name: "向 OpenCode 提问" })
    .fill("第一题的草稿");
  await page
    .getByText("上海市考练习：2 + 2 等于多少？", { exact: true })
    .click();
  assert.equal(
    await page.locator(".la-message").count(),
    2,
    "切回题目应保留本题对话",
  );
  await page
    .getByRole("textbox", { name: "向 OpenCode 提问" })
    .fill("长回答，请继续推导");
  await page.getByRole("button", { name: "发送", exact: true }).click();
  await page.getByRole("button", { name: "停止生成" }).waitFor();
  await page
    .locator("[data-agent-question='101'] .question-item")
    .click({ position: { x: 12, y: 12 } });
  assert.equal(
    await page.getByRole("textbox", { name: "向 OpenCode 提问" }).inputValue(),
    "第一题的草稿",
  );
  await page.getByRole("button", { name: "停止生成" }).click();
  await page.getByRole("button", { name: "发送", exact: true }).waitFor();
  await page
    .getByText("上海市考练习：2 + 2 等于多少？", { exact: true })
    .click();
  await page
    .locator(".la-status")
    .getByText("已停止生成。", { exact: true })
    .waitFor();

  await page
    .getByText(
      "某商品打九折后多卖 50 件，收入减少 200 元。原来的销量至少是多少件？",
      { exact: true },
    )
    .click();
  await page
    .getByRole("textbox", { name: "向 OpenCode 提问" })
    .fill("解析这道题");
  await page.getByRole("button", { name: "发送", exact: true }).click();
  await page
    .locator(".la-markdown")
    .getByText("答案：D．451 件", { exact: true })
    .waitFor();
  await page.waitForFunction(
    () => document.querySelectorAll(".la-markdown .katex-display").length === 2,
  );
  await page.evaluate(() => document.fonts.ready);
  assert.equal(
    await page.evaluate(() => document.fonts.check("16px KaTeX_Main")),
    true,
    "公式字体应成功加载",
  );

  for (const viewport of [
    { width: 1280, height: 900 },
    { width: 800, height: 900 },
    { width: 390, height: 844 },
    { width: 390, height: 640 },
  ]) {
    await page.setViewportSize(viewport);
    const geometry = await page.evaluate(() => {
      const agent = document.querySelector(".la-agent").getBoundingClientRect();
      const quiz = document.querySelector(".la-quiz").getBoundingClientRect();
      const composer = document
        .querySelector(".la-composer")
        .getBoundingClientRect();
      const transcript = document
        .querySelector(".la-transcript")
        .getBoundingClientRect();
      return {
        width: document.documentElement.scrollWidth,
        agent: {
          x: agent.x,
          y: agent.y,
          right: agent.right,
          bottom: agent.bottom,
        },
        quiz: { x: quiz.x, y: quiz.y, right: quiz.right, bottom: quiz.bottom },
        composer: { y: composer.y, bottom: composer.bottom },
        transcript: { bottom: transcript.bottom },
      };
    });
    assert.ok(
      geometry.width <= viewport.width + 1,
      `页面不能横向溢出：${JSON.stringify(viewport)}`,
    );
    assert.ok(
      geometry.composer.bottom <= viewport.height + 1,
      "输入框必须在可见区域内",
    );
    assert.ok(
      geometry.transcript.bottom <= geometry.composer.y + 1,
      "对话与输入框不能重叠",
    );
    if (viewport.width > 650)
      assert.ok(
        geometry.agent.right <= geometry.quiz.x + 1 && geometry.agent.x === 0,
        "桌面助手应位于题库左边且不能重叠",
      );
    else
      assert.ok(
        geometry.quiz.bottom <= geometry.agent.y + 1,
        "窄屏题库和助手不能重叠",
      );
    assert.equal(
      await page
        .getByRole("button", { name: "收起助手" })
        .evaluate((element) => {
          const rect = element.getBoundingClientRect();
          return element.contains(
            document.elementFromPoint(
              rect.x + rect.width / 2,
              rect.y + rect.height / 2,
            ),
          );
        }),
      true,
      "原题库固定工具栏不能遮挡助手标题",
    );
    if (viewport.width === 1280 || viewport.height === 844)
      await page.screenshot({
        path: `/tmp/luban-agent-ui-${viewport.width}.png`,
      });
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.getByRole("button", { name: "收起助手" }).click();
  assert.equal(await page.locator(".la-agent").isVisible(), false);
  assert.equal(await splitter.isVisible(), false);
  assert.ok(
    Math.abs((await page.locator(".la-quiz").boundingBox()).width - 1280) <= 1,
    "收起助手后题库应占满可用宽度",
  );
  await page.getByRole("button", { name: "打开 OpenCode 助手" }).click();
  assert.equal(await page.locator(".la-agent").isVisible(), true);
  await page.evaluate(() =>
    window.dispatchEvent(
      new MessageEvent("message", { data: { command: "showDisguise" } }),
    ),
  );
  await page.waitForFunction(
    () => document.querySelector(".la-workspace").dataset.disguised === "true",
  );
  assert.equal(
    await page.locator(".la-agent").isVisible(),
    false,
    "智能伪装时必须隐藏助手",
  );
  await page.keyboard.press("Escape");
  await page.waitForFunction(
    () => document.querySelector(".la-workspace").dataset.disguised === "false",
  );
  await page.getByRole("button", { name: "新建当前题目会话" }).click();
  await page.waitForFunction(
    () => document.querySelectorAll(".la-message").length === 0,
  );
  await page.getByRole("button", { name: "返回上一页", exact: true }).click();
  await page.waitForFunction(() =>
    document
      .querySelector(".la-context-title")
      ?.textContent.includes("尚未选择题目"),
  );
  assert.deepEqual(errors, []);
  console.log(
    "真实题库页面检查通过：公式及本地字体、Markdown 净化、异常公式回退、流式排版、左侧分栏、题目与作答同步、模型切换、会话隔离、停止、新会话、伪装及桌面/窄屏布局。",
  );
} catch (error) {
  await page.screenshot({ path: "/tmp/luban-agent-ui-failure.png" });
  console.error("页面错误：", errors);
  throw error;
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
