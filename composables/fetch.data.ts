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

// async function getHeaders() {
//     const headers = {
//         Authorization: `Bearer ${await checkToken()}`,
//         "Content-Language": await getLanguage(),
//         "Content-Type": "application/json"
//     }

//     return headers
// }

export async function getIndexData(uri: String | any) {
    // const headers = await getHeaders()
    return fetch(`${await baseURI()}${uri}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${await checkToken()}`,
            "Content-Language": await getLanguage(),
            "Content-Type": "application/json"
        }
    })
}

export async function putIndexData(uri: String | any, _body: any) {
    return fetch(`${baseURI()}${uri}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${await checkToken()}`,
            "Content-Language": await getLanguage(),
            "Content-Type": "multipart/form-data"
        },
        body: _body as FormData
    })
}

export async function postIndexData(uri: String | any, _body: any) {
    return fetch(`${baseURI()}${uri}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${await checkToken()}`,
            "Content-Language": await getLanguage(),
            "Content-Type": "application/json"
        },
        body: _body
    })
}

export async function postData(uri: any, headers: any) {
    const base = baseURI()

    const token = await checkToken()
    const $router = useRouter()

    return fetch(`${base}${uri}`, { ...headers })
}
