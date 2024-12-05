import type { Editor } from "grapesjs";
import { plusButtonConfig } from "../config/components";

function toggle() {
    const component = document.querySelector(".project-components") as HTMLElement;
    const container = component.querySelector(".container") as HTMLElement;

    component.classList.add('active');

    container.onmouseenter = () => {
        component.classList.add('logged');
    }

    container.onmouseleave = () => {
        component.classList.remove('logged');
    }

    component.onclick = (e: any) => {
        if (e.target.classList.contains('project-components')) {
            component.classList.remove('active');
        }
    }
}

class Calculate {
    private _editor: Editor;

    constructor(editor: Editor) {
        this._editor = editor;
    }

    activate() {
        const container = this._editor.Canvas.getDocument().querySelector(".container");

        const plusButton = document.createElement("div");

        for (const key in plusButtonConfig) {
            if (Object.prototype.hasOwnProperty.call(plusButtonConfig, key)) {
                const value = plusButtonConfig[key as never] as string;
                plusButton.style[key as any] = value;
            }
        }

        plusButton.textContent = "+";
        plusButton.style.pointerEvents = "auto";
        plusButton.style.position = "absolute";
        plusButton.style.display = "none";
        container?.append(plusButton);

        const positionButtonAtBottom = () => {
            const rect = (container as any).getBoundingClientRect();
            const horizontalMiddle = rect.left + rect.width / 2;

            plusButton.style.left = `${horizontalMiddle - 16}px`;
            plusButton.style.top = `${rect.bottom - 16}px`;
            plusButton.style.display = "flex";
        };


        (container as any)?.addEventListener("mouseenter", () => {
            positionButtonAtBottom();
        });

        (container as any)?.addEventListener("mouseleave", () => {
            plusButton.style.display = "none";
        });

        const projects = document.querySelector(".project-components");
        const projectComponents = projects?.querySelector(".container");

        plusButton.addEventListener("click", () => {
            projects?.classList.toggle("active");
        })

        projectComponents?.addEventListener("mouseenter", () => {
            projects?.classList.add("logged")
        })

        projectComponents?.addEventListener("mouseleave", () => {
            projects?.classList.remove("logged")
        })


    }





}

export default Calculate;