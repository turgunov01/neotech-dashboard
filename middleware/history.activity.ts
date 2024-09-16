export const setActivityMiddleware = async (message: string, route: string) => {

    const already = sessionStorage.getItem(route);

    if (!already) {
        const ip = ref('')

        await fetch("https://api.bigdatacloud.net/data/client-info")
            .then(response => response.json())
            .then(response => {
                const data = response;
                ip.value = data.ipString;
            })

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("Authorization"),
            },
            body: JSON.stringify({
                user: {
                    ip: ip.value
                },
                event: {
                    type: message
                }
            })
        }

        await apiDataFetch(USER_FETCH_HOST + "/activity/new", options)
            .then(response => response.json())
            .then(response => {
                const data = response;
                console.log(data);

                sessionStorage.setItem(route, "true");
            })
    }

}