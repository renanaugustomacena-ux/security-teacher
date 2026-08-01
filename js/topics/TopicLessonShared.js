/**
 * TOPIC LESSON SHARED - FlowLearn
 * ================================
 *
 * Common building blocks for every lesson layout (TopicLessonEngine and the
 * alternative layouts registered in TopicLessonLayouts.js).
 *
 * Extracted so that adding a new layout does not mean re-deriving the grouping,
 * distractor, scoring, persistence and summary logic a fifth time. A layout is
 * then only responsible for HOW it teaches — the bookkeeping is identical.
 */

import { escapeHtml } from '../utils/SanitizeHtml.js';
import { shuffleArray } from '../utils/PracticeUtils.js';
import { masteryService } from '../services/MasteryService.js';
import { getTopicMeta } from './registry.js';

export { escapeHtml };

/** Fisher-Yates shuffle (re-exported so layouts import from one place). */
export function shuffle(arr) {
  return shuffleArray(arr || []);
}

/** Group lesson items by their `context` field, preserving first-seen order. */
export function buildContextGroups(items) {
  const groupMap = new Map();
  (items || []).forEach((item) => {
    const ctx = item.context || 'general';
    if (!groupMap.has(ctx)) groupMap.set(ctx, []);
    groupMap.get(ctx).push(item);
  });
  return Array.from(groupMap.entries()).map(([context, contextItems]) => ({
    context,
    items: contextItems,
  }));
}

/** Human-readable context label: `package-mgmt` -> `Package Mgmt`. */
export function formatContextName(context) {
  return String(context || 'general')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Canonical analytics/mastery key. Must match TopicPracticeResultHandler. */
export function itemKeyFor(topicId, levelNum, item, fallbackContext) {
  const ctx = item.context || fallbackContext || 'general';
  return `${topicId}:${levelNum}:${ctx}:${item.english}`;
}

/** Mark a batch of items as INTRODUCED (first stage of the mastery model). */
export function markIntroduced(items, topicId, levelNum, fallbackContext) {
  for (const item of items || []) {
    if (!item || !item.english) continue;
    masteryService.markIntroduced(itemKeyFor(topicId, levelNum, item, fallbackContext));
  }
}

/**
 * Pick `count` distractor values for `field`, preferring items that share the
 * target's context (more plausible neighbours) before widening to the pool.
 */
export function getDistractors(targetItem, allItems, field, count) {
  const targetCtx = targetItem.context;
  const isPlausible = (it) => it !== targetItem && it[field] && it[field] !== targetItem[field];

  const sameCtx = (allItems || []).filter((it) => isPlausible(it) && it.context === targetCtx);
  const otherCtx = (allItems || []).filter((it) => isPlausible(it) && it.context !== targetCtx);

  const seen = new Set();
  const pick = (pool) => {
    for (const val of shuffle(pool).map((it) => it[field])) {
      if (seen.size >= count) break;
      if (val && !seen.has(val)) seen.add(val);
    }
  };
  pick(sameCtx);
  if (seen.size < count) pick(otherCtx);
  return Array.from(seen).slice(0, count);
}

/** Build a 4-option multiple choice set around `correct`. */
export function buildOptions(targetItem, allItems, field, optionCount = 4) {
  const distractors = getDistractors(targetItem, allItems, field, optionCount - 1);
  return shuffle([targetItem[field], ...distractors]);
}

/** The topic's accent colour, with a safe CSS fallback. */
export function topicColor(topicId) {
  const meta = getTopicMeta(topicId);
  return meta ? meta.color : 'var(--accent-primary)';
}

/**
 * Stars earned for a lesson, from the ratio of correct answers.
 * Completing a lesson always earns at least one star.
 */
export function starsForRatio(ratio) {
  if (ratio >= 0.9) return 3;
  if (ratio >= 0.5) return 2;
  return 1;
}

/**
 * Persist lesson completion: stars, progress flags, daily counters, XP and SRS
 * ingestion. Every layout calls this exactly once, at its own summary stage.
 *
 * @returns {{stars: number, xp: number, ratio: number}}
 */
export function finalizeLesson({
  progressManager,
  lesson,
  topicId,
  levelNum,
  correctCount = 0,
  totalQuestions = 0,
}) {
  const ratio = totalQuestions > 0 ? correctCount / totalQuestions : 0;
  const stars = starsForRatio(ratio);

  const xpFromCorrect = correctCount * 10;
  const completionBonus = 20;
  const perfectBonus = totalQuestions > 0 && correctCount === totalQuestions ? 15 : 0;
  const xp = xpFromCorrect + completionBonus + perfectBonus;

  const itemCount = lesson?.items?.length || 0;

  progressManager?.updateTopicLessonStars?.(topicId, levelNum, lesson?.id, stars);
  progressManager?.completeTopicLesson?.(topicId, levelNum, lesson?.id);
  progressManager?.incrementDailyLessons?.();
  progressManager?.incrementDailyWords?.(itemCount);
  progressManager?.addXP?.(xp);

  if (typeof window !== 'undefined' && window.srsManager && lesson?.items) {
    const words = lesson.items
      .filter((item) => item.english && item.italian)
      .map((item) => ({
        english: item.english,
        italian: item.italian,
        pronunciation: item.pronunciation || '',
        example: item.example || '',
      }));
    if (words.length > 0) {
      window.srsManager.addWords(words, `topic-${topicId}-${levelNum}-${lesson.id}`);
    }
  }

  return { stars, xp, ratio };
}

const STAR_FULL = '⭐';
const STAR_EMPTY = '☆';

/** Render `n` filled stars out of `max`. */
export function starDisplay(n, max = 3) {
  const filled = Math.max(0, Math.min(max, n));
  return STAR_FULL.repeat(filled) + STAR_EMPTY.repeat(max - filled);
}

/**
 * Shared end-of-lesson summary markup. `sections` is optional extra HTML that a
 * layout can inject (e.g. a per-group breakdown or terms to review).
 */
export function renderSummaryHtml({
  lesson,
  topicId,
  levelNum,
  stars,
  xp,
  correctCount,
  totalQuestions,
  layoutLabel = '',
  sections = '',
}) {
  const itemCount = lesson?.items?.length || 0;
  const label =
    stars === 3
      ? 'Eccellente! / Excellent!'
      : stars === 2
        ? 'Bene! / Good!'
        : 'Completata / Completed';

  return `
    <div class="lesson-engine">
      <div class="lesson-summary">
        <div class="summary-header">
          <div class="summary-icon">&#127881;</div>
          <h3>Lezione Completata! / Lesson Completed!</h3>
          <p class="summary-lesson-title">${escapeHtml(lesson?.title || '')}</p>
          ${layoutLabel ? `<p class="summary-layout-badge">${escapeHtml(layoutLabel)}</p>` : ''}
        </div>

        <div class="summary-overall">
          <div class="summary-overall-stars">${starDisplay(stars)}</div>
          <div class="summary-overall-label">${label}</div>
        </div>

        <div class="summary-stats">
          <div class="summary-stat">
            <span class="summary-stat-value">${itemCount}</span>
            <span class="summary-stat-label">Termini / Terms</span>
          </div>
          <div class="summary-stat">
            <span class="summary-stat-value">+${xp}</span>
            <span class="summary-stat-label">XP</span>
          </div>
          <div class="summary-stat">
            <span class="summary-stat-value">${correctCount}/${totalQuestions}</span>
            <span class="summary-stat-label">Risposte / Answers</span>
          </div>
        </div>

        ${sections}

        <div class="summary-actions">
          <button class="btn btn-secondary" data-action="topic.openLevel" data-topic-id="${escapeHtml(topicId)}" data-level="${escapeHtml(String(levelNum))}">
            Torna al Livello / Back to Level
          </button>
          <button class="btn lesson-start-btn" data-action="topic.modeSelect" data-topic-id="${escapeHtml(topicId)}" data-level="${escapeHtml(String(levelNum))}">
            Pratica Ora / Practice Now
          </button>
        </div>
      </div>
    </div>
  `;
}

/** Render the "terms to review" block shared by several layouts. */
export function renderReviewListHtml(items) {
  if (!items || items.length === 0) return '';
  const seen = new Set();
  const rows = [];
  for (const item of items) {
    if (!item?.english || seen.has(item.english)) continue;
    seen.add(item.english);
    rows.push(
      `<li><strong>${escapeHtml(item.english)}</strong> - ${escapeHtml(item.italian || '')}</li>`
    );
  }
  if (rows.length === 0) return '';
  return `
    <div class="summary-review">
      <h4>Termini da Ripassare / Terms to Review</h4>
      <ul>${rows.join('')}</ul>
    </div>
  `;
}

/**
 * Stable 32-bit hash of a string. Used to rotate lesson layouts deterministically
 * so a given lesson always renders with the same layout (no surprise reshuffles
 * between sessions) while consecutive lessons differ.
 */
export function hashString(str) {
  let h = 2166136261;
  const s = String(str || '');
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
