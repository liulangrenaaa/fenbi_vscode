import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseScript, read, root } from "./lib.mjs";

// 逐个检查实际运行文件的语法，避免仅验证构建脚本自身。
function checkDirectory(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) checkDirectory(filename);
    else if (filename.endsWith(".js")) execFileSync(process.execPath, ["--check", filename]);
  }
}

// 收集需要与原插件隔离的全局标识，避免只改显示名称。
function collectIdentifiers(manifest) {
  const identifiers = new Set([`extension:${manifest.publisher}.${manifest.name}`]);
  for (const containers of Object.values(manifest.contributes.viewsContainers ?? {})) {
    for (const container of containers) identifiers.add(`container:${container.id}`);
  }
  for (const views of Object.values(manifest.contributes.views ?? {})) {
    for (const view of views) identifiers.add(`view:${view.id}`);
  }
  for (const command of manifest.contributes.commands ?? []) {
    identifiers.add(`command:${command.command}`);
  }
  for (const setting of Object.keys(manifest.contributes.configuration.properties ?? {})) {
    identifiers.add(`setting:${setting}`);
  }
  return identifiers;
}

checkDirectory(path.join(root, "out"));
const manifest = JSON.parse(read("package.json"));
for (const relativePath of [manifest.main, manifest.icon]) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    throw new Error(`缺少运行文件：${relativePath}`);
  }
}
parseScript(read("out/views/main.js"));
const upstream = JSON.parse(read("upstream/package.json"));
const originalIdentifiers = collectIdentifiers(upstream);
for (const identifier of collectIdentifiers(manifest)) {
  if (originalIdentifiers.has(identifier)) {
    throw new Error(`与原插件存在标识冲突：${identifier}`);
  }
}
console.log("运行文件语法、插件入口和原版标识隔离检查通过。");
