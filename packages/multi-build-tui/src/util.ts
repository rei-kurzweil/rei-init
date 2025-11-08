import path from "path"

export function getDataFilePaths() {
    const ROOT = process.cwd()
    const OPTIONS_PATH = path.join(ROOT, 'multi-build-options.json')
    const CONFIG_PATH = path.join(ROOT, 'multi-build-config.json')
    return { OPTIONS_PATH, CONFIG_PATH, ROOT }
}

