import type { Editor } from "grapesjs";
import { GrapesAddHook } from "./hooks";

export function HookActivity(editor: Editor) {
    editor.on(`component:create`, model => {
        GrapesAddHook(model)
    });
}