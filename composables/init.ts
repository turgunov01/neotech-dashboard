import grapesjs from "grapesjs";

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
    }

    translate(editor: any) {
        this.editor = editor
        this.translations = translation

        return this.editor.I18n.setMessages(this.translations)
    }

    get components() {
        return this.component
    }

    async buildEditor() {
        const container = await grapesjs.init(this.component)
        await this.translate(container)
        await run(container);
    }
}