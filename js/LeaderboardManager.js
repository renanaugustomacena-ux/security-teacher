/**
 * LEADERBOARD MANAGER - Knowledge AIO
 * =====================================
 *
 * Personal records and self-competition leaderboard for a local-first app.
 * Tracks personal bests, weekly stats snapshots, and all-time statistics.
 *
 * Features:
 *   - Personal Bests: best daily XP, best streak, most words in a day,
 *     best practice score, fastest practice, most study time in a day
 *   - Weekly Stats: snapshots of XP, words, sessions, accuracy, study time
 *     kept for the last 12 weeks
 *   - All-time summary derived from progress data
 *   - "This Week vs Last Week" comparison cards
 */

import { getToday, getWeekStart } from './utils/DateUtils.js';

export class LeaderboardManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
  }

  /**
   * Ensure leaderboard data structure exists in progress data (migration support)
   */
  init() {
    if (!this.progressManager?.data) return;
    this._ensureData();
    this._checkWeeklySnapshot();
  }

  /**
   * Ensure the leaderboard structure exists in progress data
   */
  _ensureData() {
    if (!this.progressManager.data.leaderboard) {
      this.progressManager.data.leaderboard = {
        personalBests: {
          bestDailyXP: { value: 0, date: '' },
          bestStreak: { value: 0, date: '' },
          mostWordsInDay: { value: 0, date: '' },
          bestPracticeScore: { value: 0, date: '' },
          fastestPractice: { value: Infinity, date: '' },
          mostStudyTime: { value: 0, date: '' },
        },
        weeklySnapshots: [],
        lastWeeklySnapshot: '',
      };
    }

    // Migration: ensure all personal best keys exist
    const pb = this.progressManager.data.leaderboard.personalBests;
    const defaults = {
      bestDailyXP: { value: 0, date: '' },
      bestStreak: { value: 0, date: '' },
      mostWordsInDay: { value: 0, date: '' },
      bestPracticeScore: { value: 0, date: '' },
      fastestPractice: { value: Infinity, date: '' },
      mostStudyTime: { value: 0, date: '' },
    };
    for (const key of Object.keys(defaults)) {
      if (!pb[key]) pb[key] = defaults[key];
    }

    if (!Array.isArray(this.progressManager.data.leaderboard.weeklySnapshots)) {
      this.progressManager.data.leaderboard.weeklySnapshots = [];
    }
  }

  // ─── PERSONAL BESTS ────────────────────────────

  /**
   * Called after activities to check if any personal records have been broken.
   * Evaluates current progress data against stored personal bests.
   */
  updatePersonalBests() {
    if (!this.progressManager?.data) return;
    this._ensureData();

    const data = this.progressManager.data;
    const today = getToday();

    // Best daily XP
    data.xp = data.xp || { total: 0, today: 0, weekTotal: 0, lastResetDate: null };
    this.checkNewRecord('bestDailyXP', data.xp.today);

    // Best streak
    const currentStreak = data.streak?.current || 0;
    this.checkNewRecord('bestStreak', currentStreak);

    // Most words learned in a day
    const dailyWords = data.dailyGoals?.goals?.wordsLearned || 0;
    this.checkNewRecord('mostWordsInDay', dailyWords);

    // Most study time in a day
    const todayTime = data.todayTimeMinutes || 0;
    this.checkNewRecord('mostStudyTime', todayTime);
  }

  /**
   * Check if a value beats the current record for a category.
   * For fastestPractice, lower is better; for all others, higher is better.
   * @param {string} category - Key in personalBests
   * @param {number} value - The new value to compare
   * @returns {boolean} true if a new record was set
   */
  checkNewRecord(category, value) {
    if (!this.progressManager?.data) return false;
    this._ensureData();

    const pb = this.progressManager.data.leaderboard.personalBests;
    if (!pb[category]) return false;

    const today = getToday();
    let isNewRecord = false;

    if (category === 'fastestPractice') {
      // Lower is better; ignore Infinity or 0 values
      if (value > 0 && value < pb[category].value) {
        isNewRecord = true;
      }
    } else if (value > pb[category].value) {
      // Higher is better
      isNewRecord = true;
    }

    if (isNewRecord) {
      pb[category].value = value;
      pb[category].date = today;
      this.progressManager.saveProgress();
      this.showNewRecordToast(category, value);
      return true;
    }

    return false;
  }

  /**
   * Show a celebratory toast when a personal record is broken.
   * @param {string} category - Record category key
   * @param {number} value - The new record value
   */
  showNewRecordToast(category, value) {
    const labels = {
      bestDailyXP: 'Miglior XP Giornaliero / Best Daily XP',
      bestStreak: 'Miglior Serie / Best Streak',
      mostWordsInDay: 'Piu Parole in un Giorno / Most Words in a Day',
      bestPracticeScore: 'Miglior Punteggio / Best Practice Score',
      fastestPractice: 'Pratica piu Veloce / Fastest Practice',
      mostStudyTime: 'Piu Tempo di Studio / Most Study Time',
    };

    const formattedValue = this._formatRecordValue(category, value);
    const label = labels[category] || category;

    // Remove any existing record toast
    document.querySelector('.new-record-toast')?.remove();

    const toast = document.createElement('div');
    toast.className = 'new-record-toast';
    toast.innerHTML = `
      <span class="new-record-toast-icon">&#9733;</span>
      <div class="new-record-toast-body">
        <strong>Nuovo Record! / New Record!</strong>
        <span>${label}: ${formattedValue}</span>
      </div>
    `;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // ─── WEEKLY STATS ──────────────────────────────

  /**
   * Check if a new weekly snapshot is needed.
   * Snapshots are taken when the current week's Monday differs from the last snapshot.
   */
  _checkWeeklySnapshot() {
    if (!this.progressManager?.data) return;
    this._ensureData();

    const lb = this.progressManager.data.leaderboard;
    const today = getToday();
    const currentWeekStart = getWeekStart(today);
    const currentWeekStr = this._dateToStr(currentWeekStart);

    if (lb.lastWeeklySnapshot && lb.lastWeeklySnapshot !== currentWeekStr) {
      this.snapshotWeeklyStats();
    }

    // Always update the marker to current week
    if (lb.lastWeeklySnapshot !== currentWeekStr) {
      lb.lastWeeklySnapshot = currentWeekStr;
      this.progressManager.saveProgress();
    }
  }

  /**
   * Take a snapshot of the previous week's stats and store it.
   * Keeps only the last 12 weeks.
   */
  snapshotWeeklyStats() {
    if (!this.progressManager?.data) return;
    this._ensureData();

    const data = this.progressManager.data;
    const lb = data.leaderboard;

    // Calculate the previous week's date range
    const today = getToday();
    const thisWeekStart = getWeekStart(today);
    const prevWeekStart = new Date(thisWeekStart);
    prevWeekStart.setDate(prevWeekStart.getDate() - 7);

    const snapshot = {
      weekStart: this._dateToStr(prevWeekStart),
      xpEarned: data.xp?.weekTotal || 0,
      wordsLearned: data.dailyGoals?.goals?.wordsLearned || 0,
      practiceSessions: data.practiceSessionsCompleted || 0,
      accuracy: this._calculateAccuracy(data),
      studyTime: data.todayTimeMinutes || 0,
    };

    lb.weeklySnapshots.push(snapshot);

    // Keep only last 12 weeks
    if (lb.weeklySnapshots.length > 12) {
      lb.weeklySnapshots = lb.weeklySnapshots.slice(-12);
    }

    // Reset weekly XP counter
    if (data.xp) {
      data.xp.weekTotal = 0;
    }

    this.progressManager.saveProgress();
  }

  /**
   * Returns the last 12 weeks of weekly data.
   * @returns {Array} Weekly snapshot objects
   */
  getWeeklyData() {
    this._ensureData();
    return this.progressManager.data.leaderboard.weeklySnapshots.slice(-12);
  }

  // ─── RENDER ────────────────────────────────────

  /**
   * Render the full leaderboard section into #leaderboard-content.
   */
  renderLeaderboard() {
    const container = document.getElementById('leaderboard-content');
    if (!container || !this.progressManager?.data) return;

    this._ensureData();
    this.updatePersonalBests();

    const pb = this.progressManager.data.leaderboard.personalBests;
    const weeklyData = this.getWeeklyData();
    const allTime = this._getAllTimeStats();
    const comparison = this._getWeekComparison();

    container.innerHTML = `
      <div class="leaderboard-section">
        ${this._renderPersonalBests(pb)}
        ${this._renderWeeklyChart(weeklyData)}
        ${this._renderAllTimeStats(allTime)}
        ${this._renderComparison(comparison)}
      </div>
    `;
  }

  /**
   * Render personal bests grid
   */
  _renderPersonalBests(pb) {
    const records = [
      {
        key: 'bestDailyXP',
        icon: '&#9889;',
        label: 'Miglior XP Giornaliero / Best Daily XP',
        value: pb.bestDailyXP.value,
        date: pb.bestDailyXP.date,
      },
      {
        key: 'bestStreak',
        icon: '&#128293;',
        label: 'Miglior Serie / Best Streak',
        value: pb.bestStreak.value,
        date: pb.bestStreak.date,
        suffix: ' giorni / days',
      },
      {
        key: 'mostWordsInDay',
        icon: '&#128218;',
        label: 'Parole in un Giorno / Words in a Day',
        value: pb.mostWordsInDay.value,
        date: pb.mostWordsInDay.date,
      },
      {
        key: 'bestPracticeScore',
        icon: '&#127942;',
        label: 'Miglior Punteggio / Best Score',
        value: pb.bestPracticeScore.value,
        date: pb.bestPracticeScore.date,
        suffix: '%',
      },
      {
        key: 'fastestPractice',
        icon: '&#9201;',
        label: 'Pratica Veloce / Fastest Practice',
        value: pb.fastestPractice.value === Infinity ? 0 : pb.fastestPractice.value,
        date: pb.fastestPractice.date,
        suffix: 's',
      },
      {
        key: 'mostStudyTime',
        icon: '&#128337;',
        label: 'Tempo di Studio / Study Time',
        value: pb.mostStudyTime.value,
        date: pb.mostStudyTime.date,
        suffix: ' min',
      },
    ];

    const cards = records
      .map(
        (r) => `
      <div class="record-card">
        <span class="record-icon">${r.icon}</span>
        <span class="record-value">${this._formatRecordValue(r.key, r.value)}</span>
        <span class="record-label">${r.label}</span>
        <span class="record-date">${r.date ? this._formatDate(r.date) : '---'}</span>
      </div>
    `
      )
      .join('');

    return `
      <h3 class="leaderboard-heading">Record Personali / Personal Bests</h3>
      <div class="personal-bests-grid">${cards}</div>
    `;
  }

  /**
   * Render weekly performance chart (horizontal bar chart with pure CSS)
   */
  _renderWeeklyChart(weeklyData) {
    if (!weeklyData || weeklyData.length === 0) {
      return `
        <h3 class="leaderboard-heading">Andamento Settimanale / Weekly Performance</h3>
        <div class="weekly-chart">
          <p class="chart-empty">Nessun dato settimanale ancora. / No weekly data yet.</p>
        </div>
      `;
    }

    const maxXP = Math.max(...weeklyData.map((w) => w.xpEarned || 0), 1);

    const rows = weeklyData
      .map((w) => {
        const pct = Math.round(((w.xpEarned || 0) / maxXP) * 100);
        const weekLabel = this._formatWeekLabel(w.weekStart);
        return `
        <div class="chart-bar-row">
          <span class="chart-bar-label">${weekLabel}</span>
          <div class="chart-bar-track">
            <div class="chart-bar" style="width: ${pct}%"></div>
          </div>
          <span class="chart-bar-value">${w.xpEarned || 0} XP</span>
        </div>
      `;
      })
      .join('');

    return `
      <h3 class="leaderboard-heading">Andamento Settimanale / Weekly Performance</h3>
      <div class="weekly-chart">${rows}</div>
    `;
  }

  /**
   * Render all-time statistics summary
   */
  _renderAllTimeStats(stats) {
    return `
      <h3 class="leaderboard-heading">Statistiche Totali / All-Time Stats</h3>
      <div class="alltime-stats">
        <div class="alltime-stat-item">
          <span class="alltime-stat-value">${stats.totalXP}</span>
          <span class="alltime-stat-label">XP Totali / Total XP</span>
        </div>
        <div class="alltime-stat-item">
          <span class="alltime-stat-value">${stats.totalWords}</span>
          <span class="alltime-stat-label">Parole / Words</span>
        </div>
        <div class="alltime-stat-item">
          <span class="alltime-stat-value">${this._formatMinutes(stats.totalTime)}</span>
          <span class="alltime-stat-label">Tempo Totale / Total Time</span>
        </div>
        <div class="alltime-stat-item">
          <span class="alltime-stat-value">${stats.accuracy}%</span>
          <span class="alltime-stat-label">Precisione / Accuracy</span>
        </div>
        <div class="alltime-stat-item">
          <span class="alltime-stat-value">${stats.sessions}</span>
          <span class="alltime-stat-label">Sessioni / Sessions</span>
        </div>
      </div>
    `;
  }

  /**
   * Render "This Week vs Last Week" comparison cards
   */
  _renderComparison(comparison) {
    if (!comparison) {
      return `
        <h3 class="leaderboard-heading">Confronto Settimane / Weekly Comparison</h3>
        <div class="comparison-cards">
          <p class="chart-empty">Non abbastanza dati. / Not enough data yet.</p>
        </div>
      `;
    }

    const items = [
      { label: 'XP', thisWeek: comparison.thisWeek.xp, lastWeek: comparison.lastWeek.xp },
      {
        label: 'Parole / Words',
        thisWeek: comparison.thisWeek.words,
        lastWeek: comparison.lastWeek.words,
      },
      {
        label: 'Sessioni / Sessions',
        thisWeek: comparison.thisWeek.sessions,
        lastWeek: comparison.lastWeek.sessions,
      },
      {
        label: 'Precisione / Accuracy',
        thisWeek: comparison.thisWeek.accuracy,
        lastWeek: comparison.lastWeek.accuracy,
        suffix: '%',
      },
    ];

    const cards = items
      .map((item) => {
        const diff = item.thisWeek - item.lastWeek;
        const arrowClass = diff > 0 ? 'up' : diff < 0 ? 'down' : 'neutral';
        const arrowSymbol = diff > 0 ? '&#9650;' : diff < 0 ? '&#9660;' : '&#9644;';
        const suffix = item.suffix || '';

        return `
        <div class="comparison-card">
          <span class="comparison-label">${item.label}</span>
          <div class="comparison-values">
            <span class="comparison-this-week">${item.thisWeek}${suffix}</span>
            <span class="comparison-arrow ${arrowClass}">${arrowSymbol}</span>
          </div>
          <span class="comparison-last-week">Settimana scorsa / Last week: ${item.lastWeek}${suffix}</span>
        </div>
      `;
      })
      .join('');

    return `
      <h3 class="leaderboard-heading">Questa vs Scorsa Settimana / This vs Last Week</h3>
      <div class="comparison-cards">${cards}</div>
    `;
  }

  // ─── DATA HELPERS ──────────────────────────────

  /**
   * Get all-time statistics derived from progress data
   */
  _getAllTimeStats() {
    const data = this.progressManager.data;
    return {
      totalXP: data.xp?.total || 0,
      totalWords: data.wordsLearned || 0,
      totalTime: data.totalTimeMinutes || 0,
      accuracy: this._calculateAccuracy(data),
      sessions: data.practiceSessionsCompleted || 0,
    };
  }

  /**
   * Get comparison between this week and last week
   */
  _getWeekComparison() {
    const data = this.progressManager.data;
    const weeklyData = this.getWeeklyData();

    // Current week stats (live)
    const thisWeek = {
      xp: data.xp?.weekTotal || 0,
      words: data.dailyGoals?.goals?.wordsLearned || 0,
      sessions: data.practiceSessionsCompleted || 0,
      accuracy: this._calculateAccuracy(data),
    };

    // Last week from snapshot
    if (weeklyData.length === 0) return null;

    const lastSnapshot = weeklyData[weeklyData.length - 1];
    const lastWeek = {
      xp: lastSnapshot.xpEarned || 0,
      words: lastSnapshot.wordsLearned || 0,
      sessions: lastSnapshot.practiceSessions || 0,
      accuracy: lastSnapshot.accuracy || 0,
    };

    return { thisWeek, lastWeek };
  }

  /**
   * Calculate accuracy percentage from quiz stats
   */
  _calculateAccuracy(data) {
    const total = data.quizStats?.totalQuestions || 0;
    const correct = data.quizStats?.correctAnswers || 0;
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
  }

  // ─── FORMAT HELPERS ────────────────────────────

  /**
   * Format a record value for display
   */
  _formatRecordValue(category, value) {
    if (value === Infinity || value === null || value === undefined) return '---';

    switch (category) {
      case 'bestDailyXP':
        return `${value} XP`;
      case 'bestStreak':
        return `${value} giorni`;
      case 'mostWordsInDay':
        return `${value}`;
      case 'bestPracticeScore':
        return `${value}%`;
      case 'fastestPractice':
        return value > 0 ? `${value.toFixed(1)}s` : '---';
      case 'mostStudyTime':
        return `${value} min`;
      default:
        return `${value}`;
    }
  }

  /**
   * Format a YYYY-MM-DD date string for display
   */
  _formatDate(dateStr) {
    if (!dateStr) return '---';
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  }

  /**
   * Format a week start date into a short label
   */
  _formatWeekLabel(dateStr) {
    if (!dateStr) return '---';
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
    } catch {
      return dateStr;
    }
  }

  /**
   * Format minutes into "Xh Ym" format
   */
  _formatMinutes(minutes) {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  /**
   * Convert a Date object to YYYY-MM-DD string
   */
  _dateToStr(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}
