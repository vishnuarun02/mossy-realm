'use client';

// Shared audio context and analyser for visualization
let audioContext: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let connectedElement: HTMLAudioElement | null = null;
let sourceNode: MediaElementAudioSourceNode | null = null;

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
}

export function getAnalyser(): AnalyserNode {
  if (!analyser) {
    const ctx = getAudioContext();
    analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.8;
    analyser.connect(ctx.destination);
  }
  return analyser;
}

/**
 * Connect an audio element to the Web Audio API for visualization.
 * 
 * ⚠️ NOTE: This requires CORS headers on the audio files. If CORS isn't set up,
 * the audio will be muted when routed through Web Audio API. To fix this:
 * 1. Add CORS headers to your R2 bucket: Access-Control-Allow-Origin: *
 * 2. Or set crossOrigin="anonymous" on the audio element
 * 
 * If connection fails, audio will play but visualizer won't have real data.
 */
export function connectSource(mediaElement: HTMLAudioElement): boolean {
  try {
    const ctx = getAudioContext();
    if (connectedElement === mediaElement) return true;
    
    // Set crossOrigin to enable CORS - required for Web Audio API analysis
    // This must be set BEFORE the audio starts loading
    if (!mediaElement.crossOrigin) {
      console.warn('[AudioContext] Audio element missing crossOrigin attribute. Visualizer may not work.');
    }
    
    if (sourceNode) {
      sourceNode.disconnect();
    }
    sourceNode = ctx.createMediaElementSource(mediaElement);
    sourceNode.connect(getAnalyser());
    connectedElement = mediaElement;
    return true;
  } catch (error) {
    // Source may already be connected or CORS blocked
    console.warn('[AudioContext] Failed to connect source:', error);
    connectedElement = mediaElement;
    return false;
  }
}

export function getFrequencyData(): Uint8Array {
  const analyserNode = getAnalyser();
  const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
  analyserNode.getByteFrequencyData(dataArray);
  return dataArray;
}

export function isAudioContextReady(): boolean {
  return audioContext !== null && audioContext.state === 'running';
}

export async function resumeAudioContext(): Promise<void> {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
}
