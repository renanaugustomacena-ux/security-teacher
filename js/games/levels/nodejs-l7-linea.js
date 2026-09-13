/* eslint-disable no-use-before-define -- WIP checkpoint 2026-09-14: new games moved to the Godot app, this web port is frozen as-is */
/**
 * LA LINEA DI MONTAGGIO — Node.js L7 «Express Fondamenti» (js/topics/data/
 * nodejs.js, level 6: 4 lessons × 10 terms = 40), composed in 8 chapters × 5
 * shifts, one term per shift (LevelBeats spine, DOCTRINE §46.5).
 *
 * Port of knowledge-aio-giochi/templates/nodejs-l7-linea (design sheet in its
 * header) with the vocabulary spine of the brief and the R15 register.
 *
 * SCHEDA DI PROGETTO (ricerca/00 §0.3) + SCHEDA VISIVA (ricerca/42 §42.3)
 * GIOCO ...... La linea di montaggio
 * LIVELLO .... Node.js, L7 Express Fondamenti, banda 2 — 8 capitoli, 40 turni
 * CONCETTO ... Una richiesta attraversa una catena di stazioni, in ordine.
 *              Ognuna può fermarla, cambiarla o passarla alla successiva. Chi
 *              sta prima decide cosa la successiva riceve. L'ordine di lavoro
 *              dice in italiano quale stazione serve; la targhetta di ogni
 *              stazione porta il suo nome inglese.
 * FORMA ...... instradamento         VERBO ... comporre (montare in sequenza, poi guardare)
 * ARCHETIPO .. ricerca/18 tower defense lungo un percorso
 * VINCI SE ... il turno passa: ogni ordine di lavoro ha la sua targhetta
 *              sulla linea, le richieste buone escono, quelle cattive no
 * PERDI SE ... tre richieste cattive arrivano in fondo, o tre buone vengono
 *              fermate per errore: la linea si smonta e il turno ricomincia
 * SBAGLI ..... 1 il morsetto non chiude: la targhetta rimbalza sulla riserva,
 *                tonfo, nessun testo
 *              2 alla seconda sullo stesso ordine, la targhetta giusta si accende
 *              3 coaching: cosa hai montato, cosa diceva l'ordine, il termine
 *              (le fughe e i blocchi del turno tengono la scala del template:
 *              la seconda fa pulsare il morsetto vuoto, la terza apre il coach)
 * CAPITOLI ... 1 la prima stazione · 2 due in fila · 3 FRATTURA l'ordine conta
 *              4 chi passa e chi no · 5 il corpo va aperto prima
 *              6 la stazione finale · 7 turno pieno · 8 il turno intero
 * MONDO ...... un cortile di fabbrica a cubetti: cielo piatto, fiume, prato a
 *              piastrelle, nastro d'acciaio con i morsetti, lavagna degli
 *              ordini, riserva di targhette di legno, leva e caposquadra
 * REGISTRO ... R15 Voxel e low-poly — crema-cielo, erba, acciaio, legno,
 *              acqua, accento · figura: il caposquadra col casco alla leva e
 *              le casse sul nastro · suolo: la griglia di piastrelle del prato
 *              · movimento: salti discreti con squash delle casse, tutto ciò
 *              che cade rimbalza (la targhetta respinta, la cassa in fondo)
 *              · carattere: sans grasso con contorno per cifre e targhette
 * NUMERI ..... costruzione 16→7 s, ondata 22→40 s, morsetti 2→6, targhette
 *              nella riserva 2→7, richieste 2→7, tre fughe o tre blocchi
 * TEST 1 ..... le targhette sono tutte uguali (stesso legno, stessa misura):
 *              cambia solo il termine inciso. Il posto nella riserva è
 *              casuale a ogni turno. Le casse sono identiche: l'unico segnale
 *              sono i timbri (token, corpo, ripetizioni).
 * TEST 2 ..... "Monto sulla linea la targhetta col termine inglese che dice
 *              ciò che l'ordine chiede in italiano, nell'ordine in cui le
 *              stazioni devono agire, prima che il turno cominci"
 * TEST 3 ..... il montaggio apre con il primo ordine acceso sulla lavagna e
 *              il primo morsetto che pulsa
 *
 * DEVIAZIONI DAL TEMPLATE (deliberate, per la firma dell'orchestratore)
 *   1 gli ordini di lavoro: il template non aveva vocabolario; qui ogni
 *     stazione richiesta (`need`) è un ordine in italiano sulla lavagna e la
 *     targhetta che la monta porta il termine inglese. Il montaggio è la
 *     risposta valutata (brief §2.3): una targhetta sbagliata non chiude nel
 *     morsetto e rimbalza, quindi le stazioni "in più" del template (log,
 *     limit fuori posto) non arrivano mai sulla linea; il loro posto nella
 *     riserva lo prendono le targhette distrattrici della stessa lezione.
 *   2 riserva: mai senza distrattore (il template ne aveva zero nel cap. 1
 *     turno 1 e altrove). Senza scelta non c'è significato → termine da
 *     valutare (brief §2.2): ogni turno ha almeno una targhetta in più.
 *   3 `need` era dichiarato ma mai letto dal template (la sola ondata
 *     decideva). Qui `need` è la lista degli ordini, nell'ordine in cui le
 *     stazioni devono agire; l'ondata resta quella del template, fughe
 *     tollerate comprese (cap. 3: la richiesta senza token passa perché il
 *     template non offre auth in riserva, e il turno passa lo stesso).
 *   4 il turno passa solo se ogni ordine è montato: un'ondata che esce con un
 *     ordine aperto riporta al montaggio invece di chiudere il turno (§46.5).
 *     Lo stesso vale per un'ondata in cui tutte le richieste fuggono: il
 *     template restava in corsa per sempre (`served > 0` mai vero).
 *   5 la sosta di 0,5 s della richiesta fermata (`hold`) è rispettata: nel
 *     template la richiesta moriva nello stesso frame e il codice non si
 *     vedeva mai.
 *   6 la leva a tempo scaduto con la linea vuota concede 4 s invece di
 *     ripetere tonfo e scossa a ogni frame.
 *   7 un morsetto già occupato rifiuta la targhetta (tonfo) invece di
 *     sovrascriverla perdendo quella di prima; toccarlo a mani vuote la
 *     smonta come nel template.
 *   8 tastiera (il template ne era privo): ← → targhetta, ↑ ↓ morsetto,
 *     invio monta/smonta, spazio leva, 1-6 morsetto.
 */

import * as engine from '../KaioEngine.js';
import { ttsService } from '../../services/TTSService.js';
import { beatItems, beatLesson, fillers, labelOf, meaningOf } from '../LevelBeats.js';
import {
  W,
  H,
  LEVER,
  HIT_PLATE,
  HIT_POST,
  HIT_LEVER,
  slotXY,
  trayXY,
} from '../parts/nodejs-l7-linea/layout.js';
import { drawScene } from '../parts/nodejs-l7-linea/draw.js';

const MODE = 'linea';
const KEY_POST = /^[1-6]$/;

/* Stazioni: agiscono in ordine sulla richiesta (template).
   json apre il corpo · auth vuole il token · limit ferma le raffiche
   validate vuole il corpo GIÀ aperto · log non ferma niente */
const ST = {
  json: {
    act(r) {
      r.open = true;
      return null;
    },
  },
  auth: { act: (r) => (r.token ? null : '401') },
  limit: { act: (r) => (r.flood ? '429' : null) },
  validate: {
    act(r) {
      if (!r.body) return null;
      if (!r.open) return '400';
      return r.valid ? null : '400';
    },
  },
  log: { act: () => null },
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

/* Beat: slots morsetti, tray stazioni in riserva (le non richieste diventano
   distrattori), need ordini di lavoro nell'ordine d'azione, waves richieste,
   build s di montaggio, run s di ondata. Tabelle del template. */
const B = (o) => ({
  slots: 3,
  tray: ['json', 'auth', 'log'],
  need: ['auth'],
  waves: [[{}]],
  build: 12,
  run: 26,
  ...o,
});
const R = (o) => ({ token: false, body: false, valid: true, flood: false, ...o });

const CH = [
  {
    t: ['La prima stazione', 'The first station'],
    titles: [
      ['Un morsetto', 'One clamp'],
      ['La riserva', 'The tray'],
      ['Tira la leva', 'Pull the lever'],
      ['Due richieste', 'Two requests'],
      ['Il ritmo', 'The rhythm'],
    ],
    beats: [
      B({
        slots: 2,
        tray: ['auth'],
        need: ['auth'],
        waves: [[R({ token: true }), R({})]],
        build: 14,
        run: 22,
      }),
      B({
        slots: 2,
        tray: ['auth', 'log'],
        need: ['auth'],
        waves: [[R({ token: true }), R({}), R({ token: true })]],
        build: 13,
      }),
      B({
        slots: 3,
        tray: ['auth', 'log'],
        need: ['auth'],
        waves: [[R({ token: true }), R({}), R({ token: true }), R({})]],
        build: 12,
      }),
      B({
        slots: 3,
        tray: ['auth', 'log', 'limit'],
        need: ['auth'],
        waves: [[R({ token: true }), R({}), R({ token: true }), R({}), R({ token: true })]],
        build: 10,
        run: 30,
      }),
      B({
        slots: 3,
        tray: ['auth', 'log'],
        need: ['auth'],
        waves: [[R({ token: true }), R({}), R({ token: true })]],
        build: 12,
      }),
    ],
  },
  {
    t: ['Due in fila', 'Two in a row'],
    titles: [
      ['Il limite', 'The limit'],
      ['Prima il limite', 'Limit first'],
      ['Due filtri', 'Two filters'],
      ['Stretti', 'Tight'],
      ['A occhio', 'At a glance'],
    ],
    beats: [
      B({
        slots: 3,
        tray: ['auth', 'limit'],
        need: ['auth', 'limit'],
        waves: [[R({ token: true }), R({ flood: true, token: true }), R({})]],
        build: 14,
      }),
      B({
        slots: 3,
        tray: ['auth', 'limit', 'log'],
        need: ['auth', 'limit'],
        waves: [[R({ token: true }), R({ flood: true, token: true }), R({}), R({ token: true })]],
        build: 13,
      }),
      B({
        slots: 4,
        tray: ['auth', 'limit', 'log'],
        need: ['auth', 'limit'],
        waves: [
          [
            R({ token: true }),
            R({ flood: true }),
            R({}),
            R({ token: true }),
            R({ flood: true, token: true }),
          ],
        ],
        build: 12,
      }),
      B({
        slots: 4,
        tray: ['auth', 'limit', 'log', 'json'],
        need: ['auth', 'limit'],
        waves: [
          [
            R({ token: true }),
            R({ flood: true }),
            R({}),
            R({ token: true }),
            R({ flood: true, token: true }),
            R({ token: true }),
          ],
        ],
        build: 10,
        run: 32,
      }),
      B({
        slots: 4,
        tray: ['auth', 'limit', 'log'],
        need: ['auth', 'limit'],
        waves: [[R({ token: true }), R({ flood: true }), R({}), R({ token: true })]],
        build: 13,
      }),
    ],
  },
  {
    t: ["L'ordine conta", 'Order counts'],
    titles: [
      ['Il corpo chiuso', 'The closed body'],
      ['Validate da sola', 'validate alone'],
      ['Prima json', 'json first'],
      ['Tre stazioni', 'Three stations'],
      ['Adesso lo sai', 'Now you know'],
    ],
    beats: [
      B({
        slots: 3,
        tray: ['validate', 'json'],
        need: ['json', 'validate'],
        waves: [[R({ body: true, valid: true }), R({ body: true, valid: false })]],
        build: 16,
        run: 24,
      }),
      B({
        slots: 3,
        tray: ['validate', 'json', 'log'],
        need: ['json', 'validate'],
        waves: [
          [
            R({ body: true, valid: true }),
            R({ body: true, valid: false }),
            R({ body: true, valid: true }),
          ],
        ],
        build: 14,
      }),
      B({
        slots: 4,
        tray: ['validate', 'json', 'auth'],
        need: ['json', 'validate'],
        waves: [
          [
            R({ body: true, valid: true, token: true }),
            R({ body: true, valid: false, token: true }),
            R({ body: true, valid: true }),
          ],
        ],
        build: 13,
      }),
      B({
        slots: 4,
        tray: ['validate', 'json', 'auth', 'limit'],
        need: ['json', 'validate', 'auth'],
        waves: [
          [
            R({ body: true, valid: true, token: true }),
            R({ body: true, valid: false, token: true }),
            R({ body: true, valid: true }),
            R({ flood: true, token: true, body: true, valid: true }),
          ],
        ],
        build: 11,
        run: 34,
      }),
      B({
        slots: 4,
        tray: ['validate', 'json', 'auth'],
        need: ['json', 'validate'],
        waves: [
          [
            R({ body: true, valid: true, token: true }),
            R({ body: true, valid: false, token: true }),
            R({ body: true, valid: true, token: true }),
          ],
        ],
        build: 14,
      }),
    ],
  },
  {
    t: ['Chi passa e chi no', 'Who passes and who does not'],
    titles: [
      ['Solo i buoni', 'Only the good'],
      ['Non fermare i buoni', 'Do not block the good'],
      ['Due cattivi', 'Two bad ones'],
      ['Misti', 'Mixed'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({
        slots: 3,
        tray: ['auth', 'log'],
        need: ['auth'],
        waves: [[R({ token: true }), R({ token: true }), R({})]],
        build: 12,
      }),
      B({
        slots: 3,
        tray: ['auth', 'limit', 'log'],
        need: ['auth'],
        waves: [[R({ token: true }), R({ token: true }), R({}), R({ token: true })]],
        build: 12,
      }),
      B({
        slots: 4,
        tray: ['auth', 'limit', 'json'],
        need: ['auth', 'limit'],
        waves: [
          [R({ token: true }), R({ flood: true }), R({}), R({ token: true }), R({ token: true })],
        ],
        build: 11,
      }),
      B({
        slots: 4,
        tray: ['auth', 'limit', 'json', 'validate'],
        need: ['auth', 'limit'],
        waves: [
          [
            R({ token: true }),
            R({ flood: true }),
            R({}),
            R({ token: true, body: true, valid: true }),
            R({ token: true }),
          ],
        ],
        build: 10,
        run: 34,
      }),
      B({
        slots: 4,
        tray: ['auth', 'limit', 'log'],
        need: ['auth', 'limit'],
        waves: [[R({ token: true }), R({ flood: true }), R({ token: true })]],
        build: 12,
      }),
    ],
  },
  {
    t: ['Il corpo va aperto prima', 'The body opens first'],
    titles: [
      ['Corpo e token', 'Body and token'],
      ['Tre in ordine', 'Three in order'],
      ['Il corpo rotto', 'The broken body'],
      ['Quattro stazioni', 'Four stations'],
      ['La catena giusta', 'The right chain'],
    ],
    beats: [
      B({
        slots: 4,
        tray: ['json', 'auth', 'validate'],
        need: ['json', 'validate', 'auth'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ body: true, valid: true }),
            R({ token: true, body: true, valid: false }),
          ],
        ],
        build: 15,
        run: 28,
      }),
      B({
        slots: 4,
        tray: ['json', 'auth', 'validate', 'log'],
        need: ['json', 'validate', 'auth'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ body: true, valid: true }),
            R({ token: true, body: true, valid: false }),
            R({ token: true, body: true, valid: true }),
          ],
        ],
        build: 13,
      }),
      B({
        slots: 5,
        tray: ['json', 'auth', 'validate', 'limit'],
        need: ['json', 'validate', 'auth'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ token: true, body: true, valid: false }),
            R({ flood: true, token: true }),
            R({ body: true, valid: true }),
          ],
        ],
        build: 12,
      }),
      B({
        slots: 5,
        tray: ['json', 'auth', 'validate', 'limit', 'log'],
        need: ['json', 'validate', 'auth', 'limit'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ token: true, body: true, valid: false }),
            R({ flood: true, token: true }),
            R({ body: true, valid: true }),
            R({ token: true, body: true, valid: true }),
          ],
        ],
        build: 10,
        run: 36,
      }),
      B({
        slots: 5,
        tray: ['json', 'auth', 'validate', 'log'],
        need: ['json', 'validate', 'auth'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ token: true, body: true, valid: false }),
            R({ body: true, valid: true }),
          ],
        ],
        build: 13,
      }),
    ],
  },
  {
    t: ['La stazione finale', 'The final station'],
    titles: [
      ['In fondo', 'At the end'],
      ['Chi risponde', 'Who answers'],
      ['Non prima', 'Not before'],
      ['Cinque slot', 'Five slots'],
      ['Padronanza', 'Mastery'],
    ],
    beats: [
      B({
        slots: 4,
        tray: ['auth', 'json', 'log'],
        need: ['auth'],
        waves: [[R({ token: true, body: true, valid: true }), R({})]],
        build: 13,
      }),
      B({
        slots: 5,
        tray: ['auth', 'json', 'validate', 'log'],
        need: ['json', 'validate', 'auth'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({}),
            R({ token: true, body: true, valid: false }),
          ],
        ],
        build: 12,
      }),
      B({
        slots: 5,
        tray: ['auth', 'json', 'validate', 'limit'],
        need: ['json', 'validate', 'auth', 'limit'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ flood: true }),
            R({ token: true, body: true, valid: false }),
          ],
        ],
        build: 11,
      }),
      B({
        slots: 6,
        tray: ['auth', 'json', 'validate', 'limit', 'log'],
        need: ['json', 'validate', 'auth', 'limit'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ flood: true }),
            R({}),
            R({ token: true, body: true, valid: false }),
            R({ token: true, body: true, valid: true }),
          ],
        ],
        build: 9,
        run: 38,
      }),
      B({
        slots: 5,
        tray: ['auth', 'json', 'validate', 'log'],
        need: ['json', 'validate', 'auth'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ token: true, body: true, valid: false }),
            R({ token: true, body: true, valid: true }),
          ],
        ],
        build: 12,
      }),
    ],
  },
  {
    t: ['Turno pieno', 'Full shift'],
    titles: [
      ['Sei richieste', 'Six requests'],
      ['Meno tempo', 'Less time'],
      ['Slot scarsi', 'Scarce slots'],
      ['Il picco', 'The peak'],
      ['Automatico', 'Automatic'],
    ],
    beats: [
      B({
        slots: 5,
        tray: ['auth', 'json', 'validate', 'limit', 'log'],
        need: ['json', 'validate', 'auth', 'limit'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ flood: true }),
            R({}),
            R({ token: true, body: true, valid: false }),
            R({ token: true, body: true, valid: true }),
            R({ token: true }),
          ],
        ],
        build: 11,
        run: 34,
      }),
      B({
        slots: 5,
        tray: ['auth', 'json', 'validate', 'limit', 'log'],
        need: ['json', 'validate', 'auth', 'limit'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ flood: true, token: true }),
            R({}),
            R({ token: true, body: true, valid: false }),
            R({ token: true, body: true, valid: true }),
            R({ token: true }),
          ],
        ],
        build: 9,
        run: 36,
      }),
      B({
        slots: 4,
        tray: ['auth', 'json', 'validate', 'limit', 'log'],
        need: ['json', 'validate', 'auth', 'limit'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ flood: true }),
            R({ token: true, body: true, valid: false }),
            R({ token: true, body: true, valid: true }),
          ],
        ],
        build: 9,
        run: 34,
      }),
      B({
        slots: 5,
        tray: ['auth', 'json', 'validate', 'limit', 'log'],
        need: ['json', 'validate', 'auth', 'limit'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ flood: true }),
            R({}),
            R({ token: true, body: true, valid: false }),
            R({ token: true, body: true, valid: true }),
            R({ flood: true, token: true }),
            R({ token: true }),
          ],
        ],
        build: 8,
        run: 40,
      }),
      B({
        slots: 5,
        tray: ['auth', 'json', 'validate', 'limit', 'log'],
        need: ['json', 'validate', 'auth', 'limit'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ flood: true }),
            R({ token: true, body: true, valid: true }),
            R({ token: true }),
          ],
        ],
        build: 12,
        run: 32,
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
        slots: 5,
        tray: ['auth', 'json', 'validate', 'limit', 'log'],
        need: ['json', 'validate', 'auth', 'limit'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ flood: true }),
            R({}),
            R({ token: true, body: true, valid: false }),
            R({ token: true, body: true, valid: true }),
          ],
        ],
        build: 11,
        run: 34,
      }),
      B({
        slots: 5,
        tray: ['auth', 'json', 'validate', 'limit', 'log'],
        need: ['json', 'validate', 'auth', 'limit'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ flood: true, token: true }),
            R({}),
            R({ token: true, body: true, valid: false }),
            R({ token: true, body: true, valid: true }),
            R({ token: true }),
          ],
        ],
        build: 9,
        run: 36,
      }),
      B({
        slots: 4,
        tray: ['auth', 'json', 'validate', 'limit', 'log'],
        need: ['json', 'validate', 'auth', 'limit'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ flood: true }),
            R({ token: true, body: true, valid: false }),
            R({}),
            R({ token: true, body: true, valid: true }),
          ],
        ],
        build: 8,
        run: 36,
      }),
      B({
        slots: 5,
        tray: ['auth', 'json', 'validate', 'limit', 'log'],
        need: ['json', 'validate', 'auth', 'limit'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ flood: true }),
            R({}),
            R({ token: true, body: true, valid: false }),
            R({ flood: true, token: true }),
            R({ token: true, body: true, valid: true }),
            R({ token: true }),
          ],
        ],
        build: 7,
        run: 40,
      }),
      B({
        slots: 5,
        tray: ['auth', 'json', 'validate', 'limit', 'log'],
        need: ['json', 'validate', 'auth', 'limit'],
        waves: [
          [
            R({ token: true, body: true, valid: true }),
            R({ flood: true }),
            R({ token: true, body: true, valid: true }),
            R({ token: true }),
          ],
        ],
        build: 12,
        run: 32,
      }),
    ],
  },
];

const TX = {
  it: {
    wrong: [
      'Quella targhetta non è quella dell’ordine.',
      'L’ordine di lavoro diceva «{it}», ma sulla targhetta era inciso «{pick}».',
      'Sull’ordine c’è il significato, sulla targhetta il termine: «{it}» in inglese è «{word}».',
    ],
    leak: [
      'Una richiesta senza titoli è arrivata in fondo.',
      'Nessuna stazione l’ha fermata lungo la linea.',
      'Ogni tipo di richiesta ha la sua stazione: se manca, passa. «{it}» è la stazione «{word}».',
    ],
    block: [
      'Hai fermato una richiesta in regola.',
      'La stazione l’ha respinta perché il corpo non era ancora aperto.',
      'Chi apre il corpo va prima di chi lo controlla: «{word}» ({it}) sta più avanti sulla linea.',
    ],
    hint: 'targhetta dalla riserva → morsetto sulla linea → leva · tastiera: ← → targhetta, ↑ ↓ morsetto, invio monta, spazio leva, 1-6 morsetto',
    eyebrow: 'Turno passato',
  },
  en: {
    wrong: [
      'That plate is not the one the order asks for.',
      'The work order said "{it}", but the plate was engraved "{pick}".',
      'The order carries the meaning, the plate carries the term: "{it}" in English is "{word}".',
    ],
    leak: [
      'A request with no credentials reached the end.',
      'No station stopped it along the line.',
      'Every kind of request has its station: if it is missing, it passes. "{it}" is the "{word}" station.',
    ],
    block: [
      'You blocked a legitimate request.',
      'The station rejected it because the body was not open yet.',
      'Whoever opens the body goes before whoever checks it: "{word}" ({it}) belongs earlier on the line.',
    ],
    hint: 'plate from the tray → clamp on the line → lever · keyboard: ← → plate, ↑ ↓ clamp, enter mounts, space lever, 1-6 clamp',
    eyebrow: 'Shift passed',
  },
};

// ─── the work orders ─────────────────────────────

/** The first order still without its plate: the one the next plate answers. */
function openTag(host) {
  return host.tags.find((t) => !t.done) || null;
}

function firstEmptySlot(host) {
  return host.slots.indexOf(null);
}

/* ricerca/35 §35.3.1: a term mounted is a term heard. */
function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

function openCoach(host, kind, pick, wanted) {
  host.coachKind = kind;
  host.setState({
    coach: { kind, pick: pick || '', word: labelOf(wanted), it: meaningOf(wanted, 'it') },
  });
}

// ─── build: pick a plate, clamp it on a post ─────

function returnPlate(host, p) {
  p.used = false;
  p.slot = -1;
  const q = trayXY(p.i);
  p.x = q.x;
  p.y = q.y;
}

/**
 * The clamp is the graded response: the term on the plate the learner chose
 * against the term the open work order asks for, through the SDK and never a
 * local `===` (§46.1, §46.2). Right, the plate is mounted and the order is
 * done; wrong, the clamp does not close and the plate bounces back to the
 * tray — the ladder of ricerca/00 passo 6 lives on the order.
 */
function mount(host, i) {
  const p = host.held;
  if (!p) return false;
  if (host.slots[i]) {
    // Deviation 7: an occupied clamp refuses instead of losing the old plate.
    engine.snd(host, 'fall');
    host.shake = 0.3;
    return false;
  }
  const tag = openTag(host);
  if (!tag) {
    // Nothing asks any more: the plate has no order to answer.
    engine.snd(host, 'fall');
    p.bounce = 1;
    host.held = null;
    return false;
  }
  const verdict = tag.item.attempt(labelOf(p.item), {
    expected: labelOf(tag.item),
    mode: MODE,
    hintsUsed: tag.aided ? 1 : 0,
    silent: true,
  });
  host.session.mark();
  const q = slotXY(i, host.cfg.slots);
  if (verdict.correct) {
    host.slots[i] = p;
    p.used = true;
    p.slot = i;
    p.glow = 0;
    p.drop = 1;
    tag.done = true;
    tag.slot = i;
    tag.plate = p;
    host.held = null;
    engine.snd(host, 'pop', { hz: 300, v: 0.14 });
    engine.burst(host, host.parts, q.x, q.y - 20, 8, '#F3E9D2', { up: 60 });
    say(host, labelOf(p.item));
    return true;
  }
  // Wrong: the clamp stays open, the plate bounces back — a thud, never red.
  tag.wrong++;
  tag.shake = 1;
  p.bounce = 1;
  host.held = null;
  host.hitstop = 50;
  engine.snd(host, 'thud', { v: 0.2 });
  engine.burst(host, host.parts, q.x, q.y + 20, 5, '#B87B4B', { up: 30, v0: 30, v1: 90 });
  if (tag.wrong >= 2) {
    // Second error on one order: the right plate lights up. From here the
    // order is aided and the SDK is told so (hintsUsed 1 above).
    tag.aided = true;
    const ok = host.tray.find((t) => !t.used && t.item === tag.item);
    if (ok) ok.glow = 1;
  }
  if (tag.wrong >= 3) {
    openCoach(host, 'wrong', labelOf(p.item), tag.item);
    tag.wrong = 0;
  }
  return false;
}

function unmount(host, i) {
  const p = host.slots[i];
  if (!p) return;
  host.slots[i] = null;
  returnPlate(host, p);
  const tag = host.tags.find((t) => t.plate === p);
  if (tag) {
    tag.done = false;
    tag.slot = -1;
    tag.plate = null;
  }
  engine.snd(host, 'fall');
}

function post(host, i) {
  if (i < 0 || i >= host.cfg.slots) return;
  if (host.held) mount(host, i);
  else if (host.slots[i]) unmount(host, i);
  else engine.snd(host, 'click', { hz: 500, v: 0.1 });
}

function hold(host, p) {
  if (!p || p.used) return;
  host.held = host.held === p ? null : p;
  engine.snd(host, 'click', { hz: 1300, v: 0.14 });
}

/** The lever: the line starts if at least one plate is clamped (template). */
function start(host, auto) {
  if (host.slots.every((s) => !s)) {
    engine.snd(host, 'fall');
    host.shake = 0.4;
    // Deviation 6: a timed-out empty line gets a grace instead of a thud a frame.
    if (auto) host.buildT = 4;
    return false;
  }
  engine.snd(host, 'pop', { hz: 180, v: 0.2 });
  host.phase = 'run';
  host.leverT = 1;
  host.spawnI = 0;
  host.spawnT = 0.8;
  host.reqs = [];
  host.served = 0;
  host.held = null;
  return true;
}

// ─── run: the requests cross the line ────────────

function good(host) {
  host.served++;
  host.flash = 1;
  host.streak = { kind: null, n: 0 };
  engine.snd(host, 'tone', { from: 560, to: 880, v: 0.14 });
  host.setState({ step: host.served });
}

/** Back to the build phase with the same line: the shift is not over yet. */
function rebuild(host) {
  host.phase = 'build';
  host.buildT = host.cfg.build;
  host.reqs = [];
  host.spawnI = 0;
  host.leaks = 0;
  host.blocks = 0;
  host.served = 0;
  host.setState({ step: 0, left: 0 });
}

/**
 * A leak or a block is not a graded response — the learner mounted nothing
 * wrong on the vocabulary — so nothing is reported. The template's streak
 * ladder: the second in a row pulses the empty clamp, the third opens the
 * coach; the third of a kind in the shift empties the line.
 */
function bad(host, kind) {
  host.shake = 0.7;
  engine.snd(host, 'whir');
  const s = host.streak;
  if (s.kind === kind) s.n++;
  else {
    s.kind = kind;
    s.n = 1;
  }
  if (s.n === 2) {
    host.pulse = 0.8;
    host.pulseS = firstEmptySlot(host);
  }
  if (s.n >= 3) {
    const open = openTag(host);
    const json = host.tags.find((t) => t.role === 'json');
    const wanted =
      kind === 'block' ? (json || open || host.tags[0]).item : (open || host.tags[0]).item;
    openCoach(host, kind, '', wanted);
    host.streak = { kind: null, n: 0 };
  }
  if (kind === 'leak') host.leaks++;
  else host.blocks++;
  host.setState({ left: Math.max(host.leaks, host.blocks) });
  if (host.leaks >= 3 || host.blocks >= 3) {
    const coachKind = host.coachKind;
    reset(host, host.state.beat);
    host.coachKind = coachKind;
    host.setState({ step: 0, left: 0 });
    return true;
  }
  return false;
}

function stopAt(host, r, i, code) {
  const q = slotXY(i, host.cfg.slots);
  r.stopped = code;
  r.hold = 0.5;
  engine.snd(host, 'click', { hz: 700, v: 0.2 });
  engine.burst(host, host.parts, q.x, q.y, 7, '#F3E9D2');
  const role = host.slots[i].role;
  const legit =
    !(!r.token && role === 'auth') && !(r.flood && role === 'limit') && !(r.body && !r.valid);
  if (legit) return bad(host, 'block');
  good(host);
  return false;
}

function leak(host, r) {
  r.dead = true;
  const shouldStop = !r.token || r.flood || (r.body && !r.valid);
  if (shouldStop) {
    engine.burst(host, host.parts, W - 10, r.y + 40, 10, '#3FA7D6', { up: 90 });
    return bad(host, 'leak');
  }
  engine.burst(host, host.parts, W - 10, r.y + 20, 6, '#F3E9D2', { up: 60 });
  good(host);
  return false;
}

function endOfWave(host) {
  if (host.leaks >= 3 || host.blocks >= 3) return;
  // Deviation 4: the shift passes only with every order mounted (§46.5).
  if (host.served > 0 && host.tags.every((t) => t.done)) {
    for (const t of host.tags) t.item.clear();
    host.finished = true;
    persist(host);
    engine.snd(host, 'chime', { notes: [440, 587, 740] });
    host.setState({ done: true });
    return;
  }
  engine.snd(host, 'fall');
  host.shake = 0.5;
  for (const t of host.tags) if (!t.done) t.shake = 1;
  rebuild(host);
}

// ─── lifecycle ───────────────────────────────────

function init(host) {
  host.parts = [];
  host.tags = [];
  host.tray = [];
  host.slots = [];
  host.reqs = [];
  host.terms = [];
  host.item = null;
  host.lesson = null;
  host.chapter = 0;
  host.held = null;
  host.phase = 'build';
  host.streak = { kind: null, n: 0 };
  host.t = 0;
  host.served = 0;
  host.needed = 0;
  host.leaks = 0;
  host.blocks = 0;
  host.sel = -1;
  host.kpost = 0;
  host.kbUsed = false;
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
  host.needed = cfg.waves[0].length;
  const ci = installedChapter(host);
  host.chapter = ci;

  // The spine: this beat's term, its lesson, the work orders and the plates.
  // One order per required station, in the order the line must act; the
  // beat's term takes the first, real neighbours from the same lesson the
  // rest; the tray's extra stations become distractor plates (deviation 1).
  host.terms = beatItems(host.session, ci, beat);
  host.item = host.terms[0] || null;
  host.lesson = beatLesson(host.session, ci, beat);
  const roles = cfg.need.slice();
  while (roles.length < host.terms.length) roles.push('log');
  const nFill = Math.max(0, roles.length - host.terms.length);
  const nExtra = Math.max(1, cfg.tray.length - cfg.need.length);
  const pool = host.item ? fillers(host.session, host.item, nFill + nExtra) : [];
  const targets = host.terms.concat(pool.slice(0, nFill));
  const extras = pool.slice(nFill);
  host.tags = roles.map((role, i) => ({
    role,
    item: targets[i] || host.item,
    done: false,
    slot: -1,
    plate: null,
    wrong: 0,
    aided: false,
    shake: 0,
  }));
  const plates = host.tags
    .map((t) => ({ item: t.item, role: t.role }))
    .concat(extras.map((it) => ({ item: it, role: null })));
  host.tray = shuffle(plates).map((p, i) => ({
    ...p,
    i,
    used: false,
    slot: -1,
    glow: 0,
    bounce: 0,
    drop: 0,
    x: trayXY(i).x,
    y: trayXY(i).y,
  }));
  host.slots = new Array(cfg.slots).fill(null);

  host.held = null;
  host.reqs = [];
  host.parts = [];
  host.phase = 'build';
  host.buildT = cfg.build;
  host.leverT = 0;
  host.spawnI = 0;
  host.spawnT = 0.8;
  host.served = 0;
  host.leaks = 0;
  host.blocks = 0;
  host.streak = { kind: null, n: 0 };
  host.shake = 0;
  host.flash = 0;
  host.pulse = 0;
  host.pulseS = -1;
  host.t = 0;
  host.sel = -1;
  host.kpost = 0;
  host.kbUsed = false;
  host.finished = false;
  host.coachKind = null;
  // Reduced motion: the belt, the crates and the bounces run at 0.7× (§15.4).
  host.motion = host.reduceMotion ? 0.7 : 1;
  // The board is up: every order's meaning is visible (mastery 0 → 1).
  for (const t of host.tags) t.item.introduce();
  if (host.state.left) host.setState({ left: 0 });
  host.session.mode = MODE;
  host.session.mark();
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
  if (host.leverT > 0) host.leverT -= dt * 2 * m;
  for (const p of host.tray) {
    if (p.bounce > 0) p.bounce -= dt * 2.2 * m;
    if (p.drop > 0) p.drop -= dt * 3 * m;
    if (p.glow > 0 && p.used) p.glow = 0;
  }
  for (const t of host.tags) if (t.shake > 0) t.shake -= dt * 2.5 * m;

  if (host.phase === 'build') {
    host.buildT -= dt;
    if (host.buildT <= 0) start(host, true);
    return;
  }
  if (host.finished) return;

  const wave = c.waves[0];
  host.spawnT -= dt;
  if (host.spawnT <= 0 && host.spawnI < wave.length) {
    const r = { ...wave[host.spawnI] };
    r.x = -30;
    r.y = 0;
    r.open = false;
    r.dead = false;
    r.at = -1;
    r.stopped = null;
    r.hold = 0;
    host.reqs.push(r);
    host.spawnI++;
    host.spawnT = c.run / wave.length;
  }
  const speed = ((W + 60) / (c.run * 0.62)) * m;
  for (const r of host.reqs) {
    if (r.dead) continue;
    if (r.hold > 0) {
      // Deviation 5: the stopped crate holds half a second showing its code.
      r.hold -= dt;
      if (r.hold <= 0) r.dead = true;
      continue;
    }
    r.x += speed * dt;
    let over = false;
    for (let i = 0; i < c.slots; i++) {
      const q = slotXY(i, c.slots);
      if (r.at >= i || r.x < q.x) continue;
      r.at = i;
      const p = host.slots[i];
      if (!p) continue;
      const code = ST[p.role].act(r);
      if (code) {
        over = stopAt(host, r, i, code);
        break;
      }
    }
    if (over) return;
    if (r.stopped) continue;
    if (r.x > W + 20 && leak(host, r)) return;
  }
  host.reqs = host.reqs.filter((r) => !r.dead);
  host.parts = engine.parts(host.parts, dt, 420);
  if (host.spawnI >= wave.length && !host.reqs.length) endOfWave(host);
}

// ─── input: tap the plate, the post, the lever ───

function plateAt(host, p) {
  for (const t of host.tray) {
    if (t.used) continue;
    const q = trayXY(t.i);
    if (Math.hypot(p.x - q.x, p.y - q.y) < HIT_PLATE) return t;
  }
  return null;
}

function postAt(host, p) {
  for (let i = 0; i < host.cfg.slots; i++) {
    const q = slotXY(i, host.cfg.slots);
    if (Math.hypot(p.x - q.x, p.y - q.y) < HIT_POST) return i;
  }
  return -1;
}

function tap(host, p) {
  if (host.finished) return;
  if (host.phase !== 'build') {
    engine.snd(host, 'fall');
    return;
  }
  if (Math.hypot(p.x - LEVER.x, p.y - LEVER.y) < HIT_LEVER) {
    start(host, false);
    return;
  }
  const t = plateAt(host, p);
  if (t) {
    hold(host, t);
    return;
  }
  const i = postAt(host, p);
  if (i >= 0) {
    post(host, i);
    return;
  }
  engine.snd(host, 'fall');
}

/**
 * The same game with no pointer (deviation 8): ← → pick a plate from the
 * tray, ↑ ↓ choose the clamp, Enter mounts (or unmounts an empty-handed
 * clamp), space pulls the lever, 1-6 tap a clamp directly.
 */
function key(host, e) {
  if (host.finished || host.phase !== 'build') return;
  host.kbUsed = true;
  const free = host.tray.filter((t) => !t.used);
  const at = host.held ? free.indexOf(host.held) : -1;
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();
    if (!free.length) return;
    const step = e.key === 'ArrowLeft' ? -1 : 1;
    const i = at < 0 ? (step < 0 ? free.length - 1 : 0) : (at + step + free.length) % free.length;
    host.held = free[i];
    engine.snd(host, 'click', { hz: 1300, v: 0.14 });
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault();
    const n = host.cfg.slots;
    host.kpost = (host.kpost + (e.key === 'ArrowUp' ? -1 : 1) + n) % n;
    engine.snd(host, 'click', { hz: 900, v: 0.1 });
  } else if (e.key === 'Enter') {
    e.preventDefault();
    post(host, host.kpost);
  } else if (e.key === ' ') {
    e.preventDefault();
    start(host, false);
  } else if (KEY_POST.test(e.key)) {
    const i = parseInt(e.key, 10) - 1;
    if (i < host.cfg.slots) {
      host.kpost = i;
      post(host, i);
    }
  }
}

function draw(host, x) {
  drawScene(host, x);
}

// ─── chrome copy (rendered by GameHost, written here) ─────

function coachText(host, coach, lang) {
  const L = TX[lang] || TX.it;
  const lines = L[coach.kind] || L.wrong;
  const sub = (t) =>
    t
      .replace('{pick}', coach.pick || '')
      .replace('{word}', coach.word || '')
      .replace('{it}', coach.it || '');
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
  host.streak = { kind: null, n: 0 };
  host.coachKind = null;
}

export default {
  meta: {
    id: 'nodejs-l7-linea',
    surface: 'nodejs',
    level: 6,
    band: 2,
    register: 'R15',
    title: 'La linea di montaggio',
    titleEn: 'The assembly line',
    levelLabel: 'Node.js · L7 Express Fondamenti / Node.js · L7 Express Fundamentals',
    font: '700 16px "Baloo 2"',
  },
  W,
  H,
  CH,
  drone: { freq: 44, type: 'sawtooth', volume: 0.016, lowpass: 120 },
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
