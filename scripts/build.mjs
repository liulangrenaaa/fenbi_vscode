import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";
import { assembleFrontend, root } from "./lib.mjs";

fs.mkdirSync(path.join(root, "out/views"), { recursive: true });
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.copyFileSync(path.join(root, "src/extension.js"), path.join(root, "out/extension.js"));
fs.cpSync(path.join(root, "src/shared"), path.join(root, "out/shared"), { recursive: true });
fs.copyFileSync(
  path.join(root, "src/views/main.js.LICENSE.txt"),
  path.join(root, "out/views/main.js.LICENSE.txt"),
);
const backendBuild = await build({
  entryPoints: [path.join(root, "src/agent/controller.mjs")],
  outfile: path.join(root, "out/agent/controller.js"),
  bundle: true, platform: "node", format: "cjs", target: "node20", metafile: true,
});
const frontendBuild = await build({
  entryPoints: [path.join(root, "src/agent/ui.jsx")],
  outfile: path.join(root, "out/views/agent-ui.js"),
  bundle: true, platform: "browser", format: "iife", globalName: "LubanAgentUI",
  target: "chrome120", legalComments: "linked", metafile: true,
  loader: { ".woff2": "file", ".woff": "file", ".ttf": "file" },
  assetNames: "fonts/[name]-[hash]",
});
const bundledPackages = new Set();
for (const filename of [...Object.keys(backendBuild.metafile.inputs), ...Object.keys(frontendBuild.metafile.inputs)]) {
  const match = filename.match(/(?:^|\/)node_modules\/((?:@[^/]+\/)?[^/]+)\//);
  if (match) bundledPackages.add(match[1]);
}
fs.mkdirSync(path.join(root, "out/licenses"), { recursive: true });
for (const packageName of bundledPackages) {
  const directory = path.join(root, "node_modules", packageName);
  for (const filename of fs.readdirSync(directory)) {
    if (/^(licen[sc]e|notice|copying)([.-]|$)/i.test(filename) && fs.statSync(path.join(directory, filename)).isFile()) {
      fs.copyFileSync(path.join(directory, filename), path.join(root, "out/licenses", `${packageName.replaceAll("/", "__")}__${filename}`));
    }
  }
}
fs.writeFileSync(path.join(root, "out/views/main.js"), assembleFrontend());
console.log("构建完成：out/extension.js 和 out/views/main.js");
