/* eslint-disable no-shadow -- WIP checkpoint 2026-09-14: new games moved to the Godot app, this web port is frozen as-is */
/**
 * IL MAGAZZINO — chapters 4-6 of «La discesa, il magazzino, la soglia».
 * Match-3 (ricerca/14, Candy Crush) ported from
 * knowledge-aio-giochi/templates/nodejs-l5-magazzino and redrawn in register
 * R5 · Travi e scale (ricerca/42 §42.4).
 *
 * A warehouse of red girders and cyan ladders; barrels of one wood roll on
 * every floor, each stamped with an English term of the lesson. The truck's
 * delivery slip asks, in Italian, for the meanings to load. Swapping two
 * neighbours to line up three barrels of the term the slip asks for is the
 * graded pick: the three roll onto the truck. Three of a term nobody asked
 * for is a wrong pick: the move is spent, the barrels roll back.
 *
 * Register: night-blue ground, red riveted girders, cyan ladders, brown
 * barrels, blue truck, yellow slip. Things roll and drop floor by floor;
 * digits in a bitmap-like mono with a one-pixel shadow.
 */

import * as engine from '../../KaioEngine.js';
import { fillers, labelOf, meaningOf } from '../../LevelBeats.js';
import { W, H, grade, openCoach, win, say, wrapLines, fitFont } from './common.js';

export const C = 6;
export const R = 7;
export const S = 66;
export const GX = (W - C * S) / 2;
export const GY = 200;
/** Open orders on the slip at once. */
export const ASK = 2;
/** ricerca/14 §14.5: swap 180 ms, back 220 ms total, clear 260 ms, fall 120 ms/cell. */
const SWAP_S = 0.18;
const BACK_S = 0.2;
const CLEAR_S = 0.26;
const FALL_S = 0.12;

export const PAL = {
  night: '#0A0F2E',
  girder: '#F03C3C',
  ladder: '#22D3EE',
  barrel: '#8B5A2B',
  blue: '#1E40AF',
  pink: '#F9A8D4',
  yellow: '#FACC15',
};

const MONO = (s) => `700 ${s}px "JetBrains Mono","Consolas",monospace`;

/* Beat: parts = kinds of barrel on the floors (the term and real neighbours
   of its lesson), moves on the chalkboard (99 = unlimited), orders to ship,
   trap = the neighbours are the look-alikes of the term. The template's
   version tokens have no counterpart in the vocabulary and are dropped. */
const B = (o) => ({ parts: 4, moves: 12, orders: 4, trap: false, mech: 'magazzino', ...o });

export const CH = [
  {
    t: ['Il caret', 'The caret'],
    titles: [
      ['Uguali', 'Identical'],
      ['Entra ^', '^ arrives'],
      ['Fino al due', 'Up to two'],
      ['Ordine stretto', 'Tight order'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ parts: 3, moves: 99, orders: 3 }),
      B({ parts: 3, moves: 14, orders: 4 }),
      B({ parts: 4, moves: 13, orders: 4 }),
      B({ parts: 5, moves: 8, orders: 5 }),
      B({ parts: 4, moves: 12, orders: 4 }),
    ],
  },
  {
    t: ['La tilde e la x', 'Tilde and x'],
    titles: [
      ['Entra ~', '~ arrives'],
      ['Solo la patch', 'Patch only'],
      ['La x apre', 'x opens up'],
      ['Tre regole', 'Three rules'],
      ['A occhio', 'At a glance'],
    ],
    beats: [
      B({ parts: 3, moves: 14, orders: 4 }),
      B({ parts: 4, moves: 13, orders: 4 }),
      B({ parts: 4, moves: 12, orders: 5 }),
      B({ parts: 5, moves: 8, orders: 5 }),
      B({ parts: 4, moves: 12, orders: 4 }),
    ],
  },
  {
    t: ["Sotto l'uno", 'Below one'],
    titles: [
      ['Zero punto', 'Zero dot'],
      ['Sembra compatibile', 'Looks compatible'],
      ['E invece no', 'And it is not'],
      ['Tutti i casi', 'Every case'],
      ['Tutto il magazzino', 'The whole warehouse'],
    ],
    beats: [
      B({ parts: 3, moves: 14, orders: 3 }),
      B({ parts: 4, moves: 12, orders: 4, trap: true }),
      B({ parts: 4, moves: 11, orders: 5, trap: true }),
      B({ parts: 5, moves: 8, orders: 5, trap: true }),
      B({ parts: 5, moves: 12, orders: 5 }),
    ],
  },
];

// ─── pure board helpers (shared with the suite's bot) ─

/** Runs of three or more barrels of one kind, by row and by column. */
export function findGroups(g) {
  const out = [];
  const push = (run) => {
    if (run.length >= 3) out.push({ cells: run.slice(), k: g[run[0][0]][run[0][1]].k });
  };
  for (let r = 0; r < R; r++) {
    let run = [];
    for (let i = 0; i < C; i++) {
      const t = g[r][i];
      if (t && run.length && g[run[0][0]][run[0][1]].k === t.k) run.push([r, i]);
      else {
        push(run);
        run = t ? [[r, i]] : [];
      }
    }
    push(run);
  }
  for (let i = 0; i < C; i++) {
    let run = [];
    for (let r = 0; r < R; r++) {
      const t = g[r][i];
      if (t && run.length && g[run[0][0]][run[0][1]].k === t.k) run.push([r, i]);
      else {
        push(run);
        run = t ? [[r, i]] : [];
      }
    }
    push(run);
  }
  return out;
}

function touches(gr, cell) {
  return gr.cells.some(([r, i]) => r === cell[0] && i === cell[1]);
}

function swapCells(g, a, b) {
  const t = g[a[0]][a[1]];
  g[a[0]][a[1]] = g[b[0]][b[1]];
  g[b[0]][b[1]] = t;
}

/**
 * The first swap of two neighbours that lines up three barrels of one of
 * the `wanted` kinds (a Set of kind indices), or null when the floor has none.
 */
export function findMove(g, wanted) {
  for (let r = 0; r < R; r++) {
    for (let i = 0; i < C; i++) {
      for (const [dr, di] of [
        [0, 1],
        [1, 0],
      ]) {
        const r2 = r + dr;
        const i2 = i + di;
        if (r2 >= R || i2 >= C) continue;
        const a = [r, i];
        const b = [r2, i2];
        if (g[r][i].k === g[r2][i2].k) continue;
        swapCells(g, a, b);
        const hit = findGroups(g).some(
          (gr) => wanted.has(gr.k) && (touches(gr, a) || touches(gr, b))
        );
        swapCells(g, a, b);
        if (hit) return [a, b];
      }
    }
  }
  return null;
}

// ─── the order slip ──────────────────────────────

/* A trap beat stocks the look-alikes of the term: the neighbours of the
   lesson that share a word with it ("Named Export" beside "Default Export").
   They look compatible and are not — the template's ^0.2.1 against 0.3.0. */
function lookAlikes(session, item, n) {
  const words = (t) =>
    String(t.english)
      .toLowerCase()
      .split(/[^a-z0-9.]+/)
      .filter((w) => w.length >= 3);
  const mine = new Set(words(item));
  const pool = (session.items || []).filter((i) => i !== item && i.lesson === item.lesson);
  const scored = pool
    .map((i) => ({ i, s: words(i).filter((w) => mine.has(w)).length + Math.random() * 0.5 }))
    .sort((a, b) => b.s - a.s);
  const seen = new Set([labelOf(item).toLowerCase()]);
  const out = [];
  for (const { i } of scored) {
    const key = labelOf(i).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(i);
    if (out.length >= n) break;
  }
  if (out.length < n) {
    for (const f of fillers(session, item, n)) {
      const key = labelOf(f).toLowerCase();
      if (out.length >= n) break;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(f);
    }
  }
  return out;
}

function pushOrder(host) {
  if (host.oi >= host.orders.length) return;
  const item = host.orders[host.oi++];
  host.open.push(item);
  // The meaning on the slip is the presentation (mastery 0 → 1).
  item.introduce();
}

function tile(host) {
  return { k: Math.floor(Math.random() * host.kinds.length), dy: 0 };
}

function openKinds(host) {
  return new Set(host.open.map((o) => host.kinds.indexOf(o)));
}

/**
 * No ready-made row on the floor (as the template reseeds), and always a
 * swap that ships one of the open orders — otherwise a new pallet comes in.
 */
function settle(host) {
  let guard = 0;
  while (guard++ < 80) {
    const groups = findGroups(host.g);
    if (groups.length) {
      for (const gr of groups) for (const [r, i] of gr.cells) host.g[r][i] = tile(host);
      continue;
    }
    if (!host.open.length || findMove(host.g, openKinds(host))) return;
    for (let r = 0; r < R; r++) for (let i = 0; i < C; i++) host.g[r][i] = tile(host);
  }
}

export function reset(host, beat, cfg) {
  host.needed = cfg.orders;
  const others = cfg.trap
    ? lookAlikes(host.session, host.item, cfg.parts - 1)
    : fillers(host.session, host.item, cfg.parts - 1);
  host.kinds = [host.item].concat(others);
  // The slip asks the term first, then the neighbours; a long order comes
  // back round the kinds, so every barrel on the floor is a real order.
  host.orders = Array.from({ length: cfg.orders }, (_, j) => host.kinds[j % host.kinds.length]);
  host.oi = 0;
  host.open = [];
  while (host.open.length < ASK && host.oi < host.orders.length) pushOrder(host);
  host.g = [];
  for (let r = 0; r < R; r++) {
    const row = [];
    for (let i = 0; i < C; i++) row.push(tile(host));
    host.g.push(row);
  }
  host.sel = null;
  host.cur = [Math.floor(R / 2), Math.floor(C / 2)];
  host.kbUsed = false;
  host.phase = 'idle';
  host.pt = 0;
  host.pair = null;
  host.clearing = [];
  host.ruler = null;
  host.cascade = 0;
  host.shake = 0;
  host.flash = 0;
  host.made = 0;
  host.shipped = [];
  host.moves = cfg.moves;
  host.failT = 0;
  host.wrongs = new Map();
  host.aided = new Set();
  host.setState({ moves: cfg.moves });
  settle(host);
}

// ─── the verb: swap two neighbours ───────────────

function swap(host, a, b) {
  host.pair = [a, b];
  host.phase = 'swap';
  host.pt = 0;
  engine.snd(host, 'pop', { hz: 360, v: 0.1 });
}

function pickCell(host, r, i) {
  if (host.phase !== 'idle' || host.finished) return;
  if (i < 0 || i >= C || r < 0 || r >= R) {
    host.sel = null;
    return;
  }
  if (!host.sel) {
    host.sel = [r, i];
    engine.snd(host, 'click', { hz: 1400, v: 0.09 });
    return;
  }
  const [sr, si] = host.sel;
  if (sr === r && si === i) {
    host.sel = null;
    return;
  }
  if (Math.abs(sr - r) + Math.abs(si - i) !== 1) {
    // A non-neighbour does not deselect: it selects (ricerca/14 §14.4).
    host.sel = [r, i];
    engine.snd(host, 'click', { hz: 1400, v: 0.09 });
    return;
  }
  swap(host, [sr, si], [r, i]);
  host.sel = null;
}

function spendMove(host) {
  if (host.moves >= 99) return;
  host.moves = Math.max(0, host.moves - 1);
  host.setState({ moves: host.moves });
}

function ladder(host, target, picked) {
  const n = (host.wrongs.get(target) || 0) + 1;
  host.wrongs.set(target, n);
  // 2nd on the same order: its barrels glow (aided). 3rd: the coach.
  if (n >= 2) host.aided.add(target);
  if (n >= 3) {
    openCoach(host, 'no', picked, target);
    host.wrongs.set(target, 0);
  }
}

function fail(host) {
  engine.snd(host, 'whir');
  openCoach(host, 'out', null, host.open[0] || host.item);
  host.failT = 0.3;
}

/**
 * The swap has happened. A row of three of an open order ships (graded
 * right, one attempt per group); a row of three nobody asked for is a wrong
 * pick against the first open order: the move is spent and the barrels roll
 * back (the template left them in place). No row at all costs nothing.
 */
function resolve(host) {
  const [a, b] = host.pair;
  const groups = findGroups(host.g).filter((gr) => touches(gr, a) || touches(gr, b));
  if (!groups.length) {
    host.phase = 'back';
    host.pt = 0;
    engine.snd(host, 'fall');
    return;
  }
  const wanted = openKinds(host);
  const good = groups.filter((gr) => wanted.has(gr.k));
  spendMove(host);
  if (good.length) {
    for (const gr of good) {
      const target = host.open.find((o) => host.kinds.indexOf(o) === gr.k);
      gr.target = target;
      grade(host, target, host.kinds[gr.k], host.aided.has(target));
    }
    host.clearing = good;
    host.phase = 'clear';
    host.pt = 0;
    engine.snd(host, 'tone', {
      from: 520 + host.cascade * 70,
      to: 820 + host.cascade * 90,
      v: 0.16,
    });
    return;
  }
  const gr = groups[0];
  const picked = host.kinds[gr.k];
  const target = host.open[0];
  grade(host, target, picked, host.aided.has(target));
  host.ruler = { cells: gr.cells, pick: picked, target, t: 1.1 };
  engine.snd(host, 'thud', { v: 0.2 });
  host.shake = 0.5;
  ladder(host, target, picked);
  host.phase = 'back';
  host.pt = 0;
  if (host.moves <= 0 && host.made < host.needed) fail(host);
}

function ship(host, gr) {
  const target = gr.target;
  host.open = host.open.filter((o) => o !== target);
  host.shipped.push(gr.k);
  target.clear();
  say(host, labelOf(target));
  pushOrder(host);
}

function collapse(host) {
  for (let i = 0; i < C; i++) {
    let write = R - 1;
    for (let r = R - 1; r >= 0; r--) {
      if (host.g[r][i]) {
        if (write !== r) {
          host.g[write][i] = host.g[r][i];
          host.g[write][i].dy = (write - r) * S;
          host.g[r][i] = null;
        }
        write--;
      }
    }
    for (let r = write; r >= 0; r--) {
      host.g[r][i] = tile(host);
      host.g[r][i].dy = (write + 1 - r) * S;
    }
  }
  host.phase = 'fall';
  host.pt = 0;
}

export function update(host, dt) {
  const m = host.motion;
  if (host.shake > 0) host.shake -= dt * 3.4;
  if (host.flash > 0) host.flash -= dt * 3;
  if (host.ruler) {
    host.ruler.t -= dt;
    if (host.ruler.t <= 0) host.ruler = null;
  }
  host.parts = engine.parts(host.parts, dt, 700);
  if (host.failT > 0) {
    host.failT -= dt;
    if (host.failT <= 0) {
      // Out of moves: the truck left, the floor is restocked on the same
      // orders; the coach that opened stays open over the fresh floor.
      const coachKind = host.coachKind;
      host.reset(host.state.beat);
      host.coachKind = coachKind;
      host.setState({ step: 0 });
    }
    return;
  }
  if (host.finished) return;
  // Reduced motion: every roll and drop runs at 0.7× (§15.4).
  host.pt += dt * m;
  if (host.phase === 'swap' && host.pt >= SWAP_S) {
    swapCells(host.g, host.pair[0], host.pair[1]);
    resolve(host);
  } else if (host.phase === 'back' && host.pt >= BACK_S) {
    swapCells(host.g, host.pair[0], host.pair[1]);
    host.pair = null;
    host.phase = 'idle';
  } else if (host.phase === 'clear' && host.pt >= CLEAR_S) {
    for (const gr of host.clearing) {
      for (const [r, i] of gr.cells) {
        if (!host.g[r][i]) continue;
        engine.burst(host, host.parts, GX + i * S + S / 2, GY + r * S + S / 2, 6, PAL.yellow, {
          up: 20,
          v1: 120,
        });
        host.g[r][i] = null;
      }
      ship(host, gr);
    }
    host.made += host.clearing.length;
    host.flash = 1;
    host.cascade++;
    host.clearing = [];
    host.pair = null;
    host.setState({ step: host.made });
    if (host.made >= host.needed) {
      engine.snd(host, 'chime');
      host.phase = 'idle';
      win(host);
      return;
    }
    collapse(host);
  } else if (host.phase === 'fall' && host.pt >= SWAP_S) {
    let any = false;
    for (let r = 0; r < R; r++)
      for (let i = 0; i < C; i++) {
        const t = host.g[r][i];
        if (t && t.dy > 0) any = true;
      }
    if (!any) {
      // Barrels that happen to line up were not picked by anyone: the
      // template shipped them ungraded, here the pallet is re-stacked.
      settle(host);
      host.cascade = 0;
      host.phase = 'idle';
      if (host.moves <= 0 && host.made < host.needed) fail(host);
    }
  }
  for (let r = 0; r < R; r++)
    for (let i = 0; i < C; i++) {
      const t = host.g[r][i];
      if (t && t.dy > 0) t.dy = Math.max(0, t.dy - (S * dt * m) / FALL_S);
    }
}

// ─── input: tap two neighbours; arrows and space ─

export function tap(host, p) {
  if (host.finished) return;
  host.kbUsed = false;
  const i = Math.floor((p.x - GX) / S);
  const r = Math.floor((p.y - GY) / S);
  pickCell(host, r, i);
}

export function key(host, e) {
  if (host.finished) return;
  const k = e.key;
  const [r, i] = host.cur;
  if (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'ArrowUp' || k === 'ArrowDown') {
    e.preventDefault();
    host.kbUsed = true;
    const di = k === 'ArrowLeft' ? -1 : k === 'ArrowRight' ? 1 : 0;
    const dr = k === 'ArrowUp' ? -1 : k === 'ArrowDown' ? 1 : 0;
    host.cur = [Math.max(0, Math.min(R - 1, r + dr)), Math.max(0, Math.min(C - 1, i + di))];
    engine.snd(host, 'click', { hz: 1000, v: 0.06 });
  } else if (k === ' ' || k === 'Enter') {
    e.preventDefault();
    host.kbUsed = true;
    pickCell(host, r, i);
  }
}

// ─── drawing (R5) ────────────────────────────────

function drawLadder(x, lx, top, bottom) {
  x.fillStyle = PAL.ladder;
  x.fillRect(lx, top, 3, bottom - top);
  x.fillRect(lx + 11, top, 3, bottom - top);
  for (let y = top + 8; y < bottom; y += 20) x.fillRect(lx, y, 14, 3);
}

function drawGirder(x, y, x0, x1) {
  x.fillStyle = PAL.girder;
  x.fillRect(x0, y, x1 - x0, 9);
  x.fillStyle = PAL.night;
  for (let k = x0 + 8; k < x1 - 4; k += 16) x.fillRect(k, y + 3, 3, 3);
}

function drawBarrel(host, x, px, py, t, scl, sel, ruled, glow) {
  const cx = px + S / 2;
  const cy = py + S / 2;
  const w = S - 12;
  const h = S - 8;
  x.save();
  x.translate(cx, cy - (sel ? 5 : 0));
  x.scale(scl, scl);
  x.fillStyle = `rgba(0,0,0,${sel ? 0.55 : 0.35})`;
  engine.rr(x, -w / 2 + 3, -h / 2 + (sel ? 9 : 5), w, h, 10);
  x.fill();
  if (glow) {
    x.shadowColor = PAL.ladder;
    x.shadowBlur = host.reduceMotion ? 14 : 14 + 4 * Math.sin(host.t * 6);
  }
  x.fillStyle = PAL.barrel;
  engine.rr(x, -w / 2, -h / 2, w, h, 10);
  x.fill();
  x.shadowBlur = 0;
  // Two blue hoops: they slide as the barrel rolls down a floor.
  const roll = t.dy > 0 ? (t.dy % 22) - 11 : 0;
  x.fillStyle = PAL.blue;
  x.fillRect(-w / 2, -h / 2 + 8 + roll * 0.4, w, 4);
  x.fillRect(-w / 2, h / 2 - 12 - roll * 0.4, w, 4);
  x.strokeStyle = ruled ? PAL.yellow : sel ? PAL.pink : 'rgba(10,15,46,.6)';
  x.lineWidth = ruled || sel ? 2.5 : 1.5;
  engine.rr(x, -w / 2, -h / 2, w, h, 10);
  x.stroke();
  // The stamped term: the only thing that differs between barrels (TEST 1).
  const label = labelOf(host.kinds[t.k]);
  const fs = fitFont(x, label, w - 8, 12, 9, MONO);
  const ls = wrapLines(x, label, w - 8, 2);
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  ls.forEach((l, j) => {
    const ly = (j - (ls.length - 1) / 2) * (fs + 2) + 1;
    x.fillStyle = PAL.night;
    x.fillText(l, 1, ly + 1);
    x.fillStyle = PAL.yellow;
    x.fillText(l, 0, ly);
  });
  x.restore();
}

function drawSlip(host, x) {
  const sx = 24;
  const sy = 26;
  const sw = W - 48;
  const sh = 150;
  x.fillStyle = 'rgba(0,0,0,.4)';
  engine.rr(x, sx + 4, sy + 5, sw, sh, 6);
  x.fill();
  x.fillStyle = PAL.yellow;
  engine.rr(x, sx, sy, sw, sh, 6);
  x.fill();
  x.fillStyle = PAL.night;
  x.font = MONO(12);
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  x.fillText(
    host.state.lang === 'en' ? 'TRUCK · TO LOAD' : 'CAMION · DA CARICARE',
    sx + 14,
    sy + 18
  );
  x.fillRect(sx + 12, sy + 30, sw - 24, 2);
  host.open.forEach((o, j) => {
    const oy = sy + 52 + j * 40;
    x.fillStyle = PAL.night;
    x.beginPath();
    x.arc(sx + 22, oy, 4, 0, 6.283);
    x.fill();
    x.font = MONO(13);
    const ls = wrapLines(x, meaningOf(o, 'it'), sw - 120, 2);
    ls.forEach((l, i) => x.fillText(l, sx + 34, oy - (ls.length - 1) * 8 + i * 16));
  });
  // The count in the corner: bitmap digits with a one-pixel shadow.
  const count = `${host.made}/${host.needed}`;
  x.font = MONO(22);
  x.textAlign = 'right';
  x.fillStyle = PAL.night;
  x.fillText(count, sx + sw - 12, sy + 22);
  x.fillStyle = PAL.girder;
  x.fillText(count, sx + sw - 13, sy + 21);
  // The chalkboard of moves: cyan ticks, the spent ones gone.
  if (host.moves < 90) {
    x.font = MONO(11);
    x.fillStyle = PAL.night;
    x.fillText(host.state.lang === 'en' ? 'MOVES' : 'MOSSE', sx + sw - 12, sy + 52);
    for (let i = 0; i < Math.min(host.moves, 14); i++) {
      x.fillStyle = PAL.blue;
      x.fillRect(sx + sw - 16 - i * 9, sy + 62, 4, 16);
    }
  }
  if (host.ruler) {
    // The stamp of the refused row: the meaning asked, the term lined up.
    const ry = sy + sh - 22;
    x.fillStyle = PAL.blue;
    engine.rr(x, sx + 10, ry - 12, sw - 20, 24, 4);
    x.fill();
    x.font = MONO(11);
    x.textAlign = 'center';
    x.fillStyle = PAL.yellow;
    const line = `${meaningOf(host.ruler.target, 'it')} ≠ ${labelOf(host.ruler.pick)}`;
    x.fillText(wrapLines(x, line, sw - 40, 1)[0], sx + sw / 2, ry);
  }
}

function drawTruck(host, x) {
  const ty = GY + R * S + 14;
  drawGirder(x, ty, 0, W);
  x.fillStyle = PAL.night;
  x.fillRect(0, ty + 9, W, H - ty - 9);
  // The truck: blue cab, yellow lights, black wheels, the bed with the barrels.
  const bx = 150;
  const by = ty + 40;
  x.fillStyle = PAL.blue;
  engine.rr(x, bx, by + 30, 240, 80, 6);
  x.fill();
  engine.rr(x, bx + 180, by, 72, 60, 8);
  x.fill();
  x.fillStyle = PAL.pink;
  x.fillRect(bx + 194, by + 10, 40, 24);
  x.fillStyle = PAL.yellow;
  x.beginPath();
  x.arc(bx + 246, by + 70, 6, 0, 6.283);
  x.fill();
  x.fillStyle = PAL.night;
  x.beginPath();
  x.arc(bx + 40, by + 112, 16, 0, 6.283);
  x.arc(bx + 200, by + 112, 16, 0, 6.283);
  x.fill();
  x.strokeStyle = PAL.ladder;
  x.lineWidth = 3;
  x.beginPath();
  x.arc(bx + 40, by + 112, 8, 0, 6.283);
  x.stroke();
  x.beginPath();
  x.arc(bx + 200, by + 112, 8, 0, 6.283);
  x.stroke();
  host.shipped.slice(-4).forEach((k, i) => {
    const px = bx + 8 + i * 42;
    drawBarrel(host, x, px - 6, by - 8, { k, dy: 0 }, 0.62, false, false, false);
  });
  // The warehouseman: cap, face, overalls; arms up while a row ships.
  const wx = 70;
  const wy = ty + 150;
  const up = host.flash > 0;
  x.fillStyle = PAL.night;
  x.fillRect(wx - 12, wy - 6, 9, 14);
  x.fillRect(wx + 3, wy - 6, 9, 14);
  x.fillStyle = PAL.blue;
  engine.rr(x, -16 + wx, wy - 46, 32, 42, 6);
  x.fill();
  x.fillStyle = PAL.pink;
  engine.rr(x, wx - 11, wy - 68, 22, 22, 7);
  x.fill();
  x.fillStyle = PAL.girder;
  engine.rr(x, wx - 13, wy - 76, 26, 11, 4);
  x.fill();
  x.fillRect(wx - 2, wy - 70, 18, 4);
  x.fillStyle = PAL.pink;
  if (up) {
    x.fillRect(wx - 24, wy - 78, 7, 36);
    x.fillRect(wx + 17, wy - 78, 7, 36);
  } else {
    x.fillRect(wx - 24, wy - 44, 7, 30);
    x.fillRect(wx + 17, wy - 44, 7, 30);
  }
}

export function draw(host, x) {
  x.setTransform(host.sc, 0, 0, host.sc, 0, 0);
  x.clearRect(0, 0, W, H);
  x.save();
  engine.shake(host, x, host.shake);
  x.fillStyle = PAL.night;
  x.fillRect(-8, -8, W + 16, H + 16);
  drawLadder(x, 0, GY - 30, GY + R * S + 20);
  drawLadder(x, W - 14, GY - 30, GY + R * S + 20);
  for (let r = 0; r < R; r++) drawGirder(x, GY + (r + 1) * S - 7, GX - 6, GX + C * S + 6);
  const k = Math.min(1, host.pt / (host.phase === 'back' ? BACK_S : SWAP_S));
  const aidedK = new Set(
    host.open.filter((o) => host.aided.has(o)).map((o) => host.kinds.indexOf(o))
  );
  for (let r = 0; r < R; r++)
    for (let i = 0; i < C; i++) {
      const t = host.g[r][i];
      if (!t) continue;
      let px = GX + i * S;
      let py = GY + r * S - t.dy;
      let scl = 1;
      if ((host.phase === 'swap' || host.phase === 'back') && host.pair) {
        const [a, b] = host.pair;
        const ka = host.phase === 'back' ? 1 - k : k;
        if (r === a[0] && i === a[1]) {
          px += (b[1] - a[1]) * S * ka;
          py += (b[0] - a[0]) * S * ka;
        } else if (r === b[0] && i === b[1]) {
          px += (a[1] - b[1]) * S * ka;
          py += (a[0] - b[0]) * S * ka;
        }
      }
      const dying = host.phase === 'clear' && host.clearing.some((gr) => touches(gr, [r, i]));
      if (dying) {
        const kk = Math.min(1, host.pt / CLEAR_S);
        scl = kk < 0.3 ? 1 + kk * 0.6 : 1.18 * (1 - (kk - 0.3) / 0.7);
      }
      const sel = Boolean(host.sel && host.sel[0] === r && host.sel[1] === i);
      const ruled = Boolean(host.ruler && touches(host.ruler, [r, i]));
      drawBarrel(host, x, px, py, t, scl, sel, ruled, aidedK.has(t.k));
    }
  if (host.kbUsed) {
    const [r, i] = host.cur;
    x.strokeStyle = PAL.ladder;
    x.lineWidth = 3;
    engine.rr(x, GX + i * S + 2, GY + r * S + 2, S - 4, S - 4, 8);
    x.stroke();
  }
  drawTruck(host, x);
  drawSlip(host, x);
  engine.drawParts(x, host.parts);
  if (host.flash > 0) {
    x.fillStyle = `rgba(250,204,21,${host.flash * 0.07})`;
    x.fillRect(0, 0, W, H);
  }
  x.restore();
}
