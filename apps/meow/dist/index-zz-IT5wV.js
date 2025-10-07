function Tr(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function Xr(n) {
  if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
  var e = n.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(n).forEach(function(r) {
    var s = Object.getOwnPropertyDescriptor(n, r);
    Object.defineProperty(t, r, s.get ? s : {
      enumerable: !0,
      get: function() {
        return n[r];
      }
    });
  }), t;
}
var ft = { exports: {} }, Ge = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qt;
function es() {
  if (qt) return Ge;
  qt = 1;
  var n = Symbol.for("react.transitional.element"), e = Symbol.for("react.fragment");
  function t(r, s, i) {
    var o = null;
    if (i !== void 0 && (o = "" + i), s.key !== void 0 && (o = "" + s.key), "key" in s) {
      i = {};
      for (var a in s)
        a !== "key" && (i[a] = s[a]);
    } else i = s;
    return s = i.ref, {
      $$typeof: n,
      type: r,
      key: o,
      ref: s !== void 0 ? s : null,
      props: i
    };
  }
  return Ge.Fragment = e, Ge.jsx = t, Ge.jsxs = t, Ge;
}
var Ht;
function ts() {
  return Ht || (Ht = 1, ft.exports = es()), ft.exports;
}
var te = ts(), pt = { exports: {} }, O = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vt;
function rs() {
  if (Vt) return O;
  Vt = 1;
  var n = Symbol.for("react.transitional.element"), e = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), i = Symbol.for("react.consumer"), o = Symbol.for("react.context"), a = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), c = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), d = Symbol.iterator;
  function h(f) {
    return f === null || typeof f != "object" ? null : (f = d && f[d] || f["@@iterator"], typeof f == "function" ? f : null);
  }
  var g = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, m = Object.assign, w = {};
  function v(f, S, j) {
    this.props = f, this.context = S, this.refs = w, this.updater = j || g;
  }
  v.prototype.isReactComponent = {}, v.prototype.setState = function(f, S) {
    if (typeof f != "object" && typeof f != "function" && f != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, f, S, "setState");
  }, v.prototype.forceUpdate = function(f) {
    this.updater.enqueueForceUpdate(this, f, "forceUpdate");
  };
  function y() {
  }
  y.prototype = v.prototype;
  function _(f, S, j) {
    this.props = f, this.context = S, this.refs = w, this.updater = j || g;
  }
  var b = _.prototype = new y();
  b.constructor = _, m(b, v.prototype), b.isPureReactComponent = !0;
  var k = Array.isArray, E = { H: null, A: null, T: null, S: null }, C = Object.prototype.hasOwnProperty;
  function x(f, S, j, A, L, q) {
    return j = q.ref, {
      $$typeof: n,
      type: f,
      key: S,
      ref: j !== void 0 ? j : null,
      props: q
    };
  }
  function B(f, S) {
    return x(
      f.type,
      S,
      void 0,
      void 0,
      void 0,
      f.props
    );
  }
  function N(f) {
    return typeof f == "object" && f !== null && f.$$typeof === n;
  }
  function M(f) {
    var S = { "=": "=0", ":": "=2" };
    return "$" + f.replace(/[=:]/g, function(j) {
      return S[j];
    });
  }
  var F = /\/+/g;
  function X(f, S) {
    return typeof f == "object" && f !== null && f.key != null ? M("" + f.key) : S.toString(36);
  }
  function ae() {
  }
  function le(f) {
    switch (f.status) {
      case "fulfilled":
        return f.value;
      case "rejected":
        throw f.reason;
      default:
        switch (typeof f.status == "string" ? f.then(ae, ae) : (f.status = "pending", f.then(
          function(S) {
            f.status === "pending" && (f.status = "fulfilled", f.value = S);
          },
          function(S) {
            f.status === "pending" && (f.status = "rejected", f.reason = S);
          }
        )), f.status) {
          case "fulfilled":
            return f.value;
          case "rejected":
            throw f.reason;
        }
    }
    throw f;
  }
  function W(f, S, j, A, L) {
    var q = typeof f;
    (q === "undefined" || q === "boolean") && (f = null);
    var I = !1;
    if (f === null) I = !0;
    else
      switch (q) {
        case "bigint":
        case "string":
        case "number":
          I = !0;
          break;
        case "object":
          switch (f.$$typeof) {
            case n:
            case e:
              I = !0;
              break;
            case u:
              return I = f._init, W(
                I(f._payload),
                S,
                j,
                A,
                L
              );
          }
      }
    if (I)
      return L = L(f), I = A === "" ? "." + X(f, 0) : A, k(L) ? (j = "", I != null && (j = I.replace(F, "$&/") + "/"), W(L, S, j, "", function(Qr) {
        return Qr;
      })) : L != null && (N(L) && (L = B(
        L,
        j + (L.key == null || f && f.key === L.key ? "" : ("" + L.key).replace(
          F,
          "$&/"
        ) + "/") + I
      )), S.push(L)), 1;
    I = 0;
    var pe = A === "" ? "." : A + ":";
    if (k(f))
      for (var G = 0; G < f.length; G++)
        A = f[G], q = pe + X(A, G), I += W(
          A,
          S,
          j,
          q,
          L
        );
    else if (G = h(f), typeof G == "function")
      for (f = G.call(f), G = 0; !(A = f.next()).done; )
        A = A.value, q = pe + X(A, G++), I += W(
          A,
          S,
          j,
          q,
          L
        );
    else if (q === "object") {
      if (typeof f.then == "function")
        return W(
          le(f),
          S,
          j,
          A,
          L
        );
      throw S = String(f), Error(
        "Objects are not valid as a React child (found: " + (S === "[object Object]" ? "object with keys {" + Object.keys(f).join(", ") + "}" : S) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return I;
  }
  function z(f, S, j) {
    if (f == null) return f;
    var A = [], L = 0;
    return W(f, A, "", "", function(q) {
      return S.call(j, q, L++);
    }), A;
  }
  function fe(f) {
    if (f._status === -1) {
      var S = f._result;
      S = S(), S.then(
        function(j) {
          (f._status === 0 || f._status === -1) && (f._status = 1, f._result = j);
        },
        function(j) {
          (f._status === 0 || f._status === -1) && (f._status = 2, f._result = j);
        }
      ), f._status === -1 && (f._status = 0, f._result = S);
    }
    if (f._status === 1) return f._result.default;
    throw f._result;
  }
  var ce = typeof reportError == "function" ? reportError : function(f) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var S = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof f == "object" && f !== null && typeof f.message == "string" ? String(f.message) : String(f),
        error: f
      });
      if (!window.dispatchEvent(S)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", f);
      return;
    }
    console.error(f);
  };
  function nt() {
  }
  return O.Children = {
    map: z,
    forEach: function(f, S, j) {
      z(
        f,
        function() {
          S.apply(this, arguments);
        },
        j
      );
    },
    count: function(f) {
      var S = 0;
      return z(f, function() {
        S++;
      }), S;
    },
    toArray: function(f) {
      return z(f, function(S) {
        return S;
      }) || [];
    },
    only: function(f) {
      if (!N(f))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return f;
    }
  }, O.Component = v, O.Fragment = t, O.Profiler = s, O.PureComponent = _, O.StrictMode = r, O.Suspense = l, O.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = E, O.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, O.cache = function(f) {
    return function() {
      return f.apply(null, arguments);
    };
  }, O.cloneElement = function(f, S, j) {
    if (f == null)
      throw Error(
        "The argument must be a React element, but you passed " + f + "."
      );
    var A = m({}, f.props), L = f.key, q = void 0;
    if (S != null)
      for (I in S.ref !== void 0 && (q = void 0), S.key !== void 0 && (L = "" + S.key), S)
        !C.call(S, I) || I === "key" || I === "__self" || I === "__source" || I === "ref" && S.ref === void 0 || (A[I] = S[I]);
    var I = arguments.length - 2;
    if (I === 1) A.children = j;
    else if (1 < I) {
      for (var pe = Array(I), G = 0; G < I; G++)
        pe[G] = arguments[G + 2];
      A.children = pe;
    }
    return x(f.type, L, void 0, void 0, q, A);
  }, O.createContext = function(f) {
    return f = {
      $$typeof: o,
      _currentValue: f,
      _currentValue2: f,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, f.Provider = f, f.Consumer = {
      $$typeof: i,
      _context: f
    }, f;
  }, O.createElement = function(f, S, j) {
    var A, L = {}, q = null;
    if (S != null)
      for (A in S.key !== void 0 && (q = "" + S.key), S)
        C.call(S, A) && A !== "key" && A !== "__self" && A !== "__source" && (L[A] = S[A]);
    var I = arguments.length - 2;
    if (I === 1) L.children = j;
    else if (1 < I) {
      for (var pe = Array(I), G = 0; G < I; G++)
        pe[G] = arguments[G + 2];
      L.children = pe;
    }
    if (f && f.defaultProps)
      for (A in I = f.defaultProps, I)
        L[A] === void 0 && (L[A] = I[A]);
    return x(f, q, void 0, void 0, null, L);
  }, O.createRef = function() {
    return { current: null };
  }, O.forwardRef = function(f) {
    return { $$typeof: a, render: f };
  }, O.isValidElement = N, O.lazy = function(f) {
    return {
      $$typeof: u,
      _payload: { _status: -1, _result: f },
      _init: fe
    };
  }, O.memo = function(f, S) {
    return {
      $$typeof: c,
      type: f,
      compare: S === void 0 ? null : S
    };
  }, O.startTransition = function(f) {
    var S = E.T, j = {};
    E.T = j;
    try {
      var A = f(), L = E.S;
      L !== null && L(j, A), typeof A == "object" && A !== null && typeof A.then == "function" && A.then(nt, ce);
    } catch (q) {
      ce(q);
    } finally {
      E.T = S;
    }
  }, O.unstable_useCacheRefresh = function() {
    return E.H.useCacheRefresh();
  }, O.use = function(f) {
    return E.H.use(f);
  }, O.useActionState = function(f, S, j) {
    return E.H.useActionState(f, S, j);
  }, O.useCallback = function(f, S) {
    return E.H.useCallback(f, S);
  }, O.useContext = function(f) {
    return E.H.useContext(f);
  }, O.useDebugValue = function() {
  }, O.useDeferredValue = function(f, S) {
    return E.H.useDeferredValue(f, S);
  }, O.useEffect = function(f, S) {
    return E.H.useEffect(f, S);
  }, O.useId = function() {
    return E.H.useId();
  }, O.useImperativeHandle = function(f, S, j) {
    return E.H.useImperativeHandle(f, S, j);
  }, O.useInsertionEffect = function(f, S) {
    return E.H.useInsertionEffect(f, S);
  }, O.useLayoutEffect = function(f, S) {
    return E.H.useLayoutEffect(f, S);
  }, O.useMemo = function(f, S) {
    return E.H.useMemo(f, S);
  }, O.useOptimistic = function(f, S) {
    return E.H.useOptimistic(f, S);
  }, O.useReducer = function(f, S, j) {
    return E.H.useReducer(f, S, j);
  }, O.useRef = function(f) {
    return E.H.useRef(f);
  }, O.useState = function(f) {
    return E.H.useState(f);
  }, O.useSyncExternalStore = function(f, S, j) {
    return E.H.useSyncExternalStore(
      f,
      S,
      j
    );
  }, O.useTransition = function() {
    return E.H.useTransition();
  }, O.version = "19.0.0", O;
}
var Gt;
function ss() {
  return Gt || (Gt = 1, pt.exports = rs()), pt.exports;
}
var P = ss();
const p = /* @__PURE__ */ Tr(P), ns = (n) => {
  let e;
  return n ? e = n : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => qe).then(({ default: r }) => r(...t)) : e = fetch, (...t) => e(...t);
};
class Nt extends Error {
  constructor(e, t = "FunctionsError", r) {
    super(e), this.name = t, this.context = r;
  }
}
class Kt extends Nt {
  constructor(e) {
    super("Failed to send a request to the Edge Function", "FunctionsFetchError", e);
  }
}
class Jt extends Nt {
  constructor(e) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", e);
  }
}
class Yt extends Nt {
  constructor(e) {
    super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e);
  }
}
var Tt;
(function(n) {
  n.Any = "any", n.ApNortheast1 = "ap-northeast-1", n.ApNortheast2 = "ap-northeast-2", n.ApSouth1 = "ap-south-1", n.ApSoutheast1 = "ap-southeast-1", n.ApSoutheast2 = "ap-southeast-2", n.CaCentral1 = "ca-central-1", n.EuCentral1 = "eu-central-1", n.EuWest1 = "eu-west-1", n.EuWest2 = "eu-west-2", n.EuWest3 = "eu-west-3", n.SaEast1 = "sa-east-1", n.UsEast1 = "us-east-1", n.UsWest1 = "us-west-1", n.UsWest2 = "us-west-2";
})(Tt || (Tt = {}));
var is = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function a(u) {
      try {
        c(r.next(u));
      } catch (d) {
        o(d);
      }
    }
    function l(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        o(d);
      }
    }
    function c(u) {
      u.done ? i(u.value) : s(u.value).then(a, l);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
class os {
  constructor(e, { headers: t = {}, customFetch: r, region: s = Tt.Any } = {}) {
    this.url = e, this.headers = t, this.region = s, this.fetch = ns(r);
  }
  /**
   * Updates the authorization header
   * @param token - the new jwt token sent in the authorisation header
   */
  setAuth(e) {
    this.headers.Authorization = `Bearer ${e}`;
  }
  /**
   * Invokes a function
   * @param functionName - The name of the Function to invoke.
   * @param options - Options for invoking the Function.
   */
  invoke(e, t = {}) {
    var r;
    return is(this, void 0, void 0, function* () {
      try {
        const { headers: s, method: i, body: o, signal: a } = t;
        let l = {}, { region: c } = t;
        c || (c = this.region);
        const u = new URL(`${this.url}/${e}`);
        c && c !== "any" && (l["x-region"] = c, u.searchParams.set("forceFunctionRegion", c));
        let d;
        o && (s && !Object.prototype.hasOwnProperty.call(s, "Content-Type") || !s) && (typeof Blob < "u" && o instanceof Blob || o instanceof ArrayBuffer ? (l["Content-Type"] = "application/octet-stream", d = o) : typeof o == "string" ? (l["Content-Type"] = "text/plain", d = o) : typeof FormData < "u" && o instanceof FormData ? d = o : (l["Content-Type"] = "application/json", d = JSON.stringify(o)));
        const h = yield this.fetch(u.toString(), {
          method: i || "POST",
          // headers priority is (high to low):
          // 1. invoke-level headers
          // 2. client-level headers
          // 3. default Content-Type header
          headers: Object.assign(Object.assign(Object.assign({}, l), this.headers), s),
          body: d,
          signal: a
        }).catch((v) => {
          throw v.name === "AbortError" ? v : new Kt(v);
        }), g = h.headers.get("x-relay-error");
        if (g && g === "true")
          throw new Jt(h);
        if (!h.ok)
          throw new Yt(h);
        let m = ((r = h.headers.get("Content-Type")) !== null && r !== void 0 ? r : "text/plain").split(";")[0].trim(), w;
        return m === "application/json" ? w = yield h.json() : m === "application/octet-stream" ? w = yield h.blob() : m === "text/event-stream" ? w = h : m === "multipart/form-data" ? w = yield h.formData() : w = yield h.text(), { data: w, error: null, response: h };
      } catch (s) {
        return s instanceof Error && s.name === "AbortError" ? { data: null, error: new Kt(s) } : {
          data: null,
          error: s,
          response: s instanceof Yt || s instanceof Jt ? s.context : void 0
        };
      }
    });
  }
}
var J = {}, $e = {}, Ae = {}, Oe = {}, Pe = {}, Re = {}, as = function() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof globalThis < "u")
    return globalThis;
  throw new Error("unable to locate global object");
}, ze = as();
const ls = ze.fetch, Cr = ze.fetch.bind(ze), xr = ze.Headers, cs = ze.Request, us = ze.Response, qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Headers: xr,
  Request: cs,
  Response: us,
  default: Cr,
  fetch: ls
}, Symbol.toStringTag, { value: "Module" })), ds = /* @__PURE__ */ Xr(qe);
var it = {}, Zt;
function jr() {
  if (Zt) return it;
  Zt = 1, Object.defineProperty(it, "__esModule", { value: !0 });
  class n extends Error {
    constructor(t) {
      super(t.message), this.name = "PostgrestError", this.details = t.details, this.hint = t.hint, this.code = t.code;
    }
  }
  return it.default = n, it;
}
var Qt;
function $r() {
  if (Qt) return Re;
  Qt = 1;
  var n = Re && Re.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(Re, "__esModule", { value: !0 });
  const e = n(ds), t = n(jr());
  class r {
    constructor(i) {
      var o, a;
      this.shouldThrowOnError = !1, this.method = i.method, this.url = i.url, this.headers = new Headers(i.headers), this.schema = i.schema, this.body = i.body, this.shouldThrowOnError = (o = i.shouldThrowOnError) !== null && o !== void 0 ? o : !1, this.signal = i.signal, this.isMaybeSingle = (a = i.isMaybeSingle) !== null && a !== void 0 ? a : !1, i.fetch ? this.fetch = i.fetch : typeof fetch > "u" ? this.fetch = e.default : this.fetch = fetch;
    }
    /**
     * If there's an error with the query, throwOnError will reject the promise by
     * throwing the error instead of returning it as part of a successful response.
     *
     * {@link https://github.com/supabase/supabase-js/issues/92}
     */
    throwOnError() {
      return this.shouldThrowOnError = !0, this;
    }
    /**
     * Set an HTTP header for the request.
     */
    setHeader(i, o) {
      return this.headers = new Headers(this.headers), this.headers.set(i, o), this;
    }
    then(i, o) {
      this.schema === void 0 || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), this.method !== "GET" && this.method !== "HEAD" && this.headers.set("Content-Type", "application/json");
      const a = this.fetch;
      let l = a(this.url.toString(), {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify(this.body),
        signal: this.signal
      }).then(async (c) => {
        var u, d, h, g;
        let m = null, w = null, v = null, y = c.status, _ = c.statusText;
        if (c.ok) {
          if (this.method !== "HEAD") {
            const C = await c.text();
            C === "" || (this.headers.get("Accept") === "text/csv" || this.headers.get("Accept") && (!((u = this.headers.get("Accept")) === null || u === void 0) && u.includes("application/vnd.pgrst.plan+text")) ? w = C : w = JSON.parse(C));
          }
          const k = (d = this.headers.get("Prefer")) === null || d === void 0 ? void 0 : d.match(/count=(exact|planned|estimated)/), E = (h = c.headers.get("content-range")) === null || h === void 0 ? void 0 : h.split("/");
          k && E && E.length > 1 && (v = parseInt(E[1])), this.isMaybeSingle && this.method === "GET" && Array.isArray(w) && (w.length > 1 ? (m = {
            // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
            code: "PGRST116",
            details: `Results contain ${w.length} rows, application/vnd.pgrst.object+json requires 1 row`,
            hint: null,
            message: "JSON object requested, multiple (or no) rows returned"
          }, w = null, v = null, y = 406, _ = "Not Acceptable") : w.length === 1 ? w = w[0] : w = null);
        } else {
          const k = await c.text();
          try {
            m = JSON.parse(k), Array.isArray(m) && c.status === 404 && (w = [], m = null, y = 200, _ = "OK");
          } catch {
            c.status === 404 && k === "" ? (y = 204, _ = "No Content") : m = {
              message: k
            };
          }
          if (m && this.isMaybeSingle && (!((g = m == null ? void 0 : m.details) === null || g === void 0) && g.includes("0 rows")) && (m = null, y = 200, _ = "OK"), m && this.shouldThrowOnError)
            throw new t.default(m);
        }
        return {
          error: m,
          data: w,
          count: v,
          status: y,
          statusText: _
        };
      });
      return this.shouldThrowOnError || (l = l.catch((c) => {
        var u, d, h;
        return {
          error: {
            message: `${(u = c == null ? void 0 : c.name) !== null && u !== void 0 ? u : "FetchError"}: ${c == null ? void 0 : c.message}`,
            details: `${(d = c == null ? void 0 : c.stack) !== null && d !== void 0 ? d : ""}`,
            hint: "",
            code: `${(h = c == null ? void 0 : c.code) !== null && h !== void 0 ? h : ""}`
          },
          data: null,
          count: null,
          status: 0,
          statusText: ""
        };
      })), l.then(i, o);
    }
    /**
     * Override the type of the returned `data`.
     *
     * @typeParam NewResult - The new result type to override with
     * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
     */
    returns() {
      return this;
    }
    /**
     * Override the type of the returned `data` field in the response.
     *
     * @typeParam NewResult - The new type to cast the response data to
     * @typeParam Options - Optional type configuration (defaults to { merge: true })
     * @typeParam Options.merge - When true, merges the new type with existing return type. When false, replaces the existing types entirely (defaults to true)
     * @example
     * ```typescript
     * // Merge with existing types (default behavior)
     * const query = supabase
     *   .from('users')
     *   .select()
     *   .overrideTypes<{ custom_field: string }>()
     *
     * // Replace existing types completely
     * const replaceQuery = supabase
     *   .from('users')
     *   .select()
     *   .overrideTypes<{ id: number; name: string }, { merge: false }>()
     * ```
     * @returns A PostgrestBuilder instance with the new type
     */
    overrideTypes() {
      return this;
    }
  }
  return Re.default = r, Re;
}
var Xt;
function Ar() {
  if (Xt) return Pe;
  Xt = 1;
  var n = Pe && Pe.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(Pe, "__esModule", { value: !0 });
  const e = n($r());
  class t extends e.default {
    /**
     * Perform a SELECT on the query result.
     *
     * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
     * return modified rows. By calling this method, modified rows are returned in
     * `data`.
     *
     * @param columns - The columns to retrieve, separated by commas
     */
    select(s) {
      let i = !1;
      const o = (s ?? "*").split("").map((a) => /\s/.test(a) && !i ? "" : (a === '"' && (i = !i), a)).join("");
      return this.url.searchParams.set("select", o), this.headers.append("Prefer", "return=representation"), this;
    }
    /**
     * Order the query result by `column`.
     *
     * You can call this method multiple times to order by multiple columns.
     *
     * You can order referenced tables, but it only affects the ordering of the
     * parent table if you use `!inner` in the query.
     *
     * @param column - The column to order by
     * @param options - Named parameters
     * @param options.ascending - If `true`, the result will be in ascending order
     * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
     * `null`s appear last.
     * @param options.referencedTable - Set this to order a referenced table by
     * its columns
     * @param options.foreignTable - Deprecated, use `options.referencedTable`
     * instead
     */
    order(s, { ascending: i = !0, nullsFirst: o, foreignTable: a, referencedTable: l = a } = {}) {
      const c = l ? `${l}.order` : "order", u = this.url.searchParams.get(c);
      return this.url.searchParams.set(c, `${u ? `${u},` : ""}${s}.${i ? "asc" : "desc"}${o === void 0 ? "" : o ? ".nullsfirst" : ".nullslast"}`), this;
    }
    /**
     * Limit the query result by `count`.
     *
     * @param count - The maximum number of rows to return
     * @param options - Named parameters
     * @param options.referencedTable - Set this to limit rows of referenced
     * tables instead of the parent table
     * @param options.foreignTable - Deprecated, use `options.referencedTable`
     * instead
     */
    limit(s, { foreignTable: i, referencedTable: o = i } = {}) {
      const a = typeof o > "u" ? "limit" : `${o}.limit`;
      return this.url.searchParams.set(a, `${s}`), this;
    }
    /**
     * Limit the query result by starting at an offset `from` and ending at the offset `to`.
     * Only records within this range are returned.
     * This respects the query order and if there is no order clause the range could behave unexpectedly.
     * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
     * and fourth rows of the query.
     *
     * @param from - The starting index from which to limit the result
     * @param to - The last index to which to limit the result
     * @param options - Named parameters
     * @param options.referencedTable - Set this to limit rows of referenced
     * tables instead of the parent table
     * @param options.foreignTable - Deprecated, use `options.referencedTable`
     * instead
     */
    range(s, i, { foreignTable: o, referencedTable: a = o } = {}) {
      const l = typeof a > "u" ? "offset" : `${a}.offset`, c = typeof a > "u" ? "limit" : `${a}.limit`;
      return this.url.searchParams.set(l, `${s}`), this.url.searchParams.set(c, `${i - s + 1}`), this;
    }
    /**
     * Set the AbortSignal for the fetch request.
     *
     * @param signal - The AbortSignal to use for the fetch request
     */
    abortSignal(s) {
      return this.signal = s, this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be one row (e.g. using `.limit(1)`), otherwise this
     * returns an error.
     */
    single() {
      return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
     * this returns an error.
     */
    maybeSingle() {
      return this.method === "GET" ? this.headers.set("Accept", "application/json") : this.headers.set("Accept", "application/vnd.pgrst.object+json"), this.isMaybeSingle = !0, this;
    }
    /**
     * Return `data` as a string in CSV format.
     */
    csv() {
      return this.headers.set("Accept", "text/csv"), this;
    }
    /**
     * Return `data` as an object in [GeoJSON](https://geojson.org) format.
     */
    geojson() {
      return this.headers.set("Accept", "application/geo+json"), this;
    }
    /**
     * Return `data` as the EXPLAIN plan for the query.
     *
     * You need to enable the
     * [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
     * setting before using this method.
     *
     * @param options - Named parameters
     *
     * @param options.analyze - If `true`, the query will be executed and the
     * actual run time will be returned
     *
     * @param options.verbose - If `true`, the query identifier will be returned
     * and `data` will include the output columns of the query
     *
     * @param options.settings - If `true`, include information on configuration
     * parameters that affect query planning
     *
     * @param options.buffers - If `true`, include information on buffer usage
     *
     * @param options.wal - If `true`, include information on WAL record generation
     *
     * @param options.format - The format of the output, can be `"text"` (default)
     * or `"json"`
     */
    explain({ analyze: s = !1, verbose: i = !1, settings: o = !1, buffers: a = !1, wal: l = !1, format: c = "text" } = {}) {
      var u;
      const d = [
        s ? "analyze" : null,
        i ? "verbose" : null,
        o ? "settings" : null,
        a ? "buffers" : null,
        l ? "wal" : null
      ].filter(Boolean).join("|"), h = (u = this.headers.get("Accept")) !== null && u !== void 0 ? u : "application/json";
      return this.headers.set("Accept", `application/vnd.pgrst.plan+${c}; for="${h}"; options=${d};`), c === "json" ? this : this;
    }
    /**
     * Rollback the query.
     *
     * `data` will still be returned, but the query is not committed.
     */
    rollback() {
      return this.headers.append("Prefer", "tx=rollback"), this;
    }
    /**
     * Override the type of the returned `data`.
     *
     * @typeParam NewResult - The new result type to override with
     * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
     */
    returns() {
      return this;
    }
    /**
     * Set the maximum number of rows that can be affected by the query.
     * Only available in PostgREST v13+ and only works with PATCH and DELETE methods.
     *
     * @param value - The maximum number of rows that can be affected
     */
    maxAffected(s) {
      return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${s}`), this;
    }
  }
  return Pe.default = t, Pe;
}
var er;
function Dt() {
  if (er) return Oe;
  er = 1;
  var n = Oe && Oe.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(Oe, "__esModule", { value: !0 });
  const e = n(Ar());
  class t extends e.default {
    /**
     * Match only rows where `column` is equal to `value`.
     *
     * To check if the value of `column` is NULL, you should use `.is()` instead.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    eq(s, i) {
      return this.url.searchParams.append(s, `eq.${i}`), this;
    }
    /**
     * Match only rows where `column` is not equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    neq(s, i) {
      return this.url.searchParams.append(s, `neq.${i}`), this;
    }
    /**
     * Match only rows where `column` is greater than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    gt(s, i) {
      return this.url.searchParams.append(s, `gt.${i}`), this;
    }
    /**
     * Match only rows where `column` is greater than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    gte(s, i) {
      return this.url.searchParams.append(s, `gte.${i}`), this;
    }
    /**
     * Match only rows where `column` is less than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    lt(s, i) {
      return this.url.searchParams.append(s, `lt.${i}`), this;
    }
    /**
     * Match only rows where `column` is less than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    lte(s, i) {
      return this.url.searchParams.append(s, `lte.${i}`), this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-sensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */
    like(s, i) {
      return this.url.searchParams.append(s, `like.${i}`), this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    likeAllOf(s, i) {
      return this.url.searchParams.append(s, `like(all).{${i.join(",")}}`), this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    likeAnyOf(s, i) {
      return this.url.searchParams.append(s, `like(any).{${i.join(",")}}`), this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-insensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */
    ilike(s, i) {
      return this.url.searchParams.append(s, `ilike.${i}`), this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    ilikeAllOf(s, i) {
      return this.url.searchParams.append(s, `ilike(all).{${i.join(",")}}`), this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    ilikeAnyOf(s, i) {
      return this.url.searchParams.append(s, `ilike(any).{${i.join(",")}}`), this;
    }
    /**
     * Match only rows where `column` IS `value`.
     *
     * For non-boolean columns, this is only relevant for checking if the value of
     * `column` is NULL by setting `value` to `null`.
     *
     * For boolean columns, you can also set `value` to `true` or `false` and it
     * will behave the same way as `.eq()`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    is(s, i) {
      return this.url.searchParams.append(s, `is.${i}`), this;
    }
    /**
     * Match only rows where `column` is included in the `values` array.
     *
     * @param column - The column to filter on
     * @param values - The values array to filter with
     */
    in(s, i) {
      const o = Array.from(new Set(i)).map((a) => typeof a == "string" && new RegExp("[,()]").test(a) ? `"${a}"` : `${a}`).join(",");
      return this.url.searchParams.append(s, `in.(${o})`), this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * `column` contains every element appearing in `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */
    contains(s, i) {
      return typeof i == "string" ? this.url.searchParams.append(s, `cs.${i}`) : Array.isArray(i) ? this.url.searchParams.append(s, `cs.{${i.join(",")}}`) : this.url.searchParams.append(s, `cs.${JSON.stringify(i)}`), this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * every element appearing in `column` is contained by `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */
    containedBy(s, i) {
      return typeof i == "string" ? this.url.searchParams.append(s, `cd.${i}`) : Array.isArray(i) ? this.url.searchParams.append(s, `cd.{${i.join(",")}}`) : this.url.searchParams.append(s, `cd.${JSON.stringify(i)}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is greater than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeGt(s, i) {
      return this.url.searchParams.append(s, `sr.${i}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or greater than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeGte(s, i) {
      return this.url.searchParams.append(s, `nxl.${i}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is less than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeLt(s, i) {
      return this.url.searchParams.append(s, `sl.${i}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or less than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeLte(s, i) {
      return this.url.searchParams.append(s, `nxr.${i}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where `column` is
     * mutually exclusive to `range` and there can be no element between the two
     * ranges.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeAdjacent(s, i) {
      return this.url.searchParams.append(s, `adj.${i}`), this;
    }
    /**
     * Only relevant for array and range columns. Match only rows where
     * `column` and `value` have an element in common.
     *
     * @param column - The array or range column to filter on
     * @param value - The array or range value to filter with
     */
    overlaps(s, i) {
      return typeof i == "string" ? this.url.searchParams.append(s, `ov.${i}`) : this.url.searchParams.append(s, `ov.{${i.join(",")}}`), this;
    }
    /**
     * Only relevant for text and tsvector columns. Match only rows where
     * `column` matches the query string in `query`.
     *
     * @param column - The text or tsvector column to filter on
     * @param query - The query text to match with
     * @param options - Named parameters
     * @param options.config - The text search configuration to use
     * @param options.type - Change how the `query` text is interpreted
     */
    textSearch(s, i, { config: o, type: a } = {}) {
      let l = "";
      a === "plain" ? l = "pl" : a === "phrase" ? l = "ph" : a === "websearch" && (l = "w");
      const c = o === void 0 ? "" : `(${o})`;
      return this.url.searchParams.append(s, `${l}fts${c}.${i}`), this;
    }
    /**
     * Match only rows where each column in `query` keys is equal to its
     * associated value. Shorthand for multiple `.eq()`s.
     *
     * @param query - The object to filter with, with column names as keys mapped
     * to their filter values
     */
    match(s) {
      return Object.entries(s).forEach(([i, o]) => {
        this.url.searchParams.append(i, `eq.${o}`);
      }), this;
    }
    /**
     * Match only rows which doesn't satisfy the filter.
     *
     * Unlike most filters, `opearator` and `value` are used as-is and need to
     * follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure they are properly sanitized.
     *
     * @param column - The column to filter on
     * @param operator - The operator to be negated to filter with, following
     * PostgREST syntax
     * @param value - The value to filter with, following PostgREST syntax
     */
    not(s, i, o) {
      return this.url.searchParams.append(s, `not.${i}.${o}`), this;
    }
    /**
     * Match only rows which satisfy at least one of the filters.
     *
     * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure it's properly sanitized.
     *
     * It's currently not possible to do an `.or()` filter across multiple tables.
     *
     * @param filters - The filters to use, following PostgREST syntax
     * @param options - Named parameters
     * @param options.referencedTable - Set this to filter on referenced tables
     * instead of the parent table
     * @param options.foreignTable - Deprecated, use `referencedTable` instead
     */
    or(s, { foreignTable: i, referencedTable: o = i } = {}) {
      const a = o ? `${o}.or` : "or";
      return this.url.searchParams.append(a, `(${s})`), this;
    }
    /**
     * Match only rows which satisfy the filter. This is an escape hatch - you
     * should use the specific filter methods wherever possible.
     *
     * Unlike most filters, `opearator` and `value` are used as-is and need to
     * follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure they are properly sanitized.
     *
     * @param column - The column to filter on
     * @param operator - The operator to filter with, following PostgREST syntax
     * @param value - The value to filter with, following PostgREST syntax
     */
    filter(s, i, o) {
      return this.url.searchParams.append(s, `${i}.${o}`), this;
    }
  }
  return Oe.default = t, Oe;
}
var tr;
function Or() {
  if (tr) return Ae;
  tr = 1;
  var n = Ae && Ae.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(Ae, "__esModule", { value: !0 });
  const e = n(Dt());
  class t {
    constructor(s, { headers: i = {}, schema: o, fetch: a }) {
      this.url = s, this.headers = new Headers(i), this.schema = o, this.fetch = a;
    }
    /**
     * Perform a SELECT query on the table or view.
     *
     * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
     *
     * @param options - Named parameters
     *
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     *
     * @param options.count - Count algorithm to use to count rows in the table or view.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    select(s, { head: i = !1, count: o } = {}) {
      const a = i ? "HEAD" : "GET";
      let l = !1;
      const c = (s ?? "*").split("").map((u) => /\s/.test(u) && !l ? "" : (u === '"' && (l = !l), u)).join("");
      return this.url.searchParams.set("select", c), o && this.headers.append("Prefer", `count=${o}`), new e.default({
        method: a,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        fetch: this.fetch
      });
    }
    /**
     * Perform an INSERT into the table or view.
     *
     * By default, inserted rows are not returned. To return it, chain the call
     * with `.select()`.
     *
     * @param values - The values to insert. Pass an object to insert a single row
     * or an array to insert multiple rows.
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count inserted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     *
     * @param options.defaultToNull - Make missing fields default to `null`.
     * Otherwise, use the default value for the column. Only applies for bulk
     * inserts.
     */
    insert(s, { count: i, defaultToNull: o = !0 } = {}) {
      var a;
      const l = "POST";
      if (i && this.headers.append("Prefer", `count=${i}`), o || this.headers.append("Prefer", "missing=default"), Array.isArray(s)) {
        const c = s.reduce((u, d) => u.concat(Object.keys(d)), []);
        if (c.length > 0) {
          const u = [...new Set(c)].map((d) => `"${d}"`);
          this.url.searchParams.set("columns", u.join(","));
        }
      }
      return new e.default({
        method: l,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        body: s,
        fetch: (a = this.fetch) !== null && a !== void 0 ? a : fetch
      });
    }
    /**
     * Perform an UPSERT on the table or view. Depending on the column(s) passed
     * to `onConflict`, `.upsert()` allows you to perform the equivalent of
     * `.insert()` if a row with the corresponding `onConflict` columns doesn't
     * exist, or if it does exist, perform an alternative action depending on
     * `ignoreDuplicates`.
     *
     * By default, upserted rows are not returned. To return it, chain the call
     * with `.select()`.
     *
     * @param values - The values to upsert with. Pass an object to upsert a
     * single row or an array to upsert multiple rows.
     *
     * @param options - Named parameters
     *
     * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
     * duplicate rows are determined. Two rows are duplicates if all the
     * `onConflict` columns are equal.
     *
     * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
     * `false`, duplicate rows are merged with existing rows.
     *
     * @param options.count - Count algorithm to use to count upserted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     *
     * @param options.defaultToNull - Make missing fields default to `null`.
     * Otherwise, use the default value for the column. This only applies when
     * inserting new rows, not when merging with existing rows under
     * `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
     */
    upsert(s, { onConflict: i, ignoreDuplicates: o = !1, count: a, defaultToNull: l = !0 } = {}) {
      var c;
      const u = "POST";
      if (this.headers.append("Prefer", `resolution=${o ? "ignore" : "merge"}-duplicates`), i !== void 0 && this.url.searchParams.set("on_conflict", i), a && this.headers.append("Prefer", `count=${a}`), l || this.headers.append("Prefer", "missing=default"), Array.isArray(s)) {
        const d = s.reduce((h, g) => h.concat(Object.keys(g)), []);
        if (d.length > 0) {
          const h = [...new Set(d)].map((g) => `"${g}"`);
          this.url.searchParams.set("columns", h.join(","));
        }
      }
      return new e.default({
        method: u,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        body: s,
        fetch: (c = this.fetch) !== null && c !== void 0 ? c : fetch
      });
    }
    /**
     * Perform an UPDATE on the table or view.
     *
     * By default, updated rows are not returned. To return it, chain the call
     * with `.select()` after filters.
     *
     * @param values - The values to update with
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count updated rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    update(s, { count: i } = {}) {
      var o;
      const a = "PATCH";
      return i && this.headers.append("Prefer", `count=${i}`), new e.default({
        method: a,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        body: s,
        fetch: (o = this.fetch) !== null && o !== void 0 ? o : fetch
      });
    }
    /**
     * Perform a DELETE on the table or view.
     *
     * By default, deleted rows are not returned. To return it, chain the call
     * with `.select()` after filters.
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count deleted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    delete({ count: s } = {}) {
      var i;
      const o = "DELETE";
      return s && this.headers.append("Prefer", `count=${s}`), new e.default({
        method: o,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        fetch: (i = this.fetch) !== null && i !== void 0 ? i : fetch
      });
    }
  }
  return Ae.default = t, Ae;
}
var rr;
function hs() {
  if (rr) return $e;
  rr = 1;
  var n = $e && $e.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty($e, "__esModule", { value: !0 });
  const e = n(Or()), t = n(Dt());
  class r {
    // TODO: Add back shouldThrowOnError once we figure out the typings
    /**
     * Creates a PostgREST client.
     *
     * @param url - URL of the PostgREST endpoint
     * @param options - Named parameters
     * @param options.headers - Custom headers
     * @param options.schema - Postgres schema to switch to
     * @param options.fetch - Custom fetch
     */
    constructor(i, { headers: o = {}, schema: a, fetch: l } = {}) {
      this.url = i, this.headers = new Headers(o), this.schemaName = a, this.fetch = l;
    }
    /**
     * Perform a query on a table or a view.
     *
     * @param relation - The table or view name to query
     */
    from(i) {
      const o = new URL(`${this.url}/${i}`);
      return new e.default(o, {
        headers: new Headers(this.headers),
        schema: this.schemaName,
        fetch: this.fetch
      });
    }
    /**
     * Select a schema to query or perform an function (rpc) call.
     *
     * The schema needs to be on the list of exposed schemas inside Supabase.
     *
     * @param schema - The schema to query
     */
    schema(i) {
      return new r(this.url, {
        headers: this.headers,
        schema: i,
        fetch: this.fetch
      });
    }
    /**
     * Perform a function call.
     *
     * @param fn - The function name to call
     * @param args - The arguments to pass to the function call
     * @param options - Named parameters
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     * @param options.get - When set to `true`, the function will be called with
     * read-only access mode.
     * @param options.count - Count algorithm to use to count rows returned by the
     * function. Only applicable for [set-returning
     * functions](https://www.postgresql.org/docs/current/functions-srf.html).
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    rpc(i, o = {}, { head: a = !1, get: l = !1, count: c } = {}) {
      var u;
      let d;
      const h = new URL(`${this.url}/rpc/${i}`);
      let g;
      a || l ? (d = a ? "HEAD" : "GET", Object.entries(o).filter(([w, v]) => v !== void 0).map(([w, v]) => [w, Array.isArray(v) ? `{${v.join(",")}}` : `${v}`]).forEach(([w, v]) => {
        h.searchParams.append(w, v);
      })) : (d = "POST", g = o);
      const m = new Headers(this.headers);
      return c && m.set("Prefer", `count=${c}`), new t.default({
        method: d,
        url: h,
        headers: m,
        schema: this.schemaName,
        body: g,
        fetch: (u = this.fetch) !== null && u !== void 0 ? u : fetch
      });
    }
  }
  return $e.default = r, $e;
}
var sr;
function fs() {
  if (sr) return J;
  sr = 1;
  var n = J && J.__importDefault || function(a) {
    return a && a.__esModule ? a : { default: a };
  };
  Object.defineProperty(J, "__esModule", { value: !0 }), J.PostgrestError = J.PostgrestBuilder = J.PostgrestTransformBuilder = J.PostgrestFilterBuilder = J.PostgrestQueryBuilder = J.PostgrestClient = void 0;
  const e = n(hs());
  J.PostgrestClient = e.default;
  const t = n(Or());
  J.PostgrestQueryBuilder = t.default;
  const r = n(Dt());
  J.PostgrestFilterBuilder = r.default;
  const s = n(Ar());
  J.PostgrestTransformBuilder = s.default;
  const i = n($r());
  J.PostgrestBuilder = i.default;
  const o = n(jr());
  return J.PostgrestError = o.default, J.default = {
    PostgrestClient: e.default,
    PostgrestQueryBuilder: t.default,
    PostgrestFilterBuilder: r.default,
    PostgrestTransformBuilder: s.default,
    PostgrestBuilder: i.default,
    PostgrestError: o.default
  }, J;
}
var ps = fs();
const gs = /* @__PURE__ */ Tr(ps), {
  PostgrestClient: ms,
  PostgrestQueryBuilder: xo,
  PostgrestFilterBuilder: jo,
  PostgrestTransformBuilder: $o,
  PostgrestBuilder: Ao,
  PostgrestError: Oo
} = gs;
class vs {
  static detectEnvironment() {
    var e;
    if (typeof WebSocket < "u")
      return { type: "native", constructor: WebSocket };
    if (typeof globalThis < "u" && typeof globalThis.WebSocket < "u")
      return { type: "native", constructor: globalThis.WebSocket };
    if (typeof globalThis < "u" && typeof globalThis.WebSocket < "u")
      return { type: "native", constructor: globalThis.WebSocket };
    if (typeof globalThis < "u" && typeof globalThis.WebSocketPair < "u" && typeof globalThis.WebSocket > "u")
      return {
        type: "cloudflare",
        error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
        workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."
      };
    if (typeof globalThis < "u" && globalThis.EdgeRuntime || typeof navigator < "u" && (!((e = navigator.userAgent) === null || e === void 0) && e.includes("Vercel-Edge")))
      return {
        type: "unsupported",
        error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
        workaround: "Use serverless functions or a different deployment target for WebSocket functionality."
      };
    if (typeof process < "u") {
      const t = process.versions;
      if (t && t.node) {
        const r = t.node, s = parseInt(r.replace(/^v/, "").split(".")[0]);
        return s >= 22 ? typeof globalThis.WebSocket < "u" ? { type: "native", constructor: globalThis.WebSocket } : {
          type: "unsupported",
          error: `Node.js ${s} detected but native WebSocket not found.`,
          workaround: "Provide a WebSocket implementation via the transport option."
        } : {
          type: "unsupported",
          error: `Node.js ${s} detected without native WebSocket support.`,
          workaround: `For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`
        };
      }
    }
    return {
      type: "unsupported",
      error: "Unknown JavaScript runtime without WebSocket support.",
      workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."
    };
  }
  static getWebSocketConstructor() {
    const e = this.detectEnvironment();
    if (e.constructor)
      return e.constructor;
    let t = e.error || "WebSocket not supported in this environment.";
    throw e.workaround && (t += `

Suggested solution: ${e.workaround}`), new Error(t);
  }
  static createWebSocket(e, t) {
    const r = this.getWebSocketConstructor();
    return new r(e, t);
  }
  static isWebSocketSupported() {
    try {
      const e = this.detectEnvironment();
      return e.type === "native" || e.type === "ws";
    } catch {
      return !1;
    }
  }
}
const _s = "2.15.5", ws = `realtime-js/${_s}`, ys = "1.0.0", Ct = 1e4, bs = 1e3, Ss = 100;
var Qe;
(function(n) {
  n[n.connecting = 0] = "connecting", n[n.open = 1] = "open", n[n.closing = 2] = "closing", n[n.closed = 3] = "closed";
})(Qe || (Qe = {}));
var K;
(function(n) {
  n.closed = "closed", n.errored = "errored", n.joined = "joined", n.joining = "joining", n.leaving = "leaving";
})(K || (K = {}));
var re;
(function(n) {
  n.close = "phx_close", n.error = "phx_error", n.join = "phx_join", n.reply = "phx_reply", n.leave = "phx_leave", n.access_token = "access_token";
})(re || (re = {}));
var xt;
(function(n) {
  n.websocket = "websocket";
})(xt || (xt = {}));
var Ee;
(function(n) {
  n.Connecting = "connecting", n.Open = "open", n.Closing = "closing", n.Closed = "closed";
})(Ee || (Ee = {}));
class ks {
  constructor() {
    this.HEADER_LENGTH = 1;
  }
  decode(e, t) {
    return e.constructor === ArrayBuffer ? t(this._binaryDecode(e)) : t(typeof e == "string" ? JSON.parse(e) : {});
  }
  _binaryDecode(e) {
    const t = new DataView(e), r = new TextDecoder();
    return this._decodeBroadcast(e, t, r);
  }
  _decodeBroadcast(e, t, r) {
    const s = t.getUint8(1), i = t.getUint8(2);
    let o = this.HEADER_LENGTH + 2;
    const a = r.decode(e.slice(o, o + s));
    o = o + s;
    const l = r.decode(e.slice(o, o + i));
    o = o + i;
    const c = JSON.parse(r.decode(e.slice(o, e.byteLength)));
    return { ref: null, topic: a, event: l, payload: c };
  }
}
class Pr {
  constructor(e, t) {
    this.callback = e, this.timerCalc = t, this.timer = void 0, this.tries = 0, this.callback = e, this.timerCalc = t;
  }
  reset() {
    this.tries = 0, clearTimeout(this.timer), this.timer = void 0;
  }
  // Cancels any previous scheduleTimeout and schedules callback
  scheduleTimeout() {
    clearTimeout(this.timer), this.timer = setTimeout(() => {
      this.tries = this.tries + 1, this.callback();
    }, this.timerCalc(this.tries + 1));
  }
}
var D;
(function(n) {
  n.abstime = "abstime", n.bool = "bool", n.date = "date", n.daterange = "daterange", n.float4 = "float4", n.float8 = "float8", n.int2 = "int2", n.int4 = "int4", n.int4range = "int4range", n.int8 = "int8", n.int8range = "int8range", n.json = "json", n.jsonb = "jsonb", n.money = "money", n.numeric = "numeric", n.oid = "oid", n.reltime = "reltime", n.text = "text", n.time = "time", n.timestamp = "timestamp", n.timestamptz = "timestamptz", n.timetz = "timetz", n.tsrange = "tsrange", n.tstzrange = "tstzrange";
})(D || (D = {}));
const nr = (n, e, t = {}) => {
  var r;
  const s = (r = t.skipTypes) !== null && r !== void 0 ? r : [];
  return Object.keys(e).reduce((i, o) => (i[o] = Es(o, n, e, s), i), {});
}, Es = (n, e, t, r) => {
  const s = e.find((a) => a.name === n), i = s == null ? void 0 : s.type, o = t[n];
  return i && !r.includes(i) ? Rr(i, o) : jt(o);
}, Rr = (n, e) => {
  if (n.charAt(0) === "_") {
    const t = n.slice(1, n.length);
    return js(e, t);
  }
  switch (n) {
    case D.bool:
      return Ts(e);
    case D.float4:
    case D.float8:
    case D.int2:
    case D.int4:
    case D.int8:
    case D.numeric:
    case D.oid:
      return Cs(e);
    case D.json:
    case D.jsonb:
      return xs(e);
    case D.timestamp:
      return $s(e);
    // Format to be consistent with PostgREST
    case D.abstime:
    // To allow users to cast it based on Timezone
    case D.date:
    // To allow users to cast it based on Timezone
    case D.daterange:
    case D.int4range:
    case D.int8range:
    case D.money:
    case D.reltime:
    // To allow users to cast it based on Timezone
    case D.text:
    case D.time:
    // To allow users to cast it based on Timezone
    case D.timestamptz:
    // To allow users to cast it based on Timezone
    case D.timetz:
    // To allow users to cast it based on Timezone
    case D.tsrange:
    case D.tstzrange:
      return jt(e);
    default:
      return jt(e);
  }
}, jt = (n) => n, Ts = (n) => {
  switch (n) {
    case "t":
      return !0;
    case "f":
      return !1;
    default:
      return n;
  }
}, Cs = (n) => {
  if (typeof n == "string") {
    const e = parseFloat(n);
    if (!Number.isNaN(e))
      return e;
  }
  return n;
}, xs = (n) => {
  if (typeof n == "string")
    try {
      return JSON.parse(n);
    } catch (e) {
      return console.log(`JSON parse error: ${e}`), n;
    }
  return n;
}, js = (n, e) => {
  if (typeof n != "string")
    return n;
  const t = n.length - 1, r = n[t];
  if (n[0] === "{" && r === "}") {
    let i;
    const o = n.slice(1, t);
    try {
      i = JSON.parse("[" + o + "]");
    } catch {
      i = o ? o.split(",") : [];
    }
    return i.map((a) => Rr(e, a));
  }
  return n;
}, $s = (n) => typeof n == "string" ? n.replace(" ", "T") : n, Ir = (n) => {
  let e = n;
  return e = e.replace(/^ws/i, "http"), e = e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, ""), e.replace(/\/+$/, "") + "/api/broadcast";
};
class gt {
  /**
   * Initializes the Push
   *
   * @param channel The Channel
   * @param event The event, for example `"phx_join"`
   * @param payload The payload, for example `{user_id: 123}`
   * @param timeout The push timeout in milliseconds
   */
  constructor(e, t, r = {}, s = Ct) {
    this.channel = e, this.event = t, this.payload = r, this.timeout = s, this.sent = !1, this.timeoutTimer = void 0, this.ref = "", this.receivedResp = null, this.recHooks = [], this.refEvent = null;
  }
  resend(e) {
    this.timeout = e, this._cancelRefEvent(), this.ref = "", this.refEvent = null, this.receivedResp = null, this.sent = !1, this.send();
  }
  send() {
    this._hasReceived("timeout") || (this.startTimeout(), this.sent = !0, this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload,
      ref: this.ref,
      join_ref: this.channel._joinRef()
    }));
  }
  updatePayload(e) {
    this.payload = Object.assign(Object.assign({}, this.payload), e);
  }
  receive(e, t) {
    var r;
    return this._hasReceived(e) && t((r = this.receivedResp) === null || r === void 0 ? void 0 : r.response), this.recHooks.push({ status: e, callback: t }), this;
  }
  startTimeout() {
    if (this.timeoutTimer)
      return;
    this.ref = this.channel.socket._makeRef(), this.refEvent = this.channel._replyEventName(this.ref);
    const e = (t) => {
      this._cancelRefEvent(), this._cancelTimeout(), this.receivedResp = t, this._matchReceive(t);
    };
    this.channel._on(this.refEvent, {}, e), this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  trigger(e, t) {
    this.refEvent && this.channel._trigger(this.refEvent, { status: e, response: t });
  }
  destroy() {
    this._cancelRefEvent(), this._cancelTimeout();
  }
  _cancelRefEvent() {
    this.refEvent && this.channel._off(this.refEvent, {});
  }
  _cancelTimeout() {
    clearTimeout(this.timeoutTimer), this.timeoutTimer = void 0;
  }
  _matchReceive({ status: e, response: t }) {
    this.recHooks.filter((r) => r.status === e).forEach((r) => r.callback(t));
  }
  _hasReceived(e) {
    return this.receivedResp && this.receivedResp.status === e;
  }
}
var ir;
(function(n) {
  n.SYNC = "sync", n.JOIN = "join", n.LEAVE = "leave";
})(ir || (ir = {}));
class Xe {
  /**
   * Initializes the Presence.
   *
   * @param channel - The RealtimeChannel
   * @param opts - The options,
   *        for example `{events: {state: 'state', diff: 'diff'}}`
   */
  constructor(e, t) {
    this.channel = e, this.state = {}, this.pendingDiffs = [], this.joinRef = null, this.enabled = !1, this.caller = {
      onJoin: () => {
      },
      onLeave: () => {
      },
      onSync: () => {
      }
    };
    const r = (t == null ? void 0 : t.events) || {
      state: "presence_state",
      diff: "presence_diff"
    };
    this.channel._on(r.state, {}, (s) => {
      const { onJoin: i, onLeave: o, onSync: a } = this.caller;
      this.joinRef = this.channel._joinRef(), this.state = Xe.syncState(this.state, s, i, o), this.pendingDiffs.forEach((l) => {
        this.state = Xe.syncDiff(this.state, l, i, o);
      }), this.pendingDiffs = [], a();
    }), this.channel._on(r.diff, {}, (s) => {
      const { onJoin: i, onLeave: o, onSync: a } = this.caller;
      this.inPendingSyncState() ? this.pendingDiffs.push(s) : (this.state = Xe.syncDiff(this.state, s, i, o), a());
    }), this.onJoin((s, i, o) => {
      this.channel._trigger("presence", {
        event: "join",
        key: s,
        currentPresences: i,
        newPresences: o
      });
    }), this.onLeave((s, i, o) => {
      this.channel._trigger("presence", {
        event: "leave",
        key: s,
        currentPresences: i,
        leftPresences: o
      });
    }), this.onSync(() => {
      this.channel._trigger("presence", { event: "sync" });
    });
  }
  /**
   * Used to sync the list of presences on the server with the
   * client's state.
   *
   * An optional `onJoin` and `onLeave` callback can be provided to
   * react to changes in the client's local presences across
   * disconnects and reconnects with the server.
   *
   * @internal
   */
  static syncState(e, t, r, s) {
    const i = this.cloneDeep(e), o = this.transformState(t), a = {}, l = {};
    return this.map(i, (c, u) => {
      o[c] || (l[c] = u);
    }), this.map(o, (c, u) => {
      const d = i[c];
      if (d) {
        const h = u.map((v) => v.presence_ref), g = d.map((v) => v.presence_ref), m = u.filter((v) => g.indexOf(v.presence_ref) < 0), w = d.filter((v) => h.indexOf(v.presence_ref) < 0);
        m.length > 0 && (a[c] = m), w.length > 0 && (l[c] = w);
      } else
        a[c] = u;
    }), this.syncDiff(i, { joins: a, leaves: l }, r, s);
  }
  /**
   * Used to sync a diff of presence join and leave events from the
   * server, as they happen.
   *
   * Like `syncState`, `syncDiff` accepts optional `onJoin` and
   * `onLeave` callbacks to react to a user joining or leaving from a
   * device.
   *
   * @internal
   */
  static syncDiff(e, t, r, s) {
    const { joins: i, leaves: o } = {
      joins: this.transformState(t.joins),
      leaves: this.transformState(t.leaves)
    };
    return r || (r = () => {
    }), s || (s = () => {
    }), this.map(i, (a, l) => {
      var c;
      const u = (c = e[a]) !== null && c !== void 0 ? c : [];
      if (e[a] = this.cloneDeep(l), u.length > 0) {
        const d = e[a].map((g) => g.presence_ref), h = u.filter((g) => d.indexOf(g.presence_ref) < 0);
        e[a].unshift(...h);
      }
      r(a, u, l);
    }), this.map(o, (a, l) => {
      let c = e[a];
      if (!c)
        return;
      const u = l.map((d) => d.presence_ref);
      c = c.filter((d) => u.indexOf(d.presence_ref) < 0), e[a] = c, s(a, c, l), c.length === 0 && delete e[a];
    }), e;
  }
  /** @internal */
  static map(e, t) {
    return Object.getOwnPropertyNames(e).map((r) => t(r, e[r]));
  }
  /**
   * Remove 'metas' key
   * Change 'phx_ref' to 'presence_ref'
   * Remove 'phx_ref' and 'phx_ref_prev'
   *
   * @example
   * // returns {
   *  abc123: [
   *    { presence_ref: '2', user_id: 1 },
   *    { presence_ref: '3', user_id: 2 }
   *  ]
   * }
   * RealtimePresence.transformState({
   *  abc123: {
   *    metas: [
   *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
   *      { phx_ref: '3', user_id: 2 }
   *    ]
   *  }
   * })
   *
   * @internal
   */
  static transformState(e) {
    return e = this.cloneDeep(e), Object.getOwnPropertyNames(e).reduce((t, r) => {
      const s = e[r];
      return "metas" in s ? t[r] = s.metas.map((i) => (i.presence_ref = i.phx_ref, delete i.phx_ref, delete i.phx_ref_prev, i)) : t[r] = s, t;
    }, {});
  }
  /** @internal */
  static cloneDeep(e) {
    return JSON.parse(JSON.stringify(e));
  }
  /** @internal */
  onJoin(e) {
    this.caller.onJoin = e;
  }
  /** @internal */
  onLeave(e) {
    this.caller.onLeave = e;
  }
  /** @internal */
  onSync(e) {
    this.caller.onSync = e;
  }
  /** @internal */
  inPendingSyncState() {
    return !this.joinRef || this.joinRef !== this.channel._joinRef();
  }
}
var or;
(function(n) {
  n.ALL = "*", n.INSERT = "INSERT", n.UPDATE = "UPDATE", n.DELETE = "DELETE";
})(or || (or = {}));
var et;
(function(n) {
  n.BROADCAST = "broadcast", n.PRESENCE = "presence", n.POSTGRES_CHANGES = "postgres_changes", n.SYSTEM = "system";
})(et || (et = {}));
var ue;
(function(n) {
  n.SUBSCRIBED = "SUBSCRIBED", n.TIMED_OUT = "TIMED_OUT", n.CLOSED = "CLOSED", n.CHANNEL_ERROR = "CHANNEL_ERROR";
})(ue || (ue = {}));
class Mt {
  constructor(e, t = { config: {} }, r) {
    this.topic = e, this.params = t, this.socket = r, this.bindings = {}, this.state = K.closed, this.joinedOnce = !1, this.pushBuffer = [], this.subTopic = e.replace(/^realtime:/i, ""), this.params.config = Object.assign({
      broadcast: { ack: !1, self: !1 },
      presence: { key: "", enabled: !1 },
      private: !1
    }, t.config), this.timeout = this.socket.timeout, this.joinPush = new gt(this, re.join, this.params, this.timeout), this.rejoinTimer = new Pr(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs), this.joinPush.receive("ok", () => {
      this.state = K.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((s) => s.send()), this.pushBuffer = [];
    }), this._onClose(() => {
      this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`), this.state = K.closed, this.socket._remove(this);
    }), this._onError((s) => {
      this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, s), this.state = K.errored, this.rejoinTimer.scheduleTimeout());
    }), this.joinPush.receive("timeout", () => {
      this._isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), this.state = K.errored, this.rejoinTimer.scheduleTimeout());
    }), this.joinPush.receive("error", (s) => {
      this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, s), this.state = K.errored, this.rejoinTimer.scheduleTimeout());
    }), this._on(re.reply, {}, (s, i) => {
      this._trigger(this._replyEventName(i), s);
    }), this.presence = new Xe(this), this.broadcastEndpointURL = Ir(this.socket.endPoint), this.private = this.params.config.private || !1;
  }
  /** Subscribe registers your client with the server */
  subscribe(e, t = this.timeout) {
    var r, s, i;
    if (this.socket.isConnected() || this.socket.connect(), this.state == K.closed) {
      const { config: { broadcast: o, presence: a, private: l } } = this.params, c = (s = (r = this.bindings.postgres_changes) === null || r === void 0 ? void 0 : r.map((g) => g.filter)) !== null && s !== void 0 ? s : [], u = !!this.bindings[et.PRESENCE] && this.bindings[et.PRESENCE].length > 0 || ((i = this.params.config.presence) === null || i === void 0 ? void 0 : i.enabled) === !0, d = {}, h = {
        broadcast: o,
        presence: Object.assign(Object.assign({}, a), { enabled: u }),
        postgres_changes: c,
        private: l
      };
      this.socket.accessTokenValue && (d.access_token = this.socket.accessTokenValue), this._onError((g) => e == null ? void 0 : e(ue.CHANNEL_ERROR, g)), this._onClose(() => e == null ? void 0 : e(ue.CLOSED)), this.updateJoinPayload(Object.assign({ config: h }, d)), this.joinedOnce = !0, this._rejoin(t), this.joinPush.receive("ok", async ({ postgres_changes: g }) => {
        var m;
        if (this.socket.setAuth(), g === void 0) {
          e == null || e(ue.SUBSCRIBED);
          return;
        } else {
          const w = this.bindings.postgres_changes, v = (m = w == null ? void 0 : w.length) !== null && m !== void 0 ? m : 0, y = [];
          for (let _ = 0; _ < v; _++) {
            const b = w[_], { filter: { event: k, schema: E, table: C, filter: x } } = b, B = g && g[_];
            if (B && B.event === k && B.schema === E && B.table === C && B.filter === x)
              y.push(Object.assign(Object.assign({}, b), { id: B.id }));
            else {
              this.unsubscribe(), this.state = K.errored, e == null || e(ue.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
              return;
            }
          }
          this.bindings.postgres_changes = y, e && e(ue.SUBSCRIBED);
          return;
        }
      }).receive("error", (g) => {
        this.state = K.errored, e == null || e(ue.CHANNEL_ERROR, new Error(JSON.stringify(Object.values(g).join(", ") || "error")));
      }).receive("timeout", () => {
        e == null || e(ue.TIMED_OUT);
      });
    }
    return this;
  }
  presenceState() {
    return this.presence.state;
  }
  async track(e, t = {}) {
    return await this.send({
      type: "presence",
      event: "track",
      payload: e
    }, t.timeout || this.timeout);
  }
  async untrack(e = {}) {
    return await this.send({
      type: "presence",
      event: "untrack"
    }, e);
  }
  on(e, t, r) {
    return this.state === K.joined && e === et.PRESENCE && (this.socket.log("channel", `resubscribe to ${this.topic} due to change in presence callbacks on joined channel`), this.unsubscribe().then(() => this.subscribe())), this._on(e, t, r);
  }
  /**
   * Sends a message into the channel.
   *
   * @param args Arguments to send to channel
   * @param args.type The type of event to send
   * @param args.event The name of the event being sent
   * @param args.payload Payload to be sent
   * @param opts Options to be used during the send process
   */
  async send(e, t = {}) {
    var r, s;
    if (!this._canPush() && e.type === "broadcast") {
      const { event: i, payload: o } = e, l = {
        method: "POST",
        headers: {
          Authorization: this.socket.accessTokenValue ? `Bearer ${this.socket.accessTokenValue}` : "",
          apikey: this.socket.apiKey ? this.socket.apiKey : "",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            {
              topic: this.subTopic,
              event: i,
              payload: o,
              private: this.private
            }
          ]
        })
      };
      try {
        const c = await this._fetchWithTimeout(this.broadcastEndpointURL, l, (r = t.timeout) !== null && r !== void 0 ? r : this.timeout);
        return await ((s = c.body) === null || s === void 0 ? void 0 : s.cancel()), c.ok ? "ok" : "error";
      } catch (c) {
        return c.name === "AbortError" ? "timed out" : "error";
      }
    } else
      return new Promise((i) => {
        var o, a, l;
        const c = this._push(e.type, e, t.timeout || this.timeout);
        e.type === "broadcast" && !(!((l = (a = (o = this.params) === null || o === void 0 ? void 0 : o.config) === null || a === void 0 ? void 0 : a.broadcast) === null || l === void 0) && l.ack) && i("ok"), c.receive("ok", () => i("ok")), c.receive("error", () => i("error")), c.receive("timeout", () => i("timed out"));
      });
  }
  updateJoinPayload(e) {
    this.joinPush.updatePayload(e);
  }
  /**
   * Leaves the channel.
   *
   * Unsubscribes from server events, and instructs channel to terminate on server.
   * Triggers onClose() hooks.
   *
   * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
   * channel.unsubscribe().receive("ok", () => alert("left!") )
   */
  unsubscribe(e = this.timeout) {
    this.state = K.leaving;
    const t = () => {
      this.socket.log("channel", `leave ${this.topic}`), this._trigger(re.close, "leave", this._joinRef());
    };
    this.joinPush.destroy();
    let r = null;
    return new Promise((s) => {
      r = new gt(this, re.leave, {}, e), r.receive("ok", () => {
        t(), s("ok");
      }).receive("timeout", () => {
        t(), s("timed out");
      }).receive("error", () => {
        s("error");
      }), r.send(), this._canPush() || r.trigger("ok", {});
    }).finally(() => {
      r == null || r.destroy();
    });
  }
  /**
   * Teardown the channel.
   *
   * Destroys and stops related timers.
   */
  teardown() {
    this.pushBuffer.forEach((e) => e.destroy()), this.pushBuffer = [], this.rejoinTimer.reset(), this.joinPush.destroy(), this.state = K.closed, this.bindings = {};
  }
  /** @internal */
  async _fetchWithTimeout(e, t, r) {
    const s = new AbortController(), i = setTimeout(() => s.abort(), r), o = await this.socket.fetch(e, Object.assign(Object.assign({}, t), { signal: s.signal }));
    return clearTimeout(i), o;
  }
  /** @internal */
  _push(e, t, r = this.timeout) {
    if (!this.joinedOnce)
      throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    let s = new gt(this, e, t, r);
    return this._canPush() ? s.send() : this._addToPushBuffer(s), s;
  }
  /** @internal */
  _addToPushBuffer(e) {
    if (e.startTimeout(), this.pushBuffer.push(e), this.pushBuffer.length > Ss) {
      const t = this.pushBuffer.shift();
      t && (t.destroy(), this.socket.log("channel", `discarded push due to buffer overflow: ${t.event}`, t.payload));
    }
  }
  /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling before dispatching to the channel callbacks.
   * Must return the payload, modified or unmodified.
   *
   * @internal
   */
  _onMessage(e, t, r) {
    return t;
  }
  /** @internal */
  _isMember(e) {
    return this.topic === e;
  }
  /** @internal */
  _joinRef() {
    return this.joinPush.ref;
  }
  /** @internal */
  _trigger(e, t, r) {
    var s, i;
    const o = e.toLocaleLowerCase(), { close: a, error: l, leave: c, join: u } = re;
    if (r && [a, l, c, u].indexOf(o) >= 0 && r !== this._joinRef())
      return;
    let h = this._onMessage(o, t, r);
    if (t && !h)
      throw "channel onMessage callbacks must return the payload, modified or unmodified";
    ["insert", "update", "delete"].includes(o) ? (s = this.bindings.postgres_changes) === null || s === void 0 || s.filter((g) => {
      var m, w, v;
      return ((m = g.filter) === null || m === void 0 ? void 0 : m.event) === "*" || ((v = (w = g.filter) === null || w === void 0 ? void 0 : w.event) === null || v === void 0 ? void 0 : v.toLocaleLowerCase()) === o;
    }).map((g) => g.callback(h, r)) : (i = this.bindings[o]) === null || i === void 0 || i.filter((g) => {
      var m, w, v, y, _, b;
      if (["broadcast", "presence", "postgres_changes"].includes(o))
        if ("id" in g) {
          const k = g.id, E = (m = g.filter) === null || m === void 0 ? void 0 : m.event;
          return k && ((w = t.ids) === null || w === void 0 ? void 0 : w.includes(k)) && (E === "*" || (E == null ? void 0 : E.toLocaleLowerCase()) === ((v = t.data) === null || v === void 0 ? void 0 : v.type.toLocaleLowerCase()));
        } else {
          const k = (_ = (y = g == null ? void 0 : g.filter) === null || y === void 0 ? void 0 : y.event) === null || _ === void 0 ? void 0 : _.toLocaleLowerCase();
          return k === "*" || k === ((b = t == null ? void 0 : t.event) === null || b === void 0 ? void 0 : b.toLocaleLowerCase());
        }
      else
        return g.type.toLocaleLowerCase() === o;
    }).map((g) => {
      if (typeof h == "object" && "ids" in h) {
        const m = h.data, { schema: w, table: v, commit_timestamp: y, type: _, errors: b } = m;
        h = Object.assign(Object.assign({}, {
          schema: w,
          table: v,
          commit_timestamp: y,
          eventType: _,
          new: {},
          old: {},
          errors: b
        }), this._getPayloadRecords(m));
      }
      g.callback(h, r);
    });
  }
  /** @internal */
  _isClosed() {
    return this.state === K.closed;
  }
  /** @internal */
  _isJoined() {
    return this.state === K.joined;
  }
  /** @internal */
  _isJoining() {
    return this.state === K.joining;
  }
  /** @internal */
  _isLeaving() {
    return this.state === K.leaving;
  }
  /** @internal */
  _replyEventName(e) {
    return `chan_reply_${e}`;
  }
  /** @internal */
  _on(e, t, r) {
    const s = e.toLocaleLowerCase(), i = {
      type: s,
      filter: t,
      callback: r
    };
    return this.bindings[s] ? this.bindings[s].push(i) : this.bindings[s] = [i], this;
  }
  /** @internal */
  _off(e, t) {
    const r = e.toLocaleLowerCase();
    return this.bindings[r] && (this.bindings[r] = this.bindings[r].filter((s) => {
      var i;
      return !(((i = s.type) === null || i === void 0 ? void 0 : i.toLocaleLowerCase()) === r && Mt.isEqual(s.filter, t));
    })), this;
  }
  /** @internal */
  static isEqual(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length)
      return !1;
    for (const r in e)
      if (e[r] !== t[r])
        return !1;
    return !0;
  }
  /** @internal */
  _rejoinUntilConnected() {
    this.rejoinTimer.scheduleTimeout(), this.socket.isConnected() && this._rejoin();
  }
  /**
   * Registers a callback that will be executed when the channel closes.
   *
   * @internal
   */
  _onClose(e) {
    this._on(re.close, {}, e);
  }
  /**
   * Registers a callback that will be executed when the channel encounteres an error.
   *
   * @internal
   */
  _onError(e) {
    this._on(re.error, {}, (t) => e(t));
  }
  /**
   * Returns `true` if the socket is connected and the channel has been joined.
   *
   * @internal
   */
  _canPush() {
    return this.socket.isConnected() && this._isJoined();
  }
  /** @internal */
  _rejoin(e = this.timeout) {
    this._isLeaving() || (this.socket._leaveOpenTopic(this.topic), this.state = K.joining, this.joinPush.resend(e));
  }
  /** @internal */
  _getPayloadRecords(e) {
    const t = {
      new: {},
      old: {}
    };
    return (e.type === "INSERT" || e.type === "UPDATE") && (t.new = nr(e.columns, e.record)), (e.type === "UPDATE" || e.type === "DELETE") && (t.old = nr(e.columns, e.old_record)), t;
  }
}
const mt = () => {
}, ot = {
  HEARTBEAT_INTERVAL: 25e3,
  RECONNECT_DELAY: 10,
  HEARTBEAT_TIMEOUT_FALLBACK: 100
}, As = [1e3, 2e3, 5e3, 1e4], Os = 1e4, Ps = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
class Rs {
  /**
   * Initializes the Socket.
   *
   * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
   * @param httpEndpoint The string HTTP endpoint, ie, "https://example.com", "/" (inherited host & protocol)
   * @param options.transport The Websocket Transport, for example WebSocket. This can be a custom implementation
   * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
   * @param options.params The optional params to pass when connecting.
   * @param options.headers Deprecated: headers cannot be set on websocket connections and this option will be removed in the future.
   * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
   * @param options.heartbeatCallback The optional function to handle heartbeat status.
   * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
   * @param options.logLevel Sets the log level for Realtime
   * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
   * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
   * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
   * @param options.worker Use Web Worker to set a side flow. Defaults to false.
   * @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
   */
  constructor(e, t) {
    var r;
    if (this.accessTokenValue = null, this.apiKey = null, this.channels = new Array(), this.endPoint = "", this.httpEndpoint = "", this.headers = {}, this.params = {}, this.timeout = Ct, this.transport = null, this.heartbeatIntervalMs = ot.HEARTBEAT_INTERVAL, this.heartbeatTimer = void 0, this.pendingHeartbeatRef = null, this.heartbeatCallback = mt, this.ref = 0, this.reconnectTimer = null, this.logger = mt, this.conn = null, this.sendBuffer = [], this.serializer = new ks(), this.stateChangeCallbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    }, this.accessToken = null, this._connectionState = "disconnected", this._wasManualDisconnect = !1, this._authPromise = null, this._resolveFetch = (s) => {
      let i;
      return s ? i = s : typeof fetch > "u" ? i = (...o) => Promise.resolve().then(() => qe).then(({ default: a }) => a(...o)).catch((a) => {
        throw new Error(`Failed to load @supabase/node-fetch: ${a.message}. This is required for HTTP requests in Node.js environments without native fetch.`);
      }) : i = fetch, (...o) => i(...o);
    }, !(!((r = t == null ? void 0 : t.params) === null || r === void 0) && r.apikey))
      throw new Error("API key is required to connect to Realtime");
    this.apiKey = t.params.apikey, this.endPoint = `${e}/${xt.websocket}`, this.httpEndpoint = Ir(e), this._initializeOptions(t), this._setupReconnectionTimer(), this.fetch = this._resolveFetch(t == null ? void 0 : t.fetch);
  }
  /**
   * Connects the socket, unless already connected.
   */
  connect() {
    if (!(this.isConnecting() || this.isDisconnecting() || this.conn !== null && this.isConnected())) {
      if (this._setConnectionState("connecting"), this._setAuthSafely("connect"), this.transport)
        this.conn = new this.transport(this.endpointURL());
      else
        try {
          this.conn = vs.createWebSocket(this.endpointURL());
        } catch (e) {
          this._setConnectionState("disconnected");
          const t = e.message;
          throw t.includes("Node.js") ? new Error(`${t}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`) : new Error(`WebSocket not available: ${t}`);
        }
      this._setupConnectionHandlers();
    }
  }
  /**
   * Returns the URL of the websocket.
   * @returns string The URL of the websocket.
   */
  endpointURL() {
    return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: ys }));
  }
  /**
   * Disconnects the socket.
   *
   * @param code A numeric status code to send on disconnect.
   * @param reason A custom reason for the disconnect.
   */
  disconnect(e, t) {
    if (!this.isDisconnecting())
      if (this._setConnectionState("disconnecting", !0), this.conn) {
        const r = setTimeout(() => {
          this._setConnectionState("disconnected");
        }, 100);
        this.conn.onclose = () => {
          clearTimeout(r), this._setConnectionState("disconnected");
        }, e ? this.conn.close(e, t ?? "") : this.conn.close(), this._teardownConnection();
      } else
        this._setConnectionState("disconnected");
  }
  /**
   * Returns all created channels
   */
  getChannels() {
    return this.channels;
  }
  /**
   * Unsubscribes and removes a single channel
   * @param channel A RealtimeChannel instance
   */
  async removeChannel(e) {
    const t = await e.unsubscribe();
    return this.channels.length === 0 && this.disconnect(), t;
  }
  /**
   * Unsubscribes and removes all channels
   */
  async removeAllChannels() {
    const e = await Promise.all(this.channels.map((t) => t.unsubscribe()));
    return this.channels = [], this.disconnect(), e;
  }
  /**
   * Logs the message.
   *
   * For customized logging, `this.logger` can be overridden.
   */
  log(e, t, r) {
    this.logger(e, t, r);
  }
  /**
   * Returns the current state of the socket.
   */
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case Qe.connecting:
        return Ee.Connecting;
      case Qe.open:
        return Ee.Open;
      case Qe.closing:
        return Ee.Closing;
      default:
        return Ee.Closed;
    }
  }
  /**
   * Returns `true` is the connection is open.
   */
  isConnected() {
    return this.connectionState() === Ee.Open;
  }
  /**
   * Returns `true` if the connection is currently connecting.
   */
  isConnecting() {
    return this._connectionState === "connecting";
  }
  /**
   * Returns `true` if the connection is currently disconnecting.
   */
  isDisconnecting() {
    return this._connectionState === "disconnecting";
  }
  channel(e, t = { config: {} }) {
    const r = `realtime:${e}`, s = this.getChannels().find((i) => i.topic === r);
    if (s)
      return s;
    {
      const i = new Mt(`realtime:${e}`, t, this);
      return this.channels.push(i), i;
    }
  }
  /**
   * Push out a message if the socket is connected.
   *
   * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
   */
  push(e) {
    const { topic: t, event: r, payload: s, ref: i } = e, o = () => {
      this.encode(e, (a) => {
        var l;
        (l = this.conn) === null || l === void 0 || l.send(a);
      });
    };
    this.log("push", `${t} ${r} (${i})`, s), this.isConnected() ? o() : this.sendBuffer.push(o);
  }
  /**
   * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
   *
   * If param is null it will use the `accessToken` callback function or the token set on the client.
   *
   * On callback used, it will set the value of the token internal to the client.
   *
   * @param token A JWT string to override the token set on the client.
   */
  async setAuth(e = null) {
    this._authPromise = this._performAuth(e);
    try {
      await this._authPromise;
    } finally {
      this._authPromise = null;
    }
  }
  /**
   * Sends a heartbeat message if the socket is connected.
   */
  async sendHeartbeat() {
    var e;
    if (!this.isConnected()) {
      try {
        this.heartbeatCallback("disconnected");
      } catch (t) {
        this.log("error", "error in heartbeat callback", t);
      }
      return;
    }
    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null, this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
      try {
        this.heartbeatCallback("timeout");
      } catch (t) {
        this.log("error", "error in heartbeat callback", t);
      }
      this._wasManualDisconnect = !1, (e = this.conn) === null || e === void 0 || e.close(bs, "heartbeat timeout"), setTimeout(() => {
        var t;
        this.isConnected() || (t = this.reconnectTimer) === null || t === void 0 || t.scheduleTimeout();
      }, ot.HEARTBEAT_TIMEOUT_FALLBACK);
      return;
    }
    this.pendingHeartbeatRef = this._makeRef(), this.push({
      topic: "phoenix",
      event: "heartbeat",
      payload: {},
      ref: this.pendingHeartbeatRef
    });
    try {
      this.heartbeatCallback("sent");
    } catch (t) {
      this.log("error", "error in heartbeat callback", t);
    }
    this._setAuthSafely("heartbeat");
  }
  onHeartbeat(e) {
    this.heartbeatCallback = e;
  }
  /**
   * Flushes send buffer
   */
  flushSendBuffer() {
    this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e) => e()), this.sendBuffer = []);
  }
  /**
   * Return the next message ref, accounting for overflows
   *
   * @internal
   */
  _makeRef() {
    let e = this.ref + 1;
    return e === this.ref ? this.ref = 0 : this.ref = e, this.ref.toString();
  }
  /**
   * Unsubscribe from channels with the specified topic.
   *
   * @internal
   */
  _leaveOpenTopic(e) {
    let t = this.channels.find((r) => r.topic === e && (r._isJoined() || r._isJoining()));
    t && (this.log("transport", `leaving duplicate topic "${e}"`), t.unsubscribe());
  }
  /**
   * Removes a subscription from the socket.
   *
   * @param channel An open subscription.
   *
   * @internal
   */
  _remove(e) {
    this.channels = this.channels.filter((t) => t.topic !== e.topic);
  }
  /** @internal */
  _onConnMessage(e) {
    this.decode(e.data, (t) => {
      if (t.topic === "phoenix" && t.event === "phx_reply")
        try {
          this.heartbeatCallback(t.payload.status === "ok" ? "ok" : "error");
        } catch (c) {
          this.log("error", "error in heartbeat callback", c);
        }
      t.ref && t.ref === this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null);
      const { topic: r, event: s, payload: i, ref: o } = t, a = o ? `(${o})` : "", l = i.status || "";
      this.log("receive", `${l} ${r} ${s} ${a}`.trim(), i), this.channels.filter((c) => c._isMember(r)).forEach((c) => c._trigger(s, i, o)), this._triggerStateCallbacks("message", t);
    });
  }
  /**
   * Clear specific timer
   * @internal
   */
  _clearTimer(e) {
    var t;
    e === "heartbeat" && this.heartbeatTimer ? (clearInterval(this.heartbeatTimer), this.heartbeatTimer = void 0) : e === "reconnect" && ((t = this.reconnectTimer) === null || t === void 0 || t.reset());
  }
  /**
   * Clear all timers
   * @internal
   */
  _clearAllTimers() {
    this._clearTimer("heartbeat"), this._clearTimer("reconnect");
  }
  /**
   * Setup connection handlers for WebSocket events
   * @internal
   */
  _setupConnectionHandlers() {
    this.conn && ("binaryType" in this.conn && (this.conn.binaryType = "arraybuffer"), this.conn.onopen = () => this._onConnOpen(), this.conn.onerror = (e) => this._onConnError(e), this.conn.onmessage = (e) => this._onConnMessage(e), this.conn.onclose = (e) => this._onConnClose(e));
  }
  /**
   * Teardown connection and cleanup resources
   * @internal
   */
  _teardownConnection() {
    this.conn && (this.conn.onopen = null, this.conn.onerror = null, this.conn.onmessage = null, this.conn.onclose = null, this.conn = null), this._clearAllTimers(), this.channels.forEach((e) => e.teardown());
  }
  /** @internal */
  _onConnOpen() {
    this._setConnectionState("connected"), this.log("transport", `connected to ${this.endpointURL()}`), this.flushSendBuffer(), this._clearTimer("reconnect"), this.worker ? this.workerRef || this._startWorkerHeartbeat() : this._startHeartbeat(), this._triggerStateCallbacks("open");
  }
  /** @internal */
  _startHeartbeat() {
    this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
  }
  /** @internal */
  _startWorkerHeartbeat() {
    this.workerUrl ? this.log("worker", `starting worker for from ${this.workerUrl}`) : this.log("worker", "starting default worker");
    const e = this._workerObjectUrl(this.workerUrl);
    this.workerRef = new Worker(e), this.workerRef.onerror = (t) => {
      this.log("worker", "worker error", t.message), this.workerRef.terminate();
    }, this.workerRef.onmessage = (t) => {
      t.data.event === "keepAlive" && this.sendHeartbeat();
    }, this.workerRef.postMessage({
      event: "start",
      interval: this.heartbeatIntervalMs
    });
  }
  /** @internal */
  _onConnClose(e) {
    var t;
    this._setConnectionState("disconnected"), this.log("transport", "close", e), this._triggerChanError(), this._clearTimer("heartbeat"), this._wasManualDisconnect || (t = this.reconnectTimer) === null || t === void 0 || t.scheduleTimeout(), this._triggerStateCallbacks("close", e);
  }
  /** @internal */
  _onConnError(e) {
    this._setConnectionState("disconnected"), this.log("transport", `${e}`), this._triggerChanError(), this._triggerStateCallbacks("error", e);
  }
  /** @internal */
  _triggerChanError() {
    this.channels.forEach((e) => e._trigger(re.error));
  }
  /** @internal */
  _appendParams(e, t) {
    if (Object.keys(t).length === 0)
      return e;
    const r = e.match(/\?/) ? "&" : "?", s = new URLSearchParams(t);
    return `${e}${r}${s}`;
  }
  _workerObjectUrl(e) {
    let t;
    if (e)
      t = e;
    else {
      const r = new Blob([Ps], { type: "application/javascript" });
      t = URL.createObjectURL(r);
    }
    return t;
  }
  /**
   * Set connection state with proper state management
   * @internal
   */
  _setConnectionState(e, t = !1) {
    this._connectionState = e, e === "connecting" ? this._wasManualDisconnect = !1 : e === "disconnecting" && (this._wasManualDisconnect = t);
  }
  /**
   * Perform the actual auth operation
   * @internal
   */
  async _performAuth(e = null) {
    let t;
    e ? t = e : this.accessToken ? t = await this.accessToken() : t = this.accessTokenValue, this.accessTokenValue != t && (this.accessTokenValue = t, this.channels.forEach((r) => {
      const s = {
        access_token: t,
        version: ws
      };
      t && r.updateJoinPayload(s), r.joinedOnce && r._isJoined() && r._push(re.access_token, {
        access_token: t
      });
    }));
  }
  /**
   * Wait for any in-flight auth operations to complete
   * @internal
   */
  async _waitForAuthIfNeeded() {
    this._authPromise && await this._authPromise;
  }
  /**
   * Safely call setAuth with standardized error handling
   * @internal
   */
  _setAuthSafely(e = "general") {
    this.setAuth().catch((t) => {
      this.log("error", `error setting auth in ${e}`, t);
    });
  }
  /**
   * Trigger state change callbacks with proper error handling
   * @internal
   */
  _triggerStateCallbacks(e, t) {
    try {
      this.stateChangeCallbacks[e].forEach((r) => {
        try {
          r(t);
        } catch (s) {
          this.log("error", `error in ${e} callback`, s);
        }
      });
    } catch (r) {
      this.log("error", `error triggering ${e} callbacks`, r);
    }
  }
  /**
   * Setup reconnection timer with proper configuration
   * @internal
   */
  _setupReconnectionTimer() {
    this.reconnectTimer = new Pr(async () => {
      setTimeout(async () => {
        await this._waitForAuthIfNeeded(), this.isConnected() || this.connect();
      }, ot.RECONNECT_DELAY);
    }, this.reconnectAfterMs);
  }
  /**
   * Initialize client options with defaults
   * @internal
   */
  _initializeOptions(e) {
    var t, r, s, i, o, a, l, c, u;
    if (this.transport = (t = e == null ? void 0 : e.transport) !== null && t !== void 0 ? t : null, this.timeout = (r = e == null ? void 0 : e.timeout) !== null && r !== void 0 ? r : Ct, this.heartbeatIntervalMs = (s = e == null ? void 0 : e.heartbeatIntervalMs) !== null && s !== void 0 ? s : ot.HEARTBEAT_INTERVAL, this.worker = (i = e == null ? void 0 : e.worker) !== null && i !== void 0 ? i : !1, this.accessToken = (o = e == null ? void 0 : e.accessToken) !== null && o !== void 0 ? o : null, this.heartbeatCallback = (a = e == null ? void 0 : e.heartbeatCallback) !== null && a !== void 0 ? a : mt, e != null && e.params && (this.params = e.params), e != null && e.logger && (this.logger = e.logger), (e != null && e.logLevel || e != null && e.log_level) && (this.logLevel = e.logLevel || e.log_level, this.params = Object.assign(Object.assign({}, this.params), { log_level: this.logLevel })), this.reconnectAfterMs = (l = e == null ? void 0 : e.reconnectAfterMs) !== null && l !== void 0 ? l : (d) => As[d - 1] || Os, this.encode = (c = e == null ? void 0 : e.encode) !== null && c !== void 0 ? c : (d, h) => h(JSON.stringify(d)), this.decode = (u = e == null ? void 0 : e.decode) !== null && u !== void 0 ? u : this.serializer.decode.bind(this.serializer), this.worker) {
      if (typeof window < "u" && !window.Worker)
        throw new Error("Web Worker is not supported");
      this.workerUrl = e == null ? void 0 : e.workerUrl;
    }
  }
}
class Ft extends Error {
  constructor(e) {
    super(e), this.__isStorageError = !0, this.name = "StorageError";
  }
}
function V(n) {
  return typeof n == "object" && n !== null && "__isStorageError" in n;
}
class Is extends Ft {
  constructor(e, t, r) {
    super(e), this.name = "StorageApiError", this.status = t, this.statusCode = r;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
}
class $t extends Ft {
  constructor(e, t) {
    super(e), this.name = "StorageUnknownError", this.originalError = t;
  }
}
var Ls = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function a(u) {
      try {
        c(r.next(u));
      } catch (d) {
        o(d);
      }
    }
    function l(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        o(d);
      }
    }
    function c(u) {
      u.done ? i(u.value) : s(u.value).then(a, l);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
const Lr = (n) => {
  let e;
  return n ? e = n : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => qe).then(({ default: r }) => r(...t)) : e = fetch, (...t) => e(...t);
}, Bs = () => Ls(void 0, void 0, void 0, function* () {
  return typeof Response > "u" ? (yield Promise.resolve().then(() => qe)).Response : Response;
}), At = (n) => {
  if (Array.isArray(n))
    return n.map((t) => At(t));
  if (typeof n == "function" || n !== Object(n))
    return n;
  const e = {};
  return Object.entries(n).forEach(([t, r]) => {
    const s = t.replace(/([-_][a-z])/gi, (i) => i.toUpperCase().replace(/[-_]/g, ""));
    e[s] = At(r);
  }), e;
}, Us = (n) => {
  if (typeof n != "object" || n === null)
    return !1;
  const e = Object.getPrototypeOf(n);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in n) && !(Symbol.iterator in n);
};
var xe = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function a(u) {
      try {
        c(r.next(u));
      } catch (d) {
        o(d);
      }
    }
    function l(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        o(d);
      }
    }
    function c(u) {
      u.done ? i(u.value) : s(u.value).then(a, l);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
const vt = (n) => n.msg || n.message || n.error_description || n.error || JSON.stringify(n), Ns = (n, e, t) => xe(void 0, void 0, void 0, function* () {
  const r = yield Bs();
  n instanceof r && !(t != null && t.noResolveJson) ? n.json().then((s) => {
    const i = n.status || 500, o = (s == null ? void 0 : s.statusCode) || i + "";
    e(new Is(vt(s), i, o));
  }).catch((s) => {
    e(new $t(vt(s), s));
  }) : e(new $t(vt(n), n));
}), Ds = (n, e, t, r) => {
  const s = { method: n, headers: (e == null ? void 0 : e.headers) || {} };
  return n === "GET" || !r ? s : (Us(r) ? (s.headers = Object.assign({ "Content-Type": "application/json" }, e == null ? void 0 : e.headers), s.body = JSON.stringify(r)) : s.body = r, e != null && e.duplex && (s.duplex = e.duplex), Object.assign(Object.assign({}, s), t));
};
function rt(n, e, t, r, s, i) {
  return xe(this, void 0, void 0, function* () {
    return new Promise((o, a) => {
      n(t, Ds(e, r, s, i)).then((l) => {
        if (!l.ok)
          throw l;
        return r != null && r.noResolveJson ? l : l.json();
      }).then((l) => o(l)).catch((l) => Ns(l, a, r));
    });
  });
}
function ut(n, e, t, r) {
  return xe(this, void 0, void 0, function* () {
    return rt(n, "GET", e, t, r);
  });
}
function ne(n, e, t, r, s) {
  return xe(this, void 0, void 0, function* () {
    return rt(n, "POST", e, r, s, t);
  });
}
function Ot(n, e, t, r, s) {
  return xe(this, void 0, void 0, function* () {
    return rt(n, "PUT", e, r, s, t);
  });
}
function Ms(n, e, t, r) {
  return xe(this, void 0, void 0, function* () {
    return rt(n, "HEAD", e, Object.assign(Object.assign({}, t), { noResolveJson: !0 }), r);
  });
}
function Br(n, e, t, r, s) {
  return xe(this, void 0, void 0, function* () {
    return rt(n, "DELETE", e, r, s, t);
  });
}
var Fs = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function a(u) {
      try {
        c(r.next(u));
      } catch (d) {
        o(d);
      }
    }
    function l(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        o(d);
      }
    }
    function c(u) {
      u.done ? i(u.value) : s(u.value).then(a, l);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
class Ws {
  constructor(e, t) {
    this.downloadFn = e, this.shouldThrowOnError = t;
  }
  then(e, t) {
    return this.execute().then(e, t);
  }
  execute() {
    return Fs(this, void 0, void 0, function* () {
      try {
        return {
          data: (yield this.downloadFn()).body,
          error: null
        };
      } catch (e) {
        if (this.shouldThrowOnError)
          throw e;
        if (V(e))
          return { data: null, error: e };
        throw e;
      }
    });
  }
}
var zs = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function a(u) {
      try {
        c(r.next(u));
      } catch (d) {
        o(d);
      }
    }
    function l(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        o(d);
      }
    }
    function c(u) {
      u.done ? i(u.value) : s(u.value).then(a, l);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
class qs {
  constructor(e, t) {
    this.downloadFn = e, this.shouldThrowOnError = t;
  }
  asStream() {
    return new Ws(this.downloadFn, this.shouldThrowOnError);
  }
  then(e, t) {
    return this.execute().then(e, t);
  }
  execute() {
    return zs(this, void 0, void 0, function* () {
      try {
        return {
          data: yield (yield this.downloadFn()).blob(),
          error: null
        };
      } catch (e) {
        if (this.shouldThrowOnError)
          throw e;
        if (V(e))
          return { data: null, error: e };
        throw e;
      }
    });
  }
}
var Q = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function a(u) {
      try {
        c(r.next(u));
      } catch (d) {
        o(d);
      }
    }
    function l(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        o(d);
      }
    }
    function c(u) {
      u.done ? i(u.value) : s(u.value).then(a, l);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
const Hs = {
  limit: 100,
  offset: 0,
  sortBy: {
    column: "name",
    order: "asc"
  }
}, ar = {
  cacheControl: "3600",
  contentType: "text/plain;charset=UTF-8",
  upsert: !1
};
class Vs {
  constructor(e, t = {}, r, s) {
    this.shouldThrowOnError = !1, this.url = e, this.headers = t, this.bucketId = r, this.fetch = Lr(s);
  }
  /**
   * Enable throwing errors instead of returning them.
   */
  throwOnError() {
    return this.shouldThrowOnError = !0, this;
  }
  /**
   * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
   *
   * @param method HTTP method.
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadOrUpdate(e, t, r, s) {
    return Q(this, void 0, void 0, function* () {
      try {
        let i;
        const o = Object.assign(Object.assign({}, ar), s);
        let a = Object.assign(Object.assign({}, this.headers), e === "POST" && { "x-upsert": String(o.upsert) });
        const l = o.metadata;
        typeof Blob < "u" && r instanceof Blob ? (i = new FormData(), i.append("cacheControl", o.cacheControl), l && i.append("metadata", this.encodeMetadata(l)), i.append("", r)) : typeof FormData < "u" && r instanceof FormData ? (i = r, i.append("cacheControl", o.cacheControl), l && i.append("metadata", this.encodeMetadata(l))) : (i = r, a["cache-control"] = `max-age=${o.cacheControl}`, a["content-type"] = o.contentType, l && (a["x-metadata"] = this.toBase64(this.encodeMetadata(l)))), s != null && s.headers && (a = Object.assign(Object.assign({}, a), s.headers));
        const c = this._removeEmptyFolders(t), u = this._getFinalPath(c), d = yield (e == "PUT" ? Ot : ne)(this.fetch, `${this.url}/object/${u}`, i, Object.assign({ headers: a }, o != null && o.duplex ? { duplex: o.duplex } : {}));
        return {
          data: { path: c, id: d.Id, fullPath: d.Key },
          error: null
        };
      } catch (i) {
        if (this.shouldThrowOnError)
          throw i;
        if (V(i))
          return { data: null, error: i };
        throw i;
      }
    });
  }
  /**
   * Uploads a file to an existing bucket.
   *
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  upload(e, t, r) {
    return Q(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("POST", e, t, r);
    });
  }
  /**
   * Upload a file with a token generated from `createSignedUploadUrl`.
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param token The token generated from `createSignedUploadUrl`
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadToSignedUrl(e, t, r, s) {
    return Q(this, void 0, void 0, function* () {
      const i = this._removeEmptyFolders(e), o = this._getFinalPath(i), a = new URL(this.url + `/object/upload/sign/${o}`);
      a.searchParams.set("token", t);
      try {
        let l;
        const c = Object.assign({ upsert: ar.upsert }, s), u = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(c.upsert) });
        typeof Blob < "u" && r instanceof Blob ? (l = new FormData(), l.append("cacheControl", c.cacheControl), l.append("", r)) : typeof FormData < "u" && r instanceof FormData ? (l = r, l.append("cacheControl", c.cacheControl)) : (l = r, u["cache-control"] = `max-age=${c.cacheControl}`, u["content-type"] = c.contentType);
        const d = yield Ot(this.fetch, a.toString(), l, { headers: u });
        return {
          data: { path: i, fullPath: d.Key },
          error: null
        };
      } catch (l) {
        if (this.shouldThrowOnError)
          throw l;
        if (V(l))
          return { data: null, error: l };
        throw l;
      }
    });
  }
  /**
   * Creates a signed upload URL.
   * Signed upload URLs can be used to upload files to the bucket without further authentication.
   * They are valid for 2 hours.
   * @param path The file path, including the current file name. For example `folder/image.png`.
   * @param options.upsert If set to true, allows the file to be overwritten if it already exists.
   */
  createSignedUploadUrl(e, t) {
    return Q(this, void 0, void 0, function* () {
      try {
        let r = this._getFinalPath(e);
        const s = Object.assign({}, this.headers);
        t != null && t.upsert && (s["x-upsert"] = "true");
        const i = yield ne(this.fetch, `${this.url}/object/upload/sign/${r}`, {}, { headers: s }), o = new URL(this.url + i.url), a = o.searchParams.get("token");
        if (!a)
          throw new Ft("No token returned by API");
        return { data: { signedUrl: o.toString(), path: e, token: a }, error: null };
      } catch (r) {
        if (this.shouldThrowOnError)
          throw r;
        if (V(r))
          return { data: null, error: r };
        throw r;
      }
    });
  }
  /**
   * Replaces an existing file at the specified path with a new one.
   *
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  update(e, t, r) {
    return Q(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("PUT", e, t, r);
    });
  }
  /**
   * Moves an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
   * @param options The destination options.
   */
  move(e, t, r) {
    return Q(this, void 0, void 0, function* () {
      try {
        return { data: yield ne(this.fetch, `${this.url}/object/move`, {
          bucketId: this.bucketId,
          sourceKey: e,
          destinationKey: t,
          destinationBucket: r == null ? void 0 : r.destinationBucket
        }, { headers: this.headers }), error: null };
      } catch (s) {
        if (this.shouldThrowOnError)
          throw s;
        if (V(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  /**
   * Copies an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
   * @param options The destination options.
   */
  copy(e, t, r) {
    return Q(this, void 0, void 0, function* () {
      try {
        return { data: { path: (yield ne(this.fetch, `${this.url}/object/copy`, {
          bucketId: this.bucketId,
          sourceKey: e,
          destinationKey: t,
          destinationBucket: r == null ? void 0 : r.destinationBucket
        }, { headers: this.headers })).Key }, error: null };
      } catch (s) {
        if (this.shouldThrowOnError)
          throw s;
        if (V(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  /**
   * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
   *
   * @param path The file path, including the current file name. For example `folder/image.png`.
   * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
   * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   * @param options.transform Transform the asset before serving it to the client.
   */
  createSignedUrl(e, t, r) {
    return Q(this, void 0, void 0, function* () {
      try {
        let s = this._getFinalPath(e), i = yield ne(this.fetch, `${this.url}/object/sign/${s}`, Object.assign({ expiresIn: t }, r != null && r.transform ? { transform: r.transform } : {}), { headers: this.headers });
        const o = r != null && r.download ? `&download=${r.download === !0 ? "" : r.download}` : "";
        return i = { signedUrl: encodeURI(`${this.url}${i.signedURL}${o}`) }, { data: i, error: null };
      } catch (s) {
        if (this.shouldThrowOnError)
          throw s;
        if (V(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  /**
   * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
   *
   * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
   * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
   * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   */
  createSignedUrls(e, t, r) {
    return Q(this, void 0, void 0, function* () {
      try {
        const s = yield ne(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn: t, paths: e }, { headers: this.headers }), i = r != null && r.download ? `&download=${r.download === !0 ? "" : r.download}` : "";
        return {
          data: s.map((o) => Object.assign(Object.assign({}, o), { signedUrl: o.signedURL ? encodeURI(`${this.url}${o.signedURL}${i}`) : null })),
          error: null
        };
      } catch (s) {
        if (this.shouldThrowOnError)
          throw s;
        if (V(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  /**
   * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
   *
   * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
   * @param options.transform Transform the asset before serving it to the client.
   */
  download(e, t) {
    const s = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image/authenticated" : "object", i = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {}), o = i ? `?${i}` : "", a = this._getFinalPath(e), l = () => ut(this.fetch, `${this.url}/${s}/${a}${o}`, {
      headers: this.headers,
      noResolveJson: !0
    });
    return new qs(l, this.shouldThrowOnError);
  }
  /**
   * Retrieves the details of an existing file.
   * @param path
   */
  info(e) {
    return Q(this, void 0, void 0, function* () {
      const t = this._getFinalPath(e);
      try {
        const r = yield ut(this.fetch, `${this.url}/object/info/${t}`, {
          headers: this.headers
        });
        return { data: At(r), error: null };
      } catch (r) {
        if (this.shouldThrowOnError)
          throw r;
        if (V(r))
          return { data: null, error: r };
        throw r;
      }
    });
  }
  /**
   * Checks the existence of a file.
   * @param path
   */
  exists(e) {
    return Q(this, void 0, void 0, function* () {
      const t = this._getFinalPath(e);
      try {
        return yield Ms(this.fetch, `${this.url}/object/${t}`, {
          headers: this.headers
        }), { data: !0, error: null };
      } catch (r) {
        if (this.shouldThrowOnError)
          throw r;
        if (V(r) && r instanceof $t) {
          const s = r.originalError;
          if ([400, 404].includes(s == null ? void 0 : s.status))
            return { data: !1, error: r };
        }
        throw r;
      }
    });
  }
  /**
   * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
   * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
   *
   * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
   * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   * @param options.transform Transform the asset before serving it to the client.
   */
  getPublicUrl(e, t) {
    const r = this._getFinalPath(e), s = [], i = t != null && t.download ? `download=${t.download === !0 ? "" : t.download}` : "";
    i !== "" && s.push(i);
    const a = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image" : "object", l = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {});
    l !== "" && s.push(l);
    let c = s.join("&");
    return c !== "" && (c = `?${c}`), {
      data: { publicUrl: encodeURI(`${this.url}/${a}/public/${r}${c}`) }
    };
  }
  /**
   * Deletes files within the same bucket
   *
   * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
   */
  remove(e) {
    return Q(this, void 0, void 0, function* () {
      try {
        return { data: yield Br(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: e }, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (V(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Get file metadata
   * @param id the file id to retrieve metadata
   */
  // async getMetadata(
  //   id: string
  // ): Promise<
  //   | {
  //       data: Metadata
  //       error: null
  //     }
  //   | {
  //       data: null
  //       error: StorageError
  //     }
  // > {
  //   try {
  //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
  //     return { data, error: null }
  //   } catch (error) {
  //     if (isStorageError(error)) {
  //       return { data: null, error }
  //     }
  //     throw error
  //   }
  // }
  /**
   * Update file metadata
   * @param id the file id to update metadata
   * @param meta the new file metadata
   */
  // async updateMetadata(
  //   id: string,
  //   meta: Metadata
  // ): Promise<
  //   | {
  //       data: Metadata
  //       error: null
  //     }
  //   | {
  //       data: null
  //       error: StorageError
  //     }
  // > {
  //   try {
  //     const data = await post(
  //       this.fetch,
  //       `${this.url}/metadata/${id}`,
  //       { ...meta },
  //       { headers: this.headers }
  //     )
  //     return { data, error: null }
  //   } catch (error) {
  //     if (isStorageError(error)) {
  //       return { data: null, error }
  //     }
  //     throw error
  //   }
  // }
  /**
   * Lists all the files and folders within a path of the bucket.
   * @param path The folder path.
   * @param options Search options including limit (defaults to 100), offset, sortBy, and search
   */
  list(e, t, r) {
    return Q(this, void 0, void 0, function* () {
      try {
        const s = Object.assign(Object.assign(Object.assign({}, Hs), t), { prefix: e || "" });
        return { data: yield ne(this.fetch, `${this.url}/object/list/${this.bucketId}`, s, { headers: this.headers }, r), error: null };
      } catch (s) {
        if (this.shouldThrowOnError)
          throw s;
        if (V(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  /**
   * @experimental this method signature might change in the future
   * @param options search options
   * @param parameters
   */
  listV2(e, t) {
    return Q(this, void 0, void 0, function* () {
      try {
        const r = Object.assign({}, e);
        return { data: yield ne(this.fetch, `${this.url}/object/list-v2/${this.bucketId}`, r, { headers: this.headers }, t), error: null };
      } catch (r) {
        if (this.shouldThrowOnError)
          throw r;
        if (V(r))
          return { data: null, error: r };
        throw r;
      }
    });
  }
  encodeMetadata(e) {
    return JSON.stringify(e);
  }
  toBase64(e) {
    return typeof Buffer < "u" ? Buffer.from(e).toString("base64") : btoa(e);
  }
  _getFinalPath(e) {
    return `${this.bucketId}/${e.replace(/^\/+/, "")}`;
  }
  _removeEmptyFolders(e) {
    return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
  }
  transformOptsToQueryString(e) {
    const t = [];
    return e.width && t.push(`width=${e.width}`), e.height && t.push(`height=${e.height}`), e.resize && t.push(`resize=${e.resize}`), e.format && t.push(`format=${e.format}`), e.quality && t.push(`quality=${e.quality}`), t.join("&");
  }
}
const Gs = "2.12.2", Ks = { "X-Client-Info": `storage-js/${Gs}` };
var Ie = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function a(u) {
      try {
        c(r.next(u));
      } catch (d) {
        o(d);
      }
    }
    function l(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        o(d);
      }
    }
    function c(u) {
      u.done ? i(u.value) : s(u.value).then(a, l);
    }
    c((r = r.apply(n, [])).next());
  });
};
class Js {
  constructor(e, t = {}, r, s) {
    this.shouldThrowOnError = !1;
    const i = new URL(e);
    s != null && s.useNewHostname && /supabase\.(co|in|red)$/.test(i.hostname) && !i.hostname.includes("storage.supabase.") && (i.hostname = i.hostname.replace("supabase.", "storage.supabase.")), this.url = i.href, this.headers = Object.assign(Object.assign({}, Ks), t), this.fetch = Lr(r);
  }
  /**
   * Enable throwing errors instead of returning them.
   */
  throwOnError() {
    return this.shouldThrowOnError = !0, this;
  }
  /**
   * Retrieves the details of all Storage buckets within an existing project.
   */
  listBuckets() {
    return Ie(this, void 0, void 0, function* () {
      try {
        return { data: yield ut(this.fetch, `${this.url}/bucket`, { headers: this.headers }), error: null };
      } catch (e) {
        if (this.shouldThrowOnError)
          throw e;
        if (V(e))
          return { data: null, error: e };
        throw e;
      }
    });
  }
  /**
   * Retrieves the details of an existing Storage bucket.
   *
   * @param id The unique identifier of the bucket you would like to retrieve.
   */
  getBucket(e) {
    return Ie(this, void 0, void 0, function* () {
      try {
        return { data: yield ut(this.fetch, `${this.url}/bucket/${e}`, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (V(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Creates a new Storage bucket
   *
   * @param id A unique identifier for the bucket you are creating.
   * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
   * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
   * The global file size limit takes precedence over this value.
   * The default value is null, which doesn't set a per bucket file size limit.
   * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
   * The default value is null, which allows files with all mime types to be uploaded.
   * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
   * @returns newly created bucket id
   * @param options.type (private-beta) specifies the bucket type. see `BucketType` for more details.
   *   - default bucket type is `STANDARD`
   */
  createBucket(e, t = {
    public: !1
  }) {
    return Ie(this, void 0, void 0, function* () {
      try {
        return { data: yield ne(this.fetch, `${this.url}/bucket`, {
          id: e,
          name: e,
          type: t.type,
          public: t.public,
          file_size_limit: t.fileSizeLimit,
          allowed_mime_types: t.allowedMimeTypes
        }, { headers: this.headers }), error: null };
      } catch (r) {
        if (this.shouldThrowOnError)
          throw r;
        if (V(r))
          return { data: null, error: r };
        throw r;
      }
    });
  }
  /**
   * Updates a Storage bucket
   *
   * @param id A unique identifier for the bucket you are updating.
   * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
   * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
   * The global file size limit takes precedence over this value.
   * The default value is null, which doesn't set a per bucket file size limit.
   * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
   * The default value is null, which allows files with all mime types to be uploaded.
   * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
   */
  updateBucket(e, t) {
    return Ie(this, void 0, void 0, function* () {
      try {
        return { data: yield Ot(this.fetch, `${this.url}/bucket/${e}`, {
          id: e,
          name: e,
          public: t.public,
          file_size_limit: t.fileSizeLimit,
          allowed_mime_types: t.allowedMimeTypes
        }, { headers: this.headers }), error: null };
      } catch (r) {
        if (this.shouldThrowOnError)
          throw r;
        if (V(r))
          return { data: null, error: r };
        throw r;
      }
    });
  }
  /**
   * Removes all objects inside a single bucket.
   *
   * @param id The unique identifier of the bucket you would like to empty.
   */
  emptyBucket(e) {
    return Ie(this, void 0, void 0, function* () {
      try {
        return { data: yield ne(this.fetch, `${this.url}/bucket/${e}/empty`, {}, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (V(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
   * You must first `empty()` the bucket.
   *
   * @param id The unique identifier of the bucket you would like to delete.
   */
  deleteBucket(e) {
    return Ie(this, void 0, void 0, function* () {
      try {
        return { data: yield Br(this.fetch, `${this.url}/bucket/${e}`, {}, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (V(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
}
class Ys extends Js {
  constructor(e, t = {}, r, s) {
    super(e, t, r, s);
  }
  /**
   * Perform file operation in a bucket.
   *
   * @param id The bucket id to operate on.
   */
  from(e) {
    return new Vs(this.url, this.headers, e, this.fetch);
  }
}
const Zs = "2.58.0";
let Ye = "";
typeof Deno < "u" ? Ye = "deno" : typeof document < "u" ? Ye = "web" : typeof navigator < "u" && navigator.product === "ReactNative" ? Ye = "react-native" : Ye = "node";
const Qs = { "X-Client-Info": `supabase-js-${Ye}/${Zs}` }, Xs = {
  headers: Qs
}, en = {
  schema: "public"
}, tn = {
  autoRefreshToken: !0,
  persistSession: !0,
  detectSessionInUrl: !0,
  flowType: "implicit"
}, rn = {};
var sn = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function a(u) {
      try {
        c(r.next(u));
      } catch (d) {
        o(d);
      }
    }
    function l(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        o(d);
      }
    }
    function c(u) {
      u.done ? i(u.value) : s(u.value).then(a, l);
    }
    c((r = r.apply(n, e || [])).next());
  });
};
const nn = (n) => {
  let e;
  return n ? e = n : typeof fetch > "u" ? e = Cr : e = fetch, (...t) => e(...t);
}, on = () => typeof Headers > "u" ? xr : Headers, an = (n, e, t) => {
  const r = nn(t), s = on();
  return (i, o) => sn(void 0, void 0, void 0, function* () {
    var a;
    const l = (a = yield e()) !== null && a !== void 0 ? a : n;
    let c = new s(o == null ? void 0 : o.headers);
    return c.has("apikey") || c.set("apikey", n), c.has("Authorization") || c.set("Authorization", `Bearer ${l}`), r(i, Object.assign(Object.assign({}, o), { headers: c }));
  });
};
var ln = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function a(u) {
      try {
        c(r.next(u));
      } catch (d) {
        o(d);
      }
    }
    function l(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        o(d);
      }
    }
    function c(u) {
      u.done ? i(u.value) : s(u.value).then(a, l);
    }
    c((r = r.apply(n, [])).next());
  });
};
function cn(n) {
  return n.endsWith("/") ? n : n + "/";
}
function un(n, e) {
  var t, r;
  const { db: s, auth: i, realtime: o, global: a } = n, { db: l, auth: c, realtime: u, global: d } = e, h = {
    db: Object.assign(Object.assign({}, l), s),
    auth: Object.assign(Object.assign({}, c), i),
    realtime: Object.assign(Object.assign({}, u), o),
    storage: {},
    global: Object.assign(Object.assign(Object.assign({}, d), a), { headers: Object.assign(Object.assign({}, (t = d == null ? void 0 : d.headers) !== null && t !== void 0 ? t : {}), (r = a == null ? void 0 : a.headers) !== null && r !== void 0 ? r : {}) }),
    accessToken: () => ln(this, void 0, void 0, function* () {
      return "";
    })
  };
  return n.accessToken ? h.accessToken = n.accessToken : delete h.accessToken, h;
}
function dn(n) {
  const e = n == null ? void 0 : n.trim();
  if (!e)
    throw new Error("supabaseUrl is required.");
  if (!e.match(/^https?:\/\//i))
    throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
  try {
    return new URL(cn(e));
  } catch {
    throw Error("Invalid supabaseUrl: Provided URL is malformed.");
  }
}
const Ur = "2.72.0", Me = 30 * 1e3, Pt = 3, _t = Pt * Me, hn = "http://localhost:9999", fn = "supabase.auth.token", pn = { "X-Client-Info": `gotrue-js/${Ur}` }, Rt = "X-Supabase-Api-Version", Nr = {
  "2024-01-01": {
    timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
    name: "2024-01-01"
  }
}, gn = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i, mn = 600 * 1e3;
class Wt extends Error {
  constructor(e, t, r) {
    super(e), this.__isAuthError = !0, this.name = "AuthError", this.status = t, this.code = r;
  }
}
function $(n) {
  return typeof n == "object" && n !== null && "__isAuthError" in n;
}
class vn extends Wt {
  constructor(e, t, r) {
    super(e, t, r), this.name = "AuthApiError", this.status = t, this.code = r;
  }
}
function _n(n) {
  return $(n) && n.name === "AuthApiError";
}
class Dr extends Wt {
  constructor(e, t) {
    super(e), this.name = "AuthUnknownError", this.originalError = t;
  }
}
class ye extends Wt {
  constructor(e, t, r, s) {
    super(e, r, s), this.name = t, this.status = r;
  }
}
class me extends ye {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
  }
}
function wn(n) {
  return $(n) && n.name === "AuthSessionMissingError";
}
class Ke extends ye {
  constructor() {
    super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
  }
}
class at extends ye {
  constructor(e) {
    super(e, "AuthInvalidCredentialsError", 400, void 0);
  }
}
class lt extends ye {
  constructor(e, t = null) {
    super(e, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = t;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
}
function yn(n) {
  return $(n) && n.name === "AuthImplicitGrantRedirectError";
}
class lr extends ye {
  constructor(e, t = null) {
    super(e, "AuthPKCEGrantCodeExchangeError", 500, void 0), this.details = null, this.details = t;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
}
class It extends ye {
  constructor(e, t) {
    super(e, "AuthRetryableFetchError", t, void 0);
  }
}
function wt(n) {
  return $(n) && n.name === "AuthRetryableFetchError";
}
class cr extends ye {
  constructor(e, t, r) {
    super(e, "AuthWeakPasswordError", t, "weak_password"), this.reasons = r;
  }
}
class Lt extends ye {
  constructor(e) {
    super(e, "AuthInvalidJwtError", 400, "invalid_jwt");
  }
}
const dt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), ur = ` 	
\r=`.split(""), bn = (() => {
  const n = new Array(128);
  for (let e = 0; e < n.length; e += 1)
    n[e] = -1;
  for (let e = 0; e < ur.length; e += 1)
    n[ur[e].charCodeAt(0)] = -2;
  for (let e = 0; e < dt.length; e += 1)
    n[dt[e].charCodeAt(0)] = e;
  return n;
})();
function dr(n, e, t) {
  if (n !== null)
    for (e.queue = e.queue << 8 | n, e.queuedBits += 8; e.queuedBits >= 6; ) {
      const r = e.queue >> e.queuedBits - 6 & 63;
      t(dt[r]), e.queuedBits -= 6;
    }
  else if (e.queuedBits > 0)
    for (e.queue = e.queue << 6 - e.queuedBits, e.queuedBits = 6; e.queuedBits >= 6; ) {
      const r = e.queue >> e.queuedBits - 6 & 63;
      t(dt[r]), e.queuedBits -= 6;
    }
}
function Mr(n, e, t) {
  const r = bn[n];
  if (r > -1)
    for (e.queue = e.queue << 6 | r, e.queuedBits += 6; e.queuedBits >= 8; )
      t(e.queue >> e.queuedBits - 8 & 255), e.queuedBits -= 8;
  else {
    if (r === -2)
      return;
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(n)}"`);
  }
}
function hr(n) {
  const e = [], t = (o) => {
    e.push(String.fromCodePoint(o));
  }, r = {
    utf8seq: 0,
    codepoint: 0
  }, s = { queue: 0, queuedBits: 0 }, i = (o) => {
    En(o, r, t);
  };
  for (let o = 0; o < n.length; o += 1)
    Mr(n.charCodeAt(o), s, i);
  return e.join("");
}
function Sn(n, e) {
  if (n <= 127) {
    e(n);
    return;
  } else if (n <= 2047) {
    e(192 | n >> 6), e(128 | n & 63);
    return;
  } else if (n <= 65535) {
    e(224 | n >> 12), e(128 | n >> 6 & 63), e(128 | n & 63);
    return;
  } else if (n <= 1114111) {
    e(240 | n >> 18), e(128 | n >> 12 & 63), e(128 | n >> 6 & 63), e(128 | n & 63);
    return;
  }
  throw new Error(`Unrecognized Unicode codepoint: ${n.toString(16)}`);
}
function kn(n, e) {
  for (let t = 0; t < n.length; t += 1) {
    let r = n.charCodeAt(t);
    if (r > 55295 && r <= 56319) {
      const s = (r - 55296) * 1024 & 65535;
      r = (n.charCodeAt(t + 1) - 56320 & 65535 | s) + 65536, t += 1;
    }
    Sn(r, e);
  }
}
function En(n, e, t) {
  if (e.utf8seq === 0) {
    if (n <= 127) {
      t(n);
      return;
    }
    for (let r = 1; r < 6; r += 1)
      if ((n >> 7 - r & 1) === 0) {
        e.utf8seq = r;
        break;
      }
    if (e.utf8seq === 2)
      e.codepoint = n & 31;
    else if (e.utf8seq === 3)
      e.codepoint = n & 15;
    else if (e.utf8seq === 4)
      e.codepoint = n & 7;
    else
      throw new Error("Invalid UTF-8 sequence");
    e.utf8seq -= 1;
  } else if (e.utf8seq > 0) {
    if (n <= 127)
      throw new Error("Invalid UTF-8 sequence");
    e.codepoint = e.codepoint << 6 | n & 63, e.utf8seq -= 1, e.utf8seq === 0 && t(e.codepoint);
  }
}
function Tn(n) {
  const e = [], t = { queue: 0, queuedBits: 0 }, r = (s) => {
    e.push(s);
  };
  for (let s = 0; s < n.length; s += 1)
    Mr(n.charCodeAt(s), t, r);
  return new Uint8Array(e);
}
function Cn(n) {
  const e = [];
  return kn(n, (t) => e.push(t)), new Uint8Array(e);
}
function xn(n) {
  const e = [], t = { queue: 0, queuedBits: 0 }, r = (s) => {
    e.push(s);
  };
  return n.forEach((s) => dr(s, t, r)), dr(null, t, r), e.join("");
}
function jn(n) {
  return Math.round(Date.now() / 1e3) + n;
}
function $n() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(n) {
    const e = Math.random() * 16 | 0;
    return (n == "x" ? e : e & 3 | 8).toString(16);
  });
}
const ee = () => typeof window < "u" && typeof document < "u", be = {
  tested: !1,
  writable: !1
}, Fr = () => {
  if (!ee())
    return !1;
  try {
    if (typeof globalThis.localStorage != "object")
      return !1;
  } catch {
    return !1;
  }
  if (be.tested)
    return be.writable;
  const n = `lswt-${Math.random()}${Math.random()}`;
  try {
    globalThis.localStorage.setItem(n, n), globalThis.localStorage.removeItem(n), be.tested = !0, be.writable = !0;
  } catch {
    be.tested = !0, be.writable = !1;
  }
  return be.writable;
};
function An(n) {
  const e = {}, t = new URL(n);
  if (t.hash && t.hash[0] === "#")
    try {
      new URLSearchParams(t.hash.substring(1)).forEach((s, i) => {
        e[i] = s;
      });
    } catch {
    }
  return t.searchParams.forEach((r, s) => {
    e[s] = r;
  }), e;
}
const Wr = (n) => {
  let e;
  return n ? e = n : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => qe).then(({ default: r }) => r(...t)) : e = fetch, (...t) => e(...t);
}, On = (n) => typeof n == "object" && n !== null && "status" in n && "ok" in n && "json" in n && typeof n.json == "function", Fe = async (n, e, t) => {
  await n.setItem(e, JSON.stringify(t));
}, Se = async (n, e) => {
  const t = await n.getItem(e);
  if (!t)
    return null;
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}, ge = async (n, e) => {
  await n.removeItem(e);
};
class ht {
  constructor() {
    this.promise = new ht.promiseConstructor((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
}
ht.promiseConstructor = Promise;
function yt(n) {
  const e = n.split(".");
  if (e.length !== 3)
    throw new Lt("Invalid JWT structure");
  for (let r = 0; r < e.length; r++)
    if (!gn.test(e[r]))
      throw new Lt("JWT not in base64url format");
  return {
    // using base64url lib
    header: JSON.parse(hr(e[0])),
    payload: JSON.parse(hr(e[1])),
    signature: Tn(e[2]),
    raw: {
      header: e[0],
      payload: e[1]
    }
  };
}
async function Pn(n) {
  return await new Promise((e) => {
    setTimeout(() => e(null), n);
  });
}
function Rn(n, e) {
  return new Promise((r, s) => {
    (async () => {
      for (let i = 0; i < 1 / 0; i++)
        try {
          const o = await n(i);
          if (!e(i, null, o)) {
            r(o);
            return;
          }
        } catch (o) {
          if (!e(i, o)) {
            s(o);
            return;
          }
        }
    })();
  });
}
function In(n) {
  return ("0" + n.toString(16)).substr(-2);
}
function Ln() {
  const e = new Uint32Array(56);
  if (typeof crypto > "u") {
    const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", r = t.length;
    let s = "";
    for (let i = 0; i < 56; i++)
      s += t.charAt(Math.floor(Math.random() * r));
    return s;
  }
  return crypto.getRandomValues(e), Array.from(e, In).join("");
}
async function Bn(n) {
  const t = new TextEncoder().encode(n), r = await crypto.subtle.digest("SHA-256", t), s = new Uint8Array(r);
  return Array.from(s).map((i) => String.fromCharCode(i)).join("");
}
async function Un(n) {
  if (!(typeof crypto < "u" && typeof crypto.subtle < "u" && typeof TextEncoder < "u"))
    return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), n;
  const t = await Bn(n);
  return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function Le(n, e, t = !1) {
  const r = Ln();
  let s = r;
  t && (s += "/PASSWORD_RECOVERY"), await Fe(n, `${e}-code-verifier`, s);
  const i = await Un(r);
  return [i, r === i ? "plain" : "s256"];
}
const Nn = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function Dn(n) {
  const e = n.headers.get(Rt);
  if (!e || !e.match(Nn))
    return null;
  try {
    return /* @__PURE__ */ new Date(`${e}T00:00:00.0Z`);
  } catch {
    return null;
  }
}
function Mn(n) {
  if (!n)
    throw new Error("Missing exp claim");
  const e = Math.floor(Date.now() / 1e3);
  if (n <= e)
    throw new Error("JWT has expired");
}
function Fn(n) {
  switch (n) {
    case "RS256":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
      };
    case "ES256":
      return {
        name: "ECDSA",
        namedCurve: "P-256",
        hash: { name: "SHA-256" }
      };
    default:
      throw new Error("Invalid alg claim");
  }
}
const Wn = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function Be(n) {
  if (!Wn.test(n))
    throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not");
}
function bt() {
  const n = {};
  return new Proxy(n, {
    get: (e, t) => {
      if (t === "__isUserNotAvailableProxy")
        return !0;
      if (typeof t == "symbol") {
        const r = t.toString();
        if (r === "Symbol(Symbol.toPrimitive)" || r === "Symbol(Symbol.toStringTag)" || r === "Symbol(util.inspect.custom)")
          return;
      }
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`);
    },
    set: (e, t) => {
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
    },
    deleteProperty: (e, t) => {
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
    }
  });
}
function fr(n) {
  return JSON.parse(JSON.stringify(n));
}
var zn = function(n, e) {
  var t = {};
  for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && e.indexOf(r) < 0 && (t[r] = n[r]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, r = Object.getOwnPropertySymbols(n); s < r.length; s++)
      e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(n, r[s]) && (t[r[s]] = n[r[s]]);
  return t;
};
const ke = (n) => n.msg || n.message || n.error_description || n.error || JSON.stringify(n), qn = [502, 503, 504];
async function pr(n) {
  var e;
  if (!On(n))
    throw new It(ke(n), 0);
  if (qn.includes(n.status))
    throw new It(ke(n), n.status);
  let t;
  try {
    t = await n.json();
  } catch (i) {
    throw new Dr(ke(i), i);
  }
  let r;
  const s = Dn(n);
  if (s && s.getTime() >= Nr["2024-01-01"].timestamp && typeof t == "object" && t && typeof t.code == "string" ? r = t.code : typeof t == "object" && t && typeof t.error_code == "string" && (r = t.error_code), r) {
    if (r === "weak_password")
      throw new cr(ke(t), n.status, ((e = t.weak_password) === null || e === void 0 ? void 0 : e.reasons) || []);
    if (r === "session_not_found")
      throw new me();
  } else if (typeof t == "object" && t && typeof t.weak_password == "object" && t.weak_password && Array.isArray(t.weak_password.reasons) && t.weak_password.reasons.length && t.weak_password.reasons.reduce((i, o) => i && typeof o == "string", !0))
    throw new cr(ke(t), n.status, t.weak_password.reasons);
  throw new vn(ke(t), n.status || 500, r);
}
const Hn = (n, e, t, r) => {
  const s = { method: n, headers: (e == null ? void 0 : e.headers) || {} };
  return n === "GET" ? s : (s.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, e == null ? void 0 : e.headers), s.body = JSON.stringify(r), Object.assign(Object.assign({}, s), t));
};
async function R(n, e, t, r) {
  var s;
  const i = Object.assign({}, r == null ? void 0 : r.headers);
  i[Rt] || (i[Rt] = Nr["2024-01-01"].name), r != null && r.jwt && (i.Authorization = `Bearer ${r.jwt}`);
  const o = (s = r == null ? void 0 : r.query) !== null && s !== void 0 ? s : {};
  r != null && r.redirectTo && (o.redirect_to = r.redirectTo);
  const a = Object.keys(o).length ? "?" + new URLSearchParams(o).toString() : "", l = await Vn(n, e, t + a, {
    headers: i,
    noResolveJson: r == null ? void 0 : r.noResolveJson
  }, {}, r == null ? void 0 : r.body);
  return r != null && r.xform ? r == null ? void 0 : r.xform(l) : { data: Object.assign({}, l), error: null };
}
async function Vn(n, e, t, r, s, i) {
  const o = Hn(e, r, s, i);
  let a;
  try {
    a = await n(t, Object.assign({}, o));
  } catch (l) {
    throw console.error(l), new It(ke(l), 0);
  }
  if (a.ok || await pr(a), r != null && r.noResolveJson)
    return a;
  try {
    return await a.json();
  } catch (l) {
    await pr(l);
  }
}
function se(n) {
  var e;
  let t = null;
  Yn(n) && (t = Object.assign({}, n), n.expires_at || (t.expires_at = jn(n.expires_in)));
  const r = (e = n.user) !== null && e !== void 0 ? e : n;
  return { data: { session: t, user: r }, error: null };
}
function gr(n) {
  const e = se(n);
  return !e.error && n.weak_password && typeof n.weak_password == "object" && Array.isArray(n.weak_password.reasons) && n.weak_password.reasons.length && n.weak_password.message && typeof n.weak_password.message == "string" && n.weak_password.reasons.reduce((t, r) => t && typeof r == "string", !0) && (e.data.weak_password = n.weak_password), e;
}
function ve(n) {
  var e;
  return { data: { user: (e = n.user) !== null && e !== void 0 ? e : n }, error: null };
}
function Gn(n) {
  return { data: n, error: null };
}
function Kn(n) {
  const { action_link: e, email_otp: t, hashed_token: r, redirect_to: s, verification_type: i } = n, o = zn(n, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]), a = {
    action_link: e,
    email_otp: t,
    hashed_token: r,
    redirect_to: s,
    verification_type: i
  }, l = Object.assign({}, o);
  return {
    data: {
      properties: a,
      user: l
    },
    error: null
  };
}
function Jn(n) {
  return n;
}
function Yn(n) {
  return n.access_token && n.refresh_token && n.expires_in;
}
const St = ["global", "local", "others"];
var Zn = function(n, e) {
  var t = {};
  for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && e.indexOf(r) < 0 && (t[r] = n[r]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, r = Object.getOwnPropertySymbols(n); s < r.length; s++)
      e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(n, r[s]) && (t[r[s]] = n[r[s]]);
  return t;
};
class Qn {
  constructor({ url: e = "", headers: t = {}, fetch: r }) {
    this.url = e, this.headers = t, this.fetch = Wr(r), this.mfa = {
      listFactors: this._listFactors.bind(this),
      deleteFactor: this._deleteFactor.bind(this)
    };
  }
  /**
   * Removes a logged-in session.
   * @param jwt A valid, logged-in JWT.
   * @param scope The logout sope.
   */
  async signOut(e, t = St[0]) {
    if (St.indexOf(t) < 0)
      throw new Error(`@supabase/auth-js: Parameter scope must be one of ${St.join(", ")}`);
    try {
      return await R(this.fetch, "POST", `${this.url}/logout?scope=${t}`, {
        headers: this.headers,
        jwt: e,
        noResolveJson: !0
      }), { data: null, error: null };
    } catch (r) {
      if ($(r))
        return { data: null, error: r };
      throw r;
    }
  }
  /**
   * Sends an invite link to an email address.
   * @param email The email address of the user.
   * @param options Additional options to be included when inviting.
   */
  async inviteUserByEmail(e, t = {}) {
    try {
      return await R(this.fetch, "POST", `${this.url}/invite`, {
        body: { email: e, data: t.data },
        headers: this.headers,
        redirectTo: t.redirectTo,
        xform: ve
      });
    } catch (r) {
      if ($(r))
        return { data: { user: null }, error: r };
      throw r;
    }
  }
  /**
   * Generates email links and OTPs to be sent via a custom email provider.
   * @param email The user's email.
   * @param options.password User password. For signup only.
   * @param options.data Optional user metadata. For signup only.
   * @param options.redirectTo The redirect url which should be appended to the generated link
   */
  async generateLink(e) {
    try {
      const { options: t } = e, r = Zn(e, ["options"]), s = Object.assign(Object.assign({}, r), t);
      return "newEmail" in r && (s.new_email = r == null ? void 0 : r.newEmail, delete s.newEmail), await R(this.fetch, "POST", `${this.url}/admin/generate_link`, {
        body: s,
        headers: this.headers,
        xform: Kn,
        redirectTo: t == null ? void 0 : t.redirectTo
      });
    } catch (t) {
      if ($(t))
        return {
          data: {
            properties: null,
            user: null
          },
          error: t
        };
      throw t;
    }
  }
  // User Admin API
  /**
   * Creates a new user.
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async createUser(e) {
    try {
      return await R(this.fetch, "POST", `${this.url}/admin/users`, {
        body: e,
        headers: this.headers,
        xform: ve
      });
    } catch (t) {
      if ($(t))
        return { data: { user: null }, error: t };
      throw t;
    }
  }
  /**
   * Get a list of users.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
   */
  async listUsers(e) {
    var t, r, s, i, o, a, l;
    try {
      const c = { nextPage: null, lastPage: 0, total: 0 }, u = await R(this.fetch, "GET", `${this.url}/admin/users`, {
        headers: this.headers,
        noResolveJson: !0,
        query: {
          page: (r = (t = e == null ? void 0 : e.page) === null || t === void 0 ? void 0 : t.toString()) !== null && r !== void 0 ? r : "",
          per_page: (i = (s = e == null ? void 0 : e.perPage) === null || s === void 0 ? void 0 : s.toString()) !== null && i !== void 0 ? i : ""
        },
        xform: Jn
      });
      if (u.error)
        throw u.error;
      const d = await u.json(), h = (o = u.headers.get("x-total-count")) !== null && o !== void 0 ? o : 0, g = (l = (a = u.headers.get("link")) === null || a === void 0 ? void 0 : a.split(",")) !== null && l !== void 0 ? l : [];
      return g.length > 0 && (g.forEach((m) => {
        const w = parseInt(m.split(";")[0].split("=")[1].substring(0, 1)), v = JSON.parse(m.split(";")[1].split("=")[1]);
        c[`${v}Page`] = w;
      }), c.total = parseInt(h)), { data: Object.assign(Object.assign({}, d), c), error: null };
    } catch (c) {
      if ($(c))
        return { data: { users: [] }, error: c };
      throw c;
    }
  }
  /**
   * Get user by id.
   *
   * @param uid The user's unique identifier
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async getUserById(e) {
    Be(e);
    try {
      return await R(this.fetch, "GET", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        xform: ve
      });
    } catch (t) {
      if ($(t))
        return { data: { user: null }, error: t };
      throw t;
    }
  }
  /**
   * Updates the user data.
   *
   * @param attributes The data you want to update.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async updateUserById(e, t) {
    Be(e);
    try {
      return await R(this.fetch, "PUT", `${this.url}/admin/users/${e}`, {
        body: t,
        headers: this.headers,
        xform: ve
      });
    } catch (r) {
      if ($(r))
        return { data: { user: null }, error: r };
      throw r;
    }
  }
  /**
   * Delete a user. Requires a `service_role` key.
   *
   * @param id The user id you want to remove.
   * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema. Soft deletion allows user identification from the hashed user ID but is not reversible.
   * Defaults to false for backward compatibility.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async deleteUser(e, t = !1) {
    Be(e);
    try {
      return await R(this.fetch, "DELETE", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        body: {
          should_soft_delete: t
        },
        xform: ve
      });
    } catch (r) {
      if ($(r))
        return { data: { user: null }, error: r };
      throw r;
    }
  }
  async _listFactors(e) {
    Be(e.userId);
    try {
      const { data: t, error: r } = await R(this.fetch, "GET", `${this.url}/admin/users/${e.userId}/factors`, {
        headers: this.headers,
        xform: (s) => ({ data: { factors: s }, error: null })
      });
      return { data: t, error: r };
    } catch (t) {
      if ($(t))
        return { data: null, error: t };
      throw t;
    }
  }
  async _deleteFactor(e) {
    Be(e.userId), Be(e.id);
    try {
      return { data: await R(this.fetch, "DELETE", `${this.url}/admin/users/${e.userId}/factors/${e.id}`, {
        headers: this.headers
      }), error: null };
    } catch (t) {
      if ($(t))
        return { data: null, error: t };
      throw t;
    }
  }
}
function mr(n = {}) {
  return {
    getItem: (e) => n[e] || null,
    setItem: (e, t) => {
      n[e] = t;
    },
    removeItem: (e) => {
      delete n[e];
    }
  };
}
function Xn() {
  if (typeof globalThis != "object")
    try {
      Object.defineProperty(Object.prototype, "__magic__", {
        get: function() {
          return this;
        },
        configurable: !0
      }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
    } catch {
      typeof self < "u" && (self.globalThis = self);
    }
}
const Ue = {
  /**
   * @experimental
   */
  debug: !!(globalThis && Fr() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
};
class zr extends Error {
  constructor(e) {
    super(e), this.isAcquireTimeout = !0;
  }
}
class ei extends zr {
}
async function ti(n, e, t) {
  Ue.debug && console.log("@supabase/gotrue-js: navigatorLock: acquire lock", n, e);
  const r = new globalThis.AbortController();
  return e > 0 && setTimeout(() => {
    r.abort(), Ue.debug && console.log("@supabase/gotrue-js: navigatorLock acquire timed out", n);
  }, e), await Promise.resolve().then(() => globalThis.navigator.locks.request(n, e === 0 ? {
    mode: "exclusive",
    ifAvailable: !0
  } : {
    mode: "exclusive",
    signal: r.signal
  }, async (s) => {
    if (s) {
      Ue.debug && console.log("@supabase/gotrue-js: navigatorLock: acquired", n, s.name);
      try {
        return await t();
      } finally {
        Ue.debug && console.log("@supabase/gotrue-js: navigatorLock: released", n, s.name);
      }
    } else {
      if (e === 0)
        throw Ue.debug && console.log("@supabase/gotrue-js: navigatorLock: not immediately available", n), new ei(`Acquiring an exclusive Navigator LockManager lock "${n}" immediately failed`);
      if (Ue.debug)
        try {
          const i = await globalThis.navigator.locks.query();
          console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(i, null, "  "));
        } catch (i) {
          console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", i);
        }
      return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"), await t();
    }
  }));
}
function qr(n) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(n))
    throw new Error(`@supabase/auth-js: Address "${n}" is invalid.`);
  return n.toLowerCase();
}
function ri(n) {
  return parseInt(n, 16);
}
function si(n) {
  const e = new TextEncoder().encode(n);
  return "0x" + Array.from(e, (r) => r.toString(16).padStart(2, "0")).join("");
}
function ni(n) {
  var e;
  const { chainId: t, domain: r, expirationTime: s, issuedAt: i = /* @__PURE__ */ new Date(), nonce: o, notBefore: a, requestId: l, resources: c, scheme: u, uri: d, version: h } = n;
  {
    if (!Number.isInteger(t))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);
    if (!r)
      throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');
    if (o && o.length < 8)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${o}`);
    if (!d)
      throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');
    if (h !== "1")
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${h}`);
    if (!((e = n.statement) === null || e === void 0) && e.includes(`
`))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${n.statement}`);
  }
  const g = qr(n.address), m = u ? `${u}://${r}` : r, w = n.statement ? `${n.statement}
` : "", v = `${m} wants you to sign in with your Ethereum account:
${g}

${w}`;
  let y = `URI: ${d}
Version: ${h}
Chain ID: ${t}${o ? `
Nonce: ${o}` : ""}
Issued At: ${i.toISOString()}`;
  if (s && (y += `
Expiration Time: ${s.toISOString()}`), a && (y += `
Not Before: ${a.toISOString()}`), l && (y += `
Request ID: ${l}`), c) {
    let _ = `
Resources:`;
    for (const b of c) {
      if (!b || typeof b != "string")
        throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${b}`);
      _ += `
- ${b}`;
    }
    y += _;
  }
  return `${v}
${y}`;
}
Xn();
const ii = {
  url: hn,
  storageKey: fn,
  autoRefreshToken: !0,
  persistSession: !0,
  detectSessionInUrl: !0,
  headers: pn,
  flowType: "implicit",
  debug: !1,
  hasCustomAuthorizationHeader: !1
};
async function vr(n, e, t) {
  return await t();
}
const Ne = {};
class tt {
  /**
   * Create a new client for use in the browser.
   */
  constructor(e) {
    var t, r;
    this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.initializePromise = null, this.detectSessionInUrl = !0, this.hasCustomAuthorizationHeader = !1, this.suppressGetSessionWarning = !1, this.lockAcquired = !1, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log, this.instanceID = tt.nextInstanceID, tt.nextInstanceID += 1, this.instanceID > 0 && ee() && console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
    const s = Object.assign(Object.assign({}, ii), e);
    if (this.logDebugMessages = !!s.debug, typeof s.debug == "function" && (this.logger = s.debug), this.persistSession = s.persistSession, this.storageKey = s.storageKey, this.autoRefreshToken = s.autoRefreshToken, this.admin = new Qn({
      url: s.url,
      headers: s.headers,
      fetch: s.fetch
    }), this.url = s.url, this.headers = s.headers, this.fetch = Wr(s.fetch), this.lock = s.lock || vr, this.detectSessionInUrl = s.detectSessionInUrl, this.flowType = s.flowType, this.hasCustomAuthorizationHeader = s.hasCustomAuthorizationHeader, s.lock ? this.lock = s.lock : ee() && (!((t = globalThis == null ? void 0 : globalThis.navigator) === null || t === void 0) && t.locks) ? this.lock = ti : this.lock = vr, this.jwks || (this.jwks = { keys: [] }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = {
      verify: this._verify.bind(this),
      enroll: this._enroll.bind(this),
      unenroll: this._unenroll.bind(this),
      challenge: this._challenge.bind(this),
      listFactors: this._listFactors.bind(this),
      challengeAndVerify: this._challengeAndVerify.bind(this),
      getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
    }, this.persistSession ? (s.storage ? this.storage = s.storage : Fr() ? this.storage = globalThis.localStorage : (this.memoryStorage = {}, this.storage = mr(this.memoryStorage)), s.userStorage && (this.userStorage = s.userStorage)) : (this.memoryStorage = {}, this.storage = mr(this.memoryStorage)), ee() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
      } catch (i) {
        console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", i);
      }
      (r = this.broadcastChannel) === null || r === void 0 || r.addEventListener("message", async (i) => {
        this._debug("received broadcast notification from other tab or client", i), await this._notifyAllSubscribers(i.data.event, i.data.session, !1);
      });
    }
    this.initialize();
  }
  /**
   * The JWKS used for verifying asymmetric JWTs
   */
  get jwks() {
    var e, t;
    return (t = (e = Ne[this.storageKey]) === null || e === void 0 ? void 0 : e.jwks) !== null && t !== void 0 ? t : { keys: [] };
  }
  set jwks(e) {
    Ne[this.storageKey] = Object.assign(Object.assign({}, Ne[this.storageKey]), { jwks: e });
  }
  get jwks_cached_at() {
    var e, t;
    return (t = (e = Ne[this.storageKey]) === null || e === void 0 ? void 0 : e.cachedAt) !== null && t !== void 0 ? t : Number.MIN_SAFE_INTEGER;
  }
  set jwks_cached_at(e) {
    Ne[this.storageKey] = Object.assign(Object.assign({}, Ne[this.storageKey]), { cachedAt: e });
  }
  _debug(...e) {
    return this.logDebugMessages && this.logger(`GoTrueClient@${this.instanceID} (${Ur}) ${(/* @__PURE__ */ new Date()).toISOString()}`, ...e), this;
  }
  /**
   * Initializes the client session either from the url or from storage.
   * This method is automatically called when instantiating the client, but should also be called
   * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
   */
  async initialize() {
    return this.initializePromise ? await this.initializePromise : (this.initializePromise = (async () => await this._acquireLock(-1, async () => await this._initialize()))(), await this.initializePromise);
  }
  /**
   * IMPORTANT:
   * 1. Never throw in this method, as it is called from the constructor
   * 2. Never return a session from this method as it would be cached over
   *    the whole lifetime of the client
   */
  async _initialize() {
    var e;
    try {
      const t = An(window.location.href);
      let r = "none";
      if (this._isImplicitGrantCallback(t) ? r = "implicit" : await this._isPKCECallback(t) && (r = "pkce"), ee() && this.detectSessionInUrl && r !== "none") {
        const { data: s, error: i } = await this._getSessionFromURL(t, r);
        if (i) {
          if (this._debug("#_initialize()", "error detecting session from URL", i), yn(i)) {
            const l = (e = i.details) === null || e === void 0 ? void 0 : e.code;
            if (l === "identity_already_exists" || l === "identity_not_found" || l === "single_identity_not_deletable")
              return { error: i };
          }
          return await this._removeSession(), { error: i };
        }
        const { session: o, redirectType: a } = s;
        return this._debug("#_initialize()", "detected session in URL", o, "redirect type", a), await this._saveSession(o), setTimeout(async () => {
          a === "recovery" ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", o) : await this._notifyAllSubscribers("SIGNED_IN", o);
        }, 0), { error: null };
      }
      return await this._recoverAndRefresh(), { error: null };
    } catch (t) {
      return $(t) ? { error: t } : {
        error: new Dr("Unexpected error during initialization", t)
      };
    } finally {
      await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
    }
  }
  /**
   * Creates a new anonymous user.
   *
   * @returns A session where the is_anonymous claim in the access token JWT set to true
   */
  async signInAnonymously(e) {
    var t, r, s;
    try {
      const i = await R(this.fetch, "POST", `${this.url}/signup`, {
        headers: this.headers,
        body: {
          data: (r = (t = e == null ? void 0 : e.options) === null || t === void 0 ? void 0 : t.data) !== null && r !== void 0 ? r : {},
          gotrue_meta_security: { captcha_token: (s = e == null ? void 0 : e.options) === null || s === void 0 ? void 0 : s.captchaToken }
        },
        xform: se
      }), { data: o, error: a } = i;
      if (a || !o)
        return { data: { user: null, session: null }, error: a };
      const l = o.session, c = o.user;
      return o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", l)), { data: { user: c, session: l }, error: null };
    } catch (i) {
      if ($(i))
        return { data: { user: null, session: null }, error: i };
      throw i;
    }
  }
  /**
   * Creates a new user.
   *
   * Be aware that if a user account exists in the system you may get back an
   * error message that attempts to hide this information from the user.
   * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
   *
   * @returns A logged-in session if the server has "autoconfirm" ON
   * @returns A user if the server has "autoconfirm" OFF
   */
  async signUp(e) {
    var t, r, s;
    try {
      let i;
      if ("email" in e) {
        const { email: u, password: d, options: h } = e;
        let g = null, m = null;
        this.flowType === "pkce" && ([g, m] = await Le(this.storage, this.storageKey)), i = await R(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          redirectTo: h == null ? void 0 : h.emailRedirectTo,
          body: {
            email: u,
            password: d,
            data: (t = h == null ? void 0 : h.data) !== null && t !== void 0 ? t : {},
            gotrue_meta_security: { captcha_token: h == null ? void 0 : h.captchaToken },
            code_challenge: g,
            code_challenge_method: m
          },
          xform: se
        });
      } else if ("phone" in e) {
        const { phone: u, password: d, options: h } = e;
        i = await R(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone: u,
            password: d,
            data: (r = h == null ? void 0 : h.data) !== null && r !== void 0 ? r : {},
            channel: (s = h == null ? void 0 : h.channel) !== null && s !== void 0 ? s : "sms",
            gotrue_meta_security: { captcha_token: h == null ? void 0 : h.captchaToken }
          },
          xform: se
        });
      } else
        throw new at("You must provide either an email or phone number and a password");
      const { data: o, error: a } = i;
      if (a || !o)
        return { data: { user: null, session: null }, error: a };
      const l = o.session, c = o.user;
      return o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", l)), { data: { user: c, session: l }, error: null };
    } catch (i) {
      if ($(i))
        return { data: { user: null, session: null }, error: i };
      throw i;
    }
  }
  /**
   * Log in an existing user with an email and password or phone and password.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or that the
   * email/phone and password combination is wrong or that the account can only
   * be accessed via social login.
   */
  async signInWithPassword(e) {
    try {
      let t;
      if ("email" in e) {
        const { email: i, password: o, options: a } = e;
        t = await R(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            email: i,
            password: o,
            gotrue_meta_security: { captcha_token: a == null ? void 0 : a.captchaToken }
          },
          xform: gr
        });
      } else if ("phone" in e) {
        const { phone: i, password: o, options: a } = e;
        t = await R(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            phone: i,
            password: o,
            gotrue_meta_security: { captcha_token: a == null ? void 0 : a.captchaToken }
          },
          xform: gr
        });
      } else
        throw new at("You must provide either an email or phone number and a password");
      const { data: r, error: s } = t;
      return s ? { data: { user: null, session: null }, error: s } : !r || !r.session || !r.user ? { data: { user: null, session: null }, error: new Ke() } : (r.session && (await this._saveSession(r.session), await this._notifyAllSubscribers("SIGNED_IN", r.session)), {
        data: Object.assign({ user: r.user, session: r.session }, r.weak_password ? { weakPassword: r.weak_password } : null),
        error: s
      });
    } catch (t) {
      if ($(t))
        return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  /**
   * Log in an existing user via a third-party provider.
   * This method supports the PKCE flow.
   */
  async signInWithOAuth(e) {
    var t, r, s, i;
    return await this._handleProviderSignIn(e.provider, {
      redirectTo: (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo,
      scopes: (r = e.options) === null || r === void 0 ? void 0 : r.scopes,
      queryParams: (s = e.options) === null || s === void 0 ? void 0 : s.queryParams,
      skipBrowserRedirect: (i = e.options) === null || i === void 0 ? void 0 : i.skipBrowserRedirect
    });
  }
  /**
   * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
   */
  async exchangeCodeForSession(e) {
    return await this.initializePromise, this._acquireLock(-1, async () => this._exchangeCodeForSession(e));
  }
  /**
   * Signs in a user by verifying a message signed by the user's private key.
   * Supports Ethereum (via Sign-In-With-Ethereum) & Solana (Sign-In-With-Solana) standards,
   * both of which derive from the EIP-4361 standard
   * With slight variation on Solana's side.
   * @reference https://eips.ethereum.org/EIPS/eip-4361
   */
  async signInWithWeb3(e) {
    const { chain: t } = e;
    switch (t) {
      case "ethereum":
        return await this.signInWithEthereum(e);
      case "solana":
        return await this.signInWithSolana(e);
      default:
        throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`);
    }
  }
  async signInWithEthereum(e) {
    var t, r, s, i, o, a, l, c, u, d, h;
    let g, m;
    if ("message" in e)
      g = e.message, m = e.signature;
    else {
      const { chain: w, wallet: v, statement: y, options: _ } = e;
      let b;
      if (ee())
        if (typeof v == "object")
          b = v;
        else {
          const N = window;
          if ("ethereum" in N && typeof N.ethereum == "object" && "request" in N.ethereum && typeof N.ethereum.request == "function")
            b = N.ethereum;
          else
            throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.");
        }
      else {
        if (typeof v != "object" || !(_ != null && _.url))
          throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        b = v;
      }
      const k = new URL((t = _ == null ? void 0 : _.url) !== null && t !== void 0 ? t : window.location.href), E = await b.request({
        method: "eth_requestAccounts"
      }).then((N) => N).catch(() => {
        throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid");
      });
      if (!E || E.length === 0)
        throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");
      const C = qr(E[0]);
      let x = (r = _ == null ? void 0 : _.signInWithEthereum) === null || r === void 0 ? void 0 : r.chainId;
      if (!x) {
        const N = await b.request({
          method: "eth_chainId"
        });
        x = ri(N);
      }
      const B = {
        domain: k.host,
        address: C,
        statement: y,
        uri: k.href,
        version: "1",
        chainId: x,
        nonce: (s = _ == null ? void 0 : _.signInWithEthereum) === null || s === void 0 ? void 0 : s.nonce,
        issuedAt: (o = (i = _ == null ? void 0 : _.signInWithEthereum) === null || i === void 0 ? void 0 : i.issuedAt) !== null && o !== void 0 ? o : /* @__PURE__ */ new Date(),
        expirationTime: (a = _ == null ? void 0 : _.signInWithEthereum) === null || a === void 0 ? void 0 : a.expirationTime,
        notBefore: (l = _ == null ? void 0 : _.signInWithEthereum) === null || l === void 0 ? void 0 : l.notBefore,
        requestId: (c = _ == null ? void 0 : _.signInWithEthereum) === null || c === void 0 ? void 0 : c.requestId,
        resources: (u = _ == null ? void 0 : _.signInWithEthereum) === null || u === void 0 ? void 0 : u.resources
      };
      g = ni(B), m = await b.request({
        method: "personal_sign",
        params: [si(g), C]
      });
    }
    try {
      const { data: w, error: v } = await R(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({
          chain: "ethereum",
          message: g,
          signature: m
        }, !((d = e.options) === null || d === void 0) && d.captchaToken ? { gotrue_meta_security: { captcha_token: (h = e.options) === null || h === void 0 ? void 0 : h.captchaToken } } : null),
        xform: se
      });
      if (v)
        throw v;
      return !w || !w.session || !w.user ? {
        data: { user: null, session: null },
        error: new Ke()
      } : (w.session && (await this._saveSession(w.session), await this._notifyAllSubscribers("SIGNED_IN", w.session)), { data: Object.assign({}, w), error: v });
    } catch (w) {
      if ($(w))
        return { data: { user: null, session: null }, error: w };
      throw w;
    }
  }
  async signInWithSolana(e) {
    var t, r, s, i, o, a, l, c, u, d, h, g;
    let m, w;
    if ("message" in e)
      m = e.message, w = e.signature;
    else {
      const { chain: v, wallet: y, statement: _, options: b } = e;
      let k;
      if (ee())
        if (typeof y == "object")
          k = y;
        else {
          const C = window;
          if ("solana" in C && typeof C.solana == "object" && ("signIn" in C.solana && typeof C.solana.signIn == "function" || "signMessage" in C.solana && typeof C.solana.signMessage == "function"))
            k = C.solana;
          else
            throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.");
        }
      else {
        if (typeof y != "object" || !(b != null && b.url))
          throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        k = y;
      }
      const E = new URL((t = b == null ? void 0 : b.url) !== null && t !== void 0 ? t : window.location.href);
      if ("signIn" in k && k.signIn) {
        const C = await k.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, b == null ? void 0 : b.signInWithSolana), {
          // non-overridable properties
          version: "1",
          domain: E.host,
          uri: E.href
        }), _ ? { statement: _ } : null));
        let x;
        if (Array.isArray(C) && C[0] && typeof C[0] == "object")
          x = C[0];
        else if (C && typeof C == "object" && "signedMessage" in C && "signature" in C)
          x = C;
        else
          throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
        if ("signedMessage" in x && "signature" in x && (typeof x.signedMessage == "string" || x.signedMessage instanceof Uint8Array) && x.signature instanceof Uint8Array)
          m = typeof x.signedMessage == "string" ? x.signedMessage : new TextDecoder().decode(x.signedMessage), w = x.signature;
        else
          throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
      } else {
        if (!("signMessage" in k) || typeof k.signMessage != "function" || !("publicKey" in k) || typeof k != "object" || !k.publicKey || !("toBase58" in k.publicKey) || typeof k.publicKey.toBase58 != "function")
          throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
        m = [
          `${E.host} wants you to sign in with your Solana account:`,
          k.publicKey.toBase58(),
          ..._ ? ["", _, ""] : [""],
          "Version: 1",
          `URI: ${E.href}`,
          `Issued At: ${(s = (r = b == null ? void 0 : b.signInWithSolana) === null || r === void 0 ? void 0 : r.issuedAt) !== null && s !== void 0 ? s : (/* @__PURE__ */ new Date()).toISOString()}`,
          ...!((i = b == null ? void 0 : b.signInWithSolana) === null || i === void 0) && i.notBefore ? [`Not Before: ${b.signInWithSolana.notBefore}`] : [],
          ...!((o = b == null ? void 0 : b.signInWithSolana) === null || o === void 0) && o.expirationTime ? [`Expiration Time: ${b.signInWithSolana.expirationTime}`] : [],
          ...!((a = b == null ? void 0 : b.signInWithSolana) === null || a === void 0) && a.chainId ? [`Chain ID: ${b.signInWithSolana.chainId}`] : [],
          ...!((l = b == null ? void 0 : b.signInWithSolana) === null || l === void 0) && l.nonce ? [`Nonce: ${b.signInWithSolana.nonce}`] : [],
          ...!((c = b == null ? void 0 : b.signInWithSolana) === null || c === void 0) && c.requestId ? [`Request ID: ${b.signInWithSolana.requestId}`] : [],
          ...!((d = (u = b == null ? void 0 : b.signInWithSolana) === null || u === void 0 ? void 0 : u.resources) === null || d === void 0) && d.length ? [
            "Resources",
            ...b.signInWithSolana.resources.map((x) => `- ${x}`)
          ] : []
        ].join(`
`);
        const C = await k.signMessage(new TextEncoder().encode(m), "utf8");
        if (!C || !(C instanceof Uint8Array))
          throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
        w = C;
      }
    }
    try {
      const { data: v, error: y } = await R(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({ chain: "solana", message: m, signature: xn(w) }, !((h = e.options) === null || h === void 0) && h.captchaToken ? { gotrue_meta_security: { captcha_token: (g = e.options) === null || g === void 0 ? void 0 : g.captchaToken } } : null),
        xform: se
      });
      if (y)
        throw y;
      return !v || !v.session || !v.user ? {
        data: { user: null, session: null },
        error: new Ke()
      } : (v.session && (await this._saveSession(v.session), await this._notifyAllSubscribers("SIGNED_IN", v.session)), { data: Object.assign({}, v), error: y });
    } catch (v) {
      if ($(v))
        return { data: { user: null, session: null }, error: v };
      throw v;
    }
  }
  async _exchangeCodeForSession(e) {
    const t = await Se(this.storage, `${this.storageKey}-code-verifier`), [r, s] = (t ?? "").split("/");
    try {
      const { data: i, error: o } = await R(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
        headers: this.headers,
        body: {
          auth_code: e,
          code_verifier: r
        },
        xform: se
      });
      if (await ge(this.storage, `${this.storageKey}-code-verifier`), o)
        throw o;
      return !i || !i.session || !i.user ? {
        data: { user: null, session: null, redirectType: null },
        error: new Ke()
      } : (i.session && (await this._saveSession(i.session), await this._notifyAllSubscribers("SIGNED_IN", i.session)), { data: Object.assign(Object.assign({}, i), { redirectType: s ?? null }), error: o });
    } catch (i) {
      if ($(i))
        return { data: { user: null, session: null, redirectType: null }, error: i };
      throw i;
    }
  }
  /**
   * Allows signing in with an OIDC ID token. The authentication provider used
   * should be enabled and configured.
   */
  async signInWithIdToken(e) {
    try {
      const { options: t, provider: r, token: s, access_token: i, nonce: o } = e, a = await R(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
        headers: this.headers,
        body: {
          provider: r,
          id_token: s,
          access_token: i,
          nonce: o,
          gotrue_meta_security: { captcha_token: t == null ? void 0 : t.captchaToken }
        },
        xform: se
      }), { data: l, error: c } = a;
      return c ? { data: { user: null, session: null }, error: c } : !l || !l.session || !l.user ? {
        data: { user: null, session: null },
        error: new Ke()
      } : (l.session && (await this._saveSession(l.session), await this._notifyAllSubscribers("SIGNED_IN", l.session)), { data: l, error: c });
    } catch (t) {
      if ($(t))
        return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  /**
   * Log in a user using magiclink or a one-time password (OTP).
   *
   * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
   * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
   * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or, that the account
   * can only be accessed via social login.
   *
   * Do note that you will need to configure a Whatsapp sender on Twilio
   * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
   * channel is not supported on other providers
   * at this time.
   * This method supports PKCE when an email is passed.
   */
  async signInWithOtp(e) {
    var t, r, s, i, o;
    try {
      if ("email" in e) {
        const { email: a, options: l } = e;
        let c = null, u = null;
        this.flowType === "pkce" && ([c, u] = await Le(this.storage, this.storageKey));
        const { error: d } = await R(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            email: a,
            data: (t = l == null ? void 0 : l.data) !== null && t !== void 0 ? t : {},
            create_user: (r = l == null ? void 0 : l.shouldCreateUser) !== null && r !== void 0 ? r : !0,
            gotrue_meta_security: { captcha_token: l == null ? void 0 : l.captchaToken },
            code_challenge: c,
            code_challenge_method: u
          },
          redirectTo: l == null ? void 0 : l.emailRedirectTo
        });
        return { data: { user: null, session: null }, error: d };
      }
      if ("phone" in e) {
        const { phone: a, options: l } = e, { data: c, error: u } = await R(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            phone: a,
            data: (s = l == null ? void 0 : l.data) !== null && s !== void 0 ? s : {},
            create_user: (i = l == null ? void 0 : l.shouldCreateUser) !== null && i !== void 0 ? i : !0,
            gotrue_meta_security: { captcha_token: l == null ? void 0 : l.captchaToken },
            channel: (o = l == null ? void 0 : l.channel) !== null && o !== void 0 ? o : "sms"
          }
        });
        return { data: { user: null, session: null, messageId: c == null ? void 0 : c.message_id }, error: u };
      }
      throw new at("You must provide either an email or phone number.");
    } catch (a) {
      if ($(a))
        return { data: { user: null, session: null }, error: a };
      throw a;
    }
  }
  /**
   * Log in a user given a User supplied OTP or TokenHash received through mobile or email.
   */
  async verifyOtp(e) {
    var t, r;
    try {
      let s, i;
      "options" in e && (s = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo, i = (r = e.options) === null || r === void 0 ? void 0 : r.captchaToken);
      const { data: o, error: a } = await R(this.fetch, "POST", `${this.url}/verify`, {
        headers: this.headers,
        body: Object.assign(Object.assign({}, e), { gotrue_meta_security: { captcha_token: i } }),
        redirectTo: s,
        xform: se
      });
      if (a)
        throw a;
      if (!o)
        throw new Error("An error occurred on token verification.");
      const l = o.session, c = o.user;
      return l != null && l.access_token && (await this._saveSession(l), await this._notifyAllSubscribers(e.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", l)), { data: { user: c, session: l }, error: null };
    } catch (s) {
      if ($(s))
        return { data: { user: null, session: null }, error: s };
      throw s;
    }
  }
  /**
   * Attempts a single-sign on using an enterprise Identity Provider. A
   * successful SSO attempt will redirect the current page to the identity
   * provider authorization page. The redirect URL is implementation and SSO
   * protocol specific.
   *
   * You can use it by providing a SSO domain. Typically you can extract this
   * domain by asking users for their email address. If this domain is
   * registered on the Auth instance the redirect will use that organization's
   * currently active SSO Identity Provider for the login.
   *
   * If you have built an organization-specific login page, you can use the
   * organization's SSO Identity Provider UUID directly instead.
   */
  async signInWithSSO(e) {
    var t, r, s;
    try {
      let i = null, o = null;
      return this.flowType === "pkce" && ([i, o] = await Le(this.storage, this.storageKey)), await R(this.fetch, "POST", `${this.url}/sso`, {
        body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e ? { provider_id: e.providerId } : null), "domain" in e ? { domain: e.domain } : null), { redirect_to: (r = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo) !== null && r !== void 0 ? r : void 0 }), !((s = e == null ? void 0 : e.options) === null || s === void 0) && s.captchaToken ? { gotrue_meta_security: { captcha_token: e.options.captchaToken } } : null), { skip_http_redirect: !0, code_challenge: i, code_challenge_method: o }),
        headers: this.headers,
        xform: Gn
      });
    } catch (i) {
      if ($(i))
        return { data: null, error: i };
      throw i;
    }
  }
  /**
   * Sends a reauthentication OTP to the user's email or phone number.
   * Requires the user to be signed-in.
   */
  async reauthenticate() {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._reauthenticate());
  }
  async _reauthenticate() {
    try {
      return await this._useSession(async (e) => {
        const { data: { session: t }, error: r } = e;
        if (r)
          throw r;
        if (!t)
          throw new me();
        const { error: s } = await R(this.fetch, "GET", `${this.url}/reauthenticate`, {
          headers: this.headers,
          jwt: t.access_token
        });
        return { data: { user: null, session: null }, error: s };
      });
    } catch (e) {
      if ($(e))
        return { data: { user: null, session: null }, error: e };
      throw e;
    }
  }
  /**
   * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
   */
  async resend(e) {
    try {
      const t = `${this.url}/resend`;
      if ("email" in e) {
        const { email: r, type: s, options: i } = e, { error: o } = await R(this.fetch, "POST", t, {
          headers: this.headers,
          body: {
            email: r,
            type: s,
            gotrue_meta_security: { captcha_token: i == null ? void 0 : i.captchaToken }
          },
          redirectTo: i == null ? void 0 : i.emailRedirectTo
        });
        return { data: { user: null, session: null }, error: o };
      } else if ("phone" in e) {
        const { phone: r, type: s, options: i } = e, { data: o, error: a } = await R(this.fetch, "POST", t, {
          headers: this.headers,
          body: {
            phone: r,
            type: s,
            gotrue_meta_security: { captcha_token: i == null ? void 0 : i.captchaToken }
          }
        });
        return { data: { user: null, session: null, messageId: o == null ? void 0 : o.message_id }, error: a };
      }
      throw new at("You must provide either an email or phone number and a type");
    } catch (t) {
      if ($(t))
        return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  /**
   * Returns the session, refreshing it if necessary.
   *
   * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
   *
   * **IMPORTANT:** This method loads values directly from the storage attached
   * to the client. If that storage is based on request cookies for example,
   * the values in it may not be authentic and therefore it's strongly advised
   * against using this method and its results in such circumstances. A warning
   * will be emitted if this is detected. Use {@link #getUser()} instead.
   */
  async getSession() {
    return await this.initializePromise, await this._acquireLock(-1, async () => this._useSession(async (t) => t));
  }
  /**
   * Acquires a global lock based on the storage key.
   */
  async _acquireLock(e, t) {
    this._debug("#_acquireLock", "begin", e);
    try {
      if (this.lockAcquired) {
        const r = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), s = (async () => (await r, await t()))();
        return this.pendingInLock.push((async () => {
          try {
            await s;
          } catch {
          }
        })()), s;
      }
      return await this.lock(`lock:${this.storageKey}`, e, async () => {
        this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
        try {
          this.lockAcquired = !0;
          const r = t();
          for (this.pendingInLock.push((async () => {
            try {
              await r;
            } catch {
            }
          })()), await r; this.pendingInLock.length; ) {
            const s = [...this.pendingInLock];
            await Promise.all(s), this.pendingInLock.splice(0, s.length);
          }
          return await r;
        } finally {
          this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = !1;
        }
      });
    } finally {
      this._debug("#_acquireLock", "end");
    }
  }
  /**
   * Use instead of {@link #getSession} inside the library. It is
   * semantically usually what you want, as getting a session involves some
   * processing afterwards that requires only one client operating on the
   * session at once across multiple tabs or processes.
   */
  async _useSession(e) {
    this._debug("#_useSession", "begin");
    try {
      const t = await this.__loadSession();
      return await e(t);
    } finally {
      this._debug("#_useSession", "end");
    }
  }
  /**
   * NEVER USE DIRECTLY!
   *
   * Always use {@link #_useSession}.
   */
  async __loadSession() {
    this._debug("#__loadSession()", "begin"), this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
    try {
      let e = null;
      const t = await Se(this.storage, this.storageKey);
      if (this._debug("#getSession()", "session from storage", t), t !== null && (this._isValidSession(t) ? e = t : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !e)
        return { data: { session: null }, error: null };
      const r = e.expires_at ? e.expires_at * 1e3 - Date.now() < _t : !1;
      if (this._debug("#__loadSession()", `session has${r ? "" : " not"} expired`, "expires_at", e.expires_at), !r) {
        if (this.userStorage) {
          const o = await Se(this.userStorage, this.storageKey + "-user");
          o != null && o.user ? e.user = o.user : e.user = bt();
        }
        if (this.storage.isServer && e.user) {
          let o = this.suppressGetSessionWarning;
          e = new Proxy(e, {
            get: (l, c, u) => (!o && c === "user" && (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), o = !0, this.suppressGetSessionWarning = !0), Reflect.get(l, c, u))
          });
        }
        return { data: { session: e }, error: null };
      }
      const { session: s, error: i } = await this._callRefreshToken(e.refresh_token);
      return i ? { data: { session: null }, error: i } : { data: { session: s }, error: null };
    } finally {
      this._debug("#__loadSession()", "end");
    }
  }
  /**
   * Gets the current user details if there is an existing session. This method
   * performs a network request to the Supabase Auth server, so the returned
   * value is authentic and can be used to base authorization rules on.
   *
   * @param jwt Takes in an optional access token JWT. If no JWT is provided, the JWT from the current session is used.
   */
  async getUser(e) {
    return e ? await this._getUser(e) : (await this.initializePromise, await this._acquireLock(-1, async () => await this._getUser()));
  }
  async _getUser(e) {
    try {
      return e ? await R(this.fetch, "GET", `${this.url}/user`, {
        headers: this.headers,
        jwt: e,
        xform: ve
      }) : await this._useSession(async (t) => {
        var r, s, i;
        const { data: o, error: a } = t;
        if (a)
          throw a;
        return !(!((r = o.session) === null || r === void 0) && r.access_token) && !this.hasCustomAuthorizationHeader ? { data: { user: null }, error: new me() } : await R(this.fetch, "GET", `${this.url}/user`, {
          headers: this.headers,
          jwt: (i = (s = o.session) === null || s === void 0 ? void 0 : s.access_token) !== null && i !== void 0 ? i : void 0,
          xform: ve
        });
      });
    } catch (t) {
      if ($(t))
        return wn(t) && (await this._removeSession(), await ge(this.storage, `${this.storageKey}-code-verifier`)), { data: { user: null }, error: t };
      throw t;
    }
  }
  /**
   * Updates user data for a logged in user.
   */
  async updateUser(e, t = {}) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._updateUser(e, t));
  }
  async _updateUser(e, t = {}) {
    try {
      return await this._useSession(async (r) => {
        const { data: s, error: i } = r;
        if (i)
          throw i;
        if (!s.session)
          throw new me();
        const o = s.session;
        let a = null, l = null;
        this.flowType === "pkce" && e.email != null && ([a, l] = await Le(this.storage, this.storageKey));
        const { data: c, error: u } = await R(this.fetch, "PUT", `${this.url}/user`, {
          headers: this.headers,
          redirectTo: t == null ? void 0 : t.emailRedirectTo,
          body: Object.assign(Object.assign({}, e), { code_challenge: a, code_challenge_method: l }),
          jwt: o.access_token,
          xform: ve
        });
        if (u)
          throw u;
        return o.user = c.user, await this._saveSession(o), await this._notifyAllSubscribers("USER_UPDATED", o), { data: { user: o.user }, error: null };
      });
    } catch (r) {
      if ($(r))
        return { data: { user: null }, error: r };
      throw r;
    }
  }
  /**
   * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
   * If the refresh token or access token in the current session is invalid, an error will be thrown.
   * @param currentSession The current session that minimally contains an access token and refresh token.
   */
  async setSession(e) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._setSession(e));
  }
  async _setSession(e) {
    try {
      if (!e.access_token || !e.refresh_token)
        throw new me();
      const t = Date.now() / 1e3;
      let r = t, s = !0, i = null;
      const { payload: o } = yt(e.access_token);
      if (o.exp && (r = o.exp, s = r <= t), s) {
        const { session: a, error: l } = await this._callRefreshToken(e.refresh_token);
        if (l)
          return { data: { user: null, session: null }, error: l };
        if (!a)
          return { data: { user: null, session: null }, error: null };
        i = a;
      } else {
        const { data: a, error: l } = await this._getUser(e.access_token);
        if (l)
          throw l;
        i = {
          access_token: e.access_token,
          refresh_token: e.refresh_token,
          user: a.user,
          token_type: "bearer",
          expires_in: r - t,
          expires_at: r
        }, await this._saveSession(i), await this._notifyAllSubscribers("SIGNED_IN", i);
      }
      return { data: { user: i.user, session: i }, error: null };
    } catch (t) {
      if ($(t))
        return { data: { session: null, user: null }, error: t };
      throw t;
    }
  }
  /**
   * Returns a new session, regardless of expiry status.
   * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
   * If the current session's refresh token is invalid, an error will be thrown.
   * @param currentSession The current session. If passed in, it must contain a refresh token.
   */
  async refreshSession(e) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._refreshSession(e));
  }
  async _refreshSession(e) {
    try {
      return await this._useSession(async (t) => {
        var r;
        if (!e) {
          const { data: o, error: a } = t;
          if (a)
            throw a;
          e = (r = o.session) !== null && r !== void 0 ? r : void 0;
        }
        if (!(e != null && e.refresh_token))
          throw new me();
        const { session: s, error: i } = await this._callRefreshToken(e.refresh_token);
        return i ? { data: { user: null, session: null }, error: i } : s ? { data: { user: s.user, session: s }, error: null } : { data: { user: null, session: null }, error: null };
      });
    } catch (t) {
      if ($(t))
        return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  /**
   * Gets the session data from a URL string
   */
  async _getSessionFromURL(e, t) {
    try {
      if (!ee())
        throw new lt("No browser detected.");
      if (e.error || e.error_description || e.error_code)
        throw new lt(e.error_description || "Error in URL with unspecified error_description", {
          error: e.error || "unspecified_error",
          code: e.error_code || "unspecified_code"
        });
      switch (t) {
        case "implicit":
          if (this.flowType === "pkce")
            throw new lr("Not a valid PKCE flow url.");
          break;
        case "pkce":
          if (this.flowType === "implicit")
            throw new lt("Not a valid implicit grant flow url.");
          break;
        default:
      }
      if (t === "pkce") {
        if (this._debug("#_initialize()", "begin", "is PKCE flow", !0), !e.code)
          throw new lr("No code detected.");
        const { data: _, error: b } = await this._exchangeCodeForSession(e.code);
        if (b)
          throw b;
        const k = new URL(window.location.href);
        return k.searchParams.delete("code"), window.history.replaceState(window.history.state, "", k.toString()), { data: { session: _.session, redirectType: null }, error: null };
      }
      const { provider_token: r, provider_refresh_token: s, access_token: i, refresh_token: o, expires_in: a, expires_at: l, token_type: c } = e;
      if (!i || !a || !o || !c)
        throw new lt("No session defined in URL");
      const u = Math.round(Date.now() / 1e3), d = parseInt(a);
      let h = u + d;
      l && (h = parseInt(l));
      const g = h - u;
      g * 1e3 <= Me && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${g}s, should have been closer to ${d}s`);
      const m = h - d;
      u - m >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", m, h, u) : u - m < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", m, h, u);
      const { data: w, error: v } = await this._getUser(i);
      if (v)
        throw v;
      const y = {
        provider_token: r,
        provider_refresh_token: s,
        access_token: i,
        expires_in: d,
        expires_at: h,
        refresh_token: o,
        token_type: c,
        user: w.user
      };
      return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), { data: { session: y, redirectType: e.type }, error: null };
    } catch (r) {
      if ($(r))
        return { data: { session: null, redirectType: null }, error: r };
      throw r;
    }
  }
  /**
   * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
   */
  _isImplicitGrantCallback(e) {
    return !!(e.access_token || e.error_description);
  }
  /**
   * Checks if the current URL and backing storage contain parameters given by a PKCE flow
   */
  async _isPKCECallback(e) {
    const t = await Se(this.storage, `${this.storageKey}-code-verifier`);
    return !!(e.code && t);
  }
  /**
   * Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
   *
   * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
   * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
   *
   * If using `others` scope, no `SIGNED_OUT` event is fired!
   */
  async signOut(e = { scope: "global" }) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._signOut(e));
  }
  async _signOut({ scope: e } = { scope: "global" }) {
    return await this._useSession(async (t) => {
      var r;
      const { data: s, error: i } = t;
      if (i)
        return { error: i };
      const o = (r = s.session) === null || r === void 0 ? void 0 : r.access_token;
      if (o) {
        const { error: a } = await this.admin.signOut(o, e);
        if (a && !(_n(a) && (a.status === 404 || a.status === 401 || a.status === 403)))
          return { error: a };
      }
      return e !== "others" && (await this._removeSession(), await ge(this.storage, `${this.storageKey}-code-verifier`)), { error: null };
    });
  }
  /**
   * Receive a notification every time an auth event happens.
   * @param callback A callback function to be invoked when an auth event happens.
   */
  onAuthStateChange(e) {
    const t = $n(), r = {
      id: t,
      callback: e,
      unsubscribe: () => {
        this._debug("#unsubscribe()", "state change callback with id removed", t), this.stateChangeEmitters.delete(t);
      }
    };
    return this._debug("#onAuthStateChange()", "registered callback with id", t), this.stateChangeEmitters.set(t, r), (async () => (await this.initializePromise, await this._acquireLock(-1, async () => {
      this._emitInitialSession(t);
    })))(), { data: { subscription: r } };
  }
  async _emitInitialSession(e) {
    return await this._useSession(async (t) => {
      var r, s;
      try {
        const { data: { session: i }, error: o } = t;
        if (o)
          throw o;
        await ((r = this.stateChangeEmitters.get(e)) === null || r === void 0 ? void 0 : r.callback("INITIAL_SESSION", i)), this._debug("INITIAL_SESSION", "callback id", e, "session", i);
      } catch (i) {
        await ((s = this.stateChangeEmitters.get(e)) === null || s === void 0 ? void 0 : s.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e, "error", i), console.error(i);
      }
    });
  }
  /**
   * Sends a password reset request to an email address. This method supports the PKCE flow.
   *
   * @param email The email address of the user.
   * @param options.redirectTo The URL to send the user to after they click the password reset link.
   * @param options.captchaToken Verification token received when the user completes the captcha on the site.
   */
  async resetPasswordForEmail(e, t = {}) {
    let r = null, s = null;
    this.flowType === "pkce" && ([r, s] = await Le(
      this.storage,
      this.storageKey,
      !0
      // isPasswordRecovery
    ));
    try {
      return await R(this.fetch, "POST", `${this.url}/recover`, {
        body: {
          email: e,
          code_challenge: r,
          code_challenge_method: s,
          gotrue_meta_security: { captcha_token: t.captchaToken }
        },
        headers: this.headers,
        redirectTo: t.redirectTo
      });
    } catch (i) {
      if ($(i))
        return { data: null, error: i };
      throw i;
    }
  }
  /**
   * Gets all the identities linked to a user.
   */
  async getUserIdentities() {
    var e;
    try {
      const { data: t, error: r } = await this.getUser();
      if (r)
        throw r;
      return { data: { identities: (e = t.user.identities) !== null && e !== void 0 ? e : [] }, error: null };
    } catch (t) {
      if ($(t))
        return { data: null, error: t };
      throw t;
    }
  }
  /**
   * Links an oauth identity to an existing user.
   * This method supports the PKCE flow.
   */
  async linkIdentity(e) {
    var t;
    try {
      const { data: r, error: s } = await this._useSession(async (i) => {
        var o, a, l, c, u;
        const { data: d, error: h } = i;
        if (h)
          throw h;
        const g = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e.provider, {
          redirectTo: (o = e.options) === null || o === void 0 ? void 0 : o.redirectTo,
          scopes: (a = e.options) === null || a === void 0 ? void 0 : a.scopes,
          queryParams: (l = e.options) === null || l === void 0 ? void 0 : l.queryParams,
          skipBrowserRedirect: !0
        });
        return await R(this.fetch, "GET", g, {
          headers: this.headers,
          jwt: (u = (c = d.session) === null || c === void 0 ? void 0 : c.access_token) !== null && u !== void 0 ? u : void 0
        });
      });
      if (s)
        throw s;
      return ee() && !(!((t = e.options) === null || t === void 0) && t.skipBrowserRedirect) && window.location.assign(r == null ? void 0 : r.url), { data: { provider: e.provider, url: r == null ? void 0 : r.url }, error: null };
    } catch (r) {
      if ($(r))
        return { data: { provider: e.provider, url: null }, error: r };
      throw r;
    }
  }
  /**
   * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
   */
  async unlinkIdentity(e) {
    try {
      return await this._useSession(async (t) => {
        var r, s;
        const { data: i, error: o } = t;
        if (o)
          throw o;
        return await R(this.fetch, "DELETE", `${this.url}/user/identities/${e.identity_id}`, {
          headers: this.headers,
          jwt: (s = (r = i.session) === null || r === void 0 ? void 0 : r.access_token) !== null && s !== void 0 ? s : void 0
        });
      });
    } catch (t) {
      if ($(t))
        return { data: null, error: t };
      throw t;
    }
  }
  /**
   * Generates a new JWT.
   * @param refreshToken A valid refresh token that was returned on login.
   */
  async _refreshAccessToken(e) {
    const t = `#_refreshAccessToken(${e.substring(0, 5)}...)`;
    this._debug(t, "begin");
    try {
      const r = Date.now();
      return await Rn(async (s) => (s > 0 && await Pn(200 * Math.pow(2, s - 1)), this._debug(t, "refreshing attempt", s), await R(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
        body: { refresh_token: e },
        headers: this.headers,
        xform: se
      })), (s, i) => {
        const o = 200 * Math.pow(2, s);
        return i && wt(i) && // retryable only if the request can be sent before the backoff overflows the tick duration
        Date.now() + o - r < Me;
      });
    } catch (r) {
      if (this._debug(t, "error", r), $(r))
        return { data: { session: null, user: null }, error: r };
      throw r;
    } finally {
      this._debug(t, "end");
    }
  }
  _isValidSession(e) {
    return typeof e == "object" && e !== null && "access_token" in e && "refresh_token" in e && "expires_at" in e;
  }
  async _handleProviderSignIn(e, t) {
    const r = await this._getUrlForProvider(`${this.url}/authorize`, e, {
      redirectTo: t.redirectTo,
      scopes: t.scopes,
      queryParams: t.queryParams
    });
    return this._debug("#_handleProviderSignIn()", "provider", e, "options", t, "url", r), ee() && !t.skipBrowserRedirect && window.location.assign(r), { data: { provider: e, url: r }, error: null };
  }
  /**
   * Recovers the session from LocalStorage and refreshes the token
   * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
   */
  async _recoverAndRefresh() {
    var e, t;
    const r = "#_recoverAndRefresh()";
    this._debug(r, "begin");
    try {
      const s = await Se(this.storage, this.storageKey);
      if (s && this.userStorage) {
        let o = await Se(this.userStorage, this.storageKey + "-user");
        !this.storage.isServer && Object.is(this.storage, this.userStorage) && !o && (o = { user: s.user }, await Fe(this.userStorage, this.storageKey + "-user", o)), s.user = (e = o == null ? void 0 : o.user) !== null && e !== void 0 ? e : bt();
      } else if (s && !s.user && !s.user) {
        const o = await Se(this.storage, this.storageKey + "-user");
        o && (o != null && o.user) ? (s.user = o.user, await ge(this.storage, this.storageKey + "-user"), await Fe(this.storage, this.storageKey, s)) : s.user = bt();
      }
      if (this._debug(r, "session from storage", s), !this._isValidSession(s)) {
        this._debug(r, "session is not valid"), s !== null && await this._removeSession();
        return;
      }
      const i = ((t = s.expires_at) !== null && t !== void 0 ? t : 1 / 0) * 1e3 - Date.now() < _t;
      if (this._debug(r, `session has${i ? "" : " not"} expired with margin of ${_t}s`), i) {
        if (this.autoRefreshToken && s.refresh_token) {
          const { error: o } = await this._callRefreshToken(s.refresh_token);
          o && (console.error(o), wt(o) || (this._debug(r, "refresh failed with a non-retryable error, removing the session", o), await this._removeSession()));
        }
      } else if (s.user && s.user.__isUserNotAvailableProxy === !0)
        try {
          const { data: o, error: a } = await this._getUser(s.access_token);
          !a && (o != null && o.user) ? (s.user = o.user, await this._saveSession(s), await this._notifyAllSubscribers("SIGNED_IN", s)) : this._debug(r, "could not get user data, skipping SIGNED_IN notification");
        } catch (o) {
          console.error("Error getting user data:", o), this._debug(r, "error getting user data, skipping SIGNED_IN notification", o);
        }
      else
        await this._notifyAllSubscribers("SIGNED_IN", s);
    } catch (s) {
      this._debug(r, "error", s), console.error(s);
      return;
    } finally {
      this._debug(r, "end");
    }
  }
  async _callRefreshToken(e) {
    var t, r;
    if (!e)
      throw new me();
    if (this.refreshingDeferred)
      return this.refreshingDeferred.promise;
    const s = `#_callRefreshToken(${e.substring(0, 5)}...)`;
    this._debug(s, "begin");
    try {
      this.refreshingDeferred = new ht();
      const { data: i, error: o } = await this._refreshAccessToken(e);
      if (o)
        throw o;
      if (!i.session)
        throw new me();
      await this._saveSession(i.session), await this._notifyAllSubscribers("TOKEN_REFRESHED", i.session);
      const a = { session: i.session, error: null };
      return this.refreshingDeferred.resolve(a), a;
    } catch (i) {
      if (this._debug(s, "error", i), $(i)) {
        const o = { session: null, error: i };
        return wt(i) || await this._removeSession(), (t = this.refreshingDeferred) === null || t === void 0 || t.resolve(o), o;
      }
      throw (r = this.refreshingDeferred) === null || r === void 0 || r.reject(i), i;
    } finally {
      this.refreshingDeferred = null, this._debug(s, "end");
    }
  }
  async _notifyAllSubscribers(e, t, r = !0) {
    const s = `#_notifyAllSubscribers(${e})`;
    this._debug(s, "begin", t, `broadcast = ${r}`);
    try {
      this.broadcastChannel && r && this.broadcastChannel.postMessage({ event: e, session: t });
      const i = [], o = Array.from(this.stateChangeEmitters.values()).map(async (a) => {
        try {
          await a.callback(e, t);
        } catch (l) {
          i.push(l);
        }
      });
      if (await Promise.all(o), i.length > 0) {
        for (let a = 0; a < i.length; a += 1)
          console.error(i[a]);
        throw i[0];
      }
    } finally {
      this._debug(s, "end");
    }
  }
  /**
   * set currentSession and currentUser
   * process to _startAutoRefreshToken if possible
   */
  async _saveSession(e) {
    this._debug("#_saveSession()", e), this.suppressGetSessionWarning = !0;
    const t = Object.assign({}, e), r = t.user && t.user.__isUserNotAvailableProxy === !0;
    if (this.userStorage) {
      !r && t.user && await Fe(this.userStorage, this.storageKey + "-user", {
        user: t.user
      });
      const s = Object.assign({}, t);
      delete s.user;
      const i = fr(s);
      await Fe(this.storage, this.storageKey, i);
    } else {
      const s = fr(t);
      await Fe(this.storage, this.storageKey, s);
    }
  }
  async _removeSession() {
    this._debug("#_removeSession()"), await ge(this.storage, this.storageKey), await ge(this.storage, this.storageKey + "-code-verifier"), await ge(this.storage, this.storageKey + "-user"), this.userStorage && await ge(this.userStorage, this.storageKey + "-user"), await this._notifyAllSubscribers("SIGNED_OUT", null);
  }
  /**
   * Removes any registered visibilitychange callback.
   *
   * {@see #startAutoRefresh}
   * {@see #stopAutoRefresh}
   */
  _removeVisibilityChangedCallback() {
    this._debug("#_removeVisibilityChangedCallback()");
    const e = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      e && ee() && (window != null && window.removeEventListener) && window.removeEventListener("visibilitychange", e);
    } catch (t) {
      console.error("removing visibilitychange callback failed", t);
    }
  }
  /**
   * This is the private implementation of {@link #startAutoRefresh}. Use this
   * within the library.
   */
  async _startAutoRefresh() {
    await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
    const e = setInterval(() => this._autoRefreshTokenTick(), Me);
    this.autoRefreshTicker = e, e && typeof e == "object" && typeof e.unref == "function" ? e.unref() : typeof Deno < "u" && typeof Deno.unrefTimer == "function" && Deno.unrefTimer(e), setTimeout(async () => {
      await this.initializePromise, await this._autoRefreshTokenTick();
    }, 0);
  }
  /**
   * This is the private implementation of {@link #stopAutoRefresh}. Use this
   * within the library.
   */
  async _stopAutoRefresh() {
    this._debug("#_stopAutoRefresh()");
    const e = this.autoRefreshTicker;
    this.autoRefreshTicker = null, e && clearInterval(e);
  }
  /**
   * Starts an auto-refresh process in the background. The session is checked
   * every few seconds. Close to the time of expiration a process is started to
   * refresh the session. If refreshing fails it will be retried for as long as
   * necessary.
   *
   * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
   * to call this function, it will be called for you.
   *
   * On browsers the refresh process works only when the tab/window is in the
   * foreground to conserve resources as well as prevent race conditions and
   * flooding auth with requests. If you call this method any managed
   * visibility change callback will be removed and you must manage visibility
   * changes on your own.
   *
   * On non-browser platforms the refresh process works *continuously* in the
   * background, which may not be desirable. You should hook into your
   * platform's foreground indication mechanism and call these methods
   * appropriately to conserve resources.
   *
   * {@see #stopAutoRefresh}
   */
  async startAutoRefresh() {
    this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
  }
  /**
   * Stops an active auto refresh process running in the background (if any).
   *
   * If you call this method any managed visibility change callback will be
   * removed and you must manage visibility changes on your own.
   *
   * See {@link #startAutoRefresh} for more details.
   */
  async stopAutoRefresh() {
    this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
  }
  /**
   * Runs the auto refresh token tick.
   */
  async _autoRefreshTokenTick() {
    this._debug("#_autoRefreshTokenTick()", "begin");
    try {
      await this._acquireLock(0, async () => {
        try {
          const e = Date.now();
          try {
            return await this._useSession(async (t) => {
              const { data: { session: r } } = t;
              if (!r || !r.refresh_token || !r.expires_at) {
                this._debug("#_autoRefreshTokenTick()", "no session");
                return;
              }
              const s = Math.floor((r.expires_at * 1e3 - e) / Me);
              this._debug("#_autoRefreshTokenTick()", `access token expires in ${s} ticks, a tick lasts ${Me}ms, refresh threshold is ${Pt} ticks`), s <= Pt && await this._callRefreshToken(r.refresh_token);
            });
          } catch (t) {
            console.error("Auto refresh tick failed with error. This is likely a transient error.", t);
          }
        } finally {
          this._debug("#_autoRefreshTokenTick()", "end");
        }
      });
    } catch (e) {
      if (e.isAcquireTimeout || e instanceof zr)
        this._debug("auto refresh token tick lock not available");
      else
        throw e;
    }
  }
  /**
   * Registers callbacks on the browser / platform, which in-turn run
   * algorithms when the browser window/tab are in foreground. On non-browser
   * platforms it assumes always foreground.
   */
  async _handleVisibilityChange() {
    if (this._debug("#_handleVisibilityChange()"), !ee() || !(window != null && window.addEventListener))
      return this.autoRefreshToken && this.startAutoRefresh(), !1;
    try {
      this.visibilityChangedCallback = async () => await this._onVisibilityChanged(!1), window == null || window.addEventListener("visibilitychange", this.visibilityChangedCallback), await this._onVisibilityChanged(!0);
    } catch (e) {
      console.error("_handleVisibilityChange", e);
    }
  }
  /**
   * Callback registered with `window.addEventListener('visibilitychange')`.
   */
  async _onVisibilityChanged(e) {
    const t = `#_onVisibilityChanged(${e})`;
    this._debug(t, "visibilityState", document.visibilityState), document.visibilityState === "visible" ? (this.autoRefreshToken && this._startAutoRefresh(), e || (await this.initializePromise, await this._acquireLock(-1, async () => {
      if (document.visibilityState !== "visible") {
        this._debug(t, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
        return;
      }
      await this._recoverAndRefresh();
    }))) : document.visibilityState === "hidden" && this.autoRefreshToken && this._stopAutoRefresh();
  }
  /**
   * Generates the relevant login URL for a third-party provider.
   * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param options.scopes A space-separated list of scopes granted to the OAuth application.
   * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
   */
  async _getUrlForProvider(e, t, r) {
    const s = [`provider=${encodeURIComponent(t)}`];
    if (r != null && r.redirectTo && s.push(`redirect_to=${encodeURIComponent(r.redirectTo)}`), r != null && r.scopes && s.push(`scopes=${encodeURIComponent(r.scopes)}`), this.flowType === "pkce") {
      const [i, o] = await Le(this.storage, this.storageKey), a = new URLSearchParams({
        code_challenge: `${encodeURIComponent(i)}`,
        code_challenge_method: `${encodeURIComponent(o)}`
      });
      s.push(a.toString());
    }
    if (r != null && r.queryParams) {
      const i = new URLSearchParams(r.queryParams);
      s.push(i.toString());
    }
    return r != null && r.skipBrowserRedirect && s.push(`skip_http_redirect=${r.skipBrowserRedirect}`), `${e}?${s.join("&")}`;
  }
  async _unenroll(e) {
    try {
      return await this._useSession(async (t) => {
        var r;
        const { data: s, error: i } = t;
        return i ? { data: null, error: i } : await R(this.fetch, "DELETE", `${this.url}/factors/${e.factorId}`, {
          headers: this.headers,
          jwt: (r = s == null ? void 0 : s.session) === null || r === void 0 ? void 0 : r.access_token
        });
      });
    } catch (t) {
      if ($(t))
        return { data: null, error: t };
      throw t;
    }
  }
  async _enroll(e) {
    try {
      return await this._useSession(async (t) => {
        var r, s;
        const { data: i, error: o } = t;
        if (o)
          return { data: null, error: o };
        const a = Object.assign({ friendly_name: e.friendlyName, factor_type: e.factorType }, e.factorType === "phone" ? { phone: e.phone } : { issuer: e.issuer }), { data: l, error: c } = await R(this.fetch, "POST", `${this.url}/factors`, {
          body: a,
          headers: this.headers,
          jwt: (r = i == null ? void 0 : i.session) === null || r === void 0 ? void 0 : r.access_token
        });
        return c ? { data: null, error: c } : (e.factorType === "totp" && (!((s = l == null ? void 0 : l.totp) === null || s === void 0) && s.qr_code) && (l.totp.qr_code = `data:image/svg+xml;utf-8,${l.totp.qr_code}`), { data: l, error: null });
      });
    } catch (t) {
      if ($(t))
        return { data: null, error: t };
      throw t;
    }
  }
  /**
   * {@see GoTrueMFAApi#verify}
   */
  async _verify(e) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t) => {
          var r;
          const { data: s, error: i } = t;
          if (i)
            return { data: null, error: i };
          const { data: o, error: a } = await R(this.fetch, "POST", `${this.url}/factors/${e.factorId}/verify`, {
            body: { code: e.code, challenge_id: e.challengeId },
            headers: this.headers,
            jwt: (r = s == null ? void 0 : s.session) === null || r === void 0 ? void 0 : r.access_token
          });
          return a ? { data: null, error: a } : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + o.expires_in }, o)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", o), { data: o, error: a });
        });
      } catch (t) {
        if ($(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * {@see GoTrueMFAApi#challenge}
   */
  async _challenge(e) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t) => {
          var r;
          const { data: s, error: i } = t;
          return i ? { data: null, error: i } : await R(this.fetch, "POST", `${this.url}/factors/${e.factorId}/challenge`, {
            body: { channel: e.channel },
            headers: this.headers,
            jwt: (r = s == null ? void 0 : s.session) === null || r === void 0 ? void 0 : r.access_token
          });
        });
      } catch (t) {
        if ($(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * {@see GoTrueMFAApi#challengeAndVerify}
   */
  async _challengeAndVerify(e) {
    const { data: t, error: r } = await this._challenge({
      factorId: e.factorId
    });
    return r ? { data: null, error: r } : await this._verify({
      factorId: e.factorId,
      challengeId: t.id,
      code: e.code
    });
  }
  /**
   * {@see GoTrueMFAApi#listFactors}
   */
  async _listFactors() {
    const { data: { user: e }, error: t } = await this.getUser();
    if (t)
      return { data: null, error: t };
    const r = (e == null ? void 0 : e.factors) || [], s = r.filter((o) => o.factor_type === "totp" && o.status === "verified"), i = r.filter((o) => o.factor_type === "phone" && o.status === "verified");
    return {
      data: {
        all: r,
        totp: s,
        phone: i
      },
      error: null
    };
  }
  /**
   * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
   */
  async _getAuthenticatorAssuranceLevel() {
    return this._acquireLock(-1, async () => await this._useSession(async (e) => {
      var t, r;
      const { data: { session: s }, error: i } = e;
      if (i)
        return { data: null, error: i };
      if (!s)
        return {
          data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
          error: null
        };
      const { payload: o } = yt(s.access_token);
      let a = null;
      o.aal && (a = o.aal);
      let l = a;
      ((r = (t = s.user.factors) === null || t === void 0 ? void 0 : t.filter((d) => d.status === "verified")) !== null && r !== void 0 ? r : []).length > 0 && (l = "aal2");
      const u = o.amr || [];
      return { data: { currentLevel: a, nextLevel: l, currentAuthenticationMethods: u }, error: null };
    }));
  }
  async fetchJwk(e, t = { keys: [] }) {
    let r = t.keys.find((a) => a.kid === e);
    if (r)
      return r;
    const s = Date.now();
    if (r = this.jwks.keys.find((a) => a.kid === e), r && this.jwks_cached_at + mn > s)
      return r;
    const { data: i, error: o } = await R(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, {
      headers: this.headers
    });
    if (o)
      throw o;
    return !i.keys || i.keys.length === 0 || (this.jwks = i, this.jwks_cached_at = s, r = i.keys.find((a) => a.kid === e), !r) ? null : r;
  }
  /**
   * Extracts the JWT claims present in the access token by first verifying the
   * JWT against the server's JSON Web Key Set endpoint
   * `/.well-known/jwks.json` which is often cached, resulting in significantly
   * faster responses. Prefer this method over {@link #getUser} which always
   * sends a request to the Auth server for each JWT.
   *
   * If the project is not using an asymmetric JWT signing key (like ECC or
   * RSA) it always sends a request to the Auth server (similar to {@link
   * #getUser}) to verify the JWT.
   *
   * @param jwt An optional specific JWT you wish to verify, not the one you
   *            can obtain from {@link #getSession}.
   * @param options Various additional options that allow you to customize the
   *                behavior of this method.
   */
  async getClaims(e, t = {}) {
    try {
      let r = e;
      if (!r) {
        const { data: g, error: m } = await this.getSession();
        if (m || !g.session)
          return { data: null, error: m };
        r = g.session.access_token;
      }
      const { header: s, payload: i, signature: o, raw: { header: a, payload: l } } = yt(r);
      t != null && t.allowExpired || Mn(i.exp);
      const c = !s.alg || s.alg.startsWith("HS") || !s.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(s.kid, t != null && t.keys ? { keys: t.keys } : t == null ? void 0 : t.jwks);
      if (!c) {
        const { error: g } = await this.getUser(r);
        if (g)
          throw g;
        return {
          data: {
            claims: i,
            header: s,
            signature: o
          },
          error: null
        };
      }
      const u = Fn(s.alg), d = await crypto.subtle.importKey("jwk", c, u, !0, [
        "verify"
      ]);
      if (!await crypto.subtle.verify(u, d, o, Cn(`${a}.${l}`)))
        throw new Lt("Invalid JWT signature");
      return {
        data: {
          claims: i,
          header: s,
          signature: o
        },
        error: null
      };
    } catch (r) {
      if ($(r))
        return { data: null, error: r };
      throw r;
    }
  }
}
tt.nextInstanceID = 0;
const oi = tt;
class ai extends oi {
  constructor(e) {
    super(e);
  }
}
var li = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function a(u) {
      try {
        c(r.next(u));
      } catch (d) {
        o(d);
      }
    }
    function l(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        o(d);
      }
    }
    function c(u) {
      u.done ? i(u.value) : s(u.value).then(a, l);
    }
    c((r = r.apply(n, [])).next());
  });
};
class ci {
  /**
   * Create a new client for use in the browser.
   * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
   * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
   * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
   * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
   * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
   * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
   * @param options.realtime Options passed along to realtime-js constructor.
   * @param options.storage Options passed along to the storage-js constructor.
   * @param options.global.fetch A custom fetch implementation.
   * @param options.global.headers Any additional headers to send with each network request.
   */
  constructor(e, t, r) {
    var s, i, o;
    this.supabaseUrl = e, this.supabaseKey = t;
    const a = dn(e);
    if (!t)
      throw new Error("supabaseKey is required.");
    this.realtimeUrl = new URL("realtime/v1", a), this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws"), this.authUrl = new URL("auth/v1", a), this.storageUrl = new URL("storage/v1", a), this.functionsUrl = new URL("functions/v1", a);
    const l = `sb-${a.hostname.split(".")[0]}-auth-token`, c = {
      db: en,
      realtime: rn,
      auth: Object.assign(Object.assign({}, tn), { storageKey: l }),
      global: Xs
    }, u = un(r ?? {}, c);
    this.storageKey = (s = u.auth.storageKey) !== null && s !== void 0 ? s : "", this.headers = (i = u.global.headers) !== null && i !== void 0 ? i : {}, u.accessToken ? (this.accessToken = u.accessToken, this.auth = new Proxy({}, {
      get: (d, h) => {
        throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(h)} is not possible`);
      }
    })) : this.auth = this._initSupabaseAuthClient((o = u.auth) !== null && o !== void 0 ? o : {}, this.headers, u.global.fetch), this.fetch = an(t, this._getAccessToken.bind(this), u.global.fetch), this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, u.realtime)), this.rest = new ms(new URL("rest/v1", a).href, {
      headers: this.headers,
      schema: u.db.schema,
      fetch: this.fetch
    }), this.storage = new Ys(this.storageUrl.href, this.headers, this.fetch, r == null ? void 0 : r.storage), u.accessToken || this._listenForAuthEvents();
  }
  /**
   * Supabase Functions allows you to deploy and invoke edge functions.
   */
  get functions() {
    return new os(this.functionsUrl.href, {
      headers: this.headers,
      customFetch: this.fetch
    });
  }
  /**
   * Perform a query on a table or a view.
   *
   * @param relation - The table or view name to query
   */
  from(e) {
    return this.rest.from(e);
  }
  // NOTE: signatures must be kept in sync with PostgrestClient.schema
  /**
   * Select a schema to query or perform an function (rpc) call.
   *
   * The schema needs to be on the list of exposed schemas inside Supabase.
   *
   * @param schema - The schema to query
   */
  schema(e) {
    return this.rest.schema(e);
  }
  // NOTE: signatures must be kept in sync with PostgrestClient.rpc
  /**
   * Perform a function call.
   *
   * @param fn - The function name to call
   * @param args - The arguments to pass to the function call
   * @param options - Named parameters
   * @param options.head - When set to `true`, `data` will not be returned.
   * Useful if you only need the count.
   * @param options.get - When set to `true`, the function will be called with
   * read-only access mode.
   * @param options.count - Count algorithm to use to count rows returned by the
   * function. Only applicable for [set-returning
   * functions](https://www.postgresql.org/docs/current/functions-srf.html).
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  rpc(e, t = {}, r = {}) {
    return this.rest.rpc(e, t, r);
  }
  /**
   * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
   *
   * @param {string} name - The name of the Realtime channel.
   * @param {Object} opts - The options to pass to the Realtime channel.
   *
   */
  channel(e, t = { config: {} }) {
    return this.realtime.channel(e, t);
  }
  /**
   * Returns all Realtime channels.
   */
  getChannels() {
    return this.realtime.getChannels();
  }
  /**
   * Unsubscribes and removes Realtime channel from Realtime client.
   *
   * @param {RealtimeChannel} channel - The name of the Realtime channel.
   *
   */
  removeChannel(e) {
    return this.realtime.removeChannel(e);
  }
  /**
   * Unsubscribes and removes all Realtime channels from Realtime client.
   */
  removeAllChannels() {
    return this.realtime.removeAllChannels();
  }
  _getAccessToken() {
    var e, t;
    return li(this, void 0, void 0, function* () {
      if (this.accessToken)
        return yield this.accessToken();
      const { data: r } = yield this.auth.getSession();
      return (t = (e = r.session) === null || e === void 0 ? void 0 : e.access_token) !== null && t !== void 0 ? t : this.supabaseKey;
    });
  }
  _initSupabaseAuthClient({ autoRefreshToken: e, persistSession: t, detectSessionInUrl: r, storage: s, userStorage: i, storageKey: o, flowType: a, lock: l, debug: c }, u, d) {
    const h = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new ai({
      url: this.authUrl.href,
      headers: Object.assign(Object.assign({}, h), u),
      storageKey: o,
      autoRefreshToken: e,
      persistSession: t,
      detectSessionInUrl: r,
      storage: s,
      userStorage: i,
      flowType: a,
      lock: l,
      debug: c,
      fetch: d,
      // auth checks if there is a custom authorizaiton header using this flag
      // so it knows whether to return an error when getUser is called with no session
      hasCustomAuthorizationHeader: Object.keys(this.headers).some((g) => g.toLowerCase() === "authorization")
    });
  }
  _initRealtimeClient(e) {
    return new Rs(this.realtimeUrl.href, Object.assign(Object.assign({}, e), { params: Object.assign({ apikey: this.supabaseKey }, e == null ? void 0 : e.params) }));
  }
  _listenForAuthEvents() {
    return this.auth.onAuthStateChange((t, r) => {
      this._handleTokenChanged(t, "CLIENT", r == null ? void 0 : r.access_token);
    });
  }
  _handleTokenChanged(e, t, r) {
    (e === "TOKEN_REFRESHED" || e === "SIGNED_IN") && this.changedAccessToken !== r ? (this.changedAccessToken = r, this.realtime.setAuth(r)) : e === "SIGNED_OUT" && (this.realtime.setAuth(), t == "STORAGE" && this.auth.signOut(), this.changedAccessToken = void 0);
  }
}
const ui = (n, e, t) => new ci(n, e, t);
function di() {
  if (typeof window < "u" || typeof process > "u")
    return !1;
  const n = process.version;
  if (n == null)
    return !1;
  const e = n.match(/^v(\d+)\./);
  return e ? parseInt(e[1], 10) <= 18 : !1;
}
di() && console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");
var _r, U = "colors", Z = "sizes", T = "space", hi = { gap: T, gridGap: T, columnGap: T, gridColumnGap: T, rowGap: T, gridRowGap: T, inset: T, insetBlock: T, insetBlockEnd: T, insetBlockStart: T, insetInline: T, insetInlineEnd: T, insetInlineStart: T, margin: T, marginTop: T, marginRight: T, marginBottom: T, marginLeft: T, marginBlock: T, marginBlockEnd: T, marginBlockStart: T, marginInline: T, marginInlineEnd: T, marginInlineStart: T, padding: T, paddingTop: T, paddingRight: T, paddingBottom: T, paddingLeft: T, paddingBlock: T, paddingBlockEnd: T, paddingBlockStart: T, paddingInline: T, paddingInlineEnd: T, paddingInlineStart: T, top: T, right: T, bottom: T, left: T, scrollMargin: T, scrollMarginTop: T, scrollMarginRight: T, scrollMarginBottom: T, scrollMarginLeft: T, scrollMarginX: T, scrollMarginY: T, scrollMarginBlock: T, scrollMarginBlockEnd: T, scrollMarginBlockStart: T, scrollMarginInline: T, scrollMarginInlineEnd: T, scrollMarginInlineStart: T, scrollPadding: T, scrollPaddingTop: T, scrollPaddingRight: T, scrollPaddingBottom: T, scrollPaddingLeft: T, scrollPaddingX: T, scrollPaddingY: T, scrollPaddingBlock: T, scrollPaddingBlockEnd: T, scrollPaddingBlockStart: T, scrollPaddingInline: T, scrollPaddingInlineEnd: T, scrollPaddingInlineStart: T, fontSize: "fontSizes", background: U, backgroundColor: U, backgroundImage: U, borderImage: U, border: U, borderBlock: U, borderBlockEnd: U, borderBlockStart: U, borderBottom: U, borderBottomColor: U, borderColor: U, borderInline: U, borderInlineEnd: U, borderInlineStart: U, borderLeft: U, borderLeftColor: U, borderRight: U, borderRightColor: U, borderTop: U, borderTopColor: U, caretColor: U, color: U, columnRuleColor: U, fill: U, outline: U, outlineColor: U, stroke: U, textDecorationColor: U, fontFamily: "fonts", fontWeight: "fontWeights", lineHeight: "lineHeights", letterSpacing: "letterSpacings", blockSize: Z, minBlockSize: Z, maxBlockSize: Z, inlineSize: Z, minInlineSize: Z, maxInlineSize: Z, width: Z, minWidth: Z, maxWidth: Z, height: Z, minHeight: Z, maxHeight: Z, flexBasis: Z, gridTemplateColumns: Z, gridTemplateRows: Z, borderWidth: "borderWidths", borderTopWidth: "borderWidths", borderRightWidth: "borderWidths", borderBottomWidth: "borderWidths", borderLeftWidth: "borderWidths", borderStyle: "borderStyles", borderTopStyle: "borderStyles", borderRightStyle: "borderStyles", borderBottomStyle: "borderStyles", borderLeftStyle: "borderStyles", borderRadius: "radii", borderTopLeftRadius: "radii", borderTopRightRadius: "radii", borderBottomRightRadius: "radii", borderBottomLeftRadius: "radii", boxShadow: "shadows", textShadow: "shadows", transition: "transitions", zIndex: "zIndices" }, fi = (n, e) => typeof e == "function" ? { "()": Function.prototype.toString.call(e) } : e, st = () => {
  const n = /* @__PURE__ */ Object.create(null);
  return (e, t, ...r) => {
    const s = ((i) => JSON.stringify(i, fi))(e);
    return s in n ? n[s] : n[s] = t(e, ...r);
  };
}, ct = Symbol.for("sxs.internal"), zt = (n, e) => Object.defineProperties(n, Object.getOwnPropertyDescriptors(e)), wr = (n) => {
  for (const e in n) return !0;
  return !1;
}, { hasOwnProperty: pi } = Object.prototype, Bt = (n) => n.includes("-") ? n : n.replace(/[A-Z]/g, (e) => "-" + e.toLowerCase()), gi = /\s+(?![^()]*\))/, De = (n) => (e) => n(...typeof e == "string" ? String(e).split(gi) : [e]), yr = { appearance: (n) => ({ WebkitAppearance: n, appearance: n }), backfaceVisibility: (n) => ({ WebkitBackfaceVisibility: n, backfaceVisibility: n }), backdropFilter: (n) => ({ WebkitBackdropFilter: n, backdropFilter: n }), backgroundClip: (n) => ({ WebkitBackgroundClip: n, backgroundClip: n }), boxDecorationBreak: (n) => ({ WebkitBoxDecorationBreak: n, boxDecorationBreak: n }), clipPath: (n) => ({ WebkitClipPath: n, clipPath: n }), content: (n) => ({ content: n.includes('"') || n.includes("'") || /^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(n) ? n : `"${n}"` }), hyphens: (n) => ({ WebkitHyphens: n, hyphens: n }), maskImage: (n) => ({ WebkitMaskImage: n, maskImage: n }), maskSize: (n) => ({ WebkitMaskSize: n, maskSize: n }), tabSize: (n) => ({ MozTabSize: n, tabSize: n }), textSizeAdjust: (n) => ({ WebkitTextSizeAdjust: n, textSizeAdjust: n }), userSelect: (n) => ({ WebkitUserSelect: n, userSelect: n }), marginBlock: De((n, e) => ({ marginBlockStart: n, marginBlockEnd: e || n })), marginInline: De((n, e) => ({ marginInlineStart: n, marginInlineEnd: e || n })), maxSize: De((n, e) => ({ maxBlockSize: n, maxInlineSize: e || n })), minSize: De((n, e) => ({ minBlockSize: n, minInlineSize: e || n })), paddingBlock: De((n, e) => ({ paddingBlockStart: n, paddingBlockEnd: e || n })), paddingInline: De((n, e) => ({ paddingInlineStart: n, paddingInlineEnd: e || n })) }, kt = /([\d.]+)([^]*)/, mi = (n, e) => n.length ? n.reduce((t, r) => (t.push(...e.map((s) => s.includes("&") ? s.replace(/&/g, /[ +>|~]/.test(r) && /&.*&/.test(s) ? `:is(${r})` : r) : r + " " + s)), t), []) : e, vi = (n, e) => n in _i && typeof e == "string" ? e.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/, (t, r, s, i) => r + (s === "stretch" ? `-moz-available${i};${Bt(n)}:${r}-webkit-fill-available` : `-moz-fit-content${i};${Bt(n)}:${r}fit-content`) + i) : String(e), _i = { blockSize: 1, height: 1, inlineSize: 1, maxBlockSize: 1, maxHeight: 1, maxInlineSize: 1, maxWidth: 1, minBlockSize: 1, minHeight: 1, minInlineSize: 1, minWidth: 1, width: 1 }, de = (n) => n ? n + "-" : "", Hr = (n, e, t) => n.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g, (r, s, i, o, a) => o == "$" == !!i ? r : (s || o == "--" ? "calc(" : "") + "var(--" + (o === "$" ? de(e) + (a.includes("$") ? "" : de(t)) + a.replace(/\$/g, "-") : a) + ")" + (s || o == "--" ? "*" + (s || "") + (i || "1") + ")" : "")), wi = /\s*,\s*(?![^()]*\))/, yi = Object.prototype.toString, We = (n, e, t, r, s) => {
  let i, o, a;
  const l = (c, u, d) => {
    let h, g;
    const m = (w) => {
      for (h in w) {
        const _ = h.charCodeAt(0) === 64, b = _ && Array.isArray(w[h]) ? w[h] : [w[h]];
        for (g of b) {
          const k = /[A-Z]/.test(y = h) ? y : y.replace(/-[^]/g, (C) => C[1].toUpperCase()), E = typeof g == "object" && g && g.toString === yi && (!r.utils[k] || !u.length);
          if (k in r.utils && !E) {
            const C = r.utils[k];
            if (C !== o) {
              o = C, m(C(g)), o = null;
              continue;
            }
          } else if (k in yr) {
            const C = yr[k];
            if (C !== a) {
              a = C, m(C(g)), a = null;
              continue;
            }
          }
          if (_ && (v = h.slice(1) in r.media ? "@media " + r.media[h.slice(1)] : h, h = v.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g, (C, x, B, N, M, F) => {
            const X = kt.test(x), ae = 0.0625 * (X ? -1 : 1), [le, W] = X ? [N, x] : [x, N];
            return "(" + (B[0] === "=" ? "" : B[0] === ">" === X ? "max-" : "min-") + le + ":" + (B[0] !== "=" && B.length === 1 ? W.replace(kt, (z, fe, ce) => Number(fe) + ae * (B === ">" ? 1 : -1) + ce) : W) + (M ? ") and (" + (M[0] === ">" ? "min-" : "max-") + le + ":" + (M.length === 1 ? F.replace(kt, (z, fe, ce) => Number(fe) + ae * (M === ">" ? -1 : 1) + ce) : F) : "") + ")";
          })), E) {
            const C = _ ? d.concat(h) : [...d], x = _ ? [...u] : mi(u, h.split(wi));
            i !== void 0 && s(br(...i)), i = void 0, l(g, x, C);
          } else i === void 0 && (i = [[], u, d]), h = _ || h.charCodeAt(0) !== 36 ? h : `--${de(r.prefix)}${h.slice(1).replace(/\$/g, "-")}`, g = E ? g : typeof g == "number" ? g && k in bi ? String(g) + "px" : String(g) : Hr(vi(k, g ?? ""), r.prefix, r.themeMap[k]), i[0].push(`${_ ? `${h} ` : `${Bt(h)}:`}${g}`);
        }
      }
      var v, y;
    };
    m(c), i !== void 0 && s(br(...i)), i = void 0;
  };
  l(n, e, t);
}, br = (n, e, t) => `${t.map((r) => `${r}{`).join("")}${e.length ? `${e.join(",")}{` : ""}${n.join(";")}${e.length ? "}" : ""}${Array(t.length ? t.length + 1 : 0).join("}")}`, bi = { animationDelay: 1, animationDuration: 1, backgroundSize: 1, blockSize: 1, border: 1, borderBlock: 1, borderBlockEnd: 1, borderBlockEndWidth: 1, borderBlockStart: 1, borderBlockStartWidth: 1, borderBlockWidth: 1, borderBottom: 1, borderBottomLeftRadius: 1, borderBottomRightRadius: 1, borderBottomWidth: 1, borderEndEndRadius: 1, borderEndStartRadius: 1, borderInlineEnd: 1, borderInlineEndWidth: 1, borderInlineStart: 1, borderInlineStartWidth: 1, borderInlineWidth: 1, borderLeft: 1, borderLeftWidth: 1, borderRadius: 1, borderRight: 1, borderRightWidth: 1, borderSpacing: 1, borderStartEndRadius: 1, borderStartStartRadius: 1, borderTop: 1, borderTopLeftRadius: 1, borderTopRightRadius: 1, borderTopWidth: 1, borderWidth: 1, bottom: 1, columnGap: 1, columnRule: 1, columnRuleWidth: 1, columnWidth: 1, containIntrinsicSize: 1, flexBasis: 1, fontSize: 1, gap: 1, gridAutoColumns: 1, gridAutoRows: 1, gridTemplateColumns: 1, gridTemplateRows: 1, height: 1, inlineSize: 1, inset: 1, insetBlock: 1, insetBlockEnd: 1, insetBlockStart: 1, insetInline: 1, insetInlineEnd: 1, insetInlineStart: 1, left: 1, letterSpacing: 1, margin: 1, marginBlock: 1, marginBlockEnd: 1, marginBlockStart: 1, marginBottom: 1, marginInline: 1, marginInlineEnd: 1, marginInlineStart: 1, marginLeft: 1, marginRight: 1, marginTop: 1, maxBlockSize: 1, maxHeight: 1, maxInlineSize: 1, maxWidth: 1, minBlockSize: 1, minHeight: 1, minInlineSize: 1, minWidth: 1, offsetDistance: 1, offsetRotate: 1, outline: 1, outlineOffset: 1, outlineWidth: 1, overflowClipMargin: 1, padding: 1, paddingBlock: 1, paddingBlockEnd: 1, paddingBlockStart: 1, paddingBottom: 1, paddingInline: 1, paddingInlineEnd: 1, paddingInlineStart: 1, paddingLeft: 1, paddingRight: 1, paddingTop: 1, perspective: 1, right: 1, rowGap: 1, scrollMargin: 1, scrollMarginBlock: 1, scrollMarginBlockEnd: 1, scrollMarginBlockStart: 1, scrollMarginBottom: 1, scrollMarginInline: 1, scrollMarginInlineEnd: 1, scrollMarginInlineStart: 1, scrollMarginLeft: 1, scrollMarginRight: 1, scrollMarginTop: 1, scrollPadding: 1, scrollPaddingBlock: 1, scrollPaddingBlockEnd: 1, scrollPaddingBlockStart: 1, scrollPaddingBottom: 1, scrollPaddingInline: 1, scrollPaddingInlineEnd: 1, scrollPaddingInlineStart: 1, scrollPaddingLeft: 1, scrollPaddingRight: 1, scrollPaddingTop: 1, shapeMargin: 1, textDecoration: 1, textDecorationThickness: 1, textIndent: 1, textUnderlineOffset: 1, top: 1, transitionDelay: 1, transitionDuration: 1, verticalAlign: 1, width: 1, wordSpacing: 1 }, Sr = (n) => String.fromCharCode(n + (n > 25 ? 39 : 97)), Ce = (n) => ((e) => {
  let t, r = "";
  for (t = Math.abs(e); t > 52; t = t / 52 | 0) r = Sr(t % 52) + r;
  return Sr(t % 52) + r;
})(((e, t) => {
  let r = t.length;
  for (; r; ) e = 33 * e ^ t.charCodeAt(--r);
  return e;
})(5381, JSON.stringify(n)) >>> 0), Ze = ["themed", "global", "styled", "onevar", "resonevar", "allvar", "inline"], Si = (n) => {
  if (n.href && !n.href.startsWith(location.origin)) return !1;
  try {
    return !!n.cssRules;
  } catch {
    return !1;
  }
}, ki = (n) => {
  let e;
  const t = () => {
    const { cssRules: s } = e.sheet;
    return [].map.call(s, (i, o) => {
      const { cssText: a } = i;
      let l = "";
      if (a.startsWith("--sxs")) return "";
      if (s[o - 1] && (l = s[o - 1].cssText).startsWith("--sxs")) {
        if (!i.cssRules.length) return "";
        for (const c in e.rules) if (e.rules[c].group === i) return `--sxs{--sxs:${[...e.rules[c].cache].join(" ")}}${a}`;
        return i.cssRules.length ? `${l}${a}` : "";
      }
      return a;
    }).join("");
  }, r = () => {
    if (e) {
      const { rules: a, sheet: l } = e;
      if (!l.deleteRule) {
        for (; Object(Object(l.cssRules)[0]).type === 3; ) l.cssRules.splice(0, 1);
        l.cssRules = [];
      }
      for (const c in a) delete a[c];
    }
    const s = Object(n).styleSheets || [];
    for (const a of s) if (Si(a)) {
      for (let l = 0, c = a.cssRules; c[l]; ++l) {
        const u = Object(c[l]);
        if (u.type !== 1) continue;
        const d = Object(c[l + 1]);
        if (d.type !== 4) continue;
        ++l;
        const { cssText: h } = u;
        if (!h.startsWith("--sxs")) continue;
        const g = h.slice(14, -3).trim().split(/\s+/), m = Ze[g[0]];
        m && (e || (e = { sheet: a, reset: r, rules: {}, toString: t }), e.rules[m] = { group: d, index: l, cache: new Set(g) });
      }
      if (e) break;
    }
    if (!e) {
      const a = (l, c) => ({ type: c, cssRules: [], insertRule(u, d) {
        this.cssRules.splice(d, 0, a(u, { import: 3, undefined: 1 }[(u.toLowerCase().match(/^@([a-z]+)/) || [])[1]] || 4));
      }, get cssText() {
        return l === "@media{}" ? `@media{${[].map.call(this.cssRules, (u) => u.cssText).join("")}}` : l;
      } });
      e = { sheet: n ? (n.head || n).appendChild(document.createElement("style")).sheet : a("", "text/css"), rules: {}, reset: r, toString: t };
    }
    const { sheet: i, rules: o } = e;
    for (let a = Ze.length - 1; a >= 0; --a) {
      const l = Ze[a];
      if (!o[l]) {
        const c = Ze[a + 1], u = o[c] ? o[c].index : i.cssRules.length;
        i.insertRule("@media{}", u), i.insertRule(`--sxs{--sxs:${a}}`, u), o[l] = { group: i.cssRules[u + 1], index: u, cache: /* @__PURE__ */ new Set([a]) };
      }
      Ei(o[l]);
    }
  };
  return r(), e;
}, Ei = (n) => {
  const e = n.group;
  let t = e.cssRules.length;
  n.apply = (r) => {
    try {
      e.insertRule(r, t), ++t;
    } catch {
    }
  };
}, Je = Symbol(), Ti = st(), Ci = (n, e) => Ti(n, () => (...t) => {
  let r = { type: null, composers: /* @__PURE__ */ new Set() };
  for (const s of t) if (s != null) if (s[ct]) {
    r.type == null && (r.type = s[ct].type);
    for (const i of s[ct].composers) r.composers.add(i);
  } else s.constructor !== Object || s.$$typeof ? r.type == null && (r.type = s) : r.composers.add(xi(s, n));
  return r.type == null && (r.type = "span"), r.composers.size || r.composers.add(["PJLV", {}, [], [], {}, []]), ji(n, r, e);
}), xi = ({ variants: n, compoundVariants: e, defaultVariants: t, ...r }, s) => {
  const i = `${de(s.prefix)}c-${Ce(r)}`, o = [], a = [], l = /* @__PURE__ */ Object.create(null), c = [];
  for (const h in t) l[h] = String(t[h]);
  if (typeof n == "object" && n) for (const h in n) {
    u = l, d = h, pi.call(u, d) || (l[h] = "undefined");
    const g = n[h];
    for (const m in g) {
      const w = { [h]: String(m) };
      String(m) === "undefined" && c.push(h);
      const v = g[m], y = [w, v, !wr(v)];
      o.push(y);
    }
  }
  var u, d;
  if (typeof e == "object" && e) for (const h of e) {
    let { css: g, ...m } = h;
    g = typeof g == "object" && g || {};
    for (const v in m) m[v] = String(m[v]);
    const w = [m, g, !wr(g)];
    a.push(w);
  }
  return [i, r, o, a, l, c];
}, ji = (n, e, t) => {
  const [r, s, i, o] = $i(e.composers), a = typeof e.type == "function" || e.type.$$typeof ? ((d) => {
    function h() {
      for (let g = 0; g < h[Je].length; g++) {
        const [m, w] = h[Je][g];
        d.rules[m].apply(w);
      }
      return h[Je] = [], null;
    }
    return h[Je] = [], h.rules = {}, Ze.forEach((g) => h.rules[g] = { apply: (m) => h[Je].push([g, m]) }), h;
  })(t) : null, l = (a || t).rules, c = `.${r}${s.length > 1 ? `:where(.${s.slice(1).join(".")})` : ""}`, u = (d) => {
    d = typeof d == "object" && d || Ai;
    const { css: h, ...g } = d, m = {};
    for (const y in i) if (delete g[y], y in d) {
      let _ = d[y];
      typeof _ == "object" && _ ? m[y] = { "@initial": i[y], ..._ } : (_ = String(_), m[y] = _ !== "undefined" || o.has(y) ? _ : i[y]);
    } else m[y] = i[y];
    const w = /* @__PURE__ */ new Set([...s]);
    for (const [y, _, b, k] of e.composers) {
      t.rules.styled.cache.has(y) || (t.rules.styled.cache.add(y), We(_, [`.${y}`], [], n, (x) => {
        l.styled.apply(x);
      }));
      const E = kr(b, m, n.media), C = kr(k, m, n.media, !0);
      for (const x of E) if (x !== void 0) for (const [B, N, M] of x) {
        const F = `${y}-${Ce(N)}-${B}`;
        w.add(F);
        const X = (M ? t.rules.resonevar : t.rules.onevar).cache, ae = M ? l.resonevar : l.onevar;
        X.has(F) || (X.add(F), We(N, [`.${F}`], [], n, (le) => {
          ae.apply(le);
        }));
      }
      for (const x of C) if (x !== void 0) for (const [B, N] of x) {
        const M = `${y}-${Ce(N)}-${B}`;
        w.add(M), t.rules.allvar.cache.has(M) || (t.rules.allvar.cache.add(M), We(N, [`.${M}`], [], n, (F) => {
          l.allvar.apply(F);
        }));
      }
    }
    if (typeof h == "object" && h) {
      const y = `${r}-i${Ce(h)}-css`;
      w.add(y), t.rules.inline.cache.has(y) || (t.rules.inline.cache.add(y), We(h, [`.${y}`], [], n, (_) => {
        l.inline.apply(_);
      }));
    }
    for (const y of String(d.className || "").trim().split(/\s+/)) y && w.add(y);
    const v = g.className = [...w].join(" ");
    return { type: e.type, className: v, selector: c, props: g, toString: () => v, deferredInjector: a };
  };
  return zt(u, { className: r, selector: c, [ct]: e, toString: () => (t.rules.styled.cache.has(r) || u(), r) });
}, $i = (n) => {
  let e = "";
  const t = [], r = {}, s = [];
  for (const [i, , , , o, a] of n) {
    e === "" && (e = i), t.push(i), s.push(...a);
    for (const l in o) {
      const c = o[l];
      (r[l] === void 0 || c !== "undefined" || a.includes(c)) && (r[l] = c);
    }
  }
  return [e, t, r, new Set(s)];
}, kr = (n, e, t, r) => {
  const s = [];
  e: for (let [i, o, a] of n) {
    if (a) continue;
    let l, c = 0, u = !1;
    for (l in i) {
      const d = i[l];
      let h = e[l];
      if (h !== d) {
        if (typeof h != "object" || !h) continue e;
        {
          let g, m, w = 0;
          for (const v in h) {
            if (d === String(h[v])) {
              if (v !== "@initial") {
                const y = v.slice(1);
                (m = m || []).push(y in t ? t[y] : v.replace(/^@media ?/, "")), u = !0;
              }
              c += w, g = !0;
            }
            ++w;
          }
          if (m && m.length && (o = { ["@media " + m.join(", ")]: o }), !g) continue e;
        }
      }
    }
    (s[c] = s[c] || []).push([r ? "cv" : `${l}-${i[l]}`, o, u]);
  }
  return s;
}, Ai = {}, Oi = st(), Pi = (n, e) => Oi(n, () => (...t) => {
  const r = () => {
    for (let s of t) {
      s = typeof s == "object" && s || {};
      let i = Ce(s);
      if (!e.rules.global.cache.has(i)) {
        if (e.rules.global.cache.add(i), "@import" in s) {
          let o = [].indexOf.call(e.sheet.cssRules, e.rules.themed.group) - 1;
          for (let a of [].concat(s["@import"])) a = a.includes('"') || a.includes("'") ? a : `"${a}"`, e.sheet.insertRule(`@import ${a};`, o++);
          delete s["@import"];
        }
        We(s, [], [], n, (o) => {
          e.rules.global.apply(o);
        });
      }
    }
    return "";
  };
  return zt(r, { toString: r });
}), Ri = st(), Ii = (n, e) => Ri(n, () => (t) => {
  const r = `${de(n.prefix)}k-${Ce(t)}`, s = () => {
    if (!e.rules.global.cache.has(r)) {
      e.rules.global.cache.add(r);
      const i = [];
      We(t, [], [], n, (a) => i.push(a));
      const o = `@keyframes ${r}{${i.join("")}}`;
      e.rules.global.apply(o);
    }
    return r;
  };
  return zt(s, { get name() {
    return s();
  }, toString: s });
}), Li = class {
  constructor(e, t, r, s) {
    this.token = e == null ? "" : String(e), this.value = t == null ? "" : String(t), this.scale = r == null ? "" : String(r), this.prefix = s == null ? "" : String(s);
  }
  get computedValue() {
    return "var(" + this.variable + ")";
  }
  get variable() {
    return "--" + de(this.prefix) + de(this.scale) + this.token;
  }
  toString() {
    return this.computedValue;
  }
}, Bi = st(), Ui = (n, e) => Bi(n, () => (t, r) => {
  r = typeof t == "object" && t || Object(r);
  const s = `.${t = (t = typeof t == "string" ? t : "") || `${de(n.prefix)}t-${Ce(r)}`}`, i = {}, o = [];
  for (const l in r) {
    i[l] = {};
    for (const c in r[l]) {
      const u = `--${de(n.prefix)}${l}-${c}`, d = Hr(String(r[l][c]), n.prefix, l);
      i[l][c] = new Li(c, d, l, n.prefix), o.push(`${u}:${d}`);
    }
  }
  const a = () => {
    if (o.length && !e.rules.themed.cache.has(t)) {
      e.rules.themed.cache.add(t);
      const l = `${r === n.theme ? ":root," : ""}.${t}{${o.join(";")}}`;
      e.rules.themed.apply(l);
    }
    return t;
  };
  return { ...i, get className() {
    return a();
  }, selector: s, toString: a };
}), Ni = st(), Vr = (n) => {
  let e = !1;
  const t = Ni(n, (r) => {
    e = !0;
    const s = "prefix" in (r = typeof r == "object" && r || {}) ? String(r.prefix) : "", i = typeof r.media == "object" && r.media || {}, o = typeof r.root == "object" ? r.root || null : globalThis.document || null, a = typeof r.theme == "object" && r.theme || {}, l = { prefix: s, media: i, theme: a, themeMap: typeof r.themeMap == "object" && r.themeMap || { ...hi }, utils: typeof r.utils == "object" && r.utils || {} }, c = ki(o), u = { css: Ci(l, c), globalCss: Pi(l, c), keyframes: Ii(l, c), createTheme: Ui(l, c), reset() {
      c.reset(), u.theme.toString();
    }, theme: {}, sheet: c, config: l, prefix: s, getCssText: c.toString, toString: c.toString };
    return String(u.theme = u.createTheme(a)), u;
  });
  return e || t.reset(), t;
}, Gr = () => _r || (_r = Vr()), Di = (...n) => Gr().createTheme(...n), he = (...n) => Gr().css(...n), Mi = {
  default: {
    colors: {
      brand: "hsl(153 60.0% 53.0%)",
      brandAccent: "hsl(154 54.8% 45.1%)",
      brandButtonText: "white",
      defaultButtonBackground: "white",
      defaultButtonBackgroundHover: "#eaeaea",
      defaultButtonBorder: "lightgray",
      defaultButtonText: "gray",
      dividerBackground: "#eaeaea",
      inputBackground: "transparent",
      inputBorder: "lightgray",
      inputBorderHover: "gray",
      inputBorderFocus: "gray",
      inputText: "black",
      inputLabelText: "gray",
      inputPlaceholder: "darkgray",
      messageText: "#2b805a",
      messageBackground: "#e7fcf1",
      messageBorder: "#d0f3e1",
      messageTextDanger: "#ff6369",
      messageBackgroundDanger: "#fff8f8",
      messageBorderDanger: "#822025",
      anchorTextColor: "gray",
      anchorTextHoverColor: "darkgray"
    },
    space: {
      spaceSmall: "4px",
      spaceMedium: "8px",
      spaceLarge: "16px",
      labelBottomMargin: "8px",
      anchorBottomMargin: "4px",
      emailInputSpacing: "4px",
      socialAuthSpacing: "4px",
      buttonPadding: "10px 15px",
      inputPadding: "10px 15px"
    },
    fontSizes: {
      baseBodySize: "13px",
      baseInputSize: "14px",
      baseLabelSize: "14px",
      baseButtonSize: "14px"
    },
    fonts: {
      bodyFontFamily: "ui-sans-serif, sans-serif",
      buttonFontFamily: "ui-sans-serif, sans-serif",
      inputFontFamily: "ui-sans-serif, sans-serif",
      labelFontFamily: "ui-sans-serif, sans-serif"
    },
    // fontWeights: {},
    // lineHeights: {},
    // letterSpacings: {},
    // sizes: {},
    borderWidths: {
      buttonBorderWidth: "1px",
      inputBorderWidth: "1px"
    },
    // borderStyles: {},
    radii: {
      borderRadiusButton: "4px",
      buttonBorderRadius: "4px",
      inputBorderRadius: "4px"
    }
    // shadows: {},
    // zIndices: {},
    // transitions: {},
  },
  dark: {
    colors: {
      brandButtonText: "white",
      defaultButtonBackground: "#2e2e2e",
      defaultButtonBackgroundHover: "#3e3e3e",
      defaultButtonBorder: "#3e3e3e",
      defaultButtonText: "white",
      dividerBackground: "#2e2e2e",
      inputBackground: "#1e1e1e",
      inputBorder: "#3e3e3e",
      inputBorderHover: "gray",
      inputBorderFocus: "gray",
      inputText: "white",
      inputPlaceholder: "darkgray",
      messageText: "#85e0b7",
      messageBackground: "#072719",
      messageBorder: "#2b805a",
      messageBackgroundDanger: "#1f1315"
    }
  }
}, H = {
  SIGN_IN: "sign_in",
  SIGN_UP: "sign_up",
  FORGOTTEN_PASSWORD: "forgotten_password",
  MAGIC_LINK: "magic_link",
  UPDATE_PASSWORD: "update_password",
  VERIFY_OTP: "verify_otp"
}, Fi = "supabase-auth-ui", Wi = {
  // interfaces
  ROOT: "root",
  SIGN_IN: H.SIGN_IN,
  SIGN_UP: H.SIGN_UP,
  FORGOTTEN_PASSWORD: H.FORGOTTEN_PASSWORD,
  MAGIC_LINK: H.MAGIC_LINK,
  UPDATE_PASSWORD: H.UPDATE_PASSWORD,
  // ui
  anchor: "ui-anchor",
  button: "ui-button",
  container: "ui-container",
  divider: "ui-divider",
  input: "ui-input",
  label: "ui-label",
  loader: "ui-loader",
  message: "ui-message"
};
function je(n, e, t) {
  var r, s;
  const i = [], o = Wi[n];
  return i.push(
    t != null && t.prependedClassName ? (t == null ? void 0 : t.prependedClassName) + "_" + o : Fi + "_" + o
  ), (r = t == null ? void 0 : t.className) != null && r[n] && i.push((s = t == null ? void 0 : t.className) == null ? void 0 : s[n]), ((t == null ? void 0 : t.extend) === void 0 || (t == null ? void 0 : t.extend) === !0) && i.push(e), i;
}
function Ut(n, e) {
  let t;
  if (n && e && typeof n == "object" && typeof e == "object") {
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        n[t] = Ut(n[t], e[t]);
    else
      for (t in e)
        n[t] = Ut(n[t], e[t]);
    return n;
  }
  return e;
}
function Et(n, ...e) {
  let t = e.length;
  for (let r = 0; r < t; r++)
    n = Ut(n, e[r]);
  return n;
}
function zi(n, e) {
  return n.replace(
    /{{(\w+)}}/g,
    (t, r) => e.hasOwnProperty(r) ? e[r] : t
  );
}
var qi = {
  sign_up: {
    email_label: "Email address",
    password_label: "Create a Password",
    email_input_placeholder: "Your email address",
    password_input_placeholder: "Your password",
    button_label: "Sign up",
    loading_button_label: "Signing up ...",
    social_provider_text: "Sign in with {{provider}}",
    link_text: "Don't have an account? Sign up",
    confirmation_text: "Check your email for the confirmation link"
  },
  sign_in: {
    email_label: "Email address",
    password_label: "Your Password",
    email_input_placeholder: "Your email address",
    password_input_placeholder: "Your password",
    button_label: "Sign in",
    loading_button_label: "Signing in ...",
    social_provider_text: "Sign in with {{provider}}",
    link_text: "Already have an account? Sign in"
  },
  magic_link: {
    email_input_label: "Email address",
    email_input_placeholder: "Your email address",
    button_label: "Send Magic Link",
    loading_button_label: "Sending Magic Link ...",
    link_text: "Send a magic link email",
    confirmation_text: "Check your email for the magic link"
  },
  forgotten_password: {
    email_label: "Email address",
    password_label: "Your Password",
    email_input_placeholder: "Your email address",
    button_label: "Send reset password instructions",
    loading_button_label: "Sending reset instructions ...",
    link_text: "Forgot your password?",
    confirmation_text: "Check your email for the password reset link"
  },
  update_password: {
    password_label: "New password",
    password_input_placeholder: "Your new password",
    button_label: "Update password",
    loading_button_label: "Updating password ...",
    confirmation_text: "Your password has been updated"
  },
  verify_otp: {
    email_input_label: "Email address",
    email_input_placeholder: "Your email address",
    phone_input_label: "Phone number",
    phone_input_placeholder: "Your phone number",
    token_input_label: "Token",
    token_input_placeholder: "Your Otp token",
    button_label: "Verify token",
    loading_button_label: "Signing in ..."
  }
};
const Hi = he({
  fontFamily: "$bodyFontFamily",
  fontSize: "$baseBodySize",
  marginBottom: "$anchorBottomMargin",
  color: "$anchorTextColor",
  display: "block",
  textAlign: "center",
  textDecoration: "underline",
  "&:hover": {
    color: "$anchorTextHoverColor"
  }
}), Te = ({ children: n, appearance: e, ...t }) => {
  var r;
  const s = je(
    "anchor",
    Hi(),
    e
  );
  return /* @__PURE__ */ p.createElement(
    "a",
    {
      ...t,
      style: (r = e == null ? void 0 : e.style) == null ? void 0 : r.anchor,
      className: s.join(" ")
    },
    n
  );
}, Vi = he({
  fontFamily: "$buttonFontFamily",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  borderRadius: "$borderRadiusButton",
  fontSize: "$baseButtonSize",
  padding: "$buttonPadding",
  cursor: "pointer",
  borderWidth: "$buttonBorderWidth",
  borderStyle: "solid",
  width: "100%",
  transitionProperty: "background-color",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "100ms",
  "&:disabled": {
    opacity: 0.7,
    cursor: "unset"
  },
  variants: {
    color: {
      default: {
        backgroundColor: "$defaultButtonBackground",
        color: "$defaultButtonText",
        borderColor: "$defaultButtonBorder",
        "&:hover:not(:disabled)": {
          backgroundColor: "$defaultButtonBackgroundHover"
        }
      },
      primary: {
        backgroundColor: "$brand",
        color: "$brandButtonText",
        borderColor: "$brandAccent",
        "&:hover:not(:disabled)": {
          backgroundColor: "$brandAccent"
        }
      }
    }
  }
}), He = ({
  children: n,
  color: e = "default",
  appearance: t,
  icon: r,
  loading: s = !1,
  ...i
}) => {
  var o;
  const a = je(
    "button",
    Vi({ color: e }),
    t
  );
  return /* @__PURE__ */ p.createElement(
    "button",
    {
      ...i,
      style: (o = t == null ? void 0 : t.style) == null ? void 0 : o.button,
      className: a.join(" "),
      disabled: s
    },
    r,
    n
  );
}, Gi = he({
  display: "flex",
  gap: "4px",
  variants: {
    direction: {
      horizontal: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(48px, 1fr))"
      },
      vertical: {
        flexDirection: "column",
        margin: "8px 0"
      }
    },
    gap: {
      small: {
        gap: "4px"
      },
      medium: {
        gap: "8px"
      },
      large: {
        gap: "16px"
      }
    }
  }
}), ie = ({
  children: n,
  appearance: e,
  ...t
}) => {
  var r;
  const s = je(
    "container",
    Gi({
      direction: t.direction,
      gap: t.gap
    }),
    e
  );
  return /* @__PURE__ */ p.createElement(
    "div",
    {
      ...t,
      style: (r = e == null ? void 0 : e.style) == null ? void 0 : r.container,
      className: s.join(" ")
    },
    n
  );
}, Ki = he({
  background: "$dividerBackground",
  display: "block",
  margin: "16px 0",
  height: "1px",
  width: "100%"
}), Ji = ({
  children: n,
  appearance: e,
  ...t
}) => {
  var r;
  const s = je(
    "divider",
    Ki(),
    e
  );
  return /* @__PURE__ */ p.createElement(
    "div",
    {
      ...t,
      style: (r = e == null ? void 0 : e.style) == null ? void 0 : r.divider,
      className: s.join(" ")
    }
  );
}, Yi = he({
  fontFamily: "$inputFontFamily",
  background: "$inputBackground",
  borderRadius: "$inputBorderRadius",
  padding: "$inputPadding",
  cursor: "text",
  borderWidth: "$inputBorderWidth",
  borderColor: "$inputBorder",
  borderStyle: "solid",
  fontSize: "$baseInputSize",
  width: "100%",
  color: "$inputText",
  boxSizing: "border-box",
  "&:hover": {
    borderColor: "$inputBorderHover",
    outline: "none"
  },
  "&:focus": {
    borderColor: "$inputBorderFocus",
    outline: "none"
  },
  "&::placeholder": {
    color: "$inputPlaceholder",
    letterSpacing: "initial"
  },
  transitionProperty: "background-color, border",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "100ms",
  variants: {
    type: {
      default: {
        letterSpacing: "0px"
      },
      password: {
        letterSpacing: "0px"
      }
    }
  }
}), _e = ({ children: n, appearance: e, ...t }) => {
  var r;
  const s = je(
    "input",
    Yi({
      type: t.type === "password" ? "password" : "default"
    }),
    e
  );
  return /* @__PURE__ */ p.createElement(
    "input",
    {
      ...t,
      style: (r = e == null ? void 0 : e.style) == null ? void 0 : r.input,
      className: s.join(" ")
    },
    n
  );
}, Zi = he({
  fontFamily: "$labelFontFamily",
  fontSize: "$baseLabelSize",
  marginBottom: "$labelBottomMargin",
  color: "$inputLabelText",
  display: "block"
}), we = ({ children: n, appearance: e, ...t }) => {
  var r;
  const s = je(
    "label",
    Zi(),
    e
  );
  return /* @__PURE__ */ p.createElement(
    "label",
    {
      ...t,
      style: (r = e == null ? void 0 : e.style) == null ? void 0 : r.label,
      className: s.join(" ")
    },
    n
  );
}, Qi = he({
  fontFamily: "$bodyFontFamily",
  fontSize: "$baseInputSize",
  marginBottom: "$labelBottomMargin",
  display: "block",
  textAlign: "center",
  borderRadius: "0.375rem",
  padding: "1.5rem 1rem",
  lineHeight: "1rem",
  color: "$messageText",
  backgroundColor: "$messageBackground",
  border: "1px solid $messageBorder",
  variants: {
    color: {
      danger: {
        color: "$messageTextDanger",
        backgroundColor: "$messageBackgroundDanger",
        border: "1px solid $messageBorderDanger"
      }
    }
  }
}), oe = ({
  children: n,
  appearance: e,
  ...t
}) => {
  var r;
  const s = je(
    "message",
    Qi({ color: t.color }),
    e
  );
  return /* @__PURE__ */ p.createElement(
    "span",
    {
      ...t,
      style: (r = e == null ? void 0 : e.style) == null ? void 0 : r.message,
      className: s.join(" ")
    },
    n
  );
};
function Kr({
  setAuthView: n = () => {
  },
  supabaseClient: e,
  redirectTo: t,
  i18n: r,
  appearance: s,
  showLinks: i = !1
}) {
  var o;
  const [a, l] = P.useState(""), [c, u] = P.useState(""), [d, h] = P.useState(""), [g, m] = P.useState(!1), w = async (y) => {
    var _, b;
    if (y.preventDefault(), u(""), h(""), m(!0), a.length === 0) {
      u((_ = r == null ? void 0 : r.magic_link) == null ? void 0 : _.empty_email_address), m(!1);
      return;
    }
    const { error: k } = await e.auth.signInWithOtp({
      email: a,
      options: { emailRedirectTo: t }
    });
    k ? u(k.message) : h((b = r == null ? void 0 : r.magic_link) == null ? void 0 : b.confirmation_text), m(!1);
  }, v = r == null ? void 0 : r.magic_link;
  return /* @__PURE__ */ p.createElement("form", { id: "auth-magic-link", onSubmit: w }, /* @__PURE__ */ p.createElement(ie, { gap: "large", direction: "vertical", appearance: s }, /* @__PURE__ */ p.createElement("div", null, /* @__PURE__ */ p.createElement(we, { htmlFor: "email", appearance: s }, v == null ? void 0 : v.email_input_label), /* @__PURE__ */ p.createElement(
    _e,
    {
      id: "email",
      name: "email",
      type: "email",
      autoFocus: !0,
      placeholder: v == null ? void 0 : v.email_input_placeholder,
      onChange: (y) => {
        u && u(""), l(y.target.value);
      },
      appearance: s
    }
  )), /* @__PURE__ */ p.createElement(
    He,
    {
      color: "primary",
      type: "submit",
      loading: g,
      appearance: s
    },
    g ? v == null ? void 0 : v.loading_button_label : v == null ? void 0 : v.button_label
  ), i && /* @__PURE__ */ p.createElement(
    Te,
    {
      href: "#auth-sign-in",
      onClick: (y) => {
        y.preventDefault(), n(H.SIGN_IN);
      },
      appearance: s
    },
    (o = r == null ? void 0 : r.sign_in) == null ? void 0 : o.link_text
  ), d && /* @__PURE__ */ p.createElement(oe, { appearance: s }, d), c && /* @__PURE__ */ p.createElement(oe, { color: "danger", appearance: s }, c)));
}
const Y = he({
  width: "21px",
  height: "21px"
}), Xi = ({ provider: n }) => n == "google" ? eo() : n == "facebook" ? to() : n == "twitter" ? ro() : n == "apple" ? so() : n == "github" ? no() : n == "gitlab" ? io() : n == "bitbucket" ? oo() : n == "discord" ? ao() : n == "azure" ? lo() : n == "keycloak" ? co() : n == "linkedin" ? uo() : n == "notion" ? ho() : n == "slack" ? fo() : n == "spotify" ? po() : n == "twitch" ? go() : n == "workos" ? mo() : n == "kakao" ? vo() : null, eo = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#FFC107",
      d: "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#FF3D00",
      d: "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#4CAF50",
      d: "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#1976D2",
      d: "M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    }
  )
), to = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ p.createElement("path", { fill: "#039be5", d: "M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" }),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#fff",
      d: "M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
    }
  )
), ro = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#03A9F4",
      d: "M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
    }
  )
), so = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    fill: "gray",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "21px",
    height: "21px"
  },
  " ",
  /* @__PURE__ */ p.createElement("path", { d: "M 15.904297 1.078125 C 15.843359 1.06875 15.774219 1.0746094 15.699219 1.0996094 C 14.699219 1.2996094 13.600391 1.8996094 12.900391 2.5996094 C 12.300391 3.1996094 11.800781 4.1996094 11.800781 5.0996094 C 11.800781 5.2996094 11.999219 5.5 12.199219 5.5 C 13.299219 5.4 14.399609 4.7996094 15.099609 4.0996094 C 15.699609 3.2996094 16.199219 2.4 16.199219 1.5 C 16.199219 1.275 16.087109 1.10625 15.904297 1.078125 z M 16.199219 5.4003906 C 14.399219 5.4003906 13.600391 6.5 12.400391 6.5 C 11.100391 6.5 9.9003906 5.5 8.4003906 5.5 C 6.3003906 5.5 3.0996094 7.4996094 3.0996094 12.099609 C 2.9996094 16.299609 6.8 21 9 21 C 10.3 21 10.600391 20.199219 12.400391 20.199219 C 14.200391 20.199219 14.600391 21 15.900391 21 C 17.400391 21 18.500391 19.399609 19.400391 18.099609 C 19.800391 17.399609 20.100391 17.000391 20.400391 16.400391 C 20.600391 16.000391 20.4 15.600391 20 15.400391 C 17.4 14.100391 16.900781 9.9003906 19.800781 8.4003906 C 20.300781 8.1003906 20.4 7.4992188 20 7.1992188 C 18.9 6.1992187 17.299219 5.4003906 16.199219 5.4003906 z" })
), no = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    fill: "gray",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 30 30",
    width: "21px",
    height: "21px"
  },
  " ",
  /* @__PURE__ */ p.createElement("path", { d: "M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" })
), io = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ p.createElement("path", { fill: "#e53935", d: "M24 43L16 20 32 20z" }),
  /* @__PURE__ */ p.createElement("path", { fill: "#ff7043", d: "M24 43L42 20 32 20z" }),
  /* @__PURE__ */ p.createElement("path", { fill: "#e53935", d: "M37 5L42 20 32 20z" }),
  /* @__PURE__ */ p.createElement("path", { fill: "#ffa726", d: "M24 43L42 20 45 28z" }),
  /* @__PURE__ */ p.createElement("path", { fill: "#ff7043", d: "M24 43L6 20 16 20z" }),
  /* @__PURE__ */ p.createElement("path", { fill: "#e53935", d: "M11 5L6 20 16 20z" }),
  /* @__PURE__ */ p.createElement("path", { fill: "#ffa726", d: "M24 43L6 20 3 28z" })
), oo = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    xmlns: "http://www.w3.org/2000/svg",
    width: "512",
    height: "512",
    viewBox: "0 0 62.42 62.42"
  },
  /* @__PURE__ */ p.createElement("defs", null, /* @__PURE__ */ p.createElement(
    "linearGradient",
    {
      id: "New_Gradient_Swatch_1",
      x1: "64.01",
      y1: "30.27",
      x2: "32.99",
      y2: "54.48",
      gradientUnits: "userSpaceOnUse"
    },
    /* @__PURE__ */ p.createElement("stop", { offset: "0.18", stopColor: "#0052cc" }),
    /* @__PURE__ */ p.createElement("stop", { offset: "1", stopColor: "#2684ff" })
  )),
  /* @__PURE__ */ p.createElement("title", null, "Bitbucket-blue"),
  /* @__PURE__ */ p.createElement("g", { id: "Layer_2", "data-name": "Layer 2" }, /* @__PURE__ */ p.createElement("g", { id: "Blue", transform: "translate(0 -3.13)" }, /* @__PURE__ */ p.createElement(
    "path",
    {
      d: "M2,6.26A2,2,0,0,0,0,8.58L8.49,60.12a2.72,2.72,0,0,0,2.66,2.27H51.88a2,2,0,0,0,2-1.68L62.37,8.59a2,2,0,0,0-2-2.32ZM37.75,43.51h-13L21.23,25.12H40.9Z",
      fill: "#2684ff"
    }
  ), /* @__PURE__ */ p.createElement(
    "path",
    {
      d: "M59.67,25.12H40.9L37.75,43.51h-13L9.4,61.73a2.71,2.71,0,0,0,1.75.66H51.89a2,2,0,0,0,2-1.68Z",
      fill: "url(#New_Gradient_Swatch_1)"
    }
  )))
), ao = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#536dfe",
      d: "M39.248,10.177c-2.804-1.287-5.812-2.235-8.956-2.778c-0.057-0.01-0.114,0.016-0.144,0.068	c-0.387,0.688-0.815,1.585-1.115,2.291c-3.382-0.506-6.747-0.506-10.059,0c-0.3-0.721-0.744-1.603-1.133-2.291	c-0.03-0.051-0.087-0.077-0.144-0.068c-3.143,0.541-6.15,1.489-8.956,2.778c-0.024,0.01-0.045,0.028-0.059,0.051	c-5.704,8.522-7.267,16.835-6.5,25.044c0.003,0.04,0.026,0.079,0.057,0.103c3.763,2.764,7.409,4.442,10.987,5.554	c0.057,0.017,0.118-0.003,0.154-0.051c0.846-1.156,1.601-2.374,2.248-3.656c0.038-0.075,0.002-0.164-0.076-0.194	c-1.197-0.454-2.336-1.007-3.432-1.636c-0.087-0.051-0.094-0.175-0.014-0.234c0.231-0.173,0.461-0.353,0.682-0.534	c0.04-0.033,0.095-0.04,0.142-0.019c7.201,3.288,14.997,3.288,22.113,0c0.047-0.023,0.102-0.016,0.144,0.017	c0.22,0.182,0.451,0.363,0.683,0.536c0.08,0.059,0.075,0.183-0.012,0.234c-1.096,0.641-2.236,1.182-3.434,1.634	c-0.078,0.03-0.113,0.12-0.075,0.196c0.661,1.28,1.415,2.498,2.246,3.654c0.035,0.049,0.097,0.07,0.154,0.052	c3.595-1.112,7.241-2.79,11.004-5.554c0.033-0.024,0.054-0.061,0.057-0.101c0.917-9.491-1.537-17.735-6.505-25.044	C39.293,10.205,39.272,10.187,39.248,10.177z M16.703,30.273c-2.168,0-3.954-1.99-3.954-4.435s1.752-4.435,3.954-4.435	c2.22,0,3.989,2.008,3.954,4.435C20.658,28.282,18.906,30.273,16.703,30.273z M31.324,30.273c-2.168,0-3.954-1.99-3.954-4.435	s1.752-4.435,3.954-4.435c2.22,0,3.989,2.008,3.954,4.435C35.278,28.282,33.544,30.273,31.324,30.273z"
    }
  )
), lo = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ p.createElement(
    "linearGradient",
    {
      id: "k8yl7~hDat~FaoWq8WjN6a",
      x1: "-1254.397",
      x2: "-1261.911",
      y1: "877.268",
      y2: "899.466",
      gradientTransform: "translate(1981.75 -1362.063) scale(1.5625)",
      gradientUnits: "userSpaceOnUse"
    },
    /* @__PURE__ */ p.createElement("stop", { offset: "0", stopColor: "#114a8b" }),
    /* @__PURE__ */ p.createElement("stop", { offset: "1", stopColor: "#0669bc" })
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "url(#k8yl7~hDat~FaoWq8WjN6a)",
      d: "M17.634,6h11.305L17.203,40.773c-0.247,0.733-0.934,1.226-1.708,1.226H6.697 c-0.994,0-1.8-0.806-1.8-1.8c0-0.196,0.032-0.39,0.094-0.576L15.926,7.227C16.173,6.494,16.86,6,17.634,6L17.634,6z"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#0078d4",
      d: "M34.062,29.324H16.135c-0.458-0.001-0.83,0.371-0.831,0.829c0,0.231,0.095,0.451,0.264,0.608 l11.52,10.752C27.423,41.826,27.865,42,28.324,42h10.151L34.062,29.324z"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "linearGradient",
    {
      id: "k8yl7~hDat~FaoWq8WjN6b",
      x1: "-1252.05",
      x2: "-1253.788",
      y1: "887.612",
      y2: "888.2",
      gradientTransform: "translate(1981.75 -1362.063) scale(1.5625)",
      gradientUnits: "userSpaceOnUse"
    },
    /* @__PURE__ */ p.createElement("stop", { offset: "0", stopOpacity: ".3" }),
    /* @__PURE__ */ p.createElement("stop", { offset: ".071", stopOpacity: ".2" }),
    /* @__PURE__ */ p.createElement("stop", { offset: ".321", stopOpacity: ".1" }),
    /* @__PURE__ */ p.createElement("stop", { offset: ".623", stopOpacity: ".05" }),
    /* @__PURE__ */ p.createElement("stop", { offset: "1", stopOpacity: "0" })
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "url(#k8yl7~hDat~FaoWq8WjN6b)",
      d: "M17.634,6c-0.783-0.003-1.476,0.504-1.712,1.25L5.005,39.595 c-0.335,0.934,0.151,1.964,1.085,2.299C6.286,41.964,6.493,42,6.702,42h9.026c0.684-0.122,1.25-0.603,1.481-1.259l2.177-6.416 l7.776,7.253c0.326,0.27,0.735,0.419,1.158,0.422h10.114l-4.436-12.676l-12.931,0.003L28.98,6H17.634z"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "linearGradient",
    {
      id: "k8yl7~hDat~FaoWq8WjN6c",
      x1: "-1252.952",
      x2: "-1244.704",
      y1: "876.6",
      y2: "898.575",
      gradientTransform: "translate(1981.75 -1362.063) scale(1.5625)",
      gradientUnits: "userSpaceOnUse"
    },
    /* @__PURE__ */ p.createElement("stop", { offset: "0", stopColor: "#3ccbf4" }),
    /* @__PURE__ */ p.createElement("stop", { offset: "1", stopColor: "#2892df" })
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "url(#k8yl7~hDat~FaoWq8WjN6c)",
      d: "M32.074,7.225C31.827,6.493,31.141,6,30.368,6h-12.6c0.772,0,1.459,0.493,1.705,1.224 l10.935,32.399c0.318,0.942-0.188,1.963-1.13,2.281C29.093,41.968,28.899,42,28.703,42h12.6c0.994,0,1.8-0.806,1.8-1.801 c0-0.196-0.032-0.39-0.095-0.575L32.074,7.225z"
    }
  )
), co = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    width: "512",
    height: "512",
    viewBox: "0 0 512 512",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ p.createElement(
    "path",
    {
      d: "M472.136 163.959H408.584C407.401 163.959 406.218 163.327 405.666 162.3L354.651 73.6591C354.02 72.632 352.916 72 351.654 72H143.492C142.309 72 141.126 72.632 140.574 73.6591L87.5084 165.618L36.414 254.259C35.862 255.286 35.862 256.55 36.414 257.656L87.5084 346.297L140.495 438.335C141.047 439.362 142.23 440.073 143.413 439.994H351.654C352.837 439.994 354.02 439.362 354.651 438.335L405.745 349.694C406.297 348.667 407.48 347.956 408.663 348.035H472.215C474.344 348.035 476 346.297 476 344.243V167.83C475.921 165.697 474.186 163.959 472.136 163.959ZM228.728 349.694L212.721 377.345C212.485 377.74 212.091 378.135 211.696 378.372C211.223 378.609 210.75 378.767 210.198 378.767H178.422C177.318 378.767 176.293 378.214 175.82 377.187L128.431 294.787L123.779 286.65L106.748 257.498C106.511 257.103 106.353 256.629 106.432 256.076C106.432 255.602 106.59 255.049 106.827 254.654L123.937 224.949L175.899 134.886C176.451 133.938 177.476 133.306 178.501 133.306H210.198C210.75 133.306 211.302 133.464 211.854 133.701C212.248 133.938 212.643 134.254 212.879 134.728L228.886 162.537C229.359 163.485 229.28 164.67 228.728 165.539L177.397 254.654C177.16 255.049 177.081 255.523 177.081 255.918C177.081 256.392 177.239 256.787 177.397 257.182L228.728 346.218C229.438 347.403 229.359 348.667 228.728 349.694V349.694ZM388.083 257.498L371.051 286.65L366.399 294.787L319.011 377.187C318.459 378.135 317.512 378.767 316.409 378.767H284.632C284.08 378.767 283.607 378.609 283.134 378.372C282.74 378.135 282.346 377.819 282.109 377.345L266.103 349.694C265.393 348.667 265.393 347.403 266.024 346.376L317.355 257.34C317.591 256.945 317.67 256.471 317.67 256.076C317.67 255.602 317.513 255.207 317.355 254.812L266.024 165.697C265.472 164.749 265.393 163.643 265.866 162.695L281.873 134.886C282.109 134.491 282.503 134.096 282.898 133.859C283.371 133.543 283.923 133.464 284.553 133.464H316.409C317.512 133.464 318.538 134.017 319.011 135.044L370.972 225.107L388.083 254.812C388.319 255.286 388.477 255.76 388.477 256.234C388.477 256.55 388.319 257.024 388.083 257.498V257.498Z",
      fill: "#008AAA"
    }
  )
), uo = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#0288D1",
      d: "M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#FFF",
      d: "M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
    }
  )
), ho = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px",
    fillRule: "evenodd",
    clipRule: "evenodd"
  },
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#fff",
      fillRule: "evenodd",
      d: "M11.553,11.099c1.232,1.001,1.694,0.925,4.008,0.77 l21.812-1.31c0.463,0,0.078-0.461-0.076-0.538l-3.622-2.619c-0.694-0.539-1.619-1.156-3.391-1.002l-21.12,1.54 c-0.77,0.076-0.924,0.461-0.617,0.77L11.553,11.099z",
      clipRule: "evenodd"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#fff",
      fillRule: "evenodd",
      d: "M12.862,16.182v22.95c0,1.233,0.616,1.695,2.004,1.619 l23.971-1.387c1.388-0.076,1.543-0.925,1.543-1.927V14.641c0-1-0.385-1.54-1.234-1.463l-25.05,1.463 C13.171,14.718,12.862,15.181,12.862,16.182L12.862,16.182z",
      clipRule: "evenodd"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#424242",
      fillRule: "evenodd",
      d: "M11.553,11.099c1.232,1.001,1.694,0.925,4.008,0.77 l21.812-1.31c0.463,0,0.078-0.461-0.076-0.538l-3.622-2.619c-0.694-0.539-1.619-1.156-3.391-1.002l-21.12,1.54 c-0.77,0.076-0.924,0.461-0.617,0.77L11.553,11.099z M12.862,16.182v22.95c0,1.233,0.616,1.695,2.004,1.619l23.971-1.387 c1.388-0.076,1.543-0.925,1.543-1.927V14.641c0-1-0.385-1.54-1.234-1.463l-25.05,1.463C13.171,14.718,12.862,15.181,12.862,16.182 L12.862,16.182z M36.526,17.413c0.154,0.694,0,1.387-0.695,1.465l-1.155,0.23v16.943c-1.003,0.539-1.928,0.847-2.698,0.847 c-1.234,0-1.543-0.385-2.467-1.54l-7.555-11.86v11.475l2.391,0.539c0,0,0,1.386-1.929,1.386l-5.317,0.308 c-0.154-0.308,0-1.078,0.539-1.232l1.388-0.385V20.418l-1.927-0.154c-0.155-0.694,0.23-1.694,1.31-1.772l5.704-0.385l7.862,12.015 V19.493l-2.005-0.23c-0.154-0.848,0.462-1.464,1.233-1.54L36.526,17.413z M7.389,5.862l21.968-1.618 c2.698-0.231,3.392-0.076,5.087,1.155l7.013,4.929C42.614,11.176,43,11.407,43,12.33v27.032c0,1.694-0.617,2.696-2.775,2.849 l-25.512,1.541c-1.62,0.077-2.391-0.154-3.239-1.232l-5.164-6.7C5.385,34.587,5,33.664,5,32.585V8.556 C5,7.171,5.617,6.015,7.389,5.862z",
      clipRule: "evenodd"
    }
  )
), fo = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#33d375",
      d: "M33,8c0-2.209-1.791-4-4-4s-4,1.791-4,4c0,1.254,0,9.741,0,11c0,2.209,1.791,4,4,4s4-1.791,4-4	C33,17.741,33,9.254,33,8z"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#33d375",
      d: "M43,19c0,2.209-1.791,4-4,4c-1.195,0-4,0-4,0s0-2.986,0-4c0-2.209,1.791-4,4-4S43,16.791,43,19z"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#40c4ff",
      d: "M8,14c-2.209,0-4,1.791-4,4s1.791,4,4,4c1.254,0,9.741,0,11,0c2.209,0,4-1.791,4-4s-1.791-4-4-4	C17.741,14,9.254,14,8,14z"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#40c4ff",
      d: "M19,4c2.209,0,4,1.791,4,4c0,1.195,0,4,0,4s-2.986,0-4,0c-2.209,0-4-1.791-4-4S16.791,4,19,4z"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#e91e63",
      d: "M14,39.006C14,41.212,15.791,43,18,43s4-1.788,4-3.994c0-1.252,0-9.727,0-10.984	c0-2.206-1.791-3.994-4-3.994s-4,1.788-4,3.994C14,29.279,14,37.754,14,39.006z"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#e91e63",
      d: "M4,28.022c0-2.206,1.791-3.994,4-3.994c1.195,0,4,0,4,0s0,2.981,0,3.994c0,2.206-1.791,3.994-4,3.994	S4,30.228,4,28.022z"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#ffc107",
      d: "M39,33c2.209,0,4-1.791,4-4s-1.791-4-4-4c-1.254,0-9.741,0-11,0c-2.209,0-4,1.791-4,4s1.791,4,4,4	C29.258,33,37.746,33,39,33z"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#ffc107",
      d: "M28,43c-2.209,0-4-1.791-4-4c0-1.195,0-4,0-4s2.986,0,4,0c2.209,0,4,1.791,4,4S30.209,43,28,43z"
    }
  )
), po = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    width: "512",
    height: "512",
    viewBox: "0 0 512 512",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ p.createElement(
    "path",
    {
      d: "M255.498 31.0034C131.513 31.0034 31 131.515 31 255.502C31 379.492 131.513 480 255.498 480C379.497 480 480 379.495 480 255.502C480 131.522 379.497 31.0135 255.495 31.0135L255.498 31V31.0034ZM358.453 354.798C354.432 361.391 345.801 363.486 339.204 359.435C286.496 327.237 220.139 319.947 141.993 337.801C134.463 339.516 126.957 334.798 125.24 327.264C123.516 319.731 128.217 312.225 135.767 310.511C221.284 290.972 294.639 299.384 353.816 335.549C360.413 339.596 362.504 348.2 358.453 354.798ZM385.932 293.67C380.864 301.903 370.088 304.503 361.858 299.438C301.512 262.345 209.528 251.602 138.151 273.272C128.893 276.067 119.118 270.851 116.309 261.61C113.521 252.353 118.74 242.597 127.981 239.782C209.512 215.044 310.87 227.026 380.17 269.612C388.4 274.68 391 285.456 385.935 293.676V293.673L385.932 293.67ZM388.293 230.016C315.935 187.039 196.56 183.089 127.479 204.055C116.387 207.42 104.654 201.159 101.293 190.063C97.9326 178.964 104.189 167.241 115.289 163.87C194.59 139.796 326.418 144.446 409.723 193.902C419.722 199.826 422.995 212.71 417.068 222.675C411.168 232.653 398.247 235.943 388.303 230.016H388.293V230.016Z",
      fill: "#1ED760"
    }
  )
), go = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    width: "512",
    height: "512",
    viewBox: "0 0 512 512",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ p.createElement("path", { d: "M416 240L352 304H288L232 360V304H160V64H416V240Z", fill: "white" }),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      d: "M144 32L64 112V400H160V480L240 400H304L448 256V32H144ZM416 240L352 304H288L232 360V304H160V64H416V240Z",
      fill: "#9146FF"
    }
  ),
  /* @__PURE__ */ p.createElement("path", { d: "M368 120H336V216H368V120Z", fill: "#9146FF" }),
  /* @__PURE__ */ p.createElement("path", { d: "M280 120H248V216H280V120Z", fill: "#9146FF" })
), mo = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    width: "512",
    height: "512",
    viewBox: "0 0 512 512",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ p.createElement(
    "path",
    {
      d: "M33 256.043C33 264.556 35.3159 273.069 39.4845 280.202L117.993 415.493C126.098 429.298 138.373 440.572 153.657 445.634C183.764 455.528 214.797 442.873 229.618 417.333L248.609 384.661L173.806 256.043L252.777 119.831L271.768 87.1591C277.557 77.2654 284.968 69.4424 294 63H285.894H172.185C150.878 63 131.193 74.2742 120.54 92.6812L39.7161 231.884C35.3159 239.016 33 247.53 33 256.043Z",
      fill: "#6363F1"
    }
  ),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      d: "M480 256.058C480 247.539 477.684 239.021 473.516 231.883L393.849 94.6596C379.028 69.3331 347.995 56.4396 317.888 66.34C302.603 71.4053 290.329 82.6871 282.224 96.5015L264.391 127.354L339.194 256.058L260.223 392.131L241.232 424.825C235.443 434.495 228.032 442.553 219 449H227.106H340.815C362.122 449 381.807 437.718 392.46 419.299L473.284 280.003C477.684 272.866 480 264.577 480 256.058Z",
      fill: "#6363F1"
    }
  )
), vo = () => /* @__PURE__ */ p.createElement(
  "svg",
  {
    className: Y(),
    xmlns: "http://www.w3.org/2000/svg",
    width: "2500",
    height: "2500",
    viewBox: "0 0 256 256"
  },
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#FFE812",
      d: "M256 236c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0h216c11.046 0 20 8.954 20 20v216z"
    }
  ),
  /* @__PURE__ */ p.createElement("path", { d: "M128 36C70.562 36 24 72.713 24 118c0 29.279 19.466 54.97 48.748 69.477-1.593 5.494-10.237 35.344-10.581 37.689 0 0-.207 1.762.934 2.434s2.483.15 2.483.15c3.272-.457 37.943-24.811 43.944-29.04 5.995.849 12.168 1.29 18.472 1.29 57.438 0 104-36.712 104-82 0-45.287-46.562-82-104-82z" }),
  /* @__PURE__ */ p.createElement(
    "path",
    {
      fill: "#FFE812",
      d: "M70.5 146.625c-3.309 0-6-2.57-6-5.73V105.25h-9.362c-3.247 0-5.888-2.636-5.888-5.875s2.642-5.875 5.888-5.875h30.724c3.247 0 5.888 2.636 5.888 5.875s-2.642 5.875-5.888 5.875H76.5v35.645c0 3.16-2.691 5.73-6 5.73zM123.112 146.547c-2.502 0-4.416-1.016-4.993-2.65l-2.971-7.778-18.296-.001-2.973 7.783c-.575 1.631-2.488 2.646-4.99 2.646a9.155 9.155 0 0 1-3.814-.828c-1.654-.763-3.244-2.861-1.422-8.52l14.352-37.776c1.011-2.873 4.082-5.833 7.99-5.922 3.919.088 6.99 3.049 8.003 5.928l14.346 37.759c1.826 5.672.236 7.771-1.418 8.532a9.176 9.176 0 0 1-3.814.827c-.001 0 0 0 0 0zm-11.119-21.056L106 108.466l-5.993 17.025h11.986zM138 145.75c-3.171 0-5.75-2.468-5.75-5.5V99.5c0-3.309 2.748-6 6.125-6s6.125 2.691 6.125 6v35.25h12.75c3.171 0 5.75 2.468 5.75 5.5s-2.579 5.5-5.75 5.5H138zM171.334 146.547c-3.309 0-6-2.691-6-6V99.5c0-3.309 2.691-6 6-6s6 2.691 6 6v12.896l16.74-16.74c.861-.861 2.044-1.335 3.328-1.335 1.498 0 3.002.646 4.129 1.772 1.051 1.05 1.678 2.401 1.764 3.804.087 1.415-.384 2.712-1.324 3.653l-13.673 13.671 14.769 19.566a5.951 5.951 0 0 1 1.152 4.445 5.956 5.956 0 0 1-2.328 3.957 5.94 5.94 0 0 1-3.609 1.211 5.953 5.953 0 0 1-4.793-2.385l-14.071-18.644-2.082 2.082v13.091a6.01 6.01 0 0 1-6.002 6.003z"
    }
  )
);
function _o({
  supabaseClient: n,
  socialLayout: e = "vertical",
  providers: t = ["github", "google", "azure"],
  providerScopes: r,
  queryParams: s,
  redirectTo: i,
  onlyThirdPartyProviders: o = !0,
  view: a = "sign_in",
  i18n: l,
  appearance: c
}) {
  const [u, d] = P.useState(!1), [h, g] = P.useState(""), m = e === "vertical", w = a === "magic_link" ? "sign_in" : a, v = async (_) => {
    d(!0);
    const { error: b } = await n.auth.signInWithOAuth({
      provider: _,
      options: {
        redirectTo: i,
        scopes: r == null ? void 0 : r[_],
        queryParams: s
      }
    });
    b && g(b.message), d(!1);
  };
  function y(_) {
    const b = _.toLowerCase();
    return _.charAt(0).toUpperCase() + b.slice(1);
  }
  return /* @__PURE__ */ p.createElement(p.Fragment, null, t && t.length > 0 && /* @__PURE__ */ p.createElement(p.Fragment, null, /* @__PURE__ */ p.createElement(ie, { gap: "large", direction: "vertical", appearance: c }, /* @__PURE__ */ p.createElement(
    ie,
    {
      direction: m ? "vertical" : "horizontal",
      gap: m ? "small" : "medium",
      appearance: c
    },
    t.map((_) => {
      var b;
      return /* @__PURE__ */ p.createElement(
        He,
        {
          key: _,
          color: "default",
          loading: u,
          onClick: () => v(_),
          appearance: c
        },
        /* @__PURE__ */ p.createElement(Xi, { provider: _ }),
        m && zi(
          (b = l == null ? void 0 : l[w]) == null ? void 0 : b.social_provider_text,
          {
            provider: y(_)
          }
        )
      );
    })
  )), !o && /* @__PURE__ */ p.createElement(Ji, { appearance: c })));
}
function Er({
  authView: n = "sign_in",
  defaultEmail: e = "",
  defaultPassword: t = "",
  setAuthView: r = () => {
  },
  setDefaultEmail: s = (m) => {
  },
  setDefaultPassword: i = (m) => {
  },
  supabaseClient: o,
  showLinks: a = !1,
  redirectTo: l,
  additionalData: c,
  magicLink: u,
  i18n: d,
  appearance: h,
  children: g
}) {
  var m, w, v, y;
  const _ = P.useRef(!0), [b, k] = P.useState(e), [E, C] = P.useState(t), [x, B] = P.useState(""), [N, M] = P.useState(!1), [F, X] = P.useState("");
  P.useEffect(() => (_.current = !0, k(e), C(t), () => {
    _.current = !1;
  }), [n]);
  const ae = async (z) => {
    var fe;
    switch (z.preventDefault(), B(""), M(!0), n) {
      case "sign_in":
        const { error: ce } = await o.auth.signInWithPassword({
          email: b,
          password: E
        });
        ce && B(ce.message);
        break;
      case "sign_up":
        let nt = {
          emailRedirectTo: l
        };
        c && (nt.data = c);
        const {
          data: { user: f, session: S },
          error: j
        } = await o.auth.signUp({
          email: b,
          password: E,
          options: nt
        });
        j ? B(j.message) : f && !S && X((fe = d == null ? void 0 : d.sign_up) == null ? void 0 : fe.confirmation_text);
        break;
    }
    _.current && M(!1);
  }, le = (z) => {
    s(b), i(E), r(z);
  }, W = d == null ? void 0 : d[n];
  return /* @__PURE__ */ p.createElement(
    "form",
    {
      id: n === "sign_in" ? "auth-sign-in" : "auth-sign-up",
      onSubmit: ae,
      autoComplete: "on",
      style: { width: "100%" }
    },
    /* @__PURE__ */ p.createElement(ie, { direction: "vertical", gap: "large", appearance: h }, /* @__PURE__ */ p.createElement(ie, { direction: "vertical", gap: "large", appearance: h }, /* @__PURE__ */ p.createElement("div", null, /* @__PURE__ */ p.createElement(we, { htmlFor: "email", appearance: h }, W == null ? void 0 : W.email_label), /* @__PURE__ */ p.createElement(
      _e,
      {
        id: "email",
        type: "email",
        name: "email",
        placeholder: W == null ? void 0 : W.email_input_placeholder,
        defaultValue: b,
        onChange: (z) => k(z.target.value),
        autoComplete: "email",
        appearance: h
      }
    )), /* @__PURE__ */ p.createElement("div", null, /* @__PURE__ */ p.createElement(we, { htmlFor: "password", appearance: h }, W == null ? void 0 : W.password_label), /* @__PURE__ */ p.createElement(
      _e,
      {
        id: "password",
        type: "password",
        name: "password",
        placeholder: W == null ? void 0 : W.password_input_placeholder,
        defaultValue: E,
        onChange: (z) => C(z.target.value),
        autoComplete: n === "sign_in" ? "current-password" : "new-password",
        appearance: h
      }
    )), g), /* @__PURE__ */ p.createElement(
      He,
      {
        type: "submit",
        color: "primary",
        loading: N,
        appearance: h
      },
      N ? W == null ? void 0 : W.loading_button_label : W == null ? void 0 : W.button_label
    ), a && /* @__PURE__ */ p.createElement(ie, { direction: "vertical", gap: "small", appearance: h }, n === H.SIGN_IN && u && /* @__PURE__ */ p.createElement(
      Te,
      {
        href: "#auth-magic-link",
        onClick: (z) => {
          z.preventDefault(), r(H.MAGIC_LINK);
        },
        appearance: h
      },
      (m = d == null ? void 0 : d.magic_link) == null ? void 0 : m.link_text
    ), n === H.SIGN_IN && /* @__PURE__ */ p.createElement(
      Te,
      {
        href: "#auth-forgot-password",
        onClick: (z) => {
          z.preventDefault(), r(H.FORGOTTEN_PASSWORD);
        },
        appearance: h
      },
      (w = d == null ? void 0 : d.forgotten_password) == null ? void 0 : w.link_text
    ), n === H.SIGN_IN ? /* @__PURE__ */ p.createElement(
      Te,
      {
        href: "#auth-sign-up",
        onClick: (z) => {
          z.preventDefault(), le(H.SIGN_UP);
        },
        appearance: h
      },
      (v = d == null ? void 0 : d.sign_up) == null ? void 0 : v.link_text
    ) : /* @__PURE__ */ p.createElement(
      Te,
      {
        href: "#auth-sign-in",
        onClick: (z) => {
          z.preventDefault(), le(H.SIGN_IN);
        },
        appearance: h
      },
      (y = d == null ? void 0 : d.sign_in) == null ? void 0 : y.link_text
    ))),
    F && /* @__PURE__ */ p.createElement(oe, { appearance: h }, F),
    x && /* @__PURE__ */ p.createElement(oe, { color: "danger", appearance: h }, x)
  );
}
function Jr({
  setAuthView: n = () => {
  },
  supabaseClient: e,
  redirectTo: t,
  i18n: r,
  appearance: s,
  showLinks: i = !1
}) {
  var o;
  const [a, l] = P.useState(""), [c, u] = P.useState(""), [d, h] = P.useState(""), [g, m] = P.useState(!1), w = async (y) => {
    var _;
    y.preventDefault(), u(""), h(""), m(!0);
    const { error: b } = await e.auth.resetPasswordForEmail(a, {
      redirectTo: t
    });
    b ? u(b.message) : h((_ = r == null ? void 0 : r.forgotten_password) == null ? void 0 : _.confirmation_text), m(!1);
  }, v = r == null ? void 0 : r.forgotten_password;
  return /* @__PURE__ */ p.createElement("form", { id: "auth-forgot-password", onSubmit: w }, /* @__PURE__ */ p.createElement(ie, { direction: "vertical", gap: "large", appearance: s }, /* @__PURE__ */ p.createElement(ie, { gap: "large", direction: "vertical", appearance: s }, /* @__PURE__ */ p.createElement("div", null, /* @__PURE__ */ p.createElement(we, { htmlFor: "email", appearance: s }, v == null ? void 0 : v.email_label), /* @__PURE__ */ p.createElement(
    _e,
    {
      id: "email",
      name: "email",
      type: "email",
      autoFocus: !0,
      placeholder: v == null ? void 0 : v.email_input_placeholder,
      onChange: (y) => l(y.target.value),
      appearance: s
    }
  )), /* @__PURE__ */ p.createElement(
    He,
    {
      type: "submit",
      color: "primary",
      loading: g,
      appearance: s
    },
    g ? v == null ? void 0 : v.loading_button_label : v == null ? void 0 : v.button_label
  ), i && /* @__PURE__ */ p.createElement(
    Te,
    {
      href: "#auth-sign-in",
      onClick: (y) => {
        y.preventDefault(), n(H.SIGN_IN);
      },
      appearance: s
    },
    (o = r == null ? void 0 : r.sign_in) == null ? void 0 : o.link_text
  ), d && /* @__PURE__ */ p.createElement(oe, { appearance: s }, d), c && /* @__PURE__ */ p.createElement(oe, { color: "danger", appearance: s }, c))));
}
function Yr({
  supabaseClient: n,
  i18n: e,
  appearance: t
}) {
  const [r, s] = P.useState(""), [i, o] = P.useState(""), [a, l] = P.useState(""), [c, u] = P.useState(!1), d = async (g) => {
    var m;
    g.preventDefault(), o(""), l(""), u(!0);
    const { error: w } = await n.auth.updateUser({ password: r });
    w ? o(w.message) : l((m = e == null ? void 0 : e.update_password) == null ? void 0 : m.confirmation_text), u(!1);
  }, h = e == null ? void 0 : e.update_password;
  return /* @__PURE__ */ p.createElement("form", { id: "auth-update-password", onSubmit: d }, /* @__PURE__ */ p.createElement(ie, { gap: "large", direction: "vertical", appearance: t }, /* @__PURE__ */ p.createElement("div", null, /* @__PURE__ */ p.createElement(we, { htmlFor: "password", appearance: t }, h == null ? void 0 : h.password_label), /* @__PURE__ */ p.createElement(
    _e,
    {
      id: "password",
      name: "password",
      placeholder: h == null ? void 0 : h.password_input_placeholder,
      type: "password",
      autoFocus: !0,
      onChange: (g) => s(g.target.value),
      appearance: t
    }
  )), /* @__PURE__ */ p.createElement(
    He,
    {
      type: "submit",
      color: "primary",
      loading: c,
      appearance: t
    },
    c ? h == null ? void 0 : h.loading_button_label : h == null ? void 0 : h.button_label
  ), a && /* @__PURE__ */ p.createElement(oe, { appearance: t }, a), i && /* @__PURE__ */ p.createElement(oe, { color: "danger", appearance: t }, i)));
}
function wo({
  setAuthView: n = () => {
  },
  supabaseClient: e,
  otpType: t = "email",
  i18n: r,
  appearance: s,
  showLinks: i = !1
}) {
  var o;
  const [a, l] = P.useState(""), [c, u] = P.useState(""), [d, h] = P.useState(""), [g, m] = P.useState(""), [w, v] = P.useState(""), [y, _] = P.useState(!1), b = async (E) => {
    E.preventDefault(), m(""), v(""), _(!0);
    let C = {
      email: a,
      token: d,
      type: t
    };
    ["sms", "phone_change"].includes(t) && (C = {
      phone: c,
      token: d,
      type: t
    });
    const { error: x } = await e.auth.verifyOtp(C);
    x && m(x.message), _(!1);
  }, k = r == null ? void 0 : r.verify_otp;
  return /* @__PURE__ */ p.createElement("form", { id: "auth-magic-link", onSubmit: b }, /* @__PURE__ */ p.createElement(ie, { gap: "large", direction: "vertical", appearance: s }, ["sms", "phone_change"].includes(t) ? /* @__PURE__ */ p.createElement("div", null, /* @__PURE__ */ p.createElement(we, { htmlFor: "phone", appearance: s }, k == null ? void 0 : k.phone_input_label), /* @__PURE__ */ p.createElement(
    _e,
    {
      id: "phone",
      name: "phone",
      type: "text",
      autoFocus: !0,
      placeholder: k == null ? void 0 : k.phone_input_placeholder,
      onChange: (E) => u(E.target.value),
      appearance: s
    }
  )) : /* @__PURE__ */ p.createElement("div", null, /* @__PURE__ */ p.createElement(we, { htmlFor: "email", appearance: s }, k == null ? void 0 : k.email_input_label), /* @__PURE__ */ p.createElement(
    _e,
    {
      id: "email",
      name: "email",
      type: "email",
      autoFocus: !0,
      placeholder: k == null ? void 0 : k.email_input_placeholder,
      onChange: (E) => l(E.target.value),
      appearance: s
    }
  )), /* @__PURE__ */ p.createElement("div", null, /* @__PURE__ */ p.createElement(we, { htmlFor: "token", appearance: s }, k == null ? void 0 : k.token_input_label), /* @__PURE__ */ p.createElement(
    _e,
    {
      id: "token",
      name: "token",
      type: "text",
      placeholder: k == null ? void 0 : k.token_input_placeholder,
      onChange: (E) => h(E.target.value),
      appearance: s
    }
  )), /* @__PURE__ */ p.createElement(
    He,
    {
      color: "primary",
      type: "submit",
      loading: y,
      appearance: s
    },
    y ? k == null ? void 0 : k.loading_button_label : k == null ? void 0 : k.button_label
  ), i && /* @__PURE__ */ p.createElement(
    Te,
    {
      href: "#auth-sign-in",
      onClick: (E) => {
        E.preventDefault(), n(H.SIGN_IN);
      },
      appearance: s
    },
    (o = r == null ? void 0 : r.sign_in) == null ? void 0 : o.link_text
  ), w && /* @__PURE__ */ p.createElement(oe, { appearance: s }, w), g && /* @__PURE__ */ p.createElement(oe, { color: "danger", appearance: s }, g)));
}
const Zr = P.createContext({ user: null, session: null }), yo = (n) => {
  const { supabaseClient: e } = n, [t, r] = P.useState(null), [s, i] = P.useState((t == null ? void 0 : t.user) ?? null);
  P.useEffect(() => {
    (async () => {
      var l;
      const { data: c } = await e.auth.getSession();
      r(c.session), i(((l = c.session) == null ? void 0 : l.user) ?? null);
    })();
    const { data: a } = e.auth.onAuthStateChange(
      async (l, c) => {
        r(c), i((c == null ? void 0 : c.user) ?? null);
      }
    );
    return () => {
      a == null || a.subscription.unsubscribe();
    };
  }, []);
  const o = {
    session: t,
    user: s
  };
  return /* @__PURE__ */ p.createElement(Zr.Provider, { value: o, ...n });
}, bo = () => {
  const n = P.useContext(Zr);
  if (n === void 0)
    throw new Error("useUser must be used within a UserContextProvider.");
  return n;
};
function Ve({
  supabaseClient: n,
  socialLayout: e = "vertical",
  providers: t,
  providerScopes: r,
  queryParams: s,
  view: i = "sign_in",
  redirectTo: o,
  onlyThirdPartyProviders: a = !1,
  magicLink: l = !1,
  showLinks: c = !0,
  appearance: u,
  theme: d = "default",
  localization: h = { variables: {} },
  otpType: g = "email",
  additionalData: m,
  children: w
}) {
  const v = Et(qi, h.variables ?? {}), [y, _] = P.useState(i), [b, k] = P.useState(""), [E, C] = P.useState(""), x = y === "sign_in" || y === "sign_up" || y === "magic_link";
  P.useEffect(() => {
    var M, F;
    Vr({
      theme: Et(
        ((M = u == null ? void 0 : u.theme) == null ? void 0 : M.default) ?? {},
        ((F = u == null ? void 0 : u.variables) == null ? void 0 : F.default) ?? {}
      )
    });
  }, [u]);
  const B = ({ children: M }) => {
    var F;
    return (
      // @ts-ignore
      /* @__PURE__ */ p.createElement(
        "div",
        {
          className: d !== "default" ? Di(
            Et(
              // @ts-ignore
              u == null ? void 0 : u.theme[d],
              ((F = u == null ? void 0 : u.variables) == null ? void 0 : F[d]) ?? {}
            )
          ) : ""
        },
        x && /* @__PURE__ */ p.createElement(
          _o,
          {
            appearance: u,
            supabaseClient: n,
            providers: t,
            providerScopes: r,
            queryParams: s,
            socialLayout: e,
            redirectTo: o,
            onlyThirdPartyProviders: a,
            i18n: v,
            view: y
          }
        ),
        !a && M
      )
    );
  };
  P.useEffect(() => {
    const { data: M } = n.auth.onAuthStateChange(
      (F) => {
        F === "PASSWORD_RECOVERY" ? _("update_password") : F === "USER_UPDATED" && _("sign_in");
      }
    );
    return _(i), () => M.subscription.unsubscribe();
  }, [i]);
  const N = {
    supabaseClient: n,
    setAuthView: _,
    defaultEmail: b,
    defaultPassword: E,
    setDefaultEmail: k,
    setDefaultPassword: C,
    redirectTo: o,
    magicLink: l,
    showLinks: c,
    i18n: v,
    appearance: u
  };
  switch (y) {
    case H.SIGN_IN:
      return /* @__PURE__ */ p.createElement(B, null, /* @__PURE__ */ p.createElement(Er, { ...N, authView: "sign_in" }));
    case H.SIGN_UP:
      return /* @__PURE__ */ p.createElement(B, null, /* @__PURE__ */ p.createElement(
        Er,
        {
          appearance: u,
          supabaseClient: n,
          authView: "sign_up",
          setAuthView: _,
          defaultEmail: b,
          defaultPassword: E,
          setDefaultEmail: k,
          setDefaultPassword: C,
          redirectTo: o,
          magicLink: l,
          showLinks: c,
          i18n: v,
          additionalData: m,
          children: w
        }
      ));
    case H.FORGOTTEN_PASSWORD:
      return /* @__PURE__ */ p.createElement(B, null, /* @__PURE__ */ p.createElement(
        Jr,
        {
          appearance: u,
          supabaseClient: n,
          setAuthView: _,
          redirectTo: o,
          showLinks: c,
          i18n: v
        }
      ));
    case H.MAGIC_LINK:
      return /* @__PURE__ */ p.createElement(B, null, /* @__PURE__ */ p.createElement(
        Kr,
        {
          appearance: u,
          supabaseClient: n,
          setAuthView: _,
          redirectTo: o,
          showLinks: c,
          i18n: v
        }
      ));
    case H.UPDATE_PASSWORD:
      return /* @__PURE__ */ p.createElement(
        Yr,
        {
          appearance: u,
          supabaseClient: n,
          i18n: v
        }
      );
    case H.VERIFY_OTP:
      return /* @__PURE__ */ p.createElement(
        wo,
        {
          appearance: u,
          supabaseClient: n,
          otpType: g,
          i18n: v
        }
      );
    default:
      return null;
  }
}
Ve.ForgottenPassword = Jr;
Ve.UpdatePassword = Yr;
Ve.MagicLink = Kr;
Ve.UserContextProvider = yo;
Ve.useUser = bo;
he({
  borderRadius: "12px",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  width: "360px",
  padding: "28px 32px"
});
function So({ supabaseUrl: n, supabaseAnonKey: e, onSessionChange: t }) {
  const [r, s] = P.useState(null), i = ui(n, e);
  return P.useEffect(() => {
    i.auth.getSession().then(({ data: { session: a } }) => {
      s(a), t == null || t(a), console.log("session", a);
    });
    const {
      data: { subscription: o }
    } = i.auth.onAuthStateChange((a, l) => {
      s(l), t == null || t(l);
    });
    return () => o.unsubscribe();
  }, [i, t]), r ? null : /* @__PURE__ */ te.jsx(
    Ve,
    {
      supabaseClient: i,
      appearance: { theme: Mi }
    }
  );
}
function ko({ title: n, content: e, pinned: t, user: r, onClick: s }) {
  r && (n = "@" + r.username);
  const i = e.split(`
`).map((o, a) => /* @__PURE__ */ te.jsxs("span", { children: [
    o,
    /* @__PURE__ */ te.jsx("br", {})
  ] }, a));
  return /* @__PURE__ */ te.jsxs(
    "div",
    {
      onClick: () => {
        s && s();
      },
      className: `
            rounded-lg
            p-4
            mt-4

            Card
        `,
      children: [
        t && /* @__PURE__ */ te.jsx("div", { className: "text-sm text-yellow-500 font-bold mb-2", children: "📌" }),
        /* @__PURE__ */ te.jsx("h2", { className: "text-lg font-semibold", children: n }),
        /* @__PURE__ */ te.jsx("p", { className: "mt-2", children: i })
      ]
    }
  );
}
const Eo = [
  "https://pnlhagzgdvquioqyxggs.supabase.co",
  "sb_publishable_lt7_lAielqBkFbLCgQhqOA_u9ASI_pB"
], [To, Co] = Eo;
function Ro({ title: n = "🛠 full send item", className: e }) {
  function t() {
    alert("Item sent! 🚀");
  }
  return /* @__PURE__ */ te.jsxs("div", { className: e, children: [
    /* @__PURE__ */ te.jsx(ko, { title: n, content: "⚠ owo. we need to make dis editabwu", pinned: !0 }),
    /* @__PURE__ */ te.jsx(
      So,
      {
        supabaseUrl: To,
        supabaseAnonKey: Co
      }
    ),
    /* @__PURE__ */ te.jsx("div", { className: "card", children: /* @__PURE__ */ te.jsx("button", { onClick: () => t(), children: "🚀 add item" }) })
  ] });
}
export {
  Ro as A,
  ss as a,
  te as j,
  P as r
};
