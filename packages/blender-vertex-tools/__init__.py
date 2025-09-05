bl_info = {
    "name": "blender-vertex-tools",
    "author": "rii evans",
    "version": (0, 1, 0),
    "blender": (2, 80, 0),
    "location": "View3D > UI > VertexTools",
    "description": "tools for pinning vertices in place (extra hands to hold stuff w/o relying on undo stack) et al",
    "warning": "",
    "doc_url": "",
    "category": "Mesh",
}

import bpy

# -----------------------------
# Save operator (your original)
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
        context.scene._saved_vertex_positions = {i: obj.data.vertices[i].co.copy() for i in selected_indices}
        self.report({'INFO'}, f"Saved {len(selected_indices)} vertex positions.")
        bpy.ops.object.mode_set(mode='EDIT')
        return {'FINISHED'}

# -----------------------------
# Restore operator (your original)
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
        saved_positions = getattr(context.scene, "_saved_vertex_positions", None)
        if not saved_positions:
            self.report({'WARNING'}, "No saved vertex positions found!")
            return {'CANCELLED'}
        bpy.ops.object.mode_set(mode='OBJECT')
        for i, pos in saved_positions.items():
            obj.data.vertices[i].co = pos
        obj.data.update()
        bpy.ops.object.mode_set(mode='EDIT')
        self.report({'INFO'}, f"Restored {len(saved_positions)} vertex positions.")
        return {'FINISHED'}

# -----------------------------
# Clear operator
# -----------------------------
class VERTEX_OT_clear_positions(bpy.types.Operator):
    bl_idname = "vertex.clear_positions"
    bl_label = "Clear Saved Positions"
    bl_description = "Clear any saved vertex positions"

    def execute(self, context):
        if hasattr(context.scene, "_saved_vertex_positions"):
            context.scene._saved_vertex_positions.clear()
            self.report({'INFO'}, "Cleared saved vertex positions.")
        else:
            self.report({'WARNING'}, "No saved positions to clear.")
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
        if obj and obj.type == 'MESH':
            bm = obj.data
            selected = [v for v in bm.vertices if v.select]
            count = len(selected)
            if selected:
                first_index = selected[0].index

        # Buttons + info
        layout.operator("vertex.save_positions", text="💾 Save Vertex Positions")
        layout.label(text=f"Selected From Index: {first_index}")
        layout.label(text=f"Vertex Count: {count}")
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
    for cls in classes:
        bpy.utils.register_class(cls)

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)

if __name__ == "__main__":
    register()