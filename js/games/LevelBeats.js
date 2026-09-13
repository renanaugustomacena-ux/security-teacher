/**
 * LevelBeats — the vocabulary spine every level game hangs its beats on.
 *
 * A level is 4 lessons × 10 items = 40 items, and a game is 8 chapters × 5
 * beats = 40 beats (ricerca/03 §3.4). The two line up one to one, in lesson
 * order: chapter c, beat b → item c·5 + b, so chapters 2k and 2k+1 belong to
 * lesson k. That is what makes DOCTRINE §46.5 provable for a concept game:
 * every beat has exactly one "term of the beat", the game presents its
 * meaning in the world (Italian), stamps the English term on the thing the
 * verb acts on, and grades the pick through `LevelItem#attempt`. Distractors
 * are always real terms of the same lesson (ricerca/35 §35.3.3), never
 * invented strings.
 *
 * Nothing here draws or knows a mechanic. It only answers: which item is this
 * beat about, which other terms may stand next to it, and how to show a
 * bilingual string in one language.
 */

export const BEATS_PER_CHAPTER = 5;

/** Flat index of a (chapter, beat) pair in the 40-slot spine. */
export function beatIndex(chapter, beat, beatsPerChapter = BEATS_PER_CHAPTER) {
  const c = Number.isFinite(chapter) ? Math.max(0, chapter) : 0;
  const b = Number.isFinite(beat) ? Math.max(0, beat) : 0;
  return c * beatsPerChapter + b;
}

/**
 * Every item a beat must present. A 40-item level gives one per beat. A level
 * with more items than the spine has slots (Cybersecurity L1 has 42) spreads
 * them evenly, so a few beats carry two terms and none is left behind; a level
 * with fewer wraps around so no beat is ever without a term.
 * @returns {import('./LevelItem.js').LevelItem[]}
 */
export function beatItems(
  session,
  chapter,
  beat,
  chapters = 8,
  beatsPerChapter = BEATS_PER_CHAPTER
) {
  const items = session && session.items ? session.items : [];
  if (!items.length) return [];
  const slots = chapters * beatsPerChapter;
  const k = beatIndex(chapter, beat, beatsPerChapter) % slots;
  if (items.length <= slots) return [items[k % items.length]];
  const from = Math.floor((k * items.length) / slots);
  const to = Math.floor(((k + 1) * items.length) / slots);
  return items.slice(from, Math.max(to, from + 1));
}

/**
 * The item a beat teaches. Wraps around when a game has more beats than the
 * level has items (a 30-item level under 8 chapters), so a beat is never
 * without a term; the conformance suite still requires every item to be
 * reached at least once.
 * @returns {import('./LevelItem.js').LevelItem | null}
 */
export function beatItem(session, chapter, beat) {
  return beatItems(session, chapter, beat)[0] || null;
}

/** The lesson a beat belongs to (the lesson of its item). */
export function beatLesson(session, chapter, beat) {
  const item = beatItem(session, chapter, beat);
  if (!item || !session.lessons) return null;
  return session.lessons.find((l) => l.id === item.lesson) || null;
}

function normalizeTerm(text) {
  return String(text || '')
    .trim()
    .toLowerCase();
}

function shuffle(input) {
  const a = input.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

/**
 * `count` other items to stand next to `item` as wrong options: the same
 * lesson first (they are the confusable neighbours the lesson exists to
 * separate), then the rest of the level if the lesson runs out. Never the
 * item itself, never a duplicate English string.
 * @returns {import('./LevelItem.js').LevelItem[]}
 */
export function distractors(session, item, count) {
  if (!session || !item || count <= 0) return [];
  const seen = new Set([normalizeTerm(item.english)]);
  const pick = (pool, out) => {
    for (const other of shuffle(pool)) {
      if (out.length >= count) break;
      const key = normalizeTerm(other.english);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(other);
    }
    return out;
  };
  const sameLesson = (session.items || []).filter((i) => i !== item && i.lesson === item.lesson);
  const out = pick(sameLesson, []);
  if (out.length < count)
    pick(
      (session.items || []).filter((i) => i !== item),
      out
    );
  return out;
}

/**
 * The short English label to stamp on an object. Topic items are terms
 * ("Event Loop", "npm install"); the Learn levels are whole sentences, which
 * the two Inglese games handle themselves and never pass through here.
 */
export function labelOf(item) {
  return item ? String(item.english || '').trim() : '';
}

/**
 * Pick one half of a bilingual "it / en" string. Lesson and level names are
 * written that way in the data files; item meanings are plain Italian.
 */
export function pickLang(text, lang) {
  const parts = String(text || '').split(' / ');
  if (parts.length < 2) return String(text || '');
  return lang === 'en' ? parts.slice(1).join(' / ') : parts[0];
}

/**
 * What the world says about the term: its Italian meaning in `it`, the term
 * itself in `en`. Some meanings carry the term in brackets — "Parola d'ordine
 * (Password)" — which would hand the answer to the player (ricerca/00 §0.4,
 * TEST 1), so the bracket is stripped for the sign.
 */
export function meaningOf(item, lang) {
  if (!item) return '';
  if (lang === 'en') return labelOf(item);
  return String(item.italian || '')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .trim();
}

/**
 * Every item of a level, in the order the spine visits them, so a suite can
 * assert that 40 beats cover 40 items with no repeat.
 */
export function spine(session, chapters = 8, beatsPerChapter = BEATS_PER_CHAPTER) {
  const out = [];
  for (let c = 0; c < chapters; c += 1) {
    for (let b = 0; b < beatsPerChapter; b += 1) {
      out.push(...beatItems(session, c, b, chapters, beatsPerChapter));
    }
  }
  return out;
}

/**
 * `count` other items of the same lesson to fill a beat that has more
 * customers, events or crates than terms — each one is a real, graded
 * response too. Falls back to the level when the lesson runs out.
 */
export function fillers(session, item, count) {
  return distractors(session, item, count);
}
