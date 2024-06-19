import { ref, type Ref } from 'vue'

import type { GrapesInitInterface } from "~/interface/Grapesjs.interface";

import { labels } from "./Editor/managers/blocks";
import { EditorApp } from "./init";

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


// Initialize the parameters for the Grapejs API
export async function init() {
    await labels(component.value);
    const editor = new EditorApp(component.value).buildEditor();
    return editor
}


export default { init }