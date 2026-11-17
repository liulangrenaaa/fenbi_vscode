// 从安装包提取的模块 3014；导出：stack、_deepestRenderedBoundaryId。
(e, t, n) => {
  "use strict";

  var r;
  n.d(t, {
    C3: () => ke,
    E3: () => $e,
    Jt: () => de,
    KB: () => W,
    LQ: () => O,
    Nb: () => Z,
    PY: () => u,
    UF: () => J,
    Y4: () => ce,
    Y6: () => Q,
    Zd: () => ee,
    Zz: () => s,
    dC: () => y,
    fm: () => v,
    jw: () => U,
    lR: () => Me,
    lV: () => X,
    n0: () => p,
    t6: () => ze,
    yM: () => G,
    yq: () => oe,
  });
  var o = n(8934),
    a = n(6540),
    i = n(8232),
    l = n(4635),
    c = n(961);
  function s({ context: e, url: t, nonce: n }) {
    "string" == typeof t && (t = new URL(t));
    let { manifest: r, routeModules: i, criticalCss: l, serverHandoffString: c } = e,
      s = (0, o.OW)(r.routes, i, e.future, e.isSpaMode);
    e.staticHandlerContext.loaderData = {
      ...e.staticHandlerContext.loaderData,
    };
    for (let t of e.staticHandlerContext.matches) {
      let n = t.route.id,
        r = i[n],
        a = e.manifest.routes[n];
      r &&
        a &&
        (0, o.vB)(n, r.clientLoader, a.hasLoader, e.isSpaMode) &&
        (r.HydrateFallback || !a.hasLoader) &&
        delete e.staticHandlerContext.loaderData[n];
    }
    let u = (0, o.KD)(s, e.staticHandlerContext);
    return a.createElement(
      a.Fragment,
      null,
      a.createElement(
        o.yL.Provider,
        {
          value: {
            manifest: r,
            routeModules: i,
            criticalCss: l,
            serverHandoffString: c,
            future: e.future,
            ssr: e.ssr,
            isSpaMode: e.isSpaMode,
            routeDiscovery: e.routeDiscovery,
            serializeError: e.serializeError,
            renderMeta: e.renderMeta,
          },
        },
        a.createElement(
          o.aJ,
          {
            location: u.state.location,
          },
          a.createElement(o.je, {
            router: u,
            context: e.staticHandlerContext,
            hydrate: !1,
          }),
        ),
      ),
      e.serverHandoffStream
        ? a.createElement(
            a.Suspense,
            null,
            a.createElement(o.UU, {
              context: e,
              identifier: 0,
              reader: e.serverHandoffStream.getReader(),
              textDecoder: new TextDecoder(),
              nonce: n,
            }),
          )
        : null,
    );
  }
  function u(e, t) {
    return function ({ initialEntries: n, initialIndex: r, hydrationData: i, future: l }) {
      let c = a.useRef(),
        s = a.useRef();
      if (null == c.current) {
        s.current = {
          future: {
            unstable_subResourceIntegrity: !0 === l?.unstable_subResourceIntegrity,
            v8_middleware: !0 === l?.v8_middleware,
          },
          manifest: {
            routes: {},
            entry: {
              imports: [],
              module: "",
            },
            url: "",
            version: "",
          },
          routeModules: {},
          ssr: !1,
          isSpaMode: !1,
          routeDiscovery: {
            mode: "lazy",
            manifestPath: "/__manifest",
          },
        };
        let a = d(
          (0, o.R_)(e, (e) => e),
          void 0 !== t ? t : l?.v8_middleware ? new o.aB() : {},
          s.current.manifest,
          s.current.routeModules,
        );
        c.current = (0, o.bg)(a, {
          initialEntries: n,
          initialIndex: r,
          hydrationData: i,
        });
      }
      return a.createElement(
        o.yL.Provider,
        {
          value: s.current,
        },
        a.createElement(o.pg, {
          router: c.current,
        }),
      );
    };
  }
  function d(e, t, n, r, a) {
    return e.map((e) => {
      if (!e.id) throw new Error("Expected a route.id in react-router processRoutes() function");
      let i = {
          id: e.id,
          path: e.path,
          index: e.index,
          Component: e.Component ? (0, o.ux)(e.Component) : void 0,
          HydrateFallback: e.HydrateFallback ? (0, o.AX)(e.HydrateFallback) : void 0,
          ErrorBoundary: e.ErrorBoundary ? (0, o.Vp)(e.ErrorBoundary) : void 0,
          action: e.action
            ? (n) =>
                e.action({
                  ...n,
                  context: t,
                })
            : void 0,
          loader: e.loader
            ? (n) =>
                e.loader({
                  ...n,
                  context: t,
                })
            : void 0,
          middleware: e.middleware
            ? e.middleware.map(
                (e) =>
                  (...n) =>
                    e(
                      {
                        ...n[0],
                        context: t,
                      },
                      n[1],
                    ),
              )
            : void 0,
          handle: e.handle,
          shouldRevalidate: e.shouldRevalidate,
        },
        l = {
          id: e.id,
          path: e.path,
          index: e.index,
          parentId: a,
          hasAction: null != e.action,
          hasLoader: null != e.loader,
          hasClientAction: !1,
          hasClientLoader: !1,
          hasClientMiddleware: !1,
          hasErrorBoundary: null != e.ErrorBoundary,
          module: "build/stub-path-to-module.js",
          clientActionModule: void 0,
          clientLoaderModule: void 0,
          clientMiddlewareModule: void 0,
          hydrateFallbackModule: void 0,
        };
      return (
        (n.routes[i.id] = l),
        (r[e.id] = {
          default: i.Component || o.sv,
          ErrorBoundary: i.ErrorBoundary || void 0,
          handle: e.handle,
          links: e.links,
          meta: e.meta,
          shouldRevalidate: e.shouldRevalidate,
        }),
        e.children && (i.children = d(e.children, t, n, r, i.id)),
        i
      );
    });
  }
  var f = new TextEncoder(),
    m = async (e, t) => {
      let n = e.lastIndexOf("."),
        r = e.slice(0, n),
        o = e.slice(n + 1),
        a = f.encode(r),
        i = await h(t, ["verify"]);
      try {
        let e = (function (e) {
          let t = new Uint8Array(e.length);
          for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
          return t;
        })(atob(o));
        return !!(await crypto.subtle.verify("HMAC", i, e, a)) && r;
      } catch (e) {
        return !1;
      }
    },
    h = async (e, t) =>
      crypto.subtle.importKey(
        "raw",
        f.encode(e),
        {
          name: "HMAC",
          hash: "SHA-256",
        },
        !1,
        t,
      ),
    p = (e, t = {}) => {
      let { secrets: n = [], ...r } = {
        path: "/",
        sameSite: "lax",
        ...t,
      };
      return (
        (function (e, t) {
          (0, o.mc)(
            !t,
            `The "${e}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`,
          );
        })(e, r.expires),
        {
          get name() {
            return e;
          },
          get isSigned() {
            return n.length > 0;
          },
          get expires() {
            return void 0 !== r.maxAge ? new Date(Date.now() + 1e3 * r.maxAge) : r.expires;
          },
          async parse(t, o) {
            if (!t) return null;
            let a = (0, i.qg)(t, {
              ...r,
              ...o,
            });
            if (e in a) {
              let t = a[e];
              if ("string" == typeof t && "" !== t) {
                let e = await (async function (e, t) {
                  if (t.length > 0) {
                    for (let n of t) {
                      let t = await m(e, n);
                      if (!1 !== t) return g(t);
                    }
                    return null;
                  }
                  return g(e);
                })(t, n);
                return e;
              }
              return "";
            }
            return null;
          },
          serialize: async (t, o) =>
            (0, i.lK)(
              e,
              "" === t
                ? ""
                : await (async function (e, t) {
                    let n = (function (e) {
                      return btoa(
                        (function (e) {
                          let t,
                            n,
                            r = e.toString(),
                            o = "",
                            a = 0;
                          for (; a < r.length;) {
                            if (((t = r.charAt(a++)), "%" === t))
                              if ("u" === r.charAt(a)) {
                                if (((n = r.slice(a + 1, a + 5)), /^[\da-f]{4}$/i.exec(n))) {
                                  ((o += String.fromCharCode(parseInt(n, 16))), (a += 5));
                                  continue;
                                }
                              } else if (((n = r.slice(a, a + 2)), /^[\da-f]{2}$/i.exec(n))) {
                                ((o += String.fromCharCode(parseInt(n, 16))), (a += 2));
                                continue;
                              }
                            o += t;
                          }
                          return o;
                        })(encodeURIComponent(JSON.stringify(e))),
                      );
                    })(e);
                    return (
                      t.length > 0 &&
                        (n = await (async (e, t) => {
                          let n = f.encode(e),
                            r = await h(t, ["sign"]),
                            o = await crypto.subtle.sign("HMAC", r, n);
                          return (
                            e +
                            "." +
                            btoa(String.fromCharCode(...new Uint8Array(o))).replace(/=+$/, "")
                          );
                        })(n, t[0])),
                      n
                    );
                  })(t, n),
              {
                ...r,
                ...o,
              },
            ),
        }
      );
    },
    v = (e) =>
      null != e &&
      "string" == typeof e.name &&
      "boolean" == typeof e.isSigned &&
      "function" == typeof e.parse &&
      "function" == typeof e.serialize;
  function g(e) {
    try {
      return JSON.parse(
        decodeURIComponent(
          (function (e) {
            let t,
              n,
              r = e.toString(),
              o = "",
              a = 0;
            for (; a < r.length;)
              ((t = r.charAt(a++)),
                /[\w*+\-./@]/.exec(t)
                  ? (o += t)
                  : ((n = t.charCodeAt(0)),
                    (o += n < 256 ? "%" + b(n, 2) : "%u" + b(n, 4).toUpperCase())));
            return o;
          })(atob(e)),
        ),
      );
    } catch (e) {
      return {};
    }
  }
  function b(e, t) {
    let n = e.toString(16);
    for (; n.length < t;) n = "0" + n;
    return n;
  }
  var y = ((e) => (
    (e.Development = "development"),
    (e.Production = "production"),
    (e.Test = "test"),
    e
  ))(y || {});
  function w(e, t) {
    if (e instanceof Error && "development" !== t) {
      let e = new Error("Unexpected Server Error");
      return ((e.stack = void 0), e);
    }
    return e;
  }
  function x(e, t) {
    return Object.entries(e).reduce(
      (e, [n, r]) =>
        Object.assign(e, {
          [n]: w(r, t),
        }),
      {},
    );
  }
  function C(e, t) {
    let n = w(e, t);
    return {
      message: n.message,
      stack: n.stack,
    };
  }
  function E(e, t) {
    if (!e) return null;
    let n = Object.entries(e),
      r = {};
    for (let [e, a] of n)
      if ((0, o.pX)(a))
        r[e] = {
          ...a,
          __type: "RouteErrorResponse",
        };
      else if (a instanceof Error) {
        let n = w(a, t);
        r[e] = {
          message: n.message,
          stack: n.stack,
          __type: "Error",
          ...("Error" !== n.name
            ? {
                __subType: n.name,
              }
            : {}),
        };
      } else r[e] = a;
    return r;
  }
  function S(e, t, n) {
    let r = (0, o.ue)(e, t, n);
    return r
      ? r.map((e) => ({
          params: e.params,
          pathname: e.pathname,
          route: e.route,
        }))
      : null;
  }
  async function A(e, t) {
    let n = await e({
      request: $(k(t.request)),
      params: t.params,
      context: t.context,
    });
    if ((0, o.YX)(n) && n.init && n.init.status && (0, o.QE)(n.init.status))
      throw new Response(null, n.init);
    return n;
  }
  function k(e) {
    let t = new URL(e.url),
      n = t.searchParams.getAll("index");
    t.searchParams.delete("index");
    let r = [];
    for (let e of n) e && r.push(e);
    for (let e of r) t.searchParams.append("index", e);
    let o = {
      method: e.method,
      body: e.body,
      headers: e.headers,
      signal: e.signal,
    };
    return (o.body && (o.duplex = "half"), new Request(t.href, o));
  }
  function $(e) {
    let t = new URL(e.url);
    t.searchParams.delete("_routes");
    let n = {
      method: e.method,
      body: e.body,
      headers: e.headers,
      signal: e.signal,
    };
    return (n.body && (n.duplex = "half"), new Request(t.href, n));
  }
  function z(e, t) {
    if (!1 === e || null == e)
      throw (
        console.error(
          "The following error is a bug in React Router; please open an issue! https://github.com/remix-run/react-router/issues/new/choose",
        ),
        new Error(t)
      );
  }
  var M = "__reactRouterDevServerHooks";
  function O(e) {
    globalThis[M] = e;
  }
  function R() {
    return globalThis[M];
  }
  function H(e, t) {
    if ("undefined" != typeof process)
      try {
        if ("yes" === process.env?.IS_RR_BUILD_REQUEST) return e.headers.get(t);
      } catch (e) {}
    return null;
  }
  function I(e) {
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
  function N(e, t = "", n = I(e)) {
    return (n[t] || []).map((t) => ({
      ...t,
      children: N(e, t.id, n),
    }));
  }
  function L(e, t, n = "", r = I(e)) {
    return (r[n] || []).map((n) => {
      let a = {
        hasErrorBoundary: "root" === n.id || null != n.module.ErrorBoundary,
        id: n.id,
        path: n.path,
        middleware: n.module.middleware,
        loader: n.module.loader
          ? async (e) => {
              let t = H(e.request, "X-React-Router-Prerender-Data");
              if (null != t) {
                let e = t ? decodeURI(t) : t;
                z(e, "Missing prerendered data for route");
                let r = new TextEncoder().encode(e),
                  a = new ReadableStream({
                    start(e) {
                      (e.enqueue(r), e.close());
                    },
                  }),
                  i = (await (0, o.ht)(a, global)).value;
                if (i && o.lR in i) {
                  let e = i[o.lR],
                    t = {
                      status: e.status,
                    };
                  throw e.reload
                    ? (0, o.Sk)(e.redirect, t)
                    : e.replace
                      ? (0, o.HC)(e.redirect, t)
                      : (0, o.V2)(e.redirect, t);
                }
                {
                  z(i && n.id in i, "Unable to decode prerendered data");
                  let e = i[n.id];
                  return (z("data" in e, "Unable to process prerendered data"), e.data);
                }
              }
              return await A(n.module.loader, e);
            }
          : void 0,
        action: n.module.action ? (e) => A(n.module.action, e) : void 0,
        handle: n.module.handle,
      };
      return n.index
        ? {
            index: !0,
            ...a,
          }
        : {
            caseSensitive: n.caseSensitive,
            children: L(e, t, n.id, r),
            ...a,
          };
    });
  }
  function P(e) {
    return (0, o.ZD)(JSON.stringify(e));
  }
  function j(e, t) {
    return (function (e) {
      let n,
        r = e.errors ? e.matches.findIndex((t) => e.errors[t.route.id]) : -1,
        o = r >= 0 ? e.matches.slice(0, r + 1) : e.matches;
      if (r >= 0) {
        let { actionHeaders: t, actionData: o, loaderHeaders: a, loaderData: i } = e;
        e.matches.slice(r).some((e) => {
          let r = e.route.id;
          return (
            !t[r] || (o && o.hasOwnProperty(r))
              ? a[r] && !i.hasOwnProperty(r) && (n = a[r])
              : (n = t[r]),
            null != n
          );
        });
      }
      const a = new Headers(void 0);
      return o.reduce((r, a, i) => {
        let { id: l } = a.route,
          c = e.loaderHeaders[l] || new Headers(),
          s = e.actionHeaders[l] || new Headers(),
          u = null != n && i === o.length - 1,
          d = u && n !== c && n !== s,
          f = ((e) => {
            let n = t.routes[e.route.id];
            return (z(n, `Route with id "${e.route.id}" not found in build`), n.module.headers);
          })(a);
        if (null == f) {
          let e = new Headers(r);
          return (d && T(n, e), T(s, e), T(c, e), e);
        }
        let m = new Headers(
          "function" == typeof f
            ? f({
                loaderHeaders: c,
                parentHeaders: r,
                actionHeaders: s,
                errorHeaders: u ? n : void 0,
              })
            : f,
        );
        return (d && T(n, m), T(s, m), T(c, m), T(r, m), m);
      }, new Headers(a));
    })(e);
  }
  function T(e, t) {
    let n = e.get("Set-Cookie");
    if (n) {
      let e = (0, l.splitCookiesString)(n),
        r = new Set(t.getSetCookie());
      e.forEach((e) => {
        r.has(e) || t.append("Set-Cookie", e);
      });
    }
  }
  var B = new Set([...o.RF, 304]);
  function V(e, t, n, { result: r, headers: o, status: a }) {
    let i = new Headers(o);
    return (
      i.set("X-Remix-Response", "yes"),
      B.has(a)
        ? new Response(null, {
            status: a,
            headers: i,
          })
        : (i.set("Content-Type", "text/x-script"),
          i.delete("Content-Length"),
          new Response(F(r, e.signal, t.entry.module.streamTimeout, n), {
            status: a || 200,
            headers: i,
          }))
    );
  }
  function D(e, t, n, r) {
    let a = (function (e, t, n) {
        let r = t.get("Location");
        return (
          n && (r = (0, o.pb)(r, n) || r),
          {
            redirect: r,
            status: e,
            revalidate: t.has("X-Remix-Revalidate") || t.has("Set-Cookie"),
            reload: t.has("X-Remix-Reload-Document"),
            replace: t.has("X-Remix-Replace"),
          }
        );
      })(e.status, e.headers, n.basename),
      i = new Headers(e.headers);
    return (
      i.delete("Location"),
      i.set("Content-Type", "text/x-script"),
      V(t, n, r, {
        result:
          "GET" === t.method
            ? {
                [o.lR]: a,
              }
            : a,
        headers: i,
        status: o.gI,
      })
    );
  }
  function F(e, t, n, r) {
    let a = new AbortController(),
      i = setTimeout(() => a.abort(new Error("Server Timeout")), "number" == typeof n ? n : 4950);
    return (
      t.addEventListener("abort", () => clearTimeout(i)),
      (0, o.lF)(e, {
        signal: a.signal,
        plugins: [
          (e) => {
            if (e instanceof Error) {
              let { name: t, message: n, stack: o } = "production" === r ? w(e, r) : e;
              return ["SanitizedError", t, n, o];
            }
            if (e instanceof o.cj) {
              let { data: t, status: n, statusText: r } = e;
              return ["ErrorResponse", t, n, r];
            }
            if (e && "object" == typeof e && o.lR in e) return ["SingleFetchRedirect", e[o.lR]];
          },
        ],
        postPlugins: [
          (e) => {
            if (e && "object" == typeof e)
              return ["SingleFetchClassInstance", Object.fromEntries(Object.entries(e))];
          },
          () => ["SingleFetchFallback"],
        ],
      })
    );
  }
  function _(e, t) {
    let n = N(e.routes),
      r = L(e.routes, e.future),
      a = "development" === (i = t) || "production" === i || "test" === i ? t : "production";
    var i;
    let l = (0, o.d6)(r, {
        basename: e.basename,
      }),
      c =
        e.entry.module.handleError ||
        ((e, { request: t }) => {
          "test" === a || t.signal.aborted || console.error((0, o.pX)(e) && e.error ? e.error : e);
        });
    return {
      routes: n,
      dataRoutes: r,
      serverMode: a,
      staticHandler: l,
      errorHandler: c,
    };
  }
  var W = (e, t) => {
    let n, r, a, i, l;
    return async function (c, s) {
      if (((n = "function" == typeof e ? await e() : e), "function" == typeof e)) {
        let e = _(n, t);
        ((r = e.routes), (a = e.serverMode), (i = e.staticHandler), (l = e.errorHandler));
      } else if (!(r && a && i && l)) {
        let e = _(n, t);
        ((r = e.routes), (a = e.serverMode), (i = e.staticHandler), (l = e.errorHandler));
      }
      let u,
        d = {},
        f = (e) => {
          ("development" === t && R()?.processRequestError?.(e),
            l(e, {
              context: u,
              params: d,
              request: c,
            }));
        };
      if (n.future.v8_middleware) {
        if (s && !(s instanceof o.aB)) {
          let e = new Error(
            "Invalid `context` value provided to `handleRequest`. When middleware is enabled you must return an instance of `RouterContextProvider` from your `getLoadContext` function.",
          );
          return (f(e), q(e, a));
        }
        u = s || new o.aB();
      } else u = s || {};
      let m = new URL(c.url),
        h = n.basename || "/",
        p = m.pathname;
      ("/_root.data" === (0, o.pb)(p, h)
        ? (p = h)
        : p.endsWith(".data") && (p = p.replace(/\.data$/, "")),
        "/" !== (0, o.pb)(p, h) && p.endsWith("/") && (p = p.slice(0, -1)));
      let v = "yes" === H(c, "X-React-Router-SPA-Mode");
      if (!n.ssr) {
        let e = decodeURI(p);
        if ("/" !== h) {
          let t = (0, o.pb)(e, h);
          if (null == t)
            return (
              l(
                new o.cj(
                  404,
                  "Not Found",
                  `Refusing to prerender the \`${e}\` path because it does not start with the basename \`${h}\``,
                ),
                {
                  context: u,
                  params: d,
                  request: c,
                },
              ),
              new Response("Not Found", {
                status: 404,
                statusText: "Not Found",
              })
            );
          e = t;
        }
        if (0 === n.prerender.length) v = !0;
        else if (!n.prerender.includes(e) && !n.prerender.includes(e + "/")) {
          if (m.pathname.endsWith(".data"))
            return (
              l(
                new o.cj(
                  404,
                  "Not Found",
                  `Refusing to SSR the path \`${e}\` because \`ssr:false\` is set and the path is not included in the \`prerender\` config, so in production the path will be a 404.`,
                ),
                {
                  context: u,
                  params: d,
                  request: c,
                },
              ),
              new Response("Not Found", {
                status: 404,
                statusText: "Not Found",
              })
            );
          v = !0;
        }
      }
      let g = (0, o.lS)(n.routeDiscovery.manifestPath, h);
      if (m.pathname === g)
        try {
          let e = await (async function (e, t, n) {
            if (e.assets.version !== n.searchParams.get("version"))
              return new Response(null, {
                status: 204,
                headers: {
                  "X-Remix-Reload-Document": "true",
                },
              });
            let r = {};
            if (n.searchParams.has("paths")) {
              let o = new Set();
              (n.searchParams.get("paths") || "")
                .split(",")
                .filter(Boolean)
                .forEach((e) => {
                  e.startsWith("/") || (e = `/${e}`);
                  let t = e.split("/").slice(1);
                  t.forEach((e, n) => {
                    let r = t.slice(0, n + 1).join("/");
                    o.add(`/${r}`);
                  });
                });
              for (let n of o) {
                let o = S(t, n, e.basename);
                if (o)
                  for (let t of o) {
                    let n = t.route.id,
                      o = e.assets.routes[n];
                    o && (r[n] = o);
                  }
              }
              return Response.json(r, {
                headers: {
                  "Cache-Control": "public, max-age=31536000, immutable",
                },
              });
            }
            return new Response("Invalid Request", {
              status: 400,
            });
          })(n, r, m);
          return e;
        } catch (e) {
          return (
            f(e),
            new Response("Unknown Server Error", {
              status: 500,
            })
          );
        }
      let b,
        y = S(r, p, n.basename);
      if ((y && y.length > 0 && Object.assign(d, y[0].params), m.pathname.endsWith(".data"))) {
        let e = new URL(c.url);
        e.pathname = p;
        let t = S(r, e.pathname, n.basename);
        ((b = await (async function (e, t, n, r, a, i, l) {
          let c =
            "GET" !== r.method
              ? await (async function (e, t, n, r, a, i, l) {
                  try {
                    let t = new Request(a, {
                        method: r.method,
                        body: r.body,
                        headers: r.headers,
                        signal: r.signal,
                        ...(r.body
                          ? {
                              duplex: "half",
                            }
                          : void 0),
                      }),
                      o = await n.query(t, {
                        requestContext: i,
                        skipLoaderErrorBubbling: !0,
                        skipRevalidation: !0,
                        generateMiddlewareResponse: e.future.v8_middleware
                          ? async (e) => {
                              try {
                                return c(await e(t));
                              } catch (e) {
                                return s(e);
                              }
                            }
                          : void 0,
                      });
                    return c(o);
                  } catch (e) {
                    return s(e);
                  }
                  function c(n) {
                    return (0, o.Sv)(n)
                      ? n
                      : (function (n) {
                          let a,
                            i = j(n, e);
                          return (0, o.QE)(n.statusCode) && i.has("Location")
                            ? new Response(null, {
                                status: n.statusCode,
                                headers: i,
                              })
                            : (n.errors &&
                                (Object.values(n.errors).forEach((e) => {
                                  ((0, o.pX)(e) && !e.error) || l(e);
                                }),
                                (n.errors = x(n.errors, t))),
                              (a = n.errors
                                ? {
                                    error: Object.values(n.errors)[0],
                                  }
                                : {
                                    data: Object.values(n.actionData || {})[0],
                                  }),
                              V(r, e, t, {
                                result: a,
                                headers: i,
                                status: n.statusCode,
                              }));
                        })(n);
                  }
                  function s(n) {
                    return (
                      l(n),
                      V(r, e, t, {
                        result: {
                          error: n,
                        },
                        headers: new Headers(),
                        status: 500,
                      })
                    );
                  }
                })(t, e, n, r, a, i, l)
              : await (async function (e, t, n, r, a, i, l) {
                  let c = new URL(r.url).searchParams.get("_routes"),
                    s = c ? new Set(c.split(",")) : null;
                  try {
                    let t = new Request(a, {
                        headers: r.headers,
                        signal: r.signal,
                      }),
                      o = await n.query(t, {
                        requestContext: i,
                        filterMatchesToLoad: (e) => !s || s.has(e.route.id),
                        skipLoaderErrorBubbling: !0,
                        generateMiddlewareResponse: e.future.v8_middleware
                          ? async (e) => {
                              try {
                                return u(await e(t));
                              } catch (e) {
                                return d(e);
                              }
                            }
                          : void 0,
                      });
                    return u(o);
                  } catch (e) {
                    return d(e);
                  }
                  function u(n) {
                    return (0, o.Sv)(n)
                      ? n
                      : (function (n) {
                          let a = j(n, e);
                          if ((0, o.QE)(n.statusCode) && a.has("Location"))
                            return new Response(null, {
                              status: n.statusCode,
                              headers: a,
                            });
                          n.errors &&
                            (Object.values(n.errors).forEach((e) => {
                              ((0, o.pX)(e) && !e.error) || l(e);
                            }),
                            (n.errors = x(n.errors, t)));
                          let i = {},
                            c = new Set(
                              n.matches
                                .filter((e) => (s ? s.has(e.route.id) : null != e.route.loader))
                                .map((e) => e.route.id),
                            );
                          if (n.errors)
                            for (let [e, t] of Object.entries(n.errors))
                              i[e] = {
                                error: t,
                              };
                          for (let [e, t] of Object.entries(n.loaderData))
                            !(e in i) &&
                              c.has(e) &&
                              (i[e] = {
                                data: t,
                              });
                          return V(r, e, t, {
                            result: i,
                            headers: a,
                            status: n.statusCode,
                          });
                        })(n);
                  }
                  function d(n) {
                    return (
                      l(n),
                      V(r, e, t, {
                        result: {
                          error: n,
                        },
                        headers: new Headers(),
                        status: 500,
                      })
                    );
                  }
                })(t, e, n, r, a, i, l);
          return c;
        })(a, n, i, c, e, u, f)),
          (0, o.U)(b) && (b = D(b, c, n, a)),
          n.entry.module.handleDataRequest &&
            ((b = await n.entry.module.handleDataRequest(b, {
              context: u,
              params: t ? t[0].params : {},
              request: c,
            })),
            (0, o.U)(b) && (b = D(b, c, n, a))));
      } else if (
        !v &&
        y &&
        null == y[y.length - 1].route.module.default &&
        null == y[y.length - 1].route.module.ErrorBoundary
      )
        b = await (async function (e, t, n, r, a, i, l) {
          try {
            let e = await n.queryRoute(a, {
              routeId: r,
              requestContext: i,
              generateMiddlewareResponse: t.future.v8_middleware
                ? async (e) => {
                    try {
                      return c(await e(a));
                    } catch (e) {
                      return s(e);
                    }
                  }
                : void 0,
            });
            return c(e);
          } catch (e) {
            return s(e);
          }
          function c(e) {
            return (0, o.Sv)(e) ? e : "string" == typeof e ? new Response(e) : Response.json(e);
          }
          function s(t) {
            if ((0, o.Sv)(t)) return t;
            if ((0, o.pX)(t))
              return (
                l(t),
                (function (e, t) {
                  return Response.json(C(e.error || new Error("Unexpected Server Error"), t), {
                    status: e.status,
                    statusText: e.statusText,
                  });
                })(t, e)
              );
            if (t instanceof Error && "Expected a response from queryRoute" === t.message) {
              let t = new Error("Expected a Response to be returned from resource route handler");
              return (l(t), q(t, e));
            }
            return (l(t), q(t, e));
          }
        })(a, n, i, y.slice(-1)[0].route.id, c, u, f);
      else {
        let e,
          { pathname: r } = m;
        (n.unstable_getCriticalCss
          ? (e = await n.unstable_getCriticalCss({
              pathname: r,
            }))
          : "development" === t && R()?.getCriticalCss && (e = await R()?.getCriticalCss?.(r)),
          (b = await (async function (e, t, n, r, a, i, l, c) {
            try {
              let e = await n.query(r, {
                requestContext: a,
                generateMiddlewareResponse: t.future.v8_middleware
                  ? async (e) => {
                      try {
                        let t = await e(r);
                        return ((0, o.Sv)(t) || (t = await s(t, l)), t);
                      } catch (e) {
                        return (
                          i(e),
                          new Response(null, {
                            status: 500,
                          })
                        );
                      }
                    }
                  : void 0,
              });
              return ((0, o.Sv)(e) || (e = await s(e, l)), e);
            } catch (e) {
              return (
                i(e),
                new Response(null, {
                  status: 500,
                })
              );
            }
            async function s(l, s) {
              let u = j(l, t);
              if (B.has(l.statusCode))
                return new Response(null, {
                  status: l.statusCode,
                  headers: u,
                });
              l.errors &&
                (Object.values(l.errors).forEach((e) => {
                  ((0, o.pX)(e) && !e.error) || i(e);
                }),
                (l.errors = x(l.errors, e)));
              let d = {
                  loaderData: l.loaderData,
                  actionData: l.actionData,
                  errors: E(l.errors, e),
                },
                f = {
                  basename: t.basename,
                  future: t.future,
                  routeDiscovery: t.routeDiscovery,
                  ssr: t.ssr,
                  isSpaMode: s,
                },
                m = {
                  manifest: t.assets,
                  routeModules:
                    ((p = t.routes),
                    Object.keys(p).reduce((e, t) => {
                      let n = p[t];
                      return (n && (e[t] = n.module), e);
                    }, {})),
                  staticHandlerContext: l,
                  criticalCss: c,
                  serverHandoffString: P({
                    ...f,
                    criticalCss: c,
                  }),
                  serverHandoffStream: F(d, r.signal, t.entry.module.streamTimeout, e),
                  renderMeta: {},
                  future: t.future,
                  ssr: t.ssr,
                  routeDiscovery: t.routeDiscovery,
                  isSpaMode: s,
                  serializeError: (t) => C(t, e),
                },
                h = t.entry.module.default;
              var p;
              try {
                return await h(r, l.statusCode, u, m, a);
              } catch (c) {
                i(c);
                let s = c;
                if ((0, o.Sv)(c))
                  try {
                    let e = await (function (e) {
                      let t = e.headers.get("Content-Type");
                      return t && /\bapplication\/json\b/.test(t)
                        ? null == e.body
                          ? null
                          : e.json()
                        : e.text();
                    })(c);
                    s = new o.cj(c.status, c.statusText, e);
                  } catch (e) {}
                (l = (0, o.eF)(n.dataRoutes, l, s)).errors && (l.errors = x(l.errors, e));
                let d = {
                  loaderData: l.loaderData,
                  actionData: l.actionData,
                  errors: E(l.errors, e),
                };
                m = {
                  ...m,
                  staticHandlerContext: l,
                  serverHandoffString: P(f),
                  serverHandoffStream: F(d, r.signal, t.entry.module.streamTimeout, e),
                  renderMeta: {},
                };
                try {
                  return await h(r, l.statusCode, u, m, a);
                } catch (t) {
                  return (i(t), q(t, e));
                }
              }
            }
          })(a, n, i, c, u, f, v, e)));
      }
      return "HEAD" === c.method
        ? new Response(null, {
            headers: b.headers,
            status: b.status,
            statusText: b.statusText,
          })
        : b;
    };
  };
  function q(e, t) {
    let n = "Unexpected Server Error";
    return (
      "production" !== t && (n += `\n\n${String(e)}`),
      new Response(n, {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      })
    );
  }
  function K(e) {
    return `__flash_${e}__`;
  }
  var U = (e = {}, t = "") => {
      let n = new Map(Object.entries(e));
      return {
        get id() {
          return t;
        },
        get data() {
          return Object.fromEntries(n);
        },
        has: (e) => n.has(e) || n.has(K(e)),
        get(e) {
          if (n.has(e)) return n.get(e);
          let t = K(e);
          if (n.has(t)) {
            let e = n.get(t);
            return (n.delete(t), e);
          }
        },
        set(e, t) {
          n.set(e, t);
        },
        flash(e, t) {
          n.set(K(e), t);
        },
        unset(e) {
          n.delete(e);
        },
      };
    },
    X = (e) =>
      null != e &&
      "string" == typeof e.id &&
      void 0 !== e.data &&
      "function" == typeof e.has &&
      "function" == typeof e.get &&
      "function" == typeof e.set &&
      "function" == typeof e.flash &&
      "function" == typeof e.unset;
  function G({ cookie: e, createData: t, readData: n, updateData: r, deleteData: o }) {
    let a = v(e) ? e : p(e?.name || "__session", e);
    return (
      Y(a),
      {
        async getSession(e, t) {
          let r = e && (await a.parse(e, t)),
            o = r && (await n(r));
          return U(o || {}, r || "");
        },
        async commitSession(e, n) {
          let { id: o, data: i } = e,
            l =
              null != n?.maxAge
                ? new Date(Date.now() + 1e3 * n.maxAge)
                : null != n?.expires
                  ? n.expires
                  : a.expires;
          return (o ? await r(o, i, l) : (o = await t(i, l)), a.serialize(o, n));
        },
        destroySession: async (e, t) => (
          await o(e.id),
          a.serialize("", {
            ...t,
            maxAge: void 0,
            expires: new Date(0),
          })
        ),
      }
    );
  }
  function Y(e) {
    (0, o.mc)(
      e.isSigned,
      `The "${e.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://reactrouter.com/explanation/sessions-and-cookies#signing-cookies for more information.`,
    );
  }
  function Q({ cookie: e } = {}) {
    let t = v(e) ? e : p(e?.name || "__session", e);
    return (
      Y(t),
      {
        getSession: async (e, n) => U((e && (await t.parse(e, n))) || {}),
        async commitSession(e, n) {
          let r = await t.serialize(e.data, n);
          if (r.length > 4096)
            throw new Error("Cookie length will exceed browser maximum. Length: " + r.length);
          return r;
        },
        destroySession: async (e, n) =>
          t.serialize("", {
            ...n,
            maxAge: void 0,
            expires: new Date(0),
          }),
      }
    );
  }
  function Z({ cookie: e } = {}) {
    let t = new Map();
    return G({
      cookie: e,
      async createData(e, n) {
        let r = Math.random().toString(36).substring(2, 10);
        return (
          t.set(r, {
            data: e,
            expires: n,
          }),
          r
        );
      },
      async readData(e) {
        if (t.has(e)) {
          let { data: n, expires: r } = t.get(e);
          if (!r || r > new Date()) return n;
          r && t.delete(e);
        }
        return null;
      },
      async updateData(e, n, r) {
        t.set(e, {
          data: n,
          expires: r,
        });
      },
      async deleteData(e) {
        t.delete(e);
      },
    });
  }
  function J(e, ...t) {
    let n = t[0],
      r = e.replace(/\/*\*?$/, "").replace(/\/:([\w-]+)(\?)?/g, (t, r, o) => {
        const a = void 0 === o,
          i = n ? n[r] : void 0;
        if (a && void 0 === i)
          throw new Error(`Path '${e}' requires param '${r}' but it was not provided`);
        return void 0 === i ? "" : "/" + i;
      });
    if (e.endsWith("*")) {
      const e = n ? n["*"] : void 0;
      void 0 !== e && (r += "/" + e);
    }
    return r || "/";
  }
  function ee({ state: e, routes: t, getRouteInfo: n, location: r, basename: a, isSpaMode: i }) {
    let l = {
        ...e,
        loaderData: {
          ...e.loaderData,
        },
      },
      c = (0, o.ue)(t, r, a);
    if (c)
      for (let e of c) {
        let t = e.route.id,
          r = n(t);
        !(0, o.vB)(t, r.clientLoader, r.hasLoader, i) || (!r.hasHydrateFallback && r.hasLoader)
          ? r.hasLoader || (l.loaderData[t] = null)
          : delete l.loaderData[t];
      }
    return l;
  }
  var te = class extends a.Component {
    constructor(e) {
      (super(e),
        (this.state = {
          error: null,
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
            error: null,
            location: e.location,
          }
        : {
            error: t.error,
            location: t.location,
          };
    }
    render() {
      return this.state.error
        ? a.createElement(re, {
            error: this.state.error,
            renderAppShell: !0,
          })
        : this.props.children;
    }
  };
  function ne({ renderAppShell: e, title: t, children: n }) {
    return e
      ? a.createElement(
          "html",
          {
            lang: "en",
          },
          a.createElement(
            "head",
            null,
            a.createElement("meta", {
              charSet: "utf-8",
            }),
            a.createElement("meta", {
              name: "viewport",
              content: "width=device-width,initial-scale=1,viewport-fit=cover",
            }),
            a.createElement("title", null, t),
          ),
          a.createElement(
            "body",
            null,
            a.createElement(
              "main",
              {
                style: {
                  fontFamily: "system-ui, sans-serif",
                  padding: "2rem",
                },
              },
              n,
            ),
          ),
        )
      : n;
  }
  function re({ error: e, renderAppShell: t }) {
    console.error(e);
    let n,
      r = a.createElement("script", {
        dangerouslySetInnerHTML: {
          __html:
            '\n        console.log(\n          "💿 Hey developer 👋. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."\n        );\n      ',
        },
      });
    if ((0, o.pX)(e))
      return a.createElement(
        ne,
        {
          renderAppShell: t,
          title: "Unhandled Thrown Response!",
        },
        a.createElement(
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
        o.U2 ? r : null,
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
    return a.createElement(
      ne,
      {
        renderAppShell: t,
        title: "Application Error!",
      },
      a.createElement(
        "h1",
        {
          style: {
            fontSize: "24px",
          },
        },
        "Application Error",
      ),
      a.createElement(
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
  function oe({ hasRootLayout: e }) {
    let t = (0, o.r5)();
    if (void 0 === e) throw new Error("Missing 'hasRootLayout' prop");
    return a.createElement(re, {
      renderAppShell: !e,
      error: t,
    });
  }
  function ae(e) {
    const t = {};
    for (const n of e.matches) ie(t, n);
    return t;
  }
  function ie(e, t) {
    t = Array.isArray(t) ? t : [t];
    for (const n of t)
      e[n.id] = {
        links: n.links,
        meta: n.meta,
        default: le,
      };
  }
  var le = () => null;
  function ce({
    createFromReadableStream: e,
    createTemporaryReferenceSet: t,
    encodeReply: n,
    fetch: r = fetch,
  }) {
    const o = window;
    return async (a, i) => {
      let l = (o.__routerActionID = (o.__routerActionID ?? (o.__routerActionID = 0)) + 1);
      const c = t(),
        s = r(
          new Request(location.href, {
            body: await n(i, {
              temporaryReferences: c,
            }),
            method: "POST",
            headers: {
              Accept: "text/x-component",
              "rsc-action-id": a,
            },
          }),
        ).then((t) => {
          if (!t.body) throw new Error("No response body");
          return e(t.body, {
            temporaryReferences: c,
          });
        });
      return (
        o.__reactRouterDataRouter.__setPendingRerender(
          Promise.resolve(s)
            .then(async (e) => {
              if ("redirect" === e.type)
                return e.reload || we(e.location)
                  ? ((window.location.href = e.location), () => {})
                  : () => {
                      o.__reactRouterDataRouter.navigate(e.location, {
                        replace: e.replace,
                      });
                    };
              if ("action" !== e.type) throw new Error("Unexpected payload type");
              const t = await e.rerender;
              return t && 0 < l && o.__routerActionID <= l
                ? "redirect" === t.type
                  ? t.reload || we(t.location)
                    ? void (window.location.href = t.location)
                    : () => {
                        o.__reactRouterDataRouter.navigate(t.location, {
                          replace: t.replace,
                        });
                      }
                  : () => {
                      let e;
                      for (const n of t.matches)
                        (o.__reactRouterDataRouter.patchRoutes(e?.id ?? null, [fe(n)], !0),
                          (e = n));
                      window.__reactRouterDataRouter._internalSetStateDoNotUseOrYouWillBreakYourApp(
                        {
                          loaderData: Object.assign(
                            {},
                            o.__reactRouterDataRouter.state.loaderData,
                            t.loaderData,
                          ),
                          errors: t.errors
                            ? Object.assign({}, o.__reactRouterDataRouter.state.errors, t.errors)
                            : null,
                        },
                      );
                    }
                : () => {};
            })
            .catch(() => {}),
        ),
        s.then((e) => {
          if ("action" !== e.type && "redirect" !== e.type)
            throw new Error("Unexpected payload type");
          return e.actionResult;
        })
      );
    };
  }
  var se = (0, o.q6)();
  function ue(e, t, n, r, a) {
    let i = (0, o.gQ)(
      e,
      (e) => {
        let t = e;
        return {
          hasLoader: t.route.hasLoader,
          hasClientLoader: t.route.hasClientLoader,
          hasComponent: t.route.hasComponent,
          hasAction: t.route.hasAction,
          hasClientAction: t.route.hasClientAction,
          hasShouldRevalidate: t.route.hasShouldRevalidate,
        };
      },
      (function (e, t) {
        return async (n, r, a) => {
          let { request: i, context: l } = n,
            c = (0, o.MF)(i.url, r, "rsc");
          "GET" === i.method &&
            ((c = (0, o.Qd)(c)), a && c.searchParams.set("_routes", a.join(",")));
          let s = await t(new Request(c, await (0, o.Ul)(i)));
          if (s.status >= 400 && !s.headers.has("X-Remix-Response"))
            throw new o.cj(s.status, s.statusText, await s.text());
          (0, o.V1)(s.body, "No response body to decode");
          try {
            const t = await e(s.body, {
              temporaryReferences: void 0,
            });
            if ("redirect" === t.type)
              return {
                status: s.status,
                data: {
                  redirect: {
                    redirect: t.location,
                    reload: t.reload,
                    replace: t.replace,
                    revalidate: !1,
                    status: t.status,
                  },
                },
              };
            if ("render" !== t.type) throw new Error("Unexpected payload type");
            l.get(se).push(...t.matches);
            let n = {
              routes: {},
            };
            const r = (0, o.jM)(i.method) ? "actionData" : "loaderData";
            for (let [e, o] of Object.entries(t[r] || {}))
              n.routes[e] = {
                data: o,
              };
            if (t.errors)
              for (let [e, r] of Object.entries(t.errors))
                n.routes[e] = {
                  error: r,
                };
            return {
              status: s.status,
              data: n,
            };
          } catch (e) {
            throw new Error("Unable to decode RSC response");
          }
        };
      })(r, a),
      t,
      n,
      (e) => {
        let t = e;
        return t.route.hasComponent && !t.route.element;
      },
    );
    return async (e) =>
      e.runClientMiddleware(async () => {
        let t = e.context;
        t.set(se, []);
        let n = await i(e);
        const r = new Map();
        for (const e of t.get(se)) (r.has(e.id) || r.set(e.id, []), r.get(e.id).push(e));
        for (const t of e.matches) {
          const e = r.get(t.route.id);
          if (e)
            for (const t of e)
              window.__reactRouterDataRouter.patchRoutes(t.parentId ?? null, [fe(t)], !0);
        }
        return n;
      });
  }
  function de({
    createFromReadableStream: e,
    fetch: t = fetch,
    payload: n,
    routeDiscovery: r = "eager",
    getContext: i,
  }) {
    if ("render" !== n.type) throw new Error("Invalid payload type");
    let { router: l, routeModules: s } = a.useMemo(
      () =>
        (function ({
          fetchImplementation: e,
          createFromReadableStream: t,
          getContext: n,
          payload: r,
        }) {
          const a = window;
          if (a.__reactRouterDataRouter && a.__reactRouterRouteModules)
            return {
              router: a.__reactRouterDataRouter,
              routeModules: a.__reactRouterRouteModules,
            };
          if ("render" !== r.type) throw new Error("Invalid payload type");
          ((a.__reactRouterRouteModules = a.__reactRouterRouteModules ?? {}),
            ie(a.__reactRouterRouteModules, r.matches));
          let i = new Map();
          r.patches?.forEach((e) => {
            ((0, o.V1)(e.parentId, "Invalid patch parentId"),
              i.has(e.parentId) || i.set(e.parentId, []),
              i.get(e.parentId)?.push(e));
          });
          let l = r.matches.reduceRight((e, t) => {
            const n = fe(t, r);
            if (e.length > 0) {
              n.children = e;
              let r = i.get(t.id);
              r && n.children.push(...r.map((e) => fe(e)));
            }
            return [n];
          }, []);
          return (
            (a.__reactRouterDataRouter = (0, o.aE)({
              routes: l,
              getContext: n,
              basename: r.basename,
              history: (0, o.zR)(),
              hydrationData: ee({
                state: {
                  loaderData: r.loaderData,
                  actionData: r.actionData,
                  errors: r.errors,
                },
                routes: l,
                getRouteInfo: (e) => {
                  let t = r.matches.find((t) => t.id === e);
                  return (
                    (0, o.V1)(t, "Route not found in payload"),
                    {
                      clientLoader: t.clientLoader,
                      hasLoader: t.hasLoader,
                      hasHydrateFallback: null != t.hydrateFallbackElement,
                    }
                  );
                },
                location: r.location,
                basename: r.basename,
                isSpaMode: !1,
              }),
              async patchRoutesOnNavigation({ path: n, signal: r }) {
                ge.has(n) || (await ye([n], t, e, r));
              },
              dataStrategy: ue(() => a.__reactRouterDataRouter, !0, r.basename, t, e),
            })),
            a.__reactRouterDataRouter.state.initialized
              ? ((a.__routerInitialized = !0), a.__reactRouterDataRouter.initialize())
              : (a.__routerInitialized = !1),
            a.__reactRouterDataRouter.subscribe(({ loaderData: e, actionData: t }) => {
              undefined !== e &&
                (a.__routerActionID = (a.__routerActionID ?? (a.__routerActionID = 0)) + 1);
            }),
            (a.__reactRouterDataRouter._updateRoutesForHMR = (e) => {
              const t = window.__reactRouterDataRouter.routes,
                n = [];
              (n.push(
                ...(function t(n, r) {
                  return n.map((n) => {
                    const o = e.get(n.id);
                    if (o) {
                      const {
                          routeModule: e,
                          hasAction: a,
                          hasComponent: i,
                          hasErrorBoundary: l,
                          hasLoader: c,
                        } = o,
                        s = fe({
                          clientAction: e.clientAction,
                          clientLoader: e.clientLoader,
                          element: n.element,
                          errorElement: n.errorElement,
                          handle: n.handle,
                          hasAction: a,
                          hasComponent: i,
                          hasErrorBoundary: l,
                          hasLoader: c,
                          hydrateFallbackElement: n.hydrateFallbackElement,
                          id: n.id,
                          index: n.index,
                          links: e.links,
                          meta: e.meta,
                          parentId: r,
                          path: n.path,
                          shouldRevalidate: e.shouldRevalidate,
                        });
                      return (n.children && (s.children = t(n.children, n.id)), s);
                    }
                    const a = {
                      ...n,
                    };
                    return (n.children && (a.children = t(n.children, n.id)), a);
                  });
                })(t, void 0),
              ),
                window.__reactRouterDataRouter._internalSetRoutes(n));
            }),
            {
              router: a.__reactRouterDataRouter,
              routeModules: a.__reactRouterRouteModules,
            }
          );
        })({
          payload: n,
          fetchImplementation: t,
          getContext: i,
          createFromReadableStream: e,
        }),
      [e, n, t, i],
    );
    (a.useEffect(() => {
      (0, o.q9)();
    }, []),
      a.useLayoutEffect(() => {
        const e = window;
        e.__routerInitialized ||
          ((e.__routerInitialized = !0), e.__reactRouterDataRouter.initialize());
      }, []));
    let [u, d] = a.useState(l.state.location);
    (a.useLayoutEffect(
      () =>
        l.subscribe((e) => {
          e.location !== u && d(e.location);
        }),
      [l, u],
    ),
      a.useEffect(() => {
        if ("lazy" === r || !0 === window.navigator?.connection?.saveData) return;
        function n(e) {
          let t = "FORM" === e.tagName ? e.getAttribute("action") : e.getAttribute("href");
          if (!t) return;
          let n = "A" === e.tagName ? e.pathname : new URL(t, window.location.origin).pathname;
          ge.has(n) || pe.add(n);
        }
        async function o() {
          document.querySelectorAll("a[data-discover], form[data-discover]").forEach(n);
          let r = Array.from(pe.keys()).filter((e) => !ge.has(e) || (pe.delete(e), !1));
          if (0 !== r.length)
            try {
              await ye(r, e, t);
            } catch (e) {
              console.error("Failed to fetch manifest patches", e);
            }
        }
        let a = (function (e) {
          let t;
          return (...n) => {
            (window.clearTimeout(t), (t = window.setTimeout(() => e(...n), 100)));
          };
        })(o);
        (o(),
          new MutationObserver(() => a()).observe(document.documentElement, {
            subtree: !0,
            childList: !0,
            attributes: !0,
            attributeFilter: ["data-discover", "href", "action"],
          }));
      }, [r, e, t]));
    const f = {
      future: {
        v8_middleware: !1,
        unstable_subResourceIntegrity: !1,
      },
      isSpaMode: !1,
      ssr: !0,
      criticalCss: "",
      manifest: {
        routes: {},
        version: "1",
        url: "",
        entry: {
          module: "",
          imports: [],
        },
      },
      routeDiscovery: {
        mode: "lazy",
        manifestPath: "/__manifest",
      },
      routeModules: s,
    };
    return a.createElement(
      o.Bu.Provider,
      {
        value: !0,
      },
      a.createElement(
        te,
        {
          location: u,
        },
        a.createElement(
          o.yL.Provider,
          {
            value: f,
          },
          a.createElement(o.Wt, {
            router: l,
            flushSync: c.flushSync,
          }),
        ),
      ),
    );
  }
  function fe(e, t) {
    let n = t && e.id in t.loaderData,
      r = t?.loaderData[e.id],
      a = t?.errors && e.id in t.errors,
      i = t?.errors?.[e.id],
      l = !0 === e.clientLoader?.hydrate || !e.hasLoader || (e.hasComponent && !e.element);
    ((0, o.V1)(window.__reactRouterRouteModules), ie(window.__reactRouterRouteModules, e));
    let c = {
      id: e.id,
      element: e.element,
      errorElement: e.errorElement,
      handle: e.handle,
      hasErrorBoundary: e.hasErrorBoundary,
      hydrateFallbackElement: e.hydrateFallbackElement,
      index: e.index,
      loader: e.clientLoader
        ? async (t, o) => {
            try {
              return await e.clientLoader({
                ...t,
                serverLoader: () => {
                  if ((he("loader", e.id, e.hasLoader), l)) {
                    if (n) return r;
                    if (a) throw i;
                  }
                  return me(o);
                },
              });
            } finally {
              l = !1;
            }
          }
        : (e, t) => me(t),
      action: e.clientAction
        ? (t, n) =>
            e.clientAction({
              ...t,
              serverAction: async () => (he("action", e.id, e.hasLoader), await me(n)),
            })
        : e.hasAction
          ? (e, t) => me(t)
          : () => {
              throw (0, o.hA)("action", e.id);
            },
      path: e.path,
      shouldRevalidate: e.shouldRevalidate,
      hasLoader: !0,
      hasClientLoader: null != e.clientLoader,
      hasAction: e.hasAction,
      hasClientAction: null != e.clientAction,
      hasShouldRevalidate: null != e.shouldRevalidate,
    };
    return (
      "function" == typeof c.loader &&
        (c.loader.hydrate = (0, o.vB)(e.id, e.clientLoader, e.hasLoader, !1)),
      c
    );
  }
  function me(e) {
    return ((0, o.V1)("function" == typeof e, "Invalid singleFetch parameter"), e());
  }
  function he(e, t, n) {
    if (!n) {
      let n = `You are trying to call ${"action" === e ? "serverAction()" : "serverLoader()"} on a route that does not have a server ${e} (routeId: "${t}")`;
      throw (console.error(n), new o.cj(400, "Bad Request", new Error(n), !0));
    }
  }
  var pe = new Set(),
    ve = 1e3,
    ge = new Set(),
    be = 7680;
  async function ye(e, t, n, r) {
    let o = (function (e) {
      if (0 === e.length) return null;
      if (1 === e.length) return new URL(`${e[0]}.manifest`, window.location.origin);
      let t = (window.__reactRouterDataRouter.basename ?? "").replace(/^\/|\/$/g, ""),
        n = new URL(`${t}/.manifest`, window.location.origin);
      return (n.searchParams.set("paths", e.sort().join(",")), n);
    })(e);
    if (null == o) return;
    if (o.toString().length > be) return void pe.clear();
    let a = await n(
      new Request(o, {
        signal: r,
      }),
    );
    if (!a.body || a.status < 200 || a.status >= 300)
      throw new Error("Unable to fetch new route matches from the server");
    let i = await t(a.body, {
      temporaryReferences: void 0,
    });
    if ("manifest" !== i.type) throw new Error("Failed to patch routes");
    (e.forEach((e) =>
      (function (e, t) {
        if (t.size >= ve) {
          let e = t.values().next().value;
          t.delete(e);
        }
        t.add(e);
      })(e, ge),
    ),
      i.patches.forEach((e) => {
        window.__reactRouterDataRouter.patchRoutes(e.parentId ?? null, [fe(e)]);
      }));
  }
  function we(e) {
    return new URL(e, window.location.href).origin !== window.location.origin;
  }
  var xe = new TextEncoder(),
    Ce = "</body></html>";
  function Ee(e) {
    let t,
      n = new TextDecoder(),
      r = new Promise((e) => (t = e)),
      o = !1,
      a = [],
      i = null;
    function l(e) {
      for (let t of a) {
        let r = n.decode(t, {
          stream: !0,
        });
        (r.endsWith(Ce) && (r = r.slice(0, -Ce.length)), e.enqueue(xe.encode(r)));
      }
      ((a.length = 0), (i = null));
    }
    return new TransformStream({
      transform(n, r) {
        (a.push(n),
          i ||
            (i = setTimeout(async () => {
              (l(r),
                o ||
                  ((o = !0),
                  (async function (e, t) {
                    let n = new TextDecoder("utf-8", {
                      fatal: !0,
                    });
                    const r = e.getReader();
                    try {
                      let e;
                      for (; (e = await r.read()) && !e.done;) {
                        const r = e.value;
                        try {
                          Se(
                            JSON.stringify(
                              n.decode(r, {
                                stream: !0,
                              }),
                            ),
                            t,
                          );
                        } catch (e) {
                          Se(
                            `Uint8Array.from(atob(${JSON.stringify(btoa(String.fromCodePoint(...r)))}), m => m.codePointAt(0))`,
                            t,
                          );
                        }
                      }
                    } finally {
                      r.releaseLock();
                    }
                    let o = n.decode();
                    o.length && Se(JSON.stringify(o), t);
                  })(e, r)
                    .catch((e) => r.error(e))
                    .then(t)));
            }, 0)));
      },
      async flush(e) {
        (await r, i && (clearTimeout(i), l(e)), e.enqueue(xe.encode("</body></html>")));
      },
    });
  }
  function Se(e, t) {
    var n;
    t.enqueue(
      xe.encode(
        `<script>${((n = `(self.__FLIGHT_DATA||=[]).push(${e})`), n.replace(/<!--/g, "<\\!--").replace(/<\/(script)/gi, "</\\$1"))}<\/script>`,
      ),
    );
  }
  var Ae = (r || (r = n.t(a, 2))).use;
  async function ke({
    request: e,
    fetchServer: t,
    createFromReadableStream: n,
    renderHTML: r,
    hydrate: a = !0,
  }) {
    const i = new URL(e.url),
      l = (function (e) {
        return e.pathname.endsWith(".rsc");
      })(i),
      c =
        l ||
        (function (e) {
          return e.pathname.endsWith(".manifest");
        })(i) ||
        e.headers.has("rsc-action-id"),
      s = await t(e);
    if (c || "true" === s.headers.get("React-Router-Resource")) return s;
    if (!s.body) throw new Error("Missing body in server response");
    const u = s.clone();
    let d = null;
    a && (d = s.clone());
    const f = s.body;
    let m,
      h = [];
    const p = () =>
      m
        ? new ReadableStream({
            start(e) {
              (m.forEach((t) => e.enqueue(t)), h.push(e));
            },
          })
        : ((m = []),
          f.pipeThrough(
            new TransformStream({
              transform(e, t) {
                (m.push(e), t.enqueue(e), h.forEach((t) => t.enqueue(e)));
              },
              flush() {
                (h.forEach((e) => e.close()), (h = []));
              },
            }),
          ));
    let v = null;
    const g = () => {
      const e = Promise.resolve(n(p()));
      return Object.defineProperties(e, {
        _deepestRenderedBoundaryId: {
          get: () => v,
          set(e) {
            v = e;
          },
        },
        formState: {
          get: () => e.then((e) => ("render" === e.type ? e.formState : void 0)),
        },
      });
    };
    try {
      if (!u.body) throw new Error("Failed to clone server response");
      const e = await n(u.body);
      if (s.status === o.gI && "redirect" === e.type) {
        const t = new Headers(s.headers);
        return (
          t.delete("Content-Encoding"),
          t.delete("Content-Length"),
          t.delete("Content-Type"),
          t.delete("X-Remix-Response"),
          t.set("Location", e.location),
          new Response(d?.body || "", {
            headers: t,
            status: e.status,
            statusText: s.statusText,
          })
        );
      }
      const t = await r(g),
        i = new Headers(s.headers);
      if ((i.set("Content-Type", "text/html; charset=utf-8"), !a))
        return new Response(t, {
          status: s.status,
          headers: i,
        });
      if (!d?.body) throw new Error("Failed to clone server response");
      const l = t.pipeThrough(Ee(d.body));
      return new Response(l, {
        status: s.status,
        headers: i,
      });
    } catch (e) {
      if (e instanceof Response) return e;
      try {
        const t = (0, o.pX)(e) ? e.status : 500,
          i = await r(() => {
            const r = Promise.resolve(n(p())).then((n) =>
              Object.assign(n, {
                status: t,
                errors: v
                  ? {
                      [v]: e,
                    }
                  : {},
              }),
            );
            return Object.defineProperties(r, {
              _deepestRenderedBoundaryId: {
                get: () => v,
                set(e) {
                  v = e;
                },
              },
              formState: {
                get: () => r.then((e) => ("render" === e.type ? e.formState : void 0)),
              },
            });
          }),
          l = new Headers(s.headers);
        if ((l.set("Content-Type", "text/html"), !a))
          return new Response(i, {
            status: t,
            headers: l,
          });
        if (!d?.body) throw new Error("Failed to clone server response");
        const c = i.pipeThrough(Ee(d.body));
        return new Response(c, {
          status: t,
          headers: l,
        });
      } catch {}
      throw e;
    }
  }
  function $e({ getPayload: e }) {
    const t = e(),
      n = (function (e) {
        if (Ae) return Ae(e);
        throw new Error("React Router v7 requires React 19+ for RSC features.");
      })(t);
    if ("redirect" === n.type)
      throw new Response(null, {
        status: n.status,
        headers: {
          Location: n.location,
        },
      });
    if ("render" !== n.type) return null;
    let r = {
      ...n.loaderData,
    };
    for (const e of n.matches)
      !(0, o.vB)(e.id, e.clientLoader, e.hasLoader, !1) ||
        (!e.hydrateFallbackElement && e.hasLoader) ||
        delete r[e.id];
    const i = {
        get _deepestRenderedBoundaryId() {
          return t._deepestRenderedBoundaryId ?? null;
        },
        set _deepestRenderedBoundaryId(e) {
          t._deepestRenderedBoundaryId = e;
        },
        actionData: n.actionData,
        actionHeaders: {},
        basename: n.basename,
        errors: n.errors,
        loaderData: r,
        loaderHeaders: {},
        location: n.location,
        statusCode: 200,
        matches: n.matches.map((e) => ({
          params: e.params,
          pathname: e.pathname,
          pathnameBase: e.pathnameBase,
          route: {
            id: e.id,
            action: e.hasAction || !!e.clientAction,
            handle: e.handle,
            hasErrorBoundary: e.hasErrorBoundary,
            loader: e.hasLoader || !!e.clientLoader,
            index: e.index,
            path: e.path,
            shouldRevalidate: e.shouldRevalidate,
          },
        })),
      },
      l = (0, o.KD)(
        n.matches.reduceRight((e, t) => {
          const n = {
            id: t.id,
            action: t.hasAction || !!t.clientAction,
            element: t.element,
            errorElement: t.errorElement,
            handle: t.handle,
            hasErrorBoundary: !!t.errorElement,
            hydrateFallbackElement: t.hydrateFallbackElement,
            index: t.index,
            loader: t.hasLoader || !!t.clientLoader,
            path: t.path,
            shouldRevalidate: t.shouldRevalidate,
          };
          return (e.length > 0 && (n.children = e), [n]);
        }, []),
        i,
      ),
      c = {
        future: {
          v8_middleware: !1,
          unstable_subResourceIntegrity: !1,
        },
        isSpaMode: !1,
        ssr: !0,
        criticalCss: "",
        manifest: {
          routes: {},
          version: "1",
          url: "",
          entry: {
            module: "",
            imports: [],
          },
        },
        routeDiscovery: {
          mode: "lazy",
          manifestPath: "/__manifest",
        },
        routeModules: ae(n),
      };
    return a.createElement(
      o.Bu.Provider,
      {
        value: !0,
      },
      a.createElement(
        te,
        {
          location: n.location,
        },
        a.createElement(
          o.yL.Provider,
          {
            value: c,
          },
          a.createElement(o.je, {
            context: i,
            router: l,
            hydrate: !1,
            nonce: n.nonce,
          }),
        ),
      ),
    );
  }
  function ze() {
    let e = new TextEncoder(),
      t = null,
      n = new ReadableStream({
        start(n) {
          if ("undefined" == typeof window) return;
          let r = (t) => {
            "string" == typeof t ? n.enqueue(e.encode(t)) : n.enqueue(t);
          };
          (window.__FLIGHT_DATA || (window.__FLIGHT_DATA = []),
            window.__FLIGHT_DATA.forEach(r),
            (window.__FLIGHT_DATA.push = (e) => (r(e), 0)),
            (t = n));
        },
      });
    return (
      "undefined" != typeof document && "loading" === document.readyState
        ? document.addEventListener("DOMContentLoaded", () => {
            t?.close();
          })
        : t?.close(),
      n
    );
  }
  function Me(e) {
    if (!e) return null;
    let t = Object.entries(e),
      n = {};
    for (let [e, r] of t)
      if (r && "RouteErrorResponse" === r.__type)
        n[e] = new o.cj(r.status, r.statusText, r.data, !0 === r.internal);
      else if (r && "Error" === r.__type) {
        if (r.__subType) {
          let t = window[r.__subType];
          if ("function" == typeof t)
            try {
              let o = new t(r.message);
              ((o.stack = r.stack), (n[e] = o));
            } catch (e) {}
        }
        if (null == n[e]) {
          let t = new Error(r.message);
          ((t.stack = r.stack), (n[e] = t));
        }
      } else n[e] = r;
    return n;
  }
};
