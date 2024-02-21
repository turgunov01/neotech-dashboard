export const getLanguage = () => {
    const store = localStorage.getItem("lang")
    if (store) {
        return store
    } else {
        return "ru"
    }
}


