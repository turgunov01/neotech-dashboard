import type { Editor } from "grapesjs";
import { plusButtonConfig } from "../../config/components";

class PlusAddon {
    private _editor: Editor;

    constructor(editor: Editor) {
        this._editor = editor;
    }

    activate() {
        const container = this._editor.Canvas.getDocument().body;

        container?.addEventListener("mouseenter", () => {
            console.log(true)
        })
    }
}

export default PlusAddon;