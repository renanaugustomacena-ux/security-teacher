/**
 * CONVERSATION MANAGER - Knowledge AIO
 * =====================================
 *
 * Manages the AI Conversation Partner feature:
 *   - Topic selector grid
 *   - Chat UI with message bubbles
 *   - Interaction with rule-based AIService
 *   - TTS for AI messages
 *   - Grammar corrections inline
 *   - End-of-conversation summary
 */

import { aiService } from './services/AIService.js';
import { ttsService } from './services/TTSService.js';

export class ConversationManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.currentScenarioId = null;
    this.currentTurn = 0;
    this.messages = [];
    this.totalCorrections = 0;
    this.vocabularyLearned = [];
    this.isConversationActive = false;
  }

  /**
   * Initialize the manager
   */
  init() {
    window.conversationManager = this;
  }

  /**
   * Escape HTML entities to prevent XSS
   */
  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Render the topic selector grid
   */
  renderTopicSelector() {
    const container = document.getElementById('conversation-content');
    if (!container) return;

    this.isConversationActive = false;
    this.currentScenarioId = null;
    this.currentTurn = 0;
    this.messages = [];
    this.totalCorrections = 0;
    this.vocabularyLearned = [];

    const scenarios = aiService.getScenarios();

    let html = `
      <header class="section-header">
        <h2>Conversazione / Conversation</h2>
        <p class="section-subtitle">
          Pratica l'inglese con conversazioni simulate / Practice English with simulated conversations
        </p>
      </header>
      <div class="conversation-topics">
    `;

    scenarios.forEach((scenario) => {
      const diffInfo = aiService.getDifficultyInfo(scenario.difficulty);
      const stars = '\u2B50'.repeat(diffInfo.stars);

      html += `
        <div class="conv-topic-card" data-scenario-id="${this.escapeHtml(scenario.id)}">
          <div class="conv-topic-icon">${scenario.icon}</div>
          <h3 class="conv-topic-title">${this.escapeHtml(scenario.name)}</h3>
          <p class="conv-topic-desc">${this.escapeHtml(scenario.description)}</p>
          <div class="conv-topic-difficulty">
            <span class="conv-topic-stars">${stars}</span>
            <span class="conv-topic-level">${this.escapeHtml(diffInfo.labelIt)} / ${this.escapeHtml(diffInfo.label)}</span>
          </div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;

    // Attach click listeners via delegation
    const grid = container.querySelector('.conversation-topics');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const card = e.target.closest('.conv-topic-card');
        if (!card) return;
        const scenarioId = card.dataset.scenarioId;
        if (scenarioId) this.startConversation(scenarioId);
      });
    }
  }

  /**
   * Start a conversation with a specific scenario
   * @param {string} scenarioId
   */
  startConversation(scenarioId) {
    const scenario = aiService.getScenario(scenarioId);
    if (!scenario) return;

    this.currentScenarioId = scenarioId;
    this.currentTurn = 0;
    this.messages = [];
    this.totalCorrections = 0;
    this.vocabularyLearned = [];
    this.isConversationActive = true;

    this.renderChatUI(scenario);

    // Send the opening message
    const opening = aiService.getOpeningMessage(scenarioId);
    if (opening) {
      this._addAssistantMessage(opening.message, null, opening.vocab);
    }
  }

  /**
   * Render the chat interface
   * @param {object} scenario
   */
  renderChatUI(scenario) {
    const container = document.getElementById('conversation-content');
    if (!container) return;

    const diffInfo = aiService.getDifficultyInfo(scenario.difficulty);

    container.innerHTML = `
      <div class="chat-container">
        <div class="chat-header">
          <button class="btn btn-secondary chat-back-btn" id="chat-back-btn">
            \u2190 Indietro / Back
          </button>
          <div class="chat-header-info">
            <span class="chat-header-icon">${scenario.icon}</span>
            <div>
              <h3 class="chat-header-title">${this.escapeHtml(scenario.name)}</h3>
              <span class="chat-header-diff">${this.escapeHtml(diffInfo.labelIt)} / ${this.escapeHtml(diffInfo.label)}</span>
            </div>
          </div>
        </div>
        <div class="chat-messages" id="chat-messages">
          <!-- Messages will be added here -->
        </div>
        <div class="chat-input-area" id="chat-input-area">
          <input
            type="text"
            class="chat-input"
            id="chat-input"
            placeholder="Scrivi la tua risposta in inglese... / Type your reply in English..."
            autocomplete="off"
          />
          <button class="chat-send-btn" id="chat-send-btn" title="Invia / Send">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    `;

    // Attach event listeners
    const backBtn = document.getElementById('chat-back-btn');
    backBtn?.addEventListener('click', () => this.renderTopicSelector());

    const sendBtn = document.getElementById('chat-send-btn');
    sendBtn?.addEventListener('click', () => this._handleSend());

    const input = document.getElementById('chat-input');
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this._handleSend();
      }
    });

    // Focus the input
    input?.focus();
  }

  /**
   * Handle sending a message
   */
  _handleSend() {
    const input = document.getElementById('chat-input');
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    this.sendMessage(text);
    input.focus();
  }

  /**
   * Process user message, get AI response, render both
   * @param {string} text
   */
  sendMessage(text) {
    if (!this.isConversationActive || !this.currentScenarioId) return;

    // Render user message
    this._addUserMessage(text);

    // Get AI response
    const response = aiService.getResponse(text, this.currentScenarioId, this.currentTurn);

    // Track corrections
    if (response.corrections && response.corrections.length > 0) {
      this.totalCorrections += response.corrections.length;
      // Show corrections on the user's message
      this._showCorrections(response.corrections);
    }

    // Track vocabulary
    if (response.vocabulary) {
      const vocabKey = `${response.vocabulary.en}|${response.vocabulary.it}`;
      if (!this.vocabularyLearned.find((v) => `${v.en}|${v.it}` === vocabKey)) {
        this.vocabularyLearned.push(response.vocabulary);
      }
    }

    // Update turn
    this.currentTurn = response.nextTurn;

    // Small delay for natural feel
    setTimeout(
      () => {
        this._addAssistantMessage(response.message, response.corrections, response.vocabulary);

        if (response.isEnd) {
          this._handleConversationEnd();
        }
      },
      500 + Math.random() * 500
    );
  }

  /**
   * Add a user message bubble to the chat
   * @param {string} text
   */
  _addUserMessage(text) {
    const messagesEl = document.getElementById('chat-messages');
    if (!messagesEl) return;

    this.messages.push({ role: 'user', content: text });

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user';
    bubble.innerHTML = `<div class="chat-bubble-text">${this.escapeHtml(text)}</div>`;
    bubble.dataset.msgIndex = this.messages.length - 1;

    messagesEl.appendChild(bubble);
    this._scrollToBottom();
  }

  /**
   * Show grammar corrections inline on the last user message
   * @param {Array} corrections
   */
  _showCorrections(corrections) {
    if (!corrections || corrections.length === 0) return;

    const messagesEl = document.getElementById('chat-messages');
    if (!messagesEl) return;

    // Find the last user bubble
    const userBubbles = messagesEl.querySelectorAll('.chat-bubble.user');
    const lastBubble = userBubbles[userBubbles.length - 1];
    if (!lastBubble) return;

    let correctionsHtml = '<div class="chat-corrections">';
    corrections.forEach((c) => {
      correctionsHtml += `
        <div class="chat-correction">
          ${c.original ? `<span class="chat-correction-wrong">${this.escapeHtml(c.original)}</span>` : ''}
          ${
            c.correction
              ? `<span class="chat-correction-arrow">\u2192</span>
          <span class="chat-correction-right">${this.escapeHtml(c.correction)}</span>`
              : ''
          }
          <span class="chat-correction-hint">${this.escapeHtml(c.hint)}</span>
        </div>
      `;
    });
    correctionsHtml += '</div>';

    lastBubble.insertAdjacentHTML('beforeend', correctionsHtml);
  }

  /**
   * Add an assistant message bubble to the chat
   * @param {string} text
   * @param {Array|null} corrections
   * @param {object|null} vocab
   */
  _addAssistantMessage(text, corrections, vocab) {
    const messagesEl = document.getElementById('chat-messages');
    if (!messagesEl) return;

    this.messages.push({ role: 'assistant', content: text });

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble assistant';

    let html = `
      <div class="chat-bubble-content">
        <div class="chat-bubble-text">${this.escapeHtml(text)}</div>
        <div class="chat-bubble-actions">
          ${ttsService.speakerButtonHTML(text, 'en-US')}
        </div>
      </div>
    `;

    // Add vocabulary tip if present
    if (vocab) {
      html += `
        <div class="chat-vocabulary">
          <span class="chat-vocab-label">Vocabolario / Vocabulary:</span>
          <span class="chat-vocab-word"><strong>${this.escapeHtml(vocab.en)}</strong> = ${this.escapeHtml(vocab.it)}</span>
        </div>
      `;
    }

    bubble.innerHTML = html;
    messagesEl.appendChild(bubble);

    // Attach TTS listener
    ttsService.attachTTSListeners(bubble);

    this._scrollToBottom();
  }

  /**
   * Handle end of conversation - show summary
   */
  _handleConversationEnd() {
    this.isConversationActive = false;

    // Disable input
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const inputArea = document.getElementById('chat-input-area');
    if (input) input.disabled = true;
    if (sendBtn) sendBtn.disabled = true;
    if (inputArea) inputArea.classList.add('disabled');

    // Update progress
    this._updateProgress();

    // Show summary after a brief delay
    setTimeout(() => {
      this._renderSummary();
    }, 1000);
  }

  /**
   * Update progress stats for the conversation
   */
  _updateProgress() {
    if (!this.progressManager?.data) return;

    // Ensure conversation stats structure exists
    if (!this.progressManager.data.conversationStats) {
      this.progressManager.data.conversationStats = {
        sessionsCompleted: 0,
        messagesExchanged: 0,
        correctionsReceived: 0,
      };
    }

    const stats = this.progressManager.data.conversationStats;
    const userMsgs = this.messages.filter((m) => m.role === 'user').length;

    stats.sessionsCompleted++;
    stats.messagesExchanged += userMsgs;
    stats.correctionsReceived += this.totalCorrections;

    this.progressManager.addActivity(
      'conversation',
      `Conversazione completata: ${this.currentScenarioId}`
    );
    this.progressManager.recordStudyActivity(2, 1);
    this.progressManager.addXP(15 + userMsgs * 2);
    this.progressManager.saveProgress();
  }

  /**
   * Render the end-of-conversation summary
   */
  _renderSummary() {
    const messagesEl = document.getElementById('chat-messages');
    if (!messagesEl) return;

    const userMsgs = this.messages.filter((m) => m.role === 'user').length;
    const scenario = aiService.getScenario(this.currentScenarioId);

    let vocabHtml = '';
    if (this.vocabularyLearned.length > 0) {
      vocabHtml = `
        <div class="chat-summary-vocab">
          <h4>Vocabolario Appreso / Vocabulary Learned</h4>
          <ul>
            ${this.vocabularyLearned.map((v) => `<li><strong>${this.escapeHtml(v.en)}</strong> = ${this.escapeHtml(v.it)}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // Scenario full vocabulary as bonus
    let scenarioVocabHtml = '';
    if (scenario && scenario.vocabulary) {
      scenarioVocabHtml = `
        <div class="chat-summary-vocab">
          <h4>Vocabolario Completo / Full Vocabulary</h4>
          <ul>
            ${scenario.vocabulary.map((v) => `<li><strong>${this.escapeHtml(v.en)}</strong> = ${this.escapeHtml(v.it)}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    const summaryEl = document.createElement('div');
    summaryEl.className = 'chat-summary';
    summaryEl.innerHTML = `
      <div class="chat-summary-header">
        <span class="chat-summary-icon">\uD83C\uDF89</span>
        <h3>Conversazione Completata! / Conversation Complete!</h3>
      </div>
      <div class="chat-summary-stats">
        <div class="chat-summary-stat">
          <span class="chat-summary-stat-value">${userMsgs}</span>
          <span class="chat-summary-stat-label">Messaggi / Messages</span>
        </div>
        <div class="chat-summary-stat">
          <span class="chat-summary-stat-value">${this.totalCorrections}</span>
          <span class="chat-summary-stat-label">Correzioni / Corrections</span>
        </div>
        <div class="chat-summary-stat">
          <span class="chat-summary-stat-value">${this.vocabularyLearned.length}</span>
          <span class="chat-summary-stat-label">Vocaboli / Vocab</span>
        </div>
        <div class="chat-summary-stat">
          <span class="chat-summary-stat-value">+${15 + userMsgs * 2}</span>
          <span class="chat-summary-stat-label">XP</span>
        </div>
      </div>
      ${vocabHtml}
      ${scenarioVocabHtml}
      <div class="chat-summary-actions">
        <button class="btn btn-secondary" id="summary-back-btn">
          \u2190 Scegli Argomento / Choose Topic
        </button>
        <button class="btn btn-primary" id="summary-restart-btn">
          Ricomincia / Restart \u21BB
        </button>
      </div>
    `;

    messagesEl.appendChild(summaryEl);
    this._scrollToBottom();

    // Attach summary action listeners
    document.getElementById('summary-back-btn')?.addEventListener('click', () => {
      this.renderTopicSelector();
    });

    document.getElementById('summary-restart-btn')?.addEventListener('click', () => {
      this.startConversation(this.currentScenarioId);
    });
  }

  /**
   * Scroll the chat messages area to the bottom
   */
  _scrollToBottom() {
    const messagesEl = document.getElementById('chat-messages');
    if (!messagesEl) return;
    requestAnimationFrame(() => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }
}
