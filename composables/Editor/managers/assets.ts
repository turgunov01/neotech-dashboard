import { Editor } from "grapesjs";

export function GrapesInitAssetManager(editor: Editor) {
    const config = editor.AssetManager.getConfig()
    console.log(config)
}