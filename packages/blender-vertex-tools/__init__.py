# For Blender 4.4+, you also need a blender_manifest.toml file alongside this .py file

import bpy
from bpy.props import StringProperty

import json
from mathutils import Vector

# -----------------------------
# Save operator 
# -----------------------------
class VERTEX_OT_save_positions(bpy.types.Operator):
    bl_idname = "vertex.save_positions"
    bl_label = "Save Vertex Positions"
    bl_description = "Save the positions of currently selected vertices"

    @classmethod
    def poll(cls, context):
        return context.object is not None and context.object.type == 'MESH'

    def execute(self, context):
        obj = context.object
        bpy.ops.object.mode_set(mode='OBJECT')
        selected_indices = [v.index for v in obj.data.vertices if v.select]
        
        # Store as JSON string in the scene property
        positions_data = {str(i): list(obj.data.vertices[i].co) for i in selected_indices}
        context.scene.vertex_tools_saved_positions = json.dumps(positions_data)
        
        self.report({'INFO'}, f"Saved {len(selected_indices)} vertex positions.")
        bpy.ops.object.mode_set(mode='EDIT')
        return {'FINISHED'}

# -----------------------------
# Restore operator 
# -----------------------------
class VERTEX_OT_restore_positions(bpy.types.Operator):
    bl_idname = "vertex.restore_positions"
    bl_label = "Restore Vertex Positions"
    bl_description = "Restore saved vertex positions"

    @classmethod
    def poll(cls, context):
        return context.object is not None and context.object.type == 'MESH'

    def execute(self, context):
        obj = context.object
        
        # Get saved positions from JSON string
        saved_data = context.scene.vertex_tools_saved_positions
        if not saved_data:
            self.report({'WARNING'}, "No saved vertex positions found!")
            return {'CANCELLED'}
        
        try:
            positions_data = json.loads(saved_data)
        except json.JSONDecodeError:
            self.report({'WARNING'}, "Saved data is corrupted!")
            return {'CANCELLED'}
            
        # Switch to object mode before creating a bmesh object
        # Bmesh needs the object to be in a known state
        bpy.ops.object.mode_set(mode='OBJECT')
        
        # Create a new BMesh instance from the object's mesh data
        import bmesh
        bm = bmesh.new()
        bm.from_mesh(obj.data)
        
        # Prepare to restore positions
        restored_count = 0
        
        # Use a dictionary to quickly map vertex index to the bmesh vertex
        # This is more robust than relying on the list order
        verts_by_index = {v.index: v for v in bm.verts}
        
        # Restore positions
        for i_str, pos_list in positions_data.items():
            i = int(i_str)
            if i in verts_by_index:
                verts_by_index[i].co = Vector(pos_list)
                restored_count += 1
        
        # Write the modified BMesh data back to the mesh
        bm.to_mesh(obj.data)
        
        # Free the BMesh data
        bm.free()
        
        # Update the object's dependency graph to ensure visual refresh
        obj.data.update()
        
        # This is a bit redundant if you're already updating the mesh,
        # but it can help in some situations to ensure the viewport updates.
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)
        
        # Return to edit mode
        bpy.ops.object.mode_set(mode='EDIT')
        
        self.report({'INFO'}, f"Restored {restored_count}/{len(positions_data)} vertex positions.")
        return {'FINISHED'}


# -----------------------------
# Clear operator
# -----------------------------
class VERTEX_OT_clear_positions(bpy.types.Operator):
    bl_idname = "vertex.clear_positions"
    bl_label = "Clear Saved Positions"
    bl_description = "Clear any saved vertex positions"

    def execute(self, context):
        context.scene.vertex_tools_saved_positions = ""
        self.report({'INFO'}, "Cleared saved vertex positions.")
        return {'FINISHED'}

# -----------------------------
# Panel in the N-Panel
# -----------------------------
class VERTEX_PT_positions_panel(bpy.types.Panel):
    bl_label = "Vertex Tools"
    bl_idname = "VERTEX_PT_positions_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Vertex Tools'  # Tab name

    def draw(self, context):
        layout = self.layout
        obj = context.object

        # Get selection info
        first_index = "N/A"
        count = 0
        saved_count = 0
        
        if obj and obj.type == 'MESH':
            bm = obj.data
            selected = [v for v in bm.vertices if v.select]
            count = len(selected)
            if selected:
                first_index = selected[0].index
        
        # Check if we have saved positions
        if context.scene.vertex_tools_saved_positions:
            try:
                saved_data = json.loads(context.scene.vertex_tools_saved_positions)
                saved_count = len(saved_data)
            except:
                saved_count = 0

        # Buttons + info
        layout.operator("vertex.save_positions", text="💾 Save Vertex Positions")
        layout.label(text=f"Selected From Index: {first_index}")
        layout.label(text=f"Current Selection: {count}")
        layout.label(text=f"Saved Positions: {saved_count}")
        layout.operator("vertex.restore_positions", text="↩ Restore Vertex Positions")
        layout.operator("vertex.clear_positions", text="🗑 Clear Saved Positions")

# -----------------------------
# Register all
# -----------------------------
classes = (
    VERTEX_OT_save_positions,
    VERTEX_OT_restore_positions,
    VERTEX_OT_clear_positions,
    VERTEX_PT_positions_panel,
)

def register():
    # Register the scene property
    bpy.types.Scene.vertex_tools_saved_positions = StringProperty(
        name="Vertex Tools Saved Positions",
        description="JSON string storing saved vertex positions",
        default=""
    )
    
    for cls in classes:
        bpy.utils.register_class(cls)

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
    
    # Unregister the scene property
    del bpy.types.Scene.vertex_tools_saved_positions

if __name__ == "__main__":
    register()