import type { Editor } from "grapesjs";
import type { FormInterface } from "~/composables/Editor/interface/form";

export class FormHandler {
    private form: string;
    private editor: Editor | any;

    private element: HTMLFormElement;
    private params: FormInterface;

    constructor(form: string, params: FormInterface) {
        this.form = form;
        this.element = document.querySelector(this.form) as HTMLFormElement;
        this.params = params;
    }

    callback(editor: Editor) {
        this.editor = editor;

        // Launch methods in private session

    }

    public setBUtton() {
        const button = this.element.querySelector("button")

        button?.classList.add(`${this.form}-${button.id}`);
        console.log(button?.classList)
    }
}