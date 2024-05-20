import type { GrapesInitPagesInterface } from "~/interface/Grapesjs.interface"
import { apiDataFetch } from "#imports"
import type { Component, Editor } from "grapesjs"
import type { PageInitInterface } from "~/interface/PagesInterface"

export async function GrapesInitPagesManager(component: Component) {
    const options = {
        ...ParamsInit('GET')
    }

    await apiDataFetch(`${USER_FETCH_HOST}${PORT}/api/pages?popular=*`, options)
        .then(response => response.json())
        .then(response => {
            const data = response

            for (const name in data.pages) {
                if (Object.prototype.hasOwnProperty.call(data.pages, name)) {
                    const item: PageInitInterface = {
                        id: data.pages[name].id,
                        styles: data.pages[name].styles ? data.pages[name].styles : `* {margin: 0; padding: 0; box-sizing: border-box;}`,
                        components: (data.pages[name].sections as any),
                    };

                    (component as any).push(item)
                }
            }
        })
}

