import grapesjs, { Component, Editor } from "grapesjs";
import { ref, type Ref } from 'vue'

import type { GrapesInitInterface, GrapesBlockManager } from "~/interface/Grapesjs.interface";

import { GrapesInitBlockManager } from "./Editor/managers/blocks";
import { GrapesInitPagesManager } from "./Editor/managers/pages";

import { settings } from "./Editor/types/settings";
import { config } from "./Editor/mechanism/config";

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

async function GrapesLauncher() {
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

    if (editor && typeof editor !== undefined) {
        settings(editor)
    }

    await config(editor)

    return editor
}

export default { GrapesInit }