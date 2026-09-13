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
import { labelOf, meaningOf } from '../js/games/LevelBeats.js';
import game from '../js/games/levels/nodejs-l1-chiosco.js';
import { CUST_Y, HATCH, hobPos } from '../js/games/parts/nodejs-l1-chiosco/layout.js';
import {
  makeContext2D,
  installDocumentDouble,
  makeHost,
  useChapter,
  run,
  assertShape,
} from './helpers/game-conformance.js';

const STEP = 1 / 60;
const CAP = 12000;
const GOLD = ['#e67e22', '#ffb300', '#E67E22', '#FFB300'];

async function session() {
  return createLevelSession({
    surface: 'nodejs',
    level: 0,
    mode: 'chiosco',
    progressManager: { addXP: vi.fn() },
  });
}

function alive(host) {
  return host.cust.filter((k) => !k.dead);
}

function want(k) {
  return k.shapes[k.stage];
}

function custPoint(k) {
  return { x: k.x, y: CUST_Y + 24 };
}

function tapTake(host, k) {
  game.tap(host, custPoint(k));
}

function tapCook(host, i) {
  game.tap(host, hobPos(i, host.hobs));
}

function tapGive(host) {
  game.tap(host, { x: HATCH.x, y: HATCH.y });
}

function press(host, k) {
  game.key(host, { key: k, preventDefault() {} });
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

function nextCustomer(host) {
  until(host, () => alive(host).length > 0);
  return alive(host)[0];
}

/** Wait for the hands to finish whatever they are doing. */
function settle(host) {
  until(host, () => host.hands.busy <= 0 && host.queue.length === 0, 400);
}

/** Take a customer's ticket and wait for the hands. */
function take(host, k) {
  tapTake(host, k);
  settle(host);
}

/** Cook on hob `i` and wait for the hands. */
function cook(host, i) {
  tapCook(host, i);
  settle(host);
}

function wrongHob(host, k) {
  for (let i = 0; i < host.hobs; i++) if (i !== want(k)) return i;
  return -1;
}

/**
 * The bot: one decision per free pair of hands, through the public tap API.
 * Shortest remaining work first — give what is ready, cook what is taken,
 * take what waits, discard waste — with the most impatient customer first.
 */
function stepBot(host) {
  if (host.hands.busy > 0 || host.queue.length || host.finished) return;
  const row = alive(host);
  const ready = row.find((k) => k.taken && k.stage >= k.shapes.length);
  if (ready) {
    tapGive(host);
    return;
  }
  const pend = row
    .filter((k) => k.taken && k.stage < k.shapes.length)
    .sort((a, b) => a.pat - b.pat);
  if (pend.length) {
    tapCook(host, want(pend[0]));
    return;
  }
  const fresh = row.filter((k) => !k.taken).sort((a, b) => a.pat - b.pat);
  if (fresh.length) {
    tapTake(host, fresh[0]);
    return;
  }
  if (host.shelf.some((s) => !s.for)) tapGive(host);
}

function playBeat(host, ctx, { maxFrames = CAP, draw = true } = {}) {
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    stepBot(host);
    game.update(host, STEP);
    if (draw) game.draw(host, ctx);
    frames += 1;
  }
  return frames;
}

/** The same bot with no pointer at all (§46.6: playable with a keyboard). */
function stepKeyboard(host) {
  if (host.hands.busy > 0 || host.queue.length || host.finished) return;
  const row = alive(host);
  const ready = row.find((k) => k.taken && k.stage >= k.shapes.length);
  if (ready) {
    press(host, ' ');
    return;
  }
  const pend = row
    .filter((k) => k.taken && k.stage < k.shapes.length)
    .sort((a, b) => a.pat - b.pat);
  if (pend.length) {
    press(host, String(want(pend[0]) + 1));
    return;
  }
  const fresh = row.filter((k) => !k.taken).sort((a, b) => a.pat - b.pat);
  if (fresh.length) {
    for (let n = 0; n < row.length + 1 && host.sel !== fresh[0].id; n++) press(host, 'ArrowRight');
    press(host, 'ArrowUp');
    return;
  }
  if (host.shelf.some((s) => !s.for)) press(host, 'Enter');
}

function playBeatByKeyboard(host, ctx, { maxFrames = CAP } = {}) {
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    stepKeyboard(host);
    game.update(host, STEP);
    game.draw(host, ctx);
    frames += 1;
  }
  return frames;
}

/** Walk the level the way GameHost does: through the engine's goBeat/next. */
function eachBeatViaEngine(host, fn) {
  engine.goBeat(host, 0, 0);
  for (let n = 0; n < 40; n += 1) {
    fn(host.state.chapter, host.state.beat);
    if (n < 39) engine.next(host);
  }
}

/**
 * Whether the frame paints the meaning: a word of it (three letters or more,
 * and not also a word of a sign) appears whole, or cut with an ellipsis.
 */
function paintsMeaning(texts, meaning, labels) {
  const labelWords = new Set(labels.flatMap((l) => l.split(' ')));
  const words = meaning.split(' ').filter((w) => w.length >= 3 && !labelWords.has(w));
  const tokens = texts.flatMap((t) => t.split(' '));
  return words.some((w) =>
    tokens.some(
      (tk) => tk === w || (tk.endsWith('…') && tk.length > 3 && w.startsWith(tk.slice(0, -1)))
    )
  );
}

/** Every string the frame paints, so the suite can read the glass. */
function paintedText(host, ctx) {
  const texts = [];
  const raw = ctx.fillText;
  ctx.fillText = (t) => texts.push(String(t));
  game.draw(host, ctx);
  ctx.fillText = raw;
  return texts;
}

describe('Il chiosco di notte — conformance (DOCTRINE §46, brief §4)', () => {
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
    expect(game.meta.id).toBe('nodejs-l1-chiosco');
    expect(game.meta.surface).toBe('nodejs');
    expect(game.meta.level).toBe(0);
    expect(game.meta.register).toBe('R10');
    expect(game.meta.title).toBe('Il chiosco di notte');
    expect(game.meta.titleEn).toBe('The night kiosk');
    expect(game.meta.levelLabel).toBe('Node.js · L1 Fondamenti / Node.js · L1 Foundations');
    expect(game.drone).toEqual({ freq: 52, type: 'triangle', volume: 0.014, lowpass: 150 });
    for (const fn of ['tap', 'key', 'coachText', 'doneView', 'onCoachClose']) {
      expect(typeof game[fn]).toBe('function');
    }
  });

  it('runs the whole shift: eight chapters of five beats with the template’s knobs', () => {
    expect(game.CH).toHaveLength(8);
    expect(game.CH.every((c) => c.beats.length === 5)).toBe(true);
    for (const c of game.CH) {
      for (const b of c.beats) {
        expect(b.hobs).toBeGreaterThanOrEqual(2);
        expect(b.hobs).toBeLessThanOrEqual(3);
        expect(b.tickets).toBeGreaterThanOrEqual(2);
        expect(b.max).toBeGreaterThanOrEqual(1);
        expect(b.queue).toBeGreaterThanOrEqual(1);
        expect(b.pat).toBeGreaterThanOrEqual(21);
      }
    }
    expect(game.CH[2].beats.every((b) => b.free)).toBe(true);
    expect(game.CH[2].beats.filter((b) => b.trap >= 0)).toHaveLength(2);
    expect(game.CH[3].beats.every((b) => b.chg)).toBe(true);
    expect(game.CH[4].beats.every((b) => b.two)).toBe(true);
    expect(game.CH[5].beats.every((b) => b.blind)).toBe(true);
    expect(game.CH[6].beats.every((b) => b.rush && b.queue === 2)).toBe(true);
    expect(game.CH[7].beats.every((b) => b.two && b.queue === 2)).toBe(true);
    expect(game.CH[7].beats[3]).toMatchObject({ chg: true, blind: true, rush: true, tickets: 9 });
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
        expect(host.hobs).toBe(host.cfg.hobs);
        expect(() => run(host, game, surface, 2.5)).not.toThrow();
        expect(alive(host).length).toBeGreaterThan(0);
        expect(host.menu).toHaveLength(host.cfg.hobs);
      }
    }
  });

  it('follows the spine through the engine: forty beats present the forty terms (§46.5)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    const seen = new Set();
    eachBeatViaEngine(host, (chapter, beat) => {
      expect(host.chapter, `chapter ${chapter} beat ${beat}`).toBe(chapter);
      expect(host.terms).toHaveLength(1);
      expect(host.item).toBe(host.terms[0]);
      expect(host.menu.includes(host.item)).toBe(true);
      expect(host.termIdx).toBe(host.menu.indexOf(host.item));
      // Every sign is a real term of the same lesson, never invented (brief §4.8).
      const lesson = s.lessons.find((l) => l.id === host.item.lesson);
      expect(host.lesson).toBe(lesson);
      for (const m of host.menu) expect(lesson.items.includes(m)).toBe(true);
      expect(new Set(host.menu.map(labelOf)).size).toBe(host.menu.length);
      for (const t of host.terms) seen.add(t.key);
    });
    expect(seen.size).toBe(40);
    expect(seen).toEqual(new Set(s.items.map((i) => i.key)));
  });

  it('the first customer of a beat asks for its term, and the meaning presents it', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 2);
    expect(s.progress().introduced).toBe(0);
    const k = nextCustomer(host);
    expect(want(k)).toBe(host.termIdx);
    expect(host.item.state).toBe('introduced');
    expect(s.progress().introduced).toBe(1);
    // The ticket paints the meaning, never the term or a bracketed give-away.
    const texts = paintedText(host, ctx);
    const labels = host.menu.map(labelOf);
    expect(paintsMeaning(texts, meaningOf(host.item, 'it'), labels)).toBe(true);
    expect(texts.some((t) => t.includes('('))).toBe(false);
    for (const m of host.menu)
      expect(texts.join(' ').includes(labelOf(m).split(' ')[0])).toBe(true);
  });

  it('the bot playing all forty beats through the engine completes the level ledger', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: false });
    game.init(host);
    eachBeatViaEngine(host, (chapter, beat) => {
      const frames = playBeat(host, ctx);
      expect(frames, `chapter ${chapter} beat ${beat} hit the frame cap`).toBeLessThan(CAP);
      expect(host.state.coach, `chapter ${chapter} beat ${beat} opened the coach`).toBeNull();
      expect(host.finished, `chapter ${chapter} beat ${beat} did not finish`).toBe(true);
      expect(host.state.done).toBe(true);
      expect(host.made).toBe(host.cfg.tickets);
      expect(host.item.state).toBe('cleared');
      const saved = storageService.save.mock.calls.at(-1)[1];
      expect(saved).toEqual(expect.objectContaining({ beat, chapter }));
    });
    expect(s.progress().attempted).toBe(40);
    expect(s.progress().cleared).toBe(40);
    expect(spoken.length).toBeGreaterThan(40);
    const result = s.finish();
    expect(result.passed).toBe(true);
    expect(result.missed).toEqual([]);
    expect(result.coverage).toBe(1);
  });

  it('a keyboard-only bot finishes a three-hob beat with an action queue', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 6);
    game.reset(host, 2);
    expect(host.cfg.hobs).toBe(3);
    const frames = playBeatByKeyboard(host, ctx);
    expect(frames).toBeLessThan(CAP);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(host.made).toBe(host.cfg.tickets);
    expect(s.totalCorrect).toBeGreaterThanOrEqual(host.cfg.tickets);
    expect(host.item.state).toBe('cleared');
  });

  it('grades a wrong hob through the SDK with the real pick against the real target (§46.2)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    const k = nextCustomer(host);
    take(host, k);
    const wrong = wrongHob(host, k);
    tapCook(host, wrong);
    expect(host.hands.busy).toBeGreaterThan(0);
    expect(s.totalAttempts).toBe(1);
    expect(s.totalCorrect).toBe(0);
    const call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(false);
    expect(call.exerciseMode).toBe('chiosco');
    expect(call.userAnswer).toBe(labelOf(host.menu[wrong]));
    expect(call.expectedAnswer).toBe(labelOf(host.menu[want(k)]));
    expect(call.userAnswer).not.toBe(call.expectedAnswer);
    settle(host);
    // The consequence is physical: a waste on the shelf, the stage unchanged.
    expect(host.shelf).toEqual([{ shape: wrong, for: null }]);
    expect(k.stage).toBe(0);
    expect(k.wrong).toBe(1);
    expect(host.state.coach).toBeNull();
  });

  it('lights the right sign on the second error and reports the aid to the SDK', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    const k = nextCustomer(host);
    take(host, k);
    const item = host.menu[want(k)];
    const attempt = vi.spyOn(item, 'attempt');
    cook(host, wrongHob(host, k));
    expect(k.aided).toBe(false);
    cook(host, wrongHob(host, k));
    expect(k.wrong).toBe(2);
    expect(k.aided).toBe(true);
    expect(host.pulseHob).toBe(want(k));
    expect(host.state.coach).toBeNull();
    expect(attempt).toHaveBeenCalledTimes(2);
    expect(attempt.mock.calls.every(([, o]) => o.hintsUsed === 0)).toBe(true);
    // The glow is painted on the sign: a yellow halo, never red.
    const blurs = [];
    Object.defineProperty(ctx, 'shadowBlur', {
      configurable: true,
      get: () => 0,
      set: (v) => {
        blurs.push(`${ctx.shadowColor}|${v}`);
      },
    });
    game.draw(host, ctx);
    expect(blurs.some((b) => b.startsWith('#FFC72C|') && !b.endsWith('|0'))).toBe(true);

    cook(host, want(k));
    expect(k.stage).toBe(1);
    expect(attempt).toHaveBeenCalledTimes(3);
    const [pick, opts] = attempt.mock.calls.at(-1);
    expect(pick).toBe(labelOf(item));
    expect(opts.hintsUsed).toBe(1);
    expect(opts.silent).toBe(true);
    expect(opts.mode).toBe('chiosco');
  });

  it('opens the coach on the third error on one customer, with the term in the rule', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    const k = nextCustomer(host);
    take(host, k);
    const wanted = host.menu[want(k)];
    const wrong = wrongHob(host, k);
    for (let n = 0; n < 3; n += 1) {
      cook(host, wrong);
      if (n < 2) expect(host.state.coach).toBeNull();
    }
    expect(host.coachKind).toBe('wrong');
    expect(host.state.coach).toEqual({
      kind: 'wrong',
      pick: labelOf(host.menu[wrong]),
      word: labelOf(wanted),
      it: meaningOf(wanted, 'it'),
    });
    expect(s.totalAttempts).toBe(3);
    for (const lang of ['it', 'en']) {
      const copy = game.coachText(host, host.state.coach, lang);
      expect(copy.rule).toContain(labelOf(wanted));
      expect(copy.effect).toContain(labelOf(host.menu[wrong]));
    }
    game.onCoachClose(host);
    expect(host.coachKind).toBeNull();
  });

  it('a customer who changes their mind flips the ticket, presents the new term, and cooking the old one is «chg»', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 3);
    game.reset(host, 0);
    const k = nextCustomer(host);
    take(host, k);
    const before = want(k);
    k.chgAt = 0.01;
    until(host, () => k.changed === 1, 60);
    expect(k.changed).toBe(1);
    expect(k.wasShape).toBe(before);
    expect(want(k)).not.toBe(before);
    expect(k.flip).toBeGreaterThan(0);
    expect(host.menu[want(k)].state).not.toBe('unseen');

    for (let n = 0; n < 3; n += 1) cook(host, before);
    expect(host.coachKind).toBe('chg');
    expect(host.state.coach.kind).toBe('chg');
    expect(host.state.coach.it).toBe(meaningOf(host.menu[want(k)], 'it'));
    expect(host.state.coach.word).toBe(labelOf(host.menu[want(k)]));
    expect(s.totalAttempts).toBe(3);
    expect(s.totalCorrect).toBe(0);
  });

  it('a ticket that changes while the hob is lit wastes the dish without a second grade', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 3);
    game.reset(host, 1);
    const k = nextCustomer(host);
    take(host, k);
    const before = want(k);
    tapCook(host, before);
    expect(s.totalAttempts).toBe(1);
    expect(s.totalCorrect).toBe(1);
    k.chgAt = 0.01;
    settle(host);
    expect(k.changed).toBe(1);
    expect(k.stage).toBe(0);
    expect(host.shelf).toEqual([{ shape: before, for: null }]);
    expect(k.wrong).toBe(1);
    expect(s.totalAttempts).toBe(1);
  });

  it('the beat’s own customer never changes their mind, so the term is always asked', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    for (const chapter of [3, 7]) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        game.reset(host, beat);
        const k = nextCustomer(host);
        expect(k.shapes.includes(host.termIdx)).toBe(true);
        expect(k.chgAt).toBe(0);
      }
    }
  });

  it('on the free shelf, cooking with no ticket is «busy»: not graded, coached at the third', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 2);
    game.reset(host, 0);
    expect(host.cfg.free).toBe(true);
    for (let n = 0; n < 3; n += 1) {
      cook(host, 0);
      expect(host.shelf.filter((w) => !w.for)).toHaveLength(n + 1);
      if (n < 2) expect(host.state.coach).toBeNull();
    }
    expect(s.totalAttempts).toBe(0);
    expect(host.coachKind).toBe('busy');
    expect(host.state.coach.kind).toBe('busy');
    expect(host.state.coach.word).toBe(labelOf(host.item));
    // Discarding the waste through the hatch clears the shelf.
    game.onCoachClose(host);
    expect(host.streak).toEqual({ kind: null, n: 0 });
    tapGive(host);
    settle(host);
    expect(host.shelf.filter((w) => !w.for)).toHaveLength(2);
  });

  it('before the free shelf, a hob with nothing asked stays cold', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    expect(host.cfg.free).toBe(false);
    tapCook(host, 0);
    expect(host.hands.busy).toBe(0);
    expect(host.shelf).toEqual([]);
    expect(host.shake).toBeGreaterThan(0);
    expect(s.totalAttempts).toBe(0);
  });

  it('the trap: after an anticipated dish, the next ticket asks for something else', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 2);
    game.reset(host, 2);
    expect(host.cfg.trap).toBe(1);
    const k = nextCustomer(host);
    host.arriveT = 60;
    take(host, k);
    cook(host, want(k));
    tapGive(host);
    settle(host);
    expect(k.served).toBe(true);
    const w = 0;
    cook(host, w);
    expect(host.shelf).toEqual([{ shape: w, for: null }]);
    host.arriveT = 0.01;
    const k2 = nextCustomer(host);
    expect(k2).not.toBe(k);
    expect(want(k2)).toBe((w + 1) % host.hobs);
  });

  it('a customer who leaves is not an attempt; the term is asked again; three lost restart the shift', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    const k = nextCustomer(host);
    expect(want(k)).toBe(host.termIdx);
    // NUMERI: 40 s of patience on the game clock, first arrival at 1.1 s.
    const frames = until(host, () => host.gone === 1, 60 * 50);
    expect(host.gone).toBe(1);
    expect(frames / 60).toBeGreaterThan(38);
    expect(frames / 60).toBeLessThan(44);
    expect(k.dead).toBe(true);
    expect(s.totalAttempts).toBe(0);
    expect(host.state.left).toBe(1);
    expect(host.state.coach).toBeNull();
    expect(host.item.state).toBe('introduced');

    // The next customer carries the unanswered term again (§46.5).
    const k2 = nextCustomer(host);
    expect(k2).not.toBe(k);
    expect(want(k2)).toBe(host.termIdx);

    k2.pat = 0.01;
    until(host, () => host.gone === 2, 10);
    const k3 = nextCustomer(host);
    k3.pat = 0.01;
    until(host, () => host.state.coach !== null, 10);
    expect(host.coachKind).toBe('late');
    expect(host.state.coach.kind).toBe('late');
    // The kiosk emptied and the shift starts over, on the same term.
    expect(host.cust).toEqual([]);
    expect(host.gone).toBe(0);
    expect(host.made).toBe(0);
    expect(host.state.left).toBe(0);
    expect(host.state.step).toBe(0);
    expect(host.termOk).toBe(false);
    expect(s.totalAttempts).toBe(0);
  });

  it('a face-down ticket presents its meaning only when it is taken', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 5);
    game.reset(host, 0);
    const k = nextCustomer(host);
    expect(k.covered).toBe(true);
    for (const sh of k.shapes) expect(host.menu[sh].state).toBe('unseen');
    const labels = host.menu.map(labelOf);
    const meaning = meaningOf(host.menu[want(k)], 'it');
    expect(paintsMeaning(paintedText(host, ctx), meaning, labels)).toBe(false);
    tapTake(host, k);
    expect(paintsMeaning(paintedText(host, ctx), meaning, labels)).toBe(true);
    expect(k.covered).toBe(false);
    expect(k.flip).toBeGreaterThan(0);
    for (const sh of k.shapes) expect(host.menu[sh].state).toBe('introduced');
  });

  it('in bursts, the customers after the first arrive 0.7 s apart', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 6);
    game.reset(host, 0);
    // The template's rhythm: one arrives, then bursts 0.7 s apart — as many
    // as the window holds (three here) while nobody serves.
    const times = [];
    let last = 0;
    until(
      host,
      () => {
        if (host.spawned > last) {
          times.push(host.t);
          last = host.spawned;
        }
        return host.spawned === host.cfg.max;
      },
      60 * 15
    );
    expect(times).toHaveLength(3);
    expect(times[1] - times[0]).toBeGreaterThan(5);
    expect(times[2] - times[1]).toBeLessThan(0.8);
    expect(alive(host)).toHaveLength(3);
    // A fourth waits outside until a place frees up: patience does not run there.
    until(host, () => host.spawned > 3, 60 * 3);
    expect(host.spawned).toBe(3);
  });

  it('busy hands queue one action where the beat allows it, and drop it where it does not', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 6);
    game.reset(host, 0);
    const k = nextCustomer(host);
    tapTake(host, k);
    expect(host.hands.busy).toBeGreaterThan(0);
    tapCook(host, want(k));
    expect(host.queue).toHaveLength(1);
    host.shake = 0;
    tapGive(host);
    expect(host.queue).toHaveLength(1);
    expect(host.shake).toBeGreaterThan(0);
    settle(host);
    expect(k.stage).toBe(1);

    const s2 = await session();
    const host2 = makeHost(game, s2);
    game.init(host2);
    game.reset(host2, 0);
    const k2 = nextCustomer(host2);
    tapTake(host2, k2);
    host2.shake = 0;
    tapCook(host2, want(k2));
    expect(host2.queue).toHaveLength(0);
    expect(host2.shake).toBeGreaterThan(0);
  });

  it('a double order is cooked in its order: the second term first is a wrong pick', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: false });
    game.init(host);
    useChapter(host, game, 4);
    game.reset(host, 0);
    // Seven of ten orders are doubles; a single is sent away and the next is
    // read. Arrivals are bounded by `needed`, so the shift is lengthened to
    // keep the window supplied while waiting for a double.
    host.needed = 20;
    let k = nextCustomer(host);
    for (let n = 0; n < 12 && k.shapes.length < 2; n++) {
      k.dead = true;
      host.arriveT = 0.01;
      k = nextCustomer(host);
    }
    expect(k.shapes).toHaveLength(2);
    take(host, k);
    cook(host, k.shapes[1]);
    expect(k.stage).toBe(0);
    let call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(false);
    expect(call.expectedAnswer).toBe(labelOf(host.menu[k.shapes[0]]));
    cook(host, k.shapes[0]);
    expect(k.stage).toBe(1);
    tapGive(host);
    settle(host);
    expect(k.served).toBe(false);
    cook(host, k.shapes[1]);
    expect(k.stage).toBe(2);
    call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(true);
    tapGive(host);
    settle(host);
    expect(k.served).toBe(true);
    for (const sh of k.shapes) expect(host.menu[sh].state).toBe('cleared');
    expect(spoken.at(-1)).toBe(k.shapes.map((sh) => labelOf(host.menu[sh])).join(', '));
  });

  it('offers bilingual coach copy for every kind, placeholders filled, the term in the rule', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    const coach = { pick: 'Runtime', word: 'Event Loop', it: 'Ciclo di eventi' };
    for (const kind of ['wrong', 'chg', 'busy', 'late']) {
      const copies = ['it', 'en'].map((lang) => game.coachText(host, { ...coach, kind }, lang));
      for (const copy of copies) {
        for (const field of ['what', 'effect', 'rule', 'hint']) {
          expect(copy[field].length).toBeGreaterThan(0);
          expect(copy[field]).not.toContain('{');
        }
        expect(copy.rule).toContain('Event Loop');
      }
      expect(copies[0].what).not.toBe(copies[1].what);
      expect(copies[0].rule).not.toBe(copies[1].rule);
    }
  });

  it('shows the term and its meaning on the done screen, in either language, no stars', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 4);
    game.reset(host, 2);
    const copyIt = game.doneView(host, 'it');
    const copyEn = game.doneView(host, 'en');
    expect(copyIt.title).toBe(labelOf(host.item));
    expect(copyEn.title).toBe(copyIt.title);
    expect(copyIt.eyebrow).toBe('Turno servito');
    expect(copyEn.eyebrow).toBe('Shift served');
    expect(copyIt.subtitle).toContain(meaningOf(host.item, 'it'));
    expect(copyIt.subtitle).toContain('Moduli e Variabili Globali');
    expect(copyEn.subtitle).toContain('Modules & Globals');
    expect(copyEn.subtitle).not.toContain('Moduli');
    expect(copyIt.subtitle).not.toBe(copyEn.subtitle);
    for (const copy of [copyIt, copyEn]) {
      expect(copy.title).not.toMatch(/[%★⭐/]/);
      expect(copy.subtitle).not.toMatch(/[%★⭐]/);
    }
  });

  it('paints the glass in the register: six named colours and none of the app’s gold', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 7);
    game.reset(host, 3);
    run(host, game, ctx, 3);
    const styles = new Set();
    const rec = (v) => {
      if (typeof v === 'string' && v.startsWith('#')) styles.add(v.toUpperCase());
    };
    Object.defineProperty(ctx, 'fillStyle', { configurable: true, get: () => '', set: rec });
    Object.defineProperty(ctx, 'strokeStyle', { configurable: true, get: () => '', set: rec });
    game.draw(host, ctx);
    for (const g of GOLD) expect(styles.has(g.toUpperCase())).toBe(false);
    for (const c of ['#C8102E', '#FFF4D6', '#A0623A', '#FFC72C', '#1D4E89', '#FFE9A8']) {
      expect(styles.has(c)).toBe(true);
    }
  });

  it('slows the hands and the pop-up, skips particles and holds every flicker under prefers-reduced-motion', async () => {
    const glide = async (reduceMotion) => {
      const s = await session();
      const host = makeHost(game, s, { reduceMotion });
      game.init(host);
      game.reset(host, 0);
      const k = nextCustomer(host);
      const in0 = k.in;
      game.update(host, STEP);
      const popRate = (k.in - in0) / STEP;
      tapTake(host, k);
      const x0 = host.hands.x;
      const y0 = host.hands.y;
      game.update(host, STEP);
      return { host, k, popRate, move: Math.hypot(host.hands.x - x0, host.hands.y - y0) };
    };
    const normal = await glide(false);
    const reduced = await glide(true);
    expect(reduced.host.motion).toBe(0.7);
    expect(reduced.move).toBeCloseTo(normal.move * 0.7, 6);
    expect(reduced.popRate).toBeCloseTo(normal.popRate * 0.7, 6);

    // Two frames apart in time paint the same glass: no twinkle, no pulse.
    const r = reduced.host;
    settle(r);
    cook(r, wrongHob(r, reduced.k));
    cook(r, wrongHob(r, reduced.k));
    expect(reduced.k.aided).toBe(true);
    reduced.k.pat = reduced.k.pat0 * 0.2;
    const capture = () => {
      const log = [];
      const c2 = makeContext2D();
      for (const prop of ['fillStyle', 'strokeStyle', 'shadowBlur', 'globalAlpha', 'lineWidth']) {
        Object.defineProperty(c2, prop, {
          configurable: true,
          get: () => 0,
          set: (v) => {
            log.push(`${prop}=${v}`);
          },
        });
      }
      for (const fn of ['arc', 'fillText', 'translate', 'rotate', 'scale', 'moveTo']) {
        c2[fn] = (...a) => log.push(`${fn}(${a.join(',')})`);
      }
      game.draw(r, c2);
      return log;
    };
    const first = capture();
    r.t += 0.37;
    r.pulse = Math.max(0.05, r.pulse - 0.3);
    reduced.k.wob += 1.3;
    expect(capture()).toEqual(first);

    // The same beat under the bot spawns no particle at all.
    game.reset(r, 0);
    playBeat(r, ctx);
    expect(r.finished).toBe(true);
    expect(r.parts).toHaveLength(0);

    // With motion on, the same frame does change with time.
    const n = normal.host;
    n.pulse = 0.5;
    n.pulseHob = 0;
    const cap = () => {
      const log = [];
      const c2 = makeContext2D();
      Object.defineProperty(c2, 'shadowBlur', {
        configurable: true,
        get: () => 0,
        set: (v) => {
          log.push(v);
        },
      });
      game.draw(n, c2);
      return log;
    };
    const a = cap();
    n.t += 0.37;
    expect(cap()).not.toEqual(a);
  });

  it('the keyboard plays the same game as the finger, and the SDK records it', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 3);
    until(host, () => alive(host).length >= 2, 60 * 12);
    const row = alive(host).sort((a, b) => a.x - b.x);
    expect(row.length).toBeGreaterThanOrEqual(2);

    press(host, 'ArrowRight');
    expect(host.kbUsed).toBe(true);
    expect(host.sel).toBe(row[0].id);
    press(host, 'ArrowRight');
    expect(host.sel).toBe(row[1].id);
    press(host, 'ArrowLeft');
    expect(host.sel).toBe(row[0].id);
    const k = row[0];
    press(host, 'ArrowUp');
    expect(k.taken).toBe(true);
    settle(host);

    // A wrong hob by keyboard is refused exactly like a wrong hob by finger.
    const wrong = wrongHob(host, k);
    press(host, String(wrong + 1));
    settle(host);
    expect(k.wrong).toBe(1);
    expect(k.stage).toBe(0);
    let call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(labelOf(host.menu[wrong]));
    expect(call.expectedAnswer).toBe(labelOf(host.menu[want(k)]));
    expect(call.userAnswer).not.toBe(call.expectedAnswer);

    press(host, String(want(k) + 1));
    settle(host);
    expect(k.stage).toBe(1);
    call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(true);
    press(host, ' ');
    settle(host);
    expect(k.served).toBe(true);
    expect(host.made).toBe(1);
    expect(s.totalCorrect).toBe(1);
    expect(s.totalAttempts).toBe(2);
    // The hob digits are painted once the keyboard is in use.
    expect(paintedText(host, ctx)).toEqual(expect.arrayContaining(['1', '2']));
  });

  it('a tap on nothing does nothing but sound', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    nextCustomer(host);
    game.tap(host, { x: 5, y: 5 });
    expect(host.hands.busy).toBe(0);
    expect(s.totalAttempts).toBe(0);
    expect(alive(host)[0].taken).toBe(false);
  });
});
