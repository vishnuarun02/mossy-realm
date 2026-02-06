'use client';

// Shared audio context and analyser for visualization
let audioContext: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let sourceConnected = false;

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

export function connectSource(mediaElement: HTMLAudioElement): void {
  if (sourceConnected) return;
  
  try {
    const ctx = getAudioContext();
    const source = ctx.createMediaElementSource(mediaElement);
    source.connect(getAnalyser());
    sourceConnected = true;
  } catch {
    // Source may already be connected
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

