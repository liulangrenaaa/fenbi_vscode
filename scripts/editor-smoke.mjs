import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { setTimeout as delay } from "node:timers/promises";
import { root } from "./lib.mjs";

// 创建可重复释放的测试句柄，模拟 VS Code 事件生命周期。
function disposable(callback = () => {}) {
  return { dispose: callback };
}

// 构造宿主适配器，验证真实构建产物的标签页和消息行为。
function createHost() {
  const commands = new Map();
  const panels = [];
  const configuration = { cookie: "", get: (_, fallback) => fallback };
  let provider;
  let serializer;
  let sidebar;
  let closedSidebar = 0;
  const vscode = {
    ViewColumn: { One: 1 },
    Uri: {
      // 为前端资源生成可检查的文件地址。
      file(filename) {
        return { fsPath: filename, toString: () => `file://${filename}` };
      },
    },
    workspace: {
      // 确认配置仍然属于鲁班练习自己的命名空间。
      getConfiguration(namespace) {
        assert.equal(namespace, "lubanPractice");
        return configuration;
      },
    },
    commands: {
      // 保存真实命令处理器以便测试触发。
      registerCommand(id, callback) {
        commands.set(id, callback);
        return disposable();
      },
      // 模拟收起侧栏及随之发生的可见性事件。
      async executeCommand(id) {
        assert.equal(id, "workbench.action.closeSidebar");
        closedSidebar += 1;
        sidebar?.setVisible(false);
      },
    },
    window: {
      // 记录新建标签页的位置、选项和实例数量。
      createWebviewPanel(type, title, position, options) {
        const panel = createPanel();
        Object.assign(panel, { type, title, position, options });
        panels.push(panel);
        return panel;
      },
      // 保存左侧活动栏入口。
      registerWebviewViewProvider(id, value) {
        assert.equal(id, "lubanPractice.mainView");
        provider = value;
        return disposable();
      },
      // 保存重载后的标签页恢复处理器。
      registerWebviewPanelSerializer(id, value) {
        assert.equal(id, "lubanPractice.editor");
        serializer = value;
        return disposable();
      },
    },
  };
  const filename = path.join(root, "out/extension.js");
  const requireInstalled = createRequire(filename);
  // 加载真实后台，仅替换 VS Code 宿主接口。
  const requireModule = (name) => name === "vscode" ? vscode : requireInstalled(name);
  const sandbox = { module: { exports: {} }, require: requireModule, console, URL, Buffer, process, setTimeout, clearTimeout, setInterval, clearInterval };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(filename, "utf8"), sandbox, { filename });
  sandbox.module.exports.activate({ extensionPath: root, subscriptions: [], globalState: { get: (_, fallback) => fallback } });
  return {
    commands, panels, configuration,
    // 暴露宿主事件状态用于断言。
    get closedSidebar() { return closedSidebar; },
    // 模拟恢复 VS Code 上次打开的题库标签页。
    restore(panel) { return serializer.deserializeWebviewPanel(panel); },
    // 模拟活动栏入口第一次被解析。
    resolve(view) { sidebar = view; provider.resolveWebviewView(view); },
  };
}

// 构造具有事件释放和消息记录能力的题库标签页。
function createPanel() {
  let disposeListener;
  const listeners = new Set();
  const panel = {
    messages: [], reveals: [], disposed: false, listenerCount: 0,
    webview: {
      options: {},
      // 验证引用的前端资源在构建目录中存在。
      asWebviewUri(uri) {
        assert.ok(fs.existsSync(uri.fsPath));
        return uri.toString();
      },
      // 捕获发送给页面的消息，并禁止向已关闭标签页发送。
      postMessage(message) {
        assert.equal(panel.disposed, false);
        panel.messages.push(message);
        return Promise.resolve(true);
      },
      // 跟踪每个标签页的消息监听器数量。
      onDidReceiveMessage(callback) {
        panel.listenerCount += 1;
        listeners.add(callback);
        // 真实宿主会将每条消息分发给全部监听器。
        panel.receive = (message) => { for (const listener of listeners) listener(message); };
        let active = true;
        // 模拟监听器释放的幂等行为。
        return disposable(() => {
          if (active) panel.listenerCount -= 1;
          listeners.delete(callback);
          active = false;
        });
      },
    },
    // 记录重复打开时是否复用了原标签页。
    reveal(column) { panel.reveals.push(column); },
    // 保存标签页关闭监听器。
    onDidDispose(callback) { disposeListener = callback; return disposable(); },
    // 触发实际关闭回调并验证资源释放。
    dispose() {
      if (panel.disposed) return;
      panel.disposed = true;
      disposeListener?.();
    },
  };
  return panel;
}

// 模拟活动栏视图显示和隐藏，检查反复点击入口的行为。
function createSidebar(visible) {
  let listener;
  return {
    visible, webview: {},
    // 保存活动栏视图可见性监听器。
    onDidChangeVisibility(callback) { listener = callback; return disposable(); },
    // 触发实际可见性变化。
    setVisible(value) { this.visible = value; listener?.(); },
  };
}

const host = createHost();
const sidebar = createSidebar(false);
host.resolve(sidebar);
assert.equal(host.panels.length, 0, "隐藏入口不应主动打开题库");
host.commands.get("lubanPractice.hideAgentAnswer")();
host.commands.get("lubanPractice.prepareQuestionGroup")();
assert.equal(host.panels.length, 0, "助手快捷命令不能在未打开题库时新建页面");
assert.doesNotMatch(sidebar.webview.html, /<script/, "侧栏不能再运行一份题库页面");
sidebar.setVisible(true);
const first = host.panels[0];
assert.equal(host.panels.length, 1);
assert.equal(first.position.viewColumn, 1);
assert.equal(first.options.retainContextWhenHidden, true);
assert.equal(first.listenerCount, 2);
assert.match(first.webview.html, /out\/views\/main.js/);
assert.equal(host.closedSidebar, 1);
assert.equal(sidebar.visible, false);
sidebar.setVisible(true);
host.commands.get("lubanPractice.openWebview")();
assert.equal(host.panels.length, 1, "反复点击必须复用标签页");
assert.ok(first.reveals.every((column) => column === 1));
host.commands.get("lubanPractice.hideAgentAnswer")();
assert.equal(first.messages.at(-1).command, "agent.action");
assert.equal(first.messages.at(-1).data.action, "hideAnswer");
host.commands.get("lubanPractice.prepareQuestionGroup")();
assert.equal(first.messages.at(-1).command, "agent.action");
assert.equal(first.messages.at(-1).data.action, "prepareGroup");
host.commands.get("lubanPractice.toggleDisguise")();
await delay(80);
assert.equal(first.messages.at(-1).command, "showDisguise");
host.commands.get("lubanPractice.refreshEntry")();
await delay(80);
assert.equal(first.messages.at(-1).command, "setting");
first.receive({ command: "pageInit", postData: { categoryId: "xingce" } });
await delay(80);
assert.ok(first.messages.some((message) => message.command === "init"));
host.commands.get("lubanPractice.refreshEntry")();
const messageCount = first.messages.length;
first.dispose();
assert.equal(first.listenerCount, 0);
host.commands.get("lubanPractice.hideAgentAnswer")();
host.commands.get("lubanPractice.prepareQuestionGroup")();
assert.equal(first.messages.length, messageCount, "关闭后快捷命令不能投递到旧页面");
assert.equal(host.panels.length, 1, "关闭后快捷命令不能自动重开题库");
host.commands.get("lubanPractice.openWebview")();
await delay(80);
assert.equal(first.messages.length, messageCount, "关闭后的延迟消息必须被丢弃");
assert.equal(host.panels.length, 2, "关闭后可以重新创建题库");
assert.equal(host.panels[1].messages.length, 0, "旧页面消息不能误投给新页面");

const restoredHost = createHost();
const restored = createPanel();
await restoredHost.restore(restored);
assert.match(restored.webview.html, /out\/views\/main.js/);
restoredHost.resolve(createSidebar(true));
assert.equal(restoredHost.panels.length, 0, "活动栏不能重复创建已恢复的标签页");
const duplicate = createPanel();
await restoredHost.restore(duplicate);
assert.equal(duplicate.disposed, true);
assert.equal(restored.listenerCount, 2);
restoredHost.commands.get("lubanPractice.hideAgentAnswer")();
assert.equal(restored.messages.at(-1).data.action, "hideAnswer");
restored.dispose();
assert.equal(restored.listenerCount, 0);
restoredHost.commands.get("lubanPractice.openWebview")();
assert.equal(restoredHost.panels.length, 1);

const manifest = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
assert.ok(manifest.activationEvents.includes("onWebviewPanel:lubanPractice.editor"));
for (const menu of manifest.contributes.menus["editor/title"]) {
  assert.equal(menu.when, "activeWebviewPanelId == lubanPractice.editor");
}
for (const [command, key] of [
  ["lubanPractice.hideAgentAnswer", "alt+x"],
  ["lubanPractice.prepareQuestionGroup", "alt+c"],
]) {
  assert.ok(manifest.contributes.commands.some((item) => item.command === command));
  const binding = manifest.contributes.keybindings.find((item) => item.command === command);
  assert.equal(binding.key, key);
  assert.equal(binding.when, "activeWebviewPanelId == lubanPractice.editor && !terminalFocus && !inputFocus");
}
console.log("编辑器入口、命令与可自定义快捷键、单实例复用、消息通信、关闭重开及窗口恢复检查通过。");
