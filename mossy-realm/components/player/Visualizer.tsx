'use client';

import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/lib/player/store';

/**
 * Winamp-style visualizer bars
 * Smooth animated bars that respond to play state
 */
export function Visualizer() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const barsRef = useRef<number[]>([]);

  const BAR_COUNT = 12;
  const BAR_GAP = 3;

  // Initialize bar heights
  useEffect(() => {
    if (barsRef.current.length === 0) {
      barsRef.current = Array(BAR_COUNT).fill(0.15);
    }
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const barWidth = (width - (BAR_COUNT - 1) * BAR_GAP) / BAR_COUNT;

      // Clear canvas
      ctx.fillStyle = '#1a2a22'; // mossy-bg-box approximate
      ctx.fillRect(0, 0, width, height);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, '#90ee90'); // green at bottom
      gradient.addColorStop(0.6, '#e8a54b'); // gold in middle
      gradient.addColorStop(1, '#ff8c42'); // orange at top

      // Update and draw each bar
      for (let i = 0; i < BAR_COUNT; i++) {
        if (isPlaying) {
          // Random target with some smoothing
          const target = 0.2 + Math.random() * 0.7;
          barsRef.current[i] += (target - barsRef.current[i]) * 0.3;
        } else {
          // Decay to low when paused
          barsRef.current[i] += (0.15 - barsRef.current[i]) * 0.1;
        }

        const barHeight = barsRef.current[i] * height;
        const x = i * (barWidth + BAR_GAP);
        const y = height - barHeight;

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={40}
      className="
        w-full h-10
        bg-mossy-bg-box 
        border-2 border-mossy-bg-box-alt
        mb-2
      "
      style={{ 
        borderStyle: 'inset',
      }}
    />
  );
}
