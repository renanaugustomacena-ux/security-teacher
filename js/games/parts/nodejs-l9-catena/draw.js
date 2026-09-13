/**
 * La catena di controllo — the glass, drawn in register R9 «Neon su griglia»
 * (ricerca/42 §42.4): a vertical duct of light on a grid, Tron-side.
 *
 * PALETTE (the register's own, none of them the app's gold):
 *   fondo #05060F · griglia #12203A · ciano #00E5FF · magenta #FF3EA5 ·
 *   arancio #FF9F1C · blu #2D5BFF · bianco #FFFFFF. Depth is the same hexes
 *   at lower alpha, never a further hue.
 * FIGURE: the pod — a hexagon with two eye-lights and a trail behind it. A
 *   kid draws it as a stop sign with eyes and a tail.
 * GROUND: the floor grid in perspective under the duct; the valves stand on
 *   it, the seal bar lies across it.
 * MOVEMENT: the trail stays behind the pod, the held valve pulses in time,
 *   the floor grid scrolls toward the horizon.
 * TYPEFACE: an extended sans with glow (Raleway) for terms, digits and the
 *   seal; a monospace for the station names, which are code.
 *
 * Under `prefers-reduced-motion` nothing here moves on its own: no trail, no
 * pulse, no scroll, no jolt. The refusal of a wrong valve is a still orange
 * ring on the pod instead of a shake; the hint on the right valve is a steady
 * halo instead of a breath. Two frames of the same state paint the same glass.
 */

import * as engine from '../../KaioEngine.js';
import { labelOf, meaningOf } from '../../LevelBeats.js';
import { marksOf, stationOf, tagOf } from './chain.js';
import {
  W,
  H,
  TOP,
  BOT,
  DUCT_X,
  DUCT_HW,
  STATION_W,
  STATION_H,
  TAG_X,
  TAG_W,
  POD_R,
  RING_R,
  FLOOR_Y,
  VALVE_R,
  SEAL,
  SANS,
  MONO,
  stY,
  valvePos,
} from './layout.js';

export const PAL = {
  bg: '#05060F',
  grid: '#12203A',
  cyan: '#00E5FF',
  magenta: '#FF3EA5',
  orange: '#FF9F1C',
  blue: '#2D5BFF',
  white: '#FFFFFF',
};

const HANG_ALARM = 0.6;

export function wrapLines(x, text, maxW, maxL) {
  const words = String(text).split(' ');
  const out = [];
  let line = '';
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (x.measureText(t).width > maxW && line) {
      out.push(line);
      line = w;
    } else {
      line = t;
    }
  }
  if (line) out.push(line);
  if (out.length > maxL) {
    out.length = maxL;
    let l = out[maxL - 1];
    while (x.measureText(`${l}…`).width > maxW && l.length > 1) l = l.slice(0, -1);
    out[maxL - 1] = `${l}…`;
  }
  return out;
}

/** Largest of `sizes` at which `text` wraps into `maxL` lines of `maxW`. */
function fitText(x, text, maxW, maxL, weight, family, sizes) {
  let lines = [];
  let size = sizes[sizes.length - 1];
  for (const s of sizes) {
    x.font = `${weight} ${s}px ${family}`;
    lines = wrapLines(x, text, maxW, maxL);
    size = s;
    if (lines.length <= maxL && !lines[lines.length - 1].endsWith('…')) break;
  }
  x.font = `${weight} ${size}px ${family}`;
  return { lines, size };
}

/** A flat-top hexagon path centred on (cx, cy). */
function hexPath(x, cx, cy, r) {
  x.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    const px = cx + r * Math.cos(a);
    const py = cy + r * Math.sin(a);
    if (i === 0) x.moveTo(px, py);
    else x.lineTo(px, py);
  }
  x.closePath();
}

/** A wide hexagonal plate: a rectangle with pointed ends. */
function platePath(x, cx, cy, w, h) {
  const hw = w / 2;
  const hh = h / 2;
  const tip = hh * 0.55;
  x.beginPath();
  x.moveTo(cx - hw + tip, cy - hh);
  x.lineTo(cx + hw - tip, cy - hh);
  x.lineTo(cx + hw, cy);
  x.lineTo(cx + hw - tip, cy + hh);
  x.lineTo(cx - hw + tip, cy + hh);
  x.lineTo(cx - hw, cy);
  x.closePath();
}

function glow(x, colour, blur) {
  x.shadowColor = colour;
  x.shadowBlur = blur;
}

function noGlow(x) {
  x.shadowBlur = 0;
}

// ─── ground and duct ─────────────────────────────

function drawGrid(x) {
  x.fillStyle = PAL.bg;
  x.fillRect(-8, -8, W + 16, H + 16);
  x.strokeStyle = PAL.grid;
  x.lineWidth = 1;
  x.globalAlpha = 0.9;
  x.beginPath();
  for (let gx = 20; gx < W; gx += 40) {
    x.moveTo(gx, 0);
    x.lineTo(gx, FLOOR_Y);
  }
  for (let gy = 22; gy < FLOOR_Y; gy += 40) {
    x.moveTo(0, gy);
    x.lineTo(W, gy);
  }
  x.stroke();
  x.globalAlpha = 1;
}

/* The floor: a grid in perspective that scrolls toward the horizon. Under
   reduced motion the phase is zero and the floor stands still. */
function drawFloor(host, x) {
  const still = host.reduceMotion;
  const phase = still ? 0 : (host.t * 0.45) % 1;
  const vx = W / 2;
  const vy = FLOOR_Y - 150;
  x.fillStyle = PAL.blue;
  x.globalAlpha = 0.07;
  x.fillRect(0, FLOOR_Y, W, H - FLOOR_Y);
  x.globalAlpha = 1;

  x.strokeStyle = PAL.grid;
  x.lineWidth = 1.2;
  x.beginPath();
  for (let k = -5; k <= 5; k++) {
    const bx = vx + k * 84;
    // The line from the vanishing point, clipped to the floor.
    const f = (FLOOR_Y - vy) / (H - vy);
    x.moveTo(vx + (bx - vx) * f, FLOOR_Y);
    x.lineTo(bx, H);
  }
  for (let j = 0; j < 9; j++) {
    const f = ((j + phase) / 9) ** 2;
    const y = FLOOR_Y + (H - FLOOR_Y) * f;
    x.moveTo(0, y);
    x.lineTo(W, y);
  }
  x.stroke();

  glow(x, PAL.cyan, 10);
  x.strokeStyle = PAL.cyan;
  x.globalAlpha = 0.55;
  x.lineWidth = 1.5;
  x.beginPath();
  x.moveTo(0, FLOOR_Y);
  x.lineTo(W, FLOOR_Y);
  x.stroke();
  x.globalAlpha = 1;
  noGlow(x);
}

function drawDuct(x) {
  x.fillStyle = PAL.grid;
  x.globalAlpha = 0.55;
  x.fillRect(DUCT_X - DUCT_HW, TOP - 50, DUCT_HW * 2, BOT - TOP + 80);
  x.globalAlpha = 1;
  glow(x, PAL.cyan, 8);
  x.strokeStyle = PAL.cyan;
  x.globalAlpha = 0.45;
  x.lineWidth = 2;
  x.beginPath();
  x.moveTo(DUCT_X - DUCT_HW, TOP - 50);
  x.lineTo(DUCT_X - DUCT_HW, BOT + 30);
  x.moveTo(DUCT_X + DUCT_HW, TOP - 50);
  x.lineTo(DUCT_X + DUCT_HW, BOT + 30);
  x.stroke();
  x.globalAlpha = 1;
  noGlow(x);
}

// ─── stations ────────────────────────────────────

function drawStation(host, x, i) {
  const chain = host.cfg.chain;
  const mw = stationOf(host.cfg, { at: i });
  if (!mw) return;
  const y = stY(chain.length, i);
  const lit = host.lit && host.lit[i] > 0 ? host.lit[i] : 0;
  const hasHeld = host.caps.some((c) => !c.dead && c.wait && c.at === i);

  x.fillStyle = PAL.blue;
  x.globalAlpha = hasHeld ? 0.6 : 0.3;
  platePath(x, DUCT_X, y, STATION_W, STATION_H);
  x.fill();
  x.globalAlpha = 1;

  if (lit || hasHeld) glow(x, PAL.cyan, lit ? 8 + 14 * lit : 10);
  x.strokeStyle = PAL.cyan;
  x.globalAlpha = hasHeld || lit ? 0.95 : 0.5;
  x.lineWidth = hasHeld ? 2.5 : 1.5;
  platePath(x, DUCT_X, y, STATION_W, STATION_H);
  x.stroke();
  x.globalAlpha = 1;
  noGlow(x);

  x.textAlign = 'center';
  x.textBaseline = 'middle';
  let f = 13;
  x.font = `600 ${f}px ${MONO}`;
  while (x.measureText(mw.n).width > STATION_W - 22 && f > 9) {
    f--;
    x.font = `600 ${f}px ${MONO}`;
  }
  x.fillStyle = PAL.white;
  x.fillText(mw.n, DUCT_X, y - 8);
  x.font = `600 11px ${SANS}`;
  x.fillStyle = PAL.cyan;
  x.globalAlpha = 0.85;
  x.fillText(tagOf(mw, host.state.lang), DUCT_X, y + 10);
  x.globalAlpha = 1;

  // The two side taps of the plate into the duct rails.
  x.fillStyle = PAL.cyan;
  x.globalAlpha = 0.3;
  x.fillRect(DUCT_X - DUCT_HW, y - 1, DUCT_HW - STATION_W / 2, 2);
  x.fillRect(DUCT_X + STATION_W / 2, y - 1, DUCT_HW - STATION_W / 2, 2);
  x.globalAlpha = 1;
}

// ─── the pod and its tag ─────────────────────────

function drawTrail(x, k) {
  const n = k.trail.length;
  if (!n) return;
  x.strokeStyle = PAL.magenta;
  for (let j = 0; j < n; j++) {
    const f = (j + 1) / (n + 1);
    x.globalAlpha = 0.28 * f;
    x.lineWidth = 1.2;
    hexPath(x, DUCT_X, k.trail[j], POD_R * (0.55 + 0.45 * f));
    x.stroke();
  }
  x.globalAlpha = 1;
}

function drawPod(host, x, k) {
  const still = host.reduceMotion;
  if (!still) drawTrail(x, k);
  const jolt = k.bump > 0 && !still ? (Math.random() * 2 - 1) * 4 * k.bump : 0;
  const cx = DUCT_X + jolt;
  const cy = k.y;

  x.fillStyle = PAL.bg;
  hexPath(x, cx, cy, POD_R);
  x.fill();
  x.fillStyle = PAL.magenta;
  x.globalAlpha = k.wait ? 0.35 : 0.2;
  hexPath(x, cx, cy, POD_R);
  x.fill();
  x.globalAlpha = 1;

  // A refused valve: the pod jolts; under reduced motion the same refusal is
  // a still, thick orange rim (never red, §14.6).
  const refused = k.bump > 0 && still;
  glow(x, refused ? PAL.orange : PAL.magenta, k.wait ? 16 : 8);
  x.strokeStyle = refused ? PAL.orange : PAL.magenta;
  x.lineWidth = refused ? 4 : k.wait ? 2.5 : 1.6;
  hexPath(x, cx, cy, POD_R);
  x.stroke();
  noGlow(x);

  // The core and the two eye-lights: what a kid draws.
  x.fillStyle = PAL.magenta;
  x.beginPath();
  x.arc(cx, cy + 4, 6, 0, 6.283);
  x.fill();
  x.fillStyle = PAL.white;
  x.beginPath();
  x.arc(cx - 6, cy - 5, 2.2, 0, 6.283);
  x.arc(cx + 6, cy - 5, 2.2, 0, 6.283);
  x.fill();

  if (k.wait) {
    const t = Math.min(1, k.hang / (host.cfg.speed * 1.6));
    x.strokeStyle = t > HANG_ALARM ? PAL.orange : PAL.cyan;
    x.globalAlpha = 0.85;
    x.lineWidth = 3;
    x.beginPath();
    x.arc(cx, cy, RING_R, -1.5708, -1.5708 + 6.283 * (1 - t));
    x.stroke();
    x.globalAlpha = 1;
  }
}

/* The tag speaks Italian: the meaning of the term the pod carries. What the
   player presses speaks English (brief §2.2). */
function drawTag(host, x, k) {
  const meaning = meaningOf(k.item, 'it');
  const { lines } = fitText(x, meaning, TAG_W - 20, 3, 600, SANS, [12, 11]);
  const marks = marksOf(k);
  const h = lines.length * 15 + 12 + (marks ? 14 : 0);
  const top = Math.max(4, Math.min(FLOOR_Y - h - 6, k.y - h / 2));

  x.strokeStyle = PAL.cyan;
  x.globalAlpha = k.wait ? 0.9 : 0.4;
  x.lineWidth = 1.2;
  x.beginPath();
  x.moveTo(DUCT_X + POD_R, k.y);
  x.lineTo(TAG_X, k.y);
  x.stroke();
  x.globalAlpha = 1;

  x.fillStyle = PAL.bg;
  x.globalAlpha = 0.88;
  engine.rr(x, TAG_X, top, TAG_W, h, 6);
  x.fill();
  x.globalAlpha = 1;
  if (k.wait) glow(x, PAL.cyan, 8);
  x.strokeStyle = PAL.cyan;
  x.globalAlpha = k.wait ? 0.9 : 0.45;
  x.lineWidth = k.wait ? 1.8 : 1.2;
  engine.rr(x, TAG_X, top, TAG_W, h, 6);
  x.stroke();
  x.globalAlpha = 1;
  noGlow(x);

  x.textAlign = 'left';
  x.textBaseline = 'middle';
  x.fillStyle = PAL.white;
  lines.forEach((l, i) => x.fillText(l, TAG_X + 10, top + 13 + i * 15));
  if (marks) {
    x.font = `500 10px ${MONO}`;
    x.fillStyle = PAL.cyan;
    x.fillText(marks, TAG_X + 10, top + h - 9);
  }
}

// ─── valves and seal ─────────────────────────────

function drawValve(host, x, i, n, held) {
  const still = host.reduceMotion;
  const p = valvePos(i, n);
  const item = host.menu[i];
  const hint = host.pulse > 0 && host.pulseAt === i;
  const breath = held && !still ? 1 + 0.03 * Math.sin(host.t * 4) : 1;

  x.save();
  x.translate(p.x, p.y);
  x.scale(breath, breath);
  x.fillStyle = PAL.bg;
  hexPath(x, 0, 0, VALVE_R);
  x.fill();
  x.fillStyle = PAL.blue;
  x.globalAlpha = held ? 0.35 : 0.14;
  hexPath(x, 0, 0, VALVE_R);
  x.fill();
  x.globalAlpha = 1;

  if (hint) {
    // The hint halo breathes; under reduced motion it is a steady glow.
    glow(x, PAL.orange, still ? 16 : 14 + 6 * Math.sin(host.t * 12));
    x.strokeStyle = PAL.orange;
    x.lineWidth = 3.5;
  } else {
    if (held) glow(x, PAL.cyan, 14);
    x.strokeStyle = PAL.cyan;
    x.globalAlpha = held ? 1 : 0.4;
    x.lineWidth = held ? 3 : 2;
  }
  hexPath(x, 0, 0, VALVE_R);
  x.stroke();
  x.globalAlpha = 1;
  noGlow(x);

  if (host.kbUsed && host.sel === i) {
    x.strokeStyle = PAL.white;
    x.globalAlpha = 0.8;
    x.lineWidth = 1.5;
    hexPath(x, 0, 0, VALVE_R + 7);
    x.stroke();
    x.globalAlpha = 1;
  }

  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const label = labelOf(item);
  const { lines, size } = fitText(x, label, VALVE_R * 1.7, 2, 700, SANS, [13, 12, 11, 10]);
  x.fillStyle = PAL.white;
  x.globalAlpha = held ? 1 : 0.7;
  if (held) glow(x, PAL.cyan, 6);
  lines.forEach((l, j) => x.fillText(l, 0, (j - (lines.length - 1) / 2) * (size + 3)));
  noGlow(x);
  x.globalAlpha = 1;
  if (host.kbUsed) {
    x.font = `700 10px ${SANS}`;
    x.fillStyle = PAL.cyan;
    x.fillText(String(i + 1), 0, VALVE_R - 10);
  }
  x.restore();
}

function drawSeal(host, x, held) {
  const still = host.reduceMotion;
  const hint = host.pulse > 0 && host.pulseAt === 'seal';
  const { w, h } = SEAL;
  const left = SEAL.x - w / 2;
  const top = SEAL.y - h / 2;

  x.fillStyle = PAL.bg;
  engine.rr(x, left, top, w, h, h / 2);
  x.fill();
  x.fillStyle = PAL.magenta;
  x.globalAlpha = held ? 0.3 : 0.1;
  engine.rr(x, left, top, w, h, h / 2);
  x.fill();
  x.globalAlpha = 1;

  if (hint) {
    glow(x, PAL.orange, still ? 16 : 14 + 6 * Math.sin(host.t * 12));
    x.strokeStyle = PAL.orange;
    x.lineWidth = 3.5;
  } else {
    if (held) glow(x, PAL.magenta, 14);
    x.strokeStyle = PAL.magenta;
    x.globalAlpha = held ? 1 : 0.45;
    x.lineWidth = held ? 3 : 2;
  }
  engine.rr(x, left, top, w, h, h / 2);
  x.stroke();
  x.globalAlpha = 1;
  noGlow(x);

  if (host.kbUsed && host.sel === host.menu.length) {
    x.strokeStyle = PAL.white;
    x.globalAlpha = 0.8;
    x.lineWidth = 1.5;
    engine.rr(x, left - 6, top - 6, w + 12, h + 12, h / 2 + 6);
    x.stroke();
    x.globalAlpha = 1;
  }

  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.font = `700 14px ${SANS}`;
  x.fillStyle = PAL.white;
  x.globalAlpha = held ? 1 : 0.75;
  x.fillText(host.state.lang === 'en' ? 'answer' : 'tappo', SEAL.x, SEAL.y);
  x.globalAlpha = 1;
  if (host.kbUsed) {
    x.font = `700 10px ${SANS}`;
    x.fillStyle = PAL.magenta;
    x.fillText('0', SEAL.x + w / 2 - 16, SEAL.y);
  }
}

// ─── board: the count and the three lamps ────────

function drawBoard(host, x) {
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  x.font = `700 22px ${SANS}`;
  glow(x, PAL.orange, 10);
  x.fillStyle = PAL.orange;
  x.fillText(`${host.made}/${host.needed}`, 20, 70);
  noGlow(x);

  for (let i = 0; i < 3; i++) {
    const blown = i < host.bad;
    const ly = 58 + i * 22;
    if (blown) {
      x.strokeStyle = PAL.orange;
      x.globalAlpha = 0.35;
      x.lineWidth = 1.5;
      hexPath(x, W - 26, ly, 7);
      x.stroke();
      x.globalAlpha = 1;
    } else {
      glow(x, PAL.orange, 10);
      x.fillStyle = PAL.orange;
      hexPath(x, W - 26, ly, 7);
      x.fill();
      noGlow(x);
    }
  }
}

export function drawScene(host, x) {
  x.setTransform(host.sc || 1, 0, 0, host.sc || 1, 0, 0);
  x.save();
  engine.shake(host, x, host.shake || 0);
  drawGrid(x);
  drawFloor(host, x);
  drawDuct(x);
  const chain = host.cfg ? host.cfg.chain : [];
  for (let i = 0; i < chain.length; i++) drawStation(host, x, i);
  for (const k of host.caps) if (!k.dead) drawPod(host, x, k);
  for (const k of host.caps) if (!k.dead) drawTag(host, x, k);
  const n = host.menu.length;
  const held = host.caps.some((c) => !c.dead && c.wait);
  for (let i = 0; i < n; i++) drawValve(host, x, i, n, held);
  drawSeal(host, x, held);
  drawBoard(host, x);
  engine.drawParts(x, host.parts);
  if (host.flash > 0) {
    x.fillStyle = PAL.cyan;
    x.globalAlpha = host.flash * 0.08;
    x.fillRect(0, 0, W, H);
    x.globalAlpha = 1;
  }
  x.restore();
}
