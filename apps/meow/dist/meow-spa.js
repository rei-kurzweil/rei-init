import { j as e, A as n } from "./App--dca94Om.js";
import { M as A } from "./App--dca94Om.js";
import { createRoot as p } from "react-dom/client";
function u({ container: t, props: r = {} }) {
  const o = p(t);
  return o.render(/* @__PURE__ */ e.jsx(n, { ...r })), {
    unmount: () => o.unmount()
  };
}
export {
  n as MeowApp,
  A as MeowAppIslandType,
  u as mountMeowSPA
};
