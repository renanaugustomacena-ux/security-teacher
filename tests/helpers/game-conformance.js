/**
 * Headless conformance harness for level games (SDK design §8).
 *
 * Every game must pass this before it is registered. It exists so that game
 * number 200 can be added without hand-review: it drives the real module
 * lifecycle with a scripted bot and asserts the things that are true of every
 * game regardless of its mechanics — it does not draw, it does not crash, it
 * reaches full item coverage, and it honours `prefers-reduced-motion`.
 *
 * The canvas double records nothing about pixels on purpose. What matters is
 * that `draw()` completes: a game that throws mid-frame is caught by the
 * engine's error boundary in production and silently degrades, so the crash has
 * to surface here instead.
 */

const CANVAS_METHODS = [
  'beginPath',
  'closePath',
  'arc',
  'fill',
  'stroke',
  'moveTo',
  'lineTo',
  'rect',
  'roundRect',
  'fillRect',
  'strokeRect',
  'clearRect',
  'save',
  'restore',
  'translate',
  'scale',
  'rotate',
  'setTransform',
  'fillText',
  'strokeText',
  'drawImage',
  'clip',
];

function makeGradient() {
  return { addColorStop() {} };
}

export function makeContext2D() {
  const ctx = {
    canvas: { width: 420, height: 910 },
    font: '',
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    globalAlpha: 1,
    globalCompositeOperation: 'source-over',
    shadowColor: '',
    shadowBlur: 0,
    textAlign: 'left',
    textBaseline: 'alphabetic',
    measureText(text) {
      // Deterministic and roughly proportional, so layout code that branches
      // on width takes both branches across a run.
      return { width: String(text).length * 8 };
    },
    createLinearGradient: makeGradient,
    createRadialGradient: makeGradient,
    createPattern: () => ({}),
  };
  for (const name of CANVAS_METHODS) ctx[name] = () => {};
  return ctx;
}

/** Minimal `document` so a game may build offscreen canvases for measuring. */
export function installDocumentDouble() {
  const previous = globalThis.document;
  globalThis.document = {
    createElement(tag) {
      if (tag !== 'canvas') return { style: {} };
      return { width: 0, height: 0, getContext: () => makeContext2D() };
    },
  };
  return () => {
    globalThis.document = previous;
  };
}

/**
 * A host with the same contract GameHost offers a game, minus the DOM chrome:
 * state, setState, props, the session, and the chapter/beat spine the engine
 * would otherwise install.
 */
export function makeHost(game, session, { reduceMotion = false, props = {}, muted = true } = {}) {
  const host = {
    props,
    session,
    reduceMotion,
    sc: 1,
    hitstop: 0,
    state: {
      beat: 0,
      chapter: 0,
      lang: 'it',
      paused: false,
      coach: null,
      done: false,
      muted,
      step: 0,
    },
    CH: game.CH,
    setState(patch) {
      Object.assign(this.state, typeof patch === 'function' ? patch(this.state) : patch);
    },
    reset(beat) {
      game.reset(this, beat);
    },
  };
  host.BEATS = game.CH[0].beats;
  host.TITLES = game.CH[0].titles;
  return host;
}

export function useChapter(host, game, chapterIndex) {
  host.state.chapter = chapterIndex;
  host.BEATS = game.CH[chapterIndex].beats;
  host.TITLES = game.CH[chapterIndex].titles;
}

/** Advance the simulation by `seconds` in fixed 1/60 s steps, drawing each frame. */
export function run(host, game, ctx, seconds) {
  const step = 1 / 60;
  for (let t = 0; t < seconds; t += step) {
    if (host.state.paused || host.state.done || host.state.coach) return;
    game.update(host, step);
    game.draw(host, ctx);
  }
}

/**
 * Structural conformance: the lifecycle a GameHost will call must exist, and
 * the metadata the registry and the chrome read must be present.
 */
export function assertShape(game, expect) {
  for (const fn of ['init', 'reset', 'update', 'draw']) {
    expect(typeof game[fn], `game.${fn} must be a function`).toBe('function');
  }
  expect(typeof game.W).toBe('number');
  expect(typeof game.H).toBe('number');
  expect(Array.isArray(game.CH)).toBe(true);
  expect(game.CH.length).toBeGreaterThan(0);

  for (const chapter of game.CH) {
    expect(Array.isArray(chapter.t)).toBe(true);
    // §14.7: every user-visible string is bilingual, Italian first.
    expect(chapter.t).toHaveLength(2);
    expect(chapter.t[0].length).toBeGreaterThan(0);
    expect(chapter.t[1].length).toBeGreaterThan(0);
    expect(Array.isArray(chapter.beats)).toBe(true);
    for (const title of chapter.titles) expect(title).toHaveLength(2);
  }

  const meta = game.meta || {};
  for (const field of ['id', 'surface', 'title', 'register']) {
    expect(Boolean(meta[field]), `meta.${field} must be set`).toBe(true);
  }
  expect(typeof meta.level).toBe('number');
}
