import { addPeerDeps } from "../../../util.peer-dep";
import { initReactThreeFiberLibrary } from "../react-three-fiber";
import { checkbox } from "@inquirer/prompts"
import { ReactThreeXRFeatureType } from "./react-three-xr-feature-type";
export async function initReactThreeFiberReactThreeXRLibrary(targetDir: string, name: string) {
    await initReactThreeFiberLibrary(targetDir, name);

    await addPeerDeps(['@react-three/xr'],{
        targetDir
    });

    console.info

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