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
- `smallVictories`: one line each, brag-sized.
- `experiments`: one line each. Breaking is expected.
- `changelog`: `{ date, note }`, newest first. Prune old rows freely.

## /cabin/crafting-table — workbench

Build entries look like: `{ title, note, led, href? }`.
- `led`: green = active, amber = slow, off = abandoned.
- `href` is optional; use it for GitHub repos or learnings posts.

- `activeBuilds`: what is literally on the bench now.
- `experiments`: half-baked, in progress.
- `abandoned`: the honest shelf. Name what died and why in one line.
- `tools`: short strings, rendered as pills.
- `buildLog`: `{ date, note }`, newest first.

## /cabin/recipes — the recipe box

Add a recipe by pushing to the TOP of `recipeBox.recipes`:

```ts
{
  id: 'garlic-noodles',          // unique, kebab-case
  title: '15-minute garlic noodles',
  section: 'quick meals',        // 'favorites' | 'quick meals' | 'experiments' | 'kerala'
  time: '15 min',                // optional
  serves: '1',                   // optional
  tags: ['noodles', 'weeknight'],
  note: 'What it is, and the one trick that makes it work.',
  outcome: 'worked',             // only for experiments: 'worked' | 'failed'
}
```

- The search box filters title, note, section, and tags automatically.
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
