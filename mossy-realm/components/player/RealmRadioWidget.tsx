'use client';

import { useState, useEffect } from 'react';
import Panel from '@/components/ui/Panel';
import IconButton from '@/components/ui/IconButton';
import TextLink from '@/components/ui/TextLink';
import { usePlayerStore } from '@/lib/player/store';
import { fallbackTracks, getFeaturedTrack } from '@/data/tracks';
import { Visualizer } from './Visualizer';
import TrackStatus from './TrackStatus';
import VolumeControl from './VolumeControl';
import {
  PlayIcon,
  PauseIcon,
  PrevIcon,
  NextIcon,
  VolumeHighIcon,
  VolumeMutedIcon,
  OpenIcon,
} from './PlayerIcons';

/**
 * RealmRadioWidget - Homepage sidebar player (Cassette Deck)
 */
export function RealmRadioWidget() {
  const [mounted, setMounted] = useState(false);

  const {
    isPlaying,
    isMuted,
    volume,
    togglePlay,
    toggleMute,
    setVolume,
    nextTrack,
    prevTrack,
    getCurrentTrack,
  } = usePlayerStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const track = mounted ? getCurrentTrack() : getFeaturedTrack(fallbackTracks);

  return (
    <Panel title="-= realm radio =-">
      <div className="cassette-shell p-2 relative">
        <div className="absolute top-2 left-2 cassette-led" aria-hidden="true" />
        <div className="absolute top-2 right-2 cassette-led" aria-hidden="true" />
        <div className="absolute bottom-2 left-2 cassette-led-amber" aria-hidden="true" />
        <div className="absolute bottom-2 right-2 cassette-led-amber" aria-hidden="true" />

        <TrackStatus isPlaying={mounted && isPlaying} className="mb-2" />

        <div className="cassette-window p-2">
          <Visualizer variant="compact" />
        </div>

        <div className="cassette-label mt-2 px-2 py-2 text-center">
          <div className="font-accent text-fg-heading text-micro leading-tight break-words">
            {track.title}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-2">
          <IconButton variant="ghost" onClick={prevTrack} aria-label="Previous track">
            <PrevIcon />
          </IconButton>
          <IconButton
            variant="primary"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </IconButton>
          <IconButton variant="ghost" onClick={nextTrack} aria-label="Next track">
            <NextIcon />
          </IconButton>
          <IconButton
            variant="ghost"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            aria-pressed={isMuted}
          >
            {isMuted ? <VolumeMutedIcon /> : <VolumeHighIcon />}
          </IconButton>
        </div>

        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onSetVolume={setVolume}
          onToggleMute={toggleMute}
          className="mt-2"
        />

        <div className="mt-2 text-center">
          <TextLink
            href="/player"
            underline={false}
            className="text-xs font-nav inline-flex items-center gap-1 justify-center w-full"
          >
            open player <OpenIcon className="inline-block" />
          </TextLink>
        </div>
      </div>
    </Panel>
  );
}
