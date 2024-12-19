import type { Editor } from "grapesjs";

class ComponentHandlerMods {
    constructor(private editor: Editor) {
        this.editor = editor;
        this.init();
    }

    async init() {
        const children = document?.querySelectorAll(".components-card");

        for (const element of children) {
            element.addEventListener("click", () => {
                const html = element.getAttribute("data-html");

                this.editor.addComponents(html as string);
                this.toggle();
            })
        }

    }

    toggle() {
        const projectComponents = document.querySelector(".project-components");
        projectComponents?.classList.toggle("active");
    }
}

export default ComponentHandlerMods;