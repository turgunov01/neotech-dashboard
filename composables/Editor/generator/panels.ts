import type { Editor, Panel } from "grapesjs";

export function eventPanel(editor: Editor) {
    const preview = editor.Panels.removeButton('options', 'preview');
    let counter = 0;
    const exportButton = editor.Panels.addButton('options', {
        id: "preview",
        dragdrop: false,
        className: "fa fa-eye",
        tagName: "span",
        command: (event: any) => {
            const container = document.querySelector(".gjs-cv-canvas") as HTMLElement;

            if (counter % 2 === 0) {
                container?.classList.add("fullwidth");
            } else {
                container?.classList.remove("fullwidth");
            }

            counter++;
        }
    })
}