import type { Editor } from "grapesjs";
import { addInputType } from "./input";
import { addTextType } from "./text";


export function settings(editor: Editor) {
    addInputType(editor)
    addTextType(editor)
}