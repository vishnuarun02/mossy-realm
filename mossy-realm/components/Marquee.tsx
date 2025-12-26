'use client';

interface MarqueeProps {
  message?: string;
  direction?: 'left' | 'right';
}

export default function Marquee({
  message = "✶ welcome traveler ✶ site under gentle construction ✶ last updated: dec 25, 2025 ✶ new art coming soon ✶",
  direction = 'left'
}: MarqueeProps) {
  // Just the message - CSS animation handles the gap between loops
  return (
    <div className="marquee-container">
      <div className={`marquee-content ${direction === 'right' ? 'marquee-content-rtl' : ''}`}>
        {message}
      </div>
    </div>
  );
}

