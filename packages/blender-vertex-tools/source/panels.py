import bpy
import bmesh
from collections import defaultdict

# -----------------------------
# Update Callbacks
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

# -----------------------------
# Helper function for Vertex Info
# -----------------------------
def _get_vertex_group_weights(obj):
    """Calculate total weights for each vertex group from selected vertices."""
    if not obj or obj.type != 'MESH':
        return {}
    
    mesh = obj.data
    weights = defaultdict(float)
    
    # Get selected vertices depending on mode
    if obj.mode == "EDIT":
        try:
            bm = bmesh.from_edit_mesh(mesh)
            bm.verts.ensure_lookup_table()
            dlayer = bm.verts.layers.deform.verify()
            if not dlayer:
                return {}
            # Read weights from the deform layer (no mesh.vertices indexing)
            for v in bm.verts:
                if not v.select:
                    continue
                dvert = v[dlayer]  # dict-like: {group_index: weight}
                for group_index, w in dvert.items():
                    if group_index < len(obj.vertex_groups):  # Safety
                        weights[group_index] += w
        except Exception:
            return {}
    else:
        selected_verts = [v for v in mesh.vertices if v.select]
        # Calculate weights from mesh vertices in Object Mode
        for v in selected_verts:
            for g in v.groups:
                group_index = g.group
                if group_index < len(obj.vertex_groups):  # Safety check
                    weights[group_index] += g.weight
    
    return weights

# -----------------------------
# Helper function for loading groups (needed by panels)
# -----------------------------
def _default_group():
    return {"first_index": None, "positions": {}, "name": "Untitled Set"}

def _load_groups(scene):
    # Import json here to avoid requiring it at module level
    import json
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
class VERTEX_PT_vertex_sets_panel(bpy.types.Panel):
    bl_label = "Vertex Sets"
    bl_idname = "VERTEX_PT_vertex_sets_panel"
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
            
            # Show set name in the select button
            vertex_set_name = g.get("name", "Vertices")
            op_select = header.operator("vertex.select_set", text=f"Select {vertex_set_name}", icon='RESTRICT_SELECT_OFF')
            op_select.group_index = idx
            
            if len(groups) > 1:
                op_rem = header.operator("vertex.remove_set", text="- Remove", emboss=True)
                op_rem.group_index = idx

            # Name input field
            row_name = box.row(align=True)
            row_name.label(text="Name:")
            if settings_coll and idx < len(settings_coll):
                row_name.prop(settings_coll[idx], "name", text="")

            # Second row: Selected From Index
            row_meta = box.row(align=True)
            first_index = g.get("first_index")
            first_text = first_index if first_index is not None else "N/A"
            row_meta.label(text=f"First Index: {first_text}")
                
            # Saved count
            saved_count = len(g.get("positions", {}))
            box.label(text=f"Saved Positions: {saved_count}")

            # Actions
            row = box.row()
            op_save = row.operator("vertex.save_set", text="💾 Save")
            op_save.group_index = idx
            op_restore = row.operator("vertex.restore_set", text="↩ Restore")
            op_restore.group_index = idx
            op_clear = row.operator("vertex.clear_set", text="🗑 Clear")
            op_clear.group_index = idx

        layout.separator()
        layout.operator("vertex.add_set", text="+ New Pinned Set")

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
