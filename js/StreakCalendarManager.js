/**
 * STREAK CALENDAR MANAGER - Knowledge AIO
 * ========================================
 *
 * Renders a GitHub-style contribution graph showing study activity
 * over the last 26 weeks (6 months). Manages streak freeze logic:
 * - 1 freeze available per week (refilled on Monday)
 * - Frozen days preserve the streak and appear with an ice indicator
 * - Shows current streak, best streak, and freeze status
 */

import { getToday, isSameDay, getDaysBetween, getWeekStart } from './utils/DateUtils.js';

export class StreakCalendarManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
  }

  /**
   * Ensure streakCalendar data structure exists, check weekly freeze refill
   */
  init() {
    if (!this.progressManager?.data) return;

    this._ensureData();
    this._checkWeeklyFreezeRefill();
  }

  /**
   * Ensure the streakCalendar structure exists in progress data (migration support)
   */
  _ensureData() {
    if (!this.progressManager.data.streakCalendar) {
      this.progressManager.data.streakCalendar = {
        studyDays: {},
        freezes: { available: 1, usedThisWeek: [], lastRefill: '' },
        bestStreak: 0,
      };
    }

    const sc = this.progressManager.data.streakCalendar;

    if (!sc.studyDays) sc.studyDays = {};
    if (!sc.freezes) sc.freezes = { available: 1, usedThisWeek: [], lastRefill: '' };
    if (typeof sc.bestStreak !== 'number') sc.bestStreak = 0;
  }

  /**
   * On Monday (first app open of new week), reset available freezes to 1
   */
  _checkWeeklyFreezeRefill() {
    const sc = this.progressManager.data.streakCalendar;
    const today = getToday();
    const weekStart = getWeekStart(today);
    const weekStartStr = this._dateToStr(weekStart);

    if (sc.freezes.lastRefill !== weekStartStr) {
      sc.freezes.available = 1;
      sc.freezes.usedThisWeek = [];
      sc.freezes.lastRefill = weekStartStr;
      this.progressManager.saveProgress();
    }
  }

  /**
   * Record study activity for today
   * @param {number} minutes - Minutes studied
   * @param {number} activities - Number of activities completed
   */
  recordStudyDay(minutes, activities) {
    if (!this.progressManager?.data) return;
    this._ensureData();

    const today = getToday();
    const sc = this.progressManager.data.streakCalendar;

    if (!sc.studyDays[today]) {
      sc.studyDays[today] = { minutes: 0, activities: 0 };
    }

    sc.studyDays[today].minutes += minutes;
    sc.studyDays[today].activities += activities;

    // Update best streak
    const current = this.progressManager.data.streak?.current ?? 0;
    if (current > sc.bestStreak) {
      sc.bestStreak = current;
    }

    this.progressManager.saveProgress();
  }

  /**
   * Use a freeze if needed (called during streak check).
   * Returns true if a freeze was consumed.
   * @param {string} missedDate - The YYYY-MM-DD date that was missed
   * @returns {boolean}
   */
  useFreezeIfNeeded(missedDate) {
    if (!this.progressManager?.data) return false;
    this._ensureData();

    const sc = this.progressManager.data.streakCalendar;

    if (sc.freezes.available > 0) {
      sc.freezes.available--;
      sc.freezes.usedThisWeek.push(missedDate);

      // Mark the frozen day in studyDays with a special flag
      if (!sc.studyDays[missedDate]) {
        sc.studyDays[missedDate] = { minutes: 0, activities: 0 };
      }
      sc.studyDays[missedDate].frozen = true;

      this.progressManager.saveProgress();
      return true;
    }

    return false;
  }

  /**
   * Get number of available freezes
   * @returns {number}
   */
  getAvailableFreezes() {
    if (!this.progressManager?.data) return 0;
    this._ensureData();
    return this.progressManager.data.streakCalendar.freezes.available;
  }

  /**
   * Render the GitHub-style contribution graph
   * @param {string} containerId - DOM element ID to render into
   */
  renderCalendar(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !this.progressManager?.data) return;

    this._ensureData();
    const sc = this.progressManager.data.streakCalendar;
    const today = getToday();

    // Calculate 26 weeks of data
    const totalWeeks = 26;
    const todayDate = new Date(today + 'T00:00:00');
    const todayDay = todayDate.getDay(); // 0=Sun, 1=Mon...
    // Convert to Mon-based: Mon=0 ... Sun=6
    const todayMondayBased = todayDay === 0 ? 6 : todayDay - 1;

    // Start from the Monday of (totalWeeks - 1) weeks ago
    const startDate = new Date(todayDate);
    startDate.setDate(startDate.getDate() - todayMondayBased - (totalWeeks - 1) * 7);

    // Build day labels
    const dayLabels = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];

    // Build month labels
    const months = [];
    let lastMonth = -1;
    for (let w = 0; w < totalWeeks; w++) {
      const weekDate = new Date(startDate);
      weekDate.setDate(startDate.getDate() + w * 7);
      const m = weekDate.getMonth();
      if (m !== lastMonth) {
        months.push({ week: w, label: this._getMonthName(m) });
        lastMonth = m;
      }
    }

    // Build grid cells
    const cells = [];
    for (let w = 0; w < totalWeeks; w++) {
      for (let d = 0; d < 7; d++) {
        const cellDate = new Date(startDate);
        cellDate.setDate(startDate.getDate() + w * 7 + d);
        const dateStr = this._dateToStr(cellDate);

        // Skip future dates
        if (cellDate > todayDate) {
          cells.push({
            dateStr,
            level: -1,
            minutes: 0,
            frozen: false,
            isToday: false,
            future: true,
          });
          continue;
        }

        const dayData = sc.studyDays[dateStr];
        const minutes = dayData?.minutes ?? 0;
        const frozen = dayData?.frozen ?? false;
        const isToday = dateStr === today;

        let level = 0;
        if (minutes > 0 && minutes < 15) level = 1;
        else if (minutes >= 15 && minutes < 30) level = 2;
        else if (minutes >= 30) level = 3;

        cells.push({ dateStr, level, minutes, frozen, isToday, future: false });
      }
    }

    // Render HTML
    container.innerHTML = `
      <div class="streak-calendar">
        <h3 class="streak-calendar-title">Studio negli ultimi 6 mesi / Study Activity</h3>
        <div class="cal-wrapper">
          <div class="cal-day-labels">
            ${dayLabels.map((l) => `<span class="cal-day-label">${l}</span>`).join('')}
          </div>
          <div class="cal-main">
            <div class="cal-month-labels">
              ${this._renderMonthLabels(months, totalWeeks)}
            </div>
            <div class="cal-grid" style="grid-template-columns: repeat(${totalWeeks}, 1fr);">
              ${cells.map((c) => this._renderCell(c)).join('')}
            </div>
          </div>
        </div>
        <div class="cal-legend">
          <span class="cal-legend-label">Meno / Less</span>
          <span class="cal-cell cal-level-0"></span>
          <span class="cal-cell cal-level-1"></span>
          <span class="cal-cell cal-level-2"></span>
          <span class="cal-cell cal-level-3"></span>
          <span class="cal-legend-label">Di piu / More</span>
        </div>
      </div>
    `;
  }

  /**
   * Render streak info (current streak, best streak, freeze status)
   * @param {string} containerId - DOM element ID to render into
   */
  renderStreakInfo(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !this.progressManager?.data) return;

    this._ensureData();
    const sc = this.progressManager.data.streakCalendar;
    const current = this.progressManager.data.streak?.current ?? 0;
    const best = Math.max(sc.bestStreak, current);
    const freezesAvailable = sc.freezes.available;
    const freezeUsed = freezesAvailable === 0;

    container.innerHTML = `
      <div class="streak-info">
        <div class="streak-info-item">
          <span class="streak-info-icon">&#x1F525;</span>
          <span class="streak-info-value">${current}</span>
          <span class="streak-info-label">Streak Attuale / Current Streak</span>
        </div>
        <div class="streak-info-item">
          <span class="streak-info-icon">&#x1F3C6;</span>
          <span class="streak-info-value">${best}</span>
          <span class="streak-info-label">Miglior Streak / Best Streak</span>
        </div>
        <div class="streak-info-item">
          <span class="streak-info-icon freeze-indicator ${freezeUsed ? 'freeze-used' : 'freeze-available'}">&#x2744;&#xFE0F;</span>
          <span class="streak-info-value">${freezesAvailable}</span>
          <span class="streak-info-label">Freeze Disponibili / Freezes Available</span>
          <span class="streak-info-hint">${freezeUsed ? 'Usato questa settimana / Used this week' : 'Si ricarica lunedi / Refills Monday'}</span>
        </div>
      </div>
    `;
  }

  // ─── PRIVATE HELPERS ──────────────────────────────

  /**
   * Render a single calendar cell
   */
  _renderCell(cell) {
    if (cell.future) {
      return '<span class="cal-cell cal-future"></span>';
    }

    const classes = ['cal-cell'];
    classes.push(`cal-level-${cell.level}`);
    if (cell.frozen) classes.push('cal-frozen');
    if (cell.isToday) classes.push('cal-today');

    const tooltip = cell.frozen
      ? `${this._formatDateLabel(cell.dateStr)} - Streak Freeze`
      : `${this._formatDateLabel(cell.dateStr)} - ${cell.minutes}min`;

    return `<span class="${classes.join(' ')}" data-tooltip="${tooltip}"><span class="cal-tooltip">${tooltip}</span></span>`;
  }

  /**
   * Render month labels positioned across the grid
   */
  _renderMonthLabels(months, totalWeeks) {
    return months
      .map((m) => {
        const left = (m.week / totalWeeks) * 100;
        return `<span class="cal-month-label" style="left: ${left}%">${m.label}</span>`;
      })
      .join('');
  }

  /**
   * Get short month name
   */
  _getMonthName(monthIndex) {
    const names = [
      'Gen',
      'Feb',
      'Mar',
      'Apr',
      'Mag',
      'Giu',
      'Lug',
      'Ago',
      'Set',
      'Ott',
      'Nov',
      'Dic',
    ];
    return names[monthIndex];
  }

  /**
   * Format a YYYY-MM-DD date as a readable label
   */
  _formatDateLabel(dateStr) {
    const parts = dateStr.split('-');
    const day = parseInt(parts[2], 10);
    const month = this._getMonthName(parseInt(parts[1], 10) - 1);
    return `${day} ${month}`;
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
