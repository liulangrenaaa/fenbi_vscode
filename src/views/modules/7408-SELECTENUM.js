// 从安装包提取的模块 7408；导出：getFavoriteQuizCourseSetPrefix、isInterviewCategory、isCareerCategory、isEssayCategory、getCategoryRouteConfig、categoryRouteConfigMap、SELECTENUM。
(e, t) => {
  "use strict";

  function n(e) {
    return (
      (n =
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
      n(e)
    );
  }
  function r(e, t, r) {
    return (
      (t = (function (e) {
        var t = (function (e) {
          if ("object" != n(e) || !e) return e;
          var t = e[Symbol.toPrimitive];
          if (void 0 !== t) {
            var r = t.call(e, "string");
            if ("object" != n(r)) return r;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(e);
        })(e);
        return "symbol" == n(t) ? t : t + "";
      })(t)) in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  var o;
  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.getFavoriteQuizCourseSetPrefix =
      t.isInterviewCategory =
      t.isCareerCategory =
      t.isEssayCategory =
      t.getCategoryRouteConfig =
      t.categoryRouteConfigMap =
      t.SELECTENUM =
        void 0),
    (t.SELECTENUM =
      (((o = {}).XINGCE = "xingce"),
      (o.SHENLUN = "shenlun"),
      (o.GAZJ = "gazj"),
      (o.SYZC = "syzc"),
      (o.SYDW = "sydw"),
      (o.ZHYYNL = "zhyynl"),
      (o.SYDWMS = "sydwms"),
      (o.GWYMS = "gwyms"),
      o)),
    (t.categoryRouteConfigMap = r(
      r(
        r(
          r(
            r(
              r(
                r(
                  r({}, t.SELECTENUM.XINGCE, {
                    routecs: t.SELECTENUM.XINGCE,
                    courseSetPrefix: t.SELECTENUM.XINGCE,
                    tikuPrefix: t.SELECTENUM.XINGCE,
                    answerMode: "objective",
                    apiCategory: t.SELECTENUM.XINGCE,
                    historyCategoryId: 4,
                  }),
                  t.SELECTENUM.SHENLUN,
                  {
                    routecs: t.SELECTENUM.SHENLUN,
                    courseSetPrefix: t.SELECTENUM.SHENLUN,
                    tikuPrefix: t.SELECTENUM.SHENLUN,
                    answerMode: "essay",
                    apiCategory: t.SELECTENUM.SHENLUN,
                    historyCategoryId: 4,
                  },
                ),
                t.SELECTENUM.GAZJ,
                {
                  routecs: t.SELECTENUM.GAZJ,
                  courseSetPrefix: t.SELECTENUM.GAZJ,
                  tikuPrefix: t.SELECTENUM.GAZJ,
                  answerMode: "objective",
                  apiCategory: t.SELECTENUM.GAZJ,
                  historyCategoryId: 4,
                },
              ),
              t.SELECTENUM.SYZC,
              {
                routecs: t.SELECTENUM.SYZC,
                courseSetPrefix: t.SELECTENUM.SYDW,
                tikuPrefix: t.SELECTENUM.SYZC,
                answerMode: "objective",
                apiCategory: t.SELECTENUM.SYZC,
                historyCategoryId: 4,
              },
            ),
            t.SELECTENUM.SYDW,
            {
              routecs: t.SELECTENUM.SYDW,
              courseSetPrefix: t.SELECTENUM.SYDW,
              tikuPrefix: t.SELECTENUM.SYDW,
              answerMode: "objective",
              apiCategory: t.SELECTENUM.SYDW,
              historyCategoryId: 4,
            },
          ),
          t.SELECTENUM.ZHYYNL,
          {
            routecs: t.SELECTENUM.ZHYYNL,
            courseSetPrefix: t.SELECTENUM.ZHYYNL,
            tikuPrefix: t.SELECTENUM.ZHYYNL,
            answerMode: "essay",
            apiCategory: t.SELECTENUM.SYDW,
            historyCategoryId: 4,
          },
        ),
        t.SELECTENUM.SYDWMS,
        {
          routecs: t.SELECTENUM.SYDWMS,
          courseSetPrefix: t.SELECTENUM.SYDWMS,
          tikuPrefix: t.SELECTENUM.SYDWMS,
          answerMode: "essay",
          apiCategory: t.SELECTENUM.SYDWMS,
          historyCategoryId: 4,
        },
      ),
      t.SELECTENUM.GWYMS,
      {
        routecs: t.SELECTENUM.GWYMS,
        courseSetPrefix: t.SELECTENUM.GWYMS,
        tikuPrefix: t.SELECTENUM.GWYMS,
        answerMode: "essay",
        apiCategory: t.SELECTENUM.GWYMS,
        historyCategoryId: 4,
      },
    )),
    (t.getCategoryRouteConfig = function (e) {
      return (
        t.categoryRouteConfigMap[e || t.SELECTENUM.XINGCE] ||
        t.categoryRouteConfigMap[t.SELECTENUM.XINGCE]
      );
    }),
    (t.isEssayCategory = function (e) {
      return "essay" === (0, t.getCategoryRouteConfig)(e).answerMode;
    }),
    (t.isCareerCategory = function (e) {
      return (
        e === t.SELECTENUM.SYZC ||
        e === t.SELECTENUM.SYDW ||
        e === t.SELECTENUM.ZHYYNL ||
        e === t.SELECTENUM.SYDWMS
      );
    }),
    (t.isInterviewCategory = function (e) {
      return e === t.SELECTENUM.SYDWMS || e === t.SELECTENUM.GWYMS;
    }),
    (t.getFavoriteQuizCourseSetPrefix = function (e) {
      return (0, t.isCareerCategory)(e) ? t.SELECTENUM.SYDW : t.SELECTENUM.XINGCE;
    }));
};
