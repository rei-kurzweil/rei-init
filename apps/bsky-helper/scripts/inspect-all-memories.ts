// @ts-nocheck
/**
 * Print ALL memories (paged) with embedding dimension if present.
 * Safe for PGlite and Postgres; avoids heavy type ops.
 *
 * Usage:
 *   bun run scripts/inspect-all-memories.ts
 *   bun run scripts/inspect-all-memories.ts --page-size 200
 */
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import path from 'node:path';

function getArg(name: string, def?: string) {
  const i = process.argv.indexOf(`--${name}`);
  if (i >= 0 && process.argv[i + 1]) return process.argv[i + 1];
  return def;
}

async function main() {
  const pageSize = parseInt(getArg('page-size', '200')!, 10);

  // Resolve data dir
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
    // Detect schema for joined view
    const memCols = await db.query<{ column_name: string }>(
      "SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='memories'"
    );
    const embCols = await db.query<{ column_name: string }>(
      "SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='embeddings'"
    );
    if (memCols.rows.length === 0) {
      console.log("No 'memories' table found.");
      return;
    }

    const memColNames = memCols.rows.map((r) => r.column_name);
    const embColNames = embCols.rows.map((r) => r.column_name);

    const memIdCol = memColNames.includes('id') ? 'id' : null;
    const memContentCol = memColNames.includes('content') ? 'content' : null;
    let memCreatedCol: string | null = null;
    if (memColNames.includes('created_at')) memCreatedCol = 'created_at';
    else if (memColNames.includes('createdAt')) memCreatedCol = '"createdAt"';

    const hasEmbeddings = embCols.rows.length > 0;
    const hasSingleEmbedding = hasEmbeddings && embColNames.includes('embedding');
    const dimCols = hasEmbeddings ? embColNames.filter((n) => n.startsWith('dim_')) : [];

    if (!memIdCol || !memContentCol) {
      console.log('Missing required columns in memories.');
      return;
    }

    console.log('Columns:', { memories: memColNames, embeddings: embColNames });

    let offset = 0;
    let printed = 0;
    while (true) {
      let q: string;
      if (!hasEmbeddings) {
        // Just memories
        const createdSel = memCreatedCol ? memCreatedCol : 'NULL';
        q = `
          SELECT m.${memIdCol} AS id,
                 ${createdSel} AS created_at,
                 (m.${memContentCol}->>'text') AS text,
                 NULL::text AS emb_dim
            FROM memories m
           ORDER BY ${createdSel} DESC NULLS LAST
           LIMIT ${pageSize} OFFSET ${offset};
        `;
      } else if (hasSingleEmbedding) {
        // memories + embeddings.embedding (no length calc)
        const createdSel = memCreatedCol ? memCreatedCol : 'NULL';
        q = `
          SELECT m.${memIdCol} AS id,
                 ${createdSel} AS created_at,
                 (m.${memContentCol}->>'text') AS text,
                 'embedding'::text AS emb_dim
            FROM memories m
       LEFT JOIN embeddings e ON e.memory_id = m.${memIdCol}
           ORDER BY ${createdSel} DESC NULLS LAST
           LIMIT ${pageSize} OFFSET ${offset};
        `;
      } else {
        // memories + wide dim_* embeddings (flag only)
        const createdSel = memCreatedCol ? memCreatedCol : 'NULL';
        const flagSelects = dimCols
          .map((c) => `CASE WHEN e.${c} IS NULL THEN false ELSE true END AS has_${c}`)
          .join(',\n                 ');
        const firstNonNullDim = dimCols
          .map((c) => `WHEN has_${c} THEN '${c}'`)
          .join(' ');
        q = `
          WITH joined AS (
            SELECT m.${memIdCol} AS id,
                   ${createdSel} AS created_at,
                   (m.${memContentCol}->>'text') AS text,
                   ${flagSelects}
              FROM memories m
         LEFT JOIN embeddings e ON e.memory_id = m.${memIdCol}
          )
          SELECT id,
                 created_at,
                 text,
                 CASE ${firstNonNullDim} ELSE NULL END AS emb_dim
            FROM joined
           ORDER BY created_at DESC NULLS LAST
           LIMIT ${pageSize} OFFSET ${offset};
        `;
      }

      const res = await db.query<any>(q);
      if (!res.rows || res.rows.length === 0) break;

      for (const r of res.rows) {
        const created = r.created_at ?? '';
        const summaryText = (r.text || '').slice(0, 80).replace(/\n/g, ' ');
        console.log(`• id=${r.id} created_at=${created} emb_dim=${r.emb_dim ?? 'null'} text="${summaryText}"`);
        printed++;
      }

      offset += res.rows.length;
    }

    console.log(`\nTotal printed: ${printed}`);
  } finally {
    await db.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
