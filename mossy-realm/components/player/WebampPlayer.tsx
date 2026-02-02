'use client';

import { useEffect, useState } from 'react';
import { tracks } from '@/data/tracks';

export function WebampPlayer() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let container: HTMLDivElement | null = null;
        let cancelled = false;

        const init = async () => {
            try {
                // kill any leftovers
                document.getElementById('webamp')?.remove();
                document.getElementById('webamp-root')?.remove();

                // create a neutral overlay
                container = document.createElement('div');
                container.id = 'webamp-root';
                container.style.position = 'fixed';
                container.style.inset = '0';
                container.style.zIndex = '9999';
                container.style.pointerEvents = 'none';
                document.body.appendChild(container);

                // wait for DOM to settle
                await new Promise(r => setTimeout(r, 50));
                if (cancelled) return;

                window.scrollTo(0, 0);

                const Webamp = (await import('webamp')).default;
                if (cancelled) return;

                if (!Webamp.browserIsSupported()) {
                    setIsLoading(false);
                    return;
                }

                const mainWidth = 275;
                const mainHeight = 116;
                const eqHeight = 116;
                const playlistHeight = 150;
                const totalHeight = mainHeight + eqHeight + playlistHeight;

                // calculate center of viewport
                const vw = window.innerWidth;
                const vh = window.innerHeight;
                const spawnX = Math.floor((vw - mainWidth) / 2);
                const spawnY = Math.floor((vh - totalHeight) / 2);

                const webamp = new Webamp({
                    initialTracks: tracks.map((t) => ({
                        metaData: { artist: t.artist, title: t.title },
                        url: t.url,
                        duration: t.duration,
                    })),
                    initialSkin: {
                        url: '/skins/Zelda_Amp_3.wsz',
                    },
                    enableHotkeys: true,
                    __initialWindowLayout: {
                        main: { position: { x: spawnX, y: spawnY } },
                        equalizer: { position: { x: spawnX, y: spawnY + mainHeight } },
                        playlist: {
                            position: { x: spawnX, y: spawnY + mainHeight + eqHeight },
                            size: [mainWidth, playlistHeight],
                        },
                    },
                } as ConstructorParameters<typeof Webamp>[0]);

                // ensure container still exists
                const mountTarget = document.getElementById('webamp-root');
                if (!mountTarget || cancelled) return;

                await webamp.renderWhenReady(mountTarget);
                if (cancelled) return;

                // enable pointer events on webamp
                const root = document.getElementById('webamp');
                if (root) {
                    root.style.pointerEvents = 'auto';
                }

                setIsLoading(false);
            } catch (err) {
                console.error('Webamp init failed:', err);
                if (!cancelled) setIsLoading(false);
            }
        };

        init();

        return () => {
            cancelled = true;
            // just remove DOM - don't call dispose, it throws
            document.getElementById('webamp')?.remove();
            document.getElementById('webamp-root')?.remove();
            container = null;
        };
    }, []);

    if (isLoading) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'var(--mossy-bg-box)',
                    border: '3px solid var(--mossy-border)',
                    padding: '20px 30px',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '14px',
                    color: 'var(--mossy-link)',
                    zIndex: 10000,
                }}
            >
                Loading...
            </div>
        );
    }

    return null;
}
