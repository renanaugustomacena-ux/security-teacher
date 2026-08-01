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

  // ── Per-topic pinning (replaces lessonFlags.useLessonV2) ──
  // LessonV2 is a long-form loop, not a variation, so a topic opts into it
  // instead of meeting it at random. This is the mechanism that absorbed the
  // old boolean flag when the pilot branch merged in.

  it('registers lessonv2 but keeps it OUT of the rotation', () => {
    expect(layouts.LAYOUT_IDS).toContain('lessonv2');
    const rotated = new Set();
    for (let i = 0; i < 200; i += 1) {
      rotated.add(layouts.predictLayoutId({ id: `some_lesson_${i}` }));
    }
    // No un-pinned topic should ever land on it by chance.
    expect(rotated.has('lessonv2')).toBe(false);
  });

  it('pins a topic to its default layout', () => {
    expect(layouts.TOPIC_DEFAULT_LAYOUT.cybersecurity).toBe('lessonv2');
    const lesson = { id: 'cyber_basics_1' };
    expect(layouts.predictLayoutId(lesson, 'cybersecurity')).toBe('lessonv2');
    // The same lesson id in an unpinned topic still rotates normally.
    expect(layouts.predictLayoutId(lesson, 'linux')).not.toBe('lessonv2');
  });

  it('an explicit lesson.layout still beats the topic pin', () => {
    const lesson = { id: 'cyber_basics_1', layout: 'drill' };
    expect(layouts.predictLayoutId(lesson, 'cybersecurity')).toBe('drill');
  });

  it('builds the pinned engine for a pinned topic', async () => {
    const { engine, layoutId } = await layouts.createLessonEngine(
      richLesson('cyber_basics_1'),
      {},
      'cybersecurity'
    );
    expect(layoutId).toBe('lessonv2');
    expect(typeof engine.start).toBe('function');
  });

  it('falls back to the rotation when the pinned layout cannot render', async () => {
    // lessonv2 splits the lesson into two drilled chunks, so it needs >= 4
    // translatable items. A thin lesson must not dead-end on the pin.
    const thin = {
      id: 'cyber_thin',
      title: 'Thin',
      items: [{ english: 'solo', italian: 'unico', context: 'x' }],
    };
    const { engine, layoutId } = await layouts.createLessonEngine(thin, {}, 'cybersecurity');
    expect(layoutId).not.toBe('lessonv2');
    expect(typeof engine.start).toBe('function');
  });

  it('an unknown topic pin does not break selection', async () => {
    const { engine, layoutId } = await layouts.createLessonEngine(
      richLesson('l1'),
      {},
      'no-such-topic'
    );
    expect(layouts.LAYOUT_IDS).toContain(layoutId);
    expect(typeof engine.start).toBe('function');
  });
});
