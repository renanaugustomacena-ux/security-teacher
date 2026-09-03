import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  isTypeableAnswer,
  MAX_TYPED_ANSWER_LENGTH,
  MIN_TYPEABLE_ITEMS,
} from '../js/topics/TopicPracticeConstants.js';

// `writing` mode renders item.italian as the string the learner must type
// exactly. Roughly 10% of the corpus carries a gloss longer than 40 chars
// (up to 73), and reference-derived content is far worse — those are typing
// tests that grade wrong on one typo, not hard questions. They are filtered
// out of `writing` only; every recognition mode still uses them.

describe('isTypeableAnswer', () => {
  it('accepts a short gloss', () => {
    expect(isTypeableAnswer({ english: 'Shell', italian: 'Guscio di comandi' })).toBe(true);
  });

  it('accepts a gloss exactly at the limit and rejects one over it', () => {
    const at = 'x'.repeat(MAX_TYPED_ANSWER_LENGTH);
    const over = 'x'.repeat(MAX_TYPED_ANSWER_LENGTH + 1);
    expect(isTypeableAnswer({ english: 'a', italian: at })).toBe(true);
    expect(isTypeableAnswer({ english: 'a', italian: over })).toBe(false);
  });

  it('honours an explicit longAnswer flag even when the text is short', () => {
    // Generated content flags its own long answers; trust the flag.
    expect(isTypeableAnswer({ english: 'ACL', italian: 'breve', longAnswer: true })).toBe(false);
  });

  it('rejects items with no Italian side, and malformed input', () => {
    expect(isTypeableAnswer({ english: 'orphan' })).toBe(false);
    expect(isTypeableAnswer({ english: 'x', italian: '' })).toBe(false);
    expect(isTypeableAnswer(null)).toBe(false);
    expect(isTypeableAnswer(undefined)).toBe(false);
  });
});

describe('writing mode pool filtering', () => {
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
      body: { addEventListener: vi.fn(), contains: vi.fn(() => true) },
      querySelectorAll: vi.fn(() => []),
      addEventListener: vi.fn(),
      getElementById: vi.fn(() => null),
      createElement: vi.fn(() => ({
        className: '',
        dataset: {},
        style: {},
        textContent: '',
        innerHTML: '',
        addEventListener: vi.fn(),
      })),
    };
    globalThis.CSS = { escape: (s) => s };
    globalThis.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn() }));
    vi.resetModules();
    ({ TopicPracticeManager } = await import('../js/topics/TopicPracticeManager.js'));
  });

  const longGloss = 'una definizione molto lunga che nessuno dovrebbe digitare a memoria';

  const mixedPool = () => [
    { english: 'Shell', italian: 'Guscio', context: 'cli' },
    { english: 'Kernel', italian: 'Nucleo', context: 'cli' },
    { english: 'Daemon', italian: 'Demone', context: 'cli' },
    { english: 'Socket', italian: 'Presa', context: 'cli' },
    { english: 'ACL', italian: longGloss, context: 'cli' },
    { english: 'AIDE', italian: 'gloss breve', longAnswer: true, context: 'cli' },
  ];

  it('excludes long and flagged answers from writing', () => {
    const tpm = new TopicPracticeManager();
    tpm.generateQuestions('writing', mixedPool());
    const asked = tpm.questions.map((q) => q.english);
    expect(asked).not.toContain('ACL');
    expect(asked).not.toContain('AIDE');
    expect(asked.length).toBeGreaterThan(0);
    for (const q of tpm.questions) {
      expect(q.italian.length).toBeLessThanOrEqual(MAX_TYPED_ANSWER_LENGTH);
    }
  });

  it('still offers those items to recognition modes', () => {
    // The content is not lost — only typing excludes it.
    const tpm = new TopicPracticeManager();
    tpm.generateQuestions('listening', mixedPool());
    const asked = tpm.questions.map((q) => q.english);
    expect(asked).toContain('ACL');
    expect(asked).toContain('AIDE');
  });

  it('yields no questions when every answer is untypeable', () => {
    // Better an empty pool (the selector disables the card) than a session of
    // 70-character typing prompts.
    const tpm = new TopicPracticeManager();
    tpm.generateQuestions('writing', [
      { english: 'a', italian: longGloss, context: 'x' },
      { english: 'b', italian: longGloss, context: 'x' },
    ]);
    expect(tpm.questions).toHaveLength(0);
  });

  it('MIN_TYPEABLE_ITEMS is a sane gate for the selector', () => {
    expect(MIN_TYPEABLE_ITEMS).toBeGreaterThan(0);
    expect(MIN_TYPEABLE_ITEMS).toBeLessThanOrEqual(10);
  });
});
