'use client';

import { useEffect, useState } from 'react';

const SESSION_KEY = 'mossyrealm_visited';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const loadCount = async () => {
      // Client-side session check as first-line defense to reduce API calls
      // Server-side Redis deduplication provides the real 12h cooldown
      const hasVisitedSession = sessionStorage.getItem(SESSION_KEY);

      try {
        if (hasVisitedSession) {
          // Already counted this session - just GET the count
          const res = await fetch('/api/visitors');
          const data = await res.json();
          setCount(data.count ?? 0);
        } else {
          // First visit this session - POST to potentially increment
          const res = await fetch('/api/visitors', { method: 'POST' });
          const data = await res.json();
          setCount(data.count ?? 0);
          sessionStorage.setItem(SESSION_KEY, 'true');
        }
      } catch {
        // Fallback: try GET on POST failure
        try {
          const res = await fetch('/api/visitors');
          const data = await res.json();
          setCount(data.count ?? 0);
        } catch {
          setCount(0);
        }
      }
    };

    loadCount();
  }, []);

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
