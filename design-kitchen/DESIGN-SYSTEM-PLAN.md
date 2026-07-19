# MossyRealm Design System Plan

*Principal designer + senior frontend engineer working doc. Audited against the running site (headless Chrome, 1440/1024/768/390/320) on all 18 routes, plus a full read of `app/`, `components/`, `components/player/`, `globals.css`, and `fonts.ts`.*

---

## 1. Audit of the current frontend

### What already works (keep and formalize)

- **Identity is strong.** Wallpaper + fixed attachment, page-wide grain, amber-on-moss palette, five fonts with clear roles, scanned-NatGeo mood. The site looks like one world already.
- **`RetroBox`** is a genuine primitive, used on ~20 routes. Amber title strip + bordered body reads instantly.
- **Homepage density** is charming and intentional. Three columns at desktop, collapses cleanly.
- **Learnings timeline + dossier** (uncommitted work) is the most designed interior experience: breadcrumb, metadata pills, takeaway callout, prev/next. It is the model for interior pages.
- **Cassette player** is a believable object: shell, window, LEDs, label, screws.
- **Footer** is consistent everywhere: badges, quick links, counter, sign-off.

### Problems found (ranked by severity)

**A. Structural**

1. **Every section layout is a copy-pasted shell.** `cabin/layout.tsx`, `fieldwork/layout.tsx`, `crossroads/layout.tsx`, `archives/layout.tsx`, `page.tsx`, and `player/page.tsx` all repeat `site-container > NavBar > site-main > Footer`. Six copies of the same skeleton.
2. **Interior pages are a single box floating in a void.** About, guestbook, now, recipes, etc. render one small `RetroBox` at the top and ~1500px of empty stretched container below. `min-height` on the shell stretches the void. Pages look abandoned rather than cozy.
3. **`SubNav` component exists but is used nowhere.** Section context (which part of the cabin am I in?) is missing on interior pages.
4. **Marquee overflows the site container** on the right edge at 1440px (text runs past the amber frame).
5. **Site title clips at 390px** ("WELCOME TO MOSSYREA…"). No responsive sizing below `md`.

**B. Tokens and consistency**

6. **Border widths are guessed every time:** 226 bare `border`, 32 `border-2`, 2 `border-[3px]`, 1 custom `.border-3`, plus inline `style={{ borderBottomWidth: '3px' }}` in SubNav. No semantic widths.
7. **Shadow palette in the player:** ~15 orphan hexes (`#f0b15a`, `#b7ff71`, `#1a2a20`, `#0b120e`…) in cassette CSS, visualizer canvases, and LED styles. A whole unofficial "cassette palette" parallel to `--mossy-*`.
8. **Arbitrary one-off values:** `text-[0.62rem]`, `text-[0.7rem]`, `max-w-32`, `h-15`, `pl-6`, `-top-[55px]`, `w-40`… scattered through player and nav.
9. **Type sizes are per-component guesses:** 0.62rem, 0.7rem, 0.72rem, 0.75rem, 0.78rem, 0.85rem, 0.88rem, 0.9rem, 0.95rem, 1.05rem, 1.1rem, 1.15rem all appear. No scale.
10. **Two CSS cultures with no stated rule:** utility-in-TSX vs. BEM-ish classes in globals.css (`nav-inset-*`, `study-log-*`, `cassette-*`). Both are fine; the absence of a convention is not.

**C. Interaction and accessibility**

11. **Desktop nav dropdowns are hover-only.** Parents are `<span>`, not buttons. No `aria-expanded`, no keyboard path, no Escape, focus cannot enter a dropdown. Fails keyboard and touch (desktop-dropdown parents are unreachable on touch laptops).
12. **No global `:focus-visible` style.** Only the new study-log CSS has focus rings. Tabbing the site is invisible.
13. **Active nav state is color-only** (muted -> cream). Needs a non-color cue.
14. **Player controls are 32px** (`h-8`/`w-8`), below the ~44px touch guidance; volume slider thumb is 14px.
15. **Grain overlay at `z-index: 9999`** sits above the radio dock (`z-50`) and frog gif; fine visually (pointer-events: none) but the layering is accidental, not designed.
16. **Reduced motion is never handled.** Marquee, blink, pulse, slide-up all run regardless of `prefers-reduced-motion`.
17. **Homepage poll radios are unstyled native controls** in an otherwise fully styled world.

**D. Content finish**

18. **`[img] / [art missing]` placeholder** in the homepage "latest art" panel ships to production.
19. **Under-construction pages vary**: guestbook has tape/worker art and rotated images with inline styles; others are plain boxes. Same concept, six faces.
20. **Trailing `~` and exclamation marks** in a few homepage strings contradict CONTENT_STYLE.md.

---

## 2. Design principles

1. **Dense layout, simple behavior.** Complexity lives in composition, not animation. (Learned the hard way in the cursor/fireflies experiment; journal Jan 16.)
2. **One artifact, scanned once.** Grain and wallpaper are global atmosphere. Components must not add their own noise, glow, or particles.
3. **Amber structures, cream informs, green invites, orange warns.** Color has a job; it is never decoration.
4. **Everything is a specimen in the field guide.** Panels, badges, and callouts are labeled boxes. If a UI element can't justify its label, it doesn't get a box.
5. **Handmade but systematic.** Slight rotations, gifs, and badges are welcome, but they sit on a strict grid with strict tokens. Weirdness is curated, not accidental.
6. **Keyboard is a first-class visitor.** Old-web sites were keyboard-friendly by accident (they were all links and buttons). Keep that.
7. **Accessible without sanding off the retro.** Contrast fixes tune palette values, not the aesthetic.

---

## 3. Visual hierarchy

```
wallpaper (atmosphere, z:0)
  └─ site-container (the "publication", z:1) — amber 4px frame, dark moss body
       ├─ site-header (title + nav)          — inset, structural border
       ├─ marquee strip                       — single line, contained
       ├─ page header (interior pages)        — breadcrumb, title, deck
       ├─ panels (surface-panel / surface-panel-alt) — amber title strips
       │    └─ inset elements (windows, wells, code) — darker, recessed
       └─ site-footer
floating: radio dock (z:40), mobile bar (z:40), nav dropdowns (z:100 within header), grain (z:max, pointer-events:none)
```

Emphasis order on any page: **page title > panel title strips > headings > body > metadata.** Amber title strips are the primary wayfinding device; never more than one h1-level title per page.

---

## 4. Semantic color roles

Existing hex values are preserved (palette is good); roles are renamed semantically. `--mossy-*` names remain as deprecated aliases mapping to the new tokens, so nothing breaks mid-migration.

| Token | Value (existing) | Role |
|---|---|---|
| `--surface-page` | `#2a3f35` | html/body fallback behind wallpaper |
| `--surface-site` | `rgba(30,48,40,0.92)` | the centered publication body |
| `--surface-panel` | `#1e3028` | default panel body (was bg-box) |
| `--surface-panel-alt` | `#355a45` | alternate/elevated panel body |
| `--surface-inset` | `#0b120e` | recessed wells: cassette window, code, inputs |
| `--surface-interactive` | `#355a45` hover of panel | hover fill on interactive rows |
| `--text-primary` | `#f5f0e1` | body cream |
| `--text-secondary` | `#c5c0a8` | muted cream |
| `--text-heading` | `#ffeaa7` | headings, panel-strip emphasis |
| `--text-heading-alt` | `#fff3c4` | sub-emphasis |
| `--text-inverse` | `#1e3028` | text on amber strips |
| `--interactive-link` | `#90ee90` | links, positive actions |
| `--interactive-link-hover` | `#b8ffb8` | link hover + glow |
| `--accent-warm` | `#ff8c42` | warnings, sparse highlights |
| `--border-structural` | `#e8a54b` | frames, panel borders (amber) |
| `--border-strong` | `#ffc857` | hover/glow amber |
| `--border-subtle` | `rgba(232,165,75,0.35)` | hairlines, dividers inside panels |
| `--border-focus` | `#b8ffb8` | focus rings |
| `--status-success` | `#b7ff71` | LEDs, playing state (promote from cassette) |
| `--status-warning` | `#f0b15a` | amber LED, paused state (promote from cassette) |
| `--texture-grain-opacity` | `0.26` | single source of grain intensity |

Rule: **no new component-specific colors.** If the cassette needs green, it uses `--status-success`.

---

## 5. Typography roles

Fonts keep their jobs; sizes go on an 8-step scale (rem, fluid where noted):

| Role | Font | Token sizes |
|---|---|---|
| `--font-display` | Cinzel Decorative | site title only: `clamp(1.35rem, 5vw, 1.9rem)` (fixes 390px clip) |
| `--font-heading` | Cinzel | page/panel titles, `h1–h4` |
| `--font-nav` | Cormorant | nav, breadcrumbs, metadata, labels |
| `--font-body` | Lora | prose |
| `--font-accent` | Mystery Quest | whisper lines, sign-offs, track titles |

Type scale (`--text-*`): `xs:0.75, sm:0.85, base:1.0(17px body), md:1.1, lg:1.25, xl:1.4(fluid to 1.6)`. Panel strips and metadata use `xs/sm` uppercase Cormorant with `letter-spacing 0.06–0.2em`. Mystery Quest never exceeds `md`. Line lengths: prose `max-width: 65ch`; interior page content column caps at ~68ch.

Kill the 0.62–0.95rem drift: everything rounds onto the scale.

---

## 6. Spacing, borders, radius, shadow, motion

- **Spacing scale** (4px base): `--space-1:4, 2:8, 3:12, 4:16, 5:24, 6:32, 8:48`. Panel padding `3–4`, panel gaps `4`, section rhythm `5–6`.
- **Border widths** (semantic, replaces the 226-way drift): `--border-hairline:1px` (insets, dropdown items), `--border-panel:2px` (panels, buttons), `--border-frame:3px` (site frame inner, RetroBox), `--border-site:4px` (publication frame only). Implement as utilities `border-hairline/panel/frame/site` + Tailwind theme widths; migrate all uses.
- **Radius:** sharp everywhere; `--radius-sm:2px` allowed on panels only. No new radii.
- **Shadows:** `--shadow-site` (publication frame stack), `--shadow-panel-inset` (recessed wells), `--shadow-lift` (dock/mobile bar), `--shadow-glow-link` (link hover text-shadow). No other shadows.
- **Motion:** `--dur-fast:120ms, --dur-med:250ms, --ease-out:cubic-bezier(.2,.8,.3,1)`. Animate only: menu disclosure, player state, loading, small confirmations. Global `@media (prefers-reduced-motion: reduce)` kills marquee/blink/pulse/slide-up and all transitions.
- **Z-index scale:** `--z-wallpaper:0, --z-site:1, --z-dock:40, --z-mobilebar:40, --z-dropdown:100, --z-grain:9999`. Nothing else gets z-index.
- **Focus:** `:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 2px; }` globally, with inset variant for dark wells.

---

## 7. Layout rules

- **SiteShell** (one implementation): `site-wrapper > site-container > header + main + footer`. All six shell copies collapse into `components/SiteShell.tsx`; section layouts become 3-line wrappers.
- **Widths:** site max `920px` (unchanged); reading column `65ch`; wide templates (learnings dossier) keep side rails at `190px`.
- **Interior page template** (PageShell): `PageHeader` (breadcrumb + title + deck) → sections with `space-5` rhythm → optional right/left rails → footer. The void problem is fixed by giving every interior page the header + at least a section structure, and letting the container size to content (footer sits after content, not stretched to viewport; add `margin-top:auto` footer pinning only when content is genuinely short, so the void becomes a deliberate breathing band of max ~`space-8`).
- **Breakpoints:** keep Tailwind defaults; design targets 320, 390, 768, 1024, 1440. No horizontal overflow at 320.

---

## 8. Component inventory

### New primitives (`components/ui/`)

| Primitive | Purpose | Variants |
|---|---|---|
| `Panel` (evolves RetroBox) | labeled box, the core unit | `surface: default/alt`, `padding: sm/md`, `strip: default/none`, semantic `<section>` + heading |
| `PanelHeader` | amber title strip | `as: h2/h3`, optional right-slot |
| `InsetPanel` | recessed well (cassette window, code, inputs) | — |
| `Button` | action | `primary` (amber fill), `ghost` (panel-alt, amber border); sizes `sm/md` (md = 44px) |
| `IconButton` | square control (player) | `primary/ghost`, 44px touch size with 32px visual density option `density: compact` |
| `TextLink` | green link with glow hover + focus | `arrow` variant for read-more |
| `Badge` | `[bracket]` footer-style chip / metadata pill | `pill`, `chip` |
| `Metadata` | uppercase Cormorant meta rows (date, expedition #) | — |
| `Callout` | key-takeaway box (amber tint) / warning (orange) | `note/warning` |
| `Divider` | `border-subtle` horizontal rule w/ optional glyph | — |
| `MediaFrame` | bordered image frame + optional caption/corner tag | — |
| `FormField` | label + input/textarea/radio on inset surface | — |
| `EmptyState` | under-construction standard (art slot + message) | — |
| `Stack` / `Cluster` | vertical rhythm / horizontal wrap groups | gap props only |

`RetroBox` stays as a deprecated re-export of `Panel` until all consumers migrate.

### Patterns (documented, composed from primitives)

- **SiteShell / PageShell / PageHeader / Section** (templates)
- **NavBar** (inset panel nav, keyboard accessible)
- **Study-log timeline & dossier** (learnings)
- **Cassette deck** (radio widget), **dock**, **mobile bar/sheet**
- **Marquee**, **ScrollBox**, **VisitorCounter** (kept, tokenized)
- **UnderConstruction** → rebuilt on `EmptyState`

---

## 9. Page-template inventory

| Template | Routes | Notes |
|---|---|---|
| Outpost (dense 3-col) | `/` | keep density; columns `190px 1fr 190px`; designed collapse to 2-col then 1-col; fix title clip + marquee overflow |
| Personal | `/cabin/*` | PageShell + sub-nav (cabin sections) |
| Long-form | `/fieldwork/learnings/[slug]` | dossier pattern; 65ch measure; already strong |
| Listing | `/fieldwork/learnings`, experiments, field-notes | timeline/list patterns |
| Gallery/collected | `/fieldwork/gallery`, `/archives/collected` | MediaFrame grid |
| Archive | `/archives/changelog`, `/archives/sitemap` | simple lists, PageShell |
| Form | `/cabin/contact`, `/crossroads/guestbook` | FormField; guestbook keeps its art |
| Media | `/player` | cassette deck as hero object |
| Empty | all UnderConstruction routes | EmptyState with per-route flavor |

SubNav gets wired into section layouts (it exists but is unused) so interior pages carry section context.

---

## 10. Responsive strategy

- 1440/1024: full publication frame, side wallpaper visible; dock bottom-right.
- 768: homepage 2-col (rails stack left), interior rails stack above content; nav still inset-bar (fits at 768 — verify; else accordion earlier).
- 390/320: accordion nav; title fluid; panels full-bleed within frame; wallpaper top/bottom only; mobile player bar fixed bottom with `padding-bottom` on wrapper (exists); **no content under the bar**; touch targets ≥44px; reading measure held by padding, not max-width hacks.
- Overflow guard: `min-w-0` on grid children, `overflow-wrap:anywhere` on prose links, test every route at 320.

---

## 11. Accessibility strategy

- Global `:focus-visible` ring (green) + inset variant; never remove outlines without replacement.
- Nav: parents become `<button aria-expanded aria-controls>`; pointer *and* keyboard open dropdowns; `Escape` closes and returns focus; arrow keys move within a dropdown; `aria-current="page"` on active links; active state = color **+** marker glyph (e.g. `✶`) so it isn't color-only.
- Marquee: `aria-hidden` duplicate-free single announcement; pause on hover/focus; frozen under reduced motion.
- Player: real buttons (already), add `aria-pressed` where toggle, label the volume slider, 44px targets on touch, status text not just LED color.
- Forms: `FormField` binds `<label htmlFor>`; errors described with `aria-describedby`.
- Contrast: verify cream `#f5f0e1` on `#1e3028` (≈12:1 ✓), muted `#c5c0a8` on panel (≈7:1 ✓), green `#90ee90` on `#1e3028` (≈10:1 ✓), amber `#e8a54b` on panel for borders only (non-text). Heading cream `#ffeaa7` ✓. Orange `#ff8c42` on panel ≈5.5:1 — okay for large/bold only; keep for short warnings.
- Images: decorative gifs get `alt=""` (already mostly true); "latest art" placeholder fixed or removed.
- Landmarks: one `h1` per page (site title stays h1 on home; interior pages get their own h1 and the site title becomes a div — check heading outline), `nav aria-label`, `main`, `footer`.

---

## 12. Migration plan

1. **Foundations (no visual change):** add semantic tokens + aliases, border/spacing/type scales, focus rings, reduced-motion, z-index. Site must look pixel-identical after this step except focus rings.
2. **Primitives:** build `components/ui/*`, keep `RetroBox` as alias. Showcase route scaffolded early so primitives are reviewed in isolation.
3. **Shells:** `SiteShell`, collapse six layout copies, wire SubNav into section layouts.
4. **Nav rebuild** (a11y) with screenshots before/after at all widths.
5. **Route migration** in order: home → learnings (index+dossier) → cabin → crossroads → archives → remaining fieldwork → player. After each route: re-screenshot, diff, fix.
6. **Radio unification:** tokenize cassette CSS, shared `PlayerControls` built on IconButton, unify widget/dock/bar/sheet.
7. **Consistency sweep:** kill arbitrary values, orphan hexes, dead CSS, the 0.62rem drift; fix `[art missing]`.
8. **Docs:** finish `/design-system` + `DESIGN_SYSTEM.md`.
9. **Validation:** lint, typecheck, test, build + full re-screenshot.

Risk notes: the uncommitted learnings work is integrated, not clobbered (study-log CSS becomes a documented pattern). The audio engine (`lib/player`) is untouched. Visitor counter, vault, tracks APIs untouched.

---

## 13. Deliverables checklist

- [ ] Semantic tokens in `globals.css` (+ deprecated mossy aliases)
- [ ] `components/ui/` primitives
- [ ] `SiteShell`/`PageShell`/`PageHeader`/`Section`
- [ ] Accessible NavBar
- [ ] All 18 routes migrated
- [ ] Realm Radio unified
- [ ] `/design-system` showcase (hidden from public nav)
- [ ] `mossy-realm/DESIGN_SYSTEM.md`
- [ ] Validation green + before/after screenshots
