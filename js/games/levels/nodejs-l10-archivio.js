/**
 * L'ARCHIVIO — Node.js L10 «Integrazione Database» (js/topics/data/nodejs.js,
 * levels[9]): 4 lezioni × 10 termini = 40, serviti in 8 capitoli × 5 commesse.
 * Porto di knowledge-aio-giochi/templates/nodejs-l10-archivio (la meccanica) con
 * la spina dorsale del vocabolario (LevelBeats) e il registro R4.
 *
 * SCHEDA DI PROGETTO (ricerca/00 §0.3) + SCHEDA VISIVA (ricerca/42 §42.3)
 * GIOCO ...... L'archivio
 * TOPIC ...... Node.js L10 Integrazione Database, banda 2 (4 lezioni × 10 termini)
 * CONCETTO ... Chiedere la cosa giusta costa mille volte meno che chiedere tutto e
 *              scegliere dopo. Il costo sta nel trasporto, non nella scelta. E la
 *              cosa giusta sta in uno strato preciso: l'archivio si chiama per nome
 *              (inglese) e la commessa lo descrive (italiano).
 * FORMA ...... trasformazione   VERBO ... comporre la richiesta: calare la gabbia
 *              nello strato giusto, montare la scheda, tirare la leva
 * ARCHETIPO .. ricerca/15 stacking in forma di composizione vincolata, con il
 *              budget di ricerca/18 (la decisione si paga dopo)
 * VINCI SE ... tutte le commesse del turno escono entro il budget di trasporto
 * PERDI SE ... il montacarichi si sovraccarica (o torna vuoto) tre volte: il turno
 *              ricomincia
 * SBAGLI ..... 1 strato sbagliato: la gabbia risale vuota tremando; carico
 *                sbagliato: la gabbia trema sul posto e si svuota (lo strato
 *                giusto resta scelto). Il peso trasportato si vede, nessun testo
 *              2 alla seconda dello stesso tipo: lo strato giusto (o il pezzo che
 *                mancava) pulsa
 *              3 coaching: cosa hai calato, cosa chiedeva la commessa, il nome inglese
 * CAPITOLI ... 1 la scheda · 2 solo le colonne che servono · 3 FRATTURA non filtrare
 *              a valle · 4 il limite · 5 l'ordinamento · 6 l'indice · 7 a raffica
 *              · 8 il turno intero
 * MONDO ...... archivio sotterraneo: cielo notturno, castelletto del montacarichi,
 *              pozzo nero con la gabbia, quattro strati di terra con le targhe di
 *              pietra incise in inglese, la riserva dei pezzi scavata nel fondo,
 *              la leva col pomello verde
 * REGISTRO ... R4 Terra a strati: cielo notturno #0B1026 · ocra #E0A23A ·
 *              arancio #D2691E · bruno #8B3A1E · viola #4B1E4B · pietra #9AA0A6
 *              (accento verde #3CB371 per leva, lampade e miccia)
 *              figura: la gabbia del montacarichi appesa al castelletto · suolo:
 *              tutto è suolo, quattro strati che si leggono come quattro cose
 *              movimento: la calata a stadi — la gabbia scende a una velocità
 *              sola e si ferma a ogni giuntura prima di proseguire fino allo
 *              strato scelto; risale tremando quando lo strato è sbagliato e
 *              trema sul posto, svuotandosi, quando il carico è sbagliato
 *              carattere: Baloo 2 (arrotondato) per cifre e targhe
 * NUMERI ..... budget per commessa; nessun timer fino al capitolo 7 (26→18 s);
 *              strati 3 nei capitoli 1–2, poi 4; pezzi in scheda ≤ 5
 * TEST 1 ..... le targhe hanno tutte la stessa pietra e la stessa forma e cambiano
 *              posto a ogni commessa: solo il nome inglese differisce. I pezzi sono
 *              identici: l'unico segnale è cosa chiedi e quanto pesa quello che
 *              torna. Il peso è calcolato, non decorativo.
 * TEST 2 ..... "Calo la gabbia nell'archivio che la commessa descrive e porto su
 *              solo quello che serve"
 * TEST 3 ..... la commessa è appesa al castelletto, gli strati hanno i nomi, la
 *              riserva ha i pezzi: si tocca uno strato, poi i pezzi, poi la leva
 */

import * as engine from '../KaioEngine.js';
import { beatItems, distractors, fillers, labelOf, meaningOf } from '../LevelBeats.js';
import { ttsService } from '../../services/TTSService.js';
import { CH, weight } from '../parts/nodejs-l10-archivio/tables.js';

const W = 420;
const H = 910;
const SKY = 150; // the ground line
const STY = 156; // first stratum top
const ST = 80; // stratum height
const SHAFT = { x: 24, w: 222 };
const PLATE = { x: 262, w: 146, h: 44 };
const CAGE = { x: 32, w: 206, h: 70, top: 158 };
const TRAYY = 524;
const TRAY_TOP = 494;
const TRAY_H = 254;
const LEVER = { x: W / 2, y: 806 };
const MAX_CARD = 5;
const CAGE_V = 520; // px/s: the cage travels at one speed, never an ease-out
const DWELL = 0.1; // s: the stop at every seam on the way down (R4, a stadi)
const OVER = 8; // px of overscan so the engine shake never bares the canvas
const FONT = '"Baloo 2","Trebuchet MS",system-ui,sans-serif';

/* R4 · Terra a strati (ricerca/42 §42.4) */
const C = {
  cielo: '#0B1026',
  ocra: '#E0A23A',
  arancio: '#D2691E',
  bruno: '#8B3A1E',
  viola: '#4B1E4B',
  pietra: '#9AA0A6',
  verde: '#3CB371',
  carta: '#F2E6C9', // parchment: a tint of ocra for the order slip; its ink is cielo
};
const STRATA = [C.ocra, C.arancio, C.bruno, C.viola];

const TX = {
  it: {
    term: [
      'Lo strato non è quello.',
      'Hai calato la gabbia in «{pick}», ma la commessa chiede «{it}»: in inglese quello strato si chiama «{word}».',
      'Leggi la commessa, poi cerca la targa che dice la stessa cosa in inglese: «{word}».',
    ],
    over: [
      'Il montacarichi si è sovraccaricato.',
      'Hai chiesto più di quello che serviva: {load} contro un budget di {budget}. Il peso di troppo è tutto trasporto sprecato.',
      'Da «{word}» si filtra a monte, non dopo: quello che non chiedi non pesa.',
    ],
    miss: [
      'La scheda non porta su quello che era chiesto.',
      'La commessa «{ask}» torna indietro vuota: nella scheda mancava un pezzo.',
      'Prima la cosa giusta da «{word}», poi il risparmio.',
    ],
    hint: 'SELECT * pesa 1000 righe · COUNT(*) pesa 1 · tocca lo strato, poi i pezzi, poi la leva · tastiera: ↑ ↓ strato, ← → pezzo, Invio aggiunge, spazio tira la leva',
    eyebrow: 'Commesse evase',
    empty: 'aggiungi i pezzi',
    lever: 'SALI',
  },
  en: {
    term: [
      'That is not the layer.',
      'You lowered the cage into "{pick}", but the order asks for "{it}": in English that layer is called "{word}".',
      'Read the order, then find the plate that says the same thing in English: "{word}".',
    ],
    over: [
      'The hoist was overloaded.',
      'You asked for more than needed: {load} against a budget of {budget}. The extra weight is pure wasted transport.',
      'From "{word}" you filter upstream, not after: what you do not ask for weighs nothing.',
    ],
    miss: [
      'The card does not bring up what was asked.',
      'The order "{ask}" comes back empty: a piece was missing from the card.',
      'First the right thing from "{word}", then the saving.',
    ],
    hint: 'SELECT * weighs 1000 rows · COUNT(*) weighs 1 · tap the layer, then the pieces, then the lever · keyboard: ↑ ↓ layer, ← → piece, Enter adds, space pulls the lever',
    eyebrow: 'Orders filled',
    empty: 'add the parts',
    lever: 'HOIST',
  },
};

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

/* Deterministic grain for the dot texture: the same dots every frame, so the
   strata never flicker (ricerca/42 §42.6 #10). */
function grain(i) {
  const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return v - Math.floor(v);
}

// ─── geometry ────────────────────────────────────

function stratumY(i) {
  return STY + i * ST;
}

function trayXY(i) {
  const cols = 2;
  const r = Math.floor(i / cols);
  const cc = i % cols;
  const w = W / (cols + 0.2);
  return { x: W * 0.5 + (cc - (cols - 1) / 2) * w, y: TRAYY + r * 50 };
}

// ─── the spine: terms, orders, plates ────────────

function installedChapter(host) {
  const i = host.CH ? host.CH.findIndex((c) => c.beats === host.BEATS) : -1;
  return i >= 0 ? i : host.state.chapter || 0;
}

/**
 * The shift's orders. The beat's own term(s) come first (§46.5); the extra
 * orders the mechanic asks for are real terms of the same lesson, introduced
 * and graded like the rest (brief §2.3). Each order pairs a term with one of
 * the template's jobs, cycling as the template did.
 */
function buildOrders(host, cfg) {
  const terms = host.terms;
  if (!terms.length) return [];
  const extra = Math.max(0, cfg.need - terms.length);
  let items = terms.concat(
    fillers(host.session, host.item, extra).filter((f) => !terms.includes(f))
  );
  while (items.length < cfg.need) items = items.concat(terms);
  return items.slice(0, cfg.need).map((item, i) => ({
    item,
    job: cfg.jobs[i % cfg.jobs.length],
    graded: null,
    aided: false,
    plates: [],
  }));
}

function order(host) {
  return host.orders[host.ji] || null;
}

/* The plates of the current order: the term and its neighbours from the same
   lesson, on the same stone, in a fresh random order (TEST 1). */
function hang(host) {
  const o = order(host);
  if (!o) return;
  const k = Math.max(1, host.cfg.plates) - 1;
  const others = distractors(host.session, o.item, k);
  o.plates = shuffle([o.item].concat(others)).map((item, i) => ({ item, i, glow: 0 }));
  host.strat = -1;
  host.card = [];
  o.item.introduce();
  host.session.mark();
}

function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

// ─── lifecycle ───────────────────────────────────

function init(host) {
  host.parts = [];
  host.terms = [];
  host.item = null;
  host.orders = [];
  host.card = [];
  host.chapter = 0;
  host.t = 0;
  host.ji = 0;
  host.made = 0;
  host.bad = 0;
  host.strat = -1;
  host.sel = -1;
  host.kbUsed = false;
  host.cageY = CAGE.top;
  host.dwell = 0;
  host.tremble = 0;
  host.load = 0;
  host.loadShown = 0;
  host.shake = 0;
  host.flash = 0;
  host.pulse = 0;
  host.pulseK = null;
  host.lever = 0;
  host.streak = { kind: null, n: 0 };
  host.timer = 0;
  host.finished = false;
  host.coachKind = null;
}

function reset(host, beat) {
  const cfg = host.BEATS[beat];
  host.cfg = cfg;
  const ci = installedChapter(host);
  host.chapter = ci;

  host.terms = beatItems(host.session, ci, beat);
  host.item = host.terms[0] || null;
  host.needed = cfg.need;
  host.orders = buildOrders(host, cfg);
  host.ji = 0;
  host.made = 0;
  host.bad = 0;
  host.card = [];
  host.parts = [];
  host.t = 0;
  host.strat = -1;
  host.sel = -1;
  host.kbUsed = false;
  host.cageY = CAGE.top;
  host.dwell = 0;
  host.tremble = 0;
  host.load = 0;
  host.loadShown = 0;
  host.shake = 0;
  host.flash = 0;
  host.pulse = 0;
  host.pulseK = null;
  host.lever = 0;
  host.streak = { kind: null, n: 0 };
  host.timer = cfg.timer;
  host.finished = false;
  host.coachKind = null;
  host.session.mode = 'archivio';
  hang(host);
}

/* Three failed hoists: the shift starts over on the same beat (template). */
function restart(host) {
  reset(host, host.state.beat);
  host.setState({ step: 0 });
}

// ─── the verb ────────────────────────────────────

function pickStratum(host, i) {
  const o = order(host);
  if (!o || i < 0 || i >= o.plates.length) return;
  if (host.strat === i) return;
  host.strat = i;
  engine.snd(host, 'click', { hz: 900, v: 0.16 });
}

function addPart(host, i) {
  const tray = host.cfg.tray;
  const p = tray[i];
  if (!p) return;
  if (host.card.indexOf(p) >= 0) {
    engine.snd(host, 'fall');
    return;
  }
  if (host.card.length < MAX_CARD) {
    host.card.push(p);
    engine.snd(host, 'pop', { hz: 330, v: 0.13 });
  } else {
    engine.snd(host, 'fall');
    host.shake = 0.3;
  }
}

function popPart(host) {
  if (!host.card.length) return;
  host.card.pop();
  engine.snd(host, 'fall');
}

function fail(host, kind, o, detail) {
  host.shake = 0.8;
  // The cage itself trembles (R4: il masso che trema): on the way up after a
  // wrong layer, in place after a wrong load.
  host.tremble = 0.8;
  engine.snd(host, 'whir');
  engine.burst(host, host.parts, LEVER.x, LEVER.y - 30, 9, C.pietra);
  const s = host.streak;
  if (s.kind === kind) s.n++;
  else {
    s.kind = kind;
    s.n = 1;
  }
  if (s.n === 2) {
    if (kind === 'term') {
      // Second wrong layer on one order: the right plate glows. From here the
      // order is aided and the SDK is told so (hintsUsed 1 on the next pull).
      const right = o.plates.find((p) => p.item === o.item);
      if (right) right.glow = 1;
      o.aided = true;
    } else {
      host.pulse = 0.8;
      host.pulseK = o.job.want.find((p) => host.card.indexOf(p) < 0) || o.job.want[0];
    }
  }
  let coached = false;
  if (s.n >= 3) {
    coached = true;
    host.setState({
      coach: {
        kind,
        pick: detail.pick,
        word: o.item.english,
        it: meaningOf(o.item, 'it'),
        ask: o.job.ask,
        askEn: o.job.en,
        load: detail.load,
        budget: o.job.budget,
      },
    });
    host.streak = { kind: null, n: 0 };
  }
  host.bad++;
  host.card = [];
  if (kind === 'term') host.strat = -1;
  // The third lamp restarts the shift (which clears coachKind), so the kind
  // the coach panel is showing is recorded after the restart.
  if (host.bad >= 3) restart(host);
  if (coached) host.coachKind = kind;
}

/**
 * The pull is the graded response. First the layer: the learner's real pick
 * against the term the order describes, through the SDK and never a local
 * `===` (§46.1, §46.2). Then the template's own check on the card — every
 * wanted part, nothing extra, within budget. The cue is `silent` because the
 * game answers diegetically: the cage rattles back up, or the load rises with
 * a chime.
 */
function pull(host) {
  if (host.finished) return;
  const o = order(host);
  if (!o) return;
  host.lever = 1;
  const plate = o.plates[host.strat];
  if (!plate || !host.card.length) {
    engine.snd(host, 'fall');
    host.shake = 0.4;
    return;
  }
  const w = weight(host.cfg, host.card);
  host.load = w;

  if (o.graded !== plate.item) {
    const verdict = o.item.attempt(plate.item.english, {
      expected: o.item.english,
      mode: 'archivio',
      hintsUsed: o.aided ? 1 : 0,
      silent: true,
    });
    host.session.mark();
    if (!verdict.correct) {
      fail(host, 'term', o, { pick: plate.item.english, load: w });
      return;
    }
    o.graded = plate.item;
  }

  const has = o.job.want.every((p) => host.card.indexOf(p) >= 0);
  const noExtra = host.card.every((p) => o.job.want.indexOf(p) >= 0);
  if (has && noExtra && w <= o.job.budget) {
    host.made++;
    host.flash = 1;
    host.streak = { kind: null, n: 0 };
    engine.snd(host, 'tone', { from: 600, to: 940, v: 0.16 });
    engine.burst(host, host.parts, LEVER.x, LEVER.y - 40, 12, C.ocra);
    o.item.clear();
    say(host, o.item.english);
    persist(host);
    host.card = [];
    host.ji++;
    host.timer = host.cfg.timer;
    host.setState({ step: host.made });
    if (host.made >= host.needed) {
      host.finished = true;
      engine.snd(host, 'chime', { notes: [440, 587, 740] });
      host.setState({ done: true });
      return;
    }
    hang(host);
    return;
  }
  fail(host, has ? 'over' : 'miss', o, { pick: host.card.join(' + '), load: w });
}

// ─── update ──────────────────────────────────────

function update(host, dt) {
  host.t += dt;
  const c = host.cfg;
  if (!c) return;
  // Reduced motion: the cage is the game and must still travel, but at 0.7×;
  // the tremble, the pulse and the spark hold still (§15.4, ricerca/42 §42.6).
  const m = host.reduceMotion ? 0.7 : 1;

  if (host.flash > 0) host.flash -= dt * 3 * m;
  if (host.shake > 0) host.shake -= dt * 3.4;
  if (host.pulse > 0) host.pulse -= dt;
  if (host.tremble > 0) host.tremble -= dt * 1.6;
  if (host.lever > 0) host.lever = Math.max(0, host.lever - dt * 4 * m);

  const target = host.card.length ? weight(c, host.card) : 0;
  host.loadShown += (target - host.loadShown) * Math.min(1, dt * 6 * m);

  // The descent is a stadi (R4): the cage drops at one speed and stops at
  // every seam it crosses before going on; the rise is one continuous haul.
  const cageTarget = host.strat >= 0 ? stratumY(host.strat) + 5 : CAGE.top;
  if (host.dwell > 0) host.dwell -= dt;
  else if (host.cageY < cageTarget) {
    let limit = cageTarget;
    for (let k = 1; k < host.strat; k++) {
      const seam = stratumY(k) + 5;
      if (seam > host.cageY + 0.5 && seam < limit) limit = seam;
    }
    host.cageY = Math.min(limit, host.cageY + CAGE_V * dt * m);
    if (host.cageY === limit && limit < cageTarget) host.dwell = DWELL;
  } else if (host.cageY > cageTarget) {
    host.cageY = Math.max(cageTarget, host.cageY - CAGE_V * dt * m);
  }

  if (c.timer && !host.finished) {
    host.timer -= dt;
    if (host.timer <= 0) {
      // The clock ran out: not a response, so nothing is graded (§46.2).
      host.timer = c.timer;
      host.shake = 0.7;
      engine.snd(host, 'whir');
      host.bad++;
      host.card = [];
      if (host.bad >= 3) restart(host);
    }
  }
  host.parts = engine.parts(host.parts, dt, 420);
}

// ─── input: tap the layer, tap the parts, pull the lever ─

function tap(host, p) {
  if (host.finished || !host.cfg) return;
  if (Math.hypot(p.x - LEVER.x, p.y - LEVER.y) < 44) {
    pull(host);
    return;
  }
  const o = order(host);
  if (
    host.card.length &&
    p.x >= CAGE.x &&
    p.x <= CAGE.x + CAGE.w &&
    p.y >= host.cageY &&
    p.y <= host.cageY + CAGE.h
  ) {
    popPart(host);
    return;
  }
  if (o && p.y >= STY && p.y < STY + o.plates.length * ST) {
    pickStratum(host, Math.floor((p.y - STY) / ST));
    return;
  }
  const tray = host.cfg.tray;
  for (let i = 0; i < tray.length; i++) {
    const q = trayXY(i);
    if (Math.abs(p.x - q.x) < 92 && Math.abs(p.y - q.y) < 22) {
      addPart(host, i);
      return;
    }
  }
}

function key(host, e) {
  if (host.finished || !host.cfg) return;
  const o = order(host);
  const n = host.cfg.tray.length;
  const strata = o ? o.plates.length : 0;
  host.kbUsed = true;
  if (e.key === 'ArrowLeft') {
    host.sel = n ? ((host.sel < 0 ? 0 : host.sel) - 1 + n) % n : -1;
    e.preventDefault();
  } else if (e.key === 'ArrowRight') {
    host.sel = n ? ((host.sel < 0 ? -1 : host.sel) + 1) % n : -1;
    e.preventDefault();
  } else if (e.key === 'ArrowUp') {
    if (strata) pickStratum(host, ((host.strat < 0 ? 0 : host.strat) - 1 + strata) % strata);
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    if (strata) pickStratum(host, ((host.strat < 0 ? -1 : host.strat) + 1) % strata);
    e.preventDefault();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (host.sel >= 0) addPart(host, host.sel);
  } else if (e.key === 'Backspace') {
    e.preventDefault();
    popPart(host);
  } else if (e.key === ' ') {
    e.preventDefault();
    pull(host);
  } else if (/^[1-9]$/.test(e.key)) {
    const i = parseInt(e.key, 10) - 1;
    if (i < n) {
      host.sel = i;
      addPart(host, i);
    }
  }
}

// ─── drawing ─────────────────────────────────────

function fitFont(x, text, maxW, size, weightStr) {
  let f = size;
  x.font = `${weightStr} ${f}px ${FONT}`;
  while (x.measureText(text).width > maxW && f > 10) {
    f--;
    x.font = `${weightStr} ${f}px ${FONT}`;
  }
  return f;
}

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

function drawSky(x) {
  x.fillStyle = C.cielo;
  x.fillRect(-OVER, -OVER, W + OVER * 2, SKY + OVER);
  x.fillStyle = C.pietra;
  for (let i = 0; i < 26; i++) {
    const sx = grain(i) * W;
    const sy = grain(i + 100) * 96;
    x.fillRect(sx, sy, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1);
  }
}

/* Four strata that read as four things: ocra, arancio, bruno, viola, each with
   its own dense dot grain and a lighter seam on top (R4). */
function drawStrata(x) {
  for (let i = 0; i < 4; i++) {
    const y = stratumY(i);
    const h = i === 3 ? H - y : ST;
    x.fillStyle = STRATA[i];
    x.fillRect(-OVER, y, W + OVER * 2, i === 3 ? h + OVER : h);
    x.fillStyle = 'rgba(255,240,200,.28)';
    x.fillRect(-OVER, y, W + OVER * 2, 3);
    x.fillStyle = 'rgba(0,0,0,.22)';
    const n = i === 3 ? 90 : 46;
    for (let k = 0; k < n; k++) {
      const gx = grain(i * 300 + k) * W;
      const gy = y + 6 + grain(i * 300 + k + 50) * (h - 10);
      x.fillRect(gx, gy, 2, 2);
    }
  }
  // The ground line: a thin green seam where the sky meets the earth.
  x.fillStyle = C.verde;
  x.fillRect(-OVER, SKY, W + OVER * 2, 4);
  x.fillStyle = 'rgba(0,0,0,.35)';
  x.fillRect(-OVER, SKY + 4, W + OVER * 2, 2);
}

/* Black tunnels with a light rim: the shaft and the reserve chamber. */
function drawTunnel(x, tx, ty, tw, th, r) {
  x.fillStyle = '#000000';
  engine.rr(x, tx, ty, tw, th, r);
  x.fill();
  x.strokeStyle = C.pietra;
  x.lineWidth = 2.5;
  engine.rr(x, tx, ty, tw, th, r);
  x.stroke();
}

function drawHeadframe(host, x, still) {
  const cx = SHAFT.x + SHAFT.w / 2;
  // Two legs and a crossbar standing on the ground, the wheel on top.
  x.strokeStyle = C.pietra;
  x.lineWidth = 5;
  x.beginPath();
  x.moveTo(cx - 40, SKY + 2);
  x.lineTo(cx - 12, 100);
  x.moveTo(cx + 40, SKY + 2);
  x.lineTo(cx + 12, 100);
  x.moveTo(cx - 20, 100);
  x.lineTo(cx + 20, 100);
  x.stroke();
  // The load dial is the wheel: the needle is the bilancia di carico.
  const o = order(host);
  const budget = o ? o.job.budget : 1;
  const over = host.loadShown > budget;
  x.fillStyle = C.cielo;
  x.beginPath();
  x.arc(cx, 100, 24, 0, 6.283);
  x.fill();
  x.strokeStyle = C.pietra;
  x.lineWidth = 3;
  x.beginPath();
  x.arc(cx, 100, 24, 0, 6.283);
  x.stroke();
  for (let i = 0; i <= 4; i++) {
    const a = -2.6 + i * 1.3;
    x.beginPath();
    x.moveTo(cx + Math.cos(a) * 18, 100 + Math.sin(a) * 18);
    x.lineTo(cx + Math.cos(a) * 22, 100 + Math.sin(a) * 22);
    x.stroke();
  }
  const k = Math.min(1.15, host.loadShown / Math.max(1, budget));
  // Over budget the needle trembles like the boulder before it falls (R4);
  // under reduced motion it simply holds past the last notch.
  const jit = over && !still ? Math.sin(host.t * 40) * 0.08 : 0;
  const a = -2.6 + Math.min(1, k) * 5.2 + (over ? 0.35 : 0) + jit;
  x.strokeStyle = over ? C.viola : C.verde;
  x.lineWidth = 3;
  x.beginPath();
  x.moveTo(cx, 100);
  x.lineTo(cx + Math.cos(a) * 19, 100 + Math.sin(a) * 19);
  x.stroke();
  x.fillStyle = C.ocra;
  x.beginPath();
  x.arc(cx, 100, 3.5, 0, 6.283);
  x.fill();
  // Cifre sul cielo: the load carried, in the register's rounded face.
  x.font = `700 15px ${FONT}`;
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  x.fillStyle = C.pietra;
  x.fillText(String(Math.round(host.loadShown)), cx + 32, 100);
  // The cable from the wheel to the cage roof.
  x.strokeStyle = C.pietra;
  x.lineWidth = 2;
  x.beginPath();
  x.moveTo(cx, 124);
  x.lineTo(cx, host.cageY - 6);
  x.stroke();
}

function drawSlip(host, x) {
  const o = order(host);
  const sx = 16;
  const sy = 10;
  const sw = W - 32;
  const sh = 78;
  // A string from the crossbar to the slip's eyelet.
  x.strokeStyle = C.pietra;
  x.lineWidth = 1.5;
  x.beginPath();
  x.moveTo(sx + 30, 0);
  x.lineTo(sx + 30, sy);
  x.moveTo(sx + sw - 30, 0);
  x.lineTo(sx + sw - 30, sy);
  x.stroke();
  x.fillStyle = C.carta;
  engine.rr(x, sx, sy, sw, sh, 5);
  x.fill();
  x.fillStyle = C.bruno;
  x.beginPath();
  x.arc(sx + 30, sy + 8, 3, 0, 6.283);
  x.arc(sx + sw - 30, sy + 8, 3, 0, 6.283);
  x.fill();
  if (!o) return;
  // The order speaks Italian: which archive (the term's meaning) and what.
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  x.fillStyle = C.cielo;
  x.font = `800 16px ${FONT}`;
  const ls = wrapLines(x, meaningOf(o.item, 'it'), sw - 100, 2);
  ls.forEach((l, i) => x.fillText(l, sx + 14, sy + 22 + i * 18));
  x.font = `600 13px ${FONT}`;
  x.fillStyle = C.bruno;
  fitFont(x, o.job.ask, sw - 100, 13, '600');
  x.fillText(o.job.ask, sx + 14, sy + 62);
  // The budget stamp: a circle in ink, the number in the register's digits.
  x.strokeStyle = C.bruno;
  x.lineWidth = 2.5;
  x.beginPath();
  x.arc(sx + sw - 40, sy + 39, 24, 0, 6.283);
  x.stroke();
  x.textAlign = 'center';
  x.fillStyle = C.bruno;
  x.font = `800 ${o.job.budget >= 1000 ? 14 : 17}px ${FONT}`;
  x.fillText(`≤${o.job.budget}`, sx + sw - 40, sy + 39);
}

function drawHud(host, x, still) {
  // Three lamps: a failed hoist puts one out. Dark glass, never red (§14.6).
  for (let i = 0; i < 3; i++) {
    const off = i < host.bad;
    x.fillStyle = off ? C.viola : C.verde;
    x.beginPath();
    x.arc(300 + i * 22, 128, 6, 0, 6.283);
    x.fill();
  }
  x.font = `800 22px ${FONT}`;
  x.textAlign = 'right';
  x.textBaseline = 'middle';
  x.fillStyle = C.pietra;
  x.fillText(`${host.made}/${host.needed || 0}`, W - 16, 128);
  // The fuse: chapters 7-8 burn a line along the ground. The spark jumps only
  // when motion is allowed.
  if (host.cfg && host.cfg.timer) {
    const k = Math.max(0, host.timer / host.cfg.timer);
    const len = (W - 32) * k;
    x.fillStyle = C.ocra;
    x.fillRect(16, SKY - 6, len, 3);
    const sp = still ? 0 : Math.sin(host.t * 30) * 2;
    x.fillStyle = C.carta;
    x.fillRect(16 + len - 2, SKY - 8 + sp, 4, 6);
  }
}

/* A stone tablet with a rounded top, chiselled in English. Every plate is the
   same stone; only the name differs (TEST 1). */
function drawPlate(host, x, plate, y, still) {
  const px = PLATE.x;
  const py = y + (ST - PLATE.h) / 2;
  const lit = plate.glow > 0;
  x.save();
  if (lit) {
    x.shadowColor = C.carta;
    // The hint glow breathes; under reduced motion it is a steady halo.
    x.shadowBlur = still ? 16 : 16 + 6 * Math.sin(host.t * 6);
  }
  x.fillStyle = C.pietra;
  x.beginPath();
  x.moveTo(px, py + PLATE.h);
  x.lineTo(px, py + 14);
  x.arc(px + PLATE.w / 2, py + 14, PLATE.w / 2, Math.PI, 0);
  x.lineTo(px + PLATE.w, py + PLATE.h);
  x.closePath();
  x.fill();
  x.shadowBlur = 0;
  x.strokeStyle = lit ? C.carta : 'rgba(0,0,0,.45)';
  x.lineWidth = lit ? 3 : 1.5;
  x.stroke();
  x.fillStyle = C.cielo;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const label = labelOf(plate.item);
  fitFont(x, label, PLATE.w - 16, 14, '800');
  x.fillText(label, px + PLATE.w / 2, py + PLATE.h / 2 + 4);
  x.restore();
}

function drawCage(host, x, L, still) {
  // After a failed pull the cage shudders on its cable (R4); under reduced
  // motion it hangs still.
  const jit = host.tremble > 0 && !still ? Math.sin(host.t * 45) * 3 * host.tremble : 0;
  const cy = host.cageY + jit;
  const cx = CAGE.x;
  // Roof, hook, floor, bars: a cage a kid can draw.
  x.fillStyle = C.pietra;
  x.beginPath();
  x.moveTo(cx - 4, cy);
  x.lineTo(cx + CAGE.w / 2, cy - 8);
  x.lineTo(cx + CAGE.w + 4, cy);
  x.closePath();
  x.fill();
  x.fillRect(cx, cy + CAGE.h - 5, CAGE.w, 5);
  x.strokeStyle = C.pietra;
  x.lineWidth = 2;
  for (let i = 0; i <= 6; i++) {
    const bx = cx + (i * CAGE.w) / 6;
    x.beginPath();
    x.moveTo(bx, cy);
    x.lineTo(bx, cy + CAGE.h - 4);
    x.stroke();
  }
  x.fillStyle = 'rgba(0,0,0,.55)';
  x.fillRect(cx + 2, cy + 2, CAGE.w - 4, CAGE.h - 8);
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  if (!host.card.length) {
    x.font = `600 12px ${FONT}`;
    x.fillStyle = C.pietra;
    x.fillText(L.empty, cx + 12, cy + CAGE.h / 2 - 2);
    return;
  }
  x.font = `700 12px ${FONT}`;
  x.fillStyle = C.carta;
  host.card.forEach((p, i) => x.fillText(p, cx + 12, cy + 10 + i * 12));
}

/* Flat oval stones in the reserve, all alike; a used one sinks into the dark. */
function drawStone(host, x, p, i, still) {
  const q = trayXY(i);
  const used = host.card.indexOf(p) >= 0;
  const lit = host.pulse > 0 && host.pulseK === p;
  const cursor = host.kbUsed && host.sel === i;
  const sw = 184;
  const sh = 38;
  x.save();
  if (lit) {
    x.shadowColor = C.carta;
    x.shadowBlur = still ? 14 : 14 + 6 * Math.sin(host.t * 15);
  }
  x.fillStyle = used ? C.viola : C.pietra;
  engine.rr(x, q.x - sw / 2, q.y - sh / 2, sw, sh, 19);
  x.fill();
  x.shadowBlur = 0;
  x.strokeStyle = lit || cursor ? C.carta : 'rgba(0,0,0,.4)';
  x.lineWidth = lit ? 3 : cursor ? 2.5 : 1.5;
  engine.rr(x, q.x - sw / 2, q.y - sh / 2, sw, sh, 19);
  x.stroke();
  x.fillStyle = used ? 'rgba(154,160,166,.5)' : C.cielo;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  fitFont(x, p, sw - 24, 14, '800');
  x.fillText(p, q.x, q.y + 1);
  x.restore();
}

function drawLever(host, x, L) {
  const lx = LEVER.x;
  const ly = LEVER.y;
  x.fillStyle = C.pietra;
  engine.rr(x, lx - 44, ly + 18, 88, 14, 4);
  x.fill();
  // The stick tilts while the pull is felt.
  const tilt = -0.55 + host.lever * 0.9;
  const tx = lx + Math.sin(tilt) * 46;
  const ty = ly + 18 - Math.cos(tilt) * 46;
  x.strokeStyle = C.pietra;
  x.lineWidth = 6;
  x.beginPath();
  x.moveTo(lx, ly + 18);
  x.lineTo(tx, ty);
  x.stroke();
  x.fillStyle = C.verde;
  x.beginPath();
  x.arc(tx, ty, 13, 0, 6.283);
  x.fill();
  x.font = `800 13px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillStyle = C.pietra;
  x.fillText(L.lever, lx, ly + 44);
}

function draw(host, x) {
  x.setTransform(host.sc, 0, 0, host.sc, 0, 0);
  x.clearRect(0, 0, W, H);
  x.save();
  engine.shake(host, x, host.shake);
  const still = host.reduceMotion;
  const L = TX[host.state.lang] || TX.it;
  const o = order(host);

  drawSky(x);
  drawStrata(x);
  drawTunnel(x, SHAFT.x, SKY + 4, SHAFT.w, stratumY(4) - SKY, 6);
  drawTunnel(x, 14, TRAY_TOP, W - 28, TRAY_H, 10);
  if (o) o.plates.forEach((p, i) => drawPlate(host, x, p, stratumY(i), still));
  if (host.kbUsed && host.strat >= 0) {
    x.strokeStyle = C.carta;
    x.lineWidth = 2;
    x.strokeRect(PLATE.x - 6, stratumY(host.strat) + 6, PLATE.w + 12, ST - 12);
  }
  drawHeadframe(host, x, still);
  drawCage(host, x, L, still);
  if (host.cfg) host.cfg.tray.forEach((p, i) => drawStone(host, x, p, i, still));
  drawLever(host, x, L);
  drawSlip(host, x);
  drawHud(host, x, still);
  engine.drawParts(x, host.parts);
  if (host.flash > 0) {
    x.fillStyle = `rgba(242,230,201,${host.flash * 0.08})`;
    x.fillRect(-OVER, -OVER, W + OVER * 2, H + OVER * 2);
  }
  if (host.props && host.props.diagnostica && o) {
    x.fillStyle = C.carta;
    x.font = `600 11px ${FONT}`;
    x.textAlign = 'left';
    x.fillText(
      `c${host.chapter + 1}.${host.state.beat + 1}  peso ${weight(host.cfg, host.card)}/${
        o.job.budget
      }  atteso ${o.job.want.join('+')}  ${o.item.english}`,
      12,
      H - 14
    );
  }
  x.restore();
}

// ─── chrome copy (rendered by GameHost, written here) ─────

function coachText(host, coach, lang) {
  const L = TX[lang] || TX.it;
  const lines = L[coach.kind] || L.miss;
  const ask = lang === 'en' && coach.askEn ? coach.askEn : coach.ask || '';
  const sub = (t) =>
    t
      .replace(/\{pick\}/g, coach.pick || '')
      .replace(/\{word\}/g, coach.word || '')
      .replace(/\{it\}/g, coach.it || '')
      .replace(/\{ask\}/g, ask)
      .replace(/\{load\}/g, String(coach.load == null ? '' : coach.load))
      .replace(/\{budget\}/g, String(coach.budget == null ? '' : coach.budget));
  return { what: sub(lines[0]), effect: sub(lines[1]), rule: sub(lines[2]), hint: L.hint };
}

/* nodejs.js lesson titles are written "English / Italiano". */
function lessonTitle(item, lang) {
  if (!item || !item.lessonTitle) return '';
  const halves = String(item.lessonTitle).split(' / ');
  const half = lang === 'en' || !halves[1] ? halves[0] : halves[1];
  return half.trim();
}

function doneView(host, lang) {
  const L = TX[lang] || TX.it;
  const terms = host.terms || [];
  return {
    eyebrow: L.eyebrow,
    title: terms.map(labelOf).join(' · '),
    subtitle:
      lang === 'en'
        ? lessonTitle(host.item, 'en')
        : `${meaningOf(host.item, 'it')} · ${lessonTitle(host.item, 'it')}`,
  };
}

function onCoachClose(host) {
  host.coachKind = null;
}

export default {
  meta: {
    id: 'nodejs-l10-archivio',
    surface: 'nodejs',
    level: 9,
    band: 2,
    register: 'R4',
    title: "L'archivio",
    titleEn: 'The archive',
    // GameHost prints this verbatim, so the pair lives in the string (§14.7).
    levelLabel: 'Node.js · L10 Integrazione Database / Node.js · L10 Database Integration',
    font: '700 16px "Baloo 2"',
  },
  W,
  H,
  CH,
  drone: { freq: 40, type: 'triangle', volume: 0.014, lowpass: 120 },
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
