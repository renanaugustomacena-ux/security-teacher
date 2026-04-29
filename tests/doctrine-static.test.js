/**
 * Doctrine static gates — Vitest mirror of scripts/check-doctrine.mjs.
 *
 * Tests the same assertions the CI gate runs, so a regression caught in the
 * editor's test runner is caught locally before the push. (Doctrine §17.)
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO = resolve(__dirname, '..');

const REQUIRED_DIRECTIVES = [
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

function readRepo(p) {
  return readFileSync(resolve(REPO, p), 'utf8');
}

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function extractMetaCsp(html) {
  const m = html.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]*)"\s*\/?>/i);
  return m ? m[1] : null;
}

function parseDirectives(csp) {
  const map = new Map();
  for (const seg of csp.split(';')) {
    const t = seg.trim();
    if (!t) continue;
    const sp = t.indexOf(' ');
    map.set(
      (sp === -1 ? t : t.slice(0, sp)).toLowerCase(),
      sp === -1 ? '' : t.slice(sp + 1).trim()
    );
  }
  return map;
}

describe('Doctrine §3 — CSP & Trusted Types', () => {
  for (const file of ['index.html', '404.html']) {
    describe(file, () => {
      const html = readRepo(file);
      const csp = extractMetaCsp(html);

      it('has a meta Content-Security-Policy', () => {
        expect(csp).toBeTruthy();
      });

      it('contains every required directive', () => {
        const dirs = parseDirectives(csp);
        for (const required of REQUIRED_DIRECTIVES) {
          expect(dirs.has(required), `missing directive: ${required}`).toBe(true);
        }
      });

      it('script-src enumerates inline-script hashes (no unsafe-inline)', () => {
        const dirs = parseDirectives(csp);
        const scriptSrc = dirs.get('script-src') || '';
        expect(scriptSrc).not.toMatch(/'unsafe-inline'/);
        expect(scriptSrc).not.toMatch(/'unsafe-eval'/);
        expect(scriptSrc).toMatch(/sha256-/);
      });

      it('object-src is none', () => {
        expect(parseDirectives(csp).get('object-src')).toBe("'none'");
      });

      it('frame-ancestors is none', () => {
        expect(parseDirectives(csp).get('frame-ancestors')).toBe("'none'");
      });

      it('has X-Frame-Options DENY meta tag', () => {
        expect(html).toMatch(/<meta\s+http-equiv="X-Frame-Options"\s+content="DENY"\s*\/?>/i);
      });

      it('has referrer no-referrer meta tag', () => {
        expect(html).toMatch(/<meta\s+name="referrer"\s+content="no-referrer"\s*\/?>/i);
      });
    });
  }

  it('§3.7 nginx and meta CSP have identical directive sets', () => {
    const html = readRepo('index.html');
    const conf = readRepo('nginx.conf');
    const meta = extractMetaCsp(html);
    const nginx = (conf.match(/add_header\s+Content-Security-Policy\s+"([^"]*)"\s*always/i) ||
      [])[1];
    expect(meta).toBeTruthy();
    expect(nginx).toBeTruthy();
    const a = parseDirectives(meta);
    const b = parseDirectives(nginx);
    expect([...a.keys()].sort()).toEqual([...b.keys()].sort());
    for (const [k, v] of a) {
      expect(b.get(k), `directive ${k} differs`).toBe(v);
    }
  });
});

describe('Doctrine §3.10 — Forbidden runtime sinks', () => {
  const ALLOWLIST = new Set(['js/topics/data/ethical-hacking.js']);
  const PATTERNS = [
    { name: 'eval(', re: /\beval\s*\(/ },
    { name: 'new Function(', re: /\bnew\s+Function\s*\(/ },
    { name: 'document.write', re: /\bdocument\.write(?:ln)?\s*\(/ },
    { name: 'setTimeout(string)', re: /\bsetTimeout\s*\(\s*['"`]/ },
    { name: 'setInterval(string)', re: /\bsetInterval\s*\(\s*['"`]/ },
  ];

  it('no forbidden sinks under js/', () => {
    const violations = [];
    for (const file of walk(resolve(REPO, 'js'))) {
      if (!file.endsWith('.js')) continue;
      const rel = relative(REPO, file).replace(/\\/g, '/');
      if (ALLOWLIST.has(rel)) continue;
      const content = readFileSync(file, 'utf8');
      for (const { name, re } of PATTERNS) {
        if (re.test(content)) violations.push(`${rel}: ${name}`);
      }
    }
    expect(violations).toEqual([]);
  });
});

describe('Doctrine §2.1 — Relative URLs only', () => {
  it('index.html has no absolute /<asset> URLs', () => {
    const html = readRepo('index.html');
    const matches =
      html.match(/['"(]\/[a-zA-Z][a-zA-Z0-9_-]*\.(js|css|html|json|png|svg|woff|woff2|mp3|jpg)/g) ||
      [];
    const filtered = matches.filter((m) => !m.includes('://'));
    expect(filtered).toEqual([]);
  });

  it('manifest.json uses relative start_url and scope', () => {
    const m = JSON.parse(readRepo('manifest.json'));
    expect(m.start_url.startsWith('/')).toBe(false);
    expect(m.scope.startsWith('/')).toBe(false);
  });

  it('sw-register.js does not use a leading-slash registration URL', () => {
    const sw = readRepo('js/sw-register.js');
    expect(sw).not.toMatch(/\.register\(\s*['"]\/sw\.js/);
    expect(sw).toMatch(/\.register\(\s*['"]sw\.js/);
  });
});

describe('Doctrine §5.6 — SW STATIC_ASSETS coverage', () => {
  it('every committed file under js/ is in STATIC_ASSETS', () => {
    const sw = readRepo('sw.js');
    const list = (sw.match(/STATIC_ASSETS\s*=\s*\[([\s\S]*?)\]/) || [])[1] || '';
    const listed = new Set(Array.from(list.matchAll(/['"]\.\/([^'"]+)['"]/g)).map((m) => m[1]));
    const missing = [];
    for (const file of walk(resolve(REPO, 'js'))) {
      if (!file.endsWith('.js')) continue;
      const rel = relative(REPO, file).replace(/\\/g, '/');
      if (!listed.has(rel)) missing.push(rel);
    }
    expect(missing).toEqual([]);
  });
});

describe('Doctrine §6.1 — Vendor allowlist', () => {
  it('vendor/ contains only the pinned three.js, fonts.css, and woff2 files', () => {
    const vendor = resolve(REPO, 'vendor');
    const allowed = new Set(['integrity.json', 'three-0.170.0.module.js', 'fonts/fonts.css']);
    const woff = /^fonts\/.*\.woff2$/;
    const violations = [];
    for (const file of walk(vendor)) {
      const rel = relative(vendor, file).replace(/\\/g, '/');
      if (allowed.has(rel) || woff.test(rel)) continue;
      violations.push(rel);
    }
    expect(violations).toEqual([]);
  });

  it('integrity.json sha256 pins match files on disk', async () => {
    const { createHash } = await import('node:crypto');
    const pins = JSON.parse(readRepo('vendor/integrity.json')).assets;
    for (const [path, expected] of Object.entries(pins)) {
      const actual = createHash('sha256')
        .update(readFileSync(resolve(REPO, path.replace(/^\//, ''))))
        .digest('hex');
      expect(actual, `${path} pin mismatch`).toBe(expected);
    }
  });
});
