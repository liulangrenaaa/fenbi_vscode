// 从安装包提取的模块 5180；导出：ErrorsDetail。
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
    (t.ErrorsDetail = void 0));
  const s = n(6540),
    u = n(6606),
    d = n(6495);
  n(629);
  const f = n(1508),
    m = n(4976),
    h = n(5417),
    p = n(3008),
    v = n(4679),
    g = n(8595),
    b = n(2961),
    y = n(5114),
    w = n(829);
  n(2045);
  var x = (0, g.getVscodeApi)(),
    C = !1,
    E = function (e) {
      return String(e.globalId || e.id || "");
    };
  t.ErrorsDetail = function () {
    var e = l(f.Modal.useModal(), 2),
      t = e[0],
      n = e[1],
      r = l(s.useState(!0), 2),
      o = r[0],
      i = r[1],
      c = l(s.useState("question"), 2),
      g = c[0],
      S = c[1],
      A = l(s.useState(), 2),
      k = A[0],
      $ = A[1],
      z = l(s.useState(), 2),
      M = z[0],
      O = z[1],
      R = l(s.useState(1), 2),
      H = R[0],
      I = R[1],
      N = l(s.useState([]), 2),
      L = N[0],
      P = N[1],
      j = s.useRef(Date.now()),
      T = s.useRef(null),
      B = (0, w.useStudyTimer)(),
      V = l(s.useState(!1), 2),
      D = V[0],
      F = V[1],
      _ = (0, m.useNavigate)(),
      W = (0, m.useLocation)().state || {},
      q = W.category,
      K = void 0 === q ? b.SELECTENUM.XINGCE : q,
      U = W.categoryId,
      X = W.errorTotal,
      G = void 0 === X ? 0 : X,
      Y = W.errorPageSize,
      Q = void 0 === Y ? 10 : Y,
      Z = W.fallbackQuestionIds,
      J = void 0 === Z ? [] : Z,
      ee = W.title,
      te = void 0 === ee ? "我的错题" : ee,
      ne = l(s.useState(G), 2),
      re = ne[0],
      oe = ne[1],
      ae = s.useCallback(
        function (e) {
          if (!U)
            return (
              i(!1),
              void t.error({
                title: "提示",
                content: "缺少错题知识点 ID",
              })
            );
          (i(!0),
            S("question"),
            $(void 0),
            O(void 0),
            I(e),
            x.postMessage({
              command: "getErrorPracticeQuestion",
              postData: {
                category: K,
                categoryId: U,
                page: e,
                limit: Q,
                total: re,
                fallbackQuestionIds: J,
              },
            }));
        },
        [K, U, Q, J, t, re],
      );
    s.useEffect(function () {
      ae(1);
    }, []);
    var ie = s.useCallback(function () {
        var e = Date.now(),
          t = Math.max(0, Math.floor((e - j.current) / 1e3));
        return ((j.current = e), t);
      }, []),
      le = function (e, t) {
        if ("question" === g) {
          var n = ie();
          ($(function (n) {
            return null != n && n.questions
              ? a(
                  a({}, n),
                  {},
                  {
                    questions: n.questions.map(function (n) {
                      return E(n) !== E(t)
                        ? n
                        : a(
                            a({}, n),
                            {},
                            {
                              userAnswer: {
                                type: 201,
                                choice: String(e.target.value),
                              },
                            },
                          );
                    }),
                  },
                )
              : n;
          }),
            x.postMessage({
              command: "answer",
              inc: Boolean(null == k ? void 0 : k.combineKey),
              postData: a(
                a({}, t),
                {},
                {
                  category: K,
                  combineKey: null == k ? void 0 : k.combineKey,
                  exerciseId: null == k ? void 0 : k.exerciseId,
                  answer: e.target.value,
                  time: n,
                },
              ),
            }));
        }
      },
      ce = function () {
        t.confirm({
          title: "确认提交",
          onOk: function () {
            (B.destroy(),
              (T.current = null),
              F(!1),
              i(!0),
              x.postMessage({
                command: "getErrorPracticeSolution",
                postData: {
                  category: K,
                  categoryId: U,
                  questionIds: L,
                  page: H,
                  limit: Q,
                  total: re,
                  leaderboardSubmissionId: null == k ? void 0 : k.leaderboardSubmissionId,
                  completedAt: new Date().toISOString(),
                },
              }));
          },
        });
      };
    (0, y.useVscodeMessage)(function (e) {
      if ((i(!1), "message" === e.command)) {
        var n;
        if (C) return;
        (t.error({
          title: "提示",
          content: (null === (n = e.data) || void 0 === n ? void 0 : n.message) || "",
          onOk: function () {
            C = !1;
          },
        }),
          (C = !0));
      }
      if ("errorPracticeQuestion" === e.command) {
        var r = e.data,
          o = r.errorPagination || {};
        ($(r),
          O(void 0),
          S("question"),
          P(o.questionIds || []),
          oe(Number(o.total) || r.questionCount || 0),
          I(Number(o.page) || H),
          (j.current = Date.now()),
          B.start());
      }
      if ("errorPracticeSolution" === e.command) {
        var l = e.data,
          c = new Map(
            ((null == k ? void 0 : k.questions) || []).map(function (e) {
              return [E(e), e.userAnswer];
            }),
          ),
          s = (l.solutions || []).map(function (e) {
            var t = c.get(E(e));
            return a(
              a({}, e),
              {},
              {
                userAnswer: t,
              },
            );
          }),
          d = (0, u.getObjectiveResultStats)(s).correctCount,
          f = s
            .filter(function (e) {
              return 1 === (0, u.getObjectiveResultStats)([e]).correctCount;
            })
            .map(function (e) {
              return E(e);
            })
            .filter(Boolean);
        (f.length &&
          x.postMessage({
            command: "removeErrorQuestions",
            postData: {
              category: K,
              questionIds: f,
            },
          }),
          B.destroy(),
          (T.current = null),
          F(!1),
          S("solution"),
          O(
            a(
              a({}, l),
              {},
              {
                solutions: s,
                correctCount: d,
                questionCount: s.length,
              },
            ),
          ));
      }
    });
    var se = (0, h.groupByMaterialIndexesTo2DArray)((null == k ? void 0 : k.questions) || []),
      ue = (0, h.groupByMaterialIndexesTo2DArray)((null == M ? void 0 : M.solutions) || []),
      de = "question" === g ? se : ue;
    return s.createElement(
      "div",
      {
        className: "detail_page",
      },
      s.createElement(
        f.Spin,
        {
          tip: "loading...",
          spinning: o,
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
              f.Button,
              {
                type: "text",
                onClick: function () {
                  (B.destroy(), (T.current = null), F(!1), _(-1));
                },
              },
              "返回上一页",
            ),
            B.isStarted &&
              "question" === g &&
              s.createElement(
                f.Button,
                {
                  className: "study-timer-button",
                  type: "text",
                  onClick: function () {
                    B.isRunning && ((T.current = Date.now()), B.pause(), F(!0));
                  },
                  disabled: D || o,
                  "aria-label": "暂停计时",
                },
                (0, w.formatStudyTime)(B.elapsedSeconds),
              ),
            "question" === g &&
              s.createElement(
                f.Button,
                {
                  type: "primary",
                  style: {
                    borderColor: "white",
                  },
                  onClick: ce,
                },
                "交卷",
              ),
          ),
          s.createElement("div", null, te),
          "solution" === g &&
            s.createElement(
              "div",
              null,
              "答对题目数：",
              null == M ? void 0 : M.correctCount,
              " /",
              " ",
              null == M ? void 0 : M.questionCount,
            ),
          "solution" === g &&
            s.createElement(d.LeaderboardResultStatus, {
              key: null == M ? void 0 : M.leaderboardSubmissionId,
              data: M,
            }),
          s.createElement("div", {
            style: {
              height: "10px",
            },
          }),
          s.createElement(
            "div",
            null,
            de.map(function (e, t) {
              var n = e.map(function (e) {
                var t = e.materialContent;
                return void 0 === t
                  ? null
                  : t
                    ? {
                        content: t,
                      }
                    : null;
              });
              return s.createElement(p.QuestionItem, {
                key: "".concat(g, "-").concat(H, "-").concat(t),
                onChange: le,
                data: e,
                index: t,
                materials: n,
                disabled: D,
                questionNumberOffset: (H - 1) * Q,
              });
            }),
          ),
          "question" === g &&
            s.createElement(
              f.Button,
              {
                type: "primary",
                style: {
                  borderColor: "white",
                },
                onClick: ce,
              },
              "交卷",
            ),
          re > Q &&
            s.createElement(
              "div",
              {
                className: "error-practice-pagination",
              },
              s.createElement(f.Pagination, {
                size: "small",
                current: H,
                pageSize: Q,
                total: re,
                disabled: D,
                showSizeChanger: !1,
                onChange: ae,
              }),
            ),
          s.createElement(v.default, null),
        ),
      ),
      n,
      s.createElement(
        f.Modal,
        {
          open: D,
          centered: !0,
          closable: !1,
          maskClosable: !1,
          keyboard: !1,
          title: "做题已暂停",
          footer: s.createElement(
            f.Button,
            {
              type: "primary",
              onClick: function () {
                var e = T.current;
                null !== e &&
                  ((j.current += Date.now() - e), (T.current = null), B.resume(), F(!1));
              },
            },
            "继续做题",
          ),
        },
        s.createElement("div", null, "计时已暂停，继续后可以恢复答题。"),
      ),
    );
  };
};
