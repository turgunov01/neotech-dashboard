import type { GlobalAttributesInterface, GlobalInterface } from "~/interface/html/global.interfaces"

export async function publish(model: GlobalInterface,) {
    try {
        await apiDataFetch(`${uri}/api/pages`, {
            ...ParamsInit("POST"),
            body:
                JSON.stringify({
                    name: model.name,
                    html: model.html,
                    css: model.css,
                    sections: model.sections,
                    cipher: model.cipher
                })
        })
            .then(response => response.json())
            .then(response => {
                if (response.status && response.status === 403) {
                    alert(`Status: ${response.status}. You are not allowed to publish existing page!`)
                }
            })
    } catch (err) {
        console.log(err)
    }
}

