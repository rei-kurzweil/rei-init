import * as fs from 'node:fs'
import * as path from 'node:path'
import { spawn } from 'node:child_process'

interface ConfigFile {
  version: number
  selected: Record<string, boolean>
  updatedAt: string
}

interface OptionsFileTarget {
  id: string
  label: string
  script: string
}

interface OptionsFile {
  version: number
  targets: OptionsFileTarget[]
}

const ROOT = process.cwd()
const CONFIG_PATH = path.join(ROOT, 'multi-build-config.json')
const OPTIONS_PATH = path.join(ROOT, 'multi-build-options.json')

function loadJSON<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, 'utf8')) as T
}

function log(msg: string) {
  process.stdout.write(msg + '\n')
}

async function runScript(cmd: string) {
  return new Promise<void>((resolve, reject) => {
    const parts = cmd.split(/\s+/)
    const bin = parts.shift()!
    const child = spawn(bin, parts, { stdio: 'inherit' })
    child.on('close', (code: number | null) => {
      if (code === 0) resolve(); else reject(new Error(`${cmd} exited with code ${code}`))
    })
  })
}

async function main() {
  if (!fs.existsSync(CONFIG_PATH) || !fs.existsSync(OPTIONS_PATH)) {
    console.error('Missing multi-build config or options file; run multi-build-tui first.')
    process.exit(1)
  }

  const cfg = loadJSON<ConfigFile>(CONFIG_PATH)
  const opts = loadJSON<OptionsFile>(OPTIONS_PATH)

  const targetsToRun = opts.targets.filter(t => cfg.selected[t.id])
  if (targetsToRun.length === 0) {
    log('No build targets selected. Nothing to do.')
    return
  }

  log(`Running ${targetsToRun.length} build target(s)...`)    
  for (const t of targetsToRun) {
    log(`\n➡️  ${t.label} (${t.id})\n$ ${t.script}`)
    try {
      await runScript(t.script)
      log(`✅ Completed ${t.id}`)
    } catch (err) {
      console.error(`❌ Failed ${t.id}:`, err)
      process.exit(1)
    }
  }
  log('\n🎉 All selected builds finished.')
}

main()
