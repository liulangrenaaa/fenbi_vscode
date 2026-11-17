// 从安装包提取的模块 829；导出：useStudyTimer、formatStudyTime。
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
    (t.useStudyTimer = t.formatStudyTime = void 0));
  const a = n(6540);
  var i = function (e, t) {
    return null === t ? e : e + Date.now() - t;
  };
  ((t.formatStudyTime = function (e) {
    return [Math.floor(e / 3600), Math.floor((e % 3600) / 60), e % 60]
      .map(function (e) {
        return String(e).padStart(2, "0");
      })
      .join(":");
  }),
    (t.useStudyTimer = function () {
      var e = r(a.useState(0), 2),
        t = e[0],
        n = e[1],
        o = r(a.useState(!1), 2),
        l = o[0],
        c = o[1],
        s = r(a.useState(!1), 2),
        u = s[0],
        d = s[1],
        f = a.useRef(0),
        m = a.useRef(null),
        h = a.useRef(!1),
        p = a.useRef(null),
        v = a.useCallback(function () {
          null !== p.current && (clearInterval(p.current), (p.current = null));
        }, []),
        g = a.useCallback(function () {
          var e = i(f.current, m.current);
          n(Math.floor(e / 1e3));
        }, []),
        b = a.useCallback(
          function () {
            (v(), (p.current = setInterval(g, 1e3)));
          },
          [v, g],
        ),
        y = a.useCallback(
          function () {
            h.current || ((h.current = !0), (m.current = Date.now()), c(!0), d(!0), b());
          },
          [b],
        ),
        w = a.useCallback(
          function () {
            if (h.current && null !== m.current) {
              var e = i(f.current, m.current);
              ((f.current = e), (m.current = null), n(Math.floor(e / 1e3)), d(!1), v());
            }
          },
          [v],
        ),
        x = a.useCallback(
          function () {
            h.current && null === m.current && ((m.current = Date.now()), d(!0), b());
          },
          [b],
        ),
        C = a.useCallback(
          function () {
            (v(), (f.current = 0), (m.current = null), (h.current = !1), n(0), c(!1), d(!1));
          },
          [v],
        );
      return (
        a.useEffect(
          function () {
            return function () {
              (v(), (m.current = null));
            };
          },
          [v],
        ),
        {
          elapsedSeconds: t,
          isStarted: l,
          isRunning: u,
          start: y,
          pause: w,
          resume: x,
          destroy: C,
        }
      );
    }));
};
