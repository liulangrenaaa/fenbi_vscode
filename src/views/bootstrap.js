/*! For license information please see main.js.LICENSE.txt */
(() => {
  var e,
    t,
    n = __FENBI_LOCAL_MODULES__,
    r = {};
  function o(e) {
    var t = r[e];
    if (void 0 !== t) return t.exports;
    var a = (r[e] = {
      id: e,
      exports: {},
    });
    return (n[e].call(a.exports, a, a.exports, o), a.exports);
  }
  ((o.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return (
      o.d(t, {
        a: t,
      }),
      t
    );
  }),
    (t = Object.getPrototypeOf ? (e) => Object.getPrototypeOf(e) : (e) => e.__proto__),
    (o.t = function (n, r) {
      if ((1 & r && (n = this(n)), 8 & r)) return n;
      if ("object" == typeof n && n) {
        if (4 & r && n.__esModule) return n;
        if (16 & r && "function" == typeof n.then) return n;
      }
      var a = Object.create(null);
      o.r(a);
      var i = {};
      e = e || [null, t({}), t([]), t(t)];
      for (var l = 2 & r && n; "object" == typeof l && !~e.indexOf(l); l = t(l))
        Object.getOwnPropertyNames(l).forEach((e) => (i[e] = () => n[e]));
      return ((i.default = () => n), o.d(a, i), a);
    }),
    (o.d = (e, t) => {
      for (var n in t)
        o.o(t, n) &&
          !o.o(e, n) &&
          Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n],
          });
    }),
    (o.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (o.r = (e) => {
      ("undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module",
        }),
        Object.defineProperty(e, "__esModule", {
          value: !0,
        }));
    }),
    (o.nc = void 0),
    (() => {
      "use strict";

      const e = o(6540),
        t = o(5338),
        n = o(6804);
      o(3679);
      var r = document.getElementById("root");
      r || (((r = document.createElement("div")).id = "root"), document.body.appendChild(r));
      var a = document.getElementById("loading");
      (a && (a.style.display = "none"), t.createRoot(r).render(e.createElement(n.App, null)));
    })());
})();
