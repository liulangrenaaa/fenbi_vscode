import { Marked } from "marked";
import DOMPurify from "dompurify";
import katex from "katex";
import "katex/dist/katex.css";

// 在 Markdown 分词阶段保留公式，避免下划线、反斜线被提前解释。
function mathExtension(name, level, pattern, prefix, display, placeholder) {
  return {
    name,
    level,
    // 告知解析器公式的起始位置，不影响代码块及行内代码的原样显示。
    start(source) {
      return source.indexOf(prefix);
    },
    // 仅接收闭合的公式，流式输出尚未闭合时继续显示原始文本。
    tokenizer(source) {
      const match = pattern.exec(source);
      if (!match || !match[1].trim()) return;
      if (prefix === "$" && /^\s|\s$/.test(match[1])) return;
      return { type: name, raw: match[0], formula: match[1], display };
    },
    // 使用临时占位节点，使模型 HTML 先经过净化，再由本地公式引擎排版。
    renderer(token) {
      return placeholder(token);
    },
  };
}

// 安全显示 Markdown 和常见 LaTeX 分隔符，公式错误不影响整条回答。
export function renderAnswerMarkdown(content) {
  const formulas = new Map();
  const nonce = crypto.randomUUID();
  // 随机标识避免模型伪造占位节点；限制单条回答的公式数量与长度。
  function placeholder(token) {
    const key = `${nonce}:${formulas.size}`;
    if (formulas.size >= 200 || token.formula.length > 4000) {
      const escaped = document.createElement("code");
      escaped.textContent = token.raw;
      return escaped.outerHTML;
    }
    formulas.set(key, token);
    const tag = token.display ? "div" : "span";
    return `<${tag} class="la-math${token.display ? " la-math-display" : ""}" data-la-math="${key}"></${tag}>${token.display ? "\n" : ""}`;
  }
  const parser = new Marked({
    breaks: true,
    gfm: true,
    extensions: [
      mathExtension(
        "latexBlock",
        "block",
        /^ {0,3}\\\[([\s\S]+?)\\\][ \t]*(?:\n|$)/,
        "\\[",
        true,
        placeholder,
      ),
      mathExtension(
        "dollarBlock",
        "block",
        /^ {0,3}\$\$([\s\S]+?)\$\$[ \t]*(?:\n|$)/,
        "$$",
        true,
        placeholder,
      ),
      mathExtension(
        "latexInline",
        "inline",
        /^\\\(([\s\S]+?)\\\)/,
        "\\(",
        false,
        placeholder,
      ),
      mathExtension(
        "latexDisplayInline",
        "inline",
        /^\\\[([\s\S]+?)\\\]/,
        "\\[",
        true,
        placeholder,
      ),
      mathExtension(
        "dollarDisplayInline",
        "inline",
        /^\$\$([\s\S]+?)\$\$/,
        "$$",
        true,
        placeholder,
      ),
      mathExtension(
        "dollarInline",
        "inline",
        /^\$(?!\$)((?:\\.|[^$\\\n])+?)\$(?!\d)/,
        "$",
        false,
        placeholder,
      ),
    ],
  });
  const container = document.createElement("div");
  container.innerHTML = DOMPurify.sanitize(parser.parse(content || ""), {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["img", "style", "input", "form", "button"],
    FORBID_ATTR: ["style"],
  });
  for (const node of container.querySelectorAll("[data-la-math]")) {
    const token = formulas.get(node.dataset.laMath);
    node.removeAttribute("data-la-math");
    if (!token) continue;
    try {
      katex.render(token.formula, node, {
        displayMode: token.display,
        throwOnError: true,
        trust: false,
        strict: "ignore",
        maxExpand: 500,
        maxSize: 10,
        output: "htmlAndMathml",
      });
    } catch {
      node.classList.add("la-math-fallback");
      node.textContent = token.raw;
    }
  }
  return container.innerHTML;
}
