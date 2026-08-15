import bpy
from mathutils import Vector
from mathutils.bvhtree import BVHTree


PROJECT = "/Users/vicbear/Documents/resume-3d"
BLEND_OUT = f"{PROJECT}/blender/sen.blend"
GLB_OUT = f"{PROJECT}/web/public/models/me.glb"

# Only the five résumé stickers remain. Their centers sit in open facial regions and each
# vertex is projected independently, so the mesh follows the forehead/cheek curvature.
LAYOUT = {
    "sticker0": (-0.18, 0.18, 0.08),  # Insta360 / lower-left cheek
    "sticker1": (0.18, 0.18, 0.08),   # SHEIN / lower-right cheek
    "sticker5": (-0.25, 0.25, 0.06),  # Growth / left outer cheek
    "sticker2": (0.25, 0.25, 0.06),   # Product design / right outer cheek
    "sticker6": (0.29, 0.42, 0.035),  # Chongqing / screen-right temple
}

FOCUS_TARGETS = {
    "focus-1": "sticker0",
    "focus-2": "sticker1",
    "focus-3": "sticker5",
    "focus-4": "sticker2",
    "focus-5": "sticker6",
}

man = bpy.data.objects["man"]
bvh = BVHTree.FromPolygons(
    [v.co.copy() for v in man.data.vertices],
    [[i for i in p.vertices] for p in man.data.polygons],
    all_triangles=False,
)


def vertex_uvs(obj):
    layer = obj.data.uv_layers.active
    if layer is None:
        raise RuntimeError(f"{obj.name} has no active UV layer")
    totals = [Vector((0.0, 0.0)) for _ in obj.data.vertices]
    counts = [0] * len(obj.data.vertices)
    for loop in obj.data.loops:
        totals[loop.vertex_index] += layer.data[loop.index].uv
        counts[loop.vertex_index] += 1
    return [totals[i] / max(counts[i], 1) for i in range(len(totals))]


def material_image(obj):
    for material in obj.data.materials:
        if material and material.use_nodes:
            for node in material.node_tree.nodes:
                if node.type == "TEX_IMAGE" and node.image:
                    return node.image
    return None


def front_surface(x, z):
    location, normal, _, _ = bvh.ray_cast(
        Vector((x, -2.0, z)), Vector((0.0, 1.0, 0.0))
    )
    if location is None:
        raise RuntimeError(f"Front-face ray missed at {x=}, {z=}")
    return location, normal


def center_in_man_space(obj):
    points = [obj.matrix_local @ vertex.co for vertex in obj.data.vertices]
    return sum(points, Vector()) / len(points)


# Remove the ten decorative stickers completely, keeping the scene visually clean.
for index in (3, 4, 7, 8, 9, 10, 11, 12, 13, 14):
    obj = bpy.data.objects.get(f"sticker{index}")
    if obj:
        bpy.data.objects.remove(obj, do_unlink=True)


surface_gap = 0.003
for name, (center_x, center_z, width) in LAYOUT.items():
    sticker = bpy.data.objects[name]
    uvs = vertex_uvs(sticker)
    image = material_image(sticker)
    aspect = image.size[1] / image.size[0] if image and image.size[0] else 1.0
    height = width * aspect
    inverse = sticker.matrix_local.inverted()

    for vertex, uv in zip(sticker.data.vertices, uvs):
        x = center_x + (uv.x - 0.5) * width
        z = center_z + (uv.y - 0.5) * height
        location, normal = front_surface(x, z)
        # Move outward along the real local normal: this is close enough to read as pasted on,
        # while preventing z-fighting with the face material.
        vertex.co = inverse @ (location + normal * surface_gap)
    sticker.data.update()

# Camera/DOF focus anchors follow the final curved sticker geometry exactly.
for focus_name, sticker_name in FOCUS_TARGETS.items():
    bpy.data.objects[focus_name].location = center_in_man_space(
        bpy.data.objects[sticker_name]
    )

bpy.context.scene.frame_set(79)
bpy.ops.wm.save_as_mainfile(filepath=BLEND_OUT)
bpy.ops.export_scene.gltf(
    filepath=GLB_OUT,
    export_format="GLB",
    export_animations=True,
    export_extras=True,
    export_cameras=True,
    export_lights=False,
    export_apply=False,
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
)
print("FACE_HUG_STICKERS_OK")
