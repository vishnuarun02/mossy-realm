/**
 * MossyIcon - the realm's utility icon.
 *
 * One sprite (`/assets/mossy-ui/icons/sprite.svg`), one component.
 * Late-90s utility style: square geometry, currentColor stroke.
 *
 * Decorative by default (aria-hidden). Pass `label` to make the
 * icon semantic (renders role="img" + aria-label).
 *
 *   <MossyIcon name="gear" size={20} />
 *   <MossyIcon name="signal" label="live signal" />
 */

export type MossyIconName =
  | 'cabin' | 'profile' | 'status' | 'workbench' | 'recipe' | 'mail'
  | 'experiment' | 'learnings' | 'note' | 'gallery' | 'hardware'
  | 'gamepad' | 'gear' | 'rocket' | 'drone' | 'target' | 'network'
  | 'packet' | 'pipeline' | 'build' | 'test' | 'warning' | 'success'
  | 'failure' | 'radio' | 'signal' | 'guestbook' | 'rabbit-hole'
  | 'external' | 'archive' | 'collected' | 'changelog' | 'sitemap'
  | 'folder' | 'file' | 'floppy' | 'cdrom' | 'terminal' | 'book'
  | 'music' | 'cooking' | 'weather' | 'trail' | 'telescope';

interface MossyIconProps {
  name: MossyIconName;
  /** 16 default; 20 and 24 for larger placements. */
  size?: 16 | 20 | 24;
  /** Accessible label. Omit for decorative icons. */
  label?: string;
  className?: string;
}

export default function MossyIcon({
  name,
  size = 16,
  label,
  className = '',
}: MossyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
    >
      <use href={`/assets/mossy-ui/icons/sprite.svg#i-${name}`} />
    </svg>
  );
}
