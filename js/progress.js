/**
 * PROGRESS MODULE - FlowLearn
 * ===========================
 *
 * Tracks and persists learning progress:
 * - Parole imparate / Words learned
 * - Canzoni completate / Songs completed
 * - Study streak / Giorni consecutivi
 * - Attività recenti / Recent activities
 */

import { getLessonsByLevel } from './lessons.js';
import { storageService } from './services/StorageService.js';
import { getToday, getDaysBetween } from './utils/DateUtils.js';

export class ProgressManager {
  constructor() {
    this.storageKey = 'flowlearn_progress';
    this.data = null;
    this.startTime = Date.now();
  }

  async init() {
    this.data = await this.loadProgress();
    this.updateStreak();
    this.renderProgress();
    this.startTimeTracking();

    // Legacy global for backward compatibility if needed
    window.progressManager = this;
  }

  /**
   * Load progress from StorageService (IndexedDB/LocalStorage)
   */
  async loadProgress() {
    try {
      const saved = await storageService.load('progress', 'user_default');
      if (saved) {
        return this._sanitizeLoadedProgress(saved);
      }

      // Fallback to localStorage for migration
      const localSaved = localStorage.getItem(this.storageKey);
      if (localSaved) {
        try {
          const parsed = JSON.parse(localSaved);
          return this._sanitizeLoadedProgress(parsed);
        } catch (parseErr) {
          console.warn('Corrupt localStorage progress blob, discarding:', parseErr);
          localStorage.removeItem(this.storageKey);
        }
      }
    } catch (e) {
      console.error('Error loading progress:', e);
    }

    // Default progress structure
    return {
      userId: 'user_default', // Key for IndexedDB
      wordsLearned: 0,
      songsCompleted: 0,
      lessonsCompleted: 0,
      currentLevel: 0,
      levelProgress: 10,
      completedLessons: {}, // { "0-alphabet": true, "0-numbers": true, ... }
      unlockedLevels: [0, 1, 2, 3, 4], // Array of unlocked level numbers
      quizStats: {
        totalQuestions: 0,
        correctAnswers: 0,
      },
      streak: {
        current: 0,
        lastStudyDate: null,
      },
      activities: [],
      totalTimeMinutes: 0,
      todayTimeMinutes: 0,
      lastActiveDate: null,
      topicProgress: {},
      xp: {
        total: 0,
        today: 0,
        weekTotal: 0,
        lastResetDate: null,
      },
      practiceSessionsCompleted: 0,
      perfectScoreAchieved: false,
      terminalExercisesCompleted: 0,
      bestChainStreak: 0,
      pronunciationStats: {
        totalAttempts: 0,
        avgScore: 0,
        sessionsCompleted: 0,
      },
      conversationStats: {
        sessionsCompleted: 0,
        messagesExchanged: 0,
        correctionsReceived: 0,
      },
      achievements: { unlocked: {} },
      leaderboard: {
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
      },
      streakCalendar: {
        studyDays: {},
        freezes: { available: 1, usedThisWeek: [], lastRefill: '' },
        bestStreak: 0,
      },
      dailyGoals: {
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
      },
    };
  }

  _clampNumber(value, min, max, fallback = 0) {
    if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  /**
   * Defensive sanitizer applied to any progress blob read from IDB or
   * localStorage. Clamps the handful of numeric fields that feed into
   * achievements, streaks and the leaderboard so that a corrupted or
   * tampered blob cannot propagate absurd values through the UI.
   * Non-numeric fields pass through unchanged.
   */
  _sanitizeLoadedProgress(data) {
    if (!data || typeof data !== 'object') return data;
    const safe = { ...data };

    safe.wordsLearned = this._clampNumber(safe.wordsLearned, 0, 1_000_000);
    safe.songsCompleted = this._clampNumber(safe.songsCompleted, 0, 100_000);
    safe.lessonsCompleted = this._clampNumber(safe.lessonsCompleted, 0, 100_000);
    safe.currentLevel = this._clampNumber(safe.currentLevel, 0, 99);
    safe.levelProgress = this._clampNumber(safe.levelProgress, 0, 1000);
    safe.totalTimeMinutes = this._clampNumber(safe.totalTimeMinutes, 0, 10_000_000);
    safe.todayTimeMinutes = this._clampNumber(safe.todayTimeMinutes, 0, 1440);
    safe.practiceSessionsCompleted = this._clampNumber(safe.practiceSessionsCompleted, 0, 1_000_000);
    safe.terminalExercisesCompleted = this._clampNumber(safe.terminalExercisesCompleted, 0, 1_000_000);
    safe.bestChainStreak = this._clampNumber(safe.bestChainStreak, 0, 100_000);

    if (safe.xp && typeof safe.xp === 'object') {
      safe.xp = {
        ...safe.xp,
        total: this._clampNumber(safe.xp.total, 0, 100_000_000),
        today: this._clampNumber(safe.xp.today, 0, 100_000),
        weekTotal: this._clampNumber(safe.xp.weekTotal, 0, 700_000),
      };
    }

    if (safe.streak && typeof safe.streak === 'object') {
      safe.streak = {
        ...safe.streak,
        current: this._clampNumber(safe.streak.current, 0, 3650),
      };
    }

    return safe;
  }

  /**
   * Save progress
   */
  async saveProgress() {
    try {
      if (!this.data) return;
      // Save to IndexedDB via Service
      await storageService.save('progress', this.data);
      // Backup to localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.error('Error saving progress:', e);
    }

    // Trigger achievement check after every save
    this._triggerAchievementCheck();
  }

  /**
   * Trigger achievement check via the app-level manager
   */
  _triggerAchievementCheck() {
    try {
      window.app?.achievementManager?.checkAll();
    } catch {
      // Achievement check is non-critical
    }
  }

  /**
   * Check if a badge is unlocked
   */
  isBadgeUnlocked(badgeId) {
    return !!this.data?.achievements?.unlocked?.[badgeId];
  }

  /**
   * Record a completed practice session and check for perfect score
   */
  recordPracticeSession(score, total) {
    if (!this.data) return;

    // Ensure field exists (migration support)
    if (typeof this.data.practiceSessionsCompleted !== 'number') {
      this.data.practiceSessionsCompleted = 0;
    }

    this.data.practiceSessionsCompleted++;

    // Check for perfect score (10/10)
    if (score === total && total >= 10) {
      this.data.perfectScoreAchieved = true;
    }

    this.saveProgress();
  }

  /**
   * Update pronunciation practice stats
   * @param {number} score - Session average score (0-100)
   */
  updatePronunciationStats(score) {
    if (!this.data) return;

    // Ensure structure exists (migration support)
    if (!this.data.pronunciationStats) {
      this.data.pronunciationStats = {
        totalAttempts: 0,
        avgScore: 0,
        sessionsCompleted: 0,
      };
    }

    const stats = this.data.pronunciationStats;
    const prevTotal = stats.avgScore * stats.sessionsCompleted;
    stats.sessionsCompleted++;
    stats.totalAttempts++;
    stats.avgScore = Math.round((prevTotal + score) / stats.sessionsCompleted);

    this.saveProgress();
  }

  /**
   * Update conversation practice stats
   * @param {number} messages - Number of user messages exchanged
   * @param {number} corrections - Number of grammar corrections received
   */
  updateConversationStats(messages, corrections) {
    if (!this.data) return;

    // Ensure structure exists (migration support)
    if (!this.data.conversationStats) {
      this.data.conversationStats = {
        sessionsCompleted: 0,
        messagesExchanged: 0,
        correctionsReceived: 0,
      };
    }

    const stats = this.data.conversationStats;
    stats.sessionsCompleted++;
    stats.messagesExchanged += messages;
    stats.correctionsReceived += corrections;

    this.saveProgress();
  }

  /**
   * Increment word count
   */
  incrementWordCount() {
    this.data.wordsLearned++;
    this.updateLevelProgress();
    this.saveProgress();
    this.renderProgress();
  }

  /**
   * Increment song count
   */
  incrementSongCount() {
    this.data.songsCompleted++;
    this.updateLevelProgress();
    this.saveProgress();
    this.renderProgress();
  }

  /**
   * Mark a song as completed (called from MusicManager)
   */
  completeSong(songTitle) {
    this.incrementSongCount();
    this.addActivity('music', `Completata canzone: ${songTitle}`);
  }

  /**
   * Mark a lesson as completed
   */
  completelesson(level, lessonId) {
    const key = `${level}-${lessonId}`;
    if (!this.data.completedLessons) {
      this.data.completedLessons = {};
    }
    this.data.completedLessons[key] = true;
    this.data.lessonsCompleted++;
    this.addActivity('learn', `Completato: ${lessonId}`);
    this.saveProgress();
  }

  /**
   * Check if a lesson is completed
   */
  isLessonCompleted(level, lessonId) {
    const key = `${level}-${lessonId}`;
    return this.data.completedLessons && this.data.completedLessons[key] === true;
  }

  /**
   * Check if all lessons in a level are complete
   */
  isLevelComplete(level) {
    // getLessonsByLevel is imported from lessons.js
    const levelData = getLessonsByLevel(level);
    if (!levelData) return false;

    return levelData.lessons.every((lesson) => this.isLessonCompleted(level, lesson.id));
  }

  /**
   * Unlock a level
   */
  unlockLevel(level) {
    if (!this.data.unlockedLevels) {
      this.data.unlockedLevels = [0];
    }
    if (!this.data.unlockedLevels.includes(level)) {
      this.data.unlockedLevels.push(level);
      this.addActivity('level', `🔓 Sbloccato Livello ${level}!`);
    }
    this.saveProgress();
  }

  /**
   * Check if a level is unlocked
   */
  isLevelUnlocked(level) {
    if (level === 0) return true;
    if (!this.data.unlockedLevels) {
      this.data.unlockedLevels = [0];
    }
    return this.data.unlockedLevels.includes(level);
  }

  /**
   * Update level progress based on activities
   */
  updateLevelProgress() {
    // Calculate progress based on words and songs
    const wordProgress = Math.min(this.data.wordsLearned * 2, 50);
    const songProgress = Math.min(this.data.songsCompleted * 10, 50);
    this.data.levelProgress = Math.min(wordProgress + songProgress, 100);

    // Level up if progress is 100%
    if (this.data.levelProgress >= 100 && this.data.currentLevel < 3) {
      this.data.currentLevel++;
      this.data.levelProgress = 0;
      this.addActivity('level', `🎉 Level up! Now Level ${this.data.currentLevel}`);
    }
  }

  /**
   * Ensure streakCalendar structure exists (migration support)
   */
  _ensureStreakCalendar() {
    if (!this.data.streakCalendar) {
      this.data.streakCalendar = {
        studyDays: {},
        freezes: { available: 1, usedThisWeek: [], lastRefill: '' },
        bestStreak: 0,
      };
    }
    const sc = this.data.streakCalendar;
    if (!sc.studyDays) sc.studyDays = {};
    if (!sc.freezes) sc.freezes = { available: 1, usedThisWeek: [], lastRefill: '' };
    if (typeof sc.bestStreak !== 'number') sc.bestStreak = 0;
  }

  /**
   * Update study streak with freeze support
   */
  updateStreak() {
    if (!this.data) return;
    const today = new Date().toDateString();
    const lastDate = this.data.streak.lastStudyDate;

    // Reset daily time if new day
    if (this.data.lastActiveDate !== today) {
      this.data.todayTimeMinutes = 0;
      this.data.lastActiveDate = today;
    }

    this._ensureStreakCalendar();

    if (!lastDate) {
      this.data.streak.current = 1;
      this.data.streak.lastStudyDate = today;
    } else if (lastDate === today) {
      // Already studied today
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastDate === yesterday.toDateString()) {
        this.data.streak.current++;
        this.data.streak.lastStudyDate = today;
      } else {
        // Check if exactly 1 day was missed and freeze is available
        const todayISO = getToday();
        const lastDateObj = new Date(lastDate);
        const lastDateISO = `${lastDateObj.getFullYear()}-${String(lastDateObj.getMonth() + 1).padStart(2, '0')}-${String(lastDateObj.getDate()).padStart(2, '0')}`;
        const gap = getDaysBetween(todayISO, lastDateISO);

        if (gap === 2 && this._tryUseFreeze(todayISO, lastDateISO)) {
          // Freeze consumed: keep the streak alive
          this.data.streak.current++;
          this.data.streak.lastStudyDate = today;
        } else {
          // Streak broken
          this.data.streak.current = 1;
          this.data.streak.lastStudyDate = today;
        }
      }
    }

    // Update best streak
    if (this.data.streak.current > this.data.streakCalendar.bestStreak) {
      this.data.streakCalendar.bestStreak = this.data.streak.current;
    }

    this.saveProgress();
  }

  /**
   * Try to use a streak freeze for the missed day.
   * @param {string} todayISO - Today's date in YYYY-MM-DD format
   * @param {string} lastDateISO - Last study date in YYYY-MM-DD format
   * @returns {boolean} true if freeze was consumed
   */
  _tryUseFreeze(todayISO, lastDateISO) {
    const sc = this.data.streakCalendar;

    if (sc.freezes.available <= 0) return false;

    // Calculate the missed date (the day between last study and today)
    const lastDate = new Date(lastDateISO + 'T00:00:00');
    const missedDate = new Date(lastDate);
    missedDate.setDate(missedDate.getDate() + 1);
    const missedDateStr = `${missedDate.getFullYear()}-${String(missedDate.getMonth() + 1).padStart(2, '0')}-${String(missedDate.getDate()).padStart(2, '0')}`;

    sc.freezes.available--;
    sc.freezes.usedThisWeek.push(missedDateStr);

    // Mark the frozen day in studyDays
    if (!sc.studyDays[missedDateStr]) {
      sc.studyDays[missedDateStr] = { minutes: 0, activities: 0 };
    }
    sc.studyDays[missedDateStr].frozen = true;

    return true;
  }

  /**
   * Record today's study activity in streakCalendar.studyDays
   * @param {number} minutes - Minutes to add
   * @param {number} activities - Activities count to add
   */
  recordStudyActivity(minutes = 1, activities = 0) {
    if (!this.data) return;
    this._ensureStreakCalendar();

    const today = getToday();
    const sc = this.data.streakCalendar;

    if (!sc.studyDays[today]) {
      sc.studyDays[today] = { minutes: 0, activities: 0 };
    }

    sc.studyDays[today].minutes += minutes;
    sc.studyDays[today].activities += activities;

    this.saveProgress();
  }

  /**
   * Add activity to log
   */
  addActivity(type, description) {
    if (!this.data) return;
    const activity = {
      type,
      description,
      timestamp: new Date().toISOString(),
    };

    this.data.activities.unshift(activity);

    // Keep only last 20 activities
    if (this.data.activities.length > 20) {
      this.data.activities = this.data.activities.slice(0, 20);
    }

    this.saveProgress();
    this.renderActivities();
  }

  /**
   * Start time tracking
   */
  startTimeTracking() {
    if (this._timeTrackingInterval) {
      clearInterval(this._timeTrackingInterval);
    }

    this._timeTrackingInterval = setInterval(() => {
      if (!this.data || document.hidden) return;
      this.data.todayTimeMinutes++;
      this.data.totalTimeMinutes++;
      this.recordStudyActivity(1, 0);
      this.saveProgress();
      this.renderTimeSpent();
    }, 60000);

    window.addEventListener(
      'beforeunload',
      () => {
        if (this._timeTrackingInterval) clearInterval(this._timeTrackingInterval);
      },
      { once: true }
    );
  }

  /**
   * Render all progress UI
   */
  renderProgress() {
    if (!this.data) return;
    // Total words
    const wordsEl = document.getElementById('total-words');
    if (wordsEl) wordsEl.textContent = this.data.wordsLearned;

    // Songs completed
    const songsEl = document.getElementById('songs-completed');
    if (songsEl) songsEl.textContent = this.data.songsCompleted;

    // Streak
    const streakEl = document.getElementById('streak-days');
    if (streakEl) streakEl.textContent = this.data.streak.current;

    // Time spent
    this.renderTimeSpent();

    // Level progress
    const levelProgressEl = document.getElementById('level-progress');
    const levelPercentEl = document.getElementById('level-percent');

    if (levelProgressEl) {
      levelProgressEl.style.width = `${this.data.levelProgress}%`;
    }
    if (levelPercentEl) {
      levelPercentEl.textContent = `${this.data.levelProgress}%`;
    }

    // Update sidebar level badge
    const levelBadge = document.querySelector('.user-level .level-badge');
    if (levelBadge) {
      levelBadge.textContent = `Livello ${this.data.currentLevel}`;
    }

    // XP
    this.renderXP();

    // Activities
    this.renderActivities();
  }

  /**
   * Render time spent
   */
  renderTimeSpent() {
    if (!this.data) return;
    const timeEl = document.getElementById('total-time');
    if (timeEl) {
      const minutes = this.data.todayTimeMinutes;
      if (minutes < 60) {
        timeEl.textContent = `${minutes}m`;
      } else {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        timeEl.textContent = `${hours}h ${mins}m`;
      }
    }
  }

  /**
   * Render recent activities
   */
  renderActivities() {
    if (!this.data) return;
    const container = document.getElementById('activity-list');
    if (!container) return;

    if (this.data.activities.length === 0) {
      container.innerHTML = `
                <li class="activity-item">
                    <span class="activity-icon"></span>
                    <span class="activity-text">Inizia a imparare per vedere le attività! / Start learning to see activities!</span>
                </li>
            `;
      return;
    }

    container.innerHTML = '';

    const recent = this.data.activities.slice(0, 5);
    recent.forEach((activity) => {
      const icon = this.getActivityIcon(activity.type);
      const time = this.formatTimeAgo(activity.timestamp);

      const item = document.createElement('li');
      item.className = 'activity-item';
      item.innerHTML = `
                <span class="activity-icon">${icon}</span>
                <span class="activity-text">${activity.description}</span>
                <span style="margin-left: auto; color: var(--text-muted); font-size: 0.8rem;">${time}</span>
            `;
      container.appendChild(item);
    });
  }

  /**
   * Get icon for activity type
   */
  getActivityIcon(type) {
    const icons = {
      learn: '',
      music: '',
      practice: '',
      level: '',
      streak: '',
    };
    return icons[type] || '';
  }

  /**
   * Format timestamp as "time ago"
   */
  formatTimeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Ora / Now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m fa / ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h fa / ago`;
    return `${Math.floor(seconds / 86400)}d fa / ago`;
  }

  /**
   * Reset progress (for testing)
   */
  async resetProgress() {
    localStorage.removeItem(this.storageKey);
    this.data = await this.loadProgress(); // Reload default
    this.renderProgress();
  }

  // ─── LEADERBOARD METHODS ─────────────────────────

  /**
   * Trigger leaderboard personal bests update via the app-level manager
   */
  updateLeaderboardBests() {
    try {
      window.app?.leaderboardManager?.updatePersonalBests();
    } catch {
      // Leaderboard update is non-critical
    }
  }

  /**
   * Trigger weekly stats snapshot via the app-level leaderboard manager
   */
  snapshotWeeklyStats() {
    try {
      window.app?.leaderboardManager?.snapshotWeeklyStats();
    } catch {
      // Weekly snapshot is non-critical
    }
  }

  // ─── XP METHODS ────────────────────────────────

  /**
   * Ensure XP structure exists (migration support)
   */
  ensureXP() {
    if (!this.data.xp) {
      this.data.xp = { total: 0, today: 0, weekTotal: 0, lastResetDate: null };
    }
  }

  /**
   * Add XP and handle daily reset
   * @param {number} amount - XP to add
   */
  addXP(amount) {
    if (!this.data || amount <= 0) return;
    this.ensureXP();

    const today = new Date().toDateString();
    if (this.data.xp.lastResetDate !== today) {
      this.data.xp.today = 0;
      this.data.xp.lastResetDate = today;
    }

    this.data.xp.total += amount;
    this.data.xp.today += amount;
    this.data.xp.weekTotal += amount;

    this.saveProgress();
    this.renderXP();
  }

  /**
   * Get current XP totals
   */
  getXP() {
    this.ensureXP();
    return { ...this.data.xp };
  }

  /**
   * Render XP in the progress section
   */
  renderXP() {
    if (!this.data) return;
    this.ensureXP();

    const xpEl = document.getElementById('total-xp');
    if (xpEl) xpEl.textContent = this.data.xp.total;

    const xpTodayEl = document.getElementById('today-xp');
    if (xpTodayEl) xpTodayEl.textContent = this.data.xp.today;
  }

  // ─── TOPIC PROGRESS METHODS ────────────────────

  /**
   * Ensure topicProgress structure exists for a topic
   */
  ensureTopicProgress(topicId) {
    if (!this.data.topicProgress) {
      this.data.topicProgress = {};
    }
    if (!this.data.topicProgress[topicId]) {
      this.data.topicProgress[topicId] = {
        completedLessons: {},
        completedLevels: [],
        unlockedLevels: [0],
        wordsLearned: 0,
        lastActiveLevel: 0,
        practiceStats: { totalQuestions: 0, correctAnswers: 0 },
        lessonStars: {},
        bossResults: {},
      };
    }
    // Migration: ensure lessonStars and bossResults exist for older data
    const tp = this.data.topicProgress[topicId];
    if (!tp.lessonStars) tp.lessonStars = {};
    if (!tp.bossResults) tp.bossResults = {};
    return this.data.topicProgress[topicId];
  }

  /**
   * Mark a topic lesson as completed
   */
  completeTopicLesson(topicId, level, lessonId) {
    const tp = this.ensureTopicProgress(topicId);
    const key = `${level}-${lessonId}`;

    if (tp.completedLessons[key]) return; // Already completed

    tp.completedLessons[key] = true;
    tp.lastActiveLevel = level;
    this.addActivity('topic', `\u2705 ${topicId}: completata lezione "${lessonId}" (Lv.${level})`);
    this.checkTopicLevelCompletion(topicId, level);
    this.saveProgress();
    this.renderProgress();
  }

  /**
   * Check if a topic lesson is completed
   */
  isTopicLessonCompleted(topicId, level, lessonId) {
    const tp = this.data.topicProgress?.[topicId];
    if (!tp) return false;
    return tp.completedLessons[`${level}-${lessonId}`] === true;
  }

  /**
   * Check if all lessons in a topic level are complete, unlock next level
   */
  async checkTopicLevelCompletion(topicId, level) {
    const tp = this.ensureTopicProgress(topicId);

    // Load topic data to check all lessons
    let topicData = null;
    if (window.topicManager && window.topicManager.dataCache[topicId]) {
      topicData = window.topicManager.dataCache[topicId];
    } else {
      try {
        const module = await import(`./topics/data/${topicId}.js`);
        topicData = module.default;
      } catch (e) {
        return;
      }
    }

    if (!topicData || !topicData.levels[level]) return;

    const levelData = topicData.levels[level];
    const allComplete = levelData.lessons.every(
      (lesson) => tp.completedLessons[`${level}-${lesson.id}`] === true
    );

    if (allComplete) {
      // Mark level as completed
      if (!tp.completedLevels.includes(level)) {
        tp.completedLevels.push(level);
        tp.completedLevels.sort((a, b) => a - b);
        this.addActivity('topic', `\u{1F3C6} ${topicId}: Livello ${level} completato!`);
      }

      // Unlock next level
      const nextLevel = level + 1;
      if (!tp.unlockedLevels.includes(nextLevel) && topicData.levels[nextLevel]) {
        tp.unlockedLevels.push(nextLevel);
        tp.unlockedLevels.sort((a, b) => a - b);
        this.addActivity('topic', `\u{1F513} ${topicId}: Livello ${nextLevel} sbloccato!`);
      }

      this.saveProgress();
    }
  }

  /**
   * Check if a topic level is unlocked
   */
  isTopicLevelUnlocked(topicId, level) {
    if (level === 0) return true;
    const tp = this.data.topicProgress?.[topicId];
    if (!tp) return level === 0;
    return tp.unlockedLevels.includes(level);
  }

  /**
   * Get topic stats
   */
  getTopicStats(topicId) {
    return this.data.topicProgress?.[topicId] || null;
  }

  /**
   * Increment topic word count
   */
  incrementTopicWord(topicId) {
    const tp = this.ensureTopicProgress(topicId);
    tp.wordsLearned++;
    this.data.wordsLearned++;
    this.saveProgress();
    this.renderProgress();
  }

  /**
   * Update topic practice stats
   */
  updateTopicPracticeStats(topicId, totalQuestions, correctAnswers) {
    const tp = this.ensureTopicProgress(topicId);
    tp.practiceStats.totalQuestions += totalQuestions;
    tp.practiceStats.correctAnswers += correctAnswers;
    this.saveProgress();
  }

  // ─── TOPIC LESSON STARS METHODS ──────────────────

  /**
   * Update stars for a specific topic lesson (0-3)
   * Only saves if the new score is higher than the existing one.
   */
  updateTopicLessonStars(topicId, level, lessonId, stars) {
    const tp = this.ensureTopicProgress(topicId);
    const key = `${level}-${lessonId}`;
    const current = tp.lessonStars[key] || 0;
    if (stars > current) {
      tp.lessonStars[key] = Math.min(3, Math.max(0, stars));
      this.saveProgress();
    }
  }

  /**
   * Get stars for a specific topic lesson (returns 0-3)
   */
  getTopicLessonStars(topicId, level, lessonId) {
    const tp = this.data.topicProgress?.[topicId];
    if (!tp || !tp.lessonStars) return 0;
    const key = `${level}-${lessonId}`;
    return tp.lessonStars[key] || 0;
  }

  /**
   * Get aggregated stars for all lessons in a topic level (average, rounded)
   */
  getTopicLevelStars(topicId, level) {
    const tp = this.data.topicProgress?.[topicId];
    if (!tp || !tp.lessonStars) return 0;

    const prefix = `${level}-`;
    const entries = Object.entries(tp.lessonStars).filter(([key]) => key.startsWith(prefix));

    if (entries.length === 0) return 0;

    const total = entries.reduce((sum, [, stars]) => sum + stars, 0);
    return Math.round(total / entries.length);
  }

  // ─── TOPIC BOSS METHODS ────────────────────────────

  /**
   * Record boss challenge completion
   * @param {string} topicId
   * @param {number} level
   * @param {number} score - Percentage score (0-100)
   * @param {number} stars - Star rating (0-3)
   */
  completeTopicBoss(topicId, level, score, stars) {
    if (!this.data) return;
    const tp = this.ensureTopicProgress(topicId);
    if (!tp.bossResults) tp.bossResults = {};
    tp.bossResults[level] = {
      completed: score >= 70,
      score,
      stars,
      date: new Date().toISOString(),
    };
    this.saveProgress();
  }

  /**
   * Increment terminal exercises completed counter
   */
  incrementTerminalExercises() {
    if (!this.data) return;
    if (typeof this.data.terminalExercisesCompleted !== 'number') {
      this.data.terminalExercisesCompleted = 0;
    }
    this.data.terminalExercisesCompleted++;
    this.saveProgress();
  }

  /**
   * Update the best chain streak if the new value is higher
   * @param {number} streak - The chain streak achieved
   */
  updateBestChainStreak(streak) {
    if (!this.data) return;
    if (typeof this.data.bestChainStreak !== 'number') {
      this.data.bestChainStreak = 0;
    }
    if (streak > this.data.bestChainStreak) {
      this.data.bestChainStreak = streak;
      this.saveProgress();
    }
  }

  // ─── DAILY GOALS METHODS ──────────────────────────

  /**
   * Ensure dailyGoals structure exists (migration support)
   */
  ensureDailyGoals() {
    if (!this.data.dailyGoals) {
      this.data.dailyGoals = {
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
   * Increment daily lessons completed
   */
  incrementDailyLessons() {
    if (!this.data) return;
    this.ensureDailyGoals();
    this.data.dailyGoals.goals.lessonsCompleted++;
    this.saveProgress();
    // Notify DailyGoalsManager if available
    if (window.app && window.app.dailyGoalsManager) {
      window.app.dailyGoalsManager.incrementLessons();
    }
  }

  /**
   * Increment daily practice sessions completed
   */
  incrementDailyPractice() {
    if (!this.data) return;
    this.ensureDailyGoals();
    this.data.dailyGoals.goals.practiceCompleted++;
    this.saveProgress();
    if (window.app && window.app.dailyGoalsManager) {
      window.app.dailyGoalsManager.incrementPractice();
    }
  }

  /**
   * Increment daily words learned
   * @param {number} n - Number of words
   */
  incrementDailyWords(n = 1) {
    if (!this.data) return;
    this.ensureDailyGoals();
    this.data.dailyGoals.goals.wordsLearned += n;
    this.saveProgress();
    if (window.app && window.app.dailyGoalsManager) {
      window.app.dailyGoalsManager.incrementWords(n);
    }
  }

  /**
   * Add daily study time
   * @param {number} minutes
   */
  addDailyTime(minutes) {
    if (!this.data) return;
    this.ensureDailyGoals();
    this.data.dailyGoals.goals.timeSpent += minutes;
    this.saveProgress();
    if (window.app && window.app.dailyGoalsManager) {
      window.app.dailyGoalsManager.updateTime(this.data.dailyGoals.goals.timeSpent);
    }
  }
}
