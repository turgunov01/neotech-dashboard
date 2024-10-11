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