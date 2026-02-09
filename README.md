# MossyRealm

A tiny moss-covered corner of the internet. A cozy, retro-themed personal website with 90s/early 2000s Neocities aesthetic — built with modern tech, feels like a digital forest cabin.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Database:** Upstash Redis (visitor counter)
- **AI Content:** DeepSeek API (content vault generation)
- **Audio:** Zustand + Howler.js (global audio engine)
- **Media Storage:** Cloudflare R2 (media.mossyrealm.space)
- **Fonts:** Google Fonts (Cinzel, Lora, Cormorant, Mystery Quest)
- **Deployment:** Vercel

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

# Cloudflare R2 (for dynamic track loading)
R2_ENDPOINT=https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=mossyrealm-media
R2_PUBLIC_BASE=https://media.mossyrealm.space
R2_PREFIX=music/
```

Get Upstash credentials from [Upstash Console](https://console.upstash.com/) → Create Redis Database → REST API.

Get DeepSeek API key from [DeepSeek Platform](https://platform.deepseek.com/).

Get R2 credentials from Cloudflare Dashboard → R2 → Manage R2 API Tokens → Create API Token (with Object Read permission).

**On Vercel:** Add these same variables in Dashboard → Project → Settings → Environment Variables.

## Content Systems

### Updates (Monthly Files)

Updates live in monthly markdown files:

```
mossy-realm/content/updates/
├── 2026-02.md
├── 2026-01.md
└── 2025-12.md
```

**File format:**

```markdown
# February 2026

- 2026-02-05T22:00:00-08:00 | New post: wiring a personal site with Hostinger, Cloudflare, Vercel and R2
- 2026-02-01T22:51:16-08:00 | Realm Radio is live. Custom player at /player
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

This calls DeepSeek API to generate quirky micro-content items with old comic-book / Reader's Digest marginalia vibe. The UI never calls the LLM — it only samples from the pre-generated vault.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run update "msg"` | Add a new site update |
| `npm run vault:generate` | Regenerate content vault via DeepSeek |
| `npm run vault:dry-run` | Preview vault generation without saving |
| `npm run vault:curate` | Curate/filter vault content |

## Deployment

**Vercel (recommended):**

1. Connect your GitHub repo to Vercel
2. Set root directory to `mossy-realm`
3. Add environment variables in Vercel dashboard
4. Deploy — auto-deploys on every push to `main`

## Site Structure

```
Outpost (/)                      # Home
My Cabin                         # Personal / Interior
├── /cabin/about                 # About me, background
├── /cabin/now                   # Currently reading/listening/working
├── /cabin/crafting-table        # Projects, wins, proof of work
├── /cabin/recipes               # Things I cook
└── /cabin/contact               # Ways to reach me
Fieldwork                        # Thinking / Documenting
├── /fieldwork/learnings         # Long-form writing
├── /fieldwork/experiments       # Prototypes, half-baked ideas
├── /fieldwork/field-notes       # Shorter observations
└── /fieldwork/gallery           # Visual field notes
Crossroads                       # Outward / Community
├── /crossroads/rabbit-holes     # Curated links
├── /crossroads/guestbook        # Visitor signatures
└── /crossroads/credits          # Acknowledgements
Archives                         # Condensed Collections
├── /archives/collected          # Pixel art, gifs, clippings
├── /archives/changelog          # Site updates log
└── /archives/sitemap            # Full site map
```

## Project Structure

```
mossyrealm/
├── mossy-realm/                  # Next.js application
│   ├── app/
│   │   ├── api/
│   │   │   ├── tracks/           # Dynamic R2 track listing API
│   │   │   └── visitors/         # Visitor counter API
│   │   ├── cabin/                # My Cabin section
│   │   │   ├── about/
│   │   │   ├── now/
│   │   │   ├── crafting-table/
│   │   │   ├── recipes/
│   │   │   └── contact/
│   │   ├── fieldwork/            # Fieldwork section
│   │   │   ├── learnings/
│   │   │   ├── experiments/
│   │   │   ├── field-notes/
│   │   │   └── gallery/
│   │   ├── crossroads/           # Crossroads section
│   │   │   ├── rabbit-holes/
│   │   │   ├── guestbook/
│   │   │   └── credits/
│   │   ├── archives/             # Archives section
│   │   │   ├── collected/
│   │   │   ├── changelog/
│   │   │   └── sitemap/
│   │   ├── player/               # Full player page
│   │   ├── fonts.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── data/
│   │   └── tracks.ts             # Fallback tracks + utils
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
│   │       ├── RealmRadioWidget.tsx  # Homepage sidebar player
│   │       ├── RealmRadioDock.tsx    # Floating mini dock
│   │       ├── RealmRadioMobileBar.tsx
│   │       ├── RealmRadioMobileSheet.tsx
│   │       ├── Visualizer.tsx        # Canvas-based EQ visualizer
│   │       └── PlayerIcons.tsx       # SVG/ASCII player icons
│   ├── content/
│   │   ├── updates/              # Monthly update files
│   │   └── vault/                # Pre-generated content vault
│   ├── lib/
│   │   ├── updates.ts            # Updates loader
│   │   ├── vault.ts              # Vault loader + picker
│   │   ├── visitors.ts           # Visitor ID derivation + hashing
│   │   ├── buildDate.ts          # Commit date helper
│   │   ├── tracks.ts             # Track types + API fetcher
│   │   └── player/               # Audio engine + Zustand store
│   │       ├── store.ts              # Player state (Zustand + persist)
│   │       ├── AudioEngine.tsx       # Howler.js controller
│   │       ├── globalAudio.ts        # Global Howl singleton
│   │       └── audioContext.ts       # Web Audio API (Howler integration)
│   ├── __tests__/                # Unit tests (Vitest)
│   │   ├── vault.test.ts             # Weighted random picker tests
│   │   ├── store.test.ts             # Player store tests
│   │   └── visitors.test.ts          # Visitor ID tests
│   ├── scripts/
│   │   ├── new-update.ts         # Update generator
│   │   └── generate-vault.ts     # Vault generator (DeepSeek)
│   ├── public/
│   │   ├── images/blog/          # Blog post images
│   │   └── ...                   # Static assets
│   └── CONTENT_STYLE.md          # Content writing guidelines
└── design-kitchen/               # Design docs & experiments
    ├── DESIGN-JOURNAL.md         # Design decisions log
    ├── cabin-pages/              # Page templates
    └── ...
```

## Features

- Retro aesthetic with warm color palette
- **Dropdown navigation** with 5 top-level sections (mobile accordion)
- Visitor counter (Upstash Redis)
- AI-generated content vault (DeepSeek)
- Monthly poll
- Scrollable update feed
- "Question of the day" with riddle support
- "Nature fact" with rotating content
- Responsive layout (3-col → 2-col → 1-col)
- Grain overlay for scanned-page feel
- "Last updated" banner from git commit date
- **Realm Radio** — Custom unified audio player
  - **Cassette deck design** with 90s hardware aesthetic (LEDs, tape reels, inset panels)
  - Global audio engine (Howler.js + Web Audio API) persists across navigation
  - **Dynamic track loading** from R2 via `/api/tracks` (drop mp3s in bucket → auto-appear)
  - Supports `.mp3`, `.m4a`, `.wav`, `.ogg`, `.flac`, `.aac`
  - Full player page at `/player` with playlist and visualizer
  - Homepage sidebar widget (desktop)
  - Floating mini-dock on other routes (desktop)
  - Bottom bar/sheet on mobile
  - **Audio-synced visualizer** with spinning tape reels and LED level meter
  - Track state synced across all UI components
- **Visitor counter** with 12h cooldown (IP/UA hash + Redis deduplication)
- **Unit tests** with Vitest

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
- **[mossy-realm/CONTENT_STYLE.md](./mossy-realm/CONTENT_STYLE.md)** — Content writing guidelines

---

Built with love for the old web.
