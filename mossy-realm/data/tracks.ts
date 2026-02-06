export interface Track {
    id: string;
    title: string;
    artist: string;
    duration: number; // in seconds
    url: string;
}

export const tracks: Track[] = [
    {
        id: 'fallen-down-reprise',
        title: 'Fallen Down (Reprise)',
        artist: 'Undertale OST',
        duration: 217, // ~3:37
        url: 'https://media.mossyrealm.space/music/fallen-down-reprise-undertale.mp3',
    },
    {
        id: 'into-the-thick-of-it',
        title: 'Into the Thick of It',
        artist: 'Secret of Mana OST',
        duration: 647, // ~10:47
        url: 'https://media.mossyrealm.space/music/into-the-thick-of-it-secret-of-mana.mp3',
    },
    {
        id: 'latikas-theme',
        title: "Latika's Theme",
        artist: 'Slumdog Millionaire OST',
        duration: 445, // ~7:25
        url: 'https://media.mossyrealm.space/music/latikas-theme-slumdog-millionaire.mp3',
    },
    {
        id: 'morning-folk-song',
        title: 'Morning Folk Song No. 3',
        artist: 'Unknown',
        duration: 82, // ~1:22
        url: 'https://media.mossyrealm.space/music/morning-folk-song-no-3.mp3',
    },
    {
        id: 'pis-lullaby',
        title: "Pi's Lullaby",
        artist: 'Life of Pi OST',
        duration: 319, // ~5:19
        url: 'https://media.mossyrealm.space/music/pis-lullaby-life-of-pi.mp3',
    },
    {
        id: 'undertale-main-theme',
        title: 'Undertale (Main Theme)',
        artist: 'Toby Fox',
        duration: 556, // ~9:16
        url: 'https://media.mossyrealm.space/music/undertale-main-theme-toby-fox.mp3',
    },
];

export const featuredTrackId = 'undertale-main-theme';

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
