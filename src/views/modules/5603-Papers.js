// 从安装包提取的模块 5603；导出：Papers。
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
      o(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function o(e, t) {
    if (e) {
      if ("string" == typeof e) return a(e, t);
      var n = {}.toString.call(e).slice(8, -1);
      return (
        "Object" === n && e.constructor && (n = e.constructor.name),
        "Map" === n || "Set" === n
          ? Array.from(e)
          : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? a(e, t)
            : void 0
      );
    }
  }
  function a(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.Papers = void 0));
  const i = n(6540),
    l = n(3160),
    c = n(1508),
    s = n(4976),
    u = n(3640),
    d = n(5114),
    f = n(8595);
  n(4979);
  var m = (0, f.getVscodeApi)(),
    h = function (e) {
      var t;
      return null !== (t = e.paperId) && void 0 !== t ? t : e.id;
    },
    p = function (e) {
      return e.name || e.title || String(e.paperName || "历年试卷");
    };
  t.Papers = function () {
    var e = r(c.message.useMessage(), 2),
      t = e[0],
      n = e[1],
      f = (0, u.useSetting)().setting,
      v = (0, s.useLocation)(),
      g = (0, s.useNavigate)(),
      b = (v.state || {}).category || f.categoryId || "xingce",
      y = r(
        i.useState({
          labels: [],
          papers: [],
          page: 1,
          pageSize: 12,
        }),
        2,
      ),
      w = y[0],
      x = y[1],
      C = r(i.useState(""), 2),
      E = C[0],
      S = C[1],
      A = r(i.useState(!0), 2),
      k = A[0],
      $ = A[1],
      z = i.useCallback(
        function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : E;
          ($(!0),
            m.postMessage({
              command: "getPaperCatalog",
              postData: {
                category: b,
                page: e,
                pageSize: 12,
                labelId: t,
              },
            }));
        },
        [b, E],
      );
    (i.useEffect(
      function () {
        z(1, "");
      },
      [z],
    ),
      (0, d.useVscodeMessage)(
        i.useCallback(
          function (e) {
            var n;
            ("paperCatalog" === e.command &&
              (x(function (t) {
                return e.data || t;
              }),
              $(!1)),
              "message" === e.command &&
                (t.info((null === (n = e.data) || void 0 === n ? void 0 : n.message) || "操作失败"),
                $(!1)));
          },
          [t],
        ),
      ));
    var M = (function (e) {
        var t,
          n = new Set();
        return [
          {
            id: "",
            name: "全部",
          },
        ]
          .concat(
            ((t = e),
            (function (e) {
              if (Array.isArray(e)) return a(e);
            })(t) ||
              (function (e) {
                if (
                  ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
                  null != e["@@iterator"]
                )
                  return Array.from(e);
              })(t) ||
              o(t) ||
              (function () {
                throw new TypeError(
                  "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                );
              })()),
          )
          .filter(function (e) {
            var t,
              r = String(null !== (t = e.id) && void 0 !== t ? t : "");
            return !(!e.name || n.has(r) || (n.add(r), 0));
          });
      })(w.labels || []),
      O = "number" == typeof w.total ? w.total || 0 : w.hasMore ? 12 * w.page + 1 : w.papers.length;
    return i.createElement(
      "div",
      {
        className: "papers-page",
      },
      n,
      i.createElement(
        "div",
        {
          className: "papers-header",
        },
        i.createElement(
          c.Button,
          {
            type: "text",
            icon: i.createElement(l.ArrowLeftOutlined, null),
            onClick: function () {
              return g(-1);
            },
          },
          "返回首页",
        ),
        i.createElement(
          "div",
          null,
          i.createElement("h2", null, "历年试卷"),
          i.createElement("p", null, "按年份和地区选择整套试卷，进入后按真实考试顺序作答。"),
        ),
      ),
      i.createElement(
        "div",
        {
          className: "papers-filter",
        },
        i.createElement(
          "span",
          {
            className: "papers-filter-label",
          },
          "试卷分类",
        ),
        i.createElement(c.Radio.Group, {
          value: E,
          optionType: "button",
          buttonStyle: "solid",
          options: M.map(function (e) {
            var t;
            return {
              label: e.name,
              value: String(null !== (t = e.id) && void 0 !== t ? t : ""),
            };
          }),
          onChange: function (e) {
            var t = e.target.value;
            (S(t), z(1, t));
          },
        }),
      ),
      i.createElement(
        c.Spin,
        {
          spinning: k,
          tip: "加载试卷中...",
        },
        w.papers.length > 0
          ? i.createElement(
              "div",
              {
                className: "paper-grid",
              },
              w.papers.map(function (e, n) {
                return i.createElement(
                  "article",
                  {
                    className: "paper-card",
                    key: String(h(e) || n),
                  },
                  i.createElement(
                    "div",
                    {
                      className: "paper-card-icon",
                    },
                    i.createElement(l.FileTextOutlined, null),
                  ),
                  i.createElement(
                    "div",
                    {
                      className: "paper-card-body",
                    },
                    i.createElement("h3", null, p(e)),
                    i.createElement(
                      "p",
                      null,
                      (function (e) {
                        var t,
                          n = [e.year && "".concat(e.year, "年"), e.province || e.area],
                          r = null !== (t = e.questionCount) && void 0 !== t ? t : e.count;
                        return (r && n.push("".concat(r, "题")), n.filter(Boolean).join(" · "));
                      })(e) || "整套试卷",
                    ),
                  ),
                  i.createElement(
                    c.Button,
                    {
                      type: "primary",
                      onClick: function () {
                        return (function (e) {
                          var n = h(e);
                          n
                            ? g("/detail", {
                                state: {
                                  category: b,
                                  mode: "real",
                                  paperId: n,
                                  paperTitle: p(e),
                                },
                              })
                            : t.info("缺少试卷 ID，无法开始答题");
                        })(e);
                      },
                    },
                    "开始答题",
                  ),
                );
              }),
            )
          : i.createElement(c.Empty, {
              description: "暂无符合条件的试卷",
            }),
      ),
      O > 12 &&
        i.createElement(
          "div",
          {
            className: "papers-pagination",
          },
          i.createElement(c.Pagination, {
            current: w.page || 1,
            pageSize: 12,
            total: O,
            showSizeChanger: !1,
            onChange: function (e) {
              return z(e);
            },
          }),
        ),
    );
  };
};
