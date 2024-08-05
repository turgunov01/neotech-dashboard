export default defineNuxtRouteMiddleware(async () => {
    const isUserOnline = navigator.onLine
    // if (!isUserOnline) {
    //     const item = await confirm("Пожалуйста, проверьте ваше подключение к интернету. (Ошибка 503)")
    //     if (item && !isUserOnline) {
    //         alert("Ожидание подключение интернета")
    //     }
    // }

    return
})