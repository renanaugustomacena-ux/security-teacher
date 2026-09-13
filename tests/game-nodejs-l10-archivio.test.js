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
import game from '../js/games/levels/nodejs-l10-archivio.js';
import {
  makeContext2D,
  installDocumentDouble,
  makeHost,
  useChapter,
  run,
  assertShape,
} from './helpers/game-conformance.js';

const STEP = 1 / 60;
const STY = 156;
const ST = 80;
const TRAYY = 524;
const LEVER = { x: 210, y: 806 };
const CAGE_TOP = 158;
const PARTS = [
  'SELECT *',
  'SELECT nome,email',
  'SELECT nome',
  'WHERE attivo',
  'WHERE id=7',
  'LIMIT 20',
  'ORDER BY data',
  'INDEX(email)',
  'JOIN ordini',
  'COUNT(*)',
];

async function session() {
  return createLevelSession({
    surface: 'nodejs',
    level: 9,
    mode: 'archivio',
    progressManager: { addXP: vi.fn() },
  });
}

function current(host) {
  return host.orders[host.ji] || null;
}

function plateIndex(host, item) {
  const o = current(host);
  return o ? o.plates.findIndex((p) => p.item === item) : -1;
}

function bandPoint(i) {
  return { x: 330, y: STY + i * ST + 40 };
}

function stonePoint(host, part) {
  const i = host.cfg.tray.indexOf(part);
  const w = 420 / 2.2;
  return { x: 210 + ((i % 2) - 0.5) * w, y: TRAYY + Math.floor(i / 2) * 50 };
}

function tapLayer(host, i) {
  game.tap(host, bandPoint(i));
}

function tapPart(host, part) {
  game.tap(host, stonePoint(host, part));
}

function pullLever(host) {
  game.tap(host, LEVER);
}

/** Lower the cage into the right layer, load exactly the wanted parts, pull. */
function solveOrder(host, { layer = null, parts = null } = {}) {
  const o = current(host);
  if (!o) return null;
  const li = layer == null ? plateIndex(host, o.item) : layer;
  tapLayer(host, li);
  for (const p of parts || o.job.want) tapPart(host, p);
  pullLever(host);
  return o;
}

function wrongPlate(host) {
  const o = current(host);
  return o.plates.find((p) => p.item !== o.item);
}

/**
 * Drive one beat as a competent archivist: one order per frame, through the
 * public tap API only. A run that never reaches `done` is a mute dead end,
 * which ricerca/31 §31.12 forbids — the assertions catch that.
 */
function playBeat(host, ctx, { maxFrames = 600, draw = true } = {}) {
  const filled = [];
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    if (!host.finished) {
      const o = solveOrder(host);
      if (o) filled.push(o.item);
    }
    game.update(host, STEP);
    if (draw) game.draw(host, ctx);
    frames += 1;
  }
  return { frames, filled };
}

function press(host, k) {
  game.key(host, { key: k, preventDefault() {} });
}

/** The same bot with no pointer: ↑↓ pick the layer, digits load, space pulls. */
function playBeatByKeyboard(host, ctx, { maxFrames = 600 } = {}) {
  const filled = [];
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    if (!host.finished) {
      const o = current(host);
      const li = plateIndex(host, o.item);
      while (host.strat !== li) press(host, 'ArrowDown');
      for (const p of o.job.want) press(host, String(host.cfg.tray.indexOf(p) + 1));
      press(host, ' ');
      filled.push(o.item);
    }
    game.update(host, STEP);
    game.draw(host, ctx);
    frames += 1;
  }
  return { frames, filled };
}

function until(host, pred, maxFrames = 3000) {
  let frames = 0;
  while (frames < maxFrames && !pred()) {
    game.update(host, STEP);
    frames += 1;
  }
  return frames;
}

/**
 * Walk the level the way GameHost does: through the engine's own goBeat/next,
 * which installs the chapter, resets, and only then writes state.chapter.
 */
function eachBeatViaEngine(host, fn) {
  engine.goBeat(host, 0, 0);
  for (let n = 0; n < 40; n += 1) {
    fn(host.state.chapter, host.state.beat);
    if (n < 39) engine.next(host);
  }
}

describe("L'archivio — conformance (SDK design §8, DOCTRINE §46)", () => {
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
    expect(game.meta.surface).toBe('nodejs');
    expect(game.meta.level).toBe(9);
    expect(game.meta.id).toBe('nodejs-l10-archivio');
    expect(game.meta.register).toBe('R4');
    expect(game.meta.levelLabel).toContain(' / ');
    expect(game.drone).toEqual({ freq: 40, type: 'triangle', volume: 0.014, lowpass: 120 });
    for (const fn of ['tap', 'key', 'coachText', 'doneView', 'onCoachClose']) {
      expect(typeof game[fn]).toBe('function');
    }
  });

  it('runs the whole shift: eight chapters of five orders, with the template knobs', () => {
    expect(game.CH).toHaveLength(8);
    expect(game.CH.every((c) => c.beats.length === 5)).toBe(true);
    game.CH.forEach((c, ci) => {
      for (const b of c.beats) {
        expect(b.need).toBeGreaterThanOrEqual(2);
        expect(b.rows).toBe(1000);
        expect(b.plates).toBe(ci < 2 ? 3 : 4);
        expect(b.timer > 0).toBe(ci >= 6);
        expect(b.jobs.length).toBeGreaterThan(0);
        // Every order can be composed from its reserve (the FRATTURA beat
        // included, whose template tray lacked the COUNT(*) it asked for).
        for (const j of b.jobs) {
          for (const p of j.want) expect(b.tray).toContain(p);
          expect(j.budget).toBeGreaterThan(0);
        }
        for (const p of b.tray) expect(PARTS).toContain(p);
      }
    });
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
        expect(() => run(host, game, surface, 1.2)).not.toThrow();
        expect(current(host)).not.toBeNull();
        expect(current(host).plates).toHaveLength(host.cfg.plates);
        // With the cage lowered and a part loaded the frame draws the load too.
        tapLayer(host, 0);
        tapPart(host, host.cfg.tray[0]);
        expect(() => run(host, game, surface, 0.5)).not.toThrow();
        expect(host.card).toHaveLength(1);
      }
    }
  });

  it('follows the chapter the engine installed, so the forty beats cover the forty terms (§46.5)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    const keys = new Set();
    eachBeatViaEngine(host, (chapter, beat) => {
      expect(host.chapter, `chapter ${chapter} beat ${beat}`).toBe(chapter);
      expect(host.terms).toEqual(beatItems(s, chapter, beat));
      expect(host.item).toBe(s.items[chapter * 5 + beat]);
      expect(host.orders[0].item).toBe(host.item);
      expect(host.orders).toHaveLength(host.cfg.need);
      for (const t of host.terms) keys.add(t.key);
    });
    expect(keys.size).toBe(40);
    expect(keys).toEqual(new Set(s.items.map((i) => i.key)));
    expect(host.state.chapter).toBe(7);
  });

  it('introduces a term when its order hangs from the headframe, not before', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 2);
    host.state.beat = 3;
    game.reset(host, 3);

    expect(host.item.state).toBe('introduced');
    expect(s.progress().introduced).toBe(1);
    expect(host.orders[1].item.state).toBe('unseen');
    solveOrder(host);
    expect(host.made).toBe(1);
    expect(host.orders[1].item.state).toBe('introduced');
    expect(s.progress().introduced).toBe(2);
  });

  it('a scripted bot filling every order clears the terms, speaks them and persists', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: false });
    game.init(host);
    game.reset(host, 0);

    const { frames, filled } = playBeat(host, ctx);
    expect(frames).toBeLessThan(600);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(host.made).toBe(host.cfg.need);
    expect(filled).toHaveLength(host.cfg.need);
    expect(filled[0]).toBe(host.item);
    for (const item of filled) expect(item.state).toBe('cleared');
    expect(spoken).toEqual(filled.map((i) => i.english));
    expect(s.totalCorrect).toBe(host.cfg.need);
    expect(s.totalAttempts).toBe(host.cfg.need);
    expect(storageService.save).toHaveBeenCalledTimes(host.cfg.need);
    for (const [key, record] of storageService.save.mock.calls) {
      expect(key).toBe('progress');
      expect(record).toEqual(expect.objectContaining({ beat: 0, chapter: 0 }));
    }
  });

  it('a mute host hoists in silence', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: true });
    game.init(host);
    game.reset(host, 0);
    playBeat(host, ctx);
    expect(host.finished).toBe(true);
    expect(spoken).toEqual([]);
  });

  it('the bot playing all forty beats through the engine completes the level ledger', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    eachBeatViaEngine(host, (chapter, beat) => {
      const { frames } = playBeat(host, ctx);
      expect(frames, `chapter ${chapter} beat ${beat} hit the frame cap`).toBeLessThan(600);
      expect(host.finished, `chapter ${chapter} beat ${beat} did not finish`).toBe(true);
      expect(host.state.done).toBe(true);
      expect(host.bad).toBe(0);
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

  it('grades a wrong layer through the SDK with the real pick against the real target (§46.2)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const o = current(host);
    const wrong = wrongPlate(host);
    solveOrder(host, { layer: wrong.i });

    expect(host.bad).toBe(1);
    expect(host.made).toBe(0);
    expect(o.item.state).toBe('attempted');
    expect(host.state.coach).toBeNull();
    expect(s.totalAttempts).toBe(1);
    expect(s.totalCorrect).toBe(0);
    // The cage comes back up empty: the physical consequence, no text.
    expect(host.card).toEqual([]);
    expect(host.strat).toBe(-1);
    expect(host.shake).toBeGreaterThan(0);

    const call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(false);
    expect(call.exerciseMode).toBe('archivio');
    expect(call.userAnswer).toBe(wrong.item.english);
    expect(call.expectedAnswer).toBe(o.item.english);
    expect(call.userAnswer).not.toBe(call.expectedAnswer);
  });

  it('lights the right plate on the second wrong layer and reports the aid to the SDK', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const o = current(host);
    const attempt = vi.spyOn(o.item, 'attempt');
    for (let n = 0; n < 2; n += 1) solveOrder(host, { layer: wrongPlate(host).i });
    expect(host.bad).toBe(2);
    expect(o.aided).toBe(true);
    expect(host.state.coach).toBeNull();
    expect(o.plates.find((p) => p.item === o.item).glow).toBe(1);
    expect(attempt).toHaveBeenCalledTimes(2);
    expect(attempt.mock.calls.every(([, opts]) => opts.hintsUsed === 0)).toBe(true);

    solveOrder(host);
    expect(host.made).toBe(1);
    expect(o.item.state).toBe('cleared');
    expect(attempt).toHaveBeenCalledTimes(3);
    const [pick, opts] = attempt.mock.calls.at(-1);
    expect(pick).toBe(o.item.english);
    expect(opts.hintsUsed).toBe(1);
    expect(opts.silent).toBe(true);
    expect(opts.mode).toBe('archivio');
  });

  it('opens the "term" coach on the third wrong layer and restarts the shift (ricerca/00 passo 6)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const o = current(host);
    let last = null;
    for (let n = 0; n < 3; n += 1) {
      last = wrongPlate(host);
      solveOrder(host, { layer: last.i });
      if (n < 2) expect(host.state.coach).toBeNull();
    }
    expect(host.coachKind).toBe('term');
    expect(host.state.coach).toEqual(
      expect.objectContaining({
        kind: 'term',
        pick: last.item.english,
        word: o.item.english,
        it: meaningOf(o.item, 'it'),
      })
    );
    expect(s.totalAttempts).toBe(3);
    for (const lang of ['it', 'en']) {
      expect(game.coachText(host, host.state.coach, lang).rule).toContain(o.item.english);
    }
    // Three failed hoists: the same beat starts over, the ledger keeps the term.
    expect(host.bad).toBe(0);
    expect(host.made).toBe(0);
    expect(host.state.step).toBe(0);
    expect(host.orders[0].item).toBe(o.item);
    expect(o.item.state).toBe('attempted');
    game.onCoachClose(host);
    expect(host.coachKind).toBeNull();
  });

  it('keeps the template\'s "over" ladder: extra weight, the pulsing piece, the coach', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 0);
    game.reset(host, 2);
    const o = current(host);
    expect(o.job.want).toEqual(['SELECT *', 'WHERE id=7']);

    const heavy = ['SELECT *', 'WHERE id=7', 'WHERE attivo'];
    solveOrder(host, { parts: heavy });
    expect(host.bad).toBe(1);
    expect(host.load).toBe(4);
    expect(host.card).toEqual([]);
    // The layer was right and stays chosen: the cage is not hauled back up.
    expect(host.strat).toBe(plateIndex(host, o.item));
    expect(host.state.coach).toBeNull();
    solveOrder(host, { parts: heavy });
    expect(host.pulse).toBeGreaterThan(0);
    expect(host.pulseK).toBe('SELECT *');
    solveOrder(host, { parts: heavy });
    expect(host.coachKind).toBe('over');
    expect(host.state.coach).toEqual(
      expect.objectContaining({ kind: 'over', word: o.item.english, load: 4, budget: 60 })
    );
    // One graded response: the layer, once. The overload is the template's
    // own consequence, not a term attempt.
    expect(s.totalAttempts).toBe(1);
    expect(s.totalCorrect).toBe(1);
    expect(host.bad).toBe(0);
  });

  it('keeps the template\'s "miss" ladder: the missing piece pulses, then the coach', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 0);
    game.reset(host, 2);
    const o = current(host);

    solveOrder(host, { parts: ['SELECT *'] });
    expect(host.bad).toBe(1);
    expect(host.state.coach).toBeNull();
    solveOrder(host, { parts: ['SELECT *'] });
    expect(host.pulseK).toBe('WHERE id=7');
    solveOrder(host, { parts: ['SELECT *'] });
    expect(host.coachKind).toBe('miss');
    expect(host.state.coach).toEqual(
      expect.objectContaining({ kind: 'miss', word: o.item.english, ask: o.job.ask })
    );
    expect(s.totalAttempts).toBe(1);
  });

  it('refuses an empty cage or an unchosen layer without grading anything', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    pullLever(host);
    expect(host.shake).toBeGreaterThan(0);
    tapPart(host, 'SELECT *');
    pullLever(host);
    expect(s.totalAttempts).toBe(0);
    expect(host.bad).toBe(0);
    expect(host.card).toEqual(['SELECT *']);
    // A part already in the cage is refused; tapping the cage takes it out.
    tapPart(host, 'SELECT *');
    expect(host.card).toEqual(['SELECT *']);
    until(host, () => host.cageY > CAGE_TOP + 1, 30);
    game.tap(host, { x: 100, y: host.cageY + 30 });
    expect(host.card).toEqual([]);
  });

  it('the fuse burning out costs a lamp on the game clock, and is not a response', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 6);
    game.reset(host, 0);
    expect(host.cfg.timer).toBe(26);

    tapLayer(host, 0);
    tapPart(host, 'SELECT nome');
    const frames = until(host, () => host.bad === 1, 60 * 30);
    expect(frames / 60).toBeGreaterThan(25.5);
    expect(frames / 60).toBeLessThan(26.5);
    expect(host.card).toEqual([]);
    expect(s.totalAttempts).toBe(0);
    expect(host.state.coach).toBeNull();
    until(host, () => host.bad === 2, 60 * 30);
    const before = host.orders;
    until(host, () => host.orders !== before, 60 * 30);
    expect(host.bad).toBe(0);
    expect(host.made).toBe(0);
    expect(host.orders[0].item).toBe(host.item);
  });

  it('offers bilingual coach copy with the placeholders filled in, the term in every rule', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const coach = {
      pick: 'Connection String',
      word: 'Connection Pool',
      it: 'Pool di connessioni',
      ask: 'Il nome del cliente 7',
      askEn: 'The name of customer 7',
      load: 200,
      budget: 60,
    };
    for (const kind of ['term', 'over', 'miss']) {
      const copies = ['it', 'en'].map((lang) => game.coachText(host, { ...coach, kind }, lang));
      for (const copy of copies) {
        for (const field of ['what', 'effect', 'rule', 'hint']) {
          expect(copy[field].length).toBeGreaterThan(0);
          expect(copy[field]).not.toContain('{');
        }
        expect(copy.rule).toContain(coach.word);
      }
      expect(copies[0].what).not.toBe(copies[1].what);
      expect(copies[0].effect).not.toBe(copies[1].effect);
    }
    const term = game.coachText(host, { ...coach, kind: 'term' }, 'it');
    expect(term.effect).toContain(coach.pick);
    expect(term.effect).toContain(coach.it);
    expect(term.effect).toContain(coach.word);
    const over = game.coachText(host, { ...coach, kind: 'over' }, 'en');
    expect(over.effect).toContain('200');
    expect(over.effect).toContain('60');
    expect(game.coachText(host, { ...coach, kind: 'miss' }, 'en').effect).toContain(coach.askEn);
    expect(game.coachText(host, { ...coach, kind: 'miss' }, 'it').effect).toContain(coach.ask);
  });

  it('shows the term and its meaning on the done screen, in either language', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 7);
    game.reset(host, 2);

    const copyIt = game.doneView(host, 'it');
    const copyEn = game.doneView(host, 'en');
    expect(copyIt.title).toBe(labelOf(host.item));
    expect(copyEn.title).toBe(copyIt.title);
    expect(copyIt.eyebrow).toBe('Commesse evase');
    expect(copyEn.eyebrow).toBe('Orders filled');
    expect(copyIt.subtitle).toContain(meaningOf(host.item, 'it'));
    expect(copyEn.subtitle).toBe('Connection & Pooling');
    expect(copyIt.subtitle).not.toBe(copyEn.subtitle);
    for (const copy of [copyIt, copyEn]) {
      expect(copy.title).not.toMatch(/[%★]/);
    }
  });

  it('every plate is a real term of the level, the neighbours from the same lesson, one right', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    const level = new Set(s.items);
    const rightAt = new Set();

    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        game.reset(host, beat);
        while (!host.finished) {
          const o = current(host);
          expect(o.plates).toHaveLength(host.cfg.plates);
          expect(o.plates.filter((p) => p.item === o.item)).toHaveLength(1);
          const labels = new Set();
          for (const p of o.plates) {
            expect(level.has(p.item)).toBe(true);
            expect(p.item.lesson).toBe(o.item.lesson);
            labels.add(p.item.english);
          }
          expect(labels.size).toBe(o.plates.length);
          // The extra orders are real terms of the same lesson too.
          expect(o.item.lesson).toBe(host.item.lesson);
          rightAt.add(plateIndex(host, o.item));
          solveOrder(host);
        }
      }
    }
    // The right plate moves around: position never gives it away (TEST 1).
    expect(rightAt.size).toBeGreaterThan(1);
  });

  it('slows the cage and skips particles under prefers-reduced-motion', async () => {
    const drop = async (reduceMotion) => {
      const s = await session();
      const host = makeHost(game, s, { reduceMotion });
      game.init(host);
      useChapter(host, game, 3);
      game.reset(host, 0);
      tapLayer(host, 2);
      const y0 = host.cageY;
      game.update(host, STEP);
      return { host, dy: host.cageY - y0 };
    };
    const fast = await drop(false);
    const slow = await drop(true);
    expect(fast.dy).toBeGreaterThan(0);
    expect(slow.dy).toBeCloseTo(fast.dy * 0.7, 6);

    // The load dial eases at 0.7× too.
    tapPart(fast.host, 'SELECT *');
    tapPart(slow.host, 'SELECT *');
    game.update(fast.host, STEP);
    game.update(slow.host, STEP);
    expect(slow.host.loadShown).toBeCloseTo(fast.host.loadShown * 0.7, 6);

    playBeat(slow.host, ctx);
    expect(slow.host.finished).toBe(true);
    expect(slow.host.parts).toHaveLength(0);
  });

  it('the cage descends a stadi — one speed, a stop at every seam — and trembles after a failed pull', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 3);
    game.reset(host, 0);
    const seam1 = STY + ST + 5;
    const seam2 = STY + 2 * ST + 5;
    const bottom = STY + 3 * ST + 5;
    tapLayer(host, 3);
    // One speed, not an ease: equal steps frame after frame.
    game.update(host, STEP);
    const step = host.cageY - CAGE_TOP;
    expect(step).toBeGreaterThan(0);
    game.update(host, STEP);
    expect(host.cageY - CAGE_TOP).toBeCloseTo(step * 2, 6);
    // The first seam: the cage reaches it and holds there before going on.
    expect(until(host, () => host.cageY >= seam1, 120)).toBeLessThan(120);
    expect(host.cageY).toBeCloseTo(seam1, 6);
    game.update(host, STEP);
    game.update(host, STEP);
    expect(host.cageY).toBeCloseTo(seam1, 6);
    // Then the second seam, then the chosen layer, never past it.
    expect(until(host, () => host.cageY > seam1, 60)).toBeLessThan(60);
    expect(until(host, () => host.cageY >= seam2, 120)).toBeLessThan(120);
    expect(host.cageY).toBeCloseTo(seam2, 6);
    expect(until(host, () => host.cageY >= bottom, 240)).toBeLessThan(240);
    expect(host.cageY).toBeCloseTo(bottom, 6);
    game.update(host, STEP);
    expect(host.cageY).toBeCloseTo(bottom, 6);

    // A wrong load: the cage trembles in place and stays at the layer.
    const o = current(host);
    const li = plateIndex(host, o.item);
    expect(host.cfg.tray.length).toBeGreaterThan(o.job.want.length);
    solveOrder(host, { parts: host.cfg.tray });
    expect(host.bad).toBe(1);
    expect(host.tremble).toBeGreaterThan(0);
    expect(host.strat).toBe(li);
    until(host, () => host.tremble <= 0, 120);
    // A wrong layer: the cage rises trembling, all the way up.
    const wrong = wrongPlate(host);
    solveOrder(host, { layer: wrong.i });
    expect(host.tremble).toBeGreaterThan(0);
    expect(host.strat).toBe(-1);
    expect(until(host, () => host.cageY <= CAGE_TOP, 240)).toBeLessThan(240);
    expect(host.cageY).toBeCloseTo(CAGE_TOP, 6);
  });

  it('the cage tremble holds still under prefers-reduced-motion, and moves otherwise', async () => {
    const barsOf = (host) => {
      const lines = [];
      ctx.lineTo = (...a) => lines.push(a.map((v) => Math.round(v * 1000)).join(','));
      game.draw(host, ctx);
      return lines;
    };
    const setup = async (reduceMotion) => {
      const s = await session();
      const host = makeHost(game, s, { reduceMotion });
      game.init(host);
      game.reset(host, 0);
      solveOrder(host, { layer: wrongPlate(host).i });
      expect(host.tremble).toBeGreaterThan(0);
      return host;
    };
    const reduced = await setup(true);
    const a = barsOf(reduced);
    reduced.t += 0.05;
    expect(barsOf(reduced)).toEqual(a);
    const normal = await setup(false);
    const c = barsOf(normal);
    normal.t += 0.05;
    expect(barsOf(normal)).not.toEqual(c);
  });

  it('under prefers-reduced-motion the hint pulse and the over-budget tremble hold still', async () => {
    const frameOf = (host) => {
      const blurs = [];
      const lines = [];
      Object.defineProperty(ctx, 'shadowBlur', {
        configurable: true,
        get: () => 0,
        set: (v) => {
          if (v > 0) blurs.push(v);
        },
      });
      ctx.lineTo = (...a) => lines.push(a.map((v) => Math.round(v * 1000)).join(','));
      game.draw(host, ctx);
      return { blurs, lines };
    };
    const setup = async (reduceMotion) => {
      const s = await session();
      const host = makeHost(game, s, { reduceMotion });
      game.init(host);
      useChapter(host, game, 0);
      game.reset(host, 2);
      solveOrder(host, { parts: ['SELECT *'] });
      solveOrder(host, { parts: ['SELECT *'] });
      expect(host.pulseK).toBe('WHERE id=7');
      // Over budget: 1000 rows against 60.
      tapPart(host, 'SELECT *');
      until(host, () => host.loadShown > 60, 120);
      return host;
    };

    const reduced = await setup(true);
    const a = frameOf(reduced);
    reduced.t += 0.13;
    const b = frameOf(reduced);
    expect(a.blurs.length).toBeGreaterThan(0);
    expect(a.blurs).toEqual(b.blurs);
    expect(a.lines).toEqual(b.lines);

    const normal = await setup(false);
    const c = frameOf(normal);
    normal.t += 0.13;
    const d = frameOf(normal);
    expect(c.blurs).not.toEqual(d.blurs);
    expect(c.lines).not.toEqual(d.lines);
  });

  it('the keyboard plays the same game as the finger (§15.1, ricerca/33)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 1);
    const o = current(host);

    press(host, 'ArrowRight');
    expect(host.kbUsed).toBe(true);
    expect(host.sel).toBe(0);
    press(host, 'ArrowRight');
    expect(host.sel).toBe(1);
    press(host, 'ArrowLeft');
    expect(host.sel).toBe(0);
    press(host, 'ArrowDown');
    expect(host.strat).toBe(0);
    press(host, 'ArrowUp');
    expect(host.strat).toBe(o.plates.length - 1);

    press(host, 'Enter');
    expect(host.card).toEqual([host.cfg.tray[0]]);
    press(host, 'Backspace');
    expect(host.card).toEqual([]);
    press(host, '2');
    expect(host.card).toEqual([host.cfg.tray[1]]);
    press(host, 'Backspace');

    // A wrong layer by keyboard is refused exactly like a wrong layer by finger.
    const wrong = wrongPlate(host);
    while (host.strat !== wrong.i) press(host, 'ArrowDown');
    for (const p of o.job.want) press(host, String(host.cfg.tray.indexOf(p) + 1));
    press(host, ' ');
    expect(host.bad).toBe(1);
    expect(s.totalAttempts).toBe(1);
    let call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(wrong.item.english);
    expect(call.expectedAnswer).toBe(o.item.english);

    const right = plateIndex(host, o.item);
    while (host.strat !== right) press(host, 'ArrowDown');
    for (const p of o.job.want) press(host, String(host.cfg.tray.indexOf(p) + 1));
    press(host, ' ');
    expect(host.made).toBe(1);
    expect(o.item.state).toBe('cleared');
    expect(s.totalCorrect).toBe(1);
    call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(o.item.english);
    expect(call.expectedAnswer).toBe(o.item.english);
  });

  it('a keyboard-only bot finishes the six-order peak with four layers', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 7);
    game.reset(host, 3);
    expect(host.cfg.need).toBe(6);
    expect(host.cfg.plates).toBe(4);

    const { frames, filled } = playBeatByKeyboard(host, ctx);
    expect(frames).toBeLessThan(600);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(filled).toHaveLength(6);
    for (const item of filled) expect(item.state).toBe('cleared');
    expect(s.totalCorrect).toBe(6);
    expect(s.totalAttempts).toBe(6);
  });
});

describe("L'archivio — chapter boundaries through the real engine", () => {
  it('the first beat of chapter c+1 presents that chapter’s own term', async () => {
    const s = await session();
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
      expect(seen[5]).toBe(s.lessons[0].items[5].key);
      expect(seen[10]).toBe(s.lessons[1].items[0].key);
      expect(new Set(seen).size).toBe(40);
      expect(host.state.chapter).toBe(7);
    } finally {
      restore();
    }
  });
});
