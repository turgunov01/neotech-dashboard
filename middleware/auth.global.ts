
export default defineNuxtRouteMiddleware(async (to, from) => {
    const isAuth = localStorage.getItem("Authorization")

    if (isAuth) {
        if(to.name === "login") return {path: "/"};
        return true
    }
    else {
        if(to.name === "login") return true;
        return { path: "/login" }
    }
})