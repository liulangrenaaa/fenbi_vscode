// 从安装包提取的模块 5287；导出：version、useTransition、useSyncExternalStore、useState、useRef、useReducer、useMemo、useLayoutEffect、useInsertionEffect、useImperativeHandle、useId、useEffect、useDeferredValue、useDebugValue、useContext、useCallback、unstable_act、startTransition、memo、lazy、isValidElement、forwardRef、createRef、createFactory、type、createElement、createContext、cloneElement、act、__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED、Suspense、StrictMode、PureComponent、Profiler、Fragment、Component、Children。
(e, t) => {
  "use strict";

  var n = Symbol.for("react.element"),
    r = Symbol.for("react.portal"),
    o = Symbol.for("react.fragment"),
    a = Symbol.for("react.strict_mode"),
    i = Symbol.for("react.profiler"),
    l = Symbol.for("react.provider"),
    c = Symbol.for("react.context"),
    s = Symbol.for("react.forward_ref"),
    u = Symbol.for("react.suspense"),
    d = Symbol.for("react.memo"),
    f = Symbol.for("react.lazy"),
    m = Symbol.iterator,
    h = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    p = Object.assign,
    v = {};
  function g(e, t, n) {
    ((this.props = e), (this.context = t), (this.refs = v), (this.updater = n || h));
  }
  function b() {}
  function y(e, t, n) {
    ((this.props = e), (this.context = t), (this.refs = v), (this.updater = n || h));
  }
  ((g.prototype.isReactComponent = {}),
    (g.prototype.setState = function (e, t) {
      if ("object" != typeof e && "function" != typeof e && null != e)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, e, t, "setState");
    }),
    (g.prototype.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    }),
    (b.prototype = g.prototype));
  var w = (y.prototype = new b());
  ((w.constructor = y), p(w, g.prototype), (w.isPureReactComponent = !0));
  var x = Array.isArray,
    C = Object.prototype.hasOwnProperty,
    E = {
      current: null,
    },
    S = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0,
    };
  function A(e, t, r) {
    var o,
      a = {},
      i = null,
      l = null;
    if (null != t)
      for (o in (void 0 !== t.ref && (l = t.ref), void 0 !== t.key && (i = "" + t.key), t))
        C.call(t, o) && !S.hasOwnProperty(o) && (a[o] = t[o]);
    var c = arguments.length - 2;
    if (1 === c) a.children = r;
    else if (1 < c) {
      for (var s = Array(c), u = 0; u < c; u++) s[u] = arguments[u + 2];
      a.children = s;
    }
    if (e && e.defaultProps) for (o in (c = e.defaultProps)) void 0 === a[o] && (a[o] = c[o]);
    return {
      $$typeof: n,
      type: e,
      key: i,
      ref: l,
      props: a,
      _owner: E.current,
    };
  }
  function k(e) {
    return "object" == typeof e && null !== e && e.$$typeof === n;
  }
  var $ = /\/+/g;
  function z(e, t) {
    return "object" == typeof e && null !== e && null != e.key
      ? (function (e) {
          var t = {
            "=": "=0",
            ":": "=2",
          };
          return (
            "$" +
            e.replace(/[=:]/g, function (e) {
              return t[e];
            })
          );
        })("" + e.key)
      : t.toString(36);
  }
  function M(e, t, o, a, i) {
    var l = typeof e;
    ("undefined" !== l && "boolean" !== l) || (e = null);
    var c = !1;
    if (null === e) c = !0;
    else
      switch (l) {
        case "string":
        case "number":
          c = !0;
          break;
        case "object":
          switch (e.$$typeof) {
            case n:
            case r:
              c = !0;
          }
      }
    if (c)
      return (
        (i = i((c = e))),
        (e = "" === a ? "." + z(c, 0) : a),
        x(i)
          ? ((o = ""),
            null != e && (o = e.replace($, "$&/") + "/"),
            M(i, t, o, "", function (e) {
              return e;
            }))
          : null != i &&
            (k(i) &&
              (i = (function (e, t) {
                return {
                  $$typeof: n,
                  type: e.type,
                  key: t,
                  ref: e.ref,
                  props: e.props,
                  _owner: e._owner,
                };
              })(
                i,
                o +
                  (!i.key || (c && c.key === i.key) ? "" : ("" + i.key).replace($, "$&/") + "/") +
                  e,
              )),
            t.push(i)),
        1
      );
    if (((c = 0), (a = "" === a ? "." : a + ":"), x(e)))
      for (var s = 0; s < e.length; s++) {
        var u = a + z((l = e[s]), s);
        c += M(l, t, o, u, i);
      }
    else if (
      ((u = (function (e) {
        return null === e || "object" != typeof e
          ? null
          : "function" == typeof (e = (m && e[m]) || e["@@iterator"])
            ? e
            : null;
      })(e)),
      "function" == typeof u)
    )
      for (e = u.call(e), s = 0; !(l = e.next()).done;)
        c += M((l = l.value), t, o, (u = a + z(l, s++)), i);
    else if ("object" === l)
      throw (
        (t = String(e)),
        Error(
          "Objects are not valid as a React child (found: " +
            ("[object Object]" === t ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    return c;
  }
  function O(e, t, n) {
    if (null == e) return e;
    var r = [],
      o = 0;
    return (
      M(e, r, "", "", function (e) {
        return t.call(n, e, o++);
      }),
      r
    );
  }
  function R(e) {
    if (-1 === e._status) {
      var t = e._result;
      ((t = t()).then(
        function (t) {
          (0 !== e._status && -1 !== e._status) || ((e._status = 1), (e._result = t));
        },
        function (t) {
          (0 !== e._status && -1 !== e._status) || ((e._status = 2), (e._result = t));
        },
      ),
        -1 === e._status && ((e._status = 0), (e._result = t)));
    }
    if (1 === e._status) return e._result.default;
    throw e._result;
  }
  var H = {
      current: null,
    },
    I = {
      transition: null,
    },
    N = {
      ReactCurrentDispatcher: H,
      ReactCurrentBatchConfig: I,
      ReactCurrentOwner: E,
    };
  function L() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  ((t.Children = {
    map: O,
    forEach: function (e, t, n) {
      O(
        e,
        function () {
          t.apply(this, arguments);
        },
        n,
      );
    },
    count: function (e) {
      var t = 0;
      return (
        O(e, function () {
          t++;
        }),
        t
      );
    },
    toArray: function (e) {
      return (
        O(e, function (e) {
          return e;
        }) || []
      );
    },
    only: function (e) {
      if (!k(e))
        throw Error("React.Children.only expected to receive a single React element child.");
      return e;
    },
  }),
    (t.Component = g),
    (t.Fragment = o),
    (t.Profiler = i),
    (t.PureComponent = y),
    (t.StrictMode = a),
    (t.Suspense = u),
    (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = N),
    (t.act = L),
    (t.cloneElement = function (e, t, r) {
      if (null == e)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            e +
            ".",
        );
      var o = p({}, e.props),
        a = e.key,
        i = e.ref,
        l = e._owner;
      if (null != t) {
        if (
          (void 0 !== t.ref && ((i = t.ref), (l = E.current)),
          void 0 !== t.key && (a = "" + t.key),
          e.type && e.type.defaultProps)
        )
          var c = e.type.defaultProps;
        for (s in t)
          C.call(t, s) &&
            !S.hasOwnProperty(s) &&
            (o[s] = void 0 === t[s] && void 0 !== c ? c[s] : t[s]);
      }
      var s = arguments.length - 2;
      if (1 === s) o.children = r;
      else if (1 < s) {
        c = Array(s);
        for (var u = 0; u < s; u++) c[u] = arguments[u + 2];
        o.children = c;
      }
      return {
        $$typeof: n,
        type: e.type,
        key: a,
        ref: i,
        props: o,
        _owner: l,
      };
    }),
    (t.createContext = function (e) {
      return (
        ((e = {
          $$typeof: c,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }).Provider = {
          $$typeof: l,
          _context: e,
        }),
        (e.Consumer = e)
      );
    }),
    (t.createElement = A),
    (t.createFactory = function (e) {
      var t = A.bind(null, e);
      return ((t.type = e), t);
    }),
    (t.createRef = function () {
      return {
        current: null,
      };
    }),
    (t.forwardRef = function (e) {
      return {
        $$typeof: s,
        render: e,
      };
    }),
    (t.isValidElement = k),
    (t.lazy = function (e) {
      return {
        $$typeof: f,
        _payload: {
          _status: -1,
          _result: e,
        },
        _init: R,
      };
    }),
    (t.memo = function (e, t) {
      return {
        $$typeof: d,
        type: e,
        compare: void 0 === t ? null : t,
      };
    }),
    (t.startTransition = function (e) {
      var t = I.transition;
      I.transition = {};
      try {
        e();
      } finally {
        I.transition = t;
      }
    }),
    (t.unstable_act = L),
    (t.useCallback = function (e, t) {
      return H.current.useCallback(e, t);
    }),
    (t.useContext = function (e) {
      return H.current.useContext(e);
    }),
    (t.useDebugValue = function () {}),
    (t.useDeferredValue = function (e) {
      return H.current.useDeferredValue(e);
    }),
    (t.useEffect = function (e, t) {
      return H.current.useEffect(e, t);
    }),
    (t.useId = function () {
      return H.current.useId();
    }),
    (t.useImperativeHandle = function (e, t, n) {
      return H.current.useImperativeHandle(e, t, n);
    }),
    (t.useInsertionEffect = function (e, t) {
      return H.current.useInsertionEffect(e, t);
    }),
    (t.useLayoutEffect = function (e, t) {
      return H.current.useLayoutEffect(e, t);
    }),
    (t.useMemo = function (e, t) {
      return H.current.useMemo(e, t);
    }),
    (t.useReducer = function (e, t, n) {
      return H.current.useReducer(e, t, n);
    }),
    (t.useRef = function (e) {
      return H.current.useRef(e);
    }),
    (t.useState = function (e) {
      return H.current.useState(e);
    }),
    (t.useSyncExternalStore = function (e, t, n) {
      return H.current.useSyncExternalStore(e, t, n);
    }),
    (t.useTransition = function () {
      return H.current.useTransition();
    }),
    (t.version = "18.3.1"));
};
