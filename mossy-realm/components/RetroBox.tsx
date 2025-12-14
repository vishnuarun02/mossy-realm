import { ReactNode } from 'react';

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
  const bgClass = variant === 'alt' ? 'bg-mossy-bg-box-alt' : 'bg-mossy-bg-box';

  return (
    <div className={`retro-box ${bgClass} ${className}`}>
      {title && (
        <div className="retro-box-title font-heading">
          {title}
        </div>
      )}
      <div className="retro-box-content font-body">
        {children}
      </div>
    </div>
  );
}
