import grapesjs, { Component, Editor, type EditorConfig } from "grapesjs";
import { ref, type Ref } from 'vue'

import type { GrapesInitInterface, GrapesBlockManager } from "~/interface/Grapesjs.interface";

import { GrapesInitBlockManager } from "./Editor/managers/blocks";
import { GrapesInitPagesManager } from "./Editor/managers/pages";

import { settings } from "./Editor/types/settings";
import { config } from "./Editor/mechanism/config";
import { cyrb53 } from "./cybr/cybr-54";
import { buildEditor, publish } from "./Editor/callbacks/on:publish";
import type { GlobalAttributesInterface, GlobalInterface } from "~/interface/html/global.interfaces";
import { pendingLaunch } from "./Editor/config/runtime";

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

    await pendingLaunch(editor)


    return editor
}

export function buttonPublishHandler(editor: Editor) {
    const button = document.querySelector(".frame.publish")

    button?.addEventListener("click", async () => {
        const resolvedHtml = editor.getHtml()
        const resolvedCss = editor.getCss()

        const element: GlobalInterface = {
            name: "test-stranitsa",
            html: resolvedHtml,
            css: (resolvedCss as string),
            sections: editor.getComponents() as any,
            cipher: cyrb53(resolvedHtml).toString()
        }

        const components = editor.getComponents().toJSON()

        if (components.length === 0) return alert("You can't publish empty page!")
        publish(element)
    })
}



export default { GrapesInit }