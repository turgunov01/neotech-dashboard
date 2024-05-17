import grapesjs, { Component, Editor, type ComponentAdd, type EditorConfig } from "grapesjs";
import { ref, type Ref } from 'vue'
import type { GrapesInitInterface, GrapesBlockManager } from "~/interface/Grapesjs.interface";
import { PORT, USER_FETCH_HOST } from "./Exports";

const component: Ref<GrapesInitInterface> = ref({
    container: '#gjs',
    fromElement: true,
    height: '100%',
    width: '100%',
    storageManager: false,
    panels: {
        default: []
    },
})


async function GrapesInitBlockManager() {
    (component.value as any).blockManager = {
        appendTo: '.insert-cards',
        blocks: []
    }

    const options = {
        ...ParamsInit('GET')
    }

    await apiDataFetch(`${USER_FETCH_HOST}${PORT}/api/blocks`, options)
        .then(response => response.json())
        .then(response => {
            const data = response

            data.data.blocks.forEach((section: Object, idx: Number) => {
                (component.value as any).blockManager.blocks.push(section)
            })
        })
}


async function GrapesLauncher() {
    await GrapesInitBlockManager();
    const editor = grapesjs.init(component.value as any)
}

export async function GrapesInit() {
    await GrapesLauncher();
}

export default { GrapesInit }