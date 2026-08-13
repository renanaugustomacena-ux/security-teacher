import React from 'react';
import { ModeCard } from '@knowledge-aio/ds';

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '1.5rem',
};

export const ModeGrid = () => (
  <div style={grid}>
    <ModeCard
      icon={<span>🗂️</span>}
      name="Flashcard / Flashcards"
      description="Ripasso rapido a scorrimento. / Quick swipe-through review."
    />
    <ModeCard
      icon={<span>❓</span>}
      name="Quiz / Quiz"
      description="Domande a scelta multipla a tempo. / Timed multiple-choice questions."
    />
    <ModeCard
      icon={<span>🎧</span>}
      name="Ascolto / Listening"
      description="Riconosci le parole nel brano audio. / Identify words in the audio track."
    />
    <ModeCard
      icon={<span>🗣️</span>}
      name="Pronuncia / Pronunciation"
      description="Registra e confronta la tua voce. / Record and compare your voice."
    />
    <ModeCard
      icon={<span>⚡</span>}
      name="Velocità / Speed"
      description="Rispondi il più in fretta possibile. / Answer as fast as you can."
    />
    <ModeCard
      icon={<span>👑</span>}
      name="Boss challenge / Boss challenge"
      description="Sfida finale del livello, nessun aiuto. / Final level challenge, no hints."
    />
  </div>
);

export const Disabled = () => (
  <div style={grid}>
    <ModeCard
      icon={<span>🗣️</span>}
      name="Pronuncia / Pronunciation"
      description="Registra e confronta la tua voce. / Record and compare your voice."
    />
    <ModeCard
      disabled
      icon={<span>👑</span>}
      name="Boss challenge / Boss challenge"
      description="Sblocca completando il livello 5. / Unlocks after finishing level 5."
    />
    <ModeCard
      disabled
      icon={<span>⚡</span>}
      name="Velocità / Speed"
      description="Richiede 500 parole imparate. / Requires 500 learned words."
    />
  </div>
);
