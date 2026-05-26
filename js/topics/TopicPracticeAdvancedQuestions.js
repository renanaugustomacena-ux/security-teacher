import { shuffleArray } from '../utils/PracticeUtils.js';

export const advancedQuestionsMixin = {

  generateTerminalQuestions(pool) {
    const commandItems = pool.filter((item) => item.command);
    if (commandItems.length === 0) return [];

    const groups = new Map();
    for (const item of commandItems) {
      const ctx = item.context || 'general';
      if (!groups.has(ctx)) groups.set(ctx, []);
      groups.get(ctx).push(item);
    }

    const questions = [];
    const contexts = Array.from(groups.keys());
    const shuffledContexts = shuffleArray(contexts);

    const buildStep = (item) => ({
      description: item.task || item.italian || item.english,
      descriptionEn: item.taskEn || item.english || '',
      hasRealTask: Boolean(item.task),
      expectedCommand: item.command,
      item,
    });

    for (const ctx of shuffledContexts) {
      if (questions.length >= 5) break;
      const groupItems = groups.get(ctx);
      const withTask = groupItems.filter((it) => it.task);
      const withoutTask = groupItems.filter((it) => !it.task);
      const ordered = [...shuffleArray(withTask), ...shuffleArray(withoutTask)];
      const chainSize = Math.min(ordered.length, Math.floor(Math.random() * 2) + 2);
      const steps = ordered.slice(0, chainSize).map(buildStep);
      questions.push({
        type: 'terminal',
        context: ctx,
        steps,
        currentStep: 0,
        completedOutputs: [],
      });
    }

    if (questions.length < 3) {
      const remaining = shuffleArray(commandItems);
      for (let i = 0; i < remaining.length && questions.length < 5; i += 2) {
        const steps = remaining.slice(i, i + 2).map(buildStep);
        if (steps.length > 0) {
          questions.push({
            type: 'terminal',
            context: remaining[i].context || 'general',
            steps,
            currentStep: 0,
            completedOutputs: [],
          });
        }
      }
    }

    return questions.slice(0, 5);
  },

  generateCodelabQuestions(pool) {
    const codeItems = pool.filter(
      (item) => item.code && (item.code.includes('\n') || item.code.length > 30)
    );
    if (codeItems.length === 0) return [];

    const questions = [];
    const shuffled = shuffleArray(codeItems);

    for (const item of shuffled) {
      if (questions.length >= 8) break;
      const lines = item.code.split('\n').filter((l) => l.trim().length > 0);
      if (lines.length < 2) continue;

      const candidates = lines
        .map((line, idx) => ({ line, idx }))
        .filter((c) => {
          const trimmed = c.line.trim();
          if (trimmed.length < 6) return false;
          if (trimmed.startsWith('#') || trimmed.startsWith('//')) return false;
          if (/^[{}[\]();]+$/.test(trimmed)) return false;
          return true;
        });

      if (candidates.length === 0) continue;

      const termLower = (item.english || '').toLowerCase();
      const preferred = termLower
        ? candidates.filter((c) => c.line.toLowerCase().includes(termLower))
        : [];
      const linePool = preferred.length > 0 ? preferred : candidates;
      const chosen = linePool[Math.floor(Math.random() * linePool.length)];

      questions.push({
        type: 'codelab',
        fullCode: item.code,
        lines,
        blankedLine: chosen.line,
        blankIndex: chosen.idx,
        item,
        hint: item.note || '',
      });
    }

    return questions;
  },

  generateTechTalkQuestions(pool) {
    const scenarios = window.techTalkScenarios || [];
    const topicScenarios = scenarios.filter((s) => !s.topicId || s.topicId === this.currentTopicId);

    if (topicScenarios.length > 0) {
      const shuffled = shuffleArray(topicScenarios);
      return shuffled.slice(0, 3).map((scenario) => ({
        type: 'techtalk',
        scenario,
        currentTurn: 0,
        messages: [],
        corrections: [],
        keywordsUsed: [],
        totalTurns: scenario.turns ? scenario.turns.length : 3,
      }));
    }

    const validItems = pool.filter((item) => item.english && item.italian);
    if (validItems.length === 0) return [];

    const groups = new Map();
    for (const item of validItems) {
      const ctx = item.context || 'general';
      if (!groups.has(ctx)) groups.set(ctx, []);
      groups.get(ctx).push(item);
    }

    const questions = [];
    const contexts = shuffleArray(Array.from(groups.keys()));

    for (const ctx of contexts) {
      if (questions.length >= 3) break;
      const items = shuffleArray(groups.get(ctx)).slice(0, 5);
      if (items.length < 3) continue;

      const turns = items.map((item) => ({
        aiMessage: `What is the English term for "${item.italian}"? / Qual e' il termine inglese per "${item.italian}"?`,
        expectedKeywords: [item.english.toLowerCase()],
        hintText: item.note || item.example || '',
        item,
      }));

      questions.push({
        type: 'techtalk',
        scenario: {
          name: `${this.formatContextLabel(ctx)} Vocabulary`,
          turns,
          isFallback: true,
        },
        currentTurn: 0,
        messages: [],
        corrections: [],
        keywordsUsed: [],
        totalTurns: turns.length,
      });
    }

    return questions.length > 0 ? questions : [];
  },

  generateChainQuestions(pool) {
    const groups = new Map();
    for (const item of pool) {
      if (!item.english || !item.italian) continue;
      const ctx = item.context || 'general';
      if (!groups.has(ctx)) groups.set(ctx, []);
      groups.get(ctx).push(item);
    }

    const validContexts = Array.from(groups.entries()).filter(([, items]) => items.length >= 5);
    if (validContexts.length === 0) {
      const shuffled = shuffleArray(pool.filter((i) => i.english && i.italian)).slice(0, 5);
      if (shuffled.length < 5) return [];
      return [this.buildChainQuestion(shuffled)];
    }

    const questions = [];
    const shuffledContexts = shuffleArray(validContexts);

    for (const [, items] of shuffledContexts) {
      if (questions.length >= 3) break;
      const selected = shuffleArray(items).slice(0, 5);
      if (selected.length < 5) continue;
      questions.push(this.buildChainQuestion(selected));
    }

    return questions;
  },

  buildChainQuestion(items) {
    const questionTypes = [
      'multiple-choice',
      'typing',
      'multiple-choice',
      'typing',
      'multiple-choice',
    ];
    const links = items.map((item, idx) => {
      let qType = questionTypes[idx];
      if (item.command && idx === 3) {
        qType = 'command';
      }
      return {
        item,
        questionType: qType,
        completed: false,
        correct: false,
      };
    });

    return {
      type: 'chain',
      links,
      currentLink: 0,
      chainStreak: 0,
      chainXP: 0,
    };
  },
};
