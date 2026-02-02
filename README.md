# MossyRealm

A tiny moss-covered corner of the internet. A cozy, retro-themed personal website with 90s/early 2000s Neocities aesthetic — built with modern tech, feels like a digital forest cabin.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Database:** Upstash Redis (visitor counter)
- **AI Content:** DeepSeek API (content vault generation)
- **Audio:** Zustand + Howler.js (global audio engine)
- **Music Player:** Webamp (Winamp 2.x HTML5 clone)
- **Fonts:** Google Fonts (Cinzel, Lora, Cormorant, Mystery Quest)
- **Deployment:** Vercel
- **Content:** Markdown files with inline timestamps

## Quick Start

```bash
git clone https://github.com/vishnuarun02/mossy-realm.git
cd mossyrealm/mossy-realm
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `mossy-realm/.env.local`:

```env
# Upstash Redis (for visitor counter)
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here

# DeepSeek API (for content vault generation - optional)
DEEPSEEK_API_KEY=your-deepseek-key
```

Get Upstash credentials from [Upstash Console](https://console.upstash.com/) → Create Redis Database → REST API.

Get DeepSeek API key from [DeepSeek Platform](https://platform.deepseek.com/).

**On Vercel:** Add these same variables in Dashboard → Project → Settings → Environment Variables.

## Content Systems

### Updates (Monthly Files)

Updates live in monthly markdown files:

```
mossy-realm/content/updates/
├── 2026-01.md
└── 2025-12.md
```

**File format:**

```markdown
# January 2026

- 2026-01-24T13:05:00-08:00 | Fixed "last updated" showing wrong dates.
- 2026-01-21T21:15:00-08:00 | Visitor counter is live. New poll dropped~
```

**Adding an update:**

```bash
npm run update "Your message here"
git add . && git commit -m "update" && git push
```

### Content Vault (AI-Generated)

The "Nature Fact" and "Question of the Day" widgets are powered by a pre-generated content vault:

```
mossy-realm/content/vault/vault.json
```

**Content types:** oddity, prompt, riddle, whisper, fortune, poll_seed

**Regenerating the vault:**

```bash
npm run vault:generate
```

This calls DeepSeek API to generate ~180 quirky micro-content items with old comic-book / Reader's Digest marginalia vibe. The UI never calls the LLM — it only samples from the pre-generated vault.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run update "msg"` | Add a new site update |
| `npm run vault:generate` | Regenerate content vault via DeepSeek |

## Deployment

**Vercel (recommended):**

1. Connect your GitHub repo to Vercel
2. Set root directory to `mossy-realm`
3. Add environment variables in Vercel dashboard
4. Deploy — auto-deploys on every push to `main`

## Project Structure

```
mossyrealm/
├── mossy-realm/                  # Next.js application
│   ├── app/
│   │   ├── api/visitors/         # Visitor counter API
│   │   ├── garden/               # Swamp Treasures section
│   │   ├── player/               # Webamp player page
│   │   ├── fonts.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── data/
│   │   └── tracks.ts             # Track list with R2 URLs
│   ├── components/
│   │   ├── RetroBox.tsx          # Card container
│   │   ├── ScrollBox.tsx         # Scrollable container
│   │   ├── Marquee.tsx           # Scrolling header
│   │   ├── NatureFact.tsx        # Nature fact widget (client)
│   │   ├── QuestionOfDay.tsx     # Question widget (client)
│   │   ├── VaultWidgets.tsx      # Server wrappers for vault
│   │   ├── VisitorCounter.tsx    # Redis counter
│   │   ├── SidebarLeft.tsx       # Updates, question, guardian, posts
│   │   ├── SidebarRight.tsx      # Radio, facts, polls
│   │   └── player/               # Music player components
│   │       ├── WebampPlayer.tsx      # Webamp integration
│   │       ├── RealmRadioWidget.tsx  # Homepage sidebar player
│   │       ├── RealmRadioDock.tsx    # Floating mini dock
│   │       ├── RealmRadioMobileBar.tsx
│   │       └── RealmRadioMobileSheet.tsx
│   ├── content/
│   │   ├── updates/              # Monthly update files
│   │   └── vault/                # Pre-generated content vault
│   ├── lib/
│   │   ├── updates.ts            # Updates loader
│   │   ├── vault.ts              # Vault loader + picker
│   │   ├── buildDate.ts          # Commit date helper
│   │   └── player/               # Audio engine + Zustand store
│   │       ├── store.ts              # Player state (Zustand)
│   │       └── AudioEngine.tsx       # Howler.js wrapper
│   ├── scripts/
│   │   ├── new-update.ts         # Update generator
│   │   └── generate-vault.ts     # Vault generator (DeepSeek)
│   └── public/                   # Static assets
└── design-kitchen/               # Design docs & experiments
    ├── DESIGN-JOURNAL.md         # Design decisions log
    ├── cabin-pages/              # Page templates
    └── ...
```

## Features

- Retro aesthetic with warm color palette
- Visitor counter (Upstash Redis)
- AI-generated content vault (DeepSeek)
- Monthly poll
- Scrollable update feed
- "Question of the day" with riddle support
- "Nature fact" with rotating content
- Responsive layout (3-col → 2-col → 1-col)
- Grain overlay for scanned-page feel
- "Last updated" banner from git commit date
- **Realm Radio** — Embedded Webamp player with authentic Winamp 2.x experience
  - Full player page at `/player` with Main + EQ + Playlist windows
  - Homepage sidebar widget (desktop)
  - Floating mini-dock on other routes (desktop)
  - Bottom bar/sheet on mobile
  - Audio persists across navigation

## Design Tokens

Colors in `app/globals.css`:

```css
--mossy-bg-main: #2a3f35;
--mossy-text: #f5f0e1;
--mossy-header: #ffeaa7;
--mossy-accent: #ff8c42;
--mossy-link: #90ee90;
--mossy-border: #e8a54b;
```

## Design Docs

- **[design-kitchen/DESIGN-JOURNAL.md](./design-kitchen/DESIGN-JOURNAL.md)** — Design decisions & learnings
- **[design-kitchen/cabin-pages/](./design-kitchen/cabin-pages/)** — Page templates

---

🌿 *Built with love for the old web.*
