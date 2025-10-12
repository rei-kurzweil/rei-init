import { useEffect, useMemo, useState } from 'react'
import 'react'
import '@react-three/fiber'
import type { JSX } from 'react'
import * as THREE from 'three'

import { ShaderMaterial } from 'three'
import { useThree } from '@react-three/fiber'

//Shared full-screen quad geometry (2x2 plane in clip space)
const quadGeometry = new THREE.PlaneGeometry(2, 2)

const vertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`

export type ShaderRasterizerMaterialProps = {
  fragmentShader: string;
  RT_RESOLUTION?: number;
  SIDE?: THREE.Side;
}

/**
 * React Three Fiber material component that rasterizes a provided fragment shader to a texture
 * using an offscreen render target, then returns a MeshBasicMaterial using the baked texture.
 *
 * Usage:
 * <mesh>
 *   <ShaderRasterizerMaterial fragmentShader={myFrag} RT_RESOLUTION={1024} />
 * </mesh>
 */
export function ShaderRasterizerMaterial({
  fragmentShader,
  RT_RESOLUTION = 1024,
  SIDE = THREE.DoubleSide,
}: ShaderRasterizerMaterialProps): JSX.Element {
  // Create/refresh the shader material when fragmentShader changes
  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: SIDE,
    })
  }, [fragmentShader, SIDE])

  // Dispose the shader material when it gets replaced or on unmount
  useEffect(() => {
    return () => shaderMaterial.dispose()
  }, [shaderMaterial])

  const { gl } = useThree();
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    // Create an offscreen render target and bake the shader output to its texture
    const rt = new THREE.WebGLRenderTarget(RT_RESOLUTION, RT_RESOLUTION)

    const bakeScene = new THREE.Scene()
    const quad = new THREE.Mesh(quadGeometry, shaderMaterial)
    bakeScene.add(quad);

    const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    gl.setRenderTarget(rt)
    gl.render(bakeScene, orthoCamera)
     // Flag the texture for update and publish to state
    setTexture(rt.texture);
    gl.setRenderTarget(null); // Reset to render to canvas

    
    return () => {
      rt.dispose()
    }
  }, [gl, shaderMaterial, RT_RESOLUTION])

  if (!texture) return <meshBasicMaterial key="placeholder" color={0x0000ff} side={SIDE} />

  return <meshBasicMaterial key="baked" map={texture} side={SIDE} />
}

export default ShaderRasterizerMaterial
