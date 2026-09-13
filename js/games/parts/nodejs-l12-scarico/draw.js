/**
 * Lo scarico — the glass, drawn in register R5 «Travi e scale» (ricerca/42
 * §42.4): Donkey Kong's girders and ladders, Burger Time's floors, on black.
 *
 * PALETTE (six named colours on a black ground, none of them the app's gold):
 *   trave rossa #F03C3C · scala ciano #22D3EE · barile bruno #8B5A2B ·
 *   blu #1E40AF · rosa #F9A8D4 · giallo #FACC15. Depth and ink are black or
 *   white at low alpha over the same six, never a seventh hue.
 * FIGURE: the barrel — a brown drum with hoops and a pink paper label that
 *   speaks Italian — and the mitt: a big blue glove with a thumb and a yellow
 *   cuff, hanging from a hook. Every glove is the same glove; only the
 *   English term stamped on it differs (ricerca/00 §0.4 TEST 1).
 * GROUND: four red girder floors with rivets, one above the other, joined by
 *   cyan ladders; the panel above the top floor; the beam the gloves hang
 *   from below the bottom floor. Gravity is real: what is caught drops into
 *   the glove, what is not climbs.
 * MOVEMENT: the barrel rolls along the girder, then climbs the ladder frame
 *   by frame; the caught one falls; the missed one shudders and rolls on.
 * TYPEFACE: a bitmap-flavoured monospace with a 1 px black drop shadow for
 *   every string inside the glass, digits included. Never the app's Inter.
 *
 * Under `prefers-reduced-motion` nothing here flickers or shudders: the
 * panel lights hold their glow, the hint halo is a still ring, the climb is
 * a glide, the missed barrel is a steady cyan outline.
 */

import * as engine from '../../KaioEngine.js';
import { labelOf, meaningOf } from '../../LevelBeats.js';
import {
  W,
  H,
  PANEL,
  FLOORS,
  GIRDER_H,
  BARREL_W,
  BARREL_H,
  CHUTE,
  SEGMENTS,
  GLOVE_W,
  GLOVE_H,
  ROW_Y,
  FONT,
  barrelPos,
  glovePos,
  rowsOf,
  beamY,
} from './layout.js';

export const PAL = {
  red: '#F03C3C',
  cyan: '#22D3EE',
  brown: '#8B5A2B',
  blue: '#1E40AF',
  pink: '#F9A8D4',
  yellow: '#FACC15',
};

const BLACK = '#000000';
const INK = 'rgba(0,0,0,.45)';
const LIGHT = 'rgba(255,255,255,.18)';

// ─── text ────────────────────────────────────────

/**
 * Words, and the pieces of a hyphenated word ("express-async-errors" breaks
 * after each hyphen), so a long term fits a glove in three lines.
 */
function tokens(text) {
  return String(text || '')
    .split(' ')
    .flatMap((w) => w.split(/(?<=-)/))
    .filter(Boolean);
}

function join(line, tok) {
  if (!line) return tok;
  return line.endsWith('-') ? line + tok : `${line} ${tok}`;
}

export function wrapLines(x, text, maxW, maxL) {
  const out = [];
  let line = '';
  for (const tok of tokens(text)) {
    const t = join(line, tok);
    if (x.measureText(t).width > maxW && line) {
      out.push(line);
      line = tok;
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

/**
 * The largest of `sizes` at which `text` fits in `maxL` lines of `maxW`;
 * the smallest, with an ellipsis, when none does.
 */
export function fitText(x, text, maxW, maxL, weight, family, sizes) {
  for (const s of sizes) {
    x.font = `${weight} ${s}px ${family}`;
    const ls = wrapLines(x, text, maxW, 99);
    if (ls.length <= maxL && ls.every((l) => x.measureText(l).width <= maxW)) return { ls, s };
  }
  const s = sizes[sizes.length - 1];
  x.font = `${weight} ${s}px ${family}`;
  return { ls: wrapLines(x, text, maxW, maxL), s };
}

/** Bitmap text: the same string once in black, one pixel down-right, then in colour. */
export function bit(x, text, px, py, colour) {
  x.fillStyle = BLACK;
  x.fillText(text, px + 1, py + 1);
  x.fillStyle = colour;
  x.fillText(text, px, py);
}

// ─── the tower ───────────────────────────────────

/* A red girder with rivets: the floor everything rests on. */
function drawGirder(x, gx, gy, gw) {
  x.fillStyle = PAL.red;
  x.fillRect(gx, gy, gw, GIRDER_H);
  x.fillStyle = LIGHT;
  x.fillRect(gx, gy, gw, 2);
  x.fillStyle = INK;
  x.fillRect(gx, gy + GIRDER_H - 3, gw, 3);
  for (let rx = gx + 9; rx < gx + gw - 4; rx += 18) {
    x.beginPath();
    x.arc(rx, gy + GIRDER_H / 2, 2.2, 0, 6.283);
    x.fill();
  }
}

/* A cyan ladder: two rails and rungs, from `y0` up to `y1`. */
function drawLadder(x, lx, y0, y1) {
  x.strokeStyle = PAL.cyan;
  x.lineWidth = 3;
  x.beginPath();
  x.moveTo(lx - 13, y0);
  x.lineTo(lx - 13, y1);
  x.moveTo(lx + 13, y0);
  x.lineTo(lx + 13, y1);
  x.stroke();
  x.lineWidth = 2;
  x.beginPath();
  for (let ry = y1 + 8; ry < y0 - 4; ry += 14) {
    x.moveTo(lx - 13, ry);
    x.lineTo(lx + 13, ry);
  }
  x.stroke();
}

function drawTower(x) {
  const n = FLOORS.length;
  for (let i = 0; i < n; i++) {
    const top = i + 1 < n ? FLOORS[i + 1] + GIRDER_H : PANEL.y + PANEL.h / 2;
    drawLadder(x, SEGMENTS[i].x1, FLOORS[i], top);
  }
  for (let i = 0; i < n; i++) drawGirder(x, -6, FLOORS[i], W + 12);
}

/* The chute: a brown pipe on the bottom floor the barrels roll out of. */
function drawChute(x) {
  const cy = CHUTE.y;
  x.fillStyle = INK;
  engine.rr(x, CHUTE.x - 26, cy - 40, 80, 78, 10);
  x.fill();
  x.fillStyle = PAL.brown;
  engine.rr(x, CHUTE.x - 22, cy - 36, 80, 70, 10);
  x.fill();
  x.fillStyle = LIGHT;
  x.fillRect(CHUTE.x - 22, cy - 36, 80, 4);
  x.fillStyle = BLACK;
  engine.rr(x, CHUTE.x - 22, cy - 26, 34, 52, 8);
  x.fill();
}

/* The panel: a blue box with rivets, its name, and three yellow lights. */
function drawPanel(x, host) {
  const still = host.reduceMotion;
  const zap = host.zap > 0;
  const px = PANEL.x - PANEL.w / 2;
  const py = PANEL.y - PANEL.h / 2;
  x.fillStyle = INK;
  engine.rr(x, px + 4, py + 5, PANEL.w, PANEL.h, 8);
  x.fill();
  x.fillStyle = PAL.blue;
  engine.rr(x, px, py, PANEL.w, PANEL.h, 8);
  x.fill();
  x.strokeStyle = zap ? PAL.pink : PAL.cyan;
  x.lineWidth = zap ? 4 : 2;
  engine.rr(x, px + 5, py + 5, PANEL.w - 10, PANEL.h - 10, 5);
  x.stroke();
  x.fillStyle = INK;
  for (const [rx, ry] of [
    [px + 10, py + 10],
    [px + PANEL.w - 10, py + 10],
    [px + 10, py + PANEL.h - 10],
    [px + PANEL.w - 10, py + PANEL.h - 10],
  ]) {
    x.beginPath();
    x.arc(rx, ry, 2.5, 0, 6.283);
    x.fill();
  }
  x.font = `700 13px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  bit(x, host.state.lang === 'en' ? 'PANEL' : 'QUADRO', PANEL.x, py + 20, PAL.yellow);
  for (let i = 0; i < 3; i++) {
    const off = i < host.bad;
    const lx = PANEL.x - 30 + i * 30;
    const ly = py + PANEL.h - 22;
    if (off) {
      x.fillStyle = BLACK;
      x.beginPath();
      x.arc(lx, ly, 7, 0, 6.283);
      x.fill();
      x.strokeStyle = INK;
      x.lineWidth = 2;
      x.stroke();
    } else {
      const glow = still ? 1 : 0.85 + 0.15 * Math.sin(host.t * 4 + i * 2.1);
      x.shadowColor = PAL.yellow;
      x.shadowBlur = 10 * glow;
      x.globalAlpha = glow;
      x.fillStyle = PAL.yellow;
      x.beginPath();
      x.arc(lx, ly, 7, 0, 6.283);
      x.fill();
      x.globalAlpha = 1;
      x.shadowBlur = 0;
    }
  }
}

// ─── the barrels ─────────────────────────────────

/**
 * A barrel: brown drum, two dark hoops, staves that shift as it rolls, and a
 * pink paper label with the Italian meaning (ricerca/34 §34.1). A missed one
 * shudders inside a cyan outline; under reduced motion the outline is still.
 */
function drawBarrel(x, host, e) {
  const still = host.reduceMotion;
  const pos = barrelPos(e.p, still);
  const w = BARREL_W;
  const h = BARREL_H;
  let cx = pos.x;
  const cy = pos.y;
  if (e.thru > 0 && !still) cx += Math.sin(host.t * 40) * 3;
  x.save();
  x.translate(cx, cy);
  x.fillStyle = INK;
  engine.rr(x, -w / 2 + 3, -h / 2 + 4, w, h, 14);
  x.fill();
  x.fillStyle = PAL.brown;
  engine.rr(x, -w / 2, -h / 2, w, h, 14);
  x.fill();
  // Staves: their spacing shifts with the roll, so the drum is seen turning.
  x.fillStyle = INK;
  const shift = Math.abs(pos.roll * 6) % 12;
  for (let sx = -w / 2 + shift; sx < w / 2; sx += 12) x.fillRect(sx, -h / 2, 1.5, h);
  x.fillStyle = 'rgba(0,0,0,.6)';
  x.fillRect(-w / 2 + 12, -h / 2, 5, h);
  x.fillRect(w / 2 - 17, -h / 2, 5, h);
  x.fillStyle = LIGHT;
  x.fillRect(-w / 2 + 6, -h / 2 + 3, w - 12, 2);
  // The label.
  x.fillStyle = PAL.pink;
  engine.rr(x, -w / 2 + 22, -h / 2 + 6, w - 44, h - 12, 4);
  x.fill();
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const { ls, s } = fitText(x, meaningOf(e.item, 'it'), w - 50, 3, 700, FONT, [11, 10, 9, 8]);
  const lh = s + 1;
  x.fillStyle = BLACK;
  ls.forEach((l, j) => x.fillText(l, 0, (j - (ls.length - 1) / 2) * lh));
  if (e.thru > 0) {
    x.strokeStyle = PAL.cyan;
    x.lineWidth = 3;
    engine.rr(x, -w / 2 - 4, -h / 2 - 4, w + 8, h + 8, 16);
    x.stroke();
  }
  if (e.re) {
    x.font = `700 10px ${FONT}`;
    bit(x, host.state.lang === 'en' ? 'rethrown' : 'rilanciato', 0, h / 2 + 10, PAL.yellow);
  }
  x.restore();
}

// ─── the gloves ──────────────────────────────────

/* The beam(s) the gloves hang from, and the ground beam at the very bottom. */
function drawBeams(x, n) {
  const rows = rowsOf(n);
  const ys = rows.length > 1 ? [ROW_Y.top, ROW_Y.bottom] : [ROW_Y.single];
  for (const ry of ys) drawGirder(x, -6, beamY(ry), W + 12);
  x.fillStyle = PAL.red;
  x.fillRect(-6, H - 16, W + 12, 16);
}

/**
 * Every glove is the same mitt — blue, a thumb on the left, a yellow cuff,
 * a hook to the beam — and only the English term differs. A pulsing halo
 * marks the one the barrel needs after the second miss; a lifted one has
 * just been raised.
 */
function drawGlove(x, host, i) {
  const n = host.gloves;
  const p = glovePos(i, n);
  const still = host.reduceMotion;
  const lifting = host.lift && host.lift.gi === i && host.lift.t > 0 && !still;
  const lift = lifting ? host.lift.t * 48 : 0;
  const lit = host.pulse > 0 && host.pulseG === i;
  const aided = host.errs.some((e) => !e.dead && e.aided && host.menu[i] === e.item);
  const y = p.y - lift;
  // Hook.
  x.strokeStyle = PAL.cyan;
  x.lineWidth = 3;
  x.beginPath();
  x.moveTo(p.x, beamY(p.y) + GIRDER_H);
  x.lineTo(p.x, y - GLOVE_H / 2 - 4);
  x.stroke();
  x.fillStyle = PAL.cyan;
  x.beginPath();
  x.arc(p.x, y - GLOVE_H / 2 - 4, 4, 0, 6.283);
  x.fill();
  // Mitt.
  x.fillStyle = INK;
  engine.rr(x, p.x - GLOVE_W / 2 + 3, y - GLOVE_H / 2 + 4, GLOVE_W, GLOVE_H, 20);
  x.fill();
  if (lit || aided) {
    x.shadowColor = PAL.yellow;
    x.shadowBlur = still ? 16 : 14 + 6 * Math.sin(host.t * 7);
  }
  x.fillStyle = PAL.blue;
  engine.rr(x, p.x - GLOVE_W / 2, y - GLOVE_H / 2, GLOVE_W, GLOVE_H, 20);
  x.fill();
  x.beginPath();
  x.arc(p.x - GLOVE_W / 2 + 2, y + 6, 12, 0, 6.283);
  x.fill();
  x.shadowBlur = 0;
  x.fillStyle = PAL.yellow;
  engine.rr(x, p.x - GLOVE_W / 2, y + GLOVE_H / 2 - 12, GLOVE_W, 12, 4);
  x.fill();
  x.fillStyle = LIGHT;
  x.fillRect(p.x - GLOVE_W / 2 + 10, y - GLOVE_H / 2 + 4, GLOVE_W - 20, 2);
  if (lit || aided) {
    x.strokeStyle = PAL.yellow;
    x.globalAlpha = still ? 0.9 : 0.6 + 0.4 * Math.sin(host.pulse * 14);
    x.lineWidth = 3;
    engine.rr(x, p.x - GLOVE_W / 2 - 4, y - GLOVE_H / 2 - 4, GLOVE_W + 8, GLOVE_H + 8, 22);
    x.stroke();
    x.globalAlpha = 1;
  }
  // The term.
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const sizes = [13, 12, 11, 10, 9];
  const { ls, s } = fitText(x, labelOf(host.menu[i]), GLOVE_W - 14, 3, 700, FONT, sizes);
  const lh = s + 1;
  ls.forEach((l, j) => bit(x, l, p.x, y - 6 + (j - (ls.length - 1) / 2) * lh, PAL.yellow));
  // Keyboard: the selection ring, and the digit that raises this glove.
  if (host.kbUsed) {
    if (host.sel === i) {
      x.strokeStyle = PAL.cyan;
      x.lineWidth = 3;
      engine.rr(x, p.x - GLOVE_W / 2 - 8, y - GLOVE_H / 2 - 8, GLOVE_W + 16, GLOVE_H + 16, 24);
      x.stroke();
    }
    x.fillStyle = PAL.cyan;
    engine.rr(x, p.x + GLOVE_W / 2 - 12, y - GLOVE_H / 2 - 10, 18, 18, 4);
    x.fill();
    x.font = `700 12px ${FONT}`;
    x.fillStyle = BLACK;
    x.fillText(String(i + 1), p.x + GLOVE_W / 2 - 3, y - GLOVE_H / 2 - 1);
  }
}

// ─── the count ───────────────────────────────────

function drawCount(x, host) {
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  x.font = `700 24px ${FONT}`;
  bit(x, `${host.made}/${host.needed}`, 18, 36, PAL.yellow);
  x.font = `700 10px ${FONT}`;
  bit(x, host.state.lang === 'en' ? 'CAUGHT' : 'PRESI', 18, 58, PAL.cyan);
}

// ─── the frame ───────────────────────────────────

export function drawScene(host, x) {
  x.setTransform(host.sc, 0, 0, host.sc, 0, 0);
  x.clearRect(0, 0, W, H);
  x.save();
  engine.shake(host, x, host.shake);

  x.fillStyle = BLACK;
  x.fillRect(-8, -8, W + 16, H + 16);
  drawPanel(x, host);
  drawTower(x);
  drawChute(x);
  for (const e of host.errs) if (!e.dead) drawBarrel(x, host, e);
  drawBeams(x, host.gloves);
  for (let i = 0; i < host.gloves; i++) drawGlove(x, host, i);
  drawCount(x, host);

  engine.drawParts(x, host.parts);
  if (host.flash > 0) {
    x.fillStyle = `rgba(250,204,21,${(host.flash * 0.08).toFixed(3)})`;
    x.fillRect(0, 0, W, H);
  }
  if (host.zap > 0) {
    x.fillStyle = `rgba(249,168,212,${(host.zap * 0.14).toFixed(3)})`;
    x.fillRect(0, 0, W, H);
  }
  if (host.props && host.props.diagnostica) {
    const t = host.errs.find((e) => !e.dead);
    x.font = `700 10px ${FONT}`;
    x.textAlign = 'left';
    const tag = `c${host.chapter + 1}.${host.state.beat + 1} ${t ? labelOf(t.item) : '—'}`;
    bit(x, tag, 12, H - 26, PAL.cyan);
  }
  x.restore();
}
