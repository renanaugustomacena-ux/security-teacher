import React from 'react';
import { BadgeCard } from '@knowledge-aio/ds';

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '1.5rem',
};

export const Unlocked = () => (
  <div style={grid}>
    <BadgeCard
      state="unlocked"
      icon={<span>🔥</span>}
      title="Seven-Day Streak"
      titleIt="Serie di sette giorni"
      description="Studied every day for a full week."
      descriptionIt="Hai studiato ogni giorno per una settimana intera."
      date="12.08.2026"
    />
    <BadgeCard
      state="unlocked"
      icon={<span>🎧</span>}
      title="First Lyric"
      titleIt="Primo testo"
      description="Completed your first karaoke session."
      descriptionIt="Hai completato la tua prima sessione di karaoke."
      date="02.07.2026"
    />
  </div>
);

export const Locked = () => (
  <div style={grid}>
    <BadgeCard
      state="locked"
      icon={<span>🛡️</span>}
      title="Security Specialist"
      titleIt="Specialista della sicurezza"
      description="Finish every lesson in the ethical hacking topic."
      descriptionIt="Completa ogni lezione dell'argomento ethical hacking."
    />
    <BadgeCard
      state="secret"
      icon={<span>❔</span>}
      title="Hidden Achievement"
      titleIt="Traguardo nascosto"
      description="Keep studying to reveal this one."
      descriptionIt="Continua a studiare per rivelarlo."
    />
  </div>
);

export const Gallery = () => (
  <div style={grid}>
    <BadgeCard
      state="unlocked"
      icon={<span>📚</span>}
      title="Thousand Words"
      titleIt="Mille parole"
      description="Learned 1,000 vocabulary items."
      descriptionIt="Hai imparato 1.000 vocaboli."
      date="28.07.2026"
    />
    <BadgeCard
      state="unlocked"
      icon={<span>⚡</span>}
      title="Perfect Run"
      titleIt="Serie perfetta"
      description="Finished a practice set with no mistakes."
      descriptionIt="Hai completato una sessione senza errori."
      date="09.08.2026"
    />
    <BadgeCard
      state="locked"
      icon={<span>🌙</span>}
      title="Night Owl"
      titleIt="Nottambulo"
      description="Study after midnight ten times."
      descriptionIt="Studia dopo mezzanotte dieci volte."
    />
  </div>
);
