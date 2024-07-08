import type { SwiperOptions } from "swiper/types";
import type { TraitsElement } from "./models/traits";
import type { SwiperInterface } from "./swiper";

export interface DomTraitsInterface {
    type: string,
    name: string,
    label: string,
    style: Object | {
        display: string,
        "flex-direction": string,
        "row-gap": string | number
    }
}

export interface TraitManagerInterface {
    type: string | "div",
    name: string | "DIV",
    label: string | "DIV",
    style: Object | {
        display: string,
        "flex-direction": string,
        "row-gap": string | number
    } | {},
}

export interface FormManagerInterface {

}


export interface SwiperManagerHandler {
    createInput: (params: { trait: any }) => HTMLElement | string | void;
    onEvent: (params: { elInput: HTMLElement, component: any, params: SwiperInterface }) => any;
    onUpdate: (params: { elInput: HTMLElement, component: any }) => void | null;
}
