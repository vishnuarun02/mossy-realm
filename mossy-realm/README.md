# MossyRealm (App)

The frontend application for **MossyRealm** - a cozy, retro-themed corner of the internet.

## 🌿 Concept

A digital garden designed with the warmth of 90s/early 2000s personal websites. It invites visitors to slow down, read, and explore.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS (with custom configuration)
- **Fonts:** Google Fonts via `next/font` (Cinzel, Lora, Cormorant, Mystery Quest)
- **Icons:** React Icons / Lucide React

## ✨ Key Features

- **Retro Aesthetic:** Custom borders, warm color palettes, and pixelated vibes.
- **Dynamic Components:**
    - `Marquee.tsx`: Flowing header text.
    - `ScrollBox.tsx`: Custom scrollbars for content areas.
    - `RetroBox.tsx`: The building block for the card-based layout.
- **Responsive Layout:**
    - Desktop: 3-column layout.
    - Tablet: 2-column layout.
    - Mobile: Stacked layout.

## 📂 Project Structure

```
mossy-realm/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout with fonts & metadata
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles & Tailwind directives
├── components/           # UI Components
│   ├── Marquee.tsx       # Scrolling header text
│   ├── RetroBox.tsx      # Standard content container
│   ├── ScrollBox.tsx     # Container with custom scrollbar
│   ├── SidebarLeft.tsx   # Updates & Navigation
│   ├── SidebarRight.tsx  # Radio, Facts, Polls
│   └── ...
├── lib/                  # Utility functions
│   └── buildDate.ts      # Build time helper
└── public/               # Static assets & images
```

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Customization

- **Colors:** Defined in `tailwind.config.ts` (e.g., `mossy-bg`, `mossy-text`).
- **Fonts:** Defined in `app/fonts.ts` and `app/globals.css`.

