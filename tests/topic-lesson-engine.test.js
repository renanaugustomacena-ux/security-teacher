import { describe, it, expect, beforeEach, vi } from 'vitest';

// TopicLessonEngine is a 4-stage lesson engine (Intro -> Groups -> QuickCheck
// -> Summary) with branching logic after the quick-check phase:
//   score 0 => remedial review
//   score 2 (perfect) + groups remaining => skip next group
//   otherwise => normal advance

describe('TopicLessonEngine', () => {
  let TopicLessonEngine;

  // Minimal DOM stubs following the pattern from topic-practice-manager.test.js
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
      createElement: vi.fn(() => {
        const el = {
          className: '',
          type: '',
          title: '',
          dataset: {},
          innerHTML: '',
          textContent: '',
          style: {},
          disabled: false,
          addEventListener: vi.fn(),
          querySelectorAll: vi.fn(() => []),
          querySelector: vi.fn(() => null),
          closest: vi.fn(() => null),
          contains: vi.fn(() => true),
          matches: vi.fn(() => false),
        };
        // escapeHtml creates a div, sets textContent, reads innerHTML
        Object.defineProperty(el, 'innerHTML', {
          get() {
            return el._html || el.textContent;
          },
          set(v) {
            el._html = v;
          },
          configurable: true,
        });
        return el;
      }),
    };
    globalThis.CSS = { escape: (s) => s };
    globalThis.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn() }));

    vi.resetModules();
    ({ TopicLessonEngine } = await import('../js/topics/TopicLessonEngine.js'));
  });

  // ── Fixtures ──────────────────────────────────────

  const mockProgressManager = () => ({
    updateTopicLessonStars: vi.fn(),
    completeTopicLesson: vi.fn(),
    incrementDailyLessons: vi.fn(),
    incrementDailyWords: vi.fn(),
    addXP: vi.fn(),
  });

  const lessonItems = () => [
    {
      english: 'firewall',
      italian: 'firewall',
      context: 'network-security',
      pronunciation: 'FAJR-wol',
      example: 'Enable the firewall',
    },
    {
      english: 'router',
      italian: 'instradatore',
      context: 'network-security',
      pronunciation: 'ROO-ter',
      example: 'Configure the router',
    },
    {
      english: 'phishing',
      italian: 'phishing',
      context: 'social-engineering',
      pronunciation: 'FISH-ing',
      example: 'A phishing email',
    },
    {
      english: 'pretexting',
      italian: 'pretesto',
      context: 'social-engineering',
      pronunciation: 'PREE-tekst-ing',
      example: 'Pretexting attack',
    },
    {
      english: 'malware',
      italian: 'software malevolo',
      context: 'malware',
      pronunciation: 'MAL-wehr',
      example: 'Detected malware',
    },
  ];

  // ── 1. Constructor ────────────────────────────────

  it('creates an instance without errors', () => {
    const engine = new TopicLessonEngine(mockProgressManager());
    expect(engine).toBeInstanceOf(TopicLessonEngine);
    expect(engine.lesson).toBeNull();
    expect(engine.contextGroups).toEqual([]);
    expect(engine.currentGroupIndex).toBe(0);
  });

  // ── 2. Context group organization ─────────────────

  it('_buildContextGroups groups items by context field', () => {
    const engine = new TopicLessonEngine(mockProgressManager());
    const groups = engine._buildContextGroups(lessonItems());

    expect(groups).toHaveLength(3);

    const names = groups.map((g) => g.context);
    expect(names).toContain('network-security');
    expect(names).toContain('social-engineering');
    expect(names).toContain('malware');

    // network-security has 2 items, social-engineering has 2, malware has 1
    const netGroup = groups.find((g) => g.context === 'network-security');
    expect(netGroup.items).toHaveLength(2);
    expect(netGroup.items[0].english).toBe('firewall');

    const malGroup = groups.find((g) => g.context === 'malware');
    expect(malGroup.items).toHaveLength(1);
  });

  it('_buildContextGroups defaults missing context to "general"', () => {
    const engine = new TopicLessonEngine(mockProgressManager());
    const items = [
      { english: 'exploit', italian: 'exploit', pronunciation: 'ek-SPLOIT' },
      { english: 'patch', italian: 'patch', context: 'defense', pronunciation: 'PATCH' },
    ];
    const groups = engine._buildContextGroups(items);
    const contexts = groups.map((g) => g.context);
    expect(contexts).toContain('general');
    expect(contexts).toContain('defense');
  });

  // ── 3. Branching after quick check ────────────────

  it('_branchAfterQuickCheck triggers remedial review when score is 0', () => {
    const engine = new TopicLessonEngine(mockProgressManager());
    const items = lessonItems();

    // Set up engine state as if start() ran and we are in a quick check
    engine.contextGroups = engine._buildContextGroups(items);
    engine.groupStars = new Array(engine.contextGroups.length).fill(0);
    engine.currentGroupIndex = 0;
    engine.container = {
      innerHTML: '',
      querySelectorAll: vi.fn(() => []),
      querySelector: vi.fn(() => null),
    };
    engine.lesson = { items };
    engine.topicId = 'cybersecurity';

    engine._groupCorrectCount = 0;
    engine._isRemedial = false;
    // _getTopicColor is used by render methods; stub it for the test
    engine._getTopicColor = () => '#ef4444';

    // Spy on _renderRemedialReview
    const remedialSpy = vi.spyOn(engine, '_renderRemedialReview');
    const summarySpy = vi.spyOn(engine, 'renderSummary');

    engine._branchAfterQuickCheck();

    expect(remedialSpy).toHaveBeenCalledWith(0);
    expect(summarySpy).not.toHaveBeenCalled();
  });

  it('_branchAfterQuickCheck skips next group on perfect score (2/2)', () => {
    const engine = new TopicLessonEngine(mockProgressManager());
    const items = lessonItems();

    engine.contextGroups = engine._buildContextGroups(items);
    engine.groupStars = new Array(engine.contextGroups.length).fill(0);
    engine.currentGroupIndex = 0; // first of 3 groups
    engine.totalCorrect = 2;
    engine.container = {
      innerHTML: '',
      querySelectorAll: vi.fn(() => []),
      querySelector: vi.fn(() => null),
    };
    engine.lesson = { items };
    engine.topicId = 'cybersecurity';

    engine._groupCorrectCount = 2;
    engine._isRemedial = false;
    // _getTopicColor is used by render methods; stub it for the test
    engine._getTopicColor = () => '#ef4444';

    const skipSpy = vi.spyOn(engine, '_showSkipNotice');
    const nextGroupSpy = vi.spyOn(engine, 'renderContextGroup');

    engine._branchAfterQuickCheck();

    // Should skip group 1 and jump to group 2
    expect(skipSpy).toHaveBeenCalledWith(1, 2);
    expect(nextGroupSpy).not.toHaveBeenCalled();
    // The skipped group gets auto-credited with 2 stars
    expect(engine.groupStars[1]).toBe(2);
  });

  // ── 4. Star calculation ───────────────────────────

  it('renderSummary computes correct overall star rating', () => {
    const pm = mockProgressManager();
    const engine = new TopicLessonEngine(pm);
    const items = lessonItems();

    // Wire up container with getElementById returning stub elements
    const stubEl = { textContent: '', innerHTML: '' };
    globalThis.document.getElementById = vi.fn((id) => {
      if (id === 'topic-lesson-content') return engine.container;
      return { ...stubEl };
    });

    engine.lesson = { id: 'lesson-1', title: 'Test Lesson', items, description: 'desc' };
    engine.topicId = 'cybersecurity';
    engine.levelNum = 1;
    engine.contextGroups = engine._buildContextGroups(items);
    engine.container = {
      innerHTML: '',
      querySelectorAll: vi.fn(() => []),
      querySelector: vi.fn(() => null),
    };

    // Simulate: 3 groups, stars [2, 2, 1] => avgStars = 5/3 = 1.67 => overallStars = 2
    engine.groupStars = [2, 2, 1];
    engine.totalCorrect = 5;

    engine.renderSummary();

    // overallStars should be 2 (avgStars 1.67 >= 1.0 but < 1.8)
    expect(pm.updateTopicLessonStars).toHaveBeenCalledWith('cybersecurity', 1, 'lesson-1', 2);
    expect(pm.addXP).toHaveBeenCalled();
    // XP = 5*10 + 20 completion + 0 perfect = 70
    expect(pm.addXP).toHaveBeenCalledWith(70);

    // Now simulate a perfect run: all groups score 2
    engine.groupStars = [2, 2, 2];
    engine.totalCorrect = 6;

    engine.renderSummary();

    // avgStars = 6/3 = 2.0 >= 1.8 => overallStars = 3
    expect(pm.updateTopicLessonStars).toHaveBeenCalledWith('cybersecurity', 1, 'lesson-1', 3);
    // XP = 6*10 + 20 + 15 perfect = 95
    expect(pm.addXP).toHaveBeenCalledWith(95);
  });
});
