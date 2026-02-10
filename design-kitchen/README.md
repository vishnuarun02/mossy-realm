# 🎨 Design Kitchen

This folder contains all the design exploration and references for **MossyRealm**.

Think of it like a Figma workspace - but in HTML files you can open in any browser!

> 📓 **New!** Check out [`DESIGN-JOURNAL.md`](./DESIGN-JOURNAL.md) for lessons learned, failed experiments, and ideas for the future!

---

## 📁 Folder Structure

```
design-kitchen/
├── DESIGN-JOURNAL.md         # 📓 Lessons learned, ideas, experiments log
├── nav-dropdown-variants.html # Navigation dropdown style explorations
├── led-color-options.html    # LED color comparison for player
├── cabin-pages/              # Page designs for My Cabin section
├── realm-radio-mocks/        # 🎵 Cassette player mockups
│   ├── realm-radio-cassette-mock.html  # ✅ Chosen design
│   ├── realm-radio-90s-mock.html
│   └── realm-radio-90s-variations.html
├── github-profile/           # GitHub profile README designs
│   └── pixel-readme.svg      # Pixel-art terminal style SVG
├── cursor-experiments/       # Custom cursor exploration
│   ├── scripts/              # Python conversion tools
│   ├── previews/             # HTML preview pages
│   ├── converted/            # ANI→GIF, CUR→PNG conversions
│   └── cursors-archive/      # Cursor assets (flower, wax seal, etc.)
├── effects-experiments/      # Particle effects (fireflies, sparkles, etc.)
├── button-experiments/       # Button hover style explorations
└── [other files]             # Palette, font, emoji explorations
```

---

## 📓 Design Journal

**[`DESIGN-JOURNAL.md`](./DESIGN-JOURNAL.md)** - The story of building MossyRealm!

Contains:
- 🧪 **Experiments** - What I tried and what happened
- 📚 **Lessons Learned** - Why things didn't work (so you don't repeat my mistakes)
- 💡 **Ideas & TODOs** - Things to explore later
- 💭 **Random Thoughts** - Quick notes and observations

*Future plan: Turn this into a public `/learnings` page on the site!*

---

## 📁 Files

| File | Description |
|------|-------------|
| `chosen-palette-option4.html` | ✅ Chosen color palette - Sunlit Glade |
| `chosen-fonts-optionA.html` | ✅ Chosen fonts - Enchanted Forest Storybook |
| `all-explored-palettes.html` | Archive of all 6 color palettes explored |
| `warm-palettes-comparison.html` | Side-by-side comparison of warm options |
| `font-options-preview.html` | Comparison of all 3 font options |
| `flowing-text-mockup.html` | ✅ Marquee text exploration |
| `emoji-replacement-mockup.html` | Emoji styling experiments |
| `emoji-variations-mockup.html` | More emoji variations |

---

## 🖱️ Cursor Experiments

Located in `cursor-experiments/`:

| Folder | Contents |
|--------|----------|
| `scripts/` | Python tools for ANI→GIF, CUR→PNG conversion |
| `previews/` | HTML pages to preview cursor collections |
| `converted/` | Original .ani/.cur files + converted .gif/.png |
| `cursors-archive/` | Final cursor assets (pressed flower, wax seal) |

### Explored Cursors:
- **Pressed Flower** - Opens on hover, botanical style
- **Wax Seal Stamp** - Stamp impression on click

---

## ✨ Effects Experiments

Located in `effects-experiments/`:

| Effect | Description |
|--------|-------------|
| Sparkle Trail | Golden sparkles follow cursor |
| Fireflies | Ambient floating lights |
| Dust Motes | Sunlit particle effect |
| Stamp Impression | Wax seal click animation |

---

## 🔘 Button Experiments

Located in `button-experiments/`:

| File | Description |
|------|-------------|
| `button-hover-preview.html` | Modern hover styles (glow, lift, sweep, etc.) |
| `button-hover-90s.html` | Authentic 90s styles (bevel, instant swap, etc.) |

---

## 🧭 Navigation Experiments

| File | Description |
|------|-------------|
| `nav-dropdown-variants.html` | Dropdown style explorations (Inset Panels chosen) |

### Explored Styles:
- **Frame-Based Nav** — Nav in horizontal frame/rail
- **Dock/Shelf Metaphor** — Items on a "shelf" with hanging dropdowns
- **Inset Panels** ✅ — Sunken dropdowns with inner shadows (chosen)

---

## 🎵 Player Mockups

Located in `realm-radio-mocks/`:

| File | Description |
|------|-------------|
| `realm-radio-90s-mock.html` | 90s hardware aesthetic exploration |
| `realm-radio-90s-variations.html` | Color/shape variations |
| `realm-radio-cassette-mock.html` | ✅ Chosen cassette deck design |
| `led-color-options.html` | LED color comparison (green, cyan, amber) |

### Explored Designs:
- **Cassette Deck** ✅ — Hardware aesthetic with tape reels, LEDs, inset panels (chosen)
- **Homepage Sidebar Widget** — Compact deck in sidebar
- **Floating Mini Dock** — Compact panel for non-homepage routes
- **Mobile Bottom Bar** — Sticky bar with expand button
- **Mobile Expanded Sheet** — Full controls + playlist
- **Full Player Page** — `/player` with visualizer and playlist

### LED States:
- **Corner LEDs** — Always green (power indicator)
- **Status LEDs** — Amber pulsing when paused, static green when playing

---

## 👤 GitHub Profile

Located in `github-profile/`:

| File | Description |
|------|-------------|
| `pixel-readme.svg` | Retro terminal-style SVG for GitHub profile README |

---

## 🌻 Chosen Color Palette: Sunlit Glade (Option 4)

```
Background Main:    #2a3f35  (forest green)
Background Box:     #1e3028  (dark forest)
Background Box Alt: #355a45  (lighter forest)
Border:             #e8a54b  (honey amber)
Header:             #ffeaa7  (buttery yellow)
Text:               #f5f0e1  (warm cream)
Link:               #90ee90  (light green)
Accent:             #ff8c42  (warm orange)
```

---

## ✨ Chosen Fonts: Enchanted Forest Storybook (Option A)

| Element | Font | CSS Class |
|---------|------|-----------|
| Site Title | Cinzel Decorative | `font-display` |
| Box Titles | Cinzel | `font-heading` |
| Navigation | Cormorant | `font-nav` |
| Body Text | Lora | `font-body` |
| Accents | Mystery Quest | `font-accent` |

### Implementation (Next.js)

Fonts are loaded via `next/font/google` in `app/fonts.ts`:

```typescript
import { Cinzel, Cinzel_Decorative, Cormorant, Lora, Mystery_Quest } from 'next/font/google';

export const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
});

// ... other fonts
```

CSS classes defined in `globals.css`:

```css
.font-display { font-family: var(--font-display), 'Cinzel Decorative', serif; }
.font-heading { font-family: var(--font-heading), 'Cinzel', serif; }
.font-nav { font-family: var(--font-nav), 'Cormorant', serif; }
.font-body { font-family: var(--font-body), 'Lora', serif; }
.font-accent { font-family: var(--font-accent), 'Mystery Quest', cursive; }
```

---

## 🔮 Quick Open

Just double-click any `.html` file to open it in your browser!

Or run a local server from this folder:
```bash
python3 -m http.server 8888
```
Then visit `http://localhost:8888`

---

## 📝 Design Notes

**Color Vibe:** Pacific Northwest sunshine, whimsical forest, warm & inviting

**Font Vibe:** Fantasy storybook, elegant serifs, fairy tale warmth

**Inspiration:** Neocities/GeoCities personal sites, 90s/early 2000s web, fantasy books

---

## 📂 Project Files Reference

```
mossy-realm/
├── app/
│   ├── fonts.ts      ← Font definitions (next/font/google)
│   ├── globals.css   ← Colors + font classes
│   ├── layout.tsx    ← Font variables applied to body
│   └── page.tsx      ← Home page
├── components/
│   ├── NavBar.tsx       ← Uses font-display, font-nav
│   ├── RetroBox.tsx     ← Uses font-heading, font-body
│   ├── ScrollBox.tsx    ← Scrollable content container
│   ├── Marquee.tsx      ← Flowing header text
│   ├── SidebarLeft.tsx  ← Updates & Question of the Day
│   ├── SidebarRight.tsx ← Polls & Radio
│   └── MainPanel.tsx    ← Main content area
├── lib/
│   └── buildDate.ts     ← Build utilities
```

---

*Created December 2025 • Updated February 2026*
