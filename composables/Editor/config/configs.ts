import type { Editor } from "grapesjs";

export class Panels {
    [variable: string]: any;

    constructor(component: Editor) {
        this.component = component as Editor;
    }

    addPanel(editor: Editor) {

        editor.Panels.addButton('views', {
            id: "views-container",
            className: "fa fa-book",
            command: "views-container",
            attributes: {
                title: "Custom Panel",
            },
        })
        console.log(editor.Panels.getPanels().toJSON())
    }
}