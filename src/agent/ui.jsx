import {
  Bot,
  Send,
  Square,
  Plus,
  RefreshCw,
  PanelLeftClose,
  PanelLeftOpen,
  Link2,
  Copy,
  Check,
} from "lucide";
import { renderAnswerMarkdown } from "./markdown.mjs";
import "./ui.css";

export { renderAnswerMarkdown };

// 从题库 HTML 中提取文本及图片，不将题库原始对象发给模型。
export function extractHtml(html) {
  const doc = new DOMParser().parseFromString(String(html || ""), "text/html");
  doc.querySelectorAll("script,style").forEach((node) => node.remove());
  doc.querySelectorAll("br,p,div,tr").forEach((node) => node.append("\n"));
  return {
    text: (doc.body.textContent || "").trim().slice(0, 48000),
    images: Array.from(doc.images)
      .map((image) => image.getAttribute("src"))
      .filter((url) => /^https?:\/\//i.test(url || "")),
  };
}

// 整理材料索引、题干和当前作答，隐藏尚未请求的正确答案及解析。
export function buildQuestion({
  question,
  materials = [],
  materialIndex = 0,
  category = "xingce",
  number,
}) {
  const id = String(question.globalId || question.id || "");
  const stem = extractHtml(question.content);
  const indexes = Array.isArray(question.materialIndexes)
    ? question.materialIndexes
    : [];
  const materialItems = indexes.length
    ? indexes.map((index) => materials[index]).filter(Boolean)
    : materials[materialIndex]
      ? [materials[materialIndex]]
      : [];
  const material = extractHtml(
    typeof question.agentMaterialContent === "string"
      ? question.agentMaterialContent
      : typeof question.materialContent === "string"
        ? question.materialContent
        : materialItems
            .map((item) => item.content || item.materialContent || "")
            .join("\n"),
  );
  const options = (question.accessories || [])
    .flatMap((item) => item.options || [])
    .map(extractHtml);
  const rawChoice = question.userAnswer?.choice;
  const choices = Array.isArray(rawChoice)
    ? rawChoice
    : String(rawChoice ?? "").split("");
  return {
    id,
    category,
    threadId: `${category}:${id}`,
    number,
    content: stem.text,
    materials: material.text,
    options: options.map((option) => option.text),
    images: [
      ...new Set([
        ...stem.images,
        ...material.images,
        ...options.flatMap((option) => option.images),
      ]),
    ].slice(0, 12),
    userAnswer: choices
      .filter((choice) => /^\d+$/.test(String(choice)))
      .map((choice) => String.fromCharCode(65 + Number(choice)))
      .join("、"),
  };
}

// 使用题库既有的 React 实例，避免在旧 webpack 页面中加载第二份 React。
export function createAgentUI(React, vscode) {
  const {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef,
    useContext,
    createContext,
  } = React;
  const Context = createContext(null);

  // 使用 Lucide 图标节点渲染稳定大小的工具按钮。
  function Icon({ icon, size = 16 }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {icon.map(([tag, attrs], index) =>
          React.createElement(tag, { ...attrs, key: index }),
        )}
      </svg>
    );
  }

  // 提供原生提示和无障碍名称，常用操作使用标准图标。
  function ToolButton({
    label,
    icon,
    onClick,
    disabled = false,
    className = "",
  }) {
    return (
      <button
        type="button"
        className={`la-icon ${className}`}
        title={label}
        aria-label={label}
        onClick={onClick}
        disabled={disabled}
      >
        <Icon icon={icon} />
      </button>
    );
  }

  // 将回答排版为 Markdown 和数学公式，同时净化模型提供的 HTML。
  function Markdown({ content }) {
    const html = useMemo(() => renderAnswerMarkdown(content), [content]);
    return (
      <div className="la-markdown" dangerouslySetInnerHTML={{ __html: html }} />
    );
  }

  // 为当前题目的回答提供复制操作。
  function CopyButton({ content }) {
    const [copied, setCopied] = useState(false);
    const timeout = useRef(null);
    // 卸载时清理复制状态定时器。
    useEffect(() => () => clearTimeout(timeout.current), []);
    // 在用户点击后访问剪贴板，失败时保留原始对话。
    async function copy() {
      try {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        timeout.current = setTimeout(() => setCopied(false), 1600);
      } catch {
        setCopied(false);
      }
    }
    return (
      <ToolButton
        label={copied ? "已复制" : "复制回答"}
        icon={copied ? Check : Copy}
        onClick={copy}
        disabled={!content}
      />
    );
  }

  // 在题目区域注册上下文，并通过点击、聚焦或选择文字自动激活该题。
  function QuestionShell(props) {
    const context = useContext(Context);
    const [answer, setAnswer] = useState(null);
    const normalized = buildQuestion(props);
    normalized.userAnswer = answer ?? normalized.userAnswer;
    const serialized = JSON.stringify(normalized);
    const question = useMemo(() => JSON.parse(serialized), [serialized]);
    // 后端重新载入题目或作答时，采用后端返回的答案。
    useEffect(
      () => setAnswer(null),
      [question.threadId, props.question.userAnswer?.choice],
    );
    // 同步当前作答变化，卸载题目时从可选上下文中移除。
    useEffect(() => {
      if (!context || !question.id) return;
      return context.register(question);
    }, [context?.register, question]);
    // 点击题目时只更新上下文，不改动原有选项和作答事件。
    function select() {
      if (question.id) context?.select(question);
    }
    // 原题库使用非受控选项，从实际选中状态同步最新答案，不拦截原有提交消息。
    function changeAnswer(event) {
      if (!["radio", "checkbox"].includes(event.target.type)) return;
      const checked = Array.from(
        event.currentTarget.querySelectorAll(
          'input[type="radio"]:checked,input[type="checkbox"]:checked',
        ),
      );
      const value = checked
        .map((input) => Number(input.value))
        .filter(Number.isFinite)
        .map((index) => String.fromCharCode(65 + index))
        .join("、");
      setAnswer(value);
      context?.select({ ...question, userAnswer: value });
    }
    return (
      <div
        data-agent-question={question.id}
        className={
          context?.question?.threadId === question.threadId
            ? "la-question-active"
            : ""
        }
        onPointerDownCapture={select}
        onFocusCapture={select}
        onChangeCapture={changeAnswer}
      >
        {props.children}
      </div>
    );
  }

  // 维护题目上下文和左侧助手分栏，记住用户调整后的宽度比例。
  function Layout({ children, disguised }) {
    const [question, setQuestion] = useState(null);
    const [open, setOpen] = useState(true);
    // 恢复独立的分栏状态，不覆盖题库和智能伪装保存的数据。
    const [ratio, setRatio] = useState(() => {
      const saved = vscode.getState?.()?.agentSplitRatio;
      return Number.isFinite(saved) && saved >= 0.1 && saved <= 0.9
        ? saved
        : 0.3;
    });
    const [width, setWidth] = useState(0);
    const [dragging, setDragging] = useState(false);
    const workspace = useRef(null);
    const drag = useRef(null);
    const ratioRef = useRef(ratio);
    const registry = useRef(new Map());
    const minRatio = width > 650 ? 260 / width : 0.1;
    const maxRatio = width > 650 ? (width - 326) / width : 0.9;
    const visibleRatio = Math.min(maxRatio, Math.max(minRatio, ratio));
    // 窗口尺寸变化只调整可见宽度，保留用户在宽窗口中选择的比例。
    useEffect(() => {
      const observer = new ResizeObserver(([entry]) =>
        setWidth(entry.contentRect.width),
      );
      observer.observe(workspace.current);
      return () => observer.disconnect();
    }, []);
    // 限制两侧的最小可用宽度，同时同步拖动结束时要保存的最新比例。
    function updateSplit(next) {
      const bounded = Math.min(maxRatio, Math.max(minRatio, next));
      ratioRef.current = bounded;
      setRatio(bounded);
    }
    // 合并当前网页状态，避免拖动分栏清除智能伪装等已有设置。
    function persistSplit() {
      vscode.setState?.({
        ...(vscode.getState?.() || {}),
        agentSplitRatio: ratioRef.current,
      });
    }
    // 捕获指针，拖动经过题库和助手时仍由同一个分隔条接收事件。
    function startResize(event) {
      if (event.button !== 0 || width <= 650) return;
      event.preventDefault();
      drag.current = {
        pointerId: event.pointerId,
        offset:
          event.clientX - event.currentTarget.getBoundingClientRect().left,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
    }
    // 根据指针相对工作区的位置更新宽度，拖到边缘时保留题库可用空间。
    function resize(event) {
      if (drag.current?.pointerId !== event.pointerId) return;
      const bounds = workspace.current.getBoundingClientRect();
      updateSplit(
        (event.clientX - bounds.left - drag.current.offset) / bounds.width,
      );
    }
    // 松开、取消或丢失指针捕获时结束拖动并保存最终比例。
    function finishResize(event) {
      if (drag.current?.pointerId !== event.pointerId) return;
      drag.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId))
        event.currentTarget.releasePointerCapture(event.pointerId);
      setDragging(false);
      persistSplit();
    }
    // 支持方向键微调以及 Home、End 快速移动到两端限制。
    function resizeWithKeyboard(event) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
        return;
      event.preventDefault();
      const step = (event.shiftKey ? 48 : 16) / width;
      updateSplit(
        event.key === "Home"
          ? minRatio
          : event.key === "End"
            ? maxRatio
            : visibleRatio + (event.key === "ArrowLeft" ? -step : step),
      );
      persistSplit();
    }
    // 首道显示的题目自动成为上下文，已有当前题目则同步它的最新作答。
    const register = useCallback((item) => {
      registry.current.set(item.threadId, item);
      setQuestion((current) =>
        !current ||
        current.threadId === item.threadId ||
        !registry.current.has(current.threadId)
          ? item
          : current,
      );
      // 清除已离开页面的题目，切回首页时不残留旧题。
      return () => {
        if (registry.current.get(item.threadId) === item)
          registry.current.delete(item.threadId);
        // 等本轮更新重新注册完成，避免修改答案时误切到旁边的题目。
        queueMicrotask(() =>
          setQuestion((current) =>
            current && !registry.current.has(current.threadId)
              ? registry.current.values().next().value || null
              : current,
          ),
        );
      };
    }, []);
    const value = useMemo(
      () => ({ question, register, select: setQuestion }),
      [question, register],
    );
    return (
      <Context.Provider value={value}>
        <div
          ref={workspace}
          className={`la-workspace ${open ? "la-open" : "la-closed"}${dragging ? " la-resizing" : ""}`}
          data-disguised={Boolean(disguised)}
          style={{ "--la-agent-width": `${visibleRatio * 100}%` }}
        >
          <div className="la-agent-slot" hidden={!open || disguised}>
            <AgentPanel question={question} onClose={() => setOpen(false)} />
          </div>
          <div
            className="la-splitter"
            role="separator"
            aria-label="调整助手宽度"
            aria-orientation="vertical"
            aria-controls="luban-agent-panel"
            aria-valuemin={Math.round(minRatio * 100)}
            aria-valuemax={Math.round(maxRatio * 100)}
            aria-valuenow={Math.round(visibleRatio * 100)}
            tabIndex={0}
            hidden={!open || disguised}
            onPointerDown={startResize}
            onPointerMove={resize}
            onPointerUp={finishResize}
            onPointerCancel={finishResize}
            onLostPointerCapture={finishResize}
            onKeyDown={resizeWithKeyboard}
          />
          <main className="la-quiz" aria-label="题库">
            <div className="app">{children}</div>
          </main>
          {!open && !disguised && (
            <div className="la-reopen">
              <ToolButton
                label="打开 OpenCode 助手"
                icon={PanelLeftOpen}
                onClick={() => setOpen(true)}
              />
            </div>
          )}
        </div>
      </Context.Provider>
    );
  }

  // 展示 OpenCode 模型、当前题目、流式对话和停止生成控件。
  function AgentPanel({ question, onClose }) {
    const [models, setModels] = useState([]);
    const [model, setModel] = useState("");
    const [connection, setConnection] = useState("connecting");
    const [version, setVersion] = useState("");
    const [threads, setThreads] = useState({});
    const [busy, setBusy] = useState(null);
    const [error, setError] = useState("");
    const [drafts, setDrafts] = useState({});
    const [intent, setIntent] = useState("auto");
    const list = useRef(null);
    const followBottom = useRef(true);
    const active = useRef(null);
    const currentId = question?.threadId || "";
    const draft = drafts[currentId] || "";
    const thread = threads[currentId] || { messages: [] };
    const messages = thread.messages;
    const currentBusy = busy?.threadId === currentId;

    // 向宿主发送助手专属消息，模型鉴权始终由 OpenCode 管理。
    function post(command, postData = {}) {
      vscode.postMessage({ command, postData });
    }
    // 更新指定会话，旧题的增量不会显示到新题。
    function updateThread(threadId, update) {
      setThreads((previous) => {
        const next = {
          ...previous,
          [threadId]: update(previous[threadId] || { messages: [] }),
        };
        const keys = Object.keys(next);
        if (keys.length > 100)
          delete next[
            keys.find((key) => key !== currentId && key !== threadId)
          ];
        return next;
      });
    }

    // 订阅助手事件后才初始化，避免错过快速返回的模型列表。
    useEffect(() => {
      // 依据请求编号处理增量，避免停止、新会话后的迟到事件污染页面。
      function receive(event) {
        if (event.data?.command !== "agent.event") return;
        const data = event.data.data || {};
        if (data.type === "config") {
          setModels(data.models || []);
          setModel(data.model || "");
          setVersion(data.version || "");
          setConnection("connected");
          setError("");
          return;
        }
        if (data.type === "connection") {
          setConnection(data.connected ? "connected" : "error");
          return;
        }
        if (data.type === "cleared") {
          updateThread(data.threadId, () => ({ messages: [] }));
          return;
        }
        if (data.type === "error" && !data.requestId) {
          setError(data.message);
          setConnection("error");
          return;
        }
        const request = active.current;
        if (
          !request ||
          data.requestId !== request.requestId ||
          data.threadId !== request.threadId
        )
          return;
        if (data.type === "delta") {
          updateThread(data.threadId, (previous) => ({
            ...previous,
            status: "",
            messages: previous.messages.map((message) =>
              message.requestId === data.requestId
                ? { ...message, content: message.content + data.text }
                : message,
            ),
          }));
        } else if (data.type === "reference") {
          updateThread(data.threadId, (previous) => ({
            ...previous,
            reference: data.message,
          }));
        } else if (data.type === "status") {
          updateThread(data.threadId, (previous) => ({
            ...previous,
            status: data.message,
          }));
        } else if (data.type === "error") {
          updateThread(data.threadId, (previous) => ({
            ...previous,
            error: data.message,
          }));
        } else if (data.type === "done") {
          active.current = null;
          setBusy(null);
          updateThread(data.threadId, (previous) => ({
            ...previous,
            status: data.cancelled ? "已停止生成。" : "",
          }));
        }
      }
      window.addEventListener("message", receive);
      post("agent.init");
      return () => window.removeEventListener("message", receive);
    }, []);

    // 保持用户正在阅读的滚动位置，位于底部时才跟随新输出。
    useEffect(() => {
      if (followBottom.current && list.current)
        list.current.scrollTop = list.current.scrollHeight;
    }, [messages, thread.status, thread.error]);
    // 切换题目时定位到该题最近的对话。
    useEffect(() => {
      followBottom.current = true;
      if (list.current) list.current.scrollTop = list.current.scrollHeight;
    }, [currentId]);

    // 在界面和 OpenCode 中保存模型选择。
    function changeModel(event) {
      setModel(event.target.value);
      post("agent.model", { model: event.target.value });
    }
    // 重新发现模型或恢复中断的 ACP 连接。
    function reconnect() {
      setConnection("connecting");
      setError("");
      post("agent.models");
    }
    // 清空当前题目的对话并让下次提问创建全新 OpenCode 会话。
    function clear() {
      if (!currentId || busy) return;
      post("agent.clear", { threadId: currentId });
      updateThread(currentId, () => ({ messages: [] }));
    }
    // 提交当前题目的问题，不自动点击选项或提交试卷。
    function send(event) {
      event?.preventDefault();
      const content = draft.trim();
      if (!question || !content || busy || connection !== "connected") return;
      const requestId = crypto.randomUUID();
      const request = { requestId, threadId: currentId };
      active.current = request;
      setBusy(request);
      updateThread(currentId, (previous) => ({
        messages: [
          ...previous.messages.slice(-78),
          { role: "user", content },
          { role: "assistant", content: "", requestId },
        ],
        status: "正在发送给 OpenCode…",
        error: "",
        reference: "",
      }));
      setDrafts((previous) => ({ ...previous, [currentId]: "" }));
      post("agent.send", {
        ...request,
        text: content,
        intent,
        model,
        question,
      });
    }
    // 输入过程中保留每道题尚未发送的草稿。
    function changeDraft(event) {
      setDrafts((previous) => ({
        ...previous,
        [currentId]: event.target.value,
      }));
    }
    // Enter 发送、Shift+Enter 换行，中文输入法确认词语时不发送。
    function keyDown(event) {
      if (
        event.key === "Enter" &&
        !event.shiftKey &&
        !event.nativeEvent.isComposing &&
        event.keyCode !== 229
      ) {
        event.preventDefault();
        send();
      }
    }
    // 根据用户的滚动行为决定是否继续自动跟随输出。
    function scroll() {
      const element = list.current;
      followBottom.current =
        element.scrollHeight - element.scrollTop - element.clientHeight < 64;
    }

    return (
      <aside
        id="luban-agent-panel"
        className="la-agent"
        aria-label="OpenCode 解题助手"
      >
        <header className="la-header">
          <div className="la-title">
            <Icon icon={Bot} />
            <strong>Agents</strong>
            <span
              className="la-engine"
              title={version ? `OpenCode ${version}` : "OpenCode"}
            >
              OpenCode
            </span>
          </div>
          <div className="la-tools">
            <ToolButton
              label="新建当前题目会话"
              icon={Plus}
              onClick={clear}
              disabled={!question || Boolean(busy)}
            />
            <ToolButton
              label="重新连接并刷新模型"
              icon={RefreshCw}
              onClick={reconnect}
              disabled={Boolean(busy) || connection === "connecting"}
            />
            <ToolButton
              label="收起助手"
              icon={PanelLeftClose}
              onClick={onClose}
            />
          </div>
        </header>
        <div className="la-model-row">
          <span
            className={`la-dot la-${connection}`}
            title={
              connection === "connected"
                ? "OpenCode 已连接"
                : connection === "connecting"
                  ? "正在连接"
                  : "连接失败"
            }
          />
          <select
            aria-label="OpenCode 模型"
            value={model}
            onChange={changeModel}
            disabled={Boolean(busy) || connection !== "connected"}
          >
            {!models.length && (
              <option value="">
                {connection === "connecting"
                  ? "正在连接 OpenCode…"
                  : "暂无可用模型"}
              </option>
            )}
            {models.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <section className="la-context" aria-label="当前题目上下文">
          <div className="la-context-title">
            <Icon icon={Link2} size={13} />
            <span>
              {question
                ? `当前题目${question.number ? ` · 第 ${question.number} 题` : ""}`
                : "尚未选择题目"}
            </span>
            {question && <span className="la-question-id">#{question.id}</span>}
          </div>
          {question && (
            <p title={question.content}>{question.content || "图片题"}</p>
          )}
          {question?.userAnswer && (
            <span className="la-context-answer">
              已选 {question.userAnswer}
            </span>
          )}
        </section>
        {error && (
          <div role="alert" className="la-error la-connection-error">
            {error}
            <button
              type="button"
              onClick={reconnect}
              disabled={connection === "connecting"}
            >
              重新连接
            </button>
          </div>
        )}
        <div
          className="la-transcript"
          ref={list}
          onScroll={scroll}
          aria-live="polite"
          aria-relevant="additions text"
        >
          {!messages.length && (
            <div className="la-empty">
              <Icon icon={Bot} size={26} />
              <span>{question ? "这道题，你想问什么？" : "等待题目"}</span>
            </div>
          )}
          {messages.map((message, index) => (
            <article
              className={`la-message la-${message.role}`}
              key={message.requestId || index}
            >
              <div className="la-message-header">
                <span>{message.role === "user" ? "你" : "OpenCode"}</span>
                {message.role === "assistant" && (
                  <CopyButton content={message.content} />
                )}
              </div>
              {message.role === "user" ? (
                <div className="la-user-text">{message.content}</div>
              ) : (
                <Markdown content={message.content} />
              )}
              {message.role === "assistant" &&
                !message.content &&
                currentBusy && <span className="la-pending">正在处理…</span>}
            </article>
          ))}
          {thread.reference && (
            <div className="la-reference">
              <Icon icon={Link2} size={12} />
              {thread.reference}
            </div>
          )}
          {thread.status && (
            <div className="la-status" role="status">
              {thread.status}
            </div>
          )}
          {thread.error && (
            <div role="alert" className="la-error">
              {thread.error}
            </div>
          )}
        </div>
        <form className="la-composer" onSubmit={send}>
          <div className="la-intent">
            <select
              aria-label="提问意图"
              value={intent}
              onChange={(event) => setIntent(event.target.value)}
            >
              <option value="auto">自由提问</option>
              <option value="hint">提示思路</option>
              <option value="explain">详细解析</option>
              <option value="check">核对答案</option>
            </select>
            {busy && !currentBusy && (
              <span className="la-other-busy">另一题正在生成</span>
            )}
          </div>
          <textarea
            aria-label="向 OpenCode 提问"
            placeholder={question ? "问问这道题…" : "请先打开一道题目"}
            value={draft}
            onChange={changeDraft}
            onKeyDown={keyDown}
            rows={3}
            maxLength={12000}
            disabled={!question}
          />
          <div className="la-compose-actions">
            <span className={`la-connection-label la-${connection}`}>
              {connection === "connected"
                ? "OpenCode"
                : connection === "connecting"
                  ? "连接中…"
                  : "未连接"}
            </span>
            {busy ? (
              <button
                className="la-send la-stop"
                type="button"
                onClick={() => post("agent.stop")}
                title="停止生成"
                aria-label="停止生成"
              >
                <Icon icon={Square} size={14} />
                <span>停止</span>
              </button>
            ) : (
              <button
                className="la-send"
                type="submit"
                disabled={
                  !question || !draft.trim() || connection !== "connected"
                }
                title="发送"
                aria-label="发送"
              >
                <Icon icon={Send} size={15} />
              </button>
            )}
          </div>
        </form>
      </aside>
    );
  }

  return { Layout, QuestionShell };
}
