export interface Track {
    id: string;
    title: string;
    artist: string;
    duration: number; // in seconds
    url: string;
}

export const tracks: Track[] = [
    {
        id: 'forest-lullaby',
        title: 'Forest Lullaby',
        artist: 'realm keeper',
        duration: 242, // 4:02
        url: 'https://media.mossyrealm.space/music/forest-lullaby.mp3',
    },
    {
        id: 'midnight-moss',
        title: 'Midnight Moss',
        artist: 'realm keeper',
        duration: 225, // 3:45
        url: 'https://media.mossyrealm.space/music/midnight-moss.mp3',
    },
    {
        id: 'dewdrop-dance',
        title: 'Dewdrop Dance',
        artist: 'realm keeper',
        duration: 321, // 5:21
        url: 'https://media.mossyrealm.space/music/dewdrop-dance.mp3',
    },
    {
        id: 'mushroom-kingdom',
        title: 'Mushroom Kingdom',
        artist: 'realm keeper',
        duration: 178, // 2:58
        url: 'https://media.mossyrealm.space/music/mushroom-kingdom.mp3',
    },
];

export const featuredTrackId = 'forest-lullaby';

export function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getTrackById(id: string): Track | undefined {
    return tracks.find((t) => t.id === id);
}

export function getFeaturedTrack(): Track {
    return getTrackById(featuredTrackId) || tracks[0];
}

