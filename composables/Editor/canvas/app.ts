import type { Editor } from "grapesjs";
import { translation } from "../i18n/locales";

export async function canvas(editor: Editor) {

    // Translating the editor settings.
    editor.I18n.setMessages(translation)
    editor.I18n.setLocale('ru');
}