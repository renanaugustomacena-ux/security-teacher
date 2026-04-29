import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getToday, isSameDay, getDaysBetween, getWeekStart } from '../js/utils/DateUtils.js';

describe('getToday', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the current date as YYYY-MM-DD', () => {
    vi.setSystemTime(new Date(2026, 3, 29, 12, 0, 0));
    expect(getToday()).toBe('2026-04-29');
  });

  it('zero-pads single-digit months and days', () => {
    vi.setSystemTime(new Date(2026, 0, 5, 12, 0, 0));
    expect(getToday()).toBe('2026-01-05');
  });

  it('handles December correctly', () => {
    vi.setSystemTime(new Date(2026, 11, 31, 23, 59, 0));
    expect(getToday()).toBe('2026-12-31');
  });
});

describe('isSameDay', () => {
  it('matches two YYYY-MM-DD strings on the same day', () => {
    expect(isSameDay('2026-04-29', '2026-04-29')).toBe(true);
  });

  it('rejects two strings on different days', () => {
    expect(isSameDay('2026-04-29', '2026-04-30')).toBe(false);
  });

  it('rejects two strings in different months', () => {
    expect(isSameDay('2026-04-29', '2026-05-29')).toBe(false);
  });

  it('matches Date objects on the same calendar day regardless of time', () => {
    const a = new Date(2026, 3, 29, 8, 0, 0);
    const b = new Date(2026, 3, 29, 23, 59, 0);
    expect(isSameDay(a, b)).toBe(true);
  });

  it('cross-compares string + Date', () => {
    expect(isSameDay('2026-04-29', new Date(2026, 3, 29, 6, 0, 0))).toBe(true);
  });
});

describe('getDaysBetween', () => {
  it('returns 0 for identical dates', () => {
    expect(getDaysBetween('2026-04-29', '2026-04-29')).toBe(0);
  });

  it('returns 1 for consecutive days', () => {
    expect(getDaysBetween('2026-04-29', '2026-04-30')).toBe(1);
  });

  it('is order-independent (absolute value)', () => {
    expect(getDaysBetween('2026-04-30', '2026-04-29')).toBe(1);
  });

  it('counts a full week as 7', () => {
    expect(getDaysBetween('2026-04-22', '2026-04-29')).toBe(7);
  });
});

describe('getWeekStart — Monday-based week', () => {
  it('returns the same date for a Monday', () => {
    // 2026-04-27 is a Monday
    const r = getWeekStart('2026-04-27');
    expect(r.getDate()).toBe(27);
  });

  it('returns Monday when given Wednesday', () => {
    // 2026-04-29 is Wednesday → Monday is 2026-04-27
    const r = getWeekStart('2026-04-29');
    expect(r.getDate()).toBe(27);
  });

  it('returns Monday of the previous week when given Sunday', () => {
    // 2026-04-26 is Sunday → Monday is 2026-04-20
    const r = getWeekStart('2026-04-26');
    expect(r.getDate()).toBe(20);
  });

  it('zeroes hours/minutes/seconds', () => {
    const r = getWeekStart('2026-04-29');
    expect(r.getHours()).toBe(0);
    expect(r.getMinutes()).toBe(0);
    expect(r.getSeconds()).toBe(0);
  });
});
