// @ts-nocheck
/**
 * Report all embeddings with which dim_* columns are present, joined to memory text.
 * Safe for PGlite (does not read vector contents).
 *
 * Usage:
 *   bun run scripts/report-embeddings.ts
 */
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
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
    process.exit(1);
  }
  console.log('Connecting to PGlite at:', dataDir);
  const db = await PGlite.create({ dataDir });
  try {
    // Detect available dim_* columns
    const embCols = await db.query<{ column_name: string }>(
      "SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='embeddings' ORDER BY column_name"
    );
    if (embCols.rows.length === 0) {
      console.log("No 'embeddings' table found.");
      return;
    }
    const dimCols = embCols.rows.map((r) => r.column_name).filter((n) => n.startsWith('dim_'));
    if (dimCols.length === 0) {
      console.log('No dim_* columns found in embeddings table.');
      return;
    }

    // Build select list of has_* flags
    const flagSelects = dimCols
      .map((c) => `CASE WHEN e.${c} IS NULL THEN false ELSE true END AS has_${c}`)
      .join(',\n           ');

    const q = `
      SELECT e.id AS embedding_id,
             e.memory_id,
             e.created_at AS embedding_created_at,
             m."createdAt" AS memory_created_at,
             (m.content->>'text') AS text,
             ${flagSelects}
        FROM embeddings e
   LEFT JOIN memories m ON m.id = e.memory_id
       ORDER BY e.created_at DESC NULLS LAST;
    `;
    const res = await db.query<any>(q);
    if (!res.rows || res.rows.length === 0) {
      console.log('(no embeddings rows)');
      return;
    }

    console.log(`Found ${res.rows.length} embeddings rows`);
    for (const r of res.rows) {
      const dims: string[] = [];
      for (const d of dimCols) {
        if (r[`has_${d}`]) dims.push(d);
      }
      const snippet = (r.text || '').slice(0, 100).replace(/\n/g, ' ');
      console.log(`• emb_id=${r.embedding_id} mem_id=${r.memory_id} dims=[${dims.join(', ')}]`);
      console.log(`  mem_created=${r.memory_created_at} emb_created=${r.embedding_created_at}`);
      console.log(`  text="${snippet}"`);
    }
  } finally {
    await db.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
