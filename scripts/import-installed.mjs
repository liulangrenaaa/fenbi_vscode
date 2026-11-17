import fs from "node:fs";
import path from "node:path";
import prettier from "prettier";
import {
  findModuleDeclaration,
  generate,
  marker,
  parseScript,
  root,
} from "./lib.mjs";

const installed = path.resolve(
  process.argv[2] ??
    "/home/lucas_wsl/.vscode-server/extensions/mrsavior.fenbi-tools-1.2.4",
);
if (fs.existsSync(path.join(root, "src"))) {
  throw new Error("src 已存在，禁止重新导入覆盖本地修改。");
}
const packagePath = path.join(root, "package.json");
const tooling = JSON.parse(fs.readFileSync(packagePath, "utf8"));
const original = JSON.parse(fs.readFileSync(path.join(installed, "package.json"), "utf8"));
if (original.name !== "fenbi-tools" || original.version !== "1.2.4") {
  throw new Error("本导入器仅验证过 fenbi-tools 1.2.4。");
}

// 从模块工厂中读取 CommonJS 导出名，用于区分可辨认的业务模块。
function findExports(factory) {
  const exportsName = factory.params[1]?.name;
  const names = new Set();
  if (!exportsName) return names;
  const pending = [factory.body];
  while (pending.length) {
    const node = pending.pop();
    if (!node || typeof node !== "object") continue;
    if (
      node.type === "AssignmentExpression" &&
      node.left.type === "MemberExpression" &&
      !node.left.computed &&
      node.left.object.type === "Identifier" &&
      node.left.object.name === exportsName
    ) {
      names.add(node.left.property.name);
    }
    for (const [key, value] of Object.entries(node)) {
      if (["loc", "start", "end", "extra", "comments", "tokens"].includes(key)) continue;
      if (Array.isArray(value)) pending.push(...value);
      else if (value && typeof value === "object") pending.push(value);
    }
  }
  return names;
}

// 用业务导出名生成稳定且便于检索的文件名。
function moduleFilename(id, names) {
  if (id === "2419") return "disguise.js";
  if (id === "6804") return "app.js";
  const candidates = [...names].sort();
  const name = candidates[0] ?? "module";
  return `${id}-${name.replace(/[^a-zA-Z0-9_-]/g, "_")}.js`;
}

// 格式化机械提取的表达式，保留执行逻辑和第三方版权注释。
async function formatExpression(expression, comment) {
  return prettier.format(
    `// ${comment}\n(${generate(expression, { comments: true }).code});\n`,
    { parser: "babel", printWidth: 100 },
  );
}

fs.cpSync(installed, path.join(root, "upstream"), { recursive: true, errorOnExist: true });
fs.mkdirSync(path.join(root, "src/views/modules"), { recursive: true });
fs.cpSync(path.join(installed, "out/extension.js"), path.join(root, "src/extension.js"));
fs.cpSync(path.join(installed, "out/shared"), path.join(root, "src/shared"), { recursive: true });
fs.cpSync(path.join(installed, "resources"), path.join(root, "resources"), { recursive: true });
for (const name of ["README.md", "CHANGELOG.md", "LICENSE.md"]) {
  fs.copyFileSync(path.join(installed, name), path.join(root, name));
}

const bundled = fs.readFileSync(path.join(installed, "out/views/main.js"), "utf8");
const ast = parseScript(bundled);
const declaration = findModuleDeclaration(ast);
const manifest = { order: [], editable: {} };
const vendor = { type: "ObjectExpression", properties: [] };
for (const property of declaration.init.properties) {
  const id = String(property.key.value);
  const names = findExports(property.value);
  manifest.order.push(id);
  // 自有代码采用 Babel 的显式导出，第三方模块保持在原始模块表中。
  if (id === "2419" || id === "6804" || names.size) {
    const relativePath = `src/views/modules/${moduleFilename(id, names)}`;
    const formatted = await formatExpression(
      property.value,
      `从安装包提取的模块 ${id}；导出：${[...names].join("、") || "无"}。`,
    );
    fs.writeFileSync(path.join(root, relativePath), formatted);
    manifest.editable[id] = relativePath;
  } else {
    vendor.properties.push(property);
  }
}
fs.writeFileSync(
  path.join(root, "src/views/vendor.js"),
  await formatExpression(vendor, "保留原模块编号的依赖及未单独拆分模块。"),
);
declaration.init = { type: "Identifier", name: marker };
fs.writeFileSync(
  path.join(root, "src/views/bootstrap.js"),
  await prettier.format(generate(ast, { comments: true }).code, { parser: "babel", printWidth: 100 }),
);
fs.writeFileSync(
  path.join(root, "src/views/modules.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
fs.copyFileSync(
  path.join(installed, "out/views/main.js.LICENSE.txt"),
  path.join(root, "src/views/main.js.LICENSE.txt"),
);

delete original.__metadata;
delete original.dependencies;
original.private = true;
original.scripts = tooling.scripts;
original.devDependencies = tooling.devDependencies;
fs.writeFileSync(packagePath, JSON.stringify(original, null, 2) + "\n");
console.log(`已导入 ${original.version}，拆分 ${Object.keys(manifest.editable).length} 个模块。`);
console.log("原始安装包保存在 upstream，未读取用户设置和 Cookie。");
