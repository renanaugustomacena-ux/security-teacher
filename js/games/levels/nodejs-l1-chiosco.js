/**
 * IL CHIOSCO DI NOTTE — Node.js L1 «Fondamenti» (js/topics/data/nodejs.js,
 * level 0: 4 lessons × 10 terms = 40), served in 8 chapters × 5 shifts, one
 * term per shift (LevelBeats spine, DOCTRINE §46.5).
 *
 * Port of knowledge-aio-giochi/templates/nodejs-l1-chiosco (design sheet in
 * its header) with the vocabulary spine of the brief and the R10 register.
 *
 * SCHEDA DI PROGETTO (ricerca/00 §0.3) + SCHEDA VISIVA (ricerca/42 §42.3)
 * GIOCO ...... Il chiosco di notte
 * LIVELLO .... Node.js, L1 Fondamenti, banda 1 — 8 capitoli, 40 turni
 * CONCETTO ... C'è un posto che aspetta che qualcuno chieda qualcosa. Quando
 *              glielo chiedono lo prepara e lo dà. Se nessuno chiede non fa
 *              niente, e non può indovinare cosa gli chiederanno. Ciò che il
 *              cliente chiede è un significato (italiano); ciò che il chiosco
 *              sa cuocere ha un nome inglese sul cartello del fornello.
 * FORMA ...... simultaneità          VERBO ... servire (cosa faccio adesso)
 * ARCHETIPO .. ricerca/10 time management — Diner Dash
 * VINCI SE ... tutti i biglietti del turno escono dallo sportello
 * PERDI SE ... tre clienti se ne vanno: il chiosco si svuota e ricomincia
 * SBAGLI ..... 1 il fornello sbagliato produce uno scarto sul ripiano, tonfo
 *              2 alla seconda sullo stesso cliente, il cartello giusto si accende
 *              3 pannello di coaching: cosa hai cotto, cosa diceva il biglietto,
 *                la regola con il termine inglese
 * CAPITOLI ... 1 il verbo · 2 due che aspettano · 3 FRATTURA non si indovina
 *              4 respiro: cambia idea · 5 due cose in un ordine
 *              6 il biglietto coperto · 7 a raffica · 8 il turno intero
 * MONDO ...... baracca da fiera di notte: frontone a strisce, lampadine,
 *              finestrella, bancone di legno, fornelli con l'insegna dipinta,
 *              ripiano, sportello con la cornice di lampadine
 * REGISTRO ... R10 Fiera e baraccone — rosso tendone, crema, legno, giallo
 *              insegna, blu notte, lampadina · figura: il visitatore della
 *              fiera col biglietto · suolo: il bancone e il piano di lavoro ·
 *              movimento: spuntare e rientrare (ease-out-back), biglietto a
 *              pendolo, cartellino che si gira · carattere: slab da insegna
 *              per cartelli e cifre, tondo per i biglietti
 * NUMERI ..... azione 0,8-2,0 s (spostamento ≤ 0,5 s), pazienza 40→21 s a tre
 *              stati, clienti insieme 1→4, fornelli 2→3, biglietti 2→9
 * TEST 1 ..... i fornelli sono tutti uguali: cambia solo il termine dipinto.
 *              Il posto del termine sul bancone è casuale a ogni turno.
 *              Si vince solo leggendo il biglietto e trovando il cartello.
 * TEST 2 ..... "Cuocio sul fornello col termine inglese che dice ciò che il
 *              biglietto chiede in italiano, prima che il cliente se ne vada"
 * TEST 3 ..... un cliente spunta alla finestrella e il suo biglietto oscilla
 *
 * DEVIAZIONI DAL TEMPLATE (deliberate, per la firma dell'orchestratore)
 *   1 fornelli: mai meno di due (il template ne aveva uno nel cap. 1). Con un
 *     fornello solo non c'è scelta significato → termine da valutare (brief
 *     §2.2), quindi i cinque turni del cap. 1 hanno due cartelli.
 *   2 il pomello `free` è vivo: il template lo dichiarava («puoi cuocere
 *     senza biglietto») ma non lo leggeva mai, così cuocere a vuoto era
 *     possibile in ogni capitolo e apriva il coach «busy» del cap. 3 già dal
 *     cap. 1. Qui, fuori dai turni `free`, il fornello senza biglietto resta
 *     freddo (tonfo e scossa, nessun testo); nel cap. 3 si accende, si può
 *     anticipare e il `trap` lo punisce. La FRATTURA resta «non si indovina».
 *   3 spostamento delle mani con tetto di 0,5 s (TRAVEL_MAX): nel template era
 *     illimitato e un'azione poteva superare i 2 s di ricerca/10 §10.5.
 *   4 la scala degli errori è per cliente (brief §2.5): 1 scarto e tonfo,
 *     2 il cartello giusto si accende, 3 il coach con il termine. Lo streak
 *     del template resta per «busy» e «late», che non hanno un cliente.
 *   5 cap. 8 turno 4: tre clienti alla finestrella, non quattro. Con ordini a
 *     due termini, pazienza 21 s e arrivi a raffica, il bot della suite (che
 *     serve sempre il più impaziente, senza mai sbagliare) con `max: 4` perde
 *     tre clienti e apre il coach «late» in una corsa su tre; con `max: 3` il
 *     picco resta il turno più duro del livello ma si può vincere
 *     (ricerca/10 §10.8 #4, §10.6).
 *   Nessun'altra: la schermata «done» scatta subito come nel template, e non
 *   c'è hitstop, scossa allo sbaglio o suono all'arrivo che il template non
 *   avesse.
 */

import * as engine from '../KaioEngine.js';
import { ttsService } from '../../services/TTSService.js';
import { beatItems, beatLesson, fillers, labelOf, meaningOf } from '../LevelBeats.js';
import {
  W,
  H,
  CUST_Y,
  SLOTS,
  HATCH,
  HANDS0,
  HIT_CUST,
  HIT_HOB,
  HIT_HATCH,
  hobPos,
} from '../parts/nodejs-l1-chiosco/layout.js';
import { drawScene, FIGURES } from '../parts/nodejs-l1-chiosco/draw.js';

const MODE = 'chiosco';
/* ricerca/10 §10.5: an action lasts 0.8–2.0 s including the walk. The
   template's walk was unbounded (a take from the shelf to the window cost
   1.8 s), so the walk is capped. */
const TRAVEL_MAX = 0.5;

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

/* Beat: hobs, max clienti, arrive, pat, tickets, queue (azioni accodabili),
   free = si può cuocere senza biglietto, trap = indice dello spawn che punisce
   l'anticipo, two = ordini a due termini, chg = cambiano idea, blind =
   biglietto coperto, rush = arrivi a raffica. Curva 0,2/0,45/0,7/1,0/0,6
   (ricerca/03 §3.3). Every beat has at least two hobs: with one there is no
   meaning → term choice to grade (brief §2.2). */
const B = (o) => ({
  hobs: 2,
  max: 2,
  arrive: 6.5,
  pat: 30,
  tickets: 4,
  queue: 1,
  free: false,
  trap: -1,
  two: false,
  chg: false,
  blind: false,
  rush: false,
  ...o,
});

const CH = [
  {
    t: ['Uno alla volta', 'One at a time'],
    titles: [
      ['Il primo', 'The first'],
      ['Ancora uno', 'One more'],
      ['Due di fila', 'Two in a row'],
      ['Senza fermarti', 'No pause'],
      ['Il ritmo', 'The rhythm'],
    ],
    beats: [
      B({ hobs: 2, max: 1, arrive: 7.5, pat: 40, tickets: 2 }),
      B({ hobs: 2, max: 1, arrive: 6.5, pat: 36, tickets: 3 }),
      B({ hobs: 2, max: 1, arrive: 5.5, pat: 32, tickets: 4 }),
      B({ hobs: 2, max: 2, arrive: 4.6, pat: 28, tickets: 5 }),
      B({ hobs: 2, max: 1, arrive: 6.0, pat: 34, tickets: 4 }),
    ],
  },
  {
    t: ['Due che aspettano', 'Two waiting'],
    titles: [
      ['Chi aspetta', 'Who waits'],
      ['Chi prima', 'Who first'],
      ['Due termini', 'Two terms'],
      ['Stretti', 'Tight'],
      ['A memoria', 'By heart'],
    ],
    beats: [
      B({ hobs: 2, max: 1, arrive: 7.0, pat: 36, tickets: 3 }),
      B({ hobs: 2, max: 2, arrive: 6.5, pat: 32, tickets: 4 }),
      B({ hobs: 2, max: 2, arrive: 6.0, pat: 30, tickets: 5 }),
      B({ hobs: 2, max: 3, arrive: 4.4, pat: 24, tickets: 6 }),
      B({ hobs: 2, max: 2, arrive: 6.0, pat: 30, tickets: 5 }),
    ],
  },
  {
    t: ['Non si indovina', 'No guessing'],
    titles: [
      ['Il ripiano libero', 'The free shelf'],
      ['Tentazione', 'Temptation'],
      ['Cotto per niente', 'Cooked for nothing'],
      ['Ripiano pieno', 'Full shelf'],
      ['Solo su richiesta', 'On request only'],
    ],
    beats: [
      B({ hobs: 2, max: 2, arrive: 7.0, pat: 34, tickets: 3, free: true }),
      B({ hobs: 2, max: 2, arrive: 6.6, pat: 30, tickets: 4, free: true }),
      B({ hobs: 2, max: 2, arrive: 6.4, pat: 28, tickets: 5, free: true, trap: 1 }),
      B({ hobs: 3, max: 3, arrive: 4.6, pat: 22, tickets: 6, free: true, trap: 2 }),
      B({ hobs: 2, max: 2, arrive: 6.2, pat: 28, tickets: 5, free: true }),
    ],
  },
  {
    t: ['Cambia idea', 'Changed mind'],
    titles: [
      ['Il primo ripensamento', 'First rethink'],
      ['Rileggi', 'Read again'],
      ['Mentre cuoci', 'While cooking'],
      ['Due ripensamenti', 'Two rethinks'],
      ['Sempre il biglietto', 'Always the ticket'],
    ],
    beats: [
      B({ hobs: 2, max: 2, arrive: 7.0, pat: 34, tickets: 3, chg: true }),
      B({ hobs: 2, max: 2, arrive: 6.5, pat: 30, tickets: 4, chg: true }),
      B({ hobs: 2, max: 2, arrive: 6.2, pat: 28, tickets: 5, chg: true }),
      B({ hobs: 3, max: 3, arrive: 5.0, pat: 24, tickets: 6, chg: true }),
      B({ hobs: 2, max: 2, arrive: 6.4, pat: 30, tickets: 5, chg: true }),
    ],
  },
  {
    t: ['Due cose in un ordine', 'Two in one order'],
    titles: [
      ['Il doppio', 'The double'],
      ['Uno e due', 'One and two'],
      ['Ordine misto', 'Mixed order'],
      ['Tre doppi', 'Three doubles'],
      ['Composizione', 'Composition'],
    ],
    beats: [
      B({ hobs: 2, max: 1, arrive: 8.0, pat: 40, tickets: 3, two: true }),
      B({ hobs: 2, max: 2, arrive: 7.4, pat: 36, tickets: 4, two: true }),
      B({ hobs: 3, max: 2, arrive: 7.0, pat: 32, tickets: 4, two: true }),
      B({ hobs: 3, max: 3, arrive: 5.6, pat: 26, tickets: 5, two: true }),
      B({ hobs: 3, max: 2, arrive: 7.0, pat: 34, tickets: 4, two: true }),
    ],
  },
  {
    t: ['Il biglietto coperto', 'The face-down ticket'],
    titles: [
      ['Coperto', 'Face down'],
      ['Accetta prima', 'Accept first'],
      ['Non si sbircia', 'No peeking'],
      ['Coperti e doppi', 'Face down and double'],
      ['Alla cieca', 'Blind'],
    ],
    beats: [
      B({ hobs: 2, max: 2, arrive: 7.0, pat: 34, tickets: 3, blind: true }),
      B({ hobs: 2, max: 2, arrive: 6.6, pat: 30, tickets: 4, blind: true }),
      B({ hobs: 3, max: 2, arrive: 6.2, pat: 28, tickets: 5, blind: true }),
      B({ hobs: 3, max: 3, arrive: 5.0, pat: 24, tickets: 6, blind: true, two: true }),
      B({ hobs: 3, max: 2, arrive: 6.6, pat: 30, tickets: 5, blind: true }),
    ],
  },
  {
    t: ['A raffica', 'In bursts'],
    titles: [
      ['La prima raffica', 'First burst'],
      ['Tre insieme', 'Three at once'],
      ['Coda di azioni', 'Action queue'],
      ['Il picco', 'The peak'],
      ['Automatico', 'Automatic'],
    ],
    beats: [
      B({ hobs: 3, max: 3, arrive: 5.4, pat: 30, tickets: 5, rush: true, queue: 2 }),
      B({ hobs: 3, max: 3, arrive: 4.8, pat: 28, tickets: 6, rush: true, queue: 2 }),
      B({ hobs: 3, max: 4, arrive: 4.2, pat: 24, tickets: 7, rush: true, queue: 2 }),
      B({ hobs: 3, max: 4, arrive: 3.6, pat: 21, tickets: 8, rush: true, queue: 2 }),
      B({ hobs: 3, max: 3, arrive: 5.0, pat: 28, tickets: 6, rush: true, queue: 2 }),
    ],
  },
  {
    t: ['Il turno intero', 'The whole shift'],
    titles: [
      ['Tutto insieme', 'All together'],
      ['Senza rete', 'No net'],
      ['La prova', 'The test'],
      ['Il picco del turno', 'Shift peak'],
      ['Chiusura', 'Closing'],
    ],
    beats: [
      B({ hobs: 3, max: 3, arrive: 5.6, pat: 30, tickets: 6, two: true, chg: true, queue: 2 }),
      B({ hobs: 3, max: 3, arrive: 5.0, pat: 27, tickets: 7, two: true, blind: true, queue: 2 }),
      B({
        hobs: 3,
        max: 4,
        arrive: 4.4,
        pat: 24,
        tickets: 8,
        two: true,
        chg: true,
        blind: true,
        free: true,
        trap: 3,
        queue: 2,
      }),
      // Deviation 5 (header): the template holds four at the window here.
      B({
        hobs: 3,
        max: 3,
        arrive: 3.8,
        pat: 21,
        tickets: 9,
        two: true,
        chg: true,
        blind: true,
        rush: true,
        queue: 2,
      }),
      B({ hobs: 3, max: 3, arrive: 5.4, pat: 30, tickets: 6, two: true, chg: true, queue: 2 }),
    ],
  },
];

const TX = {
  it: {
    wrong: [
      'Hai cotto la cosa sbagliata.',
      'Il biglietto diceva «{it}», ma sul cartello del fornello c’era scritto «{pick}».',
      'Sul biglietto c’è il significato, sul cartello il termine: «{it}» si cuoce sul fornello «{word}».',
    ],
    chg: [
      'Hai cotto il termine vecchio.',
      'Quel cliente aveva cambiato il biglietto: ora chiede «{it}», e tu hai cotto «{pick}».',
      'Vale quello che c’è scritto adesso, non quello che ricordi: «{it}» è «{word}».',
    ],
    busy: [
      'Hai cotto qualcosa che nessuno aveva chiesto.',
      'Il ripiano era occupato quando è arrivata la richiesta vera.',
      'Il chiosco non indovina: prima il biglietto, poi il fornello. «{word}» si cuoce solo quando qualcuno chiede «{it}».',
    ],
    late: [
      'Un cliente se n’è andato mentre eri altrove.',
      'Il suo biglietto era in attesa da troppo tempo.',
      'Un paio di mani sole: scegli chi servire adesso. Chi chiede «{it}» aspetta il fornello «{word}».',
    ],
    hint: 'biglietto → fornello col termine giusto → sportello · tastiera: ← → cliente, ↑ biglietto, 1-3 fornello, spazio sportello',
    eyebrow: 'Turno servito',
  },
  en: {
    wrong: [
      'You cooked the wrong thing.',
      'The ticket said "{it}", but the sign on the hob read "{pick}".',
      'The ticket carries the meaning, the sign carries the term: "{it}" is cooked on the "{word}" hob.',
    ],
    chg: [
      'You cooked the old term.',
      'That customer had changed the ticket: it now asks for "{it}", and you cooked "{pick}".',
      'What counts is what it says now, not what you remember: "{it}" is "{word}".',
    ],
    busy: [
      'You cooked something nobody asked for.',
      'The shelf was taken when the real request came in.',
      'The kiosk does not guess: ticket first, then the hob. "{word}" is cooked only when somebody asks for "{it}".',
    ],
    late: [
      'A customer left while you were elsewhere.',
      'Their ticket had been waiting too long.',
      'Only one pair of hands: choose who to serve now. Whoever asks for "{it}" is waiting for the "{word}" hob.',
    ],
    hint: 'ticket → the hob with the right term → hatch · keyboard: ← → customer, ↑ ticket, 1-3 hob, space hatch',
    eyebrow: 'Shift served',
  },
};

// ─── the shift ───────────────────────────────────

function alive(host) {
  return host.cust.filter((k) => !k.dead);
}

function pending(host) {
  return host.cust.filter((k) => k.taken && !k.dead && k.stage < k.shapes.length);
}

/** Which hob the customer wants next: the index into host.menu. */
function want(k) {
  return k.shapes[k.stage];
}

/* ricerca/35 §35.3.1: a term served is a term heard. */
function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

function travel(host, to) {
  const h = host.hands;
  return Math.min(TRAVEL_MAX, (Math.hypot(h.x - to.x, h.y - to.y) / W) * 0.9);
}

/** The meaning becomes visible: the term is presented (mastery 0 → 1). */
function reveal(host, k) {
  for (const s of k.shapes) host.menu[s].introduce();
}

/**
 * The beat's own term must be asked until it has been cooked right once
 * (§46.5). While it has not, and no customer at the window still carries it,
 * the next customer to arrive asks for it.
 */
function needTerm(host) {
  if (host.termOk || host.termIdx < 0) return false;
  return !alive(host).some((k) => k.shapes.slice(k.stage).includes(host.termIdx));
}

// ─── the error ladder (ricerca/00 passo 6) ───────

function openCoach(host, kind, pick, wanted) {
  host.coachKind = kind;
  host.setState({
    coach: { kind, pick: pick || '', word: labelOf(wanted), it: meaningOf(wanted, 'it') },
  });
}

/**
 * A graded error on one customer: 1st the waste on the shelf and a thud,
 * 2nd the right sign lights up (the customer is now aided), 3rd the coach.
 */
function ladder(host, k, kind, hob) {
  k.wrong++;
  engine.snd(host, 'thud', { v: 0.2 });
  if (k.wrong >= 2) {
    k.aided = true;
    host.pulse = 0.7;
    host.pulseHob = want(k);
  }
  if (k.wrong >= 3) {
    openCoach(host, kind, labelOf(host.menu[hob]), host.menu[want(k)]);
    k.wrong = 0;
  }
}

/** The template's streak for errors that have no customer to count on. */
function streak(host, kind) {
  const s = host.streak;
  if (s.kind === kind) s.n++;
  else {
    s.kind = kind;
    s.n = 1;
  }
  if (s.n === 2) {
    host.pulse = 0.7;
    const k = pending(host)[0];
    host.pulseHob = k ? want(k) : -1;
  }
  if (s.n >= 3) {
    openCoach(host, kind, '', host.item);
    host.streak = { kind: null, n: 0 };
  }
}

// ─── customers ───────────────────────────────────

function spawn(host) {
  const c = host.cfg;
  const n = host.menu.length;
  let a = Math.floor(Math.random() * n);
  if (host.spawned === c.trap) {
    const w = host.shelf.find((s) => !s.for);
    if (w) a = (w.shape + 1) % n;
  }
  if (needTerm(host)) a = host.termIdx;
  const shapes = [a];
  if (c.two && n > 1 && Math.random() < 0.7) {
    let b = Math.floor(Math.random() * n);
    if (b === a) b = (b + 1) % n;
    shapes.push(b);
  }
  const taken = alive(host).map((k) => k.slot);
  const free = SLOTS.map((_, i) => i).filter((i) => !taken.includes(i));
  const slot = free.length ? free[0] : alive(host).length % SLOTS.length;
  // The customer carrying the beat's term never changes their mind: a swap
  // would leave the term presented but unasked.
  const fickle = c.chg && !shapes.includes(host.termIdx);
  const k = {
    id: host.nid++,
    slot,
    x: SLOTS[slot],
    shapes,
    stage: 0,
    pat: c.pat,
    pat0: c.pat,
    taken: false,
    dead: false,
    served: false,
    out: 0,
    wob: Math.random() * 6.28,
    in: 0,
    covered: Boolean(c.blind),
    chgAt: fickle ? 2.5 + Math.random() * 4 : 0,
    flip: 0,
    wrong: 0,
    aided: false,
    changed: 0,
    wasShape: -1,
    pal: FIGURES[Math.floor(Math.random() * FIGURES.length)],
  };
  host.cust.push(k);
  host.spawned++;
  if (!k.covered) reveal(host, k);
}

function changeMind(host, k) {
  const n = host.menu.length;
  k.chgAt = 0;
  if (n < 2 || k.stage >= k.shapes.length) return;
  let next = Math.floor(Math.random() * n);
  if (next === k.shapes[k.stage]) next = (next + 1) % n;
  k.wasShape = k.shapes[k.stage];
  k.shapes[k.stage] = next;
  k.flip = 1;
  k.changed = 1;
  if (!k.covered) host.menu[next].introduce();
  engine.snd(host, 'pop', { hz: 380, v: 0.12 });
}

// ─── the hands: take, cook, give ─────────────────

function start(host, j) {
  const h = host.hands;
  const c = host.cfg;
  if (j.t === 'take') {
    const k = j.c;
    if (!k || k.taken || k.dead) return;
    const at = { x: k.x, y: CUST_Y + 40 };
    h.job = { t: 'take', c: k };
    h.total = 0.8 + travel(host, at);
    h.busy = h.total;
    h.at = at;
    k.taken = true;
    if (k.covered) {
      k.covered = false;
      k.flip = 1;
      reveal(host, k);
      engine.snd(host, 'pop', { hz: 520, v: 0.1 });
    }
    engine.snd(host, 'click', { hz: 900, v: 0.2 });
    return;
  }
  if (j.t === 'cook') {
    const i = j.i;
    if (i < 0 || i >= host.hobs) return;
    const open = pending(host);
    const target = open.find((k) => want(k) === i);
    const focus = target || open.slice().sort((a, b) => a.pat - b.pat)[0] || null;
    if (!focus && !c.free) {
      // Nothing was asked: the hob stays cold (chapter 3 lifts this).
      engine.snd(host, 'fall');
      host.shake = 0.4;
      return;
    }
    let ok = false;
    let wanted = -1;
    if (focus) {
      // The pick is the graded response: the sign the learner chose against
      // the term the ticket asks for, through the SDK (§46.1, §46.2).
      wanted = want(focus);
      const item = host.menu[wanted];
      const verdict = item.attempt(labelOf(host.menu[i]), {
        expected: labelOf(item),
        mode: MODE,
        hintsUsed: focus.aided ? 1 : 0,
        silent: true,
      });
      host.session.mark();
      ok = Boolean(verdict.correct);
      if (ok && wanted === host.termIdx) host.termOk = true;
    }
    const at = hobPos(i, host.hobs);
    h.job = { t: 'cook', i, c: focus, ok, wanted };
    h.total = 1.5 + travel(host, at);
    h.busy = h.total;
    h.at = at;
    engine.snd(host, 'pop', { hz: 220, v: 0.12 });
    return;
  }
  if (j.t === 'give') {
    const ready = host.cust.find((k) => !k.dead && k.taken && k.stage >= k.shapes.length);
    const waste = host.shelf.findIndex((s) => !s.for);
    h.job = { t: 'give', c: ready || null, waste };
    h.total = 0.8 + travel(host, HATCH);
    h.busy = h.total;
    h.at = HATCH;
    engine.snd(host, 'click', { hz: 600, v: 0.16 });
  }
}

function wasteOn(host, i) {
  host.shelf.push({ shape: i, for: null });
}

function serve(host, k) {
  k.dead = true;
  k.served = true;
  k.out = 0;
  host.made++;
  host.flash = 1;
  host.shelf = host.shelf.filter((s) => s.for !== k);
  const items = [...new Set(k.shapes)].map((s) => host.menu[s]);
  for (const item of items) item.clear();
  say(host, items.map(labelOf).join(', '));
  engine.snd(host, 'tone', { from: 620, to: 980, v: 0.18 });
  engine.burst(host, host.parts, HATCH.x, HATCH.y, 12, '#FFC72C', { up: 90 });
  host.setState({ step: host.made });
  persist(host);
  if (host.made >= host.needed) {
    for (const t of host.terms) if (t.correct > 0) t.clear();
    host.finished = true;
    engine.snd(host, 'chime');
    // As in the template: the shift is served, the done screen is immediate.
    host.setState({ done: true });
  }
}

function finish(host) {
  const h = host.hands;
  const j = h.job;
  h.job = null;
  h.busy = 0;
  if (!j) {
    if (host.queue.length) start(host, host.queue.shift());
    return;
  }
  if (j.t === 'cook') {
    const k = j.c;
    const p = hobPos(j.i, host.hobs);
    if (k && !k.dead) {
      if (!j.ok) {
        wasteOn(host, j.i);
        ladder(host, k, k.changed && j.i === k.wasShape ? 'chg' : 'wrong', j.i);
      } else if (want(k) !== j.i) {
        // Right when picked, wrong by the time it was cooked: the ticket changed.
        wasteOn(host, j.i);
        ladder(host, k, 'chg', j.i);
      } else {
        k.stage++;
        host.shelf.push({ shape: j.i, for: k });
        engine.snd(host, 'tone', { from: 480 + k.stage * 60, to: 720 + k.stage * 70, v: 0.13 });
        engine.burst(host, host.parts, p.x, p.y, 8, '#FFF4D6', { up: 60 });
      }
    } else {
      wasteOn(host, j.i);
      engine.snd(host, 'thud', { v: 0.2 });
      streak(host, 'busy');
    }
  } else if (j.t === 'give') {
    if (j.c && !j.c.dead && j.c.stage >= j.c.shapes.length) {
      serve(host, j.c);
    } else if (j.waste >= 0 && host.shelf[j.waste] && !host.shelf[j.waste].for) {
      host.shelf.splice(j.waste, 1);
      engine.snd(host, 'thud', { v: 0.16 });
      engine.burst(host, host.parts, HATCH.x, HATCH.y, 5, '#A0623A', { up: 40 });
    } else {
      engine.snd(host, 'fall');
      host.shake = 0.4;
    }
  }
  if (host.queue.length) start(host, host.queue.shift());
}

/** One pair of hands: a busy pair either queues the action or drops it. */
function act(host, j) {
  const h = host.hands;
  if (h.busy > 0) {
    if (host.cfg.queue > 1 && host.queue.length < host.cfg.queue - 1) {
      host.queue.push(j);
      engine.snd(host, 'pop', { hz: 300, v: 0.07 });
    } else {
      engine.snd(host, 'fall');
      host.shake = 0.5;
    }
    return;
  }
  start(host, j);
}

// ─── lifecycle ───────────────────────────────────

function init(host) {
  host.parts = [];
  host.cust = [];
  host.shelf = [];
  host.queue = [];
  host.terms = [];
  host.item = null;
  host.menu = [];
  host.hobs = 0;
  host.termIdx = -1;
  host.lesson = null;
  host.chapter = 0;
  host.hands = { x: HANDS0.x, y: HANDS0.y, busy: 0, total: 0, at: null, job: null };
  host.streak = { kind: null, n: 0 };
  host.t = 0;
  host.made = 0;
  host.needed = 0;
  host.gone = 0;
  host.sel = -1;
  host.kbUsed = false;
  host.nid = 0;
}

/**
 * Which chapter this beat belongs to: the engine installs the chapter's beat
 * table before it calls reset, so the installed table is the truth; the
 * state is the fallback for a host that never installed one.
 */
function installedChapter(host) {
  const i = host.CH ? host.CH.findIndex((c) => c.beats === host.BEATS) : -1;
  return i >= 0 ? i : host.state.chapter || 0;
}

function reset(host, beat) {
  const cfg = host.BEATS[beat];
  host.cfg = cfg;
  host.needed = cfg.tickets;
  const ci = installedChapter(host);
  host.chapter = ci;

  // The spine: this beat's term, its lesson, and the signs on the hobs —
  // the term plus real neighbours from the same lesson, in shuffled places.
  host.terms = beatItems(host.session, ci, beat);
  host.item = host.terms[0] || null;
  host.lesson = beatLesson(host.session, ci, beat);
  const extra = host.item ? fillers(host.session, host.item, cfg.hobs - host.terms.length) : [];
  host.menu = shuffle(host.terms.concat(extra)).slice(0, cfg.hobs);
  host.hobs = host.menu.length;
  host.termIdx = host.menu.indexOf(host.item);
  host.termOk = false;

  host.cust = [];
  host.shelf = [];
  host.queue = [];
  host.parts = [];
  host.hands = { x: HANDS0.x, y: HANDS0.y, busy: 0, total: 0, at: null, job: null };
  host.arriveT = 1.1;
  host.made = 0;
  host.gone = 0;
  host.spawned = 0;
  host.burstLeft = 0;
  host.streak = { kind: null, n: 0 };
  host.pulse = 0;
  host.pulseHob = -1;
  host.shake = 0;
  host.flash = 0;
  host.t = 0;
  host.sel = -1;
  host.kbUsed = false;
  host.nid = 0;
  host.finished = false;
  host.coachKind = null;
  // Reduced motion: the hands, the pop-up and the exit run at 0.7× (§15.4).
  host.motion = host.reduceMotion ? 0.7 : 1;
  if (host.state.left) host.setState({ left: 0 });
  host.session.mode = MODE;
  host.session.mark();
}

/**
 * A customer who leaves is not a graded response: the learner produced
 * nothing. The place stays empty — that is the punishment (ricerca/10 §10.7).
 */
function lose(host, k) {
  k.dead = true;
  host.gone++;
  engine.snd(host, 'whir');
  host.shake = 0.7;
  for (const s of host.shelf) if (s.for === k) s.for = null;
  host.setState({ left: host.gone });
  streak(host, 'late');
}

// ─── update ──────────────────────────────────────

function update(host, dt) {
  host.t += dt;
  const c = host.cfg;
  if (!c) return;
  const h = host.hands;
  const m = host.motion || 1;

  if (host.flash > 0) host.flash -= dt * 3.2;
  if (host.shake > 0) host.shake -= dt * 3.4;
  if (host.pulse > 0) host.pulse -= dt;

  if (!host.finished) {
    host.arriveT -= dt;
    if (host.arriveT <= 0 && alive(host).length < c.max && host.spawned < host.needed + host.gone) {
      spawn(host);
      if (c.rush) {
        if (host.burstLeft > 0) {
          host.burstLeft--;
          host.arriveT = 0.7;
        } else {
          host.burstLeft = 2;
          host.arriveT = c.arrive * 1.3;
        }
      } else {
        host.arriveT = c.arrive * (0.85 + Math.random() * 0.3);
      }
    }
  }

  if (h.busy > 0) {
    h.busy -= dt;
    if (h.at) {
      h.x += (h.at.x - h.x) * Math.min(1, dt * 7 * m);
      h.y += (h.at.y - h.y) * Math.min(1, dt * 7 * m);
    }
    if (h.busy <= 0) finish(host);
  }

  for (const k of host.cust) {
    if (k.served) {
      k.out += dt * 1.4 * m;
      continue;
    }
    if (k.dead) continue;
    k.in = Math.min(1, k.in + dt * 2.4 * m);
    k.wob += dt * 2.2;
    if (k.flip > 0) k.flip -= dt * 3 * m;
    if (k.chgAt > 0) {
      k.chgAt -= dt;
      if (k.chgAt <= 0) changeMind(host, k);
    }
    k.pat -= dt;
    if (k.pat <= 0) {
      lose(host, k);
      if (host.gone >= 3) {
        // Three gone: the kiosk empties and the shift starts over. The coach
        // the third loss may have opened stays open over the fresh shift.
        const coachKind = host.coachKind;
        reset(host, host.state.beat);
        host.coachKind = coachKind;
        host.setState({ step: 0, left: 0 });
        return;
      }
    }
  }
  host.cust = host.cust.filter((k) => !k.dead || (k.served && k.out < 1));
  host.parts = engine.parts(host.parts, dt, 420);
}

// ─── input: tap the ticket, the hob, the hatch ───

function customerAt(host, p) {
  let best = null;
  let bd = HIT_CUST;
  for (const k of alive(host)) {
    const d = Math.hypot(p.x - k.x, p.y - (CUST_Y + 24));
    if (d < bd) {
      bd = d;
      best = k;
    }
  }
  return best;
}

function tap(host, p) {
  if (host.finished) return;
  const k = customerAt(host, p);
  if (k && !k.taken) {
    act(host, { t: 'take', c: k });
    return;
  }
  for (let i = 0; i < host.hobs; i++) {
    const q = hobPos(i, host.hobs);
    if (Math.hypot(p.x - q.x, p.y - q.y) < HIT_HOB) {
      act(host, { t: 'cook', i });
      return;
    }
  }
  if (Math.hypot(p.x - HATCH.x, p.y - HATCH.y) < HIT_HATCH) {
    act(host, { t: 'give' });
    return;
  }
  engine.snd(host, 'fall');
}

/**
 * The same game with no pointer: ← → walk along the window, ↑ takes the
 * selected ticket, 1-3 cook on that hob, space / Enter / ↓ go to the hatch.
 */
function key(host, e) {
  if (host.finished) return;
  host.kbUsed = true;
  const row = alive(host).sort((a, b) => a.x - b.x);
  const at = row.findIndex((k) => k.id === host.sel);
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();
    if (!row.length) return;
    const step = e.key === 'ArrowLeft' ? -1 : 1;
    const i = at < 0 ? (step < 0 ? row.length - 1 : 0) : (at + step + row.length) % row.length;
    host.sel = row[i].id;
    engine.snd(host, 'click', { hz: 1400, v: 0.1 });
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const k = (at >= 0 ? row[at] : row.find((q) => !q.taken)) || null;
    if (k) {
      host.sel = k.id;
      act(host, { t: 'take', c: k });
    }
  } else if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowDown') {
    e.preventDefault();
    act(host, { t: 'give' });
  } else if (/^[1-3]$/.test(e.key)) {
    const i = parseInt(e.key, 10) - 1;
    if (i < host.hobs) act(host, { t: 'cook', i });
  }
}

function draw(host, x) {
  drawScene(host, x);
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

/* Topic lesson titles are written "English / Italiano". */
function lessonTitle(lesson, lang) {
  if (!lesson || !lesson.title) return '';
  const halves = String(lesson.title).split(' / ');
  const half = lang === 'en' || !halves[1] ? halves[0] : halves[1];
  return half.trim();
}

function doneView(host, lang) {
  const L = TX[lang] || TX.it;
  const terms = host.terms || [];
  const meaning = terms.map((t) => meaningOf(t, 'it')).join(' · ');
  const title = lessonTitle(host.lesson, lang);
  return {
    eyebrow: L.eyebrow,
    title: terms.map(labelOf).join(' · '),
    subtitle: title ? `${meaning} · ${title}` : meaning,
  };
}

function onCoachClose(host) {
  host.streak = { kind: null, n: 0 };
  host.coachKind = null;
}

export default {
  meta: {
    id: 'nodejs-l1-chiosco',
    surface: 'nodejs',
    level: 0,
    band: 1,
    register: 'R10',
    title: 'Il chiosco di notte',
    titleEn: 'The night kiosk',
    levelLabel: 'Node.js · L1 Fondamenti / Node.js · L1 Foundations',
    font: '400 16px "Alfa Slab One"',
  },
  W,
  H,
  CH,
  drone: { freq: 52, type: 'triangle', volume: 0.014, lowpass: 150 },
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
