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
    try {
      const w = RT_RESOLUTION;
      const h = RT_RESOLUTION;
      const pixels = new Uint8Array(w * h * 4);
      gl.readRenderTargetPixels(rt, 0, 0, w, h, pixels);
      if (typeof document !== "undefined") {
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        const imageData = ctx.createImageData(w, h);
        const rowSize = w * 4;
        for (let y = 0; y < h; y++) {
          const src = (h - 1 - y) * rowSize;
          const dst = y * rowSize;
          imageData.data.set(pixels.subarray(src, src + rowSize), dst);
        }
        ctx.putImageData(imageData, 0, 0);
        let img = document.getElementById("shader-rasterizer-preview");
        if (!img) {
          img = document.createElement("img");
          img.id = "shader-rasterizer-preview";
          img.style.position = "fixed";
          img.style.right = "8px";
          img.style.bottom = "8px";
          img.style.width = "256px";
          img.style.height = "256px";
          img.style.zIndex = "9999";
          img.style.border = "1px solid #999";
          img.style.background = "#222";
          img.style.imageRendering = "pixelated";
          document.body.appendChild(img);
        }
        img.src = canvas.toDataURL("image/png");
      }
    } catch (err) {
      console.warn("ShaderRasterizerMaterial: failed to read/preview RT", err);
    }
    console.log("\u{1F9E8}\u{1F4A5} set texture", rt.texture);
    window.debug_rei_init = { texture: rt.texture, shaderMaterial };
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
