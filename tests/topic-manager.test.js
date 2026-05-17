import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('TopicManager', () => {
  let TopicManager;

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
      querySelectorAll: vi.fn(() => []),
      addEventListener: vi.fn(),
      getElementById: vi.fn(() => null),
      createElement: vi.fn(() => ({
        className: '',
        type: '',
        title: '',
        dataset: {},
        innerHTML: '',
        textContent: '',
        style: {},
        addEventListener: vi.fn(),
      })),
    };
    globalThis.CSS = { escape: (s) => s };
    globalThis.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn() }));

    vi.resetModules();
    ({ TopicManager } = await import('../js/topics/TopicManager.js'));
  });

  // ── helpers ──

  function makeProgressManager(overrides = {}) {
    return {
      isTopicLessonCompleted: vi.fn(() => false),
      isTopicLevelUnlocked: vi.fn(() => false),
      getTopicStats: vi.fn(() => null),
      getXP: vi.fn(() => ({ total: 0 })),
      completeTopicLesson: vi.fn(),
      incrementDailyLessons: vi.fn(),
      ...overrides,
    };
  }

  function makeLevelData() {
    return {
      levels: {
        1: {
          name: 'Basics',
          lessons: [
            { id: 'l1', title: 'Lesson 1', items: [{ english: 'a' }, { english: 'b' }] },
            { id: 'l2', title: 'Lesson 2', items: [{ english: 'c' }] },
          ],
        },
        2: {
          name: 'Intermediate',
          lessons: [
            {
              id: 'l3',
              title: 'Lesson 3',
              items: [{ english: 'd' }, { english: 'e' }, { english: 'f' }],
            },
          ],
        },
      },
    };
  }

  // ── tests ──

  it('constructor initialises default state without errors', () => {
    const pm = makeProgressManager();
    const tm = new TopicManager(pm);

    expect(tm.progressManager).toBe(pm);
    expect(tm.dataCache).toEqual({});
    expect(tm.currentTopicId).toBeNull();
    expect(tm.currentLevel).toBeNull();
    expect(tm.currentLesson).toBeNull();
    expect(tm.currentItemIndex).toBe(0);
    expect(tm.expandedLevel).toBeNull();
  });

  it('renderStars returns correct filled/empty star markup', () => {
    const tm = new TopicManager(makeProgressManager());

    const html = tm.renderStars(2, 3);
    const filled = (html.match(/star-filled/g) || []).length;
    const empty = (html.match(/star-empty/g) || []).length;

    expect(filled).toBe(2);
    expect(empty).toBe(1);
  });

  it('renderStars with zero filled returns all empty', () => {
    const tm = new TopicManager(makeProgressManager());

    const html = tm.renderStars(0, 5);
    const filled = (html.match(/star-filled/g) || []).length;
    const empty = (html.match(/star-empty/g) || []).length;

    expect(filled).toBe(0);
    expect(empty).toBe(5);
  });

  it('getTopicTotalWords sums item counts across all levels and lessons', () => {
    const tm = new TopicManager(makeProgressManager());
    const data = makeLevelData();

    // level 1: 2 + 1 = 3, level 2: 3 => total 6
    expect(tm.getTopicTotalWords(data)).toBe(6);
  });

  it('getTopicTotalWords returns 0 for null or missing levels', () => {
    const tm = new TopicManager(makeProgressManager());

    expect(tm.getTopicTotalWords(null)).toBe(0);
    expect(tm.getTopicTotalWords({})).toBe(0);
    expect(tm.getTopicTotalWords({ levels: {} })).toBe(0);
  });

  it('getTopicTotalStars aggregates lesson stars via progressManager', () => {
    const pm = makeProgressManager({
      // Only lesson l1 in level 1 is completed => 3 stars
      isTopicLessonCompleted: vi.fn((topicId, level, lessonId) => {
        return topicId === 'test' && level === 1 && lessonId === 'l1';
      }),
    });
    const tm = new TopicManager(pm);
    const data = makeLevelData();

    const result = tm.getTopicTotalStars('test', data);

    // 3 lessons total => possible = 3 * 3 = 9
    // Only l1 completed => earned = 3
    expect(result.possible).toBe(9);
    expect(result.earned).toBe(3);
  });

  it('loadTopicData returns cached data without re-importing', async () => {
    const tm = new TopicManager(makeProgressManager());
    const fakeData = { levels: { 1: { name: 'L1', lessons: [] } } };
    tm.dataCache['my-topic'] = fakeData;

    const result = await tm.loadTopicData('my-topic');

    expect(result).toBe(fakeData);
  });
});
