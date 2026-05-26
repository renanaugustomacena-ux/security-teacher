/**
 * PRACTICE MODULE - FlowLearn
 * ===========================
 *
 * Gestisce gli esercizi interattivi:
 * - Listening (Ascolto)
 * - Writing (Scrittura)
 * - Matching (Abbinamento)
 * - Fill in the blank (Completa)
 * - Sentence Reconstruction (Ricostruzione Frase)
 * - Comprehension (Comprensione)
 * - Scenario (Dialogo situazionale)
 *
 * Pulls vocabulary from BOTH lessons AND songs databases.
 */

import { lessonsDatabase } from './lessons.js';
import { songsDatabase } from './songs.js';
import { sfxService } from './services/SfxService.js';
import { practiceHUD } from './PracticeHUD.js';
import { nearMiss } from './utils/StringDistance.js';
import { escapeHtml } from './utils/SanitizeHtml.js';
import { practiceRenderingMixin } from './PracticeRendering.js';
import {
  FEEDBACK_DWELL,
  ENCOURAGING_CORRECT,
  ENCOURAGING_INCORRECT,
  shuffleArray,
  normalize,
  normalizeWithAccents,
  calculateXP,
} from './utils/PracticeUtils.js';


export class PracticeManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.currentMode = null;
    this.questions = [];
    this.fullPool = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.songFilter = null;

    // XP & Timer state
    this.questionStartTime = 0;
    this.sessionXP = 0;
    this.consecutiveCorrect = 0;
    this.maxStreak = 0;
    this.totalResponseTime = 0;
    this.timerInterval = null;

    this.init();
  }

  init() {
    window.practiceManager = this;
  }



  /**
   * Start a practice session.
   * @param {string} mode - Exercise type
   * @param {string|null} songId - If provided, practice only this song's vocabulary
   */
  startPractice(mode, songId = null) {
    this.currentMode = mode;
    this.songFilter = songId;
    this.generateQuestions(mode);
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.sessionXP = 0;
    this.consecutiveCorrect = 0;
    this.maxStreak = 0;
    this.totalResponseTime = 0;
    practiceHUD.reset();

    if (this.questions.length === 0) {
      this.showNotification(
        'Nessuna domanda disponibile. Completa qualche lezione prima! / No questions available. Complete some lessons first!',
        'warning'
      );
      return;
    }

    document.querySelector('.practice-grid').classList.add('hidden');
    document.getElementById('practice-container').classList.remove('hidden');

    this.startQuestionTimer();
    this.updateProgressBar();
    this.updateStreakDisplay();
    this.updateXPDisplay();
    this.renderQuestion();
  }

  /**
   * Generate question pool from lessons AND songs
   */
  generateQuestions(mode) {
    let pool = [];

    if (this.songFilter) {
      const song = songsDatabase.find((s) => s.id === this.songFilter);
      if (song) {
        song.steps.forEach((step) => {
          step.vocabulary.forEach((v) => {
            pool.push({
              english: v.word,
              italian: v.translation,
              pronunciation: v.pronunciation,
              example: v.example,
            });
          });
        });
      }
    } else {
      // Merge from lessons, tagging each item with its source lesson
      const { unlockedLevels } = this.progressManager.data;
      unlockedLevels.forEach((lvl) => {
        const levelData = lessonsDatabase[lvl];
        if (levelData) {
          levelData.lessons.forEach((lesson) => {
            lesson.items.forEach((item) => {
              pool.push({ ...item, _lessonId: lesson.id, _level: lvl });
            });
          });
        }
      });

      // Also merge from songs (normalize shape)
      songsDatabase.forEach((song) => {
        song.steps.forEach((step) => {
          step.vocabulary.forEach((v) => {
            pool.push({
              english: v.word,
              italian: v.translation,
              pronunciation: v.pronunciation,
              example: v.example,
              _lessonId: `song_${song.id}`,
              _level: 'songs',
            });
          });
        });
      });

      // Deduplicate by english word (case-insensitive)
      const seen = new Set();
      pool = pool.filter((item) => {
        const key = (item.english || '').toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    if (mode === 'sentence' || mode === 'fillblank') {
      pool = pool.filter((item) => item.example || item.usage);
    } else if (mode === 'comprehension') {
      pool = pool.filter((item) => item.example);
    } else if (mode === 'scenario') {
      pool = pool.filter((item) => item.example && item.english && item.italian);
    } else {
      pool = pool.filter((item) => item.english && item.italian);
    }

    // Store full pool before slicing for distractor generation
    this.fullPool = [...pool];
    this.questions = shuffleArray(pool).slice(0, 10);
  }

  // ─── TIMER & XP ──────────────────────────────

  startQuestionTimer() {
    this.questionStartTime = Date.now();
    this.clearTimer();
    const timerEl = document.getElementById('practice-timer');
    if (!timerEl) return;

    this.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.questionStartTime) / 1000);
      timerEl.textContent = `${elapsed}s`;
      timerEl.classList.remove('timer-green', 'timer-warn', 'timer-danger');
      if (elapsed < 5) timerEl.classList.add('timer-green');
      else if (elapsed <= 15) timerEl.classList.add('timer-warn');
      else timerEl.classList.add('timer-danger');
    }, 250);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getResponseTimeSeconds() {
    return (Date.now() - this.questionStartTime) / 1000;
  }

  updateProgressBar() {
    const fill = document.getElementById('practice-progress-fill');
    if (!fill) return;
    const percent = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
    fill.style.width = `${percent}%`;
  }

  updateStreakDisplay() {
    const el = document.getElementById('practice-streak');
    if (!el) return;
    el.textContent = this.consecutiveCorrect > 0 ? `Streak: ${this.consecutiveCorrect}` : '';
  }

  updateXPDisplay() {
    const el = document.getElementById('practice-xp');
    if (el) el.textContent = `${this.sessionXP} XP`;
  }

  showFloatingXP(amount) {
    const container = document.getElementById('practice-content');
    if (!container) return;
    const floater = document.createElement('div');
    floater.className = 'xp-floater';
    floater.textContent = `+${amount} XP`;
    container.appendChild(floater);
    setTimeout(() => floater.remove(), 1200);
  }

  checkAnswer(selected, correct) {
    this.handleResult(selected === correct, correct);
  }

  /**
   * Check writing answer with accent tolerance + near-miss forgiveness.
   * Order of checks: exact > accent-only > near-miss (typo) > miss.
   */
  checkWritingAnswer(correct) {
    const input = document.getElementById('writing-input');
    if (!input) return;

    const userValue = input.value;
    const exactMatch = normalize(userValue) === normalize(correct);

    if (exactMatch) {
      this.handleResult(true, correct);
      return;
    }

    // Accent-tolerant match
    const accentMatch = normalizeWithAccents(userValue) === normalizeWithAccents(correct);
    if (accentMatch) {
      this.handleResult(true, correct, true);
      return;
    }

    if (nearMiss(userValue, correct).partial) {
      this.handleNearMiss(userValue, correct);
      return;
    }

    this.handleResult(false, correct);
  }

  /**
   * Near-miss path: typo within Levenshtein threshold. Awards 50% XP, breaks
   * the streak (so users don't farm typos), shows a softer feedback card
   * with diff-highlight of the user's input vs the correct answer.
   */
  handleNearMiss(userValue, correctAnswer) {
    this.clearTimer();
    const responseTime = this.getResponseTimeSeconds();
    this.totalResponseTime += responseTime;

    const xpEarned = Math.round(calculateXP(responseTime, this.consecutiveCorrect) * 0.5);
    this.sessionXP += xpEarned;
    this.progressManager.addXP(xpEarned);
    this.consecutiveCorrect = 0;

    this.updateStreakDisplay();
    this.updateXPDisplay();

    sfxService.nearMiss();
    practiceHUD.onAnswerResult({ correct: false, streak: 0 });

    const container = document.getElementById('practice-content');
    if (!container) return;

    const diffHtml = this.renderNearMissDiff(userValue, correctAnswer);
    container.innerHTML = `
      <div class="feedback-card feedback-near-miss">
        <div class="feedback-message">Quasi! Hai sbagliato di poco / Just a typo away</div>
        ${xpEarned > 0 ? `<div class="feedback-xp">+${xpEarned} XP (parziale)</div>` : ''}
        <div class="near-miss-diff">${diffHtml}</div>
        <div class="feedback-answer">La risposta era: <strong>${escapeHtml(correctAnswer)}</strong></div>
        <div class="feedback-progress-bar"><div class="feedback-progress-fill"></div></div>
      </div>
    `;

    if (xpEarned > 0) this.showFloatingXP(xpEarned);
    setTimeout(() => this.nextQuestion(), FEEDBACK_DWELL.nearMiss);
  }

  renderNearMissDiff(userValue, correctAnswer) {
    const u = String(userValue || '');
    const e = String(correctAnswer || '');
    const max = Math.max(u.length, e.length);
    let html = '';
    for (let i = 0; i < max; i += 1) {
      const ch = u[i] ?? '';
      const expected = e[i] ?? '';
      const match = ch !== '' && ch.toLowerCase() === expected.toLowerCase();
      const display = ch || '·';
      const cls = match ? 'char-match' : 'char-miss';
      html += `<span class="${cls}">${escapeHtml(display)}</span>`;
    }
    return html;
  }

  /**
   * Check sentence reconstruction with partial credit
   */
  checkSentenceAnswer(correct) {
    const input = document.getElementById('writing-input');
    if (!input) return;

    const userWords = input.value.trim().split(/\s+/);
    const correctWords = correct.trim().split(/\s+/);

    // Exact match
    if (normalize(input.value) === normalize(correct)) {
      this.handleResult(true, correct);
      return;
    }

    // Calculate partial credit
    let correctCount = 0;
    const maxLen = Math.max(userWords.length, correctWords.length);
    const positions = [];

    for (let i = 0; i < maxLen; i++) {
      const userWord = (userWords[i] || '').toLowerCase();
      const correctWord = (correctWords[i] || '').toLowerCase();
      const isCorrectPos = userWord === correctWord;
      if (isCorrectPos) correctCount++;
      positions.push({
        word: userWords[i] || '',
        correct: isCorrectPos,
        expected: correctWords[i] || '',
      });
    }

    const score = correctWords.length > 0 ? correctCount / correctWords.length : 0;

    if (score >= 0.7) {
      this.handlePartialSentenceResult(positions, correctCount, correctWords.length, correct);
    } else {
      this.handleResult(false, correct);
    }
  }

  handlePartialSentenceResult(positions, correctCount, totalWords, correctAnswer) {
    this.clearTimer();
    const responseTime = this.getResponseTimeSeconds();
    this.totalResponseTime += responseTime;

    const xpEarned = Math.round(calculateXP(responseTime, this.consecutiveCorrect) * 0.5);
    this.sessionXP += xpEarned;
    this.progressManager.addXP(xpEarned);
    this.consecutiveCorrect = 0;

    this.updateStreakDisplay();
    this.updateXPDisplay();

    const container = document.getElementById('practice-content');
    if (!container) return;

    const wordsHtml = positions
      .map(
        (p) =>
          `<span class="word-chip ${p.correct ? 'word-correct' : 'word-incorrect'}">${escapeHtml(p.word || '___')}</span>`
      )
      .join(' ');

    container.innerHTML = `
      <div class="feedback-card feedback-partial">
        <div class="feedback-message">Quasi perfetto! ${correctCount}/${totalWords} parole corrette</div>
        ${xpEarned > 0 ? `<div class="feedback-xp">+${xpEarned} XP (parziale)</div>` : ''}
        <div class="sentence-feedback">${wordsHtml}</div>
        <div class="feedback-answer">La frase corretta: <strong>${escapeHtml(correctAnswer)}</strong></div>
        <div class="feedback-progress-bar"><div class="feedback-progress-fill"></div></div>
      </div>
    `;

    if (xpEarned > 0) this.showFloatingXP(xpEarned);
    setTimeout(() => this.nextQuestion(), FEEDBACK_DWELL.partial);
  }

  handleResult(isCorrect, correct, accentHint = false) {
    this.clearTimer();
    const responseTime = this.getResponseTimeSeconds();
    this.totalResponseTime += responseTime;

    let xpEarned = 0;
    if (isCorrect) {
      this.score++;
      this.consecutiveCorrect++;
      if (this.consecutiveCorrect > this.maxStreak) {
        this.maxStreak = this.consecutiveCorrect;
      }
      xpEarned = calculateXP(responseTime, this.consecutiveCorrect);
      this.sessionXP += xpEarned;
      this.progressManager.addXP(xpEarned);
      this.progressManager.incrementWordCount();
    } else {
      this.consecutiveCorrect = 0;
    }

    this.updateStreakDisplay();
    this.updateXPDisplay();

    if (isCorrect) {
      sfxService.correct();
      this._hapticTap(12);
    } else {
      sfxService.incorrect();
    }
    practiceHUD.onAnswerResult({ correct: isCorrect, streak: this.consecutiveCorrect });

    this.showFeedback(isCorrect, correct, xpEarned, accentHint);
  }

  _hapticTap(ms) {
    if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      try {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      } catch (e) {
        // ignore
      }
    }
    try {
      navigator.vibrate(ms);
    } catch (e) {
      // older browsers throw on non-numeric or restricted contexts
    }
  }

  /**
   * Show inline feedback
   */
  showFeedback(isCorrect, correctAnswer, xpEarned = 0, accentHint = false) {
    const container = document.getElementById('practice-content');
    if (!container) return;

    const message = isCorrect
      ? ENCOURAGING_CORRECT[Math.floor(Math.random() * ENCOURAGING_CORRECT.length)]
      : ENCOURAGING_INCORRECT[Math.floor(Math.random() * ENCOURAGING_INCORRECT.length)];

    const accentHintHtml = accentHint
      ? `<div class="feedback-accent-hint">Attenzione agli accenti: <strong>${escapeHtml(correctAnswer)}</strong></div>`
      : '';

    const feedbackHtml = `
            <div class="feedback-card ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}">
                <div class="feedback-icon"></div>
                <div class="feedback-message">${message}</div>
                ${isCorrect && xpEarned > 0 ? `<div class="feedback-xp">+${xpEarned} XP</div>` : ''}
                ${accentHintHtml}
                ${!isCorrect ? `<div class="feedback-answer">La risposta era: <strong>${escapeHtml(correctAnswer)}</strong></div>` : ''}
                <div class="feedback-progress-bar">
                    <div class="feedback-progress-fill"></div>
                </div>
            </div>
        `;

    container.innerHTML = feedbackHtml;

    if (isCorrect && xpEarned > 0) {
      this.showFloatingXP(xpEarned);
    }

    const dwell = isCorrect ? FEEDBACK_DWELL.correct : FEEDBACK_DWELL.incorrect;
    setTimeout(() => {
      this.nextQuestion();
    }, dwell);
  }

  /**
   * Show a non-blocking notification (replaces alert for empty states)
   */
  showNotification(message, type = 'info') {
    const container = document.getElementById('practice-content');
    if (!container) return;

    container.innerHTML = `
            <div class="feedback-card feedback-${type}">
                <div class="feedback-icon"></div>
                <div class="feedback-message">${escapeHtml(message)}</div>
                <button class="btn btn-secondary" data-action="back" style="margin-top: 1rem;">\u2190 Indietro / Back</button>
            </div>
        `;

    container
      .querySelector('[data-action="back"]')
      ?.addEventListener('click', () => this.closePractice());
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.updateProgressBar();
      this.startQuestionTimer();
      this.renderQuestion();
    } else {
      this.clearTimer();
      this.completePractice();
    }
  }

  completePractice() {
    // Track daily goals
    this.progressManager.incrementDailyPractice();

    // Track practice session completion for achievements
    this.progressManager.recordPracticeSession(this.score, this.questions.length);

    // Update leaderboard: practice score and fastest practice time
    const practicePercent =
      this.questions.length > 0 ? Math.round((this.score / this.questions.length) * 100) : 0;
    const totalTime = this.totalResponseTime;
    try {
      const lbm = window.app?.leaderboardManager;
      if (lbm) {
        lbm.checkNewRecord('bestPracticeScore', practicePercent);
        if (this.questions.length >= 10 && totalTime > 0) {
          lbm.checkNewRecord('fastestPractice', totalTime);
        }
        lbm.updatePersonalBests();
      }
    } catch {
      // Leaderboard update is non-critical
    }

    const container = document.getElementById('practice-content');
    if (!container) return;

    const percent = Math.round((this.score / this.questions.length) * 100);
    const avgTime =
      this.questions.length > 0
        ? (this.totalResponseTime / this.questions.length).toFixed(1)
        : '0.0';
    const emoji = '';
    const message =
      percent >= 80
        ? 'Incredibile! / Amazing!'
        : percent >= 50
          ? 'Buon lavoro! / Good job!'
          : 'Continua cos\u00EC! / Keep it up!';

    const accuracyClass =
      percent >= 80 ? 'accuracy-high' : percent >= 50 ? 'accuracy-mid' : 'accuracy-low';

    container.innerHTML = `
            <div class="completion-overlay">
                <div class="completion-content">
                    <span class="completion-icon">${emoji}</span>
                    <h3>${message}</h3>
                    <div class="completion-score">
                        <span class="score-number">${this.score}</span>
                        <span class="score-divider">/</span>
                        <span class="score-total">${this.questions.length}</span>
                    </div>
                    <div class="completion-accuracy-bar ${accuracyClass}">
                        <div class="completion-accuracy-fill" style="width: ${percent}%"></div>
                    </div>
                    <p class="completion-percent">${percent}% corretto / correct</p>
                    <div class="completion-breakdown">
                        <div class="breakdown-item">
                            <span class="breakdown-value">${this.sessionXP}</span>
                            <span class="breakdown-label">XP Totali</span>
                        </div>
                        <div class="breakdown-item">
                            <span class="breakdown-value">${avgTime}s</span>
                            <span class="breakdown-label">Tempo Medio</span>
                        </div>
                        <div class="breakdown-item">
                            <span class="breakdown-value">${this.maxStreak}</span>
                            <span class="breakdown-label">Max Streak</span>
                        </div>
                    </div>
                    <div class="completion-actions">
                        <button class="btn btn-secondary" data-action="close">
                            \u2190 Torna agli Esercizi / Back to Exercises
                        </button>
                        <button class="btn btn-primary" data-action="retry">
                            Riprova / Try Again
                        </button>
                    </div>
                </div>
            </div>
        `;

    const mode = this.currentMode;
    container
      .querySelector('[data-action="close"]')
      ?.addEventListener('click', () => this.closePractice());
    container
      .querySelector('[data-action="retry"]')
      ?.addEventListener('click', () => this.startPractice(mode));
  }

  closePractice() {
    this.clearTimer();
    document.getElementById('practice-container').classList.add('hidden');
    document.querySelector('.practice-grid').classList.remove('hidden');
    this.questions = [];
    this.fullPool = [];
    this.songFilter = null;
  }
}

Object.assign(PracticeManager.prototype, practiceRenderingMixin);
