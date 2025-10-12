// src/index.tsx
import "react";
import "@react-three/fiber";
import ShaderRasterizerMaterial from "@rei-init/material-shader-rasterizer";
import { BackSide } from "three";
import { jsx, jsxs } from "react/jsx-runtime";
var fragmentShader = (
  /* glsl */
  `
varying vec2 vUv;

void main() {
  float y = vUv.y;
  vec3 color;

  if (y > 0.75) {
    // Upper blue sky
    color = vec3(0.2, 0.4, 0.9);
  } else if (y > 0.55) {
    // Blend from blue to white near horizon
    float t = (y - 0.55) / (0.75 - 0.55);
    color = mix(vec3(0.95, 0.95, 1.0), vec3(0.2, 0.4, 0.9), t);
  } else if (y > 0.5) {
    // Fade from white to grey just below horizon
    float t = (y - 0.5) / (0.05);
    color = mix(vec3(0.35, 0.35, 0.35), vec3(0.95, 0.95, 1.0), t);
  } else {
    // Solid grey ground color
    color = vec3(0.35, 0.35, 0.35);
  }

  gl_FragColor = vec4(color, 1.0);
}
`
);
function MeshSphereSkybox() {
  return /* @__PURE__ */ jsxs("mesh", { scale: [100, 100, 100], children: [
    /* @__PURE__ */ jsx("sphereGeometry", { args: [1, 32, 32] }),
    /* @__PURE__ */ jsx(
      ShaderRasterizerMaterial,
      {
        fragmentShader,
        RT_RESOLUTION: 1024,
        SIDE: BackSide
      }
    )
  ] });
}
var index_default = MeshSphereSkybox;
export {
  MeshSphereSkybox,
  index_default as default
};
