import { storageService } from './services/StorageService.js';

const DECAY = -0.5;
const FACTOR = 19 / 81;
const DESIRED_RETENTION = 0.9;
const W = [
  0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575, 0.1192, 1.01925,
  1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621,
];

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function retrievability(elapsedDays, stability) {
  return (1 + (FACTOR * elapsedDays) / stability) ** DECAY;
}

function nextInterval(stability) {
  return Math.max(1, Math.round((stability / FACTOR) * (DESIRED_RETENTION ** (1 / DECAY) - 1)));
}

function initialStability(rating) {
  return W[rating - 1];
}

function initialDifficulty(rating) {
  return clamp(W[4] - Math.exp(W[5] * (rating - 3)) + 1, 1, 10);
}

function updateDifficulty(d, rating) {
  const meanReversion = W[7] * initialDifficulty(4) + (1 - W[7]) * (d - W[6] * (rating - 3));
  return clamp(meanReversion, 1, 10);
}

function recallStability(d, s, r, rating) {
  const hardPenalty = rating === 2 ? W[11] : 1;
  const easyBonus = rating === 4 ? W[12] : 1;
  return (
    s *
    (1 +
      Math.exp(W[8]) *
        (11 - d) *
        s ** -W[9] *
        (Math.exp((1 - r) * W[10]) - 1) *
        hardPenalty *
        easyBonus)
  );
}

function forgetStability(d, s, r) {
  return Math.max(0.1, W[13] * d ** -W[14] * (s + 1) ** W[15] * Math.exp((1 - r) * W[16]));
}

export class SRSManager {
  constructor(progressManager, storageServiceRef) {
    this.progressManager = progressManager;
    this.storage = storageServiceRef || storageService;
    this.cards = new Map();
  }

  async init() {
    try {
      const allCards = await this.storage.loadAll('srs');
      if (allCards && allCards.length) {
        for (const card of allCards) {
          if (card.easeFactor !== undefined && card.stability === undefined) {
            this._migrateCard(card);
            await this.storage.save('srs', card);
          }
          this.cards.set(card.wordKey, card);
        }
      }
      this.updateDueBadge();
    } catch (err) {
      console.error('SRSManager init failed:', err);
    }
  }

  _migrateCard(card) {
    card._legacySM2 = {
      interval: card.interval,
      easeFactor: card.easeFactor,
      repetitions: card.repetitions,
      nextReview: card.nextReview,
    };
    card.difficulty = clamp(10 - ((card.easeFactor - 1.3) / 3.7) * 9, 1, 10);
    card.stability = Math.max(0.1, card.interval);
    card.state = card.repetitions === 0 ? 'new' : 'review';
    card.reps = card.repetitions;
    card.lapses = 0;
    card.due = card.nextReview;
    card.reviewLog = [];
    delete card.interval;
    delete card.easeFactor;
    delete card.repetitions;
    delete card.nextReview;
  }

  addWords(words, source) {
    if (!words || !words.length) return;
    const now = new Date().toISOString();

    for (const word of words) {
      if (!word.english) continue;
      const wordKey = word.english.toLowerCase().trim();
      if (this.cards.has(wordKey)) continue;

      const card = {
        wordKey,
        english: word.english,
        italian: word.italian || '',
        pronunciation: word.pronunciation || '',
        example: word.example || '',
        source: source || 'unknown',
        difficulty: 0,
        stability: 0,
        state: 'new',
        reps: 0,
        lapses: 0,
        due: now,
        lastReview: null,
        created: now,
        reviewLog: [],
      };

      this.cards.set(wordKey, card);
      this.storage.save('srs', card).catch((err) => {
        console.error('Failed to save SRS card:', err);
      });
    }
    this.updateDueBadge();
  }

  getDueCards() {
    const now = new Date();
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    const due = [];

    for (const card of this.cards.values()) {
      if (new Date(card.due) <= todayEnd) {
        due.push(card);
      }
    }
    due.sort((a, b) => new Date(a.due) - new Date(b.due));
    return due;
  }

  getDueCount() {
    return this.getDueCards().length;
  }

  _schedule(card, rating) {
    const now = new Date();
    let d = card.difficulty;
    let s = card.stability;
    let interval;

    if (card.state === 'new') {
      s = initialStability(rating);
      d = initialDifficulty(rating);
      interval = nextInterval(s);
    } else {
      const elapsed = card.lastReview
        ? (now - new Date(card.lastReview)) / (1000 * 60 * 60 * 24)
        : 0;
      const r = s > 0 ? retrievability(elapsed, s) : 0;
      d = updateDifficulty(d, rating);

      if (rating === 1) {
        s = forgetStability(d, s, r);
      } else {
        s = recallStability(d, s, r, rating);
      }
      interval = nextInterval(s);
    }

    return { difficulty: d, stability: s, interval };
  }

  async reviewCard(wordKey, rating) {
    const card = this.cards.get(wordKey);
    if (!card) return;

    const now = new Date();
    const { difficulty, stability, interval } = this._schedule(card, rating);

    card.difficulty = difficulty;
    card.stability = stability;

    if (rating === 1) {
      card.lapses++;
      card.state = card.state === 'new' ? 'learning' : 'relearning';
    } else {
      card.reps++;
      card.state = 'review';
    }

    card.lastReview = now.toISOString();
    const nextDate = new Date(now);
    nextDate.setDate(nextDate.getDate() + interval);
    card.due = nextDate.toISOString();

    if (!card.reviewLog) card.reviewLog = [];
    card.reviewLog.push({ rating, date: card.lastReview, elapsed: interval });
    if (card.reviewLog.length > 20) card.reviewLog.shift();

    this.cards.set(wordKey, card);

    try {
      await this.storage.save('srs', card);
    } catch (err) {
      console.error('Failed to save reviewed card:', err);
    }
    this.updateDueBadge();
  }

  _formatInterval(days) {
    if (days < 1) return '<1d';
    if (days < 30) return `${days}d`;
    if (days < 365) return `${Math.round(days / 30)}mo`;
    return `${(days / 365).toFixed(1)}y`;
  }

  renderReviewSession() {
    const container = document.getElementById('practice-content');
    const practiceContainer = document.getElementById('practice-container');
    const practiceGrid = document.querySelector('#practice .practice-grid');

    if (!container || !practiceContainer) return;

    if (practiceGrid) practiceGrid.classList.add('hidden');
    practiceContainer.classList.remove('hidden');

    const timerEl = document.getElementById('practice-timer');
    const streakEl = document.getElementById('practice-streak');
    const xpEl = document.getElementById('practice-xp');
    if (timerEl) timerEl.textContent = '';
    if (streakEl) streakEl.textContent = '';
    if (xpEl) xpEl.textContent = '';

    const dueCards = this.getDueCards();

    if (dueCards.length === 0) {
      const progressEl = document.getElementById('practice-progress');
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

    this._session = {
      cards: dueCards,
      currentIndex: 0,
      totalCards: dueCards.length,
      results: [],
      showingAnswer: false,
    };

    this._renderCurrentCard();
  }

  _renderCurrentCard() {
    const container = document.getElementById('practice-content');
    if (!container || !this._session) return;

    const { cards, currentIndex, totalCards } = this._session;
    const card = cards[currentIndex];

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

    const intervals = [1, 2, 3, 4].map((r) => this._schedule(card, r).interval);

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
          <button class="btn srs-btn-again" data-rating="1">
            Ancora / Again<span class="srs-interval">${this._formatInterval(intervals[0])}</span>
          </button>
          <button class="btn srs-btn-hard" data-rating="2">
            Difficile / Hard<span class="srs-interval">${this._formatInterval(intervals[1])}</span>
          </button>
          <button class="btn srs-btn-good" data-rating="3">
            Bene / Good<span class="srs-interval">${this._formatInterval(intervals[2])}</span>
          </button>
          <button class="btn srs-btn-easy" data-rating="4">
            Facile / Easy<span class="srs-interval">${this._formatInterval(intervals[3])}</span>
          </button>
        </div>
      </div>
      <div class="srs-progress">
        <div class="srs-progress-fill" style="width: ${(currentIndex / totalCards) * 100}%"></div>
      </div>
    `;

    container.querySelectorAll('[data-rating]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const rating = parseInt(e.currentTarget.dataset.rating, 10);
        this._rateCard(rating);
      });
    });
  }

  async _rateCard(rating) {
    if (!this._session) return;

    const { cards, currentIndex } = this._session;
    const card = cards[currentIndex];

    this._session.results.push({ wordKey: card.wordKey, rating });
    await this.reviewCard(card.wordKey, rating);

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
    const correct = results.filter((r) => r.rating >= 2).length;
    const accuracy = totalCards > 0 ? Math.round((correct / totalCards) * 100) : 0;

    const progressEl = document.getElementById('practice-progress');
    if (progressEl) progressEl.textContent = `${totalCards}/${totalCards}`;
    const progressFill = document.getElementById('practice-progress-fill');
    if (progressFill) progressFill.style.width = '100%';

    const again = results.filter((r) => r.rating === 1).length;
    const hard = results.filter((r) => r.rating === 2).length;
    const good = results.filter((r) => r.rating === 3).length;
    const easy = results.filter((r) => r.rating === 4).length;

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

  _escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
