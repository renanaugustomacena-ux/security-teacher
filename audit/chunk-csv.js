#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Split a per-domain CSV into row-balanced chunks for retry agents.
 *
 * Usage: node chunk-csv.js <domain> <n_chunks>
 * Writes: audit/per-domain/<domain>.chunk1.csv, .chunk2.csv, ...
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const [, , domain, nStr] = process.argv;
if (!domain || !nStr) {
  console.error('usage: chunk-csv.js <domain> <n_chunks>');
  process.exit(1);
}
const n = parseInt(nStr, 10);

const src = join(import.meta.dirname, 'per-domain', `${domain}.csv`);
const text = readFileSync(src, 'utf8');
const lines = text.split('\n').filter(Boolean);
const header = lines[0];
const rows = lines.slice(1);

// Group rows by (level, lesson, english) so multi-flag items stay in one chunk.
const groups = new Map();
for (const row of rows) {
  // Parse first 4 quoted/unquoted fields.
  const m = row.match(/^"([^"]*)",([^,]*),"([^"]*)","((?:[^"]|"")*)"/);
  if (!m) {
    console.warn('unparseable row:', row.slice(0, 100));
    continue;
  }
  const key = `${m[2]}|${m[3]}|${m[4]}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(row);
}

const groupKeys = [...groups.keys()];
const perChunk = Math.ceil(groupKeys.length / n);

for (let i = 0; i < n; i++) {
  const slice = groupKeys.slice(i * perChunk, (i + 1) * perChunk);
  if (slice.length === 0) continue;
  const chunkRows = slice.flatMap((k) => groups.get(k));
  const out = join(import.meta.dirname, 'per-domain', `${domain}.chunk${i + 1}.csv`);
  writeFileSync(out, `${[header, ...chunkRows].join('\n')}\n`);
  console.log(`${domain}.chunk${i + 1}.csv  ${slice.length} items / ${chunkRows.length} rows`);
}
