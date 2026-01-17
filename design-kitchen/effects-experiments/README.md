# ✨ Effects Experiments

Particle and interactive effects exploration for MossyRealm.

---

## 📁 Files

| File | Description |
|------|-------------|
| `effects-preview.html` | Interactive preview of all effects with toggles |

---

## 🌟 Explored Effects

### Sparkle Trail
- Golden sparkles follow cursor
- Fade out after short delay
- 90s magic fairy dust vibe

### Fireflies 🪻
- Ambient floating orbs
- Random movement paths
- Pulsing glow animation
- Reduced count on mobile for subtlety

### Dust Motes ☀️
- Tiny particles floating like sunlight
- Very subtle, atmospheric

### Stamp Impression 📜
- Wax seal appears on click
- Bouncy "squash" animation
- Matches wax seal cursor

### Glow Trail 🕯️
- Elements softly illuminate as cursor passes
- Warm candlelight feel

---

## 💡 Implementation Notes

### Fireflies (Recommended)
```css
.firefly {
  position: fixed;
  pointer-events: none;
  z-index: 50;
  mix-blend-mode: screen; /* Blends with grain! */
  animation: firefly-float 10s ease-in-out infinite;
}
```

### Mobile Considerations
- Disable cursor-based effects (no cursor on touch)
- Reduce particle counts (4 fireflies vs 12)
- Consider disabling animations for performance

---

## 🎯 Recommendations for MossyRealm

1. **Fireflies** - Fits forest theme, subtle, magical
2. **Stamp impression on click** - Satisfying, matches wax seal cursor
3. Avoid sparkle trail (too busy, distracting)

---

*Part of MossyRealm design-kitchen*

