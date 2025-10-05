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
  var _ = Symbol.for("react.transitional.element"), y = Symbol.for("react.fragment");
  function E(v, p, a) {
    var R = null;
    if (a !== void 0 && (R = "" + a), p.key !== void 0 && (R = "" + p.key), "key" in p) {
      a = {};
      for (var m in p)
        m !== "key" && (a[m] = p[m]);
    } else a = p;
    return p = a.ref, {
      $$typeof: _,
      type: v,
      key: R,
      ref: p !== void 0 ? p : null,
      props: a
    };
  }
  return x.Fragment = y, x.jsx = E, x.jsxs = E, x;
}
var J;
function nt() {
  return J || (J = 1, O.exports = et()), O.exports;
}
var l = nt(), $ = { exports: {} }, o = {};
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
  if (z) return o;
  z = 1;
  var _ = Symbol.for("react.transitional.element"), y = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), a = Symbol.for("react.consumer"), R = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), W = Symbol.for("react.memo"), H = Symbol.for("react.lazy"), g = Symbol.iterator;
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
  var A = j.prototype = new M();
  A.constructor = j, k(A, T.prototype), A.isPureReactComponent = !0;
  var q = Array.isArray, i = { H: null, A: null, T: null, S: null }, I = Object.prototype.hasOwnProperty;
  function w(t, e, n, r, s, f) {
    return n = f.ref, {
      $$typeof: _,
      type: t,
      key: e,
      ref: n !== void 0 ? n : null,
      props: f
    };
  }
  function X(t, e) {
    return w(
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
    var u = !1;
    if (t === null) u = !0;
    else
      switch (f) {
        case "bigint":
        case "string":
        case "number":
          u = !0;
          break;
        case "object":
          switch (t.$$typeof) {
            case _:
            case y:
              u = !0;
              break;
            case H:
              return u = t._init, C(
                u(t._payload),
                e,
                n,
                r,
                s
              );
          }
      }
    if (u)
      return s = s(t), u = r === "" ? "." + P(t, 0) : r, q(s) ? (n = "", u != null && (n = u.replace(L, "$&/") + "/"), C(s, e, n, "", function(tt) {
        return tt;
      })) : s != null && (S(s) && (s = X(
        s,
        n + (s.key == null || t && t.key === s.key ? "" : ("" + s.key).replace(
          L,
          "$&/"
        ) + "/") + u
      )), e.push(s)), 1;
    u = 0;
    var d = r === "" ? "." : r + ":";
    if (q(t))
      for (var c = 0; c < t.length; c++)
        r = t[c], f = d + P(r, c), u += C(
          r,
          e,
          n,
          f,
          s
        );
    else if (c = Q(t), typeof c == "function")
      for (t = c.call(t), c = 0; !(r = t.next()).done; )
        r = r.value, f = d + P(r, c++), u += C(
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
    return u;
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
  return o.Children = {
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
  }, o.Component = T, o.Fragment = E, o.Profiler = p, o.PureComponent = j, o.StrictMode = v, o.Suspense = B, o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, o.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, o.cache = function(t) {
    return function() {
      return t.apply(null, arguments);
    };
  }, o.cloneElement = function(t, e, n) {
    if (t == null)
      throw Error(
        "The argument must be a React element, but you passed " + t + "."
      );
    var r = k({}, t.props), s = t.key, f = void 0;
    if (e != null)
      for (u in e.ref !== void 0 && (f = void 0), e.key !== void 0 && (s = "" + e.key), e)
        !I.call(e, u) || u === "key" || u === "__self" || u === "__source" || u === "ref" && e.ref === void 0 || (r[u] = e[u]);
    var u = arguments.length - 2;
    if (u === 1) r.children = n;
    else if (1 < u) {
      for (var d = Array(u), c = 0; c < u; c++)
        d[c] = arguments[c + 2];
      r.children = d;
    }
    return w(t.type, s, void 0, void 0, f, r);
  }, o.createContext = function(t) {
    return t = {
      $$typeof: R,
      _currentValue: t,
      _currentValue2: t,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, t.Provider = t, t.Consumer = {
      $$typeof: a,
      _context: t
    }, t;
  }, o.createElement = function(t, e, n) {
    var r, s = {}, f = null;
    if (e != null)
      for (r in e.key !== void 0 && (f = "" + e.key), e)
        I.call(e, r) && r !== "key" && r !== "__self" && r !== "__source" && (s[r] = e[r]);
    var u = arguments.length - 2;
    if (u === 1) s.children = n;
    else if (1 < u) {
      for (var d = Array(u), c = 0; c < u; c++)
        d[c] = arguments[c + 2];
      s.children = d;
    }
    if (t && t.defaultProps)
      for (r in u = t.defaultProps, u)
        s[r] === void 0 && (s[r] = u[r]);
    return w(t, f, void 0, void 0, null, s);
  }, o.createRef = function() {
    return { current: null };
  }, o.forwardRef = function(t) {
    return { $$typeof: m, render: t };
  }, o.isValidElement = S, o.lazy = function(t) {
    return {
      $$typeof: H,
      _payload: { _status: -1, _result: t },
      _init: K
    };
  }, o.memo = function(t, e) {
    return {
      $$typeof: W,
      type: t,
      compare: e === void 0 ? null : e
    };
  }, o.startTransition = function(t) {
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
  }, o.unstable_useCacheRefresh = function() {
    return i.H.useCacheRefresh();
  }, o.use = function(t) {
    return i.H.use(t);
  }, o.useActionState = function(t, e, n) {
    return i.H.useActionState(t, e, n);
  }, o.useCallback = function(t, e) {
    return i.H.useCallback(t, e);
  }, o.useContext = function(t) {
    return i.H.useContext(t);
  }, o.useDebugValue = function() {
  }, o.useDeferredValue = function(t, e) {
    return i.H.useDeferredValue(t, e);
  }, o.useEffect = function(t, e) {
    return i.H.useEffect(t, e);
  }, o.useId = function() {
    return i.H.useId();
  }, o.useImperativeHandle = function(t, e, n) {
    return i.H.useImperativeHandle(t, e, n);
  }, o.useInsertionEffect = function(t, e) {
    return i.H.useInsertionEffect(t, e);
  }, o.useLayoutEffect = function(t, e) {
    return i.H.useLayoutEffect(t, e);
  }, o.useMemo = function(t, e) {
    return i.H.useMemo(t, e);
  }, o.useOptimistic = function(t, e) {
    return i.H.useOptimistic(t, e);
  }, o.useReducer = function(t, e, n) {
    return i.H.useReducer(t, e, n);
  }, o.useRef = function(t) {
    return i.H.useRef(t);
  }, o.useState = function(t) {
    return i.H.useState(t);
  }, o.useSyncExternalStore = function(t, e, n) {
    return i.H.useSyncExternalStore(
      t,
      e,
      n
    );
  }, o.useTransition = function() {
    return i.H.useTransition();
  }, o.version = "19.0.0", o;
}
var G;
function ot() {
  return G || (G = 1, $.exports = rt()), $.exports;
}
var ut = ot();
function st({ title: _, content: y, pinned: E, user: v, onClick: p }) {
  v && (_ = "@" + v.username);
  const a = y.split(`
`).map((R, m) => /* @__PURE__ */ l.jsxs("span", { children: [
    R,
    /* @__PURE__ */ l.jsx("br", {})
  ] }, m));
  return /* @__PURE__ */ l.jsxs(
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
        E && /* @__PURE__ */ l.jsx("div", { className: "text-sm text-yellow-500 font-bold mb-2", children: "📌" }),
        /* @__PURE__ */ l.jsx("h2", { className: "text-lg font-semibold", children: _ }),
        /* @__PURE__ */ l.jsx("p", { className: "mt-2", children: a })
      ]
    }
  );
}
function it({ title: _ = "Meow App 🐱", initialCount: y = 0, className: E }) {
  const [v, p] = ut.useState(y);
  return /* @__PURE__ */ l.jsxs("div", { className: E, children: [
    /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx("h1", { children: _ }) }),
    /* @__PURE__ */ l.jsx(
      st,
      {
        title: "Interactive Counter",
        content: `Current count: ${v}`,
        onClick: () => p(v + 1)
      }
    ),
    /* @__PURE__ */ l.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ l.jsxs("button", { onClick: () => p((a) => a + 1), children: [
        "count is ",
        v
      ] }),
      /* @__PURE__ */ l.jsx("p", { children: "This is the Meow SPA embedded in your app!" })
    ] })
  ] });
}
export {
  it as A,
  l as j,
  ot as r
};
