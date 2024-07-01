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
}

export interface TraitsElementInterface {
    init: TraitsElementInit,
}

export interface TraitsCreateElementInterface {
    createInput: (params: { trait: any }) => HTMLElement | string;
    onEvent: (params: { elInput: HTMLElement, component: any }) => void | null;
    onUpdate: (params: { elInput: HTMLElement, component: any }) => void | null;
}