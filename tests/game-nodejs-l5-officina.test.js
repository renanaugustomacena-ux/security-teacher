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
import { beatItems, meaningOf, labelOf } from '../js/games/LevelBeats.js';
import game from '../js/games/levels/nodejs-l5-officina.js';
import {
  makeContext2D,
  installDocumentDouble,
  makeHost,
  useChapter,
  run,
  assertShape,
} from './helpers/game-conformance.js';

const H = game.H;
const STEP = 1 / 60;
const MODE = 'officina';

async function session() {
  return createLevelSession({
    surface: 'nodejs',
    level: 4,
    mode: MODE,
    progressManager: { addXP: vi.fn() },
  });
}

function airborne(host) {
  return host.tools.filter((t) => !t.gone && !t.grab);
}

/** The primary gesture: a quick stroke through the cube (≥ 220 px/s). */
function stroke(host, t) {
  const a = { x: t.x - 40, y: t.y + 12, t: 0 };
  const b = { x: t.x + 40, y: t.y - 12, t: 40 };
  game.drag(host, a, b);
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

/** The next cube that has risen into view. */
function nextTool(host, pred = () => true, maxFrames = 3000) {
  until(host, () => airborne(host).some((t) => t.y < H - 20 && pred(t)), maxFrames);
  return airborne(host).find((t) => t.y < H - 20 && pred(t)) || null;
}

/**
 * Drive one beat as a competent fitter would: whenever a cube the bench asks
 * for is in view, stroke through it (twice when it wears the band); let every
 * other cube fall. Public input API only.
 */
function playBeat(host, ctx, { maxFrames = 8000, draw = true } = {}) {
  const grabbed = [];
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    if (!host.finished && host.motor) {
      const t = airborne(host).find((k) => k.want && k.cool <= 0 && k.y < H - 20);
      if (t) {
        stroke(host, t);
        if (!t.twice || t.grabs >= 2) grabbed.push(t.item);
      }
    }
    game.update(host, STEP);
    if (draw) game.draw(host, ctx);
    frames += 1;
  }
  return { frames, grabbed };
}

/** The same bot with no pointer: a digit picks the cube, space or Enter grabs. */
function playBeatByKeyboard(host, ctx, { maxFrames = 8000 } = {}) {
  const grabbed = [];
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    if (!host.finished && host.motor) {
      const list = airborne(host).sort((p, q) => p.x - q.x);
      const t = list.find((k) => k.want && k.cool <= 0 && k.y < H - 20);
      if (t) {
        press(host, String(list.indexOf(t) + 1));
        press(host, grabbed.length % 2 ? 'Enter' : ' ');
        if (!t.twice || t.grabs >= 2) grabbed.push(t.item);
      }
    }
    game.update(host, STEP);
    game.draw(host, ctx);
    frames += 1;
  }
  return { frames, grabbed };
}

/** Walk the level the way GameHost does: through the engine's own goBeat/next. */
function eachBeatViaEngine(host, fn) {
  engine.goBeat(host, 0, 0);
  for (let n = 0; n < 40; n += 1) {
    fn(host.state.chapter, host.state.beat);
    if (n < 39) engine.next(host);
  }
}

/** Only the beat's own term on the bench, no foils: the same cube keeps coming. */
function narrowBench(host, { absRate = 0 } = {}) {
  host.wanted = [host.item];
  host.foils = absRate > 0 ? host.foils.slice(0, 1) : [];
  host.cfg = { ...host.cfg, absRate };
}

describe("L'officina di notte — conformance (SDK design §8, DOCTRINE §46)", () => {
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
    expect(game.meta.id).toBe('nodejs-l5-officina');
    expect(game.meta.surface).toBe('nodejs');
    expect(game.meta.level).toBe(4);
    expect(game.meta.register).toBe('R6');
    expect(game.meta.levelLabel).toBe(
      'Node.js · L5 File System e Path / Node.js · L5 File System & Path'
    );
    expect(game.meta.title).toBe("L'officina di notte");
    expect(game.meta.titleEn).toBe('The night workshop');
    for (const fn of ['drag', 'key', 'coachText', 'doneView', 'onCoachClose']) {
      expect(typeof game[fn]).toBe('function');
    }
  });

  it('runs the whole shift: eight chapters of five beats with the template knobs', () => {
    expect(game.CH).toHaveLength(8);
    expect(game.CH.every((c) => c.beats.length === 5)).toBe(true);
    for (const c of game.CH) {
      for (const b of c.beats) {
        for (const k of ['wants', 'foils', 'flight', 'air', 'spawn', 'steps', 'lives', 'absRate']) {
          expect(typeof b[k]).toBe('number');
        }
        // NUMERI: never under 1.8 s of flight, the name has to be read; ≤ 3 in the air.
        expect(b.flight).toBeGreaterThanOrEqual(1.8);
        expect(b.air).toBeLessThanOrEqual(3);
        expect(b.steps).toBeGreaterThanOrEqual(b.wants);
      }
    }
    // The tutorial beats cannot be lost; the band chapter starts at chapter 4.
    expect(game.CH[0].beats[0].lives).toBe(Infinity);
    expect(game.CH[0].beats[0].foils).toBe(0);
    expect(game.CH[3].beats[0].band).toBe(true);
    expect(game.CH[0].beats[0].band).toBe(false);
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
        // The first cube rises at 0.6 s: 2.5 s draws cubes, the bench and the trail.
        expect(() => run(host, game, surface, 2.5)).not.toThrow();
        expect(host.tools.length).toBeGreaterThan(0);
        expect(host.wanted.length).toBe(host.cfg.wants);
      }
    }
  });

  it('follows the chapter the engine installed and covers all forty terms over forty beats (§46.5)', async () => {
    const s = await session();
    expect(s.items).toHaveLength(40);
    expect(s.lessons).toHaveLength(4);
    const host = makeHost(game, s);
    game.init(host);

    const keys = new Set();
    eachBeatViaEngine(host, (chapter, beat) => {
      expect(host.chapter, `chapter ${chapter} beat ${beat}`).toBe(chapter);
      expect(host.terms).toEqual(beatItems(s, chapter, beat));
      expect(host.item).toBe(s.items[chapter * 5 + beat]);
      expect(host.wanted[0]).toBe(host.item);
      for (const term of host.terms) keys.add(term.key);
    });
    expect(keys.size).toBe(40);
    expect(keys).toEqual(new Set(s.items.map((i) => i.key)));
  });

  it('introduces the wanted terms when the bench shows their meaning, never the foils', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 2);
    host.state.beat = 3;
    game.reset(host, 3);
    expect(host.item).toBe(s.items[13]);
    for (const term of host.wanted) expect(term.state).toBe('introduced');
    for (const term of host.foils) expect(term.state).toBe('unseen');
    expect(s.progress().introduced).toBe(host.wanted.length);
  });

  it('a scripted bot grabbing every wanted cube finishes the piece, clears and speaks the terms', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: false });
    game.init(host);
    game.reset(host, 0);

    const { frames, grabbed } = playBeat(host, ctx);
    expect(frames).toBeLessThan(8000);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(host.step).toBeGreaterThanOrEqual(host.cfg.steps);
    expect(grabbed.length).toBe(host.step);
    for (const term of host.wanted) expect(term.state).toBe('cleared');
    expect(host.item.state).toBe('cleared');
    expect(spoken).toEqual(grabbed.map((i) => i.english));
    expect(s.totalCorrect).toBe(grabbed.length);
    expect(s.totalAttempts).toBe(grabbed.length);
    expect(storageService.save).toHaveBeenCalled();
    for (const [, record] of storageService.save.mock.calls) {
      expect(record).toEqual(expect.objectContaining({ beat: 0, chapter: 0 }));
    }
  });

  it('a mute host works in silence', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: true });
    game.init(host);
    game.reset(host, 0);
    playBeat(host, ctx);
    expect(host.finished).toBe(true);
    expect(spoken).toEqual([]);
  });

  /**
   * §46.5: the whole level, beat after beat, under the bot through the
   * engine. Afterwards the ledger must let the level pass.
   */
  it('the bot playing all forty beats through the engine completes the level ledger', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    eachBeatViaEngine(host, (chapter, beat) => {
      const { frames } = playBeat(host, ctx, { draw: true });
      expect(frames, `chapter ${chapter} beat ${beat} hit the frame cap`).toBeLessThan(8000);
      expect(host.finished, `chapter ${chapter} beat ${beat} did not finish`).toBe(true);
      expect(host.state.done).toBe(true);
      expect(host.state.coach).toBeNull();
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

  it('grades a wrong grab through the SDK with the real pick against the real target (§46.2)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 1);
    expect(host.foils.length).toBe(2);
    host.cfg = { ...host.cfg, absRate: 1 };

    const foil = nextTool(host, (t) => !t.want);
    expect(foil).not.toBeNull();
    expect(host.foils.includes(foil.item)).toBe(true);
    stroke(host, foil);

    expect(host.motor).toBe(0);
    expect(host.blown).toBe(1);
    expect(host.step).toBe(0);
    expect(host.state.coach).toBeNull();
    expect(s.totalAttempts).toBe(1);
    expect(s.totalCorrect).toBe(0);
    expect(host.item.state).toBe('attempted');
    expect(foil.item.state).toBe('unseen');

    const call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(false);
    expect(call.exerciseMode).toBe(MODE);
    expect(call.userAnswer).toBe(foil.item.english);
    expect(call.expectedAnswer).toBe(host.item.english);
    expect(call.userAnswer).not.toBe(call.expectedAnswer);

    // The motor comes back on its own; the cubes in the air are gone.
    until(host, () => host.motor === 1, 120);
    expect(host.motor).toBe(1);
    expect(host.tools).toEqual([]);
  });

  it('lights the bench on the second error and reports the aid to the SDK on the next grab', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 1);
    narrowBench(host, { absRate: 1 });
    const attempt = vi.spyOn(host.item, 'attempt');

    for (let n = 0; n < 2; n += 1) {
      const foil = nextTool(host, (t) => !t.want);
      expect(foil).not.toBeNull();
      stroke(host, foil);
      // The bench lights up only on the second error, for 400 ms.
      expect(host.reveal > 0).toBe(n === 1);
      until(host, () => host.motor === 1, 120);
    }
    expect(host.streak).toEqual({ kind: 'grab', key: host.foils[0].key, n: 2 });
    expect(host.reveal).toBeLessThanOrEqual(0);
    expect(host.aided.has(host.item.key)).toBe(true);
    expect(host.state.coach).toBeNull();
    expect(attempt).toHaveBeenCalledTimes(2);
    expect(attempt.mock.calls.every(([, o]) => o.hintsUsed === 0)).toBe(true);

    // The right cube glows from here, and the grab is reported as aided.
    host.cfg = { ...host.cfg, absRate: 0 };
    const right = nextTool(host, (t) => t.want);
    expect(right.item).toBe(host.item);
    expect(right.glow).toBe(1);
    stroke(host, right);
    expect(attempt).toHaveBeenCalledTimes(3);
    const [pick, opts] = attempt.mock.calls.at(-1);
    expect(pick).toBe(host.item.english);
    expect(opts.hintsUsed).toBe(1);
    expect(opts.silent).toBe(true);
    expect(opts.mode).toBe(MODE);
    expect(host.item.state).toBe('cleared');
  });

  it('opens the "grab" coach on the third wrong grab, with the term in the rule (ricerca/00 passo 6)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 1);
    narrowBench(host, { absRate: 1 });
    const foilItem = host.foils[0];

    for (let n = 0; n < 3; n += 1) {
      const foil = nextTool(host, (t) => !t.want);
      stroke(host, foil);
      if (n < 2) expect(host.state.coach).toBeNull();
      until(host, () => host.motor === 1, 120);
    }
    expect(host.coachKind).toBe('grab');
    expect(host.state.coach).toEqual({
      kind: 'grab',
      pick: foilItem.english,
      word: host.item.english,
      it: meaningOf(host.item, 'it'),
    });
    expect(s.totalAttempts).toBe(3);
    for (const lang of ['it', 'en']) {
      const copy = game.coachText(host, host.state.coach, lang);
      expect(copy.rule).toContain(host.item.english);
      expect(copy.what).toContain(foilItem.english);
    }
    // Three blown motors: the lamps come back for the next try.
    expect(host.blown).toBe(0);
    game.onCoachClose(host);
    expect(host.coachKind).toBeNull();
    expect(host.streak.n).toBe(0);
  });

  it('a wanted cube that falls is not an attempt; three falls open the "miss" coach', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    narrowBench(host);

    const frames = until(host, () => host.state.coach !== null, 60 * 40);
    expect(host.state.coach).toEqual({
      kind: 'miss',
      pick: '',
      word: host.item.english,
      it: meaningOf(host.item, 'it'),
    });
    expect(host.coachKind).toBe('miss');
    // Three flights of 2.6 s plus the spawn gaps: the sheet's numbers.
    expect(frames / 60).toBeGreaterThan(9);
    expect(frames / 60).toBeLessThan(20);
    expect(s.totalAttempts).toBe(0);
    expect(host.item.state).toBe('introduced');
    expect(host.aided.has(host.item.key)).toBe(true);
    expect(game.coachText(host, host.state.coach, 'it').rule).toContain(host.item.english);
  });

  it('a banded cube grabbed once and dropped opens the "half" coach on the third time', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 3);
    game.reset(host, 0);
    narrowBench(host);
    expect(host.cfg.band).toBe(true);

    for (let n = 0; n < 3; n += 1) {
      const t = nextTool(host, (k) => k.want && k.grabs === 0);
      expect(t.twice).toBe(true);
      stroke(host, t);
      expect(t.grabs).toBe(1);
      expect(t.gone).toBe(false);
      until(host, () => t.gone, 600);
      if (n < 2) expect(host.state.coach).toBeNull();
    }
    expect(host.coachKind).toBe('half');
    expect(host.state.coach.kind).toBe('half');
    expect(host.state.coach.word).toBe(host.item.english);
    expect(s.totalAttempts).toBe(0);
    expect(game.coachText(host, host.state.coach, 'en').rule).toContain(host.item.english);

    // Two strokes on the band are one grab, one graded response.
    game.onCoachClose(host);
    const t = nextTool(host, (k) => k.want && k.grabs === 0);
    stroke(host, t);
    until(host, () => t.cool <= 0, 30);
    stroke(host, t);
    expect(t.grab).toBeGreaterThan(0);
    expect(s.totalAttempts).toBe(1);
    expect(s.totalCorrect).toBe(1);
  });

  it('a dropped foil is the right non-action: no attempt, streak reset, nothing dark', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 0);
    host.cfg = { ...host.cfg, absRate: 1 };
    host.streak = { kind: 'miss', key: host.item.key, n: 1 };
    const foil = nextTool(host, (t) => !t.want);
    until(host, () => foil.gone, 600);
    expect(foil.gone).toBe(true);
    expect(s.totalAttempts).toBe(0);
    expect(host.motor).toBe(1);
    expect(host.blown).toBe(0);
    expect(host.streak.n).toBe(0);
    expect(host.state.coach).toBeNull();
  });

  it('offers bilingual coach copy for every kind with the placeholders filled in', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    const coach = { pick: 'appendFile', word: 'readFile', it: 'Lettura file asincrona' };
    for (const kind of ['grab', 'miss', 'half']) {
      const copies = ['it', 'en'].map((lang) => game.coachText(host, { ...coach, kind }, lang));
      for (const copy of copies) {
        for (const field of ['what', 'effect', 'rule', 'hint']) {
          expect(copy[field].length).toBeGreaterThan(0);
          expect(copy[field]).not.toContain('{');
        }
        // ricerca/34: the rule line always carries the English term.
        expect(copy.rule).toContain(coach.word);
        expect(`${copy.effect} ${copy.rule}`).toContain(coach.it);
      }
      expect(copies[0].what).not.toBe(copies[1].what);
      expect(copies[0].rule).not.toBe(copies[1].rule);
    }
    expect(game.coachText(host, { ...coach, kind: 'grab' }, 'it').what).toContain(coach.pick);
  });

  it('shows the term and its meaning on the done screen, in either language, without stars', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 4);
    game.reset(host, 2);
    const copyIt = game.doneView(host, 'it');
    const copyEn = game.doneView(host, 'en');
    expect(copyIt.title).toBe(labelOf(host.item));
    expect(copyEn.title).toBe(copyIt.title);
    expect(copyIt.eyebrow).toBe('Pezzo finito');
    expect(copyEn.eyebrow).toBe('Piece finished');
    expect(copyIt.subtitle).toContain(meaningOf(host.item, 'it'));
    expect(copyEn.subtitle).toContain(meaningOf(host.item, 'it'));
    expect(copyIt.subtitle).not.toBe(copyEn.subtitle);
    for (const copy of [copyIt, copyEn]) {
      expect(copy.title).not.toMatch(/[★%]/);
      expect(copy.subtitle).not.toMatch(/[★%]/);
    }
  });

  it('every cube carries a real term of the level; fillers and foils come from the same lesson (TEST 1)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    const labels = new Set(s.items.map((i) => i.english));

    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        host.state.beat = beat;
        game.reset(host, beat);
        const lesson = host.item.lesson;
        expect(host.wanted).toHaveLength(host.cfg.wants);
        expect(host.foils.length).toBeLessThanOrEqual(host.cfg.foils);
        expect(host.wanted.length + host.foils.length).toBeLessThanOrEqual(10);
        for (const term of host.wanted.concat(host.foils)) expect(term.lesson).toBe(lesson);
        // No term is both asked for and a foil.
        for (const term of host.foils) expect(host.wanted.includes(term)).toBe(false);
        expect(new Set(host.wanted.concat(host.foils)).size).toBe(
          host.wanted.length + host.foils.length
        );
        run(host, game, ctx, 2.5);
        expect(host.tools.length).toBeGreaterThan(0);
        for (const t of host.tools) {
          expect(labels.has(t.name)).toBe(true);
          expect(t.name).toBe(labelOf(t.item));
          expect(t.item.lesson).toBe(lesson);
          // The height is dealt by index, never by wanted/foil.
          expect(t.shape).toBe([14, 20, 26, 32][t.item.index % 4]);
        }
      }
    }
  });

  /**
   * §15.4 wants a static-equivalent that looks deliberate, not a frozen one.
   * The cubes are the game and cannot stop, so the register slows the arc and
   * the engine spawns no particles at all.
   */
  it('slows the arc to 0.7× and skips particles under prefers-reduced-motion', async () => {
    const collect = (host) => {
      const seen = new Map();
      for (let frame = 0; frame < 60 * 12; frame += 1) {
        for (const t of host.tools) seen.set(t.id, t);
        game.update(host, STEP);
      }
      return [...seen.values()];
    };

    const s = await session();
    const normal = makeHost(game, s, { reduceMotion: false });
    game.init(normal);
    useChapter(normal, game, 6);
    game.reset(normal, 0);
    const fast = collect(normal);

    const s2 = await session();
    const reduced = makeHost(game, s2, { reduceMotion: true });
    game.init(reduced);
    useChapter(reduced, game, 6);
    game.reset(reduced, 0);
    const slow = collect(reduced);

    expect(fast.length).toBeGreaterThanOrEqual(3);
    expect(slow.length).toBeGreaterThanOrEqual(3);
    const flight = normal.cfg.flight;
    for (const t of fast) expect(t.flight).toBeCloseTo(flight, 9);
    for (const t of slow) expect(t.flight).toBeCloseTo(flight / 0.7, 9);
    expect(Math.max(...slow.map((t) => t.v0))).toBeLessThan(Math.min(...fast.map((t) => t.v0)));

    game.reset(reduced, 0);
    playBeat(reduced, ctx);
    expect(reduced.finished).toBe(true);
    expect(reduced.parts).toHaveLength(0);
  });

  it('under prefers-reduced-motion the lamp, the fitter and the glow hold still (§11.6)', async () => {
    const record = (host) => {
      const calls = [];
      for (const name of ['arc', 'fillRect', 'moveTo', 'lineTo', 'fillText', 'translate']) {
        ctx[name] = (...args) => calls.push(`${name}:${args.join(',')}`);
      }
      Object.defineProperty(ctx, 'shadowBlur', {
        configurable: true,
        get: () => 0,
        set: (v) => {
          calls.push(`blur:${v}`);
        },
      });
      ctx.createRadialGradient = (...args) => {
        calls.push(`radial:${args.join(',')}`);
        return { addColorStop() {} };
      };
      Object.defineProperty(ctx, 'strokeStyle', {
        configurable: true,
        get: () => '',
        set: (v) => {
          calls.push(`stroke:${v}`);
        },
      });
      game.draw(host, ctx);
      const first = calls.slice();
      calls.length = 0;
      host.t += 0.3;
      game.draw(host, ctx);
      return { first, second: calls.slice() };
    };

    const s = await session();
    const reduced = makeHost(game, s, { reduceMotion: true });
    game.init(reduced);
    useChapter(reduced, game, 1);
    game.reset(reduced, 1);
    narrowBench(reduced, { absRate: 1 });
    for (let n = 0; n < 2; n += 1) {
      stroke(
        reduced,
        nextTool(reduced, (t) => !t.want)
      );
      until(reduced, () => reduced.motor === 1, 120);
    }
    reduced.cfg = { ...reduced.cfg, absRate: 0 };
    const right = nextTool(reduced, (t) => t.want);
    expect(right.glow).toBe(1);
    const still = record(reduced);
    expect(still.second).toEqual(still.first);
    // The aid is a flat teal ring in the register's target colour — R6 has
    // no halos or blur (ricerca/42 §42.4 "illuminazione realistica").
    expect(still.first.some((c) => c === 'stroke:#3FE0C5')).toBe(true);
    expect(still.first.some((c) => c.startsWith('blur:'))).toBe(false);
    expect(still.first.some((c) => c.startsWith('radial:'))).toBe(false);

    const s2 = await session();
    const normal = makeHost(game, s2, { reduceMotion: false });
    game.init(normal);
    game.reset(normal, 0);
    nextTool(normal);
    const moving = record(normal);
    expect(moving.second).not.toEqual(moving.first);
  });

  it('the keyboard plays the same game as the finger (§15.1, ricerca/33)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 2);
    narrowBench(host, { absRate: 1 });

    const foil = nextTool(host, (t) => !t.want);
    press(host, 'ArrowRight');
    expect(host.kbUsed).toBe(true);
    expect(host.sel).toBe(foil);
    press(host, 'ArrowDown');
    expect(host.sel).toBeNull();
    press(host, 'ArrowLeft');
    expect(host.sel).toBe(foil);
    press(host, '1');
    expect(host.sel).toBe(foil);

    // A wrong cube by keyboard cuts the motor exactly like a wrong stroke.
    press(host, ' ');
    expect(host.motor).toBe(0);
    expect(s.totalAttempts).toBe(1);
    let call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.exerciseMode).toBe(MODE);
    expect(call.userAnswer).toBe(foil.item.english);
    expect(call.expectedAnswer).toBe(host.item.english);
    expect(host.sel).toBeNull();

    // The right cube by keyboard builds the piece.
    until(host, () => host.motor === 1, 120);
    host.cfg = { ...host.cfg, absRate: 0 };
    const right = nextTool(host, (t) => t.want);
    press(host, '1');
    expect(host.sel).toBe(right);
    press(host, 'Enter');
    expect(right.grab).toBeGreaterThan(0);
    expect(host.item.state).toBe('cleared');
    expect(s.totalCorrect).toBe(1);
    call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(host.item.english);
    expect(call.expectedAnswer).toBe(host.item.english);
  });

  it('a keyboard-only bot finishes a beat with two cubes in the air', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 0);
    game.reset(host, 2);
    expect(host.cfg.air).toBe(2);

    const { frames, grabbed } = playBeatByKeyboard(host, ctx);
    expect(frames).toBeLessThan(8000);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(grabbed.length).toBe(host.step);
    for (const term of host.wanted) expect(term.state).toBe('cleared');
    expect(s.totalCorrect).toBe(grabbed.length);
    expect(s.totalAttempts).toBe(grabbed.length);
  });

  it('a slow stroke or a stroke past the cube grabs nothing', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    const t = nextTool(host);
    game.drag(host, { x: t.x - 40, y: t.y, t: 0 }, { x: t.x + 40, y: t.y, t: 2000 });
    expect(t.grab).toBe(0);
    game.drag(host, { x: t.x - 300, y: t.y - 300, t: 0 }, { x: t.x - 200, y: t.y - 300, t: 40 });
    expect(t.grab).toBe(0);
    expect(s.totalAttempts).toBe(0);
    expect(host.trail.length).toBe(2);
  });
});
