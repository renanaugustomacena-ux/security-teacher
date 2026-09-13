/**
 * IL LASCIAPASSARE — Node.js L11 «Autenticazione».
 * Porta di knowledge-aio-giochi/templates/nodejs-l11-lasciapassare (il punzone
 * sul sigillo) con la spina del vocabolario (LevelBeats): 4 lezioni × 10 termini
 * = 40, un termine per beat, 8 capitoli × 5 beat.
 *
 * SCHEDA DI PROGETTO (ricerca/00 §0.3) + SCHEDA VISIVA (ricerca/42 §42.3)
 * GIOCO ...... Il lasciapassare
 * TOPIC ...... Node.js, L11 Autenticazione, banda 2 (js/topics/data/nodejs.js levels[10])
 * CONCETTO ... Chi dice di essere qualcuno deve portare una prova che non può
 *              essersi fabbricato da solo. Il sigillo si controlla col punzone,
 *              non si legge: quello che c'è scritto sopra lo scrive chi passa.
 *              Il punzone giusto è quello inciso col nome inglese di ciò per cui
 *              il lasciapassare è stato rilasciato (scritto in italiano sul foglio).
 * FORMA ...... identità   VERBO ... confrontare: calare il punzone sul sigillo,
 *              poi tirare la leva (ammesso / respinto)
 * ARCHETIPO .. nuovo, parente di ricerca/14 (identità) — il punzone
 * VINCI SE ... tutti i lasciapassare del beat sono giudicati bene, e il termine
 *              del beat è passato dal banco
 * PERDI SE ... tre giudizi sbagliati (o scaduti): il varco viene chiuso e il
 *              beat ricomincia
 * SBAGLI ..... punzone: 1 non entra e rimbalza, tonfo · 2 il punzone giusto si
 *              accende (magenta) · 3 coaching: cosa hai calato, cosa c'era scritto,
 *              il termine inglese; poi la scala riparte (il punzone resta acceso)
 *              giudizio (dal template): 1 scossone · 2 la riga del foglio che non
 *              torna pulsa · 3 coaching letIn / kept
 * CAPITOLI ... 1 il punzone · 2 la firma · 3 FRATTURA il timbro si legge, non prova
 *              4 la scadenza · 5 chi l'ha firmato · 6 i diritti scritti dentro
 *              7 a raffica · 8 il varco intero
 * MONDO ...... il gabbiotto del varco: una fila ordinata di portatori che marciano
 *              a scatti, il banco, la rastrelliera dei punzoni incisi in inglese,
 *              due leve, i tre bunker che si sbriciolano
 * REGISTRO ... R3 Gel su nero: fondo #000000, bande di gel che tingono tutto ciò
 *              che le attraversa — rosso #FF5A5A in alto (il gabbiotto e il
 *              contatore), bianco #F2F2F2 al centro (la fila e il banco), verde
 *              #3DFF6E in basso (punzoni, leve, suolo e bunker), magenta #FF61C6
 *              per il punzone che si accende. Nessuno sprite ha un colore suo.
 *              figura: il portatore (sprite 11×8, due fotogrammi) · suolo: la
 *              linea verde con i tre bunker
 *              movimento: a passo di marcia — la fila avanza a scatti che
 *              accelerano man mano che si accorcia, il punzone cala in tre scatti,
 *              nessuna interpolazione
 *              carattere: cifre a sette segmenti, etichette in monospaziato
 * NUMERI ..... transito 3,6→2,0 s dopo il sigillo (template), più 1,4 s + 0,6 s
 *              per punzone per leggere il foglio; punzoni 2→4; tre bunker; il beat
 *              finisce all'ultimo giudizio, senza ritardo (template); il varco
 *              chiuso resta giù 1,2 s e nessun lasciapassare arriva sotto la saracinesca
 * DEVIAZIONI . ogni lasciapassare giudicato bene chiude (clear) il suo termine
 *              subito, come la taverna di riferimento: i riempitivi non sono in
 *              host.terms e altrimenti resterebbero «attempted»; il beat resta
 *              vinto solo quando anche il termine del beat è passato dal banco
 * TEST 1 ..... i lasciapassare sono identici, i punzoni sono identici: cambia
 *              solo cosa c'è inciso, e la posizione sulla rastrelliera cambia a
 *              ogni lasciapassare. Nessun colore aiuta.
 * TEST 2 ..... "Leggo per cosa è stato rilasciato, calo il punzone con quel nome
 *              inglese, guardo se il sigillo combacia e decido, prima che scada"
 * TEST 3 ..... un lasciapassare arriva sul banco e i punzoni pendono sopra
 */

import * as engine from '../KaioEngine.js';
import { ttsService } from '../../services/TTSService.js';
import {
  beatItems,
  beatLesson,
  distractors,
  fillers,
  labelOf,
  meaningOf,
  pickLang,
} from '../LevelBeats.js';
import { CH, TX } from '../parts/nodejs-l11-lasciapassare/chapters.js';
import {
  CARRIER,
  EMBLEM,
  BUNKER,
  wrapLines,
  fitText,
  drawBitmap,
  drawSeg,
} from '../parts/nodejs-l11-lasciapassare/glass.js';

const W = 420;
const H = 910;
const MODE = 'lasciapassare';

// ─── the glass: bands, desk, rail, levers, ground ──
const BAND_RED = 150;
const BAND_GREEN = 590;
const QUEUE_Y = 214;
const CARD_W = 250;
const CARD_H = 130;
const CARD_X = (W - CARD_W) / 2;
const CARD_Y = 300;
const DESK_LINE = 444;
const SEAL = { x: CARD_X + CARD_W - 44, y: CARD_Y + CARD_H / 2, r: 28 };
const RAIL_Y = 612;
const HEAD_Y = 640;
const HEAD_W = 86;
const HEAD_H = 50;
const LEVER = {
  admit: { x: W * 0.26, y: H * 0.86 },
  deny: { x: W * 0.74, y: H * 0.86 },
};
const LEVER_R = 44;
const GROUND_Y = 880;
const BUNKERS = [90, 210, 330];

const PUNCH_STEPS = 3;
const PUNCH_STEP_S = 0.09;
const EXIT_STEPS = 3;
const EXIT_STEP_S = 0.12;
const WAIT_S = 0.5;
const FIRST_WAIT_S = 0.6;
const SHUT_S = 1.2;

const INK = '#F2F2F2';
const GEL = { red: '#FF5A5A', white: '#F2F2F2', green: '#3DFF6E', magenta: '#FF61C6' };
const FONT = '"Courier New",Courier,monospace';

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

// ─── the rules of the gate (template) ────────────

/** Why a pass does not hold under this beat's active checks, or 'none'. */
function whyOf(cfg, p) {
  if (!p.sig) return 'sig';
  if (cfg.checkExp && p.exp) return 'exp';
  if (cfg.checkIss && p.issuer !== 'casa') return 'iss';
  if (cfg.checkRole && p.role !== p.claim) return 'role';
  return 'none';
}

function ok(cfg, p) {
  return whyOf(cfg, p) === 'none';
}

function motionOf(host) {
  return host.reduceMotion ? 0.7 : 1;
}

/* ricerca/35 §35.3.1: a term matched is a term heard. */
function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

// ─── the rail: which punches hang over this pass ──

function layoutPunches(host, item) {
  const n = host.cfg.punches;
  const options = shuffle([item].concat(distractors(host.session, item, n - 1)));
  const spacing = Math.min(100, (W - 20) / options.length);
  host.punches = options.map((it, i) => ({
    item: it,
    i,
    x: W / 2 + (i - (options.length - 1) / 2) * spacing,
    y: HEAD_Y,
    glow: 0,
  }));
}

/* The pass steps onto the desk: the Italian on the sheet is the presentation. */
function land(host) {
  const cfg = host.cfg;
  const idx = host.pi % cfg.passes.length;
  const src = cfg.passes[idx];
  const item = host.passItems[idx];
  host.cur = {
    ...src,
    item,
    t: 0,
    limit: cfg.fall + host.pick,
    wrong: 0,
    aided: false,
    stamped: false,
    shake: 0,
  };
  item.introduce();
  host.session.mark();
  layoutPunches(host, item);
  engine.snd(host, 'click', { hz: 1200, v: 0.2 });
}

function nextPass(host, dir) {
  if (host.cur) host.exit = { dir, k: 0, t: 0 };
  host.cur = null;
  host.press = null;
  host.punches = [];
  host.sel = -1;
  host.wait = WAIT_S;
  host.pi++;
}

// ─── lifecycle ───────────────────────────────────

function init(host) {
  host.parts = [];
  host.terms = [];
  host.item = null;
  host.lesson = null;
  host.chapter = 0;
  host.cfg = null;
  host.passItems = [];
  host.punches = [];
  host.cur = null;
  host.press = null;
  host.exit = null;
  host.won = new Set();
  host.pi = 0;
  host.made = 0;
  host.bad = 0;
  host.wait = FIRST_WAIT_S;
  host.pick = 0;
  host.t = 0;
  host.shake = 0;
  host.flash = 0;
  host.pulse = 0;
  host.shut = 0;
  host.leverShake = 0;
  host.streak = { kind: null, n: 0 };
  host.marchT = 0;
  host.marchF = 0;
  host.marchX = 0;
  host.sel = -1;
  host.kbUsed = false;
  host.finished = false;
  host.coachKind = null;
}

/**
 * Which chapter this beat belongs to: the installed beat table is the truth
 * (goBeat installs the chapter and calls reset before the chrome re-renders).
 */
function installedChapter(host) {
  const i = host.CH ? host.CH.findIndex((c) => c.beats === host.BEATS) : -1;
  return i >= 0 ? i : host.state.chapter || 0;
}

/* Every pass of the beat carries a term: the beat's own first, then fillers
   from the same lesson, each introduced and graded in its turn (brief §2.3). */
function assignPassItems(host) {
  const n = host.cfg.passes.length;
  const terms = host.terms;
  if (!terms.length) return [];
  const extra = fillers(host.session, terms[0], Math.max(0, n - terms.length));
  const pool = terms.concat(extra);
  const out = [];
  for (let i = 0; i < n; i++) out.push(pool[i % pool.length]);
  return out;
}

function reset(host, beat) {
  const cfg = host.BEATS[beat];
  host.cfg = cfg;
  const ci = installedChapter(host);
  host.chapter = ci;

  host.parts = [];
  host.punches = [];
  host.cur = null;
  host.press = null;
  host.exit = null;
  host.won = new Set();
  host.pi = 0;
  host.made = 0;
  host.bad = 0;
  host.wait = FIRST_WAIT_S;
  host.pick = 1.4 + 0.6 * cfg.punches;
  host.t = 0;
  host.shake = 0;
  host.flash = 0;
  host.pulse = 0;
  host.shut = 0;
  host.leverShake = 0;
  host.streak = { kind: null, n: 0 };
  host.marchT = 0;
  host.marchF = 0;
  host.marchX = 0;
  host.sel = -1;
  host.kbUsed = false;
  host.finished = false;
  host.coachKind = null;

  host.terms = beatItems(host.session, ci, beat);
  host.item = host.terms[0] || null;
  host.lesson = beatLesson(host.session, ci, beat);
  host.passItems = assignPassItems(host);
  host.session.mode = MODE;
  host.session.mark();
}

/* Three bad judgements: the gate is shut and the beat starts over (template). */
function closeGate(host) {
  const beat = host.state.beat;
  const coachKind = host.coachKind;
  engine.snd(host, 'fall');
  reset(host, beat);
  host.coachKind = coachKind;
  host.shut = SHUT_S;
  host.setState({ step: 0 });
}

// ─── the verb, part one: the punch on the seal ───

function press(host, punch) {
  if (!host.cur || host.press || host.cur.stamped) return false;
  host.press = { punch, k: 0, t: 0 };
  host.sel = punch.i;
  engine.snd(host, 'click', { hz: 520, v: 0.24 });
  return true;
}

/**
 * The stamp is the graded response: the learner's real pick (the word
 * engraved on the punch) against the term the pass was issued for, through
 * the SDK, never a local `===` (§46.1, §46.2). Silent: the game answers
 * diegetically — the emblem printed, or the punch bouncing off.
 */
function stamp(host) {
  const cur = host.cur;
  const pu = host.press.punch;
  host.press = null;
  if (!cur) return;

  const verdict = cur.item.attempt(pu.item.english, {
    expected: cur.item.english,
    mode: MODE,
    hintsUsed: cur.aided ? 1 : 0,
    silent: true,
  });
  host.session.mark();

  if (verdict.correct) {
    cur.stamped = true;
    cur.stampedWith = pu.item;
    engine.snd(host, 'tone', { from: 420, to: 700, v: 0.14 });
    engine.burst(host, host.parts, SEAL.x, SEAL.y, 7, INK, { v1: 70 });
    say(host, cur.item.english);
    return;
  }

  // Wrong: the punch does not go in and springs back — a thud, never red.
  cur.wrong++;
  cur.shake = 1;
  host.shake = 0.5;
  host.hitstop = 50;
  engine.snd(host, 'thud');
  engine.burst(host, host.parts, SEAL.x, SEAL.y + 10, 6, INK, { up: 30, v0: 40, v1: 120, r: 1.2 });
  if (cur.wrong >= 2) {
    // Second error on one pass: the right punch lights up. From here the
    // pass is aided and the SDK is told so (hintsUsed 1 above).
    const right = host.punches.filter((p) => p.item === cur.item)[0];
    if (right) right.glow = 1;
    cur.aided = true;
  }
  if (cur.wrong >= 3) {
    host.coachKind = 'wrong';
    host.setState({
      coach: {
        kind: 'wrong',
        pick: pu.item.english,
        word: cur.item.english,
        it: meaningOf(cur.item, 'it'),
      },
    });
    // The ladder starts over, as the judge's does: the punch stays lit.
    cur.wrong = 0;
  }
}

// ─── the verb, part two: the lever (template) ────

function beatWon(host) {
  return host.made >= host.cfg.need && host.terms.every((t) => host.won.has(t));
}

/* The counter never claims the beat is over while a pass is still coming:
   `made` can pass `need` when the beat's own term ran out and came back round. */
function shownMade(host) {
  if (host.finished) return host.cfg.need;
  return Math.min(host.made, host.cfg.need - 1);
}

function judge(host, letIn) {
  const cur = host.cur;
  if (!cur || host.press || host.finished) return;
  if (!cur.stamped) {
    // The levers are dead until the seal has been checked: a rattle, no text.
    host.leverShake = 1;
    engine.snd(host, 'fall');
    return;
  }
  const cfg = host.cfg;
  const right = ok(cfg, cur);
  const lever = letIn ? LEVER.admit : LEVER.deny;

  if (letIn === right) {
    host.made++;
    host.flash = 1;
    host.streak = { kind: null, n: 0 };
    host.won.add(cur.item);
    cur.item.clear();
    persist(host);
    engine.snd(host, 'tone', { from: 580, to: 900, v: 0.15 });
    engine.burst(host, host.parts, lever.x, lever.y, 10, INK);
    nextPass(host, letIn ? 1 : -1);
    const won = beatWon(host);
    if (won) host.finished = true;
    host.setState({ step: shownMade(host) });
    if (won) {
      for (const t of host.terms) t.clear();
      engine.snd(host, 'chime', { notes: [440, 587, 740] });
      host.setState({ done: true });
    }
    return;
  }

  const kind = letIn ? 'letIn' : 'kept';
  host.shake = 0.8;
  engine.snd(host, 'whir');
  engine.burst(host, host.parts, W / 2, DESK_LINE, 9, INK);
  const s = host.streak;
  if (s.kind === kind) s.n++;
  else host.streak = { kind, n: 1 };
  if (host.streak.n === 2) host.pulse = 0.9;
  if (host.streak.n >= 3) {
    host.coachKind = kind;
    host.setState({
      coach: {
        kind,
        word: cur.item.english,
        it: meaningOf(cur.item, 'it'),
        why: whyOf(cfg, cur),
        claim: cur.claim,
        role: cur.role,
      },
    });
    host.streak = { kind: null, n: 0 };
  }
  host.bad++;
  nextPass(host, letIn ? 1 : -1);
  if (host.bad >= 3) closeGate(host);
}

/* A pass that runs out is not a graded response — the learner produced
   nothing — so nothing is reported; it comes back round the queue. */
function expire(host) {
  host.shake = 0.6;
  engine.snd(host, 'whir');
  host.bad++;
  nextPass(host, -1);
  if (host.bad >= 3) closeGate(host);
}

// ─── update ──────────────────────────────────────

function marchPeriod(host) {
  const remaining = Math.max(0, host.cfg.need - host.made);
  return (0.18 + 0.06 * remaining) / motionOf(host);
}

function update(host, dt) {
  host.t += dt;
  const c = host.cfg;
  if (!c) return;
  const motion = motionOf(host);

  if (host.flash > 0) host.flash -= dt * 3;
  if (host.shake > 0) host.shake -= dt * 3.4;
  if (host.pulse > 0) host.pulse -= dt;
  if (host.shut > 0) host.shut -= dt;
  if (host.leverShake > 0) host.leverShake -= dt * 3;
  if (host.cur && host.cur.shake > 0) host.cur.shake = Math.max(0, host.cur.shake - dt * 2.2);

  // The punch falls in three jumps, no interpolation (R3 march step).
  if (host.press) {
    host.press.t += dt;
    const stepS = PUNCH_STEP_S / motion;
    while (host.press && host.press.t >= stepS) {
      host.press.t -= stepS;
      host.press.k++;
      if (host.press.k >= PUNCH_STEPS) stamp(host);
    }
  }

  if (host.exit) {
    host.exit.t += dt;
    const stepS = EXIT_STEP_S / motion;
    while (host.exit && host.exit.t >= stepS) {
      host.exit.t -= stepS;
      host.exit.k++;
      if (host.exit.k >= EXIT_STEPS) host.exit = null;
    }
  }

  if (!host.finished && !host.state.coach) {
    if (!host.cur) {
      // Nobody steps up while the shutter is down.
      if (host.shut <= 0) host.wait -= dt;
      if (host.wait <= 0) land(host);
    } else {
      host.cur.t += dt;
      if (host.cur.t > host.cur.limit && !host.press) expire(host);
    }
  }

  // The queue marches in place; under reduced motion it stands still (§15.4).
  if (!host.reduceMotion) {
    host.marchT -= dt;
    if (host.marchT <= 0) {
      host.marchF ^= 1;
      host.marchX = host.marchF ? 8 : 0;
      host.marchT = marchPeriod(host);
    }
  }

  host.parts = engine.parts(host.parts, dt, 400);
}

// ─── input: tap a punch, then a lever ────────────

function punchAt(host, p) {
  for (const pu of host.punches) {
    if (
      p.x >= pu.x - HEAD_W / 2 - 6 &&
      p.x <= pu.x + HEAD_W / 2 + 6 &&
      p.y >= RAIL_Y &&
      p.y <= HEAD_Y + HEAD_H + 8
    )
      return pu;
  }
  return null;
}

function tap(host, p) {
  if (host.finished) return;
  if (!host.cur || host.press) {
    engine.snd(host, 'fall');
    return;
  }
  const pu = punchAt(host, p);
  if (pu) {
    if (!press(host, pu)) engine.snd(host, 'click', { hz: 500, v: 0.12 });
    return;
  }
  if (Math.hypot(p.x - LEVER.admit.x, p.y - LEVER.admit.y) < LEVER_R) {
    judge(host, true);
    return;
  }
  if (Math.hypot(p.x - LEVER.deny.x, p.y - LEVER.deny.y) < LEVER_R) {
    judge(host, false);
    return;
  }
  engine.snd(host, 'fall');
}

function key(host, e) {
  if (host.finished) return;
  host.kbUsed = true;
  const cur = host.cur;
  const n = host.punches.length;
  if (!cur) return;
  if (!cur.stamped) {
    if (e.key === 'ArrowLeft') {
      host.sel = n ? ((host.sel < 0 ? 0 : host.sel) - 1 + n) % n : -1;
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      host.sel = n ? ((host.sel < 0 ? -1 : host.sel) + 1) % n : -1;
      e.preventDefault();
    } else if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowDown') {
      e.preventDefault();
      const pu = host.punches[host.sel < 0 ? 0 : host.sel];
      if (pu) press(host, pu);
    } else if (/^[1-4]$/.test(e.key)) {
      const i = parseInt(e.key, 10) - 1;
      if (host.punches[i]) host.sel = i;
    }
    return;
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    judge(host, true);
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    judge(host, false);
  }
}

// ─── drawing: everything in ink, the bands give the colour ─

function drawHeader(host, x) {
  const it = host.state.lang !== 'en';
  const c = host.cfg;
  x.fillStyle = INK;
  x.strokeStyle = INK;
  // The gate house: a roof line and the counter in segment digits.
  x.fillRect(0, BAND_RED - 3, W, 3);
  for (let i = 12; i < W; i += 24) x.fillRect(i, BAND_RED - 12, 12, 6);
  drawSeg(x, `${shownMade(host)}/${c.need}`, 20, 30, 34);
  x.font = `700 12px ${FONT}`;
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  x.fillText(it ? 'CONTROLLI ATTIVI' : 'ACTIVE CHECKS', 20, 92);
  const checks = [
    [it ? 'sigillo' : 'seal', true],
    [it ? 'scadenza' : 'expiry', c.checkExp],
    [it ? 'firmatario' : 'issuer', c.checkIss],
    [it ? 'diritti' : 'rights', c.checkRole],
  ];
  checks.forEach(([n, on], i) => {
    const cx = 20 + (i * (W - 40)) / 4;
    x.globalAlpha = on ? 1 : 0.3;
    x.fillRect(cx, 108, 9, 9);
    if (!on) {
      x.fillStyle = '#000000';
      x.fillRect(cx + 2, 110, 5, 5);
      x.fillStyle = INK;
    }
    x.fillText(n, cx + 15, 113);
    x.globalAlpha = 1;
  });
  // The chapter's name on the roof, right-aligned.
  x.textAlign = 'right';
  x.font = `700 12px ${FONT}`;
  const ch = host.CH && host.CH[host.chapter];
  if (ch) x.fillText(String(ch.t[it ? 0 : 1]).toUpperCase(), W - 16, 46);
}

function drawCarrier(x, px, py, s, frame) {
  drawBitmap(x, CARRIER[frame ? 1 : 0], px, py, s);
}

/* The ordered row of passes still to be judged, marching in place. */
function drawQueue(host, x) {
  const remaining = Math.max(0, host.cfg.need - shownMade(host) - (host.cur ? 1 : 0));
  const n = Math.min(8, remaining);
  const still = host.reduceMotion;
  const frame = still ? 0 : host.marchF;
  const off = still ? 0 : host.marchX;
  x.fillStyle = INK;
  for (let i = 0; i < n; i++) {
    const px = 24 + i * 46 + off;
    drawCarrier(x, px, QUEUE_Y, 3, frame ^ (i & 1));
    x.fillRect(px + 35, QUEUE_Y + 6, 8, 12);
  }
  x.globalAlpha = 0.35;
  x.fillRect(0, QUEUE_Y + 30, W, 2);
  x.globalAlpha = 1;
}

function drawDesk(host, x) {
  x.fillStyle = INK;
  x.fillRect(0, DESK_LINE, W, 3);
  for (let i = 0; i < W; i += 40) x.fillRect(i, DESK_LINE + 8, 20, 2);
  // The carrier at the desk, or stepping out through the gate.
  const ex = host.exit;
  if (ex && ex.k < EXIT_STEPS) {
    drawCarrier(x, 36 + ex.dir * ex.k * 60, DESK_LINE - 26, 3, ex.k & 1);
  } else if (host.cur) {
    drawCarrier(x, 36, DESK_LINE - 26, 3, 0);
  }
}

function drawCard(host, x) {
  const cur = host.cur;
  const it = host.state.lang !== 'en';
  const still = host.reduceMotion;
  const jx = cur.shake && !still ? (Math.random() * 2 - 1) * 5 * cur.shake : 0;
  const cx = CARD_X + jx;
  x.fillStyle = INK;
  engine.rr(x, cx, CARD_Y, CARD_W, CARD_H, 4);
  x.fill();
  // A refused punch under reduced motion is a still, thicker border (§11.6).
  if (cur.shake && still) {
    x.strokeStyle = INK;
    x.lineWidth = 4;
    engine.rr(x, cx - 5, CARD_Y - 5, CARD_W + 10, CARD_H + 10, 6);
    x.stroke();
  }
  x.fillStyle = '#000000';
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  x.font = `700 11px ${FONT}`;
  x.fillText(it ? 'RILASCIATO PER' : 'ISSUED FOR', cx + 14, CARD_Y + 16);
  x.font = `700 15px ${FONT}`;
  const ls = wrapLines(x, meaningOf(cur.item, 'it'), CARD_W - 100, 2);
  ls.forEach((l, i) => x.fillText(l, cx + 14, CARD_Y + 38 + i * 18));
  x.font = `700 12px ${FONT}`;
  const rows = [
    ['claim', `${it ? 'dichiara' : 'claims'}: ${cur.claim}`, CARD_Y + 82],
    ['iss', `${it ? 'firmato' : 'issued'}: ${cur.issuer}`, CARD_Y + 98],
    [
      'exp',
      `${it ? 'valido' : 'valid'}: ${cur.exp ? (it ? 'scaduto' : 'expired') : it ? 'oggi' : 'today'}`,
      CARD_Y + 114,
    ],
  ];
  const why = host.pulse > 0 ? whyOf(host.cfg, cur) : null;
  const blink = still ? true : Math.sin(host.t * 14) > 0;
  // The rows stop short of the seal ring, whatever the claim says.
  const rowW = SEAL.x - SEAL.r - 8 - (CARD_X + 14);
  for (const [k, text, y] of rows) {
    x.fillText(fitText(x, text, rowW), cx + 14, y);
    const marked = (why === 'exp' && k === 'exp') || (why === 'iss' && k === 'iss');
    if (marked && blink) x.fillRect(cx + 4, y - 6, 4, 12);
  }
  // The seal: a ring, and after the stamp the emblem printed — whole, or broken.
  const sx = SEAL.x + jx;
  x.strokeStyle = '#000000';
  x.lineWidth = 3;
  x.beginPath();
  x.arc(sx, SEAL.y, SEAL.r, 0, 6.283);
  x.stroke();
  x.textAlign = 'center';
  if (!cur.stamped) {
    x.font = `700 11px ${FONT}`;
    x.fillText(it ? 'sigillo' : 'seal', sx, SEAL.y);
  } else {
    x.fillStyle = '#000000';
    x.beginPath();
    x.arc(sx, SEAL.y, SEAL.r - 4, 0, 6.283);
    x.fill();
    x.fillStyle = INK;
    drawBitmap(
      x,
      EMBLEM,
      sx - 14,
      SEAL.y - 16,
      4,
      cur.sig ? null : (r, c) => (r * 7 + c) % 3 === 1
    );
    x.fillStyle = '#000000';
    x.font = `700 11px ${FONT}`;
    x.fillText(host.cfg.checkRole ? cur.role : '—', sx, SEAL.y + 20);
    const sealMarked = why === 'sig' || why === 'role' || why === 'none';
    if (sealMarked && blink) {
      x.strokeStyle = '#000000';
      x.lineWidth = 2;
      x.beginPath();
      x.arc(sx, SEAL.y, SEAL.r + 6, 0, 6.283);
      x.stroke();
    }
  }
  // Time left: a bar under the sheet that blinks in the last third.
  const k = Math.max(0, 1 - cur.t / cur.limit);
  const low = k < 0.3;
  const show = !low || still || Math.sin(host.t * 18) > 0;
  if (show) {
    x.fillStyle = INK;
    x.fillRect(CARD_X, CARD_Y + CARD_H + 8, CARD_W * k, 5);
  }
}

/* The die: shoulders under the grip, a bevelled base with the striking notch,
   the house emblem etched in the shoulder and the word engraved under it. One
   silhouette for every punch; only the engraving differs (TEST 1). */
function drawDie(x, px, top) {
  const hw = HEAD_W / 2;
  const base = top + HEAD_H;
  x.beginPath();
  x.moveTo(px - hw + 12, top);
  x.lineTo(px + hw - 12, top);
  x.lineTo(px + hw, top + 12);
  x.lineTo(px + hw, base - 8);
  x.lineTo(px + hw - 8, base);
  x.lineTo(px + 8, base);
  x.lineTo(px + 8, base - 6);
  x.lineTo(px - 8, base - 6);
  x.lineTo(px - 8, base);
  x.lineTo(px - hw + 8, base);
  x.lineTo(px - hw, base - 8);
  x.lineTo(px - hw, top + 12);
  x.closePath();
  x.fill();
}

function drawPunch(host, x, pu, px, py, raised) {
  const top = py + (raised ? -6 : 0);
  x.fillStyle = INK;
  // Grip and stem, then the die.
  x.fillRect(px - 5, py - 24, 10, 26);
  x.fillRect(px - 14, py - 30, 28, 8);
  drawDie(x, px, top);
  x.fillStyle = '#000000';
  drawBitmap(x, EMBLEM, px - 7, top + 3, 2);
  x.font = `700 12px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const ls = wrapLines(x, labelOf(pu.item), HEAD_W - 16, 2);
  const cy = top + 14 + (HEAD_H - 22) / 2;
  ls.forEach((l, i) => x.fillText(l, px, cy + (i - (ls.length - 1) / 2) * 14));
  if (raised) {
    x.fillStyle = INK;
    x.fillRect(px - 10, py + HEAD_H + 4, 20, 3);
  }
}

function drawRail(host, x) {
  x.fillStyle = INK;
  x.fillRect(0, RAIL_Y, W, 4);
  for (let i = 10; i < W; i += 30) x.fillRect(i, RAIL_Y + 4, 2, 6);
  const pressing = host.press ? host.press.punch : null;
  for (const pu of host.punches) {
    if (pu === pressing) continue;
    drawPunch(host, x, pu, pu.x, pu.y, host.kbUsed && host.sel === pu.i);
  }
  if (pressing) {
    // Three jumps from the rail to the seal, crossing the white band on the way.
    const k = Math.min(PUNCH_STEPS, host.press.k) / PUNCH_STEPS;
    const px = pressing.x + (SEAL.x - pressing.x) * k;
    const py = pressing.y + (SEAL.y - HEAD_H / 2 - pressing.y) * k;
    drawPunch(host, x, pressing, px, py, false);
  }
}

function drawLever(host, x, p, label, tilt, live) {
  const still = host.reduceMotion;
  const jx = host.leverShake && !still ? (Math.random() * 2 - 1) * 4 * host.leverShake : 0;
  x.globalAlpha = live ? 1 : 0.35;
  x.fillStyle = INK;
  x.fillRect(p.x - 26 + jx, p.y + 14, 52, 8);
  x.strokeStyle = INK;
  x.lineWidth = 5;
  x.beginPath();
  x.moveTo(p.x + jx, p.y + 14);
  x.lineTo(p.x + tilt + jx, p.y - 26);
  x.stroke();
  x.beginPath();
  x.arc(p.x + tilt + jx, p.y - 30, 9, 0, 6.283);
  x.fill();
  x.font = `700 12px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(label, p.x, p.y + 36);
  x.globalAlpha = 1;
}

function drawLevers(host, x) {
  const it = host.state.lang !== 'en';
  const live = Boolean(host.cur && host.cur.stamped && !host.press);
  drawLever(host, x, LEVER.admit, it ? '◀ AMMESSO' : '◀ ADMIT', -12, live);
  drawLever(host, x, LEVER.deny, it ? 'RESPINTO ▶' : 'REJECT ▶', 12, live);
}

/* The ground: the register's green line and three bunkers that crumble, one
   per bad judgement. Dark pixels missing, never red (§14.6). */
function drawGround(host, x) {
  x.fillStyle = INK;
  x.fillRect(0, GROUND_Y, W, 3);
  BUNKERS.forEach((bx, i) => {
    const broken = i < host.bad;
    drawBitmap(x, BUNKER, bx - 20, GROUND_Y - 26, 4, broken ? (r, c) => r < 4 || c > 3 : null);
  });
}

/* The gel: bands of colour multiplied over the ink (ricerca/42 R3). */
function drawGel(x) {
  x.globalCompositeOperation = 'multiply';
  x.fillStyle = GEL.red;
  x.fillRect(-12, -12, W + 24, BAND_RED + 12);
  x.fillStyle = GEL.white;
  x.fillRect(-12, BAND_RED, W + 24, BAND_GREEN - BAND_RED);
  x.fillStyle = GEL.green;
  x.fillRect(-12, BAND_GREEN, W + 24, H - BAND_GREEN + 12);
  x.globalCompositeOperation = 'source-over';
}

/* After the gel: the second-error halo on the right punch is the register's
   magenta band, breathing — or, under reduced motion, a steady halo. */
function drawGlow(host, x) {
  const still = host.reduceMotion;
  for (const pu of host.punches) {
    if (!pu.glow) continue;
    if (host.press && host.press.punch === pu) continue;
    x.save();
    x.shadowColor = GEL.magenta;
    x.shadowBlur = 16 + (still ? 0 : 6 * Math.sin(host.t * 6));
    x.strokeStyle = GEL.magenta;
    x.lineWidth = 3;
    engine.rr(x, pu.x - HEAD_W / 2 - 3, pu.y - 3, HEAD_W + 6, HEAD_H + 6, 4);
    x.stroke();
    x.restore();
  }
}

function drawShutter(host, x) {
  const it = host.state.lang !== 'en';
  const a = Math.min(1, host.shut / SHUT_S);
  x.globalAlpha = a;
  x.fillStyle = '#000000';
  x.fillRect(0, BAND_RED, W, BAND_GREEN - BAND_RED);
  x.fillStyle = INK;
  for (let y = BAND_RED + 20; y < BAND_GREEN; y += 40) x.fillRect(0, y, W, 6);
  x.font = `700 20px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(it ? 'VARCO CHIUSO' : 'GATE CLOSED', W / 2, (BAND_RED + BAND_GREEN) / 2);
  x.globalAlpha = 1;
}

function draw(host, x) {
  x.setTransform(host.sc, 0, 0, host.sc, 0, 0);
  x.clearRect(0, 0, W, H);
  x.save();
  engine.shake(host, x, host.shake);
  x.fillStyle = '#000000';
  x.fillRect(-12, -12, W + 24, H + 24);
  if (!host.cfg) {
    x.restore();
    return;
  }

  drawHeader(host, x);
  drawQueue(host, x);
  drawDesk(host, x);
  if (host.cur) drawCard(host, x);
  drawRail(host, x);
  drawLevers(host, x);
  drawGround(host, x);
  engine.drawParts(x, host.parts);
  drawGel(x);

  drawGlow(host, x);
  if (host.flash > 0) {
    x.fillStyle = `rgba(242,242,242,${(host.flash * 0.08).toFixed(3)})`;
    x.fillRect(0, 0, W, H);
  }
  if (host.shut > 0) drawShutter(host, x);
  x.restore();
}

// ─── chrome copy (rendered by GameHost, written here) ─────

function coachText(host, coach, lang) {
  const L = TX[lang] || TX.it;
  const lines = L[coach.kind] || L.wrong;
  const why = L.why[coach.why] || L.why.none;
  const sub = (t) =>
    t
      .replace('{why}', why)
      .replace('{pick}', coach.pick || '')
      .replace('{word}', coach.word || '')
      .replace('{it}', coach.it || '')
      .replace('{claim}', coach.claim || '')
      .replace('{role}', coach.role || '');
  return { what: sub(lines[0]), effect: sub(lines[1]), rule: sub(lines[2]), hint: L.hint };
}

function doneView(host, lang) {
  const L = TX[lang] || TX.it;
  const title = host.terms.map((t) => labelOf(t)).join(' · ');
  const subtitle =
    lang === 'en'
      ? pickLang(host.lesson ? host.lesson.title : '', 'en')
      : meaningOf(host.item, 'it');
  return { eyebrow: L.eyebrow, title, subtitle };
}

function onCoachClose(host) {
  host.coachKind = null;
}

export default {
  meta: {
    id: 'nodejs-l11-lasciapassare',
    surface: 'nodejs',
    level: 10,
    band: 2,
    register: 'R3',
    title: 'Il lasciapassare',
    titleEn: 'The pass',
    // GameHost prints this verbatim, so the pair lives in the string (§14.7).
    levelLabel: 'Node.js · L11 Autenticazione / Node.js · L11 Authentication',
    font: '700 15px "Courier New"',
  },
  W,
  H,
  CH,
  drone: { freq: 43, type: 'triangle', volume: 0.013, lowpass: 120 },
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
