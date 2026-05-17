/* eslint-disable import/first */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CertificateService } from '../js/services/CertificateService.js';

function makeCanvasMock() {
  const ctx = {
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 0,
    textAlign: '',
    font: '',
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    fillText: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    toDataURL: vi.fn(() => 'data:image/png;base64,FAKE'),
  };
  return {
    width: 0,
    height: 0,
    getContext: vi.fn(() => ctx),
    _ctx: ctx,
    toDataURL: ctx.toDataURL,
  };
}

const origDocument = globalThis.document;

beforeEach(() => {
  globalThis.document = {
    createElement: vi.fn((tag) => {
      if (tag === 'canvas') return makeCanvasMock();
      if (tag === 'a') return { download: '', href: '', click: vi.fn() };
      return {};
    }),
  };
});

afterEach(() => {
  if (origDocument) {
    globalThis.document = origDocument;
  } else {
    delete globalThis.document;
  }
});

describe('CertificateService', () => {
  let svc;

  beforeEach(() => {
    svc = new CertificateService();
  });

  it('generateCertificate returns a canvas element', () => {
    const canvas = svc.generateCertificate('python', 'Ada Lovelace', {
      itemsCount: 120,
      levelsCount: 10,
      smartScore: 85,
      accuracy: 92,
    });
    expect(canvas).toBeDefined();
    expect(typeof canvas.getContext).toBe('function');
  });

  it('canvas dimensions are 1200x800', () => {
    const canvas = svc.generateCertificate('linux', 'Linus Torvalds', {
      itemsCount: 200,
      levelsCount: 24,
      smartScore: 99,
      accuracy: 97,
    });
    expect(canvas.width).toBe(1200);
    expect(canvas.height).toBe(800);
  });

  it('downloadCertificate does not throw', () => {
    expect(() => {
      svc.downloadCertificate('rust', 'User', {
        itemsCount: 50,
        levelsCount: 5,
        smartScore: 70,
        accuracy: 80,
      });
    }).not.toThrow();

    const calls = document.createElement.mock.calls;
    const aCall = calls.find(([tag]) => tag === 'a');
    expect(aCall).toBeDefined();
  });

  it('maps topic display names correctly for known IDs', () => {
    const cases = {
      cybersecurity: 'Cybersecurity',
      python: 'Python',
      cpp: 'C++',
      'docker-k8s': 'Docker & Kubernetes',
      'git-vcs': 'Git & Version Control',
      'c-programming': 'C Programming',
      'ai-engineering': 'AI Engineering',
    };

    for (const [id, expected] of Object.entries(cases)) {
      expect(svc.getTopicName(id)).toBe(expected);
    }
  });

  it('verification hash is deterministic', () => {
    const input = 'pythonAda2026-01-01';
    const h1 = svc._hash(input);
    const h2 = svc._hash(input);
    expect(h1).toBe(h2);
    expect(typeof h1).toBe('string');
    expect(h1).toMatch(/^[0-9a-f]{8}$/);
  });

  it('handles missing userName gracefully', () => {
    const canvas = svc.generateCertificate('networking', undefined, {
      itemsCount: 10,
      levelsCount: 1,
      smartScore: 30,
      accuracy: 60,
    });
    expect(canvas).toBeDefined();
    expect(typeof canvas.getContext).toBe('function');
  });
});
