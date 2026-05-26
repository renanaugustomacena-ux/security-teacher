#!/usr/bin/env node
/**
 * check-doctrine.mjs — Static enforcement of DOCTRINE.md rules.
 *
 * Implemented gates:
 *   §3.4   meta CSP contains every required directive (sample listed below)
 *   §3.7   meta CSP directive set equals nginx.conf directive set
 *   §3.8   <meta http-equiv="X-Frame-Options" content="DENY"> present in HTML
 *   §3.9   <meta name="referrer" content="no-referrer"> present in HTML
 *   §3.10  no eval / new Function / document.write / setTimeout(string …)
 *          / setInterval(string …) anywhere under js/ except tests
 *   §5.6   every committed file under js/ (excluding tests) is listed in
 *          sw.js STATIC_ASSETS or is a topic data file
 *   §6.1   no third-party JS in vendor/ besides the pinned three.js and fonts
 *   §17.6  meta CSP present in both index.html and 404.html
 *   §17.9  every js/services/*.js has a matching tests/<kebab>.test.js
 *          (added 2026-04-29 in doctrine v1.1.0)
 *   §17.10 when capacitor.config.json exists, validate §22.2 shape, assert
 *          no keystore artifacts in tracked tree (§22.8), assert
 *          .gitignore covers §22.13 build outputs (incl. www/), and assert
 *          scripts/cap-prepare.mjs exists per §22.15. Dormant when the
 *          file is absent. (Added 2026-04-30 in doctrine v1.2.0.)
 *
 * Exit code: 0 on success, 1 on any failure (with summary).
 *
 * Dependency-free; runs on Node 20 with built-ins only.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, resolve } from 'node:path';
import process from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO = resolve(__dirname, '..');

const REQUIRED_CSP_DIRECTIVES = [
  'default-src',
  'script-src',
  'style-src',
  'img-src',
  'media-src',
  'font-src',
  'connect-src',
  'frame-src',
  'worker-src',
  'manifest-src',
  'object-src',
  'base-uri',
  'form-action',
  'frame-ancestors',
  'upgrade-insecure-requests',
  'require-trusted-types-for',
  'trusted-types',
];

const HTML_FILES = ['index.html', '404.html'];

const FORBIDDEN_PATTERNS = [
  { name: 'eval(', re: /\beval\s*\(/ },
  { name: 'new Function(', re: /\bnew\s+Function\s*\(/ },
  { name: 'document.write', re: /\bdocument\.write(?:ln)?\s*\(/ },
  { name: 'setTimeout(string)', re: /\bsetTimeout\s*\(\s*['"`]/ },
  { name: 'setInterval(string)', re: /\bsetInterval\s*\(\s*['"`]/ },
];

// Files that legitimately mention forbidden patterns inside string literals
// for teaching purposes (e.g. ethical-hacking topic shows attack examples).
// Each entry must justify its presence in a comment in this file.
const FORBIDDEN_PATTERN_ALLOWLIST = new Set([
  // ethical-hacking.js shows XSS payloads as quoted *example strings* — they
  // are never executed; they are rendered as text in lesson content.
  'js/topics/data/ethical-hacking.js',
  // ai-engineering.js contains PyTorch model.eval() in code snippet strings.
  'js/topics/data/ai-engineering.js',
  // devsecops.js references eval() in educational text about ESLint rules.
  'js/topics/data/devsecops.js',
]);

const failures = [];
function fail(rule, msg) {
  failures.push({ rule, msg });
}
function info(msg) {
  console.log(`[doctrine] ${msg}`);
}

async function readText(p) {
  return readFile(resolve(REPO, p), 'utf8');
}

function parseCspDirectives(csp) {
  const map = new Map();
  for (const segment of csp.split(';')) {
    const trimmed = segment.trim();
    if (!trimmed) continue;
    const sp = trimmed.indexOf(' ');
    const name = sp === -1 ? trimmed : trimmed.slice(0, sp);
    const value = sp === -1 ? '' : trimmed.slice(sp + 1).trim();
    map.set(name.toLowerCase(), value);
  }
  return map;
}

function extractMetaCsp(html) {
  const m = html.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]*)"\s*\/?>/i);
  return m ? m[1] : null;
}

function extractNginxCsp(conf) {
  const m = conf.match(/add_header\s+Content-Security-Policy\s+"([^"]*)"\s*always\s*;/i);
  return m ? m[1] : null;
}

function extractNetlifyCsp(toml) {
  const m = toml.match(/Content-Security-Policy\s*=\s*"([^"]*)"/i);
  return m ? m[1] : null;
}

async function checkMetaCsp() {
  for (const file of HTML_FILES) {
    const html = await readText(file);
    const csp = extractMetaCsp(html);
    if (!csp) {
      fail('§17.6', `${file}: missing <meta http-equiv="Content-Security-Policy">`);
      continue;
    }
    const dirs = parseCspDirectives(csp);
    for (const required of REQUIRED_CSP_DIRECTIVES) {
      if (!dirs.has(required)) {
        fail('§3.4', `${file}: CSP is missing required directive '${required}'`);
      }
    }
    if (!/<meta\s+http-equiv="X-Frame-Options"\s+content="DENY"\s*\/?>/i.test(html)) {
      fail('§3.8', `${file}: missing <meta http-equiv="X-Frame-Options" content="DENY">`);
    }
    if (!/<meta\s+name="referrer"\s+content="no-referrer"\s*\/?>/i.test(html)) {
      fail('§3.9', `${file}: missing <meta name="referrer" content="no-referrer">`);
    }
  }
}

function compareCspPair(label, a, b, aName, bName) {
  const allKeys = new Set([...a.keys(), ...b.keys()]);
  for (const k of allKeys) {
    if (!a.has(k)) fail('§3.7', `${bName} CSP has '${k}' but ${aName} CSP does not`);
    else if (!b.has(k)) fail('§3.7', `${aName} CSP has '${k}' but ${bName} CSP does not`);
    else if (a.get(k) !== b.get(k)) {
      fail('§3.7', `directive '${k}' differs:\n  ${aName}: ${a.get(k)}\n  ${bName}: ${b.get(k)}`);
    }
  }
}

async function checkCspAlignment() {
  const html = await readText('index.html');
  const conf = await readText('nginx.conf');
  const meta = extractMetaCsp(html);
  const nginx = extractNginxCsp(conf);
  if (!meta || !nginx) return;
  compareCspPair('meta-vs-nginx', parseCspDirectives(meta), parseCspDirectives(nginx), 'meta', 'nginx');

  let toml;
  try {
    toml = await readText('netlify.toml');
  } catch {
    return;
  }
  const netlify = extractNetlifyCsp(toml);
  if (!netlify) return;
  compareCspPair('meta-vs-netlify', parseCspDirectives(meta), parseCspDirectives(netlify), 'meta', 'netlify');
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

async function checkForbiddenPatterns() {
  const jsRoot = resolve(REPO, 'js');
  for await (const file of walk(jsRoot)) {
    const rel = relative(REPO, file);
    if (!rel.endsWith('.js')) continue;
    const content = await readFile(file, 'utf8');
    for (const { name, re } of FORBIDDEN_PATTERNS) {
      if (re.test(content)) {
        if (FORBIDDEN_PATTERN_ALLOWLIST.has(rel)) continue;
        fail('§3.10', `${rel}: forbidden pattern '${name}' detected`);
      }
    }
  }
}

async function checkSwStaticAssets() {
  const sw = await readText('sw.js');
  const blockMatch = sw.match(/STATIC_ASSETS\s*=\s*\[([\s\S]*?)\]/);
  if (!blockMatch) {
    fail('§5.6', 'sw.js does not define STATIC_ASSETS array');
    return;
  }
  const listed = new Set(
    Array.from(blockMatch[1].matchAll(/['"]\.\/([^'"]+)['"]/g)).map((m) => m[1])
  );
  const jsRoot = resolve(REPO, 'js');
  const expected = [];
  for await (const file of walk(jsRoot)) {
    const rel = relative(REPO, file).replace(/\\/g, '/');
    if (!rel.endsWith('.js')) continue;
    expected.push(rel);
  }
  for (const rel of expected) {
    if (!listed.has(rel)) {
      fail('§5.6', `sw.js STATIC_ASSETS missing './${rel}'`);
    }
  }
}

async function checkVendorTree() {
  const vendor = resolve(REPO, 'vendor');
  const allowed = new Set(['integrity.json', 'three-0.170.0.module.js', 'fonts/fonts.css']);
  const fontWoff = /^fonts\/.*\.woff2$/;
  for await (const file of walk(vendor)) {
    const rel = relative(vendor, file).replace(/\\/g, '/');
    if (allowed.has(rel)) continue;
    if (fontWoff.test(rel)) continue;
    fail('§6.1', `vendor/ contains unexpected file '${rel}' (not in allowlist)`);
  }
}

// Convert PascalCase / CamelCase identifier to kebab-case.
// Handles consecutive capitals (e.g. "AIService" → "ai-service",
// "TTSService" → "tts-service", "AuthService" → "auth-service").
function toKebab(s) {
  return s
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

async function checkServiceTestCoverage() {
  const servicesDir = resolve(REPO, 'js/services');
  const testsDir = resolve(REPO, 'tests');
  let serviceFiles = [];
  try {
    serviceFiles = (await readdir(servicesDir)).filter((f) => f.endsWith('.js'));
  } catch {
    return;
  }
  let testFiles = new Set();
  try {
    testFiles = new Set((await readdir(testsDir)).filter((f) => f.endsWith('.test.js')));
  } catch {
    fail('§17.9', 'tests/ directory missing — service test coverage gate cannot run');
    return;
  }
  for (const file of serviceFiles) {
    const base = file.replace(/\.js$/, '');
    const expected = `${toKebab(base)}.test.js`;
    if (!testFiles.has(expected)) {
      fail('§17.9', `js/services/${file} has no matching tests/${expected} (doctrine v1.1.0)`);
    }
  }
}

// §17.10 — APK build gates (dormant until capacitor.config.json exists).
async function checkCapacitorConfig() {
  const path = resolve(REPO, 'capacitor.config.json');
  let raw;
  try {
    raw = await readFile(path, 'utf8');
  } catch {
    return; // dormant — Phase C has not landed yet
  }
  let cfg;
  try {
    cfg = JSON.parse(raw);
  } catch (err) {
    fail('§22.2', `capacitor.config.json is not valid JSON: ${err.message}`);
    return;
  }
  if (cfg.appId !== 'com.knowledgeaio.app') {
    fail(
      '§22.2',
      `capacitor.config.json appId must be 'com.knowledgeaio.app' (got '${cfg.appId}')`
    );
  }
  if (cfg.appName !== 'Knowledge AIO') {
    fail('§22.2', `capacitor.config.json appName must be 'Knowledge AIO' (got '${cfg.appName}')`);
  }
  if (cfg.webDir !== 'www') {
    fail('§22.2', `capacitor.config.json webDir must be 'www' (got '${cfg.webDir}')`);
  }
  if (!cfg.server || cfg.server.hostname !== 'localhost') {
    fail('§22.2', `capacitor.config.json server.hostname must be 'localhost'`);
  }
  if (!cfg.server || cfg.server.androidScheme !== 'https') {
    fail('§22.2', `capacitor.config.json server.androidScheme must be 'https'`);
  }

  // §22.13 — .gitignore must cover Android build outputs once Capacitor exists.
  let gi;
  try {
    gi = await readFile(resolve(REPO, '.gitignore'), 'utf8');
  } catch {
    fail('§22.13', '.gitignore missing — required once capacitor.config.json exists');
    gi = '';
  }
  const required = [
    'android/build/',
    'android/app/build/',
    'android/.gradle/',
    'android/local.properties',
    'www/',
  ];
  for (const line of required) {
    if (!gi.split(/\r?\n/).some((l) => l.trim() === line)) {
      fail('§22.13', `.gitignore missing required entry: '${line}'`);
    }
  }

  // §22.15 — the prepare script must exist alongside capacitor.config.json.
  try {
    const prep = await readFile(resolve(REPO, 'scripts/cap-prepare.mjs'), 'utf8');
    if (!/STATIC_ASSETS/.test(prep)) {
      fail(
        '§22.15',
        'scripts/cap-prepare.mjs exists but does not reference STATIC_ASSETS — must drive www/ from sw.js#STATIC_ASSETS'
      );
    }
  } catch {
    fail(
      '§22.15',
      'scripts/cap-prepare.mjs is required when capacitor.config.json exists (the only sanctioned way to populate www/)'
    );
  }
}

// §22.8 — keystore artifacts must never enter the tracked tree.
async function checkNoKeystoreInRepo() {
  const forbidden = /\.(keystore|jks|p12|pfx)$|release-keystore|signing-key/i;
  // Walk the entire repo *except* node_modules, .git, and android/.gradle.
  async function* walkRepo(dir) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      if (entry.name === '.gradle' || entry.name === 'build') continue; // dev-only
      const full = join(dir, entry.name);
      if (entry.isDirectory()) yield* walkRepo(full);
      else yield full;
    }
  }
  for await (const file of walkRepo(REPO)) {
    const rel = relative(REPO, file).replace(/\\/g, '/');
    if (forbidden.test(rel)) {
      fail('§22.8', `forbidden keystore-shaped artifact in tracked tree: '${rel}'`);
    }
  }
}

await checkMetaCsp();
await checkCspAlignment();
await checkForbiddenPatterns();
await checkSwStaticAssets();
await checkVendorTree();
await checkServiceTestCoverage();
await checkCapacitorConfig();
await checkNoKeystoreInRepo();

if (failures.length === 0) {
  info('OK — all doctrine static gates pass.');
  process.exit(0);
}

console.error(`[doctrine] ${failures.length} violation(s):`);
for (const f of failures) {
  console.error(`  ${f.rule}: ${f.msg}`);
}
process.exit(1);
