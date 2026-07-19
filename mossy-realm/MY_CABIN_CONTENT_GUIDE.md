# My Cabin Content Guide

Everything editable in the cabin lives in ONE file:

```
mossy-realm/lib/cabin-content.ts
```

Each section of that file feeds one page. You never need to touch page code to add content. This guide explains every field.

---

## Quick reference

| Page | Data section | Add content by |
|---|---|---|
| `/cabin` | `cabinWelcome` | editing 3 strings |
| `/cabin/about` | `operator` | editing lists (facts, specs, interests, timeline, favorites) |
| `/cabin/now` | `now` | editing `processes`, `smallVictories`, `changelog` |
| `/cabin/crafting-table` | `workbench` | pushing to `activeBuilds`, `experiments`, `abandoned`, `buildLog` |
| `/cabin/recipes` | `recipeBox.recipes` | pushing a new recipe object to the TOP of the array |
| `/cabin/contact` | `contact` | setting `email`, editing `links`, `availability` |

Writing rules (from CONTENT_STYLE.md): one or two sentences per entry, no trailing tildes, no exclamation-mark hype, honest about unfinished things.

---

## /cabin — the landing hub

`cabinWelcome`:
- `whisper`: the accent-font line under the title. Keep the `~ ~` bracketing.
- `intro`: one short paragraph. What this room is.
- `doorStatus`: one line shown next to the green LED.

## /cabin/about — operator profile

- `intro`: 2–3 sentences, first person.
- `quickFacts`: ID-card rows. `{ label, value }`. Keep values under ~20 chars so the grid stays tidy.
- `systemSpecs`: playful sysinfo rows shown on the CRT. `{ label, value }`. Labels should be short ("os", "editor", "uptime").
- `interests`: groups of pills. `{ group, items[] }`. 3–5 groups, 2–4 items each.
- `timeline`: `{ year, entry }`. 3–6 entries. Replace the TODO prompts with real moments.
- `currentObsession`: one line.
- `favorites`: short strings with context in parentheses.
- `realmLinks`: `{ href, label, note }` pointing to parts of the realm.

## /cabin/now — status monitor

- `lastUpdated`: string shown in the strip. Update it when you update the page. Format `YYYY-MM-DD HH:MM`.
- `processes`: the process list. `{ label, value, led }`.
  - `led: 'green'` = actively doing, `'amber'` = idle/slow, `'off'` = parked.
- `recentlyFixed` / `recentlyBroken`: dated `{ date, note }` rows, newest first. The honest heartbeat of the page.
- `smallVictories`: one line each, brag-sized.
- `experiments`: one line each. Breaking is expected.
- `changelog`: `{ date, note }`, newest first. Prune old rows freely.

## /cabin/crafting-table — workbench

Index entries look like: `{ slug, title, note, led, href? }`.
- `led`: green = active, amber = slow, off = abandoned.
- Entries link to build sheets at `/cabin/crafting-table/[slug]`.

Full build sheets live in the `projects` array:

```ts
{
  slug: 'mossyrealm',            // matches the index entry
  title: 'mossyrealm',
  status: 'active',              // 'active' | 'logged' | 'abandoned' (the stamp)
  what: 'one line. what it was.',
  why: 'why it existed at all.',
  tools: ['next.js', 'tailwind'],
  notes: ['build notes, oldest first'],
  failures: ['the honest section. what broke.'],
  links: [{ href: '...', label: '...' }],
}
```

- `activeBuilds` / `experiments` / `abandoned` fill the workbench drawers; `tools` renders as pills; `buildLog` is `{ date, note }` newest first.
- Mark scaffolding with `sample: true` until it holds a real project.

## /cabin/recipes — the recipe box

Add a recipe by pushing to the TOP of `recipeBox.recipes`:

```ts
{
  slug: 'garlic-noodles',        // unique, kebab-case (becomes /cabin/recipes/garlic-noodles)
  title: '15-minute garlic noodles',
  section: 'quick meals',        // 'favorites' | 'quick meals' | 'experiments' | 'kerala'
  status: 'tested',              // 'favorite' | 'tested' | 'experiment' | 'failed'
  note: 'One or two sentences on the card index.',
  prepTime: '5 min',             // optional
  cookTime: '10 min',            // optional
  serves: '1',                   // optional
  ingredients: ['...'],          // checkbox list on the card
  steps: ['...'],                // numbered on the card
  kitchenNotes: ['...'],         // handwriting-font margin notes
  tags: ['noodles', 'weeknight'],
  image: '/images/cabin/...',    // optional card photo
}
```

- Cards link to full detail pages automatically (`/cabin/recipes/[slug]`, prev/next in filing order).
- The search box filters title, note, section, and tags.
- Delete the `sample: true` cards once real ones exist.
- The `kerala` section is a reserved tray; file hometown or family recipes there when ready.

## /cabin/contact — the mailbox

- `email`: where letters deliver. The form composes a mailto to this address. **Confirm this inbox exists.**
- `terminalIntro`: 2–3 short lines for the connection fragment.
- `availability`: honest response expectations, one or two lines.
- `formNote`: what the form is for, one line.
- `links`: `{ href, label, note }` for other doors (GitHub, guestbook...).

---

## Recommended images

The cabin is mostly text by design. If you add images later:

| Use | Size | Notes |
|---|---|---|
| Operator photo (about) | ~256×256 px | replace the dashed "not developed yet" frame |
| Crafting screenshots/diagrams | 640px wide max | drop in `public/images/cabin/` |
| Recipe card photos | 320×240 px | small, index-card sized |

Keep images compressed; the grain overlay already adds atmosphere, so clean small files win.

## Optional fields

- Recipe `time`, `serves`, `outcome`: omit and the card hides them.
- Build `href`: omit and no link renders.
- PageHeader decks/whispers are in the page files, not the content file; edit rarely.

## Content ideas

**About:** first computer, first site, a tool that changed how you think, the story behind "mossyrealm".
**Now:** what you actually built this week, the book on the desk, the problem you keep circling.
**Crafting table:** the thing you built to learn X, the prototype that died to a scope creep, your dotfiles.
**Recipes:** the 15-minute meal you make weekly, the dish that failed three times before working, amma's recipe you finally wrote down.
**Contact:** your actual email, a second link you check daily.

---

## Texture notes (for future page edits)

- Cabin panels can add `className="texture-cabin"` for the rougher dither finish (used on the landing welcome panel). Use sparingly: one or two panels per page.
- Terminal fragments use `<InsetPanel className="crt">` + `className="terminal"` text. The CRT scanlines are static and reduced-motion safe.
- The global grain overlay sits at `--texture-grain-opacity: 0.30`. Do not add per-component noise images.

---

## Beyond the cabin: where everything lives

The realm keeps one content file per wing. Same rules everywhere: short lines, honest labels, samples marked.

| Wing | File | What it holds |
|---|---|---|
| My Cabin | `lib/cabin-content.ts` | profile, status, workbench + build sheets, recipes, mailbox |
| Fieldwork | `lib/fieldwork-content.ts` | binder cover, experiment test logs, field notes, gallery frames |
| Crossroads | `lib/crossroads-content.ts` | junction copy, destinations, transmissions, credits, signal config |
| Archives | `lib/archives-content.ts` | catalog room, artifact accession entries |
| Updates (site-wide) | `content/updates/YYYY-MM.md` | monthly update log (homepage + changelog read it) |

### Fieldwork quick reference

New experiment in `lib/fieldwork-content.ts` → `experiments` array. Fields: `slug, title, accession (FW-###), area, status (running|logged|inconclusive|failed), summary, hypothesis, apparatus[], procedure[], measurements[{label,value}], unexpected?, failureNotes[], conclusion?, nextExperiment?`. Detail page renders at `/fieldwork/experiments/[slug]`.

### Crossroads quick reference

- Destinations: `rabbitHoles.destinations` (`{title, href, note, kind}`). Empty `href` renders as a TODO slot.
- Transmissions: `guestbook.transmissions` (`{date, name, message}`). Pin by hand.
- The weather signal: `signal` block. `enabled: false` shows the fallback line forever. Coordinates are set to San Francisco — change `latitude/longitude/station` to yours.

### Archives quick reference

New artifact in `lib/archives-content.ts` → `artifacts` array (`{slug, accession (MR-###), title, kind, duty, provenance, src?, acquired, notes?}`). View page renders at `/archives/collected/[slug]`. The changelog reads `content/updates/` automatically; nothing to edit here.
