import type { GlobalInterface } from "~/interface/global/global.interfaces"
import type { Editor } from "grapesjs";

import { FailedAlert, PushNotification } from "~/composables/Notification/list";
import type { PageInterface } from "../interface/pages";

export async function publish(editor: Editor, is_product?: number) {
    const token = showStoreData("Authorization");
    const $router = useRouter();
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: undefined as any
    }

    const params = ref({
        project_id: Number($router.currentRoute.value.params.project_id),
        page_id: Number($router.currentRoute.value.params.page_id),
    })

    const page: PageInterface = {
        css: editor.getCss() as string,
        styles: editor.Css.getRules() as any,
        sections: editor.getComponents(),
        is_published: is_product == 1 ? 1 : 0,
    }

    console.log(page.is_published)

    options.body = JSON.stringify(page);

    const response = await apiDataFetch(USER_FETCH_HOST + "/projects/" + params.value.project_id + "/editor/" + params.value.page_id, options);
    const data = await response.json();

    if (data.error) {
        if (data.error.message) {
            return FailedAlert(data.error.message);
        }
        else if (data.error.sqlMessage) {
            return FailedAlert(data.error.sqlMessage);
        }
        else {
            return FailedAlert(data.error);
        }
    }

    // return PushNotification(data.message);
}


