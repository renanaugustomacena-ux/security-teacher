import { describe, it, expect, beforeEach, vi } from 'vitest';
import { labsForLevel, loadLabsFor } from '../js/topics/TopicPracticeLabMode.js';

// The lab mode exposes LabEngine as a standalone practice card. Before it,
// labs only ran inside LessonV2's applied beat, which is pinned to one topic —
// so the app's most engaging exercise was unreachable everywhere else.

describe('labsForLevel', () => {
  const level = {
    lessons: [
      { id: 'a1', title: 'One' },
      { id: 'a2', title: 'Two' },
      { id: 'a3', title: 'Three' },
    ],
  };

  const script = (title) => ({ title, steps: [{ id: 's1', accept: ['ls'] }] });

  it('returns labs in lesson order, skipping lessons without one', () => {
    const labs = { a3: script('Third'), a1: script('First') };
    const found = labsForLevel(labs, level);
    expect(found.map((f) => f.lessonId)).toEqual(['a1', 'a3']);
    expect(found[0].title).toBe('First');
  });

  it('falls back to the lesson title when the script omits one', () => {
    const found = labsForLevel({ a1: { steps: [{ id: 's1' }] } }, level);
    expect(found[0].title).toBe('One');
  });

  it('rejects scripts with no usable steps', () => {
    // An empty-steps lab would render a terminal the learner can never clear.
    const labs = { a1: { title: 'Broken', steps: [] }, a2: { title: 'Also broken' }, a3: null };
    expect(labsForLevel(labs, level)).toEqual([]);
  });

  it('tolerates missing or malformed input', () => {
    expect(labsForLevel(null, level)).toEqual([]);
    expect(labsForLevel({}, null)).toEqual([]);
    expect(labsForLevel({}, { lessons: 'nope' })).toEqual([]);
  });
});

describe('loadLabsFor', () => {
  it('resolves to an empty object for a topic with no labs file', async () => {
    // A missing bundle must be indistinguishable from "no labs" — the mode card
    // is simply not offered, never an unhandled rejection.
    await expect(loadLabsFor('definitely-not-a-topic')).resolves.toEqual({});
    await expect(loadLabsFor('')).resolves.toEqual({});
    await expect(loadLabsFor(undefined)).resolves.toEqual({});
  });
});

describe('lab session scoring', () => {
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

  const managerWithOneLab = () => {
    const pm = { addXP: vi.fn() };
    const tpm = new TopicPracticeManager(pm);
    tpm.questions = [{ type: 'lab', lessonId: 'a1', script: { steps: [] } }];
    tpm.currentQuestionIndex = 0;
    tpm.questionStartTime = Date.now();
    tpm.completePractice = vi.fn();
    return { tpm, pm };
  };

  it('a clean run scores, extends the streak and awards full XP', () => {
    const { tpm, pm } = managerWithOneLab();
    tpm._finishLab({ steps: 4, misses: 0 });
    expect(tpm.score).toBe(1);
    expect(tpm.consecutiveCorrect).toBe(1);
    expect(pm.addXP).toHaveBeenCalledWith(40);
  });

  it('retries still score the lab but break the streak and reduce XP', () => {
    // The engine never lets you fail, so retries are the only signal.
    const { tpm, pm } = managerWithOneLab();
    tpm.consecutiveCorrect = 5;
    tpm._finishLab({ steps: 4, misses: 3 });
    expect(tpm.score).toBe(1);
    expect(tpm.consecutiveCorrect).toBe(0);
    expect(pm.addXP).toHaveBeenCalledWith(25);
  });

  it('XP never goes below the floor no matter how many retries', () => {
    const { tpm, pm } = managerWithOneLab();
    tpm._finishLab({ steps: 4, misses: 99 });
    expect(pm.addXP).toHaveBeenCalledWith(10);
  });

  it('a second Continue tap cannot double-score or double-award', () => {
    const { tpm, pm } = managerWithOneLab();
    tpm._finishLab({ steps: 4, misses: 0 });
    tpm._finishLab({ steps: 4, misses: 0 });
    expect(tpm.score).toBe(1);
    expect(pm.addXP).toHaveBeenCalledTimes(1);
  });

  it('tolerates a missing summary object', () => {
    const { tpm, pm } = managerWithOneLab();
    expect(() => tpm._finishLab(undefined)).not.toThrow();
    expect(tpm.score).toBe(1);
    expect(pm.addXP).toHaveBeenCalledWith(40);
  });

  it('advances to completion after the last lab', () => {
    const { tpm } = managerWithOneLab();
    tpm._finishLab({ steps: 2, misses: 0 });
    expect(tpm.completePractice).toHaveBeenCalled();
  });
});
