'use client';

import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '@/lib/player/store';

/**
 * Winamp-style visualizer bars
 * Animated bars that respond to play state
 */
export function Visualizer() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const barsRef = useRef<number[]>([]);
  const [mounted, setMounted] = useState(false);

  const BAR_COUNT = 12;
  const BAR_GAP = 3;

  useEffect(() => {
    setMounted(true);
    // Initialize bar heights
    if (barsRef.current.length === 0) {
      barsRef.current = Array(BAR_COUNT).fill(0.15);
    }
  }, []);

  // Animation loop
  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const barWidth = (width - (BAR_COUNT - 1) * BAR_GAP) / BAR_COUNT;

      // Clear canvas
      ctx.fillStyle = '#1a2a22';
      ctx.fillRect(0, 0, width, height);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, '#90ee90');
      gradient.addColorStop(0.6, '#e8a54b');
      gradient.addColorStop(1, '#ff8c42');

      // Update and draw each bar
      for (let i = 0; i < BAR_COUNT; i++) {
        let targetHeight: number;

        if (isPlaying) {
          // Animated random heights when playing
          const baseHeight = 0.3 + Math.sin(Date.now() / 200 + i * 0.5) * 0.2;
          const randomness = Math.random() * 0.4;
          targetHeight = baseHeight + randomness;
        } else {
          // Low static bars when paused
          targetHeight = 0.1 + Math.sin(i * 0.8) * 0.05;
        }

        // Smooth transition
        barsRef.current[i] += (targetHeight - barsRef.current[i]) * 0.15;

        const barHeight = Math.max(barsRef.current[i] * height, 2);
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
  }, [isPlaying, mounted]);

  if (!mounted) {
    return (
      <div
        className="w-full h-10 bg-mossy-bg-box border-2 border-mossy-bg-box-alt mb-2"
        style={{ borderStyle: 'inset' }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={40}
      className="w-full h-10 bg-mossy-bg-box border-2 border-mossy-bg-box-alt mb-2"
      style={{ borderStyle: 'inset' }}
    />
  );
}
