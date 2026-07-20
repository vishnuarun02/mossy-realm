# File Cabinet Implementation Spec

*Extracted from the two reference mockups (03_32_22 "4 ways" + 04_07_28 "Option A hybrid"), translated into the existing MossyRealm design system. Source of truth for the asset library and any later page work.*

---

## 1. Global constants (untouchable)

These never change during cabinet work:

| Constant | Current value | Notes |
|---|---|---|
| Palette | `--p-*` palette + semantic tokens in `globals.css` | Cabinet/paper colors come from EXISTING tokens only |
| Fonts | Cinzel Decorative / Cinzel / Cormorant / Lora / Mystery Quest / VT323 | No new fonts |
| Wallpaper | `/vintage-natgeo.jpg`, fixed | |
| Global grain | `#grain-overlay`, `--texture-grain-opacity: 0.30` | Cabinet textures layer BELOW it, never duplicate it |
| Global navigation | NavBar inset bar + dropdowns, single row, 44px | |
| Breadcrumbs | `components/Breadcrumbs.tsx` — compact, one per nested page | Reference explicitly keeps these |
| Site width | `.site-container` max 920px | |
| Footer | badges, links, counter | |
| Realm Radio | widget, dock, mobile bar/sheet, `/player` deck | Untouched |
| Base borders | `hairline/panel/frame/site` (1/2/3/4px) | Cabinet uses `panel`/`frame` widths |

Cabinet-surface token mapping (no new colors):
- Cabinet body / drawer face: `--surface-panel` (#1e3028) and `--surface-panel-alt` (#355a45)
- Recessed openings / drawer interiors: `--surface-inset` (#0b120e), `--surface-inset-alt` (#1a2a20)
- Metal/edge highlights: `--border-structural` (#e8a54b), `--border-strong` (#ffc857)
- Paper: **new** `--surface-paper: #e8dcc0` and `--surface-paper-aged: #d9cba6` — the ONLY token additions, required because paper is an object, not a UI surface. Dark-ink text on paper: `--text-on-paper: #2b2a1e`. (Same "physical object" exception as `--cassette-*`.)
- Stamps/status: `--status-success`, `--status-warning`, `--accent-warm`

## 2. Visual primitives

Each primitive: semantic purpose, dimensions, padding, borders, layering, shadows, type, states, responsive. All CSS lives in `app/mossy-ui.css`; React wrappers in `components/mossy-ui/`.

### 2.1 Cabinet frame
- Purpose: the outer body of a cabinet region (Archives strongest)
- Dim: full width of its container; padding 12–16px
- Border: `frame` (3px) `--border-structural`, radius 2px
- Layering: sits on `.site-main` like a Panel; optional screw heads at 4 corners (12px hardware SVGs)
- Shadow: `--shadow-panel-inset` inside, `--shadow-lift` outside only if floating
- Type: cabinet label uses `font-nav` uppercase `text-meta`
- States: none (structural)
- Responsive: corners/screws hide below 390px if space is tight

### 2.2 Drawer face
- Purpose: the front of one drawer (a row in a cabinet index, or a section drawer in Archives)
- Dim: height 44–48px (touch-safe), full width of cabinet interior
- Padding: 8px 12px
- Border: `panel` (2px) `--border-structural` top/bottom collapse; radius 2px
- Layering: face sits proud of the frame; label plate inset INTO the face
- Shadow: `inset 1px 1px 0 rgba(255,255,255,.06), inset -1px -1px 0 rgba(0,0,0,.3)`
- Type: `font-nav` 1rem label, `text-micro` caption
- States: default / hover (face slides out 2–3px, `transform: translateX(2px)`) / active (stays out, amber label plate) / focus (global ring)
- Responsive: no slide on coarse pointers; tap opens

### 2.3 Folder tab
- Purpose: compact local navigation or content tab inside a cabinet region (NOT a global nav pattern)
- Dim: height 36–40px, padding 6px 14px, positions left/center/right (tab alignment shifts)
- Border: `hairline` + `panel` on sides/top, none bottom (folds into the sheet)
- Shape: slanted right edge (clip-path) — reuse the existing folder silhouette, tightened
- Type: `font-nav` 0.95rem
- States: inactive moss / hover lift 1px / active manila (`--surface-strip` text-inverse) + ✶ / focus ring
- Responsive: wraps to second row; never horizontal-scrolls

### 2.4 Index card
- Purpose: catalog/archive entry surface (Archives), recipe/library cards
- Dim: full width; min-height 96px; padding 12px 14px
- Border: `panel` `--border-structural`; faint ruled lines inside (existing `.ruled-lines`)
- Paper: `--surface-paper` with aged variant; text `--text-on-paper`
- Layering: slight rotate(-0.5deg) allowed on one card per page max
- Type: `font-heading` title `text-sm`, `font-body` notes, `font-nav` meta
- States: hover border-strong; link cards whole-card clickable; focus ring
- Responsive: full-width rows under 768px

### 2.5 Paper stack
- Purpose: layered sheets behind a paper surface (the "physical object" cue)
- Dim: 2 pseudo-sheets offset 3px/6px, rotate ±0.75deg, behind the main sheet
- Border: hairline on pseudo-sheets only
- Shadow: none (the offset IS the depth cue)
- States: none (decorative, aria-hidden)
- Responsive: reduce to 1 sheet on mobile

### 2.6 Drawer handle
- Purpose: the pull on a drawer face; also signals "openable"
- Dim: 44px wide × 10px tall hardware shape (SVG or CSS), centered on the face's right half or centered under the label plate
- Style: recessed cup handle: inset shadow + 1px lighter top edge
- States: on hover the handle darkens; purely decorative (the whole face is the button)

### 2.7 Numbered file label
- Purpose: accession/index numbering on cards and folders (FW-001, MR-001, 01–05)
- Dim: auto, padding 2px 8px
- Border: 1px dashed `--border-structural`; punched-hole dot before text
- Type: `font-nav` uppercase `text-micro` letterspacing 0.14em
- Extends existing `.accession-tag` (kept, moved into the asset family)

### 2.8 Metadata strip
- Purpose: the horizontal strip carrying record ids, dates, filing info on cards/logs
- Dim: full width, padding 6px 10px, sits at card top or bottom
- Style: inset well `--surface-inset` OR dashed hairline top+bottom on paper
- Type: `font-nav`/`font-terminal` `text-meta`
- States: none

### 2.9 Active / hovered / focused file
- Active file: face open 3px + amber label plate + ✶ glyph + green status lamp — never color alone
- Hovered file: face slides 2px + label text brightens (`--text-primary`)
- Focused file: global `:focus-visible` green ring, offset 2px

### 2.10 Empty drawer
- Purpose: an unfilled cabinet section
- Style: recessed opening (inset surface), one line of what belongs + a `TODO` stamp
- Never a blank hole; explains itself

### 2.11 Mobile drawer disclosure
- Purpose: cabinet index on small screens
- Style: one "cabinet index" drawer face, tap to slide the whole drawer open (max-height disclosure)
- Same aria contract as CabinDirectory: button, aria-expanded, aria-controls, ≥44px targets

## 3. Section mapping

Strength: **Archives > Cabin ≈ Fieldwork > Crossroads** (lightest).

### My Cabin (moderate)
- Personal file stack containing Cabin, About, Now, Crafting Table, Recipes, Contact (`00`–`05`).
- The implemented desktop index is 194px wide. Files use the shipped tab SVGs, paper-edge texture, number plates, 0–4px offsets, and a 4px active pull-forward treatment.
- One shared label plate and one shared handle serve the whole index; handles are never repeated per file. Four tiny screw assets stay on the joined outer frame.
- `/cabin` and `/cabin/about` use the warm `personal-graph-notebook` role, based on Fieldwork's faint graph primitive. Cream ruled paper is no longer the Cabin proof-of-concept surface.
- Recipes keep their stained-card identity; no recipe-route migration is part of the current proof of concept.
- Keep terminal/CRT flavor (the room's computer). Cabinet dressing stays local to the Cabin index and joined notebook object.

### Fieldwork (moderate)
- Engineering binder + compact experiment-file index.
- Experiments index becomes a slim cabinet of file folders (accession-tagged).
- Experiment content stays notebook-like (graph paper, readouts) — gains spiral-binding and sheet-number marks from the notebook family.
- Learnings dossier stays as-is.

### Crossroads (lightest)
- Route-card switchboard: destination entries as flat route cards in a shallow tray; the signal window gets one small status lamp.
- NO permanent cabinet sidebar, no drawer index. Plaques and bulletin board stay.

### Archives (strongest)
- The literal cabinet: 3 drawers (collected, changelog, sitemap) on the landing.
- Collected becomes catalog cards in a drawer with accession numbers and index-card paper.
- Artifact view keeps catalog-card anatomy; adds number plate + stamp positions.

## 4. Anti-repetition rules

1. No identical sidebars in all four sections (Cabin drawer ≠ Archives cabinet ≠ Fieldwork file index in proportion and dressing).
2. Amber title strips stay on `Panel` only; cabinet/paper primitives use their own labels (label plates, metadata strips, stamps) so strips don't stack on strips.
3. Not every page uses the 2-column index+content layout — Crossroads keeps single-column flow; detail pages already differ.
4. Not every object goes inside a folder — folders/tabs only where filing is the metaphor (indexes, cards, logs).
5. Page headers keep varying: PageHeader variants by section continue; cabinet work adds no new universal header.
6. Cabinet dressing never narrows the reading column below ~60ch on desktop; frames eat padding, not prose.

## 5. Implementation phases

1. ✅ This spec + ASSET-SYSTEM-PLAN.md
2. ✅ Build asset library in the hidden showcase (textures, icons, primitives, stamps, stickers, marks).
3. ✅ Apply and visually validate the layered-folder navigation on My Cabin only.
4. Adapt primitives for Archives (strongest treatment: landing cabinet + collected cards).
5. Fieldwork binder variant (experiment file index + notebook marks).
6. Crossroads switchboard variant (lightest cabinet treatment; the current surprise switchboard is content, not a cabinet migration).
7. Whole-site cohesion + anti-repetition review.

Only phase 3 has moved into route implementation. Phases 4–7 remain future work.
