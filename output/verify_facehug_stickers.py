import bpy
from mathutils import Vector
from mathutils.bvhtree import BVHTree


EXPECTED = {"sticker0", "sticker1", "sticker2", "sticker5", "sticker6"}
FOCUS = {
    "focus-1": "sticker0",
    "focus-2": "sticker1",
    "focus-3": "sticker5",
    "focus-4": "sticker2",
    "focus-5": "sticker6",
}
EXPECTED_CENTERS = {
    "sticker5": Vector((-0.25, 0.25)),
    "sticker2": Vector((0.25, 0.25)),
    "sticker6": Vector((0.29, 0.42)),
}

man = bpy.data.objects["man"]
bvh = BVHTree.FromPolygons(
    [v.co.copy() for v in man.data.vertices],
    [[i for i in p.vertices] for p in man.data.polygons],
    all_triangles=False,
)

actual = {obj.name for obj in bpy.data.objects if obj.name.startswith("sticker")}
assert actual == EXPECTED, (actual, EXPECTED)


def center(obj):
    points = [obj.matrix_local @ vertex.co for vertex in obj.data.vertices]
    return sum(points, Vector()) / len(points)


for focus_name, sticker_name in FOCUS.items():
    distance = (bpy.data.objects[focus_name].location - center(bpy.data.objects[sticker_name])).length
    assert distance < 1e-6, (focus_name, sticker_name, distance)

for sticker_name, expected in EXPECTED_CENTERS.items():
    actual_center = center(bpy.data.objects[sticker_name])
    actual_xz = Vector((actual_center.x, actual_center.z))
    assert (actual_xz - expected).length < 0.025, (
        sticker_name,
        tuple(actual_xz),
        tuple(expected),
    )

for sticker_name in sorted(EXPECTED):
    sticker = bpy.data.objects[sticker_name]
    gaps = []
    for vertex in sticker.data.vertices:
        location = sticker.matrix_local @ vertex.co
        nearest, _, _, distance = bvh.find_nearest(location)
        assert nearest is not None
        gaps.append(distance)
    assert max(gaps) < 0.0032, (sticker_name, max(gaps))
    assert min(gaps) > 0.0027, (sticker_name, min(gaps))
    print(sticker_name, "surface-gap", round(min(gaps), 6), round(max(gaps), 6))

actions = {action.name for action in bpy.data.actions}
assert {"CameraAction", "manAction"}.issubset(actions), actions
print("VERIFY_FACEHUG_OK")
