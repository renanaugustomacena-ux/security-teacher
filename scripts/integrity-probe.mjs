#!/usr/bin/env node
/**
 * integrity-probe.mjs — Production deploy integrity check.
 *
 * Doctrine §7.3, §18.5.
 *
 * Replaces the Netlify scheduled function `integrity-check.mts`. Pulled by
 * the integrity.yml workflow on a weekly cron. Reads vendor/integrity.json,
 * fetches each pinned asset from the live deploy, and compares sha256.
 *
 * Also fetches `${base}/` (the index) and asserts the response body
 * contains the required CSP / X-Frame-Options / referrer meta tags. We
 * cannot inspect response *headers* on GitHub Pages (no header control), so
 * we verify the *meta-tag* equivalents that the doctrine requires.
 *
 * Output: a JSON report on stdout. Exit code is 0 even on drift — the
 * workflow uses the `ok` field to decide whether to open an issue.
 */
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import process from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO = resolve(__dirname, '..');

const REQUIRED_META = [
  { key: 'csp', re: /<meta\s+http-equiv="Content-Security-Policy"\s+content="[^"]+"\s*\/?>/i },
  { key: 'x-frame-options', re: /<meta\s+http-equiv="X-Frame-Options"\s+content="DENY"\s*\/?>/i },
  { key: 'referrer', re: /<meta\s+name="referrer"\s+content="no-referrer"\s*\/?>/i },
];

const base = (process.argv[2] || '').replace(/\/+$/, '');
if (!base) {
  console.error('usage: integrity-probe.mjs <base-url>');
  process.exit(2);
}

async function sha256Hex(buf) {
  return createHash('sha256').update(Buffer.from(buf)).digest('hex');
}

async function checkAsset(path, expected) {
  const url = `${base}${path}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    const buf = await res.arrayBuffer();
    const actual = await sha256Hex(buf);
    return { asset: path, expected, actual, status: res.status, ok: res.ok && actual === expected };
  } catch (err) {
    return { asset: path, expected, actual: '', status: 0, ok: false, error: String(err) };
  }
}

async function checkIndexMeta() {
  try {
    const res = await fetch(`${base}/`, { cache: 'no-store', redirect: 'follow' });
    const html = await res.text();
    return REQUIRED_META.map(({ key, re }) => ({
      header: key,
      present: re.test(html),
      sample: '',
    }));
  } catch (err) {
    return REQUIRED_META.map(({ key }) => ({ header: key, present: false, sample: String(err) }));
  }
}

const integrity = JSON.parse(await readFile(resolve(REPO, 'vendor/integrity.json'), 'utf8'));
const entries = Object.entries(integrity.assets);

const assets = await Promise.all(entries.map(([p, h]) => checkAsset(p, h)));
const headers = await checkIndexMeta();
const ok = assets.every((a) => a.ok) && headers.every((h) => h.present);

const report = {
  at: new Date().toISOString(),
  base,
  assets,
  headers,
  ok,
};

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
