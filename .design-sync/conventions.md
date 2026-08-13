# Knowledge AIO — how to build with this design system

Knowledge AIO is an Italian-language app for learning English through music,
plus technical topics (ethical hacking, DevSecOps, AI engineering). The visual
register is **cyber-instrument / trading-terminal HUD**: dark translucent glass,
thin lines, sub-pixel glows, gold-on-graphite. Never playful — no confetti, no
mascots, no "Great job!" stickers.

## 1. Always wrap in `AppSurface`

Every screen must be wrapped in `<AppSurface>`. It paints the app's black base
(`background-color: #000`), the primary text colour, and the sans stack.

This is not optional decoration. **Every surface in this system is
translucent** — `.home-card`, `.stat-card`, `.badge-card` and friends fill with
`rgba(10, 18, 35, 0.6)` and similar. Without the black base behind them they
wash out to flat grey and the whole design looks broken.

```jsx
<AppSurface>{/* your screen */}</AppSurface>
```

In the running app a three.js matrix-rain canvas sits between this surface and
the content. It is generated at runtime and cannot ship here, so the flat black
base is the correct static equivalent — do not try to fake the rain.

## 2. The styling idiom: CSS classes + custom properties

There is **no utility-class framework and no style props**. You style in two
ways, both already loaded:

**(a) Use a library component.** Components carry their own classes; you only
pass props. Never hand-write markup for something the library already exports.

**(b) For your own layout glue, use the tokens** via `var(--*)`. Never hardcode
a colour, radius, or spacing value. The real token names:

| Group    | Tokens                                                                                         |
| -------- | ---------------------------------------------------------------------------------------------- |
| Surfaces | `--bg-primary` `--bg-secondary` `--bg-tertiary` `--glass-bg` `--glass-border` `--border-color` |
| Text     | `--text-primary` `--text-secondary` `--text-muted`                                             |
| Accent   | `--accent-primary` (amber `#e67e22`) `--accent-secondary` `--accent-gradient` `--gold-accent`  |
| Status   | `--success` `--danger` `--warning`                                                             |
| Type     | `--font-sans` `--font-display` `--font-mono`, sizes `--font-size-xs` → `--font-size-4xl`       |
| Space    | `--space-xs` `--space-sm` `--space-md` `--space-lg` `--space-xl` `--space-2xl` `--space-card`  |
| Radius   | `--radius-sm` `--radius-md` `--radius-lg` `--radius-xl` `--radius-full`                        |
| Depth    | `--shadow-sm` `--shadow-md` `--shadow-lg` `--shadow-glow` `--border-glow` `--title-shadow`     |
| Motion   | `--transition-fast` `--transition-normal` `--transition-slow`                                  |
| Layering | `--z-background` `--z-base` `--z-sidebar` `--z-overlay` `--z-modal` `--z-loading`              |

Existing app class names you may reuse for layout: `.app-container`,
`.home-grid`, `.stats-grid`, `.mode-selector-grid`, `.badge-gallery`, and the
utilities `.hidden`, `.text-center`, `.text-muted`.

## 3. Hard content rules

- **Every user-visible string is bilingual, Italian first, separated by `/`** —
  e.g. `"Inizia lezione / Start lesson"`. Monolingual copy is a bug.
- **Red (`--danger`) is reserved for hard-fail states only** — data corruption,
  rejected sign-in. Never for a wrong answer. Wrong-answer feedback should read
  like a coach saying "let me show you", not a buzzer.
- Celebration effects fire only on real milestones (level-up, badge unlock,
  streak ≥ 10, perfect run) — never on a routine correct answer.
- Every animation must degrade under `prefers-reduced-motion: reduce`.
- Icons are line-based SVG, stroke-width 1.5–2, no fills except accent dots.

## 4. Where the truth lives

Read the bound `styles.css` and the `_ds_bundle.css` it imports — that is the
app's complete real stylesheet (~8.6k lines) and it beats any summary here. For
any component, read its `<Name>.prompt.md` and `<Name>.d.ts` before using it.

## 5. Idiomatic example

```jsx
<AppSurface>
  <div className="home-grid">
    <ActionCard
      icon={<span>🎧</span>}
      title="Musica / Music"
      description="Impara con i testi / Learn from lyrics"
      featured
    >
      <Button variant="primary">Inizia / Start</Button>
    </ActionCard>
  </div>

  <div style={{ display: 'grid', gap: 'var(--space-lg)', marginTop: 'var(--space-xl)' }}>
    <StatCard icon={<span>🔥</span>} value="7" label="Giorni di serie / Day streak" />
  </div>
</AppSurface>
```

Note the pattern: library components for the real UI, `var(--*)` tokens for the
layout glue between them.
