/**
 * HintService — 3-level progressive hint system for practice exercises.
 * Generates hints automatically based on question data and exercise mode.
 */

export class HintService {
  /**
   * Generate an array of 3 progressively more revealing hints.
   * @param {object} question - The question/exercise object
   * @param {string} mode - Exercise mode (listening, matching, context, writing, command, codechallenge, terminal, codelab, etc.)
   * @returns {string[]} Array of 3 hint strings
   */
  generateHints(question, mode) {
    switch (mode) {
      case 'listening':
      case 'matching':
      case 'context':
        return this._listeningMatchingContext(question);

      case 'writing':
        return this._writing(question);

      case 'command':
      case 'codechallenge':
        return this._commandCodechallenge(question);

      case 'terminal':
        return this._terminal(question);

      case 'codelab':
        return this._codelab(question);

      default:
        return this._default(question);
    }
  }

  /**
   * Returns XP multiplier based on how many hints were used.
   * @param {number} hintLevel - Number of hints used (0-3)
   * @returns {number} Multiplier (1.0, 0.8, 0.5, or 0.2)
   */
  getXPMultiplier(hintLevel) {
    const multipliers = [1.0, 0.8, 0.5, 0.2];
    return multipliers[hintLevel] ?? 0.2;
  }

  // --- Private hint strategies ---

  _listeningMatchingContext(question) {
    const answer = question.italian || question.item?.italian || '';
    const context = question.context || question.item?.context || 'General';

    return [
      `Context: ${context}`,
      `Starts with '${answer[0] || ''}' (${answer.length} letters)`,
      this._blankMiddle(answer),
    ];
  }

  _writing(question) {
    const answer = question.italian || question.item?.italian || '';
    const example = question.example || question.item?.example;
    const english = question.english || question.item?.english || '';

    const hint1 = example ? `Example: ${example}` : english;

    return [
      hint1,
      `Starts with '${answer.slice(0, 3)}...' (${answer.length} chars)`,
      this._blankVowels(answer),
    ];
  }

  _commandCodechallenge(question) {
    const cmd = question.expectedCommand || question.item?.command || '';
    const parts = cmd.split(/\s+/);
    const firstWord = parts[0] || '';

    const structure =
      parts.length > 1
        ? `${firstWord} ${parts
            .slice(1)
            .map(() => '___')
            .join(' ')}`
        : firstWord;

    return [`Command: ${firstWord}`, structure, this._blankLastToken(cmd)];
  }

  _terminal(question) {
    const step = question.steps?.[question.currentStep];

    if (!step) {
      return [
        'Think about what command is needed here.',
        'Check the syntax of the command.',
        'Review the expected output.',
      ];
    }

    const cmd = step.command || '';
    const firstWord = cmd.split(/\s+/)[0] || '';

    return [`Expected: ${step.description}`, firstWord, this._blankLastToken(cmd)];
  }

  _codelab(question) {
    const task = question.item?.task || 'completes the code';
    const blankedLine = question.blankedLine || '';
    const firstKeyword = blankedLine.split(/\s+/)[0] || '';

    return [`This line ${task}`, firstKeyword, this._blankLastToken(blankedLine)];
  }

  _default(question) {
    const answer = question.italian || question.item?.italian || '';
    const context = question.context || question.item?.context || 'the concept';

    return [
      `Think about: ${context}`,
      `${answer.length} letters, starts with '${answer[0] || ''}'`,
      this._blankMiddle(answer),
    ];
  }

  // --- Private helpers ---

  _blankMiddle(text) {
    if (!text) return '';
    const mid = Math.floor(text.length / 2);
    return `${text.slice(0, mid)}_${text.slice(mid + 1)}`;
  }

  _blankVowels(text) {
    return text.replace(/[aeiouAEIOU]/g, '_');
  }

  _blankLastToken(text) {
    const tokens = text.split(/\s+/);
    if (tokens.length <= 1) return '___';
    tokens[tokens.length - 1] = '___';
    return tokens.join(' ');
  }
}

export const hintService = new HintService();
