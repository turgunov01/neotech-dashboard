import type { Editor } from "grapesjs";
import type { SwiperCssOptions, SwiperInterface } from "~/composables/Editor/interface/swiper";

export class Swiper {
    [variable: string]: any
    private container: HTMLIFrameElement;
    private wrapper: HTMLElement | any;

    constructor(container: string, options: SwiperInterface) {
        const frame = document?.querySelector(".gjs-frame") as HTMLIFrameElement;
        this.container = frame?.contentWindow?.document?.querySelector(container) as HTMLIFrameElement;
        this.wrapper = this.container?.firstChild
        this.slides = (this.wrapper as HTMLElement).querySelectorAll(".swiper-slide")
        this.options = options as SwiperInterface;
    }

    private setSlides(editor: Editor) {
        const key = this.options.slidesPerView

        for (let i = 0; i < this.slides.length; i++) {
            const element = this.slides[i] as HTMLElement;
            element.setAttribute("data-swiper", "true")

            const counter = `${(parseInt(this.options.css.width) / key).toFixed(2)}%`
            element.style.width = counter

            editor.Css.setRule(`${element.classList.replace(" ", ".")}`, { width: counter })
        }
    }


    private setWrapper(editor: Editor) {
        this.list = this.wrapper.className.replace(" ", ".")

        const css = {
            width: "100%",
            height: "auto",
            overflow: "hidden",
            gap: `${this.options.spaceBetween}`
        }

        for (const key in css) {
            if (Object.prototype.hasOwnProperty.call(css, key)) {
                const element = (css as any)[key]

                editor.Css.setRule(this.list.toString(), { [key]: element })
            }
        }
    }

    public run(editor: Editor) {

        this.setWrapper(editor)
        this.setSlides(editor)

    }

    public async init(editor: Editor) {
        await this.run(editor);

        for (let index = 0; index < this.slides.length; index++) {
            const element = this.slides[index] as HTMLElement;
            element.setAttribute("data-swiper", "true")
        }
    }

}

export default Swiper;