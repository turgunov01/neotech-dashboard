import type { Editor } from "grapesjs";

import { ButtonPluginsHandler } from "./labels";

export function Plugins(editor: Editor) {
    const arr = [ButtonPluginsHandler(editor)]
    return arr
};
