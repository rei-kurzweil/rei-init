// src/index.ts
import { createRoot } from "react-dom/client";
import { createElement } from "react";
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
    const root = createRoot(container);
    root.render(createElement(AppComponent, props));
  };
}
function runAutoMount(autoMountFn) {
  autoMountFn();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoMountFn);
  }
}
export {
  createAutoMountFunction,
  runAutoMount
};
//# sourceMappingURL=index.js.map