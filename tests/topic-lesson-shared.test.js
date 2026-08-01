import { describe, it, expect, beforeEach, vi } from 'vitest';

// TopicLessonShared holds the bookkeeping every lesson layout depends on:
// grouping, distractors, scoring, persistence and the summary markup. A bug
// here is a bug in all five layouts at once, so it is tested directly.

describe('TopicLessonShared', () => {
  let shared;

  beforeEach(async () => {
    globalThis.window = {};
    globalThis.document = {
      body: { addEventListener: vi.fn(), contains: vi.fn(() => true) },
      querySelectorAll: vi.fn(() => []),
      addEventListener: vi.fn(),
      getElementById: vi.fn(() => null),
      createElement: vi.fn(() => ({ dataset: {}, style: {}, addEventListener: vi.fn() })),
    };
    globalThis.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn() }));
    vi.resetModules();
    shared = await import('../js/topics/TopicLessonShared.js');
  });

  const items = () => [
    { english: 'firewall', italian: 'muro di fuoco', context: 'net' },
    { english: 'router', italian: 'instradatore', context: 'net' },
    { english: 'phishing', italian: 'adescamento', context: 'social' },
    { english: 'malware', italian: 'software malevolo', context: 'threat' },
  ];

  // ── grouping ──────────────────────────────────────

  it('buildContextGroups groups by context and preserves first-seen order', () => {
    const groups = shared.buildContextGroups(items());
    expect(groups.map((g) => g.context)).toEqual(['net', 'social', 'threat']);
    expect(groups[0].items).toHaveLength(2);
  });

  it('buildContextGroups defaults a missing context to "general"', () => {
    const groups = shared.buildContextGroups([{ english: 'a', italian: 'b' }]);
    expect(groups[0].context).toBe('general');
  });

  it('buildContextGroups tolerates undefined input', () => {
    expect(shared.buildContextGroups(undefined)).toEqual([]);
  });

  // ── distractors / options ─────────────────────────

  it('getDistractors never returns the target value', () => {
    const pool = items();
    const d = shared.getDistractors(pool[0], pool, 'italian', 3);
    expect(d).not.toContain('muro di fuoco');
    expect(d).toHaveLength(3);
  });

  it('getDistractors returns fewer than requested rather than padding', () => {
    const pool = [
      { english: 'a', italian: 'aa', context: 'x' },
      { english: 'b', italian: 'bb', context: 'x' },
    ];
    const d = shared.getDistractors(pool[0], pool, 'italian', 3);
    expect(d).toEqual(['bb']);
  });

  it('buildOptions includes the correct answer exactly once', () => {
    const pool = items();
    const opts = shared.buildOptions(pool[0], pool, 'italian', 4);
    expect(opts).toHaveLength(4);
    expect(opts.filter((o) => o === 'muro di fuoco')).toHaveLength(1);
  });

  // ── scoring ───────────────────────────────────────

  it('starsForRatio maps ratios onto 1..3 stars', () => {
    expect(shared.starsForRatio(1)).toBe(3);
    expect(shared.starsForRatio(0.9)).toBe(3);
    expect(shared.starsForRatio(0.89)).toBe(2);
    expect(shared.starsForRatio(0.5)).toBe(2);
    expect(shared.starsForRatio(0.49)).toBe(1);
    expect(shared.starsForRatio(0)).toBe(1);
  });

  it('starDisplay renders filled and empty stars', () => {
    expect(shared.starDisplay(2, 3)).toBe('⭐⭐☆');
    expect(shared.starDisplay(0, 3)).toBe('☆☆☆');
    // out-of-range values must not produce a negative repeat (which throws)
    expect(() => shared.starDisplay(9, 3)).not.toThrow();
    expect(() => shared.starDisplay(-1, 3)).not.toThrow();
  });

  // ── persistence ───────────────────────────────────

  const mockPm = () => ({
    updateTopicLessonStars: vi.fn(),
    completeTopicLesson: vi.fn(),
    incrementDailyLessons: vi.fn(),
    incrementDailyWords: vi.fn(),
    addXP: vi.fn(),
  });

  it('finalizeLesson persists stars, counters and XP', () => {
    const pm = mockPm();
    const lesson = { id: 'l1', title: 'T', items: items() };
    const res = shared.finalizeLesson({
      progressManager: pm,
      lesson,
      topicId: 'linux',
      levelNum: 2,
      correctCount: 6,
      totalQuestions: 6,
    });

    expect(res.stars).toBe(3);
    // 6*10 + 20 completion + 15 perfect
    expect(res.xp).toBe(95);
    expect(pm.updateTopicLessonStars).toHaveBeenCalledWith('linux', 2, 'l1', 3);
    expect(pm.completeTopicLesson).toHaveBeenCalledWith('linux', 2, 'l1');
    expect(pm.incrementDailyWords).toHaveBeenCalledWith(4);
    expect(pm.addXP).toHaveBeenCalledWith(95);
  });

  it('finalizeLesson awards no perfect bonus on a partial score', () => {
    const pm = mockPm();
    const res = shared.finalizeLesson({
      progressManager: pm,
      lesson: { id: 'l1', items: items() },
      topicId: 'linux',
      levelNum: 0,
      correctCount: 3,
      totalQuestions: 6,
    });
    // 3*10 + 20, no perfect bonus
    expect(res.xp).toBe(50);
    expect(res.stars).toBe(2);
  });

  it('finalizeLesson does not divide by zero when no questions were asked', () => {
    const pm = mockPm();
    const res = shared.finalizeLesson({
      progressManager: pm,
      lesson: { id: 'l1', items: [] },
      topicId: 'linux',
      levelNum: 0,
      correctCount: 0,
      totalQuestions: 0,
    });
    expect(Number.isNaN(res.ratio)).toBe(false);
    expect(res.ratio).toBe(0);
    expect(res.stars).toBe(1);
    // completing with zero questions must not hand out the perfect bonus
    expect(res.xp).toBe(20);
  });

  it('finalizeLesson survives a progressManager missing methods', () => {
    expect(() =>
      shared.finalizeLesson({
        progressManager: {},
        lesson: { id: 'l1', items: [] },
        topicId: 'linux',
        levelNum: 0,
        correctCount: 0,
        totalQuestions: 0,
      })
    ).not.toThrow();
  });

  it('finalizeLesson feeds SRS only when words are available', () => {
    const addWords = vi.fn();
    globalThis.window.srsManager = { addWords };
    shared.finalizeLesson({
      progressManager: mockPm(),
      lesson: { id: 'l1', items: items() },
      topicId: 'linux',
      levelNum: 1,
      correctCount: 1,
      totalQuestions: 2,
    });
    expect(addWords).toHaveBeenCalledTimes(1);
    expect(addWords.mock.calls[0][1]).toBe('topic-linux-1-l1');

    addWords.mockClear();
    shared.finalizeLesson({
      progressManager: mockPm(),
      lesson: { id: 'l2', items: [{ english: 'x' }] },
      topicId: 'linux',
      levelNum: 1,
      correctCount: 0,
      totalQuestions: 1,
    });
    expect(addWords).not.toHaveBeenCalled();
  });

  // ── markup ────────────────────────────────────────

  it('renderSummaryHtml escapes lesson titles', () => {
    const html = shared.renderSummaryHtml({
      lesson: { title: '<img src=x onerror=alert(1)>', items: [] },
      topicId: 'linux',
      levelNum: 0,
      stars: 2,
      xp: 40,
      correctCount: 2,
      totalQuestions: 4,
    });
    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;img');
    expect(html).toContain('onerror=alert(1)&gt;');
  });

  it('renderReviewListHtml dedupes and returns empty string for no items', () => {
    expect(shared.renderReviewListHtml([])).toBe('');
    expect(shared.renderReviewListHtml(undefined)).toBe('');
    const html = shared.renderReviewListHtml([
      { english: 'dup', italian: 'x' },
      { english: 'dup', italian: 'x' },
    ]);
    expect(html.match(/<li>/g)).toHaveLength(1);
  });

  // ── hashing ───────────────────────────────────────

  it('hashString is stable and well-distributed enough to rotate layouts', () => {
    expect(shared.hashString('abc')).toBe(shared.hashString('abc'));
    expect(shared.hashString('abc')).not.toBe(shared.hashString('abd'));
    expect(shared.hashString('')).toBeTypeOf('number');
    // spread across a 5-slot rotation for realistic lesson ids
    const buckets = new Set();
    for (let i = 0; i < 40; i += 1) buckets.add(shared.hashString(`linux_basics_${i}`) % 5);
    expect(buckets.size).toBeGreaterThan(1);
  });

  it('formatContextName humanises slugs', () => {
    expect(shared.formatContextName('package-mgmt')).toBe('Package Mgmt');
    expect(shared.formatContextName(undefined)).toBe('General');
  });

  it('itemKeyFor matches the analytics key format used by practice', () => {
    const key = shared.itemKeyFor('linux', 3, { english: 'grep', context: 'cli' });
    expect(key).toBe('linux:3:cli:grep');
    const fallback = shared.itemKeyFor('linux', 3, { english: 'grep' }, 'shell');
    expect(fallback).toBe('linux:3:shell:grep');
  });
});
