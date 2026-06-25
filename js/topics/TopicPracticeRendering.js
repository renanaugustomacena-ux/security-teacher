import { escapeHtml, escapeAttr as escapeForAttr } from '../utils/SanitizeHtml.js';
import { shuffleArray, pickBestBlankIndex } from '../utils/PracticeUtils.js';
import { ttsService } from '../services/TTSService.js';
import { TECH_SCENARIO_TEMPLATES } from './TopicPracticeConstants.js';

export const renderingMixin = {
  // ─── RENDERING ─────────────────────────────────

  showPracticeUI() {
    const container = document.getElementById('topic-practice-container');
    if (!container) return;

    if (window.topicManager) {
      window.topicManager.showView('practice');
    }
  },

  renderQuestion() {
    const container = document.getElementById('topic-practice-content');
    if (!container || this.questions.length === 0) return;

    const q = this.questions[this.currentQuestionIndex];
    document.getElementById('topic-practice-progress').textContent =
      `${this.currentQuestionIndex + 1}/${this.questions.length}`;

    let html = '';

    switch (this.currentMode) {
      case 'listening':
      case 'matching': {
        const options = this.generateOptions(q.italian);
        const ttsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(q.english) : '';
        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">
              ${this.currentMode === 'listening' ? 'Ascolta e scegli:' : 'Qual \u00E8 la traduzione di:'}
            </div>
            ${
              this.currentMode === 'listening'
                ? `<div class="exercise-target">${ttsBtn}</div>`
                : `<div class="exercise-target">${escapeHtml(q.english)} ${ttsBtn}</div>
            ${q.pronunciation ? `<div class="exercise-pronunciation">${escapeHtml(q.pronunciation)}</div>` : ''}`
            }
            <div class="options-grid">
              ${options
                .map(
                  (opt) => `
                <button class="btn btn-secondary option-btn"
                  data-action="topicPractice.checkAnswer" data-opt="${escapeForAttr(opt)}" data-correct="${escapeForAttr(q.italian)}">
                  ${escapeHtml(opt)}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `;
        break;
      }

      case 'writing': {
        const writingTtsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(q.english) : '';
        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Scrivi la traduzione in italiano:</div>
            <div class="exercise-target">${escapeHtml(q.english)} ${writingTtsBtn}</div>
            ${q.pronunciation ? `<div class="exercise-pronunciation">${escapeHtml(q.pronunciation)}</div>` : ''}
            <input type="text" id="topic-writing-input" class="practice-input" placeholder="Scrivi qui..." autofocus>
            <button class="btn btn-primary" style="margin-top: 1rem;"
              data-action="topicPractice.checkWriting" data-correct="${escapeForAttr(q.italian)}">
              Invia / Submit
            </button>
          </div>
        `;
        break;
      }

      case 'fillblank': {
        const sentence = q.example;
        const parts = sentence.split(' = ');
        const targetPhrase = parts[0];
        const words = targetPhrase.split(' ');
        const missingIdx = pickBestBlankIndex(words, q.english);
        const missingWord = words[missingIdx].trim();
        const displaySentence = words.map((w, i) => (i === missingIdx ? '_____' : w)).join(' ');

        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Completa la frase:</div>
            <div class="exercise-target">${escapeHtml(displaySentence)}</div>
            <input type="text" id="topic-writing-input" class="practice-input" placeholder="Parola mancante..." autofocus>
            <button class="btn btn-primary" style="margin-top: 1rem;"
              data-action="topicPractice.checkWriting" data-correct="${escapeForAttr(missingWord)}">
              Invia / Submit
            </button>
          </div>
        `;
        break;
      }

      case 'sentence': {
        // Sentence translation (was word-reorder, which leaked every word).
        // Now: show Italian sentence, user types English. Partial-credit check
        // remains in checkSentenceAnswer.
        const parts = (q.example || '').split(' = ');
        const englishSentence = (parts[0] || '').trim();
        const italianSentence = (parts[1] || '').trim();
        const sentenceTtsBtn =
          italianSentence && ttsService.isSupported
            ? ttsService.speakerButtonHTML(italianSentence, 'it-IT')
            : '';
        const targetHint = q.english
          ? `<div class="exercise-vocab-hint">Vocab: <strong>${escapeHtml(q.english)}</strong>${q.pronunciation ? ` <span class="exercise-pronunciation-inline">${escapeHtml(q.pronunciation)}</span>` : ''}</div>`
          : '';

        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Traduci in inglese:</div>
            <div class="exercise-target">${escapeHtml(italianSentence)} ${sentenceTtsBtn}</div>
            ${targetHint}
            <input type="text" id="topic-writing-input" class="practice-input" placeholder="Type the English sentence..." autofocus>
            <button class="btn btn-primary" style="margin-top: 1rem;"
              data-action="topicPractice.checkSentence" data-correct="${escapeForAttr(englishSentence)}">
              Invia / Submit
            </button>
          </div>
        `;
        break;
      }

      case 'command': {
        // Prompt with the concrete `task:` when available (e.g.
        // "Mostra le porte TCP in ascolto"). Falls back to the term translation,
        // which is a noun and doesn't tell the user what to accomplish.
        // When prompting with a task, show the underlying vocab term as a small
        // hint so the learner can connect the task to what they just studied.
        const taskText = q.task || q.italian || '';
        const showVocabHint = Boolean(q.task) && Boolean(q.english);
        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Scrivi il comando Linux per:</div>
            <div class="exercise-target">${escapeHtml(taskText)}</div>
            ${showVocabHint ? `<p class="translation-hint">Vocab: ${escapeHtml(q.english)}</p>` : ''}
            <input type="text" id="topic-writing-input" class="practice-input practice-input-mono" placeholder="$ " autofocus>
            <button class="btn btn-primary" style="margin-top: 1rem;"
              data-action="topicPractice.checkCommand" data-correct="${escapeForAttr(q.command)}">
              Invia / Submit
            </button>
          </div>
        `;
        break;
      }

      case 'codeoutput': {
        const options = this.generateOptions(q.english);
        // Hide the term in code so the answer is not handed to the user as a
        // literal identifier (e.g. `print("hi")` for term "Print").
        const maskedCode = this.maskTermInText(q.code, q.english);
        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Che concetto dimostra questo codice?</div>
            <div class="tech-code-exercise">
              <pre><code>${escapeHtml(maskedCode)}</code></pre>
            </div>
            <div class="options-grid">
              ${options
                .map(
                  (opt) => `
                <button class="btn btn-secondary option-btn"
                  data-action="topicPractice.checkAnswer" data-opt="${escapeForAttr(opt)}" data-correct="${escapeForAttr(q.english)}">
                  ${escapeHtml(opt)}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `;
        break;
      }

      case 'context': {
        const correctContext = q.context || 'general';
        const contextOptions = this.generateContextOptions(correctContext);
        const contextTtsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(q.english) : '';

        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">In quale contesto si usa questo termine?</div>
            <div class="exercise-target">${escapeHtml(q.english)} ${contextTtsBtn}</div>
            ${q.pronunciation ? `<div class="exercise-pronunciation">${escapeHtml(q.pronunciation)}</div>` : ''}
            <div class="options-grid">
              ${contextOptions
                .map(
                  (ctx) => `
                <button class="btn btn-secondary option-btn"
                  data-action="topicPractice.checkAnswer" data-opt="${escapeForAttr(ctx)}" data-correct="${escapeForAttr(correctContext)}">
                  ${escapeHtml(this.formatContextLabel(ctx))}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `;
        break;
      }

      case 'comprehension': {
        // Bilingual reading comprehension:
        //  - Paragraph: 5-6 English example sentences from same-context items.
        //  - Target: one of those items (rotates each question).
        //  - Options: 4 Italian "rules" (note or Italian half of example).
        //  - User must read the English paragraph, locate the sentence about
        //    the target term, then pick the Italian description that matches.
        const ctx = q.context || 'general';
        const pickRule = (item) => {
          if (item.note && item.note.length > 15) return item.note.trim();
          const it = (item.example || '').split(' = ')[1];
          if (it && it.trim().length > 15) return it.trim();
          return item.italian || item.english;
        };
        const ruleAvailable = (item) =>
          item.example &&
          (item.note || ((item.example || '').split(' = ')[1] || '').trim().length > 15);

        const fullCandidates = this.fullPool.filter(ruleAvailable);
        const sameCtxCandidates = fullCandidates.filter((it) => it.context === ctx);
        const paragraphPool = sameCtxCandidates.length >= 4 ? sameCtxCandidates : fullCandidates;

        const paragraphItems = shuffleArray(paragraphPool).slice(0, 6);
        const target = paragraphItems[this.currentQuestionIndex % paragraphItems.length] || q;

        const paragraph = paragraphItems
          .map((it) => ((it.example || '').split(' = ')[0] || '').trim())
          .filter((s) => s.length > 10)
          .join(' ');

        const correctStatement = pickRule(target);
        const distractors = [];
        const seen = new Set([correctStatement]);
        const addDistractor = (rule) => {
          if (rule && !seen.has(rule)) {
            distractors.push(rule);
            seen.add(rule);
          }
        };
        for (const it of shuffleArray(
          paragraphItems.filter((p) => p.english !== target.english)
        )) {
          if (distractors.length >= 3) break;
          addDistractor(pickRule(it));
        }
        if (distractors.length < 3) {
          const inParagraph = new Set(paragraphItems.map((p) => p.english));
          const fallback = fullCandidates.filter((it) => !inParagraph.has(it.english));
          for (const it of shuffleArray(fallback)) {
            if (distractors.length >= 3) break;
            addDistractor(pickRule(it));
          }
        }

        const allOptions = shuffleArray([correctStatement, ...distractors.slice(0, 3)]);
        const targetLabel = escapeHtml(target.english || '');

        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Leggi il paragrafo:</div>
            <div class="exercise-paragraph">${escapeHtml(paragraph)}</div>
            <div class="exercise-comprehension-question">In base al testo, quale descrizione si applica a <strong>${targetLabel}</strong>?</div>
            <div class="options-grid">
              ${allOptions
                .map(
                  (opt) => `
                <button class="btn btn-secondary option-btn"
                  data-action="topicPractice.checkAnswer" data-opt="${escapeForAttr(opt)}" data-correct="${escapeForAttr(correctStatement)}">
                  ${escapeHtml(opt)}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `;
        break;
      }

      case 'scenario': {
        const exampleParts = (q.example || '').split(' = ');
        const englishPhrase = exampleParts[0] || '';

        const targetWord = q.english;
        const blankedPhrase = englishPhrase.replace(
          new RegExp(targetWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
          '_____'
        );

        const scenario =
          TECH_SCENARIO_TEMPLATES[this.currentQuestionIndex % TECH_SCENARIO_TEMPLATES.length];
        const options = this.generateScenarioOptions(targetWord);
        const scenarioTtsBtn = ttsService.isSupported
          ? ttsService.speakerButtonHTML(englishPhrase)
          : '';

        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Scenario:</div>
            <div class="exercise-scenario">${escapeHtml(scenario)}</div>
            <div class="exercise-target">${escapeHtml(blankedPhrase)} ${scenarioTtsBtn}</div>
            <div class="options-grid">
              ${options
                .map(
                  (opt) => `
                <button class="btn btn-secondary option-btn"
                  data-action="topicPractice.checkAnswer" data-opt="${escapeForAttr(opt)}" data-correct="${escapeForAttr(targetWord)}">
                  ${escapeHtml(opt)}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `;
        break;
      }

      case 'codechallenge': {
        // Prefer real task description; fall back to italian term name.
        // Mask the target term in the note to avoid handing the answer over.
        const instruction = q.task || q.italian || q.english;
        const correctCode = q.command || q.code;
        const maskedNote = q.note ? this.maskTermInText(q.note, q.english) : '';

        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Code Challenge:</div>
            <div class="exercise-target">${escapeHtml(instruction)}</div>
            ${maskedNote ? `<p class="translation-hint">${escapeHtml(maskedNote)}</p>` : ''}
            <input type="text" id="topic-writing-input" class="practice-input practice-input-mono" placeholder="Scrivi il codice/comando..." autofocus>
            <button class="btn btn-primary" style="margin-top: 1rem;"
              data-action="topicPractice.checkCodeChallenge" data-correct="${escapeForAttr(correctCode)}">
              Invia / Submit
            </button>
          </div>
        `;
        break;
      }

      case 'terminal': {
        this.renderTerminalQuestion(container, q);
        return; // Terminal handles its own rendering
      }

      case 'codelab': {
        this.renderCodelabQuestion(container, q);
        return; // Code Lab handles its own rendering
      }

      case 'techtalk': {
        this.renderTechTalkQuestion(container, q);
        return; // Tech Talk handles its own rendering
      }

      case 'chain': {
        this.renderChainQuestion(container, q);
        return; // Chain handles its own rendering
      }

      default:
        html = '<p>Modalit\u00E0 non disponibile / Mode not available</p>';
    }

    container.innerHTML = html;
    ttsService.attachTTSListeners(container);

    // Auto-play TTS for listening mode (gated by user preference)
    if (this.currentMode === 'listening' && ttsService.isSupported) {
      const currentQ = this.questions[this.currentQuestionIndex];
      if (currentQ && currentQ.english) {
        ttsService.speakAuto(currentQ.english);
      }
    }

    // Focus input and bind Enter key
    const input = document.getElementById('topic-writing-input');
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


};
