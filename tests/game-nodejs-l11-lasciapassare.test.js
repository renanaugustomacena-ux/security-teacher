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
import game from '../js/games/levels/nodejs-l11-lasciapassare.js';
import {
  makeContext2D,
  installDocumentDouble,
  makeHost,
  useChapter,
  run,
  assertShape,
} from './helpers/game-conformance.js';

const STEP = 1 / 60;
const W = game.W;
const H = game.H;
const ADMIT = { x: W * 0.26, y: H * 0.86 };
const DENY = { x: W * 0.74, y: H * 0.86 };
const HEAD_Y = 640;
const HEAD_H = 50;

async function session() {
  return createLevelSession({
    surface: 'nodejs',
    level: 10,
    mode: 'lasciapassare',
    progressManager: { addXP: vi.fn() },
  });
}

/** The gate's rule, replicated so the bot knows the right lever (template ok()). */
function holds(cfg, p) {
  if (!p.sig) return false;
  if (cfg.checkExp && p.exp) return false;
  if (cfg.checkIss && p.issuer !== 'casa') return false;
  if (cfg.checkRole && p.role !== p.claim) return false;
  return true;
}

function punchFor(host, item) {
  return host.punches.find((p) => p.item === item) || null;
}

function wrongPunchFor(host) {
  return host.punches.find((p) => p.item !== host.cur.item) || null;
}

function punchPoint(pu) {
  return { x: pu.x, y: HEAD_Y + HEAD_H / 2 };
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

function nextPass(host) {
  until(host, () => host.cur !== null);
  return host.cur;
}

function settle(host) {
  until(host, () => !host.press, 120);
}

/** Lower one punch and wait for it to land on the seal. */
function lower(host, pu) {
  game.tap(host, punchPoint(pu));
  settle(host);
}

function press(host, key) {
  game.key(host, { key, preventDefault() {} });
}

/**
 * Drive one beat as a competent gatekeeper would: read the sheet, lower the
 * punch engraved with its term, then pull the lever the rules demand.
 * Returns the frame count and the items stamped in order.
 */
function playBeat(host, ctx, { maxFrames = 8000, draw = true } = {}) {
  const stamped = [];
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    const cur = host.cur;
    if (cur && !host.press && !host.finished) {
      if (!cur.stamped) {
        const pu = punchFor(host, cur.item);
        if (pu) {
          game.tap(host, punchPoint(pu));
          stamped.push(cur.item);
        }
      } else {
        game.tap(host, holds(host.cfg, cur) ? ADMIT : DENY);
      }
    }
    game.update(host, STEP);
    if (draw) game.draw(host, ctx);
    frames += 1;
  }
  return { frames, stamped };
}

/** The same bot with no pointer: digits pick the punch, space lowers it, arrows judge. */
function playBeatByKeyboard(host, ctx, { maxFrames = 8000 } = {}) {
  const stamped = [];
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    const cur = host.cur;
    if (cur && !host.press && !host.finished) {
      if (!cur.stamped) {
        const pu = punchFor(host, cur.item);
        if (pu) {
          press(host, String(pu.i + 1));
          press(host, stamped.length % 2 ? 'Enter' : ' ');
          stamped.push(cur.item);
        }
      } else {
        press(host, holds(host.cfg, cur) ? 'ArrowLeft' : 'ArrowRight');
      }
    }
    game.update(host, STEP);
    game.draw(host, ctx);
    frames += 1;
  }
  return { frames, stamped };
}

/** Walk the level the way GameHost does: through the engine's goBeat/next. */
function eachBeatViaEngine(host, fn) {
  engine.goBeat(host, 0, 0);
  for (let n = 0; n < 40; n += 1) {
    fn(host.state.chapter, host.state.beat);
    if (n < 39) engine.next(host);
  }
}

describe('Il lasciapassare — conformance (SDK design §8, DOCTRINE §46)', () => {
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
    expect(game.meta.level).toBe(10);
    expect(game.meta.id).toBe('nodejs-l11-lasciapassare');
    expect(game.meta.register).toBe('R3');
    expect(game.meta.levelLabel).toBe(
      'Node.js · L11 Autenticazione / Node.js · L11 Authentication'
    );
    expect(game.drone).toEqual({ freq: 43, type: 'triangle', volume: 0.013, lowpass: 120 });
    for (const fn of ['tap', 'key', 'coachText', 'doneView', 'onCoachClose']) {
      expect(typeof game[fn]).toBe('function');
    }
  });

  it('keeps the template: eight chapters of five beats, checks that switch on chapter by chapter', () => {
    expect(game.CH).toHaveLength(8);
    expect(game.CH.every((c) => c.beats.length === 5)).toBe(true);
    for (const c of game.CH) {
      for (const b of c.beats) {
        expect(b.passes.length).toBeGreaterThan(1);
        expect(b.need).toBeGreaterThanOrEqual(3);
        expect(b.fall).toBeGreaterThanOrEqual(2);
        expect(b.fall).toBeLessThanOrEqual(3.6);
        expect(b.punches).toBeGreaterThanOrEqual(2);
        expect(b.punches).toBeLessThanOrEqual(4);
      }
    }
    expect(game.CH[0].beats.every((b) => !b.checkExp && !b.checkIss && !b.checkRole)).toBe(true);
    expect(game.CH[3].beats.every((b) => b.checkExp)).toBe(true);
    expect(game.CH[4].beats.every((b) => b.checkIss)).toBe(true);
    expect(game.CH[5].beats.every((b) => b.checkRole)).toBe(true);
    expect(game.CH[7].beats[3].need).toBe(9);
  });

  it('draws a frame without throwing on every beat of every chapter', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    const surface = ctx;
    expect(() => game.draw(host, surface)).not.toThrow();

    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        host.state.beat = beat;
        game.reset(host, beat);
        // The first pass lands at 0.6 s: 1.5 s draws the sheet and the rail.
        expect(() => run(host, game, surface, 1.5)).not.toThrow();
        expect(host.cur).not.toBeNull();
        expect(host.punches.length).toBe(host.cfg.punches);
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
      expect(host.item).toBe(host.terms[0]);
      expect(host.lesson.id).toBe(host.item.lesson);
      // The beat's own term is the first pass at the desk.
      expect(host.passItems[0]).toBe(host.item);
      for (const t of host.terms) keys.add(t.key);
    });
    expect(keys.size).toBe(40);
    expect(keys).toEqual(new Set(s.items.map((i) => i.key)));
    expect(spine(s).map((i) => i.key)).toEqual(s.items.map((i) => i.key));
  });

  it('introduces the term when its pass lands, the beat term first, fillers from the same lesson', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 6);
    host.state.beat = 3;
    game.reset(host, 3);

    expect(s.progress().introduced).toBe(0);
    const cur = nextPass(host);
    expect(cur.item).toBe(host.item);
    expect(cur.item.state).toBe('introduced');
    expect(s.progress().introduced).toBe(1);
    expect(host.passItems).toHaveLength(host.cfg.passes.length);
    for (const item of host.passItems) expect(item.lesson).toBe(host.item.lesson);
    const others = new Set(host.passItems.slice(1).map((i) => i.key));
    expect(others.has(host.item.key)).toBe(false);
    expect(others.size).toBe(host.cfg.passes.length - 1);
  });

  it('a scripted bot judging every pass clears the term and speaks it', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: false });
    game.init(host);
    game.reset(host, 0);

    const { frames, stamped } = playBeat(host, ctx);
    expect(frames).toBeLessThan(8000);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    // The template's timing: done on the last verdict, no delay, so the chrome
    // shows the beat complete on the frame the lever was pulled.
    expect(host.cur).toBeNull();
    expect(host.exit).not.toBeNull();
    expect(host.exit.k).toBe(0);
    expect(host.state.step).toBe(host.cfg.need);
    expect(host.made).toBe(host.cfg.need);
    expect(stamped).toHaveLength(host.cfg.need);
    expect(host.item.state).toBe('cleared');
    for (const item of stamped) expect(item.state).toBe('cleared');
    expect(spoken).toEqual(stamped.map((i) => i.english));
    expect(s.totalCorrect).toBe(host.cfg.need);
    expect(s.totalAttempts).toBe(host.cfg.need);
    // Every correct judgement persists the ledger with the beat it happened in.
    expect(storageService.save).toHaveBeenCalledTimes(host.cfg.need);
    for (const [key, record] of storageService.save.mock.calls) {
      expect(key).toBe('progress');
      expect(record).toEqual(expect.objectContaining({ beat: 0, chapter: 0 }));
    }
  });

  it('a mute host stamps in silence', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: true });
    game.init(host);
    game.reset(host, 0);
    playBeat(host, ctx);
    expect(host.finished).toBe(true);
    expect(spoken).toEqual([]);
  });

  /**
   * §46.5: the whole level, beat after beat, under the bot, through the
   * engine's own beat spine. Afterwards the ledger must let the level pass.
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

  it('will not finish a beat until its own term has passed the desk, however many fillers did', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 7);
    game.reset(host, 3);
    expect(host.cfg.need).toBe(9);

    // Let the beat's own term run out every time it comes round; judge the rest.
    let expired = 0;
    let frames = 0;
    while (frames < 12000 && !host.state.done && !host.state.coach) {
      const cur = host.cur;
      if (cur && !host.press && !host.finished) {
        if (cur.item === host.item && expired < 2) {
          if (cur.t === 0) expired += 1;
          cur.t = cur.limit + 1;
        } else if (!cur.stamped) {
          game.tap(host, punchPoint(punchFor(host, cur.item)));
        } else {
          game.tap(host, holds(host.cfg, cur) ? ADMIT : DENY);
        }
      }
      game.update(host, STEP);
      // While a pass is still owed, neither the chrome nor the queue say otherwise.
      if (!host.finished) expect(host.state.step).toBeLessThan(host.cfg.need);
      frames += 1;
    }
    expect(expired).toBe(2);
    expect(host.state.done).toBe(true);
    expect(host.made).toBeGreaterThan(host.cfg.need);
    expect(host.state.step).toBe(host.cfg.need);
    expect(host.won.has(host.item)).toBe(true);
    expect(host.item.state).toBe('cleared');
    // An expired pass is not an attempt.
    expect(s.totalAttempts).toBe(host.made);
  });

  it('grades a wrong punch through the SDK with the real pick against the real term (§46.2)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 0);

    const cur = nextPass(host);
    const wrong = wrongPunchFor(host);
    expect(wrong).not.toBeNull();
    expect(host.punches.length).toBe(3);
    game.tap(host, punchPoint(wrong));
    expect(host.press).not.toBeNull();
    settle(host);

    expect(cur.wrong).toBe(1);
    expect(cur.stamped).toBe(false);
    expect(cur.item.state).toBe('attempted');
    expect(host.state.coach).toBeNull();
    expect(s.totalAttempts).toBe(1);
    expect(s.totalCorrect).toBe(0);
    expect(host.bad).toBe(0);

    const call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(false);
    expect(call.exerciseMode).toBe('lasciapassare');
    expect(call.userAnswer).toBe(wrong.item.english);
    expect(call.expectedAnswer).toBe(cur.item.english);
    expect(call.userAnswer).not.toBe(call.expectedAnswer);
    // The pass is still at the desk and the punches still hang.
    expect(host.cur).toBe(cur);
    expect(host.punches.length).toBe(3);
  });

  it('lights the right punch on the second error and reports the aid to the SDK', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const cur = nextPass(host);
    const attempt = vi.spyOn(cur.item, 'attempt');
    for (let n = 0; n < 2; n += 1) lower(host, wrongPunchFor(host));
    expect(cur.wrong).toBe(2);
    expect(cur.aided).toBe(true);
    expect(host.state.coach).toBeNull();
    expect(punchFor(host, cur.item).glow).toBe(1);
    expect(attempt).toHaveBeenCalledTimes(2);
    expect(attempt.mock.calls.every(([, o]) => o.hintsUsed === 0)).toBe(true);

    lower(host, punchFor(host, cur.item));
    expect(cur.stamped).toBe(true);
    expect(attempt).toHaveBeenCalledTimes(3);
    const [pick, opts] = attempt.mock.calls.at(-1);
    expect(pick).toBe(cur.item.english);
    expect(opts.hintsUsed).toBe(1);
    expect(opts.silent).toBe(true);
    expect(opts.mode).toBe('lasciapassare');
  });

  it('opens the "wrong" coach on the third wrong punch on one pass, with the term in the rule', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const cur = nextPass(host);
    let last = null;
    for (let n = 0; n < 3; n += 1) {
      last = wrongPunchFor(host);
      lower(host, last);
      if (n < 2) expect(host.state.coach).toBeNull();
    }
    expect(host.coachKind).toBe('wrong');
    expect(host.state.coach).toEqual({
      kind: 'wrong',
      pick: last.item.english,
      word: cur.item.english,
      it: expect.any(String),
    });
    expect(s.totalAttempts).toBe(3);
    for (const lang of ['it', 'en']) {
      const copy = game.coachText(host, host.state.coach, lang);
      expect(copy.rule).toContain(cur.item.english);
      expect(copy.effect).toContain(last.item.english);
    }
    game.onCoachClose(host);
    expect(host.coachKind).toBeNull();
    host.setState({ coach: null });

    // The ladder starts over: the next wrong punch is a first error again, the
    // panel does not reopen on every miss, but the right punch stays lit and
    // the SDK keeps hearing that the pass is aided.
    const attempt = vi.spyOn(cur.item, 'attempt');
    lower(host, wrongPunchFor(host));
    expect(host.state.coach).toBeNull();
    expect(host.coachKind).toBeNull();
    expect(cur.wrong).toBe(1);
    expect(cur.aided).toBe(true);
    expect(punchFor(host, cur.item).glow).toBe(1);
    expect(attempt.mock.calls.at(-1)[1].hintsUsed).toBe(1);
    lower(host, wrongPunchFor(host));
    expect(host.state.coach).toBeNull();
    lower(host, wrongPunchFor(host));
    expect(host.state.coach).toEqual(expect.objectContaining({ kind: 'wrong' }));
    expect(s.totalAttempts).toBe(6);
  });

  it('the levers are dead until the seal is checked, and a wrong verdict is not a graded response', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const cur = nextPass(host);
    game.tap(host, ADMIT);
    expect(host.cur).toBe(cur);
    expect(host.leverShake).toBeGreaterThan(0);
    expect(host.bad).toBe(0);
    expect(s.totalAttempts).toBe(0);

    lower(host, punchFor(host, cur.item));
    expect(cur.stamped).toBe(true);
    const right = holds(host.cfg, cur);
    game.tap(host, right ? DENY : ADMIT);
    expect(host.cur).toBeNull();
    expect(host.bad).toBe(1);
    expect(host.streak).toEqual({ kind: right ? 'kept' : 'letIn', n: 1 });
    expect(s.totalAttempts).toBe(1);
    expect(s.totalCorrect).toBe(1);
    expect(cur.item.state).toBe('attempted');
  });

  /**
   * The template's own ladder (§4.6). A correct verdict resets the streak, so
   * three same-kind errors must come from three consecutive passes of the same
   * standing: chapter 7 beat 5 [P, OLD, BOSS, P] judged right for two, then
   * BOSS, P, P all turned away ('kept'); chapter 5 beat 4 [P, ALT, OLD, NO, P]
   * judged right for one, then ALT, OLD, NO all let in ('letIn'). Three errors
   * of one kind are three bad verdicts, so the coach and the shutter arrive
   * together, in the template's order: coach, then bad, then the gate.
   */
  for (const [kind, chapter, beat, skip, lever] of [
    ['kept', 6, 4, 2, DENY],
    ['letIn', 4, 3, 1, ADMIT],
  ]) {
    it(`the template ladder: two ${kind} verdicts pulse, three open the ${kind} coach`, async () => {
      const s = await session();
      const host = makeHost(game, s);
      game.init(host);
      useChapter(host, game, chapter);
      host.state.beat = beat;
      game.reset(host, beat);

      const words = [];
      for (let n = 0; n < skip; n += 1) {
        const cur = nextPass(host);
        lower(host, punchFor(host, cur.item));
        game.tap(host, holds(host.cfg, cur) ? ADMIT : DENY);
        expect(host.streak).toEqual({ kind: null, n: 0 });
      }
      expect(host.made).toBe(skip);
      for (let n = 1; n <= 3; n += 1) {
        const cur = nextPass(host);
        expect(host.state.coach).toBeNull();
        lower(host, punchFor(host, cur.item));
        expect(cur.stamped).toBe(true);
        // This lever is the wrong one for this pass.
        expect(holds(host.cfg, cur)).toBe(lever === DENY);
        words.push(cur.item.english);
        game.tap(host, lever);
        if (n < 3) {
          expect(host.streak).toEqual({ kind, n });
          expect(host.bad).toBe(n);
        }
        if (n === 2) expect(host.pulse).toBeGreaterThan(0);
        if (n === 1) expect(host.pulse).toBe(0);
      }
      expect(host.state.coach).toEqual({
        kind,
        word: words[2],
        it: expect.any(String),
        why: kind === 'kept' ? 'none' : expect.stringMatching(/^(sig|exp|iss|role)$/),
        claim: expect.any(String),
        role: expect.any(String),
      });
      expect(host.coachKind).toBe(kind);
      expect(host.streak).toEqual({ kind: null, n: 0 });
      // Three bad verdicts: the gate is shut behind the coach and the beat restarts.
      expect(host.bad).toBe(0);
      expect(host.made).toBe(0);
      expect(host.shut).toBeGreaterThan(0);
      for (const lang of ['it', 'en']) {
        const copy = game.coachText(host, host.state.coach, lang);
        expect(copy.rule).toContain(words[2]);
        for (const field of ['what', 'effect', 'rule', 'hint']) {
          expect(copy[field]).not.toContain('{');
        }
      }
      // Every stamp was the right punch: the verdicts are not graded responses.
      expect(s.totalAttempts).toBe(skip + 3);
      expect(s.totalCorrect).toBe(skip + 3);
      game.onCoachClose(host);
      expect(host.coachKind).toBeNull();
    });
  }

  it('three bad verdicts close the gate and restart the beat with the same term', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 3);
    host.state.beat = 2;
    game.reset(host, 2);
    const term = host.item;

    for (let n = 0; n < 3; n += 1) {
      const cur = nextPass(host);
      lower(host, punchFor(host, cur.item));
      game.tap(host, holds(host.cfg, cur) ? DENY : ADMIT);
      if (n < 2) expect(host.bad).toBe(n + 1);
    }
    expect(host.bad).toBe(0);
    expect(host.made).toBe(0);
    expect(host.shut).toBeGreaterThan(0);
    expect(host.cur).toBeNull();
    expect(host.item).toBe(term);
    expect(host.state.step).toBe(0);
    expect(() => game.draw(host, ctx)).not.toThrow();
    // Nobody steps up to the desk while the shutter is down (1.2 s), then the
    // usual 0.6 s before the first pass lands.
    const shutFrames = until(host, () => host.cur !== null, 600);
    expect(host.shut).toBeLessThanOrEqual(0);
    expect(shutFrames / 60).toBeGreaterThan(1.2 + 0.6 - 0.05);
    expect(shutFrames / 60).toBeLessThan(1.2 + 0.6 + 0.1);
    // The beat plays on from the top and still finishes.
    const { frames } = playBeat(host, ctx);
    expect(frames).toBeLessThan(8000);
    expect(host.finished).toBe(true);
  });

  it('a pass that runs out is shaken off, counted bad, and comes back round — never graded', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const cur = nextPass(host);
    const limit = cur.limit;
    // NUMERI: 3.6 s of transit plus 1.4 + 0.6 × 2 punches to read the sheet.
    expect(limit).toBeCloseTo(3.6 + 2.6, 6);
    const frames = until(host, () => host.cur !== cur, 60 * 10);
    expect(frames / 60).toBeGreaterThan(limit - 0.1);
    expect(frames / 60).toBeLessThan(limit + 0.2);
    expect(host.bad).toBe(1);
    expect(s.totalAttempts).toBe(0);
    expect(cur.item.state).toBe('introduced');
    expect(host.state.coach).toBeNull();
    // The queue cycles: the same sheet returns after the others.
    const seen = [];
    for (let n = 0; n < host.cfg.passes.length; n += 1) {
      const p = nextPass(host);
      seen.push(p.item);
      lower(host, punchFor(host, p.item));
      game.tap(host, holds(host.cfg, p) ? ADMIT : DENY);
    }
    expect(seen).toContain(cur.item);
  });

  it('offers bilingual coach copy for every kind with the placeholders filled in', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const base = {
      pick: 'Session ID',
      word: 'Cookie',
      it: 'Dato persistente del browser',
      claim: 'capo',
      role: 'operaio',
    };
    for (const kind of ['wrong', 'letIn', 'kept']) {
      for (const why of ['sig', 'exp', 'iss', 'role', 'none', undefined]) {
        const copies = ['it', 'en'].map((lang) =>
          game.coachText(host, { ...base, kind, why }, lang)
        );
        for (const copy of copies) {
          for (const field of ['what', 'effect', 'rule', 'hint']) {
            expect(copy[field].length).toBeGreaterThan(0);
            expect(copy[field]).not.toContain('{');
          }
          // ricerca/34: the rule line always carries the English term.
          expect(copy.rule).toContain(base.word);
        }
        expect(copies[0].what).not.toBe(copies[1].what);
        expect(copies[0].rule).not.toBe(copies[1].rule);
      }
    }
    const roleIt = game.coachText(host, { ...base, kind: 'letIn', why: 'role' }, 'it');
    expect(roleIt.effect).toContain('capo');
    expect(roleIt.effect).toContain('operaio');
    const wrongEn = game.coachText(host, { ...base, kind: 'wrong' }, 'en');
    expect(wrongEn.effect).toContain(base.pick);
    expect(wrongEn.effect).toContain(base.it);
  });

  it('shows the term and its meaning on the done screen, in either language, no stars', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 2);
    game.reset(host, 4);

    const copyIt = game.doneView(host, 'it');
    const copyEn = game.doneView(host, 'en');
    expect(copyIt.title).toBe(host.item.english);
    expect(copyEn.title).toBe(copyIt.title);
    expect(copyIt.eyebrow).toBe('Varco in ordine');
    expect(copyEn.eyebrow).toBe('Gate in order');
    expect(copyIt.subtitle).toBe(host.item.italian.replace(/\s*\([^)]*\)\s*$/, '').trim());
    expect(copyEn.subtitle).toBe(host.lesson.title.split(' / ')[1].trim());
    expect(copyIt.subtitle).not.toBe(copyEn.subtitle);
    for (const copy of [copyIt, copyEn]) {
      expect(JSON.stringify(copy)).not.toMatch(/[★%]/);
    }
  });

  it('every punch is a real term of the level from the same lesson, the right one always among them', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    const english = new Set(s.items.map((i) => i.english));

    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        game.reset(host, beat);
        const cur = nextPass(host);
        expect(host.punches).toHaveLength(host.cfg.punches);
        expect(punchFor(host, cur.item)).not.toBeNull();
        const labels = new Set();
        for (const pu of host.punches) {
          expect(s.items.includes(pu.item)).toBe(true);
          expect(english.has(pu.item.english)).toBe(true);
          expect(pu.item.lesson).toBe(cur.item.lesson);
          labels.add(pu.item.english.toLowerCase());
        }
        expect(labels.size).toBe(host.punches.length);
        // TEST 1: one silhouette, one row; only the engraving differs.
        expect(new Set(host.punches.map((p) => p.y)).size).toBe(1);
      }
    }
  });

  it('shuffles the rail so the right punch is not always in the same slot', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 5);
    const slots = new Set();
    for (let n = 0; n < 40 && slots.size < 2; n += 1) {
      game.reset(host, n % 5);
      const cur = nextPass(host);
      slots.add(punchFor(host, cur.item).i);
    }
    expect(slots.size).toBeGreaterThan(1);
  });

  /**
   * §15.4: the punch falls and the carriers step out at 0.7× under reduced
   * motion, the queue stands still, the engine spawns no particles.
   */
  it('slows the punch and the exit to 0.7× and skips particles under prefers-reduced-motion', async () => {
    const framesToStamp = (host) => {
      const cur = nextPass(host);
      game.tap(host, punchPoint(punchFor(host, cur.item)));
      return until(host, () => !host.press, 300);
    };

    const s = await session();
    const normal = makeHost(game, s, { reduceMotion: false });
    game.init(normal);
    useChapter(normal, game, 5);
    game.reset(normal, 0);
    const fast = framesToStamp(normal);

    const s2 = await session();
    const reduced = makeHost(game, s2, { reduceMotion: true });
    game.init(reduced);
    useChapter(reduced, game, 5);
    game.reset(reduced, 0);
    const slow = framesToStamp(reduced);

    // 3 steps × 0.09 s = 0.27 s at 60 fps → 17 frames; at 0.7× → 24.
    expect(fast).toBeGreaterThanOrEqual(16);
    expect(fast).toBeLessThanOrEqual(18);
    expect(slow).toBeGreaterThanOrEqual(Math.floor(fast / 0.7));
    expect(slow).toBeLessThan(fast / 0.7 + 2);

    // The queue marches only when motion is allowed.
    const f0 = reduced.marchF;
    until(reduced, () => false, 120);
    expect(reduced.marchF).toBe(f0);
    expect(reduced.marchX).toBe(0);
    const g0 = normal.marchF;
    let toggled = false;
    for (let n = 0; n < 120 && !toggled; n += 1) {
      game.update(normal, STEP);
      toggled = normal.marchF !== g0;
    }
    expect(toggled).toBe(true);

    game.reset(reduced, 0);
    playBeat(reduced, ctx);
    expect(reduced.finished).toBe(true);
    expect(reduced.parts).toHaveLength(0);
  });

  it('under prefers-reduced-motion nothing decorative flickers between two frames (§11.6)', async () => {
    const s = await session();
    const reduced = makeHost(game, s, { reduceMotion: true });
    game.init(reduced);
    game.reset(reduced, 0);
    const cur = nextPass(reduced);
    // A refused punch, a lit right punch, a ticking bar in its last third and
    // a pulse marker: everything that moves in the normal glass is on screen.
    lower(reduced, wrongPunchFor(reduced));
    lower(reduced, wrongPunchFor(reduced));
    expect(cur.shake).toBeGreaterThan(0);
    expect(punchFor(reduced, cur.item).glow).toBe(1);
    reduced.pulse = 0.9;
    cur.t = cur.limit * 0.8;

    const record = (host) => {
      const calls = [];
      const c = makeContext2D();
      for (const name of ['fillRect', 'fillText', 'stroke', 'arc', 'roundRect']) {
        c[name] = (...args) => calls.push(`${name}|${c.fillStyle}|${args.join(',')}`);
      }
      Object.defineProperty(c, 'shadowBlur', {
        configurable: true,
        get: () => 0,
        set: (v) => {
          calls.push(`blur|${v}`);
        },
      });
      game.draw(host, c);
      return calls;
    };
    const first = record(reduced);
    reduced.t += 0.37;
    const second = record(reduced);
    expect(second).toEqual(first);
    expect(first.some((v) => v === 'blur|16')).toBe(true);
    // No red is ever a verdict: the only red in the glass is the top band's gel.
    const reds = first.filter((v) => /#FF5A5A|#d6603c/i.test(v));
    expect(reds).toHaveLength(1);
    expect(reds[0].startsWith('fillRect|#FF5A5A|-12,-12')).toBe(true);

    const s2 = await session();
    const normal = makeHost(game, s2, { reduceMotion: false });
    game.init(normal);
    game.reset(normal, 0);
    const cur2 = nextPass(normal);
    lower(normal, wrongPunchFor(normal));
    lower(normal, wrongPunchFor(normal));
    normal.pulse = 0.9;
    cur2.t = cur2.limit * 0.8;
    const a = record(normal);
    normal.t += 0.37;
    const b = record(normal);
    expect(b).not.toEqual(a);
  });

  it('the keyboard plays the same game as the finger (§15.1, ricerca/33)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 3);
    game.reset(host, 0);

    const cur = nextPass(host);
    expect(host.punches.length).toBe(4);
    press(host, 'ArrowRight');
    expect(host.kbUsed).toBe(true);
    expect(host.sel).toBe(0);
    press(host, 'ArrowRight');
    expect(host.sel).toBe(1);
    press(host, 'ArrowLeft');
    expect(host.sel).toBe(0);
    press(host, '3');
    expect(host.sel).toBe(2);
    press(host, '1');
    expect(host.sel).toBe(0);

    // A wrong punch by keyboard is refused exactly like a wrong punch by finger.
    const wrong = wrongPunchFor(host);
    press(host, String(wrong.i + 1));
    expect(host.sel).toBe(wrong.i);
    press(host, ' ');
    expect(host.press).not.toBeNull();
    settle(host);
    expect(cur.wrong).toBe(1);
    expect(cur.stamped).toBe(false);
    expect(s.totalAttempts).toBe(1);
    let call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(wrong.item.english);
    expect(call.expectedAnswer).toBe(cur.item.english);
    // The levers do not answer before the seal is checked.
    press(host, 'ArrowLeft');
    expect(host.cur).toBe(cur);
    expect(host.bad).toBe(0);

    // The right punch by keyboard stamps, and the arrow judges.
    const right = punchFor(host, cur.item);
    press(host, String(right.i + 1));
    press(host, 'Enter');
    settle(host);
    expect(cur.stamped).toBe(true);
    call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(cur.item.english);
    expect(call.expectedAnswer).toBe(cur.item.english);
    press(host, holds(host.cfg, cur) ? 'ArrowLeft' : 'ArrowRight');
    expect(host.cur).toBeNull();
    expect(host.made).toBe(1);
    expect(cur.item.state).toBe('cleared');
    expect(s.totalCorrect).toBe(1);
  });

  it('a keyboard-only bot finishes a four-punch, nine-pass beat', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 7);
    game.reset(host, 3);
    expect(host.cfg.punches).toBe(4);
    expect(host.cfg.need).toBe(9);

    const { frames, stamped } = playBeatByKeyboard(host, ctx);
    expect(frames).toBeLessThan(8000);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(stamped).toHaveLength(host.cfg.need);
    for (const item of stamped) expect(item.state).toBe('cleared');
    expect(s.totalCorrect).toBe(host.cfg.need);
    expect(s.totalAttempts).toBe(host.cfg.need);
  });

  it('draws the register: pure black ground, gel bands, no gold, no blue-grey frame', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 7);
    game.reset(host, 0);
    nextPass(host);
    const fills = [];
    const c = makeContext2D();
    c.fillRect = () => fills.push(String(c.fillStyle));
    c.fill = () => fills.push(String(c.fillStyle));
    c.fillText = () => fills.push(String(c.fillStyle));
    game.draw(host, c);
    const colours = new Set(fills.map((v) => v.toUpperCase()).filter((v) => v.startsWith('#')));
    expect(colours.has('#000000')).toBe(true);
    for (const g of ['#FF5A5A', '#F2F2F2', '#3DFF6E']) expect(colours.has(g)).toBe(true);
    for (const banned of ['#E67E22', '#FFB300', '#C9A227', '#D9B448', '#11191F', '#151E23']) {
      expect(colours.has(banned)).toBe(false);
    }
    expect(colours.size).toBeLessThanOrEqual(6);
  });
});
