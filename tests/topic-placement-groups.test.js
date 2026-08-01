import { describe, it, expect, beforeAll, vi } from 'vitest';
import { readFileSync } from 'node:fs';

// The picker renders modes GROUP BY GROUP. A mode missing from every group
// would build, lint and pass every other test — and simply never appear to the
// learner. That silent-disappearance failure is what this file exists to catch.

const source = readFileSync('js/topics/TopicPlacement.js', 'utf8');

// The ids actually offered by showModeSelector, read from the mode list itself.
const declaredIds = [...source.matchAll(/^\s{8}id: '([a-z0-9]+)',$/gm)].map((m) => m[1]);

let MODE_GROUPS;

beforeAll(async () => {
  // TopicPlacement pulls in TTSService, which reads `window` at module scope.
  globalThis.window = {
    speechSynthesis: {
      speak: vi.fn(),
      cancel: vi.fn(),
      getVoices: vi.fn(() => []),
      addEventListener: vi.fn(),
    },
    addEventListener: vi.fn(),
  };
  globalThis.SpeechSynthesisUtterance = class {};
  globalThis.document = {
    addEventListener: vi.fn(),
    getElementById: vi.fn(() => null),
    querySelectorAll: vi.fn(() => []),
    createElement: vi.fn(() => ({ dataset: {}, style: {}, addEventListener: vi.fn() })),
  };
  globalThis.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn() }));
  ({ MODE_GROUPS } = await import('../js/topics/TopicPlacement.js'));
});

describe('practice mode grouping', () => {
  it('reads a non-trivial set of modes from the selector', () => {
    // Guards the regex above: if the file's shape changes this test must fail
    // loudly rather than quietly comparing two empty lists.
    expect(declaredIds.length).toBeGreaterThan(15);
  });

  it('every mode in the selector belongs to exactly one group', () => {
    const grouped = MODE_GROUPS.flatMap((g) => g.ids);
    const ungrouped = declaredIds.filter((id) => !grouped.includes(id));
    expect(ungrouped, `modes that would never render: ${ungrouped.join(', ')}`).toEqual([]);

    const dupes = grouped.filter((id, i) => grouped.indexOf(id) !== i);
    expect(dupes, `modes listed in more than one group: ${dupes.join(', ')}`).toEqual([]);
  });

  it('no group references a mode that does not exist', () => {
    const grouped = MODE_GROUPS.flatMap((g) => g.ids);
    const phantom = grouped.filter((id) => !declaredIds.includes(id));
    expect(phantom, `groups reference unknown modes: ${phantom.join(', ')}`).toEqual([]);
  });

  it('every group has a bilingual name and at least one mode', () => {
    for (const group of MODE_GROUPS) {
      expect(group.id).toBeTruthy();
      expect(group.name, `${group.id} name`).toMatch(' / ');
      expect(group.ids.length, `${group.id} is empty`).toBeGreaterThan(0);
    }
  });

  it('group ids are unique', () => {
    const ids = MODE_GROUPS.map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('hands-on group leads with the lab', () => {
    // The lab is the most engaging exercise in the app; it should not be buried
    // behind eight other cards.
    const handson = MODE_GROUPS.find((g) => g.id === 'handson');
    expect(handson.ids[0]).toBe('lab');
  });
});
