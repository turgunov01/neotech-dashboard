import type { Editor } from "grapesjs";
import subComponentHandlerMods from "./subcomponent.addon";

class PlusAddon {
    private _editor: Editor;

    constructor(editor: Editor) {
        this._editor = editor;
    }

    activate() {
        const canvasDoc = this._editor.Canvas.getDocument();
        const canvasBody = canvasDoc.body;
        const button = this.createButton();

        if (!canvasBody.contains(button)) canvasBody.appendChild(button);

        let buttonActive = false;
        let currentTarget: HTMLElement | null = null;
        let currentRegion: "top" | "bottom" | null = null;

        canvasBody.addEventListener("mousemove", (event: MouseEvent) => {
            if (buttonActive) return;

            const target = event.target as HTMLElement;

            if (this.isHoverable(target)) {
                const rect = target.getBoundingClientRect();
                const canvasRect = canvasDoc.documentElement.getBoundingClientRect();
                const hoverRegion = this.getHoverRegion(event, rect);

                if (this.isInsideWrapper(target)) {
                    if (hoverRegion === "top") {
                        button.style.top = `${rect.top - canvasRect.top}px`;
                        button.style.left = `${rect.left - canvasRect.left + rect.width / 2}px`;
                        button.style.display = "flex";
                        currentTarget = target;
                        currentRegion = "top";
                    } else if (hoverRegion === "bottom") {
                        button.style.top = `${rect.bottom - canvasRect.top}px`;
                        button.style.left = `${rect.left - canvasRect.left + rect.width / 2}px`;
                        button.style.display = "flex";
                        currentTarget = target;
                        currentRegion = "bottom";
                    } else {
                        button.style.display = "none";
                        currentTarget = null;
                        currentRegion = null;
                    }
                } else {
                    button.style.display = "none";
                    currentTarget = null;
                    currentRegion = null;
                }
            } else {
                button.style.display = "none";
                currentTarget = null;
                currentRegion = null;
            }
        });

        button.addEventListener("mouseenter", () => {
            buttonActive = true;
        });

        button.addEventListener("mouseleave", () => {
            buttonActive = false;
            button.style.display = "none";
        });

        button.addEventListener("click", (e: MouseEvent) => {
            if (currentTarget && currentRegion) {
                const projectSubcomponents = document.querySelector(".project-subcomponents") as HTMLElement;
                projectSubcomponents.style["top"] = `${e.clientY / 2 + 15}px`;
                projectSubcomponents.style["left"] = `${e.clientX + button.offsetWidth + 20}px`;

                if (projectSubcomponents && !projectSubcomponents.classList.contains("active")) {
                    projectSubcomponents.classList.add("active");
                    const cards = document.querySelectorAll(".components-card") as unknown as HTMLCollection;

                    new subComponentHandlerMods(this._editor, { currentRegion: currentRegion, currentTarget: currentTarget }).init(projectSubcomponents, cards);
                }
            }
        });
    }

    private createButton(): HTMLButtonElement {
        const button = document.createElement("button");
        button.innerHTML = "+";
        button.style.position = "fixed";
        button.style.display = "none";
        button.style.zIndex = "100000";
        button.style.transform = "translate(-50%, -50%)";
        button.style.background = "#007bff";
        button.style.color = "#fff";
        button.style.border = "none";
        button.style.borderRadius = "50%";
        button.style.width = "30px";
        button.style.height = "30px";
        button.style.alignItems = "center";
        button.style.justifyContent = "center";
        button.style.cursor = "pointer";
        button.style.padding = "10px";
        button.style.transition = "all 0.75s ease-in-out";

        return button;
    }

    private isHoverable(target: HTMLElement): boolean {
        return !target.closest("button");
    }

    private isInsideWrapper(target: HTMLElement): boolean {
        const wrapper = this._editor.getWrapper()?.getEl() as any;
        return wrapper?.contains(target) && target !== wrapper && target.tagName !== "BODY";
    }

    private getHoverRegion(event: MouseEvent, rect: DOMRect): "top" | "bottom" | null {
        const { clientY } = event;
        const elementCenter = rect.top + rect.height / 2;

        if (clientY < elementCenter) return "top";
        if (clientY >= elementCenter) return "bottom";

        return null;
    }
}

export default PlusAddon;
