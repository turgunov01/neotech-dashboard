import grapesjs, { Editor } from "grapesjs";

import { run } from "./Editor/config/run";
import { translation } from "./Editor/i18n/locales";

import type { GrapesInitInterface } from "~/interface/grapejs";

export class EditorApp {
    [variable: string]: any;

    constructor(component: any) {
        this.component = component as GrapesInitInterface;
        this.options = {
            method: "GET",
            headers: {
                "Content-Language": "ru-RU",
                Authorization: `${localStorage.getItem("Authorization")}`,
            }
        };
        // this.plugin = {} as DomTraitsInterface;
    }

    translate(editor: any) {
        this.editor = editor
        this.translations = translation

        return this.editor.I18n.setMessages(this.translations)
    }

    async buildEditor(/* plugin: any */) {
        const container = await grapesjs.init(this.component)
        await this.translate(container)
        await run(container);

        // this.setPlugin(plugin as DomTraitsInterface)
    }

    // setPlugin(plugin: any) {
    //     if (Array.isArray(plugin)) {
    //         plugin.forEach((element, index) => {
    //             this.component.plugins.push(plugin)
    //         });
    //     } else {
    //         this.component.plugins.push(plugin);
    //     }

    //     console.log(this.component)
    // }

    // public plugins() {
    //     return new Plugins(this.component).init(this.plugin)
    // }
}