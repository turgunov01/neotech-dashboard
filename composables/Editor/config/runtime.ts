import type { Editor } from "grapesjs"
import { config } from "../mechanism/config"
import type { GlobalInterface } from "~/interface/html/global.interfaces"
import { cyrb53 } from "~/composables/cybr/cybr-54"
import { publish } from "../callbacks/on:publish"

export function buttonPublishHandler(editor: Editor) {
    const button = document.querySelector(".frame.publish")

    button?.addEventListener("click", async () => {
        const resolvedHtml = editor.getHtml()
        const resolvedCss = editor.getCss()

        const element: GlobalInterface = {
            name: "test-stranitsa",
            html: resolvedHtml,
            css: (resolvedCss as string),
            sections: editor.getComponents() as any,
            cipher: cyrb53(resolvedHtml).toString()
        }

        const components = editor.getComponents().toJSON()

        if (components.length === 0) return alert("You can't publish empty page!")
        publish(element)
    })
}

export async function buildEditor(editor: Editor) {
    const query = {
        type: "popular",
        value: "*"
    }

    try {
        await apiDataFetch(`${uri}/api/pages/test-stranitsa?${query.type}=${query.value}`, {
            ...ParamsInit("GET"),
        })
            .then(response => response.json())
            .then(response => {
                const data = response

                editor.setComponents(data.sections)
            })
    }
    catch (err) {
        console.log(err)
    }
}

export async function runtime(editor: Editor) {
    await config(editor)
    await buildEditor(editor)
    buttonPublishHandler(editor)
}