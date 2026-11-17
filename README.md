# 鲁班练习（fenbi_vscode）

用于在 VS Code 中练习粉笔题库的本地改造版插件。

本工程基于已安装的 `mrsavior.fenbi-tools` 1.2.4 发布包提取、格式化和拆分，
不是作者原始的 TypeScript / TSX 源码。部分变量名仍保留压缩后的形式，
第三方依赖保留在前端模块中。

## 插件标识

| 项目 | 当前值 |
| --- | --- |
| 显示名称 | 鲁班练习 |
| 插件 ID | `lucas-local.luban-practice` |
| 设置前缀 | `lubanPractice.*` |
| 题库视图 | `lubanPractice.mainView` |
| 智能伪装命令 | `lubanPractice.toggleDisguise` |

插件、命令、侧栏和设置标识已经与原版分离，支持分别加载。

## 安装依赖与构建

使用 Node.js 22 或更高版本，建议使用本工程验证过的 Node.js 24。

```bash
npm ci --ignore-scripts
npm run build
npm run check
npm run package
```

`build` 将可编辑代码重组到 `out/`；`check` 检查运行代码语法、入口文件以及
与原版插件的标识冲突；`package` 生成
`dist/luban-practice-1.2.4-local.vsix`。

`node_modules/`、`out/`、`dist/` 和 VSIX 安装包不提交，均可通过上述命令生成。

## 调试

1. 在 WSL 连接的 VS Code 中打开本工程目录。
2. 按 F5，选择“调试鲁班练习”，自动构建后打开开发宿主窗口。
3. 在开发宿主的活动栏中打开“鲁班练习”。
4. 后台断点放在 `out/extension.js`；前端通过开发宿主的
   `Developer: Toggle Developer Tools` 查看日志和调试。

当前构建没有生成 source map，不能把拆分源码中的断点自动映射到前端运行文件。
修改后停止并重新启动调试，以加载新的构建结果。

## 登录与地区

在粉笔官网登录并选择题库和地区，然后在 VS Code 用户设置中配置
`lubanPractice.cookie`。Cookie 只保存在本机设置中，不要写入源码或提交到仓库。

上海行测在官网选择“公务员行测 → 上海市考”。

## 代码入口

| 路径 | 用途 |
| --- | --- |
| `src/extension.js` | 插件命令、配置、消息处理及接口请求 |
| `src/views/modules/disguise.js` | 智能伪装、状态切换与退出 |
| `src/views/modules/app.js` | 前端主应用 |
| `src/views/modules/236-Home.js` | 题库首页和设置界面 |
| `src/views/modules.json` | 前端模块编号和文件映射 |
| `src/views/bootstrap.js` | Webpack 启动代码 |
| `src/views/vendor.js` | 保留编号的依赖及未单独拆分模块 |
| `src/shared/` | 答案、分类、材料和统计辅助逻辑 |
| `scripts/` | 提取、构建和检查工具 |
| `upstream/` | 原始 1.2.4 安装包快照，供核对来源和标识 |

日常修改 `src/`，不要直接修改构建生成的 `out/`。
`import-installed` 仅用于最初提取原版；现有工程包含 `src/` 时会拒绝覆盖。

## 来源与许可材料

原插件：`mrsavior.fenbi-tools` 1.2.4，显示名称为 `Fenbi Tools`。

原插件声明的仓库：[Mrxiiaobai/fenbi-tools](https://github.com/Mrxiiaobai/fenbi-tools)。

原安装包的 `package.json` 标注许可证为 `ISC`，附带的 `LICENSE.md` 为空文件。
仓库按原样保留该文件、原始安装包快照及 `main.js.LICENSE.txt` 中的第三方版权材料，
未将提取出的代码声明为自行原创。
