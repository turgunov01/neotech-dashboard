import Swiper from "~/plugins/swiper/swiper";
import type { DomTraitsInterface, TraitsElementInterface } from "../interface/traits";
import { TraitsModelHandler } from "../model/traits/traits";
import { modelEvent, selectElement } from "../model/traits/events";
import type { SwiperInterface } from "../interface/swiper";
import type { Editor } from "grapesjs";

export function TraitDomComponent(options: DomTraitsInterface) {
    return {
        isComponent: (element: { classList: { contains: (arg: string) => any; }; }) => element?.classList?.contains(`.${options.name}`),
        model: {
            defaults: {
                traits: TraitsModelHandler(options)
            }
        }
    }
}

export function createElement(options: TraitsElementInterface) {
    const el = document.createElement(options.init.type)

    el.classList.add(options.init.class || "swiper-trait")

    el.innerHTML = options.init.label

    for (const key in options.init.style) {
        if (Object.prototype.hasOwnProperty.call(options.init.style, key)) {
            el.style[key as any] = options.init.style[key as never]
        }
    }

    return el
}



export class TraitsCreateElement {
    private options: TraitsElementInterface;
    private editor: Editor;

    constructor(editor: Editor, options: TraitsElementInterface) {
        this.options = options;
        this.editor = editor;
    }

    createInput({ trait }: { trait: any }): any {
        const el = createElement(this.options)
        return el
    }

    onEvent({ elInput, component, params, handle }: { elInput: HTMLElement, component: any, params: SwiperInterface, handle: Function }): void | null {
        const init = selectElement(elInput, "input#init") as HTMLElement;
        modelEvent(init, handle)
    }

    onUpdate({ elInput, component }: { elInput: HTMLElement, component: HTMLElement }): void | null {
        elInput.setAttribute('data-updated', 'true');
        return null;
    }
}