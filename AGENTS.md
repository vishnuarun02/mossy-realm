# AGENTS.md

Project-wide guidance for coding agents working in this repository.

## Start here

1. Run `git status --short --branch` and inspect recent commits before editing.
2. Read `README.md` for the project overview.
3. Read `mossy-realm/DESIGN_SYSTEM.md` before UI work.
4. Read `mossy-realm/CONTENT_STYLE.md` before writing visitor-facing copy.
5. For cabinet, paper, or stationery work, also read:
   - `design-kitchen/ASSET-SYSTEM-PLAN.md`
   - `design-kitchen/FILE-CABINET-IMPLEMENTATION-SPEC.md`
6. Treat the current code and Git history as the source of truth. Documentation describes intent but may lag behind later commits.

## Repository layout

- `mossy-realm/`: Next.js 16 App Router application. Run application commands here.
- `mossy-realm/app/`: routes, layouts, API handlers, and global styles.
- `mossy-realm/components/ui/`: general design-system primitives.
- `mossy-realm/components/mossy-ui/`: cabinet, paper, icon, attachment, and stationery primitives.
- `mossy-realm/components/cabin/`: Cabin-specific composition and styling.
- `mossy-realm/components/surprises/`: optional Cabin and Rabbit Holes interactions.
- `mossy-realm/lib/`: server helpers, content loaders, player code, and surprise logic.
- `mossy-realm/public/assets/mossy-ui/`: reusable tabs, hardware, textures, stamps, stickers, and marks.
- `design-kitchen/`: design plans and implementation references, not runtime application code.

## Common commands

Run these from `mossy-realm/`:

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

Before handing off a substantial change, run:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

Also run `git diff --check` from the repository root.

## Engineering conventions

- Use TypeScript and existing Next.js App Router patterns.
- Prefer Server Components. Add `"use client"` only where browser state, effects, or event handling require it.
- Reuse existing primitives before introducing another abstraction.
- Keep route-specific presentation scoped to that route or component. Do not turn one page's visual treatment into a site-wide default.
- Use semantic design tokens from `app/globals.css`. Do not introduce arbitrary component colors when a token exists.
- Navigation uses links. Actions use buttons. Preserve visible focus states and meaningful accessible names.
- Support keyboard operation, `prefers-reduced-motion`, touch targets, and screen-reader state announcements.
- Avoid horizontal overflow. For responsive UI work, verify at 1440px, 768px, 390px, and 320px at 100% zoom.
- Do not add secrets or `.env*` files to Git.

## Content conventions

Follow `mossy-realm/CONTENT_STYLE.md`:

- Write casually and directly.
- Avoid AI-marketing language and excessive enthusiasm.
- Do not use em dashes or trailing tildes in visitor-facing prose.
- Explain technical decisions and failures rather than padding basic steps.

## Current feature contracts

### Cabin and stationery

- The Cabin desktop index is an approximately 194px layered file stack built from repository assets.
- Keep one shared handle, outer-frame screws, readable one-line labels, tab masks, edge wear, and number plates.
- `/cabin` and `/cabin/about` use the opt-in `personal-graph-notebook` stationery role.
- Other stationery roles are defined for future use but must not be applied to unrelated routes without an explicit task.
- Preserve the responsive mobile index, Escape behavior, focus visibility, and no-overflow behavior.

### Mossy Surprises

- Surprises reveal locally before any external navigation. Never navigate automatically.
- Do not make a remote surprise request during initial page rendering.
- Remote sources must be keyless, non-blocking, cached, validated, timeout-bounded, and backed by local fallbacks.
- Rabbit-hole road selection must avoid immediate repeats of the current and previous choices.
- Motion must respect `prefers-reduced-motion`.
- Current integrations are limited to `/cabin` and `/crossroads/rabbit-holes` unless a task explicitly expands the scope.

## Git workflow

- Do not discard or overwrite existing worktree changes you did not create.
- Keep changes focused on the user's requested scope.
- Review `git diff` and `git status` before reporting completion.
- Do not commit, amend, merge, push, rebase, or delete branches unless the user explicitly requests it.
- When asked to commit, report the commit hash. When asked to push or merge, verify the remote ref afterward.
