export async function apiDataFetch(uri: any, headers: any) {
    const base = baseURI()

    const token = await checkToken()
    const $router = useRouter()

    

    if (token) {
        return fetch(`${base}${uri}`, headers && typeof headers === "object"
            ? headers
            : {
                method: headers,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    } else {
        $router.push({ path: "/login" })
    }
}

export async function postData(uri: any, headers: any) {
    const base = baseURI()

    const token = await checkToken()
    const $router = useRouter()

    return fetch(`${base}${uri}`, { ...headers })
}
