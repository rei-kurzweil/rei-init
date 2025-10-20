// @ts-nocheck
/**
 * Run ad-hoc SQL against the local PGlite database (file-based).
 *
 * Usage examples:
 *   bun run scripts/pglite-sql.ts --execute "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"
 *   bun run scripts/pglite-sql.ts -e "SELECT COUNT(*) FROM memories"
 *   bun run scripts/pglite-sql.ts -f ./query.sql
 */
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import path from 'node:path';

function usage() {
  console.log(`PGlite SQL CLI
Usage:
  bun run scripts/pglite-sql.ts -e "SQL"
  bun run scripts/pglite-sql.ts --execute "SQL"
  bun run scripts/pglite-sql.ts -f query.sql
  bun run scripts/pglite-sql.ts --file query.sql

Env:
  PGLITE_DATA_DIR to override the database path.
`);
}

function parseArgs(argv: string[]) {
  let sql: string | null = null;
  let file: string | null = null;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-e' || a === '--execute') {
      sql = argv[++i] ?? null;
    } else if (a === '-f' || a === '--file') {
      file = argv[++i] ?? null;
    }
  }
  return { sql, file };
}

async function main() {
  const { sql, file } = parseArgs(process.argv.slice(2));
  if (!sql && !file) {
    usage();
    process.exit(1);
  }

  let query = sql;
  if (!query && file) {
    const p = path.resolve(process.cwd(), file);
    if (!fs.existsSync(p)) {
      console.error('Query file not found:', p);
      process.exit(1);
    }
    query = fs.readFileSync(p, 'utf8');
  }

  // Resolve data dir similar to inspector
  const cwd = process.cwd();
  const scriptDir = path.dirname(new URL(import.meta.url).pathname);
  const candidates = [
    process.env.PGLITE_DATA_DIR,
    path.resolve(cwd, '.eliza/.elizadb'),
    path.resolve(scriptDir, '../.eliza/.elizadb'),
  ].filter(Boolean) as string[];
  const dataDir = candidates.find((p) => fs.existsSync(p));
  if (!dataDir) {
    console.error('PGlite data directory not found in any of:', candidates.join(', '));
    console.error('Tip: run the app/tests once to initialize the local DB, or set PGLITE_DATA_DIR.');
    process.exit(1);
  }

  console.log('Connecting to PGlite at:', dataDir);
  const db = await PGlite.create({ dataDir });
  try {
    console.log('Executing SQL:\n', query);
    const res = await db.query<any>(query!);
    if (!res || !res.rows) {
      console.log('Done.');
      return;
    }
    if (res.rows.length === 0) {
      console.log('(no rows)');
      return;
    }
    console.table(res.rows);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await db.close();
  }
}

main();
