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

import { analyticsService } from '../js/services/AnalyticsService.js';
import { storageService } from '../js/services/StorageService.js';
import * as engine from '../js/games/KaioEngine.js';
import { createLevelSession } from '../js/games/LevelSession.js';
import { beatItems, spine } from '../js/games/LevelBeats.js';
import game from '../js/games/levels/cyber-l1-casa.js';
import { meaningText } from '../js/games/parts/cyber-l1-casa/page.js';
import {
  makeContext2D,
  installDocumentDouble,
  makeHost,
  useChapter,
  run,
  assertShape,
} from './helpers/game-conformance.js';

const PW = 122;
const PH = 44;
const STEP = 1 / 60;
const CAP = 12000;

async function session() {
  return createLevelSession({
    surface: 'cybersecurity',
    level: 0,
    mode: 'casa',
    progressManager: { addXP: vi.fn() },
  });
}

function live(host) {
  return host.evs.filter((e) => !e.dead);
}

function plateFor(host, item) {
  return host.plates.find((p) => p.item === item) || null;
}

function wrongPlateFor(host, thing) {
  return host.plates.find((p) => p.item !== thing.item) || null;
}

function centre(p) {
  return { x: p.x + PW / 2, y: p.y + PH / 2 };
}

function tapPlate(host, p) {
  game.tap(host, centre(p));
}

function idle(host) {
  return host.hands.busy <= 0 && host.queue.length === 0;
}

function press(host, key) {
  game.key(host, { key, preventDefault() {} });
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

function nextEvent(host) {
  until(host, () => live(host).length > 0);
  return live(host)[0];
}

/** Wait for the hands to finish whatever they carry. */
function settle(host) {
  until(host, () => idle(host), 400);
}

/**
 * What a competent house-keeper does next, through the public input only:
 * mend the cracks first, open a parcel already sniffed, then carry the plate
 * whose term matches the oldest fact's note. Facts that still might change
 * gesture (chapter 4) are left alone until they have.
 */
function decide(host) {
  const crack = host.cracks.find((c) => c.item && !c.fixed);
  if (crack) return { plate: plateFor(host, crack.item) };
  const sniffed = live(host).find((e) => e.kind === 'parcel' && e.sniffed);
  if (sniffed) return { open: sniffed };
  const ev = live(host).find((e) => e.kind !== 'parcel' && !e.taken && e.morphT <= 0);
  if (ev) return { plate: plateFor(host, ev.item) };
  const parcel = live(host).find((e) => e.kind === 'parcel' && !e.sniffed);
  if (parcel) return { plate: plateFor(host, parcel.item) };
  return null;
}

function playBeat(host, ctx, { maxFrames = CAP, draw = true } = {}) {
  const picked = [];
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    if (!host.finished && idle(host)) {
      const d = decide(host);
      if (d && d.plate) {
        picked.push(d.plate.item);
        tapPlate(host, d.plate);
      } else if (d && d.open) game.tap(host, { x: d.open.x, y: d.open.y });
    }
    game.update(host, STEP);
    if (draw) game.draw(host, ctx);
    frames += 1;
  }
  return { frames, picked };
}

/** The same bot with no pointer: digits pick a plate, ↑ opens the parcel. */
function playBeatByKeyboard(host, ctx, { maxFrames = CAP } = {}) {
  const picked = [];
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    if (!host.finished && idle(host)) {
      const d = decide(host);
      if (d && d.plate) {
        picked.push(d.plate.item);
        press(host, String(d.plate.slot + 1));
      } else if (d && d.open) press(host, 'ArrowUp');
    }
    game.update(host, STEP);
    game.draw(host, ctx);
    frames += 1;
  }
  return { frames, picked };
}

/** Walk the level the way GameHost does: through the engine's goBeat/next. */
function eachBeatViaEngine(host, fn) {
  engine.goBeat(host, 0, 0);
  for (let n = 0; n < 40; n += 1) {
    fn(host.state.chapter, host.state.beat);
    if (n < 39) engine.next(host);
  }
}

/** Record every canvas call of one frame as strings, to compare two frames. */
function recordFrame(host, ctx) {
  const calls = [];
  const rec = { ...ctx };
  for (const k of Object.keys(ctx)) {
    if (typeof ctx[k] === 'function') {
      rec[k] = (...args) => {
        calls.push(
          `${k}(${args.map((a) => (typeof a === 'number' ? a.toFixed(3) : String(a))).join(',')})`
        );
        return ctx[k](...args);
      };
    }
  }
  game.draw(host, rec);
  return calls;
}

describe('La casa di notte — conformance (SDK design §8, DOCTRINE §46)', () => {
  let ctx;
  let restoreDocument;

  beforeEach(() => {
    ctx = makeContext2D();
    restoreDocument = installDocumentDouble();
    storedRecord = null;
    spoken.length = 0;
    analyticsService.recordResponse.mockClear();
    storageService.save.mockClear();
  });

  afterEach(() => restoreDocument());

  it('exposes the lifecycle and metadata the host and registry read', () => {
    assertShape(game, expect);
    expect(game.meta.surface).toBe('cybersecurity');
    expect(game.meta.level).toBe(0);
    expect(game.meta.id).toBe('cyber-l1-casa');
    expect(game.meta.register).toBe('R14');
    expect(game.meta.title).toBe('La casa di notte');
    expect(game.meta.titleEn).toBe('The house at night');
    expect(game.meta.levelLabel).toBe(
      'Cybersecurity · L1 Fondamenti / Cybersecurity · L1 Foundations'
    );
    expect(game.drone).toEqual({ freq: 48, type: 'triangle', volume: 0.013, lowpass: 140 });
    for (const fn of ['tap', 'key', 'coachText', 'doneView', 'onCoachClose']) {
      expect(typeof game[fn]).toBe('function');
    }
  });

  it('keeps the template: eight chapters of five beats and every knob', () => {
    expect(game.CH).toHaveLength(8);
    expect(game.CH.every((c) => c.beats.length === 5)).toBe(true);
    for (const c of game.CH) {
      for (const b of c.beats) {
        for (const k of [
          'kinds',
          'plates',
          'max',
          'arrive',
          'pat',
          'need',
          'chg',
          'cracks',
          'rush',
          'queue',
        ]) {
          expect(b).toHaveProperty(k);
        }
        expect(b.plates).toBeGreaterThanOrEqual(2);
        expect(b.plates).toBeLessThanOrEqual(6);
      }
    }
    // The fracture (rain), the morph, the parcel, the crack, the bursts and the queue.
    expect(game.CH[2].beats[0].kinds).toEqual(['rain']);
    expect(game.CH[3].beats.every((b) => b.chg)).toBe(true);
    expect(game.CH[4].beats.every((b) => b.kinds.includes('parcel'))).toBe(true);
    expect(game.CH[5].beats.every((b) => b.cracks >= 1)).toBe(true);
    expect(game.CH[6].beats.every((b) => b.rush && b.queue === 2)).toBe(true);
    expect(game.CH[7].beats[3]).toMatchObject({ need: 9, pat: 21, arrive: 3.8, max: 4, cracks: 2 });
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
        // The first fact arrives at 1.2 s: 2.5 s draws a fact, its note, the plates.
        expect(() => run(host, game, surface, 2.5)).not.toThrow();
        expect(live(host).length).toBeGreaterThan(0);
        expect(host.plates.length).toBeGreaterThan(0);
      }
    }
  });

  it('follows the chapter the engine installed and covers all 42 terms across 40 beats (§46.5)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    expect(s.items).toHaveLength(42);
    const keys = new Set();
    eachBeatViaEngine(host, (chapter, beat) => {
      expect(host.chapter, `chapter ${chapter} beat ${beat}`).toBe(chapter);
      expect(host.terms).toEqual(beatItems(s, chapter, beat));
      expect(host.item).toBe(host.terms[0]);
      // The beat's own terms are the first facts of the night.
      expect(host.pool.slice(0, host.terms.length)).toEqual(host.terms);
      for (const t of host.terms) keys.add(t.key);
    });
    expect(keys).toEqual(new Set(s.items.map((i) => i.key)));
    expect(spine(s)).toHaveLength(42);
  });

  it('introduces a term the moment its note is on the page', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 2);
    host.state.beat = 3;
    game.reset(host, 3);
    expect(s.progress().introduced).toBe(0);
    const e = nextEvent(host);
    expect(e.item).toBe(host.item);
    expect(e.item.state).toBe('introduced');
    expect(s.progress().introduced).toBe(1);
  });

  it('a scripted bot covering every fact clears the terms, speaks them and persists the beat', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: false });
    game.init(host);
    game.reset(host, 0);

    const { frames, picked } = playBeat(host, ctx);
    expect(frames).toBeLessThan(CAP);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(host.resolved).toBe(host.need);
    expect(picked).toHaveLength(host.need);
    for (const item of picked) expect(item.state).toBe('cleared');
    expect(spoken).toEqual(picked.map((i) => i.english));
    expect(s.totalCorrect).toBe(host.need);
    expect(storageService.save).toHaveBeenCalled();
    for (const [key, record] of storageService.save.mock.calls) {
      expect(key).toBe('progress');
      expect(record).toEqual(expect.objectContaining({ beat: 0, chapter: 0 }));
    }
  });

  it('a mute host covers in silence', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: true });
    game.init(host);
    game.reset(host, 0);
    playBeat(host, ctx);
    expect(host.finished).toBe(true);
    expect(spoken).toEqual([]);
  });

  /** §46.5: the whole level under the bot; afterwards the ledger must pass. */
  it('the bot playing all forty beats through the engine completes the level ledger', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    eachBeatViaEngine(host, (chapter, beat) => {
      const { frames } = playBeat(host, ctx, { draw: true });
      expect(host.state.coach, `chapter ${chapter} beat ${beat} opened a coach`).toBeNull();
      expect(frames, `chapter ${chapter} beat ${beat} hit the frame cap`).toBeLessThan(CAP);
      expect(host.finished, `chapter ${chapter} beat ${beat} did not finish`).toBe(true);
      expect(host.state.done).toBe(true);
      expect(host.state.left || 0).toBe(0);
      expect(host.cracks.every((c) => c.fixed)).toBe(true);
      const saved = storageService.save.mock.calls.at(-1)[1];
      expect(saved).toEqual(expect.objectContaining({ beat, chapter }));
      for (const t of host.terms) expect(t.state).toBe('cleared');
    });

    expect(s.progress().attempted).toBe(42);
    expect(s.progress().cleared).toBe(42);
    const result = s.finish();
    expect(result.passed).toBe(true);
    expect(result.missed).toEqual([]);
    expect(result.coverage).toBe(1);
  });

  it('grades a wrong plate through the SDK with the real pick against the real target (§46.2)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const e = nextEvent(host);
    const wrong = wrongPlateFor(host, e);
    expect(wrong).not.toBeNull();
    tapPlate(host, wrong);
    expect(host.hands.busy).toBeGreaterThan(0);
    settle(host);

    expect(e.wrong).toBe(1);
    expect(e.dead).toBe(false);
    expect(e.item.state).toBe('attempted');
    expect(host.state.coach).toBeNull();
    expect(s.totalAttempts).toBe(1);
    expect(s.totalCorrect).toBe(0);
    const call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(false);
    expect(call.exerciseMode).toBe('casa');
    expect(call.userAnswer).toBe(wrong.item.english);
    expect(call.expectedAnswer).toBe(e.item.english);
    expect(call.userAnswer).not.toBe(call.expectedAnswer);
    // The plate is still on the margin, not lost.
    expect(plateFor(host, wrong.item)).not.toBeNull();
  });

  it('pulses the right plate on the second error and reports the aid to the SDK', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const e = nextEvent(host);
    const attempt = vi.spyOn(e.item, 'attempt');
    for (let n = 0; n < 2; n += 1) {
      tapPlate(host, wrongPlateFor(host, e));
      settle(host);
    }
    expect(e.wrong).toBe(2);
    expect(e.aided).toBe(true);
    expect(host.pulse).toBeGreaterThan(0);
    expect(host.pulseItem).toBe(e.item);
    expect(host.state.coach).toBeNull();
    expect(attempt).toHaveBeenCalledTimes(2);
    expect(attempt.mock.calls.every(([, o]) => o.hintsUsed === 0)).toBe(true);

    tapPlate(host, plateFor(host, e.item));
    settle(host);
    expect(e.dead).toBe(true);
    expect(e.item.state).toBe('cleared');
    expect(attempt).toHaveBeenCalledTimes(3);
    const [pick, opts] = attempt.mock.calls.at(-1);
    expect(pick).toBe(e.item.english);
    expect(opts.hintsUsed).toBe(1);
    expect(opts.silent).toBe(true);
    expect(opts.mode).toBe('casa');
  });

  it('opens the coach on the third error, with the term in the rule (ricerca/00 passo 6)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const e = nextEvent(host);
    let last = null;
    for (let n = 0; n < 3; n += 1) {
      last = wrongPlateFor(host, e);
      tapPlate(host, last);
      settle(host);
      if (n < 2) expect(host.state.coach).toBeNull();
    }
    expect(host.coachKind).toBe('wrong');
    expect(host.state.coach).toEqual({
      kind: 'wrong',
      pick: last.item.english,
      word: e.item.english,
      it: expect.any(String),
    });
    expect(s.totalAttempts).toBe(3);
    for (const lang of ['it', 'en']) {
      const copy = game.coachText(host, host.state.coach, lang);
      expect(copy.rule).toContain(e.item.english);
      expect(copy.effect).toContain(last.item.english);
    }
    game.onCoachClose(host);
    expect(host.coachKind).toBeNull();
    expect(host.streak).toEqual({ kind: null, n: 0 });
  });

  it('a fact that runs out of patience is not an attempt: a candle goes out, the term comes back, three open the "late" coach', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 2);

    const lost = [];
    for (let n = 0; n < 3; n += 1) {
      const e = nextEvent(host);
      lost.push(e.item);
      e.pat = 0.001;
      until(host, () => e.dead, 10);
      expect(e.dead).toBe(true);
      if (n < 2) {
        expect(host.state.left).toBe(n + 1);
        expect(host.pool.includes(e.item)).toBe(true);
        expect(host.state.coach).toBeNull();
      }
    }
    expect(s.totalAttempts).toBe(0);
    expect(lost[0].state).toBe('introduced');
    expect(host.state.coach.kind).toBe('late');
    expect(host.state.coach.word).toBe(lost[2].english);
    expect(game.coachText(host, host.state.coach, 'it').rule).toContain(lost[2].english);
    // Three candles out: the night starts over from the same beat.
    expect(host.state.left).toBe(0);
    expect(host.resolved).toBe(0);
    expect(host.evs).toEqual([]);
    expect(host.pool).toHaveLength(host.need);
    expect(host.pool[0]).toBe(host.item);
  });

  it('a parcel is sniffed with its term (graded) and then opened; opened blind it is the "gamble"', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 4);
    game.reset(host, 1);

    const p = nextEvent(host);
    expect(p.kind).toBe('parcel');
    tapPlate(host, plateFor(host, p.item));
    settle(host);
    expect(p.sniffed).toBe(true);
    expect(p.item.state).toBe('cleared');
    expect(s.totalCorrect).toBe(1);
    game.tap(host, { x: p.x, y: p.y });
    settle(host);
    expect(p.dead).toBe(true);
    expect(host.resolved).toBe(1);

    // Three parcels opened blind (made harmless so no candle goes out).
    let last = null;
    for (let n = 0; n < 3; n += 1) {
      until(host, () => live(host).some((e) => e.kind === 'parcel' && !e.sniffed), 1200);
      last = live(host).find((e) => e.kind === 'parcel' && !e.sniffed);
      expect(last).toBeDefined();
      last.bad = false;
      game.tap(host, { x: last.x, y: last.y });
      settle(host);
      expect(last.dead).toBe(true);
      expect(host.pool.includes(last.item)).toBe(true);
    }
    expect(s.totalAttempts).toBe(1);
    expect(host.state.left || 0).toBe(0);
    expect(host.state.coach.kind).toBe('gamble');
    expect(host.state.coach.word).toBe(last.item.english);
  });

  it('a plate does not hold on a crack: mend it with its own term first', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 5);
    game.reset(host, 0);
    expect(host.cracks).toHaveLength(1);
    const cr = host.cracks[0];
    expect(cr.item.state).toBe('introduced');
    expect(host.pool.includes(cr.item)).toBe(false);
    expect(plateFor(host, cr.item)).not.toBeNull();

    const e = nextEvent(host);
    cr.spot = e.spot;
    for (let n = 0; n < 3; n += 1) {
      tapPlate(host, plateFor(host, e.item));
      settle(host);
      expect(e.dead).toBe(false);
      expect(e.taken).toBe(false);
      if (n < 2) expect(host.state.coach).toBeNull();
    }
    // The refusal is mechanical, never a vocabulary attempt.
    expect(s.totalAttempts).toBe(0);
    expect(host.state.coach.kind).toBe('crack');
    expect(host.state.coach.word).toBe(cr.item.english);
    game.onCoachClose(host);

    tapPlate(host, plateFor(host, cr.item));
    settle(host);
    expect(cr.fixed).toBe(true);
    expect(cr.item.state).toBe('cleared');
    expect(s.totalCorrect).toBe(1);
    tapPlate(host, plateFor(host, e.item));
    settle(host);
    expect(e.dead).toBe(true);
    expect(host.resolved).toBe(1);
  });

  it('in chapter 4 a fact changes gesture and term; the old term returns to the pool', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 3);
    game.reset(host, 0);

    const e = nextEvent(host);
    expect(e.morphT).toBeGreaterThan(0);
    const before = e.item;
    const kind = e.kind;
    e.morphT = 0.001;
    until(host, () => e.changed === true, 10);
    expect(e.changed).toBe(true);
    expect(e.kind).not.toBe(kind);
    expect(e.item).not.toBe(before);
    expect(e.item.state).toBe('introduced');
    expect(host.pool.includes(before)).toBe(true);
    expect(plateFor(host, e.item)).not.toBeNull();

    const { frames } = playBeat(host, ctx);
    expect(frames).toBeLessThan(CAP);
    expect(host.finished).toBe(true);
    expect(before.state).toBe('cleared');
  });

  it('offers bilingual coach copy for every kind, with no placeholder left', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    const coach = { pick: 'Firewall', word: 'Password', it: "Parola d'ordine" };
    for (const kind of ['wrong', 'late', 'gamble', 'crack']) {
      const copies = ['it', 'en'].map((lang) => game.coachText(host, { ...coach, kind }, lang));
      for (const copy of copies) {
        for (const field of ['what', 'effect', 'rule', 'hint']) {
          expect(copy[field].length).toBeGreaterThan(0);
          expect(copy[field]).not.toContain('{');
        }
        expect(copy.rule).toContain('Password');
      }
      expect(copies[0].what).not.toBe(copies[1].what);
      expect(copies[0].rule).not.toBe(copies[1].rule);
    }
  });

  it('shows the terms and their meaning on the done screen, differently in either language', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 3);
    game.reset(host, 4);
    expect(host.terms).toHaveLength(2);
    const copyIt = game.doneView(host, 'it');
    const copyEn = game.doneView(host, 'en');
    expect(copyIt.eyebrow).toBe('Notte tenuta');
    expect(copyEn.eyebrow).toBe('Night held');
    expect(copyIt.title).toBe(host.terms.map((t) => t.english).join(' · '));
    expect(copyEn.title).toBe(copyIt.title);
    expect(copyIt.subtitle.length).toBeGreaterThan(0);
    expect(copyEn.subtitle).toBe('Access & Identity');
    expect(copyIt.subtitle).not.toBe(copyEn.subtitle);
    // No stars, no percentages (ricerca/33 §33.5).
    expect(`${copyIt.title}${copyIt.subtitle}${copyEn.subtitle}`).not.toMatch(/[%★]/);
  });

  it('every plate is a real term of the level from the same lesson, all alike, and every waiting fact has its plate', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        game.reset(host, beat);
        run(host, game, ctx, 2.5);
        const seen = new Set();
        for (const p of host.plates) {
          expect(s.items.includes(p.item)).toBe(true);
          expect(p.item.lesson).toBe(host.item.lesson);
          expect(seen.has(p.item)).toBe(false);
          seen.add(p.item);
        }
        expect(host.plates.length).toBeLessThanOrEqual(6);
        const waiting = live(host)
          .map((e) => e.item)
          .concat(host.cracks.filter((c) => !c.fixed).map((c) => c.item));
        for (const item of waiting) expect(plateFor(host, item)).not.toBeNull();
        // At least one plate that no fact is asking for, so the answer is a choice.
        expect(host.plates.length).toBeGreaterThan(new Set(waiting).size);
        for (const e of live(host)) expect(e.item.lesson).toBe(host.item.lesson);
      }
    }
  });

  it('the note never spells the term it asks for (TEST 1)', async () => {
    const s = await session();
    const word = (item) => {
      const term = item.english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`(?<![\\p{L}\\p{N}])${term}(?![\\p{L}\\p{N}])`, 'iu');
    };
    // Every note of the level, term by term: the term is never a word of it
    // ("Virus informatico", "Software malevolo / Malware"), and no note collapses.
    for (const item of s.items) {
      const note = meaningText(item);
      expect(note.length, item.english).toBeGreaterThan(0);
      expect(note, `${item.english} -> "${note}"`).not.toMatch(word(item));
    }
    expect(meaningText(s.items.find((i) => i.english === 'Virus'))).toBe('informatico');
    expect(meaningText(s.items.find((i) => i.english === 'Malware'))).toBe('Software malevolo');

    // And on the page: nothing drawn, apart from the plate itself, spells the
    // term of a fact or a crack that is waiting — notes, header, counter.
    const host = makeHost(game, s);
    game.init(host);
    const texts = [];
    ctx.fillText = (t) => texts.push(String(t));
    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        game.reset(host, beat);
        run(host, game, ctx, 2.5);
        texts.length = 0;
        game.draw(host, ctx);
        const waiting = live(host).concat(host.cracks.filter((c) => c.item && !c.fixed));
        expect(waiting.length).toBeGreaterThan(0);
        for (const e of waiting) {
          const term = e.item.english.toLowerCase();
          const others = texts.filter((t) => t.toLowerCase() !== term);
          expect(others.length).toBeGreaterThan(0);
          for (const t of others)
            expect(t, `${e.item.english} in "${t}"`).not.toMatch(word(e.item));
        }
      }
    }
  });

  it('slows the page to 0.7x and freezes the boil under prefers-reduced-motion', async () => {
    const s = await session();
    const normal = makeHost(game, s, { reduceMotion: false });
    game.init(normal);
    game.reset(normal, 0);
    const s2 = await session();
    const reduced = makeHost(game, s2, { reduceMotion: true });
    game.init(reduced);
    game.reset(reduced, 0);

    const e1 = nextEvent(normal);
    const e2 = nextEvent(reduced);
    expect(e1.spot).toBe(e2.spot);
    // The wobble is decorative: it does not advance under reduced motion.
    const w0 = e2.wob;
    game.update(reduced, STEP);
    expect(e2.wob).toBe(w0);
    game.update(normal, STEP);
    expect(e1.wob).toBeGreaterThan(0);

    // The hands travel at 0.7x from the same start to the same target.
    tapPlate(normal, plateFor(normal, e1.item));
    tapPlate(reduced, plateFor(reduced, e2.item));
    const x0 = normal.hands.x;
    const y0 = normal.hands.y;
    game.update(normal, STEP);
    game.update(reduced, STEP);
    const dn = Math.hypot(normal.hands.x - x0, normal.hands.y - y0);
    const dr = Math.hypot(reduced.hands.x - x0, reduced.hands.y - y0);
    expect(dn).toBeGreaterThan(0);
    expect(dr / dn).toBeCloseTo(0.7, 3);

    // Two frames of the same state draw the same page, boil and all.
    const first = recordFrame(reduced, ctx);
    reduced.t += 0.3;
    const second = recordFrame(reduced, ctx);
    expect(second).toEqual(first);
    expect(first.length).toBeGreaterThan(50);
    const a = recordFrame(normal, ctx);
    normal.t += 0.13;
    const b = recordFrame(normal, ctx);
    expect(b).not.toEqual(a);

    // And the night is still playable, with no particles at all.
    settle(reduced);
    playBeat(reduced, ctx);
    expect(reduced.finished).toBe(true);
    expect(reduced.parts).toHaveLength(0);
  });

  it('the keyboard plays the same game as the finger (§15.1, ricerca/33)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 1);

    const e = nextEvent(host);
    expect(host.plates.length).toBeGreaterThan(1);
    press(host, 'ArrowRight');
    expect(host.kbUsed).toBe(true);
    expect(host.sel).toBe(0);
    press(host, 'ArrowRight');
    expect(host.sel).toBe(1);
    press(host, 'ArrowLeft');
    expect(host.sel).toBe(0);

    // A wrong plate by digit is refused exactly like a wrong plate by finger.
    const wrong = wrongPlateFor(host, e);
    press(host, String(wrong.slot + 1));
    expect(host.sel).toBe(wrong.slot);
    expect(host.hands.busy).toBeGreaterThan(0);
    settle(host);
    expect(e.wrong).toBe(1);
    expect(s.totalAttempts).toBe(1);
    let call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(wrong.item.english);
    expect(call.expectedAnswer).toBe(e.item.english);

    // The right plate by cursor and space covers the fact.
    const right = plateFor(host, e.item);
    while (host.sel !== right.slot) press(host, 'ArrowRight');
    press(host, ' ');
    expect(host.hands.busy).toBeGreaterThan(0);
    settle(host);
    expect(e.dead).toBe(true);
    expect(e.item.state).toBe('cleared');
    expect(s.totalCorrect).toBe(1);
    call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(e.item.english);
    expect(call.expectedAnswer).toBe(e.item.english);
  });

  it('a keyboard-only bot holds a night with parcels, cracks and a queue', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 7);
    game.reset(host, 1);
    expect(host.cfg.queue).toBe(2);
    expect(host.cracks).toHaveLength(1);
    expect(host.cfg.kinds).toContain('parcel');

    const { frames, picked } = playBeatByKeyboard(host, ctx);
    expect(frames).toBeLessThan(CAP);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(host.state.coach).toBeNull();
    expect(picked.length).toBeGreaterThanOrEqual(host.need);
    expect(s.totalAttempts).toBe(s.totalCorrect);
    expect(s.totalCorrect).toBe(host.need + 1);
  });

  it('with two hands busy, a second plate queues (chapter 7) or is refused (chapter 1)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 6);
    game.reset(host, 0);
    const e = nextEvent(host);
    tapPlate(host, plateFor(host, e.item));
    const other = wrongPlateFor(host, e);
    tapPlate(host, other);
    expect(host.queue).toHaveLength(1);
    tapPlate(host, other);
    expect(host.queue).toHaveLength(1);
    expect(host.shake).toBeGreaterThan(0);

    const s2 = await session();
    const one = makeHost(game, s2);
    game.init(one);
    game.reset(one, 0);
    const e2 = nextEvent(one);
    tapPlate(one, plateFor(one, e2.item));
    tapPlate(one, wrongPlateFor(one, e2));
    expect(one.queue).toHaveLength(0);
    expect(one.shake).toBeGreaterThan(0);
  });

  it('the keyboard cursor follows its term when the margin re-deals (§15.1)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 0);
    // max 2: the second arrival widens the margin, and every new plate re-deals it.
    game.reset(host, 3);
    nextEvent(host);
    expect(host.plates).toHaveLength(2);
    press(host, 'ArrowRight');
    expect(host.sel).toBe(0);
    const chosen = host.plates.find((p) => p.slot === 0).item;
    expect(host.selItem).toBe(chosen);

    // Math.random = 0 makes the shuffle a full rotation: slot 0 moves for sure.
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0);
    try {
      until(host, () => live(host).length === 2, 600);
    } finally {
      rnd.mockRestore();
    }
    expect(live(host)).toHaveLength(2);
    expect(host.plates.length).toBeGreaterThan(2);
    const moved = host.plates.find((p) => p.item === chosen);
    expect(moved).toBeDefined();
    expect(moved.slot).not.toBe(0);
    expect(host.sel).toBe(moved.slot);
    expect(host.selItem).toBe(chosen);

    press(host, ' ');
    expect(host.hands.busy).toBeGreaterThan(0);
    settle(host);
    const call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(chosen.english);
  });

  it('the last fact of a chg beat still changes gesture when the pool is empty (FRATTURA)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 3);
    game.reset(host, 0);
    expect(host.cfg.chg).toBe(true);
    expect(host.cfg.max).toBe(1);

    const lastFact = () =>
      host.spawned === host.need &&
      host.pool.length === 0 &&
      live(host).length === 1 &&
      live(host)[0].morphT > 0;
    let frames = 0;
    while (frames < CAP && !lastFact()) {
      if (host.state.done || host.state.coach) break;
      if (idle(host)) {
        const d = decide(host);
        if (d && d.plate) tapPlate(host, d.plate);
      }
      game.update(host, STEP);
      frames += 1;
    }
    expect(lastFact()).toBe(true);
    const e = live(host)[0];
    const item = e.item;
    const kind = e.kind;
    e.morphT = 0.001;
    until(host, () => e.changed === true, 10);
    expect(e.changed).toBe(true);
    expect(e.kind).not.toBe(kind);
    expect(e.item).toBe(item);
    expect(host.pool).toEqual([]);
    expect(plateFor(host, item)).not.toBeNull();

    const r = playBeat(host, ctx);
    expect(r.frames).toBeLessThan(CAP);
    expect(host.finished).toBe(true);
    expect(item.state).toBe('cleared');
  });

  it('the counter carries the cracks, so it never reads full while one waits', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 5);
    game.reset(host, 0);
    expect(host.need).toBe(3);
    expect(host.cracks).toHaveLength(1);
    const texts = [];
    ctx.fillText = (t) => texts.push(String(t));
    game.draw(host, ctx);
    expect(texts).toContain('0 / 4');

    const cr = host.cracks[0];
    nextEvent(host);
    tapPlate(host, plateFor(host, cr.item));
    settle(host);
    expect(cr.fixed).toBe(true);
    texts.length = 0;
    game.draw(host, ctx);
    expect(texts).toContain('1 / 4');
  });

  it('a plate carried while nothing waits grades nothing, even if a fact arrives mid-trip (§46.2)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    until(host, () => host.t >= 0.8, 60);
    expect(live(host)).toHaveLength(0);
    tapPlate(host, host.plates[0]);
    expect(host.hands.busy).toBeGreaterThan(0);
    settle(host);
    // The first fact walked in at 1.2 s, while the hands were still out.
    expect(host.t).toBeGreaterThan(1.2);
    const e = live(host)[0];
    expect(e).toBeDefined();
    expect(e.dead).toBe(false);
    expect(e.wrong).toBe(0);
    expect(e.aided).toBe(false);
    expect(s.totalAttempts).toBe(0);
    expect(analyticsService.recordResponse).not.toHaveBeenCalled();
    expect(host.streak).toEqual({ kind: null, n: 0 });
    expect(host.state.coach).toBeNull();
  });

  it('leaves the session mode alone and labels every attempt with its own mode', async () => {
    const s = await createLevelSession({
      surface: 'cybersecurity',
      level: 0,
      mode: 'learn',
      progressManager: { addXP: vi.fn() },
    });
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    expect(s.mode).toBe('learn');
    const e = nextEvent(host);
    tapPlate(host, plateFor(host, e.item));
    settle(host);
    expect(s.mode).toBe('learn');
    expect(analyticsService.recordResponse.mock.calls.at(-1)[0].exerciseMode).toBe('casa');
  });
});
