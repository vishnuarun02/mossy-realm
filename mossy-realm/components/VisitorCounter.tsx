'use client';

import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    // Check if we've already counted this session
    const hasVisited = sessionStorage.getItem('mossyrealm_visited');

    if (!hasVisited && !hasIncremented) {
      // First visit this session - increment counter
      fetch('/api/visitors', { method: 'POST' })
        .then((res) => res.json())
        .then((data) => {
          setCount(data.count);
          sessionStorage.setItem('mossyrealm_visited', 'true');
          setHasIncremented(true);
        })
        .catch(() => setCount(0));
    } else {
      // Already visited - just get count
      fetch('/api/visitors')
        .then((res) => res.json())
        .then((data) => setCount(data.count))
        .catch(() => setCount(0));
    }
  }, [hasIncremented]);

  // Format number with leading zeros for that retro vibe
  const formatCount = (num: number) => {
    return num.toString().padStart(6, '0');
  };

  return (
    <span className="text-mossy-text-muted font-body">
      ● visitors:{' '}
      <span className="text-mossy-header font-bold">
        {count !== null ? formatCount(count) : '------'}
      </span>
    </span>
  );
}

