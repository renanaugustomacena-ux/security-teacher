/**
 * L'officina di notte — the chapter table (part of js/games/levels/nodejs-l5-officina.js).
 *
 * Eight chapters × five beats, the template's knobs kept as they were
 * (knowledge-aio-giochi/templates/nodejs-l2-officina): flight seconds, cubes
 * in the air, spawn interval, steps to finish the piece, lamps, foil rate.
 * The template's `have`/`lack` name lists became counts — the names now come
 * from the level's own terms through the LevelBeats spine.
 */

/* Beats keep the template's knobs; `have`/`lack` name lists became counts —
   wants: terms the bench asks for (the beat's own term plus fillers), foils:
   distractors from the same lesson, band: the chapter shows the double-grab
   strap on the terms whose code answers later (await / callback). The band
   is only switched on where the spine hands the chapter such terms: chapter
   4 (fs.promises, every term awaits), 7 and 8 (fs.watch, realpath). Chapter
   6 teaches the path module (items 25-29, nothing answers later), so it
   carries no band rather than a knob that could never fire. */
const B = (o) => ({
  wants: 2,
  foils: 0,
  flight: 2.3,
  air: 2,
  spawn: 2.0,
  steps: 4,
  lives: 3,
  absRate: 0.35,
  ...o,
});
const NOLIFE = Infinity;

const CFG = [
  {
    t: ['Il gesto', 'The gesture'],
    titles: [
      ['Il primo attrezzo', 'First tool'],
      ['Ancora uno', 'One more'],
      ['Due in aria', 'Two in the air'],
      ['Più svelto', 'Quicker'],
      ['Il ritmo', 'The rhythm'],
    ],
    beats: [
      B({ wants: 2, flight: 2.6, air: 1, spawn: 2.4, steps: 3, lives: NOLIFE, absRate: 0 }),
      B({ wants: 3, flight: 2.5, air: 1, spawn: 2.2, steps: 3, lives: NOLIFE, absRate: 0 }),
      B({ wants: 3, flight: 2.4, air: 2, spawn: 2.1, steps: 4, lives: NOLIFE, absRate: 0 }),
      B({ wants: 4, flight: 2.1, air: 2, spawn: 1.6, steps: 5, absRate: 0 }),
      B({ wants: 4, flight: 2.4, air: 2, spawn: 2.0, steps: 4, absRate: 0 }),
    ],
  },
  {
    t: ['Entra un estraneo', 'A stranger arrives'],
    titles: [
      ['Il primo assente', 'First absent'],
      ['Lascia cadere', 'Let it fall'],
      ['Due estranei', 'Two strangers'],
      ['Misti', 'Mixed'],
      ['Occhio al manico', 'Watch the handle'],
    ],
    beats: [
      B({ wants: 3, foils: 1, flight: 2.5, spawn: 2.2, steps: 4, absRate: 0.3 }),
      B({ wants: 3, foils: 2, flight: 2.4, spawn: 2.1, steps: 4, absRate: 0.36 }),
      B({ wants: 4, foils: 2, flight: 2.3, spawn: 2.0, steps: 5, absRate: 0.4 }),
      B({ wants: 5, foils: 3, flight: 1.9, air: 3, spawn: 1.4, steps: 6, absRate: 0.44 }),
      B({ wants: 5, foils: 3, flight: 2.2, spawn: 1.8, steps: 5, absRate: 0.4 }),
    ],
  },
  {
    t: ['La cosa che sembra', 'The one that looks it'],
    titles: [
      ['Sale il simile', 'The look-alike rises'],
      ['Non è quello', 'Not that one'],
      ['Con i suoi simili', 'Among its kind'],
      ['Sotto pressione', 'Under pressure'],
      ['Adesso lo sai', 'Now you know'],
    ],
    beats: [
      B({ wants: 3, foils: 1, flight: 2.5, spawn: 2.2, steps: 4, absRate: 0.3 }),
      B({ wants: 3, foils: 2, flight: 2.4, spawn: 2.1, steps: 5, absRate: 0.38 }),
      B({ wants: 4, foils: 3, flight: 2.2, spawn: 1.9, steps: 5, absRate: 0.42 }),
      B({ wants: 5, foils: 4, flight: 1.9, air: 3, spawn: 1.4, steps: 6, absRate: 0.46 }),
      B({ wants: 5, foils: 3, flight: 2.2, spawn: 1.8, steps: 5, absRate: 0.4 }),
    ],
  },
  {
    t: ['La presa doppia', 'The double grab'],
    band: true,
    titles: [
      ['La fascetta', 'The band'],
      ['Due volte', 'Twice'],
      ['Non lasciarlo', "Don't drop it"],
      ['Doppi e assenti', 'Doubles and absents'],
      ['Mano ferma', 'Steady hand'],
    ],
    beats: [
      B({ wants: 2, flight: 2.6, air: 1, spawn: 2.4, steps: 3, absRate: 0 }),
      B({ wants: 3, flight: 2.5, air: 2, spawn: 2.2, steps: 4, absRate: 0 }),
      B({ wants: 3, flight: 2.4, air: 2, spawn: 2.1, steps: 4, absRate: 0 }),
      B({ wants: 4, foils: 2, flight: 2.1, air: 3, spawn: 1.6, steps: 5, absRate: 0.36 }),
      B({ wants: 4, foils: 1, flight: 2.4, air: 2, spawn: 2.0, steps: 5, absRate: 0.3 }),
    ],
  },
  {
    t: ['Percorsi scritti a mano', 'Hand-written paths'],
    titles: [
      ['La strada giusta', 'The right road'],
      ['La barra sbagliata', 'The wrong slash'],
      ['Incollato a mano', 'Glued by hand'],
      ['Tutti i falsi', 'All the fakes'],
      ['Sempre join', 'Always join'],
    ],
    beats: [
      B({ wants: 2, foils: 1, flight: 2.6, air: 1, spawn: 2.3, steps: 3, absRate: 0.34 }),
      B({ wants: 3, foils: 2, flight: 2.5, spawn: 2.1, steps: 4, absRate: 0.4 }),
      B({ wants: 3, foils: 2, flight: 2.4, spawn: 2.0, steps: 5, absRate: 0.44 }),
      B({ wants: 4, foils: 3, flight: 2.0, air: 3, spawn: 1.5, steps: 6, absRate: 0.46 }),
      B({ wants: 3, foils: 2, flight: 2.3, spawn: 1.9, steps: 5, absRate: 0.4 }),
    ],
  },
  {
    t: ['Sincrono e asincrono', 'Sync and async'],
    titles: [
      ['Uno solo', 'Just one'],
      ['Sync di fianco', 'Sync alongside'],
      ['Il bancone fermo', 'The bench stalls'],
      ['Tutti e due i tipi', 'Both kinds'],
      ['Scelta libera', 'Free choice'],
    ],
    beats: [
      B({ wants: 2, flight: 2.6, air: 1, spawn: 2.3, steps: 3, absRate: 0 }),
      B({ wants: 3, flight: 2.5, air: 2, spawn: 2.1, steps: 4, absRate: 0 }),
      B({ wants: 4, flight: 2.3, air: 2, spawn: 2.0, steps: 5, absRate: 0 }),
      B({ wants: 5, foils: 2, flight: 2.0, air: 3, spawn: 1.5, steps: 6, absRate: 0.34 }),
      B({ wants: 4, foils: 1, flight: 2.3, air: 2, spawn: 1.9, steps: 5, absRate: 0.3 }),
    ],
  },
  {
    t: ['A raffica', 'In bursts'],
    band: true,
    titles: [
      ['Tre in aria', 'Three in the air'],
      ['Senza respiro', 'No breath'],
      ['Manici lunghi', 'Long handles'],
      ['Il picco', 'The peak'],
      ['Automatico', 'Automatic'],
    ],
    beats: [
      B({ wants: 4, foils: 2, flight: 2.1, air: 3, spawn: 1.5, steps: 6, absRate: 0.4 }),
      B({ wants: 5, foils: 3, flight: 2.0, air: 3, spawn: 1.35, steps: 7, absRate: 0.42 }),
      B({ wants: 4, foils: 3, flight: 2.0, air: 3, spawn: 1.35, steps: 7, absRate: 0.44 }),
      B({ wants: 5, foils: 4, flight: 1.9, air: 3, spawn: 1.25, steps: 8, absRate: 0.46 }),
      B({ wants: 5, foils: 2, flight: 2.2, air: 3, spawn: 1.7, steps: 6, absRate: 0.38 }),
    ],
  },
  {
    t: ['Il pezzo intero', 'The whole piece'],
    band: true,
    titles: [
      ['Tutto insieme', 'All together'],
      ['Senza rete', 'No net'],
      ['La prova', 'The test'],
      ['Il picco del turno', 'Shift peak'],
      ['Chiusura', 'Closing'],
    ],
    beats: [
      B({ wants: 6, foils: 3, flight: 2.2, air: 3, spawn: 1.7, steps: 6, absRate: 0.4 }),
      B({ wants: 5, foils: 3, flight: 2.1, air: 3, spawn: 1.6, steps: 7, absRate: 0.42 }),
      B({ wants: 5, foils: 4, flight: 2.0, air: 3, spawn: 1.45, steps: 8, absRate: 0.46 }),
      B({ wants: 6, foils: 5, flight: 1.9, air: 3, spawn: 1.3, steps: 9, absRate: 0.48 }),
      B({ wants: 6, foils: 2, flight: 2.3, air: 3, spawn: 1.8, steps: 6, absRate: 0.36 }),
    ],
  },
];

export const CH = CFG.map((c) => ({
  t: c.t,
  titles: c.titles,
  beats: c.beats.map((b) => ({ ...b, band: Boolean(c.band) })),
}));
