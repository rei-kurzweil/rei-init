import { input, select } from '@inquirer/prompts'
import path from 'path'
import fs from 'fs-extra'

// New: Blender Python plugin initializer
export async function initPythonBlenderPluginPackage(targetDir: string, name: string) {
    // gather template vars (except name)
    const author = await input({ message: 'Author?', default: 'Anonymous' })
    const description = await input({ message: 'Description?', default: `Blender addon ${name}` })
    const panel_category = await input({ message: 'Panel Category (UI tab)?', default: 'Vertex Tools' })
    const blender_plugin_category = await input({ message: 'Blender Addon Category?', default: 'Object' })
    // derive sensible default class prefix (PascalCase, letters only start)
    const defaultClassPrefix = name
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .split(' ')
        .filter(Boolean)
        .map(s => s[0].toUpperCase() + s.slice(1))
        .join('')
        .replace(/^[^A-Za-z]+/, '')
        || 'MyAddon'
    const class_prefix = await input({ message: 'Class Prefix?', default: defaultClassPrefix })

    const template = `
bl_info = {
    "name": "${name}",
    "author": "${author}",
    "version": (0, 1, 0),
    "blender": (2, 80, 0),
    "location": "View3D > UI > ${panel_category}",
    "description": "${description}",
    "warning": "",
    "doc_url": "",
    "category": "${blender_plugin_category}",
}

import bpy

class ${class_prefix}_OT_example(bpy.types.Operator):
    bl_idname = "${blender_plugin_category.toLowerCase()}.example"
    bl_label = "Example Operator"

    def execute(self, context):
        self.report({'INFO'}, "Hello from ${name}!")
        return {'FINISHED'}

class ${class_prefix}_PT_panel(bpy.types.Panel):
    bl_label = "${panel_category} Panel"
    bl_idname = "${class_prefix}_PT_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "${panel_category}"

    def draw(self, context):
        layout = self.layout
        layout.operator("${blender_plugin_category.toLowerCase()}.example", text="Run Example")

classes = (
    ${class_prefix}_OT_example,
    ${class_prefix}_PT_panel,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)

if __name__ == "__main__":
    register()
`.trimStart()

    // write addon root __init__.py (Blender expects this for installation as a zip)
    await fs.writeFile(path.join(targetDir, '__init__.py'), template)

    // Optional README
    const readme = `# Blender Addon: ${name}

Install by zipping this folder (or directly placing it) into Blender's addons directory, then enable it in Preferences > Add-ons.

Panel: View3D > UI > ${panel_category}
Operator: ${blender_plugin_category.toLowerCase()}.example
`
    await fs.writeFile(path.join(targetDir, 'README.md'), readme)
}