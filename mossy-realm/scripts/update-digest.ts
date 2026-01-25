#!/usr/bin/env tsx

/**
 * AI Update Digest Generator for MossyRealm
 * 
 * Collects commits since last run, sends to DeepSeek,
 * returns ONE short update line in MossyRealm voice.
 * 
 * Usage: npm run update:digest
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

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
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";
const MODEL = "deepseek-chat";
const MAX_CHARS = 140;

const STATE_PATH = path.join(process.cwd(), "content/updates/.state.json");
const UPDATES_DIR = path.join(process.cwd(), "content/updates");

// ============================================
// HELPERS
// ============================================

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function loadState(): { last_commit: string } {
  try {
    return JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
  } catch {
    return { last_commit: "" };
  }
}

function saveState(state: { last_commit: string }) {
  ensureDir(path.dirname(STATE_PATH));
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

function getLocalIsoWithOffset(d = new Date()) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  const ss = pad(d.getSeconds());

  const offsetMin = -d.getTimezoneOffset();
  const sign = offsetMin >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMin);
  const oh = pad(Math.floor(abs / 60));
  const om = pad(abs % 60);

  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}${sign}${oh}:${om}`;
}

function currentMonthFile() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return path.join(UPDATES_DIR, `${yyyy}-${mm}.md`);
}

function git(cmd: string) {
  return execSync(cmd, { stdio: ["ignore", "pipe", "pipe"] }).toString("utf8").trim();
}

function getNewCommitsSince(lastCommit: string) {
  // only commit subjects (short). keeps prompts small + prevents LLM from inventing details.
  // excludes merge commits by default to reduce noise.
  const range = lastCommit ? `${lastCommit}..HEAD` : "HEAD~10..HEAD"; // limit initial batch
  try {
    const out = git(`git log ${range} --no-merges --pretty=format:%H:::%s`);
    if (!out) return [];
    return out
      .split("\n")
      .map((line) => {
        const [hash, subject] = line.split(":::");
        return { hash, subject: (subject || "").trim() };
      })
      .filter((c) => c.subject.length > 0);
  } catch {
    return [];
  }
}

// ============================================
// LOCAL RULES ENFORCEMENT
// ============================================

function enforceLocalRules(text: string) {
  const t = text.trim();

  // hard bans (same vibe rules as vault)
  const banned = [
    "did you know",
    "fun fact",
    "as an ai",
    "in today's world",
    "#",
    "😊",
    "😂",
    "✨",
    "🔥",
  ];
  const lower = t.toLowerCase();
  if (banned.some((b) => lower.includes(b))) return null;

  // no emojis (quick heuristic)
  if (/[\u{1F300}-\u{1FAFF}]/u.test(t)) return null;

  // strict cap
  if (t.length > MAX_CHARS) return null;

  // avoid ending with a colon / unfinished vibe
  if (t.endsWith(":")) return null;

  return t;
}

// ============================================
// DEEPSEEK API CALL
// ============================================

async function callDeepSeek(commits: string[]) {
  if (!DEEPSEEK_API_KEY) {
    throw new Error("DEEPSEEK_API_KEY missing (set it in .env.local or env)");
  }

  const system = [
    "You write ONE short update line for a whimsical forest website called MossyRealm.",
    "Voice: old comic-book captions + Reader's Digest odd-note energy. Slightly archaic is fine. Keep it readable.",
    "Hard rules:",
    `- output MUST be <= ${MAX_CHARS} characters`,
    "- no emojis, no hashtags",
    '- no "Did you know", "Fun fact", educational tone',
    "- no filler, no moral lessons, no explanations",
    "- do NOT mention 'commit', 'git', 'PR', 'refactor' explicitly unless absolutely needed",
    "- you MUST only use details that appear in the provided commit subjects; do not invent features",
    'Return JSON only: {"text":"..."}',
  ].join("\n");

  const user = [
    "Write one MossyRealm-style update that summarizes these changes:",
    ...commits.map((c) => `- ${c}`),
    "",
    "Remember: ONE line. No lists in output. JSON only.",
  ].join("\n");

  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    response_format: { type: "json_object" },
    temperature: 1.1,
    max_tokens: 500, // we only need a tiny response
  };

  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DeepSeek API error ${res.status}: ${text.slice(0, 250)}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("No content returned");

  let parsed: { text?: string };
  try {
    parsed = JSON.parse(content);
  } catch {
    // sometimes models wrap in ```json ... ```
    const cleaned = content.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    parsed = JSON.parse(cleaned);
  }

  return String(parsed.text || "").trim();
}

// ============================================
// MAIN
// ============================================

async function main() {
  console.log("\n🌿 MossyRealm Update Digest\n");

  ensureDir(UPDATES_DIR);

  const state = loadState();
  console.log(`Last processed commit: ${state.last_commit || "(none)"}`);

  const commits = getNewCommitsSince(state.last_commit);

  if (commits.length === 0) {
    console.log("No new commits to summarize. Exiting.");
    return;
  }

  console.log(`Found ${commits.length} new commit(s):`);
  commits.slice(0, 5).forEach((c) => console.log(`  - ${c.subject}`));
  if (commits.length > 5) console.log(`  ... and ${commits.length - 5} more`);

  // keep prompt small + prevent "wordy BS"
  const subjects = commits.map((c) => c.subject).slice(0, 12);

  let text = "";
  for (let attempt = 1; attempt <= 4; attempt++) {
    console.log(`\nAttempt ${attempt}/4: calling DeepSeek...`);
    const draft = await callDeepSeek(subjects);
    console.log(`  Draft: "${draft}"`);

    const ok = enforceLocalRules(draft);
    if (ok) {
      text = ok;
      console.log(`  ✓ Passed rules check`);
      break;
    }
    console.log(`  ✗ Rejected (rule or length), retrying...`);
  }

  if (!text) {
    // fallback: non-AI but accurate
    console.log("\nFallback: using commit subjects directly");
    const top = subjects.slice(0, 3).join(" · ");
    text = top.length <= MAX_CHARS ? top : top.slice(0, MAX_CHARS - 1);
  }

  const ts = getLocalIsoWithOffset();
  const line = `- ${ts} | ${text}`;

  const file = currentMonthFile();
  const existing = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : `# ${new Date().toLocaleString('en-US', { month: 'long' })} ${new Date().getFullYear()}\n\n`;
  
  // Append the new line
  fs.writeFileSync(file, existing + line + "\n");

  // update state to latest commit hash we processed (the newest one in git log output is first)
  saveState({ last_commit: commits[0].hash });

  console.log(`\n✨ Wrote update → ${path.relative(process.cwd(), file)}`);
  console.log(`   ${line}`);
}

main().catch((e) => {
  console.error(`\n❌ Update digest failed: ${e?.message || e}`);
  process.exit(1);
});

