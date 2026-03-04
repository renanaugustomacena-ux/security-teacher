/**
 * TOPIC REGISTRY - FlowLearn
 * ==========================
 *
 * Metadata registry for all technical topics.
 * Actual data is lazy-loaded via dynamic import() when user navigates to a topic.
 */

export const topicsRegistry = [
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    titleIt: 'Sicurezza Informatica',
    icon: '\u{1F6E1}\uFE0F',
    description: 'Learn English cybersecurity terminology',
    descriptionIt: 'Impara la terminologia inglese della sicurezza informatica',
    levelCount: 12,
    color: '#ef4444',
  },
  {
    id: 'python',
    title: 'Python Programming',
    titleIt: 'Programmazione Python',
    icon: '\u{1F40D}',
    description: 'Learn English Python programming terminology',
    descriptionIt: 'Impara la terminologia inglese della programmazione Python',
    levelCount: 12,
    color: '#3b82f6',
  },
  {
    id: 'linux',
    title: 'Linux',
    titleIt: 'Linux / Linea di Comando',
    icon: '\u{1F427}',
    description: 'Learn English Linux and command line terminology',
    descriptionIt: 'Impara la terminologia inglese di Linux e della linea di comando',
    levelCount: 12,
    color: '#f59e0b',
  },
  {
    id: 'software-dev',
    title: 'Software Development',
    titleIt: 'Sviluppo Software',
    icon: '\u2699\uFE0F',
    description: 'Learn English software development terminology',
    descriptionIt: 'Impara la terminologia inglese dello sviluppo software',
    levelCount: 12,
    color: '#10b981',
  },
];

/**
 * Get a topic by ID
 */
export function getTopicMeta(topicId) {
  return topicsRegistry.find((t) => t.id === topicId) || null;
}
