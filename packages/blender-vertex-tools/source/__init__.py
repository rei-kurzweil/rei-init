from multiprocessing import context
import traceback
import bpy
from bpy.props import StringProperty, IntProperty
import bmesh
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

bl_info = {
    "name": "Vertex Tools",
    "author": "Rei Evans",
    "version": (1, 0, 1),
    "blender": (3, 0, 0),
    "location": "View3D > Sidebar > Vertex Tools",
    "description": "Tools for managing vertex groups, vertex sets, and vertex positions",
    "warning": "",
    "doc_url": "",
    "category": "Mesh",
}



##
## Group helpers 
##
def _default_group():
    return {"first_index": None, "positions": {}, "name": "Untitled Set"}

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
        return [{"first_index": None, "positions": data, "name": "Untitled Set"}]
    if isinstance(data, list):
        cleaned = []
        for g in data:
            if not isinstance(g, dict):
                continue
            first_index = g.get("first_index", None)
            positions = g.get("positions", {})
            if not isinstance(positions, dict):
                positions = {}
            # Backward compatibility: convert old pinned_set_icon to name if no name exists
            name = g.get("name", "Untitled Set")
            cleaned.append({"first_index": first_index, "positions": positions, "name": name})
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
# Remove old icon-related functions
# def pinned_set_icon_items(self, context):
# PINNED_SET_ICON_SYMBOLS = ...

# Update callback to push name into groups JSON
def _update_set_name(self, context):
    scene = context.scene
    groups = _load_groups(scene)
    try:
        idx = list(scene.vertex_tools_group_settings).index(self)
    except ValueError:
        return
    if idx < 0 or idx >= len(groups):
        return
    if groups[idx].get("name") == self.name:
        return
    groups[idx]["name"] = self.name
    _set_groups(scene, groups)

class VertexToolsGroupSettings(bpy.types.PropertyGroup):
    name: bpy.props.StringProperty(
        name="Set Name",
        description="Name for this vertex set",
        default="Untitled Set",
        update=_update_set_name
    )

# Property group for storing bone name filters
class BoneNameFilterItem(bpy.types.PropertyGroup):
    name: bpy.props.StringProperty(name="Bone Name")

# Property group for tracking selected vertex groups
class SelectedVertexGroupItem(bpy.types.PropertyGroup):
    index: bpy.props.IntProperty(name="Group Index")
    name: bpy.props.StringProperty(name="Group Name")

# Property group for pinned vertex groups
class PinnedVertexGroupItem(bpy.types.PropertyGroup):
    name: bpy.props.StringProperty(name="Vertex Group Name")

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
            item.name = groups[len(coll)-1]["name"]
    else:
        # ensure values match
        for i, g in enumerate(groups):
            if coll[i].name != g.get("name", "Untitled Set"):
                coll[i].name = g.get("name", "Untitled Set")

##
## Events
##


# -----------------------------
# scene context events
# ----------------------------
def handle_scene_change(scene):
    print("Active scene is now:", scene.name)
    print("Vertex Tools: performing initial sync")
    _ensure_groups(scene)
    _sync_group_settings(scene)

def on_load_post(dummy):
    scene = getattr(bpy.context, "scene", None)
    if scene:
        handle_scene_change(scene)

def on_scene_change():
    scene = bpy.context.scene
    if scene:
        handle_scene_change(scene)

##
## Operators
##

# -----------------------------
# Save operator (per group)
# -----------------------------
class VERTEX_OT_save_set(bpy.types.Operator):
    bl_idname = "vertex.save_set"
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
class VERTEX_OT_restore_set(bpy.types.Operator):
    bl_idname = "vertex.restore_set"
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
class VERTEX_OT_clear_set(bpy.types.Operator):
    bl_idname = "vertex.clear_set"
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
class VERTEX_OT_add_set(bpy.types.Operator):
    bl_idname = "vertex.add_set"
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
class VERTEX_OT_remove_set(bpy.types.Operator):
    bl_idname = "vertex.remove_set"
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
class VERTEX_OT_select_set(bpy.types.Operator):
    bl_idname = "vertex.select_set"  # Fixed from "vertex.select_group"
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
        
        # Switch to vertex selection mode
        bpy.ops.mesh.select_mode(type='VERT')
        
        self.report({'INFO'}, f"Group {self.group_index+1}: selected {selected} vertices.")
        return {'FINISHED'}

# -----------------------------
# Select Vertex Group from Info Panel
# -----------------------------
class VERTEX_OT_select_vertex_group(bpy.types.Operator):
    bl_idname = "vertex.select_vertex_group"
    bl_label = "Select Vertex Group"
    bl_description = "Select this vertex group in Object Data Properties"
    
    group_index: IntProperty()

    @classmethod
    def poll(cls, context):
        return context.object is not None and context.object.type == 'MESH'

    def execute(self, context):
        obj = context.object
        scene = context.scene
        
        if not obj.vertex_groups or self.group_index >= len(obj.vertex_groups):
            self.report({'WARNING'}, "Invalid vertex group index")
            return {'CANCELLED'}
        
        # Set active vertex group in Object Data Properties
        obj.vertex_groups.active_index = self.group_index
        
        # Sync with vertex group index property
        scene.vertex_tools_vgroup_index = self.group_index
        
        group_name = obj.vertex_groups[self.group_index].name
        self.report({'INFO'}, f"Selected vertex group: {group_name}")
        
        return {'FINISHED'}

# -----------------------------
# Select Vertex Group from Active Bone
# -----------------------------
class VERTEX_OT_select_vgroup_from_bone(bpy.types.Operator):
    bl_idname = "vertex.select_vgroup_from_bone"
    bl_label = "Select from Bone"
    bl_description = "Select vertex group matching the active bone's name"

    @classmethod
    def poll(cls, context):
        # Need a mesh object with vertex groups
        if not context.object or context.object.type != 'MESH':
            return False
        if not context.object.vertex_groups:
            return False
        
        # Need an active bone from an armature in the selection
        active_bone = context.active_bone
        if not active_bone:
            return False
        
        return True

    def execute(self, context):
        obj = context.object
        scene = context.scene
        active_bone = context.active_bone
        
        if not active_bone:
            self.report({'WARNING'}, "No active bone selected")
            return {'CANCELLED'}
        
        bone_name = active_bone.name
        
        # Find matching vertex group
        vgroup_index = None
        for i, vg in enumerate(obj.vertex_groups):
            if vg.name == bone_name:
                vgroup_index = i
                break
        
        if vgroup_index is None:
            self.report({'WARNING'}, f"No vertex group found matching bone '{bone_name}'")
            return {'CANCELLED'}
        
        # Set active vertex group in Object Data Properties
        obj.vertex_groups.active_index = vgroup_index
        
        # Sync with vertex group index property
        scene.vertex_tools_vgroup_index = vgroup_index
        
        self.report({'INFO'}, f"Selected vertex group: {bone_name}")
        
        return {'FINISHED'}

# -----------------------------
# Add Selected Bone to Filter
# -----------------------------
class VERTEX_OT_add_bone_to_filter(bpy.types.Operator):
    bl_idname = "vertex.add_bone_to_filter"
    bl_label = "Add Selected Bone"
    bl_description = "Add the active bone name to the filter list"

    @classmethod
    def poll(cls, context):
        # Need an active bone
        return context.active_bone is not None

    def execute(self, context):
        scene = context.scene
        active_bone = context.active_bone
        
        if not active_bone:
            self.report({'WARNING'}, "No active bone selected")
            return {'CANCELLED'}
        
        bone_name = active_bone.name
        
        # Check if bone name already exists in the filter list
        bone_filters = scene.vertex_tools_bone_filters
        for item in bone_filters:
            if item.name == bone_name:
                self.report({'INFO'}, f"Bone '{bone_name}' already in filter list")
                return {'CANCELLED'}
        
        # Add new bone name to the list
        new_item = bone_filters.add()
        new_item.name = bone_name
        
        self.report({'INFO'}, f"Added bone '{bone_name}' to filter list")
        
        return {'FINISHED'}

# -----------------------------
# Remove Bone from Filter
# -----------------------------
class VERTEX_OT_remove_bone_from_filter(bpy.types.Operator):
    bl_idname = "vertex.remove_bone_from_filter"
    bl_label = "Remove Bone Filter"
    bl_description = "Remove this bone from the filter list"
    
    index: IntProperty()

    def execute(self, context):
        scene = context.scene
        bone_filters = scene.vertex_tools_bone_filters
        
        if self.index < 0 or self.index >= len(bone_filters):
            self.report({'WARNING'}, "Invalid filter index")
            return {'CANCELLED'}
        
        bone_name = bone_filters[self.index].name
        bone_filters.remove(self.index)
        
        self.report({'INFO'}, f"Removed '{bone_name}' from filter list")
        
        return {'FINISHED'}

# -----------------------------
# Merge Selected Vertex Groups
# -----------------------------
class VERTEX_OT_merge_vertex_groups(bpy.types.Operator):
    bl_idname = "vertex.merge_vertex_groups"
    bl_label = "Merge Vertex Groups"
    bl_description = "Combine selected vertex groups into a new group without blending weights"
    
    new_group_name: bpy.props.StringProperty(
        name="New Group Name",
        default="Merged_Group"
    )
    
    overwrite_conflicts: bpy.props.BoolProperty(
        name="Later Groups Override",
        description="If enabled, later groups override earlier ones for overlapping vertices. If disabled, first group wins",
        default=False
    )

    @classmethod
    def poll(cls, context):
        obj = context.object
        if not obj or obj.type != 'MESH':
            return False
        # Check if there are selected groups
        return len(context.scene.vertex_tools_selected_groups) > 0

    def invoke(self, context, event):
        return context.window_manager.invoke_props_dialog(self)

    def execute(self, context):
        obj = context.object
        scene = context.scene
        selected_groups = scene.vertex_tools_selected_groups
        
        if len(selected_groups) == 0:
            self.report({'WARNING'}, "No vertex groups selected")
            return {'CANCELLED'}
        
        # Store original mode
        original_mode = obj.mode
        
        # Switch to object mode if needed
        if original_mode != 'OBJECT':
            bpy.ops.object.mode_set(mode='OBJECT')
        
        # Collect source group names
        source_names = [item.name for item in selected_groups]
        
        # Create or get the new vertex group
        if self.new_group_name in obj.vertex_groups:
            new_group = obj.vertex_groups[self.new_group_name]
            # Clear existing weights
            for v in obj.data.vertices:
                try:
                    new_group.remove([v.index])
                except:
                    pass
        else:
            new_group = obj.vertex_groups.new(name=self.new_group_name)
        
        # Track which vertices we've assigned
        assigned_verts = {}  # vertex_index -> weight
        
        # Iterate through source groups
        for group_name in source_names:
            if group_name not in obj.vertex_groups:
                print(f"Warning: Group '{group_name}' not found, skipping")
                continue
            
            source_group = obj.vertex_groups[group_name]
            group_vertex_count = 0
            
            # Iterate through all vertices and check which ones are in this group
            for v in obj.data.vertices:
                # Check if vertex is in this group by looking at its groups
                for vg in v.groups:
                    if vg.group == source_group.index:
                        # Vertex is in this source group
                        weight = vg.weight
                        
                        # Only assign if we haven't assigned this vertex yet, or if we're overwriting
                        if v.index not in assigned_verts or self.overwrite_conflicts:
                            assigned_verts[v.index] = weight
                        group_vertex_count += 1
                        break
            
            print(f"Processing group '{group_name}': found {group_vertex_count} vertices, added {group_vertex_count if not assigned_verts or self.overwrite_conflicts else 'some'}")
        
        # Now add all collected vertices to the new group
        for v_index, weight in assigned_verts.items():
            new_group.add([v_index], weight, 'REPLACE')
        
        vertex_count = len(assigned_verts)
        print(f"Final result: {vertex_count} vertices assigned to '{self.new_group_name}'")
        self.report({'INFO'}, f"Created '{self.new_group_name}' with {vertex_count} vertices from {len(source_names)} groups")
        
        # Switch back to original mode
        if original_mode != 'OBJECT':
            bpy.ops.object.mode_set(mode=original_mode)
        
        return {'FINISHED'}

# -----------------------------
# Delete Selected Vertex Groups
# -----------------------------
class VERTEX_OT_delete_vertex_groups(bpy.types.Operator):
    bl_idname = "vertex.delete_vertex_groups"
    bl_label = "Delete Vertex Groups"
    bl_description = "Delete all selected vertex groups from the mesh"

    @classmethod
    def poll(cls, context):
        obj = context.object
        if not obj or obj.type != 'MESH':
            return False
        # Check if there are selected groups
        return len(context.scene.vertex_tools_selected_groups) > 0

    def invoke(self, context, event):
        selected_groups = context.scene.vertex_tools_selected_groups
        return context.window_manager.invoke_confirm(
            self, 
            event, 
            message=f"Delete {len(selected_groups)} vertex groups?"
        )

    def execute(self, context):
        obj = context.object
        scene = context.scene
        selected_groups = scene.vertex_tools_selected_groups
        
        if len(selected_groups) == 0:
            self.report({'WARNING'}, "No vertex groups selected")
            return {'CANCELLED'}
        
        # Store original mode
        original_mode = obj.mode
        
        # Switch to object mode if needed
        if original_mode != 'OBJECT':
            bpy.ops.object.mode_set(mode='OBJECT')
        
        # Collect groups to delete
        groups_to_delete = [item.name for item in selected_groups]
        deleted_count = 0
        
        # Delete groups (iterate in reverse to avoid index issues)
        for group_name in groups_to_delete:
            if group_name in obj.vertex_groups:
                vg = obj.vertex_groups[group_name]
                obj.vertex_groups.remove(vg)
                deleted_count += 1
        
        # Clear selection
        scene.vertex_tools_selected_groups.clear()
        
        self.report({'INFO'}, f"Deleted {deleted_count} vertex groups")
        
        # Switch back to original mode
        if original_mode != 'OBJECT':
            bpy.ops.object.mode_set(mode=original_mode)
        
        return {'FINISHED'}

# -----------------------------
# Toggle Vertex Group Selection
# -----------------------------
class VERTEX_OT_toggle_vgroup_selection(bpy.types.Operator):
    bl_idname = "vertex.toggle_vgroup_selection"
    bl_label = "Toggle Vertex Group Selection"
    bl_description = "Toggle selection of this vertex group for merging"
    
    group_name: bpy.props.StringProperty()
    group_index: bpy.props.IntProperty()

    def execute(self, context):
        scene = context.scene
        selected_groups = scene.vertex_tools_selected_groups
        
        # Check if already selected
        found_index = -1
        for i, item in enumerate(selected_groups):
            if item.name == self.group_name:
                found_index = i
                break
        
        if found_index >= 0:
            # Remove from selection
            selected_groups.remove(found_index)
        else:
            # Add to selection
            new_item = selected_groups.add()
            new_item.name = self.group_name
            new_item.index = self.group_index
        
        # Force UI redraw
        if context.area:
            context.area.tag_redraw()
        
        return {'FINISHED'}

# -----------------------------
# Clear Vertex Group Selection
# -----------------------------
class VERTEX_OT_clear_vgroup_selection(bpy.types.Operator):
    bl_idname = "vertex.clear_vgroup_selection"
    bl_label = "Clear Selection"
    bl_description = "Clear all selected vertex groups"

    def execute(self, context):
        scene = context.scene
        scene.vertex_tools_selected_groups.clear()
        
        # Force UI redraw
        if context.area:
            context.area.tag_redraw()
        
        return {'FINISHED'}

# -----------------------------
# Toggle Vertex Group Pin
# -----------------------------
class VERTEX_OT_toggle_vgroup_pin(bpy.types.Operator):
    bl_idname = "vertex.toggle_vgroup_pin"
    bl_label = "Toggle Vertex Group Pin"
    bl_description = "Pin/unpin this vertex group to keep it in search results"
    
    group_name: bpy.props.StringProperty()

    def execute(self, context):
        scene = context.scene
        pinned_groups = scene.vertex_tools_pinned_groups
        
        # Check if already pinned
        found_index = -1
        for i, item in enumerate(pinned_groups):
            if item.name == self.group_name:
                found_index = i
                break
        
        if found_index >= 0:
            # Remove from pinned
            pinned_groups.remove(found_index)
        else:
            # Add to pinned
            new_item = pinned_groups.add()
            new_item.name = self.group_name
        
        # Force UI redraw
        if context.area:
            context.area.tag_redraw()
        
        return {'FINISHED'}

# -----------------------------
# Clear Pinned Vertex Groups
# -----------------------------
class VERTEX_OT_clear_pinned_vgroups(bpy.types.Operator):
    bl_idname = "vertex.clear_pinned_vgroups"
    bl_label = "Clear Pins"
    bl_description = "Clear all pinned vertex groups"

    def execute(self, context):
        scene = context.scene
        scene.vertex_tools_pinned_groups.clear()
        
        # Force UI redraw
        if context.area:
            context.area.tag_redraw()
        
        return {'FINISHED'}


classes = (
    VertexToolsGroupSettings,
    BoneNameFilterItem,
    SelectedVertexGroupItem,
    PinnedVertexGroupItem,

    VERTEX_OT_save_set,
    VERTEX_OT_restore_set,
    VERTEX_OT_clear_set,
    VERTEX_OT_add_set,
    VERTEX_OT_remove_set,
    VERTEX_OT_select_set,
    VERTEX_OT_select_vertex_group,
    VERTEX_OT_select_vgroup_from_bone,
    VERTEX_OT_add_bone_to_filter,
    VERTEX_OT_remove_bone_from_filter,
    VERTEX_OT_merge_vertex_groups,
    VERTEX_OT_delete_vertex_groups,
    VERTEX_OT_toggle_vgroup_selection,
    VERTEX_OT_clear_vgroup_selection,
    VERTEX_OT_toggle_vgroup_pin,
    VERTEX_OT_clear_pinned_vgroups,
)

def register():
    # Import panels module to register its classes
    from . import panels
    
    # First register classes so PropertyGroup is known to RNA
    for c in classes:
        bpy.utils.register_class(c)
    
    # Register panel classes
    bpy.utils.register_class(panels.VERTEX_UL_vgroups_search)
    bpy.utils.register_class(panels.VERTEX_PT_groups_name_search_panel)
    bpy.utils.register_class(panels.VERTEX_PT_vertex_sets_panel)
    bpy.utils.register_class(panels.VERTEX_PT_vertex_info)

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

    # Bone name filters collection
    bpy.types.Scene.vertex_tools_bone_filters = bpy.props.CollectionProperty(type=BoneNameFilterItem)
    
    # Selected vertex groups for merging
    bpy.types.Scene.vertex_tools_selected_groups = bpy.props.CollectionProperty(type=SelectedVertexGroupItem)
    
    # Pinned vertex groups
    bpy.types.Scene.vertex_tools_pinned_groups = bpy.props.CollectionProperty(type=PinnedVertexGroupItem)
    
    # Search text for vertex group search (updates on each keypress)
    bpy.types.Scene.vertex_tools_vg_search = StringProperty(
        name="Search Vertex Groups",
        description="Type to filter vertex groups by name",
        default="",
        options={'TEXTEDIT_UPDATE'},
        update=panels._update_vg_search,
    )
    
    # Vertex group selector index
    bpy.types.Scene.vertex_tools_vgroup_index = IntProperty(
        name="Vertex Group Index", 
        description="Selected vertex group index for vertex selection",
        default=0,
        min=0,
        update=panels._update_vg_selector,
    )

    # register events
    bpy.app.handlers.load_post.append(on_load_post)

    bpy.msgbus.subscribe_rna(
        key=(bpy.types.Window, "scene"),
        owner=__name__,
        notify=on_scene_change,
        args=()
    )



def unregister():
    # Import panels to unregister
    from . import panels
    
    # Unregister panel classes
    bpy.utils.unregister_class(panels.VERTEX_PT_vertex_info)
    bpy.utils.unregister_class(panels.VERTEX_PT_vertex_sets_panel)
    bpy.utils.unregister_class(panels.VERTEX_PT_groups_name_search_panel)
    bpy.utils.unregister_class(panels.VERTEX_UL_vgroups_search)
    
    # Remove properties before unregistering classes
    if hasattr(bpy.types.Scene, "vertex_tools_saved_positions"):
        del bpy.types.Scene.vertex_tools_saved_positions
    if hasattr(bpy.types.Scene, "vertex_tools_group_count"):
        del bpy.types.Scene.vertex_tools_group_count
    if hasattr(bpy.types.Scene, "vertex_tools_group_settings"):
        del bpy.types.Scene.vertex_tools_group_settings
    if hasattr(bpy.types.Scene, "vertex_tools_bone_filters"):
        del bpy.types.Scene.vertex_tools_bone_filters
    if hasattr(bpy.types.Scene, "vertex_tools_selected_groups"):
        del bpy.types.Scene.vertex_tools_selected_groups
    if hasattr(bpy.types.Scene, "vertex_tools_pinned_groups"):
        del bpy.types.Scene.vertex_tools_pinned_groups
    if hasattr(bpy.types.Scene, "vertex_tools_vg_search"):
        del bpy.types.Scene.vertex_tools_vg_search
    if hasattr(bpy.types.Scene, "vertex_tools_vgroup_index"):
        del bpy.types.Scene.vertex_tools_vgroup_index

    for c in reversed(classes):
        bpy.utils.unregister_class(c)
    
    # unregister events
    bpy.app.handlers.load_post.remove(on_load_post)
    bpy.msgbus.clear_by_owner(__name__)
    

if __name__ == "__main__":
    register()
