import React from 'react';
import { NavItem } from '@knowledge-aio/ds';

const stack: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  maxWidth: '280px',
};

export const SidebarMenu = () => (
  <div style={stack}>
    <NavItem icon={<span>🏠</span>} label="Home / Home" active />
    <NavItem icon={<span>📖</span>} label="Impara / Learn" />
    <NavItem icon={<span>🎵</span>} label="Musica / Music" />
    <NavItem icon={<span>🎯</span>} label="Pratica / Practice" />
    <NavItem icon={<span>🛡️</span>} label="Argomenti / Topics" />
    <NavItem icon={<span>📈</span>} label="Progressi / Progress" />
    <NavItem icon={<span>👤</span>} label="Profilo / Profile" />
  </div>
);

export const ActiveOnTopics = () => (
  <div style={stack}>
    <NavItem icon={<span>🏠</span>} label="Home / Home" />
    <NavItem icon={<span>📖</span>} label="Impara / Learn" />
    <NavItem icon={<span>🎵</span>} label="Musica / Music" />
    <NavItem icon={<span>🎯</span>} label="Pratica / Practice" />
    <NavItem icon={<span>🛡️</span>} label="Argomenti / Topics" active />
    <NavItem icon={<span>📈</span>} label="Progressi / Progress" />
    <NavItem icon={<span>👤</span>} label="Profilo / Profile" />
  </div>
);

export const WithoutIcons = () => (
  <div style={stack}>
    <NavItem label="Home / Home" active />
    <NavItem label="Impara / Learn" />
    <NavItem label="Musica / Music" />
  </div>
);
