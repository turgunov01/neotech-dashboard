import { Editor } from "grapesjs";
import { onCloneComponent, onCreateCallback, onRemoveCallback } from "../callbacks/on:component";
import { onComponentAdd, onComponentClone, onComponentDrag, onComponentRemove } from "../hooks/component:hooks";

export function config(editor: Editor) {
    editor.on("component:create", async (model: Object) => {
        const content = ref({})

        const type = {
            action: "component:create",
            whatis: "component",
            page: "test"
        }


        await onCreateCallback(model)

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

    editor.on("component:drag:start", async (model: Object) => {
        const type = {
            action: "component:drag",
            whatis: "component",
            page: "test"
        }
        await onCloneComponent(model)
        // onComponentDrag(type) // Statistics /api/logs/:username/?action=drag&whatis=component&pageId=testId
    })



}

