"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavoriteQuizCourseSetPrefix = exports.isInterviewCategory = exports.isCareerCategory = exports.isEssayCategory = exports.getCategoryRouteConfig = exports.categoryRouteConfigMap = exports.SELECTENUM = void 0;
var SELECTENUM;
(function (SELECTENUM) {
    SELECTENUM["XINGCE"] = "xingce";
    SELECTENUM["SHENLUN"] = "shenlun";
    SELECTENUM["GAZJ"] = "gazj";
    SELECTENUM["SYZC"] = "syzc";
    SELECTENUM["SYDW"] = "sydw";
    SELECTENUM["ZHYYNL"] = "zhyynl";
    SELECTENUM["SYDWMS"] = "sydwms";
    SELECTENUM["GWYMS"] = "gwyms";
})(SELECTENUM = exports.SELECTENUM || (exports.SELECTENUM = {}));
exports.categoryRouteConfigMap = {
    [SELECTENUM.XINGCE]: {
        routecs: SELECTENUM.XINGCE,
        courseSetPrefix: SELECTENUM.XINGCE,
        tikuPrefix: SELECTENUM.XINGCE,
        answerMode: "objective",
        apiCategory: SELECTENUM.XINGCE,
        historyCategoryId: 4,
    },
    [SELECTENUM.SHENLUN]: {
        routecs: SELECTENUM.SHENLUN,
        courseSetPrefix: SELECTENUM.SHENLUN,
        tikuPrefix: SELECTENUM.SHENLUN,
        answerMode: "essay",
        apiCategory: SELECTENUM.SHENLUN,
        historyCategoryId: 4,
    },
    [SELECTENUM.GAZJ]: {
        routecs: SELECTENUM.GAZJ,
        courseSetPrefix: SELECTENUM.GAZJ,
        tikuPrefix: SELECTENUM.GAZJ,
        answerMode: "objective",
        apiCategory: SELECTENUM.GAZJ,
        historyCategoryId: 4,
    },
    [SELECTENUM.SYZC]: {
        routecs: SELECTENUM.SYZC,
        courseSetPrefix: SELECTENUM.SYDW,
        tikuPrefix: SELECTENUM.SYZC,
        answerMode: "objective",
        apiCategory: SELECTENUM.SYZC,
        historyCategoryId: 4,
    },
    [SELECTENUM.SYDW]: {
        routecs: SELECTENUM.SYDW,
        courseSetPrefix: SELECTENUM.SYDW,
        tikuPrefix: SELECTENUM.SYDW,
        answerMode: "objective",
        apiCategory: SELECTENUM.SYDW,
        historyCategoryId: 4,
    },
    [SELECTENUM.ZHYYNL]: {
        routecs: SELECTENUM.ZHYYNL,
        courseSetPrefix: SELECTENUM.ZHYYNL,
        tikuPrefix: SELECTENUM.ZHYYNL,
        answerMode: "essay",
        apiCategory: SELECTENUM.SYDW,
        historyCategoryId: 4,
    },
    [SELECTENUM.SYDWMS]: {
        routecs: SELECTENUM.SYDWMS,
        courseSetPrefix: SELECTENUM.SYDWMS,
        tikuPrefix: SELECTENUM.SYDWMS,
        answerMode: "essay",
        apiCategory: SELECTENUM.SYDWMS,
        historyCategoryId: 4,
    },
    [SELECTENUM.GWYMS]: {
        routecs: SELECTENUM.GWYMS,
        courseSetPrefix: SELECTENUM.GWYMS,
        tikuPrefix: SELECTENUM.GWYMS,
        answerMode: "essay",
        apiCategory: SELECTENUM.GWYMS,
        historyCategoryId: 4,
    },
};
const getCategoryRouteConfig = (category) => {
    return (exports.categoryRouteConfigMap[category || SELECTENUM.XINGCE] ||
        exports.categoryRouteConfigMap[SELECTENUM.XINGCE]);
};
exports.getCategoryRouteConfig = getCategoryRouteConfig;
const isEssayCategory = (category) => {
    return (0, exports.getCategoryRouteConfig)(category).answerMode === "essay";
};
exports.isEssayCategory = isEssayCategory;
const isCareerCategory = (category) => {
    return (category === SELECTENUM.SYZC ||
        category === SELECTENUM.SYDW ||
        category === SELECTENUM.ZHYYNL ||
        category === SELECTENUM.SYDWMS);
};
exports.isCareerCategory = isCareerCategory;
const isInterviewCategory = (category) => {
    return category === SELECTENUM.SYDWMS || category === SELECTENUM.GWYMS;
};
exports.isInterviewCategory = isInterviewCategory;
const getFavoriteQuizCourseSetPrefix = (category) => {
    return (0, exports.isCareerCategory)(category) ? SELECTENUM.SYDW : SELECTENUM.XINGCE;
};
exports.getFavoriteQuizCourseSetPrefix = getFavoriteQuizCourseSetPrefix;
//# sourceMappingURL=category.js.map