import { publish } from "../events/publish";
import type { Editor } from "grapesjs";

export class Publish {
    [variable: string]: any;

    constructor(editor: Editor) {
        this.editor = editor as Editor;
    }

    publish() {
        this.container = this.editor;
        publish(this.container, 1);
    }

    save() {
        this.container = this.editor;
        publish(this.container);
    }
}