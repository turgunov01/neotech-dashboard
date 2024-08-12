export default defineNuxtRouteMiddleware(async (to, from) => {
    const allowed = ref(false);

    const token = localStorage.getItem("Authorization")



    await apiDataFetch(`${uri}/users/verify`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        }
    })
        .then(response => response.json())
        .then(async response => {
            allowed.value = response;

            if (response === false) {
                await localStorage.removeItem("Authorization");
                setTimeout(() => {
                    return { path: "/login" }
                }, 100);
            }
        })

    if (token) {
        if (to.name === "login") return { path: "/" };
        return true
    }

    if (allowed && token) {
        if (to.name === "login") return { path: "/" };
        return true
    }
    else {
        if (to.name === "login") return true;
        return { path: "/login" }
    }
})

