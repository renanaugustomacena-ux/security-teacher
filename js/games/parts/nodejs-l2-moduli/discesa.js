/**
 * LA DISCESA — chapters 1-3 of «La discesa, il magazzino, la soglia».
 * Endless runner (ricerca/12, Temple Run) ported from
 * knowledge-aio-giochi/templates/nodejs-l3-discesa and redrawn in register
 * R7 · Orizzonte al tramonto (ricerca/42 §42.4).
 *
 * The runner rides a mine cart down towards the horizon holding a crate whose
 * label is a meaning in Italian. Every 1.1-2.0 s a row of identical tunnel
 * mouths grows out of the horizon; over each mouth a sign carries an English
 * term of the same lesson. Steering into the mouth whose sign names the crate
 * is the graded pick; steering anywhere else ends against the rock and the
 * descent restarts from the first crate (the template's «perdi se»).
 *
 * Register: sky in bands orange → pink → violet → night blue, striped sun,
 * grey road with white/red kerbs converging, black silhouettes. Everything
 * scales towards the camera; nothing moves sideways but the cart. Digits in
 * an italic sans with an outline.
 */

import * as engine from '../../KaioEngine.js';
import { distractors, fillers, labelOf, meaningOf } from '../../LevelBeats.js';
import { W, H, shuffle, grade, openCoach, win, say, wrapLines, fitFont } from './common.js';

/** The runner's line, and the horizon the road converges to. */
export const RY = 0.72;
export const HOR = Math.round(H * 0.36);
/** Visibility in seconds of running: the mother constant (ricerca/12 §12.5). */
export const VIS = 2.6;
/** Ricerca/12: 90 ms of hit-stop on the impact, 700 ms to restart. */
const HITSTOP = 90;
const DEAD_S = 0.75;

export const PAL = {
  orange: '#FFB347',
  pink: '#FF6B9D',
  violet: '#6A3DA6',
  night: '#1B1464',
  sun: '#FFE066',
  road: '#4A4A4A',
  kerb: '#F2F2F2',
  kerbRed: '#E63946',
  ink: '#0D0D1A',
};

const SIGN = (s) => `italic 700 ${s}px "Raleway","Inter",system-ui,sans-serif`;
const DIGIT = (s) => `italic 800 ${s}px "Raleway","Inter",system-ui,sans-serif`;
const LABEL = (s) => `700 ${s}px "Inter","Raleway",system-ui,sans-serif`;

/* Beat: packs = crates in rotation (the term first, then real neighbours of
   the lesson), mouths per fork, gap in seconds between forks, v px/s, steps
   forks to pass, walled = the wrong mouths are bricked up (onboarding). The
   template's `names` list becomes `packs`, its count. */
const B = (o) => ({
  packs: 1,
  mouths: 3,
  gap: 1.6,
  v: 190,
  steps: 5,
  walled: false,
  mech: 'discesa',
  ...o,
});

export const CH = [
  {
    t: ['Dove si cerca', 'Where it looks'],
    titles: [
      ['Una via sola', 'One way only'],
      ['La cartella di fianco', 'The folder beside'],
      ['Due di fianco', 'Two beside'],
      ['Senza fermarti', 'No pause'],
      ['Il ritmo', 'The rhythm'],
    ],
    beats: [
      B({ packs: 2, mouths: 2, gap: 2.0, v: 165, steps: 4, walled: true }),
      B({ packs: 2, mouths: 2, gap: 1.8, v: 175, steps: 5, walled: true }),
      B({ packs: 3, mouths: 3, gap: 1.7, v: 185, steps: 5 }),
      B({ packs: 4, mouths: 3, gap: 1.2, v: 215, steps: 7 }),
      B({ packs: 3, mouths: 3, gap: 1.6, v: 190, steps: 6 }),
    ],
  },
  {
    t: ['Il nome nudo', 'The bare name'],
    titles: [
      ['Sale express', 'express appears'],
      ['Non è di fianco', 'Not beside'],
      ['Si risale', 'You climb'],
      ['Nudi e relativi', 'Bare and relative'],
      ['Adesso lo sai', 'Now you know'],
    ],
    beats: [
      B({ packs: 2, mouths: 3, gap: 1.9, v: 170, steps: 4 }),
      B({ packs: 3, mouths: 3, gap: 1.7, v: 185, steps: 5 }),
      B({ packs: 4, mouths: 3, gap: 1.6, v: 195, steps: 5 }),
      B({ packs: 5, mouths: 3, gap: 1.15, v: 225, steps: 7 }),
      B({ packs: 4, mouths: 3, gap: 1.55, v: 200, steps: 6 }),
    ],
  },
  {
    t: ['Su di un piano', 'One floor up'],
    titles: [
      ['Il pozzo', 'The shaft'],
      ['Due punti', 'Two dots'],
      ['Piano sopra, piano sotto', 'Up and down'],
      ['Tutti i casi', 'Every case'],
      ['Tutta la miniera', 'The whole mine'],
    ],
    beats: [
      B({ packs: 2, mouths: 3, gap: 1.9, v: 170, steps: 4 }),
      B({ packs: 3, mouths: 3, gap: 1.7, v: 185, steps: 5 }),
      B({ packs: 3, mouths: 3, gap: 1.6, v: 195, steps: 6 }),
      B({ packs: 6, mouths: 3, gap: 1.1, v: 230, steps: 8 }),
      B({ packs: 5, mouths: 3, gap: 1.5, v: 200, steps: 6 }),
    ],
  },
];

/** Centre of mouth `i` of `m` at the runner's line. */
export function laneX(i, m) {
  return (W * (i + 0.5)) / m;
}

// ─── the descent ─────────────────────────────────

function setPack(host, i) {
  host.pi = i;
  host.pack = host.packs[i % host.packs.length];
  // The Italian label on the crate is the presentation (mastery 0 → 1).
  host.pack.introduce();
}

export function reset(host, beat, cfg) {
  host.needed = cfg.steps;
  host.packs = [host.item].concat(fillers(host.session, host.item, cfg.packs - 1));
  host.s = 0;
  // Reduced motion: the whole descent runs at 0.7× (§15.4); the forks are
  // spaced in seconds of running, so the reading time stays 2.6 s.
  host.v0 = cfg.v * host.motion;
  host.v = host.v0;
  host.lane = Math.min(1, cfg.mouths - 1);
  host.laneX = host.lane;
  host.tilt = 0;
  host.forks = [];
  host.hitstop = 0;
  host.shake = 0;
  host.dead = 0;
  host.deadFork = null;
  host.wrongs = new Map();
  host.aided = new Set();
  host.nextS = host.v * VIS * 0.9;
  host.step = 0;
  setPack(host, 0);
}

/**
 * A fork: `m` identical mouths in a random order, the crate's own term on one
 * sign and real terms of the same lesson on the others (ricerca/35 §35.3.3).
 * A crate the runner has already crashed on twice is aided: its mouth is lit.
 */
function spawnFork(host) {
  const c = host.cfg;
  const pack = host.pack;
  const order = shuffle([pack].concat(distractors(host.session, pack, c.mouths - 1)));
  const idx = order.indexOf(pack);
  const walled = order.map((o, i) => Boolean(c.walled) && i !== idx && Math.random() < 0.9);
  host.forks.push({
    s: host.nextS,
    order,
    idx,
    walled,
    pack,
    done: false,
    hint: host.aided.has(pack),
  });
  host.nextS += host.v * c.gap;
}

/* After the rock: back up 1.6 s, clear the road, the first crate again. The
   template kept the forks already spawned for other crates and the runner
   met them holding the wrong crate; here the road is rebuilt for the crate
   in hand (deviation 1 in the level header). */
function restart(host) {
  host.s = Math.max(0, host.s - host.v * 1.6);
  host.forks = [];
  host.deadFork = null;
  host.nextS = host.s + host.v * VIS * 0.9;
  host.step = 0;
  host.setState({ step: 0 });
  setPack(host, 0);
}

function cross(host, f) {
  const lane = Math.max(0, Math.min(f.order.length - 1, Math.round(host.laneX)));
  const late = Math.abs(host.laneX - host.lane) > 0.35;
  const picked = f.order[lane];
  // The sign over the mouth entered is the graded response (§46.1, §46.2).
  const ok = grade(host, f.pack, picked, host.aided.has(f.pack)) && !f.walled[lane];
  const py = H * RY;
  if (ok) {
    engine.snd(host, 'whoosh');
    if (late) engine.snd(host, 'tone', { from: 220, to: 120, v: 0.1 });
    engine.burst(host, host.parts, W * 0.5, py + 12, 10, PAL.kerb, { up: 60, v0: 20, v1: 120 });
    host.step++;
    host.setState({ step: host.step });
    f.pack.clear();
    say(host, labelOf(f.pack));
    setPack(host, host.pi + 1);
    if (host.step >= host.needed) {
      engine.snd(host, 'chime');
      win(host);
    }
    return;
  }
  // The rock: hit-stop, shake, dust, the descent restarts (never red).
  engine.snd(host, 'crash');
  host.hitstop = HITSTOP;
  host.shake = 1;
  host.dead = DEAD_S;
  host.deadFork = f;
  engine.burst(host, host.parts, laneX(lane, f.order.length), py, 22, PAL.road, {
    up: 90,
    v0: 40,
    v1: 220,
    r: 2,
  });
  const n = (host.wrongs.get(f.pack) || 0) + 1;
  host.wrongs.set(f.pack, n);
  // 2nd on the same crate: from now its mouth is lit (aided). 3rd: the coach.
  if (n >= 2) host.aided.add(f.pack);
  if (n >= 3) {
    openCoach(host, 'crash', picked, f.pack);
    host.wrongs.set(f.pack, 0);
  }
}

export function update(host, dt) {
  const m = host.motion;
  if (host.shake > 0) host.shake -= dt * 3;
  host.parts = engine.parts(host.parts, dt, 420);
  if (host.finished) return;
  if (host.dead > 0) {
    host.dead -= dt;
    if (host.dead <= 0) restart(host);
    return;
  }
  // +7% every 15 s, capped at 2.1× (ricerca/12 §12.5).
  host.v = Math.min(host.v0 * 2.1, host.v * 1.07 ** (dt / 15));
  host.s += host.v * dt;
  host.laneX += (host.lane - host.laneX) * Math.min(1, (dt * m) / 0.14);
  host.tilt *= Math.max(0, 1 - dt * 5);
  if (!host.forks.length || host.nextS - host.s < host.v * VIS * 1.3) spawnFork(host);
  for (const f of host.forks) {
    if (f.done || f.s > host.s) continue;
    f.done = true;
    cross(host, f);
    if (host.dead > 0 || host.finished) break;
  }
  host.forks = host.forks.filter((f) => f === host.deadFork || f.s > host.s - host.v * 0.6);
}

// ─── input: tap a mouth, swipe, arrows or digits ─

function setLane(host, l) {
  if (l === host.lane || !host.cfg) return;
  const m = host.cfg.mouths;
  if (l < 0 || l >= m) return;
  host.lane = l;
  host.tilt = l - host.laneX > 0 ? 1 : -1;
  engine.snd(host, 'click', { hz: 1200, v: 0.1 });
}

function want(host, d) {
  setLane(host, Math.max(0, Math.min(host.cfg.mouths - 1, host.lane + d)));
}

/* The tap zones follow the mouths drawn (W/m each), not fixed thirds. */
export function tap(host, p) {
  if (host.finished) return;
  setLane(host, Math.floor(p.x / (W / host.cfg.mouths)));
}

export function swipe(host, dir) {
  if (host.finished) return;
  if (dir === 'left') want(host, -1);
  else if (dir === 'right') want(host, 1);
}

export function key(host, e) {
  if (host.finished) return;
  const k = e.key;
  if (k === 'ArrowLeft' || k === 'a') {
    want(host, -1);
    e.preventDefault();
  } else if (k === 'ArrowRight' || k === 'd') {
    want(host, 1);
    e.preventDefault();
  } else if (/^[1-3]$/.test(k)) {
    setLane(host, parseInt(k, 10) - 1);
  }
}

// ─── drawing (R7) ────────────────────────────────

/** 0 at the horizon, 1 at the runner's line, >1 behind the cart. */
function zOf(host, s) {
  return 1 - (s - host.s) / (host.v * VIS);
}

function yOf(z) {
  return HOR + (H * RY - HOR) * z * z;
}

function spread(z, m) {
  return (W / m) * (0.06 + 0.94 * z * z);
}

function roadHalf(z) {
  return 8 + (W / 2 + 30 - 8) * z * z;
}

function drawSky(x) {
  const bands = [PAL.night, PAL.violet, PAL.pink, PAL.orange];
  const bh = HOR / bands.length;
  bands.forEach((col, i) => {
    x.fillStyle = col;
    x.fillRect(0, i * bh, W, bh + 1);
  });
  // The striped sun of the register, sinking behind the horizon.
  const cx = W * 0.68;
  const r = 64;
  x.fillStyle = PAL.sun;
  x.beginPath();
  x.arc(cx, HOR, r, Math.PI, 0);
  x.closePath();
  x.fill();
  x.fillStyle = PAL.pink;
  for (let k = 0; k < 5; k++) x.fillRect(cx - r, HOR - 6 - k * 10, r * 2, 2 + k * 0.8);
  // Silhouettes: the mine headframe and a row of pines.
  x.fillStyle = PAL.ink;
  x.beginPath();
  x.moveTo(60, HOR);
  x.lineTo(78, HOR - 70);
  x.lineTo(96, HOR);
  x.closePath();
  x.fill();
  x.fillRect(76, HOR - 78, 4, 30);
  x.beginPath();
  x.arc(84, HOR - 66, 9, 0, 6.283);
  x.fill();
  for (let k = 0; k < 9; k++) {
    const px = 130 + k * 34 + (k % 2) * 9;
    const ph = 14 + (k % 3) * 7;
    x.beginPath();
    x.moveTo(px - 8, HOR);
    x.lineTo(px, HOR - ph);
    x.lineTo(px + 8, HOR);
    x.closePath();
    x.fill();
  }
}

function drawRoad(host, x) {
  x.fillStyle = PAL.night;
  x.fillRect(0, HOR, W, H - HOR);
  x.fillStyle = PAL.road;
  x.beginPath();
  x.moveTo(W / 2 - roadHalf(0), HOR);
  x.lineTo(W / 2 + roadHalf(0), HOR);
  x.lineTo(W / 2 + roadHalf(1.35), H);
  x.lineTo(W / 2 - roadHalf(1.35), H);
  x.closePath();
  x.fill();
  // Kerb bands white/red scrolling towards the camera: a band is 0.42 s of
  // road, indexed in world distance so it flows as the cart runs.
  const beam = host.v * 0.42;
  const step = 0.03;
  for (let z = 0; z < 1.35; z += step) {
    const d = host.s + (1 - z) * host.v * VIS;
    const band = Math.floor(d / beam) % 2 === 0;
    const y0 = yOf(z);
    const y1 = yOf(z + step) + 1;
    const h0 = roadHalf(z);
    const h1 = roadHalf(z + step);
    const kw0 = 3 + 14 * z * z;
    const kw1 = 3 + 14 * (z + step) * (z + step);
    x.fillStyle = band ? PAL.kerb : PAL.kerbRed;
    for (const side of [-1, 1]) {
      x.beginPath();
      x.moveTo(W / 2 + side * h0, y0);
      x.lineTo(W / 2 + side * (h0 + kw0), y0);
      x.lineTo(W / 2 + side * (h1 + kw1), y1);
      x.lineTo(W / 2 + side * h1, y1);
      x.closePath();
      x.fill();
    }
    if (band) {
      x.fillStyle = PAL.kerb;
      x.fillRect(W / 2 - kw0 * 0.15 - 0.5, y0, kw0 * 0.3 + 1, y1 - y0);
    }
  }
}

function drawSign(x, cx, y, text, z) {
  const fs = Math.max(8, Math.round(15 * (0.35 + 0.85 * z)));
  const maxW = 150 * (0.3 + 0.7 * z);
  fitFont(x, text, maxW, fs, 8, SIGN);
  const tw = Math.min(maxW, x.measureText(text).width) + 12 * z + 6;
  const th = fs + 8;
  x.fillStyle = PAL.ink;
  engine.rr(x, cx - tw / 2, y - th, tw, th, 3);
  x.fill();
  x.fillRect(cx - 1.5, y, 3, 10 + 24 * z);
  x.fillStyle = PAL.kerb;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(text, cx, y - th / 2);
}

function drawFork(host, x, f) {
  const z = zOf(host, f.s);
  if (z < 0 || z > 1.15) return;
  const m = f.order.length;
  const y = yOf(Math.min(1, z));
  const sp = spread(Math.min(1, z), m);
  const aw = sp * 0.8;
  const ah = Math.min(150, aw * 1.05);
  const lit = f === host.deadFork ? f.idx : f.hint ? f.idx : -1;
  // The crossbeam over the road.
  x.fillStyle = PAL.ink;
  x.fillRect(
    W / 2 - roadHalf(Math.min(1, z)) - 6,
    y - ah - 4 * z,
    roadHalf(Math.min(1, z)) * 2 + 12,
    4 + 6 * z
  );
  for (let i = 0; i < m; i++) {
    const cx = W / 2 + (i - (m - 1) / 2) * sp;
    // The mouth: same silhouette, same colours for all (TEST 1).
    x.fillStyle = PAL.ink;
    x.beginPath();
    x.moveTo(cx - aw / 2, y);
    x.lineTo(cx - aw / 2, y - ah * 0.55);
    x.arc(cx, y - ah * 0.55, aw / 2, Math.PI, 0);
    x.lineTo(cx + aw / 2, y);
    x.closePath();
    x.fill();
    const iw = aw * 0.76;
    x.fillStyle = f.walled[i] ? PAL.road : PAL.violet;
    x.beginPath();
    x.moveTo(cx - iw / 2, y);
    x.lineTo(cx - iw / 2, y - ah * 0.55);
    x.arc(cx, y - ah * 0.55, iw / 2, Math.PI, 0);
    x.lineTo(cx + iw / 2, y);
    x.closePath();
    x.fill();
    if (f.walled[i]) {
      x.strokeStyle = PAL.ink;
      x.lineWidth = Math.max(1, 2 * z);
      for (let b = 1; b < 5; b++) {
        x.beginPath();
        x.moveTo(cx - iw / 2, y - (ah * 0.75 * b) / 5);
        x.lineTo(cx + iw / 2, y - (ah * 0.75 * b) / 5);
        x.stroke();
      }
    }
    if (i === lit) {
      // The aid: the right mouth glows sun-yellow, a steady halo.
      x.strokeStyle = PAL.sun;
      x.lineWidth = 3;
      x.shadowColor = PAL.sun;
      x.shadowBlur = host.reduceMotion ? 12 : 12 + 4 * Math.sin(host.t * 6);
      x.stroke();
      x.shadowBlur = 0;
    }
    drawSign(x, cx, y - ah - 6 - 30 * z, labelOf(f.order[i]), Math.min(1, z));
  }
}

function drawRunner(host, x) {
  const m = host.cfg.mouths;
  const px = W / 2 + (host.laneX - (m - 1) / 2) * (W / m);
  const py = H * RY;
  const bob = host.reduceMotion ? 0 : Math.sin(host.s / 26) * 1.5;
  x.save();
  x.translate(px, py + bob);
  x.rotate(host.tilt * 0.16);
  x.fillStyle = 'rgba(0,0,0,.35)';
  x.save();
  x.translate(0, 22);
  x.scale(1, 0.24);
  x.beginPath();
  x.arc(0, 0, 34, 0, 6.283);
  x.fill();
  x.restore();
  // The cart from behind: grey body, white rim, two black wheels.
  x.fillStyle = PAL.ink;
  x.beginPath();
  x.arc(-22, 16, 9, 0, 6.283);
  x.arc(22, 16, 9, 0, 6.283);
  x.fill();
  x.fillStyle = PAL.road;
  x.beginPath();
  x.moveTo(-30, -6);
  x.lineTo(30, -6);
  x.lineTo(24, 14);
  x.lineTo(-24, 14);
  x.closePath();
  x.fill();
  x.fillStyle = PAL.kerb;
  x.fillRect(-30, -9, 60, 4);
  // The kid: red jacket, orange face, yellow helmet with its lamp.
  x.fillStyle = PAL.kerbRed;
  engine.rr(x, -13, -34, 26, 28, 6);
  x.fill();
  x.fillStyle = PAL.orange;
  engine.rr(x, -9, -52, 18, 18, 6);
  x.fill();
  x.fillStyle = PAL.sun;
  engine.rr(x, -11, -60, 22, 11, 5);
  x.fill();
  x.fillStyle = PAL.kerb;
  x.beginPath();
  x.arc(0, -55, 3, 0, 6.283);
  x.fill();
  // The crate held up: the meaning in Italian on a white label.
  x.font = LABEL(11);
  const ls = wrapLines(x, meaningOf(host.pack, 'it'), 118, 2);
  const lw = Math.max(...ls.map((l) => x.measureText(l).width)) + 16;
  const lh = ls.length * 14 + 10;
  x.fillStyle = PAL.ink;
  engine.rr(x, -lw / 2 - 4, -66 - lh - 4, lw + 8, lh + 8, 5);
  x.fill();
  x.fillStyle = PAL.kerb;
  engine.rr(x, -lw / 2, -66 - lh, lw, lh, 3);
  x.fill();
  x.fillStyle = PAL.ink;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  ls.forEach((l, i) => x.fillText(l, 0, -66 - lh + 12 + i * 14));
  x.restore();
}

function drawCount(host, x) {
  const text = `${host.step}/${host.needed}`;
  x.font = DIGIT(34);
  x.textAlign = 'left';
  x.textBaseline = 'top';
  x.lineWidth = 5;
  x.strokeStyle = PAL.ink;
  x.strokeText(text, 16, 14);
  x.fillStyle = PAL.sun;
  x.fillText(text, 16, 14);
}

export function draw(host, x) {
  x.setTransform(host.sc, 0, 0, host.sc, 0, 0);
  x.clearRect(0, 0, W, H);
  x.save();
  engine.shake(host, x, host.shake);
  drawSky(x);
  drawRoad(host, x);
  const forks = host.forks.slice().sort((a, b) => b.s - a.s);
  for (const f of forks) drawFork(host, x, f);
  drawRunner(host, x);
  engine.drawParts(x, host.parts);
  // Speed lines past the cap of comfort: decorative, frozen under reduced motion.
  if (!host.reduceMotion && host.v > host.v0 * 1.25) {
    x.globalAlpha = Math.min(0.5, (host.v / host.v0 - 1.25) * 0.7);
    x.strokeStyle = PAL.kerb;
    x.lineWidth = 1;
    for (let i = 0; i < 9; i++) {
      const lx = (i % 2 ? 18 : W - 18) + Math.random() * 8;
      const ly = (host.s * 3 + i * 180) % H;
      x.beginPath();
      x.moveTo(lx, ly);
      x.lineTo(lx, ly + 40);
      x.stroke();
    }
    x.globalAlpha = 1;
  }
  if (host.dead > 0) {
    x.fillStyle = `rgba(13,13,26,${Math.min(0.55, (DEAD_S - host.dead) * 1.4)})`;
    x.fillRect(0, 0, W, H);
  }
  drawCount(host, x);
  x.restore();
}
