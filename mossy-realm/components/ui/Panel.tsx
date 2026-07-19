import { ReactNode } from 'react';

/**
 * Panel - the core MossyRealm primitive.
 *
 * A labeled specimen box: amber title strip on a moss body.
 * Evolves the old RetroBox into semantic markup + intentional variants.
 *
 * When to use:
 * - Any boxed content group that benefits from a label (sidebar widgets,
 *   page sections, forms, media groups).
 * - Use `surface="alt"` (lighter moss) when the panel holds primary page
 *   content and needs to stand forward; default `panel` for side rails.
 * - Keep titles short and styled like specimen labels: { like this }.
 *
 * When NOT to use:
 * - Recessed wells inside a panel (cassette window, code blocks): use InsetPanel.
 * - Inline emphasis in prose: use Callout.
 */

type PanelSurface = 'panel' | 'alt';
type PanelPadding = 'sm' | 'md' | 'none';

interface PanelProps {
  /** Strip title. Renders inside the amber strip. Omit for a title-less panel. */
  title?: ReactNode;
  /** Semantic element for the panel. Default 'section' when titled, else 'div'. */
  as?: 'section' | 'article' | 'aside' | 'div';
  /** Heading level for the strip title. Default h2. */
  titleAs?: 'h2' | 'h3' | 'h4' | 'div';
  /** Optional content pinned to the right end of the strip. */
  titleRight?: ReactNode;
  /** Body surface. 'panel' = deep moss, 'alt' = lighter moss. */
  surface?: PanelSurface;
  /** Body padding. 'md' = 12px (RetroBox default), 'sm' = 8px, 'none' = you own it. */
  padding?: PanelPadding;
  className?: string;
  children: ReactNode;
}

const surfaceClasses: Record<PanelSurface, string> = {
  panel: 'bg-surface-panel',
  alt: 'bg-surface-panel-alt',
};

const paddingClasses: Record<PanelPadding, string> = {
  none: '',
  sm: 'p-2',
  md: 'p-3',
};

export default function Panel({
  title,
  as,
  titleAs,
  titleRight,
  surface = 'panel',
  padding = 'md',
  className = '',
  children,
}: PanelProps) {
  const Tag = as ?? (title ? 'section' : 'div');
  const TitleTag = titleAs ?? 'h2';

  return (
    <Tag
      className={`
        ${surfaceClasses[surface]}
        border-frame border-border-structural
        rounded-sm
        overflow-hidden
        ${className}
      `}
    >
      {title && (
        <div
          className="
            bg-surface-strip
            text-fg-inverse
            px-3 py-1.5
            flex items-center justify-between gap-2
          "
        >
          <TitleTag
            className="
              font-heading
              font-semibold
              text-sm
              lowercase
              tracking-wider
            "
          >
            {title}
          </TitleTag>
          {titleRight && (
            <div className="font-nav text-xs normal-case tracking-normal">
              {titleRight}
            </div>
          )}
        </div>
      )}
      <div className={`${paddingClasses[padding]} font-body`}>
        {children}
      </div>
    </Tag>
  );
}
