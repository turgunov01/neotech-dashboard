import type { GrapesInitInterface } from "~/interface/Grapesjs.interface"
import { apiDataFetch } from "#imports"

export async function GrapesInitBlockManager(component: GrapesInitInterface) {
    (component as any).blockManager = {
        appendTo: '.insert-cards',
        blocks: []
    }

    const options = {
        ...ParamsInit('GET')
    }

    await apiDataFetch(`${uri}/api/blocks`, options)
        .then(response => response.json())
        .then(response => {
            const data = response

            data.data.blocks.forEach((section: Object, idx: Number) => {
                (component as any).blockManager.blocks.push(section)
            })
        })
}