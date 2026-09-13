/* eslint-disable no-use-before-define -- WIP checkpoint 2026-09-14: new games moved to the Godot app, this web port is frozen as-is */
/**
 * tsc — Node.js L19 «TypeScript Base» (js/topics/data/nodejs.js, level 18:
 * 4 lessons × 10 terms = 40), served in 8 chapters × 5 beats, one term per
 * beat (LevelBeats spine, DOCTRINE §46.5).
 *
 * Port of knowledge-aio-giochi/templates/nodejs-l19-tsc (design sheet in its
 * header) as a DOM game (`kind: 'dom'`, brief §6): a terminal is text, not a
 * canvas. GameHost gives it a root and an AbortSignal; the game rebuilds its
 * DOM in render() and keeps its only timer on the signal.
 *
 * SCHEDA (ricerca/00 §0.3 · ricerca/22) — GIOCO tsc
 * LIVELLO .... Node.js L19 TypeScript Base, banda 4 — 8 capitoli, 40 beat
 * APERTURA DI BANDA: nessun mondo. Nero, monospaziato, ambra per gli errori,
 *              un solo accento oro. È il messaggio: adesso stai lavorando.
 * CONCETTO ... Dichiarare la forma di un dato è un contratto che si controlla
 *              prima di partire. E un contratto che accetta tutto non
 *              controlla niente.
 * FORMA ...... identità        VERBO ... dichiarare, far compilare, firmare
 * ARCHETIPO .. ricerca/22 terminale + ricerca/21 mutazione (il probe)
 * OBIETTIVO .. tre fatti sullo stato del progetto: src/ compila, test/probe.ts
 *              rifiutato, e l'ultimo commit ha per oggetto il concetto della
 *              modifica — l'obiettivo lo nomina in italiano, il commit lo deve
 *              nominare in inglese. Verificato sullo stato, non sulla stringa
 * VINCOLO .... capitoli 4 e 8: numero massimo di comandi
 * PERDI SE ... non si perde. Tempo e comandi restano scritti accanto
 * SBAGLI ..... tipo: 1 l'output vero di tsc, lo stato non cambia
 *                    2 dopo 90 s senza comandi utili, una riga dice dove guardare
 *                    3 non esiste: l'output è l'esercizio
 *              commit: 1 il hook commit-msg rifiuta, il commit non esiste
 *                      2 alla seconda, il termine giusto si accende nel glossario
 *                      3 pannello di coaching, con il termine inglese
 * FRATTURA ... capitolo 3 — `any` fa sparire l'errore E il controllo: tsc tace
 *              e il probe compila. Si vede nello stato, non in un messaggio
 * REGISTRO ... terminale (ricerca/42 §42.5: «L19 tsc · terminale (resta)») —
 *              nero, oro fosforo, ambra, cenere, avorio, grigio output ·
 *              figura: il prompt e il cursore · suolo: la barra dei fatti e la
 *              riga del prompt · movimento: le righe arrivano una alla volta
 *              (18 ms), il cursore batte a 1,06 Hz · carattere: JetBrains Mono
 * NUMERI ..... output 18 ms/riga, righe di storico 200, suggerimento a 90 s,
 *              done 520 ms dopo l'ultimo fatto, glossario 4 termini
 *
 * DEVIAZIONI DAL TEMPLATE (deliberate)
 *   1 il terzo fatto dell'obiettivo — il commit — porta il vocabolario del
 *     livello (brief §2, §6): il template non aveva termini. Il glossario dei
 *     4 candidati (termine + 3 vicini della stessa lezione) sta nel hook
 *     `.githooks/commit-msg` e nei chip; il messaggio digitato è la risposta
 *     valutata con `attempt(typed, { expected: term.english, mode: 'tsc' })`.
 *   2 il vincolo dei comandi si controlla anche al commit, non solo a tsc: con
 *     il terzo fatto il minimo è nano · tsc · git commit (3), e mc resta quello
 *     del template (3 al picco: si fa in tre, senza un comando sprecato).
 *   3 Escape non fa niente dentro nano (nel template annullava la riga): la
 *     pausa è dell'host (brief §6) e il gioco non la ingoia.
 *   4 tempo con `host.t` (update) e non Date.now(): orologio, suggerimento a
 *     90 s e ritardo del done sono deterministici nella suite.
 *   5 `git checkout .` è un comando vero del prompt (nel template era solo la
 *     voce «Ripristina» della pausa): ripristina il beat.
 */

import * as engine from '../KaioEngine.js';
import { ttsService } from '../../services/TTSService.js';
import { beatItems, beatLesson, distractors, labelOf, meaningOf } from '../LevelBeats.js';
import { run as runShell, complete } from '../parts/nodejs-l19-tsc/shell.js';
import { paint, PALETTE } from '../parts/nodejs-l19-tsc/view.js';

const MODE = 'tsc';
const W = 420;
const H = 910;
const LINE_S = 0.018; // ricerca/22 §22.7: output 12-25 ms a riga
const MAX_LINES = 200; // §22.6
const HINT_S = 90; // §22.6: suggerimento passivo
const DONE_S = 0.52; // template
const OPTIONS = 4; // termine + 3 vicini
const TICK_MS = 18;
export const SYNTAX = [
  ': number',
  ': string',
  ': boolean',
  '[]',
  '?',
  ' | null',
  ' | undefined',
  'src/',
  'test/',
];

const P = (o) => o;

/* Un beat descrive un progetto vero e tre diagnostiche vere. Il checker gira
   sullo stato del file, non sulla stringa digitata (ricerca/22 §22.3 leva 1). */
const CH = [
  {
    t: ['Il primo errore', 'The first error'],
    titles: [
      ['Leggi dove punta', 'Read where it points'],
      ['Il numero del tipo', 'The type number'],
      ["L'operatore", 'The operator'],
      ['Il metodo che non esiste', 'The method that does not exist'],
      ['A colpo sicuro', 'Straight away'],
    ],
    beats: [
      P({
        I: 'User',
        f: 'age',
        x: 'string',
        w: 'number',
        fn: 'birthday',
        e: 'u.age + 1',
        bad: '"quaranta"',
        bt: 'string',
        hc: 2365,
        hm: "Operator '+' cannot be applied to types 'string' and 'number'.",
      }),
      P({
        I: 'Order',
        f: 'total',
        x: 'string',
        w: 'number',
        fn: 'withTax',
        e: 'u.total * 1.22',
        bad: '"12.50"',
        bt: 'string',
        hc: 2362,
        hm: "The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.",
      }),
      P({
        I: 'Product',
        f: 'stock',
        x: 'boolean',
        w: 'number',
        fn: 'restock',
        e: 'u.stock + 10',
        bad: 'true',
        bt: 'boolean',
        hc: 2365,
        hm: "Operator '+' cannot be applied to types 'boolean' and 'number'.",
      }),
      P({
        I: 'Account',
        f: 'label',
        x: 'number',
        w: 'string',
        fn: 'clean',
        e: 'u.label.trim()',
        bad: '42',
        bt: 'number',
        hc: 2339,
        hm: "Property 'trim' does not exist on type 'number'.",
      }),
      P({
        I: 'Session',
        f: 'token',
        x: 'number',
        w: 'string',
        fn: 'short',
        e: 'u.token.slice(0, 8)',
        bad: '99',
        bt: 'number',
        hc: 2339,
        hm: "Property 'slice' does not exist on type 'number'.",
      }),
    ],
  },
  {
    t: ['Due file', 'Two files'],
    titles: [
      ["L'errore è a valle", 'The error is downstream'],
      ['La causa è a monte', 'The cause is upstream'],
      ['Non dove segnala', 'Not where it reports'],
      ['Risali', 'Walk back'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      P({
        I: 'Invoice',
        f: 'amount',
        x: 'string',
        w: 'number',
        fn: 'due',
        e: 'u.amount - 100',
        bad: '"900"',
        bt: 'string',
        hc: 2362,
        hm: "The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.",
      }),
      P({
        I: 'Customer',
        f: 'active',
        x: 'string',
        w: 'boolean',
        fn: 'isOn',
        e: 'u.active === true',
        bad: '"si"',
        bt: 'string',
        hc: 2367,
        hm: "This comparison appears to be unintentional because the types 'string' and 'boolean' have no overlap.",
      }),
      P({
        I: 'Ticket',
        f: 'priority',
        x: 'string',
        w: 'number',
        fn: 'bump',
        e: 'u.priority + 1',
        bad: '"alta"',
        bt: 'string',
        hc: 2365,
        hm: "Operator '+' cannot be applied to types 'string' and 'number'.",
      }),
      P({
        I: 'Payment',
        f: 'paid',
        x: 'number',
        w: 'boolean',
        fn: 'settled',
        e: 'u.paid && true',
        bad: '1',
        bt: 'number',
        hc: 2322,
        hm: "Type 'number' is not assignable to type 'boolean'.",
      }),
      P({
        I: 'Shipment',
        f: 'code',
        x: 'number',
        w: 'string',
        fn: 'upper',
        e: 'u.code.toUpperCase()',
        bad: '7',
        bt: 'number',
        hc: 2339,
        hm: "Property 'toUpperCase' does not exist on type 'number'.",
      }),
    ],
  },
  {
    t: ['any', 'any'],
    titles: [
      ["L'errore sparisce", 'The error disappears'],
      ['E il controllo?', 'And the check?'],
      ['FRATTURA', 'FRACTURE'],
      ['Il probe compila', 'The probe compiles'],
      ['Adesso lo sai', 'Now you know'],
    ],
    beats: [
      P({
        I: 'Profile',
        f: 'score',
        x: 'string',
        w: 'number',
        fn: 'rank',
        e: 'u.score * 10',
        bad: '"alto"',
        bt: 'string',
        hc: 2362,
        hm: "The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.",
      }),
      P({
        I: 'Metric',
        f: 'value',
        x: 'string',
        w: 'number',
        fn: 'double',
        e: 'u.value * 2',
        bad: '"12"',
        bt: 'string',
        hc: 2362,
        hm: "The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.",
      }),
      P({
        I: 'Reading',
        f: 'celsius',
        x: 'string',
        w: 'number',
        fn: 'toF',
        e: 'u.celsius * 1.8 + 32',
        bad: '"20"',
        bt: 'string',
        hc: 2362,
        hm: "The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.",
      }),
      P({
        I: 'Batch',
        f: 'size',
        x: 'boolean',
        w: 'number',
        fn: 'half',
        e: 'u.size / 2',
        bad: 'false',
        bt: 'boolean',
        hc: 2362,
        hm: "The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.",
      }),
      P({
        I: 'Quota',
        f: 'used',
        x: 'string',
        w: 'number',
        fn: 'left',
        e: '1000 - u.used',
        bad: '"200"',
        bt: 'string',
        hc: 2363,
        hm: "The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.",
      }),
    ],
  },
  {
    t: ['In quattro comandi', 'In four commands'],
    titles: [
      ['Pensa prima', 'Think first'],
      ['Quattro', 'Four'],
      ['Tre', 'Three'],
      ['Il picco', 'The peak'],
      ['Senza vincolo', 'No constraint'],
    ],
    beats: [
      P({
        I: 'Node',
        f: 'depth',
        x: 'string',
        w: 'number',
        fn: 'deeper',
        e: 'u.depth + 1',
        bad: '"3"',
        bt: 'string',
        hc: 2365,
        hm: "Operator '+' cannot be applied to types 'string' and 'number'.",
        mc: 5,
      }),
      P({
        I: 'Queue',
        f: 'length',
        x: 'string',
        w: 'number',
        fn: 'grow',
        e: 'u.length * 2',
        bad: '"10"',
        bt: 'string',
        hc: 2362,
        hm: "The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.",
        mc: 4,
      }),
      P({
        I: 'Cache',
        f: 'hits',
        x: 'boolean',
        w: 'number',
        fn: 'ratio',
        e: 'u.hits / 100',
        bad: 'true',
        bt: 'boolean',
        hc: 2362,
        hm: "The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.",
        mc: 3,
      }),
      P({
        I: 'Worker',
        f: 'name',
        x: 'number',
        w: 'string',
        fn: 'tag',
        e: 'u.name.padEnd(8)',
        bad: '5',
        bt: 'number',
        hc: 2339,
        hm: "Property 'padEnd' does not exist on type 'number'.",
        mc: 3,
      }),
      P({
        I: 'Stream',
        f: 'chunks',
        x: 'string',
        w: 'number',
        fn: 'total',
        e: 'u.chunks + 0',
        bad: '"7"',
        bt: 'string',
        hc: 2365,
        hm: "Operator '+' cannot be applied to types 'string' and 'number'.",
      }),
    ],
  },
  {
    t: ['Opzionale non è undefined', 'Optional is not undefined'],
    titles: [
      ['Il punto di domanda', 'The question mark'],
      ['Possibly undefined', 'Possibly undefined'],
      ['Non è lo stesso', 'Not the same'],
      ['Due campi', 'Two fields'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      P({
        I: 'Contact',
        f: 'phone',
        x: 'string',
        w: 'string | undefined',
        fn: 'has',
        e: 'u.phone?.length ?? 0',
        bad: 'null',
        bt: 'null',
        hc: 2322,
        hm: "Type 'null' is not assignable to type 'string'.",
      }),
      P({
        I: 'Address',
        f: 'unit',
        x: 'string',
        w: 'string | undefined',
        fn: 'label',
        e: 'u.unit?.trim() ?? "-"',
        bad: 'null',
        bt: 'null',
        hc: 2322,
        hm: "Type 'null' is not assignable to type 'string'.",
      }),
      P({
        I: 'Coupon',
        f: 'discount',
        x: 'number',
        w: 'number | null',
        fn: 'apply',
        e: 'u.discount ?? 0',
        bad: 'undefined',
        bt: 'undefined',
        hc: 2322,
        hm: "Type 'undefined' is not assignable to type 'number'.",
      }),
      P({
        I: 'Draft',
        f: 'title',
        x: 'string',
        w: 'string | null',
        fn: 'show',
        e: 'u.title ?? "senza titolo"',
        bad: 'undefined',
        bt: 'undefined',
        hc: 2322,
        hm: "Type 'undefined' is not assignable to type 'string'.",
      }),
      P({
        I: 'Reply',
        f: 'body',
        x: 'string',
        w: 'string | undefined',
        fn: 'len',
        e: 'u.body?.length ?? 0',
        bad: 'null',
        bt: 'null',
        hc: 2322,
        hm: "Type 'null' is not assignable to type 'string'.",
      }),
    ],
  },
  {
    t: ['Array e interface', 'Arrays and interfaces'],
    titles: [
      ['Le parentesi quadre', 'The square brackets'],
      ['map non esiste', 'map does not exist'],
      ['Array di cosa', 'Array of what'],
      ['Annidato', 'Nested'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      P({
        I: 'Post',
        f: 'tags',
        x: 'string',
        w: 'string[]',
        fn: 'clean',
        e: 'u.tags.map(t => t.trim())',
        bad: '"a,b"',
        bt: 'string',
        hc: 2339,
        hm: "Property 'map' does not exist on type 'string'.",
        wr: 'string[]',
      }),
      P({
        I: 'Cart',
        f: 'prices',
        x: 'number',
        w: 'number[]',
        fn: 'sum',
        e: 'u.prices.reduce((a, b) => a + b, 0)',
        bad: '12',
        bt: 'number',
        hc: 2339,
        hm: "Property 'reduce' does not exist on type 'number'.",
      }),
      P({
        I: 'Playlist',
        f: 'ids',
        x: 'string[]',
        w: 'number[]',
        fn: 'first',
        e: 'u.ids[0] + 1',
        bad: '["1"]',
        bt: 'string[]',
        hc: 2365,
        hm: "Operator '+' cannot be applied to types 'string' and 'number'.",
      }),
      P({
        I: 'Team',
        f: 'members',
        x: 'string',
        w: 'string[]',
        fn: 'count',
        e: 'u.members.length + 0',
        bad: '"ada"',
        bt: 'string',
        hc: 2365,
        hm: "Operator '+' cannot be applied to types 'number' and 'number'.",
      }),
      P({
        I: 'Log',
        f: 'levels',
        x: 'number',
        w: 'string[]',
        fn: 'join',
        e: 'u.levels.join(", ")',
        bad: '3',
        bt: 'number',
        hc: 2339,
        hm: "Property 'join' does not exist on type 'number'.",
      }),
    ],
  },
  {
    t: ['Unioni e restringimento', 'Unions and narrowing'],
    titles: [
      ['Due tipi in uno', 'Two types in one'],
      ['typeof', 'typeof'],
      ['Non entrambi', 'Not both'],
      ['Restringi', 'Narrow'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      P({
        I: 'Field',
        f: 'raw',
        x: 'number',
        w: 'string | number',
        fn: 'text',
        e: 'String(u.raw)',
        bad: 'true',
        bt: 'boolean',
        hc: 2322,
        hm: "Type 'boolean' is not assignable to type 'number'.",
      }),
      P({
        I: 'Input',
        f: 'val',
        x: 'string',
        w: 'string | number',
        fn: 'norm',
        e: 'typeof u.val === "number" ? u.val : Number(u.val)',
        bad: 'null',
        bt: 'null',
        hc: 2322,
        hm: "Type 'null' is not assignable to type 'string'.",
      }),
      P({
        I: 'Cell',
        f: 'data',
        x: 'boolean',
        w: 'string | number',
        fn: 'show',
        e: '`${u.data}`',
        bad: 'false',
        bt: 'boolean',
        hc: 2322,
        hm: "Type 'boolean' is not assignable to type 'string | number'.",
        only: true,
      }),
      P({
        I: 'Param',
        f: 'arg',
        x: 'string',
        w: 'string | number',
        fn: 'idOf',
        e: 'typeof u.arg === "string" ? u.arg.length : u.arg',
        bad: '[]',
        bt: 'never[]',
        hc: 2339,
        hm: "Property 'length' does not exist on type 'string | number'.",
      }),
      P({
        I: 'Row',
        f: 'key',
        x: 'number',
        w: 'string | number',
        fn: 'k',
        e: 'String(u.key).padStart(4, "0")',
        bad: '{}',
        bt: '{}',
        hc: 2322,
        hm: "Type '{}' is not assignable to type 'number'.",
      }),
    ],
  },
  {
    t: ['La prova', 'The test'],
    titles: [
      ['Tutto insieme', 'All together'],
      ['Senza rete', 'No net'],
      ['Un tentativo', 'One attempt'],
      ['Il picco', 'The peak'],
      ['Chiusura', 'Closing'],
    ],
    beats: [
      P({
        I: 'Job',
        f: 'attempts',
        x: 'string',
        w: 'number',
        fn: 'retry',
        e: 'u.attempts + 1',
        bad: '"2"',
        bt: 'string',
        hc: 2365,
        hm: "Operator '+' cannot be applied to types 'string' and 'number'.",
        mc: 4,
      }),
      P({
        I: 'Lease',
        f: 'expires',
        x: 'string',
        w: 'number',
        fn: 'left',
        e: 'u.expires - Date.now()',
        bad: '"1000"',
        bt: 'string',
        hc: 2362,
        hm: "The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.",
        mc: 4,
      }),
      P({
        I: 'Token',
        f: 'scopes',
        x: 'string',
        w: 'string[]',
        fn: 'can',
        e: 'u.scopes.includes("read")',
        bad: '"read"',
        bt: 'string',
        hc: 2339,
        hm: "Property 'includes' does not exist on type 'string'.",
        mc: 3,
      }),
      P({
        I: 'Handle',
        f: 'fd',
        x: 'string',
        w: 'number',
        fn: 'close',
        e: 'u.fd + 0',
        bad: '"3"',
        bt: 'string',
        hc: 2365,
        hm: "Operator '+' cannot be applied to types 'string' and 'number'.",
        mc: 3,
      }),
      P({
        I: 'Runtime',
        f: 'pid',
        x: 'string',
        w: 'number',
        fn: 'kill',
        e: 'u.pid * 1',
        bad: '"512"',
        bt: 'string',
        hc: 2362,
        hm: "The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.",
      }),
    ],
  },
];

const T = {
  it: {
    goal: 'obiettivo',
    src: 'src/ compila',
    probe: 'test/probe.ts rifiutato',
    commit: 'commit · oggetto',
    env: 'node 22 · typescript 5.6',
    done: 'Contratto in piedi',
    cmds: 'comandi',
    max: 'max',
    look: "— l'informazione che ti serve è in ",
    limit: (mc, n) => `vincolo: ${mc} comandi. Ne hai spesi ${n}. git checkout . e ricomincia.`,
    wrong: [
      'Il hook commit-msg ha rifiutato il commit per la terza volta.',
      'L’obiettivo chiedeva «{it}», il messaggio diceva «{pick}».',
      'In inglese «{it}» si chiama «{word}»: git commit -am "{word}".',
    ],
    hint: 'leggi l’obiettivo → correggi il tipo → tsc → git commit -am "termine" · tastiera: ↑ ↓ storico, Tab completa il percorso',
  },
  en: {
    goal: 'objective',
    src: 'src/ compiles',
    probe: 'test/probe.ts rejected',
    commit: 'commit · subject',
    env: 'node 22 · typescript 5.6',
    done: 'Contract holds',
    cmds: 'commands',
    max: 'max',
    look: '— the information you need is in ',
    limit: (mc, n) => `constraint: ${mc} commands. You spent ${n}. git checkout . and start over.`,
    wrong: [
      'The commit-msg hook refused the commit for the third time.',
      'The objective asked for "{it}", the subject said "{pick}".',
      'In English "{it}" is called "{word}": git commit -am "{word}".',
    ],
    hint: 'read the objective → fix the type → tsc → git commit -am "term" · keyboard: ↑ ↓ history, Tab completes the path',
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

function strings(host) {
  return T[host.state.lang] || T.it;
}

/* ricerca/35 §35.3.1: a term signed is a term heard. */
function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

function useful(host) {
  host.lastUseful = host.t;
}

// ─── output, 18 ms a riga (ricerca/22 §22.7) ─────

function print(host, t, k) {
  const cadence = LINE_S / (host.motion || 1);
  const at = Math.max(host.t, host.lastAt || 0) + cadence;
  host.lastAt = at;
  host.q.push({ t, k, at });
}

function clock(host) {
  const s = Math.floor(host.t);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

// ─── il progetto virtuale ────────────────────────

function ret(b) {
  return b.w.indexOf('|') >= 0 ? b.w.split('|')[0].trim() : b.w;
}

function srcFile(host) {
  return `src/${host.mod}.ts`;
}

function buildFiles(host, b) {
  const files = {};
  files[srcFile(host)] = [`export interface ${b.I} {`, '  id: number;', `  ${b.f}: ${b.x};`, '}'];
  files['src/handler.ts'] = [
    `import { ${b.I} } from './${host.mod}';`,
    '',
    `export function ${b.fn}(u: ${b.I}): ${ret(b)} {`,
    `  return ${b.e};`,
    '}',
  ];
  files['test/probe.ts'] = [
    `import { ${b.fn} } from '../src/handler';`,
    '',
    `${b.fn}({ id: 1, ${b.f}: ${b.bad} });`,
  ];
  files['tsconfig.json'] = [
    '{',
    '  "compilerOptions": {',
    '    "strict": true,',
    '    "noEmit": true',
    '  }',
    '}',
  ];
  files['package.json'] = ['{', '  "name": "api",', '  "type": "module"', '}'];
  files['.githooks/commit-msg'] = [
    '#!/bin/sh',
    '# commit-msg — the subject names the concept the change is about.',
    '# The objective says which one; the glossary is the accepted set.',
    `# glossary: ${host.options.map(labelOf).join(' | ')}`,
    'node tools/check-subject.mjs "$1"',
  ];
  return files;
}

/* `|` sta SOLO nella seconda passata: metterlo anche nella classe di escape
   produceva `\\s*` letterale e rendeva impossibili i 10 beat con unione. */
function rx(t) {
  return t.replace(/[.*+?^${}()[\]\\]/g, '\\$&').replace(/\s*\|\s*/g, '\\s*\\|\\s*');
}

/** The checker: runs on the file, not on the string typed. */
export function check(host) {
  const b = host.b;
  const cur = host.files[srcFile(host)][2] || '';
  const pats = [new RegExp(`^\\s*${b.f}\\s*:\\s*${rx(b.w)}\\s*;?\\s*$`)];
  /* `phone?: string` è equivalente a `phone: string | undefined`: si accetta. */
  const opt = b.w.match(/^(.*?)\s*\|\s*undefined$/);
  if (opt) pats.push(new RegExp(`^\\s*${b.f}\\?\\s*:\\s*${rx(opt[1])}\\s*;?\\s*$`));
  const ok = pats.some((p) => p.test(cur));
  const any = /:\s*any(\[\])?\s*;?\s*$/.test(cur);
  const orig = new RegExp(`^\\s*${b.f}\\s*:\\s*${b.x.replace(/[[\]|]/g, '\\$&')}\\s*;?\\s*$`).test(
    cur
  );
  return { srcOk: ok || any, probeRejected: ok, any, orig, cur };
}

function overLimit(host) {
  const mc = host.b.mc || 0;
  if (!mc || host.nCmd <= mc) return false;
  print(host, '', 'out');
  print(host, strings(host).limit(mc, host.nCmd), 'err');
  print(host, '', 'out');
  return true;
}

/**
 * The beat is won on the state of the project, at the moment the last of the
 * three facts becomes true: after tsc, or after the commit that signs it.
 */
function maybeWin(host) {
  if (host.finished || host.doneAt != null) return;
  if (!(host.okSrc && host.okProbe && host.ti >= host.terms.length)) return;
  for (const term of host.terms) term.clear();
  persist(host);
  host.doneAt = host.t + DONE_S;
}

function tsc(host) {
  if (overLimit(host)) return;
  const b = host.b;
  const r = check(host);
  const errs = [];
  if (!r.srcOk) {
    if (r.orig) errs.push([`src/handler.ts:4:10 - error TS${b.hc}: ${b.hm}`, 'src/handler.ts:4']);
    else errs.push([`${srcFile(host)}:3:3 - error TS1005: ';' expected.`, `${srcFile(host)}:3`]);
  } else if (r.probeRejected) {
    const col = 12 + b.f.length + 2;
    errs.push([
      `test/probe.ts:3:${col} - error TS2322: Type '${b.bt}' is not assignable to type '${b.w}'.`,
      'test/probe.ts:3',
    ]);
  }
  if (!errs.length) print(host, '', 'out');
  else {
    for (const e of errs) print(host, e[0], 'err');
    print(host, '', 'out');
    print(host, `Found ${errs.length} error in ${errs[0][1]}`, 'dim');
    print(host, '', 'out');
  }
  /* Il contatore conta SOLO src/: l'output può dire «Found 1 error in
     test/probe.ts» mentre qui c'è 0, e le due cose non si contraddicono
     perché l'etichetta dice quale insieme conta (ricerca/22 §22.3 leva 3). */
  host.okSrc = r.srcOk;
  host.okProbe = r.probeRejected;
  host.nErr = r.srcOk ? 0 : errs.length;
  maybeWin(host);
}

// ─── the commit: the vocabulary, graded through the SDK ──

function pending(host) {
  return host.terms[host.ti] || null;
}

function setOptions(host) {
  const term = pending(host);
  if (!term) {
    host.options = [];
    return;
  }
  host.options = shuffle([term].concat(distractors(host.session, term, OPTIONS - 1)));
}

function openCoach(host, kind, pick, term) {
  host.setState({
    coach: { kind, pick: pick || '', word: labelOf(term), it: meaningOf(term, 'it') },
  });
}

/**
 * The commit-msg hook: the subject must name the concept the objective names
 * in Italian. Every subject that reaches the hook is the learner's own pick
 * (§46.2). Ladder (ricerca/00 passo 6): 1st the hook's refusal, 2nd the right
 * term glows in the glossary, 3rd the coach.
 */
function commitMsg(host, msg) {
  if (overLimit(host)) return false;
  const term = pending(host);
  if (!term) return true;
  const r = term.attempt(msg, {
    expected: labelOf(term),
    mode: MODE,
    hintsUsed: host.aided ? 1 : 0,
    silent: true,
  });
  if (r.correct) {
    host.wrong = 0;
    host.glow = null;
    return true;
  }
  host.wrong += 1;
  print(host, `commit-msg: subject "${msg}" rejected`, 'err');
  print(host, `glossary: ${host.options.map(labelOf).join(' · ')}`, 'dim');
  print(host, '', 'out');
  if (host.wrong >= 2) {
    host.aided = true;
    host.glow = labelOf(term);
  }
  if (host.wrong >= 3) {
    openCoach(host, 'wrong', msg, term);
    host.wrong = 0;
  }
  return false;
}

function committed(host, msg) {
  const term = pending(host);
  if (!term) return;
  say(host, labelOf(term));
  host.ti += 1;
  host.aided = false;
  host.glow = null;
  setOptions(host);
  host.files['.githooks/commit-msg'] = buildFiles(host, host.b)['.githooks/commit-msg'];
  host.base['.githooks/commit-msg'] = host.files['.githooks/commit-msg'].slice();
  const next = pending(host);
  if (next) next.introduce();
  host.session.mark();
  host.okTerm = host.ti >= host.terms.length;
  if (msg) maybeWin(host);
}

// ─── nano ────────────────────────────────────────

function openNano(host, file) {
  host.nano = { file, cur: 0, editing: -1, buf: '', dirty: false };
}

function nanoEdit(host, i) {
  const n = host.nano;
  if (!n || i < 0 || i >= host.files[n.file].length) return;
  n.cur = i;
  n.editing = i;
  n.buf = host.files[n.file][i];
}

function nanoCommit(host) {
  const n = host.nano;
  if (!n || n.editing < 0) return;
  if (host.files[n.file][n.editing] !== n.buf) n.dirty = true;
  host.files[n.file][n.editing] = n.buf;
  n.editing = -1;
  useful(host);
}

function nanoWrite(host) {
  nanoCommit(host);
  if (!host.nano) return;
  host.nano.dirty = false;
  host.wrote = host.nano.file;
}

function nanoExit(host) {
  nanoCommit(host);
  host.nano = null;
}

// ─── lifecycle ───────────────────────────────────

function restart(host) {
  engine.goBeat(host, host.state.beat);
}

const hooks = (host) => ({
  print: (t, k) => print(host, t, k),
  useful: () => useful(host),
  tsc: () => tsc(host),
  openNano: (f) => openNano(host, f),
  commitMsg: (msg) => commitMsg(host, msg),
  committed: (msg) => committed(host, msg),
  restart: () => restart(host),
});

function init(host) {
  host.t = 0;
  host.lines = [];
  host.q = [];
  host.cmd = '';
  host.hist = [];
  host.hi = 0;
  host.nano = null;
  host.files = {};
  host.base = {};
  host.staged = new Set();
  host.commits = [];
  host.terms = [];
  host.options = [];
  host.item = null;
  host.lesson = null;
  host.chapter = 0;
  host.ti = 0;
  host.nCmd = 0;
  host.wrong = 0;
  host.aided = false;
  host.glow = null;
  host.okSrc = false;
  host.okProbe = false;
  host.okTerm = false;
  host.nErr = 1;
  host.doneAt = null;
  host.finished = false;
  host.dom = null;
  host.motion = host.reduceMotion ? 0.7 : 1;
  host.timer = null;
  host.b = null;
  host.mod = '';

  const root = host.root;
  if (root && typeof root.addEventListener === 'function') {
    const opts = host.signal ? { signal: host.signal } : undefined;
    root.addEventListener('click', (e) => onClick(host, e), opts);
    root.addEventListener('keydown', (e) => handleKey(host, e, true), opts);
    root.addEventListener('input', (e) => onInput(host, e), opts);
  }
  /* The only timer: the output cadence and the clock. Bound to the host's
     signal (brief §6); the conformance suite drives update() by hand. */
  if (host.signal && typeof setInterval === 'function') {
    host.timer = setInterval(() => {
      if (host.state.paused || host.state.done) return;
      const before = host.lines.length;
      const s = Math.floor(host.t);
      update(host, TICK_MS / 1000);
      if (host.lines.length !== before || Math.floor(host.t) !== s || host.state.done) render(host);
    }, TICK_MS);
    host.signal.addEventListener('abort', () => {
      clearInterval(host.timer);
      host.timer = null;
    });
  }
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
  const b = host.BEATS[beat];
  host.b = b;
  host.mod = b.I.toLowerCase();
  const ci = installedChapter(host);
  host.chapter = ci;

  // The spine: this beat's term, its lesson, and the glossary the commit
  // subject picks from — the term plus real neighbours of the same lesson.
  host.terms = beatItems(host.session, ci, beat);
  host.item = host.terms[0] || null;
  host.lesson = beatLesson(host.session, ci, beat);
  host.ti = 0;
  setOptions(host);

  host.files = buildFiles(host, b);
  host.base = {};
  for (const f of Object.keys(host.files)) host.base[f] = host.files[f].slice();
  host.staged = new Set();
  host.commits = [];
  host.q = [];
  host.lines = [];
  host.lastAt = 0;
  host.hist = [];
  host.hi = 0;
  host.cmd = '';
  host.nano = null;
  host.wrote = null;
  host.t = 0;
  host.lastUseful = 0;
  host.hinted = false;
  host.nCmd = 0;
  host.wrong = 0;
  host.aided = false;
  host.glow = null;
  host.okSrc = false;
  host.okProbe = false;
  host.okTerm = false;
  host.nErr = 1;
  host.doneAt = null;
  host.finished = false;
  host.motion = host.reduceMotion ? 0.7 : 1;

  print(host, 'api@1.0.0  ·  tsconfig strict: true', 'dim');
  print(host, '', 'out');
  print(host, '$ tsc', 'cmd');
  print(host, `src/handler.ts:4:10 - error TS${b.hc}: ${b.hm}`, 'err');
  print(host, '', 'out');
  print(host, 'Found 1 error in src/handler.ts:4', 'dim');
  print(host, '', 'out');

  // The meaning is on the objective from the first frame: the term is presented.
  if (host.item) host.item.introduce();
  host.session.mode = MODE;
  host.session.mark();
}

function update(host, dt) {
  if (!host.b) return;
  host.t += dt;
  while (host.q.length && host.q[0].at <= host.t) host.lines.push(host.q.shift());
  if (host.lines.length > MAX_LINES) host.lines = host.lines.slice(-MAX_LINES);
  if (!host.hinted && host.t - host.lastUseful > HINT_S) {
    host.hinted = true;
    print(host, `${strings(host).look}${srcFile(host)}:3`, 'dim');
  }
  if (host.doneAt != null && host.t >= host.doneAt && !host.finished) {
    host.doneAt = null;
    host.finished = true;
    host.setState({ done: true });
  }
}

function draw() {}

// ─── input ───────────────────────────────────────

/** Append text to whatever is being typed: the prompt, or the line in nano. */
function type(host, text) {
  const n = host.nano;
  if (n && n.editing >= 0) n.buf += text;
  else if (!n) host.cmd += text;
  render(host);
}

/** Run the prompt as it stands (Enter), or a given line. */
function submit(host, line) {
  if (host.nano) return;
  const raw = line == null ? host.cmd : line;
  host.cmd = '';
  host.hi = host.hist.length;
  runShell(host, raw, hooks(host));
  render(host);
}

function prevent(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
}

function shellKey(host, e, native) {
  const k = e.key;
  if (k === 'Enter') {
    prevent(e);
    submit(host);
    return;
  }
  if (k === 'ArrowUp') {
    prevent(e);
    if (host.hi > 0) {
      host.hi -= 1;
      host.cmd = host.hist[host.hi];
    }
    return;
  }
  if (k === 'ArrowDown') {
    prevent(e);
    if (host.hi < host.hist.length - 1) {
      host.hi += 1;
      host.cmd = host.hist[host.hi];
    } else {
      host.hi = host.hist.length;
      host.cmd = '';
    }
    return;
  }
  if (k === 'Tab') {
    prevent(e);
    host.cmd = complete(host.files, host.cmd);
    return;
  }
  if (native) return;
  if (k === 'Backspace') host.cmd = host.cmd.slice(0, -1);
  else if (k && k.length === 1 && !e.ctrlKey && !e.metaKey) host.cmd += k;
}

function nanoKey(host, e, native) {
  const n = host.nano;
  const k = e.key;
  if (e.ctrlKey && (k === 'o' || k === 'O')) {
    prevent(e);
    nanoWrite(host);
    return;
  }
  if (e.ctrlKey && (k === 'x' || k === 'X')) {
    prevent(e);
    nanoExit(host);
    return;
  }
  if (n.editing >= 0) {
    if (k === 'Enter') {
      prevent(e);
      nanoCommit(host);
      return;
    }
    if (native) return;
    if (k === 'Backspace') n.buf = n.buf.slice(0, -1);
    else if (k && k.length === 1 && !e.ctrlKey && !e.metaKey) n.buf += k;
    return;
  }
  const len = host.files[n.file].length;
  if (k === 'ArrowDown') {
    prevent(e);
    n.cur = Math.min(len - 1, n.cur + 1);
  } else if (k === 'ArrowUp') {
    prevent(e);
    n.cur = Math.max(0, n.cur - 1);
  } else if (k === 'Enter') {
    prevent(e);
    nanoEdit(host, n.cur);
  } else if (/^[1-9]$/.test(k || '') && !native) {
    nanoEdit(host, Number(k) - 1);
  }
}

/**
 * The keyboard. `native` marks a keydown that came from one of the page's
 * own inputs, whose text the browser already edits; the module's callers
 * (and the suite) pass plain events and get the characters appended too.
 * Escape is never handled: pause belongs to the host (brief §6).
 */
function handleKey(host, e, native) {
  if (!e || e.key === 'Escape' || !host.b) return;
  if (host.state.coach || host.state.done) return;
  if (host.nano) nanoKey(host, e, native);
  else shellKey(host, e, native);
  render(host);
}

function key(host, e) {
  handleKey(host, e, false);
}

function nanoTap(host, i) {
  nanoCommit(host);
  nanoEdit(host, i);
  render(host);
}

function onClick(host, e) {
  const t = e && e.target;
  const el = t && typeof t.closest === 'function' ? t.closest('[data-act]') : null;
  if (!el) return;
  const act = el.getAttribute('data-act');
  if (act === 'chip') type(host, el.getAttribute('data-v') || '');
  else if (act === 'line') nanoTap(host, Number(el.getAttribute('data-i')));
  else if (act === 'write') {
    nanoWrite(host);
    render(host);
  } else if (act === 'exit') {
    nanoExit(host);
    render(host);
  } else if (act === 'focus') render(host);
}

function onInput(host, e) {
  const t = e && e.target;
  const role = t && t.getAttribute ? t.getAttribute('data-role') : '';
  if (role === 'cmd') host.cmd = t.value;
  else if (role === 'edit' && host.nano && host.nano.editing >= 0) host.nano.buf = t.value;
}

// ─── render ──────────────────────────────────────

function viewOf(host) {
  const L = strings(host);
  const mc = (host.b && host.b.mc) || 0;
  const it = host.state.lang === 'it';
  const term = pending(host);
  return {
    env: L.env,
    goal: L.goal + (mc ? `  ·  ${L.max} ${mc} ${L.cmds}` : ''),
    srcLabel: L.src,
    probeLabel: L.probe,
    commitLabel: L.commit,
    concept: term ? meaningOf(term, 'it') : host.terms.map((x) => meaningOf(x, 'it')).join(' · '),
    okSrc: host.okSrc,
    okProbe: host.okProbe,
    okTerm: host.okTerm,
    lines: host.lines,
    nano: host.nano
      ? {
          file: host.nano.file,
          lines: host.files[host.nano.file],
          cur: host.nano.cur,
          editing: host.nano.editing,
          dirty: host.nano.dirty,
        }
      : null,
    buf: host.nano ? host.nano.buf : '',
    cmd: host.cmd,
    nErr: String(host.nErr),
    nCmd: String(host.nCmd) + (mc ? `/${mc}` : ''),
    clock: clock(host),
    syntax: SYNTAX,
    terms: host.options.map(labelOf),
    glow: host.glow,
    reduced: Boolean(host.reduceMotion),
    focus: !host.state.paused && !host.state.coach && !host.state.done,
    lang: it ? 'it' : 'en',
  };
}

function render(host) {
  if (!host.root || !host.b) return;
  host.dom = paint(host.root, viewOf(host), host.dom);
}

// ─── coach and done ──────────────────────────────

function coachText(host, coach, lang) {
  const L = T[lang] || T.it;
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
  const L = T[lang] || T.it;
  const terms = host.terms || [];
  const meaning = terms.map((t) => meaningOf(t, 'it')).join(' · ');
  const title = lessonTitle(host.lesson, lang);
  const measure = `${host.nCmd} ${L.cmds} · ${clock(host)}`;
  return {
    eyebrow: L.done,
    title: terms.map(labelOf).join(' · '),
    subtitle: [meaning, title, measure].filter(Boolean).join(' · '),
  };
}

function onCoachClose(host) {
  host.wrong = 0;
}

export { PALETTE };

export default {
  kind: 'dom',
  meta: {
    id: 'nodejs-l19-tsc',
    surface: 'nodejs',
    level: 18,
    band: 4,
    register: 'terminale',
    title: 'tsc',
    titleEn: 'tsc',
    levelLabel: 'Node.js · L19 TypeScript Base / Node.js · L19 TypeScript Basics',
    font: '400 14px "JetBrains Mono"',
  },
  W,
  H,
  CH,
  init,
  reset,
  render,
  update,
  draw,
  key,
  type,
  submit,
  coachText,
  doneView,
  onCoachClose,
};
