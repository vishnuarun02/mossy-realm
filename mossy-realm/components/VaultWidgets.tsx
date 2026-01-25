import { getVaultItems, VaultItem } from '@/lib/vault';
import NatureFact from './NatureFact';
import QuestionOfDay from './QuestionOfDay';

/**
 * Server component that loads vault data and passes to client widgets
 */
export function NatureFactWidget() {
    // Get items from vault (server-side)
    // Weighted: oddity 70%, whisper 20%, fortune 10%
    const oddities = getVaultItems('oddity');
    const whispers = getVaultItems('whisper');
    const fortunes = getVaultItems('fortune');

    // Combine with weighting (just include more oddities)
    const items: VaultItem[] = [
        ...oddities,
        ...oddities.slice(0, Math.floor(oddities.length * 0.5)), // Extra oddities for weighting
        ...whispers,
        ...fortunes,
    ];

    // Serialize for client
    const serializedItems = items.map(item => ({
        id: item.id,
        type: item.type,
        text: item.text,
        tags: item.tags,
    }));

    return <NatureFact initialItems={serializedItems} />;
}

export function QuestionOfDayWidget() {
    // Get prompts and riddles (server-side)
    // Weighted: prompt 70%, riddle 30%
    const prompts = getVaultItems('prompt');
    const riddles = getVaultItems('riddle');

    // Combine with weighting
    const items: VaultItem[] = [
        ...prompts,
        ...prompts.slice(0, Math.floor(prompts.length * 0.4)), // Extra prompts for weighting
        ...riddles,
    ];

    // Serialize for client
    const serializedItems = items.map(item => ({
        id: item.id,
        type: item.type,
        text: item.text,
        riddle: item.riddle,
        tags: item.tags,
    }));

    return <QuestionOfDay initialItems={serializedItems} />;
}

