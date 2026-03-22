/**
 * DAILY GOALS & CHALLENGES - Knowledge AIO
 * ==========================================
 *
 * Tracks daily learning goals and presents a rotating challenge:
 * - Lessons completed (target: 2)
 * - Practice sessions completed (target: 3)
 * - Words learned (target: 10)
 * - Study time in minutes (target: 15)
 *
 * Data is stored inside the progress object under `dailyGoals`.
 * Goals reset automatically on a new day.
 */

import { getToday, isSameDay } from './utils/DateUtils.js';

const DAILY_CHALLENGES = [
  'Complete a music lesson',
  'Get 5 correct in a row in practice',
  'Learn words from a new topic',
  'Practice pronunciation with TTS',
  'Complete 2 lessons without mistakes',
  'Practice listening exercises',
  'Translate 5 sentences',
  'Learn 15 new words today',
  'Complete a writing exercise',
  'Finish a matching exercise',
  'Study for 20 minutes straight',
  'Complete all practice modes once',
  'Review a completed lesson',
  'Reach a 3-day streak',
  'Earn 50 XP in one session',
];

export class DailyGoalsManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
  }

  /**
   * Initialise daily goals: reset if new day, load or create defaults
   */
  init() {
    if (!this.progressManager || !this.progressManager.data) return;

    this._ensureDailyGoals();

    const today = getToday();
    const stored = this.progressManager.data.dailyGoals;

    if (!stored.date || !isSameDay(stored.date, today)) {
      // New day — reset counts, keep targets, pick new challenge
      stored.date = today;
      stored.goals.lessonsCompleted = 0;
      stored.goals.practiceCompleted = 0;
      stored.goals.wordsLearned = 0;
      stored.goals.timeSpent = 0;
      stored.completed = false;
      stored.challengeOfTheDay = this._pickChallenge();
      this.progressManager.saveProgress();
    }
  }

  // ─── INCREMENT METHODS ────────────────────────────
  // Note: The actual data increment happens in ProgressManager.
  // These methods only check completion and re-render the widget.

  incrementLessons() {
    this._checkCompletion();
    this.renderGoalsWidget();
  }

  incrementPractice() {
    this._checkCompletion();
    this.renderGoalsWidget();
  }

  incrementWords(n = 1) {
    this._checkCompletion();
    this.renderGoalsWidget();
  }

  updateTime(minutes) {
    this._checkCompletion();
    this.renderGoalsWidget();
  }

  // ─── QUERY METHODS ───────────────────────────────

  /**
   * Return current goals state with percentages
   */
  getProgress() {
    this._ensureDailyGoals();
    const { goals, challengeOfTheDay, completed } = this.progressManager.data.dailyGoals;

    return {
      lessons: {
        current: goals.lessonsCompleted,
        target: goals.lessonsTarget,
        percent: Math.min(Math.round((goals.lessonsCompleted / goals.lessonsTarget) * 100), 100),
      },
      practice: {
        current: goals.practiceCompleted,
        target: goals.practiceTarget,
        percent: Math.min(Math.round((goals.practiceCompleted / goals.practiceTarget) * 100), 100),
      },
      words: {
        current: goals.wordsLearned,
        target: goals.wordsTarget,
        percent: Math.min(Math.round((goals.wordsLearned / goals.wordsTarget) * 100), 100),
      },
      time: {
        current: goals.timeSpent,
        target: goals.timeTarget,
        percent: Math.min(Math.round((goals.timeSpent / goals.timeTarget) * 100), 100),
      },
      challengeOfTheDay,
      completed,
    };
  }

  /**
   * True when every goal has been met
   */
  isComplete() {
    this._ensureDailyGoals();
    const { goals } = this.progressManager.data.dailyGoals;
    return (
      goals.lessonsCompleted >= goals.lessonsTarget &&
      goals.practiceCompleted >= goals.practiceTarget &&
      goals.wordsLearned >= goals.wordsTarget &&
      goals.timeSpent >= goals.timeTarget
    );
  }

  // ─── RENDERING ────────────────────────────────────

  /**
   * Render the compact daily goals card on the home page
   */
  renderGoalsWidget() {
    const container = document.getElementById('daily-goals-widget');
    if (!container) return;

    const progress = this.getProgress();

    container.innerHTML = `
      <div class="daily-goals-widget">
        <h3>Obiettivi Giornalieri / Daily Goals</h3>
        ${this._renderGoalRow('Lezioni / Lessons', progress.lessons)}
        ${this._renderGoalRow('Pratica / Practice', progress.practice)}
        ${this._renderGoalRow('Parole / Words', progress.words)}
        ${this._renderGoalRow('Tempo / Time', progress.time, 'min')}
        <div class="challenge-card">
          <span class="challenge-label">Sfida del Giorno / Challenge</span>
          <span class="challenge-text">${progress.challengeOfTheDay || '—'}</span>
        </div>
        ${progress.completed ? this._celebrationHTML() : ''}
      </div>
    `;
  }

  /**
   * Render full goals detail view (can be used in a dedicated section)
   */
  renderGoalsDetail() {
    const container = document.getElementById('daily-goals-detail');
    if (!container) return;

    const progress = this.getProgress();

    container.innerHTML = `
      <div class="daily-goals-detail">
        <header class="section-header">
          <h2>Obiettivi Giornalieri / Daily Goals</h2>
          <p class="section-subtitle">Completa tutti gli obiettivi ogni giorno! / Complete all goals every day!</p>
        </header>
        <div class="goals-detail-grid">
          ${this._renderGoalRow('Lezioni / Lessons', progress.lessons)}
          ${this._renderGoalRow('Pratica / Practice', progress.practice)}
          ${this._renderGoalRow('Parole / Words', progress.words)}
          ${this._renderGoalRow('Tempo / Time', progress.time, 'min')}
        </div>
        <div class="challenge-card">
          <span class="challenge-label">Sfida del Giorno / Challenge</span>
          <span class="challenge-text">${progress.challengeOfTheDay || '—'}</span>
        </div>
        ${progress.completed ? this._celebrationHTML() : ''}
      </div>
    `;
  }

  // ─── PRIVATE HELPERS ──────────────────────────────

  /**
   * Ensure the dailyGoals structure exists on the progress data
   */
  _ensureDailyGoals() {
    if (!this.progressManager.data.dailyGoals) {
      this.progressManager.data.dailyGoals = {
        date: '',
        goals: {
          lessonsTarget: 2,
          lessonsCompleted: 0,
          practiceTarget: 3,
          practiceCompleted: 0,
          wordsTarget: 10,
          wordsLearned: 0,
          timeTarget: 15,
          timeSpent: 0,
        },
        challengeOfTheDay: null,
        completed: false,
      };
    }
  }

  /**
   * Pick a deterministic-ish challenge based on the day
   */
  _pickChallenge() {
    const today = getToday();
    // Simple hash from date string
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = (hash * 31 + today.charCodeAt(i)) | 0;
    }
    const index = Math.abs(hash) % DAILY_CHALLENGES.length;
    return DAILY_CHALLENGES[index];
  }

  /**
   * Check if all goals are complete; if so, trigger celebration
   */
  _checkCompletion() {
    const dg = this.progressManager.data.dailyGoals;
    if (dg.completed) return; // Already celebrated

    if (this.isComplete()) {
      dg.completed = true;
      this.progressManager.addActivity('goals', 'All daily goals completed!');
      this._showCelebration();
    }
  }

  /**
   * Build HTML for a single goal row
   */
  _renderGoalRow(label, data, unit = '') {
    const isComplete = data.percent >= 100;
    return `
      <div class="goal-row ${isComplete ? 'goal-complete' : ''}">
        <div class="goal-row-header">
          <span class="goal-label">${label}</span>
          <span class="goal-count">${data.current}${unit || ''}/${data.target}${unit || ''}</span>
        </div>
        <div class="goal-progress-bar">
          <div class="goal-progress-fill" style="width: ${data.percent}%"></div>
        </div>
      </div>
    `;
  }

  /**
   * HTML banner shown when all goals are complete
   */
  _celebrationHTML() {
    return `
      <div class="goals-celebration">
        <span class="celebration-icon">&#127942;</span>
        <span class="celebration-text">Tutti gli obiettivi completati! / All goals completed!</span>
      </div>
    `;
  }

  /**
   * Show a temporary celebration banner and spawn particles
   */
  _showCelebration() {
    // Attempt to use LearnManager's particle effect if available
    if (window.learnManager && typeof window.learnManager.spawnParticles === 'function') {
      window.learnManager.spawnParticles();
    }

    // Also re-render the widget to show the banner
    this.renderGoalsWidget();
  }
}
