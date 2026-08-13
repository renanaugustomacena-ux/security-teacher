import React from 'react';

export interface AppSurfaceProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * The root wrapper every Knowledge AIO screen sits on.
 *
 * The app declares this surface on `body` in `css/style.css`
 * (`background-color: #000`, `color: var(--text-primary)`,
 * `font-family: var(--font-sans)`). Restating it on an element matters because
 * every content surface in this design system is *translucent* — `.home-card`,
 * `.stat-card`, `.badge-card` and friends all fill with
 * `rgba(10, 18, 35, 0.6)` or similar. On a light background they wash out to
 * grey; only over the black base do they read as the intended dark glass.
 *
 * In the running app a three.js matrix-rain canvas sits between this surface
 * and the content. That canvas is generated at runtime and cannot ship with a
 * static design system, so the flat black base is the honest equivalent.
 */
export function AppSurface({ className, children }: AppSurfaceProps) {
  return (
    <div
      className={['app-container', className].filter(Boolean).join(' ')}
      style={{
        backgroundColor: '#000',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
        lineHeight: 1.6,
        display: 'block',
        minHeight: 'auto',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      {children}
    </div>
  );
}

export default AppSurface;
