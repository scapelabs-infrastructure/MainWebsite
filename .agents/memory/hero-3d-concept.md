---
name: Hero 3D concept
description: What the ScapeLabs homepage hero Three.js scene must depict — user has rejected abstract twice.
---

The hero background 3D scene (`frontend/src/components/ParkScene3D.tsx`) must be a **literal, recognizable park viewed from above**, where the camera descends and focuses onto a **central alley**. It must contain literal objects, NOT abstract sci-fi:

- Central alley/walkway with branch paths, lawns, trees, benches
- Interactive screen kiosks (totems with glowing animated displays)
- Rolling robots moving along the alley
- A projector doing projection-mapping onto a plaza (light cone + animated projected pattern)
- A glowing treasure-hunt trail of markers leading to a treasure chest with a beacon
- A cultural corner: raised stage + framed art panels + rotating sculpture + spotlight

**Why:** The user explicitly and repeatedly rejected "abstract things" — abstract city grids, floating AR HUD panels, GPS pulse rings, particle data streams, spinning octahedron "badges". They want concrete park elements that read instantly.

**How to apply:** When editing the hero scene, keep everything representational. Never reintroduce abstract grids/HUD/particle abstractions as the main motif. WebGL does not render in the Replit preview sandbox (no GPU) — verify code correctness via compile + architect review, not screenshots; it renders on real browsers.
