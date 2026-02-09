import fs from 'fs';
import path from 'path';

// ============================================
// TYPES
// ============================================

export type VaultItemType = 'oddity' | 'prompt' | 'riddle' | 'whisper' | 'fortune' | 'poll_seed';

export interface VaultItem {
    id: string;
    type: VaultItemType;
    text?: string;
    riddle?: { question: string; answer: string };
    poll?: { question: string; options: [string, string, string, string] };
    tags: string[];
    scores: { vibe: number; weird: number; cringe: number };
}

interface Vault {
    version: number;
    generated_at: string;
    items: VaultItem[];
}

// ============================================
// FALLBACK DATA (used if vault.json missing)
// ============================================

const FALLBACK_ITEMS: VaultItem[] = [
    // Oddities
    {
        id: 'fallback_oddity_1',
        type: 'oddity',
        text: 'The third mushroom from the left always knows more than it lets on.',
        tags: ['mushroom', 'mystery'],
        scores: { vibe: 8, weird: 7, cringe: 1 },
    },
    {
        id: 'fallback_oddity_2',
        type: 'oddity',
        text: 'Squirrels have been holding meetings about you. Inconclusive so far.',
        tags: ['squirrel', 'conspiracy'],
        scores: { vibe: 9, weird: 8, cringe: 1 },
    },
    {
        id: 'fallback_oddity_3',
        type: 'oddity',
        text: 'Moss can hold up to 20 times its weight in water! That\'s why forests stay so cool and misty.',
        tags: ['moss', 'nature'],
        scores: { vibe: 7, weird: 3, cringe: 2 },
    },
    // Prompts
    {
        id: 'fallback_prompt_1',
        type: 'prompt',
        text: 'If your shadow could speak, what would it complain about?',
        tags: ['shadow', 'introspection'],
        scores: { vibe: 8, weird: 6, cringe: 1 },
    },
    {
        id: 'fallback_prompt_2',
        type: 'prompt',
        text: 'What would you tell the version of yourself from three Tuesdays ago?',
        tags: ['time', 'reflection'],
        scores: { vibe: 8, weird: 5, cringe: 2 },
    },
    {
        id: 'fallback_prompt_3',
        type: 'prompt',
        text: 'Would you climb Mount Everest if no one else in the world knew that you did?',
        tags: ['achievement', 'meaning'],
        scores: { vibe: 9, weird: 4, cringe: 1 },
    },
    // Riddles
    {
        id: 'fallback_riddle_1',
        type: 'riddle',
        riddle: {
            question: 'I have cities but no houses, forests but no trees, water but no fish. What am I?',
            answer: 'A map',
        },
        tags: ['classic', 'geography'],
        scores: { vibe: 7, weird: 5, cringe: 2 },
    },
    {
        id: 'fallback_riddle_2',
        type: 'riddle',
        riddle: {
            question: 'The more you take, the more you leave behind. What am I?',
            answer: 'Footsteps',
        },
        tags: ['classic', 'movement'],
        scores: { vibe: 7, weird: 4, cringe: 2 },
    },
    // Whispers
    {
        id: 'fallback_whisper_1',
        type: 'whisper',
        text: 'The moss remembers everything.',
        tags: ['moss', 'memory'],
        scores: { vibe: 9, weird: 6, cringe: 1 },
    },
    {
        id: 'fallback_whisper_2',
        type: 'whisper',
        text: 'Between two midnights, a door opens.',
        tags: ['time', 'mystery'],
        scores: { vibe: 8, weird: 7, cringe: 1 },
    },
    // Fortunes
    {
        id: 'fallback_fortune_1',
        type: 'fortune',
        text: 'Thursday will explain itself eventually.',
        tags: ['time', 'patience'],
        scores: { vibe: 8, weird: 6, cringe: 1 },
    },
    {
        id: 'fallback_fortune_2',
        type: 'fortune',
        text: 'An unexpected envelope will cause mild confusion.',
        tags: ['mail', 'surprise'],
        scores: { vibe: 8, weird: 5, cringe: 2 },
    },
    // Poll seeds
    {
        id: 'fallback_poll_1',
        type: 'poll_seed',
        poll: {
            question: 'Best time to befriend a crow?',
            options: ['Dawn', 'Never', 'During a storm', 'Too late now'],
        },
        tags: ['crow', 'timing'],
        scores: { vibe: 9, weird: 7, cringe: 1 },
    },
];

// ============================================
// VAULT LOADER
// ============================================

let cachedVault: Vault | null = null;

function loadVault(): Vault {
    if (cachedVault) return cachedVault;

    const vaultPath = path.join(process.cwd(), 'content/vault/vault.json');

    try {
        if (fs.existsSync(vaultPath)) {
            const content = fs.readFileSync(vaultPath, 'utf-8');
            cachedVault = JSON.parse(content) as Vault;
            return cachedVault;
        }
    } catch (err) {
        console.warn('Failed to load vault.json, using fallback:', err);
    }

    // Return fallback vault
    cachedVault = {
        version: 0,
        generated_at: 'fallback',
        items: FALLBACK_ITEMS,
    };
    return cachedVault;
}

// ============================================
// GETTERS
// ============================================

/**
 * Get all items of a specific type
 */
export function getVaultItems(type: VaultItemType): VaultItem[] {
    const vault = loadVault();
    return vault.items.filter(item => item.type === type);
}

/**
 * Get a random item of a specific type
 * Optional seed for deterministic selection (e.g., based on date)
 */
export function getRandomVaultItem(type: VaultItemType, seed?: number): VaultItem | null {
    const items = getVaultItems(type);
    if (items.length === 0) return null;

    const index = seed !== undefined
        ? Math.abs(seed) % items.length
        : Math.floor(Math.random() * items.length);

    return items[index];
}

/**
 * Get next item after a given ID (for cycling through without repeats)
 */
export function getNextVaultItem(type: VaultItemType, lastId: string | null): VaultItem | null {
    const items = getVaultItems(type);
    if (items.length === 0) return null;

    if (!lastId) {
        return items[0];
    }

    const currentIndex = items.findIndex(item => item.id === lastId);
    const nextIndex = (currentIndex + 1) % items.length;
    return items[nextIndex];
}

/**
 * Get a random item with weighted type selection
 * weights: { oddity: 70, whisper: 20, fortune: 10 }
 */
export function getWeightedRandomItem(
    weights: Partial<Record<VaultItemType, number>>,
    seed?: number
): VaultItem | null {
    const entries = Object.entries(weights) as [VaultItemType, number][];
    if (entries.length === 0) return null;
    const totalWeight = entries.reduce((sum, [, w]) => sum + w, 0);
    if (totalWeight <= 0) return null;

    const rand = seed !== undefined
        ? (Math.abs(seed) % 100) / 100
        : Math.random();

    let cumulative = 0;
    for (const [type, weight] of entries) {
        cumulative += weight / totalWeight;
        if (rand < cumulative) {
            return getRandomVaultItem(type, seed);
        }
    }

    // Fallback to first type
    return getRandomVaultItem(entries[0][0], seed);
}

/**
 * Get today's seed (for consistent daily content)
 */
export function getTodaySeed(): number {
    const now = new Date();
    return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

/**
 * Get vault metadata
 */
export function getVaultInfo(): { itemCount: number; generatedAt: string; version: number } {
    const vault = loadVault();
    return {
        itemCount: vault.items.length,
        generatedAt: vault.generated_at,
        version: vault.version,
    };
}
