#!/usr/bin/env tsx

import prompts from 'prompts'
import path from 'path'
import fs from 'fs-extra'
import { execa } from 'execa'
import { findMonorepoRoot } from './util'


async function run() {
  const { kind } = await prompts({
    type: 'select',
    name: 'kind',
    message: 'What are you creating?',
    choices: [
      { title: 'App (frontend/backend)', value: 'app' },
      { title: 'Package (reusable lib)', value: 'pkg' }
    ]
  })

  const root = await findMonorepoRoot()

  if (kind === 'app') {
    const { name, multi } = await prompts([
      { type: 'text', name: 'name', message: 'App name?' },
      { type: 'toggle', name: 'multi', message: 'Multi-package app?', initial: true, active: 'yes', inactive: 'no' }
    ])

    const base = path.join(root, 'apps', name)
    await fs.mkdirp(base)

    const targets = multi ? ['react', 'wrangler'] : ['main']

    for (const part of targets) {
      const subDir = path.join(base, part)
      await fs.mkdirp(subDir)

      if (part === 'react') {
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

        console.log(`🔧 Setting up Vite + React in ${subDir}...`)
        await execa('pnpm', ['create', 'vite', subDir, '--template', 'react-ts'], { stdio: 'inherit' })

        await execa('pnpm', ['install'], { cwd: subDir, stdio: 'inherit' })

        const deps = ['three', 'react-three/fiber', 'react-three/drei'].filter(() => r3f)
        if (deps.length) await execa('pnpm', ['add', ...deps], { cwd: subDir })

        if (ui === 'tailwind') {
          await execa('pnpm', ['add', '-D', 'tailwindcss', 'postcss', 'autoprefixer'], { cwd: subDir })
          await execa('npx', ['tailwindcss', 'init', '-p'], { cwd: subDir })
          // Add tailwind config and update index.css...
        }

        if (jbmono) {
          // Write font import in index.css and maybe add font files
        }
      }

      if (part === 'wrangler') {
        const { db, orm } = await prompts([
          {
            type: 'select',
            name: 'db',
            message: 'Use a DB?',
            choices: [
              { title: 'None', value: 'none' },
              { title: 'D1 (Cloudflare)', value: 'd1' },
              { title: 'Planetscale', value: 'planetscale' },
              { title: 'Supabase', value: 'supabase' }
            ]
          },
          {
            type: 'select',
            name: 'orm',
            message: 'Choose ORM:',
            choices: [
              { title: 'None', value: 'none' },
              { title: 'Drizzle', value: 'drizzle' },
              { title: 'Prisma', value: 'prisma' }
            ]
          }
        ])

        // Scaffolding logic here...
        await fs.outputFile(path.join(subDir, 'README.md'), `# ${name} Wrangler backend\n`)
        if (orm === 'drizzle') {
          await execa('pnpm', ['add', 'drizzle-orm', 'better-sqlite3'], { cwd: subDir })
        }
      }
    }
  }

  if (kind === 'pkg') {
    const { name } = await prompts({ type: 'text', name: 'name', message: 'Package name?' })
    const base = path.join(root, 'packages', name)
    await fs.mkdirp(base)

    await fs.outputFile(path.join(base, 'index.ts'), '// hewwo package' + name)
    await fs.outputFile(path.join(base, 'package.json'), JSON.stringify({
      name,
      version: '0.0.1',
      main: 'dist/index.js',
      types: 'dist/index.d.ts'
    }, null, 2))

    console.log(`[✅] Package created: ${name}`)
  }
}

run().catch(err => {
  console.error('🚨 CLI error:', err)
})