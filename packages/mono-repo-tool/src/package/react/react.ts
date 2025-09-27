import { execa } from "execa";
import { initTSLibrary } from "../util.ts";
import path from "path";
import fs from "fs-extra";
import { addPeerDeps } from "../util.peer-dep.js";
import _reactLibBaseTemplate from "./react-✜/_react-lib-base-template.js";

const defaultLib = `
  export default function lib() {
  
    return (
      <></>
    )
}
`;

export async function initReactLibrary(
  targetDir: string, name: string, 
  libComponent = ''
) {

    await initTSLibrary(targetDir, name);

    const base_library_code = libComponent || _reactLibBaseTemplate(name);

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
        path.join(targetDir, 'src/index.ts'), base_library_code);
}

