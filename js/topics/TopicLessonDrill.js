/**
 * TOPIC LESSON DRILL - FlowLearn
 * ===============================
 *
 * "Ripasso / Drill" layout: one self-rated flip card per item, in lesson order.
 *
 * Pedagogy: retrieval practice beats re-reading. The learner must ATTEMPT the
 * translation from memory before the answer appears ("try before you reveal"),
 * which strengthens recall far more than recognising it among multiple-choice
 * options. The three-way self-rating (knew / almost / did not know) adds a
 * metacognitive step — judging your own certainty is itself a learning act —
 * and keeps the pass fast and friction-free: the ideal short phone session.
 * Ratings are honour-system by design; no policing, no penalty theatre.
 *
 * NEW CSS CLASSES
 * ---------------
 * .drill-card            Centered card panel; topic-coloured top accent border, rounded, padded.
 * .drill-card.revealed   Revealed state; the back block fades/slides in under the front.
 * .drill-card-front      Front block: term, pronunciation, think-first prompt, reveal button.
 * .drill-card-back       Back block: translation, example, note, rating row.
 * .drill-term            The English term: large (~1.6em), bold, centered.
 * .drill-pronunciation   Muted smaller line under the term (IPA and/or phonetic).
 * .drill-prompt          Italic, muted "think of the translation" instruction line.
 * .drill-reveal-btn      Full-width primary reveal button, generous tap target.
 * .drill-translation     The Italian translation: large (~1.3em), accent colour.
 * .drill-example         Example sentence block with a subtle left border (quote styling).
 * .drill-example-en      English half of the example, quoted, block-level.
 * .drill-example-it      Italian half, muted, on its own line under the English.
 * .drill-note            Small muted note paragraph.
 * .drill-rating-label    Small muted label above the rating buttons.
 * .drill-rating-row      Three equal-width rating buttons; wraps vertically on narrow phones.
 * .drill-rate-btn        Base rating button: subtle outline, comfortable tap target.
 * .drill-rate-known      Success-green tint.
 * .drill-rate-almost     Warm amber tint.
 * .drill-rate-unknown    Neutral violet/grey tint — NOT red (coach tone, not a buzzer).
 */

import { registerAction } from '../utils/EventDispatch.js';
import {
  escapeHtml,
  markIntroduced,
  finalizeLesson,
  renderSummaryHtml,
  renderReviewListHtml,
  topicColor,
} from './TopicLessonShared.js';

export const LAYOUT_META = {
  id: 'drill',
  name: 'Drill',
  nameIt: 'Ripasso',
  icon: '⚡',
  description: 'Fast flip cards: think, reveal, rate yourself',
  descriptionIt: 'Flip card veloci: pensa, rivela, valutati',
};

const RATING_VALUES = [0, 0.5, 1];

/**
 * The drill needs at least one card with both faces (English on the front,
 * Italian on the back). Anything less falls back to the default engine.
 */
export function canRender(lesson) {
  const items = lesson?.items;
  if (!Array.isArray(items)) return false;
  return items.some((item) => item && item.english && item.italian);
}

export class TopicLessonDrill {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.lesson = null;
    this.topicId = null;
    this.levelNum = null;
    this.cards = [];
    this.cardIndex = 0;
    this.revealed = false;
    this.score = 0;
    this.notKnownItems = [];
    this.finished = false;
    this.container = null;

    // Doctrine §11.7: data-action delegation, registered once in the
    // constructor. Latest instance wins, matching TopicLessonEngine.
    registerAction('lessonDrill.reveal', (ds) => this.reveal(Number(ds.i)));
    registerAction('lessonDrill.rate', (ds) => this.rate(Number(ds.i), Number(ds.rating)));
  }

  static canRender(lesson) {
    return canRender(lesson);
  }

  /**
   * Entry point: called by the layout registry / TopicManager.openLesson().
   */
  start(lesson, topicId, levelNum) {
    this.lesson = lesson;
    this.topicId = topicId;
    this.levelNum = levelNum;
    this.cards = (lesson?.items || []).filter((item) => item && item.english && item.italian);
    this.cardIndex = 0;
    this.revealed = false;
    this.score = 0;
    this.notKnownItems = [];
    this.finished = false;
    this.container = document.getElementById('topic-lesson-content');

    const titleEl = document.getElementById('topic-lesson-title');
    if (titleEl) titleEl.textContent = lesson?.title || '';

    if (this.cards.length === 0) {
      this.renderSummary();
      return;
    }
    this.renderCard(0);
  }

  // ─── CARD RENDERING ────────────────────────────────

  renderCard(index) {
    const item = this.cards[index];
    if (!item) return;

    const total = this.cards.length;
    const progressEl = document.getElementById('topic-lesson-progress');
    if (progressEl) {
      progressEl.textContent = `Carta ${index + 1} di ${total} / Card ${index + 1} of ${total}`;
    }

    if (!this.container) return;
    this.container.innerHTML = `
      <div class="lesson-engine">
        <div class="drill-card${this.revealed ? ' revealed' : ''}" style="--topic-color: ${escapeHtml(topicColor(this.topicId))}">
          ${this._frontHtml(item, index)}
          ${this.revealed ? this._backHtml(item, index) : ''}
        </div>
      </div>
    `;
  }

  _frontHtml(item, index) {
    const pronParts = [];
    if (item.pronunciation) pronParts.push(escapeHtml(item.pronunciation));
    if (item.phonetic) pronParts.push(escapeHtml(item.phonetic));
    const pronHtml =
      pronParts.length > 0 ? `<div class="drill-pronunciation">${pronParts.join(' · ')}</div>` : '';

    const promptHtml = this.revealed
      ? ''
      : `<p class="drill-prompt">Pensa alla traduzione, poi rivela. / Think of the translation, then reveal.</p>
         <button class="btn lesson-start-btn drill-reveal-btn" data-action="lessonDrill.reveal" data-i="${index}">
           Rivela / Reveal
         </button>`;

    return `
      <div class="drill-card-front">
        <div class="drill-term">${escapeHtml(item.english)}</div>
        ${pronHtml}
        ${promptHtml}
      </div>
    `;
  }

  _backHtml(item, index) {
    const [exampleEn, exampleIt] = (item.example || '').split(' = ');
    let exampleHtml = '';
    if (exampleEn) {
      exampleHtml = `
        <div class="drill-example">
          <span class="drill-example-en">"${escapeHtml(exampleEn)}"</span>
          ${exampleIt ? `<span class="drill-example-it">${escapeHtml(exampleIt)}</span>` : ''}
        </div>
      `;
    }
    const noteHtml = item.note ? `<p class="drill-note">${escapeHtml(item.note)}</p>` : '';

    return `
      <div class="drill-card-back">
        <div class="drill-translation">${escapeHtml(item.italian)}</div>
        ${exampleHtml}
        ${noteHtml}
        <p class="drill-rating-label">Quanto lo conoscevi? / How well did you know it?</p>
        <div class="drill-rating-row">
          <button class="btn drill-rate-btn drill-rate-known" data-action="lessonDrill.rate" data-i="${index}" data-rating="1">
            Lo sapevo / I knew it
          </button>
          <button class="btn drill-rate-btn drill-rate-almost" data-action="lessonDrill.rate" data-i="${index}" data-rating="0.5">
            Quasi / Almost
          </button>
          <button class="btn drill-rate-btn drill-rate-unknown" data-action="lessonDrill.rate" data-i="${index}" data-rating="0">
            Non lo sapevo / I did not know
          </button>
        </div>
      </div>
    `;
  }

  // ─── INTERACTION ───────────────────────────────────

  reveal(index) {
    if (this.finished || this.revealed) return;
    if (index !== this.cardIndex) return;
    // A card counts as INTRODUCED the moment its back is first shown — the
    // translation is the taught content. Marking at start() instead would
    // record cards the learner never reached (abandoned drill) as introduced,
    // polluting the mastery bookkeeping. The guards above make this run at
    // most once per card.
    markIntroduced([this.cards[index]], this.topicId, this.levelNum);
    this.revealed = true;
    this.renderCard(index);
  }

  rate(index, rating) {
    if (this.finished || !this.revealed) return;
    if (index !== this.cardIndex) return;
    if (!RATING_VALUES.includes(rating)) return;

    this.score += rating;
    if (rating === 0) this.notKnownItems.push(this.cards[index]);

    this.cardIndex += 1;
    this.revealed = false;
    if (this.cardIndex >= this.cards.length) {
      this.renderSummary();
    } else {
      this.renderCard(this.cardIndex);
    }
  }

  // ─── SUMMARY ───────────────────────────────────────

  renderSummary() {
    // No lesson DOM means the learner never saw the lesson: never award
    // stars/XP/completion for it. Reachable in production because the layout
    // registry awaits a dynamic import, so the learner can navigate away
    // between tapping the lesson and start() running. Matches the guard in
    // Discovery, Compare and Story.
    if (this.finished || !this.container) return;
    this.finished = true;

    const totalQuestions = this.cards.length;
    const correctCount = Math.round(this.score);
    const { stars, xp } = finalizeLesson({
      progressManager: this.progressManager,
      lesson: this.lesson,
      topicId: this.topicId,
      levelNum: this.levelNum,
      correctCount,
      totalQuestions,
    });

    const titleEl = document.getElementById('topic-lesson-title');
    if (titleEl) titleEl.textContent = 'Completata! / Completed!';
    const progressEl = document.getElementById('topic-lesson-progress');
    if (progressEl) progressEl.textContent = '';

    this.container.innerHTML = renderSummaryHtml({
      lesson: this.lesson,
      topicId: this.topicId,
      levelNum: this.levelNum,
      stars,
      xp,
      correctCount,
      totalQuestions,
      layoutLabel: 'Ripasso / Drill',
      sections: renderReviewListHtml(this.notKnownItems),
    });
  }
}
