interface TraitsElementStyle {
    display: string,
    "flex-direction": string,
    "row-gap": string | number
}

export interface TraitsElementInit {
    type: string,
    name: string,
    label: string,
    class: string,
    style: TraitsElementStyle
}