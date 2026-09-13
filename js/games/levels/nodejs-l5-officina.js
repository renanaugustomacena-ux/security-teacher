/**
 * L'OFFICINA DI NOTTE — Node.js L5 «File System e Path».
 * Port of knowledge-aio-giochi/templates/nodejs-l2-officina (ricerca/11 slash,
 * Fruit Ninja) onto the level-game SDK: 4 lessons × 10 terms = 40, one term per
 * beat over 8 chapters × 5 beats (LevelBeats spine), redrawn in register R6.
 *
 * SCHEDA DI PROGETTO (ricerca/00 §0.3) + SCHEDA VISIVA (ricerca/42 §42.3)
 * GIOCO ...... L'officina di notte
 * TOPIC ...... Node.js, L5 File System e Path (js/topics/data/nodejs.js levels[4])
 * CONCETTO ... Gli attrezzi per toccare i file hanno un nome preciso, e il bancone
 *              li chiede in italiano: «lettura file asincrona» sul bancone è
 *              readFile sul manico. Afferri solo ciò che il bancone possiede.
 * FORMA ...... contenimento          VERBO ... afferrare al volo
 * ARCHETIPO .. ricerca/11 slash — Fruit Ninja
 * VINCI SE ... il pezzo sul bancone è finito, ogni attrezzo chiesto è stato
 *              afferrato almeno una volta, e il motore è ancora acceso
 * PERDI SE ... afferri un attrezzo che il bancone non possiede: il motore si
 *              spegne, buio, il pezzo resta a metà
 * SBAGLI ..... 1 il motore si spegne (o il tonfo dell'attrezzo caduto), nessun testo
 *              2 alla seconda sullo stesso attrezzo il bancone si illumina 400 ms
 *                e mostra i nomi inglesi; la voce giusta e il suo cubo restano accesi
 *              3 pannello di coaching: cosa hai afferrato, cosa chiedeva, il nome
 * CAPITOLI ... 1 il gesto · 2 entra un estraneo · 3 FRATTURA la cosa che sembra
 *              (i falsi sono della stessa famiglia) · 4 la presa doppia (fascetta:
 *              le API che rispondono dopo) · 5 percorsi scritti a mano · 6 sincrono
 *              e asincrono · 7 a raffica · 8 il pezzo intero
 * MONDO ...... l'officina di notte è una piramide di cubi (l'albero delle
 *              cartelle, ricerca/42 §42.5 L5): sul cubo in cima il bancone e il
 *              pezzo in lavorazione, una lampada a prisma sopra, il pozzo sotto.
 *              I cubi-attrezzo saltano su dal pozzo ad arco con il nome inglese
 *              stampato sulla faccia in alto; il bancone elenca in italiano ciò
 *              che possiede. Il montatore (una palla arancione con il muso) aspetta.
 * REGISTRO ... R6 Isometrico pastello: grafite notte #1A1A2E · sabbia #FFD98E
 *              (faccia in alto) · arancio #E07B39 (sinistra, il montatore) ·
 *              prugna #7A3E9D (destra) · turchese obiettivo #3FE0C5 · ombra
 *              netta #101018. Figura: il cubo a tre facce e il montatore.
 *              Suolo: la piramide di cubi e il pozzo. Movimento: salto ad arco
 *              dal pozzo, rimbalzo sui bordi, caduta fuori dal bordo. Carattere:
 *              Raleway per cifre ed etichette in un riquadro a prisma; il nome
 *              stampato sul cubo in JetBrains Mono.
 * NUMERI ..... volo 2,6→1,9 s (mai sotto 1,8: il nome va letto), hang ×0,72,
 *              hit-stop 45/110 ms, scia 260 ms, max 3 in aria, presa 260 ms
 * TEST 1 ..... cubi tutti dello stesso legno e delle stesse tre facce; quattro
 *              altezze distribuite per indice, non per presenza; lato d'ingresso
 *              e apice casuali. L'unico segnale è il nome stampato, confrontato
 *              con il significato italiano sul bancone.
 * TEST 2 ..... "Afferro al volo solo gli attrezzi che il mio bancone chiede,
 *              prima che il pezzo si fermi"
 * TEST 3 ..... un cubo sale dal pozzo verso una mano già aperta
 */

import * as engine from '../KaioEngine.js';
import { ttsService } from '../../services/TTSService.js';
import { beatItems, distractors, labelOf, meaningOf, pickLang } from '../LevelBeats.js';
import { CH } from '../parts/nodejs-l5-officina/chapters.js';

const W = 420;
const H = 910;
const BY = H - 150; // the bench: top face of the pyramid's top cube
const PIECE = { x: W / 2, y: BY - 34 };
const FONT = '"Raleway","Inter",system-ui,sans-serif';
const MONO = '"JetBrains Mono","Consolas",monospace';

/* R6 palette, named (ricerca/42 §42.4). No gold of the app in here. */
const PAL = {
  night: '#1A1A2E',
  sand: '#FFD98E',
  orange: '#E07B39',
  plum: '#7A3E9D',
  teal: '#3FE0C5',
  shadow: '#101018',
};

const MIN_SPEED = 220; // px/s: below this a stroke is a touch, not a grab
const TRAIL_S = 0.26;
const GRAB_S = 0.26;
const COOL_S = 0.2; // one stroke counts once per cube (ricerca/11 §11.4)
const REVEAL_S = 0.4;
const MOTOR_S = 0.75;
const DONE_S = 0.5;
/* R6 asks for pure 30° isometry: a rhombus w wide is w·tan30° deep, the same
   slope as the wall grid. Every prism derives its depth from its width. */
const ISO = Math.tan(Math.PI / 6);
const CUBE = { w: 88, d: 88 * ISO, h: 40 };
const ROWS = 3; // pyramid rows that fit under the bench (H − BY = 150 px)
const ROW_STEP = CUBE.h + CUBE.d / 2;
const PIT_Y = BY + ROW_STEP; // the pit: the dark floor the lower rows stand in
const SLAB_Y = 96;
const SLAB_PITCH = 30;
const HEIGHTS = [14, 20, 26, 32];

const TX = {
  it: {
    grab: [
      'Hai afferrato «{pick}».',
      'Il bancone non lo aveva: chiedeva «{it}», e il motore si è spento con il pezzo a metà.',
      'Sul bancone «{it}» si chiama «{word}»: afferra quello e lascia cadere «{pick}».',
    ],
    miss: [
      'Hai lasciato cadere «{word}».',
      'Era sul tuo bancone — «{it}» — e il pezzo è rimasto fermo.',
      'Quello che il bancone possiede va afferrato: «{it}» è «{word}».',
    ],
    half: [
      'Hai preso «{word}» una volta sola.',
      'La fascetta vuole due prese: «{it}» risponde dopo, e la lavorazione è rimasta aperta.',
      'Chi risponde dopo va ripreso quando risponde: «{word}» si afferra due volte.',
    ],
    hint: 'trascina attraverso il cubo per afferrarlo · da tastiera: ← → cubo, 1–3 scelta diretta, spazio afferra, ↓ lascia cadere',
    eyebrow: 'Pezzo finito',
    bench: 'Sul bancone',
  },
  en: {
    grab: [
      'You grabbed "{pick}".',
      'The bench did not have it: it asked for "{it}", and the motor cut out with the piece half done.',
      'On the bench "{it}" is called "{word}": grab that one and let "{pick}" fall.',
    ],
    miss: [
      'You let "{word}" fall.',
      'It was on your bench — "{it}" — and the piece stayed put.',
      'What the bench owns must be grabbed: "{it}" is "{word}".',
    ],
    half: [
      'You grabbed "{word}" only once.',
      'The band wants two grabs: "{it}" answers later, and the job stayed open.',
      'What answers later must be caught when it answers: "{word}" is grabbed twice.',
    ],
    hint: 'drag through the cube to grab it · keyboard: ← → cube, 1–3 direct pick, space grabs, ↓ lets it fall',
    eyebrow: 'Piece finished',
    bench: 'On the bench',
  },
};

// ─── the lesson on the bench ─────────────────────

/** A term whose code answers later wears the band: two grabs (ricerca/11 §11.4). */
function isAsync(item) {
  const code = item && item.code ? String(item.code) : '';
  return /\bawait\b|=>|\bcb\b|\.then\(/.test(code);
}

function motionScale(host) {
  return host.reduceMotion ? 0.7 : 1;
}

/* ricerca/35 §35.3.1: a term grabbed is a term heard. */
function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

function airborne(host) {
  return host.tools.filter((t) => !t.gone && !t.grab);
}

function inAir(host, item) {
  return host.tools.some((t) => !t.gone && !t.grab && t.item === item);
}

/** The wanted term a wrong grab is graded against: the beat's own first. */
function expectedFor(host) {
  if (host.item && !host.grabbed.has(host.item.key)) return host.item;
  return host.wanted.find((it) => !host.grabbed.has(it.key)) || host.item;
}

function pickOne(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Which term the next cube carries. The template drew at random from `have`,
 * so covering every name was luck; §46.5 wants certainty: a wanted term not
 * yet grabbed comes first, then the rest of the bench, never a duplicate of
 * one already in the air when it can be helped.
 */
function nextItem(host) {
  const c = host.cfg;
  if (host.foils.length && Math.random() < c.absRate) {
    const free = host.foils.filter((it) => !inAir(host, it));
    return { item: pickOne(free.length ? free : host.foils), want: false };
  }
  if (!host.wanted.length) return null;
  const pending = host.wanted.filter((it) => !host.grabbed.has(it.key) && !inAir(host, it));
  const rest = host.wanted.filter((it) => !inAir(host, it));
  const pool = pending.length ? pending : rest.length ? rest : host.wanted;
  return { item: pickOne(pool), want: true };
}

function spawn(host) {
  const c = host.cfg;
  const pick = nextItem(host);
  if (!pick) return;
  const { item, want } = pick;
  const name = labelOf(item);
  const x = W * (0.16 + Math.random() * 0.68);
  const apex = H * (0.38 + (Math.random() * 0.16 - 0.08));
  const y0 = H + 46;
  const d = y0 - apex;
  // Reduced motion: the cubes are the game and must still fly, but the
  // whole arc is 0.7× slower (§15.4, ricerca/42 §42.6 #10).
  const ms = motionScale(host);
  const f = c.flight / ms;
  const tr = f / 2;
  const g = (2 * d) / (tr * tr);
  host.tools.push({
    id: host.nid++,
    item,
    name,
    want,
    twice: Boolean(c.band) && want && isAsync(item),
    grabs: 0,
    flight: f,
    x,
    y: y0,
    vx: ((W / 2 - x) * 0.2 + (Math.random() * 40 - 20)) * ms,
    vy: (-2 * d) / tr,
    g,
    v0: (2 * d) / tr,
    shape: HEIGHTS[item.index % HEIGHTS.length],
    gone: false,
    grab: 0,
    gx: 0,
    gy: 0,
    cool: 0,
    glow: host.aided.has(item.key) ? 1 : 0,
    len: Math.max(96, name.length * 9 + 44) + 24,
  });
  if (host.chapter === 0 && host.state.beat === 0 && host.ghost === 0 && host.tools.length === 1) {
    host.ghost = 0.01;
  }
}

// ─── the error ladder (ricerca/00 passo 6) ───────

/**
 * Same kind on the same thing: the first time the world answers, the second
 * time the bench lights up and the right term stays lit (aided, hintsUsed 1
 * from here), the third opens the coach with the term in its rule line.
 */
function err(host, kind, thing, expected) {
  const s = host.streak;
  if (s.kind === kind && s.key === thing.key) s.n++;
  else {
    s.kind = kind;
    s.key = thing.key;
    s.n = 1;
  }
  if (s.n === 2 && expected) {
    host.reveal = REVEAL_S;
    host.aided.add(expected.key);
    for (const t of host.tools) if (t.item === expected) t.glow = 1;
  }
  if (s.n >= 3) {
    host.coachKind = kind;
    host.setState({
      coach: {
        kind,
        pick: kind === 'grab' ? labelOf(thing) : '',
        word: expected ? labelOf(expected) : '',
        it: expected ? meaningOf(expected, 'it') : '',
      },
    });
    host.streak = { kind: null, key: null, n: 0 };
  }
}

function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

/**
 * The grab is the graded response: the learner's real pick against the term
 * the bench asked for, through the SDK and never a local `===` (§46.1, §46.2).
 * `silent` because the game answers diegetically — the cube flying to the
 * piece, or the motor cutting out.
 */
function good(host, t) {
  const item = t.item;
  item.attempt(item.english, {
    expected: item.english,
    mode: 'officina',
    hintsUsed: host.aided.has(item.key) ? 1 : 0,
    silent: true,
  });
  host.session.mark();
  host.grabbed.add(item.key);
  item.clear();
  t.grab = 0.0001;
  t.gx = t.x;
  t.gy = t.y;
  t.glow = 0;
  host.hitstop = 45;
  engine.snd(host, 'click', { hz: 1750, v: 0.5 });
  host.flash = 1;
  engine.burst(host, host.parts, t.x, t.y, 9, PAL.sand);
  host.streak = { kind: null, key: null, n: 0 };
  if (host.sel === t) host.sel = null;
  say(host, item.english);
}

function bad(host, t) {
  const expected = expectedFor(host);
  if (expected) {
    expected.attempt(t.item.english, {
      expected: expected.english,
      mode: 'officina',
      hintsUsed: host.aided.has(expected.key) ? 1 : 0,
      silent: true,
    });
    host.session.mark();
  }
  t.gone = true;
  host.hitstop = 110;
  engine.snd(host, 'whir');
  host.motor = 0;
  host.motorT = MOTOR_S;
  host.shake = 1;
  host.blown = Math.min(3, host.blown + 1);
  host.step = 0;
  host.sel = null;
  host.setState({ step: 0 });
  err(host, 'grab', t.item, expected);
}

/** One stroke through one cube. Shared by the finger and the keyboard. */
function strike(host, t) {
  if (host.finished || t.gone || t.grab || t.cool > 0) return false;
  t.cool = COOL_S;
  if (!t.want) {
    bad(host, t);
    return true;
  }
  t.grabs++;
  if (t.twice && t.grabs < 2) {
    host.hitstop = 30;
    engine.snd(host, 'pop', { hz: 640, v: 0.12 });
    engine.burst(host, host.parts, t.x, t.y, 5, PAL.sand, { v1: 90 });
    t.vy -= 40 * motionScale(host);
    return true;
  }
  good(host, t);
  return true;
}

/**
 * Segment a→b against the airborne cubes (ricerca/11 §11.4): the nearest hit
 * wins, so a stroke aimed at one cube never grabs its neighbour by accident.
 */
function slice(host, a, b) {
  const tol = host.touch ? 12 : 4;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const L2 = dx * dx + dy * dy || 1;
  let best = null;
  let bestD = Infinity;
  for (const t of airborne(host)) {
    const R = t.len * 0.44 + tol;
    let u = ((t.x - a.x) * dx + (t.y - a.y) * dy) / L2;
    u = Math.max(0, Math.min(1, u));
    const dist = Math.hypot(a.x + u * dx - t.x, a.y + u * dy - t.y);
    if (dist <= R && dist < bestD) {
      best = t;
      bestD = dist;
    }
  }
  if (best) strike(host, best);
}

function won(host) {
  for (const it of host.terms) it.clear();
  for (const it of host.wanted) it.clear();
  host.finished = true;
  host.doneT = DONE_S;
  engine.snd(host, 'chime');
  persist(host);
}

function arrive(host, t) {
  t.gone = true;
  engine.burst(host, host.parts, PIECE.x, PIECE.y, 12, PAL.teal);
  engine.snd(host, 'tone', { from: 560, to: 880, v: 0.16 });
  host.step += 1;
  host.setState({ step: host.step });
  persist(host);
  const covered = host.wanted.every((it) => host.grabbed.has(it.key));
  if (!host.finished && host.step >= host.needed && covered) won(host);
}

// ─── lifecycle ───────────────────────────────────

function init(host) {
  host.parts = [];
  host.tools = [];
  host.trail = [];
  host.terms = [];
  host.item = null;
  host.wanted = [];
  host.foils = [];
  host.grabbed = new Set();
  host.aided = new Set();
  host.streak = { kind: null, key: null, n: 0 };
  host.chapter = 0;
  host.t = 0;
  host.nid = 0;
  host.sel = null;
  host.kbUsed = false;
  host.motor = 1;
  host.lit = 1;
  host.step = 0;
  host.blown = 0;
}

/**
 * Which chapter this beat belongs to: the installed beat table is the truth
 * (goBeat installs the chapter and calls reset before it writes state.chapter).
 */
function installedChapter(host) {
  const i = host.CH ? host.CH.findIndex((c) => c.beats === host.BEATS) : -1;
  return i >= 0 ? i : host.state.chapter || 0;
}

/**
 * The bench for this beat. The beat's own term(s) from the spine, fillers from
 * the same lesson up to `wants`, foils from the same lesson up to `foils`;
 * fillers and foils are drawn together so they never overlap, and the total
 * stays inside the lesson's nine other terms.
 */
function stockBench(host, cfg) {
  const s = host.session;
  const ci = host.chapter;
  host.terms = beatItems(s, ci, host.state.beat);
  host.item = host.terms[0] || null;
  if (!host.item) {
    host.wanted = [];
    host.foils = [];
    return;
  }
  const lessonSize = s.items.filter((i) => i.lesson === host.item.lesson).length;
  const room = Math.max(0, lessonSize - host.terms.length);
  const fillN = Math.min(room, Math.max(0, cfg.wants - host.terms.length));
  const foilN = Math.min(room - fillN, cfg.foils);
  const pool = distractors(s, host.item, fillN + foilN).filter((it) => !host.terms.includes(it));
  host.wanted = host.terms.concat(pool.slice(0, fillN));
  host.foils = pool.slice(fillN, fillN + foilN);
  // The Italian meanings on the bench are the presentation (stage 0 -> 1).
  for (const it of host.wanted) it.introduce();
}

function reset(host, beat) {
  const cfg = host.BEATS[beat];
  host.cfg = cfg;
  host.needed = cfg.steps;
  host.chapter = installedChapter(host);

  host.tools = [];
  host.parts = [];
  host.trail = [];
  host.spawnT = 0.6;
  host.shake = 0;
  host.motor = 1;
  host.motorT = 0;
  host.reveal = 0;
  host.ghost = 0;
  host.streak = { kind: null, key: null, n: 0 };
  host.flash = 0;
  host.lit = 1;
  host.t = 0;
  host.nid = 0;
  host.sel = null;
  host.kbUsed = false;
  host.step = 0;
  host.blown = 0;
  host.doneT = 0;
  host.finished = false;
  host.coachKind = null;
  host.grabbed = new Set();
  host.aided = new Set();

  stockBench(host, cfg);
  host.session.mode = 'officina';
  host.session.mark();
}

// ─── update ──────────────────────────────────────

function update(host, dt) {
  host.t += dt;
  const c = host.cfg;
  if (!c) return;
  const ms = motionScale(host);

  if (host.motor === 0) {
    host.motorT -= dt;
    if (host.motorT <= 0) {
      host.motor = 1;
      host.tools = [];
      host.sel = null;
      host.spawnT = 0.5;
      if (host.blown >= 3) host.blown = 0;
    }
  }
  host.lit += ((host.motor ? 1 : 0.14) - host.lit) * Math.min(1, dt * 9);
  if (host.reveal > 0) host.reveal -= dt;
  if (host.flash > 0) host.flash -= dt * 4;
  if (host.shake > 0) host.shake -= dt * 3.4;
  if (host.ghost > 0 && host.ghost < 1.6) host.ghost += dt * ms;

  if (host.motor && !host.finished) {
    host.spawnT -= dt;
    if (host.spawnT <= 0 && airborne(host).length < c.air) {
      spawn(host);
      host.spawnT = c.spawn * (0.85 + Math.random() * 0.3);
    }
  }

  for (const t of host.tools) {
    t.cool = Math.max(0, t.cool - dt);
    if (t.grab) {
      t.grab += (dt * ms) / GRAB_S;
      const e = 1 - (1 - Math.min(1, t.grab)) ** 3;
      t.x = t.gx + (PIECE.x - t.gx) * e;
      t.y = t.gy + (PIECE.y - t.gy) * e;
      if (t.grab >= 1 && !t.gone) arrive(host, t);
      continue;
    }
    if (t.gone) continue;
    const slow = Math.abs(t.vy) < t.v0 * 0.3 ? 0.72 : 1;
    t.vy += t.g * slow * dt;
    t.y += t.vy * dt;
    t.x += t.vx * dt;
    if (t.x < 40 || t.x > W - 40) t.vx *= -1;
    if (t.y > H + 70) {
      t.gone = true;
      if (host.sel === t) host.sel = null;
      // The piece is finished: a cube still airborne falls without a thud,
      // without a step on the ladder, without a coach for a beat already won.
      if (host.finished) continue;
      if (t.want && t.grabs === 0) {
        // A wanted cube that falls is not a response: nothing is graded, and
        // the same term comes back up (§46.5).
        engine.snd(host, 'thud');
        host.shake = 0.8;
        engine.burst(host, host.parts, t.x, H - 140, 7, PAL.plum);
        err(host, 'miss', t.item, t.item);
      } else if (t.want && t.twice && t.grabs === 1) {
        engine.snd(host, 'thud', { v: 0.22 });
        host.shake = 0.6;
        err(host, 'half', t.item, t.item);
      } else if (!t.want) {
        engine.snd(host, 'fall');
        host.streak = { kind: null, key: null, n: 0 };
      }
    }
  }
  host.tools = host.tools.filter((t) => !t.gone || t.grab);
  host.parts = engine.parts(host.parts, dt, 520);
  for (const q of host.trail) q.t += dt;
  host.trail = host.trail.filter((q) => q.t < TRAIL_S);

  if (host.doneT > 0) {
    host.doneT -= dt;
    if (host.doneT <= 0) {
      host.doneT = 0;
      host.setState({ done: true });
    }
  }
}

// ─── input: a stroke through the cube, or a key ──

function drag(host, a, b) {
  if (host.finished) return;
  const dt = Math.max(8, (b.t || 0) - (a.t || 0)) / 1000;
  const sp = Math.hypot(b.x - a.x, b.y - a.y) / dt;
  host.trail.push({ x: b.x, y: b.y, t: 0 });
  if (host.trail.length > 26) host.trail.shift();
  if (sp >= MIN_SPEED) slice(host, a, b);
}

function sorted(host) {
  return airborne(host).sort((p, q) => p.x - q.x);
}

function key(host, e) {
  if (host.finished) return;
  const list = sorted(host);
  const n = list.length;
  host.kbUsed = true;
  const i = host.sel ? list.indexOf(host.sel) : -1;
  if (e.key === 'ArrowLeft') {
    host.sel = n ? list[((i < 0 ? 0 : i) - 1 + n) % n] : null;
    e.preventDefault();
  } else if (e.key === 'ArrowRight') {
    host.sel = n ? list[((i < 0 ? -1 : i) + 1) % n] : null;
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    host.sel = null;
    e.preventDefault();
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    if (host.sel && !host.sel.gone && !host.sel.grab) strike(host, host.sel);
  } else if (/^[1-3]$/.test(e.key)) {
    const k = parseInt(e.key, 10) - 1;
    if (list[k]) host.sel = list[k];
  }
}

// ─── drawing: register R6 ────────────────────────

/** A right prism in 30° isometry: top rhombus centred at (cx, cy). */
function prism(x, cx, cy, w, h, top, left, right) {
  const d = w * ISO;
  x.fillStyle = left;
  x.beginPath();
  x.moveTo(cx - w / 2, cy);
  x.lineTo(cx, cy + d / 2);
  x.lineTo(cx, cy + d / 2 + h);
  x.lineTo(cx - w / 2, cy + h);
  x.closePath();
  x.fill();
  x.fillStyle = right;
  x.beginPath();
  x.moveTo(cx, cy + d / 2);
  x.lineTo(cx + w / 2, cy);
  x.lineTo(cx + w / 2, cy + h);
  x.lineTo(cx, cy + d / 2 + h);
  x.closePath();
  x.fill();
  x.fillStyle = top;
  x.beginPath();
  x.moveTo(cx, cy - d / 2);
  x.lineTo(cx + w / 2, cy);
  x.lineTo(cx, cy + d / 2);
  x.lineTo(cx - w / 2, cy);
  x.closePath();
  x.fill();
}

function rhombus(x, cx, cy, w) {
  const d = w * ISO;
  x.beginPath();
  x.moveTo(cx, cy - d / 2);
  x.lineTo(cx + w / 2, cy);
  x.lineTo(cx, cy + d / 2);
  x.lineTo(cx - w / 2, cy);
  x.closePath();
}

function fitText(x, text, maxW, size, face, weight) {
  let f = size;
  x.font = `${weight} ${f}px ${face}`;
  while (x.measureText(text).width > maxW && f > 9) {
    f -= 1;
    x.font = `${weight} ${f}px ${face}`;
  }
  return f;
}

/** The pyramid: the folder tree is a stack of cubes (ricerca/42 §42.5, L5). */
function drawPyramid(x, lit) {
  for (let r = ROWS - 1; r >= 0; r--) {
    const cy = BY + r * ROW_STEP;
    for (let k = 0; k <= r; k++) {
      const cx = W / 2 + (k - r / 2) * CUBE.w;
      const dim = 1 - r * 0.14;
      x.globalAlpha = Math.max(0.3, dim * (0.5 + 0.5 * lit));
      prism(x, cx, cy, CUBE.w, CUBE.h, PAL.sand, PAL.orange, PAL.plum);
    }
  }
  x.globalAlpha = 1;
}

/** The piece: one small cube per grab, stacked on the bench. */
function drawPiece(x, host) {
  const n = host.needed || 1;
  const step = Math.min(host.step, n);
  const done = host.finished;
  for (let i = 0; i < step; i++) {
    const cy = PIECE.y + 26 - i * 9;
    prism(x, PIECE.x, cy, 40, 9, done ? PAL.teal : PAL.sand, PAL.orange, PAL.plum);
  }
  if (done) {
    x.globalAlpha = 0.35;
    x.fillStyle = PAL.teal;
    x.beginPath();
    x.arc(PIECE.x, PIECE.y + 10, 52, 0, 6.283);
    x.fill();
    x.globalAlpha = 1;
  }
}

/** The fitter: a ball with a snout, two eyes, two feet — R6's hopper. */
function drawFitter(x, host) {
  const still = host.reduceMotion;
  const bob = still ? 0 : Math.sin(host.t * 4) * 2;
  const cx = W / 2 - CUBE.w / 2;
  const cy = BY + CUBE.h + CUBE.d / 2 - 14 + bob;
  x.fillStyle = PAL.shadow;
  x.save();
  x.translate(cx, cy + 16);
  x.scale(1, 0.34);
  x.beginPath();
  x.arc(0, 0, 18, 0, 6.283);
  x.fill();
  x.restore();
  x.fillStyle = PAL.orange;
  x.beginPath();
  x.arc(cx, cy, 16, 0, 6.283);
  x.fill();
  x.beginPath();
  x.moveTo(cx + 8, cy + 2);
  x.lineTo(cx + 30, cy + 8);
  x.lineTo(cx + 10, cy + 12);
  x.closePath();
  x.fill();
  x.fillStyle = PAL.sand;
  x.beginPath();
  x.arc(cx - 4, cy - 5, 4, 0, 6.283);
  x.arc(cx + 6, cy - 5, 4, 0, 6.283);
  x.fill();
  x.fillStyle = PAL.shadow;
  x.fillRect(cx - 4, cy - 6, 2, 3);
  x.fillRect(cx + 6, cy - 6, 2, 3);
  x.fillStyle = PAL.plum;
  x.fillRect(cx - 12, cy + 12, 8, 5);
  x.fillRect(cx + 2, cy + 12, 8, 5);
}

/**
 * The lamp: a prism hanging over the bench; its light is the motor. R6 has no
 * realistic lighting (ricerca/42 §42.4): the light is one flat sand rhombus
 * on the wall around the bench, on or off with the motor.
 */
function drawLamp(x, host, lit) {
  const still = host.reduceMotion;
  const flick = still ? 1 : 0.97 + 0.03 * Math.sin(host.t * 13);
  x.strokeStyle = `rgba(255,217,142,${0.5 * lit})`;
  x.lineWidth = 2;
  x.beginPath();
  x.moveTo(W / 2, 0);
  x.lineTo(W / 2, 30);
  x.stroke();
  prism(x, W / 2, 40, 60, 16, PAL.sand, PAL.orange, PAL.plum);
  x.fillStyle = `rgba(255,217,142,${0.95 * lit * flick})`;
  x.beginPath();
  x.arc(W / 2, 62, 6, 0, 6.283);
  x.fill();
  x.fillStyle = `rgba(255,217,142,${0.16 * lit * flick})`;
  rhombus(x, W / 2, BY, CUBE.w * 2.6);
  x.fill();
}

/** Three lamps of the shift: one goes dark per blown motor. Never red. */
function drawLives(x, host, lit) {
  const inf = host.cfg.lives === Infinity;
  if (inf) return;
  for (let i = 0; i < 3; i++) {
    const bx = W - 34;
    const by = 128 + i * 46;
    const on = i >= host.blown;
    if (on) {
      prism(x, bx, by, 22, 10, PAL.sand, PAL.orange, PAL.plum);
      x.globalAlpha = 0.28 * lit;
      x.fillStyle = PAL.sand;
      x.beginPath();
      x.arc(bx, by + 4, 15, 0, 6.283);
      x.fill();
      x.globalAlpha = 1;
    } else {
      prism(x, bx, by, 22, 10, PAL.shadow, PAL.shadow, PAL.shadow);
      x.strokeStyle = PAL.plum;
      x.lineWidth = 1.4;
      rhombus(x, bx, by, 22);
      x.stroke();
    }
  }
}

/** The step counter: digits in a prism-shaped badge (ricerca/42 R6). */
function drawCounter(x, host) {
  const bx = 14;
  const by = 100;
  x.fillStyle = PAL.shadow;
  x.fillRect(bx + 6, by + 8, 74, 30);
  x.fillStyle = PAL.plum;
  x.fillRect(bx + 68, by - 4, 6, 34);
  x.fillStyle = PAL.sand;
  x.beginPath();
  x.moveTo(bx, by);
  x.lineTo(bx + 68, by);
  x.lineTo(bx + 74, by - 4);
  x.lineTo(bx + 6, by - 4);
  x.closePath();
  x.fill();
  x.fillStyle = PAL.night;
  x.fillRect(bx, by, 68, 30);
  x.strokeStyle = PAL.sand;
  x.lineWidth = 1.5;
  x.strokeRect(bx, by, 68, 30);
  x.fillStyle = PAL.sand;
  x.font = `700 17px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(`${host.step} / ${host.needed || 0}`, bx + 34, by + 16);
}

/**
 * The bench's list: what it owns, in Italian (the world speaks Italian,
 * ricerca/34 §34.1). A grabbed term turns its cube teal; the reveal (second
 * error) prints the English name on every line for 400 ms, and an aided term
 * keeps its name lit until the beat ends.
 */
function drawBench(x, host) {
  const reveal = host.reveal > 0;
  const showAll = reveal;
  host.wanted.forEach((it, i) => {
    const y = SLAB_Y + i * SLAB_PITCH;
    const got = host.grabbed.has(it.key);
    const aided = host.aided.has(it.key);
    const cubeX = 108;
    prism(x, cubeX, y + 6, 16, 8, got ? PAL.teal : PAL.sand, PAL.orange, PAL.plum);
    x.fillStyle = PAL.shadow;
    x.fillRect(cubeX + 14, y - 4, 200, 22);
    if (aided) {
      x.strokeStyle = PAL.teal;
      x.lineWidth = 1.5;
      x.strokeRect(cubeX + 14, y - 4, 200, 22);
    }
    x.fillStyle = got ? PAL.teal : PAL.sand;
    const meaning = meaningOf(it, 'it');
    x.textAlign = 'left';
    x.textBaseline = 'middle';
    if (showAll || aided) {
      fitText(x, meaning, 108, 11, FONT, 600);
      x.fillText(meaning, cubeX + 20, y + 7);
      const name = labelOf(it);
      fitText(x, name, 82, 11, MONO, 500);
      x.fillStyle = PAL.teal;
      x.textAlign = 'right';
      x.fillText(name, cubeX + 208, y + 7);
    } else {
      fitText(x, meaning, 190, 12, FONT, 600);
      x.fillText(meaning, cubeX + 20, y + 7);
    }
  });
  if (reveal) {
    x.globalAlpha = Math.min(1, host.reveal / REVEAL_S) * 0.25;
    x.fillStyle = PAL.sand;
    x.fillRect(100, SLAB_Y - 12, 230, host.wanted.length * SLAB_PITCH + 10);
    x.globalAlpha = 1;
  }
}

/** A cube-attrezzo: three faces, hard shadow, the English name on top. */
function drawTool(x, host, t) {
  x.save();
  fitText(x, t.name, 160, 14, MONO, 500);
  const tw = x.measureText(t.name).width;
  const w = Math.max(96, tw + 44);
  const d = w * ISO;
  const h = t.shape;
  t.len = w + 24;
  const sel = host.kbUsed && host.sel === t;
  x.fillStyle = PAL.shadow;
  rhombus(x, t.x + 8, t.y + h + 8, w);
  x.fill();
  prism(x, t.x, t.y, w, h, PAL.sand, PAL.orange, PAL.plum);
  // The right cube after a second error, or the keyboard's pick: one flat
  // teal ring around the top face (the register's target colour, no halo).
  if (t.glow || sel) {
    x.strokeStyle = PAL.teal;
    x.lineWidth = 2.5;
    rhombus(x, t.x, t.y, w + 8);
    x.stroke();
  }
  if (t.twice) {
    x.fillStyle = t.grabs > 0 ? PAL.teal : PAL.shadow;
    x.beginPath();
    x.moveTo(t.x - 6, t.y - d / 2 + 3);
    x.lineTo(t.x + 6, t.y - d / 2 + 3);
    x.lineTo(t.x + w / 2 - 3, t.y - 3);
    x.lineTo(t.x + w / 2 - 3, t.y + 3);
    x.closePath();
    x.fill();
  }
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillStyle = 'rgba(255,255,255,.22)';
  x.fillText(t.name, t.x, t.y + 1.2);
  x.fillStyle = PAL.shadow;
  x.fillText(t.name, t.x, t.y);
  x.restore();
}

function drawTrail(x, host) {
  if (host.trail.length < 2) return;
  x.lineCap = 'round';
  for (let i = 1; i < host.trail.length; i++) {
    const q = host.trail[i];
    const p = host.trail[i - 1];
    const k = i / host.trail.length;
    const a = Math.max(0, 1 - q.t / TRAIL_S);
    x.strokeStyle = `rgba(63,224,197,${a * a * 0.75})`;
    x.lineWidth = 1 + k * 6;
    x.beginPath();
    x.moveTo(p.x, p.y);
    x.lineTo(q.x, q.y);
    x.stroke();
  }
}

/** TEST 3: on the very first cube a dashed stroke shows the gesture. */
function drawGhost(x, host) {
  if (!(host.ghost > 0 && host.ghost < 1.6 && host.tools.length)) return;
  const t = host.tools[0];
  const k = Math.min(1, host.ghost / 1.2);
  if (x.setLineDash) x.setLineDash([5, 7]);
  x.strokeStyle = 'rgba(63,224,197,.4)';
  x.lineWidth = 2;
  x.beginPath();
  x.moveTo(t.x - 90, t.y + 34);
  x.lineTo(t.x + 90, t.y - 34);
  x.stroke();
  if (x.setLineDash) x.setLineDash([]);
  const gx = t.x - 90 + 180 * k;
  const gy = t.y + 34 - 68 * k;
  x.fillStyle = 'rgba(255,217,142,.85)';
  x.beginPath();
  x.arc(gx, gy, 7, 0, 6.283);
  x.fill();
  x.globalAlpha = 0.3;
  x.beginPath();
  x.arc(gx, gy, 16, 0, 6.283);
  x.fill();
  x.globalAlpha = 1;
}

function draw(host, x) {
  x.setTransform(host.sc, 0, 0, host.sc, 0, 0);
  x.clearRect(0, 0, W, H);
  const lit = host.lit == null ? 1 : host.lit;
  x.save();
  engine.shake(host, x, host.shake || 0);

  // Grafite notte, with a faint isometric grid: the workshop's tiled wall.
  x.fillStyle = PAL.night;
  x.fillRect(-8, -8, W + 16, H + 16);
  x.globalAlpha = 0.12 * lit;
  x.strokeStyle = PAL.plum;
  x.lineWidth = 1;
  for (let i = -H; i < W + H; i += 44) {
    x.beginPath();
    x.moveTo(i, 0);
    x.lineTo(i + H * 1.732, H);
    x.stroke();
    x.beginPath();
    x.moveTo(i, 0);
    x.lineTo(i - H * 1.732, H);
    x.stroke();
  }
  x.globalAlpha = 1;

  drawLamp(x, host, lit);
  if (host.cfg) drawLives(x, host, lit);
  drawCounter(x, host);
  drawBench(x, host);

  // The pit: the floor around the pyramid's lower rows is dark, with a hard
  // edge, and the cubes that miss the bench fall into it.
  x.fillStyle = PAL.shadow;
  x.fillRect(0, PIT_Y, W, H - PIT_Y);
  x.strokeStyle = PAL.plum;
  x.lineWidth = 1;
  x.globalAlpha = 0.6 * lit;
  x.beginPath();
  x.moveTo(0, PIT_Y);
  x.lineTo(W, PIT_Y);
  x.stroke();
  x.globalAlpha = 1;
  drawPyramid(x, lit);
  drawFitter(x, host);
  drawPiece(x, host);

  for (const t of host.tools) if (!t.gone || t.grab) drawTool(x, host, t);
  engine.drawParts(x, host.parts);
  drawTrail(x, host);
  drawGhost(x, host);

  if (host.flash > 0) {
    x.fillStyle = `rgba(255,217,142,${host.flash * 0.1})`;
    x.fillRect(0, 0, W, H);
  }
  if (lit < 0.9) {
    x.fillStyle = `rgba(16,16,24,${(1 - lit) * 0.82})`;
    x.fillRect(0, 0, W, H);
  }
  x.restore();
}

// ─── chrome copy (rendered by GameHost, written here) ─────

function coachText(host, coach, lang) {
  const L = TX[lang] || TX.it;
  const lines = L[coach.kind] || L.grab;
  const sub = (t) =>
    t
      .replace(/\{pick\}/g, coach.pick || '')
      .replace(/\{word\}/g, coach.word || '')
      .replace(/\{it\}/g, coach.it || '');
  return { what: sub(lines[0]), effect: sub(lines[1]), rule: sub(lines[2]), hint: L.hint };
}

/** The lesson a term belongs to, by membership: `item.lesson` is opaque here. */
function lessonOf(host, item) {
  const lessons = host.session && host.session.lessons ? host.session.lessons : [];
  return lessons.find((l) => l.items && l.items.includes(item)) || null;
}

function doneView(host, lang) {
  const L = TX[lang] || TX.it;
  const terms = host.terms && host.terms.length ? host.terms : [];
  const lesson = host.item ? lessonOf(host, host.item) : null;
  // The bench speaks Italian (ricerca/34 §34.1); the lesson title follows the UI.
  const tail = lesson ? ` · ${pickLang(lesson.title, lang)}` : '';
  return {
    eyebrow: L.eyebrow,
    title: terms.map(labelOf).join(' · '),
    subtitle: host.item ? `${L.bench}: ${meaningOf(host.item, 'it')}${tail}` : '',
  };
}

function onCoachClose(host) {
  host.streak = { kind: null, key: null, n: 0 };
  host.coachKind = null;
}

export default {
  meta: {
    id: 'nodejs-l5-officina',
    surface: 'nodejs',
    level: 4,
    band: 1,
    register: 'R6',
    title: "L'officina di notte",
    titleEn: 'The night workshop',
    levelLabel: 'Node.js · L5 File System e Path / Node.js · L5 File System & Path',
    font: '700 17px "Raleway"',
  },
  W,
  H,
  CH,
  drone: { freq: 58, type: 'triangle', volume: 0.018, lowpass: 0 },
  init,
  reset,
  update,
  draw,
  drag,
  key,
  coachText,
  doneView,
  onCoachClose,
};
