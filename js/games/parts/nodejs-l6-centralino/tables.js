/**
 * Il centralino di notte — the design sheet: the glass (420 × 910), the
 * layout of the plunger lane, the bumper bank and the stamp row, the R11
 * palette, the dot-matrix glyphs, and the template's tables and coach copy,
 * verbatim. Nothing here moves or grades.
 */

export const W = 420;
export const H = 910;
export const BOARD = H * 0.5;
export const DROP = H * 0.2;
export const DROP_END = DROP + H * 0.16;
export const STAMPY = H * 0.83;
export const STAMPS = ['200', '201', '404', '500'];
export const RAIL = 64;

/* R11 Flipper (ricerca/42 §42.4): six named colours, tones vary, families do
   not. Red is the bumper cap and the flipper rubber and nothing else: no
   error ever paints red (§14.6). None of these is the app's gold. */
export const PAL = {
  field: '#1F5E3D', // verde playfield
  apron: '#143F2A', // verde playfield, tono scuro
  chrome: '#C9D1D9', // cromo delle guide
  steel: '#7F8A94', // cromo in ombra
  amber: '#FF9F1C', // ambra della matrice di punti
  ember: '#5A3A10', // ambra spenta
  dmd: '#1A0E00', // nero della matrice
  red: '#FF3B30', // rosso bumper (decorativo)
  ivory: '#F4EBD0', // avorio delle plastiche
};

/* 5×7 dot-matrix glyphs: the register's typeface for every numeral in the glass. */
export const DOTS = {
  0: ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  1: ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  2: ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
  3: ['11111', '00010', '00100', '00010', '00001', '10001', '01110'],
  4: ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  5: ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  6: ['00110', '01000', '10000', '11110', '10001', '10001', '01110'],
  7: ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  8: ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  9: ['01110', '10001', '10001', '01111', '00001', '00010', '01100'],
  '/': ['00001', '00010', '00010', '00100', '01000', '01000', '10000'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
};

// ─── the template's tables, verbatim ─────────────
// routes = the sockets on the board (their count is the number of terms shown),
// calls = the flavour of the calls that arrive (a flavour that matches no route
// is a call with no socket: it is stamped 404, never plugged). fall = transit
// in seconds, need = calls to answer, max = calls in the air at once.

export const GC = ['GET', '/clienti'];
export const GO = ['GET', '/ordini'];
export const GP = ['GET', '/prodotti'];
export const GCA = ['GET', '/clienti/attivi'];
export const GOA = ['GET', '/ordini/aperti'];
export const PC = ['POST', '/clienti'];
export const PO = ['POST', '/ordini'];
export const DC = ['DELETE', '/clienti'];
export const GCID = ['GET', '/clienti/:id'];
export const GOID = ['GET', '/ordini/:id'];
export const DCID = ['DELETE', '/clienti/:id'];
export const G7 = ['GET', '/clienti/7'];
export const G42 = ['GET', '/clienti/42'];
export const GO3 = ['GET', '/ordini/3'];
export const GO9 = ['GET', '/ordini/9'];
export const GF = ['GET', '/fatture'];
export const PUC = ['PUT', '/clienti'];
export const PUO = ['PUT', '/ordini'];
export const D7 = ['DELETE', '/clienti/7'];
export const D9 = ['DELETE', '/clienti/9'];

export function B(o) {
  return {
    routes: [GC],
    calls: [GC],
    fall: 2.8,
    need: 5,
    stamp: false,
    noJack: false,
    max: 1,
    ...o,
  };
}

export const CH = [
  {
    t: ['Innestare', 'Plugging in'],
    titles: [
      ['La prima presa', 'First socket'],
      ['Ancora una', 'One more'],
      ['Due chiamate', 'Two calls'],
      ['Più svelto', 'Quicker'],
      ['Il ritmo', 'The rhythm'],
    ],
    beats: [
      B({ routes: [GC], calls: [GC], fall: 3.4, need: 3 }),
      B({ routes: [GC], calls: [GC], fall: 3.0, need: 4 }),
      B({ routes: [GC, GO], calls: [GC, GO], fall: 2.9, need: 5 }),
      B({ routes: [GC, GO], calls: [GC, GO], fall: 2.2, need: 6, max: 2 }),
      B({ routes: [GC, GO], calls: [GC, GO], fall: 2.7, need: 5 }),
    ],
  },
  {
    t: ['Due indirizzi', 'Two addresses'],
    titles: [
      ['Tre prese', 'Three sockets'],
      ['Leggi la coda', 'Read the tail'],
      ['Simili', 'Similar'],
      ['Stretti', 'Tight'],
      ['A occhio', 'At a glance'],
    ],
    beats: [
      B({ routes: [GC, GO, GP], calls: [GC, GO, GP], fall: 3.0, need: 4 }),
      B({ routes: [GC, GCA, GO], calls: [GC, GCA, GO], fall: 2.8, need: 5 }),
      B({ routes: [GO, GOA, GP], calls: [GO, GOA, GP], fall: 2.6, need: 5 }),
      B({ routes: [GC, GCA, GO, GP], calls: [GC, GCA, GO, GP], fall: 2.0, need: 7, max: 2 }),
      B({ routes: [GC, GCA, GO], calls: [GC, GCA, GO], fall: 2.6, need: 5 }),
    ],
  },
  {
    t: ['Il metodo conta', 'The method counts'],
    titles: [
      ['Entra POST', 'POST arrives'],
      ['Stesso indirizzo', 'Same address'],
      ['Prese diverse', 'Different sockets'],
      ['Tre metodi', 'Three methods'],
      ['Adesso lo sai', 'Now you know'],
    ],
    beats: [
      B({ routes: [GC, PC], calls: [GC, PC], fall: 3.0, need: 4 }),
      B({ routes: [GC, PC, GO], calls: [GC, PC, GO], fall: 2.8, need: 5 }),
      B({ routes: [GC, PC, GO, PO], calls: [GC, PC, GO, PO], fall: 2.6, need: 6 }),
      B({ routes: [GC, PC, DC, GO], calls: [GC, PC, DC, GO], fall: 2.0, need: 7, max: 2 }),
      B({ routes: [GC, PC, GO, PO], calls: [GC, PC, GO, PO], fall: 2.6, need: 6 }),
    ],
  },
  {
    t: ['Il numero dopo il nome', 'The number after the name'],
    titles: [
      ['La presa con :id', 'The :id socket'],
      ['Uno qualsiasi', 'Any one'],
      ['Non è la lista', 'Not the list'],
      ['Misti', 'Mixed'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ routes: [GC, GCID], calls: [GC, G7], fall: 3.0, need: 4 }),
      B({ routes: [GC, GCID], calls: [G7, G42, GC], fall: 2.8, need: 5 }),
      B({ routes: [GC, GCID, GOID], calls: [G7, GO3, GC], fall: 2.6, need: 6 }),
      B({ routes: [GC, GCID, PC, GOID], calls: [G7, PC, GO9, GC], fall: 2.0, need: 7, max: 2 }),
      B({ routes: [GC, GCID, GOID], calls: [G7, GO3, GC], fall: 2.6, need: 6 }),
    ],
  },
  {
    t: ['Il timbro della risposta', 'The response stamp'],
    titles: [
      ['Duecento', 'Two hundred'],
      ['Creato', 'Created'],
      ['Non è sempre 200', 'Not always 200'],
      ['Timbra svelto', 'Stamp quickly'],
      ['Le due risposte', 'The two answers'],
    ],
    beats: [
      B({ routes: [GC], calls: [GC], fall: 3.2, need: 4, stamp: true }),
      B({ routes: [GC, PC], calls: [GC, PC], fall: 3.0, need: 5, stamp: true }),
      B({ routes: [GC, PC, GO], calls: [GC, PC, GO], fall: 2.8, need: 5, stamp: true }),
      B({
        routes: [GC, PC, GO, PO],
        calls: [GC, PC, GO, PO],
        fall: 2.2,
        need: 7,
        stamp: true,
        max: 2,
      }),
      B({ routes: [GC, PC, GO], calls: [GC, PC, GO], fall: 2.8, need: 5, stamp: true }),
    ],
  },
  {
    t: ["Quando non c'è presa", 'When there is no socket'],
    titles: [
      ['Il primo 404', 'First 404'],
      ['Non forzarlo', 'Do not force it'],
      ['Timbra e basta', 'Just stamp'],
      ['Fra i validi', 'Among the valid'],
      ['Tutti i casi', 'Every case'],
    ],
    beats: [
      B({ routes: [GC], calls: [GC, GF], fall: 3.2, need: 4, stamp: true, noJack: true }),
      B({ routes: [GC, GO], calls: [GC, GF, GO], fall: 3.0, need: 5, stamp: true, noJack: true }),
      B({ routes: [GC, PC], calls: [GC, DC, PC], fall: 2.8, need: 5, stamp: true, noJack: true }),
      B({
        routes: [GC, GCID, PC],
        calls: [G7, GF, PC, PUC],
        fall: 2.2,
        need: 7,
        stamp: true,
        noJack: true,
        max: 2,
      }),
      B({
        routes: [GC, GCID, PC, GO],
        calls: [G7, GF, PC, GO],
        fall: 2.7,
        need: 6,
        stamp: true,
        noJack: true,
      }),
    ],
  },
  {
    t: ['A raffica', 'In bursts'],
    titles: [
      ['Due in aria', 'Two in the air'],
      ['Meno tempo', 'Less time'],
      ['Sei chiamate', 'Six calls'],
      ['Il picco', 'The peak'],
      ['Automatico', 'Automatic'],
    ],
    beats: [
      B({ routes: [GC, PC, GO], calls: [GC, PC, GO], fall: 2.2, need: 6, max: 2, stamp: true }),
      B({
        routes: [GC, GCID, PC, GO],
        calls: [G7, PC, GO, GC],
        fall: 2.1,
        need: 7,
        max: 2,
        stamp: true,
      }),
      B({
        routes: [GC, PC, GO, PO],
        calls: [GC, PC, GO, PO],
        fall: 2.0,
        need: 7,
        max: 2,
        stamp: true,
        noJack: true,
      }),
      B({
        routes: [GC, GCID, PC, GOID],
        calls: [G7, PC, GO3, GF],
        fall: 1.9,
        need: 8,
        max: 3,
        stamp: true,
        noJack: true,
      }),
      B({ routes: [GC, PC, GO], calls: [GC, PC, GO], fall: 2.4, need: 6, max: 2, stamp: true }),
    ],
  },
  {
    t: ['Il turno intero', 'The whole shift'],
    titles: [
      ['Tutto insieme', 'All together'],
      ['Senza rete', 'No net'],
      ['La prova', 'The test'],
      ['Il picco', 'The peak'],
      ['Chiusura', 'Closing'],
    ],
    beats: [
      B({
        routes: [GC, GCID, PC, GO],
        calls: [G7, PC, GO, GC],
        fall: 2.4,
        need: 7,
        max: 2,
        stamp: true,
      }),
      B({
        routes: [GC, GCID, PC, DCID],
        calls: [G7, D7, PC, GF],
        fall: 2.2,
        need: 8,
        max: 2,
        stamp: true,
        noJack: true,
      }),
      B({
        routes: [GC, GCID, PC, GOID, DCID],
        calls: [G7, PC, D9, GF, PUO],
        fall: 2.0,
        need: 8,
        max: 3,
        stamp: true,
        noJack: true,
      }),
      B({
        routes: [GC, GCID, PC, GOID, PO],
        calls: [G7, PC, GO3, PO, GF],
        fall: 1.9,
        need: 9,
        max: 3,
        stamp: true,
        noJack: true,
      }),
      B({
        routes: [GC, GCID, PC, GO],
        calls: [G7, PC, GO, GC],
        fall: 2.5,
        need: 6,
        max: 2,
        stamp: true,
      }),
    ],
  },
];

export const TX = {
  it: {
    wrong: [
      'Hai innestato «{it}» nella presa «{pick}».',
      'Quella presa porta un altro termine: la chiamata è caduta.',
      '«{it}» in inglese si dice «{word}»: è quella la presa da cercare.',
    ],
    force: [
      'Hai cercato una presa per «{it}».',
      "Hai innestato in «{pick}», ma sul quadro non c'è la presa «{word}»: la chiamata è caduta.",
      "Se non c'è presa la risposta è 404: si timbra, non si forza. «{it}» resta «{word}», ma stanotte non ha presa.",
    ],
    drop: [
      '«{it}» è caduta senza risposta.',
      "Nessuno l'ha innestata né timbrata in tempo.",
      'Ogni chiamata vuole una risposta, anche quando è un 404: «{it}» è «{word}».',
    ],
    stamp: [
      'Hai timbrato {pick} su «{it}».',
      'Il timbro giusto era {want}: la chiamata è caduta.',
      "Prima la presa, poi il timbro: «{it}» è «{word}»; 200 se legge, 201 se crea (POST), 404 se non c'è presa.",
    ],
    stampEarly:
      'Il timbro è quello, ma prima va innestata nella presa «{word}»: la chiamata è caduta.',
    answerJack: 'presa «{word}»',
    answerStamp: 'timbro 404',
    hint: '{m} «{it}» → {answer} · trascina lo spinotto nella presa · tastiera: ← → presa, spazio innesta, 1-4 timbri',
    eyebrow: 'Chiamata risposta',
  },
  en: {
    wrong: [
      'You plugged "{it}" into the "{pick}" socket.',
      'That socket carries another term: the call dropped.',
      '"{it}" in English is "{word}": that is the socket to look for.',
    ],
    force: [
      'You looked for a socket for "{it}".',
      'You plugged it into "{pick}", but there is no "{word}" socket on the board: the call dropped.',
      'With no socket the answer is 404: you stamp it, you do not force it. "{it}" is still "{word}", it just has no socket tonight.',
    ],
    drop: [
      '"{it}" dropped with no answer.',
      'Nobody plugged or stamped it in time.',
      'Every call wants an answer, even when it is a 404: "{it}" is "{word}".',
    ],
    stamp: [
      'You stamped {pick} on "{it}".',
      'The right stamp was {want}: the call dropped.',
      'Socket first, stamp second: "{it}" is "{word}"; 200 when it reads, 201 when it creates (POST), 404 when there is no socket.',
    ],
    stampEarly:
      'The stamp is right, but the call goes into the "{word}" socket first: the call dropped.',
    answerJack: '"{word}" socket',
    answerStamp: '404 stamp',
    hint: '{m} "{it}" → {answer} · drag the plug into the socket · keyboard: ← → socket, space plugs, 1-4 stamps',
    eyebrow: 'Call answered',
  },
};

/* The template's matcher: same method, same segment count, ":id" takes a number. */
/* The template's matcher: same method, same segment count, ":id" takes a number. */
export function matches(call, route) {
  if (call[0] !== route[0]) return false;
  const a = call[1].split('/');
  const b = route[1].split('/');
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (b[i] === ':id') {
      if (!/^\d+$/.test(a[i])) return false;
    } else if (a[i] !== b[i]) return false;
  }
  return true;
}

export function hasSocket(call, routes) {
  return routes.some((rt) => matches(call, rt));
}

export function jackXY(n, i) {
  const cols = Math.min(3, Math.max(1, n));
  const r = Math.floor(i / cols);
  const cc = i % cols;
  const w = W / (cols + 0.5);
  return { x: W * 0.5 + (cc - (cols - 1) / 2) * w, y: BOARD + r * 86 };
}

export function stampXY(i) {
  const n = STAMPS.length;
  const w = W / (n + 0.6);
  return { x: W * 0.5 + (i - (n - 1) / 2) * w, y: STAMPY };
}
