import { describe, it, expect } from 'vitest';
import { lessonsDatabase, getLessonsByLevel, getLesson, getAllVocabulary } from '../js/lessons.js';

describe('lessonsDatabase', () => {
  it('has levels 0-3', () => {
    expect(lessonsDatabase[0]).toBeDefined();
    expect(lessonsDatabase[1]).toBeDefined();
    expect(lessonsDatabase[2]).toBeDefined();
    expect(lessonsDatabase[3]).toBeDefined();
  });

  it('does not have tech jargon content', () => {
    const allVocab = getAllVocabulary();
    const techWords = ['Python', 'Docker', 'Container', 'Phishing', 'Neural Network', 'Commit'];
    techWords.forEach((word) => {
      const found = allVocab.find((item) => item.english === word);
      expect(found).toBeUndefined();
    });
  });

  it('has real beginner English content in Level 0', () => {
    const level0 = getLessonsByLevel(0);
    const allItems = level0.lessons.flatMap((l) => l.items);
    // Check that greetings/phrases content exists with key phrases
    const hasGreeting = allItems.some((item) => item.english.toLowerCase().includes('hello'));
    const hasThankYou = allItems.some((item) => item.english.toLowerCase().includes('thank you'));
    const hasSorry = allItems.some((item) => item.english.toLowerCase().includes('sorry'));
    expect(hasGreeting).toBe(true);
    expect(hasThankYou).toBe(true);
    expect(hasSorry).toBe(true);
  });

  it('every level has a name and lessons array', () => {
    [0, 1, 2, 3].forEach((level) => {
      const data = lessonsDatabase[level];
      expect(data.name).toBeTruthy();
      expect(Array.isArray(data.lessons)).toBe(true);
      expect(data.lessons.length).toBeGreaterThan(0);
    });
  });

  it('every lesson item has required fields: english, italian, pronunciation', () => {
    const allVocab = getAllVocabulary();
    allVocab.forEach((item) => {
      expect(item.english).toBeTruthy();
      expect(item.italian).toBeTruthy();
      expect(item.pronunciation).toBeTruthy();
    });
  });

  it('every lesson item has an example', () => {
    const allVocab = getAllVocabulary();
    allVocab.forEach((item) => {
      expect(item.example || item.usage).toBeTruthy();
    });
  });
});

describe('getLessonsByLevel', () => {
  it('returns level data for valid levels', () => {
    const level0 = getLessonsByLevel(0);
    expect(level0).not.toBeNull();
    expect(level0.lessons).toBeDefined();
  });

  it('returns null for invalid levels', () => {
    expect(getLessonsByLevel(99)).toBeNull();
    expect(getLessonsByLevel(-1)).toBeNull();
  });
});

describe('getLesson', () => {
  it('finds a lesson by level and ID', () => {
    const lesson = getLesson(0, 'greetings');
    expect(lesson).not.toBeNull();
    expect(lesson.title).toBeTruthy();
    expect(lesson.items.length).toBeGreaterThan(0);
  });

  it('returns null for non-existent lesson', () => {
    expect(getLesson(0, 'nonexistent')).toBeNull();
    expect(getLesson(99, 'greetings')).toBeNull();
  });
});

describe('getAllVocabulary', () => {
  it('returns a flat array of all vocabulary items', () => {
    const vocab = getAllVocabulary();
    expect(Array.isArray(vocab)).toBe(true);
    expect(vocab.length).toBeGreaterThan(50);
  });
});

describe('Level progression targets C1', () => {
  it('Level 2 contains intermediate grammar: conditionals, passive, connectors', () => {
    const level2 = getLessonsByLevel(2);
    const lessonIds = level2.lessons.map((l) => l.id);
    expect(lessonIds).toContain('conditionals');
    expect(lessonIds).toContain('passive_voice');
    expect(lessonIds).toContain('connectors_linking');
  });

  it('Level 3 contains C1-level content: phrasal verbs, idioms, abstract vocabulary', () => {
    const level3 = getLessonsByLevel(3);
    const lessonIds = level3.lessons.map((l) => l.id);
    expect(lessonIds).toContain('phrasal_verbs');
    expect(lessonIds).toContain('idioms_expressions');
    expect(lessonIds).toContain('abstract_vocabulary');
  });

  it('Level 3 phrasal verbs lesson has common phrasal verbs', () => {
    const pvLesson = getLesson(3, 'phrasal_verbs');
    expect(pvLesson).not.toBeNull();
    const texts = pvLesson.items.map((i) => i.english.toLowerCase());
    expect(texts.some((t) => t.includes('come up with'))).toBe(true);
    expect(texts.some((t) => t.includes('put up with'))).toBe(true);
    expect(texts.some((t) => t.includes('figure out'))).toBe(true);
  });

  it('does not contain trivial alphabet or number exercises', () => {
    const level0 = getLessonsByLevel(0);
    const lessonIds = level0.lessons.map((l) => l.id);
    expect(lessonIds).not.toContain('alphabet');
    expect(lessonIds).not.toContain('numbers');
  });
});
