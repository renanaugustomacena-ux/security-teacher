/**
 * LESSON V2 FEATURE FLAGS - FlowLearn
 * ===================================
 *
 * Per-topic opt-in for the redesigned teach-then-practice lesson loop
 * (LessonV2Engine). Topics not in the set keep the proven 4-stage
 * TopicLessonEngine untouched, so the 16 non-pilot domains and the existing
 * tests are unaffected during the cybersecurity pilot.
 */

export const LESSON_V2_TOPICS = new Set(['cybersecurity']);

/**
 * @param {string} topicId
 * @returns {boolean} true when the topic should use LessonV2Engine.
 */
export function useLessonV2(topicId) {
  return LESSON_V2_TOPICS.has(topicId);
}
