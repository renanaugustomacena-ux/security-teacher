import { describe, it, expect, beforeEach, vi } from 'vitest';
import { progressTopicsMixin } from '../js/ProgressTopics.js';

// The placement test used to end in a score screen whose only effect was to
// make higher level nodes tappable: the estimate was never stored, "Continue"
// still walked to Level 0 Lesson 1, and the offer reappeared on every visit.

describe('ProgressTopics — placement persistence', () => {
  function makeStore() {
    return {
      data: { topicProgress: {} },
      saveProgress: vi.fn(),
      addActivity: vi.fn(),
      renderProgress: vi.fn(),
      ...progressTopicsMixin,
    };
  }

  it('remembers where the test placed the learner', () => {
    const store = makeStore();
    store.recordTopicPlacement('networking', { level: 7, accuracy: 0.75 });

    const placement = store.getTopicPlacement('networking');
    expect(placement.level).toBe(7);
    expect(placement.skipped).toBe(false);
    expect(store.saveProgress).toHaveBeenCalled();
  });

  it('records a declined test, so the offer is not shown again', () => {
    const store = makeStore();
    store.recordTopicPlacement('networking', { level: 0, skipped: true });
    expect(store.getTopicPlacement('networking').skipped).toBe(true);
  });

  it('a later decision to start at level 1 overrides an earlier estimate', () => {
    const store = makeStore();
    store.recordTopicPlacement('networking', { level: 7, accuracy: 0.75 });
    store.recordTopicPlacement('networking', { level: 0, skipped: true });

    const placement = store.getTopicPlacement('networking');
    expect(placement.level).toBe(0);
    expect(placement.skipped).toBe(true);
  });

  it('returns null for a topic never placed', () => {
    expect(makeStore().getTopicPlacement('rust')).toBe(null);
  });

  it('keeps unlocked levels sorted', () => {
    const store = makeStore();
    store.unlockTopicLevels('networking', [3, 1, 2]);
    expect(store.getTopicStats('networking').unlockedLevels).toEqual([0, 1, 2, 3]);
  });
});

describe('TopicManager.continueLearning — honours the placement', () => {
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

  const data = {
    levels: {
      0: { lessons: [{ id: 'l0a', items: [] }] },
      1: { lessons: [{ id: 'l1a', items: [] }] },
      5: { lessons: [{ id: 'l5a', items: [] }] },
    },
  };

  function makeManager(placement) {
    const tm = new TopicManager({
      isTopicLessonCompleted: vi.fn(() => false),
      isTopicLevelUnlocked: vi.fn(() => true),
      getTopicStats: vi.fn(() => null),
      getTopicPlacement: vi.fn(() => placement),
      getXP: vi.fn(() => ({ total: 0 })),
    });
    tm.loadTopicData = vi.fn(async () => data);
    tm.openLesson = vi.fn();
    return tm;
  }

  it('starts at the placement level instead of Level 0 Lesson 1', async () => {
    const tm = makeManager({ level: 5, skipped: false });
    await tm.continueLearning('networking');
    expect(tm.openLesson).toHaveBeenCalledWith('networking', 5, 'l5a');
  });

  it('starts at the beginning when the learner declined the test', async () => {
    const tm = makeManager({ level: 0, skipped: true });
    await tm.continueLearning('networking');
    expect(tm.openLesson).toHaveBeenCalledWith('networking', 0, 'l0a');
  });

  it('starts at the beginning when no placement was ever recorded', async () => {
    const tm = makeManager(null);
    await tm.continueLearning('networking');
    expect(tm.openLesson).toHaveBeenCalledWith('networking', 0, 'l0a');
  });

  it('falls back to earlier levels once the placement level is finished', async () => {
    const tm = makeManager({ level: 5, skipped: false });
    // Everything at level 5 is done; level 1 still has work.
    tm.progressManager.isTopicLessonCompleted = vi.fn(
      (_topic, level) => level === 5 || level === 0
    );
    await tm.continueLearning('networking');
    expect(tm.openLesson).toHaveBeenCalledWith('networking', 1, 'l1a');
  });
});
