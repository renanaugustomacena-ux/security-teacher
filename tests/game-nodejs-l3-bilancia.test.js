/* eslint-disable import/first */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

let storedRecord = null;

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
  ttsService: { isSupported: false, speak: vi.fn(), speakAuto: vi.fn() },
}));
vi.mock('../js/PracticeHUD.js', () => ({
  practiceHUD: { onAnswerResult: vi.fn(), reset: vi.fn() },
}));

import { analyticsService } from '../js/services/AnalyticsService.js';
import { storageService } from '../js/services/StorageService.js';
import * as engine from '../js/games/KaioEngine.js';
import { createLevelSession } from '../js/games/LevelSession.js';
import { beatItems, meaningOf, pickLang } from '../js/games/LevelBeats.js';
import game from '../js/games/levels/nodejs-l3-bilancia.js';
import {
  makeContext2D,
  installDocumentDouble,
  makeHost,
  useChapter,
  run,
  assertShape,
} from './helpers/game-conformance.js';

const STEP = 1 / 60;
const FLY_S = 0.32;
const DROP_S = 0.55;
const BEAT_CAP = 4000;

async function session() {
  return createLevelSession({
    surface: 'nodejs',
    level: 2,
    mode: 'bilancia',
    progressManager: { addXP: vi.fn() },
  });
}

/** The tag rests on the left pan, nothing is in flight, the pan is not tipping. */
function ready(host) {
  return Boolean(
    host.sample &&
    host.landed &&
    !host.fly &&
    !host.hold &&
    !host.lift &&
    host.tipT <= 0 &&
    !host.finished
  );
}

function rightTile(host) {
  return host.basket.find((b) => !b.gone && b.item === host.sample) || null;
}

function wrongTile(host) {
  return host.basket.find((b) => !b.gone && b.item !== host.sample) || null;
}

function tapTile(host, tile) {
  game.tap(host, { x: tile.x, y: tile.y });
}

/** Step the simulation until a predicate holds, or a frame budget runs out. */
function until(host, pred, maxFrames = 3000) {
  let frames = 0;
  while (frames < maxFrames && !pred()) {
    game.update(host, STEP);
    frames += 1;
  }
  return frames;
}

function awaitReady(host) {
  return until(host, () => ready(host), 600);
}

/** After a tap: the tile flies, lands, is held; then the pan is free again. */
function settle(host) {
  until(host, () => !host.fly && !host.hold, 240);
}

function press(host, k) {
  game.key(host, { key: k, preventDefault() {} });
}

/**
 * Drive one order as a competent weigher would: whenever a tag rests on the
 * pan, put the tile with its term on the other pan. A run that never reaches
 * `done` is a mute dead end (ricerca/31 §31.12) — the assertions catch that.
 */
function playBeat(host, ctx, { maxFrames = BEAT_CAP, draw = true } = {}) {
  const weighed = [];
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    if (ready(host)) {
      const tile = rightTile(host);
      if (tile) {
        weighed.push(host.sample);
        tapTile(host, tile);
      }
    }
    game.update(host, STEP);
    if (draw) game.draw(host, ctx);
    frames += 1;
  }
  return { frames, weighed };
}

/** The same bot with no pointer: a digit picks the tile, Enter or space weighs. */
function playBeatByKeyboard(host, ctx, { maxFrames = BEAT_CAP } = {}) {
  const weighed = [];
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    if (ready(host)) {
      const tile = rightTile(host);
      if (tile) {
        weighed.push(host.sample);
        press(host, String(host.basket.indexOf(tile) + 1));
        press(host, weighed.length % 2 ? 'Enter' : ' ');
      }
    }
    game.update(host, STEP);
    game.draw(host, ctx);
    frames += 1;
  }
  return { frames, weighed };
}

/** Walk the level the way GameHost does: through the engine's own goBeat/next. */
function eachBeatViaEngine(host, fn) {
  engine.goBeat(host, 0, 0);
  for (let n = 0; n < 40; n += 1) {
    fn(host.state.chapter, host.state.beat);
    if (n < 39) engine.next(host);
  }
}

describe('La bilancia di notte — conformance (SDK design §8, DOCTRINE §46)', () => {
  let ctx;
  let restoreDocument;

  beforeEach(() => {
    ctx = makeContext2D();
    restoreDocument = installDocumentDouble();
    storedRecord = null;
    analyticsService.recordResponse.mockClear();
    storageService.save.mockClear();
  });

  afterEach(() => restoreDocument());

  it('exposes the lifecycle and metadata the host and registry read', () => {
    assertShape(game, expect);
    expect(game.meta.id).toBe('nodejs-l3-bilancia');
    expect(game.meta.surface).toBe('nodejs');
    expect(game.meta.level).toBe(2);
    expect(game.meta.register).toBe('R13');
    expect(game.meta.title).toBe('La bilancia di notte');
    expect(game.meta.titleEn).toBe('The night scales');
    expect(game.meta.levelLabel).toBe(
      'Node.js · L3 JavaScript Essenziale / Node.js · L3 Essential JavaScript'
    );
    expect(game.drone).toEqual({ freq: 50, type: 'triangle', volume: 0.012, lowpass: 140 });
    for (const fn of ['tap', 'key', 'coachText', 'doneView', 'onCoachClose']) {
      expect(typeof game[fn]).toBe('function');
    }
  });

  it("keeps the template's eight chapters of five orders, with its knobs", () => {
    expect(game.CH).toHaveLength(8);
    expect(game.CH.every((c) => c.beats.length === 5)).toBe(true);
    for (const c of game.CH) {
      for (const b of c.beats) {
        expect(Array.isArray(b.pool)).toBe(true);
        expect(b.win).toBeGreaterThanOrEqual(3);
        expect(b.slot).toBeGreaterThanOrEqual(1.8);
        expect(b.lives === 3 || b.lives === Infinity).toBe(true);
      }
    }
    // The first two orders cannot be lost; the peak of the last chapter asks nine.
    expect(game.CH[0].beats[0].lives).toBe(Infinity);
    expect(game.CH[0].beats[1].lives).toBe(Infinity);
    expect(game.CH[0].beats[2].lives).toBe(3);
    expect(game.CH[7].beats[3].win).toBe(9);
    expect(game.CH[7].beats[3].slot).toBe(1.9);
  });

  it('draws a frame without throwing on every order of every chapter', async () => {
    const s = await session();
    const host = makeHost(game, s);
    const surface = ctx;
    game.init(host);

    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        host.state.beat = beat;
        game.reset(host, beat);
        // 1.2 s: the tag has come down from the hook and the basket is dealt.
        expect(() => run(host, game, surface, 1.2)).not.toThrow();
        expect(host.sample).not.toBeNull();
        expect(host.landed).toBe(true);
        expect(host.basket.length).toBeGreaterThanOrEqual(3);
        expect(host.basket.length).toBeLessThanOrEqual(6);
      }
    }
  });

  it('follows the chapter the engine installed, so the forty orders cover the forty terms (§46.5)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    const keys = new Set();
    eachBeatViaEngine(host, (chapter, beat) => {
      expect(host.chapter, `chapter ${chapter} beat ${beat}`).toBe(chapter);
      expect(host.terms).toEqual(beatItems(s, chapter, beat));
      expect(host.terms).toHaveLength(1);
      expect(host.item).toBe(host.terms[0]);
      expect(host.lesson.id).toBe(host.item.lesson);
      // The order's own term is the first tag on the hook.
      expect(host.sample).toBe(host.item);
      expect(host.item.state).toBe('introduced');
      // The rest of the order is fillers from the same lesson, one per weighing.
      expect(host.queue).toHaveLength(host.cfg.win - 1);
      for (const f of host.queue) expect(f.lesson).toBe(host.item.lesson);
      for (const t of host.terms) keys.add(t.key);
    });
    expect(keys.size).toBe(40);
    expect(keys).toEqual(new Set(s.items.map((i) => i.key)));
  });

  it('a scripted bot closing one order clears its terms and persists the beat', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const term = host.item;
    const { frames, weighed } = playBeat(host, ctx);
    expect(frames).toBeLessThan(BEAT_CAP);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(host.made).toBe(host.cfg.win);
    expect(weighed).toHaveLength(host.cfg.win);
    expect(weighed[0]).toBe(term);
    for (const item of weighed) expect(item.state).toBe('cleared');
    expect(s.totalCorrect).toBe(host.cfg.win);
    expect(s.totalAttempts).toBe(host.cfg.win);
    expect(storageService.save).toHaveBeenCalledTimes(1);
    const [key, record] = storageService.save.mock.calls[0];
    expect(key).toBe('progress');
    expect(record).toEqual(expect.objectContaining({ beat: 0, chapter: 0 }));
    expect(new Set(record.cleared)).toEqual(new Set(weighed.map((i) => i.key)));
  });

  /**
   * §46.5: the whole level, order after order, under the bot through the
   * engine. Afterwards the ledger must let the level pass.
   */
  it('the bot playing all forty orders through the engine completes the level ledger', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    eachBeatViaEngine(host, (chapter, beat) => {
      const { frames } = playBeat(host, ctx, { draw: true });
      expect(frames, `chapter ${chapter} beat ${beat} hit the frame cap`).toBeLessThan(BEAT_CAP);
      expect(host.finished, `chapter ${chapter} beat ${beat} did not finish`).toBe(true);
      expect(host.state.done).toBe(true);
      expect(host.state.left).toBe(0);
      const saved = storageService.save.mock.calls.at(-1)[1];
      expect(saved).toEqual(expect.objectContaining({ beat, chapter }));
    });

    expect(s.progress().attempted).toBe(40);
    expect(s.progress().cleared).toBe(40);
    const result = s.finish();
    expect(result.passed).toBe(true);
    expect(result.missed).toEqual([]);
    expect(result.coverage).toBe(1);
  });

  it('grades a wrong weighing through the SDK with the real pick against the real target (§46.2)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    awaitReady(host);
    const sample = host.sample;
    const wrong = wrongTile(host);
    expect(wrong).not.toBeNull();
    tapTile(host, wrong);
    expect(host.fly).not.toBeNull();
    settle(host);

    expect(host.wrong).toBe(1);
    expect(host.state.left).toBe(1);
    expect(sample.state).toBe('attempted');
    expect(host.state.coach).toBeNull();
    expect(s.totalAttempts).toBe(1);
    expect(s.totalCorrect).toBe(0);

    const call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(false);
    expect(call.exerciseMode).toBe('bilancia');
    expect(call.userAnswer).toBe(wrong.item.english);
    expect(call.expectedAnswer).toBe(sample.english);
    expect(call.userAnswer).not.toBe(call.expectedAnswer);
    // The tag stays on the pan and the basket is re-dealt: same term, fresh tiles.
    expect(host.sample).toBe(sample);
    expect(host.basket.includes(wrong)).toBe(false);
    expect(rightTile(host)).not.toBeNull();
    // The pan is tipping: a tap is refused until it settles (template tipT).
    expect(host.tipT).toBeGreaterThan(0);
    const attempts = s.totalAttempts;
    tapTile(host, rightTile(host));
    expect(host.fly).toBeNull();
    expect(s.totalAttempts).toBe(attempts);
  });

  it('lights the right tile on the second error and reports the aid to the SDK', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    awaitReady(host);
    const sample = host.sample;
    const attempt = vi.spyOn(sample, 'attempt');
    for (let n = 0; n < 2; n += 1) {
      awaitReady(host);
      tapTile(host, wrongTile(host));
      settle(host);
    }
    expect(host.wrong).toBe(2);
    expect(host.aided).toBe(true);
    expect(host.state.coach).toBeNull();
    expect(rightTile(host).glow).toBe(1);
    for (const b of host.basket) if (b !== rightTile(host)) expect(b.glow).toBe(0);
    expect(attempt).toHaveBeenCalledTimes(2);
    expect(attempt.mock.calls.every(([, o]) => o.hintsUsed === 0)).toBe(true);

    awaitReady(host);
    tapTile(host, rightTile(host));
    settle(host);
    expect(host.made).toBe(1);
    expect(attempt).toHaveBeenCalledTimes(3);
    const [pick, opts] = attempt.mock.calls.at(-1);
    expect(pick).toBe(sample.english);
    expect(opts.hintsUsed).toBe(1);
    expect(opts.silent).toBe(true);
    expect(opts.mode).toBe('bilancia');
  });

  it('opens the coach on the third error on one tag, with the term in the rule (ricerca/00 passo 6)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    // Chapter 1, order 1: the counter never closes, so the coach is the only
    // consequence and the tag stays.
    game.reset(host, 0);
    expect(host.cfg.lives).toBe(Infinity);

    awaitReady(host);
    const sample = host.sample;
    let lastWrong = null;
    for (let n = 0; n < 3; n += 1) {
      awaitReady(host);
      lastWrong = wrongTile(host);
      tapTile(host, lastWrong);
      settle(host);
      if (n < 2) expect(host.state.coach).toBeNull();
    }
    expect(host.coachKind).toBe('wrong');
    expect(host.state.coach).toEqual({
      kind: 'wrong',
      pick: lastWrong.item.english,
      word: sample.english,
      it: meaningOf(sample, 'it'),
    });
    expect(host.state.left).toBe(3);
    expect(host.sample).toBe(sample);
    expect(host.made).toBe(0);
    expect(s.totalAttempts).toBe(3);
    for (const lang of ['it', 'en']) {
      const copy = game.coachText(host, host.state.coach, lang);
      expect(copy.rule).toContain(sample.english);
      expect(copy.what).toContain(lastWrong.item.english);
    }
    game.onCoachClose(host);
    expect(host.coachKind).toBeNull();
  });

  it('three tipped pans close the counter: the order starts over, with a coach', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 2);
    expect(host.cfg.lives).toBe(3);
    const term = host.item;

    // wrong, wrong, right, wrong: three tips without a streak of three.
    awaitReady(host);
    tapTile(host, wrongTile(host));
    settle(host);
    awaitReady(host);
    tapTile(host, wrongTile(host));
    settle(host);
    awaitReady(host);
    tapTile(host, rightTile(host));
    settle(host);
    expect(host.made).toBe(1);
    awaitReady(host);
    const sample = host.sample;
    const wrong = wrongTile(host);
    tapTile(host, wrong);
    settle(host);

    expect(host.coachKind).toBe('closed');
    expect(host.state.coach).toEqual({
      kind: 'closed',
      pick: wrong.item.english,
      word: sample.english,
      it: meaningOf(sample, 'it'),
    });
    // The same order, from the top: the term is the first tag again.
    expect(host.made).toBe(0);
    expect(host.state.left).toBe(0);
    expect(host.state.step).toBe(0);
    expect(host.item).toBe(term);
    expect(host.sample).toBe(term);
    expect(host.queue).toHaveLength(host.cfg.win - 1);
    expect(s.totalAttempts).toBe(4);
    expect(term.state).not.toBe('cleared');

    // A streak of three on one tag in a closable order: the streak coach wins,
    // and the counter still closes.
    const s2 = await session();
    const h2 = makeHost(game, s2);
    game.init(h2);
    game.reset(h2, 3);
    for (let n = 0; n < 3; n += 1) {
      awaitReady(h2);
      tapTile(h2, wrongTile(h2));
      settle(h2);
    }
    expect(h2.coachKind).toBe('wrong');
    expect(h2.state.left).toBe(0);
    expect(h2.made).toBe(0);
    expect(h2.sample).toBe(h2.item);

    // Closing the coach changes nothing: the fresh order plays to the end.
    game.onCoachClose(h2);
    h2.setState({ coach: null });
    const { frames } = playBeat(h2, ctx);
    expect(frames).toBeLessThan(BEAT_CAP);
    expect(h2.finished).toBe(true);
  });

  it("a tag whose transit runs out swings back to the hook and returns later; it isn't an attempt", async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    // NUMERI: slot 3.2 s × 5 = 16 s of transit once the tag has landed.
    expect(host.transit).toBeCloseTo(16, 6);

    awaitReady(host);
    const sample = host.sample;
    const frames = until(host, () => host.expired === 1, 60 * 20);
    expect(host.expired).toBe(1);
    expect(frames / 60).toBeGreaterThan(15.9);
    expect(frames / 60).toBeLessThan(16.2);
    expect(host.lift).not.toBeNull();
    expect(host.lift.item).toBe(sample);
    expect(host.sample).toBeNull();
    expect(host.queue.at(-1)).toBe(sample);
    expect(s.totalAttempts).toBe(0);
    expect(host.state.left).toBe(0);
    expect(host.state.coach).toBeNull();

    // The lift is drawn, then the next tag comes down and the order goes on.
    expect(() => game.draw(host, ctx)).not.toThrow();
    awaitReady(host);
    expect(host.sample).not.toBeNull();
    expect(host.sample).not.toBe(sample);
    const { frames: f2, weighed } = playBeat(host, ctx);
    expect(f2).toBeLessThan(BEAT_CAP);
    expect(host.finished).toBe(true);
    expect(weighed.includes(sample)).toBe(true);
    expect(sample.state).toBe('cleared');
  });

  it('offers bilingual coach copy for every kind with the placeholders filled in', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const coach = {
      pick: 'Arrow Function',
      word: 'Closure',
      it: 'Chiusura',
    };
    for (const kind of ['wrong', 'closed']) {
      const copies = ['it', 'en'].map((lang) => game.coachText(host, { ...coach, kind }, lang));
      for (const copy of copies) {
        for (const field of ['what', 'effect', 'rule', 'hint']) {
          expect(copy[field].length).toBeGreaterThan(0);
          expect(copy[field]).not.toContain('{');
        }
        // ricerca/34: the rule line always carries the English term.
        expect(copy.rule).toContain(coach.word);
        expect(copy.rule).toContain(coach.it);
      }
      expect(copies[0].what).not.toBe(copies[1].what);
      expect(copies[0].rule).not.toBe(copies[1].rule);
      expect(copies[0].hint).not.toBe(copies[1].hint);
    }
    expect(game.coachText(host, { ...coach, kind: 'wrong' }, 'it').what).toContain(coach.pick);
    expect(game.coachText(host, { ...coach, kind: 'nope' }, 'en').what).toContain(coach.pick);
  });

  it('shows the term and its meaning on the done screen, in either language', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 2);
    game.reset(host, 1);
    const term = beatItems(s, 2, 1)[0];
    expect(host.item).toBe(term);

    const copyIt = game.doneView(host, 'it');
    const copyEn = game.doneView(host, 'en');
    expect(copyIt.eyebrow).toBe('Commessa chiusa');
    expect(copyEn.eyebrow).toBe('Order closed');
    expect(copyIt.title).toBe(term.english);
    expect(copyEn.title).toBe(term.english);
    const lesson = s.lessons.find((l) => l.id === term.lesson);
    expect(copyIt.subtitle).toBe(`${meaningOf(term, 'it')} · ${pickLang(lesson.title, 'it')}`);
    expect(copyEn.subtitle).toBe(`${meaningOf(term, 'it')} · ${pickLang(lesson.title, 'en')}`);
    expect(copyIt.subtitle).not.toBe(copyEn.subtitle);
    for (const copy of [copyIt, copyEn]) {
      expect(copy.title).not.toMatch(/[%★]/);
      expect(copy.subtitle).not.toMatch(/[%★]/);
    }
  });

  it('every tile in the basket is a real term of the level, from the same lesson as the tag (TEST 1)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    const level = new Set(s.items);

    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        game.reset(host, beat);
        run(host, game, ctx, 1);
        const n = Math.min(6, Math.max(3, host.cfg.pool.length));
        expect(host.basket).toHaveLength(n);
        const seen = new Set();
        for (const b of host.basket) {
          expect(level.has(b.item)).toBe(true);
          expect(b.item.lesson).toBe(host.sample.lesson);
          expect(seen.has(b.item.english)).toBe(false);
          seen.add(b.item.english);
        }
        // The tag's own term is always in the basket (TEST 3).
        expect(rightTile(host)).not.toBeNull();
        // No tile carries a hint: same silhouette, no glow, no selection.
        for (const b of host.basket) expect(b.glow).toBe(0);
      }
    }
  });

  it("the tag's term stays in the basket after a re-deal, in a new place", async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 6);
    game.reset(host, 0);
    const positions = new Set();
    for (let n = 0; n < 6; n += 1) {
      awaitReady(host);
      positions.add(rightTile(host).i);
      tapTile(host, wrongTile(host));
      settle(host);
      if (host.state.coach) {
        host.setState({ coach: null });
      }
    }
    expect(positions.size).toBeGreaterThan(1);
  });

  /**
   * §15.4 wants a static-equivalent that looks deliberate. The tag still has
   * to come down and the tile still has to fly, so the register slows them to
   * 0.7×, freezes the wobble and spawns no particles.
   */
  it('slows every movement to 0.7× and freezes the wobble under prefers-reduced-motion', async () => {
    const s = await session();
    const normal = makeHost(game, s, { reduceMotion: false });
    game.init(normal);
    game.reset(normal, 0);
    const s2 = await session();
    const reduced = makeHost(game, s2, { reduceMotion: true });
    game.init(reduced);
    game.reset(reduced, 0);
    expect(normal.motion).toBe(1);
    expect(reduced.motion).toBe(0.7);

    // The drop from the hook.
    const dropN = awaitReady(normal);
    const dropR = awaitReady(reduced);
    expect(dropN).toBeGreaterThanOrEqual(Math.floor(DROP_S / STEP));
    expect(dropN).toBeLessThanOrEqual(Math.ceil(DROP_S / STEP) + 1);
    expect(dropR).toBeGreaterThanOrEqual(Math.floor(DROP_S / (STEP * 0.7)));
    expect(dropR * 0.7).toBeGreaterThanOrEqual(dropN - 1);

    // The transit clock.
    for (let f = 0; f < 60; f += 1) {
      game.update(normal, STEP);
      game.update(reduced, STEP);
    }
    expect(reduced.transitT).toBeCloseTo(normal.transitT * 0.7, 6);

    // The tile's flight to the pan.
    tapTile(normal, rightTile(normal));
    tapTile(reduced, rightTile(reduced));
    const flyN = until(normal, () => !normal.fly, 200);
    const flyR = until(reduced, () => !reduced.fly, 200);
    expect(flyN).toBeGreaterThanOrEqual(Math.floor(FLY_S / STEP));
    expect(flyN).toBeLessThanOrEqual(Math.ceil(FLY_S / STEP) + 1);
    expect(flyR).toBeGreaterThanOrEqual(Math.floor(FLY_S / (STEP * 0.7)));
    expect(flyR * 0.7).toBeGreaterThanOrEqual(flyN - 1);
    expect(reduced.parts).toHaveLength(0);
    expect(normal.parts.length).toBeGreaterThan(0);

    // The whole order still closes under reduced motion.
    game.reset(reduced, 0);
    const { frames } = playBeat(reduced, ctx);
    expect(frames).toBeLessThan(BEAT_CAP);
    expect(reduced.finished).toBe(true);
    expect(reduced.parts).toHaveLength(0);
  });

  it('under prefers-reduced-motion the tiles hold still and the aid glow is steady (§11.6)', async () => {
    const s = await session();
    const reduced = makeHost(game, s, { reduceMotion: true });
    game.init(reduced);
    game.reset(reduced, 0);
    awaitReady(reduced);

    // The basket wobble: two frames place the same rectangles at the same
    // spots (tiles are drawn through translate, so both calls are recorded).
    const rects = [];
    ctx.roundRect = (...args) => rects.push(`rr:${args.join(',')}`);
    ctx.translate = (...args) => rects.push(`tr:${args.join(',')}`);
    game.draw(reduced, ctx);
    const first = rects.slice();
    rects.length = 0;
    game.update(reduced, STEP);
    game.draw(reduced, ctx);
    expect(rects).toEqual(first);
    expect(first.length).toBeGreaterThan(0);

    // ...whereas the wobble moves them under normal motion.
    const s2 = await session();
    const normal = makeHost(game, s2, { reduceMotion: false });
    game.init(normal);
    game.reset(normal, 0);
    awaitReady(normal);
    rects.length = 0;
    game.draw(normal, ctx);
    const n1 = rects.slice();
    rects.length = 0;
    game.update(normal, STEP);
    game.draw(normal, ctx);
    expect(rects).not.toEqual(n1);

    // The second-error glow is a steady yellow border, not a breath, and the
    // heaviest stroke of the frame is never red.
    for (let n = 0; n < 2; n += 1) {
      awaitReady(reduced);
      tapTile(reduced, wrongTile(reduced));
      settle(reduced);
    }
    expect(rightTile(reduced).glow).toBe(1);
    awaitReady(reduced);
    const strokes = [];
    ctx.stroke = () => strokes.push(`${ctx.strokeStyle}|${ctx.lineWidth}`);
    game.draw(reduced, ctx);
    const a = strokes.slice();
    strokes.length = 0;
    reduced.t += 0.3;
    game.draw(reduced, ctx);
    expect(strokes).toEqual(a);
    expect(a).toContain('#C9B458|3');
    for (const v of a) expect(v.toLowerCase()).not.toMatch(/^#(f00|ff0000|c8102e|e74c3c)\|/);
  });

  it('the keyboard plays the same game as the finger (§15.1, ricerca/33)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 1);
    awaitReady(host);
    expect(host.basket.length).toBe(4);
    const sample = host.sample;

    // A key that neither steers nor confirms (Escape is the host's pause,
    // Tab the browser's) leaves the ink outline off.
    press(host, 'Escape');
    press(host, 'Tab');
    expect(host.kbUsed).toBe(false);
    expect(host.sel).toBe(-1);

    press(host, 'ArrowRight');
    expect(host.kbUsed).toBe(true);
    expect(host.sel).toBe(0);
    press(host, 'ArrowRight');
    expect(host.sel).toBe(1);
    press(host, 'ArrowLeft');
    expect(host.sel).toBe(0);
    press(host, '2');
    expect(host.sel).toBe(1);
    press(host, 'ArrowDown');
    expect(host.sel).toBe(0);
    press(host, 'ArrowUp');
    expect(host.sel).toBe(1);
    press(host, '1');
    expect(host.sel).toBe(0);

    // A wrong tile by keyboard is refused exactly like a wrong tile by finger.
    const wrong = wrongTile(host);
    press(host, String(host.basket.indexOf(wrong) + 1));
    expect(host.sel).toBe(wrong.i);
    press(host, ' ');
    expect(host.fly).not.toBeNull();
    expect(host.fly.tile).toBe(wrong);
    settle(host);
    expect(host.wrong).toBe(1);
    expect(host.sample).toBe(sample);
    expect(s.totalAttempts).toBe(1);
    let call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(wrong.item.english);
    expect(call.expectedAnswer).toBe(sample.english);
    expect(call.exerciseMode).toBe('bilancia');

    // The right tile by keyboard balances the pan.
    awaitReady(host);
    const right = rightTile(host);
    press(host, String(host.basket.indexOf(right) + 1));
    expect(host.sel).toBe(right.i);
    press(host, 'Enter');
    expect(host.fly).not.toBeNull();
    settle(host);
    expect(host.made).toBe(1);
    expect(s.totalCorrect).toBe(1);
    call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(sample.english);
    expect(call.expectedAnswer).toBe(sample.english);
  });

  it('a keyboard-only bot closes a six-tile, eight-weighing order', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 6);
    game.reset(host, 3);
    expect(host.cfg.win).toBe(8);
    awaitReady(host);
    expect(host.basket).toHaveLength(6);

    const { frames, weighed } = playBeatByKeyboard(host, ctx);
    expect(frames).toBeLessThan(BEAT_CAP);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(weighed).toHaveLength(8);
    for (const item of weighed) expect(item.state).toBe('cleared');
    expect(s.totalCorrect).toBe(8);
    expect(s.totalAttempts).toBe(8);
  });

  it('a tap on the table, on a tile in flight or on nothing is not an attempt', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    // Before the tag lands nothing can be weighed.
    tapTile(host, host.basket[0]);
    expect(host.fly).toBeNull();
    awaitReady(host);
    game.tap(host, { x: 10, y: 10 });
    expect(host.fly).toBeNull();
    tapTile(host, rightTile(host));
    expect(host.fly).not.toBeNull();
    const other = wrongTile(host);
    tapTile(host, other);
    expect(host.fly.tile).not.toBe(other);
    settle(host);
    expect(s.totalAttempts).toBe(1);
  });

  it('the error ladder belongs to the tag: it survives an expiry and a wrong pick restarts the transit', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    expect(host.cfg.lives).toBe(Infinity);

    awaitReady(host);
    const sample = host.sample;
    // Burn most of the transit, then err twice: each tip restarts the clock.
    until(host, () => host.transitT > 12, 60 * 14);
    expect(host.transitT).toBeGreaterThan(12);
    for (let n = 0; n < 2; n += 1) {
      awaitReady(host);
      tapTile(host, wrongTile(host));
      settle(host);
      // The clock restarted at the weighing and has not ticked: the pan is
      // still tipping.
      expect(host.tipT).toBeGreaterThan(0);
      expect(host.transitT).toBe(0);
    }
    expect(host.aided).toBe(true);
    expect(rightTile(host).glow).toBe(1);
    expect(host.expired).toBe(0);

    // The lit tag runs out: it goes back on the hook, not graded, still lit.
    const frames = until(host, () => host.expired === 1, 60 * 20);
    expect(host.expired).toBe(1);
    expect(frames / 60).toBeGreaterThan(15);
    expect(s.totalAttempts).toBe(2);

    // Weigh the other tags of the order until the same tag comes back down.
    let guard = 0;
    while (guard < 10) {
      awaitReady(host);
      if (host.sample === sample) break;
      tapTile(host, rightTile(host));
      settle(host);
      guard += 1;
    }
    expect(host.sample).toBe(sample);
    expect(host.wrong).toBe(2);
    expect(host.aided).toBe(true);
    expect(rightTile(host).glow).toBe(1);
    for (const b of host.basket) if (b !== rightTile(host)) expect(b.glow).toBe(0);

    // The third error on this tag still opens the coach, and the aid is
    // reported on every attempt after the glow.
    const attempt = vi.spyOn(sample, 'attempt');
    const wrong = wrongTile(host);
    tapTile(host, wrong);
    settle(host);
    expect(host.coachKind).toBe('wrong');
    expect(host.state.coach).toEqual({
      kind: 'wrong',
      pick: wrong.item.english,
      word: sample.english,
      it: meaningOf(sample, 'it'),
    });
    expect(attempt.mock.calls.at(-1)[1].hintsUsed).toBe(1);
    game.onCoachClose(host);
    host.setState({ coach: null });
    awaitReady(host);
    tapTile(host, rightTile(host));
    settle(host);
    expect(attempt.mock.calls.at(-1)[0]).toBe(sample.english);
    expect(attempt.mock.calls.at(-1)[1].hintsUsed).toBe(1);
    expect(host.ladder.has(sample)).toBe(false);
  });

  it("a balanced weighing washes the glass warm once and fades (template's flash)", async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    awaitReady(host);
    expect(host.flash).toBe(0);

    tapTile(host, rightTile(host));
    until(host, () => !host.fly, 200);
    expect(host.flash).toBe(1);
    const fills = [];
    ctx.fillRect = (...args) => fills.push(`${ctx.fillStyle}|${args.join(',')}`);
    game.draw(host, ctx);
    expect(fills.some((f) => /^rgba\(228,197,144,0\.1[0-9]*\)\|-8,-8,436,926$/.test(f))).toBe(true);
    for (const f of fills) expect(f.toLowerCase()).not.toMatch(/^#(f00|ff0000|c8102e|e74c3c)\|/);

    for (let f = 0; f < 10; f += 1) game.update(host, STEP);
    expect(host.flash).toBeLessThan(1);
    expect(host.flash).toBeGreaterThan(0);
    until(host, () => host.flash <= 0, 60);
    expect(host.flash).toBeLessThanOrEqual(0);
    fills.length = 0;
    game.draw(host, ctx);
    expect(fills.some((f) => f.startsWith('rgba(228,197,144'))).toBe(false);

    // A tipped pan brings no flash.
    awaitReady(host);
    tapTile(host, wrongTile(host));
    until(host, () => !host.fly, 200);
    expect(host.flash).toBeLessThanOrEqual(0);
  });

  it('the tile slides straight along the grid to the pan and flips only as it lands (R13)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    awaitReady(host);
    const tile = rightTile(host);
    const startY = tile.y;

    let last = null;
    const scaledAt = [];
    ctx.translate = (x, y) => {
      last = { x, y };
    };
    ctx.scale = () => scaledAt.push(host.fly ? host.fly.t / FLY_S : -1);
    tapTile(host, tile);
    const ys = [];
    while (host.fly) {
      last = null;
      game.draw(host, ctx);
      // The flying tile is the last thing translated in the frame.
      ys.push(last.y);
      game.update(host, STEP);
    }
    expect(ys.length).toBeGreaterThan(10);
    // Up the table, never over the top and back: a slide, not a hop.
    expect(ys[0]).toBeLessThanOrEqual(startY);
    for (let i = 1; i < ys.length; i += 1) expect(ys[i]).toBeLessThanOrEqual(ys[i - 1] + 1e-9);
    const restY = ys.at(-1);
    for (const y of ys) expect(y).toBeGreaterThanOrEqual(restY - 1e-9);
    // The flip happens on landing: no scale before 70% of the flight.
    expect(scaledAt.length).toBeGreaterThan(0);
    for (const k of scaledAt) expect(k).toBeGreaterThanOrEqual(0.7);
  });
});
