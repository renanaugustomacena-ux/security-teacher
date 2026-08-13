import React from 'react';
import { UserLevel } from '@knowledge-aio/ds';

const wrap: React.CSSProperties = {
  maxWidth: '240px',
};

export const Sidebar = () => (
  <div style={wrap}>
    <UserLevel badge="Livello 7 / Level 7" label="Studente Avanzato / Advanced Student" />
  </div>
);

export const Large = () => (
  <div style={wrap}>
    <UserLevel badge="Livello 12 / Level 12" label="Esperto / Expert" large />
  </div>
);

export const BadgeOnly = () => (
  <div style={wrap}>
    <UserLevel badge="Livello 1 / Level 1" />
  </div>
);
