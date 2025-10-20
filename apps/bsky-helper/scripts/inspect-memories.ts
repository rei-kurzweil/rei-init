// @ts-nocheck
/**
 * Inspect stored memories and show embedding presence/length.
 *
 * Usage:
 *   bun run scripts/inspect-memories.ts
 *
 * Notes:
 * - Targets the default local PGlite data dir used by this app.
 * - If you use an external Postgres via POSTGRES_URL, see the SQL printed at the end.
 */
import { PGlite } from '@electric-sql/pglite';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  // Resolve data dir: env override or project default
  const cwd = process.cwd();
  // Try multiple plausible locations: env override, CWD, script directory
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
    // List public tables to help orient
    const tables = await db.query<{ table_name: string }>(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name"
    );
    console.log('\nPublic tables:', tables.rows.map((r) => r.table_name).join(', ') || '(none)');

    // Describe columns for messages if present
    const cols = await db.query<{ column_name: string; data_type: string; udt_name: string }>(
      "SELECT column_name, data_type, udt_name FROM information_schema.columns WHERE table_name='messages' ORDER BY ordinal_position"
    );
    let targetTable = 'messages';
    if (cols.rows.length === 0) {
      console.log("\nNo 'messages' table found. Searching for a memory table with content+embedding...");
      const guess = await db.query<{ table_name: string }>(
        "SELECT table_name FROM information_schema.columns WHERE table_schema='public' AND column_name IN ('content','embedding') GROUP BY table_name HAVING COUNT(*)=2 ORDER BY table_name"
      );
      if (guess.rows.length === 0) {
        console.log('No single table contains both content and embedding. Trying joined schema (memories + embeddings)...');

        // Check existence and columns of memories + embeddings
        const memCols = await db.query<{ column_name: string }>(
          "SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='memories'"
        );
        const embCols = await db.query<{ column_name: string }>(
          "SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='embeddings'"
        );

        if (memCols.rows.length === 0 || embCols.rows.length === 0) {
          console.log("Either 'memories' or 'embeddings' table is missing; cannot proceed.");
          return;
        }

        const memColNames = memCols.rows.map((r) => r.column_name);
        const embColNames = embCols.rows.map((r) => r.column_name);

        const memIdCol = memColNames.includes('id') ? 'id' : null;
        let memCreatedCol: string | null = null;
        if (memColNames.includes('created_at')) {
          memCreatedCol = 'created_at';
        } else if (memColNames.includes('createdAt')) {
          memCreatedCol = '"createdAt"'; // quoted due to camelCase
        } else {
          memCreatedCol = null;
        }
        const memContentCol = memColNames.includes('content') ? 'content' : null;
        const embVectorCol = embColNames.includes('embedding') ? 'embedding' : null;
        const embFkCol = embColNames.includes('memory_id')
          ? 'memory_id'
          : embColNames.includes('memoryId')
          ? 'memoryId'
          : null;

        console.log("\nDetected schema:");
        console.log(`- memories columns: ${memColNames.join(', ')}`);
        console.log(`- embeddings columns: ${embColNames.join(', ')}`);

        // If embeddings table does not have a single 'embedding' column, try dim_* columns
        const hasSingleEmbedding = embColNames.includes('embedding');
        if (!memIdCol || !embFkCol) {
          console.log('Missing required ID/foreign key columns to join memories and embeddings.');
          return;
        }

        // Show counts
        const memCount = await db.query<{ count: string }>('SELECT COUNT(*)::text as count FROM memories');
        const embCount = await db.query<{ count: string }>('SELECT COUNT(*)::text as count FROM embeddings');
        console.log(`\nRow counts: memories=${memCount.rows[0]?.count ?? '0'}, embeddings=${embCount.rows[0]?.count ?? '0'}`);

        const createdSel = memCreatedCol ? `${memCreatedCol}` : 'NULL';
        const textSel = memContentCol ? `(m.${memContentCol}->>'text')` : 'NULL';

        let q: string;
        if (hasSingleEmbedding) {
          // Simple case: single embedding column
          q = `
            SELECT
              m.${memIdCol} AS id,
              ${createdSel} AS created_at,
              ${textSel} AS text,
              pg_typeof(e.embedding)::text AS emb_type,
              CASE
                WHEN e.embedding IS NULL THEN NULL
                WHEN pg_typeof(e.embedding)::text = 'vector' THEN NULL
                ELSE array_length(e.embedding, 1)
              END AS emb_len
            FROM memories m
            LEFT JOIN embeddings e ON e.${embFkCol} = m.${memIdCol}
            ORDER BY ${createdSel} DESC NULLS LAST
            LIMIT 20;
          `;
        } else {
          // Wide schema: multiple dim_* columns; compute lengths dynamically
          const dimCols = embColNames.filter((n) => n.startsWith('dim_'));
          if (dimCols.length === 0) {
            console.log("No 'embedding' column and no 'dim_*' columns found in 'embeddings' table.");
            return;
          }

          // Build select fragments for each dim column: flags only, to avoid type-specific functions
          const flagSelects = dimCols
            .map((c) => `CASE WHEN e.${c} IS NULL THEN false ELSE true END AS has_${c}`)
            .join(',\n              ');

          // Pick first non-null dim name
          const firstNonNullDim = dimCols
            .map((c) => `WHEN has_${c} THEN '${c}'`)
            .join(' ');

          q = `
            WITH joined AS (
              SELECT
                m.${memIdCol} AS id,
                ${createdSel} AS created_at,
                ${textSel} AS text,
                ${flagSelects}
              FROM memories m
              LEFT JOIN embeddings e ON e.${embFkCol} = m.${memIdCol}
            )
            SELECT
              id,
              created_at,
              text,
              CASE ${firstNonNullDim} ELSE NULL END AS emb_dim,
              NULL::int AS emb_len
            FROM joined
            ORDER BY created_at DESC NULLS LAST
            LIMIT 20;
          `;
        }

        const res = await db.query<any>(q);

        console.log(`\nLatest rows (memories ⟕ embeddings) (up to 20):`);
        if (res.rows.length === 0) {
          console.log('(no rows)');
        } else {
          for (const r of res.rows) {
            const created = r.created_at ?? '';
            const summaryText = (r.text || '').slice(0, 80).replace(/\n/g, ' ');
            const dim = r.emb_dim ?? r.emb_type ?? 'null';
            const len = r.emb_len ?? 'null';
            console.log(`• id=${r.id} created_at=${created} emb_dim=${dim} emb_len=${len} text="${summaryText}"`);
          }
        }
        return;
      }
      targetTable = guess.rows[0].table_name;
    } else {
      console.log("\n'messages' columns:");
      for (const c of cols.rows) {
        console.log(`- ${c.column_name} :: ${c.data_type}${c.udt_name ? ` (${c.udt_name})` : ''}`);
      }
    }

    // Describe chosen table
    const tcols = await db.query<{ column_name: string; data_type: string; udt_name: string }>(
      `SELECT column_name, data_type, udt_name FROM information_schema.columns WHERE table_name='${targetTable}' ORDER BY ordinal_position`
    );
    console.log(`\nUsing table '${targetTable}' with columns:`);
    for (const c of tcols.rows) {
      console.log(`- ${c.column_name} :: ${c.data_type}${c.udt_name ? ` (${c.udt_name})` : ''}`);
    }

    // Fetch a few recent rows and report embedding details
    const q = `
      SELECT
        id,
        created_at,
        (content->>'text') AS text,
        pg_typeof(embedding)::text AS emb_type,
        CASE
          WHEN embedding IS NULL THEN NULL
          WHEN pg_typeof(embedding)::text = 'vector' THEN NULL -- pgvector length detection not portable in PGlite
          ELSE array_length(embedding, 1)
        END AS emb_len
      FROM ${targetTable}
      ORDER BY created_at DESC NULLS LAST
      LIMIT 20;
    `;
    const res = await db.query<{
      id: string;
      created_at: string | number | null;
      text: string | null;
      emb_type: string | null;
      emb_len: number | null;
    }>(q);

    console.log(`\nLatest rows from '${targetTable}' (up to 20):`);
    if (res.rows.length === 0) {
      console.log('(no rows)');
    } else {
      for (const r of res.rows) {
        const created = r.created_at ?? '';
        const summaryText = (r.text || '').slice(0, 80).replace(/\n/g, ' ');
        console.log(
          `• id=${r.id} created_at=${created} emb_type=${r.emb_type ?? 'null'} emb_len=${r.emb_len ?? 'null'} text="${summaryText}"`
        );
      }
    }
  } finally {
    await db.close();
  }

  // Helpful SQL for external Postgres users
  console.log('\nIf you are using external Postgres (POSTGRES_URL), you can run this SQL:');
  console.log('--- SQL (psql) ---');
  console.log(
    `\nSELECT id,
       created_at,
       (content->>'text') AS text,
       pg_typeof(embedding)::text AS emb_type,
       CASE WHEN pg_typeof(embedding)::text = 'vector' THEN NULL ELSE array_length(embedding, 1) END AS emb_len
     FROM messages
     ORDER BY created_at DESC NULLS LAST
     LIMIT 20;\n`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
