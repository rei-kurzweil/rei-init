// File: rei-make/src/app/index.ts

import path from 'path'
import { input, select, Separator } from '@inquirer/prompts'
import { initAstro } from './astro.init.js'
import { initHonoWrangler } from './hono-wrangler.init.js'
import { findMonorepoRoot } from '../util.js'
import { AppType } from './app-type.js'


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
            { name: 'Astro + Wrangler (full-stack)', value: AppType.AstroWrangler },
            { name: 'Hono + Wrangler (API only)',    value: AppType.HonoWrangler },
            new Separator(),
            { name: 'React SPA', value: AppType.ReactSPA },
            { name: 'react-three/fiber SPA', value: AppType.ReactSPAR3F   },
            { name: 'react-three/fiber /xr', value: AppType.ReactSPAR3FXR }
        ]
    })

    const appDir = path.join(root, 'apps', name);
        
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
