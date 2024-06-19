import type { Editor } from "grapesjs";

export class Panels {
    [variable: string]: any;

    constructor(component: Editor) {
        this.component = component as Editor;
    }

    addPanel(editor: Editor) {
        editor.Panels.addPanel({ id: "string" })
        console.log(editor.Panels.getPanel("views-container")?.buttons?.toJSON())
    }
}

export class Panel {
    [variable: string]: any;
    constructor(id: string, className: string, command: string, attributes: string, active: Boolean = false) {
        this.panel = {
            id: id,
            className: className,
            command: command,
            attributes: attributes,
            active: active,
        }
    }

    include(component: this.panel) {
        
    }
}