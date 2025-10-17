# OpenRouter Demo

A minimal client/server demo that uses the shared `@rei-init/open-router-manager` package.

- Client: Vite + React
- Server: Express proxy that calls OpenRouter via the library

## Setup

1. Ensure your repo `.env` has:

```
OPENROUTER_API_KEY=sk-or-...
SITE_URL=http://localhost:5177
SITE_TITLE=OpenRouter Demo
```

2. Run the demo:

- Build the shared library in watch mode, start the server, and run client dev server:

```
pnpm -w --filter @rei-init/open-router-demo run dev
```

- Or build once:

```
pnpm -w --filter @rei-init/open-router-manager run build
pnpm -w --filter @rei-init/open-router-demo run dev:server
pnpm -w --filter @rei-init/open-router-demo run dev:client
```

Visit http://localhost:5177 and ask a question.

Notes:
- The client proxies `/api/*` to the server at `http://localhost:8788`.
- The server uses your `.env` OPENROUTER_API_KEY to authenticate.
- You can change preferred models in `packages/open-router-manager/src/models.json`.