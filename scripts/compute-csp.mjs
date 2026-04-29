#!/usr/bin/env node
/**
 * compute-csp.mjs — Compute SHA-256 hashes for inline <script> blocks
 *
 * Doctrine §3.2, §17.6.
 *
 * Modes:
 *   --check        Verify the meta-CSP <script-src> contains the correct hashes
 *                  for every inline script in index.html and 404.html. Exit 1 on drift.
 *   --print        Print the CSP directive line(s) that would match.
 *   --patch        Rewrite each file's <meta http-equiv="Content-Security-Policy">
 *                  with current hashes (use locally; CI runs --check).
 *
 * The script is intentionally dependency-free (uses Node's built-in `crypto`)
 * so it can run in CI without an `npm ci` step.
 */
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import process from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '..');

const FILES = ['index.html', '404.html'];

const SCRIPT_TAG_RE = /<script(?<attrs>\s[^>]*)?>(?<body>[\s\S]*?)<\/script>/g;
const HTML_COMMENT_RE = /<!--[\s\S]*?-->/g;
// Hardcoded to double-quoted content="..." so that single quotes inside the
// CSP value (e.g. 'self', 'sha256-...') do not terminate the match.
const META_CSP_RE =
  /(<meta\s+http-equiv="Content-Security-Policy"\s+content=")(?<csp>[^"]*)("\s*\/?>)/i;

function sha256Base64(content) {
  return createHash('sha256').update(content, 'utf8').digest('base64');
}

/**
 * Strip HTML comments before scanning for <script>. A comment that mentions
 * `<script>` in prose would otherwise hijack the regex (mismatching against a
 * later `</script>` and producing a bogus hash for an enormous "body").
 * Length is preserved — replace each comment with same-length whitespace —
 * so any later character offsets we report still line up with the source.
 */
function stripComments(html) {
  return html.replace(HTML_COMMENT_RE, (m) => m.replace(/[^\n]/g, ' '));
}

function extractInlineScripts(html) {
  const sanitized = stripComments(html);
  const hashes = [];
  for (const match of sanitized.matchAll(SCRIPT_TAG_RE)) {
    const attrs = match.groups?.attrs || '';
    const body = match.groups?.body || '';
    if (/\bsrc\s*=/.test(attrs)) continue;
    if (body.trim().length === 0) continue;
    hashes.push({
      attrs: attrs.trim(),
      hash: `sha256-${sha256Base64(body)}`,
      preview: body.slice(0, 60).replace(/\s+/g, ' ').trim(),
    });
  }
  return hashes;
}

function buildScriptSrc(hashes) {
  const quoted = hashes.map((h) => `'${h.hash}'`).join(' ');
  return `script-src 'self' ${quoted} https://accounts.google.com`;
}

function patchCspWithHashes(csp, hashes) {
  const newScriptSrc = buildScriptSrc(hashes);
  if (!/(^|;\s*)script-src\s+/i.test(csp)) {
    return `${csp}; ${newScriptSrc}`;
  }
  return csp.replace(/(^|;\s*)script-src\s+[^;]+/i, (_, pre) => `${pre}${newScriptSrc}`);
}

function findMetaCsp(html) {
  const m = html.match(META_CSP_RE);
  if (!m) return null;
  return { full: m[0], csp: m.groups.csp };
}

function writeMetaCsp(html, newCsp) {
  return html.replace(META_CSP_RE, (_, open, _csp, close) => `${open}${newCsp}${close}`);
}

async function loadFile(name) {
  const path = resolve(REPO_ROOT, name);
  const html = await readFile(path, 'utf8');
  return { name, path, html, inline: extractInlineScripts(html), meta: findMetaCsp(html) };
}

const mode = (process.argv[2] || '--check').replace(/^--?/, '');

if (!['check', 'print', 'patch'].includes(mode)) {
  console.error(`unknown mode: ${mode}. Use --check, --print, or --patch.`);
  process.exit(2);
}

// Collect inline-script hashes across ALL HTML files and patch every meta-CSP
// with the union. Doctrine §3.7 requires the meta CSP and the nginx CSP to be
// byte-equivalent; serving the same script-src to every HTML file is the
// simplest way to satisfy that without splitting the nginx header per-path.
const loaded = await Promise.all(FILES.map((f) => loadFile(f)));

const allHashes = [];
const seen = new Set();
for (const f of loaded) {
  for (const h of f.inline) {
    if (seen.has(h.hash)) continue;
    seen.add(h.hash);
    allHashes.push(h);
  }
}

const expectedScriptSrc = buildScriptSrc(allHashes);

if (mode === 'print') {
  console.log('# union of inline-script hashes across all HTML files:');
  for (const h of allHashes) console.log(`  ${h.hash}  // ${h.preview}…`);
  console.log(`\n${expectedScriptSrc}`);
  process.exit(0);
}

const failures = [];
for (const f of loaded) {
  if (!f.meta) {
    if (mode === 'patch') {
      console.error(
        `${f.name}: missing <meta http-equiv="Content-Security-Policy"> stub — cannot patch`
      );
      process.exit(1);
    }
    failures.push({ name: f.name, reason: 'no-meta-csp' });
    continue;
  }
  const currentScriptSrc = (f.meta.csp.match(/(?:^|;\s*)script-src\s+[^;]+/i) || [''])[0]
    .replace(/^;\s*/, '')
    .trim();
  const ok = currentScriptSrc === expectedScriptSrc;
  if (!ok) {
    if (mode === 'patch') {
      const patched = patchCspWithHashes(f.meta.csp, allHashes);
      await writeFile(f.path, writeMetaCsp(f.html, patched), 'utf8');
      console.log(`[csp-patch] updated ${f.name}`);
    } else {
      failures.push({ name: f.name, expectedScriptSrc, currentScriptSrc });
    }
  } else if (mode === 'patch') {
    console.log(`[csp-patch] ${f.name} already correct`);
  }
}

if (mode === 'check') {
  if (failures.length === 0) {
    console.log(
      `[csp-check] OK — ${FILES.length} files share ${allHashes.length} inline-script hashes.`
    );
    process.exit(0);
  }
  for (const r of failures) {
    console.error(`[csp-check] FAIL ${r.name}`);
    if (r.reason) console.error(`  reason: ${r.reason}`);
    if (r.expectedScriptSrc) console.error(`  expected: ${r.expectedScriptSrc}`);
    if (r.currentScriptSrc) console.error(`  current:  ${r.currentScriptSrc}`);
  }
  console.error('\nFix: npm run csp:patch');
  process.exit(1);
}
