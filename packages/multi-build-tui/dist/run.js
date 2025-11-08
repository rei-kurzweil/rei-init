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

// src/run.ts
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var import_node_child_process = require("child_process");
var ROOT = process.cwd();
var CONFIG_PATH = path.join(ROOT, "multi-build-config.json");
var OPTIONS_PATH = path.join(ROOT, "multi-build-options.json");
function loadJSON(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}
function log(msg) {
  process.stdout.write(msg + "\n");
}
async function runScript(cmd) {
  return new Promise((resolve, reject) => {
    const parts = cmd.split(/\s+/);
    const bin = parts.shift();
    const child = (0, import_node_child_process.spawn)(bin, parts, { stdio: "inherit" });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
  });
}
async function main() {
  if (!fs.existsSync(CONFIG_PATH) || !fs.existsSync(OPTIONS_PATH)) {
    console.error("Missing multi-build config or options file; run multi-build-tui first.");
    process.exit(1);
  }
  const cfg = loadJSON(CONFIG_PATH);
  const opts = loadJSON(OPTIONS_PATH);
  const targetsToRun = opts.targets.filter((t) => cfg.selected[t.id]);
  if (targetsToRun.length === 0) {
    log("No build targets selected. Nothing to do.");
    return;
  }
  log(`Running ${targetsToRun.length} build target(s)...`);
  for (const t of targetsToRun) {
    log(`
\u27A1\uFE0F  ${t.label} (${t.id})
$ ${t.script}`);
    try {
      await runScript(t.script);
      log(`\u2705 Completed ${t.id}`);
    } catch (err) {
      console.error(`\u274C Failed ${t.id}:`, err);
      process.exit(1);
    }
  }
  log("\n\u{1F389} All selected builds finished.");
}
main();
