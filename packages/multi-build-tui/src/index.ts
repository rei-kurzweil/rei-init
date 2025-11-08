import * as fs from 'node:fs'
import * as path from 'node:path'
import * as os from 'node:os'
import blessed from 'blessed'
import { spawn } from 'node:child_process'

type Target = {
  id: string
  label: string
  script: string
  default?: boolean
}

type OptionsFile = {
  version: number
  targets: Target[]
}

type ConfigFile = {
  version: number
  selected: Record<string, boolean>
  updatedAt: string
}

const ROOT = process.cwd()
const OPTIONS_PATH = path.join(ROOT, 'multi-build-options.json')
const CONFIG_PATH = path.join(ROOT, 'multi-build-config.json')


const config_manager = new (class {
  loadOptions(): OptionsFile {
    const raw = fs.readFileSync(OPTIONS_PATH, 'utf8')
    const data = JSON.parse(raw)
    return data
  }

  ensureInitialConfig(opts: OptionsFile): ConfigFile {
    if (fs.existsSync(CONFIG_PATH)) {
      const raw = fs.readFileSync(CONFIG_PATH, 'utf8')
      return JSON.parse(raw)
    }
    const selected: Record<string, boolean> = {}
    for (const t of opts.targets) {
      selected[t.id] = t.default !== false
    }
    const cfg: ConfigFile = {
      version: opts.version ?? 1,
      selected,
      updatedAt: new Date().toISOString(),
    }
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2) + os.EOL)
    return cfg
  }

  saveConfig(version: number, selected: Record<string, boolean>) {
    const cfg: ConfigFile = {
      version,
      selected,
      updatedAt: new Date().toISOString(),
    }
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2) + os.EOL)
  }
})();

function main() {
  if (!fs.existsSync(OPTIONS_PATH)) {
    console.error(`multi-build-tui: missing ${OPTIONS_PATH}`)
    process.exit(1)
  }

  const opts = config_manager.loadOptions()
  const cfg = config_manager.ensureInitialConfig(opts)

  const screen = blessed.screen({
    smartCSR: true,
    title: 'multi-build-tui',
    fullUnicode: true,
    mouse: true,
  })

  // Layout
  const help = blessed.box({
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    tags: true,
    content:
      '{bold}↑/↓{/bold} move  {bold}Space/Click{/bold} toggle  {bold}a{/bold} all  {bold}n{/bold} none  {bold}q{/bold} quit',
    style: { fg: 'white' },
  })

  const list = blessed.list({
    top: 3,
    left: 0,
    right: 0,
    bottom: 12,
    tags: true,
    mouse: true,
    keys: true,
    vi: false,
    interactive: true,
    border: 'line',
    label: ` Build targets (v${opts.version}) `,
    style: {
      selected: { bg: 'blue' },
      item: { hover: { bg: 'gray' } },
    },
  })

  // Build output pane
  const output = (blessed as any).log({
    bottom: 6,
    left: 0,
    right: 0,
    height: 9,
    label: ' Build output ',
    border: 'line',
    tags: true,
    keys: true,
    mouse: true,
    scrollable: true,
    alwaysScroll: true,
    scrollbar: { ch: ' ', track: { bg: 'gray' }, style: { bg: 'white' } },
    style: { fg: 'white' },
  }) as blessed.Widgets.BlessedElement

  // Build button
  const buildBtn = blessed.button({
    bottom: 3,
    width: 15,
    height: 3,
    left: 'center',
    mouse: true,
    keys: true,
    content: ' [ Build ] ',
    align: 'center',
    shrink: true,
    border: 'line',
    style: {
      fg: 'white',
      bg: 'green',
      focus: { bg: 'lightgreen' },
      hover: { bg: 'lightgreen' },
    },
  })

  const status = blessed.box({
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    tags: true,
    content: 'Ready',
  })

  screen.append(help)
  screen.append(list)
  screen.append(output)
  screen.append(buildBtn)
  screen.append(status)

  // Model
  const selected: Record<string, boolean> = { ...cfg.selected }

  function rowText(t: Target): string {
    const mark = selected[t.id] ? '[x]' : '[ ]'
    return `${mark} ${t.label} {gray-fg}${t.id}{/gray-fg}`
  }


  function refresh() {
    // Use BlessedElements to ensure tag parsing and styling
    list.setItems(
        opts.targets.map((t) => blessed.parseTags(rowText(t)))
    )
    screen.render()
  }

  function showTemporaryStatus(msg: string, duration = 2000) {
    status.setContent(msg)
    screen.render()
    setTimeout(() => {
      status.setContent('Ready')
      screen.render()
    }, duration)
  }


  const selection = new (class {
    toggleAt(index: number) {
      const t = opts.targets[index]
      if (!t) return
      selected[t.id] = !selected[t.id]


      config_manager.saveConfig(opts.version, selected)
      showTemporaryStatus(`Updated config: ${t.label} to ${selected[t.id] ? 'ON' : 'OFF'}`)
      
      refresh()
    }

    selectAll(val: boolean) {
      for (const t of opts.targets) selected[t.id] = val

      config_manager.saveConfig(opts.version, selected)
      showTemporaryStatus(`Set all targets to ${val ? 'ON' : 'OFF'}`)
      
      refresh()
    }
})


  list.on('select', (_el: any, index: number) => selection.toggleAt(index))
  list.on('keypress', (_ch: any, key: any) => {
    const selIndex = (list as any).selected ?? 0
    if (key.name === 'space') selection.toggleAt(selIndex)
    if (key.name === 'a')     selection.selectAll(true)
    if (key.name === 'n')     selection.selectAll(false)
    if (key.name === 'b')     runBuilds()
  })

  let building = false

  async function runBuilds() {
    if (building) return
    const targetsToRun = opts.targets.filter(t => selected[t.id])
    if (targetsToRun.length === 0) {
      showTemporaryStatus('{yellow-fg}No targets selected{/yellow-fg}')
      return
    }

    // Persist config before running
    config_manager.saveConfig(opts.version, selected)

  building = true
  ;(list as any).locked = true
    ;(buildBtn as any).disabled = true
    ;(output as any).setContent('')
    ;(output as any).log(`Starting ${targetsToRun.length} target(s) ...`)
    screen.render()

    try {
      for (const t of targetsToRun) {
        ;(output as any).log(`\n{bold}➡️  ${t.label} (${t.id}){/bold}`)
        await execStreaming(t.script)
        ;(output as any).log(`{green-fg}✅ Completed ${t.id}{/green-fg}`)
        screen.render()
      }
      showTemporaryStatus('{green-fg}All selected builds finished{/green-fg}', 3000)
    } catch (err: any) {
      ;(output as any).log(`{red-fg}❌ Failed: ${err?.message || err}{/red-fg}`)
      showTemporaryStatus('{red-fg}Build failed{/red-fg}', 4000)
    } finally {
  building = false
  ;(list as any).locked = false
      ;(buildBtn as any).disabled = false
      screen.render()
    }
  }

  function execStreaming(cmd: string) {
    return new Promise<void>((resolve, reject) => {
      // Use shell to allow complex scripts
      const child = spawn('bash', ['-lc', cmd], { cwd: ROOT, env: process.env })
      child.stdout.on('data', (d) => { (output as any).log(d.toString().trimEnd()); screen.render() })
      child.stderr.on('data', (d) => { (output as any).log(`{red-fg}${d.toString().trimEnd()}{/red-fg}`); screen.render() })
      child.on('close', (code) => {
        if (code === 0) resolve(); else reject(new Error(`${cmd} exited with code ${code}`))
      })
      child.on('error', (e) => reject(e))
    })
  }

  buildBtn.on('press', () => runBuilds())

  screen.key(['q', 'C-c', 'escape'], () => {
    // Save on exit for convenience
    config_manager.saveConfig(opts.version, selected)
    screen.destroy()
    process.exit(0)
  })

  list.focus()
  refresh()
  screen.render()
}

main()
