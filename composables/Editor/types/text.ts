import type { Editor } from "grapesjs";
import { types } from "~/composables/exports";
import { buildTextModel } from "../models/text.model";

export function addTextType(editor: Editor) {
    if (editor && typeof editor !== undefined) {
        editor.Components.addType(types.text, buildTextModel())
    } else {
        console.log(`Error: Editor is undefined! ~/composables/Editor/types/text.ts`)
    }
}