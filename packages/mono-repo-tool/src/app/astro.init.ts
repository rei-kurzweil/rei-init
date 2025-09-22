// File: rii-make/app/astro.init.ts

import { execa } from 'execa'
import path from 'path'
import fs from 'fs-extra'

export async function initAstro(targetDir: string, withWrangler: boolean = false) {
    // test to make sure the target directory is valid
    const isValidDir = /^[a-z0-9-]+$/.test(path.basename(targetDir))
    if (!isValidDir) {
        // renaming target to have only valid characters on last element
        const newName = path.basename(targetDir).replace(/[^a-z0-9-]/g, '-');
        const newTargetDir = path.join(path.dirname(targetDir), newName);

        console.log(`⚠️  Renaming target directory to valid name (from: ${targetDir} to: ${newTargetDir})`);

        targetDir = newTargetDir;
    }

    console.log(`✨ Creating Astro project at ${targetDir}`)

    if (withWrangler) {
        console.log("initAstro(...){ (withWrangler) {.. 🎯 targetDir", targetDir);
        // pnpm create cloudflare@latest my-astro-app --framework=astro
        await execa('pnpm', ['create', 'cloudflare@latest', targetDir, '--framework=astro'], {
            stdio: 'inherit'
        })

        // Also install react and mdx in the app directory
        await execa('pnpm', ['add', '-D', '@astrojs/react', '@astrojs/mdx'], { cwd: targetDir });


    } else {

        // Use react template
        await execa('pnpm', ['create', 'astro@latest', targetDir, '--', '--template', 'with-react'], { stdio: 'inherit' })

        // Install React + MDX support
        await execa('pnpm', ['add', '-D', '@astrojs/react', '@astrojs/mdx'], { cwd: targetDir })

        const configPath = path.join(targetDir, 'astro.config.mjs')
        let configText = await fs.readFile(configPath, 'utf-8')

        // For non-wrangler setups, just add React + MDX
        configText = configText.replace(
            'defineConfig({',
            `defineConfig({
  integrations: [
    react(),
    mdx()
  ],`
        )

        // Inject import statements at the top
        configText = `import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
` + configText

        await fs.writeFile(configPath, configText)
    }


    console.log(`✅ Astro initialized with React + MDX support${withWrangler ? ' + Wrangler/Cloudflare' : ''}!`)
}
