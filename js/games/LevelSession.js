/**
 * LevelSession — the item ledger for one level of one surface.
 *
 * Design: docs/superpowers/specs/2026-08-13-level-game-sdk-design.md.
 *
 * The SDK renders nothing. Its whole job is to make correct telemetry the path
 * of least resistance, because Doctrine §23-§42 (FSRS, per-item analytics, the
 * seven-stage mastery model, adaptive difficulty, error analysis, leech
 * detection, progressive hints, quests, currency, SmartScore) are all fed from
 * one call site — `LevelItem#attempt`. This class owns the ledger around it:
 * which items exist, what state each is in, and whether the level may be
 * called complete.
 */

import { getLessonsByLevel } from '../lessons.js';
import { analyticsService } from '../services/AnalyticsService.js';
import { masteryService } from '../services/MasteryService.js';
import { currencyService } from '../services/CurrencyService.js';
import { questService } from '../services/QuestService.js';
import { adaptiveDifficultyService } from '../services/AdaptiveDifficultyService.js';
import { storageService } from '../services/StorageService.js';
import { LevelItem, STATE_ORDER } from './LevelItem.js';
import { LEARN_SURFACE } from './registry.js';

export { LEARN_SURFACE };

/**
 * Load the raw level for a surface. `learn` reads the four bilingual lesson
 * levels; anything else is a topic id and loads lazily (§1.6) exactly as
 * TopicManager does, so games add nothing to the initial bundle.
 */
async function loadLevel(surface, level) {
  if (surface === LEARN_SURFACE) {
    const data = getLessonsByLevel(level);
    if (!data) return null;
    return { name: data.name, lessons: data.lessons || [] };
  }
  try {
    const module = await import(`../topics/data/${surface}.js`);
    const topic = module.default;
    const lvl = topic && topic.levels ? topic.levels[level] : null;
    if (!lvl) return null;
    return { name: lvl.name, lessons: lvl.lessons || [] };
  } catch (err) {
    console.error(`LevelSession: failed to load "${surface}" level ${level}:`, err && err.message);
    return null;
  }
}

export class LevelSession {
  constructor({ surface, level, mode, lessons, progressManager }) {
    this.surface = surface;
    this.level = level;
    this.mode = mode;
    this.progressManager = progressManager || null;

    this.lessons = lessons.map((lesson) => ({ id: lesson.id, title: lesson.title, items: [] }));
    this.items = [];
    lessons.forEach((lesson, li) => {
      (lesson.items || []).forEach((raw) => {
        if (!raw || !raw.english) return;
        const item = new LevelItem(this, raw, lesson, this.items.length);
        this.items.push(item);
        this.lessons[li].items.push(item);
      });
    });
    this.byKey = new Map(this.items.map((i) => [i.key, i]));

    this.xp = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.totalAttempts = 0;
    this.totalCorrect = 0;
    this.totalResponseMs = 0;
    this._markAt = Date.now();
    this._dirty = false;
    this.completed = false;
  }

  get storeKey() {
    return `game:${this.surface}:${this.level}`;
  }

  /** Restart the per-response clock. A game calls this when it presents. */
  mark() {
    this._markAt = Date.now();
  }

  elapsedMs() {
    return Date.now() - this._markAt;
  }

  touch() {
    this._dirty = true;
  }

  get dirty() {
    return this._dirty;
  }

  /**
   * Adaptive-ordered suggestion (§26.1): items near the mastery frontier
   * first. Optional — a game with its own pedagogical order ignores it.
   */
  queue(count = 10) {
    return adaptiveDifficultyService.selectItems(this.items, count, (key) =>
      analyticsService.getItemAnalytics(key)
    );
  }

  progress() {
    let introduced = 0;
    let attempted = 0;
    let cleared = 0;
    for (const item of this.items) {
      const rank = STATE_ORDER.indexOf(item.state);
      if (rank >= 1) introduced += 1;
      if (rank >= 2) attempted += 1;
      if (rank >= 3) cleared += 1;
    }
    return {
      introduced,
      attempted,
      cleared,
      total: this.items.length,
      accuracy: this.totalAttempts === 0 ? 0 : this.totalCorrect / this.totalAttempts,
    };
  }

  /**
   * The ledger invariant (§4.3): a level does not pass while any item is still
   * unseen or unattempted. This is what stops a beautiful game that teaches
   * nothing from counting as a completed level.
   */
  finish() {
    this._flushMastery();

    const missed = this.items.filter((i) => STATE_ORDER.indexOf(i.state) < 2).map((i) => i.english);
    const p = this.progress();
    const coverage = this.items.length === 0 ? 0 : p.attempted / this.items.length;
    const passed = missed.length === 0;

    if (!passed) {
      console.warn(
        `LevelSession ${this.storeKey}: finish() with ${missed.length} uncovered item(s) — ` +
          'level completion withheld (§4.3).'
      );
    }

    questService.recordMetric('practiceCount', 1);
    questService.recordMetric('sessionXP', this.xp);
    questService.recordMetric('weekXP', this.xp);
    questService.recordMetric('maxStreak', this.maxStreak);
    if (passed && p.accuracy === 1 && this.totalAttempts > 0) {
      questService.recordMetric('perfectScores', 1);
      currencyService.earn(10, 'perfect_game');
    }

    return {
      passed,
      coverage,
      missed,
      xp: this.xp,
      accuracy: p.accuracy,
      correct: this.totalCorrect,
      attempts: this.totalAttempts,
      maxStreak: this.maxStreak,
      avgResponseMs: this.totalAttempts === 0 ? 0 : this.totalResponseMs / this.totalAttempts,
    };
  }

  /** True once every item has been cleared: the game has nothing left to teach. */
  isCovered() {
    return this.items.length > 0 && this.items.every((i) => i.state === 'cleared');
  }

  /**
   * Close the level, once. `finish()` applies the §4.3 invariant; the
   * `completed` flag is persisted with the ledger so a later sitting — or a
   * replay of a finished level — never awards the level a second time.
   *
   * @returns {object|null} the `finish()` result, or null when already completed
   */
  complete() {
    if (this.completed) return null;
    const result = this.finish();
    if (result.passed) this.completed = true;
    return result;
  }

  _flushMastery() {
    for (const item of this.items) {
      if (item.attempts === 0) continue;
      const a = analyticsService.getItemAnalytics(item.key);
      if (a) masteryService.updateMastery(item.key, a);
    }
  }

  // ─── persistence ───────────────────────────────
  // A level is 40 items across eight chapters — roughly an hour (ricerca/31
  // §31.3) — so it always spans several sittings. The ledger has to survive
  // them; §9 puts that through StorageService, never localStorage.

  snapshot(extra = {}) {
    return {
      userId: this.storeKey,
      cleared: this.items.filter((i) => i.state === 'cleared').map((i) => i.key),
      attempted: this.items.filter((i) => i.state === 'attempted').map((i) => i.key),
      completed: this.completed,
      updatedAt: new Date().toISOString(),
      ...extra,
    };
  }

  async save(extra = {}) {
    this._dirty = false;
    try {
      await storageService.save('progress', this.snapshot(extra));
    } catch (err) {
      console.warn(`LevelSession ${this.storeKey}: save failed:`, err && err.message);
    }
  }

  async restore() {
    let record = null;
    try {
      record = await storageService.load('progress', this.storeKey);
    } catch (err) {
      console.warn(`LevelSession ${this.storeKey}: restore failed:`, err && err.message);
    }
    if (!record) return { chapter: 0, beat: 0 };

    const attempted = Array.isArray(record.attempted) ? record.attempted : [];
    const cleared = Array.isArray(record.cleared) ? record.cleared : [];
    for (const key of attempted) {
      const item = this.byKey.get(key);
      if (item) item.advance('attempted');
    }
    for (const key of cleared) {
      const item = this.byKey.get(key);
      if (item) item.advance('cleared');
    }
    this.completed = record.completed === true;
    return {
      chapter: Number.isFinite(record.chapter) ? record.chapter : 0,
      beat: Number.isFinite(record.beat) ? record.beat : 0,
    };
  }
}

/**
 * Build a session for one level.
 *
 * @param {object} opts
 * @param {string} opts.surface - `learn` or a topic id
 * @param {number} opts.level
 * @param {string} [opts.mode] - the exercise-mode string recorded in analytics
 * @param {object} [opts.progressManager]
 * @returns {Promise<LevelSession|null>} null when the level does not exist
 */
export async function createLevelSession({ surface, level, mode, progressManager }) {
  const data = await loadLevel(surface, level);
  if (!data || data.lessons.length === 0) return null;
  const session = new LevelSession({
    surface,
    level,
    mode: mode || 'game',
    lessons: data.lessons,
    progressManager,
  });
  session.levelName = data.name || '';
  return session;
}
