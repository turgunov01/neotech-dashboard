import Swiper from "~/plugins/swiper/swiper";
import type { SwiperInterface } from "../interface/swiper";
import type { Editor } from "grapesjs";

export async function SwiperConfiguration(elInput: HTMLElement, params: SwiperInterface, editor: Editor,) {
    const frame = document.querySelector(".gjs-frame") as HTMLIFrameElement;
    const container = frame?.contentWindow?.document.querySelector(".gjs-selected") as HTMLIFrameElement;

    const component = editor.Components.getById(container?.id as string);
    component.setAttributes({ "data-swiper": container?.id })

    // const className = `.swiper[data-swiper="${container?.id}"]`

    const swiper = new Swiper(container, editor, params)

    const init = elInput.querySelector(".swiper-init input") as HTMLElement;
    init.addEventListener("change", (event) => {
        if ((event.target as HTMLInputElement)?.checked) {
            swiper.init()
        }
    })

    const autoplay = elInput.querySelector(".swiper-autoplay") as HTMLElement;
    const autoplayInput = autoplay.querySelector(".autoplay-init input") as HTMLInputElement;
    autoplayInput.addEventListener("change", (event) => {
        if ((event.target as HTMLInputElement)?.checked) {
            swiper.autoplay()
        }
    })

    const autoplayDelay = autoplay.querySelector(".autoplay-delay input")
    autoplayDelay?.addEventListener("change", () => {
    })


}