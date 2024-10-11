import type { TraitManagerInterface } from "../interface/traits";

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