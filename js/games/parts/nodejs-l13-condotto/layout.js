/**
 * Geometry of «Il condotto» — one diagram, 420 × 910, read top to bottom:
 * the Readable node, the trunk, the switch, three lanes, three Writable
 * vessels, the drain lines and the horizon they empty into.
 *
 * The numbers are the template's (knowledge-aio-giochi/templates/
 * nodejs-l13-condotto): source at 58, junction at 268, lane mouth at 598,
 * vessels 618–770, lanes at x = 86 / 210 / 334. The trunk is wider than the
 * template's 52 px because a chunk now carries an Italian meaning, not a size.
 */

export const W = 420;
export const H = 910;

export const SRCY = 58;
export const SRCH = 64;
export const JY = 268;
export const LANEY = 298;
export const SINKY = 598;
export const TANKY = 618;
export const TANKH = 152;
export const GROUND = 812;

export const LX = [86, 210, 334];
/** Half-width of the trunk (the wide chunk with the meaning lives here). */
export const TRUNK_HW = 116;
export const LANE_HW = 26;
export const TANK_W = 108;

/** A chunk inside the trunk (wide, carries the meaning). */
export const CKW_WIDE = 232;
/** A chunk inside a lane (narrow, carries its size). */
export const CKW = 46;
export const CKH = 26;
export const GAP = 34;
export const TRUNKMAX = 4;

/** Descent (px/s), rise of a refused chunk (px/s). */
export const V = 95;
export const RISE = 190;
/** A refused chunk sits at the mouth this long before it is sent back up. */
export const REJECT_HOLD = 0.8;
/** Back at the switch, it waits this long before descending again. */
export const RETRY_HOLD = 1.2;

/** Where the chunk spawns, where a rising chunk travels (beside its lane). */
export const SPAWN_Y = SRCY + SRCH + 10;
export const RISE_DX = 40;

/** The source node (a spinning hexagon) and its tap zone. */
export const SRC_NODE = { x: 52, y: SRCY + 32, r: 22 };
export const HIT_SRC_Y = SRCY + SRCH + 22;
export const HIT_LANE = 86;

/** The switch: index into the active lanes → physical lane. */
export function activeLanes(count) {
  if (count <= 1) return [1];
  if (count === 2) return [0, 2];
  return [0, 1, 2];
}

/** A point inside lane `l`, for taps and tests. */
export function lanePoint(l) {
  return { x: LX[l], y: (LANEY + SINKY) / 2 };
}

/** A point on the Readable, for taps and tests. */
export function sourcePoint() {
  return { x: SRC_NODE.x, y: SRC_NODE.y };
}
