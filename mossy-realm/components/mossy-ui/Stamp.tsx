/**
 * Stamp - the rotated physical mark. Text stays editable.
 *
 *   <Stamp tone="success">tested</Stamp>
 *   <Stamp tone="warning" size="sm">sample</Stamp>
 *   <StampDate date="2026-07-19" />
 *
 * Tones map to status colors. Never bake text into images.
 */

type StampTone = 'success' | 'amber' | 'warning' | 'neutral';

interface StampProps {
  tone?: StampTone;
  size?: 'sm' | 'md';
  className?: string;
  children: React.ReactNode;
}

const toneClasses: Record<StampTone, string> = {
  success: 'text-status-success',
  amber: 'text-border-strong',
  warning: 'text-accent',
  neutral: 'text-fg-secondary',
};

export function Stamp({
  tone = 'neutral',
  size = 'md',
  className = '',
  children,
}: StampProps) {
  return (
    <span
      className={`mui-stamp ${size === 'sm' ? 'mui-stamp-sm' : ''} ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Date stamp variant. */
export function StampDate({ date, className = '' }: { date: string; className?: string }) {
  return (
    <Stamp tone="neutral" size="sm" className={className}>
      {date}
    </Stamp>
  );
}

/**
 * StatusLabel - accession/index number with the punched dot.
 * Extends the existing accession-tag look into the asset family.
 */
export function StatusLabel({
  prefix,
  number,
  className = '',
}: {
  prefix?: string;
  number: string | number;
  className?: string;
}) {
  return (
    <span className={`accession-tag ${className}`}>
      {prefix ? `${prefix}-` : ''}
      {number}
    </span>
  );
}
