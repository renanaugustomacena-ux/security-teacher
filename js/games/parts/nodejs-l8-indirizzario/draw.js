/**
 * L'indirizzario — the glass. Everything painted comes from the R13 register
 * (ricerca/42 §42.4, Carta e tessere): a sheet of paper on a desk, cream
 * tiles with a paper edge and a two-pixel shadow, a light wooden rack, ink
 * letters in a serif, digits in a sans; green for what passed, yellow for the
 * hint, grey for what was refused. Never red for a wrong answer (§14.6).
 *
 * Figure: the rubber stamp — a knob, a wooden handle, a flared base, an inked
 * plate — and the luggage-tag docket hanging from a nail. Ground: the desk
 * and the tile rack. Movement: tiles slide from the rack to the strip and
 * flip as they hook; the docket sways on its string.
 *
 * Under prefers-reduced-motion the sway, the flip, the pop and the pulse hold
 * still; the same frame drawn twice with time advanced is identical.
 */

import * as engine from '../../KaioEngine.js';
import {
  W,
  H,
  NAIL,
  TAG,
  ROW_Y,
  METHODS,
  METH_R,
  SLOT_Y,
  SLOT_H,
  SLOT_X0,
  BUILT_H,
  TRAY,
  TILE_H,
  DESK_Y,
  STAMP,
  PAL,
  SERIF,
  SANS,
  methPos,
  tileW,
} from './layout.js';

function wrapLines(x, text, maxW, maxL) {
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

/** Shrink a font until the text fits `maxW` on `maxL` lines. */
function fitText(x, text, maxW, maxL, weight, family, sizes) {
  let ls = [String(text)];
  let s = sizes[0];
  for (const size of sizes) {
    s = size;
    x.font = `${weight} ${size}px ${family}`;
    ls = wrapLines(x, text, maxW, maxL);
    const widest = Math.max(...ls.map((l) => x.measureText(l).width));
    if (ls.length <= maxL && widest <= maxW && !ls[ls.length - 1].endsWith('…')) break;
  }
  x.font = `${weight} ${s}px ${family}`;
  return { ls, s };
}

// ─── ground: paper, desk, rack, strip ────────────

function drawPaper(x) {
  x.fillStyle = PAL.paper;
  x.fillRect(-8, -8, W + 16, H + 16);
  // The ruled grid of the sheet: the ground everything sits on.
  x.strokeStyle = 'rgba(217,201,163,.38)';
  x.lineWidth = 1;
  for (let y = 46; y < DESK_Y; y += 46) {
    x.beginPath();
    x.moveTo(0, y);
    x.lineTo(W, y);
    x.stroke();
  }
}

function drawDesk(x) {
  x.fillStyle = PAL.wood;
  x.fillRect(0, DESK_Y, W, H - DESK_Y);
  x.fillStyle = PAL.edge;
  x.fillRect(0, DESK_Y, W, 6);
  // The grain: a few long strokes in the edge tone.
  x.strokeStyle = 'rgba(217,201,163,.9)';
  x.lineWidth = 1.5;
  for (let i = 0; i < 5; i++) {
    const y = DESK_Y + 40 + i * 52;
    x.beginPath();
    x.moveTo(20 + i * 30, y);
    x.lineTo(W - 60 + i * 10, y + 6);
    x.stroke();
  }
}

function drawRack(x) {
  x.fillStyle = PAL.edge;
  engine.rr(x, TRAY.x, TRAY.y + 3, TRAY.w, TRAY.h, 10);
  x.fill();
  x.fillStyle = PAL.wood;
  engine.rr(x, TRAY.x, TRAY.y, TRAY.w, TRAY.h, 10);
  x.fill();
  x.strokeStyle = PAL.ink;
  x.lineWidth = 1.5;
  engine.rr(x, TRAY.x, TRAY.y, TRAY.w, TRAY.h, 10);
  x.stroke();
}

function drawStrip(host, x) {
  const top = SLOT_Y - SLOT_H / 2;
  x.fillStyle = PAL.edge;
  engine.rr(x, 10, top + 2, W - 20, SLOT_H, 6);
  x.fill();
  x.fillStyle = PAL.cream;
  engine.rr(x, 10, top, W - 20, SLOT_H, 6);
  x.fill();
  x.strokeStyle = PAL.ink;
  x.lineWidth = 1.5;
  engine.rr(x, 10, top, W - 20, SLOT_H, 6);
  x.stroke();
  // The ruled baseline the tiles stand on.
  x.fillStyle = 'rgba(28,27,26,.28)';
  x.fillRect(18, SLOT_Y + BUILT_H / 2 + 2, W - 36, 1.5);

  x.font = `700 17px ${SERIF}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillStyle = PAL.ink;
  let px = SLOT_X0;
  for (const t of host.built) {
    x.fillText('/', px, SLOT_Y);
    px += 12 + t.bw + 4;
  }
  x.fillText('/', px, SLOT_Y);
  px += 14;
  // Dashes for what is still missing (R13: righe di trattini).
  x.fillStyle = 'rgba(28,27,26,.5)';
  for (let i = 0; i < 5 && px + 10 < W - 20; i++) {
    x.fillRect(px, SLOT_Y + 9, 8, 2);
    px += 13;
  }
  if (!host.built.length) {
    x.fillStyle = PAL.grey;
    x.font = `italic 13px ${SERIF}`;
    x.textAlign = 'left';
    x.fillText(host.state.lang === 'en' ? 'hook the tiles' : 'aggancia le tessere', px + 6, SLOT_Y);
  }
}

// ─── the tiles ───────────────────────────────────

function drawTile(host, x, t, i) {
  const still = host.reduceMotion;
  const inTray = t.where === 'tray';
  const w = inTray ? tileW(host.tiles.length) : t.bw;
  const h = inTray ? TILE_H : BUILT_H;
  const pop = t.pop > 0 && !still ? 1 + 0.06 * t.pop : 1;
  const flip = t.flip > 0 && !still ? Math.max(0.08, Math.abs(1 - 2 * t.flip)) : 1;
  const lit = host.pulse > 0 && host.pulseK === t.id;
  const cursor = host.kbUsed && inTray && host.sel === i;

  x.save();
  x.translate(t.x, t.y);
  x.scale(pop * flip, pop);
  // The two-pixel paper shadow, then the cream face and its edge.
  x.fillStyle = PAL.edge;
  engine.rr(x, -w / 2, -h / 2 + 2, w, h, 4);
  x.fill();
  x.fillStyle = PAL.cream;
  engine.rr(x, -w / 2, -h / 2, w, h, 4);
  x.fill();
  if (lit) {
    // The hint: the right tile glows yellow. Under reduced motion the glow
    // is a steady halo instead of a breath.
    const a = still ? 0.85 : 0.55 + 0.4 * Math.sin(host.pulse * 15);
    x.strokeStyle = `rgba(201,180,88,${a.toFixed(3)})`;
    x.lineWidth = 3.5;
    x.shadowColor = PAL.yellow;
    x.shadowBlur = still ? 12 : 10 + 6 * Math.sin(host.t * 6);
  } else {
    x.strokeStyle = cursor ? PAL.ink : PAL.edge;
    x.lineWidth = cursor ? 2.5 : 1.5;
  }
  engine.rr(x, -w / 2, -h / 2, w, h, 4);
  x.stroke();
  x.shadowBlur = 0;

  x.fillStyle = PAL.ink;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const base = inTray ? 15 : Math.round(14 * (host.builtScale || 1));
  const sizes = [];
  for (let s = base; s >= 9; s--) sizes.push(s);
  const { ls } = fitText(x, t.label, w - 14, inTray ? 2 : 1, 700, SERIF, sizes);
  const lh = inTray ? 17 : 15;
  ls.forEach((l, k) => x.fillText(l, 0, (k - (ls.length - 1) / 2) * lh + 1));
  if (host.kbUsed && inTray && i < 9) {
    x.fillStyle = PAL.grey;
    x.font = `600 10px ${SANS}`;
    x.textAlign = 'left';
    x.fillText(String(i + 1), -w / 2 + 6, -h / 2 + 9);
  }
  x.restore();
}

/** The empty place of a tile that left the rack: a row of dashes. */
function drawGap(host, x, t) {
  const w = tileW(host.tiles.length);
  x.fillStyle = 'rgba(28,27,26,.35)';
  for (let k = 0; k < 6; k++) {
    x.fillRect(t.home.x - w / 2 + 8 + k * ((w - 16) / 6), t.home.y + TILE_H / 2 - 6, 8, 2);
  }
}

function drawTiles(host, x) {
  host.tiles.forEach((t) => {
    if (t.where !== 'tray') drawGap(host, x, t);
  });
  host.tiles.forEach((t, i) => {
    if (t.where === 'tray') drawTile(host, x, t, i);
  });
  host.tiles.forEach((t, i) => {
    if (t.where !== 'tray') drawTile(host, x, t, i);
  });
}

// ─── the figures: stamps ─────────────────────────

/** A small round stamp: a knob, a stub of handle, a round face with the word. */
function drawMethod(host, x, i) {
  const m = METHODS[i];
  const q = methPos(i);
  const on = host.meth === m;
  const still = host.reduceMotion;
  const lit = host.pulse > 0 && host.pulseM === m;
  const lift = on ? -7 : 0;
  x.save();
  x.translate(q.x, q.y + lift);
  // Shadow on the paper.
  x.fillStyle = PAL.edge;
  x.beginPath();
  x.arc(0, 3 - lift * 0.4, METH_R, 0, 6.283);
  x.fill();
  // Handle stub and knob above the face.
  x.fillStyle = PAL.wood;
  engine.rr(x, -6, -METH_R - 16, 12, 18, 4);
  x.fill();
  x.strokeStyle = PAL.ink;
  x.lineWidth = 1.5;
  engine.rr(x, -6, -METH_R - 16, 12, 18, 4);
  x.stroke();
  x.fillStyle = PAL.wood;
  x.beginPath();
  x.arc(0, -METH_R - 18, 7, 0, 6.283);
  x.fill();
  x.stroke();
  // The face.
  x.fillStyle = PAL.cream;
  x.beginPath();
  x.arc(0, 0, METH_R, 0, 6.283);
  x.fill();
  if (lit) {
    const a = still ? 0.9 : 0.55 + 0.4 * Math.sin(host.pulse * 15);
    x.strokeStyle = `rgba(201,180,88,${a.toFixed(3)})`;
    x.lineWidth = 3.5;
  } else {
    x.strokeStyle = on ? PAL.green : PAL.ink;
    x.lineWidth = on ? 3.5 : 1.5;
  }
  x.beginPath();
  x.arc(0, 0, METH_R, 0, 6.283);
  x.stroke();
  x.fillStyle = on ? PAL.green : PAL.ink;
  x.font = `700 ${m.length > 4 ? 10 : 12}px ${SANS}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(m, 0, 1);
  if (host.kbUsed) {
    x.fillStyle = PAL.grey;
    x.font = `600 9px ${SANS}`;
    x.fillText('↑↓', 0, METH_R + 11);
  }
  x.restore();
}

/** The big inspection stamp: knob, handle, flared base, inked plate. */
function drawStamp(host, x) {
  const still = host.reduceMotion;
  const press = still ? 0 : host.press * 9;
  const cx = STAMP.x;
  const cy = STAMP.y + press;
  x.save();
  // Shadow on the desk.
  x.fillStyle = 'rgba(28,27,26,.18)';
  x.beginPath();
  x.arc(cx, STAMP.y + 16, 62, 0, 6.283);
  x.fill();
  // Knob and handle.
  x.fillStyle = PAL.wood;
  x.strokeStyle = PAL.ink;
  x.lineWidth = 2;
  x.beginPath();
  x.arc(cx, cy - 74, 15, 0, 6.283);
  x.fill();
  x.stroke();
  engine.rr(x, cx - 11, cy - 68, 22, 46, 8);
  x.fill();
  x.stroke();
  // Flared base.
  x.beginPath();
  x.moveTo(cx - 40, cy - 22);
  x.lineTo(cx + 40, cy - 22);
  x.lineTo(cx + 56, cy + 6);
  x.lineTo(cx - 56, cy + 6);
  x.closePath();
  x.fill();
  x.stroke();
  // Inked plate.
  x.fillStyle = PAL.ink;
  engine.rr(x, cx - 58, cy + 6, 116, 10, 3);
  x.fill();
  x.fillStyle = PAL.ink;
  x.font = `700 13px ${SANS}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(host.state.lang === 'en' ? 'INSPECT' : 'COLLAUDA', cx, cy - 8);
  if (host.kbUsed) {
    x.fillStyle = PAL.grey;
    x.font = `600 10px ${SANS}`;
    x.fillText(host.state.lang === 'en' ? 'enter' : 'invio', cx, cy + 30);
  }
  x.restore();
}

// ─── the docket and the count ────────────────────

function drawCounters(host, x) {
  x.fillStyle = PAL.ink;
  x.font = `700 20px ${SANS}`;
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  x.fillText(`${host.made}/${host.needed}`, 22, ROW_Y);
  x.font = `500 11px ${SERIF}`;
  x.fillStyle = PAL.grey;
  x.fillText(host.state.lang === 'en' ? 'dockets passed' : 'bolle collaudate', 76, ROW_Y + 1);
  // Three inspection marks: a refused address fills one grey (never red).
  for (let i = 0; i < 3; i++) {
    const mx = W - 24 - i * 24;
    const used = i < host.bad;
    x.beginPath();
    x.arc(mx, ROW_Y, 7, 0, 6.283);
    if (used) {
      x.fillStyle = PAL.grey;
      x.fill();
    } else {
      x.strokeStyle = PAL.ink;
      x.lineWidth = 1.5;
      x.stroke();
    }
  }
}

function drawTag(host, x, ask) {
  const still = host.reduceMotion;
  const sway = still
    ? 0
    : Math.sin(host.t * 1.3) * 0.02 + host.reject * Math.sin(host.reject * 20) * 0.04;
  x.save();
  x.translate(NAIL.x, NAIL.y);
  x.rotate(sway);
  x.translate(-NAIL.x, -NAIL.y);
  // The nail and the string.
  x.fillStyle = PAL.ink;
  x.beginPath();
  x.arc(NAIL.x, NAIL.y, 4, 0, 6.283);
  x.fill();
  x.strokeStyle = PAL.grey;
  x.lineWidth = 1.5;
  x.beginPath();
  x.moveTo(NAIL.x, NAIL.y);
  x.lineTo(NAIL.x, TAG.y + 14);
  x.stroke();
  // The tag: a pentagon with a hole near the apex.
  const l = TAG.x - TAG.w / 2;
  const r = TAG.x + TAG.w / 2;
  const t = TAG.y;
  const b = TAG.y + TAG.h;
  const tag = () => {
    x.beginPath();
    x.moveTo(TAG.x, t);
    x.lineTo(r, t + 26);
    x.lineTo(r, b);
    x.lineTo(l, b);
    x.lineTo(l, t + 26);
    x.closePath();
  };
  x.fillStyle = PAL.edge;
  x.translate(0, 3);
  tag();
  x.fill();
  x.translate(0, -3);
  x.fillStyle = PAL.cream;
  tag();
  x.fill();
  x.strokeStyle = PAL.ink;
  x.lineWidth = 1.5;
  tag();
  x.stroke();
  x.fillStyle = PAL.paper;
  x.beginPath();
  x.arc(TAG.x, t + 14, 5, 0, 6.283);
  x.fill();
  x.stroke();

  // The request, in Italian: the world speaks Italian, the tiles English.
  x.fillStyle = PAL.ink;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const { ls, s } = fitText(x, ask, TAG.w - 36, 3, 600, SERIF, [16, 15, 14, 13, 12]);
  const lh = s + 4;
  const y0 = t + 30 + (b - 12 - (t + 30)) / 2 - ((ls.length - 1) * lh) / 2;
  ls.forEach((line, k) => x.fillText(line, TAG.x, y0 + k * lh));

  // The clock of the burst chapters: an ink thread burning down.
  if (host.cfg && host.cfg.timer) {
    const k = Math.max(0, Math.min(1, host.timer / host.cfg.timer));
    x.fillStyle = PAL.edge;
    x.fillRect(l + 14, b - 10, TAG.w - 28, 3);
    x.fillStyle = PAL.ink;
    x.fillRect(l + 14, b - 10, (TAG.w - 28) * k, 3);
  }

  // The imprint: green when the address passed, grey when it was refused.
  const mark = (alpha, colour, text) => {
    x.save();
    x.globalAlpha = Math.max(0, Math.min(1, alpha));
    x.translate(r - 44, b - 34);
    x.rotate(-0.28);
    x.strokeStyle = colour;
    x.lineWidth = 3;
    x.beginPath();
    x.arc(0, 0, 24, 0, 6.283);
    x.stroke();
    x.fillStyle = colour;
    x.font = `700 9px ${SANS}`;
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.fillText(text, 0, 0);
    x.restore();
  };
  if (host.ok > 0) mark(host.ok * 1.4, PAL.green, host.state.lang === 'en' ? 'PASSED' : 'OK');
  if (host.reject > 0)
    mark(host.reject * 1.4, PAL.grey, host.state.lang === 'en' ? 'REFUSED' : 'RESPINTO');
  x.restore();
}

// ─── the frame ───────────────────────────────────

export function drawScene(host, x, ask) {
  const sc = host.sc || 1;
  x.setTransform(sc, 0, 0, sc, 0, 0);
  x.clearRect(0, 0, W, H);
  x.save();
  engine.shake(host, x, host.shake);
  drawPaper(x);
  drawDesk(x);
  drawRack(x);
  drawStrip(host, x);
  for (let i = 0; i < METHODS.length; i++) drawMethod(host, x, i);
  drawStamp(host, x);
  drawCounters(host, x);
  drawTiles(host, x);
  drawTag(host, x, ask);
  engine.drawParts(x, host.parts);
  if (host.flash > 0) {
    x.fillStyle = `rgba(106,170,100,${(host.flash * 0.1).toFixed(3)})`;
    x.fillRect(0, 0, W, H);
  }
  x.restore();
}
