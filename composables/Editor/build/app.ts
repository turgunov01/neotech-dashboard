import type { Editor } from "grapesjs";
import { FailedAlert } from "~/composables/Notification/list";
import { eventPanel } from "../generator/panels";

export async function buildEditor(editor: Editor) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        }
    }

    const $router = useRouter().currentRoute.value;

    await setTimeout(async () => {
        try {
            if ($router.query.id) {
                await apiDataFetch(`${uri}/constructor/single/${$router.query.id}`, options)
                    .then(response => response.json())
                    .then(response => {
                        const page = {
                            id: response.id,
                            name: response.name,
                            route: response.route,
                            sections: response.sections,
                            html: response.html,
                            css: response.css,
                        }

                        editor.setComponents(page.sections);
                        editor.Css.addRules(page.css);
                        return;
                    })
            } else {
                await apiDataFetch(`${uri}/constructor/web`, options)
                    .then(response => response.json())
                    .then(response => {
                        const page = {
                            id: response[0].id,
                            name: response[0].name,
                            route: response[0].route,
                            sections: response[0].sections,
                            html: response[0].html,
                            css: response[0].css,
                        }

                        useRouter().push({ query: { id: page.id } })

                        editor.setComponents(page.sections);
                        editor.Css.addRules(page.css);
                        return;
                    })
            }

        } catch (err: Error | any) {
            FailedAlert(err.message);
            setTimeout(() => {
                location.reload();
            }, 3000);
        }
    }, 1000);

    eventPanel(editor);
}