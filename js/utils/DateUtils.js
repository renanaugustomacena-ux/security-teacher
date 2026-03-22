/**
 * Date Utilities - FlowLearn
 * ==========================
 *
 * Shared date utility functions for progress tracking,
 * streaks, and calendar rendering.
 */

/**
 * Returns today's date as a YYYY-MM-DD string.
 * @returns {string}
 */
export function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Check if two date strings (YYYY-MM-DD) or Date objects represent the same day.
 * @param {string|Date} date1
 * @param {string|Date} date2
 * @returns {boolean}
 */
export function isSameDay(date1, date2) {
  const d1 = typeof date1 === 'string' ? new Date(date1 + 'T00:00:00') : new Date(date1);
  const d2 = typeof date2 === 'string' ? new Date(date2 + 'T00:00:00') : new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/**
 * Get the number of days between two dates (absolute value).
 * @param {string|Date} date1
 * @param {string|Date} date2
 * @returns {number}
 */
export function getDaysBetween(date1, date2) {
  const d1 = typeof date1 === 'string' ? new Date(date1 + 'T00:00:00') : new Date(date1);
  const d2 = typeof date2 === 'string' ? new Date(date2 + 'T00:00:00') : new Date(date2);
  const diffMs = Math.abs(d1.getTime() - d2.getTime());
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Get the Monday of the week for a given date.
 * @param {string|Date} date
 * @returns {Date}
 */
export function getWeekStart(date) {
  const d = typeof date === 'string' ? new Date(date + 'T00:00:00') : new Date(date);
  const day = d.getDay();
  // getDay() returns 0 for Sunday, 1 for Monday, etc.
  // We want Monday as start of week
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/**
 * Generate an array of day objects for calendar rendering.
 * Each object: { date: Date, day: number, inMonth: boolean, dateStr: string }
 *
 * The array starts on Monday and includes padding days from
 * the previous/next months to fill complete weeks.
 *
 * @param {number} year - Full year (e.g. 2026)
 * @param {number} month - Month (0-based, 0 = January)
 * @returns {Array<{date: Date, day: number, inMonth: boolean, dateStr: string}>}
 */
export function getMonthCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Find the Monday before or on the first day
  const startDay = firstDay.getDay(); // 0=Sun, 1=Mon, ...
  // Convert to Monday-based: Mon=0, Tue=1, ..., Sun=6
  const mondayOffset = startDay === 0 ? 6 : startDay - 1;

  const calendarStart = new Date(year, month, 1 - mondayOffset);
  const days = [];

  // Generate 6 weeks (42 days) to ensure we cover all cases
  for (let i = 0; i < 42; i++) {
    const d = new Date(calendarStart);
    d.setDate(calendarStart.getDate() + i);

    const inMonth = d.getMonth() === month && d.getFullYear() === year;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    days.push({
      date: d,
      day: d.getDate(),
      inMonth,
      dateStr,
    });

    // Stop after we've passed the last day and completed the week
    if (i >= 28 && d > lastDay && d.getDay() === 1) {
      break;
    }
  }

  return days;
}
