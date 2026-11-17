// 从安装包提取的模块 4784；导出：History。
(e, t, n) => {
  "use strict";

  function r(e, t) {
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
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return o(e, t);
          var n = {}.toString.call(e).slice(8, -1);
          return (
            "Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(e)
              : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? o(e, t)
                : void 0
          );
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function o(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.History = void 0));
  const a = n(6540),
    i = n(1508),
    l = n(8038),
    c = n(4976),
    s = n(3640),
    u = n(8595),
    d = n(5114);
  var f = (0, u.getVscodeApi)();
  t.History = function () {
    var e = r(i.message.useMessage(), 2),
      t = e[0],
      n = e[1],
      o = r(a.useState([]), 2),
      u = o[0],
      m = o[1],
      h = r(a.useState(!0), 2),
      p = h[0],
      v = h[1],
      g = (0, s.useSetting)().setting,
      b = (0, c.useNavigate)(),
      y = (0, c.useLocation)().state || {},
      w = y.count,
      x = y.categoryId;
    return (
      a.useEffect(function () {
        f.postMessage({
          command: "history",
          postData: {
            category: g.categoryId,
            count: w,
            categoryId: x,
          },
        });
      }, []),
      (0, d.useVscodeMessage)(function (e) {
        var n;
        (v(!1),
          "message" === e.command &&
            t.info((null === (n = e.data) || void 0 === n ? void 0 : n.message) || ""),
          "history" === e.command && m(e.data || []));
      }),
      a.createElement(
        "div",
        null,
        a.createElement(
          i.Spin,
          {
            tip: "loading...",
            spinning: p,
          },
          a.createElement(
            "div",
            {
              className: "menu-container",
            },
            a.createElement(
              i.Button,
              {
                type: "text",
                onClick: function () {
                  b(-1);
                },
              },
              "返回上一页",
            ),
            u.map(function (e, t) {
              return a.createElement(l.HistoryItem, {
                key: t,
                data: e,
                goExercise: function (e) {
                  var t;
                  ((t = {
                    combineKey: null == e ? void 0 : e.key,
                  }),
                    b("/detail", {
                      state: {
                        id: t.id,
                        combineKey: t.combineKey,
                      },
                    }));
                },
              });
            }),
          ),
        ),
        n,
      )
    );
  };
};
