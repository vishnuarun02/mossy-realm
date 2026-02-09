'use client';

import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/lib/player/store';
import { getFrequencyData } from '@/lib/player/audioContext';

interface VisualizerProps {
  variant?: 'compact' | 'full';
}

function average(data: Uint8Array): number {
  let sum = 0;
  for (let i = 0; i < data.length; i += 1) {
    sum += data[i];
  }
  return data.length ? sum / data.length : 0;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Cassette-style audio visualizer (audio-synced)
 * Uses analyser data from the shared audio context.
 */
export function Visualizer({ variant = 'compact' }: VisualizerProps) {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const phaseRef = useRef(0);
  const levelRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      const width = container.clientWidth;
      const height = variant === 'full' ? 96 : 64;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    return () => observer.disconnect();
  }, [variant]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const data = getFrequencyData();
      const avg = average(data);
      const level = clamp(avg / 255, 0, 1);
      levelRef.current += (level - levelRef.current) * 0.18;

      const reelSpeed = isPlaying ? 0.08 + levelRef.current * 0.6 : 0.01;
      phaseRef.current += reelSpeed;

      // Background
      ctx.fillStyle = '#0b120e';
      ctx.fillRect(0, 0, width, height);

      // Inner window
      ctx.fillStyle = '#101a14';
      ctx.strokeStyle = '#3a5a3b';
      ctx.lineWidth = 2;
      const pad = 6;
      const winH = height - 12;
      const winW = width - 12;
      ctx.fillRect(pad, pad, winW, winH);
      ctx.strokeRect(pad + 1, pad + 1, winW - 2, winH - 2);

      // LED strip
      const ledCount = 10;
      const lit = Math.round(levelRef.current * ledCount);
      const ledW = (winW - 18) / ledCount;
      const ledY = pad + 6;
      for (let i = 0; i < ledCount; i += 1) {
        const x = pad + 9 + i * ledW;
        ctx.fillStyle = i < lit ? '#b7ff71' : '#1f3a25';
        ctx.fillRect(x, ledY, ledW - 2, 6);
      }

      // Tape band
      ctx.fillStyle = '#1a2b20';
      ctx.fillRect(pad + 6, pad + winH / 2 - 6, winW - 12, 12);

      // Reels
      const reelY = pad + winH / 2;
      const reelXLeft = pad + winW * 0.28;
      const reelXRight = pad + winW * 0.72;
      const reelRadius = Math.min(winH * 0.28, 18);

      const drawReel = (cx: number, cy: number, angle: number) => {
        ctx.strokeStyle = '#6a8a50';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, reelRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, reelRadius * 0.4, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#8fb86a';
        for (let i = 0; i < 3; i += 1) {
          const spokeAngle = angle + (i * Math.PI * 2) / 3;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(
            cx + Math.cos(spokeAngle) * reelRadius,
            cy + Math.sin(spokeAngle) * reelRadius
          );
          ctx.stroke();
        }
      };

      drawReel(reelXLeft, reelY, phaseRef.current);
      drawReel(reelXRight, reelY, -phaseRef.current * 0.9);

      // Subtle scanlines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} className="w-full block" />
    </div>
  );
}
