import type { Editor } from "grapesjs"
import { config } from "../mechanism/config"
import type { GlobalInterface } from "~/interface/global/global.interfaces"
import { cyrb53 } from "~/composables/cybr/cybr-54"
import { publish } from "../callbacks/on:publish"
import type { AssetsInterface } from "~/interface/assets.interface"

async function AssetManager(editor: Editor) {
    const options = {
        method: "GET",
        headers: {
            "Content-Language": "ru-RU",
            Authorization: `${localStorage.getItem("Authorization")}`,
        }
    }

    const assets = ref([])

    await apiDataFetch(`${uri}/api/uploads`, options)
        .then(response => response.json())
        .then(response => {
            response.data.uploads.forEach((item: any, index: number) => {
                const asset: AssetsInterface = {
                    type: item.type ? item.type : "image",
                    src: item.url,
                    width: 100,
                    height: 100,
                    name: item.origin,
                }

                assets.value.push(asset as never)
            })
        })

    return assets.value
}

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
            cipher: cyrb53(resolvedHtml).toString(),
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
                const assets = AssetManager(editor)

                editor.AssetManager.add(assets)


                editor.setComponents(data.sections)
                editor.Css.addRules(data.css)

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