import React from 'react';
import { Button } from '@knowledge-aio/ds';

export const Variants = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
    <Button variant="primary">Inizia lezione / Start lesson</Button>
    <Button variant="secondary">Salta / Skip</Button>
    <Button variant="success">Risposta corretta / Correct</Button>
    <Button variant="danger">Reimposta dati / Reset data</Button>
  </div>
);

export const WithIcons = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
    <Button variant="primary" icon={<span>▶</span>}>
      Riproduci / Play
    </Button>
    <Button variant="secondary" icon={<span>⇄</span>}>
      Traduci / Translate
    </Button>
    <Button variant="success" icon={<span>✓</span>}>
      Conferma / Confirm
    </Button>
  </div>
);

export const Disabled = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
    <Button variant="primary" disabled>
      Prossima lezione / Next lesson
    </Button>
    <Button variant="secondary" disabled>
      Indietro / Back
    </Button>
  </div>
);

export const InCardFooter = () => (
  <div
    style={{
      display: 'flex',
      gap: '0.75rem',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingTop: '0.5rem',
    }}
  >
    <Button variant="secondary">Annulla / Cancel</Button>
    <Button variant="primary">Salva progresso / Save progress</Button>
  </div>
);
