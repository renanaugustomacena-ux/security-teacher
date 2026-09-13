/**
 * La catena di controllo — geometry and typography shared by the level module
 * (input, simulation) and the drawing part. Numbers only: no state, no logic.
 *
 * The glass is a phone held upright, 420 × 910. From the top: the count and
 * the three lamps, the vertical duct with its stations (one per middleware),
 * the pod descending station by station with its Italian tag hanging to the
 * right, the floor grid in perspective, the row of term valves standing on
 * it, and the seal bar underneath.
 */

export const W = 420;
export const H = 910;

/** First and last station centre lines of the duct. */
export const TOP = 127;
export const BOT = 686;
/** The duct is off-centre so the pod's tag has room on the right. */
export const DUCT_X = 168;
export const DUCT_HW = 44;
/** A station is a wide hexagonal plate across the duct. */
export const STATION_W = 108;
export const STATION_H = 46;
/** The pod's tag plate: the Italian meaning, right of the duct. */
export const TAG_X = 224;
export const TAG_W = W - TAG_X - 8;
export const POD_R = 22;
export const RING_R = 31;

/** Horizon of the floor grid the valves stand on. */
export const FLOOR_Y = 722;
/** The row of term valves (hexagons) and the seal bar under them. */
export const VALVE_Y = 780;
export const VALVE_R = 38;
export const SEAL = { x: W / 2, y: 862, w: 190, h: 42 };

/** Tap radii (ricerca/33: coarse pointer, nothing under 44 px). */
export const HIT_VALVE = 46;

/** The register's typefaces: an extended sans with glow for terms and digits,
 *  a monospace for the station names, which are code. */
export const SANS = '"Raleway","Inter",system-ui,sans-serif';
export const MONO = '"JetBrains Mono","Consolas","Courier New",monospace';

/** Centre line of station `i` in a chain of `n`. */
export function stY(n, i) {
  return TOP + ((BOT - TOP) * (i + 0.5)) / n;
}

/** Centre of valve `i` in a row of `n`. */
export function valvePos(i, n) {
  return { x: (W * (i + 0.5)) / n, y: VALVE_Y };
}

export function valveAt(p, n) {
  for (let i = 0; i < n; i++) {
    const q = valvePos(i, n);
    if (Math.hypot(p.x - q.x, p.y - q.y) < HIT_VALVE) return i;
  }
  return -1;
}

export function sealHit(p) {
  return Math.abs(p.x - SEAL.x) < SEAL.w / 2 + 8 && Math.abs(p.y - SEAL.y) < SEAL.h / 2 + 12;
}
