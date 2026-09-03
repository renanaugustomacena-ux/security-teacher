import { describe, it, expect } from 'vitest';
import topicData from '../js/topics/data/library-glossary.js';
import { getTopicMeta } from '../js/topics/registry.js';

// library-glossary.js is GENERATED from the maintainer's study library by
// scripts/ingest-library-glossaries.mjs. Generated content still ships to
// learners, so it gets the same structural guarantees as hand-authored topics:
// if a parser change starts emitting junk, this fails instead of the app.

describe('library-glossary generated topic data', () => {
  const levels = Object.values(topicData.levels);
  const allItems = levels.flatMap((l) => l.lessons.flatMap((s) => s.items));

  it('declares the topic id the loader will import it by', () => {
    // TopicManager loads via import(`./data/${topicId}.js`), so a mismatch
    // between the registry id and this field is an instant 404.
    expect(topicData.id).toBe('library-glossary');
  });

  it('level count matches the registry entry', () => {
    const meta = getTopicMeta('library-glossary');
    expect(meta).not.toBeNull();
    expect(levels).toHaveLength(meta.levelCount);
  });

  it('levels are keyed 0..n-1 contiguously', () => {
    // buildPool and the level UI index by number; a gap silently hides content.
    const keys = Object.keys(topicData.levels)
      .map(Number)
      .sort((a, b) => a - b);
    expect(keys).toEqual(keys.map((_, i) => i));
  });

  it('every level has a bilingual name and at least one lesson', () => {
    for (const level of levels) {
      expect(level.name, 'level name').toBeTruthy();
      expect(level.description).toMatch(' / ');
      expect(level.lessons.length).toBeGreaterThan(0);
    }
  });

  it('every lesson has a unique id and a non-empty item list', () => {
    const ids = new Set();
    for (const level of levels) {
      for (const lesson of level.lessons) {
        expect(lesson.id, 'lesson id').toBeTruthy();
        expect(ids.has(lesson.id), `duplicate lesson id ${lesson.id}`).toBe(false);
        ids.add(lesson.id);
        expect(lesson.items.length).toBeGreaterThan(0);
        expect(lesson.items.length).toBeLessThanOrEqual(10);
      }
    }
  });

  it('carries a substantial number of terms', () => {
    // Guards against a parser regression that silently drops most rows.
    expect(allItems.length).toBeGreaterThan(1000);
  });

  it('every item has the fields the practice engine requires', () => {
    for (const item of allItems) {
      expect(typeof item.english).toBe('string');
      expect(item.english.length).toBeGreaterThan(0);
      expect(typeof item.italian).toBe('string');
      expect(item.italian.length).toBeGreaterThan(0);
      expect(typeof item.context).toBe('string');
      expect(item.context.length).toBeGreaterThan(0);
      expect(item.difficulty).toBeTruthy();
    }
  });

  it('no item is a degenerate identity translation', () => {
    // The practice engine filters these at runtime, but emitting them wastes
    // pool capacity in every translation mode.
    const identity = allItems.filter(
      (i) => i.english.trim().toLowerCase() === i.italian.trim().toLowerCase()
    );
    expect(identity, `identity items: ${identity.map((i) => i.english).join(', ')}`).toHaveLength(
      0
    );
  });

  it('term names are unique across the whole topic', () => {
    const seen = new Set();
    const dupes = [];
    for (const item of allItems) {
      const key = item.english.toLowerCase();
      if (seen.has(key)) dupes.push(item.english);
      seen.add(key);
    }
    expect(dupes, `duplicate terms: ${dupes.slice(0, 5).join(', ')}`).toHaveLength(0);
  });

  it('no item leaks raw markdown or table pipes into the UI', () => {
    for (const item of allItems) {
      for (const field of ['english', 'italian', 'note']) {
        const value = item[field];
        if (typeof value !== 'string') continue;
        expect(value, `${field} of ${item.english} contains a pipe`).not.toMatch(/\|/);
        expect(value, `${field} of ${item.english} contains markdown bold`).not.toMatch(/\*\*/);
      }
    }
  });

  it('flags long glosses so typing modes can exclude them', () => {
    for (const item of allItems) {
      if (item.italian.length > 40) {
        expect(item.longAnswer, `${item.english} has a long gloss but no longAnswer flag`).toBe(
          true
        );
      }
    }
  });

  it('notes, when present, add information beyond the gloss', () => {
    // A note identical to the gloss would make `definizione` ask the same
    // question as `matching`, with the same answer.
    for (const item of allItems) {
      if (!item.note) continue;
      expect(item.note.trim()).not.toBe(item.italian.trim());
      expect(item.note.length).toBeGreaterThan(item.italian.length);
    }
  });

  it('has enough note-bearing items to drive the definizione mode', () => {
    const withNote = allItems.filter((i) => typeof i.note === 'string' && i.note.length >= 20);
    expect(withNote.length / allItems.length).toBeGreaterThan(0.5);
  });
});
