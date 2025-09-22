import fs from 'fs-extra';
import path from 'path';

// react components, cli, general ts packages, all can use this as a starting point:
export async function initTSLibrary(targetDir: string, name: string, tsup = true) {
    await fs.ensureDir(targetDir)
    
    const pkg = {
        name: `@rei-init/${name}`,
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
    
    if (tsup){
        const tsupConfig =  `import { defineConfig } from 'tsup'` +

                            `export default defineConfig({`+
                                `entry: ['src/index.ts'],`+
                                `format: ['esm'],`        +
                                `dts: true,`              +
                                `clean: true,`            +
                            `})`

    
        await fs.writeFile(path.join(targetDir, 'tsup.config.ts'), tsupConfig)
    }

    await fs.ensureDir(path.join(targetDir, 'src'))
    await fs.writeFile(path.join(targetDir, 'src/index.ts'), `export const hello = () => 'Hello from ${name}!'\n`)
}
