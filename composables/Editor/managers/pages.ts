import type { GrapesInitPagesInterface } from "~/interface/Grapesjs.interface"
import { apiDataFetch } from "#imports"
import type { Component, Editor } from "grapesjs"
import type { PageInitInterface } from "~/interface/PagesInterface"

export async function GrapesInitPagesManager(component: Component) {
    const options = {
        ...ParamsInit('GET')
    }

    await apiDataFetch(`${USER_FETCH_HOST}/api/pages/test-stranitsa?popular=*`, options)
        .then(response => response.json())
        .then(response => {
            const data = response
            localStorage.setItem(`${data.name}`, JSON.stringify(data))
        })
}

