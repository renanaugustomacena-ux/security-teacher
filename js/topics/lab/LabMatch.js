/**
 * LAB MATCH - Knowledge AIO
 * =========================
 *
 * Pure command-matching + state-evaluation helpers for the scripted terminal
 * lab (LabEngine). No DOM, no side effects — trivially unit-testable.
 *
 * Validation is GOAL-BY-STATE, not exact-string: a step is satisfied when the
 * user's input matches ANY accepted form (normalized, flag-sorted, aliased, or
 * a declared regex source string), and a lab is complete when the accumulated
 * `state` satisfies the script's `requires` predicate. This means any command
 * that reaches the goal is accepted, and one wrong command never aborts the run.
 *
 * Doctrine §3.10: `new RegExp(...)` is permitted (only eval / new Function /
 * document.write / string-form setTimeout|setInterval are forbidden).
 */

import { COMMAND_ALIASES } from '../TopicPracticeConstants.js';

/** Lowercase, collapse internal whitespace, trim. */
export function normalizeCmd(str) {
  return String(str == null ? '' : str)
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Sort the letters inside each `-flags` cluster so `-la` === `-al`. */
export function sortFlags(cmd) {
  return cmd.replace(/-([a-zA-Z]+)/g, (_match, flags) => `-${flags.split('').sort().join('')}`);
}

function equivalent(a, b) {
  return a === b || sortFlags(a) === sortFlags(b);
}

/**
 * Test a single accepted string against the (already normalized) user input,
 * expanding the shared COMMAND_ALIASES table so `ls -la` matches `ls -al`, etc.
 */
function acceptMatches(userNorm, acceptForm) {
  const norm = normalizeCmd(acceptForm);
  if (equivalent(userNorm, norm)) return true;
  const aliases = COMMAND_ALIASES[norm] || [];
  for (const alias of aliases) {
    if (equivalent(userNorm, normalizeCmd(alias))) return true;
  }
  return false;
}

/**
 * Evaluate a user command against one lab step.
 *
 * @param {object} step  - { accept?: string[], acceptRe?: string[], setState?: object }
 * @param {string} raw   - raw user input
 * @param {object} [state] - accumulated lab state
 * @returns {{ ok: boolean, state: object }} ok + the (possibly patched) state
 */
export function matchStep(step, raw, state = {}) {
  const userNorm = normalizeCmd(raw);
  if (!userNorm) return { ok: false, state };

  const accepts = Array.isArray(step?.accept) ? step.accept : [];
  for (const form of accepts) {
    if (acceptMatches(userNorm, form)) {
      return { ok: true, state: { ...state, ...(step.setState || {}) } };
    }
  }

  const patterns = Array.isArray(step?.acceptRe) ? step.acceptRe : [];
  const rawTrim = String(raw == null ? '' : raw).trim();
  for (const src of patterns) {
    let re;
    try {
      re = new RegExp(src, 'i');
    } catch {
      continue;
    }
    if (re.test(rawTrim) || re.test(userNorm)) {
      return { ok: true, state: { ...state, ...(step.setState || {}) } };
    }
  }

  return { ok: false, state };
}

/**
 * A lab is successful when the accumulated state satisfies every key/value in
 * `script.requires`. A lab with no `requires` succeeds by completing its steps
 * (this returns true so the engine's step-exhaustion check is the sole gate).
 *
 * @param {object} script - { requires?: object }
 * @param {object} [state]
 * @returns {boolean}
 */
export function isSuccess(script, state = {}) {
  const requires = script && script.requires;
  if (!requires || typeof requires !== 'object') return true;
  return Object.entries(requires).every(([key, value]) => state[key] === value);
}
