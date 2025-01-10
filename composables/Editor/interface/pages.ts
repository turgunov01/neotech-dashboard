import type { Components } from "grapesjs";

export interface PageInterface {
    project_id?: number,
    page_id?: number,
    title?: string,
    meta?: Meta[],
    og_title?: string,
    og_description?: string,
    scripts?: Scripts[],
    styles?: Styles[],
    css?: string,
    sections?: Components,
    fonts?: Fonts[] | [],
    is_published?: number | boolean,
}

interface Meta {
    title: string,
    description: string,
    keywords: string[]
}

interface Scripts {
    id: string,
    type: string,
    src: string,
    lang: string | 'css',
    modules: boolean | false,
    async: boolean | false,
}

interface Fonts {
    name: string,
    src: string,
    display: string,
    weights: FontWeights[]
}

interface FontWeights {
    id: number
}

interface Styles extends Scripts { }