import { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Button - the realm's two button kinds.
 *
 * - `primary`: amber fill, inverse text. The main action on a panel
 *   (Vote, Send, Play). One per panel at most.
 * - `ghost`: moss fill, amber border and text, fills amber on hover.
 *   For secondary actions (new question, view, cancel).
 *
 * Sizes: `sm` is compact desktop chrome (32px), `md` is the comfortable
 * default (44px, touch-safe). `sm` automatically grows to 44px on
 * coarse-pointer devices via the global touch-target rule.
 *
 * Text links are NOT buttons. If it navigates, use TextLink.
 */

type ButtonVariant = 'primary' | 'ghost';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-surface-strip border-border-strong text-fg-inverse
    hover:bg-surface-strip-hover
  `,
  ghost: `
    bg-surface-panel-alt border-border-structural text-border-structural
    hover:bg-surface-strip hover:text-fg-inverse hover:border-border-strong
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-sm min-h-8 touch-target',
  md: 'px-4 py-2 text-base min-h-[44px]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-1.5
        font-nav
        border-panel
        rounded-sm
        cursor-pointer
        transition-colors duration-fast
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:bg-surface-strip disabled:hover:text-fg-inverse
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}
