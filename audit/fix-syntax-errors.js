#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Iteratively repairs broken single-quoted string literals in topic data files.
 *
 * Two patterns of breakage:
 *   1. Unescaped Italian/English apostrophes inside a single-quoted string,
 *      e.g.  'l'utente'  /  'image's'.
 *   2. Over-escaped apostrophes from the rewriter:  l\\'utente  (3 raw chars:
 *      \, \, ').
 *
 * Strategy per broken line (identified by `node --check`):
 *   - First `'` on the line  → opener.
 *   - Last `'` immediately followed by a structural char (",;)}/" or EOL whitespace)
 *     → closer.
 *   - Inner content: collapse `\\'` → `'`; escape any inner backtick or `${`;
 *     re-wrap with backticks.
 *
 * Backticks are safe here: data files contain no template interpolation in the
 * affected lines (verified), and the few that use `${ literally are escaped.
 */
import { readFileSync, writeFileSync } from 'fs';
import { spawnSync } from 'child_process';

const file = process.argv[2];
if (!file) {
  console.error('usage: fix-syntax-errors.js <file>');
  process.exit(1);
}

function tryParse() {
  const res = spawnSync('node', ['--check', file], { encoding: 'utf8' });
  if (res.status === 0) return null;
  const m = res.stderr.match(/:(\d+)\r?\n([^\n]*)\r?\n( *\^+)/);
  if (!m) return { unparseable: true, raw: res.stderr };
  return { line: parseInt(m[1], 10), source: m[2], pointer: m[3] };
}

const BAD_OVER_ESCAPE = String.raw`\\'`; // 3 chars: \, \, '

let iterations = 0;
const maxIter = 5000;

while (iterations++ < maxIter) {
  const err = tryParse();
  if (err === null) {
    console.log(`OK after ${iterations - 1} fix(es): ${file}`);
    process.exit(0);
  }
  if (err.unparseable) {
    console.error('Cannot parse node error output:\n', err.raw);
    process.exit(2);
  }

  const content = readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const idx = err.line - 1;
  const line = lines[idx];

  // Locate the outer single-quoted string on this line.
  const openPos = line.indexOf("'");
  if (openPos === -1) {
    console.error(`No quote found on line ${err.line}:\n  ${line}`);
    process.exit(3);
  }

  // Closer: the rightmost ' followed by structural chars (",;)}/+]") or EOL.
  // Allow trailing whitespace / commas / closers; everything after must be
  // tail-only.
  let closePos = -1;
  const tail = /'[\s,;)\]}/+]*$/;
  const m = line.match(tail);
  if (m) {
    closePos = line.length - m[0].length;
  } else {
    // Fallback: just the last ' on the line.
    closePos = line.lastIndexOf("'");
  }
  if (closePos <= openPos) {
    console.error(`Could not locate closing quote on line ${err.line}:\n  ${line}`);
    process.exit(4);
  }

  let inner = line.slice(openPos + 1, closePos);

  // Collapse over-escape: \\' → '
  while (inner.includes(BAD_OVER_ESCAPE)) {
    inner = inner.split(BAD_OVER_ESCAPE).join("'");
  }

  // Escape backticks and ${ so the new template literal is inert.
  inner = inner.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

  // Inside backticks the escape \' is unnecessary; collapse to '.
  inner = inner.replace(/\\'/g, "'");

  const fixed = `${line.slice(0, openPos)}\`${inner}\`${line.slice(closePos + 1)}`;
  if (fixed === line) {
    console.error(`No-op fix on line ${err.line}:\n  ${line}`);
    process.exit(5);
  }
  lines[idx] = fixed;
  writeFileSync(file, lines.join('\n'));
  console.log(`Fixed line ${err.line}`);
}

console.error(`Hit max iterations (${maxIter}) without full repair`);
process.exit(6);
