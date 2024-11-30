export async function $removeData(name: string) {
    localStorage.removeItem(name)
}

export function $getData(name: string) {
    const local = localStorage.getItem(name)
    return local
}

export function $storeData(name: string, value: any) {

}