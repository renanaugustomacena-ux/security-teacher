/**
 * TOPIC LESSON COMPARE - Knowledge AIO
 * ====================================
 *
 * Contrast-based lesson layout ("Confronto / Compare").
 *
 * Pedagogy: confusable neighbours (router/switch, phishing/pretexting) are
 * remembered far better when studied AGAINST each other than in isolation.
 * This layout teaches items two at a time: a side-by-side compare card makes
 * the differences visible, then two forced-binary "Distingui / Distinguish"
 * questions make the learner commit to the distinction. Two options is
 * intentional — discrimination, not free recall, is the skill being trained.
 *
 * NEW CSS CLASSES
 * ---------------
 * .compare-stage           panel wrapping one pair stage; card surface, accent from --topic-color
 * .compare-stage-header    flex row, space-between: stage badge left, context label right
 * .compare-stage-label     small uppercase bold badge tinted with --topic-color
 * .compare-stage-progress  small muted text (formatted context name)
 * .compare-stage-hint      muted italic instruction line under the header
 * .compare-pair-grid       grid `1fr auto 1fr` (card / VS badge / card), ~1rem gap; MUST collapse
 *                          to a single column (VS hidden) below ~640px via a media query
 * .compare-pair-solo       modifier for a lone card: single centered column, max-width ~28rem
 * .compare-vs              small circular "VS" badge between the two cards; hidden when collapsed
 * .compare-card            modifier on .context-item-card: full-height card, thin top accent
 *                          border in --topic-color
 * .compare-example         modifier on .context-item-example wrapping the EN/IT example lines
 * .compare-example-en      English example sentence, quoted, block display
 * .compare-example-it      Italian half of the example, muted and smaller, below the English
 * .compare-question        modifier on .quick-check for the Distinguish stage (accent border)
 * .compare-binary-options  exactly-two options: equal-width buttons side by side, stacking
 *                          vertically on narrow screens
 * .compare-clue            left-bordered, slightly inset italic box for the note / masked
 *                          example / context clue
 */

import { registerAction } from '../utils/EventDispatch.js';
import {
  escapeHtml,
  shuffle,
  buildContextGroups,
  formatContextName,
  markIntroduced,
  topicColor,
  finalizeLesson,
  renderSummaryHtml,
  renderReviewListHtml,
} from './TopicLessonShared.js';

export const LAYOUT_META = {
  id: 'compare',
  name: 'Compare',
  nameIt: 'Confronto',
  icon: '⚖️',
  description: 'Learn confusable terms side by side, then tell them apart',
  descriptionIt: 'Impara i termini confondibili fianco a fianco, poi distinguili',
};

const BLANK = '_____';

const CORRECT_FEEDBACK = [
  'Esatto! / Exactly!',
  'Ben distinto! / Well distinguished!',
  'Ottimo occhio! / Sharp eye!',
];

function normalizeTerm(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
}

/**
 * Replace every occurrence of `term` in `text` with a blank, case-insensitively.
 * Regex metacharacters in the term are escaped, and an empty or whitespace-only
 * term leaves the text untouched (never builds a degenerate pattern).
 *
 * Matching is word-start bounded (when the term begins with a word character)
 * so 'port' never mangles 'Report' into 'Re_____'; trailing word characters
 * are absorbed into the blank so inflections are masked whole — 'log' turns
 * 'logarithm' into '_____', never the garbled, stem-leaking '_____arithm'.
 */
export function maskTerm(text, term) {
  const source = String(text || '');
  const trimmed = String(term || '').trim();
  if (!trimmed) return source;
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const lead = /^\w/.test(trimmed) ? '\\b' : '';
  return source.replace(new RegExp(`${lead}${escaped}\\w*`, 'gi'), BLANK);
}

/**
 * Pair items within each context group ([0,1], [2,3], ...). A group's odd
 * leftover pairs with the first item of the next group; the final leftover
 * (odd total) becomes a solo card (`b: null`).
 */
export function buildPairs(items) {
  const flat = [];
  for (const group of buildContextGroups(items || [])) {
    for (const item of group.items) flat.push({ item, context: group.context });
  }
  const pairs = [];
  for (let i = 0; i < flat.length; i += 2) {
    const a = flat[i];
    const b = flat[i + 1] || null;
    pairs.push({ a: a.item, b: b ? b.item : null, context: a.context });
  }
  return pairs;
}

/** A pair supports discriminating questions only when both terms truly differ. */
function isAskablePair(pair) {
  if (!pair || !pair.a || !pair.b) return false;
  const { a, b } = pair;
  if (!a.english || !b.english || !a.italian || !b.italian) return false;
  if (normalizeTerm(a.english) === normalizeTerm(b.english)) return false;
  if (normalizeTerm(a.italian) === normalizeTerm(b.italian)) return false;
  return true;
}

/** The registry falls back to the default engine when this returns false. */
export function canRender(lesson) {
  const items = lesson?.items;
  if (!Array.isArray(items) || items.length < 2) return false;
  return buildPairs(items).some(isAskablePair);
}

/**
 * Distinguishing clue for an item: its note, else the English half of its
 * example, else its context label. The item's own term is masked out of every
 * text source — repo notes routinely name the term verbatim ('In italiano si
 * usa anche "Machine Learning"...'), which would make the Distinguish question
 * answer itself. A clue that masks down to blanks and punctuation alone
 * carries no information, so it falls through to the next source.
 * (Exported for tests.)
 */
export function buildClue(item) {
  const informative = (text) => {
    const masked = maskTerm(String(text || '').trim(), item.english).trim();
    return /\w/.test(masked.replace(/_/g, '')) ? masked : '';
  };
  const fromNote = informative(item.note);
  if (fromNote) return fromNote;
  const fromExample = informative(String(item.example || '').split(' = ')[0]);
  if (fromExample) return fromExample;
  return `Contesto / Context: ${formatContextName(item.context)}`;
}

export class TopicLessonCompare {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.lesson = null;
    this.topicId = null;
    this.levelNum = null;
    this.pairs = [];
    this.currentPairIndex = 0;
    this.correctCount = 0;
    this.totalQuestions = 0;
    this.missedItems = [];
    this.container = null;
    this._questions = [];
    this._finalized = false;
    this._summary = null;
    // Doctrine §11.7: data-action delegation instead of inline handlers.
    registerAction('lessonCompare.showPair', (ds) => this.showPair(Number(ds.pair)));
    registerAction('lessonCompare.startQuestions', (ds) => this.startQuestions(Number(ds.pair)));
    registerAction('lessonCompare.answer', (ds) => this.handleAnswer(Number(ds.q), Number(ds.i)));
  }

  static canRender(lesson) {
    return canRender(lesson);
  }

  /**
   * Entry point: called by the layout registry via TopicManager.openLesson().
   */
  start(lesson, topicId, levelNum) {
    this.lesson = lesson;
    this.topicId = topicId;
    this.levelNum = levelNum;
    this.pairs = buildPairs(lesson?.items);
    this.currentPairIndex = 0;
    this.correctCount = 0;
    this.missedItems = [];
    this._questions = [];
    this._finalized = false;
    this._summary = null;
    this.totalQuestions = this.pairs.reduce((sum, p) => sum + (isAskablePair(p) ? 2 : 0), 0);
    this.container = this._byId('topic-lesson-content');

    const titleEl = this._byId('topic-lesson-title');
    if (titleEl) titleEl.textContent = lesson?.title || '';
    const progressEl = this._byId('topic-lesson-progress');
    if (progressEl) progressEl.textContent = '';

    if (this.pairs.length === 0) {
      this.renderSummary();
      return;
    }
    this.showPair(0);
  }

  // ─── STAGE A: CONFRONTA / COMPARE ─────────────────

  showPair(pairIndex) {
    if (!Number.isFinite(pairIndex) || pairIndex < 0) return;
    if (pairIndex >= this.pairs.length) {
      this.renderSummary();
      return;
    }
    this.currentPairIndex = pairIndex;
    this._questions = [];
    if (!this.container) return;

    const pair = this.pairs[pairIndex];
    markIntroduced(pair.b ? [pair.a, pair.b] : [pair.a], this.topicId, this.levelNum, pair.context);

    const progressEl = this._byId('topic-lesson-progress');
    if (progressEl) {
      progressEl.textContent =
        `Coppia ${pairIndex + 1} di ${this.pairs.length} / ` +
        `Pair ${pairIndex + 1} of ${this.pairs.length}`;
    }

    const askable = isAskablePair(pair);
    let hint;
    if (!pair.b) {
      hint = 'Termine senza coppia: osservalo con calma. / Unpaired term: take your time with it.';
    } else if (askable) {
      hint =
        'Due termini vicini, fianco a fianco: cosa li distingue? / ' +
        'Two close terms, side by side: what sets them apart?';
    } else {
      hint =
        'Questi termini sono quasi identici: osservali con attenzione. / ' +
        'These terms are nearly identical: study them closely.';
    }

    const gridClass = pair.b ? 'compare-pair-grid' : 'compare-pair-grid compare-pair-solo';
    const cardsHtml = pair.b
      ? `${this._cardHtml(pair.a)}<div class="compare-vs">VS</div>${this._cardHtml(pair.b)}`
      : this._cardHtml(pair.a);

    const buttonHtml = askable
      ? `<button class="btn lesson-start-btn" data-action="lessonCompare.startQuestions" data-pair="${pairIndex}">
          Distingui / Distinguish
        </button>`
      : `<button class="btn lesson-start-btn" data-action="lessonCompare.showPair" data-pair="${pairIndex + 1}">
          Continua / Continue
        </button>`;

    this.container.innerHTML = `
      <div class="lesson-engine">
        <div class="compare-stage" style="--topic-color: ${escapeHtml(topicColor(this.topicId))}">
          <div class="compare-stage-header">
            <span class="compare-stage-label">Confronta / Compare</span>
            <span class="compare-stage-progress">${escapeHtml(formatContextName(pair.context))}</span>
          </div>
          <p class="compare-stage-hint">${hint}</p>
          <div class="${gridClass}">${cardsHtml}</div>
          <div class="context-group-actions">${buttonHtml}</div>
        </div>
      </div>
    `;
  }

  _cardHtml(item) {
    const [exampleEn, exampleIt] = String(item.example || '').split(' = ');
    let exampleHtml = '';
    if (exampleEn && exampleEn.trim()) {
      const itHalf =
        exampleIt && exampleIt.trim()
          ? `<span class="compare-example-it">${escapeHtml(exampleIt.trim())}</span>`
          : '';
      exampleHtml = `
        <div class="context-item-example compare-example">
          <span class="compare-example-en">"${escapeHtml(exampleEn.trim())}"</span>
          ${itHalf}
        </div>
      `;
    }
    const pronunciationHtml = item.pronunciation
      ? `<div class="context-item-pronunciation">
          ${escapeHtml(item.pronunciation)}${item.phonetic ? ` (${escapeHtml(item.phonetic)})` : ''}
        </div>`
      : '';
    return `
      <div class="context-item-card compare-card">
        <div class="context-item-main">
          <div class="context-item-english">${escapeHtml(item.english)}</div>
          <div class="context-item-italian">${escapeHtml(item.italian)}</div>
        </div>
        ${pronunciationHtml}
        ${exampleHtml}
      </div>
    `;
  }

  // ─── STAGE B: DISTINGUI / DISTINGUISH ─────────────

  startQuestions(pairIndex) {
    if (!Number.isFinite(pairIndex) || pairIndex < 0 || pairIndex >= this.pairs.length) return;
    this.currentPairIndex = pairIndex;
    this._questions = this._buildQuestions(this.pairs[pairIndex]);
    if (this._questions.length === 0) {
      this.showPair(pairIndex + 1);
      return;
    }
    this.renderQuestion(0);
  }

  _buildQuestions(pair) {
    if (!isAskablePair(pair)) return [];
    const [first, second] = shuffle([pair.a, pair.b]);
    const options = [pair.a.english, pair.b.english];
    return [
      {
        kind: 'meaning',
        prompt: first.italian,
        clue: '',
        correct: first.english,
        item: first,
        options: shuffle(options),
        answered: false,
      },
      {
        kind: 'clue',
        prompt: '',
        clue: buildClue(second),
        correct: second.english,
        item: second,
        options: shuffle(options),
        answered: false,
      },
    ];
  }

  renderQuestion(qIndex) {
    if (!this.container) return;
    const question = this._questions[qIndex];
    if (!question) return;

    const progressEl = this._byId('topic-lesson-progress');
    if (progressEl) {
      progressEl.textContent =
        `Distingui - Coppia ${this.currentPairIndex + 1} di ${this.pairs.length} / ` +
        `Distinguish - Pair ${this.currentPairIndex + 1} of ${this.pairs.length}`;
    }

    const promptHtml =
      question.kind === 'meaning'
        ? `Quale termine inglese significa / Which English term means:
           <strong>${escapeHtml(question.prompt)}</strong>?`
        : `A quale termine si riferisce questo indizio? / Which term does this clue refer to?
           <div class="compare-clue">${escapeHtml(question.clue)}</div>`;

    const optionsHtml = question.options
      .map(
        (opt, i) => `
        <button class="quick-check-option" data-index="${i}"
                data-action="lessonCompare.answer" data-q="${qIndex}" data-i="${i}">
          ${escapeHtml(opt)}
        </button>`
      )
      .join('');

    this.container.innerHTML = `
      <div class="lesson-engine">
        <div class="quick-check compare-question" style="--topic-color: ${escapeHtml(topicColor(this.topicId))}">
          <div class="quick-check-header">
            <span class="quick-check-label">
              Domanda ${qIndex + 1} di ${this._questions.length} /
              Question ${qIndex + 1} of ${this._questions.length}
            </span>
            <span class="quick-check-type">Distingui / Distinguish</span>
          </div>
          <div class="quick-check-question">${promptHtml}</div>
          <div class="quick-check-options compare-binary-options">${optionsHtml}</div>
          <div class="quick-check-feedback" id="compare-feedback"></div>
        </div>
      </div>
    `;
  }

  handleAnswer(qIndex, optionIndex) {
    const question = this._questions[qIndex];
    if (!question || question.answered) return;
    question.answered = true;

    const selected = question.options[optionIndex];
    const isCorrect = selected === question.correct;
    if (isCorrect) {
      this.correctCount += 1;
    } else {
      this.missedItems.push(question.item);
    }

    if (this.container?.querySelectorAll) {
      this.container.querySelectorAll('.quick-check-option').forEach((btn) => {
        btn.disabled = true;
        const idx = Number(btn.dataset?.index);
        if (question.options[idx] === question.correct) btn.classList?.add('correct');
        if (idx === optionIndex && !isCorrect) btn.classList?.add('wrong');
      });
    }

    const feedbackEl = this.container?.querySelector
      ? this.container.querySelector('#compare-feedback')
      : null;
    if (feedbackEl) {
      if (isCorrect) {
        const msg = CORRECT_FEEDBACK[Math.floor(Math.random() * CORRECT_FEEDBACK.length)];
        feedbackEl.innerHTML = `<span class="qc-feedback-correct">${msg}</span>`;
      } else {
        const term = escapeHtml(question.correct);
        feedbackEl.innerHTML =
          `<span class="qc-feedback-wrong">Vediamola insieme: la risposta era ` +
          `<strong>${term}</strong>. / Let's look at it together: the answer was ` +
          `<strong>${term}</strong>.</span>`;
      }
      feedbackEl.classList?.add('visible');
    }

    setTimeout(() => this._advanceAfterAnswer(qIndex), 1500);
  }

  _advanceAfterAnswer(qIndex) {
    const nextIndex = qIndex + 1;
    if (nextIndex < this._questions.length) {
      this.renderQuestion(nextIndex);
    } else {
      this.showPair(this.currentPairIndex + 1);
    }
  }

  // ─── SUMMARY ──────────────────────────────────────

  renderSummary() {
    // No lesson DOM means the learner never saw the lesson: never award
    // stars/XP/completion for it (matches Discovery's and Story's guard).
    if (!this.container) return;

    const titleEl = this._byId('topic-lesson-title');
    if (titleEl) titleEl.textContent = 'Completata! / Completed!';
    const progressEl = this._byId('topic-lesson-progress');
    if (progressEl) progressEl.textContent = '';

    if (!this._finalized) {
      this._finalized = true;
      this._summary = finalizeLesson({
        progressManager: this.progressManager,
        lesson: this.lesson,
        topicId: this.topicId,
        levelNum: this.levelNum,
        correctCount: this.correctCount,
        totalQuestions: this.totalQuestions,
      });
    }

    if (!this._summary) return;

    this.container.innerHTML = renderSummaryHtml({
      lesson: this.lesson,
      topicId: this.topicId,
      levelNum: this.levelNum,
      stars: this._summary.stars,
      xp: this._summary.xp,
      correctCount: this.correctCount,
      totalQuestions: this.totalQuestions,
      layoutLabel: 'Layout: Confronto / Compare',
      sections: renderReviewListHtml(this.missedItems),
    });
  }

  // ─── INTERNAL HELPERS ─────────────────────────────

  _byId(id) {
    if (typeof document === 'undefined' || !document.getElementById) return null;
    return document.getElementById(id);
  }
}
