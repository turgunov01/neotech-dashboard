import type { Editor } from "grapesjs";
import type { DomTraitsInterface, TraitsElementInterface } from "../interface/traits";
import { TraitsModelHandler } from "../model/traits/traits";

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

