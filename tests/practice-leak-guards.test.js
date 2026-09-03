import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  stripRedundantGloss,
  containsWholeWord,
  containsFolded,
  blankTermInPhrase,
} from '../js/utils/PracticeUtils.js';

// Guards for the answer leaks measured across the 15,696-item corpus:
// 20.8% of items printed the English prompt inside their own Italian gloss,
// 15.0% of scenario items rendered no blank at all, and 4.1% blanked inside a
// longer word and left the suffix showing.

describe('stripRedundantGloss', () => {
  it('drops a parenthetical that only repeats the prompt term', () => {
    expect(stripRedundantGloss('Contenitore di dati (Dataset)', 'Dataset')).toBe(
      'Contenitore di dati'
    );
    expect(stripRedundantGloss('Rete locale (LAN)', 'LAN')).toBe('Rete locale');
  });

  it('keeps a parenthetical that carries real information', () => {
    expect(stripRedundantGloss('Apache Kafka (broker di messaggi)', 'Kafka')).toBe(
      'Apache Kafka (broker di messaggi)'
    );
  });

  it('is accent and case insensitive', () => {
    expect(stripRedundantGloss('Distorsione (bias)', 'Bias')).toBe('Distorsione');
  });

  it('never returns an empty answer', () => {
    // Stripping everything would leave nothing to grade against.
    expect(stripRedundantGloss('(Host)', 'Host')).toBe('(Host)');
  });

  it('passes through when either side is missing', () => {
    expect(stripRedundantGloss('', 'Host')).toBe('');
    expect(stripRedundantGloss('Nucleo', '')).toBe('Nucleo');
    expect(stripRedundantGloss(undefined, 'Host')).toBe(undefined);
  });
});

describe('containsWholeWord', () => {
  it('matches a standalone word, not a fragment of a longer one', () => {
    expect(containsWholeWord('Funzione di callback', 'Callback')).toBe(true);
    expect(containsWholeWord('Wireshark captures frames', 'Frame')).toBe(false);
  });

  it('treats punctuation as a boundary', () => {
    expect(containsWholeWord('rsync --help', 'help')).toBe(true);
  });

  it('ignores accents and case', () => {
    expect(containsWholeWord('Unità di rete', 'unita')).toBe(true);
  });
});

describe('containsFolded', () => {
  it('matches inside a longer token, where whole-word matching would not', () => {
    expect(containsFolded('--version', 'Version')).toBe(true);
    expect(containsWholeWord('--version', 'Version')).toBe(true);
    expect(containsFolded('helper', 'help')).toBe(true);
  });
});

describe('blankTermInPhrase', () => {
  it('blanks a whole word', () => {
    expect(blankTermInPhrase('A packet is routed', 'packet')).toBe('A _____ is routed');
  });

  it('does not blank inside a longer word and leave the suffix showing', () => {
    // Naive replace produced "thousands of _____s", handing over the plural.
    expect(blankTermInPhrase('thousands of packets', 'packet')).toBe('thousands of packets');
  });

  it('returns the phrase untouched when the term is absent', () => {
    expect(blankTermInPhrase('Unknown unicasts are flooded', 'Flooding')).toBe(
      'Unknown unicasts are flooded'
    );
  });
});

describe('TopicPracticeManager.buildPool — gloss cleaning', () => {
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

  const data = {
    levels: {
      0: {
        lessons: [
          {
            items: [
              { english: 'Dataset', italian: 'Contenitore di dati (Dataset)', context: 'ml' },
              { english: 'Bias', italian: 'Distorsione (Bias)', context: 'ml' },
            ],
          },
        ],
      },
    },
  };

  it('cleans the gloss without dropping the item', () => {
    const tpm = new TopicPracticeManager();
    const pool = tpm.buildPool(data, 'ai-engineering', 0);
    expect(pool.length).toBe(2);
    expect(pool.map((i) => i.italian)).toEqual(['Contenitore di dati', 'Distorsione']);
  });

  it('cleaned items survive the translation-mode filter they used to fail', () => {
    const tpm = new TopicPracticeManager();
    tpm.generateQuestions('listening', tpm.buildPool(data, 'ai-engineering', 0));
    expect(tpm.questions.length).toBe(2);
  });

  it('stamps provenance used by the analytics item key', () => {
    const tpm = new TopicPracticeManager();
    const pool = tpm.buildPool(data, 'ai-engineering', 0);
    expect(pool[0]._topicId).toBe('ai-engineering');
    expect(pool[0]._level).toBe(0);
  });
});

describe('generateContextOptions — no filler options', () => {
  let TopicPracticeManager;

  beforeEach(async () => {
    vi.resetModules();
    ({ TopicPracticeManager } = await import('../js/topics/TopicPracticeManager.js'));
  });

  it('never pads the grid with "other-N" placeholders', () => {
    const tpm = new TopicPracticeManager();
    tpm.contextIndex = new Map([['foundations', []]]);
    const options = tpm.generateContextOptions('foundations');
    expect(options.some((o) => String(o).startsWith('other-'))).toBe(false);
  });

  it('uses the real contexts when the level has them', () => {
    const tpm = new TopicPracticeManager();
    tpm.contextIndex = new Map([
      ['routing', []],
      ['switching', []],
      ['security', []],
      ['wireless', []],
    ]);
    const options = tpm.generateContextOptions('routing');
    expect(options.length).toBe(4);
    expect(new Set(options).size).toBe(4);
    expect(options).toContain('routing');
  });
});
