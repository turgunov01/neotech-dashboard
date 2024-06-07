import { Editor } from "grapesjs";
import { assetConfig, componentConfig } from "../config/trackers";

export function config(editor: Editor) {
    componentConfig(editor);
    assetConfig(editor)
}

