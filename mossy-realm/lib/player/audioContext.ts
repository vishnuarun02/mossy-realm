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

export function connectSource(mediaElement: HTMLAudioElement): void {
  try {
    const ctx = getAudioContext();
    if (connectedElement === mediaElement) return;
    if (sourceNode) {
      sourceNode.disconnect();
    }
    sourceNode = ctx.createMediaElementSource(mediaElement);
    sourceNode.connect(getAnalyser());
    connectedElement = mediaElement;
  } catch {
    // Source may already be connected
    connectedElement = mediaElement;
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
