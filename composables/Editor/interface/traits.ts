
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
    type: string,
    name: string,
    label: string,
    style: Object | {
        display: string,
        "flex-direction": string,
        "row-gap": string | number
    } | {},
    model: {
        defaults: {
            traits: any[],
        }
    },
}

interface NonModelTraitsInterface {
    [variable: string]: string,
}

export interface SwiperManagerHandler {
    createInput: (params: { trait: any, params: any }) => HTMLElement | string | void;
    onEvent: (params: { elInput: HTMLElement, component: any, params: any }) => any;
    onUpdate: (params: { elInput: HTMLElement, component: any }) => void | null;
}

export interface FormManagerHandler {
    createInput: (params: { trait: any }) => HTMLElement | string | void;
    onEvent: (params: { elInput: HTMLElement, component: any }) => any;
    onUpdate: (params: { elInput: HTMLElement, component: any }) => void | null;
}

interface InputAttributesInterface {
    type?: string | "text";
    label?: string | "text";
    name?: string | "";
    value?: string | "";
    placeholder?: string | "";
    required?: boolean | false;
    readonly?: boolean | false;
    disabled?: boolean | false;
    minlength?: number | 0;
    maxlength?: number | 524288; // Максимальное значение по умолчанию для `input` типа text в HTML
    pattern?: string | "";
    step?: number | 1;
    min?: number | "";
    max?: number | "";
    autocomplete?: string | "off";
    autofocus?: boolean | false;
    form?: string | "";
    list?: string | "";
    size?: number | 20;
    multiple?: boolean | false;
    accept?: string | "";
    capture?: boolean | false;
    inputmode?: string | "";
    spellcheck?: boolean | true;
    [attribute: string]: any; // Для любых других атрибутов
}
