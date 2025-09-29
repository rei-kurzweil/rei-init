# Micro Domain Package

A reusable domain package with Drizzle ORM schema and migration utilities for Cloudflare D1 databases.

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure D1 database:**
   ```bash
   cp d1.config.example.json d1.config.json
   # Edit d1.config.json with your D1 database details
   ```

3. **Build the package:**
   ```bash
   pnpm build
   ```

## Database Operations

### Generate Migrations
```bash
pnpm db:generate
```

### Apply Migrations

**Local SQLite (for development):**
```bash
pnpm db:migrate:local
```

**D1 Local (wrangler local mode):**
```bash
pnpm db:migrate:d1:local
```

**D1 Remote (production):**
```bash
pnpm db:migrate:d1:remote
```

### Seed Database

**Local SQLite:**
```bash
pnpm db:seed:local
```

**D1 Local:**
```bash
pnpm db:seed:d1:local
```

**D1 Remote:**
```bash
pnpm db:seed:d1:remote
```

## Usage in Apps

Import the schema and utilities in your apps:

```typescript
// Import the schema
import { usersTable, itemsTable } from "@rei-init/micro-domain/schema";

// Import D1 utilities
import { getD1Config } from "@rei-init/micro-domain/d1-utils";

// Use with Drizzle ORM
import { drizzle } from "drizzle-orm/d1";

export function createDb(env: { REI_CAST_XYZ_D1: D1Database }) {
  return drizzle(env.REI_CAST_XYZ_D1, { 
    schema: { usersTable, itemsTable } 
  });
}
```

## Authentication

The migration scripts use `wrangler` for D1 operations, which handles Cloudflare authentication. Make sure you're logged in:

```bash
wrangler auth login
```

## Files Structure

- `src/schema.ts` - Drizzle ORM schema definitions
- `src/d1-utils.ts` - D1 configuration utilities
- `migrations/` - Generated SQL migration files
- `scripts/` - Migration and seeding scripts
- `d1.config.json` - D1 database configuration (gitignored)

## Workflow

1. **Development:** Use local SQLite database
2. **Testing:** Use D1 local mode with wrangler
3. **Production:** Deploy migrations to D1 remote

The `drizzle-kit` generates SQL files locally, then `wrangler` applies them to your D1 database.