import { ref } from 'vue'

import { EditorApp } from "./init";
// import Swiper from '~/plugins/swiper/swiper';
import type { GrapesInitInterface } from '~/interface/grapejs';
import { Plugins } from './Editor/managers/plugins';
import { getLabels } from './Editor/managers/blocks';

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
} as GrapesInitInterface)

const object = {
    id: 11,
    tagName: 'section',
    label: `<p>Test</p>`,
    removable: true,
    draggable: true,
    copyable: true,
    content: `<p>Test</p>`,
    style: {},
    attributes: {},
    javascript: [],
    category: 'Шаблоны'
}

// Initialize the parameters for the Grapejs API
export async function init() {
    await getLabels(component.value);

    const editor = new EditorApp(component.value).buildEditor();
    return editor;
}


export default { init }