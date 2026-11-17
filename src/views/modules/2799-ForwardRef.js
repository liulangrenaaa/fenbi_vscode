// 从安装包提取的模块 2799；导出：isMemo、isFragment、ForwardRef。
(e, t) => {
  "use strict";

  var n = Symbol.for("react.element"),
    r = Symbol.for("react.portal"),
    o = Symbol.for("react.fragment"),
    a = Symbol.for("react.strict_mode"),
    i = Symbol.for("react.profiler"),
    l = Symbol.for("react.provider"),
    c = Symbol.for("react.context"),
    s = Symbol.for("react.server_context"),
    u = Symbol.for("react.forward_ref"),
    d = Symbol.for("react.suspense"),
    f = Symbol.for("react.suspense_list"),
    m = Symbol.for("react.memo"),
    h = Symbol.for("react.lazy");
  Symbol.for("react.offscreen");
  function p(e) {
    if ("object" == typeof e && null !== e) {
      var t = e.$$typeof;
      switch (t) {
        case n:
          switch ((e = e.type)) {
            case o:
            case i:
            case a:
            case d:
            case f:
              return e;
            default:
              switch ((e = e && e.$$typeof)) {
                case s:
                case c:
                case u:
                case h:
                case m:
                case l:
                  return e;
                default:
                  return t;
              }
          }
        case r:
          return t;
      }
    }
  }
  (Symbol.for("react.module.reference"),
    (t.ForwardRef = u),
    (t.isFragment = function (e) {
      return p(e) === o;
    }),
    (t.isMemo = function (e) {
      return p(e) === m;
    }));
};
