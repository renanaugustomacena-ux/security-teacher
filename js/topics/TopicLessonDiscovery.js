/**
 * TOPIC LESSON DISCOVERY - FlowLearn
 * ===================================
 *
 * "Scoperta / Discovery" — a PRETESTING layout, the pedagogical inverse of the
 * default engine. The learner GUESSES each term's meaning BEFORE being taught
 * it: attempting an answer first primes memory (the pretesting effect), the
 * immediate reveal card is the actual teaching moment, and a per-group
 * consolidation screen settles the terms afterwards. A wrong guess can never be
 * a failure — the learner had not studied the term yet — so feedback is always
 * framed as "ora lo sai / now you know it".
 *
 * NEW CSS CLASSES
 * ---------------
 * .discovery-guess              Stage A wrapper (on .quick-check); centered column, roomy spacing.
 * .discovery-guess-label        Small uppercase pill above the term ("Indovina / Guess 1 di 3").
 * .discovery-guess-term         The English term: large display type (~2rem, bold), centered.
 * .discovery-guess-hint         Muted italic one-liner framing the guess as low-stakes.
 * .discovery-reveal             Reveal wrapper: feedback banner + full teaching card, fades in.
 * .discovery-reveal-banner      Rounded feedback strip above the card; bold lead-in sentence.
 * .discovery-reveal-banner.correct  Success tint (soft green background, green left border).
 * .discovery-reveal-banner.taught   Coach tint for wrong guesses (accent/violet — never red).
 * .discovery-reveal-picked      Small muted "Hai scelto / You picked: ..." line in the banner.
 * .discovery-example-it         Italian half of an example: muted, own line under the English.
 * .discovery-consolidate        Stage B wrapper (on .context-group) around the stacked cards.
 * .discovery-consolidate-intro  Short muted explainer line above the consolidation cards.
 * .discovery-summary-note       One-line pretesting note in the summary (small, muted, centered).
 */

import { ttsService } from '../services/TTSService.js';
import { registerAction } from '../utils/EventDispatch.js';
import {
  escapeHtml,
  shuffle,
  buildContextGroups,
  formatContextName,
  markIntroduced,
  buildOptions,
  topicColor,
  finalizeLesson,
  renderSummaryHtml,
  renderReviewListHtml,
} from './TopicLessonShared.js';

const GUESSES_PER_GROUP = 3;

export const LAYOUT_META = {
  id: 'discovery',
  name: 'Discovery',
  nameIt: 'Scoperta',
  icon: '🔍',
  description: 'Guess each term before it is taught — pretesting primes memory.',
  descriptionIt: 'Indovina ogni termine prima di studiarlo: il pretesting prepara la memoria.',
};

/**
 * A Discovery lesson needs a real guess: at least two guessable items with at
 * least two distinct Italian meanings, so every question has a plausible
 * alternative. Anything less falls back to the default engine.
 */
export function canRender(lesson) {
  const items = Array.isArray(lesson?.items) ? lesson.items : [];
  const guessable = items.filter((it) => it && it.english && it.italian);
  if (guessable.length < 2) return false;
  return new Set(guessable.map((it) => it.italian)).size >= 2;
}

export class TopicLessonDiscovery {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.lesson = null;
    this.topicId = null;
    this.levelNum = null;
    this.container = null;
    this.contextGroups = [];
    this.groupIndex = 0;
    this.guessIndex = 0;
    this.correctCount = 0;
    this.totalQuestions = 0;
    this.wrongItems = [];
    this._guessPlan = [];
    this._finalized = false;
    this._result = null;
    // Linear-flow guard: each action handler only fires in the stage whose
    // screen actually shows its button, so a double-tap or stray dispatch can
    // never skip a guess, a group, or the reveal (score integrity depends on
    // every planned guess being asked).
    this._stage = 'intro';
    // Doctrine §11.7: interactivity only via data-action + body-level dispatch.
    registerAction('lessonDiscovery.begin', () => this.beginGroups());
    registerAction('lessonDiscovery.guess', (ds) => this.handleGuess(Number(ds.i)));
    registerAction('lessonDiscovery.next', () => this.advanceAfterReveal());
    registerAction('lessonDiscovery.nextGroup', () => this.advanceGroup());
  }

  static canRender(lesson) {
    return canRender(lesson);
  }

  /**
   * Entry point: called by TopicManager.openLesson() via the layout registry.
   */
  start(lesson, topicId, levelNum) {
    this.lesson = lesson;
    this.topicId = topicId;
    this.levelNum = levelNum;
    this.container = document.getElementById('topic-lesson-content');
    this.contextGroups = buildContextGroups(lesson?.items || []);
    this.groupIndex = 0;
    this.guessIndex = 0;
    this.correctCount = 0;
    this.wrongItems = [];
    this._finalized = false;
    this._result = null;

    // Plan every guess up front: up to GUESSES_PER_GROUP per context group,
    // options frozen now so re-renders never reshuffle under the learner.
    this._guessPlan = this.contextGroups.map((group) =>
      shuffle(group.items.filter((it) => it && it.english && it.italian))
        .slice(0, GUESSES_PER_GROUP)
        .map((item) => ({
          item,
          options: buildOptions(item, lesson?.items || [], 'italian'),
          answered: false,
          selected: null,
          correct: false,
        }))
    );
    this.totalQuestions = this._guessPlan.reduce((sum, guesses) => sum + guesses.length, 0);

    const titleEl = document.getElementById('topic-lesson-title');
    if (titleEl) titleEl.textContent = lesson?.title || '';
    this._setProgress('');

    this.renderIntro();
  }

  // ─── INTRO ─────────────────────────────────────────

  renderIntro() {
    this._stage = 'intro';
    if (!this.container) return;
    const itemCount = this.lesson?.items?.length || 0;

    this.container.innerHTML = `
      <div class="lesson-engine">
        <div class="lesson-intro" style="--topic-color: ${topicColor(this.topicId)}">
          <h2 class="lesson-intro-title">${escapeHtml(this.lesson?.title || '')}</h2>
          <p class="lesson-intro-subtitle">${escapeHtml(this.lesson?.description || '')}</p>

          <div class="lesson-intro-meta">
            <span>${itemCount} termini / terms</span>
            <span>${this.contextGroups.length} gruppi / groups</span>
            <span>${this.totalQuestions} intuizioni / guesses</span>
          </div>

          <p class="lesson-intro-text">
            Qui si indovina PRIMA di studiare: tentare una risposta prepara la memoria, anche
            quando sbagli. / Here you guess BEFORE studying: attempting an answer primes your
            memory, even when you miss.
          </p>

          <button class="btn lesson-start-btn" data-action="lessonDiscovery.begin">
            Inizia a Indovinare / Start Guessing
          </button>
        </div>
      </div>
    `;
  }

  beginGroups() {
    if (this._stage !== 'intro') return;
    this._startGroup(0);
  }

  // ─── STAGE A: GUESS ────────────────────────────────

  _startGroup(groupIndex) {
    this.groupIndex = groupIndex;
    this.guessIndex = 0;
    const group = this.contextGroups[groupIndex];
    if (!group) {
      this.renderSummary();
      return;
    }
    // The learner is exposed to the whole group from here on.
    markIntroduced(group.items, this.topicId, this.levelNum, group.context);
    if ((this._guessPlan[groupIndex] || []).length === 0) {
      this.renderConsolidation();
      return;
    }
    this.renderGuess();
  }

  renderGuess() {
    this._stage = 'guess';
    if (!this.container) return;
    const group = this.contextGroups[this.groupIndex];
    const guesses = this._guessPlan[this.groupIndex] || [];
    const guess = guesses[this.guessIndex];
    if (!group || !guess) return;

    const step = `${this.guessIndex + 1}/${guesses.length}`;
    const groupPos = `${this.groupIndex + 1}/${this.contextGroups.length}`;
    this._setProgress(`Indovina / Guess ${step} · Gruppo / Group ${groupPos}`);

    const ttsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(guess.item.english) : '';
    const optionsHtml = guess.options
      .map(
        (opt, i) => `
          <button class="quick-check-option" data-action="lessonDiscovery.guess" data-i="${i}">
            ${escapeHtml(opt)}
          </button>
        `
      )
      .join('');

    this.container.innerHTML = `
      <div class="lesson-engine">
        <div class="quick-check discovery-guess" style="--topic-color: ${topicColor(this.topicId)}">
          <div class="quick-check-header">
            <span class="quick-check-label">${escapeHtml(formatContextName(group.context))}</span>
            <span class="quick-check-type">Scoperta / Discovery</span>
          </div>
          <div class="discovery-guess-label">
            Indovina ${this.guessIndex + 1} di ${guesses.length} /
            Guess ${this.guessIndex + 1} of ${guesses.length}
          </div>
          <div class="discovery-guess-term">${escapeHtml(guess.item.english)} ${ttsBtn}</div>
          <p class="discovery-guess-hint">
            Prova a indovinare — non hai ancora studiato questo termine. /
            Take a guess — you have not studied this term yet.
          </p>
          <div class="quick-check-question">
            Cosa significa in italiano? / What does it mean in Italian?
          </div>
          <div class="quick-check-options">${optionsHtml}</div>
        </div>
      </div>
    `;

    ttsService.attachTTSListeners(this.container);
  }

  handleGuess(optionIndex) {
    if (this._stage !== 'guess') return;
    const guesses = this._guessPlan[this.groupIndex] || [];
    const guess = guesses[this.guessIndex];
    if (!guess || guess.answered) return;
    const selected = guess.options[optionIndex];
    if (selected === undefined) return;

    guess.answered = true;
    guess.selected = selected;
    guess.correct = selected === guess.item.italian;
    if (guess.correct) {
      this.correctCount++;
    } else {
      this.wrongItems.push(guess.item);
    }
    this.renderReveal(guess);
  }

  // ─── REVEAL: THE TEACHING MOMENT ───────────────────

  renderReveal(guess) {
    this._stage = 'reveal';
    if (!this.container) return;

    const bannerHtml = guess.correct
      ? `
        <div class="discovery-reveal-banner correct">
          Esatto! Ottima intuizione. / Exactly! Great instinct.
        </div>
      `
      : `
        <div class="discovery-reveal-banner taught">
          Nessun problema — ora lo sai. / No problem — now you know it.
          <span class="discovery-reveal-picked">
            Hai scelto / You picked: ${escapeHtml(guess.selected)}
          </span>
        </div>
      `;

    this.container.innerHTML = `
      <div class="lesson-engine">
        <div class="discovery-reveal" style="--topic-color: ${topicColor(this.topicId)}">
          ${bannerHtml}
          ${this._teachingCardHtml(guess.item)}
          <div class="context-group-actions">
            <button class="btn lesson-start-btn" data-action="lessonDiscovery.next">
              Continua / Continue
            </button>
          </div>
        </div>
      </div>
    `;

    ttsService.attachTTSListeners(this.container);
  }

  advanceAfterReveal() {
    if (this._stage !== 'reveal') return;
    const guesses = this._guessPlan[this.groupIndex] || [];
    this.guessIndex++;
    if (this.guessIndex < guesses.length) {
      this.renderGuess();
    } else {
      this.renderConsolidation();
    }
  }

  // ─── STAGE B: CONSOLIDATE ──────────────────────────

  renderConsolidation() {
    this._stage = 'consolidate';
    if (!this.container) return;
    const group = this.contextGroups[this.groupIndex];
    if (!group) {
      this.renderSummary();
      return;
    }

    const groupPos = `${this.groupIndex + 1}/${this.contextGroups.length}`;
    this._setProgress(`Consolida / Consolidate · Gruppo / Group ${groupPos}`);

    const isLast = this.groupIndex + 1 >= this.contextGroups.length;
    const cardsHtml = group.items.map((item) => this._teachingCardHtml(item)).join('');

    this.container.innerHTML = `
      <div class="lesson-engine">
        <div class="context-group discovery-consolidate" style="--topic-color: ${topicColor(this.topicId)}">
          <div class="context-group-header">
            <span class="context-group-name">${escapeHtml(formatContextName(group.context))}</span>
            <span class="context-progress">Consolida / Consolidate</span>
          </div>
          <p class="discovery-consolidate-intro">
            Rivedi insieme i termini che hai appena scoperto. /
            Review together the terms you just discovered.
          </p>
          <div class="context-group-items">${cardsHtml}</div>
          <div class="context-group-actions">
            <button class="btn lesson-start-btn" data-action="lessonDiscovery.nextGroup">
              ${isLast ? 'Vai al Riepilogo / Go to Summary' : 'Prossimo Gruppo / Next Group'}
            </button>
          </div>
        </div>
      </div>
    `;

    ttsService.attachTTSListeners(this.container);
  }

  advanceGroup() {
    if (this._stage !== 'consolidate') return;
    const next = this.groupIndex + 1;
    if (next < this.contextGroups.length) {
      this._startGroup(next);
    } else {
      this.renderSummary();
    }
  }

  // ─── SUMMARY ───────────────────────────────────────

  renderSummary() {
    this._stage = 'summary';
    if (!this.container) return;

    if (!this._finalized) {
      this._finalized = true;
      this._result = finalizeLesson({
        progressManager: this.progressManager,
        lesson: this.lesson,
        topicId: this.topicId,
        levelNum: this.levelNum,
        correctCount: this.correctCount,
        totalQuestions: this.totalQuestions,
      });
    }
    const { stars, xp } = this._result;

    const titleEl = document.getElementById('topic-lesson-title');
    if (titleEl) titleEl.textContent = 'Completata! / Completed!';
    this._setProgress('');

    const sections = `
      <p class="discovery-summary-note">
        Hai incontrato ogni termine prima come intuizione: indovinare prima di studiare aiuta la
        memoria a fissarlo. / You met every term first as a guess: guessing before studying helps
        memory anchor it.
      </p>
      ${renderReviewListHtml(this.wrongItems)}
    `;

    this.container.innerHTML = renderSummaryHtml({
      lesson: this.lesson,
      topicId: this.topicId,
      levelNum: this.levelNum,
      stars,
      xp,
      correctCount: this.correctCount,
      totalQuestions: this.totalQuestions,
      layoutLabel: 'Scoperta / Discovery',
      sections,
    });
  }

  // ─── INTERNAL HELPERS ──────────────────────────────

  _setProgress(text) {
    const progressEl = document.getElementById('topic-lesson-progress');
    if (progressEl) progressEl.textContent = text;
  }

  /**
   * Full teaching card for one item. Every field beyond english/italian is
   * optional; examples may or may not carry an Italian half after ' = '.
   */
  _teachingCardHtml(item) {
    const ttsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(item.english) : '';

    let pronunciationHtml = '';
    if (item.pronunciation || item.phonetic) {
      const phonetic = item.phonetic ? ` (${escapeHtml(item.phonetic)})` : '';
      pronunciationHtml = `
        <div class="context-item-pronunciation">
          ${escapeHtml(item.pronunciation || '')}${phonetic}
        </div>
      `;
    }

    let exampleHtml = '';
    const example = item.example || '';
    if (example) {
      const sep = example.indexOf(' = ');
      const exampleEn = sep === -1 ? example : example.slice(0, sep);
      const exampleIt = sep === -1 ? '' : example.slice(sep + 3);
      const exampleItHtml = exampleIt
        ? `<span class="discovery-example-it">${escapeHtml(exampleIt.trim())}</span>`
        : '';
      exampleHtml = `
        <div class="context-item-example">
          "${escapeHtml(exampleEn.trim())}"
          ${exampleItHtml}
        </div>
      `;
    }

    let enrichmentHtml = '';
    if (item.command) {
      enrichmentHtml += `
        <div class="tech-enrichment tech-command">
          <span class="tech-label">Comando / Command:</span>
          <code>${escapeHtml(item.command)}</code>
        </div>
      `;
    }
    if (item.code) {
      enrichmentHtml += `
        <div class="tech-enrichment tech-code">
          <span class="tech-label">Codice / Code:</span>
          <pre><code>${escapeHtml(item.code)}</code></pre>
        </div>
      `;
    }
    if (item.tool) {
      enrichmentHtml += `
        <div class="tech-enrichment tech-tool">
          <span class="tech-label">Tool:</span>
          <span class="tech-tool-badge">${escapeHtml(item.tool)}</span>
        </div>
      `;
    }
    if (item.note) {
      enrichmentHtml += `
        <div class="tech-enrichment tech-note">
          <span class="tech-label">Nota / Note:</span>
          <span>${escapeHtml(item.note)}</span>
        </div>
      `;
    }

    return `
      <div class="context-item-card">
        <div class="context-item-main">
          <div class="context-item-english">${escapeHtml(item.english)} ${ttsBtn}</div>
          <div class="context-item-italian">${escapeHtml(item.italian)}</div>
        </div>
        ${pronunciationHtml}
        ${exampleHtml}
        ${enrichmentHtml}
      </div>
    `;
  }
}
