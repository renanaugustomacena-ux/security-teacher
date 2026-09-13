/**
 * La linea di montaggio — the glass, drawn in register R15 «Voxel e low-poly»
 * (ricerca/42 §42.4): a factory yard built of little cubes, seen by a fixed
 * three-quarter camera.
 *
 * PALETTE (six named colours, none of them the app's gold):
 *   crema-cielo #F3E9D2 · erba #6BC26B · acciaio #55585C · legno #B87B4B ·
 *   acqua #3FA7D6 · accento #FF7043. Every cube is one colour per face: the
 *   lit top is the colour itself, the front and the side are the same colour
 *   under black at 18 % and 40 % (the register's hard 40 % shadow, no
 *   gradient). Ink is black at low alpha; there is no seventh hue.
 * FIGURE: the foreman at the lever — a cube head, a hard hat, box overalls,
 *   one arm on the handle — and the crates that hop along the belt.
 * GROUND: the grass tile grid the whole yard stands on; the river behind it.
 * MOVEMENT: discrete hops with squash — a crate lands every 28 px and
 *   flattens; everything that falls bounces (a refused plate on the tray, a
 *   crate off the end of the belt); the belt teeth scroll while the shift runs.
 * TYPEFACE: a fat round sans with an outline for every numeral and every
 *   plate. Never the app's Inter.
 *
 * Under `prefers-reduced-motion` nothing here scrolls, hops or pulses: the
 * belt holds, the crates glide, the hint halo and the empty-clamp pulse are
 * steady rings, the foreman stands still. Two frames apart in time paint the
 * same glass.
 */

import * as engine from '../../KaioEngine.js';
import { labelOf, meaningOf } from '../../LevelBeats.js';
import {
  W,
  H,
  RAIL,
  LEVER,
  FOREMAN,
  BOARD,
  TAG_H,
  TRAY_BOX,
  PLATE_W,
  PLATE_H,
  POST_W,
  POST_H,
  CRATE_W,
  CRATE_H,
  HOP_LEN,
  HOP_UP,
  FONT,
  slotXY,
  trayXY,
  tagXY,
} from './layout.js';

export const PAL = {
  cream: '#F3E9D2',
  grass: '#6BC26B',
  steel: '#55585C',
  wood: '#B87B4B',
  water: '#3FA7D6',
  accent: '#FF7043',
};

const HORIZON = 118;
const INK = 'rgba(0,0,0,.78)';
const SHADE = 'rgba(0,0,0,.4)';
const FRONT = 'rgba(0,0,0,.18)';
const LIGHT = 'rgba(255,255,255,.22)';

/** Stamps a crate carries (template): token, body (closed / open), flood. */
function marksOf(r) {
  const marks = [];
  if (r.token) marks.push('T');
  if (r.body) marks.push(r.open ? '{}' : '▧');
  if (r.flood) marks.push('≡');
  return marks.join(' ') || '·';
}

/**
 * A voxel: front face at (cx-w/2, cy-h/2), top face rising `d` and leaning
 * right, side face on the right. One colour, three lights, no outline.
 */
function cube(x, cx, cy, w, h, d, col) {
  const l = cx - w / 2;
  const t = cy - h / 2;
  // hard shadow on the ground
  x.fillStyle = SHADE;
  x.fillRect(l + d, t + h, w, Math.max(3, d * 0.5));
  // top
  x.fillStyle = col;
  x.beginPath();
  x.moveTo(l, t);
  x.lineTo(l + d, t - d);
  x.lineTo(l + w + d, t - d);
  x.lineTo(l + w, t);
  x.closePath();
  x.fill();
  // side
  x.fillStyle = col;
  x.beginPath();
  x.moveTo(l + w, t);
  x.lineTo(l + w + d, t - d);
  x.lineTo(l + w + d, t + h - d);
  x.lineTo(l + w, t + h);
  x.closePath();
  x.fill();
  x.fillStyle = SHADE;
  x.beginPath();
  x.moveTo(l + w, t);
  x.lineTo(l + w + d, t - d);
  x.lineTo(l + w + d, t + h - d);
  x.lineTo(l + w, t + h);
  x.closePath();
  x.fill();
  // front
  x.fillStyle = col;
  x.fillRect(l, t, w, h);
  x.fillStyle = FRONT;
  x.fillRect(l, t, w, h);
}

/** Outlined label: the register's fat sans with a dark rim. */
function label(x, text, cx, cy, size, fill, rim, weight) {
  x.font = `${weight || 800} ${size}px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.lineJoin = 'round';
  x.lineWidth = Math.max(2, size * 0.22);
  x.strokeStyle = rim || INK;
  x.strokeText(text, cx, cy);
  x.fillStyle = fill;
  x.fillText(text, cx, cy);
}

/** Shrink a label until it fits `maxW` (template's while-loop, bounded). */
function fitSize(x, text, maxW, size, min) {
  let f = size;
  x.font = `800 ${f}px ${FONT}`;
  while (f > min && x.measureText(text).width > maxW) {
    f -= 1;
    x.font = `800 ${f}px ${FONT}`;
  }
  return f;
}

function ellipsize(x, text, maxW) {
  let t = text;
  while (t.length > 1 && x.measureText(`${t}…`).width > maxW) t = t.slice(0, -1);
  return t === text ? text : `${t}…`;
}

// ─── the yard ────────────────────────────────────

function drawYard(x) {
  x.fillStyle = PAL.cream;
  x.fillRect(0, 0, W, HORIZON);
  // low-poly hills on the far bank
  x.fillStyle = PAL.grass;
  x.beginPath();
  x.moveTo(-10, HORIZON - 14);
  x.lineTo(70, 62);
  x.lineTo(150, HORIZON - 14);
  x.lineTo(230, 78);
  x.lineTo(320, HORIZON - 14);
  x.lineTo(380, 70);
  x.lineTo(W + 10, HORIZON - 14);
  x.closePath();
  x.fill();
  x.fillStyle = SHADE;
  x.beginPath();
  x.moveTo(70, 62);
  x.lineTo(150, HORIZON - 14);
  x.lineTo(110, HORIZON - 14);
  x.closePath();
  x.moveTo(230, 78);
  x.lineTo(320, HORIZON - 14);
  x.lineTo(270, HORIZON - 14);
  x.closePath();
  x.moveTo(380, 70);
  x.lineTo(W + 10, HORIZON - 14);
  x.lineTo(405, HORIZON - 14);
  x.closePath();
  x.fill();
  // the river
  x.fillStyle = PAL.water;
  x.fillRect(0, HORIZON - 14, W, 26);
  x.fillStyle = FRONT;
  x.fillRect(0, HORIZON - 14, W, 5);
  x.fillStyle = LIGHT;
  for (let i = 0; i < W; i += 60) x.fillRect(i + 14, HORIZON - 2, 22, 3);
  // the grass tile grid
  x.fillStyle = PAL.grass;
  x.fillRect(0, HORIZON + 12, W, H - HORIZON - 12);
  x.fillStyle = 'rgba(0,0,0,.07)';
  for (let y = HORIZON + 12; y < H; y += 34) x.fillRect(0, y, W, 1.5);
  for (let i = -3; i < 12; i++) {
    const x0 = i * 44;
    x.beginPath();
    x.moveTo(x0, HORIZON + 12);
    x.lineTo(x0 + 28, H);
    x.lineTo(x0 + 29.5, H);
    x.lineTo(x0 + 1.5, HORIZON + 12);
    x.closePath();
    x.fill();
  }
  // three cube trees on the bank
  for (const tx of [40, 236, 392]) {
    cube(x, tx, HORIZON + 30, 8, 18, 3, PAL.wood);
    cube(x, tx, HORIZON + 10, 26, 22, 8, PAL.grass);
  }
}

// ─── the order board ─────────────────────────────

function drawBoard(host, x) {
  const still = host.reduceMotion;
  const b = BOARD;
  cube(x, 40, b.y + b.h + 16, 8, 40, 3, PAL.wood);
  cube(x, W - 40, b.y + b.h + 16, 8, 40, 3, PAL.wood);
  cube(x, b.x + b.w / 2, b.y + b.h / 2, b.w, b.h, 8, PAL.wood);
  const open = host.tags.find((t) => !t.done) || null;
  host.tags.forEach((t, i) => {
    const q = tagXY(i);
    const isOpen = t === open;
    const jx = t.shake > 0 && !still ? Math.sin(t.shake * 40) * 4 * t.shake : 0;
    const px = q.x + jx + (isOpen ? 6 : 0);
    const py = q.y;
    const w = b.w - 24 - (isOpen ? 6 : 0);
    x.fillStyle = SHADE;
    x.fillRect(px + 3, py + 3, w, TAG_H);
    x.fillStyle = PAL.cream;
    x.fillRect(px, py, w, TAG_H);
    if (!isOpen) {
      x.fillStyle = t.done ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,.04)';
      x.fillRect(px, py, w, TAG_H);
    }
    x.fillStyle = isOpen ? PAL.accent : t.done ? PAL.grass : PAL.steel;
    x.fillRect(px, py, 6, TAG_H);
    label(x, String(i + 1), px + 20, py + TAG_H / 2, 15, PAL.cream, PAL.steel);
    x.font = `700 15px ${FONT}`;
    x.textAlign = 'left';
    x.textBaseline = 'middle';
    x.fillStyle = PAL.steel;
    const text = ellipsize(x, meaningOf(t.item, 'it'), w - 70);
    x.fillText(text, px + 34, py + TAG_H / 2 + 1);
    if (t.done) label(x, '✓', px + w - 16, py + TAG_H / 2, 16, PAL.cream, PAL.grass);
  });
}

// ─── the belt, the posts, the crates ─────────────

function drawPlate(host, x, p, cx, cy, held) {
  const still = host.reduceMotion;
  let lift = held ? 8 : 0;
  if (p.bounce > 0 && !still) lift += Math.abs(Math.sin(p.bounce * Math.PI * 2)) * 18 * p.bounce;
  if (p.drop > 0 && !still) lift += p.drop * 10;
  const y = cy - lift;
  x.save();
  if (p.glow > 0) {
    x.shadowColor = PAL.accent;
    x.shadowBlur = still ? 16 : 12 + 6 * Math.sin(host.t * 7);
  }
  cube(x, cx, y, PLATE_W, PLATE_H, 7, PAL.wood);
  x.shadowBlur = 0;
  if (held) {
    x.fillStyle = PAL.accent;
    x.fillRect(cx - PLATE_W / 2, y - PLATE_H / 2, PLATE_W, 4);
  }
  const text = labelOf(p.item);
  const f = fitSize(x, text, PLATE_W - 14, 16, 10);
  label(x, text, cx, y + 1, f, PAL.cream, INK);
  x.restore();
}

function drawBelt(host, x) {
  const still = host.reduceMotion;
  const c = host.cfg;
  const running = host.phase === 'run' && !still;
  // the belt: a long steel slab with teeth
  cube(x, W / 2, RAIL + 40, W + 20, 30, 10, PAL.steel);
  x.fillStyle = PAL.cream;
  const off = running ? (host.t * 60 * (host.motion || 1)) % 32 : 0;
  for (let i = -1; i < 15; i++) {
    const bx = i * 32 + off;
    x.beginPath();
    x.moveTo(bx, RAIL + 28);
    x.lineTo(bx + 8, RAIL + 20);
    x.lineTo(bx + 14, RAIL + 20);
    x.lineTo(bx + 6, RAIL + 28);
    x.closePath();
    x.fill();
  }
  // the delivery bin at the end of the line
  cube(x, W - 16, RAIL + 92, 44, 40, 8, PAL.steel);
  // the clamp posts, behind the belt
  for (let i = 0; i < c.slots; i++) {
    const q = slotXY(i, c.slots);
    const p = host.slots[i];
    const lit = host.pulse > 0 && host.pulseS === i;
    const cursor = host.kbUsed && host.phase === 'build' && host.kpost === i;
    const py = q.y - 30;
    x.save();
    if (lit) {
      x.shadowColor = PAL.accent;
      x.shadowBlur = still ? 18 : 10 + 10 * Math.abs(Math.sin(host.pulse * 15));
    }
    cube(x, q.x, py, POST_W, POST_H, 9, PAL.steel);
    x.shadowBlur = 0;
    if (cursor || lit) {
      x.strokeStyle = PAL.accent;
      x.lineWidth = lit ? 3.5 : 2.5;
      x.strokeRect(q.x - POST_W / 2 - 4, py - POST_H / 2 - 4, POST_W + 8, POST_H + 8);
    }
    if (p) drawPlate(host, x, { ...p, glow: 0 }, q.x, py + 2, false);
    else label(x, String(i + 1), q.x, py, 20, PAL.cream, INK);
    x.restore();
  }
}

function drawCrate(host, x, r) {
  const still = host.reduceMotion;
  const phase = ((r.x % HOP_LEN) + HOP_LEN) % HOP_LEN;
  const k = phase / HOP_LEN;
  const hop = still || r.stopped ? 0 : Math.sin(k * Math.PI) * HOP_UP;
  const squash = still || r.stopped ? 0 : Math.max(0, 1 - Math.abs(k - 0.5) * 8) * 0.12;
  const cy = RAIL + 2 - hop;
  r.y = cy;
  x.save();
  x.translate(r.x, cy);
  x.scale(1 + squash, 1 - squash);
  cube(x, 0, 0, CRATE_W, CRATE_H, 8, PAL.wood);
  x.fillStyle = 'rgba(0,0,0,.25)';
  x.fillRect(-CRATE_W / 2, -6, CRATE_W, 1.5);
  label(x, marksOf(r), 0, 7, 13, PAL.cream, INK);
  x.restore();
  if (r.stopped) {
    x.fillStyle = PAL.cream;
    x.fillRect(r.x - 22, cy - 46, 44, 20);
    x.fillStyle = SHADE;
    x.fillRect(r.x - 22, cy - 26, 44, 3);
    label(x, r.stopped, r.x, cy - 36, 14, PAL.steel, PAL.cream);
  }
}

// ─── the tray, the lever, the foreman ────────────

function drawTray(host, x) {
  const b = TRAY_BOX;
  cube(x, b.x + b.w / 2, b.y + b.h / 2, b.w, b.h, 8, PAL.wood);
  x.fillStyle = 'rgba(0,0,0,.12)';
  x.fillRect(b.x + 8, b.y + 8, b.w - 16, b.h - 16);
  for (const p of host.tray) {
    if (p.used || p === host.held) continue;
    const q = trayXY(p.i);
    drawPlate(host, x, p, q.x, q.y, false);
  }
  if (host.held) {
    const q = trayXY(host.held.i);
    drawPlate(host, x, host.held, q.x, q.y, true);
  }
}

function drawForeman(host, x) {
  const still = host.reduceMotion;
  const f = FOREMAN;
  const bob = still ? 0 : Math.sin(host.t * 2.4) * 1.5;
  const pull = host.leverT > 0 ? host.leverT : 0;
  // legs, overalls, head, hat
  cube(x, f.x - 7, f.y - 8, 9, 16, 3, PAL.steel);
  cube(x, f.x + 7, f.y - 8, 9, 16, 3, PAL.steel);
  cube(x, f.x, f.y - 30 + bob, 26, 30, 6, PAL.steel);
  x.fillStyle = PAL.accent;
  x.fillRect(f.x - 6, f.y - 42 + bob, 12, 14);
  cube(x, f.x, f.y - 56 + bob, 20, 20, 5, PAL.wood);
  x.fillStyle = INK;
  x.fillRect(f.x + 1, f.y - 59 + bob, 2.5, 3);
  x.fillRect(f.x + 6, f.y - 59 + bob, 2.5, 3);
  x.fillStyle = PAL.accent;
  x.beginPath();
  x.moveTo(f.x - 13, f.y - 66 + bob);
  x.lineTo(f.x, f.y - 78 + bob);
  x.lineTo(f.x + 13, f.y - 66 + bob);
  x.closePath();
  x.fill();
  x.fillRect(f.x - 15, f.y - 67 + bob, 30, 4);
  // the arm reaching the lever
  x.strokeStyle = PAL.wood;
  x.lineWidth = 6;
  x.lineCap = 'round';
  x.beginPath();
  x.moveTo(f.x + 12, f.y - 34 + bob);
  x.lineTo(LEVER.x - 8 + pull * 10, LEVER.y - 14 + pull * 8);
  x.stroke();
}

function drawLever(host, x) {
  const build = host.phase === 'build';
  const pull = host.leverT > 0 ? host.leverT : 0;
  cube(x, LEVER.x, LEVER.y + 10, 56, 26, 8, PAL.steel);
  const tilt = build ? -0.5 : 0.5 - pull * 0.3;
  const hx = LEVER.x + Math.sin(tilt) * 30;
  const hy = LEVER.y - Math.cos(tilt) * 30;
  x.strokeStyle = PAL.steel;
  x.lineWidth = 6;
  x.lineCap = 'round';
  x.beginPath();
  x.moveTo(LEVER.x, LEVER.y);
  x.lineTo(hx, hy);
  x.stroke();
  cube(x, hx, hy, 14, 14, 4, PAL.accent);
  if (build) {
    label(x, `${Math.ceil(host.buildT)}s`, LEVER.x, LEVER.y + 44, 15, PAL.cream, INK);
  }
}

// ─── the hud ─────────────────────────────────────

function drawHud(host, x) {
  const en = host.state.lang === 'en';
  const build = host.phase === 'build';
  label(
    x,
    build ? (en ? 'BUILD' : 'MONTAGGIO') : en ? 'RUNNING' : 'IN CORSO',
    20,
    30,
    15,
    build ? PAL.cream : PAL.accent,
    INK
  );
  x.textAlign = 'left';
  x.font = `800 15px ${FONT}`;
  x.strokeStyle = INK;
  x.lineWidth = 3;
  x.strokeText(build ? (en ? 'BUILD' : 'MONTAGGIO') : en ? 'RUNNING' : 'IN CORSO', 20, 30);
  x.fillStyle = build ? PAL.cream : PAL.accent;
  x.fillText(build ? (en ? 'BUILD' : 'MONTAGGIO') : en ? 'RUNNING' : 'IN CORSO', 20, 30);
  label(x, `${host.served}/${host.needed}`, 48, 54, 18, PAL.cream, INK);
  // three crates: a leak empties one; three blocks bars below
  for (let i = 0; i < 3; i++) {
    const cx = W - 74 + i * 26;
    if (i < host.leaks) {
      x.strokeStyle = PAL.steel;
      x.lineWidth = 2;
      x.strokeRect(cx - 8, 20, 16, 14);
    } else cube(x, cx, 27, 16, 14, 4, PAL.wood);
    x.fillStyle = i < host.blocks ? 'rgba(0,0,0,.25)' : PAL.cream;
    x.fillRect(cx - 8, 44, 16, 4);
  }
}

export function drawScene(host, x) {
  const sc = host.sc || 1;
  x.setTransform(sc, 0, 0, sc, 0, 0);
  x.clearRect(0, 0, W, H);
  x.save();
  engine.shake(host, x, host.shake > 0 ? host.shake : 0);
  drawYard(x);
  if (!host.cfg) {
    x.restore();
    return;
  }
  drawBoard(host, x);
  drawBelt(host, x);
  for (const r of host.reqs) if (!r.dead) drawCrate(host, x, r);
  if (host.phase === 'build') drawTray(host, x);
  drawForeman(host, x);
  drawLever(host, x);
  drawHud(host, x);
  engine.drawParts(x, host.parts);
  if (host.flash > 0) {
    x.fillStyle = `rgba(243,233,210,${(host.flash * 0.08).toFixed(3)})`;
    x.fillRect(0, 0, W, H);
  }
  x.restore();
}
