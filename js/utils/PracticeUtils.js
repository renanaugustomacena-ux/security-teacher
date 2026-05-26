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

  const nonTrivial = words
    .map((w, i) => ({ word: w, index: i }))
    .filter((c) => c.word.length > 2);

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
