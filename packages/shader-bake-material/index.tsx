import { useEffect, useState } from 'react';


import * as THREE from 'three';
import { ShaderMaterial } from 'three';

import { useThree } from '@react-three/fiber';

const quadGeometry = new THREE.PlaneGeometry(2, 2);
const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;


export function ShaderRasterizingTextureCacheMaterial(  
    {   fragmentShader,
        RT_RESOLUTION = 1024
    }: 
    { fragmentShader: string, RT_RESOLUTION?: number }
) {
            
    // Static shader material and geometry only made once
    const shaderMaterial = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide
    });

    const { gl, scene } = useThree();
    const [texture, setTexture] = useState<THREE.Texture>();

    useEffect(() => {
        const rt = new THREE.WebGLRenderTarget(RT_RESOLUTION, RT_RESOLUTION);

        const bakeScene = new THREE.Scene();

        const quad = new THREE.Mesh(quadGeometry, shaderMaterial);
        bakeScene.add(quad);

        const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        gl.setRenderTarget(rt);
        gl.render(bakeScene, orthoCamera);
        gl.setRenderTarget(null);

        setTexture(rt.texture);

        return () => {
            rt.dispose();
        };
    }, [gl, shaderMaterial]);


    if (!texture) return (
        <meshBasicMaterial color={0xffffff} />
    );

    return (
        <meshBasicMaterial
            map={texture}
            side={THREE.DoubleSide}
        />
    )


}
