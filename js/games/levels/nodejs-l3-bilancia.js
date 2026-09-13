/**
 * LA BILANCIA DI NOTTE — Node.js L3 «JavaScript Essenziale».
 * js/topics/data/nodejs.js levels[2]: 4 lezioni × 10 termini = 40, pesati in
 * 8 capitoli × 5 commesse, una commessa per termine (LevelBeats: capitolo c,
 * commessa b → termine c·5 + b).
 *
 * SCHEDA DI PROGETTO (ricerca/00 §0.3) + SCHEDA VISIVA (ricerca/42 §42.3)
 * GIOCO ...... La bilancia di notte
 * TOPIC ...... Node.js, L3 JavaScript Essenziale (nodejs.js levels[2])
 * CONCETTO ... Due cose possono pesare uguale senza essere la stessa cosa. Il
 *              significato italiano sul piatto di sinistra e il termine inglese
 *              sul piatto di destra pesano uguale: dicono la stessa cosa in due
 *              lingue. La bilancia dice se pesano uguale, non se sono identici.
 * FORMA ...... identità   VERBO ... pesare (appoggiare la tessera sul piatto)
 * ARCHETIPO .. nuovo, parente di ricerca/14 (identità) — la bilancia
 * VINCI SE ... riempi la commessa: tot pesate in equilibrio (win)
 * PERDI SE ... il piatto si rovescia tre volte: il banco chiude, la commessa
 *              ricomincia (nelle prime due commesse non si perde mai)
 * SBAGLI ..... 1 il piatto si inclina e la tessera scivola via, tonfo, nessun testo
 *              2 alla seconda sullo stesso campione la tessera giusta si accende
 *              3 coaching: cosa hai pesato, cosa pesava il campione, il termine
 * CAPITOLI ... 1 il gesto · 2 numeri e stringhe · 3 FRATTURA lo zero e il vuoto
 *              4 vero e falso · 5 il niente e il non-c'è · 6 le scatole
 *              7 a raffica · 8 la commessa intera (tabelle del template, intatte)
 * MONDO ...... un banco di pesatura di notte: la lavagna alle spalle, il tavolo
 *              di carta, la bilancia a due piatti di legno chiaro, il cestello
 *              con le tessere; il cartellino del campione parla italiano, le
 *              tessere parlano inglese
 * REGISTRO ... R13 Carta e tessere, sei colori (§42.6 #3): lavagna #1F2A24 per
 *              la parete di notte, carta #F6F1E7 per il gesso, il tavolo, il
 *              cartellino e le tessere, legno chiaro #E4C590 per la bilancia, la
 *              mensola, i bordi e le ombre, inchiostro #1C1B1A per i tratti (a
 *              velo: il piatto rovesciato, la tessera che scivola via, i
 *              trattini); due stati Wordle, verde #6AAA64 per l'equilibrio e
 *              giallo #C9B458 per l'aiuto. Il grigio Wordle non serve: lo
 *              «spento» è inchiostro a velo, mai rosso.
 *              figura: la bilancia a due piatti · suolo: il tavolo di carta a
 *              griglia, la mensola del cestello
 *              movimento: la tessera scivola sulla griglia fino al piatto e fa
 *              flip quando atterra; il giogo oscilla e si assesta
 *              carattere: grazia di sistema (Georgia) per le lettere, Inter per
 *              le cifre del gesso
 * NUMERI ..... transito del campione slot×5 s (16→9,5 s: il template dichiara
 *              `slot` ma non lo legge mai, il ×5 è una scelta del port), calo
 *              0,55 s, scivolata 0,32 s, presa 0,5 s, rovescio 0,9 s, lampo
 *              caldo 0,33 s; cestello 3→6 tessere; pesate 3→9; tre vite.
 *              La scala dell'errore (sbagli, aiuto) è del cartellino, non del
 *              turno: un cartellino scaduto la riporta con sé quando torna.
 * TEST 1 ..... le tessere hanno tutte la stessa forma e la stessa carta: cambia
 *              solo il termine inciso. La posizione è casuale e cambia a ogni
 *              pesata, anche dopo un errore (il cestello si ridistribuisce, così
 *              non si vince per esclusione).
 * TEST 2 ..... "Appoggio sul piatto il termine inglese che pesa come il
 *              significato scritto sul cartellino"
 * TEST 3 ..... un cartellino oscilla appeso al gancio, cala sul piatto vuoto,
 *              e nel cestello compaiono le tessere
 */

import * as engine from '../KaioEngine.js';
import { beatItems, distractors, fillers, labelOf, meaningOf, pickLang } from '../LevelBeats.js';

const W = 420;
const H = 910;
const PIVOT = { x: W / 2, y: 292 };
const ARM = 118;
const STRING = 74;
const TABLE_Y = 478;
const BASKET = H * 0.64;
const ROW_H = 74;
const TILE_W = 104;
const TILE_H = 56;
const SAMPLE_W = 156;
const SAMPLE_H = 56;
const HOOK = { x: W / 2, y: 64 };
const DROP_S = 0.55;
const FLY_S = 0.32;
const HOLD_S = 0.5;
const LIFT_S = 0.4;
const TIP_S = 0.9;
const DONE_S = 0.9;
const TRANSIT_K = 5;
const FLIP_AT = 0.7;
const MAX_TILT = 0.42;
const SERIF = 'Georgia,"Times New Roman",serif';
const SANS = '"Inter",system-ui,sans-serif';

/* R13 · Carta e tessere (ricerca/42 §42.4): six colours, none the frame's
   gold. Every tint on the glass is one of these at full strength or as a
   veil (`veil`), so the count stays six. */
const C = {
  lavagna: '#1F2A24',
  carta: '#F6F1E7',
  legno: '#E4C590',
  inchiostro: '#1C1B1A',
  verde: '#6AAA64',
  giallo: '#C9B458',
};

function veil(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
}

function shuffle(input) {
  const a = input.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

/* Tabelle del template, intatte: pool (taglia del cestello), need, win (pesate
   in equilibrio per chiudere la commessa), slot (transito del campione, in
   secondi × TRANSIT_K), lives (tre piatti rovesciati chiudono il banco). */
const B = (o) => ({ pool: ['0', '1', '2'], need: 5, win: 4, slot: 2.6, lives: 3, ...o });

const CFG = [
  {
    t: ['Il gesto', 'The gesture'],
    titles: [
      ['Il primo peso', 'First weight'],
      ['Ancora uno', 'One more'],
      ['Due nel cesto', 'Two in the basket'],
      ['Più svelto', 'Quicker'],
      ['Il ritmo', 'The rhythm'],
    ],
    beats: [
      B({ pool: ['0', '1', '2'], win: 3, slot: 3.2, lives: Infinity }),
      B({ pool: ['0', '1', '2'], win: 4, slot: 3.0, lives: Infinity }),
      B({ pool: ['0', '1', '2'], win: 4, slot: 2.8 }),
      B({ pool: ['0', '1', '2'], win: 6, slot: 2.1 }),
      B({ pool: ['0', '1', '2'], win: 5, slot: 2.7 }),
    ],
  },
  {
    t: ['Numeri e stringhe', 'Numbers and strings'],
    titles: [
      ['La virgoletta', 'The quote'],
      ['Pesa uguale', 'Same weight'],
      ['Non è lo stesso', 'Not the same'],
      ['Misti', 'Mixed'],
      ['A occhio', 'At a glance'],
    ],
    beats: [
      B({ pool: ['1', '"1"', '2'], win: 4, slot: 3.0 }),
      B({ pool: ['1', '"1"', '2', '"2"'], win: 4, slot: 2.8 }),
      B({ pool: ['1', '"1"', '2', '"2"', '"02"'], win: 5, slot: 2.6 }),
      B({ pool: ['1', '"1"', '2', '"2"', '"02"', '0'], win: 6, slot: 2.0 }),
      B({ pool: ['1', '"1"', '2', '"2"'], win: 5, slot: 2.6 }),
    ],
  },
  {
    t: ['Lo zero e il vuoto', 'Zero and empty'],
    titles: [
      ['Zero', 'Zero'],
      ['La stringa vuota', 'Empty string'],
      ['Pesano uguale', 'Equal weight'],
      ['Anche lo spazio', 'Even the space'],
      ['Adesso lo sai', 'Now you know'],
    ],
    beats: [
      B({ pool: ['0', "''", '1'], win: 4, slot: 3.0 }),
      B({ pool: ['0', "''", '1', '"0"'], win: 4, slot: 2.8 }),
      B({ pool: ['0', "''", '"0"', '1', '2'], win: 5, slot: 2.6 }),
      B({ pool: ['0', "''", '"0"', '" "', '1', 'false'], win: 6, slot: 2.1 }),
      B({ pool: ['0', "''", '"0"', '1'], win: 5, slot: 2.6 }),
    ],
  },
  {
    t: ['Vero e falso', 'True and false'],
    titles: [
      ['Uno e vero', 'One and true'],
      ['Zero e falso', 'Zero and false'],
      ['Non sono numeri', 'Not numbers'],
      ['Tutti e quattro', 'All four'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ pool: ['1', 'true', '0'], win: 4, slot: 3.0 }),
      B({ pool: ['0', 'false', '1'], win: 4, slot: 2.8 }),
      B({ pool: ['1', 'true', '0', 'false'], win: 5, slot: 2.6 }),
      B({ pool: ['1', 'true', '0', 'false', "''", '"1"'], win: 6, slot: 2.1 }),
      B({ pool: ['1', 'true', '0', 'false'], win: 5, slot: 2.6 }),
    ],
  },
  {
    t: ["Il niente e il non-c'è", 'Nothing and missing'],
    titles: [
      ['null', 'null'],
      ['undefined', 'undefined'],
      ['Fra loro sì', 'Between them yes'],
      ['Con zero no', 'With zero no'],
      ['Due gemelli', 'Two twins'],
    ],
    beats: [
      B({ pool: ['null', '1', '0'], win: 4, slot: 3.0 }),
      B({ pool: ['undefined', '1', '0'], win: 4, slot: 2.8 }),
      B({ pool: ['null', 'undefined', '0'], win: 5, slot: 2.6 }),
      B({ pool: ['null', 'undefined', '0', "''", 'false'], win: 6, slot: 2.1 }),
      B({ pool: ['null', 'undefined', '0', '1'], win: 5, slot: 2.6 }),
    ],
  },
  {
    t: ['Le scatole', 'The boxes'],
    titles: [
      ['La scatola vuota', 'Empty box'],
      ['Con un pezzo', 'With one item'],
      ['Mai uguali', 'Never equal'],
      ['NaN', 'NaN'],
      ['Tutto il cesto', 'The whole basket'],
    ],
    beats: [
      B({ pool: ['[]', '0', '1'], win: 4, slot: 3.0 }),
      B({ pool: ['[1]', '1', '[]'], win: 4, slot: 2.8 }),
      B({ pool: ['[]', '[1]', '0', '1', '{}'], win: 5, slot: 2.6 }),
      B({ pool: ['NaN', '1', '0', '{}', '[]'], win: 5, slot: 2.4 }),
      B({ pool: ['[]', '[1]', '[2]', '0', '1', '2'], win: 6, slot: 2.5 }),
    ],
  },
  {
    t: ['A raffica', 'In bursts'],
    titles: [
      ['Cesto pieno', 'Full basket'],
      ['Meno tempo', 'Less time'],
      ['Sei pesate', 'Six weighings'],
      ['Il picco', 'The peak'],
      ['Automatico', 'Automatic'],
    ],
    beats: [
      B({ pool: ['0', "''", '1', '"1"', 'true', 'false'], win: 6, slot: 2.3 }),
      B({ pool: ['0', "''", '1', '"1"', 'true', 'false', 'null'], win: 7, slot: 2.1 }),
      B({ pool: ['0', '"0"', '1', '"1"', '[]', '[1]'], win: 7, slot: 2.0 }),
      B({ pool: ['0', "''", '1', '"1"', 'true', 'false', 'null', 'undefined'], win: 8, slot: 1.9 }),
      B({ pool: ['0', "''", '1', '"1"', 'true', 'false'], win: 6, slot: 2.4 }),
    ],
  },
  {
    t: ['La commessa intera', 'The whole order'],
    titles: [
      ['Tutto insieme', 'All together'],
      ['Senza rete', 'No net'],
      ['La prova', 'The test'],
      ['Il picco', 'The peak'],
      ['Chiusura', 'Closing'],
    ],
    beats: [
      B({ pool: ['0', "''", '"0"', '1', '"1"', 'true', 'null', '[]'], win: 7, slot: 2.3 }),
      B({
        pool: ['0', "''", '1', '"1"', 'false', 'true', 'null', 'undefined', '[]'],
        win: 8,
        slot: 2.1,
      }),
      B({
        pool: [
          '0',
          "''",
          '"0"',
          '" "',
          '1',
          '"1"',
          'true',
          'false',
          'null',
          'undefined',
          'NaN',
          '[]',
          '{}',
        ],
        win: 8,
        slot: 2.0,
      }),
      B({
        pool: [
          '0',
          "''",
          '"0"',
          '1',
          '"1"',
          '"02"',
          '2',
          'true',
          'false',
          'null',
          'undefined',
          'NaN',
          '[]',
          '[1]',
          '{}',
        ],
        win: 9,
        slot: 1.9,
      }),
      B({ pool: ['0', "''", '1', '"1"', 'true', 'null', '[]', '2'], win: 6, slot: 2.5 }),
    ],
  },
];

const CH = CFG.map((c) => ({
  t: c.t,
  titles: c.titles,
  beats: c.beats.map((b, i) => ({ b: i, ...b })),
}));

const TX = {
  it: {
    wrong: [
      'Hai messo «{pick}» contro «{it}».',
      'Non pesano uguale: il piatto si è rovesciato.',
      'Pesare uguale non vuol dire essere la stessa cosa: «{it}» pesa come «{word}», in inglese.',
    ],
    closed: [
      'Tre piatti rovesciati: il banco chiude.',
      'La commessa ricomincia da capo: il cartellino torna al gancio e il cestello si ridistribuisce.',
      'Leggi il cartellino, poi cerca la tessera che pesa uguale: «{it}» pesa come «{word}».',
    ],
    hint: 'il piatto dice ==, non === · tocca una tessera del cestello · da tastiera: ← → ↑ ↓ tessera, spazio, 1-6',
    eyebrow: 'Commessa chiusa',
  },
  en: {
    wrong: [
      'You put "{pick}" against "{it}".',
      'They do not weigh the same: the pan tipped over.',
      'Weighing the same is not being the same thing: "{it}" weighs as "{word}", in English.',
    ],
    closed: [
      'Three pans tipped over: the counter closes.',
      'The order starts again: the tag goes back on the hook and the basket is dealt afresh.',
      'Read the tag, then find the tile that weighs the same: "{it}" weighs as "{word}".',
    ],
    hint: 'the pan says ==, not === · tap a tile from the basket · keyboard: ← → ↑ ↓ tile, space, 1-6',
    eyebrow: 'Order closed',
  },
};

// ─── the spine ───────────────────────────────────

/**
 * Which chapter this beat belongs to. The engine's goBeat installs the new
 * chapter's beats before it calls reset, so the installed table is the truth;
 * the state fallback covers a host that never installed one.
 */
function installedChapter(host) {
  const i = host.CH ? host.CH.findIndex((c) => c.beats === host.BEATS) : -1;
  return i >= 0 ? i : host.state.chapter || 0;
}

function lessonOf(host, item) {
  const lessons = host.session.lessons || [];
  if (!item) return lessons[0] || null;
  return lessons.find((l) => l.id === item.lesson) || null;
}

/**
 * The order's queue of samples: the beat's own term first, then fillers from
 * the same lesson until the order has `win` weighings — each filler is
 * presented and graded like the term (brief §2.3). A level too small to fill
 * the order repeats its own terms.
 */
function buildQueue(host) {
  const terms = host.terms.slice();
  if (!terms.length) return [];
  let q = terms.concat(fillers(host.session, host.item, host.needed - terms.length));
  while (q.length < host.needed) q = q.concat(terms);
  return q.slice(0, host.needed);
}

function slotXY(n, i) {
  const cols = Math.min(3, n);
  const r = Math.floor(i / cols);
  const cc = i % cols;
  const w = W / (cols + 0.6);
  return { x: W * 0.5 + (cc - (cols - 1) / 2) * w, y: BASKET + r * ROW_H };
}

/* The basket: the sample's term plus distractors from the same lesson, all
   on the same cream tile, shuffled — the template's basket size (3 to 6). */
function fillBasket(host) {
  const c = host.cfg;
  const n = Math.min(6, Math.max(3, c.pool.length));
  const sample = host.sample;
  const set = sample ? shuffle([sample].concat(distractors(host.session, sample, n - 1))) : [];
  host.basket = set.map((item, i) => {
    const s = slotXY(set.length, i);
    return { item, i, x: s.x, y: s.y, gone: false, wob: Math.random() * 6.28, glow: 0 };
  });
  host.sel = -1;
}

/* The second error on a tag lights its tile (passo 6): the aid, in Wordle
   yellow, on whatever basket the tag currently faces. */
function lightRightTile(host) {
  const ok = host.basket.find((k) => !k.gone && k.item === host.sample);
  if (ok) ok.glow = 1;
}

/**
 * The next tag comes down from the hook onto the empty left pan (TEST 3). Its
 * Italian meaning is the presentation of the term, so the item is introduced
 * here, the moment it becomes visible.
 */
function newSample(host) {
  const item = host.queue.shift() || null;
  host.sample = item;
  // The error ladder belongs to the tag, not to the turn: a tag that expired
  // after two errors comes back still lit, and its third error still coaches.
  const ladder = (item && host.ladder.get(item)) || { wrong: 0, aided: false };
  host.wrong = ladder.wrong;
  host.aided = ladder.aided;
  host.landed = false;
  host.dropT = DROP_S;
  host.transitT = 0;
  host.transit = host.cfg.slot * TRANSIT_K;
  if (item) item.introduce();
  fillBasket(host);
  if (host.aided) lightRightTile(host);
  host.session.mark();
  engine.snd(host, 'click', { hz: 1100, v: 0.18 });
}

function init(host) {
  host.parts = [];
  host.terms = [];
  host.item = null;
  host.lesson = null;
  host.queue = [];
  host.basket = [];
  host.sample = null;
  host.matched = [];
  host.chapter = 0;
  host.beat = 0;
  host.t = 0;
  host.motion = 1;
  host.made = 0;
  host.needed = 0;
  host.tilt = 0;
  host.tiltV = 0;
  host.shake = 0;
  host.tipT = 0;
  host.hold = null;
  host.fly = null;
  host.lift = null;
  host.dropT = 0;
  host.landed = false;
  host.transit = 0;
  host.transitT = 0;
  host.expired = 0;
  host.wrong = 0;
  host.aided = false;
  host.ladder = new Map();
  host.flash = 0;
  host.sel = -1;
  host.kbUsed = false;
  host.finished = false;
  host.doneT = 0;
  host.coachKind = null;
}

function reset(host, beat) {
  const cfg = host.BEATS[beat];
  host.cfg = cfg;
  host.beat = beat;
  const ci = installedChapter(host);
  host.chapter = ci;
  // Reduced motion: the tag still has to come down and the tile still has to
  // slide, but everything moves at 0.7× and the wobble is frozen (§15.4,
  // ricerca/42 §42.6 #10).
  host.motion = host.reduceMotion ? 0.7 : 1;

  host.parts = [];
  host.t = 0;
  host.tilt = 0;
  host.tiltV = 0;
  host.shake = 0;
  host.tipT = 0;
  host.hold = null;
  host.fly = null;
  host.lift = null;
  host.made = 0;
  host.matched = [];
  host.expired = 0;
  host.ladder = new Map();
  host.flash = 0;
  host.sel = -1;
  host.kbUsed = false;
  host.finished = false;
  host.doneT = 0;
  host.coachKind = null;
  host.needed = cfg.win;

  host.terms = beatItems(host.session, ci, beat);
  host.item = host.terms[0] || null;
  host.lesson = lessonOf(host, host.item);
  host.queue = buildQueue(host);
  host.session.mode = 'bilancia';
  host.setState({ left: 0 });
  newSample(host);
}

function persist(host) {
  host.session.save({ beat: host.beat, chapter: host.chapter });
}

// ─── the verb ────────────────────────────────────

/* A tile can be lifted only when a tag rests on the left pan, nothing is in
   flight and the pan is not still tipping from the last error (template:
   `tipT`). */
function canWeigh(host) {
  return Boolean(
    host.sample &&
    host.landed &&
    !host.fly &&
    !host.hold &&
    !host.lift &&
    host.tipT <= 0 &&
    !host.finished
  );
}

function startFly(host, tile) {
  if (!canWeigh(host) || tile.gone) return false;
  tile.gone = true;
  host.fly = { tile, t: 0, x0: tile.x, y0: tile.y };
  host.sel = -1;
  engine.snd(host, 'whoosh');
  return true;
}

function rightPan(host) {
  const a = Math.max(-MAX_TILT, Math.min(MAX_TILT, host.tilt));
  return { x: PIVOT.x + Math.cos(a) * ARM, y: PIVOT.y + Math.sin(a) * ARM };
}

/**
 * The weighing is the graded response: the learner's real pick against the
 * term the tag means, through the SDK and never a local `===` (§46.1, §46.2).
 * The cue is `silent` because the balance answers diegetically — the pan
 * settles green, or tips and the tile slides off.
 */
function weigh(host, tile) {
  const sample = host.sample;
  const verdict = sample.attempt(tile.item.english, {
    expected: sample.english,
    mode: 'bilancia',
    hintsUsed: host.aided ? 1 : 0,
    silent: true,
  });
  host.session.mark();
  const rp = rightPan(host);

  if (verdict.correct) {
    host.made++;
    host.wrong = 0;
    host.ladder.delete(sample);
    host.tiltV += 0.9;
    host.flash = 1;
    host.hold = { tile, t: 0, ok: true };
    host.matched.push(sample);
    engine.snd(host, 'tone', { from: 560, to: 900, v: 0.16 });
    engine.burst(host, host.parts, rp.x, rp.y + STRING, 10, C.verde, { up: 70 });
    host.setState({ step: host.made });
    if (host.made >= host.needed) {
      // The order is closed: every term the beat asked is cleared together.
      host.finished = true;
      host.doneT = DONE_S;
      for (const it of host.terms) it.clear();
      for (const it of host.matched) it.clear();
      persist(host);
      engine.snd(host, 'chime');
    }
    return;
  }

  // Wrong: the pan tips, the tile slides off — a crash, never red. The tag
  // stays on the left pan and the basket is re-dealt, so the same meaning is
  // asked again and elimination cannot win (TEST 1). A fresh deal gets a
  // fresh transit, so the ladder can reach its coach before the tag expires.
  host.tipT = TIP_S;
  host.tiltV += 4.2;
  host.shake = 0.8;
  host.transitT = 0;
  host.hold = { tile, t: 0, ok: false };
  engine.snd(host, 'crash');
  engine.burst(host, host.parts, rp.x, rp.y + STRING, 14, C.legno, { up: 30 });
  host.wrong++;
  const left = host.state.left + 1;
  host.setState({ left });
  let coach = null;
  if (host.wrong === 2) host.aided = true;
  if (host.wrong >= 3) {
    coach = {
      kind: 'wrong',
      pick: tile.item.english,
      word: sample.english,
      it: meaningOf(sample, 'it'),
    };
    host.wrong = 0;
  }
  if (left >= 3 && host.cfg.lives !== Infinity) {
    // The counter closes: the same order starts over (template). Without the
    // streak coach this would be a mute restart, so the closing gets its own.
    if (!coach) {
      coach = {
        kind: 'closed',
        pick: tile.item.english,
        word: sample.english,
        it: meaningOf(sample, 'it'),
      };
    }
    reset(host, host.beat);
    host.setState({ step: 0 });
  } else {
    fillBasket(host);
    if (host.aided) lightRightTile(host);
  }
  if (coach) {
    host.coachKind = coach.kind;
    host.setState({ coach });
  }
}

/**
 * The tag's transit ran out: it swings back up to the hook and rejoins the
 * order. Nothing was produced, so nothing is graded and no pan tipped (§46.2:
 * a lost event is not an attempt).
 */
function expire(host) {
  const item = host.sample;
  host.expired++;
  host.lift = { item, t: 0 };
  host.queue.push(item);
  if (host.wrong || host.aided) host.ladder.set(item, { wrong: host.wrong, aided: host.aided });
  host.sample = null;
  host.landed = false;
  host.basket = [];
  host.sel = -1;
  engine.snd(host, 'fall');
}

// ─── update ──────────────────────────────────────

function update(host, dt) {
  host.t += dt;
  const c = host.cfg;
  if (!c) return;
  const m = host.motion || 1;

  if (host.shake > 0) host.shake -= dt * 3.4;
  if (host.flash > 0) host.flash -= dt * 3;
  if (host.tipT > 0) host.tipT -= dt;

  // The yoke is a spring (template): under reduced motion it settles slower.
  host.tiltV += (-host.tilt * 26 - host.tiltV * 5.5) * dt * m;
  host.tilt += host.tiltV * dt * m;

  if (host.dropT > 0 && host.sample) {
    host.dropT -= dt * m;
    if (host.dropT <= 0) {
      host.dropT = 0;
      host.landed = true;
      engine.snd(host, 'thud', { v: 0.1 });
    }
  }

  if (host.fly) {
    host.fly.t += dt * m;
    if (host.fly.t >= FLY_S) {
      const tile = host.fly.tile;
      host.fly = null;
      weigh(host, tile);
    }
  }

  if (host.hold) {
    host.hold.t += dt * m;
    if (host.hold.t >= HOLD_S) {
      const ok = host.hold.ok;
      host.hold = null;
      if (ok && !host.finished) newSample(host);
    }
  }

  if (host.lift) {
    host.lift.t += dt * m;
    if (host.lift.t >= LIFT_S) {
      host.lift = null;
      newSample(host);
    }
  }

  if (canWeigh(host)) {
    host.transitT += dt * m;
    if (host.transitT >= host.transit) expire(host);
  }

  if (!host.reduceMotion) for (const b of host.basket) b.wob += dt * 1.6;
  host.parts = engine.parts(host.parts, dt, 480);

  if (host.doneT > 0) {
    host.doneT -= dt;
    if (host.doneT <= 0) {
      host.doneT = 0;
      host.setState({ done: true });
    }
  }
}

// ─── input: tap a tile, or pick it by keyboard ───

function tileAt(host, p) {
  for (const b of host.basket) {
    if (b.gone) continue;
    if (Math.abs(p.x - b.x) <= TILE_W / 2 + 4 && Math.abs(p.y - b.y) <= TILE_H / 2 + 6) return b;
  }
  return null;
}

function tap(host, p) {
  if (host.finished || host.tipT > 0) return;
  const b = tileAt(host, p);
  if (b && startFly(host, b)) return;
  engine.snd(host, 'fall');
}

function liveTiles(host) {
  return host.basket.filter((b) => !b.gone);
}

function key(host, e) {
  if (host.finished) return;
  const live = liveTiles(host);
  const n = live.length;
  const cols = Math.min(3, host.basket.length || 3);
  const cur = host.sel >= 0 ? live.findIndex((b) => b.i === host.sel) : -1;
  // Only a key that steers or confirms turns the ink outline on: Escape, Tab
  // and the host's own keys leave the basket as the finger left it.
  if (e.key === 'ArrowLeft') {
    host.kbUsed = true;
    if (n) host.sel = live[cur < 0 ? n - 1 : (cur - 1 + n) % n].i;
    e.preventDefault();
  } else if (e.key === 'ArrowRight') {
    host.kbUsed = true;
    if (n) host.sel = live[cur < 0 ? 0 : (cur + 1) % n].i;
    e.preventDefault();
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    host.kbUsed = true;
    if (n) {
      const step = e.key === 'ArrowUp' ? -cols : cols;
      const from = cur < 0 ? 0 : cur;
      const to = (((from + step) % n) + n) % n;
      host.sel = live[to].i;
    }
    e.preventDefault();
  } else if (e.key === ' ' || e.key === 'Enter') {
    host.kbUsed = true;
    e.preventDefault();
    const b = host.basket.find((k) => k.i === host.sel && !k.gone);
    if (b) startFly(host, b);
  } else if (/^[1-6]$/.test(e.key)) {
    // The digit is the slot on the rack (1-6, reading order), the number the
    // hint prints; the basket is always full while a tile can be lifted.
    host.kbUsed = true;
    const b = host.basket[parseInt(e.key, 10) - 1];
    if (b && !b.gone) host.sel = b.i;
  }
}

// ─── drawing ─────────────────────────────────────

function wrapLines(x, text, maxW, maxL) {
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

/* Serif letters on the tile, shrunk until the longest word fits (template's
   `weight()` loop), then wrapped to two lines. */
function fitLines(x, text, maxW, maxL, size, weight) {
  let f = size;
  const longest = String(text)
    .split(' ')
    .reduce((a, b) => (a.length >= b.length ? a : b), '');
  x.font = `${weight} ${f}px ${SERIF}`;
  while (f > 10 && x.measureText(longest).width > maxW) {
    f--;
    x.font = `${weight} ${f}px ${SERIF}`;
  }
  return { size: f, lines: wrapLines(x, text, maxW, maxL) };
}

function chalk(x, text, px, py, size, align) {
  x.font = `600 ${size}px ${SANS}`;
  x.textAlign = align || 'left';
  x.textBaseline = 'middle';
  x.fillStyle = C.carta;
  x.fillText(text, px, py);
}

function drawRoom(host, x) {
  // The chalkboard wall of the night counter.
  x.fillStyle = C.lavagna;
  x.fillRect(-8, -8, W + 16, TABLE_Y + 8);
  x.fillStyle = veil(C.carta, 0.06);
  x.fillRect(0, TABLE_Y - 30, W, 30);
  x.strokeStyle = veil(C.carta, 0.12);
  x.lineWidth = 1;
  x.beginPath();
  x.moveTo(0, 118);
  x.lineTo(W, 118);
  x.stroke();

  // The paper table: a faint grid, the ground everything rests on.
  x.fillStyle = C.carta;
  x.fillRect(-8, TABLE_Y, W + 16, H - TABLE_Y + 8);
  x.strokeStyle = veil(C.legno, 0.55);
  x.lineWidth = 1;
  x.beginPath();
  for (let gx = 22; gx < W; gx += 44) {
    x.moveTo(gx, TABLE_Y + 16);
    x.lineTo(gx, H);
  }
  for (let gy = TABLE_Y + 16 + 44; gy < H; gy += 44) {
    x.moveTo(0, gy);
    x.lineTo(W, gy);
  }
  x.stroke();
  // The wooden edge of the table.
  x.fillStyle = C.legno;
  x.fillRect(-8, TABLE_Y - 2, W + 16, 18);
  x.fillStyle = veil(C.inchiostro, 0.25);
  x.fillRect(-8, TABLE_Y + 14, W + 16, 2);

  // Chalk: the tally in the register's sans numerals, the three pans that may
  // still tip (a spent one is an empty chalk ring, never red), the transit line.
  chalk(x, `${host.made}/${host.needed}`, 18, 42, 24, 'left');
  const left = host.state.left || 0;
  for (let i = 0; i < 3; i++) {
    const spent = i < left;
    x.beginPath();
    x.arc(W - 26 - i * 24, 42, 7, 0, 6.283);
    if (spent) {
      x.strokeStyle = C.carta;
      x.lineWidth = 2;
      x.stroke();
    } else {
      x.fillStyle = C.carta;
      x.fill();
    }
  }
  if (host.sample && host.transit > 0) {
    const rem = Math.max(0, 1 - host.transitT / host.transit);
    x.fillStyle = C.carta;
    x.globalAlpha = 0.7;
    x.fillRect(18, 68, (W - 36) * rem, 3);
    x.globalAlpha = 1;
  }
  chalk(x, '==', PIVOT.x, PIVOT.y - 40, 22, 'center');
}

function drawHook(x) {
  x.strokeStyle = C.carta;
  x.lineWidth = 2;
  x.beginPath();
  x.moveTo(HOOK.x, 0);
  x.lineTo(HOOK.x, HOOK.y - 14);
  x.arc(HOOK.x + 6, HOOK.y - 10, 6, Math.PI, 0.35, true);
  x.stroke();
}

function drawTag(x, cx, cy, text, w, h, hanging) {
  // The sample tag: a paper label with a punched hole, it speaks Italian.
  x.fillStyle = C.legno;
  engine.rr(x, cx - w / 2, cy - h / 2 + 2, w, h, 5);
  x.fill();
  x.fillStyle = C.carta;
  engine.rr(x, cx - w / 2, cy - h / 2, w, h, 5);
  x.fill();
  x.strokeStyle = C.legno;
  x.lineWidth = 1.5;
  engine.rr(x, cx - w / 2, cy - h / 2, w, h, 5);
  x.stroke();
  if (hanging) {
    x.strokeStyle = C.inchiostro;
    x.lineWidth = 1.5;
    x.beginPath();
    x.moveTo(cx, cy - h / 2);
    x.lineTo(HOOK.x, HOOK.y - 4);
    x.stroke();
  }
  x.fillStyle = C.legno;
  x.beginPath();
  x.arc(cx, cy - h / 2 + 8, 3, 0, 6.283);
  x.fill();
  const fit = fitLines(x, text, w - 20, 3, 14, '700');
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillStyle = C.inchiostro;
  const lh = fit.size + 3;
  fit.lines.forEach((l, i) => x.fillText(l, cx, cy + 4 + (i - (fit.lines.length - 1) / 2) * lh));
}

/* One tile silhouette for every term (TEST 1): paper, 4 px corners, a 2 px
   wooden shadow, serif letters. `face` colours the whole tile green when
   balanced; `dim` veils it in ink while it slides off. The aid glow is Wordle
   yellow, steady under reduced motion. */
function drawTile(host, x, cx, cy, text, opts) {
  const o = opts || {};
  const w = TILE_W;
  const h = TILE_H;
  const face = o.face || C.carta;
  x.save();
  x.translate(cx, cy);
  if (o.flip != null) x.scale(Math.max(0.08, Math.abs(Math.cos(o.flip * Math.PI))), 1);
  if (o.alpha != null) x.globalAlpha = o.alpha;
  x.fillStyle = C.legno;
  engine.rr(x, -w / 2, -h / 2 + 2, w, h, 4);
  x.fill();
  x.fillStyle = face;
  engine.rr(x, -w / 2, -h / 2, w, h, 4);
  x.fill();
  if (o.dim) {
    x.fillStyle = veil(C.inchiostro, 0.25);
    engine.rr(x, -w / 2, -h / 2, w, h, 4);
    x.fill();
  }
  if (o.glow) {
    const breathe = host.reduceMotion ? 0 : 0.5 + 0.5 * Math.sin(host.t * 6);
    x.strokeStyle = C.giallo;
    x.lineWidth = 3 + breathe;
    engine.rr(x, -w / 2 + 1.5, -h / 2 + 1.5, w - 3, h - 3, 4);
    x.stroke();
    x.fillStyle = C.giallo;
    x.beginPath();
    x.arc(w / 2 - 8, -h / 2 + 8, 3, 0, 6.283);
    x.fill();
  } else if (o.sel) {
    x.strokeStyle = C.inchiostro;
    x.lineWidth = 2.5;
    engine.rr(x, -w / 2 + 1.5, -h / 2 + 1.5, w - 3, h - 3, 4);
    x.stroke();
  } else {
    x.strokeStyle = C.legno;
    x.lineWidth = 1.2;
    engine.rr(x, -w / 2, -h / 2, w, h, 4);
    x.stroke();
  }
  const fit = fitLines(x, text, w - 14, 2, 15, '700');
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillStyle = o.face ? C.carta : C.inchiostro;
  const lh = fit.size + 3;
  fit.lines.forEach((l, i) => x.fillText(l, 0, (i - (fit.lines.length - 1) / 2) * lh));
  x.restore();
}

function drawPan(x, cx, cy, tipped) {
  // Two strings from the yoke's end down to a shallow wooden dish.
  x.strokeStyle = C.inchiostro;
  x.lineWidth = 1.5;
  x.beginPath();
  x.moveTo(cx, cy);
  x.lineTo(cx - 42, cy + STRING);
  x.moveTo(cx, cy);
  x.lineTo(cx + 42, cy + STRING);
  x.stroke();
  x.fillStyle = C.legno;
  engine.rr(x, cx - 46, cy + STRING - 2, 92, 12, 6);
  x.fill();
  if (tipped) {
    // The tipped pan goes dull under a veil of ink, never red.
    x.fillStyle = veil(C.inchiostro, 0.3);
    engine.rr(x, cx - 46, cy + STRING - 2, 92, 12, 6);
    x.fill();
  }
  x.strokeStyle = C.inchiostro;
  x.lineWidth = 1.5;
  engine.rr(x, cx - 46, cy + STRING - 2, 92, 12, 6);
  x.stroke();
}

function drawDashes(x, cx, cy) {
  // Rows of dashes for what is missing (R13): the empty right pan.
  x.strokeStyle = veil(C.inchiostro, 0.35);
  x.lineWidth = 2;
  x.beginPath();
  for (let i = -1; i <= 1; i++) {
    x.moveTo(cx + i * 22 - 7, cy);
    x.lineTo(cx + i * 22 + 7, cy);
  }
  x.stroke();
}

function drawScale(host, x) {
  const a = Math.max(-MAX_TILT, Math.min(MAX_TILT, host.tilt));
  // Post and base stand on the table.
  x.fillStyle = C.legno;
  x.beginPath();
  x.moveTo(PIVOT.x - 40, TABLE_Y + 2);
  x.lineTo(PIVOT.x + 40, TABLE_Y + 2);
  x.lineTo(PIVOT.x + 22, TABLE_Y - 16);
  x.lineTo(PIVOT.x - 22, TABLE_Y - 16);
  x.closePath();
  x.fill();
  x.strokeStyle = C.inchiostro;
  x.lineWidth = 2;
  x.stroke();
  x.fillStyle = C.legno;
  x.fillRect(PIVOT.x - 7, PIVOT.y, 14, TABLE_Y - 16 - PIVOT.y);
  x.strokeRect(PIVOT.x - 7, PIVOT.y, 14, TABLE_Y - 16 - PIVOT.y);

  // The yoke, rotated by the tilt.
  x.save();
  x.translate(PIVOT.x, PIVOT.y);
  x.rotate(a);
  x.fillStyle = C.legno;
  engine.rr(x, -ARM - 6, -5, ARM * 2 + 12, 10, 5);
  x.fill();
  x.strokeStyle = C.inchiostro;
  x.lineWidth = 2;
  engine.rr(x, -ARM - 6, -5, ARM * 2 + 12, 10, 5);
  x.stroke();
  x.restore();
  x.fillStyle = C.inchiostro;
  x.beginPath();
  x.arc(PIVOT.x, PIVOT.y, 7, 0, 6.283);
  x.fill();
  x.fillStyle = C.carta;
  x.beginPath();
  x.arc(PIVOT.x, PIVOT.y, 2.5, 0, 6.283);
  x.fill();

  const lx = PIVOT.x - Math.cos(a) * ARM;
  const ly = PIVOT.y - Math.sin(a) * ARM;
  const rx = PIVOT.x + Math.cos(a) * ARM;
  const ry = PIVOT.y + Math.sin(a) * ARM;
  drawPan(x, lx, ly, false);
  drawPan(x, rx, ry, host.tipT > 0);

  // The sample tag: hanging from the hook, dropping, resting, or lifting.
  const restY = ly + STRING - SAMPLE_H / 2 - 2;
  if (host.lift) {
    const k = Math.min(1, host.lift.t / LIFT_S);
    const e = k * k;
    const cx = lx + (HOOK.x - lx) * e;
    const cy = restY + (HOOK.y + SAMPLE_H / 2 + 8 - restY) * e;
    drawTag(x, cx, cy, meaningOf(host.lift.item, 'it'), SAMPLE_W, SAMPLE_H, true);
  } else if (host.sample) {
    if (host.landed) {
      drawTag(x, lx, restY, meaningOf(host.sample, 'it'), SAMPLE_W, SAMPLE_H, false);
    } else {
      const k = 1 - Math.min(1, host.dropT / DROP_S);
      const e = 1 - (1 - k) ** 3;
      const sway = host.reduceMotion ? 0 : Math.sin(host.t * 4) * 6 * (1 - e);
      const cx = HOOK.x + (lx - HOOK.x) * e + sway;
      const cy = HOOK.y + SAMPLE_H / 2 + 8 + (restY - HOOK.y - SAMPLE_H / 2 - 8) * e;
      drawTag(x, cx, cy, meaningOf(host.sample, 'it'), SAMPLE_W, SAMPLE_H, true);
    }
  }

  // The right pan: the dashes of what is missing, the tile in flight, the
  // tile held after the weighing (green and flat, or dulled and sliding off).
  const tileY = ry + STRING - TILE_H / 2 - 2;
  if (host.fly) {
    // R13's sentence: the tile slides in a straight ease-out along the grid
    // and flips only as it lands on the pan (the last 30% of the flight).
    const k = Math.min(1, host.fly.t / FLY_S);
    const e = 1 - (1 - k) ** 2;
    const cx = host.fly.x0 + (rx - host.fly.x0) * e;
    const cy = host.fly.y0 + (tileY - host.fly.y0) * e;
    const flip = host.reduceMotion || k < FLIP_AT ? null : (k - FLIP_AT) / (1 - FLIP_AT);
    drawTile(host, x, cx, cy, labelOf(host.fly.tile.item), { flip });
  } else if (host.hold) {
    const k = Math.min(1, host.hold.t / HOLD_S);
    if (host.hold.ok) {
      drawTile(host, x, rx, tileY, labelOf(host.hold.tile.item), { face: C.verde });
    } else {
      const slide = host.reduceMotion ? 0 : k;
      drawTile(host, x, rx + 60 * slide, tileY + 90 * slide * slide, labelOf(host.hold.tile.item), {
        dim: true,
        alpha: 1 - 0.7 * k,
      });
    }
  } else {
    drawDashes(x, rx, tileY + 6);
  }
}

function drawBasket(host, x) {
  // The wooden rack on the table: the shelf every tile rests on.
  const top = BASKET - 52;
  const bottom = BASKET + ROW_H + 52;
  x.fillStyle = C.legno;
  engine.rr(x, 22, top, W - 44, bottom - top, 10);
  x.fill();
  x.strokeStyle = C.inchiostro;
  x.lineWidth = 2;
  engine.rr(x, 22, top, W - 44, bottom - top, 10);
  x.stroke();
  x.fillStyle = C.carta;
  engine.rr(x, 32, top + 10, W - 64, bottom - top - 20, 6);
  x.fill();
  x.strokeStyle = veil(C.inchiostro, 0.12);
  x.lineWidth = 1;
  x.beginPath();
  x.moveTo(32, BASKET + ROW_H / 2);
  x.lineTo(W - 32, BASKET + ROW_H / 2);
  x.stroke();

  for (const b of host.basket) {
    if (b.gone) continue;
    const dy = host.reduceMotion ? 0 : Math.sin(b.wob) * 2.2;
    drawTile(host, x, b.x, b.y + dy, labelOf(b.item), {
      glow: b.glow > 0,
      sel: host.kbUsed && host.sel === b.i,
    });
  }
}

function draw(host, x) {
  x.setTransform(host.sc, 0, 0, host.sc, 0, 0);
  x.clearRect(0, 0, W, H);
  x.save();
  engine.shake(host, x, host.shake);
  drawRoom(host, x);
  drawHook(x);
  drawBasket(host, x);
  drawScale(host, x);
  engine.drawParts(x, host.parts);
  if (host.flash > 0) {
    // Template's `flash`: one warm wash over the glass on a balanced weighing.
    x.fillStyle = veil(C.legno, host.flash * 0.18);
    x.fillRect(-8, -8, W + 16, H + 16);
  }
  x.restore();
}

// ─── chrome copy (rendered by GameHost, written here) ─────

function coachText(host, coach, lang) {
  const L = TX[lang] || TX.it;
  const lines = L[coach.kind] || L.wrong;
  const sub = (t) =>
    t
      .replace('{pick}', coach.pick || '')
      .replace('{word}', coach.word || '')
      .replace('{it}', coach.it || '');
  return { what: sub(lines[0]), effect: sub(lines[1]), rule: sub(lines[2]), hint: L.hint };
}

/**
 * The done card keeps the world's rule (ricerca/34 §34.1): the term in
 * English as the title, its Italian meaning on the line below, in either UI
 * language. `meaningOf(term, 'en')` is the term itself (LevelBeats), which
 * would only repeat the title; the lesson title is the half that switches.
 */
function doneView(host, lang) {
  const L = TX[lang] || TX.it;
  const term = host.item;
  const lesson = host.lesson && host.lesson.title ? pickLang(host.lesson.title, lang) : '';
  return {
    eyebrow: L.eyebrow,
    title: host.terms.map((it) => labelOf(it)).join(' · '),
    subtitle: [meaningOf(term, 'it'), lesson].filter(Boolean).join(' · '),
  };
}

function onCoachClose(host) {
  host.coachKind = null;
}

export default {
  meta: {
    id: 'nodejs-l3-bilancia',
    surface: 'nodejs',
    level: 2,
    band: 1,
    register: 'R13',
    title: 'La bilancia di notte',
    titleEn: 'The night scales',
    // GameHost prints this verbatim, so the pair lives in the string (§14.7).
    levelLabel: 'Node.js · L3 JavaScript Essenziale / Node.js · L3 Essential JavaScript',
    font: '600 16px "Inter"',
  },
  W,
  H,
  CH,
  drone: { freq: 50, type: 'triangle', volume: 0.012, lowpass: 140 },
  init,
  reset,
  update,
  draw,
  tap,
  key,
  coachText,
  doneView,
  onCoachClose,
};
