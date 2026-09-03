import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// TopicPracticeExtraModes adds two schema-only practice modes:
//
//   verofalso   — two-stage: Vero/Falso verdict, then a REQUIRED rationale.
//                 The verdict alone is a coin flip, so the question may only
//                 score when BOTH stages are right.
//   definizione — pick the Italian description (`note`) of an English term,
//                 not the one-word translation.
//
// Both run on the existing item schema, so these tests exercise pool
// filtering, decoy/distractor selection, the two-stage scoring contract, and
// the double-tap latch that keeps handleResult at exactly one call per
// question.

const makeEl = () => ({
  innerHTML: '',
  textContent: '',
  className: '',
  style: {},
  dataset: {},
  classList: { add: vi.fn(), remove: vi.fn(), toggle: vi.fn() },
  appendChild: vi.fn(),
  remove: vi.fn(),
  focus: vi.fn(),
  addEventListener: vi.fn(),
  querySelector: vi.fn(() => null),
  querySelectorAll: vi.fn(() => []),
  contains: vi.fn(() => true),
});

describe('TopicPracticeExtraModes', () => {
  let TopicPracticeManager;
  let hasDistinctTranslation;
  let hasUsableDefinition;
  let canRunVeroFalso;
  let canRunDefinizione;
  let elements;

  beforeEach(async () => {
    elements = new Map();
    for (const id of [
      'topic-practice-content',
      'topic-practice-container',
      'topic-practice-progress',
      'topic-practice-progress-fill',
      'topic-practice-timer',
      'topic-practice-streak',
      'topic-practice-xp',
    ]) {
      elements.set(id, makeEl());
    }

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
      getElementById: vi.fn((id) => elements.get(id) || null),
      querySelectorAll: vi.fn(() => []),
      addEventListener: vi.fn(),
      createElement: vi.fn(() => makeEl()),
    };
    globalThis.CSS = { escape: (s) => s };
    globalThis.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn() }));

    vi.useFakeTimers();
    vi.resetModules();
    ({ TopicPracticeManager } = await import('../js/topics/TopicPracticeManager.js'));
    ({ hasDistinctTranslation, hasUsableDefinition, canRunVeroFalso, canRunDefinizione } =
      await import('../js/topics/TopicPracticeExtraModes.js'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const content = () => elements.get('topic-practice-content');

  // Six distinct pairs across two contexts, each with a real Italian note.
  const richPool = () => [
    {
      english: 'kernel',
      italian: 'nucleo',
      context: 'os',
      note: 'Il cuore del sistema operativo che gestisce le risorse hardware.',
    },
    {
      english: 'thread',
      italian: 'filo di esecuzione',
      context: 'os',
      note: 'Unita di esecuzione piu leggera di un processo, condivide la memoria.',
    },
    {
      english: 'daemon',
      italian: 'demone',
      context: 'os',
      note: 'Processo che gira in background senza terminale associato.',
    },
    {
      english: 'socket',
      italian: 'presa di rete',
      context: 'net',
      note: 'Estremita di un canale di comunicazione tra due processi in rete.',
    },
    {
      english: 'firewall',
      italian: 'muro di fuoco',
      context: 'net',
      note: 'Filtro che decide quale traffico di rete puo passare e quale no.',
    },
    {
      english: 'router',
      italian: 'instradatore',
      context: 'net',
      note: 'Dispositivo che inoltra i pacchetti tra reti diverse.',
    },
  ];

  const build = (mode, pool) => {
    const tpm = new TopicPracticeManager({ addXP: vi.fn(), incrementTopicWord: vi.fn() });
    tpm.currentMode = mode;
    tpm.fullPool = [...pool];
    tpm.buildContextIndex(pool);
    tpm.generateQuestions(mode, pool);
    return tpm;
  };

  // ── capability predicates (shared with the mode-selector gating) ─────

  it('hasDistinctTranslation rejects missing and identity pairs', () => {
    expect(hasDistinctTranslation({ english: 'kernel', italian: 'nucleo' })).toBe(true);
    expect(hasDistinctTranslation({ english: 'Bash', italian: 'bash' })).toBe(false);
    expect(hasDistinctTranslation({ english: 'kernel' })).toBe(false);
    expect(hasDistinctTranslation({ italian: 'nucleo' })).toBe(false);
    expect(hasDistinctTranslation(null)).toBe(false);
  });

  it('hasUsableDefinition requires a note of at least 20 characters', () => {
    expect(hasUsableDefinition({ english: 'kernel', note: 'x'.repeat(20) })).toBe(true);
    expect(hasUsableDefinition({ english: 'kernel', note: 'troppo corto' })).toBe(false);
    expect(hasUsableDefinition({ english: 'kernel' })).toBe(false);
    expect(hasUsableDefinition({ note: 'x'.repeat(40) })).toBe(false);
    expect(hasUsableDefinition(undefined)).toBe(false);
  });

  // ── verofalso: question generation ──────────────────────────────────

  it('verofalso generates a MIX of true and false statements', () => {
    // The verdict plan is balanced by construction; repeat anyway so a lucky
    // shuffle cannot hide an all-true regression.
    for (let run = 0; run < 20; run += 1) {
      const tpm = build('verofalso', richPool());
      expect(tpm.questions.length).toBeGreaterThanOrEqual(4);
      const verdicts = tpm.questions.map((q) => q.statementIsTrue);
      expect(verdicts).toContain(true);
      expect(verdicts).toContain(false);
    }
  });

  it('verofalso builds the statement from the shown Italian, true or false', () => {
    const tpm = build('verofalso', richPool());
    for (const q of tpm.questions) {
      expect(q.type).toBe('verofalso');
      expect(q.statement).toContain(q.english);
      expect(q.statement).toContain(q.shownItalian);
      if (q.statementIsTrue) {
        expect(q.shownItalian).toBe(q.italian);
      } else {
        expect(q.shownItalian).toBe(q.decoyItalian);
      }
    }
  });

  it("a false statement's decoy Italian never equals the target's Italian", () => {
    for (let run = 0; run < 30; run += 1) {
      const tpm = build('verofalso', richPool());
      const falseOnes = tpm.questions.filter((q) => !q.statementIsTrue);
      expect(falseOnes.length).toBeGreaterThan(0);
      for (const q of falseOnes) {
        expect(q.decoyItalian).not.toBe('');
        expect(q.decoyItalian.toLowerCase()).not.toBe(q.italian.toLowerCase());
        expect(q.shownItalian.toLowerCase()).not.toBe(q.italian.toLowerCase());
      }
    }
  });

  it('verofalso skips items whose English equals their Italian', () => {
    const pool = [
      { english: 'Bash', italian: 'Bash', context: 'cli' },
      { english: 'Console', italian: 'console', context: 'cli' },
      { english: 'kernel', italian: 'nucleo', context: 'cli' },
      { english: 'thread', italian: 'filo di esecuzione', context: 'cli' },
      { english: 'daemon', italian: 'demone', context: 'cli' },
    ];
    const tpm = build('verofalso', pool);
    const englishes = tpm.questions.map((q) => q.english);
    expect(englishes).not.toContain('Bash');
    expect(englishes).not.toContain('Console');
    expect(tpm.questions.length).toBe(3);
  });

  it('verofalso yields no questions when fewer than two usable items exist', () => {
    expect(build('verofalso', []).questions).toEqual([]);
    expect(build('verofalso', [{ english: 'kernel', italian: 'nucleo' }]).questions).toEqual([]);
    expect(build('verofalso', [{ english: 'Bash', italian: 'bash' }]).questions).toEqual([]);
  });

  // ── verofalso: rationales ───────────────────────────────────────────

  it('verofalso rationales are distinct, contain exactly one correct entry, and never leak', () => {
    for (let run = 0; run < 20; run += 1) {
      const tpm = build('verofalso', richPool());
      for (const q of tpm.questions) {
        expect(q.rationales.length).toBe(3);
        const texts = q.rationales.map((r) => r.text);
        expect(new Set(texts).size).toBe(texts.length);
        expect(q.rationales.filter((r) => r.correct).length).toBe(1);

        const correct = q.rationales.find((r) => r.correct);
        expect(correct.text).toContain(q.italian);

        // No distractor may assert the real pairing.
        for (const wrong of q.rationales.filter((r) => !r.correct)) {
          expect(wrong.text).toContain(q.english);
          expect(wrong.text.split(`${q.english}» significa «`)[1]).not.toMatch(
            new RegExp(`^${q.italian.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}»`)
          );
        }
      }
    }
  });

  // ── verofalso: two-stage scoring ────────────────────────────────────

  const stageFixture = (wantTrueStatement) => {
    const tpm = build('verofalso', richPool());
    const idx = tpm.questions.findIndex((q) => q.statementIsTrue === wantTrueStatement);
    expect(idx).toBeGreaterThanOrEqual(0);
    tpm.currentQuestionIndex = idx;
    tpm.handleResult = vi.fn((isCorrect) => {
      if (isCorrect) tpm.score += 1;
    });
    const q = tpm.questions[idx];
    const correctIdx = q.rationales.findIndex((r) => r.correct);
    const wrongIdx = q.rationales.findIndex((r) => !r.correct);
    return { tpm, q, correctIdx, wrongIdx };
  };

  it('scores correct only when the verdict AND the rationale are both right', () => {
    const { tpm, correctIdx } = stageFixture(false);
    tpm.answerVeroFalsoVerdict(false); // statement is false → verdict right
    tpm.answerVeroFalsoRationale(correctIdx);

    expect(tpm.handleResult).toHaveBeenCalledTimes(1);
    expect(tpm.handleResult.mock.calls[0][0]).toBe(true);
    expect(tpm.score).toBe(1);
  });

  it('right verdict + wrong rationale scores as INCORRECT', () => {
    const { tpm, q, wrongIdx } = stageFixture(false);
    tpm.answerVeroFalsoVerdict(false); // verdict right
    expect(q.verdictCorrect).toBe(true);
    tpm.answerVeroFalsoRationale(wrongIdx); // rationale wrong

    expect(tpm.handleResult).toHaveBeenCalledTimes(1);
    expect(tpm.handleResult.mock.calls[0][0]).toBe(false);
    expect(tpm.score).toBe(0);
  });

  it('wrong verdict + right rationale scores as INCORRECT', () => {
    const { tpm, q, correctIdx } = stageFixture(true);
    tpm.answerVeroFalsoVerdict(false); // statement is true → verdict wrong
    expect(q.verdictCorrect).toBe(false);
    tpm.answerVeroFalsoRationale(correctIdx);

    expect(tpm.handleResult).toHaveBeenCalledTimes(1);
    expect(tpm.handleResult.mock.calls[0][0]).toBe(false);
    expect(tpm.score).toBe(0);
  });

  it('hands handleResult the correct rationale text as the shown answer', () => {
    const { tpm, q, wrongIdx } = stageFixture(true);
    tpm.answerVeroFalsoVerdict(true);
    tpm.answerVeroFalsoRationale(wrongIdx);

    const expected = q.rationales.find((r) => r.correct).text;
    expect(tpm.handleResult.mock.calls[0][1]).toBe(expected);
  });

  it('stage 2 still runs after a wrong verdict (the rationale is always asked)', () => {
    const { tpm, q } = stageFixture(true);
    tpm.answerVeroFalsoVerdict(false);
    expect(q.verdictAnswered).toBe(true);
    expect(tpm.handleResult).not.toHaveBeenCalled();
    expect(content().innerHTML).toContain('topicPractice.veroFalsoRationale');
  });

  // ── double-tap latches ──────────────────────────────────────────────

  it('double-tapping a rationale does not double-score', () => {
    const { tpm, correctIdx } = stageFixture(false);
    tpm.answerVeroFalsoVerdict(false);
    tpm.answerVeroFalsoRationale(correctIdx);
    tpm.answerVeroFalsoRationale(correctIdx);
    tpm.answerVeroFalsoRationale(correctIdx);

    expect(tpm.handleResult).toHaveBeenCalledTimes(1);
    expect(tpm.score).toBe(1);
  });

  it('double-tapping the verdict keeps the first answer and never re-opens stage 1', () => {
    const { tpm, q, correctIdx } = stageFixture(false);
    tpm.answerVeroFalsoVerdict(false);
    tpm.answerVeroFalsoVerdict(true); // ignored
    expect(q.verdictGiven).toBe(false);
    expect(q.verdictCorrect).toBe(true);

    tpm.answerVeroFalsoRationale(correctIdx);
    tpm.answerVeroFalsoVerdict(true); // ignored after resolution too
    expect(tpm.handleResult).toHaveBeenCalledTimes(1);
  });

  it('an out-of-range rationale index is ignored and leaves the question open', () => {
    const { tpm, q, correctIdx } = stageFixture(false);
    tpm.answerVeroFalsoVerdict(false);
    tpm.answerVeroFalsoRationale(99);
    tpm.answerVeroFalsoRationale(Number.NaN);
    expect(tpm.handleResult).not.toHaveBeenCalled();
    expect(q.resolved).toBe(false);

    tpm.answerVeroFalsoRationale(correctIdx);
    expect(tpm.handleResult).toHaveBeenCalledTimes(1);
  });

  it('a rationale tapped before the verdict is ignored', () => {
    const { tpm, correctIdx } = stageFixture(false);
    tpm.answerVeroFalsoRationale(correctIdx);
    expect(tpm.handleResult).not.toHaveBeenCalled();
  });

  it('double-tapping a definizione option does not double-score', () => {
    const tpm = build('definizione', richPool());
    tpm.currentQuestionIndex = 0;
    tpm.handleResult = vi.fn((isCorrect) => {
      if (isCorrect) tpm.score += 1;
    });
    const q = tpm.questions[0];

    tpm.checkDefinizioneAnswer(null, q.note, q.note);
    tpm.checkDefinizioneAnswer(null, q.note, q.note);

    expect(tpm.handleResult).toHaveBeenCalledTimes(1);
    expect(tpm.handleResult.mock.calls[0][0]).toBe(true);
    expect(tpm.score).toBe(1);
  });

  // ── definizione: generation ─────────────────────────────────────────

  it('definizione keeps only items with a usable note', () => {
    const pool = [
      ...richPool(),
      { english: 'stack', italian: 'pila', context: 'os' },
      { english: 'heap', italian: 'mucchio', context: 'os', note: 'breve' },
      { english: 'queue', italian: 'coda', context: 'os', note: 42 },
    ];
    const tpm = build('definizione', pool);
    const englishes = tpm.questions.map((q) => q.english);
    expect(englishes).not.toContain('stack');
    expect(englishes).not.toContain('heap');
    expect(englishes).not.toContain('queue');
    expect(tpm.questions.length).toBe(6);
    for (const q of tpm.questions) {
      expect(q.note.length).toBeGreaterThanOrEqual(20);
    }
  });

  it('definizione never emits duplicate options and always includes the correct note', () => {
    const pool = [
      ...richPool(),
      // Two items sharing the exact same note must not both appear as options.
      {
        english: 'gateway',
        italian: 'porta di accesso',
        context: 'net',
        note: 'Dispositivo che inoltra i pacchetti tra reti diverse.',
      },
    ];
    for (let run = 0; run < 25; run += 1) {
      const tpm = build('definizione', pool);
      for (const q of tpm.questions) {
        expect(q.options.length).toBeGreaterThanOrEqual(2);
        expect(q.options.length).toBeLessThanOrEqual(4);
        expect(q.options).toContain(q.note);
        expect(new Set(q.options).size).toBe(q.options.length);
        for (const opt of q.options) {
          expect(typeof opt).toBe('string');
          expect(opt.length).toBeGreaterThanOrEqual(20);
        }
      }
    }
  });

  it('definizione with fewer than 4 usable notes still renders 2+ real options', () => {
    const pool = [
      {
        english: 'kernel',
        italian: 'nucleo',
        context: 'os',
        note: 'Il cuore del sistema operativo che gestisce le risorse.',
      },
      {
        english: 'daemon',
        italian: 'demone',
        context: 'os',
        note: 'Processo che gira in background senza terminale associato.',
      },
      { english: 'stack', italian: 'pila', context: 'os' },
      { english: 'heap', italian: 'mucchio', context: 'os', note: 'breve' },
    ];
    const tpm = build('definizione', pool);
    expect(tpm.questions.length).toBe(2);

    for (const q of tpm.questions) {
      expect(q.options.length).toBe(2);
      expect(q.options).toContain(q.note);
      expect(q.options.every((opt) => typeof opt === 'string' && opt.length > 0)).toBe(true);

      tpm.currentQuestionIndex = tpm.questions.indexOf(q);
      content().innerHTML = '';
      tpm.renderDefinizioneQuestion(content(), q);
      const html = content().innerHTML;
      expect(html).not.toContain('undefined');
      const optionCount = (html.match(/data-action="topicPractice\.checkDefinizione"/g) || [])
        .length;
      expect(optionCount).toBe(2);
    }
  });

  it('definizione yields no questions when no item has a usable note', () => {
    const pool = [
      { english: 'kernel', italian: 'nucleo', context: 'os' },
      { english: 'daemon', italian: 'demone', context: 'os', note: 'corto' },
      { english: 'thread', italian: 'filo', context: 'os' },
      { english: 'socket', italian: 'presa', context: 'net' },
    ];
    expect(build('definizione', pool).questions).toEqual([]);
    expect(build('definizione', []).questions).toEqual([]);
  });

  // ── rendering ───────────────────────────────────────────────────────

  it('renderQuestion routes verofalso and definizione to their own renderers', () => {
    const vf = build('verofalso', richPool());
    vf.currentQuestionIndex = 0;
    vf.renderQuestion();
    expect(content().innerHTML).toContain('verofalso-card');
    expect(content().innerHTML).toContain('data-action="topicPractice.veroFalsoVerdict"');

    const def = build('definizione', richPool());
    def.currentQuestionIndex = 0;
    def.renderQuestion();
    expect(content().innerHTML).toContain('definizione-card');
    expect(content().innerHTML).toContain('data-action="topicPractice.checkDefinizione"');
  });

  it('verofalso stage 1 offers a bilingual Vero/Falso pair and no inline handler', () => {
    const tpm = build('verofalso', richPool());
    tpm.currentQuestionIndex = 0;
    tpm.renderVeroFalsoQuestion(content(), tpm.questions[0]);
    const html = content().innerHTML;

    expect(html).toContain('Vero / True');
    expect(html).toContain('Falso / False');
    expect(html).toContain('data-verdict="true"');
    expect(html).toContain('data-verdict="false"');
    expect(html).not.toMatch(/\son[a-z]+\s*=/i);
    expect(html).not.toContain('undefined');
  });

  it('verofalso stage 2 recaps the verdict without revealing whether it was right', () => {
    const tpm = build('verofalso', richPool());
    tpm.currentQuestionIndex = 0;
    tpm.handleResult = vi.fn();
    tpm.answerVeroFalsoVerdict(true);
    const html = content().innerHTML;

    // The label is escaped (the '/' separator becomes &#x2F;), so match parts.
    const recap = html.split('verofalso-recap')[1].split('</div>')[0];
    expect(recap).toContain('Your answer');
    expect(recap).toContain('Vero');
    expect(recap).toContain('True');
    expect(recap).not.toContain('Falso');
    // The recap must not grade stage 1 — that would give away stage 2.
    expect(html).not.toMatch(/corrett|sbagliat|giusta|errat/i);
    expect(html).toContain('data-idx="0"');
    const optionCount = (html.match(/data-action="topicPractice\.veroFalsoRationale"/g) || [])
      .length;
    expect(optionCount).toBe(tpm.questions[0].rationales.length);
  });

  it('escapes hostile item text in both modes', () => {
    const hostile = [
      {
        english: '<img src=x onerror="alert(1)">',
        italian: '"><script>alert(2)</script>',
        context: 'xss',
        note: '<b>Descrizione lunga abbastanza da passare il filtro.</b>',
      },
      {
        english: 'kernel',
        italian: 'nucleo',
        context: 'xss',
        note: 'Il cuore del sistema operativo che gestisce le risorse hardware.',
      },
      {
        english: 'daemon',
        italian: 'demone',
        context: 'xss',
        note: 'Processo che gira in background senza terminale associato.',
      },
    ];

    // No raw tag may survive, and no attribute may be broken out of: an
    // escaped `onerror=&quot;` is inert, an unescaped `onerror="` is not.
    const assertInert = (html) => {
      expect(html).not.toContain('<script');
      expect(html).not.toMatch(/<img/i);
      expect(html).not.toMatch(/\son[a-z]+\s*=\s*["']/i);
      expect(html).toContain('&lt;');
    };

    const vf = build('verofalso', hostile);
    const vfIdx = vf.questions.findIndex((q) => q.english === hostile[0].english);
    expect(vfIdx).toBeGreaterThanOrEqual(0);
    vf.currentQuestionIndex = vfIdx;
    vf.renderVeroFalsoQuestion(content(), vf.questions[vfIdx]);
    assertInert(content().innerHTML);

    const def = build('definizione', hostile);
    const defIdx = def.questions.findIndex((q) => q.english === hostile[0].english);
    expect(defIdx).toBeGreaterThanOrEqual(0);
    def.currentQuestionIndex = defIdx;
    def.renderDefinizioneQuestion(content(), def.questions[defIdx]);
    assertInert(content().innerHTML);
  });

  // ── robustness ──────────────────────────────────────────────────────

  it('survives ragged items (missing note, identity translation, blank fields)', () => {
    const ragged = [
      { english: 'Bash', italian: 'Bash', context: 'cli' },
      { english: '   ', italian: 'vuoto', context: 'cli' },
      { english: 'kernel', italian: '   ', context: 'cli' },
      { english: 'thread', italian: 'filo di esecuzione', context: 'cli' },
      { english: 'daemon', italian: 'demone', context: 'cli', note: null },
      { english: 'socket', italian: 'presa di rete', context: 'cli', note: undefined },
      { context: 'cli' },
    ];

    const vf = build('verofalso', ragged);
    expect(vf.questions.length).toBe(3);
    for (const q of vf.questions) {
      expect(q.statement).not.toContain('undefined');
      expect(q.rationales.length).toBeGreaterThanOrEqual(2);
      vf.currentQuestionIndex = vf.questions.indexOf(q);
      vf.renderVeroFalsoQuestion(content(), q);
      expect(content().innerHTML).not.toContain('undefined');
    }

    const def = build('definizione', ragged);
    expect(def.questions).toEqual([]);
  });

  // ── capability gating must match what the generators can build ───────
  //
  // The mode selector renders a card as enabled purely from the pool. If the
  // predicate says "yes" and the generator then returns [], startPractice
  // dead-ends on "Nessuna domanda disponibile" — the card is a trap.

  it('a pool of 4 items sharing ONE Italian gloss gates verofalso OFF', () => {
    // Every candidate decoy has the target's own Italian, so no FALSE
    // statement and no rationale distractor can be built at all.
    const pool = [
      { english: 'firewall', italian: 'rete', context: 'net' },
      { english: 'router', italian: 'rete', context: 'net' },
      { english: 'switch', italian: 'Rete', context: 'net' },
      { english: 'gateway', italian: 'rete', context: 'net' },
    ];
    expect(pool.filter(hasDistinctTranslation).length).toBe(4); // item count alone says "enable"
    expect(canRunVeroFalso(pool)).toBe(false);
    expect(build('verofalso', pool).questions).toEqual([]);
  });

  it('a pool of 4 items sharing ONE note gates definizione OFF', () => {
    const shared = 'Componente della infrastruttura di rete aziendale.';
    const pool = [
      { english: 'firewall', italian: 'muro', context: 'net', note: shared },
      { english: 'router', italian: 'instradatore', context: 'net', note: shared },
      { english: 'switch', italian: 'commutatore', context: 'net', note: shared },
      { english: 'gateway', italian: 'accesso', context: 'net', note: shared },
    ];
    expect(pool.filter(hasUsableDefinition).length).toBe(4); // item count alone says "enable"
    expect(canRunDefinizione(pool)).toBe(false);
    expect(build('definizione', pool).questions).toEqual([]);
  });

  it('an ENABLED gate always yields a full session: no drops, 3 rationales, 4 options', () => {
    for (let run = 0; run < 20; run += 1) {
      const pool = richPool();
      expect(canRunVeroFalso(pool)).toBe(true);
      expect(canRunDefinizione(pool)).toBe(true);

      const vf = build('verofalso', pool);
      expect(vf.questions.length).toBe(pool.length);
      for (const q of vf.questions) expect(q.rationales.length).toBe(3);

      const def = build('definizione', pool);
      expect(def.questions.length).toBe(pool.length);
      for (const q of def.questions) expect(q.options.length).toBe(4);
    }
  });

  it('the gate rejects a pool the richPool minus its variety would sneak through', () => {
    // Three distinct glosses is one short: a FALSE question would have only
    // the correct rationale plus a single distractor.
    const pool = [
      { english: 'kernel', italian: 'nucleo', context: 'os' },
      { english: 'core', italian: 'nucleo', context: 'os' },
      { english: 'thread', italian: 'filo', context: 'os' },
      { english: 'daemon', italian: 'demone', context: 'os' },
    ];
    expect(canRunVeroFalso(pool)).toBe(false);
  });

  // ── degenerate statements ───────────────────────────────────────────

  it('a decoy never equals the target English, so no «term» significa «term» statement', () => {
    // Shape lifted from real data: one item's Italian gloss IS another item's
    // English term (english: 'Istio', italian: 'Service mesh').
    const pool = [
      { english: 'Service mesh', italian: 'mTLS piu observability', context: 'infra' },
      { english: 'Istio', italian: 'Service mesh', context: 'infra' },
      { english: 'sidecar', italian: 'contenitore affiancato', context: 'infra' },
      { english: 'ingress', italian: 'punto di ingresso', context: 'infra' },
      { english: 'egress', italian: 'traffico in uscita', context: 'infra' },
    ];
    for (let run = 0; run < 40; run += 1) {
      const tpm = build('verofalso', pool);
      for (const q of tpm.questions) {
        expect(q.shownItalian.toLowerCase()).not.toBe(q.english.toLowerCase());
        expect(q.statement).not.toBe(`«${q.english}» significa «${q.english}».`);
        for (const r of q.rationales) {
          // No rationale may assert the degenerate identity either.
          expect(r.text).not.toContain(`significa «${q.english}»`);
        }
      }
    }
  });

  it('a minimally-enabled pool (exactly 4 glosses) still mixes verdicts every run', () => {
    const pool = [
      { english: 'kernel', italian: 'nucleo', context: 'os' },
      { english: 'thread', italian: 'filo di esecuzione', context: 'os' },
      { english: 'daemon', italian: 'demone', context: 'os' },
      { english: 'socket', italian: 'presa di rete', context: 'os' },
    ];
    expect(canRunVeroFalso(pool)).toBe(true);
    for (let run = 0; run < 30; run += 1) {
      const tpm = build('verofalso', pool);
      // No question may be silently dropped — a learner who always taps
      // "Vero" must not sweep the set.
      expect(tpm.questions.length).toBe(4);
      const verdicts = tpm.questions.map((q) => q.statementIsTrue);
      expect(verdicts).toContain(true);
      expect(verdicts).toContain(false);
    }
  });

  it('a sub-gate pool degrades a FALSE slot to TRUE instead of dropping the question', () => {
    // Two distinct glosses only: a FALSE statement consumes the single spare
    // gloss as its decoy, leaving no rationale distractor. The generator must
    // fall back to the TRUE form — dropping would delete FALSE slots
    // preferentially and shrink the session. (The selector gates this pool
    // off; the guard exists so a direct generator call cannot regress.)
    const pool = [
      { english: 'firewall', italian: 'rete', context: 'net' },
      { english: 'router', italian: 'rete', context: 'net' },
      { english: 'switch', italian: 'commutatore', context: 'net' },
      { english: 'gateway', italian: 'rete', context: 'net' },
    ];
    expect(canRunVeroFalso(pool)).toBe(false);
    for (let run = 0; run < 20; run += 1) {
      const tpm = build('verofalso', pool);
      expect(tpm.questions.length).toBe(4);
      for (const q of tpm.questions) {
        expect(q.rationales.length).toBeGreaterThanOrEqual(2);
        expect(q.statement).not.toContain('undefined');
      }
    }
  });

  // ── scoring through the REAL handleResult (no stub) ──────────────────

  const realManager = (mode, pool) => {
    const progressManager = {
      addXP: vi.fn(),
      incrementTopicWord: vi.fn(),
      recordPracticeSession: vi.fn(),
      updateTopicPracticeStats: vi.fn(),
    };
    const tpm = new TopicPracticeManager(progressManager);
    tpm.currentMode = mode;
    tpm.currentTopicId = 'linux';
    tpm.currentLevel = 0;
    tpm.fullPool = [...pool];
    tpm.buildContextIndex(pool);
    tpm.generateQuestions(mode, pool);
    tpm.questionStartTime = Date.now();
    return { tpm, progressManager };
  };

  it('verofalso: a triple-tapped rationale awards score and XP exactly once', () => {
    const { tpm, progressManager } = realManager('verofalso', richPool());
    const idx = tpm.questions.findIndex((q) => q.statementIsTrue === false);
    tpm.currentQuestionIndex = idx;
    const q = tpm.questions[idx];
    const correctIdx = q.rationales.findIndex((r) => r.correct);

    tpm.answerVeroFalsoVerdict(false);
    tpm.answerVeroFalsoRationale(correctIdx);
    tpm.answerVeroFalsoRationale(correctIdx);
    tpm.answerVeroFalsoRationale(correctIdx);

    expect(tpm.score).toBe(1);
    expect(tpm.score).toBeLessThanOrEqual(tpm.questions.length);
    expect(progressManager.addXP).toHaveBeenCalledTimes(1);
    expect(progressManager.incrementTopicWord).toHaveBeenCalledTimes(1);
    expect(tpm.consecutiveCorrect).toBe(1);
  });

  it('verofalso: a right verdict with a wrong rationale awards NO score and NO XP', () => {
    const { tpm, progressManager } = realManager('verofalso', richPool());
    const idx = tpm.questions.findIndex((q) => q.statementIsTrue === false);
    tpm.currentQuestionIndex = idx;
    const q = tpm.questions[idx];
    const wrongIdx = q.rationales.findIndex((r) => !r.correct);

    tpm.answerVeroFalsoVerdict(false);
    expect(q.verdictCorrect).toBe(true);
    tpm.answerVeroFalsoRationale(wrongIdx);

    expect(tpm.score).toBe(0);
    expect(progressManager.addXP).not.toHaveBeenCalled();
    expect(progressManager.incrementTopicWord).not.toHaveBeenCalled();
  });

  it('definizione: a triple-tapped option awards score and XP exactly once', () => {
    const { tpm, progressManager } = realManager('definizione', richPool());
    tpm.currentQuestionIndex = 0;
    const q = tpm.questions[0];

    tpm.checkDefinizioneAnswer(null, q.note, q.note);
    tpm.checkDefinizioneAnswer(null, q.note, q.note);
    tpm.checkDefinizioneAnswer(null, q.note, q.note);

    expect(tpm.score).toBe(1);
    expect(progressManager.addXP).toHaveBeenCalledTimes(1);
  });

  it('definizione: a wrong option scores incorrect through the shared checkAnswer path', () => {
    const { tpm, progressManager } = realManager('definizione', richPool());
    tpm.currentQuestionIndex = 0;
    const q = tpm.questions[0];
    const wrong = q.options.find((opt) => opt !== q.note);

    tpm.checkDefinizioneAnswer(null, wrong, q.note);

    expect(tpm.score).toBe(0);
    expect(progressManager.addXP).not.toHaveBeenCalled();
    // and the latch still holds afterwards
    tpm.checkDefinizioneAnswer(null, q.note, q.note);
    expect(tpm.score).toBe(0);
  });
});
