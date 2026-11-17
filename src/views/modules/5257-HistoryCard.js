// 从安装包提取的模块 5257；导出：HistoryCard。
(e, t, n) => {
  "use strict";

  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.HistoryCard = void 0));
  const r = n(6540),
    o = n(1508);
  t.HistoryCard = function (e) {
    var t,
      n,
      a = e.onClick,
      i = e.data,
      l = e.goExercise,
      c = i.find(function (e) {
        return 0 == (null == e ? void 0 : e.status);
      });
    return r.createElement(
      "div",
      {
        className: "card-border",
        style: {
          border: "1px solid var(--card-border-color)",
          borderRadius: 5,
          padding: 10,
        },
      },
      r.createElement(
        o.Flex,
        {
          justify: "space-between",
          align: "center",
        },
        r.createElement("span", null, "练习历史"),
        r.createElement(
          o.Button,
          {
            type: "primary",
            style: {
              borderColor: "var(--button-border-color)",
            },
            onClick: a,
          },
          "全部（最近15条）",
        ),
      ),
      0 == (null == c ? void 0 : c.status) &&
        (null == c || null === (t = c.sheet) || void 0 === t ? void 0 : t.type) <= 3
        ? r.createElement(
            "div",
            null,
            r.createElement(
              "p",
              null,
              null == c || null === (n = c.sheet) || void 0 === n ? void 0 : n.name,
            ),
            r.createElement(
              "p",
              null,
              "创建时间：",
              (function (e) {
                if (!e) return "";
                var t = new Date(e);
                if (Number.isNaN(t.getTime())) return "";
                var n = t.getFullYear(),
                  r = String(t.getMonth() + 1).padStart(2, "0"),
                  o = String(t.getDate()).padStart(2, "0");
                return "".concat(n, "-").concat(r, "-").concat(o);
              })(null == c ? void 0 : c.createdTime),
            ),
            r.createElement(
              o.Button,
              {
                type: "primary",
                style: {
                  borderColor: "var(--button-border-color)",
                },
                onClick: function () {
                  l(c);
                },
              },
              "继续做题",
            ),
          )
        : null,
    );
  };
};
