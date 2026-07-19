import { ReactNode } from 'react';

/**
 * MediaFrame - the bordered frame around images and media.
 *
 * The hero-art treatment from the outpost welcome box: amber panel
 * border on deep moss, overflow hidden, optional caption strip below
 * and an optional corner tag (the "hello" gif pattern) peeking out.
 *
 * Provide the image as children (next/image with `fill` works; this
 * frame is position:relative). Height/aspect is owned by the caller
 * via className.
 */

interface MediaFrameProps {
  /** Caption text in a strip below the media. */
  caption?: string;
  /** Small decorative element tucked into a corner (gif, badge). */
  cornerTag?: ReactNode;
  className?: string;
  children: ReactNode;
}

export default function MediaFrame({
  caption,
  cornerTag,
  className = '',
  children,
}: MediaFrameProps) {
  return (
    <figure className="m-0">
      <div
        className={`
          relative overflow-hidden
          bg-surface-panel
          border-panel border-border-structural
          ${className}
        `}
      >
        {children}
        {cornerTag && (
          <div className="absolute -bottom-[10px] right-3 rotate-[-4deg] z-10">
            {cornerTag}
          </div>
        )}
      </div>
      {caption && (
        <figcaption
          className="
            mt-1.5 text-center
            font-nav text-meta text-fg-secondary
            italic
          "
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
