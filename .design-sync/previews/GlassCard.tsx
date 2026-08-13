import React from 'react';
import { GlassCard, Button } from '@knowledge-aio/ds';

const wrap: React.CSSProperties = {
  maxWidth: '320px',
};

const statRow: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.85rem',
  color: 'var(--text-secondary, #a8a8b3)',
  marginBottom: '1rem',
};

export const Default = () => (
  <div style={wrap}>
    <GlassCard title="Lezione di oggi / Today's lesson">
      <div style={statRow}>
        <span>Argomento / Topic: Phrasal Verbs</span>
        <span>12 min</span>
      </div>
      <Button variant="secondary">Continua / Continue</Button>
    </GlassCard>
  </div>
);

export const Featured = () => (
  <div style={wrap}>
    <GlassCard title="Serie in corso / Current streak" featured>
      <div style={statRow}>
        <span>7 giorni / 7 days</span>
        <span>🔥</span>
      </div>
      <Button variant="primary">Continua la serie / Keep the streak</Button>
    </GlassCard>
  </div>
);

export const NoTitle = () => (
  <div style={wrap}>
    <GlassCard>
      <div style={statRow}>
        <span>Vocaboli appresi / Words learned</span>
        <span>1.284</span>
      </div>
      <Button variant="success">Rivedi / Review</Button>
    </GlassCard>
  </div>
);
