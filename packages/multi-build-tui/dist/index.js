#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.tsx
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var os = __toESM(require("os"));
var import_react = require("react");
var import_blessed = __toESM(require("blessed"));
var import_react_blessed = require("react-blessed");
var import_node_child_process = require("child_process");
var import_jsx_runtime = require("react/jsx-runtime");
var ROOT = process.cwd();
var OPTIONS_PATH = path.join(ROOT, "multi-build-options.json");
var CONFIG_PATH = path.join(ROOT, "multi-build-config.json");
var config_manager = new class {
  loadOptions() {
    const raw = fs.readFileSync(OPTIONS_PATH, "utf8");
    return JSON.parse(raw);
  }
  ensureInitialConfig(opts) {
    if (fs.existsSync(CONFIG_PATH)) {
      const raw = fs.readFileSync(CONFIG_PATH, "utf8");
      return JSON.parse(raw);
    }
    const selected = {};
    for (const t of opts.targets) selected[t.id] = t.default !== false;
    const cfg = { version: opts.version ?? 1, selected, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2) + os.EOL);
    return cfg;
  }
  saveConfig(version, selected) {
    const cfg = { version, selected, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2) + os.EOL);
  }
}();
function App() {
  const initialOpts = config_manager.loadOptions();
  const [opts] = (0, import_react.useState)(initialOpts);
  const initialSelected = config_manager.ensureInitialConfig(initialOpts).selected;
  const [selected, setSelected] = (0, import_react.useState)(initialSelected);
  const [building, setBuilding] = (0, import_react.useState)(false);
  const [logs, setLogs] = (0, import_react.useState)([]);
  const listRef = (0, import_react.useRef)(null);
  const targets = opts.targets;
  (0, import_react.useEffect)(() => {
    config_manager.saveConfig(opts.version, selected);
  }, [selected]);
  (0, import_react.useEffect)(() => {
    const t = setTimeout(() => listRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, []);
  function rowText(t) {
    const mark = selected[t.id] ? "[x]" : "[ ]";
    return `${mark} ${t.label} {gray-fg}${t.id}{/gray-fg}`;
  }
  function toggleAtIndex(idx) {
    const t = targets[idx];
    if (!t) return;
    setSelected((s) => ({ ...s, [t.id]: !s[t.id] }));
  }
  function selectAll(val) {
    const next = {};
    for (const t of targets) next[t.id] = val;
    setSelected(next);
  }
  function log(line) {
    setLogs((l) => [...l, line]);
  }
  function clearLogs() {
    setLogs([]);
  }
  async function execStreaming(cmd) {
    return new Promise((resolve, reject) => {
      const child = (0, import_node_child_process.spawn)("bash", ["-lc", cmd], { cwd: ROOT, env: process.env });
      child.stdout.on("data", (d) => log(d.toString().trimEnd()));
      child.stderr.on("data", (d) => log(`{red-fg}${d.toString().trimEnd()}{/red-fg}`));
      child.on("close", (code) => code === 0 ? resolve() : reject(new Error(`${cmd} exited with code ${code}`)));
      child.on("error", (e) => reject(e));
    });
  }
  async function runBuilds() {
    if (building) return;
    const selectedTargets = targets.filter((t) => selected[t.id]);
    if (selectedTargets.length === 0) {
      log("{yellow-fg}No targets selected{/yellow-fg}");
      return;
    }
    setBuilding(true);
    clearLogs();
    log(`Starting ${selectedTargets.length} target(s) ...`);
    try {
      for (const t of selectedTargets) {
        log(`
{bold}\u27A1\uFE0F  ${t.label} (${t.id}){/bold}`);
        await execStreaming(t.script);
        log(`{green-fg}\u2705 Completed ${t.id}{/green-fg}`);
      }
      log("{green-fg}All selected builds finished{/green-fg}");
    } catch (err) {
      log(`{red-fg}\u274C Failed: ${err?.message || err}{/red-fg}`);
    } finally {
      setBuilding(false);
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("element", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "box",
      {
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        tags: true,
        style: { fg: "white" },
        content: "{bold}\u2191/\u2193{/bold} move  {bold}Space/Click{/bold} toggle  {bold}a{/bold} all  {bold}n{/bold} none  {bold}b{/bold} build  {bold}q{/bold} quit"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "list",
      {
        ref: listRef,
        label: ` Build targets (v${opts.version}) `,
        border: "line",
        tags: true,
        keys: true,
        mouse: true,
        interactive: !building,
        top: 2,
        left: 0,
        right: 0,
        height: "30%",
        style: { selected: { bg: "blue" }, item: { hover: { bg: "gray" } } },
        items: targets.map(rowText),
        onSelect: (_el, i) => toggleAtIndex(i),
        onKeypress: (_ch, key) => {
          const idx = listRef.current?.selected ?? 0;
          if (key.name === "space") toggleAtIndex(idx);
          if (key.name === "a") selectAll(true);
          if (key.name === "n") selectAll(false);
          if (key.name === "b") runBuilds();
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "log",
      {
        label: " Build output ",
        border: "line",
        top: "33%",
        left: 0,
        right: 0,
        height: "66%",
        tags: true,
        keys: true,
        mouse: true,
        scrollable: true,
        alwaysScroll: true,
        scrollbar: { ch: " ", track: { bg: "gray" }, style: { bg: "white" } },
        content: logs.join("\n")
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        bottom: 3,
        width: 15,
        height: 3,
        left: "center",
        mouse: true,
        keys: true,
        content: building ? " [ Building... ] " : " [ Build ] ",
        align: "center",
        shrink: true,
        border: "line",
        onPress: () => runBuilds(),
        style: { fg: "white", bg: "green", focus: { bg: "lightgreen" }, hover: { bg: "lightgreen" } }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("box", { bottom: 0, left: 0, right: 0, height: 3, tags: true, children: "Ready" })
  ] });
}
function main() {
  if (!fs.existsSync(OPTIONS_PATH)) {
    console.error(`multi-build-tui: missing ${OPTIONS_PATH}`);
    process.exit(1);
  }
  const screen = import_blessed.default.screen({
    smartCSR: true,
    title: "multi-build-tui",
    fullUnicode: true,
    mouse: true,
    tags: true
    // Enable tag parsing globally
  });
  screen.key(["q", "C-c", "escape"], () => process.exit(0));
  (0, import_react_blessed.render)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}), screen);
}
main();
