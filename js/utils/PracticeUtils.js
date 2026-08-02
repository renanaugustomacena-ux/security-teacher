export const FEEDBACK_DWELL = {
  correct: 400,
  incorrect: 2200,
  partial: 1800,
  nearMiss: 1800,
};

export const ENCOURAGING_CORRECT = [
  'Perfetto! / Perfect!',
  'Ottimo! / Great!',
  'Bravo/Brava!',
  'Esatto! / Exactly!',
  'Fantastico! / Fantastic!',
  'Ci sei! / You got it!',
  'Bravissimo/a!',
];

export const ENCOURAGING_INCORRECT = [
  'Quasi! / Almost!',
  'Ci sei vicino! / So close!',
  'Riprova! / Try again!',
  'Non mollare! / Keep going!',
  'Stai imparando! / You are learning!',
];

export const XP_BASE = 10;
export const TIME_THRESHOLDS = [
  { maxSeconds: 5, multiplier: 2.0 },
  { maxSeconds: 10, multiplier: 1.5 },
  { maxSeconds: 20, multiplier: 1.0 },
];
export const TIME_DEFAULT_MULTIPLIER = 0.7;
export const STREAK_BONUSES = [
  { minStreak: 10, multiplier: 2.0 },
  { minStreak: 5, multiplier: 1.5 },
  { minStreak: 3, multiplier: 1.2 },
];

export const ENGLISH_FUNCTION_WORDS = new Set([
  'the',
  'a',
  'an',
  'is',
  'am',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'to',
  'of',
  'in',
  'on',
  'at',
  'for',
  'with',
  'by',
  'from',
  'and',
  'or',
  'but',
  'not',
  'it',
  'its',
  'he',
  'she',
  'we',
  'they',
  'i',
  'you',
  'my',
  'your',
  'his',
  'her',
  'our',
  'their',
  'this',
  'that',
  'these',
  'those',
  'do',
  'does',
  'did',
  'has',
  'have',
  'had',
  'will',
  'would',
  'can',
  'could',
  'should',
]);

export const ITALIAN_FUNCTION_WORDS = new Set([
  'il',
  'lo',
  'la',
  'i',
  'gli',
  'le',
  'un',
  'uno',
  'una',
  'di',
  'a',
  'da',
  'in',
  'con',
  'su',
  'per',
  'tra',
  'fra',
  'e',
  'o',
  'ma',
  'che',
  'se',
  'non',
  'anche',
  'del',
  'dello',
  'della',
  'dei',
  'degli',
  'delle',
  'al',
  'allo',
  'alla',
  'ai',
  'agli',
  'alle',
  'dal',
  'dallo',
  'dalla',
  'dai',
  'dagli',
  'dalle',
  'nel',
  'nello',
  'nella',
  'nei',
  'negli',
  'nelle',
  'sul',
  'sullo',
  'sulla',
  'sui',
  'sugli',
  'sulle',
]);

/** Case- and accent-insensitive form used for all leak detection below. */
function foldForMatch(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

/** Substring match, ignoring case and accents. */
export function containsFolded(haystack, needle) {
  const h = foldForMatch(haystack);
  const n = foldForMatch(needle);
  if (!h || !n) return false;
  return h.includes(n);
}

/** Whole-word match, ignoring case and accents. */
export function containsWholeWord(haystack, needle) {
  const h = foldForMatch(haystack);
  const n = foldForMatch(needle);
  if (!h || !n) return false;
  const escaped = n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(h);
  } catch (_e) {
    return h.includes(n);
  }
}

/**
 * Drop a parenthetical that merely repeats the prompt term.
 *
 * The corpus convention appends the untranslated English term to the Italian
 * gloss — "Contenitore di dati (Dataset)". In a recognition question that
 * prints the prompt word inside its own correct option, so the answer is free
 * (§26.3). Measured over the 15,696-item corpus: 20.8% of items leak this way
 * and stripping the redundant parenthetical clears 87.4% of them without
 * removing a single item from the pool.
 *
 * Applied at pool-build time so the correct answer AND every distractor are
 * cleaned identically — a lone stripped option would be its own shape tell.
 */
export function stripRedundantGloss(value, term) {
  if (!value || !term) return value;
  const target = foldForMatch(term);
  const stripped = String(value)
    .replace(/\s*\(([^)]*)\)/g, (match, inner) => (foldForMatch(inner) === target ? '' : match))
    .replace(/\s{2,}/g, ' ')
    .trim();
  return stripped.length > 0 ? stripped : String(value);
}

/**
 * Replace the first whole-word occurrence of `term` with a blank.
 * Naive substring replacement blanked inside longer words ("_____s" for
 * "Packet") and silently rendered no blank at all when the term was absent —
 * 15.0% and 4.1% of scenario-eligible items respectively.
 */
export function blankTermInPhrase(phrase, term, placeholder = '_____') {
  const source = String(phrase ?? '');
  if (!source || !term) return source;
  const escaped = String(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    return source.replace(new RegExp(`\\b${escaped}\\b`, 'i'), placeholder);
  } catch (_e) {
    return source;
  }
}

export function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function isContentWord(word) {
  const cleaned = word.toLowerCase().replace(/[.,?!;:'"()]/g, '');
  if (cleaned.length <= 1) return false;
  return !ENGLISH_FUNCTION_WORDS.has(cleaned) && !ITALIAN_FUNCTION_WORDS.has(cleaned);
}

export function pickBestBlankIndex(words, targetWord) {
  if (targetWord) {
    const targetLower = targetWord.toLowerCase();
    const targetIdx = words.findIndex(
      (w) => w.toLowerCase().replace(/[.,?!;:'"()]/g, '') === targetLower
    );
    if (targetIdx !== -1) return targetIdx;
  }

  const candidates = words
    .map((w, i) => ({ word: w, index: i }))
    .filter((c) => isContentWord(c.word))
    .sort((a, b) => b.word.length - a.word.length);

  if (candidates.length > 0) {
    const topN = candidates.slice(0, Math.min(3, candidates.length));
    return topN[Math.floor(Math.random() * topN.length)].index;
  }

  const nonTrivial = words.map((w, i) => ({ word: w, index: i })).filter((c) => c.word.length > 2);

  if (nonTrivial.length > 0) {
    return nonTrivial[Math.floor(Math.random() * nonTrivial.length)].index;
  }

  return Math.floor(Math.random() * words.length);
}

export function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[.,?!;:'"()]/g, '')
    .trim();
}

export function normalizeWithAccents(str) {
  return str
    .toLowerCase()
    .replace(/[.,?!;:'"()]/g, '')
    .replace(/[àáâã]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõ]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .trim();
}

export function calculateXP(responseSeconds, consecutiveCorrect) {
  let timeMult = TIME_DEFAULT_MULTIPLIER;
  for (const t of TIME_THRESHOLDS) {
    if (responseSeconds <= t.maxSeconds) {
      timeMult = t.multiplier;
      break;
    }
  }

  let streakMult = 1.0;
  for (const s of STREAK_BONUSES) {
    if (consecutiveCorrect >= s.minStreak) {
      streakMult = s.multiplier;
      break;
    }
  }

  return Math.round(XP_BASE * timeMult * streakMult);
}

export function formatContextLabel(contextKey) {
  return contextKey.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
