import { apiDataFetch } from "~/composables/exports"
import { uri } from "~/composables/exports"
import { ParamsInit } from "~/composables/exports" // Import the missing type

export async function onComponentAdd(log: any) {
    const username = localStorage.getItem("username") ? localStorage.getItem("username") : "anonymous"

    const options = {
        ...ParamsInit("POST"),
        body: JSON.stringify(log)
    }

    return null

    await apiDataFetch(`${uri}/api/logs/${username}/`, options)
        .then(response => response.json())

}

export async function onComponentRemove(log: any) {
    const username = localStorage.getItem("username") ? localStorage.getItem("username") : "anonymous"

    const options = {
        ...ParamsInit("POST"),
        body: JSON.stringify(log)
    }

    return null

    await apiDataFetch(`${uri}/api/logs/${username}/`, options)
        .then(response => response.json())
}

export async function onComponentClone(log: any) {
    const username = localStorage.getItem("username") ? localStorage.getItem("username") : "anonymous"

    const options = {
        ...ParamsInit("POST"),
        body: JSON.stringify(log)
    }

    return null

    await apiDataFetch(`${uri}/api/logs/${username}/`, options)
        .then(response => response.json())
}
