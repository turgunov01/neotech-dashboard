export const PORT = 5003
export const USER_FETCH_HOST = 'http://localhost:'

export function apiDataFetch(url: string, options: RequestInit) {
    return fetch(url, options)
}

export function ParamsInit(type: string) {
    return {
        method: type,
        headers: {
            'Content-Type': 'application/json',
        },
    }
}

export const isRequestPopular = (query: string, value: string) => {
    return `?${query}=${value}`
}

export default {
    PORT,
    USER_FETCH_HOST,
    apiDataFetch,
    ParamsInit
}