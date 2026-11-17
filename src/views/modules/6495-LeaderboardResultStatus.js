// 从安装包提取的模块 6495；导出：LeaderboardResultStatus。
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
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.LeaderboardResultStatus = void 0));
  const c = n(6540),
    s = n(1508),
    u = n(3160),
    d = n(6606),
    f = n(5114);
  var m = (0, n(8595).getVscodeApi)();
  t.LeaderboardResultStatus = function (e) {
    var t,
      n,
      r = e.data,
      o =
        ((t = c.useState()),
        (n = 2),
        (function (e) {
          if (Array.isArray(e)) return e;
        })(t) ||
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
                } else
                  for (; !(c = (r = a.call(n)).done) && (l.push(r.value), l.length !== t); c = !0);
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
          })(t, n) ||
          (function (e, t) {
            if (e) {
              if ("string" == typeof e) return l(e, t);
              var n = {}.toString.call(e).slice(8, -1);
              return (
                "Object" === n && e.constructor && (n = e.constructor.name),
                "Map" === n || "Set" === n
                  ? Array.from(e)
                  : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    ? l(e, t)
                    : void 0
              );
            }
          })(t, n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          })()),
      i = o[0],
      h = o[1],
      p = c.useRef(),
      v = null == r ? void 0 : r.leaderboardSubmissionId,
      g = c.useCallback(function () {
        p.current &&
          (h({
            submissionId: p.current.submissionId,
            status: "uploading",
          }),
          m.postMessage({
            command: "reportLeaderboardResult",
            postData: p.current,
          }));
      }, []);
    if (
      ((0, f.useVscodeMessage)(function (e) {
        if ("leaderboardReport" === e.command) {
          var t = e.data;
          t.submissionId === v && h(t);
        }
      }),
      c.useEffect(
        function () {
          if (v && r.leaderboardCompletedAt) {
            var e = (0, d.getObjectiveResultStats)(r.solutions);
            e.questionCount &&
              ((p.current = a(
                a(
                  {
                    submissionId: v,
                  },
                  e,
                ),
                {},
                {
                  completedAt: r.leaderboardCompletedAt,
                },
              )),
              g());
          }
        },
        [v, g],
      ),
      !v || !p.current)
    )
      return null;
    var b = p.current;
    return c.createElement(
      "div",
      {
        className: "leaderboard-result",
        role: "status",
      },
      c.createElement(
        "span",
        null,
        "本次答题 ",
        b.questionCount,
        " 题 · 胜率 ",
        ((b.correctCount / b.questionCount) * 100).toFixed(1),
        "%",
      ),
      c.createElement(
        "span",
        null,
        "success" === (null == i ? void 0 : i.status)
          ? "成绩已记录"
          : "error" === (null == i ? void 0 : i.status)
            ? "上报失败"
            : "成绩上报中…",
      ),
      "error" === (null == i ? void 0 : i.status) &&
        c.createElement(
          s.Tooltip,
          {
            title: i.message,
          },
          c.createElement(
            s.Button,
            {
              size: "small",
              icon: c.createElement(u.ReloadOutlined, null),
              onClick: g,
            },
            "重试",
          ),
        ),
    );
  };
};
