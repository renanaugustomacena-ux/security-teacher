import { describe, it, expect } from 'vitest';
import { normalizeCmd, sortFlags, matchStep, isSuccess } from '../js/topics/lab/LabMatch.js';

describe('LabMatch', () => {
  describe('normalizeCmd', () => {
    it('lowercases, collapses whitespace, and trims', () => {
      expect(normalizeCmd('  SUDO   ufw    Enable ')).toBe('sudo ufw enable');
    });

    it('handles nullish input', () => {
      expect(normalizeCmd(null)).toBe('');
      expect(normalizeCmd(undefined)).toBe('');
    });
  });

  describe('sortFlags', () => {
    it('makes -la and -al equivalent', () => {
      expect(sortFlags('ls -la')).toBe(sortFlags('ls -al'));
    });
  });

  describe('matchStep', () => {
    const step = {
      accept: ['sudo ufw enable'],
      setState: { firewall: 'enabled' },
    };

    it('accepts an exact normalized command and applies setState', () => {
      const res = matchStep(step, '  SUDO ufw   enable ', { ssh: 'allowed' });
      expect(res.ok).toBe(true);
      expect(res.state).toEqual({ ssh: 'allowed', firewall: 'enabled' });
    });

    it('does not mutate the input state on success', () => {
      const state = { ssh: 'allowed' };
      matchStep(step, 'sudo ufw enable', state);
      expect(state).toEqual({ ssh: 'allowed' });
    });

    it('accepts flag-order variants', () => {
      const flagStep = { accept: ['ls -la'], setState: { listed: true } };
      const res = matchStep(flagStep, 'ls -al', {});
      expect(res.ok).toBe(true);
      expect(res.state).toEqual({ listed: true });
    });

    it('accepts known command aliases', () => {
      const aliasStep = { accept: ['cd ~'], setState: { home: true } };
      expect(matchStep(aliasStep, 'cd', {}).ok).toBe(true);
    });

    it('accepts a declared regex source string', () => {
      const reStep = { acceptRe: ['^sudo\\s+ufw\\s+status\\b'], setState: { checked: true } };
      const res = matchStep(reStep, 'sudo ufw status verbose', {});
      expect(res.ok).toBe(true);
      expect(res.state.checked).toBe(true);
    });

    it('returns ok:false with unchanged state on a wrong command (no abort)', () => {
      const res = matchStep(step, 'ufw disable', { ssh: 'allowed' });
      expect(res.ok).toBe(false);
      expect(res.state).toEqual({ ssh: 'allowed' });
    });

    it('returns ok:false on empty input', () => {
      expect(matchStep(step, '   ', {}).ok).toBe(false);
    });

    it('ignores an invalid regex source instead of throwing', () => {
      const bad = { acceptRe: ['('], accept: ['ls'] };
      expect(matchStep(bad, 'ls', {}).ok).toBe(true);
      expect(matchStep(bad, 'pwd', {}).ok).toBe(false);
    });
  });

  describe('isSuccess', () => {
    it('is true when state satisfies every required key', () => {
      const script = { requires: { firewall: 'enabled', ssh: 'allowed' } };
      expect(isSuccess(script, { firewall: 'enabled', ssh: 'allowed', extra: 1 })).toBe(true);
    });

    it('is false when a required key is missing or mismatched', () => {
      const script = { requires: { firewall: 'enabled' } };
      expect(isSuccess(script, { firewall: 'checked' })).toBe(false);
      expect(isSuccess(script, {})).toBe(false);
    });

    it('is true when the script declares no requirements', () => {
      expect(isSuccess({}, {})).toBe(true);
      expect(isSuccess({ requires: null }, {})).toBe(true);
    });
  });
});
