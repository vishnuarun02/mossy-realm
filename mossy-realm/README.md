# MossyRealm

A cozy, retro-themed personal website with 90s/early 2000s Neocities aesthetic. Built with modern tech, feels like a digital forest cabin.

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| Database | Upstash Redis (visitor counter) |
| Fonts | Google Fonts (Cinzel, Lora, Cormorant, Mystery Quest) |
| Deployment | Vercel |

## Project Structure

```
mossy-realm/
├── app/
│   ├── api/
│   │   └── visitors/route.ts    # Visitor counter API
│   ├── garden/
│   │   ├── layout.tsx           # Swamp Treasures layout
│   │   ├── page.tsx             # Swamp Treasures index
│   │   └── learnings/page.tsx   # Learnings page
│   ├── fonts.ts                 # Font definitions
│   ├── globals.css              # Global styles + Tailwind
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/
│   ├── Footer.tsx               # Footer with visitor counter
│   ├── MainPanel.tsx            # Center content area
│   ├── Marquee.tsx              # Scrolling header text
│   ├── NavBar.tsx               # Main navigation
│   ├── RetroBox.tsx             # Card container component
│   ├── ScrollBox.tsx            # Scrollable container
│   ├── SidebarLeft.tsx          # Updates, guardian, latest post
│   ├── SidebarRight.tsx         # Radio, facts, polls
│   ├── SubNav.tsx               # Section sub-navigation
│   └── VisitorCounter.tsx       # Redis-powered counter
├── content/
│   └── updates/
│       ├── 2026-01.md           # Monthly update files
│       └── 2025-12.md
├── lib/
│   ├── buildDate.ts             # Last commit date helper
│   └── updates.ts               # Updates loader
├── scripts/
│   └── new-update.ts            # Update generator script
└── public/                      # Static assets
```

## Getting Started

### 1. Install dependencies

```bash
cd mossy-realm
npm install
```

### 2. Set up environment variables

Create `.env.local`:

```env
# Upstash Redis (for visitor counter)
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

Get these from [Upstash Console](https://console.upstash.com/) → Create Redis Database → REST API.

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run update "message"` | Add a new site update |

## Content System

### Updates

Updates are stored in monthly markdown files:

```
content/updates/
├── 2026-01.md
└── 2025-12.md
```

**File format:**

```markdown
# January 2026

- 2026-01-24T13:05:00-08:00 | Fixed "last updated" showing wrong dates.
- 2026-01-21T21:15:00-08:00 | Visitor counter is live. New poll dropped~
```

**Adding updates:**

```bash
npm run update "Your update message here"
# Automatically appends with current timestamp

git add . && git commit -m "update" && git push
```

The loader (`lib/updates.ts`) reads all monthly files, parses entries, sorts by date, and returns the latest 10.

## Environment Variables

### Local Development (`.env.local`)

```env
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

### Vercel (Production)

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Description |
|----------|-------------|
| `UPSTASH_REDIS_REST_URL` | Redis REST API URL |
| `UPSTASH_REDIS_REST_TOKEN` | Redis REST API token |

**Auto-provided by Vercel:**

| Variable | Description |
|----------|-------------|
| `VERCEL_GIT_COMMIT_AUTHOR_DATE` | Last commit date (used for "last updated" banner) |

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

The site auto-deploys on every push to `main`.

### Manual Build

```bash
npm run build
npm run start
```

## Key Components

| Component | Purpose |
|-----------|---------|
| `RetroBox` | The building block - bordered card container |
| `ScrollBox` | Scrollable content area with retro scrollbar |
| `Marquee` | Horizontal scrolling text header |
| `VisitorCounter` | Fetches/increments count from Redis |

## Design Tokens

Colors and fonts are defined in `app/globals.css`:

```css
--mossy-bg-main: #f5f0e1;
--mossy-text: #4a4a4a;
--mossy-header: #2d5016;
--mossy-accent: #8b4513;
--mossy-link: #6b8e23;
```

## Layout

- **Desktop:** 3-column (sidebar | main | sidebar)
- **Tablet:** 2-column
- **Mobile:** Single column stack

---

Built with love for the old web. 🌿
