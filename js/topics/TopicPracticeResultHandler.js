import { escapeHtml } from '../utils/SanitizeHtml.js';
import { sfxService } from '../services/SfxService.js';
import { analyticsService } from '../services/AnalyticsService.js';
import { masteryService } from '../services/MasteryService.js';
import { questService } from '../services/QuestService.js';
import { currencyService } from '../services/CurrencyService.js';
import { hintService } from '../services/HintService.js';
import { smartScoreService } from '../services/SmartScoreService.js';
import { practiceHUD } from '../PracticeHUD.js';
import {
  FEEDBACK_DWELL,
  ENCOURAGING_CORRECT,
  ENCOURAGING_INCORRECT,
  calculateXP,
} from '../utils/PracticeUtils.js';

export const resultHandlerMixin = {

  handleResult(isCorrect, correct, accentHint = false) {
    this.clearTimer();
    const responseTime = this.getResponseTimeSeconds();
    this.totalResponseTime += responseTime;

    this._recordAnalytics(isCorrect, correct, responseTime);

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
      this.progressManager.incrementTopicWord(this.currentTopicId);
      currencyService.earn(1, 'practice_correct');
    } else {
      this.consecutiveCorrect = 0;
    }

    this.updateMetaDisplay();

    if (isCorrect) {
      sfxService.correct();
      this._hapticTap(12);
    } else {
      sfxService.incorrect();
    }
    practiceHUD.onAnswerResult({ correct: isCorrect, streak: this.consecutiveCorrect });

    this.showFeedback(isCorrect, correct, xpEarned, accentHint);
  },

  _recordAnalytics(isCorrect, expectedAnswer, responseTimeSec) {
    const q = this.questions[this.currentQuestionIndex];
    if (!q || !this.currentTopicId) return;
    const english = q.english || q.item?.english || '';
    if (!english) return;
    const context = q.context || q.item?.context || 'general';
    const itemKey = `${this.currentTopicId}:${this.currentLevel}:${context}:${english}`;
    analyticsService.recordResponse({
      itemKey,
      timestamp: new Date().toISOString(),
      exerciseMode: this.currentMode,
      correct: isCorrect,
      responseTimeMs: Math.round(responseTimeSec * 1000),
      userAnswer: expectedAnswer || '',
      expectedAnswer: expectedAnswer || '',
      streakAtTime: this.consecutiveCorrect,
    });

    if (this.currentTopicId && this.currentLevel != null) {
      smartScoreService.updateScore(this.currentTopicId, this.currentLevel, isCorrect);
    }
  },

  _updateMasteryBatch() {
    const seen = new Set();
    for (const q of this.questions) {
      const english = q.english || q.item?.english || '';
      if (!english) continue;
      const context = q.context || q.item?.context || 'general';
      const itemKey = `${this.currentTopicId}:${this.currentLevel}:${context}:${english}`;
      if (seen.has(itemKey)) continue;
      seen.add(itemKey);
      const a = analyticsService.getItemAnalytics(itemKey);
      if (a) {
        masteryService.updateMastery(itemKey, a);
      }
    }
  },

  _getHints() {
    if (!this.questions || this.currentQuestionIndex >= this.questions.length) return [];
    const q = this.questions[this.currentQuestionIndex];
    return hintService.generateHints(q, this.currentMode);
  },

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
  },

  handlePartialResult(correct) {
    this.clearTimer();
    const responseTime = this.getResponseTimeSeconds();
    this.totalResponseTime += responseTime;

    const xpEarned = Math.round(calculateXP(responseTime, this.consecutiveCorrect) * 0.5);
    this.sessionXP += xpEarned;
    this.progressManager.addXP(xpEarned);
    this.consecutiveCorrect = 0;

    this.updateMetaDisplay();
    sfxService.nearMiss();
    practiceHUD.onAnswerResult({ correct: false, streak: 0 });

    const container = document.getElementById('topic-practice-content');
    if (!container) return;

    container.innerHTML = `
      <div class="feedback-card feedback-partial">
        <div class="feedback-message">Quasi! Comando base corretto</div>
        ${xpEarned > 0 ? `<div class="feedback-xp">+${xpEarned} XP (parziale)</div>` : ''}
        <div class="feedback-answer">La risposta era: <strong>${escapeHtml(correct)}</strong></div>
        <div class="feedback-progress-bar"><div class="feedback-progress-fill"></div></div>
      </div>
    `;

    if (xpEarned > 0) this.showFloatingXP(xpEarned);
    setTimeout(() => this.nextQuestion(), FEEDBACK_DWELL.partial);
  },

  handlePartialSentenceResult(positions, correctCount, totalWords, correctAnswer) {
    this.clearTimer();
    const responseTime = this.getResponseTimeSeconds();
    this.totalResponseTime += responseTime;

    const xpEarned = Math.round(calculateXP(responseTime, this.consecutiveCorrect) * 0.5);
    this.sessionXP += xpEarned;
    this.progressManager.addXP(xpEarned);
    this.consecutiveCorrect = 0;

    this.updateMetaDisplay();

    const container = document.getElementById('topic-practice-content');
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
  },

  showFeedback(isCorrect, correctAnswer, xpEarned = 0, accentHint = false) {
    const container = document.getElementById('topic-practice-content');
    if (!container) return;

    const message = isCorrect
      ? ENCOURAGING_CORRECT[Math.floor(Math.random() * ENCOURAGING_CORRECT.length)]
      : ENCOURAGING_INCORRECT[Math.floor(Math.random() * ENCOURAGING_INCORRECT.length)];

    const accentHintHtml = accentHint
      ? `<div class="feedback-accent-hint">Attenzione agli accenti: <strong>${escapeHtml(correctAnswer)}</strong></div>`
      : '';

    const modelSolutionHtml = !isCorrect ? this._getModelSolutionHtml() : '';

    container.innerHTML = `
      <div class="feedback-card ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}">
        <div class="feedback-icon">${isCorrect ? '✅' : '\u{1F4A1}'}</div>
        <div class="feedback-message">${message}</div>
        ${isCorrect && xpEarned > 0 ? `<div class="feedback-xp">+${xpEarned} XP</div>` : ''}
        ${accentHintHtml}
        ${!isCorrect ? `<div class="feedback-answer">La risposta era: <strong>${escapeHtml(correctAnswer)}</strong></div>` : ''}
        ${modelSolutionHtml}
        <div class="feedback-progress-bar">
          <div class="feedback-progress-fill"></div>
        </div>
      </div>
    `;

    if (isCorrect && xpEarned > 0) {
      this.showFloatingXP(xpEarned);
    }

    const hasModelSolution = modelSolutionHtml.length > 0;
    const dwell = isCorrect
      ? FEEDBACK_DWELL.correct
      : hasModelSolution
        ? FEEDBACK_DWELL.incorrect + 2000
        : FEEDBACK_DWELL.incorrect;
    setTimeout(() => this.nextQuestion(), dwell);
  },

  _getModelSolutionHtml() {
    const codeModes = ['command', 'codechallenge', 'terminal', 'codelab', 'codeoutput'];
    if (!codeModes.includes(this.currentMode)) return '';

    const q = this.questions[this.currentQuestionIndex];
    if (!q) return '';

    const item = q.item || q;
    const command = item.command || q.command;
    const code = item.code || q.code;
    const task = item.task || item.example || item.note || '';

    const solution = code || command;
    if (!solution) return '';

    const isMultiLine = solution.includes('\n');
    const solutionHtml = isMultiLine
      ? `<pre class="model-solution-code">${escapeHtml(solution)}</pre>`
      : `<code class="model-solution-code">${escapeHtml(solution)}</code>`;

    return `
      <div class="model-solution">
        <div class="model-solution-header">Model Solution</div>
        ${solutionHtml}
        ${task ? `<div class="model-solution-desc">${escapeHtml(task)}</div>` : ''}
      </div>`;
  },

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.updateMetaDisplay();
      this.startQuestionTimer();
      this.renderQuestion();
    } else {
      this.clearTimer();
      this.completePractice();
    }
  },

  completePractice() {
    this.progressManager?.recordPracticeSession?.(this.score, this.questions.length);

    questService.recordMetric('practiceCount', 1);
    questService.recordMetric('weekXP', this.sessionXP);
    questService.recordMetric('sessionXP', this.sessionXP);
    questService.recordMetric('maxStreak', this.maxStreak);
    if (this.score === this.questions.length && this.questions.length > 0) {
      questService.recordMetric('perfectScores', 1);
      currencyService.earn(10, 'perfect_session');
    }
    if (this.currentMode === 'terminal') questService.recordMetric('terminalCount', 1);
    if (this.currentMode === 'codelab') questService.recordMetric('codelabCount', 1);

    this._updateMasteryBatch();

    const container = document.getElementById('topic-practice-content');
    if (!container) return;

    const percent = Math.round((this.score / this.questions.length) * 100);
    const avgTime =
      this.questions.length > 0
        ? (this.totalResponseTime / this.questions.length).toFixed(1)
        : '0.0';
    const emoji = percent >= 80 ? '\u{1F3C6}' : percent >= 50 ? '\u{1F44F}' : '\u{1F4AA}';
    const message =
      percent >= 80
        ? 'Incredibile! / Amazing!'
        : percent >= 50
          ? 'Buon lavoro! / Good job!'
          : 'Continua così! / Keep it up!';

    const accuracyClass =
      percent >= 80 ? 'accuracy-high' : percent >= 50 ? 'accuracy-mid' : 'accuracy-low';

    this.progressManager.updateTopicPracticeStats(
      this.currentTopicId,
      this.questions.length,
      this.score
    );

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
            <button class="btn btn-secondary" data-action="back-to-level">
              ← Torna al Livello / Back to Level
            </button>
            <button class="btn btn-primary" data-action="retry">
              \u{1F504} Riprova / Try Again
            </button>
          </div>
        </div>
      </div>
    `;

    const topicId = this.currentTopicId;
    const levelNum = this.currentLevel;
    const mode = this.currentMode;
    container.querySelector('[data-action="back-to-level"]')?.addEventListener('click', () => {
      if (window.topicManager) window.topicManager.openLevel(topicId, levelNum);
    });
    container.querySelector('[data-action="retry"]')?.addEventListener('click', () => {
      this.startPractice(mode, topicId, levelNum);
    });
  },

  showNotification(message, type = 'info') {
    const container = document.getElementById('topic-practice-content');
    if (!container) return;

    container.innerHTML = `
      <div class="feedback-card feedback-${type}">
        <div class="feedback-icon">${type === 'warning' ? '⚠️' : 'ℹ️'}</div>
        <div class="feedback-message">${escapeHtml(message)}</div>
        <button class="btn btn-secondary" data-action="back" style="margin-top: 1rem;">
          ← Indietro / Back
        </button>
      </div>
    `;

    container.querySelector('[data-action="back"]')?.addEventListener('click', () => {
      if (window.topicManager) window.topicManager.backToDetail();
    });
  },
};
