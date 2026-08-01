/**
 * LESSON V2 DRILLS - Knowledge AIO
 * ================================
 *
 * Mixin for LessonV2Engine: the micro-exercise renderers + answer handling used
 * by the blocked-drill and interleave beats. Four formats climbing the
 * difficulty ladder:
 *   mc-cloze          (recognition) — fill the blank, multiple choice
 *   listen-match      (recognition) — hear the term, pick the meaning
 *   typed-cloze       (cued)        — type the word missing from the sentence
 *   typed-production  (production)  — type the English term from the Italian
 *
 * Answers flow to AnalyticsService (feeding BKT + mastery); typos are forgiven
 * via a near-miss check so a single letter never blocks progress.
 */

import { ttsService } from '../../services/TTSService.js';
import { analyticsService } from '../../services/AnalyticsService.js';
import { escapeHtml, escapeAttr } from '../../utils/SanitizeHtml.js';
import {
  normalize,
  normalizeWithAccents,
  shuffleArray,
  FEEDBACK_DWELL,
} from '../../utils/PracticeUtils.js';
import { nearMiss } from '../../utils/StringDistance.js';

export const lessonV2DrillsMixin = {
  _currentEx() {
    return this._beatExercises(this.currentDrillBeat)[this.exIndex];
  },

  _formatCtx(ctx) {
    return String(ctx || 'general').replace(/[-_]/g, ' ');
  },

  renderDrill() {
    if (!this.container) return;
    const exs = this._beatExercises(this.currentDrillBeat);
    const ex = exs[this.exIndex];
    if (!ex) {
      this._advanceBeat();
      return;
    }

    this.questionStartTime = Date.now();
    this._answerLocked = false;
    this._drillHintLevel = 0;

    const beatLabel = this.currentDrillBeat === 'interleave' ? 'Mix' : 'Pratica / Practice';
    const counter = `${this.exIndex + 1}/${exs.length}`;

    let body;
    switch (ex.format) {
      case 'mc-cloze':
        body = this._renderMcCloze(ex);
        break;
      case 'listen-match':
        body = this._renderListenMatch(ex);
        break;
      case 'typed-cloze':
        body = this._renderTypedCloze(ex);
        break;
      case 'typed-production':
      default:
        body = this._renderTypedProduction(ex);
        break;
    }

    this.container.innerHTML = `
      <div class="lesson-v2" style="--topic-color:${escapeAttr(this._topicColor())}">
        <div class="v2-drill">
          <div class="v2-beat-label">${beatLabel} · ${counter}</div>
          ${body}
          <div class="v2-feedback" id="v2-feedback"></div>
        </div>
      </div>
    `;

    ttsService.attachTTSListeners(this.container);
    if (ex.format === 'listen-match' && ttsService.isSupported) {
      ttsService.speakAuto(ex.item.english);
    }

    const input = document.getElementById('lessonv2-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.submitTyped({ correct: input.dataset.correct });
      });
    }
    window._lessonV2Engine = this;
  },

  // ─── FORMAT RENDERERS ─────────────────────────────

  _optBtn(opt, correct) {
    return `<button class="btn btn-secondary v2-option"
      data-action="lessonV2.answerMc" data-opt="${escapeAttr(opt)}" data-correct="${escapeAttr(correct)}">
      ${escapeHtml(opt)}</button>`;
  },

  _typedInput(correct) {
    return `
      <input type="text" id="lessonv2-input" class="practice-input v2-input"
        data-correct="${escapeAttr(correct)}" placeholder="Scrivi qui / Type here…"
        autocomplete="off" autocapitalize="off" spellcheck="false" autofocus>
      <div class="v2-drill-actions">
        <button class="btn btn-hint" data-action="lessonV2.hint">Suggerimento / Hint</button>
        <button class="btn btn-primary" data-action="lessonV2.submitTyped" data-correct="${escapeAttr(correct)}">
          Invia / Submit
        </button>
      </div>
      <div class="v2-hint" id="v2-hint"></div>`;
  },

  _renderMcCloze(ex) {
    const item = ex.item;
    const { en } = this._exampleParts(item);
    const cloze = this._cloze(en, item.english);
    if (cloze.ok) {
      const opts = shuffleArray([item.english, ...this._distractors(item, 'english', 3)]);
      return `
        <div class="v2-q-prompt">Completa la frase / Fill the blank:</div>
        <div class="v2-q-sentence">${escapeHtml(cloze.display)}</div>
        <div class="v2-options">${opts.map((o) => this._optBtn(o, item.english)).join('')}</div>`;
    }
    const opts = shuffleArray([item.italian, ...this._distractors(item, 'italian', 3)]);
    const speaker = ttsService.isSupported ? ttsService.speakerButtonHTML(item.english) : '';
    return `
      <div class="v2-q-prompt">Scegli la traduzione / Choose the translation:</div>
      <div class="v2-q-target">${escapeHtml(item.english)} ${speaker}</div>
      <div class="v2-options">${opts.map((o) => this._optBtn(o, item.italian)).join('')}</div>`;
  },

  _renderListenMatch(ex) {
    const item = ex.item;
    const opts = shuffleArray([item.italian, ...this._distractors(item, 'italian', 3)]);
    return `
      <div class="v2-q-prompt">Ascolta e scegli / Listen and choose:</div>
      <div class="v2-q-target">
        <button class="btn btn-secondary v2-audio-btn"
          data-action="lessonV2.replayAudio" data-text="${escapeAttr(item.english)}" data-lang="en-US">
          🔊 Ascolta / Listen
        </button>
      </div>
      <div class="v2-options">${opts.map((o) => this._optBtn(o, item.italian)).join('')}</div>`;
  },

  _renderTypedCloze(ex) {
    const item = ex.item;
    const { en } = this._exampleParts(item);
    const cloze = this._cloze(en, item.english);
    if (!cloze.ok) return this._renderTypedProduction(ex);
    return `
      <div class="v2-q-prompt">Scrivi la parola mancante / Type the missing word:</div>
      <div class="v2-q-sentence">${escapeHtml(cloze.display)}</div>
      ${this._typedInput(item.english)}`;
  },

  _renderTypedProduction(ex) {
    const item = ex.item;
    const { it } = this._exampleParts(item);
    const prompt = item.italian || it || item.english;
    return `
      <div class="v2-q-prompt">Scrivi in inglese / Write in English:</div>
      <div class="v2-q-target">${escapeHtml(prompt)}</div>
      ${this._typedInput(item.english)}`;
  },

  // ─── ANSWER HANDLING ──────────────────────────────

  answerMc(ds, el) {
    if (this._answerLocked) return;
    this._answerLocked = true;
    const correct = ds.opt === ds.correct;
    this._recordAnswer(this._currentEx(), correct, ds.opt);
    this._paintChoice(el, correct, ds.correct);
    this._showInlineFeedback(correct, ds.correct);
    setTimeout(
      () => this._advanceDrill(),
      correct ? FEEDBACK_DWELL.correct + 250 : FEEDBACK_DWELL.partial
    );
  },

  submitTyped(ds) {
    if (this._answerLocked) return;
    const input = document.getElementById('lessonv2-input');
    if (!input) return;
    const correctAns = (ds && ds.correct) || input.dataset.correct || '';
    const val = input.value || '';

    let correct =
      normalize(val) === normalize(correctAns) ||
      normalizeWithAccents(val) === normalizeWithAccents(correctAns);
    if (!correct && val.trim() && nearMiss(val, correctAns).partial) correct = true;

    this._answerLocked = true;
    this._recordAnswer(this._currentEx(), correct, val);
    this._showInlineFeedback(correct, correctAns);
    setTimeout(
      () => this._advanceDrill(),
      correct ? FEEDBACK_DWELL.correct + 250 : FEEDBACK_DWELL.incorrect
    );
  },

  showDrillHint() {
    const ex = this._currentEx();
    if (!ex) return;
    this._drillHintLevel = Math.min(3, (this._drillHintLevel || 0) + 1);
    this.hintsUsed += 1;
    const hints = this._drillHints(ex);
    const el = document.getElementById('v2-hint');
    if (el) el.textContent = hints[Math.min(this._drillHintLevel, hints.length) - 1] || '';
  },

  replayAudio(ds) {
    if (ds && ds.text) ttsService.speak(ds.text, ds.lang || 'en-US');
  },

  _advanceDrill() {
    this.exIndex += 1;
    if (this.exIndex >= this._beatExercises(this.currentDrillBeat).length) {
      this._advanceBeat();
    } else {
      this.renderDrill();
    }
  },

  _recordAnswer(ex, correct, userAnswer) {
    if (!ex) return;
    this.totalAnswered += 1;
    if (correct) this.totalCorrect += 1;
    this.answeredKeys.add(ex.itemKey);
    analyticsService.recordResponse({
      itemKey: ex.itemKey,
      timestamp: new Date().toISOString(),
      exerciseMode: `v2-${ex.format}`,
      correct,
      responseTimeMs: Math.max(0, Date.now() - this.questionStartTime),
      userAnswer: userAnswer || '',
      expectedAnswer: ex.item.english || '',
      streakAtTime: 0,
    });
  },

  // ─── FEEDBACK + HELPERS (shared with warmup) ──────

  _paintChoice(el, correct, correctVal) {
    if (!this.container) return;
    this.container.querySelectorAll('.v2-option').forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.opt === correctVal) btn.classList.add('v2-correct');
    });
    if (el && !correct) el.classList.add('v2-wrong');
  },

  _showInlineFeedback(correct, correctVal) {
    const fb = document.getElementById('v2-feedback');
    if (!fb) return;
    fb.className = `v2-feedback ${correct ? 'v2-fb-correct' : 'v2-fb-wrong'}`;
    fb.innerHTML = correct
      ? 'Esatto! / Correct!'
      : `Risposta / Answer: <strong>${escapeHtml(correctVal)}</strong>`;
  },

  _drillHints(ex) {
    const answer = ex.item.english || '';
    const { it } = this._exampleParts(ex.item);
    const half = Math.ceil(answer.length / 2);
    return [
      ex.item.context
        ? `Contesto / Context: ${this._formatCtx(ex.item.context)}`
        : it || 'Pensa al termine.',
      `Inizia con "${answer.slice(0, 2)}…" (${answer.length} lettere)`,
      answer.length > 2 ? `${answer.slice(0, half)}${'_'.repeat(answer.length - half)}` : answer,
    ];
  },

  _distractors(item, field, n) {
    const seen = new Set([item[field]]);
    const same = [];
    const other = [];
    for (const x of this.allItems) {
      if (x === item) continue;
      const v = x[field];
      if (!v || seen.has(v)) continue;
      (x.context === item.context ? same : other).push(x);
    }
    const out = [];
    for (const x of shuffleArray(same).concat(shuffleArray(other))) {
      if (out.length >= n) break;
      if (!seen.has(x[field])) {
        seen.add(x[field]);
        out.push(x[field]);
      }
    }
    return out;
  },

  _cloze(sentence, term) {
    if (!sentence || !term) return { ok: false, display: sentence, answer: term };
    const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let re;
    try {
      re = new RegExp(`\\b${safe}\\b`, 'i');
    } catch {
      return { ok: false, display: sentence, answer: term };
    }
    if (re.test(sentence))
      return { ok: true, display: sentence.replace(re, '_____'), answer: term };
    return { ok: false, display: sentence, answer: term };
  },
};
