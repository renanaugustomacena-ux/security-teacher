/* eslint-disable import/first */
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../js/services/StorageService.js', () => ({
  storageService: {
    load: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  },
}));

import { NotificationService } from '../js/services/NotificationService.js';

describe('NotificationService', () => {
  let svc;

  beforeEach(async () => {
    svc = new NotificationService();
    await svc.init();
  });

  it('starts with default permission', () => {
    expect(svc.permission).toBeDefined();
  });

  it('starts with notifications disabled', () => {
    expect(svc.preferences.enabled).toBe(false);
  });

  it('incrementStudyDay returns should_ask on day 3 when permission is default', () => {
    svc.permission = 'default';
    svc.studyDayCount = 2;
    const result = svc.incrementStudyDay();
    expect(result).toBe('should_ask');
  });

  it('incrementStudyDay returns null on other days', () => {
    svc.permission = 'default';
    svc.studyDayCount = 0;
    expect(svc.incrementStudyDay()).toBeNull();
  });

  it('shouldRemind returns streak_at_risk when not studied and streak > 0', () => {
    svc.preferences.enabled = true;
    expect(svc.shouldRemind(false, 5)).toBe('streak_at_risk');
  });

  it('shouldRemind returns daily_reminder when not studied and no streak', () => {
    svc.preferences.enabled = true;
    expect(svc.shouldRemind(false, 0)).toBe('daily_reminder');
  });

  it('shouldRemind returns null when already studied', () => {
    svc.preferences.enabled = true;
    expect(svc.shouldRemind(true, 5)).toBeNull();
  });

  it('shouldRemind returns null when disabled', () => {
    svc.preferences.enabled = false;
    expect(svc.shouldRemind(false, 5)).toBeNull();
  });

  it('getOptimalHour returns 18 with no data', () => {
    expect(svc.getOptimalHour({})).toBe(18);
  });

  it('getOptimalHour finds most common hour', () => {
    const history = {
      '2026-01-01': { firstActivityHour: 9 },
      '2026-01-02': { firstActivityHour: 9 },
      '2026-01-03': { firstActivityHour: 14 },
    };
    expect(svc.getOptimalHour(history)).toBe(9);
  });

  it('setPreferences merges partial updates', () => {
    svc.setPreferences({ dailyReminder: false });
    expect(svc.preferences.dailyReminder).toBe(false);
    expect(svc.preferences.streakAtRisk).toBe(true);
  });
});
