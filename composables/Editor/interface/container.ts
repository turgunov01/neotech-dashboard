export interface Container {
    id: string,
    name?: string,
    route: string,
    length: number | 0,
    sections: Array<any>,
    html: string,
    css: string,
    cipher: string,
}