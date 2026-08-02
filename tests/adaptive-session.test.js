import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AdaptiveDifficultyService } from '../js/services/AdaptiveDifficultyService.js';

// Tier-2 behaviour: the placement estimate must survive the result screen and
// steer what comes next, and a session must be able to change format as it
// goes instead of repeating one template ten times.

describe('AdaptiveDifficultyService.estimateAbility', () => {
  let svc;

  beforeEach(() => {
    svc = new AdaptiveDifficultyService();
  });

  it('falls back to the placement estimate when there is no play history', () => {
    // Placed into level 9 of 24 — should read as mid-ability, not the flat
    // default a first-time learner used to get.
    const ability = svc.estimateAbility({ placementLevel: 9, levelCount: 24 });
    expect(ability).toBeGreaterThan(0.3);
    expect(ability).toBeLessThan(0.45);
  });

  it('a learner placed high starts more able than one placed low', () => {
    const high = svc.estimateAbility({ placementLevel: 20, levelCount: 24 });
    const low = svc.estimateAbility({ placementLevel: 1, levelCount: 24 });
    expect(high).toBeGreaterThan(low);
  });

  it('returns the neutral default when there is no evidence at all', () => {
    expect(svc.estimateAbility({})).toBe(0.5);
  });

  it('prefers real performance over the placement prior', () => {
    const ability = svc.estimateAbility({
      smartScore: 90,
      hasSmartScore: true,
      placementLevel: 0,
      levelCount: 24,
    });
    expect(ability).toBeGreaterThan(0.8);
  });

  it('blends SmartScore with topic accuracy', () => {
    const ability = svc.estimateAbility({
      smartScore: 100,
      hasSmartScore: true,
      topicAccuracy: 0,
      hasAnalytics: true,
    });
    expect(ability).toBeGreaterThan(0.5);
    expect(ability).toBeLessThan(1);
  });

  it('stays within 0-1 for out-of-range input', () => {
    expect(svc.estimateAbility({ smartScore: 500, hasSmartScore: true })).toBe(1);
    expect(svc.estimateAbility({ topicAccuracy: -5, hasAnalytics: true })).toBe(0);
  });
});

describe('selectDistractors — ability calibration', () => {
  let svc;

  beforeEach(() => {
    svc = new AdaptiveDifficultyService();
  });

  const pool = [
    { english: 'Rete locale', context: 'net', _topicId: 't', _level: 0 },
    { english: 'Rete geografica', context: 'net', _topicId: 't', _level: 0 },
    { english: 'Zucchero filato', context: 'net', _topicId: 't', _level: 0 },
    { english: 'Bicicletta', context: 'net', _topicId: 't', _level: 0 },
    { english: 'Pallacanestro', context: 'net', _topicId: 't', _level: 0 },
  ];
  const correct = { english: 'Rete locale estesa', context: 'net', _topicId: 't', _level: 9 };

  it('gives a strong learner the confusable options', () => {
    const picked = svc.selectDistractors(correct, pool, 2, 0.95).map((i) => i.english);
    expect(picked).toContain('Rete locale');
  });

  it('gives a struggling learner clearly different options', () => {
    const picked = svc.selectDistractors(correct, pool, 2, 0.05).map((i) => i.english);
    expect(picked).not.toContain('Rete locale');
  });

  it('honours the field option so Italian answers can be ranked', () => {
    const italianPool = [
      { english: 'x', italian: 'Modello OSI', context: 'net', _topicId: 't', _level: 0 },
      { english: 'y', italian: 'Bicicletta rossa', context: 'net', _topicId: 't', _level: 0 },
      { english: 'z', italian: 'Modello TCP/IP', context: 'net', _topicId: 't', _level: 0 },
    ];
    const target = {
      english: 'q',
      italian: 'Modello OSI/RM',
      context: 'net',
      _topicId: 't',
      _level: 1,
    };
    const picked = svc
      .selectDistractors(target, italianPool, 1, 0.9, { field: 'italian' })
      .map((i) => i.italian);
    expect(picked[0]).toMatch(/Modello/);
  });
});

describe('TopicPracticeManager — adaptive session plan', () => {
  let TopicPracticeManager;

  beforeEach(async () => {
    globalThis.window = {
      speechSynthesis: {
        speak: vi.fn(),
        cancel: vi.fn(),
        getVoices: vi.fn(() => []),
        addEventListener: vi.fn(),
      },
      AudioContext: vi.fn(() => ({})),
      webkitAudioContext: vi.fn(() => ({})),
    };
    globalThis.SpeechSynthesisUtterance = class {
      constructor(text) {
        this.text = text;
      }

      addEventListener() {}
    };
    globalThis.document = {
      querySelectorAll: vi.fn(() => []),
      addEventListener: vi.fn(),
      createElement: vi.fn(() => ({
        className: '',
        type: '',
        title: '',
        dataset: {},
        innerHTML: '',
        style: {},
        addEventListener: vi.fn(),
      })),
    };
    globalThis.CSS = { escape: (s) => s };
    globalThis.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn() }));
    vi.resetModules();
    ({ TopicPracticeManager } = await import('../js/topics/TopicPracticeManager.js'));
  });

  const richPool = Array.from({ length: 12 }, (_, i) => ({
    english: `Term${i}`,
    italian: `Traduzione numero ${i}`,
    context: 'net',
    example: `Term${i} routes the packet = Term${i} instrada il pacchetto`,
    command: `run-${i} --flag`,
    _topicId: 't',
    _level: 0,
  }));

  it('plans more than one question format in a single session', () => {
    const tpm = new TopicPracticeManager();
    tpm.currentTopicId = 't';
    tpm.currentLevel = 0;
    tpm.fullPool = richPool;
    tpm.buildContextIndex(richPool);
    tpm.generateQuestions('adaptive', richPool);

    const modes = new Set(tpm.adaptivePlan.map((entry) => entry.mode));
    expect(tpm.adaptivePlan.length).toBeGreaterThan(0);
    expect(modes.size).toBeGreaterThan(1);
  });

  it('never plans a format the item cannot support', () => {
    const tpm = new TopicPracticeManager();
    tpm.currentTopicId = 't';
    tpm.currentLevel = 0;
    // No example, no command, no code: only the translation formats apply.
    const bare = Array.from({ length: 6 }, (_, i) => ({
      english: `Bare${i}`,
      italian: `Glossa ${i}`,
      context: 'net',
      _topicId: 't',
      _level: 0,
    }));
    tpm.fullPool = bare;
    tpm.buildContextIndex(bare);
    tpm.generateQuestions('adaptive', bare);

    for (const entry of tpm.adaptivePlan) {
      expect(['listening', 'matching', 'writing']).toContain(entry.mode);
    }
  });

  it('does not offer context questions when the level has one context', () => {
    const tpm = new TopicPracticeManager();
    tpm.currentTopicId = 't';
    tpm.currentLevel = 0;
    tpm.fullPool = richPool;
    tpm.buildContextIndex(richPool);
    tpm.generateQuestions('adaptive', richPool);
    expect(tpm.adaptivePlan.some((e) => e.mode === 'context')).toBe(false);
  });

  it('avoids running the same format twice in a row where the item allows it', () => {
    const tpm = new TopicPracticeManager();
    tpm.currentTopicId = 't';
    tpm.currentLevel = 0;
    tpm.fullPool = richPool;
    tpm.buildContextIndex(richPool);
    tpm.generateQuestions('adaptive', richPool);

    const modes = tpm.adaptivePlan.map((e) => e.mode);
    for (let i = 1; i < modes.length; i += 1) {
      expect(modes[i]).not.toBe(modes[i - 1]);
    }
  });
});
