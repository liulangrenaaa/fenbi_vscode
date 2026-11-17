// 从安装包提取的模块 9226；导出：setImg。
(e, t) => {
  "use strict";

  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.setImg = void 0),
    (t.setImg = function (e) {
      if (!e) return "";
      var t = e.replace(/(<img[^>]+src=")([^"]+)/g, function (e, t, n) {
        return n.startsWith("https:") ? t + n : t + "https:" + n;
      });
      return (t = t.replace(/\swidth\s*=\s*(['"])[^'"]*\1/gi, "")).replace(
        /\sheight\s*=\s*(['"])[^'"]*\1/gi,
        "",
      );
    }));
};
