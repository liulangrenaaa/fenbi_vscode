// 从安装包提取的模块 3959；导出：Errors。
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
    (t.Errors = void 0));
  const a = n(6540),
    i = n(1508),
    l = n(4976),
    c = n(2),
    s = n(3640),
    u = n(5114),
    d = n(8595),
    f = n(2961);
  n(2045);
  var m = (0, d.getVscodeApi)(),
    h = function (e) {
      return e.childrenLabels || e.children || [];
    },
    p = function () {
      var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).reduce(
        function (e, t) {
          var n = (t.questionIds || []).map(function (e) {
              return String(e);
            }),
            r = p(h(t));
          return e.concat(n, r);
        },
        [],
      );
      return Array.from(new Set(e.filter(Boolean)));
    },
    v = function (e) {
      var t;
      return (
        e.wrongCount ||
        e.count ||
        (null === (t = e.questionIds) || void 0 === t ? void 0 : t.length) ||
        p(h(e)).length
      );
    },
    g = function () {
      var e = arguments.length > 1 ? arguments[1] : void 0,
        t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "error";
      return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).map(
        function (n, r) {
          var o = h(n),
            l = v(n),
            c = "".concat(t, "-").concat(n.id || r);
          return {
            key: c,
            title: a.createElement(
              i.Flex,
              {
                className: "error-tree-node-title",
                justify: "space-between",
                align: "center",
              },
              a.createElement(
                "span",
                {
                  className: "error-tree-node-text",
                },
                n.name || "未命名",
                " (",
                l,
                ")",
              ),
              a.createElement(
                i.Button,
                {
                  className: "error-tree-node-action",
                  size: "small",
                  disabled: !l,
                  onClick: function (t) {
                    (t.stopPropagation(), e(n));
                  },
                },
                "开始练习",
              ),
            ),
            children: g(o, e, c),
          };
        },
      );
    };
  t.Errors = function () {
    var e = r(i.message.useMessage(), 2),
      t = e[0],
      n = e[1],
      o = r(a.useState(!0), 2),
      d = o[0],
      h = o[1],
      b = r(a.useState([]), 2),
      y = b[0],
      w = b[1],
      x = r(a.useState(0), 2),
      C = x[0],
      E = x[1],
      S = (0, l.useNavigate)(),
      A = (0, l.useLocation)(),
      k = (0, s.useSetting)().setting,
      $ = (A.state || {}).category || k.categoryId || f.SELECTENUM.XINGCE,
      z = a.useCallback(
        function (e) {
          var n = v(e),
            r = (function (e) {
              return e.categoryId || e.keypointId || e.id;
            })(e);
          r && n
            ? S("/errors-detail", {
                state: {
                  category: $,
                  categoryId: r,
                  errorTotal: n,
                  errorPageSize: 10,
                  fallbackQuestionIds: p([e]),
                  title: e.name || "我的错题",
                },
              })
            : t.info("当前知识点暂无可练习错题");
        },
        [$, t, S],
      );
    return (
      a.useEffect(
        function () {
          m.postMessage({
            command: "getErrorKeypointTree",
            postData: {
              category: $,
            },
          });
        },
        [$],
      ),
      (0, u.useVscodeMessage)(
        a.useCallback(
          function (e) {
            var n;
            if (
              ("message" === e.command &&
                (h(!1), t.info((null === (n = e.data) || void 0 === n ? void 0 : n.message) || "")),
              "errorKeypointTree" === e.command)
            ) {
              var r = e.data || [];
              (w(g(r, z)),
                E(
                  (function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                      t = p(e);
                    return t.length
                      ? t.length
                      : e.reduce(function (e, t) {
                          return e + v(t);
                        }, 0);
                  })(r),
                ),
                h(!1));
            }
          },
          [t, z],
        ),
      ),
      a.createElement(
        "div",
        {
          className: "detail_page",
        },
        a.createElement(
          i.Spin,
          {
            tip: "loading...",
            spinning: d,
          },
          a.createElement(
            "div",
            {
              className: "question-container error-question-page",
            },
            a.createElement(
              "div",
              {
                className: "top-bar",
              },
              a.createElement(
                i.Button,
                {
                  type: "text",
                  onClick: function () {
                    S(-1);
                  },
                },
                "返回上一页",
              ),
            ),
            a.createElement(
              i.Flex,
              {
                justify: "space-between",
                align: "center",
                gap: 8,
                className: "error-question-header",
              },
              a.createElement(
                "div",
                null,
                a.createElement(
                  "div",
                  {
                    className: "error-question-title",
                  },
                  "我的错题",
                ),
                a.createElement(
                  "div",
                  {
                    className: "error-question-subtitle",
                  },
                  "按知识点归类，共 ",
                  C,
                  " 题",
                ),
              ),
            ),
            y.length > 0 &&
              a.createElement(
                "div",
                {
                  className: "error-tree-container",
                },
                a.createElement(c.CustomTree, {
                  treeData: y,
                }),
              ),
            y.length || d
              ? null
              : a.createElement(i.Empty, {
                  description: "暂无错题",
                }),
          ),
        ),
        n,
      )
    );
  };
};
