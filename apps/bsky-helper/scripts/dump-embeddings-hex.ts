// @ts-nocheck
/**
 * Dump embedding vectors as raw hex.
 *
 * Reads from local PGlite, supports wide dim_* schema, and packs values
 * into float32 (default) or float64 before converting to hex.
 *
 * Usage examples:
 *   bun run scripts/dump-embeddings-hex.ts
 *   bun run scripts/dump-embeddings-hex.ts --dtype f64 --limit 2
 *   bun run scripts/dump-embeddings-hex.ts --dim 768 --limit 5 --truncate 128
 */
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import path from 'node:path';

function getArg(name: string, def?: string) {
  const i = process.argv.indexOf(`--${name}`);
  if (i >= 0 && process.argv[i + 1]) return process.argv[i + 1];
  return def;
}

function packToHex(values: number[], dtype: 'f32' | 'f64' = 'f32'): string {
  if (!values || values.length === 0) return '';
  const bytesPer = dtype === 'f32' ? 4 : 8;
  const buf = new ArrayBuffer(values.length * bytesPer);
  const view = new DataView(buf);
  for (let i = 0; i < values.length; i++) {
    const v = Number(values[i]);
    if (dtype === 'f32') view.setFloat32(i * 4, v, true);
    else view.setFloat64(i * 8, v, true);
  }
  const u8 = new Uint8Array(buf);
  let hex = '';
  for (let i = 0; i < u8.length; i++) {
    const h = u8[i].toString(16).padStart(2, '0');
    hex += h;
  }
  return hex;
}

async function main() {
  const dtype = (getArg('dtype', 'f32') as 'f32' | 'f64');
  const limit = parseInt(getArg('limit', '5')!, 10);
  const dimPref = getArg('dim'); // e.g. "768" or full 'dim_768'
  const truncate = parseInt(getArg('truncate', '256')!, 10); // hex chars to print

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
    const embCols = await db.query<{ column_name: string; data_type: string; udt_name: string }>(
      "SELECT column_name, data_type, udt_name FROM information_schema.columns WHERE table_schema='public' AND table_name='embeddings'"
    );
    if (embCols.rows.length === 0) {
      console.log("No 'embeddings' table found.");
      return;
    }
    const embColNames = embCols.rows.map((r) => r.column_name);
    const dimMeta = embCols.rows.filter((r) => r.column_name.startsWith('dim_'));
    // Choose only JSONB-based dimensions for PGlite compatibility
    const jsonDims = dimMeta
      .filter((r) => (r.data_type === 'json' || r.data_type === 'jsonb' || r.udt_name === 'jsonb'))
      .map((r) => r.column_name);
    const preferredDim = dimPref
      ? (dimPref.startsWith('dim_') ? dimPref : `dim_${dimPref}`)
      : null;
    const targetOrder = preferredDim && jsonDims.includes(preferredDim)
      ? [preferredDim, ...jsonDims.filter((d) => d !== preferredDim)]
      : jsonDims;

    if (targetOrder.length === 0) {
      console.log("No JSONB-based dim_* columns found; dumping raw vectors is not supported in PGlite when columns use pgvector.\nTip: switch to Postgres+pgvector or add a JSONB mirror at write time for debugging.");
      return;
    }

    // Build column selection for vector text and dimension label
    let vecSel = '';
    let dimSel = '';
    const casesText = targetOrder
      .map((c) => `WHEN e.${c} IS NOT NULL THEN e.${c}::text`)
      .join(' ');
    const casesDim = targetOrder
      .map((c) => `WHEN e.${c} IS NOT NULL THEN '${c}'`)
      .join(' ');
    vecSel = `(CASE ${casesText} ELSE NULL END)`;
    dimSel = `(CASE ${casesDim} ELSE NULL END)`;

    const q = `
      SELECT m.id AS memory_id,
             ${dimSel} AS dim,
             ${vecSel} AS vec_text,
             (m.content->>'text') AS text,
             m."createdAt" AS created_at
        FROM memories m
   LEFT JOIN embeddings e ON e.memory_id = m.id
       WHERE ${vecSel} IS NOT NULL
       ORDER BY m."createdAt" DESC NULLS LAST
       LIMIT ${limit};
    `;

    const res = await db.query<{
      memory_id: string;
      dim: string | null;
      vec_text: string | null;
      text: string | null;
      created_at: string | null;
    }>(q);

    if (!res.rows || res.rows.length === 0) {
      console.log('(no rows with embeddings)');
      return;
    }

    for (const row of res.rows) {
      const { memory_id, dim, vec_text, text, created_at } = row;
      let hex = '';
      let length = 0;
      try {
        const arr: number[] = vec_text ? JSON.parse(vec_text) : [];
        length = arr.length;
        hex = packToHex(arr, dtype);
      } catch (e) {
        hex = '(parse error)';
      }
      const shown = truncate > 0 && typeof hex === 'string' ? hex.slice(0, truncate) + (hex.length > truncate ? '…' : '') : hex;
      const snippet = (text || '').slice(0, 80).replace(/\n/g, ' ');
      console.log(`• id=${memory_id} dim=${dim} len=${length} dtype=${dtype} created_at=${created_at}`);
      console.log(`  text="${snippet}"`);
      console.log(`  hex=${shown}`);
    }
  } finally {
    await db.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
