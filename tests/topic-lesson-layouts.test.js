import { describe, it, expect, beforeEach, vi } from 'vitest';

// TopicLessonLayouts decides WHICH lesson engine renders a given lesson.
// The guarantees that matter:
//   - an explicit lesson.layout always wins
//   - otherwise selection is deterministic (same lesson => same layout, always)
//   - rotation actually spreads lessons across layouts (that is the whole point)
//   - a layout that cannot render, or fails to import, degrades to `classic`
//     rather than leaving the learner on a blank screen

describe('TopicLessonLayouts', () => {
  let layouts;

  beforeEach(async () => {
    globalThis.window = {
      speechSynthesis: {
        speak: vi.fn(),
        cancel: vi.fn(),
        getVoices: vi.fn(() => []),
        addEventListener: vi.fn(),
      },
      AudioContext: vi.fn(() => ({})),
      webkitAudioContext: vi.fn(() => ({})),
    };
    globalThis.SpeechSynthesisUtterance = class {
      constructor(text) {
        this.text = text;
      }

      addEventListener() {}
    };
    globalThis.document = {
      body: { addEventListener: vi.fn(), contains: vi.fn(() => true) },
      querySelectorAll: vi.fn(() => []),
      addEventListener: vi.fn(),
      getElementById: vi.fn(() => null),
      createElement: vi.fn(() => ({
        dataset: {},
        style: {},
        textContent: '',
        innerHTML: '',
        addEventListener: vi.fn(),
      })),
    };
    globalThis.CSS = { escape: (s) => s };
    globalThis.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn() }));
    vi.resetModules();
    layouts = await import('../js/topics/TopicLessonLayouts.js');
  });

  const richLesson = (id) => ({
    id,
    title: 'Lesson',
    description: 'desc',
    items: [
      {
        english: 'firewall',
        italian: 'muro di fuoco',
        context: 'net',
        example: 'Enable the firewall now. = Abilita subito il firewall.',
      },
      {
        english: 'router',
        italian: 'instradatore',
        context: 'net',
        example: 'Configure the router first. = Configura prima il router.',
      },
      {
        english: 'phishing',
        italian: 'adescamento',
        context: 'social',
        example: 'Report the phishing email. = Segnala la email di phishing.',
      },
      {
        english: 'malware',
        italian: 'software malevolo',
        context: 'threat',
        example: 'Detected malware today. = Rilevato malware oggi.',
      },
    ],
  });

  // ── metadata ──────────────────────────────────────

  it('exposes bilingual metadata for every registered layout', () => {
    expect(layouts.LAYOUT_IDS).toContain('classic');
    for (const id of layouts.LAYOUT_IDS) {
      const meta = layouts.getLayoutMeta(id);
      expect(meta, `missing meta for ${id}`).toBeTruthy();
      expect(meta.name, `missing English name for ${id}`).toBeTruthy();
      expect(meta.nameIt, `missing Italian name for ${id}`).toBeTruthy();
      expect(meta.icon, `missing icon for ${id}`).toBeTruthy();
    }
  });

  it('getLayoutMeta returns null for an unknown id', () => {
    expect(layouts.getLayoutMeta('nope')).toBeNull();
  });

  // ── selection ─────────────────────────────────────

  it('an explicit lesson.layout overrides rotation', () => {
    expect(layouts.predictLayoutId({ id: 'anything', layout: 'story' })).toBe('story');
    expect(layouts.predictLayoutId({ id: 'anything', layout: 'drill' })).toBe('drill');
  });

  it('ignores an unknown explicit layout and falls back to rotation', () => {
    const id = layouts.predictLayoutId({ id: 'lesson-x', layout: 'does-not-exist' });
    expect(layouts.LAYOUT_IDS).toContain(id);
  });

  it('rotation is deterministic for a given lesson id', () => {
    const a = layouts.predictLayoutId({ id: 'linux_basics_1' });
    const b = layouts.predictLayoutId({ id: 'linux_basics_1' });
    expect(a).toBe(b);
  });

  it('rotation spreads consecutive lessons across multiple layouts', () => {
    const seen = new Set();
    for (let i = 0; i < 40; i += 1) {
      seen.add(layouts.predictLayoutId({ id: `linux_basics_${i}` }));
    }
    // The entire point of the registry: not every lesson looks the same.
    expect(seen.size).toBeGreaterThan(2);
  });

  it('predictLayoutId degrades to classic for a null lesson', () => {
    expect(layouts.predictLayoutId(null)).toBe('classic');
  });

  // ── engine construction ───────────────────────────

  it('createLessonEngine returns a startable engine for a rich lesson', async () => {
    const { engine, layoutId, meta } = await layouts.createLessonEngine(
      richLesson('linux_basics_1'),
      {}
    );
    expect(typeof engine.start).toBe('function');
    expect(layouts.LAYOUT_IDS).toContain(layoutId);
    expect(meta.id).toBe(layoutId);
  });

  it('honours an explicit layout when that layout can render the lesson', async () => {
    const { layoutId } = await layouts.createLessonEngine(
      { ...richLesson('l-explicit'), layout: 'drill' },
      {}
    );
    expect(layoutId).toBe('drill');
  });

  it('falls back to a renderable layout when the preferred one bails out', async () => {
    // A single item with no usable example: Story cannot build a cloze, and
    // Compare has no pair. Whatever we get back must still be startable.
    const sparse = {
      id: 'sparse-lesson',
      title: 'Sparse',
      description: '',
      layout: 'story',
      items: [{ english: 'solo', italian: 'solo', context: 'x' }],
    };
    const { engine, layoutId } = await layouts.createLessonEngine(sparse, {});
    expect(layoutId).not.toBe('story');
    expect(typeof engine.start).toBe('function');
  });

  it('never throws and always yields an engine, even for a degenerate lesson', async () => {
    const degenerate = { id: '', title: '', items: [] };
    const { engine, layoutId } = await layouts.createLessonEngine(degenerate, {});
    expect(typeof engine.start).toBe('function');
    expect(layoutId).toBeTruthy();
  });
});
