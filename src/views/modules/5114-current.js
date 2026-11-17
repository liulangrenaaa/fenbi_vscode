// 从安装包提取的模块 5114；导出：useVscodeMessage、current。
(e, t, n) => {
  "use strict";

  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.useVscodeMessage = void 0));
  const r = n(6540);
  t.useVscodeMessage = function (e) {
    var t = r.useRef(e);
    (r.useEffect(
      function () {
        t.current = e;
      },
      [e],
    ),
      r.useEffect(function () {
        var e = function (e) {
          t.current(e.data);
        };
        return (
          window.addEventListener("message", e),
          function () {
            return window.removeEventListener("message", e);
          }
        );
      }, []));
  };
};
