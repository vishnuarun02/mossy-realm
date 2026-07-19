/**
 * SectionMark - the compact emblem for each wing.
 *
 * Shared frame, distinct glyph. Related, not identical.
 * Decorative by default; pass label for semantic use.
 */

type Section = 'cabin' | 'fieldwork' | 'crossroads' | 'archives';

interface SectionMarkProps {
  section: Section;
  size?: number;
  label?: string;
  className?: string;
}

function Glyph({ section }: { section: Section }) {
  switch (section) {
    case 'cabin':
      return (
        <>
          <path d="M12 21 12 10 21 10 21 21" fill="none" stroke="currentColor" strokeWidth="1.75" transform="translate(3.5,5) scale(0.72)" />
          <path d="M8 8 16.5 8 16.5 12" fill="none" stroke="currentColor" strokeWidth="1.75" transform="translate(-2,-2)" />
          <circle cx="19" cy="7" r="2" fill="currentColor" transform="translate(-3,-1)" />
          <path d="M19 9v3" stroke="currentColor" strokeWidth="1.5" transform="translate(-3,-1)" />
        </>
      );
    case 'fieldwork':
      return (
        <>
          <path d="M6 18h12M6 18v-2M10 18v-3M14 18v-2M18 18v-3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 6h6v4H7z" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <path d="M13 8h4" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case 'crossroads':
      return (
        <>
          <path d="M12 5v15" stroke="currentColor" strokeWidth="1.75" />
          <path d="M12 6h7l-2 2.5L19 11h-7" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="miter" />
          <path d="M12 12H5l2 2.5L5 17h7" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="miter" />
        </>
      );
    case 'archives':
      return (
        <>
          <rect x="5" y="4" width="14" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <path d="M5 9h14" stroke="currentColor" strokeWidth="1.5" />
          <rect x="9" y="11" width="6" height="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 17h2" stroke="currentColor" strokeWidth="1.75" />
        </>
      );
  }
}

export default function SectionMark({
  section,
  size = 40,
  label,
  className = '',
}: SectionMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`rounded-sm border-2 border-border-structural bg-surface-panel text-border-structural p-0.5 ${className}`}
    >
      <Glyph section={section} />
    </svg>
  );
}
