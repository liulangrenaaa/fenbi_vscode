// 从安装包提取的模块 8595；导出：getVscodeApi。
(e, t) => {
  "use strict";

  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.getVscodeApi = void 0));
  var n = null;
  t.getVscodeApi = function () {
    return (n || (n = acquireVsCodeApi()), n);
  };
};
