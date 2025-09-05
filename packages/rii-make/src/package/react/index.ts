import { execa } from "execa";
import { initTSLibrary } from "../util";
import path from "path";
import fs from "fs-extra";

export async function initReactLibrary(targetDir: string, name: string) {
    await initTSLibrary(targetDir, name)
    
    // Add React dependencies
    await execa('pnpm', ['add', 'react', '@types/react'], { cwd: targetDir })

    // Update tsconfig.json for JSX support
    const tsconfigPath = path.join(targetDir, 'tsconfig.json');
    if (await fs.pathExists(tsconfigPath)) {
        const tsconfig = await fs.readJSON(tsconfigPath);
        tsconfig.compilerOptions.jsx = 'react-jsx';
        await fs.writeJSON(tsconfigPath, tsconfig, { spaces: 2 });
    }
    
    // Update the entry point
    await fs.writeFile(
        path.join(targetDir, 'src/index.ts'), `export { default as Example } from './Example'`);

    
    const component = `import React from 'react'

interface ExampleProps {
  message?: string
}

const Example: React.FC<ExampleProps> = ({ message = 'Hello from ${name}!' }) => {
  return <div>{message}</div>
}

export default Example
`
    
    await fs.writeFile(path.join(targetDir, 'src/Example.tsx'), component)
}