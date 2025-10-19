import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import models from './models.json'

// Load .env from repository root or package dir
export function loadEnv(envPath?: string) {
    const __filename = fileURLToPath(import.meta.url)
    const __dirnameLocal = path.dirname(__filename)
    const searchPaths = [
        envPath,
        path.resolve(process.cwd(), '.env'),
        path.resolve(__dirnameLocal, '..', '..', '..', '.env'),
        path.resolve(__dirnameLocal, '..', '.env')
    ].filter(Boolean) as string[]

    for (const p of searchPaths) {
        if (fs.existsSync(p)) {
            dotenv.config({ path: p })
            break
        }
    }
}

export function getEnv(key: string, fallback?: string): string | undefined {
    return process.env[key] ?? fallback
}

export function readPreferredModels(_packageDir?: string): string[] {
    if (Array.isArray(models)) return models.filter((x) => typeof x === 'string')
    return []
}

export type ChatMessage = {
    role: 'user' | 'assistant' | 'system' | 'tool'
    content: string
}

export type SendOptions = {
    messages: ChatMessage[]
    model?: string
    siteUrl?: string
    siteTitle?: string
    signal?: AbortSignal
    extraHeaders?: Record<string, string>
    baseUrl?: string // override API base
    // Streaming controls
    stream?: boolean
    onToken?: (text: string) => void
    onEvent?: (data: unknown) => void
    accumulate?: boolean // default true, when streaming accumulates content and returns it
}
