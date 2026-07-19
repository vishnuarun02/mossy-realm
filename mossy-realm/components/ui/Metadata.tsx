import { ReactNode } from 'react';

/**
 * Metadata - the uppercase Cormorant meta row.
 *
 * Dates, expedition numbers, topics, read states. The quiet row above
 * or below a title that orients the reader without competing with it.
 * Compose with Badge variant="pill" inside.
 *
 * Example:
 *   <Metadata>
 *     <Badge variant="pill">frontend</Badge>
 *     <span>feb 4, 2026</span>
 *   </Metadata>
 */

interface MetadataProps {
  /** 'left' default; 'right' for timeline entries on the spine's left side. */
  align?: 'left' | 'right' | 'center';
  className?: string;
  children: ReactNode;
}

const alignClasses = {
  left: 'justify-start',
  right: 'justify-end',
  center: 'justify-center',
} as const;

export default function Metadata({
  align = 'left',
  className = '',
  children,
}: MetadataProps) {
  return (
    <div
      className={`
        flex flex-wrap items-center gap-2
        font-nav text-meta uppercase tracking-wider
        text-fg-secondary
        ${alignClasses[align]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
