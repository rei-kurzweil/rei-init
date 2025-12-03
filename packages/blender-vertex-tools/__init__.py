from multiprocessing import context
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

# -----------------------------
# Vertex Group Search UI List
# -----------------------------
class VERTEX_UL_vgroups_search(bpy.types.UIList):
    """Filtered list of vertex groups based on search text and bone name filters."""

    def filter_items(self, context, data, propname):
        items = getattr(data, propname)
        search = (getattr(context.scene, 'vertex_tools_vg_search', '') or '').lower()
        bone_filters = context.scene.vertex_tools_bone_filters
        pinned_groups = context.scene.vertex_tools_pinned_groups
        
        flags = []
        
        # If no filters, show all
        if not search and len(bone_filters) == 0 and len(pinned_groups) == 0:
            flags = [self.bitflag_filter_item] * len(items)
            return flags, []
        
        # Apply filters (union: show if matches text search OR bone filter OR pinned)
        for vg in items:
            name = getattr(vg, 'name', '')
            name_lower = name.lower()
            
            # Check if pinned
            is_pinned = any(item.name == name for item in pinned_groups)
            
            # Check text search filter
            text_match = search and (search in name_lower)
            
            # Check bone name filters (if any exist, name must match at least one)
            bone_match = False
            if len(bone_filters) > 0:
                bone_match = any(item.name == name for item in bone_filters)
            
            # Show item if it matches text search OR bone filter OR is pinned (union)
            if text_match or bone_match or is_pinned:
                flags.append(self.bitflag_filter_item)
            else:
                flags.append(0)
        
        return flags, []

    def draw_item(self, context, layout, data, item, icon, active_data, active_propname, index):
        if self.layout_type in {'DEFAULT', 'COMPACT'}:
            row = layout.row(align=True)
            
            # Check if this group is selected
            selected_groups = context.scene.vertex_tools_selected_groups
            is_selected = any(sg.name == item.name for sg in selected_groups)
            
            # Checkbox for selection
            checkbox_icon = 'CHECKBOX_HLT' if is_selected else 'CHECKBOX_DEHLT'
            row.operator("vertex.toggle_vgroup_selection", text="", icon=checkbox_icon, emboss=False).group_name = item.name
            
            # Vertex group name
            row.label(text=item.name, icon='GROUP_VERTEX')
            
            # Count vertices in this group (only if we have a mesh object)
            obj = context.object
            if obj and obj.type == 'MESH':
                vertex_count = 0
                for v in obj.data.vertices:
                    try:
                        # Check if vertex has weight in this group
                        item.weight(v.index)
                        vertex_count += 1
                    except RuntimeError:
                        # Vertex not in this group
                        pass
                
                # Display count
                count_label = row.row()
                count_label.alignment = 'RIGHT'
                count_label.label(text=f"({vertex_count})")
            
            # Pin button
            pinned_groups = context.scene.vertex_tools_pinned_groups
            is_pinned = any(pg.name == item.name for pg in pinned_groups)
            pin_icon = 'PINNED' if is_pinned else 'UNPINNED'
            row.operator("vertex.toggle_vgroup_pin", text="", icon=pin_icon, emboss=False).group_name = item.name
            
        elif self.layout_type == 'GRID':
            layout.alignment = 'CENTER'
            layout.label(text="")


# -----------------------------
# Panel: Vertex Group Search
# -----------------------------
def _update_vg_search(self, context):
    """On search text change, optionally highlight the first matching
    vertex group in Object Data Properties and sync with selector panel.

    We avoid manual redraws; Blender's event system will refresh UI as needed.
    """
    try:
        scene = context.scene
        obj = context.object
        search = (getattr(scene, 'vertex_tools_vg_search', '') or '').strip().lower()

        # Optionally highlight a matching group in Object Data Properties
        if obj and obj.type == 'MESH' and obj.vertex_groups and search:
            for i, vg in enumerate(obj.vertex_groups):
                if search in vg.name.lower():
                    obj.vertex_groups.active_index = vg.index
                    # Also sync with the selector panel
                    scene.vertex_tools_vgroup_index = i
                    break
    except Exception:
        # Be robust in case context is partial during updates
        pass

def _update_vg_selector(self, context):
    """When vertex group is selected in selector panel, sync with Object Data Properties."""
    try:
        scene = context.scene
        obj = context.object
        vgroup_index = getattr(scene, 'vertex_tools_vgroup_index', 0)
        
        if obj and obj.type == 'MESH' and obj.vertex_groups:
            if 0 <= vgroup_index < len(obj.vertex_groups):
                obj.vertex_groups.active_index = vgroup_index
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

        # Search bar - full width, no label
        layout.prop(scene, "vertex_tools_vg_search", text="", icon='VIEWZOOM')
        
        # Bone filter section
        bone_box = layout.box()
        bone_header = bone_box.row()
        bone_header.label(text="Bone Filters", icon='BONE_DATA')
        
        bone_filters = scene.vertex_tools_bone_filters
        if len(bone_filters) > 0:
            for i, item in enumerate(bone_filters):
                row = bone_box.row()
                row.label(text=item.name, icon='DOT')
                op_remove = row.operator("vertex.remove_bone_from_filter", text="", icon='X')
                op_remove.index = i
        else:
            bone_box.label(text="No bone filters", icon='INFO')
        
        # Add bone button
        bone_box.operator("vertex.add_bone_to_filter", text="Add Selected Bone", icon='ADD')

        box = layout.box()
        
        # Show pinned groups info
        pinned_groups = scene.vertex_tools_pinned_groups
        if len(pinned_groups) > 0:
            pin_row = box.row()
            pin_row.label(text=f"{len(pinned_groups)} pinned", icon='PINNED')
            pin_row.operator("vertex.clear_pinned_vgroups", text="Clear Pins", icon='X')
        
        # Show selection info
        selected_groups = scene.vertex_tools_selected_groups
        if len(selected_groups) > 0:
            sel_row = box.row()
            sel_row.label(text=f"{len(selected_groups)} selected", icon='CHECKBOX_HLT')
            sel_row.operator("vertex.clear_vgroup_selection", text="Clear", icon='X')
        
        box.label(text="Results", icon='OUTLINER_DATA_MESH')

        # Collect bone filters and pinned groups
        bone_filter_names = {item.name for item in bone_filters}
        pinned_group_names = {item.name for item in pinned_groups}
        all_virtual_names = bone_filter_names | pinned_group_names

        # If no mesh object is selected, show everything as virtual results
        if not obj or obj.type != 'MESH':
            if all_virtual_names:
                box.label(text="(No mesh selected - showing filters & pins)", icon='INFO')
                for name in sorted(all_virtual_names):
                    row = box.row(align=True)
                    
                    # Check if selected
                    is_selected = any(sg.name == name for sg in selected_groups)
                    checkbox_icon = 'CHECKBOX_HLT' if is_selected else 'CHECKBOX_DEHLT'
                    row.operator("vertex.toggle_vgroup_selection", text="", icon=checkbox_icon, emboss=False).group_name = name
                    
                    # Show name with appropriate icon
                    is_bone_filter = name in bone_filter_names
                    is_pinned = name in pinned_group_names
                    
                    icon = 'BONE_DATA' if is_bone_filter else 'GROUP_VERTEX'
                    row.label(text=name, icon=icon)
                    
                    # Pin button
                    pin_icon = 'PINNED' if is_pinned else 'UNPINNED'
                    row.operator("vertex.toggle_vgroup_pin", text="", icon=pin_icon, emboss=False).group_name = name
            else:
                box.label(text="Select a mesh object to search its vertex groups.")
            
            # Still show merge button if groups are selected
            if len(selected_groups) >= 2:
                merge_row = box.row()
                merge_row.scale_y = 1.2
                merge_row.operator("vertex.merge_vertex_groups", text=f"Merge {len(selected_groups)} Groups", icon='AUTOMERGE_ON')
            
            return

        # Mesh is selected - show template_list with actual vertex groups
        if not obj.vertex_groups:
            box.label(text="Object has no vertex groups.")
            # Still show virtual groups even if mesh has no vertex groups
            if all_virtual_names:
                box.separator()
                box.label(text="Bone Filters & Pinned Groups:", icon='INFO')
                for name in sorted(all_virtual_names):
                    row = box.row(align=True)
                    
                    is_selected = any(sg.name == name for sg in selected_groups)
                    checkbox_icon = 'CHECKBOX_HLT' if is_selected else 'CHECKBOX_DEHLT'
                    row.operator("vertex.toggle_vgroup_selection", text="", icon=checkbox_icon, emboss=False).group_name = name
                    
                    is_bone_filter = name in bone_filter_names
                    icon = 'BONE_DATA' if is_bone_filter else 'GROUP_VERTEX'
                    row.label(text=name, icon=icon)
                    
                    is_pinned = name in pinned_group_names
                    pin_icon = 'PINNED' if is_pinned else 'UNPINNED'
                    row.operator("vertex.toggle_vgroup_pin", text="", icon=pin_icon, emboss=False).group_name = name
        else:
            # Show filtered list of the object's vertex groups
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
            
            # Find virtual groups that don't exist on this mesh
            existing_vg_names = {vg.name for vg in obj.vertex_groups}
            virtual_only_names = all_virtual_names - existing_vg_names
            
            # Show virtual groups that don't exist on the mesh
            if virtual_only_names:
                box.separator()
                box.label(text="Filters/Pins not on this mesh:", icon='INFO')
                for name in sorted(virtual_only_names):
                    row = box.row(align=True)
                    
                    is_selected = any(sg.name == name for sg in selected_groups)
                    checkbox_icon = 'CHECKBOX_HLT' if is_selected else 'CHECKBOX_DEHLT'
                    row.operator("vertex.toggle_vgroup_selection", text="", icon=checkbox_icon, emboss=False).group_name = name
                    
                    is_bone_filter = name in bone_filter_names
                    icon = 'BONE_DATA' if is_bone_filter else 'GROUP_VERTEX'
                    row.label(text=name, icon=icon)
                    
                    is_pinned = name in pinned_group_names
                    pin_icon = 'PINNED' if is_pinned else 'UNPINNED'
                    row.operator("vertex.toggle_vgroup_pin", text="", icon=pin_icon, emboss=False).group_name = name
        
        # Merge and delete buttons - show when groups are selected
        if len(selected_groups) >= 1:
            action_row = box.row(align=True)
            action_row.scale_y = 1.2
            
            if len(selected_groups) >= 2:
                # Show merge button when 2+ groups selected
                action_row.operator("vertex.merge_vertex_groups", text=f"Merge {len(selected_groups)} Groups", icon='AUTOMERGE_ON')
                # Delete button as icon only
                action_row.operator("vertex.delete_vertex_groups", text="", icon='TRASH')
            else:
                # Show only delete button when 1 group selected
                action_row.operator("vertex.delete_vertex_groups", text=f"Delete {len(selected_groups)} Group", icon='TRASH')

# -----------------------------
# Panel
# -----------------------------
class VERTEX_PT_positions_panel(bpy.types.Panel):
    bl_label = "Vertex Sets"
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
# Helper function for Vertex Info
# -----------------------------
def _get_vertex_group_weights(obj):
    """Calculate total weights for each vertex group from selected vertices."""
    if not obj or obj.type != 'MESH':
        return {}
    
    from collections import defaultdict
    mesh = obj.data
    weights = defaultdict(float)
    
    # Get selected vertices depending on mode
    if obj.mode == "EDIT":
        try:
            bm = bmesh.from_edit_mesh(mesh)
            bm.verts.ensure_lookup_table()
            selected_verts = [v for v in bm.verts if v.select]
        except:
            return {}
    else:
        selected_verts = [v for v in mesh.vertices if v.select]
    
    # Calculate weights
    for v in selected_verts:
        # Convert bmesh vert to mesh vert if needed
        mv = mesh.vertices[v.index] if obj.mode == "EDIT" else v
        
        for g in mv.groups:
            group_index = g.group
            if group_index < len(obj.vertex_groups):  # Safety check
                weights[group_index] += g.weight
    
    return weights

# -----------------------------
# Panel: Vertex Info
# -----------------------------
class VERTEX_PT_vertex_info(bpy.types.Panel):
    bl_label = "Vertex Info"
    bl_idname = "VERTEX_PT_vertex_info"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Vertex Tools'

    def draw(self, context):
        layout = self.layout
        obj = context.object

        if not obj or obj.type != 'MESH':
            layout.label(text="Select a mesh object", icon='INFO')
            return

        mesh = obj.data
        
        # Count selected vertices
        selected_count = 0
        if obj.mode == "EDIT":
            try:
                bm = bmesh.from_edit_mesh(mesh)
                bm.verts.ensure_lookup_table()
                selected_count = sum(1 for v in bm.verts if v.select)
            except:
                selected_count = 0
        else:
            selected_count = sum(1 for v in mesh.vertices if v.select)
        
        # Basic info
        layout.label(text=f"Vertices selected: {selected_count}")
        
        # Vertex group weights
        weights = _get_vertex_group_weights(obj)
        
        if not weights:
            if obj.vertex_groups:
                layout.label(text="Select vertices to see aggregate weights")
            else:
                layout.label(text="Object has no vertex groups")
            return
        
        # Display group weights
        weights_box = layout.box()
        weights_box.label(text="Group Weights for Selected Vertices", icon='GROUP_VERTEX')
        
        # Sort by total weight (descending order - highest weights first)
        sorted_groups = sorted(weights.items(), key=lambda x: x[1], reverse=True)
        # Limit to first 8 groups to avoid UI overflow
        max_groups_to_show = min(len(sorted_groups), 8)
        for i, (group_index, total_weight) in enumerate(sorted_groups):
            if i >= max_groups_to_show:
                break
            if group_index < len(obj.vertex_groups):
                group_name = obj.vertex_groups[group_index].name
                
                row = weights_box.row()
                # Make the group name clickable to select it
                props = row.operator("vertex.select_vertex_group", text=group_name, emboss=False)
                props.group_index = group_index
                row.label(text=f"{total_weight:.4f}")
        if len(sorted_groups) > max_groups_to_show:
            weights_box.label(text=f"... and {len(sorted_groups) - max_groups_to_show} more groups")
# -----------------------------
# 
# -----------------------------
classes = (
    VertexToolsGroupSettings,
    BoneNameFilterItem,
    SelectedVertexGroupItem,
    PinnedVertexGroupItem,

    VERTEX_OT_save_positions,
    VERTEX_OT_restore_positions,
    VERTEX_OT_clear_positions,
    VERTEX_OT_add_group,
    VERTEX_OT_remove_group,
    VERTEX_OT_select_group,
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

    VERTEX_UL_vgroups_search,
    
    VERTEX_PT_positions_panel,
    VERTEX_PT_vertex_info,
    VERTEX_PT_groups_name_search_panel
    
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
        update=_update_vg_search,
    )
    
    # Vertex group selector index
    bpy.types.Scene.vertex_tools_vgroup_index = IntProperty(
        name="Vertex Group Index", 
        description="Selected vertex group index for vertex selection",
        default=0,
        min=0,
        update=_update_vg_selector,
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


if __name__ == "__main__":
    register()
