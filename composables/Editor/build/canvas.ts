import type { Editor } from "grapesjs";

import { translation } from "../i18n/locales";
import { buildEditor } from "./app";
import Runner from "../classes/app.runner";

export async function canvas(editor: Editor) {
    // canvas builder is running
    await buildEditor(editor);

    editor.I18n.setMessages(translation)
    editor.I18n.setLocale('ru');
}