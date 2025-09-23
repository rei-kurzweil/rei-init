// File: rei-make/app/hono-wrangler.init.ts

import prompts from 'prompts'
import path from 'path'
import fs from 'fs-extra'
import { execa } from 'execa'

export async function initHonoWrangler(targetDir: string) {
    console.log(`✨ Setting up Hono + Wrangler backend at ${targetDir}`)

    const { storage, auth } = await prompts([
        {
            type: 'multiselect',
            name: 'storage',
            message: 'Select storage options:',
            choices: [
                { title: 'D1 (Cloudflare SQLite)', value: 'd1' },
                { title: 'KV (Cloudflare Key-Value)', value: 'kv' },
                { title: 'Durable Objects', value: 'do' }
            ],
            hint: '- Space to select. Return to confirm'
        },
        {
            type: 'select',
            name: 'auth',
            message: 'Authentication method?',
            choices: [
                { title: 'None', value: 'none' },
                { title: 'Cloudflare Zero Trust', value: 'cfzt' }
            ]
        }
    ])

    await fs.mkdirp(targetDir)
    await fs.writeFile(path.join(targetDir, 'README.md'), `# Hono API\n\n- Storage: ${storage.join(', ') || 'none'}\n- Auth: ${auth}`)

    await execa('pnpm', ['add', 'hono'], { cwd: targetDir })
    await execa('pnpm', ['add', '-D', 'wrangler'], { cwd: targetDir })

    const entry = path.join(targetDir, 'index.ts')
    await fs.outputFile(entry, `
import { Hono } from 'hono'
const app = new Hono()

app.get('/', (c) => c.text('Hello from Hono + Wrangler'))

export default app
`)

    const wranglerConfigPath = path.join(targetDir, 'wrangler.jsonc')

    const config: Record<string, any> = {
        name: "my-hono-app",
        compatibility_date: "2025-07-14",
        routes: [
            {
                pattern: "example.com/api/*",
                zone_id: "",
                usage_model: "bundled"
            }
        ],
        account_id: ""
    }

    if (storage.includes('d1')) {
        config.d1_databases = [
            {
                binding: "DB",
                database_name: "my_db",
                id: ""
            }
        ]
    }
    if (storage.includes('kv')) {
        config.kv_namespaces = [
            {
                binding: "MY_KV",
                id: ""
            }
        ]
    }
    if (storage.includes('do')) {
        config.durable_objects = {
            bindings: [
                {
                    name: "MyDurableObject",
                    class_name: "MyDurableObject"
                }
            ]
        }
    }

    await fs.writeJson(wranglerConfigPath, config, { spaces: 2 })

    console.log(`✅ Hono + Wrangler backend initialized at ${targetDir}`)
    console.log(`ℹ️ Remember to fill in your Cloudflare account_id, zone_id, and any DB identifiers in wrangler.json`)
    if (auth === 'cfzt') {
        console.log(`🔐 Consider setting up access rules in Cloudflare Zero Trust dashboard.`)
    }
}
