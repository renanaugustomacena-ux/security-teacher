#!/usr/bin/env node
/**
 * audit-identity-translations.mjs
 *
 * Walks every js/topics/data/*.js file, finds vocabulary items where
 * `english.toLowerCase() === italian.toLowerCase()` (e.g. "Bash" / "Bash"),
 * and writes a markdown report to audit/identity-translations.md.
 *
 * Why this matters: in listening / matching / writing / scenario modes the
 * prompt is rendered from `q.english` and the correct option is `q.italian`.
 * When they're identical the answer is given for free. Workstream C1's
 * runtime filter prevents the user-facing leak; this audit lets the
 * content team progressively rewrite or enrich those items so they're
 * not "lost capacity" in those modes.
 *
 * Usage:  node scripts/audit-identity-translations.mjs
 * Or:     npm run audit:translations
 *
 * Output: audit/identity-translations.md (also printed to stdout).
 *
 * Exit code: always 0 — this is an informational report, not a CI gate.
 *
 * Dependency-free; Node 22 built-ins only.
 */
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO = resolve(__dirname, '..');
const DATA_DIR = join(REPO, 'js', 'topics', 'data');
const OUT_DIR = join(REPO, 'audit');
const OUT_FILE = join(OUT_DIR, 'identity-translations.md');

// Some files (e.g. techtalk-scenarios.js) are not vocabulary domains;
// they don't expose the levels-and-lessons shape and are skipped.
function flattenItems(mod) {
  const data = mod?.default ?? mod;
  if (!data || typeof data !== 'object' || !data.levels) return null;
  const out = [];
  for (const [levelKey, level] of Object.entries(data.levels)) {
    if (!level || !Array.isArray(level.lessons)) continue;
    for (const lesson of level.lessons) {
      const items = Array.isArray(lesson.items) ? lesson.items : [];
      for (const item of items) {
        out.push({
          level: levelKey,
          lessonId: lesson.id || '(unnamed)',
          item,
        });
      }
    }
  }
  return out;
}

function isIdentity(item) {
  return (
    item &&
    typeof item.english === 'string' &&
    typeof item.italian === 'string' &&
    item.english.toLowerCase().trim() === item.italian.toLowerCase().trim()
  );
}

async function audit() {
  const entries = await readdir(DATA_DIR);
  const files = entries.filter((n) => n.endsWith('.js')).sort();

  const perDomain = [];
  for (const file of files) {
    const url = pathToFileURL(join(DATA_DIR, file)).href;
    let mod;
    try {
      mod = await import(url);
    } catch (err) {
      perDomain.push({ file, error: err.message, count: 0, items: [] });
      continue;
    }
    const flat = flattenItems(mod);
    if (flat === null) {
      // Not a vocabulary domain (e.g. techtalk-scenarios). Skip silently.
      continue;
    }
    const hits = flat.filter(({ item }) => isIdentity(item));
    perDomain.push({
      file,
      domainId: (mod.default && mod.default.id) || file.replace(/\.js$/, ''),
      count: hits.length,
      total: flat.length,
      items: hits,
    });
  }

  perDomain.sort((a, b) => b.count - a.count);

  return perDomain;
}

function buildReport(perDomain) {
  const today = new Date().toISOString().slice(0, 10);
  const grandTotal = perDomain.reduce((sum, d) => sum + d.count, 0);
  const grandPool = perDomain.reduce((sum, d) => sum + (d.total || 0), 0);

  const lines = [];
  lines.push(`# Identity-translation audit — ${today}`);
  lines.push('');
  lines.push(
    `Items where \`english.toLowerCase() === italian.toLowerCase()\`. These are filtered out`
  );
  lines.push('of `listening` / `matching` / `writing` / `scenario` modes at runtime');
  lines.push("(see `js/topics/TopicPracticeManager.js#generateQuestions`), so they don't leak the");
  lines.push('answer to the user. They are still served in `codeoutput` /');
  lines.push('`command` / `comprehension` / `context` / `fillblank` modes.');
  lines.push('');
  lines.push('Goal: progressively replace each entry with a meaningful Italian');
  lines.push('translation or definition (e.g. `Bash` → `shell GNU`) so the item');
  lines.push('regains pedagogical value in translation modes.');
  lines.push('');
  lines.push(
    `**Grand total: ${grandTotal} / ${grandPool} items (${grandPool ? ((grandTotal / grandPool) * 100).toFixed(1) : '0.0'}%)**`
  );
  lines.push('');
  lines.push('| Domain | Identity items | Total items | Share |');
  lines.push('|--------|---------------:|------------:|------:|');
  for (const d of perDomain) {
    const share = d.total ? `${((d.count / d.total) * 100).toFixed(1)}%` : 'n/a';
    lines.push(`| ${d.domainId || d.file} | ${d.count} | ${d.total ?? '?'} | ${share} |`);
  }
  lines.push('');

  for (const d of perDomain) {
    if (d.error) {
      lines.push(`## ${d.file} — ERROR`);
      lines.push('');
      lines.push('```');
      lines.push(d.error);
      lines.push('```');
      lines.push('');
      continue;
    }
    if (d.count === 0) continue;
    lines.push(`## ${d.domainId} — ${d.count} items`);
    lines.push('');
    for (const { level, lessonId, item } of d.items) {
      const ctx = item.context ? ` _(context: ${item.context})_` : '';
      const diff = item.difficulty ? ` _[${item.difficulty}]_` : '';
      lines.push(
        `- L${level} / \`${lessonId}\` — \`${item.english}\` / \`${item.italian}\`${ctx}${diff}`
      );
    }
    lines.push('');
  }
  return lines.join('\n');
}

async function main() {
  const perDomain = await audit();
  const report = buildReport(perDomain);
  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT_FILE, `${report}\n`, 'utf8');

  // Compact summary to stdout for CLI usage.
  const grand = perDomain.reduce((s, d) => s + d.count, 0);
  console.info(`[audit] ${grand} identity-translation items across ${perDomain.length} domains`);
  for (const d of perDomain) {
    console.info(`  ${(d.domainId || d.file).padEnd(20)} ${String(d.count).padStart(4)}`);
  }
  console.info(`[audit] report written to ${OUT_FILE}`);
}

main().catch((err) => {
  console.error('[audit] fatal:', err);
  process.exit(1);
});
