// 从安装包提取的模块 2419；导出：DisguiseProvider、useDisguise。
(e, t, n) => {
  "use strict";

  function r(e) {
    return (
      (r =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
      r(e)
    );
  }
  function o(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
        if (null != n) {
          var r,
            o,
            a,
            i,
            l = [],
            c = !0,
            s = !1;
          try {
            if (((a = (n = n.call(e)).next), 0 === t)) {
              if (Object(n) !== n) return;
              c = !1;
            } else for (; !(c = (r = a.call(n)).done) && (l.push(r.value), l.length !== t); c = !0);
          } catch (e) {
            ((s = !0), (o = e));
          } finally {
            try {
              if (!c && null != n.return && ((i = n.return()), Object(i) !== i)) return;
            } finally {
              if (s) throw o;
            }
          }
          return l;
        }
      })(e, t) ||
      a(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function a(e, t) {
    if (e) {
      if ("string" == typeof e) return i(e, t);
      var n = {}.toString.call(e).slice(8, -1);
      return (
        "Object" === n && e.constructor && (n = e.constructor.name),
        "Map" === n || "Set" === n
          ? Array.from(e)
          : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? i(e, t)
            : void 0
      );
    }
  }
  function i(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function l(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r));
    }
    return n;
  }
  function c(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? l(Object(n), !0).forEach(function (t) {
            s(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : l(Object(n)).forEach(function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            });
    }
    return e;
  }
  function s(e, t, n) {
    return (
      (t = (function (e) {
        var t = (function (e) {
          if ("object" != r(e) || !e) return e;
          var t = e[Symbol.toPrimitive];
          if (void 0 !== t) {
            var n = t.call(e, "string");
            if ("object" != r(n)) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(e);
        })(e);
        return "symbol" == r(t) ? t : t + "";
      })(t)) in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.DisguiseProvider = t.useDisguise = void 0));
  const u = n(6540),
    d = n(8595);
  var f = u.createContext({
    disguiseEnabled: !1,
    activeMode: null,
    startDisguise: function () {},
    enableDisguise: function () {},
    disableDisguise: function () {},
  });
  t.useDisguise = function () {
    return u.useContext(f);
  };
  var m = "luban-practice-disguise-state",
    h = (0, d.getVscodeApi)(),
    p = function (e) {
      try {
        var t,
          n,
          r = (null === (t = h.getState) || void 0 === t ? void 0 : t.call(h)) || {};
        null === (n = h.setState) || void 0 === n || n.call(h, c(c({}, r), {}, s({}, m, e)));
      } catch (e) {}
    },
    v = function (e, t) {
      return {
        text: e,
        className: t,
      };
    },
    g = function (e) {
      return [v(e, "disguise-code-comment")];
    },
    b = function () {
      return [v(" ")];
    },
    y = {
      "Home.tsx": {
        language: "TypeScript React",
        lines: [
          g("// frontend-service - Home page"),
          [
            v("import", "disguise-code-keyword"),
            v(" "),
            v("React", "disguise-code-variable"),
            v(" "),
            v("from", "disguise-code-keyword"),
            v(" "),
            v('"react"', "disguise-code-string"),
            v(";"),
          ],
          [
            v("import", "disguise-code-keyword"),
            v(" { "),
            v("useEffect", "disguise-code-variable"),
            v(", "),
            v("useState", "disguise-code-variable"),
            v(" } "),
            v("from", "disguise-code-keyword"),
            v(" "),
            v('"react"', "disguise-code-string"),
            v(";"),
          ],
          [
            v("import", "disguise-code-keyword"),
            v(" "),
            v("axios", "disguise-code-variable"),
            v(" "),
            v("from", "disguise-code-keyword"),
            v(" "),
            v('"axios"', "disguise-code-string"),
            v(";"),
          ],
          [
            v("import", "disguise-code-keyword"),
            v(" { "),
            v("useAuth", "disguise-code-variable"),
            v(" } "),
            v("from", "disguise-code-keyword"),
            v(" "),
            v('"@/hooks/useAuth"', "disguise-code-string"),
            v(";"),
          ],
          b(),
          [
            v("interface", "disguise-code-keyword"),
            v(" "),
            v("HomeProps", "disguise-code-tag"),
            v(" {"),
          ],
          [
            v("  "),
            v("userId", "disguise-code-variable"),
            v("?: "),
            v("string", "disguise-code-tag"),
            v(";"),
          ],
          [
            v("  "),
            v("onLoaded", "disguise-code-variable"),
            v("?: () => "),
            v("void", "disguise-code-tag"),
            v(";"),
          ],
          [v("}", "disguise-code-keyword")],
          b(),
          [
            v("export const", "disguise-code-keyword"),
            v(" "),
            v("Home", "disguise-code-function"),
            v(" = ("),
            v("userId", "disguise-code-variable"),
            v(", "),
            v("onLoaded", "disguise-code-variable"),
            v(": "),
            v("HomeProps", "disguise-code-tag"),
            v(") => {"),
          ],
          [
            v("  "),
            v("const", "disguise-code-keyword"),
            v(" ["),
            v("data", "disguise-code-variable"),
            v(", "),
            v("setData", "disguise-code-variable"),
            v("] = "),
            v("useState", "disguise-code-function"),
            v("<"),
            v("any", "disguise-code-tag"),
            v(">("),
            v("null", "disguise-code-keyword"),
            v(");"),
          ],
          [
            v("  "),
            v("const", "disguise-code-keyword"),
            v(" { "),
            v("user", "disguise-code-variable"),
            v(" } = "),
            v("useAuth", "disguise-code-function"),
            v("();"),
          ],
          b(),
          [v("  "), v("useEffect", "disguise-code-function"), v("(() => {")],
          [
            v("    "),
            v("if", "disguise-code-keyword"),
            v(" (!"),
            v("userId", "disguise-code-variable"),
            v(") "),
            v("return", "disguise-code-keyword"),
            v(";"),
          ],
          [
            v("    "),
            v("axios", "disguise-code-function"),
            v("."),
            v("get", "disguise-code-function"),
            v("("),
            v('"/api/users/"', "disguise-code-string"),
            v(" + "),
            v("userId", "disguise-code-variable"),
            v(")."),
            v("then", "disguise-code-function"),
            v("(("),
            v("res", "disguise-code-variable"),
            v(") => {"),
          ],
          [
            v("      "),
            v("setData", "disguise-code-function"),
            v("("),
            v("res", "disguise-code-variable"),
            v("."),
            v("data", "disguise-code-variable"),
            v(");"),
          ],
          [v("      "), v("onLoaded", "disguise-code-variable"), v("?.();")],
          [v("    });", "disguise-code-keyword")],
          [v("  }, [userId]);", "disguise-code-keyword")],
          b(),
          [
            v("  "),
            v("if", "disguise-code-keyword"),
            v(" (!"),
            v("data", "disguise-code-variable"),
            v(") "),
            v("return", "disguise-code-keyword"),
            v(" <"),
            v("Spinner", "disguise-code-tag"),
            v(" />;"),
          ],
          b(),
          [v("  "), v("return", "disguise-code-keyword"), v(" (")],
          [
            v("    <"),
            v("div", "disguise-code-tag"),
            v(" "),
            v("className", "disguise-code-variable"),
            v("="),
            v('"home-page"', "disguise-code-string"),
            v(">"),
          ],
          [
            v("      <"),
            v("Header", "disguise-code-tag"),
            v(" "),
            v("user", "disguise-code-variable"),
            v("={user} />"),
          ],
          [
            v("      <"),
            v("main", "disguise-code-tag"),
            v("><"),
            v("Card", "disguise-code-tag"),
            v(">{"),
            v("data", "disguise-code-variable"),
            v("."),
            v("name", "disguise-code-variable"),
            v("}</"),
            v("Card", "disguise-code-tag"),
            v("></"),
            v("main", "disguise-code-tag"),
            v(">"),
          ],
          [v("    </div>", "disguise-code-keyword")],
          [v("  );", "disguise-code-keyword")],
          [v("};", "disguise-code-keyword")],
        ],
        path: ["src", "pages", "Home.tsx"],
      },
      "App.tsx": {
        language: "TypeScript React",
        lines: [
          g("// frontend-service - Application root"),
          [
            v("import", "disguise-code-keyword"),
            v(" "),
            v("React", "disguise-code-variable"),
            v(" "),
            v("from", "disguise-code-keyword"),
            v(" "),
            v('"react"', "disguise-code-string"),
            v(";"),
          ],
          [
            v("import", "disguise-code-keyword"),
            v(" { "),
            v("BrowserRouter", "disguise-code-variable"),
            v(" } "),
            v("from", "disguise-code-keyword"),
            v(" "),
            v('"react-router-dom"', "disguise-code-string"),
            v(";"),
          ],
          [
            v("import", "disguise-code-keyword"),
            v(" { "),
            v("Home", "disguise-code-variable"),
            v(" } "),
            v("from", "disguise-code-keyword"),
            v(" "),
            v('"@/pages/Home"', "disguise-code-string"),
            v(";"),
          ],
          [
            v("import", "disguise-code-keyword"),
            v(" { "),
            v("Dashboard", "disguise-code-variable"),
            v(" } "),
            v("from", "disguise-code-keyword"),
            v(" "),
            v('"@/pages/Dashboard"', "disguise-code-string"),
            v(";"),
          ],
          [
            v("import", "disguise-code-keyword"),
            v(" { "),
            v("AuthProvider", "disguise-code-variable"),
            v(" } "),
            v("from", "disguise-code-keyword"),
            v(" "),
            v('"@/store/auth"', "disguise-code-string"),
            v(";"),
          ],
          b(),
          [
            v("export const", "disguise-code-keyword"),
            v(" "),
            v("App", "disguise-code-function"),
            v(" = () => {"),
          ],
          [v("  "), v("return", "disguise-code-keyword"), v(" (")],
          [v("    <"), v("AuthProvider", "disguise-code-tag"), v(">")],
          [v("      <"), v("BrowserRouter", "disguise-code-tag"), v(">")],
          [v("        <"), v("Routes", "disguise-code-tag"), v(">")],
          [
            v("          <"),
            v("Route", "disguise-code-tag"),
            v(" "),
            v("path", "disguise-code-variable"),
            v("="),
            v('"/"', "disguise-code-string"),
            v(" "),
            v("element", "disguise-code-variable"),
            v("={<"),
            v("Home", "disguise-code-tag"),
            v(" />} />"),
          ],
          [
            v("          <"),
            v("Route", "disguise-code-tag"),
            v(" "),
            v("path", "disguise-code-variable"),
            v("="),
            v('"/dashboard"', "disguise-code-string"),
            v(" "),
            v("element", "disguise-code-variable"),
            v("={<"),
            v("Dashboard", "disguise-code-tag"),
            v(" />} />"),
          ],
          [v("        </"), v("Routes", "disguise-code-tag"), v(">")],
          [v("      </"), v("BrowserRouter", "disguise-code-tag"), v(">")],
          [v("    </"), v("AuthProvider", "disguise-code-tag"), v(">")],
          [v("  );", "disguise-code-keyword")],
          [v("};", "disguise-code-keyword")],
        ],
        path: ["src", "App.tsx"],
      },
      "useAuth.ts": {
        language: "TypeScript",
        lines: [
          g("// frontend-service - Auth hook"),
          [
            v("import", "disguise-code-keyword"),
            v(" { "),
            v("useContext", "disguise-code-variable"),
            v(" } "),
            v("from", "disguise-code-keyword"),
            v(" "),
            v('"react"', "disguise-code-string"),
            v(";"),
          ],
          [
            v("import", "disguise-code-keyword"),
            v(" { "),
            v("AuthContext", "disguise-code-variable"),
            v(" } "),
            v("from", "disguise-code-keyword"),
            v(" "),
            v('"@/store/auth"', "disguise-code-string"),
            v(";"),
          ],
          b(),
          [
            v("export const", "disguise-code-keyword"),
            v(" "),
            v("useAuth", "disguise-code-function"),
            v(" = () => {"),
          ],
          [
            v("  "),
            v("const", "disguise-code-keyword"),
            v(" ctx = "),
            v("useContext", "disguise-code-function"),
            v("("),
            v("AuthContext", "disguise-code-variable"),
            v(");"),
          ],
          [
            v("  "),
            v("if", "disguise-code-keyword"),
            v(" (!ctx) "),
            v("throw", "disguise-code-keyword"),
            v(" "),
            v("new", "disguise-code-keyword"),
            v(" "),
            v("Error", "disguise-code-function"),
            v("("),
            v('"useAuth must be used within AuthProvider"', "disguise-code-string"),
            v(");"),
          ],
          [v("  "), v("return", "disguise-code-keyword"), v(" ctx;")],
          [v("};", "disguise-code-keyword")],
        ],
        path: ["src", "hooks", "useAuth.ts"],
      },
      "request.ts": {
        language: "TypeScript",
        lines: [
          g("// frontend-service - HTTP client"),
          [
            v("import", "disguise-code-keyword"),
            v(" "),
            v("axios", "disguise-code-variable"),
            v(" "),
            v("from", "disguise-code-keyword"),
            v(" "),
            v('"axios"', "disguise-code-string"),
            v(";"),
          ],
          b(),
          [
            v("const", "disguise-code-keyword"),
            v(" "),
            v("instance", "disguise-code-variable"),
            v(" = "),
            v("axios", "disguise-code-variable"),
            v("."),
            v("create", "disguise-code-function"),
            v("({"),
          ],
          [
            v("  "),
            v("baseURL", "disguise-code-variable"),
            v(": "),
            v("process", "disguise-code-variable"),
            v("."),
            v("env", "disguise-code-variable"),
            v("."),
            v("REACT_APP_API_URL", "disguise-code-variable"),
            v(","),
          ],
          [
            v("  "),
            v("timeout", "disguise-code-variable"),
            v(": "),
            v("10000", "disguise-code-string"),
            v(","),
          ],
          [v("});", "disguise-code-keyword")],
          b(),
          [
            v("instance", "disguise-code-variable"),
            v("."),
            v("interceptors", "disguise-code-variable"),
            v("."),
            v("request", "disguise-code-variable"),
            v("."),
            v("use", "disguise-code-function"),
            v("(("),
            v("config", "disguise-code-variable"),
            v(") => {"),
          ],
          [
            v("  "),
            v("const", "disguise-code-keyword"),
            v(" "),
            v("token", "disguise-code-variable"),
            v(" = "),
            v("localStorage", "disguise-code-variable"),
            v("."),
            v("getItem", "disguise-code-function"),
            v("("),
            v('"token"', "disguise-code-string"),
            v(");"),
          ],
          [
            v("  "),
            v("if", "disguise-code-keyword"),
            v(" ("),
            v("token", "disguise-code-variable"),
            v(") {"),
          ],
          [
            v("    "),
            v("config", "disguise-code-variable"),
            v("."),
            v("headers", "disguise-code-variable"),
            v("."),
            v("Authorization", "disguise-code-variable"),
            v(" = "),
            v("`Bearer ${token}`", "disguise-code-string"),
            v(";"),
          ],
          [v("  }", "disguise-code-keyword")],
          [
            v("  "),
            v("return", "disguise-code-keyword"),
            v(" "),
            v("config", "disguise-code-variable"),
            v(";"),
          ],
          [v("});", "disguise-code-keyword")],
          b(),
          [
            v("export", "disguise-code-keyword"),
            v(" "),
            v("default", "disguise-code-keyword"),
            v(" "),
            v("instance", "disguise-code-variable"),
            v(";"),
          ],
        ],
        path: ["src", "services", "request.ts"],
      },
      "package.json": {
        language: "JSON",
        lines: [
          [v("{", "disguise-code-keyword")],
          [
            v("  "),
            v('"name"', "disguise-code-string"),
            v(": "),
            v('"frontend-service"', "disguise-code-string"),
            v(","),
          ],
          [
            v("  "),
            v('"version"', "disguise-code-string"),
            v(": "),
            v('"1.4.2"', "disguise-code-string"),
            v(","),
          ],
          [
            v("  "),
            v('"private"', "disguise-code-string"),
            v(": "),
            v("true", "disguise-code-keyword"),
            v(","),
          ],
          [v("  "), v('"scripts"', "disguise-code-string"), v(": {")],
          [
            v("    "),
            v('"dev"', "disguise-code-string"),
            v(": "),
            v('"vite"', "disguise-code-string"),
            v(","),
          ],
          [
            v("    "),
            v('"build"', "disguise-code-string"),
            v(": "),
            v('"tsc && vite build"', "disguise-code-string"),
            v(","),
          ],
          [
            v("    "),
            v('"test"', "disguise-code-string"),
            v(": "),
            v('"jest"', "disguise-code-string"),
          ],
          [v("  }", "disguise-code-keyword"), v(",")],
          [v("  "), v('"dependencies"', "disguise-code-string"), v(": {")],
          [
            v("    "),
            v('"react"', "disguise-code-string"),
            v(": "),
            v('"^18.2.0"', "disguise-code-string"),
            v(","),
          ],
          [
            v("    "),
            v('"react-dom"', "disguise-code-string"),
            v(": "),
            v('"^18.2.0"', "disguise-code-string"),
            v(","),
          ],
          [
            v("    "),
            v('"react-router-dom"', "disguise-code-string"),
            v(": "),
            v('"^6.20.0"', "disguise-code-string"),
            v(","),
          ],
          [
            v("    "),
            v('"axios"', "disguise-code-string"),
            v(": "),
            v('"^1.6.0"', "disguise-code-string"),
          ],
          [v("  }", "disguise-code-keyword")],
          [v("}", "disguise-code-keyword")],
        ],
        path: ["package.json"],
      },
      "README.md": {
        language: "Markdown",
        lines: [
          [v("# frontend-service", "disguise-code-keyword")],
          b(),
          [v("Internal admin dashboard for the platform team.", "disguise-code-comment")],
          b(),
          [v("## Getting started", "disguise-code-keyword")],
          b(),
          [v("```bash", "disguise-code-string")],
          [v("npm install", "disguise-code-function")],
          [v("npm run dev", "disguise-code-function")],
          [v("```", "disguise-code-string")],
          b(),
          [v("## Scripts", "disguise-code-keyword")],
          b(),
          [v("- "), v("`npm run dev`", "disguise-code-string"), v(" - start dev server")],
          [v("- "), v("`npm run build`", "disguise-code-string"), v(" - production build")],
          [v("- "), v("`npm test`", "disguise-code-string"), v(" - run unit tests")],
        ],
        path: ["README.md"],
      },
    },
    w = [
      {
        name: ".vscode",
        type: "folder",
        children: [
          {
            name: "settings.json",
            type: "file",
          },
          {
            name: "extensions.json",
            type: "file",
          },
          {
            name: "launch.json",
            type: "file",
          },
        ],
      },
      {
        name: ".github",
        type: "folder",
        children: [
          {
            name: "workflows",
            type: "folder",
            children: [
              {
                name: "ci.yml",
                type: "file",
              },
              {
                name: "deploy.yml",
                type: "file",
              },
            ],
          },
          {
            name: "CODEOWNERS",
            type: "file",
          },
          {
            name: "PULL_REQUEST_TEMPLATE.md",
            type: "file",
          },
        ],
      },
      {
        name: "public",
        type: "folder",
        children: [
          {
            name: "favicon.ico",
            type: "file",
          },
          {
            name: "index.html",
            type: "file",
          },
          {
            name: "robots.txt",
            type: "file",
          },
          {
            name: "assets",
            type: "folder",
            children: [
              {
                name: "logo.svg",
                type: "file",
              },
              {
                name: "empty.png",
                type: "file",
                badge: "1.2k",
              },
            ],
          },
        ],
      },
      {
        name: "docs",
        type: "folder",
        children: [
          {
            name: "README.md",
            type: "file",
          },
          {
            name: "ARCHITECTURE.md",
            type: "file",
          },
          {
            name: "CHANGELOG.md",
            type: "file",
            status: "M",
          },
          {
            name: "CONTRIBUTING.md",
            type: "file",
          },
        ],
      },
      {
        name: "scripts",
        type: "folder",
        children: [
          {
            name: "build.ts",
            type: "file",
          },
          {
            name: "deploy.ts",
            type: "file",
          },
          {
            name: "release.ts",
            type: "file",
            status: "M",
          },
        ],
      },
      {
        name: "src",
        type: "folder",
        open: !0,
        children: [
          {
            name: "components",
            type: "folder",
            open: !0,
            children: [
              {
                name: "Button.tsx",
                type: "file",
                status: "M",
              },
              {
                name: "Card.tsx",
                type: "file",
              },
              {
                name: "Modal.tsx",
                type: "file",
              },
              {
                name: "Input.tsx",
                type: "file",
              },
              {
                name: "Avatar.tsx",
                type: "file",
              },
              {
                name: "Tabs.tsx",
                type: "file",
              },
              {
                name: "__tests__",
                type: "folder",
                children: [
                  {
                    name: "Button.test.tsx",
                    type: "file",
                  },
                  {
                    name: "Modal.test.tsx",
                    type: "file",
                    badge: "✓",
                  },
                ],
              },
            ],
          },
          {
            name: "pages",
            type: "folder",
            open: !0,
            children: [
              {
                name: "Home.tsx",
                type: "file",
              },
              {
                name: "Login.tsx",
                type: "file",
              },
              {
                name: "Dashboard.tsx",
                type: "file",
                status: "M",
              },
              {
                name: "Settings.tsx",
                type: "file",
              },
              {
                name: "NotFound.tsx",
                type: "file",
              },
            ],
          },
          {
            name: "hooks",
            type: "folder",
            children: [
              {
                name: "useAuth.ts",
                type: "file",
              },
              {
                name: "useFetch.ts",
                type: "file",
              },
              {
                name: "useDebounce.ts",
                type: "file",
                status: "U",
              },
              {
                name: "useLocalStorage.ts",
                type: "file",
              },
            ],
          },
          {
            name: "store",
            type: "folder",
            children: [
              {
                name: "index.ts",
                type: "file",
              },
              {
                name: "userSlice.ts",
                type: "file",
                status: "M",
              },
              {
                name: "cartSlice.ts",
                type: "file",
              },
            ],
          },
          {
            name: "services",
            type: "folder",
            children: [
              {
                name: "request.ts",
                type: "file",
              },
              {
                name: "auth.ts",
                type: "file",
              },
              {
                name: "order.ts",
                type: "file",
                status: "M",
              },
            ],
          },
          {
            name: "utils",
            type: "folder",
            children: [
              {
                name: "format.ts",
                type: "file",
              },
              {
                name: "storage.ts",
                type: "file",
              },
              {
                name: "constants.ts",
                type: "file",
              },
              {
                name: "helpers.ts",
                type: "file",
                status: "U",
              },
            ],
          },
          {
            name: "styles",
            type: "folder",
            children: [
              {
                name: "global.css",
                type: "file",
              },
              {
                name: "variables.less",
                type: "file",
                status: "M",
              },
              {
                name: "mixins.less",
                type: "file",
              },
            ],
          },
          {
            name: "types",
            type: "folder",
            children: [
              {
                name: "index.ts",
                type: "file",
              },
              {
                name: "api.d.ts",
                type: "file",
              },
              {
                name: "global.d.ts",
                type: "file",
              },
            ],
          },
          {
            name: "router",
            type: "folder",
            children: [
              {
                name: "index.tsx",
                type: "file",
                status: "M",
              },
              {
                name: "routes.ts",
                type: "file",
              },
            ],
          },
          {
            name: "App.tsx",
            type: "file",
            status: "M",
          },
          {
            name: "main.tsx",
            type: "file",
          },
          {
            name: "vite-env.d.ts",
            type: "file",
          },
        ],
      },
      {
        name: "tests",
        type: "folder",
        children: [
          {
            name: "setup.ts",
            type: "file",
          },
          {
            name: "e2e.spec.ts",
            type: "file",
            badge: "e2e",
          },
        ],
      },
      {
        name: "node_modules",
        type: "folder",
        badge: "1.2k",
        children: [
          {
            name: "react",
            type: "folder",
            children: [
              {
                name: "index.js",
                type: "file",
              },
            ],
          },
          {
            name: "react-dom",
            type: "folder",
            children: [
              {
                name: "index.js",
                type: "file",
              },
            ],
          },
        ],
      },
      {
        name: "dist",
        type: "folder",
        badge: "build",
        children: [
          {
            name: "bundle.js",
            type: "file",
            badge: "412k",
          },
          {
            name: "index.html",
            type: "file",
          },
        ],
      },
      {
        name: ".env",
        type: "file",
        badge: "local",
      },
      {
        name: ".env.example",
        type: "file",
      },
      {
        name: ".eslintrc.cjs",
        type: "file",
      },
      {
        name: ".prettierrc",
        type: "file",
      },
      {
        name: ".gitignore",
        type: "file",
      },
      {
        name: "package.json",
        type: "file",
        status: "M",
      },
      {
        name: "package-lock.json",
        type: "file",
        badge: "328k",
      },
      {
        name: "tsconfig.json",
        type: "file",
      },
      {
        name: "vite.config.ts",
        type: "file",
      },
      {
        name: "README.md",
        type: "file",
      },
      {
        name: "LICENSE",
        type: "file",
      },
    ],
    x = function (e) {
      var t = e.open;
      return u.createElement(
        "svg",
        {
          width: "14",
          height: "14",
          viewBox: "0 0 16 16",
          fill: "none",
          className: "disguise-tree-chevron",
          style: {
            transform: t ? "rotate(90deg)" : "rotate(0deg)",
          },
        },
        u.createElement("path", {
          d: "M6 4 L10 8 L6 12",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
      );
    },
    C = function (e) {
      var t = e.name,
        n = (function (e) {
          return e.endsWith(".tsx") ||
            e.endsWith(".ts") ||
            e.endsWith(".css") ||
            e.endsWith(".less")
            ? "#519aba"
            : e.endsWith(".json")
              ? "#cbcb41"
              : e.endsWith(".md")
                ? "#519aba"
                : e.endsWith(".html")
                  ? "#e34c26"
                  : e.endsWith(".svg")
                    ? "#ffb13b"
                    : e.endsWith(".yml") || e.endsWith(".yaml")
                      ? "#519aba"
                      : e.startsWith(".env")
                        ? "#e37900"
                        : "#999";
        })(t);
      return t.endsWith(".tsx") || t.endsWith(".ts")
        ? u.createElement(
            "svg",
            {
              width: "14",
              height: "14",
              viewBox: "0 0 16 16",
              className: "disguise-tree-file-icon",
            },
            u.createElement("rect", {
              x: "2",
              y: "2",
              width: "12",
              height: "12",
              rx: "1",
              fill: n,
              opacity: "0.15",
            }),
            u.createElement(
              "text",
              {
                x: "8",
                y: "11",
                textAnchor: "middle",
                fontSize: "7",
                fill: n,
                fontWeight: "700",
              },
              "TS",
            ),
          )
        : t.endsWith(".json")
          ? u.createElement(
              "svg",
              {
                width: "14",
                height: "14",
                viewBox: "0 0 16 16",
                className: "disguise-tree-file-icon",
              },
              u.createElement("rect", {
                x: "2",
                y: "2",
                width: "12",
                height: "12",
                rx: "1",
                fill: n,
                opacity: "0.15",
              }),
              u.createElement(
                "text",
                {
                  x: "8",
                  y: "11",
                  textAnchor: "middle",
                  fontSize: "6",
                  fill: n,
                  fontWeight: "700",
                },
                "{}",
              ),
            )
          : t.endsWith(".md")
            ? u.createElement(
                "svg",
                {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 16 16",
                  className: "disguise-tree-file-icon",
                },
                u.createElement("rect", {
                  x: "2",
                  y: "2",
                  width: "12",
                  height: "12",
                  rx: "1",
                  fill: n,
                  opacity: "0.15",
                }),
                u.createElement(
                  "text",
                  {
                    x: "8",
                    y: "11",
                    textAnchor: "middle",
                    fontSize: "9",
                    fill: n,
                    fontWeight: "700",
                  },
                  "M",
                ),
              )
            : u.createElement(
                "svg",
                {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 16 16",
                  className: "disguise-tree-file-icon",
                },
                u.createElement("rect", {
                  x: "3",
                  y: "2",
                  width: "10",
                  height: "12",
                  rx: "1",
                  fill: n,
                  opacity: "0.2",
                }),
              );
    },
    E = function (e) {
      return "M" === e
        ? "#e2c08d"
        : "U" === e || "A" === e
          ? "#73c991"
          : "D" === e
            ? "#f48771"
            : "#888";
    },
    S = u.createContext({
      activeFile: null,
      setActiveFile: function () {},
    }),
    A = function (e) {
      var t = e.node,
        n = e.depth,
        r = o(u.useState(Boolean(t.open)), 2),
        a = r[0],
        i = r[1],
        l = u.useContext(S),
        c = l.activeFile,
        s = l.setActiveFile,
        d = u.useCallback(
          function () {
            "file" === t.type && s(t.name);
          },
          [t, s],
        );
      if ("file" === t.type) {
        var f = c === t.name,
          m = Boolean(y[t.name]);
        return u.createElement(
          "div",
          {
            className: "disguise-tree-row"
              .concat(f ? " disguise-tree-row-active" : "")
              .concat(m ? "" : " disguise-tree-row-dim"),
            style: {
              paddingLeft: 12 * n + 8,
            },
            onClick: m ? d : void 0,
            role: m ? "button" : void 0,
            tabIndex: m ? 0 : -1,
          },
          n > 0 &&
            u.createElement("span", {
              className: "disguise-tree-indent",
            }),
          u.createElement(C, {
            name: t.name,
          }),
          u.createElement(
            "span",
            {
              className: "disguise-tree-label",
            },
            t.name,
          ),
          t.status &&
            u.createElement(
              "span",
              {
                className: "disguise-tree-status",
                style: {
                  color: E(t.status),
                },
                title: t.status,
              },
              t.status,
            ),
          t.badge &&
            u.createElement(
              "span",
              {
                className: "disguise-tree-badge",
              },
              t.badge,
            ),
        );
      }
      return u.createElement(
        "div",
        null,
        u.createElement(
          "div",
          {
            className: "disguise-tree-row disguise-tree-row-folder",
            style: {
              paddingLeft: 12 * n + 8,
            },
            onClick: function () {
              i(function (e) {
                return !e;
              });
            },
            role: "button",
            tabIndex: 0,
          },
          n > 0 &&
            u.createElement("span", {
              className: "disguise-tree-indent",
            }),
          u.createElement(x, {
            open: a,
          }),
          u.createElement(
            "span",
            {
              className: "disguise-tree-label disguise-tree-folder-label",
            },
            t.name,
          ),
          t.status &&
            u.createElement(
              "span",
              {
                className: "disguise-tree-status",
                style: {
                  color: E(t.status),
                },
                title: t.status,
              },
              t.status,
            ),
          t.badge &&
            u.createElement(
              "span",
              {
                className: "disguise-tree-badge",
              },
              t.badge,
            ),
        ),
        a &&
          t.children &&
          u.createElement(
            "div",
            null,
            t.children.map(function (e) {
              return u.createElement(A, {
                key: e.name,
                node: e,
                depth: n + 1,
              });
            }),
          ),
      );
    },
    k = function () {
      var e,
        n = (0, t.useDisguise)(),
        r = n.disguiseEnabled,
        l = n.disableDisguise,
        c = o(u.useState("Home.tsx"), 2),
        s = c[0],
        d = c[1],
        f = o(
          u.useState([
            {
              name: "Home.tsx",
            },
            {
              name: "App.tsx",
              dirty: !0,
            },
            {
              name: "Dashboard.tsx",
              dirty: !0,
            },
            {
              name: "README.md",
            },
            {
              name: "package.json",
            },
          ]),
          2,
        ),
        m = f[0],
        h = f[1],
        p = o(u.useState("Home.tsx"), 2),
        v = p[0],
        g = p[1],
        b = o(u.useState(new Date()), 2),
        E = b[0],
        k = b[1];
      if (
        (u.useEffect(
          function () {
            if (r) {
              var e = setInterval(function () {
                return k(new Date());
              }, 3e4);
              return function () {
                return clearInterval(e);
              };
            }
          },
          [r],
        ),
        u.useEffect(
          function () {
            if (r) {
              var e = function (e) {
                "Escape" === e.key && l();
              };
              return (
                window.addEventListener("keydown", e),
                function () {
                  return window.removeEventListener("keydown", e);
                }
              );
            }
          },
          [r, l],
        ),
        !r)
      )
        return null;
      var $ = null !== (e = y[s]) && void 0 !== e ? e : y["Home.tsx"],
        z = $.path,
        M = E.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: !1,
        }),
        O = {
          activeFile: s,
          setActiveFile: function (e) {
            y[e] &&
              (d(e),
              g(e),
              h(function (t) {
                return t.some(function (t) {
                  return t.name === e;
                })
                  ? t
                  : [].concat(
                      (function (e) {
                        if (Array.isArray(e)) return i(e);
                      })((n = t)) ||
                        (function (e) {
                          if (
                            ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
                            null != e["@@iterator"]
                          )
                            return Array.from(e);
                        })(n) ||
                        a(n) ||
                        (function () {
                          throw new TypeError(
                            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                          );
                        })(),
                      [
                        {
                          name: e,
                        },
                      ],
                    );
                var n;
              }));
          },
        };
      return u.createElement(
        "div",
        {
          className: "disguise-overlay",
          onClick: l,
        },
        u.createElement(
          "div",
          {
            className: "disguise-sidebar",
          },
          u.createElement(
            "div",
            {
              className: "disguise-sidebar-section",
            },
            u.createElement(
              "div",
              {
                className: "disguise-sidebar-header",
              },
              u.createElement("span", null, "资源管理器"),
            ),
          ),
          u.createElement(
            "div",
            {
              className: "disguise-sidebar-section",
            },
            u.createElement(
              "div",
              {
                className: "disguise-project-title",
              },
              u.createElement(x, {
                open: !0,
              }),
              u.createElement("span", null, "frontend-service"),
            ),
            u.createElement(
              "div",
              {
                className: "disguise-tree",
              },
              u.createElement(
                S.Provider,
                {
                  value: O,
                },
                w.map(function (e) {
                  return u.createElement(A, {
                    key: e.name,
                    node: e,
                    depth: 0,
                  });
                }),
              ),
            ),
          ),
        ),
        u.createElement(
          "div",
          {
            className: "disguise-main",
          },
          u.createElement(
            "div",
            {
              className: "disguise-tabs",
            },
            m.map(function (e) {
              return u.createElement(
                "div",
                {
                  key: e.name,
                  className: "disguise-tab"
                    .concat(v === e.name ? " disguise-tab-active" : "")
                    .concat(e.dirty ? " disguise-tab-dirty" : ""),
                  onClick: function () {
                    return ((t = e.name), g(t), void d(t));
                    var t;
                  },
                  role: "button",
                  tabIndex: 0,
                },
                u.createElement(C, {
                  name: e.name,
                }),
                u.createElement(
                  "span",
                  {
                    className: "disguise-tab-label",
                  },
                  e.name,
                ),
                u.createElement(
                  "button",
                  {
                    type: "button",
                    className: "disguise-tab-close",
                    onClick: function () {
                      return (
                        (t = e.name),
                        void h(function (e) {
                          var n = e.filter(function (e) {
                            return e.name !== t;
                          });
                          if (v === t && n.length > 0) {
                            var r = n[n.length - 1];
                            (g(r.name), d(r.name));
                          }
                          return n;
                        })
                      );
                      var t;
                    },
                    "aria-label": "关闭标签",
                  },
                  e.dirty
                    ? u.createElement(
                        "svg",
                        {
                          width: "14",
                          height: "14",
                          viewBox: "0 0 16 16",
                          fill: "none",
                        },
                        u.createElement("circle", {
                          cx: "8",
                          cy: "8",
                          r: "3.5",
                          fill: "currentColor",
                        }),
                      )
                    : u.createElement(
                        "svg",
                        {
                          width: "14",
                          height: "14",
                          viewBox: "0 0 16 16",
                          fill: "none",
                        },
                        u.createElement("path", {
                          d: "M4 4 L12 12 M12 4 L4 12",
                          stroke: "currentColor",
                          strokeWidth: "1.2",
                          strokeLinecap: "round",
                        }),
                      ),
                ),
              );
            }),
          ),
          u.createElement(
            "div",
            {
              className: "disguise-breadcrumb",
            },
            u.createElement("span", null, "frontend-service"),
            z.map(function (e, t) {
              return u.createElement(
                u.Fragment,
                {
                  key: e,
                },
                u.createElement(
                  "span",
                  {
                    className: "disguise-breadcrumb-sep",
                  },
                  "›",
                ),
                u.createElement(
                  "span",
                  {
                    className: t === z.length - 1 ? "disguise-breadcrumb-current" : "",
                  },
                  e,
                ),
              );
            }),
          ),
          u.createElement(
            "div",
            {
              className: "disguise-editor",
            },
            $.lines.map(function (e, t) {
              return u.createElement(
                "div",
                {
                  className: "disguise-line",
                  key: t,
                },
                u.createElement(
                  "span",
                  {
                    className: "disguise-line-number",
                  },
                  t + 1,
                ),
                u.createElement(
                  "span",
                  {
                    className: "disguise-line-content",
                  },
                  e.map(function (e, t) {
                    return u.createElement(
                      "span",
                      {
                        key: t,
                        className: e.className,
                      },
                      e.text,
                    );
                  }),
                ),
              );
            }),
          ),
          u.createElement(
            "div",
            {
              className: "disguise-statusbar",
            },
            u.createElement(
              "div",
              {
                className: "disguise-statusbar-left",
              },
              u.createElement(
                "span",
                {
                  className: "disguise-statusbar-branch",
                },
                u.createElement(
                  "svg",
                  {
                    width: "12",
                    height: "12",
                    viewBox: "0 0 16 16",
                    fill: "none",
                  },
                  u.createElement("circle", {
                    cx: "4",
                    cy: "4",
                    r: "2",
                    stroke: "currentColor",
                    strokeWidth: "1",
                  }),
                  u.createElement("circle", {
                    cx: "12",
                    cy: "4",
                    r: "2",
                    stroke: "currentColor",
                    strokeWidth: "1",
                  }),
                  u.createElement("circle", {
                    cx: "8",
                    cy: "12",
                    r: "2",
                    stroke: "currentColor",
                    strokeWidth: "1",
                  }),
                  u.createElement("path", {
                    d: "M4 6 L4 8 L8 12 L12 8 L12 6",
                    stroke: "currentColor",
                    strokeWidth: "1",
                    fill: "none",
                  }),
                ),
                "main",
              ),
              u.createElement(
                "span",
                {
                  className: "disguise-statusbar-sep",
                },
                "|",
              ),
              u.createElement("span", null, "2 modifications"),
              u.createElement(
                "span",
                {
                  className: "disguise-statusbar-sep",
                },
                "|",
              ),
              u.createElement("span", null, "0 errors"),
              u.createElement("span", null, "0 warnings"),
            ),
            u.createElement(
              "div",
              {
                className: "disguise-statusbar-right",
              },
              u.createElement("span", null, "Ln ", $.lines.length),
              u.createElement("span", null, "Col 1"),
              u.createElement("span", null, "UTF-8"),
              u.createElement("span", null, "LF"),
              u.createElement("span", null, $.language),
              u.createElement("span", null, M),
            ),
          ),
        ),
      );
    };
  t.DisguiseProvider = function (e) {
    var t = e.children,
      n = (function () {
        try {
          var e,
            t,
            n = null === (e = h.getState) || void 0 === e ? void 0 : e.call(h);
          return null !== (t = null == n ? void 0 : n[m]) && void 0 !== t
            ? t
            : {
                enabled: !1,
                mode: null,
              };
        } catch (e) {
          return {
            enabled: !1,
            mode: null,
          };
        }
      })(),
      r = o(u.useState(n.enabled), 2),
      a = r[0],
      i = r[1],
      l = o(u.useState(n.mode), 2),
      c = l[0],
      s = l[1],
      d = u.useCallback(function (e) {
        (i(!0),
          s(e),
          p({
            enabled: !0,
            mode: e,
          }));
      }, []),
      v = u.useCallback(function () {
        (i(!1),
          s(null),
          p({
            enabled: !1,
            mode: null,
          }));
      }, []),
      g = u.useCallback(
        function () {
          a ? v() : d("vscode");
        },
        [a, d, v],
      ),
      b = u.useMemo(
        function () {
          return {
            disguiseEnabled: a,
            activeMode: c,
            startDisguise: g,
            enableDisguise: d,
            disableDisguise: v,
          };
        },
        [a, c, g, d, v],
      );
    return u.createElement(
      f.Provider,
      {
        value: b,
      },
      t,
      u.createElement(k, null),
    );
  };
};
