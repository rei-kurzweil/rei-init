# @rei-init/open-router-manager

A tiny helper around OpenRouter's Chat Completions API with:

- TypeScript types
- .env loading for `OPENROUTER_API_KEY`
- Preferred models list in `src/models.json`
- Simple class with `send()` and `make_config_headers()`

## Quick start

1. Create a `.env` at the repo root (or package dir):

```
OPENROUTER_API_KEY=sk-or-...
SITE_URL=https://your.site
SITE_TITLE=Your App
```

2. Use in code:

```ts
import OpenRouterManager from '@rei-init/open-router-manager'

const orm = new OpenRouterManager()
const res = await orm.send({
  messages: [{ role: 'user', content: 'What is the meaning of life?' }]
})
console.log(res)
```

You can override the model by passing `model` or edit `src/models.json` to set your preferences. The manager will try models in order until a request succeeds (non-4xx auth errors).

## API

- `new OpenRouterManager({ envPath?, siteUrl?, siteTitle?, baseUrl?, packageDir? })`
- `make_config_headers(extraHeaders?)` → headers object
- `send({ messages, model?, siteUrl?, siteTitle?, signal?, extraHeaders?, baseUrl? })` → Promise<any>

## Notes

- Reads preferred models from `src/models.json` (array of strings). The default includes `tngtech/deepseek-r1t2-chimera:free`.
- Loads `.env` once on construct; you can pass an explicit path with `envPath`.