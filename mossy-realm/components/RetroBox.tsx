import { ReactNode } from 'react';
import Panel from './ui/Panel';

/**
 * @deprecated RetroBox has evolved into `Panel` (components/ui/Panel).
 * This shim keeps existing consumers working during migration.
 *
 * Mapping:
 * - variant="default" -> surface="panel"
 * - variant="alt"     -> surface="alt"
 *
 * New code should import Panel directly.
 */

interface RetroBoxProps {
  title?: string;
  children: ReactNode;
  variant?: 'default' | 'alt';
  className?: string;
}

export default function RetroBox({
  title,
  children,
  variant = 'default',
  className = ''
}: RetroBoxProps) {
  return (
    <Panel
      title={title}
      surface={variant === 'alt' ? 'alt' : 'panel'}
      className={className}
    >
      {children}
    </Panel>
  );
}
