/* eslint-disable no-use-before-define -- WIP checkpoint 2026-09-14: new games moved to the Godot app, this web port is frozen as-is */
/**
 * IL CONDOTTO — Node.js L13 «Stream e Buffer» (js/topics/data/nodejs.js,
 * level 12: 4 lessons × 10 terms = 40), played in 8 chapters × 5 beats, one
 * term per beat (LevelBeats spine, DOCTRINE §46.5).
 *
 * Port of knowledge-aio-giochi/templates/nodejs-l13-condotto (design sheet in
 * its header) with the vocabulary spine of the brief and the R1 register.
 *
 * SCHEDA DI PROGETTO (ricerca/00 §0.3) + SCHEDA VISIVA (ricerca/42 §42.3)
 * GIOCO ...... Il condotto
 * LIVELLO .... Node.js, L13 Stream e Buffer, banda 3 — 8 capitoli, 40 beat
 * CONCETTO ... I dati arrivano a pezzi. Ogni chunk chiede, in italiano, dove
 *              vuole essere scritto; ogni Writable porta sulla bocca un
 *              termine inglese. Se chi riceve è più lento di chi manda,
 *              qualcuno deve rallentare — e quel qualcuno sta a monte.
 * FORMA ...... accumulo               VERBO ... deviare (lo scambio è tuo,
 *                                                il flusso no)
 * ARCHETIPO .. ricerca/12 endless runner, in forma di diagramma
 * VINCI SE ... consegni i chunk richiesti senza perderne, e il termine del
 *              beat è stato scritto nel Writable giusto
 * PERDI SE ... tre chunk cadono: la coda ha riempito il tronco e nessuno ha
 *              fermato la sorgente — il beat ricomincia
 * SBAGLI ..... 1 il Writable sbagliato rifiuta il chunk: si ferma alla bocca,
 *                torna su di fianco alla corsia e la coda nel tronco sale
 *              2 alla seconda sullo stesso chunk, il Writable giusto pulsa
 *              3 pannello di coaching: cosa hai deviato, cosa chiedeva il
 *                chunk, la regola con il termine inglese
 * CAPITOLI ... 1 il primo scambio · 2 due destinazioni · 3 FRATTURA write()
 *              torna false · 4 il freno a monte · 5 highWaterMark
 *              6 tre destinazioni · 7 portata piena · 8 il condotto intero
 * MONDO ...... nessuno: un diagramma giocabile. Readable, tronco, scambio,
 *              corsie, Writable, drain, orizzonte. Terminologia vera stampata
 *              sugli oggetti.
 * REGISTRO ... R1 Fosforo vettoriale — nero assoluto, bianco, ciano, verde,
 *              giallo, fosforo spento · figura: il chunk, un esagono aperto ·
 *              suolo: l'orizzonte in cui scaricano i drain · movimento:
 *              inerzia e rotazione, ciò che cade si frammenta · carattere:
 *              JetBrains Mono per ogni cifra dentro il vetro
 * NUMERI ..... chunk 16-22k, cap 100k, hwm 30-88k, drain 2-9 k/s, tronco 4
 *              chunk, discesa 95 px/s, ritmo 2,2→1,05 s, rifiuto 0,8 s +
 *              risalita 190 px/s + attesa allo scambio 1,2 s
 * TEST 1 ..... i Writable sono identici: cambia solo il termine sulla bocca,
 *              e il suo posto è casuale a ogni beat. Si vince solo leggendo
 *              il chunk e trovando il termine.
 * TEST 2 ..... "Leggo cosa chiede il chunk, giro lo scambio sul Writable col
 *              termine inglese giusto, e se quello dice no fermo la sorgente"
 * TEST 3 ..... il primo chunk si forma alla bocca del Readable e scende da
 *              solo: lo scambio è già puntato, basta leggere
 *
 * DEVIAZIONI DAL TEMPLATE (deliberate, per la firma dell'orchestratore)
 *   1 corsie: mai meno di due (il template ne aveva una nel cap. 1). Con una
 *     corsia sola non c'è scelta significato → termine da valutare (brief
 *     §2.2), quindi i cinque beat del cap. 1 hanno due Writable con lo stesso
 *     drain: la sola differenza è il termine.
 *   2 la corsia giusta è dettata dal termine del chunk, non dal drain. Il
 *     Writable sbagliato rifiuta il chunk (write() torna false), che risale e
 *     si ripresenta allo scambio; il template lo avrebbe accettato. Il coach
 *     «slow» del template («hai mandato dove drena più piano») insegna ora il
 *     freno a monte: scatta quando un chunk si ferma sopra la highWaterMark
 *     mentre la sorgente scorre in un capitolo write(), non nei capitoli
 *     pipe() dove il freno è automatico.
 *   3 la scala degli errori è per chunk (brief §2.5): 1 rifiuto e tonfo,
 *     2 il Writable giusto pulsa, 3 il coach «wrong» con il termine.
 *   4 tre chunk caduti: il template apriva il coach e lasciava correre il
 *     contatore; qui il beat ricomincia con il coach aperto, come dice la
 *     scheda («PERDI SE tre chunk cadono»).
 *   5 un chunk fermo alla bocca riparte quando fill + size ≤ hwm, non quando
 *     fill ≤ hwm: nel template ripartiva e si rifermava a ogni frame con un
 *     tonfo, finché il livello non scendeva davvero.
 *   6 il prossimo chunk si forma alla bocca del Readable, con il significato
 *     già leggibile (ricerca/12 §12.7): la lettura non è un test di riflessi.
 *   7 il beat si vince solo quando il termine del beat è stato consegnato nel
 *     suo Writable, oltre ai chunk richiesti (§46.5).
 *   Nessun'altra: la schermata «done» scatta subito come nel template.
 */

import * as engine from '../KaioEngine.js';
import { ttsService } from '../../services/TTSService.js';
import { beatItems, beatLesson, fillers, labelOf, meaningOf } from '../LevelBeats.js';
import {
  W,
  H,
  JY,
  LANEY,
  SINKY,
  LX,
  CKH,
  GAP,
  TRUNKMAX,
  V,
  RISE,
  REJECT_HOLD,
  RETRY_HOLD,
  SPAWN_Y,
  HIT_SRC_Y,
  HIT_LANE,
  activeLanes,
} from '../parts/nodejs-l13-condotto/layout.js';
import { drawScene, PAL } from '../parts/nodejs-l13-condotto/draw.js';

const MODE = 'condotto';

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

/* Beat: lanes, rhythm of the source, capacity / highWaterMark / drain per
   lane, chunks to deliver, size of a chunk, and who holds the brake (pipe()
   auto or write() manual). Every beat has at least two lanes: with one there
   is no meaning → term choice to grade (brief §2.2). */
const B = (o) => ({
  lanes: 2,
  rate: 1.7,
  size: 16,
  cap: [100, 100, 100],
  hwm: [70, 70, 70],
  drain: [9, 4, 6],
  target: 7,
  auto: false,
  ...o,
});

const CH = [
  {
    t: ['Il primo scambio', 'The first switch'],
    titles: [
      ['Il primo chunk', 'The first chunk'],
      ['Arrivano a pezzi', 'They arrive in pieces'],
      ['La vasca si riempie', 'The tank fills'],
      ['Si svuota da sola', 'It drains by itself'],
      ['Ritmo', 'Rhythm'],
    ],
    // Deviation 1 (header): two lanes with one drain, where the template had one.
    beats: [
      B({ lanes: 2, rate: 2.2, target: 4, drain: [9, 9, 9], auto: true }),
      B({ lanes: 2, rate: 2, target: 5, drain: [8, 8, 8], auto: true }),
      B({ lanes: 2, rate: 1.8, target: 6, drain: [6, 6, 6], auto: true }),
      B({ lanes: 2, rate: 1.7, target: 6, drain: [5, 5, 5], auto: true }),
      B({ lanes: 2, rate: 1.6, target: 7, drain: [6, 6, 6], auto: true }),
    ],
  },
  {
    t: ['Due destinazioni', 'Two destinations'],
    titles: [
      ['Lo scambio', 'The switch'],
      ['Uno è più lento', 'One is slower'],
      ['Leggi il drain', 'Read the drain'],
      ['Alterna', 'Alternate'],
      ['A occhio', 'At a glance'],
    ],
    beats: [
      B({ lanes: 2, rate: 1.9, target: 6, drain: [9, 4, 4], auto: true }),
      B({ lanes: 2, rate: 1.8, target: 7, drain: [9, 3, 3], auto: true }),
      B({ lanes: 2, rate: 1.7, target: 7, drain: [8, 4, 4], auto: true }),
      B({ lanes: 2, rate: 1.5, target: 8, drain: [7, 5, 5], auto: true }),
      B({ lanes: 2, rate: 1.7, target: 7, drain: [8, 4, 4], auto: true }),
    ],
  },
  {
    t: ['write() torna false', 'write() returns false'],
    titles: [
      ['La bocca chiusa', 'The closed mouth'],
      ['La coda sale', 'The queue rises'],
      ['Insisti e cade', 'Insist and it drops'],
      ['Il tronco pieno', 'The trunk full'],
      ['Adesso lo sai', 'Now you know'],
    ],
    beats: [
      B({ lanes: 2, rate: 1.6, target: 7, drain: [8, 3, 3], auto: false }),
      B({ lanes: 2, rate: 1.5, target: 8, drain: [7, 3, 3], auto: false }),
      B({ lanes: 2, rate: 1.4, target: 8, drain: [6, 3, 3], auto: false }),
      B({ lanes: 2, rate: 1.3, target: 9, drain: [6, 3, 3], auto: false }),
      B({ lanes: 2, rate: 1.5, target: 8, drain: [7, 4, 4], auto: false }),
    ],
  },
  {
    t: ['Il freno a monte', 'The brake upstream'],
    titles: [
      ['pause()', 'pause()'],
      ['Aspetta il drain', 'Wait for drain'],
      ['resume()', 'resume()'],
      ['Due freni', 'Two brakes'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ lanes: 2, rate: 1.4, target: 8, drain: [6, 3, 3], auto: false }),
      B({ lanes: 2, rate: 1.3, target: 9, drain: [5, 3, 3], auto: false }),
      B({ lanes: 2, rate: 1.3, target: 9, drain: [5, 4, 4], auto: false }),
      B({ lanes: 2, rate: 1.2, target: 10, drain: [5, 3, 3], auto: false }),
      B({ lanes: 2, rate: 1.4, target: 9, drain: [6, 4, 4], auto: false }),
    ],
  },
  {
    t: ['highWaterMark', 'highWaterMark'],
    titles: [
      ['La linea, non il fondo', 'The line, not the bottom'],
      ['Soglia bassa', 'Low threshold'],
      ['Soglie diverse', 'Different thresholds'],
      ['Il più vuoto non basta', 'Emptiest is not enough'],
      ['La linea giusta', 'The right line'],
    ],
    beats: [
      B({ lanes: 2, rate: 1.5, target: 8, hwm: [40, 70, 70], drain: [9, 4, 4], auto: false }),
      B({ lanes: 2, rate: 1.4, target: 8, hwm: [32, 70, 70], drain: [9, 4, 4], auto: false }),
      B({ lanes: 2, rate: 1.4, target: 9, hwm: [36, 84, 84], drain: [9, 3, 3], auto: false }),
      B({ lanes: 2, rate: 1.3, target: 9, hwm: [30, 88, 88], drain: [9, 3, 3], auto: false }),
      B({ lanes: 2, rate: 1.4, target: 9, hwm: [38, 76, 76], drain: [8, 4, 4], auto: false }),
    ],
  },
  {
    t: ['Tre destinazioni', 'Three destinations'],
    titles: [
      ['La terza corsia', 'The third lane'],
      ['Tre velocità', 'Three speeds'],
      ['Il centro è lento', 'The middle is slow'],
      ['Tutte e tre', 'All three'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ lanes: 3, rate: 1.5, target: 9, drain: [8, 3, 6], auto: false }),
      B({ lanes: 3, rate: 1.4, target: 10, drain: [9, 3, 5], auto: false }),
      B({ lanes: 3, rate: 1.3, target: 10, drain: [8, 2, 7], hwm: [70, 50, 70], auto: false }),
      B({ lanes: 3, rate: 1.2, target: 11, drain: [7, 3, 6], hwm: [64, 44, 80], auto: false }),
      B({ lanes: 3, rate: 1.4, target: 10, drain: [8, 4, 6], auto: false }),
    ],
  },
  {
    t: ['Portata piena', 'Full throughput'],
    titles: [
      ['Più veloce', 'Faster'],
      ['Chunk grossi', 'Big chunks'],
      ['Poco margine', 'Little margin'],
      ['Il picco', 'The peak'],
      ['Automatico', 'Automatic'],
    ],
    beats: [
      B({ lanes: 3, rate: 1.2, target: 11, drain: [8, 4, 6], auto: false }),
      B({ lanes: 3, rate: 1.2, size: 22, target: 11, drain: [9, 5, 7], auto: false }),
      B({
        lanes: 3,
        rate: 1.1,
        size: 20,
        target: 12,
        hwm: [60, 48, 68],
        drain: [8, 4, 6],
        auto: false,
      }),
      B({
        lanes: 3,
        rate: 1.05,
        size: 22,
        target: 13,
        hwm: [56, 44, 64],
        drain: [8, 4, 7],
        auto: false,
      }),
      B({ lanes: 3, rate: 1.3, size: 18, target: 11, drain: [9, 5, 7], auto: false }),
    ],
  },
  {
    t: ['Il condotto intero', 'The whole conduit'],
    titles: [
      ['Tutto insieme', 'All together'],
      ['Senza rete', 'No net'],
      ['La prova', 'The test'],
      ['Il picco', 'The peak'],
      ['Chiusura', 'Closing'],
    ],
    beats: [
      B({
        lanes: 3,
        rate: 1.2,
        size: 18,
        target: 12,
        hwm: [62, 46, 72],
        drain: [8, 3, 6],
        auto: false,
      }),
      B({
        lanes: 3,
        rate: 1.15,
        size: 20,
        target: 12,
        hwm: [58, 44, 68],
        drain: [8, 3, 6],
        auto: false,
      }),
      B({
        lanes: 3,
        rate: 1.1,
        size: 20,
        target: 13,
        hwm: [54, 42, 64],
        drain: [7, 3, 6],
        auto: false,
      }),
      B({
        lanes: 3,
        rate: 1.05,
        size: 22,
        target: 14,
        hwm: [52, 40, 60],
        drain: [7, 3, 5],
        auto: false,
      }),
      B({
        lanes: 3,
        rate: 1.3,
        size: 18,
        target: 12,
        hwm: [64, 48, 74],
        drain: [9, 4, 7],
        auto: false,
      }),
    ],
  },
];

const TX = {
  it: {
    wrong: [
      'Hai deviato il chunk nel Writable sbagliato.',
      'Il chunk chiedeva «{it}», ma sulla bocca del Writable c’era scritto «{pick}».',
      'Sul chunk c’è il significato, sul Writable il termine: «{it}» si scrive in «{word}».',
    ],
    drop: [
      'Tre chunk sono caduti fuori dal condotto.',
      'Il Writable aveva già detto no e la sorgente ha continuato a mandare.',
      'write() che torna false non è un consiglio: è uno stop. Ferma il Readable finché «{word}» non drena.',
    ],
    slow: [
      'Hai continuato a mandare verso un Writable pieno.',
      'Il chunk «{it}» si è fermato alla bocca di «{word}», sopra la highWaterMark, e la coda è salita nel tronco.',
      'Il freno sta a monte: quando «{word}» dice no, pause() sul Readable e aspetta il drain.',
    ],
    hint: 'chunk → scambio sul Writable col termine giusto → drain · tastiera: ← → scambio, 1-3 Writable, spazio pause() / resume()',
    eyebrow: 'Flusso chiuso',
  },
  en: {
    wrong: [
      'You switched the chunk into the wrong Writable.',
      'The chunk asked for "{it}", but the mouth of the Writable read "{pick}".',
      'The chunk carries the meaning, the Writable carries the term: "{it}" is written into "{word}".',
    ],
    drop: [
      'Three chunks fell out of the conduit.',
      'The Writable had already said no and the source kept sending.',
      'write() returning false is not advice: it is a stop. Hold the Readable until "{word}" drains.',
    ],
    slow: [
      'You kept sending toward a full Writable.',
      'The chunk "{it}" stopped at the mouth of "{word}", above the highWaterMark, and the queue rose in the trunk.',
      'The brake is upstream: when "{word}" says no, pause() the Readable and wait for drain.',
    ],
    hint: 'chunk → switch to the Writable with the right term → drain · keyboard: ← → switch, 1-3 Writable, space pause() / resume()',
    eyebrow: 'Stream closed',
  },
};

// ─── helpers ─────────────────────────────────────

/* The template's `freno` knob: pipe() holds the brake, write() hands it to
   the player, otherwise the chapter decides. */
function freno(host) {
  const f = (host.props || {}).freno;
  if (f === 'pipe()') return true;
  if (f === 'write()') return false;
  return Boolean(host.cfg.auto);
}

/* ricerca/35 §35.3.1: a term written is a term heard. */
function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

function lane(host) {
  return host.act[host.li];
}

/** The needle's rest angle for the active lane `i` (0 points straight down). */
function angleFor(host, i) {
  const l = host.act[i];
  return Math.atan2(LANEY + 8 - JY, LX[l] - LX[1]) - Math.PI / 2;
}

function held(host) {
  return host.auto ? host.autoHold : host.srcPaused;
}

// ─── the error ladder (ricerca/00 passo 6) ───────

function openCoach(host, kind, pick, wanted) {
  host.coachKind = kind;
  host.setState({
    coach: { kind, pick: pick || '', word: labelOf(wanted), it: meaningOf(wanted, 'it') },
  });
}

/**
 * The wrong Writable says no: the chunk stops at the mouth (1st), the right
 * Writable pulses (2nd, the chunk is now aided), the coach opens (3rd).
 */
function refuse(host, k) {
  k.wrong++;
  k.reject = REJECT_HOLD;
  host.shakeAmt = 0.35;
  engine.snd(host, 'thud', { v: 0.2 });
  if (k.wrong >= 2) {
    k.aided = true;
    host.pulse = 1;
    host.pulseL = host.act[k.mi];
  }
  if (k.wrong >= 3) {
    openCoach(host, 'wrong', labelOf(host.menu[k.pick]), host.menu[k.mi]);
    k.wrong = 0;
  }
}

/**
 * The right Writable is above its mark: the chunk stalls (write() returned
 * false). If the source was still flowing and the brake is the player's, the
 * Readable pulses; once per beat, from the third beat on, the coach explains.
 */
function stallAt(host, k) {
  k.stall = true;
  engine.snd(host, 'thud', { v: 0.16 });
  if (host.auto || held(host)) return;
  host.srcPulse = 1;
  if (!host.taught && !host.state.coach && host.state.beat >= 2) {
    host.taught = true;
    openCoach(host, 'slow', '', host.menu[k.mi]);
  }
}

// ─── the chunks ──────────────────────────────────

/**
 * The beat's own term must be written right once (§46.5). While it has not,
 * and no chunk in the conduit carries it, the next chunk to form does.
 */
function needTerm(host) {
  if (host.termOk || host.termIdx < 0) return false;
  return !host.chunks.some((k) => k.mi === host.termIdx);
}

function pickNext(host) {
  if (needTerm(host)) return host.termIdx;
  return Math.floor(Math.random() * host.menu.length);
}

/** The next chunk forms at the mouth of the source: its meaning is visible. */
function form(host) {
  host.nextMi = pickNext(host);
  host.nextItem = host.menu[host.nextMi] || null;
  if (host.nextItem) host.nextItem.introduce();
}

function spawn(host) {
  host.chunks.push({
    id: host.nid++,
    y: SPAWN_Y,
    lane: -1,
    mi: host.nextMi,
    pick: -1,
    size: host.cfg.size,
    ok: false,
    stall: false,
    reject: 0,
    rising: false,
    hold: 0,
    wrong: 0,
    aided: false,
  });
  host.spawned++;
  form(host);
}

/**
 * A chunk that falls is not a graded response: it never reached the switch.
 * It breaks into pieces; three of them and the beat starts over with the
 * coach open (deviation 4).
 */
function drop(host) {
  host.dropped++;
  host.shakeAmt = 1;
  host.flash = 1;
  engine.burst(host, host.parts, LX[1], SPAWN_Y + 4, 14, PAL.bianco, { up: -40, v1: 120 });
  engine.snd(host, 'fall');
  host.setState({ drops: host.dropped });
  if (host.dropped >= 3) {
    if (!host.state.coach) openCoach(host, 'drop', '', host.item);
    const coachKind = host.coachKind;
    reset(host, host.state.beat);
    host.coachKind = coachKind;
    host.setState({ step: 0 });
  }
}

/**
 * The switch is the verb: the lane the needle points at is the learner's
 * pick, graded against the term the chunk asks for, through the SDK
 * (§46.1, §46.2).
 */
function grade(host, k) {
  const item = host.menu[k.mi];
  const pick = host.menu[host.li];
  const verdict = item.attempt(labelOf(pick), {
    expected: labelOf(item),
    mode: MODE,
    hintsUsed: k.aided ? 1 : 0,
    silent: true,
  });
  host.session.mark();
  k.pick = host.li;
  k.ok = Boolean(verdict.correct);
}

function win(host) {
  for (const m of host.menu) if (m.correct > 0) m.clear();
  host.finished = true;
  engine.snd(host, 'chime');
  persist(host);
  // As in the template: the last chunk lands, the done screen is immediate.
  host.setState({ done: true });
}

function deliver(host, k) {
  host.fill[k.lane] += k.size;
  host.delivered++;
  if (k.mi === host.termIdx) host.termOk = true;
  engine.burst(host, host.parts, LX[k.lane], SINKY + 8, 9, PAL.verde, { up: 10, v1: 90 });
  engine.snd(host, 'tone', { from: 440 + host.delivered * 14, to: 660, v: 0.1 });
  say(host, labelOf(host.menu[k.mi]));
  host.setState({ step: host.delivered });
  if (host.delivered >= host.cfg.target && host.termOk) win(host);
}

/** A chunk is blocked by the chunk below it in the same column. */
function blocked(host, k, i) {
  for (let j = 0; j < host.chunks.length; j++) {
    const o = host.chunks[j];
    if (j === i || o.rising || o.y <= k.y) continue;
    if (o.lane === k.lane && o.y - k.y < GAP) return true;
  }
  return false;
}

/** A refused chunk re-enters at the switch: the queue above it rises. */
function reflow(host, k) {
  const above = host.chunks
    .filter((o) => o !== k && o.lane < 0 && !o.rising)
    .sort((a, b) => b.y - a.y);
  let prev = k.y;
  for (const o of above) {
    if (o.y > prev - GAP) o.y = prev - GAP;
    prev = o.y;
  }
}

// ─── lifecycle ───────────────────────────────────

function init(host) {
  host.parts = [];
  host.chunks = [];
  host.terms = [];
  host.item = null;
  host.menu = [];
  host.act = [1];
  host.li = 0;
  host.fill = [0, 0, 0];
  host.termIdx = -1;
  host.termOk = false;
  host.lesson = null;
  host.chapter = 0;
  host.t = 0;
  host.tSpent = 0;
  host.delivered = 0;
  host.dropped = 0;
  host.nextMi = -1;
  host.nextItem = null;
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
  host.beat = beat;
  if (host.state) host.state.beat = beat;
  const ci = installedChapter(host);
  host.chapter = ci;
  host.auto = freno(host);

  // The spine: this beat's term, its lesson, and the terms on the Writable
  // mouths — the term plus real neighbours of the same lesson, shuffled.
  host.terms = beatItems(host.session, ci, beat);
  host.item = host.terms[0] || null;
  host.lesson = beatLesson(host.session, ci, beat);
  let act = activeLanes(cfg.lanes);
  const extra = host.item ? fillers(host.session, host.item, act.length - host.terms.length) : [];
  host.menu = shuffle(host.terms.concat(extra)).slice(0, act.length);
  if (host.menu.length < act.length) act = activeLanes(host.menu.length);
  host.act = act;
  host.li = Math.floor(act.length / 2);
  host.termIdx = host.menu.indexOf(host.item);
  host.termOk = false;

  host.fill = [0, 0, 0];
  host.chunks = [];
  host.parts = [];
  host.spawnT = 0.7;
  host.delivered = 0;
  host.dropped = 0;
  host.spawned = 0;
  host.srcPaused = false;
  host.autoHold = false;
  host.shakeAmt = 0;
  host.flash = 0;
  host.pulse = 0;
  host.pulseL = -1;
  host.srcPulse = 0;
  host.taught = false;
  host.tSpent = 0;
  host.t = 0;
  host.swAng = angleFor(host, host.li);
  host.srcRot = 0;
  host.nid = 0;
  host.kbUsed = false;
  host.finished = false;
  host.coachKind = null;
  // Reduced motion: descent, rise and the needle run at 0.7× (§15.4).
  host.motion = host.reduceMotion ? 0.7 : 1;
  form(host);
  if (host.state.drops) host.setState({ drops: 0 });
  host.session.mode = MODE;
  host.session.mark();
}

// ─── update ──────────────────────────────────────

function update(host, dt) {
  host.t += dt;
  const c = host.cfg;
  if (!c) return;
  const m = host.motion || 1;
  host.tSpent += dt;
  if (host.shakeAmt > 0) host.shakeAmt = Math.max(0, host.shakeAmt - dt * 3.4);
  if (host.flash > 0) host.flash = Math.max(0, host.flash - dt * 2.6);
  if (host.pulse > 0) host.pulse = Math.max(0, host.pulse - dt * 1.6);
  if (host.srcPulse > 0) host.srcPulse = Math.max(0, host.srcPulse - dt * 1.2);
  for (let i = 0; i < 3; i++) host.fill[i] = Math.max(0, host.fill[i] - c.drain[i] * dt);

  // The needle turns with inertia; the source spins while it flows.
  const target = angleFor(host, host.li);
  host.swAng += (target - host.swAng) * Math.min(1, dt * 12 * m);

  const trunk = host.chunks.filter((k) => k.lane < 0 && !k.rising).length;
  if (host.auto) {
    if (trunk >= TRUNKMAX - 1) host.autoHold = true;
    else if (trunk <= 1) host.autoHold = false;
  }
  const isHeld = held(host);
  if (!isHeld && !host.reduceMotion) host.srcRot += dt * 1.4;

  if (!isHeld && !host.finished) {
    host.spawnT -= dt;
    if (host.spawnT <= 0) {
      host.spawnT = c.rate;
      if (trunk >= TRUNKMAX) {
        drop(host);
        if (host.dropped === 0) return; // the beat restarted
      } else spawn(host);
    }
  }

  for (let i = 0; i < host.chunks.length; i++) {
    const k = host.chunks[i];
    if (k.reject > 0) {
      k.reject -= dt;
      if (k.reject <= 0) {
        k.reject = 0;
        k.rising = true;
      }
      continue;
    }
    if (k.rising) {
      k.y -= RISE * m * dt;
      if (k.y <= JY) {
        k.rising = false;
        k.lane = -1;
        k.y = JY - 2;
        k.hold = RETRY_HOLD;
        reflow(host, k);
        engine.snd(host, 'pop', { hz: 300, v: 0.1 });
      }
      continue;
    }
    if (k.stall) {
      // Deviation 5: it moves again only when it fits under the mark.
      if (host.fill[k.lane] + k.size <= c.hwm[k.lane]) {
        k.stall = false;
        engine.snd(host, 'pop', { hz: 520, v: 0.12 });
      }
      continue;
    }
    if (k.hold > 0) {
      k.hold -= dt;
      continue;
    }
    if (blocked(host, k, i)) continue;
    k.y += V * m * dt;
    if (k.lane < 0 && k.y >= JY) {
      k.lane = lane(host);
      k.y = JY;
      grade(host, k);
      engine.snd(host, 'click', { hz: 1400, v: 0.18 });
    }
    if (k.lane >= 0 && k.y >= SINKY - CKH / 2) {
      k.y = SINKY - CKH / 2;
      if (!k.ok) refuse(host, k);
      else if (host.fill[k.lane] + k.size > c.hwm[k.lane]) stallAt(host, k);
      else {
        host.chunks.splice(i--, 1);
        deliver(host, k);
        if (host.finished) break;
      }
    }
  }
  host.parts = engine.parts(host.parts, dt, 300);
}

// ─── input: the switch and the brake ─────────────

function move(host, step) {
  const n = Math.max(0, Math.min(host.act.length - 1, host.li + step));
  if (n === host.li) return;
  host.li = n;
  engine.snd(host, 'click', { hz: 2100, v: 0.3 });
}

function setLane(host, i) {
  if (i < 0 || i >= host.act.length) return;
  move(host, i - host.li);
}

/** pause() / resume() on the Readable — only where the brake is the player's. */
function brake(host) {
  if (host.auto) return;
  host.srcPaused = !host.srcPaused;
  engine.snd(host, host.srcPaused ? 'thud' : 'pop', { v: 0.2, hz: 380 });
}

function tap(host, p) {
  if (host.finished) return;
  if (p.y < HIT_SRC_Y) {
    brake(host);
    return;
  }
  let best = -1;
  let bd = 1e9;
  host.act.forEach((l, i) => {
    const d = Math.abs(LX[l] - p.x);
    if (d < bd) {
      bd = d;
      best = i;
    }
  });
  if (bd < HIT_LANE) setLane(host, best);
}

function swipe(host, d) {
  if (host.finished) return;
  if (d === 'left') move(host, -1);
  else if (d === 'right') move(host, 1);
}

/** The same game with no pointer: ← → turn the switch, 1-3 pick a Writable,
 *  space pauses and resumes the Readable. */
function key(host, e) {
  if (host.finished) return;
  const k = e.key;
  const eat = () => {
    if (typeof e.preventDefault === 'function') e.preventDefault();
  };
  if (k === 'ArrowLeft' || k === 'a' || k === 'A') {
    eat();
    host.kbUsed = true;
    move(host, -1);
  } else if (k === 'ArrowRight' || k === 'd' || k === 'D') {
    eat();
    host.kbUsed = true;
    move(host, 1);
  } else if (k === ' ') {
    eat();
    host.kbUsed = true;
    brake(host);
  } else if (/^[1-3]$/.test(k)) {
    host.kbUsed = true;
    setLane(host, parseInt(k, 10) - 1);
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
      .replace(/\{pick\}/g, coach.pick || '')
      .replace(/\{word\}/g, coach.word || '')
      .replace(/\{it\}/g, coach.it || '');
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
  host.coachKind = null;
}

export default {
  meta: {
    id: 'nodejs-l13-condotto',
    surface: 'nodejs',
    level: 12,
    band: 3,
    register: 'R1',
    title: 'Il condotto',
    titleEn: 'The duct',
    levelLabel: 'Node.js · L13 Stream e Buffer / Node.js · L13 Streams & Buffers',
    font: '500 16px "JetBrains Mono"',
  },
  W,
  H,
  CH,
  drone: { freq: 52, type: 'sine', volume: 0.014, lowpass: 180 },
  init,
  reset,
  update,
  draw,
  tap,
  swipe,
  key,
  coachText,
  doneView,
  onCoachClose,
};
