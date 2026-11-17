// 从安装包提取的模块 7463；导出：unstable_wrapCallback、unstable_shouldYield、unstable_scheduleCallback、unstable_runWithPriority、unstable_requestPaint、unstable_pauseExecution、unstable_next、unstable_getFirstCallbackNode、unstable_getCurrentPriorityLevel、unstable_forceFrameRate、unstable_continueExecution、unstable_cancelCallback、unstable_UserBlockingPriority、unstable_Profiling、unstable_NormalPriority、unstable_LowPriority、unstable_ImmediatePriority、unstable_IdlePriority、sortIndex、unstable_now。
(e, t) => {
  "use strict";

  function n(e, t) {
    var n = e.length;
    e.push(t);
    e: for (; 0 < n;) {
      var r = (n - 1) >>> 1,
        o = e[r];
      if (!(0 < a(o, t))) break e;
      ((e[r] = t), (e[n] = o), (n = r));
    }
  }
  function r(e) {
    return 0 === e.length ? null : e[0];
  }
  function o(e) {
    if (0 === e.length) return null;
    var t = e[0],
      n = e.pop();
    if (n !== t) {
      e[0] = n;
      e: for (var r = 0, o = e.length, i = o >>> 1; r < i;) {
        var l = 2 * (r + 1) - 1,
          c = e[l],
          s = l + 1,
          u = e[s];
        if (0 > a(c, n))
          s < o && 0 > a(u, c)
            ? ((e[r] = u), (e[s] = n), (r = s))
            : ((e[r] = c), (e[l] = n), (r = l));
        else {
          if (!(s < o && 0 > a(u, n))) break e;
          ((e[r] = u), (e[s] = n), (r = s));
        }
      }
    }
    return t;
  }
  function a(e, t) {
    var n = e.sortIndex - t.sortIndex;
    return 0 !== n ? n : e.id - t.id;
  }
  if ("object" == typeof performance && "function" == typeof performance.now) {
    var i = performance;
    t.unstable_now = function () {
      return i.now();
    };
  } else {
    var l = Date,
      c = l.now();
    t.unstable_now = function () {
      return l.now() - c;
    };
  }
  var s = [],
    u = [],
    d = 1,
    f = null,
    m = 3,
    h = !1,
    p = !1,
    v = !1,
    g = "function" == typeof setTimeout ? setTimeout : null,
    b = "function" == typeof clearTimeout ? clearTimeout : null,
    y = "undefined" != typeof setImmediate ? setImmediate : null;
  function w(e) {
    for (var t = r(u); null !== t;) {
      if (null === t.callback) o(u);
      else {
        if (!(t.startTime <= e)) break;
        (o(u), (t.sortIndex = t.expirationTime), n(s, t));
      }
      t = r(u);
    }
  }
  function x(e) {
    if (((v = !1), w(e), !p))
      if (null !== r(s)) ((p = !0), I(C));
      else {
        var t = r(u);
        null !== t && N(x, t.startTime - e);
      }
  }
  function C(e, n) {
    ((p = !1), v && ((v = !1), b(k), (k = -1)), (h = !0));
    var a = m;
    try {
      for (w(n), f = r(s); null !== f && (!(f.expirationTime > n) || (e && !M()));) {
        var i = f.callback;
        if ("function" == typeof i) {
          ((f.callback = null), (m = f.priorityLevel));
          var l = i(f.expirationTime <= n);
          ((n = t.unstable_now()),
            "function" == typeof l ? (f.callback = l) : f === r(s) && o(s),
            w(n));
        } else o(s);
        f = r(s);
      }
      if (null !== f) var c = !0;
      else {
        var d = r(u);
        (null !== d && N(x, d.startTime - n), (c = !1));
      }
      return c;
    } finally {
      ((f = null), (m = a), (h = !1));
    }
  }
  "undefined" != typeof navigator &&
    void 0 !== navigator.scheduling &&
    void 0 !== navigator.scheduling.isInputPending &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  var E,
    S = !1,
    A = null,
    k = -1,
    $ = 5,
    z = -1;
  function M() {
    return !(t.unstable_now() - z < $);
  }
  function O() {
    if (null !== A) {
      var e = t.unstable_now();
      z = e;
      var n = !0;
      try {
        n = A(!0, e);
      } finally {
        n ? E() : ((S = !1), (A = null));
      }
    } else S = !1;
  }
  if ("function" == typeof y)
    E = function () {
      y(O);
    };
  else if ("undefined" != typeof MessageChannel) {
    var R = new MessageChannel(),
      H = R.port2;
    ((R.port1.onmessage = O),
      (E = function () {
        H.postMessage(null);
      }));
  } else
    E = function () {
      g(O, 0);
    };
  function I(e) {
    ((A = e), S || ((S = !0), E()));
  }
  function N(e, n) {
    k = g(function () {
      e(t.unstable_now());
    }, n);
  }
  ((t.unstable_IdlePriority = 5),
    (t.unstable_ImmediatePriority = 1),
    (t.unstable_LowPriority = 4),
    (t.unstable_NormalPriority = 3),
    (t.unstable_Profiling = null),
    (t.unstable_UserBlockingPriority = 2),
    (t.unstable_cancelCallback = function (e) {
      e.callback = null;
    }),
    (t.unstable_continueExecution = function () {
      p || h || ((p = !0), I(C));
    }),
    (t.unstable_forceFrameRate = function (e) {
      0 > e || 125 < e
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : ($ = 0 < e ? Math.floor(1e3 / e) : 5);
    }),
    (t.unstable_getCurrentPriorityLevel = function () {
      return m;
    }),
    (t.unstable_getFirstCallbackNode = function () {
      return r(s);
    }),
    (t.unstable_next = function (e) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var t = 3;
          break;
        default:
          t = m;
      }
      var n = m;
      m = t;
      try {
        return e();
      } finally {
        m = n;
      }
    }),
    (t.unstable_pauseExecution = function () {}),
    (t.unstable_requestPaint = function () {}),
    (t.unstable_runWithPriority = function (e, t) {
      switch (e) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          e = 3;
      }
      var n = m;
      m = e;
      try {
        return t();
      } finally {
        m = n;
      }
    }),
    (t.unstable_scheduleCallback = function (e, o, a) {
      var i = t.unstable_now();
      switch (
        ((a =
          "object" == typeof a && null !== a && "number" == typeof (a = a.delay) && 0 < a
            ? i + a
            : i),
        e)
      ) {
        case 1:
          var l = -1;
          break;
        case 2:
          l = 250;
          break;
        case 5:
          l = 1073741823;
          break;
        case 4:
          l = 1e4;
          break;
        default:
          l = 5e3;
      }
      return (
        (e = {
          id: d++,
          callback: o,
          priorityLevel: e,
          startTime: a,
          expirationTime: (l = a + l),
          sortIndex: -1,
        }),
        a > i
          ? ((e.sortIndex = a),
            n(u, e),
            null === r(s) && e === r(u) && (v ? (b(k), (k = -1)) : (v = !0), N(x, a - i)))
          : ((e.sortIndex = l), n(s, e), p || h || ((p = !0), I(C))),
        e
      );
    }),
    (t.unstable_shouldYield = M),
    (t.unstable_wrapCallback = function (e) {
      var t = m;
      return function () {
        var n = m;
        m = t;
        try {
          return e.apply(this, arguments);
        } finally {
          m = n;
        }
      };
    }));
};
