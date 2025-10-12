import { JSX } from 'react';
import * as THREE from 'three';

type ShaderRasterizerMaterialProps = {
    fragmentShader: string;
    RT_RESOLUTION?: number;
    SIDE?: THREE.Side;
};
/**
 * React Three Fiber material component that rasterizes a provided fragment shader to a texture
 * using an offscreen render target, then returns a MeshBasicMaterial using the baked texture.
 *
 * Usage:
 * <mesh>
 *   <ShaderRasterizerMaterial fragmentShader={myFrag} RT_RESOLUTION={1024} />
 * </mesh>
 */
declare function ShaderRasterizerMaterial({ fragmentShader, RT_RESOLUTION, SIDE, }: ShaderRasterizerMaterialProps): JSX.Element;

export { ShaderRasterizerMaterial, type ShaderRasterizerMaterialProps, ShaderRasterizerMaterial as default };
