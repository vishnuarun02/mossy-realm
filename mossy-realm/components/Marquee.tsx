'use client';

import { getFormattedBuildDate } from '@/lib/buildDate';

// Build date is computed at build time, auto-updates on each deployment
const BUILD_DATE = getFormattedBuildDate();
const DEFAULT_HEADER_MESSAGE = `✶ welcome traveler ✶ site under gentle construction ✶ last updated: ${BUILD_DATE} ✶ new art coming soon ✶`;

interface MarqueeProps {
  message?: string;
  direction?: 'left' | 'right';
}

export default function Marquee({
  message = DEFAULT_HEADER_MESSAGE,
  direction = 'left'
}: MarqueeProps) {
  // Just the message - CSS animation handles the gap between loops
  // Focusable so keyboard visitors can pause the scroll (focus-within rule)
  return (
    <div className="marquee-container" tabIndex={0} role="note" aria-label="Site ticker">
      <div className={`marquee-content ${direction === 'right' ? 'marquee-content-rtl' : ''}`}>
        {message}
      </div>
    </div>
  );
}

