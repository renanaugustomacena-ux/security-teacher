import { describe, it, expect } from 'vitest';
import { HintService } from '../js/services/HintService.js';

describe('HintService', () => {
  const svc = new HintService();

  it('generates 3 hints for listening mode', () => {
    const question = {
      italian: 'crittografia',
      context: 'cryptography',
      item: { italian: 'crittografia' },
    };
    const hints = svc.generateHints(question, 'listening');
    expect(hints.length).toBe(3);
    expect(hints[0]).toContain('cryptography');
  });

  it('generates 3 hints for writing mode', () => {
    const question = {
      italian: 'variabile',
      english: 'variable',
      item: { italian: 'variabile', english: 'variable' },
    };
    const hints = svc.generateHints(question, 'writing');
    expect(hints.length).toBe(3);
    expect(hints[1]).toContain('var');
  });

  it('generates 3 hints for command mode', () => {
    const question = {
      expectedCommand: 'chmod 755 file.sh',
      item: { command: 'chmod 755 file.sh' },
    };
    const hints = svc.generateHints(question, 'command');
    expect(hints.length).toBe(3);
    expect(hints[0]).toContain('chmod');
  });

  it('generates 3 hints for default/unknown mode', () => {
    const question = { italian: 'test', context: 'general', item: { italian: 'test' } };
    const hints = svc.generateHints(question, 'fillblank');
    expect(hints.length).toBe(3);
  });

  it('getXPMultiplier returns correct values', () => {
    expect(svc.getXPMultiplier(0)).toBe(1.0);
    expect(svc.getXPMultiplier(1)).toBe(0.8);
    expect(svc.getXPMultiplier(2)).toBe(0.5);
    expect(svc.getXPMultiplier(3)).toBe(0.2);
  });

  it('getXPMultiplier returns 0.2 for out-of-range', () => {
    expect(svc.getXPMultiplier(5)).toBe(0.2);
  });
});
