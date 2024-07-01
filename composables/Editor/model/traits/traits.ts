import type { DomTraitsInterface } from "../../interface/traits"

export function TraitsModelHandler(parameters: DomTraitsInterface) {
    const arr = []

    const options = {
        type: parameters.type,
        name: parameters.name,
        label: parameters.label
    }

    arr.push(options)
    return arr
}