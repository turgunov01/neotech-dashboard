import type { GrapesInitInterface } from "~/interface/Grapesjs.interface"
import { apiDataFetch } from "#imports"
import { GrapesInitAssetManager } from "./assets"

async function GrapesInitBlockLabels() {
    const options = {
        ...ParamsInit("GET")
    }

    await apiDataFetch(`${uri}/api/uploads`, options)
        .then(res => res.json())
        .then(res => {
            return res
        })
}

export async function GrapesInitBlockManager(component: GrapesInitInterface) {
    (component as any).blockManager = {
        appendTo: '.insert-cards',
        blocks: []
    }

    const options = {
        ...ParamsInit('GET')
    }

    await GrapesInitBlockLabels()
        .then(async () => {
            await apiDataFetch(`${uri}/api/blocks`, options)
                .then(response => response.json())
                .then(async response => {
                    const data = response

                    FilterBlocksSettings(data, component)
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