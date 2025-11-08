#!/usr/bin/env node

// src/run.ts
import * as fs from "fs";
import * as path from "path";
import { spawn } from "child_process";
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
    const child = spawn(bin, parts, { stdio: "inherit" });
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
