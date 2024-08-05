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

    async buildEditor(/* plugin: any */) {
        const container = await grapesjs.init(this.component);
        await run(container);

        const wrapper = container.getWrapper()
        wrapper?.addStyle({ 'overflow': 'hidden' })
    }
}