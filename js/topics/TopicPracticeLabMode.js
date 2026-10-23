/**
 * TOPIC PRACTICE LAB MODE - Knowledge AIO
 * =======================================
 *
 * Makes the scripted terminal lab (js/topics/lab/LabEngine.js) reachable as a
 * standalone practice mode.
 *
 * Before this, LabEngine only ran as the `applied` beat inside a LessonV2
 * lesson, and LessonV2 is pinned to a single topic — so the most engaging
 * exercise in the app was unreachable from everywhere else. A lab is now just
 * another card in the practice picker: pick a level, get its labs back to back.
 *
 * Why the lab is worth surfacing: it is the only exercise here that grades by
 * GOAL rather than by string. Any command that reaches the step's goal is
 * accepted, a wrong command never ends the run, and hints escalate instead of
 * revealing. That is much closer to how the tools are actually learned than
 * multiple choice.
 *
 * Lab content lives in js/topics/data/labs/<topicId>-labs.js keyed by lesson id
 * (see §44 — those files are hand-authored, not generated). A topic with no
 * labs file simply does not offer the card.
 */

import { LabEngine } from './lab/LabEngine.js';
import { hasGame, loadGame } from '../games/registry.js';

/** Minimum shape a lab script needs before we will offer it. */
function isUsableScript(script) {
  return Boolean(script && Array.isArray(script.steps) && script.steps.length > 0);
}

/**
 * Dynamically load a topic's lab bundle. Returns `{}` when the topic has none,
 * so callers can treat "no labs" and "no file" identically.
 */
export async function loadLabsFor(topicId) {
  if (!topicId) return {};
  try {
    const mod = await import(`./data/labs/${topicId}-labs.js`);
    return mod?.default || {};
  } catch {
    // No labs authored for this topic yet — not an error.
    return {};
  }
}

/**
 * Every lab available for the lessons of one level, in lesson order.
 * @returns {Array<{lessonId: string, title: string, script: object}>}
 */
export function labsForLevel(labs, level) {
  if (!labs || !level || !Array.isArray(level.lessons)) return [];
  const found = [];
  for (const lesson of level.lessons) {
    const script = labs[lesson.id];
    if (isUsableScript(script)) {
      found.push({ lessonId: lesson.id, title: script.title || lesson.title, script });
    }
  }
  return found;
}

export const labModeMixin = {
  /**
   * Build the lab session for a level. Async because lab bundles are lazily
   * imported, which is why this bypasses the synchronous generateQuestions().
   */
  async generateLabQuestions(data, topicId, levelNum) {
    const level = data?.levels?.[levelNum];
    if (!level) return [];
    const labs = await loadLabsFor(topicId);
    return labsForLevel(labs, level).map((entry) => ({
      type: 'lab',
      lessonId: entry.lessonId,
      title: entry.title,
      script: entry.script,
      // Surfaced for the summary; the lab itself teaches these terms.
      vocab: Array.isArray(entry.script.vocab) ? entry.script.vocab : [],
    }));
  },

  /**
   * Hand the container to the best available engine for this lab question.
   *
   * If a 2D game is registered for the current topic+level in the game
   * registry, it is mounted via GameHost — the game replaces the terminal lab
   * entirely. When no game is registered the legacy LabEngine is used as a
   * fallback, keeping every topic that has not been migrated yet functional.
   */
  async renderLabQuestion(container, q) {
    if (!container || !q?.script) return;
    this._labResolved = false;

    const topicId = this.currentTopicId;
    const level = this.currentLevel;

    // ── Try the game registry first ──────────────────────────
    if (topicId != null && level != null && hasGame(topicId, level)) {
      try {
        const [game, sdk, host] = await Promise.all([
          loadGame(topicId, level),
          import('../games/LevelSession.js'),
          import('../games/GameHost.js'),
        ]);
        const session = game
          ? await sdk.createLevelSession({
              surface: topicId,
              level,
              mode: 'lab',
              progressManager: this.progressManager,
            })
          : null;

        if (game && session) {
          this._gameHost = await host.mountGame({
            container,
            game,
            session,
            props: {},
            onExit: () => {
              this._gameHost = null;
              this._finishLab({ steps: 0, misses: 0 });
            },
            onFallback: () => {
              // Fallback from a crashed game: finish gracefully.
              this._gameHost = null;
              this._finishLab({ steps: 0, misses: 0 });
            },
            onLevelComplete: () => {
              this._gameHost = null;
              this._finishLab({ steps: 0, misses: 0 });
            },
          });
          if (this._gameHost) return; // game mounted — done
        }
      } catch (err) {
        console.warn('Lab: game mount failed, falling back to LabEngine:', err && err.message);
      }
    }

    // ── Fallback: legacy terminal lab ────────────────────────
    this.lab = new LabEngine('topic-practice-content', {
      onComplete: (summary) => this._finishLab(summary),
    });
    this.lab.load(q.script);
  },

  /**
   * Score one completed lab. Reaching the goal counts as correct — the engine
   * does not let you fail, so the signal is retries, not pass/fail. A clean run
   * keeps the streak; needing retries breaks it without taking the point away,
   * which matches the coach tone the rest of the app uses (§14.1).
   */
  _finishLab(summary) {
    if (this._labResolved) return; // Continue is tappable more than once.
    this._labResolved = true;

    this.clearTimer();
    const responseTime = this.getResponseTimeSeconds();
    this.totalResponseTime += responseTime;

    const misses = Number(summary?.misses) || 0;
    this.score += 1;
    if (misses === 0) {
      this.consecutiveCorrect += 1;
      if (this.consecutiveCorrect > this.maxStreak) this.maxStreak = this.consecutiveCorrect;
    } else {
      this.consecutiveCorrect = 0;
    }

    // A lab is many commands, not one answer: award a flat, generous amount
    // rather than running it through the speed-based per-question XP curve.
    const xpEarned = Math.max(10, 40 - misses * 5);
    this.sessionXP += xpEarned;
    this.progressManager?.addXP?.(xpEarned);

    this.updateMetaDisplay();
    this.nextQuestion();
  },
};
