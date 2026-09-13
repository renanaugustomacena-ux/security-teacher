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
import game from '../js/games/levels/nodejs-l6-centralino.js';
import {
  makeContext2D,
  installDocumentDouble,
  makeHost,
  useChapter,
  run,
  assertShape,
} from './helpers/game-conformance.js';

const W = game.W;
const H = game.H;
const BOARD = H * 0.5;
const DROP = H * 0.2;
const STAMPY = H * 0.83;
const STAMPS = ['200', '201', '404', '500'];
const STEP = 1 / 60;

async function session() {
  return createLevelSession({
    surface: 'nodejs',
    level: 5,
    mode: 'centralino',
    progressManager: { addXP: vi.fn() },
  });
}

/* The layout the glass uses, re-derived here so the bot aims through the
   public input API only: the bumper bank and the stamp row. */
function jackXY(n, i) {
  const cols = Math.min(3, Math.max(1, n));
  const r = Math.floor(i / cols);
  const cc = i % cols;
  const w = W / (cols + 0.5);
  return { x: W * 0.5 + (cc - (cols - 1) / 2) * w, y: BOARD + r * 86 };
}

function stampXY(i) {
  const w = W / (STAMPS.length + 0.6);
  return { x: W * 0.5 + (i - (STAMPS.length - 1) / 2) * w, y: STAMPY };
}

function liveCalls(host) {
  return host.calls.filter((k) => k.live && !k.plugged);
}

function lowest(host) {
  return liveCalls(host).sort((a, b) => b.y - a.y)[0] || null;
}

function jackOf(host, item) {
  return host.jacks.findIndex((j) => j.item === item);
}

function wrongJackFor(host, c) {
  return host.jacks.findIndex((j) => j.item !== c.item);
}

/** The primary gesture: pick the ball up in the lane and drop it on a bumper. */
function dragPlug(host, c, jack) {
  const from = { x: W / 2, y: c.y };
  const to = jackXY(host.jacks.length, jack);
  game.down(host, from);
  game.drag(host, from, to);
  game.up(host, to);
}

/** A tap on one of the four drop targets. */
function tapStamp(host, value) {
  game.down(host, stampXY(STAMPS.indexOf(value)));
}

function press(host, key) {
  game.key(host, { key, preventDefault() {} });
}

/**
 * What the ledger says of a call's term once its beat is won (§46.5): the
 * beat's own terms are cleared; a filler that was plugged is attempted; an
 * orphan that was only stamped 404 was introduced and never answered with a
 * term, so it stays introduced until its own beat.
 */
function stateAfterWin(host, c) {
  if (host.terms.includes(c.item)) return 'cleared';
  return c.noSocket ? 'introduced' : 'attempted';
}

/** The colour the 404 target's lamp was painted with in a recorded frame. */
function stampLampColour(log, value) {
  const p = stampXY(STAMPS.indexOf(value));
  const key = `arc:${p.x - 1},${p.y + 19},3.5,`;
  const hit = log.find((v) => v.startsWith(key));
  return hit ? hit.split('@')[1].split('|')[0] : null;
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

function nextCall(host) {
  until(host, () => lowest(host) !== null);
  return lowest(host);
}

/**
 * The right answer for whatever is in front of the operator: the stamp a
 * plugged call waits for, the 404 target for a call with no socket, the
 * term's bumper otherwise. Returns what was answered, or null when the lane
 * is empty.
 */
function answerRight(host) {
  if (host.pending) {
    tapStamp(host, host.pending.want);
    return null;
  }
  const c = lowest(host);
  if (!c) return null;
  if (c.noSocket) tapStamp(host, '404');
  else dragPlug(host, c, jackOf(host, c.item));
  return c;
}

/** Answer calls right until one with no socket is in the lane. */
function nextOrphan(host) {
  for (let guard = 0; guard < 16; guard += 1) {
    const c = nextCall(host);
    if (!c) return null;
    if (c.noSocket) return c;
    answerRight(host);
    if (host.pending) answerRight(host);
  }
  return null;
}

/**
 * Drive one beat as a competent operator would. `wrongFor(c)` may return a
 * deliberate mistake for a call: 'jack' (a wrong bumper), or a stamp value.
 * Returns the frame count and the calls answered right, in order.
 */
function playBeat(host, ctx, { maxFrames = 8000, draw = true, wrongFor = null } = {}) {
  const answered = [];
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    if (!host.finished) {
      const c = lowest(host);
      const mistake = c && !host.pending && wrongFor ? wrongFor(c) : null;
      if (mistake === 'jack') {
        dragPlug(host, c, wrongJackFor(host, c));
      } else if (mistake) {
        tapStamp(host, mistake);
      } else {
        const done = answerRight(host);
        if (done) answered.push(done);
      }
    }
    game.update(host, STEP);
    if (draw) game.draw(host, ctx);
    frames += 1;
  }
  return { frames, answered };
}

/** The same operator with no pointer: ← → pick the bumper, space plugs, digits stamp. */
function playBeatByKeyboard(host, ctx, { maxFrames = 8000 } = {}) {
  const answered = [];
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    if (!host.finished) {
      if (host.pending) {
        press(host, String(STAMPS.indexOf(host.pending.want) + 1));
      } else {
        const c = lowest(host);
        if (c && c.noSocket) {
          press(host, '3');
          answered.push(c);
        } else if (c) {
          const target = jackOf(host, c.item);
          while (host.kj !== target) press(host, target > host.kj ? 'ArrowRight' : 'ArrowLeft');
          press(host, answered.length % 2 ? 'Enter' : ' ');
          answered.push(c);
        }
      }
    }
    game.update(host, STEP);
    game.draw(host, ctx);
    frames += 1;
  }
  return { frames, answered };
}

/**
 * Walk the level the way GameHost does: through the engine's own goBeat/next,
 * which installs the chapter, writes the state and resets.
 */
function eachBeatViaEngine(host, fn) {
  engine.goBeat(host, 0, 0);
  for (let n = 0; n < 40; n += 1) {
    fn(host.state.chapter, host.state.beat);
    if (n < 39) engine.next(host);
  }
}

/** Record every drawing call so two frames can be compared. */
function recordFrame(host, ctx) {
  const log = [];
  const r = { ...ctx };
  const measure = ctx.measureText;
  Object.keys(ctx)
    .filter((name) => typeof ctx[name] === 'function')
    .forEach((name) => {
      r[name] = (...args) => {
        const style = `${r.fillStyle}|${r.strokeStyle}|${r.lineWidth}|${r.globalAlpha}`;
        log.push(`${name}:${args.join(',')}@${style}`);
        return name === 'measureText' ? measure(...args) : undefined;
      };
    });
  game.draw(host, r);
  return log;
}

describe('Il centralino di notte — conformance (SDK design §8, DOCTRINE §46)', () => {
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
    expect(game.meta.level).toBe(5);
    expect(game.meta.id).toBe('nodejs-l6-centralino');
    expect(game.meta.register).toBe('R11');
    expect(game.meta.levelLabel).toBe('Node.js · L6 HTTP e Server / Node.js · L6 HTTP & Server');
    expect(game.drone).toEqual({ freq: 46, type: 'triangle', volume: 0.012, lowpass: 130 });
    for (const fn of ['down', 'drag', 'up', 'key', 'coachText', 'doneView', 'onCoachClose']) {
      expect(typeof game[fn]).toBe('function');
    }
  });

  it('runs the whole shift: eight chapters of five beats, the template tables intact', () => {
    expect(game.CH).toHaveLength(8);
    expect(game.CH.every((c) => c.beats.length === 5)).toBe(true);
    // NUMERI: transit 3.4 → 1.9 s, never under 1.8; three calls in the air at the peak.
    const falls = game.CH.flatMap((c) => c.beats.map((b) => b.fall));
    expect(Math.max(...falls)).toBe(3.4);
    expect(Math.min(...falls)).toBe(1.9);
    expect(Math.max(...game.CH.flatMap((c) => c.beats.map((b) => b.max)))).toBe(3);
    expect(game.CH[4].beats.every((b) => b.stamp)).toBe(true);
    expect(game.CH[5].beats.every((b) => b.noJack)).toBe(true);
    expect(game.CH[7].beats[3].need).toBe(9);
  });

  it('draws a frame without throwing on every beat of every chapter', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    const surface = ctx;

    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        host.state.beat = beat;
        game.reset(host, beat);
        // The first ball drops at 0.8 s: 1.5 s draws the ball, its tag, the bank.
        expect(() => run(host, game, surface, 1.5)).not.toThrow();
        expect(liveCalls(host).length).toBeGreaterThan(0);
        expect(host.jacks).toHaveLength(host.cfg.routes.length);
      }
    }
  });

  it('follows the chapter the engine installed, so every one of the forty terms anchors a beat (§46.5)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    const keys = new Set();
    eachBeatViaEngine(host, (chapter, beat) => {
      expect(host.chapter, `chapter ${chapter} beat ${beat}`).toBe(chapter);
      expect(host.terms).toEqual(beatItems(s, chapter, beat));
      expect(host.item).toBe(beatItems(s, chapter, beat)[0]);
      // The term is on the board and its call is first in the queue.
      expect(jackOf(host, host.item)).toBeGreaterThanOrEqual(0);
      expect(host.queue[0].item).toBe(host.item);
      expect(host.queue[0].noSocket).toBe(false);
      expect(host.queue).toHaveLength(host.cfg.need);
      for (const t of host.terms) keys.add(t.key);
    });
    expect(keys.size).toBe(40);
    expect(keys).toEqual(new Set(s.items.map((i) => i.key)));
    expect(spine(s)).toHaveLength(40);
  });

  it('introduces a term when its ball drops into the lane', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 2);
    host.state.beat = 3;
    game.reset(host, 3);

    expect(s.progress().introduced).toBe(0);
    const c = nextCall(host);
    expect(c.item).toBe(beatItems(s, 2, 3)[0]);
    expect(c.item.state).toBe('introduced');
    expect(s.progress().introduced).toBe(1);
  });

  it('a scripted operator answering every call clears the terms and speaks them', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: false });
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 0);

    const { frames, answered } = playBeat(host, ctx);
    expect(frames).toBeLessThan(8000);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(host.made).toBe(host.cfg.need);
    expect(answered).toHaveLength(host.cfg.need);
    for (const c of answered) expect(c.item.state).toBe(stateAfterWin(host, c));
    expect(host.item.state).toBe('cleared');
    expect(spoken).toEqual(answered.map((c) => c.item.english));
    expect(s.totalCorrect).toBe(host.cfg.need);
    expect(storageService.save).toHaveBeenCalledTimes(host.cfg.need);
    for (const [key, record] of storageService.save.mock.calls) {
      expect(key).toBe('progress');
      expect(record).toEqual(expect.objectContaining({ beat: 0, chapter: 1 }));
    }
  });

  it('a mute host answers in silence', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: true });
    game.init(host);
    game.reset(host, 0);
    playBeat(host, ctx);
    expect(host.finished).toBe(true);
    expect(spoken).toEqual([]);
  });

  /**
   * §46.5: the whole level, beat after beat, under the bot. Afterwards the
   * ledger must let the level pass — every one of the forty terms attempted.
   */
  it('the operator playing all forty beats through the engine completes the level ledger', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    let stamped = 0;
    let noSocket = 0;
    eachBeatViaEngine(host, (chapter, beat) => {
      const before = analyticsService.recordResponse.mock.calls.length;
      const { frames, answered } = playBeat(host, ctx, { draw: true });
      expect(frames, `chapter ${chapter} beat ${beat} hit the frame cap`).toBeLessThan(8000);
      expect(host.finished, `chapter ${chapter} beat ${beat} did not finish`).toBe(true);
      expect(host.state.done).toBe(true);
      expect(host.state.left).toBe(0);
      expect(answered).toHaveLength(host.cfg.need);
      for (const t of host.terms) expect(t.state).toBe('cleared');
      noSocket += answered.filter((c) => c.noSocket).length;
      if (host.cfg.stamp) stamped += 1;
      // Every answer went through the SDK.
      expect(analyticsService.recordResponse.mock.calls.length).toBeGreaterThan(before);
      const saved = storageService.save.mock.calls.at(-1)[1];
      expect(saved).toEqual(expect.objectContaining({ beat, chapter }));
    });

    expect(stamped).toBe(20);
    expect(noSocket).toBeGreaterThan(0);
    expect(s.progress().attempted).toBe(40);
    expect(s.progress().cleared).toBe(40);
    const result = s.finish();
    expect(result.passed).toBe(true);
    expect(result.missed).toEqual([]);
    expect(result.coverage).toBe(1);
    // Every recorded response was the learner's own pick, never a copy of the target.
    for (const [call] of analyticsService.recordResponse.mock.calls) {
      expect(call.exerciseMode).toBe('centralino');
      expect(call.correct).toBe(true);
      expect(STAMPS).not.toContain(call.userAnswer);
      expect(STAMPS).not.toContain(call.expectedAnswer);
      expect(call.userAnswer).toBe(call.expectedAnswer);
    }
  });

  it('a correct plug leaves the term attempted: it is cleared only when the beat is won (§46.5)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 1);
    expect(host.cfg.need).toBe(4);

    const c = nextCall(host);
    dragPlug(host, c, jackOf(host, c.item));
    expect(c.live).toBe(false);
    expect(host.made).toBe(1);
    expect(s.totalCorrect).toBe(1);
    expect(c.item.state).toBe('attempted');
    expect(s.progress().cleared).toBe(0);
    const saved = storageService.save.mock.calls.at(-1)[1];
    expect(saved.attempted).toContain(c.item.key);
    expect(saved.cleared).not.toContain(c.item.key);

    // The line closes before the beat is won: the term is not cleared.
    for (let n = 0; n < 3; n += 1) {
      const d = nextCall(host);
      d.y = DROP + H * 0.16 + 1;
      game.update(host, STEP);
      if (host.state.left === 0) break;
    }
    expect(host.state.left).toBe(0);
    expect(host.made).toBe(0);
    expect(c.item.state).toBe('attempted');
    expect(s.progress().cleared).toBe(0);
    // Three drops in a row also opened the drop coach: close it and play on.
    expect(host.coachKind).toBe('drop');
    host.setState({ coach: null });
    game.onCoachClose(host);

    // Won at last: every term of the beat is cleared and the snapshot says so.
    const { frames } = playBeat(host, ctx);
    expect(frames).toBeLessThan(8000);
    expect(host.finished).toBe(true);
    for (const t of host.terms) expect(t.state).toBe('cleared');
    expect(storageService.save.mock.calls.at(-1)[1].cleared).toContain(host.item.key);
  });

  it('the third lamp rebuilds the board once, even when two calls cross the line in one frame', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 3);
    expect(host.cfg.max).toBe(2);

    until(host, () => liveCalls(host).length === 2, 600);
    expect(liveCalls(host)).toHaveLength(2);
    const introduced = host.calls.map((k) => k.item);
    host.setState({ left: 2 });
    for (const k of host.calls) k.y = DROP + H * 0.16 + 1;
    game.update(host, STEP);

    expect(host.state.left).toBe(0);
    expect(host.state.step).toBe(0);
    expect(host.calls).toEqual([]);
    expect(host.queue).toHaveLength(host.cfg.need);
    expect(host.queue[0].item).toBe(host.item);
    // The same night comes back: what was introduced is asked again.
    for (const term of introduced) expect(host.queue.some((t) => t.item === term)).toBe(true);
    expect(s.totalAttempts).toBe(0);
  });

  it('grades a wrong plug through the SDK with the real pick against the real target (§46.2)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 2);
    expect(host.jacks).toHaveLength(2);

    const c = nextCall(host);
    const wrong = wrongJackFor(host, c);
    dragPlug(host, c, wrong);

    expect(c.live).toBe(false);
    expect(c.item.state).toBe('attempted');
    expect(host.state.coach).toBeNull();
    expect(host.state.left).toBe(1);
    expect(s.totalAttempts).toBe(1);
    expect(s.totalCorrect).toBe(0);

    const call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(false);
    expect(call.exerciseMode).toBe('centralino');
    expect(call.userAnswer).toBe(host.jacks[wrong].item.english);
    expect(call.expectedAnswer).toBe(c.item.english);
    expect(call.userAnswer).not.toBe(call.expectedAnswer);
    // The dropped call is back at the end of the queue, not lost (§46.5).
    expect(host.queue.at(-1).item).toBe(c.item);
  });

  it('lights the right bumper on the second error on one term and reports the aid to the SDK', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 0);
    const target = host.item;
    const attempt = vi.spyOn(target, 'attempt');

    let wrongs = 0;
    const { frames } = playBeat(host, ctx, {
      wrongFor: (c) => {
        if (c.item !== target || wrongs >= 2) return null;
        wrongs += 1;
        return 'jack';
      },
    });
    expect(frames).toBeLessThan(8000);
    expect(wrongs).toBe(2);
    expect(host.finished).toBe(true);
    expect(host.state.coach).toBeNull();
    expect(host.aided.has(target)).toBe(true);
    // Neither wrong plug was aided at the time it was made; every attempt on
    // the term after the second error carried the aid (the term may also be
    // asked again as a filler of its own beat).
    expect(attempt.mock.calls.length).toBeGreaterThanOrEqual(3);
    expect(attempt.mock.calls[0][1].hintsUsed).toBe(0);
    expect(attempt.mock.calls[1][1].hintsUsed).toBe(0);
    for (const [, o] of attempt.mock.calls.slice(2)) expect(o.hintsUsed).toBe(1);
    const [pick, opts] = attempt.mock.calls.at(-1);
    expect(pick).toBe(target.english);
    expect(opts.hintsUsed).toBe(1);
    expect(opts.silent).toBe(true);
    expect(target.state).toBe('cleared');
  });

  it('the second error lights the bumper of the term, at once and again when its ball returns', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 0);
    const target = host.item;

    let wrongs = 0;
    playBeat(host, ctx, {
      wrongFor: (c) => {
        if (c.item !== target || wrongs >= 2) return null;
        wrongs += 1;
        if (wrongs === 2) {
          // Stop right after the second mistake to look at the board.
          dragPlug(host, c, wrongJackFor(host, c));
          host.setState({ done: true });
          return null;
        }
        return 'jack';
      },
    });
    expect(wrongs).toBe(2);
    expect(host.pulse).toBeGreaterThan(0);
    expect(host.pulseJ).toBe(jackOf(host, target));
    expect(host.pulseStamp).toBe(false);
    expect(host.aided.has(target)).toBe(true);
  });

  it('opens the coach on the third error on one term, with the English term in the rule', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 0);
    const target = host.item;

    let wrongs = 0;
    playBeat(host, ctx, {
      wrongFor: (c) => {
        if (c.item !== target) return null;
        wrongs += 1;
        return 'jack';
      },
    });
    expect(wrongs).toBe(3);
    expect(host.coachKind).toBe('wrong');
    expect(host.state.coach).toEqual(
      expect.objectContaining({ kind: 'wrong', word: target.english, noSocket: false })
    );
    expect(host.state.coach.pick).not.toBe(target.english);
    for (const lang of ['it', 'en']) {
      const copy = game.coachText(host, host.state.coach, lang);
      expect(copy.rule).toContain(target.english);
      expect(copy.what).toContain(host.state.coach.pick);
    }
    // Three lamps out: the line closed and the beat starts over.
    expect(host.state.left).toBe(0);
    expect(host.state.step).toBe(0);
    expect(host.made).toBe(0);
    expect(host.queue[0].item).toBe(target);
    game.onCoachClose(host);
    expect(host.coachKind).toBeNull();
  });

  it('a call with no socket is answered by the 404 stamp, and forcing it into a bumper is the "force" coach', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 5);
    game.reset(host, 0);
    expect(host.cfg.stamp).toBe(true);
    expect(host.queue.some((t) => t.noSocket)).toBe(true);
    const onBoard = host.jacks.map((j) => j.item);
    for (const t of host.queue) {
      expect(onBoard.includes(t.item)).toBe(!t.noSocket);
      // The method never betrays the missing socket: it is one the board carries.
      expect(host.cfg.routes.map((r) => r[0])).toContain(t.m);
    }

    let forced = 0;
    let orphan = null;
    playBeat(host, ctx, {
      wrongFor: (c) => {
        // Force the first orphan every time it comes back; stamp any other right.
        if (!c.noSocket || (orphan && c.item !== orphan)) return null;
        orphan = c.item;
        forced += 1;
        return 'jack';
      },
    });
    expect(forced).toBe(3);
    expect(host.coachKind).toBe('force');
    expect(host.state.coach).toEqual(
      expect.objectContaining({ kind: 'force', word: orphan.english, want: '404', noSocket: true })
    );
    // Forcing is a term pick and is graded as one: the socket's term against
    // the orphan's own term. Stamping 404 right is the mechanic, not an answer.
    const call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(false);
    expect(call.expectedAnswer).toBe(orphan.english);
    expect(call.userAnswer).toBe(host.state.coach.pick);
    expect(call.userAnswer).not.toBe(orphan.english);
    for (const [r] of analyticsService.recordResponse.mock.calls) {
      expect(STAMPS).not.toContain(r.userAnswer);
      expect(STAMPS).not.toContain(r.expectedAnswer);
    }
    expect(orphan.state).toBe('attempted');
    const copy = game.coachText(host, host.state.coach, 'it');
    expect(copy.rule).toContain(orphan.english);
    expect(copy.hint).toContain('404');

    // The second forcing lit the 404 target, not a bumper.
    expect(host.aided.has(orphan)).toBe(true);
  });

  it('the 404 hint lights for the pulse and for an aided orphan in the lane, never for the rest of the beat', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 5);
    game.reset(host, 0);

    const c = nextOrphan(host);
    expect(c).not.toBeNull();
    expect(host.aided.has(c.item)).toBe(false);
    // A stale pulse flag with the pulse over must not light the target.
    host.pulse = 0;
    host.pulseStamp = true;
    expect(stampLampColour(recordFrame(host, ctx), '404')).toBe('#5A3A10');
    expect(stampLampColour(recordFrame(host, ctx), '200')).toBe('#5A3A10');
    // The pulse itself lights it.
    host.pulse = 0.5;
    expect(stampLampColour(recordFrame(host, ctx), '404')).toBe('#FF9F1C');
    expect(stampLampColour(recordFrame(host, ctx), '200')).toBe('#5A3A10');
    // An aided orphan in the lane lights it again, pulse or not.
    host.pulse = 0;
    host.pulseStamp = false;
    host.aided.add(c.item);
    expect(stampLampColour(recordFrame(host, ctx), '404')).toBe('#FF9F1C');
    tapStamp(host, '404');
    expect(c.live).toBe(false);
    expect(stampLampColour(recordFrame(host, ctx), '404')).toBe('#5A3A10');
  });

  it('two errors in a row on different terms light the second and mark it aided', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 0);
    expect(host.jacks).toHaveLength(3);

    const c1 = nextCall(host);
    dragPlug(host, c1, wrongJackFor(host, c1));
    expect(host.pulse).toBe(0);
    const c2 = nextCall(host);
    const attempt = vi.spyOn(c2.item, 'attempt');
    dragPlug(host, c2, wrongJackFor(host, c2));
    expect(host.state.left).toBe(2);
    expect(host.pulse).toBeGreaterThan(0);
    expect(host.pulseJ).toBe(jackOf(host, c2.item));
    expect(host.aided.has(c2.item)).toBe(true);
    expect(attempt.mock.calls.at(-1)[1].hintsUsed).toBe(0);

    // When its ball returns the plug carries the aid.
    let c3 = nextCall(host);
    while (c3 && c3.item !== c2.item) {
      answerRight(host);
      c3 = nextCall(host);
    }
    expect(c3).not.toBeNull();
    dragPlug(host, c3, jackOf(host, c3.item));
    expect(attempt.mock.calls.at(-1)[1].hintsUsed).toBe(1);
  });

  it('a wrong stamp after a good plug is the "stamp" coach; the plug was the answer, the stamp is not', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 4);
    game.reset(host, 0);
    const target = host.item;

    let stamps = 0;
    playBeat(host, ctx, {
      wrongFor: (c) => {
        if (c.item !== target) return null;
        // Plug it right, then stamp it wrong.
        dragPlug(host, c, jackOf(host, c.item));
        expect(host.pending).not.toBeNull();
        expect(host.pending.want).toBe('200');
        stamps += 1;
        return '500';
      },
    });
    expect(stamps).toBe(3);
    expect(host.coachKind).toBe('stamp');
    expect(host.state.coach).toEqual(
      expect.objectContaining({ kind: 'stamp', pick: '500', want: '200', word: target.english })
    );
    // Three plugs, all right, all recorded; three wrong stamps, three lamps,
    // none recorded: a number is not a term.
    expect(s.totalAttempts).toBe(3);
    expect(s.totalCorrect).toBe(3);
    expect(analyticsService.recordResponse).toHaveBeenCalledTimes(3);
    for (const [call] of analyticsService.recordResponse.mock.calls) {
      expect(call.correct).toBe(true);
      expect(call.userAnswer).toBe(target.english);
      expect(call.expectedAnswer).toBe(target.english);
    }
    // The line closed before the beat was won: attempted, not cleared.
    expect(target.state).toBe('attempted');
    expect(host.state.left).toBe(0);
    expect(host.made).toBe(0);
    const copy = game.coachText(host, host.state.coach, 'en');
    expect(copy.effect).toContain('200');
    expect(copy.rule).toContain(target.english);
  });

  it('a direct stamp on a call that has a socket does not bypass the term', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 4);
    game.reset(host, 0);
    const c = nextCall(host);
    tapStamp(host, '200');
    expect(c.live).toBe(false);
    expect(host.made).toBe(0);
    expect(host.state.left).toBe(1);
    expect(host.queue.at(-1).item).toBe(c.item);
    // No term was picked, so nothing was answered: the call just dropped.
    expect(c.item.state).toBe('introduced');
    expect(s.totalAttempts).toBe(0);
    expect(analyticsService.recordResponse).not.toHaveBeenCalled();
    // Three of them explain themselves with the early-stamp line.
    nextCall(host);
    tapStamp(host, '200');
    nextCall(host);
    tapStamp(host, '200');
    expect(host.coachKind).toBe('stamp');
    expect(game.coachText(host, host.state.coach, 'it').effect).toContain('prima va innestata');
  });

  it('an unanswered call drops on the game clock, within the transit the sheet promises, and is not an attempt', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    // NUMERI: the first ball drops at 0.8 s and crosses the lane in about
    // 2.3 s at fall 3.4 (H*0.34 px over the transit, 206 px of lane).
    const frames = until(host, () => host.state.left === 1, 60 * 10);
    expect(host.state.left).toBe(1);
    expect(frames / 60).toBeGreaterThan(2.5);
    expect(frames / 60).toBeLessThan(4);
    expect(s.totalAttempts).toBe(0);
    expect(host.state.coach).toBeNull();
    expect(host.queue).toHaveLength(host.cfg.need);
    expect(host.queue.at(-1).item).toBe(host.item);
  });

  it('three dropped calls in a row open the "drop" coach and close the line', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    let drops = 0;
    for (let frame = 0; frame < 3000 && !host.state.coach; frame += 1) {
      const c = lowest(host);
      if (c && c.y < DROP + H * 0.16 - 0.5) {
        c.y = DROP + H * 0.16 - 0.5;
        drops += 1;
      }
      game.update(host, STEP);
      game.draw(host, ctx);
    }
    expect(drops).toBe(3);
    expect(host.coachKind).toBe('drop');
    expect(host.state.coach).toEqual(
      expect.objectContaining({ kind: 'drop', word: host.item.english })
    );
    expect(s.totalAttempts).toBe(0);
    expect(host.item.state).toBe('introduced');
    // The line closed: fresh lamps, a fresh queue, the beat's term still first.
    expect(host.state.left).toBe(0);
    expect(host.calls).toEqual([]);
    expect(host.queue).toHaveLength(host.cfg.need);
    expect(host.queue[0].item).toBe(host.item);
  });

  it('offers bilingual coach copy for every kind, with the placeholders filled in', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const base = {
      pick: 'listen',
      word: 'Port',
      it: 'Porta',
      m: 'GET',
      want: '200',
      noSocket: false,
    };
    const kinds = [
      { kind: 'wrong' },
      { kind: 'force', noSocket: true, want: '404' },
      { kind: 'drop', pick: '' },
      { kind: 'stamp', pick: '500' },
      { kind: 'stamp', pick: '200' },
    ];
    for (const k of kinds) {
      const coach = { ...base, ...k };
      const copies = ['it', 'en'].map((lang) => game.coachText(host, coach, lang));
      for (const copy of copies) {
        for (const field of ['what', 'effect', 'rule', 'hint']) {
          expect(copy[field].length).toBeGreaterThan(0);
          expect(copy[field]).not.toContain('{');
        }
        expect(copy.rule).toContain(coach.word);
        expect(copy.what).toContain(coach.it);
        expect(copy.hint).toContain(coach.m);
      }
      expect(copies[0].what).not.toBe(copies[1].what);
      expect(copies[0].rule).not.toBe(copies[1].rule);
    }
    expect(game.coachText(host, { ...base, kind: 'force', noSocket: true }, 'it').hint).toContain(
      'timbro 404'
    );
    expect(game.coachText(host, { ...base, kind: 'stamp', pick: '200' }, 'it').effect).not.toBe(
      game.coachText(host, { ...base, kind: 'stamp', pick: '500' }, 'it').effect
    );
  });

  it('shows the term and the lesson on the done screen, in either language', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 4);
    host.state.chapter = 4;
    game.reset(host, 2);

    const copyIt = game.doneView(host, 'it');
    const copyEn = game.doneView(host, 'en');
    const item = beatItems(s, 4, 2)[0];
    const lesson = s.lessons.find((l) => l.id === item.lesson);
    expect(copyIt.title).toBe(item.english);
    expect(copyEn.title).toBe(copyIt.title);
    expect(copyIt.eyebrow).toBe('Chiamata risposta');
    expect(copyEn.eyebrow).toBe('Call answered');
    expect(copyIt.subtitle).toBe(lesson.title.split(' / ')[0].trim());
    expect(copyEn.subtitle).toBe(lesson.title.split(' / ')[1].trim());
    expect(copyIt.subtitle).not.toBe(copyEn.subtitle);
    for (const copy of [copyIt, copyEn]) {
      expect(copy.title).not.toMatch(/[%★]/);
    }
  });

  it('every bumper carries a real term of the level, and every distractor is from the same lesson', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    const english = new Set(s.items.map((i) => i.english));

    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        host.state.beat = beat;
        game.reset(host, beat);
        const item = beatItems(s, chapter, beat)[0];
        expect(host.jacks.length).toBe(host.cfg.routes.length);
        const labels = host.jacks.map((j) => j.item.english);
        expect(new Set(labels).size).toBe(labels.length);
        for (const j of host.jacks) {
          expect(s.items.includes(j.item)).toBe(true);
          expect(english.has(j.item.english)).toBe(true);
          expect(j.item.lesson).toBe(item.lesson);
        }
        for (const t of host.queue) {
          expect(s.items.includes(t.item)).toBe(true);
          expect(t.item.lesson).toBe(item.lesson);
        }
      }
    }
  });

  /**
   * §15.4 wants a static-equivalent that looks deliberate. The ball is the
   * game and cannot stop, so the register slows it to 0.7x, freezes the sway
   * and the lamp chase, and the engine spawns no particles at all.
   */
  it('slows the ball, freezes the chase and skips particles under prefers-reduced-motion', async () => {
    const fallOf = (host) => {
      const c = nextCall(host);
      const y0 = c.y;
      const sway0 = c.sway;
      game.update(host, STEP);
      return { dy: c.y - y0, dsway: c.sway - sway0 };
    };

    const s = await session();
    const normal = makeHost(game, s, { reduceMotion: false });
    game.init(normal);
    useChapter(normal, game, 6);
    game.reset(normal, 3);
    const fast = fallOf(normal);
    const vy = ((H * 0.34) / normal.cfg.fall) * STEP;
    expect(fast.dy).toBeCloseTo(vy, 6);
    expect(fast.dsway).toBeGreaterThan(0);

    const s2 = await session();
    const reduced = makeHost(game, s2, { reduceMotion: true });
    game.init(reduced);
    useChapter(reduced, game, 6);
    game.reset(reduced, 3);
    const slow = fallOf(reduced);
    expect(slow.dy).toBeCloseTo(vy * 0.7, 6);
    expect(slow.dsway).toBe(0);

    // The rollover chase and the glow do not flicker: two frames apart in time,
    // with no state change between, paint the same calls. In motion they differ.
    const a = recordFrame(reduced, ctx);
    reduced.t += 0.37;
    const b = recordFrame(reduced, ctx);
    expect(b).toEqual(a);
    const c1 = recordFrame(normal, ctx);
    normal.t += 0.37;
    const c2 = recordFrame(normal, ctx);
    expect(c2).not.toEqual(c1);

    game.reset(reduced, 3);
    const { frames } = playBeat(reduced, ctx);
    expect(frames).toBeLessThan(8000);
    expect(reduced.finished).toBe(true);
    expect(reduced.parts).toHaveLength(0);
  });

  it('under prefers-reduced-motion the hint ring is a steady halo and the flippers rest', async () => {
    const s = await session();
    const reduced = makeHost(game, s, { reduceMotion: true });
    game.init(reduced);
    useChapter(reduced, game, 1);
    game.reset(reduced, 0);
    const target = reduced.item;
    let wrongs = 0;
    playBeat(reduced, ctx, {
      wrongFor: (c) => {
        if (c.item !== target || wrongs >= 2) return null;
        wrongs += 1;
        if (wrongs === 2) {
          dragPlug(reduced, c, wrongJackFor(reduced, c));
          reduced.setState({ done: true });
          return null;
        }
        return 'jack';
      },
    });
    expect(reduced.pulse).toBeGreaterThan(0);
    expect(reduced.pulseJ).toBe(jackOf(reduced, target));
    reduced.flash = 1;
    const a = recordFrame(reduced, ctx);
    reduced.t += 0.21;
    const b = recordFrame(reduced, ctx);
    expect(b).toEqual(a);
    // The halo is amber and four pixels wide, never red; the flippers hold
    // their rest angle even mid-flash.
    const halo = a.filter((v) => v.startsWith('stroke:') && v.endsWith('|4|1'));
    expect(halo.length).toBeGreaterThan(0);
    for (const v of halo) expect(v).toContain('|#FF9F1C|4|');
    expect(a.filter((v) => v.startsWith('rotate:')).map((v) => v.split('@')[0])).toEqual([
      'rotate:-0.42',
      'rotate:0.42',
    ]);
  });

  it('never paints red for a mistake: the only reds are the bumper caps and the rubbers', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 2);
    const c = nextCall(host);
    dragPlug(host, c, wrongJackFor(host, c));
    expect(host.state.left).toBe(1);
    const fills = [];
    const rawFill = ctx.fill;
    const rawRect = ctx.fillRect;
    ctx.fill = () => fills.push(ctx.fillStyle);
    ctx.fillRect = () => fills.push(ctx.fillStyle);
    game.draw(host, ctx);
    ctx.fill = rawFill;
    ctx.fillRect = rawRect;
    const reds = fills.filter((f) => /^#FF3B30$/i.test(f));
    // Two bumper caps and two flipper rubbers, whatever the lamps say.
    expect(reds).toHaveLength(host.jacks.length + 2);
    expect(fills.some((f) => /#e67e22|#ffb300/i.test(f))).toBe(false);
  });

  it('the keyboard plays the same game as the finger (§15.1, ricerca/33)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 2);
    expect(host.jacks).toHaveLength(2);

    const c = nextCall(host);
    press(host, 'ArrowRight');
    expect(host.kbUsed).toBe(true);
    expect(host.kj).toBe(1);
    press(host, 'ArrowRight');
    expect(host.kj).toBe(0);
    press(host, 'ArrowLeft');
    expect(host.kj).toBe(1);

    // A wrong bumper by keyboard is refused exactly like a wrong bumper by finger.
    const wrong = wrongJackFor(host, c);
    while (host.kj !== wrong) press(host, 'ArrowRight');
    press(host, ' ');
    expect(c.live).toBe(false);
    expect(s.totalAttempts).toBe(1);
    let call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(host.jacks[wrong].item.english);
    expect(call.expectedAnswer).toBe(c.item.english);

    // The right bumper by keyboard answers the call.
    const c2 = nextCall(host);
    const right = jackOf(host, c2.item);
    while (host.kj !== right) press(host, 'ArrowLeft');
    press(host, 'Enter');
    expect(c2.live).toBe(false);
    expect(host.finished).toBe(false);
    expect(c2.item.state).toBe('attempted');
    expect(s.totalCorrect).toBe(1);
    call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(c2.item.english);
    expect(call.expectedAnswer).toBe(c2.item.english);
  });

  it('digits stamp: a plugged call waits for its number, and 3 is the 404 target', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 5);
    game.reset(host, 0);

    let sawSocket = false;
    let sawOrphan = false;
    for (let guard = 0; guard < 12 && !(sawSocket && sawOrphan); guard += 1) {
      const c = nextCall(host);
      if (c.noSocket) {
        press(host, '3');
        expect(c.live).toBe(false);
        expect(c.item.state).toBe('introduced');
        sawOrphan = true;
      } else {
        while (host.kj !== jackOf(host, c.item)) press(host, 'ArrowRight');
        press(host, ' ');
        expect(host.pending).not.toBeNull();
        expect(c.plugged).toBe(true);
        // Space does nothing while a stamp is pending.
        press(host, ' ');
        expect(host.pending).not.toBeNull();
        press(host, String(STAMPS.indexOf(host.pending.want) + 1));
        expect(host.pending).toBeNull();
        expect(c.item.state).toBe(host.finished ? 'cleared' : 'attempted');
        sawSocket = true;
      }
      if (host.finished) break;
    }
    expect(sawSocket).toBe(true);
    expect(s.totalCorrect).toBeGreaterThan(0);
    expect(analyticsService.recordResponse.mock.calls.every(([c]) => c.correct)).toBe(true);
  });

  it('a keyboard-only operator finishes a five-bumper, three-in-the-air beat', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 7);
    game.reset(host, 3);
    expect(host.cfg.routes).toHaveLength(5);
    expect(host.cfg.max).toBe(3);

    const { frames, answered } = playBeatByKeyboard(host, ctx);
    expect(frames).toBeLessThan(8000);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(answered).toHaveLength(host.cfg.need);
    for (const c of answered) expect(c.item.state).toBe(stateAfterWin(host, c));
    expect(host.item.state).toBe('cleared');
    expect(s.totalAttempts).toBe(analyticsService.recordResponse.mock.calls.length);
    expect(s.totalAttempts).toBe(answered.filter((c) => !c.noSocket).length);
  });

  it('the meaning tag rides over the backglass the moment the ball leaves the plunger', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);
    const c = nextCall(host);
    expect(c.y).toBeLessThan(140);
    const log = recordFrame(host, ctx);
    const lamp = log.findIndex((v) => v.startsWith(`arc:${W - 60},51,9,`));
    const chip = log.findIndex((v) => v.startsWith(`fillText:${c.m},`));
    expect(lamp).toBeGreaterThanOrEqual(0);
    expect(chip).toBeGreaterThan(lamp);
  });

  it('the diagnostic overlay follows the glass language', async () => {
    const s = await session();
    const host = makeHost(game, s, { props: { diagnostica: true } });
    game.init(host);
    game.reset(host, 0);
    const ita = recordFrame(host, ctx).filter((v) => v.startsWith('fillText:c1.1'));
    expect(ita).toHaveLength(1);
    expect(ita[0]).toContain('prese 1');
    expect(ita[0]).toContain('attesa');
    host.setState({ lang: 'en' });
    const en = recordFrame(host, ctx).filter((v) => v.startsWith('fillText:c1.1'));
    expect(en).toHaveLength(1);
    expect(en[0]).toContain('sockets 1');
    expect(en[0]).toContain('waiting');
  });
});
