// 从安装包提取的模块 9053；导出：Detail。
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
    (t.Detail = void 0));
  const s = n(6540),
    u = n(6495);
  n(629);
  const d = n(1508),
    f = n(5417),
    m = n(3008),
    h = n(4976),
    p = n(3640),
    v = n(8595),
    g = n(5337),
    b = n(4679);
  n(2045);
  const y = n(2961),
    w = n(5114),
    x = n(829),
    agent = n(9901);
  var C = (0, v.getVscodeApi)(),
    E = !1;
  // 渲染实际练习及只读预解析入口，预解析不触发选项或交卷事件。
  t.Detail = function () {
    var e = l(d.Modal.useModal(), 2),
      t = e[0],
      n = e[1],
      r = l(s.useState(!1), 2),
      o = r[0],
      i = r[1],
      c = l(s.useState(0), 2),
      v = c[0],
      S = c[1],
      A = s.useRef(Date.now()),
      k = s.useRef(null),
      $ = (0, x.useStudyTimer)(),
      z = l(s.useState(!1), 2),
      M = z[0],
      O = z[1],
      R = l(s.useState(!0), 2),
      H = R[0],
      I = R[1],
      N = l(s.useState(1), 2),
      L = N[0],
      P = N[1],
      j = l(s.useState(), 2),
      T = j[0],
      B = j[1],
      V = l(s.useState(), 2),
      D = V[0],
      F = V[1],
      _ = (0, p.useSetting)().setting,
      W = (0, h.useNavigate)(),
      q = (0, h.useLocation)().state || {},
      K = q.id,
      U = q.paperId,
      X = q.paperTitle,
      G = q.type,
      Y = void 0 === G ? 1 : G,
      Q = q.combineKey,
      Z = void 0 === Q ? "" : Q,
      J = q.mode,
      ee = q.smartYearScope,
      te = l(s.useState(Z), 2),
      ne = te[0],
      re = te[1];
    (s.useEffect(function () {
      ae({
        category: _.categoryId,
        id: K,
        paperId: U,
        combineKey: ne,
        type: Y,
        mode: J,
        smartYearScope: ee,
      });
    }, []),
      s.useEffect(
        function () {
          if (!o && ((null == T ? void 0 : T.questions) || []).length > 0) {
            var e = Date.now();
            (i(!0), S(e), (A.current = e), $.start());
          }
        },
        [null == T ? void 0 : T.questions, o, $.start],
      ));
    var oe = s.useCallback(function () {
        var e = Date.now(),
          t = Math.max(0, Math.floor((e - A.current) / 1e3));
        return ((A.current = e), t);
      }, []),
      ae = function (e) {
        var t = e.category,
          n = e.id,
          r = e.paperId,
          o = e.combineKey,
          a = e.type,
          i = void 0 === a ? 1 : a,
          l = e.mode,
          c = e.smartYearScope;
        (I(!0),
          "real" !== l
            ? "smart" !== l
              ? "quick" !== l && 2 != i
                ? C.postMessage({
                    command: "getQuestion",
                    postData: {
                      category: t,
                      id: n,
                      combineKey: o,
                    },
                  })
                : C.postMessage({
                    command: "getQuickQuestion",
                    postData: {
                      category: t,
                      combineKey: o,
                    },
                  })
              : C.postMessage({
                  command: "getSmartQuestion",
                  postData: {
                    category: t,
                    combineKey: o,
                    yearScope: c,
                  },
                })
            : C.postMessage({
                command: "getRealQuestion",
                postData: {
                  category: t,
                  paperId: r,
                },
              }));
      },
      ie = function (e, t) {
        C.postMessage({
          command: "answer",
          inc: !0,
          postData: a(
            a({}, t),
            {},
            {
              startTime: v,
              time: oe(),
              combineKey: ne,
              category: _.categoryId,
              answer: e.target.value,
              exerciseId: null == T ? void 0 : T.exerciseId,
            },
          ),
        });
      },
      le = function (e, t) {
        C.postMessage({
          command: "answer",
          inc: !0,
          postData: a(
            a({}, t),
            {},
            {
              startTime: v,
              time: oe(),
              combineKey: ne,
              category: _.categoryId,
              answer: e,
              exerciseId: null == T ? void 0 : T.exerciseId,
            },
          ),
        });
      },
      ce = function () {
        t.confirm({
          title: "确认提交",
          onOk: function () {
            ($.destroy(),
              (k.current = null),
              O(!1),
              I(!0),
              C.postMessage({
                command: "submit",
                postData: {
                  startTime: v,
                  combineKey: ne,
                  category: _.categoryId,
                },
              }));
          },
        });
      },
      se = (0, f.groupByMaterialIndexesTo2DArray)((null == T ? void 0 : T.questions) || []),
      ue = (0, f.groupByMaterialIndexesTo2DArray)((null == D ? void 0 : D.solutions) || []),
      de = 1 === L ? se : ue;
    return (
      (0, w.useVscodeMessage)(function (e) {
        if ((I(!1), "getQuestion" === e.command)) {
          var n = e.data;
          (B(n), re(n.combineKey || ""));
        }
        if ("message" === e.command) {
          var r;
          if (E) return;
          (t.error({
            title: "提示",
            content: (null === (r = e.data) || void 0 === r ? void 0 : r.message) || "",
            onOk: function () {
              E = !1;
            },
          }),
            (E = !0));
        }
        "solution" === e.command && ($.destroy(), (k.current = null), O(!1), P(2), F(e.data));
      }),
      s.createElement(
        "div",
        {
          className: "detail_page",
        },
        s.createElement(
          d.Spin,
          {
            tip: "loading...",
            spinning: H,
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
                d.Button,
                {
                  type: "text",
                  onClick: function () {
                    ($.destroy(), (k.current = null), O(!1), W(-1));
                  },
                },
                "返回上一页",
              ),
              $.isStarted &&
                1 === L &&
                s.createElement(
                  d.Button,
                  {
                    className: "study-timer-button",
                    type: "text",
                    onClick: function () {
                      $.isRunning && ((k.current = Date.now()), $.pause(), O(!0));
                    },
                    disabled: M || H,
                    "aria-label": "暂停计时",
                  },
                  (0, x.formatStudyTime)($.elapsedSeconds),
                ),
              1 == L &&
                s.createElement(
                  s.Fragment,
                  null,
                  s.createElement(
                    d.Button,
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
              2 == L &&
                s.createElement(
                  d.Button,
                  {
                    onClick: function () {
                      C.postMessage({
                        command: "jumpFenbi",
                        postData: {
                          category: _.categoryId,
                          exerciseId: null == T ? void 0 : T.exerciseId,
                        },
                      });
                    },
                  },
                  "跳转粉笔网址",
                ),
              1 === L && s.createElement(agent.PracticeAgentControls),
            ),
            "real" === J &&
              X &&
              s.createElement(
                "div",
                {
                  className: "paper-answer-title",
                },
                X,
              ),
            2 == L &&
              s.createElement(
                "div",
                null,
                "答对题目数：",
                null == D ? void 0 : D.correctCount,
                " /",
                " ",
                null == D ? void 0 : D.questionCount,
                " ",
              ),
            2 === L &&
              s.createElement(u.LeaderboardResultStatus, {
                key: null == D ? void 0 : D.leaderboardSubmissionId,
                data: D,
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
                return (0, y.isEssayCategory)(_.categoryId)
                  ? s.createElement(g.ShenlunItem, {
                      key: "".concat(L, "-").concat(t),
                      onChange: le,
                      data: e,
                      index: t,
                      materials: (null == T ? void 0 : T.materials) || [],
                      disabled: M,
                    })
                  : s.createElement(m.QuestionItem, {
                      key: "".concat(L, "-").concat(t),
                      onChange: ie,
                      data: e,
                      index: t,
                      materials: (null == T ? void 0 : T.materials) || [],
                      disabled: M,
                    });
              }),
            ),
            s.createElement(b.default, null),
            1 == L &&
              s.createElement(
                d.Button,
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
        ),
        n,
        s.createElement(
          d.Modal,
          {
            open: M,
            centered: !0,
            closable: !1,
            maskClosable: !1,
            keyboard: !1,
            title: "做题已暂停",
            footer: s.createElement(
              d.Button,
              {
                type: "primary",
                onClick: function () {
                  var e = k.current;
                  null !== e &&
                    ((A.current += Date.now() - e), (k.current = null), $.resume(), O(!1));
                },
              },
              "继续做题",
            ),
          },
          s.createElement("div", null, "计时已暂停，继续后可以恢复答题。"),
        ),
      )
    );
  };
};
