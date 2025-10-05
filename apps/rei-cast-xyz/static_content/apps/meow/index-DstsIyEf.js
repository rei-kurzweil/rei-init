var qe = { exports: {} }, xe = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var st;
function vt() {
  if (st) return xe;
  st = 1;
  var S = Symbol.for("react.transitional.element"), d = Symbol.for("react.fragment");
  function L(M, j, k) {
    var $ = null;
    if (k !== void 0 && ($ = "" + k), j.key !== void 0 && ($ = "" + j.key), "key" in j) {
      k = {};
      for (var Y in j)
        Y !== "key" && (k[Y] = j[Y]);
    } else k = j;
    return j = k.ref, {
      $$typeof: S,
      type: M,
      key: $,
      ref: j !== void 0 ? j : null,
      props: k
    };
  }
  return xe.Fragment = d, xe.jsx = L, xe.jsxs = L, xe;
}
var Me = {}, ze = { exports: {} }, y = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var at;
function Et() {
  if (at) return y;
  at = 1;
  var S = Symbol.for("react.transitional.element"), d = Symbol.for("react.portal"), L = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), k = Symbol.for("react.consumer"), $ = Symbol.for("react.context"), Y = Symbol.for("react.forward_ref"), se = Symbol.for("react.suspense"), V = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), me = Symbol.iterator;
  function Ae(n) {
    return n === null || typeof n != "object" ? null : (n = me && n[me] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var Se = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, he = Object.assign, J = {};
  function q(n, u, E) {
    this.props = n, this.context = u, this.refs = J, this.updater = E || Se;
  }
  q.prototype.isReactComponent = {}, q.prototype.setState = function(n, u) {
    if (typeof n != "object" && typeof n != "function" && n != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, n, u, "setState");
  }, q.prototype.forceUpdate = function(n) {
    this.updater.enqueueForceUpdate(this, n, "forceUpdate");
  };
  function re() {
  }
  re.prototype = q.prototype;
  function Z(n, u, E) {
    this.props = n, this.context = u, this.refs = J, this.updater = E || Se;
  }
  var ae = Z.prototype = new re();
  ae.constructor = Z, he(ae, q.prototype), ae.isPureReactComponent = !0;
  var ie = Array.isArray, O = { H: null, A: null, T: null, S: null }, F = Object.prototype.hasOwnProperty;
  function fe(n, u, E, p, h, T) {
    return E = T.ref, {
      $$typeof: S,
      type: n,
      key: u,
      ref: E !== void 0 ? E : null,
      props: T
    };
  }
  function ge(n, u) {
    return fe(
      n.type,
      u,
      void 0,
      void 0,
      void 0,
      n.props
    );
  }
  function U(n) {
    return typeof n == "object" && n !== null && n.$$typeof === S;
  }
  function ye(n) {
    var u = { "=": "=0", ":": "=2" };
    return "$" + n.replace(/[=:]/g, function(E) {
      return u[E];
    });
  }
  var ce = /\/+/g;
  function ne(n, u) {
    return typeof n == "object" && n !== null && n.key != null ? ye("" + n.key) : u.toString(36);
  }
  function ee() {
  }
  function le(n) {
    switch (n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw n.reason;
      default:
        switch (typeof n.status == "string" ? n.then(ee, ee) : (n.status = "pending", n.then(
          function(u) {
            n.status === "pending" && (n.status = "fulfilled", n.value = u);
          },
          function(u) {
            n.status === "pending" && (n.status = "rejected", n.reason = u);
          }
        )), n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw n.reason;
        }
    }
    throw n;
  }
  function K(n, u, E, p, h) {
    var T = typeof n;
    (T === "undefined" || T === "boolean") && (n = null);
    var m = !1;
    if (n === null) m = !0;
    else
      switch (T) {
        case "bigint":
        case "string":
        case "number":
          m = !0;
          break;
        case "object":
          switch (n.$$typeof) {
            case S:
            case d:
              m = !0;
              break;
            case B:
              return m = n._init, K(
                m(n._payload),
                u,
                E,
                p,
                h
              );
          }
      }
    if (m)
      return h = h(n), m = p === "" ? "." + ne(n, 0) : p, ie(h) ? (E = "", m != null && (E = m.replace(ce, "$&/") + "/"), K(h, u, E, "", function(de) {
        return de;
      })) : h != null && (U(h) && (h = ge(
        h,
        E + (h.key == null || n && n.key === h.key ? "" : ("" + h.key).replace(
          ce,
          "$&/"
        ) + "/") + m
      )), u.push(h)), 1;
    m = 0;
    var H = p === "" ? "." : p + ":";
    if (ie(n))
      for (var A = 0; A < n.length; A++)
        p = n[A], T = H + ne(p, A), m += K(
          p,
          u,
          E,
          T,
          h
        );
    else if (A = Ae(n), typeof A == "function")
      for (n = A.call(n), A = 0; !(p = n.next()).done; )
        p = p.value, T = H + ne(p, A++), m += K(
          p,
          u,
          E,
          T,
          h
        );
    else if (T === "object") {
      if (typeof n.then == "function")
        return K(
          le(n),
          u,
          E,
          p,
          h
        );
      throw u = String(n), Error(
        "Objects are not valid as a React child (found: " + (u === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : u) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return m;
  }
  function z(n, u, E) {
    if (n == null) return n;
    var p = [], h = 0;
    return K(n, p, "", "", function(T) {
      return u.call(E, T, h++);
    }), p;
  }
  function oe(n) {
    if (n._status === -1) {
      var u = n._result;
      u = u(), u.then(
        function(E) {
          (n._status === 0 || n._status === -1) && (n._status = 1, n._result = E);
        },
        function(E) {
          (n._status === 0 || n._status === -1) && (n._status = 2, n._result = E);
        }
      ), n._status === -1 && (n._status = 0, n._result = u);
    }
    if (n._status === 1) return n._result.default;
    throw n._result;
  }
  var je = typeof reportError == "function" ? reportError : function(n) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var u = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof n == "object" && n !== null && typeof n.message == "string" ? String(n.message) : String(n),
        error: n
      });
      if (!window.dispatchEvent(u)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", n);
      return;
    }
    console.error(n);
  };
  function b() {
  }
  return y.Children = {
    map: z,
    forEach: function(n, u, E) {
      z(
        n,
        function() {
          u.apply(this, arguments);
        },
        E
      );
    },
    count: function(n) {
      var u = 0;
      return z(n, function() {
        u++;
      }), u;
    },
    toArray: function(n) {
      return z(n, function(u) {
        return u;
      }) || [];
    },
    only: function(n) {
      if (!U(n))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return n;
    }
  }, y.Component = q, y.Fragment = L, y.Profiler = j, y.PureComponent = Z, y.StrictMode = M, y.Suspense = se, y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = O, y.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, y.cache = function(n) {
    return function() {
      return n.apply(null, arguments);
    };
  }, y.cloneElement = function(n, u, E) {
    if (n == null)
      throw Error(
        "The argument must be a React element, but you passed " + n + "."
      );
    var p = he({}, n.props), h = n.key, T = void 0;
    if (u != null)
      for (m in u.ref !== void 0 && (T = void 0), u.key !== void 0 && (h = "" + u.key), u)
        !F.call(u, m) || m === "key" || m === "__self" || m === "__source" || m === "ref" && u.ref === void 0 || (p[m] = u[m]);
    var m = arguments.length - 2;
    if (m === 1) p.children = E;
    else if (1 < m) {
      for (var H = Array(m), A = 0; A < m; A++)
        H[A] = arguments[A + 2];
      p.children = H;
    }
    return fe(n.type, h, void 0, void 0, T, p);
  }, y.createContext = function(n) {
    return n = {
      $$typeof: $,
      _currentValue: n,
      _currentValue2: n,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, n.Provider = n, n.Consumer = {
      $$typeof: k,
      _context: n
    }, n;
  }, y.createElement = function(n, u, E) {
    var p, h = {}, T = null;
    if (u != null)
      for (p in u.key !== void 0 && (T = "" + u.key), u)
        F.call(u, p) && p !== "key" && p !== "__self" && p !== "__source" && (h[p] = u[p]);
    var m = arguments.length - 2;
    if (m === 1) h.children = E;
    else if (1 < m) {
      for (var H = Array(m), A = 0; A < m; A++)
        H[A] = arguments[A + 2];
      h.children = H;
    }
    if (n && n.defaultProps)
      for (p in m = n.defaultProps, m)
        h[p] === void 0 && (h[p] = m[p]);
    return fe(n, T, void 0, void 0, null, h);
  }, y.createRef = function() {
    return { current: null };
  }, y.forwardRef = function(n) {
    return { $$typeof: Y, render: n };
  }, y.isValidElement = U, y.lazy = function(n) {
    return {
      $$typeof: B,
      _payload: { _status: -1, _result: n },
      _init: oe
    };
  }, y.memo = function(n, u) {
    return {
      $$typeof: V,
      type: n,
      compare: u === void 0 ? null : u
    };
  }, y.startTransition = function(n) {
    var u = O.T, E = {};
    O.T = E;
    try {
      var p = n(), h = O.S;
      h !== null && h(E, p), typeof p == "object" && p !== null && typeof p.then == "function" && p.then(b, je);
    } catch (T) {
      je(T);
    } finally {
      O.T = u;
    }
  }, y.unstable_useCacheRefresh = function() {
    return O.H.useCacheRefresh();
  }, y.use = function(n) {
    return O.H.use(n);
  }, y.useActionState = function(n, u, E) {
    return O.H.useActionState(n, u, E);
  }, y.useCallback = function(n, u) {
    return O.H.useCallback(n, u);
  }, y.useContext = function(n) {
    return O.H.useContext(n);
  }, y.useDebugValue = function() {
  }, y.useDeferredValue = function(n, u) {
    return O.H.useDeferredValue(n, u);
  }, y.useEffect = function(n, u) {
    return O.H.useEffect(n, u);
  }, y.useId = function() {
    return O.H.useId();
  }, y.useImperativeHandle = function(n, u, E) {
    return O.H.useImperativeHandle(n, u, E);
  }, y.useInsertionEffect = function(n, u) {
    return O.H.useInsertionEffect(n, u);
  }, y.useLayoutEffect = function(n, u) {
    return O.H.useLayoutEffect(n, u);
  }, y.useMemo = function(n, u) {
    return O.H.useMemo(n, u);
  }, y.useOptimistic = function(n, u) {
    return O.H.useOptimistic(n, u);
  }, y.useReducer = function(n, u, E) {
    return O.H.useReducer(n, u, E);
  }, y.useRef = function(n) {
    return O.H.useRef(n);
  }, y.useState = function(n) {
    return O.H.useState(n);
  }, y.useSyncExternalStore = function(n, u, E) {
    return O.H.useSyncExternalStore(
      n,
      u,
      E
    );
  }, y.useTransition = function() {
    return O.H.useTransition();
  }, y.version = "19.0.0", y;
}
var $e = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
$e.exports;
var it;
function mt() {
  return it || (it = 1, function(S, d) {
    process.env.NODE_ENV !== "production" && function() {
      function L(e, r) {
        Object.defineProperty(k.prototype, e, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              r[0],
              r[1]
            );
          }
        });
      }
      function M(e) {
        return e === null || typeof e != "object" ? null : (e = Ne && e[Ne] || e["@@iterator"], typeof e == "function" ? e : null);
      }
      function j(e, r) {
        e = (e = e.constructor) && (e.displayName || e.name) || "ReactClass";
        var o = e + "." + r;
        Pe[o] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          r,
          e
        ), Pe[o] = !0);
      }
      function k(e, r, o) {
        this.props = e, this.context = r, this.refs = i, this.updater = o || t;
      }
      function $() {
      }
      function Y(e, r, o) {
        this.props = e, this.context = r, this.refs = i, this.updater = o || t;
      }
      function se(e) {
        return "" + e;
      }
      function V(e) {
        try {
          se(e);
          var r = !1;
        } catch {
          r = !0;
        }
        if (r) {
          r = console;
          var o = r.error, s = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return o.call(
            r,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            s
          ), se(e);
        }
      }
      function B(e) {
        if (e == null) return null;
        if (typeof e == "function")
          return e.$$typeof === g ? null : e.displayName || e.name || null;
        if (typeof e == "string") return e;
        switch (e) {
          case A:
            return "Fragment";
          case H:
            return "Portal";
          case ke:
            return "Profiler";
          case de:
            return "StrictMode";
          case pe:
            return "Suspense";
          case Ce:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (typeof e.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), e.$$typeof) {
            case we:
              return (e.displayName || "Context") + ".Provider";
            case _e:
              return (e._context.displayName || "Context") + ".Consumer";
            case be:
              var r = e.render;
              return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
            case Te:
              return r = e.displayName || null, r !== null ? r : B(e.type) || "Memo";
            case ve:
              r = e._payload, e = e._init;
              try {
                return B(e(r));
              } catch {
              }
          }
        return null;
      }
      function me(e) {
        return typeof e == "string" || typeof e == "function" || e === A || e === ke || e === de || e === pe || e === Ce || e === Ye || typeof e == "object" && e !== null && (e.$$typeof === ve || e.$$typeof === Te || e.$$typeof === we || e.$$typeof === _e || e.$$typeof === be || e.$$typeof === x || e.getModuleId !== void 0);
      }
      function Ae() {
      }
      function Se() {
        if (I === 0) {
          Ee = console.log, D = console.info, Re = console.warn, Q = console.error, Qe = console.group, Xe = console.groupCollapsed, De = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Ae,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        I++;
      }
      function he() {
        if (I--, I === 0) {
          var e = { configurable: !0, enumerable: !0, writable: !0 };
          Object.defineProperties(console, {
            log: a({}, e, { value: Ee }),
            info: a({}, e, { value: D }),
            warn: a({}, e, { value: Re }),
            error: a({}, e, { value: Q }),
            group: a({}, e, { value: Qe }),
            groupCollapsed: a({}, e, { value: Xe }),
            groupEnd: a({}, e, { value: De })
          });
        }
        0 > I && console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
      }
      function J(e) {
        if (Ie === void 0)
          try {
            throw Error();
          } catch (o) {
            var r = o.stack.trim().match(/\n( *(at )?)/);
            Ie = r && r[1] || "", Ve = -1 < o.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < o.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return `
` + Ie + e + Ve;
      }
      function q(e, r) {
        if (!e || Ge) return "";
        var o = Be.get(e);
        if (o !== void 0) return o;
        Ge = !0, o = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
        var s = null;
        s = v.H, v.H = null, Se();
        try {
          var f = {
            DetermineComponentFrameRoot: function() {
              try {
                if (r) {
                  var te = function() {
                    throw Error();
                  };
                  if (Object.defineProperty(te.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  }), typeof Reflect == "object" && Reflect.construct) {
                    try {
                      Reflect.construct(te, []);
                    } catch (ue) {
                      var Le = ue;
                    }
                    Reflect.construct(e, [], te);
                  } else {
                    try {
                      te.call();
                    } catch (ue) {
                      Le = ue;
                    }
                    e.call(te.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (ue) {
                    Le = ue;
                  }
                  (te = e()) && typeof te.catch == "function" && te.catch(function() {
                  });
                }
              } catch (ue) {
                if (ue && Le && typeof ue.stack == "string")
                  return [ue.stack, Le.stack];
              }
              return [null, null];
            }
          };
          f.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var l = Object.getOwnPropertyDescriptor(
            f.DetermineComponentFrameRoot,
            "name"
          );
          l && l.configurable && Object.defineProperty(
            f.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var c = f.DetermineComponentFrameRoot(), C = c[0], w = c[1];
          if (C && w) {
            var N = C.split(`
`), W = w.split(`
`);
            for (c = l = 0; l < N.length && !N[l].includes(
              "DetermineComponentFrameRoot"
            ); )
              l++;
            for (; c < W.length && !W[c].includes(
              "DetermineComponentFrameRoot"
            ); )
              c++;
            if (l === N.length || c === W.length)
              for (l = N.length - 1, c = W.length - 1; 1 <= l && 0 <= c && N[l] !== W[c]; )
                c--;
            for (; 1 <= l && 0 <= c; l--, c--)
              if (N[l] !== W[c]) {
                if (l !== 1 || c !== 1)
                  do
                    if (l--, c--, 0 > c || N[l] !== W[c]) {
                      var Oe = `
` + N[l].replace(
                        " at new ",
                        " at "
                      );
                      return e.displayName && Oe.includes("<anonymous>") && (Oe = Oe.replace("<anonymous>", e.displayName)), typeof e == "function" && Be.set(e, Oe), Oe;
                    }
                  while (1 <= l && 0 <= c);
                break;
              }
          }
        } finally {
          Ge = !1, v.H = s, he(), Error.prepareStackTrace = o;
        }
        return N = (N = e ? e.displayName || e.name : "") ? J(N) : "", typeof e == "function" && Be.set(e, N), N;
      }
      function re(e) {
        if (e == null) return "";
        if (typeof e == "function") {
          var r = e.prototype;
          return q(
            e,
            !(!r || !r.isReactComponent)
          );
        }
        if (typeof e == "string") return J(e);
        switch (e) {
          case pe:
            return J("Suspense");
          case Ce:
            return J("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case be:
              return e = q(e.render, !1), e;
            case Te:
              return re(e.type);
            case ve:
              r = e._payload, e = e._init;
              try {
                return re(e(r));
              } catch {
              }
          }
        return "";
      }
      function Z() {
        var e = v.A;
        return e === null ? null : e.getOwner();
      }
      function ae(e) {
        if (X.call(e, "key")) {
          var r = Object.getOwnPropertyDescriptor(e, "key").get;
          if (r && r.isReactWarning) return !1;
        }
        return e.key !== void 0;
      }
      function ie(e, r) {
        function o() {
          Je || (Je = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            r
          ));
        }
        o.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: o,
          configurable: !0
        });
      }
      function O() {
        var e = B(this.type);
        return Fe[e] || (Fe[e] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), e = this.props.ref, e !== void 0 ? e : null;
      }
      function F(e, r, o, s, f, l) {
        return o = l.ref, e = {
          $$typeof: m,
          type: e,
          key: r,
          props: l,
          _owner: f
        }, (o !== void 0 ? o : null) !== null ? Object.defineProperty(e, "ref", {
          enumerable: !1,
          get: O
        }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: 0
        }), Object.defineProperty(e, "_debugInfo", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: null
        }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
      }
      function fe(e, r) {
        return r = F(
          e.type,
          r,
          void 0,
          void 0,
          e._owner,
          e.props
        ), r._store.validated = e._store.validated, r;
      }
      function ge(e, r) {
        if (typeof e == "object" && e && e.$$typeof !== pt) {
          if (R(e))
            for (var o = 0; o < e.length; o++) {
              var s = e[o];
              U(s) && ye(s, r);
            }
          else if (U(e))
            e._store && (e._store.validated = 1);
          else if (o = M(e), typeof o == "function" && o !== e.entries && (o = o.call(e), o !== e))
            for (; !(e = o.next()).done; )
              U(e.value) && ye(e.value, r);
        }
      }
      function U(e) {
        return typeof e == "object" && e !== null && e.$$typeof === m;
      }
      function ye(e, r) {
        if (e._store && !e._store.validated && e.key == null && (e._store.validated = 1, r = ce(r), !et[r])) {
          et[r] = !0;
          var o = "";
          e && e._owner != null && e._owner !== Z() && (o = null, typeof e._owner.tag == "number" ? o = B(e._owner.type) : typeof e._owner.name == "string" && (o = e._owner.name), o = " It was passed a child from " + o + ".");
          var s = v.getCurrentStack;
          v.getCurrentStack = function() {
            var f = re(e.type);
            return s && (f += s() || ""), f;
          }, console.error(
            'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
            r,
            o
          ), v.getCurrentStack = s;
        }
      }
      function ce(e) {
        var r = "", o = Z();
        return o && (o = B(o.type)) && (r = `

Check the render method of \`` + o + "`."), r || (e = B(e)) && (r = `

Check the top-level render call using <` + e + ">."), r;
      }
      function ne(e) {
        var r = { "=": "=0", ":": "=2" };
        return "$" + e.replace(/[=:]/g, function(o) {
          return r[o];
        });
      }
      function ee(e, r) {
        return typeof e == "object" && e !== null && e.key != null ? (V(e.key), ne("" + e.key)) : r.toString(36);
      }
      function le() {
      }
      function K(e) {
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw e.reason;
          default:
            switch (typeof e.status == "string" ? e.then(le, le) : (e.status = "pending", e.then(
              function(r) {
                e.status === "pending" && (e.status = "fulfilled", e.value = r);
              },
              function(r) {
                e.status === "pending" && (e.status = "rejected", e.reason = r);
              }
            )), e.status) {
              case "fulfilled":
                return e.value;
              case "rejected":
                throw e.reason;
            }
        }
        throw e;
      }
      function z(e, r, o, s, f) {
        var l = typeof e;
        (l === "undefined" || l === "boolean") && (e = null);
        var c = !1;
        if (e === null) c = !0;
        else
          switch (l) {
            case "bigint":
            case "string":
            case "number":
              c = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case m:
                case H:
                  c = !0;
                  break;
                case ve:
                  return c = e._init, z(
                    c(e._payload),
                    r,
                    o,
                    s,
                    f
                  );
              }
          }
        if (c) {
          c = e, f = f(c);
          var C = s === "" ? "." + ee(c, 0) : s;
          return R(f) ? (o = "", C != null && (o = C.replace(rt, "$&/") + "/"), z(f, r, o, "", function(N) {
            return N;
          })) : f != null && (U(f) && (f.key != null && (c && c.key === f.key || V(f.key)), o = fe(
            f,
            o + (f.key == null || c && c.key === f.key ? "" : ("" + f.key).replace(
              rt,
              "$&/"
            ) + "/") + C
          ), s !== "" && c != null && U(c) && c.key == null && c._store && !c._store.validated && (o._store.validated = 2), f = o), r.push(f)), 1;
        }
        if (c = 0, C = s === "" ? "." : s + ":", R(e))
          for (var w = 0; w < e.length; w++)
            s = e[w], l = C + ee(s, w), c += z(
              s,
              r,
              o,
              l,
              f
            );
        else if (w = M(e), typeof w == "function")
          for (w === e.entries && (tt || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), tt = !0), e = w.call(e), w = 0; !(s = e.next()).done; )
            s = s.value, l = C + ee(s, w++), c += z(
              s,
              r,
              o,
              l,
              f
            );
        else if (l === "object") {
          if (typeof e.then == "function")
            return z(
              K(e),
              r,
              o,
              s,
              f
            );
          throw r = String(e), Error(
            "Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return c;
      }
      function oe(e, r, o) {
        if (e == null) return e;
        var s = [], f = 0;
        return z(e, s, "", "", function(l) {
          return r.call(o, l, f++);
        }), s;
      }
      function je(e) {
        if (e._status === -1) {
          var r = e._result;
          r = r(), r.then(
            function(o) {
              (e._status === 0 || e._status === -1) && (e._status = 1, e._result = o);
            },
            function(o) {
              (e._status === 0 || e._status === -1) && (e._status = 2, e._result = o);
            }
          ), e._status === -1 && (e._status = 0, e._result = r);
        }
        if (e._status === 1)
          return r = e._result, r === void 0 && console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
            r
          ), "default" in r || console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
            r
          ), r.default;
        throw e._result;
      }
      function b() {
        var e = v.H;
        return e === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), e;
      }
      function n() {
      }
      function u(e) {
        if (Ue === null)
          try {
            var r = ("require" + Math.random()).slice(0, 7);
            Ue = (S && S[r]).call(
              S,
              "timers"
            ).setImmediate;
          } catch {
            Ue = function(s) {
              ot === !1 && (ot = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var f = new MessageChannel();
              f.port1.onmessage = s, f.port2.postMessage(void 0);
            };
          }
        return Ue(e);
      }
      function E(e) {
        return 1 < e.length && typeof AggregateError == "function" ? new AggregateError(e) : e[0];
      }
      function p(e, r) {
        r !== He - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), He = r;
      }
      function h(e, r, o) {
        var s = v.actQueue;
        if (s !== null)
          if (s.length !== 0)
            try {
              T(s), u(function() {
                return h(e, r, o);
              });
              return;
            } catch (f) {
              v.thrownErrors.push(f);
            }
          else v.actQueue = null;
        0 < v.thrownErrors.length ? (s = E(v.thrownErrors), v.thrownErrors.length = 0, o(s)) : r(e);
      }
      function T(e) {
        if (!Ke) {
          Ke = !0;
          var r = 0;
          try {
            for (; r < e.length; r++) {
              var o = e[r];
              do {
                v.didUsePromise = !1;
                var s = o(!1);
                if (s !== null) {
                  if (v.didUsePromise) {
                    e[r] = o, e.splice(0, r);
                    return;
                  }
                  o = s;
                } else break;
              } while (!0);
            }
            e.length = 0;
          } catch (f) {
            e.splice(0, r + 1), v.thrownErrors.push(f);
          } finally {
            Ke = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var m = Symbol.for("react.transitional.element"), H = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), de = Symbol.for("react.strict_mode"), ke = Symbol.for("react.profiler"), _e = Symbol.for("react.consumer"), we = Symbol.for("react.context"), be = Symbol.for("react.forward_ref"), pe = Symbol.for("react.suspense"), Ce = Symbol.for("react.suspense_list"), Te = Symbol.for("react.memo"), ve = Symbol.for("react.lazy"), Ye = Symbol.for("react.offscreen"), Ne = Symbol.iterator, Pe = {}, t = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function(e) {
          j(e, "forceUpdate");
        },
        enqueueReplaceState: function(e) {
          j(e, "replaceState");
        },
        enqueueSetState: function(e) {
          j(e, "setState");
        }
      }, a = Object.assign, i = {};
      Object.freeze(i), k.prototype.isReactComponent = {}, k.prototype.setState = function(e, r) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, e, r, "setState");
      }, k.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      var _ = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      }, P;
      for (P in _)
        _.hasOwnProperty(P) && L(P, _[P]);
      $.prototype = k.prototype, _ = Y.prototype = new $(), _.constructor = Y, a(_, k.prototype), _.isPureReactComponent = !0;
      var R = Array.isArray, g = Symbol.for("react.client.reference"), v = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1,
        didUsePromise: !1,
        thrownErrors: [],
        getCurrentStack: null
      }, X = Object.prototype.hasOwnProperty, x = Symbol.for("react.client.reference"), I = 0, Ee, D, Re, Q, Qe, Xe, De;
      Ae.__reactDisabledLog = !0;
      var Ie, Ve, Ge = !1, Be = new (typeof WeakMap == "function" ? WeakMap : Map)(), pt = Symbol.for("react.client.reference"), Je, Ze, Fe = {}, et = {}, tt = !1, rt = /\/+/g, nt = typeof reportError == "function" ? reportError : function(e) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var r = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
            error: e
          });
          if (!window.dispatchEvent(r)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", e);
          return;
        }
        console.error(e);
      }, ot = !1, Ue = null, He = 0, We = !1, Ke = !1, ut = typeof queueMicrotask == "function" ? function(e) {
        queueMicrotask(function() {
          return queueMicrotask(e);
        });
      } : u;
      d.Children = {
        map: oe,
        forEach: function(e, r, o) {
          oe(
            e,
            function() {
              r.apply(this, arguments);
            },
            o
          );
        },
        count: function(e) {
          var r = 0;
          return oe(e, function() {
            r++;
          }), r;
        },
        toArray: function(e) {
          return oe(e, function(r) {
            return r;
          }) || [];
        },
        only: function(e) {
          if (!U(e))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return e;
        }
      }, d.Component = k, d.Fragment = A, d.Profiler = ke, d.PureComponent = Y, d.StrictMode = de, d.Suspense = pe, d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = v, d.act = function(e) {
        var r = v.actQueue, o = He;
        He++;
        var s = v.actQueue = r !== null ? r : [], f = !1;
        try {
          var l = e();
        } catch (w) {
          v.thrownErrors.push(w);
        }
        if (0 < v.thrownErrors.length)
          throw p(r, o), e = E(v.thrownErrors), v.thrownErrors.length = 0, e;
        if (l !== null && typeof l == "object" && typeof l.then == "function") {
          var c = l;
          return ut(function() {
            f || We || (We = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(w, N) {
              f = !0, c.then(
                function(W) {
                  if (p(r, o), o === 0) {
                    try {
                      T(s), u(function() {
                        return h(
                          W,
                          w,
                          N
                        );
                      });
                    } catch (te) {
                      v.thrownErrors.push(te);
                    }
                    if (0 < v.thrownErrors.length) {
                      var Oe = E(
                        v.thrownErrors
                      );
                      v.thrownErrors.length = 0, N(Oe);
                    }
                  } else w(W);
                },
                function(W) {
                  p(r, o), 0 < v.thrownErrors.length && (W = E(
                    v.thrownErrors
                  ), v.thrownErrors.length = 0), N(W);
                }
              );
            }
          };
        }
        var C = l;
        if (p(r, o), o === 0 && (T(s), s.length !== 0 && ut(function() {
          f || We || (We = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), v.actQueue = null), 0 < v.thrownErrors.length)
          throw e = E(v.thrownErrors), v.thrownErrors.length = 0, e;
        return {
          then: function(w, N) {
            f = !0, o === 0 ? (v.actQueue = s, u(function() {
              return h(
                C,
                w,
                N
              );
            })) : w(C);
          }
        };
      }, d.cache = function(e) {
        return function() {
          return e.apply(null, arguments);
        };
      }, d.cloneElement = function(e, r, o) {
        if (e == null)
          throw Error(
            "The argument must be a React element, but you passed " + e + "."
          );
        var s = a({}, e.props), f = e.key, l = e._owner;
        if (r != null) {
          var c;
          e: {
            if (X.call(r, "ref") && (c = Object.getOwnPropertyDescriptor(
              r,
              "ref"
            ).get) && c.isReactWarning) {
              c = !1;
              break e;
            }
            c = r.ref !== void 0;
          }
          c && (l = Z()), ae(r) && (V(r.key), f = "" + r.key);
          for (C in r)
            !X.call(r, C) || C === "key" || C === "__self" || C === "__source" || C === "ref" && r.ref === void 0 || (s[C] = r[C]);
        }
        var C = arguments.length - 2;
        if (C === 1) s.children = o;
        else if (1 < C) {
          c = Array(C);
          for (var w = 0; w < C; w++)
            c[w] = arguments[w + 2];
          s.children = c;
        }
        for (s = F(e.type, f, void 0, void 0, l, s), f = 2; f < arguments.length; f++)
          ge(arguments[f], s.type);
        return s;
      }, d.createContext = function(e) {
        return e = {
          $$typeof: we,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, e.Provider = e, e.Consumer = {
          $$typeof: _e,
          _context: e
        }, e._currentRenderer = null, e._currentRenderer2 = null, e;
      }, d.createElement = function(e, r, o) {
        if (me(e))
          for (var s = 2; s < arguments.length; s++)
            ge(arguments[s], e);
        else {
          if (s = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null) var f = "null";
          else
            R(e) ? f = "array" : e !== void 0 && e.$$typeof === m ? (f = "<" + (B(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : f = typeof e;
          console.error(
            "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
            f,
            s
          );
        }
        var l;
        if (s = {}, f = null, r != null)
          for (l in Ze || !("__self" in r) || "key" in r || (Ze = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), ae(r) && (V(r.key), f = "" + r.key), r)
            X.call(r, l) && l !== "key" && l !== "__self" && l !== "__source" && (s[l] = r[l]);
        var c = arguments.length - 2;
        if (c === 1) s.children = o;
        else if (1 < c) {
          for (var C = Array(c), w = 0; w < c; w++)
            C[w] = arguments[w + 2];
          Object.freeze && Object.freeze(C), s.children = C;
        }
        if (e && e.defaultProps)
          for (l in c = e.defaultProps, c)
            s[l] === void 0 && (s[l] = c[l]);
        return f && ie(
          s,
          typeof e == "function" ? e.displayName || e.name || "Unknown" : e
        ), F(e, f, void 0, void 0, Z(), s);
      }, d.createRef = function() {
        var e = { current: null };
        return Object.seal(e), e;
      }, d.forwardRef = function(e) {
        e != null && e.$$typeof === Te ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : typeof e != "function" ? console.error(
          "forwardRef requires a render function but was given %s.",
          e === null ? "null" : typeof e
        ) : e.length !== 0 && e.length !== 2 && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        ), e != null && e.defaultProps != null && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var r = { $$typeof: be, render: e }, o;
        return Object.defineProperty(r, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return o;
          },
          set: function(s) {
            o = s, e.name || e.displayName || (Object.defineProperty(e, "name", { value: s }), e.displayName = s);
          }
        }), r;
      }, d.isValidElement = U, d.lazy = function(e) {
        return {
          $$typeof: ve,
          _payload: { _status: -1, _result: e },
          _init: je
        };
      }, d.memo = function(e, r) {
        me(e) || console.error(
          "memo: The first argument must be a component. Instead received: %s",
          e === null ? "null" : typeof e
        ), r = {
          $$typeof: Te,
          type: e,
          compare: r === void 0 ? null : r
        };
        var o;
        return Object.defineProperty(r, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return o;
          },
          set: function(s) {
            o = s, e.name || e.displayName || (Object.defineProperty(e, "name", { value: s }), e.displayName = s);
          }
        }), r;
      }, d.startTransition = function(e) {
        var r = v.T, o = {};
        v.T = o, o._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var s = e(), f = v.S;
          f !== null && f(o, s), typeof s == "object" && s !== null && typeof s.then == "function" && s.then(n, nt);
        } catch (l) {
          nt(l);
        } finally {
          r === null && o._updatedFibers && (e = o._updatedFibers.size, o._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), v.T = r;
        }
      }, d.unstable_useCacheRefresh = function() {
        return b().useCacheRefresh();
      }, d.use = function(e) {
        return b().use(e);
      }, d.useActionState = function(e, r, o) {
        return b().useActionState(
          e,
          r,
          o
        );
      }, d.useCallback = function(e, r) {
        return b().useCallback(e, r);
      }, d.useContext = function(e) {
        var r = b();
        return e.$$typeof === _e && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), r.useContext(e);
      }, d.useDebugValue = function(e, r) {
        return b().useDebugValue(e, r);
      }, d.useDeferredValue = function(e, r) {
        return b().useDeferredValue(e, r);
      }, d.useEffect = function(e, r) {
        return b().useEffect(e, r);
      }, d.useId = function() {
        return b().useId();
      }, d.useImperativeHandle = function(e, r, o) {
        return b().useImperativeHandle(e, r, o);
      }, d.useInsertionEffect = function(e, r) {
        return b().useInsertionEffect(e, r);
      }, d.useLayoutEffect = function(e, r) {
        return b().useLayoutEffect(e, r);
      }, d.useMemo = function(e, r) {
        return b().useMemo(e, r);
      }, d.useOptimistic = function(e, r) {
        return b().useOptimistic(e, r);
      }, d.useReducer = function(e, r, o) {
        return b().useReducer(e, r, o);
      }, d.useRef = function(e) {
        return b().useRef(e);
      }, d.useState = function(e) {
        return b().useState(e);
      }, d.useSyncExternalStore = function(e, r, o) {
        return b().useSyncExternalStore(
          e,
          r,
          o
        );
      }, d.useTransition = function() {
        return b().useTransition();
      }, d.version = "19.0.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }($e, $e.exports)), $e.exports;
}
var ft;
function dt() {
  return ft || (ft = 1, process.env.NODE_ENV === "production" ? ze.exports = Et() : ze.exports = mt()), ze.exports;
}
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ct;
function ht() {
  return ct || (ct = 1, process.env.NODE_ENV !== "production" && function() {
    function S(t) {
      if (t == null) return null;
      if (typeof t == "function")
        return t.$$typeof === je ? null : t.displayName || t.name || null;
      if (typeof t == "string") return t;
      switch (t) {
        case F:
          return "Fragment";
        case O:
          return "Portal";
        case ge:
          return "Profiler";
        case fe:
          return "StrictMode";
        case ne:
          return "Suspense";
        case ee:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (typeof t.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), t.$$typeof) {
          case ye:
            return (t.displayName || "Context") + ".Provider";
          case U:
            return (t._context.displayName || "Context") + ".Consumer";
          case ce:
            var a = t.render;
            return t = t.displayName, t || (t = a.displayName || a.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
          case le:
            return a = t.displayName || null, a !== null ? a : S(t.type) || "Memo";
          case K:
            a = t._payload, t = t._init;
            try {
              return S(t(a));
            } catch {
            }
        }
      return null;
    }
    function d(t) {
      return "" + t;
    }
    function L(t) {
      try {
        d(t);
        var a = !1;
      } catch {
        a = !0;
      }
      if (a) {
        a = console;
        var i = a.error, _ = typeof Symbol == "function" && Symbol.toStringTag && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return i.call(
          a,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          _
        ), d(t);
      }
    }
    function M() {
    }
    function j() {
      if (h === 0) {
        T = console.log, m = console.info, H = console.warn, A = console.error, de = console.group, ke = console.groupCollapsed, _e = console.groupEnd;
        var t = {
          configurable: !0,
          enumerable: !0,
          value: M,
          writable: !0
        };
        Object.defineProperties(console, {
          info: t,
          log: t,
          warn: t,
          error: t,
          group: t,
          groupCollapsed: t,
          groupEnd: t
        });
      }
      h++;
    }
    function k() {
      if (h--, h === 0) {
        var t = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: u({}, t, { value: T }),
          info: u({}, t, { value: m }),
          warn: u({}, t, { value: H }),
          error: u({}, t, { value: A }),
          group: u({}, t, { value: de }),
          groupCollapsed: u({}, t, { value: ke }),
          groupEnd: u({}, t, { value: _e })
        });
      }
      0 > h && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function $(t) {
      if (we === void 0)
        try {
          throw Error();
        } catch (i) {
          var a = i.stack.trim().match(/\n( *(at )?)/);
          we = a && a[1] || "", be = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + we + t + be;
    }
    function Y(t, a) {
      if (!t || pe) return "";
      var i = Ce.get(t);
      if (i !== void 0) return i;
      pe = !0, i = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var _ = null;
      _ = b.H, b.H = null, j();
      try {
        var P = {
          DetermineComponentFrameRoot: function() {
            try {
              if (a) {
                var D = function() {
                  throw Error();
                };
                if (Object.defineProperty(D.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(D, []);
                  } catch (Q) {
                    var Re = Q;
                  }
                  Reflect.construct(t, [], D);
                } else {
                  try {
                    D.call();
                  } catch (Q) {
                    Re = Q;
                  }
                  t.call(D.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (Q) {
                  Re = Q;
                }
                (D = t()) && typeof D.catch == "function" && D.catch(function() {
                });
              }
            } catch (Q) {
              if (Q && Re && typeof Q.stack == "string")
                return [Q.stack, Re.stack];
            }
            return [null, null];
          }
        };
        P.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var R = Object.getOwnPropertyDescriptor(
          P.DetermineComponentFrameRoot,
          "name"
        );
        R && R.configurable && Object.defineProperty(
          P.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var g = P.DetermineComponentFrameRoot(), v = g[0], X = g[1];
        if (v && X) {
          var x = v.split(`
`), I = X.split(`
`);
          for (g = R = 0; R < x.length && !x[R].includes(
            "DetermineComponentFrameRoot"
          ); )
            R++;
          for (; g < I.length && !I[g].includes(
            "DetermineComponentFrameRoot"
          ); )
            g++;
          if (R === x.length || g === I.length)
            for (R = x.length - 1, g = I.length - 1; 1 <= R && 0 <= g && x[R] !== I[g]; )
              g--;
          for (; 1 <= R && 0 <= g; R--, g--)
            if (x[R] !== I[g]) {
              if (R !== 1 || g !== 1)
                do
                  if (R--, g--, 0 > g || x[R] !== I[g]) {
                    var Ee = `
` + x[R].replace(
                      " at new ",
                      " at "
                    );
                    return t.displayName && Ee.includes("<anonymous>") && (Ee = Ee.replace("<anonymous>", t.displayName)), typeof t == "function" && Ce.set(t, Ee), Ee;
                  }
                while (1 <= R && 0 <= g);
              break;
            }
        }
      } finally {
        pe = !1, b.H = _, k(), Error.prepareStackTrace = i;
      }
      return x = (x = t ? t.displayName || t.name : "") ? $(x) : "", typeof t == "function" && Ce.set(t, x), x;
    }
    function se(t) {
      if (t == null) return "";
      if (typeof t == "function") {
        var a = t.prototype;
        return Y(
          t,
          !(!a || !a.isReactComponent)
        );
      }
      if (typeof t == "string") return $(t);
      switch (t) {
        case ne:
          return $("Suspense");
        case ee:
          return $("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case ce:
            return t = Y(t.render, !1), t;
          case le:
            return se(t.type);
          case K:
            a = t._payload, t = t._init;
            try {
              return se(t(a));
            } catch {
            }
        }
      return "";
    }
    function V() {
      var t = b.A;
      return t === null ? null : t.getOwner();
    }
    function B(t) {
      if (n.call(t, "key")) {
        var a = Object.getOwnPropertyDescriptor(t, "key").get;
        if (a && a.isReactWarning) return !1;
      }
      return t.key !== void 0;
    }
    function me(t, a) {
      function i() {
        ve || (ve = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          a
        ));
      }
      i.isReactWarning = !0, Object.defineProperty(t, "key", {
        get: i,
        configurable: !0
      });
    }
    function Ae() {
      var t = S(this.type);
      return Ye[t] || (Ye[t] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), t = this.props.ref, t !== void 0 ? t : null;
    }
    function Se(t, a, i, _, P, R) {
      return i = R.ref, t = {
        $$typeof: ie,
        type: t,
        key: a,
        props: R,
        _owner: P
      }, (i !== void 0 ? i : null) !== null ? Object.defineProperty(t, "ref", {
        enumerable: !1,
        get: Ae
      }) : Object.defineProperty(t, "ref", { enumerable: !1, value: null }), t._store = {}, Object.defineProperty(t._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(t, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(t.props), Object.freeze(t)), t;
    }
    function he(t, a, i, _, P, R) {
      if (typeof t == "string" || typeof t == "function" || t === F || t === ge || t === fe || t === ne || t === ee || t === z || typeof t == "object" && t !== null && (t.$$typeof === K || t.$$typeof === le || t.$$typeof === ye || t.$$typeof === U || t.$$typeof === ce || t.$$typeof === E || t.getModuleId !== void 0)) {
        var g = a.children;
        if (g !== void 0)
          if (_)
            if (p(g)) {
              for (_ = 0; _ < g.length; _++)
                J(g[_], t);
              Object.freeze && Object.freeze(g);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else J(g, t);
      } else
        g = "", (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (g += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), t === null ? _ = "null" : p(t) ? _ = "array" : t !== void 0 && t.$$typeof === ie ? (_ = "<" + (S(t.type) || "Unknown") + " />", g = " Did you accidentally export a JSX literal instead of a component?") : _ = typeof t, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          _,
          g
        );
      if (n.call(a, "key")) {
        g = S(t);
        var v = Object.keys(a).filter(function(x) {
          return x !== "key";
        });
        _ = 0 < v.length ? "{key: someKey, " + v.join(": ..., ") + ": ...}" : "{key: someKey}", Ne[g + _] || (v = 0 < v.length ? "{" + v.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          _,
          g,
          v,
          g
        ), Ne[g + _] = !0);
      }
      if (g = null, i !== void 0 && (L(i), g = "" + i), B(a) && (L(a.key), g = "" + a.key), "key" in a) {
        i = {};
        for (var X in a)
          X !== "key" && (i[X] = a[X]);
      } else i = a;
      return g && me(
        i,
        typeof t == "function" ? t.displayName || t.name || "Unknown" : t
      ), Se(t, g, R, P, V(), i);
    }
    function J(t, a) {
      if (typeof t == "object" && t && t.$$typeof !== Te) {
        if (p(t))
          for (var i = 0; i < t.length; i++) {
            var _ = t[i];
            q(_) && re(_, a);
          }
        else if (q(t))
          t._store && (t._store.validated = 1);
        else if (t === null || typeof t != "object" ? i = null : (i = oe && t[oe] || t["@@iterator"], i = typeof i == "function" ? i : null), typeof i == "function" && i !== t.entries && (i = i.call(t), i !== t))
          for (; !(t = i.next()).done; )
            q(t.value) && re(t.value, a);
      }
    }
    function q(t) {
      return typeof t == "object" && t !== null && t.$$typeof === ie;
    }
    function re(t, a) {
      if (t._store && !t._store.validated && t.key == null && (t._store.validated = 1, a = Z(a), !Pe[a])) {
        Pe[a] = !0;
        var i = "";
        t && t._owner != null && t._owner !== V() && (i = null, typeof t._owner.tag == "number" ? i = S(t._owner.type) : typeof t._owner.name == "string" && (i = t._owner.name), i = " It was passed a child from " + i + ".");
        var _ = b.getCurrentStack;
        b.getCurrentStack = function() {
          var P = se(t.type);
          return _ && (P += _() || ""), P;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          a,
          i
        ), b.getCurrentStack = _;
      }
    }
    function Z(t) {
      var a = "", i = V();
      return i && (i = S(i.type)) && (a = `

Check the render method of \`` + i + "`."), a || (t = S(t)) && (a = `

Check the top-level render call using <` + t + ">."), a;
    }
    var ae = dt(), ie = Symbol.for("react.transitional.element"), O = Symbol.for("react.portal"), F = Symbol.for("react.fragment"), fe = Symbol.for("react.strict_mode"), ge = Symbol.for("react.profiler"), U = Symbol.for("react.consumer"), ye = Symbol.for("react.context"), ce = Symbol.for("react.forward_ref"), ne = Symbol.for("react.suspense"), ee = Symbol.for("react.suspense_list"), le = Symbol.for("react.memo"), K = Symbol.for("react.lazy"), z = Symbol.for("react.offscreen"), oe = Symbol.iterator, je = Symbol.for("react.client.reference"), b = ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, n = Object.prototype.hasOwnProperty, u = Object.assign, E = Symbol.for("react.client.reference"), p = Array.isArray, h = 0, T, m, H, A, de, ke, _e;
    M.__reactDisabledLog = !0;
    var we, be, pe = !1, Ce = new (typeof WeakMap == "function" ? WeakMap : Map)(), Te = Symbol.for("react.client.reference"), ve, Ye = {}, Ne = {}, Pe = {};
    Me.Fragment = F, Me.jsx = function(t, a, i, _, P) {
      return he(t, a, i, !1, _, P);
    }, Me.jsxs = function(t, a, i, _, P) {
      return he(t, a, i, !0, _, P);
    };
  }()), Me;
}
var lt;
function gt() {
  return lt || (lt = 1, process.env.NODE_ENV === "production" ? qe.exports = vt() : qe.exports = ht()), qe.exports;
}
var G = gt(), yt = dt();
function _t({ title: S, content: d, pinned: L, user: M, onClick: j }) {
  M && (S = "@" + M.username);
  const k = d.split(`
`).map(($, Y) => /* @__PURE__ */ G.jsxs("span", { children: [
    $,
    /* @__PURE__ */ G.jsx("br", {})
  ] }, Y));
  return /* @__PURE__ */ G.jsxs(
    "div",
    {
      onClick: () => {
        j && j();
      },
      className: `
            rounded-lg
            p-4
            mt-4

            Card
        `,
      children: [
        L && /* @__PURE__ */ G.jsx("div", { className: "text-sm text-yellow-500 font-bold mb-2", children: "📌" }),
        /* @__PURE__ */ G.jsx("h2", { className: "text-lg font-semibold", children: S }),
        /* @__PURE__ */ G.jsx("p", { className: "mt-2", children: k })
      ]
    }
  );
}
function wt({ title: S = "Meow App 🐱", initialCount: d = 0, className: L }) {
  const [M, j] = yt.useState(d);
  return /* @__PURE__ */ G.jsxs("div", { className: L, children: [
    /* @__PURE__ */ G.jsx("div", { children: /* @__PURE__ */ G.jsx("h1", { children: S }) }),
    /* @__PURE__ */ G.jsx(
      _t,
      {
        title: "Interactive Counter",
        content: `Current count: ${M}`,
        onClick: () => j(M + 1)
      }
    ),
    /* @__PURE__ */ G.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ G.jsxs("button", { onClick: () => j((k) => k + 1), children: [
        "count is ",
        M
      ] }),
      /* @__PURE__ */ G.jsx("p", { children: "This is the Meow SPA embedded in your app!" })
    ] })
  ] });
}
export {
  wt as A,
  G as j,
  dt as r
};
