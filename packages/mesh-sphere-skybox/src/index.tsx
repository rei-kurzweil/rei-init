import 'react'
import '@react-three/fiber'
import { type JSX } from 'react'
import ShaderRasterizerMaterial from '@rei-init/material-shader-rasterizer'
import { DoubleSide } from 'three'

//Simple fragment shader for the skybox
const fragmentShader = /* glsl */ `
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

export function MeshSphereSkybox(): JSX.Element {
  
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
