import type { ChatMessage, SendOptions } from './utils'
import { loadEnv, getEnv, readPreferredModels } from './utils'

export type OpenRouterManagerConfig = {
    envPath?: string
    siteUrl?: string
    siteTitle?: string
    baseUrl?: string
    packageDir?: string
}

export class OpenRouterManager {
    private siteUrl: string | undefined
    private siteTitle: string | undefined
    private baseUrl: string
    private packageDir: string | undefined

    constructor(cfg: OpenRouterManagerConfig = {}) {
        const { envPath, siteUrl, siteTitle, baseUrl, packageDir } = cfg
        loadEnv(envPath)
        // Prefer explicit config, then environment, then default
        this.siteUrl = siteUrl ?? getEnv('SITE_URL') ?? getEnv('OPENROUTER_SITE_URL')
        this.siteTitle = siteTitle ?? getEnv('SITE_TITLE') ?? getEnv('OPENROUTER_SITE_TITLE')
        this.baseUrl = baseUrl ?? getEnv('OPENROUTER_BASE_URL') ?? 'https://openrouter.ai/api/v1/chat/completions'
        this.packageDir = packageDir
    }

    private getOpenRouterKey(): string | undefined {
        return (
            getEnv('OPENROUTER_API_KEY') ||
            getEnv('OPENROUTER_KEY') ||
            getEnv('openrouter_key') ||
            getEnv('OPEN_ROUTER_API_KEY')
        )
    }

    make_config_headers(extraHeaders?: Record<string, string>) {
        // Access preferred models file to ensure it's present (and potentially validate in future)
        readPreferredModels(this.packageDir)

        const key = this.getOpenRouterKey()
        if (!key) {
            throw new Error('Missing OPENROUTER_API_KEY in environment (.env)')
        }

        const headers: Record<string, string> = {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json'
        }

        const referer = this.siteUrl ?? getEnv('SITE_URL')
        const title = this.siteTitle ?? getEnv('SITE_TITLE')
        if (referer) headers['HTTP-Referer'] = referer
        if (title) headers['X-Title'] = title

        return { ...headers, ...(extraHeaders ?? {}) }
    }

    private pickModels(preferredFirst?: string): string[] {
        const list = readPreferredModels(this.packageDir)
        const merged = [preferredFirst, ...list].filter(Boolean) as string[]
        // de-dup, keep order
        const seen = new Set<string>()
        const out: string[] = []
        for (const m of merged) {
            if (!seen.has(m)) {
                out.push(m)
                seen.add(m)
            }
        }
        return out.length ? out : list
    }

    async send(opts: SendOptions) {
        const modelsToTry = this.pickModels(opts.model)
        const headers = this.make_config_headers(opts.extraHeaders)
        if (opts.stream) {
            headers['Accept'] = 'text/event-stream'
        }
        const url = opts.baseUrl ?? this.baseUrl

        let lastError: unknown
        for (const model of modelsToTry) {
            try {
                const res = await fetch(url, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        model,
                        messages: opts.messages,
                        stream: opts.stream === true
                    }),
                    signal: (opts.signal ?? null) as any
                })

                if (!res.ok) {
                    // For 401/403, don't keep trying other models
                    if (res.status === 401 || res.status === 403) {
                        const text = await res.text().catch(() => '')
                        throw new Error(`OpenRouter auth error ${res.status}: ${text}`)
                    }
                    // Try next model on 404/422/etc
                    lastError = new Error(`OpenRouter error ${res.status} for model ${model}`)
                    continue
                }

                // If streaming was requested, parse incremental data
                if (opts.stream) {
                    const reader = (res.body as any)?.getReader?.()
                    if (!reader) throw new Error('Response body is not readable')
                    const decoder = new TextDecoder()
                    let buffer = ''
                    const pieces: string[] = []
                    const accumulate = opts.accumulate !== false

                    try {
                        while (true) {
                            const { done, value } = await reader.read()
                            if (done) break

                            buffer += decoder.decode(value, { stream: true })

                            while (true) {
                                const lineEnd = buffer.indexOf('\n')
                                if (lineEnd === -1) break
                                const rawLine = buffer.slice(0, lineEnd)
                                buffer = buffer.slice(lineEnd + 1)
                                const line = rawLine.trim()
                                if (!line) continue

                                if (line.startsWith('data: ')) {
                                    const data = line.slice(6)
                                    if (data === '[DONE]') {
                                        // Return on completion for this model
                                        return accumulate ? { content: pieces.join('') } : { done: true }
                                    }
                                    try {
                                        console.log('STREAM DATA:', data);
                                        const parsed = JSON.parse(data)
                                        const delta = parsed?.choices?.[0]?.delta
                                        const content: unknown = delta?.content
                                        if (typeof content === 'string' && content.length) {
                                            if (accumulate) pieces.push(content)
                                            opts.onToken?.(content)
                                        }
                                        opts.onEvent?.(parsed)
                                    } catch {
                                        // Ignore invalid JSON lines
                                    }
                                }
                            }
                        }
                        // Stream ended without explicit [DONE]
                        return accumulate ? { content: pieces.join('') } : { done: true }
                    } finally {
                        try { reader.cancel() } catch {}
                    }
                }

                // Non-streaming response
                const data = await res.json()
                return data
            } catch (err) {
                lastError = err
                // if AbortError, rethrow immediately
                if ((err as any)?.name === 'AbortError') throw err
                // otherwise, try next model
            }
        }

        throw lastError ?? new Error('OpenRouter request failed with no models available')
    }
}

// Convenience default export and helper function
export default OpenRouterManager

export type { ChatMessage, SendOptions }
