# MossyRealm

A tiny moss-covered corner of the internet. A cozy, retro-themed personal website with 90s/early 2000s Neocities aesthetic — built with modern tech, feels like a digital forest cabin.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Database:** Upstash Redis (visitor counter)
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
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

Get these from [Upstash Console](https://console.upstash.com/) → Create Redis Database → REST API.

**On Vercel:** Add these same variables in Dashboard → Project → Settings → Environment Variables.

## Content System

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
cd mossy-realm
npm run update "Your message here"
git add . && git commit -m "update" && git push
```

The script appends a timestamped line to the current month's file. The loader reads all monthly files, sorts by date, and returns the latest 10.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run update "msg"` | Add a new site update |

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
│   │   ├── fonts.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── RetroBox.tsx          # Card container
│   │   ├── ScrollBox.tsx         # Scrollable container
│   │   ├── Marquee.tsx           # Scrolling header
│   │   ├── VisitorCounter.tsx    # Redis counter
│   │   ├── SidebarLeft.tsx       # Updates, guardian, posts
│   │   ├── SidebarRight.tsx      # Radio, facts, polls
│   │   └── ...
│   ├── content/updates/          # Monthly update files
│   ├── lib/
│   │   ├── updates.ts            # Updates loader
│   │   └── buildDate.ts          # Commit date helper
│   ├── scripts/
│   │   └── new-update.ts         # Update generator
│   └── public/                   # Static assets
└── design-kitchen/               # Design docs & experiments
    ├── DESIGN-JOURNAL.md         # Design decisions log
    ├── cabin-pages/              # Page templates
    └── ...
```

## Features

- Retro aesthetic with warm color palette
- Visitor counter (Upstash Redis)
- Monthly poll
- Scrollable update feed
- "Question of the day" section
- Responsive layout (3-col → 2-col → 1-col)
- Grain overlay for scanned-page feel
- "Last updated" banner from git commit date

## Design Tokens

Colors in `app/globals.css`:

```css
--mossy-bg-main: #f5f0e1;
--mossy-text: #4a4a4a;
--mossy-header: #2d5016;
--mossy-accent: #8b4513;
--mossy-link: #6b8e23;
```

## Design Docs

- **[design-kitchen/DESIGN-JOURNAL.md](./design-kitchen/DESIGN-JOURNAL.md)** — Design decisions & learnings
- **[design-kitchen/cabin-pages/](./design-kitchen/cabin-pages/)** — Page templates

---

🌿 *Built with love for the old web.*
