import type { Editor } from "grapesjs"

export function extract(editor: Editor) {
    const container = editor as Editor;

    const params = {
        html: container.getHtml(),
        css: container.getCss(),
        js: container.getJs()
    }

    return params
}