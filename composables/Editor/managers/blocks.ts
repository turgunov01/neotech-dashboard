import type { GrapesInitInterface } from "~/interface/Grapesjs.interface"
import { apiDataFetch } from "#imports"
import type { Editor } from "grapesjs"

async function GrapesInitBlockLabels() {

}

export async function labels(component: GrapesInitInterface) {
    (component as any).blockManager = {
        appendTo: '.insert-cards',
        blocks: []
    }

    await apiDataFetch(`${uri}/api/uploads`, { ...customHeaders("GET") })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .then(async () => {
            await apiDataFetch(`${uri}/api/blocks`, { ...customHeaders("GET") })
                .then(response => response.json())
                .then(async response => {
                    const data = response

                    await FilterBlocksSettings(data, component)

                })
        })
}

export async function FilterBlocksSettings(data: Response, component: any) {
    const storedId = await getStoreData("init_filter")

    if (!storedId) {
        await storeData('init_filter', 0)
    }

    (data as Response | any).forEach((block: Object) => {
        (component as any).blockManager.blocks.push(block)
    })
}

export async function componentsHandler(editor: Editor) {
    const blocks = ref([])

    const options = customHeaders("GET")

    await apiDataFetch(`${uri}/api/templates`, options)
        .then(response => response.json())
        .then(response => {
            editor.Panels.addButton('open-blocks', {
                id: 'open-blocks',
                className: 'fa fa-th-large',
                label: 'Blocks',
                command: 'open-blocks',
                attributes: {
                    title: 'Blocks',
                },
            })

            console.log(editor.Panels.getPanel("views"))
        })

}