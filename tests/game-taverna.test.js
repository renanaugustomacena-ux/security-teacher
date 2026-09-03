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
import { createLevelSession, LEARN_SURFACE } from '../js/games/LevelSession.js';
import game from '../js/games/levels/inglese-l0-taverna.js';
import {
  makeContext2D,
  installDocumentDouble,
  makeHost,
  useChapter,
  run,
  assertShape,
} from './helpers/game-conformance.js';

const CARD_W = 186;
const CARD_H = 104;
const LT = 160;
const LHT = 126;
const ENDX = game.W - 124;
const STEP = 1 / 60;

async function session() {
  return createLevelSession({
    surface: LEARN_SURFACE,
    level: 0,
    mode: 'taverna',
    progressManager: { addXP: vi.fn() },
  });
}

function laneY(i) {
  return LT + i * LHT;
}

function present(host) {
  return host.cust.filter((k) => !k.served && !k.gone);
}

function cardFor(host, item) {
  return host.cards.find((c) => c.item === item) || null;
}

function wrongCardFor(host, k) {
  return host.cards.find((c) => c.item !== k.item) || null;
}

function cardCentre(c) {
  return { x: c.x + CARD_W / 2, y: c.y + CARD_H / 2 };
}

function lanePoint(lane) {
  return { x: 200, y: laneY(lane) + 40 };
}

/** The primary gesture: pick the card up and drop it on the customer's counter. */
function dragServe(host, card, lane) {
  const from = cardCentre(card);
  const to = lanePoint(lane);
  game.down(host, from);
  game.drag(host, from, to);
  game.up(host, to);
}

/** The coarse-pointer alternative: tap the card, then tap the counter. */
function tapServe(host, card, lane) {
  const p = cardCentre(card);
  game.down(host, p);
  game.up(host, p);
  game.down(host, lanePoint(lane));
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
  until(host, () => present(host).length > 0);
  return present(host)[0];
}

function settle(host) {
  until(host, () => !host.slide, 120);
}

/**
 * Drive one beat as a competent host would: whenever a customer waits and the
 * card with their phrase is on the tray, serve it. Returns the frame count and
 * the phrases served in order. A run that never reaches `done` is a mute dead
 * end, which ricerca/31 §31.12 forbids — the assertions catch that.
 *
 * `patient` waits until a customer is past 60 % of the counter before serving,
 * so the fickle ones (35–55 %) have already changed their mind.
 */
function playBeat(host, ctx, { maxFrames = 8000, draw = true, patient = false } = {}) {
  const served = [];
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    if (!host.slide && !host.drag && !host.finished) {
      const k = present(host).sort((a, b) => b.x - a.x)[0];
      const ready = k && (!patient || k.x > ENDX * 0.6);
      const card = ready ? cardFor(host, k.item) : null;
      if (card) {
        dragServe(host, card, k.lane);
        served.push(k.item);
      }
    }
    game.update(host, STEP);
    if (draw) game.draw(host, ctx);
    frames += 1;
  }
  return { frames, served };
}

function press(host, key) {
  game.key(host, { key, preventDefault() {} });
}

/**
 * The same bot with no pointer at all: a digit picks the card, ↑/↓ pick the
 * counter, space or Enter serves. §43.6: playable with a keyboard.
 */
function playBeatByKeyboard(host, ctx, { maxFrames = 8000 } = {}) {
  const served = [];
  let frames = 0;
  while (frames < maxFrames) {
    if (host.state.done || host.state.coach) break;
    if (!host.slide && !host.finished) {
      const k = present(host).sort((a, b) => b.x - a.x)[0];
      const card = k ? cardFor(host, k.item) : null;
      if (card) {
        press(host, String(host.cards.indexOf(card) + 1));
        while (host.klane !== k.lane) press(host, k.lane > host.klane ? 'ArrowDown' : 'ArrowUp');
        press(host, served.length % 2 ? 'Enter' : ' ');
        served.push(k.item);
      }
    }
    game.update(host, STEP);
    game.draw(host, ctx);
    frames += 1;
  }
  return { frames, served };
}

/**
 * Walk the level the way GameHost does: through the engine's own goBeat/next,
 * which installs the chapter, resets, and only then writes state.chapter.
 */
function eachBeatViaEngine(host, fn) {
  engine.goBeat(host, 0, 0);
  for (let n = 0; n < 30; n += 1) {
    fn(host.state.chapter, host.state.beat);
    if (n < 29) engine.next(host);
  }
}

describe('La taverna — conformance (SDK design §8, DOCTRINE §43)', () => {
  let ctx;
  let restoreDocument;

  beforeEach(() => {
    ctx = makeContext2D();
    restoreDocument = installDocumentDouble();
    storedRecord = null;
    spoken.length = 0;
    analyticsService.recordResponse.mockClear();
  });

  afterEach(() => restoreDocument());

  it('exposes the lifecycle and metadata the host and registry read', () => {
    assertShape(game, expect);
    expect(game.meta.surface).toBe('learn');
    expect(game.meta.level).toBe(0);
    expect(game.meta.id).toBe('inglese-l0-taverna');
    expect(game.drone).toEqual({ freq: 55, type: 'triangle', volume: 0.01, lowpass: 160 });
    for (const fn of ['down', 'drag', 'up', 'key', 'coachText', 'doneView', 'onCoachClose']) {
      expect(typeof game[fn]).toBe('function');
    }
  });

  it('runs the whole evening: six chapters of five rounds', () => {
    expect(game.CH).toHaveLength(6);
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
        // The first customer walks in at 1.2 s: 2.5 s draws a customer, their
        // bubble and a stocked tray, not just the empty room.
        expect(() => run(host, game, surface, 2.5)).not.toThrow();
        expect(present(host).length).toBeGreaterThan(0);
        expect(host.cards.length).toBeGreaterThan(0);
      }
    }
  });

  it('follows the chapter the engine installed, so every one of the thirty phrases anchors a round (§43.5)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    const anchors = new Set();
    eachBeatViaEngine(host, (chapter, beat) => {
      const lesson = s.lessons[Math.floor(chapter / 2) % s.lessons.length];
      expect(host.chapter, `chapter ${chapter} beat ${beat}`).toBe(chapter);
      expect(host.lesson, `chapter ${chapter} beat ${beat}`).toBe(lesson);
      expect(host.anchor).toBe(lesson.items[(chapter % 2) * 5 + beat]);
      expect(host.queue[0]).toBe(host.anchor);
      expect(game.doneView(host, 'it').subtitle).toBe(lesson.title.split(' / ')[0].trim());
      anchors.add(host.anchor.key);
    });
    expect(anchors.size).toBe(30);
    expect(anchors).toEqual(new Set(s.items.map((i) => i.key)));
  });

  it('queues every one of the thirty phrases, each lesson within its own ten rounds', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    const all = new Set();
    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      const lesson = s.lessons[Math.floor(chapter / 2) % s.lessons.length];
      const lessonKeys = new Set(lesson.items.map((i) => i.key));
      const seen = new Set();
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        host.state.beat = beat;
        game.reset(host, beat);
        expect(host.queue).toHaveLength(host.cfg.need);
        // The round's own phrase walks in first (§43.5, deterministic coverage).
        const j = (chapter % 2) * 5 + beat;
        expect(host.queue[0]).toBe(lesson.items[j % lesson.items.length]);
        for (const item of host.queue) {
          expect(lessonKeys.has(item.key)).toBe(true);
          seen.add(item.key);
          all.add(item.key);
        }
      }
      // Half a lesson per chapter: the two chapters together cover it.
      if (chapter % 2 === 1) {
        useChapter(host, game, chapter - 1);
        for (let beat = 0; beat < host.BEATS.length; beat += 1) {
          game.reset(host, beat);
          for (const item of host.queue) seen.add(item.key);
        }
        expect(seen).toEqual(lessonKeys);
      }
    }

    expect(all.size).toBe(30);
    expect(all).toEqual(new Set(s.items.map((i) => i.key)));
  });

  it("introduces a phrase when its customer walks in, and the round's own phrase comes first", async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 2);
    host.state.beat = 3;
    game.reset(host, 3);

    expect(s.progress().introduced).toBe(0);
    const k = nextCustomer(host);
    expect(k.item).toBe(s.lessons[1].items[3]);
    expect(k.item.state).toBe('introduced');
    expect(s.progress().introduced).toBe(1);
  });

  it('a scripted bot serving every customer clears the phrases and speaks them', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: false });
    game.init(host);
    game.reset(host, 0);

    storageService.save.mockClear();
    const { frames, served } = playBeat(host, ctx);
    expect(frames).toBeLessThan(8000);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(host.served).toBe(host.cfg.need);
    expect(served).toHaveLength(host.cfg.need);
    for (const item of served) expect(item.state).toBe('cleared');
    // ricerca/35 §35.3.1: a served phrase is read aloud (ellipses are not
    // spoken, so "I would like to order..." is read without the dots).
    expect(spoken).toEqual(served.map((i) => i.english.replace(/\.\.\./g, '').trim()));
    expect(s.totalCorrect).toBe(host.cfg.need);
    // Every correct serve persists the ledger with the beat it happened in.
    expect(storageService.save).toHaveBeenCalledTimes(host.cfg.need);
    for (const [key, record] of storageService.save.mock.calls) {
      expect(key).toBe('progress');
      expect(record).toEqual(expect.objectContaining({ beat: 0, chapter: 0 }));
    }
    const last = storageService.save.mock.calls.at(-1)[1];
    expect(new Set(last.cleared)).toEqual(new Set(served.map((i) => i.key)));
  });

  it('a mute host serves in silence', async () => {
    const s = await session();
    const host = makeHost(game, s, { muted: true });
    game.init(host);
    game.reset(host, 0);
    playBeat(host, ctx);
    expect(host.finished).toBe(true);
    expect(spoken).toEqual([]);
  });

  /**
   * §43.5: the whole level, beat after beat, under the bot. Afterwards the
   * ledger must let the level pass — every one of the thirty phrases attempted.
   */
  it('the bot playing all thirty rounds through the engine completes the level ledger', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    eachBeatViaEngine(host, (chapter, beat) => {
      const { frames } = playBeat(host, ctx, { draw: true });
      expect(frames, `chapter ${chapter} beat ${beat} hit the frame cap`).toBeLessThan(8000);
      expect(host.finished, `chapter ${chapter} beat ${beat} did not finish`).toBe(true);
      expect(host.state.done).toBe(true);
      const saved = storageService.save.mock.calls.at(-1)[1];
      expect(saved).toEqual(expect.objectContaining({ beat, chapter }));
    });

    expect(s.progress().attempted).toBe(30);
    expect(s.progress().cleared).toBe(30);
    const result = s.finish();
    expect(result.passed).toBe(true);
    expect(result.missed).toEqual([]);
    expect(result.coverage).toBe(1);
  });

  /**
   * The same ledger under a slow host: in the two "change" chapters the bot
   * waits past the point where fickle customers swap their request, so the
   * swapped phrases and the pruned tray are part of the run — and must not
   * corrupt coverage.
   */
  it('a patient bot who lets customers change their mind still completes the ledger', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    let changed = 0;
    eachBeatViaEngine(host, (chapter, beat) => {
      const patient = Boolean(host.cfg.change);
      const { frames } = playBeat(host, ctx, { draw: false, patient, maxFrames: 12000 });
      expect(frames, `chapter ${chapter} beat ${beat} hit the frame cap`).toBeLessThan(12000);
      expect(host.finished, `chapter ${chapter} beat ${beat} did not finish`).toBe(true);
      expect(host.lost).toBe(0);
      changed += host.cust.filter((k) => k.changed).length;
      for (const k of host.cust) {
        if (k.changed) expect(k.wasItem.state).not.toBe('unseen');
      }
    });

    expect(changed).toBeGreaterThan(0);
    expect(s.progress().attempted).toBe(30);
    expect(s.progress().cleared).toBe(30);
    const result = s.finish();
    expect(result.passed).toBe(true);
    expect(result.missed).toEqual([]);
  });

  it('grades a wrong serve through the SDK with the real pick against the real target (§43.2)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const k = nextCustomer(host);
    const wrong = wrongCardFor(host, k);
    expect(wrong).not.toBeNull();
    tapServe(host, wrong, k.lane);
    expect(host.slide).not.toBeNull();
    settle(host);

    expect(k.wrong).toBe(1);
    expect(k.item.state).toBe('attempted');
    expect(host.state.coach).toBeNull();
    expect(s.totalAttempts).toBe(1);
    expect(s.totalCorrect).toBe(0);

    const call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.correct).toBe(false);
    expect(call.exerciseMode).toBe('taverna');
    expect(call.userAnswer).toBe(wrong.item.english);
    expect(call.expectedAnswer).toBe(k.item.english);
    expect(call.userAnswer).not.toBe(call.expectedAnswer);
    // The rejected card is back on the tray, not lost.
    expect(host.cards.some((c) => c.item === wrong.item)).toBe(true);
  });

  it('lights the right card on the second error and reports the aid to the SDK', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const k = nextCustomer(host);
    const attempt = vi.spyOn(k.item, 'attempt');
    for (let n = 0; n < 2; n += 1) {
      tapServe(host, wrongCardFor(host, k), k.lane);
      settle(host);
    }
    expect(k.wrong).toBe(2);
    expect(k.aided).toBe(true);
    expect(host.state.coach).toBeNull();
    expect(cardFor(host, k.item).glow).toBe(1);
    // Neither wrong serve was aided at the time it was made.
    expect(attempt).toHaveBeenCalledTimes(2);
    expect(attempt.mock.calls.every(([, o]) => o.hintsUsed === 0)).toBe(true);

    tapServe(host, cardFor(host, k.item), k.lane);
    settle(host);
    expect(k.served).toBe(true);
    expect(k.item.state).toBe('cleared');
    expect(attempt).toHaveBeenCalledTimes(3);
    const [pick, opts] = attempt.mock.calls.at(-1);
    expect(pick).toBe(k.item.english);
    expect(opts.hintsUsed).toBe(1);
    expect(opts.silent).toBe(true);
  });

  it('opens the coach on the third error on one customer (ricerca/00 passo 6)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const k = nextCustomer(host);
    let lastWrong = null;
    for (let n = 0; n < 3; n += 1) {
      lastWrong = wrongCardFor(host, k);
      tapServe(host, lastWrong, k.lane);
      settle(host);
      if (n < 2) expect(host.state.coach).toBeNull();
    }
    expect(host.coachKind).toBe('wrong');
    expect(host.state.coach).toEqual({
      kind: 'wrong',
      pick: lastWrong.item.english,
      word: k.item.english,
      it: k.item.italian,
    });
    expect(s.totalAttempts).toBe(3);
  });

  it('a customer who changed their mind gets the "change" coach, and the new phrase is introduced', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 3);
    game.reset(host, 0);

    const k = nextCustomer(host);
    const before = k.item;
    k.change = 0.01;
    until(host, () => k.changed === 1, 600);
    expect(k.changed).toBe(1);
    expect(k.item).not.toBe(before);
    expect(k.wasItem).toBe(before);
    expect(k.item.state).toBe('introduced');
    expect(host.items.includes(k.item)).toBe(true);
    // The tray follows the new request.
    expect(cardFor(host, k.item)).not.toBeNull();

    for (let n = 0; n < 3; n += 1) {
      until(host, () => wrongCardFor(host, k) !== null, 60);
      tapServe(host, wrongCardFor(host, k), k.lane);
      settle(host);
    }
    expect(host.coachKind).toBe('change');
    expect(host.state.coach.kind).toBe('change');
    expect(host.state.coach.it).toBe(k.item.italian);
  });

  it("the round's own customer never changes their mind, so the phrase is always asked", async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    for (const chapter of [3, 5]) {
      useChapter(host, game, chapter);
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        game.reset(host, beat);
        const k = nextCustomer(host);
        expect(k.item).toBe(host.anchor);
        expect(k.change).toBe(0);
      }
    }
  });

  it('an unserved customer reaches the till on the game clock, within the patience the sheet promises', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    // NUMERI: 11 px/s over ~300 px is 27 s of patience; the walk varies ±8 %
    // and the first customer arrives at 1.2 s.
    const frames = until(host, () => host.lost === 1, 60 * 40);
    expect(host.lost).toBe(1);
    expect(frames / 60).toBeGreaterThan(25);
    expect(frames / 60).toBeLessThan(36);
    expect(s.totalAttempts).toBe(0);
    expect(host.state.coach).toBeNull();
    expect(host.queue).toHaveLength(host.cfg.need - present(host).length);
  });

  it('three lost customers open the "lost" coach; closing it starts the round over', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const firstQueue = host.queue.slice();
    const lostItems = [];
    for (let frame = 0; frame < 3000 && !host.state.coach; frame += 1) {
      const k = present(host)[0];
      if (k && k.x < ENDX - 1) {
        lostItems.push(k.item);
        k.x = ENDX - 1;
      }
      game.update(host, STEP);
      game.draw(host, ctx);
    }

    expect(lostItems).toHaveLength(3);
    expect(host.lost).toBe(3);
    expect(host.coachKind).toBe('lost');
    expect(host.state.coach).toEqual({ kind: 'lost' });
    // A lost customer is not an attempt, and the same phrase comes back.
    expect(s.totalAttempts).toBe(0);
    expect(lostItems[0].state).toBe('introduced');
    for (const item of lostItems) expect(host.queue.includes(item)).toBe(true);
    expect(host.queue).toHaveLength(firstQueue.length);

    game.onCoachClose(host);
    expect(host.coachKind).toBeNull();
    expect(host.cust).toEqual([]);
    expect(host.cards).toEqual([]);
    expect(host.served).toBe(0);
    expect(host.lost).toBe(0);
    expect(host.state.step).toBe(0);
    expect(host.queue).toHaveLength(host.cfg.need);
    expect(host.queue[0]).toBe(host.anchor);
  });

  it('offers bilingual coach copy with the placeholders filled in', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    game.reset(host, 0);

    const coach = {
      kind: 'wrong',
      pick: 'Nice to meet you',
      word: 'Hello, how are you doing?',
      it: 'Ciao, come stai?',
    };
    for (const kind of ['wrong', 'change']) {
      const copies = ['it', 'en'].map((lang) => game.coachText(host, { ...coach, kind }, lang));
      for (const copy of copies) {
        for (const field of ['what', 'effect', 'rule', 'hint']) {
          expect(copy[field].length).toBeGreaterThan(0);
          expect(copy[field]).not.toContain('{');
        }
        expect(copy.effect).toContain(coach.pick);
        expect(copy.effect).toContain(coach.word);
        expect(copy.effect).toContain(coach.it);
      }
      expect(copies[0].what).not.toBe(copies[1].what);
    }

    for (const lang of ['it', 'en']) {
      const lost = game.coachText(host, { kind: 'lost' }, lang);
      for (const field of ['what', 'effect', 'rule', 'hint']) {
        expect(lost[field].length).toBeGreaterThan(0);
        expect(lost[field]).not.toContain('{');
      }
    }
    expect(game.coachText(host, { kind: 'lost' }, 'it').what).not.toBe(
      game.coachText(host, { kind: 'lost' }, 'en').what
    );
  });

  it('shows the round and the lesson on the done screen, in either language', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 4);
    game.reset(host, 2);
    host.served = host.cfg.need;

    const copyIt = game.doneView(host, 'it');
    const copyEn = game.doneView(host, 'en');
    expect(copyIt.title).toBe(`${host.cfg.need} / ${host.cfg.need}`);
    expect(copyEn.title).toBe(copyIt.title);
    expect(copyIt.eyebrow).toBe('Turno servito');
    expect(copyEn.eyebrow).toBe('Round served');
    expect(copyIt.subtitle).toBe(s.lessons[2].title.split(' / ')[0].trim());
    expect(copyEn.subtitle).toBe(s.lessons[2].title.split(' / ')[1].trim());
    expect(copyIt.subtitle).not.toBe(copyEn.subtitle);
  });

  it('every card on the tray is a real phrase of the current lesson, never invented', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);

    for (let chapter = 0; chapter < game.CH.length; chapter += 1) {
      useChapter(host, game, chapter);
      const lesson = s.lessons[Math.floor(chapter / 2) % s.lessons.length];
      const phrases = new Set(lesson.items.map((i) => i.english));
      for (let beat = 0; beat < host.BEATS.length; beat += 1) {
        game.reset(host, beat);
        expect(host.lesson).toBe(lesson);
        run(host, game, ctx, 2.5);
        expect(host.cards.length).toBeGreaterThan(0);
        for (const card of host.cards) {
          expect(lesson.items.includes(card.item)).toBe(true);
          expect(phrases.has(card.item.english)).toBe(true);
        }
        for (const k of present(host)) expect(lesson.items.includes(k.item)).toBe(true);
        // The customer's own phrase is always on the tray (TEST 3).
        for (const k of present(host)) expect(cardFor(host, k.item)).not.toBeNull();
      }
    }
  });

  /**
   * §15.4 wants a static-equivalent that looks deliberate, not a frozen one.
   * The customers are the game and cannot stop, so the register slows them
   * and the engine spawns no particles at all.
   */
  it('slows the customers and skips particles under prefers-reduced-motion', async () => {
    const collect = (host) => {
      const speeds = new Map();
      for (let frame = 0; frame < 60 * 12; frame += 1) {
        for (const k of host.cust) speeds.set(k.id, k.speed);
        game.update(host, STEP);
      }
      return [...speeds.values()];
    };

    const s = await session();
    const normal = makeHost(game, s, { reduceMotion: false });
    game.init(normal);
    useChapter(normal, game, 5);
    game.reset(normal, 0);
    const walk = normal.cfg.walk;
    const fast = collect(normal);

    const s2 = await session();
    const reduced = makeHost(game, s2, { reduceMotion: true });
    game.init(reduced);
    useChapter(reduced, game, 5);
    game.reset(reduced, 0);
    const slow = collect(reduced);

    expect(fast.length).toBeGreaterThanOrEqual(3);
    expect(slow.length).toBeGreaterThanOrEqual(3);
    for (const v of fast) expect(v).toBeGreaterThanOrEqual(walk * 0.92 - 1e-9);
    for (const v of slow) expect(v).toBeLessThanOrEqual(walk * 0.7 * 1.08 + 1e-9);
    expect(Math.max(...slow)).toBeLessThan(Math.min(...fast));

    game.reset(reduced, 0);
    playBeat(reduced, ctx);
    expect(reduced.finished).toBe(true);
    expect(reduced.parts).toHaveLength(0);
  });

  it('under prefers-reduced-motion the served walk-off, the shaken bubble and the hint glow hold still (§11.6)', async () => {
    const s = await session();
    const reduced = makeHost(game, s, { reduceMotion: true });
    game.init(reduced);
    game.reset(reduced, 0);
    const k = nextCustomer(reduced);

    // A rejected card still marks the bubble, but the mark does not jitter:
    // two frames with the same state draw the same rectangle.
    const rects = [];
    ctx.roundRect = (...args) => rects.push(args.join(','));
    tapServe(reduced, wrongCardFor(reduced, k), k.lane);
    settle(reduced);
    expect(k.wrong).toBe(1);
    expect(k.shake).toBeGreaterThan(0);
    const strokes = [];
    const rawStroke = ctx.stroke;
    ctx.stroke = () => strokes.push(`${ctx.strokeStyle}|${ctx.lineWidth}`);
    game.draw(reduced, ctx);
    const first = rects.slice();
    rects.length = 0;
    game.draw(reduced, ctx);
    expect(rects).toEqual(first);
    // The still refusal is the frame's one heavy stroke: amber, never red
    // (the cards' 3 px awning-red border is register colour, not feedback).
    const heavy = strokes.filter((v) => v.endsWith('|4'));
    expect(heavy.length).toBeGreaterThan(0);
    for (const v of heavy) expect(v).toBe('#FFB300|4');
    ctx.stroke = rawStroke;

    // The second-error glow is a steady halo, not a pulse.
    tapServe(reduced, wrongCardFor(reduced, k), k.lane);
    settle(reduced);
    expect(cardFor(reduced, k.item).glow).toBe(1);
    const blurs = [];
    Object.defineProperty(ctx, 'shadowBlur', {
      configurable: true,
      get: () => 0,
      set: (v) => {
        blurs.push(v);
      },
    });
    game.draw(reduced, ctx);
    const blursAtT0 = blurs.filter((v) => v > 0);
    blurs.length = 0;
    reduced.t += 0.3;
    game.draw(reduced, ctx);
    expect(blurs.filter((v) => v > 0)).toEqual(blursAtT0);
    expect(blursAtT0).toContain(16);

    // A served customer walks off at 0.7x too, so the room keeps one pace.
    tapServe(reduced, cardFor(reduced, k.item), k.lane);
    settle(reduced);
    expect(k.served).toBe(true);
    const x0 = k.x;
    game.update(reduced, STEP);
    expect(k.x - x0).toBeCloseTo(90 * 0.7 * STEP, 6);

    const s2 = await session();
    const normal = makeHost(game, s2, { reduceMotion: false });
    game.init(normal);
    game.reset(normal, 0);
    const k2 = nextCustomer(normal);
    tapServe(normal, cardFor(normal, k2.item), k2.lane);
    settle(normal);
    expect(k2.served).toBe(true);
    const x1 = k2.x;
    game.update(normal, STEP);
    expect(k2.x - x1).toBeCloseTo(90 * STEP, 6);
  });

  it('the keyboard plays the same game as the finger (§15.1, ricerca/33)', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 1);
    game.reset(host, 0);

    const k = nextCustomer(host);
    expect(host.cards.length).toBeGreaterThan(1);

    press(host, 'ArrowRight');
    expect(host.kbUsed).toBe(true);
    expect(host.sel).toBe(0);
    press(host, 'ArrowRight');
    expect(host.sel).toBe(1);
    press(host, 'ArrowLeft');
    expect(host.sel).toBe(0);
    press(host, '2');
    expect(host.sel).toBe(1);
    press(host, '1');
    expect(host.sel).toBe(0);

    press(host, 'ArrowDown');
    expect(host.klane).toBe(1);
    press(host, 'ArrowUp');
    expect(host.klane).toBe(0);
    while (host.klane !== k.lane) press(host, 'ArrowDown');

    // A wrong card by keyboard is refused exactly like a wrong card by finger.
    const wrong = wrongCardFor(host, k);
    press(host, String(host.cards.indexOf(wrong) + 1));
    expect(host.cards[host.sel]).toBe(wrong);
    press(host, ' ');
    expect(host.slide).not.toBeNull();
    settle(host);
    expect(k.wrong).toBe(1);
    expect(k.served).toBe(false);
    expect(s.totalAttempts).toBe(1);
    let call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(wrong.item.english);
    expect(call.expectedAnswer).toBe(k.item.english);

    // The right card by keyboard serves the customer.
    const right = cardFor(host, k.item);
    press(host, String(host.cards.indexOf(right) + 1));
    expect(host.cards[host.sel]).toBe(right);
    press(host, 'Enter');
    expect(host.slide).not.toBeNull();
    settle(host);
    expect(k.served).toBe(true);
    expect(k.item.state).toBe('cleared');
    expect(s.totalCorrect).toBe(1);
    call = analyticsService.recordResponse.mock.calls.at(-1)[0];
    expect(call.userAnswer).toBe(k.item.english);
    expect(call.expectedAnswer).toBe(k.item.english);
  });

  it('a keyboard-only bot finishes a four-card, four-counter round', async () => {
    const s = await session();
    const host = makeHost(game, s);
    game.init(host);
    useChapter(host, game, 4);
    game.reset(host, 1);
    expect(host.cfg.cards).toBe(4);
    expect(host.cfg.lanes).toBe(4);

    const { frames, served } = playBeatByKeyboard(host, ctx);
    expect(frames).toBeLessThan(8000);
    expect(host.finished).toBe(true);
    expect(host.state.done).toBe(true);
    expect(served).toHaveLength(host.cfg.need);
    for (const item of served) expect(item.state).toBe('cleared');
    expect(s.totalCorrect).toBe(host.cfg.need);
    expect(s.totalAttempts).toBe(host.cfg.need);
  });
});
