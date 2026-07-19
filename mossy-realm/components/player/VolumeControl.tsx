'use client';

import IconButton from '@/components/ui/IconButton';
import { VolumeHighIcon, VolumeMutedIcon, VolumeLowIcon } from './PlayerIcons';

/**
 * VolumeControl - the shared volume row.
 *
 * Cassette slider with an optional mute toggle. The slider is labeled
 * for screen readers; mute reports its pressed state.
 */

interface VolumeControlProps {
  volume: number; // 0..1
  isMuted: boolean;
  onSetVolume: (v: number) => void;
  onToggleMute: () => void;
  showMute?: boolean;
  className?: string;
}

export default function VolumeControl({
  volume,
  isMuted,
  onSetVolume,
  onToggleMute,
  showMute = false,
  className = '',
}: VolumeControlProps) {
  return (
    <div className={`flex items-center gap-2 overflow-hidden ${className}`}>
      {showMute ? (
        <IconButton
          variant="ghost"
          onClick={onToggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          aria-pressed={isMuted}
        >
          {isMuted ? (
            <VolumeMutedIcon />
          ) : volume < 0.5 ? (
            <VolumeLowIcon />
          ) : (
            <VolumeHighIcon />
          )}
        </IconButton>
      ) : (
        <span className="text-fg-secondary font-nav text-xs">Vol</span>
      )}
      <input
        type="range"
        min="0"
        max="100"
        value={Math.round(volume * 100)}
        onChange={(e) => onSetVolume(Number(e.target.value) / 100)}
        aria-label="Volume"
        className="cassette-slider flex-1 min-w-0 cursor-pointer w-full"
      />
    </div>
  );
}
