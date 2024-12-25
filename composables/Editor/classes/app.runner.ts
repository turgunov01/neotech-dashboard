import type { Editor } from "grapesjs";

import PlusAddon from "./mods/plus.mods";
import PanelsMods from "./mods/panels.mods";
import ButtonMods from "./mods/button.mods";
import ComponentsAddons from "./mods/component.mods";


class Runner {
    constructor(private editor: Editor) {
        this.editor = editor;
        this.up();
    }

    async up() {
        await new PlusAddon(this.editor).activate();
        await new PanelsMods(this.editor);
        await new ButtonMods(this.editor);
        await new ComponentsAddons(this.editor);
    }
}

export default Runner;