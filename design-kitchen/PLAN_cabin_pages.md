# 🏠 The Cabin — Subpage Plan

> Design + Code Audit & Implementation Plan  
> Created: December 31st, 2025

---

## 1. Design Tokens Summary

### Colors (Sunlit Glade Palette)

| Token | Hex | Usage |
|-------|-----|-------|
| `--mossy-bg-main` | `#2a3f35` | Page background fallback |
| `--mossy-bg-box` | `#1e3028` | Panel backgrounds (default) |
| `--mossy-bg-box-alt` | `#355a45` | Panel backgrounds (alt variant) |
| `--mossy-border` | `#e8a54b` | All borders, title bars, scrollbars |
| `--mossy-border-glow` | `#ffc857` | Hover states, glows |
| `--mossy-header` | `#ffeaa7` | Headings, emphasis |
| `--mossy-header-alt` | `#fff3c4` | Secondary headings |
| `--mossy-text` | `#f5f0e1` | Body text |
| `--mossy-text-muted` | `#c5c0a8` | Subdued text, captions |
| `--mossy-link` | `#90ee90` | Links |
| `--mossy-link-hover` | `#b8ffb8` | Link hover state |
| `--mossy-accent` | `#ff8c42` | Accent highlights, warnings |

### Typography

| Element | Font | CSS Class | Variable |
|---------|------|-----------|----------|
| Site Title | Cinzel Decorative | `.font-display` | `--font-display` |
| Box Titles / Headers | Cinzel | `.font-heading` | `--font-heading` |
| Navigation | Cormorant | `.font-nav` | `--font-nav` |
| Body Text | Lora | `.font-body` | `--font-body` |
| Accents / Whimsy | Mystery Quest | `.font-accent` | `--font-accent` |

**Base styles:** `font-size: 17px`, `line-height: 1.7`

### Borders & Panels

- **Standard border:** `border-[3px] border-mossy-border`
- **Title bar:** `bg-mossy-border text-mossy-bg-box` (inverted colors)
- **Rounded corners:** `rounded-sm` (subtle)
- **Inner padding:** `p-3`

### Spacing

- **Gap between panels:** `gap-4` (16px)
- **Site padding:** `padding: 30px 40px` desktop, `15px 8px 60px 8px` mobile
- **Max content width:** `920px`

### Layout Grid

| Breakpoint | Layout |
|------------|--------|
| Desktop (lg+) | 3-column: `190px | 1fr | 190px` |
| Tablet (md-lg) | 2-column: `190px | 1fr` |
| Mobile (<md) | Single column, stacked |

---

## 2. Reusable Components

### `RetroBox` — Standard Content Panel

```tsx
<RetroBox title="[ section title ]" variant="default|alt">
  {children}
</RetroBox>
```

- **Props:** `title?`, `children`, `variant?`, `className?`
- **Variants:** `default` (dark bg), `alt` (lighter bg)
- **Location:** `components/RetroBox.tsx`

### `ScrollBox` — Scrollable Content Panel

```tsx
<ScrollBox title="[ scrollable ]" maxHeight="200px">
  {children}
</ScrollBox>
```

- **Props:** Same as RetroBox + `maxHeight?`
- **Features:** Custom scrollbar, "[ scroll ↓ ]" indicator
- **Location:** `components/ScrollBox.tsx`

### `NavBar` — Site Navigation

- Desktop: horizontal button row
- Mobile: collapsible dropdown
- Links defined in `navLinks` array

### `Footer` — Site Footer

- Marquee, badges, quick links, visitor counter
- Always present via layout

### `Marquee` — Flowing Text

- 90s-style scrolling text
- `direction` prop: `"left"` | `"right"`

---

## 3. Current Project Structure

```
mossy-realm/
├── app/
│   ├── fonts.ts        ← Font definitions
│   ├── globals.css     ← Design tokens + global styles
│   ├── layout.tsx      ← Root layout (fonts, overlays, wrapper)
│   └── page.tsx        ← Homepage (/)
├── components/
│   ├── RetroBox.tsx    ← Content panel
│   ├── ScrollBox.tsx   ← Scrollable panel
│   ├── NavBar.tsx      ← Navigation
│   ├── Footer.tsx      ← Footer
│   ├── Marquee.tsx     ← Flowing text
│   ├── MainPanel.tsx   ← Homepage main content
│   ├── SidebarLeft.tsx ← Homepage left sidebar
│   └── SidebarRight.tsx← Homepage right sidebar
└── public/
    └── *.jpg, *.png    ← Images
```

**Pages framework:** Next.js App Router (folder-based routing)

---

## 4. Proposed Cabin Pages Structure

### Routes

| Page | Route | File Path |
|------|-------|-----------|
| The Cabin (hub) | `/cabin` | `app/cabin/page.tsx` |
| About Me | `/cabin/about` | `app/cabin/about/page.tsx` |
| Library | `/cabin/library` | `app/cabin/library/page.tsx` |
| Video Vault | `/cabin/video-vault` | `app/cabin/video-vault/page.tsx` |

### File Tree (to create)

```
app/
└── cabin/
    ├── layout.tsx           ← Shared cabin layout with sub-nav
    ├── page.tsx             ← /cabin hub page
    ├── about/
    │   └── page.tsx         ← About Me
    ├── library/
    │   └── page.tsx         ← Library / Reading List
    └── video-vault/
        └── page.tsx         ← Video Vault / Movies & TV
```

### Shared Cabin Layout (`app/cabin/layout.tsx`)

Creates consistent sub-navigation for all cabin pages:

```tsx
// Proposed structure
export default function CabinLayout({ children }) {
  return (
    <div className="site-container">
      <NavBar />
      
      {/* Cabin sub-navigation */}
      <div className="cabin-subnav">
        <Link href="/cabin">The Cabin</Link>
        <Link href="/cabin/about">About Me</Link>
        <Link href="/cabin/library">Library</Link>
        <Link href="/cabin/cd-cabinet">CD Cabinet</Link>
      </div>
      
      <main className="site-main">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
```

---

## 5. Page Content Proposals

### `/cabin` — The Cabin Hub

**Purpose:** Welcome page for the cabin section, links to subpages

**Layout:** Single-column centered content

**Elements:**
- Hero image (cozy cabin interior?)
- Welcome text: "Welcome to my cabin — a cozy space where I share more about myself..."
- 3 link cards to subpages (About Me, Library, CD Cabinet)

---

### `/cabin/about` — About Me

**Purpose:** Personal introduction, fun facts, interests

**Layout:** Single or two-column

**Suggested sections:**
- RetroBox: "[ about the realm keeper ]" — bio, photo placeholder
- RetroBox: "[ fun facts ]" — bullet list
- RetroBox: "[ interests & hobbies ]" — grid or list
- Optional: "[ currently... ]" — what you're watching/reading/playing

---

### `/cabin/library` — Library

**Purpose:** Reading list, book recommendations, reviews

**Layout:** Single-column with ScrollBox for long lists

**Suggested sections:**
- RetroBox: "[ currently reading ]" — featured book
- ScrollBox: "[ bookshelf ]" — list of books (title, author, rating)
- RetroBox: "[ want to read ]" — wishlist
- Optional: "[ favorite quotes ]"

---

### `/cabin/video-vault` — Video Vault

**Purpose:** Movie & TV collection, watch log, favorites

**Layout:** 2-column (sidebar + main)

**Suggested sections:**
- Sidebar: "[ now watching ]" — current show/film with progress
- Sidebar: "[ recently rewatched ]" — VHS spine style list
- Sidebar: "[ stats ]" — films watched this year
- Main: "[ the collection ]" — poster grid with mood/genre filters
- Main: "[ tv corner ]" — VHS spine list of shows
- Optional: Link to Letterboxd diary

---

## 6. New Components to Consider

| Component | Purpose | Priority |
|-----------|---------|----------|
| `CabinSubNav` | Sub-navigation for cabin pages | Required |
| `LinkCard` | Clickable card for cabin hub | Nice to have |
| `BookEntry` | Formatted book listing | Nice to have |
| `AlbumCard` | Album cover + info display | Nice to have |

These can be simple compositions of existing RetroBox + Tailwind classes initially.

---

## 7. Implementation Order

1. **Create folder structure** — `app/cabin/`, subfolders
2. **Create `app/cabin/layout.tsx`** — shared layout with sub-nav
3. **Create `app/cabin/page.tsx`** — hub page (placeholder content)
4. **Create subpages** — about, library, cd-cabinet (placeholder content)
5. **Style sub-navigation** — add CSS to globals.css if needed
6. **Populate content** — replace placeholders with real content

---

## 8. Notes & Recommendations

- **Keep single-column layouts** for cabin subpages — simpler than homepage's 3-column
- **Use RetroBox consistently** — all sections should feel cohesive
- **Mobile-first** — cabin pages will likely be viewed on phones
- **Images:** Consider placeholder boxes (like realm guardian) until real images are added
- **Sub-nav styling:** Should match existing NavBar aesthetic but smaller/horizontal

---

## ✅ Ready for Approval

This plan outlines:
- [x] Design tokens summary
- [x] Reusable component documentation
- [x] Current project structure
- [x] Proposed file paths and routes
- [x] Page content suggestions
- [x] Implementation order

**Awaiting approval before implementation.**

---

*~ end of plan ~*

