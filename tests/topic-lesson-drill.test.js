import { describe, it, expect, beforeEach, vi } from 'vitest';

// TopicLessonDrill is a self-rated flip-card layout: one card per item in
// lesson order. Front shows the English term; "Rivela / Reveal" flips the card
// in place; a three-way self-rating (1 / 0.5 / 0) advances to the next card.
// The summary rounds the rating sum to correctCount and lists "did not know"
// items as terms to review.

describe('TopicLessonDrill', () => {
  let TopicLessonDrill;
  let canRender;
  let LAYOUT_META;

  // Minimal DOM stubs following the pattern from topic-lesson-engine.test.js
  beforeEach(async () => {
    globalThis.window = {};
    globalThis.document = {
      body: { addEventListener: vi.fn(), contains: vi.fn(() => true) },
      addEventListener: vi.fn(),
      getElementById: vi.fn(() => null),
    };

    vi.resetModules();
    ({ TopicLessonDrill, canRender, LAYOUT_META } =
      await import('../js/topics/TopicLessonDrill.js'));
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
      note: 'Barriera di sicurezza di rete.',
    },
    {
      english: 'router',
      italian: 'instradatore',
      context: 'network-security',
      example: 'Configure the router',
    },
    {
      english: 'phishing',
      italian: 'phishing',
      context: 'social-engineering',
    },
  ];

  const makeLesson = (items) => ({
    id: 'lesson-1',
    title: 'Test Lesson',
    description: 'desc',
    items,
  });

  // Wire a container + header elements into the stubbed document, and
  // return them so assertions can inspect what the layout rendered.
  const wireDom = () => {
    const container = { innerHTML: '' };
    const titleEl = { textContent: '' };
    const progressEl = { textContent: '' };
    globalThis.document.getElementById = vi.fn((id) => {
      if (id === 'topic-lesson-content') return container;
      if (id === 'topic-lesson-title') return titleEl;
      if (id === 'topic-lesson-progress') return progressEl;
      return null;
    });
    return { container, titleEl, progressEl };
  };

  // ── 1. Metadata and canRender ─────────────────────

  it('exports bilingual layout metadata with id "drill"', () => {
    expect(LAYOUT_META.id).toBe('drill');
    expect(LAYOUT_META.name).toBeTruthy();
    expect(LAYOUT_META.nameIt).toBeTruthy();
    expect(LAYOUT_META.icon).toBeTruthy();
  });

  it('canRender is true when at least one item has both english and italian', () => {
    expect(canRender(makeLesson(lessonItems()))).toBe(true);
    expect(canRender(makeLesson([{ english: 'patch', italian: 'patch' }]))).toBe(true);
    expect(TopicLessonDrill.canRender(makeLesson(lessonItems()))).toBe(true);
  });

  it('canRender is false for missing, empty, or one-faced lessons', () => {
    expect(canRender(null)).toBe(false);
    expect(canRender({})).toBe(false);
    expect(canRender(makeLesson([]))).toBe(false);
    expect(canRender(makeLesson([{ english: 'orphan' }]))).toBe(false);
    expect(canRender(makeLesson([{ italian: 'orfano' }]))).toBe(false);
  });

  // ── 2. Start ──────────────────────────────────────

  it('start() does not throw without a DOM and initializes card state', () => {
    const drill = new TopicLessonDrill(mockProgressManager());
    expect(() => drill.start(makeLesson(lessonItems()), 'cybersecurity', 1)).not.toThrow();
    expect(drill.cards).toHaveLength(3);
    expect(drill.cardIndex).toBe(0);
    expect(drill.revealed).toBe(false);
    expect(drill.finished).toBe(false);
  });

  it('start() renders the first card front with reveal button and progress text', () => {
    const { container, titleEl, progressEl } = wireDom();
    const drill = new TopicLessonDrill(mockProgressManager());
    drill.start(makeLesson(lessonItems()), 'cybersecurity', 1);

    expect(titleEl.textContent).toBe('Test Lesson');
    expect(progressEl.textContent).toBe('Carta 1 di 3 / Card 1 of 3');
    expect(container.innerHTML).toContain('firewall');
    expect(container.innerHTML).toContain('Rivela / Reveal');
    expect(container.innerHTML).toContain('data-action="lessonDrill.reveal"');
    // Back is not rendered until revealed
    expect(container.innerHTML).not.toContain('Lo sapevo');
  });

  // ── 3. Reveal and rate flow ───────────────────────

  it('reveal() flips the card in place and shows the rating row', () => {
    const { container } = wireDom();
    const drill = new TopicLessonDrill(mockProgressManager());
    drill.start(makeLesson(lessonItems()), 'cybersecurity', 1);

    drill.reveal(0);

    expect(drill.revealed).toBe(true);
    expect(container.innerHTML).toContain('Attiva il firewall');
    expect(container.innerHTML).toContain('Lo sapevo / I knew it');
    expect(container.innerHTML).toContain('Quasi / Almost');
    expect(container.innerHTML).toContain('Non lo sapevo / I did not know');
    expect(container.innerHTML).toContain('data-action="lessonDrill.rate"');
  });

  it('rate() is ignored before reveal, then advances card and score', () => {
    const { progressEl } = wireDom();
    const drill = new TopicLessonDrill(mockProgressManager());
    drill.start(makeLesson(lessonItems()), 'cybersecurity', 1);

    // Rating before revealing is a no-op (honour the flip-first flow)
    drill.rate(0, 1);
    expect(drill.cardIndex).toBe(0);
    expect(drill.score).toBe(0);

    drill.reveal(0);
    drill.rate(0, 1);
    expect(drill.cardIndex).toBe(1);
    expect(drill.score).toBe(1);
    expect(drill.revealed).toBe(false);
    expect(progressEl.textContent).toBe('Carta 2 di 3 / Card 2 of 3');

    // Double-tap of the same rating button must not double-count the score
    drill.rate(0, 1);
    expect(drill.cardIndex).toBe(1);
    expect(drill.score).toBe(1);

    // Stale index and bogus rating values are ignored
    drill.reveal(0);
    expect(drill.revealed).toBe(false);
    drill.reveal(1);
    drill.rate(1, 7);
    drill.rate(1, NaN);
    expect(drill.cardIndex).toBe(1);
  });

  it('marks a card introduced at reveal (not at start), at most once per card', async () => {
    const { masteryService } = await import('../js/services/MasteryService.js');
    const introduceSpy = vi.spyOn(masteryService, 'markIntroduced').mockImplementation(() => {});
    wireDom();
    const drill = new TopicLessonDrill(mockProgressManager());
    drill.start(makeLesson(lessonItems()), 'cybersecurity', 1);

    // Nothing is introduced until the learner actually sees a card's back —
    // abandoning the drill must not mark unseen cards.
    expect(introduceSpy).not.toHaveBeenCalled();

    drill.reveal(0);
    expect(introduceSpy).toHaveBeenCalledTimes(1);
    expect(introduceSpy).toHaveBeenCalledWith('cybersecurity:1:network-security:firewall');

    // Re-revealing the same card must not re-mark it
    drill.reveal(0);
    expect(introduceSpy).toHaveBeenCalledTimes(1);

    drill.rate(0, 1);
    drill.reveal(1);
    expect(introduceSpy).toHaveBeenCalledTimes(2);
    expect(introduceSpy).toHaveBeenCalledWith('cybersecurity:1:network-security:router');
  });

  // ── 4. Scoring and summary ────────────────────────

  it('sums self-ratings, rounds correctCount, and finalizes exactly once', () => {
    const { container, titleEl } = wireDom();
    const pm = mockProgressManager();
    const drill = new TopicLessonDrill(pm);
    drill.start(makeLesson(lessonItems()), 'cybersecurity', 1);

    drill.reveal(0);
    drill.rate(0, 1); // knew it
    drill.reveal(1);
    drill.rate(1, 0.5); // almost
    drill.reveal(2);
    drill.rate(2, 0); // did not know

    // score 1.5 -> correctCount 2 of 3 -> ratio 0.67 -> 2 stars
    expect(drill.finished).toBe(true);
    expect(pm.updateTopicLessonStars).toHaveBeenCalledWith('cybersecurity', 1, 'lesson-1', 2);
    expect(pm.completeTopicLesson).toHaveBeenCalledTimes(1);
    // XP = 2*10 + 20 completion + 0 perfect = 40
    expect(pm.addXP).toHaveBeenCalledWith(40);

    expect(titleEl.textContent).toBe('Completata! / Completed!');
    expect(container.innerHTML).toContain('2/3');
    // renderSummaryHtml escapes the badge, so '/' arrives as &#x2F;
    expect(container.innerHTML).toContain('Ripasso &#x2F; Drill');
    // The "did not know" item is listed for review
    expect(container.innerHTML).toContain('Termini da Ripassare / Terms to Review');
    expect(container.innerHTML).toContain('phishing');

    // Further interaction after the summary must not double-finalize
    drill.reveal(2);
    drill.rate(2, 1);
    drill.renderSummary();
    expect(pm.completeTopicLesson).toHaveBeenCalledTimes(1);
    expect(pm.addXP).toHaveBeenCalledTimes(1);
  });

  it('awards 3 stars and the perfect bonus when every card is rated known', () => {
    wireDom();
    const pm = mockProgressManager();
    const drill = new TopicLessonDrill(pm);
    drill.start(makeLesson(lessonItems()), 'cybersecurity', 2);

    for (let i = 0; i < 3; i += 1) {
      drill.reveal(i);
      drill.rate(i, 1);
    }

    expect(pm.updateTopicLessonStars).toHaveBeenCalledWith('cybersecurity', 2, 'lesson-1', 3);
    // XP = 3*10 + 20 completion + 15 perfect = 65
    expect(pm.addXP).toHaveBeenCalledWith(65);
  });

  // ── 5. Robustness ─────────────────────────────────

  it('handles a single item with no example, note, or pronunciation', () => {
    const { container } = wireDom();
    const pm = mockProgressManager();
    const drill = new TopicLessonDrill(pm);
    const lesson = makeLesson([{ english: 'exploit', italian: 'exploit' }]);

    expect(() => drill.start(lesson, 'cybersecurity', 1)).not.toThrow();
    drill.reveal(0);
    expect(container.innerHTML).not.toContain('undefined');
    drill.rate(0, 0.5);

    // 0.5 of 1 rounds up to 1/1 -> completed with a full ratio
    expect(drill.finished).toBe(true);
    expect(pm.completeTopicLesson).toHaveBeenCalledTimes(1);
    expect(container.innerHTML).not.toContain('undefined');
  });

  it('renders only the English half when an example has no " = " separator', () => {
    const { container } = wireDom();
    const drill = new TopicLessonDrill(mockProgressManager());
    const lesson = makeLesson([
      { english: 'router', italian: 'instradatore', example: 'Configure the router' },
    ]);

    drill.start(lesson, 'cybersecurity', 1);
    drill.reveal(0);

    expect(container.innerHTML).toContain('Configure the router');
    expect(container.innerHTML).not.toContain('undefined');
    expect(container.innerHTML).not.toContain('drill-example-it');
  });

  it('skips one-faced items and finishes gracefully when no card is usable', () => {
    wireDom();
    const pm = mockProgressManager();
    const drill = new TopicLessonDrill(pm);
    const lesson = makeLesson([{ english: 'orphan' }, { italian: 'orfano' }]);

    expect(() => drill.start(lesson, 'cybersecurity', 1)).not.toThrow();
    // No usable cards: the drill closes out immediately, still exactly once
    expect(drill.finished).toBe(true);
    expect(pm.completeTopicLesson).toHaveBeenCalledTimes(1);
  });

  // ── Doctrine §43.5: no DOM means the learner never saw the lesson ──
  // The registry awaits a dynamic import before start(), so a learner can
  // navigate away in between. Awarding stars/XP for a lesson that never
  // rendered would silently inflate progress.
  it('never awards progress when there is no lesson container', () => {
    globalThis.document.getElementById = vi.fn(() => null);
    const pm = mockProgressManager();
    const drill = new TopicLessonDrill(pm);

    // Zero usable cards routes straight to renderSummary — the exact path
    // that used to finalize before checking for a container.
    expect(() =>
      drill.start(makeLesson([{ english: 'orphan' }]), 'cybersecurity', 1)
    ).not.toThrow();

    expect(pm.completeTopicLesson).not.toHaveBeenCalled();
    expect(pm.updateTopicLessonStars).not.toHaveBeenCalled();
    expect(pm.addXP).not.toHaveBeenCalled();
    expect(drill.finished).toBe(false);
  });
});
