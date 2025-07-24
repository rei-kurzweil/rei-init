import { input, select } from '@inquirer/prompts'
import { findMonorepoRoot } from '../util.js'
import { initReactSPA } from '../app/react-spa.init.js'
import { execa } from 'execa'
import path from 'path'
import fs from 'fs-extra'

export async function initPackageProject(): Promise<string> {
    const root = await findMonorepoRoot()

    const name = await input({ message: 'Package name?' })

    const type = await select({
        message: 'What type of package?',
        choices: [
            { name: 'TypeScript Library (publishable)', value: 'ts-lib' },
            { name: 'React Component Library', value: 'react-lib' },
            { name: 'React SPA with Three.js + XR', value: 'react-spa-r3f-xr' },
            { name: 'Utility Package', value: 'util' }
        ]
    })

    const targetDir = path.join(root, 'packages', name)

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
        await initReactLibrary(targetDir, name)
    } else if (type === 'util') {
        await initUtilPackage(targetDir, name)
    }
}

async function initTSLibrary(targetDir: string, name: string) {
    await fs.ensureDir(targetDir)
    
    const pkg = {
        name: `@workspace/${name}`,
        version: '0.0.1',
        private: true,
        type: 'module',
        main: './dist/index.js',
        types: './dist/index.d.ts',
        scripts: {
            build: 'tsup',
            dev: 'tsup --watch'
        },
        devDependencies: {
            tsup: '^8.0.0',
            typescript: '^5.0.0'
        }
    }
    
    await fs.writeJSON(path.join(targetDir, 'package.json'), pkg, { spaces: 2 })
    
    const tsconfig = {
        compilerOptions: {
            target: 'ES2022',
            module: 'ESNext',
            moduleResolution: 'Bundler',
            declaration: true,
            outDir: './dist',
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true
        },
        include: ['src/**/*'],
        exclude: ['dist', 'node_modules']
    }
    
    await fs.writeJSON(path.join(targetDir, 'tsconfig.json'), tsconfig, { spaces: 2 })
    
    const tsupConfig = `import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
})
`
    
    await fs.writeFile(path.join(targetDir, 'tsup.config.ts'), tsupConfig)
    await fs.ensureDir(path.join(targetDir, 'src'))
    await fs.writeFile(path.join(targetDir, 'src/index.ts'), `export const hello = () => 'Hello from ${name}!'\n`)
}

async function initReactLibrary(targetDir: string, name: string) {
    await initTSLibrary(targetDir, name)
    
    // Add React dependencies
    await execa('pnpm', ['add', 'react', '@types/react'], { cwd: targetDir })
    
    // Update the entry point
    await fs.writeFile(path.join(targetDir, 'src/index.ts'), `export { default as Example } from './Example'
`)
    
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