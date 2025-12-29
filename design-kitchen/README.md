# 🎨 Design Kitchen

This folder contains all the design exploration and references for **MossyRealm**.

Think of it like a Figma workspace - but in HTML files you can open in any browser!

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

*Created December 13 2025*
