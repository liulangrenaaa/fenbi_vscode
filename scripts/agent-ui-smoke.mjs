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
      type: 2,
      content: "<p>上海多选练习：下列哪些数小于 16？</p>",
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
    {
      id: 104,
      globalId: 104,
      type: 1,
      content: '<p>分数图片题：<img src="//fb.fbstatic.cn/one.png">（ ）</p>',
      agentMaterialContent: "",
      accessories: [
        {
          options: [
            '<img src="//fb.fbstatic.cn/two.png">',
            '<img src="//fb.fbstatic.cn/three.png">',
          ],
        },
      ],
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

// 推进到最近一次失败满三十秒后，保留真实计时边界而不等待现实时间。
async function advanceRetry(page) {
  const remaining = await page.evaluate(
    () => window.testAgent.failedAt + 30000 - Date.now(),
  );
  await page.clock.runFor(Math.max(0, remaining) + 250);
}

// 按截图复现中文单位分式，检查真实题库样式不会遮挡分母或覆盖公式字号。
async function verifyMathLayout(page) {
  const content = String.raw`**思路**

先从图1读取2022年的三个数据：全国体育场地总数 **422.68 万个**、场地总面积 **37.02 亿平方米**、人均体育场地面积 **2.62 平方米**。

由此可先求全国人口：

\[
\text{人口}=\frac{37.02\text{亿平方米}}{2.62\text{平方米/人}}\approx14.13\text{亿人}
\]

再换算成“每万人拥有的场地数”：

\[
\frac{422.68\text{万个}}{14.13\text{亿人}}\times10000\approx29.9\text{个/万人}
\]

**注意**：分母中的单位需要完整显示。

行内分式 \(\frac{37.02}{2.62}\)，以及下标 \(a_{n+1}\)。

\[
\frac{1+\frac{2}{3}}{\sqrt{\frac{4}{5}}}
\]`;
  for (const [width, fontSize] of [
    [390, 14],
    [280, 18],
    [540, 13],
  ]) {
    await page.evaluate(
      ({ content, width, fontSize }) => {
        const fixture = document.createElement("section");
        fixture.id = "math-layout-fixture";
        fixture.className = "la-agent";
        Object.assign(fixture.style, {
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "10000",
          width: `${width}px`,
          height: "auto",
          padding: "16px",
          boxSizing: "border-box",
          fontSize: `${fontSize}px`,
          background: "#21222b",
          color: "#fff",
        });
        fixture.innerHTML = `<div class="la-markdown">${window.LubanAgentUI.renderAnswerMarkdown(content)}</div>`;
        document.body.append(fixture);
      },
      { content, width, fontSize },
    );
    await page.evaluate(() => document.fonts.ready);
    const geometry = await page
      .locator("#math-layout-fixture")
      .evaluate((fixture) => {
        const blocks = [...fixture.querySelectorAll(".la-math-display")];
        return {
          opaqueParts: [...fixture.querySelectorAll(".katex span")].filter(
            (node) =>
              getComputedStyle(node).backgroundColor !== "rgba(0, 0, 0, 0)",
          ).length,
          scaledSizes: [
            ...fixture.querySelectorAll(".katex .katex-sizing.size3"),
          ].map((node) => ({
            node: parseFloat(getComputedStyle(node).fontSize),
            parent: parseFloat(getComputedStyle(node.parentElement).fontSize),
          })),
          blocks: blocks.map((block) => {
            const bounds = block.getBoundingClientRect();
            const glyphs = [
              ...block.querySelectorAll(".katex-html span"),
            ].filter(
              (node) => node.childElementCount === 0 && node.textContent.trim(),
            );
            return {
              height: bounds.height,
              clipped: glyphs.some((node) => {
                const rect = node.getBoundingClientRect();
                return (
                  rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1
                );
              }),
            };
          }),
          fallback: fixture.querySelectorAll(".la-math-fallback").length,
        };
      });
    await page.locator("#math-layout-fixture").screenshot({
      path: `/tmp/luban-agent-math-${width}-${fontSize}.png`,
    });
    assert.equal(geometry.opaqueParts, 0, "题库背景色不能遮住公式内部元素");
    assert.equal(geometry.fallback, 0, "中文单位和多层分式应正常排版");
    assert.equal(geometry.blocks.length, 3);
    assert.ok(
      geometry.blocks.every((block) => block.height > 24 && !block.clipped),
      `分子、分母和多层分式必须完整可见：${JSON.stringify(geometry.blocks)}`,
    );
    assert.ok(geometry.scaledSizes.length > 0);
    assert.ok(
      geometry.scaledSizes.every((size) => size.node < size.parent),
      "分式内部的小字号不能被题库全局字号覆盖",
    );
    await page
      .locator("#math-layout-fixture")
      .evaluate((fixture) => fixture.remove());
  }
}

const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="/agent-ui.css"><style>body{margin:0;background:#21222b;--vscode-editor-background:#21222b;--vscode-sideBar-background:#252526;--vscode-foreground:#ddd;--vscode-font-family:system-ui}</style></head>
<body><div id="loading">初始化</div><div id="root"></div><script>
// 模拟网页状态跨刷新保存，并检查分栏调整没有覆盖其他设置。
window.sent=[];let state=JSON.parse(sessionStorage.getItem("fixture-state")||'{"fixtureMarker":"preserved"}');let pending=null;
window.testAgent={delay:150,fail:[],hold:[],partial:[],overlap:false,failedAt:0};
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
      if(pending)window.testAgent.overlap=true;
      pending=p;event("started",p);
      if(p.text.includes("长回答")||window.testAgent.hold.includes(p.question.id))return;
      if(window.testAgent.fail.includes(p.question.id)){pending=null;window.testAgent.failedAt=Date.now();event("error",{...p,message:"模拟读取失败"});event("done",p);return;}
      event("reference",{...p,message:"已获取粉笔题库参考解析",available:true});
      event("status",{...p,message:"工具输出的答案 SPOILER_TOOL_TITLE"});
      const complete=!window.testAgent.partial.includes(p.question.id);
      const answer=p.question.id==="103"?formattedAnswer:"**测试回答：B。**\\n\\n2 + 2 = 4。<script>window.injected=true;<"+"/script>";
      setTimeout(()=>{if(pending?.requestId===p.requestId)event("delta",{...p,text:answer.slice(0,45)});},50);
      setTimeout(()=>{if(pending?.requestId!==p.requestId)return;event("delta",{...p,text:answer.slice(45)});pending=null;if(!complete)window.testAgent.failedAt=Date.now();event("done",{...p,complete});},window.testAgent.delay);
    }
    if(message.command==="agent.stop"&&pending){const stopped=pending;pending=null;event("status",{...stopped,message:"已停止生成。"});event("done",{...stopped,cancelled:true});}
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
// 浏览器中的题图使用固定像素响应，界面测试不依赖外部 CDN 网络。
await page.route("https://fb.fbstatic.cn/**", (route) =>
  route.fulfill({
    contentType: "image/png",
    body: Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jZ1kAAAAASUVORK5CYII=",
      "base64",
    ),
  }),
);
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
// 字体必须来自打包产物，避免公式在离线环境下回退成错误字形。
page.on("response", (response) => {
  if (response.url().includes("/fonts/") && response.status() !== 200)
    errors.push(`公式字体加载失败：${response.status()}`);
});

try {
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  // 用真实构建产物检查图片编号跨题干、材料、选项保持一致。
  const imageQuestion = await page.evaluate(() =>
    window.LubanAgentUI.buildQuestion({
      question: {
        id: 104,
        content:
          '<p>数列：<img src="//fb.fbstatic.cn/one.png">，<img src="//fb.fenbike.cn/two.png">（ ）</p>',
        agentMaterialContent:
          '<p>材料<img src="//fb.fbstatic.cn/material.png"></p>',
        accessories: [
          {
            options: [
              '<img src="//fb.fenbike.cn/two.png">',
              '<img src="https://fb.fbstatic.cn/answer.png">',
            ],
          },
        ],
        correctAnswer: "HIDDEN",
      },
    }),
  );
  assert.match(imageQuestion.content, /数列： \[图片1\] ， \[图片2\]/);
  assert.match(imageQuestion.materials, /材料 \[图片3\]/);
  assert.deepEqual(imageQuestion.options, ["[图片2]", "[图片4]"]);
  assert.deepEqual(imageQuestion.images, [
    "https://fb.fbstatic.cn/one.png",
    "https://fb.fenbike.cn/two.png",
    "https://fb.fbstatic.cn/material.png",
    "https://fb.fbstatic.cn/answer.png",
  ]);
  assert.doesNotMatch(JSON.stringify(imageQuestion), /HIDDEN/);
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
  await verifyMathLayout(page);
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
  // 单选改答后上下文必须只保留新选项，不能残留捕获阶段尚未取消的旧选项。
  await current.getByRole("radio").nth(2).check();
  assert.equal(
    await page.locator(".la-context-answer").textContent(),
    "已选 C",
    "单选题从 A 改为 C 后，Agents 不能显示已选 A、C",
  );
  for (const index of [1, 3, 0, 2]) {
    await current.getByRole("radio").nth(index).check();
    assert.equal(
      await page.locator(".la-context-answer").textContent(),
      `已选 ${String.fromCharCode(65 + index)}`,
      "连续改答后上下文必须只包含最后选中的单选答案",
    );
    assert.equal(await current.locator("input:checked").count(), 1);
  }
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
  // 默认隐藏回答，正文与复制入口都不能出现在 DOM 中。
  await page.waitForFunction(
    () => document.querySelectorAll(".la-answer-hidden").length > 0,
  );
  assert.equal(await page.locator(".la-markdown").count(), 0);
  assert.equal(await page.getByRole("button", { name: "复制回答" }).count(), 0);
  assert.equal(
    await page.getByRole("checkbox", { name: "显示 Agents 回答" }).isChecked(),
    false,
  );
  assert.doesNotMatch(
    await page.locator(".la-transcript").textContent(),
    /测试回答：B|SPOILER_TOOL_TITLE/,
  );
  await page.getByRole("checkbox", { name: "显示 Agents 回答" }).check();
  await page
    .locator(".la-markdown")
    .getByText("测试回答：B。", { exact: true })
    .waitFor();
  const sent = await page.evaluate(() =>
    window.sent.find((message) => message.command === "agent.send"),
  );
  assert.equal(sent.postData.question.id, "102");
  assert.equal(sent.postData.question.userAnswer, "C");
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
  // 宿主隐藏命令对当前题目生效，重复执行不显示答案，也不清空已生成回答。
  await page.evaluate(() => {
    for (let index = 0; index < 2; index += 1)
      window.dispatchEvent(
        new MessageEvent("message", {
          data: { command: "agent.action", data: { action: "hideAnswer" } },
        }),
      );
  });
  await page.waitForFunction(
    () => document.querySelectorAll(".la-markdown").length === 0,
  );
  assert.equal(
    await page.getByRole("checkbox", { name: "显示 Agents 回答" }).isChecked(),
    false,
  );
  assert.equal(await page.locator(".la-question-id").textContent(), "#102");
  await page.getByRole("checkbox", { name: "显示 Agents 回答" }).check();
  await page
    .locator(".la-markdown")
    .getByText("测试回答：B。", { exact: true })
    .waitFor();

  await page
    .locator("[data-agent-question='101'] .question-item")
    .click({ position: { x: 12, y: 12 } });
  assert.equal(await page.locator(".la-question-id").textContent(), "#101");
  // 多选仍须同步多个答案与取消操作，不能套用单选只保留一个选项的规则。
  const multiple = page.locator("[data-agent-question='101']");
  await multiple.getByRole("checkbox").nth(0).check();
  await multiple.getByRole("checkbox").nth(2).check();
  assert.equal(
    await page.locator(".la-context-answer").textContent(),
    "已选 A、C",
  );
  await multiple.getByRole("checkbox").nth(0).uncheck();
  assert.equal(
    await page.locator(".la-context-answer").textContent(),
    "已选 C",
  );
  await multiple.getByRole("checkbox").nth(2).uncheck();
  assert.equal(await page.locator(".la-context-answer").count(), 0);
  await multiple.getByRole("checkbox").nth(1).check();
  assert.equal(
    await page.locator(".la-context-answer").textContent(),
    "已选 B",
  );
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
    await page.locator(".la-context-answer").textContent(),
    "已选 C",
    "切换题目后应保留该题最后一次单选答案",
  );
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

  // 选中图片题并作答后，实际发送消息仍包含题图、选项编号和当前选择。
  const imageItem = page.locator("[data-agent-question='104']");
  await imageItem
    .locator(".question-item")
    .click({ position: { x: 12, y: 12 } });
  await imageItem.getByRole("radio").first().check();
  await page.waitForFunction(() =>
    document
      .querySelector(".la-context-answer")
      ?.textContent.includes("含 3 张题图 · 已选 A"),
  );
  await page
    .getByRole("textbox", { name: "向 OpenCode 提问" })
    .fill("读取分数");
  await page.getByRole("button", { name: "发送", exact: true }).click();
  await page.getByRole("checkbox", { name: "显示 Agents 回答" }).check();
  await page
    .locator(".la-markdown")
    .getByText("测试回答：B。", { exact: true })
    .waitFor();
  const imageMessage = await page.evaluate(() =>
    window.sent
      .filter(
        (message) =>
          message.command === "agent.send" &&
          message.postData.question.id === "104",
      )
      .at(-1),
  );
  assert.match(imageMessage.postData.question.content, /\[图片1\]/);
  assert.deepEqual(imageMessage.postData.question.options, [
    "[图片2]",
    "[图片3]",
  ]);
  assert.equal(imageMessage.postData.question.userAnswer, "A");
  assert.equal(imageMessage.postData.question.images.length, 3);
  await page.screenshot({ path: "/tmp/luban-agent-image-context-1280.png" });

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
  await page.getByRole("checkbox", { name: "显示 Agents 回答" }).check();
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
      const context = document
        .querySelector(".la-context")
        .getBoundingClientRect();
      const answerToggle = document
        .querySelector(".la-answer-toggle")
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
        transcript: { y: transcript.y, bottom: transcript.bottom },
        context: { bottom: context.bottom },
        answerToggle: {
          y: answerToggle.y,
          right: answerToggle.right,
          bottom: answerToggle.bottom,
          width: answerToggle.width,
          height: answerToggle.height,
        },
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
    assert.ok(
      geometry.answerToggle.y >= geometry.context.bottom &&
        geometry.answerToggle.bottom <= geometry.transcript.y + 1 &&
        Math.abs(geometry.answerToggle.right - (geometry.agent.right - 12)) <=
          1,
      "显示回答开关应固定在当前题目下方的右侧，不能遮挡对话",
    );
    assert.equal(geometry.answerToggle.width, 32);
    assert.equal(geometry.answerToggle.height, 32);
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
  // 批量任务只走助手通道，按页面顺序请求并保持用户的题目、草稿和作答。
  const batchBaseline = await page.evaluate(() => ({
    count: window.sent.filter((message) => message.command === "agent.send")
      .length,
    legacy: window.sent.filter(
      (message) => !message.command.startsWith("agent."),
    ).length,
    checked: Array.from(
      document.querySelectorAll(".la-quiz input:checked"),
    ).map((input) => [input.name, input.value]),
    selected: document.querySelector(".la-question-id")?.textContent,
  }));
  await page
    .getByRole("textbox", { name: "向 OpenCode 提问" })
    .fill("保留我的追问草稿");
  const prepare = page.locator(".la-quiz .la-practice-controls button");
  assert.equal(await prepare.textContent(), "预解析本组题目");
  // 宿主快捷命令复用页面队列，连续触发不能重复启动或修改题库作答。
  await page.evaluate(() => {
    for (let index = 0; index < 2; index += 1)
      window.dispatchEvent(
        new MessageEvent("message", {
          data: { command: "agent.action", data: { action: "prepareGroup" } },
        }),
      );
  });
  await page.waitForFunction(() =>
    document
      .querySelector(".la-batch-status")
      ?.textContent.includes("预解析结束 · 4/4"),
  );
  const prepared = await page.evaluate(
    (baseline) => ({
      requests: window.sent
        .filter((message) => message.command === "agent.send")
        .slice(baseline.count)
        .map((message) => message.postData),
      legacy: window.sent.filter(
        (message) => !message.command.startsWith("agent."),
      ).length,
      checked: Array.from(
        document.querySelectorAll(".la-quiz input:checked"),
      ).map((input) => [input.name, input.value]),
      selected: document.querySelector(".la-question-id")?.textContent,
      overlap: window.testAgent.overlap,
    }),
    batchBaseline,
  );
  assert.deepEqual(
    prepared.requests.map((item) => item.question.id),
    ["101", "102", "103", "104"],
  );
  assert.ok(
    prepared.requests.every(
      (item) => item.intent === "explain" && item.model === "test/glm",
    ),
  );
  assert.equal(prepared.overlap, false, "同一时刻只能向 OpenCode 发出一道题");
  assert.equal(
    prepared.selected,
    batchBaseline.selected,
    "预解析不能切走当前题目",
  );
  assert.equal(
    prepared.legacy,
    batchBaseline.legacy,
    "预解析不能调用题库作答或交卷消息",
  );
  assert.deepEqual(prepared.checked, batchBaseline.checked);
  assert.equal(
    await page.getByRole("textbox", { name: "向 OpenCode 提问" }).inputValue(),
    "保留我的追问草稿",
  );
  assert.equal(
    await page.getByRole("checkbox", { name: "显示 Agents 回答" }).isChecked(),
    false,
  );
  assert.equal(await page.locator(".la-markdown").count(), 0);
  assert.doesNotMatch(
    await page.locator(".la-transcript").textContent(),
    /答案：D|451 件|SPOILER_TOOL_TITLE/,
  );
  await page.screenshot({ path: "/tmp/luban-agent-prepared-hidden-1280.png" });
  await page.getByRole("checkbox", { name: "显示 Agents 回答" }).check();
  assert.match(
    await page.locator(".la-markdown").textContent(),
    /答案：D．451 件/,
  );
  await imageItem
    .locator(".question-item")
    .click({ position: { x: 12, y: 12 } });
  assert.equal(
    await page.getByRole("checkbox", { name: "显示 Agents 回答" }).isChecked(),
    false,
  );
  assert.equal(await page.locator(".la-markdown").count(), 0);
  await page.getByRole("checkbox", { name: "显示 Agents 回答" }).check();
  assert.match(
    await page.locator(".la-markdown").last().textContent(),
    /测试回答：B/,
  );
  await prepare.click();
  assert.equal(
    await page.evaluate(
      () =>
        window.sent.filter((message) => message.command === "agent.send")
          .length,
    ),
    batchBaseline.count + 4,
    "已就绪的题目无需重复等待模型",
  );

  // 失败后必须等待满三十秒，快捷命令不能绕过等待或重跑已完成的题目。
  await page.clock.install();
  await page.clock.pauseAt(Date.now());
  await current.locator(".question-item").click({ position: { x: 12, y: 12 } });
  await page.getByRole("button", { name: "新建当前题目会话" }).click();
  await page.waitForFunction(
    () => document.querySelectorAll(".la-message").length === 0,
  );
  await page.evaluate(() => {
    window.testAgent.fail = ["102"];
  });
  await prepare.click();
  await page.clock.runFor(100);
  assert.match(
    await page.locator(".la-batch-status").textContent(),
    /30 秒后重试 1\/10/,
  );
  const retryRequests = await page.evaluate(
    () =>
      window.sent.filter((message) => message.command === "agent.send").length,
  );
  await page.evaluate(() =>
    window.dispatchEvent(
      new MessageEvent("message", {
        data: { command: "agent.action", data: { action: "prepareGroup" } },
      }),
    ),
  );
  const beforeRetry = await page.evaluate(
    () => window.testAgent.failedAt + 29999 - Date.now(),
  );
  await page.clock.runFor(beforeRetry);
  assert.equal(
    await page.evaluate(
      () =>
        window.sent.filter((message) => message.command === "agent.send")
          .length,
    ),
    retryRequests,
    "等待不足三十秒或再次按快捷键时不能提前重试",
  );
  await page.evaluate(() => {
    window.testAgent.fail = [];
  });
  await page.clock.runFor(251);
  assert.match(
    await page.locator(".la-batch-status").textContent(),
    /预解析结束 · 4\/4/,
  );
  const retries = await page.evaluate(
    (baseline) =>
      window.sent
        .filter((message) => message.command === "agent.send")
        .slice(baseline + 4)
        .map((message) => message.postData.question.id),
    batchBaseline.count,
  );
  assert.deepEqual(retries, ["102", "102"]);

  // 持续失败只能额外重试十次，达到上限后仍会继续下一题并保留手动补做入口。
  await page.getByRole("button", { name: "新建当前题目会话" }).click();
  await page.clock.runFor(100);
  await page
    .locator("[data-agent-question='103'] .question-item")
    .click({ position: { x: 12, y: 12 } });
  await page.getByRole("button", { name: "新建当前题目会话" }).click();
  await page.clock.runFor(100);
  await current.locator(".question-item").click({ position: { x: 12, y: 12 } });
  const cappedBaseline = await page.evaluate(
    () =>
      window.sent.filter((message) => message.command === "agent.send").length,
  );
  await page.evaluate(() => {
    window.testAgent.fail = ["102"];
  });
  await prepare.click();
  await page.clock.runFor(100);
  for (let attempt = 1; attempt <= 10; attempt += 1) {
    assert.match(
      await page.locator(".la-batch-status").textContent(),
      new RegExp(`30 秒后重试 ${attempt}/10`),
    );
    await advanceRetry(page);
  }
  await page.clock.runFor(500);
  assert.match(
    await page.locator(".la-batch-status").textContent(),
    /预解析结束 · 3\/4 · 失败 1/,
  );
  assert.match(
    await page.locator(".la-transcript .la-error").textContent(),
    /自动重试已达 10 次/,
  );
  const cappedRequests = await page.evaluate(
    (baseline) =>
      window.sent
        .filter((message) => message.command === "agent.send")
        .slice(baseline)
        .map((message) => message.postData.question.id),
    cappedBaseline,
  );
  assert.deepEqual(cappedRequests, [...Array(11).fill("102"), "103"]);
  await page.clock.runFor(60000);
  assert.equal(
    await page.evaluate(
      () =>
        window.sent.filter((message) => message.command === "agent.send")
          .length,
    ),
    cappedBaseline + 12,
    "达到上限后不能再产生自动请求",
  );
  await page.evaluate(() => {
    window.testAgent.fail = [];
  });
  await prepare.click();
  await page.clock.runFor(500);
  assert.match(
    await page.locator(".la-batch-status").textContent(),
    /预解析结束 · 4\/4/,
  );

  // 截断回答不能标为已就绪，也应等待三十秒自动补做。
  await page.getByRole("button", { name: "新建当前题目会话" }).click();
  await page.clock.runFor(100);
  await page.evaluate(() => {
    window.testAgent.partial = ["102"];
  });
  await prepare.click();
  await page.clock.runFor(250);
  assert.match(
    await page.locator(".la-batch-status").textContent(),
    /30 秒后重试 1\/10/,
  );
  assert.match(
    await page.locator(".la-transcript .la-error").textContent(),
    /未完整生成/,
  );
  await page.evaluate(() => {
    window.testAgent.partial = [];
  });
  await advanceRetry(page);
  assert.match(
    await page.locator(".la-batch-status").textContent(),
    /预解析结束 · 4\/4/,
  );

  // 暂停等待会取消定时器，恢复后保留重试次数并重新等待三十秒。
  await page.getByRole("button", { name: "新建当前题目会话" }).click();
  await page.clock.runFor(100);
  await page.evaluate(() => {
    window.testAgent.fail = ["102"];
  });
  await prepare.click();
  await page.clock.runFor(100);
  await advanceRetry(page);
  assert.match(
    await page.locator(".la-batch-status").textContent(),
    /30 秒后重试 2\/10/,
  );
  await prepare.click();
  const waitingCount = await page.evaluate(
    () =>
      window.sent.filter((message) => message.command === "agent.send").length,
  );
  await page.clock.runFor(60000);
  assert.equal(
    await page.evaluate(
      () =>
        window.sent.filter((message) => message.command === "agent.send")
          .length,
    ),
    waitingCount,
  );
  assert.match(
    await page.locator(".la-batch-status").textContent(),
    /预解析已暂停/,
  );
  await page.evaluate(() => {
    window.testAgent.fail = [];
  });
  await prepare.click();
  assert.match(
    await page.locator(".la-batch-status").textContent(),
    /30 秒后重试 2\/10/,
  );
  await page.clock.runFor(29999);
  assert.equal(
    await page.evaluate(
      () =>
        window.sent.filter((message) => message.command === "agent.send")
          .length,
    ),
    waitingCount,
  );
  await page.clock.runFor(251);
  assert.match(
    await page.locator(".la-batch-status").textContent(),
    /预解析结束 · 4\/4/,
  );

  // 清空会话会丢弃重试等待，手动提问也会暂停队列，不能与自动请求重叠。
  await page.getByRole("button", { name: "新建当前题目会话" }).click();
  await page.clock.runFor(100);
  await page.evaluate(() => {
    window.testAgent.fail = ["102"];
  });
  await prepare.click();
  await page.clock.runFor(100);
  await page.getByRole("button", { name: "新建当前题目会话" }).click();
  const clearedCount = await page.evaluate(
    () =>
      window.sent.filter((message) => message.command === "agent.send").length,
  );
  await page.clock.runFor(60000);
  assert.equal(await page.locator(".la-batch-status").count(), 0);
  assert.equal(
    await page.evaluate(
      () =>
        window.sent.filter((message) => message.command === "agent.send")
          .length,
    ),
    clearedCount,
  );
  await prepare.click();
  await page.clock.runFor(100);
  await page.evaluate(() => {
    window.testAgent.fail = [];
  });
  await page
    .getByRole("textbox", { name: "向 OpenCode 提问" })
    .fill("只提示一下思路");
  await page.getByRole("button", { name: "发送", exact: true }).click();
  await page.clock.runFor(500);
  assert.match(
    await page.locator(".la-batch-status").textContent(),
    /预解析已暂停/,
  );
  await page.clock.runFor(60000);
  assert.equal(
    await page.evaluate(
      () =>
        window.sent.filter((message) => message.command === "agent.send")
          .length,
    ),
    clearedCount + 2,
  );
  await prepare.click();
  await page.clock.runFor(30500);
  assert.match(
    await page.locator(".la-batch-status").textContent(),
    /预解析结束 · 4\/4/,
  );

  // 离开做题页面后即使超过重试时间，也不能请求上一组题目。
  await page.getByRole("button", { name: "新建当前题目会话" }).click();
  await page.clock.runFor(100);
  await page.evaluate(() => {
    window.testAgent.fail = ["102"];
  });
  await prepare.click();
  await page.clock.runFor(100);
  const retryLeavingCount = await page.evaluate(
    () =>
      window.sent.filter((message) => message.command === "agent.send").length,
  );
  await page.getByRole("button", { name: "返回上一页", exact: true }).click();
  await page.clock.runFor(60000);
  assert.equal(
    await page.evaluate(
      () =>
        window.sent.filter((message) => message.command === "agent.send")
          .length,
    ),
    retryLeavingCount,
  );
  await page.evaluate(() => {
    window.testAgent.fail = [];
  });
  await page.getByRole("button", { name: "继续做题", exact: true }).click();
  await page.clock.runFor(100);
  await prepare.click();
  await page.clock.runFor(1000);
  assert.match(
    await page.locator(".la-batch-status").textContent(),
    /预解析结束 · 4\/4/,
  );
  await page.clock.resume();

  // 暂停会取消正在生成的题目，继续时从未完成处重试且不重复已缓存的题目。
  await page
    .locator("[data-agent-question='101'] .question-item")
    .click({ position: { x: 12, y: 12 } });
  await page.getByRole("button", { name: "新建当前题目会话" }).click();
  await page.waitForFunction(
    () => document.querySelectorAll(".la-message").length === 0,
  );
  await page.evaluate(() => {
    window.testAgent.hold = ["101"];
  });
  await prepare.click();
  await page.getByRole("button", { name: "停止生成" }).waitFor();
  await prepare.click();
  await page.waitForFunction(() =>
    document
      .querySelector(".la-batch-status")
      ?.textContent.includes("预解析已暂停"),
  );
  await page.getByRole("button", { name: "发送", exact: true }).waitFor();
  const pausedCount = await page.evaluate(
    () =>
      window.sent.filter((message) => message.command === "agent.send").length,
  );
  assert.equal(await prepare.textContent(), "继续预解析");
  await page.evaluate(() => {
    window.testAgent.hold = [];
  });
  await prepare.click();
  await page.waitForFunction(() =>
    document
      .querySelector(".la-batch-status")
      ?.textContent.includes("预解析结束 · 4/4"),
  );
  const continued = await page.evaluate(
    (baseline) =>
      window.sent
        .filter((message) => message.command === "agent.send")
        .slice(baseline)
        .map((message) => message.postData.question.id),
    pausedCount,
  );
  assert.deepEqual(continued, ["101"]);
  await page.setViewportSize({ width: 390, height: 640 });
  const protectedLayout = await page.evaluate(() => {
    const composer = document
      .querySelector(".la-composer")
      .getBoundingClientRect();
    const transcript = document
      .querySelector(".la-transcript")
      .getBoundingClientRect();
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      fits: composer.bottom <= innerHeight + 1,
      overlap: transcript.bottom > composer.top + 1,
    };
  });
  assert.deepEqual(protectedLayout, {
    overflow: false,
    fits: true,
    overlap: false,
  });
  await page.screenshot({ path: "/tmp/luban-agent-prepared-hidden-390.png" });
  await page.setViewportSize({ width: 1280, height: 900 });

  // 离开正在预解析的练习必须取消队列，返回练习后不会自行启动模型请求。
  await page.getByRole("button", { name: "新建当前题目会话" }).click();
  await page.waitForFunction(
    () => document.querySelectorAll(".la-message").length === 0,
  );
  await page.evaluate(() => {
    window.testAgent.hold = ["101"];
  });
  await prepare.click();
  await page.getByRole("button", { name: "停止生成" }).waitFor();
  const leavingCount = await page.evaluate(
    () =>
      window.sent.filter((message) => message.command === "agent.send").length,
  );
  await page.getByRole("button", { name: "返回上一页", exact: true }).click();
  await page.waitForFunction(() =>
    document
      .querySelector(".la-context-title")
      ?.textContent.includes("尚未选择题目"),
  );
  await page.getByRole("button", { name: "继续做题", exact: true }).click();
  await page.locator("[data-agent-question='101']").waitFor();
  await page.getByRole("button", { name: "发送", exact: true }).waitFor();
  assert.equal(
    await page.evaluate(
      () =>
        window.sent.filter((message) => message.command === "agent.send")
          .length,
    ),
    leavingCount,
  );
  assert.equal(await page.locator(".la-batch-status").count(), 0);
  assert.equal(await page.locator(".la-markdown").count(), 0);
  await page.getByRole("button", { name: "返回上一页", exact: true }).click();
  // 首页也可能收到用户自定义的全局命令，此时不能继续预解析旧题。
  const homeRequests = await page.evaluate(
    () =>
      window.sent.filter((message) => message.command === "agent.send").length,
  );
  await page.evaluate(() =>
    window.dispatchEvent(
      new MessageEvent("message", {
        data: { command: "agent.action", data: { action: "prepareGroup" } },
      }),
    ),
  );
  assert.equal(
    await page.evaluate(
      () =>
        window.sent.filter((message) => message.command === "agent.send")
          .length,
    ),
    homeRequests,
  );
  assert.deepEqual(errors, []);
  console.log(
    "真实题库页面检查通过：隐藏与预解析快捷命令、顺序预解析、完成缓存、失败重试、暂停继续、离页取消、防剧透过滤、题图同步、公式字体、Markdown 净化、流式排版、分栏、作答同步、模型切换、会话隔离、停止、伪装及桌面/窄屏布局。",
  );
} catch (error) {
  await page.screenshot({ path: "/tmp/luban-agent-ui-failure.png" });
  console.error("页面错误：", errors);
  throw error;
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
