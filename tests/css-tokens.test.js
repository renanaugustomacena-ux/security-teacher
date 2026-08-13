import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(resolve(REPO, 'css/style.css'), 'utf8');

/**
 * Custom properties that are legitimately absent from `:root` because a manager
 * sets them on an element at runtime. Every one of these MUST be referenced with
 * a fallback, which the third test below enforces.
 */
const RUNTIME_SET = new Set([
  '--streak-tint-deg',
  '--streak-tint-strength',
  '--topic-color',
  '--tag-color',
]);

function definedTokens() {
  const names = new Set();
  for (const m of css.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)) names.add(m[1]);
  return names;
}

/** Every `var(...)` reference, with whether it supplied a fallback. */
function references() {
  const out = [];
  for (const m of css.matchAll(/var\(\s*(--[a-z0-9-]+)\s*(,)?/g)) {
    const line = css.slice(0, m.index).split('\n').length;
    out.push({ name: m[1], hasFallback: Boolean(m[2]), line });
  }
  return out;
}

describe('css custom properties', () => {
  it('defines every token that is referenced without a fallback', () => {
    const defined = definedTokens();
    const dangling = references()
      .filter((r) => !r.hasFallback && !defined.has(r.name) && !RUNTIME_SET.has(r.name))
      .map((r) => `css/style.css:${r.line} var(${r.name})`);

    // A var() naming an undefined property with no fallback is invalid at
    // computed-value time: the WHOLE declaration is dropped and the property
    // falls back to its initial value. That is how `.btn-sync`'s border silently
    // stopped rendering (var(--border)) and how `.translate-input` silently lost
    // its font (var(--font-body)).
    expect(dangling).toEqual([]);
  });

  it('has no references to the retired --surface-N / --border vocabulary', () => {
    const retired = references()
      .filter((r) => ['--surface-1', '--surface-2', '--surface-3', '--border'].includes(r.name))
      .map((r) => `css/style.css:${r.line} var(${r.name})`);

    // These came from a parallel naming scheme that was never added to :root.
    // The design system's real surface tokens are --bg-secondary / --bg-tertiary
    // and its border tokens are --border-color / --glass-border.
    expect(retired).toEqual([]);
  });

  it('always supplies a fallback for runtime-set custom properties', () => {
    const missing = references()
      .filter((r) => RUNTIME_SET.has(r.name) && !r.hasFallback)
      .map((r) => `css/style.css:${r.line} var(${r.name})`);

    expect(missing).toEqual([]);
  });
});
