import { addPeerDeps } from "../../util.peer-dep";
import { initReactLibrary } from "../react";
import { R3FPackageFeatureType } from "./react-three-fiber-feature-type";

import { checkbox } from "@inquirer/prompts";


export async function initReactThreeFiberLibrary(targetDir: string, name: string) {
    await initReactLibrary(targetDir, name);

    // Add react-three-fiber dependencies
    addPeerDeps(['@react-three/fiber', 'three', '@types/three']);

    // promp to ask if user wants to add drop-in features from this repo's meta programming framework   

    const options: { name: string, value: R3FPackageFeatureType }[] = [
        // General
        { value: R3FPackageFeatureType.R3F_ECS,               name: 'Entity Component System' },
        { value: R3FPackageFeatureType.R3F_INPUT_ABSTRACTION, name: 'Input Abstraction' },
        { value: R3FPackageFeatureType.R3F_PROCEDURAL_MESH,   name: 'Procedural Mesh' },

        // Materials
        { value: R3FPackageFeatureType.R3F_MATERIAL_SHADER_RASTERIZER, name: 'Shader Rasterizer Material' },
        
        // Shaders
        { value: R3FPackageFeatureType.R3F_SHADER_SKYBOX,              name: 'Skybox Shader' },
    ];

    // multi select prompt
    const answers = await checkbox({
        message: 'Select features to include:',
        choices: options,
    });

    // call init functions for selected features 
    // + (simplest case = copying files from templates)

}