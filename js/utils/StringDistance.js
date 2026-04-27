/**
 * StringDistance
 * Levenshtein-distance based near-miss detection for forgiving exercise grading.
 *
 * `nearMiss(user, expected)` decides whether a user's answer was an exact match,
 * close enough to award partial credit, or a real miss. The threshold scales with
 * the expected word length so single-character typos are forgiven on short words
 * but a 4-edit gap on a 6-letter word is still a miss.
 *
 * Pure logic. No DOM, no I/O. Safe to import into worker contexts.
 */

const MIN_EDITS = 2;
const EDIT_RATIO = 0.2;

export function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;

  const m = a.length;
  const n = b.length;
  let prev = new Array(n + 1);
  let curr = new Array(n + 1);

  for (let j = 0; j <= n; j += 1) prev[j] = j;

  for (let i = 1; i <= m; i += 1) {
    curr[0] = i;
    const ca = a.charCodeAt(i - 1);
    for (let j = 1; j <= n; j += 1) {
      const cost = ca === b.charCodeAt(j - 1) ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }

  return prev[n];
}

function normalize(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

export function nearMiss(userInput, expected) {
  const u = normalize(userInput);
  const e = normalize(expected);

  if (!e) return { exact: false, partial: false, edits: 0 };
  if (u === e) return { exact: true, partial: false, edits: 0 };

  const edits = levenshtein(u, e);
  const threshold = Math.max(MIN_EDITS, Math.floor(e.length * EDIT_RATIO));

  return {
    exact: false,
    partial: edits > 0 && edits <= threshold,
    edits,
  };
}

export function diffChars(userInput, expected) {
  const u = String(userInput ?? '');
  const e = String(expected ?? '');
  const out = [];
  const max = Math.max(u.length, e.length);
  for (let i = 0; i < max; i += 1) {
    const a = u[i] ?? '';
    const b = e[i] ?? '';
    out.push({ char: a || b, match: a !== '' && a.toLowerCase() === b.toLowerCase() });
  }
  return out;
}
