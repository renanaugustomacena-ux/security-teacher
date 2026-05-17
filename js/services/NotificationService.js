/**
 * Push Notification Service for PWA
 * Handles permission requests, study reminders, and notification preferences.
 */
import { storageService } from './StorageService.js';

class NotificationService {
  constructor() {
    this.permission = 'default';
    this.preferences = {
      enabled: false,
      dailyReminder: true,
      streakAtRisk: true,
      srsDue: true,
    };
    this.studyDayCount = 0;
    this._hasAskedThisSession = false;
  }

  /** Load persisted state and sync browser permission. */
  async init() {
    const saved = await storageService.load('settings', 'notifications');
    if (saved) {
      if (saved.preferences) this.preferences = saved.preferences;
      if (typeof saved.studyDayCount === 'number') this.studyDayCount = saved.studyDayCount;
    }
    this.permission = typeof Notification !== 'undefined' ? Notification.permission : 'denied';
  }

  /** Track study days. Returns 'should_ask' on day 3 if permission is default. */
  incrementStudyDay() {
    this.studyDayCount++;
    this._save();
    if (this.studyDayCount === 3 && this.permission === 'default') {
      return 'should_ask';
    }
    return null;
  }

  /**
   * Request browser notification permission.
   * @returns {Promise<string>} 'granted' | 'denied' | 'default'
   */
  async requestPermission() {
    if (typeof Notification === 'undefined') return 'denied';

    this.permission = await Notification.requestPermission();
    this._hasAskedThisSession = true;

    if (this.permission === 'granted') {
      this.preferences.enabled = true;
    }
    await this._save();
    return this.permission;
  }

  /**
   * Determine which reminder type (if any) should fire.
   * @param {boolean} hasStudiedToday
   * @param {number} currentStreak
   * @returns {string|null} 'streak_at_risk' | 'daily_reminder' | null
   */
  shouldRemind(hasStudiedToday, currentStreak) {
    if (!this.preferences.enabled) return null;
    if (!hasStudiedToday && currentStreak > 0) return 'streak_at_risk';
    if (!hasStudiedToday) return 'daily_reminder';
    return null;
  }

  /**
   * Compute optimal notification hour from study history.
   * @param {Object} studyHistory - { [dateStr]: { firstActivityHour } }
   * @returns {number} Hour (0-23), defaults to 18
   */
  getOptimalHour(studyHistory) {
    if (!studyHistory || Object.keys(studyHistory).length === 0) return 18;

    const freq = {};
    for (const entry of Object.values(studyHistory)) {
      if (typeof entry.firstActivityHour === 'number') {
        const h = entry.firstActivityHour;
        freq[h] = (freq[h] || 0) + 1;
      }
    }

    if (Object.keys(freq).length === 0) return 18;

    let bestHour = 18;
    let bestCount = 0;
    for (const [hour, count] of Object.entries(freq)) {
      if (count > bestCount) {
        bestCount = count;
        bestHour = Number(hour);
      }
    }
    return bestHour;
  }

  /** Merge partial preferences update. */
  setPreferences(prefs) {
    Object.assign(this.preferences, prefs);
    this._save();
  }

  /** Return a defensive copy of current preferences. */
  getPreferences() {
    return { ...this.preferences };
  }

  /** Persist state to storage. */
  async _save() {
    await storageService.save('settings', {
      userId: 'notifications',
      preferences: this.preferences,
      studyDayCount: this.studyDayCount,
    });
  }
}

export { NotificationService };
export const notificationService = new NotificationService();
