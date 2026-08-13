import React from 'react';

export interface ButtonProps {
  /** Visual register. `primary` is the amber gradient CTA; `danger` is reserved for
   *  hard-fail states only (Doctrine §14.6) — never for a wrong answer. */
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  /** Leading glyph or icon, rendered before the label. */
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: React.ReactNode;
}

/**
 * The single button primitive. Every actionable control in Knowledge AIO is a
 * `.btn` plus exactly one variant class.
 */
export function Button({
  variant = 'primary',
  icon,
  disabled = false,
  type = 'button',
  onClick,
  className,
  children,
}: ButtonProps) {
  const classes = ['btn', `btn-${variant}`, className].filter(Boolean).join(' ');
  return (
    <button className={classes} type={type} disabled={disabled} onClick={onClick}>
      {icon}
      {children}
    </button>
  );
}

export default Button;
