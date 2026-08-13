import React from 'react';
import { WeeklyChart } from '@knowledge-aio/ds';

export const Week = () => (
  <WeeklyChart
    bars={[
      { label: 'Lun', value: 25, display: '25 min' },
      { label: 'Mar', value: 40, display: '40 min' },
      { label: 'Mer', value: 15, display: '15 min' },
      { label: 'Gio', value: 55, display: '55 min' },
      { label: 'Ven', value: 30, display: '30 min' },
      { label: 'Sab', value: 0, display: '0 min' },
      { label: 'Dom', value: 45, display: '45 min' },
    ]}
  />
);

export const StrongWeek = () => (
  <WeeklyChart
    bars={[
      { label: 'Lun', value: 60, display: '60 min' },
      { label: 'Mar', value: 65, display: '65 min' },
      { label: 'Mer', value: 50, display: '50 min' },
      { label: 'Gio', value: 70, display: '70 min' },
      { label: 'Ven', value: 58, display: '58 min' },
      { label: 'Sab', value: 42, display: '42 min' },
      { label: 'Dom', value: 66, display: '66 min' },
    ]}
    max={70}
  />
);

export const Empty = () => (
  <WeeklyChart bars={[]} emptyMessage="Nessuna attività questa settimana / No activity this week" />
);
