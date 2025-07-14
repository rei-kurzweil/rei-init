// File: rii-make/app/astro.init.ts

import { execa } from 'execa'
import path from 'path'
import fs from 'fs-extra'

export async function initAstro(targetDir: string) {
    console.log(`✨ Creating Astro project at ${targetDir}`)

    // Use Astro CLI to scaffold
    await execa('pnpm', ['create', 'astro@latest', targetDir, '--', '--template', 'minimal'], {
        stdio: 'inherit'
    })

    // Install React + MDX support
    await execa('pnpm', ['add', '-D', '@astrojs/react', '@astrojs/mdx'], { cwd: targetDir })

    const configPath = path.join(targetDir, 'astro.config.mjs')
    let configText = await fs.readFile(configPath, 'utf-8')

    // Naively insert integrations
    configText = configText.replace(
        'defineConfig({',
        `defineConfig({
  integrations: [
    react(),
    mdx()
  ],`
    )

    await fs.writeFile(configPath, configText)

    // Inject import statements at the top if needed
    configText = `import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
` + configText
    await fs.writeFile(configPath, configText)

    console.log('✅ Astro initialized with React + MDX support!')
}
