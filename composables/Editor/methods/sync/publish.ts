import type { GlobalInterface } from "~/interface/global/global.interfaces"
import type { Editor } from "grapesjs";

import { cipher } from "~/composables/cipher/cipher";
import { setActivityMiddleware } from "~/middleware/history.activity";

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
            name: useRouter().currentRoute.value.query.id as string,
            html: extraction(editor).html,
            css: (extraction(editor).css as any) as string,
            sections: editor.getComponents() as any,
        }

        this.element = element;
    }

    sync() {
        setActivityMiddleware(`Опубликовал страницу с конструктора`, `constructor_published`);
        publish(this.element)
    }
}

async function publish(model: GlobalInterface) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
        },
        body: JSON.stringify(model)
    }

    await apiDataFetch(`${uri}/constructor/update/${useRouter().currentRoute.value.query.id}`, options)
        .then(res => res.json())
        .then(async res => {
            await PushNotification(res.message)

            setTimeout(() => {
                location.reload();
            }, 3000);

            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        })
}

export default { EditorPublish }