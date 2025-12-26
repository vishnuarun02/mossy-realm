import { ReactNode } from 'react';

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
  const bgClass = variant === 'alt' ? 'bg-mossy-bg-box-alt' : 'bg-mossy-bg-box';

  return (
    <div
      className={`
        ${bgClass}
        border-[3px] border-mossy-border
        rounded-sm
        overflow-hidden
        ${className}
      `}
    >
      {title && (
        <div
          className="
            font-heading
            bg-mossy-border 
            text-mossy-bg-box 
            px-3 py-1.5
            font-semibold
            text-sm
            lowercase
            tracking-wider
          "
        >
          {title}
        </div>
      )}
      <div 
        className="scrollbox-content p-3 font-body"
        style={{ maxHeight }}
      >
        {children}
      </div>
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        [ scroll ↓ ]
      </div>
    </div>
  );
}

