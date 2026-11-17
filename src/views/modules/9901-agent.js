// 将独立构建的助手界面接入原题库的 React 和 VS Code 消息通道。
(e, t, n) => {
  const React = n(6540);
  const ui = window.LubanAgentUI.createAgentUI(React, n(8595).getVscodeApi());
  Object.assign(t, ui);
  // 伪装状态同步隐藏助手，同时保留对话和正在阅读的题目。
  t.AgentWorkspace = function AgentWorkspace(props) {
    const disguised = n(2419).useDisguise().disguiseEnabled;
    return React.createElement(ui.Layout, { disguised }, props.children);
  };
};
