// File: rii-make/app/index.ts

import path from 'path'
import prompts from 'prompts'
import { initAstro } from './astro.init'
import { initReactSPA } from './react-spa.init'
import { initHonoWrangler } from './hono-wrangler.init'
import { findMonorepoRoot } from '../util'

export async function initAppProject() {
    const root = await findMonorepoRoot()

    const { name, preset } = await prompts([
        { type: 'text', name: 'name', message: 'App name?' },
        {
            type: 'select',
            name: 'preset',
            message: 'Which type of app do you want to create?',
            choices: [
                { title: 'Full stack site (Astro + SPA + Hono)', value: 'full' },
                { title: 'Astro only (MDX + SSG React)', value: 'astro' },
                { title: 'API only (Hono + Wrangler)', value: 'api' },
                { title: 'SPA only (React)', value: 'spa' }
            ]
        }
    ])

    const appBase = path.join(root, 'apps', name)
    const clientDir = path.join(appBase, 'client')
    const serverDir = path.join(appBase, 'server')

    if (preset === 'full') {
        await initAstro(clientDir)
        await initReactSPA(path.join(clientDir, 'spa'))
        await initHonoWrangler(serverDir)
    } else if (preset === 'astro') {
        await initAstro(clientDir)
    } else if (preset === 'api') {
        await initHonoWrangler(serverDir)
    } else if (preset === 'spa') {
        await initReactSPA(clientDir)
    }

    console.log(`🎉 App '${name}' created with preset: ${preset}`)
}
