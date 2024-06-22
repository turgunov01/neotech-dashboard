import grapesjs, { Component, Editor } from "grapesjs";

import { runtime } from "./Editor/config/runtime";
import { translation } from "./Editor/config/locales";
import type { GlobalInterface } from "~/interface/global/global.interfaces";

import type { GrapesInitInterface } from "~/interface/grapejs";
import type { TraitsInterface } from "./Editor/interface/traits";

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
        await runtime(container);

        this.editor.on("component:selected", (model: Component) => {
            console.log(model.getTraits()[0].toJSON())
        })
    }
}



