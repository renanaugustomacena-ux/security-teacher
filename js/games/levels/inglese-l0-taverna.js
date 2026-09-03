/**
 * SOTTO LA ROCCA — galleria 2: la taverna.
 * Inglese L0 «Sopravvivenza» (js/data/lessons-level-0.js), 3 lezioni × 10 frasi = 30,
 * servite in 6 capitoli × 5 turni: due capitoli per lezione, dieci turni per lezione,
 * un turno per frase.
 *
 * SCHEDA DI PROGETTO (ricerca/00 §0.3) + SCHEDA VISIVA (ricerca/42 §42.3)
 * GIOCO ...... Sotto la Rocca — galleria 2: La taverna
 * TOPIC ...... Inglese, L0 Sopravvivenza (js/data/lessons-level-0.js: 3 lezioni × 10 frasi)
 * CONCETTO ... In uno scambio vero la frase si riconosce intera e in fretta: ciò che
 *              una persona vuole dire (italiano) ↔ la frase inglese che lo dice.
 * FORMA ...... corrispondenza + simultaneità   VERBO ... servire la frase giusta al cliente giusto
 * ARCHETIPO .. Tapper (ricerca/41.7 ★★★), gestione del tempo (ricerca/10)
 * VINCI SE ... i clienti del turno sono serviti tutti (need)
 * PERDI SE ... tre clienti arrivano alla cassa senza essere serviti: il turno ricomincia
 * SBAGLI ..... 1 il cliente respinge la carta (scivola indietro), fumetto che trema, tonfo
 *              2 alla seconda, la carta giusta si accende
 *              3 coaching: cosa hai servito, cosa voleva dire, la frase intera
 * CAPITOLI ... 1 il primo cliente · 2 due banconi · 3 la fila · 4 FRATTURA il ripensamento
 *              (il cliente cambia richiesta a metà bancone) · 5 il vassoio pieno · 6 la serata
 * MONDO ...... la taverna sotto la Rocca: tendone a strisce, lampadine, quattro banconi
 *              di legno, avventurieri che parlano italiano nei fumetti, il vassoio con le
 *              insegne dipinte in inglese; l'oste sei tu
 * REGISTRO ... R10 Fiera e baraccone: rosso/crema, legno, ottone, lampadine calde
 *              figura: gli avventurieri (cappelli diversi, facce) · suolo: il bancone
 *              movimento: passo che ondeggia, carta che scivola sul bancone, pop
 *              carattere: Alfa Slab One per l'insegna, Baloo 2 per le carte
 * NUMERI ..... cammino 11→17 px/s su 300 px (27→18 s di pazienza); arrivi 5,5→3,2 s;
 *              scivolata 0,5 s; clienti insieme 1→4; carte sul vassoio 2→4
 * TEST 1 ..... le carte sono tutte uguali (stessa insegna): cambia solo la frase. La
 *              posizione sul vassoio è casuale e cambia a ogni cliente. Si vince solo
 *              capendo cosa dice il fumetto e quale frase inglese lo dice.
 * TEST 2 ..... "Servo al cliente la frase inglese che risponde a ciò che chiede, prima
 *              che arrivi alla cassa"
 * TEST 3 ..... un avventuriero entra da sinistra con un fumetto, sul vassoio compare
 *              una carta con la sua frase: la si trascina verso di lui
 */

import * as engine from '../KaioEngine.js';
import { ttsService } from '../../services/TTSService.js';

const W = 420;
const H = 910;
const LT = 160;
const LHT = 126;
const TY = 664;
const ENDX = W - 124;
const FONT = '"Baloo 2","Nunito","Trebuchet MS",system-ui,sans-serif';
const SLAB = '"Alfa Slab One","Baloo 2",serif';
const SLOTS = [
  [14, 676],
  [220, 676],
  [14, 792],
  [220, 792],
];
const CARD_W = 186;
const CARD_H = 104;
const SLIDE_S = 0.5;

const PALS = [
  { hat: '#C0392B', body: '#E67E22', skin: '#F2C9A0' },
  { hat: '#6C3FA0', body: '#4B2A7A', skin: '#F2C9A0', tall: true },
  { hat: '#9AA5B1', body: '#5D6D7E', skin: '#F2C9A0' },
  { hat: '#2E8B57', body: '#1D4E89', skin: '#D9A066', hood: true },
  { hat: '#FFC72C', body: '#C8102E', skin: '#8D5524' },
  { hat: '#1D4E89', body: '#2E8B57', skin: '#F2C9A0', beard: '#C0392B' },
];
const HOST_PAL = { hat: '#FFF4D6', body: '#1D4E89', skin: '#F2C9A0' };

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

/* Capitoli: una meccanica nuova ciascuno (ricerca/03 §3.4).
   lanes banconi · cards frasi sul vassoio · sim clienti insieme · need clienti da
   servire · walk px/s · arrive s · change il cliente cambia idea a metà bancone */
const CFG = [
  { lanes: 1, cards: 2, sim: 1, need: 4, walk: 11, arrive: 5.5 },
  { lanes: 2, cards: 3, sim: 2, need: 5, walk: 12, arrive: 5 },
  { lanes: 3, cards: 3, sim: 2, need: 6, walk: 13, arrive: 4.5 },
  { lanes: 3, cards: 4, sim: 3, need: 6, walk: 14, arrive: 4, change: true },
  { lanes: 4, cards: 4, sim: 3, need: 7, walk: 15, arrive: 3.6 },
  { lanes: 4, cards: 4, sim: 4, need: 8, walk: 17, arrive: 3.2, change: true },
];

const CHT = [
  ['Il primo cliente', 'The first customer'],
  ['Due banconi', 'Two counters'],
  ['La fila', 'The queue'],
  ['Il ripensamento', 'Second thoughts'],
  ['Il vassoio pieno', 'The full tray'],
  ['La serata intera', 'The whole evening'],
];

const CH = CFG.map((c, i) => ({
  t: CHT[i],
  titles: [1, 2, 3, 4, 5].map((n) => [`Turno ${n}`, `Round ${n}`]),
  beats: [0, 1, 2, 3, 4].map((b) => ({
    b,
    ...c,
    need: c.need + Math.floor(b / 2),
    walk: c.walk * (b === 4 ? 0.92 : 1 + b * 0.05),
  })),
}));

const TX = {
  it: {
    wrong: [
      'Non è quello che ha chiesto.',
      'Hai servito «{pick}», ma il cliente voleva dire «{it}»: in inglese si dice «{word}».',
      'Le frasi si imparano intere, come si servono: leggi il fumetto, poi cerca la frase che dice la stessa cosa.',
    ],
    change: [
      'Il cliente ha cambiato idea.',
      "Ora nel fumetto c'è «{it}»: la frase da servire è «{word}», non «{pick}».",
      'Si serve quello che chiede adesso, non quello che aveva chiesto entrando.',
    ],
    lost: [
      'Tre clienti sono andati via.',
      'Le frasi di stasera erano tutte sul vassoio: quando un cliente entra, la sua frase compare lì.',
      'Guarda il bancone più affollato per primo: chi è più vicino alla cassa è chi aspetta da più tempo.',
    ],
    hint: 'trascina la frase sul bancone del cliente · da tastiera: ← → frase, ↑ ↓ bancone, spazio',
    eyebrow: 'Turno servito',
  },
  en: {
    wrong: [
      'That is not what they asked for.',
      'You served "{pick}", but the customer meant "{it}": in English that is "{word}".',
      'Phrases are learned whole, the way they are served: read the bubble, then find the phrase that says the same thing.',
    ],
    change: [
      'The customer changed their mind.',
      'The bubble now says "{it}": the phrase to serve is "{word}", not "{pick}".',
      'Serve what they ask for now, not what they asked for when they came in.',
    ],
    lost: [
      'Three customers left.',
      "Tonight's phrases were all on the tray: when a customer walks in, their phrase appears there.",
      'Look at the busiest counter first: the one nearest the till has waited longest.',
    ],
    hint: "drag the phrase onto the customer's counter · keyboard: ← → phrase, ↑ ↓ counter, space",
    eyebrow: 'Round served',
  },
};

// ─── the lesson and the queue ────────────────────

function laneY(i) {
  return LT + i * LHT;
}

function lessonFor(host, chapterIndex) {
  const lessons = host.session.lessons;
  if (!lessons.length) return null;
  return lessons[Math.floor(chapterIndex / 2) % lessons.length] || null;
}

/**
 * Which of the lesson's ten phrases this beat exists to teach. Two chapters per
 * lesson, five beats each, so (chapter, beat) walks the lesson exactly once.
 */
function anchorFor(items, chapterIndex, beat) {
  if (!items.length) return null;
  return items[((chapterIndex % 2) * 5 + beat) % items.length] || null;
}

/**
 * The evening's queue. The template filled it at random, so covering all
 * thirty phrases was luck; §46.5 wants certainty. The beat's own phrase walks
 * in first, the rest of the lesson follows shuffled, and if the beat needs more
 * customers than the lesson has phrases the lesson repeats.
 */
function buildQueue(host, need) {
  const items = host.items;
  if (!items.length) return [];
  const anchor = host.anchor || items[0];
  let q = [anchor].concat(shuffle(items.filter((it) => it !== anchor)));
  while (q.length < need) q = q.concat(shuffle(items));
  return q.slice(0, need);
}

// ─── the tray ────────────────────────────────────

function present(host) {
  return host.cust.filter((k) => !k.served && !k.gone);
}

function freeSlot(host) {
  for (let i = 0; i < SLOTS.length; i++) if (!host.cards.some((k) => k.slot === i)) return i;
  return -1;
}

function addCard(host, item) {
  if (host.cards.some((k) => k.item === item)) return;
  const s = freeSlot(host);
  if (s < 0 || host.cards.length >= host.cfg.cards) return;
  host.cards.push({
    item,
    slot: s,
    x: SLOTS[s][0],
    y: SLOTS[s][1],
    tx: SLOTS[s][0],
    ty: SLOTS[s][1],
    pop: 1,
    glow: 0,
  });
}

/* Every customer present has their phrase on the tray; the remaining slots are
   filled from the same lesson, so each distractor is a real phrase the learner
   is also learning tonight (ricerca/35 §35.3.3). */
function topUp(host) {
  const need = present(host).map((k) => k.item);
  for (const it of need) {
    if (host.cards.some((k) => k.item === it)) continue;
    if (host.cards.length >= host.cfg.cards) {
      const f = host.cards.filter((k) => need.indexOf(k.item) < 0)[0];
      if (f) host.cards = host.cards.filter((k) => k !== f);
    }
    addCard(host, it);
  }
  const used = host.cards.map((k) => k.item);
  const pool = shuffle(host.items.filter((it) => used.indexOf(it) < 0));
  while (host.cards.length < host.cfg.cards && pool.length) addCard(host, pool.shift());
}

function prune(host) {
  const need = present(host).map((k) => k.item);
  const keepFill = Math.max(1, host.cfg.cards - need.length);
  let fill = 0;
  host.cards = host.cards.filter((k) => {
    if (need.indexOf(k.item) >= 0) return true;
    if (fill < keepFill) {
      fill++;
      return true;
    }
    return false;
  });
}

function returnCard(host, card) {
  if (host.cards.some((k) => k.item === card.item)) return;
  let s = freeSlot(host);
  if (s < 0) {
    const need = present(host).map((k) => k.item);
    const f = host.cards.filter((k) => need.indexOf(k.item) < 0)[0];
    if (f) {
      host.cards = host.cards.filter((k) => k !== f);
      s = f.slot;
    }
  }
  if (s < 0) return;
  card.slot = s;
  card.tx = SLOTS[s][0];
  card.ty = SLOTS[s][1];
  card.x = W - 96 - CARD_W / 2;
  card.y = laneY(host.keepLane) + 40;
  host.cards.push(card);
}

// ─── customers ───────────────────────────────────

/* ricerca/35 §35.3.1: a phrase served is a phrase heard. */
function say(host, text) {
  if (host.state.muted || !text) return;
  const spoken = text.replace(/\.\.\./g, '').trim();
  if (spoken) ttsService.speak(spoken, 'en-GB');
}

function spawn(host) {
  const item = host.queue.shift();
  if (!item) return;
  const cfg = host.cfg;
  const lanes = [];
  for (let i = 0; i < cfg.lanes; i++) {
    if (!host.cust.some((k) => k.lane === i && !k.gone && !k.served && k.x < 80)) lanes.push(i);
  }
  const lane = lanes.length
    ? lanes[Math.floor(Math.random() * lanes.length)]
    : Math.floor(Math.random() * cfg.lanes);
  // Reduced motion: the customers are the game and cannot stand still, but a
  // slower walk keeps the counter readable (§15.4, ricerca/42 §42.6 #10).
  const motionScale = host.reduceMotion ? 0.7 : 1;
  // The beat's own phrase never changes its mind: that customer is the reason
  // the beat exists, and a swap would leave the phrase presented but unasked.
  const fickle = Boolean(cfg.change) && item !== host.anchor && Math.random() < 0.45;
  host.cust.push({
    id: host.nid++,
    item,
    lane,
    x: -30,
    speed: cfg.walk * motionScale * (0.92 + Math.random() * 0.16),
    served: false,
    gone: false,
    wrong: 0,
    aided: false,
    changed: 0,
    wasItem: null,
    pal: PALS[Math.floor(Math.random() * PALS.length)],
    walk: Math.random() * 6,
    shake: 0,
    change: fickle ? 0.35 + Math.random() * 0.2 : 0,
    heart: 0,
  });
  // The Italian bubble is the presentation (mastery stage 0 -> 1).
  item.introduce();
  topUp(host);
  engine.snd(host, 'click', { hz: 1200, v: 0.2 });
}

function changeMind(host, k) {
  k.change = 0;
  const alt = shuffle(host.items.filter((it) => it !== k.item))[0];
  if (!alt) return;
  k.wasItem = k.item;
  k.item = alt;
  k.shake = 1;
  k.changed = 1;
  alt.introduce();
  engine.snd(host, 'tone', { from: 700, to: 420 });
  prune(host);
  topUp(host);
}

/**
 * A customer who reaches the till unserved is not a graded response — the
 * learner produced nothing — so nothing is reported. The same phrase joins the
 * back of the queue: the beat still has to ask it (§46.5).
 */
function lose(host, k) {
  k.gone = true;
  host.lost++;
  engine.snd(host, 'fall');
  engine.burst(host, host.parts, k.x, laneY(k.lane) + 30, 8, '#9AA5B1', {
    up: 40,
    v0: 20,
    v1: 60,
    r: 1.4,
  });
  host.queue.push(k.item);
  prune(host);
  topUp(host);
  if (host.lost >= 3) {
    host.coachKind = 'lost';
    host.setState({ coach: { kind: 'lost' } });
  }
}

// ─── the verb ────────────────────────────────────

function serve(host, card, lane) {
  const k = present(host)
    .filter((c) => c.lane === lane)
    .sort((a, b) => b.x - a.x)[0];
  if (!k || host.slide) return false;
  host.cards = host.cards.filter((c) => c !== card);
  host.sel = -1;
  host.keepLane = lane;
  host.slide = { card, k, t: 0, fx: W - 96, fy: laneY(lane) + 70 };
  engine.snd(host, 'whoosh');
  return true;
}

function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

/**
 * The serve is the graded response: the learner's real pick against the phrase
 * the customer asked for, through the SDK and never a local `===` (§46.1,
 * §46.2). The cue is `silent` because the game answers diegetically — the
 * heart and the chime, or the shaken bubble and the card sliding back.
 */
function resolve(host) {
  const s = host.slide;
  const k = s.k;
  const card = s.card;
  host.slide = null;
  if (k.gone || k.served) {
    returnCard(host, card);
    return;
  }

  const verdict = k.item.attempt(card.item.english, {
    expected: k.item.english,
    mode: 'taverna',
    hintsUsed: k.wrong >= 2 ? 1 : 0,
    silent: true,
  });
  host.session.mark();

  if (verdict.correct) {
    k.served = true;
    k.heart = 1;
    host.served++;
    k.item.clear();
    persist(host);
    engine.snd(host, 'pop', { hz: 520 });
    engine.snd(host, 'chime', { notes: [784, 1046] });
    engine.burst(host, host.parts, k.x, laneY(k.lane) + 40, 14, '#FFD700', {
      up: 120,
      v0: 40,
      v1: 160,
      r: 1.6,
    });
    say(host, k.item.english);
    host.setState({ step: host.served });
    prune(host);
    topUp(host);
    if (host.served >= host.cfg.need) {
      host.finished = true;
      host.doneT = 1.4;
    }
    return;
  }

  // Wrong: the bubble shakes and the card slides back — a thud, never red.
  k.wrong++;
  k.shake = 1;
  host.hitstop = 50;
  engine.snd(host, 'thud');
  engine.burst(host, host.parts, k.x, laneY(k.lane) + 60, 6, '#FFB347', {
    up: 30,
    v0: 40,
    v1: 120,
    r: 1.2,
  });
  returnCard(host, card);
  if (k.wrong >= 2) {
    // Second error on one customer: the right card lights up. From here the
    // customer is aided and the SDK is told so (hintsUsed 1 above).
    const ok = host.cards.filter((c) => c.item === k.item)[0];
    if (ok) ok.glow = 1;
    k.aided = true;
  }
  if (k.wrong >= 3) {
    const kind = k.changed ? 'change' : 'wrong';
    host.coachKind = kind;
    host.setState({
      coach: { kind, pick: card.item.english, word: k.item.english, it: k.item.italian },
    });
  }
}

// ─── lifecycle ───────────────────────────────────

function init(host) {
  host.parts = [];
  host.cust = [];
  host.cards = [];
  host.queue = [];
  host.items = [];
  host.lesson = null;
  host.anchor = null;
  host.chapter = 0;
  host.drag = null;
  host.slide = null;
  host.keepLane = 0;
  host.keepY = LT;
  host.t = 0;
  host.sel = -1;
  host.klane = 0;
  host.kbUsed = false;
  host.served = 0;
  host.lost = 0;
  host.nid = 0;
}

/**
 * Which chapter this beat belongs to. The engine's goBeat installs the new
 * chapter's beats (useChapter) and calls reset BEFORE it writes
 * state.chapter, so on the first beat of a chapter state.chapter is still the
 * previous one; the installed beat table is the truth. (The state fallback
 * covers a host that never installed a table.)
 */
function installedChapter(host) {
  const i = host.CH ? host.CH.findIndex((c) => c.beats === host.BEATS) : -1;
  return i >= 0 ? i : host.state.chapter || 0;
}

function reset(host, beat) {
  const cfg = host.BEATS[beat];
  host.cfg = cfg;
  const ci = installedChapter(host);
  host.chapter = ci;

  host.parts = [];
  host.cust = [];
  host.cards = [];
  host.drag = null;
  host.slide = null;
  host.t = 0;
  host.served = 0;
  host.lost = 0;
  host.spawnT = 1.2;
  host.sel = -1;
  host.klane = 0;
  host.kbUsed = false;
  host.keepLane = 0;
  host.keepY = LT;
  host.doneT = 0;
  host.finished = false;
  host.coachKind = null;
  host.nid = 0;

  host.lesson = lessonFor(host, ci);
  host.items = host.lesson ? host.lesson.items : [];
  host.anchor = anchorFor(host.items, ci, beat);
  host.queue = buildQueue(host, cfg.need);
  host.session.mode = 'taverna';
  host.session.mark();
}

/* After the 'lost' coach: same beat, same phrases, the evening starts over. */
function rebuild(host) {
  host.cust = [];
  host.cards = [];
  host.slide = null;
  host.drag = null;
  host.lost = 0;
  host.served = 0;
  host.spawnT = 1;
  host.sel = -1;
  host.setState({ step: 0 });
  host.queue = buildQueue(host, host.cfg.need);
  host.session.mark();
}

// ─── update ──────────────────────────────────────

function update(host, dt) {
  host.t += dt;
  const c = host.cfg;
  if (!c) return;

  if (!host.finished) {
    host.spawnT -= dt;
    if (host.spawnT <= 0 && host.queue.length && present(host).length < c.sim && !host.slide) {
      spawn(host);
      host.spawnT = c.arrive;
    }
  }

  // Reduced motion slows every walk in the room, the served exit included.
  const motionScale = host.reduceMotion ? 0.7 : 1;
  for (const k of host.cust) {
    k.shake = Math.max(0, k.shake - dt * 2.2);
    k.heart = Math.max(0, k.heart - dt * 0.9);
    if (k.served) {
      k.x += 90 * motionScale * dt;
      if (k.x > W + 40) k.gone = true;
      continue;
    }
    if (k.gone) continue;
    k.x += k.speed * dt;
    k.walk += dt;
    if (k.change && k.x > ENDX * k.change) changeMind(host, k);
    if (k.x >= ENDX) lose(host, k);
  }
  host.cust = host.cust.filter((k) => !k.gone);

  for (const cd of host.cards) {
    cd.pop = Math.max(0, cd.pop - dt * 3);
    if (host.drag && host.drag.card === cd) continue;
    cd.x += (cd.tx - cd.x) * Math.min(1, dt * 10);
    cd.y += (cd.ty - cd.y) * Math.min(1, dt * 10);
  }

  if (host.slide) {
    host.slide.t += dt;
    if (host.slide.t >= SLIDE_S) resolve(host);
  }

  host.keepY += (laneY(host.keepLane) - host.keepY) * Math.min(1, dt * 7);
  host.parts = engine.parts(host.parts, dt, 520);

  if (host.doneT > 0) {
    host.doneT -= dt;
    if (host.doneT <= 0) {
      host.doneT = 0;
      host.setState({ done: true });
    }
  }
}

// ─── input: drag the card onto the counter, or tap the card then the counter ─

function cardAt(host, p) {
  for (let i = host.cards.length - 1; i >= 0; i--) {
    const c = host.cards[i];
    if (p.x >= c.x && p.x <= c.x + CARD_W && p.y >= c.y && p.y <= c.y + CARD_H) return c;
  }
  return null;
}

function laneAt(host, p) {
  if (p.y < LT || p.y > LT + host.cfg.lanes * LHT) return -1;
  return Math.floor((p.y - LT) / LHT);
}

function down(host, p) {
  if (host.finished) return;
  const c = cardAt(host, p);
  if (c) {
    host.drag = { card: c, ox: p.x - c.x, oy: p.y - c.y, x0: p.x, y0: p.y, moved: false };
    host.cards = host.cards.filter((k) => k !== c).concat([c]);
    engine.snd(host, 'click', { hz: 1600, v: 0.2 });
    return;
  }
  const ln = laneAt(host, p);
  if (ln >= 0 && host.sel >= 0 && host.cards[host.sel]) {
    if (serve(host, host.cards[host.sel], ln)) return;
    engine.snd(host, 'click', { hz: 500, v: 0.12 });
  }
}

function drag(host, q, p) {
  const d = host.drag;
  if (!d) return;
  if (Math.abs(p.x - d.x0) + Math.abs(p.y - d.y0) > 8) d.moved = true;
  d.card.x = p.x - d.ox;
  d.card.y = p.y - d.oy;
}

function up(host, p) {
  const d = host.drag;
  if (!d) return;
  host.drag = null;
  const c = d.card;
  if (!d.moved) {
    const i = host.cards.indexOf(c);
    host.sel = host.sel === i ? -1 : i;
    c.x = c.tx;
    c.y = c.ty;
    return;
  }
  const ln = laneAt(host, p);
  if (ln >= 0 && serve(host, c, ln)) return;
  c.x = c.tx;
  c.y = c.ty;
  engine.snd(host, 'click', { hz: 500, v: 0.12 });
}

function key(host, e) {
  if (host.finished) return;
  const n = host.cards.length;
  host.kbUsed = true;
  if (e.key === 'ArrowLeft') {
    host.sel = n ? ((host.sel < 0 ? 0 : host.sel) - 1 + n) % n : -1;
    e.preventDefault();
  } else if (e.key === 'ArrowRight') {
    host.sel = n ? ((host.sel < 0 ? -1 : host.sel) + 1) % n : -1;
    e.preventDefault();
  } else if (e.key === 'ArrowUp') {
    host.klane = (host.klane - 1 + host.cfg.lanes) % host.cfg.lanes;
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    host.klane = (host.klane + 1) % host.cfg.lanes;
    e.preventDefault();
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    if (host.sel >= 0 && host.cards[host.sel]) serve(host, host.cards[host.sel], host.klane);
  } else if (/^[1-4]$/.test(e.key)) {
    const i = parseInt(e.key, 10) - 1;
    if (host.cards[i]) host.sel = i;
  }
}

// ─── drawing ─────────────────────────────────────

function wrapLines(x, text, maxW, maxL) {
  const words = text.split(' ');
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

function drawAwning(x) {
  for (let i = 0, k = 0; i < W + 28; i += 28, k++) {
    x.fillStyle = k % 2 ? '#FFF4D6' : '#C8102E';
    x.fillRect(i, 0, 28, 58);
  }
  for (let i = 0, k = 0; i < W + 28; i += 28, k++) {
    x.fillStyle = k % 2 ? '#FFF4D6' : '#C8102E';
    x.beginPath();
    x.arc(i + 14, 58, 14, 0, Math.PI);
    x.fill();
  }
  x.fillStyle = 'rgba(0,0,0,.25)';
  x.fillRect(0, 72, W, 6);

  // The lamp wire sags between the bulbs: the template's quadratic curve,
  // sampled at its quarter points so it needs only lineTo.
  x.strokeStyle = '#2A1A10';
  x.lineWidth = 1.5;
  x.beginPath();
  x.moveTo(0, 80);
  for (let i = 18; i < W; i += 36) {
    x.lineTo(i - 9, 82.25);
    x.lineTo(i, 83);
    x.lineTo(i + 9, 82.25);
    x.lineTo(i + 18, 80);
  }
  x.stroke();
  for (let i = 18; i < W; i += 36) {
    x.shadowColor = '#FFB300';
    x.shadowBlur = 12;
    x.fillStyle = '#FFE9A8';
    x.beginPath();
    x.arc(i, 85, 5, 0, 6.283);
    x.fill();
  }
  x.shadowBlur = 0;
}

function drawSign(host, x) {
  x.strokeStyle = '#8B5A2B';
  x.lineWidth = 2;
  x.beginPath();
  x.moveTo(170, 72);
  x.lineTo(176, 96);
  x.moveTo(250, 72);
  x.lineTo(244, 96);
  x.stroke();
  x.fillStyle = '#5A3A22';
  engine.rr(x, 150, 94, 120, 36, 6);
  x.fill();
  x.fillStyle = '#A0623A';
  engine.rr(x, 154, 98, 112, 28, 4);
  x.fill();
  x.fillStyle = '#FFF4D6';
  x.font = `20px ${SLAB}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(`${host.served} / ${host.cfg ? host.cfg.need : 0}`, 210, 113);

  // Three mugs: a lost customer empties one. Dark wood, never red (§14.6).
  for (let i = 0; i < 3; i++) {
    const mx = 330 + i * 26;
    const lost = i < host.lost;
    x.fillStyle = lost ? '#3A2A1E' : '#FFF4D6';
    engine.rr(x, mx, 102, 16, 20, 3);
    x.fill();
    x.strokeStyle = lost ? '#3A2A1E' : '#FFF4D6';
    x.lineWidth = 3;
    x.beginPath();
    x.arc(mx + 18, 112, 5, -1.3, 1.3);
    x.stroke();
    if (!lost) {
      x.fillStyle = '#FFB300';
      x.fillRect(mx + 2, 108, 12, 12);
    }
  }
}

function drawLane(x, i) {
  const y = laneY(i);
  x.fillStyle = '#3A2314';
  x.fillRect(0, y, W, LHT);
  x.fillStyle = 'rgba(0,0,0,.18)';
  for (let k = 0; k < W; k += 34) x.fillRect(k, y, 1.5, LHT);
  x.fillStyle = '#6B4226';
  x.fillRect(0, y + 10, W, 70);
  x.fillStyle = 'rgba(0,0,0,.12)';
  x.fillRect(0, y + 10, W, 4);
  x.fillStyle = '#4A2C17';
  x.fillRect(W - 70, y + 6, 70, 74);
  x.fillStyle = '#E0B15E';
  for (let k = 0; k < 3; k++) {
    x.fillRect(W - 58 + k * 20, y + 26, 6, 18);
    x.fillRect(W - 62 + k * 20, y + 22, 14, 6);
  }
}

function drawCounter(x, i) {
  const y = laneY(i);
  x.fillStyle = '#B8794A';
  x.fillRect(0, y + 72, W, 28);
  x.fillStyle = 'rgba(0,0,0,.14)';
  x.fillRect(0, y + 86, W, 1.5);
  for (let k = 20; k < W; k += 120) x.fillRect(k, y + 72, 1.5, 28);
  x.fillStyle = '#7A4A2A';
  x.fillRect(0, y + 100, W, 20);
  x.fillStyle = '#E0B15E';
  x.fillRect(0, y + 100, W, 3);
  x.fillStyle = 'rgba(0,0,0,.3)';
  x.fillRect(0, y + 120, W, 6);
}

function drawFig(x, px, py, pal, face, walk, apron) {
  x.save();
  x.translate(px, py);
  x.scale(face, 1);
  const bob = walk ? Math.sin(walk * 9) * 1.5 : 0;
  x.translate(0, bob);
  x.fillStyle = '#2A2A2A';
  x.fillRect(-8, -10, 6, 10);
  x.fillRect(2, -10, 6, 10);
  x.fillStyle = pal.body;
  engine.rr(x, -11, -30, 22, 21, 4);
  x.fill();
  if (apron) {
    x.fillStyle = '#FFF4D6';
    x.fillRect(-7, -24, 14, 15);
  }
  x.fillStyle = pal.skin;
  x.fillRect(-14, -28, 4, 12);
  x.fillRect(10, -28, 4, 12);
  x.fillStyle = pal.skin;
  engine.rr(x, -8, -46, 16, 16, 5);
  x.fill();
  x.fillStyle = '#1B1B1B';
  x.fillRect(1, -40, 2, 2.5);
  x.fillRect(5, -40, 2, 2.5);
  if (pal.beard) {
    x.fillStyle = pal.beard;
    engine.rr(x, -8, -36, 16, 8, 3);
    x.fill();
  }
  x.fillStyle = pal.hat;
  if (pal.hood) {
    engine.rr(x, -10, -50, 20, 10, 4);
    x.fill();
    x.fillRect(-10, -46, 4, 14);
    x.fillRect(6, -46, 4, 14);
  } else if (pal.tall) {
    x.beginPath();
    x.moveTo(-11, -46);
    x.lineTo(0, -68);
    x.lineTo(11, -46);
    x.fill();
    x.fillRect(-12, -48, 24, 4);
  } else {
    engine.rr(x, -10, -52, 20, 9, 3);
    x.fill();
    x.fillRect(-10, -45, 20, 2);
  }
  x.restore();
}

/* The bubble speaks Italian: the world is Italian, what you pick up is English
   (ricerca/35 §35.3.2). A rejected card shakes it; under reduced motion the
   same refusal is a still, thicker amber border (§11.6 static-equivalent,
   §14.6 never red). */
function drawBubble(host, x, k, y) {
  x.font = `700 13px ${FONT}`;
  const ls = wrapLines(x, k.item.italian, 170, 2);
  const w = Math.max(...ls.map((l) => x.measureText(l).width)) + 22;
  const h = ls.length * 17 + 14;
  const still = host.reduceMotion;
  const jx = k.shake && !still ? (Math.random() * 2 - 1) * 6 * k.shake : 0;
  const bx = Math.min(W - w - 4, Math.max(4, k.x - w / 2 + jx));
  const by = y - 70 - h;
  x.fillStyle = '#FFFFFF';
  x.strokeStyle = k.shake && still ? '#FFB300' : '#1D4E89';
  x.lineWidth = k.shake && still ? 4 : 2;
  engine.rr(x, bx, by, w, h, 9);
  x.fill();
  x.stroke();
  x.fillStyle = '#FFFFFF';
  x.beginPath();
  x.moveTo(k.x - 6, by + h - 1);
  x.lineTo(k.x + 6, by + h - 1);
  x.lineTo(k.x, by + h + 8);
  x.closePath();
  x.fill();
  x.fillStyle = '#1D4E89';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  ls.forEach((l, i) => x.fillText(l, bx + w / 2, by + 7 + 8.5 + i * 17));
}

function drawHeart(x, cx, cy, s) {
  x.fillStyle = '#C8102E';
  x.beginPath();
  x.arc(cx - s * 0.5, cy - s * 0.3, s * 0.55, 0, 6.283);
  x.arc(cx + s * 0.5, cy - s * 0.3, s * 0.55, 0, 6.283);
  x.fill();
  x.beginPath();
  x.moveTo(cx - s * 1.02, cy - s * 0.1);
  x.lineTo(cx + s * 1.02, cy - s * 0.1);
  x.lineTo(cx, cy + s);
  x.closePath();
  x.fill();
}

function drawCard(host, x, c, scale, sel) {
  const s = scale || 1;
  const w = CARD_W * s;
  const h = CARD_H * s;
  const pop = c.pop && !host.reduceMotion ? 1 + 0.08 * c.pop : 1;
  x.save();
  x.translate(c.x + w / 2, c.y + h / 2 + (sel ? -6 : 0));
  x.scale(pop, pop);
  if (sel || c.glow) {
    x.shadowColor = c.glow ? '#FFB300' : 'rgba(0,0,0,.6)';
    // The hint glow breathes; under reduced motion it is a steady halo.
    const pulse = host.reduceMotion ? 0 : 6 * Math.sin(host.t * 6);
    x.shadowBlur = c.glow ? 16 + pulse : 18;
  }
  x.fillStyle = '#FFF4D6';
  engine.rr(x, -w / 2, -h / 2, w, h, 8 * s);
  x.fill();
  x.shadowBlur = 0;
  x.strokeStyle = '#C8102E';
  x.lineWidth = 3 * s;
  engine.rr(x, -w / 2 + 3 * s, -h / 2 + 3 * s, w - 6 * s, h - 6 * s, 6 * s);
  x.stroke();
  x.strokeStyle = '#1D4E89';
  x.lineWidth = 1 * s;
  engine.rr(x, -w / 2 + 9 * s, -h / 2 + 9 * s, w - 18 * s, h - 18 * s, 4 * s);
  x.stroke();
  x.fillStyle = '#1D4E89';
  x.font = `700 ${Math.round(16 * s)}px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const ls = wrapLines(x, c.item.english, w - 30 * s, 2);
  ls.forEach((l, i) => x.fillText(l, 0, (i - (ls.length - 1) / 2) * 19 * s));
  x.restore();
}

function drawSlide(host, x) {
  const s = host.slide;
  const k = Math.min(1, s.t / SLIDE_S);
  const e = 1 - (1 - k) ** 3;
  const cx = s.fx + (s.k.x + 10 - s.fx) * e;
  const cy = laneY(s.k.lane) + 52;
  x.save();
  s.card.x = cx - (CARD_W * 0.42) / 2;
  s.card.y = cy - (CARD_H * 0.42) / 2;
  drawCard(host, x, s.card, 0.42, false);
  x.restore();
}

function draw(host, x) {
  x.setTransform(host.sc, 0, 0, host.sc, 0, 0);
  x.clearRect(0, 0, W, H);
  const c = host.cfg || CFG[0];

  x.fillStyle = '#2A1A10';
  x.fillRect(0, 0, W, H);
  for (let i = 0; i < c.lanes; i++) drawLane(x, i);
  for (let i = c.lanes; i < 4; i++) {
    const y = laneY(i);
    x.fillStyle = '#1E120A';
    x.fillRect(0, y, W, LHT);
    x.fillStyle = 'rgba(255,244,214,.06)';
    for (let k = 8; k < W; k += 40) x.fillRect(k, y + 60, 24, 3);
  }

  // Under reduced motion the figures glide without the bob and the heart
  // holds its place while it fades, instead of floating up.
  const still = host.reduceMotion;
  for (const k of host.cust) {
    if (k.gone && !k.served) continue;
    const y = laneY(k.lane) + 84;
    const walk = still ? 0 : k.served ? k.walk + host.t : k.walk;
    drawFig(x, k.x, y, k.pal, 1, walk, false);
    if (k.served && k.heart > 0) {
      x.globalAlpha = Math.min(1, k.heart * 1.5);
      drawHeart(x, k.x, y - 72 - (still ? 12 : (1 - k.heart) * 30), 7);
      x.globalAlpha = 1;
    }
  }
  for (let i = 0; i < c.lanes; i++) drawCounter(x, i);

  if (host.kbUsed && host.sel >= 0 && host.cards[host.sel]) {
    x.fillStyle = 'rgba(255,233,168,.16)';
    x.fillRect(0, laneY(host.klane) + 10, W - 70, 70);
  }
  drawFig(x, W - 34, host.keepY + 96, HOST_PAL, -1, 0, true);
  if (host.slide) drawSlide(host, x);

  x.fillStyle = '#3A2314';
  x.fillRect(0, TY, W, H - TY);
  x.fillStyle = '#4A2C17';
  engine.rr(x, 6, TY + 4, W - 12, H - TY - 10, 14);
  x.fill();
  x.fillStyle = 'rgba(0,0,0,.2)';
  x.fillRect(6, TY + 4, W - 12, 3);
  host.cards.forEach((cd, i) => {
    if (host.drag && host.drag.card === cd) return;
    drawCard(host, x, cd, 1, i === host.sel);
  });
  if (host.drag) drawCard(host, x, host.drag.card, 1, true);

  engine.drawParts(x, host.parts);
  drawAwning(x);
  drawSign(host, x);
  for (const k of host.cust) {
    if (!k.served && !k.gone) drawBubble(host, x, k, laneY(k.lane) + 84);
  }
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

/* Lesson titles are "italiano / english" strings; the done screen shows one half. */
function lessonTitle(lesson, lang) {
  if (!lesson || !lesson.title) return '';
  const halves = String(lesson.title).split(' / ');
  const half = lang === 'en' && halves[1] ? halves[1] : halves[0];
  return half.trim();
}

function doneView(host, lang) {
  const L = TX[lang] || TX.it;
  return {
    eyebrow: L.eyebrow,
    title: `${host.served} / ${host.cfg ? host.cfg.need : 0}`,
    subtitle: lessonTitle(host.lesson, lang),
  };
}

function onCoachClose(host) {
  if (host.coachKind === 'lost') rebuild(host);
  host.coachKind = null;
}

export default {
  meta: {
    id: 'inglese-l0-taverna',
    surface: 'learn',
    level: 0,
    band: 1,
    register: 'R10',
    title: 'La taverna',
    titleEn: 'The tavern',
    // GameHost prints this verbatim, so the pair lives in the string (§14.7),
    // in the "italiano / english" form the chrome itself uses.
    levelLabel: 'Inglese · L0 Sopravvivenza / English · L0 Survival',
    font: '700 16px "Baloo 2"',
  },
  W,
  H,
  CH,
  drone: { freq: 55, type: 'triangle', volume: 0.01, lowpass: 160 },
  init,
  reset,
  rebuild,
  update,
  draw,
  down,
  drag,
  up,
  key,
  coachText,
  doneView,
  onCoachClose,
};
