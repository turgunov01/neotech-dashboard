import { setActivityMiddleware } from "~/middleware/history.activity";
import { publish } from "../events/publish";
import type { Editor } from "grapesjs";
import { extract } from "../events/extract";

export class Publish {
    [variable: string]: any;

    constructor(editor: Editor) {
        this.editor = editor as Editor;

        const element = {
            name: $router.query.id as string,
            html: (extract(editor) as any).html,
            css: (extract(editor) as any).css as string,
            sections: editor.getComponents() as any,
        }

        this.element = element;
    }

    sync() {
        setActivityMiddleware(`Опубликовал страницу с конструктора`, `constructor_published`);
        publish(this.element)
    }
}