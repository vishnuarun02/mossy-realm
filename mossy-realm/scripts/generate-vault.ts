#!/usr/bin/env tsx

/**
 * Content Vault Generator for MossyRealm
 * 
 * Usage:
 *   npm run vault:generate           # Generate content
 *   npm run vault:generate -- --dry-run   # Preview without API calls
 *   npm run vault:generate -- --curate    # Remove low-quality items from existing vault
 */

import fs from 'fs';
import path from 'path';

// ============================================
// CLI FLAGS
// ============================================

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const CURATE_MODE = args.includes('--curate');

// ============================================
// ENV LOADING
// ============================================

const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length) {
            process.env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
        }
    });
}

// ============================================
// CONFIG
// ============================================

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const MODEL = 'deepseek-chat';
const TEMPERATURE = 1.3;
const MAX_RETRIES = 3;

// Type-specific timeouts (riddles/polls need more time due to structure)
const TIMEOUT_MS: Record<string, number> = {
    riddle: 90000,
    poll_seed: 90000,
    default: 60000,
};

function getTimeout(type: string): number {
    return TIMEOUT_MS[type] || TIMEOUT_MS.default;
}

if (!DEEPSEEK_API_KEY && !DRY_RUN && !CURATE_MODE) {
    console.error('❌ DEEPSEEK_API_KEY not found in .env.local');
    process.exit(1);
}

// ============================================
// TYPES
// ============================================

interface VaultItem {
    id: string;
    type: 'oddity' | 'prompt' | 'riddle' | 'whisper' | 'fortune' | 'poll_seed';
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
// BATCH SIZES & TARGETS
// ============================================

const BATCH_SIZES: Record<string, number> = {
    oddity: 10,
    prompt: 10,
    riddle: 5,
    whisper: 10,
    fortune: 10,
    poll_seed: 3,
};

const TARGET_COUNTS: Record<string, number> = {
    oddity: 60,
    prompt: 50,
    riddle: 25,
    whisper: 20,
    fortune: 15,
    poll_seed: 10,
};

// ============================================
// DYNAMIC MAX_TOKENS
// ============================================

function maxTokensFor(type: string, count: number): number {
    const base = 800;
    const perItem =
        type === 'riddle' ? 350 :
            type === 'poll_seed' ? 400 :
                250;

    return Math.min(3000, base + perItem * count);
}

// ============================================
// HARD CAPS & BLACKLIST
// ============================================

const HARD_CAPS: Record<string, number> = {
    oddity: 110,
    prompt: 130,
    'riddle.question': 180,
    'riddle.answer': 32,
    whisper: 90,
    fortune: 100,
    'poll_seed.question': 80,
    'poll_seed.option': 24,
};

const BLACKLIST = [
    'did you know', 'fun fact', 'as an ai', "in today's world",
    'here are', 'tips', 'boost', 'productivity', 'journey', 'unlock',
];

// ============================================
// DEDUPE LOGIC
// ============================================

/**
 * Normalize text for deduplication
 * - lowercase
 * - remove punctuation
 * - collapse whitespace
 */
function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Get the dedupe key for an item
 */
function getDedupeKey(item: VaultItem): string {
    if (item.riddle) {
        return normalizeText(item.riddle.question);
    }
    if (item.poll) {
        return normalizeText(item.poll.question);
    }
    return normalizeText(item.text || '');
}

// Global seen set (populated from existing vault)
const seenTexts = new Set<string>();

function isDuplicate(item: VaultItem): boolean {
    const key = getDedupeKey(item);
    if (!key || key.length < 10) return false; // Too short to dedupe reliably

    if (seenTexts.has(key)) {
        return true;
    }
    seenTexts.add(key);
    return false;
}

// ============================================
// SYSTEM PROMPT
// ============================================

const SYSTEM_PROMPT = `You generate micro-content for a whimsical forest-themed retro website called MossyRealm.

Voice: old comic-book captions, Reader's Digest odd notes, handwritten marginalia, forest-librarian humor. Slightly archaic wording is allowed if readable.

Hard bans: "Did you know", "Fun fact", "As an AI", "In today's world", emojis, hashtags, internet slang, moral lessons, self-help tone, explanations, or commentary outside JSON.

Output must be STRICT JSON only. No markdown, no extra keys, no prose outside the JSON object.`;

// ============================================
// VALIDATION
// ============================================

function containsBlacklisted(text: string): boolean {
    const lower = text.toLowerCase();
    return BLACKLIST.some(phrase => lower.includes(phrase));
}

function validateItem(item: VaultItem): boolean {
    if (!item.scores || item.scores.vibe < 7 || item.scores.cringe > 3) return false;

    if (item.text && containsBlacklisted(item.text)) return false;
    if (item.riddle?.question && containsBlacklisted(item.riddle.question)) return false;
    if (item.riddle?.answer && containsBlacklisted(item.riddle.answer)) return false;
    if (item.poll?.question && containsBlacklisted(item.poll.question)) return false;
    if (item.poll?.options?.some(o => containsBlacklisted(o))) return false;

    switch (item.type) {
        case 'oddity':
            return !!item.text && item.text.length <= HARD_CAPS.oddity;
        case 'prompt':
            return !!item.text && item.text.length <= HARD_CAPS.prompt;
        case 'whisper':
            return !!item.text && item.text.length <= HARD_CAPS.whisper;
        case 'fortune':
            return !!item.text && item.text.length <= HARD_CAPS.fortune;
        case 'riddle':
            return !!item.riddle &&
                item.riddle.question.length <= HARD_CAPS['riddle.question'] &&
                item.riddle.answer.length <= HARD_CAPS['riddle.answer'];
        case 'poll_seed':
            return !!item.poll &&
                item.poll.question.length <= HARD_CAPS['poll_seed.question'] &&
                item.poll.options.length === 4 &&
                item.poll.options.every(o => o.length <= HARD_CAPS['poll_seed.option']);
        default:
            return false;
    }
}

// ============================================
// USER PROMPT BUILDER
// ============================================

function buildUserPrompt(type: string, count: number): string {
    const specs: Record<string, string> = {
        oddity: `Generate ${count} "oddity" items. Strange forest notes — NOT educational facts.
Target: 70-100 chars, HARD CAP: 110 chars.
Examples: "The third mushroom from the left always knows more than it lets on."`,

        prompt: `Generate ${count} "prompt" items. Open-ended questions (no answers).
Target: 90-120 chars, HARD CAP: 130 chars.
Examples: "If your shadow could speak, what would it complain about?"`,

        riddle: `Generate ${count} "riddle" items. Each has question + SHORT answer.
Question: 120-160 chars, CAP: 180. Answer CAP: 32 chars.
Example: Q: "I have cities but no houses, forests but no trees." A: "A map"`,

        whisper: `Generate ${count} "whisper" items. Poetic micro-lines.
Target: 40-70 chars, HARD CAP: 90 chars.
Examples: "The moss remembers everything."`,

        fortune: `Generate ${count} "fortune" items. Ambiguous predictions (NOT spiritual/moral).
Target: 50-80 chars, HARD CAP: 100 chars.
Examples: "Thursday will explain itself eventually."`,

        poll_seed: `Generate ${count} "poll_seed" items. Question + exactly 4 short options.
Question CAP: 80 chars. Each option CAP: 24 chars.
Example: Q: "Best time to befriend a crow?" Options: ["Dawn", "Never", "During a storm", "Too late now"]`,
    };

    const schema = type === 'riddle'
        ? '{ "id": "unique_id", "type": "riddle", "riddle": { "question": "...", "answer": "..." }, "tags": ["tag1"], "scores": { "vibe": 8, "weird": 7, "cringe": 2 } }'
        : type === 'poll_seed'
            ? '{ "id": "unique_id", "type": "poll_seed", "poll": { "question": "...", "options": ["a","b","c","d"] }, "tags": ["tag1"], "scores": { "vibe": 8, "weird": 7, "cringe": 2 } }'
            : `{ "id": "unique_id", "type": "${type}", "text": "...", "tags": ["tag1"], "scores": { "vibe": 8, "weird": 7, "cringe": 2 } }`;

    return `${specs[type]}

Include quality scores for each:
- vibe (1-10): matches quirky marginalia vibe
- weird (1-10): delightfully strange
- cringe (1-10): generic/tryhard (LOWER is better)

Return JSON: { "items": [ ${schema}, ... ] }`;
}

// ============================================
// PROGRESS BAR
// ============================================

function progressBar(current: number, total: number, width = 20): string {
    const pct = Math.min(current / total, 1);
    const filled = Math.round(width * pct);
    const empty = width - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    return `[${bar}] ${current}/${total}`;
}

// ============================================
// HELPERS
// ============================================

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// ============================================
// DEEPSEEK API CALL
// ============================================

async function callDeepSeek(
    type: string,
    userPrompt: string,
    requestCount: number,
    retryCount = 0
): Promise<VaultItem[]> {
    const controller = new AbortController();
    const timeout = getTimeout(type);
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    const tokens = maxTokensFor(type, requestCount);

    const requestBody = {
        model: MODEL,
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' },
        temperature: TEMPERATURE,
        max_tokens: tokens,
    };

    console.log(`    → API: ${MODEL}, tokens: ${tokens}, timeout: ${timeout / 1000}s`);

    try {
        const response = await fetch(DEEPSEEK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
            },
            body: JSON.stringify(requestBody),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`API ${response.status}: ${error.substring(0, 150)}`);
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) throw new Error('Empty response');

        let jsonStr = content.trim();
        if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/^```json?\n?/, '').replace(/\n?```$/, '');
        }

        const parsed = JSON.parse(jsonStr);
        return parsed.items || [];

    } catch (err: unknown) {
        clearTimeout(timeoutId);

        const msg = err instanceof Error ? err.message : String(err);
        const isTimeout = err instanceof Error && err.name === 'AbortError';

        if (retryCount < MAX_RETRIES) {
            const backoff = Math.pow(2, retryCount) * 1000;
            console.log(`    ⚠️ ${isTimeout ? 'Timeout' : 'Error'}: ${msg.substring(0, 80)}`);
            console.log(`    ↻ Retry ${retryCount + 1}/${MAX_RETRIES} in ${backoff}ms`);
            await sleep(backoff);
            return callDeepSeek(type, userPrompt, requestCount, retryCount + 1);
        }

        throw new Error(`Failed after ${MAX_RETRIES} retries: ${msg}`);
    }
}

// ============================================
// VAULT FILE HELPERS
// ============================================

const VAULT_PATH = path.join(process.cwd(), 'content/vault/vault.json');

function ensureVaultDir() {
    const dir = path.dirname(VAULT_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function saveVault(vault: Vault) {
    ensureVaultDir();
    fs.writeFileSync(VAULT_PATH, JSON.stringify(vault, null, 2));
}

function loadVault(): Vault {
    if (fs.existsSync(VAULT_PATH)) {
        try {
            return JSON.parse(fs.readFileSync(VAULT_PATH, 'utf-8'));
        } catch { /* corrupted */ }
    }
    return { version: 1, generated_at: new Date().toISOString(), items: [] };
}

// ============================================
// CURATE MODE
// ============================================

function curateVault() {
    console.log('\n🧹 Curating vault...\n');

    const vault = loadVault();
    const before = vault.items.length;

    vault.items = vault.items.filter(item => validateItem(item));
    vault.generated_at = new Date().toISOString();

    const after = vault.items.length;
    const removed = before - after;

    saveVault(vault);

    console.log(`  Before: ${before} items`);
    console.log(`  Removed: ${removed} items (failed validation)`);
    console.log(`  After: ${after} items`);

    // Show counts per type
    console.log('\n  By type:');
    for (const type of Object.keys(TARGET_COUNTS)) {
        const count = vault.items.filter(i => i.type === type).length;
        const target = TARGET_COUNTS[type];
        const status = count >= target ? '✅' : '⚠️';
        console.log(`    ${status} ${type}: ${count}/${target}`);
    }

    console.log(`\n✨ Curated vault saved to ${VAULT_PATH}`);
}

// ============================================
// DRY RUN MODE
// ============================================

function dryRun() {
    console.log('\n🧪 DRY RUN MODE (no API calls)\n');

    const vault = loadVault();
    const totalTarget = Object.values(TARGET_COUNTS).reduce((a, b) => a + b, 0);

    console.log('Current vault:');
    console.log(`  Total items: ${vault.items.length}`);
    console.log(`  Last generated: ${vault.generated_at}`);

    console.log('\nWould generate:');

    let totalNeeded = 0;
    let totalBatches = 0;

    for (const [type, target] of Object.entries(TARGET_COUNTS)) {
        const existing = vault.items.filter(i => i.type === type).length;
        const needed = Math.max(0, target - existing);
        const batches = Math.ceil(needed / BATCH_SIZES[type]);

        totalNeeded += needed;
        totalBatches += batches;

        const status = needed === 0 ? '✅' : '📦';
        console.log(`  ${status} ${type}: ${existing}/${target} (need ${needed}, ~${batches} batches)`);
    }

    console.log(`\nSummary:`);
    console.log(`  Total target: ${totalTarget} items`);
    console.log(`  Currently have: ${vault.items.length} items`);
    console.log(`  Need to generate: ${totalNeeded} items`);
    console.log(`  Estimated batches: ${totalBatches}`);
    console.log(`  Est. API calls: ${totalBatches}`);
}

// ============================================
// MAIN GENERATION
// ============================================

async function generateVault() {
    console.log('\n🌿 MossyRealm Content Vault Generator\n');

    if (DRY_RUN) {
        dryRun();
        return;
    }

    if (CURATE_MODE) {
        curateVault();
        return;
    }

    console.log(`Model: ${MODEL} | Temp: ${TEMPERATURE} | Retries: ${MAX_RETRIES}`);
    console.log(`Timeouts: default ${TIMEOUT_MS.default / 1000}s, riddle/poll ${TIMEOUT_MS.riddle / 1000}s`);

    let vault = loadVault();
    const totalTarget = Object.values(TARGET_COUNTS).reduce((a, b) => a + b, 0);

    // Initialize dedupe set from existing items
    for (const item of vault.items) {
        const key = getDedupeKey(item);
        if (key && key.length >= 10) {
            seenTexts.add(key);
        }
    }
    console.log(`\nExisting: ${vault.items.length} items (${seenTexts.size} unique texts) | Target: ${totalTarget} items\n`);

    for (const [type, target] of Object.entries(TARGET_COUNTS)) {
        const existing = vault.items.filter(i => i.type === type);
        const needed = target - existing.length;

        if (needed <= 0) {
            console.log(`✅ ${type}: ${progressBar(existing.length, target)}`);
            continue;
        }

        console.log(`\n📦 ${type}: ${progressBar(existing.length, target)}`);

        const collected = [...existing];
        let batchNum = 0;

        while (collected.length < target && batchNum < 20) {
            batchNum++;
            const remaining = target - collected.length;
            const requestCount = Math.min(BATCH_SIZES[type], remaining + 3);

            console.log(`  Batch ${batchNum}: requesting ${requestCount}...`);

            try {
                const prompt = buildUserPrompt(type, requestCount);
                const items = await callDeepSeek(type, prompt, requestCount);

                let valid = 0;
                let dupes = 0;
                for (const item of items) {
                    item.type = type as VaultItem['type'];
                    item.id ||= `${type}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

                    if (!validateItem(item)) continue;

                    if (isDuplicate(item)) {
                        dupes++;
                        continue;
                    }

                    if (collected.length < target) {
                        collected.push(item);
                        valid++;
                    }
                }

                const filtered = items.length - valid - dupes;
                console.log(`    ✓ ${valid} valid, ${dupes} dupes, ${filtered} filtered`);

                // Partial save
                vault.items = vault.items.filter(i => i.type !== type).concat(collected);
                vault.generated_at = new Date().toISOString();
                saveVault(vault);

                console.log(`    ${progressBar(collected.length, target)} 💾`);

            } catch (err) {
                console.error(`    ❌ ${err}`);
            }

            if (collected.length < target) await sleep(300);
        }
    }

    // Final summary
    const finalVault = loadVault();
    console.log('\n' + '═'.repeat(50));
    console.log('📊 FINAL SUMMARY');
    console.log('═'.repeat(50));

    for (const [type, target] of Object.entries(TARGET_COUNTS)) {
        const count = finalVault.items.filter(i => i.type === type).length;
        const status = count >= target ? '✅' : '⚠️';
        console.log(`${status} ${type.padEnd(12)} ${progressBar(count, target)}`);
    }

    console.log('═'.repeat(50));
    console.log(`Total: ${finalVault.items.length} items`);
    console.log(`Saved: ${VAULT_PATH}`);
}

// ============================================
// RUN
// ============================================

generateVault().catch(err => {
    console.error('\n❌ Fatal:', err);
    process.exit(1);
});
