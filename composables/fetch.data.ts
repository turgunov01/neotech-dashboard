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
        useRouter().push({ path: "/login" })
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
        .then(response => response.json())
        .then(response => console.log(response))
}

// POST Authentification
export async function postUserData(uri: any, user: any) {
    const base = baseURI()

    const token = await checkToken()
    const $router = useRouter()

    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user.value)
    };

    return fetch(`${base}${uri}`, options)
        .then(response => response.json())
        .then(response => {
            const data = response.data

            if (data.token) {
                storeData("Authorization", data.token)
                storeData("username", user.value.username)
                storeData("password", user.value.password)
                $router.push({
                    path: "/dashboard"
                })

                console.log("Logged In!")
            }
        })
        .catch(err => console.error(err))
        .finally(() => {
            setTimeout(() => {
                console.clear()
            }, 1000);
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