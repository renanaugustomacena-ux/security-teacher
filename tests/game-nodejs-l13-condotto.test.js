/* eslint-disable import/first, no-loop-func -- WIP checkpoint 2026-09-14: new games moved to the Godot app, this web port is frozen as-is */
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
import game from '../js/games/levels/nodejs-l13-condotto.js';
import {
  JY,
  SINKY,
  CKH,
  TRUNKMAX,
  V,
  lanePoint,
  sourcePoint,
} from '../js/games/parts/nodejs-l13-condotto/layout.js';
import { PAL } from '../js/games/parts/nodejs-l13-condotto/draw.js';
import {
  makeContext2D,
  installDocumentDouble,
  makeHost,
  useChapter,
  run,
  assertShape,
} from './helpers/game-conformance.js';

const STEP = 1 / 60;
const CAP = 15000;
const GOLD = ['#E67E22', '#FFB300'];

async function session() {
  return createLevelSession({
    surface: 'nodejs',
    level: 12,
    mode: 'condotto',
    progressManager: { addXP: vi.fn() },
  });
}

function press(host, k) {
  game.key(host, { key: k, preventDefault() {} });
}

function tapLane(host, i) {
  game.tap(host, lanePoint(host.act[i]));
}

function tapSource(host) {
  game.tap(host, sourcePoint());
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

/** The first chunk of the beat, alone in the conduit (the source is then held). */
function firstChunk(host) {
  until(host, () => host.chunks.length > 0, 120);
  host.spawnT = 1e9;
  return host.chunks[0];
}

function wrongLane(host, k) {
  return (k.mi + 1) % host.act.length;
}

function trunkFront(host) {
  return host.chunks.filter((k) => k.lane < 0 && !k.rising).sort((a, b) => b.y - a.y)[0];
}

/** Would the source flood the conduit? Two in the trunk, or a Writable about to say no. */
function shouldPause(host) {
  const c = host.cfg;
  const trunk = host.chunks.filter((k) => k.lane < 0).length;
  const risky = host.chunks.some(
    (k) => k.lane >= 0 && !k.rising && k.reject <= 0 && host.fill[k.lane] + k.size > c.hwm[k.lane]
  );
  return trunk >= 2 || risky;
}

/**
 * The bot: one look per frame, through the public tap API. Turn the switch to
 * the Writable whose term the front chunk asks for; in write() chapters hold
 * the Readable before a Writable has to say no.
 */
function stepBot(host) {
  if (host.finished) return;
  const f = trunkFront(host);
  if (f && host.li !== f.mi) tapLane(host, f.mi);
  if (!host.auto && host.srcPaused !== shouldPause(host)) tapSource(host);
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
  if (host.finished) return;
  const f = trunkFront(host);
  if (f && host.li !== f.mi) press(host, f.mi < host.li ? 'ArrowLeft' : 'ArrowRight');
  if (!host.auto && host.srcPaused !== shouldPause(host)) press(host, ' ');
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
 * and not also a word of a term) appears whole, or cut with an ellipsis.
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

describe('Il condotto — conformance (DOCTRINE §46, brief §4)', () => {
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
    expect(game.meta.id).toBe('nodejs-l13-condotto');
    expect(game.meta.surface).toBe('nodejs');
    expect(game.meta.level).toBe(12);
    expect(game.meta.register).toBe('R1');
    expect(game.meta.band).toBe(3);
    expect(game.meta.title).toBe('Il condotto');
    expect(game.meta.titleEn).toBe('The duct');
    expect(game.meta.levelLabel).toBe(
      'Node.js · L13 Stream e Buffer / Node.js · L13 Streams & Buffers'
    );
    expect(game.meta.font).toContain('JetBrains Mono');
    expect(game.drone).toEqual({ freq: 52, type: 'sine', volume: 0.014, lowpass: 180 });
    for (const fn of ['tap', 'swipe', 'key', 'coachText', 'doneView', 'onCoachClose']) {
      expect(typeof game[fn]).toBe('function');
    }
  });

  it('keeps the template’s eight chapters of five beats and their knobs', () => {
    expect(game.CH).toHaveLength(8);
    expect(game.CH.every((c) => c.beats.length === 5)).toBe(true);
    for (const c of game.CH) {
      for (const b of c.beats) {
        // Deviation 1: never fewer than two Writable, never more than three.
        expect(b.lanes).toBeGreaterThanOrEqual(2);
        expect(b.lanes).toBeLessThanOrEqual(3);
        expect(b.target).toBeGreaterThanOrEqual(4);
        expect(b.rate).toBeGreaterThanOrEqual(1.05);
        expect(b.rate).toBeLessThanOrEqual(2.2);
        expect(b.cap).toEqual([100, 100, 100]);
        expect(b.hwm.every((h) => h >= 30 && h <= 88)).toBe(true);
        expect(b.drain.every((d) => d >= 2 && d <= 9)).toBe(true);
      }
    }
    // pipe() holds the brake in the first two chapters, write() hands it over after.
    expect(game.CH[0].beats.every((b) => b.auto && b.lanes === 2)).toBe(true);
    expect(game.CH[0].beats.every((b) => b.drain[0] === b.drain[2])).toBe(true);
    expect(game.CH[1].beats.every((b) => b.auto)).toBe(true);
    for (let c = 2; c < 8; c += 1) expect(game.CH[c].beats.every((b) => !b.auto)).toBe(true);
    expect(game.CH[4].beats.every((b) => b.hwm[0] < b.hwm[1])).toBe(true);
    for (let c = 5; c < 8; c += 1) expect(game.CH[c].beats.every((b) => b.lanes === 3)).toBe(true);
    expect(game.CH[6].beats[3]).toMatchObject({ rate: 1.05, size: 22, target: 13 });
    expect(game.CH[7].beats[3]).toMatchObject({ size: 22, target: 14, hwm: [52, 40, 60] });
  });

  it('draws a frame without throwing on every beat of every chapter', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        host.state.beat = beat;
        game.reset(host, beat);
        expect(host.act).toHaveLength(host.cfg.lanes);
        expect(host.menu).toHaveLength(host.cfg.lanes);
        expect(() => run(host, game, ctx, 2.5)).not.toThrow();
        expect(host.chunks.length).toBeGreaterThan(0);
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
      // Every mouth carries a real term of the same lesson, never invented (brief §4.8).
      const lesson = s.lessons.find((l) => l.id === host.item.lesson);
      expect(host.lesson).toBe(lesson);
      for (const m of host.menu) expect(lesson.items.includes(m)).toBe(true);
      expect(new Set(host.menu.map(labelOf)).size).toBe(host.menu.length);
      for (const t of host.terms) seen.add(t.key);
    });
    expect(seen.size).toBe(40);
    expect(seen).toEqual(new Set(s.items.map((i) => i.key)));
  });

  it('the first chunk carries the beat’s term, formed at the source with its meaning legible', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 2);
    // The next chunk forms at the mouth of the Readable: presented on reset.
    expect(host.nextItem).toBe(host.item);
    expect(host.item.state).toBe('introduced');
    expect(s.progress().introduced).toBe(1);
    const labels = host.menu.map(labelOf);
    const meaning = meaningOf(host.item, 'it');
    let texts = paintedText(host, ctx);
    expect(paintsMeaning(texts, meaning, labels)).toBe(true);
    expect(texts.some((t) => t.includes('('))).toBe(false);
    const k = firstChunk(host);
    expect(k.mi).toBe(host.termIdx);
    expect(k.lane).toBe(-1);
    texts = paintedText(host, ctx);
    expect(paintsMeaning(texts, meaning, labels)).toBe(true);
    for (const m of host.menu)
      expect(texts.join(' ').includes(labelOf(m).split(' ')[0])).toBe(true);
    // The two Writable share their silhouette: only the term differs (TEST 1).
    expect(new Set(labels).size).toBe(host.menu.length);
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
      expect(host.dropped).toBe(0);
      expect(host.delivered).toBeGreaterThanOrEqual(host.cfg.target);
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

  it('a keyboard-only bot finishes a three-lane write() beat', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 6);
    game.reset(host, 2);
    expect(host.cfg.lanes).toBe(3);
    expect(host.auto).toBe(false);
    const frames = playBeatByKeyboard(host, ctx);
    expect(frames).toBeLessThan(CAP);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(host.kbUsed).toBe(true);
    expect(host.delivered).toBeGreaterThanOrEqual(host.cfg.target);
    expect(s.totalCorrect).toBeGreaterThanOrEqual(host.cfg.target);
    expect(host.item.state).toBe('cleared');
  });

  it('grades the switch through the SDK with the real pick against the real target (§46.2)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    const k = firstChunk(host);
    const wrong = wrongLane(host, k);
    tapLane(host, wrong);
    expect(host.li).toBe(wrong);
    until(host, () => k.lane >= 0, 200);
    expect(k.lane).toBe(host.act[wrong]);
    expect(s.totalAttempts).toBe(1);
    expect(s.totalCorrect).toBe(0);
    const call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(false);
    expect(call.exerciseMode).toBe('condotto');
    expect(call.userAnswer).toBe(labelOf(host.menu[wrong]));
    expect(call.expectedAnswer).toBe(labelOf(host.item));
    expect(call.userAnswer).not.toBe(call.expectedAnswer);
    // The consequence is physical: the mouth says no, the chunk stops there…
    until(host, () => k.reject > 0, 400);
    expect(k.y).toBeCloseTo(SINKY - CKH / 2, 5);
    expect(k.wrong).toBe(1);
    expect(host.delivered).toBe(0);
    expect(host.state.coach).toBeNull();
    // …rises beside the lane and waits at the switch again, still asking.
    until(host, () => k.rising, 100);
    expect(k.rising).toBe(true);
    until(host, () => k.lane < 0, 400);
    expect(k.hold).toBeGreaterThan(0);
    expect(k.y).toBeLessThan(JY);
    expect(s.totalAttempts).toBe(1);
    tapLane(host, k.mi);
    until(host, () => host.delivered === 1, 600);
    expect(s.totalAttempts).toBe(2);
    expect(s.totalCorrect).toBe(1);
    expect(host.termOk).toBe(true);
  });

  it('lights the right Writable on the second refusal and reports the aid to the SDK', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    const k = firstChunk(host);
    const attempt = vi.spyOn(host.item, 'attempt');
    tapLane(host, wrongLane(host, k));
    until(host, () => k.wrong === 1, 600);
    expect(k.aided).toBe(false);
    expect(host.pulse).toBe(0);
    until(host, () => k.wrong === 2, 900);
    expect(k.aided).toBe(true);
    expect(host.pulseL).toBe(host.act[k.mi]);
    expect(host.state.coach).toBeNull();
    expect(attempt).toHaveBeenCalledTimes(2);
    expect(attempt.mock.calls.every(([, o]) => o.hintsUsed === 0)).toBe(true);
    // The glow is painted on the right mouth: a yellow halo, never red.
    const blurs = [];
    Object.defineProperty(ctx, 'shadowBlur', {
      configurable: true,
      get: () => 0,
      set: (v) => {
        blurs.push(`${ctx.shadowColor}|${v}`);
      },
    });
    game.draw(host, ctx);
    expect(blurs.some((b) => b.startsWith(`${PAL.giallo}|`) && !b.endsWith('|0'))).toBe(true);
    expect(blurs.some((b) => /#FF4D4D|red/i.test(b))).toBe(false);

    until(host, () => k.lane < 0, 400);
    tapLane(host, k.mi);
    until(host, () => host.delivered === 1, 600);
    expect(attempt).toHaveBeenCalledTimes(3);
    const [pick, opts] = attempt.mock.calls.at(-1);
    expect(pick).toBe(labelOf(host.item));
    expect(opts.hintsUsed).toBe(1);
    expect(opts.silent).toBe(true);
    expect(opts.mode).toBe('condotto');
    expect(opts.expected).toBe(labelOf(host.item));
  });

  it('opens the coach on the third refusal of one chunk, with the term in the rule', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    const k = firstChunk(host);
    const wrong = wrongLane(host, k);
    tapLane(host, wrong);
    until(host, () => k.wrong === 2, 1500);
    expect(host.state.coach).toBeNull();
    until(host, () => host.state.coach !== null, 900);
    expect(host.coachKind).toBe('wrong');
    expect(host.state.coach).toEqual({
      kind: 'wrong',
      pick: labelOf(host.menu[wrong]),
      word: labelOf(host.item),
      it: meaningOf(host.item, 'it'),
    });
    expect(s.totalAttempts).toBe(3);
    expect(s.totalCorrect).toBe(0);
    for (const lang of ['it', 'en']) {
      const copy = game.coachText(host, host.state.coach, lang);
      expect(copy.rule).toContain(labelOf(host.item));
      expect(copy.effect).toContain(labelOf(host.menu[wrong]));
      expect(copy.effect).toContain(meaningOf(host.item, 'it'));
    }
    game.onCoachClose(host);
    expect(host.coachKind).toBeNull();
  });

  it('a full Writable says no: the chunk stalls and, with the source flowing in a write() chapter, the coach teaches the brake', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 2);
    game.reset(host, 2);
    expect(host.auto).toBe(false);
    const k = firstChunk(host);
    tapLane(host, k.mi);
    const l = host.act[k.mi];
    host.fill[l] = host.cfg.cap[l];
    until(host, () => k.stall, 400);
    expect(k.stall).toBe(true);
    expect(s.totalAttempts).toBe(1);
    expect(s.totalCorrect).toBe(1);
    expect(host.srcPulse).toBeGreaterThan(0);
    expect(host.taught).toBe(true);
    expect(host.coachKind).toBe('slow');
    expect(host.state.coach.kind).toBe('slow');
    expect(host.state.coach.word).toBe(labelOf(host.item));
    for (const lang of ['it', 'en']) {
      expect(game.coachText(host, host.state.coach, lang).rule).toContain(labelOf(host.item));
    }
    // The Readable pulses: a yellow halo on the source, never red.
    const blurs = [];
    Object.defineProperty(ctx, 'shadowBlur', {
      configurable: true,
      get: () => 0,
      set: (v) => {
        blurs.push(`${ctx.shadowColor}|${v}`);
      },
    });
    game.draw(host, ctx);
    expect(blurs).toContain(`${PAL.giallo}|14`);
  });

  it('a stall under pipe(), or with the Readable already paused, is not coached', async () => {
    const auto = await session();
    const h1 = makeHost(game, auto);
    game.init(h1);
    useChapter(h1, game, 1);
    game.reset(h1, 2);
    expect(h1.auto).toBe(true);
    const k1 = firstChunk(h1);
    tapLane(h1, k1.mi);
    h1.fill[h1.act[k1.mi]] = 100;
    until(h1, () => k1.stall, 400);
    expect(k1.stall).toBe(true);
    expect(h1.state.coach).toBeNull();
    expect(h1.srcPulse).toBe(0);

    const manual = await session();
    const h2 = makeHost(game, manual);
    game.init(h2);
    useChapter(h2, game, 2);
    game.reset(h2, 2);
    const k2 = firstChunk(h2);
    tapLane(h2, k2.mi);
    tapSource(h2);
    expect(h2.srcPaused).toBe(true);
    h2.fill[h2.act[k2.mi]] = 100;
    until(h2, () => k2.stall, 400);
    expect(k2.stall).toBe(true);
    expect(h2.state.coach).toBeNull();
    expect(h2.srcPulse).toBe(0);
    // Deviation 5: the chunk moves again only once it fits under the mark.
    const l = h2.act[k2.mi];
    const hwm = h2.cfg.hwm[l];
    h2.fill[l] = hwm - 1;
    game.update(h2, STEP);
    expect(k2.stall).toBe(true);
    h2.fill[l] = hwm - k2.size;
    game.update(h2, STEP);
    expect(k2.stall).toBe(false);
    until(h2, () => h2.delivered === 1, 60);
    expect(h2.delivered).toBe(1);
  });

  it('three chunks that fall are not attempts: the coach «drop» opens and the beat starts over', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 2);
    game.reset(host, 0);
    const k = firstChunk(host);
    host.spawnT = host.cfg.rate;
    // Park the front chunk at the switch: the queue behind it fills the trunk.
    k.hold = 1e9;
    until(host, () => host.dropped === 1, 60 * 12);
    expect(host.dropped).toBe(1);
    expect(host.chunks.filter((c) => c.lane < 0)).toHaveLength(TRUNKMAX);
    expect(host.state.drops).toBe(1);
    expect(host.shakeAmt).toBeGreaterThan(0);
    expect(host.flash).toBeGreaterThan(0);
    expect(host.state.coach).toBeNull();
    expect(s.totalAttempts).toBe(0);
    until(host, () => host.coachKind === 'drop', 60 * 6);
    expect(host.coachKind).toBe('drop');
    expect(host.state.coach.kind).toBe('drop');
    expect(host.state.coach.word).toBe(labelOf(host.item));
    for (const lang of ['it', 'en']) {
      expect(game.coachText(host, host.state.coach, lang).rule).toContain(labelOf(host.item));
    }
    // Deviation 4: the conduit empties and the beat starts over, on the same term.
    expect(host.chunks).toEqual([]);
    expect(host.dropped).toBe(0);
    expect(host.delivered).toBe(0);
    expect(host.state.drops).toBe(0);
    expect(host.state.step).toBe(0);
    expect(host.termOk).toBe(false);
    expect(host.nextItem).toBe(host.item);
    expect(s.totalAttempts).toBe(0);
    game.onCoachClose(host);
    expect(host.coachKind).toBeNull();
  });

  it('under pipe() the source holds itself at three in the trunk and the brake is not the player’s', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    expect(host.auto).toBe(true);
    const k = firstChunk(host);
    host.spawnT = host.cfg.rate;
    k.hold = 1e9;
    until(host, () => host.autoHold, 60 * 12);
    expect(host.autoHold).toBe(true);
    expect(host.chunks.filter((c) => c.lane < 0)).toHaveLength(TRUNKMAX - 1);
    run(host, game, ctx, 8);
    expect(host.dropped).toBe(0);
    expect(host.chunks.filter((c) => c.lane < 0)).toHaveLength(TRUNKMAX - 1);
    tapSource(host);
    press(host, ' ');
    expect(host.srcPaused).toBe(false);
    // The glass says so: pause() auto, pipe().
    const texts = paintedText(host, ctx);
    expect(texts).toContain('pause() auto');
    expect(texts).toContain('pipe()');
  });

  it('offers bilingual coach copy for every kind, placeholders filled, the term in the rule', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    const coach = { pick: 'Buffer.alloc', word: 'Buffer.from', it: 'Creazione Buffer da sorgente' };
    for (const kind of ['wrong', 'drop', 'slow']) {
      const copies = ['it', 'en'].map((lang) => game.coachText(host, { ...coach, kind }, lang));
      for (const copy of copies) {
        for (const field of ['what', 'effect', 'rule', 'hint']) {
          expect(copy[field].length).toBeGreaterThan(0);
          expect(copy[field]).not.toContain('{');
        }
        expect(copy.rule).toContain('Buffer.from');
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
    expect(copyIt.eyebrow).toBe('Flusso chiuso');
    expect(copyEn.eyebrow).toBe('Stream closed');
    expect(copyIt.subtitle).toContain(meaningOf(host.item, 'it'));
    expect(copyIt.subtitle).toContain('Writable e Transform');
    expect(copyEn.subtitle).toContain('Writable & Transform');
    expect(copyEn.subtitle).not.toContain('Writable e');
    expect(copyIt.subtitle).not.toBe(copyEn.subtitle);
    for (const copy of [copyIt, copyEn]) {
      expect(copy.title).not.toMatch(/[%★⭐/]/);
      expect(copy.subtitle).not.toMatch(/[%★⭐]/);
    }
  });

  it('paints the glass in the register: black, five phosphor colours, none of the app’s gold', async () => {
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
    for (const g of GOLD) expect(styles.has(g)).toBe(false);
    for (const c of Object.values(PAL)) expect(styles.has(c.toUpperCase())).toBe(true);
    // R1 keeps its red for real faults only; this game never needs it.
    expect(styles.has('#FF4D4D')).toBe(false);
    expect(styles.size).toBeLessThanOrEqual(6);
  });

  it('slows the descent and the needle, skips particles and holds every flicker under prefers-reduced-motion', async () => {
    const glide = async (reduceMotion) => {
      const s = await session();
      const host = makeHost(game, s, { reduceMotion });
      game.init(host);
      game.reset(host, 0);
      const k = firstChunk(host);
      const y0 = k.y;
      game.update(host, STEP);
      const fall = (k.y - y0) / STEP;
      tapLane(host, wrongLane(host, k));
      const a0 = host.swAng;
      game.update(host, STEP);
      return { host, k, fall, turn: Math.abs(host.swAng - a0) };
    };
    const normal = await glide(false);
    const reduced = await glide(true);
    expect(normal.fall).toBeCloseTo(V, 6);
    expect(reduced.host.motion).toBe(0.7);
    expect(reduced.fall).toBeCloseTo(V * 0.7, 6);
    expect(reduced.turn).toBeLessThan(normal.turn);
    expect(reduced.host.srcRot).toBe(0);
    expect(normal.host.srcRot).toBeGreaterThan(0);

    // Two frames apart in time paint the same glass: no dash crawl, no breath.
    const r = reduced.host;
    r.pulse = 0.6;
    r.pulseL = r.act[reduced.k.mi];
    r.srcPulse = 0.5;
    const capture = () => {
      const log = [];
      const c2 = makeContext2D();
      for (const prop of [
        'fillStyle',
        'strokeStyle',
        'shadowBlur',
        'globalAlpha',
        'lineWidth',
        'lineDashOffset',
      ]) {
        Object.defineProperty(c2, prop, {
          configurable: true,
          get: () => 0,
          set: (v) => {
            log.push(`${prop}=${v}`);
          },
        });
      }
      for (const fn of ['arc', 'fillText', 'translate', 'rotate', 'scale', 'moveTo', 'lineTo']) {
        c2[fn] = (...a) => log.push(`${fn}(${a.join(',')})`);
      }
      game.draw(r, c2);
      return log;
    };
    const first = capture();
    r.t += 0.37;
    r.tSpent += 0.37;
    expect(capture()).toEqual(first);

    // The same beat under the bot spawns no particle at all.
    game.reset(r, 0);
    playBeat(r, ctx);
    expect(r.finished).toBe(true);
    expect(r.parts).toHaveLength(0);

    // With motion on, the same frame does change with time.
    const n = normal.host;
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
    useChapter(host, game, 2);
    game.reset(host, 0);
    expect(host.act).toEqual([0, 2]);
    expect(host.li).toBe(1);
    press(host, 'ArrowLeft');
    expect(host.kbUsed).toBe(true);
    expect(host.li).toBe(0);
    press(host, 'ArrowLeft');
    expect(host.li).toBe(0);
    press(host, 'ArrowRight');
    expect(host.li).toBe(1);
    press(host, '1');
    expect(host.li).toBe(0);
    press(host, '3');
    expect(host.li).toBe(0);
    press(host, ' ');
    expect(host.srcPaused).toBe(true);
    press(host, ' ');
    expect(host.srcPaused).toBe(false);
    // The Writable digits are painted once the keyboard is in use.
    expect(paintedText(host, ctx)).toEqual(expect.arrayContaining(['1', '2']));

    const k = firstChunk(host);
    const wrong = wrongLane(host, k);
    press(host, String(wrong + 1));
    until(host, () => k.lane >= 0, 200);
    let call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(false);
    expect(call.userAnswer).toBe(labelOf(host.menu[wrong]));
    expect(call.expectedAnswer).toBe(labelOf(host.item));
    expect(call.userAnswer).not.toBe(call.expectedAnswer);
    until(host, () => k.lane < 0, 800);
    expect(k.wrong).toBe(1);
    press(host, String(k.mi + 1));
    until(host, () => host.delivered === 1, 600);
    expect(host.delivered).toBe(1);
    call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(true);
    expect(call.exerciseMode).toBe('condotto');
    expect(s.totalAttempts).toBe(2);
    expect(s.totalCorrect).toBe(1);
  });

  it('a swipe turns the switch; a tap between the lanes does nothing', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    expect(host.act).toEqual([0, 2]);
    game.swipe(host, 'left');
    expect(host.li).toBe(0);
    game.swipe(host, 'right');
    expect(host.li).toBe(1);
    game.swipe(host, 'right');
    expect(host.li).toBe(1);
    game.tap(host, { x: 210, y: 450 });
    expect(host.li).toBe(1);
    expect(s.totalAttempts).toBe(0);
    // A tap on the Readable in a pipe() chapter is not a brake.
    tapSource(host);
    expect(host.srcPaused).toBe(false);
  });
});
