import Swiper from "~/plugins/swiper/swiper";
import type { SwiperInterface } from "../interface/swiper";
import type { Editor } from "grapesjs";

export async function SwiperConfiguration(elInput: HTMLElement, params: SwiperInterface, editor: Editor,) {
    const frame = document.querySelector(".gjs-frame") as HTMLIFrameElement;
    const selected = frame.contentDocument?.querySelector(".gjs-selected") as HTMLIFrameElement;
    const className = `.swiper[data-swiper="${selected.dataset.swiper}"]`


    const swiper = await new Swiper(className, params)

    const init = elInput.querySelector("input#init");
    const slidesPerView = elInput.querySelector("input#slidesPerView") as HTMLInputElement;
    const autoplay = elInput.querySelector("input#autoplay")
    const delayInput = elInput.querySelector("input#autoplay-delay") as HTMLInputElement;
    const navigation = elInput.querySelector("input#navigation") as HTMLInputElement;

    init?.addEventListener("change", async (event) => {
        swiper.init(editor)

        // const config = {
        //     scriptType: "slider",
        //     className: className,
        //     params: params,
        // }

        // updateStructure(config)
    })

    slidesPerView?.addEventListener("change", async (event) => {
        if (parseInt((event.target as HTMLInputElement).value) > 0 && parseInt((event.target as HTMLInputElement).value) < 6) {
            params.slidesPerView = parseInt((event.target as HTMLInputElement).value)
            swiper.setCarousel(editor, parseInt((event.target as HTMLInputElement).value))
        } else {
            (event.target as HTMLInputElement).value = params.slidesPerView as any
        }
    })

    autoplay?.addEventListener("change", (event) => {
        const checked = (event.target as HTMLInputElement).checked

        if (checked) {
            if (delayInput && delayInput.parentElement) {
                delayInput.parentElement.style.display = "flex";
            }
        }
    })

    delayInput.value = params.autoplay.delay.toString();
    delayInput.addEventListener("input", async (event) => {
        const number = (event.target as HTMLInputElement).value;

        let delay = parseInt(number);
        if (isNaN(delay)) {
            console.error('Invalid number input');
            return;
        }

        if (delay < 500) {
            delay = 500;
        }

        params.autoplay.delay = delay;

        try {
            await swiper.setAutoplay(params.autoplay.delay);
        } catch (error) {
            return alert('Error updating autoplay delay');
        }
    });

    navigation?.addEventListener("change", async (event) => {
        const checked = (event.target as HTMLInputElement).checked;

        if (checked) {
            swiper.setNavigation()
        } else {
            swiper.unsetNavigation()
        }
    })

    return null;
}