import { Editor } from "grapesjs";
import { assetConfig, componentConfig } from "./Editor/config/trackers";

export function config(editor: Editor) {
    componentConfig(editor);
    assetConfig(editor)
}

