// 从安装包提取的模块 5337；导出：ShenlunItem。
(e, t, n) => {
  "use strict";

  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.ShenlunItem = void 0));
  const r = n(6540),
    o = n(1508),
    a = n(2961);
  var i = o.Input.TextArea;
  t.ShenlunItem = function (e) {
    var t,
      n = e.data,
      l = void 0 === n ? [] : n,
      c = e.materials,
      s = void 0 === c ? [] : c,
      u = e.onChange,
      d = e.index,
      f = e.disabled,
      m = void 0 !== f && f;
    return r.createElement(
      "div",
      null,
      (s || []).length > 0 &&
        r.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: (null == s || null === (t = s[d]) || void 0 === t ? void 0 : t.content) || "",
          },
        }),
      l.map(function (e, t) {
        var n, l, c, s;
        return r.createElement(
          "div",
          {
            className: "question-item",
            key: e.globalId || e.id || t,
          },
          r.createElement("span", null, t + 1, "、"),
          r.createElement("span", {
            dangerouslySetInnerHTML: {
              __html: e.content,
            },
          }),
          r.createElement(
            "div",
            {
              className: "answer-item",
            },
            (e.accessories || []).map(function (n, o) {
              var a;
              return r.createElement(i, {
                key: "".concat(e.globalId || e.id || t, "-").concat(o),
                defaultValue:
                  (null == e || null === (a = e.userAnswer) || void 0 === a ? void 0 : a.answer) ||
                  "",
                maxLength: (null == n ? void 0 : n.wordCount) || void 0,
                allowClear: !0,
                disabled: m,
                placeholder: "请输入答案...",
                showCount: !0,
                rows: 6,
                onBlur: function (n) {
                  u(n.target.value, e, t);
                },
              });
            }),
          ),
          "solution" in e &&
            e.solution &&
            r.createElement(
              "div",
              {
                className: "solution-container",
              },
              r.createElement(
                "p",
                null,
                r.createElement(
                  "span",
                  {
                    className:
                      (null == e || null === (n = e.userAnswer) || void 0 === n
                        ? void 0
                        : n.choice) ===
                      (null == e || null === (l = e.correctAnswer) || void 0 === l
                        ? void 0
                        : l.choice)
                        ? "green"
                        : "red",
                    style: {
                      marginRight: "5px",
                    },
                  },
                  "你的答案：",
                  a.radioMap[
                    Number(
                      null == e || null === (c = e.userAnswer) || void 0 === c ? void 0 : c.choice,
                    ) + 1
                  ],
                ),
                r.createElement(
                  "span",
                  {
                    className: "green",
                  },
                  "正确答案：",
                  a.radioMap[
                    Number(
                      null == e || null === (s = e.correctAnswer) || void 0 === s
                        ? void 0
                        : s.choice,
                    ) + 1
                  ],
                ),
              ),
              r.createElement(
                "div",
                {
                  style: {
                    fontWeight: "bold",
                  },
                },
                "解析：",
              ),
              r.createElement("div", {
                className: "solution",
                dangerouslySetInnerHTML: {
                  __html: e.solution,
                },
              }),
              e.keypoints &&
                e.keypoints.length > 0 &&
                r.createElement(
                  "div",
                  {
                    className: "keypoints",
                  },
                  r.createElement(
                    "span",
                    {
                      className: "keypoints-label",
                    },
                    "考点：",
                  ),
                  e.keypoints.map(function (e) {
                    return r.createElement(
                      o.Button,
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
        );
      }),
    );
  };
};
