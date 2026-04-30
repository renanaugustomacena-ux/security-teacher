#!/usr/bin/env node
/**
 * cap-prepare.mjs — Populate `www/` for `npx cap sync` (Doctrine §22.15).
 *
 * Reads `sw.js#STATIC_ASSETS` to build the asset list, then copies each
 * listed file into `www/` plus `index.html`. This is the only sanctioned
 * way to populate `www/`. Files explicitly excluded:
 *   - sw.js, 404.html (Doctrine §22.3)
 *   - tests/, scripts/, node_modules/, android/, www/, .git/, .github/
 *   - DOCTRINE.md, SECURITY.md, README*.md
 *   - nginx.conf, Dockerfile, docker-compose*.yml
 *   - package.json, package-lock.json, capacitor.config.json
 *   - any keystore-shaped artifact (defense-in-depth for §22.8)
 *
 * Dependency-free; runs on Node 20 with built-ins only.
 */
import { readFile, mkdir, copyFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, relative } from 'node:path';
import process from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO = resolve(__dirname, '..');
const WWW = resolve(REPO, 'www');

const KEYSTORE_RE = /\.(keystore|jks|p12|pfx)$|release-keystore|signing-key/i;

// Files listed in STATIC_ASSETS for the web SW but NOT shipped in the APK
// (Doctrine §22.3 — APK has no SPA-redirect, no SW, no GH-Pages-only paths).
const APK_EXCLUDE = new Set(['404.html', 'sw.js']);

async function readStaticAssets() {
  const sw = await readFile(resolve(REPO, 'sw.js'), 'utf8');
  const block = sw.match(/STATIC_ASSETS\s*=\s*\[([\s\S]*?)\]/);
  if (!block) {
    throw new Error('sw.js does not define STATIC_ASSETS array (Doctrine §5.6)');
  }
  return Array.from(block[1].matchAll(/['"]\.\/([^'"]+)['"]/g))
    .map((m) => m[1])
    .filter((rel) => rel.length > 0 && !APK_EXCLUDE.has(rel));
}

async function copyOne(rel) {
  if (KEYSTORE_RE.test(rel)) {
    throw new Error(`refusing to bundle keystore-shaped path: ${rel} (Doctrine §22.8)`);
  }
  const src = resolve(REPO, rel);
  const dst = join(WWW, rel);
  await mkdir(dirname(dst), { recursive: true });
  await copyFile(src, dst);
}

async function main() {
  process.stdout.write(`[cap-prepare] wiping ${relative(REPO, WWW)}/\n`);
  await rm(WWW, { recursive: true, force: true });
  await mkdir(WWW, { recursive: true });

  const assets = await readStaticAssets();
  process.stdout.write(`[cap-prepare] copying ${assets.length} STATIC_ASSETS + index.html\n`);

  await copyOne('index.html');
  for (const rel of assets) {
    await copyOne(rel);
  }

  process.stdout.write(`[cap-prepare] OK — www/ ready for 'npx cap sync android'\n`);
}

main().catch((err) => {
  process.stderr.write(`[cap-prepare] FAILED: ${err.message}\n`);
  process.exit(1);
});
