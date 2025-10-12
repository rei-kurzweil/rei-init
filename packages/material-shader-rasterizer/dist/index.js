// src/index.tsx
import { useEffect, useMemo, useState } from "react";
import "react";
import "@react-three/fiber";
import * as THREE from "three";
import { ShaderMaterial } from "three";
import { useThree } from "@react-three/fiber";
import { jsx } from "react/jsx-runtime";
var quadGeometry = new THREE.PlaneGeometry(2, 2);
var vertexShader = (
  /* glsl */
  `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`
);
function ShaderRasterizerMaterial({
  fragmentShader,
  RT_RESOLUTION = 1024,
  SIDE = THREE.DoubleSide
}) {
  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: SIDE
    });
  }, [fragmentShader, SIDE]);
  useEffect(() => {
    return () => shaderMaterial.dispose();
  }, [shaderMaterial]);
  const { gl } = useThree();
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    const rt = new THREE.WebGLRenderTarget(RT_RESOLUTION, RT_RESOLUTION);
    const bakeScene = new THREE.Scene();
    const quad = new THREE.Mesh(quadGeometry, shaderMaterial);
    bakeScene.add(quad);
    const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    gl.setRenderTarget(rt);
    gl.render(bakeScene, orthoCamera);
    setTexture(rt.texture);
    gl.setRenderTarget(null);
    return () => {
      rt.dispose();
    };
  }, [gl, shaderMaterial, RT_RESOLUTION]);
  if (!texture) return /* @__PURE__ */ jsx("meshBasicMaterial", { color: 255, side: SIDE }, "placeholder");
  return /* @__PURE__ */ jsx("meshBasicMaterial", { map: texture, side: SIDE }, "baked");
}
var index_default = ShaderRasterizerMaterial;
export {
  ShaderRasterizerMaterial,
  index_default as default
};
