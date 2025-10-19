var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/utils.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// src/models.json
var models_default = [
  "tngtech/deepseek-r1t2-chimera:free"
];

// src/utils.ts
function loadEnv(envPath) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirnameLocal = path.dirname(__filename);
  const searchPaths = [
    envPath,
    path.resolve(process.cwd(), ".env"),
    path.resolve(__dirnameLocal, "..", "..", "..", ".env"),
    path.resolve(__dirnameLocal, "..", ".env")
  ].filter(Boolean);
  for (const p of searchPaths) {
    if (fs.existsSync(p)) {
      dotenv.config({ path: p });
      break;
    }
  }
}
function getEnv(key, fallback) {
  return process.env[key] ?? fallback;
}
function readPreferredModels(_packageDir) {
  if (Array.isArray(models_default)) return models_default.filter((x) => typeof x === "string");
  return [];
}

// src/index.ts
var OpenRouterManager = class {
  constructor(cfg = {}) {
    __publicField(this, "siteUrl");
    __publicField(this, "siteTitle");
    __publicField(this, "baseUrl");
    __publicField(this, "packageDir");
    const { envPath, siteUrl, siteTitle, baseUrl, packageDir } = cfg;
    loadEnv(envPath);
    this.siteUrl = siteUrl ?? getEnv("SITE_URL") ?? getEnv("OPENROUTER_SITE_URL");
    this.siteTitle = siteTitle ?? getEnv("SITE_TITLE") ?? getEnv("OPENROUTER_SITE_TITLE");
    this.baseUrl = baseUrl ?? getEnv("OPENROUTER_BASE_URL") ?? "https://openrouter.ai/api/v1/chat/completions";
    this.packageDir = packageDir;
  }
  getOpenRouterKey() {
    return getEnv("OPENROUTER_API_KEY") || getEnv("OPENROUTER_KEY") || getEnv("openrouter_key") || getEnv("OPEN_ROUTER_API_KEY");
  }
  make_config_headers(extraHeaders) {
    readPreferredModels(this.packageDir);
    const key = this.getOpenRouterKey();
    if (!key) {
      throw new Error("Missing OPENROUTER_API_KEY in environment (.env)");
    }
    const headers = {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    };
    const referer = this.siteUrl ?? getEnv("SITE_URL");
    const title = this.siteTitle ?? getEnv("SITE_TITLE");
    if (referer) headers["HTTP-Referer"] = referer;
    if (title) headers["X-Title"] = title;
    return { ...headers, ...extraHeaders ?? {} };
  }
  pickModels(preferredFirst) {
    const list = readPreferredModels(this.packageDir);
    const merged = [preferredFirst, ...list].filter(Boolean);
    const seen = /* @__PURE__ */ new Set();
    const out = [];
    for (const m of merged) {
      if (!seen.has(m)) {
        out.push(m);
        seen.add(m);
      }
    }
    return out.length ? out : list;
  }
  async send(opts) {
    const modelsToTry = this.pickModels(opts.model);
    const headers = this.make_config_headers(opts.extraHeaders);
    if (opts.stream) {
      headers["Accept"] = "text/event-stream";
    }
    const url = opts.baseUrl ?? this.baseUrl;
    let lastError;
    for (const model of modelsToTry) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify({
            model,
            messages: opts.messages,
            stream: opts.stream === true
          }),
          signal: opts.signal ?? null
        });
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            const text = await res.text().catch(() => "");
            throw new Error(`OpenRouter auth error ${res.status}: ${text}`);
          }
          lastError = new Error(`OpenRouter error ${res.status} for model ${model}`);
          continue;
        }
        if (opts.stream) {
          const reader = res.body?.getReader?.();
          if (!reader) throw new Error("Response body is not readable");
          const decoder = new TextDecoder();
          let buffer = "";
          const pieces = [];
          const accumulate = opts.accumulate !== false;
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });
              while (true) {
                const lineEnd = buffer.indexOf("\n");
                if (lineEnd === -1) break;
                const rawLine = buffer.slice(0, lineEnd);
                buffer = buffer.slice(lineEnd + 1);
                const line = rawLine.trim();
                if (!line) continue;
                if (line.startsWith("data: ")) {
                  const data2 = line.slice(6);
                  if (data2 === "[DONE]") {
                    return accumulate ? { content: pieces.join("") } : { done: true };
                  }
                  try {
                    console.log("STREAM DATA:", data2);
                    const parsed = JSON.parse(data2);
                    const delta = parsed?.choices?.[0]?.delta;
                    const content = delta?.content;
                    if (typeof content === "string" && content.length) {
                      if (accumulate) pieces.push(content);
                      opts.onToken?.(content);
                    }
                    opts.onEvent?.(parsed);
                  } catch {
                  }
                }
              }
            }
            return accumulate ? { content: pieces.join("") } : { done: true };
          } finally {
            try {
              reader.cancel();
            } catch {
            }
          }
        }
        const data = await res.json();
        return data;
      } catch (err) {
        lastError = err;
        if (err?.name === "AbortError") throw err;
      }
    }
    throw lastError ?? new Error("OpenRouter request failed with no models available");
  }
};
var index_default = OpenRouterManager;
export {
  OpenRouterManager,
  index_default as default
};
