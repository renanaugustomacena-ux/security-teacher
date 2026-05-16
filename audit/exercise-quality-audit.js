#!/usr/bin/env node

/**
 * Exercise Quality Audit
 *
 * Scans all topic data files and flags items with quality issues:
 * - Tautological examples (english term starts the example)
 * - Fake translations (italian starts with the english term)
 * - Near-identical translations (english ≈ italian)
 * - Trivial examples (< 40 chars)
 * - Missing examples
 * - Redundant notes (note restates english or italian)
 */

/* eslint-disable no-console */
import { readdirSync, writeFileSync } from 'fs';
import { join, basename } from 'path';

const DATA_DIR = join(import.meta.dirname, '..', 'js', 'topics', 'data');

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => {
    const row = new Array(n + 1);
    row[0] = i;
    return row;
  });
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function normalize(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
}

// Stricter normalize for duplicate-key matching: preserves special chars like
// `.`, `-`, `/`, `*` so distinct commands like `git add` vs `git add .` don't
// collide. Only collapses whitespace and lowercases.
function dupKey(s) {
  return (s || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function checkItem(item, topicId, levelNum, lessonId) {
  const issues = [];
  const eng = (item.english || '').trim();
  const ita = (item.italian || '').trim();
  const example = (item.example || '').trim();
  const note = (item.note || '').trim();

  const engNorm = normalize(eng);
  const itaNorm = normalize(ita);

  // 1. Tautological example: english term appears as first word(s) of example
  if (example && eng) {
    const exEnglishPart = example.split(' = ')[0] || '';
    const exStart = normalize(exEnglishPart);
    if (exStart.startsWith(engNorm) && engNorm.length > 2) {
      issues.push('tautological-example');
    }
  }

  // 2. Fake translation: italian starts with the english term
  if (eng && ita) {
    const itaLower = ita.toLowerCase();
    const engLower = eng.toLowerCase();
    if (
      itaLower.startsWith(engLower) &&
      itaLower !== engLower &&
      itaLower.length > engLower.length
    ) {
      const suffix = itaLower.slice(engLower.length).trim();
      if (suffix.startsWith('/') || suffix.startsWith('(') || suffix.startsWith(',')) {
        issues.push('fake-translation');
      }
    }
  }

  // 3. Near-identical translation (edit distance < 3 and both > 2 chars)
  if (engNorm.length > 2 && itaNorm.length > 2) {
    const dist = levenshtein(engNorm, itaNorm);
    if (dist < 3 && dist > 0) {
      issues.push('near-identical-translation');
    }
    if (dist === 0) {
      issues.push('identical-translation');
    }
  }

  // 4. Trivial example (< 40 chars, only the english part before " = ")
  if (example) {
    const engPart = example.split(' = ')[0] || '';
    if (engPart.length < 40) {
      issues.push('trivial-example');
    }
  }

  // 5. Missing example
  if (!example) {
    issues.push('missing-example');
  }

  // 6. Redundant note: note restates english or italian
  if (note && eng) {
    const noteNorm = normalize(note);
    if (noteNorm.includes(engNorm) && engNorm.length > 3) {
      // Only flag if the note is mostly just the term
      if (noteNorm.length < engNorm.length * 3) {
        issues.push('redundant-note');
      }
    }
  }

  return issues.map((type) => ({
    topicId,
    level: levelNum,
    lesson: lessonId,
    english: eng,
    italian: ita,
    type,
  }));
}

async function auditTopic(filePath) {
  const topicId = basename(filePath, '.js');

  // Skip non-level data files
  if (topicId === 'techtalk-scenarios') return { topicId, items: 0, flags: [] };

  const module = await import(filePath);
  const data = module.default;

  let totalItems = 0;
  const flags = [];
  const seen = new Map(); // normalize(english) -> [{level, lesson}]

  if (!data || !data.levels) return { topicId, items: 0, flags: [] };

  for (const [levelNum, level] of Object.entries(data.levels)) {
    if (!level.lessons) continue;
    for (const lesson of level.lessons) {
      if (!lesson.items) continue;
      for (const item of lesson.items) {
        totalItems++;
        const itemFlags = checkItem(item, topicId, levelNum, lesson.id);
        flags.push(...itemFlags);

        const key = dupKey(item.english || '');
        if (key) {
          const prior = seen.get(key) || [];
          prior.push({ level: levelNum, lesson: lesson.id, english: item.english });
          seen.set(key, prior);
        }
      }
    }
  }

  // Flag duplicates:
  //  - same-lesson  → 'duplicate-in-lesson'  (always bad: same term twice in one lesson)
  //  - cross-lesson → 'duplicate-across-lessons' (sometimes intentional: intro vs advanced)
  for (const occurrences of seen.values()) {
    if (occurrences.length < 2) continue;

    // Count per (level, lesson)
    const byLesson = new Map();
    for (const occ of occurrences) {
      const k = `${occ.level}/${occ.lesson}`;
      byLesson.set(k, (byLesson.get(k) || 0) + 1);
    }

    let sameLessonDup = false;
    for (const count of byLesson.values()) {
      if (count > 1) {
        sameLessonDup = true;
        break;
      }
    }

    const type = sameLessonDup ? 'duplicate-in-lesson' : 'duplicate-across-lessons';
    for (const occ of occurrences) {
      flags.push({
        topicId,
        level: occ.level,
        lesson: occ.lesson,
        english: occ.english,
        italian: '',
        type,
      });
    }
  }

  return { topicId, items: totalItems, flags };
}

async function main() {
  const files = readdirSync(DATA_DIR).filter((f) => f.endsWith('.js'));
  const results = [];

  for (const file of files.sort()) {
    const filePath = join(DATA_DIR, file);
    const result = await auditTopic(filePath);
    results.push(result);
  }

  // Summary table
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  EXERCISE QUALITY AUDIT REPORT');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const issueTypes = [
    'tautological-example',
    'fake-translation',
    'identical-translation',
    'near-identical-translation',
    'trivial-example',
    'missing-example',
    'redundant-note',
    'duplicate-in-lesson',
    'duplicate-across-lessons',
  ];

  // Per-topic summary
  console.log('TOPIC                    ITEMS  FLAGGED  %BAD   BREAKDOWN');
  console.log('─────────────────────────────────────────────────────────────');

  let grandTotal = 0;
  let grandFlagged = 0;
  const grandCounts = {};
  for (const t of issueTypes) grandCounts[t] = 0;

  for (const r of results) {
    if (r.items === 0) continue;
    grandTotal += r.items;

    const counts = {};
    for (const t of issueTypes) counts[t] = 0;
    for (const f of r.flags) {
      counts[f.type]++;
      grandCounts[f.type]++;
    }

    const uniqueItems = new Set(r.flags.map((f) => f.english)).size;
    grandFlagged += uniqueItems;

    const pct = ((uniqueItems / r.items) * 100).toFixed(0);
    const breakdown = issueTypes
      .filter((t) => counts[t] > 0)
      .map((t) => `${t.replace(/-/g, ' ')}:${counts[t]}`)
      .join(', ');

    const name = r.topicId.padEnd(24);
    console.log(
      `${name} ${String(r.items).padStart(5)}  ${String(uniqueItems).padStart(7)}  ${String(pct).padStart(3)}%   ${breakdown}`
    );
  }

  console.log('─────────────────────────────────────────────────────────────');
  const grandPct = ((grandFlagged / grandTotal) * 100).toFixed(0);
  console.log(
    `${'TOTAL'.padEnd(24)} ${String(grandTotal).padStart(5)}  ${String(grandFlagged).padStart(7)}  ${String(grandPct).padStart(3)}%`
  );

  // Grand breakdown
  console.log('\n\nISSUE BREAKDOWN (all topics):');
  console.log('─────────────────────────────────────────────────────────────');
  for (const t of issueTypes) {
    if (grandCounts[t] > 0) {
      console.log(`  ${t.replace(/-/g, ' ').padEnd(30)} ${grandCounts[t]}`);
    }
  }

  // Write CSV
  const csvLines = ['topicId,level,lesson,english,italian,issueType'];
  for (const r of results) {
    for (const f of r.flags) {
      const esc = (s) => `"${(s || '').replace(/"/g, '""')}"`;
      csvLines.push(
        `${esc(f.topicId)},${f.level},${esc(f.lesson)},${esc(f.english)},${esc(f.italian)},${f.type}`
      );
    }
  }

  const csvPath = join(import.meta.dirname, 'exercise-quality-flags.csv');
  writeFileSync(csvPath, csvLines.join('\n'), 'utf8');
  console.log(`\n\nCSV written to: ${csvPath}`);
  console.log(`Total flags: ${csvLines.length - 1}`);
}

main().catch(console.error);
