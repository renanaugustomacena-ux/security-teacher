import { GRAMMAR_RULES } from './data/ai-grammar-rules.js';
import { SCENARIOS } from './data/ai-scenarios.js';

export class AIService {
  constructor() {
    this.scenarios = SCENARIOS;
  }

  getScenarios() {
    return this.scenarios.map((s) => ({
      id: s.id,
      name: s.name,
      icon: s.icon,
      difficulty: s.difficulty,
      description: s.description,
      vocabulary: s.vocabulary,
    }));
  }

  getScenario(scenarioId) {
    return this.scenarios.find((s) => s.id === scenarioId) || null;
  }

  getOpeningMessage(scenarioId) {
    const scenario = this.getScenario(scenarioId);
    if (!scenario || !scenario.turns.length) return null;

    const turn = scenario.turns[0];
    return {
      message: turn.assistant,
      vocab: turn.vocab || null,
      isEnd: false,
    };
  }

  getResponse(userMessage, scenarioId, currentTurn) {
    const scenario = this.getScenario(scenarioId);
    if (!scenario) {
      return {
        message: "I'm sorry, I couldn't find this conversation topic. Let's try another one!",
        corrections: [],
        vocabulary: null,
        isEnd: true,
        nextTurn: 0,
      };
    }

    const turn = scenario.turns[currentTurn];
    if (!turn) {
      return {
        message: 'Thank you for the conversation! You did a great job!',
        corrections: [],
        vocabulary: null,
        isEnd: true,
        nextTurn: currentTurn,
      };
    }

    const corrections = this._checkGrammar(userMessage);

    if (turn.isEnd) {
      return {
        message: turn.assistant,
        corrections,
        vocabulary: turn.vocab || null,
        isEnd: true,
        nextTurn: currentTurn,
      };
    }

    for (const pattern of turn.patterns) {
      if (pattern.test) {
        if (pattern.test(userMessage)) {
          const nextTurn = pattern.nextTurn ?? currentTurn + 1;
          const nextTurnData = scenario.turns[nextTurn];
          return {
            message: pattern.response,
            corrections,
            vocabulary: nextTurnData?.vocab || turn.vocab || null,
            isEnd: nextTurnData?.isEnd || false,
            nextTurn,
          };
        }
      } else if (pattern.match && pattern.match.test(userMessage)) {
        const nextTurn = pattern.nextTurn ?? currentTurn + 1;
        const nextTurnData = scenario.turns[nextTurn];
        return {
          message: pattern.response,
          corrections,
          vocabulary: nextTurnData?.vocab || turn.vocab || null,
          isEnd: nextTurnData?.isEnd || false,
          nextTurn,
        };
      }
    }

    return {
      message: turn.fallback || "I'm not sure I understood. Could you try rephrasing that?",
      corrections,
      vocabulary: turn.vocab || null,
      isEnd: false,
      nextTurn: currentTurn,
    };
  }

  _checkGrammar(message) {
    if (!message) return [];

    const corrections = [];

    for (const rule of GRAMMAR_RULES) {
      if (!rule.hint) continue;

      const match = message.match(rule.pattern);
      if (!match) continue;

      if (rule.test && !rule.test(message)) continue;

      if (match) {
        const original = match[0];
        let correction = rule.correction;

        if (correction && correction.includes('$1')) {
          correction = original.replace(rule.pattern, rule.correction);
        }

        corrections.push({
          original,
          correction: correction || '',
          hint: rule.hint,
        });
      }
    }

    return corrections;
  }

  getDifficultyInfo(difficulty) {
    const levels = {
      1: { label: 'Beginner', labelIt: 'Principiante', stars: 1 },
      2: { label: 'Intermediate', labelIt: 'Intermedio', stars: 2 },
      3: { label: 'Advanced', labelIt: 'Avanzato', stars: 3 },
    };
    return levels[difficulty] || levels[1];
  }
}

export const aiService = new AIService();
