/**
 * PRONUNCIATION PRACTICE MODULE - FlowLearn
 * ==========================================
 *
 * Gestisce la pratica di pronuncia:
 * - Speech Recognition per catturare l'audio dell'utente
 * - Text-to-Speech per riprodurre la frase target
 * - Levenshtein distance per calcolare il punteggio di similarita'
 * - Feedback visivo con stelle e codice colore
 *
 * Pulls vocabulary from BOTH lessons AND songs databases.
 */

import { lessonsDatabase } from './lessons.js';
import { songsDatabase } from './songs.js';
import { ttsService } from './services/TTSService.js';

export class PronunciationManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.isSupported = false;
    this.SpeechRecognition = null;
    this.recognition = null;
    this.phrases = [];
    this.currentPhraseIndex = 0;
    this.sessionScores = [];
    this.isRecording = false;
  }

  /**
   * Check browser support for SpeechRecognition
   */
  init() {
    this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    this.isSupported = !!this.SpeechRecognition;

    // Hide card if not supported
    const card = document.getElementById('practice-card-pronunciation');
    if (card) {
      card.style.display = this.isSupported ? '' : 'none';
    }

    window.pronunciationManager = this;
  }

  /**
   * Escape HTML entities to prevent XSS
   */
  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Build a pool of English phrases from lessons and songs
   */
  _buildPhrasePool() {
    const pool = [];

    // From lessons database
    Object.values(lessonsDatabase).forEach((level) => {
      if (!level.lessons) return;
      level.lessons.forEach((lesson) => {
        if (!lesson.items) return;
        lesson.items.forEach((item) => {
          if (item.english) {
            pool.push({ english: item.english, italian: item.italian || '' });
          }
        });
      });
    });

    // From songs database
    songsDatabase.forEach((song) => {
      if (!song.steps) return;
      song.steps.forEach((step) => {
        if (step.english) {
          pool.push({ english: step.english, italian: step.italian || '' });
        }
      });
    });

    // Deduplicate by english text (case-insensitive)
    const seen = new Set();
    return pool.filter((item) => {
      const key = item.english.toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  /**
   * Shuffle an array (Fisher-Yates)
   */
  _shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  /**
   * Begin a pronunciation practice session with 10 phrases
   */
  startSession() {
    if (!this.isSupported) return;

    const pool = this._buildPhrasePool();
    if (pool.length === 0) return;

    this.phrases = this._shuffleArray(pool).slice(0, 10);
    this.currentPhraseIndex = 0;
    this.sessionScores = [];
    this.isRecording = false;

    // Show practice UI, hide grid
    document.querySelector('.practice-grid')?.classList.add('hidden');
    const container = document.getElementById('practice-container');
    if (container) {
      container.classList.remove('hidden');
    }

    this.renderPractice();
  }

  /**
   * Close pronunciation practice and return to the grid
   */
  closeSession() {
    this.isRecording = false;
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {
        // ignore
      }
      this.recognition = null;
    }
    ttsService.stop();

    document.querySelector('.practice-grid')?.classList.remove('hidden');
    const container = document.getElementById('practice-container');
    if (container) {
      container.classList.add('hidden');
    }
  }

  /**
   * Render the pronunciation practice UI in the practice container
   */
  renderPractice() {
    const container = document.getElementById('practice-container');
    if (!container) return;

    const phrase = this.phrases[this.currentPhraseIndex];
    if (!phrase) return;

    const num = this.currentPhraseIndex + 1;
    const total = this.phrases.length;
    const progressPercent = Math.round((num / total) * 100);

    container.innerHTML = `
      <div class="practice-header">
        <button class="btn btn-secondary" onclick="pronunciationManager.closeSession()">← Indietro / Back</button>
        <span class="practice-progress">${num}/${total}</span>
      </div>
      <div class="practice-progress-bar">
        <div class="practice-progress-fill" style="width: ${progressPercent}%"></div>
      </div>
      <div class="pronunciation-container">
        <div class="pronunciation-phrase">${this.escapeHtml(phrase.english)}</div>
        ${phrase.italian ? `<div class="pronunciation-translation">${this.escapeHtml(phrase.italian)}</div>` : ''}
        <div class="pronunciation-controls">
          <button class="btn listen-btn" id="pron-listen-btn" type="button" title="Ascolta / Listen">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
            Ascolta / Listen
          </button>
          <button class="btn record-btn" id="pron-record-btn" type="button" title="Registra / Record">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
              <path d="M19 10v2a7 7 0 01-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
            Registra / Record
          </button>
        </div>
        <div class="pronunciation-result" id="pron-result"></div>
      </div>
    `;

    // Attach listeners
    document.getElementById('pron-listen-btn')?.addEventListener('click', () => {
      ttsService.speak(phrase.english);
    });

    document.getElementById('pron-record-btn')?.addEventListener('click', () => {
      this.startRecognition(phrase.english);
    });
  }

  /**
   * Create SpeechRecognition instance and start listening
   */
  startRecognition(targetPhrase) {
    if (!this.SpeechRecognition) return;
    if (this.isRecording) {
      // Stop current recording
      if (this.recognition) {
        try {
          this.recognition.stop();
        } catch {
          // ignore
        }
      }
      return;
    }

    this.recognition = new this.SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = false;
    this.recognition.interimResults = true;

    const recordBtn = document.getElementById('pron-record-btn');
    const resultEl = document.getElementById('pron-result');

    // Show recording state
    this.isRecording = true;
    if (recordBtn) recordBtn.classList.add('recording');
    if (resultEl) {
      resultEl.innerHTML =
        '<div class="pronunciation-feedback recording-status">Ascoltando... / Listening...</div>';
    }

    let finalTranscript = '';

    this.recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      // Show interim results
      if (resultEl && interim) {
        resultEl.innerHTML = `<div class="pronunciation-feedback recording-status">"${this.escapeHtml(interim)}"</div>`;
      }
    };

    this.recognition.onend = () => {
      this.isRecording = false;
      if (recordBtn) recordBtn.classList.remove('recording');

      if (finalTranscript.trim()) {
        const score = this.calculateSimilarity(targetPhrase, finalTranscript);
        this.sessionScores.push(score);
        this.renderResult(score, targetPhrase, finalTranscript.trim());
      } else if (resultEl) {
        resultEl.innerHTML =
          '<div class="pronunciation-feedback" style="color: var(--warning);">Nessun audio rilevato. Riprova! / No audio detected. Try again!</div>';
      }
    };

    this.recognition.onerror = (event) => {
      this.isRecording = false;
      if (recordBtn) recordBtn.classList.remove('recording');

      let errorMsg = 'Errore di riconoscimento / Recognition error';
      if (event.error === 'no-speech') {
        errorMsg = 'Nessun suono rilevato. Riprova! / No speech detected. Try again!';
      } else if (event.error === 'not-allowed') {
        errorMsg =
          'Microfono non autorizzato. Controlla i permessi. / Microphone not allowed. Check permissions.';
      }

      if (resultEl) {
        resultEl.innerHTML = `<div class="pronunciation-feedback" style="color: var(--danger);">${errorMsg}</div>`;
      }
    };

    this.recognition.start();
  }

  /**
   * Calculate similarity between target and spoken using Levenshtein distance.
   * Returns 0-100 score.
   */
  calculateSimilarity(target, spoken) {
    const a = target
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, '');
    const b = spoken
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, '');

    if (a === b) return 100;

    const aLen = a.length;
    const bLen = b.length;
    const maxLen = Math.max(aLen, bLen);
    if (maxLen === 0) return 100;

    // Levenshtein distance (dynamic programming)
    const dp = Array.from({ length: aLen + 1 }, () => new Array(bLen + 1).fill(0));

    for (let i = 0; i <= aLen; i++) dp[i][0] = i;
    for (let j = 0; j <= bLen; j++) dp[0][j] = j;

    for (let i = 1; i <= aLen; i++) {
      for (let j = 1; j <= bLen; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }

    const distance = dp[aLen][bLen];
    return Math.round((1 - distance / maxLen) * 100);
  }

  /**
   * Get feedback based on score
   */
  _getFeedback(score) {
    if (score >= 90) {
      return { message: 'Perfetto! / Perfect!', color: 'var(--success)', stars: 3 };
    }
    if (score >= 70) {
      return { message: 'Molto bene! / Very good!', color: 'var(--warning)', stars: 2 };
    }
    if (score >= 50) {
      return { message: 'Buon tentativo / Good try', color: 'var(--accent-primary)', stars: 1 };
    }
    return { message: 'Riprova / Try again', color: 'var(--danger)', stars: 0 };
  }

  /**
   * Render result with highlighted differences and score
   */
  renderResult(score, target, spoken) {
    const resultEl = document.getElementById('pron-result');
    if (!resultEl) return;

    const feedback = this._getFeedback(score);
    const starsHTML = Array.from({ length: 3 }, (_, i) =>
      i < feedback.stars
        ? '<span class="pronunciation-star filled">&#9733;</span>'
        : '<span class="pronunciation-star">&#9734;</span>'
    ).join('');

    const isLastPhrase = this.currentPhraseIndex >= this.phrases.length - 1;
    const nextBtnText = isLastPhrase ? 'Risultati / Results' : 'Avanti / Next';

    resultEl.innerHTML = `
      <div class="pronunciation-score" style="color: ${feedback.color};">${score}%</div>
      <div class="pronunciation-stars">${starsHTML}</div>
      <div class="pronunciation-feedback" style="color: ${feedback.color};">${feedback.message}</div>
      <div class="pronunciation-comparison">
        <div class="comparison-row">
          <span class="comparison-label">Target:</span>
          <span class="comparison-text">${this.escapeHtml(target)}</span>
        </div>
        <div class="comparison-row">
          <span class="comparison-label">Tu / You:</span>
          <span class="comparison-text spoken-text">${this.escapeHtml(spoken)}</span>
        </div>
      </div>
      <button class="btn btn-primary pronunciation-next-btn" id="pron-next-btn">${nextBtnText} →</button>
    `;

    document.getElementById('pron-next-btn')?.addEventListener('click', () => {
      if (isLastPhrase) {
        this._showSummary();
      } else {
        this.currentPhraseIndex++;
        this.renderPractice();
      }
    });
  }

  /**
   * Show session summary after 10 phrases
   */
  _showSummary() {
    const container = document.getElementById('practice-container');
    if (!container) return;

    const totalScore =
      this.sessionScores.length > 0
        ? Math.round(this.sessionScores.reduce((a, b) => a + b, 0) / this.sessionScores.length)
        : 0;

    const feedback = this._getFeedback(totalScore);
    const starsHTML = Array.from({ length: 3 }, (_, i) =>
      i < feedback.stars
        ? '<span class="pronunciation-star filled">&#9733;</span>'
        : '<span class="pronunciation-star">&#9734;</span>'
    ).join('');

    // Update progress stats
    if (this.progressManager) {
      this.progressManager.updatePronunciationStats(totalScore);
      this.progressManager.recordPracticeSession(
        this.sessionScores.filter((s) => s >= 70).length,
        this.sessionScores.length
      );
      this.progressManager.addActivity('practice', `Pronuncia: ${totalScore}% media / avg score`);
    }

    container.innerHTML = `
      <div class="pronunciation-summary">
        <h2>Sessione Completata! / Session Complete!</h2>
        <div class="pronunciation-score summary-score" style="color: ${feedback.color};">${totalScore}%</div>
        <div class="pronunciation-stars summary-stars">${starsHTML}</div>
        <div class="pronunciation-feedback" style="color: ${feedback.color};">${feedback.message}</div>
        <div class="summary-details">
          <div class="summary-stat">
            <span class="summary-stat-value">${this.sessionScores.length}</span>
            <span class="summary-stat-label">Frasi / Phrases</span>
          </div>
          <div class="summary-stat">
            <span class="summary-stat-value">${this.sessionScores.filter((s) => s >= 90).length}</span>
            <span class="summary-stat-label">Perfette / Perfect</span>
          </div>
          <div class="summary-stat">
            <span class="summary-stat-value">${this.sessionScores.filter((s) => s >= 70).length}</span>
            <span class="summary-stat-label">Buone / Good</span>
          </div>
        </div>
        <div class="summary-actions">
          <button class="btn btn-primary" onclick="pronunciationManager.startSession()">Riprova / Try Again</button>
          <button class="btn btn-secondary" onclick="pronunciationManager.closeSession()">Chiudi / Close</button>
        </div>
      </div>
    `;
  }
}
