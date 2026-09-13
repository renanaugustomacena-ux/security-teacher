/**
 * LA CATENA DI CONTROLLO — Node.js L9 «Middleware» (js/topics/data/nodejs.js,
 * level 8: 4 lessons × 10 terms = 40), run in 8 chapters × 5 beats, one term
 * per beat (LevelBeats spine, DOCTRINE §46.5).
 *
 * Port of knowledge-aio-giochi/templates/nodejs-l9-catena (design sheet in
 * its header) with the vocabulary spine of the brief and the R9 register.
 *
 * SCHEDA DI PROGETTO (ricerca/00 §0.3) + SCHEDA VISIVA (ricerca/42 §42.3)
 * GIOCO ...... La catena di controllo
 * LIVELLO .... Node.js, L9 Middleware, banda 2 — 8 capitoli, 40 turni
 * CONCETTO ... Ogni pezzo della catena vede la richiesta a metà strada e
 *              decide se farla proseguire. Se non la passa e non risponde,
 *              resta appesa per sempre. Ciò che la richiesta porta è un
 *              significato (italiano) sul suo cartellino; la valvola che le
 *              dà il via porta il termine inglese.
 * FORMA ...... trasformazione        VERBO ... dare il via (la valvola giusta)
 * ARCHETIPO .. ricerca/16 lane sorting, in forma di catena verticale
 * VINCI SE ... tutte le richieste del turno escono con una risposta
 * PERDI SE ... tre richieste restano appese o escono trasformate male:
 *              il turno ricomincia
 * SBAGLI ..... 1 la valvola sbagliata: la capsula sobbalza e resta lì, tonfo
 *              2 alla seconda sulla stessa capsula, la valvola giusta pulsa
 *              3 coaching: cosa hai premuto, cosa portava, il termine inglese
 *              (appesa / tappo a vuoto / controllo forzato: la scala del
 *              template — capsula persa, lampada spenta, striscia di tre)
 * CAPITOLI ... 1 dare il via · 2 due stazioni · 3 FRATTURA senza next resta
 *              appesa · 4 aggiungere al pacco · 5 chi risponde chiude ·
 *              6 l'ordine dei gestori · 7 a raffica · 8 la catena intera
 * MONDO ...... condotto verticale di luce su griglia: stazioni esagonali con
 *              il nome in codice e ciò che fanno in italiano, capsule con il
 *              cartellino, valvole esagonali col termine, il tappo magenta
 * REGISTRO ... R9 Neon su griglia — fondo #05060F, griglia #12203A, ciano,
 *              magenta, arancio, blu, bianco · figura: la capsula esagonale
 *              con due occhi e la scia · suolo: la griglia in prospettiva su
 *              cui stanno le valvole · movimento: scia che resta, valvola che
 *              pulsa a tempo, pavimento che scorre · carattere: Raleway con
 *              alone per termini e cifre, JetBrains Mono per i nomi in codice
 * NUMERI ..... transito 1,9–3,2 s per stazione, appesa dopo 1,6 × transito,
 *              due capsule vive, tre lampade, valvole 2→4, capsule 3→9
 * TEST 1 ..... le valvole sono esagoni identici: cambia solo il termine, e la
 *              posizione è casuale a ogni turno. Si vince solo leggendo il
 *              cartellino e trovando il termine.
 * TEST 2 ..... "Do il via alla richiesta dalla valvola col termine che dice
 *              ciò che porta, quando la stazione ha finito, prima che resti
 *              appesa"
 * TEST 3 ..... una capsula scende nel condotto e una valvola pulsa
 *
 * DEVIAZIONI DAL TEMPLATE (deliberate, per la firma dell'orchestratore)
 *   1 la stazione `cache` legge il pomello `cached`: il template lo
 *     dichiarava su ogni capsula ma la stazione rispondeva sempre. Qui una
 *     capsula già in cache si chiude lì, una che non c'è prosegue: il
 *     capitolo 5 («chi risponde chiude») ha così una scelta da fare.
 *   2 le capsule di un turno sono `need`, non `caps.length`: il template
 *     spawnava al massimo `caps.length` capsule e i turni con need maggiore
 *     (il primo compreso: 2 capsule, 3 da chiudere) non finivano mai. Le
 *     bandiere ciclano sulla lista `caps` come il modulo del template lasciava
 *     intendere.
 *   3 la valvola sbagliata non uccide la capsula (brief §2.5): sobbalzo e
 *     tonfo, poi la valvola giusta pulsa, poi il coach. La capsula resta
 *     appesa alla stazione e il suo tempo continua a scorrere: la
 *     conseguenza fisica è che si avvicina all'appeso. Gli errori del
 *     template (appesa, tappo a vuoto, controllo forzato) restano letali,
 *     contano sulle lampade e sulla striscia di tre.
 *   4 alla terza valvola sbagliata il tempo della capsula riparte da zero,
 *     perché il coach copre il vetro e al ritorno la capsula avrebbe solo
 *     un residuo di finestra.
 *   5 il turno non si chiude finché il termine del turno non è stato dato
 *     il via una volta: una capsula col termine che si chiude senza mai
 *     passare da una valvola (cache piena alla prima stazione) lo lascia
 *     alla capsula successiva (§46.5).
 *   Nessun'altra: la schermata «done» scatta subito come nel template, non
 *   c'è hitstop e il flash alla chiusura è quello del template.
 */

import * as engine from '../KaioEngine.js';
import { ttsService } from '../../services/TTSService.js';
import { beatItems, beatLesson, fillers, labelOf, meaningOf } from '../LevelBeats.js';
import {
  W,
  H,
  TOP,
  stY,
  valveAt,
  valvePos,
  sealHit,
  SEAL,
} from '../parts/nodejs-l9-catena/layout.js';
import { failKind, stationOf, wantOf } from '../parts/nodejs-l9-catena/chain.js';
import { drawScene } from '../parts/nodejs-l9-catena/draw.js';

const MODE = 'catena';
const HANG_X = 1.6;
const LIT_S = 0.6;

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

/* Beat: chain of stations, caps = the flags of the pods (cycled), need =
   pods to close, speed = transit per station in s, valves = term valves. */
const B = (o) => ({ chain: ['log', 'route'], caps: [{}], need: 4, speed: 2.6, valves: 3, ...o });
const C = (o) => ({ token: true, quota: true, cached: false, body: false, user: false, ...o });

const CH = [
  {
    t: ['Dare il via', 'Give the go'],
    titles: [
      ['La prima valvola', 'First valve'],
      ['Ancora una', 'One more'],
      ['Due capsule', 'Two capsules'],
      ['Più svelto', 'Quicker'],
      ['Il ritmo', 'The rhythm'],
    ],
    beats: [
      B({ chain: ['log', 'route'], caps: [C({}), C({})], need: 3, speed: 3.2, valves: 2 }),
      B({ chain: ['log', 'route'], caps: [C({}), C({}), C({})], need: 4, speed: 3.0, valves: 2 }),
      B({ chain: ['log', 'json', 'route'], caps: [C({}), C({})], need: 4, speed: 2.9, valves: 2 }),
      B({
        chain: ['log', 'json', 'route'],
        caps: [C({}), C({}), C({}), C({})],
        need: 6,
        speed: 2.2,
        valves: 2,
      }),
      B({ chain: ['log', 'json', 'route'], caps: [C({}), C({})], need: 5, speed: 2.8, valves: 2 }),
    ],
  },
  {
    t: ['Due stazioni', 'Two stations'],
    titles: [
      ['La seconda', 'The second'],
      ['In fila', 'In line'],
      ['Tre in fila', 'Three in line'],
      ['Stretti', 'Tight'],
      ['A occhio', 'At a glance'],
    ],
    beats: [
      B({
        chain: ['log', 'auth', 'route'],
        caps: [C({}), C({ token: false })],
        need: 4,
        speed: 3.0,
      }),
      B({
        chain: ['log', 'auth', 'route'],
        caps: [C({}), C({ token: false }), C({})],
        need: 5,
        speed: 2.8,
      }),
      B({
        chain: ['log', 'auth', 'json', 'route'],
        caps: [C({}), C({ token: false }), C({})],
        need: 5,
        speed: 2.7,
      }),
      B({
        chain: ['log', 'auth', 'json', 'route'],
        caps: [C({}), C({ token: false }), C({}), C({})],
        need: 6,
        speed: 2.1,
      }),
      B({
        chain: ['log', 'auth', 'json', 'route'],
        caps: [C({}), C({ token: false }), C({})],
        need: 5,
        speed: 2.7,
      }),
    ],
  },
  {
    t: ['Senza next resta appesa', 'Without next it hangs'],
    titles: [
      ['La capsula appesa', 'The hanging capsule'],
      ['Nessuno la aspetta', 'Nobody waits'],
      ['Non basta finire', 'Finishing is not enough'],
      ['Tre stazioni', 'Three stations'],
      ['Adesso lo sai', 'Now you know'],
    ],
    beats: [
      B({ chain: ['log', 'user', 'route'], caps: [C({}), C({})], need: 4, speed: 3.0 }),
      B({
        chain: ['log', 'user', 'json', 'route'],
        caps: [C({}), C({}), C({})],
        need: 5,
        speed: 2.8,
      }),
      B({
        chain: ['log', 'auth', 'user', 'route'],
        caps: [C({}), C({ token: false }), C({})],
        need: 5,
        speed: 2.6,
      }),
      B({
        chain: ['log', 'auth', 'user', 'json', 'route'],
        caps: [C({}), C({ token: false }), C({}), C({})],
        need: 6,
        speed: 2.1,
      }),
      B({
        chain: ['log', 'auth', 'user', 'route'],
        caps: [C({}), C({}), C({ token: false })],
        need: 5,
        speed: 2.7,
      }),
    ],
  },
  {
    t: ['Aggiungere al pacco', 'Adding to the parcel'],
    titles: [
      ['Il corpo', 'The body'],
      ["L'utente", 'The user'],
      ['Due aggiunte', 'Two additions'],
      ['Chi serve dopo', 'Who needs it later'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ chain: ['json', 'route'], caps: [C({}), C({})], need: 4, speed: 3.0 }),
      B({
        chain: ['auth', 'user', 'route'],
        caps: [C({}), C({ token: false })],
        need: 4,
        speed: 2.9,
      }),
      B({
        chain: ['json', 'auth', 'user', 'route'],
        caps: [C({}), C({}), C({ token: false })],
        need: 5,
        speed: 2.7,
      }),
      B({
        chain: ['json', 'auth', 'user', 'log', 'route'],
        caps: [C({}), C({ token: false }), C({}), C({})],
        need: 6,
        speed: 2.2,
      }),
      B({
        chain: ['json', 'auth', 'user', 'route'],
        caps: [C({}), C({}), C({ token: false })],
        need: 5,
        speed: 2.8,
      }),
    ],
  },
  {
    t: ['Chi risponde chiude', 'Whoever answers closes'],
    titles: [
      ['La cache', 'The cache'],
      ['Non passare oltre', 'Do not pass on'],
      ['Cache e handler', 'Cache and handler'],
      ['Due tappi', 'Two seals'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ chain: ['cache', 'route'], caps: [C({ cached: true }), C({})], need: 4, speed: 3.0 }),
      B({
        chain: ['log', 'cache', 'route'],
        caps: [C({ cached: true }), C({}), C({ cached: true })],
        need: 5,
        speed: 2.8,
      }),
      B({
        chain: ['log', 'cache', 'json', 'route'],
        caps: [C({ cached: true }), C({}), C({})],
        need: 5,
        speed: 2.7,
      }),
      B({
        chain: ['log', 'auth', 'cache', 'json', 'route'],
        caps: [C({ cached: true }), C({ token: false }), C({}), C({ cached: true })],
        need: 6,
        speed: 2.2,
      }),
      B({
        chain: ['log', 'cache', 'route'],
        caps: [C({ cached: true }), C({}), C({ cached: true })],
        need: 5,
        speed: 2.8,
      }),
    ],
  },
  {
    t: ["L'ordine dei gestori", 'Order of handlers'],
    titles: [
      ['Il limite prima', 'Limit first'],
      ['Il gestore in fondo', 'Handler at the end'],
      ["L'errore in coda", 'Error handler last'],
      ['Cinque stazioni', 'Five stations'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({
        chain: ['limit', 'auth', 'route'],
        caps: [C({}), C({ quota: false }), C({ token: false })],
        need: 5,
        speed: 2.9,
        valves: 4,
      }),
      B({
        chain: ['limit', 'auth', 'json', 'route'],
        caps: [C({}), C({ quota: false }), C({ token: false }), C({})],
        need: 5,
        speed: 2.7,
        valves: 4,
      }),
      B({
        chain: ['limit', 'auth', 'json', 'route', 'error'],
        caps: [C({}), C({ quota: false }), C({ token: false })],
        need: 5,
        speed: 2.6,
        valves: 4,
      }),
      B({
        chain: ['limit', 'auth', 'user', 'json', 'route', 'error'],
        caps: [C({}), C({ quota: false }), C({ token: false }), C({}), C({})],
        need: 6,
        speed: 2.1,
        valves: 4,
      }),
      B({
        chain: ['limit', 'auth', 'json', 'route', 'error'],
        caps: [C({}), C({ quota: false }), C({})],
        need: 5,
        speed: 2.7,
        valves: 4,
      }),
    ],
  },
  {
    t: ['A raffica', 'In bursts'],
    titles: [
      ['Due in condotto', 'Two in the duct'],
      ['Meno tempo', 'Less time'],
      ['Sei capsule', 'Six capsules'],
      ['Il picco', 'The peak'],
      ['Automatico', 'Automatic'],
    ],
    beats: [
      B({
        chain: ['limit', 'auth', 'json', 'user', 'route'],
        caps: [C({}), C({ quota: false }), C({ token: false }), C({}), C({})],
        need: 6,
        speed: 2.2,
        valves: 4,
      }),
      B({
        chain: ['limit', 'auth', 'json', 'user', 'route'],
        caps: [C({}), C({ quota: false }), C({ token: false }), C({}), C({}), C({})],
        need: 7,
        speed: 2.0,
        valves: 4,
      }),
      B({
        chain: ['limit', 'auth', 'cache', 'json', 'route'],
        caps: [
          C({ cached: true }),
          C({ quota: false }),
          C({}),
          C({ token: false }),
          C({ cached: true }),
          C({}),
        ],
        need: 7,
        speed: 2.0,
        valves: 4,
      }),
      B({
        chain: ['limit', 'auth', 'cache', 'json', 'user', 'route', 'error'],
        caps: [
          C({}),
          C({ quota: false }),
          C({ cached: true }),
          C({ token: false }),
          C({}),
          C({}),
          C({}),
        ],
        need: 8,
        speed: 1.9,
        valves: 4,
      }),
      B({
        chain: ['limit', 'auth', 'json', 'route'],
        caps: [C({}), C({ quota: false }), C({}), C({})],
        need: 6,
        speed: 2.4,
        valves: 4,
      }),
    ],
  },
  {
    t: ['La catena intera', 'The whole chain'],
    titles: [
      ['Tutto insieme', 'All together'],
      ['Senza rete', 'No net'],
      ['La prova', 'The test'],
      ['Il picco', 'The peak'],
      ['Chiusura', 'Closing'],
    ],
    beats: [
      B({
        chain: ['limit', 'auth', 'json', 'user', 'route', 'error'],
        caps: [C({}), C({ quota: false }), C({ token: false }), C({}), C({})],
        need: 6,
        speed: 2.3,
        valves: 4,
      }),
      B({
        chain: ['limit', 'auth', 'cache', 'json', 'user', 'route', 'error'],
        caps: [C({ cached: true }), C({ quota: false }), C({ token: false }), C({}), C({}), C({})],
        need: 7,
        speed: 2.1,
        valves: 4,
      }),
      B({
        chain: ['limit', 'auth', 'cache', 'json', 'user', 'route', 'error'],
        caps: [
          C({ cached: true }),
          C({ quota: false }),
          C({ token: false }),
          C({}),
          C({ cached: true }),
          C({}),
          C({}),
        ],
        need: 8,
        speed: 2.0,
        valves: 4,
      }),
      B({
        chain: ['limit', 'auth', 'cache', 'json', 'user', 'route', 'error'],
        caps: [
          C({}),
          C({ quota: false }),
          C({ cached: true }),
          C({ token: false }),
          C({}),
          C({}),
          C({}),
          C({}),
        ],
        need: 9,
        speed: 1.9,
        valves: 4,
      }),
      B({
        chain: ['limit', 'auth', 'json', 'user', 'route', 'error'],
        caps: [C({}), C({}), C({ quota: false }), C({})],
        need: 6,
        speed: 2.5,
        valves: 4,
      }),
    ],
  },
];

const TX = {
  it: {
    wrong: [
      'La valvola sbagliata: la capsula sobbalza e resta lì.',
      'Hai premuto «{pick}», ma il cartellino della capsula diceva «{it}».',
      'Sul cartellino c’è il significato, sulla valvola il termine: «{it}» passa dalla valvola «{word}».',
    ],
    hang: [
      'Una capsula è rimasta appesa alla stazione.',
      'La stazione aveva finito e nessuno le ha dato il via: da lì non si muove più.',
      'Finire non basta: senza next la richiesta resta appesa — anche quella per «{word}».',
    ],
    seal: [
      'Hai dato il via a una stazione che aveva già risposto.',
      'La risposta era partita: la capsula «{it}» è proseguita a vuoto.',
      'Chi risponde chiude la catena: non si passa oltre, nemmeno «{word}».',
    ],
    gate: [
      'Hai fatto proseguire una capsula che il controllo aveva respinto.',
      'La capsula «{it}» è arrivata in fondo senza averne il diritto.',
      'Il controllo che respinge risponde lui: «{word}» si chiude lì, non passa.',
    ],
    hint: 'senza next → appesa · con next → prosegue · tastiera: ← → valvola, 1-4 valvola, 0 o ↓ tappo, spazio',
    eyebrow: 'Catena libera',
  },
  en: {
    wrong: [
      'The wrong valve: the capsule jolts and stays put.',
      'You pressed "{pick}", but the capsule’s tag read "{it}".',
      'The tag carries the meaning, the valve carries the term: "{it}" goes through the "{word}" valve.',
    ],
    hang: [
      'A capsule was left hanging at the station.',
      'The station had finished and nobody gave it the go: it never moves again.',
      'Finishing is not enough: without next the request hangs — the one for "{word}" too.',
    ],
    seal: [
      'You gave the go to a station that had already answered.',
      'The answer had gone out: the "{it}" capsule travelled on empty.',
      'Whoever answers closes the chain: you do not pass on, not even "{word}".',
    ],
    gate: [
      'You passed on a capsule the check had rejected.',
      'The "{it}" capsule reached the end without the right to.',
      'A check that rejects answers itself: "{word}" closes there, it does not pass.',
    ],
    hint: 'no next → hangs · with next → moves on · keyboard: ← → valve, 1-4 valve, 0 or ↓ seal, space',
    eyebrow: 'Chain clear',
  },
};

// ─── the duct ────────────────────────────────────

function live(host) {
  return host.caps.filter((k) => !k.dead);
}

/** The pod the valves act on: the first one waiting at a station. */
function held(host) {
  return host.caps.find((k) => !k.dead && k.wait) || null;
}

/**
 * The beat's own term must be given the go once (§46.5). While it has not,
 * and no live pod carries it, the next pod to enter the duct carries it.
 */
function needTerm(host) {
  if (host.termOk || !host.item) return false;
  return !live(host).some((k) => k.item === host.item);
}

/* ricerca/35 §35.3.1: a term given the go is a term heard. */
function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

function openCoach(host, kind, pick, item) {
  host.coachKind = kind;
  host.setState({
    coach: { kind, pick: pick || '', word: labelOf(item), it: meaningOf(item, 'it') },
  });
}

/** The template's streak for its own errors: hang, seal, gate. */
function streak(host, kind, k) {
  const s = host.streak;
  if (s.kind === kind) s.n++;
  else {
    s.kind = kind;
    s.n = 1;
  }
  if (s.n === 2) {
    // The valve that served pulses: the term valve for a hang, the seal
    // for a pod that should have been closed.
    host.pulse = 0.8;
    host.pulseAt = kind === 'hang' ? host.menu.indexOf(k.item) : 'seal';
  }
  if (s.n >= 3) {
    openCoach(host, kind, '', k.item);
    host.streak = { kind: null, n: 0 };
  }
}

// ─── lifecycle ───────────────────────────────────

function init(host) {
  host.parts = [];
  host.caps = [];
  host.terms = [];
  host.item = null;
  host.menu = [];
  host.fill = [];
  host.lesson = null;
  host.chapter = 0;
  host.streak = { kind: null, n: 0 };
  host.lit = [];
  host.t = 0;
  host.made = 0;
  host.needed = 0;
  host.bad = 0;
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
  host.needed = cfg.need;
  const ci = installedChapter(host);
  host.chapter = ci;

  // The spine: this beat's term, its lesson, and the terms on the valves —
  // the term plus real neighbours from the same lesson, in shuffled places.
  host.terms = beatItems(host.session, ci, beat);
  host.item = host.terms[0] || null;
  host.lesson = beatLesson(host.session, ci, beat);
  const extra = host.item ? fillers(host.session, host.item, cfg.valves - host.terms.length) : [];
  host.menu = shuffle(host.terms.concat(extra)).slice(0, cfg.valves);
  host.termIdx = host.menu.indexOf(host.item);
  host.termOk = false;
  // The pods after the first carry the other valves' terms in turn: each
  // filler is presented and graded too (brief §2.3).
  host.fill = shuffle(host.menu.filter((m) => m !== host.item));
  host.fillAt = 0;

  host.caps = [];
  host.parts = [];
  host.capI = 0;
  host.spawnT = 0.7;
  host.made = 0;
  host.bad = 0;
  host.shake = 0;
  host.flash = 0;
  host.pulse = 0;
  host.pulseAt = null;
  host.streak = { kind: null, n: 0 };
  host.lit = cfg.chain.map(() => 0);
  host.t = 0;
  host.sel = -1;
  host.kbUsed = false;
  host.nid = 0;
  host.finished = false;
  host.coachKind = null;
  // Reduced motion: the descent and the trail run at 0.7× (§15.4); the
  // hang window is game time and stays what the sheet promises.
  host.motion = host.reduceMotion ? 0.7 : 1;
  if (host.state.left) host.setState({ left: 0 });
  host.session.mode = MODE;
  host.session.mark();
}

/* Three lamps out: the duct empties and the beat starts over, on the same
   term. The coach the third loss may have opened stays open over it. */
function restart(host) {
  const coachKind = host.coachKind;
  reset(host, host.state.beat);
  host.coachKind = coachKind;
  host.setState({ step: 0, left: 0 });
}

// ─── the verb: the go, the seal, the loss ────────

function close(host, k) {
  k.dead = true;
  k.closed = true;
  host.made++;
  host.flash = 1;
  host.streak = { kind: null, n: 0 };
  if (k.picked) k.item.clear();
  say(host, labelOf(k.item));
  engine.snd(host, 'tone', { from: 580, to: 900, v: 0.15 });
  engine.burst(host, host.parts, W / 2, stY(host.cfg.chain.length, k.at), 12, '#00E5FF');
  host.setState({ step: host.made });
  persist(host);
  if (host.made >= host.needed && host.termOk) {
    for (const t of host.terms) if (t.correct > 0) t.clear();
    host.finished = true;
    engine.snd(host, 'chime', { notes: [440, 587, 740] });
    // As in the template: the chain is clear, the done screen is immediate.
    host.setState({ done: true });
  }
}

/**
 * The template's loss: the pod is gone, a lamp goes out, the streak of that
 * kind grows. Not a graded response — the learner picked no term. Returns
 * true when the third lamp restarted the beat.
 */
function fail(host, k, kind) {
  k.dead = true;
  host.shake = 0.8;
  engine.snd(host, 'whir');
  engine.burst(
    host,
    host.parts,
    W / 2,
    stY(host.cfg.chain.length, Math.min(k.at, host.cfg.chain.length - 1)),
    9,
    '#2D5BFF'
  );
  streak(host, kind, k);
  host.bad++;
  host.setState({ left: host.bad });
  if (host.bad >= 3) {
    restart(host);
    return true;
  }
  return false;
}

function advance(host, k) {
  const mw = stationOf(host.cfg, k);
  if (mw.kind === 'add') k[mw.adds] = true;
  host.lit[k.at] = LIT_S;
  k.wait = false;
  k.hang = 0;
  k.at++;
  engine.snd(host, 'pop', { hz: 420, v: 0.14 });
  engine.burst(host, host.parts, W / 2, stY(host.cfg.chain.length, k.at - 1), 6, '#00E5FF', {
    v1: 80,
  });
}

/**
 * A term valve. The station must want the go; then the pick is the graded
 * response — the term the learner pressed against the term the pod carries,
 * through the SDK and never a local `===` (§46.1, §46.2). Wrong: the pod
 * jolts and stays, the hang clock keeps running; second wrong on the same
 * pod lights the right valve; third opens the coach.
 */
function pressValve(host, i) {
  const k = held(host);
  const pick = host.menu[i];
  if (!k || !pick) {
    engine.snd(host, 'fall');
    return;
  }
  const want = wantOf(host.cfg, k);
  if (want !== 'next') {
    fail(host, k, failKind(stationOf(host.cfg, k), want));
    return;
  }
  const verdict = k.item.attempt(labelOf(pick), {
    expected: labelOf(k.item),
    mode: MODE,
    hintsUsed: k.aided ? 1 : 0,
    silent: true,
  });
  host.session.mark();
  if (verdict.correct) {
    k.picked = true;
    if (k.item === host.item) host.termOk = true;
    advance(host, k);
    return;
  }
  k.wrong++;
  k.bump = 1;
  engine.snd(host, 'thud', { v: 0.2 });
  engine.burst(host, host.parts, W / 2, k.y, 5, '#12203A', { up: 20 });
  if (k.wrong >= 2) {
    k.aided = true;
    host.pulse = 0.8;
    host.pulseAt = host.menu.indexOf(k.item);
  }
  if (k.wrong >= 3) {
    k.hang = 0;
    k.wrong = 0;
    openCoach(host, 'wrong', labelOf(pick), k.item);
  }
}

/** The seal: the station answers and the chain closes there. */
function pressSeal(host) {
  const k = held(host);
  if (!k) {
    engine.snd(host, 'fall');
    return;
  }
  const want = wantOf(host.cfg, k);
  if (want === 'seal') close(host, k);
  else fail(host, k, failKind(stationOf(host.cfg, k), want));
}

// ─── pods ────────────────────────────────────────

function spawn(host) {
  const c = host.cfg;
  const src = c.caps[host.capI % c.caps.length] || C({});
  let item = host.item;
  if (!needTerm(host) && host.fill.length) {
    item = host.fill[host.fillAt % host.fill.length];
    host.fillAt++;
  }
  host.caps.push({
    id: host.nid++,
    item,
    token: Boolean(src.token),
    quota: Boolean(src.quota),
    cached: Boolean(src.cached),
    body: Boolean(src.body),
    user: Boolean(src.user),
    y: TOP - 40,
    at: 0,
    wait: false,
    dead: false,
    closed: false,
    hang: 0,
    wrong: 0,
    aided: false,
    picked: false,
    bump: 0,
    trail: [],
  });
  host.capI++;
  // The Italian tag is the presentation (mastery stage 0 -> 1).
  item.introduce();
  engine.snd(host, 'click', { hz: 700, v: 0.08 });
}

// ─── update ──────────────────────────────────────

function update(host, dt) {
  host.t += dt;
  const c = host.cfg;
  if (!c) return;
  const m = host.motion || 1;

  if (host.flash > 0) host.flash -= dt * 3;
  if (host.shake > 0) host.shake -= dt * 3.4;
  if (host.pulse > 0) host.pulse -= dt;
  for (let i = 0; i < host.lit.length; i++) if (host.lit[i] > 0) host.lit[i] -= dt;

  if (!host.finished) {
    host.spawnT -= dt;
    const n = live(host).length;
    if (host.spawnT <= 0 && n < 2 && (host.made + n < host.needed || needTerm(host))) {
      spawn(host);
      host.spawnT = c.speed * 0.8;
    }
  }

  for (const k of host.caps) {
    if (k.dead) continue;
    if (k.bump > 0) k.bump -= dt * 4;
    const ty = stY(c.chain.length, Math.min(k.at, c.chain.length - 1));
    if (k.wait) {
      k.hang += dt;
      if (k.hang > c.speed * HANG_X && fail(host, k, 'hang')) return;
      continue;
    }
    if (k.at >= c.chain.length) {
      if (fail(host, k, 'hang')) return;
      continue;
    }
    k.y += (ty - k.y) * Math.min(1, dt * 3.2 * m) + 18 * m * dt;
    if (!host.reduceMotion) {
      k.trail.push(k.y);
      if (k.trail.length > 10) k.trail.shift();
    }
    if (Math.abs(k.y - ty) < 6) {
      k.wait = true;
      k.hang = 0;
      k.trail = [];
      engine.snd(host, 'click', { hz: 900, v: 0.1 });
    }
  }
  host.caps = host.caps.filter((k) => !k.dead);
  host.parts = engine.parts(host.parts, dt, 380);
}

// ─── input: tap a valve or the seal ──────────────

function tap(host, p) {
  if (host.finished) return;
  const i = valveAt(p, host.menu.length);
  if (i >= 0) {
    pressValve(host, i);
    return;
  }
  if (sealHit(p)) {
    pressSeal(host);
    return;
  }
  engine.snd(host, 'fall');
}

/**
 * The same game with no pointer: ← → walk the row of valves and the seal,
 * space / Enter press what is selected, 1-4 press a valve, 0 or ↓ the seal,
 * ↑ goes back to the first valve.
 */
function key(host, e) {
  if (host.finished) return;
  host.kbUsed = true;
  const n = host.menu.length;
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();
    const step = e.key === 'ArrowLeft' ? -1 : 1;
    host.sel = host.sel < 0 ? (step < 0 ? n : 0) : (host.sel + step + n + 1) % (n + 1);
    engine.snd(host, 'click', { hz: 1400, v: 0.1 });
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    host.sel = n;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    host.sel = 0;
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    if (host.sel >= 0 && host.sel < n) pressValve(host, host.sel);
    else if (host.sel === n) pressSeal(host);
  } else if (/^[1-4]$/.test(e.key)) {
    const i = parseInt(e.key, 10) - 1;
    if (i < n) {
      host.sel = i;
      pressValve(host, i);
    }
  } else if (e.key === '0') {
    host.sel = n;
    pressSeal(host);
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
    id: 'nodejs-l9-catena',
    surface: 'nodejs',
    level: 8,
    band: 2,
    register: 'R9',
    title: 'La catena di controllo',
    titleEn: 'The chain of checks',
    levelLabel: 'Node.js · L9 Middleware / Node.js · L9 Middleware',
    font: '700 16px "Raleway"',
  },
  W,
  H,
  CH,
  drone: { freq: 42, type: 'sawtooth', volume: 0.015, lowpass: 120 },
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

export { valvePos, SEAL };
