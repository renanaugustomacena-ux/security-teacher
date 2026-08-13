# design-sync notes — Knowledge AIO

Repo-specific gotchas for future syncs. Read this before re-running the sync.

## Shape: why a wrapper package exists

- This repo is a **vanilla ES6 PWA** — no React, no bundler, no `dist/`
  (Doctrine §1.1). The design system lives entirely in `css/style.css`
  (~8.6k lines, ~60 CSS custom properties) and in the class names the
  `js/**Manager.js` modules emit.
- claude.ai/design only consumes **React** component libraries, so
  `.design-sync/ds-src/` holds thin React wrappers that emit the app's real
  markup and real class names. They are **dev-only tooling**: never imported
  by the app, never shipped, excluded from the Pages artifact, the Docker
  image, ESLint, and Prettier.
- The wrappers are **not a reimplementation**. Every visual property comes
  from `css/style.css` via `cfg.cssEntry`. If a wrapper ever needs CSS the app
  doesn't have, that is a signal the composition is wrong — fix the wrapper,
  do not add CSS to the design system that the app does not ship.

## Doctrine rules this sync touches

- **§1.1** (no framework / no build step): satisfied — nothing here reaches the
  GitHub Pages critical path. React and esbuild live in gitignored
  `node_modules` under `.ds-sync/`, isolated from the repo's own lockfile.
- **§1.9** (new top-level directory): `.design-sync/` is accounted for in
  `.gitignore`, `.eslintignore`, `.prettierignore`, `.dockerignore`, and the
  `rsync --exclude` list in `.github/workflows/deploy.yml`. It is **not** in
  `sw.js#STATIC_ASSETS` because it does not ship.
- **§6.6** (pinned devDependencies): untouched — the converter's deps are
  installed into `.ds-sync/package.json`, not the repo's.
- **§14.6 / §14.7**: previews use the gold-on-graphite palette and bilingual
  IT/EN copy, matching the app's own register.

## Re-sync setup (do these first — the build fails without them)

Run from the repo root, in order:

1. **Stage the converter + install its isolated deps** (never into the repo's
   own `package.json` — Doctrine §6.6):
   ```sh
   mkdir -p .ds-sync && cp -r "<skill-dir>"/{package-build.mjs,package-validate.mjs,package-capture.mjs,resync.mjs,lib,storybook} .ds-sync/
   echo '{"name":"ds-sync-deps","private":true}' > .ds-sync/package.json
   (cd .ds-sync && npm i esbuild ts-morph @types/react react react-dom playwright)
   ```
2. **Link the wrapper package into that node_modules.** The converter resolves
   `PKG_DIR` as `<node_modules>/<pkg>`, which does not exist for a repo-local
   package — the build dies with `ENOENT … @knowledge-aio/ds/package.json`
   without this:
   ```sh
   (cd .ds-sync && npm i "file:../.design-sync/ds-src")
   ```
3. **Regenerate the CSS + font copies** (gitignored, so a fresh clone has
   neither — `cfg.cssEntry` is bounded inside the package dir and cannot point
   at `css/style.css` across that boundary):
   ```sh
   mkdir -p .design-sync/ds-src/generated/fonts
   cp css/style.css .design-sync/ds-src/generated/app.css   # keep the header comment or not; content is what matters
   cp vendor/fonts/* .design-sync/ds-src/generated/fonts/
   ```
4. **Set `DS_CHROMIUM_PATH` on every validate/capture/driver command.** Playwright's
   browser download is blocked by npm's allow-scripts gate (deliberately — it
   saves a ~200 MB download), so point it at the system Chrome instead:
   ```sh
   DS_CHROMIUM_PATH="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" node .ds-sync/resync.mjs …
   ```
   Omit it and the driver's validate stage exits 1 with `[RENDER_SKIPPED]` and
   the capture stage is skipped as `prior_failure`.

## Build gotchas learned the hard way

- **`cfg.dtsPropsFor` is doing all the work.** There is no `.d.ts` tree to parse
  (`[DTS] parsed 0 .d.ts files` is expected, not a failure). Without the
  hand-written prop bodies in config, every component emits
  `{ [key: string]: unknown }` and the design agent gets no API contract at all.
  **If you add a component, you must add its `dtsPropsFor` entry** — keep it in
  sync with the `.tsx` by hand.
- **Components come from `componentSrcMap` only.** With no `.d.ts` exports the
  discovery pass finds nothing; every component must be listed explicitly there
  or it silently vanishes from the sync.
- **`AppSurface` is the provider and must stay exported but NOT in
  `componentSrcMap`.** Listing it there would give it a card; removing it from
  `index.tsx` would fire `[PROVIDER_UNEXPORTED]` and fail the build.
- **Changing `cfg.overrides` requires a full `package-build.mjs`.** A scoped
  `preview-rebuild.mjs` then errors `[CONFIG_STALE]` because grade keys are
  stamped at full-build time.
- **`overrides.<Name>.viewport` is consumed by the claude.ai/design product, not
  by local capture.** Local screenshots always use the default capture viewport,
  so a `cardMode: single` card looks far wider locally than it will in the pane.
  Don't chase that difference.

## Environment gotchas

- **`npm run lint` was failing on `master` before this sync** — ~1178
  `prettier/prettier` errors across 18 tracked `.js` files, plus one
  `no-unused-vars` warning. It was **not** a line-ending problem (both the
  committed blobs and the working tree are clean LF); it was genuine formatting
  drift, most likely from the module-split refactors in `7b587c1` / `550ceb2`
  landing without a `npm run format` pass. Because `.husky/pre-commit` runs
  `npm run lint` first and `--no-verify` is not authorised (Doctrine §6.7), the
  repo could not accept **any** commit until this was cleared. Fixed here by
  running `npm run format` and deleting one dead import. If lint ever fails en
  masse again, run `npm run format` before assuming anything about encodings.
- `npm run doctrine:check` passes and must keep passing. It only walks `js/`,
  so nothing under `.design-sync/` can trip it.
- Node in use during the first sync was v26; `.nvmrc` pins 22 and
  `engines.node` is `>=22`. Both satisfy the converter.

## Known render warns

These validate warnings were triaged as legitimate. A warn **not** on this list
is new — investigate it rather than assuming it is noise.

- `[FONT_MISSING] "Fira Code"` — `--font-mono` is
  `'JetBrains Mono', 'Fira Code', monospace`. Fira Code is only the **second**
  entry in the stack; JetBrains Mono is the primary and **does** ship (24
  `@font-face` rules land in `fonts/`). No design ever renders in a fallback
  font, so there is nothing to source. Do not "fix" this by adding Fira Code —
  `vendor/fonts/` is integrity-pinned under Doctrine §6.2/§7.2.
- `tokens: N defined, N referenced (2 missing, below threshold)` — the two are
  `--topic-color` and `--tag-color`, both set on elements at runtime by the
  topic managers and both always referenced **with** a fallback. Expected.

## CSS defects this sync surfaced (now FIXED)

Found while validating that every token named in `conventions.md` actually
resolves in the built stylesheet. All three were pre-existing bugs in
`css/style.css`, fixed in the same branch as this sync and locked down by
`tests/css-tokens.test.js`.

1. **`.btn-sync` rendered with no border at all** (`css/style.css`, `.btn-sync`).
   It set `border: 1px solid var(--border)` — `--border` was never defined and
   had no fallback. An invalid `var()` with no fallback is invalid at
   computed-value time, so the whole `border` declaration was dropped and reset
   to its initial value (`medium none currentcolor`). → `var(--border-color)`.
2. **`.translate-input` silently ignored its font.** `font-family:
var(--font-body)` — undefined, no fallback, so it inherited instead.
   → `var(--font-sans)`.
3. **The Reference-panel / Statistics / Placement blocks used a parallel token
   vocabulary that was never added to `:root`** — `--surface-2`, `--surface-3`,
   `--border`, each with a hard-coded fallback (`#1e1e2e`, `#2a2a3e`,
   `rgba(255,255,255,.05–.1)`). They rendered, but in purple-grey, outside the
   gold-on-graphite palette Doctrine §14.6 mandates. Mapped onto the real
   tokens: `--surface-2` → `--bg-secondary`, `--surface-3` → `--bg-tertiary`,
   and the white-hairline `--border` uses → `--glass-border` (chosen over
   `--border-color` because those borders were deliberately subtle white
   hairlines, not amber).

**The guard:** `tests/css-tokens.test.js` fails the build if any `var()` names
an undefined property without a fallback, if the retired `--surface-N` /
`--border` names reappear, or if a runtime-set property is used without a
fallback. It was verified to fail against the pre-fix stylesheet, naming all
three defects at their exact line numbers.

## Re-sync risks

- **`cfg.cssEntry` points outside the wrapper package** (`../../css/style.css`).
  That is deliberate — it is the app's live stylesheet, so the sync never
  drifts from production. If a future converter version rejects the escaping
  path, do **not** copy the CSS in; fix the path handling instead. A copy would
  silently rot the moment anyone edits `css/style.css`.
- **The wrappers hard-code class names.** Renaming a class in `css/style.css`
  (e.g. `.home-card`, `.nav-item`, `.badge-card`) silently unstyles the matching
  wrapper — the render check catches it as a blank or thin card, but only if the
  render check runs. Grep the wrapper for a class before renaming it in the app.
- **Only 12 of ~719 classes are wrapped.** Large parts of the app — karaoke,
  the lesson engine, SRS flashcards, pronunciation, the streak calendar — have
  no component here. That is the scope the maintainer chose, not an oversight.
  They can be added incrementally on any later sync.
- **`AchievementToast` depends on a wrapper trick.** The component is
  `position: fixed`. Its preview wraps it in a div with `transform: translateZ(0)`
  to create a containing block, plus an explicit black fill — without that, the
  toast escapes onto the preview harness's own white `body` (the card template
  hard-codes `body{background:#fff}`) and its `backdrop-filter` washes it out to
  grey. If that preview is ever rewritten, keep the wrapper.
- **The matrix-rain backdrop cannot ship.** `#matrix-morph` is a runtime
  three.js canvas, so preview cards render on the app's real `body`
  `background-color: #000` with no rain behind them. Cards look slightly
  flatter here than in the running app. This is expected, not a defect.
