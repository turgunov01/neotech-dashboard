import Swiper from "~/plugins/swiper/swiper";
import type { SwiperInterface } from "../interface/swiper";
import type { DomTraitsInterface, TraitManagerInterface, TraitsManagerHandler } from "../interface/traits";
import type { Editor } from "grapesjs";

export function DomComponentTrait(options: DomTraitsInterface) {
    return {
        isComponent: (element: { classList: { contains: (arg: string) => any; }; }) => element?.classList?.contains(options.type),
        model: {
            defaults: {
                traits: [TraitsModelHandler(options)]
            }
        }
    }
}


export function createElement(options: TraitManagerInterface) {
    const el = document.createElement("div");
    el.innerHTML = options.label

    el.classList.add("swiper-trait")

    for (const key in options.style) {
        if (Object.prototype.hasOwnProperty.call(options.style, key)) {
            el.style[key as any] = options.style[key as never];
        }
    }

    return el
}

function TraitsModelHandler(parameters: DomTraitsInterface) {
    const options = {
        type: parameters.type,
        name: parameters.name,
        label: parameters.label
    }

    return options
}

export class TraitsHandler implements TraitsManagerHandler {
    private options: TraitManagerInterface;
    private editor: Editor;

    constructor(options: TraitManagerInterface, editor: Editor) {
        this.options = options;
        this.editor = editor as Editor;
    }

    createInput({ trait }: { trait: any }): HTMLElement | string {
        const element = createElement(this.options)
        return element
    }

    async onEvent({ elInput, component, params }: { elInput: HTMLElement, component: any, params: SwiperInterface }) {
        const frame = document.querySelector(".gjs-frame") as HTMLIFrameElement;
        const selected = frame.contentDocument?.querySelector(".gjs-selected") as HTMLIFrameElement;
        const className = `.swiper#${selected.id}`

        const swiper = await new Swiper(className, params)

        const init = elInput.querySelector("input#init");
        const slidesPerView = elInput.querySelector("input#slidesPerView") as HTMLInputElement;
        const autoplay = elInput.querySelector("input#autoplay")
        const delayInput = elInput.querySelector("input#autoplay-delay") as HTMLInputElement;
        const navigation = elInput.querySelector("input#navigation") as HTMLInputElement;

        init?.addEventListener("change", (event) => {
            swiper.init(this.editor)
        })

        slidesPerView?.addEventListener("change", (event) => {
            if (parseInt((event.target as HTMLInputElement).value) > 0 && parseInt((event.target as HTMLInputElement).value) < 6) {
                params.slidesPerView = parseInt((event.target as HTMLInputElement).value)
                swiper.setCarousel(this.editor, parseInt((event.target as HTMLInputElement).value))
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

    onUpdate({ elInput, component }: { elInput: HTMLElement, component: any }): void | null {
        elInput.setAttribute("data-set", "true");
        return null;
    }

}