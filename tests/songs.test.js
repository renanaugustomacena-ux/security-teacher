import { describe, it, expect } from 'vitest';
import {
  songsDatabase,
  getAllSongs,
  getSongById,
  getSongsByDifficulty,
  getTotalSteps,
} from '../js/songs.js';

describe('songsDatabase', () => {
  it('has at least 4 songs', () => {
    expect(songsDatabase.length).toBeGreaterThanOrEqual(4);
  });

  it('every song has required fields', () => {
    songsDatabase.forEach((song) => {
      expect(song.id).toBeTruthy();
      expect(song.title).toBeTruthy();
      expect(song.artist).toBeTruthy();
      expect(song.difficulty).toBeTruthy();
      expect(song.coverEmoji).toBeTruthy();
      expect(Array.isArray(song.steps)).toBe(true);
      expect(song.steps.length).toBeGreaterThan(0);
    });
  });

  it('every step has english, italian, vocabulary, and phonetics', () => {
    songsDatabase.forEach((song) => {
      song.steps.forEach((step, i) => {
        expect(step.english, `${song.title} step ${i} missing english`).toBeTruthy();
        expect(step.italian, `${song.title} step ${i} missing italian`).toBeTruthy();
        expect(Array.isArray(step.vocabulary), `${song.title} step ${i} vocabulary not array`).toBe(
          true
        );
        expect(Array.isArray(step.phonetics), `${song.title} step ${i} phonetics not array`).toBe(
          true
        );
      });
    });
  });

  it('every vocabulary item has word, pronunciation, translation, example', () => {
    songsDatabase.forEach((song) => {
      song.steps.forEach((step) => {
        step.vocabulary.forEach((v) => {
          expect(v.word).toBeTruthy();
          expect(v.pronunciation).toBeTruthy();
          expect(v.translation).toBeTruthy();
          expect(v.example).toBeTruthy();
        });
      });
    });
  });

  it('every phonetics item has text, howTo, and tip', () => {
    songsDatabase.forEach((song) => {
      song.steps.forEach((step) => {
        step.phonetics.forEach((p) => {
          expect(p.text).toBeTruthy();
          expect(p.howTo).toBeTruthy();
          expect(p.tip).toBeTruthy();
        });
      });
    });
  });
});

describe('getSongById', () => {
  it('finds songs by ID', () => {
    const happy = getSongById('happy');
    expect(happy).toBeDefined();
    expect(happy.title).toBe('Happy');
    expect(happy.artist).toBe('Pharrell Williams');
  });

  it('returns undefined for non-existent ID', () => {
    expect(getSongById('nonexistent')).toBeUndefined();
  });
});

describe('getSongsByDifficulty', () => {
  it('filters by easy difficulty', () => {
    const easy = getSongsByDifficulty('easy');
    expect(easy.length).toBeGreaterThan(0);
    easy.forEach((s) => expect(s.difficulty).toBe('easy'));
  });

  it('returns all songs for "all"', () => {
    const all = getSongsByDifficulty('all');
    expect(all.length).toBe(songsDatabase.length);
  });
});

describe('getAllSongs', () => {
  it('returns the full songs array', () => {
    expect(getAllSongs()).toBe(songsDatabase);
  });
});

describe('getTotalSteps', () => {
  it('returns correct step count', () => {
    const happy = getSongById('happy');
    expect(getTotalSteps('happy')).toBe(happy.steps.length);
  });

  it('returns 0 for unknown song', () => {
    expect(getTotalSteps('unknown')).toBe(0);
  });
});
