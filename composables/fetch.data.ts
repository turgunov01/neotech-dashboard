export async function apiDataFetch(uri: any, headers: any) {
    const base = baseURI()

    const token = await checkToken()
    const $router = useRouter().currentRoute.value

    // Average request of the API endpoint

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


// GET request to all the data of the /pages/
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


// PUT request to all the data of the /pages/ by ID
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

// POST request to all data of the /pages/ by ID
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

// POST Authentification
export async function postUserData(uri: any, headers: any) {
    const base = baseURI()

    const token = await checkToken()
    const $router = useRouter()

    return fetch(`${base}${uri}`, headers)
}

// POST Image 
export async function postImage(uri: any, formData: FormData) {
    const base = baseURI()

    const token = await checkToken()

    return fetch(`${base}${uri}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Language": await getLanguage(),
            'Content-Type': 'multipart/form-data;'
        },
        body: formData
    })
}

// DELETE Content
export async function apiDeleteFetch(uri: any) {
    const base = baseURI()

    const token = await checkToken()

    return fetch(`${base}${uri}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Language": await getLanguage(),
            "Content-Type": "application/json"
        }
    })
}