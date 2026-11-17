import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { parse, parseExpression } from "@babel/parser";

const require = createRequire(import.meta.url);
export const generate = require("@babel/generator").default;
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const marker = "__FENBI_LOCAL_MODULES__";

// 按路径读取工程中的文件，避免依赖命令启动目录。
export function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

// 使用统一的脚本模式解析已发布的 JavaScript。
export function parseScript(source) {
  return parse(source, { sourceType: "script" });
}

// 读取仅包含一个表达式的前端模块文件。
export function readExpression(relativePath) {
  const ast = parseScript(read(relativePath));
  if (ast.program.body.length !== 1 || ast.program.body[0].type !== "ExpressionStatement") {
    throw new Error(`模块文件必须只包含一个表达式：${relativePath}`);
  }
  return ast.program.body[0].expression;
}

// 定位原始 Webpack 模块表，要求其中包含已确认的伪装和主应用模块。
export function findModuleDeclaration(ast) {
  const expression = ast.program.body[0]?.expression;
  const body = expression?.callee?.body?.body;
  for (const statement of body ?? []) {
    if (statement.type !== "VariableDeclaration") continue;
    for (const declaration of statement.declarations) {
      if (declaration.init?.type !== "ObjectExpression") continue;
      const ids = new Set();
      for (const property of declaration.init.properties) {
        ids.add(String(property.key?.value));
      }
      if (ids.has("2419") && ids.has("6804")) return declaration;
    }
  }
  throw new Error("没有找到预期的 Webpack 模块表，停止导入以免损坏代码。");
}

// 将业务模块和保留的第三方模块按原有顺序组装回运行代码。
export function assembleFrontend() {
  const manifest = JSON.parse(read("src/views/modules.json"));
  const vendor = readExpression("src/views/vendor.js");
  const modules = new Map();
  for (const property of vendor.properties) {
    modules.set(String(property.key.value), property);
  }
  for (const [id, relativePath] of Object.entries(manifest.editable)) {
    const expression = readExpression(relativePath);
    if (!["FunctionExpression", "ArrowFunctionExpression"].includes(expression.type)) {
      throw new Error(`模块 ${id} 必须保持为函数表达式。`);
    }
    modules.set(id, {
      type: "ObjectProperty",
      key: parseExpression(id),
      value: expression,
      computed: false,
      shorthand: false,
    });
  }
  const properties = [];
  for (const id of manifest.order) {
    const property = modules.get(id);
    if (!property) throw new Error(`缺少前端模块 ${id}`);
    properties.push(property);
    modules.delete(id);
  }
  if (modules.size) throw new Error("模块清单和模块文件不一致。");
  const ast = parseScript(read("src/views/bootstrap.js"));
  let replaced = false;
  const body = ast.program.body[0]?.expression?.callee?.body?.body ?? [];
  for (const statement of body) {
    if (statement.type !== "VariableDeclaration") continue;
    for (const declaration of statement.declarations) {
      if (declaration.init?.type === "Identifier" && declaration.init.name === marker) {
        declaration.init = { type: "ObjectExpression", properties };
        replaced = true;
      }
    }
  }
  if (!replaced) throw new Error("前端启动文件缺少模块表占位符。");
  return generate(ast, { compact: true, comments: true }).code + "\n";
}
