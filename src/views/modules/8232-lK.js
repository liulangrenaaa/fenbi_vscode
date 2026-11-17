// 从安装包提取的模块 8232；导出：lK、qg。
(e, t) => {
  "use strict";

  ((t.qg = function (e, t) {
    const n = new l(),
      r = e.length;
    if (r < 2) return n;
    const o = t?.decode || u;
    let a = 0;
    do {
      const t = e.indexOf("=", a);
      if (-1 === t) break;
      const i = e.indexOf(";", a),
        l = -1 === i ? r : i;
      if (t > l) {
        a = e.lastIndexOf(";", t - 1) + 1;
        continue;
      }
      const u = c(e, a, t),
        d = s(e, t, u),
        f = e.slice(u, d);
      if (void 0 === n[f]) {
        let r = c(e, t + 1, l),
          a = s(e, l, r);
        const i = o(e.slice(r, a));
        n[f] = i;
      }
      a = l + 1;
    } while (a < r);
    return n;
  }),
    (t.lK = function (e, t, l) {
      const c = l?.encode || encodeURIComponent;
      if (!n.test(e)) throw new TypeError(`argument name is invalid: ${e}`);
      const s = c(t);
      if (!r.test(s)) throw new TypeError(`argument val is invalid: ${t}`);
      let u = e + "=" + s;
      if (!l) return u;
      if (void 0 !== l.maxAge) {
        if (!Number.isInteger(l.maxAge))
          throw new TypeError(`option maxAge is invalid: ${l.maxAge}`);
        u += "; Max-Age=" + l.maxAge;
      }
      if (l.domain) {
        if (!o.test(l.domain)) throw new TypeError(`option domain is invalid: ${l.domain}`);
        u += "; Domain=" + l.domain;
      }
      if (l.path) {
        if (!a.test(l.path)) throw new TypeError(`option path is invalid: ${l.path}`);
        u += "; Path=" + l.path;
      }
      if (l.expires) {
        if (
          !(function (e) {
            return "[object Date]" === i.call(e);
          })(l.expires) ||
          !Number.isFinite(l.expires.valueOf())
        )
          throw new TypeError(`option expires is invalid: ${l.expires}`);
        u += "; Expires=" + l.expires.toUTCString();
      }
      if (
        (l.httpOnly && (u += "; HttpOnly"),
        l.secure && (u += "; Secure"),
        l.partitioned && (u += "; Partitioned"),
        l.priority)
      )
        switch ("string" == typeof l.priority ? l.priority.toLowerCase() : void 0) {
          case "low":
            u += "; Priority=Low";
            break;
          case "medium":
            u += "; Priority=Medium";
            break;
          case "high":
            u += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${l.priority}`);
        }
      if (l.sameSite)
        switch ("string" == typeof l.sameSite ? l.sameSite.toLowerCase() : l.sameSite) {
          case !0:
          case "strict":
            u += "; SameSite=Strict";
            break;
          case "lax":
            u += "; SameSite=Lax";
            break;
          case "none":
            u += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${l.sameSite}`);
        }
      return u;
    }));
  const n = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    r = /^[\u0021-\u003A\u003C-\u007E]*$/,
    o = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    a = /^[\u0020-\u003A\u003D-\u007E]*$/,
    i = Object.prototype.toString,
    l = (() => {
      const e = function () {};
      return ((e.prototype = Object.create(null)), e);
    })();
  function c(e, t, n) {
    do {
      const n = e.charCodeAt(t);
      if (32 !== n && 9 !== n) return t;
    } while (++t < n);
    return n;
  }
  function s(e, t, n) {
    for (; t > n;) {
      const n = e.charCodeAt(--t);
      if (32 !== n && 9 !== n) return t + 1;
    }
    return n;
  }
  function u(e) {
    if (-1 === e.indexOf("%")) return e;
    try {
      return decodeURIComponent(e);
    } catch (t) {
      return e;
    }
  }
};
