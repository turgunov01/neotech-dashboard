import grapesjs, { Editor } from "grapesjs";

import { ref, type Ref } from 'vue'

import type { GrapesInitInterface } from "~/interface/Grapesjs.interface";

import { GrapesInitBlockManager } from "./Editor/managers/blocks";

import { runtime } from "./Editor/config/runtime";

import { PanelManager } from "./Editor/managers/panels";
import { locales } from "./Editor/config/locales";

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

    const container = grapesjs.init(component.value as any)
    return container
}


// Initialize the parameters for the Grapejs API
export async function GrapesInit() {
    const editor = await GrapesLauncher() as Editor;

    // Locale
    locales(editor)

    await runtime(editor)
    return editor
}



export default { GrapesInit }