import { ref } from 'vue'

import { labels } from "./Editor/managers/blocks";
import { EditorApp } from "./init";
// import Swiper from '~/plugins/swiper/swiper';
import type { GrapesInitInterface } from '~/interface/grapejs';
import { Plugins } from './Editor/managers/plugins';

const component = ref({
    container: '#gjs',
    fromElement: true,
    height: '100%',
    width: '100%',
    storageManager: false,
    panels: {
        default: []
    },
    plugins: [Plugins]
} as GrapesInitInterface)



// Initialize the parameters for the Grapejs API
export async function init() {
    await labels(component.value);

    const editor = await new EditorApp(component.value).buildEditor();

    return editor;
}


export default { init }