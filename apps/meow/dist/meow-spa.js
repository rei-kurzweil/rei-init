import { j as p, A as e } from "./App-D5IYhDvv.js";
import { M as A } from "./App-D5IYhDvv.js";
import { createRoot as n } from "react-dom/client";
/* empty css               */
function a({ container: t, props: r = {} }) {
  const o = n(t);
  return o.render(/* @__PURE__ */ p.jsx(e, { ...r })), {
    unmount: () => o.unmount()
  };
}
export {
  e as MeowApp,
  A as MeowAppIslandType,
  a as mountMeowSPA
};
