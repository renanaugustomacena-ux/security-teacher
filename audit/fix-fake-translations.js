#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Mechanical fix for "fake translation" entries:
 *   italian: 'English term / Italian descrizione'   →
 *   italian: 'Italian descrizione (English term)'
 *
 * Also handles the comma form:
 *   italian: 'English term, Italian descrizione'   →
 *   italian: 'Italian descrizione (English term)'
 *
 * And the parenthesis form (already half-right, just normalise spacing):
 *   italian: 'English term (Italian descrizione)' → leave as-is (already canonical).
 *
 * The companion `english` field in the same item is read first; the script only
 * rewrites `italian` if it actually begins with the English term followed by
 * the separator.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(import.meta.dirname, '..', 'js', 'topics', 'data');

const TOPIC_FILES = readdirSync(DATA_DIR)
  .filter((f) => f.endsWith('.js') && f !== 'techtalk-scenarios.js')
  .map((f) => join(DATA_DIR, f));

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function fixFile(file) {
  const src = readFileSync(file, 'utf8');
  const lines = src.split('\n');
  let fixed = 0;

  // Walk the lines: an item is a small block. Track the most recent english value.
  let currentEnglish = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect item boundary: closing `},` resets english.
    if (/^\s*\},?\s*$/.test(line)) {
      currentEnglish = null;
      continue;
    }

    // Capture english field. Match both single-quote and template literal.
    const engMatch = line.match(/^\s*english:\s*['`]([^'`]+)['`]\s*,?\s*$/);
    if (engMatch) {
      currentEnglish = engMatch[1];
      continue;
    }

    if (!currentEnglish) continue;

    // Match italian field on this line.
    const italMatch = line.match(/^(\s*italian:\s*)(['`])(.+)\2(\s*,?\s*)$/);
    if (!italMatch) continue;

    const [, prefix, quote, value, suffix] = italMatch;
    const eng = currentEnglish.trim();
    const engEsc = escapeRegex(eng);

    // Form A: "<english> / <italian>"  →  "<italian> (<english>)"
    const slashRe = new RegExp(`^${engEsc}\\s*/\\s*(.+)$`, 'i');
    // Form B: "<english>, <italian>"   →  "<italian> (<english>)"
    const commaRe = new RegExp(`^${engEsc}\\s*,\\s*(.+)$`, 'i');

    let newVal = null;
    const m1 = value.match(slashRe);
    if (m1) newVal = `${m1[1].trim()} (${eng})`;
    if (!newVal) {
      const m2 = value.match(commaRe);
      if (m2) newVal = `${m2[1].trim()} (${eng})`;
    }

    if (newVal && newVal !== value) {
      // Prefer template literals if the new value would contain a quote of the same type.
      const newQuote = newVal.includes(quote) ? '`' : quote;
      // If using backticks, escape ${ and ` inside the value.
      let encoded = newVal;
      if (newQuote === '`') {
        encoded = encoded.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
      }
      lines[i] = `${prefix}${newQuote}${encoded}${newQuote}${suffix}`;
      fixed++;
    }
  }

  if (fixed > 0) {
    writeFileSync(file, lines.join('\n'));
  }
  return fixed;
}

let total = 0;
for (const file of TOPIC_FILES) {
  const n = fixFile(file);
  if (n) console.log(`${file.split('/').pop().padEnd(28)} ${n} fix(es)`);
  total += n;
}
console.log(`\nTotal: ${total} fake-translation fixes`);
