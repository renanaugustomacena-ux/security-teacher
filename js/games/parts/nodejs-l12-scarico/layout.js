/**
 * Lo scarico — geometry and typography shared by the level module (input,
 * simulation) and the drawing part. Numbers only: no state, no logic.
 *
 * The glass is a phone held upright, 420 × 910. From the top: the electrical
 * panel with its three lights, four red girder floors joined by cyan ladders
 * (the call stack, one level per floor), the chute mouth at the bottom right
 * the barrels roll out of, and under the tower the beam(s) the gloves hang
 * from. A barrel rolls along a floor, climbs the ladder, rolls the next floor:
 * an error nobody catches rises one level at a time until it trips the panel.
 */

export const W = 420;
export const H = 910;

/** The panel box: what an uncaught error trips. */
export const PANEL = { x: W / 2, y: 92, w: 184, h: 68 };
/** Where a barrel arrives when its climb is over (bottom edge of the panel). */
export const TOP_Y = PANEL.y + PANEL.h / 2;
/** Top edge of each girder, bottom floor first. */
export const FLOORS = [610, 490, 370, 250];
export const GIRDER_H = 14;
export const BARREL_W = 116;
export const BARREL_H = 52;
/** The chute mouth the barrels roll out of, on the bottom floor. */
export const CHUTE = { x: W - 30, y: FLOORS[0] - BARREL_H / 2 - 2 };

/**
 * One segment per floor: the barrel rolls from `x0` to `x1` (the ladder), then
 * climbs to the floor above. Sides alternate, the last ladder is the panel's.
 */
export const SEGMENTS = [
  { x0: W + 30, x1: 150 },
  { x0: 150, x1: 270 },
  { x0: 270, x1: 150 },
  { x0: 150, x1: W / 2 },
];
/** Share of a segment spent rolling; the rest is the climb. */
export const DWELL = 0.72;
/** The ladder is climbed in this many frames (ricerca/42 §42.4 R5). */
export const CLIMB_FRAMES = 4;

/** Gloves: one row of up to three, two rows beyond. */
export const GLOVE_W = 104;
export const GLOVE_H = 60;
export const ROW_Y = { single: 748, top: 700, bottom: 808 };
/** Tap radius (ricerca/33: coarse pointer, nothing under 44 px). */
export const HIT_GLOVE = 50;

/**
 * The register's typeface: a bitmap-flavoured monospace with a 1 px drop
 * shadow (ricerca/42 §42.4 R5). A system generic, never the app's Inter or
 * its HUD mono.
 */
export const FONT = '"Lucida Console","Courier New",Courier,monospace';

/** Centre of a barrel resting on floor `i`. */
export function floorY(i) {
  return FLOORS[Math.max(0, Math.min(FLOORS.length - 1, i))] - BARREL_H / 2 - 2;
}

/**
 * Where a barrel is at progress `p` in [0, 1): rolling along floor `i` for the
 * dwell, then on the ladder. `smooth` climbs linearly (reduced motion); the
 * default climbs in frames. Also returns the roll phase for the staves.
 */
export function barrelPos(p, smooth) {
  const n = SEGMENTS.length;
  const s = Math.max(0, Math.min(n - 1e-6, p * n));
  const i = Math.floor(s);
  const f = s - i;
  const seg = SEGMENTS[i];
  const y0 = floorY(i);
  const y1 = i + 1 < n ? floorY(i + 1) : TOP_Y;
  if (f < DWELL) {
    const u = f / DWELL;
    return {
      x: seg.x0 + (seg.x1 - seg.x0) * u,
      y: y0,
      floor: i,
      climbing: false,
      roll: (u * (seg.x1 - seg.x0)) / (BARREL_H / 2),
    };
  }
  let u = (f - DWELL) / (1 - DWELL);
  if (!smooth) u = Math.floor(u * CLIMB_FRAMES) / CLIMB_FRAMES;
  return { x: seg.x1, y: y0 + (y1 - y0) * u, floor: i, climbing: true, roll: 0 };
}

/** Row sizes for `n` gloves: [3], [2, 2], [3, 2] … */
export function rowsOf(n) {
  const k = Math.max(1, Math.min(6, n || 1));
  if (k <= 3) return [k];
  return [Math.ceil(k / 2), Math.floor(k / 2)];
}

/** Row and column of glove `i` when `n` hang. */
export function rowCol(i, n) {
  const rows = rowsOf(n);
  let r = 0;
  let c = i;
  while (r < rows.length - 1 && c >= rows[r]) {
    c -= rows[r];
    r += 1;
  }
  return { r, c, rows };
}

/** Centre of glove `i` when `n` hang, spread evenly across the beam. */
export function glovePos(i, n) {
  const { r, c, rows } = rowCol(i, n);
  const m = rows[r];
  const step = W / (m + 0.3);
  const x = W / 2 + (c - (m - 1) / 2) * step;
  let y = ROW_Y.single;
  if (rows.length > 1) y = r === 0 ? ROW_Y.top : ROW_Y.bottom;
  return { x: Math.round(x), y };
}

/** Top of the girder a glove row hangs from. */
export function beamY(rowY) {
  return rowY - GLOVE_H / 2 - 34;
}
