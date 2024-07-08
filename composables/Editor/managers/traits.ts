import type { SwiperInterface } from "../interface/swiper";
import { SwiperConfiguration } from "../config/swiper";

import type { DomTraitsInterface, SwiperManagerHandler, TraitManagerInterface } from "../interface/traits";
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

export function FormDomTrait(options: DomTraitsInterface) {
    return {
        isComponent: (element: HTMLElement): boolean => {
            return (element as HTMLInputElement).tagName === "INPUT";
        },
        model: {
            defaults: {
                traits: [TraitsModelHandler(options)]
            }
        }
    };
}

function TraitsModelHandler(parameters: DomTraitsInterface) {
    const options = {
        type: parameters.type,
        name: parameters.name,
        label: parameters.label
    }

    return options
}

export function createSwiperElement(options: TraitManagerInterface) {
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

export class SwiperTraitsHandler implements SwiperManagerHandler {
    private options: TraitManagerInterface;
    private editor: Editor;

    constructor(options: TraitManagerInterface, editor: Editor) {
        this.options = options;
        this.editor = editor as Editor;
    }

    createInput({ trait }: { trait: any }): HTMLElement | string {
        const element = createSwiperElement(this.options)
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