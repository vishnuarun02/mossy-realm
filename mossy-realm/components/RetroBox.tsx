import { ReactNode } from 'react';

interface RetroBoxProps {
  title?: string;
  titleIcon?: string;  // Unicode symbol for title decoration
  children: ReactNode;
  variant?: 'default' | 'alt';
  className?: string;
}

export default function RetroBox({
  title,
  titleIcon,
  children,
  variant = 'default',
  className = ''
}: RetroBoxProps) {
  const bgClass = variant === 'alt' ? 'bg-mossy-bg-box-alt' : 'bg-mossy-bg-box';

  return (
    <div
      className={`
        retro-box
        ${bgClass}
        ${className}
      `}
    >
      {title && (
        <div className="retro-box-title font-heading">
          {titleIcon && <span className="mr-2 opacity-80">{titleIcon}</span>}
          {title}
        </div>
      )}
      <div className="retro-box-content font-body">
        {children}
      </div>
    </div>
  );
}
