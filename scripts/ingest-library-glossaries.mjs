#!/usr/bin/env node
/**
 * ingest-library-glossaries.mjs
 *
 * Converts the maintainer's personal study library into a Knowledge AIO topic.
 *
 * The library (default: ../personal-resources-main) keeps a `00-GLOSSARIO.md`
 * or `00-GLOSSARY.md` per domain. Each is a markdown table of
 * `| **Term** | Definition | Module |` rows grouped under `##` section
 * headings. That is ~1,400 already-curated bilingual term/definition pairs —
 * the single cheapest bridge between "what the user studies" and "what the app
 * teaches", because no authoring or translation is required.
 *
 * Output:
 *   js/topics/data/library/<domain>.js   one chunk per library domain
 *   js/topics/data/library-glossary.js   composes the chunks into a topic
 *
 * Split per domain because a single combined file lands around 460 KB, well
 * over the §13.2 300 KB per-topic-file budget. Each chunk stays far under it,
 * and the topic module simply imports them — the whole graph is still
 * lazy-loaded as one unit when the learner opens the topic.
 *
 * Item mapping, and why:
 *   english  = the term (what the learner must recognise and produce)
 *   italian  = a SHORT gloss cut from the definition's first clause, so the
 *              multiple-choice modes stay readable. Items whose gloss is still
 *              long are marked `longAnswer: true` so the mode selector can keep
 *              them out of type-the-answer modes (§43 capability gating).
 *   note     = the full definition (used by the `definizione` practice mode)
 *   context  = the glossary section slug (drives distractor grouping)
 *
 * Usage:  node scripts/ingest-library-glossaries.mjs [--library <path>] [--dry]
 * Or:     npm run ingest:glossaries
 *
 * Exit code: 0 on success, 1 if no glossary was found (nothing to ingest).
 *
 * Dependency-free; Node 22 built-ins only.
 */
import { readdir, readFile, writeFile, stat, mkdir } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const argOf = (flag, fallback) => {
  const i = argv.indexOf(flag);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
};
const LIBRARY = resolve(argOf('--library', resolve(REPO, '..', 'personal-resources-main')));
const DRY = argv.includes('--dry');
const DATA_DIR = join(REPO, 'js', 'topics', 'data');
const CHUNK_DIR = join(DATA_DIR, 'library');
const OUT = join(DATA_DIR, 'library-glossary.js');

const GLOSSARY_NAMES = ['00-GLOSSARIO.md', '00-GLOSSARY.md'];
const MAX_GLOSS = 72; // chars; beyond this an item is flagged longAnswer
const MIN_TERM = 1;
const MAX_TERM = 60;

/** `03-WINDOWS-POWERUSER` -> `Windows Poweruser` */
function domainLabel(dirName) {
  return dirName
    .replace(/^\d+[-_]/, '')
    .replace(/[-_]+/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function slug(text) {
  return (
    String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'general'
  );
}

/** Strip markdown emphasis, links and stray pipes from a cell. */
function cleanCell(cell) {
  return String(cell || '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // [text](link) -> text
    .replace(/\*\*|__|`/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Cut a short gloss from a full definition: the first clause, preferring an
 * em-dash split (the library's own "Expansion — explanation" convention),
 * then a sentence boundary. Never returns an empty string when input is
 * non-empty.
 */
function shortGloss(definition) {
  const def = definition.trim();
  if (!def) return '';
  const dash = def.split(/\s+[—–-]\s+/);
  let candidate = dash.length > 1 ? dash.slice(1).join(' - ') : def;
  const sentence = candidate.split(/(?<=[.;])\s+/)[0] || candidate;
  candidate = sentence.trim().replace(/[.;]+$/, '');
  if (!candidate) candidate = def.replace(/[.;]+$/, '');
  return candidate.length > MAX_GLOSS
    ? `${candidate.slice(0, MAX_GLOSS - 1).trimEnd()}…`
    : candidate;
}

function difficultyFor(term, definition) {
  const len = term.length + definition.length;
  if (/^[A-Z0-9]{2,6}$/.test(term)) return 'intermediate'; // acronym
  if (len > 140) return 'expert';
  if (len > 90) return 'advanced';
  return 'intermediate';
}

/**
 * Parse one glossary file into `{ section, term, definition }` rows.
 * Only rows whose first cell is bold (`**Term**`) count — that alone rejects
 * the file-index and contents tables some glossaries open with.
 */
function parseGlossary(markdown) {
  const rows = [];
  let section = 'General';
  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();

    const heading = line.match(/^#{2,3}\s+(.*)$/);
    if (heading) {
      const title = cleanCell(heading[1]).replace(/^\d+[.)]\s*/, '');
      // Single-letter A-Z buckets are alphabetical, not thematic — they make
      // useless contexts, so keep the previous (or default) section instead.
      if (title && !/^[A-Z]([-–—][A-Z])?$/.test(title)) section = title;
      continue;
    }

    if (!line.startsWith('|')) continue;
    if (/^\|[\s|:-]+\|$/.test(line)) continue; // separator row

    const cells = line.split('|').slice(1, -1);
    if (cells.length < 2) continue;
    if (!/\*\*[^*]+\*\*/.test(cells[0])) continue; // require a bold term

    const term = cleanCell(cells[0]);
    const definition = cleanCell(cells[1]);
    if (!term || term.length < MIN_TERM || term.length > MAX_TERM) continue;
    if (!definition || definition.length < 8) continue;
    if (/^(termine|term|definizione|definition)$/i.test(term)) continue;

    rows.push({ section, term, definition });
  }
  return rows;
}

async function main() {
  let entries;
  try {
    entries = await readdir(LIBRARY, { withFileTypes: true });
  } catch {
    console.error(`[ingest] library not found at ${LIBRARY}`);
    console.error('[ingest] pass --library <path> to point at it');
    process.exit(1);
  }

  const domains = [];
  for (const entry of entries
    .filter((e) => e.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))) {
    for (const name of GLOSSARY_NAMES) {
      const file = join(LIBRARY, entry.name, name);
      try {
        await stat(file);
      } catch {
        continue;
      }
      const rows = parseGlossary(await readFile(file, 'utf8'));
      if (rows.length === 0) continue;
      domains.push({
        dir: entry.name,
        label: domainLabel(entry.name),
        rows,
        source: `${entry.name}/${name}`,
      });
      break;
    }
  }

  if (domains.length === 0) {
    console.error('[ingest] no glossary tables found — nothing to ingest');
    process.exit(1);
  }

  // Global dedupe: the same term recurs across domains (e.g. "API", "CI/CD").
  // Keeping every copy would make distractor pools collide and let a learner
  // meet the identical card in several levels.
  const seen = new Set();
  const chunks = [];
  let kept = 0;
  let dropped = 0;

  for (const domain of domains) {
    const bySection = new Map();
    for (const row of domain.rows) {
      const key = row.term.toLowerCase();
      if (seen.has(key)) {
        dropped += 1;
        continue;
      }
      seen.add(key);
      const gloss = shortGloss(row.definition);
      if (!gloss || gloss.toLowerCase() === row.term.toLowerCase()) {
        dropped += 1;
        continue;
      }
      if (!bySection.has(row.section)) bySection.set(row.section, []);
      // Only carry `note` when the full definition says more than the gloss.
      // When they are identical the `definizione` mode would be asking exactly
      // the same question as `matching`, with the same answer text.
      const noteAddsInfo =
        row.definition.trim() !== gloss.trim() && row.definition.length > gloss.length;
      bySection.get(row.section).push({
        english: row.term,
        italian: gloss,
        context: slug(row.section),
        difficulty: difficultyFor(row.term, row.definition),
        ...(noteAddsInfo ? { note: row.definition } : {}),
        ...(gloss.length > 40 ? { longAnswer: true } : {}),
      });
      kept += 1;
    }

    // Chunk each section into lessons of at most 10 items (the app's norm).
    const lessons = [];
    for (const [section, items] of bySection) {
      for (let i = 0; i < items.length; i += 10) {
        const chunk = items.slice(i, i + 10);
        const part = Math.floor(i / 10) + 1;
        const total = Math.ceil(items.length / 10);
        lessons.push({
          id: `libgloss_${slug(domain.dir)}_${slug(section)}_${part}`,
          title: total > 1 ? `${section} (${part}/${total})` : section,
          description: `${chunk.length} termini da ${domain.label} / ${chunk.length} terms from ${domain.label}`,
          items: chunk,
        });
      }
    }
    if (lessons.length === 0) continue;

    chunks.push({
      varName: `lvl${chunks.length}`,
      fileSlug: slug(domain.dir),
      label: domain.label,
      source: domain.source,
      lessons,
    });
  }

  const totalLessons = chunks.reduce((s, c) => s + c.lessons.length, 0);

  const chunkFile = (chunk) => `/**
 * LIBRARY GLOSSARY CHUNK — ${chunk.label}
 * GENERATED FILE — do not edit by hand. Regenerate: npm run ingest:glossaries
 * Source: ${chunk.source}
 * ${chunk.lessons.length} lessons.
 */

export default ${JSON.stringify(
    {
      name: chunk.label,
      description: `Glossario: ${chunk.label} / Glossary: ${chunk.label}`,
      lessons: chunk.lessons,
    },
    null,
    2
  )};
`;

  const indexFile = `/**
 * LIBRARY GLOSSARY TOPIC DATA - Knowledge AIO
 * ===========================================
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with:  npm run ingest:glossaries
 *
 * Terminology the maintainer actually studies, lifted from the per-domain
 * glossaries of the personal study library. One LEVEL per library domain, one
 * LESSON per glossary section.
 *
 * ${chunks.length} levels · ${totalLessons} lessons · ${kept} terms.
 *
 * Split into ./library/*.js chunks so no single data file exceeds the §13.2
 * 300 KB budget; the whole graph still loads lazily as one unit.
 *
 * Items carry the full definition in \`note\` (used by the \`definizione\`
 * practice mode) and a short gloss in \`italian\`. Glosses over 40 chars are
 * flagged \`longAnswer: true\` so the mode selector keeps them out of
 * type-the-answer modes.
 */

${chunks.map((c) => `import ${c.varName} from './library/${c.fileSlug}.js';`).join('\n')}

export default {
  id: 'library-glossary',
  levels: {
${chunks.map((c, i) => `    ${i}: ${c.varName},`).join('\n')}
  },
};
`;

  console.log(`[ingest] library: ${LIBRARY}`);
  console.log(`[ingest] domains with a glossary: ${domains.length}`);
  for (const d of domains)
    console.log(`           ${String(d.rows.length).padStart(4)}  ${d.source}`);
  console.log(`[ingest] terms kept: ${kept}, dropped (duplicate/unusable): ${dropped}`);
  console.log(`[ingest] levels: ${chunks.length}, lessons: ${totalLessons}`);

  let maxKb = 0;
  for (const chunk of chunks) {
    const kb = Buffer.byteLength(chunkFile(chunk), 'utf8') / 1024;
    maxKb = Math.max(maxKb, kb);
    console.log(`           ${kb.toFixed(1).padStart(6)} KB  library/${chunk.fileSlug}.js`);
  }
  console.log(`[ingest] largest chunk: ${maxKb.toFixed(1)} KB (§13.2 limit is 300 KB per file)`);
  if (maxKb > 300) {
    console.error('[ingest] WARNING: a chunk exceeds the §13.2 budget');
  }

  if (DRY) {
    console.log('[ingest] --dry: not writing');
    return;
  }

  // Format with the repo's own prettier config so generated files are ordinary
  // lint-clean citizens rather than an ignore-list exemption. Falls back to raw
  // output if prettier is unavailable (e.g. a production install with no
  // devDependencies) — the data is still valid, just unformatted.
  let format = async (source) => source;
  try {
    const prettier = await import('prettier');
    const config = (await prettier.resolveConfig(OUT)) || {};
    format = (source) => prettier.format(source, { ...config, parser: 'babel' });
  } catch {
    console.warn('[ingest] prettier unavailable — writing unformatted output');
  }

  await mkdir(CHUNK_DIR, { recursive: true });
  for (const chunk of chunks) {
    await writeFile(join(CHUNK_DIR, `${chunk.fileSlug}.js`), await format(chunkFile(chunk)), 'utf8');
  }
  await writeFile(OUT, await format(indexFile), 'utf8');
  console.log(`[ingest] wrote ${chunks.length} chunks + ${OUT}`);

  // The sw.js precache list is maintained by hand (§5.6); print the exact lines
  // so wiring is copy-paste rather than guesswork.
  console.log('\n[ingest] add these to sw.js STATIC_ASSETS (and bump CACHE_NAME per §5.5):');
  console.log(`  './js/topics/data/library-glossary.js',`);
  for (const chunk of chunks) {
    console.log(`  './js/topics/data/library/${chunk.fileSlug}.js',`);
  }
}

await main();
