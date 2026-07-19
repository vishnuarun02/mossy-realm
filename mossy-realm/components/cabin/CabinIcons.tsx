/**
 * CabinIcons - small pixel icons for the cabin directory.
 *
 * 16x16 inline SVGs with crisp edges, drawn on a pixel grid.
 * They are object labels (id card, monitor, toolbox, recipe box,
 * mailbox, door), not illustrations. Decorative: always aria-hidden.
 */

interface IconProps {
  className?: string;
}

function PixelIcon({ children, className = '' }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function IdCardIcon(props: IconProps) {
  return (
    <PixelIcon {...props}>
      <rect x="2" y="3" width="12" height="10" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="4" y="5" width="3" height="3" />
      <rect x="8" y="5" width="4" height="1" />
      <rect x="8" y="7" width="4" height="1" />
      <rect x="4" y="10" width="8" height="1" />
    </PixelIcon>
  );
}

export function MonitorIcon(props: IconProps) {
  return (
    <PixelIcon {...props}>
      <rect x="2" y="2" width="12" height="9" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="4" y="4" width="2" height="1" />
      <rect x="4" y="6" width="5" height="1" />
      <rect x="4" y="8" width="3" height="1" />
      <rect x="6" y="11" width="4" height="1" />
      <rect x="4" y="13" width="8" height="1" />
    </PixelIcon>
  );
}

export function ToolboxIcon(props: IconProps) {
  return (
    <PixelIcon {...props}>
      <rect x="2" y="6" width="12" height="7" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="6" y="4" width="4" height="2" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="7" y="8" width="2" height="2" />
      <rect x="2" y="9" width="12" height="1" />
    </PixelIcon>
  );
}

export function RecipeBoxIcon(props: IconProps) {
  return (
    <PixelIcon {...props}>
      <rect x="2" y="5" width="12" height="8" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="4" y="2" width="3" height="3" />
      <rect x="8" y="3" width="3" height="2" />
      <rect x="5" y="8" width="6" height="1" />
      <rect x="5" y="10" width="4" height="1" />
    </PixelIcon>
  );
}

export function MailboxIcon(props: IconProps) {
  return (
    <PixelIcon {...props}>
      <path d="M3 8 V6 a4 4 0 0 1 8 0 v2" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="3" y="8" width="8" height="5" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="10" y="5" width="2" height="3" />
      <rect x="5" y="10" width="4" height="1" />
    </PixelIcon>
  );
}

export function DoorIcon(props: IconProps) {
  return (
    <PixelIcon {...props}>
      <rect x="4" y="2" width="8" height="12" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="9" y="7" width="2" height="2" />
    </PixelIcon>
  );
}
