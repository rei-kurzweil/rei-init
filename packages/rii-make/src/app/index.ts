// File: rii-make/src/app/index.ts

import path from 'path'
import { input, select } from '@inquirer/prompts'
import { initAstro } from './astro.init.js'
import { initHonoWrangler } from './hono-wrangler.init.js'
import { findMonorepoRoot } from '../util.js'
import fs from 'fs-extra'

export async function initAppProject(): Promise<string> {
    const root = await findMonorepoRoot()

    const name = await input({ 
        message: 'App name (e.g., api.example.com, dashboard.mysite.net)?',
        validate: (input) => {
            if (!input.trim()) return 'App name is required'
            if (!input.includes('.')) return 'App names should follow subdomain.domain.ext format'
            return true
        }
    })

    const preset = await select({
        message: 'Which type of app framework?',
        choices: [
            { name: 'Astro + Wrangler (full-stack)', value: 'astro-wrangler' },
            { name: 'Hono + Wrangler (API only)', value: 'api' }
        ]
    })

    // Apps always go in apps/ and have app/ + packages/ structure
    const appDir      = path.join(root,   'apps',     name)
    const packagesDir = path.join(appDir, 'packages')

    // Create the directory structure
    await fs.ensureDir(appDir)
    await fs.ensureDir(packagesDir)

    // Create a README for the app
    const readmeContent = `# ${name}

This is the ${name} application.

## Structure

- \`app/\` - Main application (${preset})
- \`packages/\` - Sub-packages for this app

## Development

See the main app in the \`app/\` directory for development instructions.
`
    await fs.writeFile(path.join(appDir, 'README.md'), readmeContent)

    // Create the main app in the app/ subdirectory
    if (preset === 'astro-wrangler') {
        await initAstro(appDir, true) // Pass true for wrangler integration
    } else if (preset === 'api') {
        await initHonoWrangler(appDir)
    }

    console.log(`🎉 App '${name}' created with structure:`)
    console.log(`   ${appDir}/`)
    console.log(`   ├── app/ (${preset})`)
    console.log(`   ├── packages/ (for sub-packages)`)
    console.log(`   └── README.md`)

    return name;
}
