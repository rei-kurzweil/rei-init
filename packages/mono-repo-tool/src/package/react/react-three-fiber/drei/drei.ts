import { initReactLibrary } from "../../react";
import { addPeerDeps } from "../../../util.peer-dep";

export async function initReactThreeFiberDreiLibrary(targetDir: string, name: string) {
    await initReactLibrary(targetDir, name);

    // Add react-three-fiber and drei dependencies
    addPeerDeps(
        ['@react-three/fiber', '@react-three/drei', 'three', '@types/three'],
        { targetDir }
    );
}