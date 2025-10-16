import bpy
from bpy.props import StringProperty, IntProperty
import json
from mathutils import Vector

import gpu
from gpu_extras.batch import batch_for_shader


"""
        @Author: Rei Evans (rei.trace.me@gmail.com)
        @Date: circa 2025
        @Links: https://rei-cast.xyz
        @License: MIT License
"""

##
## Group helpers 
##
def _default_group():
    return {"first_index": None, "positions": {}, "pinned_set_icon": "circle"}  # 

# New: constant default JSON so there is always one visible empty group on first load
DEFAULT_GROUPS_JSON = json.dumps([_default_group()])

def _load_groups(scene):
    raw = scene.vertex_tools_saved_positions
    if not raw:
        return [_default_group()]
    try:
        data = json.loads(raw)
    except Exception:
        return [_default_group()]
    # Backward compatibility: old format was a dict of positions
    if isinstance(data, dict):
        return [{"first_index": None, "positions": data}]
    if isinstance(data, list):
        cleaned = []
        for g in data:
            if not isinstance(g, dict):
                continue
            first_index = g.get("first_index", None)
            positions = g.get("positions", {})
            if not isinstance(positions, dict):
                positions = {}
            cleaned.append({"first_index": first_index, "positions": positions, "pinned_set_icon": g.get("pinned_set_icon", "circle")})
        if not cleaned:
            cleaned = [_default_group()]
        return cleaned
    return [_default_group()]

def _set_groups(scene, groups):
    if not groups:
        groups = [_default_group()]
    scene.vertex_tools_group_count = len(groups)
    scene.vertex_tools_saved_positions = json.dumps(groups)

def _ensure_groups(scene):
    groups = _load_groups(scene)
    # Strengthen: if parsed list ended up empty, restore default
    if not groups:
        groups = [_default_group()]
    _set_groups(scene, groups)
    return groups

##
## View Helpers
##
def pinned_set_icon_items(self, context):
    return [
        ("circle", "●", ""),
        ("square", "■", ""),
        ("triangle", "▲", ""),
        ("diamond", "◆", ""),
        ("star", "★", ""),
        ("hex", "⬢", ""),
    ]

# New: mapping for quick lookup when drawing the label
PINNED_SET_ICON_SYMBOLS = {k: v for k, v, _ in pinned_set_icon_items(None, None)}

# Update callback to push pinned_set_icon choice into groups JSON
def _update_pinned_set_icon(self, context):
    scene = context.scene
    groups = _load_groups(scene)
    try:
        idx = list(scene.vertex_tools_group_settings).index(self)
    except ValueError:
        return
    if idx < 0 or idx >= len(groups):
        return
    if groups[idx].get("pinned_set_icon") == self.pinned_set_icon:
        return
    groups[idx]["pinned_set_icon"] = self.pinned_set_icon
    _set_groups(scene, groups)

class VertexToolsGroupSettings(bpy.types.PropertyGroup):
    pinned_set_icon: bpy.props.EnumProperty(
        name="",
        description="Pinned_set_icon marker",
        items=pinned_set_icon_items,
        update=_update_pinned_set_icon
    )

def _sync_group_settings(scene):
    groups = _load_groups(scene)
    coll = scene.vertex_tools_group_settings
    # Resize collection
    if len(coll) != len(groups):
        # shrink
        while len(coll) > len(groups):
            coll.remove(len(coll)-1)
        # grow
        while len(coll) < len(groups):
            item = coll.add()
            item.pinned_set_icon = groups[len(coll)-1]["pinned_set_icon"]
    else:
        # ensure values match
        for i, g in enumerate(groups):
            if coll[i].pinned_set_icon != g.get("pinned_set_icon", "red"):
                coll[i].pinned_set_icon = g.get("pinned_set_icon", "red")

##
## Operators
##

# -----------------------------
# Save operator (per group)
# -----------------------------
class VERTEX_OT_save_positions(bpy.types.Operator):
    bl_idname = "vertex.save_positions"
    bl_label = "Save Vertex Positions (Group)"
    bl_description = "Save current selection into a pinned set"
    group_index: IntProperty()

    @classmethod
    def poll(cls, context):
        return context.object is not None and context.object.type == 'MESH'

    def execute(self, context):
        groups = _ensure_groups(context.scene)
        if self.group_index < 0 or self.group_index >= len(groups):
            self.report({'WARNING'}, "Invalid group index")
            return {'CANCELLED'}
        obj = context.object
        bpy.ops.object.mode_set(mode='OBJECT')
        selected = [v for v in obj.data.vertices if v.select]
        positions = {str(v.index): list(v.co) for v in selected}
        first_index = selected[0].index if selected else None
        groups[self.group_index]["positions"] = positions
        groups[self.group_index]["first_index"] = first_index
        _set_groups(context.scene, groups)
        self.report({'INFO'}, f"Group {self.group_index+1}: saved {len(positions)} vertices.")
        bpy.ops.object.mode_set(mode='EDIT')
        return {'FINISHED'}

# -----------------------------
# Restore operator (per group)
# -----------------------------
class VERTEX_OT_restore_positions(bpy.types.Operator):
    bl_idname = "vertex.restore_positions"
    bl_label = "Restore Vertex Positions (Group)"
    bl_description = "Restore positions from a pinned set"
    group_index: IntProperty()

    @classmethod
    def poll(cls, context):
        return context.object is not None and context.object.type == 'MESH'

    def execute(self, context):
        groups = _ensure_groups(context.scene)
        if self.group_index < 0 or self.group_index >= len(groups):
            self.report({'WARNING'}, "Invalid group index")
            return {'CANCELLED'}
        data_map = groups[self.group_index]["positions"]
        if not data_map:
            self.report({'WARNING'}, "Group is empty.")
            return {'CANCELLED'}
        obj = context.object
        bpy.ops.object.mode_set(mode='OBJECT')
        import bmesh
        bm = bmesh.new()
        bm.from_mesh(obj.data)
        verts_by_index = {v.index: v for v in bm.verts}
        restored = 0
        for i_str, pos in data_map.items():
            try:
                i = int(i_str)
            except:
                continue
            v = verts_by_index.get(i)
            if v:
                v.co = Vector(pos)
                restored += 1
        bm.to_mesh(obj.data)
        bm.free()
        obj.data.update()
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)
        bpy.ops.object.mode_set(mode='EDIT')
        self.report({'INFO'}, f"Group {self.group_index+1}: restored {restored}/{len(data_map)}.")
        return {'FINISHED'}

# -----------------------------
# Clear operator (per group)
# -----------------------------
class VERTEX_OT_clear_positions(bpy.types.Operator):
    bl_idname = "vertex.clear_positions"
    bl_label = "Clear Saved Positions (Group)"
    bl_description = "Clear saved positions in this pinned set"
    group_index: IntProperty()

    def execute(self, context):
        groups = _ensure_groups(context.scene)
        if self.group_index < 0 or self.group_index >= len(groups):
            self.report({'WARNING'}, "Invalid group index")
            return {'CANCELLED'}
        groups[self.group_index]["positions"] = {}
        groups[self.group_index]["first_index"] = None
        _set_groups(context.scene, groups)
        self.report({'INFO'}, f"Group {self.group_index+1}: cleared.")
        return {'FINISHED'}

# -----------------------------
# Add group
# -----------------------------
class VERTEX_OT_add_group(bpy.types.Operator):
    bl_idname = "vertex.add_group"
    bl_label = "Add Pinned Set"
    bl_description = "Create a new empty pinned set"

    def execute(self, context):
        groups = _ensure_groups(context.scene)
        groups.append(_default_group())
        _set_groups(context.scene, groups)
        _sync_group_settings(context.scene)  # sync collection
        # Force UI redraw so the new group shows immediately
        if context.area:
            context.area.tag_redraw()
        self.report({'INFO'}, "Added pinned set.")
        return {'FINISHED'}

# -----------------------------
# Remove group
# -----------------------------
class VERTEX_OT_remove_group(bpy.types.Operator):
    bl_idname = "vertex.remove_group"
    bl_label = "Remove Pinned Set"
    bl_description = "Remove this pinned set"
    group_index: IntProperty()

    def execute(self, context):
        groups = _ensure_groups(context.scene)
        if len(groups) <= 1:
            self.report({'WARNING'}, "Cannot remove the last pinned set.")
            return {'CANCELLED'}
        if self.group_index < 0 or self.group_index >= len(groups):
            self.report({'WARNING'}, "Invalid group index")
            return {'CANCELLED'}
        del groups[self.group_index]
        _set_groups(context.scene, groups)
        _sync_group_settings(context.scene)  # sync collection
        self.report({'INFO'}, "Removed pinned set.")
        return {'FINISHED'}

# -----------------------------
# Select operator (per group)
# -----------------------------
class VERTEX_OT_select_group(bpy.types.Operator):
    bl_idname = "vertex.select_group"
    bl_label = "Select Saved Vertices (Group)"
    bl_description = "Select all vertices stored in this pinned set"
    group_index: IntProperty()

    @classmethod
    def poll(cls, context):
        return context.object is not None and context.object.type == 'MESH'

    def execute(self, context):
        groups = _ensure_groups(context.scene)
        if self.group_index < 0 or self.group_index >= len(groups):
            self.report({'WARNING'}, "Invalid group index")
            return {'CANCELLED'}
        data_map = groups[self.group_index]["positions"]
        if not data_map:
            self.report({'WARNING'}, "Group is empty.")
            return {'CANCELLED'}
        obj = context.object
        bpy.ops.object.mode_set(mode='OBJECT')
        mesh = obj.data
        # Clear current selection
        for v in mesh.vertices:
            v.select = False
        selected = 0
        max_index = len(mesh.vertices) - 1
        for i_str in data_map.keys():
            try:
                i = int(i_str)
            except:
                continue
            if 0 <= i <= max_index:
                mesh.vertices[i].select = True
                selected += 1
        mesh.update()
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)
        bpy.ops.object.mode_set(mode='EDIT')
        self.report({'INFO'}, f"Group {self.group_index+1}: selected {selected} vertices.")
        return {'FINISHED'}

# -----------------------------
# Vertex Group Search UI List
# -----------------------------
class VERTEX_UL_vgroups_search(bpy.types.UIList):
    """Filtered list of vertex groups based on search text."""

    def filter_items(self, context, data, propname):
        items = getattr(data, propname)
        search = (getattr(context.scene, 'vertex_tools_vg_search', '') or '').lower()
        flags = []
        if not search:
            # Show all when no search
            flags = [self.bitflag_filter_item] * len(items)
            return flags, []
        for vg in items:
            name = getattr(vg, 'name', '')
            match = search in name.lower()
            flags.append(self.bitflag_filter_item if match else 0)
        return flags, []

    def draw_item(self, context, layout, data, item, icon, active_data, active_propname, index):
        if self.layout_type in {'DEFAULT', 'COMPACT'}:
            layout.label(text=item.name, icon='GROUP_VERTEX')
        elif self.layout_type == 'GRID':
            layout.alignment = 'CENTER'
            layout.label(text="")


# -----------------------------
# Panel: Vertex Group Search
# -----------------------------
def _update_vg_search(self, context):
    """On search text change, optionally highlight the first matching
    vertex group in Object Data Properties.

    We avoid manual redraws; Blender's event system will refresh UI as needed.
    """
    try:
        scene = context.scene
        obj = context.object
        search = (getattr(scene, 'vertex_tools_vg_search', '') or '').strip().lower()

        # Optionally highlight a matching group in Object Data Properties
        if obj and obj.type == 'MESH' and obj.vertex_groups and search:
            for vg in obj.vertex_groups:
                if search in vg.name.lower():
                    obj.vertex_groups.active_index = vg.index
                    break
    except Exception:
        # Be robust in case context is partial during updates
        pass


class VERTEX_PT_groups_name_search_panel(bpy.types.Panel):
    bl_label = "Vertex Group Search"
    bl_idname = "VERTEX_PT_groups_name_search_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Vertex Tools'

    def draw(self, context):
        layout = self.layout
        obj = context.object
        scene = context.scene

        col = layout.column(align=False)
        col.prop(scene, "vertex_tools_vg_search", text="Search Vertex Groups", icon='VIEWZOOM')

        box = layout.box()
        box.label(text="Results", icon='OUTLINER_DATA_MESH')

        if not obj or obj.type != 'MESH':
            box.label(text="Select a mesh object to search its vertex groups.")
            return

        if not obj.vertex_groups:
            box.label(text="Object has no vertex groups.")
            return

        # Filtered list of the object's vertex groups
        row = box.row()
        row.template_list(
            "VERTEX_UL_vgroups_search",
            "vertex_group_search",
            obj,
            "vertex_groups",
            obj.vertex_groups,
            "active_index",
            rows=6,
        )

    # Selecting an item in the list sets obj.vertex_groups.active_index directly,
    # so no extra button is needed.

# -----------------------------
# Panel
# -----------------------------
class VERTEX_PT_positions_panel(bpy.types.Panel):
    bl_label = "Vertex Tools"
    bl_idname = "VERTEX_PT_positions_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Vertex Tools'

    def draw(self, context):
        layout = self.layout
        obj = context.object
        scene = context.scene
        settings_coll = getattr(scene, "vertex_tools_group_settings", None)

        groups = _load_groups(context.scene)
        if not groups:
            groups = [_default_group()]

        # Current selection (shared)
        count = 0
        if obj and obj.type == 'MESH':
            count = sum(1 for v in obj.data.vertices if v.select)
        layout.label(text=f"Current Selection: {count}")

        # Each group
        for idx, g in enumerate(groups):
            box = layout.box()
            header = box.row()
            op_select = header.operator("vertex.select_group", text=f"select set {idx}")
            op_select.group_index = idx
            if len(groups) > 1:
                op_rem = header.operator("vertex.remove_group", text="− Remove", emboss=True)
                op_rem.group_index = idx

            # Second row: Selected From Index + pinned_set_icon dropdown (no label)
            row_meta = box.row(align=True)
            first_index = g.get("first_index")
            first_text = first_index if first_index is not None else "N/A"
            row_meta.label(text=f"Selected From Index: {first_text}")
            if settings_coll and idx < len(settings_coll):
                # old: row_meta.prop(settings_coll[idx], "pinned_set_icon", text="")
                pinned_set_icon_row = row_meta.row(align=True)
                pinned_set_icon_row.scale_x = 0.5  # make the dropdown half as wide
                pinned_set_icon_row.prop(settings_coll[idx], "pinned_set_icon", text="")
                # Added pinned_set_icon symbol label to the right of dropdown
                
            # Saved count
            saved_count = len(g.get("positions", {}))
            box.label(text=f"Saved Positions: {saved_count}")

            # Actions
            row = box.row()
            op_save = row.operator("vertex.save_positions", text="💾 Save")
            op_save.group_index = idx
            op_restore = row.operator("vertex.restore_positions", text="↩ Restore")
            op_restore.group_index = idx
            op_clear = row.operator("vertex.clear_positions", text="🗑 Clear")
            op_clear.group_index = idx

        layout.separator()
        layout.operator("vertex.add_group", text="+ New Pinned Set")

# -----------------------------
# Register
# -----------------------------
classes = (
    VERTEX_OT_save_positions,
    VERTEX_OT_restore_positions,
    VERTEX_OT_clear_positions,
    VERTEX_OT_add_group,
    VERTEX_OT_remove_group,
    VERTEX_OT_select_group,
    VERTEX_UL_vgroups_search,
    VertexToolsGroupSettings,  # new
    VERTEX_PT_positions_panel,
    VERTEX_PT_groups_name_search_panel,
)

def register():
    # First register classes so PropertyGroup is known to RNA
    for c in classes:
        bpy.utils.register_class(c)

    # Then add properties referencing those classes
    bpy.types.Scene.vertex_tools_saved_positions = StringProperty(
        name="Vertex Tools Saved Positions",
        description="JSON list of pinned sets",
        default=DEFAULT_GROUPS_JSON
    )
    bpy.types.Scene.vertex_tools_group_count = IntProperty(
        name="Vertex Tools Group Count",
        description="Number of pinned sets",
        default=1
    )
    bpy.types.Scene.vertex_tools_group_settings = bpy.props.CollectionProperty(type=VertexToolsGroupSettings)

    # Search text for vertex group search (updates on each keypress)
    bpy.types.Scene.vertex_tools_vg_search = StringProperty(
        name="Search Vertex Groups",
        description="Type to filter vertex groups by name",
        default="",
        options={'TEXTEDIT_UPDATE'},
        update=_update_vg_search,
    )

    # Sync collection
    scene = bpy.context.scene if bpy.context.scene else None
    if scene:
        _sync_group_settings(scene)

def unregister():
    # Remove properties before unregistering classes
    if hasattr(bpy.types.Scene, "vertex_tools_saved_positions"):
        del bpy.types.Scene.vertex_tools_saved_positions
    if hasattr(bpy.types.Scene, "vertex_tools_group_count"):
        del bpy.types.Scene.vertex_tools_group_count
    if hasattr(bpy.types.Scene, "vertex_tools_group_settings"):
        del bpy.types.Scene.vertex_tools_group_settings
    if hasattr(bpy.types.Scene, "vertex_tools_vg_search"):
        del bpy.types.Scene.vertex_tools_vg_search

    for c in reversed(classes):
        bpy.utils.unregister_class(c)


if __name__ == "__main__":
    register()