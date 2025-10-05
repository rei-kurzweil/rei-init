import Oe, { useState as fr } from "react";
var U = { exports: {} }, $ = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ce;
function dr() {
  if (Ce) return $;
  Ce = 1;
  var _ = Oe, y = Symbol.for("react.element"), x = Symbol.for("react.fragment"), p = Object.prototype.hasOwnProperty, m = _.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, T = { key: !0, ref: !0, __self: !0, __source: !0 };
  function j(E, c, P) {
    var h, R = {}, O = null, Y = null;
    P !== void 0 && (O = "" + P), c.key !== void 0 && (O = "" + c.key), c.ref !== void 0 && (Y = c.ref);
    for (h in c) p.call(c, h) && !T.hasOwnProperty(h) && (R[h] = c[h]);
    if (E && E.defaultProps) for (h in c = E.defaultProps, c) R[h] === void 0 && (R[h] = c[h]);
    return { $$typeof: y, type: E, key: O, ref: Y, props: R, _owner: m.current };
  }
  return $.Fragment = x, $.jsx = j, $.jsxs = j, $;
}
var W = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xe;
function vr() {
  return xe || (xe = 1, process.env.NODE_ENV !== "production" && function() {
    var _ = Oe, y = Symbol.for("react.element"), x = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), j = Symbol.for("react.provider"), E = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), Z = Symbol.iterator, Se = "@@iterator";
    function we(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = Z && e[Z] || e[Se];
      return typeof r == "function" ? r : null;
    }
    var k = _.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function f(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        Pe("error", e, t);
      }
    }
    function Pe(e, r, t) {
      {
        var n = k.ReactDebugCurrentFrame, o = n.getStackAddendum();
        o !== "" && (r += "%s", t = t.concat([o]));
        var u = t.map(function(i) {
          return String(i);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var ke = !1, Ae = !1, De = !1, Fe = !1, Ie = !1, Q;
    Q = Symbol.for("react.module.reference");
    function $e(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === p || e === T || Ie || e === m || e === P || e === h || Fe || e === Y || ke || Ae || De || typeof e == "object" && e !== null && (e.$$typeof === O || e.$$typeof === R || e.$$typeof === j || e.$$typeof === E || e.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Q || e.getModuleId !== void 0));
    }
    function We(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var o = r.displayName || r.name || "";
      return o !== "" ? t + "(" + o + ")" : t;
    }
    function ee(e) {
      return e.displayName || "Context";
    }
    function C(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case p:
          return "Fragment";
        case x:
          return "Portal";
        case T:
          return "Profiler";
        case m:
          return "StrictMode";
        case P:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case E:
            var r = e;
            return ee(r) + ".Consumer";
          case j:
            var t = e;
            return ee(t._context) + ".Provider";
          case c:
            return We(e, e.render, "ForwardRef");
          case R:
            var n = e.displayName || null;
            return n !== null ? n : C(e.type) || "Memo";
          case O: {
            var o = e, u = o._payload, i = o._init;
            try {
              return C(i(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var S = Object.assign, F = 0, re, te, ne, ae, ie, oe, ue;
    function se() {
    }
    se.__reactDisabledLog = !0;
    function Ye() {
      {
        if (F === 0) {
          re = console.log, te = console.info, ne = console.warn, ae = console.error, ie = console.group, oe = console.groupCollapsed, ue = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: se,
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
        F++;
      }
    }
    function Me() {
      {
        if (F--, F === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: S({}, e, {
              value: re
            }),
            info: S({}, e, {
              value: te
            }),
            warn: S({}, e, {
              value: ne
            }),
            error: S({}, e, {
              value: ae
            }),
            group: S({}, e, {
              value: ie
            }),
            groupCollapsed: S({}, e, {
              value: oe
            }),
            groupEnd: S({}, e, {
              value: ue
            })
          });
        }
        F < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var J = k.ReactCurrentDispatcher, q;
    function M(e, r, t) {
      {
        if (q === void 0)
          try {
            throw Error();
          } catch (o) {
            var n = o.stack.trim().match(/\n( *(at )?)/);
            q = n && n[1] || "";
          }
        return `
` + q + e;
      }
    }
    var B = !1, N;
    {
      var Ne = typeof WeakMap == "function" ? WeakMap : Map;
      N = new Ne();
    }
    function le(e, r) {
      if (!e || B)
        return "";
      {
        var t = N.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      B = !0;
      var o = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = J.current, J.current = null, Ye();
      try {
        if (r) {
          var i = function() {
            throw Error();
          };
          if (Object.defineProperty(i.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(i, []);
            } catch (v) {
              n = v;
            }
            Reflect.construct(e, [], i);
          } else {
            try {
              i.call();
            } catch (v) {
              n = v;
            }
            e.call(i.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (v) {
            n = v;
          }
          e();
        }
      } catch (v) {
        if (v && n && typeof v.stack == "string") {
          for (var a = v.stack.split(`
`), d = n.stack.split(`
`), s = a.length - 1, l = d.length - 1; s >= 1 && l >= 0 && a[s] !== d[l]; )
            l--;
          for (; s >= 1 && l >= 0; s--, l--)
            if (a[s] !== d[l]) {
              if (s !== 1 || l !== 1)
                do
                  if (s--, l--, l < 0 || a[s] !== d[l]) {
                    var g = `
` + a[s].replace(" at new ", " at ");
                    return e.displayName && g.includes("<anonymous>") && (g = g.replace("<anonymous>", e.displayName)), typeof e == "function" && N.set(e, g), g;
                  }
                while (s >= 1 && l >= 0);
              break;
            }
        }
      } finally {
        B = !1, J.current = u, Me(), Error.prepareStackTrace = o;
      }
      var D = e ? e.displayName || e.name : "", w = D ? M(D) : "";
      return typeof e == "function" && N.set(e, w), w;
    }
    function Le(e, r, t) {
      return le(e, !1);
    }
    function Ve(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function L(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return le(e, Ve(e));
      if (typeof e == "string")
        return M(e);
      switch (e) {
        case P:
          return M("Suspense");
        case h:
          return M("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case c:
            return Le(e.render);
          case R:
            return L(e.type, r, t);
          case O: {
            var n = e, o = n._payload, u = n._init;
            try {
              return L(u(o), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var I = Object.prototype.hasOwnProperty, ce = {}, fe = k.ReactDebugCurrentFrame;
    function V(e) {
      if (e) {
        var r = e._owner, t = L(e.type, e._source, r ? r.type : null);
        fe.setExtraStackFrame(t);
      } else
        fe.setExtraStackFrame(null);
    }
    function Ue(e, r, t, n, o) {
      {
        var u = Function.call.bind(I);
        for (var i in e)
          if (u(e, i)) {
            var a = void 0;
            try {
              if (typeof e[i] != "function") {
                var d = Error((n || "React class") + ": " + t + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw d.name = "Invariant Violation", d;
              }
              a = e[i](r, i, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (s) {
              a = s;
            }
            a && !(a instanceof Error) && (V(o), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, i, typeof a), V(null)), a instanceof Error && !(a.message in ce) && (ce[a.message] = !0, V(o), f("Failed %s type: %s", t, a.message), V(null));
          }
      }
    }
    var Je = Array.isArray;
    function K(e) {
      return Je(e);
    }
    function qe(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Be(e) {
      try {
        return de(e), !1;
      } catch {
        return !0;
      }
    }
    function de(e) {
      return "" + e;
    }
    function ve(e) {
      if (Be(e))
        return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", qe(e)), de(e);
    }
    var pe = k.ReactCurrentOwner, Ke = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, he, be;
    function Ge(e) {
      if (I.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function ze(e) {
      if (I.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Xe(e, r) {
      typeof e.ref == "string" && pe.current;
    }
    function He(e, r) {
      {
        var t = function() {
          he || (he = !0, f("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function Ze(e, r) {
      {
        var t = function() {
          be || (be = !0, f("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var Qe = function(e, r, t, n, o, u, i) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: y,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: i,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function er(e, r, t, n, o) {
      {
        var u, i = {}, a = null, d = null;
        t !== void 0 && (ve(t), a = "" + t), ze(r) && (ve(r.key), a = "" + r.key), Ge(r) && (d = r.ref, Xe(r, o));
        for (u in r)
          I.call(r, u) && !Ke.hasOwnProperty(u) && (i[u] = r[u]);
        if (e && e.defaultProps) {
          var s = e.defaultProps;
          for (u in s)
            i[u] === void 0 && (i[u] = s[u]);
        }
        if (a || d) {
          var l = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && He(i, l), d && Ze(i, l);
        }
        return Qe(e, a, d, o, n, pe.current, i);
      }
    }
    var G = k.ReactCurrentOwner, ge = k.ReactDebugCurrentFrame;
    function A(e) {
      if (e) {
        var r = e._owner, t = L(e.type, e._source, r ? r.type : null);
        ge.setExtraStackFrame(t);
      } else
        ge.setExtraStackFrame(null);
    }
    var z;
    z = !1;
    function X(e) {
      return typeof e == "object" && e !== null && e.$$typeof === y;
    }
    function me() {
      {
        if (G.current) {
          var e = C(G.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function rr(e) {
      return "";
    }
    var ye = {};
    function tr(e) {
      {
        var r = me();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Ee(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = tr(r);
        if (ye[t])
          return;
        ye[t] = !0;
        var n = "";
        e && e._owner && e._owner !== G.current && (n = " It was passed a child from " + C(e._owner.type) + "."), A(e), f('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), A(null);
      }
    }
    function Re(e, r) {
      {
        if (typeof e != "object")
          return;
        if (K(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            X(n) && Ee(n, r);
          }
        else if (X(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var o = we(e);
          if (typeof o == "function" && o !== e.entries)
            for (var u = o.call(e), i; !(i = u.next()).done; )
              X(i.value) && Ee(i.value, r);
        }
      }
    }
    function nr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === R))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = C(r);
          Ue(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !z) {
          z = !0;
          var o = C(r);
          f("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", o || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && f("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ar(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            A(e), f("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), A(null);
            break;
          }
        }
        e.ref !== null && (A(e), f("Invalid attribute `ref` supplied to `React.Fragment`."), A(null));
      }
    }
    var _e = {};
    function Te(e, r, t, n, o, u) {
      {
        var i = $e(e);
        if (!i) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var d = rr();
          d ? a += d : a += me();
          var s;
          e === null ? s = "null" : K(e) ? s = "array" : e !== void 0 && e.$$typeof === y ? (s = "<" + (C(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : s = typeof e, f("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", s, a);
        }
        var l = er(e, r, t, o, u);
        if (l == null)
          return l;
        if (i) {
          var g = r.children;
          if (g !== void 0)
            if (n)
              if (K(g)) {
                for (var D = 0; D < g.length; D++)
                  Re(g[D], e);
                Object.freeze && Object.freeze(g);
              } else
                f("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Re(g, e);
        }
        if (I.call(r, "key")) {
          var w = C(e), v = Object.keys(r).filter(function(cr) {
            return cr !== "key";
          }), H = v.length > 0 ? "{key: someKey, " + v.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!_e[w + H]) {
            var lr = v.length > 0 ? "{" + v.join(": ..., ") + ": ...}" : "{}";
            f(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, H, w, lr, w), _e[w + H] = !0;
          }
        }
        return e === p ? ar(l) : nr(l), l;
      }
    }
    function ir(e, r, t) {
      return Te(e, r, t, !0);
    }
    function or(e, r, t) {
      return Te(e, r, t, !1);
    }
    var ur = or, sr = ir;
    W.Fragment = p, W.jsx = ur, W.jsxs = sr;
  }()), W;
}
var je;
function pr() {
  return je || (je = 1, process.env.NODE_ENV === "production" ? U.exports = dr() : U.exports = vr()), U.exports;
}
var b = pr();
function hr({ title: _, content: y, pinned: x, user: p, onClick: m }) {
  p && (_ = "@" + p.username);
  const T = y.split(`
`).map((j, E) => /* @__PURE__ */ b.jsxs("span", { children: [
    j,
    /* @__PURE__ */ b.jsx("br", {})
  ] }, E));
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      onClick: () => {
        m && m();
      },
      className: `
            rounded-lg
            p-4
            mt-4

            Card
        `,
      children: [
        x && /* @__PURE__ */ b.jsx("div", { className: "text-sm text-yellow-500 font-bold mb-2", children: "📌" }),
        /* @__PURE__ */ b.jsx("h2", { className: "text-lg font-semibold", children: _ }),
        /* @__PURE__ */ b.jsx("p", { className: "mt-2", children: T })
      ]
    }
  );
}
function gr({ title: _ = "Meow App 🐱", initialCount: y = 0, className: x }) {
  const [p, m] = fr(y);
  return /* @__PURE__ */ b.jsxs("div", { className: x, children: [
    /* @__PURE__ */ b.jsx("div", { children: /* @__PURE__ */ b.jsx("h1", { children: _ }) }),
    /* @__PURE__ */ b.jsx(
      hr,
      {
        title: "Interactive Counter",
        content: `Current count: ${p}`,
        onClick: () => m(p + 1)
      }
    ),
    /* @__PURE__ */ b.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ b.jsxs("button", { onClick: () => m((T) => T + 1), children: [
        "count is ",
        p
      ] }),
      /* @__PURE__ */ b.jsx("p", { children: "This is the Meow SPA embedded in your app!" })
    ] })
  ] });
}
export {
  gr as A,
  b as j
};
