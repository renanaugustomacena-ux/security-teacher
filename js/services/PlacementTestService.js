/**
 * PlacementTestService — adaptive placement test (pure logic, no DOM/storage).
 *
 * Runs 4 rounds of 3 questions each. After each round the candidate level is
 * adjusted based on accuracy, converging on the learner's true skill level.
 */
class PlacementTestService {
  constructor() {
    this.state = null;
  }

  /**
   * Initialize a new placement test.
   * @param {number} numLevels - total number of levels in the topic
   */
  startTest(numLevels) {
    const startLevel = Math.floor(numLevels / 2);
    this.state = {
      numLevels,
      currentRound: 0,
      currentLevel: startLevel,
      responses: [],
      levelHistory: [startLevel],
      maxLevelPassed: -1,
      isComplete: false,
    };
    return this.getCurrentState();
  }

  /**
   * Record whether the learner answered correctly.
   * @param {boolean} correct
   * @returns {boolean} isCorrect (echo back)
   */
  recordAnswer(correct) {
    if (!this.state || this.state.isComplete) return false;
    this.state.responses.push(correct);
    return correct;
  }

  /**
   * Advance to the next round after 3 answers have been recorded.
   * Adjusts currentLevel based on last-3 accuracy, tracks maxLevelPassed.
   * @returns {object|null} result object when test is complete, else null
   */
  advanceRound() {
    if (!this.state || this.state.isComplete) return this.getResult();

    const { responses, numLevels } = this.state;
    const last3 = responses.slice(-3);
    const correctCount = last3.filter(Boolean).length;

    // Update maxLevelPassed if majority correct at current level
    if (correctCount >= 2) {
      this.state.maxLevelPassed = Math.max(this.state.maxLevelPassed, this.state.currentLevel);
    }

    // Adjust level based on performance
    let delta = 0;
    if (correctCount === 3) delta = 2;
    else if (correctCount === 2) delta = 1;
    else if (correctCount === 1) delta = 0;
    else delta = -2;

    this.state.currentLevel = Math.max(0, Math.min(numLevels - 1, this.state.currentLevel + delta));

    this.state.currentRound++;
    this.state.levelHistory.push(this.state.currentLevel);

    // Complete after 4 rounds
    if (this.state.currentRound >= 4) {
      this.state.isComplete = true;
      return this.getResult();
    }

    return null;
  }

  /**
   * Build and return the final result summary.
   */
  getResult() {
    if (!this.state) return null;

    const totalCorrect = this.state.responses.filter(Boolean).length;
    const totalQuestions = this.state.responses.length;
    const accuracy = totalQuestions > 0 ? totalCorrect / totalQuestions : 0;
    const estimatedLevel = Math.max(0, this.state.maxLevelPassed);
    const levelsToUnlock = Array.from({ length: estimatedLevel + 1 }, (_, i) => i);

    return {
      estimatedLevel,
      totalCorrect,
      totalQuestions,
      accuracy,
      levelsToUnlock,
    };
  }

  /**
   * Return a shallow copy of current internal state.
   */
  getCurrentState() {
    if (!this.state) return null;
    return {
      ...this.state,
      responses: [...this.state.responses],
      levelHistory: [...this.state.levelHistory],
    };
  }

  /**
   * Reset the service for a fresh test.
   */
  reset() {
    this.state = null;
  }
}

export { PlacementTestService };
export const placementTestService = new PlacementTestService();
