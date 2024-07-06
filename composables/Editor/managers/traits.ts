import Swiper from "~/plugins/swiper/swiper";
import type { SwiperInterface } from "../interface/swiper";
import type { DomTraitsInterface, TraitManagerInterface, TraitsManagerHandler } from "../interface/traits";
import type { Editor } from "grapesjs";
import { SwiperConfiguration } from "../config/swiper";

export function DomComponentTrait(options: DomTraitsInterface) {
    return {
        isComponent: (element: { classList: { contains: (arg: string) => any; }; }) => element?.classList?.contains(options.type),
        model: {
            defaults: {
                traits: [TraitsModelHandler(options)]
            }
        }
    }
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

function TraitsModelHandler(parameters: DomTraitsInterface) {
    const options = {
        type: parameters.type,
        name: parameters.name,
        label: parameters.label
    }

    return options
}

export class TraitsHandler implements TraitsManagerHandler {
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

    async onEvent({ elInput, component, params }: { elInput: HTMLElement, component: any, params: SwiperInterface }) {
        await SwiperConfiguration(elInput, params, this.editor)
        
    }

    onUpdate({ elInput, component }: { elInput: HTMLElement, component: any }): void | null {
        elInput.setAttribute("data-set", "true");
        return null;
    }

}