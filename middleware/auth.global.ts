export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = sessionStorage.getItem("Authorization")
    if (token) {
        if (to.name === "login") return { path: "/" };
        return true
    }

    else {
        if (to.name === "login") return true;
        return { path: "/login" }
    }
})

