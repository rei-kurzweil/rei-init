/// <reference path="./shims-react.d.ts" />
/// <reference path="./jsx-blessed.d.ts" />
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as os from 'node:os'
import React, { useEffect, useRef, useState } from 'react'
import blessed from 'blessed'
import { render } from 'react-blessed'
import { spawn } from 'node:child_process'


import { Target, OptionsFile } from './model'
import { config_manager } from './config-manager'
import { getDataFilePaths } from './util'

const { OPTIONS_PATH, CONFIG_PATH, ROOT } = getDataFilePaths();


function App() {
    const initialOpts = config_manager.loadOptions()
    const [opts] = useState(initialOpts)
    const initialSelected = config_manager.ensureInitialConfig(initialOpts).selected
    const [selected, setSelected] = useState(initialSelected as Record<string, boolean>)
    const [building, setBuilding] = useState(false)
    const [logs, setLogs] = useState([] as string[])
    const listRef = useRef(null as any)

    const targets = opts.targets

    useEffect(() => {
        config_manager.saveConfig(opts.version, selected)
    }, [selected])

    useEffect(() => {
        // Focus list on mount for immediate keyboard control
        const t = setTimeout(() => listRef.current?.focus(), 0)
        return () => clearTimeout(t)
    }, [])

    function rowText(t: Target): string {
        const mark = selected[t.id] ? '[x]' : '[ ]'
        return `${mark} ${t.label} {gray-fg}${t.id}{/gray-fg}`
    }

    function toggleAtIndex(idx: number) {
        const t = targets[idx]
        if (!t) return
        setSelected((s: Record<string, boolean>) => ({ ...s, [t.id]: !s[t.id] }))
    }

    function selectAll(val: boolean) {
        const next: Record<string, boolean> = {}
        for (const t of targets) next[t.id] = val
        setSelected(next)
    }

    function log(line: string) {
        setLogs((l: string[]) => [...l, line])
    }
    function clearLogs() {
        setLogs([])
    }

    async function execStreaming(cmd: string) {
        return new Promise<void>((resolve, reject) => {
            const child = spawn('bash', ['-lc', cmd], { cwd: ROOT, env: process.env })
            child.stdout.on('data', (d) => log(d.toString().trimEnd()))
            child.stderr.on('data', (d) => log(`{red-fg}${d.toString().trimEnd()}{/red-fg}`))
            child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited with code ${code}`))))
            child.on('error', (e) => reject(e))
        })
    }

    async function buildSelected(): Promise<boolean> {
        const selectedTargets = targets.filter((t: Target) => selected[t.id])
        if (selectedTargets.length === 0) {
            log('{yellow-fg}No targets selected{/yellow-fg}')
            return false
        }
        clearLogs()
        log(`Starting ${selectedTargets.length} target(s) ...`)
        try {
            for (const t of selectedTargets) {
                log(`\n{bold}➡️  ${t.label} (${t.id}){/bold}`)
                await execStreaming(t.script)
                log(`{green-fg}✅ Completed ${t.id}{/green-fg}`)
            }
            log('{green-fg}All selected builds finished{/green-fg}')
            return true
        } catch (err: any) {
            log(`{red-fg}❌ Failed: ${err?.message || err}{/red-fg}`)
            return false
        }
    }

    async function runBuilds() {
        if (building) return
        setBuilding(true)
        const success = await buildSelected()
        setBuilding(false)
        return success
    }

    async function runBuildsAndDeploy() {
        if (building) return
        setBuilding(true)
        const success = await buildSelected()
        if (success) {
            const deployCmd = opts.deploy_command || 'pnpm run deploy'
            log(`\n{bold}🚀 Deploying with:{/bold} ${deployCmd}`)
            try {
                await execStreaming(deployCmd)
                log('{green-fg}🎉 Deploy completed{/green-fg}')
            } catch (err: any) {
                log(`{red-fg}❌ Deploy failed: ${err?.message || err}{/red-fg}`)
            }
        }
        setBuilding(false)
    }

    return (
        <element>
            <box 
                top={0} 
                left={0} 
                right={0} 
                height={2} 
                tags={true}
                style={{ fg: 'white' }} 
                content="{bold}↑/↓{/bold} move  {bold}Space/Click{/bold} toggle  {bold}a{/bold} all  {bold}n{/bold} none  {bold}b{/bold} build  {bold}d{/bold} build+deploy  {bold}q{/bold} quit" 
            />

            <list
                ref={listRef}
                label={` Build targets (v${opts.version}) `}
                border="line"
                tags={true}
                keys={true}
                mouse={true}
                interactive={!building}
                top={2}
                left={0}
                right={0}
                height="30%"
                style={{ selected: { bg: 'blue' }, item: { hover: { bg: 'gray' } } }}
                items={targets.map(rowText)}
                onSelect={(_el: any, i: number) => toggleAtIndex(i)}
                onKeypress={(_ch: any, key: any) => {
                    const idx = listRef.current?.selected ?? 0
                    if (key.name === 'space') toggleAtIndex(idx)
                    if (key.name === 'a') selectAll(true)
                    if (key.name === 'n') selectAll(false)
                    if (key.name === 'b') runBuilds()
                    if (key.name === 'd') runBuildsAndDeploy()
                }}
            />

            <log
                label=" Build output "
                border="line"
                top="33%"
                left={0}
                right={0}
                height="66%"
                tags={true}
                keys={true}
                mouse={true}
                scrollable={true}
                alwaysScroll={true}
                scrollbar={{ ch: ' ', track: { bg: 'gray' }, style: { bg: 'white' } }}
                content={logs.join('\n')}
            />

                    <button
                        bottom={3}
                        width={15}
                        height={3}
                        left="40%"
                        mouse={true}
                        keys={true}
                        content={building ? ' [ Building... ] ' : ' [ Build ] '}
                        align="center"
                        shrink={true}
                        border="line"
                        onPress={() => runBuilds()}
                        style={{ fg: 'white', bg: 'green', focus: { bg: 'lightgreen' }, hover: { bg: 'lightgreen' } }}
                    />

                    <button
                        bottom={3}
                        width={23}
                        height={3}
                        left="60%"
                        mouse={true}
                        keys={true}
                        content={building ? ' [ Building... ] ' : ' [ Build & Deploy ] '}
                        align="center"
                        shrink={true}
                        border="line"
                        onPress={() => runBuildsAndDeploy()}
                        style={{ fg: 'white', bg: 'magenta', focus: { bg: 'lightmagenta' }, hover: { bg: 'lightmagenta' } }}
                    />

            <box bottom={0} left={0} right={0} height={3} tags={true}>
                Ready
            </box>
        </element>
    )
}

function main() {
    if (!fs.existsSync(OPTIONS_PATH)) {
        console.error(`multi-build-tui: missing ${OPTIONS_PATH}`)
        process.exit(1)
    }
    const screen = blessed.screen({ 
        smartCSR: true, 
        title: 'multi-build-tui', 
        fullUnicode: true, 
        mouse: true,
        tags: true  // Enable tag parsing globally
    })
    screen.key(['q', 'C-c', 'escape'], () => process.exit(0))
    render(<App />, screen)
}

main()
