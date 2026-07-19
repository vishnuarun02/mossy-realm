/**
 * Divider - the horizontal rule between panel sections.
 *
 * - `subtle`: hairline, quiet separation inside dense panels.
 * - `structural`: 2px amber, separates major regions (welcome box halves).
 * - `glyph`: inserts a centered ✶ for storybook moments. Use rarely.
 *
 * Renders an <hr> so assistive tech gets a real separator.
 */

type DividerTone = 'subtle' | 'structural';

interface DividerProps {
  tone?: DividerTone;
  glyph?: boolean;
  className?: string;
}

const toneClasses: Record<DividerTone, string> = {
  subtle: 'border-t border-border-subtle',
  structural: 'border-t-2 border-border-structural',
};

export default function Divider({
  tone = 'structural',
  glyph = false,
  className = '',
}: DividerProps) {
  if (glyph) {
    return (
      <div
        role="separator"
        className={`flex items-center gap-3 my-4 ${className}`}
      >
        <hr className={`flex-1 border-none ${toneClasses[tone]}`} />
        <span aria-hidden="true" className="text-border-structural text-sm">✶</span>
        <hr className={`flex-1 border-none ${toneClasses[tone]}`} />
      </div>
    );
  }

  return (
    <hr
      className={`border-none ${toneClasses[tone]} my-4 ${className}`}
    />
  );
}
