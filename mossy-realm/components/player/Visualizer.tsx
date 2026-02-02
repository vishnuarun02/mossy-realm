'use client';

import { usePlayerStore } from '@/lib/player/store';

/**
 * Winamp-style visualizer bars
 * Animates when playing, static when paused
 */
export function Visualizer() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const bars = [
    { height: '60%', delay: '0s' },
    { height: '80%', delay: '0.1s' },
    { height: '40%', delay: '0.2s' },
    { height: '90%', delay: '0.15s' },
    { height: '50%', delay: '0.25s' },
    { height: '70%', delay: '0.05s' },
    { height: '45%', delay: '0.3s' },
  ];

  return (
    <div 
      className="
        h-10 
        bg-mossy-bg-box 
        border-2 border-mossy-bg-box-alt
        flex items-end justify-around
        p-1
        mb-2
      "
      style={{ borderStyle: 'inset' }}
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className="w-1.5"
          style={{
            height: isPlaying ? bar.height : '20%',
            background: 'linear-gradient(to top, var(--mossy-link) 0%, var(--mossy-border-glow) 50%, var(--mossy-accent) 100%)',
            transition: 'height 0.2s ease',
            // Use separate animation properties to avoid conflicts
            animationName: isPlaying ? 'visualizer-bounce' : 'none',
            animationDuration: '0.5s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate',
            animationDelay: isPlaying ? bar.delay : '0s',
          }}
        />
      ))}
    </div>
  );
}
