// 从安装包提取的模块 5192；导出：Answer。
(e, t, n) => {
  "use strict";

  function r(e) {
    return (
      (r =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
      r(e)
    );
  }
  function o(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r));
    }
    return n;
  }
  function a(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? o(Object(n), !0).forEach(function (t) {
            i(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : o(Object(n)).forEach(function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            });
    }
    return e;
  }
  function i(e, t, n) {
    return (
      (t = (function (e) {
        var t = (function (e) {
          if ("object" != r(e) || !e) return e;
          var t = e[Symbol.toPrimitive];
          if (void 0 !== t) {
            var n = t.call(e, "string");
            if ("object" != r(n)) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(e);
        })(e);
        return "symbol" == r(t) ? t : t + "";
      })(t)) in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function l(e, t) {
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
          if ("string" == typeof e) return c(e, t);
          var n = {}.toString.call(e).slice(8, -1);
          return (
            "Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(e)
              : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? c(e, t)
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
  function c(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.Answer = void 0));
  const s = n(6540),
    u = n(1508),
    d = n(5417),
    f = n(3008),
    m = n(4976),
    h = n(3640),
    p = n(8595),
    v = n(5337);
  n(2045);
  const g = n(2961),
    b = n(5114);
  var y = (0, p.getVscodeApi)(),
    w = !1,
    x = function () {};
  t.Answer = function () {
    var e = l(u.Modal.useModal(), 2),
      t = e[0],
      n = e[1],
      r = l(
        s.useState(function () {
          return Date.now();
        }),
        1,
      )[0],
      o = s.useRef(r),
      i = l(s.useState(!0), 2),
      c = i[0],
      p = i[1],
      C = l(s.useState(), 2),
      E = C[0],
      S = C[1],
      A = l(s.useState(), 2),
      k = A[0],
      $ = A[1],
      z = (0, h.useSetting)().setting,
      M = (0, m.useNavigate)(),
      O = (0, m.useLocation)().state || {},
      R = O.id,
      H = O.type,
      I = void 0 === H ? 1 : H,
      N = O.combineKey,
      L = void 0 === N ? "" : N,
      P = l(s.useState(L), 2),
      j = P[0],
      T = P[1];
    s.useEffect(function () {
      B({
        category: z.categoryId,
        id: R,
        combineKey: j,
        type: I,
      });
    }, []);
    var B = function (e) {
        var t = e.category,
          n = e.id,
          r = e.combineKey,
          o = e.type,
          a = void 0 === o ? 1 : o;
        (p(!0),
          y.postMessage({
            command: "getSolution",
            postData: {
              type: a,
              category: t,
              id: n,
              combineKey: r,
            },
          }));
      },
      V = s.useCallback(function () {
        var e = Date.now(),
          t = Math.max(0, Math.floor((e - o.current) / 1e3));
        return ((o.current = e), t);
      }, []),
      D = function (e, t) {
        y.postMessage({
          command: "answer",
          inc: !0,
          postData: a(
            a({}, t),
            {},
            {
              startTime: r,
              time: V(),
              combineKey: j,
              category: z.categoryId,
              answer: e,
              exerciseId:
                (null == k ? void 0 : k.exerciseId) || (null == E ? void 0 : E.exerciseId),
            },
          ),
        });
      },
      F = (0, d.groupByMaterialIndexesTo2DArray)((null == k ? void 0 : k.solutions) || []),
      _ = (null == k ? void 0 : k.materials) || (null == E ? void 0 : E.materials) || [];
    return (
      (0, b.useVscodeMessage)(function (e) {
        if ((p(!1), "getQuestion" === e.command)) {
          var n = e.data;
          (S(n), T(n.combineKey || ""));
        }
        if ("message" === e.command) {
          var r;
          if (w) return;
          (t.error({
            title: "提示",
            content: (null === (r = e.data) || void 0 === r ? void 0 : r.message) || "",
            onOk: function () {
              w = !1;
            },
          }),
            (w = !0));
        }
        "solution" === e.command && $(e.data);
      }),
      s.createElement(
        "div",
        {
          className: "detail_page",
        },
        s.createElement(
          u.Spin,
          {
            tip: "loading...",
            spinning: c,
          },
          s.createElement(
            "div",
            {
              className: "question-container",
            },
            s.createElement(
              "div",
              {
                className: "top-bar",
              },
              s.createElement(
                u.Button,
                {
                  type: "text",
                  onClick: function () {
                    M(-1);
                  },
                },
                "返回上一页",
              ),
              s.createElement(
                u.Button,
                {
                  onClick: function () {
                    y.postMessage({
                      command: "jumpFenbi",
                      postData: {
                        category: z.categoryId,
                        exerciseId:
                          (null == k ? void 0 : k.exerciseId) ||
                          (null == E ? void 0 : E.exerciseId),
                      },
                    });
                  },
                },
                "跳转粉笔网址",
              ),
            ),
            s.createElement(
              "div",
              null,
              "答对题目数：",
              null == k ? void 0 : k.correctCount,
              " /",
              " ",
              null == k ? void 0 : k.questionCount,
              " ",
            ),
            s.createElement("div", {
              style: {
                height: "10px",
              },
            }),
            s.createElement(
              "div",
              null,
              F.map(function (e, t) {
                return (0, g.isEssayCategory)(z.categoryId)
                  ? s.createElement(v.ShenlunItem, {
                      key: "".concat(1, "-").concat(t),
                      onChange: D,
                      data: e,
                      index: t,
                      materials: _,
                    })
                  : s.createElement(f.QuestionItem, {
                      key: "".concat(1, "-").concat(t),
                      onChange: x,
                      data: e,
                      index: t,
                      materials: _,
                    });
              }),
            ),
          ),
        ),
        n,
      )
    );
  };
};
