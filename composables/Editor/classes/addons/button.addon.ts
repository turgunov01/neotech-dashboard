import type { Editor } from "grapesjs";
import { Publish } from "../app.publish";

class ButtonMods {
    constructor(private editor: Editor) {
        this.editor = editor;
        setTimeout(() => {
            this.publish();
            this.save();
        }, 100);
    }

    publish() {
        const button = document.querySelector(".projects-header-button.publish");

        if (!button) return;

        const handler = async () => {
            const components = this.editor.getComponents().toJSON();

            if (components.length === 0) {
                alert("You can't publish an empty page!");
            } else {
                new Publish(this.editor).publish();
            }

            button.removeEventListener("click", handler);
        };

        button.addEventListener("click", handler);
    }

    save() {
        const button = document.querySelector(".projects-header-button.save");

        if (!button) return;

        const handler = async () => {
            const components = this.editor.getComponents().toJSON();

            if (components.length === 0) {
                alert("You can't save an empty page!");
            } else {
                new Publish(this.editor).save();
            }

            button.removeEventListener("click", handler);
        };

        button.addEventListener("click", handler);
    }

}

export default ButtonMods;