import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

/**
 * IconButton - square control for icon-only actions.
 *
 * Built for Realm Radio controls (play, next, mute) but usable anywhere
 * an icon is the whole label. `aria-label` is required because there is
 * no visible text.
 *
 * - `primary`: amber fill (the play button, the current state).
 * - `ghost`: moss fill, amber border (transport neighbors).
 * - Density `compact` is 32px chrome for desktop cassette decks; it grows
 *   to 44px on coarse-pointer devices via the global touch-target rule.
 *   Use `regular` when the control should always be 44px.
 *   Use `none` when a parent cluster owns the sizing.
 *
 * Pass `href` to get the identical look as a navigation link
 * (the "open player" affordance). Actions are buttons, navigation
 * is links - same face, honest element.
 */

type IconButtonVariant = 'primary' | 'ghost';
type IconButtonDensity = 'compact' | 'regular' | 'none';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  density?: IconButtonDensity;
  /** Render as a navigation link with identical styling. */
  href?: string;
  'aria-label': string;
  children: ReactNode;
}

const variantClasses: Record<IconButtonVariant, string> = {
  primary: `
    bg-surface-strip border-border-strong text-fg-inverse
    hover:bg-surface-strip-hover
  `,
  ghost: `
    bg-surface-panel-alt border-border-structural text-border-structural
    hover:bg-surface-strip hover:text-fg-inverse hover:border-border-strong
  `,
};

const densityClasses: Record<IconButtonDensity, string> = {
  compact: 'w-8 h-8 touch-target',
  regular: 'w-11 h-11',
  none: '', // caller owns dimensions via className
};

export default function IconButton({
  variant = 'ghost',
  density = 'compact',
  href,
  type = 'button',
  disabled,
  className = '',
  children,
  ...rest
}: IconButtonProps) {
  const classes = `
    inline-flex items-center justify-center
    border-panel
    rounded-sm
    cursor-pointer
    transition-colors duration-fast
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantClasses[variant]}
    ${densityClasses[density]}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={rest['aria-label']}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
}
