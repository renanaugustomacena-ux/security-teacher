import { describe, it, expect, beforeEach } from 'vitest';
import { AIService } from '../js/services/AIService.js';

describe('AIService — scenario catalog', () => {
  let svc;
  beforeEach(() => {
    svc = new AIService();
  });

  it('exposes the bundled scenarios', () => {
    const scenarios = svc.getScenarios();
    expect(Array.isArray(scenarios)).toBe(true);
    expect(scenarios.length).toBeGreaterThan(0);
    for (const s of scenarios) {
      expect(typeof s.id).toBe('string');
      expect(typeof s.name).toBe('string');
      expect(typeof s.description).toBe('string');
    }
  });

  it('getScenario returns the matching scenario by id', () => {
    const all = svc.getScenarios();
    const first = svc.getScenario(all[0].id);
    expect(first).not.toBeNull();
    expect(first.id).toBe(all[0].id);
  });

  it('getScenario returns null for an unknown id', () => {
    expect(svc.getScenario('nonexistent-scenario-xyz')).toBeNull();
  });
});

describe('AIService — conversation flow', () => {
  let svc;
  beforeEach(() => {
    svc = new AIService();
  });

  it('returns the opening message of a scenario', () => {
    const scenarios = svc.getScenarios();
    const opening = svc.getOpeningMessage(scenarios[0].id);
    expect(opening).not.toBeNull();
    expect(typeof opening.message).toBe('string');
    expect(opening.message.length).toBeGreaterThan(0);
    expect(opening.isEnd).toBe(false);
  });

  it('returns a graceful fallback for an unknown scenario id', () => {
    const result = svc.getResponse('hello', 'nonexistent', 0);
    expect(result.isEnd).toBe(true);
    expect(typeof result.message).toBe('string');
    expect(result.corrections).toEqual([]);
  });

  it('returns an "end of conversation" message when the turn index is past the tree', () => {
    const scenarios = svc.getScenarios();
    const sId = scenarios[0].id;
    const result = svc.getResponse('anything', sId, 9999);
    expect(result.isEnd).toBe(true);
    expect(typeof result.message).toBe('string');
  });
});

describe('AIService — grammar corrections', () => {
  let svc;
  beforeEach(() => {
    svc = new AIService();
  });

  it('flags the "I have N years" Italianism with the right correction', () => {
    const corrections = svc._checkGrammar('I have 30 years');
    expect(corrections.length).toBeGreaterThan(0);
    const match = corrections.find((c) => /years old/.test(c.correction));
    expect(match).toBeDefined();
    expect(match.correction).toBe('I am 30 years old');
  });

  it('flags "more better" as a redundant comparative', () => {
    const corrections = svc._checkGrammar('this is more better');
    expect(corrections.find((c) => c.correction === 'better')).toBeDefined();
  });

  it('flags third-person verb agreement ("he go" → "he goes")', () => {
    const corrections = svc._checkGrammar('he go to school');
    expect(corrections.find((c) => c.correction === 'he goes')).toBeDefined();
  });

  it('returns [] for an empty message', () => {
    expect(svc._checkGrammar('')).toEqual([]);
    expect(svc._checkGrammar(null)).toEqual([]);
  });

  it('returns [] for clean English', () => {
    expect(svc._checkGrammar('I am thirty years old and I agree.')).toEqual([]);
  });
});

describe('AIService — difficulty labels', () => {
  let svc;
  beforeEach(() => {
    svc = new AIService();
  });

  it('returns labels for the three known difficulty levels', () => {
    expect(svc.getDifficultyInfo(1).label).toBe('Beginner');
    expect(svc.getDifficultyInfo(2).label).toBe('Intermediate');
    expect(svc.getDifficultyInfo(3).label).toBe('Advanced');
  });

  it('returns the bilingual Italian label', () => {
    expect(svc.getDifficultyInfo(1).labelIt).toBe('Principiante');
    expect(svc.getDifficultyInfo(2).labelIt).toBe('Intermedio');
    expect(svc.getDifficultyInfo(3).labelIt).toBe('Avanzato');
  });

  it('falls back to the beginner label for an unknown difficulty', () => {
    expect(svc.getDifficultyInfo(99).label).toBe('Beginner');
  });
});
