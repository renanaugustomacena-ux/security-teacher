const MODE_DIFFICULTY = {
  listening: 0.1,
  matching: 0.2,
  context: 0.25,
  fillblank: 0.35,
  comprehension: 0.4,
  scenario: 0.45,
  writing: 0.5,
  sentence: 0.55,
  codeoutput: 0.6,
  command: 0.65,
  codechallenge: 0.7,
  codelab: 0.75,
  terminal: 0.85,
  chain: 0.9,
};

const MASTERY_THRESHOLD = 0.8;
const RECENCY_DECAY_MS = 1000 * 60 * 60 * 24; // 1 day

class AdaptiveDifficultyService {
  /**
   * Select items near the student's mastery frontier.
   * @param {Array} pool - Available items with english, italian, context, _topicId, _level
   * @param {number} count - Number of items to select
   * @param {Function} getAnalytics - fn(itemKey) => analytics|null
   * @returns {Array} Shuffled subset of prioritized items
   */
  selectItems(pool, count, getAnalytics) {
    if (!pool || pool.length === 0) return [];
    if (count >= pool.length) return this._shuffle([...pool]);

    const now = Date.now();
    const scored = pool.map((item) => {
      const key = this._itemKey(item);
      const analytics = getAnalytics(key);
      let priority = 0;

      if (!analytics) {
        // Unseen items get moderate priority
        priority = 0.5;
      } else {
        const difficulty = this.computeItemDifficulty(analytics);

        // Items near mastery frontier get highest priority
        // Target: slightly above current ability (sweet spot 0.3-0.6 difficulty)
        const frontierBonus = 1 - Math.abs(difficulty - 0.4) * 2;
        priority += Math.max(0, frontierBonus) * 0.4;

        // Items below mastery threshold need more practice
        if (analytics.accuracy < MASTERY_THRESHOLD) {
          priority += (1 - analytics.accuracy) * 0.3;
        }

        // Recency penalty: recently seen items get lower priority
        if (analytics.lastSeenMs) {
          const elapsed = now - analytics.lastSeenMs;
          const recencyBonus = Math.min(1, elapsed / (RECENCY_DECAY_MS * 7));
          priority += recencyBonus * 0.3;
        } else {
          priority += 0.3;
        }
      }

      return { item, priority };
    });

    scored.sort((a, b) => b.priority - a.priority);
    const selected = scored.slice(0, count).map((s) => s.item);
    return this._shuffle(selected);
  }

  /**
   * Select exercise mode near student ability level.
   * @param {Array} availableModes - Array of mode name strings
   * @param {number} studentAbility - Student ability 0-1
   * @returns {string} Selected mode name
   */
  selectMode(availableModes, studentAbility) {
    if (!availableModes || availableModes.length === 0) return null;
    if (availableModes.length === 1) return availableModes[0];

    const ability = Math.max(0, Math.min(1, studentAbility));

    // Sort modes by distance to student ability
    const ranked = availableModes
      .filter((mode) => MODE_DIFFICULTY[mode] !== undefined)
      .map((mode) => ({
        mode,
        distance: Math.abs(MODE_DIFFICULTY[mode] - ability),
      }))
      .sort((a, b) => a.distance - b.distance);

    if (ranked.length === 0) return availableModes[0];

    // Pick randomly from top 3 closest
    const top = ranked.slice(0, Math.min(3, ranked.length));
    const idx = Math.floor(Math.random() * top.length);
    return top[idx].mode;
  }

  /**
   * Generate distractors calibrated to student ability.
   * @param {Object} correctItem - The correct answer item
   * @param {Array} pool - Pool of candidate distractor items
   * @param {number} count - Number of distractors to generate
   * @param {number} studentAbility - Student ability 0-1
   * @returns {Array} Array of distractor items
   */
  selectDistractors(correctItem, pool, count, studentAbility) {
    if (!pool || pool.length === 0) return [];

    const ability = Math.max(0, Math.min(1, studentAbility));
    const correctKey = this._itemKey(correctItem);

    // Filter out the correct item
    const candidates = pool.filter((item) => this._itemKey(item) !== correctKey);
    if (candidates.length === 0) return [];
    if (candidates.length <= count) return this._shuffle([...candidates]);

    const correctLen = (correctItem.english || '').length;
    const correctContext = correctItem.context;

    // Score candidates based on similarity
    const scored = candidates.map((item) => {
      let similarity = 0;

      // Same context = more similar
      if (item.context === correctContext) {
        similarity += 0.4;
      }

      // Similar length = more similar
      const lenDiff = Math.abs((item.english || '').length - correctLen);
      const lenSimilarity = Math.max(0, 1 - lenDiff / 20);
      similarity += lenSimilarity * 0.3;

      // Same topic = more similar
      if (item._topicId === correctItem._topicId) {
        similarity += 0.3;
      }

      return { item, similarity };
    });

    // Strong students get similar distractors; weak students get different ones
    if (ability > 0.5) {
      scored.sort((a, b) => b.similarity - a.similarity);
    } else {
      scored.sort((a, b) => a.similarity - b.similarity);
    }

    return scored.slice(0, count).map((s) => s.item);
  }

  /**
   * Compute item difficulty from analytics data.
   * @param {Object} analytics - { totalAttempts, accuracy, avgResponseTimeMs, consecutiveFails }
   * @returns {number} Difficulty 0-1
   */
  computeItemDifficulty(analytics) {
    if (!analytics || analytics.totalAttempts === 0) return 0.5;

    let difficulty = 1 - (analytics.accuracy || 0);

    // Adjust for slow response times
    if (analytics.avgResponseTimeMs > 30000) {
      difficulty += 0.2;
    } else if (analytics.avgResponseTimeMs > 15000) {
      difficulty += 0.1;
    }

    // Adjust for consecutive failures
    if (analytics.consecutiveFails >= 3) {
      difficulty += 0.2;
    }

    // Clamp to [0, 1]
    return Math.max(0, Math.min(1, difficulty));
  }

  /**
   * Build item key from item properties.
   */
  _itemKey(item) {
    return `${item._topicId}:${item._level}:${item.context}:${item.english}`;
  }

  /**
   * Fisher-Yates shuffle.
   */
  _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

const adaptiveDifficultyService = new AdaptiveDifficultyService();

export { AdaptiveDifficultyService, adaptiveDifficultyService };
