/**
 * LIBRARY GLOSSARY TOPIC DATA - Knowledge AIO
 * ===========================================
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with:  npm run ingest:glossaries
 *
 * Terminology the maintainer actually studies, lifted from the per-domain
 * glossaries of the personal study library. One LEVEL per library domain, one
 * LESSON per glossary section.
 *
 * 11 levels · 141 lessons · 1294 terms.
 *
 * Split into ./library/*.js chunks so no single data file exceeds the §13.2
 * 300 KB budget; the whole graph still loads lazily as one unit.
 *
 * Items carry the full definition in `note` (used by the `definizione`
 * practice mode) and a short gloss in `italian`. Glosses over 40 chars are
 * flagged `longAnswer: true` so the mode selector keeps them out of
 * type-the-answer modes.
 */

import lvl0 from './library/02-linux-poweruser.js';
import lvl1 from './library/03-windows-poweruser.js';
import lvl2 from './library/04-programmazione-python.js';
import lvl3 from './library/05-sviluppo-web.js';
import lvl4 from './library/06-gestione-piattaforme.js';
import lvl5 from './library/07-github-e-gitactions.js';
import lvl6 from './library/08-manutenzione-it.js';
import lvl7 from './library/09-automazioni-flussi-di-lavoro.js';
import lvl8 from './library/10-migrazione-vmware-proxmox.js';
import lvl9 from './library/11-godot-engine.js';
import lvl10 from './library/12-software-engineering-extra.js';

export default {
  id: 'library-glossary',
  levels: {
    0: lvl0,
    1: lvl1,
    2: lvl2,
    3: lvl3,
    4: lvl4,
    5: lvl5,
    6: lvl6,
    7: lvl7,
    8: lvl8,
    9: lvl9,
    10: lvl10,
  },
};
