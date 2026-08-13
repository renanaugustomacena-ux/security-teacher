import React from 'react';
import { LevelProgress } from '@knowledge-aio/ds';

const stack: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

export const JustStarted = () => (
  <div style={stack}>
    <LevelProgress level={1} levelName="Principiante / Beginner" percent={8} />
  </div>
);

export const MidLevel = () => (
  <div style={stack}>
    <LevelProgress level={7} levelName="Intermedio / Intermediate" percent={54} />
  </div>
);

export const NearlyComplete = () => (
  <div style={stack}>
    <LevelProgress level={12} levelName="Avanzato / Advanced" percent={91} />
  </div>
);

export const Sweep = () => (
  <div style={stack}>
    <LevelProgress level={2} levelName="Principiante / Beginner" percent={15} />
    <LevelProgress level={5} levelName="Intermedio / Intermediate" percent={48} />
    <LevelProgress level={9} levelName="Avanzato / Advanced" percent={76} />
    <LevelProgress level={14} levelName="Esperto / Expert" percent={100} />
  </div>
);
