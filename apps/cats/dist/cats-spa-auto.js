import { createRoot as f } from "react-dom/client";
import { createElement as m } from "react";
import { A as d } from "./App-DsNyILJk.js";
/* empty css               */
function l(n) {
  const { appPrefix: o, component: s, cssImport: a } = n;
  return function() {
    const i = `[data-app-${o}]:not([data-app-${o}-mounted])`, e = document.querySelector(i);
    if (!e || !(e instanceof HTMLElement))
      return;
    e.setAttribute(`data-app-${o}-mounted`, "true");
    const c = {};
    Object.keys(e.dataset).forEach((r) => {
      if (r.startsWith(o)) {
        const p = r.replace(new RegExp(`^${o}`), "").replace(
          /([A-Z])/g,
          (b, u) => u.toLowerCase()
        );
        let t = e.dataset[r];
        t === "true" ? t = !0 : t === "false" ? t = !1 : t && !isNaN(Number(t)) && (t = Number(t)), p && (c[p] = t);
      }
    }), a && a(), e.innerHTML = "", f(e).render(m(s, c));
  };
}
function A(n) {
  n(), document.readyState === "loading" && document.addEventListener("DOMContentLoaded", n);
}
const M = l({
  appPrefix: "cats",
  component: d
});
A(M);
