// 从安装包提取的模块 6804；导出：App。
(e, t, n) => {
  "use strict";

  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.App = void 0));
  const r = n(6540),
    o = n(4976),
    a = n(236),
    i = n(4784),
    l = n(9053),
    c = n(6598),
    s = n(5192),
    u = n(3959),
    d = n(5180),
    f = n(5603),
    m = n(3793),
    h = n(3640),
    p = n(2419),
    v = n(5114),
    agent = n(9901);
  (n(1998), n(8191));
  var g = function () {
    var e = (0, p.useDisguise)().startDisguise;
    return (
      (0, v.useVscodeMessage)(
        r.useCallback(
          function (t) {
            "showDisguise" === t.command && e();
          },
          [e],
        ),
      ),
      null
    );
  };
  // 在原题库页面外提供左侧助手及题目上下文，不改变原有路由。
  t.App = function () {
    return r.createElement(
      h.SettingProvider,
      null,
      r.createElement(
        p.DisguiseProvider,
        null,
        r.createElement(g, null),
        r.createElement(
          agent.AgentWorkspace,
          {
            className: "app",
          },
          r.createElement(
            o.HashRouter,
            null,
            r.createElement(
              o.Routes,
              null,
              r.createElement(o.Route, {
                index: !0,
                path: "/",
                element: r.createElement(a.Home, null),
              }),
              r.createElement(o.Route, {
                path: "/detail",
                element: r.createElement(l.Detail, null),
              }),
              r.createElement(o.Route, {
                path: "/sydwms-detail",
                element: r.createElement(c.SydwmsDetail, null),
              }),
              r.createElement(o.Route, {
                path: "/history",
                element: r.createElement(i.History, null),
              }),
              r.createElement(o.Route, {
                path: "/answer",
                element: r.createElement(s.Answer, null),
              }),
              r.createElement(o.Route, {
                path: "/errors",
                element: r.createElement(u.Errors, null),
              }),
              r.createElement(o.Route, {
                path: "/errors-detail",
                element: r.createElement(d.ErrorsDetail, null),
              }),
              r.createElement(o.Route, {
                path: "/papers",
                element: r.createElement(f.Papers, null),
              }),
              r.createElement(o.Route, {
                path: "/leaderboard",
                element: r.createElement(m.Leaderboard, null),
              }),
            ),
          ),
        ),
      ),
    );
  };
};
