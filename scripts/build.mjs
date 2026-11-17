import fs from "node:fs";
import path from "node:path";
import { assembleFrontend, root } from "./lib.mjs";

fs.mkdirSync(path.join(root, "out/views"), { recursive: true });
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.copyFileSync(path.join(root, "src/extension.js"), path.join(root, "out/extension.js"));
fs.cpSync(path.join(root, "src/shared"), path.join(root, "out/shared"), { recursive: true });
fs.copyFileSync(
  path.join(root, "src/views/main.js.LICENSE.txt"),
  path.join(root, "out/views/main.js.LICENSE.txt"),
);
fs.writeFileSync(path.join(root, "out/views/main.js"), assembleFrontend());
console.log("构建完成：out/extension.js 和 out/views/main.js");
