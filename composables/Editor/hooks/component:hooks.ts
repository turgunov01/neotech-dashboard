import { apiDataFetch } from "~/composables/exports"
import { uri } from "~/composables/exports"
import { ParamsInit } from "~/composables/exports" // Import the missing type
import type { GlobalAttributesInterface } from "~/interface/html/global.interfaces"


export async function onComponentAdd(log: any) {
    const username = localStorage.getItem("username") ? localStorage.getItem("username") : "anonymous"

    const options = {
        ...ParamsInit("POST"),
        body: JSON.stringify(log)
    }

    await apiDataFetch(`${uri}/api/logs/${username}/`, options)
        .then(response => response.json())

}

export async function onComponentRemove(log: any) {
    const username = localStorage.getItem("username") ? localStorage.getItem("username") : "anonymous"

    const options = {
        ...ParamsInit("POST"),
        body: JSON.stringify(log)
    }

    await apiDataFetch(`${uri}/api/logs/${username}/`, options)
        .then(response => response.json())
}

export async function onComponentClone(log: any) {
    const username = localStorage.getItem("username") ? localStorage.getItem("username") : "anonymous"

    const options = {
        ...ParamsInit("POST"),
        body: JSON.stringify(log)
    }

    await apiDataFetch(`${uri}/api/logs/${username}/`, options)
        .then(response => response.json())
}

export async function onComponentDrag(log: any) {
    const username = localStorage.getItem("username") ? localStorage.getItem("username") : "anonymous"

    const options = {
        ...ParamsInit("POST"),
        body: JSON.stringify(log)
    }

    await apiDataFetch(`${uri}/api/logs/${username}/`, options)
        .then(response => response.json())
}