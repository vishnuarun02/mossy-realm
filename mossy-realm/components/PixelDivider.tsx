/**
 * PixelDivider - A pure CSS retro-style divider
 * No images needed, just chunky pixel vibes
 */

type DividerVariant = 'default' | 'double' | 'dotted' | 'dashed' | 'ornate';

interface PixelDividerProps {
  variant?: DividerVariant;
  className?: string;
}

export default function PixelDivider({ variant = 'default', className = '' }: PixelDividerProps) {
  const variants: Record<DividerVariant, string> = {
    default: `
      h-[6px]
      bg-gradient-to-r from-transparent via-mossy-border to-transparent
      border-t border-b border-mossy-border/50
    `,
    double: `
      h-[8px]
      border-t-2 border-b-2 border-mossy-border
      bg-mossy-bg-box
    `,
    dotted: `
      h-[4px]
      border-t-2 border-dotted border-mossy-border
    `,
    dashed: `
      h-[4px]
      border-t-2 border-dashed border-mossy-border
    `,
    ornate: `
      h-[10px]
      border-t-2 border-b-2 border-mossy-border
      bg-gradient-to-r from-mossy-bg-box via-mossy-border/20 to-mossy-bg-box
    `,
  };

  return (
    <div
      className={`w-full my-4 ${variants[variant]} ${className}`}
      role="separator"
      aria-hidden="true"
    />
  );
}

/**
 * TextDivider - A divider with centered text/symbol
 */
interface TextDividerProps {
  symbol?: string;
  className?: string;
}

export function TextDivider({ symbol = '◆', className = '' }: TextDividerProps) {
  return (
    <div className={`flex items-center gap-3 my-4 ${className}`} role="separator" aria-hidden="true">
      <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent to-mossy-border" />
      <span className="text-mossy-border text-sm">{symbol}</span>
      <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent to-mossy-border" />
    </div>
  );
}

/**
 * SymbolRow - Decorative row of symbols
 */
interface SymbolRowProps {
  symbols?: string;
  className?: string;
}

export function SymbolRow({ symbols = '✦ ◆ ✦', className = '' }: SymbolRowProps) {
  return (
    <div className={`text-center text-mossy-border/70 text-xs tracking-[0.5em] my-2 ${className}`}>
      {symbols}
    </div>
  );
}
