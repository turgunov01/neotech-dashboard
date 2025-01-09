import { Editor, type Panel } from "grapesjs";

class PanelsMods {
    private _editor: Editor;
    constructor(editor: Editor) {
        this._editor = editor;
        this.width();
        this.components();
    }

    width() {
        const preview = this._editor.Panels.removeButton("options", "preview");
        let counter = 0;

        this._editor.Panels.addButton("options", {
            id: "preview",
            dragdrop: false,
            className: "fa fa-eye",
            tagName: "span",
            command: (event: any) => {
                const container = document.querySelector(".gjs-cv-canvas");

                if (counter % 2 === 0) {
                    container?.classList.add("fullwidth");
                } else {
                    container?.classList.remove("fullwidth");
                }

                counter++;
            }
        })
    }

    components() {
        this._editor.Panels.removeButton("views", "open-blocks");
        const exportButton = this._editor.Panels.addButton("views", {
            id: "open-blocks",
            dragdrop: false,
            className: "fa fa-plus",
            tagName: "span",
            togglable: false,
            command: (event: any) => {
                const component = document.querySelector(".project-components") as HTMLElement;
                const container = component.querySelector(".container") as HTMLElement;

                component.classList.add('active');

                container.onmouseenter = () => {
                    component.classList.add('logged');
                }

                container.onmouseleave = () => {
                    component.classList.remove('logged');
                }

                component.onclick = (e: any) => {
                    if (e.target.classList.contains('project-components')) {
                        component.classList.remove('active');
                    }
                }
            }
        })

    }
}

export default PanelsMods;