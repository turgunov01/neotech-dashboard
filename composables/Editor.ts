import grapesjs, { Component, Editor, type EditorConfig } from "grapesjs";
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

export async function GrapesLauncher() {
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
    await buttonEventHandler(editor)

    return editor
}

export function buttonEventHandler(editor: Editor) {
    const button = document.querySelector(".frame.publish")

    button?.addEventListener("click", async () => {
        const resolvedHtml = editor.getHtml()
        const resolvedCss = editor.getCss()

        const components = editor.getComponents().toJSON()

        console.log(components)
        return

        try {
            await apiDataFetch(`${uri}/api/pages`, {
                ...ParamsInit("POST"),
                body: JSON.stringify({
                    name: "тест-страница",
                    html: resolvedHtml,
                    css: resolvedCss
                })
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                })
        }
        catch (err) {
            console.log(err)
        }
    })
}

export function getComponents(editor: Editor) {
    const html = editor.getHtml()
    return html
}

export default { GrapesInit }