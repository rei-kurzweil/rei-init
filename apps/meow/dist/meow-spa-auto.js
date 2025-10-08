import { createRoot as m } from "react-dom/client";
import { createElement as f } from "react";
import { A as d } from "./App-D5IYhDvv.js";
/* empty css               */
function l(n) {
  const { appPrefix: o, component: i, cssImport: a } = n;
  return function() {
    const s = `[data-app-${o}]:not([data-app-${o}-mounted])`, e = document.querySelector(s);
    if (!e || !(e instanceof HTMLElement))
      return;
    e.setAttribute(`data-app-${o}-mounted`, "true");
    const p = {};
    Object.keys(e.dataset).forEach((r) => {
      if (r.startsWith(o)) {
        const c = r.replace(new RegExp(`^${o}`), "").replace(
          /([A-Z])/g,
          (b, u) => u.toLowerCase()
        );
        let t = e.dataset[r];
        t === "true" ? t = !0 : t === "false" ? t = !1 : t && !isNaN(Number(t)) && (t = Number(t)), c && (p[c] = t);
      }
    }), a && a(), e.innerHTML = "", m(e).render(f(i, p));
  };
}
function A(n) {
  n(), document.readyState === "loading" && document.addEventListener("DOMContentLoaded", n);
}
const M = l({
  appPrefix: "meow",
  component: d
});
A(M);
