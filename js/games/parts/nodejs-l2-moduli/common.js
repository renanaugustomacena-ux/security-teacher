/**
 * La discesa, il magazzino, la soglia — what the three mechanics share:
 * the glass size, the SDK wiring (grade, clear, persist, speak, coach) and
 * two text helpers. No drawing, no mechanic.
 */

import { ttsService } from '../../../services/TTSService.js';
import { labelOf, meaningOf } from '../../LevelBeats.js';

export const W = 420;
export const H = 910;
export const MODE = 'moduli';

export function shuffle(input) {
  const a = input.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

/**
 * Which chapter this beat belongs to: the engine installs the chapter's beat
 * table before it calls reset, so the installed table is the truth; the
 * state is the fallback for a host that never installed one.
 */
export function installedChapter(host) {
  const i = host.CH ? host.CH.findIndex((c) => c.beats === host.BEATS) : -1;
  return i >= 0 ? i : host.state.chapter || 0;
}

export function persist(host) {
  host.session.save({ beat: host.state.beat, chapter: host.chapter });
}

/* ricerca/35 §35.3.1: a term served is a term heard. */
export function say(host, text) {
  if (host.state.muted || !text) return;
  ttsService.speak(text, 'en-GB');
}

/**
 * The graded response: the learner's real pick against the term the world
 * asked for, through the SDK and never a local `===` (§46.1, §46.2). The
 * cue is `silent`: the game answers diegetically.
 */
export function grade(host, target, picked, aided) {
  const verdict = target.attempt(labelOf(picked), {
    expected: labelOf(target),
    mode: MODE,
    hintsUsed: aided ? 1 : 0,
    silent: true,
  });
  host.session.mark();
  return Boolean(verdict.correct);
}

export function openCoach(host, kind, picked, wanted) {
  host.coachKind = kind;
  host.setState({
    coach: {
      kind,
      pick: picked ? labelOf(picked) : '',
      word: labelOf(wanted),
      it: meaningOf(wanted, 'it'),
    },
  });
}

/** The beat is won: every term answered right is cleared, the chrome told. */
export function win(host) {
  for (const t of host.terms) if (t.correct > 0) t.clear();
  host.finished = true;
  persist(host);
  host.setState({ done: true });
}

/** Word-wrap `text` into at most `maxL` lines of `maxW` px, ellipsis on the last. */
export function wrapLines(x, text, maxW, maxL) {
  const words = String(text).split(' ');
  const out = [];
  let line = '';
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (x.measureText(t).width > maxW && line) {
      out.push(line);
      line = w;
    } else {
      line = t;
    }
  }
  if (line) out.push(line);
  if (out.length > maxL) {
    out.length = maxL;
    let l = out[maxL - 1];
    while (x.measureText(`${l}…`).width > maxW && l.length > 1) l = l.slice(0, -1);
    out[maxL - 1] = `${l}…`;
  }
  return out;
}

/** The largest size between `max` and `min` at which `text` fits `maxW`. */
export function fitFont(x, text, maxW, max, min, face) {
  let f = max;
  x.font = face(f);
  while (x.measureText(text).width > maxW && f > min) {
    f--;
    x.font = face(f);
  }
  return f;
}
