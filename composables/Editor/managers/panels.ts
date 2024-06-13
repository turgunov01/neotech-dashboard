import type { Editor, Panel } from "grapesjs";

export class PanelManager {
    editor!: Editor;
    parent: string;
    button: string;

    constructor(parent: string, button: string) {
        this.parent = parent;
        this.button = button;
    }

    public setEditor(editor: Editor) {

    }
}

