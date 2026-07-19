'use client';

import { useState, useEffect } from 'react';
import RetroBox from './RetroBox';
import Button from './ui/Button';

interface VaultItem {
    id: string;
    type: string;
    text?: string;
    riddle?: { question: string; answer: string };
    tags: string[];
}

// Fallback items
const FALLBACK_QUESTIONS: VaultItem[] = [
    { id: 'q1', type: 'prompt', text: 'Would you climb Mount Everest if no one else in the world knew that you did?', tags: [] },
    { id: 'q2', type: 'prompt', text: 'If your shadow could speak, what would it complain about?', tags: [] },
    { id: 'q3', type: 'prompt', text: 'What would you tell the version of yourself from three Tuesdays ago?', tags: [] },
    { id: 'q4', type: 'riddle', riddle: { question: 'I have cities but no houses, forests but no trees, water but no fish. What am I?', answer: 'A map' }, tags: [] },
    { id: 'q5', type: 'riddle', riddle: { question: 'The more you take, the more you leave behind. What am I?', answer: 'Footsteps' }, tags: [] },
];

interface QuestionOfDayProps {
    initialItems?: VaultItem[];
}

export default function QuestionOfDay({ initialItems }: QuestionOfDayProps) {
    const [items] = useState<VaultItem[]>(initialItems || FALLBACK_QUESTIONS);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Pick a "random" starting index based on date
    useEffect(() => {
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        // Offset by 42 so it's different from NatureFact
        const startIndex = (seed + 42) % items.length;
        setCurrentIndex(startIndex);
        setMounted(true);
    }, [items.length]);

    const currentItem = currentIndex !== null ? items[currentIndex] : null;
    const isRiddle = currentItem?.type === 'riddle';

    const handleNewQuestion = () => {
        setCurrentIndex((prev) => ((prev ?? 0) + 1) % items.length);
        setShowAnswer(false);
    };

    const questionText = isRiddle
        ? currentItem?.riddle?.question
        : currentItem?.text;

    // Show placeholder during hydration to avoid mismatch
    if (!mounted) {
        return (
            <RetroBox title="[ question of the day ]">
                <div className="text-center font-body text-sm px-1">
                    <p className="text-fg-secondary italic leading-relaxed">
                        pondering...
                    </p>
                </div>
            </RetroBox>
        );
    }

    return (
        <RetroBox title="[ question of the day ]">
            <div className="text-center font-body text-sm px-1">
                <p className="text-fg-primary italic leading-relaxed">
                    &quot;{questionText || 'What mysteries await?'}&quot;
                </p>

                {/* Riddle answer reveal */}
                {isRiddle && (
                    <div className="mt-2">
                        {showAnswer ? (
                            <p className="text-accent text-xs">
                                Answer: {currentItem?.riddle?.answer}
                            </p>
                        ) : (
                            <button
                                onClick={() => setShowAnswer(true)}
                                className="
                                    text-fg-secondary text-xs
                                    underline hover:text-link
                                    cursor-pointer
                                "
                            >
                                peek answer
                            </button>
                        )}
                    </div>
                )}

                <div className="mt-3 text-accent text-xs">
                    ~ food for thought ~
                </div>

                <Button variant="ghost" size="sm" onClick={handleNewQuestion} className="mt-2 text-xs">
                    new question
                </Button>
            </div>
        </RetroBox>
    );
}

