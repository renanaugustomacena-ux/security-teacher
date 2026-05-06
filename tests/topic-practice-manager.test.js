import { describe, it, expect, beforeEach, vi } from 'vitest';

// TopicPracticeManager.generateQuestions() must drop items whose English and
// Italian fields are identical from the translation modes (listening,
// matching, writing, scenario). Otherwise the rendered prompt and the
// correct option are the SAME string — the answer is given for free.
//
// Other modes (codeoutput, command, comprehension, context) are unaffected
// by this pattern (different prompt/answer fields), so identity-translation
// items continue to feed those pools.

describe('TopicPracticeManager.generateQuestions — identity-translation filter', () => {
  let TopicPracticeManager;

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
      createElement: vi.fn(() => ({
        className: '',
        type: '',
        title: '',
        dataset: {},
        innerHTML: '',
        style: {},
        addEventListener: vi.fn(),
      })),
    };
    globalThis.CSS = { escape: (s) => s };
    globalThis.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn() }));
    vi.resetModules();
    ({ TopicPracticeManager } = await import('../js/topics/TopicPracticeManager.js'));
  });

  const fixture = () => [
    { english: 'Bash', italian: 'Bash', context: 'cli', example: 'Run bash = Esegui bash' },
    { english: 'Console', italian: 'Console', context: 'cli', code: 'print("x")' },
    {
      english: 'kernel',
      italian: 'nucleo',
      context: 'cli',
      example: 'Linux kernel = Nucleo Linux',
    },
    { english: 'shell', italian: 'shell di sistema', context: 'cli', code: 'sh -c ls' },
  ];

  it('listening mode excludes items where english === italian', () => {
    const tpm = new TopicPracticeManager();
    tpm.generateQuestions('listening', fixture());
    expect(tpm.questions.length).toBe(2);
    for (const q of tpm.questions) {
      expect(q.english.toLowerCase()).not.toBe(q.italian.toLowerCase());
    }
  });

  it('matching mode excludes identity-translation items', () => {
    const tpm = new TopicPracticeManager();
    tpm.generateQuestions('matching', fixture());
    expect(tpm.questions.every((q) => q.english.toLowerCase() !== q.italian.toLowerCase())).toBe(
      true
    );
  });

  it('writing mode excludes identity-translation items', () => {
    const tpm = new TopicPracticeManager();
    tpm.generateQuestions('writing', fixture());
    expect(tpm.questions.every((q) => q.english.toLowerCase() !== q.italian.toLowerCase())).toBe(
      true
    );
  });

  it('scenario mode excludes identity-translation items', () => {
    const tpm = new TopicPracticeManager();
    tpm.generateQuestions('scenario', fixture());
    expect(tpm.questions.every((q) => q.english.toLowerCase() !== q.italian.toLowerCase())).toBe(
      true
    );
  });

  it('codeoutput mode KEEPS identity-translation items (it asks about code, not translation)', () => {
    const tpm = new TopicPracticeManager();
    tpm.generateQuestions('codeoutput', fixture());
    const englishes = tpm.questions.map((q) => q.english);
    expect(englishes).toContain('Console');
    expect(englishes).toContain('shell');
  });

  it('case-insensitive: "Docker" / "docker" still treated as identity', () => {
    const tpm = new TopicPracticeManager();
    tpm.generateQuestions('listening', [
      { english: 'Docker', italian: 'docker' },
      { english: 'thread', italian: 'filo di esecuzione' },
    ]);
    expect(tpm.questions.length).toBe(1);
    expect(tpm.questions[0].english).toBe('thread');
  });
});
