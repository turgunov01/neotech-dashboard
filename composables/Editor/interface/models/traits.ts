interface TraitsElementStyle {
    display: string,
    "flex-direction": string,
    "row-gap": string | number
}

export interface TraitsElement {
    type: string,
    name: string,
    label: string,
    class: string,
    style: TraitsElementStyle
}