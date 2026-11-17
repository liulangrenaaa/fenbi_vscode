// 从安装包提取的模块 236；导出：Home。
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
    (t.Home = void 0));
  const s = n(6540),
    u = n(3160),
    d = n(1508),
    f = n(4592),
    m = n(2),
    h = n(5257),
    p = n(4976),
    v = n(3640),
    g = n(2961),
    b = n(8595),
    y = n(5590),
    w = n(5114);
  var x = (0, b.getVscodeApi)(),
    C = [
      {
        label: "职测",
        value: g.SELECTENUM.SYZC,
      },
      {
        label: "公基",
        value: g.SELECTENUM.SYDW,
      },
    ],
    E = [
      {
        label: "不限",
        value: 0,
      },
      {
        label: "近5年",
        value: 5,
      },
      {
        label: "近10年",
        value: 10,
      },
    ],
    S = {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      background: "#ffffff",
      color: "#1f1f1f",
    },
    A = {
      display: "block",
      marginBottom: 6,
      color: "#333333",
      fontSize: 12,
    },
    k = {
      width: "100%",
    },
    $ = {
      border: "1px solid #f0f0f0",
      borderRadius: 6,
      padding: "8px 10px",
      background: "#fafafa",
      color: "#595959",
      fontSize: 12,
      lineHeight: 1.6,
    },
    z = {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 4,
    },
    M = {
      mask: {
        backgroundColor: "transparent",
      },
      content: {
        backgroundColor: "#ffffff",
        color: "#1f1f1f",
        padding: 12,
      },
      header: {
        backgroundColor: "#ffffff",
        color: "#1f1f1f",
        marginBottom: 12,
      },
      body: {
        backgroundColor: "#ffffff",
        color: "#1f1f1f",
        padding: 0,
      },
      footer: {
        backgroundColor: "#ffffff",
        marginTop: 12,
      },
    },
    // 展示鲁班练习的独立登录设置和界面偏好。
    O = function (e) {
      var t = e.settingsDraft,
        n = e.updateSettingsDraft;
      return s.createElement(
        "div",
        {
          style: S,
        },
        s.createElement(
          "div",
          null,
          s.createElement(
            "span",
            {
              style: A,
            },
            "Cookie 设置",
          ),
          s.createElement(
            "div",
            {
              style: $,
            },
            "请在 VS Code 设置中搜索“鲁班练习”，配置 lubanPractice.cookie",
          ),
        ),
        s.createElement(
          "div",
          null,
          s.createElement(
            "span",
            {
              style: A,
            },
            "字体颜色",
          ),
          s.createElement(d.ColorPicker, {
            size: "small",
            showText: !0,
            value: String(t.color || "#ffffff"),
            onChange: function (e, t) {
              return n("color", t);
            },
          }),
        ),
        s.createElement(
          "div",
          null,
          s.createElement(
            "span",
            {
              style: A,
            },
            "背景颜色",
          ),
          s.createElement(d.ColorPicker, {
            size: "small",
            showText: !0,
            value: String(t.backgroundColor || "#21222b"),
            onChange: function (e, t) {
              return n("backgroundColor", t);
            },
          }),
        ),
        s.createElement(
          "div",
          null,
          s.createElement(
            "span",
            {
              style: A,
            },
            "选项排除线",
          ),
          s.createElement(d.Switch, {
            size: "small",
            checked: Boolean(t.needLineThrough),
            onChange: function (e) {
              return n("needLineThrough", e);
            },
          }),
        ),
        s.createElement(
          "div",
          null,
          s.createElement(
            "span",
            {
              style: A,
            },
            "字体大小",
          ),
          s.createElement(d.InputNumber, {
            size: "small",
            min: 10,
            max: 28,
            addonAfter: "px",
            value: Number(t.fontSize) || 12,
            style: k,
            onChange: function (e) {
              return n("fontSize", Number(e) || 12);
            },
          }),
        ),
        s.createElement(
          "div",
          null,
          s.createElement(
            "span",
            {
              style: A,
            },
            "正确答案颜色",
          ),
          s.createElement(d.ColorPicker, {
            size: "small",
            showText: !0,
            value: String(t.correctColor || "#30c9a1"),
            onChange: function (e, t) {
              return n("correctColor", t);
            },
          }),
        ),
        s.createElement(
          "div",
          null,
          s.createElement(
            "span",
            {
              style: A,
            },
            "错误答案颜色",
          ),
          s.createElement(d.ColorPicker, {
            size: "small",
            showText: !0,
            value: String(t.wrongColor || "#ff4d4f"),
            onChange: function (e, t) {
              return n("wrongColor", t);
            },
          }),
        ),
        s.createElement(
          "div",
          null,
          s.createElement(
            "span",
            {
              style: A,
            },
            "按钮 / Card / 下拉框边框颜色",
          ),
          s.createElement(d.ColorPicker, {
            size: "small",
            showText: !0,
            value: String(t.buttonBorderColor || "#ffffff"),
            onChange: function (e, t) {
              return n("buttonBorderColor", t);
            },
          }),
        ),
        s.createElement(
          "div",
          null,
          s.createElement(
            "span",
            {
              style: A,
            },
            "画板画笔颜色",
          ),
          s.createElement(d.ColorPicker, {
            size: "small",
            showText: !0,
            value: String(t.canvasBrushColor || "red"),
            onChange: function (e, t) {
              return n("canvasBrushColor", t);
            },
          }),
        ),
        s.createElement(
          "div",
          null,
          s.createElement(
            "span",
            {
              style: A,
            },
            "画板画笔粗细",
          ),
          s.createElement(d.InputNumber, {
            size: "small",
            min: 1,
            max: 30,
            addonAfter: "px",
            value: Number(t.canvasBrushWidth) || 3,
            style: k,
            onChange: function (e) {
              n("canvasBrushWidth", Number(e) || 3);
            },
          }),
        ),
        s.createElement("div", {
          style: z,
        }),
      );
    },
    R = function (e) {
      return e === g.SELECTENUM.SYZC || e === g.SELECTENUM.SYDW;
    },
    H = function (e) {
      return e === g.SELECTENUM.XINGCE || e === g.SELECTENUM.SYZC || e === g.SELECTENUM.SYDW;
    },
    I = function (e) {
      return Boolean(e) && !(0, g.isInterviewCategory)(e);
    };
  t.Home = function () {
    var e = l(d.message.useMessage(), 2),
      t = e[0],
      n = e[1],
      r = l(s.useState([]), 2),
      o = r[0],
      c = r[1],
      b = l(s.useState(!0), 2),
      S = b[0],
      A = b[1],
      k = l(s.useState(""), 2),
      $ = k[0],
      z = k[1],
      N = l(s.useState([]), 2),
      L = N[0],
      P = N[1],
      j = l(s.useState(!1), 2),
      T = j[0],
      B = j[1],
      V = l(s.useState(!1), 2),
      D = V[0],
      F = V[1],
      _ = l(s.useState(0), 2),
      W = _[0],
      q = _[1],
      K = l(s.useState({}), 2),
      U = K[0],
      X = K[1],
      G = l(s.useState([]), 2),
      Y = G[0],
      Q = G[1],
      Z = (0, v.useSetting)(),
      J = Z.setting,
      ee = Z.setSetting,
      te = (0, p.useNavigate)();
    s.useEffect(function () {
      var e = J.categoryId || "xingce",
        t = (0, g.getCategoryRouteConfig)(e);
      (re({
        categoryId: e,
      }),
        le({
          count: 15,
          categoryId: t.historyCategoryId,
          category: e,
        }));
    }, []);
    var ne,
      re = function (e) {
        x.postMessage({
          command: "pageInit",
          postData: e,
        });
      },
      oe = function (e, t) {
        var n,
          r,
          o = e.id;
        if ((A(!0), (0, g.isInterviewCategory)(J.categoryId)))
          te("/sydwms-detail", {
            state: {
              category: J.categoryId,
              keypointId: o,
              title: e.name,
              questionIndex: 0,
            },
          });
        else {
          var a = null;
          (((null == t || null === (n = t.keypointIds) || void 0 === n ? void 0 : n.length) || 0) >
            0 &&
            null != t &&
            null !== (r = t.keypointIds) &&
            void 0 !== r &&
            r.includes(o) &&
            (a = (null == t ? void 0 : t.combineKey) || ""),
            ae({
              id: Number(o),
              combineKey: a || "",
            }));
        }
      },
      ae = function (e) {
        var t = e.id,
          n = e.combineKey,
          r = e.type,
          o = e.mode,
          a = e.smartYearScope;
        te("/detail", {
          state: {
            id: t,
            combineKey: n,
            type: r,
            mode: o,
            smartYearScope: a,
          },
        });
      },
      ie = function () {
        (x.postMessage({
          command: "updateSettings",
          postData: {
            color: U.color || "#ffffff",
            backgroundColor: U.backgroundColor || "#21222b",
            needLineThrough: Boolean(U.needLineThrough),
            fontSize: Number(U.fontSize) || 12,
            correctColor: U.correctColor || "#30c9a1",
            wrongColor: U.wrongColor || "#ff4d4f",
            buttonBorderColor: U.buttonBorderColor || "#ffffff",
            canvasBrushColor: U.canvasBrushColor || "red",
            canvasBrushWidth: Number(U.canvasBrushWidth) || 3,
          },
        }),
          ee(function (e) {
            return a(a({}, e), U);
          }),
          F(!1));
      },
      le = function (e) {
        var t = e.count,
          n = e.categoryId,
          r = e.category || J.categoryId;
        if ((0, g.isInterviewCategory)(r)) c([]);
        else {
          var o = (0, g.getCategoryRouteConfig)(r);
          x.postMessage({
            command: "history",
            postData: {
              category: r,
              count: t,
              categoryId: n || o.historyCategoryId,
            },
          });
        }
      },
      ce = function (e) {
        var t = (0, g.getCategoryRouteConfig)(e);
        (re({
          categoryId: e,
        }),
          x.postMessage({
            command: "changeCategory",
            postData: {
              categoryId: e,
            },
          }),
          le({
            count: 15,
            categoryId: t.historyCategoryId,
            category: e,
          }),
          ee(function (t) {
            return a(
              a({}, t),
              {},
              {
                categoryId: e,
              },
            );
          }));
      },
      se = J.categoryId || g.SELECTENUM.XINGCE,
      ue = R(se) ? g.SELECTENUM.SYZC : se;
    return (
      (0, w.useVscodeMessage)(
        s.useCallback(
          function (e) {
            if ((A(!1), "init" === e.command)) {
              var n = e.data;
              (z(n.favoriteQuizLocationName || ""), P(n.favoriteQuizCoursePrefixes || []));
              var r = (0, y.modifyArrayToTree)(n.menu || [], n.cacheResult || {}, oe);
              Q(r);
            }
            var o, a;
            if (
              ("message" === e.command &&
                (re({
                  categoryId: J.categoryId,
                }),
                t.info((null === (o = e.data) || void 0 === o ? void 0 : o.message) || "")),
              "history" === e.command && c(e.data || []),
              "templateInfo" === e.command)
            ) {
              var i,
                l = e.data,
                s = Number(null !== (i = l.yearScope) && void 0 !== i ? i : 0);
              (q(
                E.some(function (e) {
                  return e.value === s;
                })
                  ? s
                  : 0,
              ),
                B(!0));
            }
            "settingsUpdated" === e.command &&
              t.success(
                (null === (a = e.data) || void 0 === a ? void 0 : a.message) || "设置已保存",
              );
          },
          [t, J.categoryId],
        ),
      ),
      s.createElement(
        "div",
        null,
        s.createElement(
          d.Spin,
          {
            tip: "loading...",
            spinning: S,
          },
          s.createElement(
            "div",
            null,
            s.createElement(
              d.Flex,
              {
                justify: "flex-end",
                align: "center",
              },
              s.createElement(
                d.Button,
                {
                  type: "link",
                  size: "small",
                  style: {
                    borderColor: "var(--button-border-color)",
                  },
                  onClick: function () {
                    (X({
                      color: J.color || "#ffffff",
                      backgroundColor: J.backgroundColor || "#21222b",
                      needLineThrough: Boolean(J.needLineThrough),
                      fontSize: Number(J.fontSize) || 12,
                      correctColor: J.correctColor || "#30c9a1",
                      wrongColor: J.wrongColor || "#ff4d4f",
                      buttonBorderColor: J.buttonBorderColor || J.cardBorderColor || "#ffffff",
                      canvasBrushColor: J.canvasBrushColor || "red",
                      canvasBrushWidth: Number(J.canvasBrushWidth) || 3,
                    }),
                      F(!0));
                  },
                },
                "设置",
              ),
              s.createElement(
                d.Button,
                {
                  type: "link",
                  size: "small",
                  style: {
                    borderColor: "var(--button-border-color)",
                  },
                  onClick: function () {
                    x.postMessage({
                      command: "openInBrowser",
                      postData: {
                        url: "https://github.com/Mrxiiaobai/fenbi-tools/issues",
                      },
                    });
                  },
                },
                "问题反馈",
              ),
              s.createElement(
                d.Button,
                {
                  type: "link",
                  size: "small",
                  style: {
                    borderColor: "var(--button-border-color)",
                  },
                  onClick: function () {
                    x.postMessage({
                      command: "openInBrowser",
                      postData: {
                        url: "https://github.com/Mrxiiaobai/fenbi-tools/issues/9",
                      },
                    });
                  },
                },
                "入群交流",
              ),
            ),
            s.createElement(
              d.Flex,
              {
                align: "center",
                wrap: "wrap",
              },
              s.createElement(
                d.Button,
                {
                  type: "link",
                  icon: s.createElement(u.TrophyOutlined, null),
                  onClick: function () {
                    return te("/leaderboard");
                  },
                },
                "排行榜",
              ),
              s.createElement(d.Select, {
                options: (0, g.getCategoryOptions)(L),
                value: ue,
                style: {
                  width: 120,
                  margin: "10px",
                },
                onChange: function (e) {
                  var t = e === g.SELECTENUM.SYZC ? g.SELECTENUM.SYZC : e;
                  ce(t);
                },
              }),
              $ &&
                s.createElement(
                  "span",
                  {
                    style: {
                      marginLeft: 4,
                    },
                  },
                  "地区：",
                  $,
                ),
            ),
            R(se) &&
              s.createElement(
                "div",
                {
                  style: {
                    margin: "0 10px 10px",
                  },
                },
                s.createElement(d.Radio.Group, {
                  options: C,
                  optionType: "button",
                  value: se,
                  onChange: function (e) {
                    return ce(e.target.value);
                  },
                }),
              ),
            (H(se) || I(se)) &&
              s.createElement(
                d.Flex,
                {
                  justify: "flex-start",
                  align: "center",
                  gap: 8,
                  style: {
                    margin: "0 10px 10px",
                  },
                },
                I(se) &&
                  s.createElement(
                    d.Button,
                    {
                      type: "link",
                      style: {
                        borderColor: "var(--button-border-color)",
                      },
                      onClick: function () {
                        te("/papers", {
                          state: {
                            category: J.categoryId || g.SELECTENUM.XINGCE,
                          },
                        });
                      },
                    },
                    "历年试卷",
                  ),
                H(se) &&
                  s.createElement(
                    s.Fragment,
                    null,
                    ((ne = se) === g.SELECTENUM.XINGCE ||
                      ne === g.SELECTENUM.SYZC ||
                      ne === g.SELECTENUM.SYDW) &&
                      s.createElement(
                        d.Button,
                        {
                          type: "link",
                          style: {
                            borderColor: "var(--button-border-color)",
                          },
                          onClick: function () {
                            te("/errors", {
                              state: {
                                category: J.categoryId || g.SELECTENUM.XINGCE,
                              },
                            });
                          },
                        },
                        "我的错题",
                      ),
                    s.createElement(
                      d.Button,
                      {
                        type: "link",
                        style: {
                          borderColor: "var(--button-border-color)",
                        },
                        onClick: function () {
                          ae({
                            mode: "quick",
                          });
                        },
                      },
                      "快速练习",
                    ),
                    s.createElement(
                      d.Button,
                      {
                        type: "link",
                        style: {
                          borderColor: "var(--button-border-color)",
                        },
                        onClick: function () {
                          (A(!0),
                            x.postMessage({
                              command: "getUserTemplateInfo",
                            }));
                        },
                      },
                      "智能组卷",
                    ),
                  ),
              ),
            (se === g.SELECTENUM.SHENLUN || se === g.SELECTENUM.ZHYYNL) &&
              s.createElement(
                "div",
                null,
                "ps：申论功能需要前往粉笔官网充vip才能交卷，与该插件无关，由于没有vip，交卷及后续功能暂无法支持，感谢理解！",
              ),
            (0, g.isInterviewCategory)(se) &&
              s.createElement(
                "div",
                null,
                "ps：面试功能需要前往粉笔官网充vip才能显示并查看解析视频、详细解析，没有vip仅显示问题与部分解析，与该插件无关。",
              ),
            s.createElement(
              "div",
              {
                className: "menu-container",
              },
              !(0, g.isInterviewCategory)(se) &&
                s.createElement(h.HistoryCard, {
                  onClick: function () {
                    var e = J.categoryId || "xingce";
                    if (!(0, g.isInterviewCategory)(e)) {
                      var t = (0, g.getCategoryRouteConfig)(e);
                      te("/history", {
                        state: {
                          count: 15,
                          categoryId: t.historyCategoryId,
                        },
                      });
                    }
                  },
                  data: o,
                  goExercise: function (e) {
                    ae({
                      type: 1,
                      combineKey: null == e ? void 0 : e.key,
                    });
                  },
                }),
              !(0, g.isInterviewCategory)(se) &&
                s.createElement(f.QuestionCount, {
                  onChange: function (e) {
                    (A(!0),
                      x.postMessage({
                        command: "changeQuestionCount",
                        postData: {
                          questionCount: e,
                        },
                      }));
                  },
                }),
              s.createElement(m.CustomTree, {
                treeData: Y,
              }),
            ),
          ),
        ),
        s.createElement(
          d.Modal,
          {
            title: "智能组卷",
            open: T,
            okText: "生成试卷",
            cancelText: "取消",
            onOk: function () {
              (B(!1),
                ae({
                  mode: "smart",
                  smartYearScope: W,
                }));
            },
            onCancel: function () {
              return B(!1);
            },
          },
          s.createElement(
            "div",
            {
              style: {
                marginBottom: 12,
              },
            },
            "出题年份",
          ),
          s.createElement(d.Radio.Group, {
            options: E,
            optionType: "button",
            value: W,
            onChange: function (e) {
              return q(e.target.value);
            },
          }),
        ),
        s.createElement(
          d.Modal,
          {
            className: "theme_exempt",
            title: "设置",
            open: D,
            width: 280,
            okText: "保存",
            cancelText: "取消",
            maskStyle: M.mask,
            styles: {
              content: M.content,
              header: M.header,
              body: M.body,
              footer: M.footer,
            },
            onOk: ie,
            onCancel: function () {
              return F(!1);
            },
          },
          s.createElement(O, {
            settingsDraft: U,
            updateSettingsDraft: function (e, t) {
              X(function (n) {
                return a(a({}, n), {}, i({}, e, t));
              });
            },
            saveSettings: ie,
            closeSettings: function () {
              return F(!1);
            },
          }),
        ),
        n,
      )
    );
  };
};
