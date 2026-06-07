---
name: Hero 3D concept
description: What the ScapeLabs homepage hero Three.js scene must depict — latest direction is ABSTRACT neon, superseding the earlier literal-park requirement.
---

The hero background 3D scene (`frontend/src/components/NeonScene3D.tsx`) must be an **abstract neon scene — neon lights + modern geometry**, looking great on MOBILE too. NOT a cartoon, NOT a forest/park, NOT a literal diorama.

**Current motif (built):** a central glowing emissive icosahedron core (pulsing) with additive halos, tilted emissive torus rings, an orbiting constellation of wireframe polyhedra (EdgesGeometry + bright lineBasicMaterial + glassy transparent body), a sparse additive Points depth field, floating in space (no ground/grid), with a soft radial vignette. Brand neon palette: BLUE `#2D6EFF`, VIOLET `#7B3FE4`, CYAN `#00E5FF`, accent PINK `#FF3D8B`.

**Why:** The user PIVOTED. They had earlier rejected abstract grids/HUD/particles AND then a built literal curved-park scene; the final explicit instruction is "make it abstract — neon lights, modern geometry, not a cartoon, not a forest, looks good on mobile, great from the first try." The latest explicit instruction wins over older park memory.

**How to apply:** Keep the hero abstract/geometric/neon. Do NOT reintroduce the park/forest/robots/treasure motifs. If the user pivots again, the newest explicit instruction always overrides this file.

**Glow without postprocessing:** drei and @react-three/postprocessing are NOT installed (only @react-three/fiber v9, three 0.174, react 19). Real bloom would mean a new dependency with version risk. Instead fake neon via high emissive materials + additive-blended halo sprites using a single shared `CanvasTexture` radial-gradient (module-level singleton). This is reliable and cheap.

**Verification limit:** WebGL does NOT render in the Replit sandbox (no GPU) — verify via `npx tsc --noEmit` (ignore the harmless `module 'three'` declaration error) + browser console logs (watch for stale HMR entries) + architect review, NOT screenshots. It renders on the user's real browser.

**Performance / mobile:** Keep object counts low (~6 orbit solids, 3 rings, ~110 points). Cap `dpr={[1,1.6]}`. Drive responsive `scale` + camera `z` from `window.innerWidth` via a resize listener. Use `pointermove` (not `mousemove`) for parallax so touch devices also respond.
