import type { Editor } from "grapesjs";
import { types } from "~/composables/exports";
import { buildInputModel } from "../models/input.model";

export function addInputType(editor: Editor) {
    if (editor && typeof editor !== undefined) {
        editor.Components.addType(types.input, buildInputModel())
    } else {
        console.log(`Error: Editor is undefined! ~/composables/Editor/types/input.ts`)
    }
}