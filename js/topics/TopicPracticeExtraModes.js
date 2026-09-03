/**
 * TOPIC PRACTICE EXTRA MODES - Knowledge AIO
 * ==========================================
 *
 * Two schema-only practice modes. They run on the guaranteed item fields
 * ({ english, italian, context }) plus the optional `note`, so every topic
 * inherits them with zero new content authored.
 *
 * 16. verofalso   - Vero o Falso: judge a statement, then justify the verdict.
 *                   Two stages; the question scores only when BOTH the verdict
 *                   and the rationale are right, so a coin-flip cannot pass.
 * 17. definizione - Definizione: given the English term, pick the Italian
 *                   DESCRIPTION (`note`) instead of the one-word translation.
 *
 * Doctrine notes:
 *  - No inline handlers: every button is data-action + _bindDelegation (§11.7).
 *  - Every interpolated value goes through escapeHtml / escapeAttr (§3.4).
 *  - handleResult() is called exactly once per question; both modes carry a
 *    `resolved` latch so a double tap cannot double-score or double-award XP.
 */

import { escapeHtml, escapeAttr as escapeForAttr } from '../utils/SanitizeHtml.js';
import { shuffleArray, containsWholeWord } from '../utils/PracticeUtils.js';
import { ttsService } from '../services/TTSService.js';

/** A `note` shorter than this is a label, not a definition. */
export const MIN_DEFINITION_NOTE_LENGTH = 20;

/** Target question count per session, matching the other pool-driven modes. */
export const EXTRA_MODE_QUESTION_TARGET = 10;

/** Verdict + rationale counts. */
export const VEROFALSO_RATIONALE_COUNT = 3;
export const DEFINIZIONE_OPTION_COUNT = 4;
export const DEFINIZIONE_MIN_OPTIONS = 2;

/**
 * Capability floors for the mode selector. Both are counts of DISTINCT values,
 * not of items: four items that all share one Italian gloss (or one `note`)
 * cannot produce a single answerable question, so counting items would enable
 * a card that dead-ends on "Nessuna domanda disponibile".
 */
export const MIN_VEROFALSO_DISTINCT = 4;
export const MIN_DEFINIZIONE_DISTINCT = 4;

const QUOTE_OPEN = '«';
const QUOTE_CLOSE = '»';

const quoted = (value) => `${QUOTE_OPEN}${value == null ? '' : String(value)}${QUOTE_CLOSE}`;

const contextOf = (item) => (item && item.context) || 'general';

/**
 * True when english/italian are both present and genuinely different.
 * Mirrors the isDistinctTranslation guard in generateQuestions: an item whose
 * English equals its Italian makes a degenerate Vero/Falso statement.
 */
export function hasDistinctTranslation(item) {
  if (!item || typeof item.english !== 'string' || typeof item.italian !== 'string') return false;
  const english = item.english.trim();
  const italian = item.italian.trim();
  if (!english || !italian) return false;
  return english.toLowerCase() !== italian.toLowerCase();
}

/**
 * True when the item carries an Italian `note` long enough to be a definition.
 * A note that spells out the prompt term ("In italiano si usa il termine
 * inglese \"host\" senza tradurlo." for prompt "Host") identifies itself among
 * the options without the learner knowing anything, so it is not usable here.
 */
export function hasUsableDefinition(item) {
  if (!item || typeof item.english !== 'string' || typeof item.note !== 'string') return false;
  if (!item.english.trim()) return false;
  if (item.note.trim().length < MIN_DEFINITION_NOTE_LENGTH) return false;
  return !containsWholeWord(item.note, item.english);
}

const distinctCount = (list, read) =>
  new Set(list.map((item) => read(item).trim().toLowerCase())).size;

/**
 * Mode-selector gate for Vero/Falso. Four DISTINCT Italian glosses guarantee
 * that every question finds a decoy plus two rationale distractors, so an
 * enabled card can always build a full 3-rationale set.
 * @param {Array} pool
 */
export function canRunVeroFalso(pool) {
  const usable = (pool || []).filter(hasDistinctTranslation);
  if (usable.length < MIN_VEROFALSO_DISTINCT) return false;
  return distinctCount(usable, (item) => item.italian) >= MIN_VEROFALSO_DISTINCT;
}

/**
 * Mode-selector gate for Definizione. Four DISTINCT notes guarantee a full
 * 4-option question; four copies of one note would produce none.
 * @param {Array} pool
 */
export function canRunDefinizione(pool) {
  const usable = (pool || []).filter(hasUsableDefinition);
  if (usable.length < MIN_DEFINIZIONE_DISTINCT) return false;
  return distinctCount(usable, (item) => item.note) >= MIN_DEFINIZIONE_DISTINCT;
}

export const extraModesMixin = {
  // ─── VERO O FALSO ─────────────────────────────

  /**
   * Build up to 10 Vero/Falso questions with a balanced verdict mix.
   * @param {Array} pool
   * @returns {Array} question objects (may be shorter than the target)
   */
  generateVeroFalsoQuestions(pool) {
    const usable = (pool || []).filter(hasDistinctTranslation);
    if (usable.length < 2) return [];

    const selected = shuffleArray(usable).slice(0, EXTRA_MODE_QUESTION_TARGET);

    // A balanced true/false plan, shuffled: the learner never gets an all-true
    // set, and cannot ride a fixed alternating pattern either.
    const plan = shuffleArray(selected.map((_item, idx) => idx % 2 === 0));

    const questions = [];
    selected.forEach((item, idx) => {
      const decoy = plan[idx] ? null : this._pickVeroFalsoDecoy(item, usable);
      // A FALSE build needs one more distinct Italian than a TRUE one (the
      // decoy is excluded from the rationale claims). Degrade to TRUE rather
      // than dropping the item: dropping removes FALSE slots preferentially
      // and skews a thin pool towards an all-TRUE set the learner can sweep.
      const question =
        this._buildVeroFalsoQuestion(item, decoy, usable) ||
        (decoy ? this._buildVeroFalsoQuestion(item, null, usable) : null);
      if (question) questions.push(question);
    });
    return questions;
  },

  /**
   * Pick the wrong-translation decoy for a FALSE statement. Prefers the same
   * context (via the shared context index when it is built) and never returns
   * an item whose Italian equals the target's Italian — nor one whose Italian
   * equals the target's English, which would render the degenerate statement
   * `«term» significa «term».` and score the honest "Vero" as wrong.
   */
  _pickVeroFalsoDecoy(target, usable) {
    const targetItalian = (target.italian || '').trim().toLowerCase();
    const targetEnglish = (target.english || '').trim().toLowerCase();
    const differs = (it) => {
      if (!it || it === target || typeof it.italian !== 'string') return false;
      const candidate = it.italian.trim().toLowerCase();
      if (!candidate) return false;
      return candidate !== targetItalian && candidate !== targetEnglish;
    };

    const ctx = contextOf(target);
    const indexed = this.contextIndex instanceof Map ? this.contextIndex.get(ctx) || [] : [];
    const contextPool = indexed.length > 0 ? indexed : usable;
    const sameContext = contextPool.filter((it) => contextOf(it) === ctx && differs(it));
    const candidates = sameContext.length > 0 ? sameContext : usable.filter(differs);
    if (candidates.length === 0) return null;
    return shuffleArray(candidates)[0];
  },

  _buildVeroFalsoQuestion(item, decoy, usable) {
    const english = item.english.trim();
    const italian = item.italian.trim();
    const decoyItalian = decoy && typeof decoy.italian === 'string' ? decoy.italian.trim() : '';
    const statementIsTrue = decoyItalian === '';
    const shownItalian = statementIsTrue ? italian : decoyItalian;

    const rationales = this._buildVeroFalsoRationales(item, decoyItalian, usable);
    if (rationales.length < 2) return null;

    return {
      ...item,
      type: 'verofalso',
      item,
      statement: `${quoted(english)} significa ${quoted(shownItalian)}.`,
      shownItalian,
      statementIsTrue,
      decoyItalian,
      rationales,
      verdictAnswered: false,
      verdictGiven: null,
      verdictCorrect: false,
      resolved: false,
    };
  },

  /**
   * Three rationales sharing one shape, so only the asserted translation
   * distinguishes them. The correct one names the real pairing; distractors
   * borrow other pool items' Italian and are de-duplicated case-insensitively.
   */
  _buildVeroFalsoRationales(item, decoyItalian, usable) {
    const english = item.english.trim();
    const italian = item.italian.trim();
    const build = (claimed) =>
      decoyItalian
        ? `${quoted(english)} significa ${quoted(claimed)}, non ${quoted(decoyItalian)}.`
        : `${quoted(english)} significa ${quoted(claimed)}.`;

    // Excluded claims: the real translation (that is the correct rationale),
    // the decoy (it is what the statement already asserts), and the English
    // term itself — `«term» significa «term».` is a free elimination.
    const taken = new Set([italian.toLowerCase(), english.toLowerCase()]);
    if (decoyItalian) taken.add(decoyItalian.toLowerCase());

    const claims = [];
    const collect = (list) => {
      for (const other of shuffleArray(list)) {
        if (claims.length >= VEROFALSO_RATIONALE_COUNT - 1) break;
        const candidate = typeof other.italian === 'string' ? other.italian.trim() : '';
        if (!candidate) continue;
        const key = candidate.toLowerCase();
        if (taken.has(key)) continue;
        taken.add(key);
        claims.push(candidate);
      }
    };

    const ctx = contextOf(item);
    collect(usable.filter((it) => it !== item && contextOf(it) === ctx));
    if (claims.length < VEROFALSO_RATIONALE_COUNT - 1) {
      collect(usable.filter((it) => it !== item && contextOf(it) !== ctx));
    }

    return shuffleArray([
      { text: build(italian), correct: true },
      ...claims.map((claim) => ({ text: build(claim), correct: false })),
    ]);
  },

  renderVeroFalsoQuestion(container, q) {
    if (!container || !q) return;
    if (q.verdictAnswered) {
      this._renderVeroFalsoRationaleStage(container, q);
      return;
    }
    this._renderVeroFalsoVerdictStage(container, q);
  },

  _renderVeroFalsoVerdictStage(container, q) {
    const ttsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(q.english) : '';
    const pronunciationHtml = q.pronunciation
      ? `<div class="exercise-pronunciation">${escapeHtml(q.pronunciation)}</div>`
      : '';

    container.innerHTML = `
      <div class="exercise-card verofalso-card">
        <div class="exercise-instruction">Vero o Falso? / True or False?</div>
        <div class="verofalso-stage-label">Fase 1 di 2 / Step 1 of 2</div>
        <div class="verofalso-statement">${escapeHtml(q.statement)} ${ttsBtn}</div>
        ${pronunciationHtml}
        <div class="verofalso-verdict-grid">
          <button class="btn btn-secondary option-btn verofalso-verdict-btn"
            data-action="topicPractice.veroFalsoVerdict" data-verdict="true">
            Vero / True
          </button>
          <button class="btn btn-secondary option-btn verofalso-verdict-btn"
            data-action="topicPractice.veroFalsoVerdict" data-verdict="false">
            Falso / False
          </button>
        </div>
      </div>
    `;

    ttsService.attachTTSListeners(container);
  },

  _renderVeroFalsoRationaleStage(container, q) {
    // Deliberately neutral: the recap repeats the learner's verdict WITHOUT
    // saying whether it was right, so stage 2 still tests the reasoning.
    const chosenLabel = q.verdictGiven ? 'Vero / True' : 'Falso / False';
    const optionsHtml = q.rationales
      .map(
        (rationale, idx) => `
        <button class="btn btn-secondary option-btn verofalso-rationale-btn"
          data-action="topicPractice.veroFalsoRationale" data-idx="${escapeForAttr(String(idx))}">
          ${escapeHtml(rationale.text)}
        </button>
      `
      )
      .join('');

    container.innerHTML = `
      <div class="exercise-card verofalso-card">
        <div class="exercise-instruction">Perché? / Why?</div>
        <div class="verofalso-stage-label">Fase 2 di 2 / Step 2 of 2</div>
        <div class="verofalso-statement">${escapeHtml(q.statement)}</div>
        <div class="verofalso-recap">
          La tua risposta / Your answer: <strong>${escapeHtml(chosenLabel)}</strong>
        </div>
        <div class="options-grid verofalso-rationales">${optionsHtml}</div>
      </div>
    `;
  },

  /**
   * Stage 1. `verdict` is already coerced to a boolean by the delegation map.
   */
  answerVeroFalsoVerdict(verdict) {
    const q = this.questions[this.currentQuestionIndex];
    if (!q || q.type !== 'verofalso') return;
    if (q.verdictAnswered || q.resolved) return; // double-tap latch

    q.verdictAnswered = true;
    q.verdictGiven = verdict === true;
    q.verdictCorrect = q.verdictGiven === q.statementIsTrue;

    const container = document.getElementById('topic-practice-content');
    if (!container) return;
    this._renderVeroFalsoRationaleStage(container, q);
  },

  /**
   * Stage 2. Scores the question only when the verdict AND the rationale are
   * both right, then hands the combined result to handleResult exactly once.
   */
  answerVeroFalsoRationale(index) {
    const q = this.questions[this.currentQuestionIndex];
    if (!q || q.type !== 'verofalso') return;
    if (!q.verdictAnswered || q.resolved) return; // double-tap latch

    const idx = Number(index);
    if (!Number.isInteger(idx) || idx < 0 || idx >= q.rationales.length) return;
    const chosen = q.rationales[idx];
    if (!chosen) return;

    q.resolved = true;
    const correctRationale = q.rationales.find((rationale) => rationale.correct);
    const isCorrect = q.verdictCorrect && chosen.correct === true;
    this.handleResult(isCorrect, correctRationale ? correctRationale.text : q.statement);
  },

  // ─── DEFINIZIONE ──────────────────────────────

  /**
   * Build up to 10 definition questions. Options are precomputed so a re-render
   * (e.g. after a resize) cannot reshuffle the answer under the learner.
   */
  generateDefinizioneQuestions(pool) {
    const usable = (pool || []).filter(hasUsableDefinition);
    if (usable.length < 2) return [];

    const questions = [];
    for (const item of shuffleArray(usable).slice(0, EXTRA_MODE_QUESTION_TARGET)) {
      const options = this.buildDefinizioneOptions(item, usable);
      if (options.length < DEFINIZIONE_MIN_OPTIONS) continue;
      questions.push({
        ...item,
        type: 'definizione',
        item,
        note: item.note.trim(),
        options,
        resolved: false,
      });
    }
    return questions;
  },

  /**
   * The correct note plus up to 3 distinct others, preferring the same context.
   * Never pads: a short pool yields fewer options rather than `undefined`.
   */
  buildDefinizioneOptions(target, usable) {
    const correct = typeof target.note === 'string' ? target.note.trim() : '';
    if (!correct) return [];

    const taken = new Set([correct.toLowerCase()]);
    const distractors = [];
    const wanted = DEFINIZIONE_OPTION_COUNT - 1;
    const collect = (list) => {
      for (const other of shuffleArray(list)) {
        if (distractors.length >= wanted) break;
        const note = typeof other.note === 'string' ? other.note.trim() : '';
        if (note.length < MIN_DEFINITION_NOTE_LENGTH) continue;
        const key = note.toLowerCase();
        if (taken.has(key)) continue;
        taken.add(key);
        distractors.push(note);
      }
    };

    const ctx = contextOf(target);
    collect(usable.filter((it) => it !== target && contextOf(it) === ctx));
    if (distractors.length < wanted) {
      collect(usable.filter((it) => it !== target && contextOf(it) !== ctx));
    }

    return shuffleArray([correct, ...distractors]);
  },

  renderDefinizioneQuestion(container, q) {
    if (!container || !q) return;

    const options = (Array.isArray(q.options) ? q.options : []).filter(
      (opt) => typeof opt === 'string' && opt.length > 0
    );
    const correct = typeof q.note === 'string' ? q.note.trim() : '';
    const ttsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(q.english) : '';
    const pronunciationHtml = q.pronunciation
      ? `<div class="exercise-pronunciation">${escapeHtml(q.pronunciation)}</div>`
      : '';

    container.innerHTML = `
      <div class="exercise-card definizione-card">
        <div class="exercise-instruction">
          Quale descrizione corrisponde al termine? / Which description matches the term?
        </div>
        <div class="exercise-target definizione-term">${escapeHtml(q.english)} ${ttsBtn}</div>
        ${pronunciationHtml}
        <div class="options-grid definizione-options">
          ${options
            .map(
              (opt) => `
            <button class="btn btn-secondary option-btn definizione-option-btn"
              data-action="topicPractice.checkDefinizione" data-opt="${escapeForAttr(opt)}" data-correct="${escapeForAttr(correct)}">
              ${escapeHtml(opt)}
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    `;

    ttsService.attachTTSListeners(container);
  },

  /**
   * Single-stage grading through the shared checkAnswer path, guarded so a
   * double tap cannot reach handleResult twice.
   */
  checkDefinizioneAnswer(btnEl, selected, correct) {
    const q = this.questions[this.currentQuestionIndex];
    if (q && q.resolved) return; // double-tap latch
    if (q) q.resolved = true;
    this.checkAnswer(btnEl, selected, correct);
  },
};
