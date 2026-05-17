/**
 * KnowledgeGraphService — maps prerequisite relationships between contexts
 * (sub-topics) within each domain.  Computes learning frontiers, topological
 * order, and recommended-next suggestions so the app can guide the learner
 * through the graph in a valid sequence.
 *
 * Pure in-memory, no persistence — call registerPrerequisites() at init time.
 */

class KnowledgeGraphService {
  constructor() {
    /** @type {Map<string, Map<string, string[]>>} topicId → (context → prereq list) */
    this._prerequisites = new Map();

    /** @type {Map<string, Map<string, Set<string>>>} topicId → (context → dependents) */
    this._dependents = new Map();
  }

  // -------------------------------------------------------------------
  //  Registration
  // -------------------------------------------------------------------

  /**
   * Store a prerequisite map for a topic.
   * @param {string} topicId
   * @param {Object<string, string[]>} prerequisites
   *   e.g. { crypto: ['encoding', 'hashing'], encoding: [] }
   */
  registerPrerequisites(topicId, prerequisites) {
    const prereqMap = new Map();
    const depMap = new Map();

    // Initialise every context (including leaves referenced only as prereqs).
    for (const [ctx, deps] of Object.entries(prerequisites)) {
      prereqMap.set(ctx, deps);
      if (!depMap.has(ctx)) depMap.set(ctx, new Set());
      for (const dep of deps) {
        if (!depMap.has(dep)) depMap.set(dep, new Set());
        // ctx depends on dep → dep's dependents include ctx
        depMap.get(dep).add(ctx);
      }
    }

    this._prerequisites.set(topicId, prereqMap);
    this._dependents.set(topicId, depMap);
  }

  // -------------------------------------------------------------------
  //  Queries
  // -------------------------------------------------------------------

  /**
   * Contexts whose prerequisites are ALL mastered but which are NOT mastered
   * themselves — the "ready to learn" frontier.
   * @param {string} topicId
   * @param {Set<string>} masteredContexts
   * @returns {Set<string>}
   */
  getInnerFringe(topicId, masteredContexts) {
    const prereqMap = this._prerequisites.get(topicId);
    if (!prereqMap) return new Set();

    const fringe = new Set();
    for (const [ctx, deps] of prereqMap) {
      if (masteredContexts.has(ctx)) continue;
      if (deps.every((d) => masteredContexts.has(d))) {
        fringe.add(ctx);
      }
    }
    return fringe;
  }

  /**
   * Contexts one step beyond the inner fringe — not yet ready, but whose
   * prerequisites are all contained in (mastered ∪ innerFringe).
   * @param {string} topicId
   * @param {Set<string>} masteredContexts
   * @returns {Set<string>}
   */
  getOuterFringe(topicId, masteredContexts) {
    const prereqMap = this._prerequisites.get(topicId);
    if (!prereqMap) return new Set();

    const innerFringe = this.getInnerFringe(topicId, masteredContexts);
    const reachable = new Set([...masteredContexts, ...innerFringe]);
    const outer = new Set();

    for (const [ctx, deps] of prereqMap) {
      if (masteredContexts.has(ctx) || innerFringe.has(ctx)) continue;
      if (deps.every((d) => reachable.has(d))) {
        outer.add(ctx);
      }
    }
    return outer;
  }

  /**
   * @param {string} topicId
   * @param {string} context
   * @returns {string[]} prerequisite context names (empty array if none / unknown)
   */
  getPrerequisitesFor(topicId, context) {
    const prereqMap = this._prerequisites.get(topicId);
    if (!prereqMap) return [];
    return prereqMap.get(context) ?? [];
  }

  /**
   * @param {string} topicId
   * @param {string} context
   * @returns {string[]} contexts that directly depend on the given context
   */
  getDependentsOf(topicId, context) {
    const depMap = this._dependents.get(topicId);
    if (!depMap) return [];
    return [...(depMap.get(context) ?? [])];
  }

  /**
   * Are all prerequisites for `context` present in `masteredContexts`?
   * @param {string} topicId
   * @param {string} context
   * @param {Set<string>} masteredContexts
   * @returns {boolean}
   */
  isReady(topicId, context, masteredContexts) {
    const deps = this.getPrerequisitesFor(topicId, context);
    return deps.every((d) => masteredContexts.has(d));
  }

  /**
   * Return all contexts in a valid learning order (Kahn's algorithm / BFS).
   * Roots come first; dependents follow.
   * @param {string} topicId
   * @returns {string[]}
   */
  getTopologicalOrder(topicId) {
    const prereqMap = this._prerequisites.get(topicId);
    if (!prereqMap) return [];

    // Build in-degree counts.
    const inDegree = new Map();
    for (const [ctx, deps] of prereqMap) {
      if (!inDegree.has(ctx)) inDegree.set(ctx, 0);
      for (const d of deps) {
        if (!inDegree.has(d)) inDegree.set(d, 0);
      }
      inDegree.set(ctx, (inDegree.get(ctx) ?? 0) + deps.length);
    }

    // Seed the queue with zero in-degree nodes (sorted for stability).
    const queue = [...inDegree.entries()]
      .filter(([, deg]) => deg === 0)
      .map(([ctx]) => ctx)
      .sort();

    const order = [];
    const depMap = this._dependents.get(topicId);

    while (queue.length > 0) {
      const current = queue.shift();
      order.push(current);
      const children = depMap?.get(current) ?? new Set();
      for (const child of [...children].sort()) {
        inDegree.set(child, inDegree.get(child) - 1);
        if (inDegree.get(child) === 0) queue.push(child);
      }
    }

    return order;
  }

  /**
   * Top N recommended next contexts from the inner fringe, ranked by how many
   * NEW contexts become ready (move into the inner fringe) if the candidate is
   * mastered.  Higher unlock potential → higher rank.
   * @param {string} topicId
   * @param {Set<string>} masteredContexts
   * @param {number} [count=3]
   * @returns {string[]}
   */
  getRecommendedNext(topicId, masteredContexts, count = 3) {
    const innerFringe = this.getInnerFringe(topicId, masteredContexts);
    if (innerFringe.size === 0) return [];

    const scored = [];
    for (const candidate of innerFringe) {
      // Simulate mastering this candidate.
      const simulated = new Set(masteredContexts);
      simulated.add(candidate);
      const newFringe = this.getInnerFringe(topicId, simulated);

      // Count contexts that are newly ready (not in the current inner fringe
      // and not already mastered).
      let unlocked = 0;
      for (const ctx of newFringe) {
        if (!innerFringe.has(ctx) && !masteredContexts.has(ctx)) unlocked++;
      }

      scored.push({ context: candidate, unlocked });
    }

    // Sort descending by unlock count, then alphabetically for stability.
    scored.sort((a, b) => b.unlocked - a.unlocked || a.context.localeCompare(b.context));
    return scored.slice(0, count).map((s) => s.context);
  }
}

export { KnowledgeGraphService };
export const knowledgeGraphService = new KnowledgeGraphService();
