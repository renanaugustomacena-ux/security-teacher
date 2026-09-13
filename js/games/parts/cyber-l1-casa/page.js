/**
 * La casa di notte — the page: the register's palette, the plan's geometry
 * and the two helpers both the mechanics and the drawing read. Nothing here
 * plays or draws.
 */

import { labelOf, meaningOf } from '../../LevelBeats.js';

export const W = 420;
export const H = 910;
export const HAND = '"Segoe Print","Bradley Hand","Baloo 2","Comic Sans MS",cursive';

// R14 palette — five named colours, none of them the app's gold.
export const PAPER = '#FBFBF3';
export const GRID = '#D7E3F4';
export const INK = '#1B2A49';
export const HILITE = '#FFF176';
export const PENCIL = '#8A8A8A';
export const WASH = 'rgba(27,42,73,.10)';

export const SPOT = {
  finestra: { x: 64, y: 414 },
  porta: { x: 170, y: 414 },
  cancello: { x: 276, y: 414 },
  cassa: { x: 378, y: 414 },
};
export const KDEF = {
  prowl: { spot: 'porta' },
  stranger: { spot: 'cancello' },
  snoop: { spot: 'finestra' },
  rain: { spot: 'cassa' },
};
export const A1 = ['prowl', 'stranger'];
export const A2 = ['prowl', 'stranger', 'snoop'];
export const A3 = ['prowl', 'stranger', 'snoop', 'rain'];
export const A3P = A3.concat(['parcel']);
export const PW = 122;
export const PH = 44;
export const PGAP = 10;
export const PY = 640;

/**
 * The Italian on the note. meaningOf strips a trailing bracket; some
 * meanings also carry the term itself — as a slash half ("Software malevolo /
 * Malware") or as a word inside the half ("Virus informatico") — which would
 * hand the answer to the player (TEST 1). The term is removed as a whole
 * word from every half; a half left empty is dropped. Only when nothing at
 * all survives (the meaning IS the term) does the raw meaning come back.
 */
export function meaningText(item) {
  const term = labelOf(item).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = term ? new RegExp(`(?<![\\p{L}\\p{N}])${term}(?![\\p{L}\\p{N}])`, 'giu') : null;
  const halves = meaningOf(item, 'it')
    .split(' / ')
    .map((h) => (re ? h.replace(re, '') : h).replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  return halves.length ? halves.join(' / ') : meaningOf(item, 'it');
}

export function bySlot(host) {
  return host.plates.slice().sort((a, b) => a.slot - b.slot);
}
