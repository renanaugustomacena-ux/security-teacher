import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LyricsService } from '../js/services/LyricsService.js';

describe('LyricsService.parseLrc — §4.4 LRC parser bounds', () => {
  let svc;
  beforeEach(() => {
    svc = new LyricsService();
  });

  it('returns [] for non-string / empty input', () => {
    expect(svc.parseLrc(null)).toEqual([]);
    expect(svc.parseLrc(undefined)).toEqual([]);
    expect(svc.parseLrc('')).toEqual([]);
    expect(svc.parseLrc(42)).toEqual([]);
  });

  it('parses a basic [mm:ss.xx] line', () => {
    const lrc = '[01:23.45] hello world';
    const result = svc.parseLrc(lrc);
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('hello world');
    expect(result[0].time).toBeCloseTo(83.45, 2);
  });

  it('parses [mm:ss] without milliseconds', () => {
    const result = svc.parseLrc('[02:00] line two');
    expect(result[0].time).toBe(120);
    expect(result[0].text).toBe('line two');
  });

  it('drops lines with no valid timestamp silently', () => {
    const lrc = ['[malformed] orphan line', '[01:00.00] real line'].join('\n');
    const result = svc.parseLrc(lrc);
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('real line');
  });

  it('emits one entry per repeated timestamp on the same line', () => {
    const lrc = '[00:10.00][00:20.00][00:30.00] chorus';
    const result = svc.parseLrc(lrc);
    expect(result).toHaveLength(3);
    expect(result.map((r) => r.time)).toEqual([10, 20, 30]);
    for (const r of result) expect(r.text).toBe('chorus');
  });

  it('returns entries sorted ascending by time', () => {
    const lrc = ['[00:30.00] later', '[00:10.00] first', '[00:20.00] middle'].join('\n');
    const result = svc.parseLrc(lrc);
    expect(result.map((r) => r.text)).toEqual(['first', 'middle', 'later']);
  });

  it('strips bidi characters from the lyric text', () => {
    const lrc = '[00:01.00] safe‮evil';
    const result = svc.parseLrc(lrc);
    expect(result[0].text).toBe('safeevil');
  });

  it('caps the parsed lyric count to ~2000 entries even on a flood', () => {
    const lines = [];
    for (let i = 0; i < 5000; i++) {
      const m = String(Math.floor(i / 60)).padStart(2, '0');
      const s = String(i % 60).padStart(2, '0');
      lines.push(`[${m}:${s}.00] line ${i}`);
    }
    const result = svc.parseLrc(lines.join('\n'));
    expect(result.length).toBeLessThanOrEqual(2000);
  });

  it('truncates oversized inputs above the byte cap', () => {
    const huge = `[00:01.00] ${'A'.repeat(2_000_000)}`;
    expect(() => svc.parseLrc(huge)).not.toThrow();
  });

  it('skips a single line longer than MAX_LINE_LEN', () => {
    const longLine = `[00:01.00]${' x'.repeat(8000)}`;
    const result = svc.parseLrc(`${longLine}\n[00:02.00] short`);
    expect(result.find((r) => r.text === 'short')).toBeDefined();
  });

  it('handles mixed valid + invalid timestamps without crashing', () => {
    const lrc = ['[xx:yy.zz] garbage', '[00:05.00] ok', '[abc] bad'].join('\n');
    const result = svc.parseLrc(lrc);
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('ok');
  });
});

describe('LyricsService.parseFilename — filename heuristics', () => {
  let svc;
  beforeEach(() => {
    svc = new LyricsService();
  });

  it('splits "Artist - Track" filenames', () => {
    expect(svc.parseFilename('Coldplay - Yellow.mp3')).toEqual({
      artist: 'Coldplay',
      track: 'Yellow',
    });
  });

  it('strips parenthetical noise like (Official Audio)', () => {
    const out = svc.parseFilename('Coldplay - Yellow (Official Audio).mp3');
    expect(out.track).toBe('Yellow');
  });

  it('strips bracketed noise like [HD]', () => {
    const out = svc.parseFilename('Coldplay - Yellow [HD].mp3');
    expect(out.track).toBe('Yellow');
  });

  it('replaces underscores with spaces', () => {
    const out = svc.parseFilename('Coldplay_-_Yellow.mp3');
    expect(out.artist).toBe('Coldplay');
    expect(out.track).toBe('Yellow');
  });

  it('falls back to "Unknown Artist" when no separator', () => {
    const out = svc.parseFilename('Justatrack.mp3');
    expect(out.artist).toBe('Unknown Artist');
  });

  it('detects "Track by Artist" pattern', () => {
    const out = svc.parseFilename('Yellow by Coldplay.mp3');
    expect(out.artist).toBe('Coldplay');
    expect(out.track).toBe('Yellow');
  });
});

describe('LyricsService.cleanSearchTerm', () => {
  let svc;
  beforeEach(() => {
    svc = new LyricsService();
  });

  it('returns empty string for falsy input', () => {
    expect(svc.cleanSearchTerm('')).toBe('');
    expect(svc.cleanSearchTerm(null)).toBe('');
    expect(svc.cleanSearchTerm(undefined)).toBe('');
  });

  it('strips parenthetical and bracketed noise', () => {
    expect(svc.cleanSearchTerm('Yellow (feat. X) [HD]')).toBe('Yellow');
  });

  it('preserves apostrophes and hyphens', () => {
    expect(svc.cleanSearchTerm("don't stop me-now")).toBe("don't stop me-now");
  });
});

describe('LyricsService.translate — §4.3 MyMemory shape validation', () => {
  let svc;
  let originalFetch;
  beforeEach(() => {
    svc = new LyricsService();
    originalFetch = globalThis.fetch;
  });

  function mockFetchOnce(body, ok = true, status = 200) {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok,
      status,
      json: async () => body,
    });
  }

  it('returns "" for empty / whitespace input', async () => {
    expect(await svc.translate('')).toBe('');
    expect(await svc.translate('   ')).toBe('');
  });

  it('returns translatedText for a well-shaped response', async () => {
    mockFetchOnce({ responseData: { translatedText: 'ciao' } });
    const result = await svc.translate('hello');
    expect(result).toBe('ciao');
  });

  it('falls back to "..." when responseData is missing', async () => {
    mockFetchOnce({});
    const result = await svc.translate('hello');
    expect(result).toBe('...');
  });

  it('falls back to "..." when translatedText is not a string', async () => {
    mockFetchOnce({ responseData: { translatedText: 12345 } });
    const result = await svc.translate('hello');
    expect(result).toBe('...');
  });

  it('falls back to "..." for non-object response', async () => {
    mockFetchOnce('not an object');
    const result = await svc.translate('hello');
    expect(result).toBe('...');
  });

  it('falls back to "..." for an array response', async () => {
    mockFetchOnce([1, 2, 3]);
    const result = await svc.translate('hello');
    expect(result).toBe('...');
  });

  it('falls back to "..." on non-2xx HTTP status', async () => {
    mockFetchOnce({}, false, 500);
    const result = await svc.translate('hello');
    expect(result).toBe('...');
  });

  it('strips bidi characters from translatedText', async () => {
    mockFetchOnce({ responseData: { translatedText: 'safe‮evil' } });
    const result = await svc.translate('test');
    expect(result).toBe('safeevil');
  });

  it('caps translatedText at MAX_TRANSLATION_LEN (12_000)', async () => {
    mockFetchOnce({ responseData: { translatedText: 'A'.repeat(50_000) } });
    const result = await svc.translate('big');
    expect(result.length).toBeLessThanOrEqual(12_000);
  });

  it('returns the cached value on the second call', async () => {
    mockFetchOnce({ responseData: { translatedText: 'cached' } });
    const a = await svc.translate('foo');
    expect(a).toBe('cached');
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    const b = await svc.translate('foo');
    expect(b).toBe('cached');
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it('cleans up the global fetch override', () => {
    globalThis.fetch = originalFetch;
  });
});

describe('LyricsService.getPhonetics — phonetic transformation', () => {
  let svc;
  beforeEach(() => {
    svc = new LyricsService();
  });

  it('returns empty string for falsy input', () => {
    expect(svc.getPhonetics('')).toBe('');
    expect(svc.getPhonetics(null)).toBe('');
  });

  it('substitutes the th digraph with U+03B8', () => {
    expect(svc.getPhonetics('thing')).toContain('θ');
  });

  it('substitutes the sh digraph with U+0283', () => {
    expect(svc.getPhonetics('ship')).toContain('ʃ');
  });

  it('substitutes ee with i:', () => {
    expect(svc.getPhonetics('see')).toContain('iː');
  });
});
