// 从安装包提取的模块 3793；导出：Leaderboard。
(e, t, n) => {
  "use strict";

  function r(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
        if (null != n) {
          var r,
            o,
            a,
            i,
            l = [],
            c = !0,
            s = !1;
          try {
            if (((a = (n = n.call(e)).next), 0 === t)) {
              if (Object(n) !== n) return;
              c = !1;
            } else for (; !(c = (r = a.call(n)).done) && (l.push(r.value), l.length !== t); c = !0);
          } catch (e) {
            ((s = !0), (o = e));
          } finally {
            try {
              if (!c && null != n.return && ((i = n.return()), Object(i) !== i)) return;
            } finally {
              if (s) throw o;
            }
          }
          return l;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return o(e, t);
          var n = {}.toString.call(e).slice(8, -1);
          return (
            "Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(e)
              : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? o(e, t)
                : void 0
          );
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function o(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.Leaderboard = void 0));
  const a = n(6540),
    i = n(1508),
    l = n(3160),
    c = n(4976),
    s = n(5114),
    u = n(8595);
  n(629);
  var d = (0, u.getVscodeApi)(),
    f = function (e) {
      return "".concat((100 * e).toFixed(1), "%");
    };
  t.Leaderboard = function () {
    var e = (0, c.useNavigate)(),
      t = r(a.useState("quantity"), 2),
      n = t[0],
      o = t[1],
      u = r(a.useState(1), 2),
      m = u[0],
      h = u[1],
      p = r(a.useState(), 2),
      v = p[0],
      g = p[1],
      b = r(a.useState(!0), 2),
      y = b[0],
      w = b[1],
      x = r(a.useState(""), 2),
      C = x[0],
      E = x[1],
      S = a.useRef(""),
      A = a.useRef(0),
      k = a.useRef(null),
      $ = a.useCallback(
        function () {
          var e = "".concat(Date.now(), "-").concat(++A.current);
          ((S.current = e),
            w(!0),
            E(""),
            g(void 0),
            k.current && (k.current.scrollTop = 0),
            d.postMessage({
              command: "getLeaderboard",
              postData: {
                sort: n,
                page: m,
                requestId: e,
              },
            }));
        },
        [n, m],
      );
    return (
      (0, s.useVscodeMessage)(function (e) {
        if ("leaderboard" === e.command) {
          var t = e.data;
          if (t.requestId !== S.current) return;
          (g(t), w(!1));
        }
        if ("leaderboardError" === e.command) {
          var n = e.data;
          if (n.requestId !== S.current) return;
          (E(n.message), w(!1));
        }
      }),
      a.useEffect($, [$]),
      a.useEffect(
        function () {
          if (v) {
            var e = Date.parse("".concat(v.date, "T00:00:00+08:00")) + 864e5,
              t = Math.max(1e3, e - Date.parse(v.updatedAt) + 1e3),
              n = window.setTimeout(function () {
                1 === m ? $() : h(1);
              }, t);
            return function () {
              return window.clearTimeout(n);
            };
          }
        },
        [v, $, m],
      ),
      a.createElement(
        "div",
        {
          className: "leaderboard-page",
        },
        a.createElement(
          "header",
          {
            className: "leaderboard-header",
          },
          a.createElement(
            i.Tooltip,
            {
              title: "返回上一页",
            },
            a.createElement(i.Button, {
              type: "text",
              "aria-label": "返回上一页",
              icon: a.createElement(l.ArrowLeftOutlined, null),
              onClick: function () {
                return e(-1);
              },
            }),
          ),
          a.createElement("h2", null, a.createElement(l.TrophyOutlined, null), " 今日排行榜"),
          a.createElement(
            i.Tooltip,
            {
              title: "刷新排行榜",
            },
            a.createElement(i.Button, {
              "aria-label": "刷新排行榜",
              icon: a.createElement(l.ReloadOutlined, null),
              disabled: y,
              onClick: $,
            }),
          ),
        ),
        a.createElement(
          "div",
          {
            className: "leaderboard-date",
          },
          v ? "".concat(v.date, " · 北京时间") : "今日 · 北京时间",
        ),
        a.createElement(i.Tabs, {
          activeKey: n,
          items: [
            {
              key: "quantity",
              label: "答题量榜",
            },
            {
              key: "winRate",
              label: "胜率榜",
            },
          ],
          onChange: function (e) {
            (o(e), h(1));
          },
        }),
        C &&
          a.createElement(i.Alert, {
            type: "error",
            showIcon: !0,
            message: C,
            action: a.createElement(
              i.Button,
              {
                size: "small",
                onClick: $,
              },
              "重试",
            ),
          }),
        a.createElement(
          i.Spin,
          {
            spinning: y,
          },
          a.createElement(
            "div",
            {
              className: "leaderboard-content",
              "aria-busy": y,
            },
            (null == v ? void 0 : v.me) &&
              a.createElement(
                "div",
                {
                  className: "leaderboard-own",
                },
                a.createElement("span", null, "我 · ", v.me.nickname),
                a.createElement(
                  "span",
                  null,
                  null === v.me.rank ? "未上榜" : "第 ".concat(v.me.rank, " 名"),
                ),
                a.createElement("span", null, v.me.questionCount, " 题"),
                a.createElement("span", null, f(v.me.winRate)),
              ),
            a.createElement(
              "div",
              {
                className: "leaderboard-table-scroll",
                ref: k,
                tabIndex: 0,
                role: "region",
                "aria-label": "排行榜列表",
              },
              a.createElement(
                "table",
                {
                  className: "leaderboard-table",
                },
                a.createElement(
                  "colgroup",
                  null,
                  a.createElement("col", {
                    className: "rank-column",
                  }),
                  a.createElement("col", null),
                  a.createElement("col", {
                    className: "count-column",
                  }),
                  a.createElement("col", {
                    className: "rate-column",
                  }),
                ),
                a.createElement(
                  "thead",
                  null,
                  a.createElement(
                    "tr",
                    null,
                    a.createElement(
                      "th",
                      {
                        scope: "col",
                      },
                      "排名",
                    ),
                    a.createElement(
                      "th",
                      {
                        scope: "col",
                      },
                      "用户昵称",
                    ),
                    a.createElement(
                      "th",
                      {
                        scope: "col",
                      },
                      "答题量",
                    ),
                    a.createElement(
                      "th",
                      {
                        scope: "col",
                      },
                      "胜率",
                    ),
                  ),
                ),
                a.createElement(
                  "tbody",
                  null,
                  null == v
                    ? void 0
                    : v.entries.map(function (e) {
                        var t;
                        return a.createElement(
                          "tr",
                          {
                            key: e.userId,
                            className:
                              e.userId === (null === (t = v.me) || void 0 === t ? void 0 : t.userId)
                                ? "is-current-user"
                                : "",
                          },
                          a.createElement("td", null, e.rank),
                          a.createElement("td", null, e.nickname),
                          a.createElement("td", null, e.questionCount),
                          a.createElement("td", null, f(e.winRate)),
                        );
                      }),
                ),
              ),
              !y &&
                !C &&
                !(null != v && v.entries.length) &&
                a.createElement(i.Empty, {
                  description: "今日暂无上榜用户",
                }),
            ),
          ),
        ),
        v &&
          v.total > v.pageSize &&
          a.createElement(
            "footer",
            {
              className: "leaderboard-footer",
            },
            a.createElement(i.Pagination, {
              size: "small",
              current: v.page,
              pageSize: v.pageSize,
              total: v.total,
              showSizeChanger: !1,
              onChange: h,
            }),
          ),
      )
    );
  };
};
