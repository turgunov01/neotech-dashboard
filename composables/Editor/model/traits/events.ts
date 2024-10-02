import type { Editor } from "grapesjs";
import { customSwiper } from "../../config/swiper";

export function getSwipersConfigs(editor: Editor) {
    const frame = document.querySelector(".gjs-frame") as HTMLIFrameElement;

    editor.on("component:add", (model) => {
        const element = model;
        if (element.toJSON().type === "swiper") {
            const swiper = element.toJSON().classes.toJSON()[0];
            return customSwiper(swiper);
        }
    })
}