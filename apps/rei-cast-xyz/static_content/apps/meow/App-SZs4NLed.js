import we, { useState as ye } from "react";
var A = { exports: {} }, y = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fe;
function Re() {
  if (fe) return y;
  fe = 1;
  var s = Symbol.for("react.transitional.element"), g = Symbol.for("react.fragment");
  function E(d, u, c) {
    var v = null;
    if (c !== void 0 && (v = "" + c), u.key !== void 0 && (v = "" + u.key), "key" in u) {
      c = {};
      for (var x in u)
        x !== "key" && (c[x] = u[x]);
    } else c = u;
    return u = c.ref, {
      $$typeof: s,
      type: d,
      key: v,
      ref: u !== void 0 ? u : null,
      props: c
    };
  }
  return y.Fragment = g, y.jsx = E, y.jsxs = E, y;
}
var R = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var de;
function ke() {
  return de || (de = 1, process.env.NODE_ENV !== "production" && function() {
    function s(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === _e ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case Y:
          return "Fragment";
        case he:
          return "Portal";
        case I:
          return "Profiler";
        case F:
          return "StrictMode";
        case $:
          return "Suspense";
        case W:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case Z:
            return (e.displayName || "Context") + ".Provider";
          case L:
            return (e._context.displayName || "Context") + ".Consumer";
          case M:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case U:
            return r = e.displayName || null, r !== null ? r : s(e.type) || "Memo";
          case q:
            r = e._payload, e = e._init;
            try {
              return s(e(r));
            } catch {
            }
        }
      return null;
    }
    function g(e) {
      return "" + e;
    }
    function E(e) {
      try {
        g(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var t = r.error, n = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          n
        ), g(e);
      }
    }
    function d() {
    }
    function u() {
      if (C === 0) {
        D = console.log, ee = console.info, re = console.warn, te = console.error, oe = console.group, ne = console.groupCollapsed, ae = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: d,
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
      C++;
    }
    function c() {
      if (C--, C === 0) {
        var e = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: p({}, e, { value: D }),
          info: p({}, e, { value: ee }),
          warn: p({}, e, { value: re }),
          error: p({}, e, { value: te }),
          group: p({}, e, { value: oe }),
          groupCollapsed: p({}, e, { value: ne }),
          groupEnd: p({}, e, { value: ae })
        });
      }
      0 > C && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function v(e) {
      if (z === void 0)
        try {
          throw Error();
        } catch (t) {
          var r = t.stack.trim().match(/\n( *(at )?)/);
          z = r && r[1] || "", ue = -1 < t.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < t.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + z + e + ue;
    }
    function x(e, r) {
      if (!e || V) return "";
      var t = G.get(e);
      if (t !== void 0) return t;
      V = !0, t = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var n = null;
      n = h.H, h.H = null, u();
      try {
        var l = {
          DetermineComponentFrameRoot: function() {
            try {
              if (r) {
                var j = function() {
                  throw Error();
                };
                if (Object.defineProperty(j.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(j, []);
                  } catch (m) {
                    var k = m;
                  }
                  Reflect.construct(e, [], j);
                } else {
                  try {
                    j.call();
                  } catch (m) {
                    k = m;
                  }
                  e.call(j.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (m) {
                  k = m;
                }
                (j = e()) && typeof j.catch == "function" && j.catch(function() {
                });
              }
            } catch (m) {
              if (m && k && typeof m.stack == "string")
                return [m.stack, k.stack];
            }
            return [null, null];
          }
        };
        l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var a = Object.getOwnPropertyDescriptor(
          l.DetermineComponentFrameRoot,
          "name"
        );
        a && a.configurable && Object.defineProperty(
          l.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var o = l.DetermineComponentFrameRoot(), b = o[0], T = o[1];
        if (b && T) {
          var i = b.split(`
`), _ = T.split(`
`);
          for (o = a = 0; a < i.length && !i[a].includes(
            "DetermineComponentFrameRoot"
          ); )
            a++;
          for (; o < _.length && !_[o].includes(
            "DetermineComponentFrameRoot"
          ); )
            o++;
          if (a === i.length || o === _.length)
            for (a = i.length - 1, o = _.length - 1; 1 <= a && 0 <= o && i[a] !== _[o]; )
              o--;
          for (; 1 <= a && 0 <= o; a--, o--)
            if (i[a] !== _[o]) {
              if (a !== 1 || o !== 1)
                do
                  if (a--, o--, 0 > o || i[a] !== _[o]) {
                    var w = `
` + i[a].replace(
                      " at new ",
                      " at "
                    );
                    return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), typeof e == "function" && G.set(e, w), w;
                  }
                while (1 <= a && 0 <= o);
              break;
            }
        }
      } finally {
        V = !1, h.H = n, c(), Error.prepareStackTrace = t;
      }
      return i = (i = e ? e.displayName || e.name : "") ? v(i) : "", typeof e == "function" && G.set(e, i), i;
    }
    function N(e) {
      if (e == null) return "";
      if (typeof e == "function") {
        var r = e.prototype;
        return x(
          e,
          !(!r || !r.isReactComponent)
        );
      }
      if (typeof e == "string") return v(e);
      switch (e) {
        case $:
          return v("Suspense");
        case W:
          return v("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case M:
            return e = x(e.render, !1), e;
          case U:
            return N(e.type);
          case q:
            r = e._payload, e = e._init;
            try {
              return N(e(r));
            } catch {
            }
        }
      return "";
    }
    function S() {
      var e = h.A;
      return e === null ? null : e.getOwner();
    }
    function Ee(e) {
      if (K.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function be(e, r) {
      function t() {
        le || (le = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      t.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: t,
        configurable: !0
      });
    }
    function me() {
      var e = s(this.type);
      return se[e] || (se[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function ge(e, r, t, n, l, a) {
      return t = a.ref, e = {
        $$typeof: P,
        type: e,
        key: r,
        props: a,
        _owner: l
      }, (t !== void 0 ? t : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: me
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
    function H(e, r, t, n, l, a) {
      if (typeof e == "string" || typeof e == "function" || e === Y || e === I || e === F || e === $ || e === W || e === pe || typeof e == "object" && e !== null && (e.$$typeof === q || e.$$typeof === U || e.$$typeof === Z || e.$$typeof === L || e.$$typeof === M || e.$$typeof === Te || e.getModuleId !== void 0)) {
        var o = r.children;
        if (o !== void 0)
          if (n)
            if (J(o)) {
              for (n = 0; n < o.length; n++)
                X(o[n], e);
              Object.freeze && Object.freeze(o);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else X(o, e);
      } else
        o = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? n = "null" : J(e) ? n = "array" : e !== void 0 && e.$$typeof === P ? (n = "<" + (s(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : n = typeof e, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          n,
          o
        );
      if (K.call(r, "key")) {
        o = s(e);
        var b = Object.keys(r).filter(function(i) {
          return i !== "key";
        });
        n = 0 < b.length ? "{key: someKey, " + b.join(": ..., ") + ": ...}" : "{key: someKey}", ie[o + n] || (b = 0 < b.length ? "{" + b.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          n,
          o,
          b,
          o
        ), ie[o + n] = !0);
      }
      if (o = null, t !== void 0 && (E(t), o = "" + t), Ee(r) && (E(r.key), o = "" + r.key), "key" in r) {
        t = {};
        for (var T in r)
          T !== "key" && (t[T] = r[T]);
      } else t = r;
      return o && be(
        t,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), ge(e, o, a, l, S(), t);
    }
    function X(e, r) {
      if (typeof e == "object" && e && e.$$typeof !== Ce) {
        if (J(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            O(n) && B(n, r);
          }
        else if (O(e))
          e._store && (e._store.validated = 1);
        else if (e === null || typeof e != "object" ? t = null : (t = Q && e[Q] || e["@@iterator"], t = typeof t == "function" ? t : null), typeof t == "function" && t !== e.entries && (t = t.call(e), t !== e))
          for (; !(e = t.next()).done; )
            O(e.value) && B(e.value, r);
      }
    }
    function O(e) {
      return typeof e == "object" && e !== null && e.$$typeof === P;
    }
    function B(e, r) {
      if (e._store && !e._store.validated && e.key == null && (e._store.validated = 1, r = xe(r), !ce[r])) {
        ce[r] = !0;
        var t = "";
        e && e._owner != null && e._owner !== S() && (t = null, typeof e._owner.tag == "number" ? t = s(e._owner.type) : typeof e._owner.name == "string" && (t = e._owner.name), t = " It was passed a child from " + t + ".");
        var n = h.getCurrentStack;
        h.getCurrentStack = function() {
          var l = N(e.type);
          return n && (l += n() || ""), l;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          r,
          t
        ), h.getCurrentStack = n;
      }
    }
    function xe(e) {
      var r = "", t = S();
      return t && (t = s(t.type)) && (r = `

Check the render method of \`` + t + "`."), r || (e = s(e)) && (r = `

Check the top-level render call using <` + e + ">."), r;
    }
    var je = we, P = Symbol.for("react.transitional.element"), he = Symbol.for("react.portal"), Y = Symbol.for("react.fragment"), F = Symbol.for("react.strict_mode"), I = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), Z = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), $ = Symbol.for("react.suspense"), W = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), q = Symbol.for("react.lazy"), pe = Symbol.for("react.offscreen"), Q = Symbol.iterator, _e = Symbol.for("react.client.reference"), h = je.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = Object.prototype.hasOwnProperty, p = Object.assign, Te = Symbol.for("react.client.reference"), J = Array.isArray, C = 0, D, ee, re, te, oe, ne, ae;
    d.__reactDisabledLog = !0;
    var z, ue, V = !1, G = new (typeof WeakMap == "function" ? WeakMap : Map)(), Ce = Symbol.for("react.client.reference"), le, se = {}, ie = {}, ce = {};
    R.Fragment = Y, R.jsx = function(e, r, t, n, l) {
      return H(e, r, t, !1, n, l);
    }, R.jsxs = function(e, r, t, n, l) {
      return H(e, r, t, !0, n, l);
    };
  }()), R;
}
var ve;
function Ae() {
  return ve || (ve = 1, process.env.NODE_ENV === "production" ? A.exports = Re() : A.exports = ke()), A.exports;
}
var f = Ae();
function Ne({ title: s, content: g, pinned: E, user: d, onClick: u }) {
  d && (s = "@" + d.username);
  const c = g.split(`
`).map((v, x) => /* @__PURE__ */ f.jsxs("span", { children: [
    v,
    /* @__PURE__ */ f.jsx("br", {})
  ] }, x));
  return /* @__PURE__ */ f.jsxs(
    "div",
    {
      onClick: () => {
        u && u();
      },
      className: `
            rounded-lg
            p-4
            mt-4

            Card
        `,
      children: [
        E && /* @__PURE__ */ f.jsx("div", { className: "text-sm text-yellow-500 font-bold mb-2", children: "📌" }),
        /* @__PURE__ */ f.jsx("h2", { className: "text-lg font-semibold", children: s }),
        /* @__PURE__ */ f.jsx("p", { className: "mt-2", children: c })
      ]
    }
  );
}
function Oe({ title: s = "Meow App 🐱", initialCount: g = 0, className: E }) {
  const [d, u] = ye(g);
  return /* @__PURE__ */ f.jsxs("div", { className: E, children: [
    /* @__PURE__ */ f.jsx("div", { children: /* @__PURE__ */ f.jsx("h1", { children: s }) }),
    /* @__PURE__ */ f.jsx(
      Ne,
      {
        title: "Interactive Counter",
        content: `Current count: ${d}`,
        onClick: () => u(d + 1)
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ f.jsxs("button", { onClick: () => u((c) => c + 1), children: [
        "count is ",
        d
      ] }),
      /* @__PURE__ */ f.jsx("p", { children: "This is the Meow SPA embedded in your app!" })
    ] })
  ] });
}
export {
  Oe as A,
  f as j
};
