// 从安装包提取的模块 5417；导出：groupByMaterialIndexesTo2DArray。
(e, t) => {
  "use strict";

  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.groupByMaterialIndexesTo2DArray = void 0),
    (t.groupByMaterialIndexesTo2DArray = function (e) {
      var t = e.reduce(function (e, t) {
        var n =
          t.materialIndexes && t.materialIndexes.length > 0
            ? t.materialIndexes.join(",")
            : "noIndexes";
        return (e[n] || (e[n] = []), e[n].push(t), e);
      }, {});
      return Object.values(t);
    }));
};
