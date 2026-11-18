var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(extension_exports);
var vscode7 = __toESM(require("vscode"));
var { AgentController, plainHtml, enrichQuestionMaterials } = require("./agent/controller.js");

// src/utils/webview.ts
var vscode2 = __toESM(require("vscode"));
var path = __toESM(require("path"));

// src/utils/func.ts
var vscode = __toESM(require("vscode"));

// src/config/index.ts
var mainConfig = {
  jsPath: "out/views/main.js"
};

// src/utils/func.ts
var interval = () => {
  let timerId = null;
  function start(callback, delay) {
    stop();
    timerId = setInterval(callback, delay * 6e4);
    return timerId;
  }
  function stop() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }
  return { start, stop };
};
var runInterval = interval();
// 为鲁班练习创建题库页面的 HTML 容器。
var templateHtml = (scriptUri, agentScriptUri, agentStyleUri) => {
  return `<!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>鲁班练习</title>
      <link rel="stylesheet" href="${agentStyleUri}" />
    </head>
    <body>
      <div id="loading">\u9875\u9762\u521D\u59CB\u5316\u4E2D...</div>
      <div id="root"></div>
      <script src="${agentScriptUri}"></script>
      <script src="${scriptUri}"></script>
    </body>
  </html>`;
};

// src/utils/webview.ts
var Webview = class {
  getPanel() {
    if (!this.panel) {
      throw new Error("Webview has not been initialized");
    }
    return this.panel;
  }
  // 加载题库和内置助手资源，所有模型请求均由扩展宿主处理。
  setWebviewHtml(extensionPath) {
    const scriptPath = vscode2.Uri.file(
      path.join(extensionPath, mainConfig.jsPath)
    );
    const panel = this.getPanel();
    const scriptUri = panel.webview.asWebviewUri(scriptPath);
    const agentScriptUri = panel.webview.asWebviewUri(vscode2.Uri.file(path.join(extensionPath, "out/views/agent-ui.js")));
    const agentStyleUri = panel.webview.asWebviewUri(vscode2.Uri.file(path.join(extensionPath, "out/views/agent-ui.css")));
    panel.webview.html = templateHtml(scriptUri, agentScriptUri, agentStyleUri);
  }
  createSideInit(webviewView, extensionPath) {
    this.panel = webviewView;
    webviewView.webview.options = {
      enableScripts: true
    };
    this.setWebviewHtml(extensionPath);
    return webviewView;
  }
  onDidChangeVisibility(callback) {
    const panel = this.getPanel();
    if ("onDidChangeVisibility" in panel) {
      panel.onDidChangeVisibility(callback);
    }
  }
  onDidDispose(callback) {
    this.getPanel().onDidDispose(callback);
  }
  onDidReceiveMessage(callback) {
    return this.getPanel().webview.onDidReceiveMessage(callback);
  }
  createInit(extensionPath, webviewId, webviewTitle) {
    this.panel = vscode2.window.createWebviewPanel(
      webviewId,
      webviewTitle || "\u8BE6\u60C5",
      vscode2.ViewColumn.One,
      {
        enableScripts: true
      }
    );
    this.setWebviewHtml(extensionPath);
    return this.panel;
  }
  // 缓存已查看的题库解析，并仅向仍然打开的题库页面发送消息。
  postMessage({ command, data }) {
    const panel = this.panel;
    if (!panel)
      return;
    if (Array.isArray(data?.solutions)) {
      this.referenceCache ||= new Map();
      for (const solution of data.solutions) {
        const id = solution.globalId || solution.id;
        if (id && solution.solution) {
          this.referenceCache.set(String(id), {
            answer: parseChoiceIndexes(solution.correctAnswer?.choice, solution.type === 2).map((index) => String.fromCharCode(65 + index)).join("、"),
            solution: plainHtml(solution.solution)
          });
        }
      }
      while (this.referenceCache.size > 300)
        this.referenceCache.delete(this.referenceCache.keys().next().value);
    }
    // 跳过已经关闭或被替换的页面。
    setTimeout(() => {
      if (this.panel !== panel)
        return;
      panel.webview.postMessage({
        command,
        data
      });
    }, 50);
  }
};
var webview = new Webview();

// src/api/webviewHandle.ts
var vscode6 = __toESM(require("vscode"));
var import_crypto2 = require("crypto");

// src/shared/answerChoice.ts
var toNumber = (value) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : void 0;
};
var parseChoiceIndexes = (choice, multiple = false) => {
  if (Array.isArray(choice)) {
    return choice.map(toNumber).filter((value) => value !== void 0);
  }
  if (choice === void 0 || choice === null)
    return [];
  const normalized = String(choice).trim();
  if (!normalized)
    return [];
  if (/\D/.test(normalized)) {
    return normalized.split(/\D+/).filter(Boolean).map(Number).filter(Number.isFinite);
  }
  if (multiple && normalized.length > 1) {
    return normalized.split("").map(Number).filter(Number.isFinite);
  }
  const numberValue = Number(normalized);
  return Number.isFinite(numberValue) ? [numberValue] : [];
};
var normalizeChoice = (choice, multiple = false) => {
  return parseChoiceIndexes(choice, multiple).slice().sort((left, right) => left - right).join(",");
};

// src/shared/resultStats.ts
var getObjectiveResultStats = (solutions = []) => {
  let questionCount = 0;
  let correctCount = 0;
  solutions.forEach((item) => {
    const multiple = item.type === 2;
    const answer = normalizeChoice(item.userAnswer?.choice, multiple);
    const expected = normalizeChoice(item.correctAnswer?.choice, multiple);
    if (!answer || !expected)
      return;
    questionCount += 1;
    if (answer === expected)
      correctCount += 1;
  });
  return { questionCount, correctCount };
};

// src/utils/leaderboard.ts
var http = __toESM(require("http"));
var https2 = __toESM(require("https"));
var tls = __toESM(require("tls"));
var import_crypto = require("crypto");
var vscode4 = __toESM(require("vscode"));

// src/shared/category.ts
var categoryRouteConfigMap = {
  ["xingce" /* XINGCE */]: {
    routecs: "xingce" /* XINGCE */,
    courseSetPrefix: "xingce" /* XINGCE */,
    tikuPrefix: "xingce" /* XINGCE */,
    answerMode: "objective",
    apiCategory: "xingce" /* XINGCE */,
    historyCategoryId: 4
  },
  ["shenlun" /* SHENLUN */]: {
    routecs: "shenlun" /* SHENLUN */,
    courseSetPrefix: "shenlun" /* SHENLUN */,
    tikuPrefix: "shenlun" /* SHENLUN */,
    answerMode: "essay",
    apiCategory: "shenlun" /* SHENLUN */,
    historyCategoryId: 4
  },
  ["gazj" /* GAZJ */]: {
    routecs: "gazj" /* GAZJ */,
    courseSetPrefix: "gazj" /* GAZJ */,
    tikuPrefix: "gazj" /* GAZJ */,
    answerMode: "objective",
    apiCategory: "gazj" /* GAZJ */,
    historyCategoryId: 4
  },
  ["syzc" /* SYZC */]: {
    routecs: "syzc" /* SYZC */,
    courseSetPrefix: "sydw" /* SYDW */,
    tikuPrefix: "syzc" /* SYZC */,
    answerMode: "objective",
    apiCategory: "syzc" /* SYZC */,
    historyCategoryId: 4
  },
  ["sydw" /* SYDW */]: {
    routecs: "sydw" /* SYDW */,
    courseSetPrefix: "sydw" /* SYDW */,
    tikuPrefix: "sydw" /* SYDW */,
    answerMode: "objective",
    apiCategory: "sydw" /* SYDW */,
    historyCategoryId: 4
  },
  ["zhyynl" /* ZHYYNL */]: {
    routecs: "zhyynl" /* ZHYYNL */,
    courseSetPrefix: "zhyynl" /* ZHYYNL */,
    tikuPrefix: "zhyynl" /* ZHYYNL */,
    answerMode: "essay",
    apiCategory: "sydw" /* SYDW */,
    historyCategoryId: 4
  },
  ["sydwms" /* SYDWMS */]: {
    routecs: "sydwms" /* SYDWMS */,
    courseSetPrefix: "sydwms" /* SYDWMS */,
    tikuPrefix: "sydwms" /* SYDWMS */,
    answerMode: "essay",
    apiCategory: "sydwms" /* SYDWMS */,
    historyCategoryId: 4
  },
  ["gwyms" /* GWYMS */]: {
    routecs: "gwyms" /* GWYMS */,
    courseSetPrefix: "gwyms" /* GWYMS */,
    tikuPrefix: "gwyms" /* GWYMS */,
    answerMode: "essay",
    apiCategory: "gwyms" /* GWYMS */,
    historyCategoryId: 4
  }
};
var getCategoryRouteConfig = (category) => {
  return categoryRouteConfigMap[category || "xingce" /* XINGCE */] || categoryRouteConfigMap["xingce" /* XINGCE */];
};
var isEssayCategory = (category) => {
  return getCategoryRouteConfig(category).answerMode === "essay";
};
var isCareerCategory = (category) => {
  return category === "syzc" /* SYZC */ || category === "sydw" /* SYDW */ || category === "zhyynl" /* ZHYYNL */ || category === "sydwms" /* SYDWMS */;
};
var isInterviewCategory = (category) => {
  return category === "sydwms" /* SYDWMS */ || category === "gwyms" /* GWYMS */;
};
var getFavoriteQuizCourseSetPrefix = (category) => {
  return isCareerCategory(category) ? "sydw" /* SYDW */ : "xingce" /* XINGCE */;
};

// src/shared/materials.ts
var getQuestionCardNodes = (card) => {
  return (card?.children || []).flatMap((chapter) => chapter.children || []);
};
var buildMaterialsForQuestions = (cards, materials = []) => {
  const materialContentMap = new Map(
    materials.map((material) => [material.globalId, material.content])
  );
  const usedMaterialKeys = /* @__PURE__ */ new Set();
  const materialsForRender = [];
  const questions = getQuestionCardNodes(cards);
  questions.forEach((question, index) => {
    const keys = question.materialKeys;
    if (!keys || keys.length === 0) {
      materialsForRender[index] = null;
      return;
    }
    const key = keys[0];
    if (!usedMaterialKeys.has(key)) {
      usedMaterialKeys.add(key);
      materialsForRender[index] = {
        globalId: key,
        content: materialContentMap.get(key) || null
      };
      return;
    }
    materialsForRender[index] = null;
  });
  return materialsForRender;
};

// src/utils/request.ts
var vscode3 = __toESM(require("vscode"));
var https = __toESM(require("https"));
var FenbiRequestError = class extends Error {
  constructor(message, code = "REQUEST_ERROR", statusCode) {
    super(message);
    this.name = "FenbiRequestError";
    this.code = code;
    this.statusCode = statusCode;
  }
};
var parseResponseBody = (data) => {
  if (!data)
    return null;
  try {
    return JSON.parse(data);
  } catch (_error) {
    return data;
  }
};
// 使用鲁班练习的独立登录配置请求粉笔接口。
var ajax = (methods, url, params, headers) => {
  const parsedUrl = new URL(url);
  const config = vscode3.workspace.getConfiguration("lubanPractice");
  if (!config.cookie) {
    const error = new FenbiRequestError("\u672A\u8BBE\u7F6E cookie", "MISSING_COOKIE");
    return Promise.reject(error);
  }
  const options = {
    method: "GET",
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || 443,
    // 如果 URL 中没有指定端口号，默认为 443
    path: parsedUrl.pathname + parsedUrl.search,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: config.cookie,
      ...headers
    }
  };
  if (methods)
    options.method = methods == "FORM" ? "POST" : methods;
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const result = parseResponseBody(data);
        const statusCode = res.statusCode || 0;
        if (statusCode < 200 || statusCode >= 300) {
          const error = new FenbiRequestError(
            `\u8BF7\u6C42\u5931\u8D25\uFF1AHTTP ${statusCode}`,
            "HTTP_ERROR",
            statusCode
          );
          reject(error);
          return;
        }
        resolve(result);
      });
    });
    req.setTimeout(15e3, () => {
      req.destroy(new FenbiRequestError("\u8BF7\u6C42\u8D85\u65F6", "TIMEOUT"));
    });
    req.on("error", (error) => {
      const requestError = error instanceof FenbiRequestError ? error : new FenbiRequestError(error.message, "NETWORK_ERROR");
      reject(requestError);
    });
    if (methods === "POST" || methods === "PUT") {
      const body = JSON.stringify(params);
      req.setHeader("Content-Length", Buffer.byteLength(body));
      req.write(body);
    }
    if (methods === "FORM") {
      const body = toUrlEncoded(params);
      req.setHeader("Content-Length", Buffer.byteLength(body));
      req.write(body);
    }
    req.end();
  });
};
var toUrlEncoded = (obj) => {
  if (!obj || typeof obj !== "object")
    return "";
  return Object.keys(obj).map((key) => {
    const value = obj[key];
    return encodeURIComponent(key) + "=" + encodeURIComponent(String(value));
  }).join("&");
};
var request_default = ajax;

// src/utils/service.ts
var WEB_API_QUERY = "app=web&kav=100&av=121&hav=100&version=3.0.0.0";
var CURRENT_WEB_API_QUERY = "app=web&kav=125&av=127&hav=125&version=3.0.0.0";
var SYDWMS_API_QUERY = "kav=100&av=100&hav=100&app=web";
var getExercisesId = async (category = "xingce", params) => {
  const userInfo = await getUserQuestionInfo();
  const { questionCount, yearScope, correctRatioLow, correctRatioHigh } = userInfo.data || {};
  const url = `https://tiku.fenbi.com/api/${category || "xingce"}/exercises?${WEB_API_QUERY}`;
  let limit = questionCount || 15;
  if (isEssayCategory(category)) {
    limit = 1;
  }
  const res = await request_default(
    "FORM",
    url,
    {
      type: 3,
      keypointId: params.keypointId,
      limit,
      exerciseTimeMode: 2,
      yearScope,
      correctRatioLow,
      correctRatioHigh
    },
    {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  );
  return res;
};
var getQuickExercisesId = async (category = "xingce") => {
  const url = `https://tiku.fenbi.com/api/${category || "xingce"}/exercises?${WEB_API_QUERY}`;
  const res = await request_default(
    "FORM",
    url,
    {
      type: 3,
      exerciseTimeMode: 2
    },
    {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  );
  return res;
};
var getSmartExercisesId = async (category = "xingce", params = {}) => {
  const url = `https://tiku.fenbi.com/api/${category || "xingce"}/exercises?${CURRENT_WEB_API_QUERY}`;
  const res = await request_default(
    "FORM",
    url,
    {
      type: 2,
      exerciseTimeMode: 2,
      yearScope: params.yearScope ?? 0
    },
    {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  );
  return res;
};
var getRealExercisesId = async (category = "xingce", paperId) => {
  const url = `https://tiku.fenbi.com/api/${category || "xingce"}/exercises?${WEB_API_QUERY}`;
  return request_default(
    "FORM",
    url,
    {
      type: 1,
      paperId,
      exerciseTimeMode: 2
    },
    {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  );
};
var getPaperLabels = async (category = "xingce") => {
  const baseUrl = `https://tiku.fenbi.com/api/${category || "xingce"}`;
  try {
    return await request_default(
      "GET",
      `${baseUrl}/subLabels?${CURRENT_WEB_API_QUERY}`
    );
  } catch (_error) {
    return request_default(
      "GET",
      `${baseUrl}/subLabels/v2?${CURRENT_WEB_API_QUERY}`
    );
  }
};
var getPastPapers = async (category = "xingce", params = {}) => {
  const page = Math.max(0, Math.floor(Number(params.page) || 0));
  const pageSize = Math.max(
    1,
    Math.min(50, Math.floor(Number(params.pageSize) || 12))
  );
  const query = new URLSearchParams({
    toPage: String(page),
    pageSize: String(pageSize)
  });
  if (params.labelId !== void 0 && params.labelId !== "") {
    query.set("labelId", String(params.labelId));
  }
  const baseUrl = `https://tiku.fenbi.com/api/${category || "xingce"}`;
  try {
    return await request_default(
      "GET",
      `${baseUrl}/papers/?${query.toString()}`
    );
  } catch (_error) {
    return request_default(
      "GET",
      `${baseUrl}/papers/v2?${query.toString()}`
    );
  }
};
var getExercisesUrl = async ({
  category = "xingce",
  combineKey
}) => {
  const url = `https://tiku.fenbi.com/combine/exercise/getExercise?format=html&key=${combineKey}&routecs=${category}&kav=121&av=121&hav=121&app=web`;
  const res = await request_default("GET", url);
  return res;
};
// 加载题目并补齐每题材料上下文，页面仍沿用原有的材料去重显示。
var getQuestion = async (category, url, _type = 1) => {
  const _url = `${url}&routecs=${category}&type=1&kav=121&av=121&hav=121&app=web`;
  const res = await request_default("GET", _url);
  return {
    ...enrichQuestionMaterials(res),
    materials: buildMaterialsForQuestions(res.card, res.materials)
  };
};
var getCategories = async (category) => {
  let url = `https://tiku.fenbi.com/api/${category}/categories?&filter=keypoint&app=web&kav=100&av=121&hav=100&version=3.0.0.0`;
  if (category === "shenlun") {
    url = "https://tiku.fenbi.com/api/shenlun/pdpg/categories?app=web&kav=100&av=121&hav=100&version=3.0.0.0";
  }
  if (category === "zhyynl") {
    url = "https://tiku.fenbi.com/api/zhyynl/etRuleQuestion/categories?app=web&kav=100&av=121&hav=100&version=3.0.0.0";
  }
  if (isInterviewCategory(category)) {
    url = `https://tiku.fenbi.com/api/${category}/categories?&filter=giant&app=web&kav=125&av=127&hav=125&version=3.0.0.0`;
  }
  const res = await request_default("GET", url);
  return res;
};
var getErrorKeypointTree = async (category = "xingce" /* XINGCE */) => {
  const url = `https://tiku.fenbi.com/api/${category}/errors/keypoint-tree?timeRange=0&order=desc&${CURRENT_WEB_API_QUERY}`;
  const res = await request_default("GET", url);
  return res;
};
var getErrorQuestionIds = async (category = "xingce" /* XINGCE */, params) => {
  const url = `https://tiku.fenbi.com/api/${category}/questionIds?type=errors&categoryId=${params.categoryId}&offset=${params.offset}&limit=${params.limit}&order=desc&timeRange=0&${CURRENT_WEB_API_QUERY}`;
  const res = await request_default("GET", url);
  return res;
};
var getErrorSolutions = async (category = "xingce" /* XINGCE */, questionIds) => {
  const ids = questionIds.join(",");
  const url = `https://tiku.fenbi.com/api/${category}/universal/auth/solutions?type=1&questionIds=${ids}&${CURRENT_WEB_API_QUERY}`;
  const res = await request_default("GET", url);
  return res;
};
var removeErrorQuestion = async (category = "xingce" /* XINGCE */, questionId) => {
  const url = `https://tiku.fenbi.com/api/${category}/errors/${questionId}?${CURRENT_WEB_API_QUERY}`;
  const res = await request_default("DELETE", url);
  console.log("removeErrorQuestion res:", res);
  return res;
};
var getSydwmsGiants = async (keypointId, category = "sydwms" /* SYDWMS */) => {
  const url = `https://tiku.fenbi.com/api/${category}/giants?keypointId=${keypointId}&${SYDWMS_API_QUERY}`;
  const res = await request_default("GET", url);
  return res;
};
var getSydwmsSolutions = async (questionIds, category = "sydwms" /* SYDWMS */) => {
  const ids = questionIds.join(",");
  const url = `https://tiku.fenbi.com/api/${category}/universal/auth/solutions?type=9&questionIds=${ids}&${SYDWMS_API_QUERY}`;
  const res = await request_default("GET", url);
  return res;
};
var getSydwmsEpisodes = async (questionIds, category = "sydwms" /* SYDWMS */) => {
  const ids = questionIds.join(",");
  const url = `https://ke.fenbi.com/api/gwy/v3/episodes/tiku_episodes_with_multi_type?tiku_ids=${ids}&tiku_prefix=${category}&tiku_type=5&${SYDWMS_API_QUERY}`;
  const res = await request_default("GET", url);
  return res;
};
var getSydwmsEpisodeMeta = async (episodeId) => {
  const url = `https://ke.fenbi.com/api/gwy/v3/episodes/${episodeId}/mediafile/meta?content_id=0&biz_type=100&${SYDWMS_API_QUERY}`;
  const res = await request_default("GET", url);
  return res;
};
var getSydwmsNotes = async (questionIds, category = "sydwms" /* SYDWMS */) => {
  const ids = questionIds.join(",");
  const url = `https://tiku.fenbi.com/api/${category}/notes?questionIds=${ids}&${SYDWMS_API_QUERY}`;
  const res = await request_default("GET", url);
  return res;
};
var getSolution = async (category = "xingce", combineKey) => {
  const url = `https://tiku.fenbi.com/combine/exercise/getSolution?format=html&key=${combineKey}&routecs=${category}&kav=121&av=121&hav=121&app=web`;
  const res = await request_default("GET", url);
  return res;
};
// 加载已可查看的解析，并保留每题实际关联的材料供助手使用。
var getSolutionQuestion = async (url, category = "xingce") => {
  const _url = `${url}&routecs=${category}&type=1&kav=121&av=121&hav=121&app=web`;
  const res = await request_default("GET", _url);
  return {
    ...enrichQuestionMaterials(res),
    materials: buildMaterialsForQuestions(res.card, res.materials || [])
  };
};
var getCache = async (catrgory = "xingce") => {
  const url = `https://tiku.fenbi.com/api/${catrgory}/category-exercises-unfinished?noCacheTag=${Math.round(
    1e3 * Math.random()
  )}&app=web&kav=100&av=121&hav=100&version=3.0.0.0`;
  const res = await request_default("GET", url);
  return res;
};
var studyTime = async (params) => {
  const url = `
https://tiku.fenbi.com/activity/report/studyTime?app=web&kav=121&av=121&hav=121&version=3.0.0.0`;
  const res = await request_default("POST", url, [params]);
  return res;
};
var getHistory = async ({
  category = "xingce",
  count = 15,
  categoryId
}) => {
  const url = `https://tiku.fenbi.com/api/${category}/category-exercises?categoryId=${categoryId}&cursor=0&count=${count}&noCacheTag=${Math.round(
    1e3 * Math.random()
  )}&app=web&kav=100&av=121&hav=100&version=3.0.0.0`;
  const res = await request_default("GET", url);
  return res;
};
var incr = async (category = "xingce", combineKey, params) => {
  const url = `https://tiku.fenbi.com/combine/exercise/incrUpdate?key=${combineKey}&routecs=${category}&kav=121&av=121&hav=121&app=web`;
  const res = await request_default("POST", url, [params]);
  return res;
};
var submit = async (category = "xingce", combineKey) => {
  const url = `https://tiku.fenbi.com/combine/exercise/submit?key=${combineKey}&routecs=${category}&kav=121&av=121&hav=121&app=web`;
  const res = await request_default("POST", url, {});
  return res;
};
var getUserInfo = async () => {
  const url = `https://login.fenbi.com/api/users/info?app=web&kav=100&av=121&hav=100&version=3.0.0.0`;
  const res = await request_default("GET", url);
  return res;
};
var changeQuestionCount = async (params) => {
  const quesitonInfo = await getUserQuestionInfo();
  const { sheetType, yearScope, correctRatioLow, correctRatioHigh } = quesitonInfo.data || {};
  const url = `https://tiku.fenbi.com/activity/userquiz/updateUserQuestionInfo?sheetType=${sheetType}&questionCount=${params.questionCount}&yearScope=${yearScope}&correctRatioLow=${correctRatioLow}&correctRatioHigh=${correctRatioHigh}&app=web&kav=100&av=121&hav=100&version=3.0.0.0`;
  try {
    const res = await request_default("POST", url, {});
    return res;
  } catch (error) {
    throw new Error("Error updating question count");
  }
};
var getUserQuestionInfo = async () => {
  const url = `https://tiku.fenbi.com/activity/userquiz/getUserQuestionInfo?${WEB_API_QUERY}`;
  const res = await request_default("GET", url);
  return res;
};
var getUserTemplateInfo = async () => {
  const url = `https://tiku.fenbi.com/activity/userquiz/getUserTemplateInfo?${CURRENT_WEB_API_QUERY}`;
  const res = await request_default("GET", url);
  return res;
};
var updateUserTemplateInfo = async (params) => {
  const url = `https://tiku.fenbi.com/activity/userquiz/updateUserTemplateInfo?yearScope=${params.yearScope}&${CURRENT_WEB_API_QUERY}`;
  const res = await request_default("POST", url, {});
  return res;
};
var getCurrent = async () => {
  const url = `https://login.fenbi.com/api/users/current?kav=121&av=121&hav=121&app=web`;
  const res = await request_default("GET", url);
  return res;
};
var getCourseSetFavoriteQuiz = async (params) => {
  const url = `https://tiku.fenbi.com/activity/userquiz/getCourseSetFavoriteQuiz?courseSetPrefix=${params.courseSetPrefix}&noCacheTag=${Math.round(
    1e3 * Math.random()
  )}&app=web&kav=125&av=127&hav=125&version=3.0.0.0`;
  const res = await request_default("GET", url);
  return res;
};
var courseSetChange = async (params) => {
  const url = `https://tiku.fenbi.com/activity/userquiz/courseSetChange?courseSetPrefix=${params.category}&app=web&kav=100&av=121&hav=100&version=3.0.0.0`;
  const res = await request_default("PUT", url, {});
  return res;
};

// src/utils/leaderboard.ts
var DEFAULT_API_URL = "https://qipai.work/fenbi-api";
var hashLeaderboardId = (value) => {
  return (0, import_crypto.createHash)("sha256").update(value).digest("hex");
};
var parseLeaderboardUser = (response) => {
  const profile = response.data || response;
  const id = profile.id ?? profile.userId;
  const nickname = profile.nickname?.trim();
  if (id === void 0 || id === null || String(id) === "" || !nickname) {
    throw new Error("\u65E0\u6CD5\u83B7\u53D6\u7C89\u7B14\u7528\u6237 ID \u6216\u6635\u79F0\uFF0C\u8BF7\u68C0\u67E5 Cookie \u540E\u91CD\u8BD5");
  }
  return { userId: hashLeaderboardId(`fenbi:${id}`), nickname };
};
// 从鲁班练习设置读取排行榜服务地址并发送请求。
var request2 = (path2, body) => {
  const configured = vscode4.workspace.getConfiguration("lubanPractice").get("leaderboardApiUrl", DEFAULT_API_URL).trim();
  const base = (configured || DEFAULT_API_URL).replace(/\/+$/, "");
  const url = new URL(`${base}${path2}`);
  if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))) {
    return Promise.reject(new Error("\u6392\u884C\u699C\u5730\u5740\u5FC5\u987B\u4F7F\u7528 HTTPS\uFF0C\u672C\u5730\u8054\u8C03\u53EF\u4F7F\u7528 HTTP"));
  }
  const payload = body === void 0 ? void 0 : JSON.stringify(body);
  const send = (withoutSni = false) => new Promise((resolve, reject) => {
    let tlsEstablished = false;
    const req = (url.protocol === "https:" ? https2 : http).request(url, {
      method: payload === void 0 ? "GET" : "POST",
      ...withoutSni ? {
        servername: "",
        checkServerIdentity: (_hostname, certificate) => tls.checkServerIdentity(url.hostname, certificate)
      } : {},
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        ...payload === void 0 ? {} : { "Content-Length": Buffer.byteLength(payload) }
      }
    }, (res) => {
      let data = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        data += chunk;
        if (data.length > 1024 * 1024)
          req.destroy(new Error("\u6392\u884C\u699C\u54CD\u5E94\u8FC7\u5927"));
      });
      res.on("error", reject);
      res.on("end", () => {
        try {
          const result = JSON.parse(data);
          if (res.statusCode !== 200 || result.code !== 0) {
            reject(new Error(result.message || `\u6392\u884C\u699C\u8BF7\u6C42\u5931\u8D25\uFF1AHTTP ${res.statusCode}`));
            return;
          }
          resolve(result.data);
        } catch (_error) {
          reject(new Error("\u6392\u884C\u699C\u670D\u52A1\u54CD\u5E94\u5F02\u5E38\uFF0C\u8BF7\u68C0\u67E5\u670D\u52A1\u5730\u5740"));
        }
      });
    });
    req.on("socket", (socket) => {
      if (url.protocol !== "https:")
        return;
      const secureSocket = socket;
      tlsEstablished = secureSocket.authorized;
      secureSocket.once("secureConnect", () => {
        tlsEstablished = true;
      });
    });
    req.setTimeout(1e4, () => req.destroy(new Error("\u6392\u884C\u699C\u8BF7\u6C42\u8D85\u65F6\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5")));
    req.on("error", (error) => {
      if (!withoutSni && !tlsEstablished && url.protocol === "https:" && url.hostname === "qipai.work" && error.code === "ECONNRESET") {
        send(true).then(resolve, reject);
        return;
      }
      if (url.protocol === "https:" && ["ECONNRESET", "EPROTO"].includes(error.code)) {
        reject(new Error(`\u6392\u884C\u699C HTTPS \u8FDE\u63A5\u88AB\u4E2D\u65AD\uFF08${url.origin}\uFF09\uFF0C\u8BF7\u68C0\u67E5\u670D\u52A1\u662F\u5426\u5DF2\u90E8\u7F72\u53CA HTTPS \u914D\u7F6E`));
        return;
      }
      if (error.code === "ECONNREFUSED") {
        reject(new Error(`\u65E0\u6CD5\u8FDE\u63A5\u6392\u884C\u699C\u670D\u52A1 ${url.origin}\uFF0C\u8BF7\u786E\u8BA4\u670D\u52A1\u5DF2\u542F\u52A8\u53CA\u5730\u5740\u8BBE\u7F6E\u6B63\u786E`));
        return;
      }
      reject(new Error(`\u6392\u884C\u699C\u670D\u52A1 ${url.origin} \u8BF7\u6C42\u5931\u8D25\uFF1A${error.message}`));
    });
    if (payload !== void 0)
      req.write(payload);
    req.end();
  });
  return send();
};
var fetchLeaderboard = async (sort = "quantity", page = 1) => {
  const query = new URLSearchParams({ sort, page: String(page), pageSize: "50" });
  try {
    const user = parseLeaderboardUser(await getUserInfo());
    query.set("userId", user.userId);
  } catch (_error) {
  }
  return request2(`/leaderboard?${query.toString()}`);
};
var uploadLeaderboardResult = async (result) => {
  const user = parseLeaderboardUser(await getUserInfo());
  return request2("/results", {
    ...user,
    ...result,
    winRate: result.correctCount / result.questionCount
  });
};

// src/utils/hlsProxy.ts
var http2 = __toESM(require("http"));
var https3 = __toESM(require("https"));
var crypto = __toESM(require("crypto"));
var vscode5 = __toESM(require("vscode"));
var ALLOWED_HOSTS = /* @__PURE__ */ new Set([
  "live.fenbi.com",
  "hlsfiletxv5.fbstatic.cn",
  "vod.fbstatic.cn"
]);
var serverPromise;
var segmentCryptoInfoByUrl = /* @__PURE__ */ new Map();
var keyCacheByUrl = /* @__PURE__ */ new Map();
var debugLog = (message, data) => {
  if (data === void 0) {
    console.log(`[FenbiTools:HLSProxy] ${message}`);
    return;
  }
  console.log(`[FenbiTools:HLSProxy] ${message}`, data);
};
var isAllowedTarget = (url) => {
  return url.protocol === "https:" && ALLOWED_HOSTS.has(url.hostname);
};
// 仅为粉笔域名附加鲁班练习设置中的 Cookie。
var getCookieHeader = (url) => {
  if (!url.hostname.endsWith(".fenbi.com"))
    return void 0;
  const config = vscode5.workspace.getConfiguration("lubanPractice");
  return typeof config.cookie === "string" && config.cookie ? config.cookie : void 0;
};
var createProxyUrl = (port, targetUrl, decryptMode = "server") => {
  const params = new URLSearchParams({ url: targetUrl });
  if (decryptMode !== "server") {
    params.set("decrypt", decryptMode);
  }
  return `http://127.0.0.1:${port}/hls-proxy?${params.toString()}`;
};
var createPlayerUrl = (port, targetUrl) => {
  return `http://127.0.0.1:${port}/hls-player?url=${encodeURIComponent(
    targetUrl
  )}`;
};
var getTargetKind = (targetUrl) => {
  if (/\/key\?/i.test(targetUrl))
    return "key";
  if (/\.ts(\?|$)/i.test(targetUrl))
    return "segment";
  if (/m3u8/i.test(targetUrl))
    return "playlist";
  return "resource";
};
var createPlayerHtml = (originalUrl, proxyUrl, browserDecryptProxyUrl) => {
  const originalJson = JSON.stringify(originalUrl);
  const proxyJson = JSON.stringify(proxyUrl);
  const browserDecryptProxyJson = JSON.stringify(browserDecryptProxyUrl);
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>\u793A\u8303\u4F5C\u7B54</title>
  <style>
    html, body { margin: 0; height: 100%; background: #101114; color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    main { box-sizing: border-box; min-height: 100%; padding: 24px; display: flex; flex-direction: column; gap: 12px; }
    video { width: 100%; max-height: calc(100vh - 120px); background: #000; border-radius: 8px; }
    pre { white-space: pre-wrap; word-break: break-all; color: #c9c9c9; font-size: 12px; }
  </style>
</head>
<body>
  <main>
    <video id="video" controls autoplay playsinline></video>
    <pre id="status">loading...</pre>
  </main>
  <script src="https://web.sdk.qcloud.com/player/tcplayer/release/v4.9.1/libs/hls.min.1.1.7.js"></script>
  <script>
    const sources = [
      { name: "proxy-browser-decrypt", url: ${browserDecryptProxyJson} },
      { name: "proxy-server-decrypt", url: ${proxyJson} },
      { name: "original", url: ${originalJson} }
    ];
    const video = document.getElementById("video");
    const status = document.getElementById("status");
    let hls = null;
    let sourceIndex = 0;
    let stopped = false;
    let changingSource = false;
    const hlsConfig = {
      enableWorker: false,
      manifestLoadingMaxRetry: 0,
      levelLoadingMaxRetry: 0,
      fragLoadingMaxRetry: 0,
      keyLoadingMaxRetry: 0,
      appendErrorMaxRetry: 0
    };
    const stringify = (value) => {
      if (typeof value === "string") return value;
      const seen = new WeakSet();
      try {
        return JSON.stringify(value, (key, item) => {
          if (item instanceof Error || item instanceof DOMException) {
            return {
              name: item.name,
              message: item.message,
              code: item.code,
              stack: item.stack
            };
          }
          if (item && typeof item === "object") {
            if (seen.has(item)) return "[Circular]";
            seen.add(item);
          }
          return item;
        }, 2);
      } catch (error) {
        return String(value);
      }
    };
    const log = (...args) => {
      console.log("[FenbiTools:ExternalPlayer]", ...args);
      status.textContent = args.map(stringify).join("\\n");
    };

    const stopCurrent = () => {
      changingSource = true;
      if (hls) {
        hls.destroy();
        hls = null;
      }
      video.removeAttribute("src");
      video.load();
      setTimeout(() => {
        changingSource = false;
      }, 0);
    };

    const tryNextSource = (reason) => {
      if (stopped) return;
      if (sourceIndex >= sources.length - 1) {
        stopped = true;
        log("all sources failed", { reason, sources });
        stopCurrent();
        return;
      }
      sourceIndex += 1;
      log("try fallback source", { reason, source: sources[sourceIndex] });
      playCurrentSource();
    };

    const playCurrentSource = () => {
      stopCurrent();
      const activeSourceIndex = sourceIndex;
      const source = sources[activeSourceIndex];
      log("play source", source);

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = source.url;
        return;
      }
      if (window.Hls && window.Hls.isSupported()) {
        hls = new Hls(hlsConfig);
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (stopped || sourceIndex !== activeSourceIndex) return;
          log("hls error", { source, data });
          if (data && (data.fatal || data.details === "bufferAppendError" || data.details === "fragParsingError")) {
            tryNextSource(data.details || data.type || "hls error");
          }
        });
        hls.loadSource(source.url);
        hls.attachMedia(video);
        return;
      }
      stopped = true;
      log("HLS is not supported in this browser", source);
    };

    video.addEventListener("error", () => {
      if (stopped || changingSource) return;
      const error = { code: video.error && video.error.code, message: video.error && video.error.message };
      log("video error", { source: sources[sourceIndex], error });
      tryNextSource(error.message || "video error");
    });

    playCurrentSource();
  </script>
</body>
</html>`;
};
var getBodyPreview = (body) => {
  const firstBytes = body.subarray(0, 32);
  const text = body.toString("utf8", 0, Math.min(body.length, 180));
  return {
    bytes: body.length,
    firstBytesHex: firstBytes.toString("hex"),
    startsWithTsSyncByte: body[0] === 71,
    tsSync: getTsSyncInfo(body),
    textPreview: /[\u0000-\u0008\u000e-\u001f]/.test(text) ? "" : text
  };
};
var getTsSyncInfo = (body) => {
  let best = {
    offset: -1,
    matches: 0,
    packets: 0
  };
  for (let offset = 0; offset < Math.min(188, body.length); offset += 1) {
    const packets = Math.floor((body.length - offset) / 188);
    if (packets <= 0)
      continue;
    let matches = 0;
    for (let packetIndex = 0; packetIndex < packets; packetIndex += 1) {
      if (body[offset + packetIndex * 188] === 71) {
        matches += 1;
      }
    }
    if (matches > best.matches) {
      best = { offset, matches, packets };
    }
  }
  return {
    offset: best.offset,
    matches: best.matches,
    packets: best.packets,
    likelyTs: best.offset >= 0 && best.matches >= Math.min(3, best.packets) && best.matches / Math.max(best.packets, 1) > 0.9
  };
};
var parseM3u8Attributes = (line) => {
  const attrs = {};
  line.replace(/([A-Z0-9-]+)=("[^"]*"|[^,]*)/gi, (_match, key, rawValue) => {
    attrs[key] = String(rawValue).replace(/^"|"$/g, "");
    return "";
  });
  return attrs;
};
var parseIv = (value) => {
  if (!value)
    return void 0;
  const normalized = value.replace(/^0x/i, "").padStart(32, "0").slice(-32);
  return Buffer.from(normalized, "hex");
};
var createMediaSequenceIv = (sequence) => {
  const iv = Buffer.alloc(16);
  const normalizedSequence = Number.isFinite(sequence) && sequence > 0 ? Math.floor(sequence) : 0;
  const high = Math.floor(normalizedSequence / 4294967296);
  const low = normalizedSequence >>> 0;
  iv.writeUInt32BE(high, 8);
  iv.writeUInt32BE(low, 12);
  return iv;
};
var decryptAes128Cbc = (body, key, iv) => {
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  return Buffer.concat([decipher.update(body), decipher.final()]);
};
var fetchTarget = (targetUrl, headers = {}, redirectCount = 0) => {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(targetUrl);
    if (!isAllowedTarget(parsedUrl)) {
      debugLog("blocked unsupported target", targetUrl);
      reject(new Error("Unsupported HLS target"));
      return;
    }
    const requestHeaders = {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      Accept: "*/*",
      "Accept-Encoding": "identity",
      Referer: "https://spa.fenbi.com/",
      Origin: "https://spa.fenbi.com"
    };
    const cookie = getCookieHeader(parsedUrl);
    if (cookie)
      requestHeaders.Cookie = cookie;
    if (typeof headers.range === "string" && !segmentCryptoInfoByUrl.has(targetUrl)) {
      requestHeaders.Range = headers.range;
    }
    debugLog("fetch target", {
      targetUrl,
      range: headers.range || "",
      forwardsRange: Boolean(requestHeaders.Range),
      redirectCount,
      hasCookie: Boolean(cookie)
    });
    const req = https3.request(
      {
        method: "GET",
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || 443,
        path: parsedUrl.pathname + parsedUrl.search,
        headers: requestHeaders
      },
      (res) => {
        const statusCode = res.statusCode || 0;
        const location = res.headers.location;
        debugLog("target response", {
          targetUrl,
          statusCode,
          contentType: res.headers["content-type"],
          contentLength: res.headers["content-length"],
          location
        });
        if ([301, 302, 303, 307, 308].includes(statusCode) && location && redirectCount < 5) {
          const redirectUrl = new URL(location, parsedUrl).toString();
          debugLog("follow redirect", { targetUrl, redirectUrl });
          res.resume();
          fetchTarget(redirectUrl, headers, redirectCount + 1).then(resolve).catch(reject);
          return;
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          const body = Buffer.concat(chunks);
          debugLog("target body received", {
            targetUrl,
            kind: getTargetKind(targetUrl),
            statusCode,
            ...getBodyPreview(body)
          });
          resolve({
            statusCode,
            headers: res.headers,
            body,
            finalUrl: targetUrl
          });
        });
      }
    );
    req.setTimeout(2e4, () => {
      debugLog("target timeout", targetUrl);
      req.destroy(new Error("HLS proxy request timeout"));
    });
    req.on("error", (error) => {
      debugLog("target request error", {
        targetUrl,
        message: error.message
      });
      reject(error);
    });
    req.end();
  });
};
var shouldRewriteAsM3u8 = (targetUrl, headers, body) => {
  const contentType = String(headers["content-type"] || "");
  return /m3u8/i.test(targetUrl) || /mpegurl|application\/vnd\.apple/i.test(contentType) || body.toString("utf8", 0, 16).startsWith("#EXTM3U");
};
var rewriteM3u8UriAttributes = (line, baseUrl, port, decryptMode) => {
  return line.replace(/URI="([^"]+)"/g, (_match, rawUrl) => {
    const absoluteUrl = new URL(rawUrl, baseUrl).toString();
    return `URI="${createProxyUrl(port, absoluteUrl, decryptMode)}"`;
  });
};
var rewriteM3u8 = (content, targetUrl, port, decryptMode) => {
  const baseUrl = new URL(targetUrl);
  let currentCryptoInfo;
  let mediaSequence = 0;
  let nextSegmentSequence = 0;
  const shouldDecryptInProxy = decryptMode === "server";
  return content.split(/\r?\n/).map((line) => {
    if (!line.trim())
      return line;
    if (line.startsWith("#")) {
      if (line.startsWith("#EXT-X-MEDIA-SEQUENCE")) {
        const parsedMediaSequence = Number(line.split(":")[1]);
        if (Number.isFinite(parsedMediaSequence)) {
          mediaSequence = parsedMediaSequence;
          nextSegmentSequence = parsedMediaSequence;
          debugLog("playlist media sequence detected", {
            targetUrl,
            mediaSequence
          });
        }
        return line;
      }
      if (line.startsWith("#EXT-X-KEY")) {
        const attrs = parseM3u8Attributes(line);
        if (attrs.METHOD === "AES-128" && attrs.URI) {
          const keyUrl = new URL(attrs.URI, baseUrl).toString();
          currentCryptoInfo = { keyUrl, iv: parseIv(attrs.IV) };
          debugLog("playlist key detected", {
            targetUrl,
            decryptMode,
            keyUrl,
            iv: currentCryptoInfo.iv?.toString("hex") || "",
            hasExplicitIv: Boolean(currentCryptoInfo.iv)
          });
          if (shouldDecryptInProxy)
            return "";
          return rewriteM3u8UriAttributes(line, baseUrl, port, decryptMode);
        }
        if (attrs.METHOD === "NONE") {
          currentCryptoInfo = void 0;
          return shouldDecryptInProxy ? "" : line;
        }
      }
      return rewriteM3u8UriAttributes(line, baseUrl, port, decryptMode);
    }
    const absoluteUrl = new URL(line, baseUrl).toString();
    if (shouldDecryptInProxy && currentCryptoInfo) {
      const iv = currentCryptoInfo.iv || createMediaSequenceIv(nextSegmentSequence);
      segmentCryptoInfoByUrl.set(absoluteUrl, {
        keyUrl: currentCryptoInfo.keyUrl,
        iv
      });
      debugLog("segment registered for proxy decrypt", {
        segmentUrl: absoluteUrl,
        keyUrl: currentCryptoInfo.keyUrl,
        sequence: nextSegmentSequence,
        iv: iv.toString("hex"),
        explicitIv: Boolean(currentCryptoInfo.iv)
      });
    }
    nextSegmentSequence += 1;
    return createProxyUrl(port, absoluteUrl, decryptMode);
  }).join("\n");
};
var getHlsKey = async (keyUrl, headers) => {
  const cachedKey = keyCacheByUrl.get(keyUrl);
  if (cachedKey) {
    debugLog("key cache hit", {
      keyUrl,
      bytes: cachedKey.length,
      firstBytesHex: cachedKey.subarray(0, 8).toString("hex")
    });
    return cachedKey;
  }
  const response = await fetchTarget(keyUrl, headers);
  debugLog("key fetched", {
    keyUrl,
    statusCode: response.statusCode,
    ...getBodyPreview(response.body)
  });
  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new Error(`HLS key request failed: HTTP ${response.statusCode}`);
  }
  if (response.body.length !== 16) {
    throw new Error(`Invalid HLS AES-128 key length: ${response.body.length}`);
  }
  keyCacheByUrl.set(keyUrl, response.body);
  return response.body;
};
var getM3u8DebugInfo = (content) => {
  const lines = content.split(/\r?\n/);
  const keyLines = lines.filter((line) => line.startsWith("#EXT-X-KEY"));
  const segmentLines = lines.filter((line) => line && !line.startsWith("#"));
  return {
    lineCount: lines.length,
    keyLines,
    segmentCount: segmentLines.length,
    firstLines: lines.slice(0, 12)
  };
};
var writeCorsHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Range, Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
};
var getProxyPort = async () => {
  if (!serverPromise) {
    serverPromise = new Promise((resolve, reject) => {
      const server = http2.createServer(async (req, res) => {
        writeCorsHeaders(res);
        if (req.method === "OPTIONS") {
          res.writeHead(204);
          res.end();
          return;
        }
        try {
          const requestUrl = new URL(req.url || "/", "http://127.0.0.1");
          if (requestUrl.pathname === "/hls-player") {
            const targetUrl2 = requestUrl.searchParams.get("url") || "";
            const parsedTargetUrl2 = new URL(targetUrl2);
            if (!isAllowedTarget(parsedTargetUrl2)) {
              debugLog("player rejected target", targetUrl2);
              res.writeHead(403);
              res.end("Unsupported target");
              return;
            }
            const address = server.address();
            const currentPort = address && typeof address === "object" ? address.port : 0;
            const sourceUrl = createProxyUrl(currentPort, targetUrl2);
            const browserDecryptSourceUrl = createProxyUrl(
              currentPort,
              targetUrl2,
              "browser"
            );
            debugLog("serve external player", {
              targetUrl: targetUrl2,
              sourceUrl,
              browserDecryptSourceUrl
            });
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.setHeader("Cache-Control", "no-store");
            res.writeHead(200);
            res.end(
              createPlayerHtml(targetUrl2, sourceUrl, browserDecryptSourceUrl)
            );
            return;
          }
          if (requestUrl.pathname !== "/hls-proxy") {
            debugLog("unknown proxy path", requestUrl.pathname);
            res.writeHead(404);
            res.end("Not found");
            return;
          }
          const targetUrl = requestUrl.searchParams.get("url") || "";
          const decryptMode = requestUrl.searchParams.get("decrypt") === "browser" ? "browser" : "server";
          debugLog("proxy request", {
            method: req.method,
            targetUrl,
            decryptMode,
            range: req.headers.range || "",
            origin: req.headers.origin || ""
          });
          const parsedTargetUrl = new URL(targetUrl);
          if (!isAllowedTarget(parsedTargetUrl)) {
            debugLog("proxy rejected target", targetUrl);
            res.writeHead(403);
            res.end("Unsupported target");
            return;
          }
          const response = await fetchTarget(targetUrl, req.headers);
          if (shouldRewriteAsM3u8(targetUrl, response.headers, response.body)) {
            const address = server.address();
            const currentPort = address && typeof address === "object" ? address.port : 0;
            const rewritten = rewriteM3u8(
              response.body.toString("utf8"),
              response.finalUrl,
              currentPort,
              decryptMode
            );
            debugLog("rewrite m3u8", {
              targetUrl,
              decryptMode,
              statusCode: response.statusCode,
              originalBytes: response.body.length,
              rewrittenBytes: Buffer.byteLength(rewritten),
              segmentCount: rewritten.split("/hls-proxy?url=").length - 1,
              originalPlaylist: getM3u8DebugInfo(
                response.body.toString("utf8")
              ),
              rewrittenPlaylist: getM3u8DebugInfo(rewritten)
            });
            res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
            res.setHeader("Cache-Control", "no-store");
            res.writeHead(response.statusCode);
            res.end(rewritten);
            return;
          }
          const kind = getTargetKind(targetUrl);
          let responseBody = response.body;
          const cryptoInfo = segmentCryptoInfoByUrl.get(targetUrl);
          if (decryptMode === "server" && kind === "segment" && cryptoInfo && response.statusCode >= 200 && response.statusCode < 300) {
            const key = await getHlsKey(cryptoInfo.keyUrl, req.headers);
            responseBody = decryptAes128Cbc(response.body, key, cryptoInfo.iv);
            debugLog("segment decrypted", {
              targetUrl,
              encrypted: getBodyPreview(response.body),
              decrypted: getBodyPreview(responseBody),
              keyUrl: cryptoInfo.keyUrl,
              iv: cryptoInfo.iv.toString("hex")
            });
          }
          const passthroughHeaders = [
            "content-type",
            "content-range",
            "cache-control"
          ];
          passthroughHeaders.forEach((header) => {
            const value = response.headers[header];
            if (value)
              res.setHeader(header, value);
          });
          if (kind === "key") {
            res.setHeader("Content-Type", "application/octet-stream");
          }
          if (kind === "segment") {
            res.setHeader("Content-Type", "video/mp2t");
          }
          res.setHeader("Content-Length", Buffer.byteLength(responseBody));
          debugLog("proxy passthrough", {
            targetUrl,
            kind,
            decryptMode,
            statusCode: response.statusCode,
            contentType: response.headers["content-type"],
            ...getBodyPreview(responseBody),
            encrypted: Boolean(cryptoInfo)
          });
          res.writeHead(response.statusCode);
          res.end(responseBody);
        } catch (error) {
          debugLog("proxy error", {
            message: error instanceof Error ? error.message : String(error)
          });
          res.writeHead(502);
          res.end(error instanceof Error ? error.message : "HLS proxy error");
        }
      });
      server.on("error", reject);
      server.listen(0, "127.0.0.1", () => {
        const address = server.address();
        if (!address || typeof address === "string") {
          reject(new Error("Failed to start HLS proxy"));
          return;
        }
        debugLog("proxy server started", {
          port: address.port,
          url: `http://127.0.0.1:${address.port}/hls-proxy`
        });
        resolve({ port: address.port });
      });
    });
  }
  return (await serverPromise).port;
};
var getFenbiHlsProxyUrl = async (targetUrl) => {
  const port = await getProxyPort();
  const proxyUrl = createProxyUrl(port, targetUrl);
  debugLog("create playback url", { targetUrl, proxyUrl });
  return proxyUrl;
};
var getFenbiHlsPlayerUrl = async (targetUrl) => {
  const port = await getProxyPort();
  const playerUrl = createPlayerUrl(port, targetUrl);
  debugLog("create player url", { targetUrl, playerUrl });
  return playerUrl;
};

// src/api/webviewHandle.ts
var POLICE_ACADEMY_QUIZ_ID = 1231;
var missingCookieMessageShown = false;
var getErrorMessage = (error) => {
  return error instanceof Error ? error.message : String(error);
};
// 检查鲁班练习是否已经配置登录 Cookie。
var hasFenbiCookie = () => {
  const cookie = vscode6.workspace.getConfiguration("lubanPractice").get("cookie", "");
  return cookie.trim().length > 0;
};
var isMissingCookieError = (error) => {
  return error instanceof Error && "code" in error && error.code === "MISSING_COOKIE";
};
var getStaticUrl = (result) => {
  return result.data?.staticUrl?.urls?.[0] || "";
};
var normalizeTemplateYearScope = (yearScope) => {
  return [0, 5, 10].includes(Number(yearScope)) ? Number(yearScope) : 0;
};
var dedupeIds = (ids = []) => {
  return Array.from(
    new Set(ids.map((id) => String(id || "").trim()).filter(Boolean))
  );
};
var chunkIds = (ids, size = 100) => {
  const chunks = [];
  for (let index = 0; index < ids.length; index += size) {
    chunks.push(ids.slice(index, index + size));
  }
  return chunks;
};
var normalizeErrorPracticePage = (page) => {
  return Math.max(1, Math.floor(Number(page) || 1));
};
var normalizeErrorPracticeLimit = (limit) => {
  return Math.max(1, Math.min(100, Math.floor(Number(limit) || 10)));
};
var normalizeAnswerTime = (params) => {
  const explicitTime = Number(params.time);
  if (Number.isFinite(explicitTime) && explicitTime >= 0) {
    return Math.floor(explicitTime);
  }
  return Math.floor((Date.now() - (params.startTime || Date.now())) / 1e3);
};
var getAnswerQuestionId = (params) => {
  return Number(params.globalId || params.id || 0);
};
var flattenQuestionIds = (value) => {
  if (Array.isArray(value)) {
    return value.reduce((ids, item) => {
      return ids.concat(flattenQuestionIds(item));
    }, []);
  }
  if (typeof value === "number") {
    return [String(value)];
  }
  if (typeof value === "string") {
    return value.split(",").map((id) => id.trim()).filter(Boolean);
  }
  if (!value || typeof value !== "object")
    return [];
  const record = value;
  const candidateKeys = [
    "questionIds",
    "ids",
    "globalIds",
    "questionId",
    "question_id",
    "globalId",
    "global_id",
    "id",
    "records",
    "rows",
    "items",
    "list",
    "result",
    "values",
    "questions",
    "data",
    "datas"
  ];
  return candidateKeys.reduce((ids, key) => {
    return key in record ? ids.concat(flattenQuestionIds(record[key])) : ids;
  }, []);
};
var extractErrorQuestionTotal = (value) => {
  if (!value || typeof value !== "object")
    return void 0;
  const record = value;
  const directTotal = ["total", "totalCount", "count"].find((key) => {
    return typeof record[key] === "number";
  });
  if (directTotal)
    return Number(record[directTotal]);
  const nestedKeys = ["data", "datas", "pagination", "page"];
  for (const key of nestedKeys) {
    const total = extractErrorQuestionTotal(record[key]);
    if (total !== void 0)
      return total;
  }
  return void 0;
};
var normalizeErrorQuestionIdsResponse = (payload) => {
  const questionIds = dedupeIds(flattenQuestionIds(payload));
  const total = extractErrorQuestionTotal(payload) ?? questionIds.length;
  return {
    questionIds,
    total
  };
};
var attachUserAnswers = (items, userAnswers) => {
  if (!items || !userAnswers)
    return;
  items.forEach((item) => {
    const answer = userAnswers[String(item.globalId)]?.answer;
    if (answer) {
      item.userAnswer = answer;
    }
  });
};
var getQuestionIdentity = (item) => {
  const record = item;
  return String(
    record.id || record.globalId || record.questionId || record.idStr || ""
  );
};
var sortItemsByQuestionIds = (items, questionIds) => {
  const orderMap = new Map(questionIds.map((id, index) => [id, index]));
  return items.slice().sort((left, right) => {
    const leftOrder = orderMap.get(getQuestionIdentity(left));
    const rightOrder = orderMap.get(getQuestionIdentity(right));
    if (leftOrder === void 0 && rightOrder === void 0)
      return 0;
    if (leftOrder === void 0)
      return 1;
    if (rightOrder === void 0)
      return -1;
    return leftOrder - rightOrder;
  });
};
var stripSolution = (item) => {
  const { solution: _solution, ...question } = item;
  return question;
};
var flattenResponseItems = (value) => {
  if (!value)
    return [];
  if (Array.isArray(value)) {
    return value.reduce((list, item) => {
      return list.concat(flattenResponseItems(item));
    }, []);
  }
  if (typeof value !== "object")
    return [];
  const record = value;
  const containerKeys = [
    "data",
    "datas",
    "questions",
    "questionList",
    "giants",
    "items",
    "list",
    "solutions",
    "episodes",
    "children"
  ];
  const nestedItems = containerKeys.reduce((list, key) => {
    return key in record ? list.concat(flattenResponseItems(record[key])) : list;
  }, []);
  if (nestedItems.length)
    return nestedItems;
  const itemKeys = [
    "globalId",
    "questionId",
    "content",
    "solution",
    "episodeId",
    "episode_id",
    "stem",
    "answer",
    "analysis",
    "parse",
    "media",
    "meta"
  ];
  if (itemKeys.some((key) => key in record)) {
    return [record];
  }
  return Object.keys(record).reduce((list, key) => {
    return list.concat(flattenResponseItems(record[key]));
  }, []);
};
var normalizeCatalogItems = (value, identityKeys) => {
  if (!value)
    return [];
  if (Array.isArray(value)) {
    return value.reduce((items, item) => {
      return items.concat(normalizeCatalogItems(item, identityKeys));
    }, []);
  }
  if (typeof value !== "object")
    return [];
  const record = value;
  if (identityKeys.some((key) => key in record)) {
    return [record];
  }
  return Object.keys(record).reduce((items, key) => {
    return items.concat(
      normalizeCatalogItems(record[key], identityKeys)
    );
  }, []);
};
var extractCatalogTotal = (value) => {
  if (!value || typeof value !== "object")
    return void 0;
  const record = value;
  for (const key of ["total", "totalCount", "count"]) {
    if (typeof record[key] === "number")
      return Number(record[key]);
  }
  for (const key of ["data", "datas", "result", "pagination", "page"]) {
    const total = extractCatalogTotal(record[key]);
    if (total !== void 0)
      return total;
  }
  return void 0;
};
var getSydwmsEpisodesByQuestionId = (payload, questionId) => {
  const data = payload && typeof payload === "object" && "data" in payload ? payload.data : payload;
  if (!data || typeof data !== "object")
    return [];
  const value = data[String(questionId)];
  if (!value)
    return [];
  if (Array.isArray(value))
    return value;
  if (typeof value !== "object")
    return [];
  return Object.keys(value).map((key) => {
    return value[key];
  });
};
var getEpisodeId = (item) => {
  return item.episodeId || item.episode_id || item.id;
};
var getSydwmsEpisodeMedia = (meta) => {
  if (!meta || typeof meta !== "object")
    return meta;
  const record = meta;
  if (Array.isArray(record.datas))
    return record.datas;
  if ("data" in record)
    return record.data;
  return meta;
};
var isHlsMedia = (media) => {
  return Number(media.format) === 3 || /m3u8/i.test(String(media.url || ""));
};
var attachPlayableMediaUrl = async (media) => {
  if (Array.isArray(media)) {
    return Promise.all(media.map((item) => attachPlayableMediaUrl(item)));
  }
  if (!media || typeof media !== "object")
    return media;
  const record = media;
  if (typeof record.url === "string" && record.url && isHlsMedia(record)) {
    console.log("[FenbiTools:Sydwms] create HLS playback url", {
      originalUrl: record.url,
      format: record.format,
      duration: record.duration,
      width: record.width,
      height: record.height
    });
    const playbackUrl = await getFenbiHlsProxyUrl(record.url);
    const playerUrl = await getFenbiHlsPlayerUrl(record.url);
    console.log("[FenbiTools:Sydwms] HLS playback url created", {
      originalUrl: record.url,
      playbackUrl,
      playerUrl
    });
    return {
      ...record,
      originalUrl: record.url,
      playbackUrl,
      playerUrl
    };
  }
  return media;
};
var attachEpisodeMeta = async (episodes) => {
  return Promise.all(
    episodes.map(async (item) => {
      const episodeId = getEpisodeId(item);
      if (!episodeId)
        return item;
      try {
        console.log("[FenbiTools:Sydwms] fetch episode meta", {
          episodeId,
          title: item.title || item.name
        });
        const meta = await getSydwmsEpisodeMeta(episodeId);
        const media = await attachPlayableMediaUrl(getSydwmsEpisodeMedia(meta));
        console.log("[FenbiTools:Sydwms] episode meta attached", {
          episodeId,
          title: item.title || item.name,
          media
        });
        return { ...item, media, meta };
      } catch (error) {
        console.error("[FenbiTools:Sydwms] episode meta failed", {
          episodeId,
          title: item.title || item.name,
          error: error instanceof Error ? error.message : String(error)
        });
        return item;
      }
    })
  );
};
var extractSydwmsMaterials = (payload) => {
  if (!payload || typeof payload !== "object")
    return [];
  const record = payload;
  if (Array.isArray(record.materials)) {
    return record.materials;
  }
  const nestedContainers = ["data", "datas", "solutions"];
  for (const key of nestedContainers) {
    const nested = record[key];
    if (nested && typeof nested === "object" && !Array.isArray(nested)) {
      const nestedMaterials = nested.materials;
      if (Array.isArray(nestedMaterials)) {
        return nestedMaterials;
      }
    }
  }
  return [];
};
var extractErrorMaterials = (payloads) => {
  return payloads.reduce((materials, payload) => {
    if (!payload || Array.isArray(payload) || typeof payload !== "object") {
      return materials;
    }
    const record = payload;
    if (Array.isArray(record.materials)) {
      return materials.concat(record.materials);
    }
    return materials;
  }, []);
};
var WebviewHandle = class {
  constructor() {
    this.leaderboardResults = /* @__PURE__ */ new Map();
    this.leaderboardUploads = /* @__PURE__ */ new Set();
  }
  registerLeaderboardSubmission(id) {
    if (!this.leaderboardResults.has(id))
      this.leaderboardResults.set(id, null);
    if (this.leaderboardResults.size > 1e3) {
      this.leaderboardResults.delete(this.leaderboardResults.keys().next().value);
    }
    return id;
  }
  onDidReceiveMessage() {
    return webview.onDidReceiveMessage((message) => {
      void this.handleMessage(message).catch((error) => {
        this.postError(error);
      });
    });
  }
  async handleMessage(message) {
    const { postData, command = "" } = message || {};
    switch (command) {
      case "getLeaderboard":
        await this.getLeaderboard(postData || {});
        return;
      case "reportLeaderboardResult":
        await this.reportLeaderboardResult(postData);
        return;
      case "pageInit":
        await this.pageInit(postData || {});
        return;
      case "changeCategory":
        await this.changeCategory(postData || {});
        return;
      case "getErrorKeypointTree":
        await this.getErrorKeypointTree(
          postData || {}
        );
        return;
      case "getErrorPracticeQuestion":
        await this.getErrorPracticeQuestion(
          postData || {}
        );
        return;
      case "getErrorPracticeSolution":
        await this.getErrorPracticeSolution(
          postData || {}
        );
        return;
      case "removeErrorQuestions":
        await this.removeErrorQuestions(
          postData || {}
        );
        return;
      case "getQuestion":
        await this.getQuestion(postData || {});
        return;
      case "getRealQuestion":
        await this.getRealQuestion(postData || {});
        return;
      case "getPaperCatalog":
        await this.getPaperCatalog(postData || {});
        return;
      case "getSolution":
        await this.getSolutions(postData || {});
        return;
      case "getQuickQuestion":
        await this.getQuickQuestion(postData || {});
        return;
      case "getSmartQuestion":
        await this.getSmartQuestion(postData || {});
        return;
      case "getSydwmsInterviewDetail":
        await this.getSydwmsInterviewDetail(
          postData || {}
        );
        return;
      case "getUserTemplateInfo":
        await this.getUserTemplateInfo();
        return;
      case "submit":
        await this.submit(postData || {});
        return;
      case "jumpFenbi":
        this.jump(postData || {});
        return;
      case "changeQuestionCount":
        await this.changeQuestionCount(
          postData || {}
        );
        return;
      case "answer":
        this.studyTime(postData || {});
        if (message.inc) {
          await this.inc(postData || {});
        }
        return;
      case "history":
        await this.getHistory(postData || {});
        return;
      case "openInBrowser":
        this.openInBrowser(postData || {});
        return;
      case "updateSettings":
        await this.updateSettings(postData || {});
        return;
      default:
        return;
    }
  }
  postError(error) {
    if (isMissingCookieError(error)) {
      if (missingCookieMessageShown)
        return;
      missingCookieMessageShown = true;
    }
    const message = getErrorMessage(error) || "\u64CD\u4F5C\u5931\u8D25";
    void vscode6.window.showErrorMessage(message);
    webview.postMessage({
      command: "message",
      data: { message }
    });
  }
  async getHistory({
    category = "xingce" /* XINGCE */,
    count,
    categoryId
  } = {}) {
    if (!hasFenbiCookie()) {
      webview.postMessage({
        command: "history",
        data: []
      });
      return;
    }
    const config = getCategoryRouteConfig(category);
    const res = await getHistory({
      category: config.apiCategory,
      count: count || 15,
      categoryId: categoryId || void 0
    });
    webview.postMessage({
      command: "history",
      data: res.datas || []
    });
  }
  // 使用独立配置初始化鲁班练习的题库页面。
  async pageInit(postData) {
    const category = postData.categoryId || "xingce" /* XINGCE */;
    const settingConfig = vscode6.workspace.getConfiguration("lubanPractice");
    webview.postMessage({
      command: "setting",
      data: settingConfig
    });
    if (!hasFenbiCookie()) {
      webview.postMessage({
        command: "init",
        data: {
          categoryId: category,
          favoriteQuizLocationName: "",
          favoriteQuizCoursePrefixes: [],
          menu: [],
          cacheResult: {}
        }
      });
      webview.postMessage({
        command: "pageCache",
        data: {}
      });
      return;
    }
    const config = getCategoryRouteConfig(category);
    const cacheResult = await getCache(config.apiCategory);
    const menu = await getCategories(category);
    const favoriteQuizInfo = await this.getFavoriteQuizInfo(category);
    webview.postMessage({
      command: "init",
      data: {
        categoryId: category,
        favoriteQuizLocationName: favoriteQuizInfo.locationName,
        favoriteQuizCoursePrefixes: favoriteQuizInfo.coursePrefixes,
        menu,
        cacheResult: cacheResult || {}
      }
    });
    webview.postMessage({
      command: "pageCache",
      data: cacheResult
    });
  }
  async changeCategory(postData) {
    if (!hasFenbiCookie())
      return;
    const category = postData.categoryId || "xingce" /* XINGCE */;
    const config = getCategoryRouteConfig(category);
    await courseSetChange({ category: config.courseSetPrefix });
  }
  async getErrorKeypointTree(params) {
    const category = params.category || "xingce" /* XINGCE */;
    const tree = await getErrorKeypointTree(category);
    webview.postMessage({
      command: "errorKeypointTree",
      data: tree || []
    });
  }
  async loadErrorPracticePage(params) {
    const category = params.category || "xingce" /* XINGCE */;
    const page = normalizeErrorPracticePage(params.page);
    const limit = normalizeErrorPracticeLimit(params.limit);
    const offset = (page - 1) * limit;
    let questionIds = dedupeIds(params.questionIds || []);
    const fallbackQuestionIds = dedupeIds(params.fallbackQuestionIds || []);
    const fallbackPageQuestionIds = fallbackQuestionIds.slice(
      offset,
      offset + limit
    );
    let total = Number(params.total) || fallbackQuestionIds.length || questionIds.length;
    if (!questionIds.length && fallbackPageQuestionIds.length) {
      questionIds = fallbackPageQuestionIds;
    }
    if (!questionIds.length) {
      if (!params.categoryId) {
        throw new Error("\u7F3A\u5C11\u9519\u9898\u77E5\u8BC6\u70B9 ID\uFF0C\u65E0\u6CD5\u5F00\u59CB\u7EC3\u4E60");
      }
      const questionIdsResult = await getErrorQuestionIds(category, {
        categoryId: params.categoryId,
        offset,
        limit
      });
      const normalized = normalizeErrorQuestionIdsResponse(questionIdsResult);
      questionIds = normalized.questionIds;
      total = total || normalized.total;
      if (questionIds.length > limit) {
        total = Math.max(total, questionIds.length);
        questionIds = questionIds.slice(offset, offset + limit);
      }
    }
    if (!questionIds.length) {
      questionIds = fallbackPageQuestionIds;
    }
    if (!questionIds.length) {
      throw new Error("\u5F53\u524D\u9875\u6682\u65E0\u9519\u9898");
    }
    const payloads = await Promise.all(
      chunkIds(questionIds).map((ids) => getErrorSolutions(category, ids))
    );
    const solutions = sortItemsByQuestionIds(
      payloads.reduce((items, payload) => {
        return items.concat(flattenResponseItems(payload));
      }, []),
      questionIds
    );
    const rawMaterials = extractErrorMaterials(payloads);
    const seenMaterialContents = /* @__PURE__ */ new Set();
    const solutionsWithMaterialContent = solutions.map((sol) => {
      const materialIdx = sol.materialIndexes?.[0];
      const material = typeof materialIdx === "number" ? rawMaterials[materialIdx] : null;
      const content = material?.content;
      if (!content)
        return { ...sol, materialContent: null };
      if (seenMaterialContents.has(content)) {
        return { ...sol, materialContent: null };
      }
      seenMaterialContents.add(content);
      return { ...sol, materialContent: content };
    });
    return {
      pagination: {
        categoryId: params.categoryId,
        page,
        limit,
        total,
        questionIds
      },
      questionIds,
      solutions: solutionsWithMaterialContent,
      materials: rawMaterials
    };
  }
  async getErrorPracticeQuestion(params) {
    const { pagination, questionIds, solutions, materials } = await this.loadErrorPracticePage(params);
    webview.postMessage({
      command: "errorPracticeQuestion",
      data: {
        questions: solutions.map((item) => ({ ...stripSolution(item), userAnswer: void 0 })),
        materials,
        questionCount: pagination.total || questionIds.length,
        errorPagination: pagination,
        leaderboardSubmissionId: this.registerLeaderboardSubmission(hashLeaderboardId((0, import_crypto2.randomUUID)()))
      }
    });
  }
  async getErrorPracticeSolution(params) {
    const { pagination, questionIds, solutions, materials } = await this.loadErrorPracticePage(params);
    webview.postMessage({
      command: "errorPracticeSolution",
      data: {
        solutions,
        materials,
        questionCount: pagination.total || questionIds.length,
        correctCount: 0,
        errorPagination: pagination,
        leaderboardSubmissionId: params.leaderboardSubmissionId,
        leaderboardCompletedAt: params.completedAt
      }
    });
  }
  async removeErrorQuestions(params) {
    const category = params.category || "xingce" /* XINGCE */;
    const questionIds = dedupeIds(params.questionIds || []);
    if (!questionIds.length)
      return;
    await Promise.all(
      questionIds.map((id) => {
        return removeErrorQuestion(category, id).catch((error) => {
          console.error("[FenbiTools:Errors] remove error question failed", {
            questionId: id,
            error: error instanceof Error ? error.message : String(error)
          });
        });
      })
    );
  }
  async getFavoriteQuizInfo(category) {
    const courseSetPrefix = getFavoriteQuizCourseSetPrefix(category);
    try {
      const res = await getCourseSetFavoriteQuiz({ courseSetPrefix });
      const favoriteQuizData = res.data || {
        currentQuizVO: res.currentQuizVO,
        favoriteQuizVO: res.favoriteQuizVO,
        courseVOList: res.courseVOList
      };
      const currentQuizId = favoriteQuizData.currentQuizVO?.quizId;
      const coursePrefixes = favoriteQuizData.courseVOList?.map((course) => course.prefix) || [];
      if (currentQuizId === POLICE_ACADEMY_QUIZ_ID && !coursePrefixes.includes("gazj" /* GAZJ */)) {
        coursePrefixes.push("gazj" /* GAZJ */);
      }
      return {
        locationName: favoriteQuizData.favoriteQuizVO?.find((item) => {
          return item.id === currentQuizId;
        })?.name || "",
        coursePrefixes
      };
    } catch (_error) {
      return { locationName: "", coursePrefixes: [] };
    }
  }
  async getQuestion(params) {
    await this.loadQuestion(params, "normal");
  }
  async getRealQuestion(params) {
    if (!params.paperId) {
      throw new Error("\u7F3A\u5C11\u8BD5\u5377 ID\uFF0C\u65E0\u6CD5\u5F00\u59CB\u7B54\u9898");
    }
    await this.loadQuestion(params, "real");
  }
  async getQuickQuestion(params) {
    await this.loadQuestion(params, "quick");
  }
  async getSmartQuestion(params) {
    const yearScope = normalizeTemplateYearScope(params.yearScope);
    await updateUserTemplateInfo({ yearScope });
    await this.loadQuestion({ ...params, yearScope }, "smart");
  }
  async getUserTemplateInfo() {
    const res = await getUserTemplateInfo();
    webview.postMessage({
      command: "templateInfo",
      data: res.data || {}
    });
  }
  // 加载试卷目录，并在未登录时提示鲁班练习的配置项。
  async getPaperCatalog(params = {}) {
    const category = params.category || "xingce" /* XINGCE */;
    const page = Math.max(1, Math.floor(Number(params.page) || 1));
    const pageSize = Math.max(
      1,
      Math.min(50, Math.floor(Number(params.pageSize) || 12))
    );
    if (!hasFenbiCookie()) {
      webview.postMessage({
        command: "paperCatalog",
        data: {
          labels: [],
          papers: [],
          page,
          pageSize,
          total: 0,
          hasMore: false
        }
      });
      webview.postMessage({
        command: "message",
        data: {
          message: "\u8BF7\u5148\u5728 VS Code \u8BBE\u7F6E\u4E2D\u914D\u7F6E lubanPractice.cookie"
        }
      });
      return;
    }
    const apiCategory = getCategoryRouteConfig(category).apiCategory;
    const [labelsResult, papersResult] = await Promise.all([
      getPaperLabels(apiCategory),
      getPastPapers(apiCategory, {
        page: page - 1,
        pageSize,
        labelId: params.labelId
      })
    ]);
    const labels = normalizeCatalogItems(labelsResult, [
      "id",
      "labelId",
      "name",
      "title"
    ]).map((item) => ({
      ...item,
      id: item.id ?? item.labelId ?? "",
      name: item.name || String(item.title || item.labelName || "")
    }));
    const papers = normalizeCatalogItems(papersResult, [
      "id",
      "paperId",
      "name",
      "title",
      "paperName"
    ]).map((item) => ({
      ...item,
      id: item.id ?? item.paperId,
      name: item.name || String(item.title || item.paperName || "")
    }));
    const total = extractCatalogTotal(papersResult);
    webview.postMessage({
      command: "paperCatalog",
      data: {
        labels,
        papers,
        page,
        pageSize,
        total,
        hasMore: total ? page * pageSize < total : papers.length >= pageSize
      }
    });
  }
  async getSydwmsInterviewDetail(params) {
    if (!params.keypointId) {
      throw new Error("\u7F3A\u5C11\u9762\u8BD5\u9898\u76EE ID");
    }
    const requestedCategory = params.category || "sydwms" /* SYDWMS */;
    const category = isInterviewCategory(requestedCategory) ? requestedCategory : "sydwms" /* SYDWMS */;
    const giantsResult = await getSydwmsGiants(
      params.keypointId,
      category
    );
    const questionCount = giantsResult.length;
    const requestedQuestionIndex = Math.floor(
      Number(params.questionIndex) || 0
    );
    const questionIndex = Math.min(
      Math.max(requestedQuestionIndex, 0),
      Math.max(questionCount - 1, 0)
    );
    const questionId = giantsResult[questionIndex];
    if (!questionId) {
      throw new Error("\u672A\u83B7\u53D6\u5230\u9762\u8BD5\u9898\u5185\u5BB9");
    }
    const questionIds = [questionId];
    console.log("[FenbiTools:Sydwms] load interview detail", {
      category,
      keypointId: params.keypointId,
      questionId,
      questionIndex,
      questionCount
    });
    const [solutionsResult, episodesResult, notesResult] = await Promise.all([
      getSydwmsSolutions(questionIds, category),
      getSydwmsEpisodes(questionIds, category),
      getSydwmsNotes(questionIds, category).catch(() => void 0)
    ]);
    const questions = flattenResponseItems(
      solutionsResult
    );
    const materials = extractSydwmsMaterials(solutionsResult);
    const episodes = await attachEpisodeMeta(
      getSydwmsEpisodesByQuestionId(episodesResult, questionId)
    );
    console.log("[FenbiTools:Sydwms] interview detail loaded", {
      category,
      keypointId: params.keypointId,
      questionId,
      questionIndex,
      questionCount,
      loadedQuestionCount: questions.length,
      materialCount: materials.length,
      episodeCount: episodes.length,
      episodeTitles: episodes.map((item) => item.title || item.name)
    });
    const payload = {
      category,
      materials,
      questions,
      solutions: questions,
      episodes,
      notes: notesResult?.data || notesResult?.datas || notesResult?.notes,
      questionId,
      questionIndex,
      questionCount,
      questionIds: giantsResult
    };
    webview.postMessage({
      command: "sydwmsInterviewDetail",
      data: payload
    });
  }
  async loadQuestion(params, mode) {
    const category = params.category || "xingce" /* XINGCE */;
    let combineKey = params.combineKey || "";
    if (!combineKey) {
      const keyResult = mode === "smart" ? await getSmartExercisesId(category, { yearScope: params.yearScope }) : mode === "quick" ? await getQuickExercisesId(category) : mode === "real" ? await getRealExercisesId(category, params.paperId || "") : await getExercisesId(category, { keypointId: params.id });
      combineKey = keyResult.key || "";
    }
    if (!combineKey) {
      throw new Error("\u83B7\u53D6\u7EC3\u4E60 key \u5931\u8D25");
    }
    const exerciseResult = await getExercisesUrl({
      category,
      combineKey
    });
    if (exerciseResult.code === -1) {
      throw new Error(exerciseResult.message || "\u83B7\u53D6\u8BD5\u9898\u5931\u8D25");
    }
    const staticUrl = getStaticUrl(exerciseResult);
    if (!staticUrl) {
      throw new Error("\u83B7\u53D6\u8BD5\u9898\u5730\u5740\u5931\u8D25");
    }
    const questionResult = await getQuestion(category, staticUrl);
    console.log(
      "\u{1F680} ~ WebviewHandle ~ loadQuestion ~ questionResult:",
      questionResult
    );
    void getCurrent().catch(() => void 0);
    attachUserAnswers(
      questionResult.questions,
      exerciseResult.data?.userAnswers
    );
    const payload = {
      ...questionResult,
      exerciseId: exerciseResult.data?.ancientExerciseId?.id,
      combineKey,
      combinKey: combineKey
    };
    webview.postMessage({
      command: "getQuestion",
      data: payload
    });
  }
  studyTime(params) {
    const exerciseId = Number(params.exerciseId || 0);
    const questionId = getAnswerQuestionId(params);
    if (!exerciseId && !questionId)
      return;
    const config = getCategoryRouteConfig(params.category);
    const answerTime = normalizeAnswerTime(params);
    const studyTimeMs = Math.max(0, answerTime * 1e3);
    void studyTime({
      exerciseId,
      questionId,
      startTime: Date.now() - studyTimeMs,
      studyTime: studyTimeMs,
      subType: 1,
      tikuPrefix: config.tikuPrefix
    }).catch(() => void 0);
  }
  async inc(params) {
    if (!params.category || !params.combineKey || !params.globalId) {
      throw new Error("\u7B54\u9898\u53C2\u6570\u7F3A\u5931");
    }
    const answer = isEssayCategory(params.category) ? {
      type: 204,
      answer: String(params.answer || "")
    } : {
      type: 201,
      choice: String(params.answer)
    };
    await incr(params.category, params.combineKey, {
      answer,
      key: String(params.globalId),
      time: normalizeAnswerTime(params)
    });
  }
  async submit(params) {
    const category = params.category || "xingce" /* XINGCE */;
    if (!params.combineKey) {
      throw new Error("\u7F3A\u5C11\u7EC3\u4E60 key\uFF0C\u65E0\u6CD5\u4EA4\u5377");
    }
    const completedAt = (/* @__PURE__ */ new Date()).toISOString();
    const submitRes = await submit(category, params.combineKey);
    if (submitRes.msg === "needPayment") {
      webview.postMessage({
        command: "message",
        data: {
          message: "\u9700\u8981\u81EA\u884C\u524D\u5F80\u7C89\u7B14\u5B98\u7F51\u5F00\u901Avip\uFF0C\u4E0E\u672C\u63D2\u4EF6\u65E0\u5173\uFF0C\u7531\u4E8E\u65E0VIP\uFF0C\u7533\u8BBA\u540E\u7EED\u529F\u80FD\u6682\u65E0"
        }
      });
      return;
    }
    const solutionRes = await this.loadSolution(category, params.combineKey);
    if (!isEssayCategory(category)) {
      solutionRes.leaderboardSubmissionId = this.registerLeaderboardSubmission(
        hashLeaderboardId(`${category}:${params.combineKey}`)
      );
      solutionRes.leaderboardCompletedAt = completedAt;
    }
    webview.postMessage({
      command: "solution",
      data: solutionRes
    });
  }
  async getSolutions(postData) {
    const category = postData.category || "xingce" /* XINGCE */;
    if (!postData.combineKey) {
      throw new Error("\u7F3A\u5C11\u7EC3\u4E60 key\uFF0C\u65E0\u6CD5\u83B7\u53D6\u89E3\u6790");
    }
    const solutionRes = await this.loadSolution(category, postData.combineKey);
    webview.postMessage({
      command: "solution",
      data: solutionRes
    });
  }
  async loadSolution(category, combineKey) {
    const res = await getSolution(category, combineKey);
    const staticUrl = getStaticUrl(res);
    if (!staticUrl) {
      throw new Error("\u83B7\u53D6\u89E3\u6790\u5730\u5740\u5931\u8D25");
    }
    const solutionRes = await getSolutionQuestion(
      staticUrl,
      category
    );
    attachUserAnswers(solutionRes.solutions, res.data?.userAnswers);
    solutionRes.correctCount = getObjectiveResultStats(solutionRes.solutions).correctCount;
    solutionRes.questionCount = solutionRes.solutions?.length || 0;
    return solutionRes;
  }
  async getLeaderboard(params) {
    try {
      const data = await fetchLeaderboard(params.sort, params.page);
      webview.postMessage({ command: "leaderboard", data: { ...data, requestId: params.requestId } });
    } catch (error) {
      webview.postMessage({
        command: "leaderboardError",
        data: { message: getErrorMessage(error), requestId: params.requestId }
      });
    }
  }
  async reportLeaderboardResult(params) {
    const id = params?.submissionId;
    if (!id || !this.leaderboardResults.has(id) || this.leaderboardUploads.has(id))
      return;
    const result = this.leaderboardResults.get(id) || params;
    if (!Number.isInteger(result.questionCount) || result.questionCount < 1 || !Number.isInteger(result.correctCount) || result.correctCount < 0 || result.correctCount > result.questionCount)
      return;
    this.leaderboardResults.set(id, result);
    this.leaderboardUploads.add(id);
    webview.postMessage({ command: "leaderboardReport", data: { submissionId: id, status: "uploading" } });
    try {
      await uploadLeaderboardResult(result);
      webview.postMessage({ command: "leaderboardReport", data: { submissionId: id, status: "success" } });
    } catch (error) {
      webview.postMessage({
        command: "leaderboardReport",
        data: { submissionId: id, status: "error", message: getErrorMessage(error) }
      });
    } finally {
      this.leaderboardUploads.delete(id);
    }
  }
  jump(params) {
    if (!params.exerciseId) {
      throw new Error("\u7F3A\u5C11\u7EC3\u4E60 ID\uFF0C\u65E0\u6CD5\u6253\u5F00\u7C89\u7B14\u9875\u9762");
    }
    const category = params.category || "xingce" /* XINGCE */;
    const url = vscode6.Uri.parse(
      `https://www.fenbi.com/spa/tiku/report/exam/solution/${category}/${category}/${params.exerciseId}/2`
    );
    void vscode6.env.openExternal(url);
  }
  async changeQuestionCount(params) {
    if (!params.questionCount) {
      throw new Error("\u8BF7\u9009\u62E9\u6BCF\u7EC4\u51FA\u9898\u6570\u91CF");
    }
    await changeQuestionCount({ questionCount: params.questionCount });
    webview.postMessage({
      command: "message",
      data: { message: "\u4FEE\u6539\u6210\u529F" }
    });
  }
  openInBrowser(params) {
    if (!params.url) {
      throw new Error("\u7F3A\u5C11\u6253\u5F00\u94FE\u63A5");
    }
    const url = vscode6.Uri.parse(params.url);
    const isLocalHttp = url.scheme === "http" && (url.authority.startsWith("127.0.0.1:") || url.authority.startsWith("localhost:"));
    if (url.scheme !== "https" && !isLocalHttp) {
      throw new Error("\u53EA\u652F\u6301\u6253\u5F00 https \u94FE\u63A5\u6216\u672C\u5730\u64AD\u653E\u5730\u5740");
    }
    void vscode6.env.openExternal(url);
  }
  // 保存鲁班练习的界面偏好并通知当前页面刷新。
  async updateSettings(params) {
    const config = vscode6.workspace.getConfiguration("lubanPractice");
    const updates = [
      ["color", params.color],
      ["backgroundColor", params.backgroundColor],
      ["needLineThrough", params.needLineThrough],
      ["fontSize", params.fontSize],
      ["correctColor", params.correctColor],
      ["wrongColor", params.wrongColor],
      ["buttonBorderColor", params.buttonBorderColor],
      ["canvasBrushColor", params.canvasBrushColor],
      ["canvasBrushWidth", params.canvasBrushWidth]
    ];
    await Promise.all(
      updates.filter(([, value]) => value !== void 0).map(([key, value]) => {
        return config.update(key, value, vscode6.ConfigurationTarget.Global);
      })
    );
    if (hasFenbiCookie())
      missingCookieMessageShown = false;
    webview.postMessage({
      command: "setting",
      data: vscode6.workspace.getConfiguration("lubanPractice")
    });
    webview.postMessage({
      command: "settingsUpdated",
      data: { message: "\u8BBE\u7F6E\u5DF2\u4FDD\u5B58" }
    });
  }
};

// src/extension.ts
// 注册编辑器题库及左侧入口，使点击图标时直接打开题库标签页。
function activate(context) {
  const provider = new MyWebviewProvider(context);
  context.subscriptions.push(
    // 从命令面板打开或切回已有题库标签页。
    vscode7.commands.registerCommand("lubanPractice.openWebview", () => {
      provider.openEditor();
    }),
    // 将鲁班练习的最新设置发送到题库页面。
    vscode7.commands.registerCommand("lubanPractice.refreshEntry", () => {
      provider.openEditor();
      const config = vscode7.workspace.getConfiguration("lubanPractice");
      webview.postMessage({
        command: "setting",
        data: config
      });
    }),
    // 在编辑器题库中切换智能伪装。
    vscode7.commands.registerCommand("lubanPractice.toggleDisguise", () => {
      provider.openEditor();
      webview.postMessage({
        command: "showDisguise",
        data: null
      });
    }),
    // 隐藏当前题目的助手回答，不改变题目选择或展开助手。
    vscode7.commands.registerCommand("lubanPractice.hideAgentAnswer", () => {
      provider.sendAgentAction("hideAnswer");
    }),
    // 通过当前练习页面启动预解析，快捷键由 VS Code 统一管理。
    vscode7.commands.registerCommand("lubanPractice.prepareQuestionGroup", () => {
      provider.sendAgentAction("prepareGroup");
    }),
    vscode7.window.registerWebviewViewProvider("lubanPractice.mainView", provider, {
      webviewOptions: {
        retainContextWhenHidden: true
      }
    }),
    vscode7.window.registerWebviewPanelSerializer("lubanPractice.editor", {
      // 在窗口重载后重新绑定已恢复的题库标签页。
      async deserializeWebviewPanel(panel) {
        provider.restoreEditor(panel);
      }
    })
  );
}
var MyWebviewProvider = class {
  // 保存扩展上下文，供编辑器题库加载资源和管理监听器。
  constructor(context) {
    this._context = context;
  }
  // 将快捷命令发送到已有题库，未打开题库时不新建页面。
  sendAgentAction(action) {
    if (this._editorPanel)
      void this._editorPanel.webview.postMessage({
        command: "agent.action",
        data: { action }
      });
  }
  // 复用唯一的题库标签页，并固定在第一个编辑器分组打开。
  openEditor() {
    if (this._editorPanel) {
      this._editorPanel.reveal(vscode7.ViewColumn.One);
      return;
    }
    const panel = vscode7.window.createWebviewPanel(
      "lubanPractice.editor",
      "鲁班练习",
      { viewColumn: vscode7.ViewColumn.One, preserveFocus: false },
      { enableScripts: true, retainContextWhenHidden: true }
    );
    this.restoreEditor(panel);
  }
  // 将新建或恢复的标签页连接到同一套题库消息处理器。
  restoreEditor(panel) {
    if (this._editorPanel) {
      panel.dispose();
      this.openEditor();
      return;
    }
    this._editorPanel = panel;
    panel.title = "鲁班练习";
    panel.iconPath = vscode7.Uri.file(path.join(this._context.extensionPath, "resources/dark/fish.png"));
    panel.webview.options = { ...panel.webview.options, enableScripts: true };
    webview.panel = panel;
    const messageDisposable = new WebviewHandle().onDidReceiveMessage();
    // 为该标签页创建独立助手，避免关闭后继续向新页面发送生成结果。
    const agent = new AgentController(this._context, vscode7, (message) => {
      void panel.webview.postMessage(message);
    }, async (question) => {
      const cached = webview.referenceCache?.get(question.id);
      if (cached)
        return cached;
      const category = getCategoryRouteConfig(question.category).apiCategory;
      const response = await getErrorSolutions(category, [question.id]);
      const solution = flattenResponseItems(response).find((item) => String(item.globalId || item.id) === question.id);
      if (!solution?.solution)
        return null;
      return {
        answer: parseChoiceIndexes(solution.correctAnswer?.choice, solution.type === 2).map((index) => String.fromCharCode(65 + index)).join("、"),
        solution: plainHtml(solution.solution)
      };
    });
    // 助手命令使用独立通道，保留原有题库消息和作答行为。
    const agentMessages = panel.webview.onDidReceiveMessage((message) => {
      if (typeof message?.command === "string" && message.command.startsWith("agent."))
        void agent.handle(message);
    });
    // 标签页关闭后释放消息监听器，允许下一次正常重新打开。
    const disposeListener = panel.onDidDispose(() => {
      messageDisposable.dispose();
      agentMessages.dispose();
      agent.dispose();
      if (this._editorPanel === panel)
        this._editorPanel = void 0;
      if (webview.panel === panel)
        webview.panel = void 0;
    });
    this._context.subscriptions.push(panel, messageDisposable, agentMessages, disposeListener);
    webview.setWebviewHtml(this._context.extensionPath);
  }
  // 点击左侧入口时打开编辑器题库，并自动收起入口侧栏。
  openFromSidebar() {
    this.openEditor();
    void vscode7.commands.executeCommand("workbench.action.closeSidebar");
  }
  // 左侧视图只承担入口职责，题库页面始终运行在编辑器标签页。
  resolveWebviewView(webviewView) {
    webviewView.webview.html = "<!DOCTYPE html><html><body></body></html>";
    // 再次点击左侧图标时切回已有题库，不重复创建页面。
    const visibilityListener = webviewView.onDidChangeVisibility(() => {
      if (webviewView.visible)
        this.openFromSidebar();
    });
    this._context.subscriptions.push(visibilityListener);
    if (webviewView.visible)
      this.openFromSidebar();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
