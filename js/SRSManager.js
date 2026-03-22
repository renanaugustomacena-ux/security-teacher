/**
 * SRS (Spaced Repetition System) Manager - Knowledge AIO
 * =======================================================
 *
 * Implements the SM-2 algorithm for spaced repetition.
 * Cards are ingested from lessons, topics, and songs,
 * then reviewed using a flashcard interface.
 */

import { storageService } from './services/StorageService.js';

export class SRSManager {
  constructor(progressManager, storageServiceRef) {
    this.progressManager = progressManager;
    this.storage = storageServiceRef || storageService;
    this.cards = new Map(); // wordKey -> card object
  }

  async init() {
    try {
      const allCards = await this.storage.loadAll('srs');
      if (allCards && allCards.length) {
        for (const card of allCards) {
          this.cards.set(card.wordKey, card);
        }
      }
      this.updateDueBadge();
    } catch (err) {
      console.error('SRSManager init failed:', err);
    }
  }

  // ─── CARD MANAGEMENT ─────────────────────────

  /**
   * Add words to the SRS deck.
   * @param {Array} words - Array of word objects with english, italian, pronunciation, example
   * @param {string} source - Source identifier (e.g. 'lesson-0-greetings', 'song-happy')
   */
  addWords(words, source) {
    if (!words || !words.length) return;

    const now = new Date().toISOString();

    for (const word of words) {
      if (!word.english) continue;

      const wordKey = word.english.toLowerCase().trim();
      if (this.cards.has(wordKey)) continue; // skip duplicates

      const card = {
        wordKey,
        english: word.english,
        italian: word.italian || '',
        pronunciation: word.pronunciation || '',
        example: word.example || '',
        source: source || 'unknown',
        interval: 1,
        easeFactor: 2.5,
        repetitions: 0,
        nextReview: now,
        lastReview: null,
        created: now,
      };

      this.cards.set(wordKey, card);
      this.storage.save('srs', card).catch((err) => {
        console.error('Failed to save SRS card:', err);
      });
    }

    this.updateDueBadge();
  }

  // ─── RETRIEVAL ────────────────────────────────

  /**
   * Returns all cards where nextReview <= today, sorted most overdue first.
   */
  getDueCards() {
    const now = new Date();
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    const due = [];

    for (const card of this.cards.values()) {
      if (new Date(card.nextReview) <= todayEnd) {
        due.push(card);
      }
    }

    // Sort by most overdue first (oldest nextReview first)
    due.sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview));

    return due;
  }

  /**
   * Returns count of due cards.
   */
  getDueCount() {
    return this.getDueCards().length;
  }

  // ─── SM-2 ALGORITHM ──────────────────────────

  /**
   * Review a card with the SM-2 algorithm.
   * @param {string} wordKey
   * @param {number} quality - 0-5 rating
   */
  async reviewCard(wordKey, quality) {
    const card = this.cards.get(wordKey);
    if (!card) return;

    const now = new Date();

    // Update ease factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    const q = quality;
    card.easeFactor += 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02);
    if (card.easeFactor < 1.3) card.easeFactor = 1.3;

    if (q < 3) {
      // Fail: reset
      card.interval = 1;
      card.repetitions = 0;
    } else if (q === 3) {
      // Hard: interval stays, repetitions += 1
      card.repetitions += 1;
    } else if (q === 4) {
      // Good
      if (card.repetitions === 0) {
        card.interval = 1;
      } else if (card.repetitions === 1) {
        card.interval = 6;
      } else {
        card.interval = Math.ceil(card.interval * card.easeFactor);
      }
      card.repetitions += 1;
    } else if (q === 5) {
      // Easy
      if (card.repetitions === 0) {
        card.interval = 1;
      } else if (card.repetitions === 1) {
        card.interval = 6;
      } else {
        card.interval = Math.ceil(card.interval * card.easeFactor * 1.3);
      }
      card.repetitions += 1;
    }

    card.lastReview = now.toISOString();
    const nextDate = new Date(now);
    nextDate.setDate(nextDate.getDate() + card.interval);
    card.nextReview = nextDate.toISOString();

    this.cards.set(wordKey, card);

    try {
      await this.storage.save('srs', card);
    } catch (err) {
      console.error('Failed to save reviewed card:', err);
    }

    this.updateDueBadge();
  }

  // ─── REVIEW UI ────────────────────────────────

  /**
   * Render the flashcard review session in the practice container.
   */
  renderReviewSession() {
    const container = document.getElementById('practice-content');
    const practiceContainer = document.getElementById('practice-container');
    const practiceGrid = document.querySelector('#practice .practice-grid');

    if (!container || !practiceContainer) return;

    // Hide the practice grid, show the practice container
    if (practiceGrid) practiceGrid.classList.add('hidden');
    practiceContainer.classList.remove('hidden');

    // Update header
    const progressEl = document.getElementById('practice-progress');
    const timerEl = document.getElementById('practice-timer');
    const streakEl = document.getElementById('practice-streak');
    const xpEl = document.getElementById('practice-xp');

    if (timerEl) timerEl.textContent = '';
    if (streakEl) streakEl.textContent = '';
    if (xpEl) xpEl.textContent = '';

    const dueCards = this.getDueCards();

    if (dueCards.length === 0) {
      if (progressEl) progressEl.textContent = '';
      const progressFill = document.getElementById('practice-progress-fill');
      if (progressFill) progressFill.style.width = '100%';

      container.innerHTML = `
        <div class="srs-summary">
          <div class="completion-icon">&#10003;</div>
          <h3>Nessuna carta da ripassare! / No cards due for review!</h3>
          <p>Torna piu' tardi o completa nuove lezioni per aggiungere parole.</p>
          <p>Come back later or complete new lessons to add words.</p>
          <button class="btn btn-secondary" data-action="srs-close">
            &#8592; Indietro / Back
          </button>
        </div>
      `;

      container.querySelector('[data-action="srs-close"]')?.addEventListener('click', () => {
        this.closeReview();
      });
      return;
    }

    // Session state
    this._session = {
      cards: dueCards,
      currentIndex: 0,
      totalCards: dueCards.length,
      results: [], // { wordKey, quality }
      showingAnswer: false,
    };

    this._renderCurrentCard();
  }

  _renderCurrentCard() {
    const container = document.getElementById('practice-content');
    if (!container || !this._session) return;

    const { cards, currentIndex, totalCards } = this._session;
    const card = cards[currentIndex];

    // Update progress
    const progressEl = document.getElementById('practice-progress');
    if (progressEl) progressEl.textContent = `${currentIndex + 1}/${totalCards}`;

    const progressFill = document.getElementById('practice-progress-fill');
    if (progressFill) {
      progressFill.style.width = `${((currentIndex + 1) / totalCards) * 100}%`;
    }

    this._session.showingAnswer = false;

    container.innerHTML = `
      <div class="srs-flashcard">
        <div class="srs-front">
          <div class="srs-card-label">English</div>
          <div class="srs-card-word">${this._escapeHtml(card.english)}</div>
          <div class="srs-card-source">${this._escapeHtml(card.source)}</div>
        </div>
        <div class="srs-show-btn-wrapper">
          <button class="btn srs-show-btn" data-action="srs-show">
            Mostra Risposta / Show Answer
          </button>
        </div>
      </div>
      <div class="srs-progress">
        <div class="srs-progress-fill" style="width: ${(currentIndex / totalCards) * 100}%"></div>
      </div>
    `;

    container.querySelector('[data-action="srs-show"]')?.addEventListener('click', () => {
      this._showAnswer();
    });
  }

  _showAnswer() {
    const container = document.getElementById('practice-content');
    if (!container || !this._session) return;

    const { cards, currentIndex, totalCards } = this._session;
    const card = cards[currentIndex];
    this._session.showingAnswer = true;

    container.innerHTML = `
      <div class="srs-flashcard srs-flashcard-revealed">
        <div class="srs-front">
          <div class="srs-card-label">English</div>
          <div class="srs-card-word">${this._escapeHtml(card.english)}</div>
        </div>
        <div class="srs-divider"></div>
        <div class="srs-back">
          <div class="srs-card-label">Italiano</div>
          <div class="srs-card-translation">${this._escapeHtml(card.italian)}</div>
          ${card.pronunciation ? `<div class="srs-card-pronunciation">${this._escapeHtml(card.pronunciation)}</div>` : ''}
          ${card.example ? `<div class="srs-card-example">"${this._escapeHtml(card.example)}"</div>` : ''}
        </div>
        <div class="srs-rating-btns">
          <button class="btn srs-btn-again" data-quality="0">
            Ancora / Again
          </button>
          <button class="btn srs-btn-hard" data-quality="3">
            Difficile / Hard
          </button>
          <button class="btn srs-btn-good" data-quality="4">
            Bene / Good
          </button>
          <button class="btn srs-btn-easy" data-quality="5">
            Facile / Easy
          </button>
        </div>
      </div>
      <div class="srs-progress">
        <div class="srs-progress-fill" style="width: ${(currentIndex / totalCards) * 100}%"></div>
      </div>
    `;

    container.querySelectorAll('[data-quality]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const quality = parseInt(e.target.dataset.quality, 10);
        this._rateCard(quality);
      });
    });
  }

  async _rateCard(quality) {
    if (!this._session) return;

    const { cards, currentIndex } = this._session;
    const card = cards[currentIndex];

    // Record result
    this._session.results.push({ wordKey: card.wordKey, quality });

    // Apply SM-2 algorithm
    await this.reviewCard(card.wordKey, quality);

    // Move to next card or show summary
    this._session.currentIndex++;

    if (this._session.currentIndex >= this._session.totalCards) {
      this._renderSummary();
    } else {
      this._renderCurrentCard();
    }
  }

  _renderSummary() {
    const container = document.getElementById('practice-content');
    if (!container || !this._session) return;

    const { results, totalCards } = this._session;
    const correct = results.filter((r) => r.quality >= 3).length;
    const accuracy = totalCards > 0 ? Math.round((correct / totalCards) * 100) : 0;

    const progressEl = document.getElementById('practice-progress');
    if (progressEl) progressEl.textContent = `${totalCards}/${totalCards}`;

    const progressFill = document.getElementById('practice-progress-fill');
    if (progressFill) progressFill.style.width = '100%';

    // Count by quality
    const again = results.filter((r) => r.quality < 3).length;
    const hard = results.filter((r) => r.quality === 3).length;
    const good = results.filter((r) => r.quality === 4).length;
    const easy = results.filter((r) => r.quality === 5).length;

    container.innerHTML = `
      <div class="srs-summary">
        <div class="completion-icon">&#127881;</div>
        <h3>Revisione Completata! / Review Complete!</h3>
        <div class="srs-summary-stats">
          <div class="srs-stat-row">
            <span>Carte ripassate / Cards reviewed:</span>
            <strong>${totalCards}</strong>
          </div>
          <div class="srs-stat-row">
            <span>Accuratezza / Accuracy:</span>
            <strong>${accuracy}%</strong>
          </div>
          <div class="srs-stat-row srs-stat-detail">
            <span class="srs-color-again">Ancora / Again: ${again}</span>
            <span class="srs-color-hard">Difficile / Hard: ${hard}</span>
            <span class="srs-color-good">Bene / Good: ${good}</span>
            <span class="srs-color-easy">Facile / Easy: ${easy}</span>
          </div>
        </div>
        <div class="completion-actions">
          <button class="btn btn-secondary" data-action="srs-close">
            &#8592; Indietro / Back
          </button>
        </div>
      </div>
    `;

    container.querySelector('[data-action="srs-close"]')?.addEventListener('click', () => {
      this.closeReview();
    });

    this._session = null;
  }

  closeReview() {
    const practiceContainer = document.getElementById('practice-container');
    const practiceGrid = document.querySelector('#practice .practice-grid');

    if (practiceContainer) practiceContainer.classList.add('hidden');
    if (practiceGrid) practiceGrid.classList.remove('hidden');

    this.updateDueBadge();
  }

  // ─── BADGE ────────────────────────────────────

  updateDueBadge() {
    const badge = document.getElementById('srs-due-badge');
    if (!badge) return;

    const count = this.getDueCount();
    if (count > 0) {
      badge.textContent = count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  // ─── UTILITY ──────────────────────────────────

  _escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
