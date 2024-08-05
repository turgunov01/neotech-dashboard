export interface GlobalInterface {
    id: string,
    name: string,
    html: string,
    css: string,
    sections: Array<GlobalAttributesInterface>,
    cipher: string,
}

export interface GlobalAttributesInterface {
    id: string,
    tagName: string,
    label: string,
    removable: boolean | true,
    draggable: boolean | true,
    copyable: boolean | true,
    content: string,
    styles: string | Object,
    attributes: AttributesInterface
}

interface AttributesInterface {
    id: string;
    className: string;
    style: string;
    title: string;
    lang: string;
    dir: 'ltr' | 'rtl' | 'auto';
}

interface ImageAttributesInterface extends AttributesInterface {
    src: string,
    alt: string,
    width: string,
    height: string,
    sizes: string,
    srcset: string,
}

interface VideoAttributesInterface extends AttributesInterface {
    src: string,
    width: string,
    height: string,
    poster: string,
    preload: 'auto' | 'metadata' | 'none',
}

interface InputAttributes extends AttributesInterface {
    type: 'text' | 'password' | 'email' | 'number' | 'button' | 'checkbox' | 'radio' | 'file';
    name?: string;
    value?: string | number | string[];
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
}

interface ButtonAttributes extends AttributesInterface {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

interface SelectInterface extends AttributesInterface {
    name: string,
    value: string | number | string[],
    multiple: boolean | false,
    options: SelectOptionsInterface[]
}

interface SelectOptionsInterface {
    id: string,
    label: string,
    selected: boolean | false,
    value: boolean | false
}
