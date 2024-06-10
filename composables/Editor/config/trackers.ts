import type { Asset, Editor } from "grapesjs";

export function componentConfig(editor: Editor) {
    editor.on("component:create", async (model: Object) => {
        const content = ref({})

        const type = {
            action: "component:create",
            whatis: "component",
            page: "test"
        }
        console.log("Component action: create")

    })

    editor.on("component:remove", async (model: Object) => {
        const type = {
            action: "component:remove",
            whatis: "component",
            page: "test"
        }
        console.log("Component action: remove")
    })

    editor.on("component:clone", async (model: Object) => {
        const type = {
            action: "component:clone",
            whatis: "component",
            page: "test"
        }
        console.log("Component action: clone+create")
    })
}

export function assetConfig(editor: Editor) {
    editor.on("asset:add", async (asset: Asset) => {
        // console.log(asset.toJSON())
    })
}