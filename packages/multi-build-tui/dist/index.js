#!/usr/bin/env node

// src/index.ts
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import blessed from "blessed";
import { spawn } from "child_process";
var ROOT = process.cwd();
var OPTIONS_PATH = path.join(ROOT, "multi-build-options.json");
var CONFIG_PATH = path.join(ROOT, "multi-build-config.json");
var config_manager = new class {
  loadOptions() {
    const raw = fs.readFileSync(OPTIONS_PATH, "utf8");
    const data = JSON.parse(raw);
    return data;
  }
  ensureInitialConfig(opts) {
    if (fs.existsSync(CONFIG_PATH)) {
      const raw = fs.readFileSync(CONFIG_PATH, "utf8");
      return JSON.parse(raw);
    }
    const selected = {};
    for (const t of opts.targets) {
      selected[t.id] = t.default !== false;
    }
    const cfg = {
      version: opts.version ?? 1,
      selected,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2) + os.EOL);
    return cfg;
  }
  saveConfig(version, selected) {
    const cfg = {
      version,
      selected,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2) + os.EOL);
  }
}();
function main() {
  if (!fs.existsSync(OPTIONS_PATH)) {
    console.error(`multi-build-tui: missing ${OPTIONS_PATH}`);
    process.exit(1);
  }
  const opts = config_manager.loadOptions();
  const cfg = config_manager.ensureInitialConfig(opts);
  const screen = blessed.screen({
    smartCSR: true,
    title: "multi-build-tui",
    fullUnicode: true,
    mouse: true
  });
  const help = blessed.box({
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    tags: true,
    content: "{bold}\u2191/\u2193{/bold} move  {bold}Space/Click{/bold} toggle  {bold}a{/bold} all  {bold}n{/bold} none  {bold}q{/bold} quit",
    style: { fg: "white" }
  });
  const list = blessed.list({
    top: 3,
    left: 0,
    right: 0,
    bottom: 12,
    tags: true,
    mouse: true,
    keys: true,
    vi: false,
    interactive: true,
    border: "line",
    label: ` Build targets (v${opts.version}) `,
    style: {
      selected: { bg: "blue" },
      item: { hover: { bg: "gray" } }
    }
  });
  const output = blessed.log({
    bottom: 6,
    left: 0,
    right: 0,
    height: 9,
    label: " Build output ",
    border: "line",
    tags: true,
    keys: true,
    mouse: true,
    scrollable: true,
    alwaysScroll: true,
    scrollbar: { ch: " ", track: { bg: "gray" }, style: { bg: "white" } },
    style: { fg: "white" }
  });
  const buildBtn = blessed.button({
    bottom: 3,
    width: 15,
    height: 3,
    left: "center",
    mouse: true,
    keys: true,
    content: " [ Build ] ",
    align: "center",
    shrink: true,
    border: "line",
    style: {
      fg: "white",
      bg: "green",
      focus: { bg: "lightgreen" },
      hover: { bg: "lightgreen" }
    }
  });
  const status = blessed.box({
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    tags: true,
    content: "Ready"
  });
  screen.append(help);
  screen.append(list);
  screen.append(output);
  screen.append(buildBtn);
  screen.append(status);
  const selected = { ...cfg.selected };
  function rowText(t) {
    const mark = selected[t.id] ? "[x]" : "[ ]";
    return `${mark} ${t.label} {gray-fg}${t.id}{/gray-fg}`;
  }
  function refresh() {
    list.setItems(
      opts.targets.map((t) => blessed.parseTags(rowText(t)))
    );
    screen.render();
  }
  function showTemporaryStatus(msg, duration = 2e3) {
    status.setContent(msg);
    screen.render();
    setTimeout(() => {
      status.setContent("Ready");
      screen.render();
    }, duration);
  }
  const selection = new class {
    toggleAt(index) {
      const t = opts.targets[index];
      if (!t) return;
      selected[t.id] = !selected[t.id];
      config_manager.saveConfig(opts.version, selected);
      showTemporaryStatus(`Updated config: ${t.label} to ${selected[t.id] ? "ON" : "OFF"}`);
      refresh();
    }
    selectAll(val) {
      for (const t of opts.targets) selected[t.id] = val;
      config_manager.saveConfig(opts.version, selected);
      showTemporaryStatus(`Set all targets to ${val ? "ON" : "OFF"}`);
      refresh();
    }
  }();
  list.on("select", (_el, index) => selection.toggleAt(index));
  list.on("keypress", (_ch, key) => {
    const selIndex = list.selected ?? 0;
    if (key.name === "space") selection.toggleAt(selIndex);
    if (key.name === "a") selection.selectAll(true);
    if (key.name === "n") selection.selectAll(false);
    if (key.name === "b") runBuilds();
  });
  let building = false;
  async function runBuilds() {
    if (building) return;
    const targetsToRun = opts.targets.filter((t) => selected[t.id]);
    if (targetsToRun.length === 0) {
      showTemporaryStatus("{yellow-fg}No targets selected{/yellow-fg}");
      return;
    }
    config_manager.saveConfig(opts.version, selected);
    building = true;
    list.locked = true;
    buildBtn.disabled = true;
    output.setContent("");
    output.log(`Starting ${targetsToRun.length} target(s) ...`);
    screen.render();
    try {
      for (const t of targetsToRun) {
        ;
        output.log(`
{bold}\u27A1\uFE0F  ${t.label} (${t.id}){/bold}`);
        await execStreaming(t.script);
        output.log(`{green-fg}\u2705 Completed ${t.id}{/green-fg}`);
        screen.render();
      }
      showTemporaryStatus("{green-fg}All selected builds finished{/green-fg}", 3e3);
    } catch (err) {
      ;
      output.log(`{red-fg}\u274C Failed: ${err?.message || err}{/red-fg}`);
      showTemporaryStatus("{red-fg}Build failed{/red-fg}", 4e3);
    } finally {
      building = false;
      list.locked = false;
      buildBtn.disabled = false;
      screen.render();
    }
  }
  function execStreaming(cmd) {
    return new Promise((resolve, reject) => {
      const child = spawn("bash", ["-lc", cmd], { cwd: ROOT, env: process.env });
      child.stdout.on("data", (d) => {
        output.log(d.toString().trimEnd());
        screen.render();
      });
      child.stderr.on("data", (d) => {
        output.log(`{red-fg}${d.toString().trimEnd()}{/red-fg}`);
        screen.render();
      });
      child.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`${cmd} exited with code ${code}`));
      });
      child.on("error", (e) => reject(e));
    });
  }
  buildBtn.on("press", () => runBuilds());
  screen.key(["q", "C-c", "escape"], () => {
    config_manager.saveConfig(opts.version, selected);
    screen.destroy();
    process.exit(0);
  });
  list.focus();
  refresh();
  screen.render();
}
main();
