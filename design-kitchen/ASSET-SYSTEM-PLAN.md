# Asset System Plan — Notebook + Cabinet Hybrid

*Inventory for the MossyRealm asset library. Every asset: purpose, section usage, format, dimensions, variants, states, decorative-or-semantic, mobile behavior. Built under `public/assets/mossy-ui/` (files), `app/mossy-ui.css` (styles), and `components/mossy-ui/` (React).*

Existing assets to reuse, not recreate: `--p-*` palette + semantic tokens, `.stamp`, `.accession-tag`, `.led-*`, `.texture-cabin`, `.crt`, `.terminal`, graph-paper classes, Panel/Badge/Callout/Divider/InsetPanel primitives, grain overlay.

New tokens (the only additions, "physical object" exception like `--cassette-*`):
`--surface-paper: #e8dcc0`, `--surface-paper-aged: #d9cba6`, `--text-on-paper: #2b2a1e`.

---

## 1. Cabinet & drawer assets (`cabinet/`)

| Asset | Purpose | Format | Dims/ViewBox | Variants | States | Semantics | Mobile |
|---|---|---|---|---|---|---|---|
| Cabinet frame | outer body of cabinet regions | CSS `.mui-cabinet` + `CabinetIndex` component | full width, p-3/4 | plain / with screws | — | semantic landmark | screws hide <390 |
| Drawer face | one openable drawer row | CSS + `DrawerFace` | h 44–48px | label-only / label+caption / with lamp | default/hover/active/focus | interactive (link/button) | no slide, tap opens |
| Recessed drawer opening | empty/open slot | CSS `.mui-drawer-inset` | full width, min-h 40px | — | — | decorative container | — |
| Drawer handle | pull on the face | `cabinet/handle.svg` + CSS | 44×10 | cup / bar | hover darkens | decorative (face is the button) | — |
| Label holder | framed label plate on face | CSS `.mui-label-plate` | auto, 2px 8px | default / active amber | active state marks current file | semantic (carries label text) | — |
| Number plate | small index number | `labels/number-plate.svg` + CSS | 22×14 | 01–99 | — | decorative (text beside is real) | — |
| Screws/rivets | cabinet corner hardware | `hardware/screw.svg` | 8×8, 12×12 | phillips / slot / rivet | — | decorative aria-hidden | hide if tight |
| Drawer shadow | depth under open face | CSS `.mui-drawer-shadow` | — | — | — | decorative | — |
| Open drawer edge | the face's pulled-out edge | CSS (border-right accent) | 3px | — | — | decorative | — |
| Folder stack | layered folders behind active | CSS `.mui-folder-stack` | offset 3/6px | 2/3 layers | — | decorative | 1 layer |
| Active folder | current folder card | `DrawerFace` variant | — | — | open 3px + amber plate + ✶ + lamp | semantic, aria-current | ✓ |
| Hovered folder | hover treatment | `DrawerFace` state | — | — | slide 2px | — | n/a |
| Empty drawer | unfilled slot | `DrawerFace` variant + `EmptyDrawer` note | h 40px | — | — | semantic (explains) | ✓ |
| Status lamp | tiny LED on faces | reuse `.led-*` + `hardware/lamp.svg` | 7×7 | green/amber/off/blink | live state | semantic + text label always | ✓ |

## 2. Paper & notebook (`paper/`, `notebook/`)

All CSS surfaces (+ React wrappers), no giant background images.

| Asset | Purpose | Format | Variants | Notes |
|---|---|---|---|---|
| `PaperSheet` | plain aged paper surface | component + `.mui-paper` | plain/aged | token colors |
| `NotebookSheet` | ruled paper | `.mui-paper-ruled` | line spacing | reuse `.ruled-lines` engine |
| Graph sheet | engineering grid | `.mui-paper-graph` (paper-tinted) | faint | on paper, distinct from moss graph-paper |
| Log sheet | Fieldwork test log | `.mui-paper-log` | margin column + sheet number | engineering log |
| `IndexCard` | catalog card | component | ruled/plain, with metadata strip | Archives |
| `RecipeCardSurface` | recipe card | component | stained option | extends existing stained-card |
| Letter paper | contact/mail | `.mui-paper-letter` | — | |
| Bulletin notice | guestbook posts | `.mui-notice` | pinned variant | |
| Torn note | small fragments | `.mui-note-torn` | torn edge via clip-path | |
| Folded corner | page fold | CSS `.mui-fold-corner` | top-right | decorative |
| Folder tabs L/C/R | tab shapes | `paper/tab-{left,center,right}.svg` + CSS | inactive/active | |
| Stacked-paper edge | depth edge | CSS `.mui-paper-stack` | 2/3 sheets | |
| Paperclip | attachment | `paper/paperclip.svg` | 12×28 | decorative |
| Tape strip | attachment | `paper/tape.svg` + CSS | ~64×18, rotate variants | translucent amber-tint |
| Pushpin | bulletin | `paper/pushpin.svg` | 10×10 | reuse accent color |
| Staple | attachment | CSS `.mui-staple` | 14×4 | |
| Binder holes | notebook left edge | CSS `.mui-binder-holes` | 3/4 holes | decorative |
| Spiral binding | notebook spine | CSS `.mui-spiral` | dark coil, 10px spacing | Fieldwork logs |
| Ring-binder loops | binder spine | CSS `.mui-rings` | 3 rings | Archives binder variant |

## 3. Labels & stamps (`labels/`, `stamps/`)

Two kinds: **editable** (React `Stamp` with text prop — default) and **baked** (static SVG for fixed wordmarks).

| Stamp | Kind | Variants |
|---|---|---|
| ACTIVE / ARCHIVED / FAILED / TESTED / SAMPLE / TODO / WIP / UNCATALOGUED | editable `Stamp` | color via status prop (success/amber/warning/neutral) |
| TRANSMISSION RECEIVED | editable `Stamp` | neutral |
| DO NOT ERASE | baked `stamps/do-not-erase.svg` | red-orange |
| PROPERTY OF MOSSYREALM | baked `stamps/property-of-mossyrealm.svg` | green |
| Date stamp | editable `StampDate` | date from content |
| Accession stamp | editable `Stamp` + `.accession-tag` | FW-/MR- prefixes |
| "OFFICIAL BUSINESS" (playful confidential) | baked `stamps/official-business.svg` | amber |
| Handwritten check | `stamps/check-mark.svg` | green, stroke style |
| Cross-out mark | `stamps/cross-out.svg` | accent, diagonal strokes |
| Registration marks | `stamps/registration.svg` | corner crosshairs ×4 |
| Measurement arrows | `stamps/measure-arrow.svg` | horizontal/vertical, dashed line + arrowheads |

Stamp base: rotated (-4deg), 2px solid currentColor, uppercase `font-nav` 0.8rem, letterspacing 0.18em (extends existing `.stamp`).

## 4. Icon family (`icons/`, `MossyIcon`)

One sprite: `icons/sprite.svg` with `<symbol>` per icon, 24 viewBox, stroke 1.75px currentColor + selective fills, square caps/joins (late-90s utility style, NOT rounded SaaS). `MossyIcon` renders `<svg width={16|20|24}><use href="...#i-{name}"/></svg>`.

Names (45): cabin, profile, status, workbench, recipe, mail, experiment, learnings, note, gallery, hardware, gamepad, gear, rocket, drone, target, network, packet, pipeline, build, test, warning, success, failure, radio, signal, guestbook, rabbit-hole, external, archive, collected, changelog, sitemap, folder, file, floppy, cdrom, terminal, book, music, cooking, weather, trail, telescope.

States: inherit currentColor (links/buttons color them automatically). Decorative by default (aria-hidden); `label` prop makes them semantic.

## 5. Stickers (`stickers/`)

Static SVG, flat 2–4 color art (moss greens + amber + cream), ~96×96 viewBox, simple shapes, outline 2px. No photorealism.

- frog base (shared shapes) ×6 poses: desk, wrench, notebook, terminal, folder, radio
- tiny objects: rocket, CRT, beige-pc, gamepad, cassette, floppy, gears, satellite dish, forest sign, coffee mug, tangled cable
- word stickers (editable text via component `StickerText` with SVG banner): "built instead of sleeping", "works on my machine", "the graph was wrong", "some projects become folders"

## 6. Section marks (`section-marks/`)

40×40 emblems, shared frame (rounded-square, 2px border), distinct glyph:
- cabin: house + desk lamp inside
- fieldwork: caliper over measurement ticks
- crossroads: signpost with two planks
- archives: drawer with label plate
React `SectionMark` component (section prop). Decorative unless labeled.

## 7. Textures (`textures/` + CSS in mossy-ui.css)

Seamless ≤120px SVG tiles + CSS layers, opacity via tokens (`--texture-paper-opacity` etc.). No full-screen rasters.

| Tile | Use | Opacity target |
|---|---|---|
| `paper-fiber.svg` | paper surfaces | 0.04–0.06 |
| `dust-specks.svg` | cabinet/patina | 0.05 |
| `print-banding.svg` | log printouts | 0.03 |
| `ink-imperfect.svg` | stamps area | 0.06 |
| `smudge.svg` | rare, one corner | 0.05 |
| `photocopy-noise.svg` | scans (reuse grain engine at lower freq) | 0.08 |
| `edge-wear.svg` | paper edges (border-image or pseudo) | 0.10 |
| `cabinet-patina.svg` | cabinet frames | 0.06 |

Rules: pointer-events none, reduced-motion safe (all static), text contrast verified on paper (dark ink #2b2a1e on #e8dcc0 ≈ 12:1).

## 8. React primitives (`components/mossy-ui/`)

`MossyIcon`, `CabinetIndex`, `DrawerFace`, `DrawerHandle`, `FolderTab`, `PaperSheet`, `NotebookSheet`, `IndexCard`, `RecipeCardSurface`, `Stamp`, `StampDate`, `StatusLabel`, `Paperclip`, `TapeStrip`, `SectionMark`.

Variant APIs (`variant`, `active`, `count`, `tone`) — no scattered class strings. Server components except where interaction demands client (disclosure).

## 9. Assets needing real image generation

The frog stickers at mockup quality (painterly, shaded) exceed honest SVG flat art. Flat SVG versions ship in the library; `IMAGE-ASSET-BRIEFS.md` lists upgraded versions with composition/palette/dimensions if the user wants richer art later.
