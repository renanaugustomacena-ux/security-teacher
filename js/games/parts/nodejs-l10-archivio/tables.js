/**
 * L'archivio — the template's tables, verbatim (knowledge-aio-giochi/templates/
 * nodejs-l10-archivio): the pieces and their weights, the jobs, the eight
 * chapters of five beats, and the weight function the hoist reads. Nothing here
 * draws or grades; the level module wires the vocabulary spine on top.
 *
 * One deviation from the template: chapter 3 beat 1 (the FRATTURA) asked for
 * COUNT(*) with a tray that did not hold it, which made the beat unwinnable.
 * The piece is in that reserve now — the fracture is the budget of 4, which
 * SELECT * + WHERE attivo (200 rows) blows.
 */

/* Pezzi della scheda: costo/beneficio sul peso trasportato (template verbatim).
   cols riduce il peso per riga · where riduce le righe · limit taglia il totale
   index non cambia il peso ma abbatte il tempo · all* sono le trappole */
const P = {
  'SELECT *': { w: 1, rows: 1, tag: 'tutte le colonne' },
  'SELECT nome,email': { w: 0.25, rows: 1, tag: 'due colonne' },
  'SELECT nome': { w: 0.15, rows: 1, tag: 'una colonna' },
  'WHERE attivo': { w: 1, rows: 0.2, tag: 'solo gli attivi' },
  'WHERE id=7': { w: 1, rows: 0.02, tag: 'una riga' },
  'LIMIT 20': { w: 1, rows: 0.05, tag: 'venti righe' },
  'ORDER BY data': { w: 1, rows: 1, tag: 'ordinate' },
  'INDEX(email)': { w: 1, rows: 1, tag: 'indice', idx: true },
  'JOIN ordini': { w: 2.2, rows: 1, tag: 'unisce gli ordini' },
  'COUNT(*)': { w: 0.02, rows: 0.001, tag: 'solo il numero' },
};

const J = (ask, en, budget, want) => ({ ask, en, budget, want });
const B = (o) => ({
  jobs: [],
  tray: ['SELECT *', 'SELECT nome,email'],
  need: 3,
  rows: 1000,
  timer: 0,
  ...o,
});

/* The jobs, so the chapter tables below read like the template's. */
const JOBS = {
  all: J('Tutti i dati dei clienti', 'All customer data', 1200, ['SELECT *']),
  allActive: J('Tutti i dati dei clienti attivi', 'All data of active customers', 300, [
    'SELECT *',
    'WHERE attivo',
  ]),
  all7: J('Tutti i dati del cliente 7', 'All data of customer 7', 60, ['SELECT *', 'WHERE id=7']),
  first20: J('I primi venti clienti', 'The first twenty customers', 80, ['SELECT *', 'LIMIT 20']),
  nameEmail: J('Nome e email dei clienti', 'Name and email of customers', 320, [
    'SELECT nome,email',
  ]),
  names: J('Solo i nomi dei clienti', 'Just the customer names', 180, ['SELECT nome']),
  nameEmailActive: J('Nome e email degli attivi', 'Name and email of active ones', 70, [
    'SELECT nome,email',
    'WHERE attivo',
  ]),
  name7: J('Il nome del cliente 7', 'The name of customer 7', 6, ['SELECT nome', 'WHERE id=7']),
  countActive: J('Quanti clienti attivi ci sono', 'How many active customers', 4, [
    'COUNT(*)',
    'WHERE attivo',
  ]),
  namesActive: J('Solo i nomi degli attivi', 'Just names of active ones', 40, [
    'SELECT nome',
    'WHERE attivo',
  ]),
  count: J('Quanti clienti ci sono', 'How many customers', 4, ['COUNT(*)']),
  names20: J('I primi venti nomi', 'The first twenty names', 12, ['SELECT nome', 'LIMIT 20']),
  nameEmail20: J('Nome e email dei primi venti', 'Name and email of the first twenty', 22, [
    'SELECT nome,email',
    'LIMIT 20',
  ]),
  namesActive20: J('I primi venti nomi degli attivi', 'First twenty names of active ones', 10, [
    'SELECT nome',
    'WHERE attivo',
    'LIMIT 20',
  ]),
  howManyActive: J('Quanti attivi ci sono', 'How many active ones', 4, [
    'COUNT(*)',
    'WHERE attivo',
  ]),
  namesByDate: J('I nomi in ordine di data', 'Names in date order', 180, [
    'SELECT nome',
    'ORDER BY data',
  ]),
  recent20: J('I venti più recenti, solo nome', 'The twenty most recent, name only', 12, [
    'SELECT nome',
    'ORDER BY data',
    'LIMIT 20',
  ]),
  recentActive20: J('I venti attivi più recenti', 'The twenty most recent active ones', 10, [
    'SELECT nome',
    'WHERE attivo',
    'ORDER BY data',
    'LIMIT 20',
  ]),
  namesActiveFast: J('I nomi degli attivi, in fretta', 'Names of active ones, fast', 40, [
    'SELECT nome',
    'WHERE attivo',
    'INDEX(email)',
  ]),
  name7Fast: J('Il nome del cliente 7, in fretta', 'Name of customer 7, fast', 6, [
    'SELECT nome',
    'WHERE id=7',
    'INDEX(email)',
  ]),
  names20Fast: J('I primi venti nomi, in fretta', 'First twenty names, fast', 12, [
    'SELECT nome',
    'LIMIT 20',
    'INDEX(email)',
  ]),
  active: J('Quanti attivi', 'How many active', 4, ['COUNT(*)', 'WHERE attivo']),
  customers: J('Quanti clienti', 'How many customers', 4, ['COUNT(*)']),
};

const ALL_PARTS = [
  'SELECT *',
  'SELECT nome',
  'SELECT nome,email',
  'WHERE attivo',
  'WHERE id=7',
  'LIMIT 20',
  'ORDER BY data',
  'INDEX(email)',
  'COUNT(*)',
  'JOIN ordini',
];

/* Capitoli: le tabelle del modello, una meccanica nuova ciascuno (ricerca/03 §3.4).
   tray pezzi in riserva · jobs commesse (a ciclo) · need commesse da evadere ·
   rows righe in archivio · timer secondi per commessa (0 = nessuno) ·
   plates strati con targa (3 nei primi due capitoli, poi 4) */
const CFG = [
  {
    t: ['La scheda', 'The card'],
    titles: [
      ['Il primo pezzo', 'First part'],
      ['Tira la leva', 'Pull the lever'],
      ['Due commesse', 'Two orders'],
      ['Il peso si vede', 'Weight shows'],
      ['Il ritmo', 'The rhythm'],
    ],
    beats: [
      B({ tray: ['SELECT *'], jobs: [JOBS.all], need: 2 }),
      B({ tray: ['SELECT *', 'WHERE attivo'], jobs: [JOBS.allActive], need: 3 }),
      B({
        tray: ['SELECT *', 'WHERE attivo', 'WHERE id=7'],
        jobs: [JOBS.all7, JOBS.allActive],
        need: 3,
      }),
      B({
        tray: ['SELECT *', 'WHERE attivo', 'WHERE id=7', 'LIMIT 20'],
        jobs: [JOBS.first20, JOBS.all7, JOBS.allActive],
        need: 4,
      }),
      B({
        tray: ['SELECT *', 'WHERE attivo', 'WHERE id=7', 'LIMIT 20'],
        jobs: [JOBS.all7, JOBS.first20],
        need: 3,
      }),
    ],
  },
  {
    t: ['Solo le colonne che servono', 'Only the columns you need'],
    titles: [
      ['Due colonne', 'Two columns'],
      ['Una sola', 'Just one'],
      ['Non tutte', 'Not all'],
      ['Colonne e filtro', 'Columns and filter'],
      ['A occhio', 'At a glance'],
    ],
    beats: [
      B({ tray: ['SELECT *', 'SELECT nome,email'], jobs: [JOBS.nameEmail], need: 2 }),
      B({
        tray: ['SELECT *', 'SELECT nome,email', 'SELECT nome'],
        jobs: [JOBS.names, JOBS.nameEmail],
        need: 3,
      }),
      B({
        tray: ['SELECT *', 'SELECT nome,email', 'SELECT nome', 'WHERE attivo'],
        jobs: [JOBS.nameEmailActive, JOBS.names],
        need: 3,
      }),
      B({
        tray: ['SELECT *', 'SELECT nome,email', 'SELECT nome', 'WHERE attivo', 'WHERE id=7'],
        jobs: [JOBS.name7, JOBS.nameEmailActive, JOBS.names],
        need: 4,
      }),
      B({
        tray: ['SELECT *', 'SELECT nome,email', 'SELECT nome', 'WHERE attivo'],
        jobs: [JOBS.nameEmailActive, JOBS.names],
        need: 3,
      }),
    ],
  },
  {
    t: ['Non filtrare a valle', 'Do not filter downstream'],
    titles: [
      ['Tutto e poi scegli', 'All then choose'],
      ['Il montacarichi', 'The hoist'],
      ['Filtra a monte', 'Filter upstream'],
      ['Il conto', 'The count'],
      ['Adesso lo sai', 'Now you know'],
    ],
    beats: [
      // FRATTURA: the count first appears here with a budget of 4 — SELECT *
      // and WHERE attivo bring up 200 rows. The template's tray had no
      // COUNT(*) on this beat, which made it unwinnable; the piece is in the
      // reserve so the fracture teaches instead of blocking.
      B({
        tray: ['SELECT *', 'WHERE attivo', 'SELECT nome', 'COUNT(*)'],
        jobs: [JOBS.countActive],
        need: 2,
      }),
      B({
        tray: ['SELECT *', 'WHERE attivo', 'SELECT nome', 'COUNT(*)'],
        jobs: [JOBS.countActive, JOBS.namesActive],
        need: 3,
      }),
      B({
        tray: ['SELECT *', 'WHERE attivo', 'WHERE id=7', 'SELECT nome', 'COUNT(*)'],
        jobs: [JOBS.count, JOBS.countActive],
        need: 3,
      }),
      B({
        tray: [
          'SELECT *',
          'WHERE attivo',
          'WHERE id=7',
          'SELECT nome',
          'SELECT nome,email',
          'COUNT(*)',
          'LIMIT 20',
        ],
        jobs: [JOBS.countActive, JOBS.name7, JOBS.names20],
        need: 4,
      }),
      B({
        tray: ['SELECT *', 'WHERE attivo', 'SELECT nome', 'COUNT(*)'],
        jobs: [JOBS.countActive, JOBS.namesActive],
        need: 3,
      }),
    ],
  },
  {
    t: ['Il limite', 'The limit'],
    titles: [
      ['Venti righe', 'Twenty rows'],
      ['Una pagina', 'One page'],
      ['Limite e colonne', 'Limit and columns'],
      ['Non tutto', 'Not everything'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ tray: ['SELECT *', 'LIMIT 20', 'SELECT nome'], jobs: [JOBS.names20], need: 2 }),
      B({
        tray: ['SELECT *', 'LIMIT 20', 'SELECT nome', 'SELECT nome,email'],
        jobs: [JOBS.nameEmail20, JOBS.names20],
        need: 3,
      }),
      B({
        tray: ['SELECT *', 'LIMIT 20', 'SELECT nome', 'WHERE attivo'],
        jobs: [JOBS.namesActive20, JOBS.names20],
        need: 3,
      }),
      B({
        tray: [
          'SELECT *',
          'LIMIT 20',
          'SELECT nome',
          'SELECT nome,email',
          'WHERE attivo',
          'COUNT(*)',
        ],
        jobs: [JOBS.namesActive20, JOBS.howManyActive, JOBS.nameEmail20],
        need: 4,
      }),
      B({
        tray: ['SELECT *', 'LIMIT 20', 'SELECT nome', 'WHERE attivo'],
        jobs: [JOBS.names20, JOBS.namesActive20],
        need: 3,
      }),
    ],
  },
  {
    t: ["L'ordinamento", 'Sorting'],
    titles: [
      ['Per data', 'By date'],
      ['Ordina e limita', 'Sort and limit'],
      ["L'ordine costa", 'Sorting costs'],
      ['I più recenti', 'The most recent'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ tray: ['SELECT nome', 'ORDER BY data', 'LIMIT 20'], jobs: [JOBS.namesByDate], need: 2 }),
      B({
        tray: ['SELECT nome', 'ORDER BY data', 'LIMIT 20', 'SELECT *'],
        jobs: [JOBS.recent20],
        need: 3,
      }),
      B({
        tray: ['SELECT nome', 'SELECT nome,email', 'ORDER BY data', 'LIMIT 20', 'WHERE attivo'],
        jobs: [JOBS.recentActive20, JOBS.recent20],
        need: 3,
      }),
      B({
        tray: [
          'SELECT nome',
          'SELECT nome,email',
          'ORDER BY data',
          'LIMIT 20',
          'WHERE attivo',
          'COUNT(*)',
          'SELECT *',
        ],
        jobs: [JOBS.recentActive20, JOBS.howManyActive, JOBS.nameEmail20],
        need: 4,
      }),
      B({
        tray: ['SELECT nome', 'ORDER BY data', 'LIMIT 20', 'WHERE attivo'],
        jobs: [JOBS.recent20, JOBS.recentActive20],
        need: 3,
      }),
    ],
  },
  {
    t: ["L'indice", 'The index'],
    titles: [
      ["L'indice non alleggerisce", 'Index does not lighten'],
      ['Ma fa in fretta', 'But it is fast'],
      ['Con il filtro', 'With the filter'],
      ['Quando serve', 'When it helps'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({
        tray: ['SELECT nome', 'WHERE attivo', 'INDEX(email)'],
        jobs: [JOBS.namesActiveFast],
        need: 2,
      }),
      B({
        tray: ['SELECT nome', 'WHERE attivo', 'WHERE id=7', 'INDEX(email)'],
        jobs: [JOBS.name7Fast, JOBS.namesActiveFast],
        need: 3,
      }),
      B({
        tray: ['SELECT nome', 'SELECT *', 'WHERE attivo', 'INDEX(email)', 'LIMIT 20'],
        jobs: [JOBS.names20Fast, JOBS.namesActiveFast],
        need: 3,
      }),
      B({
        tray: [
          'SELECT nome',
          'SELECT nome,email',
          'WHERE attivo',
          'WHERE id=7',
          'INDEX(email)',
          'LIMIT 20',
          'COUNT(*)',
        ],
        jobs: [JOBS.name7Fast, JOBS.active, JOBS.names20Fast],
        need: 4,
      }),
      B({
        tray: ['SELECT nome', 'WHERE attivo', 'INDEX(email)', 'LIMIT 20'],
        jobs: [JOBS.namesActiveFast, JOBS.names20Fast],
        need: 3,
      }),
    ],
  },
  {
    t: ['A raffica', 'In bursts'],
    titles: [
      ['Col cronometro', 'On the clock'],
      ['Meno tempo', 'Less time'],
      ['Cinque commesse', 'Five orders'],
      ['Il picco', 'The peak'],
      ['Automatico', 'Automatic'],
    ],
    beats: [
      B({
        timer: 26,
        tray: [
          'SELECT *',
          'SELECT nome',
          'SELECT nome,email',
          'WHERE attivo',
          'WHERE id=7',
          'LIMIT 20',
          'COUNT(*)',
        ],
        jobs: [JOBS.name7, JOBS.active, JOBS.names20],
        need: 4,
      }),
      B({
        timer: 23,
        tray: [
          'SELECT *',
          'SELECT nome',
          'SELECT nome,email',
          'WHERE attivo',
          'LIMIT 20',
          'ORDER BY data',
          'COUNT(*)',
        ],
        jobs: [JOBS.recent20, JOBS.customers, JOBS.nameEmailActive],
        need: 4,
      }),
      B({
        timer: 21,
        tray: [
          'SELECT *',
          'SELECT nome',
          'WHERE attivo',
          'WHERE id=7',
          'LIMIT 20',
          'ORDER BY data',
          'INDEX(email)',
          'COUNT(*)',
        ],
        jobs: [JOBS.recentActive20, JOBS.name7, JOBS.active],
        need: 5,
      }),
      B({
        timer: 19,
        tray: ALL_PARTS,
        jobs: [JOBS.name7, JOBS.recentActive20, JOBS.customers, JOBS.names20],
        need: 5,
      }),
      B({
        timer: 25,
        tray: ['SELECT nome', 'SELECT nome,email', 'WHERE attivo', 'LIMIT 20', 'COUNT(*)'],
        jobs: [JOBS.active, JOBS.names20],
        need: 4,
      }),
    ],
  },
  {
    t: ['Il turno intero', 'The whole shift'],
    titles: [
      ['Tutto insieme', 'All together'],
      ['Senza rete', 'No net'],
      ['La prova', 'The test'],
      ['Il picco', 'The peak'],
      ['Chiusura', 'Closing'],
    ],
    beats: [
      B({
        timer: 24,
        tray: [
          'SELECT *',
          'SELECT nome',
          'SELECT nome,email',
          'WHERE attivo',
          'WHERE id=7',
          'LIMIT 20',
          'ORDER BY data',
          'COUNT(*)',
        ],
        jobs: [JOBS.recentActive20, JOBS.active, JOBS.name7],
        need: 4,
      }),
      B({
        timer: 22,
        tray: [
          'SELECT *',
          'SELECT nome',
          'SELECT nome,email',
          'WHERE attivo',
          'WHERE id=7',
          'LIMIT 20',
          'ORDER BY data',
          'INDEX(email)',
          'COUNT(*)',
        ],
        jobs: [JOBS.name7Fast, JOBS.nameEmail20, JOBS.customers],
        need: 5,
      }),
      B({
        timer: 20,
        tray: ALL_PARTS,
        jobs: [JOBS.recentActive20, JOBS.active, JOBS.name7Fast, JOBS.names20],
        need: 5,
      }),
      B({
        timer: 18,
        tray: ALL_PARTS,
        jobs: [JOBS.active, JOBS.recentActive20, JOBS.name7, JOBS.nameEmailActive, JOBS.names20],
        need: 6,
      }),
      B({
        timer: 26,
        tray: ['SELECT nome', 'WHERE attivo', 'LIMIT 20', 'COUNT(*)', 'ORDER BY data'],
        jobs: [JOBS.recentActive20, JOBS.active],
        need: 4,
      }),
    ],
  },
];

const CH = CFG.map((c, i) => ({
  t: c.t,
  titles: c.titles,
  beats: c.beats.map((b, k) => ({ ...b, b: k, plates: i < 2 ? 3 : 4 })),
}));

/* The template's weight: rows × row-fraction × column-weight, never below 1. */
export function weight(cfg, parts) {
  const rows = cfg.rows;
  let w = 1;
  let rf = 1;
  let sel = false;
  for (const p of parts) {
    const d = P[p];
    if (!d) continue;
    if (p.indexOf('SELECT') === 0 || p === 'COUNT(*)') {
      w = d.w;
      sel = true;
    }
    if (p === 'JOIN ordini') w *= d.w;
    rf *= d.rows;
  }
  if (!sel) w = 1;
  return Math.max(1, Math.round(rows * rf * w));
}

export { P, CH };
