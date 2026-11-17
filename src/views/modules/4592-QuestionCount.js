// 从安装包提取的模块 4592；导出：QuestionCount。
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
    (t.QuestionCount = void 0));
  const a = n(1508),
    i = n(6540);
  t.QuestionCount = function (e) {
    var t = e.onChange,
      n = r(i.useState(!1), 2),
      o = n[0],
      l = n[1],
      c = r(i.useState(-1), 2),
      s = c[0],
      u = c[1],
      d = function () {
        l(!1);
      };
    return i.createElement(
      "div",
      null,
      i.createElement(
        a.Button,
        {
          type: "primary",
          style: {
            borderColor: "#ffffff",
          },
          onClick: function () {
            return l(!0);
          },
        },
        "设置每组出题数量",
      ),
      i.createElement(
        a.Modal,
        {
          open: o,
          title: "设置",
          onOk: function () {
            s > -1 && (t && t(s), d());
          },
          onCancel: d,
        },
        i.createElement(
          "div",
          null,
          i.createElement("span", null, "可设置每组出题数量（ps: 不查询之前设置）"),
          i.createElement(
            a.Radio.Group,
            {
              onChange: function (e) {
                u(e.target.value);
              },
            },
            i.createElement(
              a.Radio.Button,
              {
                value: 5,
              },
              "5",
            ),
            i.createElement(
              a.Radio.Button,
              {
                value: 10,
              },
              "10",
            ),
            i.createElement(
              a.Radio.Button,
              {
                value: 15,
              },
              "15",
            ),
            i.createElement(
              a.Radio.Button,
              {
                value: 20,
              },
              "20",
            ),
            i.createElement(
              a.Radio.Button,
              {
                value: 25,
              },
              "25",
            ),
            i.createElement(
              a.Radio.Button,
              {
                value: 30,
              },
              "30",
            ),
            i.createElement(
              a.Radio.Button,
              {
                value: 35,
              },
              "35",
            ),
            i.createElement(
              a.Radio.Button,
              {
                value: 40,
              },
              "40",
            ),
          ),
        ),
      ),
    );
  };
};
