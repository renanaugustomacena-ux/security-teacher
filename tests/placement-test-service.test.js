import { describe, it, expect, beforeEach } from 'vitest';
import { PlacementTestService } from '../js/services/PlacementTestService.js';

describe('PlacementTestService', () => {
  let svc;

  beforeEach(() => {
    svc = new PlacementTestService();
  });

  it('startTest initializes at middle level', () => {
    const state = svc.startTest(12);
    expect(state.currentLevel).toBe(6);
    expect(state.isComplete).toBe(false);
  });

  it('recordAnswer stores responses', () => {
    svc.startTest(12);
    svc.recordAnswer(true);
    svc.recordAnswer(false);
    const state = svc.getCurrentState();
    expect(state.responses.length).toBe(2);
  });

  it('advanceRound moves level up on 3/3 correct', () => {
    svc.startTest(12);
    svc.recordAnswer(true);
    svc.recordAnswer(true);
    svc.recordAnswer(true);
    svc.advanceRound();
    const state = svc.getCurrentState();
    expect(state.currentLevel).toBe(8);
  });

  it('advanceRound moves level down on 0/3 correct', () => {
    svc.startTest(12);
    svc.recordAnswer(false);
    svc.recordAnswer(false);
    svc.recordAnswer(false);
    svc.advanceRound();
    const state = svc.getCurrentState();
    expect(state.currentLevel).toBe(4);
  });

  it('completes after 4 rounds', () => {
    svc.startTest(12);
    for (let round = 0; round < 4; round++) {
      svc.recordAnswer(true);
      svc.recordAnswer(true);
      svc.recordAnswer(false);
      svc.advanceRound();
    }
    const result = svc.getResult();
    expect(result).not.toBeNull();
    expect(result.totalQuestions).toBe(12);
    expect(result.levelsToUnlock.length).toBeGreaterThan(0);
  });

  it('clamps level to valid range', () => {
    svc.startTest(3);
    svc.recordAnswer(true);
    svc.recordAnswer(true);
    svc.recordAnswer(true);
    svc.advanceRound();
    const state = svc.getCurrentState();
    expect(state.currentLevel).toBeLessThan(3);
  });

  it('reset clears state', () => {
    svc.startTest(12);
    svc.reset();
    expect(svc.getCurrentState()).toBeNull();
  });
});
