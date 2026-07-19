import { ReactNode } from 'react';
import Link from 'next/link';

/**
 * CabinetIndex - the cabinet frame + its drawers.
 *
 * The outer body of a cabinet region. Use for section indexes
 * (Cabin drawer, Archives cabinet, Fieldwork file index).
 * Compose with DrawerFace children.
 *
 *   <CabinetIndex label="cabinet index" withScrews>
 *     <DrawerFace href="/cabin/about" number="01" label="about" caption="the operator" />
 *   </CabinetIndex>
 */

interface CabinetIndexProps {
  /** Small plate text on the frame, e.g. "cabinet index". */
  label?: string;
  /** Corner screws (desktop decoration, hides under 390px). */
  withScrews?: boolean;
  className?: string;
  children: ReactNode;
}

export function CabinetIndex({
  label,
  withScrews = false,
  className = '',
  children,
}: CabinetIndexProps) {
  return (
    <div className={`mui-cabinet ${label || withScrews ? 'pt-4' : ''} p-3 ${className}`}>
      {withScrews && (
        <>
          <span className="mui-screw mui-screw-tl" aria-hidden="true" />
          <span className="mui-screw mui-screw-tr" aria-hidden="true" />
          <span className="mui-screw mui-screw-bl" aria-hidden="true" />
          <span className="mui-screw mui-screw-br" aria-hidden="true" />
        </>
      )}
      {label && (
        <p className="font-nav text-meta uppercase tracking-[0.18em] text-fg-secondary text-center mb-3">
          [ {label} ]
        </p>
      )}
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

/**
 * DrawerFace - one openable drawer row.
 *
 * The whole face is the link/button; the handle is decorative.
 * Active file: stays open, amber plate, ► marker, optional lamp.
 */

interface DrawerFaceProps {
  href?: string;
  onClick?: () => void;
  /** Index number rendered as a number plate. */
  number?: string;
  /** The drawer's label text. */
  label: string;
  /** Small italic caption beside the label. */
  caption?: string;
  /** Status lamp. */
  lamp?: 'green' | 'amber' | 'off' | 'blink';
  active?: boolean;
  className?: string;
}

export function DrawerFace({
  href,
  onClick,
  number,
  label,
  caption,
  lamp,
  active = false,
  className = '',
}: DrawerFaceProps) {
  const classes = `mui-drawer-face ${active ? 'mui-drawer-face-active' : ''} ${className}`;

  const inner = (
    <>
      {number && <span className="mui-number-plate">{number}</span>}
      <span className="mui-label-plate">{label}</span>
      {caption && <span className="mui-drawer-caption">{caption}</span>}
      <span className="flex-1" />
      {lamp && (
        <span
          className={`led ${lamp === 'blink' ? 'led-amber led-blink' : `led-${lamp}`}`}
          aria-hidden="true"
        />
      )}
      <DrawerHandle />
    </>
  );

  if (href) {
    return (
      <Link href={href} aria-current={active ? 'page' : undefined} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={classes}>
      {inner}
    </button>
  );
}

/** The recessed cup handle. Decorative; the face carries interaction. */
export function DrawerHandle() {
  return (
    <span
      aria-hidden="true"
      className="
        w-11 h-2.5 shrink-0 rounded-sm
        border border-border-inset-edge
        bg-surface-inset
        shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(255,255,255,0.08)]
      "
    />
  );
}

/**
 * EmptyDrawer - an unfilled slot that explains itself.
 */
export function EmptyDrawer({ note }: { note: string }) {
  return (
    <div className="mui-drawer-inset px-3 py-2.5 text-center">
      <p className="text-micro text-fg-secondary italic">{note}</p>
    </div>
  );
}
