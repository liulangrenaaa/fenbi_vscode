// 从安装包提取的模块 5590；导出：modifyArrayToTree。
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
  function a(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? o(Object(n), !0).forEach(function (t) {
            i(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : o(Object(n)).forEach(function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            });
    }
    return e;
  }
  function i(e, t, n) {
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
    (t.modifyArrayToTree = void 0));
  const l = n(1508),
    c = n(6540);
  var s = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      n = arguments.length > 2 ? arguments[2] : void 0;
    return e.map(function (e) {
      var r,
        o,
        i = (function (e) {
          var t,
            n,
            r,
            o,
            i = e.children || e.childrenLabels || [],
            l =
              null !==
                (t =
                  null !== (n = e.count) && void 0 !== n
                    ? n
                    : null == e || null === (r = e.labelMeta) || void 0 === r
                      ? void 0
                      : r.paperCount) && void 0 !== t
                ? t
                : 0,
            c = null !== (o = e.answerCount) && void 0 !== o ? o : 0;
          return a(
            a({}, e),
            {},
            {
              children: i,
              count: l,
              answerCount: c,
            },
          );
        })(e),
        u = null == t || null === (r = t.keypointIds) || void 0 === r ? void 0 : r.includes(i.id),
        d = c.createElement(
          l.Button,
          {
            size: "small",
            onClick: function (e) {
              (e.stopPropagation(), n && n(i, t));
            },
          },
          u ? "继续练习" : "去练习",
        ),
        f = {
          title: c.createElement(
            "div",
            null,
            c.createElement(
              l.Flex,
              {
                justify: "space-between",
                align: "center",
                style: {
                  width: "100%",
                },
              },
              c.createElement("span", null, i.name, " (", i.answerCount, "/", i.count, ")"),
              d,
            ),
          ),
          key: i.id,
        };
      return (
        null !== (o = i.children) && void 0 !== o && o.length && (f.children = s(i.children, t, n)),
        f
      );
    });
  };
  t.modifyArrayToTree = s;
};
