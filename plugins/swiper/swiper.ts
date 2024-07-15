import { Component, Editor } from "grapesjs";
import type { Autoplay, SwiperInterface } from "~/composables/Editor/interface/swiper";

export class Swiper {
    private container: HTMLIFrameElement;
    private carousel: HTMLIFrameElement;
    private elements: HTMLIFrameElement;

    [variable: string]: any;


    constructor(container: string, options: SwiperInterface) {
        const frame = document?.querySelector(".gjs-frame") as HTMLIFrameElement;
        this.container = frame.contentDocument?.querySelector(container) as HTMLIFrameElement
        this.carousel = (this.container as HTMLIFrameElement)?.querySelector(".swiper-wrapper") as HTMLIFrameElement
        this.elements = (this.carousel as HTMLIFrameElement)?.childNodes as HTMLElement[] | any;
        this.currentPosition = 0

        this.options = options;

        this.autoplay = false;

        this.className = container
    }

    public init(editor: Editor) {
        this.setSwiper();
        this.setWrapper(editor);
        this.setCarousel(editor, this.options.slidesPerView);

        const number = this.options.slidesPerView
        const counter = ((parseInt("100%") / number));

        editor.Css.setRule(`.swiper .swiper-slide`, { flex: `0 0 ${counter}%`, 'min-height': "300px", padding: "30px" })
    }

    setSwiper() {
        const manager = {
            "margin-right": "auto",
            "margin-left": "auto",
            "position": "relative",
            "overflow": "hidden",
            "touch-action": "pan-y",
            "touch-move-stop-propagation": "true",
            "user-select": "none",
            "-webkit-user-select": "none",
            "list-style": "none",
            "padding": "0",
            "z-index": "1",
        }

        for (const key in manager) {
            if (Object.prototype.hasOwnProperty.call(manager, key)) {
                this.container.style[key as any] = manager[key as never]
            }
        }
    }

    private setWrapper(editor: Editor) {

        const manager = {
            position: "relative",
            width: "100%",
            height: "100%",
            "z-index": "1",
            display: "flex",
            transition: this.options.speed
        }

        this.editor = editor;
        this.editor.Css.setRule(`.swiper-wrapper`, { ...manager })
    }

    setCarousel(editor: Editor, slidesPerView: number) {
        const number = slidesPerView || this.options.slidesPerView
        const counter = ((parseInt("100%") / number));


        const component = editor.Components.getById(this.container.id)

        component.setAttributes({ 'data-swiper': this.container.id })

        editor.Css.setRule(`.swiper[data-swiper="${this.container.id}"] .swiper-slide`, { flex: `0 0 ${counter}%`, 'min-height': "300px", padding: "30px" })

        this.carousel.childNodes.forEach((slide: any) => {
            slide.style.flex = `0 0 ${counter}%`;
            slide.style.minHeight = "300px";
            slide.style.padding = "30px"
        });
    }

    setNavigation() {
        this.setNextButton()
        this.setPrevButton()
    }

    unsetNavigation() {
        const nextButton = this.container.querySelector("button.swiper-button-next")
        const prevButton = this.container.querySelector("button.swiper-button-prev")

        if (nextButton) {
            nextButton.remove()
        }

        if (prevButton) {
            prevButton.remove()
        }
    }

    private setNextButton() {
        const button = document.createElement("button");
        button.classList.add("swiper-button-next");
        button.innerHTML = "NEXT";

        button.addEventListener("click", async () => {
            if (this.options.loop) {
                const firstElement = this.carousel.firstChild
                this.carousel.appendChild(firstElement as HTMLElement)

                if (this.currentPosition % 2 === 0) {
                    this.carousel.removeChild(firstElement as HTMLElement)
                }
            } else {
                if (this.currentPosition >= 0 && this.currentPosition < this.carousel.childNodes.length - this.options.slidesPerView) {
                    this.currentPosition += 1;
                    await this.move(-(this.currentPosition))
                }
            }

            console.log(1)
        });


        const hasButton = this.container.querySelector("button.swiper-button-next")

        if (this.carousel.childNodes.length >= this.options.slidesPerView && !hasButton) {
            this.container.appendChild(button);
        }

        return button
    }

    private setPrevButton() {
        const button = document.createElement("button");
        button.classList.add("swiper-button-prev");
        button.innerHTML = "PREV";

        button.addEventListener("click", async (event) => {
            console.log(this.currentPosition, this.carousel.childNodes.length - this.options.slidesPerView)
            if (this.currentPosition > 0 && this.currentPosition <= this.carousel.childNodes.length - 2) {
                this.currentPosition -= 1;
                await this.move(-(this.currentPosition))
            }
        });

        const hasButton = this.container.querySelector("button.swiper-button-prev")

        if (this.carousel.childNodes.length >= this.options.slidesPerView && !hasButton) {
            this.container.appendChild(button);
        }

        return button
    }

    setAutoplay(timer: number): void {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
            if (this.currentPosition >= 0 && this.currentPosition < this.carousel.childNodes.length - this.options.slidesPerView) {
                this.autoplay = true;

                this.currentPosition += 1
                this.move(-(this.currentPosition))
            } else {
                this.autoplay = true;

                this.currentPosition = 0
                this.move(-(this.currentPosition))
            }
        }, timer)
    }

    private move(position: number) {
        this.carousel.style.transform = `translateX(${(parseInt("100%") / this.options.slidesPerView) * position}%)`
        this.carousel.style.transition = `${this.options.speed ? this.options.speed : 300}ms`
    }

    private clone(type: string) {
        if (type === "next") {
            const removed = this.carousel.firstChild as HTMLElement
            this.carousel.removeChild(removed)
            this.carousel.appendChild(removed)
        } else if (type === "prev") {
            const removed = this.carousel.lastChild;
            this.carousel.removeChild(removed as HTMLIFrameElement)
            this.carousel.insertBefore(removed as HTMLIFrameElement, this.carousel.firstChild)
        }
    }
}

export default Swiper