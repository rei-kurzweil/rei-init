import { c as f } from "./index-BruNbWZd.js";
import { r as d, A as m } from "./index-DN_kNaVd.js";
function l(n) {
  const { appPrefix: o, component: p, cssImport: a } = n;
  return function() {
    const u = `[data-app-${o}]:not([data-app-${o}-mounted])`, e = document.querySelector(u);
    if (!e || !(e instanceof HTMLElement))
      return;
    e.setAttribute(`data-app-${o}-mounted`, "true");
    const c = {};
    Object.keys(e.dataset).forEach((r) => {
      if (r.startsWith(o)) {
        const s = r.replace(new RegExp(`^${o}`), "").replace(
          /([A-Z])/g,
          (L, i) => i.toLowerCase()
        );
        let t = e.dataset[r];
        t === "true" ? t = !0 : t === "false" ? t = !1 : t && !isNaN(Number(t)) && (t = Number(t)), s && (c[s] = t);
      }
    }), a && a(), e.innerHTML = "", f.createRoot(e).render(d.createElement(p, c));
  };
}
function A(n) {
  n(), document.readyState === "loading" && document.addEventListener("DOMContentLoaded", n);
}
const E = l({
  appPrefix: "cats",
  component: m
});
A(E);
