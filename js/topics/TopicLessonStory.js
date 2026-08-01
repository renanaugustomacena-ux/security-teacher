/**
 * TOPIC LESSON STORY - FlowLearn
 * ===============================
 *
 * "Storia / Story" — narrative cloze layout.
 *
 * Pedagogy: instead of meeting each term as an isolated flashcard, the item
 * `example` sentences are chained into one running passage, so vocabulary is
 * encountered in connected prose. The learner actively reconstructs the story
 * by placing each target term into its numbered blank (recall in context beats
 * recognition in isolation), then re-reads the completed passage side by side
 * with its Italian translation, anchoring meaning to real usage.
 *
 * NEW CSS CLASSES
 * ----------------
 * .story-passage          reading card that wraps the cloze sentences (serif-ish, roomy line-height)
 * .story-sentence         one sentence/paragraph of the passage (block, small bottom margin)
 * .story-stage-title      stage heading above the passage/translation (h3-sized, topic accent)
 * .story-instructions     short helper line explaining the tap interaction (muted, small)
 * .story-slot             inline numbered blank: dashed-border pill drop target
 * .story-slot-filled      slot holding a chosen word: solid pill, accent border, tappable
 * .story-slot-correct     graded correct slot: success-tinted pill
 * .story-slot-fixed       graded wrong slot corrected in place: warm amber pill (never red)
 * .story-slot-was         learner's original wrong pick inside a fixed slot (small, struck-through)
 * .story-slot-num         tiny superscript number label on each blank (1..N)
 * .story-bank             word bank container: wrapping flex row of pills with a top border
 * .story-bank-label       small caps label above the word bank
 * .story-bank-word        tappable word pill in the bank (button reset, chip look)
 * .story-bank-word-used   bank word already placed: dimmed, non-interactive look
 * .story-feedback         post-check coach feedback line (calm, encouraging tone)
 * .story-translation      Stage B container card
 * .story-translation-row  one sentence pair (English + Italian) with a subtle divider
 * .story-translation-en   English sentence line (target term in <strong>)
 * .story-translation-it   Italian line under the English (muted, slightly smaller)
 * .story-gloss            inline chip showing the Italian term when no full translation exists
 */

import { registerAction } from '../utils/EventDispatch.js';
import {
  escapeHtml,
  shuffle,
  markIntroduced,
  finalizeLesson,
  renderSummaryHtml,
  renderReviewListHtml,
  topicColor,
} from './TopicLessonShared.js';

const MIN_STORY_ITEMS = 3;
const MAX_STORY_ITEMS = 6;

export const LAYOUT_META = {
  id: 'story',
  name: 'Story',
  nameIt: 'Storia',
  icon: '\u{1F4D6}',
  description: 'Rebuild a running passage by placing each term into its numbered blank.',
  descriptionIt: 'Ricostruisci un brano continuo inserendo ogni termine nel suo spazio numerato.',
};

/** Escape regex metacharacters in a literal term. */
function escapeRegex(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Split an example on its first ' = ' separator. The Italian half may be ''. */
function splitExample(example) {
  const raw = typeof example === 'string' ? example : '';
  const sep = raw.indexOf(' = ');
  if (sep === -1) return { en: raw.trim(), it: '' };
  return { en: raw.slice(0, sep).trim(), it: raw.slice(sep + 3).trim() };
}

/** Case-insensitive matcher for `term`, word-bounded where the edges are word chars. */
function termPattern(term) {
  const lead = /^\w/.test(term) ? '\\b' : '';
  const trail = /\w$/.test(term) ? '\\b' : '';
  return new RegExp(`${lead}${escapeRegex(term)}${trail}`, 'i');
}

/**
 * Parse one item into a story entry, or null when the item cannot carry a
 * blank (no example, or the English half does not contain the term).
 */
function storyEntryFor(item) {
  if (!item || !item.english || !item.example) return null;
  const { en, it } = splitExample(item.example);
  if (!en) return null;
  const match = en.match(termPattern(item.english));
  if (!match) return null;
  return {
    item,
    it,
    before: en.slice(0, match.index),
    matched: match[0],
    after: en.slice(match.index + match[0].length),
  };
}

/**
 * Select up to MAX_STORY_ITEMS usable entries, keeping same-context sentences
 * adjacent (largest context group first) so the passage reads coherently.
 */
function buildStoryEntries(lesson) {
  const groups = new Map();
  for (const item of lesson?.items || []) {
    const entry = storyEntryFor(item);
    if (!entry) continue;
    const ctx = item.context || 'general';
    if (!groups.has(ctx)) groups.set(ctx, []);
    groups.get(ctx).push(entry);
  }
  const ordered = Array.from(groups.values()).sort((a, b) => b.length - a.length);
  const entries = [];
  for (const group of ordered) {
    for (const entry of group) {
      if (entries.length >= MAX_STORY_ITEMS) return entries;
      entries.push(entry);
    }
  }
  return entries;
}

/**
 * A story needs at least MIN_STORY_ITEMS items whose example's English half
 * actually contains the item's English term — otherwise the cloze cannot be
 * built and the registry should fall back to the default engine.
 */
export function canRender(lesson) {
  let usable = 0;
  for (const item of lesson?.items || []) {
    if (storyEntryFor(item)) usable += 1;
    if (usable >= MIN_STORY_ITEMS) return true;
  }
  return false;
}

export class TopicLessonStory {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.lesson = null;
    this.topicId = null;
    this.levelNum = null;
    this.entries = [];
    this.bank = [];
    this.slotFill = [];
    this.slotResults = [];
    this.checked = false;
    this.correctCount = 0;
    this.introduced = false;
    this.finalized = false;
    this.container = null;
    // Doctrine §11.7: body-level dispatch, latest instance wins (same pattern
    // as TopicLessonEngine). Namespace `lessonStory.*` is unique to this layout.
    registerAction('lessonStory.begin', () => this.renderStageA());
    registerAction('lessonStory.pickWord', (ds) => this.pickWord(Number(ds.b)));
    registerAction('lessonStory.clearSlot', (ds) => this.clearSlot(Number(ds.s)));
    registerAction('lessonStory.check', () => this.checkSlots());
    registerAction('lessonStory.translation', () => this.renderStageB());
    registerAction('lessonStory.finish', () => this.renderSummary());
  }

  /**
   * Entry point: called by the layout registry / TopicManager.openLesson().
   */
  start(lesson, topicId, levelNum) {
    this.lesson = lesson;
    this.topicId = topicId;
    this.levelNum = levelNum;
    this.entries = buildStoryEntries(lesson);
    this.bank = shuffle(this.entries.map((e) => e.item.english)).map((term) => ({
      term,
      used: false,
    }));
    this.slotFill = new Array(this.entries.length).fill(-1);
    this.slotResults = [];
    this.checked = false;
    this.correctCount = 0;
    this.introduced = false;
    this.finalized = false;

    if (typeof document === 'undefined') return;
    this.container = document.getElementById('topic-lesson-content');

    const titleEl = document.getElementById('topic-lesson-title');
    if (titleEl) titleEl.textContent = lesson?.title || '';
    const progressEl = document.getElementById('topic-lesson-progress');
    if (progressEl) progressEl.textContent = '';

    if (!this.container) return;
    if (this.entries.length < MIN_STORY_ITEMS) {
      this.renderUnavailable();
      return;
    }
    this.renderIntro();
  }

  // ─── INTRO ─────────────────────────────────────────

  renderIntro() {
    if (!this.container) return;
    const n = this.entries.length;
    this.container.innerHTML = `
      <div class="lesson-engine" style="--topic-color: ${topicColor(this.topicId)}">
        <div class="lesson-intro">
          <h2 class="lesson-intro-title">${escapeHtml(this.lesson?.title || '')}</h2>
          <p class="lesson-intro-subtitle">${escapeHtml(this.lesson?.description || '')}</p>
          <div class="lesson-intro-meta">
            <span>${n} frasi / sentences</span>
            <span>${n} termini / terms</span>
            <span>~${Math.max(2, Math.ceil(n / 2))} min</span>
          </div>
          <p class="lesson-intro-text">
            Le frasi di esempio formano un breve racconto: completa gli spazi con i termini
            giusti, poi rileggi tutto con la traduzione. /
            The example sentences form a short story: fill the blanks with the right terms,
            then re-read it all with the translation.
          </p>
          <button class="btn lesson-start-btn" data-action="lessonStory.begin">
            Inizia la storia / Start the story
          </button>
        </div>
      </div>
    `;
  }

  // ─── STAGE A: READ AND COMPLETE ────────────────────

  renderStageA() {
    if (!this.container || this.entries.length === 0) return;

    if (!this.introduced) {
      markIntroduced(
        this.entries.map((e) => e.item),
        this.topicId,
        this.levelNum
      );
      this.introduced = true;
    }

    const progressEl = document.getElementById('topic-lesson-progress');
    if (progressEl) progressEl.textContent = 'Fase 1 di 2 / Stage 1 of 2';

    const sentencesHtml = this.entries
      .map(
        (entry, i) => `
          <p class="story-sentence">
            ${escapeHtml(entry.before)}${this._slotHtml(i)}${escapeHtml(entry.after)}
          </p>
        `
      )
      .join('');

    const allFilled = this.slotFill.every((f) => f >= 0);
    let footerHtml = '';

    if (this.checked) {
      const total = this.entries.length;
      const coach =
        this.correctCount === total
          ? 'Perfetto! Hai ricostruito tutta la storia. / Perfect! You rebuilt the whole story.'
          : `Ci sei quasi: ${this.correctCount} su ${total}. Guarda i termini sistemati al posto ` +
            `giusto, poi rileggiamo insieme. / Almost there: ${this.correctCount} of ${total}. ` +
            `Look at the terms settled into place, then let's re-read together.`;
      footerHtml = `
        <div class="story-feedback">${escapeHtml(coach)}</div>
        <button class="btn lesson-start-btn" data-action="lessonStory.translation">
          Continua / Continue
        </button>
      `;
    } else {
      const bankHtml = this.bank
        .map((word, b) =>
          word.used
            ? `<span class="story-bank-word story-bank-word-used">${escapeHtml(word.term)}</span>`
            : `<button type="button" class="story-bank-word" ` +
              `data-action="lessonStory.pickWord" data-b="${b}">${escapeHtml(word.term)}</button>`
        )
        .join('');
      footerHtml = `
        <div class="story-bank">
          <div class="story-bank-label">Parole da inserire / Words to place</div>
          ${bankHtml}
        </div>
        <button class="btn lesson-start-btn" data-action="lessonStory.check" ${allFilled ? '' : 'disabled'}>
          Verifica / Check
        </button>
      `;
    }

    this.container.innerHTML = `
      <div class="lesson-engine" style="--topic-color: ${topicColor(this.topicId)}">
        <div class="story-passage">
          <h3 class="story-stage-title">Leggi e completa / Read and complete</h3>
          <p class="story-instructions">
            Tocca una parola per riempire il primo spazio vuoto; tocca uno spazio pieno per
            svuotarlo. / Tap a word to fill the first empty blank; tap a filled blank to clear it.
          </p>
          ${sentencesHtml}
          ${footerHtml}
        </div>
      </div>
    `;
  }

  _slotHtml(i) {
    const fillIdx = this.slotFill[i];
    const num = `<span class="story-slot-num">${i + 1}</span>`;

    if (this.checked) {
      const correctTerm = escapeHtml(this.entries[i].item.english);
      if (this.slotResults[i]) {
        return `<span class="story-slot story-slot-correct">${num}${correctTerm}</span>`;
      }
      const picked =
        fillIdx >= 0 ? `<s class="story-slot-was">${escapeHtml(this.bank[fillIdx].term)}</s> ` : '';
      return `<span class="story-slot story-slot-fixed">${num}${picked}${correctTerm}</span>`;
    }

    if (fillIdx >= 0) {
      return (
        `<button type="button" class="story-slot story-slot-filled" ` +
        `data-action="lessonStory.clearSlot" data-s="${i}">` +
        `${num}${escapeHtml(this.bank[fillIdx].term)}</button>`
      );
    }
    return `<span class="story-slot">${num}_____</span>`;
  }

  pickWord(bankIndex) {
    if (this.checked) return;
    const word = this.bank[bankIndex];
    if (!word || word.used) return;
    const slot = this.slotFill.indexOf(-1);
    if (slot === -1) return;
    this.slotFill[slot] = bankIndex;
    word.used = true;
    this.renderStageA();
  }

  clearSlot(slotIndex) {
    if (this.checked) return;
    const fillIdx = this.slotFill[slotIndex];
    if (fillIdx === undefined || fillIdx < 0) return;
    this.bank[fillIdx].used = false;
    this.slotFill[slotIndex] = -1;
    this.renderStageA();
  }

  checkSlots() {
    if (this.checked || this.entries.length === 0) return;
    if (this.slotFill.some((f) => f < 0)) return;
    this.checked = true;
    this.slotResults = this.entries.map((entry, i) => {
      const fillIdx = this.slotFill[i];
      return fillIdx >= 0 && this.bank[fillIdx].term === entry.item.english;
    });
    this.correctCount = this.slotResults.filter(Boolean).length;
    this.renderStageA();
  }

  // ─── STAGE B: TRANSLATION ──────────────────────────

  renderStageB() {
    // Stage B only exists after grading — a stray dispatch (the actions live on
    // the global body-level registry) must not reveal the answers early.
    if (!this.container || !this.checked || this.entries.length === 0) return;

    const progressEl = document.getElementById('topic-lesson-progress');
    if (progressEl) progressEl.textContent = 'Fase 2 di 2 / Stage 2 of 2';

    const rowsHtml = this.entries
      .map((entry) => {
        const enHtml =
          `${escapeHtml(entry.before)}<strong>${escapeHtml(entry.matched)}</strong>` +
          `${escapeHtml(entry.after)}`;
        let itHtml = '';
        if (entry.it) {
          itHtml = `<p class="story-translation-it">${escapeHtml(entry.it)}</p>`;
        } else if (entry.item.italian) {
          itHtml =
            `<p class="story-translation-it">` +
            `<span class="story-gloss">${escapeHtml(entry.item.italian)}</span></p>`;
        }
        return `
          <div class="story-translation-row">
            <p class="story-translation-en">${enHtml}</p>
            ${itHtml}
          </div>
        `;
      })
      .join('');

    this.container.innerHTML = `
      <div class="lesson-engine" style="--topic-color: ${topicColor(this.topicId)}">
        <div class="story-translation">
          <h3 class="story-stage-title">Traduzione / Translation</h3>
          <p class="story-instructions">
            Rileggi la storia completa con la traduzione italiana. /
            Re-read the full story with the Italian translation.
          </p>
          ${rowsHtml}
          <button class="btn lesson-start-btn" data-action="lessonStory.finish">
            Fine / Finish
          </button>
        </div>
      </div>
    `;
  }

  // ─── SUMMARY ───────────────────────────────────────

  renderSummary() {
    // Only reachable after grading: never finalize (stars/XP/completion) a
    // lesson the learner has not actually played through.
    if (!this.container || !this.checked || this.finalized) return;
    this.finalized = true;

    const totalQuestions = this.entries.length;
    const { stars, xp } = finalizeLesson({
      progressManager: this.progressManager,
      lesson: this.lesson,
      topicId: this.topicId,
      levelNum: this.levelNum,
      correctCount: this.correctCount,
      totalQuestions,
    });

    const titleEl = document.getElementById('topic-lesson-title');
    if (titleEl) titleEl.textContent = 'Completata! / Completed!';
    const progressEl = document.getElementById('topic-lesson-progress');
    if (progressEl) progressEl.textContent = '';

    const missedItems = this.entries
      .filter((entry, i) => !this.slotResults[i])
      .map((entry) => entry.item);

    this.container.innerHTML = renderSummaryHtml({
      lesson: this.lesson,
      topicId: this.topicId,
      levelNum: this.levelNum,
      stars,
      xp,
      correctCount: this.correctCount,
      totalQuestions,
      layoutLabel: 'Storia / Story',
      sections: renderReviewListHtml(missedItems),
    });
  }

  // ─── FALLBACK ──────────────────────────────────────

  /** Defensive screen when start() is reached although canRender() is false. */
  renderUnavailable() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="lesson-engine">
        <div class="lesson-intro">
          <h2 class="lesson-intro-title">${escapeHtml(this.lesson?.title || '')}</h2>
          <p class="lesson-intro-text">
            Questa lezione non ha abbastanza frasi di esempio per costruire una storia. /
            This lesson does not have enough example sentences to build a story.
          </p>
          <button class="btn btn-secondary" data-action="topic.openLevel"
                  data-topic-id="${escapeHtml(this.topicId)}"
                  data-level="${escapeHtml(String(this.levelNum))}">
            Torna al Livello / Back to Level
          </button>
        </div>
      </div>
    `;
  }
}

TopicLessonStory.canRender = canRender;
