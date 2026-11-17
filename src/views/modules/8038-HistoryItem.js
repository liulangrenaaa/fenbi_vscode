// 从安装包提取的模块 8038；导出：HistoryItem。
(e, t, n) => {
  "use strict";

  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.HistoryItem = void 0));
  const r = n(1508),
    o = n(6540),
    a = n(4353),
    i = n(4976);
  t.HistoryItem = function (e) {
    var t,
      n,
      l = e.data,
      c = e.goExercise,
      s = (0, i.useNavigate)();
    return o.createElement(
      "div",
      {
        style: {
          border: "1px solid #ffffff",
          borderRadius: 5,
          padding: 10,
        },
      },
      o.createElement(
        r.Flex,
        {
          justify: "space-between",
          align: "center",
        },
        o.createElement(
          "div",
          null,
          o.createElement(
            "p",
            null,
            null == l || null === (t = l.sheet) || void 0 === t ? void 0 : t.name,
          ),
          o.createElement(
            "p",
            null,
            1 == (null == l || null === (n = l.sheet) || void 0 === n ? void 0 : n.type)
              ? "试卷"
              : "练习",
          ),
          o.createElement(
            "p",
            null,
            "创建时间：",
            a(null == l ? void 0 : l.createdTime).format("YYYY-MM-DD"),
          ),
          o.createElement(
            "p",
            null,
            "共",
            null == l ? void 0 : l.questionCount,
            "题,答对：",
            null == l ? void 0 : l.correctCount,
            "题",
          ),
        ),
        o.createElement(
          "div",
          null,
          o.createElement(
            r.Button,
            {
              type: "primary",
              style: {
                borderColor: "white",
              },
              onClick: function () {
                var e;
                1 != (null == l ? void 0 : l.status)
                  ? c(l)
                  : s("/answer", {
                      state: {
                        id: null == l ? void 0 : l.id,
                        combineKey: null == l ? void 0 : l.key,
                        type: null == l || null === (e = l.sheet) || void 0 === e ? void 0 : e.type,
                      },
                    });
              },
            },
            1 == (null == l ? void 0 : l.status) ? "已完成" : "继续做题",
          ),
        ),
      ),
    );
  };
};
