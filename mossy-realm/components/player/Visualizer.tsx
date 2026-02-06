'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePlayerStore } from '@/lib/player/store';
import { Howler } from 'howler';

/**
 * Winamp-style visualizer bars
 * Attempts real audio analysis via Howler's Web Audio context
 * Falls back to animated simulation if unavailable
 */
export function Visualizer() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const barsRef = useRef<number[]>([]);
  const [hasRealAudio, setHasRealAudio] = useState(false);

  const BAR_COUNT = 12;
  const BAR_GAP = 3;

  // Initialize bar heights
  useEffect(() => {
    if (barsRef.current.length === 0) {
      barsRef.current = Array(BAR_COUNT).fill(0.15);
    }
  }, []);

  // Try to connect to Howler's audio context
  const connectToHowler = useCallback(() => {
    try {
      const ctx = Howler.ctx;
      const masterGain = Howler.masterGain;

      if (ctx && masterGain && ctx.state === 'running') {
        // Check if already connected
        if (analyserRef.current) return true;

        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.85;
        
        // Connect master gain -> analyser -> destination
        masterGain.disconnect();
        masterGain.connect(analyser);
        analyser.connect(ctx.destination);
        
        analyserRef.current = analyser;
        setHasRealAudio(true);
        return true;
      }
    } catch (e) {
      console.log('Could not connect to audio context:', e);
    }
    return false;
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let attempts = 0;

    const draw = () => {
      // Try to connect to real audio periodically
      if (!hasRealAudio && isPlaying && attempts < 10) {
        attempts++;
        if (connectToHowler()) {
          attempts = 10; // Stop trying
        }
      }

      const width = canvas.width;
      const height = canvas.height;
      const barWidth = (width - (BAR_COUNT - 1) * BAR_GAP) / BAR_COUNT;

      // Clear canvas
      ctx.fillStyle = '#1a2a22';
      ctx.fillRect(0, 0, width, height);

      // Get frequency data if available
      let frequencyData: number[] | null = null;
      if (hasRealAudio && analyserRef.current && isPlaying) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray as unknown as Uint8Array<ArrayBuffer>);
        frequencyData = Array.from(dataArray);
      }

      // Create gradient
      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, '#90ee90');
      gradient.addColorStop(0.6, '#e8a54b');
      gradient.addColorStop(1, '#ff8c42');

      // Update and draw each bar
      for (let i = 0; i < BAR_COUNT; i++) {
        let targetHeight: number;

        if (frequencyData && isPlaying) {
          // Real audio data
          const dataIndex = Math.floor(i * (frequencyData.length / BAR_COUNT));
          targetHeight = (frequencyData[dataIndex] / 255) * 0.9;
        } else if (isPlaying) {
          // Simulated animation
          targetHeight = 0.2 + Math.random() * 0.7;
        } else {
          // Paused - low bars
          targetHeight = 0.15;
        }

        // Smooth transition
        barsRef.current[i] += (targetHeight - barsRef.current[i]) * 0.3;

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
  }, [isPlaying, hasRealAudio, connectToHowler]);

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
