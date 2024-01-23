const $router = useRouter()

export async function storeData(data: String | any) {

    const store = localStorage.getItem("Authorization")
    const token = data.token

    if (!store) {
        localStorage.setItem("Authorization", token)
    } else {
        return false
    }

}

export async function removeLocalData(data: String | any) {
    const store = localStorage
    const localData = store.getItem(data)

    if (localData) {
        store.removeItem(data)
        $router.push({
            path: "/dashboard"
        })
    } else {
        console.error("The error contained in function of deleting user! Check your credentials!")
    }
}

export async function checkToken() {
    const token = await localStorage.getItem("Authorization")

    if (token) return token
    return null
}


export default { storeData, checkToken, removeLocalData }