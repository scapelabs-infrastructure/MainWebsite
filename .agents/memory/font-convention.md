---
name: Font convention
description: Which fonts go where on the ScapeLabs site — recurring source of confusion.
---

**Rule:** Inter is the default for everything. Playfair Display Italic is now used in ONLY ONE place.

**Playfair Display Italic — approved location:**
1. `Manifesto.tsx` — founder signature quote ("— Laris Marcu, ...")

**Hero is now ALL Inter (no Playfair):** the headline is bold uppercase Inter, rendered as two `<span className="block">` lines (line2 `whitespace-nowrap` with a `clamp()` font-size so the long line never wraps and still fits ~320px phones). The user explicitly overrode the earlier "Playfair for hero subtitle/accent" rule — do NOT re-introduce Playfair or italic/gradient into the hero.

**Inter — everything else:**
- All section h2/h3 titles
- All body/paragraph text
- All buttons and nav items
- All card titles, subtitles, taglines, labels

**Why:** User explicitly stated: Inter Bold/Semi-Bold with tracking/uppercase for all titles, menus, buttons, body. Playfair Display Italic only for the elegant organic accent/signature contrast.

**How to apply:** When writing any new component, set `fontFamily: "'Inter', sans-serif"` on all elements by default. Only use `fontFamily: "'Playfair Display', serif"` + `fontStyle: 'italic'` for the very specific accent/quote elements listed above.
