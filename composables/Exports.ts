export const PORT = 5003
// export const USER_FETCH_HOST = 'http://localhost:5003'
export const USER_FETCH_HOST = 'https://api-neotech-landing.neotech.uz';

export const uri = `${USER_FETCH_HOST}`

export function apiDataFetch(url: string, options: RequestInit) {
    return fetch(url, options)
}

export async function storeData(name: string, value: any) {
    sessionStorage.setItem(name, value)
}
export async function removeStoreData(name: string) {
    sessionStorage.removeItem(name)
}


export function showStoreData(name: string) {
    const local = sessionStorage.getItem(name)
    return local
}

export function getRandomColor() {
    const getRandomValue = () => Math.floor(Math.random() * 128) + 127; // Ensures values between 127 and 255

    const red = getRandomValue();
    const green = getRandomValue();
    const blue = getRandomValue();

    const toHex = (value: number) => value.toString(16).padStart(2, '0');

    const randomLightColor = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
    return randomLightColor;
}

export function isValidAnchor(rte: any): boolean {
    const selection = rte.selection();
    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const commonAncestor = range.commonAncestorContainer;
        if (commonAncestor.nodeType === Node.ELEMENT_NODE) {
            const anchor = (commonAncestor as Element).closest('a');
            return !!anchor;
        } else if (commonAncestor.nodeType === Node.TEXT_NODE) {
            const parentElement = commonAncestor.parentElement;
            if (parentElement && parentElement.closest('a')) {
                return true;
            }
        }
    }
    return false;
}

export const types = {
    input: "input",
    button: "button",
    select: "select",
    textarea: "textarea",
    checkbox: "checkbox",
    radio: "radio",
    text: "text"
}

export const isRequestPopular = (query: string, value: string) => {
    return `?${query}=${value}`
}

export async function updateStructure(options: any) {
    await apiDataFetch(`${uri}/api/update/test-stranitsa/javascript/${options.scriptType}`, {
        body: JSON.stringify({
            className: options.className,
            slides: options.params
        }, null)
    })
}

export default {
    PORT,
    USER_FETCH_HOST,
    apiDataFetch,
    types,
    isRequestPopular,
    uri,
    updateStructure,
    getRandomColor
}
