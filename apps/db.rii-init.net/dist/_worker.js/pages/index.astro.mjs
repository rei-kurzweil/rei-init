globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                 */
import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderSlot, r as renderTemplate, n as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_LGF5l_We.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro Basics</title>${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/plush/dev/rei-init/apps/db.rei-init.net/app/src/layouts/Layout.astro", void 0);

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;
	{
	  jsxRuntime.exports = requireReactJsxRuntime_production();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

function DatabaseBrowser({ tables, tableData, error }) {
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-red-50 border border-red-200 rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-red-800 font-semibold mb-2", children: "Database Error" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-600", children: error })
    ] });
  }
  if (tables.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-yellow-50 border border-yellow-200 rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-yellow-800 font-semibold mb-2", children: "No Tables Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-yellow-600", children: "No tables found in the database or database not connected." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full space-y-12", children: tables.map((table) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: tableData[table.name] && /* @__PURE__ */ jsxRuntimeExports.jsx(
    TableDisplay,
    {
      tableName: table.name,
      data: tableData[table.name]
    }
  ) }, table.name)) });
}
function TableDisplay({ tableName, data }) {
  if (data.error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-red-50 border border-red-200 rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-red-800 font-semibold mb-2", children: [
        "Error loading ",
        tableName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-600", children: data.error })
    ] });
  }
  const { columns, rows } = data;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: tableName }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600", children: [
        rows.length,
        " row",
        rows.length !== 1 ? "s" : "",
        " • ",
        columns.length,
        " column",
        columns.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Schema" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Column" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Constraints" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: columns.map((column) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-sm font-medium text-gray-900", children: column.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-sm text-gray-500", children: column.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 text-sm text-gray-500", children: [
            column.pk ? "PRIMARY KEY " : "",
            column.notnull ? "NOT NULL " : "",
            column.dflt_value !== null ? `DEFAULT ${column.dflt_value}` : ""
          ] })
        ] }, column.cid)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Data (first 36 rows)" }),
      rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 italic", children: "No data in this table" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: columns.map((column) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            children: column.name
          },
          column.name
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: rows.map((row, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: index % 2 === 0 ? "bg-white" : "bg-gray-50", children: columns.map((column) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-sm text-gray-900", children: row[column.name] === null ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 italic", children: "NULL" }) : String(row[column.name]) }, column.name)) }, index)) })
      ] }) })
    ] })
  ] });
}

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { DB } = Astro2.locals.runtime.env;
  let tables = [];
  let tableData = {};
  let error = null;
  try {
    const tablesResult = await DB.prepare(`
		SELECT name FROM sqlite_master 
		WHERE type='table' 
		AND name NOT LIKE 'sqlite_%' 
		AND name NOT LIKE '_cf_%'
		ORDER BY name
	`).all();
    tables = tablesResult.results || [];
    if (tables.length === 0) {
      error = "No tables found in the database.";
      console.warn("No tables found in the database.");
      return;
    }
    for (const table of tables) {
      const tableName = table.name;
      try {
        const schemaResult = await DB.prepare(`PRAGMA table_info(${tableName})`).all();
        const columns = schemaResult.results || [];
        const dataResult = await DB.prepare(`SELECT * FROM ${tableName} LIMIT 36`).all();
        let rows = dataResult.results || [];
        rows = rows.map((row) => {
          const sanitizedRow = { ...row };
          Object.keys(sanitizedRow).forEach((key) => {
            if (key.toLowerCase().includes("password") || key.toLowerCase().includes("pwd")) {
              sanitizedRow[key] = "******";
            }
          });
          return sanitizedRow;
        });
        tableData[tableName] = {
          columns,
          rows
        };
      } catch (tableError) {
        console.error(`Error querying table ${tableName}:`, tableError);
        tableData[tableName] = {
          columns: [],
          rows: [],
          error: `Error loading table: ${tableError instanceof Error ? tableError.message : "Unknown error"}`
        };
      }
    }
  } catch (e) {
    error = `Database connection error: ${e instanceof Error ? e.message : "Unknown error"}`;
    console.error("D1 Database Error:", e);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-8"> <h1 class="text-3xl font-bold text-gray-900 mb-8">Database Browser 🖬🥞᠁🦖🌎</h1> ${renderComponent($$result2, "DatabaseBrowser", DatabaseBrowser, { "tables": tables, "tableData": tableData, "error": error, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/plush/dev/rei-init/apps/db.rei-init.net/app/src/components/DatabaseBrowser.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/plush/dev/rei-init/apps/db.rei-init.net/app/src/pages/index.astro", void 0);

const $$file = "/home/plush/dev/rei-init/apps/db.rei-init.net/app/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
