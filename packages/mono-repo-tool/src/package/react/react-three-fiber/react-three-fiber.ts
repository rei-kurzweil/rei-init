import { addPeerDeps } from "../../util.peer-dep";
import { initReactLibrary } from "../react";



export async function initReactThreeFiberLibrary(targetDir: string, name: string) {
    await initReactLibrary(targetDir, name);

    // Add react-three-fiber dependencies
    addPeerDeps(['@react-three/fiber', 'three', '@types/three']);

    // promp to ask if user wants to add drop-in features from this repo's meta programming framework   

    const options = [
        {name: 'Entity Component System', value: 'r3f-entity-component-system'},
        {name: 'User Input Abstraction', value: 'r3f-input-abstraction'},
        {name: 'Procedural Mesh Generation', value: 'r3f-procedural-mesh'}
    ];


}
