// 从安装包提取的模块 2；导出：CustomTree。
(e, t, n) => {
  "use strict";

  function r(e, t) {
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
  }
  function o(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.CustomTree = void 0));
  const a = n(1508),
    i = n(6540),
    l = n(3160);
  t.CustomTree = function (e) {
    var t,
      n,
      c = e.treeData,
      s =
        ((t = i.useState([])),
        (n = 2),
        (function (e) {
          if (Array.isArray(e)) return e;
        })(t) ||
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
          })(t, n) ||
          r(t, n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          })()),
      u = s[0],
      d = s[1];
    return i.createElement(a.Tree, {
      showIcon: !0,
      switcherIcon: i.createElement(l.DownOutlined, null),
      treeData: c,
      style: {
        minWidth: 256,
        maxWidth: 300,
      },
      onSelect: function (e, t) {
        var n,
          a,
          i = null === (n = t.node) || void 0 === n ? void 0 : n.key;
        null != t &&
          null !== (a = t.node) &&
          void 0 !== a &&
          a.children &&
          d(function (e) {
            return null != e && e.includes(i)
              ? e.filter(function (e) {
                  return e !== i;
                })
              : [].concat(
                  (function (e) {
                    return (
                      (function (e) {
                        if (Array.isArray(e)) return o(e);
                      })(e) ||
                      (function (e) {
                        if (
                          ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
                          null != e["@@iterator"]
                        )
                          return Array.from(e);
                      })(e) ||
                      r(e) ||
                      (function () {
                        throw new TypeError(
                          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                        );
                      })()
                    );
                  })(e),
                  [i],
                );
          });
      },
      expandedKeys: u,
      onExpand: function (e) {
        return d(e);
      },
    });
  };
};
