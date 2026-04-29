import { describe, it, expect, beforeEach, vi } from 'vitest';

function makeMockSynth() {
  const calls = { speak: [], cancel: 0 };
  return {
    speak: vi.fn((u) => calls.speak.push(u)),
    cancel: vi.fn(() => {
      calls.cancel += 1;
    }),
    getVoices: vi.fn(() => []),
    addEventListener: vi.fn(),
    __calls: calls,
  };
}

describe('TTSService', () => {
  let TTSService;

  beforeEach(async () => {
    globalThis.window = { speechSynthesis: makeMockSynth() };
    globalThis.SpeechSynthesisUtterance = class {
      constructor(text) {
        this.text = text;
        this.lang = '';
        this.rate = 1;
        this.voice = null;
      }

      addEventListener() {}
    };
    globalThis.document = {
      querySelectorAll: vi.fn(() => []),
      createElement: vi.fn(() => ({
        className: '',
        type: '',
        title: '',
        dataset: {},
        innerHTML: '',
        addEventListener: vi.fn(),
      })),
    };
    globalThis.CSS = { escape: (s) => s };
    vi.resetModules();
    ({ TTSService } = await import('../js/services/TTSService.js'));
  });

  it('reports support when speechSynthesis is available', () => {
    const svc = new TTSService();
    expect(svc.isSupported).toBe(true);
  });

  it('reports no support when speechSynthesis is missing', async () => {
    globalThis.window = {};
    vi.resetModules();
    const m = await import('../js/services/TTSService.js');
    const svc = new m.TTSService();
    expect(svc.isSupported).toBe(false);
  });

  it('speak() is a safe no-op when synth is missing', async () => {
    globalThis.window = {};
    vi.resetModules();
    const m = await import('../js/services/TTSService.js');
    const svc = new m.TTSService();
    expect(() => svc.speak('hello')).not.toThrow();
  });

  it('speak() pushes an utterance through the synth when supported', () => {
    const svc = new TTSService();
    svc.speak('hello');
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });

  it('speak() with empty text is a no-op', () => {
    const svc = new TTSService();
    svc.speak('');
    expect(window.speechSynthesis.speak).not.toHaveBeenCalled();
  });

  it('stop() calls cancel on the synth', () => {
    const svc = new TTSService();
    svc.stop();
    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });

  it('setRate clamps to [0.1, 10]', () => {
    const svc = new TTSService();
    svc.setRate(-5);
    expect(svc._rate).toBe(0.1);
    svc.setRate(99);
    expect(svc._rate).toBe(10);
    svc.setRate(1.2);
    expect(svc._rate).toBe(1.2);
  });

  it('speakerButtonHTML escapes HTML-significant characters in the data-tts-text attribute', () => {
    const svc = new TTSService();
    const html = svc.speakerButtonHTML('<script>alert(1)</script>');
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('_escapeAttr escapes the five XML-significant characters', () => {
    const svc = new TTSService();
    expect(svc._escapeAttr('&')).toBe('&amp;');
    expect(svc._escapeAttr('"')).toBe('&quot;');
    expect(svc._escapeAttr("'")).toBe('&#39;');
    expect(svc._escapeAttr('<')).toBe('&lt;');
    expect(svc._escapeAttr('>')).toBe('&gt;');
  });

  it('_escapeAttr handles null / undefined', () => {
    const svc = new TTSService();
    expect(svc._escapeAttr(null)).toBe('');
    expect(svc._escapeAttr(undefined)).toBe('');
  });
});
