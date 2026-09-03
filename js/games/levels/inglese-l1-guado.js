/**
 * SOTTO LA ROCCA — galleria 1: il guado dei carrelli.
 * Inglese L1 «Vita quotidiana» (js/data/lessons-level-1.js), 8 capitoli × 5 frasi = 40.
 *
 * SCHEDA DI PROGETTO (ricerca/00 §0.3) + SCHEDA VISIVA (ricerca/42 §42.3)
 * CONCETTO ... La frase inglese si costruisce da sinistra a destra, una parola
 *              alla volta, e la forma di ogni parola dipende da quella che
 *              l'ha preceduta.
 * FORMA ...... sequenza + corrispondenza    VERBO ... saltare sul carrello giusto
 * ARCHETIPO .. Frogger (ricerca/40.8 ★★★): ogni corsia è una posizione della frase
 * VINCI SE ... la frase è attraversata: tutte le parole raccolte nell'ordine
 * PERDI SE ... la lanterna si spegne (budget 6,5 s a parola): risali e riprovi
 * SBAGLI ..... 1 il carrello sobbalza e ti rimanda al livello sopra (tonfo, mai rosso)
 *              2 alla seconda, il carrello giusto prende la luce della lanterna
 *              3 coaching: cosa hai preso, perché non va qui, la regola
 * CAPITOLI ... 1 il salto · 2 contromano · 3 FRATTURA la forma giusta (has/have)
 *              4 due parole insieme · 5 il cartello si spegne · 6 il quarto carrello
 *              7 a raffica · 8 la galleria intera
 * MONDO ...... sottosuolo a strati sotto una rocca: gallerie con carrelli da
 *              miniera che portano parole su targhe di legno; il cartello in
 *              italiano in cima, la frase inglese che si scava scendendo.
 * REGISTRO ... R4 Terra a strati: ocra→arancio→bruno→viola, gallerie nere, rotaie.
 *              figura: l'esploratore con la lanterna sull'elmo · suolo: gli strati
 *              movimento: carrelli in loop, salto ad arco con squash · carattere: Baloo 2
 * NUMERI ..... carrelli 62→96 px/s (un carrello resta a schermo ≥ 4,4 s, ricerca/31)
 *              salto 0,42 s · rientro dopo errore 0,6 s · lanterna (6,5·N+10) s × oil
 * TEST 1 ..... i carrelli sono identici: cambia solo la parola. Posizione e colore
 *              non dicono nulla; i distrattori sono le altre parole della frase
 *              (ordine) e le forme vicine (has/have, a/an, to/too). Si vince solo
 *              leggendo.
 * TEST 2 ..... «Salto sul carrello che porta la prossima parola della frase, prima
 *              che la lanterna si spenga.»
 * TEST 3 ..... un esploratore fermo sull'orlo del pozzo, carrelli con parole che
 *              scorrono sotto, il primo giusto brilla piano: la mano ci va da sola.
 */

import * as engine from '../KaioEngine.js';
import { ttsService } from '../../services/TTSService.js';

const W = 420;
const H = 910;
const SURF = 262;
const SOIL = 40;
const TUN = 74;
const LH = SOIL + TUN;
const HUDH = 160;

const STRATA = [
  '#E0A23A',
  '#D2691E',
  '#8B3A1E',
  '#4B1E4B',
  '#2E3A5C',
  '#1F5148',
  '#6B2D3A',
  '#2C2C4A',
];
const FONT = '"Baloo 2","Nunito","Trebuchet MS",system-ui,sans-serif';

function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.round((n >> 16) * f));
  const g = Math.min(255, Math.round(((n >> 8) & 255) * f));
  const b = Math.min(255, Math.round((n & 255) * f));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

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

function clean(t) {
  return t.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g, '');
}

/* Morfologia minima: forme vicine della stessa parola, col tipo di errore che
   insegnano. Un distrattore è sempre una parola vera — mai inventata — così
   ogni sbaglio è un confronto fra due cose che esistono (ricerca/35 §35.3.3). */
const VAR = {
  is: ['are', 'am', 'was'],
  are: ['is', 'am', 'were'],
  am: ['is', 'are'],
  was: ['were', 'is'],
  were: ['was', 'are'],
  has: ['have', 'had'],
  have: ['has', 'had'],
  had: ['has', 'have'],
  do: ['does', 'did'],
  does: ['do', 'did'],
  did: ['do', 'does'],
  "don't": ["doesn't", "didn't"],
  "doesn't": ["don't", "didn't"],
  "isn't": ["aren't", "wasn't"],
  "can't": ["couldn't", 'cannot'],
  a: ['an', 'the'],
  an: ['a', 'the'],
  the: ['a', 'an'],
  to: ['too', 'two'],
  too: ['to', 'two'],
  of: ['off', 'for'],
  for: ['of', 'from'],
  from: ['for', 'of'],
  in: ['on', 'at'],
  on: ['in', 'at'],
  at: ['in', 'on'],
  with: ['without', 'by'],
  by: ['with', 'be'],
  he: ['she', 'him'],
  she: ['he', 'her'],
  his: ['her', 'him'],
  her: ['his', 'she'],
  i: ['me', 'my'],
  my: ['me', 'mine'],
  me: ['my', 'I'],
  they: ['them', 'their'],
  their: ['they', 'there'],
  there: ['their', 'they'],
  we: ['us', 'our'],
  our: ['us', 'we'],
  you: ['your', 'yours'],
  your: ['you', 'yours'],
  it: ['its', "it's"],
  its: ['it', "it's"],
  than: ['then', 'that'],
  then: ['than', 'that'],
  quite: ['quiet', 'quit'],
  very: ['vary', 'every'],
  and: ['end', 'an'],
  always: ['never', 'all ways'],
  usually: ['usual', 'usually'],
};

const KIND = {
  agree: [
    'is',
    'are',
    'am',
    'was',
    'were',
    'has',
    'have',
    'had',
    'do',
    'does',
    'did',
    "don't",
    "doesn't",
    "isn't",
    "can't",
  ],
  article: ['a', 'an', 'the'],
  prep: ['to', 'too', 'of', 'for', 'from', 'in', 'on', 'at', 'with', 'by'],
  pronoun: [
    'he',
    'she',
    'his',
    'her',
    'i',
    'my',
    'me',
    'they',
    'their',
    'there',
    'we',
    'our',
    'you',
    'your',
    'it',
    'its',
  ],
  near: ['than', 'then', 'quite', 'very', 'and', 'always', 'usually'],
};

function kindOf(word) {
  for (const k of Object.keys(KIND)) if (KIND[k].indexOf(word) >= 0) return k;
  return 'agree';
}

function morph(word) {
  const l = word.toLowerCase();
  if (VAR[l]) return { v: VAR[l], k: kindOf(l) };
  const out = [];
  if (/ies$/.test(l)) out.push(`${l.slice(0, -3)}y`);
  else if (/(s|x|ch|sh)es$/.test(l)) out.push(l.slice(0, -2));
  else if (/s$/.test(l) && l.length > 3) out.push(l.slice(0, -1));
  else if (/ing$/.test(l) && l.length > 5) out.push(l.slice(0, -3), `${l.slice(0, -3)}ed`);
  else if (/ed$/.test(l) && l.length > 4) out.push(l.slice(0, -2), `${l.slice(0, -2)}ing`);
  else if (/y$/.test(l) && l.length > 3) out.push(`${l.slice(0, -1)}ies`);
  else if (/(s|x|ch|sh)$/.test(l)) out.push(`${l}es`);
  else out.push(`${l}s`);
  return { v: out.filter((x) => x !== l), k: 'agree' };
}

function matchCase(text, ref) {
  if (!text) return text;
  if (text.toLowerCase() === 'i') return 'I';
  const upper = ref[0] !== ref[0].toLowerCase();
  return upper ? text[0].toUpperCase() + text.slice(1) : text[0].toLowerCase() + text.slice(1);
}

/* Passi della frase: una parola (o due, nei capitoli con le coppie) più i
   distrattori del passo. */
function buildSteps(en, cfg, pool) {
  const words = en
    .split(/\s+/)
    .map((t) => ({ raw: t, lab: clean(t) }))
    .filter((w) => w.lab);

  const steps = [];
  for (let i = 0; i < words.length; i++) {
    if (
      cfg.chunks &&
      i < words.length - 1 &&
      Math.random() < 0.4 &&
      words[i].lab.length + words[i + 1].lab.length < 13
    ) {
      steps.push({ words: [words[i], words[i + 1]] });
      i++;
    } else {
      steps.push({ words: [words[i]] });
    }
  }
  steps.forEach((s, i) => {
    s.lab = s.words.map((w) => w.lab).join(' ');
    s.n = i;
  });

  steps.forEach((s) => {
    const seen = { [s.lab.toLowerCase()]: 1 };
    const ds = [];
    const add = (text, k) => {
      if (!text || ds.length >= cfg.dis) return;
      const token = text.toLowerCase();
      if (seen[token]) return;
      seen[token] = 1;
      ds.push({ lab: matchCase(text, s.lab), k });
    };

    if (s.words.length === 2) {
      add(`${s.words[1].lab} ${s.words[0].lab}`, 'chunk');
      const m = morph(s.words[1].lab);
      if (m.v[0]) add(`${s.words[0].lab} ${m.v[0]}`, 'chunk');
    } else {
      if (cfg.variants) {
        const m = morph(s.words[0].lab);
        shuffle(m.v)
          .slice(0, cfg.dis >= 3 ? 2 : 1)
          .forEach((v) => add(v, m.k));
      }
      if (cfg.near) {
        const l = s.words[0].lab.toLowerCase();
        if (VAR[l] && KIND.near.indexOf(l) >= 0) add(VAR[l][0], 'near');
      }
    }
    shuffle(steps.filter((o) => o !== s).map((o) => o.lab)).forEach((o) => add(o, 'order'));
    shuffle(pool).forEach((p) => add(p, 'other'));
    s.dis = ds;
  });

  return steps;
}

function measure(host, lab) {
  const m = host.mctx;
  m.font = `700 17px ${FONT}`;
  return Math.max(88, Math.ceil(m.measureText(lab).width) + 34);
}

/**
 * Where a cart sits on its loop right now. Shared by makeLane and update so a
 * lane is laid out the moment it is built: leaving the carts on a sentinel
 * until the first update stacks them all on one point, and a tap inside that
 * window — one slow first frame on a mid-range phone is enough — lands on an
 * arbitrary cart the learner never saw and books a wrong answer against them.
 */
function layoutLane(lane) {
  for (const c of lane.carts) {
    c.x = ((((c.s + lane.t) % lane.loop) + lane.loop) % lane.loop) - 130 + c.w / 2;
  }
}

function makeLane(host, step, i, cfg) {
  const items = shuffle(
    [{ lab: step.lab, ok: true }].concat(step.dis.map((d) => ({ lab: d.lab, ok: false, k: d.k })))
  );
  // Reduced motion: the carts are the game and cannot stop, but a slower loop
  // is the static-equivalent that stays readable (§15.4, ricerca/42 §42.6 #10).
  const motionScale = host.reduceMotion ? 0.7 : 1;
  const lane = {
    i,
    dir: cfg.alt && i % 2 === 1 ? -1 : 1,
    speed: cfg.speed * host.vel * motionScale * (0.9 + Math.random() * 0.2),
    carts: [],
    y: SURF + i * LH,
    step,
    t: 0,
    frozen: false,
    aided: false,
  };
  lane.carts = items.map((it) => ({
    lab: it.lab,
    ok: it.ok,
    k: it.k || 'order',
    w: measure(host, it.lab),
    x: 0,
    s: 0,
    jolt: 0,
    glow: 0,
    L: lane,
  }));
  const gap = 58;
  const loop = lane.carts.reduce((a, k) => a + k.w + gap, 0);
  lane.loop = Math.max(loop, W + 200);
  let s = Math.random() * lane.loop;
  for (const k of lane.carts) {
    k.s = s;
    s += k.w + gap;
  }
  layoutLane(lane);
  return lane;
}

function cartHeroX(c) {
  return c.x + (c.L.dir > 0 ? -(c.w / 2 - 16) : c.w / 2 - 16);
}

/* Capitoli: una meccanica nuova ciascuno (ricerca/03 §3.4, modello del Chiosco). */
const CFG = [
  {
    alt: false,
    dis: 2,
    variants: false,
    chunks: false,
    fade: false,
    near: false,
    speed: 62,
    oil: 1.2,
    hint: true,
  },
  {
    alt: true,
    dis: 2,
    variants: false,
    chunks: false,
    fade: false,
    near: false,
    speed: 66,
    oil: 1.1,
  },
  {
    alt: true,
    dis: 2,
    variants: true,
    chunks: false,
    fade: false,
    near: false,
    speed: 68,
    oil: 1.05,
  },
  { alt: true, dis: 2, variants: true, chunks: true, fade: false, near: false, speed: 70, oil: 1 },
  { alt: true, dis: 2, variants: true, chunks: false, fade: true, near: false, speed: 74, oil: 1 },
  {
    alt: true,
    dis: 3,
    variants: true,
    chunks: false,
    fade: true,
    near: true,
    speed: 78,
    oil: 0.95,
  },
  { alt: true, dis: 3, variants: true, chunks: true, fade: true, near: true, speed: 90, oil: 0.9 },
  { alt: true, dis: 3, variants: true, chunks: true, fade: true, near: true, speed: 96, oil: 0.85 },
];

const CHT = [
  ['Il salto', 'The hop'],
  ['Contromano', 'Two ways'],
  ['La forma giusta', 'The right form'],
  ['Due parole insieme', 'Two words at once'],
  ['Il cartello si spegne', 'The sign goes dark'],
  ['Il quarto carrello', 'The fourth cart'],
  ['A raffica', 'Rapid fire'],
  ['La galleria intera', 'The whole gallery'],
];

const CH = CFG.map((c, i) => ({
  t: CHT[i],
  titles: [1, 2, 3, 4, 5].map((n) => [`Frase ${n}`, `Sentence ${n}`]),
  beats: [0, 1, 2, 3, 4].map((b) => ({
    b,
    ...c,
    speed: c.speed * (b === 4 ? 0.9 : 1 + b * 0.03),
  })),
}));

const TX = {
  it: {
    order: [
      "L'inglese va da sinistra a destra.",
      "«{pick}» c'è nella frase, ma non è ancora il suo momento: adesso tocca a «{word}».",
      'Soggetto → verbo → il resto. Guarda cosa hai già raccolto e cerca ciò che viene subito dopo.',
    ],
    agree: [
      'La forma del verbo la decide il soggetto.',
      '«{pick}» è la parola giusta nella forma sbagliata: qui serve «{word}».',
      'Con he / she / it il verbo prende la -s (has, is, tends). Con I / you / we / they no.',
    ],
    article: [
      'a, an, the: tre parole piccole, tre lavori diversi.',
      'Qui serve «{word}», non «{pick}».',
      'a davanti a consonante, an davanti a vocale, the quando la cosa è già nota.',
    ],
    prep: [
      'La preposizione si impara con la parola che la segue.',
      'Qui serve «{word}», non «{pick}».',
      'at seven · on weekends · in the morning · for a run: impara la coppia, non la parola.',
    ],
    pronoun: [
      'Soggetto o possessivo?',
      'Qui serve «{word}», non «{pick}».',
      'he / she / they stanno prima del verbo; his / her / their stanno prima di un nome.',
    ],
    near: [
      'Si somigliano solo nel suono.',
      "«{pick}» si legge quasi come «{word}», ma è un'altra parola.",
      'than confronta, then è il tempo · to è direzione, too è "anche" · quite è "piuttosto", quiet è "silenzioso".',
    ],
    chunk: [
      'Due parole, un ordine solo.',
      "«{pick}» ha le parole giuste nell'ordine sbagliato: si dice «{word}».",
      "I verbi con particella tengono l'ordine: wake up, go for, sleep in.",
    ],
    other: [
      "Quella parola viene da un'altra frase.",
      '«{pick}» non appartiene a questa frase: adesso serve «{word}».',
      'Rileggi il cartello e cerca la parola che continua la frase, non quella che le somiglia.',
    ],
    dark: [
      'La lanterna si è spenta.',
      'La frase intera era: «{en}»',
      'Risali e riprova: i carrelli si sono rimescolati, le parole no.',
    ],
    hint: 'tocca il carrello con la parola giusta · ← → e spazio da tastiera',
    eyebrow: 'Frase attraversata',
  },
  en: {
    order: [
      'English runs left to right.',
      '"{pick}" is in the sentence, but not yet: "{word}" comes now.',
      'Subject → verb → the rest. Look at what you have collected and find what comes right after.',
    ],
    agree: [
      'The subject decides the verb form.',
      '"{pick}" is the right word in the wrong form: here you need "{word}".',
      'With he / she / it the verb takes -s (has, is, tends). With I / you / we / they it does not.',
    ],
    article: [
      'a, an, the: three small words, three jobs.',
      'Here you need "{word}", not "{pick}".',
      'a before a consonant, an before a vowel, the when the thing is already known.',
    ],
    prep: [
      'Learn the preposition with the word that follows it.',
      'Here you need "{word}", not "{pick}".',
      'at seven · on weekends · in the morning · for a run: learn the pair, not the word.',
    ],
    pronoun: [
      'Subject or possessive?',
      'Here you need "{word}", not "{pick}".',
      'he / she / they go before the verb; his / her / their go before a noun.',
    ],
    near: [
      'They only sound alike.',
      '"{pick}" reads almost like "{word}", but it is another word.',
      'than compares, then is time · to is direction, too means "also" · quite is "rather", quiet is "silent".',
    ],
    chunk: [
      'Two words, one order.',
      '"{pick}" has the right words in the wrong order: it is "{word}".',
      'Particle verbs keep their order: wake up, go for, sleep in.',
    ],
    other: [
      'That word comes from another sentence.',
      '"{pick}" does not belong here: now you need "{word}".',
      'Read the sign again and look for the word that continues the sentence, not the one that resembles it.',
    ],
    dark: [
      'The lantern went out.',
      'The whole sentence was: "{en}"',
      'Climb back and try again: the carts were shuffled, the words were not.',
    ],
    hint: 'tap the cart with the right word · ← → and space on a keyboard',
    eyebrow: 'Sentence crossed',
  },
};

const HERO = {
  minatore: { hat: '#C0392B', lamp: '#FFE066', skin: '#F2C9A0', tunic: '#3B6EA5', legs: '#2A2A2A' },
  cavaliere: {
    hat: '#9AA5B1',
    lamp: '#FFE066',
    skin: '#F2C9A0',
    tunic: '#2E7D5B',
    legs: '#333333',
  },
  maga: {
    hat: '#6C3FA0',
    lamp: '#B7F0FF',
    skin: '#F2C9A0',
    tunic: '#4B2A7A',
    legs: '#2A2A2A',
    tall: true,
  },
};

function freshHero() {
  return {
    at: 0,
    on: null,
    x: W / 2,
    y: SURF,
    hop: null,
    face: 1,
    prev: null,
    pend: 0,
    pendFn: null,
    sq: 1,
  };
}

/**
 * Which of the level's 40 sentences this chapter/beat teaches. Eight chapters
 * over four lessons: two chapters per lesson, five sentences each, so the pair
 * (chapter, beat) covers the level exactly once with no repeats.
 */
function pickItem(host, chapterIndex, beat) {
  const lessons = host.session.lessons;
  if (!lessons.length) return null;
  const lesson = lessons[Math.floor(chapterIndex / 2) % lessons.length];
  if (!lesson || !lesson.items.length) return null;
  return lesson.items[((chapterIndex % 2) * 5 + beat) % lesson.items.length] || null;
}

function distractorPool(host, chapterIndex, current) {
  const lessons = host.session.lessons;
  const lesson = lessons[Math.floor(chapterIndex / 2) % lessons.length];
  if (!lesson) return [];
  return lesson.items
    .filter((x) => x !== current)
    .map((x) => x.english.split(/\s+/))
    .reduce((a, b) => a.concat(b), [])
    .map(clean)
    .filter((w) => w.length > 2);
}

// ─── lifecycle ───────────────────────────────────

function tune(host) {
  host.vel = { lenta: 0.8, normale: 1, veloce: 1.25 }[host.props.velocita] || 1;
  host.pal = HERO[host.props.eroe] || HERO.minatore;
}

function init(host) {
  host.mctx = document.createElement('canvas').getContext('2d');
  host.pat = {};
  host.parts = [];
  host.lanes = [];
  host.steps = [];
  host.got = [];
  host.sent = { en: '', it: '' };
  host.cam = 0;
  host.t = 0;
  host.oil = 1;
  host.fadeA = 1;
  host.hero = freshHero();
  tune(host);
}

function remeasure(host) {
  for (const L of host.lanes) for (const c of L.carts) c.w = measure(host, c.lab);
}

function reset(host, beat) {
  const cfg = host.BEATS[beat];
  host.cfg = cfg;
  const ci = host.state.chapter || 0;

  host.parts = [];
  host.fly = null;
  host.streak = 0;
  host.sel = 0;
  host.kb = false;
  host.cam = 0;
  host.oil = 1;
  host.t = 0;
  host.dark = 0;
  host.fadeA = 1;
  host.doneT = 0;
  host.finished = false;
  host.coachKind = null;

  const item = pickItem(host, ci, beat);
  host.item = item;
  host.sent = item ? { en: item.english, it: item.italian } : { en: '', it: '' };
  if (item) {
    item.introduce();
    host.session.mode = 'guado';
  }

  const pool = item ? distractorPool(host, ci, item) : [];
  host.steps = item ? buildSteps(item.english, cfg, pool) : [];
  host.lanes = host.steps.map((s, i) => makeLane(host, s, i, cfg));
  host.N = host.lanes.length;
  host.depth = SURF + host.N * LH;
  host.hero = freshHero();
  host.got = [];
  host.budget = (6.5 * host.N + 10) * cfg.oil;
  host.strOff = beat;
  host.hint = cfg.hint && beat === 0 ? 1 : 0;
  host.session.mark();
}

function rebuild(host) {
  host.lanes = host.steps.map((s, i) => makeLane(host, s, i, host.cfg));
  host.hero = freshHero();
  host.got = [];
  host.oil = 1;
  host.dark = 0;
  host.streak = 0;
  host.fadeA = 1;
  host.fly = null;
  host.session.mark();
}

// ─── the verb ────────────────────────────────────

function hop(host, cart, lane) {
  const h = host.hero;
  if (h.hop || h.pend > 0 || host.finished || host.dark) return;
  if (h.on) h.on.L.frozen = false;
  h.prev = { at: h.at, on: h.on, x: h.x, y: h.y };
  h.hop = { t: 0, dur: 0.42, fx: h.x, fy: h.y, c: cart, L: lane };
  engine.snd(host, 'whoosh');
  engine.burst(host, host.parts, h.x, h.y, 6, '#C9A56B', { up: 60, v0: 30, v1: 80, r: 1.5 });
}

function hopTo(host, x, y, fn) {
  const h = host.hero;
  if (h.on) h.on.L.frozen = false;
  h.hop = { t: 0, dur: 0.5, fx: h.x, fy: h.y, x, y, fn, arc: 80 };
  engine.snd(host, 'whoosh');
}

function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

function finish(host) {
  host.finished = true;
  engine.snd(host, 'chime', { notes: [523, 659, 784, 1046] });
  engine.burst(host, host.parts, W / 2 + 44, host.depth + 78, 26, '#FFD700', {
    up: 140,
    v0: 60,
    v1: 200,
    r: 2,
  });
  if (host.item) {
    host.item.clear();
    host.session.save({ beat: host.state.beat, chapter: host.state.chapter });
  }
  say(host, host.sent.en);
  host.doneT = 1.5;
}

/**
 * Every cart tap is one graded response about English — which word comes next,
 * in which form — so it goes through the SDK rather than a local `===`. The
 * cue is `silent` because the game already answers diegetically: the cart pops
 * and the word flies to the sign, or it jolts and drops you a gallery.
 */
function report(host, lane, picked, correct) {
  if (!host.item) return;
  host.item.attempt(picked, {
    expected: lane.step.lab,
    mode: 'guado',
    hintsUsed: lane.aided ? 1 : 0,
    silent: true,
  });
  host.session.mark();
  if (correct) host.session.save({ beat: host.state.beat, chapter: host.state.chapter });
}

function land(host, hp) {
  const h = host.hero;
  if (!hp.c) {
    h.on = null;
    h.x = hp.x;
    h.y = hp.y;
    if (hp.fn) hp.fn();
    return;
  }

  const c = hp.c;
  const L = hp.L;
  h.on = c;
  L.frozen = true;
  h.x = cartHeroX(c);
  h.y = L.y + SOIL + 18;
  if (hp.back) {
    h.at = hp.at;
    return;
  }

  if (c.ok) {
    report(host, L, c.lab, true);
    h.at = L.i + 1;
    host.got.push(L.step.lab);
    host.streak = 0;
    host.hint = 0;
    engine.snd(host, 'pop', { hz: 360 + h.at * 40 });
    engine.burst(host, host.parts, c.x, L.y + SOIL + 18, 10, '#E7C98F', {
      up: 50,
      v0: 40,
      v1: 120,
    });
    host.fly = { lab: L.step.lab, x: c.x, y: L.y + SOIL + 30 - host.cam, t: 0 };
    if (h.at >= host.N) {
      h.pend = 0.55;
      h.pendFn = () => hopTo(host, W / 2 - 46, host.depth + 108, () => finish(host));
    }
    return;
  }

  report(host, L, c.lab, false);
  c.jolt = 0.5;
  host.hitstop = 60;
  engine.snd(host, 'thud');
  engine.snd(host, 'click', { hz: 900, v: 0.25 });
  engine.burst(host, host.parts, c.x, L.y + SOIL + 60, 8, '#FFB347', {
    up: 20,
    v0: 60,
    v1: 160,
    r: 1.2,
  });

  host.streak++;
  if (host.streak >= 2) {
    // Second error on the same step: the lantern points, it does not explain
    // (ricerca/00 passo 6, livello 2). From here the step is aided, and the
    // SDK is told so — the XP has to reflect that the answer was shown.
    const ok = L.carts.filter((k) => k.ok)[0];
    if (ok) ok.glow = 1;
    L.aided = true;
  }
  if (host.streak >= 3) {
    host.coachKind = c.k || 'order';
    host.setState({ coach: { kind: host.coachKind, pick: c.lab, word: L.step.lab } });
  }

  h.pend = 0.6;
  h.pendFn = () => {
    const p = h.prev;
    L.frozen = false;
    engine.snd(host, 'whoosh');
    if (p.on) {
      h.hop = { t: 0, dur: 0.42, fx: h.x, fy: h.y, c: p.on, L: p.on.L, back: true, at: p.at };
    } else {
      h.hop = {
        t: 0,
        dur: 0.42,
        fx: h.x,
        fy: h.y,
        x: p.x,
        y: p.y,
        fn: () => {
          h.at = p.at;
        },
      };
    }
  };
}

// ─── update ──────────────────────────────────────

function update(host, dt) {
  host.t += dt;
  const h = host.hero;

  for (const L of host.lanes) {
    if (!L.frozen) L.t += L.dir * L.speed * dt;
    for (const c of L.carts) c.jolt = Math.max(0, c.jolt - dt * 1.6);
    layoutLane(L);
  }

  if (h.on && !h.hop) {
    h.x = cartHeroX(h.on);
    h.y = h.on.L.y + SOIL + 18;
    h.face = h.on.L.dir;
  }

  if (h.hop) {
    const hp = h.hop;
    hp.t += dt;
    const k = Math.min(1, hp.t / hp.dur);
    const e = k * k * (3 - 2 * k);
    const tx = hp.c ? cartHeroX(hp.c) : hp.x;
    const ty = hp.c ? hp.L.y + SOIL + 18 : hp.y;
    h.x = hp.fx + (tx - hp.fx) * e;
    h.y = hp.fy + (ty - hp.fy) * e - Math.sin(Math.PI * k) * (hp.arc || 64);
    if (Math.abs(tx - hp.fx) > 4) h.face = tx > hp.fx ? 1 : -1;
    h.sq = k < 0.2 ? 1 + 0.15 * (1 - k / 0.2) : k > 0.8 ? 1 - 0.18 * ((k - 0.8) / 0.2) : 1;
    if (k >= 1) {
      h.hop = null;
      h.sq = 1;
      land(host, hp);
    }
  }

  if (h.pend > 0) {
    h.pend -= dt;
    if (h.pend <= 0) {
      h.pend = 0;
      const f = h.pendFn;
      h.pendFn = null;
      if (f) f();
    }
  }

  // The loss condition is the concept made physical, not an error counter
  // (ricerca/00 passo 5): the lantern burns for as long as the sentence is
  // worth, and reading is what costs time.
  if (!host.finished && !host.dark && host.N > 0) {
    host.oil -= dt / host.budget;
    if (host.oil <= 0) {
      host.oil = 0;
      host.dark = 1;
      engine.snd(host, 'whir');
      host.coachKind = 'dark';
      host.setState({ coach: { kind: 'dark' } });
    }
  }

  if (host.fly) {
    host.fly.t += dt;
    if (host.fly.t > 0.5) host.fly = null;
  }
  host.parts = engine.parts(host.parts, dt, 420);

  const maxCam = Math.max(0, host.depth + 150 - H);
  const target = Math.max(0, Math.min(maxCam, h.y - 430));
  host.cam += (target - host.cam) * Math.min(1, dt * 5);

  if (host.doneT > 0) {
    host.doneT -= dt;
    if (host.doneT <= 0) {
      host.doneT = 0;
      host.setState({ done: true });
    }
  }

  if (host.cfg && host.cfg.fade) {
    const want = host.got.length >= 3 ? 0.16 : 1;
    host.fadeA += (want - host.fadeA) * Math.min(1, dt * 2);
  }
}

// ─── input ───────────────────────────────────────

function tap(host, p) {
  const h = host.hero;
  if (h.hop || h.pend > 0 || host.finished || host.dark || h.at >= host.N) return;
  const L = host.lanes[h.at];
  const wy = p.y + host.cam;
  if (Math.abs(wy - (L.y + SOIL + TUN / 2)) > 66) return;

  let best = null;
  let bd = 1e9;
  for (const c of L.carts) {
    const d = Math.abs(p.x - c.x);
    if (d < c.w / 2 + 14 && d < bd) {
      bd = d;
      best = c;
    }
  }
  if (best) {
    host.kb = false;
    hop(host, best, L);
  } else {
    engine.snd(host, 'click', { hz: 500, v: 0.12 });
  }
}

function visible(L) {
  return L.carts.filter((c) => c.x > -c.w / 2 && c.x < W + c.w / 2).sort((a, b) => a.x - b.x);
}

function key(host, e) {
  const h = host.hero;
  if (h.at >= host.N || host.finished || host.dark) return;
  const L = host.lanes[h.at];
  const vis = visible(L);
  if (!vis.length) return;

  if (e.key === 'ArrowLeft') {
    host.kb = true;
    host.sel = (host.sel - 1 + vis.length) % vis.length;
    e.preventDefault();
  } else if (e.key === 'ArrowRight') {
    host.kb = true;
    host.sel = (host.sel + 1) % vis.length;
    e.preventDefault();
  } else if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowDown') {
    e.preventDefault();
    hop(host, vis[Math.min(host.sel, vis.length - 1)], L);
  } else if (/^[1-4]$/.test(e.key)) {
    const i = parseInt(e.key, 10) - 1;
    if (vis[i]) hop(host, vis[i], L);
  }
}

// ─── drawing ─────────────────────────────────────

function pattern(host, ctx, col) {
  if (host.pat[col]) return host.pat[col];
  const c = document.createElement('canvas');
  c.width = 18;
  c.height = 18;
  const g = c.getContext('2d');
  g.fillStyle = shade(col, 0.78);
  [
    [3, 4],
    [11, 2],
    [7, 11],
    [15, 13],
  ].forEach((p) => g.fillRect(p[0], p[1], 2, 2));
  host.pat[col] = ctx.createPattern(c, 'repeat');
  return host.pat[col];
}

function drawSurface(host, x) {
  const sky = x.createLinearGradient(0, 0, 0, SURF);
  sky.addColorStop(0, '#0B1026');
  sky.addColorStop(1, '#243063');
  x.fillStyle = sky;
  x.fillRect(0, -40, W, SURF + 40);

  x.fillStyle = 'rgba(255,255,255,.8)';
  for (let i = 0; i < 34; i++) {
    x.globalAlpha = 0.3 + ((i * 7) % 10) / 14;
    x.fillRect((i * 137) % W, HUDH + ((i * 71) % (SURF - HUDH - 70)), 1.5, 1.5);
  }
  x.globalAlpha = 1;

  x.fillStyle = '#F3EBD3';
  x.beginPath();
  x.arc(334, 196 - 70, 17, 0, 6.283);
  x.fill();
  x.fillStyle = '#243063';
  x.beginPath();
  x.arc(343, 190 - 70, 14, 0, 6.283);
  x.fill();

  x.fillStyle = '#0A0B16';
  x.fillRect(18, SURF - 78, 132, 78);
  x.fillRect(10, SURF - 104, 30, 104);
  x.fillRect(128, SURF - 116, 30, 116);
  for (let i = 0; i < 4; i++) x.fillRect(48 + i * 22, SURF - 86, 12, 10);
  for (let i = 0; i < 2; i++) {
    x.fillRect(12 + i * 12, SURF - 112, 8, 10);
    x.fillRect(130 + i * 12, SURF - 124, 8, 10);
  }
  x.fillStyle = '#FFD27A';
  x.fillRect(139, SURF - 94, 4, 6);
  x.fillRect(22, SURF - 70, 4, 6);

  x.fillStyle = '#3B6B3A';
  x.fillRect(0, SURF - 8, W, 8);
  x.fillStyle = '#2F5630';
  for (let i = 0; i < W; i += 9) x.fillRect(i, SURF - 8 - ((i * 7) % 3), 3, 3);

  x.fillStyle = '#5A3A22';
  x.fillRect(W / 2 - 46, SURF - 54, 8, 54);
  x.fillRect(W / 2 + 38, SURF - 54, 8, 54);
  x.fillRect(W / 2 - 52, SURF - 60, 104, 8);
  x.fillStyle = '#3A2A1E';
  x.fillRect(W / 2 - 1, SURF - 52, 2, 14);
  x.fillStyle = '#FFB300';
  x.fillRect(W / 2 - 4, SURF - 40, 8, 10);
  x.fillStyle = '#120E0B';
  x.fillRect(W / 2 - 34, SURF, 68, SOIL + 2);
}

function drawStrata(host, x) {
  host.lanes.forEach((L, i) => {
    const col = STRATA[(i + host.strOff) % STRATA.length];
    x.fillStyle = col;
    x.fillRect(0, L.y, W, LH);
    x.fillStyle = pattern(host, x, col);
    x.fillRect(0, L.y, W, LH);

    const ty = L.y + SOIL;
    x.fillStyle = '#120E0B';
    x.fillRect(0, ty, W, TUN);
    x.fillStyle = shade(col, 0.55);
    x.fillRect(0, ty, W, 3);
    x.fillRect(0, ty + TUN - 3, W, 3);
    x.fillStyle = '#3A2A1E';
    for (let k = 6; k < W; k += 30) x.fillRect(k, ty + 63, 14, 5);
    x.fillStyle = '#7C7C84';
    x.fillRect(0, ty + 62, W, 2);
    x.fillRect(0, ty + 66, W, 1.5);
  });

  const col = STRATA[(host.N + host.strOff) % STRATA.length];
  const y0 = host.depth;
  x.fillStyle = col;
  x.fillRect(0, y0, W, 170);
  x.fillStyle = pattern(host, x, col);
  x.fillRect(0, y0, W, 170);

  x.fillStyle = '#0F0C0A';
  engine.rr(x, 44, y0 + 8, W - 88, 122, 18);
  x.fill();
  x.fillStyle = '#3A2A1E';
  x.fillRect(56, y0 + 108, W - 112, 8);
  x.fillStyle = '#2A1A10';
  engine.rr(x, W - 130, y0 + 40, 52, 70, [26, 26, 0, 0]);
  x.fill();
  x.fillStyle = '#5A3A22';
  x.fillRect(W - 134, y0 + 40, 4, 70);
  x.fillRect(W - 82, y0 + 40, 4, 70);
  x.fillStyle = '#8B5A2B';
  x.fillRect(W / 2 + 22, y0 + 80, 44, 28);
  x.fillStyle = '#A0693A';
  engine.rr(x, W / 2 + 22, y0 + 72, 44, 14, [6, 6, 0, 0]);
  x.fill();
  x.fillStyle = '#FFD700';
  x.fillRect(W / 2 + 40, y0 + 72, 8, 36);
  x.fillStyle = '#3A2A1E';
  x.fillRect(W / 2 + 41, y0 + 86, 6, 8);
}

function drawCart(x, c, ty, glow, sel, t) {
  const w = c.w;
  const jx = c.jolt ? (Math.random() * 2 - 1) * 7 * c.jolt : 0;
  const bx = c.x - w / 2 + jx;
  const top = ty + 18;

  [bx + w * 0.24, bx + w * 0.76].forEach((wx) => {
    x.fillStyle = '#1E1E22';
    x.beginPath();
    x.arc(wx, ty + 54, 8, 0, 6.283);
    x.fill();
    x.strokeStyle = '#8A8A92';
    x.lineWidth = 1.5;
    x.beginPath();
    x.moveTo(wx - 6, ty + 54);
    x.lineTo(wx + 6, ty + 54);
    x.moveTo(wx, ty + 48);
    x.lineTo(wx, ty + 60);
    x.stroke();
  });

  x.fillStyle = '#4A3A33';
  x.beginPath();
  x.moveTo(bx - 3, top);
  x.lineTo(bx + w + 3, top);
  x.lineTo(bx + w - 6, ty + 48);
  x.lineTo(bx + 6, ty + 48);
  x.closePath();
  x.fill();
  x.fillStyle = '#6B5A50';
  x.fillRect(bx - 3, top, w + 6, 5);

  if (glow > 0) {
    x.shadowColor = '#FFD27A';
    x.shadowBlur = 14 + 8 * Math.sin(t * 6) * glow;
  }
  x.fillStyle = '#F3E2BF';
  engine.rr(x, bx + 6, top + 9, w - 12, 24, 4);
  x.fill();
  x.shadowBlur = 0;

  x.fillStyle = '#2B1A10';
  x.font = `700 17px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(c.lab, bx + w / 2, top + 21 + (c.jolt ? (Math.random() * 2 - 1) * 2 : 0));
  x.fillStyle = '#8B5A2B';
  x.fillRect(bx + 9, top + 12, 2, 2);
  x.fillRect(bx + w - 11, top + 12, 2, 2);

  if (sel) {
    x.fillStyle = '#FFE9A8';
    x.beginPath();
    x.moveTo(c.x - 7, top - 12);
    x.lineTo(c.x + 7, top - 12);
    x.lineTo(c.x, top - 4);
    x.fill();
  }
}

function drawLane(host, x, L) {
  const h = host.hero;
  const ty = L.y + SOIL;
  const vis = host.kb && h.at === L.i ? visible(L) : null;
  const selC = vis && vis.length ? vis[Math.min(host.sel, vis.length - 1)] : null;

  for (const c of L.carts) {
    if (c.x < -c.w / 2 - 10 || c.x > W + c.w / 2 + 10) continue;
    const glow = c.ok && (c.glow || (host.hint && L.i === 0)) ? 1 : 0;
    drawCart(x, c, ty, glow, c === selC, host.t);
  }

  const gl = x.createLinearGradient(0, 0, 70, 0);
  gl.addColorStop(0, 'rgba(8,6,4,.95)');
  gl.addColorStop(1, 'rgba(8,6,4,0)');
  x.fillStyle = gl;
  x.fillRect(0, ty + 3, 70, TUN - 6);

  const gr = x.createLinearGradient(W, 0, W - 70, 0);
  gr.addColorStop(0, 'rgba(8,6,4,.95)');
  gr.addColorStop(1, 'rgba(8,6,4,0)');
  x.fillStyle = gr;
  x.fillRect(W - 70, ty + 3, 70, TUN - 6);
}

function drawHero(x, hx, hy, face, sq, pal) {
  x.save();
  x.translate(hx, hy);
  x.scale(face * (2 - sq), sq);
  x.fillStyle = pal.legs;
  x.fillRect(-7, -8, 5, 8);
  x.fillRect(2, -8, 5, 8);
  x.fillStyle = pal.tunic;
  engine.rr(x, -9, -22, 18, 15, 3);
  x.fill();
  x.fillStyle = pal.skin;
  x.fillRect(8, -18, 4, 8);
  x.fillStyle = '#3A2A1E';
  x.fillRect(9, -10, 7, 9);
  x.fillStyle = pal.lamp;
  x.fillRect(10, -9, 5, 7);
  x.fillStyle = pal.skin;
  engine.rr(x, -7, -34, 14, 13, 4);
  x.fill();
  x.fillStyle = '#1B1B1B';
  x.fillRect(1, -30, 2, 2);
  x.fillRect(5, -30, 2, 2);
  x.fillStyle = pal.hat;
  engine.rr(x, -9, -39, 18, 8, 3);
  x.fill();
  x.fillRect(-9, -33, 18, 2);
  if (pal.tall) {
    x.beginPath();
    x.moveTo(-9, -37);
    x.lineTo(0, -54);
    x.lineTo(9, -37);
    x.fill();
  }
  x.fillStyle = pal.lamp;
  x.fillRect(6, -38, 4, 4);
  x.restore();
}

function wrap(x, text, px, py, maxW, lh, maxL) {
  const words = text.split(' ');
  let line = '';
  let n = 0;
  for (let i = 0; i < words.length; i++) {
    const test = line ? `${line} ${words[i]}` : words[i];
    if (x.measureText(test).width > maxW && line) {
      x.fillText(line, px, py + n * lh);
      n++;
      line = words[i];
      if (n >= maxL - 1) {
        let rest = words.slice(i).join(' ');
        while (x.measureText(`${rest}…`).width > maxW && rest.length > 2) rest = rest.slice(0, -1);
        if (rest !== words.slice(i).join(' ')) rest += '…';
        x.fillText(rest, px, py + n * lh);
        return;
      }
    } else {
      line = test;
    }
  }
  x.fillText(line, px, py + n * lh);
}

function drawHUD(host, x) {
  const s = host.sent;
  x.fillStyle = '#1B130D';
  x.fillRect(0, 0, W, HUDH);
  x.fillStyle = '#24190F';
  x.fillRect(0, 0, W, 96);
  x.fillStyle = 'rgba(0,0,0,.25)';
  x.fillRect(0, 32, W, 1);
  x.fillRect(0, 64, W, 1);
  x.fillStyle = '#6B5A3F';
  [14, W - 16].forEach((nx) => {
    x.beginPath();
    x.arc(nx, 14, 2.5, 0, 6.283);
    x.fill();
  });

  x.globalAlpha = host.fadeA;
  x.fillStyle = '#F6E7C8';
  x.font = `600 19px ${FONT}`;
  x.textAlign = 'left';
  x.textBaseline = 'alphabetic';
  wrap(x, s.it || '…', 20, 34, W - 40, 25, 3);
  x.globalAlpha = 1;

  x.fillStyle = '#120C08';
  engine.rr(x, 12, 102, W - 24, 46, 8);
  x.fill();
  x.font = `700 15px ${FONT}`;
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  let cx = 24;
  let cy = 118;
  host.slot = null;
  host.steps.forEach((st, i) => {
    const w = x.measureText(st.lab).width;
    if (cx + w > W - 24 && cx > 24) {
      cx = 24;
      cy += 20;
    }
    if (i < host.got.length) {
      x.fillStyle = '#F6E7C8';
      x.fillText(st.lab, cx, cy);
    } else if (i === host.got.length) {
      x.fillStyle = 'rgba(255,179,0,.95)';
      x.fillRect(cx, cy + 7, w, 3);
      host.slot = { x: cx + w / 2, y: cy };
    } else {
      x.fillStyle = 'rgba(246,231,200,.22)';
      x.fillRect(cx, cy + 7, w, 2);
    }
    cx += w + 10;
  });

  if (host.fly && host.slot) {
    const f = host.fly;
    const k = Math.min(1, f.t / 0.5);
    const e = 1 - (1 - k) ** 3;
    const fx = f.x + (host.slot.x - f.x) * e;
    const fy = f.y + (host.slot.y - f.y) * e;
    x.globalAlpha = 1 - k * 0.4;
    x.fillStyle = '#FFE9A8';
    x.font = `700 17px ${FONT}`;
    x.textAlign = 'center';
    x.fillText(f.lab, fx, fy);
    x.globalAlpha = 1;
  }

  x.fillStyle = '#3A2A1E';
  x.fillRect(20, 153, W - 52, 4);
  const low = host.oil < 0.25;
  // The lantern is amber running out, never red: red is reserved for real
  // failures (§14.6, ricerca/00 regola 7). Under reduced motion it does not
  // flicker — the width alone carries the state.
  x.globalAlpha = low && !host.reduceMotion ? 0.6 + 0.4 * Math.sin(host.t * 22) : 1;
  x.fillStyle = low ? '#FF9F1C' : '#FFB300';
  x.fillRect(20, 153, (W - 52) * host.oil, 4);
  x.globalAlpha = 1;
  x.fillStyle = '#3A2A1E';
  x.fillRect(W - 22, 148, 9, 12);
  x.fillStyle = low ? '#FF9F1C' : '#FFB300';
  x.fillRect(W - 20, 150, 5, 8);
}

function draw(host, x) {
  const h = host.hero;
  x.setTransform(host.sc, 0, 0, host.sc, 0, 0);
  x.clearRect(0, 0, W, H);
  x.save();
  x.translate(0, -host.cam);

  drawSurface(host, x);
  drawStrata(host, x);
  for (const L of host.lanes) drawLane(host, x, L);
  drawHero(x, h.x, h.y, h.face, h.sq || 1, host.pal);
  engine.drawParts(x, host.parts);

  x.globalCompositeOperation = 'lighter';
  const g = x.createRadialGradient(h.x, h.y - 18, 10, h.x, h.y - 18, 170);
  g.addColorStop(0, 'rgba(255,190,90,.28)');
  g.addColorStop(1, 'rgba(255,190,90,0)');
  x.fillStyle = g;
  x.fillRect(h.x - 170, h.y - 190, 340, 340);
  x.globalCompositeOperation = 'source-over';
  x.restore();

  if (host.dark) {
    x.fillStyle = 'rgba(0,0,0,.72)';
    x.fillRect(0, 0, W, H);
  }
  drawHUD(host, x);
}

// ─── chrome copy (rendered by GameHost, written here) ─────

function coachText(host, coach, lang) {
  const L = TX[lang] || TX.it;
  const lines = L[coach.kind] || L.order;
  const sub = (t) =>
    t
      .replace('{pick}', coach.pick || '')
      .replace('{word}', coach.word || '')
      .replace('{en}', host.sent.en || '');
  const soFar = host.got.join(' ');
  return {
    what: sub(lines[0]),
    effect: sub(lines[1]),
    rule: sub(lines[2]),
    extra: soFar ? `${soFar} ▁▁▁` : '',
    hint: L.hint,
  };
}

function doneView(host, lang) {
  const L = TX[lang] || TX.it;
  return { eyebrow: L.eyebrow, title: host.sent.en, subtitle: host.sent.it };
}

function onCoachClose(host) {
  if (host.coachKind === 'dark') rebuild(host);
  host.coachKind = null;
}

export default {
  meta: {
    id: 'inglese-l1-guado',
    surface: 'learn',
    level: 1,
    band: 1,
    register: 'R4',
    title: 'Sotto la Rocca',
    titleEn: 'Under the Keep',
    levelLabel: 'Inglese · L1 Vita quotidiana / English · L1 Daily life',
    font: '700 17px "Baloo 2"',
  },
  W,
  H,
  CH,
  drone: { freq: 42, type: 'triangle', volume: 0.012, lowpass: 120 },
  init,
  tune,
  remeasure,
  reset,
  rebuild,
  update,
  draw,
  tap,
  key,
  coachText,
  doneView,
  onCoachClose,
};
