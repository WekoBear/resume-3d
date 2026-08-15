# Sticker Cheek and Temple Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the two eyebrow stickers onto opposite cheeks and move the CHONGQING sticker onto the screen-right temple while retaining surface fit, five focus bindings, and all existing animation.

**Architecture:** Keep the existing Blender batch layout pipeline. Change only the three entries in `LAYOUT`, project their grid vertices through the existing front-surface ray cast, update the existing focus nodes from final geometry centers, then export the same animated GLB.

**Tech Stack:** Blender 5.2 Python API, `mathutils.bvhtree.BVHTree`, glTF/Draco export, React/Three.js browser preview, TypeScript/Vite verification.

## Global Constraints

- Keep exactly five sticker objects.
- Keep `CameraAction`, `manAction`, frame range, and web transition timing unchanged.
- Maintain a surface-normal gap of approximately `0.003`.
- Place CHONGQING on the screen-right temple.
- Keep all five focus anchors at their corresponding sticker geometry centers.

---

### Task 1: Reposition and verify the three stickers

**Files:**
- Modify: `output/verify_facehug_stickers.py:6-49`
- Modify: `output/layout_stickers_facehug.py:12-18`
- Generate: `blender/sen.blend`
- Generate: `web/public/models/me.glb`
- Create: `blender/sen-before-cheek-temple-layout.blend`
- Create: `blender/sen-final-cheek-temple-layout.blend`

**Interfaces:**
- Consumes: Blender objects `sticker2`, `sticker5`, `sticker6`, `focus-3`, `focus-4`, `focus-5`, and mesh `man`.
- Produces: `sen.blend` and `me.glb` with the same node names and animations; sticker centers near `(-0.23, 0.22)`, `(0.23, 0.22)`, and `(0.25, 0.48)` in character-local X/Z coordinates.

- [ ] **Step 1: Add failing region assertions**

Add exact expected X/Z regions to `output/verify_facehug_stickers.py`:

```python
EXPECTED_CENTERS = {
    "sticker5": Vector((-0.23, 0.22)),
    "sticker2": Vector((0.23, 0.22)),
    "sticker6": Vector((0.25, 0.48)),
}

for sticker_name, expected in EXPECTED_CENTERS.items():
    actual_center = center(bpy.data.objects[sticker_name])
    actual_xz = Vector((actual_center.x, actual_center.z))
    assert (actual_xz - expected).length < 0.025, (
        sticker_name,
        tuple(actual_xz),
        tuple(expected),
    )
```

- [ ] **Step 2: Run verification and confirm it fails on the old eyebrow/forehead layout**

Run:

```bash
/Applications/Blender.app/Contents/MacOS/Blender \
  -b blender/sen.blend \
  --python output/verify_facehug_stickers.py
```

Expected: FAIL for `sticker5`, whose old center is near `(-0.18, 0.52)`.

- [ ] **Step 3: Back up the current blend and change only the three layout entries**

Copy `blender/sen.blend` to `blender/sen-before-cheek-temple-layout.blend`, then change `LAYOUT` in `output/layout_stickers_facehug.py` to:

```python
"sticker5": (-0.23, 0.22, 0.08),  # Growth / left outer cheek
"sticker2": (0.23, 0.22, 0.08),   # Product design / right outer cheek
"sticker6": (0.25, 0.48, 0.08),   # Chongqing / screen-right temple
```

Do not change `sticker0`, `sticker1`, `FOCUS_TARGETS`, the projection algorithm, export flags, or frame selection.

- [ ] **Step 4: Apply the Blender layout and export the GLB**

Run:

```bash
/Applications/Blender.app/Contents/MacOS/Blender \
  -b blender/sen.blend \
  --python output/layout_stickers_facehug.py
```

Expected: `FACE_HUG_STICKERS_OK`, with five sticker primitives exported.

- [ ] **Step 5: Run structural and surface verification**

Run:

```bash
/Applications/Blender.app/Contents/MacOS/Blender \
  -b blender/sen.blend \
  --python output/verify_facehug_stickers.py
```

Expected: `VERIFY_FACEHUG_OK`; all vertex gaps remain between `0.0027` and `0.0032`, all focus-center distances remain below `1e-6`, and both animation actions remain present.

- [ ] **Step 6: Preview the home and focus compositions**

Reload `http://127.0.0.1:5173`, capture the front/home frame plus `focus-3`, `focus-4`, and `focus-5`, and confirm:

- `sticker5` is on the screen-left outer cheek and does not overlap the glasses.
- `sticker2` is on the screen-right outer cheek and does not overlap the glasses.
- `sticker6` is on the screen-right temple and remains visible from the fifth focus camera.
- The right-side résumé copy stays unobstructed.

- [ ] **Step 7: Run web checks and save the final backup**

Run from `web/`:

```bash
npm run typecheck
npm run build
```

Then copy `blender/sen.blend` to `blender/sen-final-cheek-temple-layout.blend` and reopen `sen.blend` in Blender.

- [ ] **Step 8: Commit only the source and verification scripts**

```bash
git add output/layout_stickers_facehug.py output/verify_facehug_stickers.py
git commit -m "fix: reposition face stickers to cheeks and temple"
```

Do not include unrelated existing worktree changes in the commit.
