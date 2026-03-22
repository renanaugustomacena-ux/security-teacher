/**
 * ACHIEVEMENT DEFINITIONS - Knowledge AIO
 * ========================================
 *
 * Badge definitions for the achievement system.
 * Each badge has conditions evaluated against progress data.
 */

export const achievementDefinitions = [
  // ─── LEARNING ────────────────────────────────
  {
    id: 'first_step',
    title: 'First Step',
    titleIt: 'Primo Passo',
    description: 'Complete your first lesson',
    descriptionIt: 'Completa la tua prima lezione',
    icon: '\ud83d\udc63',
    category: 'learning',
    condition: (d) => (d.lessonsCompleted || 0) >= 1,
    secret: false,
  },
  {
    id: 'word_collector',
    title: 'Word Collector',
    titleIt: 'Collezionista',
    description: 'Learn 50 words',
    descriptionIt: 'Impara 50 parole',
    icon: '\ud83d\udcda',
    category: 'learning',
    condition: (d) => (d.wordsLearned || 0) >= 50,
    secret: false,
  },
  {
    id: 'vocabulary_master',
    title: 'Vocabulary Master',
    titleIt: 'Maestro del Vocabolario',
    description: 'Learn 200 words',
    descriptionIt: 'Impara 200 parole',
    icon: '\ud83c\udfa9',
    category: 'learning',
    condition: (d) => (d.wordsLearned || 0) >= 200,
    secret: false,
  },
  {
    id: 'polyglot',
    title: 'Polyglot',
    titleIt: 'Poliglotta',
    description: 'Learn 500 words',
    descriptionIt: 'Impara 500 parole',
    icon: '\ud83c\udf0d',
    category: 'learning',
    condition: (d) => (d.wordsLearned || 0) >= 500,
    secret: false,
  },

  // ─── STREAK ──────────────────────────────────
  {
    id: 'streak_starter',
    title: 'Streak Starter',
    titleIt: 'Inizio Serie',
    description: '3-day study streak',
    descriptionIt: 'Serie di studio di 3 giorni',
    icon: '\ud83d\udd25',
    category: 'streak',
    condition: (d) => (d.streak?.current || 0) >= 3,
    secret: false,
  },
  {
    id: 'on_fire',
    title: 'On Fire',
    titleIt: 'In Fiamme',
    description: '10-day study streak',
    descriptionIt: 'Serie di studio di 10 giorni',
    icon: '\u2604\ufe0f',
    category: 'streak',
    condition: (d) => (d.streak?.current || 0) >= 10,
    secret: false,
  },
  {
    id: 'unstoppable',
    title: 'Unstoppable',
    titleIt: 'Inarrestabile',
    description: '30-day study streak',
    descriptionIt: 'Serie di studio di 30 giorni',
    icon: '\u26a1',
    category: 'streak',
    condition: (d) => (d.streak?.current || 0) >= 30,
    secret: false,
  },
  {
    id: 'legend',
    title: 'Legend',
    titleIt: 'Leggenda',
    description: '100-day study streak',
    descriptionIt: 'Serie di studio di 100 giorni',
    icon: '\ud83d\udc51',
    category: 'streak',
    condition: (d) => (d.streak?.current || 0) >= 100,
    secret: false,
  },

  // ─── MUSIC ───────────────────────────────────
  {
    id: 'music_lover',
    title: 'Music Lover',
    titleIt: 'Amante della Musica',
    description: 'Complete 1 song',
    descriptionIt: 'Completa 1 canzone',
    icon: '\ud83c\udfa5',
    category: 'music',
    condition: (d) => (d.songsCompleted || 0) >= 1,
    secret: false,
  },
  {
    id: 'music_master',
    title: 'Music Master',
    titleIt: 'Maestro della Musica',
    description: 'Complete 5 songs',
    descriptionIt: 'Completa 5 canzoni',
    icon: '\ud83c\udfb6',
    category: 'music',
    condition: (d) => (d.songsCompleted || 0) >= 5,
    secret: false,
  },
  {
    id: 'dj',
    title: 'DJ',
    titleIt: 'DJ',
    description: 'Complete 10 songs',
    descriptionIt: 'Completa 10 canzoni',
    icon: '\ud83c\udfa7',
    category: 'music',
    condition: (d) => (d.songsCompleted || 0) >= 10,
    secret: false,
  },

  // ─── PRACTICE ────────────────────────────────
  {
    id: 'quiz_whiz',
    title: 'Quiz Whiz',
    titleIt: 'Mago dei Quiz',
    description: 'Complete 10 practice sessions',
    descriptionIt: 'Completa 10 sessioni di pratica',
    icon: '\ud83e\udde0',
    category: 'practice',
    condition: (d) => (d.practiceSessionsCompleted || 0) >= 10,
    secret: false,
  },
  {
    id: 'practice_champion',
    title: 'Practice Champion',
    titleIt: 'Campione della Pratica',
    description: 'Complete 50 practice sessions',
    descriptionIt: 'Completa 50 sessioni di pratica',
    icon: '\ud83c\udfc6',
    category: 'practice',
    condition: (d) => (d.practiceSessionsCompleted || 0) >= 50,
    secret: false,
  },
  {
    id: 'perfect_score',
    title: 'Perfect Score',
    titleIt: 'Punteggio Perfetto',
    description: 'Get 100% on a practice (10/10)',
    descriptionIt: 'Ottieni il 100% in una pratica (10/10)',
    icon: '\ud83c\udfaf',
    category: 'practice',
    condition: (d) => d.perfectScoreAchieved === true,
    secret: false,
  },

  // ─── SPECIAL (TOPICS) ───────────────────────
  {
    id: 'cyber_warrior',
    title: 'Cyber Warrior',
    titleIt: 'Guerriero Cyber',
    description: 'Complete 5 cybersecurity lessons',
    descriptionIt: 'Completa 5 lezioni di cybersecurity',
    icon: '\ud83d\udee1\ufe0f',
    category: 'special',
    condition: (d) => {
      const tp = d.topicProgress?.cybersecurity;
      if (!tp) return false;
      return Object.keys(tp.completedLessons || {}).length >= 5;
    },
    secret: false,
  },
  {
    id: 'python_tamer',
    title: 'Python Tamer',
    titleIt: 'Domatore di Python',
    description: 'Complete 5 Python lessons',
    descriptionIt: 'Completa 5 lezioni di Python',
    icon: '\ud83d\udc0d',
    category: 'special',
    condition: (d) => {
      const tp = d.topicProgress?.python;
      if (!tp) return false;
      return Object.keys(tp.completedLessons || {}).length >= 5;
    },
    secret: false,
  },
  {
    id: 'linux_guru',
    title: 'Linux Guru',
    titleIt: 'Linux Guru',
    description: 'Complete 5 Linux lessons',
    descriptionIt: 'Completa 5 lezioni di Linux',
    icon: '\ud83d\udc27',
    category: 'special',
    condition: (d) => {
      const tp = d.topicProgress?.linux;
      if (!tp) return false;
      return Object.keys(tp.completedLessons || {}).length >= 5;
    },
    secret: false,
  },
  {
    id: 'code_master',
    title: 'Code Master',
    titleIt: 'Maestro del Codice',
    description: 'Complete 5 software dev lessons',
    descriptionIt: 'Completa 5 lezioni di sviluppo software',
    icon: '\ud83d\udcbb',
    category: 'special',
    condition: (d) => {
      const tp = d.topicProgress?.['software-dev'];
      if (!tp) return false;
      return Object.keys(tp.completedLessons || {}).length >= 5;
    },
    secret: false,
  },

  // ─── TOPIC MASTERY & BOSS ───────────────────
  {
    id: 'topic_master',
    title: 'Topic Master',
    titleIt: 'Maestro dei Topic',
    description: 'Earn 3 stars on all lessons in a topic',
    descriptionIt: 'Ottieni 3 stelle in tutte le lezioni di un topic',
    icon: '\ud83c\udf93',
    category: 'learning',
    condition: (d) => {
      const tp = d.topicProgress;
      if (!tp) return false;
      for (const id of Object.keys(tp)) {
        const stars = tp[id].lessonStars;
        if (!stars) continue;
        const values = Object.values(stars);
        if (values.length >= 4 && values.every((v) => v === 3)) return true;
      }
      return false;
    },
    secret: false,
  },
  {
    id: 'boss_slayer',
    title: 'Boss Slayer',
    titleIt: 'Uccisore di Boss',
    description: 'Defeat 5 boss challenges',
    descriptionIt: 'Sconfiggi 5 sfide boss',
    icon: '\ud83d\udc51',
    category: 'practice',
    condition: (d) => {
      const tp = d.topicProgress;
      if (!tp) return false;
      let count = 0;
      for (const id of Object.keys(tp)) {
        const results = tp[id].bossResults;
        if (!results) continue;
        for (const lvl of Object.keys(results)) {
          if (results[lvl].completed === true) count++;
        }
      }
      return count >= 5;
    },
    secret: false,
  },
  {
    id: 'terminal_wizard',
    title: 'Terminal Wizard',
    titleIt: 'Mago del Terminale',
    description: 'Complete 10 terminal exercises',
    descriptionIt: 'Completa 10 esercizi terminale',
    icon: '\ud83d\udda5\ufe0f',
    category: 'practice',
    condition: (d) => (d.terminalExercisesCompleted || 0) >= 10,
    secret: false,
  },
  {
    id: 'chain_master',
    title: 'Chain Master',
    titleIt: 'Maestro della Catena',
    description: 'Achieve a chain streak of 5',
    descriptionIt: 'Raggiungi una serie a catena di 5',
    icon: '\u26d3\ufe0f',
    category: 'practice',
    condition: (d) => (d.bestChainStreak || 0) >= 5,
    secret: false,
  },

  // ─── SECRET ──────────────────────────────────
  {
    id: 'night_owl',
    title: 'Night Owl',
    titleIt: 'Gufo Notturno',
    description: 'Study after 11 PM',
    descriptionIt: 'Studia dopo le 23:00',
    icon: '\ud83e\udd89',
    category: 'special',
    condition: (d) => d._nightOwlTriggered === true,
    secret: true,
  },
  {
    id: 'early_bird',
    title: 'Early Bird',
    titleIt: 'Mattiniero',
    description: 'Study before 7 AM',
    descriptionIt: 'Studia prima delle 7:00',
    icon: '\ud83d\udc26',
    category: 'special',
    condition: (d) => d._earlyBirdTriggered === true,
    secret: true,
  },

  {
    id: 'perfect_boss',
    title: 'Perfect Boss',
    titleIt: 'Boss Perfetto',
    description: 'Score 100% on a boss challenge',
    descriptionIt: 'Ottieni il 100% in una sfida boss',
    icon: '\ud83d\udc8e',
    category: 'special',
    condition: (d) => {
      const tp = d.topicProgress;
      if (!tp) return false;
      for (const id of Object.keys(tp)) {
        const results = tp[id].bossResults;
        if (!results) continue;
        for (const lvl of Object.keys(results)) {
          if (results[lvl].score >= 100) return true;
        }
      }
      return false;
    },
    secret: true,
  },

  // ─── XP ──────────────────────────────────────
  {
    id: 'xp_hunter',
    title: 'XP Hunter',
    titleIt: 'Cacciatore di XP',
    description: 'Earn 1,000 total XP',
    descriptionIt: 'Guadagna 1.000 XP totali',
    icon: '\u2b50',
    category: 'learning',
    condition: (d) => (d.xp?.total || 0) >= 1000,
    secret: false,
  },
  {
    id: 'xp_legend',
    title: 'XP Legend',
    titleIt: 'Leggenda XP',
    description: 'Earn 10,000 total XP',
    descriptionIt: 'Guadagna 10.000 XP totali',
    icon: '\ud83c\udf1f',
    category: 'learning',
    condition: (d) => (d.xp?.total || 0) >= 10000,
    secret: false,
  },

  // ─── TIME ────────────────────────────────────
  {
    id: 'dedicated',
    title: 'Dedicated',
    titleIt: 'Dedicato',
    description: 'Study for 60 total minutes',
    descriptionIt: 'Studia per 60 minuti totali',
    icon: '\u23f0',
    category: 'streak',
    condition: (d) => (d.totalTimeMinutes || 0) >= 60,
    secret: false,
  },
  {
    id: 'scholar',
    title: 'Scholar',
    titleIt: 'Studioso',
    description: 'Study for 300 total minutes',
    descriptionIt: 'Studia per 300 minuti totali',
    icon: '\ud83c\udf93',
    category: 'streak',
    condition: (d) => (d.totalTimeMinutes || 0) >= 300,
    secret: false,
  },
];
