// 从安装包提取的模块 5077；导出：normalizeChoice、parseChoiceIndexes。
(e, t) => {
  "use strict";

  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.normalizeChoice = t.parseChoiceIndexes = void 0));
  var n = function (e) {
    var t = Number(e);
    return Number.isFinite(t) ? t : void 0;
  };
  ((t.parseChoiceIndexes = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    if (Array.isArray(e))
      return e.map(n).filter(function (e) {
        return void 0 !== e;
      });
    if (null == e) return [];
    var r = String(e).trim();
    if (!r) return [];
    if (/\D/.test(r)) return r.split(/\D+/).filter(Boolean).map(Number).filter(Number.isFinite);
    if (t && r.length > 1) return r.split("").map(Number).filter(Number.isFinite);
    var o = Number(r);
    return Number.isFinite(o) ? [o] : [];
  }),
    (t.normalizeChoice = function (e) {
      var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      return (0, t.parseChoiceIndexes)(e, n)
        .slice()
        .sort(function (e, t) {
          return e - t;
        })
        .join(",");
    }));
};
