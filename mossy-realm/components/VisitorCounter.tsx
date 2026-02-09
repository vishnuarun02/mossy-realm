'use client';

import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const loadCount = async () => {
      try {
        const res = await fetch('/api/visitors', { method: 'POST' });
        const data = await res.json();
        setCount(data.count ?? 0);
      } catch {
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
