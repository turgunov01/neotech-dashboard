import type { Editor } from "grapesjs";
import { publish } from "../../events/publish";

class ButtonMods {
    constructor(private editor: Editor) {
        this.editor = editor;
        this.init();
    }

    init() {
        const button = document.querySelector(".frame.publish")

        button?.addEventListener("click", async () => {
            const components = this.editor.getComponents().toJSON()

            if (components.length === 0) return alert("You can't publish empty page!")

            publish(this.editor);
        })
    }
}

export default ButtonMods;