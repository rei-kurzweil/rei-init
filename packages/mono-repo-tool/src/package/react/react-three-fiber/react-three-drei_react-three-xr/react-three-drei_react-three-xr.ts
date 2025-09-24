import { checkbox } from "@inquirer/prompts";
import { addPeerDeps } from "../../../util.peer-dep";
import { initReactThreeFiberLibrary } from "../react-three-fiber";
import { ReactThreeXRFeatureType } from "../react-three-xr/react-three-xr-feature-type";

export async function initReactThreeFiberReactThreeDreiReactThreeXRLibrary(targetDir: string, name: string) {
    await initReactThreeFiberLibrary(targetDir, name);

    addPeerDeps(['@react-three/drei', '@react-three/xr'],{
        targetDir
    });

    const options: { name: string, value: ReactThreeXRFeatureType }[] = [
        { name: 'VR Climbing Controls', value: ReactThreeXRFeatureType.REACT_THREE_XR_CLIMBING_CONTROLS },
    ]

    const answers = await checkbox({
        message: 'Select features to include:',
        choices: options,
    });

    // call init functions for selected features 
    // + (simplest case = copying files from templates)
}