#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Apply per-domain JSON fixes to a topic data file.
 *
 * Fix format:
 *   {
 *     "fixes": [
 *       {
 *         "level": "1",
 *         "lesson": "git_basics_1",
 *         "english": "git add",
 *         "set": {                 // any subset of these fields
 *           "english": "git add <file>",   // rename
 *           "italian": "Aggiungi <file> all'area di staging",
 *           "example": "...",
 *           "note": "...",
 *           "context": "...",
 *           "difficulty": "..."
 *         }
 *       }
 *     ]
 *   }
 *
 * Matching: (level, lesson, english) uniquely identifies an item except when
 * there are real duplicates — in which case a fix applies to the FIRST match,
 * which the caller can chain (apply once, then re-target the next remaining
 * duplicate).
 *
 * Output: rewrites the .js file in place, preserving comments/whitespace
 * around untouched lines. Uses template literals for any value containing an
 * apostrophe.
 */
import { readFileSync, writeFileSync } from 'fs';

const [, , dataFile, fixesFile] = process.argv;
if (!dataFile || !fixesFile) {
  console.error('usage: apply-fixes.js <topic.js> <fixes.json>');
  process.exit(1);
}

const fixesDoc = JSON.parse(readFileSync(fixesFile, 'utf8'));
const fixes = Array.isArray(fixesDoc) ? fixesDoc : fixesDoc.fixes || [];

const src = readFileSync(dataFile, 'utf8');
const lines = src.split('\n');

function encodeValue(val) {
  if (typeof val !== 'string') return JSON.stringify(val);
  // Use template literals for any value that contains apostrophes, backticks,
  // OR newlines. Single-quoted JS string literals can't span lines, so a
  // multi-line `command:` or `code:` value would otherwise produce invalid JS.
  const needsTemplate = /['`\n]/.test(val);
  if (needsTemplate) {
    return `\`${val.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\``;
  }
  return `'${val.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function parseItem(startIdx) {
  // Walk forward until matching closing brace at the same indent level.
  // Items look like:
  //   { english: '…', italian: '…', … },
  // possibly split over many lines.
  const openLine = lines[startIdx];
  const indent = openLine.match(/^(\s*)/)[1];
  // Find closing }
  for (let i = startIdx + 1; i < lines.length; i++) {
    const m = lines[i].match(/^(\s*)\},?\s*$/);
    if (m && m[1] === indent) return { start: startIdx, end: i };
  }
  return null;
}

function setFieldOnBlock(blockStart, blockEnd, field, newVal) {
  const re = new RegExp(`^(\\s*)${field}:(\\s*)(.*)$`);
  const remove = newVal === null;
  for (let i = blockStart; i <= blockEnd; i++) {
    const m = lines[i].match(re);
    if (!m) continue;
    const indent = m[1];
    const rest = m[3].trim();

    // Determine how many lines the value occupies.
    // Case 1: value on same line, e.g. `field: 'value',`
    // Case 2: value on following lines, e.g.
    //         `field:`
    //         `  'value',`
    // We consume up to (and including) the line that ends with the value
    // closing quote + optional trailing comma.
    let endLine = i;
    if (rest === '' || rest === '+') {
      // Value continues on next line(s). Walk forward until we find a line
      // ending with ',' or just a closing quote followed by ',' optionally.
      for (let j = i + 1; j <= blockEnd; j++) {
        endLine = j;
        if (/['"`]\s*,?\s*$/.test(lines[j])) break;
      }
    } else if (!/,\s*$/.test(lines[i])) {
      // Value might be a single quoted string or a multi-line concatenation
      // (e.g., 'foo' + 'bar'). Walk forward only if it doesn't terminate.
      for (let j = i + 1; j <= blockEnd; j++) {
        endLine = j;
        if (/,\s*$/.test(lines[j])) break;
      }
    }

    if (remove) {
      lines.splice(i, endLine - i + 1);
    } else {
      lines.splice(i, endLine - i + 1, `${indent}${field}: ${encodeValue(newVal)},`);
    }
    return true;
  }
  if (remove) {
    // Field doesn't exist, nothing to remove.
    return true;
  }
  // Field doesn't exist; insert just before the block's closing brace.
  const closeLine = lines[blockEnd];
  const indentMatch = closeLine.match(/^(\s*)/);
  const itemIndent = indentMatch[1];
  const fieldIndent = `${itemIndent}  `;
  lines.splice(blockEnd, 0, `${fieldIndent}${field}: ${encodeValue(newVal)},`);
  return true;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Locate every item block once, keyed by (lessonId, english).
// We rescan because each fix may shift line numbers.
function findItemBlock(level, lesson, english) {
  let inLesson = false;
  let lessonStartIdx = -1;
  const lessonStartRe = new RegExp(`id:\\s*['"\`]${escapeRe(lesson)}['"\`]`);
  for (let i = 0; i < lines.length; i++) {
    if (!inLesson) {
      if (lessonStartRe.test(lines[i])) {
        inLesson = true;
        lessonStartIdx = i;
      }
      continue;
    }
    // Once inside the lesson, look for `english:` matching.
    const m = lines[i].match(/^\s*english:\s*['"`]((?:\\.|[^\\])*?)['"`],?\s*$/);
    if (m && m[1] === english) {
      // Find the enclosing { … } of this item.
      // Walk backward to opening `{`
      for (let j = i - 1; j >= lessonStartIdx; j--) {
        if (/^\s*\{\s*$/.test(lines[j])) {
          const item = parseItem(j);
          if (item) return item;
          break;
        }
      }
    }
    // Bail if we hit the next lesson or the levels close.
    if (/^\s*\},?\s*$/.test(lines[i])) {
      // Could be end of item or end of lesson. Heuristic: end of lesson is
      // typically when we see a smaller indent matching the `lessons` array
      // closure. We don't strictly need that; keep scanning.
    }
  }
  return null;
}

let applied = 0;
let missed = 0;

for (const fix of fixes) {
  const set = fix.set || {};
  // If we rename via set.english, do it last so the lookup key still matches.
  const fields = Object.entries(set);
  const renamed = fields.find(([f]) => f === 'english');
  const others = fields.filter(([f]) => f !== 'english');

  const firstBlock = findItemBlock(fix.level, fix.lesson, fix.english);
  if (!firstBlock) {
    console.warn(`MISS level=${fix.level} lesson=${fix.lesson} english=${fix.english}`);
    missed++;
    continue;
  }

  for (const [field, val] of others) {
    // Re-find the block on each iteration because earlier sets may have
    // shifted line numbers.
    const block = findItemBlock(fix.level, fix.lesson, fix.english);
    if (!block) break;
    setFieldOnBlock(block.start, block.end, field, val);
  }
  if (renamed) {
    const block = findItemBlock(fix.level, fix.lesson, fix.english);
    if (block) setFieldOnBlock(block.start, block.end, 'english', renamed[1]);
  }
  applied++;
}

writeFileSync(dataFile, lines.join('\n'));
console.log(`Applied ${applied}/${fixes.length} fixes (${missed} misses) to ${dataFile}`);
