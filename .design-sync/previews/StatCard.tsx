import React from 'react';
import { StatCard } from '@knowledge-aio/ds';

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  gap: '1.5rem',
};

export const ProgressGrid = () => (
  <div style={grid}>
    <StatCard icon={<span>🔥</span>} value={23} label="Giorni di serie / Streak days" />
    <StatCard icon={<span>📚</span>} value="1.284" label="Parole imparate / Words learned" />
    <StatCard icon={<span>⚡</span>} value="9.450" label="XP totali / Total XP" />
    <StatCard icon={<span>✓</span>} value={87} label="Lezioni completate / Lessons completed" />
    <StatCard icon={<span>🎯</span>} value="94%" label="Precisione / Accuracy" />
    <StatCard icon={<span>⏱️</span>} value={312} label="Minuti studiati / Minutes studied" />
  </div>
);

export const NoIcon = () => (
  <div style={grid}>
    <StatCard value={7} label="Livello attuale / Current level" />
    <StatCard value="42" label="Badge sbloccati / Badges unlocked" />
  </div>
);

export const SingleTile = () => (
  <div style={grid}>
    <StatCard icon={<span>🛡️</span>} value={16} label="Termini di sicurezza / Security terms" />
  </div>
);
