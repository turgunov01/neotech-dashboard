export interface GrapesInitInterface {
    container: string,
    fromElement: boolean | true,
    height: string,
    width: string,
    storageManager: boolean | false,
    panels: {
        default: Array<any> | []
    },
    traits: Array<any> | null,
    plugins: any
}


export interface GrapesBlockManager {
    id: string | number,
    label: string,
    attributes: {
        class: string
    },
    content: string,
    select: boolean | false,
    activate: boolean | false
}

export interface GrapesInitPagesInterface {
    id: string | number,
    styles: string,
    component: string,
}
