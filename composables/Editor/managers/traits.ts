// import Swiper from "~/plugins/swiper/swiper";
import type { DomTraitsInterface, FormManagerHandler, TraitManagerInterface } from "../interface/traits";
import type { Editor } from "grapesjs";


export function SwiperDomTrait(options: DomTraitsInterface) {
    return {
        isComponent: (element: { classList: { contains: (arg: string) => any; }; tagName: { includes: (arg: string) => any } }) => element?.classList?.contains(options.type),
        model: {
            defaults: {
                traits: [TraitsModelHandler(options)]
            }
        }
    }
}

export function FormDomTrait(options: TraitManagerInterface) {
    return {
        isComponent: (element: { tagName: string, classList: any }) => element.tagName === "FORM",
        model: {
            defaults: {
                traits: [TraitsModelHandler(options)]
            }
        }
    }
}

function TraitsModelHandler(parameters: any) {
    const options = {
        ...parameters
    }

    return options
}

export function createElement(options: TraitManagerInterface) {
    const el = document.createElement("div");
    el.innerHTML = options.label

    el.classList.add("swiper-trait")

    for (const key in options.style) {
        if (Object.prototype.hasOwnProperty.call(options.style, key)) {
            el.style[key as any] = options.style[key as never];
        }
    }

    return el
}

export class FormTraitsHandler implements FormManagerHandler {
    private options: TraitManagerInterface;
    private editor: Editor;

    constructor(options: TraitManagerInterface, editor: Editor) {
        this.options = options;
        this.editor = editor as Editor;
    }

    createInput({ trait }: { trait: any }): HTMLElement | string {
        const element = createElement(this.options)

        return element
    }

    onEvent({ elInput, component }: { elInput: HTMLElement, component: any }) {
        const frame = document.querySelector(".gjs-frame") as HTMLIFrameElement;
        const selected = frame?.contentDocument?.querySelector(".gjs-selected") as HTMLIFrameElement;

        const element = this.editor.Components.getById(selected.id)
        element.setAttributes({ 'action': `${uri}/api/messages`, 'method': "POST", 'enctype': "application/json", id: selected.id, class: `form-${selected.id}` })
    }

    onUpdate({ elInput, component }: { elInput: HTMLElement, component: any }): void | null {

    }
}
