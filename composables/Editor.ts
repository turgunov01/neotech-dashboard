import { ref } from 'vue'

import { EditorApp } from './Editor/classes/app.build';
import { Plugins } from './Editor/plugins/app';

import { canvasProps } from './Editor/generator/scripts';
import { getLabels } from './Editor/assets/labels';


export const component = ref({
    container: '#gjs',
    fromElement: true,
    height: '100%',
    width: '100%',
    plugins: [Plugins],
    canvas: { ...canvasProps().scripts, ...canvasProps().styles },
    allowScripts: true,
})

export async function init() {
    await getLabels(component.value);

    const editor = new EditorApp(component.value);
    return editor;
}


export default { init }