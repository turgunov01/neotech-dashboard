import grapesjs, { Component, Editor } from "grapesjs";
import { ref, type Ref } from 'vue'
import type { GrapesInitInterface, GrapesBlockManager } from "~/interface/Grapesjs.interface";
import { HookActivity } from "./Editor/hooks/init";
import { GrapesInitBlockManager } from "./Editor/managers/block.init";
import { settings } from "./Editor/types/settings";

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
    const container = grapesjs.init(component.value as any)
    return container
}


// Initialize the parameters for the Grapejs API
export async function GrapesInit() {
    const editor = await GrapesLauncher();

    if (editor && typeof editor !== undefined) {
        HookActivity(editor)
        settings(editor)
    }


    return editor
}

export default { GrapesInit }