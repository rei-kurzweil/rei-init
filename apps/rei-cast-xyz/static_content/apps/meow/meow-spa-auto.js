import { j as d, A as m } from "./index-D-bzHE4H.js";
import { c as l } from "./index-lMoJ8T2b.js";
function f(o, u) {
  return function() {
    const c = `[data-app-${o}]:not([data-app-${o}-mounted])`, e = document.querySelector(c);
    if (!e || !(e instanceof HTMLElement))
      return;
    e.setAttribute(`data-app-${o}-mounted`, "true");
    const a = {};
    Object.keys(e.dataset).forEach((n) => {
      if (n.startsWith(o)) {
        const r = n.replace(new RegExp(`^${o}`), "").replace(
          /([A-Z])/g,
          (M, i) => i.toLowerCase()
        );
        let t = e.dataset[n];
        t === "true" ? t = !0 : t === "false" ? t = !1 : t && !isNaN(Number(t)) && (t = Number(t)), r && (a[r] = t);
      }
    }), e.innerHTML = "", l.createRoot(e).render(/* @__PURE__ */ d.jsx(u, { ...a }));
  };
}
const s = f("meow", m);
s();
document.readyState === "loading" && document.addEventListener("DOMContentLoaded", s);
