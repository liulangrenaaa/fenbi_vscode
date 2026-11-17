// 从安装包提取的模块 6606；导出：getObjectiveResultStats。
(e, t, n) => {
  "use strict";

  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.getObjectiveResultStats = void 0));
  const r = n(5077);
  t.getObjectiveResultStats = function () {
    var e = 0,
      t = 0;
    return (
      (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function (n) {
        var o,
          a,
          i = 2 === n.type,
          l = (0, r.normalizeChoice)(
            null === (o = n.userAnswer) || void 0 === o ? void 0 : o.choice,
            i,
          ),
          c = (0, r.normalizeChoice)(
            null === (a = n.correctAnswer) || void 0 === a ? void 0 : a.choice,
            i,
          );
        l && c && ((e += 1), l === c && (t += 1));
      }),
      {
        questionCount: e,
        correctCount: t,
      }
    );
  };
};
