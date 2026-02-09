'use client';

import { Howler } from 'howler';

// Analyser node for visualization - connects to Howler's Web Audio graph
let analyser: AnalyserNode | null = null;
let isConnected = false;

/**
 * Get or create the analyser node connected to Howler's audio graph.
 * Uses Howler's built-in Web Audio context for seamless integration.
 */
export function getAnalyser(): AnalyserNode {
  // Howler.ctx is the AudioContext used by Howler in Web Audio mode
  const ctx = Howler.ctx;
  if (!ctx) {
    // Fallback: create a dummy analyser if Howler isn't ready
    const fallbackCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const fallbackAnalyser = fallbackCtx.createAnalyser();
    fallbackAnalyser.fftSize = 64;
    return fallbackAnalyser;
  }

  if (!analyser) {
    analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.8;
  }

  // Connect analyser to Howler's master gain if not already connected
  if (!isConnected && Howler.masterGain) {
    try {
      // Insert analyser between master gain and destination
      Howler.masterGain.disconnect();
      Howler.masterGain.connect(analyser);
      analyser.connect(ctx.destination);
      isConnected = true;
    } catch {
      // May fail if already connected differently
      analyser.connect(ctx.destination);
    }
  }

  return analyser;
}

/**
 * Ensure analyser is connected to Howler's audio graph.
 * Call this after audio starts playing.
 */
export function connectToHowler(): void {
  getAnalyser(); // This will set up the connection
}

export function getFrequencyData(): Uint8Array {
  const analyserNode = getAnalyser();
  const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
  analyserNode.getByteFrequencyData(dataArray);
  return dataArray;
}

export function isAudioContextReady(): boolean {
  return Howler.ctx !== null && Howler.ctx?.state === 'running';
}

export async function resumeAudioContext(): Promise<void> {
  const ctx = Howler.ctx;
  if (ctx && ctx.state === 'suspended') {
    await ctx.resume();
  }
}
