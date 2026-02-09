import { Howl } from 'howler';

/**
 * Global audio singleton - persists outside React lifecycle
 * This ensures audio keeps playing during navigation
 */

let howlInstance: Howl | null = null;
let currentTrackUrl: string | null = null;

export function getHowl(): Howl | null {
  return howlInstance;
}

export function getCurrentTrackUrl(): string | null {
  return currentTrackUrl;
}

/**
 * Get the underlying HTMLAudioElement from Howler for Web Audio API integration.
 * 
 * ⚠️ WARNING: This accesses Howler's private `_sounds` array which is not part
 * of the public API. This could break on Howler updates. If this stops working,
 * consider:
 * 1. Using Howler's official Web Audio API mode (requires more setup)
 * 2. Creating our own Audio element and syncing with Howler
 * 3. Checking if Howler has added a public API for this
 * 
 * @see https://github.com/goldfire/howler.js/issues/1082 for discussion
 */
export function getAudioElement(): HTMLAudioElement | null {
  const howl = howlInstance as unknown as {
    _sounds?: Array<{ _node?: unknown }>;
  } | null;
  const node = howl?._sounds?.[0]?._node;
  return node instanceof HTMLAudioElement ? node : null;
}

export function createHowl(
  url: string,
  options: {
    volume: number;
    onload?: () => void;
    onend?: () => void;
    onplay?: () => void;
    onpause?: () => void;
  }
): Howl {
  // If same track, return existing instance
  if (howlInstance && currentTrackUrl === url) {
    return howlInstance;
  }

  // Cleanup old instance
  if (howlInstance) {
    howlInstance.unload();
  }

  currentTrackUrl = url;
  howlInstance = new Howl({
    src: [url],
    html5: true,
    volume: options.volume,
    onload: options.onload,
    onend: options.onend,
    onplay: options.onplay,
    onpause: options.onpause,
  });

  return howlInstance;
}

export function playGlobal(): void {
  if (howlInstance && !howlInstance.playing()) {
    howlInstance.play();
  }
}

export function pauseGlobal(): void {
  if (howlInstance && howlInstance.playing()) {
    howlInstance.pause();
  }
}

export function setVolumeGlobal(volume: number): void {
  if (howlInstance) {
    howlInstance.volume(volume);
  }
}

export function isPlayingGlobal(): boolean {
  return howlInstance?.playing() ?? false;
}

export function seekGlobal(): number {
  if (howlInstance) {
    const seek = howlInstance.seek();
    if (typeof seek === 'number') {
      return seek;
    }
  }
  return 0;
}

export function durationGlobal(): number {
  return howlInstance?.duration() ?? 0;
}
