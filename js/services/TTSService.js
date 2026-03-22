/**
 * TTS Service - FlowLearn
 * =======================
 *
 * Singleton service wrapping window.speechSynthesis.
 * Provides text-to-speech for English vocabulary with preferred voices,
 * speaker button creation, and graceful degradation.
 */

class TTSService {
  constructor() {
    this._synth = window.speechSynthesis || null;
    this._voices = [];
    this._rate = 0.85;
    this._currentUtterance = null;

    if (this._synth) {
      this._loadVoices();
      // Chrome fires voiceschanged asynchronously
      this._synth.addEventListener?.('voiceschanged', () => this._loadVoices());
    }
  }

  /**
   * Whether the browser supports speechSynthesis
   */
  get isSupported() {
    return !!this._synth;
  }

  /**
   * Load and cache available voices, preferring English voices
   * with "Google" or "Microsoft" in the name.
   */
  _loadVoices() {
    if (!this._synth) return;
    this._voices = this._synth.getVoices();
  }

  /**
   * Find the best English voice available.
   * Prefers voices with "Google" or "Microsoft" in name.
   */
  _getPreferredVoice(lang = 'en-US') {
    if (!this._voices.length) {
      this._loadVoices();
    }

    const langPrefix = lang.split('-')[0]; // 'en'

    // Filter to matching language voices
    const langVoices = this._voices.filter((v) => v.lang === lang || v.lang.startsWith(langPrefix));

    // Prefer Google or Microsoft voices
    const preferred = langVoices.find(
      (v) => v.name.includes('Google') || v.name.includes('Microsoft')
    );

    if (preferred) return preferred;

    // Fallback: any English voice
    if (langVoices.length > 0) return langVoices[0];

    return null;
  }

  /**
   * Speak the given text, stopping any current speech first.
   * @param {string} text - Text to speak
   * @param {string} lang - BCP 47 language tag (default: 'en-US')
   */
  speak(text, lang = 'en-US') {
    if (!this._synth || !text) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = this._rate;

    const voice = this._getPreferredVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }

    this._currentUtterance = utterance;

    // Track speaking state for button animation
    utterance.addEventListener('start', () => {
      document.querySelectorAll('.tts-btn.speaking').forEach((btn) => {
        btn.classList.remove('speaking');
      });
      // Mark the button that triggered this as speaking
      document.querySelectorAll(`.tts-btn[data-tts-text="${CSS.escape(text)}"]`).forEach((btn) => {
        btn.classList.add('speaking');
      });
    });

    utterance.addEventListener('end', () => {
      document.querySelectorAll('.tts-btn.speaking').forEach((btn) => {
        btn.classList.remove('speaking');
      });
      this._currentUtterance = null;
    });

    utterance.addEventListener('error', () => {
      document.querySelectorAll('.tts-btn.speaking').forEach((btn) => {
        btn.classList.remove('speaking');
      });
      this._currentUtterance = null;
    });

    this._synth.speak(utterance);
  }

  /**
   * Stop any current speech.
   */
  stop() {
    if (!this._synth) return;
    this._synth.cancel();
    document.querySelectorAll('.tts-btn.speaking').forEach((btn) => {
      btn.classList.remove('speaking');
    });
    this._currentUtterance = null;
  }

  /**
   * Set the speech rate.
   * @param {number} rate - Speech rate (0.1 to 10, default 0.85)
   */
  setRate(rate) {
    this._rate = Math.max(0.1, Math.min(10, rate));
  }

  /**
   * Create a speaker button element with inline SVG icon.
   * @param {string} text - Text to speak when clicked
   * @param {string} lang - BCP 47 language tag (default: 'en-US')
   * @returns {HTMLButtonElement} The speaker button element
   */
  createSpeakerButton(text, lang = 'en-US') {
    const btn = document.createElement('button');
    btn.className = 'tts-btn';
    btn.type = 'button';
    btn.title = 'Ascolta / Listen';
    btn.dataset.ttsText = text;
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.speak(text, lang);
    });

    return btn;
  }

  /**
   * Returns the HTML string for a speaker button (for use in innerHTML templates).
   * Requires calling attachTTSListeners() after setting innerHTML.
   * @param {string} text - Text to speak when clicked
   * @param {string} lang - BCP 47 language tag (default: 'en-US')
   * @returns {string} HTML string for the button
   */
  speakerButtonHTML(text, lang = 'en-US') {
    const escapedText = text.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    return `<button class="tts-btn" type="button" title="Ascolta / Listen" data-tts-text="${escapedText}" data-tts-lang="${lang}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg></button>`;
  }

  /**
   * Attach click listeners to all .tts-btn elements in the given container.
   * Use after setting innerHTML with speakerButtonHTML().
   * @param {HTMLElement} container - Container to search for .tts-btn elements
   */
  attachTTSListeners(container) {
    if (!container) return;
    container.querySelectorAll('.tts-btn[data-tts-text]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const text = btn.dataset.ttsText;
        const lang = btn.dataset.ttsLang || 'en-US';
        this.speak(text, lang);
      });
    });
  }
}

export const ttsService = new TTSService();
