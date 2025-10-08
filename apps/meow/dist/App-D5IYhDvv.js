var Kr = Object.defineProperty;
var Jr = (s, e, t) => e in s ? Kr(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var nt = (s, e, t) => Jr(s, typeof e != "symbol" ? e + "" : e, t);
import f, { useState as j, useEffect as Ve, useRef as Yr, createContext as Zr, useContext as Qr } from "react";
function Xr(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
function es(s) {
  if (Object.prototype.hasOwnProperty.call(s, "__esModule")) return s;
  var e = s.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(s).forEach(function(r) {
    var n = Object.getOwnPropertyDescriptor(s, r);
    Object.defineProperty(t, r, n.get ? n : {
      enumerable: !0,
      get: function() {
        return s[r];
      }
    });
  }), t;
}
var it = { exports: {} }, Ne = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ut;
function ts() {
  if (Ut) return Ne;
  Ut = 1;
  var s = Symbol.for("react.transitional.element"), e = Symbol.for("react.fragment");
  function t(r, n, i) {
    var o = null;
    if (i !== void 0 && (o = "" + i), n.key !== void 0 && (o = "" + n.key), "key" in n) {
      i = {};
      for (var a in n)
        a !== "key" && (i[a] = n[a]);
    } else i = n;
    return n = i.ref, {
      $$typeof: s,
      type: r,
      key: o,
      ref: n !== void 0 ? n : null,
      props: i
    };
  }
  return Ne.Fragment = e, Ne.jsx = t, Ne.jsxs = t, Ne;
}
var Nt;
function rs() {
  return Nt || (Nt = 1, it.exports = ts()), it.exports;
}
var R = rs();
const ss = (s) => {
  let e;
  return s ? e = s : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => Le).then(({ default: r }) => r(...t)) : e = fetch, (...t) => e(...t);
};
class $t extends Error {
  constructor(e, t = "FunctionsError", r) {
    super(e), this.name = t, this.context = r;
  }
}
class Dt extends $t {
  constructor(e) {
    super("Failed to send a request to the Edge Function", "FunctionsFetchError", e);
  }
}
class Mt extends $t {
  constructor(e) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", e);
  }
}
class Ft extends $t {
  constructor(e) {
    super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e);
  }
}
var mt;
(function(s) {
  s.Any = "any", s.ApNortheast1 = "ap-northeast-1", s.ApNortheast2 = "ap-northeast-2", s.ApSouth1 = "ap-south-1", s.ApSoutheast1 = "ap-southeast-1", s.ApSoutheast2 = "ap-southeast-2", s.CaCentral1 = "ca-central-1", s.EuCentral1 = "eu-central-1", s.EuWest1 = "eu-west-1", s.EuWest2 = "eu-west-2", s.EuWest3 = "eu-west-3", s.SaEast1 = "sa-east-1", s.UsEast1 = "us-east-1", s.UsWest1 = "us-west-1", s.UsWest2 = "us-west-2";
})(mt || (mt = {}));
var ns = function(s, e, t, r) {
  function n(i) {
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
      u.done ? i(u.value) : n(u.value).then(a, l);
    }
    c((r = r.apply(s, e || [])).next());
  });
};
class is {
  constructor(e, { headers: t = {}, customFetch: r, region: n = mt.Any } = {}) {
    this.url = e, this.headers = t, this.region = n, this.fetch = ss(r);
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
    return ns(this, void 0, void 0, function* () {
      try {
        const { headers: n, method: i, body: o, signal: a } = t;
        let l = {}, { region: c } = t;
        c || (c = this.region);
        const u = new URL(`${this.url}/${e}`);
        c && c !== "any" && (l["x-region"] = c, u.searchParams.set("forceFunctionRegion", c));
        let d;
        o && (n && !Object.prototype.hasOwnProperty.call(n, "Content-Type") || !n) && (typeof Blob < "u" && o instanceof Blob || o instanceof ArrayBuffer ? (l["Content-Type"] = "application/octet-stream", d = o) : typeof o == "string" ? (l["Content-Type"] = "text/plain", d = o) : typeof FormData < "u" && o instanceof FormData ? d = o : (l["Content-Type"] = "application/json", d = JSON.stringify(o)));
        const h = yield this.fetch(u.toString(), {
          method: i || "POST",
          // headers priority is (high to low):
          // 1. invoke-level headers
          // 2. client-level headers
          // 3. default Content-Type header
          headers: Object.assign(Object.assign(Object.assign({}, l), this.headers), n),
          body: d,
          signal: a
        }).catch((m) => {
          throw m.name === "AbortError" ? m : new Dt(m);
        }), p = h.headers.get("x-relay-error");
        if (p && p === "true")
          throw new Mt(h);
        if (!h.ok)
          throw new Ft(h);
        let g = ((r = h.headers.get("Content-Type")) !== null && r !== void 0 ? r : "text/plain").split(";")[0].trim(), _;
        return g === "application/json" ? _ = yield h.json() : g === "application/octet-stream" ? _ = yield h.blob() : g === "text/event-stream" ? _ = h : g === "multipart/form-data" ? _ = yield h.formData() : _ = yield h.text(), { data: _, error: null, response: h };
      } catch (n) {
        return n instanceof Error && n.name === "AbortError" ? { data: null, error: new Dt(n) } : {
          data: null,
          error: n,
          response: n instanceof Ft || n instanceof Mt ? n.context : void 0
        };
      }
    });
  }
}
var D = {}, we = {}, be = {}, ye = {}, ke = {}, Se = {}, os = function() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof globalThis < "u")
    return globalThis;
  throw new Error("unable to locate global object");
}, Re = os();
const as = Re.fetch, br = Re.fetch.bind(Re), yr = Re.Headers, ls = Re.Request, cs = Re.Response, Le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Headers: yr,
  Request: ls,
  Response: cs,
  default: br,
  fetch: as
}, Symbol.toStringTag, { value: "Module" })), us = /* @__PURE__ */ es(Le);
var Ye = {}, Wt;
function kr() {
  if (Wt) return Ye;
  Wt = 1, Object.defineProperty(Ye, "__esModule", { value: !0 });
  class s extends Error {
    constructor(t) {
      super(t.message), this.name = "PostgrestError", this.details = t.details, this.hint = t.hint, this.code = t.code;
    }
  }
  return Ye.default = s, Ye;
}
var zt;
function Sr() {
  if (zt) return Se;
  zt = 1;
  var s = Se && Se.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(Se, "__esModule", { value: !0 });
  const e = s(us), t = s(kr());
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
        var u, d, h, p;
        let g = null, _ = null, m = null, w = c.status, v = c.statusText;
        if (c.ok) {
          if (this.method !== "HEAD") {
            const S = await c.text();
            S === "" || (this.headers.get("Accept") === "text/csv" || this.headers.get("Accept") && (!((u = this.headers.get("Accept")) === null || u === void 0) && u.includes("application/vnd.pgrst.plan+text")) ? _ = S : _ = JSON.parse(S));
          }
          const y = (d = this.headers.get("Prefer")) === null || d === void 0 ? void 0 : d.match(/count=(exact|planned|estimated)/), E = (h = c.headers.get("content-range")) === null || h === void 0 ? void 0 : h.split("/");
          y && E && E.length > 1 && (m = parseInt(E[1])), this.isMaybeSingle && this.method === "GET" && Array.isArray(_) && (_.length > 1 ? (g = {
            // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
            code: "PGRST116",
            details: `Results contain ${_.length} rows, application/vnd.pgrst.object+json requires 1 row`,
            hint: null,
            message: "JSON object requested, multiple (or no) rows returned"
          }, _ = null, m = null, w = 406, v = "Not Acceptable") : _.length === 1 ? _ = _[0] : _ = null);
        } else {
          const y = await c.text();
          try {
            g = JSON.parse(y), Array.isArray(g) && c.status === 404 && (_ = [], g = null, w = 200, v = "OK");
          } catch {
            c.status === 404 && y === "" ? (w = 204, v = "No Content") : g = {
              message: y
            };
          }
          if (g && this.isMaybeSingle && (!((p = g == null ? void 0 : g.details) === null || p === void 0) && p.includes("0 rows")) && (g = null, w = 200, v = "OK"), g && this.shouldThrowOnError)
            throw new t.default(g);
        }
        return {
          error: g,
          data: _,
          count: m,
          status: w,
          statusText: v
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
  return Se.default = r, Se;
}
var qt;
function Er() {
  if (qt) return ke;
  qt = 1;
  var s = ke && ke.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(ke, "__esModule", { value: !0 });
  const e = s(Sr());
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
    select(n) {
      let i = !1;
      const o = (n ?? "*").split("").map((a) => /\s/.test(a) && !i ? "" : (a === '"' && (i = !i), a)).join("");
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
    order(n, { ascending: i = !0, nullsFirst: o, foreignTable: a, referencedTable: l = a } = {}) {
      const c = l ? `${l}.order` : "order", u = this.url.searchParams.get(c);
      return this.url.searchParams.set(c, `${u ? `${u},` : ""}${n}.${i ? "asc" : "desc"}${o === void 0 ? "" : o ? ".nullsfirst" : ".nullslast"}`), this;
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
    limit(n, { foreignTable: i, referencedTable: o = i } = {}) {
      const a = typeof o > "u" ? "limit" : `${o}.limit`;
      return this.url.searchParams.set(a, `${n}`), this;
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
    range(n, i, { foreignTable: o, referencedTable: a = o } = {}) {
      const l = typeof a > "u" ? "offset" : `${a}.offset`, c = typeof a > "u" ? "limit" : `${a}.limit`;
      return this.url.searchParams.set(l, `${n}`), this.url.searchParams.set(c, `${i - n + 1}`), this;
    }
    /**
     * Set the AbortSignal for the fetch request.
     *
     * @param signal - The AbortSignal to use for the fetch request
     */
    abortSignal(n) {
      return this.signal = n, this;
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
    explain({ analyze: n = !1, verbose: i = !1, settings: o = !1, buffers: a = !1, wal: l = !1, format: c = "text" } = {}) {
      var u;
      const d = [
        n ? "analyze" : null,
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
    maxAffected(n) {
      return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${n}`), this;
    }
  }
  return ke.default = t, ke;
}
var Ht;
function Pt() {
  if (Ht) return ye;
  Ht = 1;
  var s = ye && ye.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(ye, "__esModule", { value: !0 });
  const e = s(Er());
  class t extends e.default {
    /**
     * Match only rows where `column` is equal to `value`.
     *
     * To check if the value of `column` is NULL, you should use `.is()` instead.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    eq(n, i) {
      return this.url.searchParams.append(n, `eq.${i}`), this;
    }
    /**
     * Match only rows where `column` is not equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    neq(n, i) {
      return this.url.searchParams.append(n, `neq.${i}`), this;
    }
    /**
     * Match only rows where `column` is greater than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    gt(n, i) {
      return this.url.searchParams.append(n, `gt.${i}`), this;
    }
    /**
     * Match only rows where `column` is greater than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    gte(n, i) {
      return this.url.searchParams.append(n, `gte.${i}`), this;
    }
    /**
     * Match only rows where `column` is less than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    lt(n, i) {
      return this.url.searchParams.append(n, `lt.${i}`), this;
    }
    /**
     * Match only rows where `column` is less than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    lte(n, i) {
      return this.url.searchParams.append(n, `lte.${i}`), this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-sensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */
    like(n, i) {
      return this.url.searchParams.append(n, `like.${i}`), this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    likeAllOf(n, i) {
      return this.url.searchParams.append(n, `like(all).{${i.join(",")}}`), this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    likeAnyOf(n, i) {
      return this.url.searchParams.append(n, `like(any).{${i.join(",")}}`), this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-insensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */
    ilike(n, i) {
      return this.url.searchParams.append(n, `ilike.${i}`), this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    ilikeAllOf(n, i) {
      return this.url.searchParams.append(n, `ilike(all).{${i.join(",")}}`), this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    ilikeAnyOf(n, i) {
      return this.url.searchParams.append(n, `ilike(any).{${i.join(",")}}`), this;
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
    is(n, i) {
      return this.url.searchParams.append(n, `is.${i}`), this;
    }
    /**
     * Match only rows where `column` is included in the `values` array.
     *
     * @param column - The column to filter on
     * @param values - The values array to filter with
     */
    in(n, i) {
      const o = Array.from(new Set(i)).map((a) => typeof a == "string" && new RegExp("[,()]").test(a) ? `"${a}"` : `${a}`).join(",");
      return this.url.searchParams.append(n, `in.(${o})`), this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * `column` contains every element appearing in `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */
    contains(n, i) {
      return typeof i == "string" ? this.url.searchParams.append(n, `cs.${i}`) : Array.isArray(i) ? this.url.searchParams.append(n, `cs.{${i.join(",")}}`) : this.url.searchParams.append(n, `cs.${JSON.stringify(i)}`), this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * every element appearing in `column` is contained by `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */
    containedBy(n, i) {
      return typeof i == "string" ? this.url.searchParams.append(n, `cd.${i}`) : Array.isArray(i) ? this.url.searchParams.append(n, `cd.{${i.join(",")}}`) : this.url.searchParams.append(n, `cd.${JSON.stringify(i)}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is greater than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeGt(n, i) {
      return this.url.searchParams.append(n, `sr.${i}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or greater than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeGte(n, i) {
      return this.url.searchParams.append(n, `nxl.${i}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is less than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeLt(n, i) {
      return this.url.searchParams.append(n, `sl.${i}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or less than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeLte(n, i) {
      return this.url.searchParams.append(n, `nxr.${i}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where `column` is
     * mutually exclusive to `range` and there can be no element between the two
     * ranges.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeAdjacent(n, i) {
      return this.url.searchParams.append(n, `adj.${i}`), this;
    }
    /**
     * Only relevant for array and range columns. Match only rows where
     * `column` and `value` have an element in common.
     *
     * @param column - The array or range column to filter on
     * @param value - The array or range value to filter with
     */
    overlaps(n, i) {
      return typeof i == "string" ? this.url.searchParams.append(n, `ov.${i}`) : this.url.searchParams.append(n, `ov.{${i.join(",")}}`), this;
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
    textSearch(n, i, { config: o, type: a } = {}) {
      let l = "";
      a === "plain" ? l = "pl" : a === "phrase" ? l = "ph" : a === "websearch" && (l = "w");
      const c = o === void 0 ? "" : `(${o})`;
      return this.url.searchParams.append(n, `${l}fts${c}.${i}`), this;
    }
    /**
     * Match only rows where each column in `query` keys is equal to its
     * associated value. Shorthand for multiple `.eq()`s.
     *
     * @param query - The object to filter with, with column names as keys mapped
     * to their filter values
     */
    match(n) {
      return Object.entries(n).forEach(([i, o]) => {
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
    not(n, i, o) {
      return this.url.searchParams.append(n, `not.${i}.${o}`), this;
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
    or(n, { foreignTable: i, referencedTable: o = i } = {}) {
      const a = o ? `${o}.or` : "or";
      return this.url.searchParams.append(a, `(${n})`), this;
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
    filter(n, i, o) {
      return this.url.searchParams.append(n, `${i}.${o}`), this;
    }
  }
  return ye.default = t, ye;
}
var Vt;
function Tr() {
  if (Vt) return be;
  Vt = 1;
  var s = be && be.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(be, "__esModule", { value: !0 });
  const e = s(Pt());
  class t {
    constructor(n, { headers: i = {}, schema: o, fetch: a }) {
      this.url = n, this.headers = new Headers(i), this.schema = o, this.fetch = a;
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
    select(n, { head: i = !1, count: o } = {}) {
      const a = i ? "HEAD" : "GET";
      let l = !1;
      const c = (n ?? "*").split("").map((u) => /\s/.test(u) && !l ? "" : (u === '"' && (l = !l), u)).join("");
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
    insert(n, { count: i, defaultToNull: o = !0 } = {}) {
      var a;
      const l = "POST";
      if (i && this.headers.append("Prefer", `count=${i}`), o || this.headers.append("Prefer", "missing=default"), Array.isArray(n)) {
        const c = n.reduce((u, d) => u.concat(Object.keys(d)), []);
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
        body: n,
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
    upsert(n, { onConflict: i, ignoreDuplicates: o = !1, count: a, defaultToNull: l = !0 } = {}) {
      var c;
      const u = "POST";
      if (this.headers.append("Prefer", `resolution=${o ? "ignore" : "merge"}-duplicates`), i !== void 0 && this.url.searchParams.set("on_conflict", i), a && this.headers.append("Prefer", `count=${a}`), l || this.headers.append("Prefer", "missing=default"), Array.isArray(n)) {
        const d = n.reduce((h, p) => h.concat(Object.keys(p)), []);
        if (d.length > 0) {
          const h = [...new Set(d)].map((p) => `"${p}"`);
          this.url.searchParams.set("columns", h.join(","));
        }
      }
      return new e.default({
        method: u,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        body: n,
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
    update(n, { count: i } = {}) {
      var o;
      const a = "PATCH";
      return i && this.headers.append("Prefer", `count=${i}`), new e.default({
        method: a,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        body: n,
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
    delete({ count: n } = {}) {
      var i;
      const o = "DELETE";
      return n && this.headers.append("Prefer", `count=${n}`), new e.default({
        method: o,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        fetch: (i = this.fetch) !== null && i !== void 0 ? i : fetch
      });
    }
  }
  return be.default = t, be;
}
var Gt;
function ds() {
  if (Gt) return we;
  Gt = 1;
  var s = we && we.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(we, "__esModule", { value: !0 });
  const e = s(Tr()), t = s(Pt());
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
      let p;
      a || l ? (d = a ? "HEAD" : "GET", Object.entries(o).filter(([_, m]) => m !== void 0).map(([_, m]) => [_, Array.isArray(m) ? `{${m.join(",")}}` : `${m}`]).forEach(([_, m]) => {
        h.searchParams.append(_, m);
      })) : (d = "POST", p = o);
      const g = new Headers(this.headers);
      return c && g.set("Prefer", `count=${c}`), new t.default({
        method: d,
        url: h,
        headers: g,
        schema: this.schemaName,
        body: p,
        fetch: (u = this.fetch) !== null && u !== void 0 ? u : fetch
      });
    }
  }
  return we.default = r, we;
}
var Kt;
function hs() {
  if (Kt) return D;
  Kt = 1;
  var s = D && D.__importDefault || function(a) {
    return a && a.__esModule ? a : { default: a };
  };
  Object.defineProperty(D, "__esModule", { value: !0 }), D.PostgrestError = D.PostgrestBuilder = D.PostgrestTransformBuilder = D.PostgrestFilterBuilder = D.PostgrestQueryBuilder = D.PostgrestClient = void 0;
  const e = s(ds());
  D.PostgrestClient = e.default;
  const t = s(Tr());
  D.PostgrestQueryBuilder = t.default;
  const r = s(Pt());
  D.PostgrestFilterBuilder = r.default;
  const n = s(Er());
  D.PostgrestTransformBuilder = n.default;
  const i = s(Sr());
  D.PostgrestBuilder = i.default;
  const o = s(kr());
  return D.PostgrestError = o.default, D.default = {
    PostgrestClient: e.default,
    PostgrestQueryBuilder: t.default,
    PostgrestFilterBuilder: r.default,
    PostgrestTransformBuilder: n.default,
    PostgrestBuilder: i.default,
    PostgrestError: o.default
  }, D;
}
var fs = hs();
const ps = /* @__PURE__ */ Xr(fs), {
  PostgrestClient: gs,
  PostgrestQueryBuilder: Co,
  PostgrestFilterBuilder: xo,
  PostgrestTransformBuilder: jo,
  PostgrestBuilder: $o,
  PostgrestError: Po
} = ps;
class ms {
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
        const r = t.node, n = parseInt(r.replace(/^v/, "").split(".")[0]);
        return n >= 22 ? typeof globalThis.WebSocket < "u" ? { type: "native", constructor: globalThis.WebSocket } : {
          type: "unsupported",
          error: `Node.js ${n} detected but native WebSocket not found.`,
          workaround: "Provide a WebSocket implementation via the transport option."
        } : {
          type: "unsupported",
          error: `Node.js ${n} detected without native WebSocket support.`,
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
const vs = "2.15.5", _s = `realtime-js/${vs}`, ws = "1.0.0", vt = 1e4, bs = 1e3, ys = 100;
var ze;
(function(s) {
  s[s.connecting = 0] = "connecting", s[s.open = 1] = "open", s[s.closing = 2] = "closing", s[s.closed = 3] = "closed";
})(ze || (ze = {}));
var N;
(function(s) {
  s.closed = "closed", s.errored = "errored", s.joined = "joined", s.joining = "joining", s.leaving = "leaving";
})(N || (N = {}));
var V;
(function(s) {
  s.close = "phx_close", s.error = "phx_error", s.join = "phx_join", s.reply = "phx_reply", s.leave = "phx_leave", s.access_token = "access_token";
})(V || (V = {}));
var _t;
(function(s) {
  s.websocket = "websocket";
})(_t || (_t = {}));
var de;
(function(s) {
  s.Connecting = "connecting", s.Open = "open", s.Closing = "closing", s.Closed = "closed";
})(de || (de = {}));
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
    const n = t.getUint8(1), i = t.getUint8(2);
    let o = this.HEADER_LENGTH + 2;
    const a = r.decode(e.slice(o, o + n));
    o = o + n;
    const l = r.decode(e.slice(o, o + i));
    o = o + i;
    const c = JSON.parse(r.decode(e.slice(o, e.byteLength)));
    return { ref: null, topic: a, event: l, payload: c };
  }
}
class Cr {
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
var O;
(function(s) {
  s.abstime = "abstime", s.bool = "bool", s.date = "date", s.daterange = "daterange", s.float4 = "float4", s.float8 = "float8", s.int2 = "int2", s.int4 = "int4", s.int4range = "int4range", s.int8 = "int8", s.int8range = "int8range", s.json = "json", s.jsonb = "jsonb", s.money = "money", s.numeric = "numeric", s.oid = "oid", s.reltime = "reltime", s.text = "text", s.time = "time", s.timestamp = "timestamp", s.timestamptz = "timestamptz", s.timetz = "timetz", s.tsrange = "tsrange", s.tstzrange = "tstzrange";
})(O || (O = {}));
const Jt = (s, e, t = {}) => {
  var r;
  const n = (r = t.skipTypes) !== null && r !== void 0 ? r : [];
  return Object.keys(e).reduce((i, o) => (i[o] = Ss(o, s, e, n), i), {});
}, Ss = (s, e, t, r) => {
  const n = e.find((a) => a.name === s), i = n == null ? void 0 : n.type, o = t[s];
  return i && !r.includes(i) ? xr(i, o) : wt(o);
}, xr = (s, e) => {
  if (s.charAt(0) === "_") {
    const t = s.slice(1, s.length);
    return xs(e, t);
  }
  switch (s) {
    case O.bool:
      return Es(e);
    case O.float4:
    case O.float8:
    case O.int2:
    case O.int4:
    case O.int8:
    case O.numeric:
    case O.oid:
      return Ts(e);
    case O.json:
    case O.jsonb:
      return Cs(e);
    case O.timestamp:
      return js(e);
    // Format to be consistent with PostgREST
    case O.abstime:
    // To allow users to cast it based on Timezone
    case O.date:
    // To allow users to cast it based on Timezone
    case O.daterange:
    case O.int4range:
    case O.int8range:
    case O.money:
    case O.reltime:
    // To allow users to cast it based on Timezone
    case O.text:
    case O.time:
    // To allow users to cast it based on Timezone
    case O.timestamptz:
    // To allow users to cast it based on Timezone
    case O.timetz:
    // To allow users to cast it based on Timezone
    case O.tsrange:
    case O.tstzrange:
      return wt(e);
    default:
      return wt(e);
  }
}, wt = (s) => s, Es = (s) => {
  switch (s) {
    case "t":
      return !0;
    case "f":
      return !1;
    default:
      return s;
  }
}, Ts = (s) => {
  if (typeof s == "string") {
    const e = parseFloat(s);
    if (!Number.isNaN(e))
      return e;
  }
  return s;
}, Cs = (s) => {
  if (typeof s == "string")
    try {
      return JSON.parse(s);
    } catch (e) {
      return console.log(`JSON parse error: ${e}`), s;
    }
  return s;
}, xs = (s, e) => {
  if (typeof s != "string")
    return s;
  const t = s.length - 1, r = s[t];
  if (s[0] === "{" && r === "}") {
    let i;
    const o = s.slice(1, t);
    try {
      i = JSON.parse("[" + o + "]");
    } catch {
      i = o ? o.split(",") : [];
    }
    return i.map((a) => xr(e, a));
  }
  return s;
}, js = (s) => typeof s == "string" ? s.replace(" ", "T") : s, jr = (s) => {
  let e = s;
  return e = e.replace(/^ws/i, "http"), e = e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, ""), e.replace(/\/+$/, "") + "/api/broadcast";
};
class ot {
  /**
   * Initializes the Push
   *
   * @param channel The Channel
   * @param event The event, for example `"phx_join"`
   * @param payload The payload, for example `{user_id: 123}`
   * @param timeout The push timeout in milliseconds
   */
  constructor(e, t, r = {}, n = vt) {
    this.channel = e, this.event = t, this.payload = r, this.timeout = n, this.sent = !1, this.timeoutTimer = void 0, this.ref = "", this.receivedResp = null, this.recHooks = [], this.refEvent = null;
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
var Yt;
(function(s) {
  s.SYNC = "sync", s.JOIN = "join", s.LEAVE = "leave";
})(Yt || (Yt = {}));
class qe {
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
    this.channel._on(r.state, {}, (n) => {
      const { onJoin: i, onLeave: o, onSync: a } = this.caller;
      this.joinRef = this.channel._joinRef(), this.state = qe.syncState(this.state, n, i, o), this.pendingDiffs.forEach((l) => {
        this.state = qe.syncDiff(this.state, l, i, o);
      }), this.pendingDiffs = [], a();
    }), this.channel._on(r.diff, {}, (n) => {
      const { onJoin: i, onLeave: o, onSync: a } = this.caller;
      this.inPendingSyncState() ? this.pendingDiffs.push(n) : (this.state = qe.syncDiff(this.state, n, i, o), a());
    }), this.onJoin((n, i, o) => {
      this.channel._trigger("presence", {
        event: "join",
        key: n,
        currentPresences: i,
        newPresences: o
      });
    }), this.onLeave((n, i, o) => {
      this.channel._trigger("presence", {
        event: "leave",
        key: n,
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
  static syncState(e, t, r, n) {
    const i = this.cloneDeep(e), o = this.transformState(t), a = {}, l = {};
    return this.map(i, (c, u) => {
      o[c] || (l[c] = u);
    }), this.map(o, (c, u) => {
      const d = i[c];
      if (d) {
        const h = u.map((m) => m.presence_ref), p = d.map((m) => m.presence_ref), g = u.filter((m) => p.indexOf(m.presence_ref) < 0), _ = d.filter((m) => h.indexOf(m.presence_ref) < 0);
        g.length > 0 && (a[c] = g), _.length > 0 && (l[c] = _);
      } else
        a[c] = u;
    }), this.syncDiff(i, { joins: a, leaves: l }, r, n);
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
  static syncDiff(e, t, r, n) {
    const { joins: i, leaves: o } = {
      joins: this.transformState(t.joins),
      leaves: this.transformState(t.leaves)
    };
    return r || (r = () => {
    }), n || (n = () => {
    }), this.map(i, (a, l) => {
      var c;
      const u = (c = e[a]) !== null && c !== void 0 ? c : [];
      if (e[a] = this.cloneDeep(l), u.length > 0) {
        const d = e[a].map((p) => p.presence_ref), h = u.filter((p) => d.indexOf(p.presence_ref) < 0);
        e[a].unshift(...h);
      }
      r(a, u, l);
    }), this.map(o, (a, l) => {
      let c = e[a];
      if (!c)
        return;
      const u = l.map((d) => d.presence_ref);
      c = c.filter((d) => u.indexOf(d.presence_ref) < 0), e[a] = c, n(a, c, l), c.length === 0 && delete e[a];
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
      const n = e[r];
      return "metas" in n ? t[r] = n.metas.map((i) => (i.presence_ref = i.phx_ref, delete i.phx_ref, delete i.phx_ref_prev, i)) : t[r] = n, t;
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
var Zt;
(function(s) {
  s.ALL = "*", s.INSERT = "INSERT", s.UPDATE = "UPDATE", s.DELETE = "DELETE";
})(Zt || (Zt = {}));
var He;
(function(s) {
  s.BROADCAST = "broadcast", s.PRESENCE = "presence", s.POSTGRES_CHANGES = "postgres_changes", s.SYSTEM = "system";
})(He || (He = {}));
var Z;
(function(s) {
  s.SUBSCRIBED = "SUBSCRIBED", s.TIMED_OUT = "TIMED_OUT", s.CLOSED = "CLOSED", s.CHANNEL_ERROR = "CHANNEL_ERROR";
})(Z || (Z = {}));
class Ot {
  constructor(e, t = { config: {} }, r) {
    this.topic = e, this.params = t, this.socket = r, this.bindings = {}, this.state = N.closed, this.joinedOnce = !1, this.pushBuffer = [], this.subTopic = e.replace(/^realtime:/i, ""), this.params.config = Object.assign({
      broadcast: { ack: !1, self: !1 },
      presence: { key: "", enabled: !1 },
      private: !1
    }, t.config), this.timeout = this.socket.timeout, this.joinPush = new ot(this, V.join, this.params, this.timeout), this.rejoinTimer = new Cr(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs), this.joinPush.receive("ok", () => {
      this.state = N.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((n) => n.send()), this.pushBuffer = [];
    }), this._onClose(() => {
      this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`), this.state = N.closed, this.socket._remove(this);
    }), this._onError((n) => {
      this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, n), this.state = N.errored, this.rejoinTimer.scheduleTimeout());
    }), this.joinPush.receive("timeout", () => {
      this._isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), this.state = N.errored, this.rejoinTimer.scheduleTimeout());
    }), this.joinPush.receive("error", (n) => {
      this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, n), this.state = N.errored, this.rejoinTimer.scheduleTimeout());
    }), this._on(V.reply, {}, (n, i) => {
      this._trigger(this._replyEventName(i), n);
    }), this.presence = new qe(this), this.broadcastEndpointURL = jr(this.socket.endPoint), this.private = this.params.config.private || !1;
  }
  /** Subscribe registers your client with the server */
  subscribe(e, t = this.timeout) {
    var r, n, i;
    if (this.socket.isConnected() || this.socket.connect(), this.state == N.closed) {
      const { config: { broadcast: o, presence: a, private: l } } = this.params, c = (n = (r = this.bindings.postgres_changes) === null || r === void 0 ? void 0 : r.map((p) => p.filter)) !== null && n !== void 0 ? n : [], u = !!this.bindings[He.PRESENCE] && this.bindings[He.PRESENCE].length > 0 || ((i = this.params.config.presence) === null || i === void 0 ? void 0 : i.enabled) === !0, d = {}, h = {
        broadcast: o,
        presence: Object.assign(Object.assign({}, a), { enabled: u }),
        postgres_changes: c,
        private: l
      };
      this.socket.accessTokenValue && (d.access_token = this.socket.accessTokenValue), this._onError((p) => e == null ? void 0 : e(Z.CHANNEL_ERROR, p)), this._onClose(() => e == null ? void 0 : e(Z.CLOSED)), this.updateJoinPayload(Object.assign({ config: h }, d)), this.joinedOnce = !0, this._rejoin(t), this.joinPush.receive("ok", async ({ postgres_changes: p }) => {
        var g;
        if (this.socket.setAuth(), p === void 0) {
          e == null || e(Z.SUBSCRIBED);
          return;
        } else {
          const _ = this.bindings.postgres_changes, m = (g = _ == null ? void 0 : _.length) !== null && g !== void 0 ? g : 0, w = [];
          for (let v = 0; v < m; v++) {
            const b = _[v], { filter: { event: y, schema: E, table: S, filter: C } } = b, P = p && p[v];
            if (P && P.event === y && P.schema === E && P.table === S && P.filter === C)
              w.push(Object.assign(Object.assign({}, b), { id: P.id }));
            else {
              this.unsubscribe(), this.state = N.errored, e == null || e(Z.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
              return;
            }
          }
          this.bindings.postgres_changes = w, e && e(Z.SUBSCRIBED);
          return;
        }
      }).receive("error", (p) => {
        this.state = N.errored, e == null || e(Z.CHANNEL_ERROR, new Error(JSON.stringify(Object.values(p).join(", ") || "error")));
      }).receive("timeout", () => {
        e == null || e(Z.TIMED_OUT);
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
    return this.state === N.joined && e === He.PRESENCE && (this.socket.log("channel", `resubscribe to ${this.topic} due to change in presence callbacks on joined channel`), this.unsubscribe().then(() => this.subscribe())), this._on(e, t, r);
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
    var r, n;
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
        return await ((n = c.body) === null || n === void 0 ? void 0 : n.cancel()), c.ok ? "ok" : "error";
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
    this.state = N.leaving;
    const t = () => {
      this.socket.log("channel", `leave ${this.topic}`), this._trigger(V.close, "leave", this._joinRef());
    };
    this.joinPush.destroy();
    let r = null;
    return new Promise((n) => {
      r = new ot(this, V.leave, {}, e), r.receive("ok", () => {
        t(), n("ok");
      }).receive("timeout", () => {
        t(), n("timed out");
      }).receive("error", () => {
        n("error");
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
    this.pushBuffer.forEach((e) => e.destroy()), this.pushBuffer = [], this.rejoinTimer.reset(), this.joinPush.destroy(), this.state = N.closed, this.bindings = {};
  }
  /** @internal */
  async _fetchWithTimeout(e, t, r) {
    const n = new AbortController(), i = setTimeout(() => n.abort(), r), o = await this.socket.fetch(e, Object.assign(Object.assign({}, t), { signal: n.signal }));
    return clearTimeout(i), o;
  }
  /** @internal */
  _push(e, t, r = this.timeout) {
    if (!this.joinedOnce)
      throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    let n = new ot(this, e, t, r);
    return this._canPush() ? n.send() : this._addToPushBuffer(n), n;
  }
  /** @internal */
  _addToPushBuffer(e) {
    if (e.startTimeout(), this.pushBuffer.push(e), this.pushBuffer.length > ys) {
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
    var n, i;
    const o = e.toLocaleLowerCase(), { close: a, error: l, leave: c, join: u } = V;
    if (r && [a, l, c, u].indexOf(o) >= 0 && r !== this._joinRef())
      return;
    let h = this._onMessage(o, t, r);
    if (t && !h)
      throw "channel onMessage callbacks must return the payload, modified or unmodified";
    ["insert", "update", "delete"].includes(o) ? (n = this.bindings.postgres_changes) === null || n === void 0 || n.filter((p) => {
      var g, _, m;
      return ((g = p.filter) === null || g === void 0 ? void 0 : g.event) === "*" || ((m = (_ = p.filter) === null || _ === void 0 ? void 0 : _.event) === null || m === void 0 ? void 0 : m.toLocaleLowerCase()) === o;
    }).map((p) => p.callback(h, r)) : (i = this.bindings[o]) === null || i === void 0 || i.filter((p) => {
      var g, _, m, w, v, b;
      if (["broadcast", "presence", "postgres_changes"].includes(o))
        if ("id" in p) {
          const y = p.id, E = (g = p.filter) === null || g === void 0 ? void 0 : g.event;
          return y && ((_ = t.ids) === null || _ === void 0 ? void 0 : _.includes(y)) && (E === "*" || (E == null ? void 0 : E.toLocaleLowerCase()) === ((m = t.data) === null || m === void 0 ? void 0 : m.type.toLocaleLowerCase()));
        } else {
          const y = (v = (w = p == null ? void 0 : p.filter) === null || w === void 0 ? void 0 : w.event) === null || v === void 0 ? void 0 : v.toLocaleLowerCase();
          return y === "*" || y === ((b = t == null ? void 0 : t.event) === null || b === void 0 ? void 0 : b.toLocaleLowerCase());
        }
      else
        return p.type.toLocaleLowerCase() === o;
    }).map((p) => {
      if (typeof h == "object" && "ids" in h) {
        const g = h.data, { schema: _, table: m, commit_timestamp: w, type: v, errors: b } = g;
        h = Object.assign(Object.assign({}, {
          schema: _,
          table: m,
          commit_timestamp: w,
          eventType: v,
          new: {},
          old: {},
          errors: b
        }), this._getPayloadRecords(g));
      }
      p.callback(h, r);
    });
  }
  /** @internal */
  _isClosed() {
    return this.state === N.closed;
  }
  /** @internal */
  _isJoined() {
    return this.state === N.joined;
  }
  /** @internal */
  _isJoining() {
    return this.state === N.joining;
  }
  /** @internal */
  _isLeaving() {
    return this.state === N.leaving;
  }
  /** @internal */
  _replyEventName(e) {
    return `chan_reply_${e}`;
  }
  /** @internal */
  _on(e, t, r) {
    const n = e.toLocaleLowerCase(), i = {
      type: n,
      filter: t,
      callback: r
    };
    return this.bindings[n] ? this.bindings[n].push(i) : this.bindings[n] = [i], this;
  }
  /** @internal */
  _off(e, t) {
    const r = e.toLocaleLowerCase();
    return this.bindings[r] && (this.bindings[r] = this.bindings[r].filter((n) => {
      var i;
      return !(((i = n.type) === null || i === void 0 ? void 0 : i.toLocaleLowerCase()) === r && Ot.isEqual(n.filter, t));
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
    this._on(V.close, {}, e);
  }
  /**
   * Registers a callback that will be executed when the channel encounteres an error.
   *
   * @internal
   */
  _onError(e) {
    this._on(V.error, {}, (t) => e(t));
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
    this._isLeaving() || (this.socket._leaveOpenTopic(this.topic), this.state = N.joining, this.joinPush.resend(e));
  }
  /** @internal */
  _getPayloadRecords(e) {
    const t = {
      new: {},
      old: {}
    };
    return (e.type === "INSERT" || e.type === "UPDATE") && (t.new = Jt(e.columns, e.record)), (e.type === "UPDATE" || e.type === "DELETE") && (t.old = Jt(e.columns, e.old_record)), t;
  }
}
const at = () => {
}, Ze = {
  HEARTBEAT_INTERVAL: 25e3,
  RECONNECT_DELAY: 10,
  HEARTBEAT_TIMEOUT_FALLBACK: 100
}, $s = [1e3, 2e3, 5e3, 1e4], Ps = 1e4, Os = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
class As {
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
    if (this.accessTokenValue = null, this.apiKey = null, this.channels = new Array(), this.endPoint = "", this.httpEndpoint = "", this.headers = {}, this.params = {}, this.timeout = vt, this.transport = null, this.heartbeatIntervalMs = Ze.HEARTBEAT_INTERVAL, this.heartbeatTimer = void 0, this.pendingHeartbeatRef = null, this.heartbeatCallback = at, this.ref = 0, this.reconnectTimer = null, this.logger = at, this.conn = null, this.sendBuffer = [], this.serializer = new ks(), this.stateChangeCallbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    }, this.accessToken = null, this._connectionState = "disconnected", this._wasManualDisconnect = !1, this._authPromise = null, this._resolveFetch = (n) => {
      let i;
      return n ? i = n : typeof fetch > "u" ? i = (...o) => Promise.resolve().then(() => Le).then(({ default: a }) => a(...o)).catch((a) => {
        throw new Error(`Failed to load @supabase/node-fetch: ${a.message}. This is required for HTTP requests in Node.js environments without native fetch.`);
      }) : i = fetch, (...o) => i(...o);
    }, !(!((r = t == null ? void 0 : t.params) === null || r === void 0) && r.apikey))
      throw new Error("API key is required to connect to Realtime");
    this.apiKey = t.params.apikey, this.endPoint = `${e}/${_t.websocket}`, this.httpEndpoint = jr(e), this._initializeOptions(t), this._setupReconnectionTimer(), this.fetch = this._resolveFetch(t == null ? void 0 : t.fetch);
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
          this.conn = ms.createWebSocket(this.endpointURL());
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
    return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: ws }));
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
      case ze.connecting:
        return de.Connecting;
      case ze.open:
        return de.Open;
      case ze.closing:
        return de.Closing;
      default:
        return de.Closed;
    }
  }
  /**
   * Returns `true` is the connection is open.
   */
  isConnected() {
    return this.connectionState() === de.Open;
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
    const r = `realtime:${e}`, n = this.getChannels().find((i) => i.topic === r);
    if (n)
      return n;
    {
      const i = new Ot(`realtime:${e}`, t, this);
      return this.channels.push(i), i;
    }
  }
  /**
   * Push out a message if the socket is connected.
   *
   * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
   */
  push(e) {
    const { topic: t, event: r, payload: n, ref: i } = e, o = () => {
      this.encode(e, (a) => {
        var l;
        (l = this.conn) === null || l === void 0 || l.send(a);
      });
    };
    this.log("push", `${t} ${r} (${i})`, n), this.isConnected() ? o() : this.sendBuffer.push(o);
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
      }, Ze.HEARTBEAT_TIMEOUT_FALLBACK);
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
      const { topic: r, event: n, payload: i, ref: o } = t, a = o ? `(${o})` : "", l = i.status || "";
      this.log("receive", `${l} ${r} ${n} ${a}`.trim(), i), this.channels.filter((c) => c._isMember(r)).forEach((c) => c._trigger(n, i, o)), this._triggerStateCallbacks("message", t);
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
    this.channels.forEach((e) => e._trigger(V.error));
  }
  /** @internal */
  _appendParams(e, t) {
    if (Object.keys(t).length === 0)
      return e;
    const r = e.match(/\?/) ? "&" : "?", n = new URLSearchParams(t);
    return `${e}${r}${n}`;
  }
  _workerObjectUrl(e) {
    let t;
    if (e)
      t = e;
    else {
      const r = new Blob([Os], { type: "application/javascript" });
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
      const n = {
        access_token: t,
        version: _s
      };
      t && r.updateJoinPayload(n), r.joinedOnce && r._isJoined() && r._push(V.access_token, {
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
        } catch (n) {
          this.log("error", `error in ${e} callback`, n);
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
    this.reconnectTimer = new Cr(async () => {
      setTimeout(async () => {
        await this._waitForAuthIfNeeded(), this.isConnected() || this.connect();
      }, Ze.RECONNECT_DELAY);
    }, this.reconnectAfterMs);
  }
  /**
   * Initialize client options with defaults
   * @internal
   */
  _initializeOptions(e) {
    var t, r, n, i, o, a, l, c, u;
    if (this.transport = (t = e == null ? void 0 : e.transport) !== null && t !== void 0 ? t : null, this.timeout = (r = e == null ? void 0 : e.timeout) !== null && r !== void 0 ? r : vt, this.heartbeatIntervalMs = (n = e == null ? void 0 : e.heartbeatIntervalMs) !== null && n !== void 0 ? n : Ze.HEARTBEAT_INTERVAL, this.worker = (i = e == null ? void 0 : e.worker) !== null && i !== void 0 ? i : !1, this.accessToken = (o = e == null ? void 0 : e.accessToken) !== null && o !== void 0 ? o : null, this.heartbeatCallback = (a = e == null ? void 0 : e.heartbeatCallback) !== null && a !== void 0 ? a : at, e != null && e.params && (this.params = e.params), e != null && e.logger && (this.logger = e.logger), (e != null && e.logLevel || e != null && e.log_level) && (this.logLevel = e.logLevel || e.log_level, this.params = Object.assign(Object.assign({}, this.params), { log_level: this.logLevel })), this.reconnectAfterMs = (l = e == null ? void 0 : e.reconnectAfterMs) !== null && l !== void 0 ? l : (d) => $s[d - 1] || Ps, this.encode = (c = e == null ? void 0 : e.encode) !== null && c !== void 0 ? c : (d, h) => h(JSON.stringify(d)), this.decode = (u = e == null ? void 0 : e.decode) !== null && u !== void 0 ? u : this.serializer.decode.bind(this.serializer), this.worker) {
      if (typeof window < "u" && !window.Worker)
        throw new Error("Web Worker is not supported");
      this.workerUrl = e == null ? void 0 : e.workerUrl;
    }
  }
}
class At extends Error {
  constructor(e) {
    super(e), this.__isStorageError = !0, this.name = "StorageError";
  }
}
function U(s) {
  return typeof s == "object" && s !== null && "__isStorageError" in s;
}
class Is extends At {
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
class bt extends At {
  constructor(e, t) {
    super(e), this.name = "StorageUnknownError", this.originalError = t;
  }
}
var Rs = function(s, e, t, r) {
  function n(i) {
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
      u.done ? i(u.value) : n(u.value).then(a, l);
    }
    c((r = r.apply(s, e || [])).next());
  });
};
const $r = (s) => {
  let e;
  return s ? e = s : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => Le).then(({ default: r }) => r(...t)) : e = fetch, (...t) => e(...t);
}, Ls = () => Rs(void 0, void 0, void 0, function* () {
  return typeof Response > "u" ? (yield Promise.resolve().then(() => Le)).Response : Response;
}), yt = (s) => {
  if (Array.isArray(s))
    return s.map((t) => yt(t));
  if (typeof s == "function" || s !== Object(s))
    return s;
  const e = {};
  return Object.entries(s).forEach(([t, r]) => {
    const n = t.replace(/([-_][a-z])/gi, (i) => i.toUpperCase().replace(/[-_]/g, ""));
    e[n] = yt(r);
  }), e;
}, Bs = (s) => {
  if (typeof s != "object" || s === null)
    return !1;
  const e = Object.getPrototypeOf(s);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in s) && !(Symbol.iterator in s);
};
var pe = function(s, e, t, r) {
  function n(i) {
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
      u.done ? i(u.value) : n(u.value).then(a, l);
    }
    c((r = r.apply(s, e || [])).next());
  });
};
const lt = (s) => s.msg || s.message || s.error_description || s.error || JSON.stringify(s), Us = (s, e, t) => pe(void 0, void 0, void 0, function* () {
  const r = yield Ls();
  s instanceof r && !(t != null && t.noResolveJson) ? s.json().then((n) => {
    const i = s.status || 500, o = (n == null ? void 0 : n.statusCode) || i + "";
    e(new Is(lt(n), i, o));
  }).catch((n) => {
    e(new bt(lt(n), n));
  }) : e(new bt(lt(s), s));
}), Ns = (s, e, t, r) => {
  const n = { method: s, headers: (e == null ? void 0 : e.headers) || {} };
  return s === "GET" || !r ? n : (Bs(r) ? (n.headers = Object.assign({ "Content-Type": "application/json" }, e == null ? void 0 : e.headers), n.body = JSON.stringify(r)) : n.body = r, e != null && e.duplex && (n.duplex = e.duplex), Object.assign(Object.assign({}, n), t));
};
function Ke(s, e, t, r, n, i) {
  return pe(this, void 0, void 0, function* () {
    return new Promise((o, a) => {
      s(t, Ns(e, r, n, i)).then((l) => {
        if (!l.ok)
          throw l;
        return r != null && r.noResolveJson ? l : l.json();
      }).then((l) => o(l)).catch((l) => Us(l, a, r));
    });
  });
}
function tt(s, e, t, r) {
  return pe(this, void 0, void 0, function* () {
    return Ke(s, "GET", e, t, r);
  });
}
function K(s, e, t, r, n) {
  return pe(this, void 0, void 0, function* () {
    return Ke(s, "POST", e, r, n, t);
  });
}
function kt(s, e, t, r, n) {
  return pe(this, void 0, void 0, function* () {
    return Ke(s, "PUT", e, r, n, t);
  });
}
function Ds(s, e, t, r) {
  return pe(this, void 0, void 0, function* () {
    return Ke(s, "HEAD", e, Object.assign(Object.assign({}, t), { noResolveJson: !0 }), r);
  });
}
function Pr(s, e, t, r, n) {
  return pe(this, void 0, void 0, function* () {
    return Ke(s, "DELETE", e, r, n, t);
  });
}
var Ms = function(s, e, t, r) {
  function n(i) {
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
      u.done ? i(u.value) : n(u.value).then(a, l);
    }
    c((r = r.apply(s, e || [])).next());
  });
};
class Fs {
  constructor(e, t) {
    this.downloadFn = e, this.shouldThrowOnError = t;
  }
  then(e, t) {
    return this.execute().then(e, t);
  }
  execute() {
    return Ms(this, void 0, void 0, function* () {
      try {
        return {
          data: (yield this.downloadFn()).body,
          error: null
        };
      } catch (e) {
        if (this.shouldThrowOnError)
          throw e;
        if (U(e))
          return { data: null, error: e };
        throw e;
      }
    });
  }
}
var Ws = function(s, e, t, r) {
  function n(i) {
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
      u.done ? i(u.value) : n(u.value).then(a, l);
    }
    c((r = r.apply(s, e || [])).next());
  });
};
class zs {
  constructor(e, t) {
    this.downloadFn = e, this.shouldThrowOnError = t;
  }
  asStream() {
    return new Fs(this.downloadFn, this.shouldThrowOnError);
  }
  then(e, t) {
    return this.execute().then(e, t);
  }
  execute() {
    return Ws(this, void 0, void 0, function* () {
      try {
        return {
          data: yield (yield this.downloadFn()).blob(),
          error: null
        };
      } catch (e) {
        if (this.shouldThrowOnError)
          throw e;
        if (U(e))
          return { data: null, error: e };
        throw e;
      }
    });
  }
}
var q = function(s, e, t, r) {
  function n(i) {
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
      u.done ? i(u.value) : n(u.value).then(a, l);
    }
    c((r = r.apply(s, e || [])).next());
  });
};
const qs = {
  limit: 100,
  offset: 0,
  sortBy: {
    column: "name",
    order: "asc"
  }
}, Qt = {
  cacheControl: "3600",
  contentType: "text/plain;charset=UTF-8",
  upsert: !1
};
class Hs {
  constructor(e, t = {}, r, n) {
    this.shouldThrowOnError = !1, this.url = e, this.headers = t, this.bucketId = r, this.fetch = $r(n);
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
  uploadOrUpdate(e, t, r, n) {
    return q(this, void 0, void 0, function* () {
      try {
        let i;
        const o = Object.assign(Object.assign({}, Qt), n);
        let a = Object.assign(Object.assign({}, this.headers), e === "POST" && { "x-upsert": String(o.upsert) });
        const l = o.metadata;
        typeof Blob < "u" && r instanceof Blob ? (i = new FormData(), i.append("cacheControl", o.cacheControl), l && i.append("metadata", this.encodeMetadata(l)), i.append("", r)) : typeof FormData < "u" && r instanceof FormData ? (i = r, i.append("cacheControl", o.cacheControl), l && i.append("metadata", this.encodeMetadata(l))) : (i = r, a["cache-control"] = `max-age=${o.cacheControl}`, a["content-type"] = o.contentType, l && (a["x-metadata"] = this.toBase64(this.encodeMetadata(l)))), n != null && n.headers && (a = Object.assign(Object.assign({}, a), n.headers));
        const c = this._removeEmptyFolders(t), u = this._getFinalPath(c), d = yield (e == "PUT" ? kt : K)(this.fetch, `${this.url}/object/${u}`, i, Object.assign({ headers: a }, o != null && o.duplex ? { duplex: o.duplex } : {}));
        return {
          data: { path: c, id: d.Id, fullPath: d.Key },
          error: null
        };
      } catch (i) {
        if (this.shouldThrowOnError)
          throw i;
        if (U(i))
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
    return q(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("POST", e, t, r);
    });
  }
  /**
   * Upload a file with a token generated from `createSignedUploadUrl`.
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param token The token generated from `createSignedUploadUrl`
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadToSignedUrl(e, t, r, n) {
    return q(this, void 0, void 0, function* () {
      const i = this._removeEmptyFolders(e), o = this._getFinalPath(i), a = new URL(this.url + `/object/upload/sign/${o}`);
      a.searchParams.set("token", t);
      try {
        let l;
        const c = Object.assign({ upsert: Qt.upsert }, n), u = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(c.upsert) });
        typeof Blob < "u" && r instanceof Blob ? (l = new FormData(), l.append("cacheControl", c.cacheControl), l.append("", r)) : typeof FormData < "u" && r instanceof FormData ? (l = r, l.append("cacheControl", c.cacheControl)) : (l = r, u["cache-control"] = `max-age=${c.cacheControl}`, u["content-type"] = c.contentType);
        const d = yield kt(this.fetch, a.toString(), l, { headers: u });
        return {
          data: { path: i, fullPath: d.Key },
          error: null
        };
      } catch (l) {
        if (this.shouldThrowOnError)
          throw l;
        if (U(l))
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
    return q(this, void 0, void 0, function* () {
      try {
        let r = this._getFinalPath(e);
        const n = Object.assign({}, this.headers);
        t != null && t.upsert && (n["x-upsert"] = "true");
        const i = yield K(this.fetch, `${this.url}/object/upload/sign/${r}`, {}, { headers: n }), o = new URL(this.url + i.url), a = o.searchParams.get("token");
        if (!a)
          throw new At("No token returned by API");
        return { data: { signedUrl: o.toString(), path: e, token: a }, error: null };
      } catch (r) {
        if (this.shouldThrowOnError)
          throw r;
        if (U(r))
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
    return q(this, void 0, void 0, function* () {
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
    return q(this, void 0, void 0, function* () {
      try {
        return { data: yield K(this.fetch, `${this.url}/object/move`, {
          bucketId: this.bucketId,
          sourceKey: e,
          destinationKey: t,
          destinationBucket: r == null ? void 0 : r.destinationBucket
        }, { headers: this.headers }), error: null };
      } catch (n) {
        if (this.shouldThrowOnError)
          throw n;
        if (U(n))
          return { data: null, error: n };
        throw n;
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
    return q(this, void 0, void 0, function* () {
      try {
        return { data: { path: (yield K(this.fetch, `${this.url}/object/copy`, {
          bucketId: this.bucketId,
          sourceKey: e,
          destinationKey: t,
          destinationBucket: r == null ? void 0 : r.destinationBucket
        }, { headers: this.headers })).Key }, error: null };
      } catch (n) {
        if (this.shouldThrowOnError)
          throw n;
        if (U(n))
          return { data: null, error: n };
        throw n;
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
    return q(this, void 0, void 0, function* () {
      try {
        let n = this._getFinalPath(e), i = yield K(this.fetch, `${this.url}/object/sign/${n}`, Object.assign({ expiresIn: t }, r != null && r.transform ? { transform: r.transform } : {}), { headers: this.headers });
        const o = r != null && r.download ? `&download=${r.download === !0 ? "" : r.download}` : "";
        return i = { signedUrl: encodeURI(`${this.url}${i.signedURL}${o}`) }, { data: i, error: null };
      } catch (n) {
        if (this.shouldThrowOnError)
          throw n;
        if (U(n))
          return { data: null, error: n };
        throw n;
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
    return q(this, void 0, void 0, function* () {
      try {
        const n = yield K(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn: t, paths: e }, { headers: this.headers }), i = r != null && r.download ? `&download=${r.download === !0 ? "" : r.download}` : "";
        return {
          data: n.map((o) => Object.assign(Object.assign({}, o), { signedUrl: o.signedURL ? encodeURI(`${this.url}${o.signedURL}${i}`) : null })),
          error: null
        };
      } catch (n) {
        if (this.shouldThrowOnError)
          throw n;
        if (U(n))
          return { data: null, error: n };
        throw n;
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
    const n = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image/authenticated" : "object", i = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {}), o = i ? `?${i}` : "", a = this._getFinalPath(e), l = () => tt(this.fetch, `${this.url}/${n}/${a}${o}`, {
      headers: this.headers,
      noResolveJson: !0
    });
    return new zs(l, this.shouldThrowOnError);
  }
  /**
   * Retrieves the details of an existing file.
   * @param path
   */
  info(e) {
    return q(this, void 0, void 0, function* () {
      const t = this._getFinalPath(e);
      try {
        const r = yield tt(this.fetch, `${this.url}/object/info/${t}`, {
          headers: this.headers
        });
        return { data: yt(r), error: null };
      } catch (r) {
        if (this.shouldThrowOnError)
          throw r;
        if (U(r))
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
    return q(this, void 0, void 0, function* () {
      const t = this._getFinalPath(e);
      try {
        return yield Ds(this.fetch, `${this.url}/object/${t}`, {
          headers: this.headers
        }), { data: !0, error: null };
      } catch (r) {
        if (this.shouldThrowOnError)
          throw r;
        if (U(r) && r instanceof bt) {
          const n = r.originalError;
          if ([400, 404].includes(n == null ? void 0 : n.status))
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
    const r = this._getFinalPath(e), n = [], i = t != null && t.download ? `download=${t.download === !0 ? "" : t.download}` : "";
    i !== "" && n.push(i);
    const a = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image" : "object", l = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {});
    l !== "" && n.push(l);
    let c = n.join("&");
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
    return q(this, void 0, void 0, function* () {
      try {
        return { data: yield Pr(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: e }, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (U(t))
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
    return q(this, void 0, void 0, function* () {
      try {
        const n = Object.assign(Object.assign(Object.assign({}, qs), t), { prefix: e || "" });
        return { data: yield K(this.fetch, `${this.url}/object/list/${this.bucketId}`, n, { headers: this.headers }, r), error: null };
      } catch (n) {
        if (this.shouldThrowOnError)
          throw n;
        if (U(n))
          return { data: null, error: n };
        throw n;
      }
    });
  }
  /**
   * @experimental this method signature might change in the future
   * @param options search options
   * @param parameters
   */
  listV2(e, t) {
    return q(this, void 0, void 0, function* () {
      try {
        const r = Object.assign({}, e);
        return { data: yield K(this.fetch, `${this.url}/object/list-v2/${this.bucketId}`, r, { headers: this.headers }, t), error: null };
      } catch (r) {
        if (this.shouldThrowOnError)
          throw r;
        if (U(r))
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
const Vs = "2.12.2", Gs = { "X-Client-Info": `storage-js/${Vs}` };
var Ee = function(s, e, t, r) {
  function n(i) {
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
      u.done ? i(u.value) : n(u.value).then(a, l);
    }
    c((r = r.apply(s, [])).next());
  });
};
class Ks {
  constructor(e, t = {}, r, n) {
    this.shouldThrowOnError = !1;
    const i = new URL(e);
    n != null && n.useNewHostname && /supabase\.(co|in|red)$/.test(i.hostname) && !i.hostname.includes("storage.supabase.") && (i.hostname = i.hostname.replace("supabase.", "storage.supabase.")), this.url = i.href, this.headers = Object.assign(Object.assign({}, Gs), t), this.fetch = $r(r);
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
    return Ee(this, void 0, void 0, function* () {
      try {
        return { data: yield tt(this.fetch, `${this.url}/bucket`, { headers: this.headers }), error: null };
      } catch (e) {
        if (this.shouldThrowOnError)
          throw e;
        if (U(e))
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
    return Ee(this, void 0, void 0, function* () {
      try {
        return { data: yield tt(this.fetch, `${this.url}/bucket/${e}`, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (U(t))
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
    return Ee(this, void 0, void 0, function* () {
      try {
        return { data: yield K(this.fetch, `${this.url}/bucket`, {
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
        if (U(r))
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
    return Ee(this, void 0, void 0, function* () {
      try {
        return { data: yield kt(this.fetch, `${this.url}/bucket/${e}`, {
          id: e,
          name: e,
          public: t.public,
          file_size_limit: t.fileSizeLimit,
          allowed_mime_types: t.allowedMimeTypes
        }, { headers: this.headers }), error: null };
      } catch (r) {
        if (this.shouldThrowOnError)
          throw r;
        if (U(r))
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
    return Ee(this, void 0, void 0, function* () {
      try {
        return { data: yield K(this.fetch, `${this.url}/bucket/${e}/empty`, {}, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (U(t))
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
    return Ee(this, void 0, void 0, function* () {
      try {
        return { data: yield Pr(this.fetch, `${this.url}/bucket/${e}`, {}, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (U(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
}
class Js extends Ks {
  constructor(e, t = {}, r, n) {
    super(e, t, r, n);
  }
  /**
   * Perform file operation in a bucket.
   *
   * @param id The bucket id to operate on.
   */
  from(e) {
    return new Hs(this.url, this.headers, e, this.fetch);
  }
}
const Ys = "2.58.0";
let Fe = "";
typeof Deno < "u" ? Fe = "deno" : typeof document < "u" ? Fe = "web" : typeof navigator < "u" && navigator.product === "ReactNative" ? Fe = "react-native" : Fe = "node";
const Zs = { "X-Client-Info": `supabase-js-${Fe}/${Ys}` }, Qs = {
  headers: Zs
}, Xs = {
  schema: "public"
}, en = {
  autoRefreshToken: !0,
  persistSession: !0,
  detectSessionInUrl: !0,
  flowType: "implicit"
}, tn = {};
var rn = function(s, e, t, r) {
  function n(i) {
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
      u.done ? i(u.value) : n(u.value).then(a, l);
    }
    c((r = r.apply(s, e || [])).next());
  });
};
const sn = (s) => {
  let e;
  return s ? e = s : typeof fetch > "u" ? e = br : e = fetch, (...t) => e(...t);
}, nn = () => typeof Headers > "u" ? yr : Headers, on = (s, e, t) => {
  const r = sn(t), n = nn();
  return (i, o) => rn(void 0, void 0, void 0, function* () {
    var a;
    const l = (a = yield e()) !== null && a !== void 0 ? a : s;
    let c = new n(o == null ? void 0 : o.headers);
    return c.has("apikey") || c.set("apikey", s), c.has("Authorization") || c.set("Authorization", `Bearer ${l}`), r(i, Object.assign(Object.assign({}, o), { headers: c }));
  });
};
var an = function(s, e, t, r) {
  function n(i) {
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
      u.done ? i(u.value) : n(u.value).then(a, l);
    }
    c((r = r.apply(s, [])).next());
  });
};
function ln(s) {
  return s.endsWith("/") ? s : s + "/";
}
function cn(s, e) {
  var t, r;
  const { db: n, auth: i, realtime: o, global: a } = s, { db: l, auth: c, realtime: u, global: d } = e, h = {
    db: Object.assign(Object.assign({}, l), n),
    auth: Object.assign(Object.assign({}, c), i),
    realtime: Object.assign(Object.assign({}, u), o),
    storage: {},
    global: Object.assign(Object.assign(Object.assign({}, d), a), { headers: Object.assign(Object.assign({}, (t = d == null ? void 0 : d.headers) !== null && t !== void 0 ? t : {}), (r = a == null ? void 0 : a.headers) !== null && r !== void 0 ? r : {}) }),
    accessToken: () => an(this, void 0, void 0, function* () {
      return "";
    })
  };
  return s.accessToken ? h.accessToken = s.accessToken : delete h.accessToken, h;
}
function un(s) {
  const e = s == null ? void 0 : s.trim();
  if (!e)
    throw new Error("supabaseUrl is required.");
  if (!e.match(/^https?:\/\//i))
    throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
  try {
    return new URL(ln(e));
  } catch {
    throw Error("Invalid supabaseUrl: Provided URL is malformed.");
  }
}
const Or = "2.72.0", Oe = 30 * 1e3, St = 3, ct = St * Oe, dn = "http://localhost:9999", hn = "supabase.auth.token", fn = { "X-Client-Info": `gotrue-js/${Or}` }, Et = "X-Supabase-Api-Version", Ar = {
  "2024-01-01": {
    timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
    name: "2024-01-01"
  }
}, pn = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i, gn = 600 * 1e3;
class It extends Error {
  constructor(e, t, r) {
    super(e), this.__isAuthError = !0, this.name = "AuthError", this.status = t, this.code = r;
  }
}
function T(s) {
  return typeof s == "object" && s !== null && "__isAuthError" in s;
}
class mn extends It {
  constructor(e, t, r) {
    super(e, t, r), this.name = "AuthApiError", this.status = t, this.code = r;
  }
}
function vn(s) {
  return T(s) && s.name === "AuthApiError";
}
class Ir extends It {
  constructor(e, t) {
    super(e), this.name = "AuthUnknownError", this.originalError = t;
  }
}
class oe extends It {
  constructor(e, t, r, n) {
    super(e, r, n), this.name = t, this.status = r;
  }
}
class re extends oe {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
  }
}
function _n(s) {
  return T(s) && s.name === "AuthSessionMissingError";
}
class De extends oe {
  constructor() {
    super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
  }
}
class Qe extends oe {
  constructor(e) {
    super(e, "AuthInvalidCredentialsError", 400, void 0);
  }
}
class Xe extends oe {
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
function wn(s) {
  return T(s) && s.name === "AuthImplicitGrantRedirectError";
}
class Xt extends oe {
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
class Tt extends oe {
  constructor(e, t) {
    super(e, "AuthRetryableFetchError", t, void 0);
  }
}
function ut(s) {
  return T(s) && s.name === "AuthRetryableFetchError";
}
class er extends oe {
  constructor(e, t, r) {
    super(e, "AuthWeakPasswordError", t, "weak_password"), this.reasons = r;
  }
}
class Ct extends oe {
  constructor(e) {
    super(e, "AuthInvalidJwtError", 400, "invalid_jwt");
  }
}
const rt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), tr = ` 	
\r=`.split(""), bn = (() => {
  const s = new Array(128);
  for (let e = 0; e < s.length; e += 1)
    s[e] = -1;
  for (let e = 0; e < tr.length; e += 1)
    s[tr[e].charCodeAt(0)] = -2;
  for (let e = 0; e < rt.length; e += 1)
    s[rt[e].charCodeAt(0)] = e;
  return s;
})();
function rr(s, e, t) {
  if (s !== null)
    for (e.queue = e.queue << 8 | s, e.queuedBits += 8; e.queuedBits >= 6; ) {
      const r = e.queue >> e.queuedBits - 6 & 63;
      t(rt[r]), e.queuedBits -= 6;
    }
  else if (e.queuedBits > 0)
    for (e.queue = e.queue << 6 - e.queuedBits, e.queuedBits = 6; e.queuedBits >= 6; ) {
      const r = e.queue >> e.queuedBits - 6 & 63;
      t(rt[r]), e.queuedBits -= 6;
    }
}
function Rr(s, e, t) {
  const r = bn[s];
  if (r > -1)
    for (e.queue = e.queue << 6 | r, e.queuedBits += 6; e.queuedBits >= 8; )
      t(e.queue >> e.queuedBits - 8 & 255), e.queuedBits -= 8;
  else {
    if (r === -2)
      return;
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(s)}"`);
  }
}
function sr(s) {
  const e = [], t = (o) => {
    e.push(String.fromCodePoint(o));
  }, r = {
    utf8seq: 0,
    codepoint: 0
  }, n = { queue: 0, queuedBits: 0 }, i = (o) => {
    Sn(o, r, t);
  };
  for (let o = 0; o < s.length; o += 1)
    Rr(s.charCodeAt(o), n, i);
  return e.join("");
}
function yn(s, e) {
  if (s <= 127) {
    e(s);
    return;
  } else if (s <= 2047) {
    e(192 | s >> 6), e(128 | s & 63);
    return;
  } else if (s <= 65535) {
    e(224 | s >> 12), e(128 | s >> 6 & 63), e(128 | s & 63);
    return;
  } else if (s <= 1114111) {
    e(240 | s >> 18), e(128 | s >> 12 & 63), e(128 | s >> 6 & 63), e(128 | s & 63);
    return;
  }
  throw new Error(`Unrecognized Unicode codepoint: ${s.toString(16)}`);
}
function kn(s, e) {
  for (let t = 0; t < s.length; t += 1) {
    let r = s.charCodeAt(t);
    if (r > 55295 && r <= 56319) {
      const n = (r - 55296) * 1024 & 65535;
      r = (s.charCodeAt(t + 1) - 56320 & 65535 | n) + 65536, t += 1;
    }
    yn(r, e);
  }
}
function Sn(s, e, t) {
  if (e.utf8seq === 0) {
    if (s <= 127) {
      t(s);
      return;
    }
    for (let r = 1; r < 6; r += 1)
      if ((s >> 7 - r & 1) === 0) {
        e.utf8seq = r;
        break;
      }
    if (e.utf8seq === 2)
      e.codepoint = s & 31;
    else if (e.utf8seq === 3)
      e.codepoint = s & 15;
    else if (e.utf8seq === 4)
      e.codepoint = s & 7;
    else
      throw new Error("Invalid UTF-8 sequence");
    e.utf8seq -= 1;
  } else if (e.utf8seq > 0) {
    if (s <= 127)
      throw new Error("Invalid UTF-8 sequence");
    e.codepoint = e.codepoint << 6 | s & 63, e.utf8seq -= 1, e.utf8seq === 0 && t(e.codepoint);
  }
}
function En(s) {
  const e = [], t = { queue: 0, queuedBits: 0 }, r = (n) => {
    e.push(n);
  };
  for (let n = 0; n < s.length; n += 1)
    Rr(s.charCodeAt(n), t, r);
  return new Uint8Array(e);
}
function Tn(s) {
  const e = [];
  return kn(s, (t) => e.push(t)), new Uint8Array(e);
}
function Cn(s) {
  const e = [], t = { queue: 0, queuedBits: 0 }, r = (n) => {
    e.push(n);
  };
  return s.forEach((n) => rr(n, t, r)), rr(null, t, r), e.join("");
}
function xn(s) {
  return Math.round(Date.now() / 1e3) + s;
}
function jn() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(s) {
    const e = Math.random() * 16 | 0;
    return (s == "x" ? e : e & 3 | 8).toString(16);
  });
}
const H = () => typeof window < "u" && typeof document < "u", le = {
  tested: !1,
  writable: !1
}, Lr = () => {
  if (!H())
    return !1;
  try {
    if (typeof globalThis.localStorage != "object")
      return !1;
  } catch {
    return !1;
  }
  if (le.tested)
    return le.writable;
  const s = `lswt-${Math.random()}${Math.random()}`;
  try {
    globalThis.localStorage.setItem(s, s), globalThis.localStorage.removeItem(s), le.tested = !0, le.writable = !0;
  } catch {
    le.tested = !0, le.writable = !1;
  }
  return le.writable;
};
function $n(s) {
  const e = {}, t = new URL(s);
  if (t.hash && t.hash[0] === "#")
    try {
      new URLSearchParams(t.hash.substring(1)).forEach((n, i) => {
        e[i] = n;
      });
    } catch {
    }
  return t.searchParams.forEach((r, n) => {
    e[n] = r;
  }), e;
}
const Br = (s) => {
  let e;
  return s ? e = s : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => Le).then(({ default: r }) => r(...t)) : e = fetch, (...t) => e(...t);
}, Pn = (s) => typeof s == "object" && s !== null && "status" in s && "ok" in s && "json" in s && typeof s.json == "function", Ae = async (s, e, t) => {
  await s.setItem(e, JSON.stringify(t));
}, ce = async (s, e) => {
  const t = await s.getItem(e);
  if (!t)
    return null;
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}, te = async (s, e) => {
  await s.removeItem(e);
};
class st {
  constructor() {
    this.promise = new st.promiseConstructor((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
}
st.promiseConstructor = Promise;
function dt(s) {
  const e = s.split(".");
  if (e.length !== 3)
    throw new Ct("Invalid JWT structure");
  for (let r = 0; r < e.length; r++)
    if (!pn.test(e[r]))
      throw new Ct("JWT not in base64url format");
  return {
    // using base64url lib
    header: JSON.parse(sr(e[0])),
    payload: JSON.parse(sr(e[1])),
    signature: En(e[2]),
    raw: {
      header: e[0],
      payload: e[1]
    }
  };
}
async function On(s) {
  return await new Promise((e) => {
    setTimeout(() => e(null), s);
  });
}
function An(s, e) {
  return new Promise((r, n) => {
    (async () => {
      for (let i = 0; i < 1 / 0; i++)
        try {
          const o = await s(i);
          if (!e(i, null, o)) {
            r(o);
            return;
          }
        } catch (o) {
          if (!e(i, o)) {
            n(o);
            return;
          }
        }
    })();
  });
}
function In(s) {
  return ("0" + s.toString(16)).substr(-2);
}
function Rn() {
  const e = new Uint32Array(56);
  if (typeof crypto > "u") {
    const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", r = t.length;
    let n = "";
    for (let i = 0; i < 56; i++)
      n += t.charAt(Math.floor(Math.random() * r));
    return n;
  }
  return crypto.getRandomValues(e), Array.from(e, In).join("");
}
async function Ln(s) {
  const t = new TextEncoder().encode(s), r = await crypto.subtle.digest("SHA-256", t), n = new Uint8Array(r);
  return Array.from(n).map((i) => String.fromCharCode(i)).join("");
}
async function Bn(s) {
  if (!(typeof crypto < "u" && typeof crypto.subtle < "u" && typeof TextEncoder < "u"))
    return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), s;
  const t = await Ln(s);
  return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function Te(s, e, t = !1) {
  const r = Rn();
  let n = r;
  t && (n += "/PASSWORD_RECOVERY"), await Ae(s, `${e}-code-verifier`, n);
  const i = await Bn(r);
  return [i, r === i ? "plain" : "s256"];
}
const Un = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function Nn(s) {
  const e = s.headers.get(Et);
  if (!e || !e.match(Un))
    return null;
  try {
    return /* @__PURE__ */ new Date(`${e}T00:00:00.0Z`);
  } catch {
    return null;
  }
}
function Dn(s) {
  if (!s)
    throw new Error("Missing exp claim");
  const e = Math.floor(Date.now() / 1e3);
  if (s <= e)
    throw new Error("JWT has expired");
}
function Mn(s) {
  switch (s) {
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
const Fn = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function Ce(s) {
  if (!Fn.test(s))
    throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not");
}
function ht() {
  const s = {};
  return new Proxy(s, {
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
function nr(s) {
  return JSON.parse(JSON.stringify(s));
}
var Wn = function(s, e) {
  var t = {};
  for (var r in s) Object.prototype.hasOwnProperty.call(s, r) && e.indexOf(r) < 0 && (t[r] = s[r]);
  if (s != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, r = Object.getOwnPropertySymbols(s); n < r.length; n++)
      e.indexOf(r[n]) < 0 && Object.prototype.propertyIsEnumerable.call(s, r[n]) && (t[r[n]] = s[r[n]]);
  return t;
};
const ue = (s) => s.msg || s.message || s.error_description || s.error || JSON.stringify(s), zn = [502, 503, 504];
async function ir(s) {
  var e;
  if (!Pn(s))
    throw new Tt(ue(s), 0);
  if (zn.includes(s.status))
    throw new Tt(ue(s), s.status);
  let t;
  try {
    t = await s.json();
  } catch (i) {
    throw new Ir(ue(i), i);
  }
  let r;
  const n = Nn(s);
  if (n && n.getTime() >= Ar["2024-01-01"].timestamp && typeof t == "object" && t && typeof t.code == "string" ? r = t.code : typeof t == "object" && t && typeof t.error_code == "string" && (r = t.error_code), r) {
    if (r === "weak_password")
      throw new er(ue(t), s.status, ((e = t.weak_password) === null || e === void 0 ? void 0 : e.reasons) || []);
    if (r === "session_not_found")
      throw new re();
  } else if (typeof t == "object" && t && typeof t.weak_password == "object" && t.weak_password && Array.isArray(t.weak_password.reasons) && t.weak_password.reasons.length && t.weak_password.reasons.reduce((i, o) => i && typeof o == "string", !0))
    throw new er(ue(t), s.status, t.weak_password.reasons);
  throw new mn(ue(t), s.status || 500, r);
}
const qn = (s, e, t, r) => {
  const n = { method: s, headers: (e == null ? void 0 : e.headers) || {} };
  return s === "GET" ? n : (n.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, e == null ? void 0 : e.headers), n.body = JSON.stringify(r), Object.assign(Object.assign({}, n), t));
};
async function x(s, e, t, r) {
  var n;
  const i = Object.assign({}, r == null ? void 0 : r.headers);
  i[Et] || (i[Et] = Ar["2024-01-01"].name), r != null && r.jwt && (i.Authorization = `Bearer ${r.jwt}`);
  const o = (n = r == null ? void 0 : r.query) !== null && n !== void 0 ? n : {};
  r != null && r.redirectTo && (o.redirect_to = r.redirectTo);
  const a = Object.keys(o).length ? "?" + new URLSearchParams(o).toString() : "", l = await Hn(s, e, t + a, {
    headers: i,
    noResolveJson: r == null ? void 0 : r.noResolveJson
  }, {}, r == null ? void 0 : r.body);
  return r != null && r.xform ? r == null ? void 0 : r.xform(l) : { data: Object.assign({}, l), error: null };
}
async function Hn(s, e, t, r, n, i) {
  const o = qn(e, r, n, i);
  let a;
  try {
    a = await s(t, Object.assign({}, o));
  } catch (l) {
    throw console.error(l), new Tt(ue(l), 0);
  }
  if (a.ok || await ir(a), r != null && r.noResolveJson)
    return a;
  try {
    return await a.json();
  } catch (l) {
    await ir(l);
  }
}
function G(s) {
  var e;
  let t = null;
  Jn(s) && (t = Object.assign({}, s), s.expires_at || (t.expires_at = xn(s.expires_in)));
  const r = (e = s.user) !== null && e !== void 0 ? e : s;
  return { data: { session: t, user: r }, error: null };
}
function or(s) {
  const e = G(s);
  return !e.error && s.weak_password && typeof s.weak_password == "object" && Array.isArray(s.weak_password.reasons) && s.weak_password.reasons.length && s.weak_password.message && typeof s.weak_password.message == "string" && s.weak_password.reasons.reduce((t, r) => t && typeof r == "string", !0) && (e.data.weak_password = s.weak_password), e;
}
function se(s) {
  var e;
  return { data: { user: (e = s.user) !== null && e !== void 0 ? e : s }, error: null };
}
function Vn(s) {
  return { data: s, error: null };
}
function Gn(s) {
  const { action_link: e, email_otp: t, hashed_token: r, redirect_to: n, verification_type: i } = s, o = Wn(s, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]), a = {
    action_link: e,
    email_otp: t,
    hashed_token: r,
    redirect_to: n,
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
function Kn(s) {
  return s;
}
function Jn(s) {
  return s.access_token && s.refresh_token && s.expires_in;
}
const ft = ["global", "local", "others"];
var Yn = function(s, e) {
  var t = {};
  for (var r in s) Object.prototype.hasOwnProperty.call(s, r) && e.indexOf(r) < 0 && (t[r] = s[r]);
  if (s != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, r = Object.getOwnPropertySymbols(s); n < r.length; n++)
      e.indexOf(r[n]) < 0 && Object.prototype.propertyIsEnumerable.call(s, r[n]) && (t[r[n]] = s[r[n]]);
  return t;
};
class Zn {
  constructor({ url: e = "", headers: t = {}, fetch: r }) {
    this.url = e, this.headers = t, this.fetch = Br(r), this.mfa = {
      listFactors: this._listFactors.bind(this),
      deleteFactor: this._deleteFactor.bind(this)
    };
  }
  /**
   * Removes a logged-in session.
   * @param jwt A valid, logged-in JWT.
   * @param scope The logout sope.
   */
  async signOut(e, t = ft[0]) {
    if (ft.indexOf(t) < 0)
      throw new Error(`@supabase/auth-js: Parameter scope must be one of ${ft.join(", ")}`);
    try {
      return await x(this.fetch, "POST", `${this.url}/logout?scope=${t}`, {
        headers: this.headers,
        jwt: e,
        noResolveJson: !0
      }), { data: null, error: null };
    } catch (r) {
      if (T(r))
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
      return await x(this.fetch, "POST", `${this.url}/invite`, {
        body: { email: e, data: t.data },
        headers: this.headers,
        redirectTo: t.redirectTo,
        xform: se
      });
    } catch (r) {
      if (T(r))
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
      const { options: t } = e, r = Yn(e, ["options"]), n = Object.assign(Object.assign({}, r), t);
      return "newEmail" in r && (n.new_email = r == null ? void 0 : r.newEmail, delete n.newEmail), await x(this.fetch, "POST", `${this.url}/admin/generate_link`, {
        body: n,
        headers: this.headers,
        xform: Gn,
        redirectTo: t == null ? void 0 : t.redirectTo
      });
    } catch (t) {
      if (T(t))
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
      return await x(this.fetch, "POST", `${this.url}/admin/users`, {
        body: e,
        headers: this.headers,
        xform: se
      });
    } catch (t) {
      if (T(t))
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
    var t, r, n, i, o, a, l;
    try {
      const c = { nextPage: null, lastPage: 0, total: 0 }, u = await x(this.fetch, "GET", `${this.url}/admin/users`, {
        headers: this.headers,
        noResolveJson: !0,
        query: {
          page: (r = (t = e == null ? void 0 : e.page) === null || t === void 0 ? void 0 : t.toString()) !== null && r !== void 0 ? r : "",
          per_page: (i = (n = e == null ? void 0 : e.perPage) === null || n === void 0 ? void 0 : n.toString()) !== null && i !== void 0 ? i : ""
        },
        xform: Kn
      });
      if (u.error)
        throw u.error;
      const d = await u.json(), h = (o = u.headers.get("x-total-count")) !== null && o !== void 0 ? o : 0, p = (l = (a = u.headers.get("link")) === null || a === void 0 ? void 0 : a.split(",")) !== null && l !== void 0 ? l : [];
      return p.length > 0 && (p.forEach((g) => {
        const _ = parseInt(g.split(";")[0].split("=")[1].substring(0, 1)), m = JSON.parse(g.split(";")[1].split("=")[1]);
        c[`${m}Page`] = _;
      }), c.total = parseInt(h)), { data: Object.assign(Object.assign({}, d), c), error: null };
    } catch (c) {
      if (T(c))
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
    Ce(e);
    try {
      return await x(this.fetch, "GET", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        xform: se
      });
    } catch (t) {
      if (T(t))
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
    Ce(e);
    try {
      return await x(this.fetch, "PUT", `${this.url}/admin/users/${e}`, {
        body: t,
        headers: this.headers,
        xform: se
      });
    } catch (r) {
      if (T(r))
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
    Ce(e);
    try {
      return await x(this.fetch, "DELETE", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        body: {
          should_soft_delete: t
        },
        xform: se
      });
    } catch (r) {
      if (T(r))
        return { data: { user: null }, error: r };
      throw r;
    }
  }
  async _listFactors(e) {
    Ce(e.userId);
    try {
      const { data: t, error: r } = await x(this.fetch, "GET", `${this.url}/admin/users/${e.userId}/factors`, {
        headers: this.headers,
        xform: (n) => ({ data: { factors: n }, error: null })
      });
      return { data: t, error: r };
    } catch (t) {
      if (T(t))
        return { data: null, error: t };
      throw t;
    }
  }
  async _deleteFactor(e) {
    Ce(e.userId), Ce(e.id);
    try {
      return { data: await x(this.fetch, "DELETE", `${this.url}/admin/users/${e.userId}/factors/${e.id}`, {
        headers: this.headers
      }), error: null };
    } catch (t) {
      if (T(t))
        return { data: null, error: t };
      throw t;
    }
  }
}
function ar(s = {}) {
  return {
    getItem: (e) => s[e] || null,
    setItem: (e, t) => {
      s[e] = t;
    },
    removeItem: (e) => {
      delete s[e];
    }
  };
}
function Qn() {
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
const xe = {
  /**
   * @experimental
   */
  debug: !!(globalThis && Lr() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
};
class Ur extends Error {
  constructor(e) {
    super(e), this.isAcquireTimeout = !0;
  }
}
class Xn extends Ur {
}
async function ei(s, e, t) {
  xe.debug && console.log("@supabase/gotrue-js: navigatorLock: acquire lock", s, e);
  const r = new globalThis.AbortController();
  return e > 0 && setTimeout(() => {
    r.abort(), xe.debug && console.log("@supabase/gotrue-js: navigatorLock acquire timed out", s);
  }, e), await Promise.resolve().then(() => globalThis.navigator.locks.request(s, e === 0 ? {
    mode: "exclusive",
    ifAvailable: !0
  } : {
    mode: "exclusive",
    signal: r.signal
  }, async (n) => {
    if (n) {
      xe.debug && console.log("@supabase/gotrue-js: navigatorLock: acquired", s, n.name);
      try {
        return await t();
      } finally {
        xe.debug && console.log("@supabase/gotrue-js: navigatorLock: released", s, n.name);
      }
    } else {
      if (e === 0)
        throw xe.debug && console.log("@supabase/gotrue-js: navigatorLock: not immediately available", s), new Xn(`Acquiring an exclusive Navigator LockManager lock "${s}" immediately failed`);
      if (xe.debug)
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
function Nr(s) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(s))
    throw new Error(`@supabase/auth-js: Address "${s}" is invalid.`);
  return s.toLowerCase();
}
function ti(s) {
  return parseInt(s, 16);
}
function ri(s) {
  const e = new TextEncoder().encode(s);
  return "0x" + Array.from(e, (r) => r.toString(16).padStart(2, "0")).join("");
}
function si(s) {
  var e;
  const { chainId: t, domain: r, expirationTime: n, issuedAt: i = /* @__PURE__ */ new Date(), nonce: o, notBefore: a, requestId: l, resources: c, scheme: u, uri: d, version: h } = s;
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
    if (!((e = s.statement) === null || e === void 0) && e.includes(`
`))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${s.statement}`);
  }
  const p = Nr(s.address), g = u ? `${u}://${r}` : r, _ = s.statement ? `${s.statement}
` : "", m = `${g} wants you to sign in with your Ethereum account:
${p}

${_}`;
  let w = `URI: ${d}
Version: ${h}
Chain ID: ${t}${o ? `
Nonce: ${o}` : ""}
Issued At: ${i.toISOString()}`;
  if (n && (w += `
Expiration Time: ${n.toISOString()}`), a && (w += `
Not Before: ${a.toISOString()}`), l && (w += `
Request ID: ${l}`), c) {
    let v = `
Resources:`;
    for (const b of c) {
      if (!b || typeof b != "string")
        throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${b}`);
      v += `
- ${b}`;
    }
    w += v;
  }
  return `${m}
${w}`;
}
Qn();
const ni = {
  url: dn,
  storageKey: hn,
  autoRefreshToken: !0,
  persistSession: !0,
  detectSessionInUrl: !0,
  headers: fn,
  flowType: "implicit",
  debug: !1,
  hasCustomAuthorizationHeader: !1
};
async function lr(s, e, t) {
  return await t();
}
const je = {};
class Ge {
  /**
   * Create a new client for use in the browser.
   */
  constructor(e) {
    var t, r;
    this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.initializePromise = null, this.detectSessionInUrl = !0, this.hasCustomAuthorizationHeader = !1, this.suppressGetSessionWarning = !1, this.lockAcquired = !1, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log, this.instanceID = Ge.nextInstanceID, Ge.nextInstanceID += 1, this.instanceID > 0 && H() && console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
    const n = Object.assign(Object.assign({}, ni), e);
    if (this.logDebugMessages = !!n.debug, typeof n.debug == "function" && (this.logger = n.debug), this.persistSession = n.persistSession, this.storageKey = n.storageKey, this.autoRefreshToken = n.autoRefreshToken, this.admin = new Zn({
      url: n.url,
      headers: n.headers,
      fetch: n.fetch
    }), this.url = n.url, this.headers = n.headers, this.fetch = Br(n.fetch), this.lock = n.lock || lr, this.detectSessionInUrl = n.detectSessionInUrl, this.flowType = n.flowType, this.hasCustomAuthorizationHeader = n.hasCustomAuthorizationHeader, n.lock ? this.lock = n.lock : H() && (!((t = globalThis == null ? void 0 : globalThis.navigator) === null || t === void 0) && t.locks) ? this.lock = ei : this.lock = lr, this.jwks || (this.jwks = { keys: [] }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = {
      verify: this._verify.bind(this),
      enroll: this._enroll.bind(this),
      unenroll: this._unenroll.bind(this),
      challenge: this._challenge.bind(this),
      listFactors: this._listFactors.bind(this),
      challengeAndVerify: this._challengeAndVerify.bind(this),
      getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
    }, this.persistSession ? (n.storage ? this.storage = n.storage : Lr() ? this.storage = globalThis.localStorage : (this.memoryStorage = {}, this.storage = ar(this.memoryStorage)), n.userStorage && (this.userStorage = n.userStorage)) : (this.memoryStorage = {}, this.storage = ar(this.memoryStorage)), H() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
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
    return (t = (e = je[this.storageKey]) === null || e === void 0 ? void 0 : e.jwks) !== null && t !== void 0 ? t : { keys: [] };
  }
  set jwks(e) {
    je[this.storageKey] = Object.assign(Object.assign({}, je[this.storageKey]), { jwks: e });
  }
  get jwks_cached_at() {
    var e, t;
    return (t = (e = je[this.storageKey]) === null || e === void 0 ? void 0 : e.cachedAt) !== null && t !== void 0 ? t : Number.MIN_SAFE_INTEGER;
  }
  set jwks_cached_at(e) {
    je[this.storageKey] = Object.assign(Object.assign({}, je[this.storageKey]), { cachedAt: e });
  }
  _debug(...e) {
    return this.logDebugMessages && this.logger(`GoTrueClient@${this.instanceID} (${Or}) ${(/* @__PURE__ */ new Date()).toISOString()}`, ...e), this;
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
      const t = $n(window.location.href);
      let r = "none";
      if (this._isImplicitGrantCallback(t) ? r = "implicit" : await this._isPKCECallback(t) && (r = "pkce"), H() && this.detectSessionInUrl && r !== "none") {
        const { data: n, error: i } = await this._getSessionFromURL(t, r);
        if (i) {
          if (this._debug("#_initialize()", "error detecting session from URL", i), wn(i)) {
            const l = (e = i.details) === null || e === void 0 ? void 0 : e.code;
            if (l === "identity_already_exists" || l === "identity_not_found" || l === "single_identity_not_deletable")
              return { error: i };
          }
          return await this._removeSession(), { error: i };
        }
        const { session: o, redirectType: a } = n;
        return this._debug("#_initialize()", "detected session in URL", o, "redirect type", a), await this._saveSession(o), setTimeout(async () => {
          a === "recovery" ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", o) : await this._notifyAllSubscribers("SIGNED_IN", o);
        }, 0), { error: null };
      }
      return await this._recoverAndRefresh(), { error: null };
    } catch (t) {
      return T(t) ? { error: t } : {
        error: new Ir("Unexpected error during initialization", t)
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
    var t, r, n;
    try {
      const i = await x(this.fetch, "POST", `${this.url}/signup`, {
        headers: this.headers,
        body: {
          data: (r = (t = e == null ? void 0 : e.options) === null || t === void 0 ? void 0 : t.data) !== null && r !== void 0 ? r : {},
          gotrue_meta_security: { captcha_token: (n = e == null ? void 0 : e.options) === null || n === void 0 ? void 0 : n.captchaToken }
        },
        xform: G
      }), { data: o, error: a } = i;
      if (a || !o)
        return { data: { user: null, session: null }, error: a };
      const l = o.session, c = o.user;
      return o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", l)), { data: { user: c, session: l }, error: null };
    } catch (i) {
      if (T(i))
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
    var t, r, n;
    try {
      let i;
      if ("email" in e) {
        const { email: u, password: d, options: h } = e;
        let p = null, g = null;
        this.flowType === "pkce" && ([p, g] = await Te(this.storage, this.storageKey)), i = await x(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          redirectTo: h == null ? void 0 : h.emailRedirectTo,
          body: {
            email: u,
            password: d,
            data: (t = h == null ? void 0 : h.data) !== null && t !== void 0 ? t : {},
            gotrue_meta_security: { captcha_token: h == null ? void 0 : h.captchaToken },
            code_challenge: p,
            code_challenge_method: g
          },
          xform: G
        });
      } else if ("phone" in e) {
        const { phone: u, password: d, options: h } = e;
        i = await x(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone: u,
            password: d,
            data: (r = h == null ? void 0 : h.data) !== null && r !== void 0 ? r : {},
            channel: (n = h == null ? void 0 : h.channel) !== null && n !== void 0 ? n : "sms",
            gotrue_meta_security: { captcha_token: h == null ? void 0 : h.captchaToken }
          },
          xform: G
        });
      } else
        throw new Qe("You must provide either an email or phone number and a password");
      const { data: o, error: a } = i;
      if (a || !o)
        return { data: { user: null, session: null }, error: a };
      const l = o.session, c = o.user;
      return o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", l)), { data: { user: c, session: l }, error: null };
    } catch (i) {
      if (T(i))
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
        t = await x(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            email: i,
            password: o,
            gotrue_meta_security: { captcha_token: a == null ? void 0 : a.captchaToken }
          },
          xform: or
        });
      } else if ("phone" in e) {
        const { phone: i, password: o, options: a } = e;
        t = await x(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            phone: i,
            password: o,
            gotrue_meta_security: { captcha_token: a == null ? void 0 : a.captchaToken }
          },
          xform: or
        });
      } else
        throw new Qe("You must provide either an email or phone number and a password");
      const { data: r, error: n } = t;
      return n ? { data: { user: null, session: null }, error: n } : !r || !r.session || !r.user ? { data: { user: null, session: null }, error: new De() } : (r.session && (await this._saveSession(r.session), await this._notifyAllSubscribers("SIGNED_IN", r.session)), {
        data: Object.assign({ user: r.user, session: r.session }, r.weak_password ? { weakPassword: r.weak_password } : null),
        error: n
      });
    } catch (t) {
      if (T(t))
        return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  /**
   * Log in an existing user via a third-party provider.
   * This method supports the PKCE flow.
   */
  async signInWithOAuth(e) {
    var t, r, n, i;
    return await this._handleProviderSignIn(e.provider, {
      redirectTo: (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo,
      scopes: (r = e.options) === null || r === void 0 ? void 0 : r.scopes,
      queryParams: (n = e.options) === null || n === void 0 ? void 0 : n.queryParams,
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
    var t, r, n, i, o, a, l, c, u, d, h;
    let p, g;
    if ("message" in e)
      p = e.message, g = e.signature;
    else {
      const { chain: _, wallet: m, statement: w, options: v } = e;
      let b;
      if (H())
        if (typeof m == "object")
          b = m;
        else {
          const A = window;
          if ("ethereum" in A && typeof A.ethereum == "object" && "request" in A.ethereum && typeof A.ethereum.request == "function")
            b = A.ethereum;
          else
            throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.");
        }
      else {
        if (typeof m != "object" || !(v != null && v.url))
          throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        b = m;
      }
      const y = new URL((t = v == null ? void 0 : v.url) !== null && t !== void 0 ? t : window.location.href), E = await b.request({
        method: "eth_requestAccounts"
      }).then((A) => A).catch(() => {
        throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid");
      });
      if (!E || E.length === 0)
        throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");
      const S = Nr(E[0]);
      let C = (r = v == null ? void 0 : v.signInWithEthereum) === null || r === void 0 ? void 0 : r.chainId;
      if (!C) {
        const A = await b.request({
          method: "eth_chainId"
        });
        C = ti(A);
      }
      const P = {
        domain: y.host,
        address: S,
        statement: w,
        uri: y.href,
        version: "1",
        chainId: C,
        nonce: (n = v == null ? void 0 : v.signInWithEthereum) === null || n === void 0 ? void 0 : n.nonce,
        issuedAt: (o = (i = v == null ? void 0 : v.signInWithEthereum) === null || i === void 0 ? void 0 : i.issuedAt) !== null && o !== void 0 ? o : /* @__PURE__ */ new Date(),
        expirationTime: (a = v == null ? void 0 : v.signInWithEthereum) === null || a === void 0 ? void 0 : a.expirationTime,
        notBefore: (l = v == null ? void 0 : v.signInWithEthereum) === null || l === void 0 ? void 0 : l.notBefore,
        requestId: (c = v == null ? void 0 : v.signInWithEthereum) === null || c === void 0 ? void 0 : c.requestId,
        resources: (u = v == null ? void 0 : v.signInWithEthereum) === null || u === void 0 ? void 0 : u.resources
      };
      p = si(P), g = await b.request({
        method: "personal_sign",
        params: [ri(p), S]
      });
    }
    try {
      const { data: _, error: m } = await x(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({
          chain: "ethereum",
          message: p,
          signature: g
        }, !((d = e.options) === null || d === void 0) && d.captchaToken ? { gotrue_meta_security: { captcha_token: (h = e.options) === null || h === void 0 ? void 0 : h.captchaToken } } : null),
        xform: G
      });
      if (m)
        throw m;
      return !_ || !_.session || !_.user ? {
        data: { user: null, session: null },
        error: new De()
      } : (_.session && (await this._saveSession(_.session), await this._notifyAllSubscribers("SIGNED_IN", _.session)), { data: Object.assign({}, _), error: m });
    } catch (_) {
      if (T(_))
        return { data: { user: null, session: null }, error: _ };
      throw _;
    }
  }
  async signInWithSolana(e) {
    var t, r, n, i, o, a, l, c, u, d, h, p;
    let g, _;
    if ("message" in e)
      g = e.message, _ = e.signature;
    else {
      const { chain: m, wallet: w, statement: v, options: b } = e;
      let y;
      if (H())
        if (typeof w == "object")
          y = w;
        else {
          const S = window;
          if ("solana" in S && typeof S.solana == "object" && ("signIn" in S.solana && typeof S.solana.signIn == "function" || "signMessage" in S.solana && typeof S.solana.signMessage == "function"))
            y = S.solana;
          else
            throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.");
        }
      else {
        if (typeof w != "object" || !(b != null && b.url))
          throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        y = w;
      }
      const E = new URL((t = b == null ? void 0 : b.url) !== null && t !== void 0 ? t : window.location.href);
      if ("signIn" in y && y.signIn) {
        const S = await y.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, b == null ? void 0 : b.signInWithSolana), {
          // non-overridable properties
          version: "1",
          domain: E.host,
          uri: E.href
        }), v ? { statement: v } : null));
        let C;
        if (Array.isArray(S) && S[0] && typeof S[0] == "object")
          C = S[0];
        else if (S && typeof S == "object" && "signedMessage" in S && "signature" in S)
          C = S;
        else
          throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
        if ("signedMessage" in C && "signature" in C && (typeof C.signedMessage == "string" || C.signedMessage instanceof Uint8Array) && C.signature instanceof Uint8Array)
          g = typeof C.signedMessage == "string" ? C.signedMessage : new TextDecoder().decode(C.signedMessage), _ = C.signature;
        else
          throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
      } else {
        if (!("signMessage" in y) || typeof y.signMessage != "function" || !("publicKey" in y) || typeof y != "object" || !y.publicKey || !("toBase58" in y.publicKey) || typeof y.publicKey.toBase58 != "function")
          throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
        g = [
          `${E.host} wants you to sign in with your Solana account:`,
          y.publicKey.toBase58(),
          ...v ? ["", v, ""] : [""],
          "Version: 1",
          `URI: ${E.href}`,
          `Issued At: ${(n = (r = b == null ? void 0 : b.signInWithSolana) === null || r === void 0 ? void 0 : r.issuedAt) !== null && n !== void 0 ? n : (/* @__PURE__ */ new Date()).toISOString()}`,
          ...!((i = b == null ? void 0 : b.signInWithSolana) === null || i === void 0) && i.notBefore ? [`Not Before: ${b.signInWithSolana.notBefore}`] : [],
          ...!((o = b == null ? void 0 : b.signInWithSolana) === null || o === void 0) && o.expirationTime ? [`Expiration Time: ${b.signInWithSolana.expirationTime}`] : [],
          ...!((a = b == null ? void 0 : b.signInWithSolana) === null || a === void 0) && a.chainId ? [`Chain ID: ${b.signInWithSolana.chainId}`] : [],
          ...!((l = b == null ? void 0 : b.signInWithSolana) === null || l === void 0) && l.nonce ? [`Nonce: ${b.signInWithSolana.nonce}`] : [],
          ...!((c = b == null ? void 0 : b.signInWithSolana) === null || c === void 0) && c.requestId ? [`Request ID: ${b.signInWithSolana.requestId}`] : [],
          ...!((d = (u = b == null ? void 0 : b.signInWithSolana) === null || u === void 0 ? void 0 : u.resources) === null || d === void 0) && d.length ? [
            "Resources",
            ...b.signInWithSolana.resources.map((C) => `- ${C}`)
          ] : []
        ].join(`
`);
        const S = await y.signMessage(new TextEncoder().encode(g), "utf8");
        if (!S || !(S instanceof Uint8Array))
          throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
        _ = S;
      }
    }
    try {
      const { data: m, error: w } = await x(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({ chain: "solana", message: g, signature: Cn(_) }, !((h = e.options) === null || h === void 0) && h.captchaToken ? { gotrue_meta_security: { captcha_token: (p = e.options) === null || p === void 0 ? void 0 : p.captchaToken } } : null),
        xform: G
      });
      if (w)
        throw w;
      return !m || !m.session || !m.user ? {
        data: { user: null, session: null },
        error: new De()
      } : (m.session && (await this._saveSession(m.session), await this._notifyAllSubscribers("SIGNED_IN", m.session)), { data: Object.assign({}, m), error: w });
    } catch (m) {
      if (T(m))
        return { data: { user: null, session: null }, error: m };
      throw m;
    }
  }
  async _exchangeCodeForSession(e) {
    const t = await ce(this.storage, `${this.storageKey}-code-verifier`), [r, n] = (t ?? "").split("/");
    try {
      const { data: i, error: o } = await x(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
        headers: this.headers,
        body: {
          auth_code: e,
          code_verifier: r
        },
        xform: G
      });
      if (await te(this.storage, `${this.storageKey}-code-verifier`), o)
        throw o;
      return !i || !i.session || !i.user ? {
        data: { user: null, session: null, redirectType: null },
        error: new De()
      } : (i.session && (await this._saveSession(i.session), await this._notifyAllSubscribers("SIGNED_IN", i.session)), { data: Object.assign(Object.assign({}, i), { redirectType: n ?? null }), error: o });
    } catch (i) {
      if (T(i))
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
      const { options: t, provider: r, token: n, access_token: i, nonce: o } = e, a = await x(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
        headers: this.headers,
        body: {
          provider: r,
          id_token: n,
          access_token: i,
          nonce: o,
          gotrue_meta_security: { captcha_token: t == null ? void 0 : t.captchaToken }
        },
        xform: G
      }), { data: l, error: c } = a;
      return c ? { data: { user: null, session: null }, error: c } : !l || !l.session || !l.user ? {
        data: { user: null, session: null },
        error: new De()
      } : (l.session && (await this._saveSession(l.session), await this._notifyAllSubscribers("SIGNED_IN", l.session)), { data: l, error: c });
    } catch (t) {
      if (T(t))
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
    var t, r, n, i, o;
    try {
      if ("email" in e) {
        const { email: a, options: l } = e;
        let c = null, u = null;
        this.flowType === "pkce" && ([c, u] = await Te(this.storage, this.storageKey));
        const { error: d } = await x(this.fetch, "POST", `${this.url}/otp`, {
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
        const { phone: a, options: l } = e, { data: c, error: u } = await x(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            phone: a,
            data: (n = l == null ? void 0 : l.data) !== null && n !== void 0 ? n : {},
            create_user: (i = l == null ? void 0 : l.shouldCreateUser) !== null && i !== void 0 ? i : !0,
            gotrue_meta_security: { captcha_token: l == null ? void 0 : l.captchaToken },
            channel: (o = l == null ? void 0 : l.channel) !== null && o !== void 0 ? o : "sms"
          }
        });
        return { data: { user: null, session: null, messageId: c == null ? void 0 : c.message_id }, error: u };
      }
      throw new Qe("You must provide either an email or phone number.");
    } catch (a) {
      if (T(a))
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
      let n, i;
      "options" in e && (n = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo, i = (r = e.options) === null || r === void 0 ? void 0 : r.captchaToken);
      const { data: o, error: a } = await x(this.fetch, "POST", `${this.url}/verify`, {
        headers: this.headers,
        body: Object.assign(Object.assign({}, e), { gotrue_meta_security: { captcha_token: i } }),
        redirectTo: n,
        xform: G
      });
      if (a)
        throw a;
      if (!o)
        throw new Error("An error occurred on token verification.");
      const l = o.session, c = o.user;
      return l != null && l.access_token && (await this._saveSession(l), await this._notifyAllSubscribers(e.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", l)), { data: { user: c, session: l }, error: null };
    } catch (n) {
      if (T(n))
        return { data: { user: null, session: null }, error: n };
      throw n;
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
    var t, r, n;
    try {
      let i = null, o = null;
      return this.flowType === "pkce" && ([i, o] = await Te(this.storage, this.storageKey)), await x(this.fetch, "POST", `${this.url}/sso`, {
        body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e ? { provider_id: e.providerId } : null), "domain" in e ? { domain: e.domain } : null), { redirect_to: (r = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo) !== null && r !== void 0 ? r : void 0 }), !((n = e == null ? void 0 : e.options) === null || n === void 0) && n.captchaToken ? { gotrue_meta_security: { captcha_token: e.options.captchaToken } } : null), { skip_http_redirect: !0, code_challenge: i, code_challenge_method: o }),
        headers: this.headers,
        xform: Vn
      });
    } catch (i) {
      if (T(i))
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
          throw new re();
        const { error: n } = await x(this.fetch, "GET", `${this.url}/reauthenticate`, {
          headers: this.headers,
          jwt: t.access_token
        });
        return { data: { user: null, session: null }, error: n };
      });
    } catch (e) {
      if (T(e))
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
        const { email: r, type: n, options: i } = e, { error: o } = await x(this.fetch, "POST", t, {
          headers: this.headers,
          body: {
            email: r,
            type: n,
            gotrue_meta_security: { captcha_token: i == null ? void 0 : i.captchaToken }
          },
          redirectTo: i == null ? void 0 : i.emailRedirectTo
        });
        return { data: { user: null, session: null }, error: o };
      } else if ("phone" in e) {
        const { phone: r, type: n, options: i } = e, { data: o, error: a } = await x(this.fetch, "POST", t, {
          headers: this.headers,
          body: {
            phone: r,
            type: n,
            gotrue_meta_security: { captcha_token: i == null ? void 0 : i.captchaToken }
          }
        });
        return { data: { user: null, session: null, messageId: o == null ? void 0 : o.message_id }, error: a };
      }
      throw new Qe("You must provide either an email or phone number and a type");
    } catch (t) {
      if (T(t))
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
        const r = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), n = (async () => (await r, await t()))();
        return this.pendingInLock.push((async () => {
          try {
            await n;
          } catch {
          }
        })()), n;
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
            const n = [...this.pendingInLock];
            await Promise.all(n), this.pendingInLock.splice(0, n.length);
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
      const t = await ce(this.storage, this.storageKey);
      if (this._debug("#getSession()", "session from storage", t), t !== null && (this._isValidSession(t) ? e = t : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !e)
        return { data: { session: null }, error: null };
      const r = e.expires_at ? e.expires_at * 1e3 - Date.now() < ct : !1;
      if (this._debug("#__loadSession()", `session has${r ? "" : " not"} expired`, "expires_at", e.expires_at), !r) {
        if (this.userStorage) {
          const o = await ce(this.userStorage, this.storageKey + "-user");
          o != null && o.user ? e.user = o.user : e.user = ht();
        }
        if (this.storage.isServer && e.user) {
          let o = this.suppressGetSessionWarning;
          e = new Proxy(e, {
            get: (l, c, u) => (!o && c === "user" && (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), o = !0, this.suppressGetSessionWarning = !0), Reflect.get(l, c, u))
          });
        }
        return { data: { session: e }, error: null };
      }
      const { session: n, error: i } = await this._callRefreshToken(e.refresh_token);
      return i ? { data: { session: null }, error: i } : { data: { session: n }, error: null };
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
      return e ? await x(this.fetch, "GET", `${this.url}/user`, {
        headers: this.headers,
        jwt: e,
        xform: se
      }) : await this._useSession(async (t) => {
        var r, n, i;
        const { data: o, error: a } = t;
        if (a)
          throw a;
        return !(!((r = o.session) === null || r === void 0) && r.access_token) && !this.hasCustomAuthorizationHeader ? { data: { user: null }, error: new re() } : await x(this.fetch, "GET", `${this.url}/user`, {
          headers: this.headers,
          jwt: (i = (n = o.session) === null || n === void 0 ? void 0 : n.access_token) !== null && i !== void 0 ? i : void 0,
          xform: se
        });
      });
    } catch (t) {
      if (T(t))
        return _n(t) && (await this._removeSession(), await te(this.storage, `${this.storageKey}-code-verifier`)), { data: { user: null }, error: t };
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
        const { data: n, error: i } = r;
        if (i)
          throw i;
        if (!n.session)
          throw new re();
        const o = n.session;
        let a = null, l = null;
        this.flowType === "pkce" && e.email != null && ([a, l] = await Te(this.storage, this.storageKey));
        const { data: c, error: u } = await x(this.fetch, "PUT", `${this.url}/user`, {
          headers: this.headers,
          redirectTo: t == null ? void 0 : t.emailRedirectTo,
          body: Object.assign(Object.assign({}, e), { code_challenge: a, code_challenge_method: l }),
          jwt: o.access_token,
          xform: se
        });
        if (u)
          throw u;
        return o.user = c.user, await this._saveSession(o), await this._notifyAllSubscribers("USER_UPDATED", o), { data: { user: o.user }, error: null };
      });
    } catch (r) {
      if (T(r))
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
        throw new re();
      const t = Date.now() / 1e3;
      let r = t, n = !0, i = null;
      const { payload: o } = dt(e.access_token);
      if (o.exp && (r = o.exp, n = r <= t), n) {
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
      if (T(t))
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
          throw new re();
        const { session: n, error: i } = await this._callRefreshToken(e.refresh_token);
        return i ? { data: { user: null, session: null }, error: i } : n ? { data: { user: n.user, session: n }, error: null } : { data: { user: null, session: null }, error: null };
      });
    } catch (t) {
      if (T(t))
        return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  /**
   * Gets the session data from a URL string
   */
  async _getSessionFromURL(e, t) {
    try {
      if (!H())
        throw new Xe("No browser detected.");
      if (e.error || e.error_description || e.error_code)
        throw new Xe(e.error_description || "Error in URL with unspecified error_description", {
          error: e.error || "unspecified_error",
          code: e.error_code || "unspecified_code"
        });
      switch (t) {
        case "implicit":
          if (this.flowType === "pkce")
            throw new Xt("Not a valid PKCE flow url.");
          break;
        case "pkce":
          if (this.flowType === "implicit")
            throw new Xe("Not a valid implicit grant flow url.");
          break;
        default:
      }
      if (t === "pkce") {
        if (this._debug("#_initialize()", "begin", "is PKCE flow", !0), !e.code)
          throw new Xt("No code detected.");
        const { data: v, error: b } = await this._exchangeCodeForSession(e.code);
        if (b)
          throw b;
        const y = new URL(window.location.href);
        return y.searchParams.delete("code"), window.history.replaceState(window.history.state, "", y.toString()), { data: { session: v.session, redirectType: null }, error: null };
      }
      const { provider_token: r, provider_refresh_token: n, access_token: i, refresh_token: o, expires_in: a, expires_at: l, token_type: c } = e;
      if (!i || !a || !o || !c)
        throw new Xe("No session defined in URL");
      const u = Math.round(Date.now() / 1e3), d = parseInt(a);
      let h = u + d;
      l && (h = parseInt(l));
      const p = h - u;
      p * 1e3 <= Oe && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${p}s, should have been closer to ${d}s`);
      const g = h - d;
      u - g >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", g, h, u) : u - g < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", g, h, u);
      const { data: _, error: m } = await this._getUser(i);
      if (m)
        throw m;
      const w = {
        provider_token: r,
        provider_refresh_token: n,
        access_token: i,
        expires_in: d,
        expires_at: h,
        refresh_token: o,
        token_type: c,
        user: _.user
      };
      return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), { data: { session: w, redirectType: e.type }, error: null };
    } catch (r) {
      if (T(r))
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
    const t = await ce(this.storage, `${this.storageKey}-code-verifier`);
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
      const { data: n, error: i } = t;
      if (i)
        return { error: i };
      const o = (r = n.session) === null || r === void 0 ? void 0 : r.access_token;
      if (o) {
        const { error: a } = await this.admin.signOut(o, e);
        if (a && !(vn(a) && (a.status === 404 || a.status === 401 || a.status === 403)))
          return { error: a };
      }
      return e !== "others" && (await this._removeSession(), await te(this.storage, `${this.storageKey}-code-verifier`)), { error: null };
    });
  }
  /**
   * Receive a notification every time an auth event happens.
   * @param callback A callback function to be invoked when an auth event happens.
   */
  onAuthStateChange(e) {
    const t = jn(), r = {
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
      var r, n;
      try {
        const { data: { session: i }, error: o } = t;
        if (o)
          throw o;
        await ((r = this.stateChangeEmitters.get(e)) === null || r === void 0 ? void 0 : r.callback("INITIAL_SESSION", i)), this._debug("INITIAL_SESSION", "callback id", e, "session", i);
      } catch (i) {
        await ((n = this.stateChangeEmitters.get(e)) === null || n === void 0 ? void 0 : n.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e, "error", i), console.error(i);
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
    let r = null, n = null;
    this.flowType === "pkce" && ([r, n] = await Te(
      this.storage,
      this.storageKey,
      !0
      // isPasswordRecovery
    ));
    try {
      return await x(this.fetch, "POST", `${this.url}/recover`, {
        body: {
          email: e,
          code_challenge: r,
          code_challenge_method: n,
          gotrue_meta_security: { captcha_token: t.captchaToken }
        },
        headers: this.headers,
        redirectTo: t.redirectTo
      });
    } catch (i) {
      if (T(i))
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
      if (T(t))
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
      const { data: r, error: n } = await this._useSession(async (i) => {
        var o, a, l, c, u;
        const { data: d, error: h } = i;
        if (h)
          throw h;
        const p = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e.provider, {
          redirectTo: (o = e.options) === null || o === void 0 ? void 0 : o.redirectTo,
          scopes: (a = e.options) === null || a === void 0 ? void 0 : a.scopes,
          queryParams: (l = e.options) === null || l === void 0 ? void 0 : l.queryParams,
          skipBrowserRedirect: !0
        });
        return await x(this.fetch, "GET", p, {
          headers: this.headers,
          jwt: (u = (c = d.session) === null || c === void 0 ? void 0 : c.access_token) !== null && u !== void 0 ? u : void 0
        });
      });
      if (n)
        throw n;
      return H() && !(!((t = e.options) === null || t === void 0) && t.skipBrowserRedirect) && window.location.assign(r == null ? void 0 : r.url), { data: { provider: e.provider, url: r == null ? void 0 : r.url }, error: null };
    } catch (r) {
      if (T(r))
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
        var r, n;
        const { data: i, error: o } = t;
        if (o)
          throw o;
        return await x(this.fetch, "DELETE", `${this.url}/user/identities/${e.identity_id}`, {
          headers: this.headers,
          jwt: (n = (r = i.session) === null || r === void 0 ? void 0 : r.access_token) !== null && n !== void 0 ? n : void 0
        });
      });
    } catch (t) {
      if (T(t))
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
      return await An(async (n) => (n > 0 && await On(200 * Math.pow(2, n - 1)), this._debug(t, "refreshing attempt", n), await x(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
        body: { refresh_token: e },
        headers: this.headers,
        xform: G
      })), (n, i) => {
        const o = 200 * Math.pow(2, n);
        return i && ut(i) && // retryable only if the request can be sent before the backoff overflows the tick duration
        Date.now() + o - r < Oe;
      });
    } catch (r) {
      if (this._debug(t, "error", r), T(r))
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
    return this._debug("#_handleProviderSignIn()", "provider", e, "options", t, "url", r), H() && !t.skipBrowserRedirect && window.location.assign(r), { data: { provider: e, url: r }, error: null };
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
      const n = await ce(this.storage, this.storageKey);
      if (n && this.userStorage) {
        let o = await ce(this.userStorage, this.storageKey + "-user");
        !this.storage.isServer && Object.is(this.storage, this.userStorage) && !o && (o = { user: n.user }, await Ae(this.userStorage, this.storageKey + "-user", o)), n.user = (e = o == null ? void 0 : o.user) !== null && e !== void 0 ? e : ht();
      } else if (n && !n.user && !n.user) {
        const o = await ce(this.storage, this.storageKey + "-user");
        o && (o != null && o.user) ? (n.user = o.user, await te(this.storage, this.storageKey + "-user"), await Ae(this.storage, this.storageKey, n)) : n.user = ht();
      }
      if (this._debug(r, "session from storage", n), !this._isValidSession(n)) {
        this._debug(r, "session is not valid"), n !== null && await this._removeSession();
        return;
      }
      const i = ((t = n.expires_at) !== null && t !== void 0 ? t : 1 / 0) * 1e3 - Date.now() < ct;
      if (this._debug(r, `session has${i ? "" : " not"} expired with margin of ${ct}s`), i) {
        if (this.autoRefreshToken && n.refresh_token) {
          const { error: o } = await this._callRefreshToken(n.refresh_token);
          o && (console.error(o), ut(o) || (this._debug(r, "refresh failed with a non-retryable error, removing the session", o), await this._removeSession()));
        }
      } else if (n.user && n.user.__isUserNotAvailableProxy === !0)
        try {
          const { data: o, error: a } = await this._getUser(n.access_token);
          !a && (o != null && o.user) ? (n.user = o.user, await this._saveSession(n), await this._notifyAllSubscribers("SIGNED_IN", n)) : this._debug(r, "could not get user data, skipping SIGNED_IN notification");
        } catch (o) {
          console.error("Error getting user data:", o), this._debug(r, "error getting user data, skipping SIGNED_IN notification", o);
        }
      else
        await this._notifyAllSubscribers("SIGNED_IN", n);
    } catch (n) {
      this._debug(r, "error", n), console.error(n);
      return;
    } finally {
      this._debug(r, "end");
    }
  }
  async _callRefreshToken(e) {
    var t, r;
    if (!e)
      throw new re();
    if (this.refreshingDeferred)
      return this.refreshingDeferred.promise;
    const n = `#_callRefreshToken(${e.substring(0, 5)}...)`;
    this._debug(n, "begin");
    try {
      this.refreshingDeferred = new st();
      const { data: i, error: o } = await this._refreshAccessToken(e);
      if (o)
        throw o;
      if (!i.session)
        throw new re();
      await this._saveSession(i.session), await this._notifyAllSubscribers("TOKEN_REFRESHED", i.session);
      const a = { session: i.session, error: null };
      return this.refreshingDeferred.resolve(a), a;
    } catch (i) {
      if (this._debug(n, "error", i), T(i)) {
        const o = { session: null, error: i };
        return ut(i) || await this._removeSession(), (t = this.refreshingDeferred) === null || t === void 0 || t.resolve(o), o;
      }
      throw (r = this.refreshingDeferred) === null || r === void 0 || r.reject(i), i;
    } finally {
      this.refreshingDeferred = null, this._debug(n, "end");
    }
  }
  async _notifyAllSubscribers(e, t, r = !0) {
    const n = `#_notifyAllSubscribers(${e})`;
    this._debug(n, "begin", t, `broadcast = ${r}`);
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
      this._debug(n, "end");
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
      !r && t.user && await Ae(this.userStorage, this.storageKey + "-user", {
        user: t.user
      });
      const n = Object.assign({}, t);
      delete n.user;
      const i = nr(n);
      await Ae(this.storage, this.storageKey, i);
    } else {
      const n = nr(t);
      await Ae(this.storage, this.storageKey, n);
    }
  }
  async _removeSession() {
    this._debug("#_removeSession()"), await te(this.storage, this.storageKey), await te(this.storage, this.storageKey + "-code-verifier"), await te(this.storage, this.storageKey + "-user"), this.userStorage && await te(this.userStorage, this.storageKey + "-user"), await this._notifyAllSubscribers("SIGNED_OUT", null);
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
      e && H() && (window != null && window.removeEventListener) && window.removeEventListener("visibilitychange", e);
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
    const e = setInterval(() => this._autoRefreshTokenTick(), Oe);
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
              const n = Math.floor((r.expires_at * 1e3 - e) / Oe);
              this._debug("#_autoRefreshTokenTick()", `access token expires in ${n} ticks, a tick lasts ${Oe}ms, refresh threshold is ${St} ticks`), n <= St && await this._callRefreshToken(r.refresh_token);
            });
          } catch (t) {
            console.error("Auto refresh tick failed with error. This is likely a transient error.", t);
          }
        } finally {
          this._debug("#_autoRefreshTokenTick()", "end");
        }
      });
    } catch (e) {
      if (e.isAcquireTimeout || e instanceof Ur)
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
    if (this._debug("#_handleVisibilityChange()"), !H() || !(window != null && window.addEventListener))
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
    const n = [`provider=${encodeURIComponent(t)}`];
    if (r != null && r.redirectTo && n.push(`redirect_to=${encodeURIComponent(r.redirectTo)}`), r != null && r.scopes && n.push(`scopes=${encodeURIComponent(r.scopes)}`), this.flowType === "pkce") {
      const [i, o] = await Te(this.storage, this.storageKey), a = new URLSearchParams({
        code_challenge: `${encodeURIComponent(i)}`,
        code_challenge_method: `${encodeURIComponent(o)}`
      });
      n.push(a.toString());
    }
    if (r != null && r.queryParams) {
      const i = new URLSearchParams(r.queryParams);
      n.push(i.toString());
    }
    return r != null && r.skipBrowserRedirect && n.push(`skip_http_redirect=${r.skipBrowserRedirect}`), `${e}?${n.join("&")}`;
  }
  async _unenroll(e) {
    try {
      return await this._useSession(async (t) => {
        var r;
        const { data: n, error: i } = t;
        return i ? { data: null, error: i } : await x(this.fetch, "DELETE", `${this.url}/factors/${e.factorId}`, {
          headers: this.headers,
          jwt: (r = n == null ? void 0 : n.session) === null || r === void 0 ? void 0 : r.access_token
        });
      });
    } catch (t) {
      if (T(t))
        return { data: null, error: t };
      throw t;
    }
  }
  async _enroll(e) {
    try {
      return await this._useSession(async (t) => {
        var r, n;
        const { data: i, error: o } = t;
        if (o)
          return { data: null, error: o };
        const a = Object.assign({ friendly_name: e.friendlyName, factor_type: e.factorType }, e.factorType === "phone" ? { phone: e.phone } : { issuer: e.issuer }), { data: l, error: c } = await x(this.fetch, "POST", `${this.url}/factors`, {
          body: a,
          headers: this.headers,
          jwt: (r = i == null ? void 0 : i.session) === null || r === void 0 ? void 0 : r.access_token
        });
        return c ? { data: null, error: c } : (e.factorType === "totp" && (!((n = l == null ? void 0 : l.totp) === null || n === void 0) && n.qr_code) && (l.totp.qr_code = `data:image/svg+xml;utf-8,${l.totp.qr_code}`), { data: l, error: null });
      });
    } catch (t) {
      if (T(t))
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
          const { data: n, error: i } = t;
          if (i)
            return { data: null, error: i };
          const { data: o, error: a } = await x(this.fetch, "POST", `${this.url}/factors/${e.factorId}/verify`, {
            body: { code: e.code, challenge_id: e.challengeId },
            headers: this.headers,
            jwt: (r = n == null ? void 0 : n.session) === null || r === void 0 ? void 0 : r.access_token
          });
          return a ? { data: null, error: a } : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + o.expires_in }, o)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", o), { data: o, error: a });
        });
      } catch (t) {
        if (T(t))
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
          const { data: n, error: i } = t;
          return i ? { data: null, error: i } : await x(this.fetch, "POST", `${this.url}/factors/${e.factorId}/challenge`, {
            body: { channel: e.channel },
            headers: this.headers,
            jwt: (r = n == null ? void 0 : n.session) === null || r === void 0 ? void 0 : r.access_token
          });
        });
      } catch (t) {
        if (T(t))
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
    const r = (e == null ? void 0 : e.factors) || [], n = r.filter((o) => o.factor_type === "totp" && o.status === "verified"), i = r.filter((o) => o.factor_type === "phone" && o.status === "verified");
    return {
      data: {
        all: r,
        totp: n,
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
      const { data: { session: n }, error: i } = e;
      if (i)
        return { data: null, error: i };
      if (!n)
        return {
          data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
          error: null
        };
      const { payload: o } = dt(n.access_token);
      let a = null;
      o.aal && (a = o.aal);
      let l = a;
      ((r = (t = n.user.factors) === null || t === void 0 ? void 0 : t.filter((d) => d.status === "verified")) !== null && r !== void 0 ? r : []).length > 0 && (l = "aal2");
      const u = o.amr || [];
      return { data: { currentLevel: a, nextLevel: l, currentAuthenticationMethods: u }, error: null };
    }));
  }
  async fetchJwk(e, t = { keys: [] }) {
    let r = t.keys.find((a) => a.kid === e);
    if (r)
      return r;
    const n = Date.now();
    if (r = this.jwks.keys.find((a) => a.kid === e), r && this.jwks_cached_at + gn > n)
      return r;
    const { data: i, error: o } = await x(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, {
      headers: this.headers
    });
    if (o)
      throw o;
    return !i.keys || i.keys.length === 0 || (this.jwks = i, this.jwks_cached_at = n, r = i.keys.find((a) => a.kid === e), !r) ? null : r;
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
        const { data: p, error: g } = await this.getSession();
        if (g || !p.session)
          return { data: null, error: g };
        r = p.session.access_token;
      }
      const { header: n, payload: i, signature: o, raw: { header: a, payload: l } } = dt(r);
      t != null && t.allowExpired || Dn(i.exp);
      const c = !n.alg || n.alg.startsWith("HS") || !n.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(n.kid, t != null && t.keys ? { keys: t.keys } : t == null ? void 0 : t.jwks);
      if (!c) {
        const { error: p } = await this.getUser(r);
        if (p)
          throw p;
        return {
          data: {
            claims: i,
            header: n,
            signature: o
          },
          error: null
        };
      }
      const u = Mn(n.alg), d = await crypto.subtle.importKey("jwk", c, u, !0, [
        "verify"
      ]);
      if (!await crypto.subtle.verify(u, d, o, Tn(`${a}.${l}`)))
        throw new Ct("Invalid JWT signature");
      return {
        data: {
          claims: i,
          header: n,
          signature: o
        },
        error: null
      };
    } catch (r) {
      if (T(r))
        return { data: null, error: r };
      throw r;
    }
  }
}
Ge.nextInstanceID = 0;
const ii = Ge;
class oi extends ii {
  constructor(e) {
    super(e);
  }
}
var ai = function(s, e, t, r) {
  function n(i) {
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
      u.done ? i(u.value) : n(u.value).then(a, l);
    }
    c((r = r.apply(s, [])).next());
  });
};
class li {
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
    var n, i, o;
    this.supabaseUrl = e, this.supabaseKey = t;
    const a = un(e);
    if (!t)
      throw new Error("supabaseKey is required.");
    this.realtimeUrl = new URL("realtime/v1", a), this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws"), this.authUrl = new URL("auth/v1", a), this.storageUrl = new URL("storage/v1", a), this.functionsUrl = new URL("functions/v1", a);
    const l = `sb-${a.hostname.split(".")[0]}-auth-token`, c = {
      db: Xs,
      realtime: tn,
      auth: Object.assign(Object.assign({}, en), { storageKey: l }),
      global: Qs
    }, u = cn(r ?? {}, c);
    this.storageKey = (n = u.auth.storageKey) !== null && n !== void 0 ? n : "", this.headers = (i = u.global.headers) !== null && i !== void 0 ? i : {}, u.accessToken ? (this.accessToken = u.accessToken, this.auth = new Proxy({}, {
      get: (d, h) => {
        throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(h)} is not possible`);
      }
    })) : this.auth = this._initSupabaseAuthClient((o = u.auth) !== null && o !== void 0 ? o : {}, this.headers, u.global.fetch), this.fetch = on(t, this._getAccessToken.bind(this), u.global.fetch), this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, u.realtime)), this.rest = new gs(new URL("rest/v1", a).href, {
      headers: this.headers,
      schema: u.db.schema,
      fetch: this.fetch
    }), this.storage = new Js(this.storageUrl.href, this.headers, this.fetch, r == null ? void 0 : r.storage), u.accessToken || this._listenForAuthEvents();
  }
  /**
   * Supabase Functions allows you to deploy and invoke edge functions.
   */
  get functions() {
    return new is(this.functionsUrl.href, {
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
    return ai(this, void 0, void 0, function* () {
      if (this.accessToken)
        return yield this.accessToken();
      const { data: r } = yield this.auth.getSession();
      return (t = (e = r.session) === null || e === void 0 ? void 0 : e.access_token) !== null && t !== void 0 ? t : this.supabaseKey;
    });
  }
  _initSupabaseAuthClient({ autoRefreshToken: e, persistSession: t, detectSessionInUrl: r, storage: n, userStorage: i, storageKey: o, flowType: a, lock: l, debug: c }, u, d) {
    const h = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new oi({
      url: this.authUrl.href,
      headers: Object.assign(Object.assign({}, h), u),
      storageKey: o,
      autoRefreshToken: e,
      persistSession: t,
      detectSessionInUrl: r,
      storage: n,
      userStorage: i,
      flowType: a,
      lock: l,
      debug: c,
      fetch: d,
      // auth checks if there is a custom authorizaiton header using this flag
      // so it knows whether to return an error when getUser is called with no session
      hasCustomAuthorizationHeader: Object.keys(this.headers).some((p) => p.toLowerCase() === "authorization")
    });
  }
  _initRealtimeClient(e) {
    return new As(this.realtimeUrl.href, Object.assign(Object.assign({}, e), { params: Object.assign({ apikey: this.supabaseKey }, e == null ? void 0 : e.params) }));
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
const ci = (s, e, t) => new li(s, e, t);
function ui() {
  if (typeof window < "u" || typeof process > "u")
    return !1;
  const s = process.version;
  if (s == null)
    return !1;
  const e = s.match(/^v(\d+)\./);
  return e ? parseInt(e[1], 10) <= 18 : !1;
}
ui() && console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");
var cr, $ = "colors", z = "sizes", k = "space", di = { gap: k, gridGap: k, columnGap: k, gridColumnGap: k, rowGap: k, gridRowGap: k, inset: k, insetBlock: k, insetBlockEnd: k, insetBlockStart: k, insetInline: k, insetInlineEnd: k, insetInlineStart: k, margin: k, marginTop: k, marginRight: k, marginBottom: k, marginLeft: k, marginBlock: k, marginBlockEnd: k, marginBlockStart: k, marginInline: k, marginInlineEnd: k, marginInlineStart: k, padding: k, paddingTop: k, paddingRight: k, paddingBottom: k, paddingLeft: k, paddingBlock: k, paddingBlockEnd: k, paddingBlockStart: k, paddingInline: k, paddingInlineEnd: k, paddingInlineStart: k, top: k, right: k, bottom: k, left: k, scrollMargin: k, scrollMarginTop: k, scrollMarginRight: k, scrollMarginBottom: k, scrollMarginLeft: k, scrollMarginX: k, scrollMarginY: k, scrollMarginBlock: k, scrollMarginBlockEnd: k, scrollMarginBlockStart: k, scrollMarginInline: k, scrollMarginInlineEnd: k, scrollMarginInlineStart: k, scrollPadding: k, scrollPaddingTop: k, scrollPaddingRight: k, scrollPaddingBottom: k, scrollPaddingLeft: k, scrollPaddingX: k, scrollPaddingY: k, scrollPaddingBlock: k, scrollPaddingBlockEnd: k, scrollPaddingBlockStart: k, scrollPaddingInline: k, scrollPaddingInlineEnd: k, scrollPaddingInlineStart: k, fontSize: "fontSizes", background: $, backgroundColor: $, backgroundImage: $, borderImage: $, border: $, borderBlock: $, borderBlockEnd: $, borderBlockStart: $, borderBottom: $, borderBottomColor: $, borderColor: $, borderInline: $, borderInlineEnd: $, borderInlineStart: $, borderLeft: $, borderLeftColor: $, borderRight: $, borderRightColor: $, borderTop: $, borderTopColor: $, caretColor: $, color: $, columnRuleColor: $, fill: $, outline: $, outlineColor: $, stroke: $, textDecorationColor: $, fontFamily: "fonts", fontWeight: "fontWeights", lineHeight: "lineHeights", letterSpacing: "letterSpacings", blockSize: z, minBlockSize: z, maxBlockSize: z, inlineSize: z, minInlineSize: z, maxInlineSize: z, width: z, minWidth: z, maxWidth: z, height: z, minHeight: z, maxHeight: z, flexBasis: z, gridTemplateColumns: z, gridTemplateRows: z, borderWidth: "borderWidths", borderTopWidth: "borderWidths", borderRightWidth: "borderWidths", borderBottomWidth: "borderWidths", borderLeftWidth: "borderWidths", borderStyle: "borderStyles", borderTopStyle: "borderStyles", borderRightStyle: "borderStyles", borderBottomStyle: "borderStyles", borderLeftStyle: "borderStyles", borderRadius: "radii", borderTopLeftRadius: "radii", borderTopRightRadius: "radii", borderBottomRightRadius: "radii", borderBottomLeftRadius: "radii", boxShadow: "shadows", textShadow: "shadows", transition: "transitions", zIndex: "zIndices" }, hi = (s, e) => typeof e == "function" ? { "()": Function.prototype.toString.call(e) } : e, Je = () => {
  const s = /* @__PURE__ */ Object.create(null);
  return (e, t, ...r) => {
    const n = ((i) => JSON.stringify(i, hi))(e);
    return n in s ? s[n] : s[n] = t(e, ...r);
  };
}, et = Symbol.for("sxs.internal"), Rt = (s, e) => Object.defineProperties(s, Object.getOwnPropertyDescriptors(e)), ur = (s) => {
  for (const e in s) return !0;
  return !1;
}, { hasOwnProperty: fi } = Object.prototype, xt = (s) => s.includes("-") ? s : s.replace(/[A-Z]/g, (e) => "-" + e.toLowerCase()), pi = /\s+(?![^()]*\))/, $e = (s) => (e) => s(...typeof e == "string" ? String(e).split(pi) : [e]), dr = { appearance: (s) => ({ WebkitAppearance: s, appearance: s }), backfaceVisibility: (s) => ({ WebkitBackfaceVisibility: s, backfaceVisibility: s }), backdropFilter: (s) => ({ WebkitBackdropFilter: s, backdropFilter: s }), backgroundClip: (s) => ({ WebkitBackgroundClip: s, backgroundClip: s }), boxDecorationBreak: (s) => ({ WebkitBoxDecorationBreak: s, boxDecorationBreak: s }), clipPath: (s) => ({ WebkitClipPath: s, clipPath: s }), content: (s) => ({ content: s.includes('"') || s.includes("'") || /^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(s) ? s : `"${s}"` }), hyphens: (s) => ({ WebkitHyphens: s, hyphens: s }), maskImage: (s) => ({ WebkitMaskImage: s, maskImage: s }), maskSize: (s) => ({ WebkitMaskSize: s, maskSize: s }), tabSize: (s) => ({ MozTabSize: s, tabSize: s }), textSizeAdjust: (s) => ({ WebkitTextSizeAdjust: s, textSizeAdjust: s }), userSelect: (s) => ({ WebkitUserSelect: s, userSelect: s }), marginBlock: $e((s, e) => ({ marginBlockStart: s, marginBlockEnd: e || s })), marginInline: $e((s, e) => ({ marginInlineStart: s, marginInlineEnd: e || s })), maxSize: $e((s, e) => ({ maxBlockSize: s, maxInlineSize: e || s })), minSize: $e((s, e) => ({ minBlockSize: s, minInlineSize: e || s })), paddingBlock: $e((s, e) => ({ paddingBlockStart: s, paddingBlockEnd: e || s })), paddingInline: $e((s, e) => ({ paddingInlineStart: s, paddingInlineEnd: e || s })) }, pt = /([\d.]+)([^]*)/, gi = (s, e) => s.length ? s.reduce((t, r) => (t.push(...e.map((n) => n.includes("&") ? n.replace(/&/g, /[ +>|~]/.test(r) && /&.*&/.test(n) ? `:is(${r})` : r) : r + " " + n)), t), []) : e, mi = (s, e) => s in vi && typeof e == "string" ? e.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/, (t, r, n, i) => r + (n === "stretch" ? `-moz-available${i};${xt(s)}:${r}-webkit-fill-available` : `-moz-fit-content${i};${xt(s)}:${r}fit-content`) + i) : String(e), vi = { blockSize: 1, height: 1, inlineSize: 1, maxBlockSize: 1, maxHeight: 1, maxInlineSize: 1, maxWidth: 1, minBlockSize: 1, minHeight: 1, minInlineSize: 1, minWidth: 1, width: 1 }, Q = (s) => s ? s + "-" : "", Dr = (s, e, t) => s.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g, (r, n, i, o, a) => o == "$" == !!i ? r : (n || o == "--" ? "calc(" : "") + "var(--" + (o === "$" ? Q(e) + (a.includes("$") ? "" : Q(t)) + a.replace(/\$/g, "-") : a) + ")" + (n || o == "--" ? "*" + (n || "") + (i || "1") + ")" : "")), _i = /\s*,\s*(?![^()]*\))/, wi = Object.prototype.toString, Ie = (s, e, t, r, n) => {
  let i, o, a;
  const l = (c, u, d) => {
    let h, p;
    const g = (_) => {
      for (h in _) {
        const v = h.charCodeAt(0) === 64, b = v && Array.isArray(_[h]) ? _[h] : [_[h]];
        for (p of b) {
          const y = /[A-Z]/.test(w = h) ? w : w.replace(/-[^]/g, (S) => S[1].toUpperCase()), E = typeof p == "object" && p && p.toString === wi && (!r.utils[y] || !u.length);
          if (y in r.utils && !E) {
            const S = r.utils[y];
            if (S !== o) {
              o = S, g(S(p)), o = null;
              continue;
            }
          } else if (y in dr) {
            const S = dr[y];
            if (S !== a) {
              a = S, g(S(p)), a = null;
              continue;
            }
          }
          if (v && (m = h.slice(1) in r.media ? "@media " + r.media[h.slice(1)] : h, h = m.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g, (S, C, P, A, I, L) => {
            const ee = pt.test(C), me = 0.0625 * (ee ? -1 : 1), [ae, W] = ee ? [A, C] : [C, A];
            return "(" + (P[0] === "=" ? "" : P[0] === ">" === ee ? "max-" : "min-") + ae + ":" + (P[0] !== "=" && P.length === 1 ? W.replace(pt, (M, ve, _e) => Number(ve) + me * (P === ">" ? 1 : -1) + _e) : W) + (I ? ") and (" + (I[0] === ">" ? "min-" : "max-") + ae + ":" + (I.length === 1 ? L.replace(pt, (M, ve, _e) => Number(ve) + me * (I === ">" ? -1 : 1) + _e) : L) : "") + ")";
          })), E) {
            const S = v ? d.concat(h) : [...d], C = v ? [...u] : gi(u, h.split(_i));
            i !== void 0 && n(hr(...i)), i = void 0, l(p, C, S);
          } else i === void 0 && (i = [[], u, d]), h = v || h.charCodeAt(0) !== 36 ? h : `--${Q(r.prefix)}${h.slice(1).replace(/\$/g, "-")}`, p = E ? p : typeof p == "number" ? p && y in bi ? String(p) + "px" : String(p) : Dr(mi(y, p ?? ""), r.prefix, r.themeMap[y]), i[0].push(`${v ? `${h} ` : `${xt(h)}:`}${p}`);
        }
      }
      var m, w;
    };
    g(c), i !== void 0 && n(hr(...i)), i = void 0;
  };
  l(s, e, t);
}, hr = (s, e, t) => `${t.map((r) => `${r}{`).join("")}${e.length ? `${e.join(",")}{` : ""}${s.join(";")}${e.length ? "}" : ""}${Array(t.length ? t.length + 1 : 0).join("}")}`, bi = { animationDelay: 1, animationDuration: 1, backgroundSize: 1, blockSize: 1, border: 1, borderBlock: 1, borderBlockEnd: 1, borderBlockEndWidth: 1, borderBlockStart: 1, borderBlockStartWidth: 1, borderBlockWidth: 1, borderBottom: 1, borderBottomLeftRadius: 1, borderBottomRightRadius: 1, borderBottomWidth: 1, borderEndEndRadius: 1, borderEndStartRadius: 1, borderInlineEnd: 1, borderInlineEndWidth: 1, borderInlineStart: 1, borderInlineStartWidth: 1, borderInlineWidth: 1, borderLeft: 1, borderLeftWidth: 1, borderRadius: 1, borderRight: 1, borderRightWidth: 1, borderSpacing: 1, borderStartEndRadius: 1, borderStartStartRadius: 1, borderTop: 1, borderTopLeftRadius: 1, borderTopRightRadius: 1, borderTopWidth: 1, borderWidth: 1, bottom: 1, columnGap: 1, columnRule: 1, columnRuleWidth: 1, columnWidth: 1, containIntrinsicSize: 1, flexBasis: 1, fontSize: 1, gap: 1, gridAutoColumns: 1, gridAutoRows: 1, gridTemplateColumns: 1, gridTemplateRows: 1, height: 1, inlineSize: 1, inset: 1, insetBlock: 1, insetBlockEnd: 1, insetBlockStart: 1, insetInline: 1, insetInlineEnd: 1, insetInlineStart: 1, left: 1, letterSpacing: 1, margin: 1, marginBlock: 1, marginBlockEnd: 1, marginBlockStart: 1, marginBottom: 1, marginInline: 1, marginInlineEnd: 1, marginInlineStart: 1, marginLeft: 1, marginRight: 1, marginTop: 1, maxBlockSize: 1, maxHeight: 1, maxInlineSize: 1, maxWidth: 1, minBlockSize: 1, minHeight: 1, minInlineSize: 1, minWidth: 1, offsetDistance: 1, offsetRotate: 1, outline: 1, outlineOffset: 1, outlineWidth: 1, overflowClipMargin: 1, padding: 1, paddingBlock: 1, paddingBlockEnd: 1, paddingBlockStart: 1, paddingBottom: 1, paddingInline: 1, paddingInlineEnd: 1, paddingInlineStart: 1, paddingLeft: 1, paddingRight: 1, paddingTop: 1, perspective: 1, right: 1, rowGap: 1, scrollMargin: 1, scrollMarginBlock: 1, scrollMarginBlockEnd: 1, scrollMarginBlockStart: 1, scrollMarginBottom: 1, scrollMarginInline: 1, scrollMarginInlineEnd: 1, scrollMarginInlineStart: 1, scrollMarginLeft: 1, scrollMarginRight: 1, scrollMarginTop: 1, scrollPadding: 1, scrollPaddingBlock: 1, scrollPaddingBlockEnd: 1, scrollPaddingBlockStart: 1, scrollPaddingBottom: 1, scrollPaddingInline: 1, scrollPaddingInlineEnd: 1, scrollPaddingInlineStart: 1, scrollPaddingLeft: 1, scrollPaddingRight: 1, scrollPaddingTop: 1, shapeMargin: 1, textDecoration: 1, textDecorationThickness: 1, textIndent: 1, textUnderlineOffset: 1, top: 1, transitionDelay: 1, transitionDuration: 1, verticalAlign: 1, width: 1, wordSpacing: 1 }, fr = (s) => String.fromCharCode(s + (s > 25 ? 39 : 97)), fe = (s) => ((e) => {
  let t, r = "";
  for (t = Math.abs(e); t > 52; t = t / 52 | 0) r = fr(t % 52) + r;
  return fr(t % 52) + r;
})(((e, t) => {
  let r = t.length;
  for (; r; ) e = 33 * e ^ t.charCodeAt(--r);
  return e;
})(5381, JSON.stringify(s)) >>> 0), We = ["themed", "global", "styled", "onevar", "resonevar", "allvar", "inline"], yi = (s) => {
  if (s.href && !s.href.startsWith(location.origin)) return !1;
  try {
    return !!s.cssRules;
  } catch {
    return !1;
  }
}, ki = (s) => {
  let e;
  const t = () => {
    const { cssRules: n } = e.sheet;
    return [].map.call(n, (i, o) => {
      const { cssText: a } = i;
      let l = "";
      if (a.startsWith("--sxs")) return "";
      if (n[o - 1] && (l = n[o - 1].cssText).startsWith("--sxs")) {
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
    const n = Object(s).styleSheets || [];
    for (const a of n) if (yi(a)) {
      for (let l = 0, c = a.cssRules; c[l]; ++l) {
        const u = Object(c[l]);
        if (u.type !== 1) continue;
        const d = Object(c[l + 1]);
        if (d.type !== 4) continue;
        ++l;
        const { cssText: h } = u;
        if (!h.startsWith("--sxs")) continue;
        const p = h.slice(14, -3).trim().split(/\s+/), g = We[p[0]];
        g && (e || (e = { sheet: a, reset: r, rules: {}, toString: t }), e.rules[g] = { group: d, index: l, cache: new Set(p) });
      }
      if (e) break;
    }
    if (!e) {
      const a = (l, c) => ({ type: c, cssRules: [], insertRule(u, d) {
        this.cssRules.splice(d, 0, a(u, { import: 3, undefined: 1 }[(u.toLowerCase().match(/^@([a-z]+)/) || [])[1]] || 4));
      }, get cssText() {
        return l === "@media{}" ? `@media{${[].map.call(this.cssRules, (u) => u.cssText).join("")}}` : l;
      } });
      e = { sheet: s ? (s.head || s).appendChild(document.createElement("style")).sheet : a("", "text/css"), rules: {}, reset: r, toString: t };
    }
    const { sheet: i, rules: o } = e;
    for (let a = We.length - 1; a >= 0; --a) {
      const l = We[a];
      if (!o[l]) {
        const c = We[a + 1], u = o[c] ? o[c].index : i.cssRules.length;
        i.insertRule("@media{}", u), i.insertRule(`--sxs{--sxs:${a}}`, u), o[l] = { group: i.cssRules[u + 1], index: u, cache: /* @__PURE__ */ new Set([a]) };
      }
      Si(o[l]);
    }
  };
  return r(), e;
}, Si = (s) => {
  const e = s.group;
  let t = e.cssRules.length;
  s.apply = (r) => {
    try {
      e.insertRule(r, t), ++t;
    } catch {
    }
  };
}, Me = Symbol(), Ei = Je(), Ti = (s, e) => Ei(s, () => (...t) => {
  let r = { type: null, composers: /* @__PURE__ */ new Set() };
  for (const n of t) if (n != null) if (n[et]) {
    r.type == null && (r.type = n[et].type);
    for (const i of n[et].composers) r.composers.add(i);
  } else n.constructor !== Object || n.$$typeof ? r.type == null && (r.type = n) : r.composers.add(Ci(n, s));
  return r.type == null && (r.type = "span"), r.composers.size || r.composers.add(["PJLV", {}, [], [], {}, []]), xi(s, r, e);
}), Ci = ({ variants: s, compoundVariants: e, defaultVariants: t, ...r }, n) => {
  const i = `${Q(n.prefix)}c-${fe(r)}`, o = [], a = [], l = /* @__PURE__ */ Object.create(null), c = [];
  for (const h in t) l[h] = String(t[h]);
  if (typeof s == "object" && s) for (const h in s) {
    u = l, d = h, fi.call(u, d) || (l[h] = "undefined");
    const p = s[h];
    for (const g in p) {
      const _ = { [h]: String(g) };
      String(g) === "undefined" && c.push(h);
      const m = p[g], w = [_, m, !ur(m)];
      o.push(w);
    }
  }
  var u, d;
  if (typeof e == "object" && e) for (const h of e) {
    let { css: p, ...g } = h;
    p = typeof p == "object" && p || {};
    for (const m in g) g[m] = String(g[m]);
    const _ = [g, p, !ur(p)];
    a.push(_);
  }
  return [i, r, o, a, l, c];
}, xi = (s, e, t) => {
  const [r, n, i, o] = ji(e.composers), a = typeof e.type == "function" || e.type.$$typeof ? ((d) => {
    function h() {
      for (let p = 0; p < h[Me].length; p++) {
        const [g, _] = h[Me][p];
        d.rules[g].apply(_);
      }
      return h[Me] = [], null;
    }
    return h[Me] = [], h.rules = {}, We.forEach((p) => h.rules[p] = { apply: (g) => h[Me].push([p, g]) }), h;
  })(t) : null, l = (a || t).rules, c = `.${r}${n.length > 1 ? `:where(.${n.slice(1).join(".")})` : ""}`, u = (d) => {
    d = typeof d == "object" && d || $i;
    const { css: h, ...p } = d, g = {};
    for (const w in i) if (delete p[w], w in d) {
      let v = d[w];
      typeof v == "object" && v ? g[w] = { "@initial": i[w], ...v } : (v = String(v), g[w] = v !== "undefined" || o.has(w) ? v : i[w]);
    } else g[w] = i[w];
    const _ = /* @__PURE__ */ new Set([...n]);
    for (const [w, v, b, y] of e.composers) {
      t.rules.styled.cache.has(w) || (t.rules.styled.cache.add(w), Ie(v, [`.${w}`], [], s, (C) => {
        l.styled.apply(C);
      }));
      const E = pr(b, g, s.media), S = pr(y, g, s.media, !0);
      for (const C of E) if (C !== void 0) for (const [P, A, I] of C) {
        const L = `${w}-${fe(A)}-${P}`;
        _.add(L);
        const ee = (I ? t.rules.resonevar : t.rules.onevar).cache, me = I ? l.resonevar : l.onevar;
        ee.has(L) || (ee.add(L), Ie(A, [`.${L}`], [], s, (ae) => {
          me.apply(ae);
        }));
      }
      for (const C of S) if (C !== void 0) for (const [P, A] of C) {
        const I = `${w}-${fe(A)}-${P}`;
        _.add(I), t.rules.allvar.cache.has(I) || (t.rules.allvar.cache.add(I), Ie(A, [`.${I}`], [], s, (L) => {
          l.allvar.apply(L);
        }));
      }
    }
    if (typeof h == "object" && h) {
      const w = `${r}-i${fe(h)}-css`;
      _.add(w), t.rules.inline.cache.has(w) || (t.rules.inline.cache.add(w), Ie(h, [`.${w}`], [], s, (v) => {
        l.inline.apply(v);
      }));
    }
    for (const w of String(d.className || "").trim().split(/\s+/)) w && _.add(w);
    const m = p.className = [..._].join(" ");
    return { type: e.type, className: m, selector: c, props: p, toString: () => m, deferredInjector: a };
  };
  return Rt(u, { className: r, selector: c, [et]: e, toString: () => (t.rules.styled.cache.has(r) || u(), r) });
}, ji = (s) => {
  let e = "";
  const t = [], r = {}, n = [];
  for (const [i, , , , o, a] of s) {
    e === "" && (e = i), t.push(i), n.push(...a);
    for (const l in o) {
      const c = o[l];
      (r[l] === void 0 || c !== "undefined" || a.includes(c)) && (r[l] = c);
    }
  }
  return [e, t, r, new Set(n)];
}, pr = (s, e, t, r) => {
  const n = [];
  e: for (let [i, o, a] of s) {
    if (a) continue;
    let l, c = 0, u = !1;
    for (l in i) {
      const d = i[l];
      let h = e[l];
      if (h !== d) {
        if (typeof h != "object" || !h) continue e;
        {
          let p, g, _ = 0;
          for (const m in h) {
            if (d === String(h[m])) {
              if (m !== "@initial") {
                const w = m.slice(1);
                (g = g || []).push(w in t ? t[w] : m.replace(/^@media ?/, "")), u = !0;
              }
              c += _, p = !0;
            }
            ++_;
          }
          if (g && g.length && (o = { ["@media " + g.join(", ")]: o }), !p) continue e;
        }
      }
    }
    (n[c] = n[c] || []).push([r ? "cv" : `${l}-${i[l]}`, o, u]);
  }
  return n;
}, $i = {}, Pi = Je(), Oi = (s, e) => Pi(s, () => (...t) => {
  const r = () => {
    for (let n of t) {
      n = typeof n == "object" && n || {};
      let i = fe(n);
      if (!e.rules.global.cache.has(i)) {
        if (e.rules.global.cache.add(i), "@import" in n) {
          let o = [].indexOf.call(e.sheet.cssRules, e.rules.themed.group) - 1;
          for (let a of [].concat(n["@import"])) a = a.includes('"') || a.includes("'") ? a : `"${a}"`, e.sheet.insertRule(`@import ${a};`, o++);
          delete n["@import"];
        }
        Ie(n, [], [], s, (o) => {
          e.rules.global.apply(o);
        });
      }
    }
    return "";
  };
  return Rt(r, { toString: r });
}), Ai = Je(), Ii = (s, e) => Ai(s, () => (t) => {
  const r = `${Q(s.prefix)}k-${fe(t)}`, n = () => {
    if (!e.rules.global.cache.has(r)) {
      e.rules.global.cache.add(r);
      const i = [];
      Ie(t, [], [], s, (a) => i.push(a));
      const o = `@keyframes ${r}{${i.join("")}}`;
      e.rules.global.apply(o);
    }
    return r;
  };
  return Rt(n, { get name() {
    return n();
  }, toString: n });
}), Ri = class {
  constructor(e, t, r, n) {
    this.token = e == null ? "" : String(e), this.value = t == null ? "" : String(t), this.scale = r == null ? "" : String(r), this.prefix = n == null ? "" : String(n);
  }
  get computedValue() {
    return "var(" + this.variable + ")";
  }
  get variable() {
    return "--" + Q(this.prefix) + Q(this.scale) + this.token;
  }
  toString() {
    return this.computedValue;
  }
}, Li = Je(), Bi = (s, e) => Li(s, () => (t, r) => {
  r = typeof t == "object" && t || Object(r);
  const n = `.${t = (t = typeof t == "string" ? t : "") || `${Q(s.prefix)}t-${fe(r)}`}`, i = {}, o = [];
  for (const l in r) {
    i[l] = {};
    for (const c in r[l]) {
      const u = `--${Q(s.prefix)}${l}-${c}`, d = Dr(String(r[l][c]), s.prefix, l);
      i[l][c] = new Ri(c, d, l, s.prefix), o.push(`${u}:${d}`);
    }
  }
  const a = () => {
    if (o.length && !e.rules.themed.cache.has(t)) {
      e.rules.themed.cache.add(t);
      const l = `${r === s.theme ? ":root," : ""}.${t}{${o.join(";")}}`;
      e.rules.themed.apply(l);
    }
    return t;
  };
  return { ...i, get className() {
    return a();
  }, selector: n, toString: a };
}), Ui = Je(), Mr = (s) => {
  let e = !1;
  const t = Ui(s, (r) => {
    e = !0;
    const n = "prefix" in (r = typeof r == "object" && r || {}) ? String(r.prefix) : "", i = typeof r.media == "object" && r.media || {}, o = typeof r.root == "object" ? r.root || null : globalThis.document || null, a = typeof r.theme == "object" && r.theme || {}, l = { prefix: n, media: i, theme: a, themeMap: typeof r.themeMap == "object" && r.themeMap || { ...di }, utils: typeof r.utils == "object" && r.utils || {} }, c = ki(o), u = { css: Ti(l, c), globalCss: Oi(l, c), keyframes: Ii(l, c), createTheme: Bi(l, c), reset() {
      c.reset(), u.theme.toString();
    }, theme: {}, sheet: c, config: l, prefix: n, getCssText: c.toString, toString: c.toString };
    return String(u.theme = u.createTheme(a)), u;
  });
  return e || t.reset(), t;
}, Fr = () => cr || (cr = Mr()), Ni = (...s) => Fr().createTheme(...s), X = (...s) => Fr().css(...s), Di = {
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
}, B = {
  SIGN_IN: "sign_in",
  SIGN_UP: "sign_up",
  FORGOTTEN_PASSWORD: "forgotten_password",
  MAGIC_LINK: "magic_link",
  UPDATE_PASSWORD: "update_password",
  VERIFY_OTP: "verify_otp"
}, Mi = "supabase-auth-ui", Fi = {
  // interfaces
  ROOT: "root",
  SIGN_IN: B.SIGN_IN,
  SIGN_UP: B.SIGN_UP,
  FORGOTTEN_PASSWORD: B.FORGOTTEN_PASSWORD,
  MAGIC_LINK: B.MAGIC_LINK,
  UPDATE_PASSWORD: B.UPDATE_PASSWORD,
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
function ge(s, e, t) {
  var r, n;
  const i = [], o = Fi[s];
  return i.push(
    t != null && t.prependedClassName ? (t == null ? void 0 : t.prependedClassName) + "_" + o : Mi + "_" + o
  ), (r = t == null ? void 0 : t.className) != null && r[s] && i.push((n = t == null ? void 0 : t.className) == null ? void 0 : n[s]), ((t == null ? void 0 : t.extend) === void 0 || (t == null ? void 0 : t.extend) === !0) && i.push(e), i;
}
function jt(s, e) {
  let t;
  if (s && e && typeof s == "object" && typeof e == "object") {
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        s[t] = jt(s[t], e[t]);
    else
      for (t in e)
        s[t] = jt(s[t], e[t]);
    return s;
  }
  return e;
}
function gt(s, ...e) {
  let t = e.length;
  for (let r = 0; r < t; r++)
    s = jt(s, e[r]);
  return s;
}
function Wi(s, e) {
  return s.replace(
    /{{(\w+)}}/g,
    (t, r) => e.hasOwnProperty(r) ? e[r] : t
  );
}
var zi = {
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
const qi = X({
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
}), he = ({ children: s, appearance: e, ...t }) => {
  var r;
  const n = ge(
    "anchor",
    qi(),
    e
  );
  return /* @__PURE__ */ f.createElement(
    "a",
    {
      ...t,
      style: (r = e == null ? void 0 : e.style) == null ? void 0 : r.anchor,
      className: n.join(" ")
    },
    s
  );
}, Hi = X({
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
}), Be = ({
  children: s,
  color: e = "default",
  appearance: t,
  icon: r,
  loading: n = !1,
  ...i
}) => {
  var o;
  const a = ge(
    "button",
    Hi({ color: e }),
    t
  );
  return /* @__PURE__ */ f.createElement(
    "button",
    {
      ...i,
      style: (o = t == null ? void 0 : t.style) == null ? void 0 : o.button,
      className: a.join(" "),
      disabled: n
    },
    r,
    s
  );
}, Vi = X({
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
}), J = ({
  children: s,
  appearance: e,
  ...t
}) => {
  var r;
  const n = ge(
    "container",
    Vi({
      direction: t.direction,
      gap: t.gap
    }),
    e
  );
  return /* @__PURE__ */ f.createElement(
    "div",
    {
      ...t,
      style: (r = e == null ? void 0 : e.style) == null ? void 0 : r.container,
      className: n.join(" ")
    },
    s
  );
}, Gi = X({
  background: "$dividerBackground",
  display: "block",
  margin: "16px 0",
  height: "1px",
  width: "100%"
}), Ki = ({
  children: s,
  appearance: e,
  ...t
}) => {
  var r;
  const n = ge(
    "divider",
    Gi(),
    e
  );
  return /* @__PURE__ */ f.createElement(
    "div",
    {
      ...t,
      style: (r = e == null ? void 0 : e.style) == null ? void 0 : r.divider,
      className: n.join(" ")
    }
  );
}, Ji = X({
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
}), ne = ({ children: s, appearance: e, ...t }) => {
  var r;
  const n = ge(
    "input",
    Ji({
      type: t.type === "password" ? "password" : "default"
    }),
    e
  );
  return /* @__PURE__ */ f.createElement(
    "input",
    {
      ...t,
      style: (r = e == null ? void 0 : e.style) == null ? void 0 : r.input,
      className: n.join(" ")
    },
    s
  );
}, Yi = X({
  fontFamily: "$labelFontFamily",
  fontSize: "$baseLabelSize",
  marginBottom: "$labelBottomMargin",
  color: "$inputLabelText",
  display: "block"
}), ie = ({ children: s, appearance: e, ...t }) => {
  var r;
  const n = ge(
    "label",
    Yi(),
    e
  );
  return /* @__PURE__ */ f.createElement(
    "label",
    {
      ...t,
      style: (r = e == null ? void 0 : e.style) == null ? void 0 : r.label,
      className: n.join(" ")
    },
    s
  );
}, Zi = X({
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
}), Y = ({
  children: s,
  appearance: e,
  ...t
}) => {
  var r;
  const n = ge(
    "message",
    Zi({ color: t.color }),
    e
  );
  return /* @__PURE__ */ f.createElement(
    "span",
    {
      ...t,
      style: (r = e == null ? void 0 : e.style) == null ? void 0 : r.message,
      className: n.join(" ")
    },
    s
  );
};
function Wr({
  setAuthView: s = () => {
  },
  supabaseClient: e,
  redirectTo: t,
  i18n: r,
  appearance: n,
  showLinks: i = !1
}) {
  var o;
  const [a, l] = j(""), [c, u] = j(""), [d, h] = j(""), [p, g] = j(!1), _ = async (w) => {
    var v, b;
    if (w.preventDefault(), u(""), h(""), g(!0), a.length === 0) {
      u((v = r == null ? void 0 : r.magic_link) == null ? void 0 : v.empty_email_address), g(!1);
      return;
    }
    const { error: y } = await e.auth.signInWithOtp({
      email: a,
      options: { emailRedirectTo: t }
    });
    y ? u(y.message) : h((b = r == null ? void 0 : r.magic_link) == null ? void 0 : b.confirmation_text), g(!1);
  }, m = r == null ? void 0 : r.magic_link;
  return /* @__PURE__ */ f.createElement("form", { id: "auth-magic-link", onSubmit: _ }, /* @__PURE__ */ f.createElement(J, { gap: "large", direction: "vertical", appearance: n }, /* @__PURE__ */ f.createElement("div", null, /* @__PURE__ */ f.createElement(ie, { htmlFor: "email", appearance: n }, m == null ? void 0 : m.email_input_label), /* @__PURE__ */ f.createElement(
    ne,
    {
      id: "email",
      name: "email",
      type: "email",
      autoFocus: !0,
      placeholder: m == null ? void 0 : m.email_input_placeholder,
      onChange: (w) => {
        u && u(""), l(w.target.value);
      },
      appearance: n
    }
  )), /* @__PURE__ */ f.createElement(
    Be,
    {
      color: "primary",
      type: "submit",
      loading: p,
      appearance: n
    },
    p ? m == null ? void 0 : m.loading_button_label : m == null ? void 0 : m.button_label
  ), i && /* @__PURE__ */ f.createElement(
    he,
    {
      href: "#auth-sign-in",
      onClick: (w) => {
        w.preventDefault(), s(B.SIGN_IN);
      },
      appearance: n
    },
    (o = r == null ? void 0 : r.sign_in) == null ? void 0 : o.link_text
  ), d && /* @__PURE__ */ f.createElement(Y, { appearance: n }, d), c && /* @__PURE__ */ f.createElement(Y, { color: "danger", appearance: n }, c)));
}
const F = X({
  width: "21px",
  height: "21px"
}), Qi = ({ provider: s }) => s == "google" ? Xi() : s == "facebook" ? eo() : s == "twitter" ? to() : s == "apple" ? ro() : s == "github" ? so() : s == "gitlab" ? no() : s == "bitbucket" ? io() : s == "discord" ? oo() : s == "azure" ? ao() : s == "keycloak" ? lo() : s == "linkedin" ? co() : s == "notion" ? uo() : s == "slack" ? ho() : s == "spotify" ? fo() : s == "twitch" ? po() : s == "workos" ? go() : s == "kakao" ? mo() : null, Xi = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#FFC107",
      d: "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#FF3D00",
      d: "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#4CAF50",
      d: "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#1976D2",
      d: "M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    }
  )
), eo = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ f.createElement("path", { fill: "#039be5", d: "M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" }),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#fff",
      d: "M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
    }
  )
), to = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#03A9F4",
      d: "M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
    }
  )
), ro = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    fill: "gray",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "21px",
    height: "21px"
  },
  " ",
  /* @__PURE__ */ f.createElement("path", { d: "M 15.904297 1.078125 C 15.843359 1.06875 15.774219 1.0746094 15.699219 1.0996094 C 14.699219 1.2996094 13.600391 1.8996094 12.900391 2.5996094 C 12.300391 3.1996094 11.800781 4.1996094 11.800781 5.0996094 C 11.800781 5.2996094 11.999219 5.5 12.199219 5.5 C 13.299219 5.4 14.399609 4.7996094 15.099609 4.0996094 C 15.699609 3.2996094 16.199219 2.4 16.199219 1.5 C 16.199219 1.275 16.087109 1.10625 15.904297 1.078125 z M 16.199219 5.4003906 C 14.399219 5.4003906 13.600391 6.5 12.400391 6.5 C 11.100391 6.5 9.9003906 5.5 8.4003906 5.5 C 6.3003906 5.5 3.0996094 7.4996094 3.0996094 12.099609 C 2.9996094 16.299609 6.8 21 9 21 C 10.3 21 10.600391 20.199219 12.400391 20.199219 C 14.200391 20.199219 14.600391 21 15.900391 21 C 17.400391 21 18.500391 19.399609 19.400391 18.099609 C 19.800391 17.399609 20.100391 17.000391 20.400391 16.400391 C 20.600391 16.000391 20.4 15.600391 20 15.400391 C 17.4 14.100391 16.900781 9.9003906 19.800781 8.4003906 C 20.300781 8.1003906 20.4 7.4992188 20 7.1992188 C 18.9 6.1992187 17.299219 5.4003906 16.199219 5.4003906 z" })
), so = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    fill: "gray",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 30 30",
    width: "21px",
    height: "21px"
  },
  " ",
  /* @__PURE__ */ f.createElement("path", { d: "M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" })
), no = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ f.createElement("path", { fill: "#e53935", d: "M24 43L16 20 32 20z" }),
  /* @__PURE__ */ f.createElement("path", { fill: "#ff7043", d: "M24 43L42 20 32 20z" }),
  /* @__PURE__ */ f.createElement("path", { fill: "#e53935", d: "M37 5L42 20 32 20z" }),
  /* @__PURE__ */ f.createElement("path", { fill: "#ffa726", d: "M24 43L42 20 45 28z" }),
  /* @__PURE__ */ f.createElement("path", { fill: "#ff7043", d: "M24 43L6 20 16 20z" }),
  /* @__PURE__ */ f.createElement("path", { fill: "#e53935", d: "M11 5L6 20 16 20z" }),
  /* @__PURE__ */ f.createElement("path", { fill: "#ffa726", d: "M24 43L6 20 3 28z" })
), io = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    xmlns: "http://www.w3.org/2000/svg",
    width: "512",
    height: "512",
    viewBox: "0 0 62.42 62.42"
  },
  /* @__PURE__ */ f.createElement("defs", null, /* @__PURE__ */ f.createElement(
    "linearGradient",
    {
      id: "New_Gradient_Swatch_1",
      x1: "64.01",
      y1: "30.27",
      x2: "32.99",
      y2: "54.48",
      gradientUnits: "userSpaceOnUse"
    },
    /* @__PURE__ */ f.createElement("stop", { offset: "0.18", stopColor: "#0052cc" }),
    /* @__PURE__ */ f.createElement("stop", { offset: "1", stopColor: "#2684ff" })
  )),
  /* @__PURE__ */ f.createElement("title", null, "Bitbucket-blue"),
  /* @__PURE__ */ f.createElement("g", { id: "Layer_2", "data-name": "Layer 2" }, /* @__PURE__ */ f.createElement("g", { id: "Blue", transform: "translate(0 -3.13)" }, /* @__PURE__ */ f.createElement(
    "path",
    {
      d: "M2,6.26A2,2,0,0,0,0,8.58L8.49,60.12a2.72,2.72,0,0,0,2.66,2.27H51.88a2,2,0,0,0,2-1.68L62.37,8.59a2,2,0,0,0-2-2.32ZM37.75,43.51h-13L21.23,25.12H40.9Z",
      fill: "#2684ff"
    }
  ), /* @__PURE__ */ f.createElement(
    "path",
    {
      d: "M59.67,25.12H40.9L37.75,43.51h-13L9.4,61.73a2.71,2.71,0,0,0,1.75.66H51.89a2,2,0,0,0,2-1.68Z",
      fill: "url(#New_Gradient_Swatch_1)"
    }
  )))
), oo = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#536dfe",
      d: "M39.248,10.177c-2.804-1.287-5.812-2.235-8.956-2.778c-0.057-0.01-0.114,0.016-0.144,0.068	c-0.387,0.688-0.815,1.585-1.115,2.291c-3.382-0.506-6.747-0.506-10.059,0c-0.3-0.721-0.744-1.603-1.133-2.291	c-0.03-0.051-0.087-0.077-0.144-0.068c-3.143,0.541-6.15,1.489-8.956,2.778c-0.024,0.01-0.045,0.028-0.059,0.051	c-5.704,8.522-7.267,16.835-6.5,25.044c0.003,0.04,0.026,0.079,0.057,0.103c3.763,2.764,7.409,4.442,10.987,5.554	c0.057,0.017,0.118-0.003,0.154-0.051c0.846-1.156,1.601-2.374,2.248-3.656c0.038-0.075,0.002-0.164-0.076-0.194	c-1.197-0.454-2.336-1.007-3.432-1.636c-0.087-0.051-0.094-0.175-0.014-0.234c0.231-0.173,0.461-0.353,0.682-0.534	c0.04-0.033,0.095-0.04,0.142-0.019c7.201,3.288,14.997,3.288,22.113,0c0.047-0.023,0.102-0.016,0.144,0.017	c0.22,0.182,0.451,0.363,0.683,0.536c0.08,0.059,0.075,0.183-0.012,0.234c-1.096,0.641-2.236,1.182-3.434,1.634	c-0.078,0.03-0.113,0.12-0.075,0.196c0.661,1.28,1.415,2.498,2.246,3.654c0.035,0.049,0.097,0.07,0.154,0.052	c3.595-1.112,7.241-2.79,11.004-5.554c0.033-0.024,0.054-0.061,0.057-0.101c0.917-9.491-1.537-17.735-6.505-25.044	C39.293,10.205,39.272,10.187,39.248,10.177z M16.703,30.273c-2.168,0-3.954-1.99-3.954-4.435s1.752-4.435,3.954-4.435	c2.22,0,3.989,2.008,3.954,4.435C20.658,28.282,18.906,30.273,16.703,30.273z M31.324,30.273c-2.168,0-3.954-1.99-3.954-4.435	s1.752-4.435,3.954-4.435c2.22,0,3.989,2.008,3.954,4.435C35.278,28.282,33.544,30.273,31.324,30.273z"
    }
  )
), ao = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ f.createElement(
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
    /* @__PURE__ */ f.createElement("stop", { offset: "0", stopColor: "#114a8b" }),
    /* @__PURE__ */ f.createElement("stop", { offset: "1", stopColor: "#0669bc" })
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "url(#k8yl7~hDat~FaoWq8WjN6a)",
      d: "M17.634,6h11.305L17.203,40.773c-0.247,0.733-0.934,1.226-1.708,1.226H6.697 c-0.994,0-1.8-0.806-1.8-1.8c0-0.196,0.032-0.39,0.094-0.576L15.926,7.227C16.173,6.494,16.86,6,17.634,6L17.634,6z"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#0078d4",
      d: "M34.062,29.324H16.135c-0.458-0.001-0.83,0.371-0.831,0.829c0,0.231,0.095,0.451,0.264,0.608 l11.52,10.752C27.423,41.826,27.865,42,28.324,42h10.151L34.062,29.324z"
    }
  ),
  /* @__PURE__ */ f.createElement(
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
    /* @__PURE__ */ f.createElement("stop", { offset: "0", stopOpacity: ".3" }),
    /* @__PURE__ */ f.createElement("stop", { offset: ".071", stopOpacity: ".2" }),
    /* @__PURE__ */ f.createElement("stop", { offset: ".321", stopOpacity: ".1" }),
    /* @__PURE__ */ f.createElement("stop", { offset: ".623", stopOpacity: ".05" }),
    /* @__PURE__ */ f.createElement("stop", { offset: "1", stopOpacity: "0" })
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "url(#k8yl7~hDat~FaoWq8WjN6b)",
      d: "M17.634,6c-0.783-0.003-1.476,0.504-1.712,1.25L5.005,39.595 c-0.335,0.934,0.151,1.964,1.085,2.299C6.286,41.964,6.493,42,6.702,42h9.026c0.684-0.122,1.25-0.603,1.481-1.259l2.177-6.416 l7.776,7.253c0.326,0.27,0.735,0.419,1.158,0.422h10.114l-4.436-12.676l-12.931,0.003L28.98,6H17.634z"
    }
  ),
  /* @__PURE__ */ f.createElement(
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
    /* @__PURE__ */ f.createElement("stop", { offset: "0", stopColor: "#3ccbf4" }),
    /* @__PURE__ */ f.createElement("stop", { offset: "1", stopColor: "#2892df" })
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "url(#k8yl7~hDat~FaoWq8WjN6c)",
      d: "M32.074,7.225C31.827,6.493,31.141,6,30.368,6h-12.6c0.772,0,1.459,0.493,1.705,1.224 l10.935,32.399c0.318,0.942-0.188,1.963-1.13,2.281C29.093,41.968,28.899,42,28.703,42h12.6c0.994,0,1.8-0.806,1.8-1.801 c0-0.196-0.032-0.39-0.095-0.575L32.074,7.225z"
    }
  )
), lo = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    width: "512",
    height: "512",
    viewBox: "0 0 512 512",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ f.createElement(
    "path",
    {
      d: "M472.136 163.959H408.584C407.401 163.959 406.218 163.327 405.666 162.3L354.651 73.6591C354.02 72.632 352.916 72 351.654 72H143.492C142.309 72 141.126 72.632 140.574 73.6591L87.5084 165.618L36.414 254.259C35.862 255.286 35.862 256.55 36.414 257.656L87.5084 346.297L140.495 438.335C141.047 439.362 142.23 440.073 143.413 439.994H351.654C352.837 439.994 354.02 439.362 354.651 438.335L405.745 349.694C406.297 348.667 407.48 347.956 408.663 348.035H472.215C474.344 348.035 476 346.297 476 344.243V167.83C475.921 165.697 474.186 163.959 472.136 163.959ZM228.728 349.694L212.721 377.345C212.485 377.74 212.091 378.135 211.696 378.372C211.223 378.609 210.75 378.767 210.198 378.767H178.422C177.318 378.767 176.293 378.214 175.82 377.187L128.431 294.787L123.779 286.65L106.748 257.498C106.511 257.103 106.353 256.629 106.432 256.076C106.432 255.602 106.59 255.049 106.827 254.654L123.937 224.949L175.899 134.886C176.451 133.938 177.476 133.306 178.501 133.306H210.198C210.75 133.306 211.302 133.464 211.854 133.701C212.248 133.938 212.643 134.254 212.879 134.728L228.886 162.537C229.359 163.485 229.28 164.67 228.728 165.539L177.397 254.654C177.16 255.049 177.081 255.523 177.081 255.918C177.081 256.392 177.239 256.787 177.397 257.182L228.728 346.218C229.438 347.403 229.359 348.667 228.728 349.694V349.694ZM388.083 257.498L371.051 286.65L366.399 294.787L319.011 377.187C318.459 378.135 317.512 378.767 316.409 378.767H284.632C284.08 378.767 283.607 378.609 283.134 378.372C282.74 378.135 282.346 377.819 282.109 377.345L266.103 349.694C265.393 348.667 265.393 347.403 266.024 346.376L317.355 257.34C317.591 256.945 317.67 256.471 317.67 256.076C317.67 255.602 317.513 255.207 317.355 254.812L266.024 165.697C265.472 164.749 265.393 163.643 265.866 162.695L281.873 134.886C282.109 134.491 282.503 134.096 282.898 133.859C283.371 133.543 283.923 133.464 284.553 133.464H316.409C317.512 133.464 318.538 134.017 319.011 135.044L370.972 225.107L388.083 254.812C388.319 255.286 388.477 255.76 388.477 256.234C388.477 256.55 388.319 257.024 388.083 257.498V257.498Z",
      fill: "#008AAA"
    }
  )
), co = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#0288D1",
      d: "M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#FFF",
      d: "M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
    }
  )
), uo = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px",
    fillRule: "evenodd",
    clipRule: "evenodd"
  },
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#fff",
      fillRule: "evenodd",
      d: "M11.553,11.099c1.232,1.001,1.694,0.925,4.008,0.77 l21.812-1.31c0.463,0,0.078-0.461-0.076-0.538l-3.622-2.619c-0.694-0.539-1.619-1.156-3.391-1.002l-21.12,1.54 c-0.77,0.076-0.924,0.461-0.617,0.77L11.553,11.099z",
      clipRule: "evenodd"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#fff",
      fillRule: "evenodd",
      d: "M12.862,16.182v22.95c0,1.233,0.616,1.695,2.004,1.619 l23.971-1.387c1.388-0.076,1.543-0.925,1.543-1.927V14.641c0-1-0.385-1.54-1.234-1.463l-25.05,1.463 C13.171,14.718,12.862,15.181,12.862,16.182L12.862,16.182z",
      clipRule: "evenodd"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#424242",
      fillRule: "evenodd",
      d: "M11.553,11.099c1.232,1.001,1.694,0.925,4.008,0.77 l21.812-1.31c0.463,0,0.078-0.461-0.076-0.538l-3.622-2.619c-0.694-0.539-1.619-1.156-3.391-1.002l-21.12,1.54 c-0.77,0.076-0.924,0.461-0.617,0.77L11.553,11.099z M12.862,16.182v22.95c0,1.233,0.616,1.695,2.004,1.619l23.971-1.387 c1.388-0.076,1.543-0.925,1.543-1.927V14.641c0-1-0.385-1.54-1.234-1.463l-25.05,1.463C13.171,14.718,12.862,15.181,12.862,16.182 L12.862,16.182z M36.526,17.413c0.154,0.694,0,1.387-0.695,1.465l-1.155,0.23v16.943c-1.003,0.539-1.928,0.847-2.698,0.847 c-1.234,0-1.543-0.385-2.467-1.54l-7.555-11.86v11.475l2.391,0.539c0,0,0,1.386-1.929,1.386l-5.317,0.308 c-0.154-0.308,0-1.078,0.539-1.232l1.388-0.385V20.418l-1.927-0.154c-0.155-0.694,0.23-1.694,1.31-1.772l5.704-0.385l7.862,12.015 V19.493l-2.005-0.23c-0.154-0.848,0.462-1.464,1.233-1.54L36.526,17.413z M7.389,5.862l21.968-1.618 c2.698-0.231,3.392-0.076,5.087,1.155l7.013,4.929C42.614,11.176,43,11.407,43,12.33v27.032c0,1.694-0.617,2.696-2.775,2.849 l-25.512,1.541c-1.62,0.077-2.391-0.154-3.239-1.232l-5.164-6.7C5.385,34.587,5,33.664,5,32.585V8.556 C5,7.171,5.617,6.015,7.389,5.862z",
      clipRule: "evenodd"
    }
  )
), ho = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: "21px",
    height: "21px"
  },
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#33d375",
      d: "M33,8c0-2.209-1.791-4-4-4s-4,1.791-4,4c0,1.254,0,9.741,0,11c0,2.209,1.791,4,4,4s4-1.791,4-4	C33,17.741,33,9.254,33,8z"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#33d375",
      d: "M43,19c0,2.209-1.791,4-4,4c-1.195,0-4,0-4,0s0-2.986,0-4c0-2.209,1.791-4,4-4S43,16.791,43,19z"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#40c4ff",
      d: "M8,14c-2.209,0-4,1.791-4,4s1.791,4,4,4c1.254,0,9.741,0,11,0c2.209,0,4-1.791,4-4s-1.791-4-4-4	C17.741,14,9.254,14,8,14z"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#40c4ff",
      d: "M19,4c2.209,0,4,1.791,4,4c0,1.195,0,4,0,4s-2.986,0-4,0c-2.209,0-4-1.791-4-4S16.791,4,19,4z"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#e91e63",
      d: "M14,39.006C14,41.212,15.791,43,18,43s4-1.788,4-3.994c0-1.252,0-9.727,0-10.984	c0-2.206-1.791-3.994-4-3.994s-4,1.788-4,3.994C14,29.279,14,37.754,14,39.006z"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#e91e63",
      d: "M4,28.022c0-2.206,1.791-3.994,4-3.994c1.195,0,4,0,4,0s0,2.981,0,3.994c0,2.206-1.791,3.994-4,3.994	S4,30.228,4,28.022z"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#ffc107",
      d: "M39,33c2.209,0,4-1.791,4-4s-1.791-4-4-4c-1.254,0-9.741,0-11,0c-2.209,0-4,1.791-4,4s1.791,4,4,4	C29.258,33,37.746,33,39,33z"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#ffc107",
      d: "M28,43c-2.209,0-4-1.791-4-4c0-1.195,0-4,0-4s2.986,0,4,0c2.209,0,4,1.791,4,4S30.209,43,28,43z"
    }
  )
), fo = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    width: "512",
    height: "512",
    viewBox: "0 0 512 512",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ f.createElement(
    "path",
    {
      d: "M255.498 31.0034C131.513 31.0034 31 131.515 31 255.502C31 379.492 131.513 480 255.498 480C379.497 480 480 379.495 480 255.502C480 131.522 379.497 31.0135 255.495 31.0135L255.498 31V31.0034ZM358.453 354.798C354.432 361.391 345.801 363.486 339.204 359.435C286.496 327.237 220.139 319.947 141.993 337.801C134.463 339.516 126.957 334.798 125.24 327.264C123.516 319.731 128.217 312.225 135.767 310.511C221.284 290.972 294.639 299.384 353.816 335.549C360.413 339.596 362.504 348.2 358.453 354.798ZM385.932 293.67C380.864 301.903 370.088 304.503 361.858 299.438C301.512 262.345 209.528 251.602 138.151 273.272C128.893 276.067 119.118 270.851 116.309 261.61C113.521 252.353 118.74 242.597 127.981 239.782C209.512 215.044 310.87 227.026 380.17 269.612C388.4 274.68 391 285.456 385.935 293.676V293.673L385.932 293.67ZM388.293 230.016C315.935 187.039 196.56 183.089 127.479 204.055C116.387 207.42 104.654 201.159 101.293 190.063C97.9326 178.964 104.189 167.241 115.289 163.87C194.59 139.796 326.418 144.446 409.723 193.902C419.722 199.826 422.995 212.71 417.068 222.675C411.168 232.653 398.247 235.943 388.303 230.016H388.293V230.016Z",
      fill: "#1ED760"
    }
  )
), po = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    width: "512",
    height: "512",
    viewBox: "0 0 512 512",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ f.createElement("path", { d: "M416 240L352 304H288L232 360V304H160V64H416V240Z", fill: "white" }),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      d: "M144 32L64 112V400H160V480L240 400H304L448 256V32H144ZM416 240L352 304H288L232 360V304H160V64H416V240Z",
      fill: "#9146FF"
    }
  ),
  /* @__PURE__ */ f.createElement("path", { d: "M368 120H336V216H368V120Z", fill: "#9146FF" }),
  /* @__PURE__ */ f.createElement("path", { d: "M280 120H248V216H280V120Z", fill: "#9146FF" })
), go = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    width: "512",
    height: "512",
    viewBox: "0 0 512 512",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ f.createElement(
    "path",
    {
      d: "M33 256.043C33 264.556 35.3159 273.069 39.4845 280.202L117.993 415.493C126.098 429.298 138.373 440.572 153.657 445.634C183.764 455.528 214.797 442.873 229.618 417.333L248.609 384.661L173.806 256.043L252.777 119.831L271.768 87.1591C277.557 77.2654 284.968 69.4424 294 63H285.894H172.185C150.878 63 131.193 74.2742 120.54 92.6812L39.7161 231.884C35.3159 239.016 33 247.53 33 256.043Z",
      fill: "#6363F1"
    }
  ),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      d: "M480 256.058C480 247.539 477.684 239.021 473.516 231.883L393.849 94.6596C379.028 69.3331 347.995 56.4396 317.888 66.34C302.603 71.4053 290.329 82.6871 282.224 96.5015L264.391 127.354L339.194 256.058L260.223 392.131L241.232 424.825C235.443 434.495 228.032 442.553 219 449H227.106H340.815C362.122 449 381.807 437.718 392.46 419.299L473.284 280.003C477.684 272.866 480 264.577 480 256.058Z",
      fill: "#6363F1"
    }
  )
), mo = () => /* @__PURE__ */ f.createElement(
  "svg",
  {
    className: F(),
    xmlns: "http://www.w3.org/2000/svg",
    width: "2500",
    height: "2500",
    viewBox: "0 0 256 256"
  },
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#FFE812",
      d: "M256 236c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0h216c11.046 0 20 8.954 20 20v216z"
    }
  ),
  /* @__PURE__ */ f.createElement("path", { d: "M128 36C70.562 36 24 72.713 24 118c0 29.279 19.466 54.97 48.748 69.477-1.593 5.494-10.237 35.344-10.581 37.689 0 0-.207 1.762.934 2.434s2.483.15 2.483.15c3.272-.457 37.943-24.811 43.944-29.04 5.995.849 12.168 1.29 18.472 1.29 57.438 0 104-36.712 104-82 0-45.287-46.562-82-104-82z" }),
  /* @__PURE__ */ f.createElement(
    "path",
    {
      fill: "#FFE812",
      d: "M70.5 146.625c-3.309 0-6-2.57-6-5.73V105.25h-9.362c-3.247 0-5.888-2.636-5.888-5.875s2.642-5.875 5.888-5.875h30.724c3.247 0 5.888 2.636 5.888 5.875s-2.642 5.875-5.888 5.875H76.5v35.645c0 3.16-2.691 5.73-6 5.73zM123.112 146.547c-2.502 0-4.416-1.016-4.993-2.65l-2.971-7.778-18.296-.001-2.973 7.783c-.575 1.631-2.488 2.646-4.99 2.646a9.155 9.155 0 0 1-3.814-.828c-1.654-.763-3.244-2.861-1.422-8.52l14.352-37.776c1.011-2.873 4.082-5.833 7.99-5.922 3.919.088 6.99 3.049 8.003 5.928l14.346 37.759c1.826 5.672.236 7.771-1.418 8.532a9.176 9.176 0 0 1-3.814.827c-.001 0 0 0 0 0zm-11.119-21.056L106 108.466l-5.993 17.025h11.986zM138 145.75c-3.171 0-5.75-2.468-5.75-5.5V99.5c0-3.309 2.748-6 6.125-6s6.125 2.691 6.125 6v35.25h12.75c3.171 0 5.75 2.468 5.75 5.5s-2.579 5.5-5.75 5.5H138zM171.334 146.547c-3.309 0-6-2.691-6-6V99.5c0-3.309 2.691-6 6-6s6 2.691 6 6v12.896l16.74-16.74c.861-.861 2.044-1.335 3.328-1.335 1.498 0 3.002.646 4.129 1.772 1.051 1.05 1.678 2.401 1.764 3.804.087 1.415-.384 2.712-1.324 3.653l-13.673 13.671 14.769 19.566a5.951 5.951 0 0 1 1.152 4.445 5.956 5.956 0 0 1-2.328 3.957 5.94 5.94 0 0 1-3.609 1.211 5.953 5.953 0 0 1-4.793-2.385l-14.071-18.644-2.082 2.082v13.091a6.01 6.01 0 0 1-6.002 6.003z"
    }
  )
);
function vo({
  supabaseClient: s,
  socialLayout: e = "vertical",
  providers: t = ["github", "google", "azure"],
  providerScopes: r,
  queryParams: n,
  redirectTo: i,
  onlyThirdPartyProviders: o = !0,
  view: a = "sign_in",
  i18n: l,
  appearance: c
}) {
  const [u, d] = j(!1), [h, p] = j(""), g = e === "vertical", _ = a === "magic_link" ? "sign_in" : a, m = async (v) => {
    d(!0);
    const { error: b } = await s.auth.signInWithOAuth({
      provider: v,
      options: {
        redirectTo: i,
        scopes: r == null ? void 0 : r[v],
        queryParams: n
      }
    });
    b && p(b.message), d(!1);
  };
  function w(v) {
    const b = v.toLowerCase();
    return v.charAt(0).toUpperCase() + b.slice(1);
  }
  return /* @__PURE__ */ f.createElement(f.Fragment, null, t && t.length > 0 && /* @__PURE__ */ f.createElement(f.Fragment, null, /* @__PURE__ */ f.createElement(J, { gap: "large", direction: "vertical", appearance: c }, /* @__PURE__ */ f.createElement(
    J,
    {
      direction: g ? "vertical" : "horizontal",
      gap: g ? "small" : "medium",
      appearance: c
    },
    t.map((v) => {
      var b;
      return /* @__PURE__ */ f.createElement(
        Be,
        {
          key: v,
          color: "default",
          loading: u,
          onClick: () => m(v),
          appearance: c
        },
        /* @__PURE__ */ f.createElement(Qi, { provider: v }),
        g && Wi(
          (b = l == null ? void 0 : l[_]) == null ? void 0 : b.social_provider_text,
          {
            provider: w(v)
          }
        )
      );
    })
  )), !o && /* @__PURE__ */ f.createElement(Ki, { appearance: c })));
}
function gr({
  authView: s = "sign_in",
  defaultEmail: e = "",
  defaultPassword: t = "",
  setAuthView: r = () => {
  },
  setDefaultEmail: n = (g) => {
  },
  setDefaultPassword: i = (g) => {
  },
  supabaseClient: o,
  showLinks: a = !1,
  redirectTo: l,
  additionalData: c,
  magicLink: u,
  i18n: d,
  appearance: h,
  children: p
}) {
  var g, _, m, w;
  const v = Yr(!0), [b, y] = j(e), [E, S] = j(t), [C, P] = j(""), [A, I] = j(!1), [L, ee] = j("");
  Ve(() => (v.current = !0, y(e), S(t), () => {
    v.current = !1;
  }), [s]);
  const me = async (M) => {
    var ve;
    switch (M.preventDefault(), P(""), I(!0), s) {
      case "sign_in":
        const { error: _e } = await o.auth.signInWithPassword({
          email: b,
          password: E
        });
        _e && P(_e.message);
        break;
      case "sign_up":
        let Lt = {
          emailRedirectTo: l
        };
        c && (Lt.data = c);
        const {
          data: { user: Vr, session: Gr },
          error: Bt
        } = await o.auth.signUp({
          email: b,
          password: E,
          options: Lt
        });
        Bt ? P(Bt.message) : Vr && !Gr && ee((ve = d == null ? void 0 : d.sign_up) == null ? void 0 : ve.confirmation_text);
        break;
    }
    v.current && I(!1);
  }, ae = (M) => {
    n(b), i(E), r(M);
  }, W = d == null ? void 0 : d[s];
  return /* @__PURE__ */ f.createElement(
    "form",
    {
      id: s === "sign_in" ? "auth-sign-in" : "auth-sign-up",
      onSubmit: me,
      autoComplete: "on",
      style: { width: "100%" }
    },
    /* @__PURE__ */ f.createElement(J, { direction: "vertical", gap: "large", appearance: h }, /* @__PURE__ */ f.createElement(J, { direction: "vertical", gap: "large", appearance: h }, /* @__PURE__ */ f.createElement("div", null, /* @__PURE__ */ f.createElement(ie, { htmlFor: "email", appearance: h }, W == null ? void 0 : W.email_label), /* @__PURE__ */ f.createElement(
      ne,
      {
        id: "email",
        type: "email",
        name: "email",
        placeholder: W == null ? void 0 : W.email_input_placeholder,
        defaultValue: b,
        onChange: (M) => y(M.target.value),
        autoComplete: "email",
        appearance: h
      }
    )), /* @__PURE__ */ f.createElement("div", null, /* @__PURE__ */ f.createElement(ie, { htmlFor: "password", appearance: h }, W == null ? void 0 : W.password_label), /* @__PURE__ */ f.createElement(
      ne,
      {
        id: "password",
        type: "password",
        name: "password",
        placeholder: W == null ? void 0 : W.password_input_placeholder,
        defaultValue: E,
        onChange: (M) => S(M.target.value),
        autoComplete: s === "sign_in" ? "current-password" : "new-password",
        appearance: h
      }
    )), p), /* @__PURE__ */ f.createElement(
      Be,
      {
        type: "submit",
        color: "primary",
        loading: A,
        appearance: h
      },
      A ? W == null ? void 0 : W.loading_button_label : W == null ? void 0 : W.button_label
    ), a && /* @__PURE__ */ f.createElement(J, { direction: "vertical", gap: "small", appearance: h }, s === B.SIGN_IN && u && /* @__PURE__ */ f.createElement(
      he,
      {
        href: "#auth-magic-link",
        onClick: (M) => {
          M.preventDefault(), r(B.MAGIC_LINK);
        },
        appearance: h
      },
      (g = d == null ? void 0 : d.magic_link) == null ? void 0 : g.link_text
    ), s === B.SIGN_IN && /* @__PURE__ */ f.createElement(
      he,
      {
        href: "#auth-forgot-password",
        onClick: (M) => {
          M.preventDefault(), r(B.FORGOTTEN_PASSWORD);
        },
        appearance: h
      },
      (_ = d == null ? void 0 : d.forgotten_password) == null ? void 0 : _.link_text
    ), s === B.SIGN_IN ? /* @__PURE__ */ f.createElement(
      he,
      {
        href: "#auth-sign-up",
        onClick: (M) => {
          M.preventDefault(), ae(B.SIGN_UP);
        },
        appearance: h
      },
      (m = d == null ? void 0 : d.sign_up) == null ? void 0 : m.link_text
    ) : /* @__PURE__ */ f.createElement(
      he,
      {
        href: "#auth-sign-in",
        onClick: (M) => {
          M.preventDefault(), ae(B.SIGN_IN);
        },
        appearance: h
      },
      (w = d == null ? void 0 : d.sign_in) == null ? void 0 : w.link_text
    ))),
    L && /* @__PURE__ */ f.createElement(Y, { appearance: h }, L),
    C && /* @__PURE__ */ f.createElement(Y, { color: "danger", appearance: h }, C)
  );
}
function zr({
  setAuthView: s = () => {
  },
  supabaseClient: e,
  redirectTo: t,
  i18n: r,
  appearance: n,
  showLinks: i = !1
}) {
  var o;
  const [a, l] = j(""), [c, u] = j(""), [d, h] = j(""), [p, g] = j(!1), _ = async (w) => {
    var v;
    w.preventDefault(), u(""), h(""), g(!0);
    const { error: b } = await e.auth.resetPasswordForEmail(a, {
      redirectTo: t
    });
    b ? u(b.message) : h((v = r == null ? void 0 : r.forgotten_password) == null ? void 0 : v.confirmation_text), g(!1);
  }, m = r == null ? void 0 : r.forgotten_password;
  return /* @__PURE__ */ f.createElement("form", { id: "auth-forgot-password", onSubmit: _ }, /* @__PURE__ */ f.createElement(J, { direction: "vertical", gap: "large", appearance: n }, /* @__PURE__ */ f.createElement(J, { gap: "large", direction: "vertical", appearance: n }, /* @__PURE__ */ f.createElement("div", null, /* @__PURE__ */ f.createElement(ie, { htmlFor: "email", appearance: n }, m == null ? void 0 : m.email_label), /* @__PURE__ */ f.createElement(
    ne,
    {
      id: "email",
      name: "email",
      type: "email",
      autoFocus: !0,
      placeholder: m == null ? void 0 : m.email_input_placeholder,
      onChange: (w) => l(w.target.value),
      appearance: n
    }
  )), /* @__PURE__ */ f.createElement(
    Be,
    {
      type: "submit",
      color: "primary",
      loading: p,
      appearance: n
    },
    p ? m == null ? void 0 : m.loading_button_label : m == null ? void 0 : m.button_label
  ), i && /* @__PURE__ */ f.createElement(
    he,
    {
      href: "#auth-sign-in",
      onClick: (w) => {
        w.preventDefault(), s(B.SIGN_IN);
      },
      appearance: n
    },
    (o = r == null ? void 0 : r.sign_in) == null ? void 0 : o.link_text
  ), d && /* @__PURE__ */ f.createElement(Y, { appearance: n }, d), c && /* @__PURE__ */ f.createElement(Y, { color: "danger", appearance: n }, c))));
}
function qr({
  supabaseClient: s,
  i18n: e,
  appearance: t
}) {
  const [r, n] = j(""), [i, o] = j(""), [a, l] = j(""), [c, u] = j(!1), d = async (p) => {
    var g;
    p.preventDefault(), o(""), l(""), u(!0);
    const { error: _ } = await s.auth.updateUser({ password: r });
    _ ? o(_.message) : l((g = e == null ? void 0 : e.update_password) == null ? void 0 : g.confirmation_text), u(!1);
  }, h = e == null ? void 0 : e.update_password;
  return /* @__PURE__ */ f.createElement("form", { id: "auth-update-password", onSubmit: d }, /* @__PURE__ */ f.createElement(J, { gap: "large", direction: "vertical", appearance: t }, /* @__PURE__ */ f.createElement("div", null, /* @__PURE__ */ f.createElement(ie, { htmlFor: "password", appearance: t }, h == null ? void 0 : h.password_label), /* @__PURE__ */ f.createElement(
    ne,
    {
      id: "password",
      name: "password",
      placeholder: h == null ? void 0 : h.password_input_placeholder,
      type: "password",
      autoFocus: !0,
      onChange: (p) => n(p.target.value),
      appearance: t
    }
  )), /* @__PURE__ */ f.createElement(
    Be,
    {
      type: "submit",
      color: "primary",
      loading: c,
      appearance: t
    },
    c ? h == null ? void 0 : h.loading_button_label : h == null ? void 0 : h.button_label
  ), a && /* @__PURE__ */ f.createElement(Y, { appearance: t }, a), i && /* @__PURE__ */ f.createElement(Y, { color: "danger", appearance: t }, i)));
}
function _o({
  setAuthView: s = () => {
  },
  supabaseClient: e,
  otpType: t = "email",
  i18n: r,
  appearance: n,
  showLinks: i = !1
}) {
  var o;
  const [a, l] = j(""), [c, u] = j(""), [d, h] = j(""), [p, g] = j(""), [_, m] = j(""), [w, v] = j(!1), b = async (E) => {
    E.preventDefault(), g(""), m(""), v(!0);
    let S = {
      email: a,
      token: d,
      type: t
    };
    ["sms", "phone_change"].includes(t) && (S = {
      phone: c,
      token: d,
      type: t
    });
    const { error: C } = await e.auth.verifyOtp(S);
    C && g(C.message), v(!1);
  }, y = r == null ? void 0 : r.verify_otp;
  return /* @__PURE__ */ f.createElement("form", { id: "auth-magic-link", onSubmit: b }, /* @__PURE__ */ f.createElement(J, { gap: "large", direction: "vertical", appearance: n }, ["sms", "phone_change"].includes(t) ? /* @__PURE__ */ f.createElement("div", null, /* @__PURE__ */ f.createElement(ie, { htmlFor: "phone", appearance: n }, y == null ? void 0 : y.phone_input_label), /* @__PURE__ */ f.createElement(
    ne,
    {
      id: "phone",
      name: "phone",
      type: "text",
      autoFocus: !0,
      placeholder: y == null ? void 0 : y.phone_input_placeholder,
      onChange: (E) => u(E.target.value),
      appearance: n
    }
  )) : /* @__PURE__ */ f.createElement("div", null, /* @__PURE__ */ f.createElement(ie, { htmlFor: "email", appearance: n }, y == null ? void 0 : y.email_input_label), /* @__PURE__ */ f.createElement(
    ne,
    {
      id: "email",
      name: "email",
      type: "email",
      autoFocus: !0,
      placeholder: y == null ? void 0 : y.email_input_placeholder,
      onChange: (E) => l(E.target.value),
      appearance: n
    }
  )), /* @__PURE__ */ f.createElement("div", null, /* @__PURE__ */ f.createElement(ie, { htmlFor: "token", appearance: n }, y == null ? void 0 : y.token_input_label), /* @__PURE__ */ f.createElement(
    ne,
    {
      id: "token",
      name: "token",
      type: "text",
      placeholder: y == null ? void 0 : y.token_input_placeholder,
      onChange: (E) => h(E.target.value),
      appearance: n
    }
  )), /* @__PURE__ */ f.createElement(
    Be,
    {
      color: "primary",
      type: "submit",
      loading: w,
      appearance: n
    },
    w ? y == null ? void 0 : y.loading_button_label : y == null ? void 0 : y.button_label
  ), i && /* @__PURE__ */ f.createElement(
    he,
    {
      href: "#auth-sign-in",
      onClick: (E) => {
        E.preventDefault(), s(B.SIGN_IN);
      },
      appearance: n
    },
    (o = r == null ? void 0 : r.sign_in) == null ? void 0 : o.link_text
  ), _ && /* @__PURE__ */ f.createElement(Y, { appearance: n }, _), p && /* @__PURE__ */ f.createElement(Y, { color: "danger", appearance: n }, p)));
}
const Hr = Zr({ user: null, session: null }), wo = (s) => {
  const { supabaseClient: e } = s, [t, r] = j(null), [n, i] = j((t == null ? void 0 : t.user) ?? null);
  Ve(() => {
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
    user: n
  };
  return /* @__PURE__ */ f.createElement(Hr.Provider, { value: o, ...s });
}, bo = () => {
  const s = Qr(Hr);
  if (s === void 0)
    throw new Error("useUser must be used within a UserContextProvider.");
  return s;
};
function Ue({
  supabaseClient: s,
  socialLayout: e = "vertical",
  providers: t,
  providerScopes: r,
  queryParams: n,
  view: i = "sign_in",
  redirectTo: o,
  onlyThirdPartyProviders: a = !1,
  magicLink: l = !1,
  showLinks: c = !0,
  appearance: u,
  theme: d = "default",
  localization: h = { variables: {} },
  otpType: p = "email",
  additionalData: g,
  children: _
}) {
  const m = gt(zi, h.variables ?? {}), [w, v] = j(i), [b, y] = j(""), [E, S] = j(""), C = w === "sign_in" || w === "sign_up" || w === "magic_link";
  Ve(() => {
    var I, L;
    Mr({
      theme: gt(
        ((I = u == null ? void 0 : u.theme) == null ? void 0 : I.default) ?? {},
        ((L = u == null ? void 0 : u.variables) == null ? void 0 : L.default) ?? {}
      )
    });
  }, [u]);
  const P = ({ children: I }) => {
    var L;
    return (
      // @ts-ignore
      /* @__PURE__ */ f.createElement(
        "div",
        {
          className: d !== "default" ? Ni(
            gt(
              // @ts-ignore
              u == null ? void 0 : u.theme[d],
              ((L = u == null ? void 0 : u.variables) == null ? void 0 : L[d]) ?? {}
            )
          ) : ""
        },
        C && /* @__PURE__ */ f.createElement(
          vo,
          {
            appearance: u,
            supabaseClient: s,
            providers: t,
            providerScopes: r,
            queryParams: n,
            socialLayout: e,
            redirectTo: o,
            onlyThirdPartyProviders: a,
            i18n: m,
            view: w
          }
        ),
        !a && I
      )
    );
  };
  Ve(() => {
    const { data: I } = s.auth.onAuthStateChange(
      (L) => {
        L === "PASSWORD_RECOVERY" ? v("update_password") : L === "USER_UPDATED" && v("sign_in");
      }
    );
    return v(i), () => I.subscription.unsubscribe();
  }, [i]);
  const A = {
    supabaseClient: s,
    setAuthView: v,
    defaultEmail: b,
    defaultPassword: E,
    setDefaultEmail: y,
    setDefaultPassword: S,
    redirectTo: o,
    magicLink: l,
    showLinks: c,
    i18n: m,
    appearance: u
  };
  switch (w) {
    case B.SIGN_IN:
      return /* @__PURE__ */ f.createElement(P, null, /* @__PURE__ */ f.createElement(gr, { ...A, authView: "sign_in" }));
    case B.SIGN_UP:
      return /* @__PURE__ */ f.createElement(P, null, /* @__PURE__ */ f.createElement(
        gr,
        {
          appearance: u,
          supabaseClient: s,
          authView: "sign_up",
          setAuthView: v,
          defaultEmail: b,
          defaultPassword: E,
          setDefaultEmail: y,
          setDefaultPassword: S,
          redirectTo: o,
          magicLink: l,
          showLinks: c,
          i18n: m,
          additionalData: g,
          children: _
        }
      ));
    case B.FORGOTTEN_PASSWORD:
      return /* @__PURE__ */ f.createElement(P, null, /* @__PURE__ */ f.createElement(
        zr,
        {
          appearance: u,
          supabaseClient: s,
          setAuthView: v,
          redirectTo: o,
          showLinks: c,
          i18n: m
        }
      ));
    case B.MAGIC_LINK:
      return /* @__PURE__ */ f.createElement(P, null, /* @__PURE__ */ f.createElement(
        Wr,
        {
          appearance: u,
          supabaseClient: s,
          setAuthView: v,
          redirectTo: o,
          showLinks: c,
          i18n: m
        }
      ));
    case B.UPDATE_PASSWORD:
      return /* @__PURE__ */ f.createElement(
        qr,
        {
          appearance: u,
          supabaseClient: s,
          i18n: m
        }
      );
    case B.VERIFY_OTP:
      return /* @__PURE__ */ f.createElement(
        _o,
        {
          appearance: u,
          supabaseClient: s,
          otpType: p,
          i18n: m
        }
      );
    default:
      return null;
  }
}
Ue.ForgottenPassword = zr;
Ue.UpdatePassword = qr;
Ue.MagicLink = Wr;
Ue.UserContextProvider = wo;
Ue.useUser = bo;
X({
  borderRadius: "12px",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  width: "360px",
  padding: "28px 32px"
});
function mr({ supabaseUrl: s, supabaseAnonKey: e, onSessionChange: t }) {
  const [r, n] = j(null), i = ci(s, e);
  return Ve(() => {
    i.auth.getSession().then(({ data: { session: a } }) => {
      n(a), t == null || t(a), console.log("session", a);
    });
    const {
      data: { subscription: o }
    } = i.auth.onAuthStateChange((a, l) => {
      n(l), t == null || t(l);
    });
    return () => o.unsubscribe();
  }, [i, t]), r ? null : /* @__PURE__ */ R.jsx(
    Ue,
    {
      supabaseClient: i,
      appearance: { theme: Di }
    }
  );
}
function vr({ title: s, content: e, pinned: t, user: r, onClick: n }) {
  r && (s = "@" + r.username);
  const i = e.split(`
`).map((o, a) => /* @__PURE__ */ R.jsxs("span", { children: [
    o,
    /* @__PURE__ */ R.jsx("br", {})
  ] }, a));
  return /* @__PURE__ */ R.jsxs(
    "div",
    {
      onClick: () => {
        n && n();
      },
      className: `
            rounded-lg
            p-4
            mt-4

            Card
        `,
      children: [
        t && /* @__PURE__ */ R.jsx("div", { className: "text-sm text-yellow-500 font-bold mb-2", children: "📌" }),
        /* @__PURE__ */ R.jsx("h2", { className: "text-lg font-semibold", children: s }),
        /* @__PURE__ */ R.jsx("p", { className: "mt-2", children: i })
      ]
    }
  );
}
const yo = [
  "https://pnlhagzgdvquioqyxggs.supabase.co",
  "sb_publishable_lt7_lAielqBkFbLCgQhqOA_u9ASI_pB"
], [_r, wr] = yo;
class ko {
  constructor() {
    nt(this, "session", null);
    nt(this, "user", null);
  }
  // Handle session change from AuthUI
  async handleSessionChange(e) {
    if (this.session = e, e)
      try {
        this.user = await this.syncWithBackend(e);
      } catch (t) {
        console.error("Failed to sync with backend:", t), this.user = null;
      }
    else
      this.user = null;
  }
  // Sync session with backend and get user data
  async syncWithBackend(e) {
    const t = await fetch("/api/v0/auth/supabase-sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e.access_token}`
      },
      body: JSON.stringify({
        access_token: e.access_token,
        refresh_token: e.refresh_token,
        expires_at: e.expires_at,
        expires_in: e.expires_in,
        token_type: e.token_type,
        user: e.user
      })
    });
    if (!t.ok)
      throw new Error(`HTTP ${t.status}: ${t.statusText}`);
    return t.json();
  }
  // API helper method for authenticated requests
  async apiRequest(e, t = {}) {
    if (!this.session)
      throw new Error("No active session");
    const r = await fetch(e, {
      ...t,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.session.access_token}`,
        ...t.headers
      }
    });
    if (!r.ok)
      throw new Error(`HTTP ${r.status}: ${r.statusText}`);
    return r.json();
  }
}
const Pe = new ko();
var So = /* @__PURE__ */ ((s) => (s.LOGIN_SIGN_UP = "login-sign-up", s.ADMIN_LOGIN_SIGN_UP = "admin-login-sign-up", s.EDITOR = "editor", s.USER_STATUS = "user-status", s))(So || {});
function Ao({ className: s, islandType: e }) {
  const [t, r] = j(Pe.user), [n, i] = j(!1);
  async function o() {
    if (!t) {
      alert("Please log in first! 🔐");
      return;
    }
    try {
      const a = await Pe.apiRequest("/api/v0/items", {
        method: "POST",
        body: JSON.stringify({
          content: "Test item from meow app",
          content_type: "text/plain"
        })
      });
      alert("Item sent! 🚀"), console.log("Item created:", a);
    } catch (a) {
      console.error("Failed to send item:", a), alert("Failed to send item 😿");
    }
  }
  return /* @__PURE__ */ R.jsxs("div", { className: s, children: [
    e === "user-status" && t && /* @__PURE__ */ R.jsx(R.Fragment, { children: `Signed in as ${t.username} • Email: ${t.email}` }),
    e === "login-sign-up" && /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
      n && /* @__PURE__ */ R.jsx(vr, { title: "🔄 Syncing...", content: "Connecting to backend..." }),
      /* @__PURE__ */ R.jsx(
        mr,
        {
          supabaseUrl: _r,
          supabaseAnonKey: wr,
          onSessionChange: async (a) => {
            console.log("Session changed:", a), i(!0), await Pe.handleSessionChange(a), r(Pe.user), i(!1);
          }
        }
      )
    ] }),
    e === "admin-login-sign-up" && /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
      n && /* @__PURE__ */ R.jsx(vr, { title: "🔄 Syncing...", content: "Connecting to backend..." }),
      /* @__PURE__ */ R.jsx(
        mr,
        {
          supabaseUrl: _r,
          supabaseAnonKey: wr,
          onSessionChange: async (a) => {
            console.log("Session changed:", a), i(!0), await Pe.handleSessionChange(a), r(Pe.user), i(!1);
          }
        }
      )
    ] }),
    e === "editor" && /* @__PURE__ */ R.jsx(R.Fragment, {}),
    /* @__PURE__ */ R.jsx("div", { className: "card", children: /* @__PURE__ */ R.jsxs("button", { onClick: () => o(), children: [
      "🚀 add item ",
      t ? `(as ${t.username})` : "(login required)"
    ] }) })
  ] });
}
export {
  Ao as A,
  So as M,
  R as j
};
