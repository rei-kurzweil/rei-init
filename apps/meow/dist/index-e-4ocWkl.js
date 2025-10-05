var O = { exports: {} }, x = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var D;
function et() {
  if (D) return x;
  D = 1;
  var _ = Symbol.for("react.transitional.element"), E = Symbol.for("react.fragment");
  function d(m, p, l) {
    var y = null;
    if (l !== void 0 && (y = "" + l), p.key !== void 0 && (y = "" + p.key), "key" in p) {
      l = {};
      for (var R in p)
        R !== "key" && (l[R] = p[R]);
    } else l = p;
    return p = l.ref, {
      $$typeof: _,
      type: m,
      key: y,
      ref: p !== void 0 ? p : null,
      props: l
    };
  }
  return x.Fragment = E, x.jsx = d, x.jsxs = d, x;
}
var J;
function nt() {
  return J || (J = 1, O.exports = et()), O.exports;
}
var a = nt(), H = { exports: {} }, u = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var z;
function rt() {
  if (z) return u;
  z = 1;
  var _ = Symbol.for("react.transitional.element"), E = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), l = Symbol.for("react.consumer"), y = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), W = Symbol.for("react.memo"), $ = Symbol.for("react.lazy"), g = Symbol.iterator;
  function Q(t) {
    return t === null || typeof t != "object" ? null : (t = g && t[g] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var N = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, k = Object.assign, Y = {};
  function T(t, e, n) {
    this.props = t, this.context = e, this.refs = Y, this.updater = n || N;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(t, e) {
    if (typeof t != "object" && typeof t != "function" && t != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, t, e, "setState");
  }, T.prototype.forceUpdate = function(t) {
    this.updater.enqueueForceUpdate(this, t, "forceUpdate");
  };
  function M() {
  }
  M.prototype = T.prototype;
  function j(t, e, n) {
    this.props = t, this.context = e, this.refs = Y, this.updater = n || N;
  }
  var w = j.prototype = new M();
  w.constructor = j, k(w, T.prototype), w.isPureReactComponent = !0;
  var q = Array.isArray, i = { H: null, A: null, T: null, S: null }, I = Object.prototype.hasOwnProperty;
  function A(t, e, n, r, s, f) {
    return n = f.ref, {
      $$typeof: _,
      type: t,
      key: e,
      ref: n !== void 0 ? n : null,
      props: f
    };
  }
  function X(t, e) {
    return A(
      t.type,
      e,
      void 0,
      void 0,
      void 0,
      t.props
    );
  }
  function S(t) {
    return typeof t == "object" && t !== null && t.$$typeof === _;
  }
  function Z(t) {
    var e = { "=": "=0", ":": "=2" };
    return "$" + t.replace(/[=:]/g, function(n) {
      return e[n];
    });
  }
  var L = /\/+/g;
  function P(t, e) {
    return typeof t == "object" && t !== null && t.key != null ? Z("" + t.key) : e.toString(36);
  }
  function b() {
  }
  function F(t) {
    switch (t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw t.reason;
      default:
        switch (typeof t.status == "string" ? t.then(b, b) : (t.status = "pending", t.then(
          function(e) {
            t.status === "pending" && (t.status = "fulfilled", t.value = e);
          },
          function(e) {
            t.status === "pending" && (t.status = "rejected", t.reason = e);
          }
        )), t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw t.reason;
        }
    }
    throw t;
  }
  function C(t, e, n, r, s) {
    var f = typeof t;
    (f === "undefined" || f === "boolean") && (t = null);
    var o = !1;
    if (t === null) o = !0;
    else
      switch (f) {
        case "bigint":
        case "string":
        case "number":
          o = !0;
          break;
        case "object":
          switch (t.$$typeof) {
            case _:
            case E:
              o = !0;
              break;
            case $:
              return o = t._init, C(
                o(t._payload),
                e,
                n,
                r,
                s
              );
          }
      }
    if (o)
      return s = s(t), o = r === "" ? "." + P(t, 0) : r, q(s) ? (n = "", o != null && (n = o.replace(L, "$&/") + "/"), C(s, e, n, "", function(tt) {
        return tt;
      })) : s != null && (S(s) && (s = X(
        s,
        n + (s.key == null || t && t.key === s.key ? "" : ("" + s.key).replace(
          L,
          "$&/"
        ) + "/") + o
      )), e.push(s)), 1;
    o = 0;
    var v = r === "" ? "." : r + ":";
    if (q(t))
      for (var c = 0; c < t.length; c++)
        r = t[c], f = v + P(r, c), o += C(
          r,
          e,
          n,
          f,
          s
        );
    else if (c = Q(t), typeof c == "function")
      for (t = c.call(t), c = 0; !(r = t.next()).done; )
        r = r.value, f = v + P(r, c++), o += C(
          r,
          e,
          n,
          f,
          s
        );
    else if (f === "object") {
      if (typeof t.then == "function")
        return C(
          F(t),
          e,
          n,
          r,
          s
        );
      throw e = String(t), Error(
        "Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return o;
  }
  function h(t, e, n) {
    if (t == null) return t;
    var r = [], s = 0;
    return C(t, r, "", "", function(f) {
      return e.call(n, f, s++);
    }), r;
  }
  function K(t) {
    if (t._status === -1) {
      var e = t._result;
      e = e(), e.then(
        function(n) {
          (t._status === 0 || t._status === -1) && (t._status = 1, t._result = n);
        },
        function(n) {
          (t._status === 0 || t._status === -1) && (t._status = 2, t._result = n);
        }
      ), t._status === -1 && (t._status = 0, t._result = e);
    }
    if (t._status === 1) return t._result.default;
    throw t._result;
  }
  var U = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  };
  function V() {
  }
  return u.Children = {
    map: h,
    forEach: function(t, e, n) {
      h(
        t,
        function() {
          e.apply(this, arguments);
        },
        n
      );
    },
    count: function(t) {
      var e = 0;
      return h(t, function() {
        e++;
      }), e;
    },
    toArray: function(t) {
      return h(t, function(e) {
        return e;
      }) || [];
    },
    only: function(t) {
      if (!S(t))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return t;
    }
  }, u.Component = T, u.Fragment = d, u.Profiler = p, u.PureComponent = j, u.StrictMode = m, u.Suspense = B, u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, u.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, u.cache = function(t) {
    return function() {
      return t.apply(null, arguments);
    };
  }, u.cloneElement = function(t, e, n) {
    if (t == null)
      throw Error(
        "The argument must be a React element, but you passed " + t + "."
      );
    var r = k({}, t.props), s = t.key, f = void 0;
    if (e != null)
      for (o in e.ref !== void 0 && (f = void 0), e.key !== void 0 && (s = "" + e.key), e)
        !I.call(e, o) || o === "key" || o === "__self" || o === "__source" || o === "ref" && e.ref === void 0 || (r[o] = e[o]);
    var o = arguments.length - 2;
    if (o === 1) r.children = n;
    else if (1 < o) {
      for (var v = Array(o), c = 0; c < o; c++)
        v[c] = arguments[c + 2];
      r.children = v;
    }
    return A(t.type, s, void 0, void 0, f, r);
  }, u.createContext = function(t) {
    return t = {
      $$typeof: y,
      _currentValue: t,
      _currentValue2: t,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, t.Provider = t, t.Consumer = {
      $$typeof: l,
      _context: t
    }, t;
  }, u.createElement = function(t, e, n) {
    var r, s = {}, f = null;
    if (e != null)
      for (r in e.key !== void 0 && (f = "" + e.key), e)
        I.call(e, r) && r !== "key" && r !== "__self" && r !== "__source" && (s[r] = e[r]);
    var o = arguments.length - 2;
    if (o === 1) s.children = n;
    else if (1 < o) {
      for (var v = Array(o), c = 0; c < o; c++)
        v[c] = arguments[c + 2];
      s.children = v;
    }
    if (t && t.defaultProps)
      for (r in o = t.defaultProps, o)
        s[r] === void 0 && (s[r] = o[r]);
    return A(t, f, void 0, void 0, null, s);
  }, u.createRef = function() {
    return { current: null };
  }, u.forwardRef = function(t) {
    return { $$typeof: R, render: t };
  }, u.isValidElement = S, u.lazy = function(t) {
    return {
      $$typeof: $,
      _payload: { _status: -1, _result: t },
      _init: K
    };
  }, u.memo = function(t, e) {
    return {
      $$typeof: W,
      type: t,
      compare: e === void 0 ? null : e
    };
  }, u.startTransition = function(t) {
    var e = i.T, n = {};
    i.T = n;
    try {
      var r = t(), s = i.S;
      s !== null && s(n, r), typeof r == "object" && r !== null && typeof r.then == "function" && r.then(V, U);
    } catch (f) {
      U(f);
    } finally {
      i.T = e;
    }
  }, u.unstable_useCacheRefresh = function() {
    return i.H.useCacheRefresh();
  }, u.use = function(t) {
    return i.H.use(t);
  }, u.useActionState = function(t, e, n) {
    return i.H.useActionState(t, e, n);
  }, u.useCallback = function(t, e) {
    return i.H.useCallback(t, e);
  }, u.useContext = function(t) {
    return i.H.useContext(t);
  }, u.useDebugValue = function() {
  }, u.useDeferredValue = function(t, e) {
    return i.H.useDeferredValue(t, e);
  }, u.useEffect = function(t, e) {
    return i.H.useEffect(t, e);
  }, u.useId = function() {
    return i.H.useId();
  }, u.useImperativeHandle = function(t, e, n) {
    return i.H.useImperativeHandle(t, e, n);
  }, u.useInsertionEffect = function(t, e) {
    return i.H.useInsertionEffect(t, e);
  }, u.useLayoutEffect = function(t, e) {
    return i.H.useLayoutEffect(t, e);
  }, u.useMemo = function(t, e) {
    return i.H.useMemo(t, e);
  }, u.useOptimistic = function(t, e) {
    return i.H.useOptimistic(t, e);
  }, u.useReducer = function(t, e, n) {
    return i.H.useReducer(t, e, n);
  }, u.useRef = function(t) {
    return i.H.useRef(t);
  }, u.useState = function(t) {
    return i.H.useState(t);
  }, u.useSyncExternalStore = function(t, e, n) {
    return i.H.useSyncExternalStore(
      t,
      e,
      n
    );
  }, u.useTransition = function() {
    return i.H.useTransition();
  }, u.version = "19.0.0", u;
}
var G;
function ut() {
  return G || (G = 1, H.exports = rt()), H.exports;
}
var st = ut();
function ot({ title: _, content: E, pinned: d, user: m, onClick: p }) {
  m && (_ = "@" + m.username);
  const l = E.split(`
`).map((y, R) => /* @__PURE__ */ a.jsxs("span", { children: [
    y,
    /* @__PURE__ */ a.jsx("br", {})
  ] }, R));
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      onClick: () => {
        p && p();
      },
      className: `
            rounded-lg
            p-4
            mt-4

            Card
        `,
      children: [
        d && /* @__PURE__ */ a.jsx("div", { className: "text-sm text-yellow-500 font-bold mb-2", children: "📌" }),
        /* @__PURE__ */ a.jsx("h2", { className: "text-lg font-semibold", children: _ }),
        /* @__PURE__ */ a.jsx("p", { className: "mt-2", children: l })
      ]
    }
  );
}
function it({ title: _ = "🛠 full send item", className: E }) {
  function d() {
    alert("Item sent! 🚀");
  }
  return /* @__PURE__ */ a.jsxs("div", { className: E, children: [
    /* @__PURE__ */ a.jsx("div", { children: /* @__PURE__ */ a.jsx("h1", { children: _ }) }),
    /* @__PURE__ */ a.jsx(
      ot,
      {
        title: "📞 what's up, nya? ;3",
        content: "⚠ owo. we need to make dis editabwu"
      }
    ),
    /* @__PURE__ */ a.jsx("div", { className: "card", children: /* @__PURE__ */ a.jsx("button", { onClick: () => d(), children: "🚀 Send" }) })
  ] });
}
export {
  it as A,
  ut as a,
  a as j,
  st as r
};
