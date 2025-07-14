// File: rii-make/app/react-spa.init.ts

import { execa } from 'execa'
import path from 'path'
import fs from 'fs-extra'
import prompts from 'prompts'
import { $ } from 'execa'

export async function initReactSPA(targetDir: string) {
    console.log(`✨ Creating React SPA at ${targetDir}`)

    const { r3f, ui, jbmono } = await prompts([
        { type: 'confirm', name: 'r3f', message: 'Add three.js, r3f, drei?', initial: false },
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
    ])

    await execa('pnpm', ['create', 'vite', targetDir, '--template', 'react-ts'], { stdio: 'inherit' })
    await execa('pnpm', ['install'], { cwd: targetDir, stdio: 'inherit' })

    if (r3f) {
        await execa('pnpm', ['add', 'three', '@react-three/fiber', '@react-three/drei'], { cwd: targetDir })
    }

    if (ui === 'tailwind') {
        await execa('pnpm', ['add', '-D', 'tailwindcss', 'postcss', 'autoprefixer'], { cwd: targetDir })
        await execa('npx', ['tailwindcss', 'init', '-p'], { cwd: targetDir })

        const indexCss = path.join(targetDir, 'src/index.css')
        await fs.outputFile(indexCss, `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`)
    }

    if (jbmono) {
        const publicDir = path.join(targetDir, 'public', 'fonts')
        await fs.mkdirp(publicDir)

        const fontUrl = 'https://raw.githubusercontent.com/JetBrains/JetBrainsMono/refs/heads/master/fonts/webfonts/JetBrainsMono-Light.woff2'
        const fontPath = path.join(publicDir, 'JetBrainsMono-Light.woff2')

        console.log(`↓ Downloading JetBrains Mono Light font...`)
        await $`curl -L ${fontUrl} -o ${fontPath}`

        const indexCssPath = path.join(targetDir, 'src/index.css')
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

    console.log(`✅ React SPA created at ${targetDir}`)
    console.log(`ℹ️ To integrate this with Astro:`)
    console.log(` - Import components into .astro files and use ❯ <App client:load />`)
    console.log(` - Or serve the entire app from an iframe at /spa/ using Astro public/ config or a route`)
}
