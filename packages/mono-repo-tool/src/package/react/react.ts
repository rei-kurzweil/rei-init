import { execa } from "execa";
import { initTSLibrary } from "../util.ts";
import path from "path";
import fs from "fs-extra";
import { addPeerDeps } from "../util.peer-dep.js";

const defaultLib = `
  export default const lib = () => {
    return (
      <></>
    )
}
`;

export async function initReactLibrary(targetDir: string, name: string, libComponent = '') {
    await initTSLibrary(targetDir, name)

    await addPeerDeps(
      ['react', '@types/react'], {
      targetDir
    });

    console.log("✅ added react peer deps");

    // Update tsconfig.json for JSX support
    const tsconfigPath = path.join(targetDir, 'tsconfig.json');
    if (await fs.pathExists(tsconfigPath)) {
        const tsconfig = await fs.readJSON(tsconfigPath);

        tsconfig.compilerOptions.jsx = 'react-jsx';
        
        await fs.writeJSON(tsconfigPath, tsconfig, { 
          spaces: 2 
        });
    }
    
    // Update the entry point
    await fs.writeFile(
        path.join(targetDir, 'src/index.ts'), libComponent || defaultLib);
}

