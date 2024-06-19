import grapesjs, { Editor } from "grapesjs";

import type { GrapesInitInterface } from "~/interface/Grapesjs.interface";
import { runtime } from "./Editor/config/runtime";
import { translation } from "./Editor/config/locales";
import type { GlobalInterface } from "~/interface/global/global.interfaces";
import { cyrb53 } from "~/composables/cipher-53/cybr-54";

import { publish } from "./Editor/methods/publish";

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
        }
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
    }
}

export class EditorPublish extends EditorApp {
    [variable: string]: any;

    constructor(editor: Editor) {
        super(editor)
        const resolvedHtml = editor.getHtml()
        const resolvedCss = editor.getCss()

        const element: GlobalInterface = {
            name: "test-stranitsa",
            html: resolvedHtml,
            css: (resolvedCss as string),
            sections: editor.getComponents() as any,
            cipher: cyrb53(resolvedHtml).toString(),
        }

        this.element = element
    }

    sync() {
        publish(this.element)
    }
}