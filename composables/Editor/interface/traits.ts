import type { TraitsElementInit } from "./models/traits";

export interface DomTraitsInterface {
    type: string,
    name: string,
    label: string,
}

export interface TraitManagerInterface {
    type: string,
    name: string,
    label: string,
    createInput: ({ trait }: any) => HTMLElement | string,
    onEvent: ({ elInput, component }: any) => void | null,
    onUpdate: ({ elInput, component }: any) => void | null,
}

export interface TraitsElementInterface {
    init: TraitsElementInit,
}

