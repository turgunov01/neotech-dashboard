import { Editor } from "grapesjs";
import { onCreateCallback, onRemoveCallback } from "../callbacks/on:component";
import { onComponentAdd, onComponentRemove } from "../hooks/component:hooks";

export function config(editor: Editor) {
    editor.on("component:add", async (model: Object) => {
        await onCreateCallback(model)
        onComponentAdd(model) // Notification Hook
    })

    editor.on("component:remove", async (model: Object) => {
        await onRemoveCallback(model)
        onComponentRemove(model) // Notification Hook
    })
}

