# Level-Game SDK — Design

**Date:** 2026-08-13
**Status:** Approved design, not yet planned or implemented
**Scope:** The contract that lets bespoke per-level minigames plug into the
existing learning engine.

---

## 1. Problem

The app teaches through a four-stage lesson engine (introduction → context group
→ quick check → summary) followed by text-entry and multiple-choice exercises.
The maintainer's goal is to replace that, per level, with a bespoke minigame —
360 of them, one for each level across the 17 topics (4 topics × 12 levels +
13 topics × 24 levels).

The risk this design exists to eliminate: Doctrine §23–§42 (FSRS spaced
repetition, per-item analytics, the 7-stage mastery model, adaptive difficulty,
error analysis, leech detection, progressive hints, quests, virtual currency,
SmartScore) are all fed by exercise responses emitted from a **single call
site** — `js/topics/TopicPracticeResultHandler.js`, whose `handleResult()` fans
one answer out to nine services. If 360 bespoke games each improvise their own
reporting, that entire adaptive-learning layer degrades silently: the games
still look right, but the teaching stops working and nothing fails loudly.

The SDK's job is therefore not to render anything. It is to make **correct
telemetry the path of least resistance** for a game author.

### 1.1 Live defect this design fixes

`TopicPracticeResultHandler.js` currently records:

```js
userAnswer: expectedAnswer || '',
expectedAnswer: expectedAnswer || '',
```

Both fields receive the *correct* answer; the learner's actual answer is never
captured. `AnalyticsService._trackError(item, userAnswer)` therefore records the
right answer as if it were a wrong one. Consequences: §27.1 (top 3 wrong answers
per item), §27.2 (confusion pairs), and the distractor-plausibility half of
§26.3 have been running on meaningless data. The SDK takes ownership of this
call and passes the real answer.

---

## 2. Decisions already settled

Settled with the maintainer before this design was written:

| Question | Decision |
| --- | --- |
| Stack | Vanilla ES6 modules + the already-vendored Three.js. No bundler, no transpiler, no framework, no backend. No doctrine amendment required. |
| Migration | Games and legacy exercises **coexist**; migrate level by level. |
| Teaching | The game replaces **both** teaching and testing for its level. |
| Other surfaces | SRS review, boss challenges, Velocità, pronunciation and the placement test **stay generic** shared modes. Games are level-only. |
| SDK shape | Ledger + game-owned flow (option C of three considered). |
| Aesthetics | Deliberately out of scope. Decided per 6-level band during game authoring. |

**Band** (used throughout): a run of 6 consecutive levels within a topic that
share a visual and mechanical identity — levels 1–6, 7–12, 13–18, 19–24. A
12-level topic has two bands, a 24-level topic four. Bands originate as an
aesthetic device but are load-bearing here for a second reason: they are the
natural code-sharing seam (§6).

### 2.1 Non-goals

- Any visual or aesthetic constraint on games. The SDK must impose none.
- Generic cross-level games. A session is always bound to one topic and level.
- Replacing SRS review, boss, speed, pronunciation or placement flows.
- Server-side anything. The app remains local-first and backendless (§20.1).

---

## 3. Architecture

```
js/games/
  GameHost.js       mounts a game, owns its root element and lifecycle
  LevelSession.js   the item ledger, grading, telemetry fan-out
  registry.js       sparse map: "topicId:level" -> () => import(...)
  runtime/          shared helpers games may use (input, loop, a11y)
  levels/
    nodejs-00.js ... nodejs-23.js, cybersecurity-00.js, ...
```

**Coexistence works by lookup.** `registry.js` maps `"nodejs:0"` to a
dynamic-import thunk. When a level opens, `TopicManager` consults the registry:
a hit loads the game through `GameHost`; a miss falls through to the existing
lesson engine and practice exercises, unmodified. The first game ships the day
it is written; no flag day.

**Loading follows the existing pattern.** Games are lazy-loaded via dynamic
`import()` keyed by topic and level, exactly as topic data is today (§1.6).
Nothing game-related enters the initial bundle, so the 500 KB budget (§13.1) is
unaffected regardless of how many games exist.

**Registering a game is one new file plus two lines**: the module itself, one
`registry.js` entry, and one `sw.js#STATIC_ASSETS` entry. The `STATIC_ASSETS`
entry is
required twice over — the §17.8 CI gate demands every `js/**/*.js` be listed,
and `scripts/cap-prepare.mjs` reads that same list to build the APK. A file
absent from `STATIC_ASSETS` does not exist on Android.

---

## 4. The contract

### 4.1 Session and item handles

```js
const session = await createLevelSession({ topicId: 'nodejs', level: 0 });

session.items          // ~40 item handles, in lesson order
session.lessons        // the 4 lesson groups, for games that pace by lesson
session.queue()        // adaptive-ordered suggestion (§26.1 ZPD), optional
session.progress()     // { introduced, attempted, cleared, total, accuracy }
session.finish()       // pass/fail + batch mastery update + summary
```

Item handles expose content read-only and carry their own state:

```js
item.key               // "nodejs:0:foundations:Node.js"
item.english, .italian, .pronunciation, .phonetic, .example, .code, .note, .task
item.context, .difficulty, .lesson
item.state             // 'unseen' -> 'introduced' -> 'attempted' -> 'cleared'

item.introduce()                    // idempotent; drives mastery stage 0 -> 1
item.hints()                        // progressive hints (§29)
item.attempt(userAnswer, opts)      // -> verdict
```

Games never touch raw topic data. `createLevelSession` loads the topic module,
flattens the level's 4 lessons into its ~40 items, and builds the ledger.

### 4.2 `attempt()` is the whole design

```js
const verdict = item.attempt(typed, { mode: 'recall', hintsUsed: 1 });
// -> { correct, partial, expected, distance, xp, coins, streak }
```

`opts` fields: `mode` is the exercise mode string recorded as `exerciseMode` in
analytics and used to pick hint style (§29) and per-mode accuracy (§27.3);
`hintsUsed` (0–3) applies the §29.2 XP penalty; `silent: true` suppresses the
SDK's default audio/haptic cue. All are optional.

As a side effect it performs the nine-service fan-out that `handleResult()`
performs today: `analyticsService.recordResponse`, `smartScoreService`,
XP via `progressManager`, `currencyService`, `masteryService`, `questService`,
`sfxService`, haptics, and the practice HUD.

Games use it rather than comparing strings because it does work they would
otherwise have to reimplement:

- accent-tolerant matching via `normalize` / `normalizeWithAccents`
  (Italian keyboards typing English answers)
- near-miss detection via `levenshtein` / `nearMiss` for partial credit,
  preserving today's `handlePartialResult` behaviour
- the XP curve with time thresholds and streak bonuses (`calculateXP`)
- the §29.2 hint penalty (hint 1 → 80%, hint 2 → 50%, hint 3 → 20%)
- streak bookkeeping

A game that writes its own `===` loses all of the above **and** still has to
report. Correct telemetry becomes the lazy path rather than a discipline
problem. This is the mechanism by which the design survives 360 authors.

### 4.3 The ledger invariant

`session.finish()` returns `{ passed, coverage, missed: [...] }` and refuses to
award level completion while any item remains `unseen` or unattempted. In dev
builds an incomplete finish warns loudly. This is what prevents a beautiful game
that teaches nothing from passing as a level.

### 4.4 Game module shape

```js
export default {
  meta: { id, band, minWidth },
  async init(ctx),   // ctx = { root, session, platform, input, signal }
  start(), pause(), resume(), resize(w, h), destroy()
}
```

`GameHost` owns the parts no game should reimplement: mounting the root element,
driving `pause`/`resume` from `visibilitychange` (§13.4), a `ResizeObserver`,
binding all listeners to an `AbortSignal` so teardown cannot leak, and an error
boundary.

**Feedback default:** the SDK plays the canonical correct/incorrect cue unless
the game passes `{ silent: true }` because it provides its own diegetic
feedback. Consistent by default, overridable deliberately.

---

## 5. Platform obligations

`ctx.platform` exposes `{ reduceMotion, coarsePointer, isCapacitor, locale, dpr }`.
`ctx.input` normalises keyboard, mouse and touch into game actions, satisfying
§11.7 (touch fallback) and §15.1 (keyboard reachability) once rather than 360
times. Because canvas content is opaque to assistive technology, `GameHost` also
mounts a focusable control layer alongside the canvas.

Two rules the SDK enforces rather than suggests:

- Under `prefers-reduced-motion: reduce`, a game must render a static-equivalent
  state that looks deliberate, not frozen (§11.6, §15.4).
- Correct/incorrect feedback must carry text or an icon, never colour alone
  (§15.3).

All user-visible game chrome is bilingual, Italian first (§14.7). Item content is
already bilingual in the topic data.

---

## 6. Size budget

Of the 30 MB APK cap (§22.12): topic data occupies 3.7 MB and the app shell,
vendored Three.js and fonts roughly 1.5 MB, leaving approximately **24.8 MB for
all games**.

Band sharing is what makes this comfortable. Games are grouped into 6-level
bands (360 games across 60 bands); the six games in a band share one runtime
module carrying their common aesthetic and mechanics. At roughly 40 KB per game
and 120 KB per band runtime: 14.4 MB + 7.2 MB ≈ **21.6 MB**, leaving headroom.

Consequent hard constraints on every game:

- No sprite atlases or bitmap texture packs; textures generated procedurally.
- No audio files — synthesized Web Audio only, which §14.3 already mandates.
- Three.js is counted once; it is already vendored and integrity-pinned (§6.1).

Enforcement is a **total** budget on `js/games/**` in `npm run doctrine:check`,
not a per-file cap, so authors may trade a heavier band runtime against lighter
games. Checking at PR time is deliberate: the existing §22.12 gate only fires
after a Gradle build in `apk.yml`, which is far too late a signal.

---

## 7. Failure handling

Every failure path ends somewhere other than a white screen (§11.2).

| Failure | Behaviour |
| --- | --- |
| Game module fails to import | Fall back to that level's legacy exercises with a visible bilingual notice. |
| Crash inside the game loop | Error boundary destroys the game, offers retry or the legacy path. Answers already given survive, because analytics flush within 5 s (§24.4). |
| WebGL context loss | `GameHost` handles `webglcontextlost` and degrades rather than dying (§11.1); common on mid-range Android. |
| Game reports an unknown item key | SDK rejects the report and warns, rather than corrupting analytics. |

---

## 8. Testing

**Unit tests** cover the parts that carry the pedagogy, not the rendering:

- ledger state transitions (`unseen → introduced → attempted → cleared`)
- `attempt()` grading across accent variants, near-misses and partial credit
- the XP curve including hint penalties
- `session.finish()` actually refusing a level with uncovered items
- the service fan-out invoked with correct arguments, including a regression
  test that `userAnswer` and `expectedAnswer` are distinct (§1.1 above)

**Conformance harness.** `runGameConformance(gameModule)` is a headless test in
CI that every game must pass:

- lifecycle methods present and idempotent
- no listener, timer or `requestAnimationFrame` leaks after `destroy()`
- honours `reduceMotion`
- fully playable with a coarse pointer only
- reaches full item coverage when driven by a scripted bot

This is what allows game number 200 to be added without hand-review.

---

## 9. Doctrine impact

No amendment is required. Games live under `js/` and are listed in
`STATIC_ASSETS` like every other module, satisfying §17.8 and §5.6, and that
listing is also the APK shipping mechanism (§22.15).

Two **new** CI gates are added, which is a rules addition and therefore a minor
doctrine version bump under §21.1, not a weakening:

1. `registry.js` and `sw.js#STATIC_ASSETS` must agree — no game may be
   registered but unshipped, or shipped but unregistered.
2. Total size of `js/games/**` must stay within the budget in §6.

`docs/` is a new top-level directory (§1.9): already excluded in `.dockerignore`,
and added to the `rsync --exclude` list in `.github/workflows/deploy.yml` so
specs do not ship to GitHub Pages. It is not in `STATIC_ASSETS` because it does
not ship.

---

## 10. Open questions

- **§0.3 aesthetic register.** Doctrine currently states "Never Duolingo-playful.
  No confetti, no mascots" and mandates gold-on-graphite (§14.6). Arcade
  minigames are in tension with this. The maintainer chose to defer: decide per
  6-level band during authoring. If a band's design departs from §0.3, that band
  needs a `doctrine:` amendment scoping where the rule applies. **This does not
  block the SDK**, which imposes no visual constraints either way.

---

## 11. First implementation slice

The SDK is only proven by a real game. The recommended first slice is:

1. `LevelSession.js`, `GameHost.js`, `registry.js`, and the conformance harness.
2. One complete Node.js level-1 game (topic `nodejs`, level index 0,
   *Fondamenti / Foundations*, 40 items across 4 lessons) built on the band-I
   runtime.
3. The two CI gates from §9.

Levels 2–6 then reuse the band-I runtime and are mostly content and mechanics.
Level 7 (index 6, *Express Fondamenti*) opens band II and is the first test of
whether the band boundary is a real code-sharing seam.
