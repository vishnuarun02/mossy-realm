'use client';

import dynamic from 'next/dynamic';

const WebampPlayer = dynamic(
  () => import('@/components/player/WebampPlayer').then((mod) => mod.WebampPlayer),
  { ssr: false }
);

export default function PlayerPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <WebampPlayer />
    </div>
  );
}
