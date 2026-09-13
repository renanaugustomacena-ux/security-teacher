/* eslint-disable import/first */
import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * GameHost is DOM chrome, so most of it is exercised in the browser. What is
 * unit-tested here is the one piece of pedagogy it owns: closing the level
 * ledger exactly once, through `session.complete()`, the beat every item has
 * been cleared (DOCTRINE §46.5) — and telling the caller so the lessons are
 * marked complete. Before this hook existed a game could never complete its
 * level, however well it was played.
 */

const saved = [];
let storedRecord = null;

vi.mock('../js/services/StorageService.js', () => ({
  storageService: {
    save: vi.fn(async (store, data) => {
      saved.push({ store, data });
    }),
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
vi.mock('../js/PracticeHUD.js', () => ({
  practiceHUD: { onAnswerResult: vi.fn(), reset: vi.fn() },
}));
vi.mock('../js/services/TTSService.js', () => ({
  ttsService: { isSupported: false, speak: vi.fn(), speakAuto: vi.fn() },
}));

import { createLevelSession, LEARN_SURFACE } from '../js/games/LevelSession.js';
import { GameHost } from '../js/games/GameHost.js';

/** A container with no overlay or rail: `_renderChrome` returns early. */
function makeContainer() {
  return { innerHTML: '', querySelector: () => null };
}

const GAME = {
  meta: { id: 'test', surface: 'learn', level: 1, title: 'T', register: 'R1' },
  W: 420,
  H: 910,
  CH: [{ t: ['Uno', 'One'], titles: [['A', 'A']], beats: [{}] }],
  init() {},
  reset() {},
  update() {},
  draw() {},
};

async function session() {
  return createLevelSession({
    surface: LEARN_SURFACE,
    level: 1,
    mode: 'test',
    progressManager: { addXP: vi.fn() },
  });
}

function clearEverything(s) {
  for (const item of s.items) {
    item.introduce();
    item.attempt(item.english, { expected: item.english, silent: true });
    item.clear();
  }
}

describe('GameHost — closing the level ledger (§46.5)', () => {
  beforeEach(() => {
    saved.length = 0;
    storedRecord = null;
  });

  it('completes the level once, the beat every item is cleared', async () => {
    const s = await session();
    const onLevelComplete = vi.fn();
    const host = new GameHost({
      container: makeContainer(),
      game: GAME,
      session: s,
      onLevelComplete,
    });

    // A beat ends with items still uncovered: nothing happens.
    s.items[0].introduce();
    host.setState({ done: true });
    expect(onLevelComplete).not.toHaveBeenCalled();
    expect(s.completed).toBe(false);

    host.setState({ done: false });
    clearEverything(s);
    // Items are all cleared but the beat is still running: still nothing.
    host.setState({ step: 3 });
    expect(onLevelComplete).not.toHaveBeenCalled();

    host.setState({ done: true });
    expect(onLevelComplete).toHaveBeenCalledTimes(1);
    expect(onLevelComplete.mock.calls[0][0]).toMatchObject({ passed: true, missed: [] });
    expect(s.completed).toBe(true);
    expect(saved.at(-1).data.completed).toBe(true);

    // Later beats of a completed level never award it again.
    host.setState({ done: false });
    host.setState({ done: true });
    expect(onLevelComplete).toHaveBeenCalledTimes(1);
  });

  it('never re-awards a level restored as completed', async () => {
    const first = await session();
    storedRecord = {
      userId: 'game:learn:1',
      cleared: first.items.map((i) => i.key),
      attempted: [],
      completed: true,
      chapter: 7,
      beat: 4,
    };
    const s = await session();
    await s.restore();
    const onLevelComplete = vi.fn();
    const host = new GameHost({
      container: makeContainer(),
      game: GAME,
      session: s,
      onLevelComplete,
    });

    host.setState({ done: true });
    expect(onLevelComplete).not.toHaveBeenCalled();
  });

  it('a failing bookkeeping callback does not surface as a game crash', async () => {
    const s = await session();
    clearEverything(s);
    const host = new GameHost({
      container: makeContainer(),
      game: GAME,
      session: s,
      onLevelComplete: () => {
        throw new Error('progress store offline');
      },
    });
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => host.setState({ done: true })).not.toThrow();
    expect(s.completed).toBe(true);
    expect(errors).toHaveBeenCalled();
    errors.mockRestore();
  });

  it('shows the level-complete panel once, then the ordinary beat screen', async () => {
    const s = await session();
    clearEverything(s);
    const host = new GameHost({ container: makeContainer(), game: GAME, session: s });
    host.TITLES = GAME.CH[0].titles;
    host.CH = GAME.CH;

    host.setState({ done: true });
    const first = host._overlayHtml();
    expect(first).toContain('game-panel-level');
    expect(first).toContain('Livello completato');
    // ricerca/33 §33.5: no marks, stars or percentages on a completion screen.
    expect(first).not.toMatch(/%|★|game-mark/);

    host._levelShown = true;
    expect(host._overlayHtml()).not.toContain('game-panel-level');

    host.setState({ lang: 'en' });
    host._levelShown = false;
    expect(host._overlayHtml()).toContain('Level complete');
  });
});

/**
 * The templates were written against a React component whose instance fields
 * they used freely as game state (`self.t`, `self.parts`, `self.drag`, …).
 * GameHost is that object in the app, so any accessor or method it defines
 * with a name a game also assigns breaks the mount in strict mode — which the
 * headless harness (a plain object) can never notice. This mounts every
 * registered game on a real GameHost instead.
 */
describe('GameHost — every registered game runs on the real host object', () => {
  it('init/reset/update/draw succeed for each game in the registry', async () => {
    const { registeredKeys, loadGame } = await import('../js/games/registry.js');
    const { makeContext2D, installDocumentDouble } = await import('./helpers/game-conformance.js');
    const restore = installDocumentDouble();
    const keys = registeredKeys();
    expect(keys.length).toBeGreaterThan(0);

    try {
      for (const key of keys) {
        const [surface, level] = key.split(':');
        const game = await loadGame(surface, Number(level));
        expect(game, `${key} loads`).toBeTruthy();
        const s = await createLevelSession({
          surface,
          level: Number(level),
          mode: 'test',
          progressManager: { addXP: vi.fn() },
        });
        const host = new GameHost({ container: makeContainer(), game, session: s });
        // What engine.init() would install before the first reset.
        host.CH = game.CH;
        host.BEATS = game.CH[0].beats;
        host.TITLES = game.CH[0].titles;
        host.sc = 1;
        host.hitstop = 0;
        host.reduceMotion = false;

        const ctx = makeContext2D();
        expect(() => {
          game.init(host);
          game.reset(host, 0);
          for (let f = 0; f < 30; f += 1) {
            game.update(host, 1 / 60);
            game.draw(host, ctx);
          }
        }, `${key} runs on GameHost`).not.toThrow();
        expect(host.strings.pause.length, `${key} keeps the chrome strings`).toBeGreaterThan(0);
      }
    } finally {
      restore();
    }
  });
});

/**
 * Band-4 games are terminals (ricerca/22): DOM, no canvas, no frame loop. The
 * host gives them a root element and an AbortSignal, keeps the chapter/beat
 * spine and the chrome, and re-renders them after every setState.
 */
describe('GameHost — DOM games', () => {
  function domContainer() {
    const root = { innerHTML: '', focus() {}, addEventListener() {} };
    const overlay = { innerHTML: '', classList: { toggle() {} } };
    const rail = { innerHTML: '' };
    return {
      root,
      container: {
        innerHTML: '',
        addEventListener() {},
        removeEventListener() {},
        querySelector(sel) {
          if (sel === '[data-role="dom"]') return root;
          if (sel === '[data-role="overlay"]') return overlay;
          if (sel === '[data-role="rail"]') return rail;
          return null;
        },
      },
    };
  }

  const DOM_GAME = {
    kind: 'dom',
    meta: { id: 'term', surface: 'nodejs', level: 18, title: 'tsc', register: 'terminal' },
    CH: [
      {
        t: ['Uno', 'One'],
        titles: [
          ['A', 'A'],
          ['B', 'B'],
        ],
        beats: [{ id: '0.0' }, { id: '0.1' }],
      },
      { t: ['Due', 'Two'], titles: [['C', 'C']], beats: [{ id: '1.0' }] },
    ],
    calls: [],
    init(host) {
      this.calls.push(['init', Boolean(host.root), host.signal instanceof AbortSignal]);
    },
    reset(host, beat) {
      this.calls.push(['reset', host.state.chapter, beat, host.BEATS[beat].id]);
    },
    render(host) {
      this.calls.push(['render', host.state.beat, host.state.paused]);
    },
    update() {},
    draw() {},
  };

  it('mounts a root instead of a canvas, installs the spine and renders', async () => {
    const s = await session();
    const { container } = domContainer();
    DOM_GAME.calls.length = 0;
    const host = new GameHost({ container, game: DOM_GAME, session: s });
    await host.start();

    expect(container.innerHTML).toContain('data-role="dom"');
    expect(container.innerHTML).not.toContain('<canvas');
    expect(DOM_GAME.calls[0]).toEqual(['init', true, true]);
    expect(DOM_GAME.calls[1]).toEqual(['reset', 0, 0, '0.0']);
    expect(DOM_GAME.calls[2]).toEqual(['render', 0, false]);

    host.setState({ paused: true });
    expect(DOM_GAME.calls.at(-1)).toEqual(['render', 0, true]);

    // The engine's beat spine works without a canvas.
    const { next } = await import('../js/games/KaioEngine.js');
    host.setState({ paused: false });
    next(host);
    next(host);
    expect(DOM_GAME.calls.filter((c) => c[0] === 'reset').map((c) => c[3])).toEqual([
      '0.0',
      '0.1',
      '1.0',
    ]);
    expect(host.state).toMatchObject({ chapter: 1, beat: 0 });

    const { signal } = host;
    host.destroy();
    expect(signal.aborted).toBe(true);
    expect(container.innerHTML).toBe('');
  });
});
