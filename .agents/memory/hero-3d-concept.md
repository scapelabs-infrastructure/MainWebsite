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

**Look & feel (also rejected once):** Must read as a serious, professional park LANDSCAPE — not a small cartoonish diorama floating on black. Requirements that fixed the rejection: continuous dark-green grassy ground that fades into linear `fog` (no green islands on a black plane), a dense surrounding woodland for depth/context, an alley network with a central plaza, classic warm lamp posts, smooth layered-sphere foliage with muted greens (avoid low-poly flatShading + saturated primary colors), and toned-down neon.

**Performance:** It's a hero background, so keep it cheap. Trees MUST be `InstancedMesh` (one instanced trunk mesh + one instanced foliage mesh, per-instance color via `setColorAt`) — ~100 trees as individual groups is too many draw calls. Keep dynamic positional lights to a handful (a few focal point lights + one spotlight); use emissive materials for everything else instead of real lights. Cap `dpr={[1, 1.5]}` on the Canvas.
