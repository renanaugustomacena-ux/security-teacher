import React from 'react';
import { AchievementToast } from '@knowledge-aio/ds';

/**
 * The toast is `position: fixed` — in the running app it anchors to the top-right
 * of the screen. `transform` on this wrapper makes it the containing block, so the
 * toast lands inside the card instead of escaping onto the preview harness's own
 * page. The black fill is the app's real `body` surface, which the toast's
 * `backdrop-filter` needs behind it to read as dark glass rather than washing out.
 */
const screen: React.CSSProperties = {
  position: 'relative',
  transform: 'translateZ(0)',
  width: '440px',
  maxWidth: '100%',
  height: '160px',
  background: '#000',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden',
};

export const Visible = () => (
  <div style={screen}>
    <AchievementToast
      icon={<span>🏆</span>}
      label="Traguardo sbloccato / Achievement unlocked"
      title="Serie di sette giorni / Seven-day streak"
      visible
    />
  </div>
);
