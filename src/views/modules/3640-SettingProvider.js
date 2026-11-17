// 从安装包提取的模块 3640；导出：useSetting、SettingProvider。
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
    (t.useSetting = t.SettingProvider = void 0));
  const c = n(6540),
    s = n(5114);
  var u = {
      color: "#ffffff",
      backgroundColor: "#ffffff",
      categoryId: "xingce",
      needLineThrough: !1,
      fontSize: 12,
      correctColor: "#30c9a1",
      wrongColor: "#ff4d4f",
      buttonBorderColor: "#ffffff",
    },
    d = c.createContext({
      setting: u,
      setSetting: function () {},
    });
  ((t.SettingProvider = function (e) {
    var t,
      n,
      r = e.children,
      o =
        ((t = c.useState(u)),
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
      f = o[1];
    return (
      (0, s.useVscodeMessage)(
        c.useCallback(function (e) {
          "setting" === e.command &&
            f(function (t) {
              var n = a(a({}, t), e.data || {});
              (document.documentElement.style.setProperty("--primary-color", n.color || "#ffffff"),
                document.documentElement.style.setProperty(
                  "--primary-backgroundColor",
                  n.backgroundColor || "#ffffff",
                ),
                document.documentElement.style.setProperty(
                  "--primary-fontSize",
                  "".concat(n.fontSize || 12, "px"),
                ),
                document.documentElement.style.setProperty(
                  "--answer-correct-color",
                  n.correctColor || "#30c9a1",
                ),
                document.documentElement.style.setProperty(
                  "--answer-wrong-color",
                  n.wrongColor || "#ff4d4f",
                ));
              var r = n.buttonBorderColor || n.cardBorderColor || "#ffffff";
              return (
                document.documentElement.style.setProperty("--button-border-color", r),
                document.documentElement.style.setProperty("--card-border-color", r),
                n
              );
            });
        }, []),
      ),
      c.createElement(
        d.Provider,
        {
          value: {
            setting: i,
            setSetting: f,
          },
        },
        r,
      )
    );
  }),
    (t.useSetting = function () {
      return c.useContext(d);
    }));
};
