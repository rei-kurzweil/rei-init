import { j as n, A as e } from "./index-e-4ocWkl.js";
import { c as p } from "./index-iNHxb3RC.js";
function u({ container: t, props: r = {} }) {
  const o = p.createRoot(t);
  return o.render(/* @__PURE__ */ n.jsx(e, { ...r })), {
    unmount: () => o.unmount()
  };
}
export {
  e as MeowApp,
  u as mountMeowSPA
};
