import React from 'react';
import { ActivityList } from '@knowledge-aio/ds';

export const Recent = () => (
  <ActivityList
    title="Attività recente / Recent activity"
    items={[
      {
        icon: <span>🎧</span>,
        text: 'Karaoke completato / Karaoke finished — "Bohemian Rhapsody"',
      },
      { icon: <span>✓</span>, text: 'Lezione superata / Lesson passed — Phrasal Verbs, livello 3' },
      { icon: <span>🔥</span>, text: 'Serie estesa a 7 giorni / Streak extended to 7 days' },
      { icon: <span>📚</span>, text: '24 nuovi vocaboli appresi / 24 new words learned' },
    ]}
  />
);

export const SingleEntry = () => (
  <ActivityList
    title="Oggi / Today"
    items={[{ icon: <span>⚡</span>, text: 'Sessione perfetta / Perfect run — 20 su 20' }]}
  />
);

export const Empty = () => <ActivityList title="Attività recente / Recent activity" items={[]} />;

export const TechnicalTopics = () => (
  <ActivityList
    title="Argomenti tecnici / Technical topics"
    items={[
      { icon: <span>🛡️</span>, text: 'Ethical Hacking — modulo 2 completato / module 2 complete' },
      { icon: <span>🔐</span>, text: 'DevSecOps — 12 termini rivisti / 12 terms reviewed' },
      {
        icon: <span>🤖</span>,
        text: 'AI Engineering — nuovo livello sbloccato / new level unlocked',
      },
    ]}
  />
);
