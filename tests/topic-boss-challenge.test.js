import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('TopicBossChallenge', () => {
  let TopicBossChallenge;

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
    ({ TopicBossChallenge } = await import('../js/topics/TopicBossChallenge.js'));
  });

  const mockProgressManager = () => ({
    completeTopicBoss: vi.fn(),
    addXP: vi.fn(),
    recordPracticeSession: vi.fn(),
  });

  it('constructor creates an instance with correct defaults', () => {
    const pm = mockProgressManager();
    const boss = new TopicBossChallenge(pm);

    expect(boss).toBeInstanceOf(TopicBossChallenge);
    expect(boss.progressManager).toBe(pm);
    expect(boss.currentQuestionIndex).toBe(0);
    expect(boss.correctCount).toBe(0);
    expect(boss.questions).toEqual([]);
  });

  it('totalQuestions is 15', () => {
    const boss = new TopicBossChallenge(mockProgressManager());
    expect(boss.totalQuestions).toBe(15);
  });

  it('initial timeRemaining is 300 seconds (5 minutes)', () => {
    const boss = new TopicBossChallenge(mockProgressManager());
    expect(boss.timeRemaining).toBe(300);
  });

  it('endChallenge computes score >= 70% as defeated with 2 stars', () => {
    const pm = mockProgressManager();
    const boss = new TopicBossChallenge(pm);
    boss.topicId = 'test-topic';
    boss.levelNum = 1;
    boss.correctCount = 11; // 11/15 = 73%

    boss.endChallenge();

    const [topicId, levelNum, score, stars] = pm.completeTopicBoss.mock.calls[0];
    expect(topicId).toBe('test-topic');
    expect(levelNum).toBe(1);
    expect(score).toBe(73);
    expect(stars).toBe(2);
  });

  it('endChallenge computes score >= 90% as 3 stars', () => {
    const pm = mockProgressManager();
    const boss = new TopicBossChallenge(pm);
    boss.topicId = 'test-topic';
    boss.levelNum = 2;
    boss.correctCount = 14; // 14/15 = 93%

    boss.endChallenge();

    const [, , score, stars] = pm.completeTopicBoss.mock.calls[0];
    expect(score).toBe(93);
    expect(stars).toBe(3);
  });

  it('endChallenge computes score < 50% as 0 stars (defeat)', () => {
    const pm = mockProgressManager();
    const boss = new TopicBossChallenge(pm);
    boss.topicId = 'test-topic';
    boss.levelNum = 1;
    boss.correctCount = 5; // 5/15 = 33%

    boss.endChallenge();

    const [, , score, stars] = pm.completeTopicBoss.mock.calls[0];
    expect(score).toBe(33);
    expect(stars).toBe(0);
  });

  it('formatTime converts seconds to MM:SS', () => {
    const boss = new TopicBossChallenge(mockProgressManager());
    expect(boss.formatTime(300)).toBe('05:00');
    expect(boss.formatTime(125)).toBe('02:05');
    expect(boss.formatTime(0)).toBe('00:00');
    expect(boss.formatTime(59)).toBe('00:59');
  });
});
