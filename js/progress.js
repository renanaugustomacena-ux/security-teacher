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
      // Attempt to load from new StorageService first (if implemented there)
      // For now, we stick to localStorage via the Service wrapper if available,
      // or direct localStorage if Service assumes DB.
      // Since StorageService implements generic DB load, we try that.

      const saved = await storageService.load('progress', 'user_default');
      if (saved) {
        return saved;
      }

      // Fallback to localStorage for migration
      const localSaved = localStorage.getItem(this.storageKey);
      if (localSaved) {
        return JSON.parse(localSaved);
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
    };
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
   * Update study streak
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
        // Streak broken
        this.data.streak.current = 1;
        this.data.streak.lastStudyDate = today;
      }
    }

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
      };
    }
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
}
