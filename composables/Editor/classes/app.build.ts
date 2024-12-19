import grapesjs from "grapesjs";

import type { GrapesInitInterface } from "~/interface/grapejs";
import { canvas } from "../build/canvas";

export class EditorApp {
    [variable: string]: any;

    constructor(component: any) {
        this.component = component as GrapesInitInterface;
        this.buildEditor();
    }

    async buildEditor() {
        const container = await grapesjs.init(this.component);
        await canvas(container);

        const wrapper = container.getWrapper()
        wrapper?.addStyle({ 'overflow': 'hidden' })
    }
}