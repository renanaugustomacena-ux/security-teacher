import { escapeHtml } from './utils/SanitizeHtml.js';
import { ttsService } from './services/TTSService.js';
import { shuffleArray, pickBestBlankIndex } from './utils/PracticeUtils.js';

const SCENARIO_TEMPLATES = [
  'Sei in un colloquio di lavoro...',
  'Stai presentando un progetto al team...',
  'Sei in una riunione informale con colleghi...',
  'Stai parlando con il tuo capo di un problema...',
  'Sei a un evento di networking professionale...',
  'Stai chattando con un amico americano...',
  'Sei a una cena con amici internazionali...',
  'Stai conoscendo qualcuno a una festa...',
  'Sei al telefono con un servizio clienti americano...',
  'Stai dando consigli a un amico che studia inglese...',
  'Sei in un seminario universitario...',
  'Stai discutendo un articolo con un collega...',
  'Sei in una lezione e devi fare una domanda...',
  'Sei in aeroporto e devi chiedere indicazioni...',
  'Stai ordinando al ristorante in un paese anglofono...',
  'Sei in un hotel e hai un problema con la stanza...',
];

export const practiceRenderingMixin = {

  renderQuestion() {
    const container = document.getElementById('practice-content');
    if (!container || this.questions.length === 0) return;

    const question = this.questions[this.currentQuestionIndex];
    document.getElementById('practice-progress').textContent =
      `${this.currentQuestionIndex + 1}/${this.questions.length}`;

    let html = '';
    let correctAnswer = '';

    if (this.currentMode === 'listening' || this.currentMode === 'matching') {
      const options = this.generateOptions(question.italian);
      correctAnswer = question.italian;
      const ttsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(question.english) : '';
      html = `
                <div class="exercise-card">
                    <div class="exercise-instruction">
                        ${this.currentMode === 'listening' ? 'Ascolta e scegli:' : 'Qual è la traduzione di:'}
                    </div>
                    ${
                      this.currentMode === 'listening'
                        ? `<div class="exercise-target">${ttsBtn}</div>`
                        : `<div class="exercise-target">${escapeHtml(question.english)} ${ttsBtn}</div>
                    ${question.pronunciation ? `<div class="exercise-pronunciation">${escapeHtml(question.pronunciation)}</div>` : ''}`
                    }
                    <div class="options-grid">
                        ${options
                          .map(
                            (opt, idx) => `
                            <button class="btn btn-secondary option-btn" data-option-idx="${idx}">
                                ${escapeHtml(opt)}
                            </button>
                        `
                          )
                          .join('')}
                    </div>
                </div>
            `;

      container.innerHTML = html;
      ttsService.attachTTSListeners(container);

      if (this.currentMode === 'listening' && ttsService.isSupported) {
        ttsService.speakAuto(question.english);
      }

      options.forEach((opt, idx) => {
        const btn = container.querySelector(`[data-option-idx="${idx}"]`);
        if (btn) {
          btn.addEventListener('click', () => this.checkAnswer(opt, correctAnswer));
        }
      });
    } else if (this.currentMode === 'writing') {
      correctAnswer = question.italian;
      const ttsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(question.english) : '';
      html = `
                <div class="exercise-card">
                    <div class="exercise-instruction">Scrivi la traduzione in italiano:</div>
                    <div class="exercise-target">${escapeHtml(question.english)} ${ttsBtn}</div>
                    ${question.pronunciation ? `<div class="exercise-pronunciation">${escapeHtml(question.pronunciation)}</div>` : ''}
                    <input type="text" id="writing-input" class="practice-input" placeholder="Scrivi qui..." autofocus>
                    <button class="btn btn-primary submit-btn" style="margin-top: 1rem;">Invia / Submit</button>
                </div>
            `;
      container.innerHTML = html;
      ttsService.attachTTSListeners(container);

      container
        .querySelector('.submit-btn')
        ?.addEventListener('click', () => this.checkWritingAnswer(correctAnswer));
    } else if (this.currentMode === 'fillblank') {
      const sentence = question.example || question.usage;
      const parts = sentence.split(' = ');
      const targetPhrase = parts[0];
      const words = targetPhrase.split(' ');
      const missingIdx = pickBestBlankIndex(words, question.english);
      const missingWord = words[missingIdx].trim();
      const displaySentence = words.map((w, i) => (i === missingIdx ? '_____' : w)).join(' ');
      correctAnswer = missingWord;

      html = `
                <div class="exercise-card">
                    <div class="exercise-instruction">Completa la frase:</div>
                    <div class="exercise-target">${escapeHtml(displaySentence)}</div>
                    <input type="text" id="writing-input" class="practice-input" placeholder="Parola mancante..." autofocus>
                    <button class="btn btn-primary submit-btn" style="margin-top: 1rem;">Invia / Submit</button>
                </div>
            `;
      container.innerHTML = html;

      container
        .querySelector('.submit-btn')
        ?.addEventListener('click', () => this.checkWritingAnswer(correctAnswer));
    } else if (this.currentMode === 'sentence') {
      const sentence = (question.example || question.usage).split(' = ')[0];
      const words = shuffleArray(sentence.split(' '));
      correctAnswer = sentence;

      html = `
                <div class="exercise-card">
                    <div class="exercise-instruction">Ricostruisci la frase (Inglese):</div>
                    <div class="scrambled-words">
                        ${words.map((w) => `<span class="word-chip">${escapeHtml(w)}</span>`).join(' ')}
                    </div>
                    <input type="text" id="writing-input" class="practice-input" placeholder="Scrivi la frase completa..." autofocus>
                    <button class="btn btn-primary submit-btn" style="margin-top: 1rem;">Invia / Submit</button>
                </div>
            `;
      container.innerHTML = html;

      container
        .querySelector('.submit-btn')
        ?.addEventListener('click', () => this.checkSentenceAnswer(correctAnswer));
    } else if (this.currentMode === 'comprehension') {
      const allWithExamples = this.fullPool.filter((q) => q.example);
      const paragraphSentences = this.buildComprehensionParagraph(
        allWithExamples,
        this.currentQuestionIndex
      );
      const paragraph = `${paragraphSentences.join('. ')}.`;
      const correctStatement = (question.example || '').split(' = ')[0];

      const wrongOptions = this.generateComprehensionDistractors(
        correctStatement,
        paragraphSentences,
        allWithExamples
      );
      const allOptions = shuffleArray([correctStatement, ...wrongOptions]);
      correctAnswer = correctStatement;

      html = `
                <div class="exercise-card">
                    <div class="exercise-instruction">Leggi il paragrafo e scegli l'affermazione corretta:</div>
                    <div class="exercise-paragraph">${escapeHtml(paragraph)}</div>
                    <div class="exercise-comprehension-question">Quale affermazione è vera in base al testo? / Which statement is true?</div>
                    <div class="options-grid">
                        ${allOptions
                          .map(
                            (opt, idx) => `
                            <button class="btn btn-secondary option-btn" data-option-idx="${idx}">
                                ${escapeHtml(opt)}
                            </button>
                        `
                          )
                          .join('')}
                    </div>
                </div>
            `;

      container.innerHTML = html;

      allOptions.forEach((opt, idx) => {
        const btn = container.querySelector(`[data-option-idx="${idx}"]`);
        if (btn) {
          btn.addEventListener('click', () => this.checkAnswer(opt, correctAnswer));
        }
      });
    } else if (this.currentMode === 'scenario') {
      const exampleParts = (question.example || '').split(' = ');
      const englishPhrase = exampleParts[0] || '';

      const targetWord = question.english;
      const blankedPhrase = englishPhrase.replace(
        new RegExp(targetWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
        '_____'
      );

      const scenario = SCENARIO_TEMPLATES[this.currentQuestionIndex % SCENARIO_TEMPLATES.length];

      const options = this.generateOptions(targetWord);
      correctAnswer = targetWord;

      const ttsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(englishPhrase) : '';
      html = `
                <div class="exercise-card">
                    <div class="exercise-instruction">Scenario:</div>
                    <div class="exercise-scenario">${escapeHtml(scenario)}</div>
                    <div class="exercise-target">${escapeHtml(blankedPhrase)} ${ttsBtn}</div>
                    <div class="options-grid">
                        ${options
                          .map(
                            (opt, idx) => `
                            <button class="btn btn-secondary option-btn" data-option-idx="${idx}">
                                ${escapeHtml(opt)}
                            </button>
                        `
                          )
                          .join('')}
                    </div>
                </div>
            `;

      container.innerHTML = html;
      ttsService.attachTTSListeners(container);

      options.forEach((opt, idx) => {
        const btn = container.querySelector(`[data-option-idx="${idx}"]`);
        if (btn) {
          btn.addEventListener('click', () => this.checkAnswer(opt, correctAnswer));
        }
      });
    } else {
      container.innerHTML = html;
    }

    const input = document.getElementById('writing-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const submitBtn = container.querySelector('.submit-btn');
          if (submitBtn) submitBtn.click();
        }
      });
    }
  },

  generateOptions(correct) {
    const field = this.currentMode === 'scenario' ? 'english' : 'italian';
    const currentQ = this.questions[this.currentQuestionIndex];
    const correctLen = correct.length;
    const minLen = Math.max(1, Math.floor(correctLen * 0.4));
    const maxLen = Math.ceil(correctLen * 2.5);

    const isPlausible = (val) => {
      if (!val || val === correct) return false;
      return val.length >= minLen && val.length <= maxLen;
    };

    const distractors = new Set();

    if (currentQ._lessonId) {
      const sameLesson = this.fullPool.filter(
        (it) => it._lessonId === currentQ._lessonId && isPlausible(it[field])
      );
      const shuffled = shuffleArray(sameLesson);
      for (const item of shuffled) {
        if (distractors.size >= 3) break;
        distractors.add(item[field]);
      }
    }

    if (distractors.size < 3 && currentQ._level) {
      const sameLevel = this.fullPool.filter(
        (it) =>
          it._level === currentQ._level &&
          it._lessonId !== currentQ._lessonId &&
          isPlausible(it[field])
      );
      const shuffled = shuffleArray(sameLevel);
      for (const item of shuffled) {
        if (distractors.size >= 3) break;
        if (!distractors.has(item[field])) distractors.add(item[field]);
      }
    }

    if (distractors.size < 3) {
      const remaining = this.fullPool.filter((it) => isPlausible(it[field]));
      const shuffled = shuffleArray(remaining);
      for (const item of shuffled) {
        if (distractors.size >= 3) break;
        if (!distractors.has(item[field])) distractors.add(item[field]);
      }
    }

    return shuffleArray([correct, ...Array.from(distractors).slice(0, 3)]);
  },

  buildComprehensionParagraph(allWithExamples, currentIdx) {
    const sentences = [];
    const used = new Set();
    const targetCount = 6;

    const currentQ = this.questions[currentIdx];
    if (currentQ && currentQ.example) {
      const sent = currentQ.example.split(' = ')[0];
      if (sent) {
        sentences.push(sent);
        used.add((currentQ.english || '').toLowerCase());
      }
    }

    for (let r = 1; sentences.length < targetCount && r < this.questions.length; r++) {
      for (const offset of [-r, r]) {
        const idx = currentIdx + offset;
        if (
          idx >= 0 &&
          idx < this.questions.length &&
          !used.has((this.questions[idx]?.english || '').toLowerCase())
        ) {
          const q = this.questions[idx];
          if (q && q.example) {
            const sent = q.example.split(' = ')[0];
            if (sent && sent.length > 10) {
              sentences.push(sent);
              used.add((q.english || '').toLowerCase());
            }
          }
        }
        if (sentences.length >= targetCount) break;
      }
    }

    if (sentences.length < targetCount) {
      const extras = shuffleArray(allWithExamples).filter(
        (q) => !used.has((q.english || '').toLowerCase()) && q.example
      );
      for (const q of extras) {
        if (sentences.length >= targetCount) break;
        const sent = q.example.split(' = ')[0];
        if (sent && sent.length > 10) {
          sentences.push(sent);
          used.add((q.english || '').toLowerCase());
        }
      }
    }

    return sentences;
  },

  generateComprehensionDistractors(correctSentence, paragraphSentences, allWithExamples) {
    const paragraphSet = new Set(paragraphSentences);
    const distractors = [];

    const candidates = allWithExamples
      .map((q) => q.example.split(' = ')[0])
      .filter((s) => s && !paragraphSet.has(s) && s !== correctSentence && s.length > 10);

    const shuffled = shuffleArray(candidates);
    for (const s of shuffled) {
      if (distractors.length >= 3) break;
      if (!distractors.includes(s)) distractors.push(s);
    }

    while (distractors.length < 3) {
      distractors.push(`Not in the text ${distractors.length + 1}`);
    }
    return distractors;
  },
};
