import { execa } from 'execa'
import path from 'path'
import fs from 'fs-extra'
import { input, select } from '@inquirer/prompts'

import { findMonorepoRoot } from '../util'
import { initTSLibrary } from './util'

import { initReactSPA } from '../app/react-spa.init'
import { init_DrizzleORM_D1_schema_and_migration_runner_package } from './migration-runner-package'
import { initPythonBlenderPluginPackage } from './blender'
import { initReactLibrary } from './react'


export async function initPackageProject(): Promise<string> {
    const mono_repo_root = await findMonorepoRoot();

    const name = await input({ message: 'Package name?' })
    const type = await select({
        message: 'What type of package?',
        choices: [
            { name: 'TypeScript Library (publishable)', value: 'ts-lib' },
            { name: 'React Component Library', value: 'react-lib' },
            { name: 'React SPA with Three.js + XR', value: 'react-spa-r3f-xr' },
            { name: 'Utility Package', value: 'util' },
            { name: 'Drizzle D1 Schema + Migration Runner CLI', value: 'database-schema-and-migration-runner-cli-drizzle-d1-package' },
            { name: 'Blender Python Plugin', value: 'python-blender-plugin' }, // added
        ]
    })

    const targetDir = path.join(mono_repo_root, 'packages', name)

    await createPackageByType(targetDir, name, type, false)

    console.log(`🎉 Package '${name}' created as ${type} in packages/`)
    return name;
}

export async function createPackageByType(targetDir: string, name: string, type: string, isSubPackage: boolean) {
    await fs.ensureDir(targetDir)

    // Update package.json for sub-packages vs demo apps
    const pkgPath = path.join(targetDir, 'package.json')
    if (await fs.pathExists(pkgPath)) {
        const pkg = await fs.readJSON(pkgPath)
            
        pkg.name = `@rii-init/${name}`

        await fs.writeJSON(pkgPath, pkg, { spaces: 2 })
    }

    if (type === 'react-spa' || type === 'react-spa-r3f' || type === 'react-spa-r3f-xr') {
        await initReactSPA(targetDir, type)
        
    } else if (type === 'ts-lib') {
        await initTSLibrary(targetDir, name)
    } else if (type === 'react-lib') {
        // TODO: make sure that react is a peer dependency and not a dependency
        await initReactLibrary(targetDir, name)

    } else if (type === 'react-three/fiber-lib') {
        // TODO: implement react-three/fiber-lib initialization

    } else if (type === 'react-three/drei-lib') {
        // TODO: implement react-three/drei-lib initialization

    } else if (type === 'react-three/drei-and-xr-lib') {
        // TODO: implement react-three/drei-and-xr-lib initialization
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

