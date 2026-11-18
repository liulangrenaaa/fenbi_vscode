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
  Eye,
  EyeOff,
  ListOrdered,
  Pause,
  Play,
} from "lucide";
import { renderAnswerMarkdown } from "./markdown.mjs";
import { imageMarker, normalizeImageUrl } from "./image-context.mjs";
import "./ui.css";

export { renderAnswerMarkdown };

const PREPARE_RETRY_DELAY = 30000;
const PREPARE_MAX_RETRIES = 10;

// 提取文本并保留图片原位置，整道题共用编号，防止选项中的分数丢失。
export function extractHtml(html, images = []) {
  const doc = new DOMParser().parseFromString(String(html || ""), "text/html");
  doc.querySelectorAll("script,style").forEach((node) => node.remove());
  doc.querySelectorAll("br,p,div,tr").forEach((node) => node.append("\n"));
  // 按地址去重但保留所有引用位置，无法解析的地址交给宿主明确报错。
  for (const image of Array.from(doc.images)) {
    const raw = image.getAttribute("src") || "";
    const url = normalizeImageUrl(raw) || raw;
    let index = images.indexOf(url);
    if (index === -1) {
      index = images.length;
      images.push(url);
    }
    image.replaceWith(doc.createTextNode(` ${imageMarker(index)} `));
  }
  return {
    text: (doc.body.textContent || "").trim().slice(0, 48000),
    images,
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
  const images = [];
  const stem = extractHtml(question.content, images);
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
    images,
  );
  const options = (question.accessories || [])
    .flatMap((item) => item.options || [])
    .map((option) => extractHtml(option, images));
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
    images,
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
    useLayoutEffect,
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
    // 单选只取本次选项，避免捕获阶段旧选项未取消；多选汇总勾选状态，不改动题库作答。
    function changeAnswer(event) {
      if (!["radio", "checkbox"].includes(event.target.type)) return;
      const checked =
        event.target.type === "radio"
          ? [event.target]
          : Array.from(
              event.currentTarget.querySelectorAll(
                'input[type="checkbox"]:checked',
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
        data-agent-thread={question.threadId}
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

  // 在实际练习工具栏提供批量预解析入口，离开练习时停止未完成的队列。
  function PracticeAgentControls() {
    const context = useContext(Context);
    const controls = context?.controls;
    const commands = context?.commands;
    const element = useRef(null);
    // 工具栏换行时为题干留出真实高度，窄窗口也不会遮住第一道题。
    useLayoutEffect(() => {
      const toolbar = element.current?.closest(".top-bar");
      const container = toolbar?.closest(".question-container");
      if (!container) return;
      // 跟随现有固定工具栏的尺寸调整内容起点。
      function measure() {
        container.style.setProperty(
          "--la-toolbar-height",
          `${toolbar.getBoundingClientRect().height + 8}px`,
        );
      }
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(toolbar);
      return () => {
        observer.disconnect();
        container.style.removeProperty("--la-toolbar-height");
      };
    }, []);
    // 页面离开或交卷后不再继续请求旧练习的题目。
    useEffect(() => () => commands?.current?.leavePractice(), [commands]);
    if (!context) return null;
    const running = controls?.batch?.status === "running";
    const paused = controls?.batch?.status === "paused";
    return (
      <div className="la-practice-controls" ref={element}>
        <button
          type="button"
          className="la-prepare-button"
          disabled={
            !controls?.ready ||
            (!running && controls?.busy) ||
            !context.question
          }
          onClick={() =>
            running
              ? commands.current?.pauseBatch()
              : commands.current?.startBatch()
          }
        >
          <Icon
            icon={running ? Pause : paused ? Play : ListOrdered}
            size={15}
          />
          <span>
            {running ? "暂停预解析" : paused ? "继续预解析" : "预解析本组题目"}
          </span>
        </button>
        {controls?.batch && (
          <span className="la-practice-progress" role="status">
            已就绪 {controls.batch.completed}/{controls.batch.total}
            {controls.batch.failed > 0
              ? ` · 失败 ${controls.batch.failed}`
              : ""}
            {controls.batch.retry && controls.batch.status === "running"
              ? ` · 30 秒后重试 ${controls.batch.retry.attempt}/${PREPARE_MAX_RETRIES}`
              : ""}
          </span>
        )}
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
    const commands = useRef(null);
    const [controls, setControls] = useState(null);
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
    // 按实际页面顺序读取已注册题目，不受用户点击顺序和材料分组编号影响。
    const getQuestions = useCallback(() => {
      const seen = new Set();
      return Array.from(
        workspace.current?.querySelectorAll("[data-agent-thread]") || [],
      )
        .map((element) => registry.current.get(element.dataset.agentThread))
        .filter((item) => {
          if (!item || seen.has(item.threadId)) return false;
          seen.add(item.threadId);
          return true;
        });
    }, []);
    const value = useMemo(
      () => ({ question, register, select: setQuestion, controls, commands }),
      [question, register, controls],
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
            <AgentPanel
              question={question}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              getQuestions={getQuestions}
              commands={commands}
              onControls={setControls}
            />
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

  // 管理逐题会话、顺序预解析及防剧透显示，不改动题库选项和提交行为。
  function AgentPanel({
    question,
    onClose,
    onOpen,
    getQuestions,
    commands,
    onControls,
  }) {
    const [models, setModels] = useState([]);
    const [model, setModel] = useState("");
    const [connection, setConnection] = useState("connecting");
    const [version, setVersion] = useState("");
    const [threads, setThreads] = useState({});
    const [busy, setBusy] = useState(null);
    const [error, setError] = useState("");
    const [drafts, setDrafts] = useState({});
    const [intent, setIntent] = useState("auto");
    const [batch, setBatch] = useState(null);
    const [visibility, setVisibility] = useState({
      threadId: "",
      visible: false,
    });
    const list = useRef(null);
    const followBottom = useRef(true);
    const active = useRef(null);
    const threadsRef = useRef(threads);
    const batchRef = useRef(null);
    const selectedRef = useRef("");
    const currentId = question?.threadId || "";
    const draft = drafts[currentId] || "";
    const thread = threads[currentId] || { messages: [] };
    const messages = thread.messages;
    const currentBusy = busy?.threadId === currentId;
    const showAnswers = visibility.threadId === currentId && visibility.visible;
    selectedRef.current = currentId;

    // 向宿主发送助手专属消息，模型鉴权始终由 OpenCode 管理。
    function post(command, postData = {}) {
      vscode.postMessage({ command, postData });
    }
    // 同步更新缓存和视图，连续到达的增量与完成事件也能读取最新回答。
    function updateThread(threadId, update) {
      const previous = threadsRef.current;
      const next = {
        ...previous,
        [threadId]: update(previous[threadId] || { messages: [] }),
      };
      const keys = Object.keys(next);
      if (keys.length > 300)
        delete next[
          keys.find((key) => key !== selectedRef.current && key !== threadId)
        ];
      threadsRef.current = next;
      setThreads(next);
    }
    // 仅题目内容决定缓存是否可复用，手动作答改变不会使独立解析失效。
    function fingerprint(item) {
      return JSON.stringify([
        item.threadId,
        item.content,
        item.materials,
        item.options,
        item.images,
      ]);
    }
    // 复制队列进度用于展示，避免让后续任务改变已渲染的状态对象。
    function publishBatch() {
      const queue = batchRef.current;
      setBatch(
        queue
          ? {
              status: queue.status,
              total: queue.total,
              completed: queue.completed,
              failed: queue.failed,
              current: queue.index,
              retry: queue.retry,
            }
          : null,
      );
    }
    // 所有手动和自动请求使用同一条发送通道，保证每题只有一个生成任务。
    function dispatch(
      item,
      content,
      requestIntent,
      requestModel,
      prepared = false,
    ) {
      const request = {
        requestId: crypto.randomUUID(),
        threadId: item.threadId,
        prepared,
        fingerprint: fingerprint(item),
        output: "",
        failed: false,
      };
      active.current = request;
      setBusy(request);
      updateThread(item.threadId, (previous) => ({
        ...previous,
        messages: [
          ...previous.messages.slice(-78),
          { role: "user", content: prepared ? "预解析本题" : content },
          { role: "assistant", content: "", requestId: request.requestId },
        ],
        status: "正在发送给 OpenCode…",
        error: "",
        reference: "",
      }));
      post("agent.send", {
        requestId: request.requestId,
        threadId: request.threadId,
        text: content,
        intent: requestIntent,
        model: requestModel,
        question: item,
      });
    }
    // 为当前失败题等待固定间隔，暂停或离页后不会继续启动重试。
    function waitForRetry(queue) {
      clearTimeout(queue.retryTimer);
      queue.retryTimer = null;
      if (batchRef.current !== queue || queue.status !== "running") return;
      queue.retryTimer = setTimeout(() => {
        queue.retryTimer = null;
        advanceBatch(queue);
      }, PREPARE_RETRY_DELAY);
    }
    // 同一题成功或耗尽重试次数后再取下一题，不切换用户正在看的题目。
    function advanceBatch(queue) {
      if (
        batchRef.current !== queue ||
        queue.status !== "running" ||
        active.current ||
        queue.retryTimer !== null
      )
        return;
      const available = new Map(
        getQuestions().map((item) => [item.threadId, item]),
      );
      const next = queue.items[queue.index];
      if (!next) {
        queue.status = "done";
        publishBatch();
        return;
      }
      const item = available.get(next);
      if (!item) {
        leavePractice();
        return;
      }
      queue.retry = null;
      publishBatch();
      dispatch(
        item,
        "请独立分析这道题，给出正确答案和关键解析；有题图时先读图。不要替我选择选项或提交作答。",
        "explain",
        queue.model,
        true,
      );
    }
    // 启动或恢复预解析，保留暂停前的重试预算并跳过已有完整解析。
    function startBatch() {
      if (
        active.current ||
        connection !== "connected" ||
        !document.querySelector(".la-quiz .la-practice-controls") ||
        document.querySelector(".la-workspace")?.dataset.disguised === "true"
      )
        return;
      const previous = batchRef.current;
      if (previous?.status === "running") return;
      if (previous?.status === "paused") {
        previous.status = "running";
        onOpen();
        if (previous.retry) waitForRetry(previous);
        else advanceBatch(previous);
        publishBatch();
        return;
      }
      const items = getQuestions();
      if (!items.length) return;
      const pending = items.filter(
        (item) =>
          threadsRef.current[item.threadId]?.preparedFingerprint !==
          fingerprint(item),
      );
      const queue = {
        items: pending.map((item) => item.threadId),
        index: 0,
        total: items.length,
        completed: items.length - pending.length,
        failed: 0,
        status: "running",
        model,
        retry: null,
        retryCount: 0,
        retryTimer: null,
      };
      setVisibility({ threadId: currentId, visible: false });
      batchRef.current = queue;
      onOpen();
      publishBatch();
      advanceBatch(queue);
    }
    // 暂停时取消生成和重试等待，恢复后仍沿用当前题目的重试次数。
    function pauseBatch() {
      const queue = batchRef.current;
      if (queue?.status === "running") {
        queue.status = "paused";
        clearTimeout(queue.retryTimer);
        queue.retryTimer = null;
        publishBatch();
      }
      if (active.current?.prepared) post("agent.stop");
    }
    // 离开练习时取消重试定时器，迟到的完成事件不会启动旧页面的下一题。
    function leavePractice() {
      clearTimeout(batchRef.current?.retryTimer);
      batchRef.current = null;
      setBatch(null);
      if (active.current?.prepared) post("agent.stop");
    }
    // 停止按钮同时暂停队列，避免停止一题后立即又发出下一题请求。
    function stop() {
      if (active.current?.prepared) pauseBatch();
      else post("agent.stop");
    }
    // 将练习工具栏命令绑定到当前状态，引用本身不触发上下文重新注册。
    commands.current = { startBatch, pauseBatch, leavePractice, hideAnswer };
    // 向题库工具栏发布连接和进度，保留左侧助手收起时的运行状态。
    useEffect(() => {
      onControls({
        ready: connection === "connected",
        busy: Boolean(busy),
        batch,
      });
    }, [connection, busy, batch, onControls]);
    // 每次切题重新隐藏回答，编号变化的首帧也不会渲染另一题的内容。
    useEffect(() => {
      setVisibility({ threadId: currentId, visible: false });
    }, [currentId]);
    // 只有用户主动勾选才展示正文，隐藏时不渲染正文或复制按钮。
    function changeVisibility(event) {
      setVisibility({ threadId: currentId, visible: event.target.checked });
    }
    // 快捷命令只隐藏本题回答，重复执行也不会意外显示答案。
    function hideAnswer() {
      setVisibility({ threadId: currentId, visible: false });
    }

    // 订阅助手事件并在卸载时取消重试等待，避免旧页面继续发送模型请求。
    useEffect(() => {
      // 按请求编号处理回答，预解析失败后最多等待重试十次并保持逐题串行。
      function receive(event) {
        if (event.data?.command === "agent.action") {
          if (event.data.data?.action === "hideAnswer")
            commands.current?.hideAnswer();
          else if (event.data.data?.action === "prepareGroup")
            commands.current?.startBatch();
          return;
        }
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
          request.output += data.text;
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
          request.failed = true;
          updateThread(data.threadId, (previous) => ({
            ...previous,
            error: data.message,
          }));
        } else if (data.type === "done") {
          active.current = null;
          setBusy(null);
          const succeeded =
            !data.cancelled &&
            !request.failed &&
            data.complete !== false &&
            Boolean(request.output.trim());
          updateThread(data.threadId, (previous) => ({
            ...previous,
            status: data.cancelled ? "已停止生成。" : "",
            error:
              request.prepared && !succeeded && !data.cancelled
                ? previous.error || "预解析未完整生成，请重试。"
                : previous.error,
            ...(request.prepared && succeeded
              ? { preparedFingerprint: request.fingerprint }
              : {}),
          }));
          if (request.prepared) {
            const queue = batchRef.current;
            if (queue) {
              if (succeeded) {
                queue.completed += 1;
                queue.index += 1;
                queue.retryCount = 0;
                queue.retry = null;
              } else if (!data.cancelled) {
                if (queue.retryCount < PREPARE_MAX_RETRIES) {
                  queue.retryCount += 1;
                  queue.retry = {
                    threadId: request.threadId,
                    attempt: queue.retryCount,
                  };
                  waitForRetry(queue);
                  publishBatch();
                  return;
                }
                queue.failed += 1;
                queue.index += 1;
                queue.retryCount = 0;
                queue.retry = null;
                updateThread(data.threadId, (previous) => ({
                  ...previous,
                  error: `${previous.error} 自动重试已达 ${PREPARE_MAX_RETRIES} 次，请稍后手动重试。`,
                }));
              } else if (queue.status === "running") {
                queue.status = "paused";
              }
              publishBatch();
              queueMicrotask(() => advanceBatch(queue));
            }
          }
        }
      }
      window.addEventListener("message", receive);
      post("agent.init");
      return () => {
        window.removeEventListener("message", receive);
        clearTimeout(batchRef.current?.retryTimer);
        batchRef.current = null;
      };
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
    // 清空当前会话和预解析等待，让下次提问创建全新的 OpenCode 会话。
    function clear() {
      if (!currentId || busy) return;
      post("agent.clear", { threadId: currentId });
      updateThread(currentId, () => ({ messages: [] }));
      leavePractice();
    }
    // 手动提问先暂停自动重试，保持请求串行且不改动题库作答。
    function send(event) {
      event?.preventDefault();
      const content = draft.trim();
      if (!question || !content || active.current || connection !== "connected")
        return;
      if (batchRef.current?.status === "running") pauseBatch();
      dispatch(question, content, intent, model);
      setDrafts((previous) => ({ ...previous, [currentId]: "" }));
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
        {batch && (
          <div className="la-batch-status" role="status">
            <span>
              {batch.status === "running"
                ? "预解析中"
                : batch.status === "paused"
                  ? "预解析已暂停"
                  : "预解析结束"}
              {" · "}
              {batch.completed}/{batch.total}
              {batch.failed > 0 ? ` · 失败 ${batch.failed}` : ""}
              {batch.retry && batch.status === "running"
                ? ` · 30 秒后重试 ${batch.retry.attempt}/${PREPARE_MAX_RETRIES}`
                : ""}
            </span>
            {batch.status === "running" && (
              <ToolButton
                label="暂停预解析"
                icon={Pause}
                onClick={pauseBatch}
              />
            )}
          </div>
        )}
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
          {(question?.images.length > 0 || question?.userAnswer) && (
            <span className="la-context-answer">
              {[
                question.images.length > 0 &&
                  `含 ${question.images.length} 张题图`,
                question.userAnswer && `已选 ${question.userAnswer}`,
              ]
                .filter(Boolean)
                .join(" · ")}
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
        <div className="la-answer-filter">
          {thread.preparedFingerprint ===
            (question && fingerprint(question)) && (
            <span className="la-prepared-label">解析已就绪</span>
          )}
          <label
            className="la-answer-toggle"
            title={showAnswers ? "隐藏回答" : "显示回答"}
          >
            <input
              type="checkbox"
              aria-label="显示 Agents 回答"
              checked={showAnswers}
              onChange={changeVisibility}
              disabled={!question}
            />
            <Icon icon={showAnswers ? Eye : EyeOff} size={18} />
          </label>
        </div>
        <div
          className="la-transcript"
          ref={list}
          onScroll={scroll}
          aria-live={showAnswers ? "polite" : "off"}
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
                {message.role === "assistant" && showAnswers && (
                  <CopyButton content={message.content} />
                )}
              </div>
              {message.role === "user" ? (
                <div className="la-user-text">{message.content}</div>
              ) : showAnswers ? (
                <Markdown content={message.content} />
              ) : (
                <div className="la-answer-hidden">
                  <Icon icon={EyeOff} size={14} />
                  <span>回答已隐藏</span>
                </div>
              )}
              {message.role === "assistant" &&
                showAnswers &&
                !message.content &&
                currentBusy && <span className="la-pending">正在处理…</span>}
            </article>
          ))}
          {thread.reference && showAnswers && (
            <div className="la-reference">
              <Icon icon={Link2} size={12} />
              {thread.reference}
            </div>
          )}
          {thread.status && (
            <div className="la-status" role="status">
              {showAnswers
                ? thread.status
                : currentBusy
                  ? "正在准备解析…"
                  : "已停止生成。"}
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
                onClick={stop}
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

  return { Layout, QuestionShell, PracticeAgentControls };
}
