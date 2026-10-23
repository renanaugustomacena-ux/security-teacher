# How to Add New Level Games (Knowledge AIO)

Knowledge AIO uses a registry-based 2D game system governed by **DOCTRINE §46** (`Level Games - v2.2.0`). Level games replace both the teaching and testing of a level with an interactive experience (Canvas or DOM-based), completely replacing text-only question generators.

Games coexist seamlessly with legacy paths: if a level has a registered game, it is automatically mounted by `TopicManager`, the standalone Lab mode (`TopicPracticeLabMode`), and the LessonV2 `applied` beat. If not, the application falls back cleanly to the legacy lessons or `LabEngine`.

---

## 1. Architecture & Files Involved

| Component                 | File Path                                           | Purpose                                                                                                                              |
| ------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Game Registry**         | `js/games/registry.js`                              | Sparse map of `"<surface>:<level>"` to a dynamic import thunk.                                                                       |
| **Game Host**             | `js/games/GameHost.js`                              | Chrome manager: owns the frame, pause menu, audio/lang toggles, coach error panel, accessibility live region, and completion ledger. |
| **Kaio Engine**           | `js/games/KaioEngine.js`                            | Runtime loop: canvas auto-scaling, pointer/keyboard dispatch, chapter/beat state, and procedural audio.                              |
| **Vocabulary Spine**      | `js/games/LevelBeats.js`                            | Maps the 40 items of a level across 8 chapters × 5 beats = 40 beats (DOCTRINE §46.5).                                                |
| **Ledger & Telemetry**    | `js/games/LevelSession.js`, `js/games/LevelItem.js` | Session state and item grading (`attempt()` and `clear()`).                                                                          |
| **Level Implementations** | `js/games/levels/*.js`                              | The game definitions.                                                                                                                |
| **Modular Parts**         | `js/games/parts/<game>/*.js`                        | Drawing, layout, chapter data, or game logic helper submodules.                                                                      |
| **Offline Assets**        | `sw.js`                                             | Service Worker cache list (`STATIC_ASSETS`). Every JS file under `js/**` must be listed here (DOCTRINE §17.8, §46.3).                |
| **Android Prep**          | `scripts/cap-prepare.mjs`                           | Reads `sw.js` to bundle assets into the Capacitor Android APK.                                                                       |
| **Conformance Suite**     | `tests/helpers/game-conformance.js`                 | Headless bot test harness required for every game before merge (DOCTRINE §46.6).                                                     |

---

## 2. DOCTRINE §46 Mandatory Requirements

Every game must comply with the strict doctrine gates checked in CI:

1. **§46.1 (Grade only through SDK):** Every graded user action **must** be reported via `LevelItem#attempt()`. Games **must never** call `analyticsService`, `masteryService`, `smartScoreService`, `currencyService`, or `progressManager.addXP()` directly.
2. **§46.2 (Honest Error Telemetry):** `attempt(userAnswer, { expected })` must receive the learner's actual input in `userAnswer` and the target string in `expected`. They must not be identical when the answer was wrong.
3. **§46.3 (Registry & Static Assets Agreement):** `js/games/registry.js` and `sw.js#STATIC_ASSETS` must match exactly. A registered game missing from `sw.js` breaks offline mode and Android; an un-registered level file is dead weight. Enforced by `scripts/doctrine-check.mjs`.
4. **§46.4 (Procedural Assets Only):** Total `js/games/**` size must stay under 24 MB. **Games MUST NOT ship external sprite sheets, PNG/JPG assets, or MP3/WAV audio files** (§14.3, §6.1). All visuals must be rendered procedurally on Canvas or inline DOM; audio must use procedural synthesis via Web Audio / `KaioEngine.audio`.
5. **§46.5 (Ledger Completion Invariant):** `session.finish()` will reject level completion if any item in the level is left unattempted or Uncleared. To complete a level, each item's goal must be met and marked with `item.clear()`.
6. **§46.6 (Conformance Harness):** Every game must pass `assertShape(game)` and headless bot play in `tests/game-<name>.test.js`.
7. **§46.7 (Canvas vs Frame Boundary):** The game owns everything inside the canvas (or DOM play area). GameHost owns the outer chrome. All user-visible strings must be bilingual (`['Italiano', 'English']`).

---

## 3. Game Contracts (Canvas vs DOM)

Games export a default object matching one of two contracts:

### A. Standard Canvas Game (Default)

Used for 2D arcade, time management, physics, and canvas-based games:

```javascript
import { buildBeats } from '../LevelBeats.js';

export default {
  W: 420, // Logical canvas width
  H: 910, // Logical canvas height
  CH: [
    // 8 chapters; each has { t: ['Titolo IT', 'Title EN'], beats: [...], titles: [...] }
  ],
  meta: {
    id: 'nodejs-l1-chiosco',
    surface: 'nodejs', // Topic ID or 'learn'
    level: 0, // 0-indexed level number
    title: 'Il chiosco / The kiosk',
    titleEn: 'The kiosk',
    levelLabel: 'Node.js L1',
    register: 'R10', // Visual register identifier
    font: '16px "JetBrains Mono", monospace', // Optional webfont
  },

  // Required lifecycle methods
  init(host) {}, // Setup initial game state
  reset(host, beat) {}, // Reset/prepare game state for a specific beat
  update(host, dt) {}, // Frame update (delta time in seconds)
  draw(host, ctx) {}, // Render to 2D canvas context

  // Optional input handlers (called by KaioEngine)
  tap(host, { x, y }) {},
  down(host, { x, y }, event) {},
  drag(host, from, to) {},
  up(host, { x, y }) {},
  swipe(host, direction) {}, // 'up' | 'down' | 'left' | 'right'
  key(host, event) {},

  // Optional presentation hooks
  coachText(host, coachData, lang) {
    // 3 lines for the coach error panel: what happened, effect, rule
    return { what: '...', effect: '...', rule: '...', hint: '...' };
  },
  doneView(host, lang) {
    return { eyebrow: '...', title: '...', subtitle: '...' };
  },
  remeasure(host) {}, // Called when document.fonts finishes loading
  destroy(host) {}, // Teardown timers or external listeners
};
```

### B. DOM Game (`kind: 'dom'`)

Used for terminal simulations, card sorters, or text-heavy interfaces:

```javascript
export default {
  kind: 'dom',
  CH: [/* 8 chapters */],
  meta: {
    id: 'cyber-l1-casa',
    surface: 'cybersecurity',
    level: 0,
    title: 'La casa / The house',
    titleEn: 'The house',
    levelLabel: 'Cybersecurity L1',
    register: 'R14',
  },

  init(host) {},
  reset(host, beat) {},
  render(host) {
    // Updates host.root HTML whenever host.setState() is called
    host.root.innerHTML = `<div class="game-content">...</div>`;
  },
  destroy(host) {},
};
```

---

## 4. Pedagogy, Spine, and Scoring Workflow

### Step 1: Getting Vocabulary for the Current Beat

Do not invent words or hardcode lists. Use [`LevelBeats.js`](file:///c:/Users/Renan%20Macena/Desktop/WORK/security-teacher/js/games/LevelBeats.js):

```javascript
import { beatItem, distractors, meaningOf, labelOf } from '../LevelBeats.js';

// Inside your reset(host, beat) or game logic:
const currentItem = beatItem(host.session, host.state.chapter, beat);
const targetWord = labelOf(currentItem); // e.g. "Event Loop"
const promptText = meaningOf(currentItem, host.state.lang); // e.g. "Gestisce l'asincronia"

// Get 2 real confusable terms from the same lesson to serve as distractors:
const wrongChoices = distractors(host.session, currentItem, 2);
```

### Step 2: Scoring Responses & Clearing Items

When the player selects or types an answer:

```javascript
// 1. Mark clock at prompt display:
host.session.mark();

// 2. Report attempt to SDK:
const result = currentItem.attempt(playerAnswer, {
  expected: currentItem.english,
  mode: 'kiosk', // Identifier of your game mode
});

if (result.correct) {
  // 3. Mark the item cleared when its pedagogical goal is completed:
  currentItem.clear();

  // Advance beat when all targets of the beat are done:
  import('../KaioEngine.js').then((engine) => engine.next(host));
} else {
  // Trigger error feedback / sound / coach panel
  host.setState({
    coach: { kind: 'wrong_choice', given: playerAnswer, item: currentItem },
  });
}
```

> [!IMPORTANT]
> Calling `item.clear()` is mandatory. If all items in `host.session.items` are not marked `cleared`, `host.session.complete()` will refuse to award level completion to the user!

---

## 5. Step-by-Step Implementation Guide

### 1. Identify Surface and Level

- Check `js/topics/registry.js` for valid surface topic IDs (`cybersecurity`, `nodejs`, `python`, `docker-k8s`, `linux`, `networking`, `git-vcs`, `databases`, `cloud-computing`, `system-monitoring`, `software-dev`, `ethical-hacking`, `devsecops`, `c-programming`, `cpp`, `rust`, `ai-engineering`) or `'learn'` for bilingual lessons.
- Level is 0-indexed (`0` = Level 1).

### 2. Create the Game Module

- Create `js/games/levels/<surface>-l<level>-<name>.js`.
- If breaking into parts, place submodules under `js/games/parts/<surface>-l<level>-<name>/`.
- Use existing games as reference:
  - Canvas arcade: `js/games/levels/nodejs-l1-chiosco.js`
  - DOM/terminal: `js/games/levels/cyber-l1-casa.js`

### 3. Register the Game

Edit `js/games/registry.js` and add your entry to the `GAMES` object:

```javascript
const GAMES = {
  // ...
  'nodejs:1': () => import('./levels/nodejs-l2-moduli.js'),
};
```

### 4. Add to Service Worker STATIC_ASSETS

Edit `sw.js` and add the level file and all parts to `STATIC_ASSETS`:

```javascript
const STATIC_ASSETS = [
  // ...
  './js/games/levels/nodejs-l2-moduli.js',
  './js/games/parts/nodejs-l2-moduli/discesa.js',
  './js/games/parts/nodejs-l2-moduli/magazzino.js',
];
```

### 5. Write the Conformance Test

Create `tests/game-<surface>-l<level>-<name>.test.js`:

```javascript
import { describe, it, expect } from 'vitest';
import game from '../js/games/levels/nodejs-l2-moduli.js';
import { assertShape } from './helpers/game-conformance.js';

describe('Node.js L2 - Game Conformance (DOCTRINE §46)', () => {
  it('matches required game shape and metadata', () => {
    assertShape(game, expect);
  });
});
```

### 6. Verify Locally

Run local verification commands:

```bash
# 1. Lint and code formatting
npm run lint

# 2. Conformance unit tests
npm test

# 3. Static assets and doctrine CI gates
npm run doctrine:check
```

### 7. Run and Play

Start the local server:

```bash
docker compose up
# or
python -m http.server 8080
```

Navigate to your topic and level. When you launch the level, your new 2D game will mount automatically in place of the old exercise view!
