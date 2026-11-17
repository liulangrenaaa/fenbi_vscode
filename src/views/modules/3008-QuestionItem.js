// 从安装包提取的模块 3008；导出：QuestionItem。
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
    (t.QuestionItem = void 0));
  const c = n(6540),
    s = n(1508),
    u = n(2961),
    d = n(9226),
    f = n(3640),
    m = n(5077);
  var h = function (e) {
      return u.radioMap[e + 1] || String(e + 1);
    },
    p = function (e, t) {
      return (0, m.parseChoiceIndexes)(e, t).map(h).join("、");
    };
  t.QuestionItem = function (e) {
    var t,
      n,
      r = e.data,
      o = void 0 === r ? [] : r,
      h = e.materials,
      v = void 0 === h ? [] : h,
      g = e.onChange,
      b = (e.index, e.disabled),
      y = void 0 !== b && b,
      w = e.questionNumberOffset,
      x = void 0 === w ? 0 : w,
      C =
        ((t = c.useState({})),
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
      E = C[0],
      S = C[1],
      A = (0, f.useSetting)().setting;
    return c.createElement(
      "div",
      null,
      o.map(function (e, t) {
        var n,
          r,
          o,
          l,
          f = 2 === e.type,
          h = f ? "多选题" : "单选题",
          b = null == e || null === (n = e.userAnswer) || void 0 === n ? void 0 : n.choice,
          w = null == e || null === (r = e.correctAnswer) || void 0 === r ? void 0 : r.choice,
          C = p(b, f),
          k = p(w, f),
          $ = b === w;
        return c.createElement(
          "div",
          {
            key: e.globalId || e.id || t,
          },
          (v || []).length > 0 &&
            c.createElement("div", {
              key: t,
              dangerouslySetInnerHTML: {
                __html: (0, d.setImg)(
                  null == v || null === (o = v[t]) || void 0 === o ? void 0 : o.content,
                ),
              },
            }),
          c.createElement(
            "div",
            {
              className: "question-item",
            },
            c.createElement("span", null, x + t + 1, "、", c.createElement("span", null, h)),
            c.createElement("div", {
              dangerouslySetInnerHTML: {
                __html: (0, d.setImg)(e.content),
              },
            }),
            c.createElement(
              "div",
              {
                className: "answer-item",
              },
              (e.accessories || []).map(function (n, r) {
                var o = "".concat(e.globalId || e.id || t, "-").concat(r),
                  l = {
                    display: "flex",
                    flexDirection: "column",
                  },
                  h = ((null == n ? void 0 : n.options) || []).map(function (e, n) {
                    var o = (0, d.setImg)(e),
                      l = "".concat(t, "-").concat(r, "-").concat(n),
                      m = E[l];
                    return c.createElement(
                      s.Space,
                      {
                        key: l,
                        style: {
                          justifyContent: "space-between",
                        },
                      },
                      f
                        ? c.createElement(
                            s.Checkbox,
                            {
                              value: n,
                              disabled: y,
                            },
                            c.createElement(
                              "div",
                              {
                                style: {
                                  textDecoration: m ? "line-through" : "",
                                },
                              },
                              c.createElement("span", null, u.radioMap[n + 1], "、"),
                              c.createElement("span", {
                                dangerouslySetInnerHTML: {
                                  __html: o,
                                },
                              }),
                            ),
                          )
                        : c.createElement(
                            s.Radio,
                            {
                              value: n,
                              disabled: y,
                            },
                            c.createElement(
                              "div",
                              {
                                style: {
                                  textDecoration: m ? "line-through" : "",
                                },
                              },
                              c.createElement("span", null, u.radioMap[n + 1], "、"),
                              c.createElement("span", {
                                dangerouslySetInnerHTML: {
                                  __html: o,
                                },
                              }),
                            ),
                          ),
                      A.needLineThrough
                        ? c.createElement(
                            s.Button,
                            {
                              size: "small",
                              disabled: y,
                              onClick: function () {
                                var e = "".concat(t, "-").concat(r, "-").concat(n);
                                S(function (t) {
                                  return a(a({}, t), {}, i({}, e, !m));
                                });
                              },
                            },
                            m ? "重置" : "排除",
                          )
                        : c.createElement(c.Fragment, null),
                    );
                  });
                return f
                  ? c.createElement(
                      s.Checkbox.Group,
                      {
                        key: o,
                        style: l,
                        onChange: function (n) {
                          g(
                            {
                              target: {
                                value: (0, m.normalizeChoice)(n, !0),
                              },
                            },
                            e,
                            t,
                          );
                        },
                        defaultValue: (0, m.parseChoiceIndexes)(b, !0),
                      },
                      h,
                    )
                  : c.createElement(
                      s.Radio.Group,
                      {
                        key: o,
                        style: l,
                        onChange: function (n) {
                          g(n, e, t);
                        },
                        defaultValue: (0, m.parseChoiceIndexes)(b)[0],
                      },
                      h,
                    );
              }),
            ),
            "solution" in e &&
              e.solution &&
              c.createElement(
                "div",
                {
                  className: "solution-container",
                },
                c.createElement(
                  "p",
                  null,
                  void 0 !==
                    (null == e || null === (l = e.userAnswer) || void 0 === l
                      ? void 0
                      : l.choice) &&
                    c.createElement(
                      "span",
                      {
                        className: $ ? "green" : "red",
                        style: {
                          marginRight: "5px",
                        },
                      },
                      "你的答案：",
                      C,
                    ),
                  c.createElement(
                    "span",
                    {
                      className: "green",
                    },
                    "正确答案：",
                    k,
                  ),
                ),
                c.createElement(
                  "div",
                  {
                    className: "green",
                    style: {
                      fontWeight: "bold",
                    },
                  },
                  "解析：",
                ),
                c.createElement("div", {
                  className: "solution",
                  dangerouslySetInnerHTML: {
                    __html: (0, d.setImg)(e.solution),
                  },
                }),
                e.keypoints &&
                  e.keypoints.length > 0 &&
                  c.createElement(
                    "div",
                    {
                      className: "keypoints",
                    },
                    c.createElement(
                      "span",
                      {
                        className: "keypoints-label",
                      },
                      "考点：",
                    ),
                    e.keypoints.map(function (e) {
                      return c.createElement(
                        s.Button,
                        {
                          key: e.id,
                          size: "small",
                          type: "dashed",
                          style: {
                            margin: "4px 4px 0 0",
                          },
                        },
                        e.name,
                      );
                    }),
                  ),
              ),
          ),
        );
      }),
    );
  };
};
