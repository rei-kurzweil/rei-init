// File: rii-make/app/astro.init.ts

import { execa } from 'execa'
import path from 'path'
import fs from 'fs-extra'

export async function initAstro(targetDir: string, withWrangler: boolean = false) {
    console.log(`✨ Creating Astro project at ${targetDir}`)

    if (withWrangler) {
        // pnpm create cloudflare@latest my-astro-app --framework=astro
        await execa('pnpm', ['create', 'cloudflare@latest', targetDir, '--framework=astro'], {
            stdio: 'inherit'
        })

    } else {

        // Use react template
        await execa('pnpm', ['create', 'astro@latest', targetDir, '--', '--template', 'with-react'], { stdio: 'inherit' })
    }

    // Install React + MDX support
    await execa('pnpm', ['add', '-D', '@astrojs/react', '@astrojs/mdx'], { cwd: targetDir })

    const configPath = path.join(targetDir, 'astro.config.mjs')
    let configText = await fs.readFile(configPath, 'utf-8')

    if (!withWrangler) {
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
    } else {
        // For Wrangler setups, enhance the existing config
        if (!configText.includes('@astrojs/react')) {
            configText = configText.replace(
                'import { defineConfig } from \'astro/config\';',
                `import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';`
            )
            
            // Add React and MDX to integrations array
            configText = configText.replace(
                /integrations:\s*\[([^\]]*)\]/,
                'integrations: [$1, react(), mdx()]'
            )
        }
    }

    await fs.writeFile(configPath, configText)

    console.log(`✅ Astro initialized with React + MDX support${withWrangler ? ' + Wrangler/Cloudflare' : ''}!`)
}
