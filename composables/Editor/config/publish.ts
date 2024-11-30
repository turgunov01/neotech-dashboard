import type { Editor } from "grapesjs";
import { publish } from "../events/publish";

export function buttonPublishHandler(editor: Editor) {
    const button = document.querySelector(".frame.publish")

    button?.addEventListener("click", async () => {
        const components = editor.getComponents().toJSON()

        if (components.length === 0) return alert("You can't publish empty page!")

        publish(editor);
    })
}