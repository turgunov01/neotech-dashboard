// import Swiper from "~/plugins/swiper/swiper";
import type { DomTraitsInterface, FormManagerHandler, TraitManagerInterface } from "../interface/traits";
import type { Editor } from "grapesjs";
import { createElement } from "./createElement";
import { TraitsModelHandler } from "./traits/handler";


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

export function ButtonDomTrait(options: TraitManagerInterface) {
    return {
        isComponent: (element: { tagName: string }) => element.tagName === 'BUTTON',
        model: {
            defaults: {
                traits: [TraitsModelHandler(options)]
            }
        }
    }
}
