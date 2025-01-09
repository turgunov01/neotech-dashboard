import type { Editor } from "grapesjs";

import PlusAddon from "./addons/plus.addon";
import PanelsMods from "./addons/panels.addon";
import ButtonMods from "./addons/button.addon";
import ComponentsAddons from "./addons/component.addon";


class Runner {
    constructor(private editor: Editor) {
        this.editor = editor;
        this.up();
    }

    async up() {
        await new PlusAddon(this.editor).activate();
        await new ButtonMods(this.editor);
        await setTimeout(async () => {
            await new PanelsMods(this.editor);
            await new ComponentsAddons(this.editor);
        }, 300);
    }
}

export default Runner;