import { describe, it, expect, beforeEach, vi } from 'vitest';

// TopicLessonStory is the narrative-cloze layout: it chains the item `example`
// sentences into a running passage (Stage A: fill numbered blanks from a word
// bank, graded all at once), then re-reads the passage with its Italian
// translation (Stage B), then a shared summary via finalizeLesson().

describe('TopicLessonStory', () => {
  let TopicLessonStory;
  let canRender;
  let LAYOUT_META;
  let masteryService;

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
      createElement: vi.fn(() => ({ textContent: '', innerHTML: '' })),
    };
    globalThis.CSS = { escape: (s) => s };
    globalThis.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn() }));

    vi.resetModules();
    ({ TopicLessonStory, canRender, LAYOUT_META } =
      await import('../js/topics/TopicLessonStory.js'));
    ({ masteryService } = await import('../js/services/MasteryService.js'));
    // Avoid the debounced IndexedDB save timer during tests
    vi.spyOn(masteryService, 'markIntroduced').mockImplementation(() => {});
  });

  // ── Fixtures ──────────────────────────────────────

  const mockProgressManager = () => ({
    updateTopicLessonStars: vi.fn(),
    completeTopicLesson: vi.fn(),
    incrementDailyLessons: vi.fn(),
    incrementDailyWords: vi.fn(),
    addXP: vi.fn(),
  });

  // 4 usable items: network-security (2), social-engineering (1), defense (1).
  // buildStoryEntries orders largest context group first, so the passage order
  // is: firewall, router, phishing, backup.
  const storyItems = () => [
    {
      english: 'firewall',
      italian: 'il firewall',
      context: 'network-security',
      example: 'Enable the firewall before connecting. = Attiva il firewall prima di connetterti.',
    },
    {
      english: 'router',
      italian: 'il router',
      context: 'network-security',
      example: 'The router forwards every packet. = Il router inoltra ogni pacchetto.',
    },
    {
      english: 'phishing',
      italian: 'il phishing',
      context: 'social-engineering',
      example: 'A phishing email steals credentials.',
    },
    {
      english: 'backup',
      italian: 'la copia di sicurezza',
      context: 'defense',
      example: 'Always verify the backup at night. = Verifica sempre la copia di notte.',
    },
  ];

  const storyLesson = () => ({
    id: 'lesson-story-1',
    title: 'Test Story Lesson',
    description: 'desc',
    items: storyItems(),
  });

  const wireDom = (engine) => {
    const container = { innerHTML: '' };
    const headerEls = {};
    globalThis.document.getElementById = vi.fn((id) => {
      if (id === 'topic-lesson-content') return container;
      if (!headerEls[id]) headerEls[id] = { textContent: '', innerHTML: '' };
      return headerEls[id];
    });
    return { container, headerEls, engine };
  };

  const pickTerm = (engine, term) => {
    const b = engine.bank.findIndex((w) => !w.used && w.term === term);
    engine.pickWord(b);
  };

  const entryOrder = (engine) => engine.entries.map((e) => e.item.english);

  // ── 1. Metadata + canRender ───────────────────────

  it('exports LAYOUT_META with the story id', () => {
    expect(LAYOUT_META.id).toBe('story');
    expect(LAYOUT_META.nameIt).toBe('Storia');
  });

  it('canRender is true when at least 3 examples contain their english term', () => {
    expect(canRender(storyLesson())).toBe(true);
    expect(TopicLessonStory.canRender(storyLesson())).toBe(true);
  });

  it('canRender is false with fewer than 3 usable items', () => {
    expect(canRender(null)).toBe(false);
    expect(canRender({ items: [] })).toBe(false);

    // Terms absent from the example, missing examples, single item
    const unusable = {
      items: [
        { english: 'firewall', italian: 'x', example: 'Turn on the protection. = Attivala.' },
        { english: 'router', italian: 'x', example: 'It forwards packets.' },
        { english: 'phishing', italian: 'x' },
      ],
    };
    expect(canRender(unusable)).toBe(false);

    // Only 2 usable -> still false (strict minimum of 3)
    const twoUsable = {
      items: [storyItems()[0], storyItems()[1], { english: 'patch', italian: 'x' }],
    };
    expect(canRender(twoUsable)).toBe(false);
  });

  it('canRender matches terms case-insensitively and escapes regex metacharacters', () => {
    const lesson = {
      items: [
        { english: 'Firewall', italian: 'x', example: 'Enable the FIREWALL now. = Attivalo.' },
        { english: 'C++ (language)', italian: 'x', example: 'We use C++ (language) daily.' },
        { english: 'router', italian: 'x', example: 'The router works. = Il router funziona.' },
      ],
    };
    expect(canRender(lesson)).toBe(true);
  });

  // ── 2. start() + entry selection ──────────────────

  it('start() renders the intro without throwing', () => {
    const engine = new TopicLessonStory(mockProgressManager());
    const { container, headerEls } = wireDom(engine);

    expect(() => engine.start(storyLesson(), 'cybersecurity', 1)).not.toThrow();
    expect(container.innerHTML).toContain('Inizia la storia / Start the story');
    expect(headerEls['topic-lesson-title'].textContent).toBe('Test Story Lesson');
  });

  it('start() does not throw when the container is missing', () => {
    const engine = new TopicLessonStory(mockProgressManager());
    globalThis.document.getElementById = vi.fn(() => null);
    expect(() => engine.start(storyLesson(), 'cybersecurity', 1)).not.toThrow();
  });

  it('drops items whose term does not appear in the example', () => {
    const engine = new TopicLessonStory(mockProgressManager());
    wireDom(engine);
    const lesson = storyLesson();
    lesson.items.push({
      english: 'exploit',
      italian: 'exploit',
      context: 'defense',
      example: 'The attacker got in. = L’attaccante è entrato.',
    });

    engine.start(lesson, 'cybersecurity', 1);
    expect(engine.entries).toHaveLength(4);
    expect(entryOrder(engine)).not.toContain('exploit');
  });

  it('keeps same-context sentences adjacent, largest group first', () => {
    const engine = new TopicLessonStory(mockProgressManager());
    wireDom(engine);
    engine.start(storyLesson(), 'cybersecurity', 1);
    expect(entryOrder(engine)).toEqual(['firewall', 'router', 'phishing', 'backup']);
  });

  it('caps the passage at 6 blanks and keeps bank and slots in lockstep', () => {
    const engine = new TopicLessonStory(mockProgressManager());
    wireDom(engine);
    const items = Array.from({ length: 9 }, (_, i) => ({
      english: `term${i}`,
      italian: `it${i}`,
      context: i < 5 ? 'big' : 'small',
      example: `Use term${i} daily. = Usa term${i}.`,
    }));
    engine.start({ id: 'cap', title: 'Cap', description: '', items }, 'cybersecurity', 1);

    expect(engine.entries).toHaveLength(6);
    expect(engine.bank).toHaveLength(6);
    expect(engine.slotFill).toHaveLength(6);
    // The largest context group (5 items) leads and stays adjacent
    expect(entryOrder(engine).slice(0, 5)).toEqual(['term0', 'term1', 'term2', 'term3', 'term4']);
  });

  // ── 3. Stage A: word bank + slots ─────────────────

  it('renderStageA shows numbered blanks and a full word bank', () => {
    const engine = new TopicLessonStory(mockProgressManager());
    const { container } = wireDom(engine);
    engine.start(storyLesson(), 'cybersecurity', 1);
    engine.renderStageA();

    expect(engine.bank).toHaveLength(4);
    expect(container.innerHTML).toContain('story-bank');
    expect(container.innerHTML).toContain('lessonStory.pickWord');
    expect(container.innerHTML).toContain('Verifica / Check');
    // Check button itself is disabled until every slot is filled
    expect(container.innerHTML).toMatch(/data-action="lessonStory\.check"\s+disabled/);
    expect(masteryService.markIntroduced).toHaveBeenCalled();
  });

  it('pickWord fills the first empty slot; clearSlot returns the word to the bank', () => {
    const engine = new TopicLessonStory(mockProgressManager());
    wireDom(engine);
    engine.start(storyLesson(), 'cybersecurity', 1);
    engine.renderStageA();

    pickTerm(engine, 'router');
    expect(engine.slotFill[0]).toBeGreaterThanOrEqual(0);
    expect(engine.bank[engine.slotFill[0]].term).toBe('router');
    expect(engine.bank[engine.slotFill[0]].used).toBe(true);

    engine.clearSlot(0);
    expect(engine.slotFill[0]).toBe(-1);
    expect(engine.bank.every((w) => !w.used)).toBe(true);

    // Invalid indexes are ignored
    expect(() => engine.pickWord(99)).not.toThrow();
    expect(() => engine.clearSlot(99)).not.toThrow();
  });

  it('checkSlots is a no-op until every slot is filled', () => {
    const engine = new TopicLessonStory(mockProgressManager());
    wireDom(engine);
    engine.start(storyLesson(), 'cybersecurity', 1);
    engine.renderStageA();

    pickTerm(engine, 'firewall');
    engine.checkSlots();
    expect(engine.checked).toBe(false);
  });

  it('checkSlots grades all slots at once and corrects wrong ones in place', () => {
    const engine = new TopicLessonStory(mockProgressManager());
    const { container } = wireDom(engine);
    engine.start(storyLesson(), 'cybersecurity', 1);
    engine.renderStageA();

    // Swap the first two placements, fill the rest correctly
    pickTerm(engine, 'router');
    pickTerm(engine, 'firewall');
    pickTerm(engine, 'phishing');
    pickTerm(engine, 'backup');

    // Every slot filled -> the check button is enabled now
    expect(container.innerHTML).not.toMatch(/data-action="lessonStory\.check"\s+disabled/);

    engine.checkSlots();

    expect(engine.checked).toBe(true);
    expect(engine.slotResults).toEqual([false, false, true, true]);
    expect(engine.correctCount).toBe(2);
    expect(container.innerHTML).toContain('story-slot-correct');
    expect(container.innerHTML).toContain('story-slot-fixed');
    expect(container.innerHTML).toContain('Continua / Continue');

    // Grading is one-shot: picks and re-checks are ignored afterwards
    engine.checkSlots();
    engine.pickWord(0);
    expect(engine.correctCount).toBe(2);
  });

  // ── 4. Stage B + summary persistence ──────────────

  it('renderStageB shows Italian halves, uses a gloss when absent, never "undefined"', () => {
    const engine = new TopicLessonStory(mockProgressManager());
    const { container } = wireDom(engine);
    engine.start(storyLesson(), 'cybersecurity', 1);
    engine.renderStageA();
    ['firewall', 'router', 'phishing', 'backup'].forEach((t) => pickTerm(engine, t));
    engine.checkSlots();
    engine.renderStageB();

    expect(container.innerHTML).toContain('Il router inoltra ogni pacchetto.');
    // phishing has no ' = ' half -> gloss with the item's italian term
    expect(container.innerHTML).toContain('story-gloss');
    expect(container.innerHTML).toContain('il phishing');
    expect(container.innerHTML).not.toContain('undefined');
  });

  it('ignores translation/finish dispatches that arrive before grading', () => {
    const pm = mockProgressManager();
    const engine = new TopicLessonStory(pm);
    const { container } = wireDom(engine);
    engine.start(storyLesson(), 'cybersecurity', 1);
    engine.renderStageA();
    const stageAHtml = container.innerHTML;

    // The actions live on the global dispatcher, so a stray dispatch must not
    // reveal Stage B answers or persist stars/XP for an unplayed lesson.
    engine.renderStageB();
    expect(container.innerHTML).toBe(stageAHtml);
    engine.renderSummary();
    expect(engine.finalized).toBe(false);
    expect(pm.addXP).not.toHaveBeenCalled();
    expect(pm.completeTopicLesson).not.toHaveBeenCalled();
  });

  it('renderSummary finalizes exactly once with the slot score', () => {
    const pm = mockProgressManager();
    const engine = new TopicLessonStory(pm);
    wireDom(engine);
    engine.start(storyLesson(), 'cybersecurity', 2);
    engine.renderStageA();
    ['firewall', 'router', 'phishing', 'backup'].forEach((t) => pickTerm(engine, t));
    engine.checkSlots();
    engine.renderStageB();
    engine.renderSummary();

    // Perfect: 4/4 -> 3 stars, XP = 4*10 + 20 completion + 15 perfect = 75
    expect(pm.updateTopicLessonStars).toHaveBeenCalledWith('cybersecurity', 2, 'lesson-story-1', 3);
    expect(pm.addXP).toHaveBeenCalledWith(75);
    expect(pm.completeTopicLesson).toHaveBeenCalledTimes(1);

    // finalizeLesson must run exactly once even if finish is tapped again
    engine.renderSummary();
    expect(pm.addXP).toHaveBeenCalledTimes(1);
  });

  it('a partial score earns partial stars', () => {
    const pm = mockProgressManager();
    const engine = new TopicLessonStory(pm);
    wireDom(engine);
    engine.start(storyLesson(), 'cybersecurity', 1);
    engine.renderStageA();
    pickTerm(engine, 'router');
    pickTerm(engine, 'firewall');
    pickTerm(engine, 'phishing');
    pickTerm(engine, 'backup');
    engine.checkSlots();
    engine.renderSummary();

    // 2/4 -> ratio 0.5 -> 2 stars, XP = 2*10 + 20 completion = 40
    expect(pm.updateTopicLessonStars).toHaveBeenCalledWith('cybersecurity', 1, 'lesson-story-1', 2);
    expect(pm.addXP).toHaveBeenCalledWith(40);
  });

  // ── 5. Robustness ─────────────────────────────────

  it('degrades gracefully on a single-item lesson (canRender false path)', () => {
    const pm = mockProgressManager();
    const engine = new TopicLessonStory(pm);
    const { container } = wireDom(engine);
    const lesson = { id: 'solo', title: 'Solo', description: '', items: [storyItems()[0]] };

    expect(canRender(lesson)).toBe(false);
    expect(() => engine.start(lesson, 'cybersecurity', 1)).not.toThrow();
    expect(container.innerHTML).toContain('Torna al Livello / Back to Level');
    expect(pm.addXP).not.toHaveBeenCalled();
  });

  it('escapes item-supplied HTML in every stage and emits no inline handler attributes', () => {
    const engine = new TopicLessonStory(mockProgressManager());
    const { container } = wireDom(engine);
    const items = [
      {
        english: 'x"y <img src=x onerror=alert(1)>',
        italian: 'attacco "uno"',
        context: 'a',
        example: 'Run x"y <img src=x onerror=alert(1)> now. = Frase "cattiva".',
      },
      {
        english: 'rm -rf &',
        italian: "cancella l'albero",
        context: 'a',
        example: 'Never rm -rf & blindly.',
      },
      {
        english: "o'brien",
        italian: "l'utente",
        context: 'b',
        example: "Ask o'brien first. = Chiedi prima.",
      },
    ];
    const lesson = { id: 'spiky', title: '<script>t</script>', description: 'd', items };
    // A real inline handler would sit inside a tag; escaped text cannot match
    // because its `<` is encoded, so any hit here is a genuine on*= attribute.
    const inlineHandler = /<[^>]*\son\w+=/;

    expect(canRender(lesson)).toBe(true);
    engine.start(lesson, 'cybersecurity', 1);
    expect(container.innerHTML).not.toContain('<script');

    engine.renderStageA();
    expect(container.innerHTML).not.toContain('<img');
    expect(container.innerHTML).toContain('&lt;img');
    expect(container.innerHTML).not.toMatch(inlineHandler);

    entryOrder(engine).forEach((t) => pickTerm(engine, t));
    engine.checkSlots();
    expect(container.innerHTML).not.toContain('<img');
    expect(container.innerHTML).not.toMatch(inlineHandler);

    engine.renderStageB();
    expect(container.innerHTML).not.toContain('<img');
    expect(container.innerHTML).not.toMatch(inlineHandler);

    engine.renderSummary();
    expect(container.innerHTML).not.toContain('<img');
    expect(container.innerHTML).not.toContain('undefined');
  });

  it('handles items without example/pronunciation/note fields', () => {
    const engine = new TopicLessonStory(mockProgressManager());
    const { container } = wireDom(engine);
    const lesson = {
      id: 'sparse',
      title: 'Sparse',
      description: '',
      items: [
        { english: 'terminal', italian: 'terminale' },
        ...storyItems().map(({ pronunciation, note, ...rest }) => rest),
      ],
    };

    expect(() => engine.start(lesson, 'cybersecurity', 1)).not.toThrow();
    engine.renderStageA();
    expect(engine.entries).toHaveLength(4);
    expect(container.innerHTML).not.toContain('undefined');
  });
});
