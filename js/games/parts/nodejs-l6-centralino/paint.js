/**
 * Il centralino di notte — the glass, painted in R11 Flipper (ricerca/42
 * §42.4): a green playfield with chrome guides and a chase of rollover lamps,
 * pop bumpers with the term on an ivory plaque, chrome balls on a cable with
 * an amber matrix tag, drop targets for the stamps, two flippers, and a DMD
 * backglass whose numerals are 5×7 dots. Under reduced motion nothing
 * decorative moves: the chase holds, the ring glows steady, the flippers
 * rest, the ball stops swaying (§15.4).
 */

import * as engine from '../../KaioEngine.js';
import { labelOf, meaningOf } from '../../LevelBeats.js';
import { W, H, BOARD, STAMPY, STAMPS, PAL, DOTS, RAIL, jackXY, stampXY } from './tables.js';

const SANS = '"Raleway","Inter",system-ui,sans-serif';
const MONO = '"JetBrains Mono","Consolas",monospace';

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

/* Dot-matrix numerals, centred on (cx, cy): lit dots amber, unlit dots ember. */
function drawDots(x, text, cx, cy, cell, on, off) {
  const s = String(text);
  const width = (6 * s.length - 1) * cell;
  let gx = cx - width / 2;
  for (const ch of s) {
    const g = DOTS[ch] || DOTS[' '];
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 5; c++) {
        const lit = g[r][c] === '1';
        if (!lit && !off) continue;
        x.fillStyle = lit ? on : off;
        x.beginPath();
        x.arc(
          gx + c * cell + cell / 2,
          cy - 3.5 * cell + r * cell + cell / 2,
          lit ? cell * 0.42 : cell * 0.16,
          0,
          6.283
        );
        x.fill();
      }
    }
    gx += 6 * cell;
  }
}

function drawField(host, x) {
  x.fillStyle = PAL.field;
  x.fillRect(-8, -8, W + 16, H + 16);
  // The cabinet's aprons and the incline: darker bands that narrow upward.
  x.fillStyle = PAL.apron;
  x.beginPath();
  x.moveTo(0, 0);
  x.lineTo(26, 0);
  x.lineTo(14, H);
  x.lineTo(0, H);
  x.closePath();
  x.fill();
  x.beginPath();
  x.moveTo(W, 0);
  x.lineTo(W - 26, 0);
  x.lineTo(W - 14, H);
  x.lineTo(W, H);
  x.closePath();
  x.fill();
  x.fillRect(0, H - 40, W, 40);
  // Lane arrows painted on the field, the way a playfield is illustrated.
  x.fillStyle = 'rgba(244,235,208,.10)';
  for (let y = 120; y < BOARD - 90; y += 44) {
    x.beginPath();
    x.moveTo(W / 2 - 14, y);
    x.lineTo(W / 2 + 14, y);
    x.lineTo(W / 2, y + 18);
    x.closePath();
    x.fill();
  }
}

/* Two chrome guides with a reflection line and a chase of rollover lamps.
   Under reduced motion the chase holds on its first lamp. */
function drawRails(host, x) {
  const top = 100;
  const bot = BOARD - 88;
  for (const sx of [W / 2 - RAIL, W / 2 + RAIL]) {
    x.strokeStyle = PAL.steel;
    x.lineWidth = 7;
    x.beginPath();
    x.moveTo(sx, top);
    x.lineTo(sx, bot);
    x.stroke();
    x.strokeStyle = PAL.chrome;
    x.lineWidth = 3;
    x.beginPath();
    x.moveTo(sx - 1, top);
    x.lineTo(sx - 1, bot);
    x.stroke();
    x.strokeStyle = PAL.ivory;
    x.lineWidth = 1;
    x.beginPath();
    x.moveTo(sx - 2, top + 4);
    x.lineTo(sx - 2, bot - 4);
    x.stroke();
  }
  const lamps = 6;
  const on = host.reduceMotion ? 0 : Math.floor(host.t * 8) % lamps;
  for (let i = 0; i < lamps; i++) {
    const ly = top + 18 + ((bot - top - 36) * i) / (lamps - 1);
    for (const sx of [W / 2 - RAIL - 16, W / 2 + RAIL + 16]) {
      x.fillStyle = i === on ? PAL.amber : PAL.ember;
      x.beginPath();
      x.arc(sx, ly, 4.5, 0, 6.283);
      x.fill();
    }
  }
}

function drawBackglass(host, x) {
  // The DMD: a black matrix window in a chrome bezel, the score in dots.
  x.fillStyle = PAL.steel;
  engine.rr(x, 12, 10, W - 24, 82, 10);
  x.fill();
  x.fillStyle = PAL.dmd;
  engine.rr(x, 18, 16, W - 36, 70, 7);
  x.fill();
  drawDots(x, `${host.made}/${host.needed}`, 88, 51, 5, PAL.amber, PAL.ember);
  // Three lamps: a dropped call puts one out. Ember, never red (§14.6).
  const left = host.state.left || 0;
  for (let i = 0; i < 3; i++) {
    const lx = W - 60 - i * 34;
    const off = i < left;
    x.fillStyle = off ? PAL.ember : PAL.amber;
    x.beginPath();
    x.arc(lx, 51, 9, 0, 6.283);
    x.fill();
    if (!off) {
      x.fillStyle = PAL.ivory;
      x.beginPath();
      x.arc(lx - 3, 48, 3, 0, 6.283);
      x.fill();
    }
  }
}

function jackLit(host, i) {
  if (host.pulse > 0 && host.pulseJ === i) return true;
  const j = host.jacks[i];
  if (!j || !host.aided.has(j.item)) return false;
  return host.calls.some((k) => k.live && k.item === j.item);
}

/* The figure: a pop bumper — red cap, ivory skirt, a ring of lamps — with the
   term on a plastic plaque under it. Every bumper is the same bumper; only
   the plaque's word differs (TEST 1). */
function drawJack(host, x, i) {
  const n = host.jacks.length;
  const s = jackXY(n, i);
  const j = host.jacks[i];
  const lit = jackLit(host, i);
  const plugged = host.calls.find((k) => k.plugged && k.jack === i);
  const kb = host.kbUsed && host.kj === i;

  x.fillStyle = 'rgba(0,0,0,.28)';
  x.beginPath();
  x.arc(s.x + 3, s.y + 5, 27, 0, 6.283);
  x.fill();
  x.fillStyle = PAL.ivory;
  x.beginPath();
  x.arc(s.x, s.y, 27, 0, 6.283);
  x.fill();
  // The ring of lamps: steady ember, amber when the bumper is the hint.
  let glow = 0;
  if (lit) glow = host.reduceMotion ? 1 : 0.6 + 0.4 * Math.sin(host.t * 14);
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * 6.283;
    x.fillStyle = lit ? PAL.amber : PAL.ember;
    x.globalAlpha = lit ? 0.5 + 0.5 * glow : 1;
    x.beginPath();
    x.arc(s.x + Math.cos(a) * 21, s.y + Math.sin(a) * 21, 3, 0, 6.283);
    x.fill();
  }
  x.globalAlpha = 1;
  x.fillStyle = PAL.red;
  x.beginPath();
  x.arc(s.x, s.y, 15, 0, 6.283);
  x.fill();
  x.fillStyle = PAL.dmd;
  x.beginPath();
  x.arc(s.x, s.y, 6, 0, 6.283);
  x.fill();
  if (plugged) {
    x.fillStyle = PAL.chrome;
    x.beginPath();
    x.arc(s.x, s.y, 9, 0, 6.283);
    x.fill();
  }
  if (lit) {
    x.strokeStyle = PAL.amber;
    x.lineWidth = host.reduceMotion ? 4 : 2 + 2 * glow;
    x.beginPath();
    x.arc(s.x, s.y, 31, 0, 6.283);
    x.stroke();
  }
  if (kb) {
    x.strokeStyle = PAL.ivory;
    x.lineWidth = 2;
    x.beginPath();
    x.arc(s.x, s.y, 35, 0, 6.283);
    x.stroke();
  }

  // The plaque: an ivory plate screwed under the bumper, the term in green.
  const pw = W / Math.min(3, n) - 16;
  const py = s.y + 30;
  x.fillStyle = PAL.ivory;
  engine.rr(x, s.x - pw / 2, py, pw, 30, 5);
  x.fill();
  x.fillStyle = PAL.steel;
  x.beginPath();
  x.arc(s.x - pw / 2 + 6, py + 6, 1.8, 0, 6.283);
  x.arc(s.x + pw / 2 - 6, py + 6, 1.8, 0, 6.283);
  x.fill();
  let f = 13;
  x.font = `700 ${f}px ${SANS}`;
  const label = j ? labelOf(j.item) : '';
  while (f > 9 && x.measureText(label).width > (pw - 10) * 1.9) {
    f--;
    x.font = `700 ${f}px ${SANS}`;
  }
  const ls = wrapLines(x, label, pw - 10, 2);
  x.fillStyle = PAL.apron;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  if (ls.length === 1) x.fillText(ls[0], s.x, py + 15);
  else {
    x.fillText(ls[0], s.x, py + 9);
    x.fillText(ls[1], s.x, py + 22);
  }
}

function drawBoard(host, x) {
  const n = host.jacks.length;
  const rows = Math.ceil(n / Math.min(3, Math.max(1, n)));
  const bh = rows * 86 + 34;
  x.fillStyle = PAL.apron;
  engine.rr(x, 14, BOARD - 52, W - 28, bh, 12);
  x.fill();
  x.strokeStyle = PAL.chrome;
  x.lineWidth = 3;
  engine.rr(x, 14, BOARD - 52, W - 28, bh, 12);
  x.stroke();
  for (let i = 0; i < n; i++) drawJack(host, x, i);
}

/* The ball: a chrome sphere on its cable, with the lit tag above it — the
   world speaks Italian on the tag, the sockets speak English (ricerca/34). */
function drawBall(host, x, cx, cy, c, held) {
  // The cable from the plunger, sampled in straight segments.
  const sway = held ? 0 : Math.sin(c.sway) * 9;
  x.strokeStyle = PAL.steel;
  x.lineWidth = 3;
  x.beginPath();
  x.moveTo(W / 2, 92);
  for (let i = 1; i <= 4; i++) {
    const k = i / 4;
    const mx = W / 2 + (cx + sway * 2 - W / 2) * k;
    const my = 92 + (cy - 18 - 92) * k;
    x.lineTo(mx + Math.sin(k * 3.14) * sway, my);
  }
  x.stroke();

  // The tag: a small matrix window with the meaning in amber.
  x.font = `600 13px ${SANS}`;
  const ls = wrapLines(x, meaningOf(c.item, 'it'), 190, 2);
  const tw = Math.max(120, Math.max(...ls.map((l) => x.measureText(l).width)) + 26);
  const th = ls.length * 17 + 30;
  const tx = Math.min(W - tw - 6, Math.max(6, cx - tw / 2));
  const ty = cy - 24 - th;
  x.fillStyle = 'rgba(0,0,0,.35)';
  engine.rr(x, tx + 3, ty + 4, tw, th, 6);
  x.fill();
  x.fillStyle = held ? PAL.chrome : PAL.steel;
  engine.rr(x, tx, ty, tw, th, 6);
  x.fill();
  x.fillStyle = PAL.dmd;
  engine.rr(x, tx + 4, ty + 4, tw - 8, th - 8, 4);
  x.fill();
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillStyle = PAL.amber;
  ls.forEach((l, i) => x.fillText(l, tx + tw / 2, ty + 14 + i * 17));
  // The method chip: the call still carries its verb (chapter 3, chapter 5).
  x.font = `700 10px ${MONO}`;
  x.fillStyle = PAL.chrome;
  x.fillText(c.m, tx + tw / 2, ty + th - 12);

  // The sphere.
  x.fillStyle = 'rgba(0,0,0,.35)';
  x.beginPath();
  x.arc(cx + 3, cy + 5, 16, 0, 6.283);
  x.fill();
  x.fillStyle = PAL.steel;
  x.beginPath();
  x.arc(cx, cy, 16, 0, 6.283);
  x.fill();
  x.fillStyle = PAL.chrome;
  x.beginPath();
  x.arc(cx - 2, cy - 2, 12, 0, 6.283);
  x.fill();
  x.fillStyle = PAL.ivory;
  x.beginPath();
  x.arc(cx - 6, cy - 6, 4, 0, 6.283);
  x.fill();
  if (held) {
    x.strokeStyle = PAL.amber;
    x.lineWidth = 2;
    x.beginPath();
    x.arc(cx, cy, 19, 0, 6.283);
    x.stroke();
  }
}

/* The stamps: four drop targets standing in a row, each with a matrix
   numeral. All lit while a plugged call waits for its stamp; the 404 target
   alone lights as the hint — for the pulse after the second error, and again
   whenever an aided orphan is in the lane (the same rule as the bumpers). */
function drawStamps(host, x) {
  x.fillStyle = PAL.apron;
  engine.rr(x, 14, STAMPY - 44, W - 28, 88, 10);
  x.fill();
  x.strokeStyle = PAL.chrome;
  x.lineWidth = 2;
  engine.rr(x, 14, STAMPY - 44, W - 28, 88, 10);
  x.stroke();
  const act = Boolean(host.pending);
  const hint =
    (host.pulse > 0 && host.pulseStamp) ||
    host.calls.some((k) => k.live && k.noSocket && host.aided.has(k.item));
  STAMPS.forEach((s, i) => {
    const p = stampXY(i);
    const lit = act || (hint && s === '404');
    x.fillStyle = 'rgba(0,0,0,.3)';
    engine.rr(x, p.x - 29, p.y - 24, 62, 54, 6);
    x.fill();
    x.fillStyle = PAL.ivory;
    engine.rr(x, p.x - 32, p.y - 28, 62, 54, 6);
    x.fill();
    x.fillStyle = PAL.dmd;
    engine.rr(x, p.x - 27, p.y - 22, 52, 34, 4);
    x.fill();
    drawDots(x, s, p.x - 1, p.y - 5, 3, lit ? PAL.amber : PAL.ember, null);
    x.fillStyle = lit ? PAL.amber : PAL.ember;
    x.beginPath();
    x.arc(p.x - 1, p.y + 19, 3.5, 0, 6.283);
    x.fill();
  });
}

/* Two flippers at the foot of the field: chrome with red rubber. They flip
   on an answered call; under reduced motion they hold. */
function drawFlippers(host, x) {
  const kick = host.reduceMotion ? 0 : Math.max(0, host.flash) * 0.45;
  for (const side of [-1, 1]) {
    x.save();
    x.translate(W / 2 + side * 92, H - 62);
    x.rotate(side * (0.42 - kick));
    x.fillStyle = PAL.red;
    engine.rr(x, side < 0 ? -6 : -70, -9, 76, 18, 9);
    x.fill();
    x.fillStyle = PAL.chrome;
    engine.rr(x, side < 0 ? -3 : -64, -5, 66, 10, 5);
    x.fill();
    x.fillStyle = PAL.steel;
    x.beginPath();
    x.arc(0, 0, 8, 0, 6.283);
    x.fill();
    x.restore();
  }
}

export function draw(host, x) {
  const sc = host.sc || 1;
  x.setTransform(sc, 0, 0, sc, 0, 0);
  x.save();
  engine.shake(host, x, host.shake || 0);
  drawField(host, x);
  drawRails(host, x);
  if (host.cfg) drawBoard(host, x);
  // The backglass sits under the balls: a tag that leaves the plunger lane
  // high up rides over the DMD instead of hiding behind it.
  drawBackglass(host, x);

  for (const k of host.calls) {
    if (!k.live) continue;
    if (host.drag && host.drag.c === k) continue;
    const s = k.plugged ? jackXY(host.jacks.length, k.jack) : null;
    const cx = s ? s.x : W / 2 + Math.sin(k.sway) * 9;
    const cy = s ? s.y - 46 : k.y;
    drawBall(host, x, cx, cy, k, false);
  }
  if (host.drag) drawBall(host, x, host.drag.x, host.drag.y, host.drag.c, true);

  if (host.cfg && host.cfg.stamp) drawStamps(host, x);
  drawFlippers(host, x);
  engine.drawParts(x, host.parts);
  if (host.flash > 0) {
    x.fillStyle = `rgba(244,235,208,${(host.flash * 0.08).toFixed(3)})`;
    x.fillRect(0, 0, W, H);
  }
  if (host.props && host.props.diagnostica) {
    x.fillStyle = PAL.ivory;
    x.font = `500 12px ${MONO}`;
    x.textAlign = 'left';
    x.textBaseline = 'alphabetic';
    const want = host.pending ? host.pending.want : '—';
    const en = host.state.lang === 'en';
    x.fillText(
      `c${host.chapter + 1}.${host.state.beat + 1}  ${en ? 'sockets' : 'prese'} ${host.jacks.length}  ${
        en ? 'waiting' : 'attesa'
      } ${want}`,
      30,
      H - 14
    );
  }
  x.restore();
}
