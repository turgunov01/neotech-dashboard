import type { GlobalInterface } from "~/interface/global/global.interfaces"
import type { Editor } from "grapesjs";

import { FailedAlert, PushNotification } from "~/composables/Notification/list";
import { extract } from "./extract";

export async function publish(editor: Editor) {
    const $router = useRouter();
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
    }

    // await apiDataFetch(`${USER_FETCH_HOST}/constructor/projects?url=${$router.currentRoute.value.query.url}`, { method: "GET", headers: options.headers })
    //     .then(response => response.json())
    //     .then(async response => {
    //         const data = response;
    //         const url = data.project_id;
    //         const uid = $router.currentRoute.value.query.page_id;

    //         const currentPage = response.pages.find((p: any) => p.uid == uid);
    //         if (!currentPage) return FailedAlert("Page not found on publication!")

    //         await apiDataFetch(`${USER_FETCH_HOST}/constructor/projects/${url}/pages/${uid}`, {
    //             method: options.method,
    //             headers: options.headers,
    //             body: JSON.stringify({
    //                 name: currentPage.name,
    //                 html: (extract(editor).html),
    //                 css: (extract(editor).css),
    //                 sections: editor.getComponents() as any
    //             })
    //         })
    //             .then(res => res.json())
    //             .then(res => {
    //                 const data = res;
    //                 if (data.error) return FailedAlert(data.error);
    //                 PushNotification(data.message);
    //             })
    //     })
}


