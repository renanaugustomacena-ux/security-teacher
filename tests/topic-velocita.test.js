/* eslint-disable import/first */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('../js/services/SfxService.js', () => ({
  sfxService: {
    metronome: vi.fn(),
    correct: vi.fn(),
    incorrect: vi.fn(),
    levelUp: vi.fn(),
  },
}));

vi.mock('../js/PracticeHUD.js', () => ({
  practiceHUD: {
    reset: vi.fn(),
    onAnswerResult: vi.fn(),
  },
}));

describe('TopicVelocita', () => {
  let TopicVelocita;
  let storage;

  beforeEach(async () => {
    storage = new Map();
    globalThis.localStorage = {
      getItem: vi.fn((k) => storage.get(k) ?? null),
      setItem: vi.fn((k, v) => storage.set(k, v)),
      removeItem: vi.fn((k) => storage.delete(k)),
    };
    globalThis.window = {
      topicManager: null,
    };
    globalThis.document = {
      getElementById: vi.fn(() => null),
      querySelectorAll: vi.fn(() => []),
      createElement: vi.fn(() => ({
        className: '',
        innerHTML: '',
        style: {},
        addEventListener: vi.fn(),
      })),
    };
    globalThis.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn() }));

    vi.useFakeTimers();
    vi.resetModules();
    ({ TopicVelocita } = await import('../js/topics/TopicVelocita.js'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ── 1. Constructor defaults ──────────────────────────────────────────
  it('constructor initialises with sane defaults', () => {
    const pm = { addXP: vi.fn() };
    const tv = new TopicVelocita(pm);

    expect(tv.progressManager).toBe(pm);
    expect(tv.durationMs).toBe(60_000);
    expect(tv.running).toBe(false);
    expect(tv.combo).toBe(0);
    expect(tv.maxCombo).toBe(0);
    expect(tv.correct).toBe(0);
    expect(tv.attempts).toBe(0);
    expect(tv.sessionXP).toBe(0);
  });

  // ── 2. buildQuestions returns [] when pool is too small ──────────────
  it('buildQuestions returns empty array when pool has fewer than 4 usable items', () => {
    const tv = new TopicVelocita(null);
    expect(tv.buildQuestions([])).toEqual([]);
    expect(tv.buildQuestions([{ english: 'a', italian: 'b' }])).toEqual([]);
    expect(
      tv.buildQuestions([
        { english: 'a', italian: 'b' },
        { english: 'c', italian: 'd' },
        { english: 'e', italian: 'f' },
      ])
    ).toEqual([]);
    // Items missing english/italian are filtered out
    expect(
      tv.buildQuestions([
        { english: 'a', italian: 'b' },
        { english: 'c', italian: 'd' },
        { english: 'e', italian: 'f' },
        { italian: 'only-italian' },
      ])
    ).toEqual([]);
  });

  // ── 3. buildQuestions produces valid 4-option questions ───────────────
  it('buildQuestions generates questions with 4 options including the correct answer', () => {
    const pool = [
      { english: 'kernel', italian: 'nucleo' },
      { english: 'thread', italian: 'filo' },
      { english: 'shell', italian: 'shell di sistema' },
      { english: 'daemon', italian: 'demone' },
      { english: 'socket', italian: 'presa' },
    ];
    const tv = new TopicVelocita(null);
    const questions = tv.buildQuestions(pool);

    expect(questions.length).toBe(pool.length);
    for (const q of questions) {
      expect(q.options).toHaveLength(4);
      expect(q.options).toContain(q.italian);
      // All options are unique
      expect(new Set(q.options).size).toBe(4);
    }
  });

  // ── 4. start() configures duration and flips running flag ────────────
  it('start(60) and start(90) set correct durationMs and running=true', () => {
    const tv = new TopicVelocita(null);
    tv.pool = [
      { english: 'a', italian: 'w' },
      { english: 'b', italian: 'x' },
      { english: 'c', italian: 'y' },
      { english: 'd', italian: 'z' },
    ];

    tv.start(60);
    expect(tv.durationMs).toBe(60_000);
    expect(tv.running).toBe(true);
    tv.abort();

    tv.start(90);
    expect(tv.durationMs).toBe(90_000);
    expect(tv.running).toBe(true);
    tv.abort();
  });

  // ── 5. abort() tears down running state and clears timers ────────────
  it('abort() sets running=false and nulls all timers', () => {
    const tv = new TopicVelocita(null);
    tv.pool = [
      { english: 'a', italian: 'w' },
      { english: 'b', italian: 'x' },
      { english: 'c', italian: 'y' },
      { english: 'd', italian: 'z' },
    ];

    tv.start(60);
    expect(tv.running).toBe(true);
    expect(tv.sessionTimer).not.toBeNull();
    expect(tv.metronomeTimer).not.toBeNull();

    tv.abort();
    expect(tv.running).toBe(false);
    expect(tv.sessionTimer).toBeNull();
    expect(tv.metronomeTimer).toBeNull();
    expect(tv.questionTimer).toBeNull();
  });

  // ── 6. finish() computes score and calls progressManager.addXP ──────
  it('finish() computes score = correct*10 + maxCombo*5 and awards 40% as XP', () => {
    const pm = { addXP: vi.fn() };
    const tv = new TopicVelocita(pm);

    // Pre-set session state as if a run happened
    tv.running = true;
    tv.correct = 10;
    tv.maxCombo = 5;
    tv.attempts = 12;
    tv.durationMs = 60_000;
    tv.topicId = 'linux';
    tv.levelNum = 3;
    tv.startedAt = Date.now();

    tv.finish();

    // score = 10*10 + 5*5 = 125; XP = round(125 * 0.4) = 50
    expect(pm.addXP).toHaveBeenCalledWith(50);
    expect(tv.running).toBe(false);

    // Verify a record was saved to localStorage
    expect(globalThis.localStorage.setItem).toHaveBeenCalled();
    const saved = JSON.parse(storage.get('velocita-records-v1'));
    expect(saved).toHaveLength(1);
    expect(saved[0].score).toBe(125);
    expect(saved[0].accuracy).toBeCloseTo(10 / 12, 5);
  });
});
