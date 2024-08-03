import { ref } from 'vue'

import { EditorApp } from "./init";
// import Swiper from '~/plugins/swiper/swiper';
import type { GrapesInitInterface } from '~/interface/grapejs';
import { Plugins } from './Editor/managers/plugins';

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
    (component.value as any).blockManager = {
        appendTo: '.insert-cards',
        blocks: []
    }

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        }
    }

    await apiDataFetch(`${uri}/components/templates`, options)
        .then(response => response.json())
        .then(response => {
            const data = response;



            (data as Response | any).forEach((block: Object) => {
                (component.value as any).blockManager.blocks.push(block);
            });

            (component.value as any).blockManager.blocks.push(object);
        })

    const editor = new EditorApp(component.value).buildEditor();
    return editor;
}


export default { init }