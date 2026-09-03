/**
 * KaioEngine — the shared runtime for level games.
 *
 * Port of `knowledge-aio-giochi/templates/kaio-engine.js` to an ES module with
 * the obligations the standalone templates deferred (LEGGIMI-INTEGRAZIONE §4.5):
 * `prefers-reduced-motion` (§11.6, §15.4), a loop that stops when the tab is
 * hidden (§13.4), teardown through an AbortSignal so no listener survives
 * `destroy()`, audio through GameAudioService rather than raw Web Audio
 * (§1.3), and no `localStorage` — the ledger persists through LevelSession.
 *
 * It contains no game design: canvas, loop, input, particles and the
 * chapter/beat spine only. A game supplies reset/update/draw; the host
 * supplies state, chrome and persistence.
 *
 * Game space is a fixed 420 x 910 logical viewport (a phone held upright); the
 * engine scales it to the device pixel ratio and maps every pointer coordinate
 * back into it, so games never see device pixels.
 */

import { gameAudioService } from '../services/GameAudioService.js';

const MAX_FRAME_DT = 0.048; // clamp so a stalled tab cannot teleport the world
const MAX_DPR = 2.5;
const SWIPE_THRESHOLD = 28; // ricerca/31 §31.4
const PULL_DOWN_PAUSE = 44;
const MAX_PARTICLES = 120; // ricerca/31 §31.9

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
}

function resolveCanvas(node) {
  if (!node) return null;
  if (typeof node.getContext === 'function') return node;
  if (typeof node.querySelector === 'function') {
    const inner = node.querySelector('canvas');
    if (inner && typeof inner.getContext === 'function') return inner;
  }
  return null;
}

function clampIndex(value, length) {
  const n = Number.isFinite(value) ? value : 0;
  return Math.max(0, Math.min(length - 1, n));
}

// ─── chapters and beats ──────────────────────────
// Eight chapters per level, five beats each (ricerca/03 §3.4). A beat is one
// lesson; the beat spine, not a score, is what a level's progress is made of.

export function useChapter(host, index) {
  const chapter = host.CH[index];
  host.BEATS = chapter.beats;
  host.TITLES = chapter.titles;
  return chapter;
}

export function goBeat(host, beat, chapterIndex) {
  const c = chapterIndex == null ? host.state.chapter || 0 : chapterIndex;
  if (c !== host.state.chapter) useChapter(host, c);
  // A game's reset() reads host.state.chapter to pick the beat's item, so the
  // state must already name the new chapter when reset() runs — otherwise the
  // first beat of every chapter is built for the previous one and its item is
  // never presented (§43.5). setState() then re-renders the chrome.
  host.state.chapter = c;
  host.state.beat = beat;
  host.reset(beat);
  host.setState({ beat, chapter: c, step: 0, done: false, coach: null, paused: false });
  if (typeof host.onBeatChange === 'function') host.onBeatChange(beat, c);
}

export function goChapter(host, index) {
  goBeat(host, 0, index);
}

export function next(host) {
  if (host.state.beat < host.BEATS.length - 1) {
    goBeat(host, host.state.beat + 1);
    return;
  }
  const c = (host.state.chapter || 0) + 1;
  goBeat(host, 0, c < host.CH.length ? c : 0);
}

// ─── audio (delegated to the service, §1.3) ──────

export function audio(host) {
  gameAudioService.unlock();
  gameAudioService.setMuted(Boolean(host.state.muted));
}

export function drone(host, options) {
  gameAudioService.startDrone(options);
}

export function snd(host, voice, opts) {
  if (host.state.muted) return;
  gameAudioService.play(voice, opts || {});
}

// ─── particles ───────────────────────────────────
// Under `prefers-reduced-motion` no particle is ever spawned: §15.4 wants a
// static-equivalent that looks deliberate, and a thinned-out spray does not.
// Games therefore never need to branch on the preference themselves.

export function burst(host, arr, x, y, n, colour, opt) {
  if (host.reduceMotion) return;
  const o = opt || {};
  for (let i = 0; i < n && arr.length < MAX_PARTICLES; i++) {
    const angle = (o.a0 || 0) + Math.random() * (o.spread || 6.283);
    const speed = (o.v0 || 60) + Math.random() * (o.v1 || 180);
    arr.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (o.up || 40),
      l: 0,
      m: 0.4 + Math.random() * 0.3,
      c: colour,
      r: 1.4 + Math.random() * (o.r || 2.2),
    });
  }
}

export function parts(arr, dt, gravity) {
  for (const p of arr) {
    p.l += dt;
    p.vy += (gravity || 520) * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= 0.98;
  }
  return arr.filter((p) => p.l < p.m);
}

export function drawParts(ctx, arr) {
  for (const p of arr) {
    ctx.globalAlpha = Math.max(0, 1 - p.l / p.m);
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 6.283);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

export function rr(ctx, x, y, w, h, radius) {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, radius);
  else ctx.rect(x, y, w, h);
}

export function shake(host, ctx, amount) {
  if (host.reduceMotion || amount <= 0) return;
  ctx.translate((Math.random() * 2 - 1) * 5 * amount, (Math.random() * 2 - 1) * 4 * amount);
}

// ─── loop ────────────────────────────────────────

function stopLoop(host) {
  if (!host.kRaf) return;
  cancelAnimationFrame(host.kRaf);
  host.kRaf = 0;
}

function frame(host, t) {
  const dt = Math.min(MAX_FRAME_DT, (t - host.kLast) / 1000);
  host.kLast = t;
  if (host.contextLost) return;
  try {
    const s = host.state;
    if (!s.paused && !s.done && !s.coach) {
      if (host.hitstop > 0) host.hitstop -= dt * 1000;
      else host.update(dt);
    }
    host.draw(host.ctx);
  } catch (err) {
    if (host.kErr) return;
    host.kErr = 1;
    console.error('KaioEngine frame failed:', err && err.message);
    stopLoop(host);
    if (typeof host.onEngineError === 'function') host.onEngineError(err);
  }
}

function startLoop(host) {
  if (host.kRaf) return;
  host.kLast = performance.now();
  const loop = (t) => {
    frame(host, t);
    host.kRaf = requestAnimationFrame(loop);
  };
  host.kRaf = requestAnimationFrame(loop);
}

function safeDraw(host) {
  try {
    host.draw(host.ctx);
  } catch (err) {
    console.error('KaioEngine first draw failed:', err && err.message);
    if (typeof host.onEngineError === 'function') host.onEngineError(err);
  }
}

/**
 * Doctrine §13.4: every animation timer pauses while the document is hidden.
 * rAF already stops in a backgrounded tab, but an Android WebView can keep a
 * partially visible page ticking — so the loop is stopped explicitly and
 * restarted on `visibilitychange`, which also resets `kLast` so the first frame
 * back does not carry a multi-minute delta.
 */
function bindVisibility(host, signal) {
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.visibilityState === 'hidden') stopLoop(host);
      else startLoop(host);
    },
    { signal }
  );
}

// ─── surface ─────────────────────────────────────

function bindResize(host, el, signal) {
  host.onResize = () => {
    const rect = el.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    el.width = Math.round(rect.width * dpr);
    el.height = Math.round(rect.height * dpr);
    host.sc = el.width / host.KW;
  };
  host.onResize();
  window.addEventListener('resize', host.onResize, { signal });
  if (typeof window.ResizeObserver === 'function') {
    host.ro = new ResizeObserver(host.onResize);
    host.ro.observe(el);
  }
}

/**
 * A 2D context can be lost on Android when the system reclaims GPU memory.
 * Doctrine §11.1: degrade, do not die — the frame is redrawn once it returns.
 */
function bindContextLoss(host, el, signal) {
  el.addEventListener(
    'contextlost',
    (e) => {
      e.preventDefault();
      host.contextLost = true;
    },
    { signal }
  );
  el.addEventListener(
    'contextrestored',
    () => {
      host.contextLost = false;
      host.ctx = el.getContext('2d');
      if (host.onResize) host.onResize();
      safeDraw(host);
    },
    { signal }
  );
}

// ─── input ───────────────────────────────────────

function bindPointer(host, el, opts, signal) {
  const toGame = (e) => {
    const rect = el.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * host.KW,
      y: ((e.clientY - rect.top) / rect.height) * host.KH,
      t: performance.now(),
    };
  };
  host.pos = toGame;

  el.addEventListener(
    'pointerdown',
    (e) => {
      if (typeof el.setPointerCapture === 'function') {
        try {
          el.setPointerCapture(e.pointerId);
        } catch (err) {
          // capture is best-effort; a rejected pointerId is not fatal
        }
      }
      gameAudioService.unlock();
      host.touch = e.pointerType !== 'mouse';
      const p = toGame(e);
      host.p0 = p;
      host.pts = [p];
      host.swiped = false;
      host.dragging = true;

      if (host.state.coach) {
        host.setState({ coach: null });
        if (typeof host.onCoachClose === 'function') host.onCoachClose();
        return;
      }
      if (host.state.done) {
        next(host);
        return;
      }
      if (opts.onDown) opts.onDown(p, e);
    },
    { signal }
  );

  el.addEventListener(
    'pointermove',
    (e) => {
      if (!host.dragging) return;
      const p = toGame(e);
      const prev = host.pts[host.pts.length - 1];
      host.pts.push(p);
      if (host.pts.length > 12) host.pts.shift();

      // A pull down from the very top edge is the pause gesture — the games
      // carry no on-canvas pause button, so this is the touch route to it.
      if (host.p0 && host.p0.y < 20 && p.y - host.p0.y > PULL_DOWN_PAUSE) {
        host.dragging = false;
        host.setState({ paused: true });
        return;
      }
      if (opts.onDrag && prev) opts.onDrag(prev, p);
      if (opts.onSwipe && !host.swiped && host.p0) {
        const dx = p.x - host.p0.x;
        const dy = p.y - host.p0.y;
        if (Math.max(Math.abs(dx), Math.abs(dy)) > SWIPE_THRESHOLD) {
          host.swiped = true;
          host.p0 = p;
          const horizontal = Math.abs(dx) > Math.abs(dy);
          opts.onSwipe(horizontal ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up');
        }
      }
    },
    { signal }
  );

  const release = () => {
    if (host.dragging && opts.onUp) opts.onUp(host.pts[host.pts.length - 1]);
    host.dragging = false;
    host.p0 = null;
    host.swiped = false;
  };
  window.addEventListener('pointerup', release, { signal });
  window.addEventListener('pointercancel', release, { signal });

  if (opts.onTap) {
    el.addEventListener(
      'click',
      (e) => {
        const s = host.state;
        if (s.paused || s.done || s.coach) return;
        opts.onTap(toGame(e));
      },
      { signal }
    );
  }
}

function bindKeyboard(host, opts, signal) {
  window.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        host.setState((s) => ({ paused: !s.paused }));
        return;
      }
      const s = host.state;
      if (s.paused || s.done) return;
      if (s.coach) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          host.setState({ coach: null });
          if (typeof host.onCoachClose === 'function') host.onCoachClose();
        }
        return;
      }
      if (opts.onKey) opts.onKey(e);
    },
    { signal }
  );
}

// ─── mount / unmount ─────────────────────────────

function mount(host, opts) {
  host.KW = opts.W;
  host.KH = opts.H;
  host.CH = opts.chapters;
  host.reduceMotion = prefersReducedMotion();

  const chapterIndex = clampIndex(host.state.chapter, host.CH.length);
  useChapter(host, chapterIndex);
  const beat = clampIndex(host.state.beat, host.BEATS.length);
  host.setState({ beat, chapter: chapterIndex });
  host.reset(beat);

  const el = resolveCanvas(host.cv && host.cv.current);
  if (!el) return;

  host.el = el;
  host.ctx = el.getContext('2d');
  host.hitstop = 0;
  host.touch = false;

  const abort = new AbortController();
  host._abort = abort;
  const signal = abort.signal;

  bindResize(host, el, signal);
  bindPointer(host, el, opts, signal);
  bindKeyboard(host, opts, signal);
  bindVisibility(host, signal);
  bindContextLoss(host, el, signal);

  startLoop(host);
  safeDraw(host);
}

/**
 * Mount the engine onto a host.
 *
 * @param {object} host - owns `cv.current` (canvas), `state`, `setState`,
 *   `reset(beat)`, `update(dt)`, `draw(ctx)`, and optionally `onCoachClose()`,
 *   `onBeatChange()` and `onEngineError(err)`.
 * @param {object} opts - { W, H, chapters, onTap, onDown, onDrag, onUp,
 *   onSwipe, onKey }
 */
export function init(host, opts) {
  try {
    mount(host, opts);
  } catch (err) {
    console.error('KaioEngine init failed:', err && err.message);
    if (typeof host.onEngineError === 'function') host.onEngineError(err);
  }
}

export function destroy(host) {
  stopLoop(host);
  if (host._abort) host._abort.abort();
  host._abort = null;
  if (host.ro) {
    host.ro.disconnect();
    host.ro = null;
  }
}

export const kaio = {
  init,
  destroy,
  useChapter,
  goBeat,
  goChapter,
  next,
  audio,
  drone,
  snd,
  burst,
  parts,
  drawParts,
  rr,
  shake,
  prefersReducedMotion,
};
