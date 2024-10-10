import { ref } from 'vue'

import { EditorApp } from "./init";
import type { GrapesInitInterface } from '~/interface/grapejs';
import { Plugins } from './Editor/managers/plugins';
import { getLabels } from './Editor/managers/blocks';
import type { EditorConfig } from 'grapesjs';

export const component = ref({
    container: '#gjs',
    fromElement: true,
    height: '100%',
    width: '100%',
    storageManager: false,
    panels: {
        default: []
    },
    plugins: [Plugins],
    canvas: {
        scripts: [
            "https://unpkg.com/swiper/swiper-bundle.min.js"
        ],
        styles: [
            'https://unpkg.com/swiper/swiper-bundle.min.css'
        ]
    },
    allowScripts: true,
} as EditorConfig)


// Initialize the parameters for the Grapejs API
export async function init() {
    await getLabels(component.value);

    const editor = new EditorApp(component.value).buildEditor();
    return editor;
}


export default { init }