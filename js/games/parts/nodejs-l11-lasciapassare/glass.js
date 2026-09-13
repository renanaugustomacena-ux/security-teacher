/**
 * Il lasciapassare — the register's primitives (ricerca/42 R3 Gel su nero):
 * the 11×8 carrier sprite in two frames, the seal emblem, the bunker, seven-segment
 * digits, a bitmap blitter and a word-wrapper. Everything is drawn in one ink;
 * the level module lays the coloured gel over it.
 */

/* Two frames of an 11×8 carrier, the register's own sprite (ricerca/42 R3). */
export const CARRIER = [
  [
    '00100000100',
    '00010001000',
    '00111111100',
    '01101110110',
    '11111111111',
    '10111111101',
    '10100000101',
    '00011011000',
  ],
  [
    '00100000100',
    '10010001001',
    '10111111101',
    '11101110111',
    '11111111111',
    '01111111110',
    '00100000100',
    '01000000010',
  ],
];
export const EMBLEM = ['0011100', '0111110', '1101011', '1111111', '0100010'];
export const BUNKER = [
  '0011111100',
  '0111111110',
  '1111111111',
  '1111111111',
  '1110000111',
  '1100000011',
];
const SEG = {
  0: 'abcdef',
  1: 'bc',
  2: 'abged',
  3: 'abgcd',
  4: 'fgbc',
  5: 'afgcd',
  6: 'afgedc',
  7: 'abc',
  8: 'abcdefg',
  9: 'abcdfg',
};

export function wrapLines(x, text, maxW, maxL) {
  const words = String(text).split(' ');
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

/* One line that must not cross a boundary: trimmed with an ellipsis if it would. */
export function fitText(x, text, maxW) {
  let l = String(text);
  if (x.measureText(l).width <= maxW) return l;
  while (x.measureText(`${l}…`).width > maxW && l.length > 1) l = l.slice(0, -1);
  return `${l}…`;
}

export function drawBitmap(x, rows, px, py, s, skip) {
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      if (rows[r][c] !== '1') continue;
      if (skip && skip(r, c)) continue;
      x.fillRect(px + c * s, py + r * s, s, s);
    }
  }
}

/* Seven-segment digits: the register's own numerals (ricerca/42 R3). */
function drawSegChar(x, ch, px, py, s) {
  const w = s * 0.55;
  const t = s * 0.14;
  if (ch === '/') {
    x.beginPath();
    x.moveTo(px + w, py);
    x.lineTo(px, py + s);
    x.stroke();
    return;
  }
  const on = SEG[ch] || '';
  const segs = {
    a: [0, 0, w, t],
    b: [w - t, 0, t, s / 2],
    c: [w - t, s / 2, t, s / 2],
    d: [0, s - t, w, t],
    e: [0, s / 2, t, s / 2],
    f: [0, 0, t, s / 2],
    g: [0, s / 2 - t / 2, w, t],
  };
  for (const k of on) {
    const r = segs[k];
    x.fillRect(px + r[0], py + r[1], r[2], r[3]);
  }
}

export function drawSeg(x, text, px, py, s) {
  const adv = s * 0.55 + s * 0.22;
  x.lineWidth = s * 0.14;
  for (let i = 0; i < text.length; i++) drawSegChar(x, text[i], px + i * adv, py, s);
}
