/**
 * Il chiosco di notte — geometry and typography shared by the level module
 * (input, simulation) and the drawing part. Numbers only: no state, no logic.
 *
 * The glass is a phone held upright, 420 × 910. From the top: the night sky
 * and the bulb string, the tent gable of the booth, the window where the
 * customers pop up, the wooden counter they hand their ticket over, the
 * vendor's worktop with the hobs and their painted signs, the shelf, the
 * serving hatch, and the bulb board with the count.
 */

export const W = 420;
export const H = 910;

/** Shoulder line of a customer standing at the window. */
export const CUST_Y = 160;
/** The four places a customer can stand, left to right. */
export const SLOTS = [0.17, 0.39, 0.61, 0.83].map((f) => Math.round(W * f));
/** Top of the wooden counter between the customers and the vendor. */
export const COUNTER_Y = 250;
/** Centre line of the hobs and top of their painted signs. */
export const HOB_Y = 473;
export const SIGN_Y = 396;
export const HOB_R = 41;
/** The shelf the cooked things wait on. */
export const SHELF_Y = 619;
/** The serving hatch: what goes through it leaves the kiosk. */
export const HATCH = { x: W / 2, y: 710 };
/** Where the vendor's hands rest at the start of a shift. */
export const HANDS0 = { x: W / 2, y: 560 };
/** Ticket paper, one meaning per entry. */
export const TICKET_W = 88;
export const TICKET_ENTRY_H = 40;

/** Tap radii (ricerca/33: coarse pointer, nothing under 44 px). */
export const HIT_CUST = 60;
export const HIT_HOB = 50;
export const HIT_HATCH = 56;

/** The register's typefaces: a slab for signs and digits, a round hand for tickets. */
export const SLAB = '"Alfa Slab One","Rockwell","Baloo 2",Georgia,serif';
export const FONT = '"Baloo 2","Nunito","Trebuchet MS",system-ui,sans-serif';

const HOB_XS = {
  1: [W / 2],
  2: [Math.round(W * 0.32), Math.round(W * 0.68)],
  3: [Math.round(W * 0.24), Math.round(W * 0.5), Math.round(W * 0.76)],
};

/** Centre of hob `i` when `n` hobs are lit, spread evenly across the worktop. */
export function hobPos(i, n) {
  const xs = HOB_XS[Math.max(1, Math.min(3, n || 1))];
  return { x: xs[Math.max(0, Math.min(xs.length - 1, i))], y: HOB_Y };
}

/** Height of a ticket with `entries` meanings on it. */
export function ticketH(entries) {
  return 14 + Math.max(1, entries) * TICKET_ENTRY_H;
}

/** Where a customer's ticket hangs from: just below the shoulder line. */
export function ticketTop() {
  return CUST_Y + 34;
}
