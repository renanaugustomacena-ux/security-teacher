/**
 * IL CENTRALINO DI NOTTE — Node.js L6 «HTTP e Server».
 * Port of knowledge-aio-giochi/templates/nodejs-l6-centralino (the routing
 * switchboard) onto the level-game SDK: the same eight chapters, the same
 * tables, the same error ladder, and now every beat teaches one of the level's
 * forty terms (js/topics/data/nodejs.js, levels[5]: 4 lessons × 10 terms).
 *
 * SCHEDA DI PROGETTO (ricerca/00 §0.3) + SCHEDA VISIVA (ricerca/42 §42.3)
 * GIOCO ...... Il centralino di notte
 * TOPIC ...... Node.js L6 HTTP e Server (4 lezioni × 10 termini = 40, un termine per beat)
 * CONCETTO ... Ogni chiamata che arriva chiede una cosa (in italiano). Si innesta nella
 *              presa che porta quel termine (in inglese), e la risposta è un numero che
 *              dice com'è andata. Se nessuna presa porta quel termine, la risposta è 404.
 * FORMA ...... instradamento   VERBO ... innestare (trascinare lo spinotto nella presa)
 * ARCHETIPO .. ricerca/16 smistamento a corsie, in forma di centralino
 * VINCI SE ... tutte le chiamate del beat trovano risposta (need)
 * PERDI SE ... tre chiamate cadono: la linea si chiude e il beat ricomincia
 * SBAGLI ..... 1 lo spinotto rimbalza fuori, la chiamata cade, una lampada si spegne
 *              2 alla seconda sulla stessa chiamata, la presa giusta si accende (aiutato)
 *              3 coaching: cosa hai innestato, cosa chiedeva, il termine inglese
 * CAPITOLI ... 1 innestare · 2 due indirizzi · 3 FRATTURA il metodo conta
 *              4 il numero dopo il nome · 5 il timbro della risposta
 *              6 quando non c'è presa · 7 a raffica · 8 il turno intero
 * MONDO ...... il centralino visto come un flipper: le chiamate scendono nella corsia
 *              di lancio come palle cromate con un cartellino luminoso, le prese sono
 *              bumper con la targhetta del termine, i timbri sono bersagli a lamella
 * REGISTRO ... R11 Flipper: verde playfield, cromo, ambra a matrice di punti, nero della
 *              matrice, rosso bumper (solo decorativo), avorio delle plastiche
 *              figura: il bumper tondo con la calotta e la corona di lampade · suolo: il
 *              piano inclinato con le guide cromate · movimento: la palla scende con
 *              attrito e dondola fra le guide, le lampade si accendono in sequenza
 *              carattere: matrice di punti 5×7 per le cifre dentro il vetro
 * NUMERI ..... transito 3,4→1,9 s (mai sotto 1,8), tre lampade, chiamate in aria 1→3,
 *              prese 1→5, timbri 4
 * TEST 1 ..... le palle sono tutte identiche: l'unico segnale è il cartellino con il
 *              significato italiano. Le prese cambiano posto a ogni beat e portano solo
 *              il termine inglese: stessa sagoma, stessa tinta, cambia solo la parola.
 * TEST 2 ..... "Innesto ogni chiamata nella presa del suo termine, prima che cada"
 * TEST 3 ..... una palla scende dondolando con un cartellino acceso e un bumper con la
 *              targhetta la aspetta
 */

import * as engine from '../KaioEngine.js';
import { ttsService } from '../../services/TTSService.js';
import { beatItems, distractors, fillers, labelOf, meaningOf, pickLang } from '../LevelBeats.js';
import {
  W,
  H,
  BOARD,
  DROP,
  DROP_END,
  STAMPS,
  PAL,
  CH,
  TX,
  hasSocket,
  jackXY,
  stampXY,
} from '../parts/nodejs-l6-centralino/tables.js';
import { draw } from '../parts/nodejs-l6-centralino/paint.js';

const MODE = 'centralino';
const DONE_S = 0.8;

// ─── helpers ─────────────────────────────────────

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

/* The stamp a call wants: 404 with no socket, 201 when it creates, 200 otherwise. */
function wantOf(c) {
  if (c.noSocket) return '404';
  return c.m === 'POST' ? '201' : '200';
}

// ─── the vocabulary spine ────────────────────────

/**
 * Which chapter this beat belongs to: the installed beat table is the truth
 * (goBeat installs the chapter before reset), the state a fallback.
 */
function installedChapter(host) {
  const i = host.CH ? host.CH.findIndex((c) => c.beats === host.BEATS) : -1;
  return i >= 0 ? i : host.state.chapter || 0;
}

function lessonOf(host, item) {
  if (!item || !host.session.lessons) return null;
  return host.session.lessons.find((l) => l.id === item.lesson) || null;
}

/**
 * The sockets: the beat's own terms plus distractors from the same lesson, one
 * per route of the template's table, shuffled so position never tells (TEST 1).
 */
function buildJacks(host) {
  const n = host.cfg.routes.length;
  const terms = host.terms.slice(0, n);
  const extra = distractors(host.session, host.item, Math.max(0, n - terms.length));
  return shuffle(terms.concat(extra)).map((item) => ({ item }));
}

function ticket(item, flavour, noSocket) {
  return { item, m: flavour[0], p: flavour[1], noSocket };
}

/**
 * The night's calls. The template drew a random flavour per spawn and capped
 * the spawns; §46.5 wants certainty, so the calls are a queue: the beat's own
 * term first (always with a socket), then the rest of `need` from the table's
 * flavours — a flavour with a socket asks a term that is on the board, a
 * flavour without one asks a term of the same lesson that is NOT on the board
 * and can only be answered by the 404 stamp. A call that fails goes back to
 * the end of the queue: the beat still has to ask it.
 */
function buildQueue(host) {
  const cfg = host.cfg;
  const onBoard = host.jacks.map((j) => j.item);
  if (!onBoard.length) return [];
  const socketed = cfg.calls.filter((f) => hasSocket(f, cfg.routes));
  const off = fillers(host.session, host.item, 9).filter((it) => onBoard.indexOf(it) < 0);
  const q = [];
  host.terms.forEach((it, i) => {
    if (q.length < cfg.need) {
      q.push(ticket(it, socketed[i % socketed.length] || cfg.calls[0], false));
    }
  });
  const flavours = shuffle(cfg.calls);
  let oi = 0;
  for (let i = q.length; i < cfg.need; i++) {
    const f = flavours[i % flavours.length];
    const sock = hasSocket(f, cfg.routes);
    if (sock || !off.length) {
      const it = onBoard[Math.floor(Math.random() * onBoard.length)];
      q.push(ticket(it, sock ? f : socketed[0], false));
    } else {
      // The method never reveals the missing socket: it is borrowed from a
      // route that exists, so the only signal is the meaning on the tag.
      const rt = cfg.routes[Math.floor(Math.random() * cfg.routes.length)];
      q.push(ticket(off[oi++ % off.length], [rt[0], f[1]], true));
    }
  }
  return q;
}

/**
 * The template's reset body. The first time a beat is built the board and the
 * night's calls are drawn; when the line closes on the third lamp the same
 * board comes back reshuffled and the same calls queue up again, so every
 * term that was introduced in this beat is asked again in this beat.
 */
function rebuild(host) {
  host.calls = [];
  host.parts = [];
  host.drag = null;
  host.pending = null;
  host.spawnT = 0.8;
  host.made = 0;
  host.shake = 0;
  host.flash = 0;
  host.pulse = 0;
  host.pulseJ = -1;
  host.pulseStamp = false;
  host.streak = { kind: null, n: 0 };
  host.doneT = 0;
  host.finished = false;
  host.kj = 0;
  if (host.night) {
    host.jacks = shuffle(host.jacks);
  } else {
    host.jacks = buildJacks(host);
    host.night = buildQueue(host);
  }
  host.queue = host.night.slice(0, 1).concat(shuffle(host.night.slice(1)));
  host.setState({ left: 0 });
  host.session.mark();
}

function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

/* ricerca/35 §35.3.1: a term answered is a term heard. */
function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

// ─── calls ───────────────────────────────────────

function liveCalls(host) {
  return host.calls.filter((k) => k.live && !k.plugged);
}

function lowestCall(host) {
  return liveCalls(host).sort((a, b) => b.y - a.y)[0] || null;
}

function spawn(host) {
  const t = host.queue.shift();
  if (!t) return;
  host.calls.push({
    ...t,
    id: host.nid++,
    y: DROP - 60,
    sway: Math.random() * 6.28,
    live: true,
    plugged: false,
    jack: -1,
  });
  // The Italian tag is the presentation (mastery stage 0 -> 1).
  t.item.introduce();
}

/**
 * The graded response: the term the learner plugged the call into against
 * the term the call's meaning names, through the SDK and never a local
 * `===` (§46.1, §46.2). Only a plug is a response — the stamps are the
 * game's own mechanic (a number, not a term) and are never recorded as an
 * answer on the vocabulary item. Silent: the game answers with the bumper
 * flash or the ball bouncing out.
 */
function grade(host, c, pick) {
  const verdict = c.item.attempt(pick, {
    expected: c.item.english,
    mode: MODE,
    hintsUsed: host.aided.has(c.item) ? 1 : 0,
    silent: true,
  });
  host.session.mark();
  return verdict.correct;
}

function ok(host, c) {
  c.live = false;
  host.pending = null;
  host.made++;
  host.flash = 1;
  host.streak = { kind: null, n: 0 };
  // §46.5: a term is cleared when its beat is won, not when one call lands.
  const won = host.made >= host.needed;
  if (won) for (const it of host.terms) it.clear();
  persist(host);
  engine.snd(host, 'tone', { from: 580, to: 920, v: 0.16 });
  engine.burst(host, host.parts, W / 2, BOARD - 60, 10, PAL.ivory);
  say(host, c.item.english);
  host.setState({ step: host.made });
  if (won) {
    host.finished = true;
    host.doneT = DONE_S;
    engine.snd(host, 'chime');
  }
}

/* Second rung of the ladder: the right object lights — the term's bumper, or
   the 404 target when the call has no socket. */
function light(host, c) {
  host.pulse = 0.8;
  host.pulseJ = host.jacks.findIndex((j) => j.item === c.item);
  host.pulseStamp = Boolean(c.noSocket);
}

function openCoach(host, kind, c, pick) {
  host.coachKind = kind;
  host.setState({
    coach: {
      kind,
      pick: pick || '',
      word: c.item.english,
      it: meaningOf(c.item, 'it'),
      m: c.m,
      want: wantOf(c),
      noSocket: Boolean(c.noSocket),
    },
  });
}

/**
 * A call that fails — wrong socket, forced socket, wrong stamp, or dropped —
 * dies, costs a lamp, and its term goes back to the end of the queue. The
 * ladder runs on the term (ricerca/00 passo 6: the "same thing"): second
 * error lights the right object and marks the term aided, third opens the
 * coach. The template's streak by kind is kept as well, so three drops in a
 * row still explain themselves.
 */
function fail(host, c, kind, pick) {
  c.live = false;
  host.pending = null;
  if (host.drag && host.drag.c === c) host.drag = null;
  host.shake = 0.8;
  engine.snd(host, 'whir');
  engine.burst(host, host.parts, W / 2, c.y, 10, PAL.steel);
  host.queue.push(ticket(c.item, [c.m, c.p], c.noSocket));

  if (kind !== 'drop') {
    const n = (host.wrongs.get(c.item) || 0) + 1;
    host.wrongs.set(c.item, n);
    if (n === 2) {
      light(host, c);
      host.aided.add(c.item);
    }
    if (n >= 3) {
      openCoach(host, kind, c, pick);
      host.wrongs.set(c.item, 0);
    }
  }
  const s = host.streak;
  if (s.kind === kind) s.n++;
  else host.streak = { kind, n: 1 };
  if (host.streak.n === 2) {
    light(host, c);
    host.aided.add(c.item);
  }
  if (host.streak.n >= 3) {
    openCoach(host, kind, c, pick);
    host.streak = { kind: null, n: 0 };
  }

  const left = (host.state.left || 0) + 1;
  host.setState({ left });
  if (left >= 3) {
    rebuild(host);
    host.setState({ step: 0 });
  }
}

// ─── the verb ────────────────────────────────────

function plugInto(host, c, hit) {
  const j = host.jacks[hit];
  if (!j || !c.live || c.plugged) return false;
  const pick = labelOf(j.item);
  if (grade(host, c, pick)) {
    c.plugged = true;
    c.jack = hit;
    const s = jackXY(host.jacks.length, hit);
    engine.snd(host, 'pop', { hz: 520, v: 0.16 });
    engine.burst(host, host.parts, s.x, s.y, 8, PAL.amber);
    if (host.cfg.stamp) host.pending = { c, want: wantOf(c) };
    else ok(host, c);
    return true;
  }
  fail(host, c, c.noSocket ? 'force' : 'wrong', pick);
  return false;
}

/* A stamp on a call that was never plugged: right only for a call with no
   socket. The template also let 200 pass on a socketed call; here the term
   has to be plugged first, or the vocabulary was never asked. A stamp is a
   number, not a term: it costs a lamp when wrong but is never an attempt. */
function stampDirect(host, c, val) {
  if (c.noSocket && val === wantOf(c)) ok(host, c);
  else fail(host, c, 'stamp', val);
}

/* The stamp after a good plug: the number the call wanted, or a lamp. The
   plug itself was the graded response. */
function stampPending(host, val) {
  const p = host.pending;
  if (!p) return;
  host.pending = null;
  if (val === p.want) ok(host, p.c);
  else fail(host, p.c, 'stamp', val);
}

function stampAt(p) {
  for (let i = 0; i < STAMPS.length; i++) {
    const s = stampXY(i);
    if (Math.hypot(p.x - s.x, p.y - s.y) < 34) return i;
  }
  return -1;
}

function useStamp(host, i) {
  if (i < 0) return false;
  if (host.pending) {
    stampPending(host, STAMPS[i]);
    return true;
  }
  if (!host.cfg.stamp) return false;
  const c = lowestCall(host);
  if (c) stampDirect(host, c, STAMPS[i]);
  return true;
}

// ─── lifecycle ───────────────────────────────────

function init(host) {
  host.parts = [];
  host.calls = [];
  host.queue = [];
  host.jacks = [];
  host.night = null;
  host.terms = [];
  host.item = null;
  host.lesson = null;
  host.chapter = 0;
  host.drag = null;
  host.pending = null;
  host.wrongs = new Map();
  host.aided = new Set();
  host.streak = { kind: null, n: 0 };
  host.t = 0;
  host.kj = 0;
  host.kbUsed = false;
  host.nid = 0;
  host.made = 0;
  host.needed = 0;
  host.flash = 0;
  host.shake = 0;
  host.pulse = 0;
  host.pulseJ = -1;
  host.pulseStamp = false;
  host.doneT = 0;
  host.finished = false;
  host.coachKind = null;
}

function reset(host, beat) {
  const cfg = host.BEATS[beat];
  host.cfg = cfg;
  host.needed = cfg.need;
  const ci = installedChapter(host);
  host.chapter = ci;
  host.t = 0;
  host.nid = 0;
  host.kbUsed = false;
  host.coachKind = null;
  host.wrongs = new Map();
  host.aided = new Set();
  host.terms = beatItems(host.session, ci, beat);
  host.item = host.terms[0] || null;
  host.lesson = lessonOf(host, host.item);
  host.session.mode = MODE;
  host.night = null;
  rebuild(host);
}

// ─── update ──────────────────────────────────────

function update(host, dt) {
  host.t += dt;
  const c = host.cfg;
  if (!c) return;
  if (host.flash > 0) host.flash -= dt * 3;
  if (host.shake > 0) host.shake -= dt * 3.4;
  if (host.pulse > 0) host.pulse -= dt;

  if (!host.finished) {
    host.spawnT -= dt;
    if (host.spawnT <= 0 && liveCalls(host).length < c.max && host.queue.length) {
      spawn(host);
      host.spawnT = c.fall * 0.55;
    }
  }

  // Reduced motion: the ball still has to come down (it is the game), but at
  // 0.7x, and it stops swaying between the rails (§15.4, ricerca/42 §42.6 #10).
  const ms = host.reduceMotion ? 0.7 : 1;
  const vy = ((H * 0.34) / c.fall) * ms;
  const calls = host.calls;
  for (const k of calls) {
    if (!k.live) continue;
    if (!host.reduceMotion) k.sway += dt * 1.7;
    if (!k.plugged && !host.pending) {
      k.y += vy * dt;
      if (k.y > DROP_END) fail(host, k, 'drop', '');
      // The third lamp rebuilt the board: the old calls are gone with it.
      if (host.calls !== calls) break;
    }
  }
  host.calls = host.calls.filter((k) => k.live);
  host.parts = engine.parts(host.parts, dt, 420);

  if (host.doneT > 0) {
    host.doneT -= dt;
    if (host.doneT <= 0) {
      host.doneT = 0;
      host.setState({ done: true });
    }
  }
}

// ─── input: drag the ball into a bumper, tap a stamp ─

function down(host, p) {
  if (host.finished || !host.cfg) return;
  if (host.pending) {
    useStamp(host, stampAt(p));
    return;
  }
  for (const c of liveCalls(host)) {
    if (Math.abs(p.x - W / 2) < 120 && Math.abs(p.y - c.y) < 46) {
      host.drag = { c, x: p.x, y: p.y };
      engine.snd(host, 'click', { hz: 1100, v: 0.16 });
      return;
    }
  }
  if (host.cfg.stamp) useStamp(host, stampAt(p));
}

function drag(host, q, p) {
  if (!host.drag) return;
  host.drag.x = p.x;
  host.drag.y = p.y;
}

function up(host, p) {
  const d = host.drag;
  host.drag = null;
  if (!d || !p || !d.c.live) return;
  for (let i = 0; i < host.jacks.length; i++) {
    const s = jackXY(host.jacks.length, i);
    if (Math.hypot(p.x - s.x, p.y - s.y) < 40) {
      plugInto(host, d.c, i);
      return;
    }
  }
}

/* ← → choose the bumper, space/Enter plug the lowest ball into it, 1-4 stamp. */
function key(host, e) {
  if (host.finished || !host.cfg) return;
  const n = host.jacks.length;
  host.kbUsed = true;
  if (e.key === 'ArrowLeft') {
    host.kj = n ? (host.kj - 1 + n) % n : 0;
    e.preventDefault();
  } else if (e.key === 'ArrowRight') {
    host.kj = n ? (host.kj + 1) % n : 0;
    e.preventDefault();
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    if (host.pending) return;
    const c = lowestCall(host);
    if (c) plugInto(host, c, host.kj);
  } else if (/^[1-4]$/.test(e.key)) {
    e.preventDefault();
    useStamp(host, parseInt(e.key, 10) - 1);
  }
}

// ─── chrome copy (rendered by GameHost, written here) ─────

function coachText(host, coach, lang) {
  const L = TX[lang] || TX.it;
  const c = coach || {};
  const lines = L[c.kind] || L.wrong;
  const answer = c.noSocket ? L.answerStamp : L.answerJack;
  const sub = (t) =>
    String(t)
      .replace(/\{pick\}/g, c.pick || '')
      .replace(/\{word\}/g, c.word || '')
      .replace(/\{it\}/g, c.it || '')
      .replace(/\{want\}/g, c.want || '')
      .replace(/\{m\}/g, c.m || 'GET')
      .replace(/\{answer\}/g, answer);
  const effect = c.kind === 'stamp' && c.pick && c.pick === c.want ? L.stampEarly : lines[1];
  return { what: sub(lines[0]), effect: sub(effect), rule: sub(lines[2]), hint: sub(sub(L.hint)) };
}

function doneView(host, lang) {
  const L = TX[lang] || TX.it;
  const terms = host.terms || [];
  return {
    eyebrow: L.eyebrow,
    title: terms.map(labelOf).join(' · '),
    subtitle: pickLang(host.lesson ? host.lesson.title : '', lang),
  };
}

function onCoachClose(host) {
  host.coachKind = null;
}

export default {
  meta: {
    id: 'nodejs-l6-centralino',
    surface: 'nodejs',
    level: 5,
    band: 1,
    register: 'R11',
    title: 'Il centralino di notte',
    titleEn: 'The night switchboard',
    levelLabel: 'Node.js · L6 HTTP e Server / Node.js · L6 HTTP & Server',
    font: '700 13px "Raleway"',
  },
  W,
  H,
  CH,
  drone: { freq: 46, type: 'triangle', volume: 0.012, lowpass: 130 },
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
