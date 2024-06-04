import grapesjs, { Editor } from "grapesjs";

import { ref, type Ref } from 'vue'

import type { GrapesInitInterface } from "~/interface/Grapesjs.interface";

import { GrapesInitBlockManager } from "./Editor/managers/blocks";
import { GrapesInitPagesManager } from "./Editor/managers/pages";

import { runtime } from "./Editor/config/runtime";

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

export async function GrapesLauncher() {
    await GrapesInitBlockManager(component.value);

    (component.value as any).pageManager = {
        pages: []
    }

    if ((component.value as any).pageManager.pages) {
        GrapesInitPagesManager((component.value as any).pageManager.pages)
    }

    const container = grapesjs.init(component.value as any)
    return container
}



// Initialize the parameters for the Grapejs API
export async function GrapesInit() {
    const editor = await GrapesLauncher();

    await runtime(editor)
    return editor
}



export default { GrapesInit }