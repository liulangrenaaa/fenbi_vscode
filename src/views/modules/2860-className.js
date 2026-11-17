// 从安装包提取的模块 2860；导出：className。
(e, t, n) => {
  "use strict";

  n.d(t, {
    $e: () => d,
    Em: () => p,
    P3: () => f,
    al: () => v,
    cM: () => h,
    lf: () => b,
    yf: () => g,
  });
  var r = n(9379),
    o = n(2284),
    a = n(5748),
    i = n(5089),
    l = n(2633),
    c = n(8210),
    s = n(6540),
    u = n(1053);
  function d(e, t) {
    (0, c.Ay)(e, "[@ant-design/icons] ".concat(t));
  }
  function f(e) {
    return (
      "object" === (0, o.A)(e) &&
      "string" == typeof e.name &&
      "string" == typeof e.theme &&
      ("object" === (0, o.A)(e.icon) || "function" == typeof e.icon)
    );
  }
  function m() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return Object.keys(e).reduce(function (t, n) {
      var r,
        o = e[n];
      return (
        "class" === n
          ? ((t.className = o), delete t.class)
          : (delete t[n],
            (t[
              ((r = n),
              r.replace(/-(.)/g, function (e, t) {
                return t.toUpperCase();
              }))
            ] = o)),
        t
      );
    }, {});
  }
  function h(e, t, n) {
    return n
      ? s.createElement(
          e.tag,
          (0, r.A)(
            (0, r.A)(
              {
                key: t,
              },
              m(e.attrs),
            ),
            n,
          ),
          (e.children || []).map(function (n, r) {
            return h(n, "".concat(t, "-").concat(e.tag, "-").concat(r));
          }),
        )
      : s.createElement(
          e.tag,
          (0, r.A)(
            {
              key: t,
            },
            m(e.attrs),
          ),
          (e.children || []).map(function (n, r) {
            return h(n, "".concat(t, "-").concat(e.tag, "-").concat(r));
          }),
        );
  }
  function p(e) {
    return (0, a.cM)(e)[0];
  }
  function v(e) {
    return e ? (Array.isArray(e) ? e : [e]) : [];
  }
  var g = {
      width: "1em",
      height: "1em",
      fill: "currentColor",
      "aria-hidden": "true",
      focusable: "false",
    },
    b = function (e) {
      var t = (0, s.useContext)(u.A),
        n = t.csp,
        r = t.prefixCls,
        o =
          "\n.anticon {\n  display: inline-flex;\n  align-items: center;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
      (r && (o = o.replace(/anticon/g, r)),
        (0, s.useEffect)(function () {
          var t = e.current,
            r = (0, l.j)(t);
          (0, i.BD)(o, "@ant-design-icons", {
            prepend: !0,
            csp: n,
            attachTo: r,
          });
        }, []));
    };
};
