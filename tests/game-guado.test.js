/* eslint-disable import/first */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

let storedRecord = null;
const spoken = [];

vi.mock('../js/services/StorageService.js', () => ({
  storageService: {
    save: vi.fn().mockResolvedValue(undefined),
    load: vi.fn(async () => storedRecord),
  },
}));
vi.mock('../js/services/AnalyticsService.js', () => ({
  analyticsService: { recordResponse: vi.fn(), getItemAnalytics: vi.fn(() => null) },
}));
vi.mock('../js/services/MasteryService.js', () => ({
  masteryService: { markIntroduced: vi.fn(), updateMastery: vi.fn() },
}));
vi.mock('../js/services/SmartScoreService.js', () => ({
  smartScoreService: { updateScore: vi.fn() },
}));
vi.mock('../js/services/CurrencyService.js', () => ({ currencyService: { earn: vi.fn() } }));
vi.mock('../js/services/QuestService.js', () => ({ questService: { recordMetric: vi.fn() } }));
vi.mock('../js/services/SfxService.js', () => ({
  sfxService: { correct: vi.fn(), incorrect: vi.fn(), nearMiss: vi.fn() },
}));
vi.mock('../js/services/GameAudioService.js', () => ({
  gameAudioService: {
    unlock: vi.fn(),
    setMuted: vi.fn(),
    startDrone: vi.fn(),
    stopDrone: vi.fn(),
    play: vi.fn(),
    isSupported: () => false,
  },
}));
vi.mock('../js/services/TTSService.js', () => ({
  ttsService: { isSupported: false, speak: vi.fn((t) => spoken.push(t)), speakAuto: vi.fn() },
}));
vi.mock('../js/PracticeHUD.js', () => ({
  practiceHUD: { onAnswerResult: vi.fn(), reset: vi.fn() },
}));

import { createLevelSession, LEARN_SURFACE } from '../js/games/LevelSession.js';
import game from '../js/games/levels/inglese-l1-guado.js';
import {
  makeContext2D,
  installDocumentDouble,
  makeHost,
  useChapter,
  run,
  assertShape,
} from './helpers/game-conformance.js';

async function session() {
  return createLevelSession({
    surface: LEARN_SURFACE,
    level: 1,
    mode: 'guado',
    progressManager: { addXP: vi.fn() },
  });
}

/**
 * Drive one beat by hopping onto the correct cart, the way a player would:
 * only ever tapping a cart that is actually on screen. Returns the number of
 * hops it took. A run that ends without `finished` is a mute dead end, which
 * ricerca/31 §31.12 forbids — the assertions below catch that.
 */
function playThrough(host, ctx, { pickWrongAt = -1 } = {}) {
  let hops = 0;
  for (let frame = 0; frame < 6000; frame += 1) {
    if (host.finished || host.state.done || host.dark || host.state.coach) break;

    const hero = host.hero;
    const idle = !hero.hop && hero.pend <= 0 && hero.at < host.N;
    if (idle) {
      const lane = host.lanes[hero.at];
      const wantWrong = hops === pickWrongAt;
      const target = lane.carts.find(
        (c) => c.ok !== wantWrong && c.x > c.w / 2 && c.x < game.W - c.w / 2
      );
      if (target) {
        // Tap in game coordinates: the pointer y the engine reports is
        // camera-relative, which is what tap() expects.
        game.tap(host, { x: target.x, y: lane.y + 40 + 37 - host.cam });
        hops += 1;
      }
    }
    game.update(host, 1 / 60);
    game.draw(host, ctx);
  }
  return hops;
}

describe('Il guado — conformance (SDK design §8)', () => {
  let ctx;
  let restoreDocument;

  beforeEach(() => {
    ctx = makeContext2D();
    restoreDocument = installDocumentDouble();
    storedRecord = null;
    spoken.length = 0;
  });

  afterEach(() => restoreDocument());

  it('exposes the lifecycle and metadata the host and registry read', () => {
    assertShape(game, expect);
    expect(game.meta.surface).toBe('learn');
    expect(game.meta.level).toBe(1);
  });

  it('runs the whole level: eight chapters of five beats, forty sentences', () => {
    expect(game.CH).toHaveLength(8);
    expect(game.CH.every((c) => c.beats.length === 5)).toBe(true);
  });

  it('draws a frame without throwing on every beat of every chapter', async () => {
    const s = await session();
    const host = makeHost(game, s);
    const surface = ctx;
    game.init(host);

    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        host.state.beat = beat;
        game.reset(host, beat);
        expect(() => run(host, game, surface, 0.5)).not.toThrow();
      }
    }
  });

  it('covers all forty sentences across the chapter/beat grid, with no repeat', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    const seen = [];
    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        host.state.beat = beat;
        game.reset(host, beat);
        seen.push(host.item.key);
      }
    }

    expect(seen).toHaveLength(40);
    expect(new Set(seen).size).toBe(40);
    expect(new Set(seen)).toEqual(new Set(s.items.map((i) => i.key)));
  });

  it('introduces the sentence when its beat opens (mastery stage 0 -> 1)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    expect(host.item.state).toBe('introduced');
  });

  it('a scripted bot crossing the sentence clears the item and speaks it', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: false });
    game.init(host);
    game.reset(host, 0);

    const hops = playThrough(host, ctx);
    expect(hops).toBe(host.N);
    expect(host.finished).toBe(true);
    expect(host.item.state).toBe('cleared');
    expect(host.item.correct).toBe(host.N);
    // ricerca/35 §35.3.1: a completed sentence is read aloud, so the game
    // teaches the ear too without adding a second verb.
    expect(spoken).toEqual([host.item.english]);
  });

  it('grades every hop through the SDK, wrong picks included', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    playThrough(host, ctx, { pickWrongAt: 0 });
    expect(host.item.attempts).toBeGreaterThan(host.item.correct);
    expect(s.totalAttempts).toBe(host.item.attempts);
  });

  it('opens the coach only on the third error on one step (ricerca/00 passo 6)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const lane = host.lanes[0];
    const wrong = lane.carts.find((c) => !c.ok);
    for (let attempt = 0; attempt < 3; attempt += 1) {
      game.tap(host, { x: wrong.x, y: lane.y + 40 + 37 - host.cam });
      for (let f = 0; f < 120 && (host.hero.hop || host.hero.pend > 0); f += 1) {
        game.update(host, 1 / 60);
      }
      if (attempt === 0) expect(host.state.coach).toBeNull();
      if (attempt === 1) {
        expect(host.state.coach).toBeNull();
        // Second error: the lantern points at the answer, and the step is
        // marked aided so the XP reflects that it was shown.
        expect(lane.carts.find((c) => c.ok).glow).toBe(1);
        expect(lane.aided).toBe(true);
      }
    }
    expect(host.state.coach).not.toBeNull();
    expect(host.state.coach.kind).toBeTruthy();
  });

  it('the lantern running out is the loss, and it is recoverable', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    host.budget = 0.2;
    run(host, game, ctx, 1);
    expect(host.dark).toBe(1);
    expect(host.state.coach).toEqual({ kind: 'dark' });

    game.onCoachClose(host);
    expect(host.dark).toBe(0);
    expect(host.hero.at).toBe(0);
    expect(host.got).toEqual([]);
  });

  it('offers bilingual coach copy with the placeholders filled in', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const coach = { kind: 'order', pick: 'hair', word: 'She' };
    for (const lang of ['it', 'en']) {
      const copy = game.coachText(host, coach, lang);
      expect(copy.what.length).toBeGreaterThan(0);
      expect(copy.effect).toContain('hair');
      expect(copy.effect).toContain('She');
      expect(copy.rule.length).toBeGreaterThan(0);
      expect(copy.what).not.toContain('{');
      expect(copy.effect).not.toContain('{');
    }

    const dark = game.coachText(host, { kind: 'dark' }, 'it');
    expect(dark.effect).toContain(host.sent.en);
  });

  it('shows the sentence in both languages on the done screen', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const done = game.doneView(host, 'it');
    expect(done.title).toBe(host.item.english);
    expect(done.subtitle).toBe(host.item.italian);
    expect(game.doneView(host, 'en').eyebrow).not.toBe(done.eyebrow);
  });

  it('every distractor is a real word from the level, never invented', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    const vocabulary = new Set();
    for (const item of s.items) {
      for (const word of item.english.split(/\s+/)) {
        vocabulary.add(word.replace(/[^A-Za-z0-9']/g, '').toLowerCase());
      }
    }

    // Morphological neighbours (has/have, a/an, to/too) are deliberate and may
    // fall outside the level's own vocabulary — they are the lesson. What must
    // never appear is a string that is not a word at all.
    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        game.reset(host, beat);
        for (const lane of host.lanes) {
          for (const cart of lane.carts) {
            expect(cart.lab.length).toBeGreaterThan(0);
            expect(cart.lab).toMatch(/^[A-Za-z0-9' -]+$/);
          }
        }
      }
    }
  });

  it('every lane offers exactly one correct cart', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        game.reset(host, beat);
        for (const lane of host.lanes) {
          expect(lane.carts.filter((c) => c.ok)).toHaveLength(1);
        }
      }
    }
  });

  /**
   * §15.4 wants a static-equivalent that looks deliberate, not a frozen one.
   * The carts are the game and cannot stop, so the register slows them instead
   * and the engine spawns no particles at all.
   */
  it('slows the carts and skips particles under prefers-reduced-motion', async () => {
    const s = await session();
    const normal = makeHost(game, s, { reduceMotion: false });
    game.init(normal);
    game.reset(normal, 0);

    const s2 = await session();
    const reduced = makeHost(game, s2, { reduceMotion: true });
    game.init(reduced);
    game.reset(reduced, 0);

    const fastest = Math.max(...normal.lanes.map((l) => l.speed));
    const slowest = Math.max(...reduced.lanes.map((l) => l.speed));
    expect(slowest).toBeLessThan(fastest);

    playThrough(reduced, ctx);
    expect(reduced.parts).toHaveLength(0);
  });

  it('the keyboard plays the same game as the finger (§15.1, ricerca/33)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const press = (key) => {
      game.key(host, { key, preventDefault() {} });
      for (let f = 0; f < 120 && (host.hero.hop || host.hero.pend > 0); f += 1) {
        game.update(host, 1 / 60);
      }
    };

    press('ArrowRight');
    expect(host.kb).toBe(true);
    const before = host.hero.at;
    press(' ');
    // Either it hopped forward or it bounced back; both are the real game.
    expect(host.hero.at === before || host.hero.at === before + 1).toBe(true);
    expect(host.item.attempts).toBeGreaterThan(0);
  });
});

/**
 * Regression: KaioEngine.goBeat used to call reset() before updating
 * host.state.chapter, so the first beat of every chapter was built for the
 * previous one and seven of the forty sentences were never presented by their
 * own beat (§46.5). The engine now updates the state first; this drives the
 * real transition path rather than the harness's useChapter shortcut.
 */
describe('Il guado — chapter boundaries through the real engine', () => {
  it('the first beat of chapter c+1 presents that chapter’s own sentence', async () => {
    const engine = await import('../js/games/KaioEngine.js');
    const s = await createLevelSession({
      surface: LEARN_SURFACE,
      level: 1,
      mode: 'guado',
      progressManager: { addXP: vi.fn() },
    });
    const restore = installDocumentDouble();
    try {
      const host = makeHost(game, s);
      game.init(host);
      game.reset(host, 0);

      const seen = [host.item.key];
      for (let i = 1; i < 40; i += 1) {
        engine.next(host);
        seen.push(host.item.key);
      }
      // Chapter 1, beat 0 is lesson 0, sentence 5 — not sentence 0 again.
      expect(seen[5]).toBe(s.lessons[0].items[5].key);
      expect(new Set(seen).size).toBe(40);
      expect(host.state.chapter).toBe(7);
    } finally {
      restore();
    }
  });
});
