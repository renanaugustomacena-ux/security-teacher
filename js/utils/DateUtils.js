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
  const d1 = typeof date1 === 'string' ? new Date(`${date1}T00:00:00`) : new Date(date1);
  const d2 = typeof date2 === 'string' ? new Date(`${date2}T00:00:00`) : new Date(date2);
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
  const d1 = typeof date1 === 'string' ? new Date(`${date1}T00:00:00`) : new Date(date1);
  const d2 = typeof date2 === 'string' ? new Date(`${date2}T00:00:00`) : new Date(date2);
  const diffMs = Math.abs(d1.getTime() - d2.getTime());
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Get the Monday of the week for a given date.
 * @param {string|Date} date
 * @returns {Date}
 */
export function getWeekStart(date) {
  const d = typeof date === 'string' ? new Date(`${date}T00:00:00`) : new Date(date);
  const day = d.getDay();
  // getDay() returns 0 for Sunday, 1 for Monday, etc.
  // We want Monday as start of week
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}
