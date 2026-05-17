/* eslint-disable import/first */
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../js/services/StorageService.js', () => ({
  storageService: {
    load: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  },
}));

import { SmartScoreService } from '../js/services/SmartScoreService.js';

describe('SmartScoreService', () => {
  let svc;

  beforeEach(async () => {
    svc = new SmartScoreService();
    await svc.init();
  });

  it('starts with score 0', () => {
    expect(svc.getScore('python', 0)).toBe(0);
  });

  it('correct answer increases score', () => {
    const result = svc.updateScore('python', 0, true);
    expect(result.current).toBeGreaterThan(0);
    expect(result.delta).toBeGreaterThan(0);
  });

  it('incorrect answer decreases score', () => {
    svc.updateScore('python', 0, true);
    svc.updateScore('python', 0, true);
    svc.updateScore('python', 0, true);
    const before = svc.getScore('python', 0);
    const result = svc.updateScore('python', 0, false);
    expect(result.current).toBeLessThan(before);
  });

  it('gain is larger at low scores', () => {
    const lowResult = svc.updateScore('python', 0, true);

    const svc2 = new SmartScoreService();
    svc2._scores = { python: { 1: 80 } };
    const highResult = svc2.updateScore('python', 1, true);

    expect(lowResult.delta).toBeGreaterThan(highResult.delta);
  });

  it('penalty is larger at high scores', () => {
    const svc2 = new SmartScoreService();
    svc2._scores = { python: { 0: 90, 1: 20 } };
    const highPenalty = svc2.updateScore('python', 0, false);
    const lowPenalty = svc2.updateScore('python', 1, false);
    expect(Math.abs(highPenalty.delta)).toBeGreaterThan(Math.abs(lowPenalty.delta));
  });

  it('score is clamped to [0, 100]', () => {
    for (let i = 0; i < 50; i++) svc.updateScore('python', 0, true);
    expect(svc.getScore('python', 0)).toBeLessThanOrEqual(100);

    for (let i = 0; i < 50; i++) svc.updateScore('python', 0, false);
    expect(svc.getScore('python', 0)).toBeGreaterThanOrEqual(0);
  });

  it('getTier returns correct tier names', () => {
    expect(svc.getTier(0)).toBe('beginner');
    expect(svc.getTier(29)).toBe('beginner');
    expect(svc.getTier(30)).toBe('developing');
    expect(svc.getTier(60)).toBe('proficient');
    expect(svc.getTier(80)).toBe('advanced');
    expect(svc.getTier(90)).toBe('expert');
    expect(svc.getTier(100)).toBe('mastered');
  });

  it('getTopicScores returns all levels for topic', () => {
    svc.updateScore('python', 0, true);
    svc.updateScore('python', 3, true);
    const scores = svc.getTopicScores('python');
    expect(scores[0]).toBeGreaterThan(0);
    expect(scores[3]).toBeGreaterThan(0);
  });

  it('hard question gives bonus gain', () => {
    const easy = svc.updateScore('python', 0, true, 0.3);
    svc._scores = {};
    const hard = svc.updateScore('python', 0, true, 0.8);
    expect(hard.delta).toBeGreaterThan(easy.delta);
  });
});
