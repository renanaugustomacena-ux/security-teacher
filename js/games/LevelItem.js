/**
 * LevelItem — one teachable item and the single grading call site for games.
 *
 * Design: docs/superpowers/specs/2026-08-13-level-game-sdk-design.md §4.2.
 *
 * `attempt()` is the whole SDK. A game uses it rather than comparing strings
 * because it does work the game would otherwise reimplement — accent-tolerant
 * matching for Italian keyboards typing English, near-miss partial credit, the
 * XP curve with time and streak multipliers, the §29.2 hint penalty, streak
 * bookkeeping — and as a side effect performs the service fan-out that feeds
 * Doctrine §23-§42. Correct telemetry becomes the lazy path rather than a
 * discipline problem, which is how the design survives 360 game authors.
 *
 * It also fixes the defect the design records (§1.1): the legacy call site
 * passes the *correct* answer as `userAnswer`, so §27 error analysis has always
 * run on meaningless data. Here the two are distinct by construction.
 */

import { analyticsService } from '../services/AnalyticsService.js';
import { masteryService } from '../services/MasteryService.js';
import { smartScoreService } from '../services/SmartScoreService.js';
import { currencyService } from '../services/CurrencyService.js';
import { hintService } from '../services/HintService.js';
import { sfxService } from '../services/SfxService.js';
import { practiceHUD } from '../PracticeHUD.js';
import { nearMiss } from '../utils/StringDistance.js';
import { normalize, normalizeWithAccents, calculateXP } from '../utils/PracticeUtils.js';

export const STATE_ORDER = ['unseen', 'introduced', 'attempted', 'cleared'];

/** The Learn levels carry no `context` field; the lesson id fills the slot. */
export function contextOf(item, lesson) {
  return item.context || lesson.id || 'general';
}

export function buildItemKey(surface, level, context, english) {
  return `${surface}:${level}:${context}:${english}`;
}

function hapticTap(ms) {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    } catch (err) {
      // matchMedia can throw outside a browser
    }
  }
  try {
    navigator.vibrate(ms);
  } catch (err) {
    // older browsers throw in restricted contexts
  }
}

export class LevelItem {
  constructor(session, raw, lesson, index) {
    this._session = session;
    this._raw = raw;
    this.index = index;
    this.lesson = lesson.id;
    this.lessonTitle = lesson.title;
    this.context = contextOf(raw, lesson);
    this.key = buildItemKey(session.surface, session.level, this.context, raw.english);

    this.english = raw.english;
    this.italian = raw.italian;
    this.pronunciation = raw.pronunciation || '';
    this.phonetic = raw.phonetic || '';
    this.example = raw.example || '';
    this.note = raw.note || '';
    this.code = raw.code || '';
    this.command = raw.command || '';
    this.task = raw.task || '';
    this.difficulty = raw.difficulty || '';

    this.state = 'unseen';
    this.attempts = 0;
    this.correct = 0;
  }

  advance(state) {
    if (STATE_ORDER.indexOf(state) > STATE_ORDER.indexOf(this.state)) this.state = state;
  }

  /** Idempotent. Drives mastery stage 0 -> 1 (§25). */
  introduce() {
    if (this.state !== 'unseen') return;
    masteryService.markIntroduced(this.key);
    this.advance('introduced');
  }

  /** Three progressively more revealing hints for this item (§29). */
  hints() {
    return hintService.generateHints(this._raw, this._session.mode);
  }

  /**
   * Grade one response and fan it out.
   *
   * @param {string} userAnswer - what the learner actually produced. Never the
   *   expected value: §27 error analysis reads this field.
   * @param {object} [opts]
   * @param {string} [opts.expected] - the target for this response. Defaults to
   *   the item's English; games that grade a fragment (one word of a sentence,
   *   one command of a chain) pass the fragment.
   * @param {string} [opts.mode] - recorded as `exerciseMode`; drives per-mode
   *   accuracy (§27.3) and the mastery model's "correct in N modes" gate.
   * @param {number} [opts.hintsUsed] - 0-3, applies the §29.2 XP penalty.
   * @param {number} [opts.responseMs] - defaults to the session's own clock.
   * @param {boolean} [opts.silent] - suppress the SDK's audio and haptic cue
   *   when the game answers diegetically instead.
   * @returns {{correct: boolean, partial: boolean, expected: string,
   *   distance: number, xp: number, coins: number, streak: number}}
   */
  attempt(userAnswer, opts = {}) {
    const session = this._session;
    const expected = opts.expected == null ? this.english : String(opts.expected);
    const given = userAnswer == null ? '' : String(userAnswer);
    const mode = opts.mode || session.mode;

    const responseMs = Number.isFinite(opts.responseMs) ? opts.responseMs : session.elapsedMs();
    const responseSec = responseMs / 1000;

    const exact = normalize(given) === normalize(expected);
    const accented = !exact && normalizeWithAccents(given) === normalizeWithAccents(expected);
    const correct = exact || accented;
    const miss = correct ? { partial: false, edits: 0 } : nearMiss(given, expected);
    const partial = !correct && miss.partial;

    this.attempts += 1;
    if (correct) this.correct += 1;
    this.advance('attempted');

    session.totalAttempts += 1;
    session.totalResponseMs += responseMs;
    if (correct) {
      session.totalCorrect += 1;
      session.streak += 1;
      if (session.streak > session.maxStreak) session.maxStreak = session.streak;
    } else {
      session.streak = 0;
    }

    let xp = 0;
    if (correct || partial) {
      const base = calculateXP(responseSec, correct ? session.streak : 0);
      const hintMult = hintService.getXPMultiplier(Math.max(0, Math.min(3, opts.hintsUsed || 0)));
      xp = Math.max(0, Math.round(base * hintMult * (partial ? 0.5 : 1)));
      session.xp += xp;
      if (session.progressManager) session.progressManager.addXP(xp);
    }

    let coins = 0;
    if (correct) {
      coins = 1;
      currencyService.earn(coins, 'game_correct');
    }

    analyticsService.recordResponse({
      itemKey: this.key,
      timestamp: new Date().toISOString(),
      exerciseMode: mode,
      correct,
      responseTimeMs: Math.round(responseMs),
      userAnswer: given,
      expectedAnswer: expected,
      streakAtTime: session.streak,
    });
    smartScoreService.updateScore(session.surface, session.level, correct);

    if (!opts.silent) {
      if (correct) {
        sfxService.correct();
        hapticTap(12);
      } else if (partial) {
        sfxService.nearMiss();
      } else {
        sfxService.incorrect();
      }
    }
    practiceHUD.onAnswerResult({ correct, streak: session.streak });

    session.touch();

    return { correct, partial, expected, distance: miss.edits, xp, coins, streak: session.streak };
  }

  /**
   * Mark the item taught: the game's own goal for it is met (the sentence
   * crossed, the order served). Distinct from a correct `attempt()`, which is
   * one response among the several an item may need.
   */
  clear() {
    this.advance('cleared');
    this._session.touch();
  }
}
