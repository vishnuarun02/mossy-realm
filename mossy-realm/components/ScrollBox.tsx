import { ReactNode } from 'react';
import Panel from './ui/Panel';

/**
 * ScrollBox - the 90s independent-scrolling panel.
 *
 * A Panel whose body scrolls on its own, with the classic
 * [ scroll ↓ ] indicator strip. The scroll region is focusable
 * so keyboard visitors can scroll it too (arrow keys).
 */

interface ScrollBoxProps {
  title?: string;
  children: ReactNode;
  variant?: 'default' | 'alt';
  className?: string;
  maxHeight?: string;
}

export default function ScrollBox({
  title,
  children,
  variant = 'default',
  className = '',
  maxHeight = '200px'
}: ScrollBoxProps) {
  return (
    <Panel
      title={title}
      surface={variant === 'alt' ? 'alt' : 'panel'}
      padding="none"
      className={className}
    >
      <div
        className="scrollbox-content p-3 font-body"
        style={{ maxHeight }}
        tabIndex={0}
        role="region"
        aria-label={typeof title === 'string' ? title : 'Scrollable content'}
      >
        {children}
      </div>
      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        [ scroll ↓ ]
      </div>
    </Panel>
  );
}
