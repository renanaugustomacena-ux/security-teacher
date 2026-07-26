/**
 * LESSON V2 SCHEDULER - FlowLearn
 * ===============================
 *
 * Pure exercise planner for the redesigned lesson loop. No DOM, no side
 * effects — the whole beat plan is computed up front so the ordering rules are
 * deterministic and unit-testable.
 *
 * Rules encoded here (from the teach-then-practice research recipe):
 *   - Blocked drills climb an ascending ladder: recognition -> cued -> production.
 *   - Never the same exercise format twice in a row.
 *   - At most 3 recognition-tier exercises across the whole lesson (recognition
 *     formats are scaffolding into production, not the destination).
 *   - The interleave beat re-tests every drilled item in a DIFFERENT format than
 *     it was drilled in (linked via `reuseOf`), plus a couple of spaced older
 *     items.
 *   - Tier selection is nudged toward the ~85% success frontier using item
 *     analytics (hard items stay cued instead of jumping to production).
 */

import { adaptiveDifficultyService } from '../../services/AdaptiveDifficultyService.js';

export const DRILL_A_LADDER = ['mc-cloze', 'typed-cloze', 'typed-production'];
export const DRILL_B_LADDER = ['listen-match', 'typed-cloze', 'typed-production'];

export const FORMAT_TIER = {
  'mc-cloze': 'recognition',
  'listen-match': 'recognition',
  'typed-cloze': 'cued',
  'typed-production': 'production',
};

const RECOGNITION_FORMATS = new Set(['mc-cloze', 'listen-match']);
const MAX_RECOGNITION = 3;
const HARD_DIFFICULTY = 0.66;

function itemKey(item) {
  const topic = item._topicId ?? 'x';
  const level = item._level ?? 0;
  const ctx = item.context || 'general';
  return `${topic}:${level}:${ctx}:${item.english}`;
}

/**
 * Build the full exercise plan for a lesson.
 *
 * @param {object} input
 * @param {Array} input.chunkA  - first group of new items (2-3)
 * @param {Array} input.chunkB  - second group of new items (2-3)
 * @param {Array} [input.older] - spaced older items (SRS-due) for interleave
 * @param {(key:string)=>object|null} [input.getAnalytics] - analytics lookup
 * @returns {{ exercises: Array<{beat,itemKey,item,format,tier,reuseOf}> }}
 */
export function buildPlan({ chunkA = [], chunkB = [], older = [], getAnalytics = () => null }) {
  const exercises = [];
  let prevFormat = null;
  let recognitionCount = 0;
  const usedFormatsByKey = new Map();

  const difficultyOf = (item) => {
    const analytics = getAnalytics(itemKey(item));
    return adaptiveDifficultyService.computeItemDifficulty(analytics);
  };

  const record = (key, format) => {
    const set = usedFormatsByKey.get(key) || new Set();
    set.add(format);
    usedFormatsByKey.set(key, set);
  };

  // Downgrade to a non-recognition format once the recognition cap is hit, and
  // never repeat the immediately previous format.
  const resolveFormat = (item, desiredFormat, desiredTier) => {
    let format = desiredFormat;
    let tier = desiredTier;

    if (RECOGNITION_FORMATS.has(format) && recognitionCount >= MAX_RECOGNITION) {
      format = 'typed-cloze';
      tier = 'cued';
    }
    if (format === prevFormat) {
      format = format === 'typed-cloze' ? 'typed-production' : 'typed-cloze';
      tier = FORMAT_TIER[format];
    }
    return { format, tier };
  };

  const push = (item, beat, desiredFormat, reuseOf = null) => {
    const key = itemKey(item);
    const { format, tier } = resolveFormat(item, desiredFormat, FORMAT_TIER[desiredFormat]);
    if (RECOGNITION_FORMATS.has(format)) recognitionCount += 1;
    record(key, format);
    prevFormat = format;
    exercises.push({ beat, itemKey: key, item, format, tier, reuseOf });
  };

  const buildBlocked = (chunk, beat, ladder) => {
    if (!chunk.length) return;
    ladder.forEach((ladderFormat, i) => {
      const item = chunk[i % chunk.length];
      // Hard items don't jump straight to typed production — hold them at cued
      // so the drill stays near the ~85% success frontier.
      let format = ladderFormat;
      if (format === 'typed-production' && difficultyOf(item) >= HARD_DIFFICULTY) {
        format = 'typed-cloze';
      }
      push(item, beat, format);
    });
  };

  buildBlocked(chunkA, 'drillA', DRILL_A_LADDER);
  buildBlocked(chunkB, 'drillB', DRILL_B_LADDER);

  // Interleave: re-test each unique drilled item in a format it has NOT yet
  // seen, hardest-first when the item is comfortable.
  const drilledKeys = [];
  const drilledItemByKey = new Map();
  for (const ex of exercises) {
    if (!drilledItemByKey.has(ex.itemKey)) {
      drilledItemByKey.set(ex.itemKey, ex.item);
      drilledKeys.push(ex.itemKey);
    }
  }

  const freshFormatFor = (key, item) => {
    const used = usedFormatsByKey.get(key) || new Set();
    const hard = difficultyOf(item) >= HARD_DIFFICULTY;
    const preference = hard
      ? ['typed-cloze', 'mc-cloze', 'typed-production']
      : ['typed-production', 'typed-cloze', 'mc-cloze'];
    return preference.find((f) => !used.has(f) && f !== prevFormat) || 'typed-cloze';
  };

  for (const key of drilledKeys) {
    const item = drilledItemByKey.get(key);
    push(item, 'interleave', freshFormatFor(key, item), key);
  }

  // A couple of spaced older items keep prior lessons alive (recognition, but
  // still subject to the global cap).
  for (const item of older.slice(0, 2)) {
    const format = item.example ? 'mc-cloze' : 'listen-match';
    push(item, 'interleave', format, itemKey(item));
  }

  return { exercises };
}
