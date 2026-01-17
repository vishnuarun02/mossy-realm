# 🔘 Button Experiments

Button hover style exploration for MossyRealm's 90s aesthetic.

---

## 📁 Files

| File | Description |
|------|-------------|
| `button-hover-preview.html` | Modern hover styles (smooth transitions) |
| `button-hover-90s.html` | Authentic 90s styles (no transitions!) |

---

## ✨ Modern Styles (`button-hover-preview.html`)

| Style | Description |
|-------|-------------|
| Soft Glow | Golden glow radiates outward |
| Gentle Lift | Button rises with shadow |
| Border Pulse | Border pulses/brightens |
| Fill Sweep | Color fills from bottom |
| Underline Grow | Golden line grows under text |
| Subtle Scale | Button grows slightly |
| Glow + Lift Combo | Best of both! |

---

## ⚡ Authentic 90s Styles (`button-hover-90s.html`)

| Style | Description |
|-------|-------------|
| Instant Color Swap | No transition, just BAM |
| Windows 95 Bevel | Raised 3D, sinks on click! |
| Underline Only | Simple text decoration |
| Dotted Border | Solid → dotted on hover |
| Dashed Border | Solid → dashed with glow |
| Full Inverse | Text/background swap |
| Double Border | Chunky double-line frame |
| Ridge ↔ Groove | 3D border style swap |
| Tiled Pattern | Diagonal stripes appear |
| Text Glow Only | Just text gets warm glow |

---

## 🎯 Recommendations for MossyRealm

### For Authentic 90s Feel:
1. **Windows 95 Bevel** - Satisfying click, nostalgic
2. **Instant Color Swap** - Classic, no transitions
3. **Text Glow Only** - Subtle, matches fireflies

### Key Rule:
**No transitions!** 90s web was instant and clunky - that's the charm.

```css
/* 90s authentic - NO transition property! */
.nav-btn:hover {
  background: var(--mossy-border);
  color: var(--mossy-bg-box);
}
```

---

## 🖱️ Windows 95 Bevel Implementation

```css
.nav-btn-bevel {
  background: linear-gradient(180deg, #4a6b4a 0%, #355a45 100%);
  border-style: outset;
  border-width: 3px;
  border-color: #6b8c5a #2a4a35 #2a4a35 #6b8c5a;
}

.nav-btn-bevel:hover {
  background: linear-gradient(180deg, #5a7b5a 0%, #456b55 100%);
  color: var(--mossy-header);
}

.nav-btn-bevel:active {
  border-style: inset;
  border-color: #2a4a35 #6b8c5a #6b8c5a #2a4a35;
  box-shadow: inset 1px 1px 2px rgba(0,0,0,0.3);
}
```

---

*Part of MossyRealm design-kitchen*

