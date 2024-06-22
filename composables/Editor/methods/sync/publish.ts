import type { GlobalInterface } from "~/interface/global/global.interfaces"
import type { Editor } from "grapesjs";

import { cipher } from "~/composables/cipher/cipher";

function extraction(editor: Editor) {
    const container = editor as Editor
    const params = {
        html: container.getHtml(),
        css: container.getCss(),
        js: container.getJs()
    }

    return params
}

export class EditorPublish {
    [variable: string]: any;

    constructor(editor: Editor) {
        this.editor = editor as Editor;

        const element: GlobalInterface = {
            name: "test-stranitsa",
            html: extraction(editor).html,
            css: (extraction(editor).css as any) as string,
            sections: editor.getComponents() as any,
            cipher: cipher(extraction(editor).html).toString(),
        }

        this.element = element
    }

    sync() {
        publish(this.element)
    }
}

async function publish(model: GlobalInterface,) {
    try {
        await apiDataFetch(`${uri}/api/pages/test-stranitsa`, {
            ...customHeaders("PUT"),
            body:
                JSON.stringify({
                    name: model.name,
                    sections: model.sections,
                    html: model.html,
                    css: model.css,
                    cipher: model.cipher,
                })
        })
            .then(response => response.json())
            .then(response => {
                if (response.status && response.status === 403) {
                    alert(`Status: ${response.status}. You are not allowed to publish existing page!`)
                }

            })
    } catch (err) {
        alert(err)
    }
}

export default { EditorPublish }