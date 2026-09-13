/**
 * LA CUCINA — chapters 1-4 of «La cucina e la sala di smistamento»
 * (Node.js L4 Asincrono Base). Port of knowledge-aio-giochi/templates/
 * nodejs-l6-cucina: the press-and-hold kitchen, in register R8 «Caramella e
 * bolle» (ricerca/42 §42.4).
 *
 * MECHANIC ... a customer comes to the counter with a ticket; the ticket says
 *   in Italian what they want. Three round pots stand on the floor, each with
 *   a sign painted in English. Press the pot whose sign says the ticket. The
 *   oven and the pan work alone once started (async: the hands are free
 *   after 1.5 / 1.2 s); the board holds the finger for its whole four seconds
 *   (sync). Let go of the board halfway and the dish is spoiled.
 * PALETTE ... indaco #2B2D5C (ground and outline) · crema #FDF3E7 (tickets,
 *   signs, bricks) · rosa #FF6B8A (hands, bricks) · giallo #FFD166 (progress
 *   ring, hint glow, the three bubbles) · azzurro #4CC9F0 (the pots) ·
 *   viola #9B5DE5 (the customers). White only as the 30 % highlight and the
 *   eyes. Never the app's gold.
 * FIGURE .... the customer: a round blob with two eyes, holding the ticket up.
 * GROUND .... a pastel brick floor the pots stand on, the counter above it.
 * MOVEMENT .. squash and stretch: the pot squashes while held, the customer
 *   bounces when impatient, a finished dish pops with 6-8 bubbles.
 * TYPEFACE .. Baloo 2, white numerals with an indigo outline.
 *
 * Under `prefers-reduced-motion` the hands and the pop-in run at 0.7×, the
 * decorative bubbles stand still, the impatient customer leans instead of
 * bouncing, the hint glow is a steady halo.
 */

import * as engine from '../../KaioEngine.js';
import { fillers, labelOf, meaningOf } from '../../LevelBeats.js';
import { ttsService } from '../../../services/TTSService.js';

export const W = 420;
export const H = 910;
export const MODE = 'asincrono';
export const FONT = '"Baloo 2","Nunito","Trebuchet MS",system-ui,sans-serif';

export const INDIGO = '#2B2D5C';
export const CREMA = '#FDF3E7';
export const ROSA = '#FF6B8A';
export const GIALLO = '#FFD166';
export const AZZURRO = '#4CC9F0';
export const VIOLA = '#9B5DE5';
export const PALETTE = [INDIGO, CREMA, ROSA, GIALLO, AZZURRO, VIOLA];

/* The three stations of the template: position, radius, sync (holds the
   hands for the whole duration), duration, hands time. */
export const ST = [
  { name: ['forno', 'oven'], x: W * 0.5, y: H * 0.44, r: 52, sync: false, dur: 6.0, hands: 1.5 },
  { name: ['tagliere', 'board'], x: W * 0.2, y: H * 0.62, r: 48, sync: true, dur: 4.0, hands: 4.0 },
  { name: ['padella', 'pan'], x: W * 0.8, y: H * 0.62, r: 48, sync: false, dur: 4.4, hands: 1.2 },
];
export const ORDER_SLOTS = [W * 0.16, W * 0.38, W * 0.6, W * 0.82];
export const ORDER_Y = H * 0.13;
export const HANDS0 = { x: W * 0.5, y: H * 0.78 };
const FLOOR_TOP = H * 0.35;
const FLOOR_BOTTOM = H * 0.72;
const TICKET_W = 86;
const SIGN_W = 100;
const SIGN_H = 36;

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

/* Beat: st active stations, max customers at once, arrive s, pat patience s,
   orders to serve, pair = the FRATTURA pair (board then oven together).
   Deviation from the template: never fewer than two stations — with one
   there is no meaning → term choice to grade (brief §2.2). */
const B = (o) => ({ st: [0, 1], max: 2, arrive: 7.0, pat: 30, orders: 4, pair: false, ...o });

export const CH = [
  {
    t: ['Premi e vai', 'Press and go'],
    titles: [
      ['Il forno', 'The oven'],
      ['Vai via', 'Walk away'],
      ['Due infornate', 'Two bakes'],
      ['Senza fermarti', 'No pause'],
      ['Il ritmo', 'The rhythm'],
    ],
    beats: [
      B({ st: [0, 2], max: 1, arrive: 8.0, pat: 38, orders: 3 }),
      B({ st: [0, 2], max: 1, arrive: 7.2, pat: 34, orders: 4 }),
      B({ st: [0, 2], max: 2, arrive: 6.4, pat: 30, orders: 4 }),
      B({ st: [0, 2], max: 3, arrive: 5.0, pat: 24, orders: 6 }),
      B({ st: [0, 2], max: 2, arrive: 6.6, pat: 30, orders: 5 }),
    ],
  },
  {
    t: ['Chi ti tiene', 'The one that holds'],
    titles: [
      ['Il tagliere', 'The board'],
      ['Non lasciarlo', 'Do not let go'],
      ['Quattro secondi', 'Four seconds'],
      ['Uno e uno', 'One and one'],
      ['Mano ferma', 'Steady hand'],
    ],
    beats: [
      B({ st: [1, 2], max: 1, arrive: 8.0, pat: 38, orders: 3 }),
      B({ st: [1, 2], max: 1, arrive: 7.2, pat: 34, orders: 4 }),
      B({ st: [0, 1], max: 2, arrive: 7.5, pat: 32, orders: 4 }),
      B({ st: [0, 1], max: 3, arrive: 5.6, pat: 26, orders: 5 }),
      B({ st: [0, 1], max: 2, arrive: 7.0, pat: 30, orders: 5 }),
    ],
  },
  {
    t: ['Tutti e due', 'Both at once'],
    titles: [
      ['Arrivano insieme', 'Together'],
      ["L'istinto sbagliato", 'The wrong instinct'],
      ['Prima il forno', 'Oven first'],
      ['Due coppie', 'Two pairs'],
      ['Adesso lo sai', 'Now you know'],
    ],
    beats: [
      B({ st: [0, 1], max: 2, arrive: 8.0, pat: 28, orders: 4, pair: true }),
      B({ st: [0, 1], max: 2, arrive: 7.4, pat: 26, orders: 5, pair: true }),
      B({ st: [0, 1], max: 2, arrive: 7.0, pat: 24, orders: 5, pair: true }),
      B({ st: [0, 1, 2], max: 4, arrive: 5.4, pat: 21, orders: 6, pair: true }),
      B({ st: [0, 1, 2], max: 3, arrive: 6.8, pat: 26, orders: 5 }),
    ],
  },
  {
    t: ['Sala piena', 'Full room'],
    titles: [
      ['Tre postazioni', 'Three stations'],
      ['Quattro ordini', 'Four orders'],
      ['La padella', 'The pan'],
      ['Il picco', 'The peak'],
      ['Il servizio', 'The service'],
    ],
    beats: [
      B({ st: [0, 1, 2], max: 3, arrive: 6.0, pat: 28, orders: 5 }),
      B({ st: [0, 1, 2], max: 4, arrive: 5.2, pat: 24, orders: 6 }),
      B({ st: [0, 1, 2], max: 4, arrive: 4.8, pat: 22, orders: 7 }),
      B({ st: [0, 1, 2], max: 4, arrive: 4.2, pat: 20, orders: 8 }),
      B({ st: [0, 1, 2], max: 3, arrive: 6.2, pat: 27, orders: 6 }),
    ],
  },
];

export const TX = {
  it: {
    wrong: [
      'Hai premuto la pentola sbagliata.',
      'Il biglietto diceva «{it}», ma sul cartello della pentola c’era scritto «{pick}».',
      'Sul biglietto c’è il significato, sul cartello il termine: «{it}» si cuoce nella pentola «{word}».',
    ],
    spoil: [
      'Hai lasciato il tagliere a metà.',
      'Il piatto «{word}» si è rovinato: quel lavoro va rifatto da capo.',
      'Chi ti tiene il dito ti tiene fino alla fine: «{word}» sul tagliere si finisce in una volta sola.',
    ],
    late: [
      'Un cliente se n’è andato mentre eri inchiodato.',
      'Chiedeva «{it}»: il forno poteva partire da solo e non è mai partito.',
      'Prima avvia quello che lavora da solo, poi usa le mani: «{word}» aspettava la sua pentola.',
    ],
    hint: 'biglietto → pentola col termine giusto; tieni premuto il tagliere · tastiera: 1-3 pentola, spazio lascia',
    eyebrow: 'Servizio chiuso',
  },
  en: {
    wrong: [
      'You pressed the wrong pot.',
      'The ticket said "{it}", but the sign on the pot read "{pick}".',
      'The ticket carries the meaning, the sign carries the term: "{it}" is cooked in the "{word}" pot.',
    ],
    spoil: [
      'You left the board halfway.',
      'The "{word}" dish is ruined: that work starts over.',
      'What holds your finger holds it to the end: "{word}" on the board is done in one go.',
    ],
    late: [
      'A customer left while you were pinned.',
      'They asked for "{it}": the oven could have started alone and never did.',
      'Start what works alone first, then use your hands: "{word}" was waiting for its pot.',
    ],
    hint: 'ticket → the pot with the right term; hold the board down · keyboard: 1-3 pot, space lets go',
    eyebrow: 'Service closed',
  },
};

// ─── the room ────────────────────────────────────

function alive(host) {
  return host.ord.filter((o) => !o.dead);
}

function open(host) {
  return host.ord.filter((o) => !o.dead && !o.started);
}

/* ricerca/35 §35.3.1: a term served is a term heard. */
function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

/**
 * The beat's own term must be asked until it has been cooked right once
 * (§46.5). While it has not, and no customer at the counter carries it, the
 * next customer to arrive asks for it.
 */
function needTerm(host) {
  if (host.termOk || host.termSt < 0) return false;
  return !alive(host).some((o) => o.item === host.item);
}

// ─── the error ladder (ricerca/00 passo 6) ───────

function openCoach(host, kind, pick, item) {
  host.coachKind = kind;
  host.setState({
    coach: { kind, pick: pick || '', word: labelOf(item), it: meaningOf(item, 'it') },
  });
}

/**
 * A graded error on one customer: 1st a puff of steam from the wrong pot and
 * a thud, 2nd the right sign lights up (the customer is now aided), 3rd the
 * coach with the term in the rule.
 */
function ladder(host, o, hob) {
  o.wrong++;
  engine.snd(host, 'thud', { v: 0.2 });
  host.shake = 0.3;
  engine.burst(host, host.parts, ST[hob].x, ST[hob].y - ST[hob].r, 7, CREMA, { up: 70 });
  if (o.wrong >= 2) {
    o.aided = true;
    host.pulse = 0.8;
    host.pulseSt = o.st;
  }
  if (o.wrong >= 3) {
    openCoach(host, 'wrong', labelOf(host.menu[hob]), o.item);
    o.wrong = 0;
  }
}

/** The template's streak for the errors that have no customer to count on. */
function streak(host, kind, item) {
  const s = host.streak;
  if (s.kind === kind) s.n++;
  else {
    s.kind = kind;
    s.n = 1;
  }
  if (s.n === 2) {
    host.pulse = 0.8;
    const st = host.cfg.st.find((i) => !ST[i].sync && open(host).some((o) => o.st === i));
    host.pulseSt = st == null ? -1 : st;
  }
  if (s.n >= 3) {
    openCoach(host, kind, '', item);
    host.streak = { kind: null, n: 0 };
  }
}

// ─── customers ───────────────────────────────────

function freeSlot(host) {
  const used = alive(host).map((o) => o.slot);
  for (let i = 0; i < ORDER_SLOTS.length; i++) if (!used.includes(i)) return i;
  return alive(host).length % ORDER_SLOTS.length;
}

function addOrder(host, st) {
  const c = host.cfg;
  const slot = freeSlot(host);
  const o = {
    id: host.nid++,
    st,
    item: host.menu[st],
    slot,
    x: ORDER_SLOTS[slot],
    pat: c.pat,
    pat0: c.pat,
    started: false,
    dead: false,
    wob: Math.random() * 6.28,
    in: 0,
    wrong: 0,
    aided: false,
    face: Math.floor(Math.random() * 3),
  };
  host.ord.push(o);
  host.spawned++;
  // The Italian ticket is the presentation (mastery stage 0 -> 1).
  o.item.introduce();
  return o;
}

function spawn(host) {
  const c = host.cfg;
  let st;
  if (host.spawned === host.trap) {
    // FRATTURA: the board's ticket comes in first, the oven's right behind.
    st = 1;
    host.pendingPair = true;
  } else if (needTerm(host)) st = host.termSt;
  else st = c.st[Math.floor(Math.random() * c.st.length)];
  addOrder(host, st);
  if (host.pendingPair) {
    host.pendingPair = false;
    addOrder(host, 0);
  }
  engine.snd(host, 'click', { hz: 1100, v: 0.14 });
}

// ─── the verb: press, hold, let go ───────────────

function hit(host, p) {
  for (const i of host.cfg.st) {
    if (Math.hypot(p.x - ST[i].x, p.y - ST[i].y) < ST[i].r + 8) return i;
  }
  return -1;
}

function press(host, i) {
  if (i < 0 || !host.cfg.st.includes(i)) return;
  const h = host.hands;
  if (h.busy > 0) {
    engine.snd(host, 'fall');
    host.shake = 0.4;
    return;
  }
  if (host.jobs[i]) {
    engine.snd(host, 'fall');
    return;
  }
  const waiting = open(host);
  const target = waiting.find((o) => o.st === i);
  const focus = target || waiting.slice().sort((a, b) => a.pat - b.pat)[0] || null;
  if (!focus) {
    engine.snd(host, 'fall');
    host.shake = 0.3;
    return;
  }
  // The pick is the graded response: the sign the learner pressed against the
  // term the ticket asks for, through the SDK (§46.1, §46.2).
  const verdict = focus.item.attempt(labelOf(host.menu[i]), {
    expected: labelOf(focus.item),
    mode: MODE,
    hintsUsed: focus.aided ? 1 : 0,
    silent: true,
  });
  host.session.mark();
  if (!verdict.correct) {
    ladder(host, focus, i);
    return;
  }
  if (focus.item === host.item) host.termOk = true;
  focus.started = true;
  const s = ST[i];
  host.jobs[i] = { o: focus, t: 0, dur: s.dur, ready: false };
  h.st = i;
  h.at = { x: s.x, y: s.y + s.r * 0.1 };
  h.busy = s.hands;
  h.total = s.hands;
  h.held = true;
  engine.snd(host, 'pop', { hz: s.sync ? 200 : 300, v: 0.12 });
}

function release(host) {
  const h = host.hands;
  h.held = false;
  if (h.busy > 0 && h.st >= 0 && ST[h.st].sync) {
    const j = host.jobs[h.st];
    let item = host.item;
    if (j) {
      j.o.started = false;
      item = j.o.item;
      host.jobs[h.st] = null;
    }
    h.busy = 0;
    h.st = -1;
    h.at = null;
    engine.snd(host, 'whir');
    host.shake = 0.6;
    engine.burst(host, host.parts, ST[1].x, ST[1].y, 10, VIOLA, { up: 60 });
    streak(host, 'spoil', item);
  }
}

function serveOut(host, i) {
  const j = host.jobs[i];
  const s = ST[i];
  j.ready = true;
  j.o.dead = true;
  host.made++;
  host.flash = 1;
  host.jobs[i] = null;
  j.o.item.clear();
  say(host, labelOf(j.o.item));
  engine.snd(host, 'tone', { from: 600, to: 960, v: 0.17 });
  engine.burst(host, host.parts, s.x, s.y, 12, GIALLO, { up: 90 });
  host.setState({ step: host.made });
  persist(host);
  if (host.made >= host.needed) {
    for (const t of host.terms) if (t.correct > 0) t.clear();
    host.finished = true;
    engine.snd(host, 'chime');
    // As in the template: the service is closed, the done screen is immediate.
    host.setState({ done: true });
  }
}

/**
 * A customer who leaves is not a graded response: the learner produced
 * nothing. The place stays empty — that is the punishment (ricerca/10 §10.7).
 */
function lose(host, o) {
  o.dead = true;
  host.gone++;
  engine.snd(host, 'whir');
  host.shake = 0.7;
  if (o.started && host.jobs[o.st] && host.jobs[o.st].o === o) host.jobs[o.st] = null;
  host.setState({ left: host.gone });
  streak(host, 'late', o.item);
}

// ─── lifecycle ───────────────────────────────────

function init(host) {
  host.ord = [];
  host.jobs = ST.map(() => null);
  host.menu = ST.map(() => null);
  host.hands = { x: HANDS0.x, y: HANDS0.y, at: null, busy: 0, total: 0, st: -1, held: false };
  host.termSt = -1;
  host.termOk = false;
  host.streak = { kind: null, n: 0 };
  host.made = 0;
  host.needed = 0;
  host.gone = 0;
  host.spawned = 0;
  host.trap = -1;
  host.pendingPair = false;
  host.pulse = 0;
  host.pulseSt = -1;
  host.shake = 0;
  host.flash = 0;
  host.arriveT = 1;
  host.nid = 0;
}

function reset(host, beat) {
  const cfg = host.BEATS[beat];
  host.cfg = cfg;
  host.needed = cfg.orders;

  // The spine: the beat's term plus real neighbours from the same lesson, on
  // the active pots in shuffled places; the idle pots carry no sign.
  const extra = host.item
    ? fillers(host.session, host.item, cfg.st.length - host.terms.length)
    : [];
  const signs = shuffle(host.terms.concat(extra)).slice(0, cfg.st.length);
  host.menu = ST.map(() => null);
  cfg.st.forEach((i, k) => {
    host.menu[i] = signs[k] || null;
  });
  host.termSt = host.menu.indexOf(host.item);
  host.termOk = false;

  host.ord = [];
  host.jobs = ST.map(() => null);
  host.hands = { x: HANDS0.x, y: HANDS0.y, at: null, busy: 0, total: 0, st: -1, held: false };
  host.arriveT = 1.0;
  host.made = 0;
  host.gone = 0;
  host.spawned = 0;
  host.streak = { kind: null, n: 0 };
  host.pulse = 0;
  host.pulseSt = -1;
  host.shake = 0;
  host.flash = 0;
  host.nid = 0;
  host.pendingPair = false;
  // FRATTURA: the template trapped beat 3 of every chapter; here the pair
  // needs both the board and the oven at work, and the `pair` knob is live.
  const both = cfg.st.includes(0) && cfg.st.includes(1);
  host.trap = both && (cfg.pair || beat === 2) ? 1 : -1;
}

// ─── update ──────────────────────────────────────

function update(host, dt) {
  const c = host.cfg;
  const h = host.hands;
  const m = host.motion || 1;

  if (host.flash > 0) host.flash -= dt * 3;
  if (host.shake > 0) host.shake -= dt * 3.4;
  if (host.pulse > 0) host.pulse -= dt;

  if (!host.finished) {
    host.arriveT -= dt;
    if (host.arriveT <= 0 && alive(host).length < c.max && host.spawned < host.needed + host.gone) {
      spawn(host);
      host.arriveT = c.arrive * (0.85 + Math.random() * 0.3);
    }
  }

  if (h.busy > 0) {
    h.busy -= dt;
    if (h.at) {
      h.x += (h.at.x - h.x) * Math.min(1, dt * 8 * m);
      h.y += (h.at.y - h.y) * Math.min(1, dt * 8 * m);
    }
    if (h.busy <= 0) {
      h.busy = 0;
      h.st = -1;
      h.at = null;
      h.held = false;
    }
  } else {
    h.x += (HANDS0.x - h.x) * Math.min(1, dt * 3 * m);
    h.y += (HANDS0.y - h.y) * Math.min(1, dt * 3 * m);
  }

  for (let i = 0; i < ST.length; i++) {
    const j = host.jobs[i];
    if (!j) continue;
    const s = ST[i];
    const active = s.sync ? h.st === i && h.busy > 0 : true;
    if (active) j.t += dt;
    if (j.t >= j.dur && !j.ready) {
      serveOut(host, i);
      if (host.finished) return;
    }
  }

  for (const o of host.ord) {
    if (o.dead) continue;
    o.in = Math.min(1, o.in + dt * 2.4 * m);
    o.wob += dt * 2.2;
    o.pat -= dt;
    if (o.pat <= 0) {
      lose(host, o);
      if (host.gone >= 3) {
        // Three gone: the room empties and the service starts over. The coach
        // the third loss may have opened stays open over the fresh service.
        const coachKind = host.coachKind;
        reset(host, host.state.beat);
        host.coachKind = coachKind;
        host.setState({ step: 0, left: 0 });
        return;
      }
    }
  }
  host.ord = host.ord.filter((o) => !o.dead);
  host.parts = engine.parts(host.parts, dt, 420);
}

// ─── input: press a pot, hold it, let go ─────────

function down(host, p) {
  if (host.finished) return;
  const i = hit(host, p);
  if (i < 0) {
    engine.snd(host, 'fall', { v: 0.08 });
    return;
  }
  press(host, i);
}

function up(host) {
  release(host);
}

/**
 * The same game with no pointer: 1-3 press the pot in that place (oven,
 * board, pan), space / Enter let go of the board.
 */
function key(host, e) {
  if (host.finished) return;
  host.kbUsed = true;
  if (/^[1-3]$/.test(e.key)) {
    e.preventDefault();
    press(host, parseInt(e.key, 10) - 1);
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    release(host);
  }
}

function onCoachClose(host) {
  host.streak = { kind: null, n: 0 };
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

/** A candy blob: a filled circle, an indigo outline, the 30 % highlight. */
function blob(x, cx, cy, r, fill, sx, sy) {
  x.save();
  x.translate(cx, cy);
  x.scale(sx || 1, sy || 1);
  x.fillStyle = fill;
  x.beginPath();
  x.arc(0, 0, r, 0, 6.283);
  x.fill();
  x.strokeStyle = INDIGO;
  x.lineWidth = 2;
  x.stroke();
  x.fillStyle = 'rgba(255,255,255,.3)';
  x.beginPath();
  x.arc(-r * 0.35, -r * 0.4, r * 0.28, 0, 6.283);
  x.fill();
  x.restore();
}

function eyes(x, cx, cy, away) {
  if (away) return;
  x.fillStyle = '#FFFFFF';
  x.beginPath();
  x.arc(cx - 6, cy - 2, 4, 0, 6.283);
  x.arc(cx + 6, cy - 2, 4, 0, 6.283);
  x.fill();
  x.fillStyle = INDIGO;
  x.beginPath();
  x.arc(cx - 5, cy - 2, 2, 0, 6.283);
  x.arc(cx + 7, cy - 2, 2, 0, 6.283);
  x.fill();
}

function drawBackdrop(host, x) {
  x.fillStyle = INDIGO;
  x.fillRect(-8, -8, W + 16, H + 16);
  // Decorative bubbles rise through the room; under reduced motion they hang.
  const still = host.reduceMotion;
  x.strokeStyle = 'rgba(255,255,255,.14)';
  x.lineWidth = 1.5;
  for (let k = 0; k < 9; k++) {
    const bx = 30 + ((k * 97) % (W - 60));
    const drift = still ? 0 : (host.t * (14 + (k % 3) * 5)) % (H + 60);
    const by = ((((k * 131) % H) - drift + H + 60) % (H + 60)) - 30;
    x.beginPath();
    x.arc(bx, by, 5 + (k % 4) * 3, 0, 6.283);
    x.stroke();
  }
  // The pastel brick floor the pots stand on.
  const rowH = 26;
  for (let r = 0, y = FLOOR_TOP; y < FLOOR_BOTTOM; y += rowH, r++) {
    const off = r % 2 ? 30 : 0;
    for (let bx = -60 + off; bx < W; bx += 60) {
      x.fillStyle = (Math.floor((bx + 60) / 60) + r) % 3 === 0 ? ROSA : CREMA;
      engine.rr(x, bx + 1, y + 1, 58, rowH - 2, 5);
      x.fill();
    }
  }
  // The counter the customers lean on, and its edge.
  x.fillStyle = CREMA;
  engine.rr(x, -4, ORDER_Y + 58, W + 8, 22, 8);
  x.fill();
  x.fillStyle = ROSA;
  x.fillRect(0, ORDER_Y + 76, W, 6);
  x.fillStyle = ROSA;
  x.fillRect(0, FLOOR_BOTTOM, W, 8);
}

function drawCustomer(host, x, o) {
  const st = o.pat / o.pat0;
  const still = host.reduceMotion;
  const y = ORDER_Y - 30 * (1 - o.in);
  const impatient = st < 0.66 && !o.started;
  const leaving = st < 0.34 && !o.started;
  let jx = 0;
  let jy = 0;
  if (impatient) jx = still ? 3 : Math.sin(o.wob * 4.4) * 3;
  if (leaving) jy = still ? -4 : -Math.abs(Math.sin(o.wob * 8)) * 8;
  const cx = o.x + jx;
  const cy = y + 32 + jy;
  const bodies = [VIOLA, VIOLA, AZZURRO];
  const squash = leaving && !still ? 1 + 0.08 * Math.sin(o.wob * 8) : 1;
  blob(x, cx, cy, 22, bodies[o.face], 1 / squash, squash);
  eyes(x, cx, cy, leaving);
  // The ticket, held up: it speaks Italian (ricerca/34 §34.1).
  x.save();
  if (o.started) x.globalAlpha = 0.4;
  x.font = `700 11px ${FONT}`;
  const ls = wrapLines(x, meaningOf(o.item, 'it'), TICKET_W - 12, 3);
  const th = ls.length * 13 + 12;
  const tx = Math.min(W - TICKET_W - 2, Math.max(2, cx - TICKET_W / 2));
  const ty = y - 26 - th;
  x.fillStyle = CREMA;
  engine.rr(x, tx, ty, TICKET_W, th, 7);
  x.fill();
  x.strokeStyle = INDIGO;
  x.lineWidth = 2;
  x.stroke();
  x.fillStyle = INDIGO;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  ls.forEach((l, i) => x.fillText(l, tx + TICKET_W / 2, ty + 6 + 6.5 + i * 13));
  x.restore();
  if (impatient) {
    // A small exclamation bubble, steady under reduced motion.
    x.fillStyle = GIALLO;
    x.beginPath();
    x.arc(cx + 24, cy - 26, 6, 0, 6.283);
    x.fill();
    x.strokeStyle = INDIGO;
    x.lineWidth = 2;
    x.stroke();
  }
}

function drawMark(x, i, cx, cy, s) {
  const k = s || 1;
  x.strokeStyle = INDIGO;
  x.lineWidth = 2.5 * k;
  x.beginPath();
  if (i === 0) {
    x.rect(cx - 9 * k, cy - 7 * k, 18 * k, 14 * k);
    x.stroke();
    x.beginPath();
    x.moveTo(cx - 9 * k, cy);
    x.lineTo(cx + 9 * k, cy);
    x.stroke();
  } else if (i === 1) {
    x.moveTo(cx - 10 * k, cy + 6 * k);
    x.lineTo(cx + 10 * k, cy + 6 * k);
    x.stroke();
    x.beginPath();
    x.moveTo(cx - 4 * k, cy - 7 * k);
    x.lineTo(cx + 8 * k, cy + 3 * k);
    x.stroke();
  } else {
    x.arc(cx, cy, 8 * k, 0, 6.283);
    x.stroke();
    x.beginPath();
    x.moveTo(cx + 8 * k, cy);
    x.lineTo(cx + 15 * k, cy - 3 * k);
    x.stroke();
  }
}

function drawRing(x, cx, cy, r, colour, n) {
  x.fillStyle = colour;
  for (let k = 0; k < n; k++) {
    const a = (k / n) * 6.283;
    x.beginPath();
    x.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 3, 0, 6.283);
    x.fill();
  }
}

function drawStation(host, x, i) {
  const s = ST[i];
  const j = host.jobs[i];
  const h = host.hands;
  const held = h.st === i && h.busy > 0;
  const still = host.reduceMotion;
  const item = host.menu[i];
  // The pot: squashed while held (a steady squash under reduced motion).
  const sq = held ? 1.08 : 1;
  blob(x, s.x, s.y, s.r, AZZURRO, sq, 1 / sq);
  drawMark(x, i, s.x, s.y - 4, 1.6);
  x.fillStyle = INDIGO;
  x.font = `700 12px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(s.name[host.state.lang === 'en' ? 1 : 0], s.x, s.y + 22);
  if (j) {
    const k = Math.min(1, j.t / j.dur);
    x.strokeStyle = GIALLO;
    x.lineWidth = 5;
    x.beginPath();
    x.arc(s.x, s.y, s.r + 9, -1.57, -1.57 + 6.283 * k);
    x.stroke();
    // A pot working alone: a ring of bubbles, no hands on it.
    if (!s.sync && !held) drawRing(x, s.x, s.y, s.r + 19, CREMA, 12);
  }
  // The sign: the English term, the thing you pick between.
  const sy = s.y + s.r + 14;
  const sx = s.x - SIGN_W / 2;
  x.save();
  if (host.pulse > 0 && host.pulseSt === i) {
    x.shadowColor = GIALLO;
    x.shadowBlur = still ? 18 : 14 + 8 * Math.sin(host.pulse * 14);
  }
  x.fillStyle = CREMA;
  engine.rr(x, sx, sy, SIGN_W, SIGN_H, 8);
  x.fill();
  x.shadowBlur = 0;
  x.strokeStyle = INDIGO;
  x.lineWidth = 2;
  engine.rr(x, sx, sy, SIGN_W, SIGN_H, 8);
  x.stroke();
  x.restore();
  if (item) {
    x.fillStyle = INDIGO;
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    let f = 14;
    x.font = `700 ${f}px ${FONT}`;
    while (x.measureText(labelOf(item)).width > SIGN_W - 10 && f > 9) {
      f--;
      x.font = `700 ${f}px ${FONT}`;
    }
    x.fillText(labelOf(item), s.x, sy + SIGN_H / 2);
  }
  if (host.kbUsed) {
    x.fillStyle = CREMA;
    x.font = `700 14px ${FONT}`;
    x.fillText(String(i + 1), s.x, sy + SIGN_H + 12);
  }
}

function drawHands(host, x) {
  const h = host.hands;
  const pinned = h.st >= 0 && ST[h.st] && ST[h.st].sync && h.busy > 0;
  blob(x, h.x, h.y, 17, ROSA, 1.15, 0.9);
  x.fillStyle = INDIGO;
  x.fillRect(h.x - 10, h.y - 14, 3, 8);
  x.fillRect(h.x - 3, h.y - 16, 3, 10);
  x.fillRect(h.x + 4, h.y - 15, 3, 9);
  if (pinned) drawRing(x, h.x, h.y, 27, GIALLO, 10);
}

function drawHud(host, x) {
  // Numerals in the register's face: white with an indigo outline.
  x.font = `800 24px ${FONT}`;
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  x.lineWidth = 4;
  x.strokeStyle = INDIGO;
  const s = `${host.made} / ${host.needed}`;
  x.strokeText(s, 14, 26);
  x.fillStyle = '#FFFFFF';
  x.fillText(s, 14, 26);
  // Three bubbles: a customer who left pops one.
  for (let i = 0; i < 3; i++) {
    const off = i < host.gone;
    x.beginPath();
    x.arc(W - 22 - i * 24, 26, 7, 0, 6.283);
    if (off) {
      x.strokeStyle = GIALLO;
      x.lineWidth = 2;
      x.stroke();
    } else {
      x.fillStyle = GIALLO;
      x.fill();
    }
  }
}

function draw(host, x) {
  x.setTransform(host.sc || 1, 0, 0, host.sc || 1, 0, 0);
  x.clearRect(0, 0, W, H);
  x.save();
  engine.shake(host, x, host.shake);
  drawBackdrop(host, x);
  for (const o of host.ord) if (!o.dead) drawCustomer(host, x, o);
  for (const i of host.cfg.st) drawStation(host, x, i);
  // Idle pots: hollow, no sign.
  for (let i = 0; i < ST.length; i++) {
    if (host.cfg.st.includes(i)) continue;
    x.strokeStyle = 'rgba(255,255,255,.14)';
    x.lineWidth = 2;
    x.beginPath();
    x.arc(ST[i].x, ST[i].y, ST[i].r * 0.7, 0, 6.283);
    x.stroke();
  }
  drawHands(host, x);
  drawHud(host, x);
  engine.drawParts(x, host.parts);
  if (host.flash > 0) {
    x.fillStyle = `rgba(255,255,255,${(host.flash * 0.1).toFixed(3)})`;
    x.fillRect(0, 0, W, H);
  }
  x.restore();
}

export default {
  CH,
  TX,
  ST,
  init,
  reset,
  update,
  draw,
  down,
  up,
  key,
  onCoachClose,
  eyebrow: { it: TX.it.eyebrow, en: TX.en.eyebrow },
};
