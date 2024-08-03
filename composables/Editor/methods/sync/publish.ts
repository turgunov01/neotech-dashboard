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
            javascript: localStorage.getItem("javascript") as string,
        }

        this.element = element
    }

    sync() {
        publish(this.element)
    }
}

async function publish(model: GlobalInterface,) {
    try {
        // await apiDataFetch(`${uri}/api/pages/test-stranitsa`, {
        //     ...customHeaders("PUT"),
        //     body:
        //         JSON.stringify({
        //             name: model.name,
        //             sections: model.sections,
        //             html: model.html,
        //             css: model.css,
        //             cipher: model.cipher,
        //             javascript: model.javascript,
        //         })
        // })
        //     .then(response => response.json())
        //     .then(response => {
        //         if (response.status && response.status === 403) {
        //             alert(`Status: ${response.status}. You are not allowed to publish existing page!`)
        //         }
        // })
    } catch (err) {
        alert(err)
    } finally {
        const log = {
            username: showStoreData("username"),
            email: showStoreData("email") ? showStoreData("email") : showStoreData("username") + "@gmail.com",
            action: 4,
            pagename: "test-stranitsa",
        }

        // await apiDataFetch(`${uri}/api/history`, {
        //     ...customHeaders("POST"),
        //     body: JSON.stringify(log)
        // })
        //     .then(response => response.json())
        //     .then(response => {
        //         console.log(response)
        //     })
    }
}

export default { EditorPublish }