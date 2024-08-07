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
            id: useRouter().currentRoute.value.query.uid as string,
            name: useRouter().currentRoute.value.query.details as string,
            html: extraction(editor).html,
            css: (extraction(editor).css as any) as string,
            sections: editor.getComponents() as any,
            cipher: cipher(extraction(editor).html).toString(),
        }

        this.element = element;
    }

    sync() {
        publish(this.element)
    }
}

async function publish(model: GlobalInterface) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
        body: JSON.stringify(model)
    }
    await apiDataFetch(`${uri}/pages/${model.name}?uid=${useRouter().currentRoute.value.query.uid}`, options)
        .then(res => res.json())
        .then(res => {
            setTimeout(() => {
                location.reload();
            }, 1000);
        })
}

export default { EditorPublish }