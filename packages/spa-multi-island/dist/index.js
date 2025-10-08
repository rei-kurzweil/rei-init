// src/index.ts
import { createRoot } from "react-dom/client";
import { MicroBus } from "@rei-init/micro-bus";
import { createElement } from "react";
import { MicroBus as MicroBus2 } from "@rei-init/micro-bus";
function mountMultipleIslands(islandConfigs, options = {}) {
  const microBus = options.microBus || new MicroBus();
  islandConfigs.forEach(({ component: Component, selector, props = {} }) => {
    try {
      const element = document.querySelector(selector);
      if (!element) {
        console.warn(`Island selector not found: ${selector}`);
        return;
      }
      const root = createRoot(element);
      const componentProps = {
        ...props,
        islandBus: microBus
      };
      root.render(createElement(Component, componentProps));
      options.onMount?.(selector, props);
    } catch (error) {
      console.error(`Failed to mount island at ${selector}:`, error);
      options.onError?.(selector, error);
    }
  });
  return microBus;
}
function mountSingleIsland(Component, selector, props, microBus) {
  return mountMultipleIslands([{ component: Component, selector, props }], { microBus });
}
function autoMountIslands(Component, options = {}) {
  const islands = document.querySelectorAll("[data-spa-island]");
  const islandConfigs = [];
  islands.forEach((element) => {
    const islandType = element.getAttribute("data-spa-island");
    const islandProps = element.getAttribute("data-spa-props");
    const id = element.id;
    const className = element.className;
    const selector = id ? `#${id}` : className ? `.${className.split(" ")[0]}` : `[data-spa-island="${islandType}"]`;
    let props = {};
    if (islandProps) {
      try {
        props = JSON.parse(islandProps);
      } catch (error) {
        console.warn(`Failed to parse props for island ${selector}:`, error);
      }
    }
    if (islandType) {
      props = { ...props, islandType };
    }
    islandConfigs.push({ component: Component, selector, props });
  });
  return mountMultipleIslands(islandConfigs, options);
}
export {
  MicroBus2 as MicroBus,
  autoMountIslands,
  mountMultipleIslands,
  mountSingleIsland
};
