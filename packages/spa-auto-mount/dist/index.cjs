"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createAutoMountFunction: () => createAutoMountFunction,
  runAutoMount: () => runAutoMount
});
module.exports = __toCommonJS(index_exports);
var import_client = require("react-dom/client");
var import_react = require("react");
function createAutoMountFunction(options) {
  const { appPrefix, component: AppComponent, cssImport } = options;
  return function autoMount() {
    const selector = `[data-app-${appPrefix}]:not([data-app-${appPrefix}-mounted])`;
    const container = document.querySelector(selector);
    if (!container || !(container instanceof HTMLElement)) {
      return;
    }
    container.setAttribute(`data-app-${appPrefix}-mounted`, "true");
    const props = {};
    Object.keys(container.dataset).forEach((key) => {
      if (key.startsWith(appPrefix)) {
        const propKey = key.replace(new RegExp(`^${appPrefix}`), "").replace(
          /([A-Z])/g,
          (_, letter) => letter.toLowerCase()
        );
        let value = container.dataset[key];
        if (value === "true") value = true;
        else if (value === "false") value = false;
        else if (value && !isNaN(Number(value))) value = Number(value);
        if (propKey) props[propKey] = value;
      }
    });
    if (cssImport) {
      cssImport();
    }
    container.innerHTML = "";
    const root = (0, import_client.createRoot)(container);
    root.render((0, import_react.createElement)(AppComponent, props));
  };
}
function runAutoMount(autoMountFn) {
  autoMountFn();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoMountFn);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAutoMountFunction,
  runAutoMount
});
//# sourceMappingURL=index.cjs.map