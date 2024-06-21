import type { Editor } from "grapesjs"
import { EditorPublish } from "../../init"
import { componentsHandler } from "../managers/blocks"

async function AssetManager(editor: Editor) {
    const options = {
        method: "GET",
        headers: {
            "Content-Language": "ru-RU",
            Authorization: `${localStorage.getItem("Authorization")}`,
        }
    }

    const assets = ref([])

    try {
        await apiDataFetch(`${uri}/api/uploads`, options)
            .then(response => response.json())
            .then(response => {
                response.data.uploads.forEach((item: any, index: number) => {
                    const asset = {
                        type: item.type ? item.type : "image",
                        src: item.url,
                        width: 100,
                        height: 100,
                        name: item.origin,
                    }

                    assets.value.push(asset as never)
                })
            })

    } catch (err) {
        alert(err)
    }

    await editor.AssetManager.add(assets.value)
    return assets.value
}

export async function buildEditor(editor: Editor) {
    const query = {
        type: "popular",
        value: "*"
    }

    try {
        await apiDataFetch(`${uri}/api/pages/test-stranitsa?${query.type}=${query.value}`, {
            ...customHeaders("GET"),
        })
            .then(response => response.json())
            .then(async response => {
                const data = response
                const assets = await AssetManager(editor)

                editor.setComponents(data.sections)
                editor.Css.addRules(data.css)
                editor.Assets.add(assets)
            })
    }
    catch (err) {
        console.log(err)
    }
}

function buttonPublishHandler(editor: Editor) {
    const button = document.querySelector(".frame.publish")

    button?.addEventListener("click", async () => {
        const components = editor.getComponents().toJSON()

        if (components.length === 0) return alert("You can't publish empty page!")

        return new EditorPublish(editor).sync()
        // await publish(element)
    })
}

export function extraction(editor: Editor) {
    const container = editor as Editor
    const params = {
        html: container.getHtml(),
        css: container.getCss(),
        js: container.getJs()
    }

    return params
}

export async function runtime(editor: Editor) {
    await buildEditor(editor)
    componentsHandler(editor)
    buttonPublishHandler(editor)
}