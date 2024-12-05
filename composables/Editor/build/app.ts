import type { Editor } from "grapesjs";
import { FailedAlert } from "~/composables/Notification/list";
import CustomPanels from "../generator/panels";
import Calculate from "../classes/app.calculate";

export async function buildEditor(editor: Editor) {
    const $router = useRouter();
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        }
    }

    await apiDataFetch(USER_FETCH_HOST + `/constructor/projects?url=${$router.currentRoute.value.query.url}`, options)
        .then(response => response.json())
        .then(response => {
            const data = response;
            const uid = $router.currentRoute.value.query.page_id;

            const currentpage = data.pages.find((p: any) => p.uid == uid);
            if (!currentpage) return FailedAlert("Invalid uid for page!");

            editor.Components.destroy();

            editor.setComponents(currentpage.sections);
            editor.Css.addRules(currentpage.css);
        })

    new CustomPanels(editor).width();
    new CustomPanels(editor).components();
    new Calculate(editor).activate();
}