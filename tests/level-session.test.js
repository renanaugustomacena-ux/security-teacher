/* eslint-disable import/first */
import { describe, it, expect, beforeEach, vi } from 'vitest';

const recorded = [];
const masteryCalls = { introduced: [], updated: [] };
const smartScoreCalls = [];
const questMetrics = [];
const currencyEarned = [];
const saved = [];
let storedRecord = null;

vi.mock('../js/services/StorageService.js', () => ({
  storageService: {
    save: vi.fn(async (store, data) => {
      saved.push({ store, data });
    }),
    load: vi.fn(async () => storedRecord),
  },
}));

vi.mock('../js/services/AnalyticsService.js', () => ({
  analyticsService: {
    recordResponse: vi.fn((r) => recorded.push(r)),
    getItemAnalytics: vi.fn(() => ({
      totalAttempts: 1,
      accuracy: 1,
      masteryP: 0.4,
      consecutiveFails: 0,
      modeAccuracy: { guado: { correct: 1, total: 1 } },
      lastCorrect: '2026-09-03T00:00:00.000Z',
    })),
  },
}));

vi.mock('../js/services/MasteryService.js', () => ({
  masteryService: {
    markIntroduced: vi.fn((k) => masteryCalls.introduced.push(k)),
    updateMastery: vi.fn((k) => masteryCalls.updated.push(k)),
  },
}));

vi.mock('../js/services/SmartScoreService.js', () => ({
  smartScoreService: {
    updateScore: vi.fn((surface, level, correct) =>
      smartScoreCalls.push({ surface, level, correct })
    ),
  },
}));

vi.mock('../js/services/CurrencyService.js', () => ({
  currencyService: { earn: vi.fn((n, reason) => currencyEarned.push({ n, reason })) },
}));

vi.mock('../js/services/QuestService.js', () => ({
  questService: { recordMetric: vi.fn((m, v) => questMetrics.push({ m, v })) },
}));

vi.mock('../js/services/SfxService.js', () => ({
  sfxService: { correct: vi.fn(), incorrect: vi.fn(), nearMiss: vi.fn() },
}));

vi.mock('../js/PracticeHUD.js', () => ({
  practiceHUD: { onAnswerResult: vi.fn(), reset: vi.fn() },
}));

import { createLevelSession, LEARN_SURFACE } from '../js/games/LevelSession.js';

async function freshSession() {
  return createLevelSession({
    surface: LEARN_SURFACE,
    level: 1,
    mode: 'guado',
    progressManager: { addXP: vi.fn() },
  });
}

describe('LevelSession — the ledger', () => {
  beforeEach(() => {
    recorded.length = 0;
    masteryCalls.introduced.length = 0;
    masteryCalls.updated.length = 0;
    smartScoreCalls.length = 0;
    questMetrics.length = 0;
    currencyEarned.length = 0;
    saved.length = 0;
    storedRecord = null;
  });

  it('flattens the level into item handles, four lessons of ten', async () => {
    const session = await freshSession();
    expect(session.items).toHaveLength(40);
    expect(session.lessons).toHaveLength(4);
    expect(session.lessons.every((l) => l.items.length === 10)).toBe(true);
  });

  it('keys items the way the legacy call site does, so analytics aggregate', async () => {
    const session = await freshSession();
    const item = session.items[0];
    expect(item.key).toBe(`learn:1:describing_people:${item.english}`);
  });

  it('returns null for a level that does not exist', async () => {
    const none = await createLevelSession({ surface: LEARN_SURFACE, level: 99, mode: 'guado' });
    expect(none).toBeNull();
  });

  it('walks unseen -> introduced -> attempted -> cleared and never backwards', async () => {
    const session = await freshSession();
    const item = session.items[0];

    expect(item.state).toBe('unseen');
    item.introduce();
    expect(item.state).toBe('introduced');
    expect(masteryCalls.introduced).toEqual([item.key]);

    item.introduce();
    expect(masteryCalls.introduced).toHaveLength(1);

    item.attempt('nonsense', { expected: 'She', silent: true });
    expect(item.state).toBe('attempted');

    item.clear();
    expect(item.state).toBe('cleared');

    item.introduce();
    item.attempt('nonsense', { expected: 'She', silent: true });
    expect(item.state).toBe('cleared');
  });

  it('counts progress across the four states', async () => {
    const session = await freshSession();
    session.items[0].introduce();
    session.items[1].introduce();
    session.items[1].attempt('She', { expected: 'She', silent: true });
    session.items[1].clear();

    const p = session.progress();
    expect(p).toMatchObject({ introduced: 2, attempted: 1, cleared: 1, total: 40 });
  });
});

describe('LevelItem.attempt — grading', () => {
  beforeEach(() => {
    recorded.length = 0;
    smartScoreCalls.length = 0;
    currencyEarned.length = 0;
  });

  it('accepts an exact match', async () => {
    const session = await freshSession();
    const v = session.items[0].attempt('curly', { expected: 'curly', silent: true });
    expect(v.correct).toBe(true);
    expect(v.partial).toBe(false);
    expect(v.xp).toBeGreaterThan(0);
  });

  it('ignores case and trailing punctuation', async () => {
    const session = await freshSession();
    const v = session.items[0].attempt('Curly,', { expected: 'curly', silent: true });
    expect(v.correct).toBe(true);
  });

  it('forgives a missing accent — Italian keyboards typing English', async () => {
    const session = await freshSession();
    const v = session.items[0].attempt('perche', { expected: 'perché', silent: true });
    expect(v.correct).toBe(true);
  });

  it('gives partial credit for a near miss and halves the XP', async () => {
    const session = await freshSession();
    const item = session.items[0];
    const exact = item.attempt('confident', { expected: 'confident', silent: true });
    session.streak = 0;
    const typo = item.attempt('confidnet', { expected: 'confident', silent: true });

    expect(typo.correct).toBe(false);
    expect(typo.partial).toBe(true);
    expect(typo.distance).toBeGreaterThan(0);
    expect(typo.xp).toBeGreaterThan(0);
    expect(typo.xp).toBeLessThan(exact.xp);
  });

  it('rejects a real miss and breaks the streak', async () => {
    const session = await freshSession();
    const item = session.items[0];
    item.attempt('has', { expected: 'has', silent: true });
    expect(session.streak).toBe(1);
    const v = item.attempt('elephant', { expected: 'has', silent: true });
    expect(v.correct).toBe(false);
    expect(v.partial).toBe(false);
    expect(v.xp).toBe(0);
    expect(session.streak).toBe(0);
  });

  it('applies the §29.2 hint penalty', async () => {
    const session = await freshSession();
    const item = session.items[0];
    const clean = item.attempt('tall', { expected: 'tall', responseMs: 1000, silent: true });
    session.streak = 0;
    const hinted = item.attempt('tall', {
      expected: 'tall',
      responseMs: 1000,
      hintsUsed: 2,
      silent: true,
    });
    expect(hinted.xp).toBeLessThan(clean.xp);
    expect(hinted.xp).toBe(Math.round(clean.xp * 0.5));
  });

  /**
   * Regression for the defect the SDK design records in §1.1: the legacy call
   * site passed the *correct* answer as `userAnswer`, so `_trackError` recorded
   * the right answer as if it were wrong and §27 confusion pairs ran on
   * meaningless data. The two fields must never be the same string when the
   * learner was wrong.
   */
  it('records the learner answer and the expected answer as distinct fields', async () => {
    const session = await freshSession();
    session.items[0].attempt('have', { expected: 'has', silent: true });

    expect(recorded).toHaveLength(1);
    const r = recorded[0];
    expect(r.userAnswer).toBe('have');
    expect(r.expectedAnswer).toBe('has');
    expect(r.userAnswer).not.toBe(r.expectedAnswer);
    expect(r.correct).toBe(false);
    expect(r.exerciseMode).toBe('guado');
  });

  it('feeds SmartScore and the coin purse only on a correct answer', async () => {
    const session = await freshSession();
    const item = session.items[0];
    item.attempt('has', { expected: 'has', silent: true });
    item.attempt('nope', { expected: 'has', silent: true });

    expect(smartScoreCalls).toEqual([
      { surface: 'learn', level: 1, correct: true },
      { surface: 'learn', level: 1, correct: false },
    ]);
    expect(currencyEarned).toEqual([{ n: 1, reason: 'game_correct' }]);
  });
});

describe('LevelSession.finish — the ledger invariant', () => {
  beforeEach(() => {
    recorded.length = 0;
    masteryCalls.updated.length = 0;
    questMetrics.length = 0;
    currencyEarned.length = 0;
    saved.length = 0;
    storedRecord = null;
  });

  it('refuses to pass a level with uncovered items (§4.3)', async () => {
    const session = await freshSession();
    session.items[0].attempt('has', { expected: 'has', silent: true });

    const result = session.finish();
    expect(result.passed).toBe(false);
    expect(result.missed).toHaveLength(39);
    expect(result.coverage).toBeCloseTo(1 / 40);
  });

  it('passes when every item has been attempted', async () => {
    const session = await freshSession();
    for (const item of session.items) {
      item.introduce();
      item.attempt(item.english, { expected: item.english, silent: true });
      item.clear();
    }

    const result = session.finish();
    expect(result.passed).toBe(true);
    expect(result.missed).toEqual([]);
    expect(result.coverage).toBe(1);
    expect(result.accuracy).toBe(1);
    expect(currencyEarned).toContainEqual({ n: 10, reason: 'perfect_game' });
  });

  it('batches the mastery update over attempted items only', async () => {
    const session = await freshSession();
    session.items[0].attempt('has', { expected: 'has', silent: true });
    session.items[1].introduce();

    session.finish();
    expect(masteryCalls.updated).toEqual([session.items[0].key]);
  });

  it('reports the session to the quest ledger', async () => {
    const session = await freshSession();
    session.items[0].attempt('has', { expected: 'has', silent: true });
    session.finish();
    expect(questMetrics.map((q) => q.m)).toEqual(
      expect.arrayContaining(['practiceCount', 'sessionXP', 'weekXP', 'maxStreak'])
    );
  });
});

describe('LevelSession — persistence across sittings', () => {
  beforeEach(() => {
    saved.length = 0;
    storedRecord = null;
  });

  it('namespaces the record by surface and level', async () => {
    const session = await freshSession();
    expect(session.storeKey).toBe('game:learn:1');
  });

  it('saves the ledger with the chapter and beat the game was on', async () => {
    const session = await freshSession();
    session.items[0].introduce();
    session.items[0].attempt('has', { expected: 'has', silent: true });
    session.items[0].clear();
    await session.save({ chapter: 2, beat: 3 });

    expect(saved).toHaveLength(1);
    expect(saved[0].store).toBe('progress');
    expect(saved[0].data).toMatchObject({
      userId: 'game:learn:1',
      chapter: 2,
      beat: 3,
      cleared: [session.items[0].key],
    });
  });

  it('restores item states and the resume point', async () => {
    const first = await freshSession();
    const key = first.items[2].key;
    storedRecord = { userId: 'game:learn:1', cleared: [key], attempted: [], chapter: 4, beat: 1 };

    const second = await freshSession();
    const resume = await second.restore();
    expect(resume).toEqual({ chapter: 4, beat: 1 });
    expect(second.items[2].state).toBe('cleared');
    expect(second.items[0].state).toBe('unseen');
  });

  it('starts from the top when nothing was stored', async () => {
    const session = await freshSession();
    expect(await session.restore()).toEqual({ chapter: 0, beat: 0 });
  });
});

describe('LevelSession — completing a level once (§46.5)', () => {
  beforeEach(() => {
    saved.length = 0;
    storedRecord = null;
    questMetrics.length = 0;
    currencyEarned.length = 0;
  });

  function clearEverything(session) {
    for (const item of session.items) {
      item.introduce();
      item.attempt(item.english, { expected: item.english, silent: true });
      item.clear();
    }
  }

  it('is covered only when every item has been cleared', async () => {
    const session = await freshSession();
    expect(session.isCovered()).toBe(false);
    clearEverything(session);
    session.items[5].state = 'attempted';
    expect(session.isCovered()).toBe(false);
    session.items[5].state = 'cleared';
    expect(session.isCovered()).toBe(true);
  });

  it('complete() closes the ledger once and persists the flag', async () => {
    const session = await freshSession();
    clearEverything(session);

    const result = session.complete();
    expect(result.passed).toBe(true);
    expect(session.completed).toBe(true);

    // A second call awards nothing: no second quest metric, no second purse.
    expect(session.complete()).toBeNull();
    expect(questMetrics.filter((q) => q.m === 'practiceCount')).toHaveLength(1);
    expect(currencyEarned.filter((c) => c.reason === 'perfect_game')).toHaveLength(1);

    await session.save({ chapter: 7, beat: 4 });
    expect(saved[0].data.completed).toBe(true);
  });

  it('does not mark the level completed when finish() refuses it', async () => {
    const session = await freshSession();
    session.items[0].attempt('has', { expected: 'has', silent: true });
    const result = session.complete();
    expect(result.passed).toBe(false);
    expect(session.completed).toBe(false);
    await session.save({ chapter: 0, beat: 1 });
    expect(saved[0].data.completed).toBe(false);
  });

  it('restores the completed flag so a replay never awards the level twice', async () => {
    const first = await freshSession();
    storedRecord = {
      userId: 'game:learn:1',
      cleared: first.items.map((i) => i.key),
      attempted: [],
      completed: true,
      chapter: 7,
      beat: 4,
    };
    const second = await freshSession();
    await second.restore();
    expect(second.completed).toBe(true);
    expect(second.isCovered()).toBe(true);
    expect(second.complete()).toBeNull();
    expect(questMetrics).toHaveLength(0);
  });
});
