import type { Editor } from "grapesjs";
import { eventPanel } from "../generator/panels";
import { translation } from "../i18n/locales";
import { buttonPublishHandler } from "../config/publish";

export async function canvas(editor: Editor) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        }
    }

    eventPanel(editor);
    buttonPublishHandler(editor);
    editor.I18n.setMessages(translation)
    editor.I18n.setLocale('ru');
}