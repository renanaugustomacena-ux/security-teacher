/**
 * LO SCARICO — Node.js L12 «Gestione Errori» (js/topics/data/nodejs.js,
 * level 11: 4 lessons × 10 terms = 40), climbed in 8 chapters × 5 beats, one
 * term per beat (LevelBeats spine, DOCTRINE §46.5).
 *
 * Port of knowledge-aio-giochi/templates/nodejs-l12-scarico (design sheet in
 * its header) with the vocabulary spine of the brief and the R5 register.
 *
 * SCHEDA DI PROGETTO (ricerca/00 §0.3) + SCHEDA VISIVA (ricerca/42 §42.3)
 * GIOCO ...... Lo scarico
 * LIVELLO .... Node.js, L12 Gestione Errori, banda 2 — 8 capitoli, 40 turni
 * CONCETTO ... Un errore che nessuno prende in mano non si ferma lì: sale di
 *              livello, e se arriva in cima spegne tutto. Ciò che sale è un
 *              significato (italiano, sull'etichetta del barile); ciò che lo
 *              tiene ha un nome inglese sul guanto.
 * FORMA ...... instradamento          VERBO ... afferrare al volo (col guanto giusto)
 * ARCHETIPO .. ricerca/11 slash, in forma di afferrare a due mani
 * VINCI SE ... il turno finisce col quadro ancora acceso (need prese)
 * PERDI SE ... tre errori arrivano in cima: il quadro salta, il turno ricomincia
 * SBAGLI ..... 1 il guanto sbagliato scivola: il barile gli passa attraverso e
 *                continua a salire, whoosh e scossa, nessun testo
 *              2 alla seconda sullo stesso barile, il guanto giusto pulsa
 *              3 pannello di coaching: cosa hai alzato, cosa diceva il barile,
 *                la regola con il termine inglese
 * CAPITOLI ... 1 afferrare · 2 due guanti · 3 FRATTURA l'asincrono passa
 *              attraverso · 4 rilanciare · 5 il guanto in cima · 6 finally
 *              7 a raffica · 8 il quadro intero
 * MONDO ...... una torre di travi e scale: quattro piani di trave rossa uniti
 *              da scale ciano, in cima il quadro elettrico con tre spie, in
 *              basso lo scarico da cui rotolano fuori i barili; sotto la
 *              torre la trave a cui pendono i guanti
 * REGISTRO ... R5 Travi e scale — trave rossa, scala ciano, barile bruno, blu,
 *              rosa, giallo su fondo nero · figura: il barile con l'etichetta
 *              e il guantone col pollice · suolo: i piani sovrapposti, la
 *              gravità è vera · movimento: rotola sulla trave, sale la scala
 *              a fotogrammi · carattere: monospazio da bitmap con ombra a 1 px
 * NUMERI ..... salita 3,4→1,9 s (mai sotto 1,8), spawn ogni 0,7×salita, due
 *              barili insieme al massimo, tre spie, guanti 2→5
 * TEST 1 ..... i barili sono tutti uguali: cambia solo l'etichetta. I guanti
 *              sono tutti uguali: cambia solo il termine, e il loro posto è
 *              casuale a ogni turno. Si vince solo leggendo l'etichetta e
 *              trovando il guanto col termine che la dice.
 * TEST 2 ..... "Afferro ogni barile col guanto che porta il suo termine, prima
 *              che arrivi in cima"
 * TEST 3 ..... un barile rotola fuori dallo scarico e un guanto pende sotto
 *
 * DEVIAZIONI DAL TEMPLATE (deliberate, per la firma dell'orchestratore)
 *   1 la tabella G (quale guanto tiene quale tipo) diventa identità di
 *     termine: un barile porta un significato, lo tiene solo il guanto col
 *     suo termine inglese. È la colonna vertebrale del brief (§2); i tipi
 *     sync/promise/await del template non sono termini del livello.
 *   2 guanti: mai meno di due (il template ne aveva uno in 1.1 e 5.1). Con un
 *     guanto solo non c'è scelta significato → termine da valutare (brief §2.2).
 *   3 il guanto «finally», che nel template non teneva niente e non contava
 *     come errore, non esiste: ogni cosa toccabile deve essere un termine
 *     vero del livello (brief §4.8). Il suo posto lo prende un distrattore
 *     della stessa lezione; il capitolo 6 tiene titoli e pomelli.
 *   4 il rilancio non cambia tipo (sync → uncaught) perché non c'è un guanto
 *     universale: il barile rilanciato torna in basso con la targhetta
 *     «rilanciato» e va ripreso con lo stesso guanto. La prima presa è già
 *     valutata corretta; la seconda è una seconda risposta vera.
 *   5 la scala degli errori è per barile (brief §2.5): 1 passa attraverso,
 *     2 il guanto giusto pulsa, 3 il coach. Lo streak del template resta per
 *     «top», che non ha una presa da contare.
 *   6 il turno si chiude quando le prese sono `need` E il termine del turno è
 *     stato preso: se il barile del termine arriva in cima, il prossimo a
 *     rotolare fuori è ancora lui, e lo scarico continua finché non è preso
 *     (§46.5). Nel template il conteggio bastava.
 *   7 tastiera (assente nel template, richiesta da §46.6): ← → ↑ ↓ scelgono
 *     il guanto, 1-5 lo alzano, spazio/Invio alzano quello scelto.
 *   Nessun'altra: la schermata «done» scatta subito come nel template, il
 *   quadro salta alla terza spia e il turno ricomincia da capo.
 */

import * as engine from '../KaioEngine.js';
import { ttsService } from '../../services/TTSService.js';
import { beatItems, beatLesson, fillers, labelOf, meaningOf } from '../LevelBeats.js';
import {
  W,
  H,
  HIT_GLOVE,
  barrelPos,
  glovePos,
  rowCol,
  rowsOf,
} from '../parts/nodejs-l12-scarico/layout.js';
import { drawScene } from '../parts/nodejs-l12-scarico/draw.js';

const MODE = 'scarico';
/** How often a caught barrel is rethrown where the chapter allows it. */
const RETHROW_ODDS = 0.4;

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

/* Beat: gloves (terms hanging under the tower, 2-5), kinds (how many of them
   also roll out as barrels), need (catches to win), rise (seconds from the
   chute to the panel, never under 1.8), rethrow (a caught barrel may come
   back). The template's glove lists and error lists, counted (header,
   deviations 1-3). */
const B = (o) => ({ gloves: 2, kinds: 1, need: 5, rise: 2.8, rethrow: false, ...o });

const CH = [
  {
    t: ['Afferrare', 'Catching'],
    titles: [
      ['Il primo errore', 'First error'],
      ['Ancora uno', 'One more'],
      ['Due che salgono', 'Two rising'],
      ['Più svelto', 'Quicker'],
      ['Il ritmo', 'The rhythm'],
    ],
    beats: [
      B({ gloves: 2, kinds: 1, need: 3, rise: 3.4 }),
      B({ gloves: 2, kinds: 2, need: 4, rise: 3.2 }),
      B({ gloves: 2, kinds: 2, need: 5, rise: 3.0 }),
      B({ gloves: 2, kinds: 2, need: 6, rise: 2.2 }),
      B({ gloves: 2, kinds: 2, need: 5, rise: 2.9 }),
    ],
  },
  {
    t: ['Due guanti', 'Two gloves'],
    titles: [
      ['Il guanto delle promesse', 'The promise glove'],
      ['Non quello', 'Not that one'],
      ['Due tipi', 'Two kinds'],
      ['Stretti', 'Tight'],
      ['A occhio', 'At a glance'],
    ],
    beats: [
      B({ gloves: 2, kinds: 2, need: 4, rise: 3.2 }),
      B({ gloves: 2, kinds: 2, need: 5, rise: 3.0 }),
      B({ gloves: 3, kinds: 3, need: 5, rise: 2.8 }),
      B({ gloves: 3, kinds: 3, need: 6, rise: 2.1 }),
      B({ gloves: 2, kinds: 2, need: 5, rise: 2.8 }),
    ],
  },
  {
    t: ["L'asincrono passa attraverso", 'Async passes through'],
    titles: [
      ['Sembra preso', 'Looks caught'],
      ['Passa attraverso', 'Passes through'],
      ['Serve await', 'await is needed'],
      ['Tre guanti', 'Three gloves'],
      ['Adesso lo sai', 'Now you know'],
    ],
    beats: [
      B({ gloves: 2, kinds: 2, need: 4, rise: 3.2 }),
      B({ gloves: 2, kinds: 2, need: 5, rise: 3.0 }),
      B({ gloves: 3, kinds: 3, need: 5, rise: 2.8 }),
      B({ gloves: 4, kinds: 4, need: 6, rise: 2.1 }),
      B({ gloves: 3, kinds: 3, need: 5, rise: 2.8 }),
    ],
  },
  {
    t: ['Rilanciare', 'Rethrowing'],
    titles: [
      ['Preso e rilanciato', 'Caught and rethrown'],
      ['Sale di nuovo', 'Rises again'],
      ['Due volte', 'Twice'],
      ['Chi lo prende dopo', 'Who catches next'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ rethrow: true, gloves: 2, kinds: 2, need: 4, rise: 3.2 }),
      B({ rethrow: true, gloves: 3, kinds: 3, need: 5, rise: 3.0 }),
      B({ rethrow: true, gloves: 3, kinds: 3, need: 5, rise: 2.8 }),
      B({ rethrow: true, gloves: 4, kinds: 4, need: 6, rise: 2.1 }),
      B({ rethrow: true, gloves: 3, kinds: 3, need: 5, rise: 2.8 }),
    ],
  },
  {
    t: ['Il guanto in cima', 'The glove at the top'],
    titles: [
      ['La rete finale', 'The final net'],
      ['Ultima presa', 'Last catch'],
      ['Non la prima scelta', 'Not the first choice'],
      ['Quattro guanti', 'Four gloves'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ gloves: 2, kinds: 1, need: 3, rise: 3.2 }),
      B({ gloves: 2, kinds: 2, need: 4, rise: 3.0 }),
      B({ gloves: 3, kinds: 3, need: 5, rise: 2.8 }),
      B({ gloves: 4, kinds: 4, need: 6, rise: 2.1 }),
      B({ gloves: 3, kinds: 3, need: 5, rise: 2.8 }),
    ],
  },
  {
    t: ['finally', 'finally'],
    titles: [
      ['Non ferma niente', 'It stops nothing'],
      ['Ripulisce', 'It cleans up'],
      ['Serve comunque', 'Still needed'],
      ['Con gli altri', 'With the others'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ gloves: 2, kinds: 2, need: 4, rise: 3.2 }),
      B({ gloves: 3, kinds: 2, need: 5, rise: 3.0 }),
      B({ gloves: 3, kinds: 2, need: 5, rise: 2.8 }),
      B({ gloves: 5, kinds: 4, need: 6, rise: 2.1 }),
      B({ gloves: 3, kinds: 3, need: 5, rise: 2.9 }),
    ],
  },
  {
    t: ['A raffica', 'In bursts'],
    titles: [
      ['Due in condotto', 'Two in the duct'],
      ['Meno tempo', 'Less time'],
      ['Sei errori', 'Six errors'],
      ['Il picco', 'The peak'],
      ['Automatico', 'Automatic'],
    ],
    beats: [
      B({ gloves: 4, kinds: 4, need: 6, rise: 2.3 }),
      B({ gloves: 4, kinds: 4, need: 7, rise: 2.1 }),
      B({ gloves: 5, kinds: 5, need: 7, rise: 2.0 }),
      B({ gloves: 5, kinds: 5, need: 8, rise: 1.9 }),
      B({ gloves: 4, kinds: 4, need: 6, rise: 2.4 }),
    ],
  },
  {
    t: ['Il quadro intero', 'The whole panel'],
    titles: [
      ['Tutto insieme', 'All together'],
      ['Senza rete', 'No net'],
      ['La prova', 'The test'],
      ['Il picco', 'The peak'],
      ['Chiusura', 'Closing'],
    ],
    beats: [
      B({ rethrow: true, gloves: 4, kinds: 4, need: 6, rise: 2.4 }),
      B({ rethrow: true, gloves: 5, kinds: 5, need: 7, rise: 2.2 }),
      B({ rethrow: true, gloves: 5, kinds: 5, need: 8, rise: 2.0 }),
      B({ rethrow: true, gloves: 5, kinds: 5, need: 9, rise: 1.9 }),
      B({ gloves: 4, kinds: 4, need: 6, rise: 2.6 }),
    ],
  },
];

const TX = {
  it: {
    through: [
      'Il guanto non lo ha tenuto: gli è passato attraverso.',
      'Sul barile c’era scritto «{it}», e tu hai alzato il guanto «{pick}»: un errore preso col guanto sbagliato non si ferma, continua a salire.',
      'Sul barile c’è il significato, sul guanto il termine: «{it}» si prende solo con «{word}».',
    ],
    top: [
      'Un errore è arrivato in cima.',
      'Nessuno lo ha preso lungo la salita: il quadro ha saltato.',
      'Chi non viene preso sale sempre di un piano: «{it}» va preso col guanto «{word}» prima dell’ultima scala.',
    ],
    hint: 'tocca il guanto col termine del barile che sale · tastiera: ← → ↑ ↓ guanto, 1-5 alza, spazio afferra',
    eyebrow: 'Quadro acceso',
  },
  en: {
    through: [
      'The glove did not hold it: it passed straight through.',
      'The barrel read "{it}", and you raised the "{pick}" glove: an error caught with the wrong glove does not stop, it keeps rising.',
      'The barrel carries the meaning, the glove carries the term: "{it}" is only caught with "{word}".',
    ],
    top: [
      'An error reached the top.',
      'Nobody caught it on the way up: the panel tripped.',
      'Whatever is not caught always rises one floor: "{it}" must be caught with the "{word}" glove before the last ladder.',
    ],
    hint: 'tap the glove with the rising barrel’s term · keyboard: ← → ↑ ↓ glove, 1-5 raise, space catch',
    eyebrow: 'Panel still on',
  },
};

// ─── the tower ───────────────────────────────────

function live(host) {
  return host.errs.filter((e) => !e.dead);
}

/** The barrel a raised glove goes for: the oldest one still climbing. */
function target(host) {
  return host.errs.find((e) => !e.dead && e.p < 1) || null;
}

/* ricerca/35 §35.3.1: a term caught is a term heard. */
function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

/** Every term of the beat has been caught at least once. */
function termsOk(host) {
  return host.terms.every((t) => host.caught.has(t));
}

/**
 * A term of the beat that still has to be caught and is not on the tower:
 * the next barrel out of the chute carries it (§46.5).
 */
function missingTerm(host) {
  const up = live(host);
  return host.terms.find((t) => !host.caught.has(t) && !up.some((e) => e.item === t)) || null;
}

// ─── the error ladder (ricerca/00 passo 6) ───────

function openCoach(host, kind, pick, wanted) {
  host.coachKind = kind;
  host.setState({
    coach: { kind, pick: pick || '', word: labelOf(wanted), it: meaningOf(wanted, 'it') },
  });
}

/** The template's streak, kept for the barrels that reach the top. */
function streak(host, kind, item) {
  const s = host.streak;
  if (s.kind === kind) s.n++;
  else {
    s.kind = kind;
    s.n = 1;
  }
  if (s.n === 2) {
    host.pulse = 0.9;
    const t = target(host);
    host.pulseG = t ? host.menu.indexOf(t.item) : -1;
  }
  if (s.n >= 3) {
    openCoach(host, kind, '', item || host.item);
    host.streak = { kind: null, n: 0 };
  }
}

// ─── barrels ─────────────────────────────────────

function spawn(host) {
  const c = host.cfg;
  let item = host.pool[host.ei % host.pool.length];
  const missing = missingTerm(host);
  if (missing) item = missing;
  host.errs.push({
    id: host.nid++,
    item,
    p: 0,
    dead: false,
    thru: 0,
    re: false,
    wob: Math.random() * 6.28,
    wrong: 0,
    aided: false,
  });
  host.ei++;
  host.spawnT = c.rise * 0.7;
  // The label rolls into view: the term is presented (mastery 0 → 1).
  item.introduce();
  engine.snd(host, 'click', { hz: 900, v: 0.12 });
}

/**
 * A barrel that reaches the panel is not a graded response — the learner
 * produced nothing. A light goes out; the third trips the panel and the
 * beat starts over (the coach the third may have opened stays open).
 */
function trip(host, e) {
  e.dead = true;
  host.zap = 1;
  host.shake = 0.9;
  engine.snd(host, 'crash');
  engine.burst(host, host.parts, W / 2, 130, 14, '#F9A8D4', { up: 60 });
  host.bad++;
  host.setState({ left: host.bad });
  streak(host, 'top', e.item);
  if (host.bad >= 3) {
    const coachKind = host.coachKind;
    // eslint-disable-next-line no-use-before-define
    reset(host, host.state.beat);
    host.coachKind = coachKind;
    host.setState({ step: 0, left: 0 });
    return true;
  }
  return false;
}

// ─── the verb: raise a glove ─────────────────────

function catchBarrel(host, e, gi) {
  const c = host.cfg;
  const pos = barrelPos(e.p, host.reduceMotion);
  if (c.rethrow && !e.re && Math.random() < RETHROW_ODDS) {
    // Caught and rethrown: back to the chute, same term, one more climb.
    e.re = true;
    e.p = 0.02;
    e.thru = 0;
    engine.snd(host, 'pop', { hz: 380, v: 0.14 });
    engine.burst(host, host.parts, pos.x, pos.y, 6, '#FACC15', { up: 40 });
    return;
  }
  e.dead = true;
  host.made++;
  host.flash = 1;
  host.streak = { kind: null, n: 0 };
  host.caught.add(e.item);
  e.item.clear();
  say(host, labelOf(e.item));
  engine.snd(host, 'click', { hz: 1500, v: 0.3 });
  engine.burst(host, host.parts, glovePos(gi, host.gloves).x, pos.y, 10, '#FACC15', { up: 80 });
  host.setState({ step: host.made });
  persist(host);
  if (host.made >= host.needed && termsOk(host)) {
    for (const t of host.terms) if (t.correct > 0) t.clear();
    host.finished = true;
    engine.snd(host, 'chime', { notes: [440, 587, 740] });
    // As in the template: the panel is still on, the done screen is immediate.
    host.setState({ done: true });
  }
}

/**
 * The pick is the graded response: the glove the learner raised against the
 * term the barrel carries, through the SDK (§46.1, §46.2). Wrong: the barrel
 * passes through and keeps climbing — 1st a shudder, 2nd the right glove
 * pulses, 3rd the coach.
 */
function grab(host, gi) {
  if (host.finished) return;
  const picked = host.menu[gi];
  if (!picked) return;
  host.lift = { gi, t: 0.25 };
  const e = target(host);
  if (!e) {
    engine.snd(host, 'fall');
    return;
  }
  const verdict = e.item.attempt(labelOf(picked), {
    expected: labelOf(e.item),
    mode: MODE,
    hintsUsed: e.aided ? 1 : 0,
    silent: true,
  });
  host.session.mark();
  if (verdict.correct) {
    catchBarrel(host, e, gi);
    return;
  }
  e.thru = 0.4;
  e.wrong++;
  host.shake = 0.4;
  engine.snd(host, 'whoosh');
  if (e.wrong >= 2) {
    e.aided = true;
    host.pulse = 0.9;
    host.pulseG = host.menu.indexOf(e.item);
  }
  if (e.wrong >= 3) {
    openCoach(host, 'through', labelOf(picked), e.item);
    e.wrong = 0;
  }
}

// ─── lifecycle ───────────────────────────────────

function init(host) {
  host.parts = [];
  host.errs = [];
  host.terms = [];
  host.item = null;
  host.menu = [];
  host.pool = [];
  host.gloves = 0;
  host.termIdx = -1;
  host.caught = new Set();
  host.lesson = null;
  host.chapter = 0;
  host.streak = { kind: null, n: 0 };
  host.t = 0;
  host.made = 0;
  host.needed = 0;
  host.bad = 0;
  host.ei = 0;
  host.sel = -1;
  host.kbUsed = false;
  host.lift = null;
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

  // The spine: this beat's term, its lesson, the terms on the gloves — the
  // term plus real neighbours from the same lesson, in shuffled places —
  // and the barrels: the term plus the first `kinds - 1` neighbours.
  host.terms = beatItems(host.session, ci, beat);
  host.item = host.terms[0] || null;
  host.lesson = beatLesson(host.session, ci, beat);
  const extra = host.item ? fillers(host.session, host.item, cfg.gloves - host.terms.length) : [];
  const all = host.terms.concat(extra).slice(0, Math.max(cfg.gloves, host.terms.length));
  host.menu = shuffle(all);
  host.gloves = host.menu.length;
  host.pool = all.slice(0, Math.max(host.terms.length, Math.min(cfg.kinds, all.length)));
  host.termIdx = host.menu.indexOf(host.item);
  host.caught = new Set();

  host.errs = [];
  host.parts = [];
  host.ei = 0;
  host.spawnT = 0.7;
  host.made = 0;
  host.bad = 0;
  host.streak = { kind: null, n: 0 };
  host.shake = 0;
  host.flash = 0;
  host.pulse = 0;
  host.pulseG = -1;
  host.zap = 0;
  host.lift = null;
  host.t = 0;
  host.sel = -1;
  host.kbUsed = false;
  host.nid = 0;
  host.finished = false;
  host.coachKind = null;
  // Reduced motion: the climb runs at 0.7× (§15.4).
  host.motion = host.reduceMotion ? 0.7 : 1;
  if (host.state.left) host.setState({ left: 0 });
  host.session.mode = MODE;
  host.session.mark();
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
  if (host.zap > 0) host.zap -= dt * 2;
  if (host.lift && host.lift.t > 0) host.lift.t -= dt;

  if (!host.finished) {
    host.spawnT -= dt;
    const more = host.ei < host.needed + 3 || !termsOk(host);
    if (host.spawnT <= 0 && live(host).length < 2 && more) spawn(host);
  }

  for (const e of host.errs) {
    if (e.dead) continue;
    e.wob += dt * 2;
    if (e.thru > 0) e.thru -= dt;
    e.p += (dt * m) / c.rise;
    if (e.p >= 1 && trip(host, e)) return;
  }
  host.errs = host.errs.filter((e) => !e.dead);
  host.parts = engine.parts(host.parts, dt, 320);
}

// ─── input: tap a glove ──────────────────────────

function gloveAt(host, p) {
  for (let i = 0; i < host.gloves; i++) {
    const q = glovePos(i, host.gloves);
    if (Math.hypot(p.x - q.x, p.y - q.y) < HIT_GLOVE) return i;
  }
  return -1;
}

function tap(host, p) {
  if (host.finished) return;
  const i = gloveAt(host, p);
  if (i >= 0) {
    grab(host, i);
    return;
  }
  engine.snd(host, 'fall');
}

/** Move the selection to the same column of the row above or below. */
function selRow(host, dir) {
  const n = host.gloves;
  const rows = rowsOf(n);
  if (rows.length < 2) return host.sel < 0 ? 0 : host.sel;
  const { r, c } = rowCol(host.sel < 0 ? 0 : host.sel, n);
  const nr = Math.max(0, Math.min(rows.length - 1, r + dir));
  const nc = Math.min(c, rows[nr] - 1);
  let base = 0;
  for (let k = 0; k < nr; k++) base += rows[k];
  return base + nc;
}

/**
 * The same game with no pointer: ← → walk along the beam, ↑ ↓ change row,
 * 1-5 raise that glove, space / Enter raise the selected one.
 */
function key(host, e) {
  if (host.finished) return;
  host.kbUsed = true;
  const n = host.gloves;
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();
    if (!n) return;
    const step = e.key === 'ArrowLeft' ? -1 : 1;
    host.sel = host.sel < 0 ? (step < 0 ? n - 1 : 0) : (host.sel + step + n) % n;
    engine.snd(host, 'click', { hz: 1400, v: 0.1 });
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault();
    if (!n) return;
    host.sel = selRow(host, e.key === 'ArrowUp' ? -1 : 1);
    engine.snd(host, 'click', { hz: 1400, v: 0.1 });
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    if (host.sel >= 0 && host.sel < n) grab(host, host.sel);
    else engine.snd(host, 'fall');
  } else if (/^[1-5]$/.test(e.key)) {
    const i = parseInt(e.key, 10) - 1;
    if (i < n) {
      host.sel = i;
      grab(host, i);
    }
  }
}

function draw(host, x) {
  drawScene(host, x);
}

// ─── chrome copy (rendered by GameHost, written here) ─────

function coachText(host, coach, lang) {
  const L = TX[lang] || TX.it;
  const lines = L[coach.kind] || L.through;
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
    id: 'nodejs-l12-scarico',
    surface: 'nodejs',
    level: 11,
    band: 2,
    register: 'R5',
    title: 'Lo scarico',
    titleEn: 'The chute',
    levelLabel: 'Node.js · L12 Gestione Errori / Node.js · L12 Error Handling',
    font: '700 14px "Lucida Console"',
  },
  W,
  H,
  CH,
  drone: { freq: 47, type: 'sawtooth', volume: 0.014, lowpass: 120 },
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
