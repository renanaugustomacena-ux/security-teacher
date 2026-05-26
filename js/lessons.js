import { LEVEL_0 } from './data/lessons-level-0.js';
import { LEVEL_1 } from './data/lessons-level-1.js';
import { LEVEL_2 } from './data/lessons-level-2.js';
import { LEVEL_3 } from './data/lessons-level-3.js';

export const lessonsDatabase = {
  0: LEVEL_0,
  1: LEVEL_1,
  2: LEVEL_2,
  3: LEVEL_3,
};

export function getLessonsByLevel(level) {
  return lessonsDatabase[level] || null;
}

export function getLesson(level, lessonId) {
  const levelData = lessonsDatabase[level];
  if (!levelData) return null;
  return levelData.lessons.find((l) => l.id === lessonId) || null;
}

export function getAllVocabulary() {
  const vocab = [];
  Object.values(lessonsDatabase).forEach((level) => {
    level.lessons.forEach((lesson) => {
      lesson.items.forEach((item) => {
        vocab.push(item);
      });
    });
  });
  return vocab;
}
