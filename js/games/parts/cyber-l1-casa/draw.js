/**
 * La casa di notte — the glass, register R14 «Quaderno a penna»: squared
 * paper, a floor plan in pen, stick figures, highlighter plates, a pencil
 * for hands. Everything time-based reads host.t and freezes under
 * prefers-reduced-motion; nothing here reads Math.random.
 */

import * as engine from '../../KaioEngine.js';
import { labelOf, pickLang } from '../../LevelBeats.js';
import {
  W,
  H,
  HAND,
  PAPER,
  GRID,
  INK,
  HILITE,
  PENCIL,
  WASH,
  SPOT,
  PW,
  PH,
  PY,
  meaningText,
  bySlot,
} from './page.js';

// ─── drawing: pen on squared paper ───────────────

/* The boil: one pixel of jitter that alternates every two frames. Frozen
   under reduced motion, so two frames of the same state draw the same page. */
function jit(host, i) {
  if (host.reduceMotion) return 0;
  const phase = Math.floor(host.t * 8) % 2;
  return (i % 2) ^ phase ? 0.7 : -0.7;
}

function pen(x, host, pts, close) {
  x.beginPath();
  pts.forEach((p, i) => {
    const j = jit(host, i);
    if (i) x.lineTo(p[0] + j, p[1] - j);
    else x.moveTo(p[0] + j, p[1] - j);
  });
  if (close) x.closePath();
  x.stroke();
}

function penRect(x, host, rx, ry, w, h) {
  pen(
    x,
    host,
    [
      [rx, ry],
      [rx + w, ry],
      [rx + w, ry + h],
      [rx, ry + h],
    ],
    true
  );
}

function penCircle(x, host, cx, cy, r) {
  x.beginPath();
  x.arc(cx + jit(host, 0), cy + jit(host, 1) * 0.5, r, 0, 6.283);
  x.stroke();
}

function dashed(x, host, x0, y0, x1, y1, step) {
  const len = Math.hypot(x1 - x0, y1 - y0);
  const n = Math.max(1, Math.floor(len / step));
  x.beginPath();
  for (let i = 0; i < n; i += 2) {
    const a = i / n;
    const b = Math.min(1, (i + 1) / n);
    const j = jit(host, i);
    x.moveTo(x0 + (x1 - x0) * a, y0 + (y1 - y0) * a + j);
    x.lineTo(x0 + (x1 - x0) * b, y0 + (y1 - y0) * b + j);
  }
  x.stroke();
}

function hatch(x, rx, ry, w, h, step) {
  x.save();
  x.beginPath();
  x.rect(rx, ry, w, h);
  x.clip();
  x.beginPath();
  for (let d = -h; d < w; d += step) {
    x.moveTo(rx + d, ry + h);
    x.lineTo(rx + d + h, ry);
  }
  x.stroke();
  x.restore();
}

function wrapLines(x, text, maxW, maxL) {
  const words = String(text).split(' ');
  const out = [];
  let line = '';
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (x.measureText(t).width > maxW && line) {
      out.push(line);
      line = w;
    } else line = t;
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

function drawPaper(x) {
  x.fillStyle = PAPER;
  x.fillRect(-8, -8, W + 16, H + 16);
  x.strokeStyle = GRID;
  x.lineWidth = 1;
  x.beginPath();
  for (let gx = 13; gx < W; gx += 26) {
    x.moveTo(gx, 0);
    x.lineTo(gx, H);
  }
  for (let gy = 13; gy < H; gy += 26) {
    x.moveTo(0, gy);
    x.lineTo(W, gy);
  }
  x.stroke();
  // The margin line of the notebook, doubled.
  x.beginPath();
  x.moveTo(30, 0);
  x.lineTo(30, H);
  x.moveTo(33, 0);
  x.lineTo(33, H);
  x.stroke();
}

function drawHeader(host, x) {
  const lang = host.state.lang === 'en' ? 'en' : 'it';
  x.strokeStyle = INK;
  x.lineWidth = 2;
  penCircle(x, host, 62, 52, 16);
  x.fillStyle = PAPER;
  x.beginPath();
  x.arc(70, 46, 14, 0, 6.283);
  x.fill();
  x.strokeStyle = PENCIL;
  x.lineWidth = 1;
  hatch(x, 46, 40, 16, 26, 5);
  x.fillStyle = INK;
  x.font = `700 22px ${HAND}`;
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  x.fillText(pickLang('La casa di notte / The house at night', lang), 92, 52);
  x.fillStyle = PENCIL;
  x.font = `500 14px ${HAND}`;
  x.textAlign = 'right';
  const ch = host.CH ? host.CH[host.chapter] : null;
  const chapterName = ch ? pickLang(`${ch.t[0]} / ${ch.t[1]}`, lang) : '';
  x.fillText(`${host.chapter + 1}.${(host.state.beat || 0) + 1} · ${chapterName}`, W - 18, 78);

  // Three candles in the margin: a lost fact blows one out (pencil cross, never red).
  const left = host.state.left || 0;
  for (let i = 0; i < 3; i++) {
    const cx = W - 26;
    const cy = 112 + i * 36;
    x.strokeStyle = INK;
    x.lineWidth = 1.5;
    penRect(x, host, cx - 6, cy, 12, 20);
    if (i < left) {
      x.strokeStyle = PENCIL;
      x.lineWidth = 2;
      pen(x, host, [
        [cx - 10, cy - 10],
        [cx + 10, cy + 22],
      ]);
      pen(x, host, [
        [cx + 10, cy - 10],
        [cx - 10, cy + 22],
      ]);
    } else {
      x.fillStyle = HILITE;
      x.beginPath();
      x.moveTo(cx, cy - 12);
      x.lineTo(cx + 4, cy - 4);
      x.lineTo(cx, cy - 1);
      x.lineTo(cx - 4, cy - 4);
      x.closePath();
      x.fill();
      x.strokeStyle = INK;
      x.lineWidth = 1;
      x.stroke();
    }
  }
}

function drawCrack(host, x, cr) {
  const fx = SPOT[cr.spot].x;
  if (!cr.fixed) {
    x.strokeStyle = INK;
    x.lineWidth = 3;
    pen(x, host, [
      [fx - 26, 392],
      [fx - 8, 404],
      [fx - 20, 418],
      [fx + 2, 432],
      [fx - 6, 440],
    ]);
    x.strokeStyle = PENCIL;
    x.lineWidth = 1;
    pen(x, host, [
      [fx - 22, 396],
      [fx - 4, 406],
      [fx - 16, 420],
      [fx + 6, 434],
    ]);
    if (cr.item) {
      x.font = `500 12px ${HAND}`;
      const ls = wrapLines(x, meaningText(cr.item), 96, 2);
      const w = Math.max(...ls.map((l) => x.measureText(l).width)) + 14;
      const nx = Math.min(W - w - 4, Math.max(36, fx - w / 2));
      x.fillStyle = PAPER;
      x.fillRect(nx, 444, w, ls.length * 14 + 8);
      x.strokeStyle = PENCIL;
      x.lineWidth = 1;
      penRect(x, host, nx, 444, w, ls.length * 14 + 8);
      x.fillStyle = INK;
      x.textAlign = 'center';
      x.textBaseline = 'middle';
      ls.forEach((l, i) => x.fillText(l, nx + w / 2, 444 + 11 + i * 14));
    }
  } else {
    x.save();
    x.translate(fx - 10, 414);
    x.rotate(-0.5);
    x.fillStyle = HILITE;
    x.fillRect(-9, -30, 18, 60);
    x.strokeStyle = INK;
    x.lineWidth = 1.5;
    penRect(x, host, -9, -30, 18, 60);
    x.restore();
  }
}

/* The house from above: a floor plan in pen, the openings on the north wall. */
function drawPlan(host, x) {
  // yard fence, in pencil dashes
  x.strokeStyle = PENCIL;
  x.lineWidth = 1.5;
  dashed(x, host, 236, 414, 406, 414, 8);
  dashed(x, host, 406, 414, 406, 520, 8);
  dashed(x, host, 406, 520, 236, 520, 8);
  // the house walls
  x.fillStyle = 'rgba(215,227,244,.35)';
  x.fillRect(36, 414, 200, 106);
  x.strokeStyle = INK;
  x.lineWidth = 3.5;
  penRect(x, host, 36, 414, 200, 106);
  x.lineWidth = 1.5;
  pen(x, host, [
    [130, 414],
    [130, 470],
    [36, 470],
  ]);
  // furniture in pencil
  x.strokeStyle = PENCIL;
  x.lineWidth = 1;
  penRect(x, host, 48, 430, 30, 34);
  penRect(x, host, 48, 430, 30, 10);
  penCircle(x, host, 180, 490, 13);
  penRect(x, host, 100, 480, 22, 30);
  // the tree in the yard
  penCircle(x, host, 330, 476, 22);
  penCircle(x, host, 322, 470, 14);
  penCircle(x, host, 340, 482, 12);
  // path to the gate
  for (let i = 0; i < 5; i++)
    pen(x, host, [
      [268 + i * 3, 424 + i * 16],
      [274 + i * 3, 426 + i * 16],
    ]);

  const prowl = host.evs.some((e) => !e.dead && e.kind === 'prowl');
  // window: a gap with two thin lines
  x.fillStyle = PAPER;
  x.fillRect(46, 409, 36, 10);
  x.strokeStyle = INK;
  x.lineWidth = 1.5;
  pen(x, host, [
    [46, 411],
    [82, 411],
  ]);
  pen(x, host, [
    [46, 417],
    [82, 417],
  ]);
  // door: a gap and its swing
  x.fillStyle = PAPER;
  x.fillRect(150, 409, 40, 10);
  x.strokeStyle = INK;
  x.lineWidth = 2;
  x.beginPath();
  x.arc(150, 414, 40, 0, 1.5708);
  x.stroke();
  pen(x, host, [
    [150, 414],
    [150, 454],
  ]);
  // the handle jiggles while someone is at the door (frozen under reduced motion)
  const jig = prowl && !host.reduceMotion ? Math.sin(host.t * 10) * 2.5 : 0;
  x.lineWidth = 2.5;
  pen(x, host, [
    [184, 424 + jig],
    [184, 434 + jig],
  ]);
  // gate: a gap in the fence and a bar across it
  x.fillStyle = PAPER;
  x.fillRect(258, 409, 36, 10);
  x.strokeStyle = INK;
  x.lineWidth = 2;
  pen(x, host, [
    [258, 414],
    [290, 396],
  ]);
  for (let i = 0; i < 4; i++)
    pen(x, host, [
      [262 + i * 8, 414 - i * 4.5],
      [262 + i * 8, 420 - i * 4.5],
    ]);
  // the strongbox by the fence
  x.fillStyle = PAPER;
  x.fillRect(360, 398, 36, 32);
  x.strokeStyle = INK;
  x.lineWidth = 2;
  penRect(x, host, 360, 398, 36, 32);
  pen(x, host, [
    [360, 398],
    [396, 430],
  ]);
  pen(x, host, [
    [396, 398],
    [360, 430],
  ]);
  // the tray for the copy
  x.strokeStyle = PENCIL;
  x.lineWidth = 1.5;
  penRect(x, host, W - 40, 486, 28, 20);
  if (host.shed) {
    x.fillStyle = HILITE;
    x.fillRect(W - 37, 491, 22, 12);
    x.strokeStyle = INK;
    x.lineWidth = 1;
    penRect(x, host, W - 37, 491, 22, 12);
  }
  for (const cr of host.cracks) drawCrack(host, x, cr);
}

function drawNote(host, x, cx, bottom, text) {
  x.font = `600 13px ${HAND}`;
  const ls = wrapLines(x, text, 150, 2);
  const w = Math.max(...ls.map((l) => x.measureText(l).width)) + 18;
  const h = ls.length * 16 + 12;
  const nx = Math.min(W - w - 6, Math.max(36, cx - w / 2));
  const ny = bottom - h;
  x.fillStyle = PAPER;
  x.fillRect(nx, ny, w, h);
  x.strokeStyle = INK;
  x.lineWidth = 1.5;
  penRect(x, host, nx, ny, w, h);
  pen(x, host, [
    [cx - 5, ny + h],
    [cx, ny + h + 7],
    [cx + 5, ny + h],
  ]);
  x.fillStyle = INK;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  ls.forEach((l, i) => x.fillText(l, nx + w / 2, ny + 6 + 8 + i * 16));
}

function drawStick(host, x, ex, ey, e, st) {
  const still = host.reduceMotion;
  const restless = st < 0.34;
  const hx = e.kind === 'stranger' && !still ? ex + Math.sin(e.wob * 2.5) * 6 : ex;
  x.strokeStyle = INK;
  x.lineWidth = 2.2;
  x.save();
  if (e.kind === 'snoop') {
    x.translate(ex, ey + 14);
    x.rotate(0.18);
    x.translate(-ex, -(ey + 14));
  }
  penCircle(x, host, hx, ey - 22, 9);
  pen(x, host, [
    [ex, ey - 13],
    [ex, ey + 14],
  ]);
  const arm = restless ? -14 : 4;
  if (e.kind === 'prowl')
    pen(x, host, [
      [ex, ey - 4],
      [ex + 26, ey + 8],
    ]);
  else
    pen(x, host, [
      [ex - 12, ey + arm],
      [ex, ey - 4],
      [ex + 12, ey + arm],
    ]);
  pen(x, host, [
    [ex - 9, ey + 30],
    [ex, ey + 14],
    [ex + 9, ey + 30],
  ]);
  if (e.kind === 'snoop') {
    x.lineWidth = 1.5;
    penCircle(x, host, hx + 3, ey - 23, 2.5);
  }
  x.restore();
  if (e.taken) {
    x.strokeStyle = PENCIL;
    x.lineWidth = 1.5;
    for (let i = 0; i < 12; i++) {
      const a0 = (i / 12) * 6.283;
      const a1 = a0 + 0.3;
      x.beginPath();
      x.arc(ex, ey, 34, a0, a1);
      x.stroke();
    }
  }
}

function drawRain(host, x, ex, ey, e) {
  x.strokeStyle = INK;
  x.lineWidth = 2;
  x.fillStyle = PAPER;
  for (const [dx, dy, r] of [
    [-14, 0, 13],
    [2, -8, 15],
    [16, 0, 12],
  ]) {
    x.beginPath();
    x.arc(ex + dx, ey + dy, r, 0, 6.283);
    x.fill();
    penCircle(x, host, ex + dx, ey + dy, r);
  }
  x.strokeStyle = PENCIL;
  x.lineWidth = 1;
  hatch(x, ex - 24, ey - 6, 48, 16, 6);
  x.strokeStyle = INK;
  x.lineWidth = 1.5;
  for (let i = 0; i < 3; i++) {
    const dy = host.reduceMotion ? i * 20 : (e.wob * 140 + i * 45) % 96;
    pen(x, host, [
      [ex - 12 + i * 12, ey + 14 + dy],
      [ex - 14 + i * 12, ey + 24 + dy],
    ]);
  }
}

function drawParcel(host, x, ex, ey, e) {
  const still = host.reduceMotion;
  const tw = !still && Math.sin(e.wob * 3) > 0.92 ? 1.07 : 1;
  x.save();
  x.translate(ex, ey);
  x.scale(tw, tw);
  x.translate(-ex, -ey);
  x.fillStyle = PAPER;
  x.fillRect(ex - 23, ey - 18, 46, 36);
  x.strokeStyle = PENCIL;
  x.lineWidth = 1;
  hatch(x, ex - 23, ey - 18, 46, 36, 7);
  x.strokeStyle = INK;
  x.lineWidth = 2;
  penRect(x, host, ex - 23, ey - 18, 46, 36);
  pen(x, host, [
    [ex, ey - 18],
    [ex, ey + 18],
  ]);
  pen(x, host, [
    [ex - 23, ey],
    [ex + 23, ey],
  ]);
  x.restore();
  if (e.sniffed) {
    x.strokeStyle = INK;
    x.lineWidth = 2.5;
    if (e.bad) {
      const pts = [];
      for (let i = 0; i < 8; i++) {
        const a = i * 0.785;
        const r1 = i % 2 ? 7 : 14;
        pts.push([ex + Math.cos(a) * r1, ey - 36 + Math.sin(a) * r1]);
      }
      pen(x, host, pts, true);
    } else {
      x.beginPath();
      x.arc(ex, ey - 38, 9, 0.5, 2.64);
      x.stroke();
      penCircle(x, host, ex - 4, ey - 41, 1.2);
      penCircle(x, host, ex + 4, ey - 41, 1.2);
    }
  }
}

function drawEvent(host, x, e) {
  const still = host.reduceMotion;
  const st = e.pat / e.pat0;
  const wf = st < 0.34 ? 3.4 : st < 0.66 ? 1.7 : 1;
  const wob = still ? 0 : Math.sin(e.wob * wf) * (st < 0.34 ? 4 : 2);
  const ex = e.x;
  const ey = e.y + wob - 40 * (1 - e.in);
  const fl = e.flip > 0 ? Math.abs(Math.cos(e.flip * 3.14)) : 1;
  x.save();
  x.globalAlpha = Math.min(1, e.in * 1.4);
  x.translate(ex, ey);
  x.scale(fl, 1);
  x.translate(-ex, -ey);
  if (e.kind === 'rain') drawRain(host, x, ex, ey, e);
  else if (e.kind === 'parcel') drawParcel(host, x, ex, ey, e);
  else drawStick(host, x, ex, ey, e, st);
  x.restore();
  // Third state of patience: a pencil ring, breathing only when motion is allowed.
  if (st < 0.34 && e.kind !== 'parcel') {
    x.strokeStyle = PENCIL;
    x.lineWidth = still ? 2 : 1.5 + Math.sin(e.wob * 6);
    penCircle(x, host, ex, e.kind === 'rain' ? ey : ey - 6, 30);
  }
  const top =
    e.kind === 'rain' ? ey - 30 : e.kind === 'parcel' ? ey - (e.sniffed ? 56 : 26) : ey - 38;
  drawNote(host, x, ex, top, meaningText(e.item));
}

function drawPlate(host, x, p, sel) {
  const still = host.reduceMotion;
  const k = Math.min(1, p.in * 1.6);
  // highlighter stroke first, then the pen outline draws itself in
  x.fillStyle = HILITE;
  x.beginPath();
  x.moveTo(p.x + 4, p.y + 4);
  x.lineTo(p.x + PW - 2, p.y + 6);
  x.lineTo(p.x + PW - 6, p.y + PH - 4);
  x.lineTo(p.x + 2, p.y + PH - 6);
  x.closePath();
  x.fill();
  x.strokeStyle = INK;
  x.lineWidth = 1.8;
  const pts = [
    [p.x, p.y],
    [p.x + PW, p.y],
    [p.x + PW, p.y + PH],
    [p.x, p.y + PH],
  ];
  const n = Math.max(2, Math.ceil(k * 5));
  pen(x, host, pts.concat([pts[0]]).slice(0, n));
  x.globalAlpha = k;
  x.fillStyle = INK;
  x.font = `700 15px ${HAND}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const ls = wrapLines(x, labelOf(p.item), PW - 14, 2);
  ls.forEach((l, i) => x.fillText(l, p.x + PW / 2, p.y + PH / 2 + (i - (ls.length - 1) / 2) * 16));
  x.globalAlpha = 1;
  const hintPlate =
    host.chapter === 0 &&
    (host.state.beat || 0) === 0 &&
    host.resolved === 0 &&
    host.item &&
    p.item === host.item;
  if ((host.pulse > 0 && host.pulseItem === p.item) || hintPlate) {
    const a = still
      ? 0.6
      : hintPlate
        ? 0.35 + 0.2 * Math.sin(host.t * 3)
        : 0.4 + 0.4 * Math.sin(host.pulse * 14);
    x.strokeStyle = `rgba(27,42,73,${a.toFixed(3)})`;
    x.lineWidth = 4;
    penRect(x, host, p.x - 5, p.y - 5, PW + 10, PH + 10);
  }
  if (sel) {
    x.strokeStyle = PENCIL;
    x.lineWidth = 2.5;
    pen(x, host, [
      [p.x + 8, p.y + PH + 6],
      [p.x + PW - 8, p.y + PH + 5],
    ]);
  }
}

function drawHands(host, x) {
  const h = host.hands;
  if (h.busy > 0 && h.at) {
    const k = 1 - h.busy / h.total;
    x.strokeStyle = INK;
    x.lineWidth = 3;
    x.beginPath();
    x.arc(h.at.x, h.at.y, 46, -1.57, -1.57 + 6.283 * k);
    x.stroke();
  }
  // the pencil that runs on the page
  x.save();
  x.translate(h.x, h.y);
  x.rotate(-0.8);
  x.fillStyle = HILITE;
  x.fillRect(-6, -30, 12, 40);
  x.strokeStyle = INK;
  x.lineWidth = 1.8;
  penRect(x, host, -6, -30, 12, 40);
  x.fillStyle = PAPER;
  x.beginPath();
  x.moveTo(-6, 10);
  x.lineTo(6, 10);
  x.lineTo(0, 22);
  x.closePath();
  x.fill();
  x.stroke();
  x.fillStyle = INK;
  x.beginPath();
  x.moveTo(-2, 18);
  x.lineTo(2, 18);
  x.lineTo(0, 22);
  x.closePath();
  x.fill();
  x.restore();
  if (host.queue.length) {
    x.fillStyle = INK;
    for (let i = 0; i < host.queue.length; i++) {
      x.beginPath();
      x.arc(h.x + 22 + i * 9, h.y - 14, 3.2, 0, 6.283);
      x.fill();
    }
  }
}

/* The eraser: what was covered fades as a pencil scribble. */
function drawGhosts(host, x) {
  for (const g of host.ghosts) {
    x.globalAlpha = Math.min(1, g.t * 2) * 0.6;
    x.strokeStyle = PENCIL;
    x.lineWidth = 2;
    const pts = [];
    for (let i = 0; i < 6; i++) pts.push([g.x - 22 + i * 9, g.y + (i % 2 ? 12 : -12)]);
    pen(x, host, pts);
  }
  x.globalAlpha = 1;
}

export function draw(host, x) {
  const sc = host.sc || 1;
  x.setTransform(sc, 0, 0, sc, 0, 0);
  x.save();
  engine.shake(host, x, host.shake);
  drawPaper(x);
  drawHeader(host, x);
  drawPlan(host, x);
  drawGhosts(host, x);
  for (const e of host.evs) if (!e.dead) drawEvent(host, x, e);

  // the legend of plates
  const rows = Math.max(1, Math.ceil(host.plates.length / 3));
  x.fillStyle = WASH;
  x.fillRect(10, PY - 14, W - 20, rows * 54 + 18);
  x.strokeStyle = PENCIL;
  x.lineWidth = 1;
  penRect(x, host, 10, PY - 14, W - 20, rows * 54 + 18);
  for (const p of bySlot(host)) drawPlate(host, x, p, host.kbUsed && p.slot === host.sel);

  drawHands(host, x);
  x.fillStyle = INK;
  x.font = `600 20px ${HAND}`;
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  // The night is held when the facts are covered AND the cracks are mended:
  // the counter carries both, so it never reads full while a crack waits.
  const cracks = host.cracks.filter((c) => c.item);
  const held = (host.resolved || 0) + cracks.filter((c) => c.fixed).length;
  x.fillText(`${held} / ${(host.need || 0) + cracks.length}`, 44, H - 30);
  engine.drawParts(x, host.parts);
  if (host.flash > 0) {
    x.fillStyle = `rgba(255,241,118,${(host.flash * 0.18).toFixed(3)})`;
    x.fillRect(0, 0, W, H);
  }
  x.restore();
}
