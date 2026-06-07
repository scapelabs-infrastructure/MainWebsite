---
name: Font convention
description: Which fonts go where on the ScapeLabs site — recurring source of confusion.
---

**Rule:** Inter is the default for everything. Playfair Display Italic is used only for 3 specific accent elements.

**Playfair Display Italic — approved locations:**
1. `Hero.tsx` — the italic subtitle above the main title ("The R&D Lab")
2. `Hero.tsx` — the italic colored accent line below the main title ("as a Platform.")
3. `Manifesto.tsx` — founder signature quote ("— Laris Marcu, Founder & President...")

**Inter — everything else:**
- All section h2/h3 titles
- All body/paragraph text
- All buttons and nav items
- All card titles, subtitles, taglines, labels

**Why:** User explicitly stated: Inter Bold/Semi-Bold with tracking/uppercase for all titles, menus, buttons, body. Playfair Display Italic only for the elegant organic accent/signature contrast.

**How to apply:** When writing any new component, set `fontFamily: "'Inter', sans-serif"` on all elements by default. Only use `fontFamily: "'Playfair Display', serif"` + `fontStyle: 'italic'` for the very specific accent/quote elements listed above.
