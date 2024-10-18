import type { GlobalInterface } from "~/interface/global/global.interfaces"
import type { Editor } from "grapesjs";

import { FailedAlert, PushNotification } from "~/composables/Notification/list";
import { Publish } from "../classes/publish";


export async function publish(model: GlobalInterface) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
        },
        body: JSON.stringify(model)
    }
    
    console.log(model.sections)

    await apiDataFetch(`${uri}/constructor/update/${useRouter().currentRoute.value.query.id}`, options)
        .then(res => res.json())
        .then(async res => {

            if (res.error) return FailedAlert(res.error), false;

            if (res.message) {
                await PushNotification(res.message)
            } else if (res.error) {
                await FailedAlert(res.error);
            }

            setTimeout(() => {
                location.reload();
            }, 3500);

        })
        .catch((err) => {
            console.log(err);
        })
}

export function buttonPublishHandler(editor: Editor) {
    const button = document.querySelector(".frame.publish")

    button?.addEventListener("click", async () => {
        const components = editor.getComponents().toJSON()

        if (components.length === 0) return alert("You can't publish empty page!")

        return new Publish(editor).sync()
    })
}

export default { Publish }