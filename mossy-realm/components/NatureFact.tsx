'use client';

import { useState, useEffect } from 'react';
import RetroBox from './RetroBox';

interface VaultItem {
    id: string;
    type: string;
    text?: string;
    tags: string[];
}

// Fallback items (in case vault isn't loaded yet)
const FALLBACK_FACTS: VaultItem[] = [
    { id: 'f1', type: 'oddity', text: 'The third mushroom from the left always knows more than it lets on.', tags: [] },
    { id: 'f2', type: 'oddity', text: 'Squirrels have been holding meetings about you. Inconclusive so far.', tags: [] },
    { id: 'f3', type: 'oddity', text: 'Moss can hold up to 20 times its weight in water!', tags: [] },
    { id: 'f4', type: 'whisper', text: 'The moss remembers everything.', tags: [] },
    { id: 'f5', type: 'whisper', text: 'Between two midnights, a door opens.', tags: [] },
    { id: 'f6', type: 'fortune', text: 'Thursday will explain itself eventually.', tags: [] },
];

interface NatureFactProps {
    initialItems?: VaultItem[];
}

export default function NatureFact({ initialItems }: NatureFactProps) {
    const [items, setItems] = useState<VaultItem[]>(initialItems || FALLBACK_FACTS);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Pick a "random" starting index based on date (consistent for the day)
    useEffect(() => {
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        const startIndex = seed % items.length;
        setCurrentIndex(startIndex);
    }, [items.length]);

    const currentItem = items[currentIndex];

    const handleNewFact = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    // Determine display based on type
    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'oddity': return '~';
            case 'whisper': return '✧';
            case 'fortune': return '☆';
            default: return '~';
        }
    };

    return (
        <RetroBox title="{ nature fact! }">
            <div className="text-center font-body text-sm">
                <div className="text-2xl mb-2">{getTypeLabel(currentItem?.type || 'oddity')}</div>
                <p className="text-mossy-text">
                    {currentItem?.text || 'The forest holds many secrets...'}
                </p>
                <button
                    onClick={handleNewFact}
                    className="
            font-nav
            mt-3
            bg-mossy-bg-box-alt
            border-2 border-mossy-border
            px-3 py-1
            text-mossy-link
            hover:bg-mossy-border
            hover:text-mossy-bg-box
            transition-colors
            text-xs
            cursor-pointer
          "
                >
                    new fact
                </button>
            </div>
        </RetroBox>
    );
}

