import { Editor } from "grapesjs";
import { componentConfig } from "../config/components/component:create";

export function config(editor: Editor) {
    componentConfig(editor);
}

