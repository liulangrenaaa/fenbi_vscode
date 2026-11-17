// 从安装包提取的模块 6598；导出：SydwmsDetail。
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
      s(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
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
          if ("object" != l(e) || !e) return e;
          var t = e[Symbol.toPrimitive];
          if (void 0 !== t) {
            var n = t.call(e, "string");
            if ("object" != l(n)) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(e);
        })(e);
        return "symbol" == l(t) ? t : t + "";
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
  function l(e) {
    return (
      (l =
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
      l(e)
    );
  }
  function c(e, t) {
    var n = ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
    if (!n) {
      if (Array.isArray(e) || (n = s(e)) || (t && e && "number" == typeof e.length)) {
        n && (e = n);
        var r = 0,
          o = function () {};
        return {
          s: o,
          n: function () {
            return r >= e.length
              ? {
                  done: !0,
                }
              : {
                  done: !1,
                  value: e[r++],
                };
          },
          e: function (e) {
            throw e;
          },
          f: o,
        };
      }
      throw new TypeError(
        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
      );
    }
    var a,
      i = !0,
      l = !1;
    return {
      s: function () {
        n = n.call(e);
      },
      n: function () {
        var e = n.next();
        return ((i = e.done), e);
      },
      e: function (e) {
        ((l = !0), (a = e));
      },
      f: function () {
        try {
          i || null == n.return || n.return();
        } finally {
          if (l) throw a;
        }
      },
    };
  }
  function s(e, t) {
    if (e) {
      if ("string" == typeof e) return u(e, t);
      var n = {}.toString.call(e).slice(8, -1);
      return (
        "Object" === n && e.constructor && (n = e.constructor.name),
        "Map" === n || "Set" === n
          ? Array.from(e)
          : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? u(e, t)
            : void 0
      );
    }
  }
  function u(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  (Object.defineProperty(t, "__esModule", {
    value: !0,
  }),
    (t.SydwmsDetail = void 0));
  const d = n(6540),
    f = n(1508),
    m = n(4976),
    h = n(5114),
    p = n(8595),
    v = n(2961),
    g = n(9226);
  n(2045);
  var b,
    y = (0, p.getVscodeApi)(),
    w = f.Typography.Text,
    x = f.Typography.Title,
    C = "https://web.sdk.qcloud.com/player/tcplayer/release/v4.9.1/libs/hls.min.1.1.7.js",
    E = {
      enableWorker: !1,
      manifestLoadingMaxRetry: 0,
      levelLoadingMaxRetry: 0,
      fragLoadingMaxRetry: 0,
      keyLoadingMaxRetry: 0,
      appendErrorMaxRetry: 0,
    },
    S = {
      borderTop: "1px solid rgba(255, 255, 255, 0.22)",
      padding: "14px 0",
    },
    A = {
      marginBottom: 12,
      padding: 10,
      border: "1px solid rgba(255, 255, 255, 0.18)",
      borderRadius: 6,
    },
    k = {
      lineHeight: 1.8,
      wordBreak: "break-word",
    },
    $ = function (e) {
      return e.id || e.globalId || e.questionId || e.idStr;
    },
    z = function (e, t) {
      var n,
        r = c(t);
      try {
        for (r.s(); !(n = r.n()).done;) {
          var o = e[n.value];
          if ("string" == typeof o && o.trim()) return o;
          if (o && "object" === l(o)) {
            var a = z(o, t);
            if (a) return a;
          }
        }
      } catch (e) {
        r.e(e);
      } finally {
        r.f();
      }
      return "";
    },
    M = function (e) {
      return e
        .replace(/<audio[\s\S]*?<\/audio>/gi, "")
        .replace(/<audio[^>]*\/>/gi, "")
        .replace(/<source[^>]*type=["']audio\/[^>]*>/gi, "");
    },
    O = function (e) {
      return e ? z(e, ["content", "text"]) : "";
    },
    R = function (e) {
      return M(z(e, ["content", "title", "name"]));
    },
    H = function (e, t) {
      return (e.solutionAccessories || [])
        .filter(function (e) {
          return e.label === t;
        })
        .map(R)
        .filter(Boolean);
    },
    I = function (e) {
      if (e)
        if (Array.isArray(e)) {
          var t,
            n = c(e);
          try {
            for (n.s(); !(t = n.n()).done;) {
              var r = t.value,
                o = I(r);
              if (o) return o;
            }
          } catch (e) {
            n.e(e);
          } finally {
            n.f();
          }
        } else if ("object" === l(e)) {
          var i,
            s = e,
            u = "string" == typeof s.playbackUrl && s.playbackUrl ? s.playbackUrl : s.url;
          if ("string" == typeof u && u)
            return a(
              a({}, s),
              {},
              {
                url: ((i = u), i ? (i.startsWith("//") ? "https:".concat(i) : i) : ""),
              },
            );
          for (var d = 0, f = Object.keys(s); d < f.length; d++) {
            var m = f[d],
              h = I(s[m]);
            if (h) return h;
          }
        }
    },
    N = function (e) {
      return I(e.media) || I(e.meta);
    },
    L = function (e, t) {
      return e.title || e.name || "媒体 ".concat(t + 1);
    },
    P = function (e) {
      var t = String(e.title || e.name || ""),
        n = N(e);
      return t.includes("读题") || /\.mp3/i.test((null == n ? void 0 : n.url) || "")
        ? "reading"
        : t.includes("示范作答")
          ? "sampleAnswer"
          : t.includes("解析") || e.hasVideo || (null != n && n.url)
            ? "analysis"
            : "other";
    },
    j = function (e) {
      var t, n, r;
      if (!e) return "HLS 播放失败";
      var o = [
        e.type,
        e.details,
        e.fatal ? "fatal" : "",
        null !== (t = e.response) && void 0 !== t && t.code ? "HTTP ".concat(e.response.code) : "",
        null === (n = e.response) || void 0 === n ? void 0 : n.text,
        (null === (r = e.response) || void 0 === r ? void 0 : r.url) || e.url,
      ].filter(Boolean);
      return o.length ? o.join(" | ") : "HLS 播放失败";
    },
    T = function (e) {
      var t = e.src,
        n = e.playerUrl,
        o = d.useRef(null),
        a = r(d.useState(""), 2),
        i = a[0],
        l = a[1];
      return (
        d.useEffect(
          function () {
            var e = o.current;
            if (e && t) {
              var r,
                a = !1,
                i = !1,
                c = (function (e) {
                  return /m3u8/i.test(e);
                })(t),
                s = function () {
                  (e.removeAttribute("src"), e.load());
                },
                u = function (e, o) {
                  var c;
                  a ||
                    i ||
                    ((i = !0),
                    console.warn("[FenbiTools:Player] stop playback after failure", {
                      src: t,
                      playerUrl: n,
                      message: e,
                      detail: o,
                    }),
                    null === (c = r) || void 0 === c || c.destroy(),
                    (r = void 0),
                    s(),
                    l(e));
                };
              (l(""),
                console.log("[FenbiTools:Player] init video", {
                  src: t,
                  isHls: c,
                  nativeHls: e.canPlayType("application/vnd.apple.mpegurl"),
                }));
              var d = function () {
                var r, o, l;
                if (!a && !i) {
                  var c = null === (r = e.error) || void 0 === r ? void 0 : r.code;
                  (console.error("[FenbiTools:Player] video element error", {
                    src: t,
                    playerUrl: n,
                    code: c,
                    message: null === (o = e.error) || void 0 === o ? void 0 : o.message,
                  }),
                    u(
                      4 === c
                        ? "VS Code 内置播放器不支持该视频音频编码，请打开媒体地址查看"
                        : c
                          ? "视频加载失败，错误码：".concat(c)
                          : "视频加载失败",
                      {
                        code: c,
                        message: null === (l = e.error) || void 0 === l ? void 0 : l.message,
                      },
                    ));
                }
              };
              return (
                e.addEventListener("error", d),
                c
                  ? e.canPlayType("application/vnd.apple.mpegurl")
                    ? (console.log("[FenbiTools:Player] use native HLS", {
                        src: t,
                      }),
                      (e.src = t),
                      function () {
                        (console.log("[FenbiTools:Player] cleanup native HLS", {
                          src: t,
                        }),
                          e.removeEventListener("error", d),
                          e.removeAttribute("src"),
                          e.load());
                      })
                    : (fetch(t)
                        .then(function (e) {
                          if (
                            (console.log("[FenbiTools:Player] HLS probe response", {
                              src: t,
                              ok: e.ok,
                              status: e.status,
                              statusText: e.statusText,
                              contentType: e.headers.get("content-type"),
                            }),
                            !e.ok)
                          )
                            throw new Error("HLS 代理请求失败：HTTP ".concat(e.status));
                          return window.Hls
                            ? (console.log("[FenbiTools:Player] Hls already loaded"),
                              Promise.resolve())
                            : (b ||
                                (console.log("[FenbiTools:Player] loading HLS script", C),
                                (b = new Promise(function (e, t) {
                                  var n = Array.from(document.scripts).find(function (e) {
                                    return e.src === C;
                                  });
                                  if (n)
                                    return (
                                      console.log(
                                        "[FenbiTools:Player] reuse existing HLS script element",
                                      ),
                                      n.addEventListener(
                                        "load",
                                        function () {
                                          (console.log(
                                            "[FenbiTools:Player] existing HLS script loaded",
                                          ),
                                            e());
                                        },
                                        {
                                          once: !0,
                                        },
                                      ),
                                      void n.addEventListener(
                                        "error",
                                        function (e) {
                                          (console.error(
                                            "[FenbiTools:Player] existing HLS script error",
                                            e,
                                          ),
                                            t(e));
                                        },
                                        {
                                          once: !0,
                                        },
                                      )
                                    );
                                  var r = document.createElement("script");
                                  ((r.src = C),
                                    (r.async = !0),
                                    (r.onload = function () {
                                      (console.log("[FenbiTools:Player] HLS script loaded"), e());
                                    }),
                                    (r.onerror = function (e) {
                                      (console.error("[FenbiTools:Player] HLS script error", e),
                                        t(e));
                                    }),
                                    document.head.appendChild(r));
                                }))),
                              b);
                        })
                        .then(function () {
                          var n, o;
                          if (!a) {
                            var c,
                              s,
                              d = window.Hls;
                            if (
                              (console.log("[FenbiTools:Player] HLS constructor ready", {
                                hasHls: Boolean(d),
                                supported:
                                  null == d || null === (n = d.isSupported) || void 0 === n
                                    ? void 0
                                    : n.call(d),
                                src: t,
                              }),
                              null != d &&
                                null !== (o = d.isSupported) &&
                                void 0 !== o &&
                                o.call(d))
                            )
                              return (
                                null === (c = (s = r = new d(E)).on) ||
                                  void 0 === c ||
                                  c.call(s, "hlsError", function (e, n) {
                                    a ||
                                      i ||
                                      (console.error("[FenbiTools:Player] hls.js error", {
                                        src: t,
                                        data: n,
                                      }),
                                      "bufferStalledError" !== n.details &&
                                        (n.fatal ||
                                        "bufferAppendError" === n.details ||
                                        "fragParsingError" === n.details
                                          ? u(
                                              "bufferAppendError" === n.details
                                                ? "VS Code 内置播放器无法解码该视频流，请打开媒体地址查看"
                                                : j(n),
                                              n,
                                            )
                                          : l(j(n))));
                                  }),
                                console.log("[FenbiTools:Player] hls.js loadSource", {
                                  src: t,
                                }),
                                r.loadSource(t),
                                r.attachMedia(e),
                                void console.log("[FenbiTools:Player] hls.js attachMedia done", {
                                  src: t,
                                })
                              );
                            (console.warn(
                              "[FenbiTools:Player] hls.js unsupported, fallback to video src",
                              {
                                src: t,
                              },
                            ),
                              (e.src = t));
                          }
                        })
                        .catch(function (e) {
                          (console.error("[FenbiTools:Player] HLS setup failed", {
                            src: t,
                            message: e.message,
                          }),
                            a || l(e.message || "当前环境未能加载 HLS 播放器或代理地址"));
                        }),
                      function () {
                        var n;
                        ((a = !0),
                          console.log("[FenbiTools:Player] cleanup HLS video", {
                            src: t,
                          }),
                          null === (n = r) || void 0 === n || n.destroy(),
                          e.removeEventListener("error", d),
                          s());
                      })
                  : (console.log("[FenbiTools:Player] use native video src", {
                      src: t,
                    }),
                    (e.src = t),
                    function () {
                      (console.log("[FenbiTools:Player] cleanup native video", {
                        src: t,
                      }),
                        e.removeEventListener("error", d),
                        e.removeAttribute("src"),
                        e.load());
                    })
              );
            }
          },
          [t, n],
        ),
        d.createElement(
          d.Fragment,
          null,
          d.createElement("video", {
            ref: o,
            controls: !0,
            style: {
              maxWidth: "100%",
              width: "100%",
            },
          }),
          i &&
            d.createElement(f.Alert, {
              type: "warning",
              showIcon: !0,
              message: i,
              description: d.createElement(
                f.Space,
                {
                  direction: "vertical",
                  size: 8,
                },
                d.createElement(D, {
                  src: t,
                }),
              ),
              style: {
                marginTop: 8,
              },
            }),
        )
      );
    },
    B = function (e) {
      var t = e.html,
        n = e.emptyText;
      return t
        ? d.createElement("div", {
            className: "solution",
            style: k,
            dangerouslySetInnerHTML: {
              __html: (0, g.setImg)(t),
            },
          })
        : d.createElement(
            w,
            {
              type: "secondary",
            },
            n,
          );
    },
    V = function (e) {
      var t = e.title,
        n = e.children;
      return d.createElement(
        "section",
        {
          style: S,
        },
        d.createElement(
          x,
          {
            level: 5,
            style: {
              marginTop: 0,
            },
          },
          t,
        ),
        n,
      );
    },
    D = function (e) {
      var t = e.src;
      return d.createElement(
        f.Button,
        {
          size: "small",
          type: "primary",
          disabled: !t,
          href: t,
          target: "_blank",
          rel: "noreferrer",
        },
        "打开媒体地址",
      );
    },
    F = function (e) {
      var t = e.episodes;
      return t.length
        ? d.createElement(
            f.Space,
            {
              direction: "vertical",
              size: 12,
              style: {
                width: "100%",
              },
            },
            t.map(function (e, t) {
              var n = N(e),
                r = (function (e) {
                  if (!e) return "";
                  var t = Math.floor(e / 60),
                    n = Math.round(e % 60)
                      .toString()
                      .padStart(2, "0");
                  return "".concat(t, ":").concat(n);
                })(null == n ? void 0 : n.duration),
                o = String(e.episodeId || e.episode_id || e.id || t);
              return (
                console.log("[FenbiTools:Player] render episode media", {
                  title: L(e, t),
                  media: n,
                }),
                d.createElement(
                  "div",
                  {
                    key: o,
                    style: A,
                  },
                  d.createElement(
                    f.Space,
                    {
                      wrap: !0,
                      size: 8,
                      style: {
                        marginBottom: 8,
                      },
                    },
                    d.createElement(
                      w,
                      {
                        strong: !0,
                      },
                      L(e, t),
                    ),
                    r && d.createElement(f.Tag, null, r),
                    (null == n ? void 0 : n.width) &&
                      (null == n ? void 0 : n.height) &&
                      d.createElement(f.Tag, null, n.width, "x", n.height),
                  ),
                  null != n && n.url
                    ? d.createElement(T, {
                        src: n.url,
                        playerUrl: n.playerUrl,
                      })
                    : d.createElement(
                        w,
                        {
                          type: "secondary",
                        },
                        "暂无媒体地址",
                      ),
                )
              );
            }),
          )
        : null;
    },
    _ = function (e) {
      var t = e.episodes;
      return t.length
        ? d.createElement(
            f.Space,
            {
              direction: "vertical",
              size: 12,
              style: {
                width: "100%",
              },
            },
            t.map(function (e, t) {
              var n = N(e),
                r = String(e.episodeId || e.episode_id || e.id || t),
                o = L(e, t);
              return (
                console.log("[FenbiTools:Player] render sample answer media address", {
                  title: o,
                  media: n,
                }),
                d.createElement(
                  "div",
                  {
                    key: r,
                    style: A,
                  },
                  d.createElement(D, {
                    src: null == n ? void 0 : n.url,
                  }),
                )
              );
            }),
          )
        : null;
    },
    W = function (e) {
      var t = e.notes,
        n = e.questionId,
        r = d.useMemo(
          function () {
            var e = [],
              r = function (t) {
                if (t)
                  if (Array.isArray(t)) t.forEach(r);
                  else if ("object" === l(t)) {
                    var o = t,
                      a = o.questionId || o.tikuId || o.id;
                    ((!n || !a || String(a) === String(n)) &&
                      ["content", "note", "text"].forEach(function (t) {
                        var n = o[t];
                        "string" == typeof n && n.trim() && e.push(n);
                      }),
                      Object.keys(o).forEach(function (e) {
                        return r(o[e]);
                      }));
                  }
              };
            return (r(t), Array.from(new Set(e)));
          },
          [t, n],
        );
      return r.length
        ? d.createElement(
            f.Space,
            {
              direction: "vertical",
              size: 8,
              style: {
                width: "100%",
              },
            },
            r.map(function (e, t) {
              return d.createElement(B, {
                key: t,
                html: e,
                emptyText: "暂无笔记",
              });
            }),
          )
        : d.createElement(
            w,
            {
              type: "secondary",
            },
            "暂无笔记",
          );
    };
  t.SydwmsDetail = function () {
    var e,
      t = r(f.Modal.useModal(), 2),
      n = t[0],
      o = t[1],
      a = r(d.useState(!0), 2),
      i = a[0],
      l = a[1],
      c = r(d.useState(), 2),
      s = c[0],
      u = c[1],
      p = r(d.useState("1"), 2),
      g = p[0],
      b = p[1],
      C = (0, m.useNavigate)(),
      E = (0, m.useLocation)().state || {},
      S = E.category,
      A = void 0 === S ? v.SELECTENUM.SYDWMS : S,
      k = E.keypointId,
      I = E.title,
      N = E.questionIndex,
      L = Math.max(Number(N) || 0, 0),
      j = null !== (e = null == s ? void 0 : s.questionIndex) && void 0 !== e ? e : L,
      T = (null == s ? void 0 : s.questionCount) || 0,
      D = I || String(k || "");
    (d.useEffect(
      function () {
        if (!k)
          return (
            l(!1),
            void n.error({
              title: "提示",
              content: "缺少面试题目 ID",
            })
          );
        (u(void 0),
          l(!0),
          window.scrollTo(0, 0),
          y.postMessage({
            command: "getSydwmsInterviewDetail",
            postData: {
              category: A,
              keypointId: k,
              questionIndex: L,
            },
          }));
      },
      [A, k, L],
    ),
      d.useEffect(
        function () {
          b(String(j + 1));
        },
        [j],
      ));
    var q = function (e) {
        i ||
          C("/sydwms-detail", {
            replace: !0,
            state: {
              category: A,
              keypointId: k,
              title: I,
              questionIndex: e,
            },
          });
      },
      K = function () {
        if (!i && T) {
          var e = Number(g);
          if (!Number.isInteger(e) || e < 1 || e > T)
            return (
              b(String(j + 1)),
              void n.info({
                title: "提示",
                content: "题号范围是 1-".concat(T),
              })
            );
          var t = e - 1;
          t !== j && q(t);
        }
      };
    (0, h.useVscodeMessage)(function (e) {
      if ("sydwmsInterviewDetail" === e.command) {
        var t = e.data;
        if (t.category && t.category !== A) return;
        if (t.questionIndex !== L) return;
        (l(!1), u(t));
      }
      var r;
      "message" === e.command &&
        (l(!1),
        n.error({
          title: "提示",
          content: (null === (r = e.data) || void 0 === r ? void 0 : r.message) || "",
        }));
    });
    var U = (null == s ? void 0 : s.questions) || [],
      X = (null == s ? void 0 : s.episodes) || [],
      G = ((null == s ? void 0 : s.materials) || []).map(O).filter(Boolean);
    return d.createElement(
      "div",
      {
        className: "detail_page",
      },
      d.createElement(
        f.Spin,
        {
          tip: "loading...",
          spinning: i,
        },
        d.createElement(
          "div",
          {
            className: "question-container",
          },
          d.createElement(
            "div",
            {
              className: "top-bar",
            },
            d.createElement(
              f.Button,
              {
                type: "text",
                onClick: function () {
                  C(-1);
                },
              },
              "返回上一页",
            ),
            d.createElement(
              f.Button,
              {
                disabled: i || !T,
                onClick: function () {
                  i ||
                    (j <= 0
                      ? n.info({
                          title: "提示",
                          content: "已经是第一题",
                        })
                      : q(j - 1));
                },
              },
              "上一题",
            ),
            d.createElement(
              f.Space,
              {
                size: 4,
              },
              d.createElement(f.Input, {
                size: "small",
                value: g,
                disabled: i || !T,
                style: {
                  width: 56,
                  textAlign: "center",
                },
                onChange: function (e) {
                  b(e.target.value.replace(/\D/g, ""));
                },
                onBlur: K,
                onPressEnter: K,
              }),
              d.createElement(w, null, "/ ", T || "-"),
            ),
            d.createElement(
              f.Button,
              {
                type: "primary",
                style: {
                  borderColor: "white",
                },
                disabled: i || !T,
                onClick: function () {
                  i ||
                    (T && j >= T - 1
                      ? n.info({
                          title: "提示",
                          content: "已经是最后一题",
                        })
                      : q(j + 1));
                },
              },
              "下一题",
            ),
          ),
          D &&
            d.createElement(
              x,
              {
                level: 4,
              },
              D,
            ),
          d.createElement(
            V,
            {
              title: "材料",
            },
            G.length
              ? d.createElement(
                  f.Space,
                  {
                    direction: "vertical",
                    size: 12,
                    style: {
                      width: "100%",
                    },
                  },
                  G.map(function (e, t) {
                    return d.createElement(B, {
                      key: t,
                      html: e,
                      emptyText: "没有材料",
                    });
                  }),
                )
              : d.createElement(
                  w,
                  {
                    type: "secondary",
                  },
                  "没有材料",
                ),
          ),
          !U.length &&
            !i &&
            d.createElement(f.Empty, {
              description: "暂无面试题内容",
            }),
          U.map(function (e, t) {
            var n = $(e),
              r = (function (e, t) {
                var n = String($(t) || "");
                return e.filter(function (e) {
                  var t = e.questionId || e.tikuId;
                  return !t || String(t) === n;
                });
              })(X, e),
              o = r.filter(function (e) {
                return "analysis" === P(e);
              }),
              a = r.filter(function (e) {
                return "sampleAnswer" === P(e);
              }),
              i = r.filter(function (e) {
                return "other" === P(e);
              }),
              l = z(e, ["content"]),
              c = z(e, ["correctAnswer", "answer"]),
              u = (function (e) {
                return M(z(e, ["solution"]));
              })(e),
              m = (function (e) {
                return z(e, ["source", "shortSource"]);
              })(e),
              h = H(e, "stzd"),
              p = H(e, "swdt"),
              v = H(e, "sfdt"),
              g = (function (e) {
                var t = new Set([
                  "stzd",
                  "swdt",
                  "sfdt",
                  "year",
                  "exam_category",
                  "applicable_region",
                  "usage_scenario",
                  "interview_format",
                  "topic",
                  "background",
                ]);
                return (e.solutionAccessories || [])
                  .filter(function (e) {
                    return !t.has(String(e.label || ""));
                  })
                  .map(function (e, t) {
                    return {
                      key: "".concat(e.label || "other", "-").concat(t),
                      title: e.title || e.name || "补充解析",
                      content: R(e),
                    };
                  })
                  .filter(function (e) {
                    return e.content;
                  });
              })(e);
            return d.createElement(
              f.Card,
              {
                key: String(n || t),
                style: {
                  marginBottom: 12,
                },
              },
              d.createElement(
                V,
                {
                  title: "问题",
                },
                d.createElement(B, {
                  html: l,
                  emptyText: "暂无问题",
                }),
              ),
              h.length > 0 &&
                d.createElement(
                  V,
                  {
                    title: "粉笔审题",
                  },
                  d.createElement(
                    f.Space,
                    {
                      direction: "vertical",
                      size: 12,
                      style: {
                        width: "100%",
                      },
                    },
                    h.map(function (e, t) {
                      return d.createElement(B, {
                        key: t,
                        html: e,
                        emptyText: "暂无粉笔审题",
                      });
                    }),
                  ),
                ),
              d.createElement(
                V,
                {
                  title: "答案",
                },
                d.createElement(B, {
                  html: c,
                  emptyText: "暂无答案",
                }),
              ),
              d.createElement(
                V,
                {
                  title: "解析",
                },
                d.createElement(B, {
                  html: u,
                  emptyText: "暂无解析",
                }),
              ),
              o.length > 0 &&
                d.createElement(
                  V,
                  {
                    title: "解析视频",
                  },
                  d.createElement(F, {
                    episodes: o,
                  }),
                ),
              a.length > 0 &&
                d.createElement(
                  V,
                  {
                    title: "示范作答",
                  },
                  d.createElement(_, {
                    episodes: a,
                  }),
                ),
              p.length > 0 &&
                d.createElement(
                  V,
                  {
                    title: "粉笔思维",
                  },
                  d.createElement(
                    f.Space,
                    {
                      direction: "vertical",
                      size: 12,
                      style: {
                        width: "100%",
                      },
                    },
                    p.map(function (e, t) {
                      return d.createElement(B, {
                        key: t,
                        html: e,
                        emptyText: "暂无粉笔思维",
                      });
                    }),
                  ),
                ),
              v.length > 0 &&
                d.createElement(
                  V,
                  {
                    title: "粉笔示例",
                  },
                  d.createElement(
                    f.Space,
                    {
                      direction: "vertical",
                      size: 12,
                      style: {
                        width: "100%",
                      },
                    },
                    v.map(function (e, t) {
                      return d.createElement(B, {
                        key: t,
                        html: e,
                        emptyText: "暂无粉笔示例",
                      });
                    }),
                  ),
                ),
              g.map(function (e) {
                return d.createElement(
                  V,
                  {
                    key: e.key,
                    title: e.title,
                  },
                  d.createElement(B, {
                    html: e.content,
                    emptyText: "暂无内容",
                  }),
                );
              }),
              i.length > 0 &&
                d.createElement(
                  V,
                  {
                    title: "其他媒体",
                  },
                  d.createElement(F, {
                    episodes: i,
                  }),
                ),
              d.createElement(
                V,
                {
                  title: "来源",
                },
                d.createElement(B, {
                  html: m,
                  emptyText: "暂无来源",
                }),
              ),
              d.createElement(
                V,
                {
                  title: "笔记",
                },
                d.createElement(W, {
                  notes: null == s ? void 0 : s.notes,
                  questionId: n,
                }),
              ),
            );
          }),
        ),
      ),
      o,
    );
  };
};
