export default defineNuxtRouteMiddleware(async () => {
    const isUserOnline = navigator.onLine;

    // setInterval(() => {
    //     if (!isUserOnline) {
    //         PushNotification("Проверьте подключение к интернету")
    //     } else {
    //         PushNotification("Подключение восстановлено")
    //     }
    // }, 5000)

    return;
})