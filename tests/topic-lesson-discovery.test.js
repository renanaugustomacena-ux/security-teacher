import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// TopicLessonDiscovery is a pretesting layout: per context group the learner
// GUESSES up to 3 terms (Stage A) before seeing a full teaching card, then a
// consolidation screen shows the whole group (Stage B). One point per correct
// guess; finalizeLesson runs exactly once at the summary.

describe('TopicLessonDiscovery', () => {
  let TopicLessonDiscovery;
  let canRender;
  let LAYOUT_META;

  // Minimal DOM stubs following the pattern from topic-lesson-engine.test.js
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
    };
    globalThis.CSS = { escape: (s) => s };
    globalThis.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn() }));

    vi.resetModules();
    ({ TopicLessonDiscovery, canRender, LAYOUT_META } =
      await import('../js/topics/TopicLessonDiscovery.js'));
  });

  afterEach(async () => {
    // markIntroduced schedules a debounced IndexedDB save; drop the timer so
    // it never fires in an environment without indexedDB.
    const { masteryService } = await import('../js/services/MasteryService.js');
    if (masteryService._saveTimer) clearTimeout(masteryService._saveTimer);
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
      example: 'Enable the firewall = Attiva il firewall',
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
      italian: 'frode informatica',
      context: 'social-engineering',
      example: 'A phishing email',
      note: 'Email ingannevole.',
    },
    {
      english: 'pretexting',
      italian: 'pretesto',
      context: 'social-engineering',
    },
    {
      english: 'malware',
      italian: 'software malevolo',
      context: 'malware',
      command: 'clamscan -r /home',
    },
  ];

  const makeLesson = (items = lessonItems()) => ({
    id: 'lesson-1',
    title: 'Test Lesson',
    description: 'desc',
    items,
  });

  const makeContainer = () => ({
    innerHTML: '',
    querySelectorAll: vi.fn(() => []),
    querySelector: vi.fn(() => null),
  });

  const wireDom = (container) => {
    const titleEl = { textContent: '' };
    const progressEl = { textContent: '' };
    globalThis.document.getElementById = vi.fn((id) => {
      if (id === 'topic-lesson-content') return container;
      if (id === 'topic-lesson-title') return titleEl;
      if (id === 'topic-lesson-progress') return progressEl;
      return null;
    });
    return { titleEl, progressEl };
  };

  const correctIndexFor = (guess) => guess.options.indexOf(guess.item.italian);

  const wrongIndexFor = (guess) => {
    const idx = guess.options.findIndex((opt) => opt !== guess.item.italian);
    return idx === -1 ? correctIndexFor(guess) : idx;
  };

  /** Drive a started lesson through every guess and group to the summary. */
  const runToSummary = (engine, answerCorrectly) => {
    engine.beginGroups();
    for (let g = 0; g < engine.contextGroups.length; g++) {
      const guesses = engine._guessPlan[g];
      for (const guess of guesses) {
        engine.handleGuess(answerCorrectly ? correctIndexFor(guess) : wrongIndexFor(guess));
        engine.advanceAfterReveal();
      }
      engine.advanceGroup();
    }
  };

  // ── 1. Metadata + canRender ───────────────────────

  it('exports bilingual layout metadata', () => {
    expect(LAYOUT_META.id).toBe('discovery');
    expect(LAYOUT_META.name).toBeTruthy();
    expect(LAYOUT_META.nameIt).toBe('Scoperta');
    expect(LAYOUT_META.description).toBeTruthy();
    expect(LAYOUT_META.descriptionIt).toBeTruthy();
  });

  it('canRender rejects lessons that cannot host a real guess', () => {
    expect(canRender(null)).toBe(false);
    expect(canRender({})).toBe(false);
    expect(canRender({ items: [] })).toBe(false);
    // Single item: no distractor pool at all
    expect(canRender(makeLesson([lessonItems()[0]]))).toBe(false);
    // Two items sharing one Italian meaning: options would collapse to one
    expect(
      canRender(
        makeLesson([
          { english: 'firewall', italian: 'firewall', context: 'a' },
          { english: 'the firewall', italian: 'firewall', context: 'b' },
        ])
      )
    ).toBe(false);
  });

  it('canRender accepts a normal lesson (function and static agree)', () => {
    const lesson = makeLesson();
    expect(canRender(lesson)).toBe(true);
    expect(TopicLessonDiscovery.canRender(lesson)).toBe(true);
  });

  // ── 2. start() robustness ─────────────────────────

  it('start() does not throw without a DOM', () => {
    const engine = new TopicLessonDiscovery(mockProgressManager());
    expect(() => engine.start(makeLesson(), 'cybersecurity', 1)).not.toThrow();
    expect(engine.contextGroups).toHaveLength(3);
    // 2 + 2 + 1 guessable items, capped at 3 per group
    expect(engine.totalQuestions).toBe(5);
  });

  it('start() plans at most 3 guesses per context group', () => {
    const items = Array.from({ length: 6 }, (_, i) => ({
      english: `term-${i}`,
      italian: `termine-${i}`,
      context: 'same-group',
    }));
    const engine = new TopicLessonDiscovery(mockProgressManager());
    engine.start(makeLesson(items), 'cybersecurity', 1);
    expect(engine._guessPlan[0]).toHaveLength(3);
    expect(engine.totalQuestions).toBe(3);
  });

  // ── 3. Guess handling ─────────────────────────────

  it('renders the intro, then a guess screen with options', () => {
    const engine = new TopicLessonDiscovery(mockProgressManager());
    const container = makeContainer();
    const { progressEl } = wireDom(container);

    engine.start(makeLesson(), 'cybersecurity', 1);
    expect(container.innerHTML).toContain('Inizia a Indovinare / Start Guessing');

    engine.beginGroups();
    const guess = engine._guessPlan[0][0];
    expect(container.innerHTML).toContain(guess.item.english);
    expect(container.innerHTML).toContain('data-action="lessonDiscovery.guess"');
    expect(progressEl.textContent).toContain('Indovina / Guess');
  });

  it('scores a correct guess and reveals the teaching card', () => {
    const engine = new TopicLessonDiscovery(mockProgressManager());
    const container = makeContainer();
    wireDom(container);

    engine.start(makeLesson(), 'cybersecurity', 1);
    engine.beginGroups();

    const guess = engine._guessPlan[0][0];
    engine.handleGuess(correctIndexFor(guess));

    expect(engine.correctCount).toBe(1);
    expect(engine.wrongItems).toHaveLength(0);
    expect(guess.answered).toBe(true);
    expect(container.innerHTML).toContain('Ottima intuizione');
    expect(container.innerHTML).toContain(guess.item.italian);

    // Answering again must not double-score
    engine.handleGuess(correctIndexFor(guess));
    expect(engine.correctCount).toBe(1);
  });

  it('treats a wrong guess as teaching, not failure', () => {
    const engine = new TopicLessonDiscovery(mockProgressManager());
    const container = makeContainer();
    wireDom(container);

    engine.start(makeLesson(), 'cybersecurity', 1);
    engine.beginGroups();

    const guess = engine._guessPlan[0][0];
    engine.handleGuess(wrongIndexFor(guess));

    expect(engine.correctCount).toBe(0);
    expect(engine.wrongItems).toContain(guess.item);
    expect(container.innerHTML).toContain('ora lo sai');
    // The reveal still teaches the real meaning
    expect(container.innerHTML).toContain(guess.item.italian);
  });

  it('advances guess -> guess -> consolidation -> next group', () => {
    const engine = new TopicLessonDiscovery(mockProgressManager());
    const container = makeContainer();
    wireDom(container);

    engine.start(makeLesson(), 'cybersecurity', 1);
    engine.beginGroups();

    const groupGuesses = engine._guessPlan[0];
    expect(groupGuesses).toHaveLength(2);

    engine.handleGuess(correctIndexFor(groupGuesses[0]));
    engine.advanceAfterReveal();
    expect(engine.guessIndex).toBe(1);

    engine.handleGuess(correctIndexFor(groupGuesses[1]));
    engine.advanceAfterReveal();
    expect(container.innerHTML).toContain('Consolida / Consolidate');

    engine.advanceGroup();
    expect(engine.groupIndex).toBe(1);
    expect(container.innerHTML).toContain('data-action="lessonDiscovery.guess"');
  });

  it('ignores out-of-order actions so a double-tap can never skip a stage', () => {
    const engine = new TopicLessonDiscovery(mockProgressManager());
    const container = makeContainer();
    wireDom(container);
    engine.start(makeLesson(), 'cybersecurity', 1);

    // Guessing from the intro must neither score nor consume a question
    engine.handleGuess(0);
    expect(engine.correctCount).toBe(0);
    expect(engine._guessPlan[0][0].answered).toBe(false);

    engine.beginGroups();
    // A stray "next" on a guess screen must not skip the unanswered guess
    engine.advanceAfterReveal();
    expect(engine.guessIndex).toBe(0);
    // A stray "nextGroup" during Stage A must not skip the group
    engine.advanceGroup();
    expect(engine.groupIndex).toBe(0);

    // While the reveal shows, "begin" and "guess" must be inert
    const guess = engine._guessPlan[0][0];
    engine.handleGuess(correctIndexFor(guess));
    engine.beginGroups();
    engine.handleGuess(correctIndexFor(guess));
    expect(engine.correctCount).toBe(1);
    expect(engine.guessIndex).toBe(0);
    expect(container.innerHTML).toContain('data-action="lessonDiscovery.next"');
  });

  it('ignores an out-of-range or non-numeric option index', () => {
    const engine = new TopicLessonDiscovery(mockProgressManager());
    const container = makeContainer();
    wireDom(container);
    engine.start(makeLesson(), 'cybersecurity', 1);
    engine.beginGroups();

    engine.handleGuess(99);
    engine.handleGuess(NaN);
    engine.handleGuess(-1);
    expect(engine.correctCount).toBe(0);
    expect(engine.wrongItems).toHaveLength(0);
    expect(engine._guessPlan[0][0].answered).toBe(false);
  });

  it('emits no inline on*= handlers on any screen (CSP)', () => {
    const engine = new TopicLessonDiscovery(mockProgressManager());
    const container = makeContainer();
    wireDom(container);
    const screens = [];

    engine.start(makeLesson(), 'cybersecurity', 1);
    screens.push(container.innerHTML); // intro
    engine.beginGroups();
    screens.push(container.innerHTML); // Stage A guess
    engine.handleGuess(wrongIndexFor(engine._guessPlan[0][0]));
    screens.push(container.innerHTML); // reveal, taught branch
    engine.advanceAfterReveal();
    engine.handleGuess(correctIndexFor(engine._guessPlan[0][1]));
    screens.push(container.innerHTML); // reveal, correct branch
    engine.advanceAfterReveal();
    screens.push(container.innerHTML); // consolidation
    engine.advanceGroup();
    for (let g = 1; g < engine.contextGroups.length; g++) {
      for (const guess of engine._guessPlan[g]) {
        engine.handleGuess(correctIndexFor(guess));
        engine.advanceAfterReveal();
      }
      engine.advanceGroup();
    }
    screens.push(container.innerHTML); // summary

    expect(screens).toHaveLength(6);
    for (const html of screens) {
      expect(html).not.toMatch(/\son[a-z]+\s*=/i);
    }
  });

  // ── 4. Summary + persistence ──────────────────────

  it('finalizes exactly once with full marks on a perfect run', () => {
    const pm = mockProgressManager();
    const engine = new TopicLessonDiscovery(pm);
    const container = makeContainer();
    const { titleEl } = wireDom(container);

    engine.start(makeLesson(), 'cybersecurity', 1);
    runToSummary(engine, true);

    expect(engine.correctCount).toBe(5);
    // ratio 1.0 => 3 stars; XP = 5*10 + 20 completion + 15 perfect = 85
    expect(pm.updateTopicLessonStars).toHaveBeenCalledWith('cybersecurity', 1, 'lesson-1', 3);
    expect(pm.addXP).toHaveBeenCalledWith(85);
    expect(pm.completeTopicLesson).toHaveBeenCalledTimes(1);
    expect(titleEl.textContent).toBe('Completata! / Completed!');
    // The '/' in the layout label is HTML-escaped by renderSummaryHtml
    expect(container.innerHTML).toContain('summary-layout-badge');
    expect(container.innerHTML).toContain('Scoperta');

    // A second summary render must not double-persist
    engine.renderSummary();
    expect(pm.completeTopicLesson).toHaveBeenCalledTimes(1);
    expect(pm.addXP).toHaveBeenCalledTimes(1);
  });

  it('lists wrongly guessed terms for review on an all-wrong run', () => {
    const pm = mockProgressManager();
    const engine = new TopicLessonDiscovery(pm);
    const container = makeContainer();
    wireDom(container);

    engine.start(makeLesson(), 'cybersecurity', 1);
    runToSummary(engine, false);

    expect(engine.correctCount).toBe(0);
    expect(engine.wrongItems).toHaveLength(5);
    // ratio 0 => 1 star; XP = 20 completion bonus only
    expect(pm.updateTopicLessonStars).toHaveBeenCalledWith('cybersecurity', 1, 'lesson-1', 1);
    expect(pm.addXP).toHaveBeenCalledWith(20);
    expect(container.innerHTML).toContain('Termini da Ripassare / Terms to Review');
  });

  // ── 5. Robustness ─────────────────────────────────

  it('never renders "undefined" for sparse items or examples without " = "', () => {
    const items = [
      { english: 'kernel', italian: 'nucleo', context: 'os', example: 'The kernel panicked' },
      { english: 'shell', italian: 'interprete', context: 'os' },
    ];
    const engine = new TopicLessonDiscovery(mockProgressManager());
    const container = makeContainer();
    wireDom(container);

    engine.start(makeLesson(items), 'linux', 2);
    runToSummary(engine, true);

    expect(container.innerHTML).not.toContain('undefined');
    expect(engine._finalized).toBe(true);
  });

  it('degrades gracefully on a forced single-item lesson', () => {
    const items = [{ english: 'daemon', italian: 'demone', context: 'os' }];
    const lesson = makeLesson(items);
    expect(canRender(lesson)).toBe(false);

    const engine = new TopicLessonDiscovery(mockProgressManager());
    const container = makeContainer();
    wireDom(container);

    // Registry should fall back, but a forced start must still not throw
    expect(() => {
      engine.start(lesson, 'linux', 1);
      runToSummary(engine, true);
    }).not.toThrow();
    expect(container.innerHTML).not.toContain('undefined');
  });

  it('reaches the summary without NaN when no item is guessable (0 questions)', () => {
    // No `italian` field anywhere: every group's guess plan is empty, so the
    // flow is intro -> consolidation per group -> summary with 0/0 answers.
    const items = [
      { english: 'alpha', context: 'a' },
      { english: 'beta', context: 'b' },
    ];
    const lesson = makeLesson(items);
    expect(canRender(lesson)).toBe(false);

    const pm = mockProgressManager();
    const engine = new TopicLessonDiscovery(pm);
    const container = makeContainer();
    wireDom(container);

    engine.start(lesson, 'linux', 1);
    expect(engine.totalQuestions).toBe(0);
    expect(() => runToSummary(engine, true)).not.toThrow();

    expect(engine._finalized).toBe(true);
    // ratio 0/0 => 1 star, XP = completion bonus only; never NaN
    expect(pm.updateTopicLessonStars).toHaveBeenCalledWith('linux', 1, 'lesson-1', 1);
    expect(pm.addXP).toHaveBeenCalledWith(20);
    expect(container.innerHTML).toContain('0/0');
    expect(container.innerHTML).not.toContain('NaN');
    expect(container.innerHTML).not.toContain('undefined');
  });
});
