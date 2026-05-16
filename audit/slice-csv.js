#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Slice exercise-quality-flags.csv into one file per topic in audit/per-domain/.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const csvPath = join(import.meta.dirname, 'exercise-quality-flags.csv');
const outDir = join(import.meta.dirname, 'per-domain');
mkdirSync(outDir, { recursive: true });

const text = readFileSync(csvPath, 'utf8');
const lines = text.split('\n').filter(Boolean);
const header = lines[0];
const rows = lines.slice(1);

const byTopic = new Map();
for (const row of rows) {
  // crude CSV parse: topicId is first quoted field
  const m = row.match(/^"([^"]+)"/);
  if (!m) continue;
  const topic = m[1];
  if (!byTopic.has(topic)) byTopic.set(topic, []);
  byTopic.get(topic).push(row);
}

for (const [topic, topicRows] of byTopic) {
  const out = join(outDir, `${topic}.csv`);
  writeFileSync(out, `${[header, ...topicRows].join('\n')}\n`);
  console.log(`${topic.padEnd(24)} ${topicRows.length} flags  → ${out}`);
}
