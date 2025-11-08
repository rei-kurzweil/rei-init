import fs from "fs"
import os from "os"

import { ConfigFile, OptionsFile } from "./model"
import { getDataFilePaths } from "./util";

const { OPTIONS_PATH, CONFIG_PATH } = getDataFilePaths();

    
export const config_manager = new (class {
    loadOptions(): OptionsFile {
        const raw = fs.readFileSync(OPTIONS_PATH, 'utf8')
        return JSON.parse(raw)
    }
    ensureInitialConfig(opts: OptionsFile): ConfigFile {
        if (fs.existsSync(CONFIG_PATH)) {
            const raw = fs.readFileSync(CONFIG_PATH, 'utf8')
            return JSON.parse(raw)
        }
        const selected: Record<string, boolean> = {}
        for (const t of opts.targets) selected[t.id] = t.default !== false
        const cfg: ConfigFile = { version: opts.version ?? 1, selected, updatedAt: new Date().toISOString() }
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2) + os.EOL)
        return cfg
    }
    saveConfig(version: number, selected: Record<string, boolean>) {
        const cfg: ConfigFile = { version, selected, updatedAt: new Date().toISOString() }
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2) + os.EOL)
    }
})()