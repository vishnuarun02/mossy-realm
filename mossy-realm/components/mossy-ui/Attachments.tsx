/**
 * Small paper attachments. All decorative, absolutely positioned
 * inside a relative parent. aria-hidden always.
 */

export function Paperclip({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="30"
      viewBox="0 0 14 30"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 8v14a3 3 0 0 0 6 0V7a4 4 0 0 0-8 0v13a2 2 0 0 0 4 0V9" />
    </svg>
  );
}

export function TapeStrip({
  rotate = -4,
  className = '',
}: {
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`mui-tape ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  );
}

export function Pushpin({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`
        inline-block w-2.5 h-2.5 rounded-full
        bg-accent
        shadow-[1px_1px_2px_rgba(0,0,0,0.5)]
        ${className}
      `}
    />
  );
}

export function Staple({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`mui-staple ${className}`} />;
}
