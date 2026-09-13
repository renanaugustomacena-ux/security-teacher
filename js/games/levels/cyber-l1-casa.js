/**
 * LA CASA DI NOTTE — Cybersecurity L1 «Fondamenti».
 * Port of knowledge-aio-giochi/templates/cyber-l1-casa (time management,
 * ricerca/10) onto the vocabulary spine (LevelBeats): 4 lessons, 42 terms,
 * 8 chapters × 5 beats; every beat teaches the term(s) beatItems() hands it.
 *
 * SCHEDA DI PROGETTO (ricerca/00 §0.3) + SCHEDA VISIVA (ricerca/42 §42.3)
 * GIOCO ...... La casa di notte
 * TOPIC ...... Cybersecurity, L1 Fondamenti (js/topics/data/cybersecurity.js: 4 lezioni)
 * CONCETTO ... Qualcosa di tuo vale anche quando non lo guardi, e chi lo vuole
 *              passa dal varco lasciato scoperto. Ogni targa ferma UN fatto.
 * FORMA ...... contenimento + simultaneità   VERBO ... proteggere
 * ARCHETIPO .. ricerca/10 time management (Diner Dash)
 * VINCI SE ... i fatti della notte sono tutti coperti (need) e il legno è sano
 * PERDI SE ... tre candele spente: la notte ricomincia
 * SBAGLI ..... 1 viaggio a vuoto: la targa torna, tonfo, mai testo
 *              2 alla seconda, la targa giusta per il fatto più vecchio pulsa
 *              3 pannello di coaching, tre righe: la regola porta il termine
 * CAPITOLI ... 1 il verbo · 2 due varchi · 3 FRATTURA la pioggia non bussa
 *              4 cambia gesto · 5 il pacco (annusa prima) · 6 la crepa
 *              7 a raffica · 8 la notte intera
 * MONDO ...... la casa vista dall'alto, una planimetria a penna sul quaderno:
 *              finestra, porta, cancello, cassa. I fatti arrivano con un
 *              biglietto in italiano; le targhe sul margine portano i termini
 *              inglesi; tu sei la matita che corre sul foglio.
 * REGISTRO ... R14 Quaderno a penna: carta #FBFBF3, quadretti #D7E3F4, penna
 *              #1B2A49, evidenziatore #FFF176, matita #8A8A8A
 *              figura: omini a bastoncino, nuvola scarabocchiata, pacco con
 *              la croce · suolo: le righe del quaderno e la planimetria
 *              movimento: le cose si disegnano (sketch-in), il boil a due
 *              fotogrammi, la gomma che cancella · carattere: scrittura a mano
 * NUMERI ..... da ricerca/31: azione 0,7-1,6 s, pazienza 40→21 s a tre stati,
 *              fatti 1→4, arrivi 7,5→3,6 s, targhe 2→6
 * TEST 1 ..... le targhe sono tutte uguali (stesso evidenziatore, stessa penna)
 *              e si ridispongono a ogni arrivo: cambia solo il termine. Il
 *              gesto (maniglia, testa, nuvola, pacco) è colore del mondo, non
 *              risposta: qualunque fatto può chiedere qualunque termine.
 * TEST 2 ..... "Porto davanti al fatto la targa con il termine che dice quello
 *              che sta succedendo, prima che finisca"
 * TEST 3 ..... un omino arriva alla porta con un biglietto «Parola d'ordine»,
 *              sul margine si disegna una targa PASSWORD
 * DEVIAZIONI dal template (tutte volute, tutte per §46):
 *   · targhe: il template ne aveva 1 nei beat 1.1-1.2 (toks:['password']);
 *     qui minimo 2 e il margine cresce con i fatti in attesa (min 6,
 *     max(plates, attesi+1)) perché una targa sola non è una scelta e
 *     ogni fatto in attesa deve avere la sua (§46.2). Al picco (8.4: 4
 *     fatti + 2 crepe) il margine può non avere distrattori: resta una
 *     scelta fra sei.
 *   · pacco aperto alla cieca: nel template un pacco buono aperto senza
 *     annusarlo vinceva (win1). Qui perde sempre e il termine torna nel
 *     pool: nessuna risposta è stata data, e un termine non tentato non si
 *     può dare per coperto (§46.5); inventare un tentativo sarebbe §46.2.
 *     Un pacco annusato (già valutato) che scade torna anch'esso nel pool:
 *     la notte lo richiede, altrimenti il beat non è più vincibile.
 *   · viaggio a vuoto a pagina vuota: il template chiamava err('wrong')
 *     comunque. Qui, se nessun fatto aspetta, non c'è termine da mettere
 *     nella regola del coach (ricerca/34: la regola porta sempre il
 *     termine), quindi è solo un tonfo meccanico, fuori dalla scala.
 *   · aggiunte: hitstop 80 ms alla copertura, un click a ogni arrivo.
 */

import * as engine from '../KaioEngine.js';
import { ttsService } from '../../services/TTSService.js';
import { beatItems, distractors, fillers, labelOf, pickLang } from '../LevelBeats.js';
import {
  W,
  H,
  INK,
  HILITE,
  PENCIL,
  SPOT,
  KDEF,
  A1,
  A2,
  A3,
  A3P,
  PW,
  PH,
  PGAP,
  PY,
  meaningText,
  bySlot,
} from '../parts/cyber-l1-casa/page.js';
import { draw } from '../parts/cyber-l1-casa/draw.js';

/* Beat: kinds=fatti possibili, plates=targhe sul margine (il template le
   chiamava toks: qui sono i termini del livello, quindi solo un numero; è un
   minimo, mai sotto 2 — vedi DEVIAZIONI — e topUp lo alza fino a 6 quando
   più fatti aspettano), max=fatti insieme, arrive, pat=pazienza, need=fatti
   da coprire, chg=cambiano gesto, cracks, rush, queue. Curva
   0,2/0,45/0,7/1,0/0,6 (ricerca/03 §3.3). */
const B = (o) => ({
  kinds: ['prowl'],
  plates: 2,
  max: 1,
  arrive: 7,
  pat: 36,
  need: 3,
  chg: false,
  cracks: 0,
  rush: false,
  queue: 1,
  ...o,
});

const CH = [
  {
    t: ['Il primo gesto', 'First move'],
    titles: [
      ['La maniglia', 'The handle'],
      ['Ancora lui', 'Him again'],
      ['Il cancello', 'The gate'],
      ['Chi dove', 'Who where'],
      ['Il ritmo', 'The rhythm'],
    ],
    beats: [
      B({ need: 2, pat: 40, arrive: 7.5 }),
      B({ need: 3, pat: 36, arrive: 6.5 }),
      B({ kinds: A1, plates: 2, need: 4, pat: 32, arrive: 6 }),
      B({ kinds: A1, plates: 2, need: 5, pat: 28, arrive: 5, max: 2 }),
      B({ kinds: A1, plates: 2, need: 4, pat: 32, arrive: 6 }),
    ],
  },
  {
    t: ['Due varchi', 'Two gaps'],
    titles: [
      ['La finestra', 'The window'],
      ['Tre protezioni', 'Three protections'],
      ['Insieme', 'At once'],
      ['Stretti', 'Tight'],
      ['A memoria', 'By heart'],
    ],
    beats: [
      B({ kinds: ['snoop', 'prowl'], plates: 3, need: 3, pat: 36, arrive: 7 }),
      B({ kinds: A2, plates: 3, need: 4, pat: 32, arrive: 6.5, max: 2 }),
      B({ kinds: A2, plates: 3, need: 5, pat: 30, arrive: 6, max: 2 }),
      B({ kinds: A2, plates: 3, need: 6, pat: 24, arrive: 4.4, max: 3 }),
      B({ kinds: A2, plates: 3, need: 5, pat: 30, arrive: 6, max: 2 }),
    ],
  },
  {
    t: ['La pioggia non bussa', 'Rain does not knock'],
    titles: [
      ['La nuvola', 'The cloud'],
      ['Danno senza faccia', 'Faceless harm'],
      ['Quale dei due', 'Which one'],
      ['Temporale', 'Storm'],
      ['Il sereno', 'Clearing'],
    ],
    beats: [
      B({ kinds: ['rain'], plates: 4, need: 2, pat: 34, arrive: 7 }),
      B({ kinds: ['rain', 'prowl'], plates: 4, need: 4, pat: 32, arrive: 6.5, max: 2 }),
      B({ kinds: ['rain', 'snoop', 'stranger'], plates: 4, need: 5, pat: 28, arrive: 6, max: 2 }),
      B({ kinds: A3, plates: 4, need: 6, pat: 24, arrive: 4.6, max: 3 }),
      B({ kinds: A3, plates: 4, need: 5, pat: 28, arrive: 6, max: 2 }),
    ],
  },
  {
    t: ['Cambia gesto', 'It changes'],
    titles: [
      ['Il primo trucco', 'First trick'],
      ['Non fidarti del posto', 'Trust no spot'],
      ['Mentre porti', 'Mid-carry'],
      ['Due trucchi', 'Two tricks'],
      ["L'occhio", 'The eye'],
    ],
    beats: [
      B({ kinds: A2, plates: 4, need: 3, pat: 34, arrive: 7, chg: true }),
      B({ kinds: A2, plates: 4, need: 4, pat: 30, arrive: 6.5, chg: true, max: 2 }),
      B({ kinds: A3, plates: 4, need: 5, pat: 28, arrive: 6, chg: true, max: 2 }),
      B({ kinds: A3, plates: 4, need: 6, pat: 24, arrive: 5, chg: true, max: 3 }),
      B({ kinds: A3, plates: 4, need: 5, pat: 30, arrive: 6, chg: true, max: 2 }),
    ],
  },
  {
    t: ['Il pacco', 'The parcel'],
    titles: [
      ['Annusa prima', 'Sniff first'],
      ['Buono o no', 'Good or not'],
      ['Fra le altre cose', 'Among the rest'],
      ['Consegne fitte', 'Thick deliveries'],
      ['La regola', 'The rule'],
    ],
    beats: [
      B({ kinds: ['parcel'], plates: 5, need: 2, pat: 40, arrive: 7 }),
      B({ kinds: ['parcel'], plates: 5, need: 3, pat: 36, arrive: 6, max: 2 }),
      B({ kinds: ['parcel', 'prowl', 'rain'], plates: 5, need: 5, pat: 30, arrive: 6, max: 2 }),
      B({
        kinds: ['parcel', 'prowl', 'rain', 'stranger'],
        plates: 5,
        need: 6,
        pat: 24,
        arrive: 5,
        max: 3,
      }),
      B({ kinds: ['parcel', 'snoop'], plates: 5, need: 5, pat: 30, arrive: 6, max: 2 }),
    ],
  },
  {
    t: ['La crepa', 'The crack'],
    titles: [
      ['Il legno cede', 'Wood gives'],
      ['Prima la toppa', 'Patch first'],
      ['Due crepe', 'Two cracks'],
      ['Assalto', 'Assault'],
      ['Casa sana', 'Sound house'],
    ],
    beats: [
      B({ kinds: ['prowl'], plates: 6, need: 3, pat: 36, arrive: 6.5, cracks: 1 }),
      B({ kinds: ['prowl', 'snoop'], plates: 6, need: 4, pat: 32, arrive: 6, cracks: 1, max: 2 }),
      B({ kinds: A2, plates: 6, need: 5, pat: 28, arrive: 5.5, cracks: 2, max: 2 }),
      B({ kinds: A3, plates: 6, need: 6, pat: 24, arrive: 4.6, cracks: 2, max: 3 }),
      B({ kinds: A2, plates: 6, need: 5, pat: 30, arrive: 6, cracks: 1, max: 2 }),
    ],
  },
  {
    t: ['A raffica', 'In bursts'],
    titles: [
      ['La prima raffica', 'First burst'],
      ['Tre insieme', 'Three at once'],
      ['Coda di gesti', 'Action queue'],
      ['Il picco', 'The peak'],
      ['Respiro', 'Breath'],
    ],
    beats: [
      B({ kinds: A3, plates: 6, need: 5, pat: 30, arrive: 5.4, max: 3, rush: true, queue: 2 }),
      B({ kinds: A3, plates: 6, need: 6, pat: 28, arrive: 4.8, max: 3, rush: true, queue: 2 }),
      B({ kinds: A3P, plates: 6, need: 7, pat: 24, arrive: 4.2, max: 4, rush: true, queue: 2 }),
      B({ kinds: A3P, plates: 6, need: 8, pat: 21, arrive: 3.6, max: 4, rush: true, queue: 2 }),
      B({ kinds: A3, plates: 6, need: 6, pat: 28, arrive: 5, max: 3, rush: true, queue: 2 }),
    ],
  },
  {
    t: ['La notte intera', 'The whole night'],
    titles: [
      ['Tutto insieme', 'All together'],
      ['Senza rete', 'No net'],
      ['La prova', 'The test'],
      ['Il picco della notte', 'Night peak'],
      ["L'alba", 'Dawn'],
    ],
    beats: [
      B({ kinds: A3, plates: 6, need: 6, pat: 30, arrive: 5.6, max: 3, chg: true, queue: 2 }),
      B({ kinds: A3P, plates: 6, need: 7, pat: 27, arrive: 5, max: 3, cracks: 1, queue: 2 }),
      B({
        kinds: A3P,
        plates: 6,
        need: 8,
        pat: 24,
        arrive: 4.4,
        max: 4,
        chg: true,
        cracks: 1,
        queue: 2,
      }),
      B({
        kinds: A3P,
        plates: 6,
        need: 9,
        pat: 21,
        arrive: 3.8,
        max: 4,
        chg: true,
        cracks: 2,
        rush: true,
        queue: 2,
      }),
      B({ kinds: A3, plates: 6, need: 6, pat: 30, arrive: 5.4, max: 3, chg: true, queue: 2 }),
    ],
  },
];

const TX = {
  it: {
    wrong: [
      'Quella targa non fermava quello che stava succedendo.',
      'Hai portato «{pick}», ma il biglietto diceva «{it}»: la targa giusta è «{word}».',
      'Ogni targa ferma un solo fatto: «{it}» si ferma con «{word}».',
    ],
    late: [
      'Un varco è rimasto scoperto troppo a lungo.',
      'Una candela si è spenta: «{it}» è passato senza che nessuno lo fermasse.',
      'Due mani sole: copri prima chi sta per cedere. «{it}» voleva la targa «{word}».',
    ],
    gamble: [
      'Hai aperto un pacco senza farlo annusare.',
      "Se dentro c'era qualcosa, adesso è in casa. Il pacco diceva «{it}».",
      'Prima la targa, poi si apre: «{it}» si annusa con «{word}».',
    ],
    crack: [
      'La targa non tiene sul legno rotto.',
      'Sotto la crepa passa tutto, targa o non targa. La crepa dice «{it}».',
      'Prima la toppa «{word}» sulla crepa, poi la protezione.',
    ],
    hint: 'leggi il biglietto, poi tocca la targa · tastiera: 1-6 targa, ← → spazio, ↑ apre il pacco',
    eyebrow: 'Notte tenuta',
  },
  en: {
    wrong: [
      'That plate did not stop what was happening.',
      'You carried "{pick}", but the note said "{it}": the right plate is "{word}".',
      'Each plate stops one kind of event: "{it}" is stopped by "{word}".',
    ],
    late: [
      'A gap stayed uncovered too long.',
      'A candle went out: "{it}" got through with nobody stopping it.',
      'One pair of hands: cover whoever is about to give in first. "{it}" wanted the plate "{word}".',
    ],
    gamble: [
      'You opened a parcel without sniffing it.',
      'If something was inside, it is in the house now. The parcel said "{it}".',
      'Plate first, then open: "{it}" is sniffed with "{word}".',
    ],
    crack: [
      'A plate does not hold on broken wood.',
      'Everything slips under the crack, plate or no plate. The crack says "{it}".',
      'Mend the crack with "{word}" first, then the protection.',
    ],
    hint: 'read the note, then tap the plate · keyboard: 1-6 plate, ← → space, ↑ opens the parcel',
    eyebrow: 'Night held',
  },
};

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

/**
 * Which chapter this beat belongs to: the installed beat table is the truth
 * (goBeat installs it before reset runs), the state a fallback.
 */
function installedChapter(host) {
  const i = host.CH ? host.CH.findIndex((c) => c.beats === host.BEATS) : -1;
  return i >= 0 ? i : host.state.chapter || 0;
}

/* Reduced motion: the page still plays, at 0.7x (§15.4, ricerca/42 §42.6 #10). */
function motion(host) {
  return host.reduceMotion ? 0.7 : 1;
}

/* ricerca/35 §35.3.1: a term covered is a term heard. */
function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

function crackAt(host, spot) {
  return host.cracks.some((c) => c.spot === spot && !c.fixed);
}

// ─── the margin: plates with the English terms ───

function plateSlots(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / 3);
    const inRow = Math.min(3, n - row * 3);
    const x0 = (W - (inRow * PW + (inRow - 1) * PGAP)) / 2;
    out.push({ x: x0 + (i % 3) * (PW + PGAP), y: PY + row * 54 });
  }
  return out;
}

/* Everything on the page that is waiting for a plate, oldest first: events
   not yet taken, parcels not yet sniffed, cracks not yet mended. */
function things(host) {
  const evs = host.evs.filter((e) => !e.dead && !e.taken && (e.kind !== 'parcel' || !e.sniffed));
  return evs.concat(host.cracks.filter((c) => c.item && !c.fixed));
}

function neededItems(host) {
  const out = [];
  for (const t of things(host)) if (out.indexOf(t.item) < 0) out.push(t.item);
  return out;
}

function layout(host, reshuffle) {
  const n = host.plates.length;
  const slots = plateSlots(n);
  const order = reshuffle ? shuffle(bySlot(host)) : bySlot(host);
  order.forEach((p, i) => {
    p.slot = i;
    p.tx = slots[i].x;
    p.ty = slots[i].y;
    if (p.fresh) {
      p.x = p.tx;
      p.y = p.ty;
      p.fresh = false;
    }
  });
  // The keyboard selection is a term, not a slot: after every re-deal the
  // cursor follows its plate, so space never carries a plate nobody chose.
  const held = host.selItem ? host.plates.find((p) => p.item === host.selItem) : null;
  host.sel = held ? held.slot : -1;
  if (!held) host.selItem = null;
}

/**
 * Every waiting thing has its term on the margin; the remaining plates are
 * real terms of the same lesson (ricerca/35 §35.3.3). A new plate re-deals
 * the whole margin so the newest plate is never "the answer" (TEST 1).
 */
function topUp(host) {
  const cfg = host.cfg;
  const needed = neededItems(host);
  const cap = Math.min(6, Math.max(cfg.plates, needed.length + 1));
  const keep = [];
  const fill = [];
  for (const p of host.plates) (needed.indexOf(p.item) >= 0 ? keep : fill).push(p);
  host.plates = keep.concat(fill.slice(0, Math.max(0, cap - needed.length)));
  let added = false;
  const add = (item) => {
    host.plates.push({
      item,
      slot: host.plates.length,
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      in: 0,
      fresh: true,
    });
    added = true;
  };
  for (const it of needed) {
    if (host.plates.length >= cap) break;
    if (!host.plates.some((p) => p.item === it)) add(it);
  }
  const used = host.plates.map((p) => p.item);
  const pool = distractors(host.session, host.item, cap + used.length).filter(
    (it) => used.indexOf(it) < 0
  );
  while (host.plates.length < cap && pool.length) add(pool.shift());
  layout(host, added);
}

// ─── the night's queue of facts ──────────────────

function drawFillers(host, n) {
  if (n <= 0) return [];
  const terms = host.terms;
  return fillers(host.session, host.item, n + terms.length)
    .filter((it) => terms.indexOf(it) < 0)
    .slice(0, n);
}

/**
 * The beat's own term(s) walk in first; the rest of the night is filled from
 * the same lesson, and the cracks take their own terms. Every item that
 * enters the pool must be answered correctly before the night is held: a
 * lost fact goes back to the pool (§46.5).
 */
function buildPool(host) {
  const cfg = host.cfg;
  const terms = host.terms.slice();
  const missing = Math.max(0, cfg.need - terms.length);
  const fill = drawFillers(host, missing + cfg.cracks);
  host.need = Math.max(cfg.need, terms.length);
  host.pool = terms.concat(shuffle(fill.slice(0, missing)));
  return fill.slice(missing);
}

// ─── lifecycle ───────────────────────────────────

function init(host) {
  host.parts = [];
  host.evs = [];
  host.cracks = [];
  host.plates = [];
  host.pool = [];
  host.queue = [];
  host.ghosts = [];
  host.terms = [];
  host.item = null;
  host.chapter = 0;
  host.t = 0;
  host.sel = -1;
  host.selItem = null;
  host.kbUsed = false;
  host.nid = 0;
  host.hands = { x: W * 0.5, y: H * 0.6, busy: 0, total: 0, at: null, job: null };
}

function reset(host, beat) {
  const cfg = host.BEATS[beat];
  host.cfg = cfg;
  const ci = installedChapter(host);
  host.chapter = ci;

  host.evs = [];
  host.cracks = [];
  host.parts = [];
  host.queue = [];
  host.ghosts = [];
  host.plates = [];
  host.hands = { x: W * 0.5, y: H * 0.6, busy: 0, total: 0, at: null, job: null };
  host.arriveT = 1.2;
  host.resolved = 0;
  host.gone = 0;
  host.spawned = 0;
  host.burstLeft = 0;
  host.streak = { kind: null, n: 0 };
  host.pulse = 0;
  host.pulseItem = null;
  host.shake = 0;
  host.flash = 0;
  host.shed = false;
  host.t = 0;
  host.sel = -1;
  host.selItem = null;
  host.kbUsed = false;
  host.finished = false;
  host.coachKind = null;
  host.nid = 0;

  host.terms = beatItems(host.session, ci, beat);
  host.item = host.terms[0] || null;
  const crackItems = buildPool(host);
  const spots = Object.keys(SPOT);
  for (let i = 0; i < cfg.cracks; i++) {
    const item = crackItems[i];
    if (!item) break;
    const free = spots.filter((s) => !host.cracks.some((k) => k.spot === s));
    const spot = free[Math.floor(Math.random() * free.length)];
    host.cracks.push({ crack: true, spot, item, fixed: false, wrong: 0, aided: false });
    // The crack is on the page from the first frame, note and all.
    item.introduce();
  }
  host.session.mark();
  topUp(host);
}

// ─── facts ───────────────────────────────────────

function spawn(host) {
  const c = host.cfg;
  const item = host.pool[0];
  if (!item) return false;
  const live = (k) => host.evs.filter((e) => !e.dead && e.kind === k).length;
  const kinds = c.kinds.filter((k) => (k === 'parcel' ? live('parcel') < 2 : live(k) === 0));
  if (!kinds.length) return false;
  const kind = kinds[Math.floor(Math.random() * kinds.length)];
  let spot;
  let tx;
  let ty;
  if (kind === 'parcel') {
    spot = 'porta';
    tx = SPOT.porta.x - 30 + live('parcel') * 60;
    ty = SPOT.porta.y + 64;
  } else {
    spot = KDEF[kind].spot;
    const q = SPOT[spot];
    tx = q.x;
    ty = kind === 'rain' ? q.y - 112 : q.y - 64;
  }
  host.pool.shift();
  host.evs.push({
    id: host.nid++,
    kind,
    spot,
    item,
    x: tx,
    y: ty - 240,
    tx,
    ty,
    in: 0,
    pat: c.pat,
    pat0: c.pat,
    wob: Math.random() * 6.28,
    taken: false,
    dead: false,
    sniffed: false,
    bad: Math.random() < 0.55,
    flip: 0,
    wrong: 0,
    aided: false,
    morphT: c.chg && kind !== 'rain' && kind !== 'parcel' ? 2.5 + Math.random() * 4 : 0,
  });
  host.spawned++;
  // The Italian note is the presentation (mastery stage 0 -> 1).
  item.introduce();
  topUp(host);
  engine.snd(host, 'click', { hz: 1200, v: 0.16 });
  return true;
}

/**
 * FRATTURA (chapter 4): the fact changes gesture — and, on this spine, what
 * it asks for. The new term comes out of the pool and the old one goes back
 * in, so the night still has to ask every term (§46.5). When the pool is
 * already empty (the last facts of the night) the gesture still changes and
 * the note stays: the lesson "don't trust the spot" reaches every fact.
 */
function morph(host, e) {
  const c = host.cfg;
  const alt = c.kinds.filter(
    (k) =>
      k !== e.kind &&
      k !== 'rain' &&
      k !== 'parcel' &&
      !host.evs.some((o) => !o.dead && o !== e && o.kind === k)
  );
  if (!alt.length) return;
  const nk = alt[Math.floor(Math.random() * alt.length)];
  if (host.pool.length) {
    const old = e.item;
    e.item = host.pool.shift();
    host.pool.push(old);
    e.wrong = 0;
    e.aided = false;
    e.item.introduce();
  }
  e.kind = nk;
  e.spot = KDEF[nk].spot;
  const q = SPOT[e.spot];
  e.tx = q.x;
  e.ty = q.y - 64;
  e.flip = 1;
  e.changed = true;
  engine.snd(host, 'pop', { hz: 380, v: 0.12 });
  topUp(host);
}

function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

/* The oldest thing still waiting — what the second error lights up. */
function oldestThing(host, kind) {
  if (kind === 'crack')
    return host.cracks.find((c) => c.item && !c.fixed) || things(host)[0] || null;
  return things(host)[0] || null;
}

/**
 * The error ladder (ricerca/00 passo 6), the template's: a streak per error
 * kind. 1st: the consequence only. 2nd: the plate of the oldest waiting fact
 * pulses and that fact is aided (hintsUsed 1 from here). 3rd: the coach, and
 * its rule line carries the English term.
 */
function err(host, kind, thing, pick) {
  const s = host.streak;
  if (s.kind === kind) s.n++;
  else {
    s.kind = kind;
    s.n = 1;
  }
  // The coach names the fact that was wronged even when it is gone (late,
  // gamble); the pulse can only light a plate for a fact still waiting.
  const named = thing || oldestThing(host, kind);
  const target = thing && !thing.dead && !thing.fixed ? thing : oldestThing(host, kind);
  if (s.n === 2) {
    host.pulse = 0.8;
    host.pulseItem = target ? target.item : null;
    if (target) target.aided = true;
  }
  if (s.n >= 3) {
    host.coachKind = kind;
    host.setState({
      coach: {
        kind,
        pick: pick ? labelOf(pick) : '',
        word: named ? labelOf(named.item) : '',
        it: named ? meaningText(named.item) : '',
      },
    });
    host.streak = { kind: null, n: 0 };
  }
}

/* A candle goes out. Three, and the night starts over from the same beat. */
function burn(host) {
  const left = (host.state.left || 0) + 1;
  host.setState({ left });
  if (left >= 3) {
    reset(host, host.state.beat);
    host.setState({ step: 0, left: 0 });
  }
}

/**
 * The graded response: the learner's real pick against the term the fact
 * asked for, through the SDK and never a local `===` (§46.1, §46.2). Silent
 * because the page answers by itself — the tone and the ink, or the thud.
 */
function grade(host, thing, pick) {
  const verdict = thing.item.attempt(labelOf(pick), {
    expected: labelOf(thing.item),
    mode: 'casa',
    hintsUsed: thing.aided ? 1 : 0,
    silent: true,
  });
  host.session.mark();
  if (!verdict.correct) thing.wrong++;
  return verdict.correct;
}

function ghost(host, x, y) {
  host.ghosts.push({ x, y, t: 0.5 });
}

function chkWin(host) {
  if (host.resolved < host.need || host.cracks.some((c) => c.item && !c.fixed)) return;
  host.finished = true;
  engine.snd(host, 'chime');
  persist(host);
  host.setState({ done: true });
}

function win1(host, e) {
  e.dead = true;
  host.resolved++;
  host.flash = 1;
  host.hitstop = 80;
  e.item.clear();
  engine.snd(host, 'tone', { from: 560, to: 920, v: 0.16 });
  engine.burst(host, host.parts, e.tx || e.x, e.ty || e.y, 10, INK);
  ghost(host, e.x, e.y);
  if (e.kind === 'rain') {
    host.shed = true;
    engine.burst(host, host.parts, W - 22, H * 0.53, 8, HILITE);
  }
  say(host, labelOf(e.item));
  persist(host);
  host.setState({ step: host.resolved });
  topUp(host);
  chkWin(host);
}

// ─── the hands ───────────────────────────────────

function waste(host, item) {
  const h = host.hands;
  h.job = { t: 'waste', item, target: oldestThing(host, 'wrong') };
  h.at = { x: W * 0.5, y: H * 0.585 };
  h.busy = 0.7;
  h.total = 0.7;
  engine.snd(host, 'pop', { hz: 240, v: 0.1 });
}

function start(host, j) {
  const h = host.hands;
  const tr = (q) => (Math.hypot(h.x - q.x, h.y - q.y) / W) * 0.9;
  if (j.t === 'open') {
    const e = j.ev;
    if (!e || e.dead) return;
    h.job = { t: 'open', ev: e };
    h.at = { x: e.x, y: e.y };
    h.total = 0.8 + tr(e);
    h.busy = h.total;
    engine.snd(host, 'click', { hz: 700, v: 0.15 });
    return;
  }
  const item = j.item;
  const ev = host.evs.find((e) => !e.dead && !e.taken && e.kind !== 'parcel' && e.item === item);
  if (ev) {
    ev.taken = true;
    h.job = { t: 'apply', ev, item };
    h.at = { x: ev.tx, y: ev.ty };
    h.total = 1.0 + tr({ x: ev.tx, y: ev.ty });
    h.busy = h.total;
    engine.snd(host, 'click', { hz: 900, v: 0.18 });
    return;
  }
  const parcel = host.evs.find(
    (e) => !e.dead && e.kind === 'parcel' && !e.sniffed && e.item === item
  );
  if (parcel) {
    h.job = { t: 'sniff', ev: parcel, item };
    h.at = { x: parcel.x, y: parcel.y };
    h.total = 1.1 + tr(parcel);
    h.busy = h.total;
    engine.snd(host, 'click', { hz: 880, v: 0.16 });
    return;
  }
  const cr = host.cracks.find((c) => !c.fixed && c.item === item);
  if (cr) {
    const q = SPOT[cr.spot];
    h.job = { t: 'patch', cr, item };
    h.at = { x: q.x, y: q.y };
    h.total = 1.2 + tr(q);
    h.busy = h.total;
    engine.snd(host, 'click', { hz: 520, v: 0.16 });
    return;
  }
  waste(host, item);
}

function act(host, j) {
  const h = host.hands;
  if (h.busy > 0) {
    if (host.cfg.queue > 1 && host.queue.length < host.cfg.queue - 1) {
      host.queue.push(j);
      engine.snd(host, 'pop', { hz: 300, v: 0.07 });
    } else {
      engine.snd(host, 'fall');
      host.shake = 0.4;
    }
    return;
  }
  start(host, j);
}

function deq(host) {
  if (host.queue.length) start(host, host.queue.shift());
}

function refuse(host, thing, pick, kind) {
  engine.snd(host, 'thud', { v: 0.2 });
  host.shake = 0.3;
  err(host, kind, thing, pick);
}

/* A fact left without a graded answer: it goes back to the pool. */
function lose(host, e) {
  e.dead = true;
  host.gone++;
  host.pool.push(e.item);
  ghost(host, e.x, e.y);
  topUp(host);
}

function finishJob(host) {
  const h = host.hands;
  const j = h.job;
  h.job = null;
  h.busy = 0;
  if (!j) {
    deq(host);
    return;
  }
  if (j.t === 'apply') {
    const e = j.ev;
    if (!e || e.dead) {
      // The fact is gone: no pick to grade against (a lost fact is not an attempt).
      engine.snd(host, 'thud', { v: 0.16 });
      host.shake = 0.2;
    } else if (crackAt(host, e.spot)) {
      e.taken = false;
      refuse(
        host,
        host.cracks.find((c) => c.spot === e.spot && !c.fixed),
        j.item,
        'crack'
      );
    } else if (grade(host, e, j.item)) {
      win1(host, e);
    } else {
      e.taken = false;
      refuse(host, e, j.item, 'wrong');
    }
  } else if (j.t === 'patch') {
    const cr = j.cr;
    if (!cr.fixed) {
      if (grade(host, cr, j.item)) {
        cr.fixed = true;
        cr.item.clear();
        engine.snd(host, 'tone', { from: 340, to: 520, v: 0.14 });
        engine.burst(host, host.parts, SPOT[cr.spot].x, SPOT[cr.spot].y, 9, HILITE);
        say(host, labelOf(cr.item));
        persist(host);
        topUp(host);
        chkWin(host);
      } else refuse(host, cr, j.item, 'wrong');
    }
  } else if (j.t === 'sniff') {
    const e = j.ev;
    if (e && !e.dead) {
      if (grade(host, e, j.item)) {
        e.sniffed = true;
        e.flip = 1;
        e.item.clear();
        engine.snd(host, 'pop', { hz: 520, v: 0.13 });
        say(host, labelOf(e.item));
        persist(host);
        topUp(host);
      } else refuse(host, e, j.item, 'wrong');
    }
  } else if (j.t === 'open') {
    const e = j.ev;
    if (e && !e.dead) {
      if (!e.sniffed) {
        // The gamble: opened blind. Bad, and a candle goes out; good or bad,
        // nothing was answered, so the term comes back later (§46.5).
        lose(host, e);
        err(host, 'gamble', e, null);
        if (e.bad) {
          engine.snd(host, 'crash');
          host.shake = 0.8;
          burn(host);
        } else engine.snd(host, 'whoosh');
      } else if (e.bad) {
        e.dead = true;
        host.resolved++;
        ghost(host, e.x, e.y);
        host.setState({ step: host.resolved });
        engine.snd(host, 'whoosh');
        engine.burst(host, host.parts, e.x, e.y, 8, PENCIL);
        topUp(host);
        chkWin(host);
      } else win1(host, e);
    }
  } else if (j.t === 'waste') {
    engine.snd(host, 'thud', { v: 0.16 });
    // A plate that matches nothing is still a graded pick: against the
    // oldest fact that was waiting when the hands set off, which is what
    // they should have carried to. A fact that arrived during the trip was
    // not read before the tap, so it is never graded here; if nothing was
    // waiting (or it is gone), the trip is a mechanical miss only.
    const target = j.target && !j.target.dead && !j.target.fixed ? j.target : null;
    if (target) {
      if (grade(host, target, j.item)) {
        if (target.kind === 'parcel') {
          target.sniffed = true;
          target.flip = 1;
          target.item.clear();
        } else if (target.crack) {
          target.fixed = true;
          target.item.clear();
        } else win1(host, target);
      } else refuse(host, target, j.item, 'wrong');
    } else host.shake = 0.2;
  }
  deq(host);
}

// ─── update ──────────────────────────────────────

function update(host, dt) {
  host.t += dt;
  const c = host.cfg;
  if (!c) return;
  const h = host.hands;
  const ms = motion(host);

  if (host.flash > 0) host.flash -= dt * 3;
  if (host.shake > 0) host.shake -= dt * 3.2;
  if (host.pulse > 0) host.pulse -= dt;

  if (!host.finished) {
    const alive = host.evs.filter((e) => !e.dead).length;
    host.arriveT -= dt;
    if (
      host.arriveT <= 0 &&
      alive < c.max &&
      host.spawned < host.need + host.gone &&
      host.pool.length
    ) {
      const ok = spawn(host);
      if (c.rush) {
        if (host.burstLeft > 0 && ok) {
          host.burstLeft--;
          host.arriveT = 0.8;
        } else {
          host.burstLeft = 2;
          host.arriveT = c.arrive * 1.3;
        }
      } else host.arriveT = ok ? c.arrive * (0.85 + Math.random() * 0.3) : 0.9;
    }
  }

  if (h.busy > 0) {
    h.busy -= dt;
    if (h.at) {
      h.x += (h.at.x - h.x) * Math.min(1, dt * 7 * ms);
      h.y += (h.at.y - h.y) * Math.min(1, dt * 7 * ms);
    }
    if (h.busy <= 0) finishJob(host);
  }

  for (const e of host.evs) {
    if (e.dead) continue;
    e.in = Math.min(1, e.in + dt * 2.2 * ms);
    if (!host.reduceMotion) e.wob += dt * 2.2;
    if (e.flip > 0) e.flip -= dt * 3 * ms;
    e.y += (e.ty - e.y) * Math.min(1, dt * 3 * ms);
    e.x += (e.tx - e.x) * Math.min(1, dt * 3 * ms);
    if (e.morphT > 0) {
      e.morphT -= dt;
      if (e.morphT <= 0 && !e.taken) morph(host, e);
    }
    e.pat -= dt * (crackAt(host, e.spot) ? 1.5 : 1);
    if (e.pat <= 0) {
      lose(host, e);
      engine.snd(host, 'whir');
      host.shake = 0.7;
      err(host, 'late', e, null);
      burn(host);
      return;
    }
  }
  host.evs = host.evs.filter((e) => !e.dead);

  for (const p of host.plates) {
    p.in = Math.min(1, p.in + dt * 3 * ms);
    p.x += (p.tx - p.x) * Math.min(1, dt * 9 * ms);
    p.y += (p.ty - p.y) * Math.min(1, dt * 9 * ms);
  }
  for (const g of host.ghosts) g.t -= dt;
  host.ghosts = host.ghosts.filter((g) => g.t > 0);
  host.parts = engine.parts(host.parts, dt, 420);
}

// ─── input: tap the plate, tap the parcel ────────

/* While the margin re-deals itself two plates may overlap for a few frames:
   the one whose centre is nearest the finger is the one that was tapped. */
function plateAt(host, p) {
  let best = null;
  let dist = Infinity;
  for (const pl of host.plates) {
    if (p.x < pl.x || p.x > pl.x + PW || p.y < pl.y || p.y > pl.y + PH) continue;
    const d = Math.hypot(p.x - (pl.x + PW / 2), p.y - (pl.y + PH / 2));
    if (d < dist) {
      dist = d;
      best = pl;
    }
  }
  return best;
}

function parcelAt(host, p) {
  return (
    host.evs.find((e) => e.kind === 'parcel' && !e.dead && Math.hypot(p.x - e.x, p.y - e.y) < 46) ||
    null
  );
}

function tap(host, p) {
  if (host.finished) return;
  const pl = plateAt(host, p);
  if (pl) {
    host.sel = pl.slot;
    host.selItem = pl.item;
    act(host, { t: 'plate', item: pl.item });
    return;
  }
  const e = parcelAt(host, p);
  if (e) {
    act(host, { t: 'open', ev: e });
    return;
  }
  engine.snd(host, 'fall');
}

function key(host, e) {
  if (host.finished) return;
  const plates = bySlot(host);
  const n = plates.length;
  host.kbUsed = true;
  // The cursor is remembered as the term under it (host.selItem): the margin
  // re-deals on every arrival, and the slot alone would drift to another plate.
  const select = (slot) => {
    host.sel = slot;
    host.selItem = slot >= 0 && plates[slot] ? plates[slot].item : null;
  };
  if (e.key === 'ArrowLeft') {
    select(n ? ((host.sel < 0 ? 0 : host.sel) - 1 + n) % n : -1);
    e.preventDefault();
  } else if (e.key === 'ArrowRight') {
    select(n ? ((host.sel < 0 ? -1 : host.sel) + 1) % n : -1);
    e.preventDefault();
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    const held = host.selItem ? host.plates.find((p) => p.item === host.selItem) : null;
    if (held) act(host, { t: 'plate', item: held.item });
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const parcel = host.evs.find((k) => k.kind === 'parcel' && !k.dead);
    if (parcel) act(host, { t: 'open', ev: parcel });
  } else if (/^[1-6]$/.test(e.key)) {
    const i = parseInt(e.key, 10) - 1;
    if (plates[i]) {
      select(i);
      act(host, { t: 'plate', item: plates[i].item });
    }
  }
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

function lessonTitle(host, lang) {
  const item = host.item;
  const lessons = host.session && host.session.lessons ? host.session.lessons : [];
  const lesson = item ? lessons.find((l) => l.id === item.lesson) : null;
  return lesson && lesson.title ? pickLang(String(lesson.title), lang).trim() : '';
}

function doneView(host, lang) {
  const L = TX[lang] || TX.it;
  const terms = host.terms || [];
  return {
    eyebrow: L.eyebrow,
    title: terms.map(labelOf).join(' · '),
    subtitle: lang === 'en' ? lessonTitle(host, 'en') : terms.map(meaningText).join(' · '),
  };
}

function onCoachClose(host) {
  host.streak = { kind: null, n: 0 };
  host.coachKind = null;
}

export default {
  meta: {
    id: 'cyber-l1-casa',
    surface: 'cybersecurity',
    level: 0,
    band: 1,
    register: 'R14',
    title: 'La casa di notte',
    titleEn: 'The house at night',
    levelLabel: 'Cybersecurity · L1 Fondamenti / Cybersecurity · L1 Foundations',
    font: '700 15px "Baloo 2"',
  },
  W,
  H,
  CH,
  drone: { freq: 48, type: 'triangle', volume: 0.013, lowpass: 140 },
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
