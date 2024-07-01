export function selectElement(element: HTMLElement, type: string) {
    const selected = element.querySelector(type) as HTMLElement;
    return selected
}

export function modelEvent(element: HTMLElement, func: Function) {
    return element.addEventListener("change", func(), false)
}
