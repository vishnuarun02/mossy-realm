import { ReactNode } from 'react';

/**
 * Paper family - physical paper surfaces.
 *
 * Paper is an object, not a UI surface: it gets its own tokens
 * (--surface-paper, --text-on-paper) and its own ink. Text on paper
 * is always dark ink. Compose with headings and lists as usual.
 *
 *   <PaperSheet variant="aged" stack texture>
 *     <p>an actual sheet of paper on the internet</p>
 *   </PaperSheet>
 */

type PaperVariant = 'plain' | 'aged' | 'ruled' | 'graph' | 'log' | 'letter';

interface PaperSheetProps {
  variant?: PaperVariant;
  /** Aged tint overlay (the older look). */
  aged?: boolean;
  /** Pseudo-sheets behind the main one. */
  stack?: boolean;
  /** Paper fiber texture. */
  texture?: boolean;
  /** Folded top-right corner. */
  fold?: boolean;
  /** Torn edges. */
  torn?: boolean;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<PaperVariant, string> = {
  plain: '',
  aged: '',
  ruled: 'mui-paper-ruled',
  graph: 'mui-paper-graph',
  log: 'mui-paper-log',
  letter: '',
};

export function PaperSheet({
  variant = 'plain',
  aged = false,
  stack = false,
  texture = true,
  fold = false,
  torn = false,
  className = '',
  children,
}: PaperSheetProps) {
  return (
    <div
      className={`
        mui-paper
        ${aged || variant === 'aged' ? 'mui-paper-aged' : ''}
        ${variantClasses[variant]}
        ${stack ? 'mui-paper-stack' : ''}
        ${texture ? 'mui-paper-texture' : ''}
        ${fold ? 'mui-fold-corner' : ''}
        ${torn ? 'mui-note-torn' : ''}
        mui-edge-wear
        p-4
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/**
 * NotebookSheet - spiral-bound ruled page.
 */
export function NotebookSheet({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <PaperSheet variant="ruled" texture className={`mui-spiral ${className}`}>
      {children}
    </PaperSheet>
  );
}

/**
 * IndexCard - the catalog card.
 *
 * Archives' paper unit: optional metadata strip on top (record id,
 * filing info), ruled body below.
 */
interface IndexCardProps {
  /** Metadata strip content (record id, filing info). */
  meta?: ReactNode;
  ruled?: boolean;
  className?: string;
  children: ReactNode;
}

export function IndexCard({
  meta,
  ruled = true,
  className = '',
  children,
}: IndexCardProps) {
  return (
    <div className={`mui-paper mui-paper-texture mui-edge-wear ${className}`}>
      {meta && (
        <div className="px-3 py-1.5 border-b border-dashed border-[rgba(43,42,30,0.35)] font-nav text-meta uppercase tracking-wider text-[rgba(43,42,30,0.75)]">
          {meta}
        </div>
      )}
      <div className={`p-3 ${ruled ? 'mui-paper-ruled' : ''}`}>{children}</div>
    </div>
  );
}

/**
 * RecipeCardSurface - the recipe card surface.
 *
 * Paper + optional stain blotches (the card has survived a kitchen).
 */
export function RecipeCardSurface({
  stained = true,
  className = '',
  children,
}: {
  stained?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <PaperSheet variant="ruled" className={`${stained ? 'stained-card' : ''} ${className}`}>
      {children}
    </PaperSheet>
  );
}
