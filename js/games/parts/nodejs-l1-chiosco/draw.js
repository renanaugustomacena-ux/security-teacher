/**
 * Il chiosco di notte — the glass, drawn in register R10 «Fiera e baraccone»
 * (ricerca/42 §42.4): a fairground food booth at night.
 *
 * PALETTE (six named colours, none of them the app's gold):
 *   rosso tendone #C8102E · crema #FFF4D6 · legno #A0623A · giallo insegna
 *   #FFC72C · blu notte #1D4E89 · lampadina #FFE9A8. Depth and ink are black
 *   at low alpha over the same six, never a seventh hue: the faces too are
 *   cream or wood, like the counter they lean on (ricerca/42 §42.6 #3).
 * FIGURE: the fairgoer at the window — round head, a hat you can name (cap,
 *   cone, bowler, bow), a paper ticket held out over the counter.
 * GROUND: the wooden counter the ticket lies on, and the worktop the hobs
 *   stand on. Everything the vendor makes sits on the shelf or goes out
 *   through the hatch.
 * MOVEMENT: things pop up and drop back (ease-out-back): a customer springs
 *   up at the window, the ticket swings like a pendulum, a changed ticket
 *   flips over, a served customer leaves in an arc.
 * TYPEFACE: a slab display for the signs and the bulb-board digits, a round
 *   hand for the tickets. Never the app's Inter.
 *
 * Under `prefers-reduced-motion` nothing here flickers or swings: bulbs hold
 * their glow, the impatient customer's mark is steady, the hint halo is a
 * still ring. The register stays readable because posture — not motion —
 * carries the three patience states (ricerca/10 §10.5).
 */

import * as engine from '../../KaioEngine.js';
import { labelOf, meaningOf } from '../../LevelBeats.js';
import {
  W,
  H,
  CUST_Y,
  COUNTER_Y,
  HOB_R,
  SIGN_Y,
  SHELF_Y,
  HATCH,
  TICKET_W,
  TICKET_ENTRY_H,
  SLAB,
  FONT,
  hobPos,
  ticketH,
  ticketTop,
} from './layout.js';

export const PAL = {
  red: '#C8102E',
  cream: '#FFF4D6',
  wood: '#A0623A',
  yellow: '#FFC72C',
  blue: '#1D4E89',
  bulb: '#FFE9A8',
};

/**
 * Hats, coats and faces of the fairgoers, all from the six: a face is cream
 * or wood, and never the same colour as the coat under it.
 */
export const FIGURES = [
  { hat: 'cap', hatC: PAL.red, body: PAL.blue, skin: PAL.cream },
  { hat: 'cone', hatC: PAL.yellow, body: PAL.red, skin: PAL.wood },
  { hat: 'bowler', hatC: PAL.blue, body: PAL.wood, skin: PAL.cream },
  { hat: 'bow', hatC: PAL.red, body: PAL.yellow, skin: PAL.wood },
  { hat: 'cap', hatC: PAL.yellow, body: PAL.blue, skin: PAL.wood },
  { hat: 'cone', hatC: PAL.red, body: PAL.cream, skin: PAL.wood },
];

/* Fixed star field: pseudo-random from the index, so two frames agree. */
const STARS = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 97 + 13) % W,
  y: (i * 53 + 7) % 120,
  r: 0.8 + (i % 3) * 0.5,
}));

const INK = 'rgba(0,0,0,.85)';
const SHADE = 'rgba(0,0,0,.35)';

/* The harness's context double has no ellipse(); a scaled arc is one anyway. */
function ellipse(x, cx, cy, rx, ry) {
  x.save();
  x.translate(cx, cy);
  x.scale(rx / ry, 1);
  x.beginPath();
  x.arc(0, 0, ry, 0, 6.283);
  x.restore();
}

export function easeBack(t) {
  const k = Math.max(0, Math.min(1, t)) - 1;
  return 1 + 2.7 * k * k * k + 1.7 * k * k;
}

// ─── text ────────────────────────────────────────

export function wrapLines(x, text, maxW, maxL) {
  const words = String(text || '').split(' ');
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

// ─── the night, the tent, the sign ───────────────

function drawBulb(x, bx, by, r, glow) {
  x.shadowColor = PAL.bulb;
  x.shadowBlur = 10 * glow;
  x.fillStyle = PAL.bulb;
  x.globalAlpha = 0.7 + 0.3 * glow;
  x.beginPath();
  x.arc(bx, by, r, 0, 6.283);
  x.fill();
  x.globalAlpha = 1;
  x.shadowBlur = 0;
}

function drawSky(x, host) {
  x.fillStyle = PAL.blue;
  x.fillRect(0, 0, W, COUNTER_Y + 10);
  const v = x.createLinearGradient(0, 0, 0, COUNTER_Y);
  v.addColorStop(0, 'rgba(0,0,0,.55)');
  v.addColorStop(1, 'rgba(0,0,0,.15)');
  x.fillStyle = v;
  x.fillRect(0, 0, W, COUNTER_Y + 10);
  x.fillStyle = PAL.cream;
  for (const s of STARS) {
    x.globalAlpha = 0.5;
    x.beginPath();
    x.arc(s.x, s.y, s.r, 0, 6.283);
    x.fill();
  }
  x.globalAlpha = 1;

  // The bulb string sags between its hooks; under reduced motion the bulbs
  // hold one glow instead of twinkling.
  const still = host.reduceMotion;
  x.strokeStyle = INK;
  x.lineWidth = 1.5;
  x.beginPath();
  x.moveTo(0, 22);
  for (let i = 15; i < W + 30; i += 30) {
    x.lineTo(i - 7, 25);
    x.lineTo(i, 27);
    x.lineTo(i + 7, 25);
    x.lineTo(i + 15, 22);
  }
  x.stroke();
  for (let i = 15, k = 0; i < W; i += 30, k++) {
    const glow = still ? 1 : 0.75 + 0.25 * Math.sin(host.t * 3 + k * 1.7);
    drawBulb(x, i, 30, 4.5, glow);
  }
}

/* A striped tent gable: the booth's roof, the silhouette you would draw first. */
function drawGable(x) {
  x.save();
  x.beginPath();
  x.moveTo(-12, 142);
  x.lineTo(W / 2, 46);
  x.lineTo(W + 12, 142);
  x.closePath();
  x.clip();
  for (let i = -12, k = 0; i < W + 24; i += 36, k++) {
    x.fillStyle = k % 2 ? PAL.cream : PAL.red;
    x.fillRect(i, 40, 36, 110);
  }
  x.fillStyle = 'rgba(0,0,0,.18)';
  x.fillRect(-12, 40, W + 24, 12);
  x.restore();
  // Scalloped hem along the bottom edge of the gable.
  for (let i = 0, k = 0; i < W + 28; i += 28, k++) {
    x.fillStyle = k % 2 ? PAL.red : PAL.cream;
    x.beginPath();
    x.arc(i + 14, 142, 14, 0, Math.PI);
    x.fill();
  }
  x.fillStyle = SHADE;
  x.fillRect(0, 154, W, 6);
  // Pole and pennant at the apex.
  x.fillStyle = INK;
  x.fillRect(W / 2 - 1.5, 14, 3, 36);
  x.fillStyle = PAL.yellow;
  x.beginPath();
  x.moveTo(W / 2 + 1, 16);
  x.lineTo(W / 2 + 34, 24);
  x.lineTo(W / 2 + 1, 32);
  x.closePath();
  x.fill();
}

/* The booth's name board hangs in the gable, framed with bulbs. */
function drawSignboard(x, host) {
  const bw = 168;
  const bh = 38;
  const bx = W / 2 - bw / 2;
  const by = 72;
  x.fillStyle = SHADE;
  engine.rr(x, bx + 3, by + 4, bw, bh, 8);
  x.fill();
  x.fillStyle = PAL.red;
  engine.rr(x, bx, by, bw, bh, 8);
  x.fill();
  x.strokeStyle = PAL.cream;
  x.lineWidth = 2;
  engine.rr(x, bx + 4, by + 4, bw - 8, bh - 8, 5);
  x.stroke();
  x.fillStyle = PAL.cream;
  x.font = `20px ${SLAB}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(host.state.lang === 'en' ? 'NIGHT KIOSK' : 'IL CHIOSCO', W / 2, by + bh / 2 + 1);
  for (let i = 0; i < 9; i++) {
    const t = i / 8;
    drawBulb(x, bx + t * bw, by - 2, 3, 1);
    drawBulb(x, bx + t * bw, by + bh + 2, 3, 1);
  }
}

// ─── the customers ───────────────────────────────

function drawHat(x, pal) {
  x.fillStyle = pal.hatC;
  if (pal.hat === 'cone') {
    x.beginPath();
    x.moveTo(-14, -30);
    x.lineTo(0, -58);
    x.lineTo(14, -30);
    x.closePath();
    x.fill();
    x.fillStyle = PAL.cream;
    x.fillRect(-6, -42, 12, 4);
  } else if (pal.hat === 'bowler') {
    engine.rr(x, -12, -44, 24, 14, 6);
    x.fill();
    x.fillRect(-19, -32, 38, 4);
  } else if (pal.hat === 'bow') {
    x.beginPath();
    x.moveTo(-2, -36);
    x.lineTo(-14, -44);
    x.lineTo(-14, -28);
    x.closePath();
    x.moveTo(2, -36);
    x.lineTo(14, -44);
    x.lineTo(14, -28);
    x.closePath();
    x.fill();
    x.beginPath();
    x.arc(0, -36, 3.5, 0, 6.283);
    x.fill();
  } else {
    engine.rr(x, -13, -44, 26, 12, 5);
    x.fill();
    x.fillRect(-13, -34, 34, 4);
  }
}

/**
 * Three patience states read from posture (ricerca/10 §10.5): calm, then a
 * pendulum sway, then hopping with a yellow «!» over the head. Under reduced
 * motion the hop and sway are dropped and the «!» stays lit.
 */
function drawCustomer(x, host, k) {
  const still = host.reduceMotion;
  const st = k.pat / k.pat0;
  const pop = easeBack(k.in);
  let cx = k.x;
  let cy = CUST_Y + (1 - pop) * 96;
  let alpha = 1;
  if (k.served) {
    const o = Math.min(1, k.out);
    cx += still ? 0 : o * 140;
    cy -= still ? 0 : Math.sin(o * Math.PI) * 70;
    alpha = 1 - o;
  } else if (!still) {
    if (st < 0.34) cy -= Math.abs(Math.sin(k.wob * 4)) * 7;
    else if (st < 0.66) cx += Math.sin(k.wob * 1.7) * 2.5;
  }
  x.save();
  x.globalAlpha = Math.max(0, alpha);
  x.translate(cx, cy);
  x.fillStyle = k.pal.body;
  engine.rr(x, -22, 0, 44, 62, 9);
  x.fill();
  x.fillStyle = PAL.cream;
  x.fillRect(-9, 0, 18, 10);
  x.fillStyle = k.pal.skin;
  x.beginPath();
  x.arc(0, -16, 17, 0, 6.283);
  x.fill();
  x.fillStyle = INK;
  x.fillRect(-7, -20, 3, 4);
  x.fillRect(4, -20, 3, 4);
  if (st < 0.34 && !k.served) {
    x.beginPath();
    x.arc(0, -8, 3, 0, 6.283);
    x.fill();
  } else {
    x.fillRect(-4, -8, 8, 2);
  }
  drawHat(x, k.pal);
  if (st < 0.34 && !k.served) {
    const blink = still ? 1 : 0.7 + 0.3 * Math.sin(k.wob * 6);
    x.globalAlpha = Math.max(0, alpha) * blink;
    x.fillStyle = PAL.yellow;
    x.beginPath();
    x.arc(24, -50, 11, 0, 6.283);
    x.fill();
    x.fillStyle = PAL.red;
    x.font = `16px ${SLAB}`;
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.fillText('!', 24, -49);
  }
  x.restore();
}

function drawSelection(x, host, k) {
  if (!host.kbUsed || host.sel !== k.id) return;
  x.strokeStyle = PAL.yellow;
  x.lineWidth = 3;
  x.beginPath();
  x.arc(k.x, CUST_Y - 10, 34, 0, 6.283);
  x.stroke();
}

/**
 * The ticket speaks Italian: the meaning of the term the customer wants
 * (ricerca/34 §34.1). A face-down ticket shows its wooden back; a taken one
 * fades; a changed one flips. Under reduced motion it hangs still.
 */
function drawTicket(x, host, k) {
  if (k.served) return;
  const still = host.reduceMotion;
  const st = k.pat / k.pat0;
  const pop = easeBack(k.in);
  const n = k.shapes.length;
  const tw = TICKET_W;
  const th = ticketH(n);
  const top = ticketTop() + (1 - pop) * 96;
  const swing = still ? 0 : Math.sin(k.wob * 1.2) * (st < 0.66 ? 0.09 : 0.04);
  const flip = k.flip > 0 ? Math.abs(Math.cos(k.flip * Math.PI)) : 1;
  x.save();
  x.translate(k.x, top);
  x.rotate(swing);
  x.scale(Math.max(0.04, flip), 1);
  x.fillStyle = SHADE;
  engine.rr(x, -tw / 2 + 3, 4, tw, th, 5);
  x.fill();
  if (k.covered) {
    x.fillStyle = PAL.wood;
    engine.rr(x, -tw / 2, 0, tw, th, 5);
    x.fill();
    x.strokeStyle = 'rgba(0,0,0,.45)';
    x.lineWidth = 2;
    x.beginPath();
    x.moveTo(-tw / 2 + 10, 10);
    x.lineTo(tw / 2 - 10, th - 10);
    x.moveTo(tw / 2 - 10, 10);
    x.lineTo(-tw / 2 + 10, th - 10);
    x.stroke();
    x.restore();
    return;
  }
  x.globalAlpha = k.taken ? 0.55 : 1;
  x.fillStyle = PAL.cream;
  engine.rr(x, -tw / 2, 0, tw, th, 5);
  x.fill();
  x.fillStyle = PAL.red;
  x.fillRect(-tw / 2, 0, tw, 7);
  x.fillStyle = 'rgba(0,0,0,.25)';
  for (let py = 14; py < th - 4; py += 8) {
    x.beginPath();
    x.arc(-tw / 2 + 6, py, 1.6, 0, 6.283);
    x.fill();
  }
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  k.shapes.forEach((s, i) => {
    const item = host.menu[s];
    const ey = 12 + i * TICKET_ENTRY_H;
    const done = i < k.stage;
    const { ls, s: size } = fitText(x, meaningOf(item, 'it'), tw - 22, 3, 700, FONT, [11, 10, 9]);
    x.fillStyle = PAL.blue;
    x.globalAlpha = (k.taken ? 0.55 : 1) * (done ? 0.35 : 1);
    ls.forEach((l, j) => x.fillText(l, 4, ey + 8 + j * (size + 2)));
    if (done) {
      x.strokeStyle = PAL.blue;
      x.lineWidth = 2;
      x.beginPath();
      x.moveTo(-tw / 2 + 14, ey + TICKET_ENTRY_H / 2 - 2);
      x.lineTo(tw / 2 - 10, ey + TICKET_ENTRY_H / 2 - 2);
      x.stroke();
    }
  });
  x.restore();
}

// ─── the counter and the worktop ─────────────────

function drawCounter(x) {
  x.fillStyle = PAL.wood;
  x.fillRect(0, COUNTER_Y, W, 34);
  x.fillStyle = 'rgba(255,244,214,.28)';
  x.fillRect(0, COUNTER_Y, W, 4);
  x.fillStyle = 'rgba(0,0,0,.16)';
  for (let k = 26; k < W; k += 104) x.fillRect(k, COUNTER_Y + 4, 1.5, 30);
  x.fillStyle = 'rgba(0,0,0,.42)';
  x.fillRect(0, COUNTER_Y + 34, W, 16);
}

function drawWorktop(x) {
  x.fillStyle = PAL.wood;
  x.fillRect(0, COUNTER_Y + 50, W, H - COUNTER_Y - 50);
  x.fillStyle = 'rgba(0,0,0,.42)';
  x.fillRect(0, COUNTER_Y + 50, W, H - COUNTER_Y - 50);
  x.fillStyle = 'rgba(0,0,0,.2)';
  for (let y = COUNTER_Y + 50; y < H; y += 46) x.fillRect(0, y, W, 2);
  x.fillStyle = 'rgba(255,244,214,.05)';
  for (let y = COUNTER_Y + 52; y < H; y += 46) x.fillRect(0, y, W, 1);
}

/**
 * Every hob is the same object — a tin pan on the worktop, a painted sign on
 * two posts above it — and only the English term on the sign differs
 * (ricerca/00 §0.4 TEST 1). Position is shuffled per beat in the level module.
 */
function drawHob(x, host, i) {
  const p = hobPos(i, host.hobs);
  const item = host.menu[i];
  const job = host.hands.job;
  const on = Boolean(job && job.t === 'cook' && job.i === i);
  const still = host.reduceMotion;
  const aided = host.cust.some(
    (k) => k.aided && k.taken && !k.dead && k.stage < k.shapes.length && k.shapes[k.stage] === i
  );

  // Posts and sign.
  x.fillStyle = 'rgba(0,0,0,.4)';
  x.fillRect(p.x - 40, SIGN_Y + 44, 5, HOB_R + 14);
  x.fillRect(p.x + 35, SIGN_Y + 44, 5, HOB_R + 14);
  x.fillStyle = SHADE;
  engine.rr(x, p.x - 52 + 3, SIGN_Y + 4, 104, 46, 6);
  x.fill();
  if (aided || (host.pulse > 0 && host.pulseHob === i)) {
    x.shadowColor = PAL.yellow;
    x.shadowBlur = still ? 16 : 14 + 6 * Math.sin(host.t * 7);
  }
  x.fillStyle = PAL.wood;
  engine.rr(x, p.x - 52, SIGN_Y, 104, 46, 6);
  x.fill();
  x.shadowBlur = 0;
  x.strokeStyle = aided ? PAL.yellow : PAL.cream;
  x.lineWidth = aided ? 3 : 2;
  engine.rr(x, p.x - 48, SIGN_Y + 4, 96, 38, 4);
  x.stroke();
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const { ls, s } = fitText(x, labelOf(item), 88, 2, 400, SLAB, [16, 14, 12, 11, 10]);
  x.fillStyle = PAL.cream;
  ls.forEach((l, j) => x.fillText(l, p.x, SIGN_Y + 23 + (j - (ls.length - 1) / 2) * (s + 2)));

  // The pan: concentric like a fair target, red rim, cream ring, dark heart.
  x.fillStyle = 'rgba(0,0,0,.45)';
  ellipse(x, p.x, p.y + 8, HOB_R + 6, 12);
  x.fill();
  x.fillStyle = PAL.red;
  x.beginPath();
  x.arc(p.x, p.y, HOB_R, 0, 6.283);
  x.fill();
  x.fillStyle = PAL.cream;
  x.beginPath();
  x.arc(p.x, p.y, HOB_R - 10, 0, 6.283);
  x.fill();
  x.fillStyle = INK;
  x.beginPath();
  x.arc(p.x, p.y, HOB_R - 20, 0, 6.283);
  x.fill();
  if (on) {
    const k = 1 - host.hands.busy / host.hands.total;
    x.strokeStyle = PAL.yellow;
    x.lineWidth = 5;
    x.beginPath();
    x.arc(p.x, p.y, HOB_R + 9, -1.57, -1.57 + 6.283 * k);
    x.stroke();
    // Three tongues of flame; steady under reduced motion.
    x.fillStyle = PAL.yellow;
    for (let f = 0; f < 3; f++) {
      const fh = still ? 10 : 8 + 5 * Math.abs(Math.sin(host.t * 9 + f * 2));
      x.beginPath();
      x.moveTo(p.x - 10 + f * 10, p.y + 6);
      x.lineTo(p.x - 5 + f * 10, p.y + 6 - fh);
      x.lineTo(p.x + f * 10, p.y + 6);
      x.closePath();
      x.fill();
    }
  }
  if (host.pulse > 0 && host.pulseHob === i) {
    x.strokeStyle = PAL.yellow;
    x.globalAlpha = still ? 0.8 : 0.5 + 0.4 * Math.sin(host.pulse * 14);
    x.lineWidth = 5;
    x.beginPath();
    x.arc(p.x, p.y, HOB_R + 16, 0, 6.283);
    x.stroke();
    x.globalAlpha = 1;
  }
  // Keyboard: the digit that fires this hob, on a small tin tag.
  if (host.kbUsed) {
    x.fillStyle = PAL.cream;
    engine.rr(x, p.x + HOB_R - 6, p.y - HOB_R - 6, 18, 18, 4);
    x.fill();
    x.fillStyle = INK;
    x.font = `12px ${SLAB}`;
    x.fillText(String(i + 1), p.x + HOB_R + 3, p.y - HOB_R + 3);
  }
}

// ─── the shelf, the hatch, the hands ─────────────

function drawShelf(x, host) {
  const sy = SHELF_Y;
  x.fillStyle = SHADE;
  x.fillRect(W * 0.16, sy + 8, W * 0.68, 6);
  x.fillStyle = PAL.wood;
  x.fillRect(W * 0.16, sy, W * 0.68, 10);
  x.fillStyle = 'rgba(255,244,214,.25)';
  x.fillRect(W * 0.16, sy, W * 0.68, 2);
  x.fillStyle = PAL.wood;
  x.fillRect(W * 0.16 + 6, sy + 10, 8, 14);
  x.fillRect(W * 0.84 - 14, sy + 10, 8, 14);
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  host.shelf.forEach((s, i) => {
    const px = W * 0.22 + i * 40;
    // A paper cone of something hot: cream with two red stripes.
    x.fillStyle = PAL.cream;
    x.beginPath();
    x.moveTo(px - 15, sy - 30);
    x.lineTo(px + 15, sy - 30);
    x.lineTo(px, sy);
    x.closePath();
    x.fill();
    x.fillStyle = PAL.red;
    x.beginPath();
    x.moveTo(px - 15, sy - 30);
    x.lineTo(px - 9, sy - 30);
    x.lineTo(px - 1, sy - 4);
    x.lineTo(px - 4, sy - 4);
    x.closePath();
    x.fill();
    x.fillStyle = s.for ? PAL.yellow : 'rgba(0,0,0,.5)';
    x.beginPath();
    x.arc(px, sy - 34, 6, 0, 6.283);
    x.fill();
    x.fillStyle = INK;
    x.font = `8px ${SLAB}`;
    const label = wrapLines(x, labelOf(host.menu[s.shape]), 30, 1)[0] || '';
    x.fillText(label, px, sy - 22);
    if (!s.for) {
      x.strokeStyle = 'rgba(0,0,0,.6)';
      x.lineWidth = 2;
      x.beginPath();
      x.moveTo(px - 10, sy - 28);
      x.lineTo(px + 8, sy - 8);
      x.stroke();
    }
  });
}

function drawHatch(x, host) {
  const hw = 124;
  const hh = 70;
  const hx = HATCH.x - hw / 2;
  const hy = HATCH.y - hh / 2;
  x.fillStyle = INK;
  engine.rr(x, hx, hy, hw, hh, 22);
  x.fill();
  x.strokeStyle = PAL.wood;
  x.lineWidth = 5;
  engine.rr(x, hx, hy, hw, hh, 22);
  x.stroke();
  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    drawBulb(x, hx + t * hw, hy - 3, 3, 1);
    drawBulb(x, hx + t * hw, hy + hh + 3, 3, 1);
  }
  x.fillStyle = PAL.yellow;
  x.font = `20px ${SLAB}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(host.state.lang === 'en' ? 'OUT' : 'FUORI', HATCH.x, HATCH.y + 1);
}

/* The vendor's hands: one oven mitt, cream with a red cuff. */
function drawHands(x, host) {
  const h = host.hands;
  const busy = h.busy > 0;
  x.fillStyle = 'rgba(0,0,0,.4)';
  ellipse(x, h.x, h.y + 16, 20, 6);
  x.fill();
  x.save();
  x.translate(h.x, h.y);
  if (busy) x.scale(1.1, 1.1);
  x.fillStyle = PAL.cream;
  engine.rr(x, -17, -14, 34, 28, 11);
  x.fill();
  x.beginPath();
  x.arc(-16, -4, 7, 0, 6.283);
  x.fill();
  x.fillStyle = PAL.red;
  engine.rr(x, -17, 8, 34, 9, 3);
  x.fill();
  x.restore();
  // Queued actions follow the hands as small bulbs (ricerca/10 §10.7).
  for (let i = 0; i < host.queue.length; i++) drawBulb(x, h.x + 24 + i * 10, h.y - 16, 3.5, 1);
}

/* The bulb board: digits of the count, and three bulbs for the customers lost. */
function drawBoard(x, host) {
  const bw = W - 40;
  const bh = 58;
  const bx = 20;
  const by = H - 88;
  x.fillStyle = INK;
  engine.rr(x, bx, by, bw, bh, 10);
  x.fill();
  x.strokeStyle = PAL.wood;
  x.lineWidth = 4;
  engine.rr(x, bx, by, bw, bh, 10);
  x.stroke();
  for (let i = 0; i < 14; i++) {
    const t = i / 13;
    drawBulb(x, bx + t * bw, by, 3, 1);
    drawBulb(x, bx + t * bw, by + bh, 3, 1);
  }
  x.fillStyle = PAL.cream;
  x.font = `28px ${SLAB}`;
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  x.fillText(`${host.made} / ${host.needed}`, bx + 22, by + bh / 2 + 1);
  x.font = `11px ${SLAB}`;
  x.fillStyle = PAL.bulb;
  x.fillText(host.state.lang === 'en' ? 'SERVED' : 'SERVITI', bx + 22, by + bh - 9);
  // Lost customers: a bulb goes dark. Dark, never red (§14.6).
  for (let i = 0; i < 3; i++) {
    const off = i < host.gone;
    const lx = bx + bw - 30 - i * 26;
    if (off) {
      x.strokeStyle = 'rgba(255,233,168,.35)';
      x.lineWidth = 2;
      x.beginPath();
      x.arc(lx, by + bh / 2, 7, 0, 6.283);
      x.stroke();
    } else {
      drawBulb(x, lx, by + bh / 2, 7, 1);
    }
  }
}

// ─── the frame ───────────────────────────────────

export function drawScene(host, x) {
  x.setTransform(host.sc, 0, 0, host.sc, 0, 0);
  x.clearRect(0, 0, W, H);
  x.save();
  engine.shake(host, x, host.shake);

  drawSky(x, host);
  for (const k of host.cust) drawCustomer(x, host, k);
  for (const k of host.cust) drawSelection(x, host, k);
  drawGable(x);
  drawSignboard(x, host);
  drawCounter(x);
  for (const k of host.cust) drawTicket(x, host, k);

  drawWorktop(x);
  for (let i = 0; i < host.hobs; i++) drawHob(x, host, i);
  drawShelf(x, host);
  drawHatch(x, host);
  drawHands(x, host);
  drawBoard(x, host);

  engine.drawParts(x, host.parts);
  if (host.flash > 0) {
    x.fillStyle = `rgba(255,244,214,${(host.flash * 0.1).toFixed(3)})`;
    x.fillRect(0, 0, W, H);
  }
  x.restore();
}
