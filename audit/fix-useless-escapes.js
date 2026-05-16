#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Removes unnecessary \' escapes inside double-quoted string literals.
 * Walks each file character-by-character, tracking string state, and rewrites
 * `\'` to `'` only when inside a "..." string.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(import.meta.dirname, '..', 'js', 'topics', 'data');
const files = readdirSync(DATA_DIR)
  .filter((f) => f.endsWith('.js'))
  .map((f) => join(DATA_DIR, f));

function fix(src) {
  const out = [];
  let i = 0;
  let inString = null; // null | '"' | "'" | '`'
  let fixes = 0;

  while (i < src.length) {
    const c = src[i];
    if (!inString) {
      // Track comments to avoid mangling them.
      if (c === '/' && src[i + 1] === '/') {
        // line comment
        while (i < src.length && src[i] !== '\n') {
          out.push(src[i]);
          i++;
        }
        continue;
      }
      if (c === '/' && src[i + 1] === '*') {
        // block comment
        out.push('/', '*');
        i += 2;
        while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) {
          out.push(src[i]);
          i++;
        }
        if (i < src.length) {
          out.push('*', '/');
          i += 2;
        }
        continue;
      }
      if (c === '"' || c === "'" || c === '`') {
        inString = c;
        out.push(c);
        i++;
        continue;
      }
      out.push(c);
      i++;
      continue;
    }

    // Inside a string.
    if (c === '\\') {
      // Escape sequence. Inside a double-quoted string, \' is unnecessary.
      if (inString === '"' && src[i + 1] === "'") {
        out.push("'");
        i += 2;
        fixes++;
        continue;
      }
      // Inside a backtick (template literal), \' is also unnecessary.
      if (inString === '`' && src[i + 1] === "'") {
        out.push("'");
        i += 2;
        fixes++;
        continue;
      }
      // Pass through any other escape pair verbatim.
      out.push(src[i], src[i + 1]);
      i += 2;
      continue;
    }
    if (c === inString) {
      inString = null;
    }
    out.push(c);
    i++;
  }

  return { src: out.join(''), fixes };
}

let total = 0;
for (const file of files) {
  const src = readFileSync(file, 'utf8');
  const { src: out, fixes } = fix(src);
  if (fixes > 0) {
    writeFileSync(file, out);
    console.log(`${file.split('/').pop().padEnd(28)} ${fixes} fix(es)`);
    total += fixes;
  }
}
console.log(`\nTotal: ${total} useless-escape fixes`);
