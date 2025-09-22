import { execa } from 'execa'
import path from 'path'
import fs from 'fs-extra'
import { input, select } from '@inquirer/prompts'

import { findMonorepoRoot } from '../util'
import { initTSLibrary } from './util.ts'

import { init_DrizzleORM_D1_schema_and_migration_runner_package } from './migration-runner-package'
import { initPythonBlenderPluginPackage } from './blender'
import { initReactLibrary } from './react/react'
import { initReactThreeFiberLibrary }       from './react/react-three-fiber/react-three-fiber'
import { initReactThreeFiberDreiLibrary }   from './react/react-three-fiber/drei/drei'
import { initReactThreeFiberDreiXRLibrary } from './react/react-three-fiber/react-three-xr/react-three-xr'
import { PackageType } from '../app/app-type'



export async function initPackageProject(): Promise<string> {
    const mono_repo_root = await findMonorepoRoot();

    const name = await input({ message: 'Package name?' })
    const type: PackageType = await select({
        message: 'What type of package?',
        choices: [
            { name: 'TypeScript Library', value: 'ts-lib' },
            
            { name: 'TypeScript Library (react)', value: 'react-lib' },
            { name: 'TypeScript Library (react-three/fiber peer dep)', value: 'react-three/fiber-lib' },
            { name: 'TypeScript Library (react-three/drei peer dep)', value: 'react-three/drei-lib' },
            { name: 'TypeScript Library (react-three/drei + XR peer dep)', value: 'react-three/drei-and-xr-lib' },
            
            { name: 'Utility Package', value: 'util' },
            { name: 'Drizzle D1 Schema + Migration Runner CLI', value: 'database-schema-and-migration-runner-cli-drizzle-d1-package' },
            { name: 'Blender Python Plugin', value: 'python-blender-plugin' }, // added
        ]
    })

    const targetDir = path.join(mono_repo_root, 'packages', name)

    await createPackageByType(targetDir, name, type)

    console.log(`🎉 Package '${name}' created as ${type} in packages/`)
    return name;
}

export async function createPackageByType(targetDir: string, name: string, type: string) {
    await fs.ensureDir(targetDir)

    if (type === 'ts-lib') {
        await initTSLibrary(targetDir, name)

    } else if (type === 'react-lib') {
        // TODO: make sure that react is a peer dependency and not a dependency
        await initReactLibrary(targetDir, name);

    } else if (type === 'react-three/fiber-lib') {
        await initReactThreeFiberLibrary(targetDir, name);

    } else if (type === 'react-three/drei-lib') {
        await initReactThreeFiberDreiLibrary(targetDir, name);

    } else if (type === 'react-three/drei-and-xr-lib') {
        await initReactThreeFiberDreiXRLibrary(targetDir, name);

    } else if (type === 'database-schema-and-migration-runner-cli-drizzle-d1-package') {
        await init_DrizzleORM_D1_schema_and_migration_runner_package(targetDir, name);

    } else if (type === 'util') {
        await initUtilPackage(targetDir, name)

    } else if (type === 'python-blender-plugin') {
        await initPythonBlenderPluginPackage(targetDir, name)
    }
}


async function initUtilPackage(targetDir: string, name: string) {
    await initTSLibrary(targetDir, name)
    
    // Simple utility example
    const utilCode = `export const formatName = (name: string): string => {
  return name.trim().toLowerCase().replace(/\\s+/g, '-')
}

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
`
    
    await fs.writeFile(path.join(targetDir, 'src/index.ts'), utilCode)
}

