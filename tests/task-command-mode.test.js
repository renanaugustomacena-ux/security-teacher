import { describe, it, expect, beforeEach, vi } from 'vitest';
import { deriveSubContext } from '../js/utils/PracticeUtils.js';

// Tier-3: a question axis that is not a translation. The prompt is a goal and
// the options are real commands, so the wrong answers are other things the
// tool can actually do.

describe('deriveSubContext', () => {
  it('groups by the command program when no tool is authored', () => {
    expect(deriveSubContext({ command: 'git stash pop', context: 'vcs' })).toBe('git');
    expect(deriveSubContext({ command: 'docker run nginx', context: 'containers' })).toBe('docker');
  });

  it('prefers an explicit tool field', () => {
    expect(deriveSubContext({ tool: 'Kubernetes', command: 'kubectl get pods' })).toBe(
      'kubernetes'
    );
  });

  it('falls back to the authored context for items without a command', () => {
    expect(deriveSubContext({ context: 'foundations' })).toBe('foundations');
    expect(deriveSubContext({})).toBe('general');
  });

  it('ignores a command that does not start with a program-like token', () => {
    expect(deriveSubContext({ command: '$(subshell)', context: 'cli' })).toBe('cli');
  });
});

describe('TopicPracticeManager — task → command questions', () => {
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
      createElement: vi.fn(() => ({ className: '', dataset: {}, style: {} })),
    };
    globalThis.CSS = { escape: (s) => s };
    globalThis.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn() }));
    vi.resetModules();
    ({ TopicPracticeManager } = await import('../js/topics/TopicPracticeManager.js'));
  });

  const gitPool = [
    'git stash',
    'git stash pop',
    'git stash list',
    'git stash apply',
    'git stash drop',
  ].map((command, i) => ({
    english: `Stash${i}`,
    italian: `Riserva ${i}`,
    task: `Obiettivo numero ${i} sulla working tree`,
    command,
    context: 'vcs',
    _subContext: 'git',
    _topicId: 'git-vcs',
    _level: 0,
  }));

  it('excludes tasks that quote the command they are asking for', () => {
    const tpm = new TopicPracticeManager();
    const usable = tpm.taskCommandCandidates([
      { task: 'Esegui git init nella cartella', command: 'git init' },
      { task: 'Metti da parte le modifiche', command: 'git stash' },
    ]);
    expect(usable).toHaveLength(1);
    expect(usable[0].command).toBe('git stash');
  });

  it('excludes tasks carrying a backticked fragment', () => {
    const tpm = new TopicPracticeManager();
    const usable = tpm.taskCommandCandidates([
      { task: 'Inizializza con `git init` una sola volta', command: 'git init' },
    ]);
    expect(usable).toHaveLength(0);
  });

  it('builds a question whose options are all real commands', () => {
    const tpm = new TopicPracticeManager();
    const q = tpm.buildTaskCommandQuestion(gitPool[0], gitPool, 0.9);
    expect(q).not.toBeNull();
    expect(q.correct).toBe('git stash');
    expect(q.options).toContain('git stash');
    expect(q.options.length).toBeGreaterThanOrEqual(3);
    expect(new Set(q.options).size).toBe(q.options.length);
  });

  it('leaves the prompt readable — no masking', () => {
    const tpm = new TopicPracticeManager();
    const q = tpm.buildTaskCommandQuestion(gitPool[0], gitPool, 0.9);
    expect(q.prompt).toBe(gitPool[0].task);
    expect(q.prompt).not.toContain('___');
  });

  it('requires same-program distractors when the prompt names the program', () => {
    const tpm = new TopicPracticeManager();
    const item = {
      english: 'Version',
      task: 'Verifica quale versione di bash gira sulla macchina',
      command: 'bash --version',
      _subContext: 'bash',
      _topicId: 'linux',
      _level: 0,
    };
    // Only other-program commands available: naming bash in the prompt would
    // single the answer out, so the question must not be built.
    const weak = [
      item,
      { command: 'python3 --version', _subContext: 'python3', _topicId: 'linux', _level: 0 },
      { command: 'rsync --help', _subContext: 'rsync', _topicId: 'linux', _level: 0 },
      { command: 'last -n 20', _subContext: 'last', _topicId: 'linux', _level: 0 },
    ];
    expect(tpm.buildTaskCommandQuestion(item, weak, 0.9)).toBeNull();

    const strong = [
      item,
      { command: 'bash -n script.sh', _subContext: 'bash', _topicId: 'linux', _level: 0 },
      { command: 'bash -x script.sh', _subContext: 'bash', _topicId: 'linux', _level: 0 },
      { command: 'bash -c "echo hi"', _subContext: 'bash', _topicId: 'linux', _level: 0 },
    ];
    const q = tpm.buildTaskCommandQuestion(item, strong, 0.9);
    expect(q).not.toBeNull();
    for (const option of q.options) expect(option.startsWith('bash')).toBe(true);
  });

  it('returns null rather than a two-option question', () => {
    const tpm = new TopicPracticeManager();
    expect(tpm.buildTaskCommandQuestion(gitPool[0], [gitPool[0], gitPool[1]], 0.5)).toBeNull();
  });

  it('generateQuestions produces a playable set', () => {
    const tpm = new TopicPracticeManager();
    tpm.currentTopicId = 'git-vcs';
    tpm.currentLevel = 0;
    tpm.fullPool = gitPool;
    tpm.buildContextIndex(gitPool);
    tpm.generateQuestions('taskcommand', gitPool);
    expect(tpm.questions.length).toBeGreaterThan(0);
    for (const q of tpm.questions) {
      expect(q.options).toContain(q.correct);
      expect(q.type).toBe('taskcommand');
    }
  });
});

describe('buildContextIndex — grouping key', () => {
  let TopicPracticeManager;

  beforeEach(async () => {
    vi.resetModules();
    ({ TopicPracticeManager } = await import('../js/topics/TopicPracticeManager.js'));
  });

  it('uses the derived sub-context when the level offers enough of them', () => {
    const tpm = new TopicPracticeManager();
    const pool = ['git', 'docker', 'kubectl', 'curl'].map((program) => ({
      context: 'devops',
      _subContext: program,
    }));
    tpm.buildContextIndex(pool);
    expect(tpm.contextField).toBe('_subContext');
    expect(tpm.contextIndex.size).toBe(4);
  });

  it('falls back to the authored context when sub-contexts are too few', () => {
    const tpm = new TopicPracticeManager();
    const pool = [
      { context: 'foundations', _subContext: 'foundations' },
      { context: 'foundations', _subContext: 'git' },
    ];
    tpm.buildContextIndex(pool);
    expect(tpm.contextField).toBe('context');
    expect(tpm.contextIndex.size).toBe(1);
  });
});
