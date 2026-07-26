/**
 * TOPIC PRACTICE — MATCH MODE (tap-the-pairs) - FlowLearn
 * =======================================================
 *
 * The genuinely-missing format: a real tap-to-connect pairs board (the old
 * `matching` mode was just a duplicate of the listening MCQ). Each board holds
 * 3-6 English<->Italian pairs across two INDEPENDENTLY shuffled columns.
 *
 * Anti-leak (the mistake that retired word-reorder, see
 * TopicPracticeRendering.js word-reorder note): every pair is tagged with an
 * OPAQUE random key carried identically on its English and its Italian tile —
 * never the translation text. Inspecting the DOM reveals only `data-key="k3"`,
 * so the answer cannot be read off the markup.
 *
 * Mixed onto TopicPracticeManager.prototype.
 */

import { escapeHtml, escapeAttr } from '../utils/SanitizeHtml.js';
import { shuffleArray } from '../utils/PracticeUtils.js';
import { analyticsService } from '../services/AnalyticsService.js';
import { sfxService } from '../services/SfxService.js';

const MAX_BOARDS = 6;
const MAX_PAIRS = 6;
const MIN_PAIRS = 3;
const XP_PER_PAIR = 5;

export const matchModeMixin = {
  generatePairsQuestions(pool) {
    const valid = pool.filter(
      (i) => i.english && i.italian && i.english.toLowerCase() !== i.italian.toLowerCase()
    );

    const groups = new Map();
    for (const item of valid) {
      const ctx = item.context || 'general';
      if (!groups.has(ctx)) groups.set(ctx, []);
      groups.get(ctx).push(item);
    }

    const boards = [];
    const build = (items) => {
      const chosen = shuffleArray(items).slice(0, MAX_PAIRS);
      if (chosen.length < MIN_PAIRS) return null;
      // Opaque keys, shuffled so key order never tracks tile order.
      const keys = shuffleArray(chosen.map((_, i) => `k${i}`));
      const pairs = chosen.map((item, i) => ({
        key: keys[i],
        en: item.english,
        it: item.italian,
        item,
      }));
      return {
        type: 'pairs',
        pairs,
        matched: [],
        selectedKey: null,
        selectedSide: null,
        wrongKey: null,
        enOrder: shuffleArray(pairs.map((p) => p.key)),
        itOrder: shuffleArray(pairs.map((p) => p.key)),
      };
    };

    for (const items of shuffleArray([...groups.values()])) {
      if (boards.length >= MAX_BOARDS) break;
      const board = build(items);
      if (board) boards.push(board);
    }
    if (!boards.length) {
      const board = build(valid);
      if (board) boards.push(board);
    }
    return boards;
  },

  renderPairsQuestion(container, q) {
    const byKey = (key) => q.pairs.find((p) => p.key === key);
    const tile = (key, side) => {
      const pair = byKey(key);
      if (!pair) return '';
      const isMatched = q.matched.includes(key);
      const isSelected = q.selectedKey === key && q.selectedSide === side;
      const isWrong = q.wrongKey === key;
      const classes = [
        'pairs-tile',
        isMatched ? 'pairs-matched' : '',
        isSelected ? 'pairs-selected' : '',
        isWrong ? 'pairs-wrong' : '',
      ]
        .filter(Boolean)
        .join(' ');
      const label = side === 'en' ? pair.en : pair.it;
      const attrs = isMatched
        ? ''
        : `data-action="topicPractice.tapPair" data-key="${escapeAttr(key)}" data-side="${side}"`;
      return `<button class="${classes}" ${attrs}>${escapeHtml(label)}</button>`;
    };

    const enCol = q.enOrder.map((k) => tile(k, 'en')).join('');
    const itCol = q.itOrder.map((k) => tile(k, 'it')).join('');

    container.innerHTML = `
      <div class="exercise-card pairs-card">
        <div class="exercise-instruction">Abbina i termini / Tap the matching pairs</div>
        <div class="pairs-progress">${q.matched.length}/${q.pairs.length}</div>
        <div class="pairs-board">
          <div class="pairs-col pairs-col-en">${enCol}</div>
          <div class="pairs-col pairs-col-it">${itCol}</div>
        </div>
      </div>
    `;
  },

  tapPair(ds) {
    const q = this.questions[this.currentQuestionIndex];
    if (!q || q.type !== 'pairs') return;
    const { key, side } = ds;
    if (q.matched.includes(key)) return;

    if (!q.selectedKey) {
      q.selectedKey = key;
      q.selectedSide = side;
      this._rerenderPairs(q);
      return;
    }

    // Re-tapping the same column just moves the selection.
    if (q.selectedSide === side) {
      q.selectedKey = key;
      q.selectedSide = side;
      this._rerenderPairs(q);
      return;
    }

    // Second tile from the other column — evaluate the match.
    if (q.selectedKey === key) {
      q.matched.push(key);
      q.selectedKey = null;
      q.selectedSide = null;
      this._recordPair(q, key, true);
      sfxService.correct?.();
      if (q.matched.length >= q.pairs.length) {
        this._completePairs(q);
        return;
      }
      this._rerenderPairs(q);
    } else {
      const missed = q.selectedKey;
      this._recordPair(q, missed, false);
      this.consecutiveCorrect = 0;
      sfxService.incorrect?.();
      q.wrongKey = key;
      q.selectedKey = null;
      q.selectedSide = null;
      this._rerenderPairs(q);
      setTimeout(() => {
        q.wrongKey = null;
        this._rerenderPairs(q);
      }, 500);
    }
  },

  _rerenderPairs(q) {
    const container = document.getElementById('topic-practice-content');
    if (container) this.renderPairsQuestion(container, q);
  },

  _recordPair(q, key, correct) {
    const pair = q.pairs.find((p) => p.key === key);
    if (!pair || !this.currentTopicId) return;
    const ctx = pair.item.context || 'general';
    const itemKey = `${this.currentTopicId}:${this.currentLevel}:${ctx}:${pair.item.english}`;
    analyticsService.recordResponse({
      itemKey,
      timestamp: new Date().toISOString(),
      exerciseMode: 'pairs',
      correct,
      responseTimeMs: 0,
      userAnswer: pair.item.english,
      expectedAnswer: pair.item.english,
      streakAtTime: this.consecutiveCorrect,
    });
  },

  _completePairs(q) {
    const xp = q.pairs.length * XP_PER_PAIR;
    this.score += 1;
    this.consecutiveCorrect += 1;
    if (this.consecutiveCorrect > this.maxStreak) this.maxStreak = this.consecutiveCorrect;
    this.sessionXP += xp;
    this.progressManager.addXP(xp);
    this.progressManager.incrementTopicWord(this.currentTopicId);
    this.updateMetaDisplay();
    this.showFloatingXP(xp);
    this._rerenderPairs(q);
    setTimeout(() => this.nextQuestion(), 700);
  },
};
