/**
 * L'INDIRIZZARIO — Node.js L8 «Progettazione API REST» (js/topics/data/nodejs.js,
 * level 7: 4 lessons × 10 terms = 40), composed in 8 chapters × 5 dockets, one
 * term per docket (LevelBeats spine, DOCTRINE §46.5).
 *
 * Port of knowledge-aio-giochi/templates/nodejs-l8-indirizzario (design sheet
 * in its header) with the vocabulary spine of the brief and the R13 register.
 *
 * SCHEDA DI PROGETTO (ricerca/00 §0.3) + SCHEDA VISIVA (ricerca/42 §42.3)
 * GIOCO ...... L'indirizzario
 * LIVELLO .... Node.js, L8 Progettazione API REST, banda 2 — 8 capitoli, 40 bolle
 * CONCETTO ... Il nome di una risorsa dice cosa è, non cosa fare. Cosa fare lo
 *              dice il metodo. E le risorse si annidano: la parte dopo
 *              appartiene alla parte prima. La bolla chiede una cosa col suo
 *              significato (italiano); le tessere portano il nome inglese.
 * FORMA ...... contenimento        VERBO ... comporre (agganciare le tessere in ordine)
 * ARCHETIPO .. ricerca/15 stacking, in forma di composizione vincolata
 * VINCI SE ... tutte le bolle del capitolo hanno un indirizzo collaudato
 * PERDI SE ... tre indirizzi vengono respinti: la bolla ricomincia
 * SBAGLI ..... 1 le tessere tornano nella rastrelliera, il timbro «RESPINTO»
 *                in grigio sulla bolla, scossa (mai rosso)
 *              2 alla seconda sulla stessa bolla, la tessera che serviva
 *                (o il timbro del metodo) pulsa in giallo
 *              3 pannello di coaching, con il termine inglese nella regola
 * CAPITOLI ... 1 nome e metodo · 2 il nome esatto · 3 FRATTURA il verbo non va
 *              nell'indirizzo · 4 l'identificatore · 5 le risorse annidate
 *              6 filtri e non percorsi · 7 a raffica · 8 il collaudo intero
 * MONDO ...... scrivania d'archivio: un foglio a righe, la bolla appesa a un
 *              chiodo, quattro timbri tondi per i metodi, la striscia dove si
 *              compone l'indirizzo, la rastrelliera di legno con le tessere,
 *              il timbro grande del collaudo sul bordo della scrivania
 * REGISTRO ... R13 Carta e tessere — carta, crema, bordo carta, legno chiaro,
 *              inchiostro, verde/giallo/grigio di Wordle · figura: il timbro
 *              (pomello, manico, base svasata, piastra inchiostrata) e la
 *              bolla a etichetta da bagaglio · suolo: la scrivania e la
 *              rastrelliera · movimento: le tessere scivolano dalla
 *              rastrelliera alla striscia e si girano (flip) quando si
 *              agganciano, la bolla dondola sul filo · carattere: grazia per
 *              le lettere, sans per le cifre
 * NUMERI ..... composizione senza cronometro fino al capitolo 6, poi 26→18 s
 *              per bolla; tessere nella rastrelliera 2→8; tessere nell'indirizzo
 *              al massimo 5; tre respinte e la bolla ricomincia
 * TEST 1 ..... le tessere sono tutte della stessa crema e della stessa forma,
 *              in posti casuali a ogni bolla: l'unico segnale è la parola
 *              incisa e la richiesta scritta sulla bolla
 * TEST 2 ..... "Compongo l'indirizzo che descrive la cosa chiesta, col metodo
 *              che descrive l'azione"
 * TEST 3 ..... la bolla è già appesa, le tessere sono nella rastrelliera
 *
 * DEVIAZIONI DAL TEMPLATE (deliberate, per la firma dell'orchestratore)
 *   1 i nomi delle risorse sono i termini del livello: la bolla porta il
 *     significato italiano, le tessere il termine inglese più i distrattori
 *     della stessa lezione (brief §2). Le risorse annidate (/A/:id/B) usano
 *     un secondo termine (filler) della lezione, anch'esso presentato e
 *     valutato. I pezzi strutturali (:id, ?status=…, le cartelle-trappola, i
 *     verbi) restano quelli del template, tradotti in inglese.
 *   2 capitolo 2 «Il plurale» → «Il nome esatto»: la trappola singolare/plurale
 *     non esiste su un termine inglese fisso (la tessera deve portare
 *     esattamente item.english); al suo posto crescono i distrattori della
 *     lezione nella rastrelliera (3→5 tessere), che è la stessa lezione — il
 *     nome esatto, non uno che gli somiglia.
 *   3 mai meno di due tessere-termine nella rastrelliera (il template ne aveva
 *     una nel cap. 1 bolla 1): senza scelta non c'è significato → termine da
 *     valutare (brief §2.2).
 *   4 cap. 6 bolla 4: il template chiedeva «?stato=attivo» senza metterlo nella
 *     riserva (bolla invincibile); qui la rastrelliera ha entrambi i filtri.
 *   5 le tessere si spostano dalla rastrelliera alla striscia (una tessera si
 *     aggancia una volta sola, e al suo posto restano i trattini): nel
 *     template la riserva era statica e un pezzo poteva essere ripetuto.
 *     Nessuna commessa richiede lo stesso pezzo due volte.
 *   6 la scala degli errori conta per bolla (brief §2.5): 1 respinta, 2 la
 *     tessera che serviva pulsa, 3 il coach. Il template contava per genere
 *     di errore (verb/wrong). Al genere «verb» e «wrong» si aggiunge «meth»
 *     (indirizzo giusto, metodo sbagliato), che nel template finiva in
 *     «wrong» con una regola che non lo spiegava.
 *   7 tastiera (il template non ne aveva): ↑ ↓ metodo, ← → tessera, spazio o
 *     1-9 aggancia, ⌫ stacca, invio timbra.
 *   Nessun'altra: tre respinte o tre cronometri scaduti fanno ricominciare la
 *   bolla come nel template, un cronometro scaduto non è una risposta, la
 *   schermata «done» scatta subito come nel template.
 */

import * as engine from '../KaioEngine.js';
import { ttsService } from '../../services/TTSService.js';
import { beatItems, beatLesson, fillers, labelOf, meaningOf } from '../LevelBeats.js';
import {
  W,
  H,
  METHODS,
  SLOT_Y,
  SLOT_H,
  SLOT_X0,
  MAX_BUILT,
  STAMP,
  HIT_METH,
  HIT_STAMP,
  TILE_H,
  methPos,
  tileW,
  tileHome,
  builtW,
} from '../parts/nodejs-l8-indirizzario/layout.js';
import { drawScene } from '../parts/nodejs-l8-indirizzario/draw.js';

const MODE = 'indirizzario';

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

/* The structural pieces of the template, in English: the identifier, the two
   filters, the two folder traps (a filter written as a path) and the verbs of
   the FRATTURA chapter. */
const PIECES = {
  id: { kind: 'id', label: ':id' },
  fa: { kind: 'filter', label: '?status=active' },
  fo: { kind: 'filter', label: '?status=open' },
  da: { kind: 'folder', label: 'active' },
  do: { kind: 'folder', label: 'open' },
};

function pieceOf(code) {
  if (code.startsWith('v:')) return { kind: 'verb', label: code.slice(2) };
  return PIECES[code];
}

/* What a docket can ask. `parts` is the expected address: A and B are the
   job's terms (A the resource, B the nested one), the rest structural codes.
   The ask frames follow the app language; the meanings inside stay Italian
   (the world speaks Italian, the tiles speak English — brief §2.2). */
const KINDS = {
  list: { m: 'GET', parts: ['A'], it: 'La lista di «{A}»', en: 'The list of «{A}»' },
  one: { m: 'GET', parts: ['A', 'id'], it: '«{A}» numero 7', en: '«{A}» number 7' },
  create: { m: 'POST', parts: ['A'], it: 'Un nuovo «{A}»', en: 'A new «{A}»' },
  update: { m: 'PUT', parts: ['A', 'id'], it: 'Cambiare «{A}» 7', en: 'Update «{A}» 7' },
  delete: { m: 'DELETE', parts: ['A', 'id'], it: 'Cancellare «{A}» 3', en: 'Delete «{A}» 3' },
  nested: { m: 'GET', parts: ['A', 'id', 'B'], it: '«{B}» di «{A}» 7', en: '«{B}» of «{A}» 7' },
  nestedCreate: {
    m: 'POST',
    parts: ['A', 'id', 'B'],
    it: 'Un nuovo «{B}» per «{A}» 7',
    en: 'A new «{B}» for «{A}» 7',
  },
  filterActive: {
    m: 'GET',
    parts: ['A', 'fa'],
    it: '«{A}»: solo gli attivi',
    en: '«{A}»: only the active ones',
  },
  filterOpen: {
    m: 'GET',
    parts: ['A', 'fo'],
    it: '«{A}»: solo gli aperti',
    en: '«{A}»: only the open ones',
  },
  nestedFilterOpen: {
    m: 'GET',
    parts: ['A', 'id', 'B', 'fo'],
    it: '«{B}» aperti di «{A}» 7',
    en: 'Open «{B}» of «{A}» 7',
  },
};

/* Beat: terms = term tiles in the rack (the beat's term first, then fillers
   and distractors of the same lesson), extra = structural pieces, jobs =
   [kind, roleA, roleB] with role 0 the beat's term, need = dockets to pass
   (jobs repeat in order), timer = seconds per docket (0 = none). */
const B = (o) => ({ terms: 2, extra: [], jobs: [['list', 0]], need: 2, timer: 0, ...o });

const CH = [
  {
    t: ['Nome e metodo', 'Name and method'],
    titles: [
      ['La prima bolla', 'First docket'],
      ['Chiedere la lista', 'Asking the list'],
      ['Un altro nome', 'Another name'],
      ['Due bolle', 'Two dockets'],
      ['Il ritmo', 'The rhythm'],
    ],
    beats: [
      B({ terms: 2, jobs: [['list', 0]], need: 2 }),
      B({
        terms: 2,
        jobs: [
          ['list', 0],
          ['list', 1],
        ],
        need: 3,
      }),
      B({
        terms: 3,
        jobs: [
          ['list', 0],
          ['list', 1],
        ],
        need: 3,
      }),
      B({
        terms: 3,
        jobs: [
          ['list', 0],
          ['list', 1],
          ['list', 2],
        ],
        need: 4,
      }),
      B({
        terms: 3,
        jobs: [
          ['list', 0],
          ['list', 1],
        ],
        need: 3,
      }),
    ],
  },
  {
    // Deviation 2 (header): the plural trap becomes the exact-name trap.
    t: ['Il nome esatto', 'The exact name'],
    titles: [
      ['Uno che somiglia', 'A look-alike'],
      ['Sempre quello', 'Always that one'],
      ['Non il vicino', 'Not the neighbour'],
      ['Misti', 'Mixed'],
      ['A occhio', 'At a glance'],
    ],
    beats: [
      B({ terms: 3, jobs: [['list', 0]], need: 2 }),
      B({
        terms: 4,
        jobs: [
          ['list', 0],
          ['list', 1],
        ],
        need: 3,
      }),
      B({
        terms: 4,
        jobs: [
          ['list', 0],
          ['list', 1],
        ],
        need: 3,
      }),
      B({
        terms: 5,
        jobs: [
          ['list', 0],
          ['list', 1],
          ['list', 2],
        ],
        need: 4,
      }),
      B({
        terms: 4,
        jobs: [
          ['list', 0],
          ['list', 1],
        ],
        need: 3,
      }),
    ],
  },
  {
    t: ["Il verbo non va nell'indirizzo", 'The verb is not in the address'],
    titles: [
      ['getAll', 'getAll'],
      ['Solo il nome', 'Just the name'],
      ['Il metodo lo dice', 'The method says it'],
      ['Creare', 'Creating'],
      ['Adesso lo sai', 'Now you know'],
    ],
    beats: [
      B({ terms: 2, extra: ['v:getAll'], jobs: [['list', 0]], need: 2 }),
      B({
        terms: 2,
        extra: ['v:getAll', 'v:createNew'],
        jobs: [
          ['list', 0],
          ['create', 0],
        ],
        need: 3,
      }),
      B({
        terms: 2,
        extra: ['v:createNew', 'v:getOne'],
        jobs: [
          ['create', 0],
          ['create', 1],
        ],
        need: 3,
      }),
      B({
        terms: 2,
        extra: ['v:getAll', 'v:createNew', 'v:deleteOne'],
        jobs: [
          ['create', 0],
          ['list', 1],
          ['create', 1],
        ],
        need: 4,
      }),
      B({
        terms: 2,
        extra: ['v:getAll', 'v:createNew'],
        jobs: [
          ['create', 0],
          ['list', 0],
        ],
        need: 3,
      }),
    ],
  },
  {
    t: ["L'identificatore", 'The identifier'],
    titles: [
      ['Il numero', 'The number'],
      ['Uno solo', 'Just one'],
      ['Non la lista', 'Not the list'],
      ['Cambiare', 'Updating'],
      ['Cancellare', 'Deleting'],
    ],
    beats: [
      B({ terms: 2, extra: ['id'], jobs: [['one', 0]], need: 2 }),
      B({
        terms: 2,
        extra: ['id'],
        jobs: [
          ['one', 0],
          ['list', 0],
        ],
        need: 3,
      }),
      B({
        terms: 3,
        extra: ['id'],
        jobs: [
          ['one', 0],
          ['list', 1],
        ],
        need: 3,
      }),
      B({
        terms: 3,
        extra: ['id'],
        jobs: [
          ['update', 0],
          ['one', 0],
          ['create', 0],
        ],
        need: 4,
      }),
      B({
        terms: 2,
        extra: ['id'],
        jobs: [
          ['delete', 0],
          ['one', 1],
        ],
        need: 3,
      }),
    ],
  },
  {
    t: ['Le risorse annidate', 'Nested resources'],
    titles: [
      ['Dentro uno', 'Inside one'],
      ['Quelli di uno', 'Those of one'],
      ['Non due liste', 'Not two lists'],
      ["L'annidato dell'annidato", 'Nested of the nested'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ terms: 3, extra: ['id'], jobs: [['nested', 0, 1]], need: 2 }),
      B({
        terms: 3,
        extra: ['id'],
        jobs: [
          ['nested', 0, 1],
          ['list', 0],
        ],
        need: 3,
      }),
      B({
        terms: 3,
        extra: ['id'],
        jobs: [
          ['nested', 0, 1],
          ['nested', 1, 2],
        ],
        need: 3,
      }),
      B({
        terms: 4,
        extra: ['id'],
        jobs: [
          ['nestedCreate', 0, 1],
          ['nested', 1, 2],
          ['list', 3],
        ],
        need: 4,
      }),
      B({
        terms: 3,
        extra: ['id'],
        jobs: [
          ['nested', 0, 1],
          ['nested', 1, 2],
        ],
        need: 3,
      }),
    ],
  },
  {
    t: ['Filtri, non percorsi', 'Filters, not paths'],
    titles: [
      ['Gli attivi', 'The active ones'],
      ['Non una cartella', 'Not a folder'],
      ['Il punto di domanda', 'The question mark'],
      ['Filtro e annidato', 'Filter and nested'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ terms: 2, extra: ['da', 'fa'], jobs: [['filterActive', 0]], need: 2 }),
      B({
        terms: 2,
        extra: ['da', 'fa'],
        jobs: [
          ['filterActive', 0],
          ['list', 1],
        ],
        need: 3,
      }),
      B({
        terms: 2,
        extra: ['do', 'fo', 'id'],
        jobs: [
          ['filterOpen', 0],
          ['one', 0],
        ],
        need: 3,
      }),
      // Deviation 4 (header): both filters are in the rack.
      B({
        terms: 2,
        extra: ['id', 'fo', 'fa', 'da'],
        jobs: [
          ['nestedFilterOpen', 0, 1],
          ['filterActive', 0],
        ],
        need: 3,
      }),
      B({
        terms: 2,
        extra: ['id', 'fa', 'fo'],
        jobs: [
          ['filterActive', 0],
          ['nested', 0, 1],
        ],
        need: 3,
      }),
    ],
  },
  {
    t: ['A raffica', 'In bursts'],
    titles: [
      ['Col cronometro', 'On the clock'],
      ['Meno tempo', 'Less time'],
      ['Cinque bolle', 'Five dockets'],
      ['Il picco', 'The peak'],
      ['Automatico', 'Automatic'],
    ],
    beats: [
      B({
        terms: 3,
        extra: ['id', 'fo'],
        timer: 26,
        jobs: [
          ['nested', 0, 1],
          ['create', 0],
          ['nested', 1, 2],
        ],
        need: 4,
      }),
      B({
        terms: 3,
        extra: ['id', 'fo', 'v:getAll'],
        timer: 23,
        jobs: [
          ['update', 0],
          ['filterOpen', 1],
          ['list', 0],
        ],
        need: 4,
      }),
      B({
        terms: 4,
        extra: ['id', 'fo'],
        timer: 21,
        jobs: [
          ['nestedCreate', 0, 1],
          ['delete', 1],
          ['list', 3],
        ],
        need: 5,
      }),
      B({
        terms: 4,
        extra: ['id', 'fa', 'v:createNew'],
        timer: 19,
        jobs: [
          ['filterActive', 0],
          ['create', 0],
          ['nested', 1, 2],
          ['one', 0],
        ],
        need: 5,
      }),
      B({
        terms: 3,
        extra: ['id', 'fo'],
        timer: 24,
        jobs: [
          ['nested', 0, 1],
          ['list', 1],
        ],
        need: 4,
      }),
    ],
  },
  {
    t: ['Il collaudo intero', 'The whole inspection'],
    titles: [
      ['Tutto insieme', 'All together'],
      ['Senza rete', 'No net'],
      ['La prova', 'The test'],
      ['Il picco', 'The peak'],
      ['Chiusura', 'Closing'],
    ],
    beats: [
      B({
        terms: 4,
        extra: ['id', 'fo', 'v:getAll'],
        timer: 24,
        jobs: [
          ['nested', 0, 1],
          ['create', 0],
          ['filterOpen', 1],
        ],
        need: 4,
      }),
      B({
        terms: 5,
        extra: ['id', 'fa', 'v:createNew'],
        timer: 22,
        jobs: [
          ['update', 0],
          ['nested', 1, 2],
          ['filterActive', 0],
        ],
        need: 5,
      }),
      B({
        terms: 4,
        extra: ['id', 'fo', 'v:getAll', 'v:createNew'],
        timer: 20,
        jobs: [
          ['nestedCreate', 0, 1],
          ['delete', 1],
          ['filterOpen', 1],
          ['list', 3],
        ],
        need: 5,
      }),
      B({
        terms: 4,
        extra: ['id', 'fa', 'fo', 'v:createNew'],
        timer: 18,
        jobs: [
          ['filterActive', 0],
          ['nested', 0, 1],
          ['nested', 1, 2],
          ['create', 0],
          ['one', 0],
        ],
        need: 6,
      }),
      B({
        terms: 3,
        extra: ['id', 'fo'],
        timer: 26,
        jobs: [
          ['nested', 0, 1],
          ['list', 0],
        ],
        need: 4,
      }),
    ],
  },
];

const TX = {
  it: {
    wrong: [
      "L'indirizzo non descrive la cosa chiesta.",
      "La bolla chiedeva «{it}», ma nell'indirizzo hai messo «{pick}».",
      "L'indirizzo porta il nome della cosa: «{it}» in inglese è «{word}» — e la parte dopo appartiene alla parte prima: /{word}/:id/…",
    ],
    verb: [
      "Hai messo un verbo dentro l'indirizzo.",
      'Il collaudo lo respinge: «{pick}» dice cosa fare, non cosa è.',
      "Il verbo lo porta il metodo ({meth}). L'indirizzo porta solo il nome: «{it}» è «{word}».",
    ],
    meth: [
      "L'indirizzo è giusto, il metodo no.",
      "Hai timbrato {pick}, ma la bolla chiedeva un'altra azione su «{it}».",
      "Cosa fare lo dice il metodo: {meth} /{word}. L'indirizzo «{word}» dice solo cosa è.",
    ],
    hint: 'scegli il metodo, aggancia le tessere in ordine, timbra · tastiera: ↑ ↓ metodo, ← → tessera, spazio o 1-9 aggancia, ⌫ stacca, invio timbra',
    eyebrow: 'Collaudo passato',
  },
  en: {
    wrong: [
      'The address does not describe what was asked.',
      'The docket asked for "{it}", but you put "{pick}" in the address.',
      'The address carries the name of the thing: "{it}" in English is "{word}" — and the later part belongs to the earlier one: /{word}/:id/…',
    ],
    verb: [
      'You put a verb inside the address.',
      'Inspection rejects it: "{pick}" says what to do, not what a thing is.',
      'The verb is carried by the method ({meth}). The address carries only the name: "{it}" is "{word}".',
    ],
    meth: [
      'The address is right, the method is not.',
      'You stamped {pick}, but the docket asked for a different action on "{it}".',
      'What to do is said by the method: {meth} /{word}. The address "{word}" only says what it is.',
    ],
    hint: 'pick the method, hook the tiles in order, stamp · keyboard: ↑ ↓ method, ← → tile, space or 1-9 hooks, ⌫ unhooks, enter stamps',
    eyebrow: 'Inspection passed',
  },
};

// ─── the docket ──────────────────────────────────

/** Whether a tile is what an expected part asks for. */
function matches(tile, part) {
  if (!tile) return false;
  if (part.k === 'term') return tile.kind === 'term' && tile.item === part.item;
  return tile.kind !== 'term' && tile.label === part.label;
}

/** The request written on the docket, meanings in Italian whatever the frame. */
function askOf(job, lang) {
  if (!job) return '';
  const frame = KINDS[job.kind][lang === 'en' ? 'en' : 'it'];
  return frame
    .replace('{A}', meaningOf(job.items[0], 'it'))
    .replace('{B}', meaningOf(job.items[1] || job.items[0], 'it'));
}

/** The meaning becomes visible on the docket: the term is presented. */
function showJob(host) {
  const j = host.jobs.length ? host.jobs[host.ji % host.jobs.length] : null;
  host.cur = j;
  if (j) for (const it of j.items) it.introduce();
}

/* ricerca/35 §35.3.1: a term stamped is a term heard. */
function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

// ─── the tiles on the strip ──────────────────────

/** Targets for the tiles on the strip; shrinks them when the row overflows. */
function relayout(host) {
  const widths = host.built.map((t) => builtW(t.label));
  const total = widths.reduce((a, w) => a + 12 + w + 4, SLOT_X0 + 14);
  const s = total > W - 24 ? (W - 24 - SLOT_X0 - 14) / (total - SLOT_X0 - 14) : 1;
  host.builtScale = s;
  let px = SLOT_X0;
  host.built.forEach((t, i) => {
    t.bw = widths[i] * s;
    px += 12;
    t.tx = px + t.bw / 2;
    t.ty = SLOT_Y;
    px += t.bw + 4;
  });
}

function hook(host, tile) {
  if (tile.where !== 'tray') return;
  if (host.built.length >= MAX_BUILT) {
    engine.snd(host, 'fall');
    host.shake = 0.3;
    return;
  }
  tile.where = 'built';
  tile.flip = 1;
  tile.pop = 1;
  host.built.push(tile);
  relayout(host);
  engine.snd(host, 'pop', { hz: 340, v: 0.13 });
}

function unhook(host, tile) {
  tile.where = 'tray';
  tile.tx = tile.home.x;
  tile.ty = tile.home.y;
  tile.bw = 0;
}

function popLast(host) {
  const t = host.built.pop();
  if (!t) return;
  unhook(host, t);
  relayout(host);
  engine.snd(host, 'fall');
}

function returnAll(host) {
  for (const t of host.built) unhook(host, t);
  host.built = [];
  relayout(host);
}

// ─── the error ladder (ricerca/00 passo 6) ───────

function openCoach(host, kind, pick, job) {
  const a = job.items[0];
  host.coachKind = kind;
  host.setState({
    coach: { kind, pick: pick || '', word: labelOf(a), it: meaningOf(a, 'it'), meth: job.m },
  });
}

/** Second error on one docket: the missing piece (or the method) pulses. */
function aid(host, job, okPath) {
  host.pulse = 0.8;
  host.pulseK = null;
  host.pulseM = null;
  if (okPath) {
    host.pulseM = job.m;
    return;
  }
  const i = job.parts.findIndex((p, k) => !matches(host.built[k], p));
  const part = i >= 0 ? job.parts[i] : null;
  if (!part) return;
  const tile = host.tiles.find((t) => matches(t, part));
  if (tile) host.pulseK = tile.id;
}

// ─── the verb: stamp the address ─────────────────

function pass(host, j) {
  host.made++;
  host.flash = 1;
  host.ok = 1;
  j.wrong = 0;
  j.aided = false;
  for (const it of j.items) it.clear();
  engine.snd(host, 'tone', { from: 600, to: 940, v: 0.16 });
  engine.burst(host, host.parts, STAMP.x, STAMP.y - 10, 12, '#6AAA64', { up: 90 });
  say(host, [...new Set(j.items)].map(labelOf).join(', '));
  returnAll(host);
  host.meth = null;
  host.ji++;
  host.timer = host.cfg.timer;
  persist(host);
  host.setState({ step: host.made });
  if (host.made >= host.needed) {
    for (const t of host.terms) t.clear();
    host.finished = true;
    engine.snd(host, 'chime', { notes: [440, 587, 740] });
    // As in the template: the last docket passed, the done screen is immediate.
    host.setState({ done: true });
    return;
  }
  showJob(host);
}

function restart(host) {
  // Three refused: the docket starts over, as in the template. The coach the
  // third refusal may have opened stays open over the fresh docket.
  const coachKind = host.coachKind;
  reset(host, host.state.beat); // eslint-disable-line no-use-before-define
  host.coachKind = coachKind;
}

function fail(host, j, okPath) {
  const verb = host.built.some((t) => t.kind === 'verb');
  const kind = verb ? 'verb' : okPath ? 'meth' : 'wrong';
  const pick = kind === 'meth' ? host.meth : host.built[0] ? host.built[0].label : '';
  host.shake = 0.8;
  host.reject = 1;
  engine.snd(host, 'whir');
  engine.burst(host, host.parts, STAMP.x, STAMP.y - 10, 8, '#787C7E', { up: 50 });
  j.wrong++;
  if (j.wrong === 2) {
    j.aided = true;
    aid(host, j, okPath);
  }
  if (j.wrong >= 3) {
    openCoach(host, kind, pick, j);
    j.wrong = 0;
  }
  host.bad++;
  returnAll(host);
  if (host.bad >= 3) restart(host);
}

/**
 * The stamp is the graded response: every term slot of the expected address
 * is graded with the tile the learner actually put there, through the SDK and
 * never a local `===` (§46.1, §46.2). The cue is `silent` because the game
 * answers diegetically — the green imprint, or the grey one and the tiles
 * sliding back to the rack.
 */
function check(host) {
  const j = host.cur;
  if (!j || host.finished) return;
  if (!host.meth || !host.built.length) {
    engine.snd(host, 'fall');
    host.shake = 0.4;
    return;
  }
  host.press = 1;
  j.parts.forEach((part, i) => {
    const tile = host.built[i];
    if (part.k !== 'term' || !tile) return;
    part.item.attempt(tile.label, {
      expected: labelOf(part.item),
      mode: MODE,
      hintsUsed: j.aided ? 1 : 0,
      silent: true,
    });
  });
  host.session.mark();
  const okPath =
    host.built.length === j.parts.length && j.parts.every((p, i) => matches(host.built[i], p));
  const okMeth = host.meth === j.m;
  if (okPath && okMeth) pass(host, j);
  else fail(host, j, okPath);
}

// ─── lifecycle ───────────────────────────────────

function init(host) {
  host.parts = [];
  host.tiles = [];
  host.built = [];
  host.jobs = [];
  host.cur = null;
  host.roster = [];
  host.terms = [];
  host.item = null;
  host.lesson = null;
  host.chapter = 0;
  host.meth = null;
  host.ji = 0;
  host.made = 0;
  host.needed = 0;
  host.bad = 0;
  host.timer = 0;
  host.t = 0;
  host.sel = 0;
  host.kbUsed = false;
  host.nid = 0;
  host.shake = 0;
  host.flash = 0;
  host.pulse = 0;
  host.pulseK = null;
  host.pulseM = null;
  host.reject = 0;
  host.ok = 0;
  host.press = 0;
  host.builtScale = 1;
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

  // The spine: this beat's term, its lesson, and the roster of term tiles —
  // the term plus real neighbours from the same lesson (nested resources
  // and further dockets ask them too; the rest are distractors).
  host.terms = beatItems(host.session, ci, beat);
  host.item = host.terms[0] || null;
  host.lesson = beatLesson(host.session, ci, beat);
  const extra = host.item ? fillers(host.session, host.item, cfg.terms - host.terms.length) : [];
  host.roster = host.terms.concat(extra);
  const role = (r) => host.roster[r] || host.roster[0];
  host.jobs = host.item
    ? cfg.jobs.map(([kind, a, b]) => {
        const K = KINDS[kind];
        const items = [role(a)];
        if (K.parts.includes('B')) items.push(role(b == null ? 1 : b));
        const parts = K.parts.map((code) => {
          if (code === 'A') return { k: 'term', item: items[0], label: labelOf(items[0]) };
          if (code === 'B') return { k: 'term', item: items[1], label: labelOf(items[1]) };
          const p = pieceOf(code);
          return { k: 'piece', kind: p.kind, label: p.label };
        });
        return { kind, m: K.m, items, parts, wrong: 0, aided: false };
      })
    : [];

  // The rack: every tile the same cream, in shuffled places (TEST 1).
  const tiles = host.roster
    .map((it) => ({ kind: 'term', label: labelOf(it), item: it }))
    .concat(cfg.extra.map((code) => ({ ...pieceOf(code), item: null })));
  host.tiles = shuffle(tiles).map((t, i, all) => {
    const home = tileHome(i, all.length);
    return {
      ...t,
      id: host.nid++,
      home,
      where: 'tray',
      x: home.x,
      y: home.y,
      tx: home.x,
      ty: home.y,
      bw: 0,
      flip: 0,
      pop: 0,
    };
  });

  host.built = [];
  host.parts = [];
  host.meth = null;
  host.ji = 0;
  host.made = 0;
  host.bad = 0;
  host.timer = cfg.timer;
  host.t = 0;
  host.sel = 0;
  host.kbUsed = false;
  host.shake = 0;
  host.flash = 0;
  host.pulse = 0;
  host.pulseK = null;
  host.pulseM = null;
  host.reject = 0;
  host.ok = 0;
  host.press = 0;
  host.builtScale = 1;
  host.finished = false;
  host.coachKind = null;
  // Reduced motion: the slide and the flip run at 0.7× (§15.4).
  host.motion = host.reduceMotion ? 0.7 : 1;
  host.session.mode = MODE;
  host.session.mark();
  host.setState({ step: 0 });
  showJob(host);
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
  if (host.reject > 0) host.reject -= dt * 1.4;
  if (host.ok > 0) host.ok -= dt * 1.1;
  if (host.press > 0) host.press -= dt * 4;

  if (c.timer && !host.finished) {
    host.timer -= dt;
    if (host.timer <= 0) {
      // The clock ran out: not a response, but a refusal (template).
      host.timer = c.timer;
      host.shake = 0.7;
      engine.snd(host, 'whir');
      host.bad++;
      returnAll(host);
      host.meth = null;
      if (host.bad >= 3) restart(host);
    }
  }

  for (const t of host.tiles) {
    const k = Math.min(1, dt * 14 * m);
    t.x += (t.tx - t.x) * k;
    t.y += (t.ty - t.y) * k;
    if (t.flip > 0) t.flip -= dt * 4 * m;
    if (t.pop > 0) t.pop -= dt * 3;
  }
  host.parts = engine.parts(host.parts, dt, 420);
}

// ─── input: tap a stamp, a tile, the strip, the big stamp ─

function tileAt(host, p) {
  const w = tileW(host.tiles.length);
  for (const t of host.tiles) {
    if (t.where !== 'tray') continue;
    if (Math.abs(p.x - t.home.x) <= w / 2 + 4 && Math.abs(p.y - t.home.y) <= TILE_H / 2 + 5)
      return t;
  }
  return null;
}

function tap(host, p) {
  if (host.finished) return;
  for (let i = 0; i < METHODS.length; i++) {
    const q = methPos(i);
    if (Math.hypot(p.x - q.x, p.y - q.y) < HIT_METH) {
      host.meth = METHODS[i];
      engine.snd(host, 'click', { hz: 1200, v: 0.14 });
      return;
    }
  }
  if (Math.hypot(p.x - STAMP.x, p.y - (STAMP.y - 20)) < HIT_STAMP) {
    check(host);
    return;
  }
  if (Math.abs(p.y - SLOT_Y) < SLOT_H / 2 && host.built.length) {
    popLast(host);
    return;
  }
  const t = tileAt(host, p);
  if (t) {
    hook(host, t);
    return;
  }
  engine.snd(host, 'fall');
}

/**
 * The same game with no pointer: ↑ ↓ pick the method, ← → move along the
 * rack, space or a digit hooks a tile, backspace unhooks the last, enter
 * stamps.
 */
function key(host, e) {
  if (host.finished) return;
  host.kbUsed = true;
  const n = host.tiles.length;
  const inTray = (i) => host.tiles[i] && host.tiles[i].where === 'tray';
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault();
    const at = METHODS.indexOf(host.meth);
    const step = e.key === 'ArrowUp' ? -1 : 1;
    const i =
      at < 0 ? (step < 0 ? METHODS.length - 1 : 0) : (at + step + METHODS.length) % METHODS.length;
    host.meth = METHODS[i];
    engine.snd(host, 'click', { hz: 1200, v: 0.14 });
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();
    if (!n) return;
    const step = e.key === 'ArrowLeft' ? -1 : 1;
    let i = host.sel;
    for (let k = 0; k < n; k++) {
      i = (i + step + n) % n;
      if (inTray(i)) break;
    }
    host.sel = i;
    engine.snd(host, 'click', { hz: 1400, v: 0.1 });
  } else if (e.key === ' ') {
    e.preventDefault();
    if (inTray(host.sel)) hook(host, host.tiles[host.sel]);
  } else if (/^[1-9]$/.test(e.key)) {
    const i = parseInt(e.key, 10) - 1;
    if (inTray(i)) {
      host.sel = i;
      hook(host, host.tiles[i]);
    }
  } else if (e.key === 'Backspace' || e.key === 'Delete') {
    e.preventDefault();
    popLast(host);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    check(host);
  }
}

function draw(host, x) {
  drawScene(host, x, askOf(host.cur, host.state.lang));
}

// ─── chrome copy (rendered by GameHost, written here) ─────

function coachText(host, coach, lang) {
  const L = TX[lang] || TX.it;
  const lines = L[coach.kind] || L.wrong;
  const sub = (t) =>
    t
      .replace(/\{pick\}/g, coach.pick || '')
      .replace(/\{word\}/g, coach.word || '')
      .replace(/\{it\}/g, coach.it || '')
      .replace(/\{meth\}/g, coach.meth || 'GET');
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
    id: 'nodejs-l8-indirizzario',
    surface: 'nodejs',
    level: 7,
    band: 2,
    register: 'R13',
    title: "L'indirizzario",
    titleEn: 'The address book',
    levelLabel: 'Node.js · L8 Progettazione API REST / Node.js · L8 REST API Design',
    font: '700 16px Georgia',
  },
  W,
  H,
  CH,
  drone: { freq: 45, type: 'triangle', volume: 0.013, lowpass: 130 },
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
