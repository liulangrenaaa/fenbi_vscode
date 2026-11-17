// 从安装包提取的模块 8934；导出：stack、body、headers、method、length、children、pathname、search、hash。
(e, t, n) => {
  "use strict";

  n.d(t, {
    $P: () => Bt,
    $n: () => It,
    AO: () => v,
    AV: () => Fn,
    AX: () => Yn,
    B6: () => V,
    BV: () => Tn,
    Bu: () => Mt,
    C5: () => Nn,
    EB: () => Gn,
    Eu: () => _n,
    Ew: () => hn,
    FE: () => fn,
    G3: () => he,
    Ge: () => Jo,
    Gy: () => ma,
    HC: () => re,
    HW: () => me,
    I9: () => ra,
    Ix: () => jn,
    J8: () => gn,
    K: () => Aa,
    KC: () => Xt,
    KD: () => Na,
    KP: () => wn,
    KT: () => Wn,
    KZ: () => Ot,
    Kd: () => na,
    LG: () => mn,
    Ls: () => ya,
    MF: () => Qr,
    N_: () => ia,
    OA: () => sa,
    OW: () => po,
    P1: () => Gt,
    PI: () => rr,
    PM: () => $a,
    Pl: () => Pt,
    Q2: () => Kn,
    QE: () => gt,
    QH: () => Rt,
    Qd: () => Yr,
    RF: () => Kr,
    RQ: () => _t,
    RV: () => Sa,
    R_: () => S,
    Ri: () => Vt,
    Rr: () => g,
    SI: () => wa,
    Sk: () => ne,
    Sv: () => vt,
    Tw: () => Ko,
    U: () => bt,
    U2: () => Tt,
    UU: () => Ur,
    Ul: () => jr,
    V1: () => f,
    V2: () => te,
    Vp: () => Jn,
    W8: () => _o,
    Wj: () => zo,
    Wt: () => On,
    YX: () => pt,
    Ye: () => Zt,
    Ys: () => Zo,
    ZD: () => Vr,
    Zp: () => Kt,
    _3: () => Nt,
    aB: () => x,
    aD: () => Xr,
    aE: () => we,
    aJ: () => Xo,
    ay: () => zt,
    bg: () => zn,
    cM: () => Do,
    cj: () => oe,
    cq: () => un,
    d6: () => xe,
    di: () => Lt,
    eF: () => Ce,
    fS: () => In,
    g: () => Yt,
    g$: () => ba,
    gI: () => qr,
    gQ: () => Gr,
    hA: () => bo,
    hf: () => $t,
    ht: () => Jr,
    jC: () => $n,
    jD: () => Bn,
    jM: () => wt,
    je: () => Ma,
    k2: () => la,
    kO: () => za,
    kc: () => ka,
    ks: () => oa,
    lF: () => Pr,
    lR: () => _r,
    lS: () => Oo,
    lV: () => ca,
    lq: () => En,
    mP: () => pn,
    mc: () => An,
    nW: () => kn,
    o1: () => W,
    oI: () => bn,
    of: () => ga,
    ok: () => ha,
    ou: () => vo,
    p: () => ee,
    p4: () => Mo,
    pX: () => ae,
    pb: () => _,
    pg: () => Rn,
    pp: () => Zn,
    q6: () => w,
    q9: () => qo,
    qF: () => Vo,
    qI: () => yo,
    qh: () => Pn,
    r5: () => vn,
    rc: () => l,
    sv: () => Ln,
    tW: () => B,
    uD: () => fe,
    ue: () => A,
    ux: () => Un,
    vB: () => Co,
    vL: () => dn,
    wQ: () => Ft,
    x$: () => Qt,
    xu: () => Ia,
    yL: () => Lo,
    zR: () => u,
    zy: () => Dt,
  });
  var r,
    o = n(6540),
    a = (e) => {
      throw TypeError(e);
    },
    i = (e, t, n) => (
      ((e, t) => {
        t.has(e) || a("Cannot read from private field");
      })(e, t),
      n ? n.call(e) : t.get(e)
    ),
    l = ((e) => ((e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE"), e))(l || {}),
    c = "popstate";
  function s(e = {}) {
    let t,
      { initialEntries: n = ["/"], initialIndex: r, v5Compat: o = !1 } = e;
    t = n.map((e, t) => u(e, "string" == typeof e ? null : e.state, 0 === t ? "default" : void 0));
    let a = c(null == r ? t.length - 1 : r),
      i = "POP",
      l = null;
    function c(e) {
      return Math.min(Math.max(e, 0), t.length - 1);
    }
    function s() {
      return t[a];
    }
    function u(e, n = null, r) {
      let o = p(t ? s().pathname : "/", e, n, r);
      return (
        m(
          "/" === o.pathname.charAt(0),
          `relative pathnames are not supported in memory history: ${JSON.stringify(e)}`,
        ),
        o
      );
    }
    function d(e) {
      return "string" == typeof e ? e : v(e);
    }
    return {
      get index() {
        return a;
      },
      get action() {
        return i;
      },
      get location() {
        return s();
      },
      createHref: d,
      createURL: (e) => new URL(d(e), "http://localhost"),
      encodeLocation(e) {
        let t = "string" == typeof e ? g(e) : e;
        return {
          pathname: t.pathname || "",
          search: t.search || "",
          hash: t.hash || "",
        };
      },
      push(e, n) {
        i = "PUSH";
        let r = u(e, n);
        ((a += 1),
          t.splice(a, t.length, r),
          o &&
            l &&
            l({
              action: i,
              location: r,
              delta: 1,
            }));
      },
      replace(e, n) {
        i = "REPLACE";
        let r = u(e, n);
        ((t[a] = r),
          o &&
            l &&
            l({
              action: i,
              location: r,
              delta: 0,
            }));
      },
      go(e) {
        i = "POP";
        let n = c(a + e),
          r = t[n];
        ((a = n),
          l &&
            l({
              action: i,
              location: r,
              delta: e,
            }));
      },
      listen: (e) => (
        (l = e),
        () => {
          l = null;
        }
      ),
    };
  }
  function u(e = {}) {
    return b(
      function (e, t) {
        let { pathname: n, search: r, hash: o } = e.location;
        return p(
          "",
          {
            pathname: n,
            search: r,
            hash: o,
          },
          (t.state && t.state.usr) || null,
          (t.state && t.state.key) || "default",
        );
      },
      function (e, t) {
        return "string" == typeof t ? t : v(t);
      },
      null,
      e,
    );
  }
  function d(e = {}) {
    return b(
      function (e, t) {
        let { pathname: n = "/", search: r = "", hash: o = "" } = g(e.location.hash.substring(1));
        return (
          n.startsWith("/") || n.startsWith(".") || (n = "/" + n),
          p(
            "",
            {
              pathname: n,
              search: r,
              hash: o,
            },
            (t.state && t.state.usr) || null,
            (t.state && t.state.key) || "default",
          )
        );
      },
      function (e, t) {
        let n = e.document.querySelector("base"),
          r = "";
        if (n && n.getAttribute("href")) {
          let t = e.location.href,
            n = t.indexOf("#");
          r = -1 === n ? t : t.slice(0, n);
        }
        return r + "#" + ("string" == typeof t ? t : v(t));
      },
      function (e, t) {
        m(
          "/" === e.pathname.charAt(0),
          `relative pathnames are not supported in hash history.push(${JSON.stringify(t)})`,
        );
      },
      e,
    );
  }
  function f(e, t) {
    if (!1 === e || null == e) throw new Error(t);
  }
  function m(e, t) {
    if (!e) {
      "undefined" != typeof console && console.warn(t);
      try {
        throw new Error(t);
      } catch (e) {}
    }
  }
  function h(e, t) {
    return {
      usr: e.state,
      key: e.key,
      idx: t,
    };
  }
  function p(e, t, n = null, r) {
    return {
      pathname: "string" == typeof e ? e : e.pathname,
      search: "",
      hash: "",
      ...("string" == typeof t ? g(t) : t),
      state: n,
      key: (t && t.key) || r || Math.random().toString(36).substring(2, 10),
    };
  }
  function v({ pathname: e = "/", search: t = "", hash: n = "" }) {
    return (
      t && "?" !== t && (e += "?" === t.charAt(0) ? t : "?" + t),
      n && "#" !== n && (e += "#" === n.charAt(0) ? n : "#" + n),
      e
    );
  }
  function g(e) {
    let t = {};
    if (e) {
      let n = e.indexOf("#");
      n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)));
      let r = e.indexOf("?");
      (r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))), e && (t.pathname = e));
    }
    return t;
  }
  function b(e, t, n, r = {}) {
    let { window: o = document.defaultView, v5Compat: a = !1 } = r,
      i = o.history,
      l = "POP",
      s = null,
      u = d();
    function d() {
      return (
        i.state || {
          idx: null,
        }
      ).idx;
    }
    function f() {
      l = "POP";
      let e = d(),
        t = null == e ? null : e - u;
      ((u = e),
        s &&
          s({
            action: l,
            location: v.location,
            delta: t,
          }));
    }
    function m(e) {
      return y(e);
    }
    null == u &&
      ((u = 0),
      i.replaceState(
        {
          ...i.state,
          idx: u,
        },
        "",
      ));
    let v = {
      get action() {
        return l;
      },
      get location() {
        return e(o, i);
      },
      listen(e) {
        if (s) throw new Error("A history only accepts one active listener");
        return (
          o.addEventListener(c, f),
          (s = e),
          () => {
            (o.removeEventListener(c, f), (s = null));
          }
        );
      },
      createHref: (e) => t(o, e),
      createURL: m,
      encodeLocation(e) {
        let t = m(e);
        return {
          pathname: t.pathname,
          search: t.search,
          hash: t.hash,
        };
      },
      push: function (e, t) {
        l = "PUSH";
        let r = p(v.location, e, t);
        (n && n(r, e), (u = d() + 1));
        let c = h(r, u),
          f = v.createHref(r);
        try {
          i.pushState(c, "", f);
        } catch (e) {
          if (e instanceof DOMException && "DataCloneError" === e.name) throw e;
          o.location.assign(f);
        }
        a &&
          s &&
          s({
            action: l,
            location: v.location,
            delta: 1,
          });
      },
      replace: function (e, t) {
        l = "REPLACE";
        let r = p(v.location, e, t);
        (n && n(r, e), (u = d()));
        let o = h(r, u),
          c = v.createHref(r);
        (i.replaceState(o, "", c),
          a &&
            s &&
            s({
              action: l,
              location: v.location,
              delta: 0,
            }));
      },
      go: (e) => i.go(e),
    };
    return v;
  }
  function y(e, t = !1) {
    let n = "http://localhost";
    ("undefined" != typeof window &&
      (n = "null" !== window.location.origin ? window.location.origin : window.location.href),
      f(n, "No window.location.(origin|href) available to create URL"));
    let r = "string" == typeof e ? e : v(e);
    return ((r = r.replace(/ $/, "%20")), !t && r.startsWith("//") && (r = n + r), new URL(r, n));
  }
  function w(e) {
    return {
      defaultValue: e,
    };
  }
  var x = class {
    constructor(e) {
      var t, n, o;
      if (
        ((t = this),
        (n = r),
        (o = new Map()),
        n.has(t)
          ? a("Cannot add the same private member more than once")
          : n instanceof WeakSet
            ? n.add(t)
            : n.set(t, o),
        e)
      )
        for (let [t, n] of e) this.set(t, n);
    }
    get(e) {
      if (i(this, r).has(e)) return i(this, r).get(e);
      if (void 0 !== e.defaultValue) return e.defaultValue;
      throw new Error("No value found for context");
    }
    set(e, t) {
      i(this, r).set(e, t);
    }
  };
  r = new WeakMap();
  var C = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]),
    E = new Set(["lazy", "caseSensitive", "path", "id", "index", "middleware", "children"]);
  function S(e, t, n = [], r = {}, o = !1) {
    return e.map((e, a) => {
      let i = [...n, String(a)],
        l = "string" == typeof e.id ? e.id : i.join("-");
      if (
        (f(!0 !== e.index || !e.children, "Cannot specify children on an index route"),
        f(
          o || !r[l],
          `Found a route id collision on id "${l}".  Route id's must be globally unique within Data Router usages`,
        ),
        (function (e) {
          return !0 === e.index;
        })(e))
      ) {
        let n = {
          ...e,
          ...t(e),
          id: l,
        };
        return ((r[l] = n), n);
      }
      {
        let n = {
          ...e,
          ...t(e),
          id: l,
          children: void 0,
        };
        return ((r[l] = n), e.children && (n.children = S(e.children, t, i, r, o)), n);
      }
    });
  }
  function A(e, t, n = "/") {
    return k(e, t, n, !1);
  }
  function k(e, t, n, r) {
    let o = _(("string" == typeof t ? g(t) : t).pathname || "/", n);
    if (null == o) return null;
    let a = z(e);
    !(function (e) {
      e.sort((e, t) =>
        e.score !== t.score
          ? t.score - e.score
          : (function (e, t) {
              return e.length === t.length && e.slice(0, -1).every((e, n) => e === t[n])
                ? e[e.length - 1] - t[t.length - 1]
                : 0;
            })(
              e.routesMeta.map((e) => e.childrenIndex),
              t.routesMeta.map((e) => e.childrenIndex),
            ),
      );
    })(a);
    let i = null;
    for (let e = 0; null == i && e < a.length; ++e) {
      let t = F(o);
      i = T(a[e], t, r);
    }
    return i;
  }
  function $(e, t) {
    let { route: n, pathname: r, params: o } = e;
    return {
      id: n.id,
      pathname: r,
      params: o,
      data: t[n.id],
      loaderData: t[n.id],
      handle: n.handle,
    };
  }
  function z(e, t = [], n = [], r = "", o = !1) {
    let a = (e, a, i = o, l) => {
      let c = {
        relativePath: void 0 === l ? e.path || "" : l,
        caseSensitive: !0 === e.caseSensitive,
        childrenIndex: a,
        route: e,
      };
      if (c.relativePath.startsWith("/")) {
        if (!c.relativePath.startsWith(r) && i) return;
        (f(
          c.relativePath.startsWith(r),
          `Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
        ),
          (c.relativePath = c.relativePath.slice(r.length)));
      }
      let s = G([r, c.relativePath]),
        u = n.concat(c);
      (e.children &&
        e.children.length > 0 &&
        (f(
          !0 !== e.index,
          `Index routes must not have child routes. Please remove all child routes from route path "${s}".`,
        ),
        z(e.children, t, u, s, i)),
        (null != e.path || e.index) &&
          t.push({
            path: s,
            score: j(s, e.index),
            routesMeta: u,
          }));
    };
    return (
      e.forEach((e, t) => {
        if ("" !== e.path && e.path?.includes("?")) for (let n of M(e.path)) a(e, t, !0, n);
        else a(e, t);
      }),
      t
    );
  }
  function M(e) {
    let t = e.split("/");
    if (0 === t.length) return [];
    let [n, ...r] = t,
      o = n.endsWith("?"),
      a = n.replace(/\?$/, "");
    if (0 === r.length) return o ? [a, ""] : [a];
    let i = M(r.join("/")),
      l = [];
    return (
      l.push(...i.map((e) => ("" === e ? a : [a, e].join("/")))),
      o && l.push(...i),
      l.map((t) => (e.startsWith("/") && "" === t ? "/" : t))
    );
  }
  var O = /^:[\w-]+$/,
    R = 3,
    H = 2,
    I = 1,
    N = 10,
    L = -2,
    P = (e) => "*" === e;
  function j(e, t) {
    let n = e.split("/"),
      r = n.length;
    return (
      n.some(P) && (r += L),
      t && (r += H),
      n.filter((e) => !P(e)).reduce((e, t) => e + (O.test(t) ? R : "" === t ? I : N), r)
    );
  }
  function T(e, t, n = !1) {
    let { routesMeta: r } = e,
      o = {},
      a = "/",
      i = [];
    for (let e = 0; e < r.length; ++e) {
      let l = r[e],
        c = e === r.length - 1,
        s = "/" === a ? t : t.slice(a.length) || "/",
        u = V(
          {
            path: l.relativePath,
            caseSensitive: l.caseSensitive,
            end: c,
          },
          s,
        ),
        d = l.route;
      if (
        (!u &&
          c &&
          n &&
          !r[r.length - 1].route.index &&
          (u = V(
            {
              path: l.relativePath,
              caseSensitive: l.caseSensitive,
              end: !1,
            },
            s,
          )),
        !u)
      )
        return null;
      (Object.assign(o, u.params),
        i.push({
          params: o,
          pathname: G([a, u.pathname]),
          pathnameBase: Y(G([a, u.pathnameBase])),
          route: d,
        }),
        "/" !== u.pathnameBase && (a = G([a, u.pathnameBase])));
    }
    return i;
  }
  function B(e, t = {}) {
    let n = e;
    n.endsWith("*") &&
      "*" !== n &&
      !n.endsWith("/*") &&
      (m(
        !1,
        `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`,
      ),
      (n = n.replace(/\*$/, "/*")));
    const r = n.startsWith("/") ? "/" : "",
      o = (e) => (null == e ? "" : "string" == typeof e ? e : String(e));
    return (
      r +
      n
        .split(/\/+/)
        .map((e, n, r) => {
          if (n === r.length - 1 && "*" === e) return o(t["*"]);
          const a = e.match(/^:([\w-]+)(\??)$/);
          if (a) {
            const [, e, n] = a;
            let r = t[e];
            return (f("?" === n || null != r, `Missing ":${e}" param`), encodeURIComponent(o(r)));
          }
          return e.replace(/\?$/g, "");
        })
        .filter((e) => !!e)
        .join("/")
    );
  }
  function V(e, t) {
    "string" == typeof e &&
      (e = {
        path: e,
        caseSensitive: !1,
        end: !0,
      });
    let [n, r] = D(e.path, e.caseSensitive, e.end),
      o = t.match(n);
    if (!o) return null;
    let a = o[0],
      i = a.replace(/(.)\/+$/, "$1"),
      l = o.slice(1);
    return {
      params: r.reduce((e, { paramName: t, isOptional: n }, r) => {
        if ("*" === t) {
          let e = l[r] || "";
          i = a.slice(0, a.length - e.length).replace(/(.)\/+$/, "$1");
        }
        const o = l[r];
        return ((e[t] = n && !o ? void 0 : (o || "").replace(/%2F/g, "/")), e);
      }, {}),
      pathname: a,
      pathnameBase: i,
      pattern: e,
    };
  }
  function D(e, t = !1, n = !0) {
    m(
      "*" === e || !e.endsWith("*") || e.endsWith("/*"),
      `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`,
    );
    let r = [],
      o =
        "^" +
        e
          .replace(/\/*\*?$/, "")
          .replace(/^\/*/, "/")
          .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
          .replace(
            /\/:([\w-]+)(\?)?/g,
            (e, t, n) => (
              r.push({
                paramName: t,
                isOptional: null != n,
              }),
              n ? "/?([^\\/]+)?" : "/([^\\/]+)"
            ),
          )
          .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
    return (
      e.endsWith("*")
        ? (r.push({
            paramName: "*",
          }),
          (o += "*" === e || "/*" === e ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
        : n
          ? (o += "\\/*$")
          : "" !== e && "/" !== e && (o += "(?:(?=\\/|$))"),
      [new RegExp(o, t ? void 0 : "i"), r]
    );
  }
  function F(e) {
    try {
      return e
        .split("/")
        .map((e) => decodeURIComponent(e).replace(/\//g, "%2F"))
        .join("/");
    } catch (t) {
      return (
        m(
          !1,
          `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`,
        ),
        e
      );
    }
  }
  function _(e, t) {
    if ("/" === t) return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length,
      r = e.charAt(n);
    return r && "/" !== r ? null : e.slice(n) || "/";
  }
  function W(e, t = "/") {
    let { pathname: n, search: r = "", hash: o = "" } = "string" == typeof e ? g(e) : e,
      a = n
        ? n.startsWith("/")
          ? n
          : (function (e, t) {
              let n = t.replace(/\/+$/, "").split("/");
              return (
                e.split("/").forEach((e) => {
                  ".." === e ? n.length > 1 && n.pop() : "." !== e && n.push(e);
                }),
                n.length > 1 ? n.join("/") : "/"
              );
            })(n, t)
        : t;
    return {
      pathname: a,
      search: Q(r),
      hash: Z(o),
    };
  }
  function q(e, t, n, r) {
    return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
  }
  function K(e) {
    return e.filter((e, t) => 0 === t || (e.route.path && e.route.path.length > 0));
  }
  function U(e) {
    let t = K(e);
    return t.map((e, n) => (n === t.length - 1 ? e.pathname : e.pathnameBase));
  }
  function X(e, t, n, r = !1) {
    let o;
    "string" == typeof e
      ? (o = g(e))
      : ((o = {
          ...e,
        }),
        f(!o.pathname || !o.pathname.includes("?"), q("?", "pathname", "search", o)),
        f(!o.pathname || !o.pathname.includes("#"), q("#", "pathname", "hash", o)),
        f(!o.search || !o.search.includes("#"), q("#", "search", "hash", o)));
    let a,
      i = "" === e || "" === o.pathname,
      l = i ? "/" : o.pathname;
    if (null == l) a = n;
    else {
      let e = t.length - 1;
      if (!r && l.startsWith("..")) {
        let t = l.split("/");
        for (; ".." === t[0];) (t.shift(), (e -= 1));
        o.pathname = t.join("/");
      }
      a = e >= 0 ? t[e] : "/";
    }
    let c = W(o, a),
      s = l && "/" !== l && l.endsWith("/"),
      u = (i || "." === l) && n.endsWith("/");
    return (c.pathname.endsWith("/") || (!s && !u) || (c.pathname += "/"), c);
  }
  var G = (e) => e.join("/").replace(/\/\/+/g, "/"),
    Y = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
    Q = (e) => (e && "?" !== e ? (e.startsWith("?") ? e : "?" + e) : ""),
    Z = (e) => (e && "#" !== e ? (e.startsWith("#") ? e : "#" + e) : ""),
    J = class {
      constructor(e, t) {
        ((this.type = "DataWithResponseInit"), (this.data = e), (this.init = t || null));
      }
    };
  function ee(e, t) {
    return new J(
      e,
      "number" == typeof t
        ? {
            status: t,
          }
        : t,
    );
  }
  var te = (e, t = 302) => {
      let n = t;
      "number" == typeof n
        ? (n = {
            status: n,
          })
        : void 0 === n.status && (n.status = 302);
      let r = new Headers(n.headers);
      return (
        r.set("Location", e),
        new Response(null, {
          ...n,
          headers: r,
        })
      );
    },
    ne = (e, t) => {
      let n = te(e, t);
      return (n.headers.set("X-Remix-Reload-Document", "true"), n);
    },
    re = (e, t) => {
      let n = te(e, t);
      return (n.headers.set("X-Remix-Replace", "true"), n);
    },
    oe = class {
      constructor(e, t, n, r = !1) {
        ((this.status = e),
          (this.statusText = t || ""),
          (this.internal = r),
          n instanceof Error ? ((this.data = n.toString()), (this.error = n)) : (this.data = n));
      }
    };
  function ae(e) {
    return (
      null != e &&
      "number" == typeof e.status &&
      "string" == typeof e.statusText &&
      "boolean" == typeof e.internal &&
      "data" in e
    );
  }
  var ie = ["POST", "PUT", "PATCH", "DELETE"],
    le = new Set(ie),
    ce = ["GET", ...ie],
    se = new Set(ce),
    ue = new Set([301, 302, 303, 307, 308]),
    de = new Set([307, 308]),
    fe = {
      state: "idle",
      location: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
    },
    me = {
      state: "idle",
      data: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
    },
    he = {
      state: "unblocked",
      proceed: void 0,
      reset: void 0,
      location: void 0,
    },
    pe = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    ve = (e) => pe.test(e),
    ge = (e) => ({
      hasErrorBoundary: Boolean(e.hasErrorBoundary),
    }),
    be = "remix-router-transitions",
    ye = Symbol("ResetLoaderData");
  function we(e) {
    const t = e.window ? e.window : "undefined" != typeof window ? window : void 0,
      n = void 0 !== t && void 0 !== t.document && void 0 !== t.document.createElement;
    f(e.routes.length > 0, "You must provide a non-empty routes array to createRouter");
    let r,
      o = e.hydrationRouteProperties || [],
      a = e.mapRouteProperties || ge,
      i = {},
      l = S(e.routes, a, void 0, i),
      c = e.basename || "/";
    c.startsWith("/") || (c = `/${c}`);
    let s,
      u,
      d = e.dataStrategy || Te,
      h = {
        ...e.future,
      },
      v = null,
      g = new Set(),
      b = null,
      w = null,
      C = null,
      E = null != e.hydrationData,
      z = A(l, e.history.location, c),
      M = !1,
      O = null;
    if (null != z || e.patchRoutesOnNavigation) {
      if (
        (z && !e.hydrationData && Le(z, l, e.history.location.pathname).active && (z = null), z)
      ) {
        if (z.some((e) => e.route.lazy)) s = !1;
        else if (z.some((e) => $e(e.route))) {
          let t = e.hydrationData ? e.hydrationData.loaderData : null,
            n = e.hydrationData ? e.hydrationData.errors : null;
          if (n) {
            let e = z.findIndex((e) => void 0 !== n[e.route.id]);
            s = z.slice(0, e + 1).every((e) => !ze(e.route, t, n));
          } else s = z.every((e) => !ze(e.route, t, n));
        } else s = !0;
      } else {
        ((s = !1), (z = []));
        let t = Le(null, l, e.history.location.pathname);
        t.active && t.matches && ((M = !0), (z = t.matches));
      }
    } else {
      let t = it(404, {
          pathname: e.history.location.pathname,
        }),
        { matches: n, route: r } = at(l);
      ((s = !0),
        (z = n),
        (O = {
          [r.id]: t,
        }));
    }
    let R,
      H,
      I = {
        historyAction: e.history.action,
        location: e.history.location,
        matches: z,
        initialized: s,
        navigation: fe,
        restoreScrollPosition: null == e.hydrationData && null,
        preventScrollReset: !1,
        revalidation: "idle",
        loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
        actionData: (e.hydrationData && e.hydrationData.actionData) || null,
        errors: (e.hydrationData && e.hydrationData.errors) || O,
        fetchers: new Map(),
        blockers: new Map(),
      },
      N = "POP",
      L = !1,
      P = !1,
      j = new Map(),
      T = null,
      B = !1,
      V = !1,
      D = new Set(),
      F = new Map(),
      W = 0,
      q = -1,
      K = new Map(),
      U = new Set(),
      X = new Map(),
      G = new Map(),
      Y = new Set(),
      Q = new Map(),
      Z = null;
    function J(e, t = {}) {
      (e.matches &&
        (e.matches = e.matches.map((e) => {
          let t = i[e.route.id],
            n = e.route;
          return n.element !== t.element ||
            n.errorElement !== t.errorElement ||
            n.hydrateFallbackElement !== t.hydrateFallbackElement
            ? {
                ...e,
                route: t,
              }
            : e;
        })),
        (I = {
          ...I,
          ...e,
        }));
      let n = [],
        r = [];
      (I.fetchers.forEach((e, t) => {
        "idle" === e.state && (Y.has(t) ? n.push(t) : r.push(t));
      }),
        Y.forEach((e) => {
          I.fetchers.has(e) || F.has(e) || n.push(e);
        }),
        [...g].forEach((e) =>
          e(I, {
            deletedFetchers: n,
            viewTransitionOpts: t.viewTransitionOpts,
            flushSync: !0 === t.flushSync,
          }),
        ),
        n.forEach((e) => pe(e)),
        r.forEach((e) => I.fetchers.delete(e)));
    }
    function ee(t, n, { flushSync: o } = {}) {
      let a,
        i =
          null != I.actionData &&
          null != I.navigation.formMethod &&
          wt(I.navigation.formMethod) &&
          "loading" === I.navigation.state &&
          !0 !== t.state?._isRedirect;
      a = n.actionData
        ? Object.keys(n.actionData).length > 0
          ? n.actionData
          : null
        : i
          ? I.actionData
          : null;
      let c = n.loaderData
          ? nt(I.loaderData, n.loaderData, n.matches || [], n.errors)
          : I.loaderData,
        s = I.blockers;
      s.size > 0 && ((s = new Map(s)), s.forEach((e, t) => s.set(t, he)));
      let u,
        d = !B && Ne(t, n.matches || I.matches),
        f =
          !0 === L ||
          (null != I.navigation.formMethod &&
            wt(I.navigation.formMethod) &&
            !0 !== t.state?._isRedirect);
      if (
        (r && ((l = r), (r = void 0)),
        B ||
          "POP" === N ||
          ("PUSH" === N
            ? e.history.push(t, t.state)
            : "REPLACE" === N && e.history.replace(t, t.state)),
        "POP" === N)
      ) {
        let e = j.get(I.location.pathname);
        e && e.has(t.pathname)
          ? (u = {
              currentLocation: I.location,
              nextLocation: t,
            })
          : j.has(t.pathname) &&
            (u = {
              currentLocation: t,
              nextLocation: I.location,
            });
      } else if (P) {
        let e = j.get(I.location.pathname);
        (e ? e.add(t.pathname) : ((e = new Set([t.pathname])), j.set(I.location.pathname, e)),
          (u = {
            currentLocation: I.location,
            nextLocation: t,
          }));
      }
      (J(
        {
          ...n,
          actionData: a,
          loaderData: c,
          historyAction: N,
          location: t,
          initialized: !0,
          navigation: fe,
          revalidation: "idle",
          restoreScrollPosition: d,
          preventScrollReset: f,
          blockers: s,
        },
        {
          viewTransitionOpts: u,
          flushSync: !0 === o,
        },
      ),
        (N = "POP"),
        (L = !1),
        (P = !1),
        (B = !1),
        (V = !1),
        Z?.resolve(),
        (Z = null));
    }
    async function te(t, n, s) {
      (R && R.abort(),
        (R = null),
        (N = t),
        (B = !0 === (s && s.startUninterruptedRevalidation)),
        (function (e, t) {
          if (b && C) {
            let n = Ie(e, t);
            b[n] = C();
          }
        })(I.location, I.matches),
        (L = !0 === (s && s.preventScrollReset)),
        (P = !0 === (s && s.enableViewTransition)));
      let u = r || l,
        d = s && s.overrideNavigation,
        f = s?.initialHydration && I.matches && I.matches.length > 0 && !M ? I.matches : A(u, n, c),
        m = !0 === (s && s.flushSync);
      if (
        f &&
        I.initialized &&
        !V &&
        ((h = I.location),
        (p = n),
        h.pathname === p.pathname &&
          h.search === p.search &&
          ("" === h.hash ? "" !== p.hash : h.hash === p.hash || "" !== p.hash)) &&
        !(s && s.submission && wt(s.submission.formMethod))
      )
        return void ee(
          n,
          {
            matches: f,
          },
          {
            flushSync: m,
          },
        );
      var h, p;
      let v = Le(f, u, n.pathname);
      if ((v.active && v.matches && (f = v.matches), !f)) {
        let { error: e, notFoundMatches: t, route: r } = He(n.pathname);
        return void ee(
          n,
          {
            matches: t,
            loaderData: {},
            errors: {
              [r.id]: e,
            },
          },
          {
            flushSync: m,
          },
        );
      }
      R = new AbortController();
      let g,
        y = Qe(e.history, n, R.signal, s && s.submission),
        w = e.getContext ? await e.getContext() : new x();
      if (s && s.pendingError)
        g = [
          ot(f).route.id,
          {
            type: "error",
            error: s.pendingError,
          },
        ];
      else if (s && s.submission && wt(s.submission.formMethod)) {
        let t = await (async function (e, t, n, r, s, u, d, f = {}) {
          le();
          let m,
            h = (function (e, t) {
              return {
                state: "submitting",
                location: e,
                formMethod: t.formMethod,
                formAction: t.formAction,
                formEncType: t.formEncType,
                formData: t.formData,
                json: t.json,
                text: t.text,
              };
            })(t, n);
          if (
            (J(
              {
                navigation: h,
              },
              {
                flushSync: !0 === f.flushSync,
              },
            ),
            u)
          ) {
            let n = await Pe(r, t.pathname, e.signal);
            if ("aborted" === n.type)
              return {
                shortCircuited: !0,
              };
            if ("error" === n.type) {
              if (0 === n.partialMatches.length) {
                let { matches: e, route: t } = at(l);
                return {
                  matches: e,
                  pendingActionResult: [
                    t.id,
                    {
                      type: "error",
                      error: n.error,
                    },
                  ],
                };
              }
              let e = ot(n.partialMatches).route.id;
              return {
                matches: n.partialMatches,
                pendingActionResult: [
                  e,
                  {
                    type: "error",
                    error: n.error,
                  },
                ],
              };
            }
            if (!n.matches) {
              let { notFoundMatches: e, error: n, route: r } = He(t.pathname);
              return {
                matches: e,
                pendingActionResult: [
                  r.id,
                  {
                    type: "error",
                    error: n,
                  },
                ],
              };
            }
            r = n.matches;
          }
          let p = Ct(r, t);
          if (p.route.action || p.route.lazy) {
            let t = qe(a, i, e, r, p, d ? [] : o, s),
              n = await oe(e, t, s, null);
            if (((m = n[p.route.id]), !m))
              for (let e of r)
                if (n[e.route.id]) {
                  m = n[e.route.id];
                  break;
                }
            if (e.signal.aborted)
              return {
                shortCircuited: !0,
              };
          } else
            m = {
              type: "error",
              error: it(405, {
                method: e.method,
                pathname: t.pathname,
                routeId: p.route.id,
              }),
            };
          if (ht(m)) {
            let t;
            return (
              (t =
                f && null != f.replace
                  ? f.replace
                  : Ye(m.response.headers.get("Location"), new URL(e.url), c) ===
                    I.location.pathname + I.location.search),
              await re(e, m, !0, {
                submission: n,
                replace: t,
              }),
              {
                shortCircuited: !0,
              }
            );
          }
          if (mt(m)) {
            let e = ot(r, p.route.id);
            return (
              !0 !== (f && f.replace) && (N = "PUSH"),
              {
                matches: r,
                pendingActionResult: [e.route.id, m, p.route.id],
              }
            );
          }
          return {
            matches: r,
            pendingActionResult: [p.route.id, m],
          };
        })(y, n, s.submission, f, w, v.active, s && !0 === s.initialHydration, {
          replace: s.replace,
          flushSync: m,
        });
        if (t.shortCircuited) return;
        if (t.pendingActionResult) {
          let [e, r] = t.pendingActionResult;
          if (mt(r) && ae(r.error) && 404 === r.error.status)
            return (
              (R = null),
              void ee(n, {
                matches: t.matches,
                loaderData: {},
                errors: {
                  [e]: r.error,
                },
              })
            );
        }
        ((f = t.matches || f),
          (g = t.pendingActionResult),
          (d = St(n, s.submission)),
          (m = !1),
          (v.active = !1),
          (y = Qe(e.history, y.url, y.signal)));
      }
      let {
        shortCircuited: E,
        matches: S,
        loaderData: k,
        errors: $,
      } = await (async function (t, n, s, u, d, f, m, h, p, v, g, b) {
        let y = f || St(n, m),
          w = m || h || Et(y),
          x = !B && !v;
        if (d) {
          if (x) {
            let e = ne(b);
            J(
              {
                navigation: y,
                ...(void 0 !== e
                  ? {
                      actionData: e,
                    }
                  : {}),
              },
              {
                flushSync: g,
              },
            );
          }
          let e = await Pe(s, n.pathname, t.signal);
          if ("aborted" === e.type)
            return {
              shortCircuited: !0,
            };
          if ("error" === e.type) {
            if (0 === e.partialMatches.length) {
              let { matches: t, route: n } = at(l);
              return {
                matches: t,
                loaderData: {},
                errors: {
                  [n.id]: e.error,
                },
              };
            }
            let t = ot(e.partialMatches).route.id;
            return {
              matches: e.partialMatches,
              loaderData: {},
              errors: {
                [t]: e.error,
              },
            };
          }
          if (!e.matches) {
            let { error: e, notFoundMatches: t, route: r } = He(n.pathname);
            return {
              matches: t,
              loaderData: {},
              errors: {
                [r.id]: e,
              },
            };
          }
          s = e.matches;
        }
        let C = r || l,
          { dsMatches: E, revalidatingFetchers: S } = ke(
            t,
            u,
            a,
            i,
            e.history,
            I,
            s,
            w,
            n,
            v ? [] : o,
            !0 === v,
            V,
            D,
            Y,
            X,
            U,
            C,
            c,
            null != e.patchRoutesOnNavigation,
            b,
          );
        if (
          ((q = ++W),
          !e.dataStrategy &&
            !E.some((e) => e.shouldLoad) &&
            !E.some((e) => e.route.middleware && e.route.middleware.length > 0) &&
            0 === S.length)
        ) {
          let e = xe();
          return (
            ee(
              n,
              {
                matches: s,
                loaderData: {},
                errors:
                  b && mt(b[1])
                    ? {
                        [b[0]]: b[1].error,
                      }
                    : null,
                ...rt(b),
                ...(e
                  ? {
                      fetchers: new Map(I.fetchers),
                    }
                  : {}),
              },
              {
                flushSync: g,
              },
            ),
            {
              shortCircuited: !0,
            }
          );
        }
        if (x) {
          let e = {};
          if (!d) {
            e.navigation = y;
            let t = ne(b);
            void 0 !== t && (e.actionData = t);
          }
          (S.length > 0 &&
            (e.fetchers = (function (e) {
              return (
                e.forEach((e) => {
                  let t = I.fetchers.get(e.key),
                    n = At(void 0, t ? t.data : void 0);
                  I.fetchers.set(e.key, n);
                }),
                new Map(I.fetchers)
              );
            })(S)),
            J(e, {
              flushSync: g,
            }));
        }
        S.forEach((e) => {
          (ye(e.key), e.controller && F.set(e.key, e.controller));
        });
        let A = () => S.forEach((e) => ye(e.key));
        R && R.signal.addEventListener("abort", A);
        let { loaderResults: k, fetcherResults: $ } = await ie(E, S, t, u);
        if (t.signal.aborted)
          return {
            shortCircuited: !0,
          };
        (R && R.signal.removeEventListener("abort", A), S.forEach((e) => F.delete(e.key)));
        let z = lt(k);
        if (z)
          return (
            await re(t, z.result, !0, {
              replace: p,
            }),
            {
              shortCircuited: !0,
            }
          );
        if (((z = lt($)), z))
          return (
            U.add(z.key),
            await re(t, z.result, !0, {
              replace: p,
            }),
            {
              shortCircuited: !0,
            }
          );
        let { loaderData: M, errors: O } = tt(I, s, k, b, S, $);
        v &&
          I.errors &&
          (O = {
            ...I.errors,
            ...O,
          });
        let H = xe(),
          N = Ce(q);
        return {
          matches: s,
          loaderData: M,
          errors: O,
          ...(H || N || S.length > 0
            ? {
                fetchers: new Map(I.fetchers),
              }
            : {}),
        };
      })(
        y,
        n,
        f,
        w,
        v.active,
        d,
        s && s.submission,
        s && s.fetcherSubmission,
        s && s.replace,
        s && !0 === s.initialHydration,
        m,
        g,
      );
      E ||
        ((R = null),
        ee(n, {
          matches: S || f,
          ...rt(g),
          loaderData: k,
          errors: $,
        }));
    }
    function ne(e) {
      return e && !mt(e[1])
        ? {
            [e[0]]: e[1].data,
          }
        : I.actionData
          ? 0 === Object.keys(I.actionData).length
            ? null
            : I.actionData
          : void 0;
    }
    async function re(
      e,
      r,
      o,
      { submission: a, fetcherSubmission: i, preventScrollReset: l, replace: s } = {},
    ) {
      r.response.headers.has("X-Remix-Revalidate") && (V = !0);
      let u = r.response.headers.get("Location");
      (f(u, "Expected a Location header on the redirect Response"), (u = Ye(u, new URL(e.url), c)));
      let d = p(I.location, u, {
        _isRedirect: !0,
      });
      if (n) {
        let e = !1;
        if (r.response.headers.has("X-Remix-Reload-Document")) e = !0;
        else if (ve(u)) {
          const n = y(u, !0);
          e = n.origin !== t.location.origin || null == _(n.pathname, c);
        }
        if (e) return void (s ? t.location.replace(u) : t.location.assign(u));
      }
      R = null;
      let m = !0 === s || r.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH",
        { formMethod: h, formAction: v, formEncType: g } = I.navigation;
      !a && !i && h && v && g && (a = Et(I.navigation));
      let b = a || i;
      if (de.has(r.response.status) && b && wt(b.formMethod))
        await te(m, d, {
          submission: {
            ...b,
            formAction: u,
          },
          preventScrollReset: l || L,
          enableViewTransition: o ? P : void 0,
        });
      else {
        let e = St(d, a);
        await te(m, d, {
          overrideNavigation: e,
          fetcherSubmission: i,
          preventScrollReset: l || L,
          enableViewTransition: o ? P : void 0,
        });
      }
    }
    async function oe(e, t, n, r) {
      let o,
        a = {};
      try {
        o = await Ke(d, e, t, r, n, !1);
      } catch (e) {
        return (
          t
            .filter((e) => e.shouldLoad)
            .forEach((t) => {
              a[t.route.id] = {
                type: "error",
                error: e,
              };
            }),
          a
        );
      }
      if (e.signal.aborted) return a;
      for (let [n, r] of Object.entries(o))
        if (ft(r)) {
          let o = r.result;
          a[n] = {
            type: "redirect",
            response: Ge(o, e, n, t, c),
          };
        } else a[n] = await Xe(r);
      return a;
    }
    async function ie(e, t, n, r) {
      let o = oe(n, e, r, null),
        a = Promise.all(
          t.map(async (e) => {
            if (e.matches && e.match && e.request && e.controller) {
              let t = (await oe(e.request, e.matches, r, e.key))[e.match.route.id];
              return {
                [e.key]: t,
              };
            }
            return Promise.resolve({
              [e.key]: {
                type: "error",
                error: it(404, {
                  pathname: e.path,
                }),
              },
            });
          }),
        );
      return {
        loaderResults: await o,
        fetcherResults: (await a).reduce((e, t) => Object.assign(e, t), {}),
      };
    }
    function le() {
      ((V = !0),
        X.forEach((e, t) => {
          (F.has(t) && D.add(t), ye(t));
        }));
    }
    function ce(e, t, n = {}) {
      (I.fetchers.set(e, t),
        J(
          {
            fetchers: new Map(I.fetchers),
          },
          {
            flushSync: !0 === (n && n.flushSync),
          },
        ));
    }
    function se(e, t, n, r = {}) {
      let o = ot(I.matches, t);
      (pe(e),
        J(
          {
            errors: {
              [o.route.id]: n,
            },
            fetchers: new Map(I.fetchers),
          },
          {
            flushSync: !0 === (r && r.flushSync),
          },
        ));
    }
    function ue(e) {
      return (G.set(e, (G.get(e) || 0) + 1), Y.has(e) && Y.delete(e), I.fetchers.get(e) || me);
    }
    function pe(e) {
      let t = I.fetchers.get(e);
      (!F.has(e) || (t && "loading" === t.state && K.has(e)) || ye(e),
        X.delete(e),
        K.delete(e),
        U.delete(e),
        Y.delete(e),
        D.delete(e),
        I.fetchers.delete(e));
    }
    function ye(e, t) {
      let n = F.get(e);
      n && (n.abort(t), F.delete(e));
    }
    function we(e) {
      for (let t of e) {
        let e = kt(ue(t).data);
        I.fetchers.set(t, e);
      }
    }
    function xe() {
      let e = [],
        t = !1;
      for (let n of U) {
        let r = I.fetchers.get(n);
        (f(r, `Expected fetcher: ${n}`),
          "loading" === r.state && (U.delete(n), e.push(n), (t = !0)));
      }
      return (we(e), t);
    }
    function Ce(e) {
      let t = [];
      for (let [n, r] of K)
        if (r < e) {
          let e = I.fetchers.get(n);
          (f(e, `Expected fetcher: ${n}`),
            "loading" === e.state && (ye(n), K.delete(n), t.push(n)));
        }
      return (we(t), t.length > 0);
    }
    function Ee(e) {
      (I.blockers.delete(e), Q.delete(e));
    }
    function Me(e, t) {
      let n = I.blockers.get(e) || he;
      f(
        ("unblocked" === n.state && "blocked" === t.state) ||
          ("blocked" === n.state && "blocked" === t.state) ||
          ("blocked" === n.state && "proceeding" === t.state) ||
          ("blocked" === n.state && "unblocked" === t.state) ||
          ("proceeding" === n.state && "unblocked" === t.state),
        `Invalid blocker state transition: ${n.state} -> ${t.state}`,
      );
      let r = new Map(I.blockers);
      (r.set(e, t),
        J({
          blockers: r,
        }));
    }
    function Re({ currentLocation: e, nextLocation: t, historyAction: n }) {
      if (0 === Q.size) return;
      Q.size > 1 && m(!1, "A router only supports one blocker at a time");
      let r = Array.from(Q.entries()),
        [o, a] = r[r.length - 1],
        i = I.blockers.get(o);
      return i && "proceeding" === i.state
        ? void 0
        : a({
              currentLocation: e,
              nextLocation: t,
              historyAction: n,
            })
          ? o
          : void 0;
    }
    function He(e) {
      let t = it(404, {
          pathname: e,
        }),
        n = r || l,
        { matches: o, route: a } = at(n);
      return {
        notFoundMatches: o,
        route: a,
        error: t,
      };
    }
    function Ie(e, t) {
      return (
        (w &&
          w(
            e,
            t.map((e) => $(e, I.loaderData)),
          )) ||
        e.key
      );
    }
    function Ne(e, t) {
      if (b) {
        let n = Ie(e, t),
          r = b[n];
        if ("number" == typeof r) return r;
      }
      return null;
    }
    function Le(t, n, r) {
      if (e.patchRoutesOnNavigation) {
        if (!t)
          return {
            active: !0,
            matches: k(n, r, c, !0) || [],
          };
        if (Object.keys(t[0].params).length > 0)
          return {
            active: !0,
            matches: k(n, r, c, !0),
          };
      }
      return {
        active: !1,
        matches: null,
      };
    }
    async function Pe(t, n, o, s) {
      if (!e.patchRoutesOnNavigation)
        return {
          type: "success",
          matches: t,
        };
      let u = t;
      for (;;) {
        let t = null == r,
          d = r || l,
          f = i;
        try {
          await e.patchRoutesOnNavigation({
            signal: o,
            path: n,
            matches: u,
            fetcherKey: s,
            patch: (e, t) => {
              o.aborted || Oe(e, t, d, f, a, !1);
            },
          });
        } catch (e) {
          return {
            type: "error",
            error: e,
            partialMatches: u,
          };
        } finally {
          t && !o.aborted && (l = [...l]);
        }
        if (o.aborted)
          return {
            type: "aborted",
          };
        let m = A(d, n, c);
        if (m)
          return {
            type: "success",
            matches: m,
          };
        let h = k(d, n, c, !0);
        if (!h || (u.length === h.length && u.every((e, t) => e.route.id === h[t].route.id)))
          return {
            type: "success",
            matches: null,
          };
        u = h;
      }
    }
    return (
      (u = {
        get basename() {
          return c;
        },
        get future() {
          return h;
        },
        get state() {
          return I;
        },
        get routes() {
          return l;
        },
        get window() {
          return t;
        },
        initialize: function () {
          if (
            ((v = e.history.listen(({ action: t, location: n, delta: r }) => {
              if (H) return (H(), void (H = void 0));
              m(
                0 === Q.size || null != r,
                "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.",
              );
              let o = Re({
                currentLocation: I.location,
                nextLocation: n,
                historyAction: t,
              });
              if (o && null != r) {
                let t = new Promise((e) => {
                  H = e;
                });
                return (
                  e.history.go(-1 * r),
                  void Me(o, {
                    state: "blocked",
                    location: n,
                    proceed() {
                      (Me(o, {
                        state: "proceeding",
                        proceed: void 0,
                        reset: void 0,
                        location: n,
                      }),
                        t.then(() => e.history.go(r)));
                    },
                    reset() {
                      let e = new Map(I.blockers);
                      (e.set(o, he),
                        J({
                          blockers: e,
                        }));
                    },
                  })
                );
              }
              return te(t, n);
            })),
            n)
          ) {
            !(function (e, t) {
              try {
                let n = e.sessionStorage.getItem(be);
                if (n) {
                  let e = JSON.parse(n);
                  for (let [n, r] of Object.entries(e || {}))
                    r && Array.isArray(r) && t.set(n, new Set(r || []));
                }
              } catch (e) {}
            })(t, j);
            let e = () =>
              (function (e, t) {
                if (t.size > 0) {
                  let n = {};
                  for (let [e, r] of t) n[e] = [...r];
                  try {
                    e.sessionStorage.setItem(be, JSON.stringify(n));
                  } catch (e) {
                    m(!1, `Failed to save applied view transitions in sessionStorage (${e}).`);
                  }
                }
              })(t, j);
            (t.addEventListener("pagehide", e), (T = () => t.removeEventListener("pagehide", e)));
          }
          return (
            I.initialized ||
              te("POP", I.location, {
                initialHydration: !0,
              }),
            u
          );
        },
        subscribe: function (e) {
          return (g.add(e), () => g.delete(e));
        },
        enableScrollRestoration: function (e, t, n) {
          if (((b = e), (C = t), (w = n || null), !E && I.navigation === fe)) {
            E = !0;
            let e = Ne(I.location, I.matches);
            null != e &&
              J({
                restoreScrollPosition: e,
              });
          }
          return () => {
            ((b = null), (C = null), (w = null));
          };
        },
        navigate: async function t(n, r) {
          if ("number" == typeof n) return void e.history.go(n);
          let o = Se(I.location, I.matches, c, n, r?.fromRouteId, r?.relative),
            { path: a, submission: i, error: l } = Ae(!1, o, r),
            s = I.location,
            u = p(I.location, a, r && r.state);
          u = {
            ...u,
            ...e.history.encodeLocation(u),
          };
          let d = r && null != r.replace ? r.replace : void 0,
            f = "PUSH";
          !0 === d
            ? (f = "REPLACE")
            : !1 === d ||
              (null != i &&
                wt(i.formMethod) &&
                i.formAction === I.location.pathname + I.location.search &&
                (f = "REPLACE"));
          let m = r && "preventScrollReset" in r ? !0 === r.preventScrollReset : void 0,
            h = !0 === (r && r.flushSync),
            v = Re({
              currentLocation: s,
              nextLocation: u,
              historyAction: f,
            });
          v
            ? Me(v, {
                state: "blocked",
                location: u,
                proceed() {
                  (Me(v, {
                    state: "proceeding",
                    proceed: void 0,
                    reset: void 0,
                    location: u,
                  }),
                    t(n, r));
                },
                reset() {
                  let e = new Map(I.blockers);
                  (e.set(v, he),
                    J({
                      blockers: e,
                    }));
                },
              })
            : await te(f, u, {
                submission: i,
                pendingError: l,
                preventScrollReset: m,
                replace: r && r.replace,
                enableViewTransition: r && r.viewTransition,
                flushSync: h,
              });
        },
        fetch: async function (t, n, s, u) {
          ye(t);
          let d = !0 === (u && u.flushSync),
            m = r || l,
            h = Se(I.location, I.matches, c, s, n, u?.relative),
            p = A(m, h, c),
            v = Le(p, m, h);
          if ((v.active && v.matches && (p = v.matches), !p))
            return void se(
              t,
              n,
              it(404, {
                pathname: h,
              }),
              {
                flushSync: d,
              },
            );
          let { path: g, submission: b, error: y } = Ae(!0, h, u);
          if (y)
            return void se(t, n, y, {
              flushSync: d,
            });
          let w = e.getContext ? await e.getContext() : new x(),
            C = !0 === (u && u.preventScrollReset);
          b && wt(b.formMethod)
            ? await (async function (t, n, s, u, d, m, h, p, v) {
                (le(), X.delete(t));
                let g = I.fetchers.get(t);
                ce(
                  t,
                  (function (e, t) {
                    return {
                      state: "submitting",
                      formMethod: e.formMethod,
                      formAction: e.formAction,
                      formEncType: e.formEncType,
                      formData: e.formData,
                      json: e.json,
                      text: e.text,
                      data: t ? t.data : void 0,
                    };
                  })(v, g),
                  {
                    flushSync: h,
                  },
                );
                let b = new AbortController(),
                  y = Qe(e.history, s, b.signal, v);
                if (m) {
                  let e = await Pe(u, new URL(y.url).pathname, y.signal, t);
                  if ("aborted" === e.type) return;
                  if ("error" === e.type)
                    return void se(t, n, e.error, {
                      flushSync: h,
                    });
                  if (!e.matches)
                    return void se(
                      t,
                      n,
                      it(404, {
                        pathname: s,
                      }),
                      {
                        flushSync: h,
                      },
                    );
                  u = e.matches;
                }
                let w = Ct(u, s);
                if (!w.route.action && !w.route.lazy) {
                  let e = it(405, {
                    method: v.formMethod,
                    pathname: s,
                    routeId: n,
                  });
                  return void se(t, n, e, {
                    flushSync: h,
                  });
                }
                F.set(t, b);
                let x = W,
                  C = qe(a, i, y, u, w, o, d),
                  E = (await oe(y, C, d, t))[w.route.id];
                if (y.signal.aborted) return void (F.get(t) === b && F.delete(t));
                if (Y.has(t)) {
                  if (ht(E) || mt(E)) return void ce(t, kt(void 0));
                } else {
                  if (ht(E))
                    return (
                      F.delete(t),
                      q > x
                        ? void ce(t, kt(void 0))
                        : (U.add(t),
                          ce(t, At(v)),
                          re(y, E, !1, {
                            fetcherSubmission: v,
                            preventScrollReset: p,
                          }))
                    );
                  if (mt(E)) return void se(t, n, E.error);
                }
                let S = I.navigation.location || I.location,
                  k = Qe(e.history, S, b.signal),
                  $ = r || l,
                  z = "idle" !== I.navigation.state ? A($, I.navigation.location, c) : I.matches;
                f(z, "Didn't find any matches after fetcher action");
                let M = ++W;
                K.set(t, M);
                let O = At(v, E.data);
                I.fetchers.set(t, O);
                let { dsMatches: H, revalidatingFetchers: L } = ke(
                  k,
                  d,
                  a,
                  i,
                  e.history,
                  I,
                  z,
                  v,
                  S,
                  o,
                  !1,
                  V,
                  D,
                  Y,
                  X,
                  U,
                  $,
                  c,
                  null != e.patchRoutesOnNavigation,
                  [w.route.id, E],
                );
                (L.filter((e) => e.key !== t).forEach((e) => {
                  let t = e.key,
                    n = I.fetchers.get(t),
                    r = At(void 0, n ? n.data : void 0);
                  (I.fetchers.set(t, r), ye(t), e.controller && F.set(t, e.controller));
                }),
                  J({
                    fetchers: new Map(I.fetchers),
                  }));
                let P = () => L.forEach((e) => ye(e.key));
                b.signal.addEventListener("abort", P);
                let { loaderResults: j, fetcherResults: T } = await ie(H, L, k, d);
                if (b.signal.aborted) return;
                if (
                  (b.signal.removeEventListener("abort", P),
                  K.delete(t),
                  F.delete(t),
                  L.forEach((e) => F.delete(e.key)),
                  I.fetchers.has(t))
                ) {
                  let e = kt(E.data);
                  I.fetchers.set(t, e);
                }
                let B = lt(j);
                if (B)
                  return re(k, B.result, !1, {
                    preventScrollReset: p,
                  });
                if (((B = lt(T)), B))
                  return (
                    U.add(B.key),
                    re(k, B.result, !1, {
                      preventScrollReset: p,
                    })
                  );
                let { loaderData: _, errors: G } = tt(I, z, j, void 0, L, T);
                (Ce(M),
                  "loading" === I.navigation.state && M > q
                    ? (f(N, "Expected pending action"),
                      R && R.abort(),
                      ee(I.navigation.location, {
                        matches: z,
                        loaderData: _,
                        errors: G,
                        fetchers: new Map(I.fetchers),
                      }))
                    : (J({
                        errors: G,
                        loaderData: nt(I.loaderData, _, z, G),
                        fetchers: new Map(I.fetchers),
                      }),
                      (V = !1)));
              })(t, n, g, p, w, v.active, d, C, b)
            : (X.set(t, {
                routeId: n,
                path: g,
              }),
              await (async function (t, n, r, l, c, s, u, d, f) {
                let m = I.fetchers.get(t);
                ce(t, At(f, m ? m.data : void 0), {
                  flushSync: u,
                });
                let h = new AbortController(),
                  p = Qe(e.history, r, h.signal);
                if (s) {
                  let e = await Pe(l, new URL(p.url).pathname, p.signal, t);
                  if ("aborted" === e.type) return;
                  if ("error" === e.type)
                    return void se(t, n, e.error, {
                      flushSync: u,
                    });
                  if (!e.matches)
                    return void se(
                      t,
                      n,
                      it(404, {
                        pathname: r,
                      }),
                      {
                        flushSync: u,
                      },
                    );
                  l = e.matches;
                }
                let v = Ct(l, r);
                F.set(t, h);
                let g = W,
                  b = qe(a, i, p, l, v, o, c),
                  y = (await oe(p, b, c, t))[v.route.id];
                if ((F.get(t) === h && F.delete(t), !p.signal.aborted)) {
                  if (!Y.has(t))
                    return ht(y)
                      ? q > g
                        ? void ce(t, kt(void 0))
                        : (U.add(t),
                          void (await re(p, y, !1, {
                            preventScrollReset: d,
                          })))
                      : void (mt(y) ? se(t, n, y.error) : ce(t, kt(y.data)));
                  ce(t, kt(void 0));
                }
              })(t, n, g, p, w, v.active, d, C, b));
        },
        revalidate: function () {
          (Z ||
            (Z = (function () {
              let e,
                t,
                n = new Promise((r, o) => {
                  ((e = async (e) => {
                    r(e);
                    try {
                      await n;
                    } catch (e) {}
                  }),
                    (t = async (e) => {
                      o(e);
                      try {
                        await n;
                      } catch (e) {}
                    }));
                });
              return {
                promise: n,
                resolve: e,
                reject: t,
              };
            })()),
            le(),
            J({
              revalidation: "loading",
            }));
          let e = Z.promise;
          return "submitting" === I.navigation.state
            ? e
            : "idle" === I.navigation.state
              ? (te(I.historyAction, I.location, {
                  startUninterruptedRevalidation: !0,
                }),
                e)
              : (te(N || I.historyAction, I.navigation.location, {
                  overrideNavigation: I.navigation,
                  enableViewTransition: !0 === P,
                }),
                e);
        },
        createHref: (t) => e.history.createHref(t),
        encodeLocation: (t) => e.history.encodeLocation(t),
        getFetcher: ue,
        resetFetcher: function (e, t) {
          (ye(e, t?.reason), ce(e, kt(null)));
        },
        deleteFetcher: function (e) {
          let t = (G.get(e) || 0) - 1;
          (t <= 0 ? (G.delete(e), Y.add(e)) : G.set(e, t),
            J({
              fetchers: new Map(I.fetchers),
            }));
        },
        dispose: function () {
          (v && v(),
            T && T(),
            g.clear(),
            R && R.abort(),
            I.fetchers.forEach((e, t) => pe(t)),
            I.blockers.forEach((e, t) => Ee(t)));
        },
        getBlocker: function (e, t) {
          let n = I.blockers.get(e) || he;
          return (Q.get(e) !== t && Q.set(e, t), n);
        },
        deleteBlocker: Ee,
        patchRoutes: function (e, t, n = !1) {
          let o = null == r;
          (Oe(e, t, r || l, i, a, n), o && ((l = [...l]), J({})));
        },
        _internalFetchControllers: F,
        _internalSetRoutes: function (e) {
          ((i = {}), (r = S(e, a, void 0, i)));
        },
        _internalSetStateDoNotUseOrYouWillBreakYourApp(e) {
          J(e);
        },
      }),
      u
    );
  }
  function xe(e, t) {
    f(e.length > 0, "You must provide a non-empty routes array to createStaticHandler");
    let n = {},
      r = (t ? t.basename : null) || "/",
      o = t?.mapRouteProperties || ge,
      a = S(e, o, void 0, n);
    async function i(e, t, r, a, i, s, u, d, m) {
      f(e.signal, "query()/queryRoute() requests must contain an AbortController signal");
      try {
        if (wt(e.method)) {
          let f = await (async function (e, t, r, a, i, s, u, d, f) {
            let m;
            if (r.route.action || r.route.lazy) {
              let l = qe(o, n, e, t, r, [], a);
              ((m = (await c(e, l, u, a, i))[r.route.id]), e.signal.aborted && Ee(e, u));
            } else {
              let t = it(405, {
                method: e.method,
                pathname: new URL(e.url).pathname,
                routeId: r.route.id,
              });
              if (u) throw t;
              m = {
                type: "error",
                error: t,
              };
            }
            if (ht(m))
              throw new Response(null, {
                status: m.response.status,
                headers: {
                  Location: m.response.headers.get("Location"),
                },
              });
            if (u) {
              if (mt(m)) throw m.error;
              return {
                matches: [r],
                loaderData: {},
                actionData: {
                  [r.route.id]: m.data,
                },
                errors: null,
                statusCode: 200,
                loaderHeaders: {},
                actionHeaders: {},
              };
            }
            if (f) {
              if (mt(m)) {
                let e = s ? r : ot(t, r.route.id);
                return {
                  statusCode: ae(m.error)
                    ? m.error.status
                    : null != m.statusCode
                      ? m.statusCode
                      : 500,
                  actionData: null,
                  actionHeaders: {
                    ...(m.headers
                      ? {
                          [r.route.id]: m.headers,
                        }
                      : {}),
                  },
                  matches: t,
                  loaderData: {},
                  errors: {
                    [e.route.id]: m.error,
                  },
                  loaderHeaders: {},
                };
              }
              return {
                actionData: {
                  [r.route.id]: m.data,
                },
                actionHeaders: m.headers
                  ? {
                      [r.route.id]: m.headers,
                    }
                  : {},
                matches: t,
                loaderData: {},
                errors: null,
                statusCode: m.statusCode || 200,
                loaderHeaders: {},
              };
            }
            let h = new Request(e.url, {
              headers: e.headers,
              redirect: e.redirect,
              signal: e.signal,
            });
            if (mt(m)) {
              let e = s ? r : ot(t, r.route.id);
              return {
                ...(await l(h, t, a, i, s, null, d, [e.route.id, m])),
                statusCode: ae(m.error)
                  ? m.error.status
                  : null != m.statusCode
                    ? m.statusCode
                    : 500,
                actionData: null,
                actionHeaders: {
                  ...(m.headers
                    ? {
                        [r.route.id]: m.headers,
                      }
                    : {}),
                },
              };
            }
            return {
              ...(await l(h, t, a, i, s, null, d)),
              actionData: {
                [r.route.id]: m.data,
              },
              ...(m.statusCode
                ? {
                    statusCode: m.statusCode,
                  }
                : {}),
              actionHeaders: m.headers
                ? {
                    [r.route.id]: m.headers,
                  }
                : {},
            };
          })(e, r, u || Ct(r, t), a, i, s, null != u, d, m);
          return f;
        }
        let f = await l(e, r, a, i, s, u, d);
        return vt(f)
          ? f
          : {
              ...f,
              actionData: null,
              actionHeaders: {},
            };
      } catch (e) {
        if (dt(e) && vt(e.result)) {
          if ("error" === e.type) throw e.result;
          return e.result;
        }
        if (bt(e)) return e;
        throw e;
      }
    }
    async function l(e, t, r, a, i, l, s, u) {
      let d,
        f = null != l;
      if (f && !l?.route.loader && !l?.route.lazy)
        throw it(400, {
          method: e.method,
          pathname: new URL(e.url).pathname,
          routeId: l?.route.id,
        });
      if (l) d = qe(o, n, e, t, l, [], r);
      else {
        let a = u && mt(u[1]) ? t.findIndex((e) => e.route.id === u[0]) - 1 : void 0;
        d = t.map((t, i) =>
          We(
            o,
            n,
            e,
            t,
            [],
            r,
            !(null != a && i > a) && null != (t.route.loader || t.route.lazy) && (!s || s(t)),
          ),
        );
      }
      if (!a && !d.some((e) => e.shouldLoad))
        return {
          matches: t,
          loaderData: {},
          errors:
            u && mt(u[1])
              ? {
                  [u[0]]: u[1].error,
                }
              : null,
          statusCode: 200,
          loaderHeaders: {},
        };
      let m = await c(e, d, f, r, a);
      return (
        e.signal.aborted && Ee(e, f),
        {
          ...et(t, m, u, !0, i),
          matches: t,
        }
      );
    }
    async function c(e, t, n, o, a) {
      let i = await Ke(a || je, e, t, null, o, !0),
        l = {};
      return (
        await Promise.all(
          t.map(async (o) => {
            if (!(o.route.id in i)) return;
            let a = i[o.route.id];
            if (ft(a)) throw Ge(a.result, e, o.route.id, t, r);
            if (n) {
              if (vt(a.result)) throw a;
              if (pt(a.result)) throw st(a.result);
            }
            l[o.route.id] = await Xe(a);
          }),
        ),
        l
      );
    }
    return {
      dataRoutes: a,
      query: async function (
        e,
        {
          requestContext: t,
          filterMatchesToLoad: l,
          skipLoaderErrorBubbling: c,
          skipRevalidation: s,
          dataStrategy: u,
          generateMiddlewareResponse: d,
        } = {},
      ) {
        let m = new URL(e.url),
          h = e.method,
          g = p("", v(m), null, "default"),
          b = A(a, g, r);
        if (((t = null != t ? t : new x()), !yt(h) && "HEAD" !== h)) {
          let e = it(405, {
              method: h,
            }),
            { matches: t, route: n } = at(a),
            o = {
              basename: r,
              location: g,
              matches: t,
              loaderData: {},
              actionData: null,
              errors: {
                [n.id]: e,
              },
              statusCode: e.status,
              loaderHeaders: {},
              actionHeaders: {},
            };
          return d ? d(() => Promise.resolve(o)) : o;
        }
        if (!b) {
          let e = it(404, {
              pathname: g.pathname,
            }),
            { matches: t, route: n } = at(a),
            o = {
              basename: r,
              location: g,
              matches: t,
              loaderData: {},
              actionData: null,
              errors: {
                [n.id]: e,
              },
              statusCode: e.status,
              loaderHeaders: {},
              actionHeaders: {},
            };
          return d ? d(() => Promise.resolve(o)) : o;
        }
        if (d) {
          f(
            t instanceof x,
            "When using middleware in `staticHandler.query()`, any provided `requestContext` must be an instance of `RouterContextProvider`",
          );
          try {
            let m;
            await Pe(b, n, o);
            let h = await Be(
              {
                request: e,
                matches: b,
                params: b[0].params,
                context: t,
              },
              async () =>
                await d(async (e, n = {}) => {
                  let o = await i(
                    e,
                    g,
                    b,
                    t,
                    u || null,
                    !0 === c,
                    null,
                    "filterMatchesToLoad" in n ? (n.filterMatchesToLoad ?? null) : (l ?? null),
                    !0 === s,
                  );
                  return vt(o)
                    ? o
                    : ((m = {
                        location: g,
                        basename: r,
                        ...o,
                      }),
                      m);
                }),
              async (e, t) => {
                if (bt(e)) return e;
                if (vt(e))
                  try {
                    e = new oe(e.status, e.statusText, await Ue(e));
                  } catch (t) {
                    e = t;
                  }
                var n;
                if (
                  (pt(e) &&
                    ((n = e),
                    (e = new oe(
                      n.init?.status ?? 500,
                      n.init?.statusText ?? "Internal Server Error",
                      n.data,
                    ))),
                  m)
                ) {
                  t in m.loaderData && (m.loaderData[t] = void 0);
                  let n = Ce(a, m, e, c ? t : ot(b, t).route.id);
                  return d(() => Promise.resolve(n));
                }
                {
                  let n = c
                      ? t
                      : ot(b, b.find((e) => e.route.id === t || e.route.loader)?.route.id || t)
                          .route.id,
                    o = {
                      matches: b,
                      location: g,
                      basename: r,
                      loaderData: {},
                      actionData: null,
                      errors: {
                        [n]: e,
                      },
                      statusCode: ae(e) ? e.status : 500,
                      actionHeaders: {},
                      loaderHeaders: {},
                    };
                  return d(() => Promise.resolve(o));
                }
              },
            );
            return (f(vt(h), "Expected a response in query()"), h);
          } catch (e) {
            if (vt(e)) return e;
            throw e;
          }
        }
        let y = await i(e, g, b, t, u || null, !0 === c, null, l || null, !0 === s);
        return vt(y)
          ? y
          : {
              location: g,
              basename: r,
              ...y,
            };
      },
      queryRoute: async function (
        e,
        { routeId: t, requestContext: l, dataStrategy: c, generateMiddlewareResponse: s } = {},
      ) {
        let u = new URL(e.url),
          d = e.method,
          m = p("", v(u), null, "default"),
          h = A(a, m, r);
        if (((l = null != l ? l : new x()), !yt(d) && "HEAD" !== d && "OPTIONS" !== d))
          throw it(405, {
            method: d,
          });
        if (!h)
          throw it(404, {
            pathname: m.pathname,
          });
        let g = t ? h.find((e) => e.route.id === t) : Ct(h, m);
        if (t && !g)
          throw it(403, {
            pathname: m.pathname,
            routeId: t,
          });
        if (!g)
          throw it(404, {
            pathname: m.pathname,
          });
        return s
          ? (f(
              l instanceof x,
              "When using middleware in `staticHandler.queryRoute()`, any provided `requestContext` must be an instance of `RouterContextProvider`",
            ),
            await Pe(h, n, o),
            await Be(
              {
                request: e,
                matches: h,
                params: h[0].params,
                context: l,
              },
              async () =>
                await s(async (e) => {
                  let t = b(await i(e, m, h, l, c || null, !1, g, null, !1));
                  return vt(t) ? t : "string" == typeof t ? new Response(t) : Response.json(t);
                }),
              (e) => {
                if (pt(e)) return Promise.resolve(st(e));
                if (vt(e)) return Promise.resolve(e);
                throw e;
              },
            ))
          : b(await i(e, m, h, l, c || null, !1, g, null, !1));
        function b(e) {
          if (vt(e)) return e;
          let t = e.errors ? Object.values(e.errors)[0] : void 0;
          if (void 0 !== t) throw t;
          return e.actionData
            ? Object.values(e.actionData)[0]
            : e.loaderData
              ? Object.values(e.loaderData)[0]
              : void 0;
        }
      },
    };
  }
  function Ce(e, t, n, r) {
    let o = r || t._deepestRenderedBoundaryId || e[0].id;
    return {
      ...t,
      statusCode: ae(n) ? n.status : 500,
      errors: {
        [o]: n,
      },
    };
  }
  function Ee(e, t) {
    if (void 0 !== e.signal.reason) throw e.signal.reason;
    throw new Error(
      `${t ? "queryRoute" : "query"}() call aborted without an \`AbortSignal.reason\`: ${e.method} ${e.url}`,
    );
  }
  function Se(e, t, n, r, o, a) {
    let i, l;
    if (o) {
      i = [];
      for (let e of t)
        if ((i.push(e), e.route.id === o)) {
          l = e;
          break;
        }
    } else ((i = t), (l = t[t.length - 1]));
    let c = X(r || ".", U(i), _(e.pathname, n) || e.pathname, "path" === a);
    if (
      (null == r && ((c.search = e.search), (c.hash = e.hash)),
      (null == r || "" === r || "." === r) && l)
    ) {
      let e = xt(c.search);
      if (l.route.index && !e) c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index";
      else if (!l.route.index && e) {
        let e = new URLSearchParams(c.search),
          t = e.getAll("index");
        (e.delete("index"), t.filter((e) => e).forEach((t) => e.append("index", t)));
        let n = e.toString();
        c.search = n ? `?${n}` : "";
      }
    }
    return (
      "/" !== n &&
        (c.pathname = (function ({ basename: e, pathname: t }) {
          return "/" === t ? e : G([e, t]);
        })({
          basename: n,
          pathname: c.pathname,
        })),
      v(c)
    );
  }
  function Ae(e, t, n) {
    if (
      !n ||
      !(function (e) {
        return (
          null != e &&
          (("formData" in e && null != e.formData) || ("body" in e && void 0 !== e.body))
        );
      })(n)
    )
      return {
        path: t,
      };
    if (n.formMethod && !yt(n.formMethod))
      return {
        path: t,
        error: it(405, {
          method: n.formMethod,
        }),
      };
    let r,
      o,
      a = () => ({
        path: t,
        error: it(400, {
          type: "invalid-body",
        }),
      }),
      i = (n.formMethod || "get").toUpperCase(),
      l = ct(t);
    if (void 0 !== n.body) {
      if ("text/plain" === n.formEncType) {
        if (!wt(i)) return a();
        let e =
          "string" == typeof n.body
            ? n.body
            : n.body instanceof FormData || n.body instanceof URLSearchParams
              ? Array.from(n.body.entries()).reduce((e, [t, n]) => `${e}${t}=${n}\n`, "")
              : String(n.body);
        return {
          path: t,
          submission: {
            formMethod: i,
            formAction: l,
            formEncType: n.formEncType,
            formData: void 0,
            json: void 0,
            text: e,
          },
        };
      }
      if ("application/json" === n.formEncType) {
        if (!wt(i)) return a();
        try {
          let e = "string" == typeof n.body ? JSON.parse(n.body) : n.body;
          return {
            path: t,
            submission: {
              formMethod: i,
              formAction: l,
              formEncType: n.formEncType,
              formData: void 0,
              json: e,
              text: void 0,
            },
          };
        } catch (e) {
          return a();
        }
      }
    }
    if (
      (f("function" == typeof FormData, "FormData is not available in this environment"),
      n.formData)
    )
      ((r = Ze(n.formData)), (o = n.formData));
    else if (n.body instanceof FormData) ((r = Ze(n.body)), (o = n.body));
    else if (n.body instanceof URLSearchParams) ((r = n.body), (o = Je(r)));
    else if (null == n.body) ((r = new URLSearchParams()), (o = new FormData()));
    else
      try {
        ((r = new URLSearchParams(n.body)), (o = Je(r)));
      } catch (e) {
        return a();
      }
    let c = {
      formMethod: i,
      formAction: l,
      formEncType: (n && n.formEncType) || "application/x-www-form-urlencoded",
      formData: o,
      json: void 0,
      text: void 0,
    };
    if (wt(c.formMethod))
      return {
        path: t,
        submission: c,
      };
    let s = g(t);
    return (
      e && s.search && xt(s.search) && r.append("index", ""),
      (s.search = `?${r}`),
      {
        path: v(s),
        submission: c,
      }
    );
  }
  function ke(e, t, n, r, o, a, i, l, c, s, u, d, f, m, h, p, v, g, b, y) {
    let w,
      x = y ? (mt(y[1]) ? y[1].error : y[1].data) : void 0,
      C = o.createURL(a.location),
      E = o.createURL(c);
    if (u && a.errors) {
      let e = Object.keys(a.errors)[0];
      w = i.findIndex((t) => t.route.id === e);
    } else if (y && mt(y[1])) {
      let e = y[0];
      w = i.findIndex((t) => t.route.id === e) - 1;
    }
    let S = y ? y[1].statusCode : void 0,
      k = S && S >= 400,
      $ = {
        currentUrl: C,
        currentParams: a.matches[0]?.params || {},
        nextUrl: E,
        nextParams: i[0].params,
        ...l,
        actionResult: x,
        actionStatus: S,
      },
      z = i.map((o, i) => {
        let { route: l } = o,
          c = null;
        if (
          (null != w && i > w
            ? (c = !1)
            : l.lazy
              ? (c = !0)
              : $e(l)
                ? u
                  ? (c = ze(l, a.loaderData, a.errors))
                  : (function (e, t, n) {
                      let r = !t || n.route.id !== t.route.id,
                        o = !e.hasOwnProperty(n.route.id);
                      return r || o;
                    })(a.loaderData, a.matches[i], o) && (c = !0)
                : (c = !1),
          null !== c)
        )
          return We(n, r, e, o, s, t, c);
        let f =
            !k &&
            (d ||
              C.pathname + C.search === E.pathname + E.search ||
              C.search !== E.search ||
              (function (e, t) {
                let n = e.route.path;
                return (
                  e.pathname !== t.pathname ||
                  (null != n && n.endsWith("*") && e.params["*"] !== t.params["*"])
                );
              })(a.matches[i], o)),
          m = {
            ...$,
            defaultShouldRevalidate: f,
          },
          h = Me(o, m);
        return We(n, r, e, o, s, t, h, m);
      }),
      M = [];
    return (
      h.forEach((e, l) => {
        if (u || !i.some((t) => t.route.id === e.routeId) || m.has(l)) return;
        let c = a.fetchers.get(l),
          h = c && "idle" !== c.state && void 0 === c.data,
          y = A(v, e.path, g);
        if (!y) {
          if (b && h) return;
          return void M.push({
            key: l,
            routeId: e.routeId,
            path: e.path,
            matches: null,
            match: null,
            request: null,
            controller: null,
          });
        }
        if (p.has(l)) return;
        let w = Ct(y, e.path),
          x = new AbortController(),
          C = Qe(o, e.path, x.signal),
          E = null;
        if (f.has(l)) (f.delete(l), (E = qe(n, r, C, y, w, s, t)));
        else if (h) d && (E = qe(n, r, C, y, w, s, t));
        else {
          let e = {
            ...$,
            defaultShouldRevalidate: !k && d,
          };
          Me(w, e) && (E = qe(n, r, C, y, w, s, t, e));
        }
        E &&
          M.push({
            key: l,
            routeId: e.routeId,
            path: e.path,
            matches: E,
            match: w,
            request: C,
            controller: x,
          });
      }),
      {
        dsMatches: z,
        revalidatingFetchers: M,
      }
    );
  }
  function $e(e) {
    return null != e.loader || (null != e.middleware && e.middleware.length > 0);
  }
  function ze(e, t, n) {
    if (e.lazy) return !0;
    if (!$e(e)) return !1;
    let r = null != t && e.id in t,
      o = null != n && void 0 !== n[e.id];
    return !(!r && o) && (("function" == typeof e.loader && !0 === e.loader.hydrate) || (!r && !o));
  }
  function Me(e, t) {
    if (e.route.shouldRevalidate) {
      let n = e.route.shouldRevalidate(t);
      if ("boolean" == typeof n) return n;
    }
    return t.defaultShouldRevalidate;
  }
  function Oe(e, t, n, r, o, a) {
    let i;
    if (e) {
      let t = r[e];
      (f(t, `No route found to patch children into: routeId = ${e}`),
        t.children || (t.children = []),
        (i = t.children));
    } else i = n;
    let l = [],
      c = [];
    if (
      (t.forEach((e) => {
        let t = i.find((t) => Re(e, t));
        t
          ? c.push({
              existingRoute: t,
              newRoute: e,
            })
          : l.push(e);
      }),
      l.length > 0)
    ) {
      let t = S(l, o, [e || "_", "patch", String(i?.length || "0")], r);
      i.push(...t);
    }
    if (a && c.length > 0)
      for (let e = 0; e < c.length; e++) {
        let { existingRoute: t, newRoute: n } = c[e],
          r = t,
          [a] = S([n], o, [], {}, !0);
        Object.assign(r, {
          element: a.element ? a.element : r.element,
          errorElement: a.errorElement ? a.errorElement : r.errorElement,
          hydrateFallbackElement: a.hydrateFallbackElement
            ? a.hydrateFallbackElement
            : r.hydrateFallbackElement,
        });
      }
  }
  function Re(e, t) {
    return (
      ("id" in e && "id" in t && e.id === t.id) ||
      (e.index === t.index &&
        e.path === t.path &&
        e.caseSensitive === t.caseSensitive &&
        (!((e.children && 0 !== e.children.length) || (t.children && 0 !== t.children.length)) ||
          e.children.every((e, n) => t.children?.some((t) => Re(e, t)))))
    );
  }
  var He = new WeakMap(),
    Ie = ({ key: e, route: t, manifest: n, mapRouteProperties: r }) => {
      let o = n[t.id];
      if ((f(o, "No route found in manifest"), !o.lazy || "object" != typeof o.lazy)) return;
      let a = o.lazy[e];
      if (!a) return;
      let i = He.get(o);
      i || ((i = {}), He.set(o, i));
      let l = i[e];
      if (l) return l;
      let c = (async () => {
        let t = (function (e) {
            return C.has(e);
          })(e),
          n = void 0 !== o[e] && "hasErrorBoundary" !== e;
        if (t)
          (m(
            !t,
            "Route property " +
              e +
              " is not a supported lazy route property. This property will be ignored.",
          ),
            (i[e] = Promise.resolve()));
        else if (n)
          m(
            !1,
            `Route "${o.id}" has a static property "${e}" defined. The lazy property will be ignored.`,
          );
        else {
          let t = await a();
          null != t &&
            (Object.assign(o, {
              [e]: t,
            }),
            Object.assign(o, r(o)));
        }
        "object" == typeof o.lazy &&
          ((o.lazy[e] = void 0),
          Object.values(o.lazy).every((e) => void 0 === e) && (o.lazy = void 0));
      })();
      return ((i[e] = c), c);
    },
    Ne = new WeakMap();
  function Le(e) {
    return void 0 !== e;
  }
  function Pe(e, t, n) {
    let r = e
      .map(({ route: e }) => {
        if ("object" == typeof e.lazy && e.lazy.middleware)
          return Ie({
            key: "middleware",
            route: e,
            manifest: t,
            mapRouteProperties: n,
          });
      })
      .filter(Le);
    return r.length > 0 ? Promise.all(r) : void 0;
  }
  async function je(e) {
    let t = e.matches.filter((e) => e.shouldLoad),
      n = {};
    return (
      (await Promise.all(t.map((e) => e.resolve()))).forEach((e, r) => {
        n[t[r].route.id] = e;
      }),
      n
    );
  }
  async function Te(e) {
    return e.matches.some((e) => e.route.middleware) ? Ve(e, () => je(e)) : je(e);
  }
  function Be(e, t, n) {
    return De(
      e,
      t,
      function (e) {
        return pt(e) ? st(e) : e;
      },
      vt,
      n,
    );
  }
  function Ve(e, t) {
    return De(
      e,
      t,
      (e) => e,
      ut,
      function (t, n, r) {
        if (r)
          return Promise.resolve(
            Object.assign(r.value, {
              [n]: {
                type: "error",
                result: t,
              },
            }),
          );
        {
          let { matches: r } = e,
            o = Math.min(
              Math.max(
                r.findIndex((e) => e.route.id === n),
                0,
              ),
              Math.max(
                r.findIndex((e) => e.unstable_shouldCallHandler()),
                0,
              ),
            ),
            a = ot(r, r[o].route.id).route.id;
          return Promise.resolve({
            [a]: {
              type: "error",
              result: t,
            },
          });
        }
      },
    );
  }
  async function De(e, t, n, r, o) {
    let { matches: a, request: i, params: l, context: c } = e,
      s = a.flatMap((e) =>
        e.route.middleware ? e.route.middleware.map((t) => [e.route.id, t]) : [],
      );
    return await Fe(
      {
        request: i,
        params: l,
        context: c,
      },
      s,
      t,
      n,
      r,
      o,
    );
  }
  async function Fe(e, t, n, r, o, a, i = 0) {
    let { request: l } = e;
    if (l.signal.aborted)
      throw l.signal.reason ?? new Error(`Request aborted: ${l.method} ${l.url}`);
    let c = t[i];
    if (!c) return await n();
    let s,
      [u, d] = c,
      f = async () => {
        if (s) throw new Error("You may only call `next()` once per middleware");
        try {
          let l = await Fe(e, t, n, r, o, a, i + 1);
          return (
            (s = {
              value: l,
            }),
            s.value
          );
        } catch (e) {
          return (
            (s = {
              value: await a(e, u, s),
            }),
            s.value
          );
        }
      };
    try {
      let t = await d(e, f),
        n = null != t ? r(t) : void 0;
      return o(n)
        ? n
        : s
          ? (n ?? s.value)
          : ((s = {
              value: await f(),
            }),
            s.value);
    } catch (e) {
      return await a(e, u, s);
    }
  }
  function _e(e, t, n, r, o) {
    let a = Ie({
        key: "middleware",
        route: r.route,
        manifest: t,
        mapRouteProperties: e,
      }),
      i = (function (e, t, n, r, o) {
        let a = n[e.id];
        if ((f(a, "No route found in manifest"), !e.lazy))
          return {
            lazyRoutePromise: void 0,
            lazyHandlerPromise: void 0,
          };
        if ("function" == typeof e.lazy) {
          let t = Ne.get(a);
          if (t)
            return {
              lazyRoutePromise: t,
              lazyHandlerPromise: t,
            };
          let n = (async () => {
            f("function" == typeof e.lazy, "No lazy route function found");
            let t = await e.lazy(),
              n = {};
            for (let e in t) {
              let r = t[e];
              if (void 0 === r) continue;
              let i = ((o = e), E.has(o)),
                l = void 0 !== a[e] && "hasErrorBoundary" !== e;
              i
                ? m(
                    !i,
                    "Route property " +
                      e +
                      " is not a supported property to be returned from a lazy route function. This property will be ignored.",
                  )
                : l
                  ? m(
                      !l,
                      `Route "${a.id}" has a static property "${e}" defined but its lazy function is also returning a value for this property. The lazy route property "${e}" will be ignored.`,
                    )
                  : (n[e] = r);
            }
            var o;
            (Object.assign(a, n),
              Object.assign(a, {
                ...r(a),
                lazy: void 0,
              }));
          })();
          return (
            Ne.set(a, n),
            n.catch(() => {}),
            {
              lazyRoutePromise: n,
              lazyHandlerPromise: n,
            }
          );
        }
        let i,
          l = Object.keys(e.lazy),
          c = [];
        for (let a of l) {
          if (o && o.includes(a)) continue;
          let l = Ie({
            key: a,
            route: e,
            manifest: n,
            mapRouteProperties: r,
          });
          l && (c.push(l), a === t && (i = l));
        }
        let s = c.length > 0 ? Promise.all(c).then(() => {}) : void 0;
        return (
          s?.catch(() => {}),
          i?.catch(() => {}),
          {
            lazyRoutePromise: s,
            lazyHandlerPromise: i,
          }
        );
      })(r.route, wt(n.method) ? "action" : "loader", t, e, o);
    return {
      middleware: a,
      route: i.lazyRoutePromise,
      handler: i.lazyHandlerPromise,
    };
  }
  function We(e, t, n, r, o, a, i, l = null) {
    let c = !1,
      s = _e(e, t, n, r, o);
    return {
      ...r,
      _lazyPromises: s,
      shouldLoad: i,
      unstable_shouldRevalidateArgs: l,
      unstable_shouldCallHandler: (e) => (
        (c = !0),
        l
          ? Me(
              r,
              "boolean" == typeof e
                ? {
                    ...l,
                    defaultShouldRevalidate: e,
                  }
                : l,
            )
          : i
      ),
      resolve(e) {
        let { lazy: t, loader: o, middleware: l } = r.route,
          u = c || i || (e && !wt(n.method) && (t || o)),
          d = l && l.length > 0 && !o && !t;
        return u && !d
          ? (async function ({
              request: e,
              match: t,
              lazyHandlerPromise: n,
              lazyRoutePromise: r,
              handlerOverride: o,
              scopedContext: a,
            }) {
              let i,
                l,
                c = wt(e.method),
                s = c ? "action" : "loader",
                u = (n) => {
                  let r,
                    i = new Promise((e, t) => (r = t));
                  ((l = () => r()), e.signal.addEventListener("abort", l));
                  let c = (r) =>
                      "function" != typeof n
                        ? Promise.reject(
                            new Error(
                              `You cannot call the handler for a route which defines a boolean "${s}" [routeId: ${t.route.id}]`,
                            ),
                          )
                        : n(
                            {
                              request: e,
                              params: t.params,
                              context: a,
                            },
                            ...(void 0 !== r ? [r] : []),
                          ),
                    u = (async () => {
                      try {
                        return {
                          type: "data",
                          result: await (o ? o((e) => c(e)) : c()),
                        };
                      } catch (e) {
                        return {
                          type: "error",
                          result: e,
                        };
                      }
                    })();
                  return Promise.race([u, i]);
                };
              try {
                let o = c ? t.route.action : t.route.loader;
                if (n || r) {
                  if (o) {
                    let e,
                      [t] = await Promise.all([
                        u(o).catch((t) => {
                          e = t;
                        }),
                        n,
                        r,
                      ]);
                    if (void 0 !== e) throw e;
                    i = t;
                  } else {
                    await n;
                    let o = c ? t.route.action : t.route.loader;
                    if (!o) {
                      if ("action" === s) {
                        let n = new URL(e.url),
                          r = n.pathname + n.search;
                        throw it(405, {
                          method: e.method,
                          pathname: r,
                          routeId: t.route.id,
                        });
                      }
                      return {
                        type: "data",
                        result: void 0,
                      };
                    }
                    [i] = await Promise.all([u(o), r]);
                  }
                } else {
                  if (!o) {
                    let t = new URL(e.url);
                    throw it(404, {
                      pathname: t.pathname + t.search,
                    });
                  }
                  i = await u(o);
                }
              } catch (e) {
                return {
                  type: "error",
                  result: e,
                };
              } finally {
                l && e.signal.removeEventListener("abort", l);
              }
              return i;
            })({
              request: n,
              match: r,
              lazyHandlerPromise: s?.handler,
              lazyRoutePromise: s?.route,
              handlerOverride: e,
              scopedContext: a,
            })
          : Promise.resolve({
              type: "data",
              result: void 0,
            });
      },
    };
  }
  function qe(e, t, n, r, o, a, i, l = null) {
    return r.map((r) =>
      r.route.id !== o.route.id
        ? {
            ...r,
            shouldLoad: !1,
            unstable_shouldRevalidateArgs: l,
            unstable_shouldCallHandler: () => !1,
            _lazyPromises: _e(e, t, n, r, a),
            resolve: () =>
              Promise.resolve({
                type: "data",
                result: void 0,
              }),
          }
        : We(e, t, n, r, a, i, !0, l),
    );
  }
  async function Ke(e, t, n, r, o, a) {
    n.some((e) => e._lazyPromises?.middleware) &&
      (await Promise.all(n.map((e) => e._lazyPromises?.middleware)));
    let i = {
        request: t,
        params: n[0].params,
        context: o,
        matches: n,
      },
      l = a
        ? () => {
            throw new Error(
              "You cannot call `runClientMiddleware()` from a static handler `dataStrategy`. Middleware is run outside of `dataStrategy` during SSR in order to bubble up the Response.  You can enable middleware via the `respond` API in `query`/`queryRoute`",
            );
          }
        : (e) => {
            let t = i;
            return Ve(t, () =>
              e({
                ...t,
                fetcherKey: r,
                runClientMiddleware: () => {
                  throw new Error(
                    "Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler",
                  );
                },
              }),
            );
          },
      c = await e({
        ...i,
        fetcherKey: r,
        runClientMiddleware: l,
      });
    try {
      await Promise.all(n.flatMap((e) => [e._lazyPromises?.handler, e._lazyPromises?.route]));
    } catch (e) {}
    return c;
  }
  async function Ue(e) {
    let t = e.headers.get("Content-Type");
    return t && /\bapplication\/json\b/.test(t) ? (null == e.body ? null : e.json()) : e.text();
  }
  async function Xe(e) {
    let { result: t, type: n } = e;
    if (vt(t)) {
      let e;
      try {
        e = await Ue(t);
      } catch (e) {
        return {
          type: "error",
          error: e,
        };
      }
      return "error" === n
        ? {
            type: "error",
            error: new oe(t.status, t.statusText, e),
            statusCode: t.status,
            headers: t.headers,
          }
        : {
            type: "data",
            data: e,
            statusCode: t.status,
            headers: t.headers,
          };
    }
    return "error" === n
      ? pt(t)
        ? t.data instanceof Error
          ? {
              type: "error",
              error: t.data,
              statusCode: t.init?.status,
              headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
            }
          : {
              type: "error",
              error: new oe(t.init?.status || 500, void 0, t.data),
              statusCode: ae(t) ? t.status : void 0,
              headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
            }
        : {
            type: "error",
            error: t,
            statusCode: ae(t) ? t.status : void 0,
          }
      : pt(t)
        ? {
            type: "data",
            data: t.data,
            statusCode: t.init?.status,
            headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
          }
        : {
            type: "data",
            data: t,
          };
  }
  function Ge(e, t, n, r, o) {
    let a = e.headers.get("Location");
    if (
      (f(a, "Redirects returned/thrown from loaders/actions must have a Location header"), !ve(a))
    ) {
      let i = r.slice(0, r.findIndex((e) => e.route.id === n) + 1);
      ((a = Se(new URL(t.url), i, o, a)), e.headers.set("Location", a));
    }
    return e;
  }
  function Ye(e, t, n) {
    if (ve(e)) {
      let r = e,
        o = r.startsWith("//") ? new URL(t.protocol + r) : new URL(r),
        a = null != _(o.pathname, n);
      if (o.origin === t.origin && a) return o.pathname + o.search + o.hash;
    }
    return e;
  }
  function Qe(e, t, n, r) {
    let o = e.createURL(ct(t)).toString(),
      a = {
        signal: n,
      };
    if (r && wt(r.formMethod)) {
      let { formMethod: e, formEncType: t } = r;
      ((a.method = e.toUpperCase()),
        "application/json" === t
          ? ((a.headers = new Headers({
              "Content-Type": t,
            })),
            (a.body = JSON.stringify(r.json)))
          : "text/plain" === t
            ? (a.body = r.text)
            : "application/x-www-form-urlencoded" === t && r.formData
              ? (a.body = Ze(r.formData))
              : (a.body = r.formData));
    }
    return new Request(o, a);
  }
  function Ze(e) {
    let t = new URLSearchParams();
    for (let [n, r] of e.entries()) t.append(n, "string" == typeof r ? r : r.name);
    return t;
  }
  function Je(e) {
    let t = new FormData();
    for (let [n, r] of e.entries()) t.append(n, r);
    return t;
  }
  function et(e, t, n, r = !1, o = !1) {
    let a,
      i = {},
      l = null,
      c = !1,
      s = {},
      u = n && mt(n[1]) ? n[1].error : void 0;
    return (
      e.forEach((n) => {
        if (!(n.route.id in t)) return;
        let d = n.route.id,
          m = t[d];
        if ((f(!ht(m), "Cannot handle redirect results in processLoaderData"), mt(m))) {
          let t = m.error;
          if ((void 0 !== u && ((t = u), (u = void 0)), (l = l || {}), o)) l[d] = t;
          else {
            let n = ot(e, d);
            null == l[n.route.id] && (l[n.route.id] = t);
          }
          (r || (i[d] = ye),
            c || ((c = !0), (a = ae(m.error) ? m.error.status : 500)),
            m.headers && (s[d] = m.headers));
        } else
          ((i[d] = m.data),
            m.statusCode && 200 !== m.statusCode && !c && (a = m.statusCode),
            m.headers && (s[d] = m.headers));
      }),
      void 0 !== u &&
        n &&
        ((l = {
          [n[0]]: u,
        }),
        n[2] && (i[n[2]] = void 0)),
      {
        loaderData: i,
        errors: l,
        statusCode: a || 200,
        loaderHeaders: s,
      }
    );
  }
  function tt(e, t, n, r, o, a) {
    let { loaderData: i, errors: l } = et(t, n, r);
    return (
      o
        .filter((e) => !e.matches || e.matches.some((e) => e.shouldLoad))
        .forEach((t) => {
          let { key: n, match: r, controller: o } = t;
          if (o && o.signal.aborted) return;
          let i = a[n];
          if ((f(i, "Did not find corresponding fetcher result"), mt(i))) {
            let t = ot(e.matches, r?.route.id);
            ((l && l[t.route.id]) ||
              (l = {
                ...l,
                [t.route.id]: i.error,
              }),
              e.fetchers.delete(n));
          } else if (ht(i)) f(!1, "Unhandled fetcher revalidation redirect");
          else {
            let t = kt(i.data);
            e.fetchers.set(n, t);
          }
        }),
      {
        loaderData: i,
        errors: l,
      }
    );
  }
  function nt(e, t, n, r) {
    let o = Object.entries(t)
      .filter(([, e]) => e !== ye)
      .reduce((e, [t, n]) => ((e[t] = n), e), {});
    for (let a of n) {
      let n = a.route.id;
      if (
        (!t.hasOwnProperty(n) && e.hasOwnProperty(n) && a.route.loader && (o[n] = e[n]),
        r && r.hasOwnProperty(n))
      )
        break;
    }
    return o;
  }
  function rt(e) {
    return e
      ? mt(e[1])
        ? {
            actionData: {},
          }
        : {
            actionData: {
              [e[0]]: e[1].data,
            },
          }
      : {};
  }
  function ot(e, t) {
    return (
      (t ? e.slice(0, e.findIndex((e) => e.route.id === t) + 1) : [...e])
        .reverse()
        .find((e) => !0 === e.route.hasErrorBoundary) || e[0]
    );
  }
  function at(e) {
    let t =
      1 === e.length
        ? e[0]
        : e.find((e) => e.index || !e.path || "/" === e.path) || {
            id: "__shim-error-route__",
          };
    return {
      matches: [
        {
          params: {},
          pathname: "",
          pathnameBase: "",
          route: t,
        },
      ],
      route: t,
    };
  }
  function it(e, { pathname: t, routeId: n, method: r, type: o, message: a } = {}) {
    let i = "Unknown Server Error",
      l = "Unknown @remix-run/router error";
    return (
      400 === e
        ? ((i = "Bad Request"),
          r && t && n
            ? (l = `You made a ${r} request to "${t}" but did not provide a \`loader\` for route "${n}", so there is no way to handle the request.`)
            : "invalid-body" === o && (l = "Unable to encode submission body"))
        : 403 === e
          ? ((i = "Forbidden"), (l = `Route "${n}" does not match URL "${t}"`))
          : 404 === e
            ? ((i = "Not Found"), (l = `No route matches URL "${t}"`))
            : 405 === e &&
              ((i = "Method Not Allowed"),
              r && t && n
                ? (l = `You made a ${r.toUpperCase()} request to "${t}" but did not provide an \`action\` for route "${n}", so there is no way to handle the request.`)
                : r && (l = `Invalid request method "${r.toUpperCase()}"`)),
      new oe(e || 500, i, new Error(l), !0)
    );
  }
  function lt(e) {
    let t = Object.entries(e);
    for (let e = t.length - 1; e >= 0; e--) {
      let [n, r] = t[e];
      if (ht(r))
        return {
          key: n,
          result: r,
        };
    }
  }
  function ct(e) {
    return v({
      ...("string" == typeof e ? g(e) : e),
      hash: "",
    });
  }
  function st(e) {
    return Response.json(e.data, e.init ?? void 0);
  }
  function ut(e) {
    return (
      null != e &&
      "object" == typeof e &&
      Object.entries(e).every(([e, t]) => "string" == typeof e && dt(t))
    );
  }
  function dt(e) {
    return (
      null != e &&
      "object" == typeof e &&
      "type" in e &&
      "result" in e &&
      ("data" === e.type || "error" === e.type)
    );
  }
  function ft(e) {
    return vt(e.result) && ue.has(e.result.status);
  }
  function mt(e) {
    return "error" === e.type;
  }
  function ht(e) {
    return "redirect" === (e && e.type);
  }
  function pt(e) {
    return (
      "object" == typeof e &&
      null != e &&
      "type" in e &&
      "data" in e &&
      "init" in e &&
      "DataWithResponseInit" === e.type
    );
  }
  function vt(e) {
    return (
      null != e &&
      "number" == typeof e.status &&
      "string" == typeof e.statusText &&
      "object" == typeof e.headers &&
      void 0 !== e.body
    );
  }
  function gt(e) {
    return ue.has(e);
  }
  function bt(e) {
    return vt(e) && gt(e.status) && e.headers.has("Location");
  }
  function yt(e) {
    return se.has(e.toUpperCase());
  }
  function wt(e) {
    return le.has(e.toUpperCase());
  }
  function xt(e) {
    return new URLSearchParams(e).getAll("index").some((e) => "" === e);
  }
  function Ct(e, t) {
    let n = "string" == typeof t ? g(t).search : t.search;
    if (e[e.length - 1].route.index && xt(n || "")) return e[e.length - 1];
    let r = K(e);
    return r[r.length - 1];
  }
  function Et(e) {
    let { formMethod: t, formAction: n, formEncType: r, text: o, formData: a, json: i } = e;
    if (t && n && r)
      return null != o
        ? {
            formMethod: t,
            formAction: n,
            formEncType: r,
            formData: void 0,
            json: void 0,
            text: o,
          }
        : null != a
          ? {
              formMethod: t,
              formAction: n,
              formEncType: r,
              formData: a,
              json: void 0,
              text: void 0,
            }
          : void 0 !== i
            ? {
                formMethod: t,
                formAction: n,
                formEncType: r,
                formData: void 0,
                json: i,
                text: void 0,
              }
            : void 0;
  }
  function St(e, t) {
    return t
      ? {
          state: "loading",
          location: e,
          formMethod: t.formMethod,
          formAction: t.formAction,
          formEncType: t.formEncType,
          formData: t.formData,
          json: t.json,
          text: t.text,
        }
      : {
          state: "loading",
          location: e,
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
          json: void 0,
          text: void 0,
        };
  }
  function At(e, t) {
    return e
      ? {
          state: "loading",
          formMethod: e.formMethod,
          formAction: e.formAction,
          formEncType: e.formEncType,
          formData: e.formData,
          json: e.json,
          text: e.text,
          data: t,
        }
      : {
          state: "loading",
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
          json: void 0,
          text: void 0,
          data: t,
        };
  }
  function kt(e) {
    return {
      state: "idle",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data: e,
    };
  }
  var $t = o.createContext(null);
  $t.displayName = "DataRouter";
  var zt = o.createContext(null);
  zt.displayName = "DataRouterState";
  var Mt = o.createContext(!1),
    Ot = o.createContext({
      isTransitioning: !1,
    });
  Ot.displayName = "ViewTransition";
  var Rt = o.createContext(new Map());
  Rt.displayName = "Fetchers";
  var Ht = o.createContext(null);
  Ht.displayName = "Await";
  var It = (e) => o.createElement(Ht.Provider, e),
    Nt = o.createContext(null);
  Nt.displayName = "Navigation";
  var Lt = o.createContext(null);
  Lt.displayName = "Location";
  var Pt = o.createContext({
    outlet: null,
    matches: [],
    isDataRoute: !1,
  });
  Pt.displayName = "Route";
  var jt = o.createContext(null);
  jt.displayName = "RouteError";
  var Tt = !0;
  function Bt(e, { relative: t } = {}) {
    f(Vt(), "useHref() may be used only in the context of a <Router> component.");
    let { basename: n, navigator: r } = o.useContext(Nt),
      {
        hash: a,
        pathname: i,
        search: l,
      } = Qt(e, {
        relative: t,
      }),
      c = i;
    return (
      "/" !== n && (c = "/" === i ? n : G([n, i])),
      r.createHref({
        pathname: c,
        search: l,
        hash: a,
      })
    );
  }
  function Vt() {
    return null != o.useContext(Lt);
  }
  function Dt() {
    return (
      f(Vt(), "useLocation() may be used only in the context of a <Router> component."),
      o.useContext(Lt).location
    );
  }
  function Ft() {
    return o.useContext(Lt).navigationType;
  }
  function _t(e) {
    f(Vt(), "useMatch() may be used only in the context of a <Router> component.");
    let { pathname: t } = Dt();
    return o.useMemo(() => V(e, F(t)), [t, e]);
  }
  var Wt =
    "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
  function qt(e) {
    o.useContext(Nt).static || o.useLayoutEffect(e);
  }
  function Kt() {
    let { isDataRoute: e } = o.useContext(Pt);
    return e
      ? (function () {
          let { router: e } = ln("useNavigate"),
            t = sn("useNavigate"),
            n = o.useRef(!1);
          return (
            qt(() => {
              n.current = !0;
            }),
            o.useCallback(
              async (r, o = {}) => {
                (m(n.current, Wt),
                  n.current &&
                    ("number" == typeof r
                      ? e.navigate(r)
                      : await e.navigate(r, {
                          fromRouteId: t,
                          ...o,
                        })));
              },
              [e, t],
            )
          );
        })()
      : (function () {
          f(Vt(), "useNavigate() may be used only in the context of a <Router> component.");
          let e = o.useContext($t),
            { basename: t, navigator: n } = o.useContext(Nt),
            { matches: r } = o.useContext(Pt),
            { pathname: a } = Dt(),
            i = JSON.stringify(U(r)),
            l = o.useRef(!1);
          return (
            qt(() => {
              l.current = !0;
            }),
            o.useCallback(
              (r, o = {}) => {
                if ((m(l.current, Wt), !l.current)) return;
                if ("number" == typeof r) return void n.go(r);
                let c = X(r, JSON.parse(i), a, "path" === o.relative);
                (null == e &&
                  "/" !== t &&
                  (c.pathname = "/" === c.pathname ? t : G([t, c.pathname])),
                  (o.replace ? n.replace : n.push)(c, o.state, o));
              },
              [t, n, i, a, e],
            )
          );
        })();
  }
  var Ut = o.createContext(null);
  function Xt() {
    return o.useContext(Ut);
  }
  function Gt(e) {
    let t = o.useContext(Pt).outlet;
    return o.useMemo(
      () =>
        t &&
        o.createElement(
          Ut.Provider,
          {
            value: e,
          },
          t,
        ),
      [t, e],
    );
  }
  function Yt() {
    let { matches: e } = o.useContext(Pt),
      t = e[e.length - 1];
    return t ? t.params : {};
  }
  function Qt(e, { relative: t } = {}) {
    let { matches: n } = o.useContext(Pt),
      { pathname: r } = Dt(),
      a = JSON.stringify(U(n));
    return o.useMemo(() => X(e, JSON.parse(a), r, "path" === t), [e, a, r, t]);
  }
  function Zt(e, t) {
    return Jt(e, t);
  }
  function Jt(e, t, n, r, a) {
    f(Vt(), "useRoutes() may be used only in the context of a <Router> component.");
    let { navigator: i } = o.useContext(Nt),
      { matches: l } = o.useContext(Pt),
      c = l[l.length - 1],
      s = c ? c.params : {},
      u = c ? c.pathname : "/",
      d = c ? c.pathnameBase : "/",
      h = c && c.route;
    if (Tt) {
      let e = (h && h.path) || "";
      Cn(
        u,
        !h || e.endsWith("*") || e.endsWith("*?"),
        `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${u}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="${e}"> to <Route path="${"/" === e ? "*" : `${e}/*`}">.`,
      );
    }
    let p,
      v = Dt();
    if (t) {
      let e = "string" == typeof t ? g(t) : t;
      (f(
        "/" === d || e.pathname?.startsWith(d),
        `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${e.pathname}" was given in the \`location\` prop.`,
      ),
        (p = e));
    } else p = v;
    let b = p.pathname || "/",
      y = b;
    if ("/" !== d) {
      let e = d.replace(/^\//, "").split("/");
      y = "/" + b.replace(/^\//, "").split("/").slice(e.length).join("/");
    }
    let w = A(e, {
      pathname: y,
    });
    Tt &&
      (m(h || null != w, `No routes matched location "${p.pathname}${p.search}${p.hash}" `),
      m(
        null == w ||
          void 0 !== w[w.length - 1].route.element ||
          void 0 !== w[w.length - 1].route.Component ||
          void 0 !== w[w.length - 1].route.lazy,
        `Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
      ));
    let x = on(
      w &&
        w.map((e) =>
          Object.assign({}, e, {
            params: Object.assign({}, s, e.params),
            pathname: G([
              d,
              i.encodeLocation
                ? i.encodeLocation(e.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname
                : e.pathname,
            ]),
            pathnameBase:
              "/" === e.pathnameBase
                ? d
                : G([
                    d,
                    i.encodeLocation
                      ? i.encodeLocation(e.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23"))
                          .pathname
                      : e.pathnameBase,
                  ]),
          }),
        ),
      l,
      n,
      r,
      a,
    );
    return t && x
      ? o.createElement(
          Lt.Provider,
          {
            value: {
              location: {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
                ...p,
              },
              navigationType: "POP",
            },
          },
          x,
        )
      : x;
  }
  function en() {
    let e = vn(),
      t = ae(e)
        ? `${e.status} ${e.statusText}`
        : e instanceof Error
          ? e.message
          : JSON.stringify(e),
      n = e instanceof Error ? e.stack : null,
      r = "rgba(200,200,200, 0.5)",
      a = {
        padding: "0.5rem",
        backgroundColor: r,
      },
      i = {
        padding: "2px 4px",
        backgroundColor: r,
      },
      l = null;
    return (
      Tt &&
        (console.error("Error handled by React Router default ErrorBoundary:", e),
        (l = o.createElement(
          o.Fragment,
          null,
          o.createElement("p", null, "💿 Hey developer 👋"),
          o.createElement(
            "p",
            null,
            "You can provide a way better UX than this when your app throws errors by providing your own ",
            o.createElement(
              "code",
              {
                style: i,
              },
              "ErrorBoundary",
            ),
            " or",
            " ",
            o.createElement(
              "code",
              {
                style: i,
              },
              "errorElement",
            ),
            " prop on your route.",
          ),
        ))),
      o.createElement(
        o.Fragment,
        null,
        o.createElement("h2", null, "Unexpected Application Error!"),
        o.createElement(
          "h3",
          {
            style: {
              fontStyle: "italic",
            },
          },
          t,
        ),
        n
          ? o.createElement(
              "pre",
              {
                style: a,
              },
              n,
            )
          : null,
        l,
      )
    );
  }
  var tn = o.createElement(en, null),
    nn = class extends o.Component {
      constructor(e) {
        (super(e),
          (this.state = {
            location: e.location,
            revalidation: e.revalidation,
            error: e.error,
          }));
      }
      static getDerivedStateFromError(e) {
        return {
          error: e,
        };
      }
      static getDerivedStateFromProps(e, t) {
        return t.location !== e.location || ("idle" !== t.revalidation && "idle" === e.revalidation)
          ? {
              error: e.error,
              location: e.location,
              revalidation: e.revalidation,
            }
          : {
              error: void 0 !== e.error ? e.error : t.error,
              location: t.location,
              revalidation: e.revalidation || t.revalidation,
            };
      }
      componentDidCatch(e, t) {
        this.props.unstable_onError
          ? this.props.unstable_onError(e, t)
          : console.error("React Router caught the following error during render", e);
      }
      render() {
        return void 0 !== this.state.error
          ? o.createElement(
              Pt.Provider,
              {
                value: this.props.routeContext,
              },
              o.createElement(jt.Provider, {
                value: this.state.error,
                children: this.props.component,
              }),
            )
          : this.props.children;
      }
    };
  function rn({ routeContext: e, match: t, children: n }) {
    let r = o.useContext($t);
    return (
      r &&
        r.static &&
        r.staticContext &&
        (t.route.errorElement || t.route.ErrorBoundary) &&
        (r.staticContext._deepestRenderedBoundaryId = t.route.id),
      o.createElement(
        Pt.Provider,
        {
          value: e,
        },
        n,
      )
    );
  }
  function on(e, t = [], n = null, r = null, a = null) {
    if (null == e) {
      if (!n) return null;
      if (n.errors) e = n.matches;
      else {
        if (0 !== t.length || n.initialized || !(n.matches.length > 0)) return null;
        e = n.matches;
      }
    }
    let i = e,
      l = n?.errors;
    if (null != l) {
      let e = i.findIndex((e) => e.route.id && void 0 !== l?.[e.route.id]);
      (f(
        e >= 0,
        `Could not find a matching route for errors on route IDs: ${Object.keys(l).join(",")}`,
      ),
        (i = i.slice(0, Math.min(i.length, e + 1))));
    }
    let c = !1,
      s = -1;
    if (n)
      for (let e = 0; e < i.length; e++) {
        let t = i[e];
        if (((t.route.HydrateFallback || t.route.hydrateFallbackElement) && (s = e), t.route.id)) {
          let { loaderData: e, errors: r } = n,
            o = t.route.loader && !e.hasOwnProperty(t.route.id) && (!r || void 0 === r[t.route.id]);
          if (t.route.lazy || o) {
            ((c = !0), (i = s >= 0 ? i.slice(0, s + 1) : [i[0]]));
            break;
          }
        }
      }
    return i.reduceRight((e, a, u) => {
      let d,
        f = !1,
        m = null,
        h = null;
      n &&
        ((d = l && a.route.id ? l[a.route.id] : void 0),
        (m = a.route.errorElement || tn),
        c &&
          (s < 0 && 0 === u
            ? (Cn(
                "route-fallback",
                !1,
                "No `HydrateFallback` element provided to render during initial hydration",
              ),
              (f = !0),
              (h = null))
            : s === u && ((f = !0), (h = a.route.hydrateFallbackElement || null))));
      let p = t.concat(i.slice(0, u + 1)),
        v = () => {
          let t;
          return (
            (t = d
              ? m
              : f
                ? h
                : a.route.Component
                  ? o.createElement(a.route.Component, null)
                  : a.route.element
                    ? a.route.element
                    : e),
            o.createElement(rn, {
              match: a,
              routeContext: {
                outlet: e,
                matches: p,
                isDataRoute: null != n,
              },
              children: t,
            })
          );
        };
      return n && (a.route.ErrorBoundary || a.route.errorElement || 0 === u)
        ? o.createElement(nn, {
            location: n.location,
            revalidation: n.revalidation,
            component: m,
            error: d,
            children: v(),
            routeContext: {
              outlet: null,
              matches: p,
              isDataRoute: !0,
            },
            unstable_onError: r,
          })
        : v();
    }, null);
  }
  function an(e) {
    return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
  }
  function ln(e) {
    let t = o.useContext($t);
    return (f(t, an(e)), t);
  }
  function cn(e) {
    let t = o.useContext(zt);
    return (f(t, an(e)), t);
  }
  function sn(e) {
    let t = (function (e) {
        let t = o.useContext(Pt);
        return (f(t, an(e)), t);
      })(e),
      n = t.matches[t.matches.length - 1];
    return (
      f(n.route.id, `${e} can only be used on routes that contain a unique "id"`),
      n.route.id
    );
  }
  function un() {
    return cn("useNavigation").navigation;
  }
  function dn() {
    let e = ln("useRevalidator"),
      t = cn("useRevalidator"),
      n = o.useCallback(async () => {
        await e.router.revalidate();
      }, [e.router]);
    return o.useMemo(
      () => ({
        revalidate: n,
        state: t.revalidation,
      }),
      [n, t.revalidation],
    );
  }
  function fn() {
    let { matches: e, loaderData: t } = cn("useMatches");
    return o.useMemo(() => e.map((e) => $(e, t)), [e, t]);
  }
  function mn() {
    let e = cn("useLoaderData"),
      t = sn("useLoaderData");
    return e.loaderData[t];
  }
  function hn(e) {
    return cn("useRouteLoaderData").loaderData[e];
  }
  function pn() {
    let e = cn("useActionData"),
      t = sn("useLoaderData");
    return e.actionData ? e.actionData[t] : void 0;
  }
  function vn() {
    let e = o.useContext(jt),
      t = cn("useRouteError"),
      n = sn("useRouteError");
    return void 0 !== e ? e : t.errors?.[n];
  }
  function gn() {
    let e = o.useContext(Ht);
    return e?._data;
  }
  function bn() {
    let e = o.useContext(Ht);
    return e?._error;
  }
  var yn = 0;
  function wn(e) {
    let { router: t, basename: n } = ln("useBlocker"),
      r = cn("useBlocker"),
      [a, i] = o.useState(""),
      l = o.useCallback(
        (t) => {
          if ("function" != typeof e) return !!e;
          if ("/" === n) return e(t);
          let { currentLocation: r, nextLocation: o, historyAction: a } = t;
          return e({
            currentLocation: {
              ...r,
              pathname: _(r.pathname, n) || r.pathname,
            },
            nextLocation: {
              ...o,
              pathname: _(o.pathname, n) || o.pathname,
            },
            historyAction: a,
          });
        },
        [n, e],
      );
    return (
      o.useEffect(() => {
        let e = String(++yn);
        return (i(e), () => t.deleteBlocker(e));
      }, [t]),
      o.useEffect(() => {
        "" !== a && t.getBlocker(a, l);
      }, [t, a, l]),
      a && r.blockers.has(a) ? r.blockers.get(a) : he
    );
  }
  var xn = {};
  function Cn(e, t, n) {
    t || xn[e] || ((xn[e] = !0), m(!1, n));
  }
  function En(...e) {
    const t = sn("useRoute"),
      n = e[0] ?? t,
      r = cn("useRouteLoaderData");
    if (void 0 !== r.matches.find(({ route: e }) => e.id === n))
      return {
        loaderData: r.loaderData[n],
        actionData: r.actionData?.[n],
      };
  }
  var Sn = {};
  function An(e, t) {
    e || Sn[t] || ((Sn[t] = !0), console.warn(t));
  }
  function kn(e) {
    let t = {
      hasErrorBoundary: e.hasErrorBoundary || null != e.ErrorBoundary || null != e.errorElement,
    };
    return (
      e.Component &&
        (Tt &&
          e.element &&
          m(
            !1,
            "You should not include both `Component` and `element` on your route - `Component` will be used.",
          ),
        Object.assign(t, {
          element: o.createElement(e.Component),
          Component: void 0,
        })),
      e.HydrateFallback &&
        (Tt &&
          e.hydrateFallbackElement &&
          m(
            !1,
            "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used.",
          ),
        Object.assign(t, {
          hydrateFallbackElement: o.createElement(e.HydrateFallback),
          HydrateFallback: void 0,
        })),
      e.ErrorBoundary &&
        (Tt &&
          e.errorElement &&
          m(
            !1,
            "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used.",
          ),
        Object.assign(t, {
          errorElement: o.createElement(e.ErrorBoundary),
          ErrorBoundary: void 0,
        })),
      t
    );
  }
  var $n = ["HydrateFallback", "hydrateFallbackElement"];
  function zn(e, t) {
    return we({
      basename: t?.basename,
      getContext: t?.getContext,
      future: t?.future,
      history: s({
        initialEntries: t?.initialEntries,
        initialIndex: t?.initialIndex,
      }),
      hydrationData: t?.hydrationData,
      routes: e,
      hydrationRouteProperties: $n,
      mapRouteProperties: kn,
      dataStrategy: t?.dataStrategy,
      patchRoutesOnNavigation: t?.patchRoutesOnNavigation,
    }).initialize();
  }
  var Mn = class {
    constructor() {
      ((this.status = "pending"),
        (this.promise = new Promise((e, t) => {
          ((this.resolve = (t) => {
            "pending" === this.status && ((this.status = "resolved"), e(t));
          }),
            (this.reject = (e) => {
              "pending" === this.status && ((this.status = "rejected"), t(e));
            }));
        })));
    }
  };
  function On({ router: e, flushSync: t, unstable_onError: n }) {
    let r = o.useRef(new Map()),
      [a, i] = o.useTransition(),
      [l, c] = o.useState(e.state);
    e.__setPendingRerender = (e) =>
      i(async () => {
        const t = await e;
        i(() => {
          t();
        });
      });
    let s = o.useMemo(
        () => ({
          createHref: e.createHref,
          encodeLocation: e.encodeLocation,
          go: (t) => e.navigate(t),
          push: (t, n, r) =>
            e.navigate(t, {
              state: n,
              preventScrollReset: r?.preventScrollReset,
            }),
          replace: (t, n, r) =>
            e.navigate(t, {
              replace: !0,
              state: n,
              preventScrollReset: r?.preventScrollReset,
            }),
        }),
        [e],
      ),
      u = e.basename || "/",
      d = o.useMemo(
        () => ({
          router: e,
          navigator: s,
          static: !1,
          basename: u,
          unstable_onError: n,
        }),
        [e, s, u, n],
      );
    return (
      o.useLayoutEffect(
        () =>
          e.subscribe((e, { deletedFetchers: n, flushSync: a, viewTransitionOpts: i }) => {
            (e.fetchers.forEach((e, t) => {
              void 0 !== e.data && r.current.set(t, e.data);
            }),
              n.forEach((e) => r.current.delete(e)),
              (function (e, t) {
                if (e === t) return !1;
                let n = Object.keys(e),
                  r = Object.keys(t);
                if (n.length !== r.length) return !0;
                for (let r of n) if (e[r] !== t[r]) return !0;
                return !1;
              })(l, e) &&
                (a
                  ? t
                    ? t(() => c(e))
                    : c(e)
                  : o.startTransition(() => {
                      c(e);
                    })));
          }),
        [e, t, l],
      ),
      o.createElement(
        o.Fragment,
        null,
        o.createElement(
          $t.Provider,
          {
            value: d,
          },
          o.createElement(
            zt.Provider,
            {
              value: {
                ...l,
                revalidation: a ? "loading" : l.revalidation,
              },
            },
            o.createElement(
              Rt.Provider,
              {
                value: r.current,
              },
              o.createElement(
                jn,
                {
                  basename: u,
                  location: l.location,
                  navigationType: l.historyAction,
                  navigator: s,
                },
                o.createElement(Hn, {
                  routes: e.routes,
                  future: e.future,
                  state: l,
                  unstable_onError: n,
                }),
              ),
            ),
          ),
        ),
        null,
      )
    );
  }
  function Rn({ router: e, flushSync: t, unstable_onError: n }) {
    let [r, a] = o.useState(e.state),
      [i, l] = o.useState(),
      [c, s] = o.useState({
        isTransitioning: !1,
      }),
      [u, d] = o.useState(),
      [f, m] = o.useState(),
      [h, p] = o.useState(),
      v = o.useRef(new Map()),
      g = o.useCallback(
        (e) => {
          a(
            (t) => (
              e.errors &&
                n &&
                Object.entries(e.errors).forEach(([e, r]) => {
                  t.errors?.[e] !== r && n(r);
                }),
              e
            ),
          );
        },
        [n],
      ),
      b = o.useCallback(
        (n, { deletedFetchers: r, flushSync: a, viewTransitionOpts: i }) => {
          (n.fetchers.forEach((e, t) => {
            void 0 !== e.data && v.current.set(t, e.data);
          }),
            r.forEach((e) => v.current.delete(e)),
            An(
              !1 === a || null != t,
              'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.',
            ));
          let c =
            null != e.window &&
            null != e.window.document &&
            "function" == typeof e.window.document.startViewTransition;
          if (
            (An(
              null == i || c,
              "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available.",
            ),
            i && c)
          ) {
            if (t && a) {
              t(() => {
                (f && (u && u.resolve(), f.skipTransition()),
                  s({
                    isTransitioning: !0,
                    flushSync: !0,
                    currentLocation: i.currentLocation,
                    nextLocation: i.nextLocation,
                  }));
              });
              let r = e.window.document.startViewTransition(() => {
                t(() => g(n));
              });
              return (
                r.finished.finally(() => {
                  t(() => {
                    (d(void 0),
                      m(void 0),
                      l(void 0),
                      s({
                        isTransitioning: !1,
                      }));
                  });
                }),
                void t(() => m(r))
              );
            }
            f
              ? (u && u.resolve(),
                f.skipTransition(),
                p({
                  state: n,
                  currentLocation: i.currentLocation,
                  nextLocation: i.nextLocation,
                }))
              : (l(n),
                s({
                  isTransitioning: !0,
                  flushSync: !1,
                  currentLocation: i.currentLocation,
                  nextLocation: i.nextLocation,
                }));
          } else t && a ? t(() => g(n)) : o.startTransition(() => g(n));
        },
        [e.window, t, f, u, g],
      );
    (o.useLayoutEffect(() => e.subscribe(b), [e, b]),
      o.useEffect(() => {
        c.isTransitioning && !c.flushSync && d(new Mn());
      }, [c]),
      o.useEffect(() => {
        if (u && i && e.window) {
          let t = i,
            n = u.promise,
            r = e.window.document.startViewTransition(async () => {
              (o.startTransition(() => g(t)), await n);
            });
          (r.finished.finally(() => {
            (d(void 0),
              m(void 0),
              l(void 0),
              s({
                isTransitioning: !1,
              }));
          }),
            m(r));
        }
      }, [i, u, e.window, g]),
      o.useEffect(() => {
        u && i && r.location.key === i.location.key && u.resolve();
      }, [u, f, r.location, i]),
      o.useEffect(() => {
        !c.isTransitioning &&
          h &&
          (l(h.state),
          s({
            isTransitioning: !0,
            flushSync: !1,
            currentLocation: h.currentLocation,
            nextLocation: h.nextLocation,
          }),
          p(void 0));
      }, [c.isTransitioning, h]));
    let y = o.useMemo(
        () => ({
          createHref: e.createHref,
          encodeLocation: e.encodeLocation,
          go: (t) => e.navigate(t),
          push: (t, n, r) =>
            e.navigate(t, {
              state: n,
              preventScrollReset: r?.preventScrollReset,
            }),
          replace: (t, n, r) =>
            e.navigate(t, {
              replace: !0,
              state: n,
              preventScrollReset: r?.preventScrollReset,
            }),
        }),
        [e],
      ),
      w = e.basename || "/",
      x = o.useMemo(
        () => ({
          router: e,
          navigator: y,
          static: !1,
          basename: w,
          unstable_onError: n,
        }),
        [e, y, w, n],
      );
    return o.createElement(
      o.Fragment,
      null,
      o.createElement(
        $t.Provider,
        {
          value: x,
        },
        o.createElement(
          zt.Provider,
          {
            value: r,
          },
          o.createElement(
            Rt.Provider,
            {
              value: v.current,
            },
            o.createElement(
              Ot.Provider,
              {
                value: c,
              },
              o.createElement(
                jn,
                {
                  basename: w,
                  location: r.location,
                  navigationType: r.historyAction,
                  navigator: y,
                },
                o.createElement(Hn, {
                  routes: e.routes,
                  future: e.future,
                  state: r,
                  unstable_onError: n,
                }),
              ),
            ),
          ),
        ),
      ),
      null,
    );
  }
  var Hn = o.memo(function ({ routes: e, future: t, state: n, unstable_onError: r }) {
    return Jt(e, void 0, n, r, t);
  });
  function In({ basename: e, children: t, initialEntries: n, initialIndex: r }) {
    let a = o.useRef();
    null == a.current &&
      (a.current = s({
        initialEntries: n,
        initialIndex: r,
        v5Compat: !0,
      }));
    let i = a.current,
      [l, c] = o.useState({
        action: i.action,
        location: i.location,
      }),
      u = o.useCallback(
        (e) => {
          o.startTransition(() => c(e));
        },
        [c],
      );
    return (
      o.useLayoutEffect(() => i.listen(u), [i, u]),
      o.createElement(jn, {
        basename: e,
        children: t,
        location: l.location,
        navigationType: l.action,
        navigator: i,
      })
    );
  }
  function Nn({ to: e, replace: t, state: n, relative: r }) {
    f(Vt(), "<Navigate> may be used only in the context of a <Router> component.");
    let { static: a } = o.useContext(Nt);
    m(
      !a,
      "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.",
    );
    let { matches: i } = o.useContext(Pt),
      { pathname: l } = Dt(),
      c = Kt(),
      s = X(e, U(i), l, "path" === r),
      u = JSON.stringify(s);
    return (
      o.useEffect(() => {
        c(JSON.parse(u), {
          replace: t,
          state: n,
          relative: r,
        });
      }, [c, u, r, t, n]),
      null
    );
  }
  function Ln(e) {
    return Gt(e.context);
  }
  function Pn(e) {
    f(
      !1,
      "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
    );
  }
  function jn({
    basename: e = "/",
    children: t = null,
    location: n,
    navigationType: r = "POP",
    navigator: a,
    static: i = !1,
  }) {
    f(
      !Vt(),
      "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
    );
    let l = e.replace(/^\/*/, "/"),
      c = o.useMemo(
        () => ({
          basename: l,
          navigator: a,
          static: i,
          future: {},
        }),
        [l, a, i],
      );
    "string" == typeof n && (n = g(n));
    let {
        pathname: s = "/",
        search: u = "",
        hash: d = "",
        state: h = null,
        key: p = "default",
      } = n,
      v = o.useMemo(() => {
        let e = _(s, l);
        return null == e
          ? null
          : {
              location: {
                pathname: e,
                search: u,
                hash: d,
                state: h,
                key: p,
              },
              navigationType: r,
            };
      }, [l, s, u, d, h, p, r]);
    return (
      m(
        null != v,
        `<Router basename="${l}"> is not able to match the URL "${s}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`,
      ),
      null == v
        ? null
        : o.createElement(
            Nt.Provider,
            {
              value: c,
            },
            o.createElement(Lt.Provider, {
              children: t,
              value: v,
            }),
          )
    );
  }
  function Tn({ children: e, location: t }) {
    return Zt(Fn(e), t);
  }
  function Bn({ children: e, errorElement: t, resolve: n }) {
    let r = o.useContext($t);
    return o.createElement(
      Vn,
      {
        resolve: n,
        errorElement: t,
        unstable_onError: r?.unstable_onError,
      },
      o.createElement(Dn, null, e),
    );
  }
  var Vn = class extends o.Component {
    constructor(e) {
      (super(e),
        (this.state = {
          error: null,
        }));
    }
    static getDerivedStateFromError(e) {
      return {
        error: e,
      };
    }
    componentDidCatch(e, t) {
      this.props.unstable_onError
        ? this.props.unstable_onError(e, t)
        : console.error("<Await> caught the following error during render", e, t);
    }
    render() {
      let { children: e, errorElement: t, resolve: n } = this.props,
        r = null,
        a = 0;
      if (n instanceof Promise) {
        if (this.state.error) {
          a = 2;
          let e = this.state.error;
          ((r = Promise.reject().catch(() => {})),
            Object.defineProperty(r, "_tracked", {
              get: () => !0,
            }),
            Object.defineProperty(r, "_error", {
              get: () => e,
            }));
        } else
          n._tracked
            ? ((r = n), (a = "_error" in r ? 2 : "_data" in r ? 1 : 0))
            : ((a = 0),
              Object.defineProperty(n, "_tracked", {
                get: () => !0,
              }),
              (r = n.then(
                (e) =>
                  Object.defineProperty(n, "_data", {
                    get: () => e,
                  }),
                (e) => {
                  (this.props.unstable_onError?.(e),
                    Object.defineProperty(n, "_error", {
                      get: () => e,
                    }));
                },
              )));
      } else
        ((a = 1),
          (r = Promise.resolve()),
          Object.defineProperty(r, "_tracked", {
            get: () => !0,
          }),
          Object.defineProperty(r, "_data", {
            get: () => n,
          }));
      if (2 === a && !t) throw r._error;
      if (2 === a)
        return o.createElement(Ht.Provider, {
          value: r,
          children: t,
        });
      if (1 === a)
        return o.createElement(Ht.Provider, {
          value: r,
          children: e,
        });
      throw r;
    }
  };
  function Dn({ children: e }) {
    let t = gn(),
      n = "function" == typeof e ? e(t) : e;
    return o.createElement(o.Fragment, null, n);
  }
  function Fn(e, t = []) {
    let n = [];
    return (
      o.Children.forEach(e, (e, r) => {
        if (!o.isValidElement(e)) return;
        let a = [...t, r];
        if (e.type === o.Fragment) return void n.push.apply(n, Fn(e.props.children, a));
        (f(
          e.type === Pn,
          `[${"string" == typeof e.type ? e.type : e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
        ),
          f(!e.props.index || !e.props.children, "An index route cannot have child routes."));
        let i = {
          id: e.props.id || a.join("-"),
          caseSensitive: e.props.caseSensitive,
          element: e.props.element,
          Component: e.props.Component,
          index: e.props.index,
          path: e.props.path,
          middleware: e.props.middleware,
          loader: e.props.loader,
          action: e.props.action,
          hydrateFallbackElement: e.props.hydrateFallbackElement,
          HydrateFallback: e.props.HydrateFallback,
          errorElement: e.props.errorElement,
          ErrorBoundary: e.props.ErrorBoundary,
          hasErrorBoundary:
            !0 === e.props.hasErrorBoundary ||
            null != e.props.ErrorBoundary ||
            null != e.props.errorElement,
          shouldRevalidate: e.props.shouldRevalidate,
          handle: e.props.handle,
          lazy: e.props.lazy,
        };
        (e.props.children && (i.children = Fn(e.props.children, a)), n.push(i));
      }),
      n
    );
  }
  var _n = Fn;
  function Wn(e) {
    return on(e);
  }
  function qn() {
    return {
      params: Yt(),
      loaderData: mn(),
      actionData: pn(),
      matches: fn(),
    };
  }
  function Kn({ children: e }) {
    const t = qn();
    return o.cloneElement(e, t);
  }
  function Un(e) {
    return function () {
      const t = qn();
      return o.createElement(e, t);
    };
  }
  function Xn() {
    return {
      params: Yt(),
      loaderData: mn(),
      actionData: pn(),
    };
  }
  function Gn({ children: e }) {
    const t = Xn();
    return o.cloneElement(e, t);
  }
  function Yn(e) {
    return function () {
      const t = Xn();
      return o.createElement(e, t);
    };
  }
  function Qn() {
    return {
      params: Yt(),
      loaderData: mn(),
      actionData: pn(),
      error: vn(),
    };
  }
  function Zn({ children: e }) {
    const t = Qn();
    return o.cloneElement(e, t);
  }
  function Jn(e) {
    return function () {
      const t = Qn();
      return o.createElement(e, t);
    };
  }
  var er = "get",
    tr = "application/x-www-form-urlencoded";
  function nr(e) {
    return null != e && "string" == typeof e.tagName;
  }
  function rr(e = "") {
    return new URLSearchParams(
      "string" == typeof e || Array.isArray(e) || e instanceof URLSearchParams
        ? e
        : Object.keys(e).reduce((t, n) => {
            let r = e[n];
            return t.concat(Array.isArray(r) ? r.map((e) => [n, e]) : [[n, r]]);
          }, []),
    );
  }
  var or = null,
    ar = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
  function ir(e) {
    return null == e || ar.has(e)
      ? e
      : (m(
          !1,
          `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${tr}"`,
        ),
        null);
  }
  var lr = -1,
    cr = -2,
    sr = -3,
    ur = -4,
    dr = -5,
    fr = -6,
    mr = -7,
    hr = "B",
    pr = "D",
    vr = "E",
    gr = "M",
    br = "N",
    yr = "P",
    wr = "R",
    xr = "S",
    Cr = "Y",
    Er = "U",
    Sr = "Z",
    Ar = class {
      constructor() {
        this.promise = new Promise((e, t) => {
          ((this.resolve = e), (this.reject = t));
        });
      }
    };
  function kr(e) {
    const { indices: t } = this,
      n = t.get(e);
    if (n) return [n];
    if (void 0 === e) return mr;
    if (null === e) return dr;
    if (Number.isNaN(e)) return cr;
    if (e === Number.POSITIVE_INFINITY) return fr;
    if (e === Number.NEGATIVE_INFINITY) return sr;
    if (0 === e && 1 / e < 0) return ur;
    const r = this.index++;
    return (t.set(e, r), $r.call(this, e, r), r);
  }
  function $r(e, t) {
    const { deferred: n, plugins: r, postPlugins: o } = this,
      a = this.stringified,
      i = [[e, t]];
    for (; i.length > 0;) {
      const [e, t] = i.pop(),
        l = (e) =>
          Object.keys(e)
            .map((t) => `"_${kr.call(this, t)}":${kr.call(this, e[t])}`)
            .join(",");
      let c = null;
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
          a[t] = JSON.stringify(e);
          break;
        case "bigint":
          a[t] = `["${hr}","${e}"]`;
          break;
        case "symbol": {
          const n = Symbol.keyFor(e);
          n
            ? (a[t] = `["${Cr}",${JSON.stringify(n)}]`)
            : (c = new Error("Cannot encode symbol unless created with Symbol.for()"));
          break;
        }
        case "object": {
          if (!e) {
            a[t] = `${dr}`;
            break;
          }
          const o = Array.isArray(e);
          let i = !1;
          if (!o && r)
            for (const n of r) {
              const r = n(e);
              if (Array.isArray(r)) {
                i = !0;
                const [e, ...n] = r;
                ((a[t] = `[${JSON.stringify(e)}`),
                  n.length > 0 && (a[t] += `,${n.map((e) => kr.call(this, e)).join(",")}`),
                  (a[t] += "]"));
                break;
              }
            }
          if (!i) {
            let r = o ? "[" : "{";
            if (o) {
              for (let t = 0; t < e.length; t++)
                r += (t ? "," : "") + (t in e ? kr.call(this, e[t]) : lr);
              a[t] = `${r}]`;
            } else if (e instanceof Date) {
              const n = e.getTime();
              a[t] = `["${pr}",${Number.isNaN(n) ? JSON.stringify("invalid") : n}]`;
            } else
              e instanceof URL
                ? (a[t] = `["${Er}",${JSON.stringify(e.href)}]`)
                : e instanceof RegExp
                  ? (a[t] = `["${wr}",${JSON.stringify(e.source)},${JSON.stringify(e.flags)}]`)
                  : e instanceof Set
                    ? e.size > 0
                      ? (a[t] = `["${xr}",${[...e].map((e) => kr.call(this, e)).join(",")}]`)
                      : (a[t] = `["${xr}"]`)
                    : e instanceof Map
                      ? e.size > 0
                        ? (a[t] =
                            `["${gr}",${[...e].flatMap(([e, t]) => [kr.call(this, e), kr.call(this, t)]).join(",")}]`)
                        : (a[t] = `["${gr}"]`)
                      : e instanceof Promise
                        ? ((a[t] = `["${yr}",${t}]`), (n[t] = e))
                        : e instanceof Error
                          ? ((a[t] = `["${vr}",${JSON.stringify(e.message)}`),
                            "Error" !== e.name && (a[t] += `,${JSON.stringify(e.name)}`),
                            (a[t] += "]"))
                          : null === Object.getPrototypeOf(e)
                            ? (a[t] = `["${br}",{${l(e)}}]`)
                            : Mr(e)
                              ? (a[t] = `{${l(e)}}`)
                              : (c = new Error("Cannot encode object with prototype"));
          }
          break;
        }
        default: {
          let n = !1;
          if (!Array.isArray(e) && r)
            for (const o of r) {
              const r = o(e);
              if (Array.isArray(r)) {
                n = !0;
                const [e, ...o] = r;
                ((a[t] = `[${JSON.stringify(e)}`),
                  o.length > 0 && (a[t] += `,${o.map((e) => kr.call(this, e)).join(",")}`),
                  (a[t] += "]"));
                break;
              }
            }
          n || (c = new Error("Cannot encode function or unexpected type"));
        }
      }
      if (c) {
        let n = !1;
        if (o)
          for (const r of o) {
            const o = r(e);
            if (Array.isArray(o)) {
              n = !0;
              const [e, ...r] = o;
              ((a[t] = `[${JSON.stringify(e)}`),
                r.length > 0 && (a[t] += `,${r.map((e) => kr.call(this, e)).join(",")}`),
                (a[t] += "]"));
              break;
            }
          }
        if (!n) throw c;
      }
    }
  }
  var zr = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
  function Mr(e) {
    const t = Object.getPrototypeOf(e);
    return (
      t === Object.prototype || null === t || Object.getOwnPropertyNames(t).sort().join("\0") === zr
    );
  }
  var Or =
    "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : void 0;
  function Rr(e) {
    const { hydrated: t, values: n } = this;
    if ("number" == typeof e) return Hr.call(this, e);
    if (!Array.isArray(e) || !e.length) throw new SyntaxError();
    const r = n.length;
    for (const t of e) n.push(t);
    return ((t.length = n.length), Hr.call(this, r));
  }
  function Hr(e) {
    const { hydrated: t, values: n, deferred: r, plugins: o } = this;
    let a;
    const i = [
      [
        e,
        (e) => {
          a = e;
        },
      ],
    ];
    let l = [];
    for (; i.length > 0;) {
      const [e, a] = i.pop();
      switch (e) {
        case mr:
          a(void 0);
          continue;
        case dr:
          a(null);
          continue;
        case cr:
          a(NaN);
          continue;
        case fr:
          a(1 / 0);
          continue;
        case sr:
          a(-1 / 0);
          continue;
        case ur:
          a(-0);
          continue;
      }
      if (t[e]) {
        a(t[e]);
        continue;
      }
      const c = n[e];
      if (c && "object" == typeof c) {
        if (Array.isArray(c)) {
          if ("string" == typeof c[0]) {
            const [n, s, u] = c;
            switch (n) {
              case pr:
                a((t[e] = new Date(s)));
                continue;
              case Er:
                a((t[e] = new URL(s)));
                continue;
              case hr:
                a((t[e] = BigInt(s)));
                continue;
              case wr:
                a((t[e] = new RegExp(s, u)));
                continue;
              case Cr:
                a((t[e] = Symbol.for(s)));
                continue;
              case xr:
                const n = new Set();
                t[e] = n;
                for (let e = c.length - 1; e > 0; e--)
                  i.push([
                    c[e],
                    (e) => {
                      n.add(e);
                    },
                  ]);
                a(n);
                continue;
              case gr:
                const d = new Map();
                t[e] = d;
                for (let e = c.length - 2; e > 0; e -= 2) {
                  const t = [];
                  (i.push([
                    c[e + 1],
                    (e) => {
                      t[1] = e;
                    },
                  ]),
                    i.push([
                      c[e],
                      (e) => {
                        t[0] = e;
                      },
                    ]),
                    l.push(() => {
                      d.set(t[0], t[1]);
                    }));
                }
                a(d);
                continue;
              case br:
                const f = Object.create(null);
                t[e] = f;
                for (const e of Object.keys(s).reverse()) {
                  const t = [];
                  (i.push([
                    s[e],
                    (e) => {
                      t[1] = e;
                    },
                  ]),
                    i.push([
                      Number(e.slice(1)),
                      (e) => {
                        t[0] = e;
                      },
                    ]),
                    l.push(() => {
                      f[t[0]] = t[1];
                    }));
                }
                a(f);
                continue;
              case yr:
                if (t[s]) a((t[e] = t[s]));
                else {
                  const n = new Ar();
                  ((r[s] = n), a((t[e] = n.promise)));
                }
                continue;
              case vr:
                const [, m, h] = c;
                let p = h && Or && Or[h] ? new Or[h](m) : new Error(m);
                ((t[e] = p), a(p));
                continue;
              case Sr:
                a((t[e] = t[s]));
                continue;
              default:
                if (Array.isArray(o)) {
                  const n = [],
                    r = c.slice(1);
                  for (let e = 0; e < r.length; e++) {
                    const t = r[e];
                    i.push([
                      t,
                      (t) => {
                        n[e] = t;
                      },
                    ]);
                  }
                  l.push(() => {
                    for (const r of o) {
                      const o = r(c[0], ...n);
                      if (o) return void a((t[e] = o.value));
                    }
                    throw new SyntaxError();
                  });
                  continue;
                }
                throw new SyntaxError();
            }
          } else {
            const n = [];
            t[e] = n;
            for (let e = 0; e < c.length; e++) {
              const t = c[e];
              t !== lr &&
                i.push([
                  t,
                  (t) => {
                    n[e] = t;
                  },
                ]);
            }
            a(n);
          }
        } else {
          const n = {};
          t[e] = n;
          for (const e of Object.keys(c).reverse()) {
            const t = [];
            (i.push([
              c[e],
              (e) => {
                t[1] = e;
              },
            ]),
              i.push([
                Number(e.slice(1)),
                (e) => {
                  t[0] = e;
                },
              ]),
              l.push(() => {
                n[t[0]] = t[1];
              }));
          }
          a(n);
        }
      } else ((t[e] = c), a(c));
    }
    for (; l.length > 0;) l.pop()();
    return a;
  }
  async function Ir(e, t) {
    const { plugins: n } = t ?? {},
      r = new Ar(),
      o = e
        .pipeThrough(
          (function () {
            const e = new TextDecoder();
            let t = "";
            return new TransformStream({
              transform(n, r) {
                const o = e.decode(n, {
                    stream: !0,
                  }),
                  a = (t + o).split("\n");
                t = a.pop() || "";
                for (const e of a) r.enqueue(e);
              },
              flush(e) {
                t && e.enqueue(t);
              },
            });
          })(),
        )
        .getReader(),
      a = {
        values: [],
        hydrated: [],
        deferred: {},
        plugins: n,
      },
      i = await Nr.call(a, o);
    let l = r.promise;
    return (
      i.done
        ? r.resolve()
        : (l = Lr.call(a, o)
            .then(r.resolve)
            .catch((e) => {
              for (const t of Object.values(a.deferred)) t.reject(e);
              r.reject(e);
            })),
      {
        done: l.then(() => o.closed),
        value: i.value,
      }
    );
  }
  async function Nr(e) {
    const t = await e.read();
    if (!t.value) throw new SyntaxError();
    let n;
    try {
      n = JSON.parse(t.value);
    } catch (e) {
      throw new SyntaxError();
    }
    return {
      done: t.done,
      value: Rr.call(this, n),
    };
  }
  async function Lr(e) {
    let t = await e.read();
    for (; !t.done;) {
      if (!t.value) continue;
      const n = t.value;
      switch (n[0]) {
        case yr: {
          const e = n.indexOf(":"),
            t = Number(n.slice(1, e)),
            r = this.deferred[t];
          if (!r) throw new Error(`Deferred ID ${t} not found in stream`);
          const o = n.slice(e + 1);
          let a;
          try {
            a = JSON.parse(o);
          } catch (e) {
            throw new SyntaxError();
          }
          const i = Rr.call(this, a);
          r.resolve(i);
          break;
        }
        case vr: {
          const e = n.indexOf(":"),
            t = Number(n.slice(1, e)),
            r = this.deferred[t];
          if (!r) throw new Error(`Deferred ID ${t} not found in stream`);
          const o = n.slice(e + 1);
          let a;
          try {
            a = JSON.parse(o);
          } catch (e) {
            throw new SyntaxError();
          }
          const i = Rr.call(this, a);
          r.reject(i);
          break;
        }
        default:
          throw new SyntaxError();
      }
      t = await e.read();
    }
  }
  function Pr(e, t) {
    const { plugins: n, postPlugins: r, signal: o } = t ?? {},
      a = {
        deferred: {},
        index: 0,
        indices: new Map(),
        stringified: [],
        plugins: n,
        postPlugins: r,
        signal: o,
      },
      i = new TextEncoder();
    let l = 0;
    return new ReadableStream({
      async start(t) {
        const n = kr.call(a, e);
        if (Array.isArray(n)) throw new Error("This should never happen");
        n < 0
          ? t.enqueue(i.encode(`${n}\n`))
          : (t.enqueue(i.encode(`[${a.stringified.join(",")}]\n`)), (l = a.stringified.length - 1));
        const r = new WeakSet();
        if (Object.keys(a.deferred).length) {
          let e;
          const n = new Promise((t, n) => {
            if (((e = t), o)) {
              const e = () => n(o.reason || new Error("Signal was aborted."));
              o.aborted
                ? e()
                : o.addEventListener("abort", (t) => {
                    e();
                  });
            }
          });
          for (; Object.keys(a.deferred).length > 0;) {
            for (const [e, o] of Object.entries(a.deferred))
              r.has(o) ||
                r.add(
                  (a.deferred[Number(e)] = Promise.race([n, o])
                    .then(
                      (n) => {
                        const r = kr.call(a, n);
                        if (Array.isArray(r))
                          (t.enqueue(i.encode(`${yr}${e}:[["${Sr}",${r[0]}]]\n`)), a.index++, l++);
                        else if (r < 0) t.enqueue(i.encode(`${yr}${e}:${r}\n`));
                        else {
                          const n = a.stringified.slice(l + 1).join(",");
                          (t.enqueue(i.encode(`${yr}${e}:[${n}]\n`)),
                            (l = a.stringified.length - 1));
                        }
                      },
                      (n) => {
                        (n && "object" == typeof n && n instanceof Error) ||
                          (n = new Error("An unknown error occurred"));
                        const r = kr.call(a, n);
                        if (Array.isArray(r))
                          (t.enqueue(i.encode(`${vr}${e}:[["${Sr}",${r[0]}]]\n`)), a.index++, l++);
                        else if (r < 0) t.enqueue(i.encode(`${vr}${e}:${r}\n`));
                        else {
                          const n = a.stringified.slice(l + 1).join(",");
                          (t.enqueue(i.encode(`${vr}${e}:[${n}]\n`)),
                            (l = a.stringified.length - 1));
                        }
                      },
                    )
                    .finally(() => {
                      delete a.deferred[Number(e)];
                    })),
                );
            await Promise.race(Object.values(a.deferred));
          }
          e();
        }
        (await Promise.all(Object.values(a.deferred)), t.close());
      },
    });
  }
  async function jr(e) {
    let t = {
      signal: e.signal,
    };
    if ("GET" !== e.method) {
      t.method = e.method;
      let n = e.headers.get("Content-Type");
      n && /\bapplication\/json\b/.test(n)
        ? ((t.headers = {
            "Content-Type": n,
          }),
          (t.body = JSON.stringify(await e.json())))
        : n && /\btext\/plain\b/.test(n)
          ? ((t.headers = {
              "Content-Type": n,
            }),
            (t.body = await e.text()))
          : n && /\bapplication\/x-www-form-urlencoded\b/.test(n)
            ? (t.body = new URLSearchParams(await e.text()))
            : (t.body = await e.formData());
    }
    return t;
  }
  var Tr = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029",
    },
    Br = /[&><\u2028\u2029]/g;
  function Vr(e) {
    return e.replace(Br, (e) => Tr[e]);
  }
  function Dr(e, t) {
    if (!1 === e || null == e) throw new Error(t);
  }
  var Fr,
    _r = Symbol("SingleFetchRedirect"),
    Wr = class extends Error {},
    qr = 202,
    Kr = new Set([100, 101, 204, 205]);
  function Ur({ context: e, identifier: t, reader: n, textDecoder: r, nonce: a }) {
    if (!e.renderMeta || !e.renderMeta.didRenderScripts) return null;
    e.renderMeta.streamCache || (e.renderMeta.streamCache = {});
    let { streamCache: i } = e.renderMeta,
      l = i[t];
    if (
      (l ||
        (l = i[t] =
          n
            .read()
            .then((e) => {
              i[t].result = {
                done: e.done,
                value: r.decode(e.value, {
                  stream: !0,
                }),
              };
            })
            .catch((e) => {
              i[t].error = e;
            })),
      l.error)
    )
      throw l.error;
    if (void 0 === l.result) throw l;
    let { done: c, value: s } = l.result,
      u = s
        ? o.createElement("script", {
            nonce: a,
            dangerouslySetInnerHTML: {
              __html: `window.__reactRouterContext.streamController.enqueue(${Vr(JSON.stringify(s))});`,
            },
          })
        : null;
    return c
      ? o.createElement(
          o.Fragment,
          null,
          u,
          o.createElement("script", {
            nonce: a,
            dangerouslySetInnerHTML: {
              __html: "window.__reactRouterContext.streamController.close();",
            },
          }),
        )
      : o.createElement(
          o.Fragment,
          null,
          u,
          o.createElement(
            o.Suspense,
            null,
            o.createElement(Ur, {
              context: e,
              identifier: t + 1,
              reader: n,
              textDecoder: r,
              nonce: a,
            }),
          ),
        );
  }
  function Xr(e, t, n, r, o) {
    let a = Gr(
      e,
      (e) => {
        let r = t.routes[e.route.id];
        Dr(r, "Route not found in manifest");
        let o = n[e.route.id];
        return {
          hasLoader: r.hasLoader,
          hasClientLoader: r.hasClientLoader,
          hasShouldRevalidate: Boolean(o?.shouldRevalidate),
        };
      },
      Zr,
      r,
      o,
    );
    return async (e) => e.runClientMiddleware(a);
  }
  function Gr(e, t, n, r, o, a = () => !0) {
    return async (i) => {
      let { request: l, matches: c, fetcherKey: s } = i,
        u = e();
      if ("GET" !== l.method)
        return (async function (e, t, n) {
          let r = e.matches.find((e) => e.unstable_shouldCallHandler());
          Dr(r, "No action match found");
          let o,
            a = await r.resolve(
              async (a) =>
                await a(async () => {
                  let { data: a, status: i } = await t(e, n, [r.route.id]);
                  return ((o = i), eo(a, r.route.id));
                }),
            );
          return vt(a.result) || ae(a.result) || pt(a.result)
            ? {
                [r.route.id]: a,
              }
            : {
                [r.route.id]: {
                  type: a.type,
                  result: ee(a.result, o),
                },
              };
        })(i, n, o);
      let d = c.some((e) => {
        let { hasLoader: n, hasClientLoader: r } = t(e);
        return e.unstable_shouldCallHandler() && n && !r;
      });
      return r || d
        ? s
          ? (async function (e, t, n) {
              let r = e.matches.find((e) => e.unstable_shouldCallHandler());
              Dr(r, "No fetcher match found");
              let o = r.route.id,
                a = await r.resolve(async (r) =>
                  r(async () => {
                    let { data: r } = await t(e, n, [o]);
                    return eo(r, o);
                  }),
                );
              return {
                [r.route.id]: a,
              };
            })(i, n, o)
          : (async function (e, t, n, r, o, a, i = () => !0) {
              let l = new Set(),
                c = !1,
                s = e.matches.map(() => to()),
                u = to(),
                d = {},
                f = Promise.all(
                  e.matches.map(async (t, o) =>
                    t.resolve(async (f) => {
                      s[o].resolve();
                      let m = t.route.id,
                        { hasLoader: h, hasClientLoader: p, hasShouldRevalidate: v } = n(t),
                        g =
                          !t.unstable_shouldRevalidateArgs ||
                          null == t.unstable_shouldRevalidateArgs.actionStatus ||
                          t.unstable_shouldRevalidateArgs.actionStatus < 400;
                      if (t.unstable_shouldCallHandler(g)) {
                        if (i(t) && p) {
                          h && (c = !0);
                          try {
                            let t = await f(async () => {
                              let { data: t } = await r(e, a, [m]);
                              return eo(t, m);
                            });
                            d[m] = {
                              type: "data",
                              result: t,
                            };
                          } catch (e) {
                            d[m] = {
                              type: "error",
                              result: e,
                            };
                          }
                        } else {
                          h && l.add(m);
                          try {
                            let e = await f(async () => eo(await u.promise, m));
                            d[m] = {
                              type: "data",
                              result: e,
                            };
                          } catch (e) {
                            d[m] = {
                              type: "error",
                              result: e,
                            };
                          }
                        }
                      } else c || (c = null != t.unstable_shouldRevalidateArgs && h && !0 === v);
                    }),
                  ),
                );
              if (
                (await Promise.all(s.map((e) => e.promise)),
                (!(!t.state.initialized && "idle" === t.state.navigation.state) && 0 !== l.size) ||
                  window.__reactRouterHdrActive)
              ) {
                let t = o && c && l.size > 0 ? [...l.keys()] : void 0;
                try {
                  let n = await r(e, a, t);
                  u.resolve(n.data);
                } catch (e) {
                  u.reject(e);
                }
              } else
                u.resolve({
                  routes: {},
                });
              return (
                await f,
                await (async function (e, t, n, r) {
                  try {
                    let o,
                      a = await e;
                    if ("routes" in a)
                      for (let e of t)
                        if (e.route.id in a.routes) {
                          let t = a.routes[e.route.id];
                          if ("error" in t) {
                            ((o = t.error),
                              null == r[e.route.id]?.result &&
                                (r[e.route.id] = {
                                  type: "error",
                                  result: o,
                                }));
                            break;
                          }
                        }
                    void 0 !== o &&
                      Array.from(n.values()).forEach((e) => {
                        r[e].result instanceof Wr && (r[e].result = o);
                      });
                  } catch (e) {}
                })(u.promise, e.matches, l, d),
                d
              );
            })(i, u, t, n, r, o, a)
        : (async function (e, t, n, r) {
            let o = e.matches.filter((e) => e.unstable_shouldCallHandler()),
              a = {};
            return (
              await Promise.all(
                o.map((o) =>
                  o.resolve(async (i) => {
                    try {
                      let { hasClientLoader: l } = t(o),
                        c = o.route.id,
                        s = l
                          ? await i(async () => {
                              let { data: t } = await n(e, r, [c]);
                              return eo(t, c);
                            })
                          : await i();
                      a[o.route.id] = {
                        type: "data",
                        result: s,
                      };
                    } catch (e) {
                      a[o.route.id] = {
                        type: "error",
                        result: e,
                      };
                    }
                  }),
                ),
              ),
              a
            );
          })(i, t, n, o);
    };
  }
  function Yr(e) {
    let t = e.searchParams.getAll("index");
    e.searchParams.delete("index");
    let n = [];
    for (let e of t) e && n.push(e);
    for (let t of n) e.searchParams.append("index", t);
    return e;
  }
  function Qr(e, t, n) {
    let r =
      "string" == typeof e
        ? new URL(
            e,
            "undefined" == typeof window ? "server://singlefetch/" : window.location.origin,
          )
        : e;
    return (
      "/" === r.pathname
        ? (r.pathname = `_root.${n}`)
        : t && "/" === _(r.pathname, t)
          ? (r.pathname = `${t.replace(/\/$/, "")}/_root.${n}`)
          : (r.pathname = `${r.pathname.replace(/\/$/, "")}.${n}`),
      r
    );
  }
  async function Zr(e, t, n) {
    let { request: r } = e,
      o = Qr(r.url, t, "data");
    "GET" === r.method && ((o = Yr(o)), n && o.searchParams.set("_routes", n.join(",")));
    let a = await fetch(o, await jr(r));
    if (a.status >= 400 && !a.headers.has("X-Remix-Response"))
      throw new oe(a.status, a.statusText, await a.text());
    if (204 === a.status && a.headers.has("X-Remix-Redirect"))
      return {
        status: qr,
        data: {
          redirect: {
            redirect: a.headers.get("X-Remix-Redirect"),
            status: Number(a.headers.get("X-Remix-Status") || "302"),
            revalidate: "true" === a.headers.get("X-Remix-Revalidate"),
            reload: "true" === a.headers.get("X-Remix-Reload-Document"),
            replace: "true" === a.headers.get("X-Remix-Replace"),
          },
        },
      };
    if (Kr.has(a.status)) {
      let e = {};
      return (
        n &&
          "GET" !== r.method &&
          (e[n[0]] = {
            data: void 0,
          }),
        {
          status: a.status,
          data: {
            routes: e,
          },
        }
      );
    }
    Dr(a.body, "No response body to decode");
    try {
      let e,
        t = await Jr(a.body, window);
      if ("GET" === r.method) {
        let n = t.value;
        e =
          _r in n
            ? {
                redirect: n[_r],
              }
            : {
                routes: n,
              };
      } else {
        let r = t.value,
          o = n?.[0];
        (Dr(o, "No routeId found for single fetch call decoding"),
          (e =
            "redirect" in r
              ? {
                  redirect: r,
                }
              : {
                  routes: {
                    [o]: r,
                  },
                }));
      }
      return {
        status: a.status,
        data: e,
      };
    } catch (e) {
      throw new Error("Unable to decode turbo-stream response");
    }
  }
  function Jr(e, t) {
    return Ir(e, {
      plugins: [
        (e, ...n) => {
          if ("SanitizedError" === e) {
            let [e, r, o] = n,
              a = Error;
            e && e in t && "function" == typeof t[e] && (a = t[e]);
            let i = new a(r);
            return (
              (i.stack = o),
              {
                value: i,
              }
            );
          }
          if ("ErrorResponse" === e) {
            let [e, t, r] = n;
            return {
              value: new oe(t, r, e),
            };
          }
          return "SingleFetchRedirect" === e
            ? {
                value: {
                  [_r]: n[0],
                },
              }
            : "SingleFetchClassInstance" === e
              ? {
                  value: n[0],
                }
              : "SingleFetchFallback" === e
                ? {
                    value: void 0,
                  }
                : void 0;
        },
      ],
    });
  }
  function eo(e, t) {
    if ("redirect" in e) {
      let { redirect: t, revalidate: n, reload: r, replace: o, status: a } = e.redirect;
      throw te(t, {
        status: a,
        headers: {
          ...(n
            ? {
                "X-Remix-Revalidate": "yes",
              }
            : null),
          ...(r
            ? {
                "X-Remix-Reload-Document": "yes",
              }
            : null),
          ...(o
            ? {
                "X-Remix-Replace": "yes",
              }
            : null),
        },
      });
    }
    let n = e.routes[t];
    if (null == n) throw new Wr(`No result found for routeId "${t}"`);
    if ("error" in n) throw n.error;
    if ("data" in n) return n.data;
    throw new Error(`Invalid response found for routeId "${t}"`);
  }
  function to() {
    let e,
      t,
      n = new Promise((r, o) => {
        ((e = async (e) => {
          r(e);
          try {
            await n;
          } catch (e) {}
        }),
          (t = async (e) => {
            o(e);
            try {
              await n;
            } catch (e) {}
          }));
      });
    return {
      promise: n,
      resolve: e,
      reject: t,
    };
  }
  async function no(e, t) {
    if (e.id in t) return t[e.id];
    try {
      let n = await import(e.module);
      return ((t[e.id] = n), n);
    } catch (t) {
      return (
        console.error(`Error loading route module \`${e.module}\`, reloading page...`),
        console.error(t),
        window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
        window.location.reload(),
        new Promise(() => {})
      );
    }
  }
  function ro(e) {
    return e.css
      ? e.css.map((e) => ({
          rel: "stylesheet",
          href: e,
        }))
      : [];
  }
  async function oo(e, t) {
    if (
      (!e.css && !t.links) ||
      !(function () {
        if (void 0 !== Fr) return Fr;
        let e = document.createElement("link");
        return ((Fr = e.relList.supports("preload")), (e = null), Fr);
      })()
    )
      return;
    let n = [];
    if ((e.css && n.push(...ro(e)), t.links && n.push(...t.links()), 0 === n.length)) return;
    let r = [];
    for (let e of n)
      io(e) ||
        "stylesheet" !== e.rel ||
        r.push({
          ...e,
          rel: "preload",
          as: "style",
        });
    await Promise.all(r.map(ao));
  }
  async function ao(e) {
    return new Promise((t) => {
      if (
        (e.media && !window.matchMedia(e.media).matches) ||
        document.querySelector(`link[rel="stylesheet"][href="${e.href}"]`)
      )
        return t();
      let n = document.createElement("link");
      function r() {
        document.head.contains(n) && document.head.removeChild(n);
      }
      (Object.assign(n, e),
        (n.onload = () => {
          (r(), t());
        }),
        (n.onerror = () => {
          (r(), t());
        }),
        document.head.appendChild(n));
    });
  }
  function io(e) {
    return null != e && "string" == typeof e.page;
  }
  function lo(e) {
    return (
      null != e &&
      (null == e.href
        ? "preload" === e.rel && "string" == typeof e.imageSrcSet && "string" == typeof e.imageSizes
        : "string" == typeof e.rel && "string" == typeof e.href)
    );
  }
  function co(e, t, n, r, o, a) {
    let i = (e, t) => !n[t] || e.route.id !== n[t].route.id,
      l = (e, t) =>
        n[t].pathname !== e.pathname ||
        (n[t].route.path?.endsWith("*") && n[t].params["*"] !== e.params["*"]);
    return "assets" === a
      ? t.filter((e, t) => i(e, t) || l(e, t))
      : "data" === a
        ? t.filter((t, a) => {
            let c = r.routes[t.route.id];
            if (!c || !c.hasLoader) return !1;
            if (i(t, a) || l(t, a)) return !0;
            if (t.route.shouldRevalidate) {
              let r = t.route.shouldRevalidate({
                currentUrl: new URL(o.pathname + o.search + o.hash, window.origin),
                currentParams: n[0]?.params || {},
                nextUrl: new URL(e, window.origin),
                nextParams: t.params,
                defaultShouldRevalidate: !0,
              });
              if ("boolean" == typeof r) return r;
            }
            return !0;
          })
        : [];
  }
  function so(e, t, { includeHydrateFallback: n } = {}) {
    return (
      (r = e
        .map((e) => {
          let r = t.routes[e.route.id];
          if (!r) return [];
          let o = [r.module];
          return (
            r.clientActionModule && (o = o.concat(r.clientActionModule)),
            r.clientLoaderModule && (o = o.concat(r.clientLoaderModule)),
            n && r.hydrateFallbackModule && (o = o.concat(r.hydrateFallbackModule)),
            r.imports && (o = o.concat(r.imports)),
            o
          );
        })
        .flat(1)),
      [...new Set(r)]
    );
    var r;
  }
  function uo(e, t) {
    let n = new Set(),
      r = new Set(t);
    return e.reduce((e, o) => {
      if (t && !io(o) && "script" === o.as && o.href && r.has(o.href)) return e;
      let a = JSON.stringify(
        (function (e) {
          let t = {},
            n = Object.keys(e).sort();
          for (let r of n) t[r] = e[r];
          return t;
        })(o),
      );
      return (
        n.has(a) ||
          (n.add(a),
          e.push({
            key: a,
            link: o,
          })),
        e
      );
    }, []);
  }
  function fo() {
    return o.createElement(
      Yo,
      {
        title: "Loading...",
        renderScripts: !0,
      },
      Tt
        ? o.createElement("script", {
            dangerouslySetInnerHTML: {
              __html:
                '\n              console.log(\n                "💿 Hey developer 👋. You can provide a way better UX than this " +\n                "when your app is loading JS modules and/or running `clientLoader` " +\n                "functions. Check out https://reactrouter.com/start/framework/route-module#hydratefallback " +\n                "for more information."\n              );\n            ',
            },
          })
        : null,
    );
  }
  function mo(e) {
    let t = {};
    return (
      Object.values(e).forEach((e) => {
        if (e) {
          let n = e.parentId || "";
          (t[n] || (t[n] = []), t[n].push(e));
        }
      }),
      t
    );
  }
  function ho(e, t, n) {
    let r = xo(t),
      a =
        !t.HydrateFallback || (n && "root" !== e.id)
          ? "root" === e.id
            ? fo
            : void 0
          : t.HydrateFallback,
      i = t.ErrorBoundary
        ? t.ErrorBoundary
        : "root" === e.id
          ? () =>
              o.createElement(Go, {
                error: vn(),
              })
          : void 0;
    return "root" === e.id && t.Layout
      ? {
          ...(r
            ? {
                element: o.createElement(t.Layout, null, o.createElement(r, null)),
              }
            : {
                Component: r,
              }),
          ...(i
            ? {
                errorElement: o.createElement(t.Layout, null, o.createElement(i, null)),
              }
            : {
                ErrorBoundary: i,
              }),
          ...(a
            ? {
                hydrateFallbackElement: o.createElement(t.Layout, null, o.createElement(a, null)),
              }
            : {
                HydrateFallback: a,
              }),
        }
      : {
          Component: r,
          ErrorBoundary: i,
          HydrateFallback: a,
        };
  }
  function po(
    e,
    t,
    n,
    r,
    o = "",
    a = mo(e),
    i = Promise.resolve({
      Component: () => null,
    }),
  ) {
    return (a[o] || []).map((o) => {
      let l = t[o.id];
      Dr(l, "No `routeModule` available to create server routes");
      let c = {
          ...ho(o, l, r),
          caseSensitive: o.caseSensitive,
          id: o.id,
          index: o.index,
          path: o.path,
          handle: l.handle,
          lazy: r ? () => i : void 0,
          loader: o.hasLoader || o.hasClientLoader ? () => null : void 0,
        },
        s = po(e, t, n, r, o.id, a, i);
      return (s.length > 0 && (c.children = s), c);
    });
  }
  function vo(e, t, n, r, o, a) {
    return yo(t, n, r, o, a, "", mo(t), e);
  }
  function go(e, t) {
    if (("loader" === e && !t.hasLoader) || ("action" === e && !t.hasAction)) {
      let n = `You are trying to call ${"action" === e ? "serverAction()" : "serverLoader()"} on a route that does not have a server ${e} (routeId: "${t.id}")`;
      throw (console.error(n), new oe(400, "Bad Request", new Error(n), !0));
    }
  }
  function bo(e, t) {
    let n = "clientAction" === e ? "a" : "an",
      r = `Route "${t}" does not have ${n} ${e}, but you are trying to submit to it. To fix this, please add ${n} \`${e}\` function to the route`;
    throw (console.error(r), new oe(405, "Method Not Allowed", new Error(r), !0));
  }
  function yo(e, t, n, r, o, a = "", i = mo(e), l) {
    return (i[a] || []).map((a) => {
      let c = t[a.id];
      function s(e) {
        return (
          Dr("function" == typeof e, "No single fetch function available for route handler"),
          e()
        );
      }
      function u(e) {
        return a.hasLoader ? s(e) : Promise.resolve(null);
      }
      function d(e) {
        if (!a.hasAction) throw bo("action", a.id);
        return s(e);
      }
      function f(e) {
        import(e);
      }
      function m(e) {
        (e.clientActionModule && f(e.clientActionModule),
          e.clientLoaderModule && f(e.clientLoaderModule));
      }
      async function h(e) {
        let n = t[a.id],
          r = n ? oo(a, n) : Promise.resolve();
        try {
          return e();
        } finally {
          await r;
        }
      }
      let p = {
        id: a.id,
        index: a.index,
        path: a.path,
      };
      if (c) {
        Object.assign(p, {
          ...p,
          ...ho(a, c, o),
          middleware: c.clientMiddleware,
          handle: c.handle,
          shouldRevalidate: wo(p.path, c, a, r, l),
        });
        let g = n && n.loaderData && a.id in n.loaderData,
          b = g ? n?.loaderData?.[a.id] : void 0,
          y = n && n.errors && a.id in n.errors,
          w = y ? n?.errors?.[a.id] : void 0,
          x = null == l && (!0 === c.clientLoader?.hydrate || !a.hasLoader);
        ((p.loader = async ({ request: e, params: t, context: n }, r) => {
          try {
            return await h(
              async () => (
                Dr(c, "No `routeModule` available for critical-route loader"),
                c.clientLoader
                  ? c.clientLoader({
                      request: e,
                      params: t,
                      context: n,
                      async serverLoader() {
                        if ((go("loader", a), x)) {
                          if (g) return b;
                          if (y) throw w;
                        }
                        return u(r);
                      },
                    })
                  : u(r)
              ),
            );
          } finally {
            x = !1;
          }
        }),
          (p.loader.hydrate = Co(a.id, c.clientLoader, a.hasLoader, o)),
          (p.action = ({ request: e, params: t, context: n }, r) =>
            h(async () => {
              if (
                (Dr(c, "No `routeModule` available for critical-route action"), !c.clientAction)
              ) {
                if (o) throw bo("clientAction", a.id);
                return d(r);
              }
              return c.clientAction({
                request: e,
                params: t,
                context: n,
                serverAction: async () => (go("action", a), d(r)),
              });
            })));
      } else {
        let C;
        async function E() {
          return (
            C ||
              (C = (async () => {
                (a.clientLoaderModule || a.clientActionModule) &&
                  (await new Promise((e) => setTimeout(e, 0)));
                let e = (async function (e, t) {
                  let n = no(e, t),
                    r = (async function (e) {
                      if (!e.css) return;
                      let t = ro(e);
                      await Promise.all(t.map(ao));
                    })(e),
                    o = await n;
                  return (
                    await Promise.all([r, oo(e, o)]),
                    {
                      Component: xo(o),
                      ErrorBoundary: o.ErrorBoundary,
                      clientMiddleware: o.clientMiddleware,
                      clientAction: o.clientAction,
                      clientLoader: o.clientLoader,
                      handle: o.handle,
                      links: o.links,
                      meta: o.meta,
                      shouldRevalidate: o.shouldRevalidate,
                    }
                  );
                })(a, t);
                return (m(a), await e);
              })()),
            await C
          );
        }
        (a.hasClientLoader || (p.loader = (e, t) => h(() => u(t))),
          a.hasClientAction ||
            (p.action = (e, t) =>
              h(() => {
                if (o) throw bo("clientAction", a.id);
                return d(t);
              })),
          (p.lazy = {
            loader: a.hasClientLoader
              ? async () => {
                  let { clientLoader: e } = a.clientLoaderModule
                    ? await import(a.clientLoaderModule)
                    : await E();
                  return (
                    Dr(e, "No `clientLoader` export found"),
                    (t, n) =>
                      e({
                        ...t,
                        serverLoader: async () => (go("loader", a), u(n)),
                      })
                  );
                }
              : void 0,
            action: a.hasClientAction
              ? async () => {
                  let e = a.clientActionModule ? import(a.clientActionModule) : E();
                  m(a);
                  let { clientAction: t } = await e;
                  return (
                    Dr(t, "No `clientAction` export found"),
                    (e, n) =>
                      t({
                        ...e,
                        serverAction: async () => (go("action", a), d(n)),
                      })
                  );
                }
              : void 0,
            middleware: a.hasClientMiddleware
              ? async () => {
                  let { clientMiddleware: e } = a.clientMiddlewareModule
                    ? await import(a.clientMiddlewareModule)
                    : await E();
                  return (Dr(e, "No `clientMiddleware` export found"), e);
                }
              : void 0,
            shouldRevalidate: async () => {
              let e = await E();
              return wo(p.path, e, a, r, l);
            },
            handle: async () => (await E()).handle,
            Component: async () => (await E()).Component,
            ErrorBoundary: a.hasErrorBoundary ? async () => (await E()).ErrorBoundary : void 0,
          }));
      }
      let v = yo(e, t, n, r, o, a.id, i, l);
      return (v.length > 0 && (p.children = v), p);
    });
  }
  function wo(e, t, n, r, o) {
    if (o)
      return (function (e, t, n) {
        let r = !1;
        return (o) => (r ? (t ? t(o) : o.defaultShouldRevalidate) : ((r = !0), n.has(e)));
      })(n.id, t.shouldRevalidate, o);
    if (!r && n.hasLoader && !n.hasClientLoader) {
      let n = e ? D(e)[1].map((e) => e.paramName) : [];
      const r = (e) => n.some((t) => e.currentParams[t] !== e.nextParams[t]);
      if (t.shouldRevalidate) {
        let e = t.shouldRevalidate;
        return (t) =>
          e({
            ...t,
            defaultShouldRevalidate: r(t),
          });
      }
      return (e) => r(e);
    }
    if (r && t.shouldRevalidate) {
      let e = t.shouldRevalidate;
      return (t) =>
        e({
          ...t,
          defaultShouldRevalidate: !0,
        });
    }
    return t.shouldRevalidate;
  }
  function xo(e) {
    if (null != e.default)
      return "object" == typeof e.default && 0 === Object.keys(e.default).length
        ? void 0
        : e.default;
  }
  function Co(e, t, n, r) {
    return (r && "root" !== e) || (null != t && (!0 === t.hydrate || !0 !== n));
  }
  var Eo = new Set(),
    So = 1e3,
    Ao = new Set(),
    ko = 7680;
  function $o(e, t) {
    return "lazy" === e.mode && !0 === t;
  }
  function zo(e, t, n, r, o, a) {
    if ($o(r, n))
      return async ({ path: i, patch: l, signal: c, fetcherKey: s }) => {
        Ao.has(i) ||
          (await Ho([i], s ? window.location.href : i, e, t, n, o, a, r.manifestPath, l, c));
      };
  }
  function Mo(e, t, n, r, a, i) {
    o.useEffect(() => {
      if (!$o(a, r) || !0 === window.navigator?.connection?.saveData) return;
      function o(e) {
        let t = "FORM" === e.tagName ? e.getAttribute("action") : e.getAttribute("href");
        if (!t) return;
        let n = "A" === e.tagName ? e.pathname : new URL(t, window.location.origin).pathname;
        Ao.has(n) || Eo.add(n);
      }
      async function l() {
        document.querySelectorAll("a[data-discover], form[data-discover]").forEach(o);
        let l = Array.from(Eo.keys()).filter((e) => !Ao.has(e) || (Eo.delete(e), !1));
        if (0 !== l.length)
          try {
            await Ho(l, null, t, n, r, i, e.basename, a.manifestPath, e.patchRoutes);
          } catch (e) {
            console.error("Failed to fetch manifest patches", e);
          }
      }
      let c = (function (e) {
        let t;
        return (...n) => {
          (window.clearTimeout(t), (t = window.setTimeout(() => e(...n), 100)));
        };
      })(l);
      l();
      let s = new MutationObserver(() => c());
      return (
        s.observe(document.documentElement, {
          subtree: !0,
          childList: !0,
          attributes: !0,
          attributeFilter: ["data-discover", "href", "action"],
        }),
        () => s.disconnect()
      );
    }, [r, i, t, n, e, a]);
  }
  function Oo(e, t) {
    let n = e || "/__manifest";
    return null == t ? n : `${t}${n}`.replace(/\/+/g, "/");
  }
  var Ro = "react-router-manifest-version";
  async function Ho(e, t, n, r, o, a, i, l, c, s) {
    const u = new URLSearchParams();
    (u.set("paths", e.sort().join(",")), u.set("version", n.version));
    let d,
      f = new URL(Oo(l, i), window.location.origin);
    if (((f.search = u.toString()), f.toString().length > ko)) return void Eo.clear();
    try {
      let e = await fetch(f, {
        signal: s,
      });
      if (!e.ok) throw new Error(`${e.status} ${e.statusText}`);
      if (204 === e.status && e.headers.has("X-Remix-Reload-Document")) {
        if (!t)
          return void console.warn(
            "Detected a manifest version mismatch during eager route discovery. The next navigation/fetch to an undiscovered route will result in a new document navigation to sync up with the latest manifest.",
          );
        try {
          if (sessionStorage.getItem(Ro) === n.version)
            return void console.error(
              "Unable to discover routes due to manifest version mismatch.",
            );
          sessionStorage.setItem(Ro, n.version);
        } catch {}
        ((window.location.href = t),
          console.warn("Detected manifest version mismatch, reloading..."),
          await new Promise(() => {}));
      } else if (e.status >= 400) throw new Error(await e.text());
      try {
        sessionStorage.removeItem(Ro);
      } catch {}
      d = await e.json();
    } catch (e) {
      if (s?.aborted) return;
      throw e;
    }
    let m = new Set(Object.keys(n.routes)),
      h = Object.values(d).reduce((e, t) => (t && !m.has(t.id) && (e[t.id] = t), e), {});
    (Object.assign(n.routes, h),
      e.forEach((e) =>
        (function (e, t) {
          if (t.size >= So) {
            let e = t.values().next().value;
            t.delete(e);
          }
          t.add(e);
        })(e, Ao),
      ));
    let p = new Set();
    (Object.values(h).forEach((e) => {
      !e || (e.parentId && h[e.parentId]) || p.add(e.parentId);
    }),
      p.forEach((e) => c(e || null, yo(h, r, null, o, a, e))));
  }
  function Io() {
    let e = o.useContext($t);
    return (Dr(e, "You must render this element inside a <DataRouterContext.Provider> element"), e);
  }
  function No() {
    let e = o.useContext(zt);
    return (
      Dr(e, "You must render this element inside a <DataRouterStateContext.Provider> element"),
      e
    );
  }
  var Lo = o.createContext(void 0);
  function Po() {
    let e = o.useContext(Lo);
    return (Dr(e, "You must render this element inside a <HydratedRouter> element"), e);
  }
  function jo(e, t) {
    return (n) => {
      (e && e(n), n.defaultPrevented || t(n));
    };
  }
  function To(e, t, n) {
    if (n && !Wo) return [e[0]];
    if (t) {
      let n = e.findIndex((e) => void 0 !== t[e.route.id]);
      return e.slice(0, n + 1);
    }
    return e;
  }
  Lo.displayName = "FrameworkContext";
  var Bo = "data-react-router-critical-css";
  function Vo({ nonce: e }) {
    let { isSpaMode: t, manifest: n, routeModules: r, criticalCss: a } = Po(),
      { errors: i, matches: l } = No(),
      c = To(l, i, t),
      s = o.useMemo(
        () =>
          (function (e, t, n) {
            return uo(
              e
                .map((e) => {
                  let r = t[e.route.id],
                    o = n.routes[e.route.id];
                  return [
                    o && o.css
                      ? o.css.map((e) => ({
                          rel: "stylesheet",
                          href: e,
                        }))
                      : [],
                    r?.links?.() || [],
                  ];
                })
                .flat(2),
              so(e, n),
            );
          })(c, r, n),
        [c, r, n],
      );
    return o.createElement(
      o.Fragment,
      null,
      "string" == typeof a
        ? o.createElement("style", {
            [Bo]: "",
            dangerouslySetInnerHTML: {
              __html: a,
            },
          })
        : null,
      "object" == typeof a
        ? o.createElement("link", {
            [Bo]: "",
            rel: "stylesheet",
            href: a.href,
            nonce: e,
          })
        : null,
      s.map(({ key: t, link: n }) =>
        io(n)
          ? o.createElement(Do, {
              key: t,
              nonce: e,
              ...n,
            })
          : o.createElement("link", {
              key: t,
              nonce: e,
              ...n,
            }),
      ),
    );
  }
  function Do({ page: e, ...t }) {
    let { router: n } = Io(),
      r = o.useMemo(() => A(n.routes, e, n.basename), [n.routes, e, n.basename]);
    return r
      ? o.createElement(Fo, {
          page: e,
          matches: r,
          ...t,
        })
      : null;
  }
  function Fo({ page: e, matches: t, ...n }) {
    let r = Dt(),
      { manifest: a, routeModules: i } = Po(),
      { basename: l } = Io(),
      { loaderData: c, matches: s } = No(),
      u = o.useMemo(() => co(e, t, s, a, r, "data"), [e, t, s, a, r]),
      d = o.useMemo(() => co(e, t, s, a, r, "assets"), [e, t, s, a, r]),
      f = o.useMemo(() => {
        if (e === r.pathname + r.search + r.hash) return [];
        let n = new Set(),
          o = !1;
        if (
          (t.forEach((e) => {
            let t = a.routes[e.route.id];
            t &&
              t.hasLoader &&
              ((!u.some((t) => t.route.id === e.route.id) &&
                e.route.id in c &&
                i[e.route.id]?.shouldRevalidate) ||
              t.hasClientLoader
                ? (o = !0)
                : n.add(e.route.id));
          }),
          0 === n.size)
        )
          return [];
        let s = Qr(e, l, "data");
        return (
          o &&
            n.size > 0 &&
            s.searchParams.set(
              "_routes",
              t
                .filter((e) => n.has(e.route.id))
                .map((e) => e.route.id)
                .join(","),
            ),
          [s.pathname + s.search]
        );
      }, [l, c, r, a, u, t, e, i]),
      m = o.useMemo(() => so(d, a), [d, a]),
      h = (function (e) {
        let { manifest: t, routeModules: n } = Po(),
          [r, a] = o.useState([]);
        return (
          o.useEffect(() => {
            let r = !1;
            return (
              (async function (e, t, n) {
                return uo(
                  (
                    await Promise.all(
                      e.map(async (e) => {
                        let r = t.routes[e.route.id];
                        if (r) {
                          let e = await no(r, n);
                          return e.links ? e.links() : [];
                        }
                        return [];
                      }),
                    )
                  )
                    .flat(1)
                    .filter(lo)
                    .filter((e) => "stylesheet" === e.rel || "preload" === e.rel)
                    .map((e) =>
                      "stylesheet" === e.rel
                        ? {
                            ...e,
                            rel: "prefetch",
                            as: "style",
                          }
                        : {
                            ...e,
                            rel: "prefetch",
                          },
                    ),
                );
              })(e, t, n).then((e) => {
                r || a(e);
              }),
              () => {
                r = !0;
              }
            );
          }, [e, t, n]),
          r
        );
      })(d);
    return o.createElement(
      o.Fragment,
      null,
      f.map((e) =>
        o.createElement("link", {
          key: e,
          rel: "prefetch",
          as: "fetch",
          href: e,
          ...n,
        }),
      ),
      m.map((e) =>
        o.createElement("link", {
          key: e,
          rel: "modulepreload",
          href: e,
          ...n,
        }),
      ),
      h.map(({ key: e, link: t }) =>
        o.createElement("link", {
          key: e,
          nonce: n.nonce,
          ...t,
        }),
      ),
    );
  }
  function _o() {
    let { isSpaMode: e, routeModules: t } = Po(),
      { errors: n, matches: r, loaderData: a } = No(),
      i = Dt(),
      l = To(r, n, e),
      c = null;
    n && (c = n[l[l.length - 1].route.id]);
    let s = [],
      u = null,
      d = [];
    for (let e = 0; e < l.length; e++) {
      let n = l[e],
        r = n.route.id,
        o = a[r],
        f = n.params,
        m = t[r],
        h = [],
        p = {
          id: r,
          data: o,
          loaderData: o,
          meta: [],
          params: n.params,
          pathname: n.pathname,
          handle: n.route.handle,
          error: c,
        };
      if (
        ((d[e] = p),
        m?.meta
          ? (h =
              "function" == typeof m.meta
                ? m.meta({
                    data: o,
                    loaderData: o,
                    params: f,
                    location: i,
                    matches: d,
                    error: c,
                  })
                : Array.isArray(m.meta)
                  ? [...m.meta]
                  : m.meta)
          : u && (h = [...u]),
        (h = h || []),
        !Array.isArray(h))
      )
        throw new Error(
          "The route at " +
            n.route.path +
            " returns an invalid value. All route meta functions must return an array of meta objects.\n\nTo reference the meta function API, see https://remix.run/route/meta",
        );
      ((p.meta = h), (d[e] = p), (s = [...h]), (u = s));
    }
    return o.createElement(
      o.Fragment,
      null,
      s.flat().map((e) => {
        if (!e) return null;
        if ("tagName" in e) {
          let { tagName: t, ...n } = e;
          if (
            !(function (e) {
              return "string" == typeof e && /^(meta|link)$/.test(e);
            })(t)
          )
            return (
              console.warn(
                `A meta object uses an invalid tagName: ${t}. Expected either 'link' or 'meta'`,
              ),
              null
            );
          let r = t;
          return o.createElement(r, {
            key: JSON.stringify(n),
            ...n,
          });
        }
        if ("title" in e)
          return o.createElement(
            "title",
            {
              key: "title",
            },
            String(e.title),
          );
        if (
          ("charset" in e && (e.charSet ?? (e.charSet = e.charset), delete e.charset),
          "charSet" in e && null != e.charSet)
        )
          return "string" == typeof e.charSet
            ? o.createElement("meta", {
                key: "charSet",
                charSet: e.charSet,
              })
            : null;
        if ("script:ld+json" in e)
          try {
            let t = JSON.stringify(e["script:ld+json"]);
            return o.createElement("script", {
              key: `script:ld+json:${t}`,
              type: "application/ld+json",
              dangerouslySetInnerHTML: {
                __html: Vr(t),
              },
            });
          } catch (e) {
            return null;
          }
        return o.createElement("meta", {
          key: JSON.stringify(e),
          ...e,
        });
      }),
    );
  }
  var Wo = !1;
  function qo() {
    Wo = !0;
  }
  function Ko(e) {
    let {
        manifest: t,
        serverHandoffString: n,
        isSpaMode: r,
        renderMeta: a,
        routeDiscovery: i,
        ssr: l,
      } = Po(),
      { router: c, static: s, staticContext: u } = Io(),
      { matches: d } = No(),
      f = o.useContext(Mt),
      m = $o(i, l);
    a && (a.didRenderScripts = !0);
    let h = To(d, null, r);
    o.useEffect(() => {
      qo();
    }, []);
    let p = o.useMemo(() => {
        if (f) return null;
        let r = u
            ? `window.__reactRouterContext = ${n};window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());`
            : " ",
          a = s
            ? `${t.hmr?.runtime ? `import ${JSON.stringify(t.hmr.runtime)};` : ""}${m ? "" : `import ${JSON.stringify(t.url)}`};\n${h
                .map((e, n) => {
                  let r = `route${n}`,
                    o = t.routes[e.route.id];
                  Dr(o, `Route ${e.route.id} not found in manifest`);
                  let {
                      clientActionModule: a,
                      clientLoaderModule: i,
                      clientMiddlewareModule: l,
                      hydrateFallbackModule: c,
                      module: s,
                    } = o,
                    u = [
                      ...(a
                        ? [
                            {
                              module: a,
                              varName: `${r}_clientAction`,
                            },
                          ]
                        : []),
                      ...(i
                        ? [
                            {
                              module: i,
                              varName: `${r}_clientLoader`,
                            },
                          ]
                        : []),
                      ...(l
                        ? [
                            {
                              module: l,
                              varName: `${r}_clientMiddleware`,
                            },
                          ]
                        : []),
                      ...(c
                        ? [
                            {
                              module: c,
                              varName: `${r}_HydrateFallback`,
                            },
                          ]
                        : []),
                      {
                        module: s,
                        varName: `${r}_main`,
                      },
                    ];
                  return 1 === u.length
                    ? `import * as ${r} from ${JSON.stringify(s)};`
                    : [
                        u.map((e) => `import * as ${e.varName} from "${e.module}";`).join("\n"),
                        `const ${r} = {${u.map((e) => `...${e.varName}`).join(",")}};`,
                      ].join("\n");
                })
                .join("\n")}\n  ${
                m
                  ? `window.__reactRouterManifest = ${JSON.stringify(
                      (function ({ sri: e, ...t }, n) {
                        let r = new Set(n.state.matches.map((e) => e.route.id)),
                          o = n.state.location.pathname.split("/").filter(Boolean),
                          a = ["/"];
                        for (o.pop(); o.length > 0;) (a.push(`/${o.join("/")}`), o.pop());
                        a.forEach((e) => {
                          let t = A(n.routes, e, n.basename);
                          t && t.forEach((e) => r.add(e.route.id));
                        });
                        let i = [...r].reduce(
                          (e, n) =>
                            Object.assign(e, {
                              [n]: t.routes[n],
                            }),
                          {},
                        );
                        return {
                          ...t,
                          routes: i,
                          sri: !!e || void 0,
                        };
                      })(t, c),
                      null,
                      2,
                    )};`
                  : ""
              }\n  window.__reactRouterRouteModules = {${h.map((e, t) => `${JSON.stringify(e.route.id)}:route${t}`).join(",")}};\n\nimport(${JSON.stringify(t.entry.module)});`
            : " ";
        return o.createElement(
          o.Fragment,
          null,
          o.createElement("script", {
            ...e,
            suppressHydrationWarning: !0,
            dangerouslySetInnerHTML: {
              __html: r,
            },
            type: void 0,
          }),
          o.createElement("script", {
            ...e,
            suppressHydrationWarning: !0,
            dangerouslySetInnerHTML: {
              __html: a,
            },
            type: "module",
            async: !0,
          }),
        );
      }, []),
      v =
        Wo || f
          ? []
          : ((g = t.entry.imports.concat(
              so(h, t, {
                includeHydrateFallback: !0,
              }),
            )),
            [...new Set(g)]);
    var g;
    let b = "object" == typeof t.sri ? t.sri : {};
    return (
      An(!f, "The <Scripts /> element is a no-op when using RSC and can be safely removed."),
      Wo || f
        ? null
        : o.createElement(
            o.Fragment,
            null,
            "object" == typeof t.sri
              ? o.createElement("script", {
                  "rr-importmap": "",
                  type: "importmap",
                  suppressHydrationWarning: !0,
                  dangerouslySetInnerHTML: {
                    __html: JSON.stringify({
                      integrity: b,
                    }),
                  },
                })
              : null,
            m
              ? null
              : o.createElement("link", {
                  rel: "modulepreload",
                  href: t.url,
                  crossOrigin: e.crossOrigin,
                  integrity: b[t.url],
                  suppressHydrationWarning: !0,
                }),
            o.createElement("link", {
              rel: "modulepreload",
              href: t.entry.module,
              crossOrigin: e.crossOrigin,
              integrity: b[t.entry.module],
              suppressHydrationWarning: !0,
            }),
            v.map((t) =>
              o.createElement("link", {
                key: t,
                rel: "modulepreload",
                href: t,
                crossOrigin: e.crossOrigin,
                integrity: b[t],
                suppressHydrationWarning: !0,
              }),
            ),
            p,
          )
    );
  }
  function Uo(...e) {
    return (t) => {
      e.forEach((e) => {
        "function" == typeof e ? e(t) : null != e && (e.current = t);
      });
    };
  }
  var Xo = class extends o.Component {
    constructor(e) {
      (super(e),
        (this.state = {
          error: e.error || null,
          location: e.location,
        }));
    }
    static getDerivedStateFromError(e) {
      return {
        error: e,
      };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location
        ? {
            error: e.error || null,
            location: e.location,
          }
        : {
            error: e.error || t.error,
            location: t.location,
          };
    }
    render() {
      return this.state.error
        ? o.createElement(Go, {
            error: this.state.error,
            isOutsideRemixApp: !0,
          })
        : this.props.children;
    }
  };
  function Go({ error: e, isOutsideRemixApp: t }) {
    console.error(e);
    let n,
      r = o.createElement("script", {
        dangerouslySetInnerHTML: {
          __html:
            '\n        console.log(\n          "💿 Hey developer 👋. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."\n        );\n      ',
        },
      });
    if (ae(e))
      return o.createElement(
        Yo,
        {
          title: "Unhandled Thrown Response!",
        },
        o.createElement(
          "h1",
          {
            style: {
              fontSize: "24px",
            },
          },
          e.status,
          " ",
          e.statusText,
        ),
        Tt ? r : null,
      );
    if (e instanceof Error) n = e;
    else {
      let t =
        null == e
          ? "Unknown Error"
          : "object" == typeof e && "toString" in e
            ? e.toString()
            : JSON.stringify(e);
      n = new Error(t);
    }
    return o.createElement(
      Yo,
      {
        title: "Application Error!",
        isOutsideRemixApp: t,
      },
      o.createElement(
        "h1",
        {
          style: {
            fontSize: "24px",
          },
        },
        "Application Error",
      ),
      o.createElement(
        "pre",
        {
          style: {
            padding: "2rem",
            background: "hsla(10, 50%, 50%, 0.1)",
            color: "red",
            overflow: "auto",
          },
        },
        n.stack,
      ),
      r,
    );
  }
  function Yo({ title: e, renderScripts: t, isOutsideRemixApp: n, children: r }) {
    let { routeModules: a } = Po();
    return a.root?.Layout && !n
      ? r
      : o.createElement(
          "html",
          {
            lang: "en",
          },
          o.createElement(
            "head",
            null,
            o.createElement("meta", {
              charSet: "utf-8",
            }),
            o.createElement("meta", {
              name: "viewport",
              content: "width=device-width,initial-scale=1,viewport-fit=cover",
            }),
            o.createElement("title", null, e),
          ),
          o.createElement(
            "body",
            null,
            o.createElement(
              "main",
              {
                style: {
                  fontFamily: "system-ui, sans-serif",
                  padding: "2rem",
                },
              },
              r,
              t ? o.createElement(Ko, null) : null,
            ),
          ),
        );
  }
  var Qo =
    "undefined" != typeof window &&
    void 0 !== window.document &&
    void 0 !== window.document.createElement;
  try {
    Qo && (window.__reactRouterVersion = "7.9.4");
  } catch (e) {}
  function Zo(e, t) {
    return we({
      basename: t?.basename,
      getContext: t?.getContext,
      future: t?.future,
      history: u({
        window: t?.window,
      }),
      hydrationData: t?.hydrationData || ea(),
      routes: e,
      mapRouteProperties: kn,
      hydrationRouteProperties: $n,
      dataStrategy: t?.dataStrategy,
      patchRoutesOnNavigation: t?.patchRoutesOnNavigation,
      window: t?.window,
    }).initialize();
  }
  function Jo(e, t) {
    return we({
      basename: t?.basename,
      getContext: t?.getContext,
      future: t?.future,
      history: d({
        window: t?.window,
      }),
      hydrationData: t?.hydrationData || ea(),
      routes: e,
      mapRouteProperties: kn,
      hydrationRouteProperties: $n,
      dataStrategy: t?.dataStrategy,
      patchRoutesOnNavigation: t?.patchRoutesOnNavigation,
      window: t?.window,
    }).initialize();
  }
  function ea() {
    let e = window?.__staticRouterHydrationData;
    return (
      e &&
        e.errors &&
        (e = {
          ...e,
          errors: ta(e.errors),
        }),
      e
    );
  }
  function ta(e) {
    if (!e) return null;
    let t = Object.entries(e),
      n = {};
    for (let [e, r] of t)
      if (r && "RouteErrorResponse" === r.__type)
        n[e] = new oe(r.status, r.statusText, r.data, !0 === r.internal);
      else if (r && "Error" === r.__type) {
        if (r.__subType) {
          let t = window[r.__subType];
          if ("function" == typeof t)
            try {
              let o = new t(r.message);
              ((o.stack = ""), (n[e] = o));
            } catch (e) {}
        }
        if (null == n[e]) {
          let t = new Error(r.message);
          ((t.stack = ""), (n[e] = t));
        }
      } else n[e] = r;
    return n;
  }
  function na({ basename: e, children: t, window: n }) {
    let r = o.useRef();
    null == r.current &&
      (r.current = u({
        window: n,
        v5Compat: !0,
      }));
    let a = r.current,
      [i, l] = o.useState({
        action: a.action,
        location: a.location,
      }),
      c = o.useCallback(
        (e) => {
          o.startTransition(() => l(e));
        },
        [l],
      );
    return (
      o.useLayoutEffect(() => a.listen(c), [a, c]),
      o.createElement(jn, {
        basename: e,
        children: t,
        location: i.location,
        navigationType: i.action,
        navigator: a,
      })
    );
  }
  function ra({ basename: e, children: t, window: n }) {
    let r = o.useRef();
    null == r.current &&
      (r.current = d({
        window: n,
        v5Compat: !0,
      }));
    let a = r.current,
      [i, l] = o.useState({
        action: a.action,
        location: a.location,
      }),
      c = o.useCallback(
        (e) => {
          o.startTransition(() => l(e));
        },
        [l],
      );
    return (
      o.useLayoutEffect(() => a.listen(c), [a, c]),
      o.createElement(jn, {
        basename: e,
        children: t,
        location: i.location,
        navigationType: i.action,
        navigator: a,
      })
    );
  }
  function oa({ basename: e, children: t, history: n }) {
    let [r, a] = o.useState({
        action: n.action,
        location: n.location,
      }),
      i = o.useCallback(
        (e) => {
          o.startTransition(() => a(e));
        },
        [a],
      );
    return (
      o.useLayoutEffect(() => n.listen(i), [n, i]),
      o.createElement(jn, {
        basename: e,
        children: t,
        location: r.location,
        navigationType: r.action,
        navigator: n,
      })
    );
  }
  oa.displayName = "unstable_HistoryRouter";
  var aa = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    ia = o.forwardRef(function (
      {
        onClick: e,
        discover: t = "render",
        prefetch: n = "none",
        relative: r,
        reloadDocument: a,
        replace: i,
        state: l,
        target: c,
        to: s,
        preventScrollReset: u,
        viewTransition: d,
        ...f
      },
      h,
    ) {
      let p,
        { basename: v } = o.useContext(Nt),
        g = "string" == typeof s && aa.test(s),
        b = !1;
      if ("string" == typeof s && g && ((p = s), Qo))
        try {
          let e = new URL(window.location.href),
            t = s.startsWith("//") ? new URL(e.protocol + s) : new URL(s),
            n = _(t.pathname, v);
          t.origin === e.origin && null != n ? (s = n + t.search + t.hash) : (b = !0);
        } catch (e) {
          m(
            !1,
            `<Link to="${s}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
          );
        }
      let y = Bt(s, {
          relative: r,
        }),
        [w, x, C] = (function (e, t) {
          let n = o.useContext(Lo),
            [r, a] = o.useState(!1),
            [i, l] = o.useState(!1),
            { onFocus: c, onBlur: s, onMouseEnter: u, onMouseLeave: d, onTouchStart: f } = t,
            m = o.useRef(null);
          (o.useEffect(() => {
            if (("render" === e && l(!0), "viewport" === e)) {
              let e = new IntersectionObserver(
                (e) => {
                  e.forEach((e) => {
                    l(e.isIntersecting);
                  });
                },
                {
                  threshold: 0.5,
                },
              );
              return (
                m.current && e.observe(m.current),
                () => {
                  e.disconnect();
                }
              );
            }
          }, [e]),
            o.useEffect(() => {
              if (r) {
                let e = setTimeout(() => {
                  l(!0);
                }, 100);
                return () => {
                  clearTimeout(e);
                };
              }
            }, [r]));
          let h = () => {
              a(!0);
            },
            p = () => {
              (a(!1), l(!1));
            };
          return n
            ? "intent" !== e
              ? [i, m, {}]
              : [
                  i,
                  m,
                  {
                    onFocus: jo(c, h),
                    onBlur: jo(s, p),
                    onMouseEnter: jo(u, h),
                    onMouseLeave: jo(d, p),
                    onTouchStart: jo(f, h),
                  },
                ]
            : [!1, m, {}];
        })(n, f),
        E = ma(s, {
          replace: i,
          state: l,
          target: c,
          preventScrollReset: u,
          relative: r,
          viewTransition: d,
        }),
        S = o.createElement("a", {
          ...f,
          ...C,
          href: p || y,
          onClick:
            b || a
              ? e
              : function (t) {
                  (e && e(t), t.defaultPrevented || E(t));
                },
          ref: Uo(h, x),
          target: c,
          "data-discover": g || "render" !== t ? void 0 : "true",
        });
      return w && !g
        ? o.createElement(
            o.Fragment,
            null,
            S,
            o.createElement(Do, {
              page: y,
            }),
          )
        : S;
    });
  ia.displayName = "Link";
  var la = o.forwardRef(function (
    {
      "aria-current": e = "page",
      caseSensitive: t = !1,
      className: n = "",
      end: r = !1,
      style: a,
      to: i,
      viewTransition: l,
      children: c,
      ...s
    },
    u,
  ) {
    let d = Qt(i, {
        relative: s.relative,
      }),
      f = Dt(),
      m = o.useContext(zt),
      { navigator: h, basename: p } = o.useContext(Nt),
      v = null != m && $a(d) && !0 === l,
      g = h.encodeLocation ? h.encodeLocation(d).pathname : d.pathname,
      b = f.pathname,
      y = m && m.navigation && m.navigation.location ? m.navigation.location.pathname : null;
    (t || ((b = b.toLowerCase()), (y = y ? y.toLowerCase() : null), (g = g.toLowerCase())),
      y && p && (y = _(y, p) || y));
    const w = "/" !== g && g.endsWith("/") ? g.length - 1 : g.length;
    let x,
      C = b === g || (!r && b.startsWith(g) && "/" === b.charAt(w)),
      E = null != y && (y === g || (!r && y.startsWith(g) && "/" === y.charAt(g.length))),
      S = {
        isActive: C,
        isPending: E,
        isTransitioning: v,
      },
      A = C ? e : void 0;
    x =
      "function" == typeof n
        ? n(S)
        : [n, C ? "active" : null, E ? "pending" : null, v ? "transitioning" : null]
            .filter(Boolean)
            .join(" ");
    let k = "function" == typeof a ? a(S) : a;
    return o.createElement(
      ia,
      {
        ...s,
        "aria-current": A,
        className: x,
        ref: u,
        style: k,
        to: i,
        viewTransition: l,
      },
      "function" == typeof c ? c(S) : c,
    );
  });
  la.displayName = "NavLink";
  var ca = o.forwardRef(
    (
      {
        discover: e = "render",
        fetcherKey: t,
        navigate: n,
        reloadDocument: r,
        replace: a,
        state: i,
        method: l = er,
        action: c,
        onSubmit: s,
        relative: u,
        preventScrollReset: d,
        viewTransition: f,
        ...m
      },
      h,
    ) => {
      let p = ga(),
        v = ba(c, {
          relative: u,
        }),
        g = "get" === l.toLowerCase() ? "get" : "post",
        b = "string" == typeof c && aa.test(c);
      return o.createElement("form", {
        ref: h,
        method: g,
        action: v,
        onSubmit: r
          ? s
          : (e) => {
              if ((s && s(e), e.defaultPrevented)) return;
              e.preventDefault();
              let r = e.nativeEvent.submitter,
                o = r?.getAttribute("formmethod") || l;
              p(r || e.currentTarget, {
                fetcherKey: t,
                method: o,
                navigate: n,
                replace: a,
                state: i,
                relative: u,
                preventScrollReset: d,
                viewTransition: f,
              });
            },
        ...m,
        "data-discover": b || "render" !== e ? void 0 : "true",
      });
    },
  );
  function sa({ getKey: e, storageKey: t, ...n }) {
    let r = o.useContext(Lo),
      { basename: a } = o.useContext(Nt),
      i = Dt(),
      l = fn();
    Sa({
      getKey: e,
      storageKey: t,
    });
    let c = o.useMemo(() => {
      if (!r || !e) return null;
      let t = Ea(i, l, a, e);
      return t !== i.key ? t : null;
    }, []);
    if (!r || r.isSpaMode) return null;
    let s = ((e, t) => {
      if (!window.history.state || !window.history.state.key) {
        let e = Math.random().toString(32).slice(2);
        window.history.replaceState(
          {
            key: e,
          },
          "",
        );
      }
      try {
        let n = JSON.parse(sessionStorage.getItem(e) || "{}")[t || window.history.state.key];
        "number" == typeof n && window.scrollTo(0, n);
      } catch (t) {
        (console.error(t), sessionStorage.removeItem(e));
      }
    }).toString();
    return o.createElement("script", {
      ...n,
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: {
        __html: `(${s})(${JSON.stringify(t || xa)}, ${JSON.stringify(c)})`,
      },
    });
  }
  function ua(e) {
    return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
  }
  function da(e) {
    let t = o.useContext($t);
    return (f(t, ua(e)), t);
  }
  function fa(e) {
    let t = o.useContext(zt);
    return (f(t, ua(e)), t);
  }
  function ma(
    e,
    { target: t, replace: n, state: r, preventScrollReset: a, relative: i, viewTransition: l } = {},
  ) {
    let c = Kt(),
      s = Dt(),
      u = Qt(e, {
        relative: i,
      });
    return o.useCallback(
      (o) => {
        if (
          (function (e, t) {
            return !(
              0 !== e.button ||
              (t && "_self" !== t) ||
              (function (e) {
                return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
              })(e)
            );
          })(o, t)
        ) {
          o.preventDefault();
          let t = void 0 !== n ? n : v(s) === v(u);
          c(e, {
            replace: t,
            state: r,
            preventScrollReset: a,
            relative: i,
            viewTransition: l,
          });
        }
      },
      [s, c, u, n, r, t, e, a, i, l],
    );
  }
  function ha(e) {
    m(
      "undefined" != typeof URLSearchParams,
      "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.",
    );
    let t = o.useRef(rr(e)),
      n = o.useRef(!1),
      r = Dt(),
      a = o.useMemo(
        () =>
          (function (e, t) {
            let n = rr(e);
            return (
              t &&
                t.forEach((e, r) => {
                  n.has(r) ||
                    t.getAll(r).forEach((e) => {
                      n.append(r, e);
                    });
                }),
              n
            );
          })(r.search, n.current ? null : t.current),
        [r.search],
      ),
      i = Kt(),
      l = o.useCallback(
        (e, t) => {
          const r = rr("function" == typeof e ? e(new URLSearchParams(a)) : e);
          ((n.current = !0), i("?" + r, t));
        },
        [i, a],
      );
    return [a, l];
  }
  ((ca.displayName = "Form"), (sa.displayName = "ScrollRestoration"));
  var pa = 0,
    va = () => `__${String(++pa)}__`;
  function ga() {
    let { router: e } = da("useSubmit"),
      { basename: t } = o.useContext(Nt),
      n = sn("useRouteId");
    return o.useCallback(
      async (r, o = {}) => {
        let {
          action: a,
          method: i,
          encType: l,
          formData: c,
          body: s,
        } = (function (e, t) {
          let n, r, o, a, i;
          if (nr((l = e)) && "form" === l.tagName.toLowerCase()) {
            let i = e.getAttribute("action");
            ((r = i ? _(i, t) : null),
              (n = e.getAttribute("method") || er),
              (o = ir(e.getAttribute("enctype")) || tr),
              (a = new FormData(e)));
          } else if (
            (function (e) {
              return nr(e) && "button" === e.tagName.toLowerCase();
            })(e) ||
            ((function (e) {
              return nr(e) && "input" === e.tagName.toLowerCase();
            })(e) &&
              ("submit" === e.type || "image" === e.type))
          ) {
            let i = e.form;
            if (null == i)
              throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
            let l = e.getAttribute("formaction") || i.getAttribute("action");
            if (
              ((r = l ? _(l, t) : null),
              (n = e.getAttribute("formmethod") || i.getAttribute("method") || er),
              (o = ir(e.getAttribute("formenctype")) || ir(i.getAttribute("enctype")) || tr),
              (a = new FormData(i, e)),
              !(function () {
                if (null === or)
                  try {
                    (new FormData(document.createElement("form"), 0), (or = !1));
                  } catch (e) {
                    or = !0;
                  }
                return or;
              })())
            ) {
              let { name: t, type: n, value: r } = e;
              if ("image" === n) {
                let e = t ? `${t}.` : "";
                (a.append(`${e}x`, "0"), a.append(`${e}y`, "0"));
              } else t && a.append(t, r);
            }
          } else {
            if (nr(e))
              throw new Error(
                'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
              );
            ((n = er), (r = null), (o = tr), (i = e));
          }
          var l;
          return (
            a && "text/plain" === o && ((i = a), (a = void 0)),
            {
              action: r,
              method: n.toLowerCase(),
              encType: o,
              formData: a,
              body: i,
            }
          );
        })(r, t);
        if (!1 === o.navigate) {
          let t = o.fetcherKey || va();
          await e.fetch(t, n, o.action || a, {
            preventScrollReset: o.preventScrollReset,
            formData: c,
            body: s,
            formMethod: o.method || i,
            formEncType: o.encType || l,
            flushSync: o.flushSync,
          });
        } else
          await e.navigate(o.action || a, {
            preventScrollReset: o.preventScrollReset,
            formData: c,
            body: s,
            formMethod: o.method || i,
            formEncType: o.encType || l,
            replace: o.replace,
            state: o.state,
            fromRouteId: n,
            flushSync: o.flushSync,
            viewTransition: o.viewTransition,
          });
      },
      [e, t, n],
    );
  }
  function ba(e, { relative: t } = {}) {
    let { basename: n } = o.useContext(Nt),
      r = o.useContext(Pt);
    f(r, "useFormAction must be used inside a RouteContext");
    let [a] = r.matches.slice(-1),
      i = {
        ...Qt(e || ".", {
          relative: t,
        }),
      },
      l = Dt();
    if (null == e) {
      i.search = l.search;
      let e = new URLSearchParams(i.search),
        t = e.getAll("index");
      if (t.some((e) => "" === e)) {
        (e.delete("index"), t.filter((e) => e).forEach((t) => e.append("index", t)));
        let n = e.toString();
        i.search = n ? `?${n}` : "";
      }
    }
    return (
      (e && "." !== e) ||
        !a.route.index ||
        (i.search = i.search ? i.search.replace(/^\?/, "?index&") : "?index"),
      "/" !== n && (i.pathname = "/" === i.pathname ? n : G([n, i.pathname])),
      v(i)
    );
  }
  function ya({ key: e } = {}) {
    let { router: t } = da("useFetcher"),
      n = fa("useFetcher"),
      r = o.useContext(Rt),
      a = o.useContext(Pt),
      i = a.matches[a.matches.length - 1]?.route.id;
    (f(r, "useFetcher must be used inside a FetchersContext"),
      f(a, "useFetcher must be used inside a RouteContext"),
      f(null != i, 'useFetcher can only be used on routes that contain a unique "id"'));
    let l = o.useId(),
      [c, s] = o.useState(e || l);
    (e && e !== c && s(e), o.useEffect(() => (t.getFetcher(c), () => t.deleteFetcher(c)), [t, c]));
    let u = o.useCallback(
        async (e, n) => {
          (f(i, "No routeId available for fetcher.load()"), await t.fetch(c, i, e, n));
        },
        [c, i, t],
      ),
      d = ga(),
      m = o.useCallback(
        async (e, t) => {
          await d(e, {
            ...t,
            navigate: !1,
            fetcherKey: c,
          });
        },
        [c, d],
      ),
      h = o.useCallback((e) => t.resetFetcher(c, e), [t, c]),
      p = o.useMemo(() => {
        let e = o.forwardRef((e, t) =>
          o.createElement(ca, {
            ...e,
            navigate: !1,
            fetcherKey: c,
            ref: t,
          }),
        );
        return ((e.displayName = "fetcher.Form"), e);
      }, [c]),
      v = n.fetchers.get(c) || me,
      g = r.get(c);
    return o.useMemo(
      () => ({
        Form: p,
        submit: m,
        load: u,
        unstable_reset: h,
        ...v,
        data: g,
      }),
      [p, m, u, h, v, g],
    );
  }
  function wa() {
    let e = fa("useFetchers");
    return Array.from(e.fetchers.entries()).map(([e, t]) => ({
      ...t,
      key: e,
    }));
  }
  var xa = "react-router-scroll-positions",
    Ca = {};
  function Ea(e, t, n, r) {
    let o = null;
    return (
      r &&
        (o = r(
          "/" !== n
            ? {
                ...e,
                pathname: _(e.pathname, n) || e.pathname,
              }
            : e,
          t,
        )),
      null == o && (o = e.key),
      o
    );
  }
  function Sa({ getKey: e, storageKey: t } = {}) {
    let { router: n } = da("useScrollRestoration"),
      { restoreScrollPosition: r, preventScrollReset: a } = fa("useScrollRestoration"),
      { basename: i } = o.useContext(Nt),
      l = Dt(),
      c = fn(),
      s = un();
    (o.useEffect(
      () => (
        (window.history.scrollRestoration = "manual"),
        () => {
          window.history.scrollRestoration = "auto";
        }
      ),
      [],
    ),
      (function (e) {
        let { capture: t } = {};
        o.useEffect(() => {
          let n =
            null != t
              ? {
                  capture: t,
                }
              : void 0;
          return (
            window.addEventListener("pagehide", e, n),
            () => {
              window.removeEventListener("pagehide", e, n);
            }
          );
        }, [e, t]);
      })(
        o.useCallback(() => {
          if ("idle" === s.state) {
            let t = Ea(l, c, i, e);
            Ca[t] = window.scrollY;
          }
          try {
            sessionStorage.setItem(t || xa, JSON.stringify(Ca));
          } catch (e) {
            m(
              !1,
              `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`,
            );
          }
          window.history.scrollRestoration = "auto";
        }, [s.state, e, i, l, c, t]),
      ),
      "undefined" != typeof document &&
        (o.useLayoutEffect(() => {
          try {
            let e = sessionStorage.getItem(t || xa);
            e && (Ca = JSON.parse(e));
          } catch (e) {}
        }, [t]),
        o.useLayoutEffect(() => {
          let t = n?.enableScrollRestoration(
            Ca,
            () => window.scrollY,
            e ? (t, n) => Ea(t, n, i, e) : void 0,
          );
          return () => t && t();
        }, [n, i, e]),
        o.useLayoutEffect(() => {
          if (!1 !== r)
            if ("number" != typeof r) {
              try {
                if (l.hash) {
                  let e = document.getElementById(decodeURIComponent(l.hash.slice(1)));
                  if (e) return void e.scrollIntoView();
                }
              } catch {
                m(
                  !1,
                  `"${l.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`,
                );
              }
              !0 !== a && window.scrollTo(0, 0);
            } else window.scrollTo(0, r);
        }, [l, r, a])));
  }
  function Aa(e, t) {
    let { capture: n } = t || {};
    o.useEffect(() => {
      let t =
        null != n
          ? {
              capture: n,
            }
          : void 0;
      return (
        window.addEventListener("beforeunload", e, t),
        () => {
          window.removeEventListener("beforeunload", e, t);
        }
      );
    }, [e, n]);
  }
  function ka({ when: e, message: t }) {
    let n = wn(e);
    (o.useEffect(() => {
      "blocked" === n.state && (window.confirm(t) ? setTimeout(n.proceed, 0) : n.reset());
    }, [n, t]),
      o.useEffect(() => {
        "blocked" !== n.state || e || n.reset();
      }, [n, e]));
  }
  function $a(e, { relative: t } = {}) {
    let n = o.useContext(Ot);
    f(
      null != n,
      "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
    );
    let { basename: r } = da("useViewTransitionState"),
      a = Qt(e, {
        relative: t,
      });
    if (!n.isTransitioning) return !1;
    let i = _(n.currentLocation.pathname, r) || n.currentLocation.pathname,
      l = _(n.nextLocation.pathname, r) || n.nextLocation.pathname;
    return null != V(a.pathname, l) || null != V(a.pathname, i);
  }
  function za({ basename: e, children: t, location: n = "/" }) {
    "string" == typeof n && (n = g(n));
    let r = {
        pathname: n.pathname || "/",
        search: n.search || "",
        hash: n.hash || "",
        state: null != n.state ? n.state : null,
        key: n.key || "default",
      },
      a = Ha();
    return o.createElement(jn, {
      basename: e,
      children: t,
      location: r,
      navigationType: "POP",
      navigator: a,
      static: !0,
    });
  }
  function Ma({ context: e, router: t, hydrate: n = !0, nonce: r }) {
    f(t && e, "You must provide `router` and `context` to <StaticRouterProvider>");
    let a = {
        router: t,
        navigator: Ha(),
        static: !0,
        staticContext: e,
        basename: e.basename || "/",
      },
      i = new Map(),
      l = "";
    if (!1 !== n) {
      let t = {
        loaderData: e.loaderData,
        actionData: e.actionData,
        errors: Ra(e.errors),
      };
      l = `window.__staticRouterHydrationData = JSON.parse(${JSON.stringify(JSON.stringify(t)).replace(Ba, (e) => Ta[e])});`;
    }
    let { state: c } = a.router;
    return o.createElement(
      o.Fragment,
      null,
      o.createElement(
        $t.Provider,
        {
          value: a,
        },
        o.createElement(
          zt.Provider,
          {
            value: c,
          },
          o.createElement(
            Rt.Provider,
            {
              value: i,
            },
            o.createElement(
              Ot.Provider,
              {
                value: {
                  isTransitioning: !1,
                },
              },
              o.createElement(
                jn,
                {
                  basename: a.basename,
                  location: c.location,
                  navigationType: c.historyAction,
                  navigator: a.navigator,
                  static: a.static,
                },
                o.createElement(Oa, {
                  routes: t.routes,
                  future: t.future,
                  state: c,
                }),
              ),
            ),
          ),
        ),
      ),
      l
        ? o.createElement("script", {
            suppressHydrationWarning: !0,
            nonce: r,
            dangerouslySetInnerHTML: {
              __html: l,
            },
          })
        : null,
    );
  }
  function Oa({ routes: e, future: t, state: n }) {
    return Jt(e, void 0, n, void 0, t);
  }
  function Ra(e) {
    if (!e) return null;
    let t = Object.entries(e),
      n = {};
    for (let [e, r] of t)
      ae(r)
        ? (n[e] = {
            ...r,
            __type: "RouteErrorResponse",
          })
        : r instanceof Error
          ? (n[e] = {
              message: r.message,
              __type: "Error",
              ...("Error" !== r.name
                ? {
                    __subType: r.name,
                  }
                : {}),
            })
          : (n[e] = r);
    return n;
  }
  function Ha() {
    return {
      createHref: La,
      encodeLocation: Pa,
      push(e) {
        throw new Error(
          `You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(e)})\` somewhere in your app.`,
        );
      },
      replace(e) {
        throw new Error(
          `You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(e)}, { replace: true })\` somewhere in your app.`,
        );
      },
      go(e) {
        throw new Error(
          `You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${e})\` somewhere in your app.`,
        );
      },
      back() {
        throw new Error(
          "You cannot use navigator.back() on the server because it is a stateless environment.",
        );
      },
      forward() {
        throw new Error(
          "You cannot use navigator.forward() on the server because it is a stateless environment.",
        );
      },
    };
  }
  function Ia(e, t) {
    return xe(e, {
      ...t,
      mapRouteProperties: kn,
    });
  }
  function Na(e, t, n = {}) {
    let r = {},
      o = S(e, kn, void 0, r),
      a = t.matches.map((e) => {
        let t = r[e.route.id] || e.route;
        return {
          ...e,
          route: t,
        };
      }),
      i = (e) => `You cannot use router.${e}() on the server because it is a stateless environment`;
    return {
      get basename() {
        return t.basename;
      },
      get future() {
        return {
          v8_middleware: !1,
          ...n?.future,
        };
      },
      get state() {
        return {
          historyAction: "POP",
          location: t.location,
          matches: a,
          loaderData: t.loaderData,
          actionData: t.actionData,
          errors: t.errors,
          initialized: !0,
          navigation: fe,
          restoreScrollPosition: null,
          preventScrollReset: !1,
          revalidation: "idle",
          fetchers: new Map(),
          blockers: new Map(),
        };
      },
      get routes() {
        return o;
      },
      get window() {},
      initialize() {
        throw i("initialize");
      },
      subscribe() {
        throw i("subscribe");
      },
      enableScrollRestoration() {
        throw i("enableScrollRestoration");
      },
      navigate() {
        throw i("navigate");
      },
      fetch() {
        throw i("fetch");
      },
      revalidate() {
        throw i("revalidate");
      },
      createHref: La,
      encodeLocation: Pa,
      getFetcher: () => me,
      deleteFetcher() {
        throw i("deleteFetcher");
      },
      resetFetcher() {
        throw i("resetFetcher");
      },
      dispose() {
        throw i("dispose");
      },
      getBlocker: () => he,
      deleteBlocker() {
        throw i("deleteBlocker");
      },
      patchRoutes() {
        throw i("patchRoutes");
      },
      _internalFetchControllers: new Map(),
      _internalSetRoutes() {
        throw i("_internalSetRoutes");
      },
      _internalSetStateDoNotUseOrYouWillBreakYourApp() {
        throw i("_internalSetStateDoNotUseOrYouWillBreakYourApp");
      },
    };
  }
  function La(e) {
    return "string" == typeof e ? e : v(e);
  }
  function Pa(e) {
    let t = "string" == typeof e ? e : v(e);
    t = t.replace(/ $/, "%20");
    let n = ja.test(t) ? new URL(t) : new URL(t, "http://localhost");
    return {
      pathname: n.pathname,
      search: n.search,
      hash: n.hash,
    };
  }
  var ja = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    Ta = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029",
    },
    Ba = /[&><\u2028\u2029]/g;
};
