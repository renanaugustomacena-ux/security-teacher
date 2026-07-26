import { describe, it, expect, beforeEach, vi } from 'vitest';

// LessonV2Engine is the redesigned teach-then-practice lesson loop used by the
// cybersecurity pilot. These tests stub the DOM the same way
// topic-lesson-engine.test.js does (no jsdom in this project).

describe('LessonV2Engine', () => {
  let LessonV2Engine;

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
          dataset: {},
          textContent: '',
          style: {},
          addEventListener: vi.fn(),
          querySelectorAll: vi.fn(() => []),
          querySelector: vi.fn(() => null),
        };
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
    ({ LessonV2Engine } = await import('../js/topics/lesson2/LessonV2Engine.js'));
  });

  const mockProgressManager = () => ({
    updateTopicLessonStars: vi.fn(),
    completeTopicLesson: vi.fn(),
    incrementDailyLessons: vi.fn(),
    incrementDailyWords: vi.fn(),
    addXP: vi.fn(),
  });

  const items = () => [
    { english: 'Firewall', italian: 'muro di fuoco', context: 'defense', example: 'Enable the firewall. = Abilita il firewall.' },
    { english: 'Password', italian: 'parola d\'ordine', context: 'auth', example: 'Use a strong password. = Usa una password robusta.' },
    { english: 'Malware', italian: 'software malevolo', context: 'malware', example: 'Detect malware early. = Rileva il malware presto.' },
    { english: 'Exploit', italian: 'exploit', context: 'malware', example: 'The exploit ran. = L\'exploit e\' partito.' },
    { english: 'Threat', italian: 'minaccia', context: 'general', example: 'A new threat emerged. = Una nuova minaccia e\' emersa.' },
  ];

  it('constructs without touching the DOM', () => {
    const engine = new LessonV2Engine(mockProgressManager());
    expect(engine).toBeInstanceOf(LessonV2Engine);
    expect(engine.totalCorrect).toBe(0);
    expect(engine.plan.exercises).toEqual([]);
  });

  it('_buildChunks splits items into two balanced chunks, contexts kept together', () => {
    const engine = new LessonV2Engine(mockProgressManager());
    const chunks = engine._buildChunks(items());
    expect(chunks.A.length + chunks.B.length).toBe(5);
    // 5 items -> A gets ceil(5/2)=3, B gets 2
    expect(chunks.A).toHaveLength(3);
    expect(chunks.B).toHaveLength(2);
  });

  it('renderSummary computes stars/XP from accuracy and persists progress', () => {
    const pm = mockProgressManager();
    const engine = new LessonV2Engine(pm);

    const container = { innerHTML: '', querySelector: vi.fn(() => null), querySelectorAll: vi.fn(() => []) };
    globalThis.document.getElementById = vi.fn((id) =>
      id === 'topic-lesson-content' ? container : { textContent: '', innerHTML: '' }
    );

    engine.container = container;
    engine.lesson = { id: 'cyber_basics_1', title: 'Essential Terms', items: items() };
    engine.topicId = 'cybersecurity';
    engine.levelNum = 0;
    engine.allItems = items();
    engine.answeredKeys = new Set();

    // 9/10 correct -> accuracy 0.9 -> 3 stars, not perfect -> XP = 9*10 + 20 = 110
    engine.totalAnswered = 10;
    engine.totalCorrect = 9;
    engine.renderSummary();
    expect(pm.updateTopicLessonStars).toHaveBeenCalledWith('cybersecurity', 0, 'cyber_basics_1', 3);
    expect(pm.completeTopicLesson).toHaveBeenCalledWith('cybersecurity', 0, 'cyber_basics_1');
    expect(pm.addXP).toHaveBeenCalledWith(110);

    // Perfect run -> XP = 10*10 + 20 + 15 = 135
    engine.totalCorrect = 10;
    engine.renderSummary();
    expect(pm.addXP).toHaveBeenCalledWith(135);
  });

  it('registers a full 8-beat plan and advances through beats', () => {
    const engine = new LessonV2Engine(mockProgressManager());
    const container = { innerHTML: '', querySelector: vi.fn(() => null), querySelectorAll: vi.fn(() => []) };
    globalThis.document.getElementById = vi.fn((id) =>
      id === 'topic-lesson-content' ? container : { textContent: '', innerHTML: '' }
    );
    engine.container = container;
    engine.lesson = { id: 'cyber_basics_1', title: 'Essential Terms', items: items() };
    engine.topicId = 'cybersecurity';
    engine.levelNum = 0;
    engine.allItems = items();
    engine.chunks = engine._buildChunks(items());
    engine.warmup = { cards: [], index: 0, correct: 0 };

    // No warmup cards -> first render skips straight to presentA and paints DOM.
    engine.beatPtr = 0;
    engine._renderBeat();
    expect(container.innerHTML).toContain('v2-present');
  });
});
