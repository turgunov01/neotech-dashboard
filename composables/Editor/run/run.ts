import type { Editor } from "grapesjs";
import { translation } from "../i18n/locales";
import { buttonPublishHandler } from "../config/publish";
import { buildEditor } from "../build/app";

export async function canvas(editor: Editor) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        }
    }

    buttonPublishHandler(editor);
    editor.I18n.setMessages(translation)
    editor.I18n.setLocale('ru');
}