export const PORT = 5003
export const USER_FETCH_HOST = 'https://api-neotech-landing.neotech.uz'

export const uri = `${USER_FETCH_HOST}`

export function apiDataFetch(url: string, options: RequestInit) {
    return fetch(url, options)
}

export async function storeData(name: string, value: any) {
    localStorage.setItem(name, value)
}
export async function removeStoreData(name: string) {
    localStorage.removeItem(name)
}

export function getStoreData(name: string) {
    const local = localStorage.getItem(name)

    if (!local) return false
    return true
}

export function ParamsInit(type: string) {
    return {
        method: type,
        headers: {
            'Content-Type': 'application/json',
        },
    }
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

export default {
    PORT,
    USER_FETCH_HOST,
    apiDataFetch,
    ParamsInit,
    types,
    isRequestPopular,
    uri
}
