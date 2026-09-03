import { describe, it, expect, beforeAll } from 'vitest';
import { readdirSync } from 'node:fs';
import { matchStep, isSuccess } from '../js/topics/lab/LabMatch.js';

// Lab scripts are hand-authored per topic and drive LabEngine. Every failure
// mode here is INVISIBLE at build time and brutal at runtime:
//   - a mistyped lesson id  -> the lab silently never loads
//   - an unreachable `requires` key -> the learner can never finish the lab
//   - an accept[0] the matcher rejects -> the intended answer is "wrong"
// so the whole corpus is validated structurally instead of trusted.

const LABS_DIR = 'js/topics/data/labs';
const labFiles = readdirSync(LABS_DIR).filter((f) => f.endsWith('-labs.js'));

const bundles = [];

beforeAll(async () => {
  for (const file of labFiles) {
    const topicId = file.replace('-labs.js', '');
    // Both the directory AND the extension must be literal, or the bundler
    // cannot resolve the glob and warns on every run.
    const labs = (await import(`../js/topics/data/labs/${topicId}-labs.js`)).default;
    let lessonIds = new Set();
    try {
      const topic = (await import(`../js/topics/data/${topicId}.js`)).default;
      lessonIds = new Set(
        Object.values(topic.levels).flatMap((l) => (l.lessons || []).map((s) => s.id))
      );
    } catch {
      // Topic data missing is reported by its own assertion below.
    }
    bundles.push({ topicId, file, labs, lessonIds });
  }
});

describe('lab script bundles', () => {
  it('at least one topic ships labs', () => {
    expect(labFiles.length).toBeGreaterThan(0);
  });

  it('every bundle key is a REAL lesson id for its topic', () => {
    // A typo here means the lab never loads and nobody ever finds out.
    for (const { topicId, labs, lessonIds } of bundles) {
      expect(lessonIds.size, `no topic data found for ${topicId}`).toBeGreaterThan(0);
      for (const key of Object.keys(labs)) {
        expect(lessonIds.has(key), `${topicId}: "${key}" is not a lesson id in that topic`).toBe(
          true
        );
      }
    }
  });

  it('every lab is completable — each `requires` key is set by some step', () => {
    for (const { topicId, labs } of bundles) {
      for (const [lessonId, lab] of Object.entries(labs)) {
        const produced = new Set();
        for (const step of lab.steps || []) {
          for (const k of Object.keys(step.setState || {})) produced.add(k);
        }
        for (const key of Object.keys(lab.requires || {})) {
          expect(
            produced.has(key),
            `${topicId}/${lessonId}: requires "${key}" but no step ever sets it — the lab can never end`
          ).toBe(true);
        }
      }
    }
  });

  it('walking every step with its own first accepted command completes the lab', () => {
    // The end-to-end guarantee: the intended solution path actually works.
    for (const { topicId, labs } of bundles) {
      for (const [lessonId, lab] of Object.entries(labs)) {
        let state = {};
        for (const step of lab.steps || []) {
          const intended = (step.accept || [])[0];
          expect(intended, `${topicId}/${lessonId}/${step.id}: no accept[0]`).toBeTruthy();
          const res = matchStep(step, intended, state);
          expect(
            res && res.ok,
            `${topicId}/${lessonId}/${step.id}: its OWN accept[0] ("${intended}") is rejected by the matcher`
          ).toBe(true);
          state = { ...state, ...(step.setState || {}) };
        }
        expect(
          isSuccess(lab, state),
          `${topicId}/${lessonId}: walking every step still does not satisfy requires`
        ).toBe(true);
      }
    }
  });

  it('every acceptRe compiles and is not a catch-all', () => {
    for (const { topicId, labs } of bundles) {
      for (const [lessonId, lab] of Object.entries(labs)) {
        for (const step of lab.steps || []) {
          for (const src of step.acceptRe || []) {
            expect(typeof src, `${topicId}/${lessonId}/${step.id}: acceptRe must be a string`).toBe(
              'string'
            );
            expect(() => new RegExp(src)).not.toThrow();
            // A bare .* would let a learner clear the step with nonsense.
            expect(
              /^\.?\*?$/.test(src.trim()),
              `${topicId}/${lessonId}/${step.id}: acceptRe "${src}" matches anything`
            ).toBe(false);
          }
        }
      }
    }
  });

  it('every step teaches something: a prompt, realistic stdout, and escalating hints', () => {
    for (const { topicId, labs } of bundles) {
      for (const [lessonId, lab] of Object.entries(labs)) {
        expect(lab.title, `${topicId}/${lessonId}: no title`).toBeTruthy();
        expect(lab.intro, `${topicId}/${lessonId}: no intro`).toBeTruthy();
        expect((lab.steps || []).length, `${topicId}/${lessonId}: no steps`).toBeGreaterThan(0);
        for (const step of lab.steps) {
          const where = `${topicId}/${lessonId}/${step.id}`;
          expect(step.id, `${where}: no id`).toBeTruthy();
          expect(step.promptEn, `${where}: no promptEn`).toBeTruthy();
          expect(String(step.stdout || '').length, `${where}: empty stdout`).toBeGreaterThan(0);
          if (step.hints) {
            expect(step.hints.length, `${where}: hints must escalate over 3 stages`).toBe(3);
            for (const h of step.hints) expect(String(h).trim().length).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  it('step ids are unique inside a lab', () => {
    for (const { topicId, labs } of bundles) {
      for (const [lessonId, lab] of Object.entries(labs)) {
        const ids = (lab.steps || []).map((s) => s.id);
        expect(new Set(ids).size, `${topicId}/${lessonId}: duplicate step ids`).toBe(ids.length);
      }
    }
  });

  it('no lab presents a casually destructive command', () => {
    const destructive = /rm\s+-rf\s+\/(?!\w)|DROP\s+DATABASE|mkfs|dd\s+if=.*of=\/dev\/[sh]d/i;
    for (const { topicId, labs } of bundles) {
      for (const [lessonId, lab] of Object.entries(labs)) {
        for (const step of lab.steps || []) {
          for (const cmd of step.accept || []) {
            expect(destructive.test(cmd), `${topicId}/${lessonId}/${step.id}: "${cmd}"`).toBe(
              false
            );
          }
        }
      }
    }
  });
});
