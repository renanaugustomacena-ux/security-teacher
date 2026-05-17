/* eslint-disable import/first */
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../js/services/StorageService.js', () => ({
  storageService: {
    load: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  },
}));

import { MasteryService } from '../js/services/MasteryService.js';

describe('MasteryService', () => {
  let svc;

  beforeEach(async () => {
    svc = new MasteryService();
    await svc.init();
  });

  it('starts all items at UNSEEN (stage 0)', () => {
    expect(svc.getStage('python:0:basics:variable')).toBe(0);
  });

  it('markIntroduced transitions from UNSEEN to INTRODUCED', () => {
    svc.markIntroduced('python:0:basics:variable');
    expect(svc.getStage('python:0:basics:variable')).toBe(1);
  });

  it('does not demote already-practiced items via markIntroduced', () => {
    svc.markIntroduced('python:0:basics:variable');
    svc.updateMastery('python:0:basics:variable', {
      masteryP: 0.3,
      totalAttempts: 3,
      consecutiveFails: 0,
      modeAccuracy: { writing: { correct: 2, total: 3 } },
      lastCorrect: new Date().toISOString(),
    });
    svc.markIntroduced('python:0:basics:variable');
    expect(svc.getStage('python:0:basics:variable')).toBeGreaterThanOrEqual(2);
  });

  it('updateMastery transitions to PRACTICING on first attempt', () => {
    svc.markIntroduced('python:0:basics:x');
    svc.updateMastery('python:0:basics:x', {
      masteryP: 0.15,
      totalAttempts: 1,
      consecutiveFails: 0,
      modeAccuracy: { listening: { correct: 1, total: 1 } },
      lastCorrect: new Date().toISOString(),
    });
    expect(svc.getStage('python:0:basics:x')).toBe(2);
  });

  it('updateMastery reaches FAMILIAR at P(L)>=0.5 with 2+ modes', () => {
    svc.updateMastery('python:0:basics:y', {
      masteryP: 0.55,
      totalAttempts: 10,
      consecutiveFails: 0,
      modeAccuracy: {
        listening: { correct: 5, total: 5 },
        writing: { correct: 3, total: 5 },
      },
      lastCorrect: new Date().toISOString(),
    });
    expect(svc.getStage('python:0:basics:y')).toBeGreaterThanOrEqual(3);
  });

  it('updateMastery decays on consecutive failures', () => {
    svc.updateMastery('linux:0:cmd:z', {
      masteryP: 0.85,
      totalAttempts: 20,
      consecutiveFails: 0,
      modeAccuracy: {
        command: { correct: 15, total: 18 },
        writing: { correct: 3, total: 3 },
        listening: { correct: 2, total: 2 },
      },
      lastCorrect: new Date().toISOString(),
    });
    const before = svc.getStage('linux:0:cmd:z');

    svc.updateMastery('linux:0:cmd:z', {
      masteryP: 0.4,
      totalAttempts: 25,
      consecutiveFails: 4,
      modeAccuracy: {
        command: { correct: 15, total: 23 },
        writing: { correct: 3, total: 3 },
        listening: { correct: 2, total: 2 },
      },
      lastCorrect: new Date().toISOString(),
    });
    expect(svc.getStage('linux:0:cmd:z')).toBeLessThan(before);
  });

  it('getStageInfo returns label and color', () => {
    const info = svc.getStageInfo(5);
    expect(info.en).toBe('Mastered');
    expect(info.color).toBeTruthy();
  });

  it('getLevelMastery counts items per stage', () => {
    svc.markIntroduced('python:0:a:one');
    svc.markIntroduced('python:0:a:two');
    svc.updateMastery('python:0:a:three', {
      masteryP: 0.6,
      totalAttempts: 10,
      consecutiveFails: 0,
      modeAccuracy: { writing: { correct: 7, total: 10 }, listening: { correct: 3, total: 3 } },
      lastCorrect: new Date().toISOString(),
    });
    const result = svc.getLevelMastery('python', 0);
    expect(result.total).toBe(3);
  });
});
