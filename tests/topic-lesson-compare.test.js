/* eslint-disable import/first */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// TopicLessonCompare teaches in contrasting pairs: Stage A shows two items
// side by side (Confronta / Compare), Stage B asks 2 forced-binary
// discriminating questions (Distingui / Distinguish), then the summary.

vi.mock('../js/services/StorageService.js', () => ({
  storageService: {
    load: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  },
}));

describe('TopicLessonCompare', () => {
  let TopicLessonCompare;
  let canRender;
  let buildPairs;
  let maskTerm;
  let buildClue;
  let container;
  let titleEl;
  let progressEl;

  beforeEach(async () => {
    container = {
      innerHTML: '',
      querySelectorAll: vi.fn(() => []),
      querySelector: vi.fn(() => null),
    };
    titleEl = { textContent: '' };
    progressEl = { textContent: '' };
    globalThis.document = {
      body: { addEventListener: vi.fn(), contains: vi.fn(() => true) },
      addEventListener: vi.fn(),
      getElementById: vi.fn((id) => {
        if (id === 'topic-lesson-content') return container;
        if (id === 'topic-lesson-title') return titleEl;
        if (id === 'topic-lesson-progress') return progressEl;
        return null;
      }),
    };

    vi.resetModules();
    ({ TopicLessonCompare, canRender, buildPairs, maskTerm, buildClue } =
      await import('../js/topics/TopicLessonCompare.js'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ── Fixtures ──────────────────────────────────────

  const mockProgressManager = () => ({
    updateTopicLessonStars: vi.fn(),
    completeTopicLesson: vi.fn(),
    incrementDailyLessons: vi.fn(),
    incrementDailyWords: vi.fn(),
    addXP: vi.fn(),
  });

  const pairableLesson = () => ({
    id: 'lesson-1',
    title: 'Network Basics',
    description: 'desc',
    items: [
      {
        english: 'firewall',
        italian: 'muro tagliafuoco',
        context: 'network',
        pronunciation: 'FAJR-wol',
        example: 'Enable the firewall = Attiva il firewall',
      },
      {
        english: 'router',
        italian: 'instradatore',
        context: 'network',
        note: 'Instrada i pacchetti tra reti.',
        example: 'Configure the router = Configura il router',
      },
    ],
  });

  // ── 1. canRender ──────────────────────────────────

  it('canRender is false for missing, empty, or single-item lessons', () => {
    expect(canRender(null)).toBe(false);
    expect(canRender({})).toBe(false);
    expect(canRender({ items: [] })).toBe(false);
    expect(canRender({ items: [{ english: 'patch', italian: 'correzione' }] })).toBe(false);
  });

  it('canRender is false when no pair has two truly distinct terms', () => {
    const twins = {
      items: [
        { english: 'cache', italian: 'cache', context: 'memory' },
        { english: 'Cache', italian: 'cache', context: 'memory' },
      ],
    };
    expect(canRender(twins)).toBe(false);
  });

  it('canRender is true for a lesson with at least one askable pair', () => {
    expect(canRender(pairableLesson())).toBe(true);
    expect(TopicLessonCompare.canRender(pairableLesson())).toBe(true);
  });

  // ── 2. Pair building ──────────────────────────────

  it('buildPairs pairs within groups and carries odd leftovers to the next group', () => {
    const items = [
      { english: 'a1', italian: 'ia1', context: 'alpha' },
      { english: 'a2', italian: 'ia2', context: 'alpha' },
      { english: 'a3', italian: 'ia3', context: 'alpha' },
      { english: 'b1', italian: 'ib1', context: 'beta' },
      { english: 'b2', italian: 'ib2', context: 'beta' },
    ];
    const pairs = buildPairs(items);

    expect(pairs).toHaveLength(3);
    expect(pairs[0].a.english).toBe('a1');
    expect(pairs[0].b.english).toBe('a2');
    // alpha's leftover pairs with beta's first item
    expect(pairs[1].a.english).toBe('a3');
    expect(pairs[1].b.english).toBe('b1');
    // final leftover becomes a solo card
    expect(pairs[2].a.english).toBe('b2');
    expect(pairs[2].b).toBeNull();
  });

  // ── 3. Term masking ───────────────────────────────

  it('maskTerm masks case-insensitively, escapes metacharacters, ignores blank terms', () => {
    expect(maskTerm('Enable the Firewall now', 'firewall')).toBe('Enable the _____ now');
    expect(maskTerm('We write C++ code', 'C++')).toBe('We write _____ code');
    expect(maskTerm('Nothing to mask', '   ')).toBe('Nothing to mask');
    expect(maskTerm('Nothing to mask', '')).toBe('Nothing to mask');
  });

  it('maskTerm never mangles mid-word hits and masks inflections whole', () => {
    // 'port' must not turn 'Report' into 'Re_____'
    expect(maskTerm('Report the open port', 'port')).toBe('Report the open _____');
    // 'log' masks 'logarithm' entirely instead of leaking '_____arithm'
    expect(maskTerm('The log returns the natural logarithm', 'log')).toBe(
      'The _____ returns the natural _____'
    );
  });

  it('buildClue masks the term out of the note and skips information-free clues', () => {
    // Repo notes often name the term verbatim — the clue must not answer itself
    expect(
      buildClue({
        english: 'Machine Learning',
        italian: 'Apprendimento Automatico',
        context: 'ml-basics',
        note: 'In italiano si usa anche "Machine Learning" senza tradurre.',
      })
    ).toBe('In italiano si usa anche "_____" senza tradurre.');
    // An example that masks down to a bare blank carries no information
    expect(
      buildClue({
        english: 'Firewall',
        italian: 'muro tagliafuoco',
        context: 'defense',
        example: 'Firewall = Il firewall',
      })
    ).toBe('Contesto / Context: Defense');
  });

  // ── 4. start() robustness ─────────────────────────

  it('start() does not throw without a DOM or with degenerate lessons', () => {
    globalThis.document.getElementById = vi.fn(() => null);
    const engine = new TopicLessonCompare(mockProgressManager());

    expect(() => engine.start(undefined, 'python', 0)).not.toThrow();
    expect(() =>
      engine.start({ id: 'l1', title: 'T', items: [{ english: 'x', italian: 'y' }] }, 'python', 0)
    ).not.toThrow();
  });

  it('never finalizes a lesson when the lesson DOM is absent', () => {
    globalThis.document.getElementById = vi.fn(() => null);
    const pm = mockProgressManager();
    const engine = new TopicLessonCompare(pm);

    // Zero pairs goes straight to the summary path — with no DOM the learner
    // saw nothing, so no stars/XP/completion may be awarded.
    engine.start({ id: 'l4', title: 'Ghost', items: [] }, 'python', 0);
    expect(pm.updateTopicLessonStars).not.toHaveBeenCalled();
    expect(pm.completeTopicLesson).not.toHaveBeenCalled();
    expect(pm.addXP).not.toHaveBeenCalled();
  });

  it('renders items with missing example/pronunciation and never prints undefined', () => {
    const engine = new TopicLessonCompare(mockProgressManager());
    const lesson = {
      id: 'l2',
      title: 'Defense',
      items: [
        {
          english: 'patch',
          italian: 'correzione',
          context: 'defense',
          example: 'Apply the patch quickly',
        },
        { english: 'backup', italian: 'copia di sicurezza', context: 'defense' },
      ],
    };

    engine.start(lesson, 'cybersecurity', 1);
    expect(container.innerHTML).toContain('patch');
    expect(container.innerHTML).not.toContain('undefined');

    engine.startQuestions(0);
    expect(engine._questions).toHaveLength(2);
    expect(container.innerHTML).not.toContain('undefined');

    // Clue question prefers masked example half, else falls back to context label
    const clueQ = engine._questions[1];
    if (clueQ.item.english === 'patch') {
      expect(clueQ.clue).toBe('Apply the _____ quickly');
    } else {
      expect(clueQ.clue).toBe('Contesto / Context: Defense');
    }
    engine.renderQuestion(1);
    expect(container.innerHTML).not.toContain('undefined');
  });

  // ── 5. Full flow: compare -> distinguish -> summary ─

  it('scores answers, advances through both questions, and finalizes once', () => {
    vi.useFakeTimers();
    const pm = mockProgressManager();
    const engine = new TopicLessonCompare(pm);
    const lesson = pairableLesson();

    engine.start(lesson, 'cybersecurity', 1);

    // Stage A renders both cards side by side
    expect(engine.pairs).toHaveLength(1);
    expect(engine.totalQuestions).toBe(2);
    expect(container.innerHTML).toContain('firewall');
    expect(container.innerHTML).toContain('router');
    expect(container.innerHTML).toContain('lessonCompare.startQuestions');
    expect(container.innerHTML).toContain('Attiva il firewall');
    expect(progressEl.textContent).toBe('Coppia 1 di 1 / Pair 1 of 1');

    // Stage B: two forced-binary questions over the same two terms
    engine.startQuestions(0);
    expect(engine._questions).toHaveLength(2);
    expect(engine._questions[0].options).toHaveLength(2);
    expect(container.innerHTML).toContain('lessonCompare.answer');

    // Q1 answered correctly
    const q1 = engine._questions[0];
    engine.handleAnswer(0, q1.options.indexOf(q1.correct));
    expect(engine.correctCount).toBe(1);
    expect(q1.answered).toBe(true);

    // A second click on the same question is a no-op
    engine.handleAnswer(0, q1.options.indexOf(q1.correct));
    expect(engine.correctCount).toBe(1);

    vi.advanceTimersByTime(1500);
    expect(container.innerHTML).toContain('Domanda 2 di 2');

    // Q2 answered wrong: coach feedback path, item goes to review list
    const q2 = engine._questions[1];
    const wrongIndex = q2.options.findIndex((opt) => opt !== q2.correct);
    engine.handleAnswer(1, wrongIndex);
    expect(engine.correctCount).toBe(1);
    expect(engine.missedItems).toContain(q2.item);

    vi.advanceTimersByTime(1500);

    // Summary: 1/2 correct => 2 stars, XP = 10 + 20 completion = 30
    expect(pm.updateTopicLessonStars).toHaveBeenCalledTimes(1);
    expect(pm.updateTopicLessonStars).toHaveBeenCalledWith('cybersecurity', 1, 'lesson-1', 2);
    expect(pm.addXP).toHaveBeenCalledWith(30);
    expect(titleEl.textContent).toBe('Completata! / Completed!');
    expect(container.innerHTML).toContain('Lezione Completata');
    expect(container.innerHTML).toContain('Termini da Ripassare');

    // Re-rendering the summary never finalizes twice
    engine.renderSummary();
    expect(pm.updateTopicLessonStars).toHaveBeenCalledTimes(1);
    expect(pm.addXP).toHaveBeenCalledTimes(1);
  });

  // ── 6. Degenerate pair skips questions ────────────

  it('shows only the compare card for a degenerate pair and still completes', () => {
    const pm = mockProgressManager();
    const engine = new TopicLessonCompare(pm);
    const lesson = {
      id: 'l3',
      title: 'Twins',
      items: [
        { english: 'cache', italian: 'cache', context: 'memory' },
        { english: 'cache', italian: 'la cache', context: 'memory' },
      ],
    };

    engine.start(lesson, 'python', 2);
    expect(engine.totalQuestions).toBe(0);
    // Continue button advances straight to the next pair, no Distinguish stage
    expect(container.innerHTML).toContain('lessonCompare.showPair');
    expect(container.innerHTML).not.toContain('lessonCompare.startQuestions');

    engine.showPair(1);
    expect(pm.updateTopicLessonStars).toHaveBeenCalledTimes(1);
    // Completion without questions still earns the minimum single star
    expect(pm.updateTopicLessonStars).toHaveBeenCalledWith('python', 2, 'l3', 1);
  });
});
