import type { Editor } from "grapesjs"
import { buttonPublishHandler } from "../events/publish";
import { translation } from "../i18n/locales"
import { buildEditor } from "../build/app";

export async function run(editor: Editor) {
    await buildEditor(editor)
    buttonPublishHandler(editor)
    editor.I18n.setMessages(translation)
    editor.I18n.setLocale('ru');
}
