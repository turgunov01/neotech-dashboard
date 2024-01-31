const $router = useRouter()

export async function storeData(name: String | any, data: String | any) {

    const store = localStorage.getItem(name)

    if (!store) {
        localStorage.setItem(name, data)
    } else {
        return false
    }

}

export async function getStoreData(name: any) {
    const target = localStorage.getItem(name)

    if (target) {
        return target
    } else {
        return false
    }
}

export async function checkToken() {
    const token = await localStorage.getItem("Authorization")

    if (token) return token
    return null
}


export default { storeData, checkToken, getStoreData }