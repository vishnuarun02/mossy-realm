# MossyRealm

A tiny moss-covered corner of the internet. A forest realm stitched together by curiosity and wandering.

## About

MossyRealm is a personal website built with a 90s/early 2000s Neocities aesthetic. It features a cozy, whimsical design inspired by old-school personal homepages, but built with modern tech.

**Live site:** [mossyrealm.vercel.app](https://mossyrealm.vercel.app) *(or your domain)*

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Database:** Upstash Redis (visitor counter)
- **Fonts:** Google Fonts (Cinzel, Lora, Cormorant, Mystery Quest)
- **Deployment:** Vercel

## Repository Structure

```
mossyrealm/
├── mossy-realm/          # Next.js application
│   ├── app/              # Pages & API routes
│   ├── components/       # React components
│   ├── content/          # Markdown content (updates)
│   ├── lib/              # Utilities
│   ├── scripts/          # Helper scripts
│   └── public/           # Static assets
└── design-kitchen/       # Design docs & experiments
    ├── DESIGN-JOURNAL.md # Design decisions log
    ├── cabin-pages/      # Page design templates
    └── ...               # Experiment archives
```

## Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/mossyrealm.git
cd mossyrealm/mossy-realm

# Install dependencies
npm install

# Set up environment (see mossy-realm/README.md for details)
cp .env.example .env.local
# Edit .env.local with your Upstash Redis credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Updates

```bash
cd mossy-realm
npm run update "Your update message here"
git add . && git commit -m "update" && git push
```

## Documentation

- **[mossy-realm/README.md](./mossy-realm/README.md)** - Full app documentation
- **[design-kitchen/README.md](./design-kitchen/README.md)** - Design system & references
- **[design-kitchen/DESIGN-JOURNAL.md](./design-kitchen/DESIGN-JOURNAL.md)** - Design decisions & learnings

## Features

- Retro aesthetic with warm color palette
- Visitor counter (Upstash Redis)
- Monthly poll
- Scrollable update feed
- "Question of the day" section
- Responsive 3-column layout
- Grain overlay effect for that scanned-page feel

## License

Personal project - feel free to take inspiration!

---

🌿 *Built with love for the old web.*
