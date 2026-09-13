/**
 * The glass of «Il condotto» in register R1 · Fosforo vettoriale
 * (ricerca/42 §42.4): absolute black, open polygons stroked 1.5–2 px with an
 * additive glow of their own colour, no filled shape ever — only glyphs. The
 * figure is the chunk: an open hexagon a kid draws in one line. The ground is
 * the horizon the drains empty into. Things move with inertia and rotation,
 * and what falls breaks into smaller pieces.
 *
 * Under prefers-reduced-motion nothing here reads the clock: the dashes stand
 * still, the glow does not breathe, the source does not spin.
 */

import * as engine from '../../KaioEngine.js';
import { labelOf, meaningOf } from '../../LevelBeats.js';
import {
  W,
  H,
  SRCY,
  SRCH,
  JY,
  LANEY,
  SINKY,
  TANKY,
  TANKH,
  GROUND,
  LX,
  TRUNK_HW,
  LANE_HW,
  TANK_W,
  CKW_WIDE,
  CKW,
  CKH,
  GAP,
  SPAWN_Y,
  RISE_DX,
  SRC_NODE,
} from './layout.js';

/** The register's palette, named (ricerca/42 §42.4 R1). */
export const PAL = {
  nero: '#000000',
  bianco: '#F4F7FF',
  ciano: '#34E5FF',
  verde: '#4CFF7A',
  giallo: '#FFE94D',
  spento: '#1B6E80',
};

const MONO = '"JetBrains Mono", "Courier New", monospace';

function font(x, weight, size) {
  x.font = `${weight} ${size}px ${MONO}`;
}

function dash(x, arr, offset) {
  if (typeof x.setLineDash === 'function') x.setLineDash(arr);
  x.lineDashOffset = offset || 0;
}

function glow(x, colour, blur) {
  x.shadowColor = colour;
  x.shadowBlur = blur;
}

function noGlow(x) {
  x.shadowBlur = 0;
}

function poly(x, pts, close) {
  x.beginPath();
  x.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i += 1) x.lineTo(pts[i][0], pts[i][1]);
  if (close) x.closePath();
  x.stroke();
}

function line(x, x1, y1, x2, y2) {
  x.beginPath();
  x.moveTo(x1, y1);
  x.lineTo(x2, y2);
  x.stroke();
}

/** A regular open polygon (the source node, the switch needle). */
function ngon(x, cx, cy, r, n, rot) {
  const pts = [];
  for (let i = 0; i < n; i += 1) {
    const a = rot + (i / n) * Math.PI * 2;
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  poly(x, pts, true);
}

/** The chunk: a flat hexagon, open stroke. */
function hex(x, cx, cy, w, h) {
  const k = Math.min(8, h / 2);
  poly(
    x,
    [
      [cx - w / 2 + k, cy - h / 2],
      [cx + w / 2 - k, cy - h / 2],
      [cx + w / 2, cy],
      [cx + w / 2 - k, cy + h / 2],
      [cx - w / 2 + k, cy + h / 2],
      [cx - w / 2, cy],
    ],
    true
  );
}

/** Fit a string to `maxW` by shrinking once, then cutting with an ellipsis. */
function fit(x, text, maxW, size, weight) {
  font(x, weight, size);
  if (x.measureText(text).width <= maxW) return text;
  font(x, weight, Math.max(10, size - 2));
  if (x.measureText(text).width <= maxW) return text;
  let t = text;
  while (t.length > 3 && x.measureText(`${t}…`).width > maxW) t = t.slice(0, -1);
  return `${t.trimEnd()}…`;
}

function grid(x) {
  x.strokeStyle = 'rgba(52,229,255,0.055)';
  x.lineWidth = 1;
  for (let gx = 0; gx <= W; gx += 28) line(x, gx, 0, gx, H);
  for (let gy = 0; gy <= H; gy += 28) line(x, 0, gy, W, gy);
}

function drawSource(host, x, held, auto, clock) {
  const c = host.cfg;
  const it = host.state.lang !== 'en';
  const on = held ? PAL.spento : PAL.ciano;
  const brakeHint = host.srcPulse > 0;
  // The figure of the source: a hexagon that spins while the stream flows.
  x.lineWidth = 2;
  x.strokeStyle = brakeHint ? PAL.giallo : on;
  glow(x, brakeHint ? PAL.giallo : PAL.ciano, brakeHint ? 14 : held ? 0 : 10);
  ngon(x, SRC_NODE.x, SRC_NODE.y, SRC_NODE.r, 6, host.srcRot);
  x.lineWidth = 1.5;
  ngon(x, SRC_NODE.x, SRC_NODE.y, SRC_NODE.r * 0.45, 3, -host.srcRot * 1.5);
  noGlow(x);

  x.textBaseline = 'middle';
  x.textAlign = 'left';
  font(x, 600, 15);
  x.fillStyle = held ? PAL.spento : PAL.bianco;
  x.fillText('Readable', SRC_NODE.x + 34, SRCY + 20);
  font(x, 500, 12);
  x.fillStyle = held ? PAL.giallo : PAL.verde;
  x.fillText(held ? (auto ? 'pause() auto' : 'pause()') : 'flowing', SRC_NODE.x + 34, SRCY + 42);
  x.fillStyle = PAL.spento;
  x.textAlign = 'right';
  x.fillText(`${c.size}k · ${c.rate.toFixed(2)}s`, W - 44, SRCY + 20);
  x.fillText(auto ? 'pipe()' : 'write()', W - 44, SRCY + 42);
  if (!auto) {
    font(x, 500, 11);
    x.fillText(it ? 'tocca · spazio' : 'tap · space', W - 44, SRCY + 60);
  }

  // The next chunk forms at the mouth of the source: its meaning is already
  // legible before it drops (ricerca/12 §12.7: telegraph every decision).
  const busy = host.chunks.some((k) => k.lane < 0 && !k.rising && k.y < SPAWN_Y + GAP);
  if (host.nextItem && !busy) {
    x.globalAlpha = 0.42;
    x.strokeStyle = PAL.bianco;
    x.lineWidth = 1.5;
    dash(x, [4, 5], clock * 30);
    hex(x, LX[1], SPAWN_Y, CKW_WIDE, CKH);
    dash(x, [], 0);
    x.textAlign = 'center';
    x.fillStyle = PAL.bianco;
    const t = fit(x, meaningOf(host.nextItem, 'it'), CKW_WIDE - 26, 13, 500);
    x.fillText(t, LX[1], SPAWN_Y + 1);
    x.globalAlpha = 1;
  }
}

function drawTrunk(host, x, clock) {
  const top = SRCY + SRCH;
  const cx = LX[1];
  x.lineWidth = 1.5;
  x.strokeStyle = PAL.spento;
  // An open funnel: wide where the meaning is read, narrow at the switch.
  poly(x, [
    [cx - TRUNK_HW, top],
    [cx - TRUNK_HW, JY - 44],
    [cx - LANE_HW, JY - 4],
  ]);
  poly(x, [
    [cx + TRUNK_HW, top],
    [cx + TRUNK_HW, JY - 44],
    [cx + LANE_HW, JY - 4],
  ]);
  x.strokeStyle = 'rgba(52,229,255,0.22)';
  dash(x, [3, 7], -clock * 40);
  line(x, cx, top, cx, JY - 8);
  dash(x, [], 0);
}

function drawSwitch(host, x, clock) {
  const cur = host.act[host.li];
  for (const l of host.act) {
    const on = l === cur;
    x.strokeStyle = on ? PAL.ciano : PAL.spento;
    x.lineWidth = on ? 2 : 1.5;
    if (on) glow(x, PAL.ciano, 8);
    line(x, LX[1], JY, LX[l], LANEY + 8);
    noGlow(x);
    x.strokeStyle = on ? 'rgba(52,229,255,0.5)' : 'rgba(52,229,255,0.14)';
    x.lineWidth = 1.5;
    line(x, LX[l] - LANE_HW, LANEY + 8, LX[l] - LANE_HW, SINKY);
    line(x, LX[l] + LANE_HW, LANEY + 8, LX[l] + LANE_HW, SINKY);
  }
  // The needle: an open triangle that turns with inertia toward the lane.
  const breathe = 8 + Math.sin(clock * 4) * 3;
  x.strokeStyle = PAL.ciano;
  x.lineWidth = 2;
  glow(x, PAL.ciano, breathe);
  x.save();
  x.translate(LX[1], JY);
  x.rotate(host.swAng);
  poly(
    x,
    [
      [0, 16],
      [-9, -8],
      [9, -8],
    ],
    true
  );
  x.restore();
  noGlow(x);
}

function drawVessel(host, x, i, l, clock) {
  const c = host.cfg;
  const fx = LX[l] - TANK_W / 2;
  const cap = c.cap[l];
  const hw = c.hwm[l];
  const fill = host.fill[l];
  const lvl = Math.min(1, fill / cap);
  const hy = TANKY + TANKH * (1 - hw / cap);
  const aided = host.pulse > 0 && host.pulseL === l;
  const item = host.menu[i];

  // The vessel: open at the mouth, narrower at the foot.
  x.lineWidth = aided ? 2.4 : 1.5;
  x.strokeStyle = aided ? PAL.giallo : PAL.ciano;
  glow(x, aided ? PAL.giallo : PAL.ciano, aided ? 14 : 6);
  poly(x, [
    [fx, TANKY],
    [fx + 14, TANKY + TANKH],
    [fx + TANK_W - 14, TANKY + TANKH],
    [fx + TANK_W, TANKY],
  ]);
  noGlow(x);

  // The level: hatching, never a fill. Above the mark it turns white.
  const lh = TANKH * lvl;
  x.lineWidth = 1;
  x.strokeStyle = fill > hw ? PAL.bianco : PAL.ciano;
  x.globalAlpha = fill > hw ? 0.6 : 0.45;
  for (let y = TANKY + TANKH - 5; y > TANKY + TANKH - lh; y -= 6) {
    const inset = 14 * ((y - TANKY) / TANKH);
    line(x, fx + inset + 3, y, fx + TANK_W - inset - 3, y);
  }
  x.globalAlpha = 1;

  // highWaterMark: the line, not the bottom.
  x.strokeStyle = PAL.giallo;
  x.lineWidth = 1.5;
  dash(x, [5, 4], 0);
  line(x, fx - 4, hy, fx + TANK_W + 4, hy);
  dash(x, [], 0);
  x.textBaseline = 'middle';
  font(x, 500, 11);
  x.textAlign = 'left';
  x.fillStyle = PAL.giallo;
  x.fillText('hwm', fx + 2, hy - 9);
  x.textAlign = 'right';
  x.fillStyle = PAL.bianco;
  font(x, 500, 12);
  x.fillText(`${Math.round(fill)}k`, fx + TANK_W - 4, TANKY + 14);

  // The term on the mouth: the only thing that tells the vessels apart.
  x.textAlign = 'center';
  font(x, 500, 11);
  x.fillStyle = PAL.spento;
  x.fillText('Writable', LX[l], SINKY - 58);
  x.fillStyle = aided ? PAL.giallo : PAL.bianco;
  const label = fit(x, labelOf(item), TANK_W + 10, 14, 600);
  x.fillText(label, LX[l], SINKY - 38);
  if (host.kbUsed) {
    font(x, 500, 11);
    x.fillStyle = PAL.spento;
    x.fillText(String(i + 1), LX[l] - TANK_W / 2 - 8, SINKY - 38);
  }

  // The drain: a dashed line into the horizon, running while there is data.
  font(x, 500, 12);
  x.fillStyle = PAL.spento;
  x.fillText(`drain ${c.drain[l]}k/s`, LX[l], TANKY + TANKH + 18);
  x.strokeStyle = fill > 0 ? PAL.verde : PAL.spento;
  x.lineWidth = 1.5;
  dash(x, [4, 6], -clock * (fill > 0 ? c.drain[l] * 6 : 0));
  line(x, LX[l], TANKY + TANKH + 30, LX[l], GROUND - 2);
  dash(x, [], 0);
}

function drawGround(x) {
  // The horizon everything empties into: one line with a lunar profile.
  x.strokeStyle = PAL.bianco;
  x.lineWidth = 1.5;
  glow(x, PAL.bianco, 6);
  poly(x, [
    [0, GROUND],
    [48, GROUND],
    [64, GROUND - 6],
    [92, GROUND],
    [170, GROUND],
    [186, GROUND - 4],
    [214, GROUND - 4],
    [232, GROUND],
    [318, GROUND],
    [338, GROUND - 7],
    [362, GROUND],
    [W, GROUND],
  ]);
  noGlow(x);
}

function drawChunks(host, x) {
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  for (const k of host.chunks) {
    const item = host.menu[k.mi];
    if (k.lane < 0) {
      // In the trunk: wide, with the meaning the Writable must be chosen for.
      const waiting = k.hold > 0;
      x.strokeStyle = waiting ? PAL.giallo : PAL.bianco;
      x.lineWidth = 1.5;
      glow(x, waiting ? PAL.giallo : PAL.bianco, 8);
      hex(x, LX[1], k.y, CKW_WIDE, CKH);
      noGlow(x);
      x.fillStyle = PAL.bianco;
      x.fillText(fit(x, meaningOf(item, 'it'), CKW_WIDE - 26, 13, 500), LX[1], k.y + 1);
      continue;
    }
    const kx = LX[k.lane] + (k.rising ? RISE_DX : 0);
    const dim = k.stall || k.reject > 0 || k.rising;
    x.strokeStyle = dim ? PAL.spento : PAL.bianco;
    x.lineWidth = 1.5;
    glow(x, PAL.bianco, dim ? 0 : 6);
    hex(x, kx, k.y, CKW, CKH);
    noGlow(x);
    font(x, 600, 12);
    x.fillStyle = dim ? PAL.spento : PAL.bianco;
    x.fillText(`${k.size}k`, kx, k.y + 1);
    if (k.stall) {
      x.strokeStyle = PAL.giallo;
      x.lineWidth = 1.5;
      hex(x, kx, k.y, CKW + 8, CKH + 8);
    }
  }
}

function drawCounters(host, x) {
  const c = host.cfg;
  const s = host.state;
  const it = s.lang !== 'en';
  x.textBaseline = 'middle';
  x.textAlign = 'left';
  font(x, 500, 13);
  x.fillStyle = PAL.spento;
  x.fillText(it ? 'consegnati' : 'delivered', 22, H - 54);
  font(x, 600, 24);
  x.fillStyle = PAL.verde;
  x.fillText(`${host.delivered} / ${c.target}`, 22, H - 28);
  x.textAlign = 'right';
  font(x, 500, 13);
  x.fillStyle = PAL.spento;
  x.fillText(it ? 'caduti' : 'dropped', W - 22, H - 54);
  font(x, 600, 24);
  x.fillStyle = host.dropped > 0 ? PAL.giallo : PAL.spento;
  x.fillText(`${host.dropped} / 3`, W - 22, H - 28);

  // Beat pips: open rings, the current one with a dot.
  const n = host.BEATS ? host.BEATS.length : 5;
  for (let i = 0; i < n; i += 1) {
    const on = i <= s.beat;
    x.strokeStyle = on ? PAL.ciano : PAL.spento;
    x.lineWidth = 1.5;
    x.beginPath();
    x.arc(W - 24, 20 + i * 17, 4.5, 0, 6.283);
    x.stroke();
    if (i === s.beat) {
      x.fillStyle = PAL.ciano;
      x.beginPath();
      x.arc(W - 24, 20 + i * 17, 2.2, 0, 6.283);
      x.fill();
    }
  }
}

export function drawScene(host, x) {
  const c = host.cfg;
  if (!c) return;
  const clock = host.reduceMotion ? 0 : host.t;
  const auto = host.auto;
  const held = auto ? host.autoHold : host.srcPaused;

  x.save();
  x.setTransform(host.sc || 1, 0, 0, host.sc || 1, 0, 0);
  x.fillStyle = PAL.nero;
  x.fillRect(0, 0, W, H);
  grid(x);
  engine.shake(host, x, host.shakeAmt);
  if (host.flash > 0) {
    x.fillStyle = `rgba(244,247,255,${(host.flash * 0.1).toFixed(3)})`;
    x.fillRect(0, 0, W, H);
  }

  drawSource(host, x, held, auto, clock);
  drawTrunk(host, x, clock);
  drawSwitch(host, x, clock);
  host.act.forEach((l, i) => drawVessel(host, x, i, l, clock));
  drawGround(x);
  drawChunks(host, x);
  engine.drawParts(x, host.parts);
  drawCounters(host, x);

  if ((host.props || {}).diagnostica) {
    font(x, 500, 11);
    x.textAlign = 'left';
    x.fillStyle = PAL.ciano;
    const trunk = host.chunks.filter((k) => k.lane < 0).length;
    x.fillText(`trunk ${trunk} held ${held} t ${host.tSpent.toFixed(1)}`, 12, H - 74);
  }
  x.restore();
}
