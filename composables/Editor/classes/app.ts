import grapesjs from "grapesjs";

import { run } from "../config/run";

import type { GrapesInitInterface } from "~/interface/grapejs";

export class EditorApp {
    [variable: string]: any;

    constructor(component: any) {
        this.component = component as GrapesInitInterface;
        this.options = {
            method: "GET",
            headers: {
                "Content-Language": "ru-RU",
                Authorization: `${sessionStorage.getItem("Authorization")}`,
            }
        };
    }

    async buildEditor() {
        const container = await grapesjs.init(this.component);
        await run(container);

        const wrapper = container.getWrapper()
        wrapper?.addStyle({ 'overflow': 'hidden' })
    }
}