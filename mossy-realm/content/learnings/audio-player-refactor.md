---
title: Audio Player Refactor
slug: audio-player-refactor
date: 2026-02-05
category: frontend
topic: compsci
keyTakeaway: Working software beats clever software. One global Howler instance beat five days fighting Webamp + React StrictMode.
summary: Removed Webamp. Added a custom unified player. Playback persists across routes; R2 tracks load via /api/tracks. Lost some visual flair. Gained stability and sanity.
tags:
  - audio
  - webamp
  - react
  - refactor
changelog: "removed: webamp · added: custom unified audio player"
related:
  - site-wiring
---

**removed:** [webamp](https://github.com/captbaritone/webamp)  
**added:** custom unified audio player

Initially integrated [Webamp](https://webamp.org) because the UI matched the site aesthetic really well. Classic winamp-style player, playlists, visualizer. Looked great in isolation.

Integration into a React SPA was the actual problem. Spent almost 5 days on this. Even tried building my own version using AI at some point. Honestly not worth my time.

Issues I ran into:

- Webamp renders directly to document.body, which bypasses React entirely
- React StrictMode double-mounts in dev, resulting in orphaned DOM nodes
- Frequent removeChild errors during route changes
- Two independent audio engines existed at the same time: homepage player and webamp player
- Navigating between routes could cause both to play simultaneously
- R2 + CORS issues caused Webamp to skip tracks without playing audio
- Window positioning / centering required far more work than justified

None of this was subtle. Debugging felt like someone tied my hands up and tossed a bucket of cement over my head.

Removed Webamp entirely. Implemented a single global audio engine using Howler.js. One audio instance, one source of truth, shared across all routes. Playback persists through navigation. Track changes propagate everywhere. Simpler system, fewer edge cases, predictable behavior.

Lost some visual flair. Gained stability, clarity, and sanity.

> I read a while ago that "working software beats clever software every time." This was one of those moments where that line applied very literally, I guess.

Webamp is solid software. Just not designed for modern React routing, StrictMode, or shared application state. Forcing it into that shape created more complexity than it removed.
