/**
 * LESSON V2 ENGINE - FlowLearn
 * ============================
 *
 * The redesigned lesson loop that replaces the static card-dump. Instead of
 * "read every term, then answer 2 MCQs", it runs a research-backed
 * teach-then-immediately-practice cycle as a beat state machine:
 *
 *   warmup -> presentA -> drillA -> presentB -> drillB -> interleave -> applied -> summary
 *
 * Blocked drills climb recognition -> cued -> production; the interleave beat
 * mixes chunks A+B plus spaced older items and re-tests each in a fresh format;
 * the applied beat runs a real in-lesson terminal lab (LabEngine). The exercise
 * ordering is precomputed by the pure LessonV2Scheduler so the rules are
 * deterministic.
 *
 * Built behind the per-topic flag (lessonFlags.js) — only the cybersecurity
 * pilot uses this; every other domain keeps the untouched TopicLessonEngine.
 *
 * Doctrine: events via registerAction('lessonV2.*'); all HTML through
 * escapeHtml; ~800-line cap honoured via the beats/drills mixin split.
 */

import { analyticsService } from '../../services/AnalyticsService.js';
import { registerAction } from '../../utils/EventDispatch.js';
import { buildPlan } from './LessonV2Scheduler.js';
import { lessonV2BeatsMixin } from './LessonV2Beats.js';
import { lessonV2DrillsMixin } from './LessonV2Drills.js';

const BEATS = [
  'warmup',
  'presentA',
  'drillA',
  'presentB',
  'drillB',
  'interleave',
  'applied',
  'summary',
];

const BEAT_LABELS = {
  warmup: 'Ripasso / Warm-up',
  presentA: 'Impara / Learn',
  drillA: 'Pratica / Practice',
  presentB: 'Impara / Learn',
  drillB: 'Pratica / Practice',
  interleave: 'Mix',
  applied: 'Lab',
  summary: '',
};

export class LessonV2Engine {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.lesson = null;
    this.topicId = null;
    this.levelNum = null;
    this.container = null;

    this.allItems = [];
    this.chunks = { A: [], B: [] };
    this.older = [];
    this.plan = { exercises: [] };

    this.beatPtr = 0;
    this.currentDrillBeat = null;
    this.exIndex = 0;

    this.totalCorrect = 0;
    this.totalAnswered = 0;
    this.hintsUsed = 0;
    this.questionStartTime = 0;
    this.answeredKeys = new Set();

    this.warmup = { cards: [], index: 0, correct: 0 };
    this.lab = null;

    registerAction('lessonV2.next', () => this._advanceBeat());
    registerAction('lessonV2.answerMc', (ds, _e, el) => this.answerMc(ds, el));
    registerAction('lessonV2.submitTyped', (ds) => this.submitTyped(ds));
    registerAction('lessonV2.replayAudio', (ds) => this.replayAudio(ds));
    registerAction('lessonV2.warmupAnswer', (ds, _e, el) => this.warmupAnswer(ds, el));
    registerAction('lessonV2.hint', () => this.showDrillHint());
  }

  /** Entry point — called by TopicManager.openLesson() when the flag is on. */
  start(lesson, topicId, levelNum) {
    this.lesson = lesson;
    this.topicId = topicId;
    this.levelNum = levelNum;
    this.container = document.getElementById('topic-lesson-content');

    // Stamp topic/level so item keys line up with analytics + mastery + SRS.
    this.allItems = (lesson.items || []).map((it) => ({
      ...it,
      _topicId: topicId,
      _level: levelNum,
    }));
    this.chunks = this._buildChunks(this.allItems);

    this.older = this._dueForTopic(topicId);
    this.plan = buildPlan({
      chunkA: this.chunks.A,
      chunkB: this.chunks.B,
      older: this.older.slice(0, 2),
      getAnalytics: (key) => analyticsService.getItemAnalytics(key),
    });
    this.warmup = { cards: this.older.slice(0, 3), index: 0, correct: 0 };

    const titleEl = document.getElementById('topic-lesson-title');
    if (titleEl) titleEl.textContent = lesson.title;

    this.totalCorrect = 0;
    this.totalAnswered = 0;
    this.answeredKeys = new Set();
    this.beatPtr = 0;
    this._renderBeat();
    window._lessonV2Engine = this;
  }

  _dueForTopic(topicId) {
    const srs = typeof window !== 'undefined' ? window.srsManager : null;
    if (!srs || typeof srs.getDueCards !== 'function') return [];
    try {
      return srs
        .getDueCards()
        .filter((c) => typeof c.source === 'string' && c.source.startsWith(`topic-${topicId}`));
    } catch {
      return [];
    }
  }

  _buildChunks(items) {
    const map = new Map();
    for (const it of items) {
      const ctx = it.context || 'general';
      if (!map.has(ctx)) map.set(ctx, []);
      map.get(ctx).push(it);
    }
    const ordered = Array.from(map.values()).flat();
    const mid = Math.ceil(ordered.length / 2);
    return { A: ordered.slice(0, mid), B: ordered.slice(mid) };
  }

  _currentBeat() {
    return BEATS[this.beatPtr];
  }

  _renderBeat() {
    const beat = this._currentBeat();
    this._updateHeaderProgress(beat);

    switch (beat) {
      case 'warmup':
        if (!this.warmup.cards.length) return this._advanceBeat();
        return this.renderWarmup();
      case 'presentA':
        if (!this.chunks.A.length) return this._advanceBeat();
        return this.renderPresent('A');
      case 'presentB':
        if (!this.chunks.B.length) return this._advanceBeat();
        return this.renderPresent('B');
      case 'drillA':
      case 'drillB':
      case 'interleave':
        return this._enterDrill(beat);
      case 'applied':
        return this.renderApplied();
      case 'summary':
        return this.renderSummary();
      default:
        return this.renderSummary();
    }
  }

  _advanceBeat() {
    if (this.beatPtr < BEATS.length - 1) {
      this.beatPtr += 1;
      this._renderBeat();
    }
  }

  _enterDrill(beat) {
    this.currentDrillBeat = beat;
    this.exIndex = 0;
    if (!this._beatExercises(beat).length) return this._advanceBeat();
    return this.renderDrill();
  }

  _beatExercises(beat) {
    return this.plan.exercises.filter((e) => e.beat === beat);
  }

  _updateHeaderProgress(beat) {
    const el = document.getElementById('topic-lesson-progress');
    if (el) el.textContent = BEAT_LABELS[beat] || '';
  }

  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

Object.assign(LessonV2Engine.prototype, lessonV2BeatsMixin, lessonV2DrillsMixin);
