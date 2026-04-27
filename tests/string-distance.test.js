import { describe, it, expect } from 'vitest';
import { levenshtein, nearMiss, diffChars } from '../js/utils/StringDistance.js';

describe('levenshtein', () => {
  it('returns 0 for identical strings', () => {
    expect(levenshtein('firewall', 'firewall')).toBe(0);
    expect(levenshtein('', '')).toBe(0);
  });

  it('returns the length of the non-empty string when one is empty', () => {
    expect(levenshtein('', 'abc')).toBe(3);
    expect(levenshtein('abc', '')).toBe(3);
  });

  it('counts single substitutions, insertions, deletions', () => {
    expect(levenshtein('cat', 'bat')).toBe(1);
    expect(levenshtein('cat', 'cats')).toBe(1);
    expect(levenshtein('cats', 'cat')).toBe(1);
  });

  it('counts adjacent transpositions as two edits', () => {
    expect(levenshtein('fierwall', 'firewall')).toBe(2);
  });
});

describe('nearMiss', () => {
  it('flags exact matches case- and accent-insensitively', () => {
    expect(nearMiss('Cybersicurezza', 'cybersicurezza')).toEqual({
      exact: true,
      partial: false,
      edits: 0,
    });
    expect(nearMiss('caffè', 'caffe')).toMatchObject({ exact: true });
  });

  it('forgives small typos as partial credit', () => {
    expect(nearMiss('frewall', 'firewall').partial).toBe(true);
    expect(nearMiss('fierwall', 'firewall').partial).toBe(true);
  });

  it('rejects answers that are too far off', () => {
    const r = nearMiss('hello', 'world');
    expect(r.exact).toBe(false);
    expect(r.partial).toBe(false);
  });

  it('handles empty user input as a non-partial miss', () => {
    expect(nearMiss('', 'word')).toEqual({ exact: false, partial: false, edits: 4 });
  });

  it('forgives flag-order swaps for short commands', () => {
    expect(nearMiss('ls -la', 'ls -al').partial).toBe(true);
  });

  it('does not over-forgive on short expected words', () => {
    // Threshold floor of 2; 3-edit gap on a 3-letter word is not partial.
    expect(nearMiss('xyz', 'cat').partial).toBe(false);
  });

  it('coerces non-string inputs without throwing', () => {
    expect(nearMiss(undefined, 'word')).toMatchObject({ exact: false, partial: false });
    expect(nearMiss(null, null)).toMatchObject({ exact: false });
  });
});

describe('diffChars', () => {
  it('marks matching positions and returns full length of longer input', () => {
    const out = diffChars('cat', 'cap');
    expect(out).toHaveLength(3);
    expect(out[0]).toEqual({ char: 'c', match: true });
    expect(out[2]).toEqual({ char: 't', match: false });
  });

  it('emits the expected character when user is shorter', () => {
    const out = diffChars('ca', 'cat');
    expect(out).toHaveLength(3);
    expect(out[2].char).toBe('t');
    expect(out[2].match).toBe(false);
  });
});
