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
        // const container = this._editor.Canvas.getDocument().querySelector(".container");

        // const plusButton = document.createElement("div");

        // for (const key in plusButtonConfig) {
        //     if (Object.prototype.hasOwnProperty.call(plusButtonConfig, key)) {
        //         const value = plusButtonConfig[key as never] as string;
        //         plusButton.style[key as any] = value;
        //     }
        // }

        // plusButton.textContent = "+";
        // plusButton.style.pointerEvents = "auto";
        // plusButton.style.position = "absolute";
        // plusButton.style.display = "none";
        // container?.appendChild(plusButton);

        // let hoveredBlock: HTMLElement | null = null;
        // let currentPosition: "top" | "bottom" | "left" | "right" | null = null;

        // const threshold = 20; // Buffer zone for less sensitivity
        // const repositionButton = (block: HTMLElement, mouseX: number, mouseY: number) => {
        //     const rect = block.getBoundingClientRect();
        //     const verticalMiddle = rect.top + rect.height / 2;
        //     const horizontalMiddle = rect.left + rect.width / 2;

        //     // Determine the new position based on mouse proximity
        //     let newPosition: "top" | "bottom" | "left" | "right";
        //     if (Math.abs(mouseY - rect.top) < threshold) {
        //         newPosition = "top";
        //     } else if (Math.abs(mouseY - rect.bottom) < threshold) {
        //         newPosition = "bottom";
        //     } else if (Math.abs(mouseX - rect.left) < threshold) {
        //         newPosition = "left";
        //     } else if (Math.abs(mouseX - rect.right) < threshold) {
        //         newPosition = "right";
        //     } else {
        //         return; // Stay in the same position if no major change
        //     }

        //     // Reposition only if the position changes
        //     if (newPosition !== currentPosition) {
        //         currentPosition = newPosition;
        //         switch (newPosition) {
        //             case "top":
        //                 plusButton.style.left = `${horizontalMiddle - 16}px`;
        //                 plusButton.style.top = `${rect.top - 16}px`;
        //                 break;
        //             case "bottom":
        //                 plusButton.style.left = `${horizontalMiddle - 16}px`;
        //                 plusButton.style.top = `${rect.bottom - 16}px`;
        //                 break;
        //             case "left":
        //                 plusButton.style.left = `${rect.left - 16}px`;
        //                 plusButton.style.top = `${verticalMiddle - 16}px`;
        //                 break;
        //             case "right":
        //                 plusButton.style.left = `${rect.right - 16}px`;
        //                 plusButton.style.top = `${verticalMiddle - 16}px`;
        //                 break;
        //         }

        //         plusButton.style.display = "flex";
        //     }
        // };

        // plusButton.addEventListener("click", () => {
        //     if (hoveredBlock) {
        //         toggle()
        //     }
        // });

        // const onMouseMove = (e: MouseEvent) => {
        //     const blocks = Array.from(container?.querySelectorAll("*") || []) as HTMLElement[];

        //     let blockFound = false;

        //     const isMouseOverPlusButton = e.clientX >= plusButton.getBoundingClientRect().left &&
        //         e.clientX <= plusButton.getBoundingClientRect().right &&
        //         e.clientY >= plusButton.getBoundingClientRect().top &&
        //         e.clientY <= plusButton.getBoundingClientRect().bottom;

        //     if (isMouseOverPlusButton) {
        //         return;
        //     }

        //     blocks.forEach((block) => {
        //         const rect = block.getBoundingClientRect();
        //         const mouseX = e.clientX;
        //         const mouseY = e.clientY;

        //         const isHovering =
        //             mouseX > rect.left &&
        //             mouseX < rect.right &&
        //             mouseY > rect.top &&
        //             mouseY < rect.bottom;

        //         if (isHovering) {
        //             blockFound = true;
        //             hoveredBlock = block;
        //             repositionButton(block, mouseX, mouseY);
        //         }
        //     });

        //     if (!blockFound) {
        //         hoveredBlock = null;
        //         currentPosition = null;
        //         plusButton.style.display = "none";
        //     }
        // };

        // (container as HTMLElement)?.addEventListener("mousemove", onMouseMove);

        // container?.addEventListener("mouseleave", () => {
        //     plusButton.style.display = "none";
        //     hoveredBlock = null;
        //     currentPosition = null;
        // });
    }





}

export default Calculate;