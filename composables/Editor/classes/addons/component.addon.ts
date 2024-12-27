import type { Editor } from "grapesjs";

class ComponentsAddons {
    constructor(private editor: Editor) {
        this.editor = editor;
        new ComponentHandlerMods(this.editor).init();
    }
}

class ComponentHandlerMods {
    constructor(private editor: Editor) {
        this.editor = editor;
    }

    async init() {
        const children = document?.querySelectorAll(".project-components .components-card");
        for (let index = 0; index < children.length; index++) {
            await children[index].addEventListener("click", async () => {
                const html = children[index].getAttribute("data-html") as string;

                const selected = this.editor.getSelected();
                if (selected) {
                    selected.append(html);
                    this.toggle();
                    return;
                }

                await this.editor.addComponents(html);
                this.toggle();
            })
        }

    }

    toggle() {
        const projectComponents = document.querySelector(".project-components");
        projectComponents?.classList.toggle("active");
    }

}

export default ComponentsAddons;