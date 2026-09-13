/**
 * L'indirizzario — geometry, palette and typography shared by the level
 * module (input, simulation) and the drawing part. Numbers only.
 *
 * The glass is a phone held upright, 420 × 910, and it is a sheet of paper on
 * a desk (register R13, ricerca/42 §42.4). From the top: the nail with the
 * docket hanging from its string, the count row, the four round method
 * stamps in their rack, the ruled strip where the address is composed, the
 * wooden tile rack, and the desk edge with the big inspection stamp on it.
 */

export const W = 420;
export const H = 910;

/** The nail the docket hangs from, and the docket itself (a luggage tag). */
export const NAIL = { x: W / 2, y: 26 };
export const TAG = { x: W / 2, y: 52, w: 336, h: 118 };

/** The count row: made/needed on the left, the three inspection marks right. */
export const ROW_Y = 202;

/** The four method stamps, round faces in a row. */
export const METHODS = ['GET', 'POST', 'PUT', 'DELETE'];
export const METH_Y = 252;
export const METH_R = 23;

/** The ruled strip where the address is composed, one tile after another. */
export const SLOT_Y = 328;
export const SLOT_H = 58;
export const SLOT_X0 = 26;
export const BUILT_H = 38;
export const MAX_BUILT = 5;

/** The wooden rack holding the tiles of the reserve. */
export const TRAY = { x: 12, y: 396, w: W - 24, h: 216 };
export const TILE_H = 50;

/** The desk edge and the big inspection stamp standing on it. */
export const DESK_Y = 648;
export const STAMP = { x: W / 2, y: 800 };

/** Tap radii (ricerca/33: coarse pointer, nothing under 44 px). */
export const HIT_METH = 40;
export const HIT_STAMP = 58;

/**
 * The register's palette (R13 · Carta e tessere): paper, cream tile, tile
 * edge, light wood, ink, and the three Wordle states — green for what passed,
 * yellow for the hint, grey for what was refused. Never the app's gold.
 */
export const PAL = {
  paper: '#F6F1E7',
  cream: '#FFF8E7',
  edge: '#D9C9A3',
  wood: '#E4C590',
  ink: '#1C1B1A',
  green: '#6AAA64',
  yellow: '#C9B458',
  grey: '#787C7E',
};

/** A readable serif for the letters, a sans for the digits (R13). */
export const SERIF = 'Georgia,"Times New Roman",serif';
export const SANS = 'Inter,system-ui,sans-serif';

/** Centre of method stamp `i`. */
export function methPos(i) {
  return { x: W / 2 + (i - 1.5) * 98, y: METH_Y };
}

/** Two columns up to six tiles, three beyond. */
export function trayCols(n) {
  return n > 6 ? 3 : 2;
}

/** Width of a rack tile when `n` tiles share the rack. */
export function tileW(n) {
  const c = trayCols(n);
  return Math.floor((TRAY.w - 16 - (c - 1) * 10) / c);
}

/** Home position (centre) of rack tile `i` when `n` tiles share the rack. */
export function tileHome(i, n) {
  const c = trayCols(n);
  const w = tileW(n);
  const r = Math.floor(i / c);
  const k = i % c;
  return {
    x: TRAY.x + 8 + k * (w + 10) + w / 2,
    y: TRAY.y + 14 + TILE_H / 2 + r * (TILE_H + 12),
  };
}

/** Width of a tile once it sits on the address strip (before scaling). */
export function builtW(label) {
  return Math.max(44, String(label).length * 8.4 + 18);
}
