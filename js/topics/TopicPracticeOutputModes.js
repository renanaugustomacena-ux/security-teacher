/**
 * TOPIC PRACTICE — OUTPUT MODES - Knowledge AIO
 * =============================================
 *
 * Three security-English formats that read or produce commands, mixed onto
 * TopicPracticeManager.prototype:
 *
 *   readout   — read a fake command/output, pick the English sentence that
 *               describes what it does (reading technical output, the real
 *               literacy gap for non-native security pros).
 *   dictation — hear an English instruction, TYPE the command (the killer
 *               differentiator: listening transcription fused with competence).
 *   cmdcloze  — a command with one token blanked, where the blank IS the vocab
 *               target (cloze doing double duty as command practice).
 *
 * All three route their answer-check through the manager's existing handlers
 * (checkAnswer / checkCommandAnswer) so analytics + mastery flow unchanged.
 */

import { escapeHtml, escapeAttr } from '../utils/SanitizeHtml.js';
import { shuffleArray, containsFolded, containsWholeWord } from '../utils/PracticeUtils.js';
import { adaptiveDifficultyService } from '../services/AdaptiveDifficultyService.js';
import { analyticsService } from '../services/AnalyticsService.js';
import { ttsService } from '../services/TTSService.js';

const MAX_Q = 10;

const enOf = (item) => ((item.example || '').split(' = ')[0] || '').trim();

export const outputModesMixin = {
  // ─── READOUT ──────────────────────────────────────

  generateReadoutQuestions(pool) {
    // The question shows `$ <command>` and asks which sentence describes it.
    // When that sentence names the program itself ("Nmap scans the target…"
    // under `$ nmap …`) it can be matched on the token alone, no comprehension
    // required — 22.6% of otherwise eligible items. Excluded rather than
    // masked: masking only the correct option would be its own tell.
    const namesItsProgram = (item) =>
      containsWholeWord(enOf(item), (item.command || '').trim().split(/\s+/)[0]);
    const items = pool.filter(
      (i) => i.command && (i.example || '').includes(' = ') && !namesItsProgram(i)
    );
    const selected = adaptiveDifficultyService.selectItems(items, MAX_Q, (key) =>
      analyticsService.getItemAnalytics(key)
    );
    return selected
      .map((item) => {
        const correct = enOf(item);
        const distractors = shuffleArray(
          items.filter((x) => x !== item && enOf(x) && enOf(x) !== correct)
        )
          .slice(0, 3)
          .map(enOf);
        return {
          type: 'readout',
          command: item.command,
          options: shuffleArray([correct, ...distractors]),
          correct,
          item,
          english: item.english,
          context: item.context,
        };
      })
      .filter((q) => q.options.length >= 2);
  },

  renderReadout(container, q) {
    container.innerHTML = `
      <div class="exercise-card">
        <div class="exercise-instruction">Leggi l'output e scegli / Read the output and choose:</div>
        <div class="tech-code-exercise readout-output"><pre><code>$ ${escapeHtml(q.command)}</code></pre></div>
        <div class="exercise-comprehension-question">Quale frase descrive cosa fa? / Which sentence describes what it does?</div>
        <div class="options-grid">
          ${q.options
            .map(
              (opt) => `
            <button class="btn btn-secondary option-btn"
              data-action="topicPractice.checkAnswer" data-opt="${escapeAttr(opt)}" data-correct="${escapeAttr(q.correct)}">
              ${escapeHtml(opt)}
            </button>`
            )
            .join('')}
        </div>
      </div>
    `;
  },

  // ─── DICTATION ────────────────────────────────────

  generateDictationQuestions(pool) {
    const items = pool.filter((i) => i.command);
    const selected = adaptiveDifficultyService.selectItems(items, MAX_Q, (key) =>
      analyticsService.getItemAnalytics(key)
    );
    return selected.map((item) => ({
      type: 'dictation',
      instruction: item.taskEn || `Run the command for ${item.english}.`,
      command: item.command,
      item,
      english: item.english,
      context: item.context,
    }));
  },

  renderDictation(container, q) {
    container.innerHTML = `
      <div class="exercise-card">
        <div class="exercise-instruction">Ascolta e scrivi il comando / Listen and type the command:</div>
        <div class="exercise-target">
          <button class="btn btn-secondary dictation-audio-btn"
            data-action="topicPractice.replayDictation" data-text="${escapeAttr(q.instruction)}">
            🔊 Ascolta / Listen
          </button>
        </div>
        <input type="text" id="topic-writing-input" class="practice-input practice-input-mono"
          placeholder="$ " autocomplete="off" autocapitalize="off" spellcheck="false" autofocus>
        <button class="btn btn-primary" style="margin-top: 1rem;"
          data-action="topicPractice.checkCommand" data-correct="${escapeAttr(q.command)}">
          Invia / Submit
        </button>
      </div>
    `;
    this._bindWritingEnter(container);
    if (ttsService.isSupported) ttsService.speakAuto(q.instruction);
  },

  replayDictation(ds) {
    if (ds && ds.text) ttsService.speak(ds.text, 'en-US');
  },

  // ─── COMMAND CLOZE ────────────────────────────────

  generateCmdClozeQuestions(pool) {
    const items = pool.filter((i) => i.command && i.command.trim().split(/\s+/).length >= 2);
    const out = [];
    for (const item of shuffleArray(items)) {
      if (out.length >= MAX_Q) break;
      const tokens = item.command.trim().split(/\s+/);
      const termLower = (item.english || '').toLowerCase();
      let idx = tokens.findIndex((t) => termLower && t.toLowerCase().includes(termLower));
      if (idx < 1) {
        // Blank a meaningful non-leading token (subcommand / value), never the
        // program name and never a bare flag if avoidable.
        idx = tokens.findIndex((t, i) => i > 0 && !t.startsWith('-'));
        if (idx < 0) idx = tokens.length - 1;
      }
      const blank = tokens[idx];
      if (!blank || blank.length < 2) continue;
      const masked = tokens.map((t, i) => (i === idx ? '____' : t)).join(' ');
      out.push({
        type: 'cmdcloze',
        masked,
        correct: blank,
        item,
        english: item.english,
        context: item.context,
        // The vocab hint is deliberately the blanked token's own term, so for
        // 15.0% of eligible commands it spelled the answer out ("Vocab: Help"
        // above `rsync ____` → `--help`). Withhold it in exactly those cases.
        hintEn: containsFolded(blank, item.english) ? '' : item.english,
      });
    }
    return out;
  },

  renderCmdCloze(container, q) {
    container.innerHTML = `
      <div class="exercise-card">
        <div class="exercise-instruction">Completa il comando / Complete the command:</div>
        <div class="exercise-target cmdcloze-target">${escapeHtml(q.masked)}</div>
        ${q.hintEn ? `<p class="translation-hint">Vocab: ${escapeHtml(q.hintEn)}</p>` : ''}
        <input type="text" id="topic-writing-input" class="practice-input practice-input-mono"
          placeholder="parola mancante / missing token" autocomplete="off" autocapitalize="off" spellcheck="false" autofocus>
        <button class="btn btn-primary" style="margin-top: 1rem;"
          data-action="topicPractice.checkCmdCloze" data-correct="${escapeAttr(q.correct)}">
          Invia / Submit
        </button>
      </div>
    `;
    this._bindWritingEnter(container);
  },

  checkCmdCloze(ds) {
    const input = document.getElementById('topic-writing-input');
    if (!input) return;
    const norm = (s) => s.toLowerCase().replace(/\s+/g, '').trim();
    this.handleResult(norm(input.value) === norm(ds.correct), ds.correct);
  },

  // ─── TASK → COMMAND ───────────────────────────────

  /**
   * "Which command does this job?" — a technical question, not a translation.
   *
   * Every other recognition mode in the app is ultimately "what is the word
   * for X". This one prompts with the goal the learner wants to achieve and
   * answers with a command, so the wrong options are other real commands. Its
   * distractors prefer the same tool, which is what makes it hard in a useful
   * way: four `git` subcommands, not four unrelated programs.
   */
  /**
   * Items that can be asked as "which command does this?".
   *
   * Excludes the 12.2% of task descriptions that quote the command they are
   * asking for, and the 5.4% that carry a backticked fragment — in both cases
   * the prompt contains its own answer. These are dropped rather than masked:
   * masking the tool out of "check which version of ___ is running" produces a
   * question nobody can answer.
   */
  taskCommandCandidates(pool) {
    return (pool || []).filter((item) => {
      const task = item.task || item.taskEn;
      if (!task || !item.command) return false;
      if (task.includes('`')) return false;
      return !task.toLowerCase().includes(item.command.trim().toLowerCase());
    });
  },

  /**
   * Build one task→command question, or null when the pool cannot field
   * enough distinct commands to make a real choice.
   * Shared by the standalone mode and the adaptive planner.
   */
  buildTaskCommandQuestion(item, candidatePool, ability) {
    if (!item || !item.command) return null;
    const correct = item.command.trim();
    const prompt = item.task || item.taskEn || '';
    if (!prompt) return null;

    const programOf = (command) =>
      String(command || '')
        .trim()
        .split(/\s+/)[0];
    const program = programOf(correct);

    const seen = new Set([correct]);
    const candidates = [];
    for (const other of candidatePool) {
      const command = (other.command || '').trim();
      if (!command || seen.has(command)) continue;
      seen.add(command);
      candidates.push(other);
    }

    // A task legitimately names the tool ("compile main.c with gcc"). That is
    // only a giveaway when the other options are different programs, so when
    // the prompt names it the wrong answers must come from the SAME program —
    // then the choice is decided by the flags, which is the point. 54% of
    // items have the peers for this; the rest simply do not run in this mode.
    const namesProgram = containsWholeWord(prompt, program);
    const eligible = namesProgram
      ? candidates.filter((other) => programOf(other.command) === program)
      : candidates;
    if (eligible.length < 2) return null;

    const distractors = adaptiveDifficultyService
      .selectDistractors(item, eligible, 3, ability, {
        field: 'command',
        contextField: '_subContext',
      })
      .map((other) => (other.command || '').trim())
      .filter(Boolean);
    if (distractors.length < 2) return null;

    return {
      ...item,
      type: 'taskcommand',
      prompt,
      options: shuffleArray([correct, ...distractors.slice(0, 3)]),
      correct,
    };
  },

  generateTaskCommandQuestions(pool) {
    const items = this.taskCommandCandidates(pool);
    if (items.length < 2) return [];

    const selected = adaptiveDifficultyService.selectItems(items, MAX_Q, (key) =>
      analyticsService.getItemAnalytics(key)
    );
    const ability = this._studentAbility();

    return selected
      .map((item) => this.buildTaskCommandQuestion(item, items, ability))
      .filter(Boolean);
  },

  renderTaskCommand(container, q) {
    container.innerHTML = `
      <div class="exercise-card">
        <div class="exercise-instruction">Quale comando svolge questo compito? / Which command does this?</div>
        <div class="exercise-target">${escapeHtml(q.prompt)}</div>
        <div class="options-grid options-grid-mono">
          ${q.options
            .map(
              (opt) => `
            <button class="btn btn-secondary option-btn option-btn-mono"
              data-action="topicPractice.checkAnswer" data-opt="${escapeAttr(opt)}" data-correct="${escapeAttr(q.correct)}">
              <code>${escapeHtml(opt)}</code>
            </button>`
            )
            .join('')}
        </div>
      </div>
    `;
  },

  // ─── SHARED ───────────────────────────────────────

  _bindWritingEnter(container) {
    const input = container.querySelector('#topic-writing-input');
    if (!input) return;
    input.focus();
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const submitBtn = container.querySelector('.btn-primary');
        if (submitBtn) submitBtn.click();
      }
    });
  },
};
