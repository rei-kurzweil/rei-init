import { JSX } from 'react';

interface MeshSphereSkyboxProps {
    color_1?: [number, number, number];
    color_2?: [number, number, number];
    color_3?: [number, number, number];
}
declare function MeshSphereSkybox({ color_1, color_2, color_3, }?: MeshSphereSkyboxProps): JSX.Element;

export { MeshSphereSkybox, type MeshSphereSkyboxProps, MeshSphereSkybox as default };
