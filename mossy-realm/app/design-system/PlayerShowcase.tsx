'use client';

import { useState } from 'react';
import PlayerControls from '@/components/player/PlayerControls';
import TrackStatus from '@/components/player/TrackStatus';
import VolumeControl from '@/components/player/VolumeControl';

/**
 * PlayerShowcase - interactive demo of the shared radio primitives.
 * Local state only; does not touch the real audio engine.
 */
export default function PlayerShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const noop = () => {};

  return (
    <div className="space-y-4">
      <div>
        <p className="text-meta uppercase tracking-wider text-fg-secondary font-nav mb-2">
          status row
        </p>
        <TrackStatus isPlaying={isPlaying} />
      </div>

      <div>
        <p className="text-meta uppercase tracking-wider text-fg-secondary font-nav mb-2">
          transport - sm (widget chrome, grows on touch)
        </p>
        <PlayerControls
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onPrev={noop}
          onNext={noop}
          size="sm"
        />
      </div>

      <div>
        <p className="text-meta uppercase tracking-wider text-fg-secondary font-nav mb-2">
          transport - lg (deck / sheet)
        </p>
        <PlayerControls
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onPrev={noop}
          onNext={noop}
          size="lg"
        />
      </div>

      <div>
        <p className="text-meta uppercase tracking-wider text-fg-secondary font-nav mb-2">
          volume (with mute toggle)
        </p>
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onSetVolume={setVolume}
          onToggleMute={() => setIsMuted(!isMuted)}
          showMute
        />
      </div>
    </div>
  );
}
