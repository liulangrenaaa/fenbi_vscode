// 从安装包提取的模块 2961；导出：getCategoryOptions、categoryOptions、radioMap、SELECTENUM、isInterviewCategory、isEssayCategory、isCareerCategory、getCategoryRouteConfig、categoryRouteConfigMap。
(e, t, n) => {
  "use strict";

  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.getCategoryOptions =
      t.categoryOptions =
      t.radioMap =
      t.SELECTENUM =
      t.isInterviewCategory =
      t.isEssayCategory =
      t.isCareerCategory =
      t.getCategoryRouteConfig =
      t.categoryRouteConfigMap =
        void 0));
  const r = n(7408);
  var o = n(7408);
  (Object.defineProperty(t, "categoryRouteConfigMap", {
    enumerable: !0,
    get: function () {
      return o.categoryRouteConfigMap;
    },
  }),
    Object.defineProperty(t, "getCategoryRouteConfig", {
      enumerable: !0,
      get: function () {
        return o.getCategoryRouteConfig;
      },
    }),
    Object.defineProperty(t, "isCareerCategory", {
      enumerable: !0,
      get: function () {
        return o.isCareerCategory;
      },
    }),
    Object.defineProperty(t, "isEssayCategory", {
      enumerable: !0,
      get: function () {
        return o.isEssayCategory;
      },
    }),
    Object.defineProperty(t, "isInterviewCategory", {
      enumerable: !0,
      get: function () {
        return o.isInterviewCategory;
      },
    }),
    Object.defineProperty(t, "SELECTENUM", {
      enumerable: !0,
      get: function () {
        return o.SELECTENUM;
      },
    }),
    (t.radioMap = {
      1: "A",
      2: "B",
      3: "C",
      4: "D",
      5: "E",
      6: "F",
      7: "G",
      8: "H",
      9: "I",
      10: "J",
      11: "K",
    }),
    (t.categoryOptions = [
      {
        label: "行测",
        value: r.SELECTENUM.XINGCE,
      },
      {
        label: "申论",
        value: r.SELECTENUM.SHENLUN,
      },
      {
        label: "公务员面试",
        value: r.SELECTENUM.GWYMS,
      },
      {
        label: "事业编笔试",
        value: r.SELECTENUM.SYZC,
      },
      {
        label: "事业单位综应",
        value: r.SELECTENUM.ZHYYNL,
      },
      {
        label: "事业单位面试",
        value: r.SELECTENUM.SYDWMS,
      },
    ]),
    (t.getCategoryOptions = function () {
      return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).includes(
        r.SELECTENUM.GAZJ,
      )
        ? [].concat(t.categoryOptions, [
            {
              label: "公安专业科目",
              value: r.SELECTENUM.GAZJ,
            },
          ])
        : t.categoryOptions;
    }));
};
