# 🖱️ Cursor Experiments

Custom cursor exploration for MossyRealm's 90s aesthetic.

---

## 📁 Structure

```
cursor-experiments/
├── scripts/           # Python conversion tools
├── previews/          # HTML preview pages
├── converted/         # ANI→GIF, CUR→PNG files
└── cursors-archive/   # Final cursor assets
```

---

## 🛠️ Scripts

| Script | Purpose |
|--------|---------|
| `convert_ani_to_gif.py` | Convert animated .ani files to .gif |
| `convert_cur_to_png.py` | Convert static .cur files to .png |
| `split_flower_cursor.py` | Split flower image into closed/open states |
| `split_waxseal_cursor.py` | Split wax seal image into stamp/seal states |

### Usage

```bash
# Activate venv (Pillow required)
source ../../scripts/venv/bin/activate

# Run conversion
python scripts/convert_ani_to_gif.py
```

---

## 🌸 Cursors Archive

### Pressed Flower (`cursors-archive/flower/`)
- `flower-closed.png` - Default state (32x32)
- `flower-open.png` - Hover state (32x32)
- `*-preview.png` - Larger preview versions (64x64)

**Concept:** Botanical pressed wildflower that gently "opens" on hover.

### Wax Seal (not yet created)
- `waxseal-stamp.png` - Default state (brass stamp handle)
- `waxseal-seal.png` - Hover/click state (wax impression)

**Concept:** Vintage wax seal stamp with satisfying click animation.

---

## 🔗 Previews

Open `previews/cursor-preview.html` to see all converted cursors in action.

---

## 📝 Notes

- Web browsers support `.cur` and `.png` for cursors
- `.ani` (animated) must be converted to `.gif` for web
- Cursor hotspot: center-bottom for stamps, center for flowers
- Max recommended size: 32x32px (larger may not work on all browsers)

---

*Part of MossyRealm design-kitchen*

