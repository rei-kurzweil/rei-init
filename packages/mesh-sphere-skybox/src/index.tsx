import 'react'
import '@react-three/fiber'
import { type JSX } from 'react'
import ShaderRasterizerMaterial from '@rei-init/material-shader-rasterizer'
import { DoubleSide } from 'three'

export interface MeshSphereSkyboxProps {
  color_1?: [number, number, number] // top sky
  color_2?: [number, number, number] // near-horizon blend color
  color_3?: [number, number, number] // ground color
}

export function MeshSphereSkybox({
  color_1 = [0.2, 0.4, 0.9],
  color_2 = [0.95, 0.95, 1.0],
  color_3 = [0.35, 0.35, 0.35],
}: MeshSphereSkyboxProps = {}): JSX.Element {
  const toVec3 = ([r, g, b]: [number, number, number]) => `vec3(${r}, ${g}, ${b})`
  const C1 = toVec3(color_1)
  const C2 = toVec3(color_2)
  const C3 = toVec3(color_3)

  // Build the fragment shader from props so changing colors re-bakes
  const fragmentShader = /* glsl */ `
varying vec2 vUv;

void main() {
  float y = vUv.y;
  vec3 color;

  if (y > 0.75) {
    // Upper blue sky
    color = ${C1};
  } else if (y > 0.55) {
    // Blend from blue to white near horizon
    float t = (y - 0.55) / (0.75 - 0.55);
    color = mix(${C2}, ${C1}, t);
  } else if (y > 0.5) {
    // Fade from white to grey just below horizon
    float t = (y - 0.5) / (0.05);
    color = mix(${C3}, ${C2}, t);
  } else {
    // Solid grey ground color
    color = ${C3};
  }

  gl_FragColor = vec4(color, 1.0);
}
`
  return (
    <mesh scale={[100, 100, 100]}>
      <sphereGeometry args={[1, 32, 32 ]} />
      <ShaderRasterizerMaterial
        fragmentShader={fragmentShader}
        RT_RESOLUTION={1024}
        SIDE={DoubleSide}
      />
    </mesh>
  )
}

export default MeshSphereSkybox
