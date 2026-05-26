import { escapeHtml, escapeAttr as escapeForAttr } from '../utils/SanitizeHtml.js';
import { normalize } from '../utils/PracticeUtils.js';
import { advancedQuestionsMixin } from './TopicPracticeAdvancedQuestions.js';

const _renderHandleMethods = {
  // ─── TERMINAL SIMULATOR ──────────────────────

  renderTerminalQuestion(container, q) {
    const step = q.steps[q.currentStep];
    const historyHtml = q.completedOutputs
      .map(
        (entry) => `
        <div class="terminal-history-entry">
          <span class="terminal-ps1">$</span> <span class="terminal-history-cmd">${escapeHtml(entry.command)}</span>
          <div class="terminal-output">${escapeHtml(entry.output)}</div>
        </div>
      `
      )
      .join('');

    container.innerHTML = `
      <div class="terminal-sim">
        <div class="terminal-header">
          <span class="terminal-dot terminal-dot-red"></span>
          <span class="terminal-dot terminal-dot-yellow"></span>
          <span class="terminal-dot terminal-dot-green"></span>
          <span class="terminal-header-title">Terminal</span>
        </div>
        <div class="terminal-body">
          <div class="terminal-scenario">
            ${step.hasRealTask ? '<div class="terminal-task-label">Task</div>' : ''}
            <div class="terminal-task-text">${escapeHtml(step.description)}</div>
            ${
              step.descriptionEn && step.descriptionEn !== step.description
                ? `<div class="terminal-task-text-en">${escapeHtml(step.descriptionEn)}</div>`
                : ''
            }
          </div>
          <div class="terminal-step-info">Step ${q.currentStep + 1}/${q.steps.length}</div>
          <div class="terminal-history">${historyHtml}</div>
          <div class="terminal-prompt">
            <span class="terminal-ps1">$</span>
            <input class="terminal-input" type="text" id="terminal-cmd-input" autofocus
              placeholder="Type the command...">
          </div>
        </div>
      </div>
    `;

    const input = container.querySelector('#terminal-cmd-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.checkTerminalCommand(q);
        }
      });
    }
  },

  checkTerminalCommand(q) {
    const input = document.getElementById('terminal-cmd-input');
    if (!input) return;

    const step = q.steps[q.currentStep];
    const userInput = input.value.trim();

    const normalizeCmd = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const sortFlags = (cmd) =>
      cmd.replace(/-([a-zA-Z]+)/g, (match, flags) => `-${flags.split('').sort().join('')}`);

    const userNorm = normalizeCmd(userInput);
    const expectedNorm = normalizeCmd(step.expectedCommand);

    let isCorrect = userNorm === expectedNorm || sortFlags(userNorm) === sortFlags(expectedNorm);

    // Check aliases
    if (!isCorrect) {
      const aliases = COMMAND_ALIASES[expectedNorm] || [];
      for (const alias of aliases) {
        const normAlias = normalizeCmd(alias);
        if (userNorm === normAlias || sortFlags(userNorm) === sortFlags(normAlias)) {
          isCorrect = true;
          break;
        }
      }
    }

    const container = document.getElementById('topic-practice-content');
    if (!container) return;

    if (isCorrect) {
      // Add to completed outputs
      q.completedOutputs.push({
        command: userInput,
        output: step.item.note || step.item.example || 'OK',
      });
      q.currentStep++;

      if (q.currentStep >= q.steps.length) {
        // Chain complete - award XP for the full chain
        const xpEarned = q.steps.length * XP_BASE;
        this.score++;
        this.consecutiveCorrect++;
        if (this.consecutiveCorrect > this.maxStreak) this.maxStreak = this.consecutiveCorrect;
        this.sessionXP += xpEarned;
        this.progressManager.addXP(xpEarned);
        this.progressManager.incrementTopicWord(this.currentTopicId);
        this.progressManager.incrementTerminalExercises();
        this.updateMetaDisplay();
        this.showFloatingXP(xpEarned);
        this.showFeedback(true, 'Chain complete!', xpEarned);
      } else {
        // Show success briefly then render next step
        this.renderTerminalQuestion(container, q);
      }
    } else {
      // Show error in terminal
      const errorDiv = document.createElement('div');
      errorDiv.className = 'terminal-error';
      errorDiv.textContent = `Command not recognized. Expected: ${step.expectedCommand}`;
      const body = container.querySelector('.terminal-body');
      if (body) body.appendChild(errorDiv);

      this.consecutiveCorrect = 0;
      this.updateMetaDisplay();

      setTimeout(() => {
        // Move to next question after showing error
        q.currentStep = q.steps.length; // Mark as done
        this.handleResult(false, step.expectedCommand);
      }, 2000);
    }
  },

  // ─── CODE LAB ─────────────────────────────────

  renderCodelabQuestion(container, q) {
    const linesHtml = q.lines
      .map((line, idx) => {
        if (idx === q.blankIndex) {
          return `
            <div class="code-line code-blank">
              <span class="code-line-num">${idx + 1}</span>
              <input class="codelab-input" type="text" id="codelab-line-input"
                placeholder="Type the missing code..." autofocus>
            </div>
          `;
        }
        return `
          <div class="code-line">
            <span class="code-line-num">${idx + 1}</span>
            <span class="code-line-text">${escapeHtml(line)}</span>
          </div>
        `;
      })
      .join('');

    // Description: use the example sentence (or note as fallback), but mask
    // the target term so the answer's keyword isn't handed to the user.
    // Also strip the blanked line itself if it accidentally appears in the
    // example text (rare, but happens).
    const rawDescription =
      q.item.example || q.item.note || q.item.english || 'Complete the missing line';
    let descriptionText = this.maskTermInText(rawDescription, q.item.english);
    if (q.blankedLine) {
      descriptionText = descriptionText.split(q.blankedLine).join('___');
    }
    const langLabel = q.item.command ? 'Bash' : 'Code';
    const targetTagHtml = q.item.english
      ? `<div class="codelab-target">${escapeHtml(langLabel)} · vocab: <strong>${escapeHtml(q.item.english)}</strong></div>`
      : '';

    container.innerHTML = `
      <div class="codelab">
        <div class="codelab-header">Code Lab</div>
        ${targetTagHtml}
        <div class="codelab-description">${escapeHtml(descriptionText)}</div>
        <pre class="codelab-code">${linesHtml}</pre>
        <div class="codelab-actions">
          <button class="btn btn-hint" data-action="topicPractice.showCodelabHint">
            Suggerimento / Hint
          </button>
          <button class="btn btn-primary" data-action="topicPractice.checkCodelab">
            Invia / Submit
          </button>
        </div>
        <div class="codelab-hint" id="codelab-hint-text" style="display:none">
          ${escapeHtml(q.hint)}
        </div>
      </div>
    `;

    const input = container.querySelector('#codelab-line-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.checkCodelabAnswer();
        }
      });
    }
  },

  showCodelabHint() {
    const hintEl = document.getElementById('codelab-hint-text');
    if (hintEl) hintEl.style.display = 'block';
  },

  checkCodelabAnswer() {
    const input = document.getElementById('codelab-line-input');
    if (!input) return;

    const q = this.questions[this.currentQuestionIndex];
    const userInput = input.value;
    const expected = q.blankedLine;

    // Compare with tolerance: trim whitespace, compare lowercased
    const normalizeCode = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase();
    const isCorrect = normalizeCode(userInput) === normalizeCode(expected);

    if (isCorrect) {
      this.handleResult(true, expected);
    } else {
      // Check if partially correct (same keywords present)
      const userTokens = new Set(normalizeCode(userInput).split(/\s+/));
      const expectedTokens = normalizeCode(expected).split(/\s+/);
      const matchCount = expectedTokens.filter((t) => userTokens.has(t)).length;
      const ratio = expectedTokens.length > 0 ? matchCount / expectedTokens.length : 0;

      if (ratio >= 0.6) {
        this.handlePartialResult(expected);
      } else {
        this.handleResult(false, expected);
      }
    }
  },

  // ─── TECH TALK ────────────────────────────────

  renderTechTalkQuestion(container, q) {
    const scenario = q.scenario;
    const currentTurn = scenario.turns ? scenario.turns[q.currentTurn] : null;

    // Build messages HTML
    const messagesHtml = q.messages
      .map(
        (msg) => `
        <div class="chat-bubble ${msg.role}">
          <div class="chat-bubble-content">
            <div class="chat-bubble-text">${escapeHtml(msg.text)}</div>
            ${
              msg.corrections && msg.corrections.length > 0
                ? `<div class="chat-corrections">
                ${msg.corrections
                  .map(
                    (c) => `
                  <div class="chat-correction">
                    <span class="chat-correction-wrong">${escapeHtml(c.wrong)}</span>
                    <span class="chat-correction-arrow">&rarr;</span>
                    <span class="chat-correction-right">${escapeHtml(c.right)}</span>
                    <div class="chat-correction-hint">${escapeHtml(c.hint)}</div>
                  </div>
                `
                  )
                  .join('')}
              </div>`
                : ''
            }
          </div>
        </div>
      `
      )
      .join('');

    // Add current AI message if at current turn
    let aiMessageText = '';
    if (currentTurn) {
      aiMessageText = currentTurn.aiMessage;
    }

    const isComplete = !currentTurn || q.currentTurn >= q.totalTurns;

    if (isComplete) {
      // Show summary
      const keywordCount = q.keywordsUsed.length;
      const xpEarned = 10 + keywordCount * 5;

      container.innerHTML = `
        <div class="chat-container" style="height: auto; max-height: none;">
          <div class="chat-header">
            <div class="chat-header-info">
              <span class="chat-header-icon">💬</span>
              <h3 class="chat-header-title">${escapeHtml(scenario.name || 'Tech Talk')}</h3>
            </div>
          </div>
          <div class="chat-messages" style="max-height: 300px; overflow-y: auto;">
            ${messagesHtml}
          </div>
          <div class="techtalk-summary">
            <h4>Conversation Complete!</h4>
            <div class="techtalk-summary-stats">
              <span>Keywords used: ${keywordCount}</span>
              <span>Corrections: ${q.corrections.length}</span>
              <span>+${xpEarned} XP</span>
            </div>
          </div>
        </div>
      `;

      // Award XP
      this.score++;
      this.consecutiveCorrect++;
      if (this.consecutiveCorrect > this.maxStreak) this.maxStreak = this.consecutiveCorrect;
      this.sessionXP += xpEarned;
      this.progressManager.addXP(xpEarned);
      this.progressManager.incrementTopicWord(this.currentTopicId);
      this.updateMetaDisplay();
      this.showFloatingXP(xpEarned);

      setTimeout(() => this.nextQuestion(), 3000);
      return;
    }

    container.innerHTML = `
      <div class="chat-container" style="height: auto; max-height: none;">
        <div class="chat-header">
          <div class="chat-header-info">
            <span class="chat-header-icon">💬</span>
            <h3 class="chat-header-title">${escapeHtml(scenario.name || 'Tech Talk')}</h3>
          </div>
          <span class="techtalk-turn-info">Turn ${q.currentTurn + 1}/${q.totalTurns}</span>
        </div>
        <div class="chat-messages" id="techtalk-messages" style="max-height: 350px; overflow-y: auto;">
          ${messagesHtml}
          ${
            aiMessageText
              ? `
            <div class="chat-bubble assistant">
              <div class="chat-bubble-content">
                <div class="chat-bubble-text">${escapeHtml(aiMessageText)}</div>
              </div>
            </div>
          `
              : ''
          }
        </div>
        ${
          currentTurn && currentTurn.hintText
            ? `
          <div class="techtalk-hint-bar">
            <button class="btn btn-hint" data-action="topicPractice.showTechTalkHint">
              Suggerimento / Hint
            </button>
            <span class="techtalk-hint-text" id="techtalk-hint" style="display:none">
              ${escapeHtml(currentTurn.hintText)}
            </span>
          </div>
        `
            : ''
        }
        <div class="chat-input-area">
          <input type="text" class="chat-input" id="techtalk-input" placeholder="Type your response in English..." autofocus>
          <button class="btn btn-primary" data-action="topicPractice.handleTechTalk">
            Send
          </button>
        </div>
      </div>
    `;

    // Scroll to bottom
    const messagesEl = container.querySelector('#techtalk-messages');
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;

    const input = container.querySelector('#techtalk-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleTechTalkMessage();
        }
      });
    }
  },

  showTechTalkHint() {
    const hintEl = document.getElementById('techtalk-hint');
    if (hintEl) hintEl.style.display = 'inline';
  },

  handleTechTalkMessage() {
    const input = document.getElementById('techtalk-input');
    if (!input || !input.value.trim()) return;

    const q = this.questions[this.currentQuestionIndex];
    const scenario = q.scenario;
    const turn = scenario.turns[q.currentTurn];
    if (!turn) return;

    const userMessage = input.value.trim();

    // 1. Check for expected keywords
    const expectedKeywords = turn.expectedKeywords || [];
    const foundKeywords = expectedKeywords.filter((kw) =>
      userMessage.toLowerCase().includes(kw.toLowerCase())
    );
    q.keywordsUsed.push(...foundKeywords);

    // 2. Apply grammar checks
    const corrections = [];
    for (const rule of TECHTALK_GRAMMAR_RULES) {
      if (rule.test) {
        if (rule.test(userMessage)) {
          corrections.push({
            wrong: userMessage.match(rule.pattern)?.[0] || '',
            right: rule.correction || '',
            hint: rule.hint,
          });
        }
      } else if (rule.pattern.test(userMessage)) {
        corrections.push({
          wrong: userMessage.match(rule.pattern)?.[0] || '',
          right: rule.correction || '',
          hint: rule.hint,
        });
      }
    }
    q.corrections.push(...corrections);

    // 3. Add user message to conversation
    q.messages.push({
      role: 'user',
      text: userMessage,
      corrections,
    });

    // 4. Determine AI response
    let aiResponse = '';
    if (turn.nextResponses) {
      // Check keyword patterns for specific responses
      for (const [pattern, response] of Object.entries(turn.nextResponses)) {
        if (userMessage.toLowerCase().includes(pattern.toLowerCase())) {
          aiResponse = response;
          break;
        }
      }
    }

    if (!aiResponse) {
      // Default response based on whether keywords were found
      if (foundKeywords.length > 0) {
        aiResponse = scenario.isFallback
          ? `Correct! "${foundKeywords[0]}" is right.`
          : "Good, let's continue.";
      } else if (turn.missingResponse) {
        aiResponse = turn.missingResponse;
      } else {
        aiResponse = scenario.isFallback
          ? `Not quite. The answer was "${expectedKeywords[0]}". Let's move on.`
          : "I see. Let's move to the next point.";
      }
    }

    q.messages.push({
      role: 'assistant',
      text: aiResponse,
      corrections: [],
    });

    // Advance turn
    q.currentTurn++;

    // Re-render
    const container = document.getElementById('topic-practice-content');
    if (container) this.renderTechTalkQuestion(container, q);
  },

  // ─── CHAIN CHALLENGE ──────────────────────────

  renderChainQuestion(container, q) {
    const link = q.links[q.currentLink];

    // Build chain progress nodes
    const nodesHtml = q.links
      .map((l, idx) => {
        let nodeClass = 'chain-node';
        let nodeContent = `${idx + 1}`;
        if (l.completed && l.correct) {
          nodeClass += ' completed';
          nodeContent = '\u2713';
        } else if (l.completed && !l.correct) {
          nodeClass += ' failed';
          nodeContent = '\u2717';
        } else if (idx === q.currentLink) {
          nodeClass += ' current';
        }

        let linkHtml = '';
        if (idx < q.links.length - 1) {
          let linkClass = 'chain-link';
          if (q.links[idx].completed) {
            linkClass += q.links[idx].correct ? ' completed' : ' failed';
          }
          linkHtml = `<div class="${linkClass}"></div>`;
        }

        return `<div class="${nodeClass}">${nodeContent}</div>${linkHtml}`;
      })
      .join('');

    // Calculate streak multiplier
    let multiplier = 1.0;
    if (q.chainStreak >= 4) multiplier = 2.0;
    else if (q.chainStreak >= 3) multiplier = 1.5;
    else if (q.chainStreak >= 2) multiplier = 1.2;

    const multiplierClass =
      multiplier >= 2.0
        ? 'chain-mult-max'
        : multiplier >= 1.5
          ? 'chain-mult-high'
          : multiplier >= 1.2
            ? 'chain-mult-mid'
            : 'chain-mult-base';

    // Build question HTML based on link type
    let questionHtml = '';
    const item = link.item;

    switch (link.questionType) {
      case 'multiple-choice': {
        const options = this.generateOptions(item.italian);
        questionHtml = `
          <div class="exercise-instruction">Qual e' la traduzione di:</div>
          <div class="exercise-target">${escapeHtml(item.english)}</div>
          <div class="options-grid">
            ${options
              .map(
                (opt) => `
              <button class="btn btn-secondary option-btn"
                data-action="topicPractice.checkChain" data-opt="${escapeForAttr(opt)}" data-correct="${escapeForAttr(item.italian)}">
                ${escapeHtml(opt)}
              </button>
            `
              )
              .join('')}
          </div>
        `;
        break;
      }
      case 'typing': {
        questionHtml = `
          <div class="exercise-instruction">Scrivi in inglese / Write in English:</div>
          <div class="exercise-target">${escapeHtml(item.italian)}</div>
          <input type="text" id="chain-typing-input" class="practice-input" placeholder="Type the English term..." autofocus>
          <button class="btn btn-primary" style="margin-top: 1rem;"
            data-action="topicPractice.checkChainTyping" data-correct="${escapeForAttr(item.english)}">
            Invia / Submit
          </button>
        `;
        break;
      }
      case 'command': {
        questionHtml = `
          <div class="exercise-instruction">Scrivi il comando / Write the command:</div>
          <div class="exercise-target">${escapeHtml(item.italian || item.english)}</div>
          <input type="text" id="chain-typing-input" class="practice-input practice-input-mono" placeholder="$ " autofocus>
          <button class="btn btn-primary" style="margin-top: 1rem;"
            data-action="topicPractice.checkChainCommand" data-correct="${escapeForAttr(item.command)}">
            Invia / Submit
          </button>
        `;
        break;
      }
      // no default
    }

    container.innerHTML = `
      <div class="chain-container">
        <div class="chain-progress">${nodesHtml}</div>
        <div class="chain-multiplier ${multiplierClass}">Chain x${multiplier.toFixed(1)}</div>
        <div class="chain-xp-display">${q.chainXP} XP</div>
        <div class="exercise-card">
          ${questionHtml}
        </div>
      </div>
    `;

    // Focus input for typing/command modes
    const input = container.querySelector('#chain-typing-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const submitBtn = container.querySelector('.btn-primary');
          if (submitBtn) submitBtn.click();
        }
      });
    }
  },

  checkChainAnswer(selected, correct) {
    const isCorrect = selected === correct;
    this.processChainResult(isCorrect, correct);
  },

  checkChainTypingAnswer(correct) {
    const input = document.getElementById('chain-typing-input');
    if (!input) return;
    const isCorrect = normalize(input.value) === normalize(correct);
    this.processChainResult(isCorrect, correct);
  },

  checkChainCommandAnswer(correct) {
    const input = document.getElementById('chain-typing-input');
    if (!input) return;

    const normalizeCmd = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const sortFlags = (cmd) =>
      cmd.replace(/-([a-zA-Z]+)/g, (match, flags) => `-${flags.split('').sort().join('')}`);

    const userInput = normalizeCmd(input.value);
    const expected = normalizeCmd(correct);

    let isCorrect = userInput === expected || sortFlags(userInput) === sortFlags(expected);

    if (!isCorrect) {
      const aliases = COMMAND_ALIASES[expected] || [];
      for (const alias of aliases) {
        const normAlias = normalizeCmd(alias);
        if (userInput === normAlias || sortFlags(userInput) === sortFlags(normAlias)) {
          isCorrect = true;
          break;
        }
      }
    }

    this.processChainResult(isCorrect, correct);
  },

  processChainResult(isCorrect, correct) {
    const q = this.questions[this.currentQuestionIndex];
    const link = q.links[q.currentLink];

    link.completed = true;
    link.correct = isCorrect;

    // Calculate streak multiplier
    let multiplier = 1.0;
    if (q.chainStreak >= 4) multiplier = 2.0;
    else if (q.chainStreak >= 3) multiplier = 1.5;
    else if (q.chainStreak >= 2) multiplier = 1.2;

    if (isCorrect) {
      q.chainStreak++;
      const xpForLink = Math.round(XP_BASE * multiplier);
      q.chainXP += xpForLink;
      this.score++;
      this.consecutiveCorrect++;
      if (this.consecutiveCorrect > this.maxStreak) this.maxStreak = this.consecutiveCorrect;
      this.sessionXP += xpForLink;
      this.progressManager.addXP(xpForLink);
      this.progressManager.incrementTopicWord(this.currentTopicId);
      this.showFloatingXP(xpForLink);
    } else {
      q.chainStreak = 0;
      this.consecutiveCorrect = 0;
    }

    this.updateMetaDisplay();
    q.currentLink++;

    const container = document.getElementById('topic-practice-content');
    if (!container) return;

    if (q.currentLink >= q.links.length) {
      // Chain complete - show summary
      this.clearTimer();
      const correctCount = q.links.filter((l) => l.correct).length;
      this.progressManager.updateBestChainStreak(q.chainStreak);

      container.innerHTML = `
        <div class="chain-container">
          <div class="chain-progress">
            ${q.links
              .map((l, idx) => {
                const nodeClass = l.correct ? 'chain-node completed' : 'chain-node failed';
                const nodeContent = l.correct ? '\u2713' : '\u2717';
                let linkHtml = '';
                if (idx < q.links.length - 1) {
                  linkHtml = `<div class="chain-link ${l.correct ? 'completed' : 'failed'}"></div>`;
                }
                return `<div class="${nodeClass}">${nodeContent}</div>${linkHtml}`;
              })
              .join('')}
          </div>
          <div class="chain-summary">
            <h3>Chain Complete!</h3>
            <div class="chain-summary-stats">
              <div class="breakdown-item">
                <span class="breakdown-value">${correctCount}/5</span>
                <span class="breakdown-label">Corrette / Correct</span>
              </div>
              <div class="breakdown-item">
                <span class="breakdown-value">${q.chainXP}</span>
                <span class="breakdown-label">XP Guadagnati / Earned</span>
              </div>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => this.nextQuestion(), 2500);
    } else if (!isCorrect) {
      // Brief incorrect feedback
      const feedbackDiv = document.createElement('div');
      feedbackDiv.className = 'chain-feedback chain-feedback-wrong';
      feedbackDiv.innerHTML = `La risposta era: <strong>${escapeHtml(correct)}</strong>`;
      container.appendChild(feedbackDiv);

      setTimeout(() => {
        this.renderChainQuestion(container, q);
      }, 1500);
    } else {
      // Quick transition to next link
      setTimeout(() => {
        this.renderChainQuestion(container, q);
      }, 500);
    }
  },
};

export const advancedModesMixin = { ..._renderHandleMethods, ...advancedQuestionsMixin };
