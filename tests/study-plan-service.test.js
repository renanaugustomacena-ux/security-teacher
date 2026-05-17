/* eslint-disable import/first */
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../js/services/StorageService.js', () => ({
  storageService: {
    load: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  },
}));

import { StudyPlanService } from '../js/services/StudyPlanService.js';

describe('StudyPlanService', () => {
  let svc;

  beforeEach(async () => {
    svc = new StudyPlanService();
    await svc.init();
  });

  it('defaults to regular preset', () => {
    const targets = svc.getTargets();
    expect(targets.lessons).toBe(2);
    expect(targets.practice).toBe(3);
  });

  it('setPreset changes targets', () => {
    svc.setPreset('intense');
    const targets = svc.getTargets();
    expect(targets.lessons).toBe(3);
    expect(targets.minutes).toBe(30);
  });

  it('setPreset throws for invalid key', () => {
    expect(() => svc.setPreset('nonexistent')).toThrow();
  });

  it('setCustomTargets overrides presets', () => {
    svc.setCustomTargets({ lessons: 4, practice: 6, words: 15, minutes: 45 });
    const targets = svc.getTargets();
    expect(targets.lessons).toBe(4);
    expect(targets.practice).toBe(6);
  });

  it('setCustomTargets clamps values', () => {
    svc.setCustomTargets({ lessons: 100, practice: 200, words: 500, minutes: 1000 });
    const targets = svc.getTargets();
    expect(targets.lessons).toBeLessThanOrEqual(20);
    expect(targets.minutes).toBeLessThanOrEqual(240);
  });

  it('estimateCompletionDate returns future date for remaining items', () => {
    const date = svc.estimateCompletionDate('python', 480, 100);
    expect(date.getTime()).toBeGreaterThan(Date.now());
  });

  it('estimateCompletionDate returns now for fully mastered', () => {
    const date = svc.estimateCompletionDate('python', 480, 480);
    const diff = Math.abs(date.getTime() - Date.now());
    expect(diff).toBeLessThan(1000);
  });

  it('getGoalProgress computes progress ratio', () => {
    const result = svc.getGoalProgress(100, 50);
    expect(result.progress).toBeCloseTo(0.5, 2);
  });
});
