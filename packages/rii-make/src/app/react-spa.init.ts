// File: rii-make/app/react-spa.init.ts

import { execa } from 'execa'
import path from 'path'
import fs from 'fs-extra'
import prompts from 'prompts'
import { $ } from 'execa'

export async function initReactSPA(targetDir: string, presetType?: string) {
    console.log(`✨ Creating React SPA at ${targetDir}`)

    let r3f = 'none';
    let ui = 'none';
    let jbmono = false;

    // If preset type is provided, use it; otherwise prompt user
    if (presetType) {
        if (presetType === 'react-spa-r3f') {
            r3f = 'standard'; // drei included
        } else if (presetType === 'react-spa-r3f-xr') {
            r3f = 'xr'; // drei + xr included
        }
        // Default ui and jbmono for presets
        ui = 'none';
        jbmono = false;
    } else {
        const responses = await prompts([
            { 
                type: 'select', 
                name: 'r3f', 
                message: 'Three.js setup?',
                choices: [
                    { title: 'None', value: 'none' },
                    { title: 'Basic (three.js + r3f)', value: 'basic' },
                    { title: 'Standard (+ drei)', value: 'standard' },
                    { title: 'Full (+ drei + xr)', value: 'xr' }
                ]
            },
            {
                type: 'select',
                name: 'ui',
                message: 'UI library?',
                choices: [
                    { title: 'None', value: 'none' },
                    { title: 'tailwind', value: 'tailwind' },
                    { title: 'chadcn', value: 'chadcn' },
                    { title: 'material-ui', value: 'mui' }
                ]
            },
            { type: 'confirm', name: 'jbmono', message: 'Include JetBrains Mono font?', initial: false }
        ]);
        
        r3f = responses.r3f || 'none';
        ui = responses.ui || 'none';
        jbmono = responses.jbmono || false;
    }

    // Ensure the target directory exists and is absolute
    const absoluteTargetDir = path.resolve(targetDir)
    await fs.ensureDir(absoluteTargetDir)

    // Create Vite project with relative path from current working directory
    const relativePath = path.relative(process.cwd(), absoluteTargetDir)
    await execa('pnpm', ['create', 'vite', relativePath, '--template', 'react-ts'], { stdio: 'inherit' })
    
    // All subsequent operations use absolute path
    await execa('pnpm', ['install'], { cwd: absoluteTargetDir, stdio: 'inherit' })

    // Add Three.js dependencies based on selection
    if (r3f === 'basic') {
        await execa('pnpm', ['add', 'three', '@react-three/fiber'], { cwd: absoluteTargetDir })
        await execa('pnpm', ['add', '-D', '@types/three'], { cwd: absoluteTargetDir })
    } else if (r3f === 'standard') {
        await execa('pnpm', ['add', 'three', '@react-three/fiber', '@react-three/drei'], { cwd: absoluteTargetDir })
        await execa('pnpm', ['add', '-D', '@types/three'], { cwd: absoluteTargetDir })
    } else if (r3f === 'xr') {
        await execa('pnpm', ['add', 'three', '@react-three/fiber', '@react-three/drei', '@react-three/xr'], { cwd: absoluteTargetDir })
        await execa('pnpm', ['add', '-D', '@types/three'], { cwd: absoluteTargetDir })
    }

    if (ui === 'tailwind') {
        await execa('pnpm', ['add', '-D', 'tailwindcss', 'postcss', 'autoprefixer'], { cwd: absoluteTargetDir })
        await execa('npx', ['tailwindcss', 'init', '-p'], { cwd: absoluteTargetDir })

        const indexCss = path.join(absoluteTargetDir, 'src/index.css')
        await fs.outputFile(indexCss, `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`)
    }

    if (jbmono) {
        const publicDir = path.join(absoluteTargetDir, 'public', 'fonts')
        await fs.mkdirp(publicDir)

        const fontUrl = 'https://raw.githubusercontent.com/JetBrains/JetBrainsMono/refs/heads/master/fonts/webfonts/JetBrainsMono-Light.woff2'
        const fontPath = path.join(publicDir, 'JetBrainsMono-Light.woff2')

        console.log(`↓ Downloading JetBrains Mono Light font...`)
        await $`curl -L ${fontUrl} -o ${fontPath}`

        const indexCssPath = path.join(absoluteTargetDir, 'src/index.css')
        await fs.appendFile(indexCssPath, `
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
body {
  font-family: 'JetBrains Mono', monospace;
}
`)
    }
    // print configuration 
    console.log("Configuration:");
    console.log(`- React SPA created at ${absoluteTargetDir}`)
    console.log(`- Three.js: ${r3f === 'none' 
            ? 'None' 
            : r3f === 'basic' 
                ? 'Basic (three.js + r3f)' 
                : r3f === 'standard' 
                    ? 'Standard (+ drei)' 
                    : 'Full (+ drei + xr)'}`);

    console.log(`✅ rii-make built package at ${absoluteTargetDir}`)

}
