import grapesjs, { Component, Editor } from "grapesjs";
import { ref, type Ref } from 'vue'
import type { GrapesInitInterface, GrapesBlockManager } from "~/interface/Grapesjs.interface";
import { PORT, USER_FETCH_HOST } from "./Exports";

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


async function GrapesInitBlockManager() {
    (component.value as any).blockManager = {
        appendTo: '.insert-cards',
        blocks: []
    }

    const options = {
        ...ParamsInit('GET')
    }

    await apiDataFetch(`${USER_FETCH_HOST}${PORT}/api/blocks`, options)
        .then(response => response.json())
        .then(response => {
            const data = response

            data.data.blocks.forEach((section: Object, idx: Number) => {
                (component.value as any).blockManager.blocks.push(section)
            })
        })
}


async function GrapesLauncher() {
    await GrapesInitBlockManager();
    const container = grapesjs.init(component.value as any)
    return container
}


// Generate HTML on initialization of all elements
function generateHTML(editor: Editor) {
    const insertions = editor.BlockManager.getAllVisible()

    const list = ref([Array<GrapesBlockManager>])

    insertions.forEach(insertion => {
        list.value.push(insertion.toJSON())
    })

    return list.value
}

function GrapesComponentHook(model: any) {
    console.log('Global hook: component:create', (model as any).toJSON())
}

function HookActivity(editor: Editor) {
    editor.on(`component:create`, model => {
        GrapesComponentHook(model)
    });
}

// Initialize the parameters for the Grapejs API
export async function GrapesInit() {
    const editor = await GrapesLauncher();

    if (editor && typeof editor !== undefined) {
        HookActivity(editor)
    }


    return editor
}

export default { GrapesInit }