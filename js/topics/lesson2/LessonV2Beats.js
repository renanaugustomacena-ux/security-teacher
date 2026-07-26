/**
 * LESSON V2 BEATS - FlowLearn
 * ===========================
 *
 * Mixin for LessonV2Engine: the non-drill beats — warmup retrieval, chunk
 * presentation, the applied terminal lab, and the summary. Kept separate from
 * the drill renderers to hold every module under the ~800-line cap.
 */

import { ttsService } from '../../services/TTSService.js';
import { masteryService } from '../../services/MasteryService.js';
import { analyticsService } from '../../services/AnalyticsService.js';
import { getTopicMeta } from '../registry.js';
import { escapeHtml, escapeAttr } from '../../utils/SanitizeHtml.js';
import { shuffleArray, FEEDBACK_DWELL } from '../../utils/PracticeUtils.js';
import { LabEngine } from '../lab/LabEngine.js';

export const lessonV2BeatsMixin = {
  _topicColor() {
    const meta = getTopicMeta(this.topicId);
    return meta ? meta.color : 'var(--accent-primary)';
  },

  _exampleParts(item) {
    const parts = (item.example || '').split(' = ');
    return { en: (parts[0] || '').trim(), it: (parts[1] || '').trim() };
  },

  // ─── PRESENT (beats 2 & 4) ────────────────────────

  renderPresent(chunkKey) {
    if (!this.container) return;
    const items = this.chunks[chunkKey] || [];
    const color = this._topicColor();

    for (const item of items) {
      const ctx = item.context || 'general';
      const key = `${this.topicId}:${this.levelNum}:${ctx}:${item.english}`;
      masteryService.markIntroduced(key);
    }

    const cardsHtml = items
      .map((item) => {
        const { en } = this._exampleParts(item);
        const speaker = ttsService.isSupported ? ttsService.speakerButtonHTML(item.english) : '';
        const enrich = [];
        if (item.command) {
          enrich.push(
            `<div class="v2-present-command"><span class="v2-tag">$</span><code>${escapeHtml(item.command)}</code></div>`
          );
        }
        if (item.tool) {
          enrich.push(`<div class="v2-present-tool">${escapeHtml(item.tool)}</div>`);
        }
        if (item.note) {
          enrich.push(`<div class="v2-present-note">${escapeHtml(item.note)}</div>`);
        }
        return `
          <div class="v2-present-card">
            <div class="v2-present-head">
              <span class="v2-present-en">${escapeHtml(item.english)}</span> ${speaker}
              <span class="v2-present-it">${escapeHtml(item.italian)}</span>
            </div>
            ${item.pronunciation ? `<div class="v2-present-pron">${escapeHtml(item.pronunciation)}</div>` : ''}
            ${en ? `<div class="v2-present-example">"${escapeHtml(en)}"</div>` : ''}
            ${enrich.join('')}
          </div>
        `;
      })
      .join('');

    this.container.innerHTML = `
      <div class="lesson-v2" style="--topic-color:${escapeAttr(color)}">
        <div class="v2-present">
          <div class="v2-beat-label">Nuovi termini / New terms</div>
          <div class="v2-present-cards">${cardsHtml}</div>
          <button class="btn btn-primary v2-continue" data-action="lessonV2.next">
            Pratica / Practice &rarr;
          </button>
        </div>
      </div>
    `;
    ttsService.attachTTSListeners(this.container);
    window._lessonV2Engine = this;
  },

  // ─── WARMUP (beat 1) ──────────────────────────────

  renderWarmup() {
    if (!this.container) return;
    const card = this.warmup.cards[this.warmup.index];
    if (!card) {
      this._advanceBeat();
      return;
    }

    const distractorPool = this.warmup.cards
      .concat(this.allItems)
      .map((c) => c.italian)
      .filter((it) => it && it !== card.italian);
    const distractors = [];
    const seen = new Set([card.italian]);
    for (const it of shuffleArray(distractorPool)) {
      if (distractors.length >= 3) break;
      if (!seen.has(it)) {
        seen.add(it);
        distractors.push(it);
      }
    }
    const options = shuffleArray([card.italian, ...distractors]);
    const total = this.warmup.cards.length;

    this.container.innerHTML = `
      <div class="lesson-v2" style="--topic-color:${escapeAttr(this._topicColor())}">
        <div class="v2-warmup">
          <div class="v2-beat-label">Ripasso rapido / Quick review · ${this.warmup.index + 1}/${total}</div>
          <div class="v2-q-prompt">Cosa significa / What does this mean:</div>
          <div class="v2-q-target">${escapeHtml(card.english)}</div>
          <div class="v2-options">
            ${options
              .map(
                (opt) => `
              <button class="btn btn-secondary v2-option"
                data-action="lessonV2.warmupAnswer"
                data-opt="${escapeAttr(opt)}" data-correct="${escapeAttr(card.italian)}">
                ${escapeHtml(opt)}
              </button>`
              )
              .join('')}
          </div>
          <div class="v2-feedback" id="v2-feedback"></div>
        </div>
      </div>
    `;
    window._lessonV2Engine = this;
  },

  warmupAnswer(ds, el) {
    const card = this.warmup.cards[this.warmup.index];
    if (!card || this._answerLocked) return;
    this._answerLocked = true;

    const correct = ds.opt === ds.correct;
    if (correct) this.warmup.correct += 1;

    const srs = typeof window !== 'undefined' ? window.srsManager : null;
    if (srs && typeof srs.reviewCard === 'function') {
      Promise.resolve(srs.reviewCard(card.wordKey, correct ? 3 : 1)).catch(() => {});
    }

    this._paintChoice(el, correct, ds.correct);
    this._showInlineFeedback(correct, ds.correct);

    setTimeout(
      () => {
        this._answerLocked = false;
        this.warmup.index += 1;
        if (this.warmup.index >= this.warmup.cards.length) {
          this._advanceBeat();
        } else {
          this.renderWarmup();
        }
      },
      correct ? FEEDBACK_DWELL.correct + 250 : FEEDBACK_DWELL.partial
    );
  },

  // ─── APPLIED (beat 7): the terminal lab ───────────

  async renderApplied() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="lesson-v2"><div class="v2-lab-loading">Preparazione del lab / Preparing the lab…</div></div>`;

    const script = await this._loadLabScript();
    if (!script) {
      this._advanceBeat();
      return;
    }

    this.lab = new LabEngine('topic-lesson-content', {
      onComplete: () => this._advanceBeat(),
    });
    this.lab.load(script);
    window._lessonV2Engine = this;
  },

  async _loadLabScript() {
    try {
      const mod = await import(`../data/labs/${this.topicId}-labs.js`);
      const script = mod?.default?.[this.lesson.id];
      if (script && Array.isArray(script.steps) && script.steps.length) return script;
    } catch {
      // No lab data file for this topic yet — fall through to the fallback.
    }
    return this._fallbackLabScript();
  },

  _fallbackLabScript() {
    const cmdItem = this.allItems.find((i) => i.command);
    if (!cmdItem) return null;
    return {
      title: this.lesson.title,
      intro: 'Applica quello che hai imparato. / Apply what you just learned.',
      cwd0: '~',
      requires: { done: true },
      steps: [
        {
          id: 'applied',
          promptEn: cmdItem.taskEn || `Run the command related to "${cmdItem.english}".`,
          hintTerm: cmdItem.english,
          accept: [cmdItem.command],
          stdout: cmdItem.note || 'OK',
          setState: { done: true },
        },
      ],
    };
  },

  // ─── SUMMARY (beat 8) ─────────────────────────────

  renderSummary() {
    if (!this.container) return;

    const titleEl = document.getElementById('topic-lesson-title');
    const progressEl = document.getElementById('topic-lesson-progress');
    if (titleEl) titleEl.textContent = 'Completata! / Completed!';
    if (progressEl) progressEl.textContent = '';

    const answered = this.totalAnswered;
    const accuracy = answered > 0 ? this.totalCorrect / answered : 1;
    let stars = 1;
    if (accuracy >= 0.85) stars = 3;
    else if (accuracy >= 0.6) stars = 2;

    const perfect = answered > 0 && this.totalCorrect === answered;
    const xp = this.totalCorrect * 10 + 20 + (perfect ? 15 : 0);

    const itemCount = this.allItems.length;
    const { topicId, levelNum } = this;
    const lessonId = this.lesson.id;

    this.progressManager.updateTopicLessonStars(topicId, levelNum, lessonId, stars);
    this.progressManager.completeTopicLesson(topicId, levelNum, lessonId);
    this.progressManager.incrementDailyLessons();
    this.progressManager.incrementDailyWords(itemCount);
    this.progressManager.addXP(xp);

    this._ingestSrs();
    this._updateMasteryBatch();

    const starsFull = '⭐';
    const starsEmpty = '☆';
    const starDisplay = starsFull.repeat(stars) + starsEmpty.repeat(3 - stars);

    this.container.innerHTML = `
      <div class="lesson-v2" style="--topic-color:${escapeAttr(this._topicColor())}">
        <div class="v2-summary">
          <div class="v2-summary-stars">${starDisplay}</div>
          <h3>Lezione completata! / Lesson complete!</h3>
          <p class="v2-summary-title">${escapeHtml(this.lesson.title)}</p>
          <div class="v2-summary-stats">
            <div class="v2-stat"><span class="v2-stat-value">${itemCount}</span><span class="v2-stat-label">Termini / Terms</span></div>
            <div class="v2-stat"><span class="v2-stat-value">+${xp}</span><span class="v2-stat-label">XP</span></div>
            <div class="v2-stat"><span class="v2-stat-value">${Math.round(accuracy * 100)}%</span><span class="v2-stat-label">Precisione / Accuracy</span></div>
          </div>
          <div class="v2-summary-actions">
            <button class="btn btn-secondary" data-action="topic.openLevel" data-topic-id="${escapeAttr(topicId)}" data-level="${levelNum}">
              Torna al Livello / Back to Level
            </button>
            <button class="btn btn-primary" data-action="topic.modeSelect" data-topic-id="${escapeAttr(topicId)}" data-level="${levelNum}">
              Pratica Ora / Practice Now
            </button>
          </div>
        </div>
      </div>
    `;
    window._lessonV2Engine = this;
  },

  _ingestSrs() {
    const srs = typeof window !== 'undefined' ? window.srsManager : null;
    if (!srs || typeof srs.addWords !== 'function') return;
    const words = this.allItems
      .filter((item) => item.english && item.italian)
      .map((item) => ({
        english: item.english,
        italian: item.italian,
        pronunciation: item.pronunciation || '',
        example: item.example || '',
      }));
    srs.addWords(words, `topic-${this.topicId}-${this.levelNum}-${this.lesson.id}`);
  },

  _updateMasteryBatch() {
    for (const key of this.answeredKeys) {
      const a = analyticsService.getItemAnalytics(key);
      if (a) masteryService.updateMastery(key, a);
    }
  },
};
