# 🌿 MossyRealm Design Journal

A log of design experiments, lessons learned, and random ideas for MossyRealm.

*Started January 2026*

---

## 📋 Ideas & TODOs

Things I want to try or explore later:

- [x] Make a public "design learnings" page on the site *(Jan 16 - doing it!)*
- [ ] Try a simpler cursor - maybe just a color change or subtle glow?
- [ ] Explore more authentic 90s interactions (what did old sites ACTUALLY do?)
- [ ] Look at real GeoCities archives for inspiration
- [ ] Consider seasonal themes (fall leaves? winter snow?)

---

## 🗺️ Navigation Philosophy (Worth Remembering!)

*Figured this out Jan 16, 2026 while deciding where to put the learnings page.*

### The Framework: Directions of Energy

```
                    🌲 THE CABIN
                    (inward, personal)
                          ↑
                          |
    🔗 RABBIT HOLES ←── OUTPOST ──→ 📚 SWAMP TREASURES
    (outward, external)    |        (earned, collected)
                          |
                          ↓
                    🌸 PRESSED FLOWERS
                    (created, preserved)
                    
                    📖 GUESTBOOK
                    (community, others)
```

### What Goes Where?

| Section | Energy | Question to Ask |
|---------|--------|-----------------|
| **Outpost** | Welcome | *"What should visitors see first?"* |
| **The Cabin** | Inward | *"Is this about ME specifically?"* |
| **Swamp Treasures** | Earned | *"Did I invest time to discover/understand this?"* |
| **Pressed Flowers** | Created | *"Did I CREATE this?"* |
| **Guestbook** | Community | *"Is this from/for visitors?"* |
| **Rabbit Holes** | Outward | *"Does this lead AWAY from my site?"* |

### Quick Reference

| Content Type | Goes In | Why |
|--------------|---------|-----|
| About me | The Cabin | Personal |
| Design learnings | Swamp Treasures | Earned wisdom |
| Art/photos I made | Pressed Flowers | Created |
| Cool sites I like | Rabbit Holes | External links |
| Tutorials/guides | Swamp Treasures | Earned knowledge |
| Personal blog posts | The Cabin | Personal reflection |
| Resource collections | Swamp Treasures | Curated finds |

### Key Insight

**Swamp Treasures = things you had to DIG for.** Time + effort = treasure. It's shareable wisdom, not personal diary stuff. "Things I found that you might want too."

---

## 🗓️ Journal Entries

---

### January 16, 2026 - The Great Cursor & Effects Experiment

#### What I tried:
- **Custom cursors**: Pressed flower (opens on hover), wax seal stamp (stamp animation on click)
- **Particle effects**: Sparkle trail following cursor, fireflies floating around
- **Button hovers**: Windows 95 bevel buttons, instant color swaps, glow effects
- **Click animations**: Wax seal "stamp squash" impression on every click

#### What happened:
Went pretty deep into this rabbit hole. Got the wax seal cursor working with a satisfying stamp animation. Added fireflies floating around. Tried sparkle trails. Even got the fireflies to blend with the grain filter using `mix-blend-mode: screen`.

Then I looked at the page and was like... *oh no*.

#### What I learned:

**1. More effects ≠ better vibes**

The page was already pretty busy with the retro boxes, borders, marquee, background image, grain overlay... Adding a fancy cursor + sparkles + fireflies + click animations made it feel like a circus. Too much going on.

**2. 90s sites were simple for a reason**

I always thought old websites had simple interactions because of technical limitations. But actually? When you have a visually dense layout (lots of boxes, borders, patterns), simple interactions make sense. The complexity is in the *layout*, not the *behavior*.

Modern sites flip this - minimal layouts but fancy animations. You can't have both maxed out without it feeling overwhelming.

**3. Cursors are tricky**

- Animated cursors (`.ani`) don't work in most browsers
- Custom cursors need to be small (32x32px max recommended)
- Hover state cursor changes feel janky, not magical
- The satisfying click animation I imagined... was actually distracting in practice

**4. The "HD fireflies on grainy page" problem**

Even after putting fireflies behind the grain layer, they looked too clean and sharp compared to the deliberately lo-fi aesthetic. Had to use `mix-blend-mode: screen` to make them blend. Lesson: new elements need to match your existing vibe, not fight against it.

#### Decision:
Reverted everything back. The site doesn't need fancy cursors or particle effects right now. Maybe later I'll try something more subtle, but for now - **less is more**.

The irony of building a 90s-style site and learning why 90s sites were the way they were... 😅

#### Files kept for reference:
- `cursor-experiments/` - all the cursor conversion scripts and previews
- `effects-experiments/` - firefly and sparkle preview page
- `button-experiments/` - 90s vs modern button hover styles

Good to have these for later if I want to revisit with a lighter touch.

---

### Template for future entries:

```
### [Date] - [Title]

#### What I tried:
- 

#### What happened:
- 

#### What I learned:
- 

#### Decision:
- 

#### Files/references:
- 
```

---

## 💭 Random Thoughts

A place for quick notes that don't deserve a full entry:

- *Jan 16*: Maybe the cursor should just be... a cursor. Not everything needs to be special.
- *Jan 16*: The grain overlay is doing a lot of heavy lifting for the aesthetic. Don't fight it, lean into it.

---

## 🔗 Future: Public Learnings Page

**Goal:** Turn this journal into a page on MossyRealm itself, so visitors can see:
- What I tried
- What failed and why
- Lessons for other retro web builders

Kind of like a "behind the scenes" or "making of" page. Could be fun and helpful for the Neocities community!

**TODO:** Create `/learnings` or `/behind-the-scenes` page that pulls from this journal.

---

*"The best design is the one you don't notice."* - probably someone smart


