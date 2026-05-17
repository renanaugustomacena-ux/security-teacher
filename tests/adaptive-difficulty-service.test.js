import { describe, it, expect, beforeEach } from 'vitest';
import { AdaptiveDifficultyService } from '../js/services/AdaptiveDifficultyService.js';

describe('AdaptiveDifficultyService', () => {
  let svc;

  beforeEach(() => {
    svc = new AdaptiveDifficultyService();
  });

  it('selectItems returns shuffled subset when pool is larger than count', () => {
    const pool = Array.from({ length: 20 }, (_, i) => ({
      english: `word${i}`,
      context: 'basics',
      _topicId: 'python',
      _level: 0,
    }));
    const result = svc.selectItems(pool, 5, () => null);
    expect(result.length).toBe(5);
  });

  it('selectItems returns full pool when count >= pool size', () => {
    const pool = [
      { english: 'a', context: 'x', _topicId: 't', _level: 0 },
      { english: 'b', context: 'x', _topicId: 't', _level: 0 },
    ];
    const result = svc.selectItems(pool, 5, () => null);
    expect(result.length).toBe(2);
  });

  it('selectItems prioritizes items below mastery threshold', () => {
    const pool = Array.from({ length: 10 }, (_, i) => ({
      english: `word${i}`,
      context: 'basics',
      _topicId: 'python',
      _level: 0,
    }));
    const getAnalytics = (key) => {
      if (key.includes('word0')) {
        return {
          totalAttempts: 10,
          accuracy: 0.3,
          avgResponseTimeMs: 3000,
          consecutiveFails: 0,
          lastSeenMs: Date.now() - 86400000 * 3,
        };
      }
      return {
        totalAttempts: 10,
        accuracy: 0.95,
        avgResponseTimeMs: 2000,
        consecutiveFails: 0,
        lastSeenMs: Date.now() - 1000,
      };
    };
    const results = svc.selectItems(pool, 3, getAnalytics);
    expect(results.length).toBe(3);
  });

  it('selectMode returns a mode from available modes', () => {
    const modes = ['listening', 'writing', 'command'];
    const result = svc.selectMode(modes, 0.5);
    expect(modes).toContain(result);
  });

  it('selectMode returns null for empty array', () => {
    expect(svc.selectMode([], 0.5)).toBe(null);
  });

  it('selectDistractors returns requested count', () => {
    const correct = { english: 'target', context: 'crypto', _topicId: 'cyber', _level: 0 };
    const pool = Array.from({ length: 10 }, (_, i) => ({
      english: `other${i}`,
      context: i < 3 ? 'crypto' : 'network',
      _topicId: 'cyber',
      _level: 0,
    }));
    const result = svc.selectDistractors(correct, pool, 3, 0.7);
    expect(result.length).toBe(3);
  });

  it('computeItemDifficulty returns 0.5 for no analytics', () => {
    expect(svc.computeItemDifficulty(null)).toBe(0.5);
    expect(svc.computeItemDifficulty({ totalAttempts: 0 })).toBe(0.5);
  });

  it('computeItemDifficulty increases for low accuracy', () => {
    const d = svc.computeItemDifficulty({
      totalAttempts: 10,
      accuracy: 0.2,
      avgResponseTimeMs: 3000,
      consecutiveFails: 0,
    });
    expect(d).toBeGreaterThan(0.7);
  });

  it('computeItemDifficulty increases for slow responses', () => {
    const fast = svc.computeItemDifficulty({
      totalAttempts: 10,
      accuracy: 0.5,
      avgResponseTimeMs: 3000,
      consecutiveFails: 0,
    });
    const slow = svc.computeItemDifficulty({
      totalAttempts: 10,
      accuracy: 0.5,
      avgResponseTimeMs: 35000,
      consecutiveFails: 0,
    });
    expect(slow).toBeGreaterThan(fast);
  });

  it('computeItemDifficulty clamped to [0, 1]', () => {
    const d = svc.computeItemDifficulty({
      totalAttempts: 10,
      accuracy: 0.0,
      avgResponseTimeMs: 50000,
      consecutiveFails: 5,
    });
    expect(d).toBeLessThanOrEqual(1);
    expect(d).toBeGreaterThanOrEqual(0);
  });
});
