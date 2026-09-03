/**
 * LAB ENGINE - Knowledge AIO
 * ==========================
 *
 * A scripted terminal state machine — NOT a shell. It walks a declarative lab
 * script (see js/topics/data/labs/*.js), keeping a virtual cwd + accumulated
 * `state` object across steps and rendering persistent scrollback into the
 * existing `.terminal-sim` chrome plus `.lab-*` classes.
 *
 * Differences from the legacy terminal practice mode it supersedes:
 *   - Persistent scrollback across steps (the legacy one reset each step).
 *   - NEVER aborts on a wrong command — unlimited retries, with a 3-stage faded
 *     hint (nudge -> partial -> reveal) that escalates on each miss.
 *   - Goal-by-state validation via LabMatch (any command reaching the step's
 *     setState goal is accepted), completion gated by the script `requires`.
 *
 * Doctrine §3.10: no dynamic code compilation — LabMatch uses `new RegExp`,
 * which is allowed; events bound via registerAction + a real Enter-key listener.
 */

import { registerAction } from '../../utils/EventDispatch.js';
import { escapeHtml } from '../../utils/SanitizeHtml.js';
import { matchStep, isSuccess } from './LabMatch.js';

const MAX_HINT_LEVEL = 3;

export class LabEngine {
  /**
   * @param {string} containerId - element id to render the lab into
   * @param {{ onComplete?: (summary: {steps:number, misses:number}) => void }} [opts]
   */
  constructor(containerId, opts = {}) {
    this.containerId = containerId;
    this.onComplete = typeof opts.onComplete === 'function' ? opts.onComplete : () => {};

    this.script = null;
    this.state = {};
    this.cwd = '~';
    this.stepIndex = 0;
    this.scrollback = [];
    this.hintLevel = 0;
    this.misses = 0;

    // Latest-instance-wins, matching the lessonEngine.* / topic.* pattern.
    registerAction('lab.submit', () => this.submit());
    registerAction('lab.hint', () => this.showHint());
    registerAction('lab.done', () =>
      this.onComplete({ steps: this._stepCount(), misses: this.misses })
    );
  }

  get container() {
    return document.getElementById(this.containerId);
  }

  get currentStep() {
    return this.script && this.script.steps ? this.script.steps[this.stepIndex] : null;
  }

  _stepCount() {
    return this.script && Array.isArray(this.script.steps) ? this.script.steps.length : 0;
  }

  /** Initialise and render a lab script. */
  load(script) {
    this.script = script || null;
    this.state = {};
    this.cwd = (script && script.cwd0) || '~';
    this.stepIndex = 0;
    this.scrollback = [];
    this.hintLevel = 0;
    this.misses = 0;
    this.render();
  }

  submit() {
    const input = document.getElementById('lab-cmd-input');
    const step = this.currentStep;
    if (!input || !step) return;

    const raw = input.value;
    if (!raw.trim()) return;

    const result = matchStep(step, raw, this.state);
    if (result.ok) {
      this.state = result.state;
      this.scrollback.push({ cmd: raw.trim(), output: step.stdout || 'OK' });
      this.stepIndex += 1;
      this.hintLevel = 0;

      if (this.stepIndex >= this._stepCount() && isSuccess(this.script, this.state)) {
        this.renderComplete();
        return;
      }
      this.render();
    } else {
      // No abort: record the miss, escalate the faded hint, keep the same step.
      this.misses += 1;
      this.hintLevel = Math.min(MAX_HINT_LEVEL, this.hintLevel + 1);
      this.scrollback.push({
        cmd: raw.trim(),
        error: 'command did not achieve the goal — try again',
      });
      this.render();
    }
  }

  showHint() {
    this.hintLevel = Math.min(MAX_HINT_LEVEL, this.hintLevel + 1);
    this.render();
  }

  _autoHints(step) {
    const accept = (Array.isArray(step.accept) && step.accept[0]) || '';
    const firstWord = accept.split(/\s+/)[0] || '';
    return [
      step.hintTerm
        ? `Think about the term you just learned: "${step.hintTerm}".`
        : 'Think about which command achieves this goal.',
      firstWord ? `Start with \`${firstWord} …\`` : 'Check the command syntax.',
      accept || 'Review the task above.',
    ];
  }

  _currentHint(step) {
    if (this.hintLevel <= 0) return '';
    const hints =
      Array.isArray(step.hints) && step.hints.length ? step.hints : this._autoHints(step);
    const idx = Math.min(this.hintLevel, hints.length) - 1;
    return idx >= 0 ? hints[idx] : '';
  }

  _scrollbackHtml() {
    return this.scrollback
      .map((entry) => {
        const line = `<div class="lab-history-line"><span class="terminal-ps1">${escapeHtml(this.cwd)} $</span> <span class="terminal-history-cmd">${escapeHtml(entry.cmd)}</span></div>`;
        if (entry.error) {
          return `${line}<div class="terminal-output lab-output-error">${escapeHtml(entry.error)}</div>`;
        }
        return `${line}<div class="terminal-output">${escapeHtml(entry.output)}</div>`;
      })
      .join('');
  }

  render() {
    const container = this.container;
    const step = this.currentStep;
    if (!container || !step) return;

    const total = this._stepCount();
    const hint = this._currentHint(step);

    container.innerHTML = `
      <div class="lab-panel">
        <div class="lab-brief">
          <div class="lab-brief-title">${escapeHtml(this.script.title || 'Lab')}</div>
          ${this.script.intro ? `<div class="lab-brief-intro">${escapeHtml(this.script.intro)}</div>` : ''}
        </div>
        <div class="terminal-sim lab-terminal">
          <div class="terminal-header">
            <span class="terminal-dot terminal-dot-red"></span>
            <span class="terminal-dot terminal-dot-yellow"></span>
            <span class="terminal-dot terminal-dot-green"></span>
            <span class="terminal-header-title">lab — step ${this.stepIndex + 1}/${total}</span>
          </div>
          <div class="terminal-body">
            <div class="lab-task">
              <span class="lab-task-label">Task</span>
              <span class="lab-task-text">${escapeHtml(step.promptEn || '')}</span>
            </div>
            <div class="terminal-history">${this._scrollbackHtml()}</div>
            <div class="terminal-prompt">
              <span class="terminal-ps1">${escapeHtml(this.cwd)} $</span>
              <input class="terminal-input" type="text" id="lab-cmd-input"
                autocomplete="off" autocapitalize="off" spellcheck="false"
                placeholder="type a command and press Enter">
            </div>
            ${hint ? `<div class="lab-hint">${escapeHtml(hint)}</div>` : ''}
            <div class="lab-actions">
              <button class="btn btn-hint" data-action="lab.hint">Hint</button>
              <button class="btn btn-primary" data-action="lab.submit">Run</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const input = container.querySelector('#lab-cmd-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.submit();
      });
    }
  }

  renderComplete() {
    const container = this.container;
    if (!container) return;

    container.innerHTML = `
      <div class="lab-panel">
        <div class="terminal-sim lab-terminal lab-terminal-done">
          <div class="terminal-header">
            <span class="terminal-dot terminal-dot-red"></span>
            <span class="terminal-dot terminal-dot-yellow"></span>
            <span class="terminal-dot terminal-dot-green"></span>
            <span class="terminal-header-title">lab — complete</span>
          </div>
          <div class="terminal-body">
            <div class="terminal-history">${this._scrollbackHtml()}</div>
            <div class="lab-done-line">Goal reached. ${this.misses === 0 ? 'Clean run.' : `${this.misses} retry${this.misses === 1 ? '' : 'ies'}.`}</div>
          </div>
        </div>
        <div class="lab-actions">
          <button class="btn btn-primary" data-action="lab.done">Continua / Continue</button>
        </div>
      </div>
    `;
  }
}
