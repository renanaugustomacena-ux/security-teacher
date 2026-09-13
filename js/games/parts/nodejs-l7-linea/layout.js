/**
 * La linea di montaggio — geometry and typography shared by the level module
 * (input, simulation) and the drawing part. Numbers only: no state, no logic.
 *
 * The glass is a phone held upright, 420 × 910, seen by a fixed three-quarter
 * camera (R15). From the top: the flat sky and the river, the foreman's
 * order board, the steel belt with its clamp posts, the wooden tray of
 * plates, and the lever with the foreman beside it.
 */

export const W = 420;
export const H = 910;

/** Centre line of the belt: the crates travel here (template RAIL = H·0.36). */
export const RAIL = Math.round(H * 0.36);
/** First row of plates on the tray (template TRAY = H·0.62). */
export const TRAY = Math.round(H * 0.62);
/** The lever that starts the shift. */
export const LEVER = { x: W - 56, y: Math.round(H * 0.86) };
/** Where the foreman stands, at the lever. */
export const FOREMAN = { x: W - 128, y: LEVER.y + 30 };
/** The order board: the Italian work orders, in the order the line must act. */
export const BOARD = { x: 18, y: 72, w: W - 36, h: 158 };
export const TAG_H = 30;
export const TAG_GAP = 4;
/** The wooden tray the plates rest on during the build phase. */
export const TRAY_BOX = { x: 14, y: TRAY - 44, w: W - 28, h: Math.round(H * 0.24) };
/** Sizes of the things a finger picks: a plate, a clamp post, a crate. */
export const PLATE_W = 104;
export const PLATE_H = 48;
export const POST_W = 60;
export const POST_H = 56;
export const CRATE_W = 54;
export const CRATE_H = 38;
/** Length of one hop on the belt, and its height (R15: discrete hops). */
export const HOP_LEN = 28;
export const HOP_UP = 9;

/** Tap radii, as the template (ricerca/33: coarse pointer, nothing under 44 px). */
export const HIT_PLATE = 38;
export const HIT_POST = 34;
export const HIT_LEVER = 40;

/** The register's typeface: a fat round sans, always drawn with an outline. */
export const FONT = '"Baloo 2","Nunito","Trebuchet MS",system-ui,sans-serif';

/** Centre of clamp post `i` when the line has `n` posts (template slotXY). */
export function slotXY(i, n) {
  const w = (W - 70) / Math.max(1, n);
  return { x: 35 + w * (i + 0.5), y: RAIL };
}

/** Centre of tray place `i`: three columns, rows 72 px apart (template trayXY). */
export function trayXY(i) {
  const cols = 3;
  const r = Math.floor(i / cols);
  const c = i % cols;
  const w = W / (cols + 0.4);
  return { x: W * 0.5 + (c - (cols - 1) / 2) * w, y: TRAY + r * 72 };
}

/** Top-left of tag `i` on the order board. */
export function tagXY(i) {
  return { x: BOARD.x + 12, y: BOARD.y + 12 + i * (TAG_H + TAG_GAP) };
}
