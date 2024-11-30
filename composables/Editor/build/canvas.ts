import type { Editor } from "grapesjs";
import { FailedAlert } from "~/composables/Notification/list";
import { eventPanel } from "../generator/panels";
import { translation } from "../i18n/locales";
import { buttonPublishHandler } from "../config/publish";
import { buildEditor } from "./app";

export async function canvas(editor: Editor) {
    buildEditor(editor)
    eventPanel(editor);
    buttonPublishHandler(editor);
    editor.I18n.setMessages(translation)
    editor.I18n.setLocale('ru');
}