import type { TraitManagerInterface } from "../interface/traits";

export function DomTrait(options: TraitManagerInterface) {
    return {
        isComponent: (element: { tagName: string }) => element.tagName === options.name,
        model: {
            defaults: {
                traits: [{ ...options }],
            },
        }
    }
}