/**
 * Il lasciapassare — the template's eight chapters (CFG knobs, passes, titles)
 * and the bilingual coach copy. Data only: no drawing, no mechanics.
 * Split out of js/games/levels/nodejs-l11-lasciapassare.js (brief §2.6).
 */

/* Lasciapassare: cosa dichiara e cosa è vero (template).
   sig=sigillo valido (firmato dalla casa) · exp=scaduto · role=diritti scritti
   issuer=chi l'ha firmato · claim=chi dice di essere */
const B = (o) => ({
  passes: [],
  need: 5,
  fall: 3.0,
  checkExp: false,
  checkRole: false,
  checkIss: false,
  ...o,
});
const P = (o) => ({
  claim: 'operaio',
  sig: true,
  exp: false,
  role: 'operaio',
  issuer: 'casa',
  want: 'ammesso',
  ...o,
});
const NO = P({ sig: false, want: 'respinto' });
const OLD = P({ exp: true, want: 'respinto' });
const ALT = P({ issuer: 'altra casa', want: 'respinto' });
const BOSS = P({ claim: 'capo', role: 'capo' });
const FAKE_BOSS = P({ claim: 'capo', role: 'operaio', want: 'respinto' });
const LIAR = P({ claim: 'capo', sig: false, want: 'respinto' });
const DIR = P({ claim: 'direttore', sig: false, want: 'respinto' });

/* The template's eight chapters, verbatim; `punches` is the one knob added for
   the vocabulary spine (how many engraved punches hang over the desk). */
const CFG = [
  {
    t: ['Il punzone', 'The punch'],
    punches: 2,
    titles: [
      ['Il primo sigillo', 'First seal'],
      ['Non combacia', 'Does not match'],
      ['Due al banco', 'Two at the desk'],
      ['Più svelto', 'Quicker'],
      ['Il ritmo', 'The rhythm'],
    ],
    beats: [
      B({ fall: 3.6, need: 3, passes: [P({}), NO] }),
      B({ fall: 3.4, need: 4, passes: [P({}), NO, P({})] }),
      B({ fall: 3.2, need: 5, passes: [P({}), NO, P({}), NO] }),
      B({ fall: 2.4, need: 6, passes: [P({}), NO, P({}), NO, P({})] }),
      B({ fall: 3.0, need: 5, passes: [P({}), NO, P({})] }),
    ],
  },
  {
    t: ['La firma', 'The signature'],
    punches: 3,
    titles: [
      ['Il punzone della casa', 'The house punch'],
      ['Il falso', 'The forgery'],
      ['Fatto in casa propria', 'Home-made'],
      ['Misti', 'Mixed'],
      ['A occhio', 'At a glance'],
    ],
    beats: [
      B({ fall: 3.4, need: 4, passes: [P({}), NO] }),
      B({ fall: 3.2, need: 5, passes: [P({}), NO, NO] }),
      B({ fall: 3.0, need: 5, passes: [P({ claim: 'capo', role: 'operaio' }), NO, P({})] }),
      B({ fall: 2.3, need: 6, passes: [P({}), NO, P({}), NO, P({})] }),
      B({ fall: 3.0, need: 5, passes: [P({}), NO, P({})] }),
    ],
  },
  {
    t: ['Il timbro si legge, non prova', 'The stamp reads, it does not prove'],
    punches: 3,
    titles: [
      ['Dice di essere il capo', 'Says they are the boss'],
      ['Nessuno lo ha firmato', 'Nobody signed it'],
      ['Scritto non è provato', 'Written is not proven'],
      ['Tre al banco', 'Three at the desk'],
      ['Adesso lo sai', 'Now you know'],
    ],
    beats: [
      B({ fall: 3.4, need: 4, passes: [LIAR, P({})] }),
      B({ fall: 3.2, need: 5, passes: [LIAR, BOSS, P({})] }),
      B({ fall: 3.0, need: 5, passes: [DIR, BOSS, NO] }),
      B({ fall: 2.3, need: 6, passes: [LIAR, P({}), DIR, BOSS, P({})] }),
      B({ fall: 3.0, need: 5, passes: [LIAR, BOSS, P({})] }),
    ],
  },
  {
    t: ['La scadenza', 'The expiry'],
    punches: 4,
    titles: [
      ['La data', 'The date'],
      ['Scaduto ieri', 'Expired yesterday'],
      ['Sigillo buono, data no', 'Good seal, bad date'],
      ['Misti', 'Mixed'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ checkExp: true, fall: 3.4, need: 4, passes: [P({}), OLD] }),
      B({ checkExp: true, fall: 3.2, need: 5, passes: [P({}), OLD, NO] }),
      B({ checkExp: true, fall: 3.0, need: 5, passes: [OLD, P({}), OLD] }),
      B({ checkExp: true, fall: 2.3, need: 6, passes: [P({}), OLD, NO, P({}), OLD] }),
      B({ checkExp: true, fall: 3.0, need: 5, passes: [P({}), OLD, P({})] }),
    ],
  },
  {
    t: ["Chi l'ha firmato", 'Who signed it'],
    punches: 4,
    titles: [
      ["L'altra casa", 'The other house'],
      ['Firma sconosciuta', 'Unknown signature'],
      ['Buono altrove', 'Good elsewhere'],
      ['Tre controlli', 'Three checks'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ checkIss: true, fall: 3.4, need: 4, passes: [P({}), ALT] }),
      B({ checkIss: true, fall: 3.2, need: 5, passes: [P({}), ALT, NO] }),
      B({ checkIss: true, checkExp: true, fall: 3.0, need: 5, passes: [ALT, OLD, P({})] }),
      B({
        checkIss: true,
        checkExp: true,
        fall: 2.3,
        need: 6,
        passes: [P({}), ALT, OLD, NO, P({})],
      }),
      B({ checkIss: true, checkExp: true, fall: 3.0, need: 5, passes: [P({}), ALT, P({})] }),
    ],
  },
  {
    t: ['I diritti scritti dentro', 'The rights written inside'],
    punches: 4,
    titles: [
      ['Solo operai', 'Workers only'],
      ['Il capo passa', 'The boss passes'],
      ['Diritti non suoi', 'Not their rights'],
      ['Quattro controlli', 'Four checks'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({ checkRole: true, fall: 3.4, need: 4, passes: [BOSS, FAKE_BOSS] }),
      B({ checkRole: true, fall: 3.2, need: 5, passes: [BOSS, FAKE_BOSS, P({})] }),
      B({
        checkRole: true,
        checkExp: true,
        fall: 3.0,
        need: 5,
        passes: [FAKE_BOSS, P({ claim: 'capo', role: 'capo', exp: true, want: 'respinto' }), BOSS],
      }),
      B({
        checkRole: true,
        checkExp: true,
        checkIss: true,
        fall: 2.3,
        need: 6,
        passes: [BOSS, FAKE_BOSS, ALT, OLD, P({})],
      }),
      B({ checkRole: true, checkExp: true, fall: 3.0, need: 5, passes: [BOSS, FAKE_BOSS, P({})] }),
    ],
  },
  {
    t: ['A raffica', 'In bursts'],
    punches: 4,
    titles: [
      ['Due al banco', 'Two at the desk'],
      ['Meno tempo', 'Less time'],
      ['Sei lasciapassare', 'Six passes'],
      ['Il picco', 'The peak'],
      ['Automatico', 'Automatic'],
    ],
    beats: [
      B({
        checkRole: true,
        checkExp: true,
        checkIss: true,
        fall: 2.5,
        need: 6,
        passes: [P({}), NO, OLD, BOSS, FAKE_BOSS],
      }),
      B({
        checkRole: true,
        checkExp: true,
        checkIss: true,
        fall: 2.3,
        need: 7,
        passes: [P({}), ALT, OLD, BOSS, NO, P({})],
      }),
      B({
        checkRole: true,
        checkExp: true,
        checkIss: true,
        fall: 2.2,
        need: 7,
        passes: [DIR, P({}), OLD, FAKE_BOSS, BOSS],
      }),
      B({
        checkRole: true,
        checkExp: true,
        checkIss: true,
        fall: 2.0,
        need: 8,
        passes: [P({}), NO, OLD, ALT, BOSS, FAKE_BOSS, P({})],
      }),
      B({ checkRole: true, checkExp: true, fall: 2.6, need: 6, passes: [P({}), OLD, BOSS, P({})] }),
    ],
  },
  {
    t: ['Il varco intero', 'The whole gate'],
    punches: 4,
    titles: [
      ['Tutto insieme', 'All together'],
      ['Senza rete', 'No net'],
      ['La prova', 'The test'],
      ['Il picco', 'The peak'],
      ['Chiusura', 'Closing'],
    ],
    beats: [
      B({
        checkRole: true,
        checkExp: true,
        checkIss: true,
        fall: 2.6,
        need: 6,
        passes: [P({}), NO, OLD, BOSS, FAKE_BOSS],
      }),
      B({
        checkRole: true,
        checkExp: true,
        checkIss: true,
        fall: 2.4,
        need: 7,
        passes: [
          LIAR,
          P({}),
          ALT,
          P({ claim: 'capo', role: 'capo', exp: true, want: 'respinto' }),
          BOSS,
          P({}),
        ],
      }),
      B({
        checkRole: true,
        checkExp: true,
        checkIss: true,
        fall: 2.2,
        need: 8,
        passes: [P({}), DIR, OLD, ALT, BOSS, FAKE_BOSS, P({})],
      }),
      B({
        checkRole: true,
        checkExp: true,
        checkIss: true,
        fall: 2.0,
        need: 9,
        passes: [P({}), NO, OLD, ALT, BOSS, FAKE_BOSS, DIR, P({})],
      }),
      B({ checkRole: true, checkExp: true, fall: 2.8, need: 6, passes: [P({}), OLD, BOSS, P({})] }),
    ],
  },
];

export const CH = CFG.map((c) => ({
  t: c.t,
  titles: c.titles,
  beats: c.beats.map((b, i) => ({ b: i, punches: c.punches, ...b })),
}));

export const TX = {
  it: {
    wrong: [
      'Il punzone non entra.',
      'Hai calato «{pick}», ma il lasciapassare è rilasciato per «{it}»: il punzone inciso per quello è «{word}».',
      'Prima si legge per cosa è stato rilasciato, poi si cerca il punzone con quel nome inglese: «{word}» è la parola incisa.',
    ],
    letIn: [
      'Hai fatto passare un lasciapassare che non regge.',
      '{why}',
      "Il sigillo prova, la scritta no: il punzone «{word}» combaciava con il sigillo, ma quello che c'è scritto sul foglio lo scrive chi passa.",
    ],
    kept: [
      'Hai respinto un lasciapassare in regola.',
      'Il sigillo combaciava e la data teneva: quella persona aveva diritto di entrare.',
      'Controlla il sigillo prima di decidere, non la faccia: il punzone «{word}» era quello giusto e combaciava.',
    ],
    why: {
      sig: 'Il sigillo era falso: il punzone non combaciava.',
      exp: 'La data era vecchia: il lasciapassare era scaduto.',
      iss: "L'aveva firmato un'altra casa, non la nostra.",
      role: 'Diceva di essere «{claim}», ma il sigillo dice «{role}»: i diritti non erano suoi.',
      none: 'Il punzone non combaciava, o la data era vecchia, o i diritti non erano suoi.',
    },
    hint: 'tocca il punzone con la parola inglese giusta, poi la leva · tastiera: ← → punzone, spazio cala, poi ← ammesso → respinto',
    eyebrow: 'Varco in ordine',
  },
  en: {
    wrong: [
      'The punch does not fit.',
      'You lowered "{pick}", but the pass was issued for "{it}": the punch engraved for that is "{word}".',
      'First read what the pass was issued for, then find the punch with that English name: "{word}" is the engraved word.',
    ],
    letIn: [
      'You let through a pass that does not hold.',
      '{why}',
      'The seal proves, the writing does not: the "{word}" punch matched the seal, but what is written on the sheet is written by whoever carries it.',
    ],
    kept: [
      'You turned away a legitimate pass.',
      'The seal matched and the date held: that person had the right to enter.',
      'Check the seal before deciding, not the face: the "{word}" punch was the right one and it matched.',
    ],
    why: {
      sig: 'The seal was forged: the punch did not match.',
      exp: 'The date was old: the pass had expired.',
      iss: 'Another house signed it, not ours.',
      role: 'They claimed to be "{claim}", but the seal says "{role}": the rights were not theirs.',
      none: 'The punch did not match, or the date was old, or the rights were not theirs.',
    },
    hint: 'tap the punch with the right English word, then a lever · keyboard: ← → punch, space lowers it, then ← admit → reject',
    eyebrow: 'Gate in order',
  },
};
