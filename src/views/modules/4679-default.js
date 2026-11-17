// 从安装包提取的模块 4679；导出：default。
(e, t, n) => {
  "use strict";

  function r() {
    throw new TypeError(
      "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
    );
  }
  function o(e, t) {
    if (e) {
      if ("string" == typeof e) return a(e, t);
      var n = {}.toString.call(e).slice(8, -1);
      return (
        "Object" === n && e.constructor && (n = e.constructor.name),
        "Map" === n || "Set" === n
          ? Array.from(e)
          : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? a(e, t)
            : void 0
      );
    }
  }
  function a(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function i(e) {
    if (Array.isArray(e)) return e;
  }
  Object.defineProperty(t, "__esModule", {
    value: !0,
  });
  const l = n(1508),
    c = n(6540),
    s = n(3640);
  t.default = function () {
    var e,
      t,
      n =
        ((e = c.useState(!1)),
        (t = 2),
        i(e) ||
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
                } else
                  for (; !(c = (r = a.call(n)).done) && (l.push(r.value), l.length !== t); c = !0);
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
          o(e, t) ||
          r()),
      a = n[0],
      s = n[1];
    return c.createElement(
      c.Fragment,
      null,
      !a &&
        c.createElement(
          l.Button,
          {
            className: "draw_button",
            onClick: function () {
              return s(!0);
            },
          },
          "打开画板",
        ),
      a &&
        c.createElement(u, {
          onClose: function () {
            return s(!1);
          },
        }),
    );
  };
  var u = function (e) {
    var t = e.onClose,
      n = c.useRef(null),
      u = c.useRef(null),
      d = c.useRef(!1),
      f = c.useRef(null),
      m = c.useRef([]),
      h = c.useRef(null),
      p = c.useRef(null),
      v = c.useRef(1),
      g = (0, s.useSetting)().setting,
      b = String(g.canvasBrushColor || "red"),
      y = Number(g.canvasBrushWidth) || 3,
      w = c.useCallback(function () {
        var e = document.querySelector(".detail_page");
        return e && (e.scrollTop || e.scrollLeft)
          ? {
              x: e.scrollLeft,
              y: e.scrollTop,
            }
          : {
              x:
                window.scrollX ||
                document.documentElement.scrollLeft ||
                document.body.scrollLeft ||
                0,
              y:
                window.scrollY ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0,
            };
      }, []),
      x = c.useCallback(function (e, t) {
        ((e.lineWidth = t.width),
          (e.lineCap = "round"),
          (e.lineJoin = "round"),
          (e.strokeStyle = t.color),
          (e.fillStyle = t.color));
      }, []),
      C = c.useCallback(
        function (e, t, n) {
          var r = w();
          (x(e, n),
            e.beginPath(),
            e.arc(t.x - r.x, t.y - r.y, n.width / 2, 0, 2 * Math.PI),
            e.fill());
        },
        [x, w],
      ),
      E = c.useCallback(
        function (e, t, n, r) {
          var o = w();
          (x(e, r),
            e.beginPath(),
            e.moveTo(t.x - o.x, t.y - o.y),
            e.lineTo(n.x - o.x, n.y - o.y),
            e.stroke());
        },
        [x, w],
      ),
      S = c.useCallback(
        function () {
          var e = n.current,
            t = u.current;
          e &&
            t &&
            (t.clearRect(0, 0, e.width / v.current, e.height / v.current),
            m.current.forEach(function (e) {
              var n,
                l =
                  i((n = e.points)) ||
                  (function (e) {
                    if (
                      ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
                      null != e["@@iterator"]
                    )
                      return Array.from(e);
                  })(n) ||
                  o(n) ||
                  r(),
                c = l[0],
                s = a(l).slice(1);
              if (c)
                if (0 !== s.length) {
                  var u = c;
                  s.forEach(function (n) {
                    (E(t, u, n, e), (u = n));
                  });
                } else C(t, c, e);
            }));
        },
        [C, E],
      ),
      A = c.useCallback(
        function () {
          null === p.current &&
            (p.current = window.requestAnimationFrame(function () {
              ((p.current = null), S());
            }));
        },
        [S],
      );
    c.useEffect(
      function () {
        var e = n.current;
        if (e) {
          var t = e.getContext("2d");
          if (t) {
            u.current = t;
            var r = function () {
              var n = Math.min(window.devicePixelRatio || 1, 2);
              v.current = n;
              var r = window.innerWidth,
                o = window.innerHeight;
              ((e.style.width = "".concat(r, "px")),
                (e.style.height = "".concat(o, "px")),
                (e.width = Math.floor(r * n)),
                (e.height = Math.floor(o * n)),
                t.setTransform(n, 0, 0, n, 0, 0),
                S());
            };
            return (
              r(),
              window.addEventListener("resize", r),
              window.addEventListener("scroll", A, !0),
              function () {
                (window.removeEventListener("resize", r),
                  window.removeEventListener("scroll", A, !0),
                  null !== p.current && window.cancelAnimationFrame(p.current));
              }
            );
          }
        }
      },
      [S, A],
    );
    var k = function (e) {
        var t = n.current;
        if (!t) return null;
        var r = t.getBoundingClientRect(),
          o = w();
        return {
          x: e.clientX - r.left + o.x,
          y: e.clientY - r.top + o.y,
        };
      },
      $ = function () {
        ((d.current = !1), (f.current = null), (h.current = null));
      };
    return c.createElement(
      c.Fragment,
      null,
      c.createElement(
        "div",
        {
          style: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 998,
          },
          className: "bg_transparent",
        },
        c.createElement("canvas", {
          ref: n,
          style: {
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 998,
            touchAction: "none",
            pointerEvents: "auto",
          },
          className: "bg_transparent",
          onPointerDown: function (e) {
            var t = u.current;
            if (t) {
              (e.preventDefault(), e.currentTarget.setPointerCapture(e.pointerId));
              var n = k(e);
              if (n) {
                var r = {
                  color: b,
                  width: y,
                  points: [n],
                };
                (m.current.push(r), (h.current = r), (f.current = n), (d.current = !0), C(t, n, r));
              }
            }
          },
          onPointerMove: function (e) {
            if (d.current) {
              var t = u.current,
                n = h.current;
              if (t && n) {
                e.preventDefault();
                var r = k(e);
                if (r) {
                  var o = f.current || r;
                  (n.points.push(r), E(t, o, r, n), (f.current = r));
                }
              }
            }
          },
          onPointerUp: $,
          onPointerCancel: $,
        }),
      ),
      c.createElement(
        "div",
        {
          style: {
            position: "fixed",
            top: 0,
            right: 0,
            zIndex: 999,
          },
        },
        c.createElement(
          l.Button,
          {
            onClick: t,
            style: {
              marginRight: 8,
            },
          },
          "关闭画板",
        ),
        c.createElement(
          l.Button,
          {
            onClick: function () {
              ((m.current = []), (h.current = null), (f.current = null), S());
            },
          },
          "清空",
        ),
      ),
    );
  };
};
