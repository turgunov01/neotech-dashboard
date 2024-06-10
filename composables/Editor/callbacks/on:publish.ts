import type { GlobalInterface } from "~/interface/global/global.interfaces"

export async function publish(model: GlobalInterface,) {
    try {
        await apiDataFetch(`${uri}/api/pages/test-stranitsa`, {
            ...ParamsInit("PUT"),
            body:
                JSON.stringify({
                    name: model.name,
                    sections: model.sections,
                    html: model.html,
                    css: model.css,
                    cipher: model.cipher,
                })
        })
            .then(response => response.json())
            .then(response => {
                if (response.status && response.status === 403) {
                    alert(`Status: ${response.status}. You are not allowed to publish existing page!`)
                }

            })
    } catch (err) {
        alert(err)
    }
}

