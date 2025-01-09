import type { Editor } from "grapesjs";
import { FailedAlert } from "~/composables/Notification/list";
import Runner from "../classes/app.runner";

export async function buildEditor(editor: Editor) {
    editor.Components.destroy();

    const $router = useRouter();
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        }
    }

    const response = await apiDataFetch(`${USER_FETCH_HOST}/projects/${$router.currentRoute.value.params.project_id}/pages/${$router.currentRoute.value.params.page_id}`, options)
    const data = await response.json();
    if (data.error) return FailedAlert(data.error);
    editor.setComponents(data.sections);
    editor.Css.addRules(data.css)

    setTimeout(() => {
        new Runner(editor);
    }, 200);
}