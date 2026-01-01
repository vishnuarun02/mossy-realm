# 🏠 Cabin Pages — Design Prototypes

Static HTML prototypes for the "The Cabin" section of MossyRealm.

---

## 📁 Files

| File | Description |
|------|-------------|
| `about-me.html` | 3-column layout: quick facts, intro, interests, status |
| `library.html` | Reading journal with timeline style, filters, quotes |
| `cd-cabinet.html` | Video Vault — movie/TV collection with poster grid |
| `cabin-demo.css` | Shared stylesheet with MossyRealm design tokens |
| `cabin-demo.js` | Simple vanilla JS for filter interactivity |

---

## 🔮 How to View

### Option 1: Double-click
Just double-click any `.html` file to open it in your default browser.

### Option 2: Local server (recommended)
For best results, run a local server:

```bash
# Using Python
cd design-kitchen/cabin-pages
python3 -m http.server 8080

# Then open: http://localhost:8080/about-me.html
```

### Option 3: VS Code Live Server
If you have the Live Server extension, right-click any HTML file and select "Open with Live Server".

---

## 🎨 Design Decisions

### About Me (3-Column)
- **Left sidebar:** Quick facts, likes, social links
- **Main panel:** Intro, NOW section (2x2 grid), interests (2x2 grid)
- **Right sidebar:** Status lantern, realm guardian, obsession, site stats

### Library (Timeline Journal)
- **Left sidebar:** Currently reading with progress, on deck, stats, quotes
- **Main panel:** Chronological reading log with filters, star ratings, mini reviews
- **Filters:** fiction/non-fiction/favorites/year

### Video Vault (Movie Collection)
- **Left sidebar:** Now watching, recently rewatched (VHS spine style), stats
- **Main panel:** Poster grid with mood filters, TV corner with VHS spines
- **Filters:** favorites/comfort/recent + mood tags

---

## 🎯 Design Tokens Used

```css
/* Colors */
--mossy-bg-main: #2a3f35
--mossy-bg-box: #1e3028
--mossy-bg-box-alt: #355a45
--mossy-border: #e8a54b
--mossy-header: #ffeaa7
--mossy-text: #f5f0e1
--mossy-link: #90ee90
--mossy-accent: #ff8c42

/* Fonts */
--font-display: 'Cinzel Decorative'
--font-heading: 'Cinzel'
--font-nav: 'Cormorant'
--font-body: 'Lora'
--font-accent: 'Mystery Quest'
```

---

## 📝 Notes for Implementation

1. **Components to reuse:** RetroBox, ScrollBox from existing codebase
2. **New patterns:** Timeline entries, VHS spines, movie poster cards
3. **Responsive:** All layouts stack to single-column on mobile
4. **Accessibility:** Focus styles, keyboard navigation on cards

---

## ✅ Status

- [x] about-me.html — ready for review
- [x] library.html — ready for review  
- [x] cd-cabinet.html — ready for review (renamed to "Video Vault" for movies)

**Awaiting approval before implementing in production `/app/cabin/` routes.**

---

*Created December 31st, 2025*

