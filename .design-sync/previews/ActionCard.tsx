import React from 'react';
import { ActionCard, Button } from '@knowledge-aio/ds';

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '1.5rem',
};

export const HomeGrid = () => (
  <div style={grid}>
    <ActionCard
      icon={<span>📖</span>}
      title="Impara / Learn"
      description="Vocabolario in contesto. / Vocabulary in context."
    >
      <Button variant="primary">Continua / Continue</Button>
    </ActionCard>
    <ActionCard
      icon={<span>🎵</span>}
      title="Musica / Music"
      description="Canta e impara. / Sing and learn."
    >
      <Button variant="secondary">Ascolta / Listen</Button>
    </ActionCard>
    <ActionCard
      icon={<span>🎯</span>}
      title="Pratica / Practice"
      description="Flashcard e quiz a tempo. / Timed flashcards and quizzes."
    >
      <Button variant="secondary">Allenati / Train</Button>
    </ActionCard>
    <ActionCard
      icon={<span>🛡️</span>}
      title="Argomenti tecnici / Technical topics"
      description="Hacking etico e DevSecOps. / Ethical hacking and DevSecOps."
    >
      <Button variant="secondary">Esplora / Explore</Button>
    </ActionCard>
  </div>
);

export const Featured = () => (
  <div style={grid}>
    <ActionCard
      featured
      icon={<span>🔥</span>}
      title="Sfida del giorno / Daily challenge"
      description="Dieci domande, un tentativo, punteggio in classifica. / Ten questions, one attempt, leaderboard score."
    >
      <Button variant="primary">Accetta la sfida / Accept challenge</Button>
    </ActionCard>
    <ActionCard
      icon={<span>📖</span>}
      title="Impara / Learn"
      description="Lezioni guidate di vocabolario ed English in contesto. / Guided vocabulary and English-in-context lessons."
    >
      <Button variant="secondary">Continua / Continue</Button>
    </ActionCard>
  </div>
);

export const NoDescription = () => (
  <div style={grid}>
    <ActionCard icon={<span>🎧</span>} title="Ascolto rapido / Quick listen" />
    <ActionCard featured icon={<span>🏆</span>} title="Classifica / Leaderboard" />
  </div>
);
