import type { Editor } from "grapesjs";
import { onCloneComponent, onCreateCallback, onRemoveCallback } from "../callbacks/on:component";

export function componentConfig(editor: Editor) {
    editor.on("component:create", async (model: Object) => {
        const content = ref({})

        const type = {
            action: "component:create",
            whatis: "component",
            page: "test"
        }

        await onCreateCallback(model)
        // onComponentAdd(type) // Statistics /api/logs/:username/?action=create&whatis=component&pageId=testId

    })

    editor.on("component:remove", async (model: Object) => {
        const type = {
            action: "component:remove",
            whatis: "component",
            page: "test"
        }

        await onRemoveCallback(model)
        // onComponentRemove(type) // Statistics /api/logs/:username/?action=remove&whatis=component&pageId=testId
    })

    editor.on("component:clone", async (model: Object) => {
        const type = {
            action: "component:clone",
            whatis: "component",
            page: "test"
        }
        await onCloneComponent(model)
        // onComponentClone(type) // Statistics /api/logs/:username/?action=clone&whatis=component&pageId=testId
    })
}