import { describe, it, expect, beforeEach } from 'vitest';
import { StatsDashboardService } from '../js/services/StatsDashboardService.js';

describe('StatsDashboardService', () => {
  let svc;

  beforeEach(() => {
    svc = new StatsDashboardService();
  });

  describe('getAccuracyOverTime', () => {
    it('returns correct length and values for given response data', () => {
      const today = new Date().toISOString().slice(0, 10);
      const responses = [
        { timestamp: today, correct: true },
        { timestamp: today, correct: true },
        { timestamp: today, correct: false },
      ];
      const result = svc.getAccuracyOverTime(responses, 7);
      expect(result.dates).toHaveLength(7);
      expect(result.accuracies).toHaveLength(7);
      // Today is the last entry; 2 of 3 correct = 2/3
      const todayAcc = result.accuracies[result.dates.indexOf(today)];
      expect(todayAcc).toBeCloseTo(2 / 3);
    });

    it('handles empty data', () => {
      const result = svc.getAccuracyOverTime([], 5);
      expect(result.dates).toHaveLength(5);
      expect(result.accuracies).toHaveLength(5);
      expect(result.accuracies.every((a) => a === 0)).toBe(true);
    });
  });

  describe('getMasteryDistribution', () => {
    it('counts stages correctly', () => {
      const map = new Map([
        ['a', { stage: 0 }],
        ['b', { stage: 2 }],
        ['c', { stage: 2 }],
        ['d', { stage: 5 }],
      ]);
      const result = svc.getMasteryDistribution(map);
      expect(result.counts[0]).toBe(1);
      expect(result.counts[2]).toBe(2);
      expect(result.counts[5]).toBe(1);
      expect(result.counts[1]).toBe(0);
    });

    it('returns all 7 stage labels', () => {
      const result = svc.getMasteryDistribution(new Map());
      expect(result.labels).toHaveLength(7);
      expect(result.counts).toHaveLength(7);
      expect(result.colors).toHaveLength(7);
      expect(result.labels[0]).toBe('Unseen');
      expect(result.labels[6]).toBe('Burned');
    });
  });

  describe('getModePerformance', () => {
    it('aggregates correctly across items', () => {
      const map = new Map([
        [
          'item1',
          {
            modeAccuracy: {
              writing: { correct: 3, total: 5 },
              listening: { correct: 2, total: 4 },
            },
          },
        ],
        [
          'item2',
          {
            modeAccuracy: { writing: { correct: 7, total: 10 }, command: { correct: 1, total: 2 } },
          },
        ],
      ]);
      const result = svc.getModePerformance(map);
      expect(result.modes).toContain('writing');
      expect(result.modes).toContain('listening');
      expect(result.modes).toContain('command');

      const wIdx = result.modes.indexOf('writing');
      // writing: (3+7)/(5+10) = 10/15
      expect(result.accuracies[wIdx]).toBeCloseTo(10 / 15);

      const lIdx = result.modes.indexOf('listening');
      // listening: 2/4
      expect(result.accuracies[lIdx]).toBeCloseTo(0.5);
    });
  });

  describe('getTopicComparison', () => {
    it('returns percentages for each topic', () => {
      const map = new Map([
        ['python:0:basics:var', { masteryP: 0.8 }],
        ['python:0:basics:func', { masteryP: 0.6 }],
        ['linux:0:cmd:chmod', { masteryP: 0.4 }],
      ]);
      const result = svc.getTopicComparison(map, ['python', 'linux', 'missing']);
      expect(result.topics).toEqual(['python', 'linux', 'missing']);
      // python avg = (0.8+0.6)/2 * 100 = 70
      expect(result.percentages[0]).toBeCloseTo(70);
      // linux = 0.4 * 100 = 40
      expect(result.percentages[1]).toBeCloseTo(40);
      // missing has no items → 0
      expect(result.percentages[2]).toBe(0);
    });
  });

  describe('renderChart', () => {
    it('does not throw when canvas has no context', () => {
      const fakeCanvas = { getContext: () => null };
      expect(() => svc.renderChart(fakeCanvas, 'line', { values: [1, 2] })).not.toThrow();
      expect(() =>
        svc.renderChart(fakeCanvas, 'bar', { values: [1], labels: ['a'] })
      ).not.toThrow();
      expect(() =>
        svc.renderChart(fakeCanvas, 'pie', { values: [1], labels: ['a'], colors: ['#f00'] })
      ).not.toThrow();
      expect(() =>
        svc.renderChart(fakeCanvas, 'radar', { values: [1, 2, 3], labels: ['a', 'b', 'c'] })
      ).not.toThrow();
    });
  });
});
