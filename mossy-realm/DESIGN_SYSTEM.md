# MossyRealm Design System

The visual language of the realm: tokens, primitives, patterns, and the rules that keep one world built from one language.

**Live showcase:** `/design-system` (renders every token and primitive with usage guidance. If a change breaks that page, the change is wrong.)

**Content voice:** see `CONTENT_STYLE.md`. Casual, direct, no AI-sounding marketing, no trailing tildes in prose.

---

## 1. Principles

1. **Dense layout, simple behavior.** Complexity lives in composition, not animation.
2. **One artifact, scanned once.** Wallpaper and grain are global atmosphere. Components never add their own noise, glow, or particles.
3. **Amber structures, cream informs, green invites, orange warns.** Color has a job.
4. **Everything is a specimen in a field guide.** Panels are labeled boxes. If an element can't justify its label, it doesn't get a box.
5. **Handmade but systematic.** Weirdness is curated and sits on a strict grid with strict tokens.
6. **Keyboard is a first-class visitor.**
7. **Accessible without sanding off the retro.** Fix palette values, never the aesthetic.

## 2. Tokens

All tokens live in `app/globals.css`. Three layers:

```
--p-*            palette (raw hexes; never use directly in components)
semantic tokens  the ONLY values components reference
--mossy-*        deprecated aliases, kept for old code during migration
```

### Surfaces
| Token | Role |
|---|---|
| `--surface-page` | behind the wallpaper |
| `--surface-site` | the translucent publication body |
| `--surface-panel` | default panel body (deep moss) |
| `--surface-panel-alt` | elevated panel (lighter moss) |
| `--surface-inset` / `--surface-inset-alt` | recessed wells: cassette window, inputs, code |
| `--surface-interactive` | hover fills on rows |
| `--surface-strip` / `--surface-strip-hover` | amber title strips and primary buttons |
| `--surface-callout` / `--surface-callout-warning` | tinted callout fills |

### Text
| Token | Role |
|---|---|
| `--text-primary` | body cream (#f5f0e1) |
| `--text-secondary` | muted cream |
| `--text-heading` / `--text-heading-alt` | headings, strip emphasis |
| `--text-inverse` | on amber |
| `--text-warning` / `--text-success` | state text |
| `--interactive-link` / `--interactive-link-hover` | green links |

Tailwind utilities: `text-fg-primary`, `text-fg-secondary`, `text-fg-heading`, `text-fg-heading-alt`, `text-fg-inverse`, `text-fg-warning`, `text-link`, `text-accent`, `bg-surface-*`, `border-*`.

### Borders
| Token | Role |
|---|---|
| `--border-structural` | frames, panel borders (amber) |
| `--border-strong` | hover/glow amber |
| `--border-subtle` | hairlines, inner dividers |
| `--border-inset-edge` | inset well edges |
| `--border-focus` | the green focus ring |

Widths (utilities): `border-hairline` (1px), `border-panel` (2px), `border-frame` (3px), `border-site` (4px, the publication frame only).

### Type scale
`micro .7` · `meta .75` · `caption .85` · `base 1.0 (17px)` · `md 1.1` · `lg 1.25` · `xl 1.4` · `page-title` fluid · `display` fluid (site title, never clips at 320px).

### Fonts (five, five jobs)
| Font | Utility | Job |
|---|---|---|
| Cinzel Decorative | `font-display` | site title only |
| Cinzel | `font-heading` | page/panel titles, h1-h4 |
| Cormorant | `font-nav` | nav, labels, metadata, buttons |
| Lora | `font-body` | prose |
| Mystery Quest | `font-accent` | whisper lines, track titles, sign-offs |

### Shadows / motion / layers
- `--shadow-site` (publication frame), `--shadow-panel-inset` (wells), `--shadow-lift` (dock, sheet), `--shadow-glow-link`, `--shadow-glow-amber` → `shadow-*` utilities.
- `--dur-fast` 120ms, `--dur-med` 250ms, `--ease-realm` → `duration-fast`, `duration-med`, `ease-realm`. Animate only: menu disclosure, player state, loading, small confirmations.
- `--z-wallpaper` 0, `--z-site` 1, `--z-dock`/`--z-mobilebar` 40, `--z-dropdown` 100, `--z-grain` 9999 (always `pointer-events: none`).
- `--texture-grain-opacity` 0.26: the single source of grain intensity.

## 3. Primitives (`components/ui/`)

| Primitive | Use |
|---|---|
| `Panel` | The specimen box. `surface` panel/alt, `title` + `titleAs` + `titleRight`, `padding` sm/md/none. Evolved from RetroBox (shim still available). |
| `InsetPanel` | Recessed well. Cassette windows, code, inputs. Never nest panels inside it. |
| `Button` | `primary` (amber, one per panel) / `ghost` (moss, secondary). `sm` compact (grows to 44px on touch), `md` 44px. Actions only. |
| `IconButton` | Icon-only square. Same variants, `density` compact/regular/none. `aria-label` required. `href` renders it as a link. |
| `TextLink` | Green link. `arrow`, `back`, `underline={false}`, external-safe. Navigation only. |
| `Badge` | `chip` (90s web badge) / `pill` (metadata). Labels, never actions. |
| `Metadata` | Uppercase Cormorant meta row. Compose with `Badge variant="pill"`. |
| `Callout` | `note` (key takeaway, amber tint) / `warning` (orange, rare). |
| `Divider` | `structural` 2px amber / `subtle` hairline / `glyph` ✶ (rare). |
| `MediaFrame` | Amber frame + optional `caption` and `cornerTag` (decorative gif). |
| `FormField` + `Input` + `Textarea` | Bound label, inset well, hint/error with aria wiring. Radios use `accent-accent`. |
| `EmptyState` | Under-construction / empty / zero-result. Art slot + whisper title + factual message. |

Deliberately NOT built: `Stack`, `Cluster`, `Section`. Tailwind `flex`/`grid` + `space-y`/`gap` already covers them; wrappers would be abstraction for its own sake.

### Stationery surface roles

`StationerySurface` defines material roles without making them universal page templates. Routes opt in explicitly; defining a role does not migrate existing pages.

| Role | Purpose | Current use |
|---|---|---|
| `personal-graph-notebook` | Warm, soft moss graph stock for personal notes | `/cabin` and `/cabin/about` only |
| `engineering-graph-sheet` | Firmer engineering grid for measured test records | Reserved for Fieldwork; no migration yet |
| `aged-letter` | Fibered correspondence paper | Reserved |
| `recipe-card` | Ruled, lightly worn kitchen card | Reserved |
| `bulletin-notice` | Dusty pinned notice stock | Reserved |
| `catalog-card` | Ruled accession/index card | Reserved |
| `contact-sheet` | Dark photographic contact layout | Reserved |
| `terminal-insert` | Recessed print-banded phosphor insert | Reserved |

These roles reuse `public/assets/mossy-ui/` textures and existing semantic tokens. Do not make the personal green graph sheet the default for unrelated routes.

### Mossy Surprise contract

Surprises are optional page-level enhancements, not permanent shell furniture. Local sources and non-repeating selection live in `lib/surprises/`; remote signals go through server routes with timeouts, cache headers, and local fallbacks.

- Reveal first, navigate only after an explicit link click.
- Never fetch a remote surprise during initial page render.
- Buttons need visible focus and descriptive accessible names.
- Motion is optional and must obey `prefers-reduced-motion`.
- Every remote source needs a keyless local fallback.
- A page selects only the surprise types that fit its purpose.

Current integrations: the Cabin status lamp (local only) and the rabbit-hole switchboard (curated roads + Wikimedia signal).

## 4. Patterns & templates

- **`SiteShell`**: the one publication frame (header, nav, marquee, main, footer). Section layouts are thin wrappers; `subNav` slot takes `SubNav`.
- **`PageHeader`**: breadcrumb + eyebrow `[ like this ]` + h1 title + optional accent whisper + deck + structural rule. Every interior page's doorway.
- **`PageShell`**: PageHeader + content rhythm. `width="reading"` gives the 65ch measure; `width="full"` for grids; `aside` for a right rail.
- **`SubNav`**: section-local strip (cabin/fieldwork/crossroads/archives) between marquee and content.
- **Study-log timeline & dossier** (`study-log-*` classes): the learnings index and expedition pages. Documented pattern classes in globals.css.
- **Cassette objects** (`cassette-*`): the skeuomorphic radio hardware. Its material tokens (`--cassette-*`) are the one allowed exception to "no component colors": a physical object, not UI surface.
- **`UnderConstruction`**: gif chaos arranged around `EmptyState`. Art is decorative (`alt=""`), words are factual.

### Page templates
| Template | Routes |
|---|---|
| Outpost (dense 3-col) | `/` |
| Personal (PageShell reading) | `/cabin/*` |
| Long-form dossier | `/fieldwork/learnings/[slug]` |
| Listing/timeline | `/fieldwork/learnings` |
| Gallery/collected | `/fieldwork/gallery`, `/archives/collected` |
| Archive lists | `/archives/*` |
| Form | `/cabin/contact`, `/crossroads/guestbook` |
| Media deck | `/player` |
| Empty | all under-construction routes |

## 5. Navigation contract

- Desktop dropdowns open on hover, click, and ArrowDown; Escape closes and returns focus to the parent button.
- Parents are real `<button>` with `aria-expanded` / `aria-controls`; active page has `aria-current="page"` and a ✶ glyph (never color alone).
- Mobile accordion items are ≥44px; Escape closes.
- The green focus ring (`:focus-visible`, 2px `--border-focus`) is global. Never remove it without a replacement.

## 6. Realm Radio contract

Five surfaces, one language: homepage widget, `/player` deck, desktop dock, mobile bar, mobile sheet.

- Shared pieces: `PlayerControls` (prev/play/next; play always amber), `TrackStatus` (LED + text, never LED alone), `VolumeControl` (labeled slider, `aria-pressed` mute).
- Compact 32px chrome grows to 44px on coarse pointers (`.touch-target`).
- The visualizer reads CSS tokens (`--cassette-*`, `--status-*`); reels freeze under `prefers-reduced-motion`.
- Audio engine (`lib/player/`) is untouched by the design system.

## 7. Accessibility baseline

- Global `:focus-visible` ring; keyboard-operable nav, menus, scroll regions (`tabIndex` on ScrollBox).
- One h1 per page; panel strips are h2 by default (`titleAs` to change); landmarks via SiteShell.
- Decorative gifs get `alt=""`; content images get real alt.
- `prefers-reduced-motion`: marquee freezes readable, LEDs stop blinking, reels stop, transitions drop to instant.
- Touch targets ≥44px on coarse pointers; no content hidden under the mobile player bar; no horizontal overflow at 320px.
- Contrast (on `--surface-panel`): primary cream ≈12:1, secondary ≈7:1, link green ≈10:1, heading cream >10:1. Orange is large/short text only.

## 8. Rules of the realm (for future code)

1. Use semantic tokens. If a color isn't a token, it doesn't ship.
2. If it navigates, it's a link (`TextLink`). If it acts, it's a `Button`.
3. One amber primary action per panel.
4. Mystery Quest only whispers. Cormorant only labels. Lora only reads.
5. Border widths come from the scale (`hairline/panel/frame/site`), never arbitrary.
6. Grain and wallpaper are global. Components add none of their own effects.
7. Every state is designed: empty, loading, error, disabled, selected.
8. The `/design-system` page is the contract. Keep it true.
