'use client';

import { useState, useEffect } from 'react';
import RetroBox from './RetroBox';

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
    const [items, setItems] = useState<VaultItem[]>(initialItems || FALLBACK_QUESTIONS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    // Pick a "random" starting index based on date
    useEffect(() => {
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        // Offset by 42 so it's different from NatureFact
        const startIndex = (seed + 42) % items.length;
        setCurrentIndex(startIndex);
    }, [items.length]);

    const currentItem = items[currentIndex];
    const isRiddle = currentItem?.type === 'riddle';

    const handleNewQuestion = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setShowAnswer(false);
    };

    const questionText = isRiddle
        ? currentItem.riddle?.question
        : currentItem?.text;

    return (
        <RetroBox title="[ question of the day ]">
            <div className="text-center font-body text-sm px-1">
                <p className="text-mossy-text italic leading-relaxed">
                    &quot;{questionText || 'What mysteries await?'}&quot;
                </p>

                {/* Riddle answer reveal */}
                {isRiddle && (
                    <div className="mt-2">
                        {showAnswer ? (
                            <p className="text-mossy-accent text-xs">
                                Answer: {currentItem.riddle?.answer}
                            </p>
                        ) : (
                            <button
                                onClick={() => setShowAnswer(true)}
                                className="
                  text-mossy-text-muted text-xs
                  underline hover:text-mossy-link
                  cursor-pointer
                "
                            >
                                peek answer
                            </button>
                        )}
                    </div>
                )}

                <div className="mt-3 text-mossy-accent text-xs">
                    ~ food for thought ~
                </div>

                <button
                    onClick={handleNewQuestion}
                    className="
            font-nav
            mt-2
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
                    new question
                </button>
            </div>
        </RetroBox>
    );
}

