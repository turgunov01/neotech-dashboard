import type { Editor } from "grapesjs";
import { buildInputModel } from "../models/input";
import { buildTextModel } from "../models/text";

function addInputType(editor: Editor) {
    if (editor && typeof editor !== undefined) {
        editor.Components.addType(types.input, buildInputModel())
    } else {
        console.log(`Error: Editor is undefined! ~/composables/Editor/types/input.ts`)
    }
}

function addTextType(editor: Editor) {
    if (editor && typeof editor !== undefined) {
        editor.Components.addType(types.text, buildTextModel())
    } else {
        console.log(`Error: Editor is undefined! ~/composables/Editor/types/text.ts`)
    }
}

export function settings(editor: Editor) {
    addInputType(editor)
    addTextType(editor)
}