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
import { sanitizePlainObject } from './utils/SanitizeHtml.js';
import { progressRenderingMixin } from './ProgressRendering.js';
import { progressTopicsMixin } from './ProgressTopics.js';

// localStorage marker key — only tracks "there was a save" so legacy recovery
// code can still detect a prior session. The full blob no longer lives in
// localStorage (DOM-readable, XSS-exploitable surface).
const LS_MARKER_KEY = 'flowlearn_progress_marker';
const LEGACY_LS_BLOB_KEY = 'flowlearn_progress';

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
   * Re-read the progress blob for the currently active userId. Used when
   * AuthService signals a user change.
   */
  async reload() {
    this.data = await this.loadProgress();
    this.updateStreak();
    this.renderProgress();
    this._triggerAchievementCheck();
  }

  /**
   * Aggregated stats view used by the Profile tab.
   */
  getStats() {
    const d = this.data || {};
    return {
      level: d.currentLevel || 0,
      xpTotal: d.xp?.total || 0,
      xpToday: d.xp?.today || 0,
      streakCurrent: d.streak?.current || 0,
      streakBest: d.streakCalendar?.bestStreak || 0,
      wordsLearned: d.wordsLearned || 0,
      lessonsCompleted: d.lessonsCompleted || 0,
      songsCompleted: d.songsCompleted || 0,
      practiceSessions: d.practiceSessionsCompleted || 0,
      totalTimeMinutes: d.totalTimeMinutes || 0,
      todayTimeMinutes: d.todayTimeMinutes || 0,
      achievementsUnlocked: Object.keys(d.achievements?.unlocked || {}).length,
    };
  }

  /**
   * Load progress from StorageService (IndexedDB/LocalStorage)
   */
  async loadProgress() {
    const activeUserId = storageService.getUserId();
    try {
      const saved = await storageService.load('progress', activeUserId);
      if (saved) {
        return this._sanitizeLoadedProgress(saved);
      }

      // First sign-in migration: seed this user from the legacy
      // 'user_default' blob if it exists and the new user has no record.
      if (activeUserId !== 'user_default') {
        const legacy = await storageService.load('progress', 'user_default');
        if (legacy) {
          const sanitized = this._sanitizeLoadedProgress(legacy);
          sanitized.userId = activeUserId;
          await storageService.save('progress', sanitized);
          return sanitized;
        }
      }

      // One-time migration from the legacy full-blob localStorage mirror.
      // After migration the blob is erased so a future XSS cannot read it.
      const legacyBlob = localStorage.getItem(LEGACY_LS_BLOB_KEY);
      if (legacyBlob) {
        try {
          const parsed = JSON.parse(legacyBlob);
          const sanitized = this._sanitizeLoadedProgress(parsed);
          localStorage.removeItem(LEGACY_LS_BLOB_KEY);
          await storageService.save('progress', { ...sanitized, userId: activeUserId });
          return sanitized;
        } catch (parseErr) {
          console.warn('Corrupt legacy localStorage progress blob, discarding:', parseErr);
          localStorage.removeItem(LEGACY_LS_BLOB_KEY);
        }
      }
    } catch (e) {
      console.error('Error loading progress:', e);
    }

    // Default progress structure
    return {
      userId: activeUserId, // Key for IndexedDB (may be Google `sub` or 'user_default')
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
    // First pass: drop __proto__ / constructor / prototype keys, rebuild
    // with null prototype, bidi-strip every string, collapse non-finite
    // numbers to 0. Defends against a tampered blob causing prototype
    // pollution or carrying bidi-smuggled UI text.
    const purified = sanitizePlainObject(data, { maxDepth: 12 });
    const safe = { ...purified };

    // Cap unbounded arrays before numeric clamping so an oversized tampered
    // blob cannot survive as a memory-pressure vector.
    if (Array.isArray(safe.activities) && safe.activities.length > 50) {
      safe.activities = safe.activities.slice(0, 50);
    }
    if (Array.isArray(safe.unlockedLevels) && safe.unlockedLevels.length > 100) {
      safe.unlockedLevels = safe.unlockedLevels.slice(0, 100);
    }
    if (
      safe.leaderboard &&
      Array.isArray(safe.leaderboard.weeklySnapshots) &&
      safe.leaderboard.weeklySnapshots.length > 520
    ) {
      safe.leaderboard.weeklySnapshots = safe.leaderboard.weeklySnapshots.slice(-520);
    }

    safe.wordsLearned = this._clampNumber(safe.wordsLearned, 0, 1_000_000);
    safe.songsCompleted = this._clampNumber(safe.songsCompleted, 0, 100_000);
    safe.lessonsCompleted = this._clampNumber(safe.lessonsCompleted, 0, 100_000);
    safe.currentLevel = this._clampNumber(safe.currentLevel, 0, 99);
    safe.levelProgress = this._clampNumber(safe.levelProgress, 0, 1000);
    safe.totalTimeMinutes = this._clampNumber(safe.totalTimeMinutes, 0, 10_000_000);
    safe.todayTimeMinutes = this._clampNumber(safe.todayTimeMinutes, 0, 1440);
    safe.practiceSessionsCompleted = this._clampNumber(
      safe.practiceSessionsCompleted,
      0,
      1_000_000
    );
    safe.terminalExercisesCompleted = this._clampNumber(
      safe.terminalExercisesCompleted,
      0,
      1_000_000
    );
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
      await storageService.save('progress', this.data);
      // Marker-only: no full blob in localStorage. localStorage is DOM-readable
      // (any XSS reads it), so keeping 5MB of progress + leaderboard + streak
      // data there was an unnecessary exfiltration target. IDB remains the
      // source of truth; the marker just lets recovery code detect that a
      // prior session existed.
      try {
        localStorage.setItem(
          LS_MARKER_KEY,
          JSON.stringify({ lastSaved: Date.now(), userId: this.data.userId })
        );
      } catch {
        // localStorage full / disabled — not fatal.
      }
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
  completeLesson(level, lessonId) {
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
    const lastDate = new Date(`${lastDateISO}T00:00:00`);
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

  /**
   * Reset progress (for testing)
   */
  async resetProgress() {
    localStorage.removeItem(LS_MARKER_KEY);
    localStorage.removeItem(LEGACY_LS_BLOB_KEY);
    this.data = await this.loadProgress();
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
}

Object.assign(ProgressManager.prototype, progressRenderingMixin, progressTopicsMixin);
